// تكملة تاب ps: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/ps/01.js (شرح حقول الدرس في أوله)
MORE("ps", [
    {
      t: "صيانة وأمان الجهاز",
      l: 3,
      n: R`صحة الهارد، وفرمتة فلاشة، والتشفير، و Defender، ونقطة استرجاع قبل أي تغيير، والبرامج اللي بتقوم مع ويندوز، والأجهزة اللي فيها مشكلة، واستهلاك المعالج، وسجل الأحداث، وباسورد قوي: صيانة الجهاز من الترمنال. العرض غالبًا من غير أدمن، وأي تغيير محتاج Terminal أدمن`,
      items: [
        {
          cmd: "Get-PhysicalDisk",
          title: "صحة الهارد ونوعه (SSD ولا HDD)",
          desc: R`[[Get-PhysicalDisk]] بيعرض الديسكات الحقيقية في الجهاز: نوعها (SSD ولا HDD)، وبتتوصل إزاي (NVMe أو SATA أو USB)، وحالتها الصحية حسب الديسك نفسه. و [[Get-StorageReliabilityCounter]] بيطلّع أرقام أعمق: الحرارة، ونسبة استهلاك الـ SSD، والأخطاء، وساعات التشغيل.

الأعمدة: [[FriendlyName]] الموديل، و [[MediaType]] ([[SSD]] أو [[HDD]] أو [[Unspecified]] لو ويندوز مش عارف)، و [[BusType]] ([[NVMe]] الأسرع، و [[SATA]]، و [[USB]] للخارجي)، و [[HealthStatus]] ([[Healthy]] أو [[Warning]] أو [[Unhealthy]]). و [[@{ n = "GB"; e = { [int]($_.Size / 1GB) } }]] عمود محسوب (درس Get-CimInstance) بالحجم بالجيجا، و [[[int]]] بيقرّب لرقم صحيح.

[[Get-StorageReliabilityCounter]] بياخد الديسكات من الـ pipeline: [[Temperature]] بالسيلزيوس، و [[Wear]] نسبة ما اتصرف من عمر الـ SSD المتوقع (0 جديد، و 100 خلص عمره المتوقع)، و [[ReadErrorsTotal]] و [[WriteErrorsTotal]] أخطاء، و [[PowerOnHours]] ساعات التشغيل. ده محتاج Terminal أدمن، وبعض الديسكات (خصوصًا USB) مش بتدّي الأرقام دي فبتطلع فاضية.

[[Get-Disk]] الديسكات بالـ [[Number]] اللي بتستخدمه في الأوامر، و [[PartitionStyle]] ([[GPT]] الحديث أو [[MBR]] القديم). و [[Get-Partition]] التقسيمات اللي على كل ديسك وحرف كل واحدة ونوعها، و [[Get-Volume]] الـ volumes بالمساحة الفاضية، و [[Where-Object DriveLetter]] اللي ليها حرف بس (تقرير المساحة بطريقة شغالة على كل الأنظمة في درس disk-report.ps1). الموديول [[Storage]] جاي مع ويندوز وشغال في 5.1 و 7 (جربته على 7.6)، والعرض من غير أدمن ما عدا الـ reliability. وأداة الديسكات الكاملة من CMD في درس «diskpart» في تاب «CMD»، وفحص نظام الملفات في درس «chkdsk» هناك.`,
          example: R`Get-PhysicalDisk | Select-Object FriendlyName, MediaType, BusType, HealthStatus, @{ n = "GB"; e = { [int]($_.Size / 1GB) } }
Get-PhysicalDisk | Get-StorageReliabilityCounter | Select-Object DeviceId, Temperature, Wear, ReadErrorsTotal, WriteErrorsTotal, PowerOnHours
Get-Disk | Select-Object Number, FriendlyName, BusType, PartitionStyle, HealthStatus
Get-Partition | Select-Object DiskNumber, PartitionNumber, DriveLetter, Type, @{ n = "GB"; e = { [math]::Round($_.Size / 1GB, 1) } }
Get-Volume | Where-Object DriveLetter | Select-Object DriveLetter, FileSystem, HealthStatus, @{ n = "FreeGB"; e = { [int]($_.SizeRemaining / 1GB) } }, @{ n = "GB"; e = { [int]($_.Size / 1GB) } }`,
          try: R`اعرف الهارد اللي عندك SSD ولا HDD وصحته، وأنهي ديسك عليه C:، ولو تقدر تفتح Terminal أدمن شوف الحرارة والـ Wear.`,
          deep: {
            why: R`الجهاز بقى بطيء جدًا أو بيهنّج، أو لابتوب مستعمل عايز تعرف حالة الهارد فيه، أو قبل ما تشتري SSD تعرف الجهاز فيه NVMe ولا SATA، أو بتقرر تحط الـ backup فين. الأرقام دي بتقولك الديسك نفسه شايف إيه قبل ما يقع.`,
            how: R`[[HealthStatus]] جاي من تقييم الديسك نفسه (SMART)، وغالبًا مش بيتغير لـ Warning غير لما المشكلة تبقى قربت، فمتعتمدش عليه لوحده. [[Wear]] و [[ReadErrorsTotal]] بيدّوك صورة أبكر: Wear بيزيد ببطء مع الكتابة، ولو عدّى 80 أو 90 ابدأ جهّز البديل، وأخطاء قراية بتزيد معناها خلي الـ backup بتاعك جاهز.

[[Get-PhysicalDisk]] بيعرض الديسك الحقيقي، و [[Get-Disk]] بيعرضه كما ويندوز بيشوفه بالرقم اللي بتستخدمه في [[Clear-Disk]] و [[Initialize-Disk]] (الدرس الجاي)، و [[Get-Partition]] و [[Get-Volume]] اللي فوقيه. الحرف C: ممكن يبقى على ديسك، والـ System partition اللي بيبوّت منها على ديسك تاني (شوف الـ sol)، وده مهم قبل ما تشيل ديسك أو تمسحه.

[[MediaType Unspecified]] بيحصل مع بعض الكروت أو داخل الأجهزة الافتراضية، وساعتها [[BusType NVMe]] غالبًا يعني SSD.`,
            when: R`فحص دوري لصحة الهارد، أو قبل وبعد ما تنقل ويندوز لديسك جديد، أو لما الجهاز يبطّأ فجأة، أو لما تختار أنهي ديسك تمسح أو تفرمت.`,
            mistakes: R`تفتكر [[Healthy]] يعني الديسك هيعيش للأبد وتتجاهل الـ backup. أو تقرا [[Wear]] بالعكس (0 جديد). أو تخلط بين رقم الـ partition ورقم الديسك. أو تقسم [[Size]] على 1000 مرة تلات تقسيمات فتلاقي رقم مختلف عن ويندوز: ويندوز بيعرض بالـ 1024 ([[1GB]] في PowerShell). أو تستنى الـ reliability تشتغل من غير أدمن.`
          },
          teach: R`## الفكرة: الديسك من ٤ زوايا

ويندوز بيشوف التخزين على طبقات: **الديسك الحقيقي** (القطعة نفسها)، وفوقيه **التقسيمات** (partitions)، وفوقها **الـ volumes** اللي ليها حرف زي C:. كل سطر في المثال بيسأل عن طبقة. اتشغّلوا على PowerShell 7.6 من غير أدمن على لابتوب فيه ديسكين NVMe.

---

## ١. الديسكات الحقيقية

~~~powershell
Get-PhysicalDisk | Select-Object FriendlyName, MediaType, BusType, HealthStatus, @{ n = "GB"; e = { [int]($_.Size / 1GB) } }
~~~

~~~text الناتج
FriendlyName    MediaType BusType HealthStatus  GB
------------    --------- ------- ------------  --
HFM001TD3JX013N SSD       NVMe    Healthy      954
CT1000P3SSD8    SSD       NVMe    Healthy      932
~~~

| العمود | معناه |
|---|---|
| [[FriendlyName]] | الموديل |
| [[MediaType]] | [[SSD]] أو [[HDD]] (فيه أسطوانة بتلف) أو [[Unspecified]] |
| [[BusType]] | التوصيلة: [[NVMe]] (الأسرع)، [[SATA]]، [[USB]] |
| [[HealthStatus]] | رأي الديسك في نفسه: [[Healthy]] أو [[Warning]] أو [[Unhealthy]] |

### العمود المحسوب [[@{ n = "GB"; e = { ... } }]]

مفيش عمود جاهز بالجيجا، فبنعمله: [[n]] اسمه (name)، و [[e]] الكود اللي يحسبه (expression)، و [[$_]] الديسك الحالي.

- [[$_.Size]] الحجم بالبايت: للديسك الأول [[1024209543168]].
- [[/ 1GB]] PowerShell فاهم [[1GB]] كرقم = 1024 × 1024 × 1024، فيطلع 953.87.
- [[[int]( )]] حوّله لرقم صحيح، فيطلع [[954]].

> ليه ديسك «1 تيرا» طلع 954؟ الشركة بتحسب الجيجا مليار بايت (1024 مليار بايت = 1024 «جيجا» عندها)، وويندوز بيقسم على 1024 تلات مرات. نفس البايتات، وحدة مختلفة.

و [[[int]]] بيقرّب لأقرب رقم، ولو الكسر نص بالظبط بيروح للرقم **الزوجي**: جربت [[[int]2.5]] طلع [[2]] و [[[int]3.5]] طلع [[4]].

---

## ٢. الحرارة والاستهلاك (أدمن)

~~~powershell
Get-PhysicalDisk | Get-StorageReliabilityCounter | Select-Object DeviceId, Temperature, Wear, ReadErrorsTotal, WriteErrorsTotal, PowerOnHours
~~~

الـ [[|]] بيبعت كل ديسك لـ [[Get-StorageReliabilityCounter]] اللي بيقرا عداداته:

| العمود | معناه |
|---|---|
| [[Temperature]] | الحرارة بالسيلزيوس |
| [[Wear]] | نسبة ما اتصرف من عمر الـ SSD: 0 جديد، 100 خلص عمره المتوقع |
| [[ReadErrorsTotal]] / [[WriteErrorsTotal]] | أخطاء قراية وكتابة |
| [[PowerOnHours]] | ساعات التشغيل من ساعة ما اتصنع |

من غير أدمن:

~~~text الناتج
Access to a CIM resource was not available to the client.
~~~

يعني لازم Terminal أدمن. وبعض الديسكات (خصوصًا USB) بتسيب الخانات دي فاضية.

---

## ٣. الديسكات بالأرقام

~~~powershell
Get-Disk | Select-Object Number, FriendlyName, BusType, PartitionStyle, HealthStatus
~~~

~~~text الناتج
Number FriendlyName    BusType PartitionStyle HealthStatus
------ ------------    ------- -------------- ------------
     0 CT1000P3SSD8    NVMe    GPT            Healthy
     1 HFM001TD3JX013N NVMe    GPT            Healthy
~~~

[[Number]] هو الرقم اللي أوامر زي [[Clear-Disk]] بتاخده (الدرس الجاي)، فلازم تعرف أنهي رقم أنهي ديسك. لاحظ إن الترتيب هنا غير ترتيب [[Get-PhysicalDisk]]. و [[PartitionStyle]] شكل جدول التقسيمات: [[GPT]] الحديث، أو [[MBR]] القديم.

---

## ٤. التقسيمات

~~~powershell
Get-Partition | Select-Object DiskNumber, PartitionNumber, DriveLetter, Type, @{ n = "GB"; e = { [math]::Round($_.Size / 1GB, 1) } }
~~~

نفس فكرة العمود المحسوب، بس [[[math]::Round(..., 1)]] بيسيب رقم واحد بعد العلامة، عشان التقسيمات الصغيرة متطلعش 0.

~~~text الناتج
DiskNumber PartitionNumber DriveLetter Type         GB
---------- --------------- ----------- ----         --
         0               1             Reserved   0.00
         0               2           C Basic    301.30
         0               3             Recovery   1.00
         0               4           D Basic    629.20
         1               1             System     0.30
         1               2             Reserved   0.00
         1               3           E Basic    953.60
~~~

| [[Type]] | معناه |
|---|---|
| [[Basic]] | تقسيمة عادية ليها حرف |
| [[System]] | اللي الجهاز بيبوّت منها (EFI) |
| [[Recovery]] | أدوات إصلاح ويندوز |
| [[Reserved]] | مساحة صغيرة محجوزة لويندوز |

والمهم هنا: C على ديسك 0، بس تقسيمة [[System]] على ديسك **1**. يعني لو شلت ديسك 1، الجهاز غالبًا مش هيبوّت رغم إن ويندوز نفسه على ديسك 0.

---

## ٥. الـ volumes والمساحة الفاضية

~~~powershell
Get-Volume | Where-Object DriveLetter | Select-Object DriveLetter, FileSystem, HealthStatus, @{ n = "FreeGB"; e = { [int]($_.SizeRemaining / 1GB) } }, @{ n = "GB"; e = { [int]($_.Size / 1GB) } }
~~~

[[Where-Object DriveLetter]] يسيب اللي ليها حرف بس (من غير System و Recovery). و [[SizeRemaining]] الفاضي بالبايت، وبنحوّله جيجا بنفس الطريقة.

~~~text الناتج
DriveLetter FileSystem HealthStatus FreeGB  GB
----------- ---------- ------------ ------  --
          D NTFS       Healthy          59 629
          E NTFS       Healthy          49 954
          C NTFS       Healthy          45 301
~~~

[[FileSystem]] نظام الملفات: [[NTFS]] بتاع ويندوز.

---

## الخلاصة

| الطبقة | الأمر | بتعرف منه |
|---|---|---|
| الديسك الحقيقي | [[Get-PhysicalDisk]] | SSD ولا HDD، والتوصيلة، والصحة |
| صحة أعمق | [[Get-StorageReliabilityCounter]] | الحرارة والـ Wear (أدمن) |
| الديسك بالرقم | [[Get-Disk]] | الرقم و GPT أو MBR |
| التقسيمات | [[Get-Partition]] | فين C وفين System |
| الـ volumes | [[Get-Volume]] | المساحة الفاضية |

و [[Healthy]] مش ضمان؛ الـ backup هو الضمان.`,
          lines: [
            "الديسكات الحقيقية: الموديل والنوع والتوصيلة والصحة والحجم بالجيجا.",
            "الحرارة والاستهلاك والأخطاء وساعات التشغيل (أدمن).",
            "الديسكات بالأرقام اللي بتستخدمها في الأوامر، و GPT ولا MBR.",
            "التقسيمات على كل ديسك: رقمها وحرفها ونوعها وحجمها.",
            "الـ volumes اللي ليها حرف: نظام الملفات والصحة والمساحة الفاضية من الكلية."
          ],
          sol: R`جربتها على لابتوب فيه ديسكين NVMe. [[Get-PhysicalDisk]] طلع [[HFM001TD3JX013N  SSD  NVMe  Healthy  954]] و [[CT1000P3SSD8  SSD  NVMe  Healthy  932]]. و [[Get-StorageReliabilityCounter]] من غير أدمن رفض بـ [[Access to a CIM resource was not available to the client.]]، فالحرارة والـ Wear محتاجين Terminal أدمن.

و [[Get-Partition]] كشف حاجة مهمة: ديسك 0 عليه [[C]] (حوالي 301 جيجا) و [[D]] (حوالي 629) وتقسيمة [[Recovery]] و [[Reserved]]، لكن تقسيمة [[System]] (اللي ويندوز بيبوّت منها، حوالي 0.3 جيجا) على ديسك 1 جنب [[E]]. يعني لو شلت ديسك 1 أو مسحته، الجهاز غالبًا مش هيبوّت رغم إن ويندوز نفسه على ديسك 0. و [[Get-Volume]] طلع المساحة الفاضية: C فاضي فيه 48 من 301، و D فاضي 59 من 629، و E فاضي 49 من 954.`
        },
        {
          cmd: "Format-Volume / Clear-Disk",
          title: "امسح فلاشة USB وفرمتها من الترمنال",
          desc: R`الأوامر دي بتمسح فلاشة USB بالكامل (كل التقسيمات اللي عليها)، وتعمل عليها تقسيمة واحدة، وتفرمتها. مفيدة لما الفلاشة «بايظة»: حجمها ظاهر أصغر من الحقيقي، أو عليها تقسيمات من ISO لينكس قديم، أو Explorer مش راضي يفرمتها. والخطر حقيقي: رقم ديسك غلط = مسح الهارد بتاعك، فالمثال بيختار الديسك اللي على USB بس، ويوقف لو لقى أكتر من واحد، ويسألك قبل المسح.

[[Get-Disk | Where-Object BusType -eq USB]] الديسكات المتوصلة USB بس، و [[@( )]] حواليه بيخلي النتيجة array حتى لو عنصر واحد، فـ [[.Count]] تبقى صح. والسطر التاني بيعرض الرقم والاسم والحجم عشان تتأكد بعينك. و [[throw]] بيوقف السكربت برسالة لو مفيش فلاشة أو فيه أكتر من واحدة. و [[Read-Host]] بيسألك، ولو مكتبتش [[YES]] بالظبط، [[return]] بيخرج من غير ما يلمس حاجة.

[[Clear-Disk -RemoveData -RemoveOEM]] بيمسح كل التقسيمات ويرجّع الديسك «مش متهيأ» (RAW): [[-RemoveData]] لازم لو عليه بيانات، و [[-RemoveOEM]] لو عليه تقسيمات recovery من الشركة، و [[-Confirm:$false]] من غير سؤال تاني (احنا سألنا خلاص). [[Initialize-Disk -PartitionStyle MBR]] بيجهّزه تاني، و MBR أكتر توافق مع الأجهزة القديمة والتليفزيونات والعربيات (GPT للديسكات الأكبر من 2 تيرا). و [[New-Partition -UseMaximumSize -AssignDriveLetter]] تقسيمة واحدة بالمساحة كلها وحرف أوتوماتيك، والـ pipe لـ [[Format-Volume -FileSystem exFAT -NewFileSystemLabel "USB"]] بيفرمتها باسم يظهر في Explorer.

نظام الملفات: [[FAT32]] بيشتغل في كل حتة تقريبًا، بس مفيش ملف أكبر من 4 جيجا، وأدوات ويندوز تاريخيًا مش بتعمله على مساحة أكبر من 32 جيجا. [[exFAT]] من غير حد الـ 4 جيجا، ومقروء في ويندوز والماك ومعظم الأجهزة الحديثة، وده الأنسب لفلاشة. [[NTFS]] بتاع ويندوز (صلاحيات وملفات ضخمة)، والماك بيقراه من غير ما يكتب عليه.

كله محتاج Terminal أدمن، والموديول Storage شغال في 5.1 و 7. وملاحظة من التوثيق: [[-WhatIf]] مش بيشتغل مع [[Format-Volume]]، فمتعتمدش عليه للتجربة. ومن CMD نفس الشغل بـ [[diskpart]] (درس «diskpart» في تاب «CMD»)، وبالماوس من Disk Management ([[diskmgmt.msc]]).`,
          example: R`$usb = @(Get-Disk | Where-Object BusType -eq USB)
$usb | Select-Object Number, FriendlyName, @{ n = "GB"; e = { [math]::Round($_.Size / 1GB, 1) } }
if ($usb.Count -ne 1) { throw "Expected exactly one USB disk, found $($usb.Count)" }
$n = $usb[0].Number
if ((Read-Host "Wipe disk $n ($($usb[0].FriendlyName))? Type YES") -cne "YES") { return }
Clear-Disk -Number $n -RemoveData -RemoveOEM -Confirm:$false
Initialize-Disk -Number $n -PartitionStyle MBR
New-Partition -DiskNumber $n -UseMaximumSize -AssignDriveLetter | Format-Volume -FileSystem exFAT -NewFileSystemLabel "USB"`,
          try: R`من غير فلاشة متوصلة، شغّل أول 3 سطور بس وشوف رسالة الـ throw. وبعدين وصّل فلاشة مفيهاش حاجة مهمة، وشغّل أول سطرين واتأكد إن الاسم والحجم بتوعها هي، قبل ما تفكر تكمّل.`,
          flag: "script danger",
          deep: {
            why: R`فلاشة كانت عليها ISO لينكس أو ويندوز (bootable) فبقت ظاهرة 2 ميجا بس، أو اتعملها partition غريب، أو عايز تمسحها قبل ما تديها لحد، أو تفرمتها exFAT عشان تحط عليها ملف أكبر من 4 جيجا. والطريقة دي بتنضّفها من الصفر أحسن من Format العادي في Explorer اللي بيفرمت تقسيمة واحدة وبيسيب الباقي.`,
            how: R`الفرق بين الأوامر: [[Clear-Disk]] بيمسح جدول التقسيمات كله، و [[Initialize-Disk]] بيكتب جدول جديد فاضي (MBR أو GPT)، و [[New-Partition]] بيعمل تقسيمة، و [[Format-Volume]] بيكتب نظام ملفات عليها. Explorer بيعمل الخطوة الأخيرة بس.

المسح ده «سريع»: الملفات القديمة مش بتتكتب فوقها، فبرامج الاسترجاع ممكن ترجّع حاجات منها. لو هتدّي الفلاشة لحد وفيها حاجات حساسة، [[Format-Volume -Full]] بيكتب على كل الفلاشة (أبطأ بكتير).

[[-cne]] يعني «لا يساوي» مع مراعاة الكابيتال والسمول (درس «عوامل المقارنة»)، فـ yes بالسمول مش هتعدّي. و [[return]] في سكربت بيخرج منه. و [[$usb[0]]] أول (والوحيد) عنصر في الـ array.

بعض كروت الـ SD والفلاشات الرخيصة بتظهر [[BusType]] بقيمة [[SD]] أو [[SCSI]] بدل USB، فالفلتر مش هيلاقيها، وده أأمن من إنه يلاقي حاجة غلط: ساعتها اختار الرقم بإيدك من [[Get-Disk]] بعد ما تقارن الحجم.`,
            when: R`تنضيف فلاشة bootable قديمة، أو تجهيز فلاشة لتليفزيون أو عربية، أو exFAT لملفات كبيرة، أو قبل ما تدّي فلاشة لحد.`,
            mistakes: R`تكتب رقم ديسك من الذاكرة بدل ما تبص على [[Get-Disk]]. أو تشيل فلتر الـ USB «عشان مش لاقي الفلاشة». أو تفرمت FAT32 وبعدين ملف 5 جيجا يرفض يتنسخ. أو تفتكر [[-WhatIf]] بيحميك مع Format-Volume. أو تفصل الفلاشة في نص العملية. أو تختار GPT لفلاشة رايحة لجهاز قديم.`
          },
          teach: R`## الفكرة: نص السكربت حماية، والنص التاني مسح

أول ٥ سطور مش بيلمسوا أي ديسك: بيلاقوا الفلاشة، ويتأكدوا إنها واحدة بس، ويسألوك. آخر ٣ سطور هما اللي بيمسحوا ويفرمتوا. شغّلت أول ٣ سطور بس على PowerShell 7.6 ومفيش فلاشة متوصلة، والباقي من توثيق Microsoft (ومتشغّلوش غير على فلاشة انت متأكد منها، من Terminal أدمن).

---

## ١. لاقي الفلاشة

~~~powershell
$usb = @(Get-Disk | Where-Object BusType -eq USB)
~~~

- [[Get-Disk]] كل الديسكات.
- [[Where-Object BusType -eq USB]] اللي متوصلة USB بس، عشان الهارد الداخلي (NVMe أو SATA) ميدخلش أصلًا. و [[-eq]] يعني «يساوي».
- [[@( )]] حوالين النتيجة بيخليها **array دايمًا**، حتى لو مفيش ولا واحد أو فيه واحد بس.

### ليه [[@( )]] مهمة هنا؟

السطر التالت بيعدّ بـ [[.Count]]. جربت ديسك واحد من غير [[@( )]] في النسختين:

~~~text الناتج
PowerShell 7.6:  count=1
PowerShell 5.1:  count=        (فاضي)
~~~

في 5.1 الـ object الواحد اللي جاي من [[Get-Disk]] ملوش [[.Count]]، فالشرط في السطر التالت كان هيوقف السكربت حتى لو الفلاشة موجودة. ومع [[@( )]] بيطلع [[1]] في الاتنين.

---

## ٢. اعرضها قبل أي حاجة

~~~powershell
$usb | Select-Object Number, FriendlyName, @{ n = "GB"; e = { [math]::Round($_.Size / 1GB, 1) } }
~~~

الرقم والاسم والحجم بالجيجا (عمود محسوب، درس Get-PhysicalDisk). الهدف إنك **تبص بعينك**: الاسم ده اسم الفلاشة؟ الحجم ده حجمها؟ ومفيش فلاشة متوصلة، فمطلّعش حاجة.

---

## ٣. واحدة بالظبط، وإلا وقّف

~~~powershell
if ($usb.Count -ne 1) { throw "Expected exactly one USB disk, found $($usb.Count)" }
~~~

- [[-ne]] «لا يساوي».
- [[throw]] بيطلّع error ويوقف السكربت كله.
- [[$($usb.Count)]] جوه النص: [[$( )]] بتحسب اللي جواها وتحط النتيجة في النص. من غيرها [["$usb.Count"]] هتطبع [[$usb]] وبعدها كلمة [[.Count]].

~~~text الناتج (مفيش فلاشة)
Expected exactly one USB disk, found 0
~~~

ولو فيه فلاشتين بيوقف برضه، عشان ميختارش واحدة بالغلط.

---

## ٤. الرقم، وسؤال أخير

~~~powershell
$n = $usb[0].Number
if ((Read-Host "Wipe disk $n ($($usb[0].FriendlyName))? Type YES") -cne "YES") { return }
~~~

- [[$usb[0]]] أول عنصر في الـ array (العد بيبدأ من 0)، و [[.Number]] رقم الديسك.
- [[Read-Host "..."]] بيطبع السؤال ويستنى تكتب، والسؤال فيه الرقم والاسم عشان تشوفهم تاني.
- [[-cne]] «لا يساوي» **مع مراعاة الكابيتال** ([[c]] = case-sensitive). جربت:

~~~text الناتج
"yes" -cne "YES"  →  True    (يعني هيخرج)
"YES" -cne "YES"  →  False   (يكمّل)
"yes" -ne  "YES"  →  False   (-ne العادي كان هيعدّيها)
~~~

- [[return]] بيخرج من السكربت من غير ما يلمس حاجة.

---

## ٥. المسح والتجهيز (أدمن)

~~~powershell
Clear-Disk -Number $n -RemoveData -RemoveOEM -Confirm:$false
Initialize-Disk -Number $n -PartitionStyle MBR
New-Partition -DiskNumber $n -UseMaximumSize -AssignDriveLetter | Format-Volume -FileSystem exFAT -NewFileSystemLabel "USB"
~~~

٤ خطوات، كل واحدة طبقة:

| الأمر | بيعمل إيه |
|---|---|
| [[Clear-Disk -RemoveData -RemoveOEM]] | يمسح جدول التقسيمات كله. [[-RemoveData]] لازم لو عليه بيانات، و [[-RemoveOEM]] لو عليه تقسيمات الشركة |
| [[-Confirm:$false]] | متسألش تاني. الـ [[:]] بتلزق القيمة في الـ switch |
| [[Initialize-Disk -PartitionStyle MBR]] | يكتب جدول تقسيمات جديد فاضي. MBR أكتر توافق مع الأجهزة القديمة |
| [[New-Partition -UseMaximumSize -AssignDriveLetter]] | تقسيمة واحدة بالمساحة كلها، وحرف أوتوماتيك |
| [[Format-Volume -FileSystem exFAT -NewFileSystemLabel "USB"]] | يكتب نظام ملفات exFAT، والاسم اللي يظهر في Explorer |

الـ [[|]] بيبعت التقسيمة الجديدة لـ [[Format-Volume]] على طول، من غير ما تعرف حرفها.

### أنظمة الملفات

جربت أطلّع القيم المسموحة لـ [[-FileSystem]]:

~~~text الناتج
FAT, FAT32, exFAT, NTFS, ReFS
~~~

| النظام | الحد | فين بيشتغل |
|---|---|---|
| [[FAT32]] | مفيش ملف أكبر من 4 جيجا | في كل حتة تقريبًا |
| [[exFAT]] | من غير حد عملي | ويندوز والماك ومعظم الأجهزة الحديثة |
| [[NTFS]] | من غير حد عملي | ويندوز، والماك بيقرا بس |

---

## الخلاصة

| السطر | دوره |
|---|---|
| ١ | الديسكات اللي على USB بس، في array |
| ٢ | اعرضها وبص بعينك |
| ٣ | مش واحدة بالظبط؟ وقّف |
| ٤ و ٥ | الرقم، واسأل YES كابيتال |
| ٦ لـ ٨ | امسح، جهّز MBR، تقسيمة، exFAT |

وخلي بالك: [[-WhatIf]] مش بيشتغل مع [[Format-Volume]] (حسب التوثيق)، فالحماية هي أول ٥ سطور.`,
          lines: [
            "كل الديسكات المتوصلة USB، في array دايمًا.",
            "اعرض رقمها واسمها وحجمها عشان تتأكد بعينك.",
            "لو مش فلاشة واحدة بالظبط، وقّف برسالة.",
            "رقم الديسك.",
            "اسأل، ولو مكتبتش YES كابيتال اخرج من غير ما تلمس حاجة.",
            "امسح كل التقسيمات والبيانات (أدمن).",
            "جهّزه تاني بجدول MBR.",
            "تقسيمة واحدة بالمساحة كلها وحرف، وفرمتها exFAT باسم USB."
          ],
          sol: R`مشغّلتش المسح ولا الفرمتة وأنا بكتب الدرس (ولا تشغّلهم غير على فلاشة انت متأكد منها). شغّلت أول 3 سطور بس ومفيش فلاشة متوصلة: [[Get-Disk | Where-Object BusType -eq USB]] مطلّعش حاجة، والـ throw وقّف السكربت برسالة [[Expected exactly one USB disk, found 0]]، وده بالظبط اللي المفروض يحصل. وعلى نفس الجهاز [[Get-Disk]] من غير فلتر طلع ديسكين NVMe بس، رقم 0 و 1.

حسب توثيق Microsoft لموديول Storage: [[Clear-Disk]] مش بيطبع حاجة إلا مع [[-PassThru]]، و [[Format-Volume]] بيطبع الـ volume الجديد بـ DriveLetter و FileSystemLabel و FileSystem [[exFAT]] و HealthStatus [[Healthy]] والحجم.`
        },
        {
          cmd: "Get-BitLockerVolume",
          title: "التشفير شغال؟ ومفتاح الاسترجاع فين؟",
          desc: R`BitLocker بيشفّر الديسك كله، فلو اللابتوب اتسرق محدش يقدر يقرا الملفات من غير ما يدخل ويندوز. لكن ساعات بعد تحديث BIOS أو تغيير هاردوير، ويندوز بيطلب «Recovery key» (48 رقم)، ومن غيره الملفات راحت. [[Get-BitLockerVolume]] بيعرض حالة التشفير، والمثال بيوريك مفتاح الاسترجاع عشان تتأكد إنه محفوظ في مكان بره الجهاز.

الأعمدة: [[MountPoint]] حرف الديسك، و [[VolumeStatus]] ([[FullyEncrypted]] أو [[FullyDecrypted]] أو [[EncryptionInProgress]])، و [[ProtectionStatus]] ([[On]] الحماية شغالة، و [[Off]] مش شغالة حتى لو الديسك متشفّر، زي وقت تحديث الـ BIOS لما بتتعلّق مؤقتًا)، و [[EncryptionPercentage]]. و [[.KeyProtector]] الطرق اللي تفتح الديسك: [[Tpm]] (شريحة الأمان في الجهاز، بتفتحه لوحدها لما الجهاز سليم) و [[RecoveryPassword]] (المفتاح اللي بيتكتب بإيدك)، و [[Where-Object KeyProtectorType -eq RecoveryPassword]] بيجيبه، و [[KeyProtectorId]] رقمه اللي بيظهر في شاشة الاسترجاع عشان تعرف أنهي مفتاح تكتب.

[[manage-bde -status C:]] نفس المعلومات من أداة CMD القديمة، و [[-protectors -get C:]] المفاتيح. والاتنين محتاجين Terminal أدمن، والموديول [[BitLocker]] بيتحمّل في PowerShell 7 عادي (جربت).

ويندوز Home مفيهوش BitLocker الكامل (لوحة التحكم بتاعته، وتشفير الفلاشات). فيه «Device encryption»: نفس التشفير على ديسك ويندوز والديسكات الثابتة، وبيتفعّل لوحده لو الجهاز فيه TPM و Secure Boot ودخلت بحساب Microsoft، والمفتاح بيتحفظ في حسابك. تشوفه من Settings ← Privacy & security ← Device encryption، والمفتاح على [[https://aka.ms/myrecoverykey]] من موبايلك أو أي جهاز. و Pro فيه كمان BitLocker للفلاشات (BitLocker To Go) وإدارة كاملة.

المفتاح ده سر: أي حد معاه المفتاح والديسك يقرا كل حاجة. متبعتهوش في شات ولا تحطه في screenshot، وخزّنه في مدير باسوردات أو اطبعه.`,
          example: R`Get-BitLockerVolume | Select-Object MountPoint, VolumeStatus, ProtectionStatus, EncryptionPercentage
(Get-BitLockerVolume -MountPoint C:).KeyProtector | Select-Object KeyProtectorType, KeyProtectorId
(Get-BitLockerVolume -MountPoint C:).KeyProtector | Where-Object KeyProtectorType -eq RecoveryPassword | Select-Object KeyProtectorId, RecoveryPassword
manage-bde -status C:
manage-bde -protectors -get C:`,
          try: R`افتح Settings ← Privacy & security ← Device encryption واعرف التشفير شغال ولا لأ. ولو شغال، افتح [[https://aka.ms/myrecoverykey]] من موبايلك واتأكد إن المفتاح موجود، وقارن الـ Key ID بالناتج من Terminal أدمن.`,
          deep: {
            why: R`ناس كتير بتكتشف إن الديسك متشفّر يوم ما شاشة BitLocker recovery تظهر بعد تحديث، ومعندهمش المفتاح. خمس دقايق تتأكد فيها إن المفتاح محفوظ في حسابك أو مطبوع بتوفّر عليك ضياع كل الملفات. وكمان لو هتبيع جهاز أو تبعته صيانة، تعرف الديسك متشفّر ولا لأ.`,
            how: R`الـ TPM بيفتح الديسك أوتوماتيك طول ما «القياسات» بتاعة الـ boot زي ما هي (BIOS، و Secure Boot، و boot loader). تحديث BIOS، أو تغيير إعداد Secure Boot، أو نقل الديسك لجهاز تاني، بيغيّر القياسات، فالـ TPM يرفض وويندوز يطلب الـ Recovery key. عشان كده تحديثات BIOS الرسمية بتعلّق BitLocker مؤقتًا الأول (ProtectionStatus Off لحد الـ restart الجاي).

Device encryption على Home هو نفس محرك BitLocker، فـ [[Get-BitLockerVolume]] و [[manage-bde]] بيعرضوه عادي من Terminal أدمن. لو دخلت بحساب local بس، المفتاح مش بيتحفظ في أي حتة أوتوماتيك، وفي الحالة دي التشفير غالبًا مش بيكمّل لحد ما تدخل بحساب Microsoft.

[[manage-bde -status]] بيطلع سطور زي [[Conversion Status]] و [[Percentage Encrypted]] و [[Encryption Method]] (زي XTS-AES 128) و [[Protection Status]] و [[Key Protectors]]. و [[manage-bde -protectors -get C:]] بيطبع [[Numerical Password]] ومعاه الـ ID والـ Password.`,
            when: R`مرة دلوقتي تتأكد من المفتاح، وقبل أي تحديث BIOS أو تغيير هاردوير، وقبل ما تبيع الجهاز أو تبعته صيانة، ولما تشتري جهاز مستعمل.`,
            mistakes: R`تفتكر إن «مفيش BitLocker على Home» يعني الديسك مش متشفّر. أو تحدّث BIOS من غير ما تتأكد من المفتاح. أو تحفظ المفتاح في ملف على نفس الديسك المتشفّر. أو تبعت الـ RecoveryPassword في شات أو screenshot. أو تدخل بحساب local وتفتكر المفتاح في حسابك.`
          },
          teach: R`## الفكرة: سؤالين، التشفير شغال؟ والمفتاح فين؟

أول ٣ سطور بـ PowerShell، وآخر سطرين نفس المعلومات من أداة CMD القديمة [[manage-bde]]. كلهم محتاجين Terminal أدمن. جربتهم من غير أدمن على ويندوز 11 Home (PowerShell 7.6 و 5.1) وطلعوا رفض، فشكل الناتج من الأدمن مكتوب من توثيق Microsoft.

---

## ١. حالة كل ديسك

~~~powershell
Get-BitLockerVolume | Select-Object MountPoint, VolumeStatus, ProtectionStatus, EncryptionPercentage
~~~

| العمود | معناه | القيم |
|---|---|---|
| [[MountPoint]] | الديسك | [[C:]] و [[D:]] ... |
| [[VolumeStatus]] | البيانات نفسها متشفّرة؟ | [[FullyEncrypted]] أو [[FullyDecrypted]] أو [[EncryptionInProgress]] |
| [[ProtectionStatus]] | الحماية شغالة؟ | [[On]] أو [[Off]] |
| [[EncryptionPercentage]] | نسبة اللي اتشفّر | 0 لـ 100 |

الفرق بين العمودين التاني والتالت مهم: ديسك ممكن يبقى [[FullyEncrypted]] والحماية [[Off]]. ده بيحصل وقت تحديث BIOS: البيانات لسه متشفّرة، بس المفتاح متساب مكشوف مؤقتًا لحد الـ restart الجاي.

من غير أدمن:

~~~text الناتج
Access to a CIM resource was not available to the client.
~~~

---

## ٢. مين يقدر يفتح C:

~~~powershell
(Get-BitLockerVolume -MountPoint C:).KeyProtector | Select-Object KeyProtectorType, KeyProtectorId
~~~

- [[-MountPoint C:]] ديسك C بس.
- الأقواس [[( )]] نفّذ الأول، و [[.KeyProtector]] خد منه لستة «الحاجات اللي تفتح الديسك».

| [[KeyProtectorType]] | معناه |
|---|---|
| [[Tpm]] | شريحة الأمان في الجهاز. بتفتح الديسك لوحدها طول ما الجهاز ما اتغيّرش |
| [[RecoveryPassword]] | مفتاح الاسترجاع: 48 رقم بتكتبهم بإيدك لما الـ TPM يرفض |

و [[KeyProtectorId]] رقم تعريف بين أقواس معقوفة [[{...}]]. شاشة الاسترجاع بتعرض أوله، عشان تعرف أنهي مفتاح من مفاتيحك تكتب.

---

## ٣. المفتاح نفسه

~~~powershell
(Get-BitLockerVolume -MountPoint C:).KeyProtector | Where-Object KeyProtectorType -eq RecoveryPassword | Select-Object KeyProtectorId, RecoveryPassword
~~~

نفس السطر اللي فات، و [[Where-Object KeyProtectorType -eq RecoveryPassword]] بيسيب مفتاح الاسترجاع بس، و [[RecoveryPassword]] الـ 48 رقم (8 مجموعات، كل واحدة 6 أرقام). ده سر: متصوّروش ولا تبعتوه، قارنه بس باللي في حسابك على [[https://aka.ms/myrecoverykey]].

---

## ٤. نفس الكلام من [[manage-bde]]

~~~powershell
manage-bde -status C:
manage-bde -protectors -get C:
~~~

[[manage-bde]] (BitLocker Drive Encryption) أداة CMD بتشتغل من PowerShell عادي. [[-status]] الحالة، و [[-protectors -get]] المفاتيح. من غير أدمن:

~~~text الناتج
BitLocker Drive Encryption: Configuration Tool version 10.0.26100
Copyright (C) 2013 Microsoft Corporation. All rights reserved.

ERROR: An attempt to access a required resource was denied.

Check that you have administrative rights on the computer.
~~~

و [[$LASTEXITCODE]] (كود خروج آخر برنامج خارجي) طلع [[-2147217405]]، وده بالـ hex [[80041003]]، كود ويندوز معناه «رفض صلاحية». أي رقم غير 0 معناه إن البرنامج فشل.

ومن Terminal أدمن (حسب التوثيق)، [[-status]] بيطلع سطور زي [[Conversion Status]] و [[Percentage Encrypted]] و [[Encryption Method]] و [[Protection Status]]، و [[-protectors -get]] بيطبع [[Numerical Password]] ومعاه الـ ID والمفتاح.

---

## ٥. ويندوز Home

Home مفيهوش لوحة BitLocker، بس فيه **Device encryption**، ودي نفس محرك BitLocker، فالأوامر دي بتعرضها عادي من أدمن. ومن غير أدمن خالص: Settings ← Privacy & security ← Device encryption.

---

## الخلاصة

| عايز تعرف | الأمر |
|---|---|
| متشفّر؟ والحماية شغالة؟ | [[Get-BitLockerVolume]] ← [[VolumeStatus]] و [[ProtectionStatus]] |
| مين بيفتح الديسك | [[.KeyProtector]] ← [[Tpm]] و [[RecoveryPassword]] |
| المفتاح نفسه | [[Where-Object KeyProtectorType -eq RecoveryPassword]] |
| نفس الحاجة من CMD | [[manage-bde -status]] و [[-protectors -get]] |

والهدف كله: تتأكد إن المفتاح محفوظ **بره** الجهاز قبل ما تحتاجه.`,
          lines: [
            "حالة التشفير والحماية لكل ديسك (أدمن).",
            "الطرق اللي بتفتح C: وأرقامها.",
            "مفتاح الاسترجاع نفسه (سر، متعرضهوش لحد).",
            "نفس الحالة من أداة CMD القديمة (أدمن).",
            "مفاتيح C: من نفس الأداة."
          ],
          sol: R`جربت من غير أدمن على ويندوز 11 Home: [[Get-BitLockerVolume]] رفض بـ [[Access to a CIM resource was not available to the client.]]، و [[manage-bde -status C:]] طبع [[ERROR: An attempt to access a required resource was denied.]] و [[Check that you have administrative rights on the computer.]] و [[$LASTEXITCODE]] بعده طلع [[-2147217405]] (بالـ hex [[80041003]]، يعني رفض صلاحية). يعني حتى معرفة «التشفير شغال ولا لأ» محتاجة Terminal أدمن، أو Settings ← Privacy & security ← Device encryption من غير أدمن.

(مقدرتش أشغّلهم كأدمن وأنا بكتب الدرس.) من Terminal أدمن على ديسك متشفّر، المفروض تشوف [[VolumeStatus FullyEncrypted]] و [[ProtectionStatus On]] و [[EncryptionPercentage 100]]، وفي KeyProtector سطرين: [[Tpm]] و [[RecoveryPassword]]. والـ KeyProtectorId اللي بيظهر بين أقواس معقوفة هو نفسه اللي هتلاقيه جنب المفتاح على aka.ms/myrecoverykey.`
        },
        {
          cmd: "Get-MpComputerStatus",
          title: "Windows Defender من الترمنال",
          desc: R`[[Get-MpComputerStatus]] بيعرض حالة Microsoft Defender (الأنتي فيرس اللي جاي مع ويندوز): شغال ولا لأ، والحماية الفورية، وآخر تحديث للتعريفات، وآخر فحص. ومعاه أوامر تحدّث وتفحص وتشوف اللي اتمسك وتستثني فولدرات.

[[AMRunningMode]] ([[Normal]] شغال كأنتي فيرس أساسي، و [[Passive Mode]] لو فيه أنتي فيرس تاني متسطب)، و [[RealTimeProtectionEnabled]] الفحص الفوري لأي ملف بيتفتح أو بيتكتب، و [[AntivirusSignatureLastUpdated]] آخر تحديث للتعريفات، و [[QuickScanAge]] أيام من آخر فحص سريع، و [[IsTamperProtected]] حماية Defender من إن برنامج يقفله (Tamper Protection).

[[Update-MpSignature]] بيحدّث التعريفات دلوقتي. و [[Start-MpScan -ScanType QuickScan]] فحص سريع للأماكن اللي البرامج الخبيثة بتستخبى فيها، و [[-ScanType CustomScan -ScanPath]] فولدر معين (زي Downloads أو مشروع نزّلته). و [[Get-MpThreatDetection]] اللي Defender مسكه قبل كده: [[InitialDetectionTime]] إمتى، و [[ThreatID]] رقم التهديد، و [[Resources]] الملفات. و [[Add-MpPreference -ExclusionPath]] بيستثني فولدر من الفحص، و [[(Get-MpPreference).ExclusionPath]] الاستثناءات الحالية، و [[Remove-MpPreference -ExclusionPath]] بيشيل استثناء.

الاستثناء والأمان: فولدر زي [[node_modules]] فيه عشرات الآلاف من الملفات الصغيرة، و Defender بيفحص كل ملف وهو بيتكتب، فـ [[npm install]] والـ build بيبطّأوا. الاستثناء بيسرّع، بس أي حاجة خبيثة جوه الفولدر ده (باكدج npm ملغومة مثلًا) مش هتتفحص. فلو استثنيت، استثني فولدر مشاريعك بالظبط، مش [[C:\Users]] ولا Downloads. والأحسن غالبًا Dev Drive (درس «Dev Drive» في تاب «اختصارات النظام»): Defender بيفضل يفحص فيه بس بوضع أسرع (performance mode).

العرض من غير أدمن، ما عدا لستة الاستثناءات. والتحديث والفحص والاستثناء من Terminal أدمن. في PowerShell 7 الموديول ([[ConfigDefender]]) بيتحمّل عن طريق Windows PowerShell 5.1 في الخلفية (Windows compatibility، اسم الجلسة [[WinPSCompatSession]])، والأوامر شغالة عادي (جربت). ولو عندك أنتي فيرس تاني، Defender بيبقى Passive والأوامر دي مش هتفرق كتير.`,
          example: R`Get-MpComputerStatus | Select-Object AMRunningMode, RealTimeProtectionEnabled, AntivirusSignatureLastUpdated, QuickScanAge, IsTamperProtected
Update-MpSignature
Start-MpScan -ScanType QuickScan
Start-MpScan -ScanType CustomScan -ScanPath "$HOME\Downloads"
Get-MpThreatDetection | Select-Object InitialDetectionTime, ThreatID, Resources
Add-MpPreference -ExclusionPath "D:\projects"
(Get-MpPreference).ExclusionPath`,
          try: R`اعرف حالة Defender عندك، وآخر تحديث للتعريفات، وهل Tamper Protection شغال. ولو مقفول، شغّله من Windows Security ← Virus & threat protection ← Manage settings.`,
          flag: "danger",
          deep: {
            why: R`تتأكد إن الحماية شغالة (برامج كتير بتقفلها من غير ما تقول)، أو تفحص فولدر مشروع أو ملف نزّلته قبل ما تشغّله، أو تفهم ليه npm install بطيء، أو تشوف Defender مسك إيه وإمتى. ومن الترمنال تقدر تحطها في سكربت صيانة.`,
            how: R`Defender بيشتغل كخدمة ([[WinDefend]]) وعملية اسمها [[MsMpEng]]، وده اللي بتلاقيه بياكل معالج وقت الـ build أو الفحص (درس Get-Counter). والأوامر دي بتكلّمه عن طريق CIM، والنتيجة object ليه خصائص كتير: [[Get-MpComputerStatus | Format-List *]] بيعرضها كلها.

Tamper Protection بيمنع أي برنامج (حتى سكربت أدمن) من إنه يقفل الحماية الفورية أو يغيّر إعدادات مهمة. لو شغال، [[Set-MpPreference -DisableRealtimeMonitoring $true]] مش هيأثر، وده المقصود. التعديل بيتعمل من واجهة Windows Security بس.

الاستثناءات محتاجة أدمن حتى عشان تتقري، عشان برنامج خبيث شغال كيوزر عادي ميعرفش يستخبى فين. ومع Dev Drive، Defender بيفحص بعد ما الملف يتفتح بدل ما يوقف البرنامج لحد ما يخلص، فالفرق في السرعة كبير والحماية لسه موجودة.

[[MpCmdRun.exe]] في [[C:\Program Files\Windows Defender]] هو أداة CMD لنفس الحاجات، وبتلاقيها في شروحات قديمة.`,
            when: R`فحص دوري سريع، أو قبل ما تشغّل ملف نزّلته، أو لما البيلد بطيء وعايز تقرر في الاستثناءات، أو لما تشك إن الحماية اتقفلت.`,
            mistakes: R`تستثني [[C:\]] أو فولدر الـ Downloads كله «عشان السرعة». أو تقفل الحماية الفورية للتجربة وتنسى. أو تفتكر إن الفحص اليدوي بيغني عن الحماية الفورية. أو تستغرب إن [[(Get-MpPreference).ExclusionPath]] بيقول «Must be an administrator» (ده مقصود). أو تشغّل Start-MpScan في سكربت من غير ما تعرف إنه بيستنى لحد ما الفحص يخلص.`
          },
          teach: R`## الفكرة: الحالة، وبعدين تحديث وفحص واستثناء

الأوامر كلها بتبدأ بـ [[Mp]] (من Malware Protection): [[Get-Mp...]] بتقرا، و [[Update-Mp...]] و [[Start-Mp...]] و [[Add-Mp...]] بتعمل حاجة. جربت سطور القراية على PowerShell 7.6 من غير أدمن، ومحدّثتش ولا فحصت ولا استثنيت حاجة (دول من Terminal أدمن، والناتج من التوثيق).

---

## ١. الحالة

~~~powershell
Get-MpComputerStatus | Select-Object AMRunningMode, RealTimeProtectionEnabled, AntivirusSignatureLastUpdated, QuickScanAge, IsTamperProtected
~~~

[[Get-MpComputerStatus]] بيرجّع object فيه 59 خاصية؛ اخترنا ٥ منهم:

~~~text الناتج
AMRunningMode                 : Normal
RealTimeProtectionEnabled     : True
AntivirusSignatureLastUpdated : 10/5/2026 1:27:49 PM
QuickScanAge                  : 0
IsTamperProtected             : False
~~~

| الخاصية | معناها | هنا |
|---|---|---|
| [[AMRunningMode]] | AM = AntiMalware. [[Normal]] هو الأنتي فيرس الأساسي، و [[Passive Mode]] فيه أنتي فيرس تاني | شغال |
| [[RealTimeProtectionEnabled]] | بيفحص أي ملف بيتفتح أو بيتكتب | شغال |
| [[AntivirusSignatureLastUpdated]] | آخر تحديث للتعريفات (أوصاف البرامج الخبيثة) | امبارح |
| [[QuickScanAge]] | أيام من آخر فحص سريع | 0 = النهارده أو امبارح بالليل |
| [[IsTamperProtected]] | الحماية من إن برنامج يقفل Defender | **مقفولة**، والأحسن تشغّلها من Windows Security |

---

## ٢. حدّث وافحص (أدمن)

~~~powershell
Update-MpSignature
Start-MpScan -ScanType QuickScan
Start-MpScan -ScanType CustomScan -ScanPath "$HOME\Downloads"
~~~

- [[Update-MpSignature]] يحمّل أحدث تعريفات دلوقتي بدل ما يستنى.
- [[-ScanType QuickScan]] فحص سريع للأماكن اللي البرامج الخبيثة بتستخبى فيها (الذاكرة، والـ startup، وفولدرات النظام)، مش الديسك كله.
- [[-ScanType CustomScan -ScanPath]] فولدر واحد بس. و [[$HOME]] فولدر اليوزر بتاعك، فـ [["$HOME\Downloads"]] فولدر التنزيلات.

الأوامر دي بتستنى لحد ما الفحص يخلص (ممكن دقايق)، ولو خلص من غير مشاكل مش بيطبع حاجة.

---

## ٣. اللي اتمسك قبل كده

~~~powershell
Get-MpThreatDetection | Select-Object InitialDetectionTime, ThreatID, Resources
~~~

| الخاصية | معناها |
|---|---|
| [[InitialDetectionTime]] | إمتى اتمسك |
| [[ThreatID]] | رقم التهديد |
| [[Resources]] | الملفات، وكل واحد قبله [[file:_]] |

على الجهاز ده طلع حدث واحد من امبارح على ملف [[.exe]] في Downloads (مش هعرض المسار). ولو عايز اسم التهديد من الرقم:

~~~powershell
Get-MpThreatCatalog -ThreatID 2147745913 | Select-Object ThreatName, SeverityID
~~~

بيرجّع الاسم (زي [[Trojan:...]] أو [[HackTool:...]]، الجزء الأول نوعه) و [[SeverityID]] الخطورة (هنا [[4]]، يعني High. والتوثيق بيعدّها 1 Low و 2 Moderate و 4 High و 5 Severe).

---

## ٤. الاستثناءات

~~~powershell
Add-MpPreference -ExclusionPath "D:\projects"
(Get-MpPreference).ExclusionPath
~~~

- [[Add-MpPreference -ExclusionPath]] يزوّد فولدر لستة «متفحصش هنا» (أدمن). [[Add]] يعني يزوّد على اللستة، و [[Set-MpPreference]] كان هيمسح اللستة ويحط الجديد بس.
- [[Get-MpPreference]] كل إعدادات Defender، والأقواس والنقطة بتاخد منه [[ExclusionPath]].

من غير أدمن:

~~~text الناتج
N/A: Must be an administrator to view exclusions
~~~

ده مقصود: لو برنامج خبيث شغال كيوزر عادي، ميعرفش يقرا الاستثناءات ويستخبى فيها.

---

## ٥. ليه شغال في PowerShell 7؟

موديول Defender ([[ConfigDefender]]) معمول لـ 5.1. لما تكتب الأمر في 7، PowerShell بيفتح 5.1 في الخلفية ويشغّله هناك ويرجّعلك النتيجة. اتأكدت:

~~~text الناتج
(Get-Module ConfigDefender).Path  →  C:\Users\...\AppData\Local\Temp\remoteIpMoProxy_ConfigDefender_1.0_localhost_...psm1
Get-PSSession                     →  WinPSCompatSession  localhost
~~~

الموديول «proxy» في TEMP، والجلسة [[WinPSCompatSession]] هي 5.1 اللي في الخلفية.

---

## الخلاصة

| عايز | الأمر | أدمن؟ |
|---|---|---|
| الحالة | [[Get-MpComputerStatus]] | لأ |
| تحديث | [[Update-MpSignature]] | أيوه |
| فحص سريع / فولدر | [[Start-MpScan -ScanType QuickScan]] / [[CustomScan -ScanPath]] | أيوه |
| اللي اتمسك | [[Get-MpThreatDetection]] | لأ |
| استثناء | [[Add-MpPreference -ExclusionPath]] | أيوه |
| الاستثناءات الحالية | [[(Get-MpPreference).ExclusionPath]] | أيوه |

واستثني فولدر المشاريع بالظبط بس، ولو تقدر استخدم Dev Drive بدل الاستثناء.`,
          lines: [
            "الحالة: الوضع، والحماية الفورية، وآخر تحديث، وأيام من آخر فحص، و Tamper Protection.",
            "حدّث التعريفات دلوقتي (أدمن).",
            "فحص سريع (دقايق، والأمر بيستنى لحد ما يخلص).",
            "افحص فولدر معين.",
            "اللي Defender مسكه قبل كده.",
            "استثني فولدر المشاريع من الفحص (أدمن، وفكّر قبلها).",
            "الاستثناءات الحالية (بتظهر لأدمن بس)."
          ],
          sol: R`جربت العرض بس على PowerShell 7.6 من غير أدمن. [[Get-MpComputerStatus]] طلع [[AMRunningMode : Normal]] و [[RealTimeProtectionEnabled : True]] و [[AntivirusSignatureLastUpdated]] بتاريخ النهارده الصبح، و [[QuickScanAge : 0]] (فيه quick scan اتعمل امبارح بالليل لوحده)، و [[IsTamperProtected : False]]. يعني Tamper Protection مقفول على الجهاز ده، والأحسن تشغّله من Windows Security.

[[Get-MpThreatDetection]] مطلّعش حاجة (مفيش حاجة اتمسكت). و [[(Get-MpPreference).ExclusionPath]] من غير أدمن طلع [[N/A: Must be an administrator to view exclusions]]. و [[Get-Module ConfigDefender]] بعد ما الأمر اشتغل طلع مساره جوه TEMP في فولدر اسمه بيبدأ بـ [[remoteIpMoProxy_ConfigDefender]]، و [[Get-PSSession]] طلع [[WinPSCompatSession]]، يعني فعلًا بيشتغل عن طريق 5.1. (محدّثتش ولا فحصت ولا استثنيت حاجة وأنا بكتب الدرس.)`
        },
        {
          cmd: "Checkpoint-Computer",
          title: "نقطة استرجاع قبل أي تغيير خطير",
          desc: R`نقطة الاسترجاع (restore point) صورة من ملفات النظام والـ registry والدرايفرات في لحظة معينة. لو عملت واحدة قبل تغيير خطير (درايفر، برنامج بيعدّل في النظام، registry، سكربت من النت) والجهاز باظ بعدها، ترجّع النظام للنقطة دي. ملفاتك الشخصية مش بتتلمس، لا بتتحفظ ولا بترجع، فدي مش backup.

[[Enable-ComputerRestore -Drive "C:\"]] بيشغّل System Protection على ديسك ويندوز (على أجهزة كتير بيبقى مقفول من الأول). و [[Checkpoint-Computer -Description]] بيعمل نقطة باسم يفهّمك اتعملت ليه، و [[-RestorePointType]] نوعها: الافتراضي [[APPLICATION_INSTALL]]، وفيه [[MODIFY_SETTINGS]] و [[DEVICE_DRIVER_INSTALL]] و [[APPLICATION_UNINSTALL]]. و [[Get-ComputerRestorePoint]] بيعرض النقط اللي موجودة بالوقت والوصف والرقم. و [[rstrui]] بيفتح شاشة System Restore اللي بترجّع منها.

حد اليوم: الأوامر دي مش بتعمل أكتر من نقطة كل 24 ساعة. لو فيه نقطة اتعملت من أقل من 24 ساعة، بيطلع [[A new system restore point cannot be created because one has already been created within the past 24 hours.]] ومش بيعمل حاجة. الحد ده بيتحكم فيه قيمة [[SystemRestorePointCreationFrequency]] (DWORD بالدقايق) في [[HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion\SystemRestore]]: 0 يعني مفيش حد، ولو القيمة مش موجودة يبقى 24 ساعة. والسطر الأخير بيقراها.

النسخة: الأوامر دي جزء من Windows PowerShell 5.1، ومش جوه PowerShell 7 نفسه. لكن 7 على ويندوز بيشغّلها عن طريق 5.1 في الخلفية لوحده (Windows compatibility): جربت [[Get-Command Checkpoint-Computer]] في 7.6 ولقيته جاي من موديول بيتعمل في TEMP، والجلسة [[WinPSCompatSession]]. ولو عايز تضمن، شغّلها من 5.1 مباشرة: [[powershell -NoProfile -Command "..."]] (السطر الرابع، والنص جوه علامات تنصيص مفردة جوه المزدوجة). والكل محتاج Terminal أدمن، والنقط موجودة في ويندوز 10 و 11 بس (مش Server).`,
          example: R`Enable-ComputerRestore -Drive "C:\"
Checkpoint-Computer -Description "Before GPU driver update" -RestorePointType MODIFY_SETTINGS
Get-ComputerRestorePoint
powershell -NoProfile -Command "Checkpoint-Computer -Description 'Before registry tweak'"
rstrui
Get-ItemProperty "HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion\SystemRestore" -Name SystemRestorePointCreationFrequency -ErrorAction SilentlyContinue`,
          try: R`من Terminal أدمن: اعرض النقط الموجودة، ولو مفيش، شغّل System Protection واعمل نقطة باسم واضح قبل ما تسطّب الدرايفر أو البرنامج الجاي.`,
          flag: "danger",
          deep: {
            why: R`تحديث درايفر كارت الشاشة خلى الشاشة سودا، أو برنامج «تنضيف» عبث في الـ registry، أو سكربت tweaks من النت بوّظ حاجة. من غير نقطة استرجاع الحل غالبًا Reset أو تسطيب من جديد. مع نقطة، ترجع في ربع ساعة.`,
            how: R`النقطة بتحفظ ملفات النظام (System32 والدرايفرات والبرامج المتسطبة) والـ registry باستخدام Volume Shadow Copy، ومش بتلمس Documents ولا Desktop ولا Downloads. الرجوع بيلغي البرامج والدرايفرات اللي اتسطبت بعدها، ويرجّع اللي اتمسح من النوع ده.

System Protection بياخد نسبة من الديسك للنقط (بتظبطها من System Properties ← System Protection ← Configure)، ولما تتملى بيمسح الأقدم. وويندوز نفسه بيعمل نقط لوحده قبل تحديثات معينة وتسطيب درايفرات، بس مش دايمًا.

لو ويندوز مش بيفتح خالص، [[rstrui]] مش هيفيد. ساعتها من شاشة الاسترجاع (Advanced startup ← Troubleshoot ← Advanced options ← System Restore)، وبتوصلها لو ويندوز فشل يبوّت كذا مرة، أو من [[shutdown /r /o]] (درس «shutdown /s /t»).

قيمة [[SystemRestorePointCreationFrequency]] بتتغير بـ [[Set-ItemProperty]] (أدمن)، وبرامج و scripts كتير بتحطها 0 أو رقم صغير. ده مفيد لو بتعمل نقط كتير في يوم تجارب، بس كتر النقط بيمسح القديم أسرع.`,
            when: R`قبل أي درايفر، أو برنامج بيعدّل في النظام، أو تعديل registry، أو سكربت إعدادات من النت، أو تجارب على إعدادات النظام.`,
            mistakes: R`تفتكرها backup لملفاتك. أو تعمل نقطة وتلاقيها مش موجودة لأن System Protection مقفول أصلًا. أو تعمل نقطتين ورا بعض في نفس اليوم والتانية متتعملش (حد الـ 24 ساعة). أو تشغّلها من Terminal عادي فيطلع Access denied. أو تعتمد عليها لو الديسك نفسه باظ أو اتشفّر من ransomware (النقط على نفس الديسك).`
          },
          teach: R`## الفكرة: شغّل الخاصية، اعمل نقطة، واعرف ترجع إزاي

نقطة الاسترجاع صورة من ملفات النظام والـ registry. المثال: تشغّل System Protection، تعمل نقطة، تعرض النقط، وتفتح شاشة الرجوع، وتقرا حد «نقطة كل 24 ساعة». كله Terminal أدمن ما عدا السطر الأخير. جربت القراية بس على PowerShell 7.6 و 5.1 من غير أدمن، ومعملتش نقطة.

---

## ١. شغّل System Protection

~~~powershell
Enable-ComputerRestore -Drive "C:\"
~~~

[[-Drive "C:\"]] الديسك اللي ويندوز عليه. على أجهزة كتير الخاصية دي مقفولة من المصنع، ومن غيرها [[Checkpoint-Computer]] مش هيعمل حاجة. ولاحظ [[\]] بعد [[C:]]: التوثيق بيطلب الحرف ونقطتين و backslash.

---

## ٢. اعمل نقطة

~~~powershell
Checkpoint-Computer -Description "Before GPU driver update" -RestorePointType MODIFY_SETTINGS
~~~

| الحتة | معناها |
|---|---|
| [[Checkpoint]] | نقطة تفتيش، يعني «احفظ الحالة دي» |
| [[-Description]] | اسم يفكّرك اتعملت ليه. اكتبه واضح |
| [[-RestorePointType]] | نوعها: [[APPLICATION_INSTALL]] (الافتراضي)، [[APPLICATION_UNINSTALL]]، [[DEVICE_DRIVER_INSTALL]]، [[MODIFY_SETTINGS]] |

النوع بيظهر جنب النقطة في القايمة بس، ومش بيغيّر إيه اللي بيتحفظ. ولو نجح الأمر مش بيطبع حاجة (حسب التوثيق).

---

## ٣. النقط الموجودة

~~~powershell
Get-ComputerRestorePoint
~~~

بيعرض كل نقطة بالوقت والوصف والرقم ([[SequenceNumber]]). من غير أدمن في النسختين:

~~~text الناتج
Access denied
~~~

---

## ٤. نفس الأمر من 5.1 مباشرة

~~~powershell
powershell -NoProfile -Command "Checkpoint-Computer -Description 'Before registry tweak'"
~~~

الأوامر دي جزء من Windows PowerShell 5.1، و 7 بيشغّلها عن طريق 5.1 في الخلفية. اتأكدت في 7.6:

~~~text الناتج
(Get-Command Checkpoint-Computer).CommandType  →  Function
.Module.Path                                   →  C:\Users\...\Temp\remoteIpMoProxy_MicrosoftPowerShellManagement_3.1.0.0_localhost_...psm1
~~~

في 7 هو [[Function]] (غلاف بيبعت لـ 5.1)، وفي 5.1 نفسه [[Cmdlet]] حقيقي. السطر الرابع بيتخطى الوسيط:

- [[powershell]] من غير [[w]] في الآخر هو 5.1 ([[pwsh]] هو 7).
- [[-NoProfile]] من غير ما يحمّل ملف الإعدادات بتاعك (أسرع وأنضف).
- [[-Command "..."]] نفّذ ده واقفل.
- النص جوه [[' ']] لأن الأمر كله جوه [[" "]]. لو استخدمت [[" "]] جوه [[" "]] الأمر هيتقطع.

---

## ٥. الرجوع

~~~powershell
rstrui
~~~

[[rstrui]] (Restore UI) بيفتح شاشة System Restore، وتختار منها النقطة. ده برنامج بواجهة، فمشغّلتهوش هنا.

---

## ٦. حد الـ 24 ساعة

~~~powershell
Get-ItemProperty "HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion\SystemRestore" -Name SystemRestorePointCreationFrequency -ErrorAction SilentlyContinue
~~~

- [[Get-ItemProperty]] بيقرا قيمة من الـ registry، و [[HKLM:\...]] مفتاح إعدادات System Restore للجهاز كله.
- [[-Name SystemRestorePointCreationFrequency]] القيمة اللي بتحدد أقل وقت بين نقطتين، **بالدقايق**.
- [[-ErrorAction SilentlyContinue]] لأن القيمة غالبًا مش موجودة، ومن غيره هيطلع error أحمر.

| القيمة | المعنى |
|---|---|
| مش موجودة (الأمر مطلّعش حاجة) | الافتراضي: نقطة واحدة كل 24 ساعة |
| [[0]] | من غير حد |
| أي رقم | دقايق |

على الجهاز ده:

~~~text الناتج
SystemRestorePointCreationFrequency
-----------------------------------
                                  1
~~~

يعني حد أو برنامج غيّرها لدقيقة واحدة. ولو القيمة مش موجودة وعملت نقطتين في يوم، التانية مش بتتعمل وبيطلع تحذير إن فيه نقطة اتعملت خلال 24 ساعة (حسب التوثيق).

---

## الخلاصة

| الخطوة | الأمر |
|---|---|
| شغّل الخاصية | [[Enable-ComputerRestore -Drive "C:\"]] |
| اعمل نقطة | [[Checkpoint-Computer -Description "..."]] |
| اعرض | [[Get-ComputerRestorePoint]] |
| ارجع | [[rstrui]] |
| الحد | [[SystemRestorePointCreationFrequency]] بالدقايق |

ونقطة الاسترجاع للنظام بس، مش backup لملفاتك.`,
          lines: [
            "شغّل System Protection على ديسك C (أدمن).",
            "اعمل نقطة باسم واضح، ونوعها تعديل إعدادات (أدمن).",
            "النقط الموجودة بالوقت والوصف والرقم (أدمن).",
            "نفس الحاجة من Windows PowerShell 5.1 مباشرة، لو عايز تضمن.",
            "افتح شاشة System Restore عشان ترجع لنقطة.",
            "حد النقط بالدقايق (مش موجودة = 24 ساعة، و 0 = من غير حد)."
          ],
          sol: R`جربت القراية بس من غير أدمن. [[Get-ComputerRestorePoint]] في 7.6 وفي 5.1 الاتنين طلعوا [[Access denied]]، يعني حتى عرض النقط محتاج أدمن. و [[Get-Command Checkpoint-Computer]] في 7.6 طلع [[Function]] من موديول [[Microsoft.PowerShell.Management]] بس مساره في TEMP في فولدر اسمه بيبدأ بـ [[remoteIpMoProxy_MicrosoftPowerShellManagement]]، و [[Get-PSSession]] طلع [[WinPSCompatSession]]، يعني 7 بيشغّله فعلًا عن طريق 5.1.

وقراية الـ registry (مش محتاجة أدمن) طلعت [[SystemRestorePointCreationFrequency : 1]]، يعني على الجهاز ده حد أو برنامج غيّر الحد لدقيقة واحدة بدل 24 ساعة. (معملتش نقطة ولا شغّلت System Protection وأنا بكتب الدرس.) حسب التوثيق Checkpoint-Computer مش بيطبع حاجة لو نجح، فاتأكد بـ [[Get-ComputerRestorePoint]].`
        },
        {
          cmd: "Win32_StartupCommand",
          title: "إيه اللي بيشتغل مع ويندوز؟",
          desc: R`كل برنامج بيقوم لوحده مع ويندوز بياخد وقت في الـ boot ورام طول اليوم. [[Get-CimInstance Win32_StartupCommand]] بيلم البرامج دي من أشهر مكانين: مفاتيح [[Run]] في الـ registry وفولدرات Startup. والمثال كمان بيقرا مفتاح Run بنفسه، وفولدر Startup، والمهام المجدولة اللي بتشتغل عند الدخول. كله قراية بس ومن غير أدمن.

أعمدة Win32_StartupCommand: [[Name]] الاسم، و [[Command]] الأمر اللي بيتشغّل، و [[Location]] جاي منين: [[Startup]] الفولدر، أو مفتاح [[Run]] تحت [[HKU\...]] لليوزر ده، أو تحت [[HKLM\...]] لكل اليوزرز، و [[User]] لمين ([[Public]] يعني الكل).

[[HKCU:\Software\Microsoft\Windows\CurrentVersion\Run]] مفتاح الـ registry لليوزر الحالي، و [[Get-ItemProperty]] بيقرا القيم اللي فيه: كل قيمة اسم البرنامج وجنبها الأمر، و [[Select-Object * -ExcludeProperty PS*]] بيشيل الخصائص اللي PowerShell بيزوّدها زي [[PSPath]]. و [[[Environment]::GetFolderPath("Startup")]] مسار فولدر Startup بتاعك، نفس اللي بيفتحه [[shell:startup]] (درس «shell:startup» في تاب «اختصارات النظام»). و [[Get-ScheduledTask]] مع الفلتر بيدوّر على المهام المتشغّلة اللي trigger بتاعها [[MSFT_TaskLogonTrigger]] (عند الدخول)، من غير مهام ويندوز اللي تحت [[\Microsoft\]] (درس Register-ScheduledTask). و [[-and]] يعني الشروط التلاتة لازم يتحققوا.

القفل بأمان: من Task Manager ← Startup apps، أو Settings ← Apps ← Startup. ده بيعلّم البرنامج Disabled من غير ما يمسح حاجة، فتقدر ترجّعه. متمسحش قيم من مفتاح Run بإيدك غير لو عارف هي بتاعة إيه. وخلي بالك: Win32_StartupCommand بيعرض البرامج حتى لو انت قافلها من Task Manager، لأن القفل بيتسجّل في مكان تاني (الـ solCode بيقراه). كله شغال في 5.1 و 7.`,
          example: R`Get-CimInstance Win32_StartupCommand | Select-Object Name, Location, User
Get-ItemProperty "HKCU:\Software\Microsoft\Windows\CurrentVersion\Run" | Select-Object * -ExcludeProperty PS*
Get-ChildItem ([Environment]::GetFolderPath("Startup"))
Get-ScheduledTask | Where-Object { $_.State -ne "Disabled" -and $_.TaskPath -notlike "\Microsoft\*" -and $_.Triggers.CimClass.CimClassName -contains "MSFT_TaskLogonTrigger" } | Select-Object TaskName, TaskPath, State`,
          try: R`اعرف كام برنامج بيقوم مع ويندوز عندك، وأنهي واحد منهم انت مش محتاجه، واقفله من Task Manager ← Startup apps. وبعدين شغّل الـ solCode وشوف علامة Disabled.`,
          deep: {
            why: R`الجهاز بياخد دقايق بعد الدخول لحد ما يبقى سريع، أو الرام مليانة من غير ما تفتح حاجة، أو أيقونات كتير جنب الساعة. أغلب البرامج بتحط نفسها في الـ startup وقت التسطيب من غير ما تسأل. والأوامر دي بتوريك القايمة كاملة، بما فيها المهام المجدولة اللي Task Manager مش بيعرضها في Startup apps.`,
            how: R`أماكن الـ startup كتير، وأشهرها: مفتاح Run لليوزر (HKCU) ولكل اليوزرز (HKLM)، و RunOnce (مرة واحدة)، وفولدر Startup لليوزر ولكل اليوزرز، والمهام المجدولة بـ trigger عند الدخول أو عند التشغيل، والخدمات اللي StartupType بتاعها Automatic (درس Get-Service). أداة Autoruns من Sysinternals بتعرض كل الأماكن دي لو عايز الصورة الكاملة.

Task Manager لما بيقفل برنامج من Startup apps بيكتب علامة في [[HKCU:\Software\Microsoft\Windows\CurrentVersion\Explorer\StartupApproved\Run]]: قيمة باسم البرنامج أول بايت فيها 2 لو شغال و 3 لو متقفل (ده اللي لاحظته، ومش موثّق رسمي). الـ solCode بيقرا البايت ده: [[% 2]] باقي القسمة على 2، فـ 3 يدّي 1 (Disabled) و 2 يدّي 0.

المهام المجدولة اللي في المثال ممكن تبقى updaters (Google وغيرها) أو برامج الشركة المصنّعة للجهاز. اقفلها بـ [[Disable-ScheduledTask]] لو متأكد، مش بالمسح.`,
            when: R`الجهاز بطيء بعد الدخول، أو بعد ما تسطّب برامج كتير، أو بتراجع جهاز حد تاني، أو بتدوّر على برنامج غريب بيقوم لوحده.`,
            mistakes: R`تمسح قيم من الـ registry بدل ما تقفل من Task Manager. أو تقفل حاجات بتاعة الكارت الصوت أو التاتش باد أو الأنتي فيرس ([[SecurityHealth]] ده Windows Security نفسه). أو تفتكر إن Win32_StartupCommand بيعرض الحالة: بيعرض البرامج المتسجلة حتى المقفولة. أو تنسى المهام المجدولة والخدمات.`
          },
          teach: R`## الفكرة: نلف على أماكن الـ startup واحد واحد

مفيش مكان واحد فيه «البرامج اللي بتقوم مع ويندوز». المثال بيلف على ٤: قايمة جاهزة من CIM، ومفتاح Run في الـ registry، وفولدر Startup، والمهام المجدولة. والـ solCode بيقولك مين منهم انت قافله. كله قراية من غير أدمن، واتشغّل على PowerShell 7.6 على لابتوبي.

---

## ١. القايمة الجاهزة

~~~powershell
Get-CimInstance Win32_StartupCommand | Select-Object Name, Location, User
~~~

[[Win32_StartupCommand]] كلاس في CIM بيجمع مفاتيح Run وفولدرات Startup في قايمة واحدة. طلع 14 برنامج، ودي عينة:

~~~text الناتج (مختصر)
Name             Location                                                    User
----             --------                                                    ----
DeepL auto-start Startup                                                     PC\me
Discord          HKU\S-1-5-21-...-1001\SOFTWARE\Microsoft\Windows\CurrentVersion\Run  PC\me
Docker Desktop   HKU\S-1-5-21-...-1001\SOFTWARE\Microsoft\Windows\CurrentVersion\Run  PC\me
SecurityHealth   HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Run          Public
~~~

| [[Location]] | معناه |
|---|---|
| [[Startup]] | فولدر Startup |
| [[HKU\S-1-5-21-...\...\Run]] | مفتاح Run بتاع يوزر معيّن. [[HKU]] = كل اليوزرز، والرقم الطويل (SID) بيحدد مين |
| [[HKLM\...\Run]] | مفتاح Run للجهاز كله، فـ [[User]] بيبقى [[Public]] |

و [[SecurityHealth]] ده Windows Security نفسه، متقفلهوش.

---

## ٢. مفتاح Run بتاعك بنفسك

~~~powershell
Get-ItemProperty "HKCU:\Software\Microsoft\Windows\CurrentVersion\Run" | Select-Object * -ExcludeProperty PS*
~~~

- [[HKCU:]] (HKEY_CURRENT_USER) إعدادات اليوزر الحالي. ده نفس الـ [[HKU\S-1-5-21-...]] اللي فوق، بس من غير ما تعرف الـ SID.
- [[Get-ItemProperty]] بيقرا القيم اللي جوه المفتاح: كل قيمة **اسمها** اسم البرنامج و**قيمتها** الأمر اللي بيتشغّل.
- PowerShell بيزوّد ٥ خصائص من عنده: [[PSPath]] و [[PSParentPath]] و [[PSChildName]] و [[PSDrive]] و [[PSProvider]]. و [[Select-Object * -ExcludeProperty PS*]] يعني «كله ما عدا اللي بيبدأ بـ PS».

~~~text الناتج (مختصر)
Discord        : "C:\Users\me\AppData\Local\Discord\Update.exe" --processStart Discord.exe
IDMan          : C:\Program Files (x86)\Internet Download Manager\IDMan.exe /onboot
Docker Desktop : C:\Program Files\Docker\Docker\Docker Desktop.exe
~~~

هنا بتشوف **الأمر** نفسه، فتعرف البرنامج ده فين وبيقوم بإيه (زي [[--processStart]] و [[/onboot]]).

---

## ٣. فولدر Startup

~~~powershell
Get-ChildItem ([Environment]::GetFolderPath("Startup"))
~~~

[[[Environment]::GetFolderPath("Startup")]] بيسأل ويندوز عن مسار فولدر Startup بتاعك (بيختلف من يوزر لتاني ومن لغة لتانية). والأقواس بتحسب المسار الأول وبعدين [[Get-ChildItem]] يعرض اللي جواه.

~~~text الناتج
C:\Users\me\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup   (المسار)
DeepL auto-start.lnk                                                        (اللي جواه)
~~~

أي اختصار ([[.lnk]]) هنا بيتفتح مع الدخول.

---

## ٤. المهام المجدولة اللي بتقوم عند الدخول

~~~powershell
Get-ScheduledTask | Where-Object { $_.State -ne "Disabled" -and $_.TaskPath -notlike "\Microsoft\*" -and $_.Triggers.CimClass.CimClassName -contains "MSFT_TaskLogonTrigger" } | Select-Object TaskName, TaskPath, State
~~~

[[Get-ScheduledTask]] كل المهام، والفلتر جوه [[{ }]] فيه ٣ شروط، و [[-and]] يعني لازم التلاتة:

| الشرط | معناه |
|---|---|
| [[$_.State -ne "Disabled"]] | المهمة مش متقفلة |
| [[$_.TaskPath -notlike "\Microsoft\*"]] | مش من مهام ويندوز (كلها تحت فولدر [[\Microsoft\]]) |
| [[$_.Triggers.CimClass.CimClassName -contains "MSFT_TaskLogonTrigger"]] | واحد من الـ triggers بتاعها «عند الدخول» |

الشرط التالت محتاج تفكيك: [[Triggers]] لستة «إمتى تشتغل»، وكل trigger ليه نوع اسمه في [[.CimClass.CimClassName]]. عدّيت الأنواع على الجهاز ده:

~~~text الناتج (مختصر)
Count Name
   40 MSFT_TaskLogonTrigger      عند الدخول
   16 MSFT_TaskBootTrigger       عند تشغيل الجهاز
   20 MSFT_TaskDailyTrigger      كل يوم
   19 MSFT_TaskTimeTrigger       مرة في وقت معيّن
~~~

و [[-contains]] بيسأل «اللستة فيها العنصر ده؟». الناتج 14 مهمة مش بتاعة ويندوز، منها:

~~~text الناتج (أول 3)
TaskName             TaskPath   State
--------             --------   -----
iTopVPN_Scheduler_me \        Running
iTopVPN_Update_me    \          Ready
KaptureServer        \          Ready
~~~

ودول مش بيظهروا في Task Manager ← Startup apps خالص.

---

## ٥. الـ solCode: مين انت قافله؟

~~~powershell
$approved = Get-ItemProperty "HKCU:\Software\Microsoft\Windows\CurrentVersion\Explorer\StartupApproved\Run"
$approved.PSObject.Properties | Where-Object Name -notlike "PS*" | ForEach-Object { [pscustomobject]@{ Name = $_.Name; Disabled = [bool]($_.Value[0] % 2) } }
~~~

لما تقفل برنامج من Task Manager، ويندوز مش بيمسحه من Run، بيكتب علامة في مفتاح تاني اسمه [[StartupApproved\Run]].

| الحتة | معناها |
|---|---|
| [[$approved.PSObject.Properties]] | كل القيم اللي في المفتاح كلستة، كل واحدة ليها [[Name]] و [[Value]] |
| [[Where-Object Name -notlike "PS*"]] | من غير خصائص PowerShell |
| [[$_.Value[0]]] | القيمة bytes، وده أول بايت |
| [[% 2]] | باقي القسمة على 2 |
| [[[bool]( )]] | حوّل لـ True أو False: 1 → True، و 0 → False |
| [[[pscustomobject]@{ ... }]] | اعمل object بخاصيتين يطلع كسطر في جدول |

اللي لاحظته (ومش موثّق رسمي): أول بايت [[2]] يعني شغال، و [[3]] يعني متقفل. و 3 % 2 = 1، و 2 % 2 = 0:

~~~text الناتج (مختصر)
Name                                 Disabled
----                                 --------
Docker Desktop                           True
Discord                                  True
IDMan                                   False
~~~

يعني Docker و Discord **ظاهرين** في [[Win32_StartupCommand]] بس فعلًا متقفلين. القايمة الأولى «المتسجّل»، مش «اللي بيشتغل».

---

## الخلاصة

| المكان | الأمر |
|---|---|
| Run + Startup مع بعض | [[Get-CimInstance Win32_StartupCommand]] |
| مفتاح Run بالأوامر | [[Get-ItemProperty "HKCU:\...\Run"]] |
| فولدر Startup | [[[Environment]::GetFolderPath("Startup")]] |
| مهام عند الدخول | [[Get-ScheduledTask]] + [[MSFT_TaskLogonTrigger]] |
| متقفل ولا لأ | [[StartupApproved\Run]] (الـ solCode) |

والقفل من Task Manager ← Startup apps، مش بمسح قيم من الـ registry.`,
          lines: [
            "البرامج اللي بتقوم مع ويندوز، وجاية منين، ولمين.",
            "اقرا مفتاح Run بتاع يوزرك بنفسك: اسم البرنامج والأمر.",
            "فولدر Startup بتاعك (shell:startup).",
            "المهام المجدولة المتشغّلة اللي بتقوم عند الدخول، من غير مهام ويندوز."
          ],
          sol: R`جربتها على لابتوبي. [[Win32_StartupCommand]] طلع 14 برنامج: [[DeepL auto-start]] من [[Startup]] (الفولدر)، وحاجات زي [[Discord]] و [[Docker Desktop]] و [[Grammarly]] و [[IDMan]] و [[GoogleChromeAutoLaunch_...]] من مفتاح Run بتاع اليوزر، و [[SecurityHealth]] و [[PenTablet]] من [[HKLM]] ولـ [[Public]]. وفولدر Startup كان فيه [[DeepL auto-start.lnk]] بس.

المفاجأة في الـ solCode: [[Docker Desktop]] و [[Discord]] و [[GoogleChromeAutoLaunch_...]] و [[AMDNoiseSuppression]] طلعوا [[Disabled True]] لأني قافلهم من Task Manager، ومع ذلك Win32_StartupCommand عرضهم عادي. يعني القايمة الأولى «المتسجّل» مش «اللي بيشتغل فعلًا». والمهام المجدولة اللي بتقوم عند الدخول طلعت 14 مهمة مش بتاعة ويندوز، منها updaters وأدوات الشركة المصنّعة (ASUS) و PowerToys، ودول مش ظاهرين في Startup apps خالص.`,
          solCode: R`$approved = Get-ItemProperty "HKCU:\Software\Microsoft\Windows\CurrentVersion\Explorer\StartupApproved\Run"
$approved.PSObject.Properties | Where-Object Name -notlike "PS*" | ForEach-Object { [pscustomobject]@{ Name = $_.Name; Disabled = [bool]($_.Value[0] % 2) } }`
        },
        {
          cmd: "Get-PnpDevice",
          title: "الأجهزة اللي فيها مشكلة والدرايفرات",
          desc: R`[[Get-PnpDevice]] بيعرض كل الأجهزة اللي ويندوز شايفها، نفس قايمة Device Manager: كروت الشبكة والصوت والكاميرا والـ USB والبلوتوث. و [[-Status ERROR]] الأجهزة اللي فيها مشكلة بس، يعني اللي عليها علامة تعجب صفرا أو سهم لتحت في Device Manager.

[[-PresentOnly]] الأجهزة المتوصلة دلوقتي بس (من غيره بيعرض كمان أجهزة اتوصلت قبل كده واتشالت)، و [[Group-Object Status]] بيعدّ الأجهزة حسب الحالة ([[OK]] و [[Error]] و [[Degraded]] و [[Unknown]]). و [[-Class Net]] نوع معين (وفيه [[Camera]] و [[Media]] و [[USB]] و [[Bluetooth]] و [[Display]]). و [[InstanceId]] الاسم الثابت للجهاز (زي [[USB\VID_046D&PID_0825\...]])، ده اللي بتستخدمه في باقي الأوامر.

[[Get-PnpDeviceProperty -InstanceId -KeyName]] بيجيب معلومة معينة: [[DEVPKEY_Device_DriverVersion]] نسخة الدرايفر، و [[DEVPKEY_Device_DriverProvider]] مين عامله، و [[DEVPKEY_Device_DriverDate]] تاريخه. و [[(Get-NetAdapter -Name "Wi-Fi").PnPDeviceID]] بيجيب الـ InstanceId بتاع كارت الواي فاي من درس Get-NetAdapter. و [[Win32_PnPEntity]] مع [[ConfigManagerErrorCode]] بيقولك سبب المشكلة، نفس «Device status» في Device Manager: 22 يعني متقفل بإيدك، و 28 يعني مفيش درايفر، و 10 الجهاز مش راضي يشتغل.

[[Disable-PnpDevice]] بيقفل الجهاز (زي Disable في Device Manager) و [[Enable-PnpDevice]] بيرجّعه، و [[-Confirm:$false]] من غير سؤال، والاتنين محتاجين Terminal أدمن. خطر: قفل كارت الشبكة أو الكيبورد أو الماوس أو كارت الشاشة ممكن يسيبك من غير نت أو من غير طريقة تكتب بيها، فانسخ الـ InstanceId صح واتأكد من الاسم.

الموديول [[PnpDevice]] جاي مع ويندوز وشغال في 5.1 و 7، والعرض من غير أدمن. ونسخ الدرايفرات (backup) وتسطيبها من CMD في درس «pnputil و driverquery» في تاب «CMD»، و Device Manager في درس «devmgmt.msc» في تاب «اختصارات النظام».`,
          example: R`Get-PnpDevice -PresentOnly | Group-Object Status | Select-Object Name, Count
Get-PnpDevice -Status ERROR | Select-Object Status, Class, FriendlyName, InstanceId
Get-PnpDevice -Class Net -PresentOnly | Select-Object Status, FriendlyName
Get-PnpDeviceProperty -InstanceId (Get-NetAdapter -Name "Wi-Fi").PnPDeviceID -KeyName DEVPKEY_Device_DriverVersion, DEVPKEY_Device_DriverProvider, DEVPKEY_Device_DriverDate | Select-Object KeyName, Data
Get-CimInstance Win32_PnPEntity -Filter "ConfigManagerErrorCode <> 0" | Select-Object Name, ConfigManagerErrorCode
Disable-PnpDevice -InstanceId "USB\VID_046D&PID_0825\12345678" -Confirm:$false
Enable-PnpDevice -InstanceId "USB\VID_046D&PID_0825\12345678" -Confirm:$false`,
          try: R`اعرف عندك كام جهاز فيه مشكلة وإيه سببها، ونسخة درايفر كارت الواي فاي وتاريخها.`,
          flag: "danger",
          deep: {
            why: R`الصوت اختفى، أو الكاميرا مش شغالة في الميتنج، أو البلوتوث مش ظاهر، أو بعد تسطيب ويندوز جديد فيه أجهزة من غير درايفر. بدل ما تفتح Device Manager وتدوّر على علامة صفرا، سطر واحد بيقولك مين وليه، وتقدر تجمعه من كذا جهاز.`,
            how: R`[[Status]] بيلخّص [[ConfigManagerErrorCode]]: أي كود غير صفر بيطلع Error. عشان كده جهاز انت قافله بإيدك (كود 22) بيظهر في [[-Status ERROR]] زيه زي جهاز بايظ (شوف الـ sol). فبص على الكود قبل ما تقلق.

[[Disable-PnpDevice]] ثم [[Enable-PnpDevice]] بيعملوا «إعادة تشغيل» للجهاز، وده بيحل مشاكل كتير في الكاميرا والبلوتوث والـ USB من غير restart للجهاز كله.

[[Get-PnpDevice]] من غير [[-PresentOnly]] بيعرض أجهزة «ghost»: فلاشات اتوصلت مرة، وكروت شبكة VPN قديمة. وجودها عادي، وتنضيفها من Device Manager ← View ← Show hidden devices.

في 7.6 [[ConfigManagerErrorCode]] بيظهر بالاسم زي [[CM_PROB_DISABLED]]، وفي 5.1 بيظهر رقم زي 22، والاتنين نفس المعنى.`,
            when: R`جهاز مش شغال، أو بعد تسطيب ويندوز أو تحديث كبير، أو قبل ما تحدّث درايفر (تعرف نسختك الحالية)، أو تعمل restart لكاميرا أو بلوتوث معلّق.`,
            mistakes: R`تقفل كارت الشبكة وانت داخل من بعيد، أو الكيبورد وانت معندكش غيره. أو تقلق من كل Error وهي أجهزة انت قافلها. أو تنسخ InstanceId ناقص (فيه [[\]] و [[&]] لازم بالظبط وبين علامات تنصيص). أو تدوّر من غير [[-PresentOnly]] فتلاقي أجهزة قديمة وتفتكرها موجودة.`
          },
          teach: R`## الفكرة: Device Manager في سطور

**PnP** اختصار Plug and Play: أي جهاز ويندوز بيتعرّف عليه ويحمّله درايفر لوحده. [[Get-PnpDevice]] بيعرض كل الأجهزة دي. المثال: عدّ حسب الحالة، وبعدين اللي فيها مشكلة، وبعدين نوع معيّن، والدرايفر، وسبب المشكلة، وآخر سطرين بيقفلوا ويفتحوا جهاز. جربت أول ٥ سطور على PowerShell 7.6 من غير أدمن، ومقفلتش أي جهاز.

---

## ١. كام جهاز في كل حالة

~~~powershell
Get-PnpDevice -PresentOnly | Group-Object Status | Select-Object Name, Count
~~~

- [[-PresentOnly]] المتوصل دلوقتي بس. من غيره عندي 288 جهاز، لأنه بيعرض كمان أجهزة اتوصلت مرة واتشالت (فلاشات، وكروت VPN قديمة).
- [[Group-Object Status]] بيجمّع حسب [[Status]] ويعدّ كل مجموعة.

~~~text الناتج
Name     Count
----     -----
Degraded     1
Error        1
OK         244
~~~

| [[Status]] | معناه |
|---|---|
| [[OK]] | شغال |
| [[Error]] | فيه مشكلة (علامة صفرا أو سهم لتحت في Device Manager) |
| [[Degraded]] | شغال بس مش بكامل قدرته |
| [[Unknown]] | ويندوز مش عارف حالته |

---

## ٢. اللي فيه مشكلة

~~~powershell
Get-PnpDevice -Status ERROR | Select-Object Status, Class, FriendlyName, InstanceId
~~~

~~~text الناتج
Status       : Error
Class        : Camera
FriendlyName : Iriun Webcam
InstanceId   : ROOT\DEVGEN\{D246C079-D974-9541-B014-3D6608C24BC6}
~~~

| الخاصية | معناها |
|---|---|
| [[Class]] | النوع: [[Camera]] و [[Net]] و [[Media]] و [[USB]] و [[Bluetooth]] و [[Display]] ... |
| [[FriendlyName]] | الاسم اللي بيظهر في Device Manager |
| [[InstanceId]] | الاسم الثابت للجهاز. ده اللي باقي الأوامر بتاخده |

---

## ٣. نوع واحد بس

~~~powershell
Get-PnpDevice -Class Net -PresentOnly | Select-Object Status, FriendlyName
~~~

[[-Class Net]] كروت الشبكة. طلعوا 17، والحقيقيين منهم ٢ بس:

~~~text الناتج (أول 4)
Status FriendlyName
------ ------------
OK     Realtek PCIe GbE Family Controller
OK     WAN Miniport (PPPOE)
OK     Hyper-V Virtual Switch Extension Adapter
OK     HotspotShield TAP-Windows Adapter V9
~~~

الباقي كروت افتراضية: WAN Miniport (ويندوز بيستخدمها للـ VPN والـ dial-up)، و Hyper-V (بتاع WSL و Docker)، و TAP (برامج VPN).

---

## ٤. نسخة درايفر الواي فاي

~~~powershell
Get-PnpDeviceProperty -InstanceId (Get-NetAdapter -Name "Wi-Fi").PnPDeviceID -KeyName DEVPKEY_Device_DriverVersion, DEVPKEY_Device_DriverProvider, DEVPKEY_Device_DriverDate | Select-Object KeyName, Data
~~~

من جوه لبرة:

### [[(Get-NetAdapter -Name "Wi-Fi").PnPDeviceID]]

[[Get-NetAdapter]] بيجيب الكارت باسمه في إعدادات الشبكة، و [[.PnPDeviceID]] هو نفسه الـ InstanceId:

~~~text الناتج
PCI\VEN_8086&DEV_2723&SUBSYS_00848086&REV_1A\4&120d21cb&0&0012
~~~

[[PCI]] متركّب على اللوحة الأم، و [[VEN_8086]] رقم الشركة (8086 = Intel)، و [[DEV_2723]] رقم الموديل.

### [[Get-PnpDeviceProperty -InstanceId ... -KeyName ...]]

بيجيب خصائص الجهاز. كل خاصية ليها اسم بيبدأ بـ [[DEVPKEY_]] (Device Property Key)، وبنطلب ٣:

~~~text الناتج
KeyName                       Data
-------                       ----
DEVPKEY_Device_DriverVersion  23.130.1.1
DEVPKEY_Device_DriverProvider Intel
DEVPKEY_Device_DriverDate     4/7/2025 2:00:00 AM
~~~

نسخة الدرايفر، ومين عامله، وتاريخه. قارنها بآخر نسخة على موقع الشركة قبل ما تحدّث.

---

## ٥. سبب المشكلة

~~~powershell
Get-CimInstance Win32_PnPEntity -Filter "ConfigManagerErrorCode <> 0" | Select-Object Name, ConfigManagerErrorCode
~~~

[[Win32_PnPEntity]] نفس الأجهزة من CIM، وفيه [[ConfigManagerErrorCode]]: كود المشكلة اللي Device Manager بيكتبه في «Device status». و [[-Filter "... <> 0"]] فلتر بلغة WQL (شبه SQL)، و [[<>]] يعني «لا يساوي»، فبيجيب اللي عنده كود غير صفر بس.

~~~text الناتج في 7.6
Name         ConfigManagerErrorCode
----         ----------------------
Iriun Webcam       CM_PROB_DISABLED
~~~

~~~text الناتج في 5.1
Name         ConfigManagerErrorCode
----         ----------------------
Iriun Webcam                     22
~~~

نفس المعلومة: 7 بيكتب اسم الكود، و 5.1 الرقم. و 22 معناه **أنا قافله بإيدي**، مش بايظ. أشهر الأكواد:

| الكود | معناه |
|---|---|
| 22 | متقفل (Disabled) |
| 28 | مفيش درايفر |
| 10 | الجهاز مش راضي يشتغل |

---

## ٦. اقفل وافتح جهاز (أدمن)

~~~powershell
Disable-PnpDevice -InstanceId "USB\VID_046D&PID_0825\12345678" -Confirm:$false
Enable-PnpDevice -InstanceId "USB\VID_046D&PID_0825\12345678" -Confirm:$false
~~~

الـ InstanceId هنا مثال لكاميرا USB: [[VID]] رقم الشركة و [[PID]] رقم المنتج. حط بتاعك من السطر التاني **بين علامات تنصيص**، لأن فيه [[&]] و [[\]]. و [[-Confirm:$false]] من غير سؤال. الاتنين ورا بعض = «restart» للجهاز ده بس. وخلي بالك من كارت الشبكة والكيبورد والماوس.

---

## الخلاصة

| عايز | الأمر |
|---|---|
| ملخص الحالات | [[Get-PnpDevice -PresentOnly | Group-Object Status]] |
| اللي فيه مشكلة | [[Get-PnpDevice -Status ERROR]] |
| نوع معيّن | [[-Class Net]] |
| الدرايفر | [[Get-PnpDeviceProperty -KeyName DEVPKEY_Device_DriverVersion]] |
| السبب | [[Win32_PnPEntity]] ← [[ConfigManagerErrorCode]] |
| restart لجهاز | [[Disable-PnpDevice]] ثم [[Enable-PnpDevice]] |

و [[Error]] مش دايمًا عطل: بص على الكود الأول.`,
          lines: [
            "كام جهاز في كل حالة (المتوصل بس).",
            "الأجهزة اللي فيها مشكلة، ونوعها، واسمها، والـ InstanceId.",
            "كروت الشبكة بس.",
            "نسخة درايفر الواي فاي ومين عامله وتاريخه، عن طريق الـ PnPDeviceID من Get-NetAdapter.",
            "سبب المشكلة لكل جهاز فيه مشكلة.",
            "اقفل جهاز بالـ InstanceId بتاعه (أدمن، ده مثال).",
            "رجّعه."
          ],
          sol: R`جربت العرض على لابتوبي من غير أدمن. العد طلع [[OK 246]] و [[Error 1]] و [[Degraded 1]]. الـ Error كان [[Camera  Iriun Webcam]] (برنامج بيخلي الموبايل webcam)، و [[Win32_PnPEntity]] قال السبب [[CM_PROB_DISABLED]]، يعني أنا قافله، مش بايظ. والـ Degraded كان [[AMDRyzenMaster Device]].

وكروت الشبكة طلعت 17 كلهم [[OK]]: الحقيقيين ([[Intel(R) Wi-Fi 6 AX200 160MHz]] و [[Realtek PCIe GbE Family Controller]]) ومعاهم كروت افتراضية كتير ([[WAN Miniport]] و TAP بتوع VPN و [[Microsoft Wi-Fi Direct Virtual Adapter]]). ودرايفر الواي فاي طلع [[DriverVersion 23.130.1.1]] و [[DriverProvider Intel]] و [[DriverDate 4/7/2025]]. (مقفلتش أي جهاز وأنا بكتب الدرس.)`,
          solCode: R`Get-PnpDevice -Status ERROR | Select-Object Class, FriendlyName
Get-CimInstance Win32_PnPEntity -Filter "ConfigManagerErrorCode <> 0" | Select-Object Name, ConfigManagerErrorCode
Get-PnpDeviceProperty -InstanceId (Get-NetAdapter -Name "Wi-Fi").PnPDeviceID -KeyName DEVPKEY_Device_DriverVersion, DEVPKEY_Device_DriverDate | Select-Object KeyName, Data`
        },
        {
          cmd: "Get-Counter",
          title: "استهلاك المعالج والرام والديسك لايف",
          desc: R`[[Get-Counter]] بيقرا «performance counters»: أرقام ويندوز بيحدّثها باستمرار عن المعالج والرام والديسك والشبكة، نفس اللي Task Manager بيرسمها. وبيه تعرف «مين واكل المعالج» من الترمنال، أو تسجّل الاستهلاك كل ثانية.

اسم الـ counter مسار: [[\Processor(_Total)\% Processor Time]] يعني الكائن [[Processor]]، والـ instance [[_Total]] (كل الـ cores مع بعض)، والرقم [[% Processor Time]] نسبة الاستخدام. و [[\Memory\Available MBytes]] الرام الفاضية بالميجا، و [[\Memory\% Committed Bytes In Use]] نسبة الرام المحجوزة، و [[\PhysicalDisk(_Total)\% Disk Time]] قد إيه الديسك مشغول. و [[-SampleInterval 1]] كل ثانية، و [[-MaxSamples 5]] خمس قراءات وخلاص، و [[-Continuous]] لحد ما تدوس Ctrl+C.

الناتج فيه [[CounterSamples]]، وكل sample فيه [[Path]] و [[CookedValue]] (الرقم النهائي)، و [[[math]::Round(x, 1)]] بيقرّبه. و [[\Process(*)\% Processor Time]] كل عملية لوحدها ([[*]] كل الـ instances)، والرقم ده محسوب على core واحد، فعملية واخدة 2 cores كاملين تطلع 200. القسمة على [[[Environment]::ProcessorCount]] (عدد الـ cores المنطقية) بتحوّله لنسبة من الجهاز كله زي Task Manager. و [[-notin "_total", "idle"]] بيشيل السطرين دول لأنهم مش عمليات. و [[-ErrorAction SilentlyContinue]] لأن عملية بتقفل وقت القراية بتطلّع error.

[[Get-Process | Sort-Object CPU -Descending]] (درس Get-Process / Stop-Process) شبهه بس مختلف: [[CPU]] هناك إجمالي ثواني المعالج من ساعة ما البرنامج اشتغل، فبرنامج فاتح من أسبوع هيطلع فوق حتى لو نايم دلوقتي. الـ counter بيقولك مين بياكل دلوقتي.

أسامي الـ counters بتتترجم: على ويندوز بلغة تانية [[\Processor(_Total)\% Processor Time]] بيطلع [[The specified counter could not be found]]. البديل اللي مش بيتترجم: [[Get-CimInstance Win32_PerfFormattedData_PerfOS_Processor]] (السطر الأخير). و [[Get-Counter]] شغال في 5.1 و 7 على ويندوز ومن غير أدمن، و [[Get-Counter -ListSet Processor]] بيعرض الـ counters اللي في كائن معين.`,
          example: R`Get-Counter "\Processor(_Total)\% Processor Time" -SampleInterval 1 -MaxSamples 5
(Get-Counter "\Processor(_Total)\% Processor Time", "\Memory\Available MBytes", "\Memory\% Committed Bytes In Use", "\PhysicalDisk(_Total)\% Disk Time").CounterSamples | Select-Object Path, @{ n = "Value"; e = { [math]::Round($_.CookedValue, 1) } }
(Get-Counter "\Process(*)\% Processor Time" -ErrorAction SilentlyContinue).CounterSamples | Where-Object InstanceName -notin "_total", "idle" | Sort-Object CookedValue -Descending | Select-Object -First 5 InstanceName, @{ n = "CPU%"; e = { [math]::Round($_.CookedValue / [Environment]::ProcessorCount, 1) } }
Get-Process | Sort-Object CPU -Descending | Select-Object -First 5 Name, Id, CPU
Get-Counter "\Memory\Available MBytes" -Continuous
Get-CimInstance Win32_PerfFormattedData_PerfOS_Processor -Filter "Name='_Total'" | Select-Object PercentProcessorTime`,
          try: R`افتح حاجة تقيلة (build أو فيديو في المتصفح)، وشغّل السطر التالت، وقارن الأسامي بالسطر الرابع.`,
          deep: {
            why: R`المروحة شغالة على الآخر والجهاز بطيء، وعايز تعرف مين السبب من غير ما تفتح Task Manager، أو عايز تسجّل الاستهلاك وقت build أو test عشان تقارن قبل وبعد تعديل، أو سكربت يحذّرك لو الرام قربت تخلص.`,
            how: R`الـ % Processor Time محتاج قرايتين: [[Get-Counter]] بياخد قراية، ويستنى [[SampleInterval]] (افتراضي ثانية)، وياخد التانية، ويحسب الفرق. عشان كده أول قراية بتاخد ثانية، والرقم متوسط الثانية دي مش لحظة.

[[InstanceName]] في [[\Process(*)]] اسم العملية من غير .exe وبحروف صغيرة، ولو فيه أكتر من نسخة (chrome مثلًا) كلهم بيطلعوا [[chrome]]، والفرق في الـ [[Path]] بس ([[process(chrome#36)]] و [[process(chrome#35)]])، فممكن تجمعهم بـ [[Group-Object InstanceName]]. وعشان تربطه بـ PID: [[\Process(*)\ID Process]].

لتسجيل طويل: [[Get-Counter ... -SampleInterval 5 -MaxSamples 720 | Export-Counter -Path cpu.blg]] بيسجّل ساعة في ملف تفتحه في Performance Monitor ([[perfmon]])، أو حوّل لـ CSV بـ [[Export-Csv]] (درس Export-Csv / ConvertTo-Json).

[[MsMpEng]] اللي بيظهر كتير وقت الـ builds هو Defender بيفحص الملفات اللي بتتكتب (درس Get-MpComputerStatus).`,
            when: R`الجهاز بطيء فجأة، أو مقارنة أداء قبل وبعد، أو مراقبة سيرفر ويندوز، أو سكربت تنبيه لو الرام الفاضية قلّت عن حد.`,
            mistakes: R`تفتكر عمود [[CPU]] في Get-Process نسبة مئوية. أو تنسى القسمة على عدد الـ cores فتلاقي 400%. أو تكتب أسامي counters إنجليزي على ويندوز مترجم. أو تستخدم [[-Continuous]] في سكربت من غير ما تعرف إنه مش هيخلص لوحده. أو تتجاهل error «The data in one of the performance counter samples is not valid» وهو مجرد عملية قفلت وقت القراية.`
          },
          teach: R`## الفكرة: نقرا نفس الأرقام اللي Task Manager بيرسمها

ويندوز بيحدّث آلاف الأرقام عن الجهاز باستمرار، اسمها **performance counters**. [[Get-Counter]] بيقراها بالاسم. السطور: المعالج كل ثانية، وكذا رقم مرة واحدة، وأكتر العمليات أكل للمعالج، والمقارنة بـ Get-Process، والرام لايف، وبديل مش بيتترجم. اتشغّلوا على PowerShell 7.6 على لابتوب بـ 16 logical processor (السطر الخامس بيفضل شغال لحد Ctrl+C، فمشغّلتهوش في التجربة).

---

## ١. اسم الـ counter مسار

~~~text
\Processor(_Total)\% Processor Time
~~~

| الحتة | معناها |
|---|---|
| [[Processor]] | الكائن: المعالج |
| [[(_Total)]] | أنهي واحد: [[_Total]] كل الـ cores مع بعض (أو [[(0)]] أول core) |
| [[% Processor Time]] | الرقم: نسبة الوقت اللي المعالج كان شغال فيه |

---

## ٢. المعالج كل ثانية

~~~powershell
Get-Counter "\Processor(_Total)\% Processor Time" -SampleInterval 1 -MaxSamples 5
~~~

[[-SampleInterval 1]] قراية كل ثانية، و [[-MaxSamples 5]] خمس قرايات وخلاص. شغّلته بـ 3 بدل 5:

~~~text الناتج
Timestamp                 CounterSamples
---------                 --------------
10/6/2026 10:08:43 AM     \\pc\processor(_total)\% processor time :
                          0.3481758981721983

10/6/2026 10:08:44 AM     \\pc\processor(_total)\% processor time :
                          20.79990440651418

10/6/2026 10:08:45 AM     \\pc\processor(_total)\% processor time :
                          35.41230141454713
~~~

[[\\pc]] في الأول اسم الجهاز (الـ counter ممكن يتقري من جهاز تاني). والرقم **متوسط الثانية** اللي فاتت، مش لحظة: النسبة دي محتاجة قرايتين والفرق بينهم.

---

## ٣. كذا رقم مرة واحدة، مقرّبين

~~~powershell
(Get-Counter "\Processor(_Total)\% Processor Time", "\Memory\Available MBytes", "\Memory\% Committed Bytes In Use", "\PhysicalDisk(_Total)\% Disk Time").CounterSamples | Select-Object Path, @{ n = "Value"; e = { [math]::Round($_.CookedValue, 1) } }
~~~

- الفواصل بين الأسامي: اقرا الأربعة في نفس اللحظة.
- [[( ).CounterSamples]] الناتج فيه لستة **samples**، واحد لكل counter.
- كل sample فيه [[Path]] (الاسم) و [[CookedValue]] (الرقم «المطبوخ» الجاهز، بعد الحساب).
- العمود المحسوب بيقرّب لرقم عشري واحد بـ [[[math]::Round(x, 1)]].

~~~text الناتج
Path                                          Value
----                                          -----
\\pc\processor(_total)\% processor time       35.60
\\pc\memory\available mbytes                9922.00
\\pc\memory\% committed bytes in use          71.30
\\pc\physicaldisk(_total)\% disk time          0.20
~~~

| الـ counter | معناه | هنا |
|---|---|---|
| [[Available MBytes]] | الرام الفاضية بالميجا | حوالي 9.7 جيجا |
| [[% Committed Bytes In Use]] | نسبة الذاكرة المحجوزة من الحد (الرام + الـ pagefile) | 71% |
| [[% Disk Time]] | قد إيه الديسك كان مشغول | تقريبًا فاضي |

---

## ٤. مين بياكل المعالج دلوقتي

~~~powershell
(Get-Counter "\Process(*)\% Processor Time" -ErrorAction SilentlyContinue).CounterSamples | Where-Object InstanceName -notin "_total", "idle" | Sort-Object CookedValue -Descending | Select-Object -First 5 InstanceName, @{ n = "CPU%"; e = { [math]::Round($_.CookedValue / [Environment]::ProcessorCount, 1) } }
~~~

خطوة خطوة:

| الحتة | معناها |
|---|---|
| [[\Process(*)\% Processor Time]] | الكائن [[Process]] و [[(*)]] كل العمليات |
| [[-ErrorAction SilentlyContinue]] | عملية بتقفل وقت القراية بتطلّع error، فتجاهله |
| [[Where-Object InstanceName -notin "_total", "idle"]] | شيل سطرين مش عمليات: الإجمالي، و Idle (وقت المعالج الفاضي) |
| [[Sort-Object CookedValue -Descending]] | الأكبر الأول |
| [[Select-Object -First 5]] | أول 5 |

### ليه القسمة على [[[Environment]::ProcessorCount]]؟

الرقم هنا محسوب على **core واحد**: عملية واخدة 2 cores كاملين تطلع 200. جربت قبل القسمة:

~~~text الناتج
[Environment]::ProcessorCount   →  16
_total                          →  1602.09
idle                            →  1416.30
~~~

الإجمالي حوالي 1600 = 16 core × 100. فالقسمة على 16 بترجّع الرقم لنسبة من الجهاز كله زي Task Manager:

~~~text الناتج
InstanceName CookedValue CPU%
------------ ----------- ----
code               60.92 3.80
pwsh               44.16 2.80
code               28.94 1.80
chrome             24.37 1.50
chrome             16.75 1.00
~~~

لاحظ [[code]] و [[chrome]] متكررين: كل نسخة عملية لوحدها. الـ [[InstanceName]] نفس الاسم، والفرق في الـ [[Path]] زي [[process(chrome#36)]].

---

## ٥. الفرق عن [[Get-Process]]

~~~powershell
Get-Process | Sort-Object CPU -Descending | Select-Object -First 5 Name, Id, CPU
~~~

~~~text الناتج
Name      Id    CPU
----      --    ---
chrome 32856 419.31
Code   22444 294.78
chrome  7924 245.31
~~~

عمود [[CPU]] هنا **ثواني** المعالج من ساعة ما العملية اشتغلت، مش نسبة. فبرنامج فاتح من الصبح هيطلع فوق حتى لو نايم دلوقتي. السطر ٤ هو اللي بيقول «دلوقتي».

---

## ٦. لايف، وبديل مش بيتترجم

~~~powershell
Get-Counter "\Memory\Available MBytes" -Continuous
Get-CimInstance Win32_PerfFormattedData_PerfOS_Processor -Filter "Name='_Total'" | Select-Object PercentProcessorTime
~~~

[[-Continuous]] قراية كل ثانية لحد ما تدوس Ctrl+C.

وأسامي الـ counters بتتترجم مع لغة ويندوز، فالسطر الأخير بيقرا نفس الرقم من CIM باسم ثابت: [[Win32_PerfFormattedData_PerfOS_Processor]] (الـ counters الجاهزة بتاعة المعالج)، و [[-Filter "Name='_Total'"]] الإجمالي.

~~~text الناتج
PercentProcessorTime
--------------------
                  16
~~~

---

## الخلاصة

| عايز | السطر |
|---|---|
| المعالج كل ثانية | [[Get-Counter "...\% Processor Time" -SampleInterval 1 -MaxSamples 5]] |
| كذا رقم مقرّب | [[.CounterSamples]] + [[CookedValue]] |
| مين بياكل دلوقتي | [[\Process(*)\% Processor Time]] ÷ [[ProcessorCount]] |
| مين اشتغل كتير | [[Get-Process]] (ثواني مش نسبة) |
| لايف | [[-Continuous]] |
| ويندوز مش إنجليزي | [[Win32_PerfFormattedData_PerfOS_Processor]] |`,
          lines: [
            "نسبة استخدام المعالج كل ثانية، 5 مرات.",
            "المعالج والرام الفاضية ونسبة الرام المحجوزة وانشغال الديسك، مقرّبين لرقم واحد بعد العلامة.",
            "أكتر 5 عمليات بتاكل معالج دلوقتي، كنسبة من الجهاز كله.",
            "أكتر 5 في إجمالي ثواني المعالج من ساعة ما اشتغلوا (مش دلوقتي).",
            "الرام الفاضية كل ثانية لحد Ctrl+C.",
            "نسبة المعالج من CIM، ودي مش بتتترجم."
          ],
          sol: R`جربتهم على لابتوب بـ 16 core منطقي. السطر الأول طلع 3 قرايات وأنا بشغّله ([[57.88]] و [[37.45]] و [[36.20]] تقريبًا) بالشكل [[\\pc\processor(_total)\% processor time :]] وتحته الرقم. والتاني طلع [[% processor time 18.8]] و [[available mbytes 8707]] و [[% committed bytes in use 72.3]] و [[% disk time 0.4]].

والتالت طلع [[msmpeng 18.3]] (Defender) و [[discord 9.2]] وأدوات تانية بنسب أقل، ومعاه طلع error [[The data in one of the performance counter samples is not valid]] قبل ما أزوّد [[-ErrorAction SilentlyContinue]]. أما [[Get-Process | Sort-Object CPU]] فطلع [[chrome]] و [[Code]] و [[audiodg]] فوق، بأرقام زي [[940]] ثانية: دول اللي اشتغلوا كتير من الصبح، مش اللي بياكلوا دلوقتي. والسطر الأخير طلع [[PercentProcessorTime 65]] (قراية لحظة تانية).`
        },
        {
          cmd: "Get-WinEvent",
          title: "ليه الجهاز عمل restart أو قفل لوحده؟",
          desc: R`ويندوز بيسجّل كل حاجة مهمة في Event Log: مين قفل الجهاز وإمتى، والانقطاع المفاجئ، وأخطاء الدرايفرات والخدمات. [[Get-WinEvent]] بيقرا السجلات دي من الترمنال، ودي أول حاجة تبص فيها لو الجهاز قفل أو عمل restart لوحده بالليل.

[[-FilterHashtable @{ ... }]] الفلتر: [[LogName = "System"]] سجل النظام (فيه الـ shutdown والدرايفرات والخدمات)، و [[Id = 1074, 41, 6008]] أرقام الأحداث: [[1074]] برنامج أو يوزر طلب shutdown أو restart (والرسالة بتقول مين وليه، منها Windows Update)، و [[41]] (من Kernel-Power) الجهاز قام من غير ما يتقفل صح: فصل كهربا، أو علّق، أو زرار الباور، و [[6008]] نفس الحكاية بصياغة تانية. و [[-MaxEvents 10]] آخر 10 (الأحدث الأول)، و [[TimeCreated]] الوقت، و [[ProviderName]] مين سجّله.

[[(...).Message]] نص الحدث كامل. و [[Level = 1, 2]] الأخطاء بس (1 Critical و 2 Error، و 3 Warning)، و [[StartTime = (Get-Date).AddDays(-1)]] من امبارح لحد دلوقتي، و [[Group-Object ProviderName]] بيعدّ الأخطاء حسب مصدرها، فتعرف أنهي درايفر أو خدمة عامل مشاكل. و [[-ErrorAction SilentlyContinue]] لأن لو مفيش أحداث بالفلتر ده [[Get-WinEvent]] بيطلع error بدل نتيجة فاضية.

سجلات [[System]] و [[Application]] بتتقري من غير أدمن، لكن [[Security]] (الدخول والخروج) محتاج Terminal أدمن (السطر الأخير). و [[Get-WinEvent]] شغال في 5.1 و 7 على ويندوز. و [[Get-EventLog]] القديم مش جزء من PowerShell 7 نفسه: 7 بيشغّله عن طريق 5.1 في الخلفية (Windows compatibility، الجلسة [[WinPSCompatSession]])، فبيشتغل بس أبطأ وعلى ويندوز بس، فلو لقيته في شرح قديم استخدم [[Get-WinEvent]]. والشكل بالماوس في درس «eventvwr.msc» في تاب «اختصارات النظام».`,
          example: R`Get-WinEvent -FilterHashtable @{ LogName = "System"; Id = 1074, 41, 6008 } -MaxEvents 10 | Select-Object TimeCreated, Id, ProviderName
(Get-WinEvent -FilterHashtable @{ LogName = "System"; Id = 1074 } -MaxEvents 1).Message
(Get-WinEvent -FilterHashtable @{ LogName = "System"; Id = 41 } -MaxEvents 1).Message
Get-WinEvent -FilterHashtable @{ LogName = "System"; Level = 1, 2; StartTime = (Get-Date).AddDays(-1) } -ErrorAction SilentlyContinue | Group-Object ProviderName | Sort-Object Count -Descending | Select-Object Count, Name
Get-WinEvent -LogName Security -MaxEvents 5`,
          try: R`اعرف آخر مرة جهازك اتقفل وليه (1074)، وآخر مرة قفل فجأة (41)، وإيه أكتر حاجة بتطلّع أخطاء من امبارح.`,
          deep: {
            why: R`صحيت لقيت الجهاز عامل restart والشغل اللي كان مفتوح راح، أو الجهاز بيقفل فجأة كل كام يوم، أو برنامج بيقع ومش عارف ليه. Event Log فيه الإجابة غالبًا، بس Event Viewer تقيل وصعب تدوّر فيه، والفلتر بالأرقام بيوصلك في ثانية.`,
            how: R`[[-FilterHashtable]] بيبعت الفلتر لخدمة الـ Event Log نفسها، فبترجع الأحداث المطلوبة بس، وده أسرع بكتير من [[Get-WinEvent -LogName System | Where-Object Id -eq 41]] اللي بيقرا السجل كله (عشرات الآلاف من الأحداث) وبعدين يفلتر.

سجل System له حجم محدود (عندي 20 ميجا فيهم حوالي 34 ألف حدث)، ولما يتملى القديم بيتمسح، فأحداث من شهور ممكن متلاقيهاش.

أحداث مفيدة تانية: [[6005]] و [[6006]] (خدمة الـ Event Log بدأت ووقفت، يعني الجهاز قام واتقفل)، و [[19]] و [[20]] من WindowsUpdateClient (تحديث نجح أو فشل)، و [[7036]] خدمة بدأت أو وقفت. و [[-ListLog *]] بيعرض كل السجلات، وفيه سجلات تفصيلية كتير تحت [[Microsoft-Windows-*]].`,
            when: R`restart أو shutdown مش مفهوم، أو شاشة زرقا، أو جهاز بيهنّج، أو درايفر بيعمل مشاكل، أو تتأكد إن تحديث اتسطب.`,
            mistakes: R`تقرا السجل كله وتفلتر بـ [[Where-Object]] فالأمر ياخد دقايق. أو تفتكر إن «No events were found» error حقيقي (معناه مفيش أحداث بالفلتر ده). أو تقلق من كل Error في السجل: ويندوز بيسجّل أخطاء كتير عادية. أو تحاول تقرا Security من غير أدمن. أو تكتب سكربت جديد بـ [[Get-EventLog]] (قديم، وفي 7 بيشتغل عن طريق 5.1 في الخلفية بس).`
          },
          teach: R`## الفكرة: السجل فيه الإجابة، والفلتر بيوصّلك ليها

ويندوز بيكتب كل حدث مهم في **Event Log**، وكل حدث ليه رقم ([[Id]]). فبدل ما تقرا عشرات الآلاف من السطور، بتطلب أرقام معيّنة. اتشغّلوا على PowerShell 7.6 من غير أدمن على لابتوبي (غيّرت اسم الجهاز).

---

## ١. آخر shutdown أو قفل مفاجئ

~~~powershell
Get-WinEvent -FilterHashtable @{ LogName = "System"; Id = 1074, 41, 6008 } -MaxEvents 10 | Select-Object TimeCreated, Id, ProviderName
~~~

### [[-FilterHashtable @{ ... }]]

الفلتر hashtable: [[@{ }]] فيها «اسم = قيمة»، و [[;]] بتفصل:

| المفتاح | معناه |
|---|---|
| [[LogName = "System"]] | سجل النظام (الـ shutdown والدرايفرات والخدمات) |
| [[Id = 1074, 41, 6008]] | أي حدث من الأرقام دي |

| الرقم | معناه |
|---|---|
| [[1074]] | حد طلب shutdown أو restart: يوزر، أو برنامج، أو Windows Update |
| [[41]] | الجهاز قام من غير ما يتقفل صح: كهربا، أو تعليق، أو زرار الباور |
| [[6008]] | نفس فكرة 41، من مصدر تاني |

### [[-MaxEvents 10]]

آخر 10، والأحدث الأول.

~~~text الناتج (أول 3)
TimeCreated             Id ProviderName
-----------             -- ------------
10/6/2026 2:54:01 AM  1074 User32
10/6/2026 2:53:05 AM  1074 User32
10/5/2026 11:16:06 PM 1074 User32
~~~

[[TimeCreated]] إمتى، و [[ProviderName]] مين كتب الحدث. كلهم [[1074]]، يعني كل القفل الأخير كان مطلوب.

---

## ٢. مين وليه

~~~powershell
(Get-WinEvent -FilterHashtable @{ LogName = "System"; Id = 1074 } -MaxEvents 1).Message
~~~

[[-MaxEvents 1]] أحدث واحد، والأقواس والنقطة بتاخد [[.Message]] (النص الكامل):

~~~text الناتج
The process C:\WINDOWS\system32\winlogon.exe (PC) has initiated the shutdown of computer PC on behalf of user NT AUTHORITY\SYSTEM for the following reason: No title for this reason could be found
 Reason Code: 0x500ff
 Shutdown Type: shutdown
 Comment:
~~~

اقراها كده: **مين** ([[winlogon.exe]]، برنامج الدخول بتاع ويندوز)، **بالنيابة عن مين** ([[NT AUTHORITY\SYSTEM]] = ويندوز نفسه، مش يوزر)، و**نوعه** ([[shutdown]] أو [[restart]] أو [[power off]]). ولو Windows Update هو اللي عمل restart هتلاقي اسمه هنا.

---

## ٣. آخر قفل مفاجئ

~~~powershell
(Get-WinEvent -FilterHashtable @{ LogName = "System"; Id = 41 } -MaxEvents 1).Message
~~~

نفس الشكل برقم 41. آخره عندي كان من كذا شهر من [[Microsoft-Windows-Kernel-Power]]:

~~~text الناتج
The system has rebooted without cleanly shutting down first. This error could be caused if the system stopped responding, crashed, or lost power unexpectedly.
~~~

يعني الجهاز اتقفل من غير ما ويندوز يعرف. لو بيتكرر، بص على الحرارة والكهربا والدرايفرات.

---

## ٤. الأخطاء من امبارح، مين أكتر واحد

~~~powershell
Get-WinEvent -FilterHashtable @{ LogName = "System"; Level = 1, 2; StartTime = (Get-Date).AddDays(-1) } -ErrorAction SilentlyContinue | Group-Object ProviderName | Sort-Object Count -Descending | Select-Object Count, Name
~~~

| الحتة | معناها |
|---|---|
| [[Level = 1, 2]] | 1 Critical و 2 Error (و 3 Warning، و 4 Information) |
| [[StartTime = (Get-Date).AddDays(-1)]] | من دلوقتي ناقص يوم: [[Get-Date]] الوقت الحالي، و [[.AddDays(-1)]] يرجع يوم |
| [[-ErrorAction SilentlyContinue]] | لو مفيش ولا حدث، [[Get-WinEvent]] بيطلع error بدل نتيجة فاضية |
| [[Group-Object ProviderName]] | جمّع حسب المصدر وعدّ |
| [[Sort-Object Count -Descending]] | الأكتر الأول |

~~~text الناتج
Count Name
----- ----
    4 Service Control Manager
    2 Microsoft-Windows-DistributedCOM
    2 Microsoft-Windows-WindowsUpdateClient
    1 Microsoft-Windows-Bits-Client
    1 Microsoft-Windows-NDIS
~~~

[[Service Control Manager]] بيسجّل الخدمات اللي فشلت تقوم، و [[NDIS]] كارت الشبكة. أعداد صغيرة زي دي عادية في أي ويندوز.

وده الـ error اللي [[-ErrorAction]] بيخبيه، جربته برقم مش موجود:

~~~text الناتج
No events were found that match the specified selection criteria.
~~~

---

## ٥. سجل الأمان

~~~powershell
Get-WinEvent -LogName Security -MaxEvents 5
~~~

[[Security]] فيه الدخول والخروج ومحاولات الباسورد الغلط، فمحمي. من غير أدمن:

~~~text الناتج
Attempted to perform an unauthorized operation.
~~~

---

## ٦. ليه الفلتر مش [[Where-Object]]؟

[[-FilterHashtable]] بيبعت الفلتر لخدمة الـ Event Log نفسها، فبترجّع المطلوب بس. [[Where-Object]] بعد [[Get-WinEvent -LogName System]] كان هيقرا السجل كله الأول، وسجل System عندي:

~~~text الناتج (Get-WinEvent -ListLog System)
MaximumSizeInBytes : 20971520
RecordCount        : 34305
~~~

20 ميجا و 34 ألف حدث. ولما يتملى، القديم بيتمسح.

---

## الخلاصة

| عايز | الفلتر |
|---|---|
| shutdown مطلوب | [[Id = 1074]] ← [[.Message]] تقولك مين |
| قفل مفاجئ | [[Id = 41]] أو [[6008]] |
| أخطاء قريبة | [[Level = 1, 2]] + [[StartTime]] + [[Group-Object ProviderName]] |
| الدخول والخروج | [[-LogName Security]] (أدمن) |

و «No events were found» معناها «مفيش»، مش إن الأمر بايظ.`,
          lines: [
            "آخر 10 أحداث shutdown مطلوب أو قفل مفاجئ: الوقت والرقم والمصدر.",
            "رسالة آخر shutdown مطلوب: مين وليه.",
            "رسالة آخر قفل مفاجئ.",
            "الأخطاء من امبارح، متجمعة حسب المصدر، الأكتر الأول.",
            "سجل الأمان (محتاج أدمن)."
          ],
          sol: R`جربتهم على لابتوبي من غير أدمن. السطر الأول طلع 10 أحداث كلهم [[1074]] من [[User32]] على كذا يوم، يعني كل القفل الأخير كان مطلوب. ورسالة آخر واحد: [[The process C:\Windows\SystemApps\Microsoft.Windows.StartMenuExperienceHost_cw5n1h2txyewy\StartMenuExperienceHost.exe (PC) has initiated the power off of computer PC on behalf of user PC\me for the following reason: Other (Unplanned)]] و [[Shutdown Type: power off]]، يعني أنا قفلته من قايمة Start (غيّرت أسامي الجهاز واليوزر).

و [[41]] لقيته بس لما بحثت عنه لوحده، آخره من كذا شهر من [[Microsoft-Windows-Kernel-Power]]، ورسالته [[The system has rebooted without cleanly shutting down first. This error could be caused if the system stopped responding, crashed, or lost power unexpectedly.]]. والأخطاء من امبارح طلعت [[2 Microsoft-Windows-NDIS]] (كارت الشبكة) و [[1 Microsoft-Windows-DeviceAssociationService]]. و [[Get-WinEvent -LogName Security]] من غير أدمن طلع [[Attempted to perform an unauthorized operation.]].`
        },
        {
          cmd: "RandomNumberGenerator (password)",
          title: "اعمل باسورد قوي عشوائي",
          desc: R`الباسورد القوي طويل وعشوائي بجد. المثال بيعمل باسورد 20 حرف من لستة حروف ورموز، وكل حرف بيتختار بـ [[RandomNumberGenerator]]: مولّد أرقام عشوائية معمول للتشفير في .NET، وبعدين بيحطه في الحافظة على طول من غير ما يتطبع.

[[$chars]] الحروف المسموحة: كابيتال وسمول وأرقام ورموز، ومن غير الحروف اللي بتتلخبط في القراية زي [[O]] و [[0]] و [[I]] و [[l]] و [[1]]. و [[1..$length]] بيلف 20 مرة، وكل مرة [[[System.Security.Cryptography.RandomNumberGenerator]::GetInt32($chars.Length)]] رقم عشوائي من 0 لحد طول اللستة ناقص 1 بيتحط في [[$i]]، و [[$chars[$i]]] الحرف اللي في المكان ده، و [[;]] بتفصل بين الأمرين جوه البلوك. و [[-join]] بيلزق الحروف في نص واحد. و [[Set-Clipboard]] بيحطه في الحافظة (درس Set-Clipboard / Get-Clipboard).

ليه مش [[Get-Random]]؟ توثيق Microsoft بيقول صريح إن Get-Random «doesn't ensure cryptographically secure randomness»: مولّد عادي، كويس للألعاب والعينات العشوائية، بس مش للباسوردات والتوكنز. و [[-SetSeed]] بيخليه يكرر نفس الأرقام بالظبط. و PowerShell 7.4 وأحدث فيه [[Get-SecureRandom]] بنفس شكل Get-Random بس آمن (السطر الخامس)، و [[ToCharArray()]] بيقطّع النص لحروف عشان يختار منها.

[[GetInt32]] موجود في .NET الحديث بس، يعني PowerShell 7. في 5.1 بيطلع error إن مفيش method بالاسم ده، والبديل في الـ solCode. وقوة الباسورد بتتحسب: الطول × log2(عدد الحروف المتاحة)، و [[[math]::Log($chars.Length, 2)]] بيحسب log2 (السطر الأخير)، فـ 20 حرف من 68 تقريبًا 122 bit، وده أكتر من كفاية.

أمان: الحافظة ممكن تحفظ تاريخ (Win+V)، فبعد ما تلزق الباسورد في مدير الباسوردات انسخ أي حاجة تانية فوقه، ولو تاريخ الحافظة شغال امسحه من القايمة. ومتطبعش الباسورد في الترمنال لو بتعمل [[Start-Transcript]] أو بتشارك الشاشة.`,
          example: R`$chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#%^*-_=+?"
$length = 20
$password = -join (1..$length | ForEach-Object { $i = [System.Security.Cryptography.RandomNumberGenerator]::GetInt32($chars.Length); $chars[$i] })
$password | Set-Clipboard
-join (1..20 | ForEach-Object { $chars.ToCharArray() | Get-SecureRandom })
[math]::Round($length * [math]::Log($chars.Length, 2), 1)`,
          try: R`اعمل باسورد 24 حرف وحطه في الحافظة، والصقه في Notepad واتأكد من طوله. وجرب [[Get-Random -Maximum 100 -SetSeed 23]] تلات مرات.`,
          deep: {
            why: R`باسورد لحساب أدمن local (درس Get-LocalUser / New-LocalUser)، أو لقاعدة بيانات أو API key في ملف .env، أو لواي فاي الضيوف. الباسوردات اللي البني آدم بيختارها بتتخمّن، والمولّدات العادية ممكن تتوقع. ده بيدّيك باسورد عشوائي بجد من غير ما تفتح موقع.`,
            how: R`[[Get-Random]] بيستخدم مولّد pseudo-random: أرقام شكلها عشوائي بس جاية من معادلة وحالة داخلية، ولو حد عرف الحالة (أو الـ seed) يقدر يطلّع نفس الأرقام. [[RandomNumberGenerator]] بياخد عشوائيته من نظام التشغيل نفسه (CSPRNG)، ودي المعمولة للمفاتيح والتوكنز.

[[GetInt32(n)]] بيرجّع رقم من 0 لـ n-1 وكل رقم ليه نفس الفرصة بالظبط. البديل الساذج [[byte % n]] بيدّي أفضلية لأول الحروف (لأن 256 مش بتتقسم على 68)، وعشان كده الـ solCode بتاع 5.1 بيرمي البايتات اللي أكبر من آخر مضاعف كامل (204) ويسحب تاني.

[[Get-SecureRandom -InputObject $list -Count 20]] زي Get-Random: كل عنصر بيتختار مرة واحدة بس، يعني مفيش حرف بيتكرر، وده بيقلل العشوائية شوية. عشان كده المثال بيختار حرف واحد 20 مرة.`,
            when: R`أي باسورد أو secret بتعمله في سكربت، أو توكن عشوائي للتجارب، أو لما مدير الباسوردات مش قدامك.`,
            mistakes: R`تستخدم [[Get-Random]] لباسوردات أو توكنز. أو تستخدم [[-Count 20]] على لستة الحروف فمتلاقيش أي حرف متكرر. أو تطبع الباسورد في الترمنال وانت بتسجّل transcript. أو تشغّل [[GetInt32]] على 5.1. أو تشيل الرموز كلها عشان «موقع مش بيقبلها» من غير ما تطوّل الباسورد بدالها.`
          },
          teach: R`## الفكرة: نختار حرف عشوائي 20 مرة ونلزقهم

الباسورد = لستة حروف مسموحة + طول + مولّد أرقام عشوائي **آمن** يختار مكان في اللستة كل مرة. اتشغّل على PowerShell 7.6.6 و 5.1 (من غير [[Set-Clipboard]] عشان مغيّرش الحافظة).

---

## ١. الحروف والطول

~~~powershell
$chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#%^*-_=+?"
$length = 20
~~~

لو بصيت كويس هتلاقي حروف ناقصة: [[I]] و [[O]] الكابيتال، و [[l]] السمول، و [[0]] و [[1]]. دول بيتلخبطوا في بعض لو حد بيقرا الباسورد ويكتبه. والنص بين [[" "]] بس مفيش فيه [[$]]، فمفيش حاجة هتتبدل.

~~~text الناتج
$chars.Length  →  68
$chars[0]      →  A
$chars[67]     →  ?
~~~

[[$chars[0]]] أول حرف (العد من 0)، فآخر حرف رقمه 67.

---

## ٢. اختيار حرف واحد

~~~powershell
$i = [System.Security.Cryptography.RandomNumberGenerator]::GetInt32($chars.Length); $chars[$i]
~~~

- [[System.Security.Cryptography]] مكتبة التشفير في .NET، و [[RandomNumberGenerator]] مولّد أرقام عشوائية بياخد عشوائيته من نظام التشغيل.
- [[::GetInt32(68)]] رقم صحيح من 0 لـ 67، وكل رقم ليه نفس الفرصة بالظبط.
- [[$chars[$i]]] الحرف اللي في المكان ده.

جربت [[GetInt32($chars.Length)]] مرة طلع [[64]]، يعني الحرف رقم 64.

---

## ٣. 20 مرة ونلزقهم

~~~powershell
$password = -join (1..$length | ForEach-Object { $i = [System.Security.Cryptography.RandomNumberGenerator]::GetInt32($chars.Length); $chars[$i] })
~~~

من جوه لبرة:

| الحتة | معناها |
|---|---|
| [[1..$length]] | الأرقام من 1 لـ 20، يعني «لف 20 مرة». الرقم نفسه مش مستخدم |
| [[ForEach-Object { ... }]] | كل لفة: اختار رقم واطلّع الحرف. [[;]] بتفصل الأمرين |
| [[( )]] | النتيجة لستة 20 حرف ([[Object[]]]) |
| [[-join]] | يلزق اللستة في نص واحد: [[-join ("a","b","c")]] بيطلع [[abc]] |

~~~text الناتج (مرة واحدة، والتانية هتطلع غير كده)
^EyDeq_%B*qq2vKcUP6s
$password.Length  →  20
~~~

لاحظ [[q]] متكرر مرتين ورا بعض: عادي، كل اختيار مستقل عن اللي قبله.

---

## ٤. الحافظة

~~~powershell
$password | Set-Clipboard
~~~

بيحط الباسورد في الحافظة من غير ما يتطبع على الشاشة، فتلزقه في مدير الباسوردات على طول.

---

## ٥. نفس الفكرة بـ [[Get-SecureRandom]]

~~~powershell
-join (1..20 | ForEach-Object { $chars.ToCharArray() | Get-SecureRandom })
~~~

- [[$chars.ToCharArray()]] يقطّع النص لـ 68 حرف منفصلين.
- [[Get-SecureRandom]] بيختار عنصر عشوائي من اللي جايله في الـ [[|]]، بمولّد آمن. موجود من PowerShell 7.4.

~~~text الناتج
gRnV=yM=%6naSV2K!RkG
~~~

ليه مش [[Get-SecureRandom -Count 20]] مرة واحدة؟ لأن [[-Count]] بيختار 20 عنصر **مختلفين**، فمفيش حرف بيتكرر أبدًا. جربت: عدد الحروف المتكررة طلع [[0]]. ده بيقلل الاحتمالات شوية، فاختيار حرف حرف أحسن.

وليه مش [[Get-Random]]؟ جربت نفس الـ seed تلات مرات:

~~~text الناتج
Get-Random -Maximum 100 -SetSeed 23   →  32
Get-Random -Maximum 100 -SetSeed 23   →  32
Get-Random -Maximum 100 -SetSeed 23   →  32
~~~

مولّد عادي: لو حد عرف حالته يقدر يطلّع نفس الأرقام. كويس للألعاب، مش للأسرار.

---

## ٦. قوة الباسورد بالـ bits

~~~powershell
[math]::Round($length * [math]::Log($chars.Length, 2), 1)
~~~

كل حرف ليه 68 احتمال. [[[math]::Log(68, 2)]] بيسأل «2 أُس كام = 68؟»:

~~~text الناتج
[math]::Log(68, 2)   →  6.08746284125034
20 × 6.087          →  121.7
~~~

يعني الحرف الواحد بـ 6 bits تقريبًا، والباسورد كله **121.7 bit**: عدد الاحتمالات 2 أُس 121.7، وده مستحيل يتخمّن بالتجربة.

---

## ٧. على 5.1 (الـ solCode)

في 5.1 السطر التالت بيقع:

~~~text الناتج
Method invocation failed because [System.Security.Cryptography.RandomNumberGenerator] does not contain a method named 'GetInt32'.
~~~

لأن [[GetInt32]] اتضاف في .NET الحديث بس. البديل بيسحب بايت عشوائي ويحوّله لحرف:

| السطر | بيعمل إيه |
|---|---|
| [[$rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()]] | يعمل مولّد آمن (في 5.1 طلع نوعه [[RNGCryptoServiceProvider]]) |
| [[$bytes = New-Object byte[] 1]] | array فيها بايت واحد (رقم من 0 لـ 255) |
| [[$out = ""]] | نبدأ بنص فاضي |
| [[while ($out.Length -lt 20) { ... }]] | لف لحد ما الطول يبقى 20. [[-lt]] أقل من |
| [[$rng.GetBytes($bytes)]] | املا البايت برقم عشوائي |
| [[if ($bytes[0] -lt 256 - (256 % $chars.Length))]] | اقبل الرقم بس لو أقل من 204 |
| [[$out += $chars[$bytes[0] % $chars.Length]]] | باقي القسمة على 68 = مكان الحرف، وزوّده على النص |

### ليه 204؟

[[256 % 68]] = 52، و 256 − 52 = **204**. الأرقام من 0 لـ 203 بتتقسم على 68 بالظبط تلات لفات، فكل حرف ليه 3 أرقام. لكن 204 لـ 255 (52 رقم) كانوا هيدّوا أول 52 حرف فرصة رابعة. فبنرميهم ونسحب تاني، وكل الحروف تفضل متساوية.

~~~text الناتج في 5.1
6p4K6bF!=_v^P=CF2Spg
20
~~~

---

## الخلاصة

| الحتة | دورها |
|---|---|
| [[$chars]] | 68 حرف من غير اللي بيتلخبط |
| [[GetInt32(n)]] | رقم آمن من 0 لـ n-1 (7 بس) |
| [[-join (1..20 | ...)]] | 20 حرف في نص واحد |
| [[Set-Clipboard]] | للحافظة من غير طباعة |
| [[Get-SecureRandom]] | نفس الأمان بشكل Get-Random (7.4+)، حرف حرف |
| [[Log(68, 2) × 20]] | 121.7 bit |
| الـ solCode | 5.1: بايت + رفض 204 لـ 255 |

ومتستخدمش [[Get-Random]] لأي سر.`,
          lines: [
            "الحروف المسموحة، من غير اللي بتتلخبط في القراية (68 حرف).",
            "الطول.",
            "اختار حرف عشوائي آمن 20 مرة، والزقهم في نص واحد (PowerShell 7).",
            "حطه في الحافظة من غير ما يتطبع.",
            "نفس الفكرة بـ Get-SecureRandom (PowerShell 7.4 وأحدث)، حرف حرف.",
            "قوة الباسورد بالـ bits: الطول × log2(عدد الحروف)."
          ],
          sol: R`جربت التوليد على 7.6.6 (من غير Set-Clipboard عشان مغيّرش الحافظة): طلع باسورد زي [[Q+h3!gmzhhFy5oDwGHD6]] طوله [[20]]، ونسخة Get-SecureRandom طلعت [[U8+^r7D?txfbcx?Jn?kd]] (لاحظ [[x]] و [[?]] متكررين، عادي)، والقوة طلعت [[121.7]] bit. وفي التجربة: باسورد 24 حرف قوته حوالي 146 bit.

و [[Get-Random -Maximum 100 -SetSeed 23]] طلع [[32]] كل مرة، وده اللي بيخليه مش آمن للأسرار. وعلى 5.1 السطر التالت طلع [[Method invocation failed because [System.Security.Cryptography.RandomNumberGenerator] does not contain a method named 'GetInt32'.]]، والـ solCode اشتغل عليها وطلع باسورد 20 حرف زي [[CktJfi9Hdj6ko73b7=Xy]].`,
          solCode: R`$chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#%^*-_=+?"
$rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
$bytes = New-Object byte[] 1
$out = ""
while ($out.Length -lt 20) {
    $rng.GetBytes($bytes)
    if ($bytes[0] -lt 256 - (256 % $chars.Length)) { $out += $chars[$bytes[0] % $chars.Length] }
}
$out | Set-Clipboard`
        }
      ]
    }
]);
