// تكملة تاب ps: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/ps/01.js (شرح حقول الدرس في أوله)
MORE("ps", [
    {
      t: "تحكّم في جهازك من الترمنال",
      l: 3,
      n: R`مواصفات الجهاز، والحافظة، والتحميل، وتحديث البرامج، والشغل في الخلفية، ومراقبة الفولدرات، والتنبيهات، والقفل والإطفاء في معاد: حاجات بتعملها بالماوس كل يوم وتقدر تعملها بسطر أو تحطها في سكربت`,
      items: [
        {
          cmd: "Get-CimInstance",
          title: "مواصفات جهازك وحالته",
          desc: R`[[Get-CimInstance]] بيسأل ويندوز عن أي معلومة عن الجهاز: نسخة الويندوز، وآخر مرة اشتغل، والبروسيسور، والرام، والبطارية، وكارت الشاشة. ويندوز بيعرض المعلومات دي في «classes» أساميها بتبدأ بـ [[Win32_]]، وكل class بيرجع object بخصائص تختار منها بـ [[Select-Object]].

[[Win32_OperatingSystem]] فيه [[Caption]] اسم الويندوز، و [[Version]]، و [[LastBootUpTime]] آخر تشغيل، و [[TotalVisibleMemorySize]] و [[FreePhysicalMemory]] الرام الكلية والفاضية بالكيلوبايت. الجيجا = 1048576 كيلوبايت، وده نفس رقم [[1MB]] في PowerShell، فالقسمة على [[1MB]] بتطلّعهم جيجا. والطرح [[(Get-Date) - ...]] بين تاريخين بيرجع مدة (TimeSpan)، فده الـ uptime: الجهاز شغال بقاله قد إيه. و [[Win32_Processor]] البروسيسور وعدد الـ cores، و [[Win32_Battery]] نسبة الشحن وحالة البطارية.

[[@{ n = "RAM_GB"; e = { ... } }]] اسمها calculated property: عمود جديد [[n]] اسمه و [[e]] كود بيحسب قيمته، و [[$_]] جواه هو الـ object الحالي. و [[[math]::Round(x, 1)]] تقريب لرقم واحد بعد العلامة. وآخر سطرين: [[powercfg /batteryreport]] بيعمل تقرير HTML عن البطارية (السعة الأصلية والسعة دلوقتي وتاريخ الاستخدام)، و [[/output]] مكان الملف، و [[ii]] بيفتحه في المتصفح.

ده ويندوز بس، وشغال في 5.1 و 7. ولو شفت في شرح قديم [[Get-WmiObject]]، ده الأمر القديم اللي اتشال من PowerShell 7، و [[Get-CimInstance]] بديله في الاتنين.`,
          example: R`Get-CimInstance Win32_OperatingSystem | Select-Object Caption, Version, LastBootUpTime
(Get-Date) - (Get-CimInstance Win32_OperatingSystem).LastBootUpTime
Get-CimInstance Win32_Processor | Select-Object Name, NumberOfCores, NumberOfLogicalProcessors
Get-CimInstance Win32_OperatingSystem | Select-Object @{ n = "RAM_GB"; e = { [math]::Round($_.TotalVisibleMemorySize / 1MB, 1) } }, @{ n = "FreeGB"; e = { [math]::Round($_.FreePhysicalMemory / 1MB, 1) } }
Get-CimInstance Win32_Battery | Select-Object EstimatedChargeRemaining, BatteryStatus
powercfg /batteryreport /output "$env:TEMP\battery.html"
ii "$env:TEMP\battery.html"`,
          try: R`اعرف الجهاز شغال بقاله كام يوم من غير restart، وطلّع تقرير البطارية وقارن DESIGN CAPACITY بـ FULL CHARGE CAPACITY.`,
          deep: {
            why: R`«الجهاز ده فيه رام كام؟ البروسيسور إيه؟ البطارية حالتها إيه؟ آخر restart إمتى؟» أسئلة بتتسأل في الدعم الفني، وقبل ما تسطّب برنامج تقيل، ولما تشتري لابتوب مستعمل. بدل ما تلف في Settings و Task Manager و Device Manager، كله من مكان واحد وتقدر تحفظه في ملف أو تبعته.`,
            how: R`CIM (و WMI قبله) نظام في ويندوز بيعرض كل حاجة عن الجهاز كـ classes. [[Get-CimClass Win32_*]] بيعرض الأسامي (مئات)، وأشهرها: [[Win32_ComputerSystem]] (الشركة والموديل والرام الكلية بالبايت)، و [[Win32_LogicalDisk]] (الديسكات، شوف disk-report.ps1)، و [[Win32_VideoController]] (كارت الشاشة ونسخة الدرايفر)، و [[Win32_BIOS]] (نسخة الـ BIOS والـ serial number).

[[Get-CimInstance Win32_Processor | Select-Object *]] بيعرض كل الخصائص لو مش عارف اسم اللي عايزه. و [[-Filter "DriveType=3"]] بيفلتر عند ويندوز نفسه قبل ما الناتج يوصلك، وده أسرع من [[Where-Object]] بعدها.

الوحدات بتختلف من class للتاني، وده أكتر حاجة بتلخبط: [[Win32_OperatingSystem]] الرام فيه بالكيلوبايت، و [[TotalPhysicalMemory]] في [[Win32_ComputerSystem]] بالبايت (فتقسم على [[1GB]]). والرقمين ممكن يختلفوا شوية، لأن الأول الرام اللي ويندوز شايفها بعد ما كارت الشاشة المدمج ياخد نصيبه.

[[BatteryStatus]] أرقام: [[1]] شغال على البطارية، و [[2]] على الكهربا (مش لازم بيشحن)، و [[6]] بيشحن. و [[Get-ComputerInfo]] بيرجع حاجات كتير مرة واحدة بس بياخد ثواني، فاستخدمه لما تحتاج صورة كاملة.`,
            when: R`لما تحتاج مواصفات الجهاز بسرعة أو تحطها في تقرير، أو قبل ما تشتري لابتوب مستعمل (تقرير البطارية بيقولك فاضل فيها كام في المية من سعتها)، أو في سكربت بيقرر حاجة حسب الرام أو نوع الجهاز.`,
            mistakes: R`تقسم [[TotalVisibleMemorySize]] على [[1GB]] فيطلع رقم صغير جدًا، لأنه أصلًا بالكيلوبايت. أو تستخدم [[Get-WmiObject]] من شرح قديم في PowerShell 7 فيطلع «is not recognized». أو تصدّق [[EstimatedRunTime]] والجهاز على الشاحن (بيطلع رقم ضخم معناه «مش معروف»). أو تبعت ناتج [[Win32_BIOS]] لحد وفيه الـ serial number بتاع جهازك.`
          },
          teach: R`## الفكرة: نسأل ويندوز عن الجهاز

ويندوز شايل كل معلومة عن الجهاز في «classes» أساميها بتبدأ بـ [[Win32_]]: واحد للويندوز نفسه، وواحد للبروسيسور، وواحد للبطارية. و [[Get-CimInstance]] بيجيب الـ object بتاع الـ class، و [[Select-Object]] بيختار منه الخانات اللي عايزها. كل الأوامر اتشغّلت على لابتوب ويندوز 11 في PowerShell 7.6 (و 5.1 نفس الناتج).

---

## ١. نسخة الويندوز وآخر تشغيل

~~~powershell
Get-CimInstance Win32_OperatingSystem | Select-Object Caption, Version, LastBootUpTime
~~~

~~~text الناتج
Caption        : Microsoft Windows 11 Home Single Language
Version        : 10.0.26300
LastBootUpTime : 10/6/2026 9:23:44 AM
~~~

- [[Win32_OperatingSystem]] الـ class بتاع نظام التشغيل.
- [[Caption]] الاسم، و [[Version]] رقم النسخة (ويندوز 11 لسه بيقول 10.0، والرقم التالت هو الـ build)، و [[LastBootUpTime]] آخر مرة الجهاز اشتغل.

---

## ٢. الجهاز شغال بقاله قد إيه (uptime)

~~~powershell
(Get-Date) - (Get-CimInstance Win32_OperatingSystem).LastBootUpTime
~~~

من جوه لبرة:

1. [[(Get-CimInstance Win32_OperatingSystem)]] الأقواس بتنفّذ الأمر الأول، و [[.LastBootUpTime]] بتاخد منه خانة واحدة: تاريخ.
2. [[(Get-Date)]] التاريخ والساعة دلوقتي.
3. [[-]] بين تاريخين بيرجّع **مدة** مش تاريخ، ونوعها [[TimeSpan]] (جربت [[.GetType().Name]]).

~~~text الناتج (مختصر)
Days       : 0
Hours      : 0
Minutes    : 44
TotalHours : 0.733608503777778
~~~

[[Days]] و [[Hours]] و [[Minutes]] أجزاء المدة، و [[TotalHours]] المدة كلها بالساعات. يعني الجهاز ده اشتغل من 44 دقيقة.

---

## ٣. البروسيسور

~~~powershell
Get-CimInstance Win32_Processor | Select-Object Name, NumberOfCores, NumberOfLogicalProcessors
~~~

~~~text الناتج
Name                      : AMD Ryzen 9 5900HX with Radeon Graphics
NumberOfCores             : 8
NumberOfLogicalProcessors : 16
~~~

[[NumberOfCores]] الـ cores الحقيقية، و [[NumberOfLogicalProcessors]] اللي ويندوز شايفها: كل core بيشغّل two threads (SMT في AMD و Hyper-Threading في Intel)، فـ 8 بقوا 16.

---

## ٤. الرام بالجيجا: calculated properties

~~~powershell
Get-CimInstance Win32_OperatingSystem | Select-Object @{ n = "RAM_GB"; e = { [math]::Round($_.TotalVisibleMemorySize / 1MB, 1) } }, @{ n = "FreeGB"; e = { [math]::Round($_.FreePhysicalMemory / 1MB, 1) } }
~~~

### الأرقام الخام

~~~text TotalVisibleMemorySize و FreePhysicalMemory و 1MB
32947100
9156848
1048576
~~~

الخانتين دول **بالكيلوبايت**. والجيجا = 1024 × 1024 كيلوبايت = 1048576، وده بالظبط الرقم اللي PowerShell شايله في [[1MB]]. فالقسمة على [[1MB]] بتحوّل الكيلوبايت لجيجا (مش ميجا، خلي بالك).

### الـ calculated property

[[@{ n = "RAM_GB"; e = { ... } }]] hashtable بيعرّف عمود جديد:

| الحتة | معناها |
|---|---|
| [[n]] | name: اسم العمود |
| [[e]] | expression: كود بيحسب القيمة |
| [[$_]] | جوه الكود: الـ object الحالي (نظام التشغيل) |
| [[[math]::Round(x, 1)]] | قرّب لرقم واحد بعد العلامة |

والعمودين مفصولين بفاصلة.

~~~text الناتج
RAM_GB FreeGB
------ ------
  31.40   8.70
~~~

القيمة نفسها 31.4، والجدول في PowerShell 7 بيعرضها بخانتين بعد العلامة لما العمود كله كسور (في 5.1 بتظهر 31.4). و 31.4 جيجا مش 32، لأن كارت الشاشة المدمج في البروسيسور واخد نصيبه من الرام.

---

## ٥. البطارية

~~~powershell
Get-CimInstance Win32_Battery | Select-Object EstimatedChargeRemaining, BatteryStatus
~~~

~~~text الناتج
EstimatedChargeRemaining : 65
BatteryStatus            : 2
~~~

[[EstimatedChargeRemaining]] نسبة الشحن (65٪)، و [[BatteryStatus]] رقم: [[1]] على البطارية، و [[2]] على الكهربا، و [[6]] بيشحن. على ديسكتوب مفيش بطارية فالأمر مش بيطبع حاجة.

---

## ٦. تقرير البطارية

~~~powershell
powercfg /batteryreport /output "$env:TEMP\battery.html"
ii "$env:TEMP\battery.html"
~~~

- [[powercfg]] برنامج ويندوز لإعدادات الطاقة، و [[/batteryreport]] اعمل تقرير، و [[/output]] فين.
- [[$env:TEMP]] فولدر الملفات المؤقتة (متغير بيئة).
- [[ii]] اختصار [[Invoke-Item]]: افتح الملف بالبرنامج الافتراضي (المتصفح).

~~~text الناتج (من غير أدمن)
Battery life report saved to file path C:\...\battery.html.
~~~

جوه التقرير قارن [[DESIGN CAPACITY]] (السعة وهي جديدة) بـ [[FULL CHARGE CAPACITY]] (السعة دلوقتي).

---

## الخلاصة

| عايز | الـ class | الخانات |
|---|---|---|
| الويندوز وآخر تشغيل | [[Win32_OperatingSystem]] | [[Caption]] و [[Version]] و [[LastBootUpTime]] |
| الرام (بالكيلوبايت) | [[Win32_OperatingSystem]] | [[TotalVisibleMemorySize]] و [[FreePhysicalMemory]] |
| البروسيسور | [[Win32_Processor]] | [[Name]] و [[NumberOfCores]] و [[NumberOfLogicalProcessors]] |
| البطارية | [[Win32_Battery]] | [[EstimatedChargeRemaining]] و [[BatteryStatus]] |

والـ uptime = [[(Get-Date) - LastBootUpTime]]، وكيلوبايت ÷ [[1MB]] = جيجا.`,
          lines: [
            "اسم الويندوز ونسخته وآخر مرة اشتغل.",
            "الـ uptime: دلوقتي ناقص وقت التشغيل = مدة (TimeSpan).",
            "اسم البروسيسور، وعدد الـ cores الحقيقية، وعدد الـ threads.",
            "الرام الكلية والفاضية بالجيجا في عمودين محسوبين (الأصل بالكيلوبايت).",
            "نسبة شحن البطارية وحالتها (2 = على الكهربا).",
            "اعمل تقرير HTML عن البطارية في فولدر TEMP.",
            "افتح التقرير في المتصفح."
          ],
          sol: R`[[(Get-Date) - (Get-CimInstance Win32_OperatingSystem).LastBootUpTime]] بيطلع TimeSpan: جربتها فطلع [[Days : 1]] و [[Hours : 16]] و [[Minutes : 47]] وتحتهم خصائص Total كتير. ولو عايزه سطر واحد: [[((Get-Date) - $os.LastBootUpTime).ToString("d\.hh\:mm")]] طلع [[1.16:47]] (يوم و 16 ساعة و 47 دقيقة). ولو الرقم أيام كتير والجهاز تقيل، restart ساعات بيحل.

و [[Win32_Battery]] طلع [[EstimatedChargeRemaining : 61]] و [[BatteryStatus : 2]] (على الكهربا)، و [[EstimatedRunTime]] طلع [[71582788]] وده معناه «مش معروف» مش دقايق بجد. على جهاز ديسكتوب مفيش بطارية فمش هيطلع حاجة خالص. وتقرير البطارية اتعمل من غير أدمن وطبع [[Battery life report saved to file path ...battery.html.]]، وجواه [[DESIGN CAPACITY 90,005 mWh]] و [[FULL CHARGE CAPACITY 51,291 mWh]]، يعني البطارية دي بتشيل حوالي 57% من سعتها الأصلية.`,
          solCode: R`$os = Get-CimInstance Win32_OperatingSystem
((Get-Date) - $os.LastBootUpTime).ToString("d\.hh\:mm")
powercfg /batteryreport /output "$env:TEMP\battery.html"
ii "$env:TEMP\battery.html"`
        },
        {
          cmd: "Set-Clipboard / Get-Clipboard",
          title: "انسخ ناتج أي أمر للحافظة",
          desc: R`[[Set-Clipboard]] بيحط أي نص في الحافظة (clipboard) كأنك عملت Ctrl+C، و [[Get-Clipboard]] بيقرا اللي فيها كأنك عملت Ctrl+V، فتنقل ناتج أمر لإيميل أو شات أو ملف من غير ما تحدده بالماوس. زي [[pbcopy]] و [[pbpaste]] في الماك و [[clip]] في CMD، واختصاراتهم في PowerShell 7 [[scb]] و [[gcb]].

[[(Get-Location).Path]] مسار الفولدر الحالي كنص. و [[Get-Content $HOME\.ssh\id_ed25519.pub]] بيقرا الـ SSH public key بتاعك عشان تلزقه في GitHub. ولما تبعت objects (جدول) لازم [[Out-String]] الأول: بيحوّل الجدول لنفس النص اللي بتشوفه على الشاشة، ومن غيره الحافظة هيتحط فيها حاجة زي [[@{Name=chrome; Id=1234}]]. و [[WS]] اختصار [[WorkingSet]] (الرام اللي العملية ماسكاها).

[[Get-Clipboard]] بيرجع كل سطر لوحده (array)، و [[-Raw]] بيرجع النص كله حتة واحدة، وده اللي محتاجه مع [[Measure-Object -Line -Word -Character]] (عدد السطور والكلمات والحروف). وآخر سطر بيقرا اللي في الحافظة، ويرتبه ويشيل المكرر بـ [[Sort-Object -Unique]]، ويرجّعه الحافظة: انسخ لستة إيميلات أو أسامي من أي مكان، شغّل السطر، والصق.

في PowerShell 7 الأوامر دي نص بس، و [[-Append]] بيزوّد سطر على اللي موجود بدل ما يمسحه. و Windows PowerShell 5.1 فيه [[Get-Clipboard -Format Image]] و [[FileDropList]] (صور وملفات منسوخة)، ودول اتشالوا في 7.`,
          example: R`(Get-Location).Path | Set-Clipboard
Get-Content $HOME\.ssh\id_ed25519.pub | Set-Clipboard
Get-Process | Sort-Object WS -Descending | Select-Object -First 5 Name, Id | Out-String | Set-Clipboard
Get-Clipboard
Get-Clipboard -Raw | Measure-Object -Line -Word -Character
Get-Clipboard | Sort-Object -Unique | Set-Clipboard`,
          try: R`انسخ من أي مكان كذا سطر فيهم تكرار (مثلًا banana و apple و banana و cherry و apple كل واحد في سطر)، وشغّل آخر سطر، والصق في Notepad.`,
          deep: {
            why: R`شغل كتير في الترمنال بيخلص بإنك تنقل حاجة لمكان تاني: مسار تبعته لزميل، أو هاش ملف، أو الـ public key لـ GitHub، أو جدول في issue. التحديد بالماوس في الترمنال بيلخبط السطور الطويلة وبيزوّد مسافات، و [[Set-Clipboard]] بينقل النص بالظبط.`,
            how: R`[[Set-Clipboard]] بياخد من الـ pipeline أو من [[-Value]]، ولو جاله كذا عنصر بيحط كل واحد في سطر. وأي object مش نص بيتحوّل بالـ ToString بتاعه، وده سبب [[@{Name=...}]] الغريبة، فـ [[Out-String]] أو [[ConvertTo-Csv]] (لو هتلزقه في Excel) أو [[ConvertTo-Json]] قبله. و [[Out-String]] بيحط سطر فاضي فوق وتحت، فلو مضايقك: [[(... | Out-String).Trim() | Set-Clipboard]].

[[clip.exe]] القديم (من CMD) شغال برضه: [[Get-Content file.txt | clip]]، بس بيزوّد سطر جديد في آخر النص (جربتها)، و [[Set-Clipboard]] لأ.

في PowerShell 7.4 وأحدث فيه [[Set-Clipboard -AsOSC52]]: لو انت داخل على سيرفر بـ SSH، بيبعت النص للترمنال اللي على جهازك (Windows Terminal بيدعمه)، فيتنسخ في حافظة جهازك انت مش حافظة السيرفر.

وحافظة ويندوز بتحفظ تاريخ لو مفعّل (Win+V)، فأي باسورد أو توكن نسخته بـ Set-Clipboard هيفضل في التاريخ ده.`,
            when: R`كل ما تحتاج تنقل ناتج من الترمنال لأي مكان، أو العكس (تنسخ لستة من صفحة وتعالجها في PowerShell وترجعها). وفي السكربتات: سكربت يعمل باسورد عشوائي أو لينك ويحطه في الحافظة على طول.`,
            mistakes: R`تبعت جدول من غير [[Out-String]] فتلزق [[@{Name=...}]]. أو تنسى الفرق بين [[(Get-Clipboard).Count]] (عدد السطور) و [[(Get-Clipboard -Raw).Length]] (عدد الحروف). أو تنسى إن Set-Clipboard بيمسح اللي كان في الحافظة. أو تنسخ توكن وتنسى إنه في تاريخ Win+V.`
          },
          teach: R`## الفكرة: Ctrl+C و Ctrl+V من الترمنال

الحافظة (clipboard) هي المكان اللي Ctrl+C بيحط فيه و Ctrl+V بياخد منه. [[Set-Clipboard]] بيكتب فيها، و [[Get-Clipboard]] بيقرا منها. اتشغّل كله في PowerShell 7.6 (ورجّعت اللي كان في الحافظة بعد التجربة).

---

## ١. انسخ المسار اللي انت فيه

~~~powershell
(Get-Location).Path | Set-Clipboard
~~~

- [[Get-Location]] الفولدر الحالي، بيرجع object، و [[.Path]] المسار كنص.
- [[|]] بيبعته لـ [[Set-Clipboard]].

ولما قريت الحافظة بعدها وأنا واقف في TEMP:

~~~text الناتج من Get-Clipboard
C:\Users\7ossa\AppData\Local\Temp
~~~

---

## ٢. انسخ محتوى ملف

~~~powershell
Get-Content $HOME\.ssh\id_ed25519.pub | Set-Clipboard
~~~

[[$HOME]] فولدر اليوزر، و [[.ssh\id_ed25519.pub]] الـ public key بتاع SSH (لو عامل مفتاح). [[Get-Content]] بيقراه و Set-Clipboard بيحطه، فتلزقه في GitHub مرة واحدة من غير ما تحدد بالماوس.

---

## ٣. جدول للحافظة: ليه [[Out-String]]؟

~~~powershell
Get-Process | Sort-Object WS -Descending | Select-Object -First 5 Name, Id | Out-String | Set-Clipboard
~~~

| الحتة | بتعمل إيه |
|---|---|
| [[Get-Process]] | كل العمليات الشغالة |
| [[Sort-Object WS -Descending]] | رتّب بالرام ([[WS]] = WorkingSet) من الأكبر للأصغر |
| [[Select-Object -First 5 Name, Id]] | أول 5، بعمودين بس |
| [[Out-String]] | حوّل الجدول لنص زي اللي بيظهر على الشاشة |
| [[Set-Clipboard]] | حطه في الحافظة |

جربت **من غير** [[Out-String]] (بـ 3 عمليات):

~~~text اللي اتحط في الحافظة
@{Name=Memory Compression; Id=5344}
@{Name=vmmemWSL; Id=30620}
@{Name=msedgewebview2; Id=39896}
~~~

Set-Clipboard بيحوّل كل object لنص بطريقته، فطلع الشكل الغريب ده. ومع [[Out-String]]:

~~~text اللي اتحط في الحافظة
Name                  Id
----                  --
Memory Compression  5344
vmmemWSL           30620
msedgewebview2     39896
~~~

نفس الجدول، بس معاه سطر فاضي فوق وسطرين تحت (Out-String بيزوّدهم).

---

## ٤. القراية: [[Get-Clipboard]] و [[-Raw]]

حطيت في الحافظة 5 سطور ([[banana]] و [[apple]] و [[banana]] و [[cherry]] و [[apple]]):

~~~powershell
Get-Clipboard
Get-Clipboard -Raw | Measure-Object -Line -Word -Character
~~~

- [[Get-Clipboard]] لوحده بيرجّع **array**، كل سطر عنصر: [[(Get-Clipboard).Count]] طلعت [[5]].
- [[-Raw]] بيرجّع النص كله حتة واحدة: [[(Get-Clipboard -Raw).Length]] طلعت [[36]] حرف.
- [[Measure-Object -Line -Word -Character]] بيعدّ السطور والكلمات والحروف (زي [[wc]] في لينكس):

~~~text الناتج
Lines Words Characters Property
----- ----- ---------- --------
    5     5         36
~~~

(عمود [[Property]] فاضي لأننا مقسناش خاصية معينة.)

الكلمات الخمسة فيهم 28 حرف بس. الـ 8 الزيادة هما الفواصل بين السطور: بين 5 سطور فيه 4 نهايات سطر، وكل نهاية سطر في ويندوز حرفين ([[\r\n]]).

---

## ٥. رتّب واشيل المكرر في الحافظة نفسها

~~~powershell
Get-Clipboard | Sort-Object -Unique | Set-Clipboard
~~~

اقرا السطور، و [[Sort-Object -Unique]] رتّب أبجديًا واشيل التكرار، واكتب النتيجة في الحافظة تاني:

~~~text الناتج من Get-Clipboard بعدها
apple
banana
cherry
~~~

---

## الخلاصة

| عايز | اكتب |
|---|---|
| تنسخ نص | [[... | Set-Clipboard]] (اختصاره [[scb]]) |
| تنسخ جدول | [[... | Out-String | Set-Clipboard]] |
| تقرا سطر سطر | [[Get-Clipboard]] (اختصاره [[gcb]]) |
| تقرا كله نص واحد | [[Get-Clipboard -Raw]] |

و Set-Clipboard بيمسح اللي كان في الحافظة قبله.`,
          lines: [
            "انسخ مسار الفولدر الحالي.",
            "انسخ الـ SSH public key عشان تلزقه في GitHub.",
            "أكبر ٥ عمليات في الرام كجدول نصي ([[Out-String]] قبل الحافظة).",
            "اقرا اللي في الحافظة، سطر سطر.",
            "عدّ السطور والكلمات والحروف في النص كله ([[-Raw]]).",
            "رتّب اللي في الحافظة واشيل المكرر ورجّعه الحافظة."
          ],
          sol: R`جربتها: حطيت في الحافظة [[banana]] و [[apple]] و [[banana]] و [[cherry]] و [[apple]]، و [[Get-Clipboard -Raw | Measure-Object -Line -Word -Character]] طلع [[Lines 5]] و [[Words 5]] و [[Characters 36]] (الحروف بتعدّ نهاية كل سطر كمان). وبعد آخر سطر، [[Get-Clipboard]] رجّع [[apple]] و [[banana]] و [[cherry]] بس، مترتبين، والـ paste في Notepad طلع نفس التلات سطور.

وجربت الغلطة المشهورة: [[Get-Process | Sort-Object WS -Descending | Select-Object -First 3 Name, Id | Set-Clipboard]] من غير Out-String حط في الحافظة سطور زي [[@{Name=vmmemWSL; Id=18940}]]، ومع [[| Out-String]] اتحط الجدول بالعناوين زي ما بيظهر، بس معاه سطر فاضي فوق وتحت. والعربي اتنقل سليم ([[Set-Clipboard "مرحبا يا عالم"]] ورجع زي ما هو). (رجّعت اللي كان في الحافظة بعد كل تجربة.)`,
          solCode: R`Set-Clipboard -Value "banana", "apple", "banana", "cherry", "apple"
Get-Clipboard -Raw | Measure-Object -Line -Word -Character
Get-Clipboard | Sort-Object -Unique | Set-Clipboard
Get-Clipboard`
        },
        {
          cmd: "Invoke-WebRequest -OutFile",
          title: "نزّل ملف واتأكد إنه سليم",
          desc: R`[[Invoke-WebRequest]] (اختصاره [[iwr]]) بيطلب لينك، و [[-OutFile]] بيحفظ الرد في ملف بدل ما يعرضه، فده المقابل لـ [[wget]] و [[curl -o]]. والمثال بينزّل [[jq]] (أداة JSON صغيرة، حوالي ميجا) من GitHub ويتأكد إن الملف هو هو اللي المشروع نشره.

[[$ProgressPreference = 'SilentlyContinue']] بيقفل شريط التقدم: في Windows PowerShell 5.1 الشريط ده بيبطّأ تحميل الملفات الكبيرة جدًا، فلازم السطر ده هناك، وفي 7 مش بيضر. و [[Join-Path $env:TEMP "jq.exe"]] بيبني المسار في فولدر الـ TEMP.

التحقق: مشاريع كتير بتنشر ملف فيه الـ SHA256 لكل ملف (هنا [[sha256sum.txt]]). [[Invoke-RestMethod]] بيجيبه كنص، و [[-split '\n']] بيقطّعه سطور، و [[Where-Object { $_ -like '*jq-windows-amd64.exe' }]] بيختار سطر الملف بتاعنا، و [[($line -split '\s+')[0]]] أول كلمة فيه (الهاش)، و [[\s+]] يعني «مسافة أو أكتر»، و [[[0]]] أول عنصر. وبعدين [[Get-FileHash]] (درس Get-FileHash) بيحسب هاش الملف اللي نزل، و [[-eq]] بيقارن من غير ما يفرّق بين الكابيتال والسمول. لو [[True]] الملف سليم ومحدش عدّل فيه.

[[-Resume]] (PowerShell 7 بس) بيكمّل تحميل اتقطع من مكان ما وقف بدل ما يبدأ من الأول. و [[curl.exe]] موجود في ويندوز 10 و 11: [[-L]] يمشي ورا الـ redirects (GitHub بيعمل redirect لكل تحميل)، و [[-o]] اسم الملف. اكتب [[curl.exe]] مش [[curl]]، لأن [[curl]] في 5.1 اختصار لـ Invoke-WebRequest.`,
          example: R`$ProgressPreference = 'SilentlyContinue'
$url = "https://github.com/jqlang/jq/releases/download/jq-1.8.2/jq-windows-amd64.exe"
$out = Join-Path $env:TEMP "jq.exe"
Invoke-WebRequest $url -OutFile $out
$sums = Invoke-RestMethod "https://github.com/jqlang/jq/releases/download/jq-1.8.2/sha256sum.txt"
$line = $sums -split '\n' | Where-Object { $_ -like '*jq-windows-amd64.exe' }
(Get-FileHash $out).Hash -eq ($line -split '\s+')[0]
Invoke-WebRequest $url -OutFile $out -Resume
curl.exe -L -o jq.exe $url`,
          try: R`نزّل الملف وقارن الهاش، وبعدين غيّر حرف في الهاش المتوقع وشوف False. وجرّب [[curl.exe -o test.exe $url]] من غير [[-L]] وشوف حجم الملف.`,
          deep: {
            why: R`تسطيب أداة على سيرفر أو جهاز جديد من غير متصفح، أو سكربت setup بينزّل اللي محتاجه، أو تحميل backup من رابط. والتحقق بالهاش مش رفاهية: لو التحميل اتقطع، أو حد عدّل الملف في السكة، أو نزلت من mirror مضروب، الهاش بيكشفه قبل ما تشغّل حاجة.`,
            how: R`[[Invoke-WebRequest]] من غير [[-OutFile]] بيرجع object فيه [[StatusCode]] و [[Headers]] و [[Content]]. ولو عايز حجم الملف قبل ما تنزّله: [[(Invoke-WebRequest $url -Method Head).Headers['Content-Length']]] (طلع [[1035264]] للملف ده). ومع [[-OutFile]] مش بيرجع حاجة إلا لو زوّدت [[-PassThru]]. وبيمشي ورا الـ redirects لوحده، على عكس curl.

[[-Resume]] بيقول للسيرفر «ابعتلي من البايت رقم كذا» (Range request)، فلازم السيرفر يدعمها، و GitHub بيدعمها.

الهاش لازم يبقى من مصدر رسمي (صفحة الـ release نفسها)، لأن لو حد قدر يغيّر الملف ممكن يغيّر ملف الهاش اللي جنبه. ومشاريع كتير بتنشر توقيع (signature) كمان، وده أقوى.

في 5.1 ضيف [[-UseBasicParsing]] لـ Invoke-WebRequest (من غيره ممكن يحاول يستخدم Internet Explorer ويطلع error)، وعلى ويندوز قديم ممكن تحتاج تفعّل TLS 1.2 (شوف check-site.ps1). ولو ملف كبير والنت بيقطع كتير، [[Start-BitsTransfer]] (الدرس الجاي) بيكمّل لوحده.`,
            when: R`أي تحميل من سكربت أو من سيرفر مفيهوش متصفح، وأي ملف تنفيذي (exe أو msi أو zip فيه برامج) نزّلته من النت قبل ما تشغّله.`,
            mistakes: R`تنسى [[$ProgressPreference]] في 5.1 فملف كبير ياخد أضعاف وقته. أو تكتب [[curl -o]] في 5.1 فيطلع error غريب لأنه Invoke-WebRequest مش curl. أو [[curl.exe]] من غير [[-L]] مع GitHub فتلاقي ملف 0 بايت. أو تقارن الهاش بـ [[-ceq]] (بيفرّق بين الكابيتال والسمول) فيطلع False والملف سليم. أو تحفظ في فولدر مش موجود: [[-OutFile]] مش بيعمل الفولدرات، وبيطلع [[Could not find a part of the path]].`
          },
          teach: R`## الفكرة: نزّل، وبعدين اتأكد إن اللي نزل هو الأصلي

المثال بينزّل [[jq.exe]] من صفحة الـ releases في GitHub، وبعدين يقارن «بصمة» الملف (الهاش) بالبصمة اللي المشروع نشرها. لو متطابقين، الملف سليم. اتشغّل كله في PowerShell 7.6.

---

## ١. التجهيز

~~~powershell
$ProgressPreference = 'SilentlyContinue'
$url = "https://github.com/jqlang/jq/releases/download/jq-1.8.2/jq-windows-amd64.exe"
$out = Join-Path $env:TEMP "jq.exe"
~~~

- [[$ProgressPreference]] متغير جاهز بيتحكم في شرايط التقدم. [['SilentlyContinue']] يعني «متعرضهاش». في 5.1 الشريط ده بيبطّأ التحميل جدًا، فالسطر ده لازم هناك.
- [[$url]] لينك الملف، و [[$out]] هيتحفظ فين: [[Join-Path]] بيلزق فولدر TEMP واسم الملف.

---

## ٢. التحميل

~~~powershell
Invoke-WebRequest $url -OutFile $out
~~~

[[Invoke-WebRequest]] بيطلب اللينك، و [[-OutFile]] بيكتب الرد في ملف بدل ما يعرضه. مش بيطبع حاجة. [[(Get-Item $out).Length]] بعدها:

~~~text الناتج
1035264
~~~

يعني حوالي ميجا (بالبايت). و GitHub بيعمل redirect لكل تحميل لسيرفر تاني، و Invoke-WebRequest بيمشي وراه لوحده.

---

## ٣. ملف الهاشات

~~~powershell
$sums = Invoke-RestMethod "https://github.com/jqlang/jq/releases/download/jq-1.8.2/sha256sum.txt"
~~~

[[Invoke-RestMethod]] بيجيب الرد نفسه على طول. هنا الرد ملف نص، فـ [[$sums]] بقى [[String]] واحد فيه سطر لكل ملف في الـ release:

~~~text أول 3 سطور
71b8d6e8f5fe81f6c6d0d110e3892251f6ce76ed095abd315e26e6e1193af3af  jq-1.8.2.tar.gz
332dd9ae07c19fb47f6e8c4dd973a141064c0d35363c254235ee84d2d9e0167c  jq-1.8.2.zip
01e9619236573939473c0f2eb2c5c38dc0f066fbdc89a5357a6f3f2954e00eed  jq-attestation.json
~~~

كل سطر: الهاش، ومسافتين، واسم الملف. والهاش هنا **SHA256**: رقم طوله 64 حرف بيتحسب من كل بايت في الملف. أي تغيير ولو بايت واحد بيطلّع هاش مختلف تمامًا.

---

## ٤. سطر الملف بتاعنا

~~~powershell
$line = $sums -split '\n' | Where-Object { $_ -like '*jq-windows-amd64.exe' }
~~~

- [[-split '\n']] قطّع النص عند كل نهاية سطر ([[\n]])، فبقى array سطور.
- [[Where-Object { $_ -like '*jq-windows-amd64.exe' }]] خلّي السطر اللي **بيخلص** بالاسم ده. [[-like]] مقارنة بنمط، و [[*]] أي حروف قبله.

~~~text الناتج
a6fc67fedaf9128a3309a1e2ebb8b986aeccf70122ee46d2cb4849e423f0c627  jq-windows-amd64.exe
~~~

---

## ٥. المقارنة

~~~powershell
(Get-FileHash $out).Hash -eq ($line -split '\s+')[0]
~~~

نفكّها نصين:

### الشمال: [[(Get-FileHash $out).Hash]]

[[Get-FileHash]] بيحسب الهاش (SHA256 افتراضيًا) للملف اللي نزل:

~~~text الناتج
A6FC67FEDAF9128A3309A1E2EBB8B986AECCF70122EE46D2CB4849E423F0C627
~~~

نفس الرقم بس بحروف كابيتال.

### اليمين: [[($line -split '\s+')[0]]]

[[\s+]] يعني «مسافة واحدة أو أكتر» ([[\s]] أي مسافة، و [[+]] مرة أو أكتر). القطع عندها بيدّي عنصرين: الهاش واسم الملف، و [[[0]]] أولهم.

### [[-eq]]

بيقارن النصين من غير ما يفرّق بين الكابيتال والسمول، فالفرق في شكل الحروف مش مشكلة:

~~~text الناتج
True
~~~

و [[& $out --version]] (تشغيل الملف) طبع [[jq-1.8.2]].

---

## ٦. تكملة تحميل اتقطع: [[-Resume]]

~~~powershell
Invoke-WebRequest $url -OutFile $out -Resume
~~~

[[-Resume]] (PowerShell 7 بس) بيبص على حجم الملف اللي عندك ويطلب من السيرفر الباقي بس. على ملف كامل السيرفر رد إن مفيش حاجة فاضلة:

~~~text الناتج (مختصر)
StatusCode        : 416
StatusDescription : RequestedRangeNotSatisfiable
~~~

416 مش error في الملف: معناها «الحتة اللي طلبتها مش موجودة»، لأن الملف كامل أصلًا.

---

## ٧. نفس التحميل بـ [[curl.exe]]

~~~powershell
curl.exe -L -o jq.exe $url
~~~

[[curl.exe]] جاي مع ويندوز 10 و 11. [[-o]] اسم الملف، و [[-L]] امشي ورا الـ redirect. جربت الاتنين:

| الأمر | حجم الملف |
|---|---|
| [[curl.exe -o test.exe $url]] | [[0]] بايت، من غير أي error |
| [[curl.exe -L -o jq2.exe $url]] | [[1035264]] بايت |

من غير [[-L]] curl حفظ رد الـ redirect نفسه (فاضي). واكتب [[curl.exe]] بالـ [[.exe]]: في 5.1 كلمة [[curl]] لوحدها اختصار لـ [[Invoke-WebRequest]] (جربت [[(Get-Alias curl).Definition]]).

---

## الخلاصة

| الخطوة | الكود |
|---|---|
| نزّل | [[Invoke-WebRequest $url -OutFile $out]] |
| هات الهاش الرسمي | [[Invoke-RestMethod]] على ملف الهاشات، و [[-split]] و [[-like]] |
| احسب هاش الملف | [[(Get-FileHash $out).Hash]] |
| قارن | [[-eq]]: [[True]] يعني سليم |
| كمّل تحميل | [[-Resume]] (7 بس) |
| بـ curl | [[curl.exe -L -o file $url]] |`,
          lines: [
            "اقفل شريط التقدم (في 5.1 بيبطّأ التحميل جدًا).",
            "لينك الملف من صفحة الـ releases.",
            "المكان اللي هيتحفظ فيه، في TEMP.",
            "نزّل واحفظ في الملف (زي wget).",
            "هات ملف الهاشات اللي المشروع نشره، كنص.",
            "قطّعه سطور وخد سطر الملف بتاعنا.",
            "احسب هاش الملف اللي نزل وقارنه بأول كلمة في السطر: True يعني سليم.",
            "كمّل تحميل اتقطع من مكان ما وقف (7 بس).",
            "نفس التحميل بـ curl الحقيقي: [[-L]] يمشي ورا الـ redirect و [[-o]] اسم الملف."
          ],
          sol: R`جربت المثال على PowerShell 7.6: التحميل خد حوالي ثانيتين، و [[jq.exe]] حجمه [[1035264]] بايت، والسطر اللي اتلقط من sha256sum.txt كان [[a6fc67fedaf9128a3309a1e2ebb8b986aeccf70122ee46d2cb4849e423f0c627  jq-windows-amd64.exe]]، و [[Get-FileHash]] طلع نفس الرقم بحروف كابيتال، والمقارنة رجعت [[True]]. و [[& $out --version]] طبع [[jq-1.8.2]]. ولو غيّرت حرف في الهاش المتوقع بترجع [[False]].

[[-Resume]] على ملف كامل مش بيغيّر فيه حاجة، بس بيطبع رد السيرفر: [[StatusCode : 416]] و [[StatusDescription : RequestedRangeNotSatisfiable]]، يعني «مفيش حاجة فاضلة تتنزل». وعلى ملف ناقص (قصّيته لـ 500000 بايت) كمّل الباقي بـ [[206]] (Partial Content) والهاش طلع مطابق. و [[curl.exe -o test.exe $url]] من غير [[-L]] عمل ملف حجمه [[0]] بايت من غير أي error، لأن GitHub رد بـ redirect و curl حفظ الرد ده بس؛ ومع [[-L]] نزل الملف كامل [[1035264]] بايت. الأرقام دي لنسخة 1.8.2، ولو نزّلت نسخة تانية هات لينكها وهاشها من صفحة الـ releases.`,
          solCode: R`(Get-Item $out).Length
& $out --version
curl.exe -o test.exe $url
(Get-Item test.exe).Length`
        },
        {
          cmd: "Start-BitsTransfer",
          title: "تحميل في الخلفية بيكمّل لوحده",
          desc: R`[[Start-BitsTransfer]] بينزّل ملفات عن طريق BITS: خدمة في ويندوز (هي اللي Windows Update بيستخدمها) بتنزّل في الخلفية، وتكمّل لوحدها لو النت قطع أو الجهاز اتعمله restart. شغال في PowerShell 7 على ويندوز كمان (جربته على 7.6)، بس مش موجود على لينكس والماك.

[[-Source]] اللينك و [[-Destination]] مكان الحفظ. من غير حاجة زيادة الأمر بيستنى لحد ما يخلص (وبيعرض شريط تقدم). و [[-Asynchronous]] بيرجعلك على طول ويسيب التحميل شغال، ويرجّع «job» تحفظه في متغير، و [[-DisplayName]] اسم يبان في الليستة.

[[Get-BitsTransfer]] بيعرض تحميلاتك: [[JobState]] الحالة ([[Connecting]] بيتصل و [[Transferring]] بينزّل و [[Transferred]] خلص و [[Error]] فشل و [[TransientError]] مشكلة مؤقتة وهيحاول تاني لوحده)، و [[BytesTransferred]] و [[BytesTotal]]. والمهم: مع [[-Asynchronous]] الملف مش بيظهر في مكانه غير بعد [[Complete-BitsTransfer]]، لحد كده بيبقى ملف مؤقت مخفي. و [[Suspend-BitsTransfer]] و [[Resume-BitsTransfer]] وقّف وكمّل، و [[Remove-BitsTransfer]] إلغاء.

الـ [[while]] في المثال بيستنى طول ما الحالة لسه في التحميل ([[-in]] بيشوف القيمة موجودة في اللستة ولا لأ)، و [[Start-Sleep -Seconds 1]] بين كل فحص والتاني.`,
          example: R`$url = "https://github.com/jqlang/jq/releases/download/jq-1.8.2/jq-windows-amd64.exe"
Start-BitsTransfer -Source $url -Destination "$env:TEMP\jq-bits.exe"
$job = Start-BitsTransfer -Source $url -Destination "$env:TEMP\jq-async.exe" -Asynchronous -DisplayName "jq"
Get-BitsTransfer | Select-Object DisplayName, JobState, BytesTransferred, BytesTotal
while ($job.JobState -in "Queued", "Connecting", "Transferring") { Start-Sleep -Seconds 1 }
Complete-BitsTransfer $job
Get-Item "$env:TEMP\jq-async.exe"`,
          try: R`ابدأ تحميل ملف كبير (installer أو ISO) بـ [[-Asynchronous]]، واقفل PowerShell، وافتح نافذة جديدة واكتب [[Get-BitsTransfer]].`,
          deep: {
            why: R`ملف كبير على نت بيقطع: Invoke-WebRequest لو اتقطع بيفشل (إلا لو انت على 7 واستخدمت [[-Resume]] بنفسك). BITS بيكمّل لوحده من مكان ما وقف، حتى بعد restart، وتقدر تخليه يستخدم النت الفاضي بس عشان ميبطّأش شغلك.`,
            how: R`BITS (Background Intelligent Transfer Service) خدمة في ويندوز، والتحميلات محفوظة فيها مش في PowerShell، وكل يوزر بيشوف تحميلاته بس ([[-AllUsers]] للأدمن). و [[-Priority]] فيه [[Foreground]] (الافتراضي، الأسرع) و [[High]] و [[Normal]] و [[Low]] (بيستخدم النت الفاضي بس).

[[Complete-BitsTransfer]] خطوة لازمة مع [[-Asynchronous]]، لأن BITS بيكتب في ملف مؤقت ويستنى تأكيدك، عشان محدش يستخدم ملف لسه نازل نصه. والـ jobs اللي ملهاش Complete بتفضل في الليستة لحد ما BITS يلغيها لوحده بعد مدة. ولو حصل Error، [[$job.ErrorDescription]] فيها السبب.

BITS محتاج السيرفر يقول حجم الملف ويقبل يبعته حتت (Range requests)، فمش كل لينك هينفع (لينكات بتتولد وقت الطلب ممكن تفشل). و [[Start-BitsTransfer]] بيقبل كذا ملف مرة واحدة: [[-Source]] و [[-Destination]] كل واحد array بنفس الترتيب.

الموديول [[BitsTransfer]] جاي مع ويندوز في فولدر موديولات 5.1، و PowerShell 7 بيحمّله عادي من هناك (جربتها).`,
            when: R`ملفات كبيرة، أو نت ضعيف، أو تحميل عايزه يكمّل وانت قافل الترمنال، أو سكربت على جهاز بيدخل sleep. للملفات الصغيرة والسريعة Invoke-WebRequest أبسط.`,
            mistakes: R`تنسى [[Complete-BitsTransfer]] وتدوّر على الملف ومتلاقيهوش. أو تعمل Complete والحالة [[Error]] فيطلع error، اقرا [[$job.ErrorDescription]] الأول. أو تشغّله من SSH أو جلسة remote فممكن يفشل لأن BITS محتاج يوزر داخل على الجهاز. أو تفتكره شغال على لينكس: الموديول ويندوز بس.`
          },
          teach: R`## الفكرة: ويندوز هو اللي بينزّل، مش PowerShell

BITS خدمة في ويندوز بتنزّل في الخلفية وتكمّل لوحدها لو النت قطع. [[Start-BitsTransfer]] بيدّيها الشغلانة. المثال بينزّل نفس الملف مرتين: مرة والأمر مستني، ومرة في الخلفية. اتشغّل في PowerShell 7.6 (لتجربتي غيّرت الـ DisplayName ومكان الحفظ لفولدر خاص بيا).

---

## ١. تحميل عادي

~~~powershell
$url = "https://github.com/jqlang/jq/releases/download/jq-1.8.2/jq-windows-amd64.exe"
Start-BitsTransfer -Source $url -Destination "$env:TEMP\jq-bits.exe"
~~~

[[-Source]] منين، و [[-Destination]] فين. من غير حاجة زيادة الأمر بيستنى لحد ما التحميل يخلص (وبيعرض شريط تقدم). بعدها الملف طلع [[1035264]] بايت.

---

## ٢. تحميل في الخلفية: [[-Asynchronous]]

~~~powershell
$job = Start-BitsTransfer -Source $url -Destination "$env:TEMP\jq-async.exe" -Asynchronous -DisplayName "jq"
~~~

- [[-Asynchronous]] ارجع على طول وسيب التحميل شغال.
- [[-DisplayName "jq"]] اسم يبان في الليستة وتنادي بيه بعدين.
- الأمر بيرجّع object نوعه [[BitsJob]]، بنحفظه في [[$job]].

---

## ٣. الحالة: [[Get-BitsTransfer]]

~~~powershell
Get-BitsTransfer | Select-Object DisplayName, JobState, BytesTransferred, BytesTotal
~~~

على طول بعد البداية:

~~~text الناتج
DisplayName   JobState BytesTransferred           BytesTotal
-----------   -------- ----------------           ----------
jq          Connecting                0 18446744073709551615
~~~

- [[JobState]] الحالة: [[Connecting]] لسه بيتصل.
- [[BytesTransferred]] نزل قد إيه.
- [[BytesTotal]] الرقم الضخم ده أكبر رقم ممكن يتشال في 64 bit، و BITS بيستخدمه بمعنى «الحجم لسه مش معروف».

---

## ٤. نستنى: الـ [[while]]

~~~powershell
while ($job.JobState -in "Queued", "Connecting", "Transferring") { Start-Sleep -Seconds 1 }
~~~

- [[while (شرط) { ... }]] كرر الكود طول ما الشرط True.
- [[-in]] بيشوف القيمة اللي على الشمال موجودة في اللستة اللي على اليمين ولا لأ: [["Connecting" -in "Queued", "Connecting", "Transferring"]] طلعت [[True]].
- يعني: طول ما التحميل في الطابور أو بيتصل أو بينزّل، استنى ثانية وافحص تاني.
- [[$job.JobState]] بيتحدّث لوحده كل مرة تقراه، لأنه بيسأل BITS.

عندي خلص في ثانيتين:

~~~text الناتج
DisplayName    JobState BytesTransferred BytesTotal
-----------    -------- ---------------- ----------
jq          Transferred          1035264    1035264
~~~

[[Transferred]] يعني كل البايتات نزلت.

---

## ٥. [[Complete-BitsTransfer]]: الخطوة اللي الناس بتنساها

~~~powershell
Complete-BitsTransfer $job
Get-Item "$env:TEMP\jq-async.exe"
~~~

BITS بيكتب في ملف مؤقت مخفي، ومش بيحط الملف باسمه غير لما تأكّد. جربت [[Test-Path]] على الملف **قبل** Complete:

~~~text الناتج
False
~~~

وبعده [[Get-Item]] لقاه:

~~~text الناتج
Name          Length
----          ------
jq-async.exe 1035264
~~~

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[Start-BitsTransfer -Source -Destination]] | نزّل واستنى |
| زوّد [[-Asynchronous]] | نزّل في الخلفية ورجّع job |
| [[Get-BitsTransfer]] | التحميلات وحالتها |
| [[Complete-BitsTransfer $job]] | خلّص: الملف يظهر في مكانه |
| [[Suspend-BitsTransfer]] و [[Resume-BitsTransfer]] | وقّف وكمّل |
| [[Remove-BitsTransfer]] | الغي |

| [[JobState]] | معناها |
|---|---|
| [[Queued]] و [[Connecting]] | لسه مبدأش |
| [[Transferring]] | بينزّل |
| [[Transferred]] | نزل كله، مستني Complete |
| [[TransientError]] | مشكلة مؤقتة، وهيحاول تاني لوحده |
| [[Error]] | فشل، والسبب في [[$job.ErrorDescription]] |`,
          lines: [
            "اللينك.",
            "تحميل عادي: الأمر بيستنى لحد ما يخلص.",
            "تحميل في الخلفية: يرجّع job على طول والتحميل يكمّل.",
            "اعرض تحميلاتك وحالة كل واحد.",
            "استنى طول ما الحالة في الطابور أو بيتصل أو بينزّل، وافحص كل ثانية.",
            "أكّد إنه خلص: دلوقتي بس الملف بيظهر في مكانه.",
            "اتأكد إن الملف موجود وشوف حجمه."
          ],
          sol: R`جربت المثال على PowerShell 7.6.6: التحميل العادي خلص والملف [[1035264]] بايت. ومع [[-Asynchronous]]، أول ما رجع كان [[JobState : Connecting]] و [[BytesTotal : 18446744073709551615]] (ده أكبر رقم ممكن، ومعناه «الحجم لسه مش معروف»)، وبعد ثواني [[Get-BitsTransfer]] طلع [[jq  Transferred  1035264  1035264]]. و [[Test-Path]] على الملف قبل [[Complete-BitsTransfer]] رجع [[False]]، وبعده الملف ظهر بحجمه، و [[Get-BitsTransfer]] بقى فاضي.

في تجربتك: التحميل بيفضل في [[Get-BitsTransfer]] حتى بعد ما تقفل النافذة، لأن BITS خدمة في ويندوز مش جزء من PowerShell. امسكه تاني بالـ DisplayName بتاعه: [[$job = Get-BitsTransfer -Name "later"]] (الـ solCode)، ولما يبقى [[Transferred]] اعمل [[Complete-BitsTransfer $job]].`,
          solCode: R`$job = Start-BitsTransfer -Source $url -Destination "$env:TEMP\jq-later.exe" -Asynchronous -DisplayName "later"
# اقفل النافذة وافتح واحدة جديدة
$job = Get-BitsTransfer -Name "later"
$job | Select-Object JobState, BytesTransferred, BytesTotal
Complete-BitsTransfer $job`
        },
        {
          cmd: "winget upgrade / export / import",
          title: "حدّث كل برامجك وانقلها لجهاز جديد",
          desc: R`[[winget]] (مدير البرامج اللي سطّبت بيه PowerShell 7 في أول درس) بيعمل حاجتين بيوفروا ساعات: يحدّث كل البرامج المتسطبة بأمر واحد، ويكتب لستة برامجك في ملف JSON تسطّبها كلها على جهاز جديد بأمر واحد.

[[winget upgrade]] لوحده بيعرض البرامج اللي ليها نسخة أحدث من غير ما يحدّث حاجة: الاسم، و [[Id]] (الاسم الفريد للباكدج)، و [[Version]] اللي عندك، و [[Available]] الجديدة، و [[Source]] جاية منين ([[winget]] أو [[msstore]]). و [[--id Git.Git -e]] برنامج واحد بالـ Id بتاعه بالظبط. و [[--all]] بيحدّثهم كلهم، و [[--silent]] من غير نوافذ تسطيب (لو البرنامج بيدعم)، و [[--accept-package-agreements]] و [[--accept-source-agreements]] يوافقوا على الشروط من غير ما يسألوك.

[[winget pin add]] بيثبّت برنامج على نسخته فـ [[--all]] ميلمسوش (مفيد لبرنامج نسخته الجديدة فيها مشكلة، أو SDK شغلك محتاج نسخة معينة منه). و [[winget export -o]] بيكتب البرامج اللي winget يعرفها في ملف، و [[winget import -i]] على الجهاز الجديد بيسطّبهم كلهم، و [[--ignore-unavailable]] يكمّل لو برنامج مش موجود.

التحديث والتسطيب بيحتاجوا أدمن لبرامج كتير (هيطلع سؤال UAC لكل واحد، أو شغّل الترمنال كأدمن مرة). وبعض البرامج لازم تبقى مقفولة وانت بتحدّثها، وإلا التسطيب يفشل أو يطلب restart.`,
          example: R`winget upgrade
winget upgrade --id Git.Git -e
winget upgrade --all --silent --accept-package-agreements --accept-source-agreements
winget pin add --id Microsoft.DotNet.Runtime.8
winget export -o "$HOME\apps.json"
winget import -i "$HOME\apps.json" --accept-package-agreements --ignore-unavailable`,
          try: R`اعرض البرامج اللي محتاجة تحديث، وطلّع لستة برامجك في ملف وافتحه. (متشغّلش [[--all]] غير وانت فاضي ومقفّل برامجك.)`,
          flag: "danger",
          deep: {
            why: R`كل برنامج بيحدّث نفسه بطريقته (أو مبيحدّثش)، فبتلاقي نسخ قديمة فيها ثغرات. وجهاز جديد أو فورمات معناه يوم كامل تنزّل برامجك واحد واحد وتنسى نصهم. winget بيخلي الاتنين أمر واحد، وملف الـ JSON تحطه في OneDrive أو في repo الـ dotfiles بتاعك.`,
            how: R`winget بيعرف البرامج اللي عندك من «Installed apps» في ويندوز ويطابقها مع مخازنه. اللي متسطب من خارج winget (من موقع البرنامج) بيظهر برضه لو winget لقاه في المخزن، فتقدر تحدّثه من هنا.

[[winget upgrade --all]] بيسطّب النسخ الجديدة واحد ورا التاني، كل برنامج بالـ installer بتاعه، فممكن واحد يطلب restart أو يفتح نافذة رغم [[--silent]]. و [[--include-unknown]] بيضيف البرامج اللي winget مش عارف نسختها.

[[winget pin add --id X]] بيمنع X من [[--all]] بس، ولسه تقدر تحدّثه بإيدك بذكر اسمه ([[--blocking]] بيمنعه خالص). و [[winget pin list]] بيعرض المثبّتين، و [[winget pin remove --id X]] بيشيل.

الـ export بيكتب البرامج اللي ليها مصدر بس، ومن غير [[--include-versions]] مفيهوش أرقام نسخ فالـ import بيسطّب الأحدث. وبرامج msstore محتاجة تبقى داخل بحساب Microsoft. وفيه [[winget list]] كل المتسطب، و [[winget search name]] تدوّر على برنامج، و [[winget show --id X]] تفاصيله.

ولو عايز التحديث يحصل لوحده كل أسبوع: سكربت فيه [[winget upgrade --all ...]] و Register-ScheduledTask (درس لوحده)، بس الأحسن تشوف اللي هيتحدّث الأول.`,
            when: R`مرة كل أسبوع أو اتنين للتحديث، ومرة بعد ما تظبط جهازك للـ export (وكل ما تسطّب حاجة مهمة جديدة). والـ import أول حاجة على أي جهاز جديد.`,
            mistakes: R`تشغّل [[upgrade --all]] وانت في نص شغل فبرنامج مفتوح يتقفل أو يطلب restart. أو تفتكر الـ export بينقل الإعدادات والملفات: هو بينقل أسامي البرامج بس. أو تنسى [[--accept-source-agreements]] في سكربت فيقف مستني «Y». أو تحدّث Node أو Python أو SDK مشروعك محتاج نسخة معينة منه فالمشروع يقع؛ ثبّته بـ [[winget pin add]].`
          },
          teach: R`## الفكرة: أمر واحد يحدّث كله، وملف واحد ينقل كله

[[winget]] مش أمر PowerShell، ده برنامج ويندوز (مدير الباكدجات)، فبيتكتب زي أي برنامج: اسمه، وبعده أمر فرعي ([[upgrade]] أو [[export]] أو [[import]] أو [[pin]])، وبعده options بتبدأ بـ [[--]]. على جهازي شغّلت [[winget upgrade]] و [[winget export]] بس (winget v1.29)، لأن الباقي بيسطّب أو بيغيّر برامج فعلًا، وده من توثيق winget.

---

## ١. مين محتاج تحديث: [[winget upgrade]]

~~~powershell
winget upgrade
~~~

من غير أي حاجة بعده بيعرض بس، ومش بيحدّث حاجة:

~~~text الناتج (أول سطرين وآخر سطرين، والمسافات متقصّرة)
Name            Id                Version    Available  Source
--------------------------------------------------------------
AnyDesk         AnyDesk.AnyDesk   ad 9.7.16  9.8.0      winget
Docker Desktop  XP8CBJ40XLBWKX    4.82.0     4.93.0     msstore
...
17 upgrades available.
2 package(s) have version numbers that cannot be determined. Use --include-unknown to see all results.
~~~

| العمود | معناه |
|---|---|
| [[Name]] | اسم البرنامج زي ما بيظهر في ويندوز |
| [[Id]] | الاسم الفريد للباكدج، وده اللي بتستخدمه في الأوامر |
| [[Version]] | النسخة اللي عندك |
| [[Available]] | النسخة الجديدة |
| [[Source]] | جاية منين: [[winget]] (مخزن winget) أو [[msstore]] (Microsoft Store، والـ Id بتاعها كود زي [[XP8CBJ40XLBWKX]]) |

وآخر سطر: برنامجين winget مش عارف نسختهم، فمش بيعرضهم إلا مع [[--include-unknown]].

---

## ٢. برنامج واحد

~~~powershell
winget upgrade --id Git.Git -e
~~~

- [[--id Git.Git]] البرنامج بالـ Id بتاعه.
- [[-e]] اختصار [[--exact]]: الـ Id لازم يطابق بالظبط. من غيره winget بيدوّر بجزء من الاسم وممكن يمسك برنامج تاني.

---

## ٣. كله مرة واحدة

~~~powershell
winget upgrade --all --silent --accept-package-agreements --accept-source-agreements
~~~

| الـ option | معناه |
|---|---|
| [[--all]] | حدّث كل اللي في اللستة اللي فوق |
| [[--silent]] | من غير نوافذ تسطيب (لو البرنامج بيدعم ده) |
| [[--accept-package-agreements]] | وافق على رخصة كل برنامج من غير ما تسألني |
| [[--accept-source-agreements]] | وافق على شروط المخزن نفسه من غير ما تسألني |

من غير آخر اتنين، winget ممكن يقف ويستنى تكتب Y، وده بيعلّق أي سكربت.

---

## ٤. ثبّت برنامج على نسخته: [[winget pin add]]

~~~powershell
winget pin add --id Microsoft.DotNet.Runtime.8
~~~

بعدها [[--all]] بيعدّي البرنامج ده. و [[winget pin list]] بيعرض المثبّتين، وعندي طبع [[There are no pins configured.]] لأني مثبّتش حاجة.

---

## ٥. لستة برامجك في ملف: [[winget export]]

~~~powershell
winget export -o "$HOME\apps.json"
~~~

[[-o]] اختصار [[--output]]: الملف اللي هيتكتب. وهو بيكتب، بيطبع سطر لكل برنامج مش هيقدر ينقله:

~~~text الناتج (سطرين من كتير)
Installed package is not available from any source: AMD Software
Installed package is not available from any source: Armoury Crate Service
~~~

دي برامج ودرايفرات متسطبة من برّه أي مخزن، فـ winget مش هيعرف يسطّبها على جهاز تاني.

والملف نفسه JSON:

~~~text أول الملف
{
	"$schema" : "https://aka.ms/winget-packages.schema.2.0.json",
	"CreationDate" : "2026-10-06T10:11:39.765-00:00",
	"Sources" :
	[
		{
			"Packages" :
			[
				{
					"PackageIdentifier" : "XP8K0J757HHRDW"
				},
~~~

[[Sources]] لستة مخازن، وتحت كل مخزن [[Packages]]، وكل باكدج [[PackageIdentifier]] بس (الـ Id). عندي طلع 7 من [[msstore]] و 46 من [[winget]]. ومفيش أرقام نسخ، فالـ import بيسطّب الأحدث.

---

## ٦. على الجهاز الجديد: [[winget import]]

~~~powershell
winget import -i "$HOME\apps.json" --accept-package-agreements --ignore-unavailable
~~~

- [[-i]] اختصار [[--import-file]]: الملف اللي هيقرا منه.
- [[--ignore-unavailable]] لو برنامج مش لاقيه، كمّل الباقي بدل ما تقف.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| تشوف التحديثات | [[winget upgrade]] |
| تحدّث برنامج | [[winget upgrade --id X -e]] |
| تحدّث كله | [[winget upgrade --all --silent]] + الموافقات |
| تمنع برنامج من التحديث | [[winget pin add --id X]] |
| تحفظ لستة برامجك | [[winget export -o file.json]] |
| تسطّبها على جهاز جديد | [[winget import -i file.json]] |

والـ export بينقل **أسامي** البرامج بس، مش إعداداتها ولا ملفاتك.`,
          lines: [
            "اعرض البرامج اللي ليها تحديث، من غير ما يحدّث حاجة.",
            "حدّث برنامج واحد بالـ Id بتاعه بالظبط.",
            "حدّث كله من غير نوافذ ومن غير أسئلة الموافقة.",
            "ثبّت برنامج على نسخته عشان [[--all]] ميلمسوش.",
            "اكتب لستة برامجك في ملف JSON.",
            "على الجهاز الجديد: سطّب كل اللي في الملف، وكمّل لو حاجة مش موجودة."
          ],
          sol: R`جربت [[winget upgrade]] (winget v1.29) على جهازي فطلع جدول فيه سطور زي [[GitHub CLI  GitHub.cli  2.97.0  2.102.0  winget]] و [[Windows Subsystem for Linux  Microsoft.WSL  2.6.3.0  2.7.13  winget]]، وفي الآخر [[16 upgrades available.]] و [[2 package(s) have version numbers that cannot be determined. Use --include-unknown to see all results.]]

و [[winget export -o apps.json]] طبع سطور كتير زي [[Installed package is not available from any source: ...]] للبرامج اللي مش في أي مخزن (درايفرات وبرامج متسطبة يدوي)، ودي مش هتتنقل. والملف طلع JSON فيه [["Sources"]]، وتحت كل مصدر لستة [["PackageIdentifier"]]: عندي 46 من [[winget]] (زي [[Git.Git]] و [[VideoLAN.VLC]]) و 7 من [[msstore]] بأكواد زي [[XP89DCGQ3K6VLD]]. (مشغّلتش [[upgrade --all]] ولا [[import]] ولا [[pin add]] عشان مغيّرش حاجة على الجهاز.)`,
          solCode: R`winget upgrade
winget export -o "$HOME\apps.json"
Get-Content "$HOME\apps.json" -TotalCount 20`
        },
        {
          cmd: "Measure-Command",
          title: "الأمر ده بياخد قد إيه؟",
          desc: R`[[Measure-Command]] بيشغّل الكود اللي بين [[{ }]] ويرجّع خد وقت قد إيه، زي [[time]] في bash.

الناتج object نوعه TimeSpan، فيه [[TotalSeconds]] و [[TotalMilliseconds]] (الوقت كله بالثواني أو بالملّي)، و [[Seconds]] و [[Milliseconds]] (جزء من الوقت بس: 1.5 ثانية الـ [[Seconds]] بتاعتها 1 والـ [[Milliseconds]] 500). استخدم الـ Total دايمًا.

خلي بالك: Measure-Command بيرمي الـ output بتاع الكود، فمش هتشوف ناتج الأمر اللي بتقيسه، إلا لو حطيت [[| Out-Default]] جواه (بيبعته للشاشة مباشرة). والأقواس [[( ).TotalMilliseconds]] بتشغّل الأمر وتاخد خاصية من الناتج.

السطر التاني بيقيس وقت فتح PowerShell من غير profile، والتالت بالـ profile بتاعك: الفرق هو اللي الإضافات (oh-my-posh و Terminal-Icons ...) بتضيفه على كل نافذة. وآخر 3 سطور بيقارنوا طريقتين بيعملوا نفس الحاجة: array بـ [[+=]] (بتعمل array جديدة وتنسخ اللي فات مع كل عنصر) قصاد إنك تخزّن ناتج الـ [[foreach]] كله مرة واحدة. و [[1..20000]] الأرقام من 1 لـ 20000، و [[-f]] بيحط القيم مكان [[{0}]] و [[{1}]] في النص (درس النصوص)، و [[:N2]] يعني رقم برقمين بعد العلامة.`,
          example: R`Measure-Command { Start-Sleep -Milliseconds 300 }
(Measure-Command { pwsh -NoProfile -c exit }).TotalMilliseconds
(Measure-Command { pwsh -c exit }).TotalMilliseconds
$a = Measure-Command { $arr = @(); foreach ($i in 1..20000) { $arr += $i } }
$b = Measure-Command { $arr = foreach ($i in 1..20000) { $i } }
"+= : {0:N2}s   foreach = : {1:N2}s" -f $a.TotalSeconds, $b.TotalSeconds`,
          try: R`قارن [[1..100000 | ForEach-Object { $_ * 2 }]] بـ [[foreach ($n in 1..100000) { $n * 2 }]] بـ Measure-Command، وشغّل كل واحد مرتين.`,
          deep: {
            why: R`«ده بطيء» إحساس، و Measure-Command بيحوّله رقم. قبل ما تعدّل سكربت عشان تسرّعه، قيس: يمكن البطء في حتة تانية خالص. وبعد التعديل قيس تاني عشان تتأكد إنه اتحسّن فعلًا. ونفس الحكاية للـ profile: كل إضافة شكلها حلو بس بتاخد من وقت فتح كل نافذة.`,
            how: R`[[Measure-Command]] بيشغّل الكود في نفس الـ scope بتاعك، فأي متغير اتعمل جواه ([[$arr]] مثلًا) بيفضل موجود بعدها (جربتها في 5.1 و 7). والـ output بيترمي، لكن [[Write-Host]] بيبان لأنه مش output (درس «Write-Host والـ output»).

القياس مرة واحدة مش دقيق: أول تشغيل بيبقى أبطأ (تحميل موديولات وتجهيز الكود)، والجهاز بيعمل حاجات تانية في نفس الوقت. اعمله كذا مرة وخد المتوسط: [[1..5 | ForEach-Object { (Measure-Command { ... }).TotalMilliseconds } | Measure-Object -Average]].

للأوامر الخارجية نفس الفكرة: [[(Measure-Command { npm run build | Out-Default }).TotalSeconds]] بيوريك ناتج الـ build وبيقيسه. وفي PowerShell 7، [[Get-History]] فيه [[Duration]] لكل أمر شغّلته، فـ [[Get-History | Select-Object -Last 1 CommandLine, Duration]] بيقولك آخر أمر خد قد إيه من غير ما تعيده (في 5.1 الخاصية دي مش موجودة).

ولو عايز تقيس حتت جوه سكربت: [[$sw = [System.Diagnostics.Stopwatch]::StartNew()]] في الأول و [[$sw.Elapsed]] عند أي نقطة (زي check-site.ps1).`,
            when: R`لما سكربت أو build حاسس إنه بطيء، أو بتختار بين طريقتين، أو بعد ما تزوّد حاجة في الـ profile، أو عايز تثبت لحد إن التعديل سرّع فعلًا.`,
            mistakes: R`تقرا [[.Seconds]] أو [[.Milliseconds]] بدل [[.TotalSeconds]]، فـ 2.4 ثانية تطلع «400 ملّي». أو تقيس مرة واحدة وتحكم. أو تستغرب إن الأمر «مطبعش حاجة» (Measure-Command بيرمي الـ output). أو تقارن حاجة نزلت من النت أول مرة بنفس الحاجة وهي جاية من الكاش.`
          },
          teach: R`## الفكرة: شغّل الكود وقيس وقته

[[Measure-Command { كود }]] بيشغّل الكود اللي بين [[{ }]] ويرجّعلك خد قد إيه. كل الأرقام تحت من تشغيل المثال كسكربت في PowerShell 7.6 و 5.1 على لابتوب Ryzen 9، وأرقامك هتختلف حسب جهازك.

---

## ١. أبسط قياس

~~~powershell
Measure-Command { Start-Sleep -Milliseconds 300 }
~~~

[[Start-Sleep -Milliseconds 300]] بيستنى 300 ملّي ثانية (يعني 0.3 ثانية). والناتج object نوعه [[TimeSpan]] (مدة)، وفيه خانات كتير، أهمها:

~~~text الناتج (مختصر)
Seconds           : 0
Milliseconds      : 313
TotalSeconds      : 0.3134424
TotalMilliseconds : 313.4424
~~~

313 مش 300: الـ 13 الزيادة وقت تشغيل الأمر نفسه.

### [[Seconds]] ولا [[TotalSeconds]]؟

- [[TotalSeconds]] المدة **كلها** بالثواني.
- [[Seconds]] **جزء** الثواني بس من المدة، من غير الدقايق والملّي.

جربت مدة 2.4 ثانية: [[Seconds]] طلعت [[2]] و [[Milliseconds]] طلعت [[400]] و [[TotalSeconds]] طلعت [[2.4]]. فلو قريت [[.Milliseconds]] لوحدها هتفتكر الأمر خد 400 ملّي. استخدم الـ Total دايمًا.

---

## ٢. وقت فتح PowerShell

~~~powershell
(Measure-Command { pwsh -NoProfile -c exit }).TotalMilliseconds
(Measure-Command { pwsh -c exit }).TotalMilliseconds
~~~

- [[pwsh -c exit]] افتح PowerShell جديد، ونفّذ أمر [[exit]] (اقفل). يعني بنقيس الفتح والقفل بس.
- [[-NoProfile]] من غير ملف الـ profile بتاعك.
- الأقواس بتشغّل [[Measure-Command]] الأول، و [[.TotalMilliseconds]] بتاخد الرقم بس.

~~~text الناتج
383.3063
345.3054
~~~

على الجهاز ده الـ profile تقريبًا فاضي، فالفرق مجرد تذبذب (التاني طلع أسرع بالصدفة). لو عندك oh-my-posh وموديولات في الـ profile، السطر التاني هيطلع أبطأ بفرق واضح، والفرق ده هو تمنهم في كل نافذة.

---

## ٣. مقارنة طريقتين

### الطريقة الأولى: [[+=]]

~~~powershell
$a = Measure-Command { $arr = @(); foreach ($i in 1..20000) { $arr += $i } }
~~~

- [[@()]] array فاضية.
- [[1..20000]] الأرقام من 1 لـ 20000، و [[foreach ($i in ...)]] لف عليهم واحد واحد.
- [[$arr += $i]] زوّد الرقم. المشكلة إن الـ array في .NET حجمها ثابت، فكل [[+=]] بيعمل array جديدة وينسخ فيها كل اللي فات. 20000 مرة نسخ.
- [[$a =]] بنحفظ الـ TimeSpan عشان نطبعه بعدين.

### الطريقة التانية: خزّن ناتج اللوب

~~~powershell
$b = Measure-Command { $arr = foreach ($i in 1..20000) { $i } }
~~~

كل لفة بتطلّع [[$i]] كـ output، و PowerShell بيجمع الـ output كله ويحطه في [[$arr]] مرة واحدة في الآخر. نفس النتيجة ([[$arr.Count]] طلعت [[20000]] في الحالتين).

### الطباعة

~~~powershell
"+= : {0:N2}s   foreach = : {1:N2}s" -f $a.TotalSeconds, $b.TotalSeconds
~~~

[[-f]] بيحط أول قيمة مكان [[{0}]] والتانية مكان [[{1}]]. و [[:N2]] بعد الرقم معناها «رقم بخانتين بعد العلامة» (1.23456 بقت 1.23).

~~~text الناتج في PowerShell 7.6
+= : 0.83s   foreach = : 0.03s
~~~

~~~text الناتج في Windows PowerShell 5.1
+= : 10.70s   foreach = : 0.02s
~~~

في 5.1 الفرق أكتر من 500 مرة. PowerShell 7.5 حسّن [[+=]] كتير، بس لسه أبطأ بمراحل.

---

## ٤. حاجة لازم تعرفها: الـ output بيختفي

[[Measure-Command { "hello" }]] مش بيطبع [[hello]]: الأمر بيرمي أي output للكود اللي بيقيسه، وبيرجّع الـ TimeSpan بس. لو عايز تشوف الناتج وانت بتقيس، حط [[| Out-Default]] جوه الـ [[{ }]].

---

## الخلاصة

| عايز | اكتب |
|---|---|
| تقيس كود | [[Measure-Command { ... }]] |
| الرقم بالثواني | [[(Measure-Command { ... }).TotalSeconds]] |
| تشوف الناتج كمان | [[{ ... | Out-Default }]] |
| تطبع برقمين عشريين | [["{0:N2}" -f $x]] |

وقيس أكتر من مرة قبل ما تحكم، واقرا [[Total...]] مش [[Seconds]].`,
          lines: [
            "قيس أمر بسيط: الناتج TimeSpan بكل الوحدات.",
            "وقت فتح PowerShell من غير profile بالملّي ثانية.",
            "وقت فتحه بالـ profile بتاعك: الفرق هو تمن إضافاتك.",
            "الطريقة الأولى: array و [[+=]] لعشرين ألف رقم.",
            "الطريقة التانية: خزّن ناتج اللوب كله مرة واحدة.",
            "اطبع الوقتين برقمين بعد العلامة ([[-f]] و [[:N2]])."
          ],
          sol: R`جربتها على PowerShell 7.6.6: [[ForEach-Object]] (الـ pipeline) خد [[0.49]] ثانية، و [[foreach]] (اللوب) خد [[0.10]]، يعني اللوب أسرع حوالي 5 مرات، لأن الـ pipeline بيعدّي كل عنصر على أمر لوحده. وعلى 5.1 كانوا [[0.44]] و [[0.06]]. أرقامك هتختلف حسب الجهاز، المهم النسبة. والمرة التانية غالبًا أسرع شوية من الأولى، فقيس أكتر من مرة.

ومثال الـ array: على PowerShell 7.6 الـ [[+=]] لـ 20000 عنصر خد حوالي ثانية، وتخزين ناتج الـ foreach مرة واحدة خد حوالي [[0.01]] ثانية. وعلى Windows PowerShell 5.1 الـ [[+=]] خد [[11.7]] ثانية (PowerShell 7.5 حسّن [[+=]] كتير، بس لسه أبطأ بفرق كبير). و [[Measure-Command { Start-Sleep -Milliseconds 300 }]] رجّع [[TotalMilliseconds : 325.0354]]: الـ 25 الزيادة وقت تشغيل الأمر نفسه. وفتح PowerShell 7 من غير profile خد حوالي 300 ملّي ثانية.`,
          solCode: R`(Measure-Command { 1..100000 | ForEach-Object { $_ * 2 } }).TotalSeconds
(Measure-Command { foreach ($n in 1..100000) { $n * 2 } }).TotalSeconds`
        },
        {
          cmd: "Start-Job",
          title: "شغّل حاجة في الخلفية وكمّل شغلك",
          desc: R`[[Start-Job]] بيشغّل كود في الخلفية في PowerShell تاني مستقل، والترمنال يرجعلك على طول تكمّل شغلك، وبعدين تجيب الناتج لما يخلص. زي [[&]] في آخر الأمر في bash و [[jobs]] هناك.

كل شغلانة اسمها job ليها رقم واسم وحالة. و [[-Name size]] اسم تنادي بيه الـ job بدل الرقم. والكود بين [[{ }]] بيشتغل في عملية تانية مش شايفة متغيراتك، فـ [[$using:folder]] بتبعتله قيمة المتغير [[$folder]] من عندك. و [[Get-Job]] بيعرض كل الـ jobs: [[State]] ([[Running]] شغالة و [[Completed]] خلصت و [[Failed]] فشلت) و [[HasMoreData]] (فيه ناتج لسه مقريتهوش).

[[Receive-Job]] بيجيب الناتج: [[-Wait]] يستنى لو لسه شغالة، و [[-AutoRemoveJob]] يمسحها من الليستة بعد ما يجيب ناتجها (من غيره بتفضل في [[Get-Job]]). و [[Remove-Job]] بيمسح job (ولو لسه شغالة محتاج [[-Force]]).

في PowerShell 7 فيه اختصار: [[&]] في آخر أي أمر بيعمله job على طول زي bash، فـ [[$j = ping -n 4 github.com &]] بيحط الـ job في [[$j]]. و [[Start-ThreadJob]] (موجود في 7 من غير تسطيب) نفس الفكرة بس في thread جوه نفس العملية، فبيبدأ أسرع بكتير وأخف على الرام.`,
          example: R`$folder = "$HOME\Downloads"
Start-Job -Name size { [math]::Round((Get-ChildItem $using:folder -Recurse -File | Measure-Object Length -Sum).Sum / 1GB, 2) }
Get-Job
Receive-Job -Name size -Wait -AutoRemoveJob
$j = ping -n 4 github.com &
$j | Receive-Job -Wait -AutoRemoveJob
Start-ThreadJob { Invoke-RestMethod https://api.github.com/zen } | Receive-Job -Wait -AutoRemoveJob`,
          try: R`ابدأ job بيحسب حجم فولدر كبير (زي [[C:\Windows]] مع [[-ErrorAction SilentlyContinue]])، وفي نفس الوقت اشتغل عادي في الترمنال، وبعدين هات الناتج.`,
          deep: {
            why: R`حاجات بتاخد وقت ومش محتاج تتفرج عليها: حساب حجم فولدرات، أو ping طويل، أو تحميل، أو build. بدل ما تفتح تاب تاني وتنسى فيه إيه، Start-Job بيشغّلها في الخلفية وتجيب النتيجة لما تحتاجها. وفي سكربت تقدر تشغّل كذا حاجة مع بعض وتستناهم كلهم بـ [[Wait-Job]].`,
            how: R`[[Start-Job]] بيفتح عملية [[pwsh]] جديدة لكل job، وده بياخد وقت ورام، والناتج بيرجعلك نسخة من البيانات (serialized) مش الـ object الأصلي بالـ methods بتاعته. [[Start-ThreadJob]] بيشتغل في thread جوه نفس العملية، فأسرع وأخف، و [[-ThrottleLimit]] بيحدد كام واحد يشتغل مع بعض. ودا نفس اللي [[ForEach-Object -Parallel]] بيستخدمه.

الفولدر اللي الـ job بيبدأ فيه: في PowerShell 7 الفولدر الحالي بتاعك، وفي 5.1 فولدر Documents (جربتها في الاتنين)، فاستخدم مسارات كاملة أو [[$using:PWD]]. و [[&]] في آخر الأمر مش موجود في 5.1 (بيطلع [[The ampersand (&) character is not allowed]]).

الـ jobs عايشة طول ما النافذة مفتوحة: لو قفلت PowerShell كل الـ jobs بتتقفل. لو عايز حاجة تكمّل بعد ما تقفل، ده Start-Process (برنامج منفصل) أو Task Scheduler أو BITS للتحميل.

[[Wait-Job -Timeout 60]] بيستنى لحد 60 ثانية بس، و [[Stop-Job]] بيوقف واحدة شغالة. ولو job فشلت، [[Receive-Job]] بيطبع الـ error بتاعها.`,
            when: R`أي أمر بياخد أكتر من كام ثانية ومش محتاج تتفرج عليه، أو سكربت عايز يعمل كذا حاجة مستقلة مع بعض (يكلّم كذا API أو يفحص كذا سيرفر) بدل واحدة ورا التانية.`,
            mistakes: R`تستخدم متغير من بره جوه الـ job من غير [[$using:]] فيبقى فاضي. أو تعمل [[Start-Job]] لـ 100 حاجة صغيرة فكل واحدة تفتح pwsh جديد وتبقى أبطأ من إنك تعملهم ورا بعض ([[Start-ThreadJob]] أو [[-Parallel]] أحسن). أو تنسى [[Receive-Job]] وتسيب jobs خلصت مالية [[Get-Job]]. أو تشغّل في job حاجة بتسأل سؤال (Read-Host أو تأكيد) فتفضل مستنية للأبد. أو تقفل النافذة وتفتكر الـ job كمّل.`
          },
          teach: R`## الفكرة: ابدأ الشغلانة، وكمّل، وهات النتيجة بعدين

[[Start-Job]] بيشغّل كود في PowerShell تاني في الخلفية، والترمنال يرجعلك على طول. والشغلانة دي اسمها **job**، ليها رقم واسم وحالة. المثال اتشغّل كسكربت في PowerShell 7.6.

---

## ١. ابدأ job

~~~powershell
$folder = "$HOME\Downloads"
Start-Job -Name size { [math]::Round((Get-ChildItem $using:folder -Recurse -File | Measure-Object Length -Sum).Sum / 1GB, 2) }
~~~

### الكود اللي جوه، من جوه لبرة

| الحتة | بتعمل إيه |
|---|---|
| [[Get-ChildItem $using:folder -Recurse -File]] | كل الملفات في الفولدر وكل اللي جواه |
| [[Measure-Object Length -Sum]] | اجمع خانة [[Length]] (الحجم بالبايت) |
| [[( ).Sum]] | خد المجموع |
| [[/ 1GB]] | حوّله جيجا |
| [[[math]::Round(..., 2)]] | قرّبه لرقمين بعد العلامة |

### ليه [[$using:]]؟

الـ job بيشتغل في **عملية تانية** (pwsh جديد)، ومش شايف المتغيرات اللي عندك. [[$using:folder]] معناها «ابعت للـ job قيمة [[$folder]] من عندي». جربت:

~~~text الناتج
Start-Job { "[$outer]" }        →  []
Start-Job { "[$using:outer]" }  →  [hello]
~~~

([[$outer]] كان [["hello"]] بره.) من غير [[$using:]] المتغير فاضي، ومن غير أي error.

### اللي بيطبعه Start-Job

~~~text الناتج
Id Name PSJobTypeName State   HasMoreData
-- ---- ------------- -----   -----------
 1 size BackgroundJob Running        True
~~~

[[-Name size]] الاسم اللي هننادي بيه. و [[State Running]] لسه شغال، والترمنال رجعلك من غير ما يستنى.

---

## ٢. الحالة: [[Get-Job]]

~~~powershell
Get-Job
~~~

نفس الجدول: كل الـ jobs بتاعة النافذة دي.

| العمود | معناه |
|---|---|
| [[State]] | [[Running]] شغال، [[Completed]] خلص، [[Failed]] فشل |
| [[HasMoreData]] | فيه ناتج لسه مقريتهوش |
| [[PSJobTypeName]] | نوعه: [[BackgroundJob]] (عملية منفصلة) أو [[ThreadJob]] |

---

## ٣. هات الناتج: [[Receive-Job]]

~~~powershell
Receive-Job -Name size -Wait -AutoRemoveJob
~~~

- [[-Wait]] لو لسه شغال استنى لحد ما يخلص.
- [[-AutoRemoveJob]] بعد ما تجيب الناتج امسح الـ job من الليستة.

~~~text الناتج
5.36
~~~

حجم Downloads بالجيجا. وبعدها [[Get-Job]] بقى فاضي (العدد [[0]]).

---

## ٤. اختصار PowerShell 7: [[&]] في الآخر

~~~powershell
$j = ping -n 4 github.com &
$j | Receive-Job -Wait -AutoRemoveJob
~~~

[[&]] في **آخر** الأمر (زي bash) بيحوّله job على طول. و [[ping -n 4]] يبعت 4 طلبات. [[$j]] طلع job نوعه [[PSRemotingJob]] وحالته [[Running]]، وبعد Receive-Job آخر الناتج:

~~~text الناتج (آخر 3 سطور)
    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),
Approximate round trip times in milli-seconds:
    Minimum = 65ms, Maximum = 95ms, Average = 73ms
~~~

في Windows PowerShell 5.1 ده مش موجود:

~~~text الناتج في 5.1
The ampersand (&) character is not allowed. The & operator is reserved for future use; ...
~~~

---

## ٥. [[Start-ThreadJob]]: أخف وأسرع

~~~powershell
Start-ThreadJob { Invoke-RestMethod https://api.github.com/zen } | Receive-Job -Wait -AutoRemoveJob
~~~

نفس الفكرة، بس الكود بيشتغل في **thread** جوه نفس العملية بدل pwsh جديد. و [[https://api.github.com/zen]] بيرجّع جملة عشوائية:

~~~text الناتج (بيتغير كل مرة)
Half measures are as bad as nothing at all.
~~~

والفرق في السرعة، قست job بيرجّع [[1]] بس:

| النوع | الوقت |
|---|---|
| [[Start-Job]] | حوالي 531 ملّي ثانية (بيفتح pwsh جديد) |
| [[Start-ThreadJob]] | حوالي 44 ملّي ثانية |

---

## الخلاصة

| عايز | اكتب |
|---|---|
| تبدأ في الخلفية | [[Start-Job -Name x { ... }]] أو [[أمر &]] (7 بس) |
| متغير من بره | [[$using:name]] |
| تشوف الحالة | [[Get-Job]] |
| تجيب الناتج وتمسحه | [[Receive-Job -Name x -Wait -AutoRemoveJob]] |
| أخف وأسرع | [[Start-ThreadJob { ... }]] |

والـ jobs بتموت لما تقفل النافذة.`,
          lines: [
            "الفولدر اللي هنحسب حجمه.",
            "ابدأ job اسمها size في الخلفية، و [[$using:folder]] بيبعتلها قيمة المتغير.",
            "اعرض الـ jobs وحالتها.",
            "استنى لحد ما تخلص، وهات الناتج، وامسحها من الليستة.",
            "PowerShell 7: [[&]] في آخر أي أمر بيشغّله job.",
            "هات ناتج الـ ping لما يخلص.",
            "thread job (أخف وأسرع) بيكلّم API، وهات الناتج على طول."
          ],
          sol: R`جربت المثال على PowerShell 7.6: [[Start-Job]] طبع سطر الـ job على طول ([[1  size  BackgroundJob  Running]]) والترمنال رجعلي، و [[Get-Job]] طلع نفس السطر و [[HasMoreData True]]، و [[Receive-Job -Wait]] استنى ثواني وطلع [[5.32]] (حجم Downloads عندي بالجيجا). و [[ping ... &]] رجّع job، و [[Receive-Job]] طبع ناتج ping كامل، و [[Start-ThreadJob]] رجّع جملة من GitHub زي [[Accessible for all.]] (بتتغير كل مرة). وفي الآخر [[Get-Job]] بقى فاضي بسبب [[-AutoRemoveJob]].

في تجربتك: الـ job بتاع [[C:\Windows]] بياخد دقيقة أو أكتر وانت شغال عادي، و [[Get-Job win]] هتلاقيه Running، ولما يبقى Completed هات الناتج. ولو نسيت [[$using:]] مع متغير من بره، الـ job هيشوفه فاضي: جربت [[$outer = "hello"]] وجوه الـ job [[$outer]] طلع فاضي و [[$using:outer]] طلع [[hello]].`,
          solCode: R`Start-Job -Name win { (Get-ChildItem C:\Windows -Recurse -File -ErrorAction SilentlyContinue | Measure-Object Length -Sum).Sum / 1GB }
Get-Job win
Receive-Job -Name win -Wait -AutoRemoveJob`
        },
        {
          cmd: "Out-GridView",
          title: "جدول تفاعلي تفلتر وتختار منه",
          desc: R`[[Out-GridView]] (اختصاره [[ogv]]) بيعرض أي ناتج في نافذة جدول: ترتب بالضغط على العمود، وتكتب في خانة Filter اللي فوق تفلتر الصفوف، وتضيف شروط بـ «Add criteria». ومع [[-PassThru]] بيبقى أداة اختيار: تحدد صفوف (Ctrl أو Shift مع الكليك) وتدوس OK فيرجعوا للـ pipeline ويكمّلوا للأمر اللي بعده.

[[-Title]] عنوان النافذة. والسطر التاني بيعرض العمليات بعمود محسوب [[@{ n = "RAM_MB"; e = { ... } }]] (زي درس Get-CimInstance) فيه الرام بالميجا، وبعد ما تختار وتدوس OK بيروحوا لـ [[Stop-Process]] بـ [[-WhatIf]] (يقولك هيقفل إيه من غير ما يقفل). و Stop-Process بيعرف يقرا الـ [[Id]] من أي object جاله. و [[-OutputMode Single]] بيسمح باختيار صف واحد بس، و [[Invoke-Item]] بيفتح الملف المختار. و [[-Wait]] بيخلي الأمر يستنى لحد ما تقفل النافذة، وده لازم لو بتشغّله من سكربت بـ [[pwsh -File]]، وإلا السكربت يخلص والنافذة تتقفل معاه.

ويندوز بس، ومحتاج واجهة رسومية (مش هيشتغل في SSH ولا على Windows Server Core). كان موجود في 5.1، واختفى في PowerShell 6، ورجع في PowerShell 7 على ويندوز.`,
          example: R`Get-Service | Out-GridView
Get-Process | Select-Object Name, Id, @{ n = "RAM_MB"; e = { [math]::Round($_.WorkingSet64 / 1MB) } } | Out-GridView -Title "Pick processes to stop" -PassThru | Stop-Process -WhatIf
Get-ChildItem $HOME\Downloads -File | Sort-Object LastWriteTime -Descending | Out-GridView -Title "Open a file" -OutputMode Single | Invoke-Item
Import-Csv .\disk-report.csv | Out-GridView -Title "Disk report" -Wait`,
          try: R`اعرض العمليات، وفلتر بكلمة [[chrome]] أو [[code]]، ورتّب بـ RAM_MB، واختار اتنين ودوس OK، وشوف سطور What if.`,
          deep: {
            why: R`ساعات عايز تبص على بيانات كتير وتدوّر فيها بإيدك: مئات العمليات أو الخدمات أو صفوف CSV. الجدول في الترمنال بيتقطع وصعب تفلتره، و Excel كتير عليه. و [[-PassThru]] بيحل مشكلة «عايز أختار كام حاجة من لستة وأعمل فيهم حاجة» من غير ما تكتب [[Where-Object]] بشروط.`,
            how: R`[[Out-GridView]] بيعرض الخصائص اللي الـ object بيعرضها افتراضيًا، فاعمل [[Select-Object]] قبله بالأعمدة اللي عايزها بالظبط. والفلتر والترتيب جوه النافذة عرض بس؛ اللي بيرجع مع [[-PassThru]] هو الـ objects اللي اخترتها بكل خصائصها.

[[-OutputMode]] ليه 3 قيم: [[None]] (الافتراضي، عرض بس)، و [[Single]] (صف واحد)، و [[Multiple]] (أكتر من صف، وده نفس [[-PassThru]]).

في PowerShell 7 الأمر جاي في موديول Microsoft.PowerShell.Utility على ويندوز بس. على لينكس والماك أو في SSH فيه بديل جوه الترمنال نفسه: موديول [[Microsoft.PowerShell.ConsoleGuiTools]] وأمره [[Out-ConsoleGridView]] (اختصاره [[ocgv]])، بنفس الفكرة ونفس [[-OutputMode]].

مع [[-PassThru]] أو [[-OutputMode]] أو [[-Wait]] الترمنال بيستنى لحد ما تقفل النافذة، ومن غيرهم بيرجعلك على طول والنافذة فاضلة مفتوحة.`,
            when: R`استكشاف بيانات بسرعة، أو أداة صغيرة لنفسك («اختار الخدمات اللي تتقفل»، «اختار الفولدرات اللي تتضغط»)، أو تعرض نتيجة سكربت لحد مش بيحب الترمنال.`,
            mistakes: R`تشغّله في SSH أو على Server Core فيطلع error لأن مفيش شاشة. أو تحطه في سكربت بيشتغل لوحده (Task Scheduler) فيفضل مستني حد يدوس OK. أو تنسى [[-PassThru]] وتستغرب إن OK مش بيعمل حاجة. أو تبعت الاختيار لأمر خطير (Stop-Process أو Remove-Item) من غير [[-WhatIf]] الأول.`
          },
          teach: R`## الفكرة: الناتج يطلع في نافذة جدول، وتختار منه بالماوس

[[Out-GridView]] بيفتح نافذة فيها جدول بالناتج، تفلتر وترتب فيه. ومع [[-PassThru]] أو [[-OutputMode]] بيبقى «أداة اختيار»: الصفوف اللي تختارها وتدوس OK ترجع للـ pipeline وتكمّل للأمر اللي بعده. النافذة نفسها مفتحتهاش وأنا بكتب الدرس (بتستنى حد يدوس عليها)، فشكلها وسلوكها من توثيق Microsoft، وكل الحتت اللي حواليها اتجربت في PowerShell 7.6.

---

## ١. عرض بس

~~~powershell
Get-Service | Out-GridView
~~~

كل الخدمات في نافذة. فوق فيه خانة **Filter**: اللي تكتبه فيها بيفلتر الصفوف وانت بتكتب، في كل الأعمدة. والضغط على اسم عمود بيرتب بيه. و **Add criteria** بيضيف شرط على عمود معين. والترمنال بيرجعلك على طول، والنافذة فاضلة مفتوحة.

---

## ٢. اختار عمليات وابعتها لأمر تاني

~~~powershell
Get-Process | Select-Object Name, Id, @{ n = "RAM_MB"; e = { [math]::Round($_.WorkingSet64 / 1MB) } } | Out-GridView -Title "Pick processes to stop" -PassThru | Stop-Process -WhatIf
~~~

نمشي على الـ pipeline من الشمال:

### [[Select-Object Name, Id, @{ ... }]]

اختار عمودين، وزوّد عمود محسوب (calculated property): [[n]] اسمه [[RAM_MB]]، و [[e]] الكود اللي بيحسبه: [[$_.WorkingSet64]] الرام اللي العملية ماسكاها بالبايت، [[/ 1MB]] بالميجا، و [[[math]::Round]] من غير كسور. ده اللي النافذة هتعرضه. جربته من غير النافذة على أكبر 3 عمليات:

~~~text الناتج
Name                  Id  RAM_MB
----                  --  ------
Memory Compression  5344 1652.00
vmmemWSL           30620  937.00
msedgewebview2     39896  631.00
~~~

### [[Out-GridView -Title "..." -PassThru]]

- [[-Title]] عنوان النافذة.
- [[-PassThru]]: النافذة بيبقى تحتها زرارين OK و Cancel. تحدد صف أو أكتر (Ctrl أو Shift مع الكليك) وتدوس OK، فالصفوف دي بس تكمّل في الـ pipeline. الترمنال واقف لحد ما تقفل النافذة.

### [[Stop-Process -WhatIf]]

[[Stop-Process]] بيقفل عمليات، وبيعرف ياخد الـ [[Id]] من أي object جاله فيه خانة اسمها Id. و [[-WhatIf]] بيقولك «كنت هعمل إيه» من غير ما يعمله. جربت نفس السطر بس بعملية ping أنا اللي شغّلتها بدل النافذة:

~~~text الناتج
What if: Performing the operation "Stop-Process" on target "PING (10480)".
~~~

يعني الـ object اللي طالع من Select-Object وصل لـ Stop-Process صح. (وقفلت الـ ping بتاعي بعدها.)

---

## ٣. اختار ملف واحد وافتحه

~~~powershell
Get-ChildItem $HOME\Downloads -File | Sort-Object LastWriteTime -Descending | Out-GridView -Title "Open a file" -OutputMode Single | Invoke-Item
~~~

- [[Get-ChildItem ... -File]] ملفات Downloads من غير الفولدرات.
- [[Sort-Object LastWriteTime -Descending]] الأحدث الأول.
- [[-OutputMode Single]] مسموح تختار صف **واحد** بس.
- [[Invoke-Item]] بيفتح الملف المختار بالبرنامج الافتراضي بتاعه.

[[-OutputMode]] ليه 3 قيم بس (طبعتهم من الـ enum بتاعه):

| القيمة | معناها |
|---|---|
| [[None]] | عرض بس (الافتراضي) |
| [[Single]] | اختيار صف واحد |
| [[Multiple]] | أكتر من صف، زي [[-PassThru]] |

---

## ٤. اعرض واستنى: [[-Wait]]

~~~powershell
Import-Csv .\disk-report.csv | Out-GridView -Title "Disk report" -Wait
~~~

[[Import-Csv]] يقرا CSV (درس Import-Csv). و [[-Wait]] بيخلي الأمر يستنى لحد ما تقفل النافذة. ده مهم لو بتشغّل السكربت بـ [[pwsh -File]]: من غيره السكربت يخلص، و PowerShell يقفل، والنافذة تتقفل معاه قبل ما تشوفها.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| تعرض بس | [[... | Out-GridView]] |
| تختار كذا صف ويكمّلوا | [[-PassThru]] أو [[-OutputMode Multiple]] |
| تختار صف واحد | [[-OutputMode Single]] |
| السكربت يستنى النافذة | [[-Wait]] |
| عنوان | [[-Title "..."]] |

ويندوز بس، ومحتاج شاشة: مش هيشتغل في SSH. وقبل ما تبعت الاختيار لأمر خطير، جرّب بـ [[-WhatIf]].`,
          lines: [
            "اعرض الخدمات في جدول تفاعلي تفلتر وترتب فيه.",
            "العمليات بعمود رام بالميجا: اختار منهم ودوس OK فيروحوا لـ Stop-Process (بـ [[-WhatIf]] للتجربة).",
            "أحدث ملفات Downloads: اختار ملف واحد ([[-OutputMode Single]]) ويتفتح.",
            "اعرض CSV في جدول، واستنى لحد ما النافذة تتقفل ([[-Wait]])."
          ],
          sol: R`(مشغّلتهوش وأنا بكتب الدرس لأنه بيفتح نافذة بتستنى إيدك؛ اللي تحت من تجربة نفس الأوامر من غير النافذة ومن توثيق Microsoft.) النافذة بتفتح بأعمدة Name و Id و RAM_MB، والكتابة في Filter بتفلتر وانت بتكتب في كل الأعمدة. وبعد OK، [[Stop-Process -WhatIf]] بيطبع سطر لكل اختيار ومش بيقفل حاجة. جربت إن الـ object اللي طالع من [[Select-Object]] بالأعمدة دي بيوصل لـ Stop-Process صح على عملية ping شغّلتها للتجربة: طلع [[What if: Performing the operation "Stop-Process" on target "PING (36240)".]]، ولما شلت [[-WhatIf]] العملية اتقفلت فعلًا.

لو دوست Cancel أو قفلت النافذة، مفيش حاجة بتعدّي للأمر اللي بعده. ولو نسيت [[-PassThru]]، OK مش هيرجع حاجة. وشيل [[-WhatIf]] بس لما تبقى متأكد من اختيارك.`
        },
        {
          cmd: "FileSystemWatcher",
          title: "راقب فولدر واعمل حاجة لما ملف يوصل",
          desc: R`[[System.IO.FileSystemWatcher]] class من .NET بيراقب فولدر ويقولك لما ملف يتعمل أو يتعدّل أو يتمسح أو يتغير اسمه. المثال بيراقب Downloads، وكل ما PDF جديد يوصل يطبع اسمه ويعمل صوت، لحد ما تدوس Ctrl+C.

[[::new($folder, "*.pdf")]] بيعمل watcher على الفولدر ده، والـ filter التاني بيحدد أنهي ملفات ([[*]] أي حروف). و [[[System.IO.WatcherChangeTypes]'Created, Renamed']] الأحداث اللي تهمنا: النص اللي فيه أسامي مفصولة بفاصلة بيتحوّل لقيمة واحدة فيها الاتنين. و Renamed مهمة هنا: المتصفح بينزّل الملف باسم مؤقت زي [[report.pdf.crdownload]] وفي الآخر بيغيّر اسمه، فلو راقبت Created بس مش هتشوفه.

[[while ($true)]] لوب مالوش نهاية. جواه [[WaitForChanged($events, 1000)]] بيستنى حدث لحد ثانية (1000 ملّي)، وبيرجع object فيه [[TimedOut]] (True لو الثانية عدّت من غير حاجة) و [[Name]] اسم الملف و [[ChangeType]] نوع الحدث. لو مفيش حاجة، [[continue]] ترجع لأول اللوب. والثانية دي مهمة: من غيرها الأمر بيستنى للأبد و Ctrl+C مش هيوقفه غير لما ملف يوصل. و [[[console]::Beep(1000, 150)]] صوت 1000 هرتز لمدة 150 ملّي ثانية.`,
          example: R`$folder = Join-Path $HOME "Downloads"
$watcher = [System.IO.FileSystemWatcher]::new($folder, "*.pdf")
$events = [System.IO.WatcherChangeTypes]'Created, Renamed'
Write-Host "Watching $folder for PDFs... Ctrl+C to stop"
while ($true) {
    $c = $watcher.WaitForChanged($events, 1000)
    if ($c.TimedOut) { continue }
    Write-Host "$(Get-Date -Format HH:mm:ss) $($c.ChangeType): $($c.Name)" -ForegroundColor Green
    [console]::Beep(1000, 150)
}`,
          try: R`شغّله، ومن نافذة تانية اعمل [[New-Item "$HOME\Downloads\test.pdf"]]، وبعدين نزّل أي PDF من المتصفح. وبعدين خليه ينقل كل PDF جديد لفولدر [[Documents\PDFs]].`,
          flag: "script",
          deep: {
            why: R`حاجات كتير بتستنى «لما ملف يوصل»: فاتورة نزلت تتنقل لفولدرها، صورة اتحفظت تتصغّر، CSV وصل من نظام تاني يتعالج، أو build يتعمل لما ملف يتغير. بدل ما تفحص الفولدر كل شوية، ويندوز نفسه بيبلّغ الـ watcher أول ما حاجة تحصل.`,
            how: R`فيه طريقتين. [[WaitForChanged]] (المثال) بسيطة: بتستنى حدث واحد وترجع. عيبها إن الأحداث اللي بتحصل وانت بتعالج الحدث اللي فات (بتنقل ملف مثلًا) بتضيع، لأنها مش بتسمع غير وهي مستنية. [[Register-ObjectEvent]] (الـ solCode) بيسجّل الأحداث في طابور: [[-SourceIdentifier]] اسم للتسجيل، و [[$watcher.EnableRaisingEvents = $true]] يبدأ الإرسال، و [[Wait-Event -Timeout 1]] ياخد أقدم حدث في الطابور، و [[Remove-Event]] يشيله منه، و [[$e.SourceEventArgs.Name]] اسم الملف، و [[Unregister-Event]] في الآخر يلغي التسجيل.

الأحداث: [[Created]] و [[Changed]] و [[Deleted]] و [[Renamed]]. و [[Changed]] بيتكرر: كتابة واحدة في ملف ممكن تطلّع أكتر من حدث (جربت كتابة 100 ألف حرف وطلعت حدثين)، فلو بتعالج Changed استنى شوية واتجاهل التكرار. و [[$watcher.IncludeSubdirectories = $true]] يراقب الفولدرات اللي جوه كمان.

الـ Created بيوصلك أول ما الملف يتعمل، مش لما يخلص كتابة. ملف كبير بيتنسخ هيفضل مقفول ثواني، و [[Move-Item]] هيفشل بـ «being used by another process». عشان كده [[Start-Sleep]] قبل النقل و [[try/catch]] حواليه.

الـ watcher عايش طول ما النافذة مفتوحة. عشان يشتغل دايمًا: سكربت + Register-ScheduledTask بـ [[-AtLogOn]] (درس Register-ScheduledTask).`,
            when: R`أتمتة فولدر Downloads أو فولدر «inbox» بيوصلّه ملفات من برنامج تاني، أو تشغيل أمر لما ملف config يتغير، أو تسجيل مين بيعدّل في فولدر مشترك.`,
            mistakes: R`تراقب [[Created]] بس وتستغرب إن تحميلات المتصفح مش بتظهر (هي Renamed). أو [[WaitForChanged]] من غير timeout فـ Ctrl+C ميوقفوش. أو تعالج الملف قبل ما البرنامج اللي بيكتبه يخلص. أو تعمل حاجة بطيئة جوه لوب [[WaitForChanged]] فملفات توصل وانت مشغول وتضيع. أو تنقل الملفات لفولدر جوه نفس الفولدر اللي بتراقبه مع [[IncludeSubdirectories]] فتعمل أحداث جديدة من نفسك.`
          },
          teach: R`## الفكرة: ويندوز يبلّغك أول ما ملف يوصل

بدل ما تفحص الفولدر كل شوية، [[FileSystemWatcher]] بيطلب من ويندوز يبلّغه بأي تغيير. المثال بيستنى في لوب، وكل ما PDF يوصل Downloads يطبع اسمه. جربته في PowerShell 7.6 على فولدر تجربة بدل Downloads، و thread job بيعمل الملفات بعد ثانيتين (وشلت الـ Beep من التجربة عشان الصوت).

---

## ١. الفولدر والـ watcher

~~~powershell
$folder = Join-Path $HOME "Downloads"
$watcher = [System.IO.FileSystemWatcher]::new($folder, "*.pdf")
~~~

- [[[System.IO.FileSystemWatcher]]] class من .NET، و [[::new(...)]] بيعمل object جديد منه.
- أول قيمة الفولدر، والتانية **filter**: أنهي ملفات تهمنا. [[*]] يعني أي حروف، فـ [[*.pdf]] أي اسم بيخلص بـ [[.pdf]].

~~~text الناتج من $watcher | Format-List Path, Filter, IncludeSubdirectories
Path                  : C:\...\fsw
Filter                : *.pdf
IncludeSubdirectories : False
~~~

[[IncludeSubdirectories : False]] يعني الفولدرات اللي جوه مش متراقبة.

---

## ٢. الأحداث اللي تهمنا

~~~powershell
$events = [System.IO.WatcherChangeTypes]'Created, Renamed'
~~~

[[WatcherChangeTypes]] لستة أنواع الأحداث: [[Created]] و [[Deleted]] و [[Changed]] و [[Renamed]]. والنص [['Created, Renamed']] بأسامي مفصولة بفاصلة بيتحوّل لقيمة **واحدة** فيها الاتنين. جوه، كل نوع رقم: Created = 1 و Renamed = 8، والقيمة دي = 9 (الاتنين مع بعض). طبعتها:

~~~text الناتج
Created, Renamed
~~~

### ليه Renamed؟

المتصفح بينزّل الملف باسم مؤقت زي [[report.pdf.crdownload]]، وفي الآخر بيغيّر اسمه لـ [[report.pdf]]. الاسم المؤقت مش بيخلص بـ [[.pdf]] فمش بيعدّي الـ filter، واللي بيحصل للاسم الحقيقي هو **Renamed** مش Created.

---

## ٣. اللوب

~~~powershell
Write-Host "Watching $folder for PDFs... Ctrl+C to stop"
while ($true) {
    $c = $watcher.WaitForChanged($events, 1000)
    if ($c.TimedOut) { continue }
    Write-Host "$(Get-Date -Format HH:mm:ss) $($c.ChangeType): $($c.Name)" -ForegroundColor Green
    [console]::Beep(1000, 150)
}
~~~

### [[while ($true)]]

لوب الشرط بتاعه دايمًا True، فمالوش نهاية. بيقف بـ Ctrl+C.

### [[$watcher.WaitForChanged($events, 1000)]]

استنى لحد ما حدث من النوعين دول يحصل، **أو** لحد 1000 ملّي ثانية (ثانية) تعدّي، أيهم الأول. وبيرجّع object فيه:

| الخانة | معناها |
|---|---|
| [[TimedOut]] | True لو الثانية عدّت من غير حاجة |
| [[Name]] | اسم الملف |
| [[OldName]] | الاسم القديم (في Renamed بس) |
| [[ChangeType]] | نوع الحدث |

ليه الثانية؟ من غيرها الأمر بيستنى للأبد، و Ctrl+C مش بيوصل غير لما ملف يوصل.

### [[if ($c.TimedOut) { continue }]]

لو مفيش حاجة حصلت، [[continue]] يرجع لأول اللوب ويستنى تاني.

### الطباعة

جوه النص [[$( )]] بيشغّل كود ويحط ناتجه: [[Get-Date -Format HH:mm:ss]] الساعة، و [[$c.ChangeType]] و [[$c.Name]]. و [[-ForegroundColor Green]] باللون الأخضر.

### [[[console]::Beep(1000, 150)]]

صوت تردده 1000 هرتز لمدة 150 ملّي ثانية. التردد لازم بين 37 و 32767 (جربت 20 فطلع [[The frequency must be between 37 and 32767.]]).

---

## ٤. اللي حصل في التجربة

الـ thread job عمل [[test.pdf]]، وبعدين [[x.log]]، وبعدين [[report.pdf.crdownload]] وغيّر اسمه لـ [[report.pdf]]:

~~~text الناتج
10:14:43 Created: test.pdf
10:14:46 Renamed: report.pdf
~~~

- [[x.log]] متطبعش: مش PDF.
- [[report.pdf.crdownload]] متطبعش لما اتعمل: مش بيخلص بـ [[.pdf]].
- [[report.pdf]] ظهر كـ Renamed، و [[OldName]] كان [[report.pdf.crdownload]]. يعني لو كنا مراقبين Created بس، كان التحميل ده هيعدّي من غير ما نشوفه.

وبين الأحداث كانت كل لفة بترجع [[TimedOut]] وترجع لأول اللوب.

---

## الخلاصة

| الحتة | دورها |
|---|---|
| [[FileSystemWatcher]]::new(folder, "*.pdf") | راقب الفولدر ده، الملفات دي بس |
| [[WatcherChangeTypes]]'Created, Renamed' | الأحداث اللي تهمنا |
| [[WaitForChanged($events, 1000)]] | استنى حدث أو ثانية |
| [[TimedOut]] + [[continue]] | مفيش حاجة؟ لف تاني |
| [[$c.Name]] و [[$c.ChangeType]] | اسم الملف ونوع الحدث |

وتحميلات المتصفح بتيجي **Renamed**. ولو هتعمل حاجة بطيئة مع كل ملف (زي النقل)، الـ solCode بيستخدم [[Register-ObjectEvent]] عشان الأحداث متضيعش وانت مشغول.`,
          lines: [
            "الفولدر اللي هنراقبه.",
            "watcher على الفولدر ده، لملفات PDF بس.",
            "الأحداث اللي تهمنا: ملف اتعمل، أو اسمه اتغير (زي تحميلات المتصفح).",
            "رسالة إنه بدأ.",
            "لوب مالوش نهاية، بيقف بـ Ctrl+C.",
            "استنى حدث لحد ثانية بالكتير.",
            "لو الثانية عدّت من غير حاجة، ارجع لأول اللوب.",
            "اطبع الوقت ونوع الحدث واسم الملف بالأخضر.",
            "صوت قصير.",
            "قفلة اللوب."
          ],
          sol: R`جربت نفس الـ watcher على فولدر في TEMP مع thread job بيعمل ملفات: [[a.txt]] و [[b.txt]] اتطبعوا [[13:09:38 new file: a.txt (Created)]] و [[13:09:39 new file: b.txt (Created)]]، و [[ignored.log]] متطبعش عشان الـ filter كان [[*.txt]]. وقلّدت المتصفح: [[report.pdf.crdownload]] واتغير اسمه لـ [[report.pdf]]: مع [[Created, Renamed]] طلع [[Renamed: report.pdf (old: report.pdf.crdownload)]]، ومع [[Created]] بس فضل [[TimedOut]] ومشافهوش.

النقل: أول ما جربت [[Move-Item]] جوه نفس لوب [[WaitForChanged]] مع [[Start-Sleep -Seconds 1]]، ملف [[test.pdf]] اتعمل وأنا في الثانية دي فضاع، لأن [[WaitForChanged]] بيشوف الأحداث وهو مستني بس. الحل في الـ solCode: [[Register-ObjectEvent]] بيحط كل حدث في طابور، و [[Wait-Event -Timeout 1]] بياخدهم واحد واحد، فمفيش حاجة بتضيع وانت مشغول. جربته على فولدر في TEMP ونقل الملفين ([[Moved doc...pdf]] و [[Moved test.pdf]]) والفولدر فضي. و [[finally]] بيلغي التسجيل ويقفل الـ watcher حتى لو وقفته بـ Ctrl+C.`,
          solCode: R`$folder = Join-Path $HOME "Downloads"
$dest = Join-Path $HOME "Documents\PDFs"
New-Item -ItemType Directory -Force $dest | Out-Null
$watcher = [System.IO.FileSystemWatcher]::new($folder, "*.pdf")
Register-ObjectEvent $watcher Created -SourceIdentifier PdfNew | Out-Null
Register-ObjectEvent $watcher Renamed -SourceIdentifier PdfRenamed | Out-Null
$watcher.EnableRaisingEvents = $true
try {
    while ($true) {
        $e = Wait-Event -Timeout 1
        if (-not $e) { continue }
        $e | Remove-Event
        Start-Sleep -Seconds 1
        $name = $e.SourceEventArgs.Name
        try {
            Move-Item (Join-Path $folder $name) $dest -ErrorAction Stop
            Write-Host "Moved $name" -ForegroundColor Green
        } catch {
            Write-Warning "Could not move $name - $($_.Exception.Message)"
        }
    }
} finally {
    Unregister-Event PdfNew
    Unregister-Event PdfRenamed
    $watcher.Dispose()
}`
        },
        {
          cmd: "Write-Progress",
          title: "عداد تنازلي وبومودورو بشريط تقدم",
          desc: R`[[Write-Progress]] بيرسم شريط تقدم في الترمنال (زي اللي بيظهر وانت بتنزّل حاجة)، و [[Start-Sleep]] بيوقف السكربت مدة معينة. مع بعض بيعملوا عداد تنازلي: السكربت ده بومودورو (25 دقيقة شغل) بيوريك الوقت الفاضل ويعمل صوت في الآخر.

[[param( )]] بتعرّف الـ parameters (درس «param()»): [[[double]$Minutes = 25]] رقم ممكن يبقى فيه كسور (فـ [[-Minutes 0.1]] تبقى 6 ثواني للتجربة)، و [[$Label]] اسم الجلسة. و [[$end]] وقت النهاية: دلوقتي + عدد الثواني بـ [[.AddSeconds()]]. واللوب بيلف طول ما الساعة لسه موصلتش [[$end]]، وكل لفة بيحسب الفاضل: [[$end - (Get-Date)]] مدة، و [[.TotalSeconds]] بالثواني.

[[-Activity]] العنوان الكبير للشريط، و [[-Status]] السطر اللي تحته، و [[-PercentComplete]] النسبة من 0 لـ 100. و [[[timespan]::FromSeconds($left)]] بيحوّل الثواني لمدة، و [["{0:mm\:ss}" -f ...]] بيكتبها دقايق:ثواني، والـ [[\]] قبل النقطتين لازم لأن النقطتين في تنسيق المدة لازم يتعملهم escape. و [[-Completed]] بيشيل الشريط في الآخر. و [[[console]::Beep(880, 300)]] صوت تردده 880 هرتز لمدة 300 ملّي ثانية.

في PowerShell 7.2 وأحدث الشريط سطر واحد بسيط ([[$PSStyle.Progress.View]] بـ [[Minimal]])، وفي 5.1 أو مع [[Classic]] بيبقى مربع فوق النافذة.`,
          example: R`param(
    [double]$Minutes = 25,
    [string]$Label = "Focus"
)

$total = $Minutes * 60
$end = (Get-Date).AddSeconds($total)
while ((Get-Date) -lt $end) {
    $left = ($end - (Get-Date)).TotalSeconds
    $pct = 100 - [math]::Round($left / $total * 100)
    $status = "{0:mm\:ss} left" -f [timespan]::FromSeconds($left)
    Write-Progress -Activity $Label -Status $status -PercentComplete $pct
    Start-Sleep -Seconds 1
}
Write-Progress -Activity $Label -Completed
[console]::Beep(880, 300)
[console]::Beep(660, 300)
Write-Host "$Label done at $(Get-Date -Format HH:mm)" -ForegroundColor Green`,
          try: R`احفظه [[timer.ps1]] وشغّله بـ [[-Minutes 0.1 -Label Test]]، وبعدين اعمل سكربت جنبه بيشغّل 4 جلسات 25 دقيقة وبينهم راحة 5 دقايق.`,
          flag: "script",
          deep: {
            why: R`عداد في الترمنال اللي انت فاتحه أصلًا: بومودورو، أو «فكّرني بعد 40 دقيقة»، أو تستنى قبل ما تعيد محاولة. ونفس [[Write-Progress]] ده هو اللي بتحطه في أي سكربت طويل (نسخ ملفات كتير، معالجة صور) عشان اللي بيشغّله يعرف فاضل قد إيه بدل ما يفتكر إنه علّق.`,
            how: R`الحساب من وقت النهاية ([[$end]]) مش بعدّ الثواني: لو كتبت لوب بيعمل [[Start-Sleep 1]] 1500 مرة، كل لفة بتاخد ثانية + وقت الكود نفسه، فالـ 25 دقيقة تبقى أكتر. لما تحسب من الساعة كل مرة، الغلط مش بيتجمّع.

في سكربت حقيقي بتعدّ عناصر: [[Write-Progress -Activity "Copying" -Status "$i of $($files.Count)" -PercentComplete ($i / $files.Count * 100)]]. و [[-Id]] و [[-ParentId]] بيعملوا شريط جوه شريط (فولدرات وجواها ملفات). و [[-SecondsRemaining]] بيعرض الوقت الفاضل جاهز.

[[$ProgressPreference = 'SilentlyContinue']] بيخفي كل الشرايط (بتاعة السكربت وبتاعة أوامر زي Invoke-WebRequest). والشريط مش بيبان لو الناتج رايح لملف أو السكربت شغال من Task Scheduler، فمش بيضر.

[[[console]::Beep(freq, ms)]] بيطلع الصوت من كارت الصوت في ويندوز 10 و 11، والتردد لازم بين 37 و 32767 وإلا بيطلع [[The frequency must be between 37 and 32767.]] (جربتها بـ 20). والسكربت بيقف لحد ما الصوت يخلص.`,
            when: R`بومودورو وتنبيهات بسيطة، وأي سكربت بيلف على أكتر من كام عنصر وبياخد أكتر من كام ثانية.`,
            mistakes: R`تحسب الوقت بعدّ لفات [[Start-Sleep]] فيتأخر. أو تنسى [[-Completed]] فالشريط يفضل معلّق. أو [[-PercentComplete]] يعدّي 100 فيطلع [[The 150 argument is greater than the maximum allowed range of 100.]] (جربتها). أو تحدّث الشريط آلاف المرات في لوب سريع فالسكربت يبطأ جدًا؛ حدّثه كل 100 عنصر مثلًا. أو تكتب [[{0:mm:ss}]] من غير [[\]] فيطلع [[Error formatting a string: Input string was not in a correct format.]]`
          },
          teach: R`## الفكرة: احسب وقت النهاية، وارسم الفاضل كل ثانية

السكربت بيحسب الساعة اللي الجلسة هتخلص فيها، وكل ثانية بيحسب فاضل قد إيه ويرسمه شريط تقدم، وفي الآخر بيعمل صوت. احفظه [[timer.ps1]]. جربته في PowerShell 7.6 بـ [[-Minutes 0.05]] (3 ثواني)، وزوّدت سطر يطبع كل لفة عشان نشوف الأرقام.

---

## ١. الـ parameters

~~~powershell
param(
    [double]$Minutes = 25,
    [string]$Label = "Focus"
)
~~~

- [[param( )]] أول حاجة في السكربت: اللي بيتبعت وانت بتشغّله (درس «param()»).
- [[[double]]] رقم ممكن فيه كسور، فـ [[-Minutes 0.05]] تنفع. والافتراضي 25.
- [[[string]$Label]] اسم الجلسة، والافتراضي [["Focus"]].

---

## ٢. وقت النهاية

~~~powershell
$total = $Minutes * 60
$end = (Get-Date).AddSeconds($total)
~~~

- [[$total]] المدة بالثواني: 0.05 × 60 = [[3]].
- [[(Get-Date)]] دلوقتي، و [[.AddSeconds($total)]] زوّد عليه الثواني دي، فـ [[$end]] تاريخ وساعة النهاية. (مثال: 10:00 + 1500 ثانية = 10:25:00.)

---

## ٣. اللوب

~~~powershell
while ((Get-Date) -lt $end) {
~~~

[[-lt]] أقل من (less than): كرر طول ما الساعة دلوقتي لسه قبل النهاية.

### الثواني الفاضلة

~~~powershell
    $left = ($end - (Get-Date)).TotalSeconds
~~~

تاريخ ناقص تاريخ = مدة ([[TimeSpan]])، و [[.TotalSeconds]] المدة كلها بالثواني (بكسور، زي 2.99).

### النسبة

~~~powershell
    $pct = 100 - [math]::Round($left / $total * 100)
~~~

[[$left / $total * 100]] نسبة **الفاضل**، و [[100 -]] بيقلبها لنسبة **اللي خلص**، و [[[math]::Round]] من غير كسور. جربتها على 1500 ثانية: فاضل 1500 = [[0]]، فاضل 750 = [[50]]، فاضل 1.2 = [[100]].

### النص

~~~powershell
    $status = "{0:mm\:ss} left" -f [timespan]::FromSeconds($left)
~~~

- [[[timespan]::FromSeconds($left)]] حوّل الثواني لمدة.
- [[-f]] حطها مكان [[{0}]]، و [[:mm\:ss]] بعد الـ 0 هو التنسيق: [[mm]] دقايق و [[ss]] ثواني.
- [[\:]]: النقطتين في تنسيق المدة لازم قبلها [[\]]، وإلا:

~~~text الناتج من "{0:mm:ss}" -f ... (في 7.6 و 5.1)
Error formatting a string: Input string was not in a correct format..
~~~

~~~text أمثلة جربتها
1499.6 ثانية  →  24:59 left
59.2 ثانية    →  00:59 left
~~~

الكسور بتتشال مش بتتقرّب (59.2 بقت 59 مش 60).

### الشريط والانتظار

~~~powershell
    Write-Progress -Activity $Label -Status $status -PercentComplete $pct
    Start-Sleep -Seconds 1
}
~~~

| الـ parameter | مكانه في الشريط |
|---|---|
| [[-Activity]] | العنوان (اسم الجلسة) |
| [[-Status]] | السطر اللي جنبه أو تحته ([[24:59 left]]) |
| [[-PercentComplete]] | النسبة من 0 لـ 100، ولو أكبر من 100 بيطلع error |

وبعدين [[Start-Sleep -Seconds 1]] استنى ثانية ولف تاني. الوقت بيتحسب من الساعة كل لفة، فلو لفة اتأخرت شوية الغلط مش بيتجمّع.

### اللي طبعته اللفات (3 ثواني)

~~~text الناتج
  tick: 00:02 left  0%
  tick: 00:01 left  34%
  tick: 00:00 left  68%
Test done at 10:15
~~~

أول لفة [[00:02]] مش [[00:03]] لأن الفاضل كان 2.99 والكسر اتشال. وبعد 3 لفات الساعة عدّت [[$end]] فاللوب وقف.

---

## ٤. النهاية

~~~powershell
Write-Progress -Activity $Label -Completed
[console]::Beep(880, 300)
[console]::Beep(660, 300)
Write-Host "$Label done at $(Get-Date -Format HH:mm)" -ForegroundColor Green
~~~

- [[-Completed]] شيل الشريط من الشاشة.
- [[[console]::Beep(880, 300)]] صوت 880 هرتز لمدة 300 ملّي ثانية، وبعده صوت أوطى (660).
- [[Write-Host]] بالأخضر، و [[$( )]] جوه النص بيحط الساعة.

وشكل الشريط: في PowerShell 7.2 وأحدث سطر واحد بسيط ([[$PSStyle.Progress.View]] طلعت [[Minimal]] عندي)، وفي 5.1 مربع فوق النافذة.

---

## الخلاصة

| الخطوة | الكود |
|---|---|
| النهاية | [[(Get-Date).AddSeconds($total)]] |
| الفاضل | [[($end - (Get-Date)).TotalSeconds]] |
| النسبة | [[100 - [math]::Round($left / $total * 100)]] |
| دقايق:ثواني | [["{0:mm\:ss}" -f [timespan]::FromSeconds($left)]] |
| الشريط | [[Write-Progress -Activity -Status -PercentComplete]] |
| شيله | [[Write-Progress -Activity $Label -Completed]] |

وللمدد اللي فيها ساعات: [["{0:hh\:mm\:ss}"]] (3725 ثانية طلعت [[01:02:05]]).`,
          lines: [
            "بداية الـ parameters.",
            "عدد الدقايق، والافتراضي 25، وممكن كسور.",
            "اسم الجلسة اللي هيظهر على الشريط.",
            "قفلة.",
            "المدة بالثواني.",
            "وقت النهاية = دلوقتي + المدة.",
            "طول ما الساعة لسه موصلتش للنهاية...",
            "...الثواني الفاضلة (النهاية ناقص دلوقتي)...",
            "...النسبة اللي خلصت من 100...",
            "...الفاضل بالشكل دقايق:ثواني...",
            "...ارسم الشريط بالعنوان والوقت والنسبة...",
            "...واستنى ثانية.",
            "قفلة اللوب.",
            "شيل الشريط.",
            "صوت 880 هرتز لمدة 300 ملّي ثانية...",
            "...وبعده صوت أوطى.",
            "اطبع إن الجلسة خلصت والساعة كام."
          ],
          sol: R`[[.\timer.ps1 -Minutes 0.05 -Label Test]] اشتغل حوالي 4 ثواني (3 ثواني العداد + الصوتين)، وفي الآخر سطر أخضر [[Test done at 13:17]]. وجربت التنسيق لوحده: 1499.6 ثانية طلعت [[24:59 left]]، و 59.2 طلعت [[00:59 left]] (الكسور بتتشال مش بتتقرّب).

الـ 4 جلسات في الـ solCode: احفظه [[pomodoro.ps1]] جنب [[timer.ps1]]. [[1..4]] الأرقام من 1 لـ 4، و [[&]] بيشغّل ملف السكربت (درس «& (call operator)»)، و [[$PSScriptRoot]] فولدر السكربت (درس $PSScriptRoot)، والراحة بتتعمل بعد كل جلسة ماعدا الأخيرة. جربته بمدد صغيرة وطلع [[Focus 1/4 done]] ثم [[Break done]] ... لحد [[Focus 4/4 done]]. ولو المدة ساعة أو أكتر غيّر التنسيق لـ [["{0:hh\:mm\:ss}"]] وإلا الساعات مش هتبان: 3725 ثانية طلعت بيه [[01:02:05]].`,
          solCode: R`foreach ($round in 1..4) {
    & "$PSScriptRoot\timer.ps1" -Minutes 25 -Label "Focus $round/4"
    if ($round -lt 4) { & "$PSScriptRoot\timer.ps1" -Minutes 5 -Label "Break" }
}`
        },
        {
          cmd: "SAPI.SpVoice",
          title: "خلّي الجهاز يتكلم ويعمل صوت",
          desc: R`ويندوز فيه محرك نطق (text-to-speech)، و [[New-Object -ComObject SAPI.SpVoice]] بيوصلك له: [[.Speak("...")]] بيقرا النص بصوت. ومعاه [[[console]::Beep(تردد, مدة)]] صوت تنبيه. الفكرة العملية: تشغّل build أو تست طويل وتروح تعمل حاجة، والجهاز يقولك «Build passed» أو يعمل صوت فشل.

[[-ComObject]] بيعمل object من COM (طريقة قديمة في ويندوز البرامج بتعرض بيها خدماتها، و SAPI يعني Speech API). و [[.Speak()]] بترجع رقم ([[1]]) فبنرميه بـ [[| Out-Null]] عشان ميتطبعش. و [[.GetVoices()]] الأصوات المتسطبة، و [[.GetDescription()]] اسم كل صوت. و [[.Rate]] السرعة من -10 لـ 10 (الافتراضي 0)، و [[.Volume]] من 0 لـ 100.

آخر سطر: [[npm run build]] وبعدين [[;]] (أمر تاني على نفس السطر)، و [[$LASTEXITCODE]] الـ exit code بتاع npm (درس $LASTEXITCODE): صفر يعني نجح فيقول «Build passed»، وغير كده صوت واطي طويل و «Build failed».

العربي: SAPI.SpVoice بيشوف الأصوات القديمة بس (على ويندوز إنجليزي: David و Zira). لو ضفت صوت عربي من Settings ثم Time & language ثم Speech ثم Add voices، هتلاقي صوت زي «Microsoft Hoda» (عربي مصري)، و PowerShell 7 بيقدر يستخدمه عن طريق [[System.Speech]] (الـ solCode). جربتها على PowerShell 7.6 واتكلم عربي، أما 5.1 فمشافش غير David و Zira.`,
          example: R`$voice = New-Object -ComObject SAPI.SpVoice
$voice.Speak("Build finished") | Out-Null
foreach ($v in $voice.GetVoices()) { $v.GetDescription() }
$voice.Rate = 2
[console]::Beep(880, 300)
npm run build; if ($LASTEXITCODE -eq 0) { $voice.Speak("Build passed") | Out-Null } else { [console]::Beep(300, 800); $voice.Speak("Build failed") | Out-Null }`,
          try: R`اعرض الأصوات اللي عندك، وخلّي الجهاز يقول جملة عربي لو عندك صوت عربي.`,
          deep: {
            why: R`build أو تست أو تحميل بياخد 10 دقايق، فبتروح تعمل حاجة وترجع كل شوية تبص، أو تنساه خالص. صوت أو جملة مسموعة بتقولك النتيجة وانت بعيد عن الشاشة. ونفس الفكرة في آخر أي سكربت طويل: «Backup done».`,
            how: R`[[SAPI.SpVoice]] بيستخدم أصوات «SAPI 5» القديمة المسجلة في ويندوز (اللي في اسمها Desktop). ويندوز 10 و 11 فيهم أصوات أحدث (OneCore)، وأي لغة بتضيف صوتها من Settings بتيجي من النوع ده. [[System.Speech.Synthesis.SpeechSynthesizer]] في PowerShell 7 شاف النوعين لما جربت، و [[GetInstalledVoices().VoiceInfo]] بيرجع الاسم واللغة ([[Culture]]) والنوع.

[[.Speak()]] بيستنى لحد ما الكلام يخلص قبل ما السكربت يكمّل. ولو عايز السكربت يكمّل والكلام شغال: في System.Speech [[$tts.SpeakAsync("text")]]، بس لو السكربت خلص قبل الكلام، الكلام بيتقطع.

[[[console]::Beep]] من .NET، والتردد بين 37 و 32767 هرتز. وأصوات ويندوز الجاهزة: [[[System.Media.SystemSounds]::Asterisk.Play()]] (وفيه [[Exclamation]] و [[Hand]] و [[Question]] و [[Beep]]) بتشغّل صوت التنبيه اللي في إعدادات الصوت.

تقدر تعمل فانكشن في الـ [[$PROFILE]]: [[function done { if ($?) { [console]::Beep(880, 200) } else { [console]::Beep(300, 600) } }]] وتكتب [[npm test; done]]. [[$?]] جوه الفانكشن لسه شايلة نتيجة الأمر اللي قبلها (جربتها: بعد [[cmd /c exit 1]] طلعت fail وبعد [[cmd /c exit 0]] طلعت ok).`,
            when: R`أي حاجة بتاخد أكتر من دقيقة وانت مش هتتفرج عليها: build، tests، تحميل، باك أب.`,
            mistakes: R`تنسى [[| Out-Null]] فيتطبع [[1]] في نص الناتج. أو تكتب اسم الصوت ناقص في [[SelectVoice]]. أو تحط الكلام في سكربت بيشتغل من Task Scheduler والجهاز مقفول، فمحدش هيسمع. أو تستغرب إن الكلام العربي طالع بنطق غريب أو مش طالع: الصوت المختار إنجليزي، ولازم صوت لغته [[ar-EG]] أو [[ar-SA]].`
          },
          teach: R`## الفكرة: محرك النطق اللي في ويندوز، من PowerShell

ويندوز فيه محرك بيقرا النص بصوت (text-to-speech). المثال بيعمل object بيكلّمه، ويخليه يقول جملة، ويعرض الأصوات، وفي الآخر يقولك نتيجة الـ build بصوت. جربت السطور في PowerShell 7.6 و 5.1 والصوت على [[Volume = 0]] (عشان ميزعجش حد)، والـ Beep مشغّلتهوش لنفس السبب، و npm build جربت بداله برنامج بيخرج بـ exit code معروف.

---

## ١. object النطق

~~~powershell
$voice = New-Object -ComObject SAPI.SpVoice
~~~

- [[New-Object]] بيعمل object جديد.
- [[-ComObject]] من **COM**: طريقة قديمة في ويندوز البرامج والخدمات بتعرض بيها نفسها للبرامج التانية.
- [[SAPI.SpVoice]] اسم الخدمة: [[SAPI]] = Speech API، و [[SpVoice]] = الصوت اللي بيتكلم.

---

## ٢. اتكلم

~~~powershell
$voice.Speak("Build finished") | Out-Null
~~~

[[.Speak("...")]] بيقرا النص وبيستنى لحد ما يخلص. والـ method دي بترجّع رقم ([[int Speak (string Text, ...)]] من [[Get-Member]])، ولما جربتها من غير [[Out-Null]] طبعت:

~~~text الناتج
1
~~~

[[| Out-Null]] بيرمي الرقم ده عشان ميتطبعش في نص ناتجك.

---

## ٣. الأصوات المتسطبة

~~~powershell
foreach ($v in $voice.GetVoices()) { $v.GetDescription() }
~~~

- [[.GetVoices()]] لستة الأصوات.
- [[foreach ($v in ...)]] لف عليهم، و [[.GetDescription()]] اسم كل صوت.

~~~text الناتج (7.6 و 5.1 نفس الحاجة)
Microsoft David Desktop - English (United States)
Microsoft Zira Desktop - English (United States)
~~~

اتنين بس، رغم إن الجهاز ده عليه صوت عربي. السبب إن SAPI.SpVoice بيشوف الأصوات القديمة (اللي في اسمها Desktop)، والأصوات اللي بتضيفها من Settings نوع أحدث. الـ solCode بيحل ده (تحت).

---

## ٤. السرعة والصوت

~~~powershell
$voice.Rate = 2
[console]::Beep(880, 300)
~~~

- [[.Rate]] السرعة من -10 (أبطأ) لـ 10 (أسرع)، والافتراضي [[0]]. و [[.Volume]] من 0 لـ 100.
- [[[console]::Beep(880, 300)]] صوت تنبيه: 880 هرتز لمدة 300 ملّي ثانية. [[[console]]] class من .NET، و [[::]] بتنادي method جاهزة فيه من غير ما تعمل object.

---

## ٥. قولّي نتيجة الـ build

~~~powershell
npm run build; if ($LASTEXITCODE -eq 0) { $voice.Speak("Build passed") | Out-Null } else { [console]::Beep(300, 800); $voice.Speak("Build failed") | Out-Null }
~~~

| الحتة | معناها |
|---|---|
| [[npm run build]] | شغّل الـ build |
| [[;]] | وبعده، على نفس السطر |
| [[$LASTEXITCODE]] | الـ exit code بتاع آخر برنامج خارجي (npm) |
| [[-eq 0]] | صفر يعني نجح |
| [[{ ... } else { ... }]] | لو نجح قول «Build passed»، غير كده صوت واطي طويل (300 هرتز لمدة 800 ملّي) و «Build failed» |

جربت [[$LASTEXITCODE]] بـ [[cmd /c exit 0]] فطلع [[0]]، وبـ [[cmd /c exit 2]] طلع [[2]].

---

## ٦. الحل (solCode): صوت عربي بـ System.Speech

~~~powershell
Add-Type -AssemblyName System.Speech
$tts = New-Object System.Speech.Synthesis.SpeechSynthesizer
$tts.GetInstalledVoices().VoiceInfo | Select-Object Name, Culture, Gender
~~~

[[Add-Type -AssemblyName System.Speech]] بيحمّل مكتبة النطق بتاعة .NET، و [[SpeechSynthesizer]] الـ class اللي بيتكلم. وفي PowerShell 7.6 شاف الأصوات الجديدة كمان:

~~~text الناتج
Name                    Culture Gender
----                    ------- ------
Microsoft David Desktop en-US     Male
Microsoft Zira Desktop  en-US   Female
Microsoft David         en-US     Male
Microsoft Hoda          ar-EG   Female
Microsoft Mark          en-US     Male
Microsoft Zira          en-US   Female
~~~

[[Culture]] اللغة والبلد: [[ar-EG]] عربي مصر. و [[SelectVoice("Microsoft Hoda")]] اختار الصوت ده. والاسم لازم كامل: [[SelectVoice("Hoda")]] طلع:

~~~text الناتج
Cannot set voice. No matching voice is installed or the voice was disabled.
~~~

---

## الخلاصة

| عايز | اكتب |
|---|---|
| object نطق | [[New-Object -ComObject SAPI.SpVoice]] |
| يتكلم | [[$voice.Speak("...") | Out-Null]] |
| الأصوات | [[$voice.GetVoices()]] و [[.GetDescription()]] |
| سرعة / صوت | [[.Rate]] من -10 لـ 10، [[.Volume]] من 0 لـ 100 |
| تنبيه | [[[console]::Beep(تردد, ملّي)]] |
| صوت عربي | [[System.Speech]] و [[SelectVoice("Microsoft Hoda")]] (PowerShell 7) |`,
          lines: [
            "اعمل object للنطق من COM.",
            "قول الجملة، وارمي الرقم اللي بيرجع.",
            "اطبع اسم كل صوت متسطب.",
            "سرّع الكلام شوية (من -10 لـ 10).",
            "صوت 880 هرتز لمدة 300 ملّي ثانية.",
            "شغّل الـ build: لو نجح قول كده، ولو فشل صوت واطي طويل وقول إنه فشل."
          ],
          sol: R`[[foreach ($v in $voice.GetVoices()) { $v.GetDescription() }]] على جهازي طلع: [[Microsoft David Desktop - English (United States)]] و [[Microsoft Zira Desktop - English (United States)]]. وفي PowerShell 7.6، [[System.Speech]] (الـ solCode) شاف أكتر: [[Microsoft David Desktop  en-US]] و [[Microsoft Zira Desktop  en-US]] و [[Microsoft David  en-US]] و [[Microsoft Hoda  ar-EG]] و [[Microsoft Mark  en-US]] و [[Microsoft Zira  en-US]]، و [[SelectVoice("Microsoft Hoda")]] اشتغل وقال «البيلد خلص». وفي Windows PowerShell 5.1 نفس الكود شاف David و Zira Desktop بس.

لو [[SelectVoice]] طلع [[Cannot set voice. No matching voice is installed or the voice was disabled.]] يبقى الاسم غلط أو الصوت مش متسطب: انسخ الاسم بالظبط من عمود Name. و [[.Speak()]] بتاعة SAPI لو مرميتش ناتجها هتلاقي [[1]] متطبع بعد الكلام. (جربت الكلام بـ Volume على 0 عشان مزعجش حد، و Beep بصوت عادي.)`,
          solCode: R`Add-Type -AssemblyName System.Speech
$tts = New-Object System.Speech.Synthesis.SpeechSynthesizer
$tts.GetInstalledVoices().VoiceInfo | Select-Object Name, Culture, Gender
$tts.SelectVoice("Microsoft Hoda")
$tts.Speak("البيلد خلص")`
        },
        {
          cmd: "MessageBox / BurntToast",
          title: "رسالة تأكيد أو إشعار ويندوز",
          desc: R`سكربت شغال ومحتاج يسألك «أكمّل؟» أو يقولك «خلصت» حتى لو الترمنال مش قدامك: [[[System.Windows.MessageBox]::Show()]] بيطلع نافذة رسالة بأزرار ويرجّع الزرار اللي دوسته، و [[New-BurntToastNotification]] من موديول BurntToast بيطلع إشعار ويندوز (toast) في ركن الشاشة زي إشعارات البرامج.

[[Add-Type -AssemblyName PresentationFramework]] بيحمّل مكتبة WPF من .NET اللي فيها MessageBox (لازم في 5.1، و PowerShell 7 بيلاقيها لوحده بس السطر مش بيضر). و [[Show]] بتاخد: النص، والعنوان، والأزرار ([[OK]] و [[OKCancel]] و [[YesNo]] و [[YesNoCancel]])، والأيقونة ([[Information]] و [[Question]] و [[Warning]] و [[Error]]). وبترجع اختيارك ([[Yes]] أو [[No]] أو [[OK]] أو [[Cancel]])، فتقارنه بـ [[-eq "Yes"]]. والسكربت بيقف لحد ما تدوس زرار.

[[Install-Module BurntToast -Scope CurrentUser]] بيسطّب الموديول ليك (مرة واحدة)، و [[-Text]] بياخد لحد 3 نصوص: أولهم العنوان والباقي تحته. الإشعار مش بيوقف السكربت، ولو مشفتوش بيفضل في Notification Center.

الاتنين ويندوز بس وشغالين في 5.1 و 7. و BurntToast محتاج ويندوز 10 أو أحدث، وآخر نسخة 1.1.0 (أغسطس 2025)، والـ repo بتاعه على GitHub اتعمله archive في سبتمبر 2026، يعني شغال بس مفيش تحديثات جاية.`,
          example: R`Add-Type -AssemblyName PresentationFramework
$answer = [System.Windows.MessageBox]::Show("Delete logs older than 30 days?", "Cleanup", "YesNo", "Question")
if ($answer -eq "Yes") { Get-ChildItem .\logs -Filter *.log | Where-Object LastWriteTime -lt (Get-Date).AddDays(-30) | Remove-Item -WhatIf }
[System.Windows.MessageBox]::Show("Backup finished", "Backup", "OK", "Information") | Out-Null
Install-Module BurntToast -Scope CurrentUser
New-BurntToastNotification -Text "Build finished", "All tests passed"`,
          try: R`اعمل سؤال YesNo: لو دوست Yes اطبع [[OK]] بالأخضر، ولو No اطبع [[Cancelled]] بالأصفر. وبعدين ابعت إشعار بعد [[Start-Sleep 5]] وانت في برنامج تاني.`,
          deep: {
            why: R`السكربت ساعات بيشتغل والترمنال متصغّر أو ورا برامج تانية، فمحدش بيشوف سؤال [[Read-Host]] ولا رسالة «خلصت». النافذة بتطلع قدام كل حاجة، والإشعار بيوصلك وانت في المتصفح. ومفيد كمان لسكربت بتعمله لحد مش بيستخدم الترمنال (يدبل كليك على shortcut فيطلعله سؤال بسيط).`,
            how: R`[[MessageBox]] نافذة «modal»: الكود اللي بعدها مش بيتنفّذ لحد ما تتقفل، وده المطلوب في سؤال تأكيد. والبديل من WinForms: [[Add-Type -AssemblyName System.Windows.Forms]] وبعدين [[[System.Windows.Forms.MessageBox]::Show(...)]] بنفس الفكرة. و PowerShell بيحوّل النص [["YesNo"]] للنوع المطلوب لوحده، فمش محتاج تكتب [[[System.Windows.MessageBoxButton]::YesNo]].

مع [[YesNo]] مفيش زرار X شغال، لازم تختار؛ مع [[YesNoCancel]] الـ X بترجع [[Cancel]].

BurntToast بيستخدم نظام الإشعارات بتاع ويندوز، فالإشعار بيتبع إعداداتك (Do not disturb و Notification Center). وفيه [[New-BTButton]] زرار في الإشعار يفتح لينك، و [[-AppLogo]] صورة، و [[-Silent]] من غير صوت، و [[-Urgent]] بيعدّي الـ Focus Assist. وفي PowerShell 7.4 وأحدث تقدر تسطّبه كمان بـ [[Install-PSResource BurntToast]].

الاتنين محتاجين يوزر داخل على الجهاز وشايف الشاشة: لو السكربت شغال من Task Scheduler بـ «Run whether user is logged on or not» أو كـ SYSTEM، النافذة مش هتظهر لحد، و MessageBox هيفضل مستني للأبد.`,
            when: R`سؤال تأكيد قبل حاجة مهمة في سكربت بتشغّله بدبل كليك، وإشعار في آخر أي سكربت طويل (باك أب، build، تحميل). وللسكربتات اللي بتشتغل لوحدها من غير حد قدام الجهاز، استخدم لوج أو إيميل بدلهم.`,
            mistakes: R`تحط MessageBox في سكربت مجدول فيعلّق ومحدش يشوفه. أو تنسى [[Add-Type]] في 5.1 فيطلع [[Unable to find type [System.Windows.MessageBox].]] (جربتها). أو تنسى [[| Out-Null]] مع رسالة OK فيتطبع [[OK]] في الناتج. أو تكتب [[Install-Module]] جوه السكربت نفسه فكل تشغيلة تحاول تسطّب. أو تبعت حاجة خطيرة بعد Yes من غير ما تجرّبها بـ [[-WhatIf]] الأول.`
          },
          teach: R`## الفكرة: سؤال في نافذة، وإشعار في ركن الشاشة

[[MessageBox]] نافذة صغيرة بأزرار، والسكربت بيقف لحد ما تدوس واحد ويعرف دوست إيه. والـ toast (إشعار ويندوز) رسالة في ركن الشاشة مش بتوقف حاجة. مفتحتش النوافذ وأنا بكتب الدرس (بتستنى حد يدوس) ومسطّبتش BurntToast، فشكلهم من توثيق Microsoft وصفحة الموديول. اللي اتجرب في PowerShell 7.6 و 5.1: تحميل المكتبة، والقيم المسموحة، والمقارنة.

---

## ١. حمّل المكتبة

~~~powershell
Add-Type -AssemblyName PresentationFramework
~~~

[[Add-Type]] بيحمّل مكتبة .NET جوه الجلسة، و [[PresentationFramework]] مكتبة WPF (واجهات ويندوز) اللي فيها MessageBox. في 5.1 من غير السطر ده:

~~~text الناتج في 5.1
Unable to find type [System.Windows.MessageBox].
~~~

PowerShell 7 بيلاقيها لوحده، بس السطر مش بيضر فاكتبه دايمًا.

---

## ٢. سؤال Yes / No

~~~powershell
$answer = [System.Windows.MessageBox]::Show("Delete logs older than 30 days?", "Cleanup", "YesNo", "Question")
~~~

[[[System.Windows.MessageBox]::Show(...)]] بتاخد 4 حاجات بالترتيب:

| الترتيب | القيمة | معناها |
|---|---|---|
| 1 | [["Delete logs..."]] | النص |
| 2 | [["Cleanup"]] | عنوان النافذة |
| 3 | [["YesNo"]] | الأزرار |
| 4 | [["Question"]] | الأيقونة |

القيم المسموحة (طبعتها من الـ enums بتاعتها):

~~~text الأزرار
OK, OKCancel, AbortRetryIgnore, YesNoCancel, YesNo, RetryCancel, CancelTryContinue
~~~

~~~text الأيقونات
None, Hand, Stop, Error, Question, Exclamation, Warning, Asterisk, Information
~~~

PowerShell بيحوّل النص [["YesNo"]] للنوع المطلوب لوحده. والنافذة **modal**: السطر ده مش بيخلص لحد ما تدوس زرار، و [[$answer]] بياخد اسم الزرار.

---

## ٣. نقرا الإجابة

~~~powershell
if ($answer -eq "Yes") { Get-ChildItem .\logs -Filter *.log | Where-Object LastWriteTime -lt (Get-Date).AddDays(-30) | Remove-Item -WhatIf }
~~~

[[$answer]] نوعه [[MessageBoxResult]]، والقيم الممكنة:

~~~text الناتج
None, OK, Cancel, Abort, Retry, Ignore, Yes, No, TryAgain, Continue
~~~

وجربت [[[System.Windows.MessageBoxResult]::Yes -eq "Yes"]] فطلعت [[True]]، يعني تقدر تقارنه بالنص على طول.

ولو Yes: [[Get-ChildItem .\logs -Filter *.log]] ملفات اللوج، و [[Where-Object LastWriteTime -lt (Get-Date).AddDays(-30)]] اللي آخر تعديل ليها قبل 30 يوم ([[AddDays(-30)]] النهارده ناقص 30 يوم، و [[-lt]] أقدم من)، و [[Remove-Item -WhatIf]] يقول هيمسح إيه من غير ما يمسح.

---

## ٤. رسالة بزرار OK

~~~powershell
[System.Windows.MessageBox]::Show("Backup finished", "Backup", "OK", "Information") | Out-Null
~~~

نفس الحكاية بزرار واحد. [[Show]] برضه بترجّع اسم الزرار ([[OK]])، و [[| Out-Null]] بيرميه عشان ميتطبعش.

---

## ٥. إشعار ويندوز: BurntToast

~~~powershell
Install-Module BurntToast -Scope CurrentUser
New-BurntToastNotification -Text "Build finished", "All tests passed"
~~~

- [[Install-Module]] بيسطّب موديول من PowerShell Gallery، و [[-Scope CurrentUser]] ليك انت بس (من غير أدمن). مرة واحدة بس، مش في كل تشغيل.
- [[New-BurntToastNotification]] الأمر اللي الموديول بيضيفه. و [[-Text]] لحد 3 نصوص مفصولين بفاصلة: الأول عنوان بخط تقيل، والباقي تحته.

الإشعار بيظهر في ركن الشاشة زي إشعارات البرامج، والسكربت بيكمّل على طول. ولو Do not disturb شغال، بيروح Notification Center من غير ما يظهر.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| تحمّل MessageBox | [[Add-Type -AssemblyName PresentationFramework]] |
| تسأل وتستنى | [[$a = [System.Windows.MessageBox]::Show(نص, عنوان, "YesNo", "Question")]] |
| تقرا الإجابة | [[if ($a -eq "Yes")]] |
| رسالة بس | [[::Show(..., "OK", "Information") | Out-Null]] |
| إشعار مش بيوقف السكربت | [[New-BurntToastNotification -Text "عنوان", "سطر"]] |

والاتنين محتاجين حد قدام الشاشة: في سكربت مجدول بيشتغل لوحده، MessageBox هيفضل مستني للأبد.`,
          lines: [
            "حمّل مكتبة WPF اللي فيها MessageBox (لازمة في 5.1).",
            "اسأل سؤال بزرارين Yes و No وأيقونة استفهام، والسكربت يستنى الإجابة.",
            "لو Yes امسح اللوجات الأقدم من 30 يوم (بـ [[-WhatIf]] للتجربة).",
            "رسالة بزرار OK بس، و [[Out-Null]] يرمي النتيجة.",
            "سطّب موديول BurntToast ليك (مرة واحدة).",
            "إشعار ويندوز بعنوان وسطر تحته."
          ],
          sol: R`(مشغّلتش النوافذ دي وأنا بكتب الدرس لأنها بتستنى حد يدوس عليها، ومسطّبتش BurntToast؛ جربت الأجزاء اللي مش بتفتح نوافذ، والباقي من صفحة الموديول.) [[Add-Type -AssemblyName PresentationFramework]] اشتغل في PowerShell 7.6 و 5.1، والأزرار المتاحة فعلًا [[OK, OKCancel, AbortRetryIgnore, YesNoCancel, YesNo, RetryCancel, CancelTryContinue]]، والنتايج الممكنة [[None, OK, Cancel, Abort, Retry, Ignore, Yes, No, TryAgain, Continue]]. والمقارنة [[[System.Windows.MessageBoxResult]::Yes -eq "Yes"]] رجعت [[True]]، فـ [[$answer -eq "Yes"]] شغالة.

لما تشغّل الحل: النافذة بتظهر بعلامة استفهام وزرارين Yes و No، والسكربت واقف لحد ما تدوس، وبعدها يطبع السطر المناسب باللون. والإشعار بيظهر في ركن الشاشة بعنوان «Done» وتحته السطر التاني، ولو Do not disturb شغال مش هيظهر قدامك بس هيتحفظ في Notification Center.`,
          solCode: R`Add-Type -AssemblyName PresentationFramework
$answer = [System.Windows.MessageBox]::Show("Continue?", "Question", "YesNo", "Question")
if ($answer -eq "Yes") { Write-Host "OK" -ForegroundColor Green } else { Write-Host "Cancelled" -ForegroundColor Yellow }
Start-Sleep 5; New-BurntToastNotification -Text "Done", "Your script finished"`
        },
        {
          cmd: "shutdown /s /t",
          title: "اقفل الجهاز أو اعمله restart في ساعة معينة",
          desc: R`[[shutdown]] برنامج في ويندوز بيقفل الجهاز أو يعمله restart بعد عدد ثواني تحدده، و [[shutdown /a]] بيلغي ده طول ما الوقت لسه معدّاش. المثال بيحسب الثواني لحد ساعة معينة (11:30 بالليل)، عشان تسيب تحميل أو build شغال وتنام والجهاز يقفل لوحده.

[[Get-Date "23:30"]] بيعمل تاريخ النهارده الساعة 11:30 بالليل. ولو الساعة دي عدّت النهارده (بتشغّله 11:45 مثلًا)، [[.AddDays(1)]] بيخليها بكرة، وإلا الحساب هيطلع بالسالب. و [[New-TimeSpan -End $target]] المدة من دلوقتي لحد الوقت ده، و [[.TotalSeconds]] بالثواني، و [[[int]]] بيحوّلها لرقم صحيح.

[[/s]] اقفل (shutdown)، و [[/r]] restart، و [[/t]] بعد كام ثانية (من 0 لـ 10 سنين، والافتراضي 30)، و [[/c "..."]] رسالة بتظهر في التنبيه (لحد 512 حرف). و [[/f]] يقفل البرامج غصب من غير ما يسألها تحفظ، وخلي بالك: لو [[/t]] أكبر من صفر، [[/f]] بتتحط لوحدها، يعني أي شغل مش محفوظ وقت المعاد هيضيع.

ومن PowerShell نفسه: [[Stop-Computer]] بيقفل و [[Restart-Computer]] بيعمل restart، على طول من غير مهلة (و [[-Force]] يجبره حتى لو فيه برامج مانعة). مفيهمش معاد، فللمعاد استخدم [[shutdown /t]].`,
          example: R`$target = Get-Date "23:30"
if ($target -lt (Get-Date)) { $target = $target.AddDays(1) }
$seconds = [int](New-TimeSpan -End $target).TotalSeconds
shutdown /s /t $seconds /c "The PC will shut down at 23:30. Save your work."
shutdown /a
shutdown /r /t 600 /c "Restarting in 10 minutes for updates"
shutdown /a`,
          try: R`اعمل shutdown بعد ساعة بـ [[/t 3600]]، وشوف التنبيه اللي بيظهر، وبعدين الغيه بـ [[shutdown /a]] (واتأكد إنك لغيته!).`,
          flag: "danger",
          deep: {
            why: R`تحميل كبير أو build أو render هيخلص بعد ساعتين وانت عايز تنام، أو عايز الجهاز يعمل restart بالليل بعد التحديثات مش وانت شغال، أو بتحدد لنفسك «الجهاز يقفل الساعة 12». وقايمة Start مفيهاش «اقفل الساعة كذا».`,
            how: R`[[shutdown /t]] بيسجّل المعاد في ويندوز نفسه، فمش محتاج الترمنال يفضل مفتوح. وفيه معاد واحد بس في نفس الوقت: لو فيه واحد متجدول، أي [[shutdown /s /t]] تاني بيرفض بـ error رقم 1190 («A system shutdown has already been scheduled.»)، فالغي بـ [[/a]] الأول.

ولو عايز «بعد ساعة ونص» مش ساعة معينة: [[shutdown /s /t (90 * 60)]]، والأقواس بتحسب الرقم قبل ما يتبعت. ولو عايز «لما البرنامج يخلص»: [[Wait-Process -Name ...]] بيستنى البرنامج يقفل، وبعده [[Stop-Computer]].

[[/h]] hibernate (الدرس الجاي)، و [[/l]] تسجيل خروج، و [[/sg]] و [[/g]] زي [[/s]] و [[/r]] بس بيفتحوا البرامج المسجلة تاني بعد الدخول. و [[/r /o]] restart على قايمة Advanced startup (للـ Safe Mode). و [[shutdown /?]] بيعرض كل ده.

[[Stop-Computer]] و [[Restart-Computer]] بيدعموا [[-WhatIf]] (يقولك هيعمل إيه من غير ما يعمله) و [[-ComputerName]] لأجهزة تانية على الشبكة لو عندك صلاحية.`,
            when: R`لما تسيب الجهاز يكمّل شغل وتمشي، أو تجدول restart بعد تحديثات في وقت مش بتشتغل فيه، أو في آخر سكربت بيخلص شغلانة طويلة.`,
            mistakes: R`تجدول shutdown وتنسى، فالجهاز يقفل وانت في نص شغل والبرامج تتقفل غصب ([[/f]] بتتحط لوحدها مع [[/t]]). أو تكتب [[/t]] بالدقايق بدل الثواني. أو تحسب ساعة عدّت النهارده فيطلع رقم سالب. أو تفتكر [[shutdown /a]] بيلغي [[Stop-Computer]]: Stop-Computer بيقفل على طول ومفيش مهلة تلغي فيها.`
          },
          teach: R`## الفكرة: [[shutdown]] بياخد ثواني، فنحسب الثواني لحد الساعة اللي عايزينها

[[shutdown /s /t 3600]] يعني «اقفل بعد 3600 ثانية». بس احنا عايزين «اقفل الساعة 11:30»، فأول 3 سطور بيحسبوا كام ثانية فاضلة لحد الساعة دي. الحساب و [[shutdown /a]] اتجربوا في PowerShell 7.6 الساعة 10 الصبح؛ الإطفاء والـ restart نفسهم متجربوش (بيقفلوا الجهاز)، وشكلهم من [[shutdown /?]] وتوثيق Microsoft.

---

## ١. الساعة المطلوبة

~~~powershell
$target = Get-Date "23:30"
~~~

[[Get-Date "23:30"]] لما تديله ساعة من غير تاريخ، بيكمّلها بتاريخ النهارده:

~~~text الناتج ($target.ToString("yyyy-MM-dd HH:mm"))
2026-10-06 23:30
~~~

---

## ٢. لو الساعة عدّت، خليها بكرة

~~~powershell
if ($target -lt (Get-Date)) { $target = $target.AddDays(1) }
~~~

- [[-lt]] أقل من: «الساعة دي قبل دلوقتي؟»
- [[.AddDays(1)]] زوّد يوم.

الساعة 23:30 لسه مجتش فمتغيرتش. لكن جربت نفس السطر بـ [["08:00"]] الساعة 10 الصبح: الشرط طلع [[True]]، و [[$target]] بقى [[2026-10-07 08:00]] (بكرة). من غير السطر ده الحساب كان هيطلع بالسالب.

---

## ٣. الثواني الفاضلة

~~~powershell
$seconds = [int](New-TimeSpan -End $target).TotalSeconds
~~~

من جوه لبرة:

1. [[New-TimeSpan -End $target]] المدة من دلوقتي (البداية الافتراضية) لحد [[$target]]، ونوعها [[TimeSpan]].
2. [[.TotalSeconds]] المدة كلها بالثواني: طلعت [[47540.1651818]].
3. [[[int]]] حوّلها رقم صحيح: [[47540]]. خلي بالك إن [[[int]]] **بيقرّب** مش بيشيل الكسر (جربت [[[int]36988.7]] طلعت [[36989]])، والفرق ثانية مش فارق هنا.

---

## ٤. الإطفاء

~~~powershell
shutdown /s /t $seconds /c "The PC will shut down at 23:30. Save your work."
~~~

[[shutdown]] برنامج ويندوز (مش أمر PowerShell)، والـ options بتاعته بتبدأ بـ [[/]]:

| الـ option | معناه |
|---|---|
| [[/s]] | shutdown: اقفل الجهاز |
| [[/t $seconds]] | بعد العدد ده من الثواني (من 0 لحد 10 سنين) |
| [[/c "..."]] | رسالة تظهر في التنبيه (لحد 512 حرف) |

الأمر مش بيطبع حاجة، وويندوز بيعرض تنبيه إن الجهاز هيتقفل. والمعاد بيتحفظ في ويندوز نفسه، فتقدر تقفل الترمنال.

> لما [[/t]] أكبر من صفر، ويندوز بيحط [[/f]] لوحده: وقت المعاد البرامج بتتقفل غصب، وأي حاجة مش محفوظة بتضيع.

---

## ٥. الإلغاء

~~~powershell
shutdown /a
~~~

[[/a]] abort: الغي المعاد طول ما الوقت لسه معدّاش. ولو مفيش معاد أصلًا (ده اللي حصل عندي):

~~~text الناتج
Unable to abort the system shutdown because no shutdown was in progress.(1116)
~~~

و [[$LASTEXITCODE]] طلع [[1116]]. فلو عايز تتأكد إنك لغيت، شغّل [[shutdown /a]] مرة كمان: لو طلعت الرسالة دي يبقى مفيش حاجة متجدولة.

---

## ٦. restart بعد 10 دقايق

~~~powershell
shutdown /r /t 600 /c "Restarting in 10 minutes for updates"
shutdown /a
~~~

[[/r]] restart بدل [[/s]]، و 600 ثانية = 10 دقايق، وبعدها إلغاء برضه.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| تقفل بعد ساعة | [[shutdown /s /t 3600]] |
| restart بعد 10 دقايق | [[shutdown /r /t 600]] |
| رسالة | [[/c "..."]] |
| تلغي | [[shutdown /a]] |
| ثواني لحد ساعة معينة | [[[int](New-TimeSpan -End $target).TotalSeconds]] |
| تقفل حالًا من PowerShell | [[Stop-Computer]] (ومفيش إلغاء) |

و [[/t]] بالثواني مش بالدقايق.`,
          lines: [
            "الساعة 11:30 بالليل النهارده.",
            "لو الساعة دي عدّت، خليها بكرة.",
            "عدد الثواني من دلوقتي لحد الوقت ده، كرقم صحيح.",
            "اقفل الجهاز بعد الثواني دي، برسالة تظهر في التنبيه.",
            "الغي المعاد (طول ما الوقت لسه معدّاش).",
            "restart بعد 10 دقايق (600 ثانية) برسالة.",
            "الغيه برضه."
          ],
          sol: R`(مشغّلتش shutdown ولا restart فعلًا وأنا بكتب الدرس؛ جربت الحساب و [[shutdown /a]] و [[shutdown /?]].) الحساب: شغّلته الساعة 13:13، فـ [["23:30"]] فضلت النهارده بـ [[36988]] ثانية (10 ساعات و 16 دقيقة)، و [["08:00"]] اتنقلت لبكرة بـ [[67588]] ثانية.

[[shutdown /s /t 3600]] مش بيطبع حاجة في الترمنال، وويندوز بيعرض تنبيه إن الجهاز هيتقفل ومعاه رسالة [[/c]] لو كتبتها. و [[shutdown /a]] بيلغيه. ولو شغّلت [[shutdown /a]] ومفيش حاجة متجدولة بيطلع [[Unable to abort the system shutdown because no shutdown was in progress.(1116)]] والـ exit code [[1116]]، وده اللي حصل عندي. فلو عايز تتأكد إنك لغيته، شغّل [[shutdown /a]] تاني: لو طلعت الرسالة دي يبقى مفيش حاجة متجدولة.`
        },
        {
          cmd: "LockWorkStation",
          title: "اقفل الشاشة أو نيّم الجهاز",
          desc: R`[[rundll32.exe user32.dll,LockWorkStation]] بيقفل الشاشة زي Win+L بالظبط: البرامج شغالة وكل حاجة زي ما هي، بس لازم الباسورد أو الـ PIN عشان ترجع. و [[rundll32.exe]] برنامج في ويندوز بيشغّل function من جوه ملف DLL، و [[user32.dll,LockWorkStation]] اسم الملف والـ function وبينهم فاصلة من غير مسافة.

[[shutdown /h]] بيعمل hibernate: بيحفظ كل اللي في الرام على الديسك ويطفي الجهاز خالص، ولما تفتحه ترجع لنفس المكان. لازم الـ hibernate يكون متفعّل ([[powercfg /hibernate on]] من PowerShell أدمن).

[[powercfg /a]] بيقولك جهازك بيدعم أنهي أنواع نوم. والنوم (sleep) أصعب واحد من الترمنال: الأمر المشهور [[rundll32.exe powrprof.dll,SetSuspendState 0,1,0]] بيعمل hibernate مش sleep لو الـ hibernate متفعّل، لأن rundll32 مش بيبعت الأرقام دي للـ function صح. ولو جهازك لابتوب حديث و [[powercfg /a]] بيقول [[Standby (S0 Low Power Idle)]] (اسمها Modern Standby)، الأمر ده مش هيديك sleep خالص. في الحالة دي الأضمن تقفل الشاشة وتسيب الجهاز ينام لوحده حسب إعدادات الـ Power، أو زرار الـ power.

في المثال: [[powercfg /a]] الأول تعرف جهازك، وبعدين القفل، وبعدين [[Start-Sleep -Seconds 300]] يستنى 5 دقايق ويقفل (و [[;]] بتشغّل أمرين ورا بعض على نفس السطر). وأمرين الـ hibernate والـ sleep متعلّق عليهم بـ [[#]] عشان لو نسخت المثال كله ميطفّيش الجهاز؛ شيل الـ [[#]] من قدام اللي عايزه بس.`,
          example: R`powercfg /a
rundll32.exe user32.dll,LockWorkStation
Start-Sleep -Seconds 300; rundll32.exe user32.dll,LockWorkStation
# السطرين دول بيطفّوا الجهاز، شيل الـ # من قدام واحد بس لما تكون عايزه فعلًا:
# shutdown /h
# rundll32.exe powrprof.dll,SetSuspendState 0,1,0`,
          try: R`شغّل [[powercfg /a]] واعرف جهازك بيدعم إيه، وبعدين جرّب القفل بعد 10 ثواني: [[Start-Sleep 10; rundll32.exe user32.dll,LockWorkStation]].`,
          flag: "danger",
          deep: {
            why: R`القفل قبل ما تقوم من على الجهاز عادة أمان أساسية في أي مكتب، والأمر ده بيخليك تقفل من سكربت أو بعد وقت أو من shortcut. والـ hibernate مفيد لو هتشيل اللابتوب ساعات ومش عايز البطارية تخلص في الـ sleep، وترجع لنفس الشغل.`,
            how: R`القفل مش بيوقف أي حاجة: التحميلات والـ builds والسيرفرات المحلية بتكمّل. الـ sleep بيوقف الشغل والجهاز بيفضل بأقل طاقة والرام شغالة، والـ hibernate بيكتب الرام في ملف [[hiberfil.sys]] على الديسك ويطفي خالص.

Modern Standby (S0) معناه إن الجهاز وهو «نايم» بيفضل صاحي جزئيًا زي الموبايل، وده اللي في أغلب اللابتوبات الجديدة بدل S3 القديم. والـ API القديم [[SetSuspendState]] معمول لـ S3، فمش بيعرف ينوّم جهاز S0.

ليه rundll32 مع SetSuspendState بيعمل hibernate؟ rundll32 بيبعت للـ function parameters بشكل معمول لنوع تاني من الـ functions، فالأرقام [[0,1,0]] مش بتوصل زي ما انت فاكر، والـ function بتفهم أول قيمة على إنها «hibernate = نعم». عشان كده لو الـ hibernate متفعّل بيعمل hibernate.

[[powercfg]] فيه حاجات تانية مفيدة: [[powercfg /batteryreport]] (درس Get-CimInstance)، و [[powercfg /requests]] (مين مانع الجهاز ينام، محتاج أدمن)، و [[powercfg /change standby-timeout-ac 30]] (ينام بعد 30 دقيقة على الشاحن).`,
            when: R`القفل: كل ما تقوم، أو في آخر سكربت بتسيبه شغال. الـ hibernate: قبل ما تشيل اللابتوب مدة طويلة. والـ sleep من الترمنال: نادرًا، والأسهل من Start أو زرار الـ power.`,
            mistakes: R`تستخدم [[SetSuspendState]] وتستغرب إن الجهاز عمل hibernate أو معملش حاجة. أو تعمل [[shutdown /h]] والـ hibernate مقفول. أو تفتكر القفل بيوفّر بطارية زي الـ sleep: البرامج لسه شغالة. أو تقفل جلسة Remote Desktop على جهاز تاني وانت محتاجها.`
          },
          teach: R`## الفكرة: القفل غير النوم غير الإطفاء

| الحالة | البرامج | الرام | ترجع إزاي |
|---|---|---|---|
| قفل (lock) | شغالة عادي | شغالة | باسورد أو PIN |
| sleep | واقفة | شغالة بأقل طاقة | بتصحى في ثانية |
| hibernate | واقفة | اتكتبت على الديسك والجهاز طفى خالص | بيفتح ويرجع لنفس المكان |

[[powercfg /a]] اتشغّل على اللابتوب ده. القفل والـ hibernate والـ sleep متجربوش وأنا بكتب الدرس (بيقفلوا الشاشة أو الجهاز)، فسلوكهم من توثيق Microsoft.

---

## ١. جهازك بيدعم إيه: [[powercfg /a]]

~~~powershell
powercfg /a
~~~

[[powercfg]] برنامج إعدادات الطاقة في ويندوز، و [[/a]] (available) اعرض أنواع النوم المتاحة:

~~~text الناتج (مختصر)
The following sleep states are available on this system:
    Standby (S0 Low Power Idle) Network Connected
    Hibernate
    Fast Startup

The following sleep states are not available on this system:
    Standby (S3)
	The system firmware does not support this standby state.
	This standby state is disabled when S0 low power idle is supported.
~~~

نقرا:

- [[Standby (S0 Low Power Idle)]] ده **Modern Standby**: الجهاز وهو نايم بيفضل صاحي جزئيًا زي الموبايل. و [[Network Connected]] يعني النت بيفضل شغال.
- [[Hibernate]] متاح.
- [[Standby (S3)]] النوم القديم مش متاح، لأن S0 موجود.

ده مهم لأمر الـ sleep اللي تحت.

---

## ٢. قفل الشاشة

~~~powershell
rundll32.exe user32.dll,LockWorkStation
~~~

- [[rundll32.exe]] برنامج في ويندوز بيشغّل function من جوه ملف DLL (مكتبة).
- [[user32.dll]] المكتبة، و [[LockWorkStation]] الـ function اللي بتقفل الشاشة.
- بينهم **فاصلة من غير مسافة**: rundll32 بيقرا ده على إنه «الملف، الـ function».

النتيجة زي Win+L بالظبط، ومش بيطبع حاجة.

---

## ٣. اقفل بعد 5 دقايق

~~~powershell
Start-Sleep -Seconds 300; rundll32.exe user32.dll,LockWorkStation
~~~

- [[Start-Sleep -Seconds 300]] استنى 300 ثانية (5 دقايق). الترمنال بيفضل مستني.
- [[;]] بعدها نفّذ الأمر التاني، على نفس السطر.

---

## ٤. السطرين المتعلّق عليهم

~~~powershell
# shutdown /h
# rundll32.exe powrprof.dll,SetSuspendState 0,1,0
~~~

[[#]] في أول السطر بيخليه تعليق مش بيتنفّذ، عشان لو نسخت المثال كله ميطفّيش الجهاز. شيل الـ [[#]] من قدام واحد بس لما تكون عايزه.

- [[shutdown /h]]: hibernate. لازم يكون ظاهر في [[powercfg /a]] (هنا ظاهر).
- [[SetSuspendState 0,1,0]] من [[powrprof.dll]]: الأمر المشهور للـ sleep. بس rundll32 مش بيبعت الأرقام دي للـ function صح، فلو الـ hibernate متفعّل بيعمل **hibernate** مش sleep. وعلى جهاز زي ده (S0 بس) مش هيديك sleep خالص. الأضمن هنا: اقفل الشاشة وسيب الجهاز ينام لوحده، أو زرار الـ power.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| تعرف أنواع النوم | [[powercfg /a]] |
| تقفل الشاشة | [[rundll32.exe user32.dll,LockWorkStation]] |
| تقفل بعد وقت | [[Start-Sleep -Seconds N; rundll32.exe user32.dll,LockWorkStation]] |
| hibernate | [[shutdown /h]] |
| sleep | من Start أو زرار الـ power، مش من الترمنال |

والقفل مش بيوقف أي حاجة: التحميلات والـ builds بتكمّل.`,
          lines: [
            "أنواع النوم اللي جهازك بيدعمها.",
            "اقفل الشاشة زي Win+L.",
            "استنى 5 دقايق وبعدين اقفل الشاشة ([[;]] أمرين ورا بعض على نفس السطر)."
          ],
          sol: R`(مقفلتش الجهاز ولا نيّمته وأنا بكتب الدرس؛ شغّلت [[powercfg /a]] بس.) على لابتوب حديث طلع [[The following sleep states are available on this system:]] وتحته [[Standby (S0 Low Power Idle) Network Connected]] و [[Hibernate]] و [[Fast Startup]]، وتحت «not available» لقيت [[Standby (S3)]] وجنبه [[This standby state is disabled when S0 low power idle is supported.]]. يعني الجهاز ده Modern Standby، فـ SetSuspendState مش هيديك sleep.

القفل بعد 10 ثواني: الترمنال هيستنى، وبعدين الشاشة تقفل على شاشة الدخول، ولما تدخل تلاقي كل حاجة زي ما هي والأمر خلص من غير ما يطبع حاجة. ولو [[shutdown /h]] مشتغلش، اتأكد إن [[Hibernate]] موجود في [[powercfg /a]]، ولو مش موجود فعّله من PowerShell أدمن بـ [[powercfg /hibernate on]].`
        }
      ]
    }
]);
