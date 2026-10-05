// تكملة تاب ps: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/ps/01.js (شرح حقول الدرس في أوله)
MORE("ps", [
    {
      t: "الأجهزة اللي معاك على الشبكة",
      l: 3,
      n: R`تعرف مين متوصل على شبكة بيتك، وتصحّي جهاز مقفول، وتشارك فولدر، وتشغّل أوامر على جهاز تاني أو تدخله بـ SSH أو تعمله restart. كله على شبكتك انت أو بإذن صاحبها، وأغلبه محتاج أدمن على الجهازين`,
      items: [
        {
          cmd: "Get-NetNeighbor + ping sweep",
          title: "مين متوصل معاك على الشبكة؟",
          desc: R`عايز تعرف الأجهزة اللي على شبكة البيت (الراوتر، والموبايلات، والطابعة، والتليفزيون)؟ المثال بيعمل «ping sweep»: بيبعت ping لكل العناوين من .1 لـ .254 في نفس الوقت واللي يرد يبقى موجود، وبعدين جدول الـ neighbors بيدّيك الـ MAC بتاع كل جهاز، و DNS بيحاول يجيب اسمه. استخدمه على شبكتك انت بس، أو بإذن صاحب الشبكة: فحص شبكة حد تاني من غير إذن ممكن يتعتبر تعدّي، وفي شبكات الشغل والجامعة غالبًا ممنوع.

[[Get-NetIPConfiguration | Where-Object IPv4DefaultGateway]] الكارت اللي عليه gateway (اتصالك الحقيقي)، و [[.IPv4Address.IPAddress]] عنوانك. و [[-replace '\.\d+$', '']] بيشيل آخر رقم: [[\.]] نقطة، و [[\d+]] رقم أو أكتر، و [[$]] آخر النص، فـ 192.168.1.2 تبقى 192.168.1. وده بيفترض إن الشبكة /24 زي أغلب شبكات البيوت (درس «New-NetIPAddress (static IP)»).

[[ForEach-Object -Parallel { ... } -ThrottleLimit 64]] بيشغّل البلوك على 64 عنوان في نفس الوقت بدل واحد ورا التاني، وده في PowerShell 7 بس. جوه البلوك المتغيرات اللي بره مش ظاهرة، و [[$using:prefix]] بيجيب قيمتها. و [[Test-Connection -Count 1 -TimeoutSeconds 1 -Quiet]] ping واحد بيستنى ثانية بالكتير ويرجّع True أو False بس. و [[Sort-Object { [version]$_ }]] بيرتّب العناوين كأرقام، ومن غيره 192.168.1.10 تيجي قبل 192.168.1.2.

[[Get-NetNeighbor]] هو جدول الـ ARP، زي [[arp -a]] (درس «arp / route» في تاب «CMD»): الأجهزة اللي جهازك كلّمها قريب، و [[LinkLayerAddress]] الـ MAC بتاعها. و [[-State Reachable, Stale, Delay, Probe]] الحالات اللي وراها جهاز حقيقي، و [[Where-Object IPAddress -like "$prefix.*"]] شبكتك بس من غير شبكة WSL. و [[[System.Net.Dns]::GetHostEntry($ip).HostName]] بيسأل عن اسم الجهاز، و [[try { } catch { "?" }]] بيحط علامة استفهام لو ملوش اسم. و [[-f]] بيكتب السطر بتنسيق (درس «النصوص (strings)»)، و [[{0,-15}]] يعني القيمة الأولى في 15 خانة عشان العمود يتظبط.

في 5.1 مفيش [[-Parallel]] ولا [[-TimeoutSeconds]]، والبديل اللي اشتغل معايا في الـ solCode. ودرس «ping -a و nbtstat -A» في تاب «CMD» بيكمّل الحكاية بأدوات ويندوز القديمة.`,
          example: R`$myIp = (Get-NetIPConfiguration | Where-Object IPv4DefaultGateway | Select-Object -First 1).IPv4Address.IPAddress
$prefix = $myIp -replace '\.\d+$', ''
$alive = 1..254 | ForEach-Object -Parallel { $ip = "$using:prefix.$_"; if (Test-Connection $ip -Count 1 -TimeoutSeconds 1 -Quiet) { $ip } } -ThrottleLimit 64
$alive = $alive | Sort-Object { [version]$_ }
$alive
Get-NetNeighbor -AddressFamily IPv4 -State Reachable, Stale, Delay, Probe | Where-Object IPAddress -like "$prefix.*" | Select-Object IPAddress, LinkLayerAddress, State
foreach ($ip in $alive) { $name = try { [System.Net.Dns]::GetHostEntry($ip).HostName } catch { "?" }; "{0,-15} {1}" -f $ip, $name }`,
          try: R`شغّل المثال على شبكة بيتك، وطابق كل عنوان على جهاز تعرفه (موبايلك، التليفزيون، الطابعة). في جهاز مش عارفه؟ قارن الـ MAC بقايمة الأجهزة في صفحة الراوتر.`,
          deep: {
            why: R`عايز تعرف IP الطابعة أو الـ Raspberry Pi أو التليفزيون عشان توصل له، أو شاكك إن حد غريب على الواي فاي، أو بتتأكد إن جهاز اتوصل بالشبكة بعد ما شغّلته. ومن غير ما تسطّب برامج مسح شبكات.`,
            how: R`الـ ping مش دليل كامل: أجهزة كتير (ويندوز بفايروول على Public، وموبايلات نايمة) مش بترد على ping. بس أي جهاز بيرد أو حتى بيتكلم بعد ما بعتّله، جهازك بيعرف الـ MAC بتاعه وبيحطه في جدول الـ neighbors، فالجدول بيلقط أجهزة أحيانًا الـ ping مقالش عليها.

أول 3 بايتات في الـ MAC اسمها OUI وبتقول الشركة المصنّعة للكارت. مواقع زي macvendors بتترجمها: جربت [[Invoke-RestMethod https://api.macvendors.com/00-15-5D]] فرد [[Microsoft Corporation]] (ده prefix الكروت الافتراضية بتاعة Hyper-V). وخلي بالك إنك كده بتبعت أول 3 بايتات لموقع بره. لكن الموبايلات الحديثة بتستخدم MAC عشوائي لكل شبكة (Private Wi-Fi address): لو تاني حرف في الـ MAC واحد من 2 أو 6 أو A أو E، يبقى عشوائي ومش هيترجم لشركة.

الأسامي: [[GetHostEntry]] بيسأل DNS الراوتر (كتير من الراوترات بتسجّل أسامي الأجهزة اللي أخدت منه IP، وبتزوّد لاحقة زي .home أو .lan)، وكمان بيبص في ملف [[hosts]] (درس hosts). عشان كده ممكن يطلع اسم غلط، شوف الـ sol.

الـ sweep بيبعت 254 ping في ثواني، وده عادي على شبكة البيت. أدوات المسح الحقيقية (زي nmap) بتفحص بورتات كمان، ودي اللي محتاجة إذن صريح أكتر.`,
            when: R`تدوّر على IP جهاز في البيت، أو تراجع مين على الواي فاي، أو تتأكد إن جهاز جديد اتوصل، أو قبل ما تختار IP ثابت (عشان تعرف المستخدم).`,
            mistakes: R`تشغّله على شبكة مش بتاعتك. أو تفتكر إن الجهاز اللي مردش على ping مش موجود. أو تستخدم [[$_]] جوه [[catch]]: هناك [[$_]] بيبقى الـ error نفسه مش العنوان (عشان كده المثال بيلف بـ [[foreach ($ip in $alive)]]). أو تشغّل [[-Parallel]] على 5.1. أو تنسى [[$using:]] فالمتغير جوه البلوك يبقى فاضي ويعمل ping على «.1». أو تصدّق الاسم اللي جاي من reverse DNS من غير ما تتأكد.`
          },
          lines: [
            "عنوانك على الكارت اللي عليه gateway.",
            "شيل آخر رقم: 192.168.1.2 تبقى 192.168.1.",
            "ping لكل العناوين من 1 لـ 254، كل 64 مع بعض، واللي يرد يرجع في [[$alive]] (PowerShell 7).",
            "رتّبهم كأرقام مش كنصوص.",
            "اطبعهم.",
            "جدول الـ neighbors (ARP) لشبكتك بس: العنوان والـ MAC والحالة.",
            "لكل عنوان حي: هات اسمه من DNS أو «?»، واطبعه في عمودين."
          ],
          sol: R`جربته على شبكة بيتي بـ PowerShell 7.6: الـ sweep خد [[4.5]] ثانية وطلع 3 عناوين: [[192.168.1.1]] (الراوتر) و [[192.168.1.2]] (جهازي) و [[192.168.1.4]]. جدول الـ neighbors طلع الراوتر بـ MAC بيبدأ بـ [[D8-29-18]] والتالت بـ MAC بيبدأ بـ [[46-D5-D9]] وحالتهم [[Reachable]] (خبّيت باقي الـ MAC). و [[46]] تاني حرف فيها 6، يعني MAC عشوائي، غالبًا موبايل، و macvendors رد عليه [[Not Found]]. ومن غير فلتر [[$prefix]] الجدول كان طلع كمان جهاز [[172.29.x.x]] على شبكة WSL.

الأسامي فيها مفاجأة: الراوتر [[?]] (ملوش اسم)، وجهازي [[MYPC.home]] (اسم الجهاز ومعاه لاحقة الراوتر)، و [[192.168.1.4]] طلع [[host.docker.internal]]! ده مش اسم الموبايل: Docker Desktop كاتب في ملف hosts سطر [[192.168.1.4 host.docker.internal]] من وقت ما كان ده عنوان جهازي، والراوتر بعدين ادّى العنوان ده لموبايل. يعني اسم الـ reverse DNS ممكن ييجي من hosts ويكذب.

وفي 5.1 جربت الـ solCode: خلص في [[1.2]] ثانية وطلع نفس الـ 3 عناوين.`,
          solCode: R`$prefix = "192.168.1"
$tasks = 1..254 | ForEach-Object { [System.Net.NetworkInformation.Ping]::new().SendPingAsync("$prefix.$_", 1000) }
[System.Threading.Tasks.Task]::WaitAll($tasks)
$tasks | Where-Object { $_.Result.Status -eq "Success" } | ForEach-Object { $_.Result.Address.ToString() }`
        },
        {
          cmd: "Wake-on-LAN",
          title: "شغّل جهاز مقفول من على الشبكة",
          desc: R`Wake-on-LAN بيخليك تشغّل جهاز مقفول أو نايم من جهاز تاني على نفس الشبكة، عن طريق «magic packet»: رسالة صغيرة فيها الـ MAC بتاع الجهاز اللي عايز تصحّيه. كارت الشبكة بيفضل صاحي بطاقة قليلة، ولما يشوف الرسالة دي بيشغّل الجهاز. مفيش أمر جاهز في PowerShell، بس كام سطر .NET بيعملوها، وشغالين في 5.1 و 7 من غير أدمن.

[[$mac]] الـ MAC بتاع الجهاز اللي هيصحى (من [[Get-NetAdapter]] عليه، أو من صفحة الراوتر، أو من [[Get-NetNeighbor]] وهو شغال). [[-split '[-:]']] بيقطّعه عند الشرطة أو النقطتين، و [[[Convert]::ToByte($_, 16)]] بيحوّل كل جزء من hex (زي 5D) لرقم بايت.

الـ magic packet: [[@(0xFF) * 6]] ست بايتات كلها 255 ([[0xFF]] يعني 255 بالـ hex، و [[@( )]] بتعمله array، وضرب الـ array في رقم بيكرر عناصرها)، وبعدهم [[$macBytes * 16]] الـ MAC متكرر 16 مرة، و [[+]] بيلزق الاتنين، والمجموع 102 عنصر. اللستة نوعها [[Object[]]] مش bytes، بس PowerShell بيحوّلها لـ bytes لوحده وهو بيبعتها لـ [[.Send()]] (جربتها على 5.1 و 7).

[[System.Net.Sockets.UdpClient]] بيبعت رسالة UDP، و [[EnableBroadcast = $true]] بيسمح يبعت لكل الشبكة، و [[[System.Net.IPEndPoint]::new(...)]] العنوان والبورت: [[[System.Net.IPAddress]::Broadcast]] هو 255.255.255.255 (كل أجهزة الشبكة المحلية)، و 9 البورت المعتاد للـ WoL (أجهزة قليلة بتستخدم 7). و [[.Send()]] بيرجّع عدد البايتات اللي اتبعتت، و [[.Close()]] بيقفل. والسطر الأخير بيتشغّل على الجهاز اللي هيصحى عشان تتأكد إن الكارت مستعد.

لازم الجهاز اللي هيصحى يبقى جاهز: «Wake on LAN» أو «Power On by PCI-E» مفعّل في الـ BIOS، و «Wake on Magic Packet» مفعّل في إعدادات الكارت (Device Manager ← الكارت ← Advanced)، و «Allow this device to wake the computer» في تاب Power Management. و Fast Startup في ويندوز ممكن يمنع الصحيان بعد Shut down (من sleep و hibernate غالبًا شغال)، فلو مشتغلش اقفله من Control Panel ← Power Options ← Choose what the power buttons do. وعلى الكابل أضمن بكتير من الواي فاي، وعلى نفس الشبكة المحلية بس، لأن الراوتر مش بيعدّي broadcast جاي من النت.`,
          example: R`$mac = "00-11-22-33-44-55"
$macBytes = $mac -split '[-:]' | ForEach-Object { [Convert]::ToByte($_, 16) }
$packet = @(0xFF) * 6 + $macBytes * 16
$udp = [System.Net.Sockets.UdpClient]::new()
$udp.EnableBroadcast = $true
$udp.Send($packet, $packet.Count, [System.Net.IPEndPoint]::new([System.Net.IPAddress]::Broadcast, 9))
$udp.Close()
Get-NetAdapterAdvancedProperty -Name "Ethernet" | Where-Object DisplayName -like "*Wake*" | Select-Object DisplayName, DisplayValue`,
          try: R`على الجهاز اللي عايز تصحّيه: هات الـ MAC بتاع كارت الـ Ethernet واتأكد من إعدادات Wake. اقفله (Sleep الأول)، وابعتله الـ packet من جهاز تاني على نفس الشبكة. ولو لسه مش جاهز، جرّب الكود بـ MAC وهمي وشوف إنه بيبعت 102 بايت.`,
          deep: {
            why: R`جهاز مكتب أو سيرفر في البيت عايز توصله بـ SSH أو مشاركة ملفات، بس مش عايزه شغال 24 ساعة. أو جهاز في أوضة تانية. بالـ WoL تسيبه مقفول، وتصحّيه لما تحتاجه من لابتوبك أو من سكربت.`,
            how: R`الـ magic packet مش بيتبعت لجهاز بعينه، لأن الجهاز المقفول ملوش IP. بيتبعت broadcast لكل الشبكة، وكل كارت بيبص جواه: لو لقى الـ MAC بتاعه متكرر 16 مرة بعد الستة FF، بيصحّي الجهاز. عشان كده لازم الـ MAC مش الـ IP.

[[$udp.Send]] بيرجّع 102 حتى لو مفيش جهاز بالـ MAC ده خالص، لأن UDP مش بيستنى رد: نجاح الإرسال مش معناه إن جهاز صحي. اتأكد بـ ping بعد دقيقة.

لو الجهاز ورا Wi-Fi extender أو شبكة ضيوف معزولة، الـ broadcast ممكن ميوصلش. ساعتها ابعته لعنوان broadcast الشبكة بالظبط بدل 255.255.255.255، زي [[[System.Net.IPAddress]::Parse("192.168.1.255")]].

وفيه راوترات فيها زرار WoL جاهز في صفحتها، وده بيحل مشكلة «انا مش في البيت»: تدخل على الراوتر (بـ VPN مثلًا) وهو يبعت الـ packet جوه الشبكة.`,
            when: R`سيرفر أو جهاز ديسكتوب في البيت بتصحّيه وقت الحاجة، أو سكربت الصبح بيشغّل أجهزة معمل، مع درس Restart-Computer -ComputerName لما تخلص.`,
            mistakes: R`تكتب الـ MAC بتاع كارت الواي فاي والجهاز متوصل بكابل (أو العكس). أو تنسى الإعداد في الـ BIOS وتفتكر الكود غلط. أو Fast Startup شغال فالجهاز ميصحاش بعد Shut down. أو تحاول تبعته من النت لـ IP البيت. أو تفتكر إن [[.Send()]] رجّع 102 يبقى الجهاز صحي.`
          },
          lines: [
            "الـ MAC بتاع الجهاز اللي هيصحى (ده وهمي).",
            "قطّعه وحوّل كل جزء من hex لبايت.",
            "6 بايتات FF وبعدهم الـ MAC متكرر 16 مرة = 102 بايت.",
            "اعمل UDP client.",
            "اسمح بالـ broadcast.",
            "ابعت الـ packet لكل الشبكة على بورت 9، والناتج عدد البايتات.",
            "اقفل.",
            "على الجهاز اللي هيصحى: إعدادات الـ Wake في الكارت."
          ],
          sol: R`جربت الكود بالـ MAC الوهمي [[00-11-22-33-44-55]] على 7.6.6 و 5.1: [[.Send()]] رجّع [[102]] في الاتنين، وأول 12 بايت في الـ packet كانوا [[FF FF FF FF FF FF 00 11 22 33 44 55]]. ومفيش حاجة صحيت طبعًا، لأن مفيش جهاز بالـ MAC ده، ومفيش error برضه، لأن UDP مش بيستنى رد.

وعلى لابتوبي السطر الأخير طلع [[Wake on Magic Packet  Enabled]] و [[Wake on pattern match  Enabled]] و [[Wake on magic packet when system is in the S0ix power state  Disabled]] (يعني من Modern Standby مش هيصحى بالـ packet)، والواي فاي برضه [[Wake on Magic Packet Enabled]]. و Fast Startup كان شغال ([[HiberbootEnabled]] بـ 1 في [[HKLM:\SYSTEM\CurrentControlSet\Control\Session Manager\Power]])، فلو عايز تصحّيه بعد Shut down محتاج تقفله.`
        },
        {
          cmd: "New-SmbShare",
          title: "شارك فولدر على الشبكة",
          desc: R`[[New-SmbShare]] بيشارك فولدر على الشبكة، فأي جهاز ويندوز (أو ماك أو لينكس أو موبايل فيه تطبيق ملفات) يفتحه بالعنوان [[\\PC\Shared]]. ويندوز Home يقدر يشارك فولدرات عادي.

[[Get-SmbShare]] بيعرض الشيرات اللي على جهازك. و [[-Name "Shared"]] اسم الشير اللي هيظهر على الشبكة، و [[-Path]] الفولدر الحقيقي، و [[-FullAccess]] مين يقرا ويكتب ويمسح، و [[-ReadAccess]] مين يقرا بس (حسابات على الجهاز ده، بالشكل [[PC\name]]). و [[Enable-NetFirewallRule -Group "@FirewallAPI.dll,-28502"]] بيفتح قواعد «File and Printer Sharing» في الفايروول، والاسم الغريب ده هو اسم الجروب الثابت اللي بيشتغل على ويندوز بأي لغة (الاسم الإنجليزي بيتترجم).

من الجهاز التاني: [[Test-NetConnection PC -Port 445]] بيتأكد إن بورت المشاركة (SMB على 445) واصل. و [[New-SmbMapping -LocalPath S: -RemotePath \\PC\Shared -Persistent $true]] بيعمل drive اسمه S: بيفضل بعد الـ restart. أو بداله [[New-PSDrive -Persist]] بنفس الفكرة، و [[-PSProvider FileSystem]] نوع الـ drive، و [[-Credential (Get-Credential)]] بيسألك على يوزر وباسورد الجهاز اللي عليه الفولدر. و [[Remove-SmbShare -Force]] بيوقف المشاركة من غير سؤال، والفولدر وملفاته بيفضلوا.

الصلاحية الفعلية هي الأضيق من صلاحيات الشير وصلاحيات NTFS على الفولدر (درس Get-Acl / Set-Acl): لو الشير FullAccess والـ NTFS Read، اللي بيوصل Read. وعشان المشاركة تشتغل: الشبكة Private (درس Set-NetConnectionProfile) وقواعد الفايروول مفتوحة. ولو حساب الجهاز اللي عليه الفولدر Microsoft، بتدخل بالإيميل وباسورد الحساب (مش الـ PIN)، ولو الحساب من غير باسورد خالص الأسهل تعمل حساب local للمشاركة (درس Get-LocalUser / New-LocalUser).

الإنشاء والفايروول محتاجين Terminal أدمن. الموديول [[SmbShare]] جاي مع ويندوز وشغال في 5.1 و 7. والمقابل من CMD في درس «net share / net use» في تاب «CMD».`,
          example: R`Get-SmbShare
New-SmbShare -Name "Shared" -Path "D:\Shared" -FullAccess "PC\ali" -ReadAccess "PC\sara"
Enable-NetFirewallRule -Group "@FirewallAPI.dll,-28502"
# من الجهاز التاني:
Test-NetConnection PC -Port 445
New-SmbMapping -LocalPath S: -RemotePath \\PC\Shared -Persistent $true
New-PSDrive -Name S -PSProvider FileSystem -Root \\PC\Shared -Persist -Credential (Get-Credential)
# لما تخلص، على الجهاز اللي عليه الفولدر:
Remove-SmbShare -Name "Shared" -Force`,
          try: R`اعرض الشيرات اللي على جهازك دلوقتي (حتى لو عمرك ما شاركت حاجة)، واعرف قواعد File and Printer Sharing في الفايروول شغالة ولا لأ.`,
          flag: "danger",
          deep: {
            why: R`تنقل ملفات كبيرة بين جهازين في البيت من غير فلاشة ولا رفع على النت، أو فولدر مشترك للعيلة (صور، أفلام)، أو جهاز قديم بقى «سيرفر ملفات»، أو تسيب فولدر للبرامج على جهاز تاني يقرا منه.`,
            how: R`SMB هو البروتوكول اللي ويندوز بيشارك بيه الملفات والطابعات، على بورت 445. ويندوز بيعمل لوحده شيرات مخفية للإدارة: [[C$]] و [[D$]] (الديسكات كلها) و [[ADMIN$]] (فولدر ويندوز) و [[IPC$]]، والـ [[$]] في الآخر بتخفيها من القايمة، ومحدش يقدر يفتحها غير بحساب أدمن على الجهاز.

النسخة القديمة SMB1 فيها ثغرات اتستغلت في هجمات كبيرة، وهي مقفولة في ويندوز الحديث ([[Get-SmbServerConfiguration]] بيوريك [[EnableSMB1Protocol False]])، ومتفعّلهاش عشان جهاز قديم.

[[New-SmbMapping]] بيعمل الـ drive للجلسة اللي انت فيها. ولو عملته من Terminal أدمن، Explorer العادي مش هيشوفه، لأن ويندوز بيفصل الـ drives بين الجلسة الأدمن والعادية. فاعمل الـ mapping من Terminal عادي. وعلى ويندوز client الشير بيقبل عدد محدود من الاتصالات في نفس الوقت (حوالي 20)، كفاية للبيت.`,
            when: R`نقل ملفات بين أجهزة البيت، أو فولدر مشترك، أو backup من جهاز على جهاز تاني (robocopy في تاب CMD شغال على [[\\PC\Shared]] عادي).`,
            mistakes: R`تشارك الفولدر بـ [[Everyone]] و FullAccess. أو تشارك فولدر كبير زي C:\Users كله. أو تنسى إن الشبكة Public فمحدش يشوف حاجة. أو تعمل الـ mapping من Terminal أدمن وتدوّر عليه في Explorer. أو تفعّل SMB1 عشان جهاز قديم. أو تفتكر إن مسح الشير بيمسح الفولدر (مش بيمسحه).`
          },
          lines: [
            "الشيرات اللي على جهازك.",
            "شارك D:\\Shared: ali يقرا ويكتب، و sara تقرا بس (أدمن).",
            "افتح قواعد File and Printer Sharing في الفايروول (أدمن، الاسم ده شغال بأي لغة).",
            "بورت المشاركة واصل للجهاز التاني؟",
            "اعمل drive اسمه S: للشير، يفضل بعد الـ restart.",
            "أو بداله: نفس الـ drive بـ New-PSDrive وبيوزر وباسورد الجهاز التاني.",
            "وقّف المشاركة (الفولدر بيفضل)."
          ],
          sol: R`جربت العرض بس. [[Get-SmbShare]] طلع 5 شيرات من غير ما أشارك أي حاجة: [[ADMIN$  C:\WINDOWS  Remote Admin]] و [[C$]] و [[D$]] و [[E$]] بوصف [[Default share]] و [[IPC$  Remote IPC]]، ودول شيرات الإدارة المخفية. و قواعد الفايروول: [[Get-NetFirewallRule -Group "@FirewallAPI.dll,-28502"]] طلع 32 rule، كلهم [[Enabled False]]، يعني لو شاركت فولدر دلوقتي محدش هيوصله لحد ما تفتحهم. و [[Get-SmbServerConfiguration]] طلع [[EnableSMB1Protocol False]] و [[EnableSMB2Protocol True]].

(مشاركتش فولدر ولا فتحت الفايروول وأنا بكتب الدرس.) بعد [[New-SmbShare]] من Terminal أدمن، التوثيق بيقول إنه بيطبع الشير الجديد بـ Name و ScopeName و Path و Description، و [[Get-SmbShareAccess -Name "Shared"]] بيوريك مين ليه Full ومين Read.`,
          solCode: R`Get-SmbShare
Get-NetFirewallRule -Group "@FirewallAPI.dll,-28502" | Group-Object Enabled | Select-Object Name, Count`
        },
        {
          cmd: "Enter-PSSession / Invoke-Command",
          title: "شغّل أوامر على جهاز تاني (PowerShell remoting)",
          desc: R`PowerShell remoting بيخليك تفتح PowerShell على جهاز تاني على الشبكة كأنك قاعد قدامه ([[Enter-PSSession]])، أو تبعت أوامر لكذا جهاز مرة واحدة وترجعلك النتايج ([[Invoke-Command]]). في ويندوز ده بيمشي على خدمة WinRM (بورت 5985)، وفي PowerShell 7 كمان على SSH.

على الجهاز اللي هيستقبل، مرة واحدة من Terminal أدمن: [[Enable-PSRemoting -Force]] بيشغّل خدمة WinRM ويخليها تقوم مع ويندوز، ويعمل listener، ويفتح الفايروول للشبكات الـ Private، و [[-Force]] من غير أسئلة. ولو الشبكة Public بيرفض (درس Set-NetConnectionProfile). لو شغّلته من pwsh بيعمل endpoint اسمه [[PowerShell.7]]، ومن 5.1 بيفعّل [[Microsoft.PowerShell]] الافتراضي اللي بيشتغل بـ 5.1. والاتصال من غير ما تحدد بيروح للافتراضي، فلو فعّلت من pwsh بس، زوّد [[-ConfigurationName PowerShell.7]] على Enter-PSSession و Invoke-Command (أو شغّل Enable-PSRemoting من 5.1 كمان).

أجهزة البيت مش في domain، فلازم الجهاز اللي بيبعت يثق في الجهاز التاني بالاسم أو العنوان: [[Set-Item WSMan:\localhost\Client\TrustedHosts -Value "192.168.1.20" -Concatenate -Force]] (Terminal أدمن، على الجهاز اللي بيبعت)، و [[-Concatenate]] بيزوّد على اللستة بدل ما يمسحها، و [[-Force]] من غير سؤال. تحذير: [[-Value *]] (أي جهاز) اللي في شروحات كتير معناه إن جهازك هيبعت اليوزر والباسورد لأي جهاز بيدّعي إنه العنوان ده، فحط عناوين بعينها.

[[$cred = Get-Credential]] بيسألك على يوزر وباسورد أدمن على الجهاز التاني (زي [[PC2\admin]])، و [[Enter-PSSession -ComputerName 192.168.1.20 -Credential $cred]] بيقلب الـ prompt لـ [[[192.168.1.20]: PS C:\Users\admin\Documents>]] وأي أمر بيتنفذ هناك، و [[Exit-PSSession]] يرجعك. و [[Invoke-Command -ComputerName ... -ScriptBlock { ... }]] بيشغّل البلوك على كل الأجهزة مع بعض، والنتايج فيها عمود [[PSComputerName]] بيقولك جت منين.

PowerShell 7 كمان بيعمل remoting على SSH: [[Enter-PSSession -HostName 192.168.1.20 -UserName admin]] من غير WinRM ولا TrustedHosts، ومع لينكس والماك كمان، بس محتاج OpenSSH Server على الجهاز التاني (الدرس الجاي). وويندوز Home بيستقبل remoting عادي، لأن خدمة WinRM موجودة فيه (عندي موجودة وحالتها Stopped و Manual).`,
          example: R`# على الجهاز اللي هيستقبل (Terminal أدمن):
Enable-PSRemoting -Force
# على جهازك (Terminal أدمن):
Set-Item WSMan:\localhost\Client\TrustedHosts -Value "192.168.1.20" -Concatenate -Force
$cred = Get-Credential
Enter-PSSession -ComputerName 192.168.1.20 -Credential $cred
Exit-PSSession
Invoke-Command -ComputerName 192.168.1.20, 192.168.1.21 -Credential $cred -ScriptBlock { Get-CimInstance Win32_OperatingSystem | Select-Object Caption, LastBootUpTime }
Enter-PSSession -HostName 192.168.1.20 -UserName admin`,
          try: R`على جهازك من غير ما تغيّر حاجة: اعرف خدمة WinRM شغالة ولا لأ ([[Get-Service WinRM]])، وقواعد WINRM في الفايروول ([[Get-NetFirewallRule -Name "WINRM*"]])، وجرب [[Invoke-Command -ComputerName localhost -ScriptBlock { hostname }]] وشوف الـ error.`,
          flag: "danger",
          deep: {
            why: R`عندك جهازين أو تلاتة في البيت أو مكتب صغير، وعايز تعرف مساحة الديسك أو تسطّب تحديث أو تقرا لوج على كلهم من مكانك. Remote Desktop بياخد الشاشة كلها ومش موجود في Home، والـ remoting سطر واحد ونتيجته objects تقدر ترتبها وتصدّرها.`,
            how: R`[[Invoke-Command]] بيبعت البلوك للجهاز التاني، هو بيشغّله ويرجّع النتايج مترجمة (deserialized): نفس الخصائص بس من غير methods، عشان كده [[Get-Process]] اللي راجع من بعيد مينفعش تعمله [[.Kill()]].

الجلسة بتشتغل بحساب الـ credential اللي بعته وصلاحياته على الجهاز التاني، ومن غير UAC prompt. والـ endpoints الافتراضية بتسمح بس لـ Administrators و Remote Management Users على الجهاز التاني.

على جهاز مش في domain، [[Enable-PSRemoting]] بيظبط كمان إعداد اسمه LocalAccountTokenFilterPolicy، اللي بيخلي حسابات الأدمن الـ local تاخد صلاحيات كاملة من الشبكة. ده لازم للـ remoting، بس معناه إن أي حد معاه باسورد أدمن local يقدر يدخل من بعيد بصلاحيات كاملة، فالحساب ده لازم باسورد قوي (درس «RandomNumberGenerator (password)»).

WinRM على 5985 بيستخدم HTTP، بس محتوى الجلسة متشفّر بمفتاح بيتعمل بين الجهازين (NTLM أو Kerberos). و [[Disable-PSRemoting]] بيقفل الـ endpoints، و [[Stop-Service WinRM]] و [[Set-Service WinRM -StartupType Manual]] بيرجّعوا الخدمة زي ما كانت.`,
            when: R`إدارة كذا جهاز ويندوز من مكان واحد، أو سكربت بيجمع معلومات من أجهزة المكتب، أو تشغّل أمر على سيرفر ويندوز. ولو فيه لينكس أو ماك في الحسبة، أو مش عايز WinRM، استخدم SSH.`,
            mistakes: R`تحط [[TrustedHosts *]] وتنسى. أو تنسى إن الشبكة Public فـ Enable-PSRemoting يرفض. أو تستخدم حساب Microsoft من غير باسورد أو بالـ PIN (الأسهل حساب local أدمن بباسورد قوي على الجهاز التاني). أو تستنى [[Enter-PSSession]] يشغّل برامج بواجهة (مش بيعرض شاشات). أو تكتب [[TrustedHosts]] بالاسم وتتصل بالـ IP (لازم نفس الشكل). أو تفعّل remoting على أجهزة مش محتاجاه.`
          },
          lines: [
            "شغّل WinRM وافتح الفايروول للشبكات الـ Private، من غير أسئلة.",
            "ثق في الجهاز ده بالعنوان، وزوّده على اللستة بدل ما تمسحها.",
            "يوزر وباسورد أدمن على الجهاز التاني.",
            "افتح جلسة هناك: كل أمر بعد كده بيتنفذ على الجهاز التاني.",
            "ارجع لجهازك.",
            "شغّل البلوك ده على جهازين مع بعض، والنتايج فيها PSComputerName.",
            "PowerShell 7: نفس الجلسة على SSH، من غير WinRM ولا TrustedHosts."
          ],
          sol: R`جربت الحاجات اللي مش بتغيّر حاجة على ويندوز 11 Home. [[Get-Service WinRM]] طلع [[Stopped]] و [[Manual]]، و [[Get-NetFirewallRule -Name "WINRM*"]] طلع 4 rules ([[WINRM-HTTP-In-TCP]] للـ Public و [[WINRM-HTTP-In-TCP-NoScope]] للـ Domain و Private وغيرهم)، كلهم [[Enabled False]]. و [[Invoke-Command -ComputerName localhost -ScriptBlock { hostname }]] طلع [[Connecting to remote server localhost failed with the following error message : The client cannot connect to the destination specified in the request. Verify that the service on the destination is running and is accepting requests.]]، ومعاه نصيحة [[winrm quickconfig]]. وقراية [[WSMan:\localhost\Client\TrustedHosts]] من غير أدمن والخدمة واقفة طلعت [[Cannot find path ... because it does not exist.]].

(مفعّلتش remoting وأنا بكتب الدرس.) حسب توثيق Microsoft، [[Enable-PSRemoting]] من pwsh بيطبع تحذير إنه فعّل الـ remoting لـ PowerShell 7 بس ومش لـ Windows PowerShell، وبعدها [[Get-PSSessionConfiguration]] بيعرض [[PowerShell.7]].`
        },
        {
          cmd: "OpenSSH Server",
          title: "خلي ويندوز سيرفر SSH",
          desc: R`ويندوز 10 و 11 فيهم OpenSSH Client جاهز (درس «ssh / scp»)، والـ Server متاح كـ «Optional feature» بتسطّبه بأمر. بعدها تدخل على جهازك من أي جهاز تاني بـ [[ssh user@pc]] (لابتوب، موبايل، لينكس)، وتنقل ملفات بـ scp، وتعمل PowerShell remoting على SSH (الدرس اللي فات). ودي أسهل طريقة توصل بيها لجهاز ويندوز Home من بعيد، لأن Home مفيهوش Remote Desktop server.

[[Get-WindowsCapability -Online -Name OpenSSH*]] بيعرض حالة الـ Client والـ Server ([[Installed]] أو [[NotPresent]])، و [[-Online]] يعني الويندوز الشغال دلوقتي. و [[Add-WindowsCapability -Name OpenSSH.Server~~~~0.0.1.0]] بيسطّب السيرفر، والاسم بالـ [[~~~~]] ده بالظبط زي ما بيطلع في الأمر اللي قبله. و [[Start-Service sshd]] بيشغّل الخدمة، و [[Set-Service -StartupType Automatic]] بيخليها تقوم مع ويندوز. والتسطيب بيعمل rule في الفايروول اسمها [[OpenSSH-Server-In-TCP]] على بورت 22، و [[Get-NetFirewallRule -Name]] بيتأكد منها.

الـ shell الافتراضي لما تدخل هو CMD، وبيتغيّر من الـ registry: [[HKLM:\SOFTWARE\OpenSSH]] قيمة اسمها [[DefaultShell]] فيها المسار الكامل للـ shell. والـ parameters في hashtable وبعدين [[New-ItemProperty @shell]] (splatting): [[Path]] المفتاح، و [[Name]] اسم القيمة، و [[Value]] مسار pwsh.exe، و [[PropertyType String]] نوعها، و [[Force]] يكتب فوقها لو موجودة. ولو pwsh متسطب من Microsoft Store مساره بيبقى جوه WindowsApps، والأضمن نسخة winget (أول درس في التاب) في [[C:\Program Files\PowerShell\7]].

المفاتيح: لليوزر العادي المفتاح العام بيتحط في [[C:\Users\name\.ssh\authorized_keys]] زي لينكس. لكن لو الحساب في جروب Administrators، sshd بيتجاهل الملف ده وبيقرا [[C:\ProgramData\ssh\administrators_authorized_keys]] بس، وده لازم صلاحياته تبقى للأدمنز و SYSTEM بس: [[icacls]] و [[/inheritance:r]] يشيل الصلاحيات الموروثة، و [[/grant "*S-1-5-32-544:F"]] جروب Administrators بالـ SID (النجمة قبل الـ SID بتقول لـ icacls إن ده SID مش اسم) Full، و [[SYSTEM:F]]. ودي أشهر مشكلة: «حطيت المفتاح ولسه بيسألني على الباسورد». ولو حسابك Microsoft، اسم اليوزر في ssh هو اسم فولدر البروفايل والباسورد بتاع حساب Microsoft مش الـ PIN.

كله محتاج Terminal أدمن (من غير أدمن [[Get-WindowsCapability]] نفسه بيرفض)، وشغال من 5.1 و 7 (موديول [[Dism]] بيتحمّل في 7 عادي). الأوامر من توثيق Microsoft لـ OpenSSH على ويندوز.`,
          example: R`Get-WindowsCapability -Online -Name OpenSSH*
Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0
Start-Service sshd
Set-Service -Name sshd -StartupType Automatic
Get-NetFirewallRule -Name "OpenSSH-Server-In-TCP" | Select-Object Name, Enabled, Profile
$shell = @{ Path = "HKLM:\SOFTWARE\OpenSSH"; Name = "DefaultShell"; Value = "C:\Program Files\PowerShell\7\pwsh.exe"; PropertyType = "String"; Force = $true }
New-ItemProperty @shell
Add-Content C:\ProgramData\ssh\administrators_authorized_keys "ssh-ed25519 AAAA...paste-your-laptop-public-key"
icacls.exe C:\ProgramData\ssh\administrators_authorized_keys /inheritance:r /grant "*S-1-5-32-544:F" /grant "SYSTEM:F"`,
          try: R`من غير أدمن: اعرف OpenSSH Server متسطب عندك ولا لأ ([[Get-Service sshd]]، وشوف فيه [[sshd.exe]] في [[C:\Windows\System32\OpenSSH]] ولا لأ). ولو قررت تسطّبه: من Terminal أدمن، وبعدها ادخل على جهازك من الموبايل أو لابتوب تاني بـ ssh.`,
          flag: "danger",
          deep: {
            why: R`عايز توصل لجهاز البيت (ويندوز Home) من اللابتوب، أو تشغّل أوامر عليه من الموبايل، أو تنقل ملفات بـ scp و rsync من لينكس، أو تستخدم VS Code Remote-SSH على جهاز ويندوز. SSH بروتوكول واحد بيشتغل مع كل الأنظمة.`,
            how: R`السيرفر بيتسطب في [[C:\Windows\System32\OpenSSH]] جنب الـ client، وإعداداته في [[C:\ProgramData\ssh\sshd_config]]، ومفاتيح الجهاز نفسه (host keys) بتتعمل أول ما الخدمة تشتغل في نفس الفولدر. أي تعديل في sshd_config محتاج [[Restart-Service sshd]].

الفايروول: الـ rule اللي التسطيب بيعملها بتفتح 22 للدخول. راجع الـ Profile بتاعها بالسطر الخامس، ولو مش عايز الجهاز يقبل SSH على الشبكات العامة: [[Set-NetFirewallRule -Name "OpenSSH-Server-In-TCP" -Profile Private]].

بعد ما المفاتيح تشتغل، اقفل الدخول بالباسورد: في sshd_config خلي [[PasswordAuthentication no]] واعمل restart للخدمة، فمحدش يقدر يجرب باسوردات. ولو هتفتح SSH من النت (port forwarding في الراوتر)، ده لازم، والأحسن VPN بدل فتح البورت.

حسابات Microsoft Entra (حسابات الشغل) مش بتدعم الدخول بالمفاتيح حسب التوثيق. و [[Remove-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0]] بيشيل السيرفر.`,
            when: R`جهاز ويندوز في البيت عايز تدخله من بعيد، أو عايز ترفع ملفات عليه بـ scp، أو VS Code Remote-SSH، أو PowerShell remoting من لينكس والماك.`,
            mistakes: R`تحط مفتاح حساب أدمن في [[authorized_keys]] العادي فيفضل يسألك على الباسورد. أو تنسى صلاحيات [[administrators_authorized_keys]] فـ sshd يتجاهله. أو تسيب الدخول بالباسورد مفتوح وتعمل port forwarding لـ 22 من النت. أو تحط DefaultShell لمسار مش موجود فالدخول يفشل. أو تكتب اسم الـ capability بإيدك وتغلط في عدد الـ [[~]].`
          },
          lines: [
            "حالة الـ Client والـ Server (أدمن).",
            "سطّب السيرفر.",
            "شغّل الخدمة.",
            "خليها تقوم مع ويندوز.",
            "اتأكد من الـ rule بتاعة بورت 22 وعلى أنهي شبكات.",
            "بيانات قيمة الـ registry: الـ shell الافتراضي يبقى pwsh.",
            "اكتبها (splatting).",
            "حط المفتاح العام بتاع اللابتوب لحسابات الأدمن (محتوى id_ed25519.pub).",
            "صلاحيات الملف: الأدمنز (بالـ SID) و SYSTEM بس، من غير وراثة."
          ],
          sol: R`جربت الفحص من غير أدمن: [[Get-WindowsCapability -Online -Name OpenSSH*]] رفض بـ [[The requested operation requires elevation.]]. و [[Get-Service sshd]] طلع [[Cannot find any service with service name 'sshd'.]]، و [[ssh-agent]] طلع [[Stopped]] و [[Disabled]]. وفولدر [[C:\Windows\System32\OpenSSH]] فيه [[ssh.exe]] و [[scp.exe]] و [[ssh-keygen.exe]] ومفيهوش [[sshd.exe]]، يعني الـ Client متسطب والـ Server لأ. والسطر الخامس (مش محتاج أدمن) طلع [[No MSFT_NetFirewallRule objects found with property 'InstanceID' equal to 'OpenSSH-Server-In-TCP'.]]، لأن الـ rule بتتعمل مع التسطيب.

(مسطّبتش السيرفر وأنا بكتب الدرس.) حسب توثيق Microsoft، [[Get-WindowsCapability]] قبل التسطيب بيطلع [[Name : OpenSSH.Server~~~~0.0.1.0]] و [[State : NotPresent]]، و [[Add-WindowsCapability]] بيطلع [[Online : True]] و [[RestartNeeded : False]]، وأول [[ssh user@IP]] من جهاز تاني بيسألك تثق في الـ fingerprint، وبعد الباسورد بتلاقي الـ shell بتاع ويندوز.`
        },
        {
          cmd: "Restart-Computer -ComputerName",
          title: "اعمل restart أو اقفل جهاز تاني على الشبكة",
          desc: R`[[Restart-Computer]] و [[Stop-Computer]] (اللي في درس «shutdown /s /t» على جهازك) بياخدوا [[-ComputerName]]، فيعملوا restart أو يقفلوا جهاز تاني على الشبكة، أو كذا جهاز مرة واحدة: جهاز في أوضة تانية، أو أجهزة معمل بعد تحديث.

[[-ComputerName]] اسم الجهاز أو الـ IP، وأكتر من واحد بفاصلة. و [[-Credential $cred]] يوزر أدمن على الجهاز التاني (من [[Get-Credential]]). و [[-WhatIf]] يقولك هيعمل إيه من غير ما يعمله. و [[-Force]] يقفل حتى لو فيه برامج مفتوحة أو حد داخل. و [[-Wait -For PowerShell]] الأمر يستنى لحد ما الجهاز يقوم ويبقى PowerShell remoting عليه جاهز، و [[-Timeout 300]] بالكتير 5 دقايق، و [[-Delay 5]] يسأل كل 5 ثواني. و [[-Wait]] مينفعش مع جهازك انت.

السطر الأخير ألطف: [[Invoke-Command]] (درس Enter-PSSession / Invoke-Command) بيشغّل [[shutdown /r /t 300 /c "..."]] على الجهاز التاني، فاللي قاعد قدامه يشوف تنبيه ويبقى عنده 5 دقايق يحفظ.

المتطلبات: حساب أدمن على الجهاز التاني. وفي PowerShell 7 الأمرين بيكلّموا الجهاز التاني عن طريق WinRM بس، فلازم يكون عليه [[Enable-PSRemoting]] وعندك TrustedHosts لو مش domain (الدرس قبل اللي فات). في 5.1 فيه [[-Protocol DCOM]] (الافتراضي هناك) بيكلّم WMI بدل WinRM، ومحتاج قواعد WMI في فايروول الجهاز التاني. والبديل القديم من CMD: [[shutdown /r /m \\PC2]] في درس «shutdown /m» في تاب «CMD».

تحذير: الـ restart من بعيد مش بيسأل اللي قاعد قدام الجهاز، فأي شغل مش محفوظ عنده بيضيع، خصوصًا مع [[-Force]].`,
          example: R`$cred = Get-Credential
Restart-Computer -ComputerName 192.168.1.20 -Credential $cred -WhatIf
Restart-Computer -ComputerName 192.168.1.20 -Credential $cred -Force
Restart-Computer -ComputerName 192.168.1.20 -Credential $cred -Wait -For PowerShell -Timeout 300 -Delay 5
Stop-Computer -ComputerName 192.168.1.20, 192.168.1.21 -Credential $cred -Force
Invoke-Command -ComputerName 192.168.1.20 -Credential $cred -ScriptBlock { shutdown /r /t 300 /c "Restart in 5 minutes, save your work" }`,
          try: R`من غير ما تقفل أي حاجة: جرّب [[Stop-Computer -ComputerName PC-OFFICE -WhatIf]] و [[Restart-Computer -ComputerName PC-OFFICE -WhatIf]] بجهاز مش موجود، وقارن الاتنين.`,
          flag: "danger",
          deep: {
            why: R`سطّبت تحديث على 5 أجهزة ومحتاجين restart، أو جهاز في أوضة تانية معلّق ومش عايز تقوم، أو سكربت آخر اليوم بيقفل أجهزة المكتب. ومع [[-Wait]] تقدر تكمّل السكربت على الجهاز بعد ما يقوم.`,
            how: R`الأمرين بيستخدموا [[Win32Shutdown]] في [[Win32_OperatingSystem]] على الجهاز التاني (نفس CIM اللي في درس Get-CimInstance)، والحساب لازم يبقى عنده صلاحية الـ shutdown هناك، والأدمن عنده.

جربت أقارن الـ parameters في النسختين على نفس الجهاز: في 7.6 [[Restart-Computer]] فيه [[WsmanAuthentication]] بس كطريقة اتصال، وفي 5.1 فيه كمان [[Protocol]] و [[DcomAuthentication]] و [[Impersonation]] و [[AsJob]] و [[ThrottleLimit]]. فسكربت قديم فيه [[-Protocol WSMan]] هيفشل على 7.

[[-For]] بياخد [[Wmi]] (الجهاز بيرد على CIM) أو [[WinRM]] أو [[PowerShell]] (جلسة remoting تشتغل)، والأخير الأضمن لو هتشغّل أوامر بعده.

ويندوز Home مينفعش يتعمله remote desktop، بس ينفع يتعمله restart من بعيد بالطريقة دي، طول ما WinRM مفعّل عليه وانت أدمن هناك.`,
            when: R`restart بعد تحديثات على كذا جهاز، أو جهاز بعيد معلّق، أو جدولة قفل أجهزة بالليل مع Register-ScheduledTask، أو بعد Wake-on-LAN لما تخلص شغلك على الجهاز.`,
            mistakes: R`تنسى إن حد قاعد على الجهاز التاني. أو تكتب [[localhost]] في لستة أجهزة مع [[-Force]] فجهازك يقفل. أو تستخدم [[-Wait]] من غير [[-Timeout]] فلو الجهاز مقامش السكربت يفضل مستني. أو تفتكر [[-WhatIf]] بيتأكد إن الجهاز موجود ولا لأ (Restart بيتأكد و Stop لأ، شوف الـ sol). أو تجرب على 7 والجهاز التاني معندوش WinRM.`
          },
          lines: [
            "يوزر وباسورد أدمن على الجهاز التاني.",
            "اعرف هيعمل إيه من غير ما يعمل حاجة.",
            "restart على طول، حتى لو فيه برامج مفتوحة.",
            "restart واستنى لحد ما PowerShell remoting يشتغل عليه، 5 دقايق بالكتير، واسأل كل 5 ثواني.",
            "اقفل جهازين مرة واحدة.",
            "ألطف: restart بعد 5 دقايق برسالة للي قاعد قدامه (عن طريق remoting)."
          ],
          sol: R`جربت [[-WhatIf]] بس، بجهاز مش موجود. [[Stop-Computer -ComputerName PC-OFFICE -WhatIf]] طبع [[What if: Performing the operation "Stop-Computer" on target " (PC-OFFICE)".]] عادي. لكن [[Restart-Computer -ComputerName PC-OFFICE -WhatIf]] طلع error: [[Computer name PC-OFFICE cannot be resolved with the exception: One or more errors occurred. (No such host is known.).]]، يعني Restart-Computer بيدوّر على الجهاز قبل الـ WhatIf، و Stop-Computer لأ. فـ WhatIf مش اختبار إن الجهاز موجود.

(معملتش restart ولا قفلت أي جهاز وأنا بكتب الدرس.) لو الجهاز موجود و WinRM مش مفعّل عليه، هتشوف error اتصال زي اللي في درس Enter-PSSession / Invoke-Command. ولو مفعّل وانت أدمن هناك، الأمر مش بيطبع حاجة، والجهاز بيعمل restart.`
        }
      ]
    },
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
          lines: [
            "حالة التشفير والحماية لكل ديسك (أدمن).",
            "الطرق اللي بتفتح C: وأرقامها.",
            "مفتاح الاسترجاع نفسه (سر، متعرضهوش لحد).",
            "نفس الحالة من أداة CMD القديمة (أدمن).",
            "مفاتيح C: من نفس الأداة."
          ],
          sol: R`جربت من غير أدمن على ويندوز 11 Home: [[Get-BitLockerVolume]] رفض بـ [[Access to a CIM resource was not available to the client.]]، و [[manage-bde -status C:]] طبع [[ERROR: An attempt to access a required resource was denied.]] و [[Check that you have administrative rights on the computer.]] وخرج بـ exit code 3. يعني حتى معرفة «التشفير شغال ولا لأ» محتاجة Terminal أدمن، أو Settings ← Privacy & security ← Device encryption من غير أدمن.

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

[[InstanceName]] في [[\Process(*)]] اسم العملية من غير .exe وبحروف صغيرة، ولو فيه أكتر من نسخة (chrome مثلًا) بيطلع [[chrome]] و [[chrome#1]] و [[chrome#2]]، فممكن تجمعهم بـ [[Group-Object]]. وعشان تربطه بـ PID: [[\Process(*)\ID Process]].

لتسجيل طويل: [[Get-Counter ... -SampleInterval 5 -MaxSamples 720 | Export-Counter -Path cpu.blg]] بيسجّل ساعة في ملف تفتحه في Performance Monitor ([[perfmon]])، أو حوّل لـ CSV بـ [[Export-Csv]] (درس Export-Csv / ConvertTo-Json).

[[MsMpEng]] اللي بيظهر كتير وقت الـ builds هو Defender بيفحص الملفات اللي بتتكتب (درس Get-MpComputerStatus).`,
            when: R`الجهاز بطيء فجأة، أو مقارنة أداء قبل وبعد، أو مراقبة سيرفر ويندوز، أو سكربت تنبيه لو الرام الفاضية قلّت عن حد.`,
            mistakes: R`تفتكر عمود [[CPU]] في Get-Process نسبة مئوية. أو تنسى القسمة على عدد الـ cores فتلاقي 400%. أو تكتب أسامي counters إنجليزي على ويندوز مترجم. أو تستخدم [[-Continuous]] في سكربت من غير ما تعرف إنه مش هيخلص لوحده. أو تتجاهل error «The data in one of the performance counter samples is not valid» وهو مجرد عملية قفلت وقت القراية.`
          },
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

سجلات [[System]] و [[Application]] بتتقري من غير أدمن، لكن [[Security]] (الدخول والخروج) محتاج Terminal أدمن (السطر الأخير). و [[Get-WinEvent]] شغال في 5.1 و 7 على ويندوز. و [[Get-EventLog]] القديم مش موجود في PowerShell 7، فلو لقيته في شرح قديم استخدم [[Get-WinEvent]]. والشكل بالماوس في درس «eventvwr.msc» في تاب «اختصارات النظام».`,
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
            mistakes: R`تقرا السجل كله وتفلتر بـ [[Where-Object]] فالأمر ياخد دقايق. أو تفتكر إن «No events were found» error حقيقي (معناه مفيش أحداث بالفلتر ده). أو تقلق من كل Error في السجل: ويندوز بيسجّل أخطاء كتير عادية. أو تحاول تقرا Security من غير أدمن. أو تستخدم [[Get-EventLog]] في PowerShell 7.`
          },
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
