// تكملة تاب tools: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/tools/01.js (شرح حقول الدرس في أوله)
MORE("tools", [
    {
      t: "اعرف جهازك",
      l: 1,
      time: R`حوالي ساعة`,
      goal: [
        R`تعرف معلومات جهازك (النظام، والرام، والمعالج، وبقاله قد إيه شغّال) في ثانية.`,
        R`تعرف المساحة الفاضية وصحة كل ديسك.`,
        R`تعرف البطارية فاضل منها كام في المية من سعتها الأصلية.`,
        R`تعرف مين واكل الرام والمعالج فعلًا، ومين بيفتح مع الجهاز.`,
      ],
      use: {
        work: R`«الجهاز تقيل» — في دقيقة تعرف هو الرام ولا الديسك ولا برنامج معين، بدل ما تخمّن.`,
        prog: R`الأوامر دي بترجّع objects في PowerShell. فتقدر تحطها في سكربت يطلّع تقرير — ده المشروع في آخر التاب.`,
        cs: R`CIM/WMI هي الطريقة اللي ويندوز بيوري بيها كل حاجة عن الجهاز. وكل أداة إدارة بتسأله.`,
      },
      lab: R`# Windows (PowerShell):
pwsh -NoProfile
# Linux:
docker run -it --rm ubuntu:24.04 bash`,
      projects: [
        { t: R`كارت الجهاز`, what: R`سكربت بيطبع في ٥ سطور: النظام، والرام الفاضية، وأقل ديسك فيه مساحة، والبطارية، وبقاله قد إيه شغّال. وقيس وقته بـ [[Measure-Command]] — لو أكتر من ثانية، شيل [[Get-ComputerInfo]].` },
        { t: R`مين واكل الرام`, what: R`أمر واحد بيطلّع أكتر ٥ برامج واكلة رام **متجمّعة بالاسم**. وقارن بالـ ٥ عمليات الأكبر من غير تجميع — وشوف الفرق مع المتصفح.` },
      ],
      n: R`الأرقام هنا من جهاز التجربة (ويندوز 11)، والأسماء الشخصية اتشالت`,
      items: [
        {
          cmd: "معلومات الجهاز في ثانية",
          title: "النظام والرام والمعالج، والأمر السريع مقابل البطيء",
          learn: R`تجيب معلومات الجهاز بـ [[Get-CimInstance]] و [[Get-ComputerInfo]]، وتعرف الفرق.`,
          out: R`سطر واحد بيقولك كل حاجة أساسية عن أي جهاز.`,
          use: {
            work: R`حد بيقولك «جهازي فيه مشكلة» — أول حاجة: إيه النظام، والرام، وبقاله قد إيه من غير restart.`,
            prog: R`نفس الأوامر بتشتغل على أجهزة تانية عن بعد ([[-ComputerName]] / [[-CimSession]]).`,
          },
          desc: R`أسهل أمر: [[Get-ComputerInfo]]. بيجيب كل حاجة — **بس أخد ٢.٣ ثانية** على جهاز التجربة، لأنه بيجمع مئات الخصائص.

والأسرع: تسأل CIM عن الحاجة اللي محتاجها بس:

[[Get-CimInstance Win32_OperatingSystem]]

← [[Microsoft Windows 11 Home | free RAM 8.4 GB of 31.4 GB | up since 10/28/2026 2:33:37 AM]]

**[[LastBootUpTime]] مهم أكتر مما تتخيل:** «إعادة تشغيل» بتحل مشاكل كتير، وناس كتير بتفتكر إنها عملت restart وهي عملت shutdown — وده في ويندوز ١٠ و ١١ مش بيعمل restart حقيقي لو Fast Startup شغّال. فـ [[LastBootUpTime]] بيقولك الحقيقة.

**وعلى لينكس** (جوه Docker على نفس الجهاز):

[[Ubuntu 24.04.5 LTS]] و [[CPU(s): 16]] و [[Mem: 15Gi]]

**ولاحظ:** الجهاز فيه ٣١ جيجا رام، و Docker شايف **١٥ جيجا** بس. لأن الكونتينر شايف الجهاز الوهمي بتاع Docker، مش جهازك. نفس الأوامر، إجابة مختلفة حسب انت فين.`,
          example: R`# Windows (PowerShell):
Get-ComputerInfo -Property OsName, OsVersion, CsNumberOfLogicalProcessors, CsTotalPhysicalMemory
$os = Get-CimInstance Win32_OperatingSystem
"{0} | free RAM {1:N1} GB of {2:N1} GB | up since {3}" -f $os.Caption, ($os.FreePhysicalMemory/1MB), ($os.TotalVisibleMemorySize/1MB), $os.LastBootUpTime
# Windows (CMD):
systeminfo | findstr /c:"OS Name" /c:"Total Physical Memory" /c:"System Boot Time"
# Linux:
grep PRETTY /etc/os-release; lscpu | grep -E "^CPU\(s\)|Model name"; free -h
# Mac:
sw_vers; system_profiler SPHardwareDataType | grep -E "Chip|Memory"`,
          lines: [
            R`كل حاجة، بس **بطيء** (٢.٣ ثانية). و [[-Property]] بيقلل اللي بيتعرض بس، مش اللي بيتجمع.`,
            R`السريع: سؤال واحد لـ CIM.`,
            R`[[-f]] بيحط القيم في النص. [[FreePhysicalMemory]] بالكيلوبايت، فـ [[/1MB]] بيحوّله جيجا.`,
            R`CMD: [[systeminfo]] بيطلّع صفحة كاملة، و [[findstr /c:]] بيختار سطور معينة (درس «findstr مش regex كامل» في تاب CMD).`,
            R`لينكس: النسخة، والمعالج، والرام.`,
            R`الماك: النسخة، والمعالج، والرام. (من وثائق Apple — مااتجرّبش هنا.)`,
          ],
          try: R`قيس الفرق بنفسك: [[Measure-Command { Get-ComputerInfo } | Select-Object TotalSeconds]] مقابل [[Measure-Command { Get-CimInstance Win32_OperatingSystem } | Select-Object TotalSeconds]]. واعرف بقالك قد إيه من غير restart: [[(Get-Date) - (Get-CimInstance Win32_OperatingSystem).LastBootUpTime]].`,
          deep: {
            why: R`تشخيص أي مشكلة بيبدأ بالأرقام دي. ومن غيرها، «الجهاز تقيل» ممكن يبقى أي حاجة.`,
            how: R`**CIM classes مفيدة:**

| الـ class | فيه |
|---|---|
| [[Win32_OperatingSystem]] | النظام، والرام، وآخر boot |
| [[Win32_Processor]] | المعالج وعدد الأنوية |
| [[Win32_ComputerSystem]] | الشركة والموديل والرام الكلية |
| [[Win32_BIOS]] | نسخة الـ BIOS والسيريال |
| [[Win32_Battery]] | البطارية (لو موجودة) |
| [[Win32_StartupCommand]] | البرامج اللي بتفتح مع الجهاز |

ولما متعرفش اسم الـ class: [[Get-CimClass -ClassName *Battery*]].

**Fast Startup:** في ويندوز ١٠ و ١١، «Shut down» مع Fast Startup بيحفظ الكيرنل في ملف ويرجّعه — فمش restart كامل. و «Restart» دايمًا كامل. وعشان كده [[LastBootUpTime]] ممكن يقول «من أسبوع» مع إنك بتقفل كل يوم. (سلوك Fast Startup من وثائق Microsoft.)

**[[Get-ComputerInfo]] و [[-Property]]:** الأمر بيجمع كل حاجة الأول، وبعدين [[-Property]] بتختار للعرض. فالوقت هو هو. لو محتاج سرعة، CIM مباشرة.

**وعلى لينكس:** [[hostnamectl]] بيجمع حاجات كتير في أمر واحد، بس محتاج systemd — ومش موجود جوه كونتينر. و [[uname -a]] و [[/etc/os-release]] و [[lscpu]] و [[free -h]] شغالين في أي حتة.`,
            when: R`أول أمر في أي «الجهاز فيه مشكلة»، وأي سكربت بيجمع معلومات عن أجهزة كتير.`,
            mistakes: R`[[Get-ComputerInfo]] في سكربت بيتكرر كتير. أو تصدّق إنك عملت restart من غير ما تبص على [[LastBootUpTime]]. أو تقيس جوه كونتينر وتفتكره جهازك.`
          },
          teach: R`## الأمر السهل، والأمر السريع

~~~powershell
Measure-Command { Get-ComputerInfo | Out-Null }
~~~

~~~text اتشغّل فعلًا
TotalSeconds : 2.33
~~~

**٢.٣ ثانية**، لأنه بيجمع مئات الخصائص.

~~~powershell السريع: CIM مباشرة
$os = Get-CimInstance Win32_OperatingSystem
"{0} | free RAM {1:N1} GB of {2:N1} GB | up since {3}" -f $os.Caption, ($os.FreePhysicalMemory/1MB), ($os.TotalVisibleMemorySize/1MB), $os.LastBootUpTime
~~~

~~~text اتشغّل فعلًا
Microsoft Windows 11 Home Single Language | free RAM 8.4 GB of 31.4 GB | up since 10/28/2026 2:33:37 AM
~~~

---

## ١. [[LastBootUpTime]] بيقول الحقيقة

ناس كتير بتفتكر إنها عملت restart. و «Shut down» مع Fast Startup **مش** restart كامل.

~~~powershell بقالك قد إيه
(Get-Date) - (Get-CimInstance Win32_OperatingSystem).LastBootUpTime
~~~

---

## ٢. لينكس

~~~bash
grep PRETTY /etc/os-release; lscpu | grep -E "^CPU\(s\)|Model name"; free -h
~~~

~~~text اتشغّل فعلًا · أوبونتو جوه Docker على نفس الجهاز
PRETTY_NAME="Ubuntu 24.04.5 LTS"
CPU(s):        16
Mem:           15Gi       1.0Gi        13Gi
~~~

> **الجهاز فيه ٣١ جيجا، والكونتينر شايف ١٥.** لأنه شايف الجهاز الوهمي بتاع Docker، مش جهازك.

---

## ٣. CIM classes

| | |
|---|---|
| [[Win32_OperatingSystem]] | النظام والرام وآخر boot |
| [[Win32_Processor]] | المعالج |
| [[Win32_ComputerSystem]] | الموديل |
| [[Win32_Battery]] | البطارية |
| [[Win32_StartupCommand]] | اللي بيفتح مع الجهاز |

متعرفش الاسم؟ [[Get-CimClass -ClassName *Battery*]].

---

## الخلاصة

- [[Get-ComputerInfo]] سهل وبطيء.
- [[Get-CimInstance]] سريع ومحدد.
- [[LastBootUpTime]] قبل ما تقول «عملت restart».
- الكونتينر شايف جهاز Docker، مش جهازك.`,
          sol: R`[[Get-ComputerInfo]] و CIM اتجرّبوا في PowerShell 7.6 على ويندوز 11، و [[systeminfo]] في CMD، وأوامر لينكس على أوبونتو 24.04 جوه Docker. أوامر الماك وسلوك Fast Startup من الوثائق.`,
          solCode: R`Measure-Command { Get-ComputerInfo | Out-Null }    # TotalSeconds : 2.33
# CIM:  Microsoft Windows 11 Home Single Language | free RAM 8.4 GB of 31.4 GB | up since ...
# لينكس جوه Docker:  Ubuntu 24.04.5 LTS | CPU(s): 16 | Mem: 15Gi   (الجهاز نفسه 31 جيجا)`
        },

        {
          cmd: "الديسك: مساحة وصحة",
          title: "فاضي كام، والديسك نفسه سليم ولا لأ",
          learn: R`تعرف المساحة الفاضية في كل partition، وصحة كل ديسك، وإيه اللي محتاج Admin.`,
          out: R`تعرف قبل ما الديسك يتملى أو يقع.`,
          use: {
            work: R`أغرب مشاكل الجهاز (تحديثات بتفشل، برامج بتقع، بطء) سببها ديسك فاضل فيه أقل من ١٠٪.`,
            prog: R`[[npm install]] و Docker والـ builds بياكلوا مساحة بسرعة. وفولدر [[node_modules]] واحد ممكن يبقى جيجا.`,
          },
          desc: R`سؤالين مختلفين:

**١. فاضل كام؟** — [[Get-Volume]] (لكل حرف: [[C:]] و [[D:]]...)

**٢. الديسك نفسه سليم؟** — [[Get-PhysicalDisk]] (لكل ديسك حقيقي)

**على جهاز التجربة:**

| الحرف | فاضي | من |
|---|---|---|
| C | 36.8 جيجا | 301 |
| D | 55.4 | 629 |
| E | 46.8 | 954 |

و [[Get-PhysicalDisk]]:

| الديسك | النوع | الحالة |
|---|---|---|
| SSD-1 | SSD، NVMe | [[Healthy]] |
| SSD-2 | SSD، NVMe | [[Healthy]] |

**والأعمق: الحرارة والتآكل وعدد الأخطاء** — [[Get-StorageReliabilityCounter]]. **ده محتاج Admin**:

[[Access to a CIM resource was not available to the client.]]

ودي مش رسالة واضحة — بس معناها «شغّلني كـ Admin».

**ولاحظ الحرف مقابل الديسك:** الـ D: والـ E: ممكن يكونوا على نفس الديسك أو على ديسكين. [[Get-Volume]] بيتكلم عن الحروف، و [[Get-PhysicalDisk]] عن الأجهزة. والربط بينهم [[Get-Partition]].`,
          example: R`# Windows (PowerShell):
Get-Volume | Where-Object DriveLetter | Select-Object DriveLetter, FileSystemType, HealthStatus, @{n='FreeGB';e={[math]::Round($_.SizeRemaining/1GB,1)}}, @{n='SizeGB';e={[math]::Round($_.Size/1GB,1)}}
Get-PhysicalDisk | Select-Object FriendlyName, MediaType, BusType, HealthStatus
Get-PhysicalDisk | Get-StorageReliabilityCounter | Select-Object Temperature, Wear, ReadErrorsTotal
# Linux:
df -h /
lsblk -o NAME,SIZE,TYPE,MOUNTPOINTS`,
          lines: [
            R`كل حرف: نظام الملفات، والحالة، والفاضي، والحجم. و [[@{n=..;e={..}}]] عمود محسوب.`,
            R`كل ديسك حقيقي: SSD ولا HDD، و NVMe ولا SATA ولا USB، و [[Healthy]] ولا لأ.`,
            R`الحرارة والتآكل والأخطاء — **محتاج PowerShell كـ Admin**.`,
            R`لينكس: المساحة على [[/]]. و [[-h]] = أرقام مفهومة (جيجا مش بايتات).`,
            R`كل الديسكات والـ partitions وفين متركّبة.`,
          ],
          try: R`شغّل [[Get-Volume]] واعرف كل حرف فاضي فيه كام في المية. ولو عندك PowerShell كـ Admin، جرّب [[Get-StorageReliabilityCounter]] وشوف الـ [[Wear]] (للـ SSD: كام في المية من عمره اتاكل).`,
          deep: {
            why: R`الديسك المليان بيكسر حاجات بشكل مش واضح، والديسك اللي بيقع بيضيّع كل حاجة. والاتنين ليهم علامات قبلها بفترة.`,
            how: R`**المساحة:** ويندوز محتاج مساحة فاضية للتحديثات والـ pagefile والملفات المؤقتة. وتحت ١٠٪ المشاكل بتبدأ. والمشروع في آخر التاب بيحذّر لما حرف ينزل تحت ١٠٪.

**الصحة:**

| [[HealthStatus]] | |
|---|---|
| [[Healthy]] | تمام |
| [[Warning]] | **اعمل نسخة احتياطية النهارده** |
| [[Unhealthy]] | الديسك بيقع |

**[[Get-StorageReliabilityCounter]] (Admin):**

| | |
|---|---|
| [[Temperature]] | الحرارة. الـ NVMe ممكن يوصل ٧٠ تحت الضغط |
| [[Wear]] | للـ SSD: كام في المية اتاكل من عمره المتوقع |
| [[ReadErrorsTotal]] | أخطاء القراية — لو بتزيد، خطر |
| [[PowerOnHours]] | اشتغل كام ساعة |

**وعلى لينكس:** [[smartctl -a /dev/sda]] (من حزمة [[smartmontools]]) بيقرا نفس البيانات (SMART) — ومحتاج [[sudo]]. وجوه كونتينر مش هيشوف الديسك الحقيقي. (من وثائق smartmontools.)

**والمساحة راحت فين؟** الدرس «نضّف من غير ما تمسح غلط» في القسم الجاي.`,
            when: R`مرة في الشهر، وأي وقت الجهاز يبقى غريب، وقبل أي تحديث كبير.`,
            mistakes: R`تبص على الحروف وتفتكرهم ديسكات. أو تتجاهل [[Warning]]. أو تفتكر رسالة «Access to a CIM resource» مشكلة في الديسك (هي صلاحيات).`
          },
          teach: R`## سؤالين مختلفين

| | الأمر |
|---|---|
| فاضل كام؟ | [[Get-Volume]] — لكل حرف |
| الديسك سليم؟ | [[Get-PhysicalDisk]] — لكل جهاز |

---

## ١. المساحة

~~~powershell
Get-Volume | Where-Object DriveLetter |
  Select-Object DriveLetter, FileSystemType, HealthStatus,
    @{n='FreeGB';e={[math]::Round($_.SizeRemaining/1GB,1)}},
    @{n='SizeGB';e={[math]::Round($_.Size/1GB,1)}}
~~~

~~~text اتشغّل فعلًا
DriveLetter FileSystemType HealthStatus FreeGB SizeGB
----------- -------------- ------------ ------ ------
          D NTFS           Healthy       55.40 629.20
          E NTFS           Healthy       46.80 953.60
          C NTFS           Healthy       36.80 301.30
~~~

> **E: فيه ٥٪ بس فاضي.** تحت ١٠٪ المشاكل بتبدأ.

---

## ٢. الصحة

~~~powershell
Get-PhysicalDisk | Select-Object FriendlyName, MediaType, BusType, HealthStatus
~~~

~~~text اتشغّل فعلًا (الأسماء اتغيّرت)
FriendlyName MediaType BusType HealthStatus
------------ --------- ------- ------------
SSD-1        SSD       NVMe    Healthy
SSD-2        SSD       NVMe    Healthy
~~~

| | |
|---|---|
| [[Healthy]] | تمام |
| [[Warning]] | **نسخة احتياطية النهارده** |
| [[Unhealthy]] | بيقع |

---

## ٣. الأعمق — محتاج Admin

~~~powershell
Get-PhysicalDisk | Get-StorageReliabilityCounter | Select-Object Temperature, Wear, ReadErrorsTotal
~~~

~~~text اتشغّل فعلًا — من غير Admin
Access to a CIM resource was not available to the client.
~~~

**معناها: شغّلني كـ Admin.** مش مشكلة في الديسك.

---

## ٤. لينكس

~~~bash
df -h /
lsblk -o NAME,SIZE,TYPE,MOUNTPOINTS
~~~

و [[sudo smartctl -a /dev/sda]] للصحة (من وثائق smartmontools).

---

## الخلاصة

- [[Get-Volume]] = الحروف. [[Get-PhysicalDisk]] = الأجهزة.
- تحت ١٠٪ فاضي = مشاكل.
- [[Warning]] = نسخة احتياطية فورًا.
- التفاصيل محتاجة Admin.`,
          sol: R`[[Get-Volume]] و [[Get-PhysicalDisk]] والرسالة من غير Admin اتشغّلوا في PowerShell 7.6 (أسماء الديسكات اتغيّرت). [[smartctl]] من الوثائق.`,
          solCode: R`Get-Volume | Where-Object DriveLetter        # C 36.8/301  D 55.4/629  E 46.8/954 جيجا فاضي
Get-PhysicalDisk                              # SSD-1, SSD-2: SSD NVMe Healthy
Get-PhysicalDisk | Get-StorageReliabilityCounter
#   Access to a CIM resource was not available to the client.     <-- محتاج Admin`
        },

        {
          cmd: "البطارية فاضل منها كام",
          title: "السعة الأصلية مقابل السعة دلوقتي",
          learn: R`تطلّع تقرير البطارية وتحسب فاضل منها كام في المية.`,
          out: R`رقم واحد بيقولك البطارية محتاجة تتغيّر ولا لأ.`,
          use: {
            work: R`«اللابتوب بيفصل بسرعة» — الرقم ده بيفرّق بين بطارية قديمة وبرنامج واكل الطاقة.`,
          },
          desc: R`[[powercfg /batteryreport]] بيعمل صفحة HTML فيها كل تاريخ البطارية. وأهم سطرين فيها:

| | جهاز التجربة |
|---|---|
| **DESIGN CAPACITY** (السعة من المصنع) | **90,005 mWh** |
| **FULL CHARGE CAPACITY** (أقصى شحن دلوقتي) | **50,640 mWh** |

**50,640 ÷ 90,005 = ٥٦٪.** البطارية فاضل فيها حوالي نص سعتها الأصلية — فبتخلص في حوالي نص الوقت.

ده طبيعي لبطارية عدّى عليها سنين واستخدام كتير. والشركات غالبًا بتعتبر البطارية «محتاجة تتغيّر» تحت ٨٠٪ أو ٦٠٪ حسب السياسة (الأرقام دي بتختلف من شركة لشركة).

**والأمر مبيغيّرش حاجة:** بيكتب ملف HTML بس، ومش محتاج Admin.

**ولو مفيش بطارية** (جهاز مكتبي)، [[Get-CimInstance Win32_Battery]] بترجّع ولا حاجة — والسكربت لازم يتعامل مع ده (زي المشروع في آخر التاب).`,
          example: R`# Windows (PowerShell):
powercfg /batteryreport /output "$env:TEMP\battery.html"
start "$env:TEMP\battery.html"
# Windows (CMD):
powercfg /batteryreport /output "%TEMP%\battery.html"
# Linux:
upower -i $(upower -e | grep -m1 BAT) | grep -E "energy-full|capacity"
# Mac:
system_profiler SPPowerDataType | grep -E "Cycle Count|Condition|Maximum Capacity"`,
          lines: [
            R`بيكتب التقرير في TEMP. ومش محتاج Admin.`,
            R`[[start]] بيفتحه في المتصفح. دوّر على «Installed batteries».`,
            R`نفس الأمر من CMD — [[%TEMP%]] بدل [[$env:TEMP]].`,
            R`لينكس: [[upower]] بيطلّع [[energy-full-design]] و [[energy-full]] و [[capacity]]. (من وثائق upower — مااتجرّبش هنا.)`,
            R`الماك: عدد دورات الشحن والحالة. (من وثائق Apple — مااتجرّبش هنا.)`,
          ],
          try: R`طلّع التقرير وافتحه، ودوّر على جدول «Battery capacity history» — هيوريك السعة نزلت إزاي على مدار الشهور. وبعدين احسب النسبة بنفسك.`,
          deep: {
            why: R`البطارية بتتآكل مع كل دورة شحن ومع الحرارة. ومفيش طريقة تعرف ده من الأيقونة اللي تحت — بتقولك ١٠٠٪ حتى لو الـ ١٠٠٪ دي نص السعة الأصلية.`,
            how: R`**تقرأ الرقم ده إزاي في سكربت:** التقرير HTML، فبتطلّع الرقمين بـ regex:

~~~powershell
$h = Get-Content "$env:TEMP\battery.html" -Raw
[regex]::Matches($h, '(DESIGN CAPACITY|FULL CHARGE CAPACITY)</span></td><td>([\d,]+) mWh') |
  ForEach-Object { $_.Groups[1].Value + " = " + $_.Groups[2].Value }
~~~

~~~text اتشغّل فعلًا
DESIGN CAPACITY = 90,005
FULL CHARGE CAPACITY = 50,640
~~~

(شكل الـ HTML ده ممكن يتغيّر مع تحديثات ويندوز، فالسكربت لازم يتعامل مع إنه ميلاقيش حاجة.)

**وإيه اللي بيطوّل عمر البطارية؟** الحرارة العالية، والشحن لـ ١٠٠٪ والفضل عليه طول الوقت، والتفريغ لصفر — كلهم بيسرّعوا التآكل. وأجهزة كتير فيها إعداد «اشحن لحد ٨٠٪ بس» في برنامج الشركة. (معلومات عامة عن بطاريات الليثيوم.)

**[[powercfg]] فيه تقارير تانية:**

| | |
|---|---|
| [[powercfg /energy]] | مشاكل الطاقة (محتاج Admin) |
| [[powercfg /sleepstudy]] | الجهاز صحي وهو نايم ولا لأ |
| [[powercfg /a]] | أنواع النوم المتاحة |

(الأوامر دي من وثائق [[powercfg]]، و [[/batteryreport]] بس اللي اتجرّب.)`,
            when: R`اللابتوب بيفصل أسرع من الأول، أو قبل ما تشتري لابتوب مستعمل.`,
            mistakes: R`تصدّق أيقونة الـ ١٠٠٪. أو تفتح التقرير على جهاز مكتبي وتستغرب إنه فاضي.`
          },
          teach: R`## التقرير

~~~powershell
powercfg /batteryreport /output "$env:TEMP\battery.html"
~~~

~~~text اتشغّل فعلًا
Battery life report saved to file path C:\Users\you\AppData\Local\Temp\battery.html.
~~~

مبيغيّرش حاجة، ومش محتاج Admin.

---

## ١. أهم سطرين

~~~text اتشغّل فعلًا — من جوه التقرير
DESIGN CAPACITY = 90,005 mWh
FULL CHARGE CAPACITY = 50,640 mWh
~~~

~~~text
50,640 ÷ 90,005 = ٥٦٪
~~~

**البطارية بتخلص في حوالي نص الوقت اللي كانت بتقعده وهي جديدة.** والأيقونة بتقول ١٠٠٪ برضه.

---

## ٢. في سكربت

~~~powershell
$h = Get-Content "$env:TEMP\battery.html" -Raw
[regex]::Matches($h, '(DESIGN CAPACITY|FULL CHARGE CAPACITY)</span></td><td>([\d,]+) mWh') |
  ForEach-Object { $_.Groups[1].Value + " = " + $_.Groups[2].Value }
~~~

> شكل الـ HTML ممكن يتغيّر مع التحديثات. السكربت يتعامل مع إنه ميلاقيش.

---

## ٣. ومفيش بطارية؟

~~~powershell
Get-CimInstance Win32_Battery     # جهاز مكتبي: ولا حاجة
~~~

---

## ٤. لينكس والماك

~~~bash
# Linux:
upower -i $(upower -e | grep -m1 BAT) | grep -E "energy-full|capacity"
# Mac:
system_profiler SPPowerDataType | grep -E "Cycle Count|Condition|Maximum Capacity"
~~~

(من الوثائق — مااتجرّبوش هنا.)

---

## الخلاصة

- [[powercfg /batteryreport]] — ملف HTML، من غير Admin.
- السعة دلوقتي ÷ السعة الأصلية = صحة البطارية.
- الأيقونة مش بتقول الحقيقة دي.`,
          sol: R`التقرير والرقمين اتطلّعوا على جهاز التجربة (ويندوز 11). أوامر لينكس والماك، وأوامر [[powercfg]] التانية، من الوثائق.`,
          solCode: R`powercfg /batteryreport /output "$env:TEMP\battery.html"
# DESIGN CAPACITY = 90,005 mWh
# FULL CHARGE CAPACITY = 50,640 mWh
# 50,640 / 90,005 = 56%`
        },

        {
          cmd: "مين واكل الجهاز",
          title: "أكبر عملية ٧٣٧ ميجا… والبرنامج كله ١٠ جيجا",
          learn: R`تعرف البرامج الأكتر استهلاكًا للرام والمعالج — متجمّعة بالاسم — والبرامج اللي بتفتح مع الجهاز.`,
          out: R`تعرف السبب الحقيقي لتقل الجهاز في دقيقة.`,
          use: {
            work: R`«الجهاز تقيل» — ٩٠٪ من المرات برنامج واحد. والسؤال إنه إيه.`,
            cs: R`البرامج الحديثة (المتصفحات، VS Code، Discord) بتقسّم نفسها لعمليات كتير. فلو بصيت على العمليات واحدة واحدة، هتلاقي كل واحدة صغيرة — والمجموع ضخم.`,
          },
          desc: R`**أكبر ٣ عمليات رام** على جهاز التجربة:

| العملية | الرام |
|---|---|
| [[vmmemWSL]] | 2,627 ميجا |
| [[Memory Compression]] | 1,155 |
| [[chrome]] | **737** |

Chrome تالت بـ ٧٣٧ ميجا. مش كتير، صح؟

**بس جمّعهم بالاسم:**

| البرنامج | عدد العمليات | الرام |
|---|---|---|
| **chrome** | **59** | **10,569 ميجا** |
| Code | 19 | 2,760 |
| vmmemWSL | 1 | 2,716 |

**Chrome = ٥٩ عملية = ١٠.٥ جيجا.** كل تاب وكل إضافة عملية لوحدها. فـ [[Get-Process | Sort-Object]] لوحده بيخبّي الحقيقة.

**و [[vmmemWSL]]** ده الجهاز الوهمي بتاع WSL و Docker. لو مش مستخدمهم، [[wsl --shutdown]] بيرجّع الرام دي.

**والبرامج اللي بتفتح مع الجهاز:** [[Get-CimInstance Win32_StartupCommand]] طلّع **١١ برنامج** على جهاز التجربة — منهم Docker Desktop، وبرامج تانية كتير ممكن متكونش محتاجها تفتح مع كل boot.`,
          example: R`# Windows (PowerShell):
Get-Process | Sort-Object WorkingSet64 -Descending | Select-Object -First 3 Name, @{n='RAM(MB)';e={[math]::Round($_.WorkingSet64/1MB)}}
Get-Process | Group-Object Name | ForEach-Object { [pscustomobject]@{ Name=$_.Name; Count=$_.Count; 'RAM(MB)'=[math]::Round(($_.Group | Measure-Object WorkingSet64 -Sum).Sum/1MB) } } | Sort-Object 'RAM(MB)' -Descending | Select-Object -First 3
Get-CimInstance Win32_StartupCommand | Select-Object Name, Location
# Linux:
ps -eo pid,comm,%mem,%cpu --sort=-%mem | head -5`,
          lines: [
            R`أكبر ٣ **عمليات** — كل واحدة لوحدها.`,
            R`**متجمّعة بالاسم**: [[Group-Object Name]]، وبعدين مجموع الرام لكل مجموعة. ده الرقم الحقيقي.`,
            R`البرامج اللي بتفتح مع الجهاز، ومنين بتتفتح (فولدر Startup ولا الـ registry).`,
            R`لينكس: أكتر ٥ عمليات رام، ومعاهم المعالج.`,
          ],
          try: R`شغّل الأمر الأول والتاني ورا بعض وقارن. وبعدين اقفل نص تابات المتصفح وشغّل التاني تاني. ولو عندك WSL أو Docker مش محتاجهم دلوقتي: [[wsl --shutdown]] وشوف [[vmmemWSL]] اختفى.`,
          deep: {
            why: R`Task Manager بيجمّع لوحده، بس من الترمنال تقدر تحطه في سكربت، أو تراقبه، أو تعمله على جهاز تاني.`,
            how: R`**WorkingSet مقابل غيره:** [[WorkingSet64]] = الرام اللي العملية ماسكاها دلوقتي (ومنها حاجات مشتركة مع عمليات تانية). فمجموع كل العمليات ممكن يطلع أكبر من الرام الفعلية شوية. للمقارنة بين البرامج كفاية. ولو عايز أدق: [[PrivateMemorySize64]].

**المعالج:** [[CPU]] في [[Get-Process]] = **ثواني** استخدمتها العملية من ساعة ما فتحت — مش النسبة دلوقتي. عشان كده عملية مفتوحة من يومين ممكن تبان «تقيلة» وهي هادية. للاستهلاك اللحظي:

~~~powershell
Get-Counter '\Process(*)\% Processor Time' -SampleInterval 1 -MaxSamples 1 |
  Select-Object -ExpandProperty CounterSamples | Sort-Object CookedValue -Descending | Select-Object -First 5 InstanceName, CookedValue
~~~

(ده من وثائق [[Get-Counter]] — أسماء العدّادات بالإنجليزي بس على ويندوز إنجليزي.)

**البرامج اللي بتفتح مع الجهاز:** [[Win32_StartupCommand]] بيقرا فولدر Startup ومفاتيح [[Run]] في الـ registry. **مبيشوفش** المهام المجدولة ([[Get-ScheduledTask]]) ولا الخدمات ([[Get-Service | Where StartType -eq Automatic]]). وللقفل: Task Manager ← Startup apps، أو إعدادات البرنامج نفسه — أأمن من إنك تمسح من الـ registry.

**[[vmmemWSL]]:** WSL بياخد رام ومبيرجّعهاش بسرعة. [[wsl --shutdown]] بيقفل كل توزيعات WSL (ومعاهم Docker Desktop لو شغّال عليه). وفيه إعداد [[memory=]] في [[.wslconfig]] بيحدد أقصى رام. (من وثائق WSL.)`,
            when: R`الجهاز تقيل، أو المروحة شغالة على الآخر، أو قبل ما تقرر تزوّد رام.`,
            mistakes: R`تبص على العمليات من غير تجميع. أو تقرا [[CPU]] كنسبة. أو تمسح من الـ registry بدل إعدادات البرنامج. أو [[wsl --shutdown]] وانت ناسي إن Docker شغّال عليه.`
          },
          teach: R`## أكبر ٣ عمليات

~~~powershell
Get-Process | Sort-Object WorkingSet64 -Descending | Select-Object -First 3 Name,
  @{n='RAM(MB)';e={[math]::Round($_.WorkingSet64/1MB)}}
~~~

~~~text اتشغّل فعلًا
Name               RAM(MB)
----               -------
vmmemWSL              2627
Memory Compression    1155
chrome                 737
~~~

Chrome ٧٣٧ ميجا. مش كتير؟

---

## ١. جمّعهم بالاسم

~~~powershell
Get-Process | Group-Object Name | ForEach-Object {
  [pscustomobject]@{ Name=$_.Name; Count=$_.Count;
    'RAM(MB)'=[math]::Round(($_.Group | Measure-Object WorkingSet64 -Sum).Sum/1MB) }
} | Sort-Object 'RAM(MB)' -Descending | Select-Object -First 3
~~~

~~~text اتشغّل فعلًا
Name     Count  RAM(MB)
----     -----  -------
chrome      59    10569
Code        19     2760
vmmemWSL     1     2716
~~~

**Chrome = ٥٩ عملية = ١٠.٥ جيجا.** كل تاب وكل إضافة عملية.

---

## ٢. [[vmmemWSL]]

الجهاز الوهمي بتاع WSL و Docker.

~~~powershell
wsl --shutdown        # بيرجّع الرام — ويقفل Docker Desktop لو شغّال عليه
~~~

---

## ٣. اللي بيفتح مع الجهاز

~~~powershell
Get-CimInstance Win32_StartupCommand | Select-Object Name, Location
~~~

~~~text اتشغّل فعلًا
١١ برنامج — من فولدر Startup ومن مفاتيح Run في الـ registry
~~~

> **مبيشوفش** المهام المجدولة ولا الخدمات. وللقفل: Task Manager ← Startup apps، مش الـ registry.

---

## ٤. [[CPU]] مش نسبة

[[CPU]] في [[Get-Process]] = **ثواني** من ساعة ما العملية فتحت. فالمفتوح من يومين يبان تقيل وهو هادي.

---

## الخلاصة

- العمليات لوحدها بتخبّي البرامج الكبيرة.
- [[Group-Object Name]] = الرقم الحقيقي.
- [[vmmemWSL]] = WSL و Docker.
- [[CPU]] ثواني، مش في المية.`,
          sol: R`العمليات والتجميع والبرامج اللي بتفتح مع الجهاز اتشغّلوا في PowerShell 7.6 على جهاز التجربة. [[Get-Counter]] و [[.wslconfig]] من الوثائق، وأمر لينكس على أوبونتو جوه Docker.`,
          solCode: R`# أكبر 3 عمليات:  vmmemWSL 2627 | Memory Compression 1155 | chrome 737
# متجمّعين:       chrome 59 عملية 10569 ميجا | Code 19 عملية 2760 | vmmemWSL 2716
# Win32_StartupCommand: 11 برنامج`
        }
      ]
    }
]);
