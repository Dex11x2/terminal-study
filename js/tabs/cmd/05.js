// تكملة تاب cmd: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/cmd/01.js (شرح حقول الدرس في أوله)
MORE("cmd", [
    {
      t: "الشبكات بعمق",
      l: 2,
      n: "",
      items: [
        {
          cmd: "ipconfig /release /renew",
          title: "جدد الـ IP",
          desc: R`الجهاز بياخد الـ IP بتاعه من الراوتر أوتوماتيك (اسمها DHCP). [[ipconfig /release]] بيسيب العنوان الحالي (النت بيقطع)، و [[ipconfig /renew]] بيطلب عنوان جديد من الراوتر. مع بعض بيحلوا مشاكل زي IP بيبدأ بـ 169.254، أو اتصال واقف بعد ما غيّرت الراوتر أو الشبكة.

[[/displaydns]] بيعرض الردود اللي ويندوز حافظها عن الدومينات اللي زرتها (الكاش)، ومعاه [[/flushdns]] اللي بيمسحها.

خلي بالك: [[/release]] بيقطع النت، فلو بتشتغل على جهاز بعيد (Remote Desktop أو SSH) هتفقد الاتصال ومش هتقدر تكتب [[/renew]]. ساعتها اكتبهم في سطر واحد: [[ipconfig /release && ipconfig /renew]]. ومش هيحل مشاكل باسورد الواي فاي أو كابل مفصول.`,
          example: R`ipconfig /release
ipconfig /renew
ipconfig /displaydns`,
          try: "اعرض كاش الـ DNS بـ [[/displaydns]] قبل وبعد [[/flushdns]].",
          deep: {
            why: "تجديد عنوان الـ IP من الـ DHCP. مفيد لو الجهاز بقى عنوانه 169.254 أو الاتصال بايظ.",
            how: R`[[ipconfig /release]] يطلّق العنوان الحالي. [[ipconfig /renew]] يطلب عنوان جديد من الـ DHCP (الراوتر).

[[ /flushdns]] بيمسح الـ DNS cache. مفيد بعد تغيير ملف hosts.

أوامر advanced: [[ipconfig /registerdns]] بيسجّل اسم الجهاز في الـ DNS مرة تانية.`,
            when: "الاتصال بايظ وعنوانك 169.254. بعد تغيير إعدادات الشبكة.",
            mistakes: "Release/Renew مش هيحل مشاكل wifi password أو MAC filtering. هو بس بيجدد العنوان."
          },
          teach: R`## الفكرة

جهازك مش بيختار الـ IP بتاعه بنفسه: لما يتوصل بالشبكة بيطلب واحد من الراوتر، والراوتر «بيسلّفه» عنوان لمدة معينة. الطريقة دي اسمها **DHCP** (Dynamic Host Configuration Protocol). الأوامر دي بتخليك تتحكم في الحكاية دي بإيدك.

> [[/release]] و [[/renew]] بيقطعوا النت ثواني، فمااتجربوش هنا؛ اللي مكتوب عنهم من توثيق ipconfig على Microsoft Learn. و [[/displaydns]] اتجرب في CMD على ويندوز 11.

---

## ١. الـ «سلفة» شكلها إيه

من [[ipconfig /all]] على الجهاز ده، تحت كارت الواي فاي:

~~~text الناتج (جزء)
   DHCP Enabled. . . . . . . . . . . : Yes
   IPv4 Address. . . . . . . . . . . : 192.168.1.65(Preferred)
   Lease Obtained. . . . . . . . . . : Tuesday, October 6, 2026 9:24:09 AM
   Lease Expires . . . . . . . . . . : Wednesday, October 7, 2026 9:24:08 AM
   DHCP Server . . . . . . . . . . . : 192.168.1.1
~~~

يعني الراوتر ([[192.168.1.1]]) ادّى الجهاز [[192.168.1.65]] لمدة ٢٤ ساعة. [[lease]] يعني إيجار.

---

## ٢. [[ipconfig /release]]

الجهاز بيرجّع الـ IP للراوتر ويقول «مش محتاجه». النتيجة: الكارت بيفضل من غير IPv4، والنت بيقف لحد ما تعمل renew.

---

## ٣. [[ipconfig /renew]]

الجهاز بيطلب IP جديد من الراوتر، وبيطبع إعدادات الكروت بعدها زي [[ipconfig]] العادي. غالبًا بيرجعلك نفس العنوان، لأن الراوتر بيفتكر جهازك بالـ MAC.

### امتى تستخدمهم؟

| المشكلة | ليه بيحلها |
|---|---|
| الـ IPv4 بيبدأ بـ [[169.254]] | ده عنوان الجهاز بيدّيه لنفسه لما الراوتر ميردش. renew بيطلب تاني |
| غيّرت الراوتر أو إعداداته | الجهاز ماسك عنوان من الشبكة القديمة |
| النت واقف والواي فاي متوصل | أول خطوة سهلة قبل ما تعيد تشغيل الراوتر |

ولو انت على جهاز بعيد (Remote Desktop)، [[/release]] لوحدها هتقطع اتصالك بيه وانت مش هتقدر تكتب [[/renew]]. اكتبهم في سطر واحد: [[ipconfig /release && ipconfig /renew]]، فالجهاز ينفّذ التاني لوحده.

---

## ٤. [[ipconfig /displaydns]]

بيعرض الكاش بتاع الـ DNS: الدومينات اللي الجهاز سأل عليها قريب والـ IP اللي اتردّ. على الجهاز ده من CMD عادي (مش أدمن) طلع:

~~~text الناتج
The requested operation requires elevation.
~~~

يعني الأمر اترفض من غير صلاحيات أدمن في التجربة دي (ويندوز 11 Build 26300). لو ظهرتلك نفس الرسالة، افتح CMD كأدمن (كليك يمين، Run as administrator). ولما يشتغل، بيطبع لكل دومين بلوك فيه [[Record Name]] (الدومين)، و [[Record Type]]، و [[Time To Live]] (كام ثانية فاضلة قبل ما الرد يتنسي)، و [[A (Host) Record]] (الـ IP). شكل البلوك ده من توثيق ipconfig.

---

## الخلاصة

| الأمر | بيعمل | النت بيقطع؟ |
|---|---|---|
| [[ipconfig /release]] | سيب الـ IP | آه |
| [[ipconfig /renew]] | اطلب IP جديد | بيرجع |
| [[ipconfig /displaydns]] | اعرض كاش الـ DNS | لأ (اترفض من غير أدمن في التجربة) |
| [[ipconfig /flushdns]] | امسح كاش الـ DNS | لأ |

ودول مش هيحلوا باسورد واي فاي غلط أو كابل مفصول. في لينكس المقابل [[sudo dhclient -r]] وبعدها [[sudo dhclient]] على توزيعات كتير (من التوثيق، والأداة بتختلف حسب التوزيعة).`,
          lines: ["سيب عنوان الـ IP الحالي.", "اطلب عنوان جديد من الراوتر.", "اعرض كاش الـ DNS."],
          sol: R`لو طلعلك [[The requested operation requires elevation.]] (ده اللي حصل في تجربة على ويندوز 11 Build 26300 من CMD عادي)، افتح CMD كأدمن وجرب تاني. [[ipconfig /displaydns]] هيطبع لكل دومين زرته قريب بلوك فيه [[Record Name]] و [[Record Type]] و [[Time To Live]] و [[A (Host) Record . . . : IP]]. بعد [[ipconfig /flushdns]] هيطبع [[Successfully flushed the DNS Resolver Cache.]]، و [[/displaydns]] تاني هيطلع شبه فاضي.

لو لقيت كام entry لسه موجودين بعد الـ flush، غالبًا دول من ملف hosts (بيتحمّلوا دايمًا)، أو برنامج في الخلفية سأل تاني في الثواني اللي فاتت. [[/release]] و [[/renew]] مش جزء من التجربة دي، دول بيقطعوا النت ثواني، ومجربتهمش هنا؛ اللي مكتوب عنهم من توثيق ipconfig على Microsoft Learn.`
        },
        {
          cmd: "nslookup",
          title: "DNS بالتفصيل",
          desc: R`[[nslookup]] بيسأل الـ DNS عن دومين ويوريك الرد، زي [[dig]] في لينكس. أول جزء في الناتج ([[Server]] و [[Address]]) هو سيرفر الـ DNS اللي سألته، والجزء التاني [[Name]] و [[Address]] هو الرد. و «Non-authoritative answer» معناها إن الرد جه من كاش سيرفر وسيط، ودي حاجة عادية.

لو كتبت سيرفر بعد الدومين ([[nslookup example.com 1.1.1.1]]) بيسأله هو بالذات بدل الـ DNS بتاع جهازك، فتقارن: لو 1.1.1.1 بيدي IP صح وجهازك بيدي قديم، المشكلة في الكاش عندك. و [[-type=]] بيحدد نوع السجل: [[mx]] سيرفرات الإيميل، و [[txt]] سجلات التحقق (SPF وتحقق Google وغيرهم)، و [[ns]] مين مسؤول عن الدومين.

لو كتبت [[nslookup]] لوحده بيدخلك وضع تفاعلي بـ prompt [[>]]، تكتب فيه دومينات ورا بعض، و [[exit]] للخروج.`,
          example: R`nslookup example.com
nslookup example.com 1.1.1.1
nslookup -type=mx example.com
nslookup -type=txt example.com`,
          try: "اعرف سيرفرات الإيميل لدومين عندك.",
          deep: {
            why: "استعلام DNS بشكل تفاعلي أو مباشر. موجود في ويندوز والماك ولينكس.",
            how: R`[[nslookup example.com]] بيسأل الـ DNS الافتراضي ويعرض الـ IP. [[nslookup example.com 8.8.8.8]] يسأل Google DNS.

الوضع التفاعلي: [[nslookup]] من غير حاجة بيدخل prompt. [[set type=MX]] بيغيّر نوع الاستعلام. [[example.com]] بيبحث. [[exit]] للخروج.

[[nslookup -type=TXT example.com]] لسجلات التحقق.`,
            when: "DNS troubleshooting. التأكد من MX أو TXT records.",
            mistakes: "nslookup ممكن يطلعلك «Non-authoritative answer» ومش مشكلة، ده يعني الجواب من cache مش من السيرفر الأصلي."
          },
          teach: R`## الفكرة

**DNS** (Domain Name System) هو «دليل التليفونات» بتاع النت: بتسأله عن اسم زي [[example.com]] فيرد بالـ IP. [[nslookup]] (من name server lookup) بيبعت السؤال ده ويوريك الرد. ولكل دومين أنواع سجلات (records)، كل نوع بيجاوب سؤال مختلف. اتجرب في CMD على ويندوز 11.

---

## ١. [[nslookup example.com]]

~~~text الناتج
DNS request timed out.
    timeout was 2 seconds.
Server:  UnKnown
Address:  fe80::1

Non-authoritative answer:
Name:    example.com
Addresses:  2606:4700:10::ac42:93f3
	  2606:4700:10::6814:179a
	  104.20.23.154
	  172.66.147.243
~~~

الناتج جزئين:

| الجزء | معناه |
|---|---|
| [[Server]] و [[Address]] | مين اتسأل: سيرفر الـ DNS بتاع جهازك، هنا الراوتر ([[fe80::1]] عنوانه بالـ IPv6) |
| [[DNS request timed out]] و [[UnKnown]] | nslookup حاول يعرف **اسم** السيرفر ده الأول، ومجالوش رد. مش مشكلة، الرد الأساسي جه |
| [[Non-authoritative answer]] | الرد من سيرفر وسيط عنده نسخة محفوظة، مش من سيرفر الدومين الأصلي. عادي |
| [[Name]] و [[Addresses]] | الرد: الدومين ده عنده ٢ IPv6 و ٢ IPv4 (الـ IPv4 هما اللي فيهم نقط بس) |

---

## ٢. [[nslookup example.com 1.1.1.1]]: اسأل سيرفر معين

لما تكتب IP بعد الدومين، nslookup بيسأل السيرفر ده بدل الراوتر. [[1.1.1.1]] سيرفر DNS عام بتاع Cloudflare.

~~~text الناتج (الجزء المهم)
Server:  UnKnown
Address:  1.1.1.1

Name:    example.com
Addresses:  2606:4700:10::ac42:93f3
	  2606:4700:10::6814:179a
	  172.66.147.243
	  104.20.23.154
~~~

نفس الـ IPs (الترتيب بس اختلف، وده عادي). الفايدة: لو غيّرت IP دومينك وجهازك لسه بيجيب القديم بس [[1.1.1.1]] بيجيب الجديد، يبقى الكاش عندك هو اللي قديم.

---

## ٣. [[nslookup -type=mx example.com]]: سيرفرات الإيميل

[[-type=]] بيحدد نوع السجل. [[mx]] من Mail eXchanger: «الإيميل اللي رايح للدومين ده يتبعت لمين؟».

~~~text الناتج على example.com
example.com	MX preference = 0, mail exchanger = (root)
~~~

[[(root)]] هنا معناها «مفيش سيرفر إيميل»: example.com دومين للأمثلة وقافل الإيميل عن قصد. شوف دومين بيستقبل إيميل فعلًا:

~~~cmd
nslookup -type=mx gmail.com 1.1.1.1
~~~

~~~text الناتج
gmail.com	MX preference = 5, mail exchanger = gmail-smtp-in.l.google.com
gmail.com	MX preference = 40, mail exchanger = alt4.gmail-smtp-in.l.google.com
gmail.com	MX preference = 30, mail exchanger = alt3.gmail-smtp-in.l.google.com
gmail.com	MX preference = 20, mail exchanger = alt2.gmail-smtp-in.l.google.com
gmail.com	MX preference = 10, mail exchanger = alt1.gmail-smtp-in.l.google.com
~~~

[[preference]] الأولوية: **الرقم الأصغر الأول**. فالإيميل بيروح لـ [[gmail-smtp-in]] (5)، ولو مش بيرد يجرب [[alt1]] (10)، وهكذا. ولاحظ إن [[Server]] هنا طلع اسمه [[one.one.one.one]]، لأن Cloudflare عامل اسم لسيرفره.

---

## ٤. [[nslookup -type=txt example.com]]: سجلات نصية

~~~text الناتج
example.com	text =

	"_k2n1y4vw3qtb4skdx9e7dxt97qrmmq9"
example.com	text =

	"v=spf1 -all"
~~~

سجلات [[TXT]] كلام حر بيتحط عشان خدمات تانية تقراه:

- [[v=spf1 -all]]: سجل SPF، بيقول مين مسموحله يبعت إيميل باسم الدومين. [[-all]] يعني «ولا حد»، فأي إيميل جاي من example.com مزيف.
- الكلام العشوائي التاني غالبًا كود تحقق: خدمة طلبت من صاحب الدومين يحطه عشان يثبت إنه بتاعه.

---

## ٥. لو الدومين مش موجود

~~~text الناتج
*** UnKnown can't find nosuchdomain-zz9.com: Non-existent domain
~~~

---

## الخلاصة

| عايز | اكتب |
|---|---|
| IP الدومين | [[nslookup example.com]] |
| اسأل سيرفر معين | [[nslookup example.com 1.1.1.1]] |
| سيرفرات الإيميل | [[nslookup -type=mx example.com]] |
| سجلات التحقق و SPF | [[nslookup -type=txt example.com]] |
| مين مسؤول عن الدومين | [[nslookup -type=ns example.com]] |

والأخير جربته على example.com وطلع سيرفرين: [[hera.ns.cloudflare.com]] و [[elliott.ns.cloudflare.com]]، يعني الـ DNS بتاعه متدار من Cloudflare.

المقابل في لينكس [[dig example.com]] و [[dig MX example.com]] و [[dig @1.1.1.1 example.com]].`,
          lines: ["الـ IP بتاع الدومين.", "اسأل Cloudflare بدل الـ DNS بتاعك.", "سيرفرات الإيميل.", "سجلات TXT."],
          sol: R`[[nslookup -type=mx yourdomain.com]] بيطبع سطر لكل سيرفر زي [[yourdomain.com  MX preference = 1, mail exchanger = smtp.google.com]] لو بتستخدم Google Workspace، أو سيرفرات [[...mail.protection.outlook.com]] لو Microsoft 365. الرقم الأصغر في preference أولويته أعلى.

لو مطلعش أي [[mail exchanger]] ولقيت بس بيانات SOA (primary name server)، يبقى الدومين ملوش MX، والإيميل عليه مش هيوصل. ولو عايز تتأكد إن الرد مش من كاش قديم اسأل سيرفر عام: [[nslookup -type=mx yourdomain.com 1.1.1.1]].`
        },
        {
          cmd: "arp / route",
          title: "الأجهزة اللي حواليك والطريق",
          desc: R`[[arp -a]] بيعرض الأجهزة اللي جهازك اتكلم معاها على نفس الشبكة المحلية مؤخرًا: لكل واحد الـ IP بتاعه والـ MAC (العنوان الثابت لكارت الشبكة). مفيد تعرف IP جهاز تاني في البيت (طابعة أو Raspberry Pi) أو تتأكد إن الراوتر شايفك.

[[route print]] بيعرض جدول الـ routing: لكل وجهة، الباكت بيخرج من أنهي كارت ولأنهي gateway. السطر اللي Network Destination و Netmask فيه [[0.0.0.0]] هو «أي حاجة رايحة للنت»، وعمود Gateway فيه هو الراوتر. و [[route print -4]] يعرض IPv4 بس. المقابل في لينكس [[ip neigh]] و [[ip route]].

الأمرين للعرض آمنين. أما التعديل ([[route add]] و [[route delete]] و [[arp -d]]) فمحتاج أدمن وممكن يقطع النت لو غلط، فمتلمسوش إلا لو عارف بتعمل إيه (غالبًا مع VPN).`,
          example: R`arp -a
route print`,
          try: "اعرف IP الراوتر من route print.",
          deep: {
            why: "معلومات متقدمة عن الشبكة: جدول ARP لإيجاد أجهزة على نفس الشبكة، وجدول الـ routing.",
            how: R`[[arp -a]] بيعرض جدول ARP: الأجهزة اللي الجهاز بيعرفها على الشبكة المحلية (IP وMAC). مفيد تعرف إيه الأجهزة على نفس الـ subnet.

[[route print]] بيعرض جدول الـ routing. [[route print 0.0.0.0]] الـ default gateway.

[[route add]] لإضافة route يدويًا (محتاج Admin).`,
            when: "تشخيص مشاكل الـ routing. إيجاد عنوان MAC لجهاز. في بيئات شبكات معقدة.",
            mistakes: "arp cache بياخد وقت يتحدث. لو محتاج تجدّد: [[arp -d *]] بيمسح الكاش (محتاج Admin)."
          },
          teach: R`## الفكرة

جوه شبكة البيت، الأجهزة بتكلم بعض بعنوانين: الـ **IP** (ممكن يتغير) والـ **MAC** (رقم ثابت محفور في كارت الشبكة). [[arp -a]] بيوريك الأجهزة اللي جهازك عرف الـ MAC بتاعها، و [[route print]] بيوريك جهازك بيودّي الباكتات فين. الاتنين للعرض بس، واتجربوا في CMD على ويندوز 11 (الـ MACs اتخبى جزء منها).

---

## ١. [[arp -a]]

ARP اختصار Address Resolution Protocol: الطريقة اللي جهازك بيسأل بيها الشبكة «مين صاحب الـ IP ده؟ قولي الـ MAC بتاعك». والردود بتتحفظ في جدول، و [[-a]] (all) بيعرضه.

~~~text الناتج (جزء)
Interface: 192.168.1.65 --- 0xd
  Internet Address      Physical Address      Type
  192.168.1.1           dc-51-93-xx-xx-xx     dynamic
  192.168.1.3           d8-32-14-xx-xx-xx     dynamic
  192.168.1.4           f4-8c-50-xx-xx-xx     dynamic
  ...
  192.168.1.255         ff-ff-ff-ff-ff-ff     static
  224.0.0.22            01-00-5e-00-00-16     static
  239.255.255.250       01-00-5e-7f-ff-fa     static
~~~

| الجزء | معناه |
|---|---|
| [[Interface: 192.168.1.65]] | الجدول ده بتاع الكارت اللي الـ IP بتاعه كده (الواي فاي). كل كارت ليه جدول لوحده |
| [[Internet Address]] | IP جهاز تاني على الشبكة. [[192.168.1.1]] الراوتر |
| [[Physical Address]] | الـ MAC بتاعه |
| [[dynamic]] | اتعلّم من الشبكة، وبيتمسح لوحده بعد شوية لو الجهاز مبقاش بيتكلم |
| [[static]] | ثابت. دي عناوين خاصة مش أجهزة |

العناوين الـ static دي:

- [[192.168.1.255]] بـ [[ff-ff-ff-ff-ff-ff]]: الـ **broadcast**، يعني «كل الأجهزة على الشبكة مرة واحدة».
- اللي بتبدأ بـ [[224]] لحد [[239]]: **multicast**، رسايل لمجموعة أجهزة (زي البرامج اللي بتدوّر على طابعات أو شاشات في البيت).

على الجهاز ده طلع حوالي ٢٨ جهاز dynamic: موبايلات وتلفزيونات وغيرهم على نفس الواي فاي. ولو بتدوّر على IP جهاز معين (طابعة أو Raspberry Pi)، الـ MAC بيساعدك: أول ٣ أجزاء منه بتدل على الشركة المصنّعة (إلا لو الجهاز بيستخدم MAC عشوائي للخصوصية، وده بيحصل في موبايلات كتير).

---

## ٢. [[route print]]

بيعرض **جدول الـ routing**: لكل وجهة، الباكت يطلع من أنهي كارت ويروح لمين. جربته بـ [[-4]] (IPv4 بس) عشان يبقى أقصر.

### الجزء الأول: الكروت

~~~text الناتج (جزء)
Interface List
 13...84 1b 77 xx xx xx ......Intel(R) Wi-Fi 6 AX200 160MHz
  1...........................Software Loopback Interface 1
 53...00 15 5d xx xx xx ......Hyper-V Virtual Ethernet Adapter
~~~

رقم كل كارت، والـ MAC بتاعه، واسمه. [[Loopback]] كارت وهمي بتاع [[127.0.0.1]] (الجهاز بيكلم نفسه).

### الجزء التاني: الجدول

~~~text الناتج (جزء)
Active Routes:
Network Destination        Netmask          Gateway       Interface  Metric
          0.0.0.0          0.0.0.0      192.168.1.1     192.168.1.65     40
        127.0.0.0        255.0.0.0         On-link         127.0.0.1    331
      192.168.1.0    255.255.255.0         On-link      192.168.1.65    296
     172.29.160.0    255.255.240.0         On-link      172.29.160.1   5256
~~~

| العمود | معناه |
|---|---|
| [[Network Destination]] و [[Netmask]] | الوجهة: مجموعة عناوين |
| [[Gateway]] | ابعت لمين. [[On-link]] يعني الجهاز ده على نفس الشبكة، ابعتله على طول |
| [[Interface]] | من أنهي كارت (بالـ IP بتاعه) |
| [[Metric]] | التكلفة. لو فيه طريقين لنفس الوجهة، الأصغر بيكسب |

نقرا السطور:

1. [[0.0.0.0]] و [[0.0.0.0]]: «أي عنوان مش في باقي الجدول»، يعني النت كله. بيروح للراوتر [[192.168.1.1]] من كارت الواي فاي. ده الـ **default gateway**، نفس اللي في [[ipconfig]].
2. [[127.0.0.0]]: الجهاز بيكلم نفسه.
3. [[192.168.1.0]] بـ [[255.255.255.0]]: أي جهاز [[192.168.1.x]] على نفس الواي فاي، فمباشر من غير راوتر.
4. [[172.29.160.0]]: شبكة WSL الافتراضية.

---

## الخلاصة

| عايز | اكتب | بص على |
|---|---|---|
| الأجهزة اللي على شبكتك | [[arp -a]] | سطور [[dynamic]] |
| IP الراوتر | [[route print -4]] | Gateway في سطر [[0.0.0.0]] |
| IPv4 بس | [[route print -4]] | |

أوامر التعديل ([[route add]] و [[route delete]] و [[arp -d]]) محتاجة أدمن وبتغيّر الشبكة، فمااتجربتش هنا. المقابل في لينكس [[ip neigh]] و [[ip route]].`,
          lines: [
            "الأجهزة اللي جهازك شافها على الشبكة المحلية، بالـ IP والـ MAC.",
            "جدول الراوتينج، وفيه الـ gateway الافتراضي."
          ],
          sol: R`في [[route print]] روح لقسم [[IPv4 Route Table]] تحت [[Active Routes:]]، ودوّر على السطر اللي Network Destination و Netmask فيه [[0.0.0.0]] و [[0.0.0.0]]. عمود [[Gateway]] في السطر ده هو IP الراوتر، زي [[192.168.1.1]]، وعمود Interface هو الـ IP بتاعك.

لو فيه أكتر من سطر 0.0.0.0 (مثلًا واي فاي وكابل أو VPN)، اللي Metric بتاعه أصغر هو اللي بيتستخدم. ولو عايز تختصر [[route print -4]] يعرض IPv4 بس. والـ IP ده نفسه اللي هتلاقيه في [[Default Gateway]] بتاع ipconfig. (أوامر التعديل [[route add]] و [[route delete]] و [[arp -d]] مجربتهاش هنا لأنها بتغيّر الشبكة؛ اللي مكتوب عنها من توثيق Microsoft Learn.)`
        },
        {
          cmd: "pathping",
          title: "traceroute مع نسبة الخسارة",
          desc: R`[[pathping]] بيجمع tracert و ping: الأول بيرسم الطريق للسيرفر راوتر راوتر، وبعدين بيبعت باكتات كتير لكل راوتر لمدة دقايق، وفي الآخر يطلع جدول فيه نسبة الضياع (packet loss) عند كل واحد. ده المقابل لـ [[mtr]] في لينكس.

استخدمه لما النت «بيقطّع» أو المكالمات بتتقطع، مش لما مفيش نت خالص. اقرا عمود [[This Node/Link]]: الخسارة الحقيقية هي اللي بتبدأ عند راوتر وتفضل في كل اللي بعده. راوتر في النص عليه 100% واللي بعده 0% ده بس بيتجاهل الاختبار.

بياخد وقت (حوالي ٢٥ ثانية لكل hop، يعني دقايق). [[-n]] بيمنعه يحوّل الـ IPs لأسامي فبيبقى أسرع، و [[-q 50]] يقلل عدد الباكتات لكل راوتر.`,
          example: "pathping google.com",
          try: "شغّله على دومين بعيد وسيبه يخلص (بياخد دقايق)، وشوف نسبة الخسارة عند كل راوتر في العمود الأخير.",
          deep: {
            why: "بيجمع ping وtracert في أمر واحد: بيعرض الطريق وبيحسب نسبة الـ packet loss في كل hop.",
            how: R`[[pathping google.com]] أولًا بيبني الـ map (زي tracert)، وبعدين بيبعت packets لكل hop ويحسب الـ loss. ده بياخد وقت (حوالي دقيقتين افتراضيًا).

[[/n]] بيتجنب الـ DNS resolution ويسرّع. [[/q 10]] بيقلل عدد الـ queries.

الناتج بيوريك [[Lost/Sent]] لكل hop. لو hop معين فيه loss عالي ومش الـ hops بعده، هو المشكلة.`,
            when: "الاتصال بيقطع ومش عارف فين. مشاكل VoIP أو جودة الاتصال.",
            mistakes: R`تشغّله وانت مستعجل (بياخد دقايق)، فلتشخيص سريع tracert. أو تقلق من راوتر في النص عليه 100% واللي بعده سليم: ده بيتجاهل الاختبار بس. أو تقرا عمود [[Source to Here]] على إنه خسارة الراوتر نفسه، والصح [[This Node/Link]].`
          },
          teach: R`## الفكرة

[[pathping]] بيعمل حاجتين ورا بعض: يرسم الطريق للسيرفر زي [[tracert]]، وبعدين يبعت باكتات كتير لكل راوتر في الطريق ويحسب كام واحدة ضاعت عند كل واحد. اتجرب في CMD على ويندوز 11 بـ [[-q 20]] (هنشرحها تحت) عشان يخلص أسرع:

~~~cmd
pathping -q 20 google.com
~~~

---

## ١. المرحلة الأولى: الطريق

~~~text الناتج
Tracing route to google.com [142.251.209.206]
over a maximum of 30 hops:
  0  Dexter [192.168.1.65]
  1  192.168.1.1 [192.168.1.1]
  2  41.47.224.1
  3  10.35.33.145 [10.35.33.145]
  4  10.35.33.146 [10.35.33.146]
  5  10.45.28.77 [10.45.28.77]
  6  81.52.188.108
  7  193.251.152.113
  8     *        *        *
Computing statistics for 35 seconds...
~~~

- hop [[0]] جهازك نفسه، و [[1]] الراوتر بتاعك، وهكذا.
- hop [[8]] مردّش خالص، فـ pathping وقف الطريق عنده.
- [[Computing statistics for 35 seconds]]: المرحلة التانية بدأت، وهو حاسب هياخد قد إيه.

### ليه 35 ثانية؟

pathping بيبعت لكل hop عدد باكتات (الافتراضي **100**)، وبين كل باكت والتانية ربع ثانية (250ms). فـ 100 باكت = 25 ثانية لكل hop، ومع ٧ hops تبقى حوالي 3 دقايق. [[-q 20]] (q من queries) خلّاها 20 باكت بس: 20 × ربع ثانية = 5 ثواني لكل hop، × ٧ = 35 ثانية.

---

## ٢. المرحلة التانية: الجدول

~~~text الناتج
            Source to Here   This Node/Link
Hop  RTT    Lost/Sent = Pct  Lost/Sent = Pct  Address
  0                                           Dexter [192.168.1.65]
                                0/  20 =  0%   |
  1   27ms     0/  20 =  0%     0/  20 =  0%  192.168.1.1 [192.168.1.1]
                                0/  20 =  0%   |
  2   71ms     0/  20 =  0%     0/  20 =  0%  41.47.224.1
                                0/  20 =  0%   |
  3  ---      20/  20 =100%    20/  20 =100%  10.35.33.145 [10.35.33.145]
                                0/  20 =  0%   |
  4  ---      20/  20 =100%    20/  20 =100%  10.35.33.146 [10.35.33.146]
                                0/  20 =  0%   |
  5  ---      20/  20 =100%    20/  20 =100%  10.45.28.77 [10.45.28.77]
                                0/  20 =  0%   |
  6   41ms     0/  20 =  0%     0/  20 =  0%  81.52.188.108
                                0/  20 =  0%   |
  7  115ms     0/  20 =  0%     0/  20 =  0%  193.251.152.113
~~~

### الأعمدة

| العمود | معناه |
|---|---|
| [[Hop]] | ترتيب الراوتر |
| [[RTT]] | Round Trip Time: متوسط وقت الذهاب والعودة. [[---]] يعني مفيش رد يتحسب |
| [[Source to Here]] | من جهازك لحد هنا: ضاع كام من كام ([[Lost/Sent]]) والنسبة |
| [[This Node/Link]] | الضياع **عند الراوتر ده بالذات**، وده العمود اللي تبص عليه |
| السطور اللي فيها [[|]] بس | الوصلة (link) بين الراوتر ده واللي بعده |

### نقرا النتيجة دي

hops [[3]] و [[4]] و [[5]] عليهم **100%**، وده يخض. بس بص على hop [[6]] و [[7]]: [[0%]]. يعني الباكتات **عدّت** من 3 و 4 و 5 ووصلت بعدهم سليمة. الراوترات دي بس مش بترد على باكتات الاختبار نفسها (كتير منها متظبط كده عن قصد)، وبتعدّي الترافيك العادي.

القاعدة:

| الشكل | معناه |
|---|---|
| خسارة عند hop وكل اللي بعده [[0%]] | الراوتر ده بيتجاهل الاختبار بس، مفيش مشكلة |
| خسارة بتبدأ عند hop **وتفضل** في كل اللي بعده | هنا المشكلة الحقيقية |
| خسارة عند hop [[1]] نفسه | المشكلة عندك: الواي فاي أو الكابل أو الراوتر |

في التجربة دي: hop 1 و 2 و 6 و 7 بـ [[0%]]، يعني الاتصال سليم.

---

## الخلاصة

| الإضافة | معناها |
|---|---|
| [[-q 20]] | 20 باكت لكل hop بدل 100 (أسرع، وأقل دقة) |
| [[-n]] | متحوّلش الـ IPs لأسامي (أسرع) |
| [[-h 10]] | أقصى عدد hops (الافتراضي 30) |

استخدمه لما النت «بيقطّع» أو المكالمات بتتقطع، مش لما مفيش نت خالص (ساعتها [[ping]] و [[tracert]] أسرع). المقابل في لينكس [[mtr]].`,
          lines: ["الطريق + نسبة الضياع عند كل راوتر (بياخد دقيقتين)."],
          sol: R`[[pathping google.com]] بيطبع الأول قايمة الـ hops زي tracert، وبعدين [[Computing statistics for 250 seconds...]] (الوقت حسب عدد الـ hops)، وفي الآخر جدول فيه Hop و RTT و [[Source to Here]] و [[This Node/Link]] و Address. العمود [[This Node/Link Lost/Sent = Pct]] هو نسبة الخسارة عند الراوتر ده بالذات.

لو لقيت راوتر في النص عليه [[100%]] أو نسبة عالية بس اللي بعده [[0%]]، ده مش مشكلة: الراوتر ده بيتجاهل الـ ping بتاع الاختبار بس وبيعدّي الترافيك عادي. الخسارة الحقيقية هي اللي بتبدأ عند hop وتفضل في كل اللي بعده. وأول hop (الراوتر بتاعك) لو عليه خسارة، المشكلة في الواي فاي أو الكابل عندك.`
        },
        {
          cmd: "netsh",
          title: "إعدادات الشبكة",
          desc: R`[[netsh]] أداة كبيرة لإعدادات الشبكة من سطر الأوامر، مقسومة لأقسام (contexts): [[interface]] للكروت والـ IP، و [[wlan]] للواي فاي، و [[advfirewall]] للفايروول. كل أمر بيبدأ باسم القسم وبعده [[show]] للعرض أو [[set]] للتغيير.

[[netsh interface ip show config]] إعدادات IP لكل كارت. و [[netsh wlan show profiles]] شبكات الواي فاي اللي الجهاز حافظها. و [[netsh wlan show profile name="MyWiFi" key=clear]] تفاصيل شبكة واحدة: الاسم بين علامات تنصيص لو فيه مسافات، و [[key=clear]] بيعرض الباسورد نفسه تحت سطر [[Key Content]] بدل ما يخبيه.

ده بيشتغل بس على شبكات الجهاز ده اتوصل بيها قبل كده، وعرض الباسورد ممكن يحتاج CMD كأدمن. وأوامر [[set]] (زي تغيير IP أو قفل الفايروول) محتاجة أدمن وممكن تقطع الاتصال، فاقراها كويس قبل ما تنفّذ.`,
          example: R`netsh interface ip show config
netsh wlan show profiles
netsh wlan show profile name="MyWiFi" key=clear`,
          try: "اعرف باسورد الواي فاي بتاعك من جهاز متوصل بيه.",
          deep: {
            why: "أداة قوية لإدارة الشبكة في ويندوز. بتستخدمها لإيجاد الـ Wi-Fi passwords وإعداد الشبكة.",
            how: R`[[netsh wlan show profiles]] يعرض كل الـ Wi-Fi networks المحفوظة.

[[netsh wlan show profile name="NetworkName" key=clear]] يعرض معلومات الشبكة بما فيها الباسورد تحت «Key Content».

[[netsh interface ip show config]] إعدادات IP لكل كارت.

[[netsh advfirewall set allprofiles state off]] يعطّل الفايروول (محتاج Admin). استخدم بحذر.`,
            when: "نسيت باسورد Wi-Fi محفوظ. إعداد شبكة من الـ command line.",
            mistakes: "netsh firewall (القديم) مش بيشتغل على ويندوز الحديث. استخدم netsh advfirewall."
          },
          teach: R`## الفكرة

[[netsh]] (من network shell) أداة واحدة كبيرة لإعدادات الشبكة، مقسومة أقسام اسمها **contexts**، وكل أمر بيتكتب كأنه جملة: القسم، وبعدين القسم اللي جواه، وبعدين الفعل. الأوامر في المثال كلها [[show]] (عرض بس)، واتجربت في CMD على ويندوز 11.

مثلًا [[netsh interface ip show config]]: [[interface ip]] القسم، و [[show]] الفعل، و [[config]] إيه اللي يتعرض.

| القسم | بيتحكم في |
|---|---|
| [[interface ip]] | كروت الشبكة وإعدادات الـ IP |
| [[wlan]] | الواي فاي |
| [[advfirewall]] | الفايروول |

والفعل [[show]] للعرض، و [[set]] و [[add]] و [[delete]] للتغيير (ودول محتاجين أدمن).

---

## ١. [[netsh interface ip show config]]

بيعرض إعدادات كل الكروت. جربته على كارت الواي فاي بس بـ [[name="Wi-Fi"]]:

~~~text الناتج
Configuration for interface "Wi-Fi"
    DHCP enabled:                         Yes
    IP Address:                           192.168.1.65
    Subnet Prefix:                        192.168.1.0/24 (mask 255.255.255.0)
    Default Gateway:                      192.168.1.1
    Gateway Metric:                       0
    InterfaceMetric:                      40
    DNS servers configured through DHCP:  8.8.8.8
                                          8.8.4.4
                                          192.168.1.1
    Register with which suffix:           Primary only
    WINS servers configured through DHCP: None
~~~

نفس معلومات [[ipconfig /all]] تقريبًا، بشكل أوضح:

- [[DHCP enabled: Yes]]: الـ IP جاي من الراوتر أوتوماتيك.
- [[192.168.1.0/24]]: الشبكة. [[/24]] يعني أول 24 bit (أول ٣ أرقام) ثابتين، وهي نفس [[255.255.255.0]].
- [[DNS servers configured through DHCP]]: الـ DNS اللي الراوتر اداهولك.

---

## ٢. [[netsh wlan show profiles]]

كل شبكة واي فاي جهازك اتوصل بيها قبل كده وحفظها اسمها **profile**:

~~~text الناتج (الأسامي متخبية)
Profiles on interface Wi-Fi:

Group policy profiles (read only)
---------------------------------
    <None>

User profiles
-------------
    All User Profile     : <اسم شبكة>
    All User Profile     : <اسم شبكة>
    ...
~~~

- [[Group policy profiles]]: شبكات بتفرضها الشركة على أجهزة الشغل. هنا [[<None>]].
- [[User profiles]]: الشبكات اللي انت اتوصلت بيها. على الجهاز ده طلع ٢٤ شبكة، كل واحدة بعد [[All User Profile :]].

---

## ٣. [[netsh wlan show profile name="MyWiFi" key=clear]]

| الحتة | معناها |
|---|---|
| [[show profile]] | تفاصيل شبكة واحدة (من غير s) |
| [[name="MyWiFi"]] | اسمها بالظبط زي ما طلع في الخطوة اللي فاتت، بين علامات تنصيص لو فيه مسافات |
| [[key=clear]] | اعرض الباسورد نفسه بدل ما تخبيه |

الباسورد بيطلع تحت جزء [[Security settings]] في سطر [[Key Content]]. ده من توثيق netsh على Microsoft Learn: مشغلتهوش على شبكة حقيقية عشان بيطبع باسورد. اللي اتجرب هو اسم غلط:

~~~text الناتج
Profile "NoSuchNet123" is not found on the system.
~~~

يعني لازم الاسم يطابق بالظبط، حتى الحروف الكابيتال والمسافات. ولو سطر [[Key Content]] مظهرش، افتح CMD كأدمن.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| إعدادات IP لكل الكروت | [[netsh interface ip show config]] |
| كارت واحد | [[netsh interface ip show config name="Wi-Fi"]] |
| الشبكات المحفوظة | [[netsh wlan show profiles]] |
| باسورد شبكة محفوظة | [[netsh wlan show profile name="..." key=clear]] |

أي أمر فيه [[set]] (تغيير IP، قفل الفايروول) بيغيّر الجهاز فعلًا وممكن يقطع النت، وليه دروس لوحده في «تحكّم في الشبكة».`,
          lines: [
            "إعدادات IP لكل كارت.",
            "شبكات الواي فاي المحفوظة.",
            "تفاصيل شبكة معينة، وباسوردها تحت Key Content ([[key=clear]])."
          ],
          sol: R`[[netsh wlan show profiles]] الأول عشان تعرف الاسم بالظبط (بيظهر بعد [[All User Profile :]]). بعدين [[netsh wlan show profile name="اسم الشبكة" key=clear]]، ودوّر تحت [[Security settings]] على سطر [[Key Content : ...]]، ده الباسورد.

لو سطر Key Content مش ظاهر، افتح CMD كأدمن. ولو [[Profile "..." is not found on the system.]] يبقى الاسم مش مطابق (مسافة أو حرف كابيتال)، انسخه من ناتج show profiles. وده بيشتغل بس على شبكة الجهاز ده اتوصل بيها قبل كده.

جربت هنا [[show config]] و [[show profiles]] ورسالة الشبكة اللي مش موجودة. أما [[key=clear]] مشغلتهوش عشان بيطبع باسورد حقيقي؛ سطر Key Content ومسألة الأدمن من توثيق netsh wlan على Microsoft Learn.`
        },
        {
          cmd: "hosts",
          title: "ملف hosts",
          desc: R`ملف [[hosts]] بيخلّي جهازك يربط اسم دومين بـ IP بنفسه قبل ما يسأل أي DNS، زي [[/etc/hosts]] في لينكس. مكانه [[C:\Windows\System32\drivers\etc\hosts]] (من غير امتداد). كل سطر فيه IP ومسافة واسم، واللي بيبدأ بـ [[#]] تعليق.

[[type]] بيعرضه لأي حد. لكن الحفظ محتاج صلاحيات أدمن: لو فتحته بـ [[notepad]] من CMD عادي هيفتح، بس وانت بتحفظ هيقولك مش مسموح. فافتح CMD كأدمن الأول (كليك يمين على Command Prompt، Run as administrator) وبعدين السطر التاني.

بعد التعديل اعمل [[ipconfig /flushdns]]، وخلي بالك إن Notepad ممكن يحفظه [[hosts.txt]] لو مختارتش All Files. الاستخدام: دومين محلي للتطوير ([[127.0.0.1 myapp.local]])، أو تجرّب موقعك على سيرفر جديد قبل ما تنقل الـ DNS.`,
          example: R`type C:\Windows\System32\drivers\etc\hosts
notepad C:\Windows\System32\drivers\etc\hosts`,
          try: "اعرض الملف واعرف فيه إيه.",
          deep: {
            why: "نفس ملف hosts في لينكس ولكن مكانه مختلف ومحتاج صلاحيات Admin.",
            how: R`المسار: [[C:\Windows\System32\drivers\etc\hosts]]. عدّله بأي text editor كـ Admin.

أسهل طريقة: ابحث عن Notepad في Start Menu، كليك يمين ثم «Run as administrator»، ثم افتح الملف.

أو PowerShell كمدير: [[Add-Content "C:\Windows\System32\drivers\etc\hosts" "203.0.113.10 example.com"]].

بعد التعديل: [[ipconfig /flushdns]] عشان التغيير يسري فورًا.`,
            when: "تجرّب موقع على سيرفر جديد. دومين محلي للتطوير.",
            mistakes: "تعدّل من غير صلاحيات Admin فيرفض الحفظ (Access denied). افتحه كـ Admin دايمًا واعمل flush بعده."
          },
          teach: R`## الفكرة

قبل ما جهازك يسأل أي سيرفر DNS عن دومين، بيبص الأول في ملف نصي صغير اسمه [[hosts]]. لو لقى الدومين فيه، بياخد الـ IP اللي مكتوب ويخلص. فتقدر توجّه أي دومين لأي IP على جهازك انت بس. السطر الأول اتجرب في CMD على ويندوز 11.

---

## ١. [[type C:\Windows\System32\drivers\etc\hosts]]

المسار ده ثابت في كل ويندوز، والملف اسمه [[hosts]] من غير امتداد.

~~~text الناتج
# Copyright (c) 1993-2009 Microsoft Corp.
#
# This is a sample HOSTS file used by Microsoft TCP/IP for Windows.
#
# This file contains the mappings of IP addresses to host names. Each
# entry should be kept on an individual line. The IP address should
# be placed in the first column followed by the corresponding host name.
# The IP address and the host name should be separated by at least one
# space.
#
# Additionally, comments (such as these) may be inserted on individual
# lines or following the machine name denoted by a '#' symbol.
#
# For example:
#
#      102.54.94.97     rhino.acme.com          # source server
#       38.25.63.10     x.acme.com              # x client host

# localhost name resolution is handled within DNS itself.
#	127.0.0.1       localhost
#	::1             localhost
# Added by Docker Desktop
192.168.1.4 host.docker.internal
192.168.1.4 gateway.docker.internal
# To allow the same kube context to work on the host and the container:
127.0.0.1 kubernetes.docker.internal
# End of section
~~~

### نقرا الملف

- أي سطر بيبدأ بـ [[#]] **تعليق**: ويندوز بيتجاهله. فكل الجزء اللي فوق شرح من Microsoft بس، حتى سطور [[localhost]] متعلّق عليها (localhost شغال من غير الملف).
- السطر الشغال شكله: **IP، مسافة أو أكتر، الاسم**. زي [[127.0.0.1 kubernetes.docker.internal]].
- الجزء اللي تحت [[# Added by Docker Desktop]] Docker حطه لوحده عشان الكونتينرات توصل للجهاز بالاسم [[host.docker.internal]]. ده طبيعي لو عندك Docker.

> لو لقيت سطور بدومينات معروفة (بنوك أو جوجل) رايحة لـ IP غريب وانت محطتهاش، ده ممكن يكون برنامج خبيث.

---

## ٢. [[notepad C:\Windows\System32\drivers\etc\hosts]]

بيفتح الملف في Notepad عشان تعدّله. الملف في فولدر [[System32]] المحمي، فـ:

1. لو CMD مفتوح عادي، Notepad هيفتح الملف عادي، بس لما تحفظ هيرفض.
2. عشان تحفظ: افتح CMD **كأدمن** الأول (كليك يمين على Command Prompt، Run as administrator)، وبعدين نفس السطر.
3. ضيف سطرك تحت، زي:

~~~text سطر جديد في hosts
127.0.0.1   myapp.local
~~~

وبعدها احفظ، واكتب [[ipconfig /flushdns]] عشان ويندوز ينسى أي رد قديم محفوظ.

دلوقتي [[http://myapp.local:3000]] بيفتح السيرفر اللي على جهازك. (السطر ده مااتجربش هنا عشان مش بنعدّل ملفات النظام؛ الخطوات من توثيق Microsoft. ومن غير أدمن [[type]] اشتغل عادي، يعني القراءة مسموحة لأي حد.)

---

## الخلاصة

| عايز | اكتب |
|---|---|
| تشوف الملف | [[type C:\Windows\System32\drivers\etc\hosts]] |
| تعدّله | [[notepad C:\Windows\System32\drivers\etc\hosts]] من CMD أدمن |
| التعديل يشتغل على طول | [[ipconfig /flushdns]] |

| السطر | معناه |
|---|---|
| [[# ...]] | تعليق |
| [[127.0.0.1 myapp.local]] | myapp.local = جهازي |
| [[203.0.113.10 example.com]] | جرّب موقعك على سيرفر جديد قبل ما تغيّر الـ DNS |

المقابل في لينكس والماك [[/etc/hosts]] بنفس الشكل بالظبط، وبيتعدّل بـ [[sudo]].`,
          lines: ["اعرض ملف hosts.", "افتحه في Notepad (لازم CMD يكون مفتوح كمدير عشان تقدر تحفظ)."],
          sol: R`[[type C:\Windows\System32\drivers\etc\hosts]] على ويندوز جديد هيطبع سطور كلها بتبدأ بـ [[#]]: حقوق Microsoft، وشرح للصيغة، وسطرين معلقين [[# 127.0.0.1 localhost]] و [[# ::1 localhost]]. يعني الملف فعليًا مفيهوش حاجة شغالة، والـ [[#]] معناها تعليق.

لو عندك Docker Desktop هتلاقي قسم [[# Added by Docker Desktop]] فيه [[host.docker.internal]] و [[kubernetes.docker.internal]]، وده طبيعي. أما لو لقيت سطور بدومينات معروفة (بنوك أو جوجل) شاورة على IP غريب وانت محطتهاش، ده ممكن يكون برنامج خبيث، راجعه. (الحفظ من notepad من غير أدمن مجربتهوش هنا عشان مش بنعدّل hosts؛ ده من توثيق Microsoft.)`
        }
      ]
    }
]);
