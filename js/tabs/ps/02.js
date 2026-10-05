// تكملة تاب ps: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/ps/01.js (شرح حقول الدرس في أوله)
MORE("ps", [
    {
      t: "الشبكة",
      l: 2,
      n: "",
      items: [
        {
          cmd: "Test-NetConnection",
          title: "ping واختبار بورت",
          desc: R`[[Test-NetConnection]] (اختصاره [[tnc]]) بيجاوب على سؤالين: الجهاز ده بيرد؟ والبورت ده مفتوح؟ من غير [[-Port]] بيعمل ping ويقولك [[PingSucceeded]]. ومع [[-Port 22]] بيحاول يفتح اتصال TCP على البورت ده ويقولك [[TcpTestSucceeded : True]] لو نجح، زي [[nc -zv host 22]] في لينكس.

الـ IP اللي في المثال [[203.0.113.10]] رقم للأمثلة بس، حط مكانه IP سيرفرك. و [[localhost]] يعني جهازك نفسه، فالسطر التالت بيتأكد إن Postgres شغال وسامع على 5432 قبل ما تلوم الكود.

افهم الـ False صح: [[TcpTestSucceeded : False]] معناها إن الاتصال ماتمش، والسبب ممكن firewall قافل، أو مفيش برنامج شغال على البورت ده أصلًا. وممكن ياخد ثواني قبل ما يرد. الأمر ده ويندوز بس، وفي PowerShell 7 على أي نظام فيه [[Test-Connection host -TcpPort 22]].`,
          example: R`Test-NetConnection google.com
Test-NetConnection 203.0.113.10 -Port 22
Test-NetConnection localhost -Port 5432`,
          try: "اختبر إن بورت 22 و 443 مفتوحين على سيرفرك.",
          deep: {
            why: R`قبل ما تقعد ساعة تدوّر في الكود ليه التطبيق مش واصل لقاعدة البيانات أو للسيرفر، اتأكد إن الاتصال نفسه شغال. Test-NetConnection بيجاوب في سطر: الجهاز بيرد؟ والبورت مفتوح؟ زي ping و [[nc -zv]] مع بعض.`,
            how: R`[[Test-NetConnection google.com]] بيعمل ping. [[-Port 443]] بيجرّب اتصال TCP على البورت. الناتج object بيه [[TcpTestSucceeded]] (True/False)، و[[PingSucceeded]]، ورقم PingReplyDetails.

[[Test-NetConnection -ComputerName db.server.com -Port 5432]] تتأكد إن قاعدة البيانات وصولها تمام.

على عكس nc في bash، Test-NetConnection موجود افتراضيًا في ويندوز.`,
            when: "ECONNREFUSED أو timeout. تتأكد إن firewall مش بيقفل بورت. قبل ما تشتكي من الكود، تتأكد من الاتصال.",
            mistakes: "تفتكر TcpTestSucceeded=False معناها الجهاز التاني مش شغال. ممكن الجهاز شغال والبورت مقفول."
          },
          lines: [
            "ping ومعلومات الاتصال في أمر واحد.",
            "جرّب بورت 22 على السيرفر: TcpTestSucceeded True يعني مفتوح (زي nc -zv).",
            "قاعدة البيانات المحلية بتسمع؟"
          ],
          sol: R`[[Test-NetConnection IP -Port 22]] بيطبع [[ComputerName]] و [[RemoteAddress]] و [[RemotePort : 22]] وفي الآخر [[TcpTestSucceeded : True]] لو البورت مفتوح. اعمل نفس الحكاية مع [[-Port 443]].

لو البورت مقفول أو فيه firewall، هيطبع [[WARNING: TCP connect to (IP : 443) failed]] و [[TcpTestSucceeded : False]]، وممكن ياخد ثواني قبل ما يرد. False ممكن معناها إن مفيش حاجة شغالة على البورت ده (مثلًا Nginx مش شغال على 443) مش بس firewall. و Test-NetConnection موجود على ويندوز بس؛ في PowerShell 7 على أي نظام فيه [[Test-Connection IP -TcpPort 22]].`
        },
        {
          cmd: "Invoke-RestMethod",
          title: "كلّم API",
          desc: "[[irm]] اختصار، وبيحوّل JSON لـ object لوحده. في Windows PowerShell 5 كلمة [[curl]] alias لـ Invoke-WebRequest، فاكتب [[curl.exe]] لو عايز curl الحقيقي. وفي 5.1 ضيف [[-UseBasicParsing]] لـ Invoke-WebRequest عشان ميطلعلكش تحذير أمان يوقف السكربت، و [[$ProgressPreference = 'SilentlyContinue']] عشان التحميل ميبقاش بطيء جدًا.",
          example: R`$u = irm https://api.github.com/users/octocat
$u.public_repos
Invoke-RestMethod -Uri http://localhost:3000/api/users -Method Post -ContentType "application/json" -Body '{"name":"test"}'
Invoke-WebRequest https://example.com/file.zip -OutFile file.zip`,
          try: "هات بيانات GitHub بتاعك واطبع عدد الـ repos.",
          deep: {
            why: R`بتختبر API عملته، أو سكربت محتاج يجيب بيانات من GitHub أو يبعت رسالة لـ webhook. Invoke-RestMethod زي curl، بس الرد JSON بيرجع object على طول تقرا منه بالنقطة من غير jq.`,
            how: R`[[Invoke-RestMethod]] بيبعت HTTP request ولو الرد JSON بيحوّله تلقائيًا لـ object. مش محتاج ConvertFrom-Json.

[[-Method POST]] و[[-Body ($body | ConvertTo-Json)]] و[[-Headers @{Authorization="Bearer ..."}]] و[[-ContentType "application/json"]] هم اللي بتستخدمهم أكتر.

[[Invoke-WebRequest]] بديل أقل تلقائية: بيرجع object بيه StatusCode والـ Content كـ string، محتاج تحوّله يدويًا. أحسن لو محتاج headers أو status code.`,
            when: "اختبار API. سكربت بيجيب بيانات من API. ديبلوي بيتريجر webhook.",
            mistakes: "نسيان -ContentType مع POST بـ JSON. ومع APIs بتستخدم HTTPS وشهادة self-signed بيطلع error، حلها [[-SkipCertificateCheck]] في PowerShell 7."
          },
          lines: [
            "[[irm]] اختصار Invoke-RestMethod: هات بيانات يوزر، والـ JSON بيتحول object لوحده.",
            "اقرا حقل منه على طول.",
            "طلب POST بـ JSON (زي curl -X POST -d).",
            "نزّل ملف واحفظه (زي wget)."
          ],
          sol: R`[[(irm https://api.github.com/users/YOUR_NAME).public_repos]] بيطبع رقم زي [[12]]. الـ API بيرجع JSON و irm بيحوله لـ PSCustomObject على طول، فبتوصل للقيمة بالنقطة. جربت نفس الفكرة على سيرفر محلي بيرجع JSON فيه public_repos بـ 8، فطلع [[8]] ونوع الناتج PSCustomObject.

الرقم ده الـ repos العامة بس، الـ private مش محسوبة. لو طلعلك [[Not Found]] يبقى اسم المستخدم غلط. ولو [[API rate limit exceeded]] يبقى عملت أكتر من 60 طلب في الساعة من غير توكن، استنى شوية.`
        },
        {
          cmd: "ssh / scp",
          title: "موجودين في ويندوز 10 و 11",
          desc: R`ويندوز 10 و 11 جايين بـ OpenSSH client مبني جوّاهم، فـ [[ssh]] و [[scp]] و [[ssh-keygen]] نفس أوامر لينكس بالظبط ومن غير PuTTY. [[ssh-keygen -t ed25519]] بيعمل زوج مفاتيح من النوع ed25519 (الأحدث والأنصح)، وبيحفظهم في [[$HOME\.ssh]]: [[id_ed25519]] (الخاص، متبعتهوش لحد) و [[id_ed25519.pub]] (العام، ده اللي بيتحط على السيرفر).

[[ssh root@203.0.113.10]] يعني ادخل على السيرفر ده باليوزر root (الـ [[@]] بتفصل اليوزر عن العنوان). و [[scp]] بينسخ ملف: المصدر الأول ([[.\dist.zip]] من جهازك)، والهدف بالشكل [[user@server:/path]]، والنقطتين [[:]] بتفصل السيرفر عن المسار اللي عليه.

الفرق الوحيد عن لينكس: مفيش [[ssh-copy-id]]، فالمفتاح العام بتنقله بإيدك (الحل في «جرّب»). ولو [[ssh]] مش موجود، سطّب OpenSSH Client من Settings، Optional features.`,
          example: R`ssh-keygen -t ed25519
ssh root@203.0.113.10
scp .\dist.zip root@203.0.113.10:/var/www/`,
          try: "ادخل سيرفرك من PowerShell مباشرة.",
          deep: {
            why: R`ويندوز ١٠ و ١١ فيهم SSH client مبني جوه (OpenSSH)، فبتدخل سيرفرات لينكس وترفع ملفات من PowerShell على طول من غير PuTTY ولا WinSCP.`,
            how: R`نفس أوامر SSH بالظبط زي Linux: [[ssh user@server]]، [[scp file user@server:/path]].

المفاتيح بتتحفظ في [[~/.ssh/]] زي Linux. [[ssh-keygen]] بيشتغل. [[ssh-copy-id]] ممكن مش موجودة بس تقدر تعمل نفس الحاجة يدويًا: تنسخ محتوى [[~/.ssh/id_rsa.pub]] وتلزقه في [[~/.ssh/authorized_keys]] على السيرفر.

المفاتيح المحفوظة في Windows Credential Manager أو بـ [[ssh-agent]] مش محتاج تدخل passphrase كل مرة.`,
            when: "الدخول على سيرفرات لينكس من ويندوز بدون PuTTY. نقل ملفات لسيرفر.",
            mistakes: "permissions على ملف المفتاح الخاص: على ويندوز المفروض يكون بـ Full Control لصاحبه بس. لو SSH رفض المفتاح، بص على permissions."
          },
          lines: [
            "اعمل مفاتيح SSH (نفس الأمر زي لينكس، OpenSSH مبني في ويندوز).",
            "ادخل السيرفر.",
            "ارفع ملف للسيرفر."
          ],
          sol: R`أول مرة [[ssh root@IP]] هيسألك [[The authenticity of host ... can't be established.]] ومعاه fingerprint، اكتب [[yes]]، وبعدها الـ prompt يبقى بتاع السيرفر زي [[root@server:~#]]. [[exit]] يرجعك PowerShell.

لو قالك [[ssh : The term 'ssh' is not recognized]] يبقى OpenSSH Client مش متسطب: من Settings، Optional features، OpenSSH Client. ولو [[Permission denied (publickey)]] يبقى المفتاح العام مش في السيرفر، وويندوز مفيهوش [[ssh-copy-id]]، فابعته كده: [[type $HOME\.ssh\id_ed25519.pub | ssh root@IP "cat >> ~/.ssh/authorized_keys"]] (محتاج باسورد أو دخول تاني للسيرفر).`
        }
      ]
    },
    {
      t: "الشبكات بعمق",
      l: 2,
      n: "",
      items: [
        {
          cmd: "Get-NetIPAddress",
          title: "عناوينك وإعدادات الشبكة",
          desc: R`عشان تعرف عنوانك على الشبكة: [[Get-NetIPConfiguration]] بيعرض لكل كارت شبكة (Wi-Fi أو Ethernet) الـ IP بتاعه، والـ gateway (الراوتر)، والـ DNS، في مكان واحد، وده المقابل لـ [[ipconfig]] في CMD و [[ip a]] في لينكس.

[[Get-NetIPAddress -AddressFamily IPv4]] العناوين بس من نوع IPv4 (من غير IPv6 الطويلة)، و [[Select-Object InterfaceAlias, IPAddress]] بيعرض اسم الكارت والعنوان بس. و [[Get-NetRoute -DestinationPrefix 0.0.0.0/0]] بيجيب الـ default route، يعني «أي حاجة رايحة للنت بتعدّي منين»، وعمود NextHop فيه IP الراوتر.

السطر الأخير بيسأل موقع خارجي «انا جايلك من أنهي IP؟» فيرجعلك الـ IP العام، و [[.Trim()]] بتشيل سطر جديد في الآخر. المحلي (زي 192.168.1.15) والعام مختلفين لأن الراوتر بيخبّي كل أجهزة البيت ورا IP واحد. والأوامر دي ويندوز بس، وهتلاقي كروت افتراضية كتير زي [[vEthernet (WSL (Hyper-V firewall))]] و [[Loopback Pseudo-Interface 1]] وكروت VPN، دي مش اتصالك الحقيقي.`,
          example: R`Get-NetIPConfiguration
Get-NetIPAddress -AddressFamily IPv4 | Select-Object InterfaceAlias, IPAddress
Get-NetRoute -DestinationPrefix 0.0.0.0/0
(Invoke-RestMethod https://ifconfig.me/ip).Trim()`,
          try: "اعرف الـ IP المحلي والعام والـ gateway.",
          deep: {
            why: R`عايز تفتح موقعك من الموبايل على نفس الواي فاي (محتاج IP جهازك)، أو تتأكد إن الجهاز واخد IP من الراوتر، أو تعرف الـ IP العام عشان تحطه في firewall سيرفر. زي [[ip a]] و [[ip route]] في لينكس.`,
            how: R`[[Get-NetIPAddress]] بيعرض كل عناوين IPv4 وIPv6. [[-AddressFamily IPv4]] بس IPv4. [[-InterfaceAlias "Wi-Fi"]] لكارت معين.

[[Get-NetAdapter]] بيعرض الكروت نفسها: حالتها وسرعتها والـ MAC (درس Get-NetAdapter في «تحكّم في الشبكة من PowerShell»).

والعنوان الخاص: [[Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.IPAddress -like "192.168.*"}]].`,
            when: "تعرف عنوانك على الشبكة. تتأكد إن كارت معين شغال.",
            mistakes: "إنك تنسى إن ويندوز بييجي بـ Loopback وTunneling adapters كتير، فيه زحمة في النتايج. فلتر بـ -InterfaceAlias."
          },
          lines: [
            "ملخص الشبكة: الـ IP والـ gateway والـ DNS لكل كارت (زي ip a).",
            "عناوين IPv4 بس مع اسم الكارت.",
            "الراوت الافتراضي، يعني الـ gateway (زي ip route).",
            "عنوانك العام على النت. [[.Trim()]] يشيل سطر جديد في الآخر."
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
          deep: {
            why: R`غيّرت الـ DNS بتاع دومين ولسه بيفتح السيرفر القديم، أو الإيميل مش واصل، أو عايز تتأكد إن الدومين بيشاور على السيرفر الصح قبل ما تعمل شهادة SSL. Resolve-DnsName بيوريك الرد بالظبط ومن أنهي DNS، زي [[dig]] في لينكس.`,
            how: R`[[Resolve-DnsName example.com]] بيجيب الـ A records (IPs). [[-Type MX]] لسيرفرات الإيميل. [[-Type TXT]] للتحقق. [[-Server 8.8.8.8]] يسأل سيرفر محدد.

[[Resolve-DnsName example.com -Server 1.1.1.1]] يسأل Cloudflare وتقارن بالنتيجة من DNS الـ default.`,
            when: "نفس استخدامات dig في bash. DNS لسه مش منتشر. تتأكد من MX records.",
            mistakes: "nslookup كمان موجود في PowerShell وأسهل بس أقل تفصيل."
          },
          lines: [
            "الدومين بيشاور على أنهي IP (زي dig).",
            "اسأل Cloudflare بدل الـ DNS بتاعك، للمقارنة.",
            "سيرفرات الإيميل.",
            "امسح كاش الـ DNS (زي ipconfig /flushdns)."
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
          deep: {
            why: "تغيير DNS لدومين على جهازك بس، من غير ما تغيّر الـ DNS الحقيقي.",
            how: R`ملف الـ hosts في ويندوز: [[C:\Windows\System32\drivers\etc\hosts]]. نفس الفكرة زي [[/etc/hosts]] في لينكس.

بس تعديله محتاج صلاحيات Admin. في VS Code: افتحه بـ «Open with Code as Administrator». أو PowerShell كمدير ثم:

[[Add-Content C:\Windows\System32\drivers\etc\hosts "203.0.113.10 example.com"]]

ويندوز بيقرا التعديل فورًا، بس لو المتصفح لسه فاكر القديم اعمل [[ipconfig /flushdns]] وافتح المتصفح تاني.`,
            when: "تجرّب موقع على سيرفر جديد قبل نقل الـ DNS. تعمل دومين محلي للتطوير.",
            mistakes: "تحاول تعدّله بدون صلاحيات فيطلع Access Denied. وكتابة غلط في الملف تسبب مشاكل في الشبكة."
          },
          lines: ["اعرض ملف hosts.", "افتحه في Notepad كمدير عشان تقدر تحفظ."],
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
          deep: {
            why: "تعرف الطريق اللي البيانات بتمر بيه لوصل سيرفر. زي traceroute في لينكس.",
            how: R`[[Test-NetConnection google.com -TraceRoute]] بيعرض كل hop في الطريق. [[-Hops]] يحدد العدد الأقصى.

الأمر القديم [[tracert google.com]] كمان شغال في PowerShell.`,
            when: "الموقع بطيء من مكان معين وعايز تعرف فين المشكلة.",
            mistakes: "النجوم في نص المسار مش معناها مشكلة بالضرورة، بعض الـ routers مش بتردش."
          },
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
          deep: {
            why: R`تعرف كل البرامج اللي فاتحة بورتات على جهازك، ومين فيهم مكشوف لأي حد على نفس الشبكة (مهم على واي فاي كافيه أو شغل). زي [[ss -tlnp]] في لينكس.`,
            how: R`[[-State Listen]] بيفلتر على البورتات اللي بتستمع بس. [[LocalPort]] البورت. [[OwningProcess]] الـ PID اللي ماسكه.

[[Get-NetTCPConnection -State Listen | Select LocalPort, OwningProcess | Sort LocalPort | ForEach-Object { $p = Get-Process -Id $_.OwningProcess -ErrorAction SilentlyContinue; [PSCustomObject]@{Port=$_.LocalPort; Process=$p.Name} }]] بيوريك البورت واسم البرنامج.`,
            when: "EADDRINUSE. تشوف مين ماسك أي بورت.",
            mistakes: "OwningProcess = 4 ده System، و0 ده Idle. عاديين."
          },
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
          deep: {
            why: "SSH tunnel من ويندوز. نفس الفكرة بالظبط زي bash: بتتصل بسيرفر وبيفتح بورت محلي بيوصلك لخدمة داخلية.",
            how: R`[[ssh -N -L 5433:127.0.0.1:5432 deploy@203.0.113.10]] نفس الأمر بالظبط زي لينكس. OpenSSH في ويندوز بيدعم كل الـ options.

افتح في PowerShell، واتركه شغال، وافتح DB client على localhost:5433.`,
            when: "تفتح قاعدة بيانات سيرفر من pgAdmin أو DBeaver على ويندوز.",
            mistakes: "نفس غلطات bash: تنسى -N فيفتح terminal على السيرفر. وتنسى إنه شغال في الخلفية."
          },
          lines: ["نفس الممر زي لينكس بالظبط: بورت 5433 عندك يوصل لـ 5432 على السيرفر."],
          sol: R`الأمر مش بيطبع حاجة بعد ما تدخل، والنافذة بتفضل واقفة، وده معناه إن الـ tunnel شغال ([[-N]] يعني من غير shell). في DBeaver اعمل connection جديد: Host [[localhost]] و Port [[5433]] واسم الداتابيز واليوزر والباسورد بتوع Postgres اللي على السيرفر، و Test Connection هيقول Connected.

لو قفلت نافذة الـ ssh الاتصال هيقع. لو ظهر [[bind [127.0.0.1]:5433: Address already in use]] يبقى 5433 مستخدم عندك، غيّر الرقم. ولو DBeaver قال connection refused والـ ssh طبع [[channel ... open failed: connect failed: Connection refused]]، يبقى Postgres على السيرفر مش بيسمع على 127.0.0.1:5432 (مثلًا شغال في Docker على بورت تاني).`
        }
      ]
    },
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
    },
    {
      t: "البيئة والإعدادات",
      l: 2,
      n: "",
      items: [
        {
          cmd: "$env:",
          title: "متغيرات البيئة",
          desc: R`متغيرات البيئة (environment variables) قيم بيشوفها أي برنامج بتشغّله، زي [[PATH]] (الفولدرات اللي ويندوز بيدوّر فيها على البرامج) و [[TEMP]] و [[USERPROFILE]]. في PowerShell بتقراها وتكتبها بـ [[$env:NAME]]، المقابل لـ [[$NAME]] في bash و [[%NAME%]] في CMD.

[[$env:PATH -split ';']] بيقسم الـ PATH عند كل [[;]] فيطبع كل فولدر في سطر (على ويندوز الفاصل [[;]] مش [[:]] زي لينكس). و [[$env:API_URL = "..."]] بيعمل متغير للنافذة دي وأي برنامج تشغّله منها، زي [[export]]، وبيروح لما تقفلها.

للحفظ الدائم السطر التالت: [[[Environment]::SetEnvironmentVariable(الاسم, القيمة, "User")]] بيكتبه لليوزر بتاعك (و [["Machine"]] لكل اليوزرز ومحتاج أدمن). الأقواس المربعة [[[Environment]]] اسم class من .NET، و [[::]] بتنادي method جواه. التغيير الدائم مش بيظهر في النافذة المفتوحة، افتح واحدة جديدة. و [[Get-ChildItem env:]] بيعرض كل المتغيرات، لأن [[env:]] في PowerShell درايف زي [[C:]].`,
          example: R`$env:PATH -split ';'
$env:API_URL = "http://localhost:3000"
[Environment]::SetEnvironmentVariable("API_URL", "http://localhost:3000", "User")
Get-ChildItem env:`,
          try: "اطبع PATH سطر سطر بأول أمر.",
          deep: {
            why: R`البرامج بتاخد إعدادات كتير من متغيرات البيئة: [[PATH]] اللي بيقرر أنهي node بيشتغل، و [[NODE_ENV]]، و [[JAVA_HOME]]. ولما برنامج «مش موجود» وهو متسطب، غالبًا المشكلة في الـ PATH.`,
            how: R`[[Env:]] في PowerShell زي drive كامل. [[$env:PATH]] بيقرا. [[ls Env:]] بيعرض كل المتغيرات. [[$env:MY_VAR = "value"]] بيضبط للجلسة الحالية بس.

الفرق المهم عن bash: التغيير بيأثر على نفس العملية وأي عملية بتشغّلها منها، بس مش على العمليات الشغالة بالفعل.

للتغيير الدائم: [[[System.Environment]::SetEnvironmentVariable("NAME", "value", "User")]] أو من System Properties.

وكمان: ملفات .env مش بتتقري لوحدها: التطبيق بيقراها (مكتبة dotenv أو [[node --env-file=.env]])، والشيل نفسه مش بيشوفها.`,
            when: "قراية NODE_ENV. ضبط متغيرات للجلسة. تمرير config لـ npm scripts.",
            mistakes: "الخلط بين Machine وUser وProcess scope في SetEnvironmentVariable. User بيتحفظ بين الجلسات للمستخدم ده بس."
          },
          lines: [
            "اعرض الـ PATH سطر لكل فولدر. على ويندوز الفاصل [[;]] مش [[:]].",
            "متغير للجلسة دي بس (زي export).",
            "متغير دائم لليوزر ده، يفضل بعد ما تقفل (User ممكن تبقى Machine للكل).",
            "كل متغيرات البيئة (زي env)."
          ],
          sol: R`[[$env:PATH -split ';']] بيطبع كل مسار في سطر، زي [[C:\Program Files\nodejs\]] و [[C:\Program Files\Git\cmd]] و [[C:\Users\ali\AppData\Roaming\npm]]. أول سطور هي اللي ليها الأولوية لما نفس البرنامج يبقى موجود في أكتر من مكان.

لو آخر سطر طالع فاضي ده عادي، معناه إن الـ PATH بيخلص بـ [[;]]. ولو طلعلك كله في سطر واحد طويل، يبقى كتبت [[-split ':']] زي لينكس: في ويندوز الفاصل [[;]] لأن [[:]] جزء من [[C:\]]. (جربتها على لينكس بـ [[:]] وطلع [[/tmp/...]] و [[/root/.local/bin]] ... سطر سطر).`
        },
        {
          cmd: "المتغيرات",
          title: "خزّن أي حاجة",
          desc: R`المتغير اسم بيبدأ بـ [[$]] بتحط فيه أي حاجة بـ [[=]] وتستخدمها بعدين. ومش محتاج تقول نوعه. الفرق الكبير عن bash: المتغير بيشيل objects كاملة مش نص، فـ [[$files = Get-ChildItem]] بيخزن الملفات نفسها بكل خصائصها، و [[$files.Count]] عددهم، و [[$files[0].Name]] اسم أول واحد.

[[@( )]] بيعمل array (لستة) بعناصر مفصولة بفواصل: [[@("web", "api")]]. و [[@{ }]] بيعمل hashtable: مفاتيح وقيم، كل مفتاح [[=]] قيمته، وبينهم [[;]] لو على نفس السطر. وتقرا القيمة بالنقطة [[$user.name]] أو بالأقواس [[$user["name"]]].

أسامي المتغيرات مش بتفرّق بين الكابيتال والسمول ([[$Name]] هي [[$name]]). وفيه أسامي محجوزة متستخدمهاش: [[$_]] و [[$args]] و [[$input]] و [[$home]]. وشرح الأنواع والتحويل بينها في درس «المتغيرات والأنواع» في المستوى التالت.`,
          example: R`$files = Get-ChildItem
$files.Count
$user = @{ name = "Ali"; role = "dev" }
$user.name`,
          try: "خزّن Get-Process في متغير واعرف عدد العمليات.",
          deep: {
            why: "المتغيرات في PowerShell مش زي bash: بيها أنواع، وبتتعامل مع objects مش نص بس.",
            how: R`المتغيرات بتبدأ بـ [[$]]. مش محتاج declare. PowerShell بيحدد النوع لوحده من القيمة.

[[$num = 5]] رقم. [[$str = "text"]] نص. [[$arr = @(1, 2, 3)]] array. [[$hash = @{key="value"}]] hashtable (dictionary).

[[$arr[0]]] أول عنصر. [[$hash["key"]]] أو [[$hash.key]] وصول لقيمة.

وتقدر تحدد النوع صراحة: [[[int]$var = "5"]] بيحوّل النص لرقم.

أرقام مع وحدات: [[2GB]]، [[1MB]]، [[500KB]] بتعمل الحسبة تلقائيًا.`,
            when: R`أي حاجة هتستخدمها أكتر من مرة: ناتج أمر بطيء متشغّلهوش مرتين، أو مسار طويل، أو لستة سيرفرات. وفي الترمنال كمان مش بس في السكربتات.`,
            mistakes: "الخلط بين hashtable [[$h.key]] وobject property. الاتنين بنفس الكتابة في بعض الأحيان بس مختلفين."
          },
          lines: [
            "احفظ ناتج أمر (array من objects) في متغير.",
            "كام عنصر فيه.",
            "hashtable: مفاتيح وقيم.",
            "اقرا قيمة بالنقطة."
          ],
          sol: R`[[$p = Get-Process]] وبعدين [[$p.Count]] بيرجع رقم زي [[250]] (عندي على ويندوز 11 طلع [[489]] في 7.6 و 5.1، والرقم بيختلف حسب البرامج المفتوحة). و [[$p.GetType().Name]] بيرجع Object[] (array)، يعني المتغير شايل array من objects كاملة، مش نص.

الرقم بيتغير كل شوية لأن العمليات بتفتح وتقفل، و [[$p]] صورة ثابتة من لحظة ما خزنته. لو عايز أحدث رقم لازم تشغّل Get-Process تاني. ولو عملت [[$p.Count]] على حاجة رجعت object واحد بس، PowerShell 7 برضه هيرجع 1، مش فاضي.`
        },
        {
          cmd: "$PROFILE",
          title: "اختصاراتك الشخصية",
          desc: "زي .bashrc. أول سطر بيعمله لو مش موجود بس (من غير الشرط، [[-Force]] كانت هتمسح اللي فيه). حط فيه functions و aliases، و [[. $PROFILE]] يفعّله. اختار أسامي مش مستخدمة: [[gc]] و [[gl]] و [[gp]] مثلًا aliases جاهزة لـ Get-Content و Get-Location و Get-ItemProperty، فمتنفعش لـ git commit و git log و git push.",
          example: R`if (-not (Test-Path $PROFILE)) { New-Item $PROFILE -Force }
notepad $PROFILE
function gst { git status }
Set-Alias ll Get-ChildItem
. $PROFILE`,
          try: "اعمل function اسمها dev بتعمل [[npm run dev]] وحطها في البروفايل. اعرف الأول لو الاسم مستخدم بـ [[Get-Command dev]].",
          deep: {
            why: "ملف بيتشغّل أوتوماتيك كل ما تفتح PowerShell. حطّ فيه aliases وفانكشنز وإعدادات.",
            how: R`[[$PROFILE]] متغير فيه مسار الملف. لو مش موجود: [[New-Item $PROFILE -Force]]. وافتحه في VS Code: [[code $PROFILE]].

فيه ٤ مستويات profile (للـ user الحالي، ولكل user). الأشهر هو [[CurrentUserCurrentHost]].

مثل [[.bashrc]] في bash: بتحط فيه aliases ([[Set-Alias ll Get-ChildItem]]، ولو محتاج parameters اعمل function: [[function ll { Get-ChildItem -Force @args }]]) وPATH إضافات ومتغيرات ثابتة.

بعد التعديل: [[. $PROFILE]] (نقطة ومسافة) يطبّق التغييرات في الجلسة الحالية. مش المفروض تعيد تشغيل PowerShell.`,
            when: "إعداد البيئة بتاعتك: aliases وأوامر مخصوصة ومتغيرات ثابتة.",
            mistakes: "تعدّل الـ profile وتنسى تطبّقه بـ [[. $PROFILE]]. وبعض الـ execution policies بتمنع تشغيله."
          },
          lines: [
            "لو ملف الـ profile مش موجود، اعمله.",
            "افتحه في Notepad (أو [[code $PROFILE]]).",
            "فانكشن تحطها جوه الملف: [[gst]] تشغّل git status.",
            "اختصار: [[ll]] بدل Get-ChildItem.",
            "طبّق الملف في الجلسة دي (النقطة والمسافة زي source)."
          ],
          sol: R`أول [[Get-Command dev]] المفروض يطلع error [[The term 'dev' is not recognized]]، ودي أخبار حلوة: الاسم فاضي. بعدين [[notepad $PROFILE]] وضيف [[function dev { npm run dev }]] واحفظ، وبعدين [[. $PROFILE]]. دلوقتي [[dev]] في فولدر مشروع بيشغّل [[npm run dev]].

[[$PROFILE]] مسار زي [[C:\Users\ali\Documents\PowerShell\Microsoft.PowerShell_profile.ps1]] في PowerShell 7 (ولو OneDrive بيعمل backup لـ Documents هيبقى جوه OneDrive). ولو [[. $PROFILE]] طلع [[running scripts is disabled on this system]] يبقى محتاج تظبط الـ ExecutionPolicy (درس ExecutionPolicy). ولو نسيت [[. $PROFILE]] الـ function مش هتشتغل إلا في نافذة جديدة.`,
          solCode: R`Get-Command dev
if (-not (Test-Path $PROFILE)) { New-Item $PROFILE -Force }
Add-Content $PROFILE 'function dev { npm run dev }'
. $PROFILE
Get-Command dev`
        },
        {
          cmd: "History والاختصارات",
          title: "ارجع لأوامر كتبتها قبل كده",
          desc: R`PowerShell بيحفظ الأوامر اللي كتبتها، وفيه اختصارات توفّر عليك كتابة كتير (من موديول اسمه PSReadLine شغال افتراضيًا). سهم فوق وتحت يلف على الأوامر القديمة، و Ctrl+R يدوّر فيها بكلمة زي bash، و Tab يكمّل اسم الأمر أو الملف أو الـ parameter ولو دوست تاني يجيب الاختيار اللي بعده، و Ctrl+Space يعرض كل الاختيارات مرة واحدة. و [[cls]] (أو Ctrl+L) يمسح الشاشة.

[[Get-History]] (اختصاره [[h]]) بيعرض أوامر الجلسة دي بأرقام، و [[Invoke-History 5]] (اختصاره [[r 5]]) بيشغّل الأمر رقم ٥ تاني. مفيش [[!!]] زي bash.

خلي بالك: Get-History بيعرض الجلسة الحالية بس، لكن PSReadLine بيحفظ كل أوامرك في ملف عشان سهم فوق و Ctrl+R يلاقوها حتى بعد ما تقفل. مكانه بيطلع بـ [[(Get-PSReadLineOption).HistorySavePath]]. ولو كتبت باسورد في أمر، هتلاقيه هناك.`,
          example: R`Get-History
Invoke-History 5`,
          try: "اضغط Ctrl+Space بعد [[Get-Child]] وشوف الاختيارات.",
          deep: {
            why: R`نص وقتك في الترمنال بتكتب أوامر كتبتها قبل كده. البحث في التاريخ والإكمال بالـ Tab بيوفروا كتابة كتير، وبيقللوا الغلط في أسامي الأوامر والـ parameters الطويلة.`,
            how: R`[[Get-History]] بيعرض أوامر الجلسة دي بأرقام. [[Invoke-History 42]] (أو [[r 42]]) بيشغّل الأمر رقم 42. و [[!!]] مش موجودة.

PSReadLine (موجود افتراضيًا في ويندوز 10 و 11 وفي PowerShell 7) هو اللي عامل الاختصارات: Ctrl+R و Ctrl+S للبحث لورا وقدام، و F8 بيدوّر على أمر قديم بيبدأ باللي انت كاتبه، و Ctrl+Space يعرض الـ completions. وفي PowerShell 7.2 وأحدث بيقترحلك أمر قديم بلون باهت وانت بتكتب، والسهم يمين يقبله.

Tab completion قوية: بتكمّل أسامي الـ parameters والقيم المسموحة ليها، مش بس الملفات.

ملف التاريخ الدائم: [[(Get-PSReadLineOption).HistorySavePath]]. تقدر تفتحه بـ [[notepad (Get-PSReadLineOption).HistorySavePath]] وتمسح منه أي سطر فيه بيانات سرية.`,
            when: "أمر طويل كتبته امبارح. التنقل في الـ history.",
            mistakes: "إنك تفتكر [[!!]] شغالة. هي مش موجودة في PowerShell، استخدم [[r]]."
          },
          lines: ["الأوامر اللي كتبتها، بأرقام.", "نفّذ الأمر رقم ٥ تاني."],
          sol: R`[[Get-Child]] وبعدين Ctrl+Space هيكمّلها على طول لـ [[Get-ChildItem]]، لأنه الأمر الوحيد اللي بيبدأ كده. عشان تشوف القايمة، جرب [[Get-Net]] وبعدين Ctrl+Space: هتظهرلك قايمة كبيرة (Get-NetAdapter و Get-NetIPAddress و Get-NetTCPConnection ...) وتتحرك فيها بالأسهم.

نفس الحكاية على الـ parameters: [[Get-ChildItem -]] وبعدين Ctrl+Space يعرض كل الـ parameters. ولو Ctrl+Space مش بيعمل حاجة جوه VS Code، غالبًا VS Code نفسه واخد الاختصار، جربها في Windows Terminal.`
        },
        {
          cmd: "ExecutionPolicy",
          title: "ليه السكربت مش راضي يشتغل",
          desc: R`الـ ExecutionPolicy إعداد في ويندوز بيقرر ملفات [[.ps1]] تتشغّل ولا لأ. في Windows PowerShell 5.1 على جهاز عادي الافتراضي [[Restricted]]: مفيش ولا سكربت يشتغل، فتلاقي رسالة «running scripts is disabled on this system» حتى مع npm (لأن npm على ويندوز ملف npm.ps1). و PowerShell 7 على ويندوز افتراضيه [[RemoteSigned]].

[[Get-ExecutionPolicy]] بيقولك الحالي. و [[Set-ExecutionPolicy -Scope CurrentUser RemoteSigned]] بيغيّره لليوزر بتاعك بس ([[-Scope CurrentUser]])، فمش محتاج أدمن ومش بيأثر على باقي اليوزرز. و [[RemoteSigned]] معناها: السكربتات اللي اتعملت على جهازك تشتغل، واللي نزلت من النت لازم تبقى موقّعة أو تعملها [[Unblock-File]].

متختارش [[Unrestricted]] أو [[Bypass]] للجهاز كله: RemoteSigned كفاية. ولو محتاج تعدّي الـ policy لتشغيلة واحدة بس: [[pwsh -ExecutionPolicy Bypass -File script.ps1]]. والخطوات كاملة لأول سكربت في درس «أول سكربت .ps1» في المستوى التالت.`,
          example: R`Get-ExecutionPolicy
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`,
          try: "اعرف الـ policy الحالية عندك قبل ما تغيّر حاجة.",
          deep: {
            why: "ويندوز بيمنع تشغيل سكربتات PowerShell افتراضيًا. دي الخطوة اللي بتشغّلها مرة واحدة.",
            how: R`[[Get-ExecutionPolicy]] بيعرض الحالي. الافتراضي [[Restricted]] (ممنوع تشغيل سكربتات). [[RemoteSigned]] (الأنصح): السكربتات المحلية بتشتغل، اللي جايين من النت محتاجين توقيع. [[Unrestricted]]: كل حاجة بتشتغل (مش آمن).

[[-Scope CurrentUser]] بيغيّر للـ user بس من غير Admin. [[-Scope LocalMachine]] كل الـ Users ومحتاج Admin.

طريقة تانية تجاوز في حالات خاصة: [[powershell.exe -ExecutionPolicy Bypass -File script.ps1]].`,
            when: "أول مرة بتشتغل على جهاز ويندوز جديد وعايز تشغّل سكربتات.",
            mistakes: "تضبط Unrestricted عشان «يشتغل». RemoteSigned أأمن وكافي."
          },
          lines: [
            "السياسة الحالية (غالبًا Restricted على ويندوز).",
            "اسمح بالسكربتات المحلية لليوزر ده، من غير ما تحتاج مدير."
          ],
          sol: R`[[Get-ExecutionPolicy]] في Windows PowerShell 5.1 على جهاز عادي غالبًا هيرجع [[Restricted]]، وفي PowerShell 7 على ويندوز [[RemoteSigned]]. و [[Get-ExecutionPolicy -List]] بيوريك كل scope لوحده (MachinePolicy و UserPolicy و Process و CurrentUser و LocalMachine) واللي مش متظبط بيبان [[Undefined]].

لو MachinePolicy أو UserPolicy عليهم قيمة، ده Group Policy من الشركة، و [[Set-ExecutionPolicy]] مش هيغيّر حاجة. وعلى لينكس والماك هتلاقيها [[Unrestricted]] (جربتها وكل الـ scopes طلعت كده) ومبتتغيرش، لأن الـ ExecutionPolicy ميزة ويندوز بس.`
        }
      ]
    },
    {
      t: "شكّل PowerShell بتاعك",
      l: 2,
      n: R`ألوان، و prompt بيوريك الفولدر والـ branch، واقتراحات من أوامرك القديمة، وأيقونات للملفات: الترمنال اللي قاعد قدامه كل يوم يبقى مريح ويديك المعلومة من غير ما تسأل عليها`,
      items: [
        {
          cmd: "$PSStyle",
          title: "لوّن الكلام والملفات",
          desc: R`[[$PSStyle]] متغير جاهز في PowerShell 7.2 وأحدث، فيه أكواد الألوان والتنسيق بأسامي مفهومة، فتلوّن أي نص بتطبعه، وتغيّر ألوان رسايل الـ error وأسامي الفولدرات والملفات في [[ls]].

الترمنال بيفهم الألوان من «أكواد ANSI»: حروف بتبدأ بحرف خاص اسمه ESC (رقمه 27) وبعده كود زي [[[32m]] (أخضر) أو [[[0m]] (رجّع كل حاجة عادي). [[$PSStyle.Foreground.Green]] هو الكود ده جاهز، و [[$PSStyle.Reset]] بيقفل التلوين، ولو نسيته كل اللي بعده هيفضل ملوّن. و [[$( )]] جوه نص بين double quotes بتحط قيمة جوه النص (درس النصوص). و [[$PSStyle.Foreground.FromRgb(0xFF8800)]] أي لون بالـ hex ([[0x]] قبل الرقم معناها إنه hex)، و [[$PSStyle.Bold]] خط عريض.

[[$PSStyle.Formatting.Error]] لون رسايل الـ error (وجنبه [[Warning]] و [[Verbose]] و [[TableHeader]] لعناوين الجداول). و [[$PSStyle.FileInfo.Directory]] لون الفولدرات في [[Get-ChildItem]]، و [[+]] بين كودين بيجمعهم (لون + bold). و [[$PSStyle.FileInfo.Extension[".md"]]] لون امتداد معين، والقوسين المربعين هنا بيختاروا المفتاح من لستة الامتدادات. و [[$PSStyle.OutputRendering]] بيقرر الألوان تطلع إمتى: [[Host]] (الافتراضي) ملوّن على الشاشة، و [[PlainText]] من غير ألوان خالص، و [[Ansi]] الأكواد دايمًا حتى لو الناتج رايح لملف.

التغيير ده للنافذة دي بس؛ عشان يفضل حطه في [[$PROFILE]] (درس «$PROFILE»). وفي Windows PowerShell 5.1 مفيش [[$PSStyle]] أصلًا، فبتكتب الكود بإيدك: [[$e = [char]27]] وبعدين [["$e[32mOK$e[0m"]]. والألوان شغالة في Windows Terminal و VS Code؛ في الكونسول القديم (conhost) مع 5.1 ممكن تشوف حروف زي [[←[32m]] بدل اللون.`,
          example: R`"$($PSStyle.Foreground.Green)OK$($PSStyle.Reset) build passed"
"$($PSStyle.Bold)$($PSStyle.Foreground.FromRgb(0xFF8800))3 warnings$($PSStyle.Reset)"
$PSStyle.Formatting.Error = $PSStyle.Foreground.BrightRed
$PSStyle.FileInfo.Directory = $PSStyle.Foreground.BrightBlue + $PSStyle.Bold
$PSStyle.FileInfo.Extension[".md"] = $PSStyle.Foreground.Magenta
Get-ChildItem
$PSStyle.OutputRendering`,
          try: R`خلّي ملفات [[.json]] تظهر أصفر في [[ls]]، واطبع [[$PSStyle.FileInfo.Extension.Keys]] عشان تشوف الامتدادات اللي ليها لون من الأول.`,
          deep: {
            why: R`الألوان مش زينة وبس: سطر [[OK]] أخضر وسطر [[FAIL]] أحمر بتلاحظهم من غير ما تقرا، والفولدرات بلون مختلف بتفرّقها عن الملفات بنظرة. وقبل 7.2 كنت لازم تحفظ أكواد زي [[[32m]] أو تستخدم [[Write-Host -ForegroundColor]] اللي مش بيدخل الـ pipeline.`,
            how: R`كل قيمة في [[$PSStyle]] نص عادي فيه كود ANSI، فتقدر تطبعه أو تلزقه في أي نص أو ترجعه من فانكشن. جرّب [[$PSStyle.Foreground.Red -replace [char]27, 'ESC']] هتشوف [[ESC[31m]]: الـ [[-replace]] بدّل حرف ESC (اللي مش بيتطبع) بكلمة عشان تشوفه.

الفرق عن [[Write-Host -ForegroundColor Green]]: Write-Host بيكتب على الشاشة بس (درس «Write-Host والـ output»)، لكن النص الملوّن بـ $PSStyle قيمة عادية تتخزن في متغير أو تبقى جزء من الـ prompt (الدرس الجاي). وكمان [[FromRgb]] بيديك أي لون من 16 مليون، و Write-Host مفيهوش غير الـ 16 لون بتوع الكونسول.

[[$PSStyle.Foreground]] فيه 16 لون: [[Black]] و [[Red]] و [[Green]] و [[Yellow]] و [[Blue]] و [[Magenta]] و [[Cyan]] و [[White]]، ولكل واحد نسخة [[Bright]] (و [[BrightBlack]] هو الرمادي). و [[$PSStyle.Background]] نفس الأسامي للخلفية. وفيه كمان [[Italic]] و [[Underline]] و [[Strikethrough]]، و [[Dim]] من 7.4. و [[$PSStyle.Progress.View]] شكل شريط التقدم: [[Minimal]] (الافتراضي، سطر واحد) أو [[Classic]] (المربع القديم فوق).

[[OutputRendering]] بـ [[Host]] بيشيل الأكواد من ناتج الـ formatting (الجداول و [[ls]] والـ errors) لما يروح لملف، فاللوج ميتملاش حروف غريبة. لكن النص اللي انت لازق فيه الأكواد بإيدك بيتكتب زي ما هو: جربت [[Get-ChildItem > ls.txt]] فالملف طلع من غير ESC، و [["$($PSStyle.Foreground.Green)hi" > s.txt]] الملف طلع فيه ESC. ولو متغير البيئة [[NO_COLOR]] موجود، PowerShell بيخلي OutputRendering بـ [[PlainText]] لوحده.`,
            when: R`في سكربتاتك عشان تلوّن النتايج المهمة (نجح، فشل، تحذير)، وفي الـ [[$PROFILE]] عشان تظبط ألوان الـ errors والملفات على ذوقك أو على خلفية الترمنال (الألوان الافتراضية معمولة لخلفية غامقة، فعلى خلفية فاتحة ممكن تحتاج تغيّرها).`,
            mistakes: R`تنسى [[$PSStyle.Reset]] في آخر النص فالسطر اللي بعده والـ prompt يتلوّنوا. أو تستخدم [[$PSStyle]] في سكربت هيشتغل على 5.1 فالألوان تبقى فاضية من غير أي error (المتغير مش موجود فقيمته [[$null]]). أو تحط ألوان في نص هيتكتب في ملف CSV أو JSON فتلاقي الأكواد جوه الداتا. أو تحط [[$PSStyle.OutputRendering = "PlainText"]] وتنسى، وبعدين تستغرب الألوان راحت فين.`
          },
          lines: [
            "نص فيه كلمة OK بالأخضر، و Reset بعدها عشان الباقي يرجع عادي.",
            "خط عريض ولون برتقالي بالـ hex ([[0xFF8800]]).",
            "رسايل الـ error تبقى أحمر فاتح.",
            "الفولدرات في ls أزرق فاتح وعريض (لونين مجموعين بـ [[+]]).",
            "ملفات .md بلون Magenta.",
            "اعرض الفولدر وشوف الألوان الجديدة.",
            "الألوان بتطلع إمتى؟ الافتراضي Host."
          ],
          sol: R`[[$PSStyle.FileInfo.Extension[".json"] = $PSStyle.Foreground.Yellow]] وبعدين [[Get-ChildItem]]: أسامي ملفات .json هتطلع صفرا والفولدرات بلونها. جربت المثال على PowerShell 7.6 وطلّعت الناتج بالأكواد بدل الألوان: الفولدر [[src]] طلع قبله [[ESC[94mESC[1m]] (أزرق فاتح + bold) وبعده [[ESC[0m]]، و [[notes.md]] قبله [[ESC[35m]] (Magenta)، و [[build.ps1]] قبله [[ESC[33;1m]] (لون جاهز لملفات PowerShell).

[[$PSStyle.FileInfo.Extension.Keys]] طلّع الامتدادات كل واحد في سطر: أول 11 جاهزين من الأول ([[.zip]] و [[.tgz]] و [[.gz]] و [[.tar]] و [[.nupkg]] و [[.cab]] و [[.7z]] و [[.ps1]] و [[.psd1]] و [[.psm1]] و [[.ps1xml]]، يعني ملفات الضغط وملفات PowerShell)، وبعدهم اللي انت زوّدته ([[.md]] و [[.json]]). وملحوظة: [[app.js]] طلع أخضر عريض من غير ما أحدد له لون، لأن [[.js]] موجود في متغير [[PATHEXT]] بتاع ويندوز فـ PowerShell بيعتبره ملف تنفيذي ويلوّنه بـ [[$PSStyle.FileInfo.Executable]]. ولو الألوان مش ظاهرة خالص، اطبع [[$PSStyle.OutputRendering]]: لو [[PlainText]] يبقى حد غيّره أو متغير [[NO_COLOR]] موجود (لقيته موجود في البيئة اللي جربت فيها، وأول ما شلته رجعت [[Host]]).`,
          solCode: R`$PSStyle.FileInfo.Extension[".json"] = $PSStyle.Foreground.Yellow
Get-ChildItem
$PSStyle.FileInfo.Extension.Keys`
        },
        {
          cmd: "function prompt",
          title: "اعمل الـ prompt بتاعك",
          desc: R`الـ prompt (الكلام اللي قبل المكان اللي بتكتب فيه، زي [[PS C:\Users\ali\projects\shop>]]) هو ناتج فانكشن اسمها [[prompt]]، و PowerShell بينادي عليها قبل كل أمر. لو عرّفت فانكشن بنفس الاسم، الـ prompt بتاعك هو اللي هيظهر: هنا الوقت، واسم الفولدر الحالي بس بدل المسار كله، والـ git branch، و [[[admin]]] لو النافذة أدمن، وسهم أخضر أو أحمر حسب آخر أمر نجح ولا لأ، وكمان اسم الفولدر في عنوان النافذة.

القاعدة الأساسية: الفانكشن لازم ترجع نص، والنص ده هو الـ prompt (عشان كده آخر سطر نص لوحده من غير [[Write-Host]]). لو مرجعتش حاجة أو حصل فيها error، PowerShell بيعرض [[PS>]] وخلاص.

السطرين اللي بره الفانكشن بيتحسبوا مرة واحدة بس: [[$IsAdmin]] بيسأل ويندوز «اليوزر الحالي ليه دور Administrator؟» ([[[Security.Principal.WindowsPrincipal]]] نوع من .NET، و [[::GetCurrent()]] بيجيب اليوزر الحالي)، و [[$HasGit]] هل git متسطب (و [[[bool]]] بيحوّل النتيجة لـ True أو False).

جوه الفانكشن: [[$ok = $?]] لازم أول سطر، لأن [[$?]] فيها True لو آخر أمر نجح، وأي سطر قبلها هيغيّرها. و [[$code = $LASTEXITCODE]] بيحفظ exit code آخر برنامج، لأن [[git]] جوه الـ prompt هيكتب فوقه، وفي الآخر [[$global:LASTEXITCODE = $code]] بيرجّعه ([[$global:]] يعني المتغير اللي بره الفانكشن، مش نسخة جواها). و [[Split-Path -Leaf $PWD.Path]] آخر جزء من المسار، و [[$PWD]] متغير جاهز فيه الفولدر الحالي. و [[git branch --show-current]] اسم الـ branch، و [[2>$null]] بيرمي رسالة الـ error لو انت مش جوه repo. و [[$Host.UI.RawUI.WindowTitle]] عنوان النافذة أو التاب. و [[+=]] بتزوّد على النص اللي في المتغير، والألوان من [[$PSStyle]] (الدرس اللي فات).

الكود ده بيفضل للنافذة دي بس. عشان يبقى دايم، الصقه في [[$PROFILE]] (افتحه بـ [[code $PROFILE]] أو [[notepad $PROFILE]]، والخطوات في درس «$PROFILE» في «البيئة والإعدادات») وبعدين [[. $PROFILE]].`,
          example: R`$IsAdmin = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
$HasGit = [bool](Get-Command git -ErrorAction SilentlyContinue)

function prompt {
    $ok = $?
    $code = $LASTEXITCODE
    $folder = Split-Path -Leaf $PWD.Path
    $branch = if ($HasGit) { git branch --show-current 2>$null }
    $Host.UI.RawUI.WindowTitle = "$folder - PowerShell"
    $p = "$($PSStyle.Foreground.BrightBlack)$(Get-Date -Format HH:mm) $($PSStyle.Foreground.Cyan)$folder"
    if ($branch) { $p += " $($PSStyle.Foreground.Green)($branch)" }
    if ($IsAdmin) { $p += " $($PSStyle.Foreground.Red)[admin]" }
    $arrow = if ($ok) { $PSStyle.Foreground.Green } else { $PSStyle.Foreground.Red }
    $global:LASTEXITCODE = $code
    "$p$arrow > $($PSStyle.Reset)"
}`,
          try: R`الصق الكود في النافذة، وادخل فولدر فيه git repo وفولدر مفيهوش، واكتب [[Get-Item nosuchfile]] وشوف السهم بقى أحمر. وبعدين احفظه في [[$PROFILE]].`,
          flag: "script",
          deep: {
            why: R`الـ prompt الافتراضي بيكتب المسار كله، فلما تبقى في [[C:\Users\ali\Documents\projects\shop\frontend\src]] نص الشاشة بيروح عليه. وأهم معلومة وانت شغال بـ git (انت على أنهي branch) مش ظاهرة، فتعمل commit على main بالغلط. prompt بيوريك اللي محتاجه بس بيوفّر عليك [[git status]] و [[pwd]] كل شوية.`,
            how: R`PowerShell بينادي [[prompt]] بعد كل أمر ويطبع اللي رجع. ولو PSReadLine شغال (وهو شغال افتراضيًا)، بيلوّن آخر [[> ]] في الـ prompt بالأحمر لو السطر اللي بتكتبه فيه غلطة syntax، ولو الحتة دي اتلخبطت مع الـ prompt بتاعك فيه [[Set-PSReadLineOption -PromptText "> "]].

الفانكشن بتتنفذ قبل كل أمر، فلازم تبقى سريعة: [[git branch --show-current]] بياخد ملّي ثواني، لكن [[git status]] على repo كبير ممكن ياخد ثانية كل مرة. وعشان كده [[$IsAdmin]] و [[$HasGit]] بره الفانكشن: بيتحسبوا مرة لما الـ profile يتحمّل، مش مع كل أمر.

[[(Get-Command prompt).ScriptBlock]] بيوريك كود الـ prompt الحالي. والافتراضي بتاع PowerShell هو [["PS $($ExecutionContext.SessionState.Path.CurrentLocation)$('>' * ($NestedPromptLevel + 1)) "]]. ولو عايز ترجع له، افتح نافذة جديدة (أو امسح الكود من الـ profile).

[[git branch --show-current]] محتاج git 2.22 أو أحدث، وفي حالة detached HEAD بيرجع فاضي فالـ branch مش هيظهر، وده مقصود. ولو git مش متسطب، [[2>$null]] لوحدها مش بتخفي error «is not recognized»، وعشان كده [[$HasGit]].

في 5.1 لو عايز ألوان، بدّل [[$PSStyle.Foreground.Green]] بـ [["$([char]27)[32m"]] و [[$PSStyle.Reset]] بـ [["$([char]27)[0m"]]. ولو عايز prompt جاهز بأيقونات من غير ما تكتب كود، ده oh-my-posh (آخر درس في الجزء ده)، بس هو بيعرّف [[prompt]] بتاعته، فاللي يتحمّل الأخير في الـ profile هو اللي بيكسب.`,
            when: R`أول ما تبدأ تشتغل في الترمنال يوميًا، وخصوصًا مع git ومع نوافذ أدمن ([[[admin]]] الأحمر بينبّهك قبل ما تمسح حاجة وانت بصلاحيات عالية). وعنوان النافذة مفيد لما يبقى عندك تابات كتير في Windows Terminal.`,
            mistakes: R`[[$ok = $?]] مش أول سطر، فبتقرا نتيجة سطر جوه الفانكشن مش آخر أمر انت كتبته، والسهم يفضل أخضر دايمًا. أو تطبع الـ prompt بـ [[Write-Host]] من غير ما ترجع نص، فيظهر جنبه [[PS>]]. أو تنسى ترجّع [[$LASTEXITCODE]] فسكربتاتك تقرا 128 بتاعة git. أو تحط أمر بطيء (زي [[git status]] أو طلب من النت) فكل Enter تستنى. أو تحط الكود في profile بتاع 5.1 وانت شغال على 7 (كل نسخة ليها [[$PROFILE]] منفصل).`
          },
          lines: [
            "مرة واحدة: اليوزر الحالي ليه دور Administrator؟ (يعني النافذة أدمن).",
            "مرة واحدة: git متسطب؟ [[[bool]]] بيحوّل الناتج لـ True أو False.",
            "فانكشن اسمها prompt بالظبط، فـ PowerShell يستخدمها بدل الافتراضية.",
            "أول سطر لازم: آخر أمر نجح؟ أي سطر قبله هيغيّر [[$?]].",
            "احفظ exit code آخر برنامج قبل ما git يكتب فوقه.",
            "اسم الفولدر الحالي بس، مش المسار كله.",
            "اسم الـ branch لو git موجود، و [[2>$null]] يخفي الـ error بره أي repo.",
            "اكتب اسم الفولدر في عنوان النافذة أو التاب.",
            "ابدأ النص: الوقت رمادي، واسم الفولدر cyan.",
            "لو فيه branch زوّدها بالأخضر بين قوسين.",
            "لو أدمن زوّد [[[admin]]] بالأحمر.",
            "لون السهم: أخضر لو آخر أمر نجح، أحمر لو فشل.",
            "رجّع الـ exit code زي ما كان للمتغير العام.",
            "النص اللي بيرجع هو الـ prompt، وفي آخره Reset عشان كلامك ميتلوّنش.",
            "قفلة الفانكشن."
          ],
          sol: R`جربته على PowerShell 7.6 (وشلت أكواد الألوان من الناتج عشان يتقري): في فولدر مشروع فيه git طلع [[13:20 full stack road map (main) > ]]، وفي [[$HOME]] طلع [[13:20 ali > ]] من غير branch، وعنوان النافذة بقى [[ali - PowerShell]]. وبعد [[Get-Item nosuchfile]] السهم بقى أحمر ([[ESC[31m]]) لأن [[$?]] بقت False، وأول أمر ناجح بعدها رجّعه أخضر.

وجربت ليه [[$global:LASTEXITCODE = $code]] مهم: من غيره، بعد [[cmd /c exit 3]] والـ prompt، [[$LASTEXITCODE]] بقى [[128]] (الـ exit code بتاع git لما يقول «not a git repository») بدل [[3]]، فأي سكربت بيفحصه بعدها هيتلخبط. ومعاه فضل [[3]].

وعلى Windows PowerShell 5.1 نفس الكود اشتغل وطلع نفس الكلام بس من غير ألوان، لأن [[$PSStyle]] مش موجود فكل الألوان بقت نص فاضي. ولما عملت [[$HasGit]] بـ False، الـ branch اختفى ومفيش error. ولو شلت الشرط ده وgit مش متسطب، [[2>$null]] مش بتخفي [[The term 'git' is not recognized]]، فكان هيطلع قبل كل prompt.`,
          solCode: R`if (-not (Test-Path $PROFILE)) { New-Item $PROFILE -Force }
code $PROFILE
. $PROFILE`
        },
        {
          cmd: "Set-PSReadLineOption -Colors",
          title: "ألوان الكلام وانت بتكتبه",
          desc: R`وانت بتكتب أمر، PSReadLine (الموديول اللي بيدير سطر الكتابة) بيلوّن كل حتة حسب نوعها: اسم الأمر لون، والـ parameters لون، والنصوص لون. [[Set-PSReadLineOption -Colors]] بيغيّر الألوان دي، و [[Get-PSReadLineOption]] بيعرض الإعدادات الحالية كلها ومنها الألوان.

[[-Colors]] بياخد hashtable ([[@{ }]]): كل مفتاح اسم حاجة، وقيمته اللون، وبينهم [[;]]. أهم المفاتيح: [[Command]] اسم الأمر، و [[Parameter]] اللي بيبدأ بشرطة زي [[-Recurse]]، و [[String]] النصوص بين علامات تنصيص، و [[Variable]] المتغيرات، و [[Comment]] التعليقات بعد [[#]]، و [[Number]] الأرقام، و [[Operator]] زي [[-eq]] و [[|]]، و [[Keyword]] زي [[if]] و [[foreach]]، و [[Error]] لون الغلطة (زي الـ [[>]] اللي بيحمر لما السطر فيه غلطة syntax)، و [[InlinePrediction]] لون الاقتراح الباهت (الدرس الجاي).

اللون ممكن يبقى بـ 3 طرق: اسم من ألوان الكونسول الـ 16 زي [["DarkGray"]] و [["Cyan"]]، أو hex زي المواقع [["#FFD700"]]، أو كود ANSI جاهز زي [[$PSStyle.Foreground.BrightRed]] أو [["$([char]27)[38;5;244m"]] (اللون رقم 244 من 256 لون). و [[(Get-PSReadLineOption).CommandColor]] بيرجع الكود الحالي، و [[-replace [char]27, 'ESC']] بيبدّل حرف ESC المخفي بكلمة عشان تشوفه.

الإعداد للنافذة دي بس؛ عشان يفضل حطه في [[$PROFILE]]. وده شغال في 5.1 كمان (PSReadLine 2.0 اللي جاي معاها بيقبل hex)، ماعدا [[InlinePrediction]] لأن الاقتراحات مش موجودة هناك.`,
          example: R`Get-PSReadLineOption
Set-PSReadLineOption -Colors @{ Command = "#FFD700"; Parameter = "DarkGray"; String = "#CE9178"; Variable = "Cyan"; Comment = "#6A9955" }
Set-PSReadLineOption -Colors @{ Error = $PSStyle.Foreground.BrightRed; InlinePrediction = "$([char]27)[38;5;244m" }
(Get-PSReadLineOption).CommandColor -replace [char]27, 'ESC'`,
          try: R`لوّن الأوامر بلون VS Code ([["#DCDCAA"]]) والـ parameters رمادي، واكتب [[Get-ChildItem -Path . -Filter "*.json" # test]] من غير Enter وشوف كل حتة بلونها.`,
          deep: {
            why: R`الألوان الافتراضية معمولة لخلفية سودا، فعلى ثيم فاتح ممكن الـ parameters الرمادي متتقريش. ولما ألوان الترمنال تبقى زي ألوان الـ editor بتاعك، عينك بتتعود على نفس المعنى في المكانين. والتلوين نفسه بيكشف الغلط بدري: لو النص فضل بلون الـ String لآخر السطر، يبقى نسيت تقفل علامة التنصيص.`,
            how: R`PSReadLine بيعمل parse للسطر مع كل حرف بتكتبه، ويلوّن كل token حسب نوعه. فالتلوين «فاهم» الكود: [[ls]] لوحدها بلون Command، لكن [["ls"]] بين علامات تنصيص بلون String.

[[Get-PSReadLineOption]] بيعرض كل لون باسم المفتاح + [[Color]] ([[CommandColor]] و [[StringColor]] ...)، والقيمة نفسها كود ANSI فبتظهر ملوّنة مش مقروءة، وعشان كده [[-replace]]. وفيه كمان [[Selection]] لون الكلام اللي محدده، و [[Emphasis]] لون الكلمة اللي بتدوّر عليها في Ctrl+R، و [[ContinuationPrompt]] لون [[>>]] في الأوامر اللي على كذا سطر، و [[ListPrediction]] و [[ListPredictionSelected]] ألوان قايمة الاقتراحات.

الألوان بالاسم (الـ 16) بتتغير حسب ثيم الترمنال: «Cyan» في ثيم Campbell غير «Cyan» في ثيم One Half Dark، أما hex بيطلع نفس اللون في أي ثيم. فلو عايز تغيّر شكل الترمنال كله، غيّر ثيم Windows Terminal نفسه (شوف درس الثيمات في تاب «اختصارات النظام») والـ 16 لون هيتغيروا مع بعض، واستخدم hex للحاجات اللي عايزها ثابتة.

ملحوظة على الأسامي: [["Cyan"]] بيطلع [[ESC[96m]] (الـ cyan الفاتح)، و [["DarkCyan"]] هو العادي [[ESC[36m]]. يعني أسامي الكونسول من غير Dark هي النسخ الفاتحة.`,
            when: R`مرة واحدة لما تظبط الترمنال بتاعك، أو لما تغيّر ثيم الترمنال لفاتح أو غامق وتلاقي حاجة مش مقروءة.`,
            mistakes: R`تكتب المفتاح زي اسم الخاصية في Get-PSReadLineOption ([[CommandColor]] بدل [[Command]]) أو تزوّد حرف ([[Commands]]) فيطلع «is not a valid color property». أو تغيّر الألوان وتستغرب إنها راحت لما فتحت نافذة جديدة (لازم [[$PROFILE]]). أو تختار لون للـ Parameter قريب من الخلفية فمتشوفوش. أو تحط [[InlinePrediction]] في profile بتاع 5.1: PSReadLine 2.0 مفيهوش المفتاح ده فبيطلع [['InlinePrediction' is not a valid color property]].`
          },
          lines: [
            "اعرض الإعدادات الحالية كلها، ومنها لون كل نوع.",
            "غيّر ٥ ألوان مرة واحدة: hex زي المواقع، أو اسم لون من الـ 16.",
            "لون الغلطة من [[$PSStyle]]، ولون الاقتراح بكود ANSI (اللون 244 من 256).",
            "اقرا لون الأوامر الحالي، و [[-replace]] يبدّل حرف ESC المخفي بكلمة تتقري."
          ],
          sol: R`[[Set-PSReadLineOption -Colors @{ Command = "#DCDCAA"; Parameter = "DarkGray" }]] وبعدين اكتب السطر: [[Get-ChildItem]] هيبان أصفر فاتح، و [[-Path]] و [[-Filter]] رمادي، و [["*.json"]] بلون الـ String، و [[# test]] بلون الـ Comment. التغيير بيبان على طول على اللي بتكتبه، مش محتاج Enter.

جربت المثال على PSReadLine 2.4.5 (اللي جاي مع PowerShell 7.6) وطلّعت الأكواد: [["#FFD700"]] بقت [[ESC[38;2;255;215;0m]] (لون 24-bit: أحمر 255 وأخضر 215 وأزرق 0)، و [["DarkGray"]] بقت [[ESC[90m]]، و [["Cyan"]] بقت [[ESC[96m]]، و [[InlinePrediction]] بقت [[ESC[38;5;244m]]. ولو كتبت مفتاح غلط زي [[Commands]] بيطلع [['Commands' is not a valid color property]]، ولو لون غلط زي [["Reddish"]] بيطلع [['Reddish' is not a valid color value. It must be a ConsoleColor, ANSI escape sequence, or RGB value with optional leading '#'.]]`,
          solCode: R`Set-PSReadLineOption -Colors @{ Command = "#DCDCAA"; Parameter = "DarkGray" }
(Get-PSReadLineOption).CommandColor -replace [char]27, 'ESC'`
        },
        {
          cmd: "PredictionViewStyle",
          title: "اقتراحات من أوامرك القديمة و Tab بقايمة",
          desc: R`PSReadLine في PowerShell 7 بيقترح عليك أمر كامل من اللي كتبته قبل كده وانت لسه بتكتب أول حروفه (اسمها Predictive IntelliSense): الاقتراح بيظهر باهت بعد المؤشر، والسهم يمين يقبله. ومعاه شوية اختصارات بتخلي Tab والأسهم أذكى.

[[-PredictionSource]] الاقتراحات جاية منين: [[History]] من تاريخ أوامرك بس، و [[HistoryAndPlugin]] التاريخ + أي plugin متسطب (محتاج PowerShell 7.2 أو أحدث)، و [[None]] تقفلها. و [[-PredictionViewStyle]] شكلها: [[InlineView]] سطر باهت بعد المؤشر (الافتراضي)، و [[ListView]] قايمة تحت السطر تختار منها بالأسهم وجنب كل اقتراح مصدره زي [[[History]]]. و F2 بيبدّل بين الشكلين وانت بتكتب.

[[Set-PSReadLineKeyHandler]] بيربط زرار بوظيفة: [[-Key Tab -Function MenuComplete]] يخلي Tab يعرض قايمة بكل الاختيارات تتحرك فيها بالأسهم، بدل ما يلف عليهم واحد واحد (نفس Ctrl+Space). و [[HistorySearchBackward]] على السهم فوق: لو كتبت [[git]] وضغطت فوق، يجيبلك آخر أوامر كانت بتبدأ بـ git بس، ولو السطر فاضي بيشتغل عادي. و [[HistorySearchForward]] نفس الحكاية للسهم تحت. و [[(Get-Module PSReadLine).Version]] بيقولك نسخة PSReadLine.

النسخ مهمة هنا: الاقتراحات ظهرت في PSReadLine 2.1، و [[ListView]] و [[HistoryAndPlugin]] في 2.2، وبقت شغالة لوحدها من 2.2.6. و PowerShell 7.6.6 كان معاه 2.4.5، لكن Windows PowerShell 5.1 جاي بـ 2.0.0 اللي مفيهوش اقتراحات خالص و [[-PredictionSource]] بيطلع فيه error. وكل ده للنافذة دي بس، فحطه في [[$PROFILE]].`,
          example: R`Get-PSReadLineOption | Select-Object PredictionSource, PredictionViewStyle
Set-PSReadLineOption -PredictionSource HistoryAndPlugin
Set-PSReadLineOption -PredictionViewStyle ListView
Set-PSReadLineKeyHandler -Key Tab -Function MenuComplete
Set-PSReadLineKeyHandler -Key UpArrow -Function HistorySearchBackward
Set-PSReadLineKeyHandler -Key DownArrow -Function HistorySearchForward
(Get-Module PSReadLine).Version`,
          try: R`شغّل السطور، واكتب [[git]] بس وشوف القايمة واتحرك فيها بالأسهم. وبعدين اضغط F2 وارجع للشكل الـ Inline واقبل الاقتراح بالسهم يمين. وبعدين جرّب Tab بعد [[Get-Net]].`,
          deep: {
            why: R`أغلب اللي بتكتبه في الترمنال كتبته قبل كده: [[npm run dev]] و [[git push origin main]] و [[docker compose up -d]]. الاقتراحات بتكمّلهولك من أول حرفين، والـ ListView بيوريك كذا أمر قديم مرة واحدة بدل ما تفضل تضغط فوق عشرين مرة. و Tab بالقايمة بيوريك كل الاختيارات بدل ما تخمّن.`,
            how: R`اقتراحات History جاية من ملف التاريخ الدائم بتاع PSReadLine (مكانه في [[(Get-PSReadLineOption).HistorySavePath]]، درس «History والاختصارات»)، مش من [[Get-History]] بتاع الجلسة، فبتلاقي أوامر من أيام فاتت.

الـ plugins موديولات بتضيف مصادر اقتراحات، زي [[CompletionPredictor]] اللي بيقترح من الحاجات اللي Tab بيكمّلها، و [[Az.Tools.Predictor]] لأوامر Azure. بتشتغل مع [[HistoryAndPlugin]] أو [[Plugin]] وفي 7.2 وأحدث بس.

السهم يمين بيقبل الاقتراح كله (الوظيفة [[ForwardChar]] بتقبله لما المؤشر يبقى في آخر السطر). ولو عايز كلمة كلمة، توثيق Microsoft بيقترح تربط زرار بـ [[ForwardWord]]: [[Set-PSReadLineKeyHandler -Chord "Ctrl+f" -Function ForwardWord]].

[[Get-PSReadLineKeyHandler]] بيعرض كل الاختصارات المربوطة، و Ctrl+Alt+? بيعرضها وانت بتكتب. و [[Set-PSReadLineOption -EditMode Emacs]] بيخلي الاختصارات زي bash (Ctrl+A أول السطر و Ctrl+E آخره)، بس بيمسح أي ربط عملته قبله، فحطه الأول في الـ profile.

في 5.1 تقدر تحدّث PSReadLine بـ [[Install-Module PSReadLine -Scope CurrentUser -Force]] (ولو طلع error حدّث PowerShellGet الأول)، فتاخد اقتراحات History بس، من غير plugins. والأسهل تستخدم PowerShell 7.`,
            when: R`أول ما تسطّب PowerShell 7 وتبدأ تستخدمه يوميًا. والـ ListView مفيد في أول أسابيع لما بتنسى الأوامر، وبعد ما تحفظها ممكن ترجع للـ Inline لأنه أهدى.`,
            mistakes: R`تحط [[-PredictionSource]] في profile بيتشغّل كمان لما برنامج يشغّل pwsh والناتج رايح لملف، فيطلع error «console output doesn't support virtual terminal processing» كل مرة، و [[-ErrorAction SilentlyContinue]] مش بيخفيه؛ حطه جوه [[try { } catch { }]] (الـ solCode). أو تنقل نفس الـ profile لـ 5.1 فيطلع «A parameter cannot be found». أو تستغرب إن الاقتراحات مش بتظهر في PowerShell ISE (مفيهوش PSReadLine). أو تنسى إن الاقتراحات من تاريخك، فلو كتبت باسورد في أمر قبل كده ممكن يظهر مقترح قدام حد؛ امسحه من ملف التاريخ.`
          },
          lines: [
            "الإعداد الحالي: مصدر الاقتراحات وشكلها.",
            "اقترح من تاريخ أوامرك ومن أي plugin متسطب (7.2 وأحدث).",
            "اعرض الاقتراحات قايمة تحت السطر بدل سطر باهت (F2 بيبدّل).",
            "Tab يعرض قايمة بكل الاختيارات بدل ما يلف عليهم واحد واحد.",
            "السهم فوق يدوّر في التاريخ على الأوامر اللي بتبدأ باللي كتبته.",
            "السهم تحت نفس الحكاية للأحدث.",
            "نسخة PSReadLine: الاقتراحات محتاجة 2.1 والقايمة 2.2."
          ],
          sol: R`بعد [[ListView]]، كتابة [[git]] بتطلّع تحت السطر قايمة بأوامر git اللي كتبتها قبل كده وجنب كل واحد [[[History]]]، والأسهم بتتحرك فيها، و Enter بينفّذ المختار. و F2 بيرجّعها سطر واحد باهت، والسهم يمين يحط الاقتراح كله في السطر تعدّله أو تنفّذه. و Tab بعد [[Get-Net]] بقى يعرض كل الأوامر (Get-NetAdapter و Get-NetIPAddress ...) تختار منها بالأسهم.

جربت السطور على PowerShell 7.6.6 فـ [[Get-PSReadLineKeyHandler -Bound]] أكد [[Tab MenuComplete]] و [[UpArrow HistorySearchBackward]] و [[DownArrow HistorySearchForward]] و [[F2 SwitchPredictionView]]، و [[(Get-Module PSReadLine).Version]] طلع [[2.4.5]]. ولما شغّلت نفس الأوامر من سكربت الناتج بتاعه رايح لملف، [[-PredictionSource]] طلع [[The predictive suggestion feature cannot be enabled because the console output doesn't support virtual terminal processing or it's redirected.]] (في نافذة عادية مفيش المشكلة دي)، و [[try/catch]] مسكه. وعلى 5.1 بـ PSReadLine 2.0.0 طلع [[A parameter cannot be found that matches parameter name 'PredictionSource'.]]`,
          solCode: R`try { Set-PSReadLineOption -PredictionSource HistoryAndPlugin -PredictionViewStyle ListView } catch { }
Set-PSReadLineKeyHandler -Key Tab -Function MenuComplete
Set-PSReadLineKeyHandler -Key UpArrow -Function HistorySearchBackward
Set-PSReadLineKeyHandler -Key DownArrow -Function HistorySearchForward`
        },
        {
          cmd: "Terminal-Icons",
          title: "أيقونات وألوان للملفات في ls",
          desc: R`[[Terminal-Icons]] موديول بيحط أيقونة جنب كل ملف وفولدر في [[Get-ChildItem]] (فولدر، JavaScript، صورة، zip...) ويلوّنهم حسب النوع، زي اللي بتشوفه في VS Code. الأيقونات دي حروف من خطوط Nerd Font، فلازم الترمنال يبقى شغال بخط منهم وإلا هتشوف مربعات أو علامات استفهام (شوف درس «Nerd Font» في تاب «اختصارات النظام»).

[[Install-Module]] بينزّل موديول من PowerShell Gallery (المخزن الرسمي للموديولات)، و [[-Repository PSGallery]] اسم المخزن، و [[-Scope CurrentUser]] يسطّبه ليك بس فمش محتاج أدمن. أول مرة هيسألك «Untrusted repository ... Are you sure?» فاكتب [[Y]]. و [[Import-Module]] بيحمّله في النافذة دي، وبعدها [[Get-ChildItem]] (أو [[ls]]) هيطلع بالأيقونات.

التحميل بياخد وقت مع كل نافذة جديدة، فالسطر الرابع بيقيسه: [[Measure-Command]] بيرجع الوقت اللي الكود اللي بين [[{ }]] خده (درس Measure-Command في المستوى التالت)، و [[-Force]] يحمّل الموديول من جديد حتى لو متحمّل. وبعدين [[Add-Content $PROFILE]] بيزوّد سطر الـ Import في آخر الـ profile عشان يتحمّل مع كل نافذة (لو الملف مش موجود اعمله الأول، درس «$PROFILE»). و [[Show-TerminalIconsTheme]] بيعرضلك الأيقونات والألوان اللي في الثيم الحالي.

الموديول شغال على 5.1 و 7، وآخر نسخة منه على PowerShell Gallery هي [[0.11.0]] من يوليو 2023، فاعتبره «شغال وثابت» مش «بيتطور».`,
          example: R`Install-Module Terminal-Icons -Repository PSGallery -Scope CurrentUser
Import-Module Terminal-Icons
Get-ChildItem
Measure-Command { Import-Module Terminal-Icons -Force }
Add-Content $PROFILE "Import-Module Terminal-Icons"
Show-TerminalIconsTheme`,
          try: R`سطّبه، واعرض فولدر مشروع فيه ملفات js و json و md، وقيس وقت التحميل. لو أكتر من نص ثانية فكّر يستاهل ولا لأ.`,
          deep: {
            why: R`في فولدر فيه 40 ملف، الأيقونة واللون بيخلوك تلاقي الـ [[.env]] أو الـ [[Dockerfile]] أو الصور بنظرة من غير ما تقرا كل اسم. نفس فكرة الأيقونات في VS Code، وفي [[lsd]] و [[eza]] على لينكس.`,
            how: R`PowerShell بيعرض أي object حسب «format view» مكتوب له. Terminal-Icons بيضيف view جديد للملفات والفولدرات (الأنواع اللي Get-ChildItem بيرجعها) بيحط في عمود Name الأيقونة والاسم بلون. والأيقونة بتتختار من اسم الملف أو امتداده، فـ [[package.json]] ليه أيقونة غير أي [[.json]] تاني.

ده عرض بس: الـ objects نفسها متغيرتش، فـ [[Get-ChildItem | Select-Object Name]] و [[Where-Object]] و [[Export-Csv]] شغالين عادي من غير أيقونات. وعشان الموديول بيعرض عمود الاسم بطريقته، ألوانه بتيجي من ثيم Terminal-Icons، فلو لقيت ألوان [[$PSStyle.FileInfo]] (أول درس هنا) اختفت من الأسامي بعد ما حمّلته، ده السبب. [[Get-TerminalIconsColorTheme]] و [[Get-TerminalIconsIconTheme]] بيعرضوا الثيمات، و [[Set-TerminalIconsTheme]] بيغيّر.

لو التحميل بطيء: في issue «Slow import» على GitHub الناس قاسوا من حوالي نص ثانية لـ ٢ ثانية حسب الجهاز والنسخة. فيه طريقة منتشرة (مجرّبتهاش هنا) إنك تأجّل التحميل لحد ما الترمنال يفضى: [[Register-EngineEvent PowerShell.OnIdle -MaxTriggerCount 1 -Action { Import-Module Terminal-Icons -Global }]] في الـ profile بدل Import-Module العادي، فالنافذة تفتح على طول والأيقونات تظهر بعدها بشوية. أو ببساطة متحطوش في الـ profile واكتب Import-Module لما تحتاجه.`,
            when: R`على جهازك الشخصي لو بتقضي وقت كتير في الترمنال بتتنقل بين فولدرات. مش على سيرفر، ومش في سكربتات (مالهاش لازمة هناك).`,
            mistakes: R`تسطّبه وتنسى الـ Nerd Font فتلاقي مربعات وتفتكر الموديول بايظ. أو تسطّبه بـ [[-Scope AllUsers]] من نافذة مش أدمن فيطلع error. أو تحط الـ Import في profile بتاع 5.1 وانت شغال على 7 (كل واحد ليه [[$PROFILE]]). أو تكتب [[Install-Module]] في الـ profile نفسه بدل [[Import-Module]]، فكل نافذة تحاول تسطّبه من النت.`
          },
          lines: [
            "نزّل الموديول من PowerShell Gallery ليك بس (من غير أدمن).",
            "حمّله في النافذة دي.",
            "اعرض الفولدر: كل اسم جنبه أيقونة ولون.",
            "قيس وقت التحميل ([[-Force]] يحمّله من جديد).",
            "زوّد سطر التحميل في آخر الـ profile عشان يشتغل مع كل نافذة.",
            "اعرض أيقونات وألوان الثيم الحالي."
          ],
          sol: R`(مسطّبتش الموديول على الجهاز اللي كتبت عليه الدرس عشان مسطّبش حاجة عليه، فده من صفحة الموديول على GitHub و PowerShell Gallery؛ اتأكدت من هناك إن آخر نسخة 0.11.0 وإن أوامره فيها Show-TerminalIconsTheme و Set-TerminalIconsTheme.) بعد [[Import-Module]]، [[Get-ChildItem]] بيطلع نفس الجدول بس جنب كل اسم أيقونة: فولدر لـ [[src]]، وشعار JavaScript لـ [[app.js]]، وأقواس لـ [[package.json]]، وكل نوع بلون. لو شايف مربعات فاضية أو [[?]] بدل الأيقونات، الخط مش Nerd Font: غيّره من إعدادات الترمنال (Windows Terminal: Settings ثم الـ Profile ثم Appearance ثم Font face، و VS Code من [[terminal.integrated.fontFamily]]).

[[Measure-Command]] هيرجع TimeSpan، بص على [[TotalMilliseconds]]. الرقم ده بيتضاف على كل نافذة تفتحها. لو كبير ومضايقك، شيل السطر من الـ profile واكتب [[Import-Module Terminal-Icons]] بس لما تحتاجه، أو قارن وقت فتح الترمنال كله قبل وبعد (درس Measure-Command).`
        },
        {
          cmd: "oh-my-posh",
          title: "prompt جاهز بثيمات",
          desc: R`[[oh-my-posh]] برنامج بيرسم الـ prompt بثيمات جاهزة: الفولدر، والـ git branch وحالته، ونسخة node أو python في المشروع، ووقت تنفيذ آخر أمر، بأيقونات وألوان. بيشتغل مع PowerShell و bash و zsh، فلو بتشتغل على أكتر من شيل يبقى نفس الشكل في الكل.

محتاج خط Nerd Font زي Terminal-Icons (الثيمات اللي في اسمها [[minimal]] بس مش محتاجاه). السطر الأول بيسطّبه بـ winget، و [[--source winget]] يعني من مخزن winget مش Microsoft Store، وبعدها افتح نافذة جديدة عشان الـ PATH يتحدّث. والتاني [[oh-my-posh font install meslo]] بينزّل خط Meslo Nerd Font ويسطّبه (من غير أدمن بيتسطب لليوزر بتاعك بس)، وبعدها اختار [[MesloLGM Nerd Font]] في إعدادات خط الترمنال.

[[oh-my-posh init pwsh]] بيطبع كود PowerShell بيعرّف فانكشن [[prompt]] جديدة، و [[| Invoke-Expression]] بينفّذ النص ده كأنه كود. و [[--config]] الثيم: اسم ثيم جاهز زي [['atomic']] أو [['jandedobbeleer']] (بيتنزّل من النت أول مرة ويتخزن)، أو مسار ملف عندك، أو لينك. تشغيل السطر ده في النافذة بيغيّر شكلها هي بس، فدي طريقتك تجرّب كذا ثيم من غير ما تلمس الـ profile. وكل الثيمات بصورها في صفحة [[ohmyposh.dev/docs/themes]].

لما تختار: [[oh-my-posh config export]] بينسخ الثيم لملف عندك ([[--output]] مكانه)، فالترمنال يفتح من غير نت وتقدر تعدّل فيه. وسطر [[Add-Content]] بيحط الـ init بمسار الملف ده في آخر الـ [[$PROFILE]]: علامات التنصيص الفردية بره بتخلي [[$HOME]] يتكتب في الملف زي ما هو ويتحسب لما الـ profile يشتغل. وآخر سطر بيحدّث البرنامج.

لو لقيت شرح قديم بيقول [[Install-Module oh-my-posh]] أو [[Set-PoshPrompt]] أو مسار جوه [[$env:POSH_THEMES_PATH]]: ده كان زمان. الموديول القديم اتوقف، والدوكيومنتيشن الحالي بيستخدم اسم الثيم على طول. ونفس الطريقة شغالة في 5.1 كمان، بس ليها [[$PROFILE]] منفصل.`,
          example: R`winget install JanDeDobbeleer.OhMyPosh --source winget
oh-my-posh font install meslo
oh-my-posh init pwsh --config 'atomic' | Invoke-Expression
oh-my-posh init pwsh --config 'jandedobbeleer' | Invoke-Expression
oh-my-posh config export --config 'jandedobbeleer' --output "$HOME\.mytheme.omp.json"
Add-Content $PROFILE 'oh-my-posh init pwsh --config "$HOME\.mytheme.omp.json" | Invoke-Expression'
winget upgrade JanDeDobbeleer.OhMyPosh --source winget`,
          try: R`جرّب 3 ثيمات في نفس النافذة بالسطر التالت (غيّر الاسم بس)، واختار واحد واحفظه، وقيس وقت فتح الترمنال قبل وبعد بـ [[Measure-Command { pwsh -c exit }]].`,
          deep: {
            why: R`كتابة prompt بإيدك (درس «function prompt») بتعلّمك الفكرة، لكن oh-my-posh بيديك من غير مجهود حاجات صعب تعملها بنفسك: حالة الـ git كاملة (ملفات متعدلة، commits مستنية push)، ونسخة اللغة حسب المشروع، ووقت تنفيذ آخر أمر، والـ exit code، وبنفس الشكل في PowerShell و bash على WSL.`,
            how: R`[[oh-my-posh]] برنامج exe عادي مش موديول PowerShell. سطر الـ init بيعرّف [[prompt]] بتنادي البرنامج ده قبل كل أمر، والبرنامج يقرا ملف الثيم (JSON أو YAML أو TOML) ويرجّع الـ prompt بالأكواد والألوان. فأي فانكشن [[prompt]] كتبتها بنفسك هتتلغي لو سطر oh-my-posh جه بعدها في الـ profile: اللي في الآخر هو اللي بيكسب.

[[Invoke-Expression]] بينفّذ أي نص كأنه كود، فمتستخدمهوش مع نص جاي من مصدر مش واثق فيه؛ هنا النص جاي من البرنامج اللي انت مسطّبه. ولو الـ ExecutionPolicy مانعة حاجة، الدوكيومنتيشن بيقترح [[oh-my-posh init pwsh --eval | Invoke-Expression]] وبيقول إنها أبطأ.

ملف الثيم مقسوم «segments»: كل segment حاجة بتتعرض (path و git و node و time ...)، وتقدر تشيل أو تزوّد وتغيّر ألوانها بتعديل الملف اللي عملته بـ [[config export]]. و [[oh-my-posh print preview]] بيطبع شكل الـ prompt من غير ما تغيّر حاجة.

الوقت: كل نافذة بتشغّل oh-my-posh للـ init، وكل prompt بيشغّله تاني. الثيم بالاسم أو اللينك بيتنزل من النت أول مرة وبيتخزن، والملف المحلي أسرع وبيشتغل من غير نت. وكل ده شغال مع Terminal-Icons و PSReadLine في نفس الـ profile، لأن كل واحد بيشتغل في حتة مختلفة (الـ prompt، والكتابة، وعرض الملفات).`,
            when: R`لو عايز prompt غني من غير ما تكتب كود، أو بتشتغل على PowerShell و bash في WSL وعايز نفس الشكل. ولو الترمنال بقى بطيء في الفتح على جهاز ضعيف، الـ prompt المكتوب بإيدك أخف.`,
            mistakes: R`تسطّبه وتنسى الـ Nerd Font. أو تحط الـ init قبل function prompt بتاعتك في الـ profile وتستغرب إن الشكل مش بتاعه (أو العكس). أو تمشي على شرح قديم بـ [[Install-Module oh-my-posh]] و [[Set-PoshPrompt]] أو مسار جوه [[$env:POSH_THEMES_PATH]] مش موجود عندك. أو تستخدم ثيم بالاسم والجهاز من غير نت أول مرة. أو تجرّب في نافذة كانت مفتوحة قبل التسطيب فتلاقي «oh-my-posh is not recognized».`
          },
          lines: [
            "سطّب oh-my-posh من مخزن winget، وافتح نافذة جديدة بعدها.",
            "نزّل خط Meslo Nerd Font وسطّبه لليوزر بتاعك.",
            "جرّب ثيم atomic في النافذة دي بس ([[Invoke-Expression]] بينفّذ الكود اللي init طبعه).",
            "جرّب ثيم تاني في نفس النافذة.",
            "انسخ الثيم اللي اخترته لملف عندك.",
            "زوّد سطر الـ init بالملف ده في آخر الـ profile.",
            "حدّث oh-my-posh لآخر نسخة."
          ],
          sol: R`(مسطّبتش oh-my-posh على الجهاز اللي كتبت عليه الدرس؛ الأوامر من الدوكيومنتيشن الرسمي على ohmyposh.dev وقت كتابة الدرس، صفحات Windows و Prompt و Customize و Fonts.) بعد سطر الـ init، الـ prompt بيتغيّر على طول في نفس النافذة: [[atomic]] مثلًا بيطلع سطر بخلفيات ملونة فيه اسم اليوزر والفولدر والـ branch، وبعدها سطر جديد بتكتب فيه. ولو شايف مربعات أو [[?]]، الخط مش Nerd Font: اختار [[MesloLGM Nerd Font]] في إعدادات الترمنال (Windows Terminal: Settings ثم Defaults ثم Appearance ثم Font face، أو في settings.json تحت [[profiles.defaults.font.face]]).

لو [[oh-my-posh]] نفسه طلع [[is not recognized]] بعد التسطيب، اقفل الترمنال كله وافتحه تاني (وفي VS Code اعمل Restart). ولو الـ profile طلع [[running scripts is disabled]]، ده الـ ExecutionPolicy (درس ExecutionPolicy). وللقياس: [[(Measure-Command { pwsh -c exit }).TotalMilliseconds]] قبل وبعد، وقارنه بـ [[pwsh -NoProfile -c exit]]؛ عندي من غير profile الاتنين كانوا حوالي 300 ملّي ثانية، والفرق بعد أي إضافة هو اللي الـ profile بيضيفه على كل نافذة.`
        }
      ]
    },
    {
      t: "ضغط وهاش",
      l: 2,
      n: "",
      items: [
        {
          cmd: "Compress-Archive",
          title: "zip وفكه",
          desc: R`[[Compress-Archive]] بيعمل ملف zip و [[Expand-Archive]] بيفكه، من غير أي برنامج زيادة، زي [[zip]] و [[unzip]] في لينكس. [[-Path]] اللي هيتضغط، و [[-DestinationPath]] اسم الـ zip أو الفولدر اللي هيتفك فيه.

[[dist\*]] بالنجمة يعني «اللي جوه dist»، فالـ zip هيبقى جواه الملفات على طول. لو كتبت [[dist]] من غير [[\*]]، الـ zip هيبقى جواه فولدر اسمه dist والملفات جوّاه. وده بيفرق لما ترفعه على سيرفر وتفكه.

[[tar]] كمان موجود في ويندوز 10 و 11 بنفس حروف لينكس: [[-c]] اعمل، و [[-z]] اضغط gzip، و [[-f app.tar.gz]] اسم الملف، و [[app]] اللي هيتضغط. مفيد لو السيرفر لينكس ومتعود على tar.gz. وخلي بالك: لو الـ zip موجود قبل كده Compress-Archive هيطلع error، استخدم [[-Force]] يكتب فوقه أو [[-Update]] يضيف عليه.`,
          example: R`Compress-Archive -Path dist\* -DestinationPath dist.zip
Expand-Archive dist.zip -DestinationPath out
tar -czf app.tar.gz app`,
          try: "اضغط فولدر وفكه في مكان تاني.",
          deep: {
            why: R`باك أب سريع لفولدر، أو تجهيز ملف ترفعه على سيرفر أو تبعته لحد، من غير ما تسطّب WinRAR أو 7-Zip. Compress-Archive مبني جوه PowerShell، و tar موجود جنبه لو محتاج tar.gz.`,
            how: R`[[Compress-Archive -Path ".\folder" -DestinationPath "archive.zip"]] يعمل zip. [[-Update]] يضيف لـ zip موجود.

[[Expand-Archive -Path "archive.zip" -DestinationPath ".\output"]] يفكّه. [[-Force]] يكتب فوق لو الفولدر موجود.

[[Compress-Archive -Path ".\file1.txt", ".\file2.txt" -Destination "files.zip"]] ملفات متعددة.

بس PowerShell Compress-Archive بطيء على ملفات كتير. لو عندك 7-Zip: [[7z a archive.7z folder\]] أسرع بكتير.`,
            when: "باك أب. إرسال مشروع. نقل ملفات.",
            mistakes: R`Path ممكن تاخد * : [[Compress-Archive ".\logs\*.log"]] بس الـ wildcards مش شغالة في كل الأحوال. خليها بين quotes.`
          },
          lines: ["اضغط محتوى dist في zip.", "فك zip في فولدر out.", "tar موجود في ويندوز 10 وأحدث، بنفس حروف لينكس."],
          sol: R`[[Compress-Archive -Path app\* -DestinationPath app.zip]] وبعدين [[Expand-Archive app.zip -DestinationPath out]]. جربتها فـ [[Get-ChildItem out -Recurse -Name]] طلع [[src]] و [[src\server.js]] زي الأصل.

لو كتبت [[-Path app]] من غير [[\*]]، الـ zip هيبقى جواه فولدر app، فبعد الفك هتلاقي [[out\app\src]]. ولو شغلت الضغط تاني على نفس اسم الـ zip هيطلع [[The archive file ... already exists. Use the -Update parameter ... or use the -Force parameter]]، ونفس الحكاية Expand-Archive على فولدر فيه نفس الملفات محتاج [[-Force]].`,
          solCode: R`Compress-Archive -Path app\* -DestinationPath app.zip
Expand-Archive app.zip -DestinationPath out
Get-ChildItem out -Recurse -Name`
        },
        {
          cmd: "Get-FileHash",
          title: "اتأكد إن الملف سليم",
          desc: R`الهاش (hash) بصمة للملف: رقم طويل بيتحسب من كل بايت فيه، ولو بايت واحد اتغير البصمة كلها بتتغير. [[Get-FileHash]] بيحسبها، و [[-Algorithm SHA256]] نوع البصمة (وده الافتراضي أصلًا، والمواقع غالبًا بتكتبه). المقابل في لينكس [[sha256sum]].

الاستخدام: صفحة تحميل برنامج بتكتب الـ SHA256 بتاعه، تحسبه انت على الملف اللي نزل وتقارن. لو زي بعض، الملف وصل سليم ومحدش عدّل فيه. ونفس الفكرة تتأكد إن نسخة باك أب زي الأصل.

المقارنة الأسهل: [[(Get-FileHash .\setup.exe).Hash -eq "الرقم من الموقع"]] بترجع True أو False، و [[-eq]] مش بيفرّق بين الحروف الكابيتال والسمول، فمش مشكلة إن الموقع كاتبه سمول. و [[.\setup.exe]] يعني الملف في الفولدر الحالي.`,
          example: R`Get-FileHash .\setup.exe -Algorithm SHA256`,
          try: "اطلع الهاش لأي ملف عندك.",
          deep: {
            why: "التأكد إن ملف وصل سليم بعد النقل أو نزل بدون تعديل. زي sha256sum في bash.",
            how: R`[[Get-FileHash file.zip]] بيحسب SHA256 افتراضيًا. [[-Algorithm MD5]] أو [[-Algorithm SHA512]] لو محتاج.

[[(Get-FileHash file.zip).Hash]] الـ hash بس كنص.

قارن: [[Get-FileHash file.zip -Algorithm SHA256]] وبعدين قارن الـ Hash بالقيمة على الموقع.`,
            when: "بعد تحميل برنامج. بعد نسخ ملفات مهمة. للتأكد من سلامة باك أب.",
            mistakes: "نسيان إن الأحرف lowercase وuppercase ممكن تختلف في الـ hash المعروض وذاك. PowerShell بيطبع uppercase."
          },
          lines: ["بصمة SHA256 للملف، قارنها باللي على موقع التحميل."],
          sol: R`[[Get-FileHash .\setup.exe -Algorithm SHA256]] بيطبع 3 حاجات: [[Algorithm SHA256]] و [[Hash]] (64 حرف hex كابيتال) و [[Path]]. جربتها على ملف وقارنتها بـ [[sha256sum]] على لينكس، طلعوا نفس الرقم بالظبط بس sha256sum بيكتبه حروف صغيرة.

الفرق في الكابيتال مش مهم، و [[-eq]] في PowerShell مش بيفرق بين كابيتال وسمول، فتقدر تقارن: [[(Get-FileHash .\setup.exe).Hash -eq "abc..."]]. لو رجع False يبقى الملف اتعدل أو التحميل بايظ، أو انت بتقارن بهاش نسخة تانية. [[SHA256]] هو الافتراضي أصلًا، فممكن تشيل [[-Algorithm]].`
        }
      ]
    }
]);
