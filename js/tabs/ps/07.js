// تكملة تاب ps: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/ps/01.js (شرح حقول الدرس في أوله)
MORE("ps", [
    {
      t: "الشبكات بعمق",
      l: 2,
      n: "",
      projects: [
        { lvl: 'صغير', t: R`بطاقة شبكتك في سكربت`, what: R`سكربت [[netinfo.ps1]] بيطبع ٥ سطور بأسامي ثابتة: الكارت، والـ IP المحلي، والـ gateway، والـ DNS ([[DNSServer]] جوه [[Get-NetIPConfiguration]])، والـ IP العام. من درس «عناوينك وإعدادات الشبكة». ولو مفيش نت، سطر العام يكتب «مفيش نت» بدل الـ error ([[-ErrorAction SilentlyContinue]] وبعدين افحص النتيجة).`, done: R`التلات سطور الأولانيين نفس اللي [[ipconfig]] بيقوله، ولو قفلت الواي فاي وشغّلته السكربت بيكمّل للآخر وسطر العام بيقول «مفيش نت» من غير ولا سطر أحمر.` },
        { lvl: 'صغير', t: R`مين ماسك البورت؟`, what: R`سكربت [[port.ps1 3000]] بياخد رقم بورت ([[$args[0] ]]) ويطبع اسم البرنامج والـ PID وسامع على أنهي عنوان، ويقولك «مكشوف للشبكة» لو العنوان [[0.0.0.0]] أو [[::]]. من درس «مين بيسمع على أنهي بورت».`, done: R`مع listener على 127.0.0.1 بيطبع اسمه ومش بيقول مكشوف، ولو البورت فاضي بيطبع رسالة واضحة من غير error، و [[$LASTEXITCODE]] بيبقى 0 لو لقى حد و 1 لو ملقاش.` },
        { lvl: 'متوسط', t: R`تقرير دومين`, what: R`سكربت [[domain-report.ps1 example.com]] بيطلّع A و AAAA و MX و سطر SPF من الـ DNS بتاعك ومن [[-Server 1.1.1.1]]، ويعلّم أي سجل الردين مختلفين فيه، وفي الآخر يجرب بورت 443 بـ [[-InformationLevel Quiet]]. من دروس DNS و «الطريق لحد السيرفر».`, done: R`على example.com بيطلع جدول فيه كل سجل والقيمة من كل سيرفر، و MX بيبان على إنه «مبيستقبلش إيميل»، والـ 443 بـ True. وعلى [[nosuch-zzq.example.com]] بيقول إن مفيش A (مش بيعدّيه عشان مفيش error).` },
        { lvl: 'متوسط', t: R`لقطة البورتات وإيه اللي اتغيّر`, what: R`سكربت بيحفظ كل البورتات اللي سامعة (البورت، والعنوان، واسم البرنامج، ومكشوف ولا لأ) في [[ports.json]] بـ [[ConvertTo-Json]]. ولو فيه لقطة قديمة، يقراها بـ [[ConvertFrom-Json]] ويطبع «جديد» و «اتقفل» بـ [[Where-Object]] و [[-notin]] قبل ما يحفظ الجديدة. من درس «مين بيسمع على أنهي بورت» ودروس الـ Pipeline.`, done: R`تشغّله، وتفتح الـ TcpListener على 8765، وتشغّله تاني: بيطبع «جديد: 8765» بس. تقفله وتشغّله تالت مرة: بيطبع «اتقفل: 8765». ولو مفيش تغيير مبيطبعش غير «مفيش جديد».` },
        { lvl: 'كبير', t: R`دكتور النت`, what: R`سكربت [[net-doctor.ps1]] بيجاوب على «النت واقف ليه؟» خطوة خطوة، ويقف عند أول خطوة فشلت ومعاها نصيحة: (١) فيه كارت Up وعليه IP مش 169.254، (٢) فيه default route و [[Test-Connection]] للـ gateway بيرد، (٣) [[Resolve-DnsName example.com]] بيرجّع IP من الـ DNS بتاعك، ولو فشل يجرب [[-Server 1.1.1.1]] عشان يعرف المشكلة في الـ DNS ولا في النت، (٤) ملف hosts مفيهوش سطر لـ example.com، (٥) [[Test-NetConnection example.com -Port 443]]. كل خطوة بتتكتب في [[net-doctor.log]] بالوقت ونتيجتها. من كل دروس الوحدة.`, done: R`والنت شغال كل الخطوات PASS والسكربت بيخرج بـ 0. لو قفلت الواي فاي بيقف عند خطوة ١ أو ٢ ويخرج برقم الخطوة دي ([[$LASTEXITCODE]])، واللوج فيه سطر بالوقت لكل خطوة اتجرّبت. وكله قراية بس، فتشغّله ١٠ مرات ورا بعض من غير ما يغيّر حاجة على الجهاز.` },
        { lvl: 'فكرة', t: R`مراقب الاتصال بتاعك`, what: R`انت اللي بتقرر: أداة بتراقب حاجة في شبكتك بتهمك (النت بيقطع إمتى؟ السيرفر بتاعك بيرد؟ حد فتح بورت جديد؟ الـ DNS بيتغير؟) بأوامر الوحدة دي، وتسجّل كل تغيير بالوقت في ملف تقدر تقراه بعدين.`, done: R`الأداة اشتغلت ساعة على الأقل وفي اللوج سطر لكل تغيير حصل بالوقت، وتقدر تجاوب منه على سؤال حقيقي (زي «النت قطع كام مرة النهارده وكل مرة قد إيه»).`, ext: R`زوّد ملخص يومي بيتحسب من اللوج، وشغّلها كمهمة مجدولة (درس Register-ScheduledTask)، وخلّيها تبعتلك إشعار لما حاجة تتغيّر.` },
      ],
      items: [
        {
          cmd: "Get-NetIPAddress",
          title: "عناوينك وإعدادات الشبكة",
          desc: R`عشان تعرف عنوانك على الشبكة: [[Get-NetIPConfiguration]] بيعرض لكل كارت شبكة (Wi-Fi أو Ethernet) الـ IP بتاعه، والـ gateway (الراوتر)، والـ DNS، في مكان واحد، وده المقابل لـ [[ipconfig]] في CMD و [[ip a]] في لينكس.

[[Get-NetIPAddress -AddressFamily IPv4]] العناوين بس من نوع IPv4 (من غير IPv6 الطويلة)، و [[Select-Object InterfaceAlias, IPAddress]] بيعرض اسم الكارت والعنوان بس. و [[Get-NetRoute -DestinationPrefix 0.0.0.0/0]] بيجيب الـ default route، يعني «أي حاجة رايحة للنت بتعدّي منين»، وعمود NextHop فيه IP الراوتر.

السطر الأخير بيسأل موقع خارجي «انا جايلك من أنهي IP؟» فيرجعلك الـ IP العام، و [[.Trim()]] احتياط بيشيل أي مسافة أو سطر جديد في الأول أو الآخر (ifconfig.me دلوقتي مش بيحط سطر جديد، بس مواقع تانية من النوع ده بتحط). المحلي (زي 192.168.1.15) والعام مختلفين لأن الراوتر بيخبّي كل أجهزة البيت ورا IP واحد. والأوامر دي ويندوز بس، وهتلاقي كروت افتراضية كتير زي [[vEthernet (WSL (Hyper-V firewall))]] و [[Loopback Pseudo-Interface 1]] وكروت VPN، دي مش اتصالك الحقيقي.`,
          example: R`Get-NetIPConfiguration
Get-NetIPAddress -AddressFamily IPv4 | Select-Object InterfaceAlias, IPAddress
Get-NetRoute -DestinationPrefix 0.0.0.0/0
(Invoke-RestMethod https://ifconfig.me/ip).Trim()`,
          try: "اعرف الـ IP المحلي والعام والـ gateway.",
          practice: [
            { lvl: 'سريع', t: R`اطبع عناوين IPv4 بتاعتك من غير [[127.0.0.1]] ومن غير عناوين [[169.254.*]] (دي معناها إن الكارت مخدش عنوان من الـ DHCP): [[Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.IPAddress -notlike '127.*' -and $_.IPAddress -notlike '169.254.*' } | Select-Object InterfaceAlias, IPAddress, PrefixLength]].`, done: R`الجدول فيه سطر للكارت اللي انت متوصل بيه (غالبًا Wi-Fi أو Ethernet) بعنوان زي 192.168.x.x أو 10.x.x.x، ومفيهوش ولا سطر بيبدأ بـ 127 أو 169.254.` },
            { lvl: 'تطبيق', t: R`سكربت [[myip.ps1]] بيطبع ٣ سطور بس: [[Local: ...]] و [[Gateway: ...]] و [[Public: ...]]. المحلي من السطر التاني في الدرس، والـ gateway من [[NextHop]] بتاع [[Get-NetRoute -DestinationPrefix 0.0.0.0/0]]، والعام من ifconfig.me زي آخر سطر.`, done: R`التلات سطور طالعين بالأسامي دي بالظبط، والـ Gateway نفس الرقم اللي [[Get-NetIPConfiguration]] كاتبه تحت [[IPv4DefaultGateway]]، والـ Local والـ Public مختلفين (لو انت ورا راوتر عادي).` },
            { lvl: 'تحدي', t: R`اعرف النت بيخرج فعلًا من أنهي كارت لعنوان معين: [[$ip = (Resolve-DnsName example.com -Type A)[0].IPAddress]] وبعدين [[Find-NetRoute -RemoteIPAddress $ip | Select-Object -Last 1 InterfaceAlias, DestinationPrefix, NextHop]]، وقارنه بجدول [[Get-NetRoute -AddressFamily IPv4 | Where-Object DestinationPrefix -in '0.0.0.0/0', '0.0.0.0/1', '128.0.0.0/1']].`, done: R`من غير VPN الاتنين بيقولوا نفس الكارت و [[DestinationPrefix]] بيبقى [[0.0.0.0/0]]. ولو فيه VPN شغال هتلاقي غالبًا سطرين [[0.0.0.0/1]] و [[128.0.0.0/1]] على كارت الـ VPN، و [[Find-NetRoute]] بيختار واحد منهم: الـ route الأدق (prefix أطول) بيكسب على الـ default route، وعشان كده [[Test-NetConnection]] بيقولك [[InterfaceAlias]] بتاع الـ VPN مش الواي فاي.` },
          ],
          deep: {
            why: R`عايز تفتح موقعك من الموبايل على نفس الواي فاي (محتاج IP جهازك)، أو تتأكد إن الجهاز واخد IP من الراوتر، أو تعرف الـ IP العام عشان تحطه في firewall سيرفر. زي [[ip a]] و [[ip route]] في لينكس.`,
            how: R`[[Get-NetIPAddress]] بيعرض كل العناوين على كل الكروت، IPv4 و IPv6، ومعاهم كروت وهمية كتير (Loopback و vEthernet بتاع WSL و Docker). [[-AddressFamily IPv4]] بيسيب IPv4 بس، و [[-InterfaceAlias "Wi-Fi"]] كارت واحد. وكل عنوان معاه [[PrefixLength]]: 24 يعني الماسك 255.255.255.0.

[[Get-NetIPConfiguration]] أسهل للقراية لأنه بيجمع العنوان والـ gateway والـ DNS لكل كارت في مكان واحد. و [[Get-NetAdapter]] بيعرض الكروت نفسها: حالتها وسرعتها والـ MAC (درس Get-NetAdapter في «تحكّم في الشبكة من PowerShell»).

وعشان تلاقي عنوانك على شبكة البيت بس: [[Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.IPAddress -like "192.168.*" }]].`,
            when: "تعرف عنوانك على الشبكة. تتأكد إن كارت معين شغال.",
            mistakes: "إنك تنسى إن ويندوز بييجي بـ Loopback وTunneling adapters كتير، فيه زحمة في النتايج. فلتر بـ -InterfaceAlias."
          },
          teach: R`## الأول: ٤ أسئلة عن عنوانك

المثال ٤ سطور، كل سطر بيجاوب سؤال: إيه إعدادات الشبكة عندي؟ العناوين بس؟ الراوتر فين؟ وأنا باين للنت بأنهي IP؟ الأوامر دي ويندوز بس، واتشغّلت على لابتوب ويندوز 11 متوصل واي فاي، في PowerShell 7.6.

---

## ١. [[Get-NetIPConfiguration]]: الصورة كاملة

من غير أي حاجة بيعرض كل الكروت، فهنا هعرض الواي فاي بس بـ [[-InterfaceAlias Wi-Fi]] (اسم الكارت):

~~~powershell
Get-NetIPConfiguration -InterfaceAlias Wi-Fi
~~~

~~~text الناتج
InterfaceAlias       : Wi-Fi
InterfaceIndex       : 13
InterfaceDescription : Intel(R) Wi-Fi 6 AX200 160MHz
NetProfile.Name      : HomeWiFi
IPv4Address          : 192.168.1.65
IPv6DefaultGateway   :
IPv4DefaultGateway   : 192.168.1.1
DNSServer            : fe80::1
                       fe80::1
                       8.8.8.8
                       8.8.4.4
                       192.168.1.1
~~~

(غيّرت اسم الشبكة لـ HomeWiFi.)

| الخانة | معناها |
|---|---|
| [[InterfaceAlias]] | اسم الكارت اللي بتكتبه في الأوامر |
| [[InterfaceIndex]] | رقم الكارت، نفس الكارت بس برقم |
| [[InterfaceDescription]] | الكارت الحقيقي (الهاردوير) |
| [[NetProfile.Name]] | اسم الشبكة المتوصل بيها |
| [[IPv4Address]] | **عنوانك على الشبكة المحلية** |
| [[IPv4DefaultGateway]] | **الراوتر**: الباب اللي أي حاجة رايحة للنت بتعدّي منه |
| [[DNSServer]] | السيرفرات اللي بتحوّل الأسامي لعناوين (درس Resolve-DnsName) |

[[fe80::1]] ده عنوان الراوتر على IPv6 (أي عنوان بيبدأ بـ fe80 معناه «جوه الشبكة دي بس»).

---

## ٢. [[Get-NetIPAddress -AddressFamily IPv4 | Select-Object InterfaceAlias, IPAddress]]

### [[Get-NetIPAddress -AddressFamily IPv4]]

[[Get-NetIPAddress]] بيجيب كل العناوين على كل الكروت. و [[-AddressFamily IPv4]] يعني العناوين القصيرة بتاعة IPv4 بس (اللي بالشكل 192.168.1.65)، من غير IPv6 الطويلة.

### [[| Select-Object InterfaceAlias, IPAddress]]

الـ [[|]] (pipe) بيدّي الناتج للأمر اللي بعده، و [[Select-Object]] بيختار عمودين بس من خانات كتير.

~~~text الناتج
InterfaceAlias                     IPAddress
--------------                     ---------
Ethernet 2                         169.254.67.179
Ethernet 2                         10.4.2.1
vEthernet (WSL (Hyper-V firewall)) 172.29.160.1
Local Area Connection* 2           169.254.168.76
Bluetooth Network Connection       169.254.103.71
Local Area Connection* 1           169.254.188.78
Ethernet                           169.254.116.191
Wi-Fi                              192.168.1.65
HotspotShield Network Adapter      169.254.174.20
Loopback Pseudo-Interface 1        127.0.0.1
~~~

١٠ سطور، وواحد بس فيهم هو اتصالك الحقيقي. نقراهم:

| العنوان بيبدأ بـ | معناه |
|---|---|
| [[192.168.]] أو [[10.]] أو [[172.16]] لحد [[172.31]] | عنوان خاص (private): جوه شبكة، مش على النت مباشرة |
| [[169.254.]] | الكارت **مخدش** عنوان من حد (مفيش DHCP)، فاخترع لنفسه واحد. كروت مش متوصلة |
| [[127.0.0.1]] | جهازك نفسه (localhost) |

يعني: [[Wi-Fi 192.168.1.65]] هو العنوان اللي موبايلك يوصل بيه لجهازك. و [[vEthernet (WSL ...)]] شبكة وهمية بين ويندوز و WSL، و [[Ethernet 2]] و HotspotShield كروت VPN.

---

## ٣. [[Get-NetRoute -DestinationPrefix 0.0.0.0/0]]

### يعني إيه route؟

جدول الـ routing بيقول لويندوز «الطلب الرايح لعنوان كذا يطلع من أنهي كارت ولمين». و [[0.0.0.0/0]] معناها «أي عنوان» (الـ [[/0]] يعني ولا رقم من العنوان لازم يطابق)، فده الـ **default route**: الطريق لأي حاجة مش في الشبكة المحلية، يعني النت.

~~~text الناتج
ifIndex DestinationPrefix NextHop      RouteMetric ifMetric
------- ----------------- -------      ----------- --------
13      0.0.0.0/0         192.168.1.1            0 45
~~~

(قصّرت المسافات وشلت عمود PolicyStore عشان يتقري.)

| العمود | معناه |
|---|---|
| [[ifIndex]] | رقم الكارت: 13 = الواي فاي (نفس InterfaceIndex فوق) |
| [[NextHop]] | الطلب بيروح لمين: **192.168.1.1 الراوتر** |
| [[RouteMetric]] و [[ifMetric]] | التكلفة. لو فيه أكتر من طريق، الأقل مجموعه بيكسب |

لو عندك كابل وواي فاي متوصلين، هتلاقي سطرين، والـ metric هو اللي بيقرر مين يُستخدم.

---

## ٤. [[(Invoke-RestMethod https://ifconfig.me/ip).Trim()]]

من جوه لبرة:

1. [[Invoke-RestMethod https://ifconfig.me/ip]] بيبعت طلب لموقع بيرد عليك بالـ IP اللي الطلب جاله منه (درس Invoke-RestMethod).
2. الأقواس [[( )]] يعني «نفّذ ده الأول»، والنتيجة نص.
3. [[.Trim()]] method بتشيل أي مسافات أو سطر جديد في أول النص وآخره.

~~~text الناتج
41.47.110.x
~~~

(خبّيت آخر رقم.) جربت أعد حروف الرد: 13 حرف قبل [[.Trim()]] و 13 بعده، يعني ifconfig.me دلوقتي مش بيحط سطر جديد. فالـ [[.Trim()]] هنا **احتياط**: مواقع تانية من النوع ده بترجّع الـ IP وبعده سطر جديد، وده بيبوّظ المقارنة لو حطيته في متغير.

### ليه 192.168.1.65 غير 41.47.110.x؟

الأول عنوانك **جوه البيت**، والتاني عنوان **الراوتر على النت**. الراوتر بيعمل حاجة اسمها NAT: كل أجهزة البيت بتطلع للنت بعنوانه هو، وهو بيفتكر مين طلب إيه ويرجّع الرد للجهاز الصح.

---

## على لينكس والماك

| السؤال | ويندوز | لينكس | الماك |
|---|---|---|---|
| عناويني | [[Get-NetIPAddress]] | [[ip a]] | [[ifconfig]] |
| الراوتر | [[Get-NetRoute -DestinationPrefix 0.0.0.0/0]] | [[ip route]] | [[netstat -rn]] |
| IP العام | [[irm ifconfig.me/ip]] | [[curl ifconfig.me]] | [[curl ifconfig.me]] |

(أوامر الماك من الـ docs، مفيش ماك هنا.)

## الخلاصة

~~~text
192.168.x.x   عنوانك جوه البيت (اللي الموبايل يوصل بيه)
169.254.x.x   كارت مخدش عنوان
NextHop       الراوتر
ifconfig.me   عنوانك على النت، واحد لكل البيت
~~~`,
          lines: [
            "ملخص الشبكة: الـ IP والـ gateway والـ DNS لكل كارت (زي ip a).",
            "عناوين IPv4 بس مع اسم الكارت.",
            "الراوت الافتراضي، يعني الـ gateway (زي ip route).",
            "عنوانك العام على النت. [[.Trim()]] احتياط يشيل أي مسافة أو سطر جديد حوالين الرد."
          ],
          sol: R`[[Get-NetIPConfiguration]] هيطلع لكل كارت [[InterfaceAlias]] (زي Wi-Fi أو Ethernet)، و [[IPv4Address]] زي [[192.168.1.15]] (المحلي)، و [[IPv4DefaultGateway]] زي [[192.168.1.1]] (الراوتر)، و [[DNSServer]]. و [[(Invoke-RestMethod https://ifconfig.me/ip).Trim()]] بيطبع IP عام مختلف تمامًا.

الاتنين مختلفين لأن الراوتر بيعمل NAT: كل أجهزة البيت ليها IP محلي، وكلهم بيطلعوا للنت بنفس الـ IP العام. هتلاقي كمان كروت زي [[vEthernet (WSL)]] بـ IP زي 172.x، دي شبكات افتراضية مش هي اللي انت عايزها. ولو الـ IPv4 بيبدأ بـ [[169.254]] يبقى الجهاز مخدش IP من الراوتر أصلًا.`
        },
        {
          cmd: "Resolve-DnsName",
          title: "DNS",
          desc: R`DNS هو اللي بيحوّل اسم زي example.com لـ IP. [[Resolve-DnsName]] بيسأل الـ DNS ويوريك الرد، زي [[dig]] في لينكس و [[nslookup]] في CMD. من غير إضافات بيجيب سجلات [[A]] (عناوين IPv4) و [[AAAA]] (IPv6).

[[-Server 1.1.1.1]] بيسأل سيرفر DNS معين (1.1.1.1 بتاع Cloudflare و 8.8.8.8 بتاع Google) بدل اللي جهازك بيستخدمه، فتعرف المشكلة عندك ولا في الدومين نفسه. و [[-Type MX]] بيجيب نوع سجل تاني: MX سيرفرات الإيميل، و TXT للتحقق (SPF وغيره)، و CNAME للاسم البديل.

[[Clear-DnsClientCache]] بيمسح الردود اللي ويندوز حافظها، زي [[ipconfig /flushdns]]، ودي أول حاجة لو غيّرت الـ DNS بتاع دومين ولسه بيفتح القديم. ومش محتاج أدمن (جربته من PowerShell عادي في 7.6 و 5.1 واشتغل)، والأوامر دي ويندوز بس.`,
          example: R`Resolve-DnsName example.com
Resolve-DnsName example.com -Server 1.1.1.1
Resolve-DnsName example.com -Type MX
Clear-DnsClientCache`,
          try: "قارن رد 1.1.1.1 و 8.8.8.8 لدومين عندك.",
          practice: [
            { lvl: 'سريع', t: R`طلّع العناوين بس من غير جدول: [[(Resolve-DnsName example.com -Type A).IPAddress]]، وبعدين نفس السطر بـ [[-Type AAAA]].`, done: R`كل عنوان في سطر لوحده من غير عناوين أعمدة: أرقام بنقط في A، وعناوين فيها [[:]] في AAAA.` },
            { lvl: 'تطبيق', t: R`اعرف دومين بيستقبل إيميله فين وبيحمي اسمه إزاي: [[Resolve-DnsName example.com -Type MX]] و [[(Resolve-DnsName example.com -Type TXT).Strings]]، ودوّر في الـ TXT على السطر اللي بيبدأ بـ [[v=spf1]].`, done: R`في example.com هتلاقي MX واحد [[NameExchange]] بتاعه نقطة لوحدها و [[Preference]] صفر (معناها «الدومين ده مبيستقبلش إيميل» عن قصد)، وسطر TXT فيه [[v=spf1 -all]] (محدش مسموحله يبعت إيميل باسمه).` },
            { lvl: 'تحدي', t: R`فانكشن [[Test-Dns]] بتاخد اسم وبترجع [[$true]] لو ليه عنوان A فعلًا. جرّبها على [[example.com]] و [[nosuch-zzq.example.com]] و [[nosuch-zzq.invalid]]. خلي بالك إن مش كل اسم مش موجود بيطلّع error.`, done: R`example.com بترجع True والاتنين التانيين False من غير ولا سطر أحمر. ولاحظت إن [[nosuch-zzq.invalid]] بيرمي [[DNS name does not exist]]، أما [[nosuch-zzq.example.com]] فمبيرميش error خالص وبيرجّع سجل [[SOA]] من غير [[IPAddress]] (اتجرّب في 7.6 و 5.1). فالفحص الصح إن [[.IPAddress]] مش فاضي، مش إن الأمر معملش error.` },
          ],
          deep: {
            why: R`غيّرت الـ DNS بتاع دومين ولسه بيفتح السيرفر القديم، أو الإيميل مش واصل، أو عايز تتأكد إن الدومين بيشاور على السيرفر الصح قبل ما تعمل شهادة SSL. Resolve-DnsName بيوريك الرد بالظبط ومن أنهي DNS، زي [[dig]] في لينكس.`,
            how: R`[[Resolve-DnsName example.com]] بيسأل الـ DNS اللي جهازك متظبط عليه وبيرجّع الـ A و AAAA records. [[-Type]] بيحدد النوع: [[MX]] لسيرفرات الإيميل، و [[TXT]] للنصوص (SPF وتأكيد ملكية الدومين)، و [[CNAME]] لو الاسم بيشاور على اسم تاني، و [[NS]] للسيرفرات المسؤولة عن الدومين.

[[-Server 8.8.8.8]] بيسأل سيرفر معين مباشرة، فتقارن رده برد الـ DNS بتاعك. ولو الاسم مش موجود بيطلع error «DNS name does not exist».

[[-DnsOnly]] بيسأل الـ DNS بس من غير ما يبص في ملف hosts أو الأسامي المحلية، مفيد لو بتشك إن hosts هو اللي مغيّر الرد. والأمر ده على ويندوز بس؛ في لينكس والماك [[dig]] بيعمل نفس الشغل.`,
            when: "نفس استخدامات dig في bash. DNS لسه مش منتشر. تتأكد من MX records.",
            mistakes: "nslookup كمان موجود في PowerShell وأسهل بس أقل تفصيل."
          },
          teach: R`## الأول: DNS بيعمل إيه

الأجهزة بتكلّم بعض بأرقام (IP)، والناس بتكتب أسامي (example.com). الـ DNS هو اللي بيحوّل الاسم لرقم. [[Resolve-DnsName]] بيسأل الـ DNS سؤال ويوريك الرد كامل. الأوامر دي ويندوز بس، واتشغّلت في PowerShell 7.6.

---

## ١. [[Resolve-DnsName example.com]]

~~~text الناتج
Name          Type   TTL   Section    IPAddress
----          ----   ---   -------    ---------
example.com   AAAA   300   Answer     2606:4700:10::6814:179a
example.com   AAAA   300   Answer     2606:4700:10::ac42:93f3
example.com   A      300   Answer     104.20.23.154
example.com   A      300   Answer     172.66.147.243
~~~

### نقرا الأعمدة

| العمود | معناه |
|---|---|
| [[Name]] | الاسم اللي سألت عليه |
| [[Type]] | نوع السجل (record): [[A]] عنوان IPv4، و [[AAAA]] عنوان IPv6 |
| [[TTL]] | Time To Live: الرد ده يتحفظ قد إيه بالثواني قبل ما يتسأل تاني. 300 = ٥ دقايق |
| [[Section]] | [[Answer]] يعني ده رد مباشر على سؤالك |
| [[IPAddress]] | العنوان نفسه اللي المتصفح هيكلّمه |

ليه عنوانين IPv4؟ الموقع على أكتر من سيرفر، والمتصفح بياخد أي واحد. وده شائع مع الـ CDN (شبكة سيرفرات بتوزّع الموقع على أماكن كتير).

---

## ٢. [[-Server 1.1.1.1]]: اسأل حد تاني

من غير [[-Server]] السؤال بيروح للـ DNS اللي جهازك متظبط عليه (غالبًا الراوتر). و [[-Server 1.1.1.1]] بيبعته لسيرفر Cloudflare مباشرة:

~~~text الناتج
Name          Type   TTL   Section    IPAddress
----          ----   ---   -------    ---------
example.com   AAAA   120   Answer     2606:4700:10::6814:179a
example.com   AAAA   120   Answer     2606:4700:10::ac42:93f3
example.com   A      244   Answer     172.66.147.243
example.com   A      244   Answer     104.20.23.154
~~~

نفس العناوين، بس الـ **TTL مختلف** (244 بدل 300). ليه؟ لأن 1.1.1.1 كان حافظ الرد من شوية، فبيقولك «فاضل له 244 ثانية عندي». نفس العناوين = الدومين متظبط صح، والمشكلة (لو فيه) مش في الـ DNS.

---

## ٣. [[-Type MX]]: سيرفرات الإيميل

[[-Type]] بيختار نوع السجل. و **MX** = Mail Exchange: مين بيستلم الإيميل للدومين ده. example.com مفيهوش إيميل، فجربت gmail.com:

~~~powershell
Resolve-DnsName gmail.com -Type MX
~~~

~~~text الناتج
Name        Type   TTL    Section    NameExchange                       Preference
----        ----   ---    -------    ------------                       ----------
gmail.com   MX     3095   Answer     alt4.gmail-smtp-in.l.google.com    40
gmail.com   MX     3095   Answer     alt1.gmail-smtp-in.l.google.com    10
gmail.com   MX     3095   Answer     gmail-smtp-in.l.google.com         5
gmail.com   MX     3095   Answer     alt2.gmail-smtp-in.l.google.com    20
gmail.com   MX     3095   Answer     alt3.gmail-smtp-in.l.google.com    30
~~~

الأعمدة اتغيرت حسب النوع: [[NameExchange]] اسم سيرفر الإيميل، و [[Preference]] الأولوية: **الأصغر الأول**، فالإيميل بيروح لـ [[gmail-smtp-in]] (5) ولو مردش يروح لـ alt1 (10) وهكذا.

وعلى example.com نفسه رجع سطر واحد [[NameExchange]] فيه [[.]] بس و Preference 0، ودي طريقة الدومين يقول «أنا مش بستقبل إيميل خالص».

ولو الاسم مش موجود أصلًا:

~~~text الناتج
nosuch-domain-xyz-91827.com : DNS name does not exist.
~~~

---

## ٤. [[Clear-DnsClientCache]]

ويندوز بيحفظ كل رد لحد ما الـ TTL بتاعه يخلص، عشان ميسألش كل مرة. [[Clear-DnsClientCache]] بيمسح المحفوظ ده، فالسؤال الجاي يروح للـ DNS من جديد. جربته في 7.6 و 5.1 من غير أدمن: مطبعش حاجة، وده معناه إنه نجح.

---

## أنواع السجلات اللي هتقابلها

| [[-Type]] | بيجيب أنهي نوع سجل |
|---|---|
| [[A]] / [[AAAA]] | عنوان IPv4 / IPv6 (الافتراضي الاتنين) |
| [[MX]] | سيرفرات الإيميل اللي بتستقبل للدومين |
| [[TXT]] | نصوص للتحقق (SPF، تأكيد ملكية الدومين) |
| [[CNAME]] | الاسم ده اسم تاني لاسم تاني |

## على لينكس والماك

| | ويندوز | لينكس والماك |
|---|---|---|
| اسأل | [[Resolve-DnsName example.com]] | [[dig example.com]] |
| سيرفر معين | [[-Server 1.1.1.1]] | [[dig @1.1.1.1 example.com]] |
| نوع | [[-Type MX]] | [[dig example.com MX]] |

## الخلاصة

~~~text
A / AAAA   الاسم بيشاور على أنهي IP
TTL        الرد يتحفظ قد إيه (بالثواني)
-Server    اسأل DNS تاني عشان تقارن
MX         مين بيستلم الإيميل، والـ Preference الأصغر الأول
~~~`,
          lines: [
            R`[[Resolve-DnsName]] بيسأل الـ DNS: الاسم ده عنوانه إيه؟ وبيرجّع سجل لكل عنوان: [[A]] لـ IPv4 و [[AAAA]] لـ IPv6، ومعاه TTL (الرد ده يتحفظ قد إيه). ممكن يرجع أكتر من IP لنفس الدومين، وده طبيعي مع المواقع الكبيرة.`,
            R`[[-Server 1.1.1.1]] بيسأل Cloudflare مباشرة بدل الـ DNS اللي جهازك متظبط عليه (غالبًا الراوتر). لو الإجابتين مختلفين، يبقى الـ DNS بتاعك عنده نسخة قديمة، أو تغيير DNS عملته لسه موصلش لكل السيرفرات.`,
            R`[[-Type MX]] بيجيب سجلات الإيميل: [[NameExchange]] اسم السيرفر اللي بيستقبل إيميلات الدومين، و [[Preference]] الأولوية (الأصغر بيتجرّب الأول). example.com بيرجّع [[.]] يعني الدومين ده مش بيستقبل إيميل أصلًا؛ جرّب [[gmail.com]] تشوف سيرفرات حقيقية.`,
            R`[[Clear-DnsClientCache]] بيمسح الردود اللي ويندوز حافظها، فالسؤال الجاي يروح للسيرفر من جديد. مفيد بعد ما تغيّر DNS دومين أو ملف hosts وجهازك لسه بيستخدم الرد القديم.`,
          ],
          sol: R`[[Resolve-DnsName yourdomain.com -Server 1.1.1.1]] و [[-Server 8.8.8.8]] المفروض الاتنين يطلعوا جدول [[Name  Type  TTL  Section  IPAddress]] بنفس الـ IPAddress. الـ TTL ممكن يختلف لأن كل واحد عنده الكاش بتاعه وفاضله وقت مختلف.

لو الـ IP مختلف: إما غيرت الـ DNS قريب والتغيير لسه بينتشر (استنى الـ TTL القديم)، أو الدومين ورا CDN بيدي IPs مختلفة حسب المكان. ولو طلعلك [[DNS name does not exist]] يبقى الـ record مش موجود فعلًا. ولو timeout مع السيرفرين العامين بس، شبكتك غالبًا بتقفل DNS الخارجي. والأمر ده ويندوز بس، المقابل على لينكس والماك [[dig @1.1.1.1 yourdomain.com]].`
        },
        {
          cmd: "hosts",
          title: "ملف hosts في ويندوز",
          desc: R`ملف [[hosts]] بيخلّي جهازك يربط اسم دومين بـ IP بنفسه قبل ما يسأل أي DNS، زي [[/etc/hosts]] في لينكس بالظبط. مكانه على ويندوز [[C:\Windows\System32\drivers\etc\hosts]] (من غير امتداد). كل سطر فيه IP وبعده مسافة والاسم، والسطور اللي بتبدأ بـ [[#]] تعليقات.

[[Get-Content]] بيعرضه عادي من غير صلاحيات. لكن التعديل محتاج أدمن، عشان كده السطر التاني [[Start-Process notepad ... -Verb RunAs]]: بيفتح Notepad كأدمن (هيطلع سؤال UAC) والملف جواه، فتقدر تحفظ.

استخدامات: [[127.0.0.1 myapp.local]] دومين محلي للتطوير، أو تجرّب موقعك على سيرفر جديد قبل ما تنقل الـ DNS. وخلي بالك: Notepad ممكن يحفظه [[hosts.txt]] لو مختارتش All Files، وساعتها مش هيشتغل. وبعد التعديل لو المتصفح لسه فاكر القديم: [[Clear-DnsClientCache]].`,
          example: R`Get-Content C:\Windows\System32\drivers\etc\hosts
Start-Process notepad C:\Windows\System32\drivers\etc\hosts -Verb RunAs`,
          try: "ضيف [[127.0.0.1 myapp.local]] وافتح http://myapp.local:3000 وانت مشغّل سيرفر محلي.",
          practice: [
            { lvl: 'سريع', t: R`اعرض السطور الشغالة بس في ملف hosts، من غير التعليقات والسطور الفاضية: [[Get-Content C:\Windows\System32\drivers\etc\hosts | Where-Object { $_.Trim() -and $_.Trim() -notlike '#*' }]].`, done: R`الأمر اشتغل من نافذة عادية من غير أدمن. ولو الملف لسه زي ما ويندوز عمله مش هيطلع ولا سطر (كله تعليقات)، ولو برنامج زي Docker Desktop زوّد حاجة هتشوف سطوره هو بس.` },
            { lvl: 'تطبيق', t: R`انسخ hosts لفولدر تجارب: [[Copy-Item C:\Windows\System32\drivers\etc\hosts .\hosts.test]]، وزوّد عليه [[127.0.0.1 myapp.local]] و [[10.0.0.5 db.local api.local]] بـ [[Add-Content]]، وحوّل السطور الشغالة لجدول IP و Name: شيل التعليق اللي في آخر السطر بـ [[($_ -split '#')[0].Trim()]]، وقسّم الباقي بـ [[-split '\s+']]، واعمل [[[pscustomobject]]] لكل اسم.`, done: R`الجدول فيه عمود IP وعمود Name، والسطر اللي فيه اسمين بيطلع صفين بنفس الـ IP. ولو [[Add-Content]] قالك Access denied أو النسخة مش باينة في [[ls]]، الأصل كان عليه attributes زي ReadOnly أو Hidden والنسخة خدتها: [[(Get-Item .\hosts.test -Force).Attributes = 'Normal']] وجرّب تاني.` },
            { lvl: 'تحدي', t: R`سكربت [[add-host.ps1]] بياخد [[-Name]] و [[-IP]] و [[-Path]]: بيزوّد السطر بس لو الاسم مش موجود، وقبل أي تعديل بياخد نسخة [[.bak]] جنب الملف. جرّبه على [[hosts.test]] الأول، وبعد ما تتأكد شغّله على الملف الحقيقي من Terminal أدمن.`, done: R`لو شغّلته مرتين ورا بعض [[(Select-String -Path .\hosts.test -Pattern 'myapp.local' -SimpleMatch).Count]] بيفضل 1، وملف [[hosts.test.bak]] موجود. وعلى الملف الحقيقي، [[Resolve-DnsName myapp.local]] بيرجّع 127.0.0.1 (ده من الـ docs: [[Resolve-DnsName]] بيقرا hosts إلا لو كتبت [[-NoHostsFile]]).` },
          ],
          deep: {
            why: "تغيير DNS لدومين على جهازك بس، من غير ما تغيّر الـ DNS الحقيقي.",
            how: R`ملف الـ hosts في ويندوز: [[C:\Windows\System32\drivers\etc\hosts]]. نفس الفكرة زي [[/etc/hosts]] في لينكس.

بس تعديله محتاج صلاحيات Admin. في VS Code: افتحه بـ «Open with Code as Administrator». أو PowerShell كمدير ثم:

[[Add-Content C:\Windows\System32\drivers\etc\hosts "203.0.113.10 example.com"]]

ويندوز بيقرا التعديل فورًا، بس لو المتصفح لسه فاكر القديم اعمل [[ipconfig /flushdns]] وافتح المتصفح تاني.`,
            when: "تجرّب موقع على سيرفر جديد قبل نقل الـ DNS. تعمل دومين محلي للتطوير.",
            mistakes: "تحاول تعدّله بدون صلاحيات فيطلع Access Denied. وكتابة غلط في الملف تسبب مشاكل في الشبكة."
          },
          teach: R`## الأول: الملف ده بيتسأل قبل الـ DNS

لما تكتب اسم في المتصفح، ويندوز بيبص الأول في ملف نصي صغير اسمه [[hosts]]، ولو لقى الاسم فيه بياخد العنوان اللي جنبه ومش بيسأل أي DNS. المثال سطرين: اعرض الملف، وافتحه للتعديل.

---

## ١. [[Get-Content C:\Windows\System32\drivers\etc\hosts]]

[[Get-Content]] بيقرا ملف ويطبعه سطر سطر (درس Get-Content). والمسار طويل لأنه فولدر جوه ويندوز نفسه، والملف اسمه [[hosts]] **من غير امتداد** (جربت [[Get-Item]] وطلع [[Extension]] فاضي).

أول جزء من الملف على ويندوز 11 (وده الافتراضي في أي جهاز):

~~~text الناتج
# Copyright (c) 1993-2009 Microsoft Corp.
#
# This is a sample HOSTS file used by Microsoft TCP/IP for Windows.
...
# For example:
#
#      102.54.94.97     rhino.acme.com          # source server
#       38.25.63.10     x.acme.com              # x client host

# localhost name resolution is handled within DNS itself.
#	127.0.0.1       localhost
~~~

كل سطر بيبدأ بـ [[#]] تعليق، يعني ويندوز بيتجاهله. حتى [[127.0.0.1 localhost]] متعلّق عليه، لأن ويندوز بيعرف localhost لوحده.

وعلى الجهاز ده، آخر الملف فيه سطور حقيقية:

~~~text الناتج
# Added by Docker Desktop
192.168.1.4 host.docker.internal
192.168.1.4 gateway.docker.internal
127.0.0.1 kubernetes.docker.internal
~~~

ده الشكل: **IP، وبعده مسافة، وبعده الاسم**. Docker Desktop زوّد السطور دي عشان اسم [[host.docker.internal]] يشاور على جهازك من جوه الـ containers.

---

## ٢. [[Start-Process notepad ... -Verb RunAs]]

### ليه مش تعدّله وخلاص؟

لأن الملف محمي. بصيت على صلاحياته بـ [[Get-Acl]]:

~~~text الناتج
IdentityReference        FileSystemRights
-----------------        ----------------
NT AUTHORITY\SYSTEM      FullControl
BUILTIN\Administrators   FullControl
BUILTIN\Users            ReadAndExecute, Synchronize
~~~

[[Users]] (اليوزرز العاديين) ليهم **قراية بس**، والكتابة لـ [[Administrators]] و [[SYSTEM]]. وجربت أفتحه للكتابة من نافذة عادية فطلع:

~~~text الناتج
Access to the path 'C:\Windows\System32\drivers\etc\hosts' is denied.
~~~

### الأمر

| الحتة | معناها |
|---|---|
| [[Start-Process]] | شغّل برنامج (درس Start-Process) |
| [[notepad]] | البرنامج |
| [[C:\Windows\...\hosts]] | الملف اللي يفتحه |
| [[-Verb RunAs]] | شغّله **كأدمن**، فويندوز هيطلّع سؤال UAC «تسمح للبرنامج ده يعمل تغييرات؟» |

Notepad اللي اتفتح كأدمن يقدر يحفظ. (مفتحتوش وعدّلت على الجهاز ده.)

### بتكتب إيه

~~~text سطر جديد في آخر الملف
127.0.0.1 myapp.local
~~~

ده معناه «myapp.local هو جهازي». وبعد الحفظ ويندوز بيقرا الملف على طول. ولو المتصفح لسه فاكر الرد القديم: [[Clear-DnsClientCache]].

---

## على لينكس والماك

| | ويندوز | لينكس والماك |
|---|---|---|
| المكان | [[C:\Windows\System32\drivers\etc\hosts]] | [[/etc/hosts]] |
| العرض | [[Get-Content ...]] | [[cat /etc/hosts]] |
| التعديل | Notepad بـ [[-Verb RunAs]] | [[sudo nano /etc/hosts]] |

## الخلاصة

~~~text
hosts     بيتقري قبل الـ DNS
السطر     IP  مسافة  الاسم
#         تعليق
القراية   أي حد      الكتابة   أدمن بس
~~~`,
          lines: [
            R`[[Get-Content]] بيطبع ملف [[hosts]]: ملف نصي ويندوز بيبص فيه **قبل** ما يسأل الـ DNS. كل سطر فيه IP وبعده اسم، والسطور اللي بتبدأ بـ [[#]] تعليقات. القراية مش محتاجة أدمن، والملف ملوش امتداد.`,
            R`[[Start-Process notepad]] بيفتح الملف في Notepad، و [[-Verb RunAs]] بيفتحه كمدير (هيطلع UAC)، لأن الكتابة في System32 محتاجة أدمن. من غيرها هتعدّل عادي، بس لما تيجي تحفظ هيرفض. واحذر Notepad يحفظه [[hosts.txt]]، ساعتها ويندوز مش هيقراه.`,
          ],
          sol: R`افتح notepad كأدمن بالأمر التاني، ضيف في الآخر سطر [[127.0.0.1 myapp.local]] واحفظ. بعدها [[ping myapp.local]] المفروض يرد من 127.0.0.1، و http://myapp.local:3000 يفتح نفس اللي بيفتحه localhost:3000.

لو notepad رفض الحفظ، يبقى مفتحتوش كأدمن. ولو حفظته واتسمّى [[hosts.txt]] يبقى notepad زوّد الامتداد، اختار All Files. ولو ping شغال والمتصفح لأ، امسح الكاش بـ [[Clear-DnsClientCache]] أو جرب نافذة Incognito. ولو Vite رد بـ [[Blocked request. This host ("myapp.local") is not allowed.]]، ده حماية في Vite، ضيف الاسم في [[server.allowedHosts]] في vite.config.`
        },
        {
          cmd: "Test-NetConnection -TraceRoute",
          title: "الطريق لحد السيرفر",
          desc: R`[[-TraceRoute]] بيوريك الطريق اللي الباكت بيمشيه من جهازك لحد السيرفر: كل راوتر في السكة (اسمه hop) في سطر. ده نفس [[tracert]] في CMD و [[traceroute]] في لينكس. لو الموقع بطيء أو مش بيفتح، بتعرف الطريق بيقف عند أنهي نقطة: عندك، عند مزوّد النت، ولا قريب من السيرفر.

السطر التاني للسكربتات: [[-Port 443]] يجرّب البورت، و [[-InformationLevel Quiet]] بيخلّي الناتج [[True]] أو [[False]] بس بدل تقرير كامل. فتقدر تحطه جوه [[if]] على طول.

الناتج بيبقى [[TraceRoute : {192.168.1.1, 10.45.18.141, ...}]]: لستة IPs، أولها الراوتر بتاعك. والـ hop اللي مردش بيظهر هنا [[0.0.0.0]] (وفي [[tracert]] نجوم [[*]]). ومش معناه مشكلة: جربت trace لـ 1.1.1.1 والـ hop العاشر طلع 0.0.0.0 واللي بعده وصل عادي، لأن راوترات كتير مبترودش على الـ trace وبتعدّي الترافيك. المشكلة الحقيقية لما كل اللي بعده يفشل، وساعتها بيطلع [[WARNING: Trace route to destination ... did not complete]]. و [[-Hops 12]] بيحدد أقصى عدد hops. والأمر ده ويندوز بس.`,
          example: R`Test-NetConnection google.com -TraceRoute
Test-NetConnection 203.0.113.10 -Port 443 -InformationLevel Quiet`,
          try: "اعمل سكربت بيجرب 3 بورتات على سيرفرك ويطبع المقفول بس.",
          practice: [
            { lvl: 'سريع', t: R`جرّب بورت مفتوح وبورت مقفول: [[Test-NetConnection example.com -Port 443 -InformationLevel Quiet]] وبعدين [[Test-NetConnection 127.0.0.1 -Port 65000 -InformationLevel Quiet]].`, done: R`الأول بيطبع [[True]]. والتاني بيطبع [[False]] ومعاه سطر WARNING أصفر [[TCP connect to (127.0.0.1 : 65000) failed]]، وبياخد حوالي ثانيتين قبل ما يرد.` },
            { lvl: 'تطبيق', t: R`اعمل trace لـ example.com واحفظه في متغير: [[$t = Test-NetConnection example.com -TraceRoute]]، واطبع [[$t.TraceRoute.Count]] وأول hop بـ [[$t.TraceRoute[0] ]]، وعدّ الـ hops اللي مردتش بـ [[($t.TraceRoute -eq '0.0.0.0').Count]].`, done: R`بيطلع عدد الـ hops، وأول hop غالبًا هو الـ gateway بتاعك من أول درس (لو مفيش VPN شغال: مع VPN ممكن الطريق كله يبان hop أو اتنين)، وعندك رقم بعدد الـ hops الساكتة اللي مش معناها مشكلة.` },
            { lvl: 'تحدي', t: R`سكربت [[port-watch.ps1]] بيقرا ملف [[targets.txt]] فيه سطور زي [[example.com:443]] و [[127.0.0.1:65000]]، ولكل سطر بيطبع UP أو DOWN، ولو DOWN بيعمل trace ويطبع آخر hop رد (آخر عنوان في اللستة مش [[0.0.0.0]]). والسطر الغلط (من غير [[:]]) بيطلع بـ [[Write-Warning]] والسكربت يكمّل.`, done: R`[[example.com:443]] بيطلع UP و [[127.0.0.1:65000]] بيطلع DOWN، وسطر زي [[example.com]] لوحده بيطلع WARNING ومبيوقّفش باقي السطور، والسكربت بيخلص من غير ولا سطر أحمر.` },
          ],
          deep: {
            why: "تعرف الطريق اللي البيانات بتمر بيه لوصل سيرفر. زي traceroute في لينكس.",
            how: R`[[Test-NetConnection google.com -TraceRoute]] بيبعت رسايل لحد السيرفر، وكل راوتر في السكة بيرد، فبيطلعلك لستة IPs بالترتيب: أول واحد غالبًا راوتر البيت، وبعده سيرفرات مزود النت، لحد السيرفر نفسه. لو الطريق وقف عند hop معين، المشكلة غالبًا من عنده.

[[-Hops 15]] بيحدد أقصى عدد راوترات يجرّبه، فالأمر يخلص أسرع. وبعض الراوترات في السكة مش بترد على الرسايل دي أصلًا، فوقوف الرد عند hop مش معناه دايمًا إن الطريق مقطوع: بص هل السيرفر نفسه بيرد في الآخر.

[[-InformationLevel Quiet]] بيرجّع True أو False بس، مناسب جوه [[if]]. والأمر القديم [[tracert google.com]] لسه شغال في PowerShell وبيطبع وقت كل hop كمان.`,
            when: "الموقع بطيء من مكان معين وعايز تعرف فين المشكلة.",
            mistakes: "النجوم في نص المسار مش معناها مشكلة بالضرورة، بعض الـ routers مش بتردش."
          },
          teach: R`## الأول: الباكت بيعدّي على كام راوتر؟

الطلب اللي بيطلع من جهازك مش بيروح للسيرفر على طول: بيعدّي على راوتر البيت، وبعدين راوترات مزوّد النت، وبعدين راوترات تانية لحد ما يوصل. كل راوتر في السكة اسمه **hop**. السطر الأول بيوريك الـ hops دي، والتاني سؤال «البورت مفتوح؟» بإجابة True أو False بس. اتشغّلوا على ويندوز 11 في PowerShell 7.6.

---

## ١. [[Test-NetConnection google.com -TraceRoute]]

~~~text الناتج
ComputerName           : google.com
RemoteAddress          : 172.217.17.46
InterfaceAlias         : Wi-Fi
SourceAddress          : 192.168.1.65
PingSucceeded          : True
PingReplyDetails (RTT) : 54 ms
TraceRoute             : 192.168.1.1
                         41.47.224.1
                         10.35.33.141
                         10.35.33.142
                         10.45.28.77
                         72.14.205.115
                         72.14.205.114
                         172.217.17.46
~~~

أول ٦ خانات زي درس Test-NetConnection. الجديد [[TraceRoute]]: لستة عناوين بالترتيب، نقراها:

| الـ hop | العنوان | ده إيه |
|---|---|---|
| ١ | [[192.168.1.1]] | راوتر البيت (الـ gateway) |
| ٢ | [[41.47.224.1]] | أول راوتر عند مزوّد النت (عنوان عام) |
| ٣ لـ ٥ | [[10.x.x.x]] | راوترات جوه شبكة المزوّد (عناوين خاصة) |
| ٦ و ٧ | [[72.14.205.x]] | راوترات جوجل |
| ٨ | [[172.217.17.46]] | السيرفر نفسه، نفس الـ RemoteAddress |

٨ hops لحد جوجل. ولو الطريق اتقطع عند hop معيّن، بتعرف المشكلة عندك (hop ١)، ولا عند المزوّد (٢ لـ ٥)، ولا بعده.

### إزاي بيعرف الطريق؟

كل باكت فيه رقم اسمه **TTL** (Time To Live)، وكل راوتر بينقّصه ١، ولو وصل صفر الراوتر بيرمي الباكت ويرد «مات عندي». الأمر بيبعت باكت بـ TTL = 1 فيرد الراوتر الأول، وبعدين TTL = 2 فيرد التاني، وهكذا لحد ما يوصل. و [[-Hops 15]] بيحدد أقصى عدد يجرّبه (الافتراضي 30).

> راوترات كتير مبترودش على الحكاية دي، فبيظهر مكانها [[0.0.0.0]]. ده مش مشكلة طول ما الـ hops اللي بعده بترد.

---

## ٢. [[Test-NetConnection 203.0.113.10 -Port 443 -InformationLevel Quiet]]

### [[-Port 443]]

443 بورت HTTPS (المواقع بالقفل). [[203.0.113.10]] عنوان للأمثلة، حط عنوان سيرفرك.

### [[-InformationLevel Quiet]]

[[-InformationLevel]] بيحدد الناتج قد إيه. [[Detailed]] تفاصيل أكتر، والافتراضي اللي شفناه، و **[[Quiet]]** بيرجع True أو False بس:

~~~powershell
Test-NetConnection 127.0.0.1 -Port 5432 -InformationLevel Quiet
Test-NetConnection 127.0.0.1 -Port 1 -InformationLevel Quiet -WarningAction SilentlyContinue
~~~

~~~text الناتج
True
False
~~~

ليه ده مهم؟ لأن True و False قيمة **[[bool]]** تحطها في [[if]] على طول. أما الناتج الكامل object فيه ٧ خانات.

---

## ٣. الحل (solCode) سطر سطر

~~~powershell
$server = "203.0.113.10"
foreach ($port in 22, 80, 443) {
    $open = Test-NetConnection $server -Port $port -InformationLevel Quiet -WarningAction SilentlyContinue
    if (-not $open) { "CLOSED $port" }
}
~~~

| السطر | بيعمل إيه |
|---|---|
| [[$server = "..."]] | العنوان في متغير، عشان تغيّره في مكان واحد |
| [[foreach ($port in 22, 80, 443)]] | لف على ٣ أرقام، وكل لفة الرقم في [[$port]] |
| [[$open = Test-NetConnection ... -InformationLevel Quiet]] | True أو False في [[$open]] |
| [[-WarningAction SilentlyContinue]] | اخفي سطر [[WARNING: TCP connect ... failed]] الأصفر |
| [[if (-not $open)]] | [[-not]] بيقلب: لو مش مفتوح |
| [[{ "CLOSED $port" }]] | نص لوحده في سطر = بيتطبع. و [[$port]] جوه الـ double quotes بتتحط قيمتها |

جربته على [[127.0.0.1]] (جهازي) مع 22 و 80 و 443 و 5432:

~~~text الناتج
CLOSED 22
CLOSED 80
CLOSED 443
~~~

5432 مطلعش لأن Postgres شغال عليه. والسطر المتعلّق عليه في الـ solCode بـ [[Test-Connection -TcpPort -Quiet]] نفس الفكرة في PowerShell 7 على أي نظام، وجربته فطلع [[22 False]] و [[5432 True]].

---

## على الأنظمة التانية

| | ويندوز PowerShell | CMD | لينكس والماك |
|---|---|---|---|
| الطريق | [[Test-NetConnection host -TraceRoute]] | [[tracert host]] | [[traceroute host]] |
| البورت True/False | [[-InformationLevel Quiet]] | | [[nc -z host 443]] والـ exit code |

## الخلاصة

~~~text
-TraceRoute               لستة الراوترات بالترتيب، أولها راوتر البيت
0.0.0.0 في النص           راوتر مش بيرد، عادي لو اللي بعده كمّل
-InformationLevel Quiet   True أو False بس، للسكربتات و if
~~~`,
          lines: [
            "الطريق لحد جوجل، راوتر راوتر (زي traceroute).",
            "البورت مفتوح ولا لأ، الإجابة True أو False بس ([[-InformationLevel Quiet]])، مناسب للسكربتات."
          ],
          sol: R`الحل في الـ solCode. [[-InformationLevel Quiet]] بيرجع True أو False بس، فالسكربت بيطبع سطر زي [[CLOSED 443]] للبورتات المقفولة بس، ولو كله مفتوح مش هيطبع حاجة. [[-WarningAction SilentlyContinue]] عشان التحذير الأصفر ميظهرش مع كل بورت مقفول.

ولو عايزه يشتغل في PowerShell 7 على أي نظام، استخدم [[Test-Connection $server -TcpPort $port -Quiet]] (السطر المتعلق عليه). جربت النسخة دي على 127.0.0.1 مع 22 و 5432 و 3917 فطبع [[CLOSED 22]] و [[CLOSED 3917]] بس، لأن Postgres بس اللي كان شغال على 5432. البورت المقفول بياخد وقت لحد ما يستسلم، فمتستغربش لو السكربت بطيء شوية.`,
          solCode: R`$server = "203.0.113.10"
foreach ($port in 22, 80, 443) {
    $open = Test-NetConnection $server -Port $port -InformationLevel Quiet -WarningAction SilentlyContinue
    # PowerShell 7 على أي نظام: $open = Test-Connection $server -TcpPort $port -Quiet -TimeoutSeconds 3
    if (-not $open) { "CLOSED $port" }
}`
        },
        {
          cmd: "Get-NetTCPConnection -State Listen",
          title: "مين بيسمع على أنهي بورت",
          desc: R`[[-State Listen]] من غير رقم بورت بيعرض كل البرامج اللي «سامعة» على بورتات عندك، زي [[ss -tlnp]] في لينكس و [[netstat -ano | findstr LISTENING]] في CMD. أهم عمودين: [[LocalPort]] البورت، و [[LocalAddress]] بيقولك مين يقدر يوصله: [[0.0.0.0]] أو [[::]] معناها أي حد على الشبكة (مكشوف)، و [[127.0.0.1]] أو [[::1]] جوه جهازك بس.

السطر التاني فيه حاجتين جداد: [[[pscustomobject]@{ ... }]] بيعمل object جديد بالأعمدة اللي انت عايزها (هنا Port و App)، والأقواس [[(Get-Process -Id ...).Name]] بتحوّل رقم العملية لاسمها. و [[Sort-Object Port -Unique]] يرتب ويشيل المكرر، لأن البرنامج الواحد غالبًا بيسمع على IPv4 و IPv6.

رقم العملية 4 ده [[System]] (ويندوز نفسه) و 0 ده Idle، عاديين. ولو لقيت قاعدة بيانات زي Postgres سامعة على 0.0.0.0 وانت مش محتاج حد من بره يوصلها، دي ثغرة على أي شبكة عامة.`,
          example: R`Get-NetTCPConnection -State Listen | Select-Object LocalAddress, LocalPort, OwningProcess | Sort-Object LocalPort
Get-NetTCPConnection -State Listen | ForEach-Object { [pscustomobject]@{ Port = $_.LocalPort; App = (Get-Process -Id $_.OwningProcess).Name } } | Sort-Object Port -Unique`,
          try: "اعرف أسامي البرامج اللي فاتحة بورتات عندك.",
          practice: [
            { lvl: 'سريع', t: R`اطبع البورتات المكشوفة للشبكة بس (اللي [[LocalAddress]] بتاعها [[0.0.0.0]] أو [[::]]) من غير تكرار: [[Get-NetTCPConnection -State Listen | Where-Object LocalAddress -in '0.0.0.0', '::' | Sort-Object LocalPort -Unique | Select-Object LocalPort, OwningProcess]].`, done: R`لستة بورتات، وغالبًا فيها 135 و 445 (خدمات ويندوز نفسه)، ومفيهاش ولا بورت سامع على 127.0.0.1 بس.` },
            { lvl: 'تطبيق', t: R`افتح بورت بنفسك واتفرّج عليه: [[$l = [System.Net.Sockets.TcpListener]::new([ipaddress]::Loopback, 8765); $l.Start()]]، وبعدين [[Get-NetTCPConnection -LocalPort 8765 -State Listen]]، وبعدين [[$l.Stop()]] واسأل تاني.`, done: R`وهو شغال [[LocalAddress]] بيبقى 127.0.0.1 و [[OwningProcess]] هو نفس [[$PID]] بتاع نافذتك، و [[Test-NetConnection 127.0.0.1 -Port 8765 -InformationLevel Quiet]] بيقول True. وبعد [[Stop()]] نفس السؤال بيطلع error فيه [[No matching MSFT_NetTCPConnection objects found]].` },
            { lvl: 'تحدي', t: R`فانكشن [[Get-PortOwner]] بتاخد رقم بورت وبترجع object فيه Port و Address و PID و Name و Path بتاع البرنامج ([[(Get-Process -Id ...).Path]])، ولو محدش سامع بتطبع «محدش سامع على البورت ده» بدل الـ error الأحمر ([[-ErrorAction SilentlyContinue]] وبعدين [[if (-not $c)]]).`, done: R`والـ listener بتاع التمرين اللي فات شغال، [[Get-PortOwner 8765]] بترجع اسم [[pwsh]] ورقم [[$PID]] بتاعك ومسار pwsh.exe. ومن غيره بتطبع الرسالة بس، من غير ولا سطر أحمر.` },
          ],
          deep: {
            why: R`تعرف كل البرامج اللي فاتحة بورتات على جهازك، ومين فيهم مكشوف لأي حد على نفس الشبكة (مهم على واي فاي كافيه أو شغل). زي [[ss -tlnp]] في لينكس.`,
            how: R`[[-State Listen]] بيسيب البورتات اللي فيها برنامج مستني اتصالات، يعني السيرفرات اللي على جهازك. كل object فيه [[LocalAddress]] (بيسمع على أنهي عنوان)، و [[LocalPort]] (البورت)، و [[OwningProcess]] (رقم العملية اللي ماسكاه).

الرقم لوحده مش بيقولك حاجة، فبنحوّله لاسم بـ [[Get-Process -Id]]. ونفس البورت ممكن يظهر مرتين (مرة لـ IPv4 ومرة لـ IPv6)، وعشان كده المثال بيستخدم [[Sort-Object Port -Unique]].

ولو عملية قفلت بين الأمرين [[Get-Process]] بيطلع error، فضيف [[-ErrorAction SilentlyContinue]]: [[Get-NetTCPConnection -State Listen | ForEach-Object { $p = Get-Process -Id $_.OwningProcess -ErrorAction SilentlyContinue; [PSCustomObject]@{ Port = $_.LocalPort; Process = $p.Name } }]].`,
            when: "EADDRINUSE. تشوف مين ماسك أي بورت.",
            mistakes: "OwningProcess = 4 ده System، و0 ده Idle. عاديين."
          },
          teach: R`## الأول: يعني إيه «بيسمع»؟

أي سيرفر (Postgres، أو Vite، أو Node) بيفتح بورت ويقعد **يستنى** حد يتصل بيه، وده اسمه Listen. [[Get-NetTCPConnection]] بيعرض اتصالات TCP على الجهاز، و [[-State Listen]] بيخليها اللي مستنيين بس. السطر الأول بيعرض رقم العملية، والتاني بيحوّله لاسم برنامج. اتشغّلوا على ويندوز 11 في PowerShell 7.6 من غير أدمن.

---

## ١. السطر الأول، ٣ حتت

~~~powershell
Get-NetTCPConnection -State Listen | Select-Object LocalAddress, LocalPort, OwningProcess | Sort-Object LocalPort
~~~

1. [[Get-NetTCPConnection -State Listen]]: كل البورتات اللي فيها حد بيسمع.
2. [[| Select-Object LocalAddress, LocalPort, OwningProcess]]: خد ٣ أعمدة بس.
3. [[| Sort-Object LocalPort]]: رتّبهم بالبورت من الصغير للكبير.

~~~text الناتج (أول 14 سطر من 54)
LocalAddress LocalPort OwningProcess
------------ --------- -------------
0.0.0.0            135          1864
::                 135          1864
192.168.1.65       139             4
172.29.160.1       139             4
::                 445             4
127.0.0.1         1001             4
127.0.0.1         1042         23080
127.0.0.1         2222          6424
0.0.0.0           5040         13084
::1               5432         38420
::                5432          6424
::                5746         21380
::                5747         27384
127.0.0.1         5939          6940
~~~

### نقرا الأعمدة

| العمود | معناه |
|---|---|
| [[LocalAddress]] | **مين يقدر يوصل** |
| [[LocalPort]] | رقم البورت |
| [[OwningProcess]] | رقم العملية (PID = Process ID) اللي فاتحة البورت |

و [[LocalAddress]] أهم عمود:

| القيمة | معناها |
|---|---|
| [[0.0.0.0]] (IPv4) أو [[::]] (IPv6) | بيسمع على **كل** الكروت: أي حد على الشبكة يوصله |
| [[127.0.0.1]] أو [[::1]] | جهازك بس |
| عنوان معيّن زي [[192.168.1.65]] | الكارت ده بس |

ليه 135 مكررة مرتين؟ واحدة على IPv4 ([[0.0.0.0]]) وواحدة على IPv6 ([[::]])، نفس البرنامج. و [[OwningProcess 4]] ده ويندوز نفسه (عملية اسمها System).

---

## ٢. السطر التاني: الرقم يبقى اسم

~~~powershell
Get-NetTCPConnection -State Listen | ForEach-Object { [pscustomobject]@{ Port = $_.LocalPort; App = (Get-Process -Id $_.OwningProcess).Name } } | Sort-Object Port -Unique
~~~

نفكه من جوه لبرة:

### [[Get-Process -Id $_.OwningProcess]]

[[$_]] معناها «الحاجة اللي جاية في الـ pipeline دلوقتي»، هنا اتصال واحد. و [[$_.OwningProcess]] رقم العملية بتاعته. و [[Get-Process -Id 1864]] بيجيب العملية بالرقم ده.

### [[(...).Name]]

الأقواس تنفّذ الأول، و [[.Name]] تاخد اسم العملية بس، زي [[svchost]].

### [[@{ Port = ...; App = ... }]]

[[@{ }]] hashtable: مفاتيح وقيم، و [[;]] بين كل واحد والتاني. هنا مفتاحين: [[Port]] و [[App]].

### [[[pscustomobject]]]

بيحوّل الـ hashtable لـ object حقيقي، فـ PowerShell يعرضه جدول بعمودين [[Port]] و [[App]]، ويقدر [[Sort-Object]] يرتّب بيه.

### [[ForEach-Object { ... }]]

اعمل الكلام ده لكل اتصال (درس ForEach-Object).

### [[Sort-Object Port -Unique]]

رتّب بالبورت، و [[-Unique]] يشيل أي سطر البورت بتاعه اتكرر.

~~~text الناتج (أول 14 من 43)
Port App
---- ---
 135 svchost
 139 System
 445 System
1001 System
1042 asus_framework
2222 com.docker.backend
5040 svchost
5432 wslrelay
5746 Code
5747 Code
5939 TeamViewer_Service
7070 AnyDesk
7680 svchost
7778 ArmouryCrateControlInterface
~~~

54 سطر بقوا 43 بعد [[-Unique]]. و [[Code]] ده VS Code، و [[com.docker.backend]] Docker Desktop.

> خلي بالك: [[-Unique]] بيبص على البورت بس. هنا 5432 كان عليه برنامجين مختلفين (في السطر الأول: [[::1]] بالعملية 38420 و [[::]] بالعملية 6424)، و [[-Unique]] سابت واحد بس ([[wslrelay]]). فلو عايز تشوف الكل، شيل [[-Unique]].

---

## ملخص السطر التاني

| الخطوة | الحتة | بيعمل إيه |
|---|---|---|
| ١ | [[Get-NetTCPConnection -State Listen]] | كل اللي بيسمع |
| ٢ | [[ForEach-Object { }]] | لكل واحد |
| ٣ | [[(Get-Process -Id $_.OwningProcess).Name]] | رقم العملية يبقى اسم |
| ٤ | [[[pscustomobject]@{ Port; App }]] | سطر جديد بعمودين |
| ٥ | [[Sort-Object Port -Unique]] | رتّب وشيل تكرار البورت |

## على الأنظمة التانية

| | ويندوز PowerShell | CMD | لينكس |
|---|---|---|---|
| مين بيسمع | [[Get-NetTCPConnection -State Listen]] | [[netstat -ano]] وابحث عن LISTENING | [[ss -tlnp]] |

[[ss -tlnp]]: t = TCP، و l = listening، و n = أرقام مش أسامي، و p = اسم البرنامج.

## الخلاصة

~~~text
0.0.0.0 أو ::      مكشوف للشبكة
127.0.0.1 أو ::1   جهازك بس
PID 4              ويندوز نفسه (System)
-Unique            بيشيل تكرار البورت، حتى لو البرنامج مختلف
~~~`,
          lines: [
            "كل البورتات اللي بتسمع، مع رقم العملية، مرتبة بالبورت.",
            "نفس الحاجة بس بدل رقم العملية اسمها: لكل اتصال اعمل object جديد فيه البورت واسم البرنامج."
          ],
          sol: R`التاني في المثال هو الحل. هيطلع جدول [[Port  App]] مترتب، زي [[135 svchost]] و [[445 System]] و [[5432 postgres]] و [[3000 node]]. [[-Unique]] بيشيل التكرار لأن البرنامج الواحد ممكن يسمع على IPv4 و IPv6.

البورتات الصغيرة زي 135 و 445 تبع ويندوز نفسه، سيبهم. رقم العملية 4 اسمه [[System]]، و 0 اسمه [[Idle]]. ولو ظهر error [[Cannot find a process with the process identifier]]، البرنامج اتقفل بين الأمرين، شغّل تاني. ولو عايز تعرف مين مكشوف للشبكة ضيف عمود [[LocalAddress]] وشوف مين عليه [[0.0.0.0]] أو [[::]].`
        },
        {
          cmd: "ssh -L",
          title: "SSH tunnel من ويندوز",
          desc: R`الـ tunnel بيخليك توصل لخدمة جوه السيرفر (زي Postgres على 5432) كأنها على جهازك، من غير ما تفتح البورت بتاعها للنت. نفس أمر لينكس بالظبط، شغال من PowerShell.

[[-L 5433:127.0.0.1:5432]] معناها: افتح بورت 5433 على جهازي، وأي حاجة توصله ابعتها جوه اتصال SSH للسيرفر، والسيرفر يوصّلها لـ 127.0.0.1:5432 عنده (يعني Postgres اللي على السيرفر نفسه). و [[-N]] يعني متفتحليش shell على السيرفر، أنا عايز الـ tunnel بس. و [[deploy@203.0.113.10]] اليوزر والسيرفر.

استخدمنا 5433 مش 5432 عشان لو عندك Postgres محلي ميحصلش تعارض. النافذة هتفضل واقفة من غير ما تطبع حاجة وده معناه إنه شغال، وتقفل الـ tunnel بـ Ctrl+C. وصّل DBeaver أو pgAdmin على [[localhost:5433]].`,
          example: "ssh -N -L 5433:127.0.0.1:5432 deploy@203.0.113.10",
          try: "افتح tunnel ووصّل بيه DBeaver على localhost:5433.",
          practice: [
            { lvl: 'سريع', t: R`اعرف أنهي ssh بيشتغل لما تكتب [[ssh]]: [[Get-Command ssh -All | Select-Object Source]] وبعدين [[ssh -V]].`, done: R`بتشوف مسار أو أكتر، وأول واحد هو اللي بيشتغل: اللي جاي مع ويندوز في [[C:\Windows\System32\OpenSSH\ssh.exe]]، ولو Git متسطب وفولدره في PATH ممكن تلاقي كمان ssh بتاع Git. و [[ssh -V]] بيطبع اسم النسخة ورقمها.` },
            { lvl: 'تطبيق', t: R`حط الـ tunnel في [[~/.ssh/config]] بدل ما تكتبه كل مرة: [[Host db-tunnel]] وتحته [[HostName]] و [[User]] و [[LocalForward 5433 127.0.0.1:5432]]. واتأكد من غير ما تتصل بـ [[ssh -G db-tunnel | Select-String '^(user|hostname|localforward) ']].`, done: R`[[ssh -G]] بيطبع [[localforward 5433 [127.0.0.1]:5432]] والـ user والـ hostname اللي كتبتهم ([[-G]] بيقرا الـ config ويطبعه بس، مش بيتصل)، وبعدها [[ssh -N db-tunnel]] بيعمل نفس tunnel الدرس.` },
            { lvl: 'تحدي', t: R`سكربت بيفتح الـ tunnel في الخلفية: [[$p = Start-Process ssh -ArgumentList '-N', 'db-tunnel' -PassThru -WindowStyle Hidden]]، ويستنى لحد ما بورت 5433 يبقى Listen ([[Get-NetTCPConnection -LocalPort 5433 -State Listen -ErrorAction SilentlyContinue]] في لوب، بحد أقصى ١٠ ثواني)، ولو مفتحش يقفل البروسيس بـ [[Stop-Process]] ويخرج بـ [[exit 1]].`, done: R`مع سيرفر شغال البورت بيظهر Listen وتقدر توصّل عليه. ولو اسم الـ host غلط السكربت بيخرج بكود 1 قبل ما الـ ١٠ ثواني يخلصوا، و [[Get-Process -Id $p.Id -ErrorAction SilentlyContinue]] بعدها مبيلاقيش حاجة. (محتاج سيرفر SSH حقيقي، فمتجرّبش هنا: ده من الدرس والـ docs.)` },
          ],
          deep: {
            why: "SSH tunnel من ويندوز. نفس الفكرة بالظبط زي bash: بتتصل بسيرفر وبيفتح بورت محلي بيوصلك لخدمة داخلية.",
            how: R`[[ssh -N -L 5433:127.0.0.1:5432 deploy@203.0.113.10]] نفس الأمر بالظبط زي لينكس، لأن ويندوز جاي معاه OpenSSH. [[-L]] شكله [[بورت_عندك:العنوان:بورت_هناك]]: أي اتصال على 5433 عندك بيتبعت جوه SSH، والسيرفر بيوصّله لـ 127.0.0.1:5432، و 127.0.0.1 هنا معناها السيرفر نفسه مش جهازك.

[[-N]] يعني متفتحش ترمنال على السيرفر، اعمل الممر بس، فالنافذة هتفضل واقفة من غير prompt وده طبيعي. سيبها مفتوحة، وافتح الـ DB client على [[localhost:5433]]. ولما تخلص، Ctrl+C بيقفل الممر.

ولو 5433 مستخدم عندك، ssh مش هيقدر يفتح الممر عليه وهيطبع تحذير فيه كلمة bind، فاختار رقم تاني فاضي (اتأكد بـ [[Get-NetTCPConnection -LocalPort 5433]]).`,
            when: "تفتح قاعدة بيانات سيرفر من pgAdmin أو DBeaver على ويندوز.",
            mistakes: "نفس غلطات bash: تنسى -N فيفتح terminal على السيرفر. وتنسى إنه شغال في الخلفية."
          },
          teach: R`## الأول: الـ tunnel بيعمل إيه

Postgres على السيرفر سامع على [[127.0.0.1:5432]]، يعني جوه السيرفر بس، ومحدش من بره يوصله. و [[ssh -L]] بيفتح بورت على **جهازك**، وأي حاجة توصله بتتبعت جوه اتصال SSH المشفّر للسيرفر، والسيرفر يوصّلها لـ Postgres عنده.

---

## الأمر حتة حتة

~~~powershell
ssh -N -L 5433:127.0.0.1:5432 deploy@203.0.113.10
~~~

| الحتة | معناها |
|---|---|
| [[ssh]] | نفس OpenSSH اللي جاي مع ويندوز (درس ssh / scp) |
| [[-N]] | No command: متفتحليش shell على السيرفر، أنا عايز الـ tunnel بس |
| [[-L]] | Local forward: بورت **محلي** على جهازي بيتحوّل للسيرفر |
| [[5433]] | البورت اللي هيتفتح على جهازك |
| [[127.0.0.1:5432]] | يوصّل لفين، **من وجهة نظر السيرفر**: 127.0.0.1 هنا هو السيرفر نفسه |
| [[deploy@203.0.113.10]] | اليوزر والسيرفر |

### أصعب حتة: [[5433:127.0.0.1:5432]]

اقراها كده: «**البورت 5433 عندي** ← يروح للسيرفر ← اللي يوصّله لـ **127.0.0.1:5432** عنده». الـ [[127.0.0.1]] مش جهازك، لأن السيرفر هو اللي بيفتح الاتصال ده.

وليه 5433 مش 5432؟ لو عندك Postgres على جهازك ماسك 5432، الـ tunnel مش هيعرف يفتحه.

---

## جربته بجد

مكانش عندي سيرفر فيه Postgres، فعملت نفس الفكرة على سيرفر SSH جوه container أوبونتو 24.04 (بورت 2222 على جهازي)، ووجّهت الـ tunnel لبورت 22 جوه الـ container بدل 5432:

~~~powershell
ssh -N -L 5433:127.0.0.1:22 -p 2222 root@127.0.0.1
~~~

النافذة فضلت واقفة ومطبعتش حاجة: ده معناه إنه **شغال**. ومن نافذة تانية:

~~~powershell
Get-NetTCPConnection -LocalPort 5433 -State Listen
~~~

~~~text الناتج
LocalAddress LocalPort OwningProcess App
------------ --------- ------------- ---
::1               5433         14292 ssh
127.0.0.1         5433         14292 ssh
~~~

(عمود App زوّدته من درس «Get-NetTCPConnection -State Listen».) يعني [[ssh]] نفسه هو اللي فاتح 5433، وعلى [[127.0.0.1]] و [[::1]] بس، فمحدش على الشبكة بتاعتك يقدر يستخدمه. ولما اتصلت بـ 5433 وقريت أول سطر:

~~~text الناتج
SSH-2.0-OpenSSH_9.6p1 Ubuntu-3ubuntu13.19
~~~

ده رد الخدمة اللي **جوه** الـ container، يعني الطلب عدّى من الـ tunnel فعلًا. وبعد ما قفلت الـ ssh، [[Test-NetConnection 127.0.0.1 -Port 5433]] رجع [[TcpTestSucceeded : False]]: الـ tunnel بيعيش طول ما النافذة مفتوحة بس.

مع Postgres بقى: افتح DBeaver أو pgAdmin على [[localhost]] بورت [[5433]]، باليوزر والباسورد بتوع Postgres اللي على السيرفر.

---

## نفس الأمر في كل مكان

| | ويندوز (PowerShell أو CMD) | لينكس والماك |
|---|---|---|
| الأمر | [[ssh -N -L 5433:127.0.0.1:5432 user@host]] | نفسه بالظبط |
| القفل | Ctrl+C في النافذة | نفسه |

## الخلاصة

~~~text
-L  جهازي:5433  →  SSH  →  السيرفر يوصّل لـ 127.0.0.1:5432 عنده
-N  من غير shell
النافذة واقفة = شغال      اقفلها = الـ tunnel وقع
~~~`,
          lines: ["نفس الممر زي لينكس بالظبط: بورت 5433 عندك يوصل لـ 5432 على السيرفر."],
          sol: R`الأمر مش بيطبع حاجة بعد ما تدخل، والنافذة بتفضل واقفة، وده معناه إن الـ tunnel شغال ([[-N]] يعني من غير shell). في DBeaver اعمل connection جديد: Host [[localhost]] و Port [[5433]] واسم الداتابيز واليوزر والباسورد بتوع Postgres اللي على السيرفر، و Test Connection هيقول Connected.

لو قفلت نافذة الـ ssh الاتصال هيقع. لو ظهر [[bind [127.0.0.1]:5433: Address already in use]] يبقى 5433 مستخدم عندك، غيّر الرقم. ولو DBeaver قال connection refused والـ ssh طبع [[channel ... open failed: connect failed: Connection refused]]، يبقى Postgres على السيرفر مش بيسمع على 127.0.0.1:5432 (مثلًا شغال في Docker على بورت تاني).`
        }
      ]
    }
]);
