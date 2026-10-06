// تكملة تاب ps: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/ps/01.js (شرح حقول الدرس في أوله)
MORE("ps", [
    {
      t: "تحكّم في الشبكة من PowerShell",
      l: 2,
      n: R`كروت الشبكة، والـ IP الثابت، والـ DNS، والفايروول، ونوع الشبكة Public ولا Private: اللي بتغيّره من Settings و Control Panel بأمر واحد. العرض من غير أدمن، والتغيير محتاج Terminal أدمن، وكله ويندوز بس`,
      items: [
        {
          cmd: "Get-NetAdapter",
          title: "كروت الشبكة: اعرضها ووقّفها وشغّلها",
          desc: R`[[Get-NetAdapter]] بيعرض كروت الشبكة اللي في جهازك (Wi-Fi و Ethernet والكروت الافتراضية)، وحالة كل واحد وسرعته والـ MAC بتاعه. و [[Restart-NetAdapter]] بيطفي الكارت ويشغّله تاني، ودي أسرع حاجة تجربها لما النت واقف والواي فاي مكتوب Connected.

الأعمدة: [[Name]] اسم الكارت اللي هتستخدمه في باقي الأوامر (زي [[Wi-Fi]] و [[Ethernet]])، و [[Status]] الحالة ([[Up]] شغال ومتوصل، و [[Disconnected]] مفيش كابل أو مش متوصل بشبكة، و [[Disabled]] متقفل)، و [[LinkSpeed]] السرعة بينك وبين الراوتر (مش سرعة النت)، و [[MacAddress]] العنوان الفيزيائي للكارت. و [[-Physical]] بيعرض الكروت الحقيقية بس، من غير الافتراضية بتاعة WSL و VPN و Hyper-V.

[[Get-NetAdapterStatistics]] بيعرض البايتات اللي اتبعتت واتستقبلت من ساعة ما الكارت اشتغل، و [[-Name "Wi-Fi"]] الكارت ده بس (علامات التنصيص لازمة لو الاسم فيه مسافة زي [["Ethernet 2"]]). [[Disable-NetAdapter]] بيقفل الكارت و [[Enable-NetAdapter]] بيرجّعه، والاتنين بيسألوك «Are you sure» افتراضيًا، و [[-Confirm:$false]] بيلغي السؤال.

العرض شغال من غير أدمن، لكن Disable و Enable و Restart محتاجين Terminal أدمن (Win+X وبعدين Terminal (Admin)). وتحذير: لو انت داخل على الجهاز من بعيد (Remote Desktop أو SSH أو PowerShell remoting)، قفل الكارت اللي انت داخل منه بيقطعك، ومش هيرجع غير لو حد قدام الجهاز. الموديول [[NetAdapter]] جاي مع ويندوز في فولدر موديولات 5.1، و PowerShell 7 بيحمّله عادي (جربته على 7.6).`,
          example: R`Get-NetAdapter
Get-NetAdapter -Physical | Select-Object Name, Status, LinkSpeed, MacAddress
Get-NetAdapterStatistics -Name "Wi-Fi" | Select-Object Name, ReceivedBytes, SentBytes
Restart-NetAdapter -Name "Wi-Fi"
Disable-NetAdapter -Name "Ethernet" -Confirm:$false
Enable-NetAdapter -Name "Ethernet"`,
          try: R`اعرف الكارت اللي انت متوصل بيه فعلًا وسرعته، وكام جيجا نزلت عليه من ساعة ما الجهاز فتح (اقسم [[ReceivedBytes]] على [[1GB]]).`,
          flag: "danger",
          deep: {
            why: R`النت واقف والواي فاي مكتوب Connected، أو كارت الـ Ethernet مش شايف الكابل، أو محتاج الـ MAC بتاع جهازك عشان تحطه في الراوتر (حجز IP أو فلترة أجهزة). بدل ما تلف في Control Panel ← Network Connections، الأمر بيوريك كل الكروت في جدول، و [[Restart-NetAdapter]] بيعمل نفس «Disable وبعدين Enable» اللي بتعمله بالماوس.`,
            how: R`الكروت الافتراضية كتير: [[vEthernet (WSL)]] و TAP بتاع الـ VPN و Bluetooth Network Connection، وكل واحد ليه IP خاص بيه، وده سبب إن [[Get-NetIPAddress]] (درس «Get-NetIPAddress») بيطلع زحمة. [[-Physical]] أو [[Where-Object Status -eq Up]] بيوصلك للحقيقي بسرعة.

[[LinkSpeed]] في الواي فاي بيتغير كل شوية حسب الإشارة (ابعد عن الراوتر وشغّل الأمر تاني)، وفي الكابل غالبًا 1 Gbps. لو كابل بيقول 100 Mbps وانت متوقع 1 Gbps، غالبًا الكابل أو بورت الراوتر قديم.

[[Get-NetAdapterAdvancedProperty -Name "Wi-Fi"]] بيعرض إعدادات الدرايفر المتقدمة (نفس اللي في Device Manager ← Advanced)، زي Wake on Magic Packet (درس Wake-on-LAN). و [[Get-NetAdapter -Name "Wi-Fi" | Format-List *]] بيعرض كل الخصائص، منها [[InterfaceDescription]] (اسم الكارت الحقيقي، زي Intel Wi-Fi 6 AX200) و [[DriverVersion]].

[[Restart-NetAdapter]] بيقطع النت ثواني ويرجع لوحده، ولو المشكلة في الراوتر نفسه مش هيحل حاجة. الخطوة الأقوى «Network reset» من Settings، اللي بتمسح إعدادات كل الكروت وترجّعها، والمقابل من CMD في درس «netsh winsock reset» في تاب «CMD».`,
            when: R`النت مقطوع والكارت شكله متوصل، أو بعد ما الجهاز يصحى من sleep والواي فاي مش راجع، أو محتاج الـ MAC والسرعة، أو سكربت بيقفل الواي فاي لما الكابل يتوصل.`,
            mistakes: R`تقفل الكارت الوحيد وانت داخل على الجهاز من بعيد. أو تكتب اسم الكارت غلط ([[Wi-Fi]] غير [[WiFi]]، و [[Ethernet 2]] غير [[Ethernet]]، وفي ويندوز بلغة تانية الأسامي ممكن تبقى مترجمة)، فانسخ الاسم من عمود Name. أو تفتكر [[LinkSpeed]] هي سرعة النت. أو تشوف [[Disconnected]] على الـ Ethernet وانت شغال واي فاي وتفتكرها مشكلة.`
          },
          teach: R`## الأول: نصّين

أول ٣ سطور **عرض** بس، شغالين من غير أدمن ومش بيغيّروا حاجة. وآخر ٣ **تحكّم**: بيقفلوا ويشغّلوا كروت، ومحتاجين أدمن، وبيقطعوا النت. العرض اتشغّل على لابتوب ويندوز 11 في PowerShell 7.6. والتحكّم مشغّلتوش (كان هيقطع النت)، فشكله من توثيق Microsoft، ومعاه الـ error اللي بيطلع من نافذة مش أدمن.

---

## ١. [[Get-NetAdapter]]

~~~text الناتج (الـ MAC مخبّي آخره)
Name                      InterfaceDescription                 ifIndex Status       MacAddress        LinkSpeed
----                      --------------------                 ------- ------       ----------        ---------
vEthernet (WSL (Hyper-V … Hyper-V Virtual Ethernet Adapter          53 Up           00-15-5D-XX-XX-XX   10 Gbps
Ethernet                  Realtek PCIe GbE Family Controller        17 Disconnected F0-2F-74-XX-XX-XX     0 bps
Wi-Fi                     Intel(R) Wi-Fi 6 AX200 160MHz             13 Up           84-1B-77-XX-XX-XX  150 Mbps
HotspotShield Network Ad… HotspotShield TAP-Windows Adapter V9      10 Disconnected 00-FF-66-XX-XX-XX    1 Gbps
Ethernet 2                TAP-Windows Adapter V9                     9 Disconnected 00-FF-57-XX-XX-XX  100 Mbps
Bluetooth Network Connec… Bluetooth Device (Personal Area Netw…      3 Disconnected 84-1B-77-XX-XX-XX    3 Mbps
~~~

| العمود | معناه |
|---|---|
| [[Name]] | الاسم اللي بتكتبه في باقي الأوامر |
| [[InterfaceDescription]] | الكارت الحقيقي: Realtek للكابل، و Intel AX200 للواي فاي |
| [[ifIndex]] | رقم الكارت (Interface Index) |
| [[Status]] | [[Up]] شغال ومتوصل، و [[Disconnected]] مفيش كابل أو شبكة، و [[Disabled]] متقفل |
| [[MacAddress]] | العنوان الفيزيائي، ٦ بايتات بالـ hex، ثابت على الكارت |
| [[LinkSpeed]] | السرعة **بينك وبين الراوتر**، مش سرعة النت |

لاحظ الحاجات اللي بتلخبط:

- [[Ethernet]] بـ [[Disconnected]] و [[0 bps]]: مفيش كابل متوصل، وده طبيعي وانت على الواي فاي.
- [[vEthernet (WSL ...)]] بـ [[10 Gbps]]: كارت وهمي جوه الجهاز بين ويندوز و WSL، فالسرعة رقم نظري.
- الواي فاي [[150 Mbps]]: ده اتفاق الكارت مع الراوتر دلوقتي، وبيتغير لو بعدت أو قربت (في الدرس ده من قبل طلع 130).
- الأسامي الطويلة مقصوصة بـ [[…]] لأن الجدول ملوش مكان.

---

## ٢. [[Get-NetAdapter -Physical | Select-Object Name, Status, LinkSpeed, MacAddress]]

[[-Physical]] الكروت اللي ليها هاردوير حقيقي بس، و [[Select-Object]] ٤ أعمدة:

~~~text الناتج
Name     Status       LinkSpeed MacAddress
----     ------       --------- ----------
Ethernet Disconnected 0 bps     F0-2F-74-XX-XX-XX
Wi-Fi    Up           150 Mbps  84-1B-77-XX-XX-XX
~~~

٦ كروت بقوا ٢: الكابل والواي فاي.

---

## ٣. [[Get-NetAdapterStatistics -Name "Wi-Fi" | Select-Object Name, ReceivedBytes, SentBytes]]

[[-Name "Wi-Fi"]] الكارت ده بس، وعلامات التنصيص هنا مش لازمة بس بتحمي لو الاسم فيه مسافة زي [["Ethernet 2"]].

~~~text الناتج
Name  ReceivedBytes SentBytes
----  ------------- ---------
Wi-Fi     351470055  64953528
~~~

[[ReceivedBytes]] اللي نزل و [[SentBytes]] اللي اترفع، **بالبايت**، من ساعة ما الكارت اشتغل آخر مرة. ولو قسمت على [[1GB]] (PowerShell فاهمها رقم = 1073741824):

~~~powershell
[math]::Round((Get-NetAdapterStatistics -Name "Wi-Fi").ReceivedBytes / 1GB, 2)
~~~

~~~text الناتج
0.33
~~~

يعني حوالي ثلث جيجا نزل. [[[math]::Round(..., 2)]] قرّب لرقمين بعد العلامة.

---

## ٤. التحكّم (أدمن)

| السطر | بيعمل إيه |
|---|---|
| [[Restart-NetAdapter -Name "Wi-Fi"]] | يطفي الكارت ويشغّله. النت بيقطع ثواني |
| [[Disable-NetAdapter -Name "Ethernet" -Confirm:$false]] | يقفل الكارت |
| [[Enable-NetAdapter -Name "Ethernet"]] | يرجّعه |

### [[-Confirm:$false]]

Disable و Enable افتراضيًا بيسألوك «Are you sure you want to perform this action?» وتكتب Y. و [[-Confirm:$false]] معناها «متسألش». النقطتين [[:]] بتلزق القيمة [[$false]] في الـ switch (زي ما تقول -Confirm = لأ).

### [[-WhatIf]]: جرّب من غير ما تعمل

أي أمر بيغيّر حاجة تقدر تزوّد عليه [[-WhatIf]] فيقولك هيعمل إيه من غير ما يعمله:

~~~powershell
Restart-NetAdapter -Name "Wi-Fi" -WhatIf
~~~

~~~text الناتج
What if: Restart-NetAdapter 'Wi-Fi'
~~~

ومن نافذة مش أدمن، [[Restart-NetAdapter -Name "Ethernet"]] طلع:

~~~text الناتج
Access is denied.
~~~

يعني لازم Terminal (Admin): Win+X وبعدين Terminal (Admin).

---

## الحل (solCode)

~~~powershell
Get-NetAdapter | Where-Object Status -eq Up | Select-Object Name, LinkSpeed
~~~

[[Where-Object Status -eq Up]]: سيب الكروت اللي [[Status]] بتاعها [[Up]] بس ([[-eq]] = يساوي).

~~~text الناتج
Name                               LinkSpeed
----                               ---------
vEthernet (WSL (Hyper-V firewall)) 10 Gbps
Wi-Fi                              150 Mbps
~~~

الأول وهمي، فاللي انت متوصل بيه فعلًا الواي فاي. والسطر التاني في الـ solCode هو قسمة الـ [[1GB]] اللي فوق.

---

## على الأنظمة التانية

| | ويندوز | لينكس | الماك |
|---|---|---|---|
| الكروت | [[Get-NetAdapter]] | [[ip link]] | [[ifconfig]] |
| اقفل وشغّل | [[Disable-NetAdapter]] / [[Enable-NetAdapter]] | [[sudo ip link set wlan0 down]] / [[up]] | [[sudo ifconfig en0 down]] / [[up]] |

(لينكس والماك من الـ docs.)

## الخلاصة

~~~text
Name         الاسم اللي هتكتبه في كل الأوامر
Status Up    متوصل
LinkSpeed    للراوتر بس، مش سرعة النت
-Physical    من غير الكروت الوهمية
-WhatIf      شوف هيحصل إيه قبل ما يحصل
~~~`,
          lines: [
            "كل الكروت: الاسم والوصف والحالة والسرعة والـ MAC.",
            "الكروت الحقيقية بس، بالأعمدة المهمة.",
            "البايتات اللي اتستقبلت واتبعتت على الواي فاي.",
            "اطفي الواي فاي وشغّله تاني (أدمن). النت هيقطع ثواني.",
            "اقفل كارت الـ Ethernet من غير سؤال تأكيد (أدمن).",
            "شغّله تاني."
          ],
          sol: R`جربت أوامر العرض على لابتوب ويندوز 11 Home من غير أدمن. [[Get-NetAdapter]] طلع 6 كروت: [[Ethernet]] حالته [[Disconnected]] و [[0 bps]]، و [[Wi-Fi]] حالته [[Up]] و [[130 Mbps]]، وكروت افتراضية زي [[vEthernet (WSL (Hyper-V firewall))]] بـ [[10 Gbps]] واتنين TAP بتوع VPN و [[Bluetooth Network Connection]]. و [[-Physical]] قصّرهم لاتنين بس: Ethernet و Wi-Fi. والـ MAC بيظهر بالشكل [[84-1B-77-XX-XX-XX]] (خبّيت آخر 3 بايتات).

والحل في الـ solCode: [[Where-Object Status -eq Up]] طلع [[Wi-Fi]] و [[vEthernet (WSL (Hyper-V firewall))]]، والتاني ده افتراضي فالحقيقي هو الواي فاي. والقسمة طلعت [[4.96]] يعني حوالي 5 جيجا نزلت من ساعة ما الكارت اشتغل. (مقفلتش ولا عملت restart لأي كارت وأنا بكتب الدرس، عشان كان هيقطع النت.)`,
          solCode: R`Get-NetAdapter | Where-Object Status -eq Up | Select-Object Name, LinkSpeed
[math]::Round((Get-NetAdapterStatistics -Name "Wi-Fi").ReceivedBytes / 1GB, 2)`
        },
        {
          cmd: "New-NetIPAddress (static IP)",
          title: "IP ثابت لجهازك (والرجوع لـ DHCP)",
          desc: R`الراوتر بيدّي كل جهاز IP أوتوماتيك بالـ DHCP، والـ IP ده ممكن يتغير. [[New-NetIPAddress]] بيحط IP ثابت على كارت معين، فجهاز زي سيرفر في البيت أو جهاز بتوصل له من بعيد يفضل على نفس العنوان. والجزء التاني من المثال بيرجّع الكارت لـ DHCP.

[[$if = "Ethernet"]] اسم الكارت (من درس Get-NetAdapter). [[Set-NetIPInterface -Dhcp Disabled]] بيقفل الـ DHCP على الكارت ده. وبعدين [[Remove-NetIPAddress]] و [[Remove-NetRoute]] بيشيلوا أي عنوان و gateway قديم فاضلين من الـ DHCP، عشان New-NetIPAddress ميرفضش ويقولك إنهم موجودين: [[-AddressFamily IPv4]] عشان ميلمسش IPv6، و [[-DestinationPrefix 0.0.0.0/0]] الـ default route (الطريق لأي حاجة بره الشبكة)، و [[-Confirm:$false]] من غير أسئلة، و [[-ErrorAction SilentlyContinue]] متطلّعش error لو مفيش حاجة تتمسح.

[[-IPAddress 192.168.1.50]] العنوان الجديد، و [[-PrefixLength 24]] حجم الشبكة: 24 يعني الـ subnet mask هو 255.255.255.0، يعني أول 3 أرقام للشبكة والرقم الأخير للجهاز. و [[-DefaultGateway 192.168.1.1]] الراوتر، ولازم يبقى في نفس الشبكة. و [[Set-DnsClientServerAddress]] بيحدد الـ DNS (الدرس الجاي)، لأن من غير DHCP محدش هيدّيك DNS. وفي الرجوع: نفس المسح، وبعدين [[-Dhcp Enabled]] و [[-ResetServerAddresses]] يرجّعوا العنوان والـ DNS من الراوتر.

اختار العنوان صح: في نفس الشبكة (لو الراوتر 192.168.1.1 يبقى 192.168.1.x)، وبره المدى اللي الراوتر بيوزّع منه (بتلاقيه في صفحة الراوتر تحت DHCP، زي 192.168.1.100 لـ 192.168.1.199)، وإلا الراوتر ممكن يدّي نفس العنوان لموبايل ويحصل «IP conflict». والأحسن من ده كله غالبًا «DHCP reservation» من صفحة الراوتر: بتربط الـ MAC بتاع الجهاز بعنوان ثابت، والجهاز نفسه يفضل DHCP.

كله محتاج Terminal أدمن، والأوامر ويندوز بس (5.1 و 7). وتحذير: لو بتغيّر الكارت اللي انت داخل منه من بعيد، الاتصال هيتقطع، ولو العنوان غلط مش هتعرف ترجع. والمقابل من CMD في درس «netsh interface ip set address» في تاب «CMD».`,
          example: R`$if = "Ethernet"
Set-NetIPInterface -InterfaceAlias $if -Dhcp Disabled
Remove-NetIPAddress -InterfaceAlias $if -AddressFamily IPv4 -Confirm:$false -ErrorAction SilentlyContinue
Remove-NetRoute -InterfaceAlias $if -AddressFamily IPv4 -DestinationPrefix 0.0.0.0/0 -Confirm:$false -ErrorAction SilentlyContinue
New-NetIPAddress -InterfaceAlias $if -IPAddress 192.168.1.50 -PrefixLength 24 -DefaultGateway 192.168.1.1
Set-DnsClientServerAddress -InterfaceAlias $if -ServerAddresses 1.1.1.1, 8.8.8.8
Get-NetIPConfiguration -InterfaceAlias $if
# الرجوع لـ DHCP:
Remove-NetIPAddress -InterfaceAlias $if -AddressFamily IPv4 -Confirm:$false
Remove-NetRoute -InterfaceAlias $if -AddressFamily IPv4 -DestinationPrefix 0.0.0.0/0 -Confirm:$false
Set-NetIPInterface -InterfaceAlias $if -Dhcp Enabled
Set-DnsClientServerAddress -InterfaceAlias $if -ResetServerAddresses`,
          try: R`قبل ما تغيّر أي حاجة: اعرف عنوانك الحالي جاي منين ([[Get-NetIPAddress -InterfaceAlias "Wi-Fi" -AddressFamily IPv4]] وبص على [[PrefixOrigin]])، والـ DHCP شغال ولا لأ، واتأكد إن العنوان اللي ناوي عليه محدش واخده بـ [[Test-Connection 192.168.1.50 -Count 1 -Quiet]].`,
          flag: "danger",
          deep: {
            why: R`جهاز في البيت شغال سيرفر (ملفات، أو Home Assistant، أو جهاز بتعمله Remote)، أو طابعة، أو جهاز بتحطه في port forwarding: لازم عنوانه ميتغيرش، وإلا كل حاجة بتشاور عليه تقع لما الراوتر يدّيه عنوان جديد بعد restart.`,
            how: R`[[New-NetIPAddress]] بيكتب العنوان في مكانين: الإعدادات اللي شغالة دلوقتي، والإعدادات المحفوظة اللي بترجع بعد الـ restart. والتوثيق بيقول إنه لو الكارت عليه DHCP بيقفله لوحده، بس لو فيه gateway قديم موجود بيطلع error إن الـ gateway موجود، وعشان كده المسح الأول.

الإعداد ده على الكارت نفسه مش على شبكة واي فاي معينة. فلو حطيت IP ثابت على الواي فاي في لابتوب، وروحت الشغل أو كافيه شبكته 10.0.0.x، النت مش هيشتغل لحد ما ترجّع DHCP. عشان كده الـ IP الثابت مناسب لجهاز ثابت على الكابل، واللابتوب الأحسن له DHCP reservation.

[[-PrefixLength]] أرقام تانية: 16 يعني 255.255.0.0 (أول رقمين للشبكة)، و 8 يعني 255.0.0.0. شوف رقم شبكتك الحالي من [[Get-NetIPAddress]] (عمود PrefixLength) وحط زيه.

[[Get-NetIPInterface]] بيعرض حالة الـ DHCP لكل كارت ([[Dhcp Enabled]] أو [[Disabled]])، و [[PrefixOrigin]] في Get-NetIPAddress بيقولك العنوان جاي منين: [[Dhcp]] أو [[Manual]]. ولو العنوان بيبدأ بـ 169.254 يبقى الجهاز مخدش عنوان من DHCP ولا عنده ثابت.`,
            when: R`جهاز ثابت في البيت أو المكتب لازم عنوانه ميتغيرش ومينفعش تعمله reservation في الراوتر، أو شبكة صغيرة من غير راوتر (جهازين متوصلين بكابل مباشرة)، أو بتجرب حاجة في lab.`,
            mistakes: R`تختار عنوان جوه مدى الـ DHCP فيحصل conflict بعد أيام. أو تنسى الـ DNS فالـ ping على IP شغال والمواقع مش بتفتح. أو تكتب gateway في شبكة تانية فيطلع error. أو تحط IP ثابت على واي فاي لابتوب وتنساه. أو تشغّله من SSH على الكارت اللي انت داخل منه. أو في الرجوع تعمل [[-Dhcp Enabled]] بس من غير ما تمسح العنوان والـ gateway الثابتين، فيفضلوا جنب اللي جاي من الـ DHCP.`
          },
          teach: R`## الأول: الخطة

المثال جزئين: **تحط IP ثابت** (٧ سطور)، و**ترجع لـ DHCP** (٤ سطور). الـ DHCP هو اللي الراوتر بيدّي بيه كل جهاز عنوان أوتوماتيك، فعشان تحط عنوان بنفسك لازم: تقفل الـ DHCP، وتشيل العنوان القديم، وتحط الجديد، وتحط DNS.

مغيّرتش عنوان الجهاز وأنا بكتب الدرس (كان هيقطع النت). اللي تحت: أوامر عرض اتشغّلت فعلًا، وأوامر التغيير اتشغّلت بـ [[-WhatIf]] (بيقولك هيعمل إيه من غير ما يعمله)، والباقي من توثيق Microsoft لموديول NetTCPIP. كله ويندوز 11، PowerShell 7.6.

---

## قبل أي حاجة: الحالة دلوقتي

~~~powershell
Get-NetIPAddress -InterfaceAlias "Wi-Fi" -AddressFamily IPv4 | Select-Object IPAddress, PrefixLength, PrefixOrigin
~~~

~~~text الناتج
IPAddress    : 192.168.1.65
PrefixLength : 24
PrefixOrigin : Dhcp
~~~

[[PrefixOrigin : Dhcp]] يعني العنوان جاي من الراوتر. وبعد الـ IP الثابت المفروض تبقى [[Manual]].

---

## ١. [[$if = "Ethernet"]]

اسم الكارت في متغير، عشان تكتبه مرة واحدة. ونسميه [[$if]] (اختصار interface). الاسم لازم يبقى زي عمود [[Name]] في [[Get-NetAdapter]] بالظبط.

## ٢. [[Set-NetIPInterface -InterfaceAlias $if -Dhcp Disabled]]

بيقفل الـ DHCP على الكارت. وبـ [[-WhatIf]] على كارت Ethernet:

~~~text الناتج
What if: Performing operation "Set" on Target "NetIPInterface -InterfaceIndex 17 -AddressFamily IPv4 -Store Active"
What if: Performing operation "Set" on Target "NetIPInterface -InterfaceIndex 17 -AddressFamily IPv6 -Store Active"
~~~

لاحظ إنه هيغيّر **IPv4 و IPv6 الاتنين** لأننا مكتبناش [[-AddressFamily]]. ولو عايز IPv4 بس زوّد [[-AddressFamily IPv4]].

## ٣. [[Remove-NetIPAddress ... -AddressFamily IPv4 -Confirm:$false -ErrorAction SilentlyContinue]]

بيمسح أي عنوان IPv4 قديم على الكارت.

| الحتة | ليه |
|---|---|
| [[-AddressFamily IPv4]] | متلمسش عناوين IPv6 |
| [[-Confirm:$false]] | متسألنيش «Are you sure» |
| [[-ErrorAction SilentlyContinue]] | لو مفيش عنوان، متطلّعش error |

من غير السطر ده، لو فيه عنوان قديم متساب، [[New-NetIPAddress]] ممكن يرفض. ولما مفيش حاجة تتمسح بيطلع error زي ده (جبته بـ [[Get-NetIPAddress]] على عنوان مش موجود، و Remove بيدوّر بنفس الطريقة)، و [[SilentlyContinue]] بيخفيه:

~~~text الناتج
No matching MSFT_NetIPAddress objects found by CIM query ...
~~~

## ٤. [[Remove-NetRoute ... -DestinationPrefix 0.0.0.0/0 ...]]

بيمسح الـ **gateway القديم**. الـ gateway متخزن كـ route لـ [[0.0.0.0/0]] (أي عنوان، يعني النت). بـ [[-WhatIf]] على الواي فاي:

~~~text الناتج
What if: Performing operation "Remove" on Target "NetRoute -DestinationPrefix 0.0.0.0/0 -InterfaceIndex 13 -NextHop 192.168.1.1 -Store Active"
~~~

## ٥. [[New-NetIPAddress -InterfaceAlias $if -IPAddress 192.168.1.50 -PrefixLength 24 -DefaultGateway 192.168.1.1]]

القلب:

| الحتة | معناها |
|---|---|
| [[-IPAddress 192.168.1.50]] | العنوان الجديد |
| [[-PrefixLength 24]] | حجم الشبكة (تحت) |
| [[-DefaultGateway 192.168.1.1]] | الراوتر |

### [[-PrefixLength 24]] يعني إيه؟

العنوان ٤ أرقام، كل رقم ٨ bits، يعني ٣٢ bit. و 24 معناها «أول 24 bit للشبكة، والباقي (8) للجهاز»:

~~~text PrefixLength 24
192 . 168 . 1   .   50
 شبكة (24 bit)      جهاز (8 bit)
subnet mask:  255.255.255.0
~~~

فكل الأجهزة في الشبكة دي بتبدأ بـ 192.168.1، وفيه مكان لحوالي 254 جهاز (1 لـ 254). وعشان كده الـ gateway لازم يبدأ بنفس الـ 3 أرقام.

### بـ [[-WhatIf]]

~~~text الناتج
What if: Performing operation "New" on Target "NetIPAddress -IPv4Address 192.168.1.50 -InterfaceIndex 17 -Store Active"
What if: Performing operation "New" on Target "NetRoute -DestinationPrefix 0.0.0.0/0 -InterfaceIndex 17 -NextHop 192.168.1.1 -Store Active"
What if: Performing operation "New" on Target "NetIPAddress -IPv4Address 192.168.1.50 -InterfaceIndex 17 -Store Persistent"
What if: Performing operation "New" on Target "NetRoute -DestinationPrefix 0.0.0.0/0 -InterfaceIndex 17 -NextHop 192.168.1.1 -Store Persistent"
~~~

أمر واحد = ٤ حاجات: العنوان والـ route، وكل واحد في مكانين: [[Active]] (الشغال دلوقتي) و [[Persistent]] (المحفوظ اللي بيرجع بعد restart). و [[-DefaultGateway]] هو اللي عمل الـ route لـ [[0.0.0.0/0]].

## ٦. [[Set-DnsClientServerAddress -InterfaceAlias $if -ServerAddresses 1.1.1.1, 8.8.8.8]]

من غير DHCP محدش هيدّيك DNS، فبتحدده بنفسك (الدرس الجاي): Cloudflare و Google، والفاصلة بتعمل لستة.

## ٧. [[Get-NetIPConfiguration -InterfaceAlias $if]]

اتأكد: [[IPv4Address]] المفروض 192.168.1.50، و [[IPv4DefaultGateway]] 192.168.1.1، و [[DNSServer]] العنوانين.

---

## الرجوع لـ DHCP

| السطر | بيعمل إيه |
|---|---|
| [[Remove-NetIPAddress ...]] | امسح العنوان الثابت (من غير SilentlyContinue: لازم يبقى موجود) |
| [[Remove-NetRoute ...]] | امسح الـ gateway الثابت |
| [[Set-NetIPInterface ... -Dhcp Enabled]] | شغّل الـ DHCP |
| [[Set-DnsClientServerAddress ... -ResetServerAddresses]] | ارجع للـ DNS اللي جاي من الراوتر |

ليه تمسح الأول؟ لأن [[-Dhcp Enabled]] لوحده مش بيشيل العنوان والـ gateway الثابتين، فيفضلوا جنب اللي جاي من الراوتر.

---

## ملخص الخطوات

| الخطوة | الأمر | ليه |
|---|---|---|
| ١ | [[Set-NetIPInterface -Dhcp Disabled]] | اقفل الأوتوماتيك |
| ٢ | [[Remove-NetIPAddress]] | شيل العنوان القديم |
| ٣ | [[Remove-NetRoute]] | شيل الـ gateway القديم |
| ٤ | [[New-NetIPAddress]] | العنوان + الشبكة + الـ gateway |
| ٥ | [[Set-DnsClientServerAddress]] | DNS بإيدك |
| ٦ | [[Get-NetIPConfiguration]] | اتأكد |

> كل ده محتاج Terminal أدمن. ومن غير أدمن أي أمر تغيير بيطلع [[Access is denied.]]

## على الأنظمة التانية

على أوبونتو السيرفر الإعداد في ملف YAML جوه [[/etc/netplan/]] وبعدين [[sudo netplan apply]]، وعلى الماك [[networksetup -setmanual]]، ومن CMD في ويندوز [[netsh interface ip set address]] (درس في تاب «CMD»). (لينكس والماك من الـ docs.)

## الخلاصة

~~~text
PrefixLength 24   =  255.255.255.0   أول 3 أرقام للشبكة
اختار عنوان        في نفس الشبكة، وبره مدى الـ DHCP بتاع الراوتر
الثابت             Active + Persistent، يعني بيفضل بعد restart
الرجوع             امسح، وبعدين -Dhcp Enabled و -ResetServerAddresses
~~~`,
          lines: [
            "اسم الكارت في متغير.",
            "اقفل الـ DHCP على الكارت ده.",
            "امسح أي عنوان IPv4 قديم عليه، ومن غير error لو مفيش.",
            "امسح الـ gateway القديم (الـ default route).",
            "حط العنوان الثابت، و 24 يعني 255.255.255.0، والراوتر gateway.",
            "حدد الـ DNS بنفسك، لأن مفيش DHCP يدّيه.",
            "اتأكد: العنوان والـ gateway والـ DNS.",
            "الرجوع: امسح العنوان الثابت.",
            "وامسح الـ gateway الثابت.",
            "شغّل الـ DHCP تاني.",
            "ورجّع الـ DNS اللي جاي من الراوتر."
          ],
          sol: R`جربت أوامر العرض بس. [[Get-NetIPAddress -InterfaceAlias "Wi-Fi" -AddressFamily IPv4]] طلع [[IPAddress 192.168.1.2]] و [[PrefixLength 24]] و [[PrefixOrigin Dhcp]]، يعني العنوان جاي من الراوتر. و [[Get-NetIPInterface -InterfaceAlias "Wi-Fi" -AddressFamily IPv4]] طلع [[Dhcp Enabled]]. و [[Test-Connection 192.168.1.50 -Count 1 -Quiet]] رجع [[False]]، يعني محدش رد على العنوان ده (بس ممكن جهاز موجود ومقفول أو بيتجاهل الـ ping، فبص كمان على قايمة الأجهزة في صفحة الراوتر).

مغيّرتش العنوان على الجهاز وأنا بكتب الدرس، عشان ده كان هيقطع النت. شكل الأوامر من توثيق Microsoft لموديول NetTCPIP، وبعد New-NetIPAddress المفروض [[Get-NetIPConfiguration]] يطلع العنوان الجديد و [[IPv4DefaultGateway]] بالراوتر، و [[Get-NetIPAddress]] يطلع [[PrefixOrigin Manual]].`
        },
        {
          cmd: "Set-DnsClientServerAddress",
          title: "غيّر الـ DNS لـ 1.1.1.1 أو 8.8.8.8",
          desc: R`الـ DNS هو اللي بيحوّل أسامي المواقع لعناوين (درس Resolve-DnsName)، وجهازك بياخده من الراوتر، وغالبًا ده DNS مزوّد النت. [[Set-DnsClientServerAddress]] بيغيّره لسيرفرات انت تختارها على كارت معين، زي 1.1.1.1 (Cloudflare) أو 8.8.8.8 (Google)، و [[-ResetServerAddresses]] بيرجّعه للي جاي من الراوتر.

[[Get-DnsClientServerAddress]] بيعرض الـ DNS الحالي لكل كارت، و [[-AddressFamily IPv4]] من غير IPv6. و [[-InterfaceAlias "Wi-Fi"]] الكارت اللي هتغيّره. و [[-ServerAddresses]] لستة عناوين مفصولة بفاصلة: الأول الأساسي واللي بعده احتياطي، وينفع تحط IPv4 و IPv6 في نفس اللستة: [[2606:4700:4700::1111]] هو 1.1.1.1 بتاع IPv6، و [[2001:4860:4860::8888]] بتاع Google. لو شبكتك فيها IPv6 ومحطتلوش DNS، الجهاز ممكن يكمّل يسأل الراوتر عن طريق IPv6.

[[Clear-DnsClientCache]] بيمسح الردود القديمة المحفوظة عشان التغيير يبان على طول، و [[Resolve-DnsName example.com -Type A]] بيتأكد إن الأسامي لسه بتتحل. و [[Get-DnsClientDohServerAddress -ServerAddress 1.1.1.1]] بيوريك إن ويندوز يعرف عنوان DNS over HTTPS للسيرفر ده (تحت).

DNS over HTTPS (DoH): الـ DNS العادي بيمشي على الشبكة مكشوف، فأي حد في السكة (زي مزوّد النت) يشوف انت بتسأل عن أنهي مواقع. DoH بيشفّر السؤال، وويندوز 11 بيدعمه للسيرفرات المعروفة زي 1.1.1.1 و 8.8.8.8 و 9.9.9.9. أسهل تفعيل من Settings ← Network & internet ← الكارت ← DNS server assignment ← Edit ← DNS over HTTPS. والمتصفحات زي Chrome و Firefox فيها DoH خاص بيها كمان.

التغيير محتاج Terminal أدمن والعرض لأ، والأوامر ويندوز بس (5.1 و 7). ولو حطيت IP ثابت (الدرس اللي فات) لازم تحدد DNS بنفسك.`,
          example: R`Get-DnsClientServerAddress -AddressFamily IPv4
Set-DnsClientServerAddress -InterfaceAlias "Wi-Fi" -ServerAddresses 1.1.1.1, 8.8.8.8, 2606:4700:4700::1111, 2001:4860:4860::8888
Clear-DnsClientCache
Resolve-DnsName example.com -Type A
Get-DnsClientDohServerAddress -ServerAddress 1.1.1.1
Set-DnsClientServerAddress -InterfaceAlias "Wi-Fi" -ResetServerAddresses`,
          try: R`اعرف الـ DNS اللي جهازك بيستخدمه دلوقتي على IPv4 و IPv6 ([[Get-DnsClientServerAddress -InterfaceAlias "Wi-Fi"]])، وهل هو عنوان الراوتر ولا سيرفر عام.`,
          flag: "danger",
          deep: {
            why: R`DNS مزوّد النت ممكن يبقى بطيء أو بيقع، أو بيحجب مواقع، أو عايز DNS بيفلتر الإعلانات أو المواقع المؤذية لجهاز في البيت (Cloudflare فيه 1.1.1.3 بيمنع المحتوى اللي مش للأطفال). وأحيانًا بتشخّص «الموقع مش بيفتح» وعايز تشيل الراوتر من الحسبة.`,
            how: R`الـ DNS اللي بتحطه بالأمر ده ثابت (static): بيكسب على اللي جاي من الـ DHCP لحد ما تعمل Reset. ومحفوظ على الكارت، فاللابتوب هيفضل بنفس الـ DNS في أي شبكة يتوصل بيها. ده غالبًا كويس، بس شبكات الفنادق والمطارات اللي بتطلب «صفحة تسجيل دخول» ساعات بتعتمد على الـ DNS بتاعها، فالصفحة دي ممكن متظهرش.

ويندوز بيسأل أول سيرفر في اللستة، ولو مردش في وقت معين بيروح للي بعده. و [[-Validate]] بيتأكد إن العناوين بترد كـ DNS قبل ما يحطها. و [[Get-DnsClientCache]] بيعرض الردود اللي ويندوز حافظها.

التغيير بيأثر على كل البرامج، ما عدا اللي عاملة DNS خاص بيها: متصفح فيه DoH مفعّل، أو VPN بيحط DNS بتاعه وهو شغال.`,
            when: R`المواقع بطيئة في الفتح أو بتفشل أحيانًا والنت نفسه شغال، أو عايز فلترة على جهاز واحد، أو بتشخّص مشكلة DNS، أو حطيت IP ثابت.`,
            mistakes: R`تحط DNS لـ IPv4 بس وتنسى IPv6، فالجهاز يكمّل يسأل الراوتر. أو تختبر من غير [[Clear-DnsClientCache]] فتشوف الرد القديم وتفتكر التغيير مشتغلش. أو تحط DNS داخلي بتاع شغل أو VPN وتنساه، فلما تتنقل شبكة المواقع تقف. أو تغيّر الكارت الغلط (الـ DNS بيتحط لكل كارت لوحده).`
          },
          teach: R`## الأول: الـ DNS متظبط على كل كارت لوحده

كل كارت شبكة عنده لستة سيرفرات DNS يسألهم. المثال: اعرض اللستة، غيّرها، امسح الكاش، اتأكد إن الأسامي بتتحل، وشوف ويندوز يعرف DoH ولا لأ، وبعدين رجّع. العرض اتشغّل فعلًا على ويندوز 11 في PowerShell 7.6، والتغيير اتشغّل بـ [[-WhatIf]] بس.

---

## ١. [[Get-DnsClientServerAddress -AddressFamily IPv4]]

~~~text الناتج
InterfaceAlias               Interface Address ServerAddresses
                             Index     Family
--------------               --------- ------- ---------------
Ethernet 2                           9 IPv4    {8.8.8.8, 8.8.4.4}
Ethernet                            17 IPv4    {}
Wi-Fi                               13 IPv4    {8.8.8.8, 8.8.4.4, 192.168.1.1}
Loopback Pseudo-Interface 1          1 IPv4    {}
...
~~~

[[ServerAddresses]] اللستة بين [[{ }]]، بالترتيب. على الواي فاي: [[8.8.8.8]] الأول (Google)، وبعده [[8.8.4.4]] (Google التاني)، وبعده [[192.168.1.1]] الراوتر. و [[{}]] فاضية يعني الكارت ده ملوش DNS (مش متوصل).

ومن غير [[-AddressFamily]] بيطلع IPv6 كمان:

~~~powershell
Get-DnsClientServerAddress -InterfaceAlias "Wi-Fi"
~~~

~~~text الناتج
InterfaceAlias  Interface Address ServerAddresses
                Index     Family
--------------  --------- ------- ---------------
Wi-Fi                  13 IPv4    {8.8.8.8, 8.8.4.4, 192.168.1.1}
Wi-Fi                  13 IPv6    {fe80::1, fe80::1}
~~~

سطر IPv6 فيه [[fe80::1]] = الراوتر. يعني أي سؤال بيطلع على IPv6 بيروح للراوتر مش لـ Google. وده سبب إن المثال بيحط عناوين IPv6 كمان.

---

## ٢. [[Set-DnsClientServerAddress -InterfaceAlias "Wi-Fi" -ServerAddresses ...]]

| الحتة | معناها |
|---|---|
| [[-InterfaceAlias "Wi-Fi"]] | الكارت اللي هتغيّره |
| [[-ServerAddresses]] | اللستة الجديدة، مفصولة بفاصلة، والترتيب هو الأولوية |
| [[1.1.1.1]] | Cloudflare على IPv4 |
| [[8.8.8.8]] | Google على IPv4 |
| [[2606:4700:4700::1111]] | Cloudflare على IPv6 |
| [[2001:4860:4860::8888]] | Google على IPv6 |

### [[::]] في عناوين IPv6

عنوان IPv6 ٨ مجموعات hex بينهم [[:]]. و [[::]] اختصار لـ «كذا مجموعة كلها صفر». فـ [[2606:4700:4700::1111]] هو [[2606:4700:4700:0:0:0:0:1111]].

بـ [[-WhatIf]]:

~~~text الناتج
What if: Microsoft DNS Client settings will be changed as requested.
This will affect name resolutions on the adapter "Wi-Fi".
~~~

---

## ٣. [[Clear-DnsClientCache]]

الردود القديمة متخزنة لحد ما الـ TTL بتاعها يخلص (درس Resolve-DnsName). المسح بيخلي التغيير يبان على طول. مبيطبعش حاجة لما ينجح.

## ٤. [[Resolve-DnsName example.com -Type A]]

اتأكد إن الأسامي لسه بتتحل بعد التغيير:

~~~text الناتج
Name          Type   TTL   Section    IPAddress
----          ----   ---   -------    ---------
example.com   A      239   Answer     172.66.147.243
example.com   A      239   Answer     104.20.23.154
~~~

لو رجع [[DNS name does not exist]] أو timeout على موقع أكيد موجود، يبقى العناوين اللي حطيتها غلط.

## ٥. [[Get-DnsClientDohServerAddress -ServerAddress 1.1.1.1]]

**DoH** = DNS over HTTPS: السؤال بيتبعت مشفّر جوه HTTPS بدل ما يمشي مكشوف. الأمر بيسأل: ويندوز يعرف عنوان DoH لـ 1.1.1.1؟

~~~text الناتج
ServerAddress      : 1.1.1.1
AllowFallbackToUdp : False
AutoUpgrade        : False
DohTemplate        : https://cloudflare-dns.com/dns-query
~~~

| الخانة | معناها |
|---|---|
| [[DohTemplate]] | اللينك اللي هيتكلم معاه بالـ HTTPS |
| [[AutoUpgrade]] | False: لسه مش بيستخدم DoH لوحده، لازم تفعّله (من Settings) |
| [[AllowFallbackToUdp]] | False: لو DoH فشل، ميرجعش للـ DNS العادي المكشوف |

## ٦. [[-ResetServerAddresses]]

يرجّع اللستة للي جاي من الراوتر بالـ DHCP، ويمسح اللي انت حطيته.

---

## ملخص

| الأمر | أدمن؟ |
|---|---|
| [[Get-DnsClientServerAddress]] | لأ |
| [[Set-DnsClientServerAddress -ServerAddresses]] | أيوه |
| [[Clear-DnsClientCache]] | لأ (جربته من نافذة عادية) |
| [[Resolve-DnsName]] | لأ |
| [[Get-DnsClientDohServerAddress]] | لأ |
| [[-ResetServerAddresses]] | أيوه |

## على الأنظمة التانية

على أوبونتو [[resolvectl status]] بيعرض الـ DNS لكل كارت، والتغيير في netplan. وعلى الماك [[networksetup -getdnsservers Wi-Fi]] و [[-setdnsservers]]. (من الـ docs.)

## الخلاصة

~~~text
كل كارت ليه DNS لوحده، ولكل كارت IPv4 و IPv6
الترتيب = الأولوية
حط IPv6 كمان، وإلا الأسئلة على IPv6 تروح للراوتر
Clear-DnsClientCache بعد أي تغيير
~~~`,
          lines: [
            "الـ DNS الحالي لكل كارت (IPv4 بس).",
            "حط Cloudflare و Google، بعناوين IPv4 و IPv6 (أدمن).",
            "امسح الردود القديمة المحفوظة (أدمن).",
            "اتأكد إن الأسامي بتتحل.",
            "ويندوز يعرف عنوان DoH للسيرفر ده؟",
            "رجّع الـ DNS اللي جاي من الراوتر."
          ],
          sol: R`جربت العرض: [[Get-DnsClientServerAddress -InterfaceAlias "Wi-Fi"]] طلع سطرين: [[IPv4 {94.140.14.15, 94.140.15.16}]] ودي مش الراوتر، دي سيرفرات AdGuard DNS متحطوطة يدوي على الكارت، و [[IPv6 {fe80::1}]] وده عنوان الراوتر على IPv6. يعني بالظبط الغلطة اللي في «غلطات شائعة»: IPv4 بيروح لـ AdGuard، بس أي سؤال بيطلع على IPv6 بيروح للراوتر. وكارت [[Ethernet 2]] (VPN) كان عليه [[{8.8.8.8, 8.8.4.4}]].

و [[Resolve-DnsName example.com -Type A]] طلع سطرين [[A 300 Answer]] بعنوانين، و [[Get-DnsClientDohServerAddress -ServerAddress 1.1.1.1]] طلع [[DohTemplate : https://cloudflare-dns.com/dns-query]]، يعني ويندوز جاهز يكلّم 1.1.1.1 بالـ DoH لو فعّلته. (مغيّرتش الـ DNS على الجهاز وأنا بكتب الدرس.)`
        },
        {
          cmd: "New-NetFirewallRule",
          title: "افتح بورت في الفايروول (أو امنع برنامج من النت)",
          desc: R`فايروول ويندوز بيقفل أي اتصال جاي من بره لجهازك، إلا اللي ليه rule بتسمح بيه. [[New-NetFirewallRule]] بيعمل rule جديدة: تفتح بورت عشان موبايلك يفتح سيرفر التطوير (Vite على 5173 أو Next على 3000)، أو تمنع برنامج إنه يكلّم النت خالص.

[[-DisplayName]] اسم يظهر في القايمة، فاختار اسم واضح عشان تلاقيه وتمسحه بعدين. [[-Direction Inbound]] اتصالات داخلة لجهازك و [[Outbound]] خارجة منه. [[-Protocol TCP]] والبورتات على جهازك في [[-LocalPort 5173, 3000]] (فاصلة بين أكتر من واحد). [[-Action Allow]] اسمح و [[Block]] امنع. و [[-Profile Private]] الـ rule تشتغل بس لما الشبكة متعلّمة Private (البيت)، مش Public (الكافيه)، ودي أهم حتة. و [[-Program]] بدل البورت: الـ rule تمسك البرنامج ده بمساره الكامل.

[[Get-NetFirewallProfile]] بيعرض البروفايلات التلاتة (Domain و Private و Public) والفايروول شغال في كل واحد ولا لأ. و [[Get-NetFirewallRule -DisplayName "dev*"]] الـ rules اللي اسمها بيبدأ بـ dev (النجمة wildcard)، و [[Get-NetFirewallPortFilter]] بيطلّع البورتات اللي فيها. [[Disable-NetFirewallRule]] بيوقفها من غير ما يمسحها، و [[Remove-NetFirewallRule]] بيمسحها.

الإنشاء والتعديل محتاج Terminal أدمن والعرض لأ. الموديول [[NetSecurity]] جاي مع ويندوز وشغال في 5.1 و 7 (جربت العرض على 7.6). الشكل بالماوس في درس «wf.msc» في تاب «اختصارات النظام»، ومن CMD في درس «netsh advfirewall firewall» في تاب «CMD». وقبل الفايروول، السيرفر نفسه لازم يسمع على الشبكة مش على localhost بس (درس «--host و Network URL» في تاب «Node»).`,
          example: R`Get-NetFirewallProfile | Select-Object Name, Enabled
New-NetFirewallRule -DisplayName "dev server" -Direction Inbound -Protocol TCP -LocalPort 5173, 3000 -Action Allow -Profile Private
New-NetFirewallRule -DisplayName "block someapp" -Direction Outbound -Program "C:\Program Files\SomeApp\app.exe" -Action Block
Get-NetFirewallRule -DisplayName "dev*" | Get-NetFirewallPortFilter | Select-Object Protocol, LocalPort
Disable-NetFirewallRule -DisplayName "dev server"
Remove-NetFirewallRule -DisplayName "dev server"`,
          try: R`اعرف كام rule بتسمح بالدخول لجهازك وانت على شبكة عامة ([[Public]] أو [[Any]])، ودوّر فيهم على node و python.`,
          flag: "danger",
          deep: {
            why: R`الموبايل على نفس الواي فاي ومش بيفتح [[http://192.168.1.2:5173]]، أو بتشغّل API أو سيرفر لعبة على جهازك وعايز جهاز تاني يوصله، أو برنامج بيبعت بيانات وانت عايز تمنعه. بالماوس دي 7 شاشات في wf.msc، وبالأمر سطر تقدر تحطه في سكربت تجهيز الجهاز.`,
            how: R`الفايروول بيبص على كل اتصال: لو فيه rule [[Block]] بتنطبق عليه بيتمنع (الـ Block بتكسب على الـ Allow)، ولو فيه [[Allow]] بيعدّي، ولو مفيش بيطبّق الافتراضي: Block للداخل و Allow للخارج ([[Get-NetFirewallProfile -PolicyStore ActiveStore]] بيوريك [[DefaultInboundAction Block]] و [[DefaultOutboundAction Allow]]). عشان كده منع برنامج من النت محتاج rule [[Outbound]] Block صريحة.

أول مرة برنامج يسمع على بورت، ويندوز بيطلّع نافذة «Allow access» وبيعمل rule باسم البرنامج على نوع الشبكة اللي وافقت عليه. عندي لقيت rules اسمها [[Node.js JavaScript Runtime]] و [[python.exe]] بـ [[Allow]] على [[Public]]، يعني أي سيرفر node أو python بيسمع على 0.0.0.0 مفتوح لأي حد معاك في الكافيه. [[Set-NetFirewallRule -DisplayName "Node.js JavaScript Runtime" -Profile Private]] بيقصرها على البيت.

[[-RemoteAddress LocalSubnet]] بيخلي الـ rule للأجهزة اللي في نفس الشبكة بس، ودي طبقة أمان زيادة. و [[-Protocol UDP]] للبورتات اللي بتستخدم UDP (ألعاب، أو DNS). والـ rule بالـ [[-Program]] بتمسك المسار ده بالظبط، فلو البرنامج اتحدّث واتسطب في فولدر جديد فيه رقم النسخة، الـ rule مبقتش بتمسكه.`,
            when: R`تجرب موقعك من الموبايل، أو تفتح بورت لـ SSH أو مشاركة ملفات على جهاز في البيت، أو تمنع برنامج من النت، أو تراجع إيه المفتوح على الشبكات العامة.`,
            mistakes: R`تفتح البورت من غير [[-Profile Private]] فيفضل مفتوح على أي واي فاي عام. أو تعمل rule لـ Private والشبكة نفسها متعلّمة Public (الدرس الجاي) فمتشتغلش. أو تقفل الفايروول كله ([[Set-NetFirewallProfile -Enabled False]]) «للتجربة» وتنسى. أو تعمل كذا rule بنفس الـ DisplayName، فـ Remove بالاسم بيمسحهم كلهم. أو تفتكر rule الـ Outbound بتمنع البرنامج لو بيكلّم النت عن طريق برنامج تاني (updater منفصل بمسار تاني مثلًا).`
          },
          teach: R`## الأول: الفايروول بيسأل سؤال لكل اتصال

لكل اتصال داخل أو خارج، الفايروول بيدوّر على **rule** تنطبق عليه: لو لقى Block يمنعه، لو لقى Allow يعدّيه، ولو ملقاش حاجة يطبّق الافتراضي. المثال ٦ سطور: اعرض الحالة، اعمل rule تفتح بورت، rule تمنع برنامج، اعرض، وقّف، امسح.

العرض اتشغّل على ويندوز 11 في PowerShell 7.6 من غير أدمن. الإنشاء والتعديل مشغّلتهمش على الجهاز، فاتشغّلوا بـ [[-WhatIf]] أو من نافذة مش أدمن عشان تشوف الـ error.

---

## ١. [[Get-NetFirewallProfile | Select-Object Name, Enabled]]

~~~text الناتج
Name    Enabled
----    -------
Domain     True
Private    True
Public     True
~~~

الفايروول عنده **٣ بروفايلات**، وكل شبكة بتتوصل بيها متعلّمة واحد منهم (الدرس الجاي):

| البروفايل | إمتى |
|---|---|
| [[Domain]] | جهاز شركة متوصل بشبكة الشركة |
| [[Private]] | البيت أو مكان بتثق فيه |
| [[Public]] | كافيه، مطار، أي مكان عام |

و [[Enabled True]] يعني الفايروول شغال في التلاتة. والافتراضي لكل بروفايل:

~~~powershell
Get-NetFirewallProfile -PolicyStore ActiveStore | Select-Object Name, DefaultInboundAction, DefaultOutboundAction
~~~

~~~text الناتج
Name    DefaultInboundAction DefaultOutboundAction
----    -------------------- ---------------------
Domain                 Block                 Allow
Private                Block                 Allow
Public                 Block                 Allow
~~~

يعني: **الداخل ممنوع والخارج مسموح** إلا لو فيه rule. عشان كده فتح بورت محتاج rule [[Allow]] داخلة، ومنع برنامج محتاج rule [[Block]] خارجة.

---

## ٢. rule تفتح بورتات

~~~powershell
New-NetFirewallRule -DisplayName "dev server" -Direction Inbound -Protocol TCP -LocalPort 5173, 3000 -Action Allow -Profile Private
~~~

| الحتة | معناها |
|---|---|
| [[-DisplayName "dev server"]] | الاسم اللي هتلاقيها بيه وتمسحها بيه |
| [[-Direction Inbound]] | اتصالات **داخلة** لجهازك |
| [[-Protocol TCP]] | البروتوكول (المواقع و APIs كلها TCP) |
| [[-LocalPort 5173, 3000]] | البورتات على جهازك: 5173 بتاع Vite و 3000 بتاع Next/Express، والفاصلة لستة |
| [[-Action Allow]] | اسمح |
| [[-Profile Private]] | **على الشبكات الـ Private بس** |

[[-Profile Private]] أهم حتة: من غيرها البورت هيبقى مفتوح كمان وانت في الكافيه.

من نافذة مش أدمن (بإسم تجربة وبورت تاني):

~~~text الناتج
Access is denied.
~~~

---

## ٣. rule تمنع برنامج

~~~powershell
New-NetFirewallRule -DisplayName "block someapp" -Direction Outbound -Program "C:\Program Files\SomeApp\app.exe" -Action Block
~~~

الفرق: [[-Direction Outbound]] (خارج من جهازك)، و [[-Program]] بدل البورت: المسار **الكامل** لملف البرنامج، و [[-Action Block]]. ومن غير [[-Profile]] الـ rule بتشتغل على التلاتة. و [[SomeApp]] اسم وهمي، حط مسار برنامج حقيقي.

---

## ٤. [[Get-NetFirewallRule -DisplayName "dev*" | Get-NetFirewallPortFilter | Select-Object Protocol, LocalPort]]

ليه أمرين؟ لأن الـ rule نفسها مفيهاش البورتات؛ البورتات في حاجة منفصلة اسمها **port filter** مربوطة بيها.

1. [[Get-NetFirewallRule -DisplayName "dev*"]]: الـ rules اللي اسمها بيبدأ بـ dev. النجمة [[*]] wildcard يعني «أي حاجة بعدها».
2. [[| Get-NetFirewallPortFilter]]: لكل rule هات الـ port filter بتاعها.
3. [[| Select-Object Protocol, LocalPort]]: عمودين.

معنديش rule اسمها dev (مشغّلتش سطر ٢)، فجربت نفس السلسلة على rules الـ node اللي ويندوز عاملها:

~~~powershell
Get-NetFirewallRule -DisplayName "Node.js*" | Get-NetFirewallPortFilter | Select-Object Protocol, LocalPort
~~~

~~~text الناتج
Protocol LocalPort
-------- ---------
TCP      Any
UDP      Any
~~~

[[Any]] يعني أي بورت: الـ rules دي ماسكة البرنامج كله مش بورت معيّن. وبعد سطر ٢ المفروض يطلع [[TCP]] و [[{5173, 3000}]].

---

## ٥ و ٦. وقّف وامسح

| السطر | الفرق |
|---|---|
| [[Disable-NetFirewallRule -DisplayName "dev server"]] | الـ rule موجودة بس مش شغالة، ترجّعها بـ [[Enable-NetFirewallRule]] |
| [[Remove-NetFirewallRule -DisplayName "dev server"]] | راحت خالص |

---

## الحل (solCode)

~~~powershell
(Get-NetFirewallRule -Direction Inbound -Action Allow -Enabled True | Where-Object { $_.Profile -match "Public|Any" }).Count
~~~

من جوه لبرة:

1. [[Get-NetFirewallRule -Direction Inbound -Action Allow -Enabled True]]: الـ rules الداخلة اللي بتسمح وشغالة.
2. [[Where-Object { $_.Profile -match "Public|Any" }]]: [[$_]] الـ rule الحالية، و [[-match]] بيدوّر بـ regex، و [[|]] جوه الـ regex معناها «أو». فبيمسك [[Public]] و [[Any]] و [[Private, Public]].
3. [[( ).Count]]: عددهم.

~~~text الناتج
161
~~~

والسطر التاني:

~~~text الناتج
DisplayName                Direction Profile Action
-----------                --------- ------- ------
Node.js JavaScript Runtime   Inbound  Public  Allow
Node.js JavaScript Runtime   Inbound  Public  Allow
python.exe                   Inbound  Public  Allow
python.exe                   Inbound  Public  Allow
~~~

مرتين لكل واحد: واحدة TCP وواحدة UDP (زي ما شفنا في الـ port filter). و [[Public]] معناها إن node و python مسموحلهم يستقبلوا اتصالات حتى في الكافيه.

---

## ملخص

| عايز | الأمر |
|---|---|
| الفايروول شغال؟ | [[Get-NetFirewallProfile]] |
| افتح بورت | [[New-NetFirewallRule -Direction Inbound -LocalPort ... -Action Allow -Profile Private]] |
| امنع برنامج | [[New-NetFirewallRule -Direction Outbound -Program ... -Action Block]] |
| البورتات | [[Get-NetFirewallRule ...]] ثم [[Get-NetFirewallPortFilter]] |
| وقّف / امسح | [[Disable-NetFirewallRule]] / [[Remove-NetFirewallRule]] |

## على الأنظمة التانية

على أوبونتو [[sudo ufw allow 3000/tcp]] و [[sudo ufw status]]. والماك فايروول التطبيقات بتاعه من System Settings أو [[socketfilterfw]]. (من الـ docs.)

## الخلاصة

~~~text
الافتراضي      الداخل Block، والخارج Allow
فتح بورت       Inbound + Allow + -Profile Private
منع برنامج     Outbound + -Program + Block
Block بتكسب على Allow
~~~`,
          lines: [
            "الفايروول شغال في أنهي بروفايل؟",
            "اسمح بالدخول على 5173 و 3000 TCP، على الشبكات الـ Private بس (أدمن).",
            "امنع برنامج يكلّم النت: rule خارجة Block بمساره (أدمن).",
            "الـ rules اللي اسمها بيبدأ بـ dev، والبورتات اللي فيها.",
            "وقّف الـ rule من غير ما تمسحها.",
            "امسحها."
          ],
          sol: R`الحل في الـ solCode، وجربته من غير أدمن (العرض مش محتاج). [[Get-NetFirewallProfile]] طلع التلاتة [[Enabled True]]. والعد طلع [[158]] rule بتسمح بالدخول وهي شغالة على Public أو Any، وأغلبها بتاعة ويندوز نفسه (Core Networking و Cast to Device). والسطر التاني طلع [[Node.js JavaScript Runtime  Inbound  Public  Allow]] مرتين (واحدة TCP وواحدة UDP)، و [[python.exe  Inbound  Public  Allow]] مرتين، ودول اتعملوا من نافذة «Allow access» أول مرة شغّلت سيرفر.

[[-match "Public|Any"]] بيمسك القيم زي [[Public]] و [[Any]] و [[Private, Public]]، لأن Profile ممكن يبقى أكتر من نوع. ولو عايز تقصر rule node على البيت: [[Set-NetFirewallRule -DisplayName "Node.js JavaScript Runtime" -Profile Private]] من Terminal أدمن (معملتهاش هنا).`,
          solCode: R`(Get-NetFirewallRule -Direction Inbound -Action Allow -Enabled True | Where-Object { $_.Profile -match "Public|Any" }).Count
Get-NetFirewallRule -DisplayName "Node.js*", "Python*" | Select-Object DisplayName, Direction, Profile, Action`
        },
        {
          cmd: "Set-NetConnectionProfile",
          title: "الشبكة Public ولا Private؟",
          desc: R`ويندوز بيعلّم كل شبكة بتتوصل بيها يا [[Public]] (مكان عام: الجهاز مستخبّي ومش بيشارك حاجة) يا [[Private]] (البيت أو الشغل: الجهاز بيظهر للأجهزة التانية وينفع يشارك ملفات وطابعات لو فعّلت ده). [[Get-NetConnectionProfile]] بيقولك الشبكة الحالية نوعها إيه، و [[Set-NetConnectionProfile]] بيغيّره.

أعمدة Get-NetConnectionProfile: [[Name]] اسم الشبكة (غالبًا اسم الواي فاي)، و [[InterfaceAlias]] الكارت، و [[NetworkCategory]] النوع، و [[IPv4Connectivity]] ([[Internet]] فيه نت، و [[LocalNetwork]] شبكة من غير نت). في Set: [[-InterfaceAlias "Wi-Fi"]] الشبكة اللي على الكارت ده، و [[-NetworkCategory Private]] النوع الجديد، أو [[-Name]] اسم الشبكة بدل الكارت. والنوع التالت [[DomainAuthenticated]] بيتحط لوحده لما الجهاز يبقى في domain شركة، ومينفعش تحطه بالأمر ده.

ليه مهم: الفايروول ليه 3 بروفايلات بنفس الأسامي، وكل rule بتشتغل على بروفايل (الدرس اللي فات). فلو شبكة البيت متعلّمة Public: الموبايل مش هيوصل لسيرفر التطوير حتى لو عملت rule بـ [[-Profile Private]]، ومشاركة الملفات (درس New-SmbShare) مش هتشتغل، و [[Enable-PSRemoting]] هيرفض. والعكس أخطر: شبكة كافيه متعلّمة Private يعني جهازك بيعلن عن نفسه لأي حد قاعد هناك.

التغيير محتاج Terminal أدمن، وبيتحفظ للشبكة دي بالاسم، فالمرة الجاية لما تتوصل بيها هتبقى Private. وبالماوس: Settings ← Network & internet ← Wi-Fi ← اسم الشبكة ← Network profile type. والأوامر ويندوز بس (5.1 و 7).`,
          example: R`Get-NetConnectionProfile
Get-NetConnectionProfile | Select-Object Name, InterfaceAlias, NetworkCategory
Set-NetConnectionProfile -InterfaceAlias "Wi-Fi" -NetworkCategory Private
Set-NetConnectionProfile -Name "Cafe WiFi" -NetworkCategory Public`,
          try: R`اعرف شبكتك الحالية Public ولا Private. ولو دي شبكة بيتك وعايز تفتح موقعك من الموبايل، غيّرها لـ Private من Terminal أدمن.`,
          flag: "danger",
          deep: {
            why: R`من أشهر أسباب «الموبايل مش بيفتح سيرفر التطوير» و «مش شايف الجهاز التاني على الشبكة»: ويندوز معلّم شبكة البيت Public، لأن أول مرة اتوصلت بيها اخترت (أو اتختار لك) إن الجهاز ميبانش. والأمر ده بيصلّحها في سطر.`,
            how: R`كل شبكة بتتوصل بيها ويندوز بيعملها profile محفوظ باسمها. [[Get-NetConnectionProfile]] بيعرض الشبكات المتوصلة دلوقتي بس، مش القديمة. وويندوز 11 بيخلي أي شبكة جديدة Public افتراضيًا، وده الأأمن.

لما النوع يتغير، الفايروول بيبدأ يطبّق بروفايل النوع الجديد على الكارت ده على طول، فالـ rules بتاعة Private تبدأ تشتغل. وظهور جهازك في Network في Explorer (Network discovery) ليه rules في الفايروول في جروب اسمه [[Network Discovery]]، وبيتفعّل للـ Private من Settings ← Network & internet ← Advanced network settings ← Advanced sharing settings.

لو الشبكة مش راضية تتغير، ممكن تكون Group Policy (جهاز شغل) أو برنامج VPN أو antivirus بيتحكم فيها.`,
            when: R`أول ما تتوصل بشبكة البيت أو الشغل وعايز تشارك ملفات أو توصل لجهازك من جهاز تاني، وكل ما تقعد على شبكة عامة اتأكد إنها Public.`,
            mistakes: R`تخلي كل الشبكات Private عشان «الحاجات تشتغل»، فجهازك يبقى مكشوف في أي مكان عام. أو تغيّر الكارت الغلط لو عندك Ethernet و Wi-Fi متوصلين. أو تفتكر Private معناها إن الشبكة آمنة أو متشفّرة: دي بس بتقول للفايروول يسمح بحاجات أكتر. أو تستغرب إن الإعداد «رجع»: شبكة الـ 5GHz من نفس الراوتر اسمها مختلف، فليها profile لوحدها.`
          },
          teach: R`## الأول: كل شبكة ليها نوع

ويندوز بيدّي كل شبكة متوصل بيها نوع: [[Public]] أو [[Private]] (أو [[DomainAuthenticated]] في الشركات). والنوع ده هو اللي بيقرر أنهي بروفايل فايروول يشتغل (الدرس اللي فات). المثال: اعرض النوع، اعرضه مختصر، غيّره بالكارت، وغيّره بالاسم. العرض اتشغّل على ويندوز 11 في PowerShell 7.6، والتغيير جربته من نافذة مش أدمن عشان تشوف الـ error.

---

## ١. [[Get-NetConnectionProfile]]

~~~text الناتج
Name                     : HomeWiFi
InterfaceAlias           : Wi-Fi
InterfaceIndex           : 13
NetworkCategory          : Public
DomainAuthenticationKind : None
IPv4Connectivity         : Internet
IPv6Connectivity         : NoTraffic
~~~

(غيّرت اسم الشبكة لـ HomeWiFi.)

| الخانة | معناها |
|---|---|
| [[Name]] | اسم الشبكة، غالبًا اسم الواي فاي |
| [[InterfaceAlias]] | الكارت المتوصل بيها |
| [[NetworkCategory]] | **النوع**. هنا [[Public]] رغم إنها شبكة البيت |
| [[DomainAuthenticationKind]] | [[None]] يعني مش domain شركة |
| [[IPv4Connectivity]] | [[Internet]] فيه نت. و [[LocalNetwork]] شبكة من غير نت |
| [[IPv6Connectivity]] | [[NoTraffic]] الشبكة مش بتستخدم IPv6 |

بيعرض الشبكات المتوصلة **دلوقتي** بس، مش كل اللي اتوصلت بيها قبل كده.

## ٢. [[Get-NetConnectionProfile | Select-Object Name, InterfaceAlias, NetworkCategory]]

~~~text الناتج
Name      InterfaceAlias NetworkCategory
----      -------------- ---------------
HomeWiFi  Wi-Fi                   Public
~~~

نفس الكلام في سطر. ولو كابل وواي فاي متوصلين هتلاقي سطرين، كل شبكة بنوعها.

---

## ٣. [[Set-NetConnectionProfile -InterfaceAlias "Wi-Fi" -NetworkCategory Private]]

- [[-InterfaceAlias "Wi-Fi"]]: الشبكة اللي على الكارت ده.
- [[-NetworkCategory Private]]: النوع الجديد.

من نافذة مش أدمن طلع:

~~~text الناتج
Unable to set the NetworkCategory due to one of the following possible reasons: not running PowerShell elevated; the NetworkCategory cannot be changed from 'DomainAuthenticated'; user initiated changes to NetworkCategory are being prevented due to the Group Policy setting 'Network List Manager Policies'.
~~~

الرسالة نفسها بتقولك الأسباب التلاتة: مش أدمن (ده سببنا)، أو الشبكة domain، أو Group Policy (جهاز شغل) مانعة. ومن Terminal أدمن المفروض يرجع من غير ناتج، و [[Get-NetConnectionProfile]] يطلع [[Private]] على طول (من توثيق Microsoft، مغيّرتش النوع هنا).

## ٤. [[Set-NetConnectionProfile -Name "Cafe WiFi" -NetworkCategory Public]]

نفس الأمر بس بـ [[-Name]]: اسم الشبكة بدل الكارت. [["Cafe WiFi"]] اسم مثال، والشبكة لازم تكون متوصلة دلوقتي.

---

## النوع بيغيّر إيه بالظبط

| | Public | Private |
|---|---|---|
| بروفايل الفايروول | Public | Private |
| rule معمولة بـ [[-Profile Private]] | **مش شغالة** | شغالة |
| جهازك بيظهر للأجهزة التانية | لأ | لو فعّلت Network discovery |
| مشاركة ملفات وطابعات | لأ | ممكن |

وعشان كده الشبكة هنا [[Public]] معناها: أي rule عملتها بـ [[-Profile Private]] عشان الموبايل يفتح سيرفر التطوير مش هتشتغل لحد ما تغيّر النوع.

## على الأنظمة التانية

مفيش مقابل مباشر: لينكس والماك مفيهمش «نوع شبكة» بالشكل ده. أقرب حاجة على لينكس [[firewalld]] و «zones» (زي public و home) بتربط كل كارت بـ zone. (من الـ docs.)

## الخلاصة

~~~text
NetworkCategory   Public أو Private
Public            الأأمن، والافتراضي لأي شبكة جديدة في ويندوز 11
Private           للبيت بس، والـ rules بتاعة Private بتشتغل
التغيير            أدمن، وبيتحفظ للشبكة دي بالاسم
~~~`,
          lines: [
            "الشبكة المتوصلة دلوقتي وكل تفاصيلها.",
            "الاسم والكارت والنوع بس.",
            "خلي شبكة الواي فاي الحالية Private (أدمن).",
            "خلي شبكة باسمها Public (أدمن)."
          ],
          sol: R`جربت العرض: [[Get-NetConnectionProfile]] طلع [[InterfaceAlias : Wi-Fi]] و [[NetworkCategory : Public]] و [[IPv4Connectivity : Internet]] و [[IPv6Connectivity : NoTraffic]] (والـ Name اسم الواي فاي). يعني رغم إنها شبكة البيت، ويندوز معتبرها Public، فأي rule معمولة بـ [[-Profile Private]] مش بتشتغل عليها لحد ما تتغير. وغالبًا ده كمان سبب إن rules زي node اللي في الدرس اللي فات اتعملت على Public: نافذة «Allow access» بتعمل الـ rule لنوع الشبكة اللي انت عليه.

مغيّرتش النوع وأنا بكتب الدرس. بعد [[Set-NetConnectionProfile -InterfaceAlias "Wi-Fi" -NetworkCategory Private]] من Terminal أدمن، [[Get-NetConnectionProfile]] المفروض يطلع [[NetworkCategory : Private]] على طول من غير restart.`
        }
      ]
    }
]);
