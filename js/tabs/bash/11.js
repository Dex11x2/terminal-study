// تكملة تاب bash: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/bash/01.js (شرح حقول الدرس في أوله)
MORE("bash", [
    {
      t: "الهاردوير والأداء",
      l: 2,
      n: "لينكس شايف الجهاز ده ولا لأ، والبطء من المعالج ولا الرام ولا الديسك، وشغلانة تقيلة من غير ما الجهاز يهنّج، وتحويل الفيديو، وفلاشة bootable",
      items: [
        {
          cmd: "lsusb و lspci و lshw",
          title: "جهازك فيه إيه ولينكس شايفه ولا لأ",
          desc: R`[[lsusb]] بيعرض كل حاجة متوصلة USB، و [[lspci]] الكروت اللي جوه الجهاز (الشاشة والواي فاي والصوت والـ SSD)، و [[lshw]] ملخص كل الهاردوير. أول سؤال لما حاجة مش شغالة (واي فاي، أو طابعة USB، أو كارت شاشة): «لينكس شايفها أصلًا؟ وبيستخدم أنهي driver؟».

[[lsusb]] سطر لكل جهاز: [[Bus 001 Device 004: ID 046d:c52b Logitech, Inc. Unifying Receiver]]. والـ [[ID]] رقمين: الشركة (vendor) والمنتج (product)، ودول اللي تدوّر بيهم لو الاسم مش ظاهر. و [[-t]] شجرة مين متوصل في مين (والسرعة: 480M يعني USB 2، و 5000M أو أكتر USB 3)، و [[-v]] كل التفاصيل. افصل الجهاز ووصّله وقارن: لو السطر ظهر، لينكس شايفه والمشكلة في driver أو إعداد؛ لو مظهرش، المشكلة في الكابل أو المنفذ أو الجهاز. و [[sudo dmesg -w]] بيوريك رسايل الـ kernel لايف وانت بتوصّل.

[[lspci]] سطر لكل كارت: [[00:14.3 Network controller: Intel Corporation Wi-Fi 6 AX201]]. و [[-k]] (kernel) بيزوّد تحت كل كارت [[Kernel driver in use:]] (الـ driver الشغال فعلًا) و [[Kernel modules:]] (اللي ينفع). لو كارت الواي فاي أو الشاشة مفيش تحته [[driver in use]]، ده سبب المشكلة. و [[-nn]] بيطبع الأرقام بين أقواس زي [[[8086:a0f0]]] عشان تدوّر بيها.

[[sudo lshw -short]] جدول: [[H/W path]] و [[Device]] و [[Class]] (memory و processor و display و network و disk) و [[Description]]. و [[-C network]] (class) نوع واحد، و sudo لازم عشان التفاصيل تبقى كاملة. و [[inxi -Fxz]] ملخص أجمل: [[-F]] (full) كل الأقسام، و [[-x]] تفاصيل زيادة، و [[-z]] يخبي الـ MAC والـ IP والأرقام التسلسلية (مهم قبل ما تلزق الناتج في فوروم أو issue)، و [[-c0]] من غير ألوان.

الحرارة: [[sudo apt install lm-sensors]]، وبعدين [[sudo sensors-detect]] مرة واحدة (بيسأل أسئلة، و Enter على الإجابة الافتراضية آمن)، وبعدها [[sensors]] بيطبع حرارة المعالج ([[Tctl]] في AMD و [[Package id 0]] في Intel) والـ SSD ([[nvme]]) والمراوح. و [[watch -n 2 sensors]] (درس watch) وانت بتشغّل حاجة تقيلة. والديسكات: [[lsblk]] (شوف درس «lsblk / mount» في تاب «VPS»).

وجوه VM أو container أو WSL هتشوف الهاردوير «الافتراضي» مش جهازك. جربت الأوامر دي جوه container على Docker Desktop (WSL2): [[lsusb]] مطلعش ولا سطر، و [[lspci]] طلّع كروت Virtio و [[Microsoft Corporation Basic Render Driver]]، و [[sensors]] قال [[No sensors found!]]. بس [[lshw]] طلّع المعالج الحقيقي، لأنه بيقرا [[/proc/cpuinfo]].`,
          example: R`sudo apt install usbutils pciutils lshw inxi lm-sensors
lsusb
lsusb -t
lspci -k
lspci -nn | grep -i -E 'vga|network|audio'
sudo lshw -short
sudo lshw -C network -short
inxi -Fxz
sudo sensors-detect
sensors`,
          try: R`على جهازك الحقيقي (مش VM): اعمل [[lsusb]]، ووصّل فلاشة أو ماوس، واعمله تاني وشوف السطر الجديد. واعرف كارت الواي فاي بتاعك والـ driver بتاعه من [[lspci -k]]، وحرارة المعالج دلوقتي.`,
          mac: ["diff", R`مفيش الأوامر دي على الماك: [[system_profiler SPHardwareDataType]] ملخص الجهاز، و [[system_profiler SPDisplaysDataType]] الشاشة، و [[ioreg -p IOUSB]] أجهزة الـ USB. والحرارة مش متاحة من غير برامج إضافية.`],
          deep: {
            why: R`«الواي فاي مش ظاهر بعد ما سطّبت لينكس»، «الطابعة USB مش بتطبع»، «الجهاز سخن وبطيء». قبل ما تسطّب drivers عشوائي من شروحات، لازم تعرف الجهاز إيه بالظبط (الشركة والموديل والأرقام) ولينكس شايفه ولا لأ. والأرقام [[vendor:product]] هي اللي بتلاقي بيها الحل الصح.`,
            how: R`الأوامر دي بتقرا اللي الـ kernel اكتشفه: lsusb و lspci بيقروا من [[/sys/bus/usb]] و [[/sys/bus/pci]]، ويترجموا الأرقام لأسامي من قاعدة بيانات جاية معاهم ([[usb.ids]] و [[pci.ids]]). عشان كده جهاز جديد جدًا ممكن يظهر برقمه من غير اسم، بس لسه «لينكس شايفه».

والـ driver حاجة تانية: الـ kernel بيحاول يربط كل جهاز بـ module بيعرف يكلّمه. [[lspci -k]] بيوريك نجح ولا لأ. و [[sensors]] بيقرا حساسات الماذربورد والمعالج من [[/sys/class/hwmon]]، و [[sensors-detect]] بيدوّر على أنهي module محتاج يتحمّل عشان الحساسات تظهر.`,
            when: R`بعد تسطيب لينكس على جهاز جديد: [[lspci -k]] واتأكد كل حاجة ليها driver. جهاز USB مش شغال: [[lsusb]] قبل وبعد التوصيل و [[dmesg -w]]. بتكتب issue أو بتسأل في فوروم: [[inxi -Fxz]]. والجهاز سخن أو بيهدّي السرعة: [[sensors]].`,
            mistakes: R`تصدّق ناتج VM أو WSL وتفتكره جهازك. وتلزق [[inxi -F]] من غير [[-z]] فتنشر الـ MAC والسيريال. وتسطّب driver من شرح لموديل تاني من غير ما تقارن الأرقام [[vendor:product]]. وتنسى [[sudo]] مع lshw فتطلع بيانات ناقصة.`
          },
          teach: R`## ٣ أسئلة لأي جهاز مش شغال: متوصل؟ لينكس شايفه؟ وبيستخدم أنهي driver؟

[[lsusb]] = list USB، و [[lspci]] = list PCI (الكروت اللي جوه الجهاز)، و [[lshw]] = list hardware. المثال اتشغّل على أوبونتو 24.04 جوه Docker على لابتوب ويندوز (Docker شغال في VM بتاعة WSL2). يعني الناتج هنا **هاردوير افتراضي** مش اللابتوب نفسه، ودي أهم حاجة تتعلمها من الدرس: جوه VM أو container مش هتشوف جهازك.

---

## ١. [[sudo apt install usbutils pciutils lshw inxi lm-sensors]]

الأوامر مش متسطبة لوحدها دايمًا، والباكدج اسمه مختلف عن الأمر:

| الباكدج | فيه |
|---|---|
| [[usbutils]] | [[lsusb]] |
| [[pciutils]] | [[lspci]] |
| [[lshw]] | [[lshw]] |
| [[inxi]] | [[inxi]] |
| [[lm-sensors]] | [[sensors]] و [[sensors-detect]] |

---

## ٢. [[lsusb]] و [[lsusb -t]]

جوه الـ container مفيش أي جهاز USB، فـ [[lsusb]] مطبعش ولا سطر وخرج بـ 1، و [[lsusb -t]] قال:

~~~text الناتج
/sys/bus/usb/devices: No such file or directory
~~~

ده بيوريك هو بيقرا منين: الـ kernel بيكتب كل جهاز USB لقاه في [[/sys/bus/usb/devices]]، و lsusb بيقرا من هناك. على جهاز حقيقي كل سطر شكله كده (الشكل من الـ man page):

~~~text شكل السطر
Bus 001 Device 004: ID 046d:c52b Logitech, Inc. Unifying Receiver
~~~

| الحتة | معناها |
|---|---|
| [[Bus 001]] | أنهي USB controller |
| [[Device 004]] | رقم الجهاز عليه |
| [[046d]] | vendor ID: الشركة (046d = Logitech) |
| [[c52b]] | product ID: المنتج |

و [[-t]] (tree) بيرسم مين متوصل في مين، وجنب كل واحد سرعته: [[480M]] يعني USB 2، و [[5000M]] أو أكتر USB 3.

---

## ٣. [[lspci -k]]

[[-k]] (kernel) بيزوّد تحت كل كارت الـ driver:

~~~text الناتج
5582:00:00.0 SCSI storage controller: Red Hat, Inc. Virtio 1.0 console (rev 01)
	Subsystem: Red Hat, Inc. Device 0040
	Kernel driver in use: virtio-pci
c19f:00:00.0 3D controller: Microsoft Corporation Basic Render Driver
	Kernel driver in use: dxgkrnl
~~~

| الحتة | معناها |
|---|---|
| [[5582:00:00.0]] | عنوان الكارت على الـ PCI bus |
| [[SCSI storage controller]] | نوعه |
| [[Red Hat, Inc. Virtio 1.0 console]] | الشركة والموديل (Virtio = هاردوير افتراضي بتاع الـ VM) |
| [[Kernel driver in use: virtio-pci]] | الـ driver اللي ماسكه دلوقتي. **لو السطر ده مش موجود، الكارت ملوش driver** |

و [[Basic Render Driver]] بتاع مايكروسوفت هو كارت الشاشة اللي WSL بيعدّيه للـ VM. على لابتوب حقيقي هتلاقي [[VGA compatible controller]] و [[Network controller]] بأسامي Intel أو AMD أو NVIDIA أو Realtek.

---

## ٤. [[lspci -nn | grep -i -E 'vga|network|audio']]

[[-nn]] بيطبع الأسامي **والأرقام**:

~~~text lspci -nn
c19f:00:00.0 3D controller [0302]: Microsoft Corporation Basic Render Driver [1414:008e]
~~~

[[[0302]]] رقم النوع، و [[[1414:008e]]] الشركة:المنتج. ده اللي تدوّر بيه على النت.

و [[grep]]: [[-i]] من غير فرق كابيتال وسمول، و [[-E]] عشان [[|]] تبقى «أو». الكارت هنا [[3D controller]] مش VGA، فـ grep مطلعش حاجة غير لما زودنا [[3d]] للبحث:

~~~text الناتج بعد إضافة |3d
c19f:00:00.0 3D controller [0302]: Microsoft Corporation Basic Render Driver [1414:008e]
f662:00:00.0 3D controller [0302]: Microsoft Corporation Basic Render Driver [1414:008e]
~~~

---

## ٥. [[sudo lshw -short]] و [[-C network]]

[[-short]] جدول، سطر لكل حاجة:

~~~text الناتج
H/W path  Device  Class      Description
========================================
                  system     Computer
/0                bus        Motherboard
/0/0              memory     15GiB System memory
/0/1              processor  AMD Ryzen 9 5900HX with Radeon Graphics
/0/2              storage    Virtio 1.0 console
/0/3              display    Basic Render Driver
~~~

| العمود | معناه |
|---|---|
| [[H/W path]] | مكانه في شجرة الهاردوير |
| [[Device]] | اسمه في [[/dev]] لو ليه (زي [[/dev/sda]]) |
| [[Class]] | النوع: memory و processor و display و network و disk |
| [[Description]] | الوصف |

[[15GiB]] دي الرام اللي WSL مدّيها للـ VM مش رام اللابتوب. بس [[processor]] هو المعالج الحقيقي، لأن الـ VM بتشوفه زي ما هو.

و [[-C network]] (class) نوع واحد بس. هنا طلّع العناوين بس من غير ولا سطر: lshw ملقاش كارت شبكة في الـ VM دي. و sudo لازمة على جهاز حقيقي عشان التفاصيل تبقى كاملة.

---

## ٦. [[inxi -Fxz]]

[[-F]] (full) كل الأقسام، و [[-x]] تفاصيل زيادة، و [[-z]] خبّي الـ MAC والـ IP. أجزاء من الناتج (مع [[-c0]] من غير ألوان):

~~~text الناتج (مختصر)
System:
  Kernel: 6.6.87.2-microsoft-standard-WSL2 arch: x86_64 bits: 64
  Distro: Ubuntu 24.04.5 LTS (Noble Numbat)
Machine:
  Message: No machine data: try newer kernel. Is dmidecode installed?
CPU:
  Info: 8-core model: AMD Ryzen 9 5900HX with Radeon Graphics bits: 64 type: MT MCP
Network:
  IF-ID-1: eth0 state: up speed: 10000 Mbps duplex: full mac: <filter>
Sensors:
  Src: lm-sensors+/sys Message: No sensor data found using /sys/class/hwmon or lm-sensors.
~~~

[[mac: <filter>]] ده شغل [[-z]]: الـ MAC اتخبى، فتقدر تلزق الناتج في فوروم. و [[type: MT]] يعني multi-threaded (كل core بـ 2 threads).

---

## ٧. [[sudo sensors-detect]] و [[sensors]]

[[sensors-detect]] بيدوّر على شرايح الحساسات ويسألك أسئلة (Enter على كل واحدة آمن)، فمشغّلناهوش هنا (الكلام عنه من الـ docs). و [[sensors]] جوه الـ container:

~~~text الناتج
No sensors found!
Make sure you loaded all the kernel drivers you need.
Try sensors-detect to find out which these are.
~~~

طبيعي: الـ VM مفيهاش حساسات. على لابتوب حقيقي هتلاقي سطر زي [[Tctl: +52.0°C]] (AMD) أو [[Package id 0: +48.0°C]] (Intel).

---

| السؤال | الأمر |
|---|---|
| الجهاز الـ USB متوصل؟ | [[lsusb]] قبل وبعد ما توصّله |
| الكارت ليه driver؟ | [[lspci -k]] وبص على [[Kernel driver in use]] |
| أرقامه عشان أدوّر؟ | [[lspci -nn]] |
| ملخص الجهاز كله؟ | [[sudo lshw -short]] أو [[inxi -Fxz]] |
| الحرارة؟ | [[sensors]] |

> على الماك مفيش الأوامر دي: [[system_profiler SPHardwareDataType]] و [[ioreg -p IOUSB]] (من الـ docs). وعلى ويندوز: Device Manager، أو [[Get-PnpDevice -PresentOnly -Class Net]] في PowerShell (جربناها على ويندوز 11 وطلّعت [[Realtek PCIe GbE Family Controller]] بحالة [[OK]]).

## الخلاصة

[[lsusb]] و [[lspci -k]] يقولولك لينكس شايف الجهاز ولا لأ وبيستخدم أنهي driver. ومتصدقش الناتج جوه VM أو WSL أو container: ده هاردوير افتراضي.`,
          lines: [
            R`سطّب الأدوات (الأسامي: usbutils فيها lsusb، و pciutils فيها lspci).`,
            R`كل أجهزة الـ USB.`,
            R`نفس الكلام كشجرة بالسرعات.`,
            R`كروت PCI، وتحت كل واحد الـ driver الشغال ([[-k]]).`,
            R`كارت الشاشة والشبكة والصوت بأرقامهم ([[-nn]]).`,
            R`جدول بكل الهاردوير.`,
            R`كروت الشبكة بس ([[-C]] class).`,
            R`ملخص كامل ([[-F]]) بتفاصيل ([[-x]]) ومن غير بيانات شخصية ([[-z]]).`,
            R`دوّر على حساسات الحرارة (مرة واحدة).`,
            R`اطبع الحرارة والمراوح.`
          ],
          sol: R`ده ناتج حقيقي من container أوبونتو 24.04 بـ [[--privileged]] على Docker Desktop (VM بتاعة WSL2)، فالهاردوير افتراضي:
[[lsusb]]: مفيش أي سطر.
[[lspci -k]]: [[5582:00:00.0 SCSI storage controller: Red Hat, Inc. Virtio 1.0 console (rev 01)]] وتحته [[Kernel driver in use: virtio-pci]]، و [[7ce6:00:00.0 3D controller: Microsoft Corporation Basic Render Driver]] وتحته [[Kernel driver in use: dxgkrnl]].
[[sudo lshw -short]]:
[[/0/0                  memory     15GiB System memory]]
[[/0/1                  processor  AMD Ryzen 9 5900HX with Radeon Graphics]]
[[/0/7/0.0.3  /dev/sdd  volume     1TiB Virtual Disk]]
[[inxi -Fxz]]: [[Kernel 6.6.87.2-microsoft-standard-WSL2]] و [[Info 8-core model AMD Ryzen 9 5900HX]] و [[Message No machine data: try newer kernel. Is dmidecode installed?]]، ومن غير [[-c0]] الناتج كان فيه أكواد ألوان لأنه مش رايح لترمنال.
[[sensors]]: [[No sensors found!]] و [[Try sensors-detect to find out which these are.]]

على لابتوب حقيقي، [[lsusb]] بيطلّع سطور زي [[Bus 003 Device 002: ID 0bda:5634 Realtek Semiconductor Corp. Integrated_Webcam_HD]] (الكاميرا الداخلية غالبًا USB)، و [[sensors]] بيطلّع [[Tctl: +52.0°C]] أو [[Package id 0: +48.0°C]].`
        },
        {
          cmd: "nice و renice و ionice",
          title: "شغلانة تقيلة من غير ما الجهاز يهنّج",
          desc: R`[[nice]] بيشغّل أمر بأولوية أقل على المعالج، و [[renice]] بيغيّر أولوية عملية شغالة، و [[ionice]] نفس الفكرة للديسك. فتعمل ضغط أو build أو باك أب كبير، والجهاز أو السيرفر يفضل بيرد على الناس كويس.

الـ niceness من [[-20]] (أعلى أولوية) لـ [[19]] (أقل)، والافتراضي 0. والاسم جاي من إن العملية «لطيفة» مع غيرها: كل ما الرقم يكبر بتسيب المعالج للباقي. [[nice -n 19 tar ...]] يشغّل الأمر بـ 19، و [[nice]] لوحده بيطبع الـ niceness الحالي. وفي [[top]] (درس «top / htop») عمود [[NI]] هو الرقم ده، و [[PR]] = 20 + NI.

الأثر بيبان لما المعالج مشغول: جربت عمليتين بياكلوا CPU على نفس الـ core، واحدة 0 وواحدة 19: الأولى خدت حوالي 98% والتانية 1.3%. ولو المعالج فاضي، الـ 19 بتاخد كل اللي محتاجاه، يعني nice مبيبطّأش الشغلانة غير لما فيه زحمة.

[[renice +10 -p PID]] (أو [[renice -n 10 -p PID]]) يغيّر عملية شغالة، والـ PID تجيبه من [[ps]] أو [[pgrep]]، و [[-u ali]] كل عمليات يوزر. وقاعدة مهمة: اليوزر العادي يقدر «ينزّل» أولوية عملياته بس (يكبّر الرقم)، ومينفعش يرجّعها ولا يدّي رقم سالب: [[renice: failed to set priority for 1044 (process ID): Permission denied]]. root بس يقدر يرفع.

[[ionice]]: الديسك ليه طابور لوحده، و nice مش بيأثر عليه كتير. [[ionice -c3]] (class 3 = idle): العملية تقرا وتكتب على الديسك بس لما محدش تاني محتاجه. و [[-c2 -n7]] (best-effort، والأولوية من 0 لـ 7، و 7 الأقل) الوسط. و [[ionice -p PID]] يعرض الحالة. والاتنين مع بعض: [[ionice -c3 nice -n 19 أمر]]. والـ classes دي بتتطبّق كاملة مع scheduler اسمه BFQ، وجزئيًا مع [[mq-deadline]]، ومع [[none]] (الافتراضي على أغلب الـ NVMe) أثرها قليل. و [[cat /sys/block/sda/queue/scheduler]] بيقولك المستخدم بين أقواس.`,
          example: R`nice -n 19 tar -czf backup.tar.gz ~/projects
nice
ps -o pid,ni,cmd -p 1234
sudo renice +10 -p 1234
renice -n 15 -u $USER
ionice -c3 -p 1234
ionice -c3 nice -n 19 rsync -a ~/projects /mnt/backup/
cat /sys/block/sda/queue/scheduler`,
          try: R`شغّل في ترمنال [[sh -c 'while :; do :; done' &]] مرتين، واحدة عادي وواحدة بـ [[nice -n 19]]، وقيّدهم على core واحد بـ [[taskset -c 0]] قدام كل واحد. افتح [[top]] وقارن عمودي NI و %CPU. وبعدين [[renice]] العادية لـ 19 وشوف اتغيّر إيه، وفي الآخر [[kill %1 %2]].`,
          mac: ["diff", R`[[nice]] و [[renice]] موجودين بنفس الشكل، ومفيش [[ionice]]: [[taskpolicy -b أمر]] بيشغّله في الخلفية بأقل أولوية للمعالج والديسك.`],
          deep: {
            why: R`على سيرفر عليه موقع، باك أب أو ضغط لوجات أو build بياكل المعالج والديسك فالموقع يبطّأ للزوار. وعلى جهازك، ترجمة مشروع كبير بتخلّي الماوس يتقّل. nice و ionice بيقولوا للـ kernel «الشغلانة دي مش مستعجلة»، فتخلص برضه، بس في الوقت الفاضي.`,
            how: R`الـ scheduler بتاع لينكس (EEVDF في الـ kernels الحديثة، و CFS قبله) بيوزّع وقت المعالج بالأوزان: كل niceness ليها وزن، والفرق بين كل رقم والتاني حوالي 10% من الوقت. فعمليتين 0 و 19 على نفس الـ core النسبة بينهم حوالي 70 لـ 1، وده اللي طلع في التجربة.

والـ niceness بتتورث: [[nice -n 19 bash]] وأي حاجة تشغّلها جواه بـ 19. وللديسك، ionice بيحط class وأولوية على العملية، والـ I/O scheduler بتاع الديسك هو اللي بيقرر يحترمها قد إيه.`,
            when: R`سكربت باك أب في cron: [[nice -n 19 ionice -c3]] قدامه. build تقيل وانت شغال على نفس الجهاز. عملية شغالة بالفعل وبتاكل الجهاز ومش عايز توقفها: [[renice +15]]. وقاعدة بيانات أو موقع لازم ياخدوا الأولوية: متلمسهمش، وقلّل أولوية الحاجات التانية.`,
            mistakes: R`إنك تتوقع nice يخلّي الشغلانة تخلص أسرع، هو بيخليها «أبطأ وألطف». وإنك تعمل [[renice]] لرقم أقل كيوزر عادي وتستغرب Permission denied. و [[nice -n -10]] لحاجة مش مهمة كـ root. وإنك تعتمد على nice لوحده لشغلانة ديسك (باك أب، find كبير) فالبطء يفضل.`
          },
          teach: R`## [[nice]] و [[renice]] للمعالج، و [[ionice]] للديسك: «الشغلانة دي مش مستعجلة»

الرقم اللي بنلعب بيه اسمه **niceness**: من [[-20]] (أعلى أولوية) لـ [[19]] (أقل)، والافتراضي [[0]]. كل الأوامر اتشغّلت على أوبونتو 24.04 جوه Docker كيوزر عادي [[ali]] عنده sudo. ملاحظة: Docker بيشيل صلاحية تغيير أولوية عمليات غيرك حتى من root (اسمها [[CAP_SYS_NICE]])، فسطور [[sudo renice]] اتجربت في container تاني متشغّل بـ [[--cap-add SYS_NICE]]، زي أي لينكس عادي.

---

## ١. [[nice -n 19 tar -czf backup.tar.gz ~/projects]]

[[nice]] بيشغّل الأمر اللي بعده، بس بـ niceness أعلى. و [[-n 19]] الرقم (أقل أولوية خالص). اللي بعدها أمر [[tar]] عادي (درس tar).

~~~text الناتج
tar: Removing leading $__bt/' from member names
~~~

خلص عادي، والأرشيف اتعمل. الفرق مش هيبان هنا لأن المعالج كان فاضي: nice مش بيبطّأ الأمر، بيخليه **يتنازل** لما فيه حد تاني عايز المعالج.

---

## ٢. [[nice]] لوحده

من غير أمر بيطبع الـ niceness بتاع الشيل الحالي:

~~~text nice
0
~~~

~~~text nice -n 19 nice
19
~~~

التاني: شغّلنا [[nice]] نفسه جوه [[nice -n 19]]، فطبع الرقم اللي اتشغّل بيه. يعني أي برنامج بيتشغّل من nice بياخد الرقم ده، واللي بيشغّله هو كمان بيورثه.

---

## ٣. [[ps -o pid,ni,cmd -p 1234]]

[[ps]] بيعرض العمليات، و [[-o]] (output) الأعمدة اللي عايزها، و [[ni]] عمود الـ niceness، و [[-p]] رقم عملية معينة. جربنا عمليتين بياكلوا CPU على نفس الـ core ([[taskset -c 0]] بيقفلهم على core رقم 0)، واحدة عادي وواحدة بـ [[nice -n 19]]، وبعد ٥ ثواني:

~~~text ps -o pid,ni,pcpu,cmd -p 3132,3133
    PID  NI %CPU CMD
   3132   0 98.2 sh -c while :; do :; done
   3133  19  1.3 sh -c while :; do :; done
~~~

العادية خدت 98% والـ 19 خدت 1.3%. ونفس الكلام في [[top]]:

~~~text top -b -n1
    PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
   3132 ali       20   0    2804   1664   1664 R  90.9   0.0   0:05.14 sh
   3133 ali       39  19    2804   1664   1664 R   0.0   0.0   0:00.08 sh
~~~

[[PR]] (priority) = 20 + [[NI]]، فـ 0 بقت 20 و 19 بقت 39. و [[TIME+]] وقت المعالج اللي خدته كل واحدة: 5 ثواني قصاد 0.08.

### ليه النسبة كبيرة كده؟

الـ scheduler بتاع لينكس بيدّي كل niceness «وزن»، وكل خطوة بتفرق حوالي 25% في الوزن. من 0 لـ 19 دي 19 خطوة، فالوزن بيبقى حوالي 1024 قصاد 15، يعني حوالي 70 لـ 1. وده اللي ظهر.

---

## ٤. [[sudo renice +10 -p 1234]]

[[renice]] بيغيّر عملية **شغالة**. [[+10]] الرقم الجديد (مش «زوّد 10»)، و [[-p]] (process) رقمها:

~~~text الناتج
186 (process ID) old priority 0, new priority 10
~~~

### اليوزر العادي ينزّل بس

كـ [[ali]] على عمليته:

~~~text renice -n 10 -p 3132
3132 (process ID) old priority 0, new priority 10
~~~

~~~text renice -n 5 -p 3132
renice: failed to set priority for 3132 (process ID): Permission denied
~~~

نزّلها لـ 10 عادي، بس يرجّعها لـ 5 (أولوية أعلى) لأ. وكمان [[nice -n -5 true]]:

~~~text الناتج
nice: cannot set niceness: Permission denied
~~~

الرفع لـ root بس، عشان أي يوزر ميقدرش ياخد المعالج من الباقيين.

---

## ٥. [[renice -n 15 -u $USER]]

[[-u]] (user) كل عمليات يوزر مرة واحدة، و [[$USER]] متغير فيه اسمك:

~~~text الناتج
1001 (user ID) old priority 0, new priority 15
~~~

~~~text ps -o pid,ni,cmd -u ali
    PID  NI CMD
    184  15 -bash
    186  15 sleep 300
~~~

[[1001]] رقم اليوزر ali. وحتى الشيل نفسه بقى 15. وخلي بالك: لما جربناه وكان فيه عملية لـ ali على 19، الأمر فشل بـ [[Permission denied]]، لأن نقلها من 19 لـ 15 «رفع».

---

## ٦. [[ionice -c3 -p 1234]]

[[ionice]] نفس الفكرة بس لطابور الديسك. [[-c]] (class):

| class | الاسم | معناه |
|---|---|---|
| [[0]] | none | الافتراضي: بيمشي حسب niceness المعالج |
| [[1]] | realtime | الأول دايمًا (root بس) |
| [[2]] | best-effort | عادي، ومعاه [[-n]] من 0 (أعلى) لـ 7 |
| [[3]] | idle | استخدم الديسك بس لما محدش تاني محتاجه |

[[ionice -p PID]] لوحده بيعرض:

~~~text قبل، وبعد -c3، وبعد -c2 -n7
none: prio 0
idle
best-effort: prio 7
~~~

---

## ٧. [[ionice -c3 nice -n 19 rsync -a ~/projects /mnt/backup/]]

أوامر جوه بعض: [[ionice -c3]] بيشغّل [[nice -n 19]]، اللي بيشغّل [[rsync]]. فالـ rsync بيورث الاتنين. جربناها على [[sh]] بيطبع حالته:

~~~text ionice -c3 nice -n 19 sh -c 'ionice -p $$; nice'
idle
19
~~~

[[$$]] جوه الـ sh هو رقم العملية نفسها. يعني اتشغّلت idle للديسك و 19 للمعالج.

---

## ٨. [[cat /sys/block/sda/queue/scheduler]]

ionice بيتطبّق حسب الـ I/O scheduler بتاع الديسك:

~~~text الناتج
[none] mq-deadline kyber
~~~

اللي بين الأقواس هو المستخدم: [[none]]، ومعاه ionice أثره قليل. الـ classes بتشتغل كاملة مع [[bfq]]. و [[sda]] اسم الديسك عندك ([[lsblk]] يقولك).

---

| عايز | اكتب |
|---|---|
| شغّل أمر بأقل أولوية | [[nice -n 19 أمر]] |
| عملية شغالة | [[renice -n 15 -p PID]] |
| الديسك كمان | [[ionice -c3 nice -n 19 أمر]] |
| تشوف الحالة | [[ps -o pid,ni,cmd -p PID]] و [[ionice -p PID]] |

> على الماك [[nice]] و [[renice]] بنفس الشكل، ومفيش [[ionice]] (من الـ man pages). وعلى ويندوز: [[start /low أمر]] في CMD، أو [[(Get-Process name).PriorityClass = 'Idle']] في PowerShell.

## الخلاصة

رقم أكبر = ألطف = أولوية أقل. اليوزر العادي يكبّر الرقم بس. و nice مبيبطّأش الشغلانة غير لما فيه زحمة.`,
          lines: [
            R`اضغط المشروع بأقل أولوية على المعالج.`,
            R`اطبع الـ niceness الحالي (غالبًا 0).`,
            R`بص على الـ NI بتاع العملية 1234.`,
            R`قلّل أولويتها (رقم أكبر). الرفع محتاج root.`,
            R`قلّل أولوية كل عمليات يوزرك ([[-u]]).`,
            R`العملية 1234 تستخدم الديسك لما يكون فاضي بس (class 3 = idle).`,
            R`باك أب بأقل أولوية للديسك والمعالج مع بعض.`,
            R`الـ I/O scheduler بتاع الديسك (اللي بين الأقواس).`
          ],
          sol: R`ناتج حقيقي من container أوبونتو 24.04 على جهاز فيه 16 core، والعمليتين مقيّدين على core 0 بـ [[taskset -c 0]]. [[top]] بعد ٥ ثواني:
[[  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND]]
[[ 1070 root      20   0    2804   1792   1792 R 100.0   0.0   0:05.12 sh]]
[[ 1071 root      39  19    2804   1536   1536 R   0.0   0.0   0:00.07 sh]]
و [[ps -o pid,ni,pcpu,cmd]] قال 98.2% و 1.3%.

[[renice +15 -p 1034]] طبع [[1034 (process ID) old priority 10, new priority 15]]. وكيوزر عادي: [[renice -n 19]] على عمليته نجح، و [[renice -n 5]] (رجوع) طبع [[renice: failed to set priority for 1044 (process ID): Permission denied]]، و [[nice -n -5 true]] طبع [[nice: cannot set niceness: Permission denied]].

[[ionice -p]] قبل: [[none: prio 0]]، وبعد [[-c3]]: [[idle]]، وبعد [[-c2 -n7]]: [[best-effort: prio 7]]. و [[cat /sys/block/sda/queue/scheduler]] طبع [[[none] mq-deadline kyber]] (none هو المستخدم).`
        },
        {
          cmd: "free -h",
          title: "الرام: مستخدمة ولا كاش",
          desc: R`[[free -h]] بيعرض الرام والـ swap: قد إيه موجود، وقد إيه مستخدم، وقد إيه «متاح» فعلًا. و [[-h]] (human) بالـ Gi و Mi. وأهم عمود فيه [[available]] مش [[free]]، ودي أشهر لخبطة في لينكس.

الأعمدة:
• [[total]] الرام كلها.
• [[used]] اللي البرامج حاجزاها فعلًا.
• [[free]] اللي محدش لامسه خالص.
• [[shared]] رام مشتركة (غالبًا tmpfs).
• [[buff/cache]] رام لينكس مستخدمها كاش للملفات اللي اتقرت أو اتكتبت مؤخرًا، عشان تتفتح أسرع المرة الجاية.
• [[available]] قد إيه برنامج جديد يقدر ياخد من غير swap: الفاضي + الكاش اللي ينفع يتشال.
وسطر [[Swap]]: جزء من الديسك بيتستخدم رام احتياطي (شوف درس «swap» في تاب «VPS»).

ليه free قليل والجهاز تمام؟ لينكس شايف إن الرام الفاضية رام ضايعة، فبيملاها كاش، وأول ما برنامج يحتاج بيرجّع منها على طول. جربت: كتبت ملف 1.5 جيجا، فـ [[buff/cache]] طلع من 597Mi لـ 2.1Gi و [[free]] نزل من 14Gi لـ 12Gi، و [[available]] فضل 14Gi. ولما مسحت الملف الكاش رجع.

إمتى تقلق فعلًا: [[available]] صغير (أقل من 10% مثلًا)، أو [[used]] في سطر Swap بيزيد باستمرار، أو [[vmstat]] بيوري [[si]] و [[so]] مش صفر (الدرس الجاي). وأقصى حالة: الـ kernel بيقتل أكبر برنامج (OOM killer)، و [[sudo dmesg | grep -i oom]] أو [[journalctl -k | grep -i oom]] بيقولك قتل مين.

[[-m]] بالميجا بالظبط (للسكربتات)، و [[-w]] (wide) يفصل buffers عن cache، و [[-s 2]] يعيد كل ثانيتين، و [[-c 3]] عدد المرات. والأرقام دي جاية من [[/proc/meminfo]] ([[MemAvailable]] هو [[available]]).`,
          example: R`free -h
free -m
free -h -s 2 -c 3
grep -E 'MemTotal|MemAvailable|SwapFree' /proc/meminfo
ps -eo pid,rss,cmd --sort=-rss | head -6
sudo dmesg | grep -i 'out of memory'`,
          try: R`اعرض [[free -h]] واكتب رقم [[buff/cache]] و [[available]]. اقرا ملف كبير ([[cat bigfile > /dev/null]] أو أي فيديو) واعرضه تاني: مين اتغيّر ومين لأ؟ وبعدين اعرف أكبر ٥ برامج بتاكل رام.`,
          mac: ["diff", R`مفيش [[free]] على الماك: [[vm_stat]] (بالـ pages، كل page 16384 byte على Apple Silicon)، و [[top -l 1 | grep PhysMem]] سطر ملخص، و Activity Monitor ← Memory فيه «Memory Pressure» وده الأوضح.`],
          deep: {
            why: R`أول حاجة بتبص عليها لما الجهاز أو السيرفر بطيء أو برنامج بيقع. وأول ما الناس تفتح free على لينكس بيتخضّوا: «16 جيجا والفاضي 500 ميجا!» وده غالبًا كاش طبيعي. الفرق بين free و available هو الفرق بين «محتاج رام أكتر» و «كله تمام».`,
            how: R`الـ kernel بيحتفظ بنسخة من أي جزء من ملف اتقرا أو اتكتب (page cache). القراية التانية من الرام بدل الديسك، فده بيسرّع كل حاجة. ولما برنامج يطلب رام والفاضي مش كفاية، الـ kernel بيرمي من الكاش اللي محدش بيستخدمه (اللي اتكتب على الديسك خلاص) ويدّيه.

و [[available]] تقدير الـ kernel نفسه ([[MemAvailable]] في [[/proc/meminfo]]) للي ينفع يتدّي من غير swap. ولو الرام خلصت فعلًا، بيبدأ ينقل صفحات قديمة للـ swap، ولو ده كمان مكفاش، الـ OOM killer بيختار عملية ويقتلها.`,
            when: R`السيرفر بطيء: [[free -h]] قبل أي حاجة. build أو container بيقع من غير سبب واضح: [[dmesg]] على OOM. قبل ما تزوّد رام لـ VPS: [[available]] بيقول محتاج ولا لأ. ومراقبة سريعة: [[watch -n 2 free -h]].`,
            mistakes: R`تحكم من عمود [[free]] وتعمل [[echo 3 > /proc/sys/vm/drop_caches]] «عشان تفضّي رام»: بتمسح الكاش والجهاز يبقى أبطأ. وتتجاهل [[Swap used]] اللي بيكبر. وتجمع أرقام RSS لكل البرامج وتلاقيها أكبر من الرام (الرام المشتركة بتتحسب أكتر من مرة).`
          },
          teach: R`## [[free -h]]: الرام كلها، والمستخدم، والأهم **المتاح**

كل الأوامر اتشغّلت على أوبونتو 24.04 جوه Docker. الـ container بيشوف رام الـ VM بتاعة Docker (حوالي 15 جيجا من لابتوب فيه 32).

---

## ١. [[free -h]]

[[-h]] = human: الأرقام بالـ [[Gi]] و [[Mi]].

~~~text الناتج
               total        used        free      shared  buff/cache   available
Mem:            15Gi       1.0Gi        12Gi        30Mi       2.1Gi        14Gi
Swap:          4.0Gi          0B       4.0Gi
~~~

### سطر [[Mem:]] عمود عمود

| العمود | الرقم | معناه |
|---|---|---|
| [[total]] | 15Gi | الرام كلها |
| [[used]] | 1.0Gi | اللي البرامج حاجزاه |
| [[free]] | 12Gi | اللي محدش لامسه خالص |
| [[shared]] | 30Mi | رام مشتركة (غالبًا tmpfs) |
| [[buff/cache]] | 2.1Gi | لينكس شايل فيها نسخ من ملفات اتقرت أو اتكتبت، عشان المرة الجاية تبقى أسرع |
| [[available]] | 14Gi | قد إيه برنامج جديد ياخد من غير swap: الفاضي + الكاش اللي ينفع يترمي |

### ليه [[Gi]] مش [[G]]؟

[[Gi]] = gibibyte = 1024 × 1024 × 1024 بايت. يعني نفس «الجيجا» اللي ويندوز بيحسبها. والـ [[i]] بتفرّقها عن الجيجا بتاعة شركات الديسكات (مليار بايت).

### وسطر [[Swap:]]

جزء من الديسك بيتستخدم رام احتياطي. هنا 4 جيجا ومستخدم منه [[0B]]، وده الكويس.

---

## ٢. [[free -m]]

[[-m]] كله بالميجا (MiB)، أرقام صحيحة من غير حروف، عشان السكربتات تقارن بيها:

~~~text الناتج
               total        used        free      shared  buff/cache   available
Mem:           15698        1021       12834          30        2114       14677
Swap:           4096           0        4096
~~~

ودلوقتي الحساب باين: [[used]] في النسخة دي من free محسوب [[total - available]] = 15698 - 14677 = 1021 بالظبط. عشان كده لو جمعت used + free + buff/cache مش هيطلع total (طلع 15969): الكاش اللي مينفعش يترمي محسوب في used وفي buff/cache الاتنين. المهم: [[available]] (14677) أكبر بكتير من [[free]] (12834)، والفرق ده هو الكاش اللي ينفع يترمي.

و [[-w]] (wide) بيفصل [[buff/cache]] لعمودين:

~~~text free -h -w
               total        used        free      shared     buffers       cache   available
Mem:            15Gi       1.0Gi        12Gi        30Mi       327Mi       1.7Gi        14Gi
~~~

---

## ٣. [[free -h -s 2 -c 3]]

[[-s 2]] (seconds) اعرض كل ثانيتين، و [[-c 3]] (count) ٣ مرات وبعدين اقف. بيطبع نفس الجدول ٣ مرات وبينهم سطر فاضي. من غير [[-c]] هيفضل شغال لحد Ctrl+C.

---

## ٤. [[grep -E 'MemTotal|MemAvailable|SwapFree' /proc/meminfo]]

[[free]] نفسه بيقرا من الملف ده. [[/proc/meminfo]] مش ملف على الديسك، الـ kernel بيكتبه لحظة ما تقراه. و [[grep -E]] بيسيب السطور اللي فيها أي واحدة من التلاتة ([[|]] = أو):

~~~text الناتج
MemTotal:       16074944 kB
MemAvailable:   15045296 kB
SwapFree:        4194304 kB
~~~

16074944 ÷ 1024 = 15698 ميجا، نفس رقم [[total]] في [[free -m]].

---

## ٥. [[ps -eo pid,rss,cmd --sort=-rss | head -6]]

| الحتة | معناها |
|---|---|
| [[-e]] | كل العمليات |
| [[-o pid,rss,cmd]] | الأعمدة: الرقم، والرام، والأمر |
| [[rss]] | resident set size: الرام اللي العملية واخداها فعلًا، بالكيلوبايت |
| [[--sort=-rss]] | رتّب بالـ rss، و [[-]] يعني من الأكبر |
| [[head -6]] | سطر العناوين + أكبر ٥ |

~~~text الناتج (container فاضي تقريبًا)
    PID   RSS CMD
   3122  4096 -bash
   3161  3840 ps -eo pid,rss,cmd --sort=-rss
      1  3200 bash /s/perf.sh
~~~

على جهازك هتلاقي المتصفح و VS Code فوق بمئات الآلاف.

---

## ٦. [[sudo dmesg | grep -i 'out of memory']]

لو الرام والـ swap خلصوا، الـ kernel بيقتل برنامج (OOM killer) ويكتب في سجله. [[dmesg]] بيطبع السجل ده. جوه الـ container حتى بـ sudo:

~~~text الناتج
dmesg: read kernel buffer failed: Operation not permitted
~~~

Docker مش بيسمح للـ container يقرا سجل الـ kernel بتاع الـ host. على لينكس عادي [[sudo dmesg]] شغال، أو [[journalctl -k | grep -i oom]].

---

> على الماك مفيش [[free]]: [[vm_stat]] و [[top -l 1 | grep PhysMem]] (من الـ docs). وعلى ويندوز Task Manager ← Performance ← Memory، و «Available» هناك نفس فكرة [[available]].

## الخلاصة

بص على [[available]] مش [[free]]. [[free]] قليل و [[buff/cache]] كبير = لينكس بيستخدم الرام صح. القلق لما [[available]] يصغر أو [[Swap used]] يكبر.`,
          lines: [
            R`الرام والـ swap بأرقام مقروءة.`,
            R`نفس الكلام بالميجا بالظبط.`,
            R`كل ثانيتين، ٣ مرات.`,
            R`نفس الأرقام من مصدرها في الـ kernel.`,
            R`أكبر ٥ برامج في الرام ([[rss]] بالـ KB) مترتبين بالأكبر.`,
            R`هل الـ kernel قتل برنامج عشان الرام خلصت؟`
          ],
          sol: R`ناتج حقيقي من container أوبونتو 24.04 (بيشوف رام الـ VM كلها):
[[               total        used        free      shared  buff/cache   available]]
[[Mem:            15Gi       1.0Gi        14Gi        16Mi       597Mi        14Gi]]
[[Swap:          4.0Gi       3.4Mi       4.0Gi]]
وبعد ما كتبت ملف 1.5 جيجا:
[[Mem:            15Gi       999Mi        12Gi        16Mi       2.1Gi        14Gi]]
يعني الكاش كبر والفاضي قل، و [[available]] متحركش. وبعد مسح الملف رجع [[598Mi]] و [[14Gi]].

و [[grep]] على meminfo طبع [[MemTotal: 16074948 kB]] و [[MemAvailable: 15053316 kB]] و [[SwapFree: 4190812 kB]]. وفي container محدود بـ 200 ميجا رام واتملى، [[free -m]] بيّن [[Swap: 4096 327 3768]] (الـ swap اتستخدم) مع إن الـ VM كلها فيها 12 جيجا فاضيين: الحدود كانت على الـ container. ولو [[dmesg]] قالك [[dmesg: read kernel buffer failed: Operation not permitted]]، استخدم sudo.`
        },
        {
          cmd: "vmstat و iostat",
          title: "الجهاز بطيء: المعالج ولا الرام ولا الديسك؟",
          desc: R`[[vmstat]] بيطبع كل ثانية سطر فيه حالة المعالج والرام والـ swap والديسك مع بعض، و [[iostat]] بيفصّل الديسك: كل ديسك مشغول قد إيه، وكل عملية بتستنى قد إيه. مع بعض بيجاوبوا أول سؤال في أي بطء: الزنقة فين؟

[[vmstat 1 5]]: سطر كل ثانية، ٥ مرات. وأول سطر متوسط من ساعة ما الجهاز قام، فتجاهله. الأعمدة:
• [[r]] عمليات مستنية المعالج. لو أكبر من عدد الـ cores ([[nproc]]) باستمرار، المعالج هو الزنقة.
• [[b]] عمليات مستنية الديسك (blocked). لو مش صفر باستمرار، الديسك.
• [[swpd]] كام KB في الـ swap، و [[free]] الرام الفاضية، و [[buff]] و [[cache]] الكاش (درس «free -h»).
• [[si]] و [[so]] (swap in و out) KB في الثانية بتتنقل من وإلى الـ swap. أي رقم مستمر هنا = الرام مش مكفية، وده أوحش أنواع البطء.
• [[bi]] و [[bo]] (blocks in و out) KB في الثانية بتتقري وتتكتب على الديسك.
• [[in]] و [[cs]] الـ interrupts والـ context switches في الثانية.
• [[us]] نسبة وقت المعالج في برامجك، و [[sy]] في الـ kernel، و [[id]] فاضي، و [[wa]] مستني الديسك، و [[st]] (steal) وقت اتاخد منك لـ VM تانية على نفس الـ host؛ لو عالي على VPS، المشكلة عند الاستضافة مش عندك. و [[gu]] (في النسخ الجديدة زي أوبونتو 24.04) وقت VMs شغالة جوه جهازك انت.
و [[-S M]] الرام بالميجا بدل KB.

[[iostat]] من باكدج [[sysstat]]: [[-x]] (extended) الأعمدة المهمة، و [[-z]] يخبي الديسكات الواقفة، و [[1]] كل ثانية. وأول تقرير برضه متوسط من البداية. أهم الأعمدة:
• [[r/s]] و [[w/s]] عمليات قراية وكتابة في الثانية، و [[rkB/s]] و [[wkB/s]] الكمية.
• [[r_await]] و [[w_await]] متوسط وقت العملية بالمللي ثانية (على SSD المفروض أقل من ملي لحد كام ملي، وعلى HDD عشرات).
• [[aqu-sz]] طول الطابور.
• [[%util]] نسبة الوقت اللي الديسك كان مشغول فيه. قريبة من 100% على HDD يعني متشبّع، أما الـ NVMe فبيعمل حاجات كتير مع بعض، فممكن يبقى 100% ولسه عنده مساحة، فبص على await.

القرار:
• [[us]] + [[sy]] قريبين من 100 و [[r]] كبير: المعالج. [[top]] ورتّب بالـ CPU.
• [[si]] و [[so]] مش صفر و [[free]] صغير: الرام. [[free -h]] ودوّر مين بياكلها، أو زوّد swap أو رام.
• [[wa]] عالي، و [[b]] مش صفر، و [[%util]] أو [[await]] عاليين: الديسك. [[sudo iotop]] يقولك مين.
• كله هادي والبطء مستمر: الشبكة ([[nethogs]]) أو التطبيق نفسه مستني حاجة برّه (قاعدة بيانات أو API).`,
          example: R`nproc
vmstat 1 5
vmstat -S M 1 5
sudo apt install sysstat
iostat -xz 1 3
iostat -xz -d 2 3 nvme0n1`,
          try: R`افتح ترمنالين. في الأول [[vmstat 1]]. وفي التاني: مرة شغّل حمل على المعالج ([[sh -c 'while :; do :; done' &]] كذا مرة)، ومرة حمل على الديسك ([[dd if=/dev/zero of=big.bin bs=1M count=2000 oflag=direct]]). شوف أنهي أعمدة اتحركت في كل مرة، وامسح [[big.bin]] واقفل اللوب بـ [[kill]].`,
          mac: ["diff", R`على الماك [[vm_stat 1]] (بالـ pages مش KB، وأعمدة تانية) و [[iostat -w 1]] (نسخة BSD، أعمدة أقل)، و [[top -o cpu]]. والأوضح Activity Monitor.`],
          deep: {
            why: R`«السيرفر بطيء» ممكن يكون ١٠ أسباب، و top لوحده بيوريك البرامج مش نوع الزنقة. vmstat بيدّيك الصورة كلها في سطر كل ثانية، فتعرف تدوّر فين بدل ما تجرّب حلول عشوائية (تزوّد رام والمشكلة ديسك).`,
            how: R`الاتنين بيقروا عدّادات الـ kernel من [[/proc/stat]] و [[/proc/vmstat]] و [[/proc/diskstats]]: أرقام بتزيد من ساعة ما الجهاز قام. وكل ثانية بيطرحوا القراية القديمة من الجديدة ويقسموا على الوقت، فيطلع «في الثانية». عشان كده أول سطر (من غير قراية قبله) هو المتوسط من البداية.

و [[wa]] مش وقت «ضايع» بالظبط: معناه المعالج كان فاضي وفي نفس الوقت فيه عملية مستنية ديسك. ولو المعالج مشغول بحاجة تانية، wa ممكن يبقى صغير والديسك برضه زحمة، عشان كده بص على [[b]] و [[await]] كمان.`,
            when: R`أول دقيقة في أي «الموقع بطيء»: [[vmstat 1]] وانت بتعمل الطلب. VPS بطيء من غير سبب جوه: [[st]]. قاعدة بيانات بطيئة: [[iostat -xz 1]] على ديسكها. وقبل ما تكبّر السيرفر: تعرف تكبّر إيه بالظبط.`,
            mistakes: R`تقرا أول سطر وتبني عليه. وتفتكر [[free]] صغير يعني الرام خلصانة (بص على si و so و available). وتحكم على NVMe من [[%util]] لوحده. وتنسى [[-z]] فتغرق في ديسكات و loop devices واقفة.`
          },
          teach: R`## [[vmstat]] الصورة كلها في سطر كل ثانية، و [[iostat]] الديسك بالتفصيل

[[vmstat]] = virtual memory statistics، و [[iostat]] = input/output statistics. الناتج الهادي تحت اتشغّل على أوبونتو 24.04 جوه Docker على VM فيها 16 core، وأرقام الحمل من التجارب اللي في الحل.

---

## ١. [[nproc]]

~~~text الناتج
16
~~~

عدد الـ cores (المنطقية). محتاجه عشان تقارن بيه عمود [[r]].

---

## ٢. [[vmstat 1 5]]

[[1]] كل ثانية، و [[5]] خمس مرات.

~~~text الناتج
procs -----------memory---------- ---swap-- -----io---- -system-- -------cpu-------
 r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st gu
 2  0      0 13155804 335128 1829908    0    0   256  1590 2466    2  0  1 99  0  0  0
 0  0      0 13146804 335128 1830020    0    0     0     0 6612 11222  1  2 97  0  0  0
 0  0      0 13145580 335128 1830020    0    0     0     0 2040 3122  0  1 99  0  0  0
 2  0      0 13141560 335128 1830020    0    0     0     0 1715 2906  0  0 99  0  0  0
 0  0      0 13148848 335128 1830016    0    0     0     0 1431 1907  0  1 99  0  0  0
~~~

### أول سطر غير الباقي

شوف [[bi 256]] و [[bo 1590]] في السطر الأول وصفر بعده. vmstat بيقرا عدّادات من الـ kernel بتزيد من ساعة ما الجهاز قام. كل سطر بعد الأول = (القراية دي − اللي قبلها) ÷ ثانية. والأول ملوش «قبله»، فهو متوسط من البداية. **تجاهله**.

### المجموعات

السطر الأول في الناتج أسامي مجموعات، والتاني أسامي الأعمدة:

| المجموعة | العمود | معناه | الوحدة |
|---|---|---|---|
| procs | [[r]] | عمليات جاهزة ومستنية المعالج | عدد |
| procs | [[b]] | عمليات مستنية الديسك (blocked) | عدد |
| memory | [[swpd]] | مستخدم من الـ swap | KB |
| memory | [[free]] و [[buff]] و [[cache]] | زي [[free]] (درس free -h) | KB |
| swap | [[si]] و [[so]] | swap in و out: رايح جاي من الـ swap | KB/ثانية |
| io | [[bi]] و [[bo]] | blocks in و out: قراية وكتابة على الديسك | KB/ثانية |
| system | [[in]] و [[cs]] | interrupts و context switches | في الثانية |
| cpu | [[us]] [[sy]] [[id]] [[wa]] [[st]] [[gu]] | user و system و idle و wait و steal و guest | % |

### ونقرا عمود الـ CPU

[[us 0 sy 1 id 99]] يعني المعالج 99% فاضي. [[wa]] وقت كان فاضي ومستني ديسك، و [[st]] (steal) وقت خدته منك VM تانية على نفس السيرفر (مهم على VPS)، و [[gu]] وقت VMs شغالة جوه جهازك.

---

## ٣. [[vmstat -S M 1 5]]

[[-S M]] (scale) الرام بالميجا بدل KB:

~~~text الناتج
 r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st gu
 1  0      0  12840    327   1787    0    0   255  1589 2466    2  0  1 99  0  0  0
 0  0      0  12840    327   1787    0    0     0 103812  746  877  0  2 98  0  0  0
~~~

[[12840]] ميجا فاضي أسهل في القراية من [[13155804]]. و [[bo 103812]] في السطر التاني: حاجة كتبت حوالي 100 ميجا في الثانية دي (أعمدة io بتفضل KB).

---

## ٤. نقرا vmstat تحت الحمل (من الحل)

| الحالة | اللي اتحرك |
|---|---|
| ٤ عمليات بتاكل CPU | [[r]] بقى 4، و [[us 25]]: 4 من 16 core = 25% |
| حمل ديسك | [[b]] بقى 1 و 2، و [[bi]] و [[bo]] بالآلاف، و [[wa 10]] |
| رام مش مكفية | [[si 116672 so 50052]]: أكتر من 100 ميجا في الثانية رايحة جاية من الـ swap |

---

## ٥. [[sudo apt install sysstat]]

[[iostat]] جاي في باكدج اسمه [[sysstat]].

---

## ٦. [[iostat -xz 1 3]]

| الحتة | معناها |
|---|---|
| [[-x]] | extended: كل الأعمدة المهمة |
| [[-z]] | خبّي الديسكات اللي معملتش حاجة |
| [[1 3]] | كل ثانية، ٣ مرات |

~~~text أول تقرير (مختصر)
avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           0.40    0.00    0.61    0.17    0.00   98.82

Device            r/s     rkB/s ... r_await ...     w/s     wkB/s ... w_await ...  aqu-sz  %util
sdd              9.26    179.79 ...    0.37 ...   25.58   1603.26 ...    2.26 ...    0.08   2.91
~~~

[[avg-cpu]] نفس فكرة عمود cpu في vmstat. وتحته سطر لكل ديسك:

| العمود | معناه |
|---|---|
| [[r/s]] و [[w/s]] | عمليات قراية وكتابة في الثانية |
| [[rkB/s]] و [[wkB/s]] | كمية القراية والكتابة |
| [[r_await]] و [[w_await]] | العملية الواحدة بتاخد كام ملي ثانية (هنا 0.37 و 2.26) |
| [[aqu-sz]] | average queue size: طول الطابور |
| [[%util]] | الديسك كان مشغول كام % من الوقت |

وبرضه أول تقرير متوسط من البداية. التقارير اللي بعده طلعت بالعناوين بس من غير ولا ديسك: [[-z]] خبّاهم لأنهم كانوا واقفين.

---

## ٧. [[iostat -xz -d 2 3 nvme0n1]]

[[-d]] (device) الديسكات بس من غير [[avg-cpu]]، و [[2 3]] كل ثانيتين ٣ مرات، و [[nvme0n1]] اسم ديسك واحد. هنا الديسك اسمه [[sdd]]، فشغّلناه [[iostat -xz -d 2 2 sdd]] وطلّع سطر [[sdd]] بس. اسم ديسكك من [[lsblk]].

---

| لو شفت | الزنقة في |
|---|---|
| [[r]] أكبر من [[nproc]] و [[us]] + [[sy]] قريب من 100 | المعالج |
| [[si]] و [[so]] مش صفر | الرام |
| [[b]] مش صفر و [[wa]] و [[await]] عاليين | الديسك |
| كله هادي | الشبكة أو حاجة برّه (قاعدة بيانات، API) |

> على الماك [[vm_stat 1]] و [[iostat -w 1]] بأعمدة مختلفة (من الـ man pages). وعلى ويندوز Task Manager ← Performance، أو [[Get-Counter '\Processor(_Total)\% Processor Time']] في PowerShell.

## الخلاصة

[[vmstat 1]] وتجاهل أول سطر: [[r]] للمعالج، و [[si]]/[[so]] للرام، و [[b]]/[[wa]] للديسك. ولو الديسك، [[iostat -xz 1]] يقولك أنهي ديسك وقد إيه بطيء.`,
          lines: [
            R`عدد الـ cores، عشان تقارن بيه عمود r.`,
            R`سطر كل ثانية، ٥ مرات (تجاهل الأول).`,
            R`نفس الكلام والرام بالميجا.`,
            R`سطّب iostat.`,
            R`تفاصيل كل ديسك شغال ([[-x]] و [[-z]]) كل ثانية، ٣ مرات.`,
            R`ديسك واحد بس ([[-d]] من غير جزء المعالج)، كل ثانيتين.`
          ],
          sol: R`ناتج حقيقي من containers على VM بتاعة Docker (16 core):
هادي: [[r 0 b 0 ... si 0 so 0 bi 0 bo 0 ... us 0 sy 0 id 100 wa 0]].
٤ عمليات بتاكل CPU: [[r]] بقى 4 و [[us 25 sy 1 id 74]] (4 من 16 core = 25%).
حمل ديسك (fio بيقرا ويكتب عشوائي): [[b]] بقى 1 و 2، و [[bi 29196 bo 30420]]، و [[wa 10]]. و [[iostat -xz 1]] على الديسك ده: [[r/s 7227.00]] و [[w/s 7131.00]] و [[r_await 0.15]] و [[w_await 0.10]] و [[aqu-sz 1.74]] و [[%util 86.80]]: الديسك مشغول بس كل عملية بتخلص في أقل من ملي (SSD)، و [[avg-cpu]] فيه [[%iowait 10.58]].
رام مش مكفية (container محدود بـ 200 ميجا وبرنامج عايز 500): [[si 116672 so 50052]] و [[swpd 424340]]، والـ swap بيتقرا ويتكتب بأكتر من 100 ميجا في الثانية، وده بطء كبير مع إن [[us]] صفر تقريبًا.

ولو [[iostat]] قالك command not found، سطّب [[sysstat]]. ولو اسم الديسك مش [[nvme0n1]] عندك، [[lsblk]] يقولك اسمه.`
        },
        {
          cmd: "ffmpeg",
          title: "حوّل وصغّر وقص الفيديو والصوت",
          desc: R`[[ffmpeg]] بيعمل أي حاجة تقريبًا في الفيديو والصوت من الترمنال: يحوّل من صيغة لصيغة، ويصغّر الحجم، ويطلّع الصوت، ويقص جزء، ويغيّر المقاس، ويعمل GIF. ومعاه [[ffprobe]] اللي بيقولك الملف جواه إيه. وبرامج فيديو كتير بتستخدمه من جوه.

التسطيب: أوبونتو وديبيان [[sudo apt install ffmpeg]]. فيدورا: [[sudo dnf install ffmpeg]] بعد ما تفعّل RPM Fusion (اللي في repo فيدورا الرسمي اسمه [[ffmpeg-free]] ومن غير بعض الـ codecs زي H.264). الماك [[brew install ffmpeg]]، وويندوز [[winget install Gyan.FFmpeg]].

الشكل: [[-i]] الملف الداخل، وآخر حاجة الملف الخارج، وامتداده بيحدد النوع. وفي النص الإعدادات: [[-c:v]] الـ codec بتاع الفيديو و [[-c:a]] بتاع الصوت، و [[copy]] يعني انسخه زي ما هو من غير ما تعيد ضغطه (لحظي ومن غير ما الجودة تقل). و [[-y]] يكتب فوق الملف الخارج من غير سؤال، ومن غيرها بيسأل [[Overwrite? [y/N]]]. و [[-hide_banner]] يخبي معلومات النسخة الطويلة.

التحويل والضغط: [[ffmpeg -i in.mov out.mp4]] بيختار H.264 و AAC لوحده. وللضغط: [[-c:v libx264 -crf 28 -preset slow]]:
• [[-crf]] الجودة من 0 (من غير فقد) لـ 51، والافتراضي 23. وكل +6 تقريبًا نص الحجم، و 18 قريب من الأصل للعين، و 28 كويس للواتساب والإيميل.
• [[-preset]] من [[ultrafast]] لـ [[veryslow]]: الأبطأ بيطلّع ملف أصغر بنفس الجودة.
• [[-b:a 128k]] جودة الصوت.
جربت على فيديو تجربة 1080p عشر ثواني: الأصل 117 ميجا، والتحويل العادي 8.6 ميجا، و [[crf 28 slow]] طلع 3.6 ميجا.

الصوت: [[-vn]] (no video) شيل الفيديو. و [[-c:a copy audio.m4a]] بيطلّعه زي ما هو (AAC جوه m4a)، و [[-c:a libmp3lame -q:a 2]] يحوّله mp3 بجودة عالية ([[-q:a]] من 0 الأحسن لـ 9).

القص: [[-ss 00:01:30 -to 00:02:00]] من دقيقة ونص لدقيقتين، و [[-c copy]] من غير إعادة ضغط. المشكلة: الفيديو المضغوط فيه «keyframes» كل كام ثانية، وباقي الفريمات مجرد فروق عنها، فالنسخ من غير ضغط لازم يبدأ من keyframe. جربت قص من 2.5 لـ 6 ثواني بـ [[-c copy]] وأقرب keyframe قبله كان عند الصفر، فالملف طلع فيه 182 فريم بدل 105، والمشغّل يا إما بيخفي الزيادة يا إما بيعرض صورة واقفة في الأول. لو محتاج دقة: شيل [[-c copy]] وسيبه يعيد الضغط (أبطأ بس مظبوط على الفريم).

المقاس: [[-vf scale=1280:-2]]: [[-vf]] (video filter)، و 1280 العرض، و [[-2]] الطول يتحسب بنفس النسبة ويتقرّب لرقم زوجي، لأن H.264 لازم أبعاده زوجية. و [[-1]] ممكن يطلّع رقم فردي ويفشل بـ [[width not divisible by 2]] (جربتها بعرض 1001).

الـ GIF: [[fps=10]] فريمات أقل، و [[palettegen]] و [[paletteuse]] بيعملوا ألوان مخصوصة للفيديو ده (الـ GIF فيه 256 لون بس) فيطلع أنضف بكتير، و [[split]] بيعمل نسختين من الفيديو للخطوتين، و [[-loop 0]] يتكرر على طول، و [[-t 3]] مدة 3 ثواني.

[[ffprobe in.mov]] بيطبع المدة والـ bitrate وكل stream: [[Video: h264 ... 1920x1080 ... 30 fps]] و [[Audio: aac ...]]. و [[-v error -show_entries format=duration,size -of default=nw=1]] قيم بس للسكربتات. ولو هتحوّل فولدر كامل، نفس فكرة لوب «convert-all.sh».`,
          example: R`sudo apt install ffmpeg
ffprobe -hide_banner in.mov
ffmpeg -i in.mov out.mp4
ffmpeg -i in.mov -c:v libx264 -crf 28 -preset slow -c:a aac -b:a 128k small.mp4
ffmpeg -i out.mp4 -vn -c:a copy audio.m4a
ffmpeg -i out.mp4 -vn -c:a libmp3lame -q:a 2 audio.mp3
ffmpeg -ss 00:01:30 -to 00:02:00 -i out.mp4 -c copy clip.mp4
ffmpeg -i out.mp4 -vf scale=1280:-2 -c:a copy out-720p.mp4
ffmpeg -ss 5 -t 3 -i out.mp4 -vf "fps=10,scale=480:-1:flags=lanczos,split[a][b];[a]palettegen[p];[b][p]paletteuse" -loop 0 clip.gif
ffprobe -v error -show_entries format=duration,size -of default=nw=1 small.mp4`,
          try: R`لو معندكش فيديو، اعمل واحد تجربة: [[ffmpeg -f lavfi -i testsrc2=duration=10:size=1920x1080:rate=30 -f lavfi -i sine=frequency=440:duration=10 -c:v libx264 -c:a aac -shortest in.mov]]. بعدين جرّب كل سطر في المثال وقارن الأحجام بـ [[ls -lh]]، وشغّل الـ GIF في المتصفح.`,
          mac: ["both", R`[[brew install ffmpeg]] ونفس الأوامر بالظبط. وعلى ويندوز [[winget install Gyan.FFmpeg]] وبعدين افتح ترمنال جديد عشان الـ PATH يتحدّث.`],
          deep: {
            why: R`فيديو من الموبايل حجمه 500 ميجا ومحتاج تبعته، أو شرح متسجّل محتاج تقص أوله، أو فيديو لموقعك محتاج نسخة 720p أصغر، أو صوت محاضرة من فيديو. برامج الواجهة بتعمل ده بس ببطء وواحد واحد، و ffmpeg بيعمله بأمر واحد تقدر تحطه في سكربت على فولدر كامل أو على السيرفر.`,
            how: R`ملف الفيديو «container» (mp4 أو mov أو mkv) جواه streams: فيديو مضغوط بـ codec (H.264 أو H.265 أو VP9) وصوت (AAC أو MP3 أو Opus). ffmpeg بيفك الـ container، ويفك ضغط كل stream (decode)، ويعدّي الفريمات على الفلاتر (scale و fps)، ويضغطها تاني (encode)، ويحطها في container جديد. و [[copy]] بيتخطى الفك والضغط: بينقل البيانات المضغوطة زي ما هي، عشان كده سريع جدًا بس مينفعش معاه فلاتر ولا قص على فريم مش keyframe.

و [[-crf]] بيقول للـ encoder «حافظ على جودة ثابتة» بدل «حجم ثابت»، فالمشاهد البسيطة تاخد بيانات أقل والمعقدة أكتر.`,
            when: R`تصغير فيديو قبل ما تبعته أو ترفعه. قص من غير إعادة ضغط لتسجيل طويل. استخراج صوت لـ podcast أو تفريغ. نسخ بأحجام مختلفة لموقع. GIF لـ README أو issue. و [[ffprobe]] في سكربت يتأكد إن الملف المرفوع فيديو فعلًا ومدته أقل من حد معين.`,
            mistakes: R`[[-c copy]] مع [[-vf]] (الفلتر محتاج re-encode، فهيقولك error). والقص بـ copy وتستغرب البداية الواقفة. و [[scale=1280:-1]] فيطلع رقم فردي ويفشل. وترتيب الـ options: اللي قبل [[-i]] بيخص الملف الداخل واللي بعده للخارج. و ffmpeg جوه لوب [[while read]]: بياكل الـ stdin، فاستخدم [[-nostdin]].`
          },
          teach: R`## [[ffmpeg]]: ملف داخل، شوية إعدادات، ملف خارج

كل أوامر ffmpeg ليها نفس الهيكل:

~~~text
ffmpeg  [إعدادات الداخل]  -i in.mov  [إعدادات الخارج]  out.mp4
~~~

اللي قبل [[-i]] بيخص الملف الداخل، واللي بعده بيخص الخارج، وآخر كلمة اسم الملف الخارج وامتداده بيحدد نوعه. كل الأوامر اتشغّلت بـ ffmpeg 6.1.1 على أوبونتو 24.04 جوه Docker، على فيديو تجربة دقيقتين 1920x1080 اتعمل بـ [[testsrc2]] (فيديو اختبار ملوّن بيتحرك جاي مع ffmpeg، زي اللي في «جرّب»).

---

## ١. [[sudo apt install ffmpeg]]

بيسطّب [[ffmpeg]] و [[ffprobe]] مع بعض. اتأكد:

~~~text ffmpeg -version | head -1
ffmpeg version 6.1.1-3ubuntu5 Copyright (c) 2000-2023 the FFmpeg developers
~~~

---

## ٢. [[ffprobe -hide_banner in.mov]]

[[ffprobe]] بيقرا الملف ويوصفه من غير ما يغيّر حاجة. و [[-hide_banner]] بيخفي سطور النسخة والـ libraries الطويلة.

~~~text الناتج (مختصر)
Input #0, mov,mp4,m4a,3gp,3g2,mj2, from 'in.mov':
  Duration: 00:02:00.00, start: 0.000000, bitrate: 7108 kb/s
  Stream #0:0[0x1]: Video: h264 (High) ..., yuv420p(progressive), 1920x1080 [SAR 1:1 DAR 16:9], 6396 kb/s, 30 fps
  Stream #0:1[0x2]: Audio: pcm_s16le ..., 44100 Hz, mono, s16, 705 kb/s
~~~

| الحتة | معناها |
|---|---|
| [[Duration: 00:02:00.00]] | المدة: دقيقتين |
| [[bitrate: 7108 kb/s]] | كام كيلوبت في الثانية للملف كله. الحجم ≈ bitrate × المدة |
| [[Stream #0:0]] | أول stream (العد من صفر): الفيديو |
| [[h264 (High)]] | الـ codec: طريقة ضغط الفيديو |
| [[1920x1080]] | العرض × الطول |
| [[30 fps]] | frames per second |
| [[Stream #0:1]] | التاني: الصوت |
| [[pcm_s16le]] | صوت من غير ضغط خالص، عشان كده 705 kb/s |
| [[44100 Hz, mono]] | عيّنات في الثانية، وقناة واحدة |

يعني الملف «container» (mov) جواه streams، وكل stream مضغوط بـ codec.

---

## ٣. [[ffmpeg -i in.mov out.mp4]]

من غير أي إعدادات، ffmpeg بيختار لـ mp4 الافتراضي: فيديو H.264 بـ [[libx264]] وصوت [[aac]]:

~~~text ffprobe على out.mp4
h264,video
aac,audio
~~~

وفي الآخر بيطبع ملخص، وأهم رقم فيه:

~~~text آخر الناتج
[libx264 @ 0x56876e1e2c00] kb/s:6093.02
~~~

ده الـ bitrate اللي طلع للفيديو. وخد 37 ثانية لفيديو دقيقتين.

---

## ٤. [[ffmpeg -i in.mov -c:v libx264 -crf 28 -preset slow -c:a aac -b:a 128k small.mp4]]

| الحتة | معناها |
|---|---|
| [[-c:v libx264]] | codec الفيديو ([[:v]] = video): H.264 |
| [[-crf 28]] | constant rate factor: الجودة. 0 من غير فقد، 23 الافتراضي، 51 أوحش. أكبر = أصغر حجم |
| [[-preset slow]] | خد وقتك في الضغط، فالملف يصغر بنفس الجودة |
| [[-c:a aac]] | codec الصوت ([[:a]] = audio) |
| [[-b:a 128k]] | bitrate الصوت: 128 كيلوبت في الثانية |

~~~text آخر الناتج
[libx264 @ 0x5636dd78fbc0] kb/s:2972.22
~~~

الـ bitrate نزل من 6093 لـ 2972، تقريبًا النص.

~~~text ls -l
106634677  in.mov
 92563276  out.mp4
 46635554  small.mp4
~~~

[[out.mp4]] مصغرش كتير عن الأصل لأن [[testsrc2]] فيه حركة وتفاصيل في كل فريم وده أصعب حاجة تتضغط. فيديو موبايل عادي بيصغر أكتر بكتير (في الحل فيديو 10 ثواني نزل من 117 ميجا لـ 3.6).

---

## ٥. [[ffmpeg -i out.mp4 -vn -c:a copy audio.m4a]]

[[-vn]] (video no): متطلّعش فيديو. و [[-c:a copy]]: الصوت انسخه زي ما هو من غير ما تفكه وتضغطه تاني. فالصوت AAC اتحط في [[m4a]] (الـ container بتاع AAC):

~~~text ffprobe audio.m4a
aac
~~~

[[copy]] لحظي، ومفيش خسارة في الجودة.

## ٦. [[ffmpeg -i out.mp4 -vn -c:a libmp3lame -q:a 2 audio.mp3]]

هنا محتاج تحويل فعلًا (AAC لـ MP3)، فـ [[libmp3lame]] الـ encoder بتاع mp3، و [[-q:a 2]] (quality) جودة متغيرة من 0 (الأحسن) لـ 9. والحجم: [[audio.mp3]] = 591004 بايت قصاد [[audio.m4a]] = 1060742.

---

## ٧. [[ffmpeg -ss 00:01:30 -to 00:02:00 -i out.mp4 -c copy clip.mp4]]

[[-ss]] (seek start) و [[-to]] قبل [[-i]]، يعني بيخصوا الداخل: ابدأ القراية من 1:30 لحد 2:00. و [[-c copy]] الفيديو والصوت من غير إعادة ضغط.

~~~text ffprobe على clip.mp4
duration=30.000000
nb_frames=1100
~~~

30 ثانية × 30 fps = 900 فريم، بس الملف فيه 1100. ليه؟

### الـ keyframes

الفيديو المضغوط فيه فريمات كاملة (keyframes) كل شوية، والباقي «الفرق عن اللي قبله». [[copy]] مينفعش يبدأ من نص الفرق، لازم يبدأ من keyframe. سألنا ffprobe الـ keyframes فين في [[out.mp4]]:

~~~text أماكن الـ keyframes بالثانية
0 8.33 16.67 25 33.33 41.67 50 58.33 66.67 75 83.33 91.67 100 108.33 116.67
~~~

أقرب keyframe قبل 90 هو 83.33، يعني 6.67 ثانية زيادة = 200 فريم. المشغّل بيخفيهم أو بيعرض صورة واقفة في الأول. لو محتاج القص مظبوط: شيل [[-c copy]].

---

## ٨. [[ffmpeg -i out.mp4 -vf scale=1280:-2 -c:a copy out-720p.mp4]]

[[-vf]] (video filter) عدّي الفريمات على فلتر. [[scale=1280:-2]] العرض 1280، والطول [[-2]] = احسبه بنفس النسبة وقرّبه لرقم زوجي (H.264 محتاج أبعاد زوجية):

~~~text ffprobe على out-720p.mp4
1280,720
~~~

1920 → 1280 يعني × ⅔، و 1080 × ⅔ = 720. و [[-c:a copy]] الصوت زي ما هو.

والفلتر محتاج يفك الفريمات، فمينفعش مع [[-c copy]] للفيديو. جربناها:

~~~text ffmpeg -i out.mp4 -vf scale=1280:-2 -c copy bad.mp4
Filtergraph 'scale=1280:-2' was specified, but codec copy was selected. Filtering and streamcopy cannot be used together.
~~~

---

## ٩. الـ GIF

~~~bash
ffmpeg -ss 5 -t 3 -i out.mp4 -vf "fps=10,scale=480:-1:flags=lanczos,split[a][b];[a]palettegen[p];[b][p]paletteuse" -loop 0 clip.gif
~~~

[[-ss 5]] ابدأ من الثانية 5، و [[-t 3]] (time) خد 3 ثواني. والفلتر سلسلة، كل حتة مفصولة بـ [[,]]، والـ [[;]] بتبدأ فرع جديد:

| الحتة | بتعمل |
|---|---|
| [[fps=10]] | 10 فريمات في الثانية بدل 30 |
| [[scale=480:-1:flags=lanczos]] | عرض 480، والطول بالنسبة ([[-1]] تمام هنا لأن GIF مش محتاج زوجي)، و [[lanczos]] طريقة تصغير أنضف |
| [[split[a][b]]] | اعمل نسختين من الفيديو اسمهم a و b |
| [[[a]palettegen[p]]] | من a اعمل لستة أحسن 256 لون للفيديو ده، واسمها p |
| [[[b][p]paletteuse]] | لوّن b بالـ palette دي |

و [[-loop 0]] يتكرر على طول.

~~~text ffprobe على clip.gif
width=480
height=270
nb_frames=30
~~~

3 ثواني × 10 = 30 فريم، و 270 = 1080 × (480 ÷ 1920). والحجم 471940 بايت.

---

## ١٠. [[ffprobe -v error -show_entries format=duration,size -of default=nw=1 small.mp4]]

للسكربتات: [[-v error]] متطبعش غير الأخطاء، و [[-show_entries format=duration,size]] القيمتين دول بس من قسم format، و [[-of default=nw=1]] (output format، no wrappers) من غير [[[FORMAT]]] حواليهم:

~~~text الناتج
duration=120.000000
size=46635554
~~~

---

| عايز | المفتاح |
|---|---|
| تعرف الملف جواه إيه | [[ffprobe]] |
| تصغّر | [[-crf]] أكبر و [[-preset slow]] |
| من غير إعادة ضغط | [[-c copy]] (ومن غير فلاتر) |
| الصوت بس | [[-vn]] |
| تقص | [[-ss]] و [[-to]] أو [[-t]] |
| مقاس | [[-vf scale=W:-2]] |

> على الماك [[brew install ffmpeg]] وعلى ويندوز [[winget install Gyan.FFmpeg]]، والأوامر نفسها بالظبط (من الـ docs). بس في PowerShell حط الفلتر الطويل بين single quotes.

## الخلاصة

[[-i]] الداخل، وآخر كلمة الخارج، و [[:v]] و [[:a]] للفيديو والصوت. [[copy]] سريع ومن غير خسارة، بس مينفعش معاه فلتر ولا قص مظبوط.`,
          lines: [
            R`سطّب ffmpeg (و ffprobe معاه).`,
            R`الملف جواه إيه: المدة والـ codecs والمقاس.`,
            R`حوّله mp4 بالإعدادات الافتراضية (H.264 و AAC).`,
            R`صغّره: جودة 28، وضغط أبطأ وأصغر، وصوت 128k.`,
            R`طلّع الصوت زي ما هو من غير فيديو ([[-vn]]).`,
            R`طلّع الصوت mp3 بجودة عالية.`,
            R`قص من 1:30 لـ 2:00 من غير إعادة ضغط (بيبدأ من أقرب keyframe).`,
            R`صغّر المقاس لعرض 1280، والطول بالنسبة ورقم زوجي.`,
            R`GIF لـ 3 ثواني من الثانية 5: 10 فريمات في الثانية، وعرض 480، وألوان مخصوصة، ويتكرر.`,
            R`المدة والحجم بس، سطر لكل قيمة.`
          ],
          sol: R`ناتج حقيقي من ffmpeg 6.1.1 على container أوبونتو 24.04، على فيديو تجربة 1920x1080 عشر ثواني:
[[ffprobe]]: [[Duration: 00:00:10.00, start: 0.000000, bitrate: 98189 kb/s]] و [[Stream #0:0[0x1]: Video: h264 (High) ... 1920x1080 ... 30 fps]] و [[Stream #0:1[0x2]: Audio: pcm_s16le ... 44100 Hz, mono]].
الأحجام: [[in.mov]] = 122736332 byte (117 ميجا)، و [[out.mp4]] = 8988849 (8.6 ميجا) في 5.4 ثانية، و [[small.mp4]] = 3728889 (3.6 ميجا) في 5.1 ثانية. وآخر سطر في التحويل: [[frame=  300 fps= 63 q=-1.0 Lsize=    8778kB time=00:00:09.98 bitrate=7202.2kbits/s speed=2.08x]].
الصوت: [[audio.m4a]] 89303 byte و [[audio.mp3]] 49866.
القص بـ copy (2.5 لـ 6): [[duration=3.633984]] و [[nb_frames=182]]، ونفس القص بإعادة ضغط: [[duration=3.500000]] و [[nb_frames=105]]. والـ keyframes كانت عند 0 و 4.57 و 8.63 ثانية.
[[scale=1280:-2]] طلّع [[1280,720]] و 2.5 ميجا، و [[scale=1001:-1]] فشل بـ [[width not divisible by 2 (1001x563)]]. والـ GIF طلع [[480x270]] و 30 فريم و 1.4 ميجا. ولو الملف الخارج موجود من غير [[-y]]: [[File 'out2.mp4' already exists. Overwrite? [y/N]]].`
        },
        {
          cmd: "fdisk و mkfs و dd",
          title: "فرمت فلاشة أو اعملها bootable",
          desc: R`[[fdisk]] بيقسّم الديسك أو الفلاشة لـ partitions، و [[mkfs]] بيعمل filesystem على partition (يعني «فرمتة»)، و [[dd]] بينسخ بايتات خام من ملف لجهاز، وبيه بتكتب ISO على فلاشة عشان تبوّت منها وتسطّب لينكس. التلاتة بيكتبوا على الجهاز مباشرة، ومفيش سلة مهملات ولا «متأكد؟».

تحذير كبير: لو كتبت اسم الجهاز غلط ([[/dev/sdX]])، هتمسح الديسك اللي عليه نظامك أو ملفاتك في ثانية، ومفيش رجوع. [[sda]] غالبًا الديسك الأساسي (و [[nvme0n1]] على اللابتوبات الحديثة)، والفلاشة غالبًا [[sdb]] أو [[sdc]]، بس «غالبًا» مش كفاية: اتأكد كل مرة، وفي كل الأوامر تحت [[sdX]] لازم تستبدله باسم فلاشتك.

تعرف الفلاشة: [[lsblk -o NAME,SIZE,TYPE,TRAN,RM,MODEL,MOUNTPOINTS]]: [[TRAN]] (transport) بيقول [[usb]] للفلاشة، و [[RM]] (removable) 1، و [[SIZE]] و [[MODEL]] بيطابقوا اللي مكتوب عليها (29.3G و SanDisk مثلًا). وأضمن طريقة: [[lsblk]] قبل ما توصّلها وبعدها، والاسم الجديد هو هي. ولو متركّبة (عمود MOUNTPOINTS فيه حاجة): [[sudo umount /dev/sdX1]] الأول.

[[sudo wipefs -a /dev/sdX]] (all) يمسح علامات الـ filesystem وجدول الـ partitions القديم وبيطبع كل اللي مسحه. وده أنضف من [[dd]] بأصفار على أول ميجا: جدول GPT ليه نسخة احتياطية في آخر الديسك، و dd على الأول بيسيبها (جربتها: wipefs لسه لقى [[gpt]] في الآخر).

الـ partitions: [[sudo fdisk /dev/sdX]] ويفتح [[Command (m for help):]]: [[g]] جدول GPT جديد (أو [[o]] جدول MBR للأجهزة القديمة)، و [[n]] partition جديد (Enter على كل سؤال = الديسك كله)، و [[t]] النوع (لفلاشة هتفتح على ويندوز: Microsoft basic data، واكتب [[L]] للستة)، و [[p]] اعرض، و [[w]] اكتب واخرج. ولحد [[w]] مفيش حاجة اتكتبت، و [[q]] يخرج من غير حفظ. أو بأمر واحد من غير أسئلة: [[sudo parted -s /dev/sdX mklabel gpt mkpart usb 1MiB 100%]]: [[-s]] (script) من غير أسئلة، و [[mklabel gpt]] جدول جديد، و [[mkpart usb 1MiB 100%]] partition اسمه usb من أول ميجا لآخر الديسك.

الـ filesystem (على الـ partition [[sdX1]] مش الجهاز كله [[sdX]]):
• [[sudo mkfs.exfat -L MYUSB /dev/sdX1]]: exFAT بيفتح على ويندوز والماك ولينكس وبيقبل ملفات أكبر من 4 جيجا، فده الأنسب لفلاشة نقل (من باكدج [[exfatprogs]]).
• [[mkfs.vfat -F 32]] FAT32: للأجهزة القديمة والتلفزيونات، بس الملف الواحد ميعدّيش 4 جيجا.
• [[mkfs.ext4]] لو هتستخدمها على لينكس بس (باك أب مثلًا).
و [[-L]] (label) الاسم اللي بيظهر. و [[sudo blkid /dev/sdX1]] يأكد النوع والاسم والـ UUID.

فلاشة bootable: [[sudo dd if=ubuntu.iso of=/dev/sdX bs=4M status=progress conv=fsync]]:
• [[if]] (input file) الـ ISO، و [[of]] (output file) الفلاشة كلها [[sdX]] مش [[sdX1]]، لأن الـ ISO جواه جدول partitions بتاعه.
• [[bs=4M]] يقرا ويكتب ٤ ميجا في المرة (أسرع بكتير من الافتراضي 512 byte).
• [[status=progress]] يطبع التقدم وانت مستني.
• [[conv=fsync]] ميخلصش غير لما الداتا تتكتب فعلًا على الفلاشة مش في كاش الرام، فلما الـ prompt يرجع تقدر تشيلها.
والـ ISO اتأكد منه الأول بـ [[sha256sum]] (درس «sha256sum» في تاب «VPS»). ولو مش مرتاح لـ dd: «Startup Disk Creator» في أوبونتو أو balenaEtcher بيعملوا نفس الحاجة وبيخفوا ديسك النظام من الاختيارات.

وجربت كل ده على «فلاشة وهمية»، مش ديسك حقيقي: ملف 2 جيجا اتحوّل لجهاز بـ [[losetup]] جوه container. وتقدر تتدرّب بنفس الطريقة من غير أي خطر: [[truncate -s 2G usb.img]] و [[sudo losetup -fP --show usb.img]] بيطلّعلك [[/dev/loopN]] تجرّب عليه بدل sdX، و [[sudo losetup -d /dev/loopN]] لما تخلص.`,
          example: R`# بص مرتين: الاسم اللي هتكتبه بدل sdX بيتمسح كله
lsblk -o NAME,SIZE,TYPE,TRAN,RM,MODEL,MOUNTPOINTS
sudo umount /dev/sdX1
sudo wipefs -a /dev/sdX
sudo parted -s /dev/sdX mklabel gpt mkpart usb 1MiB 100%
sudo mkfs.exfat -L MYUSB /dev/sdX1
sudo blkid /dev/sdX1
# أو فلاشة bootable من ISO (بتمسح اللي فوق ده كله)
sha256sum ubuntu.iso
sudo dd if=ubuntu.iso of=/dev/sdX bs=4M status=progress conv=fsync
sync`,
          try: R`من غير فلاشة حقيقية: [[truncate -s 2G usb.img]] و [[sudo losetup -fP --show usb.img]]، واستخدم الـ [[/dev/loopN]] اللي طلع مكان sdX في كل الأوامر: امسحه، واعمل partition بـ fdisk بإيدك (g و n و w)، وفرمته exFAT، واقرا [[blkid]]. وفي الآخر [[sudo losetup -d]] وامسح [[usb.img]].`,
          flag: "danger",
          mac: ["diff", R`على الماك الأسامي [[/dev/disk4]] مثلًا: [[diskutil list]] تعرف الفلاشة، و [[diskutil eraseDisk ExFAT MYUSB GPT /dev/disk4]] تفرمتها. وللـ ISO: [[diskutil unmountDisk /dev/disk4]] وبعدين [[sudo dd if=ubuntu.iso of=/dev/rdisk4 bs=4m]] ([[rdisk]] أسرع، و [[m]] صغيرة، و Ctrl+T يوريك التقدم).`],
          deep: {
            why: R`فلاشة اتبوّظت أو مش بتفتح على جهاز، أو محتاج فلاشة exFAT تنقل بيها ملف 8 جيجا، أو بتسطّب لينكس على جهاز جديد ومحتاج فلاشة bootable. وعلى سيرفر الأوامر دي نفسها هي اللي بتجهّز ديسك جديد. والفرق بين إنك تعرفها وإنك تنسخها من شرح هو الفرق بين فلاشة متفرمتة وديسك ضاع.`,
            how: R`في لينكس كل ديسك ملف في [[/dev]]: [[sdb]] الجهاز كله، و [[sdb1]] أول partition. أول حتة في الجهاز فيها جدول الـ partitions (MBR أو GPT): «partition 1 من هنا لهنا». fdisk و parted بيكتبوا الجدول ده بس. و mkfs بيكتب جوه partition البنية اللي بتنظّم الملفات (filesystem). و wipefs بيمسح «التوقيعات» اللي البرامج بتعرف منها نوع اللي موجود.

و dd مبيفهمش ملفات ولا partitions: بيقرا bytes من [[if]] ويكتبها في [[of]] بالترتيب. عشان كده ISO على الجهاز كله بيطلع نسخة طبق الأصل (جدول partitions وكل حاجة)، وعشان كده الغلطة في [[of]] بتكتب فوق أي حاجة من غير ما يسأل.`,
            when: R`فلاشة نقل بين ويندوز وماك ولينكس: exFAT. فلاشة لتلفزيون قديم: FAT32. تسطيب لينكس: dd أو Startup Disk Creator. ديسك جديد على سيرفر: نفس الخطوات بـ ext4 (وبعدها fstab، درس «lsblk / mount» في تاب «VPS»). وفلاشة bootable عايز ترجّعها عادية: wipefs وبعدين partition و mkfs.`,
            mistakes: R`الاسم الغلط في [[of=]] أو [[wipefs]] أو [[mkfs]]: أخطر غلطة في الدرس كله. و [[of=/dev/sdX1]] للـ ISO فالفلاشة متبوّتش. ونسيان [[conv=fsync]] أو [[sync]] وتشيل الفلاشة والكتابة لسه في الرام. و mkfs على [[sdX]] بدل [[sdX1]]. وإنك تنسخ [[sdb]] من شرح وانت عندك sdb هو ديسك الداتا.`
          },
          teach: R`## الترتيب: اعرف الفلاشة، فكها، امسحها، قسّمها، فرمتها. أو اكتب عليها ISO

كل أمر هنا بيكتب على الجهاز مباشرة. عشان كده **ماجربناش ولا أمر على ديسك حقيقي**: الأوامر اتشغّلت على أوبونتو 24.04 جوه Docker على **ملفات** بتمثّل فلاشة ([[usb.img]] 2 جيجا اتعمل بـ [[truncate]])، لأن parted و fdisk و mkfs و dd بيشتغلوا على ملف زي ما بيشتغلوا على جهاز. وسطر [[wipefs -a]] ناتجه من الحل (اتجرب على loop device). وفي كل الأوامر: **[[sdX]] لازم يتبدل باسم فلاشتك**.

---

## ١. [[lsblk -o NAME,SIZE,TYPE,TRAN,RM,MODEL,MOUNTPOINTS]]

[[lsblk]] = list block devices (الديسكات وأجزاءها). و [[-o]] (output) الأعمدة:

| العمود | معناه | الفلاشة |
|---|---|---|
| [[NAME]] | الاسم في [[/dev]] | غالبًا [[sdb]] أو [[sdc]] |
| [[SIZE]] | الحجم | قريب من المكتوب عليها (32 جيجا = حوالي 29.3G) |
| [[TYPE]] | [[disk]] الجهاز كله، و [[part]] partition | |
| [[TRAN]] | transport: متوصل بإيه | [[usb]] |
| [[RM]] | removable | [[1]] |
| [[MODEL]] | الموديل | SanDisk مثلًا |
| [[MOUNTPOINTS]] | متركّب فين | |

جوه الـ container (ديسكات الـ VM):

~~~text الناتج
NAME    SIZE TYPE TRAN RM MODEL            MOUNTPOINTS
sda   388.6M disk       0 Virtual Disk
sdc       4G disk       0 Virtual Disk     [SWAP]
sdd       1T disk       0 Virtual Disk     /etc/hosts
~~~

مفيش ولا واحد [[usb]] ولا [[RM 1]]. لو ده كان جهازك، يبقى مفيش فلاشة متوصلة، ومتكملش.

---

## ٢. [[sudo umount /dev/sdX1]]

[[umount]] (من غير n) بيفك تركيب الـ partition عشان محدش يكون بيكتب فيها وانت بتمسح. [[sdX]] الجهاز كله، و [[sdX1]] أول partition عليه.

---

## ٣. [[sudo wipefs -a /dev/sdX]]

[[wipefs]] من غير [[-a]] بيعرض بس العلامات اللي لقاها (آمن). جربناه على [[usb.img]] بعد ما عملنا عليه جدول GPT:

~~~text wipefs usb.img
DEVICE  OFFSET     TYPE UUID LABEL
usb.img 0x200      gpt
usb.img 0x7ffffe00 gpt
usb.img 0x1fe      PMBR
~~~

تلات علامات: جدول GPT في الأول ([[0x200]] = بايت 512)، ونسخته الاحتياطية في **آخر** الديسك ([[0x7ffffe00]] = قبل 2 جيجا بـ 512 بايت)، و [[PMBR]] (protective MBR) عشان البرامج القديمة متفتكرش الديسك فاضي.

و [[-a]] (all) بيمسحهم كلهم. على loop device (من الحل):

~~~text الناتج
/dev/loop3: 8 bytes were erased at offset 0x00000200 (gpt): 45 46 49 20 50 41 52 54
/dev/loop3: 8 bytes were erased at offset 0x7ffffe00 (gpt): 45 46 49 20 50 41 52 54
/dev/loop3: 2 bytes were erased at offset 0x000001fe (PMBR): 55 aa
~~~

[[45 46 49 20 50 41 52 54]] حروف [[EFI PART]] بالـ hex: ده «توقيع» جدول GPT. (على ملف عادي wipefs رفض وقال [[Use the --force option to force erase]]، لأنه مش جهاز.)

---

## ٤. [[sudo parted -s /dev/sdX mklabel gpt mkpart usb 1MiB 100%]]

| الحتة | معناها |
|---|---|
| [[parted]] | برنامج تقسيم زي fdisk بس بياخد أوامره في نفس السطر |
| [[-s]] | script: متسألش أسئلة |
| [[mklabel gpt]] | اعمل جدول partitions جديد نوعه GPT |
| [[mkpart usb]] | اعمل partition اسمه usb |
| [[1MiB 100%]] | من أول ميجا لآخر الديسك |

ليه نسيب أول ميجا؟ فيها الجدول نفسه، وبتخلي الـ partition يبدأ على حدود مظبوطة. وبعدها:

~~~text parted -s usb.img unit MiB print
Partition Table: gpt

Number  Start    End      Size     File system  Name  Flags
 1      1.00MiB  2047MiB  2046MiB               usb
~~~

و [[File system]] فاضي: لسه مفيش فرمتة.

### نفس الكلام بـ [[fdisk]] بالحروف

[[sudo fdisk /dev/sdX]] بيسألك [[Command (m for help):]] وانت ترد بحرف. جربناها على الملف بـ [[g]] و [[n]] و Enter ٣ مرات و [[t]] و [[11]] و [[p]] و [[w]]:

~~~text الناتج (مختصر)
Command (m for help): Created a new GPT disklabel (GUID: 0C5F34BE-...).
Created a new partition 1 of type 'Linux filesystem' and of size 2 GiB.
Changed type of partition 'Linux filesystem' to 'Microsoft basic data'.
Device     Start     End Sectors Size Type
usb.img1    2048 4192255 4190208   2G Microsoft basic data
The partition table has been altered.
~~~

| الحرف | بيعمل |
|---|---|
| [[g]] | جدول GPT جديد |
| [[n]] | partition جديد (Enter = الافتراضي = الديسك كله) |
| [[t]] | النوع ([[11]] في اللستة دي = Microsoft basic data، و [[L]] يعرض اللستة) |
| [[p]] | اطبع الجدول |
| [[w]] | اكتب واخرج. قبلها مفيش حاجة اتكتبت، و [[q]] يخرج من غير حفظ |

[[Start 2048]]: القطاع 2048 × 512 بايت = 1 ميجا، نفس الـ [[1MiB]] بتاع parted.

---

## ٥. [[sudo mkfs.exfat -L MYUSB /dev/sdX1]]

[[mkfs]] = make filesystem، و [[.exfat]] النوع، و [[-L]] (label) الاسم اللي هيظهر. على partition ([[sdX1]]) مش الجهاز كله. جربناه على ملف 100 ميجا:

~~~text الناتج (مختصر)
exfatprogs version : 1.2.2
Creating exFAT filesystem(part.img, cluster size=4096)
...
exFAT format complete!
~~~

---

## ٦. [[sudo blkid /dev/sdX1]]

[[blkid]] = block id: بيقرا النوع والاسم:

~~~text الناتج
part.img: LABEL="MYUSB" UUID="6FCE-F4DA" BLOCK_SIZE="512" TYPE="exfat"
~~~

[[UUID]] رقم بيتعمل عشوائي مع كل فرمتة. وجربنا الأنواع التانية على نفس الملف:

| الأمر | blkid طلّع |
|---|---|
| [[mkfs.vfat -F 32 -n OLDTV]] | [[TYPE="vfat"]] و [[LABEL="OLDTV"]] |
| [[mkfs.ext4 -L BACKUP]] | [[TYPE="ext4"]] و [[LABEL="BACKUP"]] |

(في vfat الاسم بـ [[-n]] مش [[-L]].)

---

## ٧. [[sha256sum ubuntu.iso]]

بيحسب «بصمة» الملف. لو حرف واحد في الملف اتغير البصمة كلها بتتغير، فقارنها بالرقم اللي على موقع التحميل:

~~~text الناتج (ISO تجربة صغير)
be7748e12ad4402ac274b61585931540800a060ec64f712f66e6d61a76e41d0c  ubuntu.iso
~~~

---

## ٨. [[sudo dd if=ubuntu.iso of=/dev/sdX bs=4M status=progress conv=fsync]]

| الحتة | معناها |
|---|---|
| [[if=]] | input file: اقرا من الـ ISO |
| [[of=]] | output file: اكتب على الفلاشة **كلها** ([[sdX]] مش [[sdX1]]) |
| [[bs=4M]] | block size: 4 ميجا في المرة |
| [[status=progress]] | اطبع التقدم |
| [[conv=fsync]] | متخلصش غير لما البيانات تتكتب فعلًا على الجهاز |

جربناه على ملف بدل فلاشة (وزودنا [[notrunc]] عشان dd ميقصّش الملف لحجم الـ ISO):

~~~text الناتج
0+1 records in
0+1 records out
376832 bytes (377 kB, 368 KiB) copied, 0.0111113 s, 33.9 MB/s
~~~

[[0+1 records]]: صفر بلوك كامل (4 ميجا) وبلوك واحد ناقص، لأن الـ ISO أصغر من 4 ميجا. و [[blkid]] على الملف بعدها:

~~~text الناتج
fake-usb.img: BLOCK_SIZE="2048" UUID="2026-10-06-08-44-10-00" LABEL="UBUNTU_TEST" TYPE="iso9660"
~~~

بقى ISO بالظبط، و [[cmp]] أكّد إن البايتات زي الأصل. dd مش بيفهم ملفات ولا partitions: بيقرا بايتات من [[if]] ويكتبها في [[of]] بالترتيب.

## ٩. [[sync]]

بيكتب أي حاجة لسه في كاش الرام على الديسكات. ميطبعش حاجة. بعدها تشيل الفلاشة.

---

> على الماك: [[diskutil list]] و [[diskutil eraseDisk ExFAT MYUSB GPT /dev/disk4]]، و dd على [[/dev/rdisk4]] بـ [[bs=4m]] (من الـ docs). وعلى ويندوز: Disk Management أو [[diskpart]]، وللـ ISO برنامج زي Rufus.

## الخلاصة

[[lsblk]] قبل أي حاجة، و [[sdX]] في الأوامر بيتبدل بالاسم اللي اتأكدت منه. partition وفرمتة على [[sdX1]]، و ISO بـ dd على [[sdX]] كله.`,
          lines: [
            R`كل الديسكات: الحجم والنوع، و usb و RM=1 للفلاشة، والموديل، ومتركّبة فين.`,
            R`فك تركيب الفلاشة لو متركّبة.`,
            R`امسح علامات الـ filesystem والجدول القديم من الفلاشة كلها.`,
            R`جدول GPT جديد و partition واحد على كل المساحة، من غير أسئلة.`,
            R`exFAT على الـ partition الأول باسم MYUSB.`,
            R`اتأكد: النوع exfat والاسم MYUSB.`,
            R`اتأكد إن الـ ISO سليم (قارن بالرقم اللي على موقع التحميل).`,
            R`اكتب الـ ISO على الفلاشة كلها، ٤ ميجا في المرة، بالتقدم، ومتخلصش غير لما يتكتب فعلًا.`,
            R`اتأكد إن مفيش حاجة لسه في الكاش قبل ما تشيلها.`
          ],
          sol: R`ناتج حقيقي على ملف 2 جيجا متحوّل لـ [[/dev/loop3]] بـ losetup جوه container أوبونتو 24.04 بـ [[--privileged]] (مش فلاشة حقيقية). [[wipefs -a]] طبع:
[[/dev/loop3: 8 bytes were erased at offset 0x00000200 (gpt): 45 46 49 20 50 41 52 54]]
[[/dev/loop3: 8 bytes were erased at offset 0x7ffffe00 (gpt): 45 46 49 20 50 41 52 54]]
[[/dev/loop3: 2 bytes were erased at offset 0x000001fe (PMBR): 55 aa]]
(الأرقام [[45 46 49 20 50 41 52 54]] هي «EFI PART»، والسطر التاني نسخة GPT اللي في آخر الديسك).

fdisk بالحروف g و n و t و p و w طبع [[Created a new GPT disklabel]] و [[Created a new partition 1 of type 'Linux filesystem' and of size 2 GiB.]] و [[Changed type of partition 'Linux filesystem' to 'Microsoft basic data'.]] و [[The partition table has been altered.]]. و [[parted -s ... print]]: [[1 1049kB 2146MB 2145MB data]].

[[mkfs.exfat -L MYUSB]] خلص بـ [[exFAT format complete!]]، و [[blkid]]: [[/dev/loop3p1: LABEL="MYUSB" UUID="EEFF-B927" BLOCK_SIZE="512" TYPE="exfat" PARTLABEL="data"]]. والـ dd لـ ISO تجربة 300 ميجا: [[314949632 bytes (315 MB, 300 MiB) copied, 1.1086 s, 284 MB/s]] (فلاشة USB حقيقية أبطأ بكتير، 10 لـ 40 ميجا في الثانية غالبًا)، و [[blkid /dev/loop3]] بقى [[TYPE="iso9660" LABEL="UBUNTU_TEST"]]، و [[cmp]] أكّد إن البايتات زي الـ ISO بالظبط.

ملاحظات: [[lsblk -f]] في الـ container مطلّعش النوع لأن مفيش udev، و [[blkid]] قراه صح. و [[mount]] لـ exFAT قال [[unknown filesystem type 'exfat']] لأن kernel الـ WSL مفيهوش exFAT؛ على أوبونتو عادي بيتركّب لوحده.`
        }
      ]
    }
]);
