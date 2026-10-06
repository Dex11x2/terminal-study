// تكملة تاب bash: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/bash/01.js (شرح حقول الدرس في أوله)
MORE("bash", [
    {
      t: "الأجهزة اللي معاك على الشبكة",
      l: 2,
      n: "مين متوصل على الواي فاي، والطابعة اسمها إيه، وفولدر مشترك من ويندوز، وتشغيل جهاز مطفي. كل ده على شبكتك انت أو بإذن صاحبها بس",
      items: [
        {
          cmd: "nmap -sn و arp-scan",
          title: "مين متوصل على شبكتك",
          desc: R`[[nmap -sn]] و [[arp-scan]] بيلفّوا على كل العناوين في شبكتك المحلية ويقولولك مين موجود: IP كل جهاز، والـ MAC، والشركة اللي عاملة الكارت (Apple و Samsung و TP-Link...). فتعرف IP الطابعة أو الـ Raspberry Pi أو التلفزيون، أو تكتشف جهاز غريب داخل على الواي فاي. استخدمهم على شبكتك انت أو بإذن صاحبها بس: الـ scan على شبكة شغل أو كافيه أو جيران من غير إذن ممكن يبقى مخالف لسياسة المكان أو للقانون.

أول خطوة تعرف شبكتك: [[ip -br a]] هيطلّع حاجة زي [[wlan0 UP 192.168.1.23/24]]. الـ [[/24]] معناها أول ٣ أرقام ثابتين، فالشبكة [[192.168.1.0/24]] = من 192.168.1.1 لـ 192.168.1.254. و [[ip route]] بيقولك الراوتر ([[default via 192.168.1.1]]).

[[sudo nmap -sn 192.168.1.0/24]]: [[-sn]] (no port scan) بيسأل «انت موجود؟» بس، من غير ما يفحص بورتات (البورتات في درس nmap). مع sudo وعلى نفس الشبكة بيستخدم ARP، وده السؤال اللي الأجهزة بتسأله لبعض «مين صاحب IP كذا؟»، فسريع ومفيش جهاز يقدر يتجاهله حتى لو الفايروول بتاعه قافل الـ ping، وبيطلّع الـ MAC والشركة. من غير sudo بيجرّب يتصل ببورتات 80 و 443 بس، فأجهزة كتير مش هتظهر ومفيش MAC (جربت الاتنين). و [[-n]] متدوّرش على الأسامي (أسرع)، و [[-oG -]] شكل سطر لكل جهاز ينفع مع grep.

[[sudo arp-scan --localnet]]: بيبعت ARP لكل الشبكة بتاعة الكارت ([[-I wlan0]] لو عندك أكتر من كارت) ويطبع سطر لكل جهاز: IP و MAC والشركة، من ملف [[ieee-oui.txt]] اللي جاي معاه. و [[(Unknown: locally administered)]] معناها الـ MAC عشوائي: الموبايلات والأجهزة الحديثة (iOS و Android و Windows) بتعمل MAC عشوائي لكل شبكة واي فاي (Private Wi-Fi Address)، فمش هتعرف الشركة منه، ودي حماية خصوصية مش جهاز مريب.

[[ip neigh]] (neighbor) جدول الـ kernel: الأجهزة اللي جهازك كلّمها فعلًا مؤخرًا وعارف الـ MAC بتاعها: [[REACHABLE]] لسه متأكد منه، و [[STALE]] من شوية، و [[FAILED]] أو [[INCOMPLETE]] سأل ومحدش رد. مش بيعمل scan، فمش هتلاقي فيه غير الراوتر واللي اتكلمت معاه (حتى بعد nmap، لأن nmap بيبعت الـ ARP بنفسه من غير ما يعدّي على الجدول ده). وده البديل الحديث لـ [[arp -a]].`,
          example: R`ip -br a
ip route
sudo apt install nmap arp-scan
sudo nmap -sn 192.168.1.0/24
sudo arp-scan --localnet
ip neigh`,
          try: R`على شبكة بيتك: اعرف الـ subnet بتاعتك، وطلّع لستة الأجهزة بالاتنين وقارنهم. حاول تعرف كل جهاز مين (الشركة، أو افصل جهاز وشوف مين اختفى). كام واحد طلع MAC عشوائي؟`,
          mac: ["diff", R`[[brew install nmap arp-scan]] ونفس الأوامر، و [[sudo arp-scan -I en0 --localnet]]. ومفيش [[ip]]: [[ipconfig getifaddr en0]] للـ IP، و [[arp -a]] بدل [[ip neigh]].`],
          deep: {
            why: R`عايز توصل لجهاز ومش عارف الـ IP بتاعه (طابعة، Raspberry Pi لسه متسطب، كاميرا). أو النت بطيء وعايز تعرف مين على الواي فاي. أو بتراجع أمان شبكة البيت أو المكتب الصغير: فيه أجهزة مش معروفة؟`,
            how: R`جوه شبكة واحدة الأجهزة بتتكلم بالـ MAC مش الـ IP. فقبل ما جهازك يبعت لـ 192.168.1.40، بيبعت broadcast «مين عنده 192.168.1.40؟» والجهاز ده بيرد بالـ MAC بتاعه. arp-scan و nmap بيبعتوا السؤال ده لكل العناوين ورا بعض ويسجّلوا مين رد. ولأن أي جهاز عايز يتكلم على الشبكة لازم يرد على ARP، الطريقة دي بتلاقي حتى الأجهزة اللي قافلة ping.

والـ ARP مبيعدّيش الراوتر، فده بيشتغل على الشبكة المحلية بس. ولشبكة تانية، nmap بيستخدم ping وبورتات، والنتيجة أقل دقة. وأول ٣ bytes من الـ MAC (اسمها OUI) متسجّلة باسم الشركة المصنّعة، ومن هنا اسم الشركة.`,
            when: R`Raspberry Pi جديد ومش عارف عنوانه. جهاز غريب عايز تعرف هو إيه. قبل ما تختار IP ثابت لجهاز (تتأكد إنه فاضي). وبعد ما الراوتر يعيد توزيع العناوين وتطبعتك «اختفت».`,
            mistakes: R`تعمل scan على شبكة مش بتاعتك (شغل، جامعة، كافيه) من غير إذن: ممكن يتعمل لك حظر أو مشكلة. وتشغّل nmap من غير sudo وتفتكر الأجهزة اللي مظهرتش مش موجودة. وتفتكر MAC عشوائي يعني جهاز مخترق. وتدوّر بـ [[ip neigh]] بس فتفتكر الشبكة فيها جهازين.`
          },
          teach: R`## الاتنين بيسألوا كل عنوان في شبكتك «انت موجود؟» ويطبعوا اللي رد

جهّزت شبكة Docker [[192.168.77.0/24]] فيها راوتر ([[.1]]) و ٤ أجهزة أوبونتو: لابتوب [[.5]] (اللي بشغّل منه)، وسيرفر [[.10]]، وديسكتوب [[.20]]، وطابعة [[.40]]. كل الأرقام عندي [[192.168.77]] بدل [[192.168.1]]. واللابتوب container بـ [[NET_ADMIN]] و [[NET_RAW]] وكنت root فيه، فمن غير [[sudo]].

---

## ١. [[ip -br a]]

~~~text الناتج
eth0@if50        UP             192.168.77.5/24
~~~

[[/24]] = أول ٣ أرقام ثابتين، فالشبكة [[192.168.77.0/24]]: من [[.1]] لـ [[.254]]. ([[.0]] اسم الشبكة و [[.255]] الـ broadcast.)

## ٢. [[ip route]]

~~~text الناتج
default via 192.168.77.1 dev eth0
~~~

الراوتر [[192.168.77.1]].

## ٣. [[sudo apt install nmap arp-scan]]

## ٤. [[sudo nmap -sn 192.168.77.0/24]]

[[-sn]] = scan من غير بورتات، «مين موجود» بس:

~~~text الناتج
Nmap scan report for 192.168.77.1
Host is up (0.00018s latency).
MAC Address: 52:53:0E:EF:83:82 (Unknown)
Nmap scan report for b4-srv.b4-lan (192.168.77.10)
Host is up (0.000022s latency).
MAC Address: 46:19:83:25:8B:05 (Unknown)
Nmap scan report for b4-nm.b4-lan (192.168.77.20)
Host is up (0.00016s latency).
MAC Address: 5A:E4:D7:BA:BE:CA (Unknown)
Nmap scan report for b4-printer.b4-lan (192.168.77.40)
Host is up (0.000083s latency).
MAC Address: AE:8E:A9:F5:9F:46 (Unknown)
Nmap scan report for laptop (192.168.77.5)
Host is up.
Nmap done: 256 IP addresses (5 hosts up) scanned in 15.11 seconds
~~~

| الحتة | معناها |
|---|---|
| [[Nmap scan report for اسم (IP)]] | جهاز رد. الاسم جه من DNS (هنا DNS بتاع Docker، وفي البيت من الراوتر أو مفيش) |
| [[latency]] | الرد خد قد إيه |
| [[MAC Address]] | عنوان الكارت، وبين قوسين الشركة لو معروفة |
| [[laptop]] من غير MAC | ده انا |
| [[256 IP addresses (5 hosts up)]] | جرّب ٢٥٦ عنوان، ورد ٥ |

و [[(Unknown)]] لأن Docker بيعمل MACs عشوائية؛ في البيت هتلاقي [[(Apple)]] أو [[(Samsung Electronics)]].

### [[-n]] و [[-oG -]]

~~~text nmap -sn -n 192.168.77.0/24 -oG -
# Nmap 7.94SVN scan initiated Tue Oct  6 08:41:13 2026 as: nmap -sn -n -oG - 192.168.77.0/24
Host: 192.168.77.1 ()	Status: Up
Host: 192.168.77.10 ()	Status: Up
Host: 192.168.77.20 ()	Status: Up
Host: 192.168.77.40 ()	Status: Up
~~~

[[-n]] من غير أسامي، و [[-oG -]] (output grepable) سطر لكل جهاز على الشاشة ([[-]])، تعدّي عليه [[grep Up]].

### من غير sudo

كيوزر عادي نفس الأمر لقى الـ ٥ (لأن أجهزة Docker بترد على بورتات 80 و 443 حتى وهي مقفولة)، بس عدد سطور [[MAC Address]] كان صفر. في البيت أجهزة كتير مبترودش على البورتات دي، فهتختفي.

## ٥. [[sudo arp-scan --localnet]]

[[--localnet]] = كل الشبكة بتاعة الكارت (حسبها من [[/24]]):

~~~text الناتج
Interface: eth0, type: EN10MB, MAC: 46:29:0d:23:94:a7, IPv4: 192.168.77.5
Starting arp-scan 1.10.0 with 256 hosts (https://github.com/royhills/arp-scan)
192.168.77.1	52:53:0e:ef:83:82	(Unknown: locally administered)
192.168.77.10	46:19:83:25:8b:05	(Unknown: locally administered)
192.168.77.20	5a:e4:d7:ba:be:ca	(Unknown: locally administered)
192.168.77.40	ae:8e:a9:f5:9f:46	(Unknown: locally administered)

4 packets received by filter, 0 packets dropped by kernel
Ending arp-scan 1.10.0: 256 hosts scanned in 2.334 seconds (109.68 hosts/sec). 4 responded
~~~

| الحتة | معناها |
|---|---|
| [[Interface: eth0 ... IPv4]] | الكارت اللي بعت منه وعنوانه |
| [[type: EN10MB]] | Ethernet (الاسم القديم لأي Ethernet) |
| كل سطر | IP و MAC والشركة |
| [[4 responded]] | رد ٤ (هو مش بيعدّ نفسه) |

و [[locally administered]]: الـ MAC بيقول عن نفسه إنه متعمل عشوائي مش من مصنع. Docker بيعمل كده، والموبايلات كمان (Private Wi-Fi Address). وأسرع من nmap بكتير هنا: ٢.٣ ثانية مقابل ١٥.

## ٦. [[ip neigh]]

مسحت الجدول ([[ip neigh flush all]]) قبل الـ scans، وبعدهم [[ip neigh]] مطبعش حاجة: nmap و arp-scan بيبعتوا بنفسهم ومش بيكتبوا في الجدول ده. وبعد [[ping]] لـ [[.40]] ولعنوان مش موجود [[.99]]:

~~~text الناتج
192.168.77.40 dev eth0 lladdr ae:8e:a9:f5:9f:46 REACHABLE
192.168.77.99 dev eth0 INCOMPLETE
~~~

| الحالة | معناها |
|---|---|
| [[REACHABLE]] | كلمته من شوية ورد |
| [[STALE]] | عارف الـ MAC بس من بدري |
| [[INCOMPLETE]] أو [[FAILED]] | سأل ومحدش رد |

و [[lladdr]] (link-layer address) = الـ MAC.

| الأداة | بتعمل scan؟ | MAC | الشركة |
|---|---|---|---|
| [[sudo nmap -sn]] | أيوه | أيوه | أيوه |
| [[nmap -sn]] من غير sudo | أيوه، أضعف | لأ | لأ |
| [[sudo arp-scan --localnet]] | أيوه، الشبكة المحلية بس | أيوه | أيوه |
| [[ip neigh]] | لأ | اللي كلمته بس | لأ |

> على الماك [[brew install nmap arp-scan]] ونفس الأوامر بـ [[-I en0]]، و [[arp -a]] بدل [[ip neigh]] (من الـ docs). وعلى شبكتك انت بس.

## الخلاصة

اعرف الشبكة من [[ip -br a]]، وبعدين [[sudo arp-scan --localnet]] أسرع حاجة، و [[sudo nmap -sn]] لو محتاج الأسامي. و MAC عشوائي مش معناه جهاز مريب.`,
          lines: [
            R`عنوانك والـ [[/24]] بيقولك الشبكة.`,
            R`الراوتر (default via).`,
            R`سطّب الأداتين.`,
            R`مين موجود على الـ 254 عنوان، من غير فحص بورتات.`,
            R`نفس الكلام بـ ARP، ومعاه اسم الشركة.`,
            R`الأجهزة اللي جهازك كلّمها فعلًا مؤخرًا.`
          ],
          sol: R`ناتج حقيقي من شبكة Docker عملتها فيها ٤ containers وراوتر ([[172.30.0.0/24]] بدل 192.168.1.0/24)، من container بـ NET_ADMIN و NET_RAW. [[sudo nmap -sn 172.30.0.0/24]]:
[[Nmap scan report for bl-nm.bl-lan (172.30.0.10)]]
[[Host is up (0.000026s latency).]]
[[MAC Address: 02:4F:4A:14:65:AC (Unknown)]]
... ونفس الكلام لـ 172.30.0.1 و .40 و .41، وفي الآخر [[Nmap done: 256 IP addresses (5 hosts up) scanned in 2.11 seconds]] (الخامس هو جهازي). والأسامي جاية من DNS بتاع Docker؛ في البيت هتلاقي أسامي من الراوتر أو من غير اسم.

[[sudo arp-scan --localnet]]:
[[Interface: eth0, type: EN10MB, MAC: b6:e9:5f:a9:3a:92, IPv4: 172.30.0.5]]
[[172.30.0.40	6e:db:2b:c1:d3:88	(Unknown: locally administered)]]
... و [[256 hosts scanned in 1.999 seconds (128.06 hosts/sec). 4 responded]]. هنا كلهم [[locally administered]] لأن Docker بيعمل MACs عشوائية؛ في البيت هتلاقي [[(Apple, Inc.)]] أو [[(TP-LINK TECHNOLOGIES CO.,LTD.)]] لأجهزة كتير.

و [[ip neigh]] بعد الـ scan كان فيه سطر واحد: [[172.30.0.1 dev eth0 lladdr 9a:bb:c3:01:61:60 REACHABLE]]، وبعد [[ping]] لـ .40 ولعنوان مش موجود زاد [[172.30.0.40 ... REACHABLE]] و [[172.30.0.99 dev eth0 INCOMPLETE]]. ومن غير sudo، [[nmap -sn]] لقى ٣ من ٥ ومن غير MAC.`
        },
        {
          cmd: "avahi-browse و .local",
          title: "الطابعة والأجهزة اللي بتعلن عن نفسها",
          desc: R`أجهزة كتير على الشبكة بتعلن عن اسمها والخدمات اللي عندها من غير DNS ولا إعداد: الطابعات، والـ Chromecast والتلفزيونات، والماك، والـ NAS، وأي لينكس عليه Avahi. الطريقة اسمها mDNS (multicast DNS) ومعاها DNS-SD (اكتشاف الخدمات)، وأبل بتسميها Bonjour. و Avahi هو اللي بيعملها على لينكس: [[ping printer.local]] بيوصل من غير ما تعرف الـ IP، و [[avahi-browse]] بيوريك كل اللي بيعلن.

الأسماء اللي بتخلص بـ [[.local]] مش بتروح لسيرفر DNS: جهازك بيسأل الشبكة كلها «مين اسمه printer.local؟» (على العنوان 224.0.0.251 بورت 5353 UDP) والجهاز نفسه بيرد بالـ IP. على أوبونتو Desktop شغال من الأول (باكدج [[avahi-daemon]] و [[libnss-mdns]])، وسطر [[hosts:]] في [[/etc/nsswitch.conf]] فيه [[mdns4_minimal]] قبل [[dns]]، فـ [[ping]] و [[ssh pi@raspberrypi.local]] وأي برنامج بيفهموها. وعلى سيرفر: [[sudo apt install avahi-daemon avahi-utils libnss-mdns]]، وجهازك نفسه هيبقى اسمه [[hostname.local]].

[[avahi-browse]]: [[-a]] (all) كل أنواع الخدمات، و [[-r]] (resolve) هات الاسم والـ IP والبورت لكل خدمة، و [[-t]] (terminate) اطبع اللي لقيته واخرج بدل ما يفضل يتابع، و [[-p]] (parsable) سطور مفصولة بـ [[;]] للسكربتات. وفي الناتج: [[+]] خدمة ظهرت، و [[=]] تفاصيلها بعد الـ resolve، و [[-]] خدمة اختفت. وأنواع مشهورة: [[_ipp._tcp]] طابعة (Internet Printer)، و [[_smb._tcp]] فولدر مشترك (Microsoft Windows Network)، و [[_googlecast._tcp]] Chromecast، و [[_ssh._tcp]]، و [[_airplay._tcp]]. و [[avahi-browse -rt _ipp._tcp]] للطابعات بس. وسطر [[txt]] فيه تفاصيل زيادة زي موديل الطابعة.

[[avahi-resolve -n printer.local]] (name) يحوّل اسم لـ IP عن طريق Avahi مباشرة، مفيد لما تشك في nsswitch. ولو الاسم مش موجود بيطبع [[Timeout reached]] بعد ثواني.

مع الأجهزة التانية: الماك بيعلن عن نفسه ويرد على [[اسمه.local]] من غير أي إعداد. وويندوز 10 و 11 بيقدروا يحلّوا أسماء [[.local]]، فـ [[ping laptop.local]] من ويندوز بيوصل لجهاز لينكس عليه Avahi، لكن الفولدرات المشتركة في ويندوز ممكن متظهرش في avahi-browse (الدرس الجاي بيوصلها بالـ IP). ولو مفيش حاجة بتظهر: فايروول بيمنع UDP 5353 ([[sudo ufw allow 5353/udp]])، أو شبكة الضيوف في الراوتر بتعزل الأجهزة عن بعض، أو الأجهزة على شبكات مختلفة؛ mDNS مبيعدّيش الراوتر.`,
          example: R`sudo apt install avahi-daemon avahi-utils libnss-mdns
grep hosts /etc/nsswitch.conf
ping -c 2 printer.local
avahi-resolve -n printer.local
avahi-browse -art
avahi-browse -rt _ipp._tcp`,
          try: R`على شبكة بيتك: [[avahi-browse -art]] وشوف مين بيعلن (طابعة؟ تلفزيون؟ ماك؟). وبعدين جرّب [[ping اسم-جهازك.local]] من موبايل أو جهاز تاني على نفس الواي فاي.`,
          mac: ["diff", R`Bonjour جوه الماك من الأول: [[ping printer.local]] شغال، والتصفح بـ [[dns-sd -B _services._dns-sd._udp]] (أنواع الخدمات الموجودة) و [[dns-sd -B _ipp._tcp]] (الطابعات)، و [[dns-sd -G v4 printer.local]] بدل avahi-resolve. و dns-sd مبيخلصش لوحده: Ctrl+C.`],
          deep: {
            why: R`في البيت أو مكتب صغير مفيش DNS داخلي، والراوتر بيدّي عناوين بتتغير. فبدل ما تحفظ إن الطابعة 192.168.1.37 النهارده، تكتب [[printer.local]]. وبرامج الطباعة والـ Chromecast والـ AirPlay كلها بتلاقي الأجهزة بالطريقة دي، فلما «الطابعة مش ظاهرة»، avahi-browse بيقولك المشكلة في الإعلان ولا في الطباعة.`,
            how: R`كل جهاز عليه mDNS بيسمع على 224.0.0.251:5353. لما برنامج يسأل عن اسم بيخلص بـ [[.local]]، Avahi بيبعت السؤال multicast للشبكة كلها، واللي اسمه كده بيرد بالـ IP. ونفس الفكرة للخدمات: «مين عنده [[_ipp._tcp]]؟» وكل طابعة بترد باسمها والبورت والتفاصيل.

و [[mdns4_minimal [NOTFOUND=return]]] في nsswitch معناها: الاسم بيخلص بـ .local؟ اسأل mDNS، ولو ملقتش متكمّلش لـ DNS العادي. وأي جهاز بيعلن خدماته من ملفات في [[/etc/avahi/services/]]، وبرامج زي Samba و CUPS بتعلن لوحدها.`,
            when: R`[[ssh pi@raspberrypi.local]] أول مرة بعد تسطيب Raspberry Pi OS. تلاقي IP الطابعة عشان تضيفها يدوي. تتأكد إن الـ NAS بيعلن. وتشغّل Avahi على سيرفر البيت عشان تدخله بالاسم بدل الـ IP.`,
            mistakes: R`تفتكر [[.local]] بيشتغل من برّه البيت أو عبر VPN، وهو على الشبكة المحلية بس. وتسمّي دومين داخلي في شركتك [[.local]] فيتعارض مع mDNS. ونسيان [[libnss-mdns]] على سيرفر، فـ avahi-browse يلاقي الأجهزة بس ping مش عارف الاسم. وفايروول قافل 5353.`
          },
          teach: R`## الأجهزة بتعلن عن نفسها على الشبكة، و [[.local]] و [[avahi-browse]] بيسمعوا الإعلانات دي

جهّزت ٣ containers أوبونتو 24.04 على شبكة Docker واحدة، على كل واحد avahi-daemon و D-Bus: [[printer]] ([[192.168.77.40]]) بيعلن عن طابعة بملف في [[/etc/avahi/services/]]، و [[server]] ([[192.168.77.10]]) عليه Samba، و [[laptop]] اللي بشغّل منه.

---

## ١. [[sudo apt install avahi-daemon avahi-utils libnss-mdns]]

| الباكدج | فيه إيه |
|---|---|
| [[avahi-daemon]] | الخدمة اللي بتعلن وبتسمع |
| [[avahi-utils]] | [[avahi-browse]] و [[avahi-resolve]] |
| [[libnss-mdns]] | بتخلي أي برنامج ([[ping]] و [[ssh]]) يفهم [[.local]] |

## ٢. [[grep hosts /etc/nsswitch.conf]]

~~~text الناتج
hosts:          files mdns4_minimal [NOTFOUND=return] dns
~~~

ده ترتيب البحث عن أي اسم، من الشمال:

| الحتة | معناها |
|---|---|
| [[files]] | [[/etc/hosts]] الأول |
| [[mdns4_minimal]] | لو الاسم بيخلص بـ [[.local]]، اسأل الشبكة بـ mDNS (IPv4) |
| [[[NOTFOUND=return] ]] | ولو mDNS ملقاش، اقف ومتسألش DNS |
| [[dns]] | باقي الأسماء لسيرفر الـ DNS |

[[libnss-mdns]] هي اللي زوّدت [[mdns4_minimal]] لما اتسطبت.

## ٣. [[ping -c 2 printer.local]]

~~~text الناتج
PING printer.local (192.168.77.40) 56(84) bytes of data.
64 bytes from b4-printer.b4-lan (192.168.77.40): icmp_seq=1 ttl=64 time=0.154 ms
64 bytes from b4-printer.b4-lan (192.168.77.40): icmp_seq=2 ttl=64 time=0.134 ms
~~~

جهازي بعت سؤال للشبكة كلها «مين printer.local؟»، والطابعة ردت بعنوانها. (الاسم اللي في سطور الرد من DNS بتاع Docker، مش مهم.)

## ٤. [[avahi-resolve -n printer.local]]

[[-n]] (name) حوّل اسم لعنوان عن طريق Avahi مباشرة:

~~~text الناتج
printer.local	192.168.77.40
~~~

~~~text avahi-resolve -n nothere.local
Failed to resolve host name 'nothere.local': Timeout reached
~~~

## ٥. [[avahi-browse -art]]

[[-a]] (all) كل الأنواع، و [[-r]] (resolve) هات التفاصيل، و [[-t]] (terminate) اخرج بعد ما تخلص:

~~~text الناتج
+   eth0 IPv4 SERVER                                        Device Info          local
+   eth0 IPv4 SERVER                                        Microsoft Windows Network local
=   eth0 IPv4 SERVER                                        Microsoft Windows Network local
   hostname = [server.local]
   address = [192.168.77.10]
   port = [445]
   txt = []
+   eth0 IPv4 Office LaserJet                               Internet Printer     local
=   eth0 IPv4 Office LaserJet                               Internet Printer     local
   hostname = [printer.local]
   address = [192.168.77.40]
   port = [631]
   txt = ["rp=printers/office" "ty=HP LaserJet Pro"]
~~~

### نقرا سطر [[+]]

| العمود | القيمة | معناها |
|---|---|---|
| أول علامة | [[+]] | خدمة ظهرت. و [[=]] تفاصيلها، و [[-]] اختفت |
| الكارت | [[eth0]] | سمعها على أنهي كارت |
| البروتوكول | [[IPv4]] | |
| الاسم | [[Office LaserJet]] | اسم الخدمة اللي الجهاز اختاره |
| النوع | [[Internet Printer]] | اسم مقروء لـ [[_ipp._tcp]] |
| الدومين | [[local]] | |

### وسطور [[=]]

[[hostname]] اسم الجهاز، و [[address]] عنوانه، و [[port]] البورت (631 بتاع الطباعة، و 445 بتاع SMB)، و [[txt]] تفاصيل زيادة: هنا موديل الطابعة. وكمان Samba على السيرفر أعلن عن [[Microsoft Windows Network]] ([[_smb._tcp]]) لوحده من غير ما أكتب أي ملف.

## ٦. [[avahi-browse -rt _ipp._tcp]]

نوع واحد بس بدل [[-a]]:

~~~text الناتج
+   eth0 IPv4 Office LaserJet                               Internet Printer     local
=   eth0 IPv4 Office LaserJet                               Internet Printer     local
   hostname = [printer.local]
   address = [192.168.77.40]
   port = [631]
   txt = ["rp=printers/office" "ty=HP LaserJet Pro"]
~~~

و [[-p]] (parsable) لو هتعالجه بسكربت: [[+;eth0;IPv4;Office\032LaserJet;Internet Printer;local]]، والمسافة بتتكتب [[\032]].

| الأمر | بيعمل إيه |
|---|---|
| [[ping اسم.local]] | أي برنامج بيفهم .local |
| [[avahi-resolve -n اسم.local]] | اسم لعنوان |
| [[avahi-browse -art]] | كل الخدمات بالتفاصيل |
| [[avahi-browse -rt نوع]] | نوع واحد |

## على الماك

Bonjour موجود من الأول، و [[ping printer.local]] شغال، والتصفح بـ [[dns-sd -B _ipp._tcp]] (من الـ man page، و dns-sd مبيخلصش لوحده: Ctrl+C).

## الخلاصة

[[.local]] = اسأل الشبكة المحلية مش الـ DNS. و [[avahi-browse -art]] بيوريك كل جهاز بيعلن: اسمه وعنوانه وبورته. وده جوه الشبكة بس.`,
          lines: [
            R`سطّب Avahi والأدوات ومكتبة حل الأسماء (موجودين على Desktop).`,
            R`اتأكد إن [[mdns4_minimal]] موجود قبل [[dns]].`,
            R`[[ping]] بالاسم: جهازك هيسأل الشبكة عن printer.local.`,
            R`اسم لـ IP عن طريق Avahi مباشرة.`,
            R`كل الخدمات ([[-a]])، بالتفاصيل ([[-r]])، واخرج ([[-t]]).`,
            R`الطابعات بس.`
          ],
          sol: R`ناتج حقيقي من ٣ containers أوبونتو 24.04 على شبكة Docker واحدة، عليهم avahi-daemon 0.8: واحد اسمه printer بيعلن [[_ipp._tcp]] بملف في [[/etc/avahi/services]]، وواحد اسمه nas عليه Samba، وجهازي. [[avahi-browse -art]]:
[[+   eth0 IPv4 NAS                                           Device Info          local]]
[[+   eth0 IPv4 NAS                                           Microsoft Windows Network local]]
[[+   eth0 IPv4 Office LaserJet                               Internet Printer     local]]
[[=   eth0 IPv4 Office LaserJet                               Internet Printer     local]]
[[   hostname = [printer.local]]]
[[   address = [172.30.0.40]]]
[[   port = [631]]]
[[   txt = ["ty=HP LaserJet Pro" "rp=printers/office"]]]
ولاحظ إن Samba أعلن عن [[_smb._tcp]] لوحده (بالـ port 445). و [[ping -c 2 printer.local]] طبع [[PING printer.local (172.30.0.40) 56(84) bytes of data.]] ورد مرتين، و [[avahi-resolve -n printer.local]] طبع [[printer.local	172.30.0.40]]، و [[getent hosts nas.local]] طبع [[172.30.0.41     nas.local]]. واسم مش موجود: [[Failed to resolve host name 'nothere.local': Timeout reached]]. وسطر nsswitch: [[hosts:          files mdns4_minimal [NOTFOUND=return] dns]].`
        },
        {
          cmd: "smbclient و mount -t cifs",
          title: "افتح فولدر مشترك من ويندوز",
          desc: R`الفولدرات المشتركة في ويندوز (و NAS زي Synology، و Samba على لينكس) بتشتغل ببروتوكول اسمه SMB (أو CIFS، اسمه القديم). [[smbclient]] بيدخلها من الترمنال زي FTP: تشوف وتنزّل وترفع، و [[mount -t cifs]] بيركّبها كفولدر عادي جوه لينكس، فأي برنامج يفتح ملفاتها كأنها على جهازك.

التسطيب: [[sudo apt install smbclient cifs-utils]]؛ الأولى للتصفح، والتانية فيها [[mount.cifs]] اللي mount بيحتاجه. [[smbclient -L //192.168.1.20 -U ali]] (list) يعرض الفولدرات المشتركة على الجهاز ده، و [[-U ali]] اليوزر وهيسألك الباسورد. وتعرف IP جهاز الويندوز من [[ipconfig]] عليه أو من [[arp-scan]]؛ الـ IP أضمن من الاسم. وفي آخر الناتج سطر [[SMB1 disabled -- no workgroup available]]، وده عادي: SMB1 القديم مقفول لأسباب أمنية، فـ smbclient مش بيعرض لستة الـ workgroup.

[[smbclient //192.168.1.20/Docs -U ali]] يدخل الفولدر Docs ويفتحلك [[smb: \>]]، وجواه: [[ls]] و [[cd]]، و [[get ملف]] تنزيل، و [[put ملف]] رفع، و [[mget *.pdf]] كذا ملف، و [[lcd]] يغيّر فولدرك المحلي، و [[exit]]. و [[-c "ls; get file"]] ينفّذ أوامر ويخرج من غير prompt.

mount: [[sudo mount -t cifs //192.168.1.20/Docs /mnt/docs -o username=ali,uid=$(id -u),gid=$(id -g),vers=3.0]]:
• [[-t cifs]] النوع، و [[-o]] الإعدادات مفصولة بفواصل.
• [[username=ali]] وهيسأل الباسورد.
• [[uid]] و [[gid]]: الملفات تبان ملكك انت. من غيرهم بتبان ملك root ومش هتعرف تكتب. و [[$(id -u)]] بيتحسب في الشيل بتاعك قبل sudo، فبيبقى رقمك انت.
• [[vers=3.0]] نسخة SMB. من غيرها بيتفاوض على الأعلى (عندي طلعت 3.1.1). و [[vers=1.0]] اترفض في الـ kernel الحديث، ولو جهاز قديم جدًا محتاجها الأحسن تحدّثه.

ثابت بعد الريستارت: الباسورد في ملف credentials مش في [[/etc/fstab]] (لأن fstab أي يوزر يقراه): ملف فيه [[username=]] و [[password=]] بـ [[chmod 600]]. وسطر fstab فيه [[_netdev]] (ده محتاج شبكة، استنى لما تقوم)، و [[nofail]] (لو الجهاز التاني مقفول، كمّل الـ boot عادي)، و [[mount -a]] يجرّب السطر قبل الريستارت (شوف درس «lsblk / mount» في تاب «VPS»).

من ناحية ويندوز: على الفولدر Properties ← Sharing ← Share. واليوزر هو يوزر ويندوز؛ ولو داخل بحساب مايكروسوفت، غالبًا الإيميل وباسورده (مش الـ PIN). والشبكة لازم متعرّفة Private مش Public عشان File and Printer Sharing (بورت 445) يبقى مفتوح في الفايروول. والأخطاء: [[NT_STATUS_LOGON_FAILURE]] يوزر أو باسورد غلط، و [[NT_STATUS_BAD_NETWORK_NAME]] اسم الفولدر غلط، و [[mount error(13): Permission denied]] نفس الأولى من mount، و [[mount error(22): Invalid argument]] غالبًا [[vers]] مش مدعوم (و [[sudo dmesg | tail]] بيقول السبب).`,
          example: R`sudo apt install smbclient cifs-utils
smbclient -L //192.168.1.20 -U ali
smbclient //192.168.1.20/Docs -U ali
sudo mkdir -p /mnt/docs
sudo mount -t cifs //192.168.1.20/Docs /mnt/docs -o username=ali,uid=$(id -u),gid=$(id -g),vers=3.0
df -hT /mnt/docs
sudo umount /mnt/docs`,
          try: R`شيّر فولدر من جهاز ويندوز في البيت (أو استخدم NAS). اعرض الفولدرات بـ [[-L]]، وادخل نزّل ملف وارفع ملف بـ smbclient. وبعدين ركّبه على [[/mnt/docs]] واعمل ملف جواه من لينكس وشوفه ظهر على ويندوز. وفي الآخر خليه ثابت بالـ credentials و fstab.`,
          mac: ["diff", R`على الماك Finder: Cmd+K واكتب [[smb://192.168.1.20/Docs]]. ومن الترمنال: [[smbutil view //ali@192.168.1.20]] الفولدرات المشتركة، و [[mkdir ~/docs && mount_smbfs //ali@192.168.1.20/Docs ~/docs]] يركّب من غير sudo.`],
          deep: {
            why: R`ملفات على جهاز ويندوز أو NAS في البيت أو المكتب ومحتاجها على لينكس: باك أب بيتكتب على الـ NAS، أو سكربت بيعالج ملفات على فولدر مشترك، أو بس تنقل ملفات من غير فلاشة. ومن الترمنال بالذات على سيرفر من غير واجهة.`,
            how: R`SMB بروتوكول على بورت 445 TCP: العميل يتصل، ويتفاوض على النسخة (SMB 2 أو 3)، ويسجّل دخول بيوزر وباسورد (NTLM غالبًا)، ويفتح «share». و smbclient برنامج عادي بيعمل ده بنفسه (مكتبة Samba). أما [[mount -t cifs]] فالـ kernel نفسه هو اللي بيكلّم السيرفر، و [[mount.cifs]] بس بيجهّز الإعدادات ويدّيها للـ kernel.

ولأن الملفات على ويندوز ملهاش UID و GID لينكس، الـ kernel بيعرضها كلها بصاحب واحد: اللي في [[uid=]] (من غيره root)، وصلاحيات واحدة ([[file_mode]] و [[dir_mode]]، والافتراضي 0755). عشان كده الصلاحيات الحقيقية بيحددها ويندوز، مش [[chmod]].`,
            when: R`نقل ملفات بين ويندوز ولينكس على نفس الشبكة. باك أب من سيرفر البيت على NAS: mount ثابت في fstab وسكربت [[rsync]]. سكربت بياخد ملفات من فولدر مشترك في الشغل (بإذن). و smbclient لو محتاج ملف واحد ومش عايز تركّب حاجة.`,
            mistakes: R`الباسورد في fstab نفسه أو في الـ history ([[password=]] في الأمر). ونسيان [[uid]] فتلاقي الملفات ملك root. ونسيان [[nofail]] و [[_netdev]] فالجهاز يعلّق في الـ boot لو الويندوز مقفول. وشبكة ويندوز Public فالفايروول قافل 445. و [[vers=1.0]] من شرح قديم.`
          },
          teach: R`## [[smbclient]] بيدخل الفولدر المشترك زي FTP، و [[mount -t cifs]] بيخليه فولدر عادي عندك

بدل جهاز ويندوز، عملت سيرفر Samba 4.19 على container أوبونتو 24.04 ([[192.168.77.10]]) فيه فولدر مشترك اسمه [[Docs]] ويوزر [[ali]]. والعميل container تاني على نفس شبكة Docker. فالعنوان عندي [[192.168.77.10]] بدل [[192.168.1.20]]. والـ mount اتعمل في container بـ [[--privileged]] (لأن mount محتاج صلاحيات على الـ kernel).

---

## ١. [[sudo apt install smbclient cifs-utils]]

[[smbclient]] للتصفح، و [[cifs-utils]] فيه [[mount.cifs]] اللي [[mount -t cifs]] بيشغّله.

## ٢. [[smbclient -L //192.168.77.10 -U ali]]

| الحتة | معناها |
|---|---|
| [[-L]] | list: اعرض الفولدرات المشتركة |
| [[//192.168.77.10]] | الجهاز. الشرطتين في الأول شكل عناوين SMB |
| [[-U ali]] | user، وهيسألك الباسورد |

~~~text الناتج
Password for [WORKGROUP\ali]:
	Sharename       Type      Comment
	---------       ----      -------
	print$          Disk      Printer Drivers
	Docs            Disk
	IPC$            IPC       IPC Service (server server (Samba, Ubuntu))
SMB1 disabled -- no workgroup available
~~~

| السطر | معناه |
|---|---|
| [[WORKGROUP\ali]] | اسم المجموعة (الافتراضي في ويندوز) والـ user |
| [[Docs Disk]] | الفولدر بتاعنا |
| [[print$]] و [[IPC$]] | مشاركات نظام، الـ [[$]] في الآخر يعني مخفية في ويندوز |
| [[SMB1 disabled]] | عادي، شرحه في الـ desc |

## ٣. [[smbclient //192.168.77.10/Docs -U ali]]

العنوان بقى [[//الجهاز/الفولدر]]. بعد الباسورد بيطبع [[Try "help" to get a list of possible commands.]] ويفتح prompt [[smb: \>]]. ونفّذت الأوامر دي جواه (بـ [[-c]] عشان تبقى في سطر):

~~~text smbclient //192.168.77.10/Docs -U ali -c "ls; cd reports; get q3.csv; put upload.txt; ls"
  .                                   D        0  Tue Oct  6 08:42:12 2026
  ..                                  D        0  Tue Oct  6 08:42:12 2026
  readme.txt                          N       15  Tue Oct  6 08:42:12 2026
  reports                             D        0  Tue Oct  6 08:42:12 2026

		1055762868 blocks of size 1024. 985678968 blocks available
getting file \reports\q3.csv of size 15 as q3.csv (7.3 KiloBytes/sec) (average 7.3 KiloBytes/sec)
putting file upload.txt as \reports\upload.txt (2.3 kb/s) (average 2.3 kb/s)
  upload.txt                          A        7  Tue Oct  6 08:42:58 2026
  q3.csv                              N       15  Tue Oct  6 08:42:12 2026
~~~

| في [[ls]] | معناه |
|---|---|
| [[D]] | directory: فولدر |
| [[N]] | normal: ملف عادي |
| [[A]] | archive: ملف اتغيّر (هنا اللي رفعته لسه) |
| الرقم | الحجم بالبايت |
| [[blocks available]] | المساحة الفاضية على الجهاز التاني |

و [[get]] نزّل الملف للفولدر اللي انا فيه، و [[put]] رفع. والـ [[\]] بدل [[/]] لأن SMB بيكتب المسارات بشكل ويندوز.

### الأخطاء

~~~text باسورد غلط
session setup failed: NT_STATUS_LOGON_FAILURE
~~~

~~~text فولدر مش موجود (//192.168.77.10/Nope)
tree connect failed: NT_STATUS_BAD_NETWORK_NAME
~~~

---

## ٤. [[sudo mkdir -p /mnt/docs]]

فولدر فاضي هيبقى «باب» للفولدر المشترك. [[-p]] متشتكيش لو موجود.

## ٥. [[sudo mount -t cifs //192.168.77.10/Docs /mnt/docs -o username=ali,uid=$(id -u),gid=$(id -g),vers=3.0]]

| الحتة | معناها |
|---|---|
| [[-t cifs]] | نوع الـ filesystem |
| [[//192.168.77.10/Docs]] | المصدر |
| [[/mnt/docs]] | فين يتركّب |
| [[-o]] | options مفصولة بفواصل من غير مسافات |
| [[username=ali]] | اليوزر، والباسورد هيتسأل |
| [[uid=$(id -u)]] | الملفات تبان ملك رقمك انت. [[$(id -u)]] بيتحسب قبل sudo، عند اليوزر سارة طلع [[1001]] |
| [[gid=$(id -g)]] | نفس الكلام للـ group |
| [[vers=3.0]] | نسخة SMB |

## ٦. [[df -hT /mnt/docs]]

[[-h]] بالجيجا، و [[-T]] (type) اكتب النوع:

~~~text الناتج
Filesystem           Type  Size  Used Avail Use% Mounted on
//192.168.77.10/Docs cifs 1007G   66G  941G   7% /mnt/docs
~~~

النوع [[cifs]]، والمساحة دي بتاعة الجهاز التاني مش جهازك. و [[ls -l /mnt/docs]]:

~~~text الناتج
-rwxr-xr-x 1 sara sara 15 Oct  6 08:42 readme.txt
drwxr-xr-x 2 sara sara  0 Oct  6 08:42 reports
~~~

الملفات ملك [[sara]] بسبب [[uid]] و [[gid]]، وسارة كتبت ملف جوه عادي. ومن غير [[uid]] و [[gid]] نفس الملفات بانت [[0 0]] (root)، و [[findmnt]] بيّن [[vers=3.1.1]] (اتفاوض على الأعلى) و [[file_mode=0755,dir_mode=0755]]. و [[vers=1.0]]:

~~~text الناتج
mount error(22): Invalid argument
~~~

و [[dmesg]] قال السبب: [[CIFS: VFS: vers=1.0 (cifs) mount not permitted when legacy dialects disabled]]. وباسورد غلط: [[mount error(13): Permission denied]].

## ٧. [[sudo umount /mnt/docs]]

[[umount]] (من غير n) فك التركيب، و [[/mnt/docs]] رجع فولدر فاضي.

---

## الحل: ثابت بعد الريستارت

- ملف [[/root/.smb-pc]] فيه [[username=]] و [[password=]]، و [[chmod 600]] خلاه [[-rw-------]]: root بس يقراه.
- سطر fstab: المصدر، والمكان، والنوع، والإعدادات ([[credentials=]] بدل الباسورد، و [[_netdev]] و [[nofail]])، و [[0 0]] (مفيش dump ولا fsck).
- [[sudo mount -a]] ركّب كل اللي في fstab، ورجع 0، و [[findmnt /mnt/docs]] بيّن [[cifs]].

| الأمر | بيعمل إيه |
|---|---|
| [[smbclient -L //جهاز -U يوزر]] | الفولدرات المشتركة |
| [[smbclient //جهاز/فولدر -U يوزر]] | ادخل: ls و get و put |
| [[mount -t cifs ... -o ...]] | ركّبه |
| [[umount]] | فكّه |

## على الماك

Finder ثم Cmd+K و [[smb://192.168.1.20/Docs]]، أو [[mount_smbfs]] من الترمنال (من الـ man page).

## الخلاصة

smbclient لملف أو اتنين، و mount لما تحتاج الفولدر كأنه عندك. ومتنساش [[uid]] و [[gid]]، والباسورد في ملف credentials مش في fstab.`,
          lines: [
            R`سطّب أداة التصفح وأداة الـ mount.`,
            R`اعرض الفولدرات المشتركة على الجهاز ده ([[-L]]) بيوزر ali.`,
            R`ادخل فولدر Docs بـ prompt زي FTP: ls و get و put و exit.`,
            R`اعمل فولدر تركّب عليه.`,
            R`ركّب Docs هنا، والملفات تبان ملكك انت، بـ SMB 3.0.`,
            R`اتأكد: النوع cifs والمساحة اللي على الجهاز التاني.`,
            R`فك التركيب.`
          ],
          sol: R`ناتج حقيقي: Samba 4.19 على container أوبونتو 24.04 اسمه nas (بدل ويندوز)، والعميل container تاني. [[smbclient -L //nas.local -U ali]]:
[[Sharename       Type      Comment]]
[[print$          Disk      Printer Drivers]]
[[Docs            Disk]]
[[IPC$            IPC       IPC Service (nas server (Samba, Ubuntu))]]
[[SMB1 disabled -- no workgroup available]]
وجوه Docs: [[ls]] طبع [[readme.txt N 15]] و [[reports D 0]]، و [[get q3.csv]] طبع [[getting file \reports\q3.csv of size 11 as q3.csv (10.7 KiloBytes/sec)]]، و [[put upload.txt]] طبع [[putting file upload.txt as \reports\upload.txt]]. وباسورد غلط: [[session setup failed: NT_STATUS_LOGON_FAILURE]]، و share مش موجود: [[tree connect failed: NT_STATUS_BAD_NETWORK_NAME]].

الـ mount (في container بـ [[--privileged]]): [[df -hT /mnt/docs]] طبع [[//nas.local/Docs cifs 1007G 66G 942G 7% /mnt/docs]]، و [[ls -l]] بيّن الملفات [[sara sara]] بسبب [[uid]] و [[gid]]، وسارة كتبت ملف جواه عادي. ومن غير uid الملفات بانت [[uid=0]]. و [[vers=1.0]]: [[mount error(22): Invalid argument]] و dmesg قال [[CIFS: VFS: vers=1.0 (cifs) mount not permitted when legacy dialects disabled]]. وسطر fstab اللي تحت اتجرّب بـ [[mount -a]] و [[findmnt]] بيّن [[vers=3.0]] و [[uid=1001]].`,
          solCode: R`sudo tee /root/.smb-pc >/dev/null <<'EOF'
username=ali
password=PASSWORD_HERE
EOF
sudo chmod 600 /root/.smb-pc
echo "//192.168.1.20/Docs /mnt/docs cifs credentials=/root/.smb-pc,uid=$(id -u),gid=$(id -g),vers=3.0,_netdev,nofail 0 0" | sudo tee -a /etc/fstab
sudo mount -a
findmnt /mnt/docs`
        },
        {
          cmd: "wakeonlan و ethtool",
          title: "شغّل جهاز مطفي من على الشبكة",
          desc: R`Wake-on-LAN بيخليك تشغّل جهاز مطفي (أو نايم) بإنك تبعتله packet مخصوص اسمه magic packet من أي جهاز على نفس الشبكة. مفيد لسيرفر في البيت أو جهاز المكتب: تصحّيه وتدخله بـ ssh من غير ما تقوم تدوس الزرار.

الـ magic packet: ٦ bytes [[FF]] وبعدهم الـ MAC بتاع الجهاز اللي عايز تصحّيه متكرر ١٦ مرة (102 byte)، وبيتبعت broadcast للشبكة كلها لأن الجهاز المطفي ملوش IP. وكارت الشبكة نفسه بيفضل صاحي على كهربا قليلة مستني الشكل ده.

الإرسال (من أي جهاز صاحي):
• [[wakeonlan AA:BB:CC:DD:EE:FF]] بيبعته UDP على بورت 9 للعنوان [[255.255.255.255]]، و [[-i 192.168.1.255]] على broadcast شبكتك بس (لو عندك أكتر من كارت أو الأول مش بيوصل).
• [[sudo etherwake -i eth0 AA:BB:CC:DD:EE:FF]] بيبعته Ethernet خام من غير IP، ومحتاج sudo و [[-i]] الكارت.
والـ MAC تجيبه من الجهاز نفسه وهو شغال ([[ip link]]) أو من [[arp-scan]] (درس «nmap -sn و arp-scan»).

الجهاز اللي هيصحى (لينكس):
1. الـ BIOS أو UEFI: اختيار بأسامي زي «Wake on LAN» أو «Power On By PCI-E» أو «Resume by LAN» لازم Enabled، وأحيانًا «ErP» لازم Disabled (لأنها بتقطع الكهربا عن الكارت وهو مطفي).
2. الكارت: [[sudo ethtool eth0 | grep Wake-on]] بيطبع سطرين: [[Supports Wake-on: pumbg]] (اللي الكارت يقدر عليه) و [[Wake-on: d]] (المفعّل دلوقتي، و [[d]] يعني disabled). و [[sudo ethtool -s eth0 wol g]] يفعّل [[g]]. والحروف من الـ man page: [[p]] أي نشاط على السلك، و [[u]] unicast، و [[m]] multicast، و [[b]] broadcast، و [[a]] ARP، و [[g]] magic packet، و [[d]] مقفول.
3. إعداد ethtool بيروح مع الريستارت، فثبّته: NetworkManager: [[nmcli con mod "Wired connection 1" 802-3-ethernet.wake-on-lan magic]]، أو netplan على السيرفر: [[wakeonlan: true]] تحت الكارت.
4. الواي فاي غالبًا مبيدعمش ده، فخلي الجهاز على سلك.

وبيشتغل جوه نفس الشبكة بس، لأن الراوتر مبيعدّيش broadcast من النت. من برّه البيت: ادخل الشبكة بـ VPN (زي WireGuard) وابعت من جهاز صاحي جوه، أو من تطبيق الراوتر لو بيدعمها.`,
          example: R`sudo apt install wakeonlan etherwake ethtool
# على الجهاز اللي هيصحى (وهو شغال):
ip link show eth0
sudo ethtool eth0 | grep Wake-on
sudo ethtool -s eth0 wol g
sudo nmcli con mod "Wired connection 1" 802-3-ethernet.wake-on-lan magic
# من أي جهاز تاني على الشبكة، بعد ما تطفيه:
wakeonlan AA:BB:CC:DD:EE:FF
wakeonlan -i 192.168.1.255 AA:BB:CC:DD:EE:FF
sudo etherwake -i eth0 AA:BB:CC:DD:EE:FF`,
          try: R`لو عندك جهاز ديسكتوب على سلك: فعّل WoL في الـ BIOS وبـ ethtool، واكتب الـ MAC، واطفيه، وصحّيه من اللابتوب. ولو مفيش، شغّل [[sudo tcpdump -i any -n udp port 9 -X]] في ترمنال وابعت magic packet من ترمنال تاني وعِد الـ FF والـ MAC.`,
          mac: ["diff", R`الإرسال: [[brew install wakeonlan]] ونفس الأمر. وعشان الماك نفسه يصحى: System Settings ← Energy (أو Battery ← Options) ← «Wake for network access»، أو [[sudo pmset -a womp 1]].`],
          deep: {
            why: R`سيرفر في البيت (NAS، جهاز ألعاب بتعمله stream، جهاز builds) مش لازم يفضل شغال ٢٤ ساعة ياكل كهربا. WoL بيخليه يطفي ويصحى لما تحتاجه، حتى من الموبايل جوه البيت أو من بره بـ VPN.`,
            how: R`لما الجهاز يطفي وفيه WoL مفعّل، الماذربورد بتسيب كهربا قليلة للكارت، والكارت بيبص على كل packet داخلة من غير ما يحتاج نظام تشغيل. أول ما يلاقي الشكل (FF ستة مرات وبعده الـ MAC بتاعه ١٦ مرة) في أي مكان في الـ packet، يبعت إشارة للماذربورد تشغّل الجهاز.

عشان كده بورت 9 أو أي بورت مش فارق، ومش لازم IP صح: المهم الـ packet توصل لسلك الكارت ده، و broadcast بيضمن ده جوه الشبكة. و [[ethtool -s wol g]] بيقول للـ driver يسيب الكارت في الوضع ده وهو بيطفي.`,
            when: R`جهاز في البيت بتدخله بـ ssh أو Remote Desktop أحيانًا. NAS بيصحى قبل الباك أب بسكربت cron على جهاز تاني صاحي (Raspberry Pi مثلًا). ومعمل فيه أجهزة كتير بتصحّيهم كلهم بـ [[wakeonlan -f macs.txt]].`,
            mistakes: R`تفعّله بـ ethtool وتنسى تثبّته، فيشتغل مرة ويقف بعد الريستارت. ونسيان إعداد الـ BIOS أو ErP. ومحاولة WoL على الواي فاي. وتبعته من شبكة تانية أو من النت مباشرة. وتكتب MAC كارت تاني (الواي فاي بدل السلك).`
          },
          teach: R`## magic packet = ٦ بايت FF وبعدهم الـ MAC ١٦ مرة، والكارت المطفي بيصحى لما يشوفها

اتشغّل على شبكة Docker: اللابتوب ([[192.168.77.5]]) بعت لـ MAC السيرفر ([[46:19:83:25:8b:05]])، و container تالت بيسمع بـ tcpdump. السيرفر container مش جهاز حقيقي فمش هيصحى فعلًا، بس نقدر نشوف الـ packet نفسها. والـ MAC [[AA:BB:CC:DD:EE:FF]] في المثال مكان الـ MAC بتاعك.

---

## ١. [[sudo apt install wakeonlan etherwake ethtool]]

[[wakeonlan]] و [[etherwake]] برنامجين بيبعتوا، و [[ethtool]] بيظبط الكارت.

## ٢. [[ip link show eth0]] (على الجهاز اللي هيصحى)

~~~text الناتج
2: eth0@if51: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP mode DEFAULT group default
    link/ether 46:19:83:25:8b:05 brd ff:ff:ff:ff:ff:ff link-netnsid 0
~~~

الـ MAC بعد [[link/ether]]: [[46:19:83:25:8b:05]]. اكتبه. و [[brd ff:ff:ff:ff:ff:ff]] ده عنوان الـ broadcast: «لكل الأجهزة».

## ٣. [[sudo ethtool eth0 | grep Wake-on]]

[[ethtool eth0]] بيطبع مواصفات الكارت. على كارت الـ container (اسمه veth، كارت وهمي):

~~~text ethtool eth0 (جزء)
	Speed: 10000Mb/s
	Duplex: Full
	Port: Twisted Pair
	Link detected: yes
~~~

ومفيش سطور [[Wake-on]] خالص، لأن الكارت الوهمي ملوش كهربا يصحى بيها. على كارت حقيقي هتلاقي سطرين (من [[man ethtool]]):

~~~text على كارت حقيقي (من الـ docs)
	Supports Wake-on: pumbg
	Wake-on: d
~~~

| الحرف | يصحى على |
|---|---|
| [[p]] | أي نشاط على السلك |
| [[u]] | unicast: packet ليه هو |
| [[m]] | multicast |
| [[b]] | broadcast |
| [[a]] | ARP |
| [[g]] | magic packet، ده اللي عايزينه |
| [[d]] | disabled: مقفول |

## ٤. [[sudo ethtool -s eth0 wol g]]

[[-s]] (set) غيّر، و [[wol g]] خلي الـ Wake-on يبقى [[g]]. على الكارت الوهمي:

~~~text الناتج
netlink error: Operation not supported
~~~

على كارت بيدعمها مبيطبعش حاجة، و [[ethtool eth0 | grep Wake-on]] يبقى [[Wake-on: g]] لحد الريستارت.

## ٥. [[sudo nmcli con mod "Wired connection 1" 802-3-ethernet.wake-on-lan magic]]

[[802-3-ethernet]] اسم إعدادات السلك في NetworkManager (802.3 رقم معيار الـ Ethernet). جربته على NetworkManager جوه container:

~~~text nmcli -g 802-3-ethernet.wake-on-lan con show "Wired connection 1"
default
~~~

وبعد الأمر:

~~~text الناتج
magic
~~~

واتكتب في ملف netplan بتاع الـ connection سطر [[wakeonlan: true]]. ده اللي بيخليه يفضل بعد الريستارت.

---

## ٦. [[wakeonlan AA:BB:CC:DD:EE:FF]] (من جهاز تاني)

~~~text wakeonlan 46:19:83:25:8b:05
Sending magic packet to 255.255.255.255:9 with 46:19:83:25:8b:05
~~~

[[255.255.255.255]] = broadcast لكل الشبكة، و [[:9]] بورت 9 UDP. والـ tcpdump على الجهاز التالت مسكها:

~~~text tcpdump -i any -n -X udp port 9
IP 192.168.77.5.37055 > 255.255.255.255.9: UDP, length 102
	0x0010:  ffff ffff 90bf 0009 006e 0e2d ffff ffff  .........n.-....
	0x0020:  ffff 4619 8325 8b05 4619 8325 8b05 4619  ..F..%..F..%..F.
	0x0030:  8325 8b05 4619 8325 8b05 4619 8325 8b05  .%..F..%..F..%..
	...
~~~

[[-X]] بيطبع البايتات hex. ابدأ من [[ffff ffff ffff]] (آخر سطر [[0x0010]] وأول [[0x0020]]): ده الـ ٦ بايت FF. وبعدها [[4619 8325 8b05]] = [[46:19:83:25:8b:05]] متكرر. و [[length 102]] = 6 + (6 × 16) = 102 بايت.

## ٧. [[wakeonlan -i 192.168.1.255 AA:BB:CC:DD:EE:FF]]

[[-i]] (IP) ابعت لعنوان broadcast شبكتك بدل [[255.255.255.255]]. عندي [[192.168.77.255]]:

~~~text الناتج
Sending magic packet to 192.168.77.255:9 with 46:19:83:25:8b:05
~~~

و tcpdump مسكها برضه [[> 192.168.77.255.9: UDP, length 102]].

## ٨. [[sudo etherwake -i eth0 AA:BB:CC:DD:EE:FF]]

نفس الـ magic packet بس كـ Ethernet خام من غير IP خالص، فلازم [[-i eth0]] تقوله يطلع من أنهي كارت. مطبعش حاجة ورجع 0.

| الأمر | بيبعت إزاي | محتاج |
|---|---|---|
| [[wakeonlan MAC]] | UDP لـ 255.255.255.255:9 | ولا حاجة |
| [[wakeonlan -i broadcast MAC]] | UDP لـ broadcast شبكتك | |
| [[etherwake -i كارت MAC]] | Ethernet خام | sudo |

## على الماك

[[brew install wakeonlan]] للإرسال بنفس الأمر. وعشان الماك نفسه يصحى: «Wake for network access» في الإعدادات أو [[sudo pmset -a womp 1]] (من دليل Apple).

## الخلاصة

على الجهاز اللي هيصحى: BIOS، و [[ethtool -s eth0 wol g]]، وتثبيت في nmcli أو netplan. ومن أي جهاز صاحي على نفس الشبكة: [[wakeonlan MAC]].`,
          lines: [
            R`سطّب أدوات الإرسال وأداة إعداد الكارت.`,
            R`اكتب الـ MAC بتاع الكارت (بعد [[link/ether]]).`,
            R`الكارت بيدعم إيه ([[Supports Wake-on]]) والمفعّل دلوقتي ([[Wake-on]]).`,
            R`فعّل الصحيان بالـ magic packet ([[g]]) لحد الريستارت.`,
            R`ثبّته في NetworkManager عشان يفضل بعد الريستارت.`,
            R`ابعت magic packet لكل الشبكة (255.255.255.255:9).`,
            R`نفس الكلام على broadcast شبكتك بس.`,
            R`ابعته Ethernet خام من كارت eth0 (محتاج sudo).`
          ],
          sol: R`ناتج حقيقي من containers على شبكة Docker. [[wakeonlan 6e:db:2b:c1:d3:88]] طبع [[Sending magic packet to 255.255.255.255:9 with 6e:db:2b:c1:d3:88]]، و [[-i 172.30.0.255]] طبع [[Sending magic packet to 172.30.0.255:9 with ...]]، و tcpdump مسكه: [[IP 172.30.0.5.33534 > 255.255.255.255.9: UDP, length 102]] وفي البايتات [[ffff ffff ffff]] وبعدها [[6edb 2bc1 d388]] متكررة.

أما ethtool فكارت الـ container (veth، مش كارت حقيقي): [[ethtool eth0]] طبع [[Speed: 10000Mb/s]] و [[Link detected: yes]] ومفيش سطور Wake-on، و [[ethtool -s eth0 wol g]] رد [[netlink error: Operation not supported]]. على كارت حقيقي هتلاقي [[Supports Wake-on: pumbg]] و [[Wake-on: d]]، وبعد [[wol g]] يبقى [[Wake-on: g]] (الحروف من [[man ethtool]]). و [[nmcli -g 802-3-ethernet.wake-on-lan con show "Wired connection 1"]] كان [[default]] وبعد الأمر بقى [[magic]]، ودي اتكتبت في ملف netplan بتاع الـ connection.`
        }
      ]
    }
]);
