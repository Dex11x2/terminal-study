// تكملة تاب cmd: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/cmd/01.js (شرح حقول الدرس في أوله)
MORE("cmd", [
    {
      t: "تحكّم في الشبكة والأجهزة اللي معاك",
      l: 2,
      n: R`فايروول و IP ثابت وواي فاي وتصليح النت وشير و Remote Desktop وأجهزة تانية على شبكتك. أغلب التغيير محتاج CMD كأدمن والخطير عليه علامة، واللي بيدوّر على أجهزة: على شبكتك انت بس أو بإذن صاحبها`,
      items: [
        {
          cmd: "netsh advfirewall firewall",
          title: "افتح بورت أو امنع برنامج في الفايروول",
          desc: R`[[netsh advfirewall firewall]] بيعرض قواعد Windows Firewall ويضيف قواعد جديدة ويمسحها، و [[netsh advfirewall]] لوحده بيعرض حالة الفايروول نفسه. أشهر استخدام: «الموبايل مش شايف السيرفر اللي شغال على جهازي»، فتفتح بورت واحد على الشبكات الخاصة بس.

العرض:
[[show currentprofile]] أنهي profile شغال دلوقتي (Domain أو Private أو Public) والفايروول شغال فيه ولا لأ، و [[show allprofiles state]] الحالة في التلاتة.
[[show rule name=all dir=in]] كل القواعد الداخلة (incoming)، وهي مئات، فاستخدم معاها [[| findstr]]. و [[name="..."]] قاعدة واحدة، و [[verbose]] تفاصيل زيادة زي البرنامج.

[[add rule]] قاعدة جديدة، وجواها:
[[name="Dev 5173"]] اسمها، وبيه بتمسحها بعدين.
[[dir=in]] داخل لجهازك، أو [[dir=out]] خارج منه.
[[action=allow]] اسمح، أو [[action=block]] امنع.
[[protocol=TCP]] و [[localport=5173]] البورت على جهازك (5173 بورت Vite).
[[profile=private]] على الشبكات الخاصة بس (البيت)، مش [[public]] (كافيه أو مطار). دي أهم حتة.
[[program="C:\Tools\myapp.exe"]] القاعدة على برنامج معين بدل بورت.
[[delete rule name="Dev 5173"]] امسح القاعدة (وأي قاعدة تانية بنفس الاسم).

الخطيرين: [[netsh advfirewall set allprofiles state off]] بيقفل الفايروول كله، متعملهاش. و [[netsh advfirewall reset]] بيرجّع الفايروول لإعدادات ويندوز الأصلية ويمسح كل قواعدك وقواعد البرامج.

العرض مش محتاج أدمن. الإضافة والمسح والتغيير محتاجين CMD كأدمن، ومن غيره: [[The requested operation requires elevation (Run as administrator).]].`,
          example: R`netsh advfirewall show currentprofile
netsh advfirewall firewall show rule name=all dir=in | findstr /c:"Rule Name:"
netsh advfirewall firewall add rule name="Dev 5173" dir=in action=allow protocol=TCP localport=5173 profile=private
netsh advfirewall firewall show rule name="Dev 5173"
netsh advfirewall firewall add rule name="Block MyApp" dir=out action=block program="C:\Tools\myapp.exe"
netsh advfirewall firewall delete rule name="Dev 5173"
netsh advfirewall firewall delete rule name="Block MyApp"`,
          try: R`شغّل سيرفر على بورت (مثلًا [[python -m http.server 8000]])، وافتحه من الموبايل على نفس الواي فاي بـ IP جهازك. لو مفتحش: ضيف قاعدة للبورت ده بـ [[profile=private]] من CMD أدمن وجرّب تاني، وبعدين امسحها.`,
          flag: "danger",
          deep: {
            why: R`لما تشغّل سيرفر تطوير (Vite أو Node أو Python) وتحاول تفتحه من الموبايل أو جهاز تاني، الفايروول بيمنع الاتصال الداخل. ويندوز ساعات بيطلّع نافذة «Allow access» أول مرة، ولو دوست Cancel أو اخترت غلط بتفضل القاعدة دي تمنع وانت مش واخد بالك. وفي الناحية التانية، أحيانًا عايز تمنع برنامج يكلم النت (برنامج مش واثق فيه، أو تحديث تلقائي بيبوّظ نسخة شغال عليها).`,
            how: R`فيه 3 profiles: Domain (جهاز شركة على دومين)، و Private (شبكة انت واثق فيها)، و Public (أي شبكة تانية، وده الافتراضي لأي واي فاي جديد). كل profile ليه حالته وقواعده، والافتراضي «امنع أي داخل مفيش قاعدة بتسمحه، واسمح بأي خارج» ([[Firewall Policy BlockInbound,AllowOutbound]]). عشان كده [[dir=out action=allow]] ملهاش لازمة غالبًا، و [[dir=out action=block]] هي اللي بتعمل فرق.

جرّبت [[show currentprofile]] على اللابتوب ده وطلع [[Public Profile Settings]]: واي فاي البيت متسجل Public، فقاعدة بـ [[profile=private]] مش هتشتغل عليه. الحل إنك تخلّي الشبكة Private (Settings ثم Network & internet ثم Wi-Fi ثم اسم الشبكة ثم Network profile type، أو [[Set-NetConnectionProfile]] في تاب «PowerShell»)، مش إنك تفتح البورت على Public.

البرامج اللي ويندوز سألك عليها بتعمل قواعد باسمها. عندي لقيت قاعدتين [[Node.js JavaScript Runtime]] (واحدة TCP وواحدة UDP) فيهم [[Program: C:\program files\nodejs\node.exe]] و [[Profiles: Public]] و [[Action: Allow]]، يعني node مسموحله يستقبل اتصالات على الشبكات العامة، وده أوسع من اللازم. تقدر تضيّقها: [[netsh advfirewall firewall set rule name="Node.js JavaScript Runtime" new profile=private]].

netsh بيسمح بقاعدتين بنفس الاسم، فلو شغّلت add مرتين هيبقى عندك اتنين. [[show rule name="..."]] على اسم مش موجود بيطبع [[No rules match the specified criteria.]] ويرجّع errorlevel 1، فتقدر في سكربت تضيف بس لو مش موجودة: [[netsh advfirewall firewall show rule name="Dev 5173" >nul || netsh advfirewall firewall add rule ...]]. و [[remoteip=localsubnet]] بيقصر القاعدة على أجهزة شبكتك بس. والمقابل في PowerShell: [[New-NetFirewallRule]] (في تاب «PowerShell»)، والواجهة [[wf.msc]].`,
            when: R`سيرفر تطوير عايز تفتحه من الموبايل، أو Docker أو WSL أو VM محتاجين يوصلوا لجهازك، أو تمنع برنامج يكلم النت، أو تراجع البرامج المسموحلها تستقبل اتصالات على الشبكات العامة.`,
            mistakes: R`تقفل الفايروول كله ([[state off]]) عشان «السيرفر يشتغل» وتنسى ترجّعه. أو تفتح البورت بـ [[profile=any]] أو public فيبقى مفتوح في أي كافيه. أو تضيف القاعدة والشبكة نفسها Public فمتشتغلش. أو [[findstr "Rule Name"]] من غير [[/c:]]: المسافة بتخليها «Rule أو Name». أو [[netsh advfirewall reset]] وانت فاكره بيصلّح قاعدة واحدة، وهو بيمسح كل القواعد. أو تفتكر إن القاعدة دي بتفتح البورت للنت: النت محتاج port forwarding في الراوتر، ومتعملوش لسيرفر تطوير.`
          },
          lines: [
            R`أنهي profile شغال دلوقتي، والفايروول شغال فيه ولا لأ.`,
            R`أسامي كل القواعد الداخلة ([[/c:]] عشان المسافة تتقري كجزء من الكلام).`,
            R`افتح بورت 5173 للداخل على الشبكات الخاصة بس (أدمن).`,
            R`اتأكد إنها اتعملت.`,
            R`امنع برنامج يكلم النت.`,
            R`امسح قاعدة البورت.`,
            R`وقاعدة البرنامج.`
          ],
          sol: R`[[netsh advfirewall show currentprofile]] طلّع عندي [[Public Profile Settings:]] وتحتها [[State ON]] و [[Firewall Policy BlockInbound,AllowOutbound]]، و [[show allprofiles state]] طلّع [[State ON]] تحت Domain و Private و Public. و [[show rule name=all dir=in | find /c "Rule Name:"]] عدّ 365 قاعدة داخلة (أغلبها بتاعة ويندوز و Docker و WSL)، و [[show rule name="Dev 5173"]] قبل ما تتعمل طلّع [[No rules match the specified criteria.]].

(الإضافة والمسح مشغّلتهمش هنا عشان ميغيّروش فايروول الجهاز؛ ده من توثيق Microsoft.) من CMD أدمن [[add rule]] بيطبع [[Ok.]]، و [[delete rule]] بيطبع [[Deleted 1 rule(s).]] و [[Ok.]]. بعد ما تضيف القاعدة، السيرفر نفسه لازم يكون سامع على كل الكروت مش localhost بس: [[python -m http.server]] سامع على الكل افتراضيًا، و Vite محتاج [[npm run dev -- --host]]. وافتح من الموبايل [[http://IP-جهازك:8000]] (الـ IP من ipconfig). ولو لسه مش بيفتح والشبكة Public، القاعدة بـ [[profile=private]] مش شغالة عليها: خلّي الشبكة Private.`,
          solCode: R`netsh advfirewall firewall add rule name="Dev 8000" dir=in action=allow protocol=TCP localport=8000 profile=private
python -m http.server 8000
REM open http://YOUR-IP:8000 on the phone, then Ctrl+C
netsh advfirewall firewall delete rule name="Dev 8000"`
        },
        {
          cmd: "netsh interface ip set address",
          title: "IP ثابت و DNS من سطر الأوامر",
          desc: R`[[netsh interface ip set address]] بيدّي كارت الشبكة IP ثابت بدل اللي الراوتر بيوزّعه، و [[set dns]] بيغيّر سيرفر الـ DNS، و [[dhcp]] بيرجّع الاتنين أوتوماتيك. مفيد لجهاز شغال كسيرفر في البيت (NAS أو جهاز بتعمله SSH أو طابعة) عشان عنوانه ميتغيّرش.

[[netsh interface show interface]] أسامي الكروت بالظبط (عمود [[Interface Name]]) وأنهي واحد [[Connected]]. الاسم بين علامات تنصيص لو فيه مسافة أو شرطة: [[name="Wi-Fi"]].
[[netsh interface ipv4 show config]] الإعدادات الحالية لكل كارت: [[DHCP enabled]] و [[IP Address]] و [[Default Gateway]] والـ DNS. ([[ip]] و [[ipv4]] هنا نفس الحاجة.)
[[set address name="Wi-Fi" static 192.168.1.50 255.255.255.0 192.168.1.1]] IP ثابت: العنوان، وبعده الـ mask ([[255.255.255.0]] يعني أول 3 أرقام هي الشبكة)، وبعده الـ gateway (الراوتر).
[[set dns name="Wi-Fi" static 1.1.1.1]] أول DNS، و [[add dns name="Wi-Fi" 8.8.8.8 index=2]] التاني ([[index]] ترتيبه).
[[set address name="Wi-Fi" dhcp]] و [[set dns name="Wi-Fi" dhcp]] رجّعهم أوتوماتيك من الراوتر.

كل [[set]] و [[add]] محتاج CMD كأدمن وبيقطع الاتصال ثانية أو اتنين. واختار IP برا مدى الـ DHCP بتاع الراوتر (من صفحة الراوتر، غالبًا من [[.100]] لـ [[.200]] أو حاجة زي كده)، وإلا الراوتر ممكن يدّي نفس العنوان لجهاز تاني.`,
          example: R`netsh interface show interface
netsh interface ipv4 show config name="Wi-Fi"
netsh interface ip set address name="Wi-Fi" static 192.168.1.50 255.255.255.0 192.168.1.1
netsh interface ip set dns name="Wi-Fi" static 1.1.1.1
netsh interface ip add dns name="Wi-Fi" 8.8.8.8 index=2
ping -n 2 192.168.1.1
netsh interface ip set address name="Wi-Fi" dhcp
netsh interface ip set dns name="Wi-Fi" dhcp`,
          try: R`اعرف اسم الكارت اللي انت متوصل بيه، والـ IP والـ gateway والـ DNS بتوعه من show config، واكتبهم. لو هتجرّب IP ثابت: جرّب وانت قدام الجهاز مش من Remote Desktop، ورجّع DHCP في الآخر.`,
          flag: "danger",
          deep: {
            why: R`جهاز في البيت عامل سيرفر عنوانه بيتغيّر كل كام يوم، فالـ bookmarks و ssh config بيبوظوا. أو عايز DNS تاني غير بتاع مزوّد الخدمة (أسرع، أو بيحجب الإعلانات). أو لابتوب اتساب عليه IP ثابت من شبكة شغل قديمة فمش بيتصل بأي حاجة في البيت. وكل ده سطر واحد ينفع يتحط في سكربت.`,
            how: R`DHCP: الجهاز لما يتصل بيطلب من الراوتر «ادّيني عنوان»، والراوتر بيدّيه واحد من مدى (pool) لمدة (lease) ومعاه الـ gateway والـ DNS. [[static]] بيخلّي الجهاز يستخدم اللي انت كتبته من غير ما يسأل. الأحسن غالبًا «DHCP reservation» من صفحة الراوتر: الراوتر يدّي نفس الـ IP دايمًا لنفس الـ MAC والجهاز يفضل DHCP، فلو نقلته لشبكة تانية يشتغل عادي.

الـ mask: [[255.255.255.0]] (أو [[/24]]) معناها أول 3 أرقام هي الشبكة والأخير للجهاز، فالأجهزة من [[.1]] لـ [[.254]] في نفس الشبكة، والـ IP والـ gateway لازم يبقوا فيها.

الـ DNS مستقل عن الـ IP: ينفع تسيب الـ IP أوتوماتيك وتغيّر الـ DNS بس، وأي DNS ثابت على كارت بيخلّيه يتجاهل الـ DNS اللي جاي من الراوتر. عندي [[show config]] طلّع كارت قديم [[Ethernet 2]] عليه [[DHCP enabled: No]] و [[Statically Configured DNS Servers: 8.8.8.8]] و [[8.8.4.4]]: إعداد ثابت اتعمل زمان، ولو الكابل ده اتوصل هيستخدمه. والواي فاي عليه [[DNS servers configured through DHCP]] يعني جاي من الراوتر.

بعد ما تغيّر الـ DNS اعمل [[ipconfig /flushdns]] (درس ipconfig). ولو بتغيّر الـ IP لجهاز بتكلمه عن بعد، الاتصال هيقطع ومش هترجع غير على العنوان الجديد. والمقابل في PowerShell: [[New-NetIPAddress]] و [[Set-DnsClientServerAddress]] (في تاب «PowerShell»)، والواجهة: Settings ثم Network & internet ثم الكارت ثم IP assignment و DNS server assignment.`,
            when: R`جهاز بيقدّم خدمة على شبكة البيت، تجربة DNS تاني (1.1.1.1 أو 8.8.8.8 أو DNS بيحجب إعلانات)، كارت عليه IP ثابت قديم ومحتاج يرجع أوتوماتيك، أو معمل أو شبكة صغيرة محتاجة عناوين معروفة.`,
            mistakes: R`IP ثابت جوه مدى الـ DHCP فجهازين ياخدوا نفس العنوان (ويندوز بيقول IP address conflict). أو gateway غلط: الشبكة المحلية شغالة والنت لأ. أو اسم الكارت مش مطابق: جرّبت [[show config name="NoSuchAdapter"]] وطلّع [[The filename, directory name, or volume label syntax is incorrect.]] مع إن الغلطة في الاسم مش في ملف، فانسخ الاسم من show interface. أو تنسى ترجّع DHCP على لابتوب فيروح شبكة تانية وميتصلش. أو تغيّر من Remote Desktop فتقفل الباب على نفسك.`
          },
          lines: [
            R`أسامي الكروت، وأنهي واحد متوصل.`,
            R`إعدادات الـ IP والـ DNS بتاعة الواي فاي دلوقتي (اكتبها قبل أي تغيير).`,
            R`IP ثابت: العنوان والـ mask والراوتر (أدمن، وبيقطع ثانية).`,
            R`أول DNS.`,
            R`DNS تاني كاحتياطي.`,
            R`اتأكد إن الراوتر لسه بيرد.`,
            R`رجّع الـ IP أوتوماتيك من الراوتر.`,
            R`ورجّع الـ DNS أوتوماتيك.`
          ],
          sol: R`[[netsh interface show interface]] طلّع عندي جدول [[Admin State  State  Type  Interface Name]]، وفيه [[Enabled  Connected  Dedicated  Wi-Fi]]، وكروت تانية [[Disconnected]] ([[Ethernet]] و [[Ethernet 2]] وكارت VPN). و [[netsh interface ipv4 show config name="Wi-Fi"]] طلّع:
[[DHCP enabled: Yes]]
[[IP Address: 192.168.1.2]]
[[Subnet Prefix: 192.168.1.0/24 (mask 255.255.255.0)]]
[[Default Gateway: 192.168.1.1]]
[[DNS servers configured through DHCP: 94.140.14.15]] و [[94.140.15.16]] (الراوتر بيوزّع DNS بتاع AdGuard).
دول اللي ترجعلهم لو حاجة باظت.

(الـ set والـ add مشغّلتهمش هنا عشان ميقطعوش نت الجهاز؛ ده من توثيق netsh.) من CMD عادي بيطلّعوا [[The requested operation requires elevation (Run as administrator).]]. ومن أدمن النت بيقطع لحظة، وبعدها show config بيوريك [[DHCP enabled: No]] و [[IP Address: 192.168.1.50]] و [[Statically Configured DNS Servers: 1.1.1.1]] وتحتها [[8.8.8.8]]. وبعد سطري [[dhcp]] بيرجع [[DHCP enabled: Yes]] والـ DNS [[configured through DHCP]].`
        },
        {
          cmd: "netsh wlan connect",
          title: "الواي فاي من الترمنال: الإشارة والقنوات والاتصال",
          desc: R`[[netsh wlan]] بيتحكم في الواي فاي من سطر الأوامر: بيعرض قوة الإشارة والقناة اللي انت عليها، والشبكات اللي حواليك وقنواتها، ويتصل ويفصل، وينقل الشبكات المحفوظة لجهاز جديد. (عرض باسورد شبكة محفوظة في درس netsh.)

[[show interfaces]] الاتصال الحالي: [[SSID]] اسم الشبكة، و [[Signal]] الإشارة بالنسبة المئوية، و [[Channel]] و [[Band]] (2.4 أو 5 GHz)، و [[Radio type]] (زي [[802.11ac]]، أو [[802.11ax]] اللي هو Wi-Fi 6)، و [[Receive rate (Mbps)]] سرعة الوصلة بين الجهاز والراوتر (مش سرعة النت).
[[show networks mode=bssid]] كل الشبكات اللي حواليك، ولكل راوتر ([[BSSID]]) إشارته وقناته. من هنا تعرف القنوات الزحمة وتختار لراوترك قناة أفضى.
[[connect name="HomeNet"]] اتصل بشبكة محفوظة (الاسم من [[show profiles]])، و [[disconnect]] افصل.
[[export profile key=clear folder=D:\wifi]] احفظ كل الشبكات المحفوظة كملفات XML ومعاها الباسوردات، و [[add profile filename="..."]] ضيف واحدة منهم على جهاز تاني.
[[delete profile name="OldCafe"]] انسى شبكة.
[[show wlanreport]] تقرير HTML عن الاتصالات والفصل والأخطاء آخر 3 أيام (CMD كأدمن).

على ويندوز 11 الحديث، [[show networks]] و [[show interfaces]] محتاجين إذن الموقع (Location)، لأن أسامي الشبكات اللي حواليك بتكشف انت فين. من غيره هتشوف [[Network shell commands need location permission to access WLAN information.]]، والحل: Settings ثم Privacy & security ثم Location، وشغّل Location services و Let desktop apps access your location ([[start ms-settings:privacy-location]] بيفتح الصفحة دي).`,
          example: R`netsh wlan show interfaces
netsh wlan show networks mode=bssid
netsh wlan show profiles
netsh wlan connect name="HomeNet"
mkdir D:\wifi
netsh wlan export profile key=clear folder=D:\wifi
netsh wlan add profile filename="D:\wifi\Wi-Fi-HomeNet.xml"
netsh wlan delete profile name="OldCafe"
netsh wlan show wlanreport`,
          try: R`اعرف إشارتك وقناتك من show interfaces، وبعدين show networks mode=bssid واكتب كل شبكة على أنهي قناة. لو راوترك على 2.4 GHz: أنهي قناة من 1 و 6 و 11 أفضى عندك؟`,
          flag: "danger",
          deep: {
            why: R`«النت بطيء» ساعات مش من مزوّد الخدمة: إشارة ضعيفة، أو راوترك على نفس قناة جيران كتير، أو الجهاز على 2.4 GHz وهو يقدر على 5. الأرقام دي بتطلع في ثانية من الترمنال. وكمان جهاز جديد: بدل ما تكتب باسورد كل شبكة (البيت والشغل والأهل) بتنقلهم كلهم بأمرين.`,
            how: R`2.4 GHz فيها 13 قناة متداخلة، والقنوات اللي مش بتتداخل مع بعض 1 و 6 و 11 بس، فراوتر على 7 بيتأثر بأي شبكة من 3 لـ 11 تقريبًا. 5 GHz قنواتها أكتر ومش متداخلة ومداها أقصر، فلو الراوتر والجهاز بيدعموها استخدمها وانت في نفس الأوضة أو قريب. والقناة بتتغيّر من صفحة الراوتر مش من ويندوز.

الإشارة: 70% وطالع كويسة، وتحت 40% هتلاقي بطء وقطع. و [[Rssi]] نفس المعلومة بالـ dBm: [[-42]] ممتازة و [[-70]] ضعيفة. و [[Receive rate]] و [[Transmit rate]] سرعة الوصلة اللاسلكية، والنت الحقيقي أقل منها دايمًا.

[[export]] بيعمل ملف لكل شبكة اسمه [[Wi-Fi-اسم الشبكة.xml]] ([[Wi-Fi]] اسم الكارت)، والفولدر لازم يكون موجود. مع [[key=clear]] من CMD أدمن الباسورد بيتكتب واضح جوه [[keyMaterial]]، ومن غير أدمن بيتكتب مشفّر ومينفعش يتنقل لجهاز تاني (حسب توثيق Microsoft). الملفات دي فيها باسوردات كل شبكاتك، فامسحها بعد ما تضيفها.

[[connect]] بيشتغل بس على شبكة ليها profile محفوظ، و «اتصل» معناها إن الطلب اتبعت، فاتأكد بـ show interfaces. و [[show wlanreport]] بيحفظ التقرير في [[C:\ProgramData\Microsoft\Windows\WlanReport\wlan-report-latest.html]]، افتحه بـ [[start ""]] والمسار (درس start).`,
            when: R`الواي فاي بطيء أو بيقطع، اختيار قناة للراوتر، جهاز جديد أو بعد فرمتة، لابتوب عليه شبكات قديمة كتير محتاج تنضيف، أو سكربت بيتصل بشبكة معينة.`,
            mistakes: R`تسيب ملفات export بالباسوردات على الديسكتوب أو ترفعها في ريبو. أو تحكم على سرعة النت من Receive rate. أو تغيّر قناة الراوتر لـ 4 أو 9 (متداخلة مع الكل) بدل 1 و 6 و 11. أو [[connect]] على شبكة مش محفوظة قبل كده. أو تقفل Location وتستغرب إن show networks بقى بيقول Access is denied.`
          },
          lines: [
            R`الاتصال الحالي: الشبكة والإشارة والقناة والسرعة.`,
            R`الشبكات اللي حواليك، ولكل راوتر قناته وإشارته.`,
            R`الشبكات المحفوظة على الجهاز.`,
            R`اتصل بشبكة محفوظة.`,
            R`فولدر للتصدير.`,
            R`صدّر كل الشبكات ومعاها الباسوردات (أدمن عشان الباسورد يطلع واضح).`,
            R`على الجهاز الجديد: ضيف شبكة من الملف.`,
            R`انسى شبكة مش محتاجها.`,
            R`تقرير HTML عن آخر 3 أيام (أدمن).`
          ],
          sol: R`[[netsh wlan show interfaces]] طلّع عندي (غيّرت اسم الشبكة): [[Description : Intel(R) Wi-Fi 6 AX200 160MHz]] و [[SSID : HomeNet]] و [[Band : 2.4 GHz]] و [[Channel : 7]] و [[Radio type : 802.11n]] و [[Receive rate (Mbps) : 130]] و [[Signal : 94%]] و [[Rssi : -42]]. الإشارة ممتازة، بس الكارت Wi-Fi 6 ([[show drivers]] قال [[Radio types supported : 802.11b 802.11g 802.11n 802.11a 802.11ac 802.11ax]]) وشغال 802.11n على 2.4 GHz، يعني الراوتر هو اللي محدد السرعة مش اللابتوب.

[[show networks mode=bssid]] طلّع [[There are 10 networks currently visible.]]، كلهم 2.4 GHz على القنوات 1 و 4 و 5 و 7 و 8 و 9 و 10 و 11، وواحدة منهم على قناتي 7، وشبكة مخفية (من غير اسم) [[Authentication : Open]] و [[Encryption : None]]. أفضى قناة هنا 11: عليها 3 شبكات إشاراتهم ضعيفة (من 18% لـ 35%)، و 1 عليها شبكة واحدة بس قوية (70%). و [[show wlanreport]] من CMD عادي طلّع [[You must run this command from a command prompt with administrator privilege.]]. (الموقع كان مسموح على الجهاز ده، فـ show networks اشتغل.)

(الاتصال والتصدير والإضافة والمسح مشغّلتهمش عشان ميغيّروش شبكات الجهاز.) [[connect]] لو اتقبل بيطبع [[Connection request was completed successfully.]]، و [[export]] بيطبع لكل شبكة [[Interface profile "HomeNet" is saved in file "D:\wifi\Wi-Fi-HomeNet.xml" successfully.]].`
        },
        {
          cmd: "netsh winsock reset",
          title: "النت بايظ على جهاز واحد: التصليح بالترتيب",
          desc: R`لما النت مش شغال على جهازك بس (الموبايل على نفس الواي فاي شغال)، فيه ترتيب أوامر بيصلّح أغلب الحالات من الأخف للأتقل. [[netsh winsock reset]] و [[netsh int ip reset]] هما الأتقل: بيرجّعوا إعدادات الشبكة في ويندوز لأصلها ومحتاجين restart.

بالترتيب، من CMD كأدمن، وقف عند أول خطوة تحل المشكلة:
1. [[ipconfig /release]] و [[ipconfig /renew]]: سيب الـ IP واطلب جديد من الراوتر (درس ipconfig /release /renew).
2. [[ipconfig /flushdns]]: امسح كاش الـ DNS.
3. [[netsh winsock reset]]: رجّع Winsock لحالته الأصلية. Winsock هو الطبقة اللي البرامج بتكلم بيها الشبكة، والـ reset بيشيل أي LSP: إضافات برامج (VPN قديمة أو antivirus) بتحشر نفسها في الطريق، ولما تتشال غلط بتقطع النت عن كل البرامج.
4. [[netsh int ip reset]]: رجّع إعدادات TCP/IP في الريجستري لأصلها، كأنك شيلت TCP/IP وسطّبته تاني. أي IP أو DNS ثابت بيروح والكروت ترجع DHCP. و [[int]] اختصار [[interface]]، والملف اللي بعده ([[C:\resetlog.txt]]) لوج بكل اللي اتغيّر.
5. restart، ودي جزء من الحل مش اختياري.

الأتقل من ده كله: Settings ثم Network & internet ثم Advanced network settings ثم Network reset. بيشيل كل كروت الشبكة ويسطّبها تاني بإعداداتها الأصلية، وبعده ممكن تحتاج تسطّب أو تظبط تاني برامج VPN والـ virtual switches (Hyper-V وغيره)، والجهاز بيعمل restart لوحده بعد دقايق.`,
          example: R`netsh winsock show catalog | findstr /c:"Description:"
ipconfig /release
ipconfig /renew
ipconfig /flushdns
netsh winsock reset
netsh int ip reset C:\resetlog.txt
shutdown /r /t 0`,
          try: R`من غير ما تصلّح حاجة: اعرض الـ Winsock catalog بالسطر الأول، وشوف فيه أي اسم غير MSAFD و RSVP و Hyper-V و Bluetooth و AF_UNIX. ولو النت بايظ عندك فعلًا، امشي بالترتيب ووقف عند أول خطوة تحل المشكلة.`,
          flag: "danger",
          deep: {
            why: R`فيه مشاكل نت سببها الجهاز نفسه مش الراوتر: برنامج VPN أو antivirus اتشال وساب وراه إعدادات، أو IP ثابت قديم، أو كاش DNS فيه ردود غلط. الأعراض: الموبايل شغال والجهاز لأ، أو [[ping]] شغال والمتصفح لأ، أو «No internet» والواي فاي متصل. الخطوات دي بتصلّح ده من غير فرمتة، وبالترتيب عشان متعملش الأتقل وهو مش محتاج.`,
            how: R`كل خطوة بتصلّح طبقة: release و renew العنوان نفسه (والـ gateway والـ DNS اللي جايين معاه). و flushdns الكاش اللي ويندوز حافظه عن الدومينات. و winsock reset الـ catalog اللي بيقول مين بيتعامل مع اتصالات البرامج: البرامج بتنادي Winsock، و Winsock بيعدّي على أي LSP متسجل قبل ما يوصل لـ TCP/IP، فلو LSP بايظ كل البرامج بتقع. و int ip reset بيكتب فوق مفاتيح الريجستري [[SYSTEM\CurrentControlSet\Services\Tcpip\Parameters]] و [[SYSTEM\CurrentControlSet\Services\DHCP\Parameters]]، واللوج بيقولك كل مفتاح اتغيّر وقيمته القديمة.

قبل ما توصل للخطوات دي، اتأكد إن المشكلة في الجهاز وعند أنهي طبقة (درس ping / tracert / nslookup): [[ping 192.168.1.1]] (الراوتر) شغال؟ [[ping 1.1.1.1]] (IP على النت من غير DNS) شغال؟ [[nslookup google.com]] بيرد؟ لو الأولاني بس اللي واقع المشكلة في الواي فاي أو الكابل، ولو التالت بس يبقى DNS.

LSPs بقت نادرة في ويندوز الحديث (أغلب البرامج بقت تستخدم طرق تانية)، فـ winsock reset بقى بيفرق أقل من زمان. و [[netsh winsock show catalog]] بيوريك هل فيه حاجة غريبة قبل ما تمسح. و [[netsh int ipv6 reset]] نفس فكرة int ip reset لـ IPv6.`,
            when: R`الجهاز ده بس اللي مفيهوش نت، بعد ما شلت VPN أو antivirus، بعد ما رجعت من شبكة كان عليها IP ثابت، أو «No internet» والواي فاي متصل.`,
            mistakes: R`تبدأ بـ Network reset أو int ip reset على طول قبل الخطوات الخفيفة. أو int ip reset على جهاز عليه IP ثابت مقصود (سيرفر في البيت) فيروح (هتلاقيه في اللوج). أو تنسى الـ restart وتقول «مفيش فايدة». أو [[/release]] من Remote Desktop فتفصل نفسك. أو تصلّح الجهاز والمشكلة أصلًا في الراوتر أو عند مزوّد الخدمة (الموبايل كمان مفيهوش نت).`
          },
          lines: [
            R`شوف مين متسجل في Winsock قبل ما تمسح (عرض بس).`,
            R`سيب الـ IP (النت بيقطع).`,
            R`اطلب IP جديد من الراوتر.`,
            R`امسح كاش الـ DNS.`,
            R`رجّع Winsock لأصله (أدمن، ومحتاج restart).`,
            R`رجّع إعدادات TCP/IP لأصلها، والـ IP الثابت بيروح، واللوج في الملف ده.`,
            R`restart دلوقتي عشان التصليح يكمل.`
          ],
          sol: R`السطر الأول طلّع عندي [[Description: MSAFD Tcpip [TCP/IP]]] و [[MSAFD Tcpip [UDP/IPv6]]] و [[RSVP TCP Service Provider]] و [[Hyper-V RAW]] و [[AF_UNIX]] و [[MSAFD L2CAP [Bluetooth]]] وفي الآخر [[E-mail Naming Shim Provider]] و [[Tcpip]] (دول namespace providers، والـ reset مش بيلمسهم). كله بتاع ويندوز، فـ winsock reset مش هيفرق على الجهاز ده. لو لقيت اسم برنامج (VPN أو antivirus أو «proxy» أو حاجة مش عارفها)، ده LSP وهو المشتبه فيه الأول.

(الخطوات نفسها مشغّلتهاش لأنها بتقطع النت وبتغيّر إعدادات الشبكة؛ ده من توثيق Microsoft.) [[netsh winsock reset]] بيطبع [[Successfully reset the Winsock Catalog.]] و [[You must restart the computer in order to complete the reset.]]. و [[netsh int ip reset C:\resetlog.txt]] بيطبع سطر [[Resetting ..., OK!]] لكل جزء، وفي الآخر [[Restart the computer to complete this action.]]. ومن CMD عادي الاتنين بيرفضوا ويطلبوا أدمن. واللوج فيه سطور زي [[reset ...\EnableDhcp]] وتحتها [[old REG_DWORD = 0]]، فلو كان عندك IP ثابت هتلاقيه هناك عشان ترجّعه.`
        },
        {
          cmd: "net share / net use",
          title: "شير فولدر ووصّل درايف شبكة",
          desc: R`[[net share]] بيعرض الفولدرات اللي جهازك عاملها شير على الشبكة، وبيعمل شير جديد أو يشيله. و [[net use]] الناحية التانية: بيوصّل فولدر متشير على جهاز تاني كدرايف بحرف (زي Z:)، ويعرض الدرايفات دي ويفصلها.

على الجهاز اللي فيه الملفات (CMD كأدمن):
[[net share Docs=D:\Docs /grant:Everyone,READ]] شير الفولدر D:\Docs باسم Docs. [[/grant:]] مين وإيه: [[READ]] قراية، و [[CHANGE]] قراية وكتابة، و [[FULL]] كل حاجة. وصلاحيات NTFS على الفولدر نفسه (درس icacls) لازم تسمح كمان، والأضيق من الاتنين هو اللي بيكسب. و [[/remark:"..."]] وصف.
[[net share]] لوحده: كل الشيرات. هتلاقي [[C$]] و [[ADMIN$]] و [[IPC$]]: شيرات إدارية ويندوز بيعملها لوحده، والـ [[$]] في آخر الاسم بتخفي الشير من لستة الأجهزة التانية.
[[net share Docs /delete]] شيل الشير (الفولدر نفسه مش بيتمسح).

على الجهاز التاني (مش محتاج أدمن):
[[net use Z: \\PC\Docs]] وصّل الشير كدرايف Z. و [[\\PC\Docs]] اسمه UNC path: اسم الجهاز (أو الـ IP) وبعده اسم الشير.
[[/user:PC\sara]] ادخل بيوزر من الجهاز التاني بدل يوزرك، و [[*]] بعد المسار يسألك على الباسورد.
[[/persistent:yes]] الدرايف يرجع لوحده بعد الـ restart.
[[net use]] لوحده: الدرايفات المتوصلة وحالتها، و [[net use Z: /delete]] افصل.

الشبكة لازم تبقى Private، و File and printer sharing مفعّل (Settings ثم Network & internet ثم Advanced network settings ثم Advanced sharing settings). و [[Everyone]] اسمه متترجم على ويندوز بلغة تانية زي Administrators (درس net localgroup).`,
          example: R`net share
net share Docs=D:\Docs /grant:Everyone,READ /remark:"Shared docs"
net use
net use Z: \\PC\Docs /persistent:yes
net use Y: \\192.168.1.50\Docs * /user:PC\sara
dir Z:\
net use Z: /delete
net use Y: /delete
net share Docs /delete`,
          try: R`اعرض الشيرات اللي على جهازك والدرايفات المتوصلة. ولو عندك جهازين على شبكة Private: شير فولدر قراية بس من واحد، ووصّله كدرايف على التاني، وبعدين شيل الاتنين.`,
          flag: "danger",
          deep: {
            why: R`تنقل ملفات بين جهازين في البيت أو المكتب من غير فلاشة ولا رفع على النت، أو فولدر مشترك لفريق صغير، أو سكربت باك أب بيكتب على جهاز تاني أو NAS. و [[net use]] كمان بيفتح جلسة ببيانات يوزر معين قبل أي أمر إدارة على الجهاز ده (درس shutdown /m).`,
            how: R`الشير بيشتغل ببروتوكول SMB على بورت 445. على الجهاز اللي عامل الشير، قواعد الفايروول «File and Printer Sharing» لازم تكون مفعّلة على الـ profile الحالي، وده بيحصل لوحده لما تشغّل File and printer sharing للشبكات الـ Private. لو الشبكة Public الشير مش هيبان، وده مقصود.

مين بيدخل؟ لما تفتح [[\\PC\Docs]]، الجهاز التاني بيطلب يوزر وباسورد موجودين عليه هو. لو نفس اسم اليوزر ونفس الباسورد على الجهازين بيدخل لوحده، غير كده [[/user:]]. لو اليوزر هناك حساب Microsoft اكتب الإيميل وباسورد الحساب (مش الـ PIN). ويوزر من غير باسورد مش بيدخل من الشبكة أصلًا.

الشيرات الإدارية ([[\\PC\C$]]) الدرايف كله، للأدمنز بس. وعلى أجهزة البيت (مش على دومين) فيه قيد اسمه UAC remote restrictions: يوزر محلي أدمن داخل من الشبكة بياخد توكن عادي، فـ [[C$]] بيطلع [[Access is denied]] حتى بباسورد صح. الحل اللي هتلاقيه على النت (قيمة [[LocalAccountTokenFilterPolicy]] في الريجستري) بيشيل الحماية دي خالص (التفاصيل في درس shutdown /m)، فاعمل شير عادي للفولدر اللي محتاجه بدل كده.

ويندوز 11 24H2 بقى بيطلب SMB signing افتراضيًا، و Pro (مش Home) قفل الدخول كـ guest من غير باسورد، فأجهزة NAS أو راوترات فيها USB ممكن متفتحش لحد ما تعمل عليها يوزر وباسورد. والمقابل في PowerShell: [[New-SmbShare]] و [[New-PSDrive]] (في تاب «PowerShell»).`,
            when: R`نقل ملفات في البيت أو المكتب، فولدر مشترك، درايف شبكة ثابت لسكربت باك أب، الوصول لـ NAS، أو جلسة بيوزر معين على [[IPC$]] قبل أوامر إدارة عن بعد.`,
            mistakes: R`شير بـ [[Everyone,FULL]] على فولدر فيه حاجات مهمة. أو شير على شبكة Public. أو [[net use]] من CMD أدمن ومتلاقيش الدرايف في Explorer: نافذة الأدمن ونافذتك العادية جلستين منفصلتين، فاعمله من CMD عادي. أو تتوصل لنفس الجهاز بيوزرين مختلفين فيطلع [[System error 1219]] ([[Multiple connections to a server or shared resource by the same user, using more than one user name, are not allowed.]])، والحل [[net use \\PC\IPC$ /delete]] أو [[net use * /delete]]. أو حرف الدرايف مستخدم ([[System error 85]]: [[The local device name is already in use.]]).`
          },
          lines: [
            R`الشيرات اللي جهازك عاملها، ومنها الإدارية C$ و ADMIN$ و IPC$.`,
            R`على جهاز الملفات: شير D:\Docs قراية بس للكل (أدمن).`,
            R`على الجهاز التاني: الدرايفات المتوصلة.`,
            R`وصّل الشير كدرايف Z، ويرجع بعد الـ restart.`,
            R`وصّل بالـ IP وبيوزر من الجهاز التاني، والـ [[*]] تسأل على الباسورد.`,
            R`افتحه زي أي درايف.`,
            R`افصل Z.`,
            R`وافصل Y.`,
            R`على جهاز الملفات: شيل الشير (الفولدر باقي).`
          ],
          sol: R`[[net share]] على جهاز مش عامل أي شير طلّع:
[[Share name   Resource   Remark]]
[[C$   C:\   Default share]] وكمان [[D$]] و [[E$]] لكل درايف
[[IPC$      Remote IPC]]
[[ADMIN$   C:\WINDOWS   Remote Admin]]
و [[net use]] طلّع [[New connections will be remembered.]] و [[There are no entries in the list.]]. الشيرات اللي بـ [[$]] ويندوز بيعملها لوحده، ومش بتبان في Network على الأجهزة التانية.

(الإنشاء والتوصيل والمسح مشغّلتهمش عشان ميغيّروش شيرات الجهاز.) من CMD أدمن [[net share Docs=D:\Docs /grant:Everyone,READ]] بيطبع [[Docs was shared successfully.]]، و [[net use Z: \\PC\Docs]] بيطبع [[The command completed successfully.]]، و [[net use Z: /delete]] بيطبع [[Z: was deleted successfully.]]. ولو الجهاز التاني مش باين: [[System error 53 has occurred.]] و [[The network path was not found.]] (طلّعها عندي [[net view \\IP]] على موبايل على الشبكة)، ولو الباسورد غلط: [[System error 1326 has occurred.]] و [[The user name or password is incorrect.]].`
        },
        {
          cmd: "ping -a و nbtstat -A",
          title: "مين الأجهزة دي؟ اسم الجهاز من الـ IP",
          desc: R`بعد ما [[arp -a]] يوريك IPs الأجهزة اللي على شبكتك (درس arp / route)، الأوامر دي بتحاول تعرف اسم كل جهاز: [[ping -a]] و [[nbtstat -A]] و [[nslookup]]. كل واحد بيسأل بطريقة مختلفة وكتير منهم مش هيلاقي، فجرّب التلاتة. واستخدمهم على شبكتك انت أو بإذن صاحبها بس.

[[ping -a 192.168.1.20]] الـ [[-a]] بتخلّي ping يحوّل الـ IP لاسم قبل ما يبدأ، والاسم بيظهر في أول سطر: [[Pinging NAME [192.168.1.20]]]. لو ملقاش اسم بيكتب الـ IP بس. بيدوّر في ملف hosts الأول، وبعدين بكل الطرق اللي ويندوز يعرفها (DNS و mDNS و LLMNR و NetBIOS).
[[nbtstat -A 192.168.1.20]] (A كابيتال: بالـ IP) بيسأل الجهاز نفسه بـ NetBIOS عن اسمه، ويرد بجدول فيه اسم الجهاز ([[<00> UNIQUE]]) والـ workgroup ([[<00> GROUP]]) و [[<20>]] لو بيعمل شير، والـ MAC. بيشتغل بس لو الجهاز التاني ويندوز (أو Samba) و NetBIOS over TCP/IP شغال عليه وفايروله سامح. و [[nbtstat -a NAME]] (a صغيرة) العكس، بالاسم. و [[nbtstat -n]] الأسامي اللي جهازك نفسه معلنها.
[[nslookup 192.168.1.20]] بيسأل سيرفر الـ DNS (غالبًا الراوتر) عن اسم الـ IP (reverse lookup). راوترات بتسجّل أسامي الأجهزة اللي أخدت منها IP، وراوترات لأ.

[[net view]] زمان كان بيعرض كل الأجهزة اللي على الشبكة. على ويندوز 10 و 11 غالبًا بيطلّع [[System error 6118 has occurred.]] و [[The list of servers for this workgroup is not currently available]]، لأن الخدمة اللي كانت بتعمل اللستة دي (Computer Browser) اتشالت مع SMB1. و [[net view \\PC]] لسه بيعرض شيرات جهاز معين.`,
          example: R`arp -a
ping -a -n 1 192.168.1.1
nbtstat -A 192.168.1.20
nslookup 192.168.1.20
nbtstat -n
net view
net view \\192.168.1.20`,
          try: R`على شبكة بيتك: [[arp -a]]، وخد IP جهاز تاني (موبايل أو تليفزيون أو لابتوب)، وجرّب عليه الأوامر التلاتة وشوف أنهي واحد عرف اسمه. وقارن بلستة الأجهزة في صفحة الراوتر.`,
          deep: {
            why: R`عايز توصل لطابعة أو Raspberry Pi أو جهاز تاني في البيت ومش عارف عنوانه، أو بتراجع مين متوصل بالواي فاي بتاعك (جهاز غريب في arp يبقى حد معاه الباسورد). الـ IP لوحده مش بيقول حاجة، الاسم أو الـ MAC هما اللي بيقولوا.`,
            how: R`الأجهزة بتعلن أسماءها بأكتر من طريقة: NetBIOS (ويندوز تقريبًا بس، وقديم)، و LLMNR و mDNS (أجهزة أبل وطابعات وأجهزة كتير، وأسماء بتخلص بـ [[.local]])، والراوتر نفسه لو بيسجّل الأسماء في الـ DNS بتاعه. [[ping -a]] بيستخدم الـ resolver بتاع ويندوز اللي بيجرّب كل ده، و [[nslookup]] بيسأل DNS بس، و [[nbtstat]] NetBIOS بس.

الـ MAC: أول 3 أجزاء منه بتقول الشركة المصنّعة (دوّر عليها في أي موقع «MAC vendor lookup»). بس لو الحرف التاني في الـ MAC [[2]] أو [[6]] أو [[A]] أو [[E]]، ده MAC عشوائي (locally administered): موبايلات ولابتوبات حديثة بتعمل MAC مختلف لكل شبكة عشان الخصوصية، فالبحث مش هيفيد. و [[TTL]] في رد ping بيدّي فكرة: 128 غالبًا ويندوز، و 64 غالبًا لينكس أو أندرويد أو أجهزة أبل أو راوتر.

[[arp -a]] بيعرض بس الأجهزة اللي جهازك كلّمها قريب. عشان يبقى فيه كل اللي على الشبكة لازم تكلمهم الأول، مثلًا loop بيعمل ping لكل عنوان (درس for و delayed expansion):
[[for /l %i in (1,1,254) do @ping -n 1 -w 200 192.168.1.%i | find "TTL="]]
بيطبع اللي رد بس، وبعدها [[arp -a]] يبقى فيه الكل (حتى الأجهزة اللي فايرولها بيمنع ping بتبان في arp غالبًا). جوه ملف bat اكتب [[%%i]] بدل [[%i]]. وفي PowerShell نفس الفكرة أسرع بالتوازي، و [[Get-NetNeighbor]] بدل arp (في تاب «PowerShell»). وده على شبكتك بس: اللف على شبكة مش بتاعتك (الشغل أو كافيه) ممكن يتعتبر فحص غير مصرّح بيه.`,
            when: R`بتدوّر على IP طابعة أو Raspberry Pi أو جهاز في البيت، بتراجع مين على الواي فاي بتاعك، أو قبل SSH أو Remote Desktop لجهاز مش فاكر عنوانه.`,
            mistakes: R`[[nbtstat -a]] بالـ IP (الصغيرة للاسم والكابيتال للـ IP). أو تفتكر إن مفيش اسم يبقى الجهاز مش موجود (موجود بس مش معلن اسمه، أو فايروله بيمنع). أو تصدّق اسم [[ping -a]] من غير ما تبص على ملف hosts (الحل تحت). أو تعتمد على [[net view]]. أو تلف على شبكة مش بتاعتك.`
          },
          lines: [
            R`الـ IPs والـ MACs اللي جهازك يعرفها على الشبكة.`,
            R`IP لاسم: الاسم بيظهر في أول سطر لو اتعرف.`,
            R`اسأل الجهاز بـ NetBIOS عن اسمه وجروبه والـ MAC.`,
            R`اسأل DNS الراوتر عن اسم الـ IP.`,
            R`الأسامي اللي جهازك نفسه معلنها.`,
            R`زمان كانت لستة الأجهزة، دلوقتي غالبًا error 6118.`,
            R`شيرات جهاز معين (لو SMB مفتوح عليه).`
          ],
          sol: R`جرّبت على شبكة بيتي. [[arp -a]] كان فيه الراوتر بس ([[192.168.1.1]])، وبعد loop صغير على 4 عناوين رد [[192.168.1.4]] بـ [[TTL=64]]، و arp بقى فيه [[192.168.1.4  46-d5-d9-xx-xx-xx  dynamic]]. الحرف التاني [[6]]: MAC عشوائي، يعني موبايل غالبًا.

[[ping -a 192.168.1.4]] طبع [[Pinging host.docker.internal [192.168.1.4]]]! الاسم ده من ملف hosts: Docker Desktop كتب فيه عنوان اللابتوب لما كان [[.4]] ([[192.168.1.4 host.docker.internal]])، وبعدين الراوتر ادّى نفس العنوان للموبايل. يعني [[ping -a]] ممكن يدّيك اسم غلط تمامًا (درس hosts). و [[nbtstat -A 192.168.1.4]] طبع [[Host not found.]] تحت كل كارت، و [[nslookup 192.168.1.4]] طبع [[*** UnKnown can't find 192.168.1.4: Non-existent domain]] و [[Server: UnKnown]] و [[Address: fe80::1]] (الراوتر نفسه هو الـ DNS، بعنوان IPv6)، و [[net view \\192.168.1.4]] طبع [[System error 53 has occurred.]]. وعلى الراوتر نفس النتيجة: [[ping -a 192.168.1.1]] من غير اسم.

اللي اشتغل: [[ping -a 192.168.1.2]] (اللابتوب نفسه) طبع [[Pinging ALI-PC.home [192.168.1.2]]] ([[.home]] الدومين اللي الراوتر بيوزّعه)، و [[nbtstat -n]] طبع [[ALI-PC <00> UNIQUE Registered]] و [[ALI-PC <20> UNIQUE Registered]] و [[WORKGROUP <00> GROUP Registered]]. و [[net view]] لوحده طبع [[System error 6118 has occurred.]]. الخلاصة: على شبكات البيت الحديثة غالبًا مش هتلاقي أسماء بالأوامر دي، وصفحة الراوتر (Connected devices أو DHCP clients) هي اللي فيها اسم كل جهاز والـ MAC.`
        },
        {
          cmd: "mstsc",
          title: "Remote Desktop: افتح جهاز ويندوز تاني",
          desc: R`[[mstsc]] هو برنامج Remote Desktop Connection: بيفتح شاشة جهاز ويندوز تاني في نافذة عندك، وتشتغل عليه كأنك قدامه. الإضافات بتتكتب بـ [[/]] وبعدها [[:]] والقيمة.

[[/v:PC]] الجهاز (اسم أو IP)، و [[/v:PC:3390]] لو بورت غير الافتراضي 3389.
[[/f]] full screen (و Ctrl+Alt+Break بيبدّل بين full screen والنافذة).
[[/w:1600 /h:900]] حجم النافذة.
[[/multimon]] استخدم كل شاشاتك زي ما هي متركبة عندك، و [[/span]] شاشة واحدة كبيرة على شاشات جنب بعض بنفس الدقة.
[[/admin]] جلسة الإدارة على Windows Server.
[[/prompt]] اسأل على اليوزر والباسورد حتى لو محفوظين.
[[/public]] متحفظش الباسورد ولا صور الشاشة على الجهاز ده (لما تكون على جهاز مش بتاعك).
[[/edit file.rdp]] افتح ملف اتصال للتعديل. أي إعدادات بتظبطها من Show Options وتحفظها بـ Save As بتبقى ملف [[.rdp]]، ودبل كليك عليه بيتصل على طول.

العميل (اللي بيفتح جهاز تاني) شغال في أي نسخة ويندوز. لكن الجهاز اللي هيتفتح لازم يبقى Pro أو أعلى: Home مينفعش يستقبل Remote Desktop خالص. لو جهازك Home وعايز حد يساعدك عليه عن بعد، فيه Quick Assist جاي مع ويندوز، أو برامج زي Chrome Remote Desktop.`,
          example: R`mstsc /v:192.168.1.50
mstsc /v:office-pc:3390 /f
mstsc /v:192.168.1.50 /w:1600 /h:900 /prompt
mstsc /v:192.168.1.50 /multimon
mstsc /edit "%USERPROFILE%\Documents\office.rdp"
reg add "HKLM\SYSTEM\CurrentControlSet\Control\Terminal Server" /v fDenyTSConnections /t REG_DWORD /d 0 /f
netsh advfirewall firewall set rule group="remote desktop" new enable=Yes`,
          try: R`لو عندك جهاز Pro في البيت: فعّل Remote Desktop عليه من Settings، وافتحه من جهازك بـ [[mstsc /v:]] والـ IP، وجرّب [[/w /h]] و [[/f]]. لو الاتنين Home: افتح [[mstsc]] لوحده، واتفرج على Show Options، واحفظ ملف rdp وافتحه بـ [[/edit]].`,
          flag: "danger",
          deep: {
            why: R`تشتغل على جهاز البيت من اللابتوب، أو على سيرفر ويندوز (VPS ويندوز أو جهاز في الشغل)، أو تساعد حد في البيت من أوضة تانية. Remote Desktop مدمج في ويندوز، وبينقل الكليبورد، وبيدعم أكتر من شاشة، وبيقدر يوصّل درايفاتك جوه الجلسة (Show Options ثم Local Resources).`,
            how: R`البروتوكول اسمه RDP على بورت 3389. على الجهاز اللي هيتفتح (Pro): Settings ثم System ثم Remote Desktop، أو من CMD أدمن السطرين الأخيرين في المثال: قيمة الريجستري [[fDenyTSConnections]] = 0 معناها «متمنعش اتصالات Remote Desktop»، و [[set rule group="remote desktop" new enable=Yes]] بيفعّل كل قواعد الفايروول اللي في الجروب ده. اسم الجروب بيتترجم على ويندوز بلغة تانية، فالـ Settings أضمن.

مين يدخل: الأدمنز وأعضاء [[Remote Desktop Users]] (درس net localgroup)، ولازم اليوزر عنده باسورد. الدخول بيعمل sign out للي قاعد قدام الجهاز، لأن ويندوز العادي جلسة واحدة بس في المرة. و Network Level Authentication (مفعّل افتراضيًا) بيخلّي الجهاز يطلب اليوزر والباسورد قبل ما يفتح أي حاجة.

الأمان: متفتحش 3389 على النت (port forwarding في الراوتر). فيه بوتات بتلف على النت كله طول اليوم تجرّب باسوردات على أي 3389 مفتوح، وثغرات في RDP اتستغلت قبل كده. لو محتاج توصل من برا البيت: VPN أو Tailscale (شبكة خاصة بين أجهزتك)، وبعدين mstsc على عنوان الجهاز جوه الشبكة دي. ولتشغيل أوامر على جهاز تاني من غير شاشة: OpenSSH Server أو [[Enter-PSSession]] (في تاب «PowerShell»).`,
            when: R`جهاز Pro في البيت أو الشغل، سيرفر ويندوز، مساعدة حد على شبكتك، أو اختصارات بملفات rdp جاهزة لكذا جهاز.`,
            mistakes: R`تحاول تفعّله على Home. أو تفتح 3389 في الراوتر للنت. أو يوزر من غير باسورد. أو تنسى إن الدخول بيقفل جلسة اللي قاعد على الجهاز. أو تحفظ الباسورد في ملف rdp على جهاز مش بتاعك (استخدم [[/public]]). أو تفعّل الريجستري وتنسى الفايروول أو العكس، فيطلع «Remote Desktop can't connect to the remote computer».`
          },
          lines: [
            R`افتح جهاز بالـ IP على البورت الافتراضي 3389.`,
            R`جهاز بالاسم على بورت 3390، و full screen.`,
            R`نافذة 1600 في 900، واسألني على اليوزر والباسورد.`,
            R`استخدم كل الشاشات اللي عندي.`,
            R`عدّل ملف اتصال محفوظ.`,
            R`على الجهاز اللي هيتفتح (Pro، أدمن): اسمح بـ Remote Desktop.`,
            R`وفعّل قواعده في الفايروول.`
          ],
          sol: R`(مشغّلتش mstsc لأنه برنامج بواجهة بيتصل بجهاز تاني، والجهاز ده Home؛ اللي جاي من توثيق Microsoft ومن أوامر عرض بس.) [[mstsc /?]] نفسه مش بيطبع في CMD، بيفتح نافذة فيها الإضافات. [[mstsc /v:IP]] بيفتح نافذة الاتصال، ولو الجهاز مش بيرد بتطلع رسالة «Remote Desktop can't connect to the remote computer» وفيها 3 أسباب: Remote access مش مفعّل، أو الجهاز مقفول، أو مش على الشبكة.

على جهازي (Home): [[netsh advfirewall firewall show rule name=all dir=in | findstr /i /c:"Remote Desktop"]] مطلّعش ولا سطر، و [[net localgroup "Remote Desktop Users"]] طلّع [[System error 1376 has occurred.]]، و [[sc query TermService]] طلّع [[STATE : 1 STOPPED]] و [[sc qc TermService]] فيه [[DISPLAY_NAME : Remote Desktop Services]]. يعني Home فيه الخدمة بس من غير الباقي، ومفيش طريقة رسمية تخلّيه يستقبل. على Pro بعد ما تفعّله، نفس أمر الفايروول بيطلّع قواعد زي [[Remote Desktop - User Mode (TCP-In)]].`
        },
        {
          cmd: "shutdown /m",
          title: "restart أو إيقاف لجهاز تاني على الشبكة",
          desc: R`[[shutdown /m \\PC]] بيبعت أمر الإيقاف أو الـ restart لجهاز تاني على شبكتك بدل جهازك، بنفس إضافات درس shutdown. و [[shutdown /i]] بيفتح نافذة Remote Shutdown تختار منها أكتر من جهاز.

[[/m \\PC]] الجهاز التاني، باسمه أو الـ IP، والـ [[\\]] لازمة.
[[/r]] restart، أو [[/s]] إيقاف.
[[/t 60]] بعد دقيقة، واللي قاعد قدام الجهاز بيشوف إشعار، و [[/c "..."]] رسالة بتظهر فيه.
[[/a /m \\PC]] الغي إيقاف متجدول على الجهاز ده.
[[/d p:4:1]] سبب، و [[p]] يعني planned، بيتسجل في Event Log على الجهاز التاني.
[[/i]] النافذة الرسومية، ولازم تبقى أول إضافة.

الشروط على الجهاز التاني، ومن غيرها هتشوف [[Access is denied.(5)]] أو [[The network path was not found.(53)]]:
لازم تكون أدمن عليه، والأدمن ده يقدر يدخل من الشبكة. الأسهل تفتح جلسة بيوزره الأول: [[net use \\PC\IPC$ /user:PC\admin *]] (درس net share / net use)، وبعدها shutdown بيستخدمها.
الشبكة Private و File and printer sharing مفعّل، لأن shutdown بيكلم الجهاز على SMB (بورت 445).
على أجهزة البيت (مش على دومين)، أدمن محلي داخل من الشبكة بيتشال منه الأدمن (UAC remote restrictions، تحت)، فممكن تاخد Access is denied حتى بباسورد صح.`,
          example: R`net use \\192.168.1.50\IPC$ /user:OFFICE-PC\admin *
shutdown /r /m \\192.168.1.50 /t 60 /c "Restarting for updates in 1 minute"
shutdown /a /m \\192.168.1.50
shutdown /s /m \\192.168.1.50 /t 0 /d p:0:0
net use \\192.168.1.50\IPC$ /delete
shutdown /i`,
          try: R`لو عندك جهازين في البيت وانت أدمن على التاني: جدول restart عليه بعد 10 دقايق برسالة، واتأكد إن الإشعار ظهر هناك، وبعدين الغيه بـ [[/a /m]]. ومن غير جهاز تاني: اقرا الشروط وخمّن هتقابل أنهي error ولّا لأ.`,
          flag: "danger",
          deep: {
            why: R`جهاز في أوضة تانية أو مكتب تاني محتاج restart بعد تحديث، أو أجهزة معمل عايز تقفلها آخر اليوم بسكربت واحد بدل ما تقوم لكل واحد. وكمان بتفهم من الدرس ده ليه أي أمر إدارة عن بعد على أجهزة البيت بيقول Access denied.`,
            how: R`shutdown بيكلم الجهاز التاني بـ RPC جوه SMB (بروتوكول Remote Shutdown)، فالمحتاج هو نفس اللي الشير محتاجه: بورت 445 مفتوح في الفايروول، ويوزر من الجهاز التاني يدخل من الشبكة. والجهاز التاني بيتأكد إن اليوزر عنده صلاحية «Force shutdown from a remote system» ([[SeRemoteShutdownPrivilege]])، ودي افتراضيًا للأدمنز بس.

القيد الكبير: UAC remote restrictions. على جهاز مش على دومين، أي يوزر محلي في Administrators (غير الأدمن المدمج) لما يدخل من الشبكة بيتشال منه الأدمن، زي سطر [[Group used for deny only]] اللي في النافذة العادية (درس whoami /groups /priv). Microsoft بتوثّق إن قيمة [[LocalAccountTokenFilterPolicy]] = 1 في [[HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System]] بتشيل القيد ده، بس ده بيخلّي أي حد معاه باسورد (أو hash) أي أدمن محلي يتحكم في الجهاز كله من الشبكة، وده طريق مشهور لهجمات بتنتشر من جهاز لجهاز. استخدمها على أجهزتك بس ولو فاهم ده، والأحسن OpenSSH Server أو PowerShell Remoting ([[Restart-Computer -ComputerName]] في تاب «PowerShell»).

Remote Registry متقفل افتراضيًا على ويندوز 11 (جرّبت [[sc qc RemoteRegistry]] وطلع [[START_TYPE : 4 DISABLED]]). shutdown.exe الحديث مش محتاجه غالبًا، لكن أدوات تانية زي [[net rpc shutdown]] من لينكس (اللي Home Assistant بيستخدمه مثلًا) بتعدّي عليه، فساعتها لازم يشتغل على الجهاز التاني.

[[shutdown /i]] بيفتح نافذة: Add تضيف أسامي أجهزة، وتختار Restart أو Shutdown والرسالة والسبب. وأرقام الأسباب ([[p:4:1]] يعني Application: Maintenance (Planned)) كلها في [[shutdown /?]].`,
            when: R`restart لجهاز تاني بعد تحديث أو تسطيب، إيقاف أجهزة معمل أو مكتب صغير آخر اليوم، أو جهاز شغال سيرفر في البيت محتاج restart من اللابتوب.`,
            mistakes: R`[[/t 0]] على جهاز حد شغال عليه فيضيع شغله، و [[/t]] أكبر من صفر معناها [[/f]] (البرامج بتتقفل غصب). أو تنسى [[\\]] قبل الاسم. أو تشغّل [[LocalAccountTokenFilterPolicy]] على كل الأجهزة «عشان تمشي». أو تفتح 445 على Public. أو تغلط في الـ IP فتقفل جهاز حد تاني. أو تنسى [[net use ... /delete]] فالجلسة بباسورد الأدمن تفضل مفتوحة.`
          },
          lines: [
            R`افتح جلسة بيوزر أدمن من الجهاز التاني (هيسأل على الباسورد).`,
            R`restart بعد دقيقة، والرسالة بتظهر للي قدامه.`,
            R`الغيه.`,
            R`إيقاف فوري بسبب مخطط.`,
            R`اقفل الجلسة.`,
            R`النافذة الرسومية لأكتر من جهاز.`
          ],
          sol: R`(مشغّلتهوش لأنه بيقفل جهاز تاني؛ ده من توثيق shutdown و UAC.) لو كل حاجة مظبوطة: [[shutdown /r /m \\192.168.1.50 /t 600 /c "Test"]] مش بيطبع حاجة عندك، والجهاز التاني بيطلّع إشعار إنه هيعمل restart وفيه الرسالة، و [[shutdown /a /m \\192.168.1.50]] بيلغيه.

الأخطاء بتطلع بالشكل [[192.168.1.50: Access is denied.(5)]]: اليوزر مش أدمن هناك، أو أدمن محلي اتشالت صلاحياته على الشبكة، أو جلسة [[IPC$]] مفتوحة بيوزر تاني. و [[The network path was not found.(53)]]: الجهاز مقفول، أو الاسم غلط، أو File and printer sharing مقفول، أو الشبكة Public. و [[net use \\PC\IPC$]] بباسورد غلط: [[System error 1326 has occurred.]] و [[The user name or password is incorrect.]] (النصوص دي طلّعتها بـ [[net helpmsg 53]] و [[net helpmsg 1326]]).`
        }
      ]
    },
    {
      t: "المتغيرات والاختصارات",
      l: 2,
      n: "",
      items: [
        {
          cmd: "set / setx",
          title: "متغيرات البيئة",
          desc: R`متغيرات البيئة قيم بيشوفها أي برنامج بتشغّله، زي [[PATH]] (الفولدرات اللي بيدوّر فيها على البرامج) و [[USERPROFILE]] و [[TEMP]]. [[set]] لوحده بيعرضهم كلهم، و [[set PORT=3000]] بيعمل متغير للنافذة دي بس، ومن غير مسافات حوالين [[=]]. وبتقرا القيمة بالمتغير بين علامتين [[%]]: [[echo %PORT%]]، زي [[$PORT]] في bash.

[[setx]] بيحفظ المتغير دايمًا في إعدادات اليوزر، بس بيظهر في النوافذ الجديدة بس، مش في اللي انت فيها. والقيمة اللي فيها مسافات أو رموز بين علامات تنصيص.

تحذير مهم: متعملش [[setx PATH "%PATH%;..."]] أبدًا. [[%PATH%]] في النافذة دي هو PATH النظام واليوزر لازقين في بعض، و setx بيكتبهم كلهم في PATH اليوزر، وبيقص أي حاجة بعد 1024 حرف. عدّل الـ PATH من Edit environment variables في ويندوز. وفي ملفات bat المتغيرات بتتعمل بنفس الطريقة، والتفاصيل في «set و %1» و «setlocal / endlocal».`,
          example: R`set
set PORT=3000
echo %PORT%
echo %PATH%
setx API_URL "http://localhost:3000"`,
          try: "اعمل set لمتغير واطبعه، وافتح نافذة جديدة ولاحظ إنه مش موجود.",
          deep: {
            why: "متغيرات البيئة في CMD. [[set]] للجلسة الحالية، [[setx]] للحفظ الدائم.",
            how: R`[[set VAR=value]] بيضبط المتغير للجلسة الحالية بس. [[echo %VAR%]] بيقراه (نسبة مئوية من الطرفين).

[[setx VAR value]] بيحفظ دائم في الـ registry للـ user. بيأثر على الجلسات الجديدة مش الحالية.

[[setx VAR value /m]] للـ System (كل المستخدمين)، محتاج Admin.

[[set]] من غير حاجة بيعرض كل المتغيرات. [[set JAVA]] بيعرض المتغيرات اللي بتبدأ بـ JAVA.`,
            when: "تضبط JAVA_HOME أو NODE_ENV. (الـ PATH عدّله من System Properties مش بـ setx.)",
            mistakes: "set بيضيف المسافات لو كتبت [[set VAR = value]] (مسافة قبل وبعد =). اكتب [[set VAR=value]] بدون مسافات."
          },
          lines: [
            "كل المتغيرات.",
            "متغير للجلسة دي بس. من غير مسافات حوالين =.",
            "اقراه: النسبة المئوية من الطرفين.",
            "الـ PATH.",
            "متغير دائم لليوزر (بيظهر في النوافذ الجديدة بس)."
          ],
          sol: R`[[set PORT=3000]] وبعدين [[echo %PORT%]] بيطبع [[3000]]. افتح نافذة CMD جديدة واكتب [[echo %PORT%]]: هيطبع [[%PORT%]] زي ما هي، لأن CMD لما المتغير مش موجود بيسيب الكلام زي ما هو بدل ما يطبع فاضي.

لو عايزه يفضل استخدم [[setx PORT 3000]]، هيقولك [[SUCCESS: Specified value was saved.]]، بس في النافذة الحالية [[echo %PORT%]] مش هتتأثر، النوافذ الجديدة بس. (setx مجربتهوش هنا لأنه بيكتب في الـ registry بشكل دائم؛ الرسالة من توثيق setx على Microsoft Learn، وإنه بيأثر على النوافذ الجديدة بس مكتوب في [[setx /?]].) وخد بالك من [[set PORT = 3000]] بمسافات، ده بيعمل متغير اسمه [["PORT "]] بمسافة وقيمته [[" 3000"]]: جربتها و [[echo [%PORT %]]] طبع [[[ 3000]]].`
        },
        {
          cmd: "doskey",
          title: "اختصارات",
          desc: R`[[doskey]] بيعمل اختصارات (macros) للأوامر الطويلة، زي [[alias]] في bash. الشكل: الاسم الجديد، و [[=]]، والأمر الحقيقي. فـ [[doskey gs=git status]] بيخلي [[gs]] تشغّل git status.

[[$*]] جوه الـ macro معناها «أي حاجة اتكتبت بعد الاختصار»، فـ [[ll src]] بتبقى [[dir /a src]]. وفيه [[$1]] و [[$2]] للـ arguments بالترتيب، و [[$T]] بتفصل أمرين جوه macro واحد. و [[doskey /macros]] بيعرض اللي عملته.

الاختصارات دي بتروح لما تقفل النافذة، ومش بتشتغل جوه ملفات bat ولا في PowerShell. عشان تفضل: حطها في ملف macros.txt (كل سطر [[gs=git status]]) وحمّله بـ [[doskey /macrofile=macros.txt]]. و F7 في CMD بيفتح قايمة بالأوامر اللي كتبتها، و F8 بيكمّل من التاريخ.`,
          example: R`doskey ll=dir /a $*
doskey gs=git status`,
          try: "اعمل alias اسمه ll وجربه.",
          deep: {
            why: R`أوامر طويلة بتكتبها كل يوم ([[git status]] و [[dir /a]] و [[cd /d D:\projects\shop]]). doskey بيخليها كلمتين، زي alias في bash. بس بيضيع مع النافذة، فلازم تعرف تحفظه.`,
            how: R`[[doskey ls=dir /w $*]] بيعمل alias [[ls]] يشغّل [[dir /w]]. [[$*]] هي الـ arguments اللي بتتمرر.

[[doskey /macros]] بيعرض كل الـ macros المعمولة.

للحفظ الدائم: اعمل ملف .bat بيه كل الـ doskey commands، وضيفه في autorun في الـ registry: [[HKCU\Software\Microsoft\Command Processor\AutoRun]].`,
            when: "اختصارات للأوامر الطويلة في CMD.",
            mistakes: R`تفتكر الاختصار هيشتغل جوه ملف bat (مش هيشتغل، الـ bat بيشوف الأوامر الحقيقية بس). أو تسمّي اختصار باسم أمر موجود فيغطّي عليه. أو تتعب في الـ registry (AutoRun) وتنسى إنه بيشتغل مع كل cmd بيتفتح حتى جوه سكربتات وبرامج تانية.`
          },
          lines: ["اختصار: [[ll]] تبقى dir /a، و [[$*]] بيمرر أي arguments.", "اختصار لـ git status."],
          sol: R`[[doskey ll=dir /a $*]] مش بيطبع حاجة. [[ll]] بعدها بيطبع dir بالملفات المخفية، و [[ll src]] بيعرض src لأن [[$*]] بتاخد أي حاجة بعد ll.

الـ alias بيروح لما تقفل النافذة، ومش بيشتغل في PowerShell ولا جوه ملفات bat. لو [[ll]] قالك is not recognized، يبقى انت في نافذة جديدة أو في PowerShell. و [[doskey /macros]] بيعرض كل الـ aliases اللي عملتها.`
        }
      ]
    },
    {
      t: "شكّل CMD بتاعك",
      l: 2,
      n: R`الألوان والـ prompt والعنوان والحجم، وإزاي تخليهم يفتحوا معاك في كل نافذة`,
      items: [
        {
          cmd: "color",
          title: "لوّن شاشة CMD",
          desc: R`[[color]] بيغيّر لون الخلفية ولون الكلام في نافذة CMD كلها مرة واحدة. بياخد رقمين لازقين في بعض: الأول للخلفية والتاني للكلام، فـ [[color 0A]] يعني خلفية سودا وكلام أخضر فاتح.

الأرقام hex، يعني العد بيكمّل بعد 9 بحروف: [[A]] هي 10 لحد [[F]] هي 15، والحرف كابيتال أو سمول زي بعض. ده الجدول اللي بيطبعه [[color /?]]، وأي رقم ينفع للخلفية أو للكلام، والفاتح من كل لون هو رقمه زائد 8:
[[0]] أسود و [[8]] رمادي
[[1]] أزرق و [[9]] أزرق فاتح
[[2]] أخضر و [[A]] أخضر فاتح
[[3]] تركواز (Aqua) و [[B]] تركواز فاتح
[[4]] أحمر و [[C]] أحمر فاتح
[[5]] بنفسجي و [[D]] بنفسجي فاتح
[[6]] أصفر غامق و [[E]] أصفر فاتح
[[7]] أبيض (شكله رمادي فاتح) و [[F]] أبيض ساطع

[[color]] لوحدها بترجّع الألوان اللي النافذة فتحت بيها. ولو الرقمين زي بعض ([[color 77]]) الأمر مش بيتنفذ، لأن الكلام هيختفي في الخلفية، وبيحط errorlevel بـ 1 (درس if و errorlevel). ورقم واحد بس ([[color A]]) بيبقى لون الكلام والخلفية سودا. وأي حاجة مش hex زي [[color 0Z]] بتطبع صفحة المساعدة ومش بتغيّر حاجة.

اللون بيتغيّر للشاشة كلها، حتى الكلام اللي اتكتب قبل كده، وبيفضل لحد ما تقفل النافذة. في نافذة CMD القديمة (conhost) الـ 16 لون جايين من جدول ألوان النافذة (كليك يمين على العنوان، Properties، Colors). وفي Windows Terminal نفس الأرقام بتتحوّل لألوان الـ color scheme بتاع البروفايل، فـ [[A]] بتبقى «الأخضر الفاتح» بتاع الـ scheme اللي انت مختاره، ودرجته ممكن تختلف. ولو عايز ألوان دايمة في Windows Terminal، غيّر Color scheme من إعدادات البروفايل بدل color.`,
          example: R`color /?
color 0A
color 1F
color 77
echo %errorlevel%
color`,
          try: R`جرّب [[color 0A]] و [[color 1F]] و [[color E0]]، وبعدين [[color 77]] واطبع [[%errorlevel%]]، وفي الآخر [[color]] لوحدها. ولو عندك Windows Terminal، جرّب نفس الأوامر فيه وفي النافذة القديمة (اكتب [[conhost]] في Win+R) وقارن الدرجات.`,
          deep: {
            why: R`عشان تفرّق بين النوافذ بعينك: نافذة السيرفر لون، ونافذة الأدمن لون، ونافذة متوصلة بـ production أحمر يفكّرك تاخد بالك. وفي سكربتات bat اللون بيلفت النظر لرسالة نجاح أو فشل.`,
            how: R`[[color]] أمر داخلي في cmd.exe، بيغيّر «اللون الافتراضي» للنافذة ويعيد تلوين كل الخانات اللي على الشاشة، عشان كده الكلام القديم بيتلوّن كمان. والأرقام مش ألوان ثابتة: كل رقم مكان في جدول من 16 لون. الجدول ده في الكونسول القديم من Properties ثم Colors (وفي ويندوز 10 و 11 افتراضيًا scheme اسمه Campbell)، وفي Windows Terminal من الـ color scheme بتاع البروفايل.

اللون اللي [[color]] لوحدها بترجعله جاي من واحد من تلاتة (زي ما [[color /?]] بيقول): [[/T]] لو النافذة اتفتحت بـ [[cmd /t:0A]]، أو قيمة [[DefaultColor]] في الريجستري تحت [[HKCU\Software\Microsoft\Command Processor]]، أو ألوان النافذة لما فتحت. جرّبت في نافذة conhost: في CMD عادي (اللي بتفتحه وتكتب فيه) [[color]] رجّعت الأسود والرمادي و errorlevel 0. لكن في سكربت متشغّل بـ [[cmd /c]] (وده اللي بيحصل في الدبل كليك على ملف bat) [[color]] لوحدها مغيّرتش حاجة ورجّعت errorlevel 1. فجوه السكربتات اكتب اللون صريح: [[color 07]].

[[color]] بيلوّن الشاشة كلها بس. لون لكلمة واحدة (زي OK أخضر و FAIL أحمر في نفس السطر) محتاج ANSI codes، ودي في درس prompt.

Windows Terminal: [[color]] شغال فيه، بس فيه نسخ كان فيها bugs معاه (زي إن الجزء الفاضي من الشاشة يرجع للون البروفايل بعد ما الكلام يعمل scroll). لو شفت حاجة زي كده، ده مش من عندك.`,
            when: R`نافذة شغال فيها سيرفر أو متوصلة بـ production وعايزها تبان مختلفة، أو سكربت bat بيقلب أحمر لو حصل خطأ ([[color 4F]] قبل رسالة الفشل)، أو نافذة أدمن تميّزها من أول نظرة.`,
            mistakes: R`[[color 77]] أو أي رقمين زي بعض وتستغرب إن مفيش حاجة حصلت. أو تفتكر إن color بيلوّن اللي جاي بس، وهو بيلوّن الشاشة كلها. أو [[color green]] (لازم أرقام). أو خلفية فاتحة وكلام فاتح ([[color EF]]) فمتقراش حاجة. أو تشغّل سكربت فيه color من CMD مفتوح وتنسى إن اللون هيفضل في النافذة بعد ما السكربت يخلص.`
          },
          lines: [
            R`جدول الـ 16 لون والشرح.`,
            R`خلفية سودا ([[0]]) وكلام أخضر فاتح ([[A]]).`,
            R`خلفية زرقا ([[1]]) وكلام أبيض ساطع ([[F]]).`,
            R`نفس اللون للاتنين: مش هيتنفذ.`,
            R`هيطبع 1، لأن color رفض الأمر اللي فات.`,
            R`لوحدها: رجّع ألوان النافذة الأصلية.`
          ],
          sol: R`في نافذة CMD القديمة: [[color 0A]] بيقلب الشاشة كلها أسود وأخضر فاتح، حتى الكلام اللي كان فوق. [[color 1F]] أزرق وأبيض، و [[color E0]] أصفر فاتح وكلام أسود. [[color 77]] مش بيغيّر حاجة، و [[echo %errorlevel%]] بعده بيطبع [[1]]. و [[color]] لوحدها بترجّع الأسود والرمادي اللي النافذة بدأت بيهم.

جرّبت ده في نافذة conhost حقيقية وقريت ألوانها بعد كل أمر: [[color 0A]] رجّع errorlevel 0، و [[color 77]] رجّع 1 والألوان فضلت زي ما هي، و [[color A]] (رقم واحد) خلّى الخلفية سودا والكلام أخضر، و [[color 0Z]] طبع المساعدة بس. في Windows Terminal نفس الأوامر شغالة بس الدرجات من الـ color scheme، فالأخضر في Campbell غير الأخضر في One Half Dark مثلًا.`
        },
        {
          cmd: "prompt",
          title: "غيّر شكل الـ prompt",
          desc: R`[[prompt]] بيغيّر الكلام اللي CMD بيكتبه قبل كل أمر (الافتراضي [[C:\lab>]]). بتكتب النص اللي عايزه، وجواه أكواد بتبدأ بـ [[$]] بتتبدّل كل مرة الـ prompt بيتطبع: المسار، والوقت، وسطر جديد، وألوان.

الأكواد (الحرف كابيتال أو سمول عادي):
[[$P]] الدرايف والمسار ([[C:\lab]])، و [[$N]] حرف الدرايف بس ([[C]] من غير النقطتين).
[[$G]] علامة [[>]]، و [[$L]] علامة [[<]]، و [[$B]] علامة [[|]]، و [[$Q]] علامة [[=]]، و [[$A]] علامة [[&]]، و [[$C]] و [[$F]] القوسين [[(]] و [[)]]. الأكواد دي موجودة لأن الرموز نفسها ليها معنى في CMD (توجيه وربط)، فلو كتبتها على طول هتتفهم أمر.
[[$T]] الوقت ([[13:15:14.55]])، و [[$D]] التاريخ ([[Fri 10/02/2026]]، وشكله حسب إعدادات المنطقة)، و [[$V]] نسخة ويندوز.
[[$S]] مسافة، و [[$_]] سطر جديد، و [[$$]] علامة [[$]] نفسها، و [[$H]] بيمسح الحرف اللي قبله.
[[$E]] حرف الـ Escape (رقمه 27)، وده مفتاح ألوان ANSI: [[$E[32m]] كل اللي بعده أخضر، و [[$E[0m]] رجّع اللون العادي. الأرقام: 31 أحمر، و 32 أخضر، و 33 أصفر، و 34 أزرق، و 35 بنفسجي، و 36 تركواز، و 90 رمادي، و [[1;]] قبلها بتخليها عريضة أو فاتحة ([[$E[1;36m]]).

[[prompt]] لوحدها بترجّع الافتراضي ([[$P$G]]). والتغيير للنافذة دي بس، لأن [[prompt]] بيحط القيمة في متغير بيئة اسمه [[PROMPT]] (اكتب [[set PROMPT]] وشوفه)، و CMD أول ما يفتح بيقرا المتغير ده. عشان كده الحفظ الدايم سطر واحد: [[setx PROMPT "..."]] (درس set / setx)، وكل نافذة CMD جديدة هتفتح بيه. أو تحطه في ملف بيشتغل مع كل نافذة (درس title و mode con، و AutoRun في درس doskey).`,
          example: R`prompt [$T]$S$P$G
prompt $P$_$G$S
prompt $E[32m$P$E[0m$G
prompt $E[1;36m%USERNAME%$E[0m@%COMPUTERNAME% $E[33m$P$E[0m$_$$$S
prompt
setx PROMPT "$E[32m$P$E[0m$_$G$S"`,
          try: R`جرّب الأشكال واحد ورا التاني، واعمل [[cd ..]] بعد كل واحد عشان تشوف [[$P]] بيتحدّث. وبعدين اعمل prompt على سطرين: المسار بالأصفر والوقت بالرمادي في السطر الأول، و [[>]] في التاني.`,
          deep: {
            why: R`الـ prompt أكتر حاجة بتبصلها في الترمنال. مسار طويل زي [[C:\Users\ali\projects\shop\backend\src>]] بياكل نص السطر فالأوامر بتلف، ومفيش حاجة بتفرّق بين نافذة عادية ونافذة أدمن أو سيرفر. prompt على سطرين وبلون بيحل الاتنين، من غير أي برنامج زيادة.`,
            how: R`CMD بيطبع الـ prompt قبل كل أمر من قيمة متغير [[PROMPT]]، ولو مش موجود بيستخدم [[$P$G]]. جرّبت: [[prompt]] لوحدها بتمسح المتغير خالص ([[set PROMPT]] بعدها بيقول [[Environment variable PROMPT not defined]])، و CMD اللي بيتفتح وفيه PROMPT جاي من بره بيستخدمه على طول. عشان كده [[setx PROMPT]] بيشتغل: setx بيحفظه في متغيرات اليوزر، وأي CMD جديد بيورثه.

[[$E]] بيطبع حرف Escape، والترمنال بيفهم [[ESC[...m]] كأمر ألوان (ANSI أو VT). CMD في ويندوز 10 وأحدث بيشغّل الدعم ده في النافذة القديمة وفي Windows Terminal الاتنين. وأي لون فتحته اقفله بـ [[$E[0m]]، وإلا الأمر اللي بتكتبه وناتجه هيتلوّنوا كمان.

[[%USERNAME%]] جوه أمر prompt بتتبدّل مرة واحدة وانت بتكتب الأمر، وده تمام مع اسم اليوزر لأنه مش بيتغيّر. لكن [[%CD%]] هتفضل المسار القديم للأبد، عشان كده المسار دايمًا [[$P]].

الحفظ الدايم بطريقتين: [[setx PROMPT "..."]] (أبسط، ومن غير ريجستري)، أو ملف bat بيتشغّل مع كل نافذة. ولو عايز تشيل الـ PROMPT المحفوظ، امسحه من شاشة متغيرات البيئة (درس «rundll32 sysdm.cpl,EditEnvironmentVariables» في تاب «اختصارات النظام») وافتح نافذة جديدة. والـ prompt في PowerShell حاجة تانية خالص: function اسمها prompt في [[$PROFILE]] (درس «$PROFILE» في تاب «PowerShell»)، و PowerShell بيتجاهل متغير PROMPT.`,
            when: R`أول ما تجهز جهازك، أو لما تشتغل في مشروع مساره طويل، أو عايز نوافذ (أدمن، سيرفر) يبان الفرق بينها من الـ prompt.`,
            mistakes: R`تنسى [[$E[0m]] فكل حاجة بعد الـ prompt تتلوّن. أو تكتب [[>]] أو [[|]] أو [[&]] على طول بدل [[$G]] و [[$B]] و [[$A]]، فـ CMD يفهمها توجيه ويعمل ملف أو يشغّل أمر تاني. أو تشغّل [[setx PROMPT "$P$G"]] من PowerShell: جوه علامات التنصيص المزدوجة PowerShell بيعتبر [[$P]] و [[$G]] متغيرات (فاضية) ويحفظ كلام ناقص، فمن PowerShell استخدم علامات تنصيص مفردة. أو تستنى setx يغيّر النافذة الحالية (النوافذ الجديدة بس). أو تشوف [[←[32m]] بدل الألوان: يبقى ويندوز أقدم من 10، أو مفعّل «Use legacy console» في خصائص النافذة القديمة.`
          },
          lines: [
            R`الوقت بين قوسين مربعين، ومسافة، والمسار، و [[>]]: زي [[[13:15:14.55] C:\lab>]].`,
            R`المسار لوحده في سطر ([[$_]] سطر جديد)، وتكتب في السطر اللي تحته بعد [[> ]].`,
            R`المسار بالأخضر، وبعدين رجّع اللون العادي قبل [[>]].`,
            R`اسم اليوزر تركواز عريض و @ واسم الجهاز، والمسار أصفر، وتحتهم [[$]] ومسافة زي لينكس.`,
            R`لوحدها: رجّع [[$P$G]] الافتراضي.`,
            R`احفظه لكل نافذة CMD جديدة (النافذة الحالية مش هتتغيّر).`
          ],
          sol: R`[[prompt [$T]$S$P$G]] بيخلي كل سطر يبدأ زي [[[13:15:14.55] C:\lab>]]، والوقت بيتحدّث مع كل أمر (ده وقت طباعة الـ prompt مش وقت تنفيذ الأمر). و [[prompt $P$_$G$S]] بيطبع المسار لوحده في سطر وتحته [[> ]] تكتب بعدها. ولما تعمل [[cd ..]] المسار في الـ prompt بيتغيّر على طول.

الشكل اللي على سطرين: [[prompt $E[33m$P$E[0m$S$E[90m$T$E[0m$_$G$S]]. جرّبته في CMD على ويندوز 11: بعد [[cd ..]] المسار اتحدّث، و [[set PROMPT]] طبع [[PROMPT=$E[33m$P$E[0m$S$E[90m$T$E[0m$_$G$S]]. وجرّبت كمان إن CMD جديد بيبدأ بالـ PROMPT اللي جاله من البيئة، وده اللي بيخلّي [[setx PROMPT]] يشتغل. (setx نفسه مشغّلتهوش عشان ميغيّرش إعدادات الجهاز.)`
        },
        {
          cmd: "title و mode con",
          title: "عنوان النافذة وحجمها",
          desc: R`[[title]] بيغيّر العنوان اللي فوق النافذة (أو اسم التاب في Windows Terminal)، و [[mode con]] بيعرض حجم النافذة ويغيّره بعدد الأعمدة والسطور. الاتنين بيخلّوك تعرف كل نافذة فيها إيه من أول نظرة.

[[title Dev Server]]: كل الكلام اللي بعد title هو العنوان، من غير علامات تنصيص (لو كتبتها هتظهر في العنوان). مفيد لما يبقى عندك ٤ نوافذ CMD: «Server» و «Tests» و «DB» بدل ٤ «Command Prompt» شبه بعض في Alt+Tab.

[[mode con]] لوحده بيطبع «Status for device CON»: [[Lines]] و [[Columns]] و [[Keyboard rate]] و [[Keyboard delay]] و [[Code page]]. و [[CON]] اسم الكونسول (الشاشة والكيبورد) عند ويندوز من أيام DOS، والنقطتين في [[con:]] اختيارية. و [[mode con: cols=120 lines=40]] بيخلي العرض 120 حرف والطول 40 سطر.

فرقين مهمين: في النافذة القديمة (conhost) [[lines=40]] بيخلي الـ buffer نفسه 40 سطر، يعني الـ scroll لفوق بيضيع والكلام القديم بيتشال. والرقم الكبير اللي بتشوفه في [[Lines]] (زي 9001) ده طول الـ buffer مش الشاشة. وفي Windows Terminal [[mode con: cols= lines=]] مش بيغيّر حجم النافذة أصلًا (والكلام ممكن يتلف كأن العرض اتغيّر)، والحجم هناك من الإعدادات (Startup ثم Launch size) أو [[wt --size 120,40]].

فكرة «شاشة ترحيب»: [[cmd /k "..."]] بيفتح CMD جديد ينفّذ الأوامر اللي بين علامات التنصيص ويفضل مفتوح ([[/k]] عكس [[/c]] اللي بتنفّذ وتقفل)، والأوامر مربوطة بـ [[&]] (درس اربط أوامر). فالسطر الأخير في المثال بيعمل عنوان ولون ورسالة مرة واحدة، و [[exit]] بيرجّعك للـ CMD اللي قبله. ولو حطيت الأوامر دي في ملف وخليت Windows Terminal يشغّله، كل تاب CMD هيفتح بيها (الحل تحت).`,
          example: R`title Dev Server
mode con
mode con: cols=120 lines=40
cmd /k "title Dev & color 0A & echo Welcome %USERNAME%"`,
          try: R`اعمل ملف [[%USERPROFILE%\cmdrc.bat]] فيه عنوان و prompt واختصارات doskey ورسالة ترحيب، وخلّي بروفايل Command Prompt في Windows Terminal يشغّله مع كل تاب.`,
          deep: {
            why: R`لما يبقى عندك سيرفر و watcher و git في تلات نوافذ، العنوان هو اللي بيخليك تلاقي اللي عايزه في Alt+Tab أو في التابات. والحجم مهم لأوامر بتطبع جداول عريضة (زي [[tasklist]] و [[netstat -ano]] و [[winget upgrade]]) فبتلف وتتلخبط في نافذة ضيقة.`,
            how: R`[[title]] بيطلب من الكونسول يغيّر العنوان. في Windows Terminal ده بيغيّر اسم التاب، إلا لو البروفايل مفعّل فيه Suppress title changes ([[suppressApplicationTitle]])، ساعتها التاب بيفضل بالاسم اللي في الإعدادات. وبرامج كتير بتغيّر العنوان لوحدها وهي شغالة، فمتستغربش لو اتغيّر.

[[mode]] أمر قديم من DOS بيظبط «أجهزة»: [[con]] الشاشة، و [[com1]] بورت serial. في conhost [[mode con: cols= lines=]] بيغيّر حجم النافذة والـ buffer مع بعض. جرّبتها في نافذة conhost: قبلها [[mode con]] طلّع [[Lines: 9001]] و [[Columns: 120]]، وبعد [[cols=90 lines=25]] النافذة والـ buffer بقوا 90 في 25 بالظبط، يعني الـ scrollback راح. عشان تكبّر النافذة من غير ما تخسر الـ scroll: كليك يمين على العنوان، Properties، Layout، وغيّر Window Size بس وسيب Screen Buffer Size كبير.

Windows Terminal بيرسم النافذة بنفسه والـ shell اللي جواه مبيقدرش يغيّر حجمها (فيه issues على GitHub عن ده بالظبط)، فالحجم من Startup ثم Launch size، أو [[wt --size 120,40]] وانت بتفتحه.

[[cmd /k "أوامر"]] هو نفسه اللي ينفع تحطه في Command line بتاع بروفايل Command Prompt في Windows Terminal: [[%SystemRoot%\System32\cmd.exe /k "%USERPROFILE%\cmdrc.bat"]]. كده كل تاب CMD يفتح بالعنوان والـ prompt والاختصارات بتوعك. ده أأمن من AutoRun في الريجستري (درس doskey)، لأن AutoRun بيشتغل مع أي [[cmd /c]] بتشغّله البرامج والسكربتات كمان، فرسالة الترحيب هتظهر في نص ناتجهم. ولنافذة CMD القديمة: اعمل shortcut على الديسكتوب الـ Target بتاعه [[cmd.exe /k "%USERPROFILE%\cmdrc.bat"]].`,
            when: R`كذا نافذة مفتوحة مع بعض، أو سكربت bat طويل عايز تعرف هو في أنهي خطوة من العنوان ([[title Step 2 of 5: building]])، أو أوامر بتطبع جداول عريضة.`,
            mistakes: R`[[title "My Server"]] بعلامات تنصيص فتظهر في العنوان. أو [[mode con lines=40]] في conhost وتستغرب إن الـ scroll لفوق اختفى. أو تجرّب mode con في Windows Terminal وتفتكر الأمر بايظ. أو تحط رسالة ترحيب بـ echo في AutoRun، فتظهر في ناتج أي سكربت أو برنامج بيستخدم cmd وتبوّظه.`
          },
          lines: [
            R`عنوان النافذة (أو التاب) يبقى Dev Server.`,
            R`اعرض الحجم: Lines و Columns وصفحة الترميز.`,
            R`120 عمود و 40 سطر (في conhost، وبيقصّر الـ buffer لـ 40 سطر).`,
            R`CMD جديد بعنوان ولون ورسالة ترحيب، ويفضل مفتوح ([[/k]])، و exit بيرجّعك.`
          ],
          sol: R`الملف في الكود تحت. احفظه [[%USERPROFILE%\cmdrc.bat]] (UTF-8 من غير BOM). في Windows Terminal: الإعدادات، Command Prompt، وخلّي Command line: [[%SystemRoot%\System32\cmd.exe /k "%USERPROFILE%\cmdrc.bat"]]، واحفظ وافتح تاب جديد.

جرّبت الملف بـ [[cmd /k]]: طبع [[Welcome ali, today is Fri 10/02/2026]]، وبعدين الـ prompt على سطرين: المسار بالأخضر وتحته [[> ]]، و [[doskey /macros]] عرض [[ll=dir /a $*]]. و [[@echo off]] جوه الملف مش بيخفي الـ prompt بعد ما الملف يخلص، فمش محتاج [[echo on]] في الآخر. ولو التاب اسمه مش بيتغيّر لـ [[Dev - ali]]، يبقى Suppress title changes مفعّل في البروفايل.

و [[mode con]] في نافذة CMD القديمة طلّع عندي [[Lines: 9001]] و [[Columns: 120]] و [[Code page: 65001]] (الصفحة عندك ممكن تبقى 437 أو 720)، وبعد [[mode con: cols=100 lines=30]] بقى [[Lines: 30]] و [[Columns: 100]].`,
          solCode: R`@echo off
REM cmdrc.bat: runs at the start of every CMD tab
title Dev - %USERNAME%
prompt $E[32m$P$E[0m$_$G$S
doskey ll=dir /a $*
doskey gs=git status
echo Welcome %USERNAME%, today is %DATE%`
        }
      ]
    }
]);
