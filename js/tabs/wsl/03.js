// ملف إضافي لتاب wsl: الحقول نفس شكلها في 01.js.

MORE("wsl", [
  {
    t: "WSL من جوه: التشخيص والديسك والـ GPU والـ USB",
    l: 2,
    n: "تعرف نسختك وحالتها، وتظبط الإعدادات المتقدمة، وتنقل التوزيعة وتوفّر الديسك، وتعمل توزيعة من Docker image، وتستخدم كارت الشاشة والـ USB",
    items: [
      {
        cmd: "تشخيص WSL",
        title: "wsl --version و --status و -l -o",
        desc: R`قبل ما تدوّر على حل لأي مشكلة في WSL، اعرف عندك إيه: [[wsl --version]] بيطبع نسخة WSL والـ kernel و WSLg، و [[wsl --status]] التوزيعة الافتراضية ونسختها، و [[wsl -l --running]] اللي شغال دلوقتي، و [[wsl -l -o]] التوزيعات المتاحة للتسطيب.

الأوامر دي بتقرا بس، ومش بتغيّر حاجة. اتشغّلت في PowerShell 7.6 على ويندوز 11 (WSL 2.7.14). و [[$env:WSL_UTF8 = 1]] في الأول عشان الناتج يتقري صح لو بتعمله pipe لأمر تاني.`,
        example: R`# Windows (PowerShell):
$env:WSL_UTF8 = 1
wsl --version
wsl --status
wsl -l --running
wsl -l -o
wsl --version | Select-String "Kernel"`,
        try: "شغّل [[wsl --version | Select-String Kernel]] مرة من غير [[$env:WSL_UTF8 = 1]] ومرة بيه، وقارن. وبعدين قارن [[Kernel version]] عندك بآخر نسخة في صفحة WSL releases على GitHub.",
        deep: {
          why: "نص مشاكل WSL اتحلت في نسخة أحدث: systemd، و mirrored networking، و dnsTunneling، ورجوع الرام. فأول سؤال في أي issue أو منتدى: نسختك كام؟ ومن غير الأمر ده هتجرّب حلول لمشكلة اتحلت خلاص.",
          how: R`[[wsl --version]] (أو [[-v]]): نسخة حزمة WSL نفسها (من الـ Store، بتتحدث بـ [[wsl --update]])، والـ kernel (لينكس اللي Microsoft بتبنيه)، و WSLg (البرامج الرسومية)، و Direct3D و DXCore (اللي بيوصّلوا كارت الشاشة)، ونسخة ويندوز. لو الأمر ده مش موجود عندك، يبقى WSL قديم من جوه ويندوز ومحتاج [[wsl --update]].

[[--status]]: التوزيعة الافتراضية (اللي [[wsl]] لوحده بيفتحها) والنسخة الافتراضية للتوزيعات الجديدة (1 أو 2).

[[-l]] (list): [[-v]] بالحالة والنسخة (درس [[wsl -l -v]])، و [[--running]] الشغال بس، و [[-o]] (online) التوزيعات اللي تقدر تسطّبها بـ [[wsl --install اسم]].

[[WSL_UTF8]]: [[wsl.exe]] بيطبع افتراضيًا بـ UTF-16، والشاشة بتعرضه عادي، بس لما تعمله pipe لـ [[Select-String]] أو تحفظه في ملف بيبقى بين كل حرف والتاني حرف فاضي فالبحث مبيلاقيش حاجة. [[$env:WSL_UTF8 = 1]] بيخليه UTF-8 للجلسة دي بس.`,
          when: "قبل ما تفتح issue أو تسأل، وبعد أي [[wsl --update]]، ولما تلاقي حل على النت مكتوب «من نسخة كذا».",
          mistakes: R`تفتكر إن [[wsl --version]] و [[wsl -l -v]] نفس الحاجة (الأولى نسخة WSL، التانية نسخة كل توزيعة 1 ولا 2). وتعمل [[Select-String]] على ناتج wsl فتلاقيه فاضي وتفتكر المشكلة في الفلتر.`
        },
        teach: R`## الفكرة: ٤ أسئلة قبل أي حل

| السؤال | الأمر |
|---|---|
| نسخة WSL والـ kernel كام؟ | [[wsl --version]] |
| الافتراضي إيه؟ | [[wsl --status]] |
| مين شغال دلوقتي؟ | [[wsl -l --running]] |
| إيه المتاح للتسطيب؟ | [[wsl -l -o]] |

كلهم بيقروا بس. اتشغّلوا في PowerShell 7.6 على ويندوز 11، والجهاز ده عليه توزيعة واحدة بس: [[docker-desktop]] (اللي Docker Desktop بيعملها).

---

## ١. [[$env:WSL_UTF8 = 1]]

[[$env:]] متغيرات البيئة في PowerShell (درس «CPU و RAM والديسك» في تاب ابدأ من هنا)، والسطر ده بيعمل متغير اسمه [[WSL_UTF8]] بقيمة 1 **للجلسة دي بس**.

ليه؟ [[wsl.exe]] بيطبع بـ UTF-16 (كل حرف إنجليزي ٢ byte). الشاشة بتعرضه عادي، بس لما ناتجه يدخل أمر تاني بيبان كده:

~~~text الناتج من غير WSL_UTF8 لما اتقرا كنص
W S L   v e r s i o n :   2 . 7 . 1 4 . 0
~~~

والتجربة:

~~~powershell
wsl --version | Select-String "Kernel"
~~~

| | الناتج |
|---|---|
| من غير [[WSL_UTF8]] | ولا حاجة |
| بعد [[$env:WSL_UTF8 = 1]] | [[Kernel version: 6.18.33.2-2]] |

---

## ٢. [[wsl --version]]

~~~text الناتج
WSL version: 2.7.14.0
Kernel version: 6.18.33.2-2
WSLg version: 1.0.73.2
MSRDC version: 1.2.7214
Direct3D version: 1.611.1-81528511
DXCore version: 10.0.26100.1-240331-1435.ge-release
Windows version: 10.0.26300.9711
~~~

| السطر | معناه |
|---|---|
| [[WSL version]] | حزمة WSL (من الـ Store). [[wsl --update]] بيحدّثها |
| [[Kernel version]] | لينكس اللي شغال تحت كل التوزيعات. نفس الرقم في [[uname -r]] جواها |
| [[WSLg version]] | تشغيل برامج لينكس بشباك على ويندوز |
| [[MSRDC]] | Remote Desktop Client اللي WSLg بيستخدمه يعرض الشبابيك |
| [[Direct3D]] و [[DXCore]] | اللي بيوصّلوا كارت الشاشة للينكس (درس [[GPU و CUDA]]) |
| [[Windows version]] | ويندوز نفسه |

> الـ kernel واحد لكل التوزيعات: Ubuntu و Debian جنب بعض بيشتغلوا على نفس [[6.18.33.2]].

---

## ٣. [[wsl --status]]

~~~text الناتج
Default Distribution: docker-desktop
Default Version: 2
~~~

- [[Default Distribution]]: اللي [[wsl]] لوحده بيفتحه. هنا [[docker-desktop]] لأنها الوحيدة. لما تسطّب Ubuntu خليه هو الافتراضي: [[wsl --set-default Ubuntu-24.04]].
- [[Default Version: 2]]: أي توزيعة جديدة هتبقى WSL 2.

---

## ٤. [[wsl -l --running]]

~~~text الناتج
Windows Subsystem for Linux Distributions:
docker-desktop (Default)
~~~

[[--running]] اللي شغال بس. لو مفيش، الرسالة بتبقى [[There are no running distributions.]] (من الـ docs)، وده اللي بتستناه بعد تعديل الإعدادات: الـ docs بتقول استنى حوالي ٨ ثواني بعد ما تقفل كل الترمنالات، أو [[wsl --shutdown]].

---

## ٥. [[wsl -l -o]]

~~~text الناتج (أول سطور)
NAME                            FRIENDLY NAME
Ubuntu                          Ubuntu
Ubuntu-26.04                    Ubuntu 26.04 LTS
Ubuntu-24.04                    Ubuntu 24.04 LTS
Ubuntu-22.04                    Ubuntu 22.04 LTS
openSUSE-Tumbleweed             openSUSE Tumbleweed
kali-linux                      Kali Linux Rolling
Debian                          Debian GNU/Linux
archlinux                       Arch Linux
FedoraLinux-44                  Fedora Linux 44
~~~

[[-o]] = online: بيجيب القايمة من النت. العمود الأول هو الاسم اللي بتكتبه في [[wsl --install]]. [[Ubuntu]] من غير رقم = أحدث LTS، والأحسن تكتب الرقم صريح عشان تعرف انت على إيه.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| النسخ كلها | [[wsl --version]] |
| الافتراضي | [[wsl --status]] |
| الشغال | [[wsl -l --running]] |
| المتاح | [[wsl -l -o]] |
| تعمل pipe للناتج | [[$env:WSL_UTF8 = 1]] الأول |`,
        lines: [
          R`خلّي wsl يطبع UTF-8 في الجلسة دي.`,
          R`نسخة WSL والـ kernel و WSLg و ويندوز.`,
          R`التوزيعة الافتراضية والنسخة الافتراضية.`,
          R`التوزيعات الشغالة دلوقتي.`,
          R`التوزيعات المتاحة للتسطيب (من النت).`,
          R`سطر الـ kernel بس.`
        ],
        sol: R`في PowerShell 7.6 على الجهاز ده: من غير [[WSL_UTF8]] الـ [[Select-String]] مطلعش حاجة، وبعد [[$env:WSL_UTF8 = 1]] طلع [[Kernel version: 6.18.33.2-2]].

لو الـ kernel عندك أقدم من اللي في صفحة الـ releases: [[wsl --update]] (بيغيّر حاجة على الجهاز، فاعمله وانت عارف) وبعدين [[wsl --shutdown]].`
      },
      {
        cmd: ".wslconfig المتقدم",
        title: "الرام بترجع، والديسك sparse، والشبكة mirrored",
        desc: R`درس [[.wslconfig و wsl.conf]] شرح [[memory]] و [[processors]]. هنا الإعدادات اللي بتفرق في الشغل اليومي: [[autoMemoryReclaim]] (WSL يرجّع الرام لويندوز)، و [[sparseVhd]] (الديسك يصغر لوحده)، و [[networkingMode]] (NAT ولا mirrored)، و [[dnsTunneling]] و [[firewall]] و [[hostAddressLoopback]] و [[vmIdleTimeout]].

الدرس من صفحة «Advanced settings configuration in WSL» في docs مايكروسوفت (نسخة أكتوبر 2026). على الجهاز ده [[.wslconfig]] مش موجود ([[Test-Path]] رجّع [[False]])، ومتعدّلش عليه.`,
        example: R`# %UserProfile%\.wslconfig
[wsl2]
memory=8GB
processors=6
networkingMode=mirrored
dnsTunneling=true
firewall=true
vmIdleTimeout=120000

[experimental]
autoMemoryReclaim=gradual
sparseVhd=true
hostAddressLoopback=true
# Windows (PowerShell): check it exists, then restart WSL to apply
Test-Path $env:USERPROFILE\.wslconfig
wsl --shutdown`,
        try: "افتح تطبيق «WSL Settings» من قايمة Start وشوف كل إعداد من دول فين فيه. ولو هتغيّر: انسخ الملف الأول، وغيّر حاجة واحدة، و [[wsl --shutdown]]، وجرّب.",
        flag: "script",
        deep: {
          why: "WSL بياخد رام لما بتعمل build ومش دايمًا بيرجّعها، فويندوز يقيل. والديسك بتاع لينكس ([[ext4.vhdx]]) بيكبر ومش بيصغر. و NAT بيعمل مشاكل مع VPN ومع إن موبايلك يوصل لسيرفر جوه WSL. كل ده إعداد سطر.",
          how: R`الملف [[%UserProfile%\.wslconfig]] (مش موجود افتراضيًا، بتعمله). قسمين مهمين:

[[[wsl2]]] من الـ docs: [[memory]] (الافتراضي ٥٠٪ من رام ويندوز)، و [[processors]] (الافتراضي كل الـ logical processors)، و [[networkingMode]] (الافتراضي [[NAT]]، والقيم: [[none]] و [[nat]] و [[mirrored]] و [[consomme]]، و [[bridged]] بقى deprecated)، و [[dnsTunneling]] (الافتراضي [[true]]: طلبات DNS بتعدّي لويندوز بطريقة بتشتغل أحسن مع VPN)، و [[firewall]] (الافتراضي [[true]]: قواعد فايروول ويندوز بتطبق على WSL)، و [[vmIdleTimeout]] (الافتراضي ٦٠٠٠٠ مللي ثانية: الـ VM بتقفل بعد دقيقة من غير استخدام)، و [[localhostForwarding]] (بيتجاهل مع mirrored).

[[[experimental]]]: [[autoMemoryReclaim]] (الافتراضي دلوقتي [[dropCache]]: الكاش بيتمسح على طول؛ [[gradual]] بالراحة؛ [[disabled]] مقفول)، و [[sparseVhd]] (الافتراضي [[false]]: [[true]] أي ديسك **جديد** بيبقى sparse ويرجّع المساحة اللي اتمسحت)، و [[hostAddressLoopback]] (مع mirrored: ويندوز و WSL يكلموا بعض بـ IP ويندوز على الشبكة مش بس 127.0.0.1).

mirrored ولا NAT: NAT يعني WSL ليه IP داخلي ([[172.x]]) وويندوز بيعمل forwarding لـ localhost. mirrored يعني WSL شايف نفس كروت شبكة ويندوز ونفس الـ IPs، فـ localhost بيشتغل في الاتجاهين، و IPv6 بيشتغل، والموبايل يوصل لسيرفر جوه WSL على IP ويندوز (مع الفايروول)، و VPN بيشتغل أحسن. mirrored محتاج ويندوز 11 22H2 أو أحدث.

القيم اللي فيها مسار بتتكتب بـ [[\\]] مزدوجة ([[C:\\Temp\\kernel]])، والأحجام بوحدة ([[8GB]] و [[512MB]]). والتغيير بيطبق بعد ما الـ VM تقفل كلها ([[wsl --shutdown]] أو استنى ٨ ثواني بعد ما تقفل كل حاجة). ولو الملف فيه غلط، WSL بيشتغل عادي من غير الإعدادات (من الـ docs).`,
          when: "جهاز رامه ١٦ جيجا أو أقل (memory و autoMemoryReclaim). ديسك C صغير (sparseVhd). موبايل أو جهاز تاني لازم يوصل لسيرفر جوه WSL، أو VPN بيبوّظ الشبكة (mirrored).",
          mistakes: R`تحط [[autoMemoryReclaim]] تحت [[[wsl2]]] بدل [[[experimental]]] فيتجاهل من غير رسالة. وتفتكر [[sparseVhd=true]] بيصغّر الديسك الموجود (بيأثر على الجديد بس؛ الموجود بـ [[wsl --manage --set-sparse]] في الدرس الجاي). وتعدّل وتفتح ترمنال على طول فتفتكر الإعداد مشتغلش.`
        },
        teach: R`## الفكرة: ملف واحد للـ VM كلها

> الإعدادات والقيم الافتراضية هنا من docs مايكروسوفت («Advanced settings configuration in WSL»، آخر تحديث أكتوبر 2026). على الجهاز ده الملف مش موجود، والدرس مش بيعدّل عليه.

WSL 2 كله VM واحدة صغيرة، وكل التوزيعات جواها. [[.wslconfig]] بيظبط الـ VM دي، فالإعداد بيطبق على كل التوزيعات مرة واحدة. ولكل توزيعة لوحدها فيه [[/etc/wsl.conf]] (الدرس اللي في تاب WSL المستوى ٢).

---

## ١. فين الملف وهل موجود؟

~~~powershell
Test-Path $env:USERPROFILE\.wslconfig
~~~

~~~text الناتج على الجهاز ده
False
~~~

[[$env:USERPROFILE]] = [[C:\Users\ali]]. والملف مش موجود، يعني كل حاجة بالقيم الافتراضية. والـ docs بتنصح تعدّل من تطبيق **WSL Settings** (في قايمة Start) بدل ما تكتب الملف بإيدك، وهو بيكتبه.

---

## ٢. [[[wsl2]]]

~~~text
[wsl2]
memory=8GB
processors=6
networkingMode=mirrored
dnsTunneling=true
firewall=true
vmIdleTimeout=120000
~~~

| الإعداد | الافتراضي | القيمة هنا | ليه |
|---|---|---|---|
| [[memory]] | ٥٠٪ من الرام | [[8GB]] | حد أقصى، ويندوز يفضل مرتاح |
| [[processors]] | كل الـ logical processors | [[6]] | سيب لويندوز شوية |
| [[networkingMode]] | [[NAT]] | [[mirrored]] | تحت |
| [[dnsTunneling]] | [[true]] | [[true]] | DNS بيعدّي لويندوز، أحسن مع VPN |
| [[firewall]] | [[true]] | [[true]] | فايروول ويندوز بيحمي WSL كمان |
| [[vmIdleTimeout]] | [[60000]] | [[120000]] | الـ VM تقفل بعد دقيقتين من غير شغل بدل دقيقة |

[[vmIdleTimeout]] بالمللي ثانية: ١٢٠٠٠٠ = ١٢٠ ثانية.

### NAT ولا mirrored؟

| | NAT (الافتراضي) | mirrored |
|---|---|---|
| IP لينكس | داخلي ([[172.x]]) | نفس IPs ويندوز |
| ويندوز → سيرفر في WSL على localhost | ✓ (forwarding) | ✓ |
| WSL → سيرفر على ويندوز على localhost | ✗ | ✓ |
| الموبايل → سيرفر في WSL | محتاج portproxy | IP ويندوز مباشرة (مع الفايروول) |
| IPv6 | ✗ | ✓ |
| VPN | مشاكل أكتر | أحسن |
| محتاج | أي ويندوز | ويندوز 11 22H2+ |

(ملخص من docs الشبكة في WSL. شرح NAT والبورتات عمليًا في درس [[الشبكة والبورتات]].)

---

## ٣. [[[experimental]]]

~~~text
[experimental]
autoMemoryReclaim=gradual
sparseVhd=true
hostAddressLoopback=true
~~~

| الإعداد | الافتراضي | معناه |
|---|---|---|
| [[autoMemoryReclaim]] | [[dropCache]] | إزاي الرام اللي لينكس كان عامل بيها cache ترجع لويندوز: [[dropCache]] على طول، [[gradual]] بالراحة، [[disabled]] لأ |
| [[sparseVhd]] | [[false]] | أي ديسك **جديد** يتعمل sparse: المساحة اللي بتتمسح جوه لينكس بترجع لويندوز |
| [[hostAddressLoopback]] | [[false]] | مع mirrored بس: ويندوز و WSL يكلموا بعض بـ IP الجهاز على الشبكة، مش بس [[127.0.0.1]] |

> اسمه experimental لأنه لسه مش الافتراضي. لو حطيته تحت [[[wsl2]]] بيتجاهل من غير ولا رسالة.

---

## ٤. التطبيق

~~~powershell
wsl --shutdown
~~~

بيقفل كل التوزيعات والـ VM (Docker Desktop كمان لو شغال عليها)، وأول ما تفتح ترمنال الإعدادات الجديدة بتتقري. ومن غيره لازم تستنى الـ VM تقفل لوحدها (الـ docs بتقول حوالي ٨ ثواني بعد ما تقفل كل حاجة، و [[wsl -l --running]] يأكد).

لو كتبت حاجة غلط في الملف، WSL بيشتغل عادي **من غير** الإعدادات، فاتأكد من جوه: [[free -h]] للرام و [[nproc]] للمعالج و [[ip addr]] للشبكة.

---

## الخلاصة

| عايز | السطر | القسم |
|---|---|---|
| حد للرام | [[memory=8GB]] | [[[wsl2]]] |
| الرام ترجع بالراحة | [[autoMemoryReclaim=gradual]] | [[[experimental]]] |
| الديسك الجديد يصغر لوحده | [[sparseVhd=true]] | [[[experimental]]] |
| localhost في الاتجاهين و VPN أحسن | [[networkingMode=mirrored]] | [[[wsl2]]] |
| الإعدادات تطبق | [[wsl --shutdown]] | PowerShell |`,
        lines: [
          R`قسم إعدادات الـ VM.`,
          R`أقصى رام ٨ جيجا.`,
          R`٦ معالجات.`,
          R`الشبكة نفس شبكة ويندوز.`,
          R`DNS عبر ويندوز (الافتراضي).`,
          R`فايروول ويندوز يطبق على WSL (الافتراضي).`,
          R`الـ VM تقفل بعد دقيقتين من غير شغل.`,
          R`قسم الإعدادات التجريبية.`,
          R`الرام ترجع لويندوز بالراحة.`,
          R`الديسكات الجديدة sparse.`,
          R`ويندوز و WSL يكلموا بعض بـ IP الجهاز (مع mirrored).`,
          R`الملف موجود؟`,
          R`اقفل WSL كله عشان الإعدادات تتقري.`
        ],
        sol: R`في WSL Settings: Memory and processor فيها memory و processors و swap، و Networking فيها networking mode و DNS tunneling و firewall و host address loopback، و Optional features فيها autoMemoryReclaim و sparse VHD (حسب الـ docs؛ أسامي الصفحات ممكن تختلف شوية بين النسخ).

وبعد أي تعديل: [[wsl --shutdown]]، وجوه لينكس [[free -h]] و [[nproc]] يأكدوا الرام والمعالج، و [[ip addr]] يوريك IP ويندوز نفسه لو mirrored اشتغل.`
      },
      {
        cmd: "نقل التوزيعة وتوفير الديسك",
        title: "wsl --manage: --move و --set-sparse و --resize",
        desc: R`كل توزيعة عايشة في ملف [[ext4.vhdx]]، وده بيكبر بالجيجات على درايف C. [[wsl --manage اسم --move D:\WSL\اسم]] بينقله لدرايف تاني، و [[--set-sparse true]] بيخليه يرجّع المساحة اللي بتتمسح جوه لينكس، و [[--resize]] بيكبّر الحد الأقصى.

اتشغّل هنا (قراية بس): مكان التوزيعة من الـ registry، وحجم ملفات الـ vhdx، وهل sparse ولا لأ. أوامر [[--manage]] بتغيّر الجهاز فمتشغّلتش؛ صيغتها من [[wsl --help]] على WSL 2.7.14.`,
        example: R`# Windows (PowerShell): where each distro lives (read only)
Get-ChildItem HKCU:\Software\Microsoft\Windows\CurrentVersion\Lxss | ForEach-Object { "{0} -> {1}" -f $_.GetValue('DistributionName'), $_.GetValue('BasePath') }
Get-ChildItem "$env:LOCALAPPDATA\Docker\wsl" -Recurse -Filter *.vhdx | Select-Object Name, @{n='GB';e={[math]::Round($_.Length/1GB,1)}}
fsutil sparse queryflag "$env:LOCALAPPDATA\Docker\wsl\main\ext4.vhdx"
# changes (not run here):
wsl --shutdown
wsl --manage Ubuntu-24.04 --move D:\WSL\Ubuntu-24.04
wsl --manage Ubuntu-24.04 --set-sparse true`,
        try: "شغّل أول أمر وشوف كل توزيعاتك فين. لو على C ودرايف تاني فيه مساحة: [[wsl --export]] باك أب الأول (درس [[إدارة WSL]])، وبعدين [[--move]].",
        deep: {
          why: "درايف C صغير غالبًا (الـ SSD الأساسي)، وتوزيعة شغالة فيها Docker و node_modules بتوصل ٥٠ و ١٠٠ جيجا. والملف مش بيصغر لوحده لما تمسح، فبتلاقي C مليان من غير ما تعرف ليه.",
          how: R`كل توزيعة ليها key في [[HKCU:\Software\Microsoft\Windows\CurrentVersion\Lxss]] (قراية الـ registry مش بتغيّر حاجة): [[DistributionName]] الاسم و [[BasePath]] الفولدر اللي فيه [[ext4.vhdx]]. التوزيعات الجديدة افتراضيًا في [[%LOCALAPPDATA%\wsl]] (الـ docs: [[distributionInstallPath]] في [[[general]]] بيغيّره)، والقديمة كانت في [[%LOCALAPPDATA%\Packages]].

[[$_.Length/1GB]] حجم الملف بالجيجا (تقسيم على [[1GB]] جاهزة في PowerShell). و [[@{n='GB';e={...}}]] عمود محسوب في [[Select-Object]]: [[n]] اسمه و [[e]] المعادلة.

[[fsutil sparse queryflag]] بيقول الملف sparse ولا لأ (قراية بس). الـ sparse: المساحة اللي بتتمسح جوه لينكس بترجع لويندوز لوحدها. من غيره لازم تضغطه يدوي (درس [[مشاكل شائعة]]).

[[wsl --manage <Distro> --move <Location>]]: «Move the distribution to a new location» (من [[wsl --help]]). لازم التوزيعة متكونش شغالة، فـ [[wsl --shutdown]] الأول. البديل القديم: [[--export]] بعدين [[--unregister]] بعدين [[--import]] في المكان الجديد.

[[--set-sparse true]] (أو [[-s]]): «allowing disk space to be automatically reclaimed». و [[--resize 512GB]] بيغيّر الحد الأقصى. و [[--set-default-user]] بيغيّر اليوزر الافتراضي من بره.`,
          when: "أول ما تلاقي C فاضل فيه أقل من ٢٠ جيجا، أو قبل ما تبدأ مشاريع تقيلة جوه WSL (Docker و AI models).",
          mistakes: R`تنقل فولدر الـ vhdx بإيدك بـ Explorer فـ WSL ميلاقيهوش. و [[--move]] من غير export قبلها (لو حصل حاجة في النص مفيش رجوع). و [[docker_data.vhdx]] بتاع Docker Desktop: ده بيتنقل من إعدادات Docker Desktop نفسه (Resources ثم Disk image location)، مش بـ [[wsl --manage]].`
        },
        teach: R`## الفكرة: التوزيعة = ملف واحد كبير

كل توزيعة WSL 2 عايشة في ملف ديسك افتراضي اسمه [[ext4.vhdx]]. لينكس شايفه ديسك ext4، وويندوز شايفه ملف عادي. الملف ده بيكبر لما تكتب جوه لينكس، و**مش** بيصغر لما تمسح (إلا لو sparse).

اتشغّلت أوامر القراية في PowerShell 7.6 على جهاز عليه [[docker-desktop]] بس.

---

## ١. كل توزيعة فين؟

~~~powershell
Get-ChildItem HKCU:\Software\Microsoft\Windows\CurrentVersion\Lxss | ForEach-Object { "{0} -> {1}" -f $_.GetValue('DistributionName'), $_.GetValue('BasePath') }
~~~

من جوه لبرة:

| الحتة | معناها |
|---|---|
| [[HKCU:\...\Lxss]] | فولدر في الـ registry (HKCU = اليوزر الحالي)، فيه key لكل توزيعة |
| [[Get-ChildItem]] | هات الـ keys اللي جواه |
| [[ForEach-Object { ... }]] | لكل واحد، و [[$_]] هو الحالي |
| [[$_.GetValue('DistributionName')]] | اقرا قيمة الاسم |
| [[$_.GetValue('BasePath')]] | اقرا قيمة المسار |
| [["{0} -> {1}" -f ...]] | [[-f]] بيحط القيمتين مكان [[{0}]] و [[{1}]] |

~~~text الناتج
docker-desktop -> \\?\C:\Users\ali\AppData\Local\Docker\wsl\main
~~~

[[\\?\]] قبل المسار صيغة ويندوز للمسارات الطويلة، تجاهلها. ولو عندك Ubuntu هيظهر سطر زي [[Ubuntu-24.04 -> C:\Users\ali\AppData\Local\wsl\{...}]].

---

## ٢. حجم الملفات

~~~powershell
Get-ChildItem "$env:LOCALAPPDATA\Docker\wsl" -Recurse -Filter *.vhdx | Select-Object Name, @{n='GB';e={[math]::Round($_.Length/1GB,1)}}
~~~

- [[-Recurse]] في كل الفولدرات اللي جوه، و [[-Filter *.vhdx]] الملفات دي بس.
- [[@{n='GB';e={...}}]]: عمود محسوب. [[n]] = name، و [[e]] = expression: [[$_.Length]] الحجم بالـ byte، على [[1GB]]، مقرّب لرقم عشري واحد.

~~~text الناتج
Name                GB
----                --
docker_data.vhdx 45.40
ext4.vhdx         0.10
~~~

- [[ext4.vhdx]] (٠.١ جيجا): توزيعة [[docker-desktop]] نفسها، صغيرة.
- [[docker_data.vhdx]] (٤٥.٤ جيجا): كل الـ images والـ containers والـ volumes بتوع Docker. ده اللي بياكل C.

---

## ٣. sparse ولا لأ؟

~~~powershell
fsutil sparse queryflag "$env:LOCALAPPDATA\Docker\wsl\main\ext4.vhdx"
~~~

~~~text الناتج
This file is NOT set as sparse
~~~

و [[docker_data.vhdx]] نفس الحكاية. يعني أي حاجة تتمسح جواهم المساحة مش بترجع لويندوز لوحدها.

---

## ٤. التغيير (مش متشغّل هنا، الصيغة من [[wsl --help]])

~~~powershell
wsl --shutdown
wsl --manage Ubuntu-24.04 --move D:\WSL\Ubuntu-24.04
wsl --manage Ubuntu-24.04 --set-sparse true
~~~

من [[wsl --help]] على WSL 2.7.14:

~~~text الناتج
    --manage <Distro> <Options...>
        Changes distro specific options.
            --move <Location>
                Move the distribution to a new location.
            --set-sparse, -s <true|false>
                Set the VHD of distro to be sparse, allowing disk space to be automatically reclaimed.
            --set-default-user <Username>
            --resize <MemoryString>
                Resize the disk of the distribution to the specified size.
~~~

| الأمر | بيعمل إيه |
|---|---|
| [[wsl --shutdown]] | لازم الأول: التوزيعة متكونش شغالة |
| [[--move D:\WSL\Ubuntu-24.04]] | ينقل الـ vhdx ويحدّث الـ registry |
| [[--set-sparse true]] | المساحة اللي بتتمسح ترجع لويندوز |
| [[--resize 512GB]] | يغيّر الحد الأقصى للديسك |

> قبل [[--move]]: [[wsl --export]] باك أب (درس [[إدارة WSL]]). ولـ Docker Desktop: المكان بيتغيّر من إعداداته (Resources ثم Disk image location)، مش من هنا.

---

## الخلاصة

1. [[Lxss]] في الـ registry بيقولك كل توزيعة فين.
2. الملف بيكبر ومش بيصغر إلا لو sparse.
3. [[wsl --manage ... --move]] لدرايف تاني، و [[--set-sparse true]] عشان يصغر لوحده، و [[sparseVhd=true]] في [[.wslconfig]] للتوزيعات الجديدة.`,
        lines: [
          R`كل توزيعة واسمها ومسارها من الـ registry (قراية).`,
          R`ملفات الـ vhdx وحجمها بالجيجا.`,
          R`الملف sparse ولا لأ (قراية).`,
          R`اقفل WSL كله.`,
          R`انقل التوزيعة لدرايف D.`,
          R`خلّي ديسكها sparse.`
        ],
        sol: R`على الجهاز ده: [[docker-desktop -> \\?\C:\Users\ali\AppData\Local\Docker\wsl\main]]، و [[docker_data.vhdx]] ٤٥.٤ جيجا و [[ext4.vhdx]] ٠.١، والاتنين [[This file is NOT set as sparse]].

عندك: لو التوزيعة في [[C:\Users\...\AppData\Local\wsl]] وفيه درايف تاني: export، و [[wsl --shutdown]]، و [[--move]]، وبعدين [[wsl -d اسم]] يفتح عادي من المكان الجديد.`
      },
      {
        cmd: "توزيعة من Docker image",
        title: "docker export ثم wsl --import",
        desc: R`أي Docker image ممكن تبقى توزيعة WSL: [[docker create]] بيعمل container من غير ما يشغّله، و [[docker export]] بيطلّع نظام الملفات بتاعه كله في ملف [[.tar]]، و [[wsl --import]] بيعمل منه توزيعة جديدة. كده تعمل بيئة نضيفة لمشروع بعينه، أو توزيعة مش في [[wsl -l -o]].

الجزء بتاع Docker اتشغّل هنا (ubuntu:24.04، الملف طلع ٨١ ميجا و ٣٤٤٨ مسار). [[wsl --import]] بيعمل توزيعة على الجهاز فمتشغّلش، وصيغته من [[wsl --help]].`,
        example: R`docker create --name b2a-rootfs ubuntu:24.04
docker export b2a-rootfs -o ubuntu-rootfs.tar
docker rm -v b2a-rootfs
tar -tf ubuntu-rootfs.tar | head -5
# Windows (PowerShell), creates a distro (not run here):
wsl --import ubuntu-project1 D:\WSL\ubuntu-project1 .\ubuntu-rootfs.tar
wsl -d ubuntu-project1`,
        try: "اعمل نفس الحكاية بـ [[alpine]] (الملف هيطلع ٨ ميجا تقريبًا)، و import باسم [[alpine-test]]، وادخل، وبعدين [[wsl --unregister alpine-test]] (وانت متأكد من الاسم).",
        deep: {
          why: "مشروع محتاج Python 3.9 قديم، ومشروع تاني Node و Postgres. لو الاتنين في نفس Ubuntu، كل واحد بيبوظ التاني. توزيعة لكل مشروع من image معروفة = بيئة نضيفة تعملها وترميها في دقيقة.",
          how: R`[[docker create]] بيعمل container من الـ image من غير ما يشغّله (مش محتاجه يشتغل، محتاج ملفاته بس). [[--name]] اسم عشان نشاور عليه.

[[docker export]] بيكتب نظام ملفات الـ container كله (من غير الـ layers والـ metadata) في tar. [[-o]] اسم الملف. ده بالظبط الشكل اللي [[wsl --import]] عايزه: tar فيه [[/bin]] و [[/etc]] و [[/usr]]...

[[docker rm -v]] بيمسح الـ container (و [[-v]] أي volumes مجهولة معاه).

[[tar -tf]]: [[-t]] اعرض المحتوى من غير فك، و [[-f]] الملف.

[[wsl --import <Distro> <InstallLocation> <FileName>]]: اسم التوزيعة الجديدة، والفولدر اللي هيتعمل فيه [[ext4.vhdx]]، والـ tar. وفيه [[--version 2]] و [[--vhd]] لو الملف vhdx. وفي WSL الجديد كمان [[wsl --install --from-file <Path>]] و [[--name]] و [[--location]] (من [[wsl --help]]).

بعد الـ import: اليوزر الافتراضي [[root]] (الـ image مفيهاش يوزر). جواها: [[useradd -m -s /bin/bash اسمك]] و [[passwd]]، وفي [[/etc/wsl.conf]]: [[[user]]] [[default=اسمك]]، و [[[boot]]] [[systemd=true]] لو محتاجه، وبعدين [[wsl --terminate]]. والـ image الـ minimal ناقصها حاجات كتير (مفيش [[sudo]] ولا [[man]]).`,
          when: "بيئة معزولة لكل مشروع، أو توزيعة نفس image الإنتاج بالظبط، أو توزيعة مش متاحة في الـ Store.",
          mistakes: R`تعمل [[docker save]] بدل [[docker export]] (save بيطلّع layers و JSON، مش نظام ملفات). وتنسى إن اليوزر root. وتعمل [[--unregister]] على التوزيعة الغلط (مفيش رجوع). وتسيب ملفات الـ tar الكبيرة على C.`
        },
        teach: R`## الفكرة: الـ image فيها نظام لينكس كامل، و WSL محتاج بالظبط ده

توزيعة WSL في الآخر نظام ملفات لينكس (tar). و Docker image نظام ملفات لينكس كمان. فالجسر بينهم أمرين.

اتشغّل الجزء بتاع Docker من Git Bash مع Docker Desktop 29.6.

---

## ١. [[docker create --name b2a-rootfs ubuntu:24.04]]

- [[create]] مش [[run]]: بيعمل الـ container ويجهّز ملفاته من غير ما يشغّل حاجة.
- [[--name b2a-rootfs]]: اسم نشاور عليه في الأمرين اللي بعده.
- الناتج: ID طويل للـ container.

---

## ٢. [[docker export b2a-rootfs -o ubuntu-rootfs.tar]]

بيكتب كل ملفات الـ container في ملف واحد:

~~~text الناتج (ls -la)
-rw-r--r-- 1 ali 197609 80695808 Oct 28 01:49 ubuntu-rootfs.tar
~~~

٨٠٬٦٩٥٬٨٠٨ byte = حوالي ٨١ ميجا (٧٧ ميجا لو حسبت بالـ 1024). أوبونتو minimal صغيرة.

| | [[docker export]] | [[docker save]] |
|---|---|---|
| بيصدّر | container | image |
| الشكل | نظام ملفات واحد | layers و JSON |
| ينفع لـ [[wsl --import]] | ✓ | ✗ |

---

## ٣. [[docker rm -v b2a-rootfs]]

خلصنا من الـ container. [[-v]] يمسح معاه أي anonymous volumes.

---

## ٤. [[tar -tf ubuntu-rootfs.tar | head -5]]

[[-t]] اعرض، و [[-f]] الملف ده، و [[head -5]] أول ٥ سطور:

~~~text الناتج
.dockerenv
bin
boot/
dev/
dev/console
~~~

- نظام لينكس عادي من الجذر: [[bin]] و [[boot]] و [[dev]]...
- [[.dockerenv]]: ملف فاضي Docker بيحطه في أي container. مش مضر.
- الملف فيه ٣٤٤٨ مسار ([[tar -tf ... | wc -l]]).

---

## ٥. [[wsl --import]] (مش متشغّل هنا)

~~~powershell
wsl --import ubuntu-project1 D:\WSL\ubuntu-project1 .\ubuntu-rootfs.tar
wsl -d ubuntu-project1
~~~

من [[wsl --help]] (WSL 2.7.14):

~~~text الناتج
    --import <Distro> <InstallLocation> <FileName> [Options]
        Imports the specified tar file as a new distribution.
        The filename can be - for stdin.
~~~

| الحتة | معناها |
|---|---|
| [[ubuntu-project1]] | اسم التوزيعة الجديدة |
| [[D:\WSL\ubuntu-project1]] | فين يتعمل [[ext4.vhdx]] (على D مش C) |
| [[.\ubuntu-rootfs.tar]] | الملف |
| [[wsl -d ubuntu-project1]] | ادخلها ([[-d]] = distribution) |

والشكل الأحدث: [[wsl --install --from-file .\ubuntu-rootfs.tar --name ubuntu-project1 --location D:\WSL\ubuntu-project1]].

---

## ٦. بعد الدخول

اليوزر [[root]]. اللي بيتعمل عادة (من docs «Import any Linux distribution»):

~~~bash
useradd -m -s /bin/bash ali && passwd ali
printf "[user]\ndefault=ali\n[boot]\nsystemd=true\n" > /etc/wsl.conf
~~~

وبعدين من PowerShell [[wsl --terminate ubuntu-project1]] وادخل تاني. والـ image minimal: [[apt update && apt install -y sudo]] لو محتاجه.

---

## الخلاصة

| الخطوة | الأمر |
|---|---|
| container من غير تشغيل | [[docker create --name x IMAGE]] |
| ملفاته في tar | [[docker export x -o file.tar]] |
| امسح الـ container | [[docker rm -v x]] |
| توزيعة | [[wsl --import NAME FOLDER file.tar]] |
| ارميها | [[wsl --unregister NAME]] (نهائي) |`,
        lines: [
          R`container من الـ image من غير تشغيل.`,
          R`نظام ملفاته كله في tar.`,
          R`امسح الـ container.`,
          R`بص على أول ٥ مسارات في الملف.`,
          R`اعمل توزيعة جديدة من الـ tar على D.`,
          R`ادخلها.`
        ],
        sol: R`بـ ubuntu:24.04 الملف كان [[80695808]] byte و ٣٤٤٨ مسار. alpine هيطلع أصغر بكتير (الـ image نفسها ٨ ميجا تقريبًا).

بعد [[wsl --import alpine-test ...]] و [[wsl -d alpine-test]] هتلاقي نفسك [[root]] في Alpine (الـ shell [[sh]] مش bash). و [[wsl --unregister alpine-test]] بيمسحها وملف الـ vhdx بتاعها نهائيًا، فاكتب الاسم بالظبط.`
      },
      {
        cmd: "GPU و CUDA",
        title: "كارت الشاشة من جوه لينكس",
        desc: R`WSL 2 بيدّي لينكس كارت الشاشة بتاع ويندوز عن طريق جهاز اسمه [[/dev/dxg]] ومكتبات درايفر ويندوز اللي بتتركّب جوه لينكس. يعني متسطّبش درايف NVIDIA جوه لينكس؛ درايفر ويندوز كفاية، و [[nvidia-smi]] بيشتغل من جوه.

اتجرّب على RTX 3070 Laptop بدرايفر 616.92: [[nvidia-smi]] على ويندوز، وجوه container [[ubuntu:24.04]] بـ [[--gpus all]] على Docker Desktop (اللي شغال على WSL 2، فده نفس الطريق). وتسطيب CUDA toolkit جوه Ubuntu من الـ docs.`,
        example: R`# Windows (PowerShell):
nvidia-smi --query-gpu=name,driver_version,memory.total --format=csv
# Linux (Docker on WSL 2):
docker run --rm --gpus all ubuntu:24.04 nvidia-smi --query-gpu=name,driver_version,memory.total --format=csv
docker run --rm --gpus all ubuntu:24.04 bash -c 'ls -la /dev/dxg; uname -r'
docker run --rm ubuntu:24.04 bash -c 'ls /dev/dxg'`,
        try: "لو عندك NVIDIA: شغّل [[nvidia-smi]] على ويندوز وجوه WSL (أو Docker بـ [[--gpus all]]) وقارن [[Driver Version]]. وجوه Ubuntu: [[ls /usr/lib/wsl/lib]] تشوف مكتبات ويندوز.",
        deep: {
          why: "تدريب model صغير، أو Ollama، أو PyTorch على كارت الشاشة. الأدوات دي معمولة للينكس أصلًا، و WSL بيخليك تستخدم الكارت من غير dual boot ومن غير درايفرين.",
          how: R`ويندوز عنده طبقة اسمها WDDM للكارت. WSL 2 بيعمل جوه لينكس جهاز [[/dev/dxg]] بيوصّل للطبقة دي (اسمها GPU paravirtualization)، وبيركّب مكتبات درايفر ويندوز ([[libcuda.so]] و [[libnvidia-ml.so]] و [[nvidia-smi]]) جوه لينكس read-only من فولدر [[/usr/lib/wsl]]. عشان كده الـ docs بتقول: سطّب درايفر NVIDIA على **ويندوز** بس، ومتسطّبش درايفر لينكس جوه WSL (هيكتب فوق المكتبات دي).

CUDA toolkit (الـ compiler [[nvcc]] والمكتبات للتطوير) بيتسطّب جوه Ubuntu من repo NVIDIA الخاص بـ WSL-Ubuntu (من غير درايفر). و PyTorch أو TensorFlow من pip بييجوا بالـ CUDA runtime بتاعهم، فغالبًا مش محتاج toolkit خالص.

[[nvidia-smi --query-gpu=...]]: [[--query-gpu]] الخانات اللي عايزها، و [[--format=csv]] ناتج سطر بفواصل.

Docker Desktop شغال على WSL 2، و [[--gpus all]] بيدّي الـ container نفس [[/dev/dxg]] والمكتبات. من غيره مفيش GPU في الـ container. و [[wsl.conf]] فيه [[[gpu]]] [[enabled=true]] افتراضيًا (من الـ docs)، و AMD و Intel ليهم دعم عن طريق DirectML و D3D12.`,
          when: "PyTorch و TensorFlow و Ollama و llama.cpp وأي حاجة CUDA. وفي Docker لما الـ container محتاج الكارت.",
          mistakes: R`تسطّب درايفر NVIDIA للينكس جوه WSL ([[apt install nvidia-driver-...]]) فتبوّظ المكتبات اللي WSL حاططها. وتنسى [[--gpus all]] في Docker. وتستنى إن [[nvidia-smi]] في WSL يوريك البرامج اللي بتستخدم الكارت زي ويندوز (العمود ده ساعات بيبقى فاضي في WSL).`
        },
        teach: R`## الفكرة: درايفر واحد على ويندوز، ولينكس بيستلفه

> الجهاز: RTX 3070 Laptop، درايفر NVIDIA 616.92 على ويندوز 11، WSL 2.7.14. الجزء اللي جوه لينكس اتشغّل في containers على Docker Desktop (اللي بيشتغل جوه WSL 2، فبيستخدم نفس الـ GPU paravirtualization).

---

## ١. على ويندوز

~~~powershell
nvidia-smi --query-gpu=name,driver_version,memory.total --format=csv
~~~

| الحتة | معناها |
|---|---|
| [[nvidia-smi]] | أداة NVIDIA (System Management Interface)، بتيجي مع الدرايفر |
| [[--query-gpu=name,driver_version,memory.total]] | الخانات: الاسم، ونسخة الدرايفر، والذاكرة |
| [[--format=csv]] | سطر بفواصل بدل الجدول الكبير |

~~~text الناتج
name, driver_version, memory.total [MiB]
NVIDIA GeForce RTX 3070 Laptop GPU, 616.92, 8192 MiB
~~~

[[8192 MiB]] = ٨ جيجا ذاكرة على الكارت نفسه (VRAM)، مش رام الجهاز.

---

## ٢. نفس الأمر من جوه لينكس

~~~bash
docker run --rm --gpus all ubuntu:24.04 nvidia-smi --query-gpu=name,driver_version,memory.total --format=csv
~~~

[[--gpus all]]: ادّي الـ container كل كروت الشاشة. والـ image [[ubuntu:24.04]] عادية، مفيهاش أي حاجة NVIDIA:

~~~text الناتج
name, driver_version, memory.total [MiB]
NVIDIA GeForce RTX 3070 Laptop GPU, 616.92, 8192 MiB
~~~

نفس الكارت ونفس الدرايفر **616.92** بتاع ويندوز. يعني [[nvidia-smi]] ده جه منين؟ طلع مترّكب من ويندوز:

~~~text الناتج (mount | grep ...، مختصر)
drivers on /usr/bin/nvidia-smi type 9p (ro,...)
drivers on /usr/lib/wsl/drivers/nvamsi.inf_amd64_.../libcuda.so.1.1 type 9p (ro,...)
none on /dev/dxg type devtmpfs (ro,...)
~~~

- [[drivers on ... type 9p (ro)]]: ملفات من فولدر درايفرات ويندوز، متركّبة read-only عبر 9P (نفس بروتوكول [[/mnt/c]]).
- [[libcuda.so]]: مكتبة CUDA نفسها، من درايفر ويندوز.

وأول سطور الجدول الكامل:

~~~text الناتج
| NVIDIA-SMI 615.71.08              KMD Version: 616.92        CUDA UMD Version: 13.4     |
~~~

[[KMD]] (kernel mode driver) = درايفر ويندوز 616.92. و [[CUDA UMD Version: 13.4]] أعلى CUDA الدرايفر ده بيدعمها.

---

## ٣. [[/dev/dxg]]: الباب

~~~bash
docker run --rm --gpus all ubuntu:24.04 bash -c 'ls -la /dev/dxg; uname -r'
~~~

~~~text الناتج
crw-rw-rw- 1 root root 10, 258 Oct 27 15:37 /dev/dxg
6.18.33.2-microsoft-standard-WSL2
~~~

- [[c]] في الأول = character device: جهاز مش ملف.
- [[dxg]] = DirectX Graphics: الجهاز اللي بيوصّل لطبقة كارت الشاشة في ويندوز.
- [[uname -r]]: kernel الـ WSL نفسه ([[microsoft-standard-WSL2]])، لأن Docker Desktop شغال عليه.

ومن غير [[--gpus all]]:

~~~bash
docker run --rm ubuntu:24.04 bash -c 'ls /dev/dxg'
~~~

~~~text الناتج
ls: cannot access '/dev/dxg': No such file or directory
~~~

---

## ٤. جوه Ubuntu على WSL (من الـ docs)

| عايز | اعمل |
|---|---|
| تتأكد | [[nvidia-smi]] جوه Ubuntu، ومكتبات ويندوز في [[/usr/lib/wsl/lib]] |
| PyTorch | [[pip install torch]] (فيه CUDA runtime)، وبعدين [[python -c "import torch; print(torch.cuda.is_available())"]] |
| [[nvcc]] و CUDA toolkit | من repo NVIDIA بتاع **WSL-Ubuntu** (من غير درايفر) |
| **متعملش** | [[apt install nvidia-driver-...]] جوه WSL |

---

## الخلاصة

- الدرايفر على ويندوز بس، و WSL بيركّب مكتباته جوه لينكس read-only.
- [[/dev/dxg]] هو الجهاز اللي بيوصّل.
- Docker: [[--gpus all]].
- نفس رقم الدرايفر بيظهر في ويندوز ولينكس.`,
        lines: [
          R`الكارت والدرايفر والذاكرة من ويندوز.`,
          R`نفس السؤال من container لينكس بالكارت.`,
          R`جهاز [[/dev/dxg]] ونسخة الـ kernel.`,
          R`من غير [[--gpus all]]: مفيش [[/dev/dxg]].`
        ],
        sol: R`على الجهاز ده: ويندوز و container لينكس الاتنين طلّعوا [[NVIDIA GeForce RTX 3070 Laptop GPU, 616.92, 8192 MiB]]: نفس الدرايفر بالظبط، لأن لينكس بيستخدم درايفر ويندوز.

وجوه Ubuntu على WSL، [[ls /usr/lib/wsl/lib]] (من الـ docs) بيوريك مكتبات زي [[libcuda.so]] و [[libdxcore.so]]، ودي اللي متتمسحش ومتتغطاش بدرايفر لينكس.`
      },
      {
        cmd: "USB بـ usbipd",
        title: "Arduino أو أي جهاز USB جوه WSL",
        desc: R`WSL مش بيشوف أجهزة USB لوحده. [[usbipd-win]] (مشروع مفتوح بتنصح بيه مايكروسوفت) بيشارك جهاز USB من ويندوز للينكس عبر الشبكة الداخلية: [[usbipd list]] يعرض الأجهزة، و [[bind]] يشاركه (مرة، كمدير)، و [[attach --wsl]] يوصّله، و [[lsusb]] جوه لينكس يشوفه.

الدرس من docs «Connect USB devices» في مايكروسوفت: التسطيب بيعمل خدمة وقاعدة فايروول على ويندوز، فمتسطّبش على الجهاز ده. [[winget show]] قال إن آخر نسخة 5.3.0.`,
        example: R`# Windows (PowerShell): install once (adds a service and a firewall rule)
winget install --interactive --exact dorssel.usbipd-win
usbipd list
usbipd bind --busid 4-4
usbipd attach --wsl --busid 4-4
# Linux (WSL):
lsusb
# Windows (PowerShell): give it back to Windows
usbipd detach --busid 4-4`,
        try: "لو عندك Arduino أو فلاشة: سطّب usbipd-win، وافتح ترمنال WSL، و [[usbipd list]]، وخد الـ BUSID بتاع جهازك، و bind و attach، وبعدين [[lsusb]] جوه WSL.",
        deep: {
          why: "رفع كود على Arduino أو ESP32 من أدوات لينكس، أو قارئ smartcard، أو جهاز بيتبرمج من [[/dev/ttyUSB0]]. من غير usbipd لازم تشتغل من ويندوز أو dual boot.",
          how: R`USB/IP بروتوكول بيبعت حركة USB على شبكة. usbipd-win بيمسك الجهاز من ويندوز ويبعته لـ VM بتاعة WSL، والـ kernel في WSL (5.10.60.1 أو أحدث حسب الـ docs) فيه الجزء التاني.

التسطيب (الـ docs): ملف [[.msi]] من GitHub releases أو [[winget install --interactive --exact dorssel.usbipd-win]]. [[--interactive]] عشان من غيرها winget ممكن يعمل restart لو الدرايفرات محتاجة. بيعمل: خدمة [[usbipd]] (USBIP Device Host)، وأداة [[usbipd]] في الـ PATH، وقاعدة فايروول [[usbipd]].

[[usbipd list]]: الأجهزة بـ BUSID (زي [[4-4]]: البورت) وحالتها. [[usbipd bind --busid 4-4]]: «شارك الجهاز ده»، محتاج PowerShell كمدير ومرة واحدة لكل جهاز. [[usbipd attach --wsl --busid 4-4]]: وصّله لـ WSL دلوقتي (من غير مدير، ولازم ترمنال WSL مفتوح عشان الـ VM تبقى شغالة). طول ما هو attached، ويندوز مش شايفه. [[usbipd detach]]: رجّعه.

جوه لينكس: [[lsusb]] (من [[usbutils]]) يعرضه، والجهاز التسلسلي بيظهر [[/dev/ttyUSB0]] أو [[/dev/ttyACM0]]. ولو يوزر عادي محتاج صلاحية: جروب [[dialout]] أو udev rules.`,
          when: "برمجة microcontrollers، و smartcards، وأي أداة لينكس محتاجة جهاز USB.",
          mistakes: R`[[attach]] من غير [[bind]] الأول. و [[attach]] و WSL مقفول. وتفتكر الجهاز «اختفى» من ويندوز (هو attached لـ WSL، [[detach]] بيرجّعه). وتنسى [[--interactive]] في winget فالجهاز يعمل restart فجأة.`
        },
        teach: R`## الفكرة: الجهاز بيتبعت لـ WSL على شبكة داخلية

> كل الخطوات من docs «Connect USB devices» (مايكروسوفت) ومن مشروع usbipd-win على GitHub. التسطيب بيغيّر الجهاز (خدمة وقاعدة فايروول)، فمتسطّبش هنا. اللي اتشغّل: [[winget show --id dorssel.usbipd-win]] وقال [[Version: 5.3.0]]، والـ docs بتفترض 5.0.0 أو أحدث.

~~~text الطريق
جهاز USB  →  ويندوز (usbipd، خدمة)  →  USB/IP  →  WSL kernel  →  /dev/ttyUSB0
~~~

---

## ١. التسطيب (مرة)

~~~powershell
winget install --interactive --exact dorssel.usbipd-win
~~~

| الحتة | معناها |
|---|---|
| [[--exact]] | الـ ID ده بالظبط |
| [[--interactive]] | اعرض المثبّت، عشان من غيرها ممكن يعمل restart لوحده لو الدرايفرات محتاجة |
| [[dorssel.usbipd-win]] | الـ ID (صاحب المشروع Frans van Dorsselaer) |

بيضيف: خدمة اسمها [[usbipd]]، وأمر [[usbipd]]، وقاعدة فايروول [[usbipd]] (الـ docs).

---

## ٢. [[usbipd list]]

بيعرض الأجهزة وكل واحد ليه **BUSID** (رقم البورت، زي [[4-4]]) وحالة: Not shared أو Shared أو Attached. انسخ الـ BUSID بتاع جهازك.

---

## ٣. [[usbipd bind --busid 4-4]]

«شارك الجهاز ده». PowerShell **كمدير**، ومرة واحدة لكل جهاز (بيفتكره). بعدها [[usbipd list]] يقول Shared.

---

## ٤. [[usbipd attach --wsl --busid 4-4]]

وصّله لـ WSL دلوقتي. مش محتاج مدير. بس لازم ترمنال WSL مفتوح (الـ docs: عشان الـ VM تفضل شغالة). وطول ما هو attached، ويندوز **مش شايفه**، وأي توزيعة WSL 2 شغالة تقدر تستخدمه.

---

## ٥. [[lsusb]] جوه لينكس

بيعرض أجهزة USB اللي لينكس شايفها، والجهاز بتاعك المفروض يبان. لو جهاز serial (Arduino) بيظهر كـ [[/dev/ttyUSB0]] أو [[/dev/ttyACM0]]. ولو يوزر عادي ومحتاج تكتب عليه: [[sudo usermod -aG dialout $USER]] وادخل تاني. ولو [[lsusb]] مش موجود: [[sudo apt install usbutils]].

---

## ٦. [[usbipd detach --busid 4-4]]

يرجّعه لويندوز. أو افصل الجهاز وركّبه تاني.

---

## الخلاصة

| الخطوة | الأمر | مدير؟ | كام مرة |
|---|---|---|---|
| تسطيب | [[winget install --interactive --exact dorssel.usbipd-win]] | آه | مرة |
| شوف | [[usbipd list]] | لأ | كل مرة |
| شارك | [[usbipd bind --busid X]] | آه | مرة لكل جهاز |
| وصّل | [[usbipd attach --wsl --busid X]] | لأ | كل مرة (و WSL مفتوح) |
| رجّع | [[usbipd detach --busid X]] | لأ | لما تخلص |`,
        lines: [
          R`سطّب usbipd-win (مرة).`,
          R`اعرض الأجهزة والـ BUSID.`,
          R`شارك الجهاز (كمدير، مرة).`,
          R`وصّله لـ WSL.`,
          R`جوه لينكس: الجهاز ظاهر؟`,
          R`رجّعه لويندوز.`
        ],
        sol: R`حسب الـ docs: بعد [[attach]]، [[usbipd list]] يقول Attached، و [[lsusb]] جوه WSL يعرض الجهاز (Arduino مثلًا بيظهر باسم الشركة، و [[/dev/ttyACM0]] أو [[/dev/ttyUSB0]] يظهر). وطول ما هو attached ويندوز (و Arduino IDE على ويندوز) مش شايفه.

ولو [[attach]] قال إن الجهاز مش shared: نسيت [[bind]] كمدير.`
      },
      {
        cmd: "WSLENV",
        title: "متغيرات البيئة بين ويندوز ولينكس",
        desc: R`متغيرات البيئة في ويندوز مش بتعدّي للينكس (غير PATH)، والعكس. [[WSLENV]] قايمة أسامي متغيرات مفصولة بـ [[:]] بتقول لـ WSL «عدّي دول». ولكل اسم flag: [[/p]] يحوّل المسار ([[C:\x]] ↔ [[/mnt/c/x]])، و [[/l]] قايمة مسارات، و [[/u]] من ويندوز للينكس بس، و [[/w]] من لينكس لويندوز بس.

الدرس من docs «Working across Windows and Linux file systems». على الجهاز ده [[$env:WSLENV]] فاضي، ومفيش توزيعة Ubuntu نجرّب جواها.`,
        example: R`# Windows (PowerShell):
$env:WSLENV
$env:PROJECT_DIR = "D:\work\shop"
$env:API_MODE = "dev"
$env:WSLENV = "PROJECT_DIR/p:API_MODE/u"
wsl -e bash -c 'echo "$PROJECT_DIR | $API_MODE"'`,
        try: "في توزيعة تجربة: شغّل الأوامر دي، ومرة شيل [[/p]] وشوف [[PROJECT_DIR]] بقى شكله إيه جوه لينكس. وخليها في نفس الجلسة (متستخدمش [[setx]]).",
        deep: {
          why: "سكربت على ويندوز بيشغّل build جوه WSL ومحتاج يدّيله مسار المشروع ومتغير زي [[API_MODE]]. أو أداة على ويندوز (VS Code، أو Git Credential Manager) محتاجة متغير من لينكس. من غير WSLENV كل واحد شايف متغيراته بس.",
          how: R`لما تشغّل [[wsl]] من ويندوز، WSL بيقرا [[WSLENV]] ويعدّي المتغيرات اللي فيها للينكس. ولما تشغّل [[.exe]] من لينكس، بيعدّي اللي فيها لويندوز. الفاصل [[:]].

الـ flags (من الـ docs): [[/p]] المسار يتحوّل بين الشكلين ([[D:\work\shop]] يبقى [[/mnt/d/work/shop]] جوه لينكس). [[/l]] قايمة مسارات ([[;]] في ويندوز و [[:]] في لينكس). [[/u]] من ويندوز → لينكس بس. [[/w]] من لينكس → ويندوز بس. وممكن تجمعهم: [[/up]].

[[wsl -e]] (exec) بيشغّل أمر من غير shell تسجيل الدخول، و [[bash -c '...']] بينفّذ النص بـ bash. العلامات المفردة عشان PowerShell ميفكّش [[$PROJECT_DIR]] (هو مش متغير PowerShell).

[[$env:X = ...]] في PowerShell بيطبق على الجلسة دي بس وعلى البرامج اللي بتتفتح منها. عشان يبقى دايم لازم متغير بيئة لليوزر (System Properties أو [[setx]])، وده تغيير دايم على الجهاز.`,
          when: "سكربتات ويندوز بتشغّل حاجات جوه WSL، أو أدوات ويندوز محتاجة قيم من لينكس. ولأي متغير فيه مسار استخدم [[/p]].",
          mistakes: R`تحط المتغير في WSLENV من غير [[/p]] وهو مسار، فلينكس يستلم [[D:\work\shop]] كما هو. وتكتب [[;]] بدل [[:]] بين الأسامي. وتحط أسرار في WSLENV دايم فتعدّي لكل حاجة.`
        },
        teach: R`## الفكرة: «عدّي المتغيرات دي، وحوّل دي لمسار لينكس»

> الأسماء والـ flags من docs مايكروسوفت «Working across Windows and Linux file systems». على الجهاز ده مفيش Ubuntu، فالناتج الأخير من الـ docs مش من تشغيل.

---

## ١. [[$env:WSLENV]]

~~~powershell
$env:WSLENV
~~~

على الجهاز ده رجّع ولا حاجة (فاضي). يعني مفيش ولا متغير بيعدّي غير اللي WSL بيعديه لوحده (PATH مثلًا، وده بيتظبط من [[appendWindowsPath]] في [[wsl.conf]]).

---

## ٢. متغيرين في الجلسة

~~~powershell
$env:PROJECT_DIR = "D:\work\shop"
$env:API_MODE = "dev"
~~~

[[$env:X = ...]] بيعمل متغير بيئة **للجلسة دي** وللبرامج اللي بتتفتح منها. مش دايم، ومش بيغيّر حاجة على الجهاز.

---

## ٣. [[$env:WSLENV = "PROJECT_DIR/p:API_MODE/u"]]

نفكّه:

| الحتة | معناها |
|---|---|
| [[PROJECT_DIR/p]] | عدّي [[PROJECT_DIR]]، و [[/p]] = path: حوّل المسار |
| [[:]] | فاصل بين الأسامي |
| [[API_MODE/u]] | عدّي [[API_MODE]]، و [[/u]] = من ويندوز للينكس بس |

كل الـ flags:

| flag | معناه |
|---|---|
| [[/p]] | مسار واحد يتحوّل ([[D:\x]] ↔ [[/mnt/d/x]]) |
| [[/l]] | قايمة مسارات تتحوّل ([[;]] ↔ [[:]]) |
| [[/u]] | من ويندوز → لينكس بس |
| [[/w]] | من لينكس → ويندوز بس |

---

## ٤. [[wsl -e bash -c '...']]

~~~powershell
wsl -e bash -c 'echo "$PROJECT_DIR | $API_MODE"'
~~~

- [[-e]] (exec): شغّل الأمر ده على طول.
- [[bash -c '...']]: نفّذ النص بـ bash.
- العلامات المفردة [[' ']] عشان PowerShell ميحاولش يفك [[$PROJECT_DIR]] (اللي بيتفك جوه لينكس).

الناتج المتوقع حسب الـ docs:

~~~text الناتج (من الـ docs)
/mnt/d/work/shop | dev
~~~

- [[D:\work\shop]] بقى [[/mnt/d/work/shop]] بسبب [[/p]].
- [[dev]] عدّى زي ما هو.
- ولو شلت [[/p]]: لينكس هيستلم [[D:\work\shop]] بالـ backslashes، وأي أمر لينكس هيفشل بيه.

---

## الخلاصة

- [[WSLENV]] = أسامي مفصولة بـ [[:]]، ولكل واحد flag اختياري.
- مسار؟ [[/p]] دايمًا.
- [[$env:...]] للجلسة بس؛ الدايم ([[setx]] أو System Properties) تغيير على الجهاز، فاعمله وانت عارف.`,
        lines: [
          R`اعرض WSLENV الحالي (فاضي هنا).`,
          R`مسار مشروع على ويندوز.`,
          R`متغير عادي.`,
          R`عدّي الاتنين: الأول كمسار متحوّل، والتاني لينكس بس.`,
          R`اطبعهم من جوه لينكس.`
        ],
        sol: R`حسب الـ docs: [[/mnt/d/work/shop | dev]]. ومن غير [[/p]]: [[D:\work\shop | dev]]، و [[cd "$PROJECT_DIR"]] جوه لينكس هيقول [[No such file or directory]].

والمتغيرات دي بتختفي لما تقفل نافذة PowerShell، لأنها اتعملت بـ [[$env:]] في الجلسة بس.`
      }
    ]
  },
]);
