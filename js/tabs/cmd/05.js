// تكملة تاب cmd: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/cmd/01.js (شرح حقول الدرس في أوله)
MORE("cmd", [
    {
      t: "الشبكة والنظام",
      l: 2,
      n: "",
      time: R`حوالي نص ساعة`,
      goal: [R`تعرف IP جهازك والـ DNS والـ gateway.`, R`تجرّب توصل لجهاز أو دومين، وتعرف الطريق.`, R`تعرف معلومات الجهاز واليوزر بسرعة.`],
      use: { net: R`أول تلات أوامر في أي تشخيص شبكة. بس ping مش دليل لوحده (درس «ping نجح ومفيش جهاز»).`, work: R`«النت مش شغال» — [[ipconfig]] و [[nslookup]] بيفرّقوا بين «مفيش شبكة» و«DNS واقع».` },
      lab: R`mkdir %TEMP%\cmdlab & cd /d %TEMP%\cmdlab`,
      projects: [
        { lvl: 'صغير', t: R`كارت الجهاز`, what: R`[[machine-card.bat]] بيكتب في [[card.txt]]: اسم الجهاز واليوزر، و [[OS Version]] و [[System Boot Time]] من [[systeminfo /fo list | findstr /b]]، ومستوى النافذة من [[whoami /groups /fo csv /nh]]، والـ IPv4 والـ gateway من [[ipconfig]]. من دروس «systeminfo / whoami» و «ipconfig».`, done: R`[[type card.txt]] فيه سطر لكل معلومة (أول ٥ سطور أخدوا حوالي ٤ ثواني على جهاز التجربة، أغلبهم [[systeminfo]])، وسطر المستوى [[Medium Mandatory Level]] من نافذة عادية، والتشغيل التاني بيكتب الملف من الأول مش بيكرره.` },
        { lvl: 'صغير', t: R`لينك موقعك للموبايل`, what: R`[[lan-url.bat PORT]] بيطلّع الـ IPv4 بتاع الكارت اللي ليه Default Gateway (مش [[vEthernet]])، ويشيل المسافة، ويطبع [[http://IP:PORT]] وينسخه بـ [[clip]] عشان تبعته لموبايلك. من درس «ipconfig» ودرس «clip».`, done: R`[[lan-url.bat 3000]] طبع سطر واحد زي [[http://192.168.1.65:3000]] من غير مسافة في الأول، ومفيش [[172.x]] بتاع WSL، و Ctrl+V في أي مكان بيلصق نفس اللينك.` },
        { lvl: 'متوسط', t: R`النت واقع فين؟`, what: R`[[netcheck.bat]] بيفحص بالترتيب ويقف عند أول مستوى يفشل: ١ فيه IPv4 مش [[169.254]]؟ ٢ الـ gateway بيرد ([[findstr TTL=]] مش errorlevel)؟ ٣ IP برا بيرد؟ ٤ الـ DNS بيحل اسم ([[nslookup]] واقرا الناتج، لأن كوده دايمًا [[0]])؟ ويخرج بكود = رقم المستوى اللي فشل. من دروس «ipconfig» و «ping / tracert / nslookup».`, done: R`على نت سليم بيطبع ٤ سطور [[ok]] ويخرج بـ [[0]]. لو فصلت الواي فاي بيقف عند ١ ويخرج بـ [[1]]. ولو غيّرت الدومين لـ [[nosuchhost.invalid]] بيقف عند ٤ (مع إن [[nslookup]] نفسه رجّع [[0]])، والرسالة بتقول «DNS» مش «النت واقع».` },
        { lvl: 'متوسط', t: R`مراقب الاتصال`, what: R`[[pinglog.bat HOST N]] بيعمل [[ping -n 1]] كل ٥ ثواني N مرة، ويكتب في [[ping-HOST.log]] سطر لكل محاولة فيه الوقت و [[up]] أو [[down]] (بـ [[TTL=]])، وفي الآخر يطبع كام مرة واقع ونسبته. من درس «ping / tracert / nslookup».`, done: R`[[pinglog.bat 127.0.0.1 3]] كتب ٣ سطور [[up]] وطبع [[down 0 of 3]]، و [[pinglog.bat 192.0.2.1 3]] كتب ٣ [[down]] وطبع [[down 3 of 3]]، وتشغيله تاني بيزوّد على اللوج ([[>>]]) مش بيمسحه.` },
        { lvl: 'كبير', t: R`تقرير الدعم الفني`, what: R`[[support-report.bat]] بيعمل فولدر باسم فيه التاريخ والوقت ([[report-20261103-185512]])، ويشغّل [[systeminfo]] و [[ipconfig /all]] و [[getmac /v /fo csv]] و [[route print]] و [[nslookup]] و [[ping]]، كل واحد في ملف لوحده بـ [[2>&1]]، ويكتب [[ok]] أو [[FAIL]] لكل خطوة في [[report.log]] ويكمّل لو خطوة فشلت، وفي الآخر يضغط الفولدر بـ [[tar -a -cf report.zip]] ويخرج بعدد الخطوات اللي فشلت. من كل دروس الوحدة.`, done: R`التشغيل على جهاز التجربة أخد حوالي ٥ ثواني وعمل فولدر فيه ٨ ملفات (٧ نواتج + اللوج) و zip حوالي ٦ كيلو. خطوة متعمّد إنها غلط ([[nosuchtool_lab]]) اتكتبت [[FAIL]] والباقي كمّل، و [[errorlevel]] طلع [[1]]. والتشغيل التاني عمل فولدر جديد باسم جديد من غير ما يلمس القديم.`, ext: R`زوّد خطوة بتشيل البيانات الحساسة قبل الضغط (الـ MAC وأسماء الواي فاي) بـ [[findstr /v]]، وخيار [[/quick]] من غير [[systeminfo]]، وفي الآخر [[start "" "%out%"]] يفتح الفولدر.` },
        { lvl: 'فكرة', t: R`لوحة الشبكة`, what: R`شاشة CMD بتتحدّث كل ١٠ ثواني ([[cls]] و loop) فيها: الـ IP، والـ gateway بيرد ولا لأ، ووقت الـ ping لسيرفر بتختاره، والـ DNS شغال، وعدد الاتصالات [[ESTABLISHED]] من [[netstat -an]]. انت اللي تختار إيه يظهر وإزاي يتلوّن ([[color]]).`, done: R`اللوحة بتفضل شغالة ساعة من غير ما تقع، ولما تفصل الواي فاي السطور بتتغيّر لـ [[down]] في أقل من ١٠ ثواني، ولما ترجّعه بترجع [[up]] لوحدها.`, ext: R`خلّيها تكتب كل تغيير (من up لـ down والعكس) في لوج بالوقت، ولما النت يقع أكتر من دقيقة تعمل صوت ([[echo ^G]]) أو تفتح [[msg]] (لو متاح على نسختك).` },
      ],
      items: [
        {
          cmd: "ipconfig",
          title: "إعدادات الشبكة",
          desc: R`[[ipconfig]] بيعرض إعدادات الشبكة لكل كارت (Wi-Fi و Ethernet والكروت الافتراضية)، زي [[ip a]] في لينكس. أهم سطرين تحت الكارت اللي انت متوصل بيه: [[IPv4 Address]] ده عنوان جهازك على شبكة البيت، و [[Default Gateway]] ده الراوتر.

[[/all]] بيعرض تفاصيل أكتر: الـ MAC (اسمه Physical Address)، وسيرفرات الـ DNS، وهل الـ IP جاي من الراوتر أوتوماتيك (DHCP Enabled). و [[/flushdns]] بيمسح الردود اللي ويندوز حافظها عن الدومينات، ودي أول حاجة لو غيّرت الـ DNS بتاع دومين أو ملف hosts ولسه بيفتح القديم.

لو الـ IPv4 بيبدأ بـ [[169.254]] يبقى الجهاز مخدش IP من الراوتر أصلًا (مشكلة اتصال مش مشكلة DNS). والـ IP اللي هنا مش اللي الناس بتشوفه على النت، ده جوه شبكتك بس.`,
          example: R`ipconfig
ipconfig /all
ipconfig /flushdns`,
          try: "اعرف الـ IP المحلي بتاعك.",
          practice: [
            { lvl: 'سريع', t: R`**بيانات حقيقية:** [[ipconfig | findstr /c:"IPv4"]] وبعدين نفس الحاجة بـ [[| find /c /v ""]] في الآخر. كام سطر؟ وكل سطر تبع أنهي كارت؟`, done: R`سطر لكل كارت ليه IPv4 (على جهاز التجربة [[2]]: الواي فاي بـ [[192.168.1.65]]، و [[vEthernet (WSL...)]] بـ [[172.29.160.1]])، وعرفت إن اللي ليه [[Default Gateway]] هو اتصالك بالنت.` },
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** [[ipconfig | findstr IPv4 Address]] بيطلع رسالة غريبة ومفيش IP. اقراها وصلّح.`, done: R`الرسالة [[FINDSTR: Cannot open Address]]: الكلمة التانية بعد المسافة [[findstr]] فهمها اسم ملف يدوّر فيه. [[ipconfig | findstr /c:"IPv4 Address"]] طلّع السطرين، لأن [[/c:]] بتخلي الجملة كلها نص واحد.` },
            { lvl: 'تطبيق', t: R`**ابني:** [[myip.bat]] بيطبع الـ IPv4 لوحده من غير الكلام اللي قبله: [[for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4"') do echo "%%a"]]. لاحظ علامات التنصيص، وبعدين شيل المسافة بـ [[for]] تانية جوه الأولى.`, done: R`الأولى طبعت [[" 192.168.1.65"]] بمسافة في الأول (اللي بعد النقطتين). بعد [[for /f %%b in ("%%a") do echo "%%b"]] جوه الأولى طبع [["192.168.1.65"]] من غير مسافة، وده اللي ينفع تحطه في لينك زي [[http://%ip%:3000]].` },
            { lvl: 'تطبيق', t: R`**اقرا وتوقّع:** من CMD **عادي** (مش أدمن): [[ipconfig /displaydns >nul]] و [[echo %errorlevel%]]، وبعدين [[ipconfig /nosuch]] و [[echo %errorlevel%]].`, done: R`الأول [[errorlevel]] [[1]] (من غير [[>nul]] بيطبع [[The requested operation requires elevation.]] على ويندوز 11 الجديد). والتاني طبع [[Error: unrecognized or incomplete command line.]] وبعدها صفحة [[USAGE]] كاملة و [[errorlevel]] [[1]].` },
            { lvl: 'تحدي', t: R`**اشرحها:** اكتب لزميل ٣ سطور: لو شاف IPv4 بيبدأ بـ [[169.254]]، أو [[192.168.1.x]] ومعاه Gateway، أو [[172.29.x.x]] من غير Gateway تحت [[vEthernet]]، كل واحد معناه إيه ويعمل إيه.`, done: R`كل سطر فيه مصدر العنوان: [[169.254]] = مخدش من الراوتر (DHCP)، شوف الكابل أو الواي فاي. [[192.168.1.x]] بـ Gateway = اتصالك الحقيقي، وده اللي تفتحه من الموبايل. [[172.29.x.x]] = كارت افتراضي بتاع WSL و Docker، متستخدموش للنت.` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** من [[ipconfig /?]] (قراية بس، متشغّلش [[/release]] ولا [[/renew]]): إزاي تجدد كارت واحد بس بدل كلهم؟ وإيه اللي بيحصل لو مكتبتش اسم كارت؟`, done: R`كتبت الشكل من الـ help نفسه: [[ipconfig /renew EL*]] بيجدد أي كارت اسمه بيبدأ بـ EL (الـ [[*]] و [[?]] مسموحين)، والسطر [[if no adapter name is specified, then the IP address leases for all adapters bound to TCP/IP will be released or renewed]]. التجديد نفسه في درس «ipconfig /release /renew».` },
          ],
          deep: {
            why: R`عايز تفتح موقعك من الموبايل على نفس الواي فاي (محتاج IP جهازك)، أو النت فيه مشكلة وعايز تعرف الجهاز واخد IP ولا لأ، أو غيّرت DNS ومحتاج تمسح الكاش. زي [[ip a]] في لينكس.`,
            how: R`[[ipconfig]] كل الكروت وعناوينها. [[ipconfig /all]] تفاصيل كاملة: MAC، وDNS، والـ DHCP.

[[ipconfig /flushdns]] يمسح DNS cache (مفيد بعد تغيير hosts أو DNS). على ويندوز 11 الجديد ممكن يطلب CMD كأدمن.

عنوانك على الواي فاي: ابص على «Wireless LAN adapter Wi-Fi» وخد الـ IPv4 Address.

الـ Default Gateway هو عنوان الراوتر بتاعك. الـ DNS Servers هم اللي بتسألهم عن الدومينات.`,
            when: "إيجاد عنوان الجهاز على الشبكة. بعد تغيير DNS. مشاكل الشبكة.",
            mistakes: "الخلط بين IPv4 الحقيقي والـ 169.254.x.x: ده Automatic Private IP Address ومعناه مش قادر يتصل بـ DHCP (راوترك)."
          },
          teach: R`## الفكرة

[[ipconfig]] (من IP configuration) بيعرض إعدادات الشبكة لكل «كارت شبكة» في الجهاز. اتجرب في CMD على ويندوز 11 على لابتوب متوصل بالواي فاي.

---

## ١. [[ipconfig]]

~~~cmd
ipconfig
~~~

الناتج قسم لكل كارت. على الجهاز ده طلع ٨ كروت! أغلبهم كده:

~~~text كارت مش متوصل
Ethernet adapter Ethernet:

   Media State . . . . . . . . . . . : Media disconnected
   Connection-specific DNS Suffix  . :
~~~

[[Media disconnected]] يعني الكارت ده مش متوصل بحاجة (هنا كابل الشبكة مش متركب)، اتجاهله. والقسم المهم هو الكارت اللي انت متوصل بيه:

~~~text كارت الواي فاي
Wireless LAN adapter Wi-Fi:

   Connection-specific DNS Suffix  . :
   Link-local IPv6 Address . . . . . : fe80::84e:34ec:cd48:1b6e%13
   IPv4 Address. . . . . . . . . . . : 192.168.1.65
   Subnet Mask . . . . . . . . . . . : 255.255.255.0
   Default Gateway . . . . . . . . . : 192.168.1.1
~~~

### نقرا السطور

| السطر | القيمة | معناها |
|---|---|---|
| [[IPv4 Address]] | [[192.168.1.65]] | عنوان جهازك **جوه شبكة البيت**. ده اللي تكتبه في الموبايل عشان تفتح سيرفرك: [[http://192.168.1.65:3000]] |
| [[Subnet Mask]] | [[255.255.255.0]] | أنهي جزء من العنوان هو «الشبكة»: الـ ٣ أرقام الأولى ([[192.168.1]]) ثابتة لكل الأجهزة اللي معاك، والأخير بيفرّق بينهم |
| [[Default Gateway]] | [[192.168.1.1]] | الراوتر: أي حاجة رايحة برا الشبكة (النت) بتعدّي عليه |
| [[Link-local IPv6 Address]] | [[fe80::...]] | عنوان IPv6 شغّال جوه الشبكة المحلية بس |

وكان فيه كارت تاني متوصل: [[vEthernet (WSL (Hyper-V firewall))]] بـ IPv4 [[172.29.160.1]] ومن غير Gateway. ده كارت افتراضي بتاع WSL و Docker، مش اتصالك بالنت.

---

## ٢. [[ipconfig /all]]

[[/all]] بيضيف لكل كارت سطور كتير. ده الجزء الزيادة في كارت الواي فاي (الـ MAC متخبي جزء منه):

~~~text الناتج (جزء)
   Description . . . . . . . . . . . : Intel(R) Wi-Fi 6 AX200 160MHz
   Physical Address. . . . . . . . . : 84-1B-77-XX-XX-XX
   DHCP Enabled. . . . . . . . . . . : Yes
   Lease Obtained. . . . . . . . . . : Tuesday, October 6, 2026 9:24:09 AM
   Lease Expires . . . . . . . . . . : Wednesday, October 7, 2026 9:24:08 AM
   DHCP Server . . . . . . . . . . . : 192.168.1.1
   DNS Servers . . . . . . . . . . . : fe80::1%13
                                       8.8.8.8
                                       8.8.4.4
                                       192.168.1.1
~~~

| السطر | معناه |
|---|---|
| [[Description]] | الكارت الحقيقي (اسم الهاردوير) |
| [[Physical Address]] | الـ MAC: رقم ثابت للكارت نفسه، ٦ أجزاء بالـ hex |
| [[DHCP Enabled: Yes]] | الـ IP جاي أوتوماتيك من الراوتر (DHCP)، مش متكتب بإيد |
| [[Lease Obtained]] و [[Lease Expires]] | الراوتر «سلّف» الـ IP ده للجهاز من الساعة 9 الصبح ولمدة يوم، وبعدها الجهاز بيجدده |
| [[DHCP Server]] | مين اداله الـ IP (الراوتر نفسه) |
| [[DNS Servers]] | السيرفرات اللي الجهاز بيسألها «الدومين ده IP بتاعه إيه». هنا [[8.8.8.8]] و [[8.8.4.4]] بتوع Google |

---

## ٣. [[ipconfig /flushdns]]

ويندوز بيحفظ ردود الـ DNS شوية (cache) عشان ميسألش كل مرة. [[/flushdns]] بيمسح الحاجات دي، فأول طلب بعدها يسأل من جديد. مفيد لما تغيّر الـ DNS بتاع دومين أو ملف hosts ولسه بيفتح القديم. على ويندوز 11 اللي اتجرّب عليه (build 26300) الأمر ده من CMD عادي (مش أدمن) طلّع [[The requested operation requires elevation.]] ورجّع errorlevel [[1]]، ونفس الكلام لـ [[/displaydns]]؛ في نسخ ويندوز أقدم كانوا بيشتغلوا من غير أدمن. فلو طلعتلك الرسالة دي، افتح CMD كأدمن (Win+X ثم Terminal (Admin)). والرسالة اللي بتطلع لما ينجح (من توثيق ipconfig):

~~~text الناتج
Successfully flushed the DNS Resolver Cache.
~~~

---

## الخلاصة

| عايز | اكتب | بص على |
|---|---|---|
| IP جهازك على الشبكة | [[ipconfig]] | [[IPv4 Address]] تحت الكارت المتوصل |
| IP الراوتر | [[ipconfig]] | [[Default Gateway]] |
| الـ MAC والـ DNS | [[ipconfig /all]] | [[Physical Address]] و [[DNS Servers]] |
| امسح كاش الـ DNS | [[ipconfig /flushdns]] | |

لو الـ IPv4 بيبدأ بـ [[169.254]] يبقى الجهاز مخدش IP من الراوتر خالص. والمقابل في لينكس [[ip a]] و [[ip route]].`,
          lines: [
            R`بيعرض لكل كارت شبكة (واي فاي وكابل وكروت افتراضية): الـ [[IPv4 Address]] بتاعك على الشبكة، والـ [[Subnet Mask]]، والـ [[Default Gateway]] وده عنوان الراوتر. الكارت اللي مش متوصل بيظهر [[Media disconnected]]. زي [[ip a]] في لينكس.`,
            R`[[/all]] بيضيف التفاصيل: الـ MAC (اسمه [[Physical Address]])، وسيرفرات الـ DNS، وهل العنوان جاي أوتوماتيك من الراوتر ([[DHCP Enabled]])، وإمتى الـ lease بيخلص. ده اللي تبعته لحد بيساعدك في مشكلة شبكة.`,
            R`[[/flushdns]] بيمسح الردود اللي ويندوز حافظها عن الدومينات (الـ DNS cache)، فأول طلب بعدها يسأل من جديد. مفيد بعد تعديل ملف hosts أو تغيير DNS دومين والمتصفح لسه بيفتح القديم. على ويندوز 11 الجديد ممكن يطلب CMD كأدمن.`,
          ],
          sol: R`[[ipconfig]] بيطبع قسم لكل كارت، دوّر على الكارت اللي انت متوصل بيه ([[Wireless LAN adapter Wi-Fi]] أو [[Ethernet adapter Ethernet]]). تحته [[IPv4 Address. . . : 192.168.1.15]] ده الـ IP المحلي، و [[Default Gateway . . . : 192.168.1.1]] ده الراوتر.

اتجاهل كروت زي [[vEthernet (WSL)]] (في النسخ الجديدة اسمه [[vEthernet (WSL (Hyper-V firewall))]]) أو اللي تحتها [[Media disconnected]]، دي مش اتصالك الحقيقي. ولو الـ IPv4 بيبدأ بـ [[169.254]] يبقى الجهاز مخدش IP من الراوتر (مشكلة DHCP أو الكابل). والـ IP ده مش اللي الناس بتشوفه على النت، ده جوه شبكة البيت بس.`
        },
        {
          cmd: "ping / tracert / nslookup",
          title: "اختبار الاتصال",
          desc: R`تلات أوامر لتشخيص «النت مش شغال» أو «الموقع مش بيفتح». [[ping]] بيبعت رسايل صغيرة للجهاز ويقيس الوقت لحد ما يرد: لو رد يبقى واصل. و [[-n 4]] عدد المرات (في ويندوز الافتراضي 4 وبيقف لوحده، و [[-t]] يفضل لحد Ctrl+C). خلي بالك: [[-n]] في لينكس معناها حاجة تانية، والعدد هناك [[-c]].

[[tracert]] بيوريك الطريق كله من جهازك للسيرفر، راوتر راوتر، فتعرف المشكلة واقفة فين (زي traceroute). و [[nslookup]] بيسأل الـ DNS: الدومين ده بيشاور على أنهي IP؟ (زي dig، وفيه درس لوحده في «الشبكات بعمق»).

ping بيفشل مش معناه الجهاز واقع: سيرفرات كتير (وراوترات) قافلة الرد على ping عن قصد. لو موقع مش بيرد على ping بس بيفتح في المتصفح، ده طبيعي.`,
          example: R`ping -n 4 google.com
tracert google.com
nslookup example.com`,
          try: "اعمل nslookup على دومين من دوميناتك واتأكد إنه بيشاور على IP السيرفر.",
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** جاي من لينكس وكتبت [[ping -c 4 127.0.0.1]]. توقّع الرد، وبعدين شغّله واعرف [[-c]] في ويندوز معناها إيه من [[ping /?]].`, done: R`الرد [[Access denied. Option -c requires administrative privileges.]] و [[errorlevel]] [[1]]: [[-c]] في ويندوز معناها routing compartment (حاجة متقدمة محتاجة أدمن)، والعدد هنا [[-n 4]].` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** شغّل ٤ أوامر وبعد كل واحد [[echo %errorlevel%]]: [[ping -n 2 127.0.0.1]] و [[ping -n 1 nosuchhost.invalid]] و [[ping -n 2 -w 500 192.0.2.1]] و [[nslookup nosuchhost.invalid]].`, done: R`الأكواد [[0]] و [[1]] و [[1]] و [[0]]. التاني قال [[Ping request could not find host nosuchhost.invalid. Please check the name and try again.]]، والتالت [[Request timed out.]] و [[Lost = 2 (100% loss)]]. والرابع قال [[*** UnKnown can't find nosuchhost.invalid: Non-existent domain]] ومع ذلك رجّع [[0]]: [[nslookup]] مينفعش تبني عليه [[if errorlevel]]، اقرا الناتج بـ [[findstr]].` },
            { lvl: 'تطبيق', t: R`**ابني:** [[up.bat HOST]] بيطبع [[up]] أو [[down]] ويخرج بـ [[0]] أو [[1]]، بس من غير ما يعتمد على errorlevel بتاع ping: [[ping -n 1 -w 1000 %1 | findstr TTL= >nul && echo up || echo down]].`, done: R`[[up.bat 127.0.0.1]] طبع [[up]] و [[up.bat 192.0.2.1]] طبع [[down]]. وعرفت ليه [[TTL=]]: سطر الرد الحقيقي بس اللي فيه TTL، أما [[Destination host unreachable]] فبيرجّع errorlevel [[0]] من غير ما يكون فيه جهاز (درس «ping نجح ومفيش جهاز»).` },
            { lvl: 'سريع', t: R`**بيانات حقيقية:** [[ping -n 1 localhost]] و [[ping -n 1 -4 localhost]]. بص على أول سطر في الاتنين.`, done: R`الأول [[Pinging LAB-PC [::1] with 32 bytes of data:]] (IPv6) والتاني [[Pinging LAB-PC [127.0.0.1] ...]]. يعني [[localhost]] في ويندوز بيروح لـ IPv6 الأول، وده سبب إن سيرفر سامع على [[127.0.0.1]] بس ممكن «ميردش» على [[localhost]] في برامج تانية.` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** [[nslookup]] مش بيجيب IP بس. من [[nslookup]] ثم [[help]] (أو الوثائق) لاقي إزاي تسأل عن سيرفرات الإيميل، وجرّبها على [[example.com]].`, done: R`[[nslookup -type=mx example.com]] طبع [[example.com	MX preference = 0, mail exchanger = (root)]]. ده «null MX»: الدومين بيعلن إنه مبيستقبلش إيميل خالص. وجرّبت كمان [[-type=txt]] و [[-type=ns]].` },
            { lvl: 'تحدي', t: R`**اقرا وتوقّع:** [[tracert -d -h 2 -w 500 127.0.0.1]] هيطبع كام hop؟ و [[ping -n 1 -l 70000 127.0.0.1]] هيعمل إيه؟ اشرح كل option قبل ما تشغّل.`, done: R`tracert طبع hop واحد [[1    <1 ms    <1 ms    <1 ms  127.0.0.1]] وبعده [[Trace complete.]] ([[-d]] من غير أسامي، و [[-h 2]] أقصى عدد hops، و [[-w 500]] استنى نص ثانية). و ping رفض: [[Bad value for option -l, valid range is from 0 to 65500.]] و [[errorlevel]] [[1]].` },
          ],
          deep: {
            why: "تشخيص الشبكة: هل الجهاز بيرد؟ وما الطريق للوصول له؟ والـ DNS شايف إيه؟",
            how: R`[[ping google.com]] بيجرّب 4 مرات افتراضيًا ويقف لوحده، على عكس لينكس. [[-n 10]] عدد معين، و [[-t]] يفضل شغال لحد Ctrl+C، و [[-4]] يجبره على IPv4. و [[Request timed out]] معناها مفيش رد، وممكن يكون فايروول قافل ping مش إن الجهاز واقع.

[[tracert google.com]] الطريق كامل، و [[tracert /d]] من غير ما يحوّل كل IP لاسم (أسرع بكتير).

[[nslookup example.com]] بيسأل الـ DNS عن الـ IP. [[nslookup example.com 8.8.8.8]] يسأل سيرفر معين بدل اللي متظبط عندك.`,
            when: "الموقع مش بيفتح. الـ DNS لسه مش منتشر. لتشخيص بطء الشبكة.",
            mistakes: "ping بيوقف لوحده في ويندوز، بس لو عايزه يفضل زي لينكس استخدم [[-t]]."
          },
          teach: R`## الفكرة

٣ أوامر، كل واحد بيجاوب سؤال لما «النت مش شغال» أو «الموقع مش بيفتح»:

| الأمر | السؤال |
|---|---|
| [[ping]] | الجهاز ده بيرد عليا؟ وفي قد إيه؟ |
| [[tracert]] | الطريق ليه بيعدّي على مين؟ |
| [[nslookup]] | الدومين ده IP بتاعه إيه؟ |

كله اتجرب في CMD على ويندوز 11 من شبكة بيت في مصر.

---

## ١. [[ping -n 4 google.com]]

~~~cmd
ping -n 4 google.com
~~~

~~~text الناتج
Pinging google.com [142.251.209.206] with 32 bytes of data:
Reply from 142.251.209.206: bytes=32 time=57ms TTL=118
Reply from 142.251.209.206: bytes=32 time=51ms TTL=118
Reply from 142.251.209.206: bytes=32 time=74ms TTL=118
Reply from 142.251.209.206: bytes=32 time=115ms TTL=118

Ping statistics for 142.251.209.206:
    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),
Approximate round trip times in milli-seconds:
    Minimum = 51ms, Maximum = 115ms, Average = 74ms
~~~

### نقرا الناتج

- أول سطر: ping حوّل [[google.com]] لـ IP ([[142.251.209.206]]) الأول، وبعت رسايل حجم كل واحدة [[32 bytes]].
- [[-n 4]]: ابعت ٤ رسايل (n من number). ده الافتراضي أصلًا في ويندوز، وبعدها بيقف لوحده.
- [[time=57ms]]: الرسالة راحت ورجعت في ٥٧ ميلي ثانية (الثانية = 1000ms). الرقم ده بيتغير كل مرة، عشان كده في الآخر [[Minimum]] و [[Maximum]] و [[Average]].
- [[TTL=118]] (Time To Live): عداد بيقل ١ عند كل راوتر في السكة. مش محتاجه دلوقتي.
- [[Lost = 0 (0% loss)]]: مفيش ولا رسالة ضاعت، وده أهم رقم.

### لو مفيش رد

جربت IP مفيش حد عليه (و [[-w 1000]] يعني استنى ثانية بس لكل رد):

~~~text الناتج
Request timed out.
Request timed out.

Ping statistics for 10.255.255.1:
    Packets: Sent = 2, Received = 0, Lost = 2 (100% loss),
~~~

خلي بالك: سيرفرات كتير بتتجاهل ping عن قصد، فـ [[Request timed out]] مش دايمًا معناها إنه واقع.

> [[-n]] في لينكس معناها حاجة تانية خالص، والعدد هناك [[-c 4]]. و ping في لينكس مش بيقف لوحده.

---

## ٢. [[tracert google.com]]

~~~text الناتج
Tracing route to google.com [142.251.209.206]
over a maximum of 30 hops:

  1    12 ms    17 ms    46 ms  192.168.1.1 [192.168.1.1]
  2    21 ms    27 ms     5 ms  198.51.100.1
  3     4 ms     5 ms     5 ms  10.35.33.145 [10.35.33.145]
  4     8 ms    23 ms    38 ms  10.35.33.146 [10.35.33.146]
  5    12 ms     5 ms     9 ms  10.45.28.77 [10.45.28.77]
  6    16 ms     7 ms    11 ms  81.52.188.108
  7    68 ms   101 ms    56 ms  193.251.152.113
  8     *       48 ms     *     72.14.222.118
  9    60 ms    79 ms    56 ms  ncmrsa-am-in-f14.1e100.net [142.251.209.206]

Trace complete.
~~~

كل سطر اسمه **hop**: راوتر الباكت عدّى عليه في السكة.

| العمود | معناه |
|---|---|
| الرقم الأول | ترتيب الـ hop. [[1]] هو الراوتر بتاعك ([[192.168.1.1]]) |
| ٣ أوقات | tracert بيجرب كل hop ٣ مرات |
| [[*]] | المحاولة دي مرجعش ليها رد (الراوتر ده مش بيرد على كل المحاولات، والطريق كمّل عادي) |
| الآخر | عنوان الراوتر، واسمه لو ليه |

الـ hops اللي في النص راوترات شركة النت والشبكات اللي بعدها، و hop 9 هو سيرفر جوجل نفسه (نفس الـ IP اللي ping طلّعه). لو النت واقف، tracert بيوريك فين بالظبط: لو hop 1 نفسه مش بيرد، المشكلة في الراوتر أو الواي فاي عندك.

---

## ٣. [[nslookup example.com]]

~~~text الناتج
Server:  UnKnown
Address:  fe80::1

Non-authoritative answer:
Name:    example.com
Addresses:  2606:4700:10::ac42:93f3
	  2606:4700:10::6814:179a
	  104.20.23.154
	  172.66.147.243
~~~

| السطر | معناه |
|---|---|
| [[Server]] و [[Address]] الأولانيين | سيرفر الـ DNS اللي اتسأل (هنا الراوتر). [[UnKnown]] معناها إن الراوتر ملوش اسم، عادي |
| [[Non-authoritative answer]] | الرد جه من سيرفر وسيط عنده نسخة، مش من سيرفر الدومين الأصلي. عادي |
| [[Name]] | الدومين اللي سألت عليه |
| [[Addresses]] | الـ IPs بتاعته: ٢ IPv6 (اللي فيهم [[:]]) و ٢ IPv4 |

وظهر كمان سطر [[DNS request timed out.]]: nslookup بيحاول يعرف اسم سيرفر الـ DNS نفسه الأول، والراوتر مردّش، عشان كده كتب [[UnKnown]]. الرد الأساسي وصل عادي.

---

## الخلاصة

| عايز تعرف | اكتب | بص على |
|---|---|---|
| واصل ولا لأ | [[ping -n 4 google.com]] | [[Lost]] و [[time]] |
| المشكلة فين في السكة | [[tracert google.com]] | أول hop مش بيرد |
| الدومين على أنهي IP | [[nslookup example.com]] | [[Address]] تحت [[Name]] |

المقابل في لينكس: [[ping -c 4]] و [[traceroute]] و [[dig]].`,
          lines: [
            R`بيبعت 4 رسايل صغيرة (ICMP) لـ google.com ويستنى الرد، وكل رد بيطبع الوقت بالـ ms، وفي الآخر ملخص كام اتبعت وكام ضاع. [[-n]] في ويندوز معناها عدد المرات (في لينكس [[-c]])، ومن غيرها ويندوز بيبعت 4 ويقف لوحده.`,
            R`بيوريك كل راوتر في السكة لحد جوجل، سطر لكل hop (لحد 30) وفيه 3 أوقات. سطر فيه [[*]] يعني الراوتر ده مردّش، وده مش لازم يبقى مشكلة لو اللي بعده كمّل. زي [[traceroute]] في لينكس، وبياخد وقت.`,
            R`بيسأل سيرفر الـ DNS بتاعك الدومين ده بيشاور على أنهي IP، زي [[dig]]. أول سطرين ([[Server]] و [[Address]]) هما سيرفر الـ DNS نفسه، والإجابة تحت [[Name]] و [[Addresses]]. و [[Non-authoritative answer]] معناها الرد مش جاي من السيرفر الأصلي للدومين، وده طبيعي.`,
          ],
          sol: R`[[nslookup yourdomain.com]] بيطبع الأول [[Server:]] و [[Address:]] بتوع الـ DNS اللي سألته (غالبًا الراوتر، ولو اسمه طلع [[UnKnown]] ده عادي: معناه إن الراوتر ملوش اسم في الـ DNS)، وبعدين [[Non-authoritative answer:]] وتحته [[Name:]] و [[Address:]] (أو [[Addresses:]] لو الدومين ليه أكتر من IP). الـ Address الأخيرة لازم تبقى IP السيرفر بتاعك.

لو IP تاني: إما الـ A record غلط، أو غيّرته قريب والكاش لسه قديم (استنى أو [[ipconfig /flushdns]])، أو الدومين ورا Cloudflare بالسحابة البرتقالي، فهتشوف IPs بتوع Cloudflare وده طبيعي. ولو [[Non-existent domain]] يبقى الـ record مش موجود أصلًا.`
        },
        {
          cmd: "systeminfo / whoami",
          title: "معلومات الجهاز",
          desc: R`[[systeminfo]] بيطلع تقرير كامل عن الجهاز: اسم الجهاز، ونسخة ويندوز ورقم الـ build، والرام الكلية والفاضية، وتاريخ التسطيب، وآخر مرة اشتغل فيها (System Boot Time)، والتحديثات المتسطبة. بياخد ثواني قبل ما يطبع، وده طبيعي.

[[whoami]] بيقولك انت داخل بأنهي يوزر، بالشكل [[اسم-الجهاز\اسم-اليوزر]] (أو الدومين لو جهاز شركة)، و [[whoami /groups]] أو [[/priv]] بيوريك صلاحياتك. و [[hostname]] بيطبع اسم الجهاز بس، وده نفس أمر لينكس.

عشان تاخد سطور معينة من التقرير الطويل: [[systeminfo | findstr /B /C:"OS Name" /C:"Total Physical Memory"]]، و [[/B]] يعني السطر لازم يبدأ بالكلام ده. بس لو ويندوزك بالعربي أسامي السطور هتبقى بالعربي فالفلتر ده مش هيلاقي حاجة.`,
          example: R`systeminfo
whoami
hostname`,
          try: "اعرف نسخة الويندوز والرام من systeminfo.",
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** على جهاز بيتك (حساب محلي مش شركة) شغّل [[whoami /upn]] و [[echo %errorlevel%]].`, done: R`طبع [[ERROR: Unable to get User Principal Name (UPN) as the current logged-on user]] وتحتها [[is not a domain user.]] و [[errorlevel]] [[1]]. الـ UPN (زي [[ali@company.com]]) موجود بس على أجهزة الدومين، وده اختبار سريع «الجهاز ده جهاز شركة؟».` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** احسب وقت [[systeminfo >nul]] ووقت [[ver]] ووقت [[echo %COMPUTERNAME%]]. لو سكربت بيشتغل كل دقيقة ومحتاج اسم الجهاز ونسخة ويندوز، تستخدم إيه؟`, done: R`[[systeminfo]] أخد حوالي [[3.4]] ثانية على جهاز التجربة، و [[ver]] و [[%COMPUTERNAME%]] لحظيين. فالسكربت المتكرر ياخد [[ver]] و [[%COMPUTERNAME%]]، و [[systeminfo]] مرة واحدة في تقرير.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** [[systeminfo /fo csv | find /c /v ""]] كام سطر؟ وبعدين هات آخر مرة الجهاز اشتغل بـ [[systeminfo /fo list | findstr /b /c:"System Boot Time"]].`, done: R`الـ CSV سطرين بس (الهيدر وسطر القيم كلها)، وسطر الـ boot زي [[System Boot Time:              11/1/2026, 8:54:30 PM]]. لو عملت Restart وشغّلته تاني، الوقت لازم يتغيّر: كده تتأكد إن الـ restart حصل فعلًا.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** عايز اليوزر بصيغة CSV عشان سكربت: [[whoami /fo csv /nh]]. بيطلع إيه؟ صلّحه.`, done: R`طلع [[ERROR: Invalid syntax.]] و [[Type "WHOAMI /?" for usage.]]: [[/fo]] لازم معاه حاجة يطبعها. [[whoami /user /fo csv /nh]] طبع سطر زي [["lab-pc\ali","S-1-5-21-..."]] (الاسم والـ SID).` },
            { lvl: 'تحدي', t: R`**ابني:** [[machine-card.bat]] بيكتب في [[card.txt]]: اسم الجهاز، واليوزر، و [[OS Version]]، و [[System Boot Time]]، ومستوى النافذة ([[Medium]] ولا [[High]] من [[whoami /groups /fo csv /nh | findstr /c:"Mandatory Level"]]). وكل تشغيلة تكتب الملف من الأول.`, done: R`[[type card.txt]] فيه ٥ سطور، وسطر المستوى فيه [[Medium Mandatory Level]] من نافذة عادية. ولو شغلته مرتين، الملف لسه ٥ سطور (استخدمت [[>]] في أول سطر و [[>>]] في الباقي).` },
            { lvl: 'تحدي', t: R`**اشرحها:** [[whoami /priv | findstr /i Shutdown]] طبع [[SeShutdownPrivilege           Shut down the system                 Disabled]]. يعني انت مش من حقك تقفل الجهاز؟ اكتب الإجابة في سطرين.`, done: R`كتبت إن الصلاحية **موجودة** في الـ token (وإلا مكانتش هتظهر خالص)، و [[Disabled]] معناها إنها مش متفعّلة دلوقتي، والبرنامج اللي محتاجها (زي [[shutdown]]) بيفعّلها لنفسه وقت الاستخدام.` },
          ],
          deep: {
            why: R`استلمت جهاز جديد أو VM، أو حد طالب منك مواصفات جهازك عشان مشكلة، أو عايز تتأكد انت شغال بأنهي يوزر وبصلاحيات إيه قبل ما تعمل حاجة محتاجة أدمن.`,
            how: R`[[systeminfo]] تقرير كامل: اسم الجهاز، ونسخة ويندوز والـ build، والـ CPU، والرام، ووقت آخر boot، والـ hotfixes. بياخد ثواني. ولو عايز سطر معين فلتره: [[systeminfo | findstr /i memory]].

[[whoami]] اسم المستخدم الحالي ([[computer\user]]). [[whoami /groups]] الجروبات، ومن CMD عادي هتلاقي فيها [[Medium Mandatory Level]]، ومن CMD أدمن [[High Mandatory Level]]، فتعرف من غير ما تخمّن. و [[whoami /priv]] الصلاحيات المتاحة.

[[hostname]] اسم الجهاز بس، زي [[%COMPUTERNAME%]].`,
            when: "استلام جهاز جديد أو VM. التأكد إنك Admin. إرسال معلومات support.",
            mistakes: "[[systeminfo]] بطيء. لو محتاج معلومات محددة، استخدم [[ver]]، أو من PowerShell [[Get-CimInstance Win32_OperatingSystem | Select-Object Caption, Version]] (wmic اتشال من ويندوز 11 الجديد)."
          },
          teach: R`## الفكرة

٣ أوامر بتعرّفك انت فين: [[systeminfo]] تقرير كامل عن الجهاز، و [[whoami]] انت داخل بأنهي يوزر، و [[hostname]] اسم الجهاز. اتجربوا في CMD على ويندوز 11 على لابتوب فيه 32GB RAM.

---

## ١. [[systeminfo]]

بياخد ثواني قبل ما يطبع (بيجمع معلومات من حتت كتير)، وبعدين بيطلع حوالي ٤٠ سطر. دي أهم السطور (شلت منها سطور فيها بيانات شخصية زي الإيميل ورقم الترخيص):

~~~text الناتج (جزء)
Host Name:                     ALI-PC
OS Name:                       Microsoft Windows 11 Home Single Language
OS Version:                    10.0.26300 N/A Build 26300
Original Install Date:         2/28/2026, 1:45:48 AM
System Boot Time:              10/6/2026, 9:23:44 AM
System Manufacturer:           ASUSTeK COMPUTER INC.
System Type:                   x64-based PC
Processor(s):                  1 Processor(s) Installed.
Total Physical Memory:         32,175 MB
Available Physical Memory:     11,523 MB
Hotfix(s):                     9 Hotfix(s) Installed.
~~~

### نقرا السطور

| السطر | معناه |
|---|---|
| [[OS Name]] | نسخة ويندوز ونوعها (Home) |
| [[OS Version]] | [[10.0]] ثابتة حتى في ويندوز 11، والمهم رقم [[Build]]: من 22000 وطالع يعني ويندوز 11 |
| [[Original Install Date]] | ويندوز اتسطب امتى |
| [[System Boot Time]] | آخر مرة الجهاز اشتغل (من هنا تعرف لو «Restart» حصل فعلًا) |
| [[System Type]] | [[x64]] يعني 64-bit |
| [[Total Physical Memory]] | الـ RAM كلها بالميجا: 32,175 MB يعني حوالي 31.4 جيجا (بنقسم على 1024) |
| [[Available Physical Memory]] | الفاضي منها دلوقتي |
| [[Hotfix(s)]] | عدد تحديثات ويندوز المتسطبة، وتحته رقم كل واحد ([[KB...]]) |

### سطور معينة بس

~~~cmd
systeminfo | findstr /B /C:"OS Name" /C:"Total Physical"
~~~

~~~text الناتج
OS Name:                       Microsoft Windows 11 Home Single Language
Total Physical Memory:         32,175 MB
~~~

- [[/C:"..."]] دوّر على الكلام ده زي ما هو بالمسافة، وينفع تكررها كذا مرة.
- [[/B]] (من beginning) السطر لازم **يبدأ** بالكلام ده. ليه؟ جربت [[systeminfo | findstr /C:"OS Version"]] من غير [[/B]]، فطلع سطرين: [[OS Version: 10.0.26300 ...]] وكمان [[BIOS Version: American Megatrends ...]]، لأن كلمة BIOS Version فيها [[OS Version]] في نصها. ومع [[/B]] طلع السطر الأول بس.

> لو ويندوزك بالعربي، أسامي السطور هتطلع بالعربي، والفلتر بالإنجليزي مش هيلاقي حاجة.

---

## ٢. [[whoami]]

~~~cmd
whoami
~~~

~~~text الناتج
ali-pc\ali
~~~

الشكل [[اسم-الجهاز\اسم-اليوزر]]، بحروف سمول. الجزء الأول هنا اسم الجهاز لأنه يوزر محلي، ولو جهاز شركة متوصل بـ domain بيبقى اسم الدومين.

---

## ٣. [[hostname]]

~~~cmd
hostname
~~~

~~~text الناتج
LAB-PC
~~~

اسم الجهاز بس، بالحروف زي ما اتكتب. ([[systeminfo]] كتبه [[ALI-PC]] كابيتال، و [[whoami]] كتبه سمول، والتلاتة نفس الاسم.) و [[hostname]] نفس الأمر في لينكس والماك.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| تقرير كامل | [[systeminfo]] |
| نسخة ويندوز والـ RAM بس | [[systeminfo | findstr /B /C:"OS Name" /C:"Total Physical"]] |
| رقم النسخة بسرعة | [[ver]] (طبع سطر فيه [[Microsoft Windows]] ورقم النسخة [[10.0.26300.9550]]) |
| انا مين | [[whoami]] |
| صلاحياتي | [[whoami /groups]] أو [[whoami /priv]] |
| اسم الجهاز | [[hostname]] |`,
          lines: [
            R`بيجمع معلومات الجهاز في تقرير واحد: اسمه، ونسخة ويندوز ورقم الـ build، والـ CPU، والرام الكلية والفاضية، والتحديثات المتسطبة. بياخد ثواني عشان بيجمعهم. و [[systeminfo | findstr /i memory]] يجيب سطور الرام بس.`,
            R`بيطبع اليوزر اللي CMD شغال بيه في شكل [[computer\username]] (أو [[DOMAIN\username]] على جهاز شركة). مهم قبل أمر محتاج صلاحيات، أو لما تفتح CMD بيوزر تاني وتتلخبط انت مين. و [[whoami /groups]] يوريك الجروبات.`,
            R`بيطبع اسم الجهاز بس، وهو نفس [[%COMPUTERNAME%]]. ده الاسم اللي الأجهزة التانية بتشوفه على الشبكة، واللي هتكتبه في [[\\name\share]] أو [[mstsc /v:name]].`,
          ],
          sol: R`الأسرع: [[systeminfo | findstr /B /C:"OS Name" /C:"OS Version" /C:"Total Physical Memory"]]. هيطلع زي [[OS Name: Microsoft Windows 11 Pro]] و [[OS Version: 10.0.26100 N/A Build 26100]] و [[Total Physical Memory: 16,097 MB]].

متتلخبطش إن ويندوز 11 مكتوب نسخته 10.0: رقم الـ Build من 22000 وطالع يعني ويندوز 11. و systeminfo بياخد ثواني قبل ما يطبع، ده طبيعي. ولو ويندوزك عربي الـ labels هتبقى بالعربي، فـ findstr بالإنجليزي مش هيلاقي حاجة، شغّله من غير فلتر ودوّر بعينك.`
        },
        {
          cmd: "getmac",
          title: "الـ MAC لكل كارت",
          learn: R`تطلّع الـ MAC address لكل كارت شبكة في سطر واحد، وتعرف أنهي كارت متوصل، وتاخد الناتج CSV لسكربت، وتعرف ليه [[getmac]] بيطلّع كروت أقل من [[ipconfig /all]].`,
          out: R`لما الراوتر أو الـ IT يطلب «الـ MAC بتاع جهازك» (حجز IP، أو فلتر MAC، أو Wake-on-LAN) تديله الرقم الصح للكارت الصح من غير ما تقلّب في Settings.`,
          use: {
            net: R`حجز IP ثابت للجهاز من الراوتر (DHCP reservation) بيتعمل بالـ MAC. ونفس الرقم هو اللي بتشوفه قدام الـ IP في [[arp -a]] على جهاز تاني.`,
            work: R`جرد أجهزة المكتب: سكربت بيلف على الأجهزة ويكتب اسم كل جهاز والـ MAC بتاعه في ملف CSV واحد.`,
            cs: R`الـ MAC عنوان الطبقة التانية (Ethernet / Wi-Fi): ٦ bytes بتتكتب بالـ hex، وبيشتغل جوه الشبكة المحلية بس. الراوتر مبيعدّيهوش للنت، فمحدش برا شبكتك بيشوفه.`,
          },
          desc: R`[[getmac]] بيطبع الـ **MAC address** (العنوان الفيزيائي، Physical Address) لكل كارت شبكة: ٦ أجزاء hex زي [[00-15-5D-3A-10-01]]. الكارت المتوصل بيبان قدامه [[\Device\Tcpip_{...}]]، والمش متوصل [[Media disconnected]].

[[/v]] (verbose) بيضيف اسم الاتصال ([[Wi-Fi]] و [[Ethernet]]) واسم الكارت، وده اللي محتاجه عشان تعرف أنهي رقم بتاع أنهي كارت. و [[/fo list]] بيطبع كل كارت في بلوك من غير ما يقص الأسامي، و [[/fo csv /nh]] سطر CSV لكل كارت من غير هيدر، للسكربتات.

[[/nh]] مسموح بس مع [[table]] و [[csv]]: مع [[list]] بيقول [[ERROR: Invalid syntax. /NH option is allowed only for TABLE and CSV formats.]]. و [[/fo]] بياخد [[TABLE]] أو [[LIST]] أو [[CSV]] بس، فـ [[/fo xml]] بيقول [[ERROR: Invalid syntax. 'xml' value is not allowed for '/fo' option.]]. والاتنين [[errorlevel]] [[1]].

[[getmac]] بيطلّع الكروت «الحقيقية» بس: على جهاز التجربة طلّع ٥، و [[ipconfig /all]] طلّع ٨ (زيادة كروت Wi-Fi Direct الافتراضية و [[vEthernet]] بتاع WSL). وفي PowerShell المقابل [[Get-NetAdapter]] (عمود [[MacAddress]])، وفي لينكس [[ip link]].

> الـ MACs وأسامي الكروت في الدرس ده **متغيّرة** بأرقام وأسامي مخترعة؛ الشكل وعدد السطور والأخطاء من تشغيل حقيقي على ويندوز 11.`,
          example: R`getmac
getmac /v /fo list
getmac /fo csv /nh
getmac /v | find /c /i "disconnected"
getmac /fo list /nh`,
          try: R`اعرف الـ MAC بتاع الكارت اللي انت متوصل بيه دلوقتي بس (مش كل الكروت)، وتأكد إنه نفس [[Physical Address]] اللي تحت نفس الكارت في [[ipconfig /all]].`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[getmac /v | find /c "Disconnected"]] و [[getmac /v | find /c /i "disconnected"]]. هيطلعوا نفس الرقم؟`, done: R`الأول طبع [[0]] والتاني [[4]] على جهاز التجربة: الكلمة مكتوبة [[Media disconnected]] بحرف صغير، و [[find]] من غير [[/i]] بيفرّق. الرقم التاني = عدد الكروت المش متوصلة.` },
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** [[getmac /fo list /nh]] و [[getmac /fo xml]]. اقرا الرسالتين وصلّح كل واحد.`, done: R`[[ERROR: Invalid syntax. /NH option is allowed only for TABLE and CSV formats.]] و [[ERROR: Invalid syntax. 'xml' value is not allowed for '/fo' option.]]، والاتنين [[errorlevel]] [[1]]. التصليح: [[getmac /fo list]] (من غير [[/nh]])، و [[getmac /fo csv]] بدل xml.` },
            { lvl: 'تطبيق', t: R`**ابني:** [[mymac.bat]] بيطبع الـ MAC بتاع الكارت المتوصل بس، من [[for /f "tokens=1 delims=," %%a in ('getmac /fo csv /nh ^| findstr /v /c:"Media disconnected"') do echo active=%%~a]].`, done: R`طبع سطر واحد زي [[active=00-15-5D-3A-10-01]] (من غير علامات تنصيص بسبب [[%%~a]])، ولما فصلت الواي فاي (لو تقدر) مطبعش حاجة. ولو متوصل بكابل وواي فاي مع بعض هيطبع سطرين، وده صح.` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** عدّ الكروت بـ ٣ طرق: [[getmac /fo csv /nh | find /c /v ""]] و [[ipconfig /all | find /c "Physical Address"]] و [[getmac /v /nh | find /c /v ""]]. ليه الأرقام مختلفة؟`, done: R`على جهاز التجربة [[5]] و [[8]] و [[6]]. [[ipconfig /all]] بيعدّ كمان كروت Wi-Fi Direct الافتراضية و [[vEthernet]]، و [[getmac /v /nh]] زيادة سطر فاضي في أوله. فلو هتعدّ، استخدم [[/fo csv /nh]].` },
            { lvl: 'تحدي', t: R`**بيانات حقيقية:** [[getmac /v]] (الجدول) مع [[getmac /v /fo list]]. قارن عمود [[Network Adapter]] في الاتنين.`, done: R`الجدول بيقص الاسم عند ١٥ حرف (زي [[Contoso Wirele]] بدل [[Contoso Wireless AX Adapter]])، و [[/fo list]] بيطبع الاسم كامل. فلو هتبعت الناتج لحد أو تقراه في سكربت، [[list]] أو [[csv]].` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** من [[getmac /?]]: إزاي تجيب الـ MACs بتاعة جهاز تاني على الشبكة؟ جرّب على اسم جهاز مش موجود زي [[nosuchhost-lab]] واقرا الرد.`, done: R`[[getmac /s system]] (ومعاه [[/u]] و [[/p]] ليوزر تاني). على اسم مش موجود رد [[ERROR: The RPC server is unavailable.]] و [[errorlevel]] [[1]]: بيستخدم RPC، فمحتاج الجهاز التاني يسمح بإدارة عن بعد، مش مجرد إنه بيرد على ping.` },
          ],
          deep: {
            why: R`الـ MAC هو «بطاقة الشخصية» بتاعة الكارت جوه الشبكة المحلية: الراوتر بيحجز IP ثابت بيه، وفلتر الواي فاي بيسمح أو يمنع بيه، و Wake-on-LAN بيصحّي الجهاز بيه، وبرامج ترخيص قديمة بتربط نفسها بيه. وكل ده محتاج الرقم الصح **للكارت الصح**: الواي فاي غير الكابل غير البلوتوث.`,
            how: R`[[getmac]] بيسأل ويندوز عن الكروت عن طريق WMI و RPC (عشان كده [[/s]] بيشتغل على جهاز تاني لو مسموح، وبيقول [[The RPC server is unavailable.]] لو لأ). عمود [[Transport Name]] فيه [[\Device\Tcpip_{GUID}]] للكارت اللي مربوط بـ TCP/IP دلوقتي، والـ GUID ده هو نفس الـ ID اللي الكارت ليه في الـ registry.

الـ MAC نفسه ٤٨ bit: أول ٣ bytes (OUI) رقم الشركة المصنعة، والـ ٣ التانيين رقم الكارت. ولو التاني hex digit في الأول [[2]] أو [[6]] أو [[A]] أو [[E]] يبقى العنوان «locally administered»: ويندوز أو برنامج عمله بنفسه (زي «Random hardware addresses» في إعدادات الواي فاي، أو كروت VPN)، مش اللي محفور في الكارت. ده من معيار IEEE 802، مش من تشغيل.`,
            when: R`لما الراوتر أو الـ IT يطلب الـ MAC، أو وانت بتجرد أجهزة، أو بتطابق جهاز في [[arp -a]] بجهاز حقيقي، أو قبل ما تعمل حجز DHCP. ولو عايز معلومات الكارت كلها (IP و DNS وغيره) [[ipconfig /all]] أحسن، و [[getmac]] لما الـ MAC بس هو المطلوب في سطر نضيف.`,
            mistakes: R`تبعت MAC كارت البلوتوث أو الكابل وانت متوصل بالواي فاي (بص على [[Connection Name]] بـ [[/v]]). تعدّ بـ [[find /c "Disconnected"]] من غير [[/i]] فيطلع صفر. تستخدم [[/nh]] مع [[list]] فيقول Invalid syntax. تقرا الجدول المقصوص بتاع [[/v]] وتفتكره اسم الكارت كامل. أو تنسى إن الواي فاي ممكن يكون عامل MAC عشوائي لكل شبكة، فالرقم اللي حجزته في الراوتر مش هيطابق لو الإعداد ده اتغيّر.`
          },
          teach: R`## الفكرة

كل كارت شبكة (واي فاي، كابل، بلوتوث، VPN) ليه **MAC address**: رقم ٦ bytes بالـ hex، زي [[00-15-5D-3A-10-01]]، بيعرّف الكارت جوه الشبكة المحلية. [[getmac]] بيطبعهم كلهم في سطر لكل كارت. كل اللي تحت اتشغّل في CMD عادي على ويندوز 11، بس **الـ MACs و GUIDs وأسامي الكروت اتغيّرت بأسامي مخترعة** عشان دي بيانات الجهاز؛ الشكل وعدد السطور والأخطاء زي ما طلعت بالظبط.

---

## ١. [[getmac]]

~~~cmd
getmac
~~~

~~~text اتشغّل فعلًا · ويندوز 11 · cmd.exe (القيم متغيّرة)
Physical Address    Transport Name
=================== ==========================================================
00-15-5D-3A-10-01   \Device\Tcpip_{6B1C0E2A-1111-4A00-8000-0000000000A1}
00-15-5D-3A-10-02   Media disconnected
00-FF-12-34-56-01   Media disconnected
00-FF-12-34-56-02   Media disconnected
00-15-5D-3A-10-03   Media disconnected
~~~

| العمود | معناه |
|---|---|
| [[Physical Address]] | الـ MAC: ٦ أجزاء، كل جزء byte بالـ hex (من [[00]] لـ [[FF]]) |
| [[Transport Name]] | لو الكارت شغّال على TCP/IP: اسمه جوه ويندوز [[\Device\Tcpip_{GUID}]]. لو مش متوصل: [[Media disconnected]] |

يعني هنا كارت واحد بس متوصل (الأول). بس مين ده؟ واي فاي ولا كابل؟ الجدول ده مش بيقول.

---

## ٢. [[getmac /v /fo list]]

~~~cmd
getmac /v /fo list
~~~

~~~text اتشغّل فعلًا · ويندوز 11 · cmd.exe (أول كارتين، القيم متغيّرة)
Connection Name:  Wi-Fi
Network Adapter:  Contoso Wireless AX Adapter
Physical Address: 00-15-5D-3A-10-01
Transport Name:   \Device\Tcpip_{6B1C0E2A-1111-4A00-8000-0000000000A1}

Connection Name:  Ethernet
Network Adapter:  Contoso PCIe GbE Controller
Physical Address: 00-15-5D-3A-10-02
Transport Name:   Media disconnected
~~~

| الحتة | معناها |
|---|---|
| [[/v]] | verbose: زوّد [[Connection Name]] (الاسم اللي في Settings) و [[Network Adapter]] (الهاردوير) |
| [[/fo list]] | format: كل كارت بلوك لوحده، والأسامي كاملة |

كده واضح: الأول هو الواي فاي، والمتوصل. والباقي على جهاز التجربة: كابل الشبكة، وكارتين VPN، والبلوتوث.

ولو استخدمت [[/v]] من غير [[/fo list]] بيطلع جدول، بس عمود [[Network Adapter]] بيتقص عند ١٥ حرف ([[Contoso Wirele]])، فالـ list أو الـ CSV أحسن.

---

## ٣. [[getmac /fo csv /nh]]: للسكربتات

~~~cmd
getmac /fo csv /nh
~~~

~~~text اتشغّل فعلًا · ويندوز 11 · cmd.exe (القيم متغيّرة)
"00-15-5D-3A-10-01","\Device\Tcpip_{6B1C0E2A-1111-4A00-8000-0000000000A1}"
"00-15-5D-3A-10-02","Media disconnected"
"00-FF-12-34-56-01","Media disconnected"
"00-FF-12-34-56-02","Media disconnected"
"00-15-5D-3A-10-03","Media disconnected"
~~~

[[/nh]] (no header) شال سطر العناوين، فكل سطر = كارت. ومنه الـ MAC بتاع المتوصل بس:

~~~cmd
for /f "tokens=1 delims=," %a in ('getmac /fo csv /nh ^| findstr /v /c:"Media disconnected"') do @echo active=%~a
~~~

~~~text اتشغّل فعلًا · ويندوز 11 · cmd.exe (القيمة متغيّرة)
active=00-15-5D-3A-10-01
~~~

- [[findstr /v]] شال السطور اللي فيها [[Media disconnected]] (درس findstr).
- [[delims=,]] قطّع عند الفاصلة، و [[tokens=1]] أخد أول حتة.
- [[%~a]] شال علامات التنصيص. وفي ملف [[.bat]] بتبقى [[%%a]] و [[%%~a]].

---

## ٤. [[find /c /i "disconnected"]]: عدّ

~~~cmd
getmac /v | find /c "Disconnected"
getmac /v | find /c /i "disconnected"
~~~

~~~text اتشغّل فعلًا · ويندوز 11 · cmd.exe
0
4
~~~

الكلمة مكتوبة [[Media disconnected]] بـ d صغيرة، و [[find]] بيفرّق بين الكابيتال والسمول، فالأول طلّع صفر. [[/i]] بيلغي الفرق، فطلع ٤ كروت مش متوصلة.

---

## ٥. الأخطاء

~~~cmd
getmac /fo list /nh
getmac /fo xml
~~~

~~~text اتشغّل فعلًا · ويندوز 11 · cmd.exe
ERROR: Invalid syntax. /NH option is allowed only for TABLE and CSV formats.
Type "GETMAC /?" for usage.
ERROR: Invalid syntax. 'xml' value is not allowed for '/fo' option.
Type "GETMAC /?" for usage.
~~~

الاتنين [[errorlevel]] [[1]]. وجهاز تاني مش موجود ([[getmac /s nosuchhost-lab]]) رد [[ERROR: The RPC server is unavailable.]] بكود [[1]]: [[/s]] بيشتغل بـ RPC، فلازم الجهاز التاني يسمح بإدارة عن بعد ويكون معاك يوزر عليه.

---

## ٦. ليه [[ipconfig /all]] بيطلّع كروت أكتر؟

~~~cmd
getmac /fo csv /nh | find /c /v ""
ipconfig /all | find /c "Physical Address"
~~~

~~~text اتشغّل فعلًا · ويندوز 11 · cmd.exe
5
8
~~~

[[ipconfig /all]] بيعرض كمان الكروت الافتراضية: اتنين [[Microsoft Wi-Fi Direct Virtual Adapter]] (للمشاركة والإسقاط على شاشة) و [[vEthernet (WSL (Hyper-V firewall))]]. [[getmac]] بيسيب دول. فلو عايز تعرف «الـ MAC بتاع كارت النت»، [[getmac /v /fo list]] أوضح، ولو عايز كل حاجة عن الكارت (IP و DNS) [[ipconfig /all]] (درس ipconfig).

---

## ٧. نقرا الرقم نفسه

| الجزء | مثال | معناه |
|---|---|---|
| أول ٣ bytes (OUI) | [[00-15-5D]] | الشركة المصنعة (أو البرنامج) |
| آخر ٣ | [[3A-10-01]] | رقم الكارت عندها |
| التاني hex digit | [[0]] في [[00]] | لو [[2]] أو [[6]] أو [[A]] أو [[E]] يبقى عنوان «locally administered»: ويندوز أو برنامج عمله، مش المحفور في الكارت |

ويندوز 11 فيه إعداد «Random hardware addresses» للواي فاي بيدّي الكارت MAC مختلف لكل شبكة، فالرقم اللي حجزته في الراوتر ممكن ميطابقش لو الإعداد اتغيّر. (الجدول ده من معيار IEEE 802 وتوثيق Microsoft، مش من تشغيل.)

---

## الخلاصة

| عايز | اكتب |
|---|---|
| كل الـ MACs بسرعة | [[getmac]] |
| أنهي MAC لأنهي كارت | [[getmac /v /fo list]] |
| لسكربت أو Excel | [[getmac /fo csv /nh]] |
| المتوصل بس | [[for /f ... getmac /fo csv /nh ^| findstr /v /c:"Media disconnected"]] |
| كام كارت مش متوصل | [[getmac /v | find /c /i "disconnected"]] |
| الـ MAC ومعاه IP و DNS | [[ipconfig /all]] |

المقابل: PowerShell [[Get-NetAdapter | Select-Object Name, MacAddress, Status]] (على جهاز التجربة طلّع ٦ كروت، و [[-IncludeHidden]] طلّع ٢١)، ولينكس [[ip link]] (السطر [[link/ether]])، والماك [[ifconfig en0 | grep ether]].`,
          lines: [
            R`بيطبع جدول بعمودين: الـ MAC ([[Physical Address]]) والـ [[Transport Name]]. الكارت المتوصل قدامه [[\Device\Tcpip_{...}]]، والمش متوصل [[Media disconnected]]. مش بيقولك أنهي كارت ده إيه.`,
            R`[[/v]] بيزوّد اسم الاتصال ([[Wi-Fi]] و [[Ethernet]]) واسم الهاردوير، و [[/fo list]] بيطبع كل كارت في بلوك بالأسامي كاملة (الجدول بيقصها عند ١٥ حرف). ده اللي تقرا منه «أنهي MAC بتاع الواي فاي».`,
            R`[[/fo csv]] سطر CSV لكل كارت بعلامات تنصيص، و [[/nh]] بيشيل سطر العناوين، فعدد السطور = عدد الكروت. الشكل ده للسكربتات ([[for /f "tokens=1 delims=,"]]) أو تفتحه في Excel.`,
            R`[[find /c]] بيعدّ السطور اللي فيها الكلمة، و [[/i]] من غير فرق بين الكابيتال والسمول. من غير [[/i]] بيطلع [[0]] لأن الكلمة مكتوبة [[disconnected]] بحرف صغير. الرقم = الكروت المش متوصلة.`,
            R`غلط عن قصد: [[/nh]] مش مسموح مع [[list]]، فبيطبع [[ERROR: Invalid syntax. /NH option is allowed only for TABLE and CSV formats.]] و [[errorlevel]] [[1]]. شيل [[/nh]] أو استخدم [[csv]].`,
          ],
          sol: R`اتشغّل على ويندوز 11 (القيم متغيّرة):

[[getmac /v /fo list]] بيطبع بلوك لكل كارت؛ الكارت اللي [[Transport Name]] بتاعه [[\Device\Tcpip_{...}]] هو المتوصل، و [[Connection Name]] بيقولك هو [[Wi-Fi]] ولا [[Ethernet]]. وأسرع طريقة للمتوصل بس: [[getmac /fo csv /nh | findstr /v /c:"Media disconnected"]] طبع سطر واحد [["00-15-5D-3A-10-01","\Device\Tcpip_{...}"]].

وفي [[ipconfig /all]] تحت [[Wireless LAN adapter Wi-Fi:]] السطر [[Physical Address. . . . . . . . . : 00-15-5D-3A-10-01]]: نفس الرقم. لو مختلف، غالبًا بتبص على كارت تاني (Wi-Fi Direct مثلًا)، أو الواي فاي شغال بـ «Random hardware addresses».`,
          ci: [
            { os: [R`windows`], sh: R`cmd`, run: R`@echo off
getmac /fo list /nh
echo nh-with-list=%errorlevel%
getmac /fo xml
echo xml=%errorlevel%
exit /b 0`, expect: [R`/NH option is allowed only for TABLE and CSV formats.`, R`nh-with-list=1`, R`'xml' value is not allowed for '/fo' option.`, R`xml=1`] },
          ],
        }
      ]
    }
]);
