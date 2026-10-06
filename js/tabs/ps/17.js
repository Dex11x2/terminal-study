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

[[Get-NetNeighbor]] هو جدول الـ ARP، زي [[arp -a]] (درس «arp / route» في تاب «CMD»): الأجهزة اللي جهازك كلّمها قريب، و [[LinkLayerAddress]] الـ MAC بتاعها. و [[-State Reachable, Stale, Delay, Probe]] الحالات اللي وراها جهاز حقيقي، و [[Where-Object IPAddress -like "$prefix.*"]] شبكتك بس من غير شبكة WSL. و [[[System.Net.Dns]::GetHostEntry($ip).HostName]] بيسأل عن اسم الجهاز، و [[try { } catch { "?" }]] بيحط علامة استفهام لو السؤال فشل (وساعات الجهاز اللي ملوش اسم بيرجع بالعنوان نفسه مكان الاسم من غير error). و [[-f]] بيكتب السطر بتنسيق (درس «النصوص (strings)»)، و [[{0,-15}]] يعني القيمة الأولى في 15 خانة عشان العمود يتظبط.

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
          teach: R`## الفكرة: نسأل كل عنوان في الشبكة «انت موجود؟»

شبكة البيت غالبًا عناوينها من [[192.168.1.1]] لـ [[192.168.1.254]]. المثال بيعرف الأول انت على أنهي شبكة، وبعدين يبعت ping لكل العناوين دي مع بعض، ويجمع اللي رد، ويكمّل بجدول الـ MAC وأسامي الأجهزة. كله اتشغّل على PowerShell 7.6 على شبكة واي فاي في البيت (الـ MAC مقصوص في الناتج).

---

## ١. عنوانك انت

~~~powershell
$myIp = (Get-NetIPConfiguration | Where-Object IPv4DefaultGateway | Select-Object -First 1).IPv4Address.IPAddress
~~~

نفكّه من جوه لبرة:

### [[Get-NetIPConfiguration]]

بيطلّع كارت لكل اتصال عندك: الواي فاي، والإيثرنت، وكروت افتراضية زي WSL و VPN.

### [[Where-Object IPv4DefaultGateway]]

الـ **default gateway** هو الراوتر، الباب اللي بتخرج منه للنت. الكروت الافتراضية ملهاش gateway، فالفلتر ده بيسيب الكارت اللي عليه اتصالك الحقيقي بس. لما تكتب اسم خاصية لوحده بعد [[Where-Object]] معناها «اللي الخاصية دي فيها قيمة».

### [[Select-Object -First 1]]

لو متوصل بكابل وواي فاي مع بعض هيبقى فيه اتنين، فخد أول واحد.

### [[( ... ).IPv4Address.IPAddress]]

الأقواس «نفّذ الأول»، وبعدين النقطة بتدخل جوه النتيجة: [[IPv4Address]] object كامل، وجواه [[IPAddress]] العنوان كنص.

~~~text الناتج ($myIp)
192.168.1.65
~~~

---

## ٢. الشبكة من غير آخر رقم

~~~powershell
$prefix = $myIp -replace '\.\d+$', ''
~~~

[[-replace]] بيدوّر بـ **regex** (نمط بحث) ويبدّل باللي بعد الفاصلة، وهنا نص فاضي يعني «امسح». النمط حتة حتة:

| الحتة | معناها |
|---|---|
| [[\.]] | نقطة حقيقية (النقطة لوحدها في regex معناها «أي حرف») |
| [[\d+]] | رقم واحد أو أكتر ([[d]] من digit) |
| [[$]] | آخر النص |

يعني «نقطة وبعدها أرقام في آخر النص»:

~~~text الناتج ($prefix)
192.168.1
~~~

> ده بيفترض إن الشبكة [[/24]]، يعني آخر رقم بس اللي بيتغير. ده حال أغلب شبكات البيوت.

---

## ٣. الـ ping sweep

~~~powershell
$alive = 1..254 | ForEach-Object -Parallel { $ip = "$using:prefix.$_"; if (Test-Connection $ip -Count 1 -TimeoutSeconds 1 -Quiet) { $ip } } -ThrottleLimit 64
~~~

### [[1..254]]

الـ [[..]] بتعمل لستة أرقام من 1 لـ 254، وكل رقم بيعدّي في الـ [[|]] للي بعده.

### [[ForEach-Object -Parallel { ... } -ThrottleLimit 64]]

[[ForEach-Object]] العادي بيشغّل البلوك على كل رقم **واحد ورا التاني**: 254 عنوان × ثانية انتظار = أكتر من ٤ دقايق. [[-Parallel]] بيشغّل البلوك على كذا رقم في نفس الوقت، و [[-ThrottleLimit 64]] يعني ٦٤ مع بعض بالكتير. [[-Parallel]] موجود في PowerShell 7 بس.

### جوه البلوك: [[$ip = "$using:prefix.$_"]]

- [[$_]] الرقم الحالي (مثلًا 7).
- كل بلوك [[-Parallel]] بيشتغل في «runspace» لوحده، ومش شايف متغيراتك. [[$using:prefix]] بيقوله «هات قيمة [[$prefix]] من بره».
- النص بين علامتين [[" "]] بيحط القيم مكان المتغيرات، فيطلع [[192.168.1.7]].
- [[;]] بتفصل بين أمرين على نفس السطر.

### [[Test-Connection $ip -Count 1 -TimeoutSeconds 1 -Quiet]]

ده الـ ping بتاع PowerShell: [[-Count 1]] رسالة واحدة، و [[-TimeoutSeconds 1]] استنى ثانية بالكتير، و [[-Quiet]] رجّع [[True]] أو [[False]] بس بدل جدول. فـ [[if (...) { $ip }]] بيطلّع العنوان لو رد، والنتايج كلها بتتجمع في [[$alive]].

على الشبكة دي خلص في **4.4 ثانية** وطلع 15 عنوان، بس بترتيب ملخبط لأن كل واحد بيخلص في وقته:

~~~text الناتج ($alive قبل الترتيب، أوله)
192.168.1.1, 192.168.1.5, 192.168.1.20, 192.168.1.3, 192.168.1.6, ...
~~~

---

## ٤. الترتيب كأرقام

~~~powershell
$alive = $alive | Sort-Object { [version]$_ }
~~~

لو رتّبت العناوين كنص، المقارنة حرف حرف، و [[1]] قبل [[2]]، فـ [[.10]] تيجي قبل [[.2]]. جربت:

~~~text الناتج
Sort-Object               →  192.168.1.10, 192.168.1.2
Sort-Object { [version]$_ } →  192.168.1.2, 192.168.1.10
~~~

[[[version]]] نوع معمول لأرقام النسخ زي [[1.2.10]]: بيقرا كل جزء بين النقط كرقم. والعنوان شكله نفس الشكل، فبيترتب صح. والـ [[{ }]] بعد [[Sort-Object]] معناها «رتّب بالقيمة اللي البلوك ده بيحسبها لكل عنصر».

والسطر الخامس [[$alive]] لوحده بيطبعهم:

~~~text الناتج
192.168.1.1
192.168.1.3
192.168.1.5
...
192.168.1.65
192.168.1.68
~~~

---

## ٥. جدول الـ neighbors (ARP)

~~~powershell
Get-NetNeighbor -AddressFamily IPv4 -State Reachable, Stale, Delay, Probe | Where-Object IPAddress -like "$prefix.*" | Select-Object IPAddress, LinkLayerAddress, State
~~~

كل جهاز جهازك كلّمه على الشبكة المحلية، جهازك بيحفظ الـ **MAC** بتاعه (عنوان كارت الشبكة الثابت) جنب الـ IP. ده جدول الـ ARP.

| الحتة | معناها |
|---|---|
| [[-AddressFamily IPv4]] | العناوين اللي شكلها 192.168... بس، من غير IPv6 |
| [[-State Reachable, Stale, Delay, Probe]] | الحالات اللي وراها جهاز حقيقي اتكلّم معاه. من غيرها هتلاقي عناوين broadcast و multicast ثابتة |
| [[-like "$prefix.*"]] | شبكتك بس. [[*]] أي حاجة، فـ [[192.168.1.*]] |
| [[LinkLayerAddress]] | الـ MAC |

~~~text الناتج (أول 3 سطور)
IPAddress     LinkLayerAddress      State
---------     ----------------      -----
192.168.1.201 D8-0F-99-xx-xx-xx Reachable
192.168.1.180 A0-D3-7A-xx-xx-xx Reachable
192.168.1.68  2A-DE-57-xx-xx-xx Reachable
~~~

لاحظ: [[192.168.1.201]] و [[192.168.1.180]] **مش** في لستة الـ ping. يعني أجهزة مش بترد على ping بس جهازك عارف إنها موجودة. عشان كده الاتنين مع بعض أحسن من واحد.

---

## ٦. الأسامي

~~~powershell
foreach ($ip in $alive) { $name = try { [System.Net.Dns]::GetHostEntry($ip).HostName } catch { "?" }; "{0,-15} {1}" -f $ip, $name }
~~~

### [[foreach ($ip in $alive) { ... }]]

لفّة على اللستة، وكل مرة العنوان في [[$ip]]. استخدمنا اسم بدل [[$_]] لأن جوه [[catch]] الـ [[$_]] بيبقى الـ error نفسه.

### [[[System.Net.Dns]::GetHostEntry($ip).HostName]]

[[[System.Net.Dns]]] كلاس من .NET، و [[::]] بتنادي method جاهزة فيه من غير ما تعمل object. [[GetHostEntry]] بيعمل **reverse DNS**: بيدّيله IP ويسأل «اسمك إيه؟»، و [[.HostName]] الاسم.

### [[$name = try { ... } catch { "?" }]]

لو السؤال فشل بـ error، [[catch]] بيرجّع [[?]] بدل ما السطر يقع، والنتيجة في الحالتين بتتحط في [[$name]].

### [[ "{0,-15} {1}" -f $ip, $name ]]

[[-f]] بيملا القالب: [[{0}]] أول قيمة و [[{1}]] التانية. و [[,-15]] يعني «خد ١٥ خانة، والنص على الشمال»، وده اللي بيخلي العمود التاني يبدأ في نفس المكان:

~~~text الناتج
"{0,-15}|" -f "abc"   →  abc            |
"{0,15}|" -f "abc"    →              abc|
~~~

وناتج اللفة على الشبكة دي:

~~~text الناتج
192.168.1.1     192.168.1.1
192.168.1.65    MYPC
192.168.1.20    192.168.1.20
~~~

جهازي طلع باسمه. لكن الراوتر وجهاز تاني رجع **العنوان نفسه** مكان الاسم، من غير error، فالـ [[?]] مطلعتش. يعني «الاسم = العنوان» معناها «ملوش اسم مسجّل»، و [[?]] بتظهر لما السؤال يفشل خالص (حصلت على شبكة تانية، شوف الـ sol).

---

## ٧. ويندوز PowerShell 5.1 (الـ solCode)

في 5.1 مفيش [[-Parallel]]:

~~~text الناتج في 5.1
ForEach-Object : Parameter set cannot be resolved using the specified named parameters.
~~~

البديل بيستخدم .NET مباشرة:

| السطر | بيعمل إيه |
|---|---|
| [[[System.Net.NetworkInformation.Ping]::new()]] | يعمل object بتاع ping |
| [[.SendPingAsync("$prefix.$_", 1000)]] | يبعت ping **من غير ما يستنى**، ويرجّع «Task» (وعد بنتيجة)، و 1000 مللي ثانية = ثانية |
| [[[System.Threading.Tasks.Task]::WaitAll($tasks)]] | استنى الـ 254 Task لحد ما يخلصوا كلهم |
| [[$_.Result.Status -eq "Success"]] | النتيجة: [[Success]] لو رد، و [[TimedOut]] لو لأ |
| [[$_.Result.Address.ToString()]] | العنوان اللي رد كنص |

جربته على 5.1 على نفس الشبكة: خلص في **0.8 ثانية** وطلع 18 عنوان (الأجهزة النايمة بتصحى وتغيب، فالعدد بيتغير من مرة للتانية).

---

## الخلاصة

| الخطوة | الأمر | الناتج |
|---|---|---|
| عنوانك | [[Get-NetIPConfiguration]] + gateway | [[192.168.1.65]] |
| الشبكة | [[-replace '\.\d+$', '']] | [[192.168.1]] |
| مين حي | [[ForEach-Object -Parallel]] + [[Test-Connection -Quiet]] | لستة عناوين |
| ترتيب | [[Sort-Object { [version]$_ }]] | .2 قبل .10 |
| الـ MAC | [[Get-NetNeighbor]] | بيلقط كمان اللي مش بيرد على ping |
| الاسم | [[GetHostEntry]] | اسم، أو العنوان نفسه، أو [[?]] |

ومتشغّلوش غير على شبكتك أو بإذن صاحبها.`,
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
          teach: R`## الفكرة: نبني رسالة صغيرة ونبعتها لكل الشبكة

الجهاز المقفول ملوش IP، بس كارت الشبكة بتاعه صاحي وبيسمع. فبنبعت رسالة لكل الشبكة (broadcast) فيها الـ MAC بتاعه متكرر، وهو لما يشوف الـ MAC بتاعه يصحّي الجهاز. أول ٣ سطور بيبنوا الرسالة، والأربعة اللي بعدهم بيبعتوها. اتشغّل كله على PowerShell 7.6 و 5.1 بـ MAC وهمي.

---

## ١. الـ MAC

~~~powershell
$mac = "00-11-22-33-44-55"
~~~

الـ **MAC** عنوان ثابت محفور في كارت الشبكة: ٦ أجزاء، كل جزء رقمين **hex** (نظام العد بـ 16: من 0 لـ 9 وبعدين A لـ F). تجيبه من [[Get-NetAdapter]] على الجهاز اللي هيصحى:

~~~text الناتج من Get-NetAdapter (مقصوص)
Name      InterfaceDescription                MacAddress        Status
Ethernet  Realtek PCIe GbE Family Controller  F0-2F-74-xx-xx-xx Disconnected
Wi-Fi     Intel(R) Wi-Fi 6 AX200 160MHz       84-1B-77-xx-xx-xx Up
~~~

خد بتاع الكارت اللي الجهاز هيبقى متوصل بيه وهو مقفول (غالبًا الـ Ethernet).

---

## ٢. من نص لبايتات

~~~powershell
$macBytes = $mac -split '[-:]' | ForEach-Object { [Convert]::ToByte($_, 16) }
~~~

### [[-split '[-:]']]

[[-split]] بيقطّع النص. و [[[-:]]] regex معناه «شرطة **أو** نقطتين»، عشان الـ MAC ساعات بيتكتب [[00:11:22...]].

~~~text الناتج
00 | 11 | 22 | 33 | 44 | 55
~~~

### [[[Convert]::ToByte($_, 16)]]

كل جزء لسه نص. [[[Convert]]] كلاس تحويل في .NET، و [[ToByte]] بيحوّل لـ **byte** (رقم من 0 لـ 255)، و [[16]] معناها «النص ده مكتوب hex»:

~~~text الناتج
[Convert]::ToByte("FF", 16)  →  255
[Convert]::ToByte("5D", 16)  →  93
~~~

و [[$macBytes]] بقى 6 أرقام. لو طبعته هتلاقيه بالعشري، و 11 hex = 17:

~~~text الناتج ("$macBytes")
0 17 34 51 68 85
~~~

---

## ٣. الـ magic packet

~~~powershell
$packet = @(0xFF) * 6 + $macBytes * 16
~~~

| الحتة | معناها |
|---|---|
| [[0xFF]] | رقم مكتوب hex. [[0x]] بتقول «اللي بعدي hex»، و FF = 255 |
| [[@( )]] | اعمله array (لستة) |
| [[@(0xFF) * 6]] | ضرب array في رقم بيكرر عناصرها: 6 مرات 255 |
| [[$macBytes * 16]] | الـ 6 بايتات بتوع الـ MAC متكررين 16 مرة = 96 |
| [[+]] | بين لستتين بيلزقهم |

6 + 96 = **102**. جربت:

~~~text الناتج
$packet.Count              →  102
$packet.GetType().Name     →  Object[]
أول 12 بايت (hex)          →  FF FF FF FF FF FF 00 11 22 33 44 55
~~~

النوع [[Object[]]] مش byte array، بس [[.Send()]] تحت بيستنى bytes، و PowerShell بيحوّلها لوحده (اشتغلت في 5.1 و 7).

---

## ٤. الإرسال

~~~powershell
$udp = [System.Net.Sockets.UdpClient]::new()
$udp.EnableBroadcast = $true
$udp.Send($packet, $packet.Count, [System.Net.IPEndPoint]::new([System.Net.IPAddress]::Broadcast, 9))
$udp.Close()
~~~

### [[[System.Net.Sockets.UdpClient]::new()]]

[[::new()]] بيعمل object جديد من الكلاس. و **UDP** طريقة إرسال بتبعت الرسالة وخلاص، من غير اتصال ولا انتظار رد (عكس TCP).

### [[$udp.EnableBroadcast = $true]]

الويندوز بيمنع الإرسال لكل الشبكة إلا لو طلبته صريح. السطر ده بيطلبه.

### [[.Send(البايتات, عددها, لمين)]]

[[.Send]] بياخد ٣ حاجات: الـ packet، وعدد البايتات اللي هتتبعت منها، والعنوان. والعنوان نفسه object بنعمله جوه بعض:

~~~text من جوه لبرة
[System.Net.IPAddress]::Broadcast             →  255.255.255.255  (كل الشبكة المحلية)
[System.Net.IPEndPoint]::new(..., 9)          →  255.255.255.255:9  (العنوان + البورت)
~~~

**البورت** رقم الباب على الجهاز، و 9 المعتاد للـ WoL. و [[.Send]] بيرجّع عدد البايتات اللي خرجت:

~~~text الناتج
102
~~~

**102 مش معناها إن جهاز صحي.** UDP مش بيستنى رد، فنفس الرقم بيطلع والـ MAC وهمي. اتأكد بـ ping بعد دقيقة.

### [[$udp.Close()]]

بيقفل الـ socket ويرجّع البورت المحلي للنظام.

---

## ٥. على الجهاز اللي هيصحى: الكارت جاهز؟

~~~powershell
Get-NetAdapterAdvancedProperty -Name "Ethernet" | Where-Object DisplayName -like "*Wake*" | Select-Object DisplayName, DisplayValue
~~~

[[Get-NetAdapterAdvancedProperty]] هو تاب Advanced في إعدادات الكارت في Device Manager، و [[-like "*Wake*"]] الإعدادات اللي فيها كلمة Wake بس. على اللابتوب ده:

~~~text الناتج
DisplayName                                                 DisplayValue
-----------                                                 ------------
Wake on magic packet when system is in the S0ix power state Disabled
Wake on Magic Packet                                        Enabled
Wake on pattern match                                       Enabled
~~~

المهم [[Wake on Magic Packet]] يبقى [[Enabled]]. وسطر الـ S0ix ([[Disabled]]) معناه إن الكارت مش هيصحّي الجهاز من «Modern Standby» (نوع sleep في اللابتوبات الحديثة). ولو اسم الكارت عندك مختلف، شوفه من [[Get-NetAdapter]].

---

## الخلاصة

| الخطوة | السطر | الناتج |
|---|---|---|
| MAC → bytes | [[-split]] + [[[Convert]::ToByte($_, 16)]] | 6 أرقام |
| الـ packet | [[@(0xFF) * 6 + $macBytes * 16]] | 102 بايت |
| socket | [[[System.Net.Sockets.UdpClient]::new()]] + [[EnableBroadcast]] | جاهز يبعت لكل الشبكة |
| إرسال | [[.Send(..., 255.255.255.255:9)]] | 102 (حتى لو مفيش جهاز) |
| تجهيز الجهاز التاني | [[Get-NetAdapterAdvancedProperty]] | [[Wake on Magic Packet Enabled]] |

ومن غير إعداد الـ BIOS والكارت (في الـ desc) الكود هيبعت صح ومحدش هيصحى.`,
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
          teach: R`## الفكرة: ٣ خطوات على جهاز، وخطوتين على التاني

على الجهاز اللي عليه الفولدر: تشارك الفولدر، وتفتح الفايروول. وعلى الجهاز التاني: تتأكد إن البورت واصل، وتعمل للشير حرف drive. المثال فيه سطرين بيغيّروا في الجهاز ([[New-SmbShare]] و [[Enable-NetFirewallRule]])، ودول مشغّلتهمش؛ اللي اتجرّب هو العرض والفحص، على PowerShell 7.6 من غير أدمن.

---

## ١. اللي متشارك دلوقتي: [[Get-SmbShare]]

**SMB** هو البروتوكول اللي ويندوز بيشارك بيه الملفات (Server Message Block). و [[Get-SmbShare]] بيعرض الشيرات اللي جهازك بيقدمها:

~~~text الناتج (من غير ما أشارك حاجة)
Name   Path       Description
----   ----       -----------
ADMIN$ C:\WINDOWS Remote Admin
C$     C:\        Default share
D$     D:\        Default share
E$     E:\        Default share
IPC$              Remote IPC
~~~

دي شيرات إدارة ويندوز بيعملها لوحده. الـ [[$]] في آخر الاسم معناها «مخفي» (مش بيظهر لما حد يتصفح جهازك)، ومحدش يفتحها غير بحساب أدمن على الجهاز.

---

## ٢. شارك الفولدر

~~~powershell
New-SmbShare -Name "Shared" -Path "D:\Shared" -FullAccess "PC\ali" -ReadAccess "PC\sara"
~~~

| الحتة | معناها |
|---|---|
| [[-Name "Shared"]] | الاسم اللي هيظهر على الشبكة: [[\\PC\Shared]] |
| [[-Path "D:\Shared"]] | الفولدر الحقيقي على الديسك، لازم يبقى موجود |
| [[-FullAccess "PC\ali"]] | ali يقرا ويكتب ويمسح |
| [[-ReadAccess "PC\sara"]] | sara تقرا بس |

و [[PC\ali]] معناها «اليوزر ali **على الجهاز** اللي اسمه PC». يعني اللي هيدخل من الجهاز التاني لازم يكتب يوزر وباسورد موجودين على الجهاز ده. والأمر محتاج Terminal أدمن. حسب التوثيق بيطبع الشير الجديد بالاسم والمسار.

---

## ٣. افتح الفايروول

~~~powershell
Enable-NetFirewallRule -Group "@FirewallAPI.dll,-28502"
~~~

الفايروول بيقفل SMB افتراضيًا. القواعد اللي بتفتحه متجمعة في جروب اسمه «File and Printer Sharing»، بس الاسم ده بيتترجم لو ويندوز بلغة تانية. [[@FirewallAPI.dll,-28502]] هو «رقم» الاسم ده جوه ملف ويندوز، وثابت في كل اللغات. جربت أقراه:

~~~powershell
Get-NetFirewallRule -Group "@FirewallAPI.dll,-28502" | Group-Object Enabled | Select-Object Name, Count
(Get-NetFirewallRule -Group "@FirewallAPI.dll,-28502" | Select-Object -First 1).DisplayGroup
~~~

~~~text الناتج
Name  Count
----  -----
False    32

File and Printer Sharing
~~~

يعني 32 قاعدة كلها مقفولة ([[False]])، و [[DisplayGroup]] أكّد إن الرقم ده هو «File and Printer Sharing». [[Group-Object Enabled]] بيجمّع القواعد حسب قيمة [[Enabled]] ويعدّ كل مجموعة. و [[Enable-NetFirewallRule]] (أدمن) بيقلبهم [[True]].

> وعشان الجهاز يبان أصلًا لازم الشبكة Private. على الجهاز ده [[Get-NetConnectionProfile]] طلّع [[NetworkCategory Public]]، يعني حتى بعد المشاركة محدش هيوصل لحد ما تغيّرها (درس Set-NetConnectionProfile).

---

## ٤. من الجهاز التاني: البورت واصل؟

~~~powershell
Test-NetConnection PC -Port 445
~~~

SMB بيشتغل على **بورت 445**. [[Test-NetConnection]] بيحاول يفتح اتصال TCP بالجهاز على البورت ده. جربته على جهازي نفسه ([[localhost]]) لأنه بيقدّم الشيرات الإدارية:

~~~text الناتج
ComputerName     : localhost
RemotePort       : 445
TcpTestSucceeded : True
~~~

[[TcpTestSucceeded : True]] يعني البورت مفتوح وواصل. ولو [[False]] من جهاز تاني، غالبًا الفايروول أو الشبكة Public.

---

## ٥. حرف drive للشير

~~~powershell
New-SmbMapping -LocalPath S: -RemotePath \\PC\Shared -Persistent $true
~~~

- [[\\PC\Shared]] عنوان الشير: [[\\]] في الأول معناها «جهاز على الشبكة»، وبعدها اسم الجهاز، وبعدها اسم الشير.
- [[-LocalPath S:]] الحرف اللي هيظهر في This PC.
- [[-Persistent $true]] يفضل بعد الـ restart.

أو بنفس الفكرة:

~~~powershell
New-PSDrive -Name S -PSProvider FileSystem -Root \\PC\Shared -Persist -Credential (Get-Credential)
~~~

| الحتة | معناها |
|---|---|
| [[-Name S]] | اسم الـ drive من غير [[:]] |
| [[-PSProvider FileSystem]] | نوعه ملفات (مش registry مثلًا) |
| [[-Root]] | بيشاور على فين |
| [[-Persist]] | drive حقيقي يظهر في Explorer ويفضل |
| [[-Credential (Get-Credential)]] | الأقواس بتشغّل [[Get-Credential]] الأول، فيظهر مربع يسألك يوزر وباسورد الجهاز التاني |

---

## ٦. لما تخلص

~~~powershell
Remove-SmbShare -Name "Shared" -Force
~~~

بيوقف المشاركة بس، و [[-Force]] من غير سؤال. الفولدر وملفاته بيفضلوا مكانهم.

---

## الخلاصة

| فين | الأمر | محتاج أدمن؟ |
|---|---|---|
| جهاز الفولدر | [[Get-SmbShare]] | لأ |
| جهاز الفولدر | [[New-SmbShare]] | أيوه |
| جهاز الفولدر | [[Enable-NetFirewallRule -Group "@FirewallAPI.dll,-28502"]] | أيوه |
| الجهاز التاني | [[Test-NetConnection PC -Port 445]] | لأ |
| الجهاز التاني | [[New-SmbMapping]] أو [[New-PSDrive -Persist]] | لأ (واعمله من Terminal عادي) |
| جهاز الفولدر | [[Remove-SmbShare -Force]] | أيوه |

والصلاحية اللي بتوصل فعلًا هي الأضيق من صلاحية الشير وصلاحية NTFS على الفولدر.`,
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
          teach: R`## الفكرة: PowerShell على جهاز تاني

فيه طرفين: جهاز **بيستقبل** (لازم تفعّل عليه الـ remoting مرة واحدة)، وجهاز **بيبعت** (جهازك). بعد كده يا إما تفتح جلسة وتقعد فيها ([[Enter-PSSession]])، يا إما تبعت بلوك أوامر وترجعلك النتيجة ([[Invoke-Command]]). مفعّلتش remoting على الجهاز ده؛ اللي اتجرّب هو الفحص على PowerShell 7.6 من غير أدمن، والباقي من توثيق Microsoft.

---

## ١. على الجهاز اللي هيستقبل

~~~powershell
Enable-PSRemoting -Force
~~~

السطر ده بيعمل كذا حاجة مرة واحدة:

1. يشغّل خدمة **WinRM** (Windows Remote Management) ويخليها تقوم مع ويندوز. دي اللي بتسمع على **بورت 5985**.
2. يعمل **endpoint**: «باب» بيدخل منه الـ PowerShell البعيد.
3. يفتح قواعد WinRM في الفايروول للشبكات الـ Private.

و [[-Force]] من غير ما يسألك على كل خطوة. ده حال الخدمة والفايروول على جهازي **قبل** التفعيل:

~~~powershell
Get-Service WinRM | Select-Object Name, Status, StartType
Get-NetFirewallRule -Name "WINRM*" | Select-Object Name, Enabled, Profile
~~~

~~~text الناتج
Name   Status StartType
----   ------ ---------
WinRM Stopped    Manual

Name                             Enabled         Profile
----                             -------         -------
WINRM-HTTP-In-TCP                  False          Public
WINRM-HTTP-Compat-In-TCP           False Private, Public
WINRM-HTTP-In-TCP-NoScope          False Domain, Private
WINRM-HTTP-Compat-In-TCP-NoScope   False          Domain
~~~

[[Stopped]] و [[Manual]] يعني الخدمة واقفة ومش بتقوم لوحدها، والقواعد كلها [[False]]. و [["WINRM*"]] النجمة معناها «أي اسم بيبدأ بـ WINRM».

---

## ٢. على جهازك: ثق في الجهاز التاني

~~~powershell
Set-Item WSMan:\localhost\Client\TrustedHosts -Value "192.168.1.20" -Concatenate -Force
~~~

في شركة فيها **domain** الأجهزة بتعرف بعض. في البيت لأ، فلازم تقول لجهازك «الجهاز ده موثوق، ابعتله الباسورد».

- [[WSMan:\]] درايف PowerShell فيه إعدادات WinRM (زي ما [[HKCU:\]] فيه الـ registry). و [[localhost\Client\TrustedHosts]] إعداد اللستة الموثوقة على جهازك.
- [[Set-Item ... -Value]] بيكتب قيمة.
- [[-Concatenate]] زوّد العنوان على اللستة بدل ما تمسح اللي فيها.
- [[-Force]] من غير سؤال.

والدرايف ده مش موجود والخدمة واقفة. جربت أقراه:

~~~text الناتج
Cannot find path 'WSMan:\localhost\Client\TrustedHosts' because it does not exist.
~~~

---

## ٣. اليوزر والباسورد

~~~powershell
$cred = Get-Credential
~~~

[[Get-Credential]] بيفتح مربع يسألك يوزر وباسورد، ويحطهم في object واحد في [[$cred]] (الباسورد جواه متشفّر في الذاكرة مش نص عادي). اكتب حساب أدمن **على الجهاز التاني**، زي [[PC2\admin]].

---

## ٤. ادخل واخرج

~~~powershell
Enter-PSSession -ComputerName 192.168.1.20 -Credential $cred
Exit-PSSession
~~~

بعد [[Enter-PSSession]] الـ prompt بيتغيّر وفي أوله اسم الجهاز التاني، فتعرف إن أي أمر بتكتبه بيتنفذ هناك:

~~~text الشكل (من التوثيق)
[192.168.1.20]: PS C:\Users\admin\Documents>
~~~

و [[Exit-PSSession]] بيرجعك لجهازك. ولو الجهاز التاني مش مفعّل عليه الـ remoting بيطلع error اتصال، زي ده لما جربت على جهازي:

~~~powershell
Invoke-Command -ComputerName localhost -ScriptBlock { hostname }
~~~

~~~text الناتج
Connecting to remote server localhost failed with the following error message : The client cannot connect to the destination specified in the request. Verify that the service on the destination is running and is accepting requests. ... run the following command on the destination to analyze and configure the WinRM service: "winrm quickconfig". ...
~~~

يعني «مفيش WinRM شغال يرد».

---

## ٥. أمر على كذا جهاز مرة واحدة

~~~powershell
Invoke-Command -ComputerName 192.168.1.20, 192.168.1.21 -Credential $cred -ScriptBlock { Get-CimInstance Win32_OperatingSystem | Select-Object Caption, LastBootUpTime }
~~~

| الحتة | معناها |
|---|---|
| [[-ComputerName 192.168.1.20, 192.168.1.21]] | الفاصلة بتعمل لستة، فالبلوك بيتبعت للاتنين **مع بعض** |
| [[-ScriptBlock { ... }]] | الكود اللي هيتشغّل **هناك** |
| [[Win32_OperatingSystem]] | معلومات ويندوز: [[Caption]] اسم النسخة، و [[LastBootUpTime]] آخر مرة اشتغل |

النتايج بترجع لجهازك ومعاها عمود زيادة [[PSComputerName]] بيقولك كل سطر جه منين. والـ objects بترجع «نسخة» (deserialized): فيها الخصائص بس من غير methods.

---

## ٦. نفس الحكاية على SSH (PowerShell 7)

~~~powershell
Enter-PSSession -HostName 192.168.1.20 -UserName admin
~~~

لاحظ الفرق: [[-HostName]] و [[-UserName]] بدل [[-ComputerName]] و [[-Credential]]. ده معناه «استخدم SSH مش WinRM»، فمفيش TrustedHosts، وبيشتغل مع لينكس والماك. اتأكدت إن [[-HostName]] موجود في [[Enter-PSSession]] على 7.6. ومحتاج OpenSSH Server على الجهاز التاني (الدرس الجاي).

---

## الخلاصة

| | WinRM | SSH |
|---|---|---|
| الجهاز التاني | [[Enable-PSRemoting -Force]] | OpenSSH Server |
| البورت | 5985 | 22 |
| جهازك | TrustedHosts + [[-ComputerName]] + [[-Credential]] | [[-HostName]] + [[-UserName]] |
| النسخة | 5.1 و 7 | 7 بس |

و [[Enter-PSSession]] جلسة تقعد فيها، و [[Invoke-Command]] بلوك يتبعت ويرجع بنتيجة من كذا جهاز.`,
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
          teach: R`## الفكرة: سطّب السيرفر، شغّله، وجهّز الدخول

المثال ٣ أجزاء: تسطيب وتشغيل (السطور ١ لـ ٥)، والـ shell اللي هيفتح لما تدخل (٦ و ٧)، والمفتاح بدل الباسورد (٨ و ٩). كله محتاج Terminal أدمن وبيغيّر في الجهاز، فمسطّبتش السيرفر؛ اللي اتجرّب هو الفحص من غير أدمن على PowerShell 7.6، والباقي من توثيق Microsoft.

---

## ١. موجود ولا لأ؟

~~~powershell
Get-WindowsCapability -Online -Name OpenSSH*
~~~

- **Capability** يعني «Optional feature»: حاجة جاية مع ويندوز بس مش متسطبة.
- [[-Online]] يعني الويندوز الشغال دلوقتي (مش ملف image).
- [[OpenSSH*]] النجمة: أي اسم بيبدأ بـ OpenSSH، فيطلع الـ Client والـ Server.

من غير أدمن الأمر نفسه بيرفض:

~~~text الناتج
The requested operation requires elevation.
~~~

ومن Terminal أدمن (حسب التوثيق) بيطلع لكل واحد [[Name]] و [[State]]: [[Installed]] أو [[NotPresent]]. وطريقة تعرف من غير أدمن: بص في الفولدر.

~~~powershell
Get-ChildItem C:\Windows\System32\OpenSSH | Select-Object -ExpandProperty Name
~~~

~~~text الناتج (مختصر)
scp.exe
sftp.exe
ssh-agent.exe
ssh-keygen.exe
ssh.exe
...
~~~

مفيش [[sshd.exe]]، يعني الـ Client موجود والـ Server لأ. والـ **d** في [[sshd]] من daemon، يعني برنامج شغال في الخلفية بيستنى اتصالات.

---

## ٢. سطّب وشغّل

~~~powershell
Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0
Start-Service sshd
Set-Service -Name sshd -StartupType Automatic
~~~

| السطر | بيعمل إيه |
|---|---|
| [[Add-WindowsCapability]] | يسطّب الـ feature. الاسم بالـ ٤ علامات [[~]] زي ما بيطلع في السطر الأول بالظبط |
| [[Start-Service sshd]] | يشغّل الخدمة دلوقتي |
| [[Set-Service -StartupType Automatic]] | يخليها تقوم لوحدها مع ويندوز |

قبل التسطيب الخدمة مش موجودة أصلًا:

~~~text الناتج من Get-Service sshd
Cannot find any service with service name 'sshd'.
~~~

---

## ٣. الفايروول

~~~powershell
Get-NetFirewallRule -Name "OpenSSH-Server-In-TCP" | Select-Object Name, Enabled, Profile
~~~

التسطيب بيعمل قاعدة بالاسم ده تفتح **بورت 22** (بورت SSH). السطر ده بيتأكد منها: [[Enabled]] شغالة ولا لأ، و [[Profile]] على أنهي شبكات (Domain أو Private أو Public). قبل التسطيب:

~~~text الناتج
No MSFT_NetFirewallRule objects found with property 'InstanceID' equal to 'OpenSSH-Server-In-TCP'.  Verify the value of the property and retry.
~~~

---

## ٤. الـ shell الافتراضي: pwsh بدل CMD

~~~powershell
$shell = @{ Path = "HKLM:\SOFTWARE\OpenSSH"; Name = "DefaultShell"; Value = "C:\Program Files\PowerShell\7\pwsh.exe"; PropertyType = "String"; Force = $true }
New-ItemProperty @shell
~~~

لما تدخل بـ ssh، ويندوز بيفتحلك CMD. السيرفر بيقرا الـ shell من قيمة في الـ registry اسمها [[DefaultShell]].

### السطر الأول: hashtable

[[@{ }]] **hashtable**: لستة «اسم = قيمة»، و [[;]] بتفصل بينهم. طبعته:

~~~text الناتج ($shell)
Name                           Value
----                           -----
Force                          True
Path                           HKLM:\SOFTWARE\OpenSSH
Value                          C:\Program Files\PowerShell\7\pwsh.exe
PropertyType                   String
Name                           DefaultShell
~~~

(الترتيب بيتلخبط في hashtable عادي، ومش مهم هنا.)

### السطر التاني: [[@shell]] (splatting)

لما تكتب [[@shell]] بدل [[$shell]] بعد أمر، PowerShell بيحوّل كل مفتاح لـ parameter. يعني السطر ده نفس:

~~~powershell
New-ItemProperty -Path "HKLM:\SOFTWARE\OpenSSH" -Name "DefaultShell" -Value "C:\Program Files\PowerShell\7\pwsh.exe" -PropertyType String -Force
~~~

| المفتاح | معناه |
|---|---|
| [[Path]] | مفتاح الـ registry ([[HKLM]] = إعدادات الجهاز كله) |
| [[Name]] | اسم القيمة |
| [[Value]] | المسار الكامل لـ pwsh.exe |
| [[PropertyType String]] | نوعها نص |
| [[Force]] | اكتب فوقها لو موجودة |

> اتأكد من المسار عندك الأول. على الجهاز ده [[Test-Path "C:\Program Files\PowerShell\7\pwsh.exe"]] طلع [[False]]، و [[(Get-Command pwsh).Source]] طلع مسار جوه [[C:\Program Files\WindowsApps\...]] لأن pwsh متسطب من الـ Store. مسار غلط = الدخول يفشل.

---

## ٥. الدخول بالمفتاح لحسابات الأدمن

~~~powershell
Add-Content C:\ProgramData\ssh\administrators_authorized_keys "ssh-ed25519 AAAA...paste-your-laptop-public-key"
icacls.exe C:\ProgramData\ssh\administrators_authorized_keys /inheritance:r /grant "*S-1-5-32-544:F" /grant "SYSTEM:F"
~~~

### [[Add-Content]]

بيزوّد سطر في آخر الملف (ويعمله لو مش موجود). والسطر هو **المفتاح العام** بتاع اللابتوب: محتوى [[id_ed25519.pub]] اللي عملته بـ [[ssh-keygen]]. لو حسابك أدمن، sshd بيقرا الملف ده بس ويتجاهل [[.ssh\authorized_keys]] اللي في فولدرك.

### [[icacls.exe]]: مين يقدر يقرا الملف

sshd بيرفض الملف لو حد غير الأدمنز و SYSTEM يقدر يعدّل فيه (عشان محدش يزوّد مفتاحه). [[icacls]] أداة صلاحيات الملفات:

| الحتة | معناها |
|---|---|
| [[/inheritance:r]] | شيل الصلاحيات الموروثة من الفولدر اللي فوقه (**r** = remove) |
| [[/grant "*S-1-5-32-544:F"]] | ادّي جروب Administrators صلاحية **F** (Full). [[S-1-5-32-544]] رقم الجروب الثابت (SID) في كل اللغات، والنجمة بتقول لـ icacls «ده SID مش اسم» |
| [[/grant "SYSTEM:F"]] | ونظام ويندوز نفسه Full |

---

## ٦. بعد كده، من اللابتوب

~~~bash
ssh admin@192.168.1.20
~~~

أول مرة بيسألك تثق في الـ fingerprint بتاع الجهاز، وبعدها بيدخلك على الـ shell اللي اخترته (حسب التوثيق).

---

## الخلاصة

| الخطوة | الأمر |
|---|---|
| موجود؟ | [[Get-WindowsCapability -Online -Name OpenSSH*]] (أو فولدر OpenSSH من غير أدمن) |
| تسطيب | [[Add-WindowsCapability ... OpenSSH.Server~~~~0.0.1.0]] |
| تشغيل دايم | [[Start-Service sshd]] + [[Set-Service -StartupType Automatic]] |
| بورت 22 | [[OpenSSH-Server-In-TCP]] |
| الـ shell | [[DefaultShell]] في [[HKLM:\SOFTWARE\OpenSSH]] بـ splatting |
| مفتاح الأدمن | [[administrators_authorized_keys]] + [[icacls]] |`,
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
          teach: R`## الفكرة: نفس أمر الـ restart، بس لجهاز تاني

[[Restart-Computer]] و [[Stop-Computer]] من غير حاجة بيعملوا restart أو shutdown لجهازك. لما تزوّد [[-ComputerName]] بيبعتوا الطلب لجهاز تاني على الشبكة عن طريق WinRM. معملتش restart ولا قفلت أي جهاز؛ جربت [[-WhatIf]] بس بجهاز مش موجود، على PowerShell 7.6.

---

## ١. الحساب

~~~powershell
$cred = Get-Credential
~~~

مربع بيسألك يوزر وباسورد **أدمن على الجهاز التاني** (زي [[PC2\admin]])، والنتيجة object في [[$cred]] بنستخدمه في كل السطور.

---

## ٢. جرّب من غير ما تعمل حاجة: [[-WhatIf]]

~~~powershell
Restart-Computer -ComputerName 192.168.1.20 -Credential $cred -WhatIf
~~~

[[-WhatIf]] بيقولك «لو شغّلت ده، هعمل كذا» ومش بيعمل. بس فيه فرق غريب بين الأمرين. جربتهم بجهاز اسمه [[PC-OFFICE]] مش موجود:

~~~powershell
Stop-Computer -ComputerName PC-OFFICE -WhatIf
Restart-Computer -ComputerName PC-OFFICE -WhatIf
~~~

~~~text الناتج
What if: Performing the operation "Stop-Computer" on target " (PC-OFFICE)".
Computer name PC-OFFICE cannot be resolved with the exception: One or more errors occurred. (No such host is known.).
~~~

[[Stop-Computer]] قال «هقفله» من غير ما يدوّر عليه. [[Restart-Computer]] دوّر على الاسم الأول وفشل. يعني [[-WhatIf]] مش طريقة تتأكد بيها إن الجهاز موجود.

---

## ٣. restart على طول

~~~powershell
Restart-Computer -ComputerName 192.168.1.20 -Credential $cred -Force
~~~

من غير [[-Force]] ويندوز ممكن يرفض لو فيه حد داخل على الجهاز أو برامج مفتوحة. [[-Force]] بيقفل كل حاجة، وأي شغل مش محفوظ هناك بيضيع. ولو نجح الأمر مش بيطبع حاجة (حسب التوثيق).

---

## ٤. restart واستنى لحد ما يرجع

~~~powershell
Restart-Computer -ComputerName 192.168.1.20 -Credential $cred -Wait -For PowerShell -Timeout 300 -Delay 5
~~~

| الحتة | معناها |
|---|---|
| [[-Wait]] | الأمر ميخلصش لحد ما الجهاز يرجع |
| [[-For PowerShell]] | «يرجع» يعني إيه بالظبط |
| [[-Timeout 300]] | استنى 300 ثانية (5 دقايق) بالكتير، وبعدها اطلع بـ error |
| [[-Delay 5]] | اسأل الجهاز «رجعت؟» كل 5 ثواني |

القيم اللي [[-For]] بياخدها، طلّعتها من نوع الـ parameter نفسه:

~~~powershell
[enum]::GetNames([Microsoft.PowerShell.Commands.WaitForServiceTypes])
~~~

~~~text الناتج
Wmi
WinRM
PowerShell
~~~

[[Wmi]] الجهاز بيرد على استعلامات النظام، و [[WinRM]] الخدمة رجعت، و [[PowerShell]] تقدر تفتح جلسة remoting، وده آخر واحد بيجهز، فهو الأضمن لو السكربت هيكمّل بأوامر على الجهاز ده. و [[-Wait]] مينفعش مع جهازك انت (هتستنى ازاي وانت بتقفل؟).

---

## ٥. اقفل جهازين

~~~powershell
Stop-Computer -ComputerName 192.168.1.20, 192.168.1.21 -Credential $cred -Force
~~~

الفاصلة بتعمل لستة، فالأمر بيتبعت للاتنين. خلي بالك إن [[localhost]] أو اسم جهازك لو اتحط في اللستة، جهازك هيقفل كمان.

---

## ٦. الطريقة اللطيفة: تنبيه قبلها بـ 5 دقايق

~~~powershell
Invoke-Command -ComputerName 192.168.1.20 -Credential $cred -ScriptBlock { shutdown /r /t 300 /c "Restart in 5 minutes, save your work" }
~~~

[[Invoke-Command]] (الدرس قبل اللي فات) بيشغّل البلوك **على الجهاز التاني**، والبلوك فيه أداة CMD القديمة [[shutdown]]:

| الحتة | معناها |
|---|---|
| [[/r]] | restart (و [[/s]] shutdown) |
| [[/t 300]] | بعد 300 ثانية |
| [[/c "..."]] | رسالة تظهر للي قاعد قدام الجهاز |

فاللي قاعد هناك يشوف التنبيه ويلحق يحفظ.

---

## الخلاصة

| عايز | السطر |
|---|---|
| تشوف من غير ما تعمل | [[-WhatIf]] (و Restart بيدوّر على الاسم، و Stop لأ) |
| restart فوري | [[Restart-Computer -ComputerName ... -Force]] |
| restart وتستنى | [[-Wait -For PowerShell -Timeout 300 -Delay 5]] |
| قفل كذا جهاز | [[Stop-Computer -ComputerName a, b -Force]] |
| تنبيه وبعدين restart | [[Invoke-Command ... { shutdown /r /t 300 /c "..." }]] |

وكله محتاج حساب أدمن هناك و WinRM مفعّل على الجهاز التاني.`,
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
    }
]);
