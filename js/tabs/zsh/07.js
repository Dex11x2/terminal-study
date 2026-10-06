// تكملة تاب zsh: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/zsh/01.js (شرح حقول الدرس في أوله)
MORE("zsh", [
    {
      t: "إدارة الماك: الشبكة والديسكات والصيانة",
      l: 2,
      n: "الواي فاي والـ DNS والأجهزة اللي حواليك، والدخول على الماك من بعيد، والفلاشات والتحديثات والباك أب والبطارية",
      items: [
        {
          cmd: "networksetup",
          title: "إعدادات الشبكة والواي فاي من الترمنال",
          desc: R`[[networksetup]] بيعمل من الترمنال اللي بتعمله في System Settings ثم Network: يعرض الـ IP والـ DNS، ويغيّر الـ DNS، ويحط IP ثابت ويرجّعه تلقائي، ويقفل ويفتح الواي فاي. أوامر التغيير محتاجة يوزر أدمن، وأحيانًا root، فالأضمن تكتب قبلها [[sudo]]. قفل وفتح الواي فاي بيشتغل غالبًا من غيرها لو انت أدمن.

الأمر بيتعامل مع حاجتين بأسامي مختلفة:
• network service: الاسم اللي في الإعدادات زي [[Wi-Fi]] و [[Ethernet]] و [[Thunderbolt Bridge]]. [[-listallnetworkservices]] بتطبعهم، والنجمة [[*]] جنب اسم معناها إنه متقفل. أوامر [[-getinfo]] و [[-setdnsservers]] و [[-setmanual]] بتاخد الاسم ده، ولو فيه مسافة حطه بين علامات تنصيص.
• hardware port: الكارت نفسه. [[-listallhardwareports]] بتطبع كل port وتحته [[Device]] زي [[en0]] (درس «ifconfig / route»). أوامر الواي فاي بتاخد [[en0]]، واسمها فيه airport من أيام ما الواي فاي في أجهزة Apple كان اسمه AirPort.

الأوامر:
• [[-getinfo Wi-Fi]] الـ IP والـ subnet mask والراوتر، وأول سطر بيقول DHCP (تلقائي) ولا Manual.
• [[-getdnsservers Wi-Fi]] الـ DNS اللي انت حاطه بإيدك. لو قالك [[There aren't any DNS Servers set on Wi-Fi.]] يبقى الماك بياخد الـ DNS من الراوتر.
• [[-setdnsservers Wi-Fi 1.1.1.1 8.8.8.8]] DNS بإيدك (Cloudflare، و Google احتياطي)، وكلمة [[empty]] مكان العناوين بترجّعه للي جاي من الراوتر. و [[scutil --dns]] بيطبع الـ DNS اللي النظام بيستخدمه فعلًا، و [[grep nameserver]] بيسيب سطور العناوين بس.
• [[-setmanual Wi-Fi 192.168.1.50 255.255.255.0 192.168.1.1]] IP ثابت: العنوان، وبعده الـ subnet mask، وبعده الراوتر. مع IP ثابت الماك مبيبقاش واخد DNS من الراوتر، فحط DNS بإيدك معاه. و [[-setdhcp Wi-Fi]] بترجّع كله تلقائي.
• [[-setairportpower en0 off]] تقفل الواي فاي و [[on]] تفتحه، وده أسرع حل لما الواي فاي يعلق.
• [[-listpreferredwirelessnetworks en0]] الشبكات اللي الماك فاكرها وبيتصل بيها لوحده.
• [[-setairportnetwork en0 "Home WiFi"]] اتصل بشبكة. لو اتصلت بيها قبل كده، الماك فاكر باسوردها في Keychain ومش محتاج تكتبه. ولو كتبت الباسورد بعد الاسم، هيتسجل في [[~/.zsh_history]] وأي حد على الجهاز يقدر يشوفه في [[ps]] وهو شغال، فالأأمن تتصل أول مرة من قايمة الواي فاي.

قوة الإشارة والخصوصية: من macOS Sonoma 14.4 أداة [[airport]] القديمة (اللي كانت بتعرض الإشارة وتعمل scan) اتشالت وبقت بتطبع إنها deprecated، و Apple بتقول استخدم [[wdutil]]. [[sudo wdutil info]] بيطبع [[RSSI]] (قوة الإشارة بالـ dBm، وكل ما تقرب من 0 أحسن: حوالي -50 ممتازة و -80 ضعيفة)، و [[Noise]]، والقناة، و [[Tx Rate]] (سرعة الاتصال بالراوتر). ومن macOS Sequoia (15) اسم الشبكة (SSID) بقى معلومة خصوصية: [[-getairportnetwork en0]] ممكن يقولك [[You are not associated with an AirPort network.]] وانت متصل، و wdutil بيكتب [[<redacted>]] مكان الاسم.`,
          example: R`networksetup -listallnetworkservices
networksetup -listallhardwareports
networksetup -getinfo Wi-Fi
networksetup -getdnsservers Wi-Fi
sudo networksetup -setdnsservers Wi-Fi 1.1.1.1 8.8.8.8
scutil --dns | grep nameserver
sudo networksetup -setdnsservers Wi-Fi empty
sudo networksetup -setmanual Wi-Fi 192.168.1.50 255.255.255.0 192.168.1.1
sudo networksetup -setdhcp Wi-Fi
networksetup -setairportpower en0 off
networksetup -setairportpower en0 on
networksetup -listpreferredwirelessnetworks en0
networksetup -setairportnetwork en0 "Home WiFi"
sudo wdutil info`,
          try: R`اعرف اسم كارت الواي فاي، والـ IP، والـ DNS الحالي. حط DNS بتاع Cloudflare، واتأكد منه بـ [[scutil --dns]] وبـ [[dig example.com]] (سطر SERVER)، وبعدين رجّعه [[empty]].`,
          deep: {
            why: R`بتغيّر الـ DNS لما بتاع مزود النت بطيء أو بيحجب مواقع، وتحط IP ثابت لماك شغال سيرفر صغير في البيت، وتعمل ده في سكربت أو على ماك داخل عليه بـ ssh. وأسرع من إنك تدوّر في الإعدادات كل مرة.`,
            how: R`networksetup بيكتب في نفس إعدادات الشبكة اللي System Settings بتعرضها، فالتغيير بيبان هناك وبيفضل بعد restart. [[scutil --dns]] بيقرا الإعداد اللي اتطبق فعلًا، ولو VPN شغال ممكن تلاقي resolvers تانية قبل بتاعك. [[-createlocation]] و [[-switchtolocation]] بيحفظوا مجموعة إعدادات باسم (البيت والشغل) وتبدّل بينهم. و [[networksetup -help]] بيطبع كل الأوامر. المقابل في لينكس [[nmcli]] و [[resolvectl]] (دروس «nmcli» و «resolvectl» في تاب «bash»).`,
            when: R`DNS بطيء أو محجوب، IP ثابت لجهاز في البيت، واي فاي معلّق محتاج off و on، أو سكربت بيجهّز ماك جديد.`,
            mistakes: R`تكتب [[en0]] في أوامر الـ service ([[-getinfo en0]]) أو [[Wi-Fi]] في أوامر الواي فاي: الأولى بتاخد اسم الـ service والتانية اسم الكارت، والغلط بيطلع رسالة زي [[en0 is not a recognized network service.]]. تحط IP ثابت من غير DNS فالمواقع متفتحش رغم إن النت شغال. تختار IP ثابت جوه الرينج اللي الراوتر بيوزّعه فيتعارض مع جهاز تاني. وتقفل الواي فاي على ماك داخل عليه بـ ssh من نفس الواي فاي، فتقطع الفرع اللي قاعد عليه.`
          },
          teach: R`## الفكرة

١٤ سطر بس بيتقسموا ٥ مجموعات: اعرف الأسامي، اقرا الإعدادات، غيّر الـ DNS ورجّعه، حط IP ثابت ورجّعه، واتحكم في الواي فاي. [[networksetup]] و [[scutil]] و [[wdutil]] ماك بس، فالشرح وشكل الناتج من [[man networksetup]] و [[man wdutil]] (مفيش ماك هنا)، والأرقام مثال. الحتت العامة (الـ pipe والـ grep) جرّبتها في zsh على أوبونتو 24.04 جوه Docker.

---

## المجموعة ١: الأسامي

### [[networksetup -listallnetworkservices]]

network service = الاسم اللي في System Settings ثم Network.

~~~text شكل الناتج (من الـ docs)
An asterisk (*) denotes that a network service is disabled.
Wi-Fi
Thunderbolt Bridge
*Ethernet
~~~

أول سطر بيقولك إن [[*]] جنب اسم معناها إنه متقفل. والأسامي دي (زي [[Wi-Fi]]) هي اللي هتكتبها في أوامر المجموعات ٢ و ٣ و ٤.

### [[networksetup -listallhardwareports]]

الكروت نفسها، وتحت كل واحد [[Device: en0]] (درس «ifconfig / route»). الاسم ده هو اللي هتكتبه في أوامر الواي فاي (المجموعة ٥).

> أشهر غلطة في الدرس: أوامر الـ service بتاخد [[Wi-Fi]]، وأوامر الواي فاي بتاخد [[en0]].

---

## المجموعة ٢: اقرا الإعدادات

### [[networksetup -getinfo Wi-Fi]]

~~~text شكل الناتج (من الـ docs)
DHCP Configuration
IP address: 192.168.1.15
Subnet mask: 255.255.255.0
Router: 192.168.1.1
~~~

- [[DHCP Configuration]]: الـ IP جاي تلقائي من الراوتر (DHCP = Dynamic Host Configuration Protocol). لو [[Manual Configuration]] يبقى انت حاطه بإيدك.
- [[Subnet mask]] أنهي جزء من العنوان هو الشبكة (درس «ifconfig / route»).
- [[Router]] الـ gateway.

### [[networksetup -getdnsservers Wi-Fi]]

الـ DNS اللي **انت** حاطه بإيدك. لو مفيش، بيقول [[There aren't any DNS Servers set on Wi-Fi.]]، يعني الماك بياخد الـ DNS من الراوتر.

---

## المجموعة ٣: الـ DNS

### [[sudo networksetup -setdnsservers Wi-Fi 1.1.1.1 8.8.8.8]]

- [[-setdnsservers]] حط DNS بإيدك، وبعده اسم الـ service.
- [[1.1.1.1]] بتاع Cloudflare، و [[8.8.8.8]] بتاع Google احتياطي لو الأول مردّش. الترتيب بيفرق.
- [[sudo]] لأنه بيغيّر إعدادات النظام. مش بيطبع حاجة لو نجح.

### [[scutil --dns | grep nameserver]]

- [[scutil]] = system configuration utility، و [[--dns]] اطبع إعداد الـ DNS اللي النظام **بيستخدمه فعلًا** (مش اللي متكتب في الإعدادات بس). الناتج طويل.
- [[| grep nameserver]] سيب سطور العناوين بس.

~~~text شكل الناتج (من الـ docs)
  nameserver[0] : 1.1.1.1
  nameserver[1] : 8.8.8.8
~~~

الرقم بين الأقواس المربعة ترتيبه: 0 الأول و 1 الاحتياطي. والمقابل في لينكس ملف [[/etc/resolv.conf]]، جرّبته في الـ container:

~~~zsh
grep nameserver /etc/resolv.conf
~~~

~~~text الناتج (أوبونتو جوه Docker)
nameserver 192.168.65.7
~~~

ده الـ DNS اللي Docker Desktop مديه للـ container.

### [[sudo networksetup -setdnsservers Wi-Fi empty]]

كلمة [[empty]] مكان العناوين = امسح اللي حطيته وارجع للي جاي من الراوتر.

---

## المجموعة ٤: IP ثابت

### [[sudo networksetup -setmanual Wi-Fi 192.168.1.50 255.255.255.0 192.168.1.1]]

بعد اسم الـ service ٣ أرقام بالترتيب:

| الترتيب | القيمة | معناها |
|---|---|---|
| ١ | [[192.168.1.50]] | العنوان اللي عايزه |
| ٢ | [[255.255.255.0]] | الـ subnet mask |
| ٣ | [[192.168.1.1]] | الراوتر |

اختار عنوان **برّه** الرينج اللي الراوتر بيوزّعه، وإلا جهاز تاني ممكن ياخده. ومع IP ثابت حط DNS بإيدك (المجموعة ٣).

### [[sudo networksetup -setdhcp Wi-Fi]]

رجّع كله تلقائي من الراوتر.

---

## المجموعة ٥: الواي فاي (بتاخد [[en0]])

| الأمر | بيعمل |
|---|---|
| [[-setairportpower en0 off]] | اقفل الواي فاي |
| [[-setairportpower en0 on]] | افتحه (أسرع حل لما يعلق) |
| [[-listpreferredwirelessnetworks en0]] | الشبكات اللي الماك فاكرها |
| [[-setairportnetwork en0 "Home WiFi"]] | اتصل بشبكة، والاسم بين علامات تنصيص عشان المسافة |

كلمة airport في الأسامي من أيام ما الواي فاي في أجهزة Apple كان اسمه AirPort.

### [[sudo wdutil info]]

[[wdutil]] = wireless diagnostics utility، و [[info]] اطبع حالة الواي فاي. الأهم فيه:

| الحقل | معناه |
|---|---|
| [[RSSI]] | قوة الإشارة بالـ dBm (رقم سالب: [[-50]] ممتازة، [[-80]] ضعيفة) |
| [[Noise]] | الدوشة في نفس القناة |
| [[Channel]] | القناة |
| [[Tx Rate]] | سرعة الاتصال بالراوتر |

ليه dBm سالبة؟ لأنها نسبة للـ 1 ملّي وات، والإشارة اللي بتوصلك أضعف من كده بكتير، فكل ما الرقم يقرب من 0 الإشارة أقوى.

---

## ملخص

| المجموعة | بتاخد | أهم أمر |
|---|---|---|
| الأسامي | لا حاجة | [[-listallnetworkservices]] و [[-listallhardwareports]] |
| القراية | [[Wi-Fi]] | [[-getinfo]] و [[-getdnsservers]] |
| الـ DNS | [[Wi-Fi]] | [[-setdnsservers ... / empty]] |
| IP ثابت | [[Wi-Fi]] | [[-setmanual]] و [[-setdhcp]] |
| الواي فاي | [[en0]] | [[-setairportpower]] و [[wdutil info]] |

## على الأنظمة التانية

| | الماك | لينكس | ويندوز (PowerShell) |
|---|---|---|---|
| الإعدادات | [[networksetup -getinfo Wi-Fi]] | [[nmcli device show]] | [[Get-NetIPConfiguration]] |
| DNS بإيدك | [[-setdnsservers]] | [[nmcli con mod ... ipv4.dns]] | [[Set-DnsClientServerAddress]] |
| الـ DNS الفعلي | [[scutil --dns]] | [[resolvectl status]] | [[Get-DnsClientServerAddress]] |

---

## الخلاصة

~~~text
service (Wi-Fi)  للـ IP والـ DNS     hardware port (en0)  للواي فاي نفسه
-setdnsservers ... empty             ارجع لـ DNS الراوتر
-setmanual IP MASK ROUTER            IP ثابت، وحط DNS معاه
scutil --dns                         اللي النظام بيستخدمه فعلًا
wdutil info                          RSSI: أقرب لـ 0 = إشارة أقوى
~~~`,
          lines: [
            R`أسامي الـ services: Wi-Fi و Ethernet وغيرهم.`,
            R`كل كارت واسمه (Device): عشان تعرف الواي فاي en0 ولا en1.`,
            R`الـ IP والـ subnet mask والراوتر بتوع الواي فاي.`,
            R`الـ DNS اللي انت حاطه بإيدك (أو رسالة إن مفيش).`,
            R`حط DNS بإيدك: Cloudflare وبعده Google.`,
            R`الـ DNS اللي النظام بيستخدمه فعلًا.`,
            R`رجّع الـ DNS للي جاي من الراوتر.`,
            R`IP ثابت: العنوان والـ mask والراوتر. حط DNS معاه.`,
            R`رجّع كله تلقائي من الراوتر.`,
            R`اقفل الواي فاي.`,
            R`افتحه تاني.`,
            R`الشبكات اللي الماك فاكرها.`,
            R`اتصل بشبكة الماك فاكر باسوردها.`,
            R`قوة الإشارة والـ Noise والقناة والسرعة (بديل airport).`
          ],
          sol: R`ده ماك بس، مجربتوش هنا. المكتوب من [[man networksetup]] و [[man wdutil]]، ومن Apple Community و Apple Developer Forums عن تغييرات Sonoma 14.4 و Sequoia. [[networksetup -listallhardwareports]] بيطبع لكل كارت [[Hardware Port: Wi-Fi]] وتحته [[Device: en0]] و [[Ethernet Address:]]. [[networksetup -getinfo Wi-Fi]] أوله [[DHCP Configuration]] وبعده [[IP address: 192.168.1.15]] و [[Subnet mask: 255.255.255.0]] و [[Router: 192.168.1.1]].

[[-getdnsservers Wi-Fi]] أول مرة غالبًا [[There aren't any DNS Servers set on Wi-Fi.]]. بعد [[sudo networksetup -setdnsservers Wi-Fi 1.1.1.1]] (مش بيطبع حاجة)، [[scutil --dns | grep nameserver]] بيطبع [[nameserver[0] : 1.1.1.1]]، و [[dig example.com | grep SERVER]] بيطبع [[;; SERVER: 1.1.1.1#53(1.1.1.1)]]. بعد [[empty]]، [[-getdnsservers]] بيرجع للرسالة الأولى، و scutil بيرجع يطبع IP الراوتر.

لو قالك [[Wi-Fi is not a recognized network service.]] يبقى الاسم عندك مختلف، شوفه من [[-listallnetworkservices]] واكتبه بالظبط.`,
          solCode: R`networksetup -listallhardwareports
networksetup -getinfo Wi-Fi
networksetup -getdnsservers Wi-Fi
sudo networksetup -setdnsservers Wi-Fi 1.1.1.1
scutil --dns | grep nameserver
dig example.com | grep SERVER
sudo networksetup -setdnsservers Wi-Fi empty
networksetup -getdnsservers Wi-Fi`
        },
        {
          cmd: "dns-sd و arp -a",
          title: "مين معاك على الشبكة (بأدوات الماك)",
          desc: R`عايز تعرف الأجهزة اللي معاك على شبكة البيت: الطابعة، أو Raspberry Pi جديد، أو ماك تاني فاتح SSH. الماك جاي معاه أداتين: [[arp -a]] بيعرض الأجهزة اللي جهازك كلّمها قريب، و [[dns-sd]] بيسأل الأجهزة اللي بتعلن عن نفسها بـ Bonjour. استخدمهم على شبكتك انت بس، أو بإذن صاحب الشبكة.

[[arp -a]]: ARP هو اللي بيحوّل IP لعنوان MAC (رقم الكارت الفعلي) جوه الشبكة المحلية، والماك بيحتفظ بجدول للعناوين اللي اتكلم معاها. [[-a]] اطبع الجدول كله، وكل سطر شكله [[? (192.168.1.1) at 1c:2b:3c:4d:5e:6f on en0]]: [[?]] مكان الاسم معناها إن مفيش اسم معروف للعنوان ده. [[-n]] بتمنعه يدوّر على أسامي فيبقى أسرع، و [[-i en0]] بتحصره على كارت واحد. الجدول فيه بس الأجهزة اللي جهازك كلّمها في آخر كام دقيقة، مش كل الشبكة.

[[dns-sd]]: Bonjour (اسمه التقني mDNS و DNS-SD) هو اللي بيخلي الطابعات وأجهزة Apple يظهروا لوحدهم من غير ما تكتب IP: كل جهاز بيعلن على الشبكة «أنا اسمي كذا وعندي خدمة كذا». [[-B]] (browse) دوّر على نوع خدمة، والنوع بشكل [[_اسم._tcp]]:
• [[_services._dns-sd._udp]] نوع خاص معناه «اطبع أنواع الخدمات الموجودة»، فتعرف تدوّر على إيه بعدها.
• [[_ssh._tcp]] أجهزة فاتحة SSH (زي ماك عليه Remote Login)، و [[_smb._tcp]] مشاركة ملفات، و [[_ipp._tcp]] طابعات، و [[_airplay._tcp]] أجهزة AirPlay.
الأمر مش بيخلص لوحده: بيفضل يطبع كل ما جهاز يظهر ([[Add]]) أو يختفي ([[Rmv]])، فبعد ثانيتين اقفله بـ Ctrl+C. و [[-G v4 sara-mbp.local]] بيجيب IPv4 بتاع جهاز من اسمه، وبرضه Ctrl+C.

[[ping -c 3 sara-mbp.local]]: أي ماك ليه اسم بينتهي بـ [[.local]] (تلاقيه في System Settings ثم General ثم Sharing تحت Local hostname)، فتكلّمه بالاسم حتى لو الـ IP اتغير. [[-c 3]] ابعت 3 مرات واقف، من غيرها ping بيفضل شغال لحد Ctrl+C.

عشان تمسح كل عنوان في الشبكة محتاج [[nmap]] ([[brew install nmap]] وبعدين [[nmap -sn 192.168.1.0/24]])، وده في درس «nmap -sn و arp-scan» في تاب «bash». ومن macOS Sequoia (15) فيه إذن اسمه Local Network: الأوامر اللي بتشغّلها من Terminal بتاخده لوحدها، لكن لو شغّالها من الترمنال اللي جوه VS Code أو برنامج تاني، البرنامج ده لازم يبقى مسموح له في System Settings ثم Privacy & Security ثم Local Network، وإلا الاتصال بأجهزة البيت ممكن يفشل.`,
          example: R`arp -a
arp -a -n -i en0
dns-sd -B _services._dns-sd._udp
dns-sd -B _ssh._tcp
dns-sd -G v4 sara-mbp.local
ping -c 3 sara-mbp.local`,
          try: R`اعرف كام جهاز في جدول ARP عندك، وأنواع الخدمات اللي بتتعلن على شبكة البيت. ولو عندك ماك تاني أو Raspberry Pi فاتح SSH، لاقيه بـ [[dns-sd -B _ssh._tcp]] واعمله ping باسمه.`,
          deep: {
            why: R`عايز تدخل بـ ssh على Raspberry Pi جديد ومش عارف الراوتر اداله أنهي IP، أو تلاقي الطابعة، أو تتأكد إن مفيش جهاز غريب على الواي فاي بتاعك. arp و dns-sd موجودين في كل ماك من غير تسطيب.`,
            how: R`mDNS بيشتغل على UDP بورت 5353 لكل الأجهزة على نفس الشبكة مرة واحدة (multicast)، ومش بيعدّي الراوتر لشبكة تانية. الخدمة اللي بتشغّله على الماك [[mDNSResponder]]، نفس اللي بتبعتلها HUP في درس «flush DNS». [[dns-sd -L "اسم الجهاز" _ssh._tcp]] بيطبع الجهاز والبورت لخدمة معينة. وتقدر تعلن عن خدمة بنفسك: [[dns-sd -R "My Site" _http._tcp . 8000]] بيخلي سيرفرك المحلي يبان في Bonjour طول ما الأمر شغال. المقابل في لينكس [[avahi-browse -a]] (درس «avahi-browse و .local» في تاب «bash»).`,
            when: R`جهاز جديد على الشبكة ومش عارف عنوانه، طابعة مش ظاهرة، أو مراجعة سريعة لشبكة البيت.`,
            mistakes: R`تفتكر [[arp -a]] بيوريك كل الأجهزة: ده بيوريك اللي جهازك كلّمه بس. تستنى dns-sd يخلص لوحده وهو مش بيخلص: Ctrl+C. تدوّر بـ Bonjour على جهاز ويندوز أو لينكس مش بيعلن عن نفسه (لينكس محتاج Avahi). تعمل scan لشبكة الشغل أو الكافيه من غير إذن: ممنوع في سياسات الشركات وأنظمة الحماية بتمسكه. وتعتمد على عنوان MAC للموبايلات: iPhone و Android بيستخدموا عنوان عشوائي لكل شبكة (Private Wi-Fi Address).`
          },
          teach: R`## الفكرة

طريقتين تعرف بيهم مين معاك على الشبكة: [[arp]] بيوريك اللي **جهازك كلّمه**، و [[dns-sd]] بيوريك اللي **بيعلن عن نفسه**. وفي الآخر [[ping]] باسم الجهاز. [[arp -a]] و [[ping]] موجودين في لينكس كمان، فشغّلتهم في zsh على أوبونتو 24.04 جوه Docker (الشبكة هناك شبكة Docker الداخلية، فهتلاقي جهاز واحد بس: الـ gateway بتاع Docker). [[dns-sd]] ماك بس، والشرح من [[man dns-sd]] (مفيش ماك هنا).

---

## ١. [[arp -a]]

### يعني إيه ARP؟

جوه الشبكة المحلية الأجهزة بتتكلم بعنوان الكارت (MAC)، مش بالـ IP. ARP (Address Resolution Protocol) هو اللي بيسأل «مين صاحب IP كذا؟» والجهاز يرد بالـ MAC بتاعه. والنظام بيحفظ الإجابات في جدول لكام دقيقة.

[[-a]] = all: اطبع الجدول كله. عشان يبقى فيه حاجة، كلّمت الـ gateway الأول بـ ping، وبعدين:

~~~zsh
arp -a
~~~

~~~text الناتج (أوبونتو جوه Docker)
? (172.17.0.1) at 66:f2:ca:fe:51:77 [ether] on eth0
~~~

| الحتة | معناها |
|---|---|
| [[?]] | مفيش اسم معروف للعنوان ده |
| [[(172.17.0.1)]] | الـ IP |
| [[at 66:f2:ca:fe:51:77]] | الـ MAC: ٦ بايتات hex |
| [[ether]] بين أقواس مربعة | (لينكس) نوع الكارت |
| [[on eth0]] | من أنهي كارت عندك |

وعلى الماك نفس الشكل تقريبًا (من الـ docs): [[? (192.168.1.1) at 1c:2b:3c:4d:5e:6f on en0 ifscope]].

> الجدول فيه اللي جهازك كلّمه **قريب** بس، مش كل الشبكة.

## ٢. [[arp -a -n -i en0]]

- [[-n]] numeric: متدوّرش على أسامي، أسرع.
- [[-i en0]] اعرض اللي على كارت واحد بس.

نسخة لينكس بتقبل نفس الفلاجات، فجرّبت [[arp -a -n -i eth0]] وطبعت نفس السطر.

---

## ٣. [[dns-sd -B _services._dns-sd._udp]]

### الأول: Bonjour

بروتوكول بيخلي كل جهاز يعلن على الشبكة «أنا اسمي كذا وعندي خدمة كذا»، عشان كده الطابعة بتظهر لوحدها. اسمه التقني mDNS (multicast DNS) و DNS-SD (DNS Service Discovery)، ومن هنا اسم الأداة.

### الأمر

- [[-B]] = browse: دوّر على نوع خدمة، وبعده النوع.
- [[_services._dns-sd._udp]] نوع **خاص** معناه «قولي إيه الأنواع الموجودة أصلًا».

~~~text شكل الناتج (من الـ docs، مختصر والأرقام مثال)
Browsing for _services._dns-sd._udp
Timestamp     A/R    Flags  if Domain   Service Type   Instance Name
10:15:02.123  Add        3  14 .        _tcp.local.    _ssh
10:15:02.124  Add        3  14 .        _tcp.local.    _airplay
~~~

| العمود | معناه |
|---|---|
| [[A/R]] | [[Add]] ظهر أو [[Rmv]] اختفى |
| [[if]] | رقم الكارت |
| [[Instance Name]] | هنا اسم نوع الخدمة ([[_ssh]] = فيه جهاز فاتح SSH) |

**الأمر مش بيخلص لوحده**: بيفضل مستني أجهزة جديدة. بعد ثانيتين اقفله بـ Ctrl+C.

## ٤. [[dns-sd -B _ssh._tcp]]

نفس [[-B]] على نوع معين. شكل النوع دايمًا [[_اسم._بروتوكول]]: [[_ssh]] الخدمة و [[_tcp]] البروتوكول. هيطبع سطر [[Add]] لكل جهاز فاتح SSH، و [[Instance Name]] هنا اسم الجهاز.

| النوع | مين |
|---|---|
| [[_ssh._tcp]] | أجهزة فاتحة SSH |
| [[_smb._tcp]] | مشاركة ملفات |
| [[_ipp._tcp]] | طابعات |
| [[_airplay._tcp]] | أجهزة AirPlay |

## ٥. [[dns-sd -G v4 sara-mbp.local]]

- [[-G]] = get address: هات عنوان اسم.
- [[v4]] عايز IPv4 ([[v6]] للـ IPv6، و [[v4v6]] الاتنين).
- [[sara-mbp.local]] الاسم. أي ماك ليه اسم بينتهي بـ [[.local]]، و [[.local]] معناها «اسأل الشبكة المحلية بـ mDNS مش الـ DNS العادي».

وبرضه Ctrl+C.

---

## ٦. [[ping -c 3 sara-mbp.local]]

- [[ping]] بيبعت رسالة صغيرة ويستنى الرد.
- [[-c 3]] = count: ٣ مرات وبس. من غيرها على الماك ولينكس بيفضل شغال لحد Ctrl+C.

ده [[ping -c 3 172.17.0.1]] الحقيقي في الـ container:

~~~text الناتج (أوبونتو جوه Docker)
PING 172.17.0.1 (172.17.0.1) 56(84) bytes of data.
64 bytes from 172.17.0.1: icmp_seq=1 ttl=64 time=0.441 ms
64 bytes from 172.17.0.1: icmp_seq=2 ttl=64 time=0.087 ms
64 bytes from 172.17.0.1: icmp_seq=3 ttl=64 time=0.086 ms

--- 172.17.0.1 ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2032ms
rtt min/avg/max/mdev = 0.086/0.204/0.441/0.167 ms
~~~

| الحتة | معناها |
|---|---|
| [[icmp_seq=1]] | رقم الرسالة (ICMP بروتوكول الـ ping) |
| [[ttl=64]] | عدد الأجهزة اللي الرسالة تقدر تعدّي عليها قبل ما تموت |
| [[time=0.441 ms]] | رايح جاي أخد قد إيه |
| [[0% packet loss]] | مفيش رسالة ضاعت |
| [[min/avg/max]] | أقل ومتوسط وأكبر وقت |

أول رسالة أبطأ (0.441) لأن الجهاز كان لسه بيسأل ARP عن الـ MAC. وعلى الماك الشكل قريب جدًا، والاسم [[.local]] بيتحوّل لـ IP قبل أول سطر.

---

## مقارنة

| السؤال | الماك | لينكس | ويندوز |
|---|---|---|---|
| جدول ARP | [[arp -a]] | [[arp -a]] أو [[ip neigh]] | [[arp -a]] |
| تصفح Bonjour | [[dns-sd -B]] | [[avahi-browse -a]] | مفيش أداة جاهزة |
| ping محدود | [[ping -c 3]] | [[ping -c 3]] | [[ping -n 3]] |

---

## الخلاصة

~~~text
arp -a              اللي جهازك كلّمه قريب: IP و MAC، مش كل الشبكة
dns-sd -B TYPE      اللي بيعلن عن نفسه بـ Bonjour، ومش بيخلص: Ctrl+C
_services._dns-sd   اعرض الأنواع الموجودة الأول
NAME.local          اسم بيتحل على الشبكة المحلية بـ mDNS
ping -c 3           ٣ مرات وبس
~~~`,
          lines: [
            R`جدول ARP: الأجهزة اللي جهازك كلّمها قريب، بالـ IP والـ MAC.`,
            R`نفس الجدول بأرقام بس ([[-n]]) وعلى كارت الواي فاي بس.`,
            R`أنواع الخدمات اللي بتتعلن على الشبكة. Ctrl+C بعد ثانيتين.`,
            R`الأجهزة اللي فاتحة SSH. Ctrl+C للخروج.`,
            R`IPv4 بتاع جهاز من اسمه .local.`,
            R`كلّم الجهاز باسمه 3 مرات واقف.`
          ],
          sol: R`ده ماك بس، مجربتوش هنا. المكتوب من [[man arp]] و [[man dns-sd]]، وملاحظة Apple التقنية TN3179 عن Local Network. [[arp -a]] بيطبع سطر لكل عنوان زي [[? (192.168.1.1) at 1c:2b:3c:4d:5e:6f on en0 ifscope]]، وهتلاقي فيه كمان عناوين مش أجهزة: [[192.168.1.255]] بـ [[ff:ff:ff:ff:ff:ff]] ده الـ broadcast، و [[224.0.0.251]] ده عنوان Bonjour نفسه.

[[dns-sd -B _services._dns-sd._udp]] بيطبع [[Browsing for _services._dns-sd._udp]] وتاريخ، وبعدين جدول أعمدته Timestamp و A/R و Flags و if و Domain و Service Type و Instance Name. في عمود Instance Name هتلاقي أسامي زي [[_ssh]] و [[_airplay]] و [[_ipp]]، وفي Service Type [[_tcp.local.]]. [[dns-sd -B _ssh._tcp]] بيطبع سطر [[Add]] لكل جهاز فاتح SSH وفي آخره اسمه. Ctrl+C بيرجّعلك الـ prompt.

لو مطلعش أي جهاز، يا إما مفيش حاجة بتعلن عن نفسها، يا إما الراوتر عامل client isolation (شائع في شبكات الضيوف والكافيهات) فالأجهزة مش شايفة بعض أصلًا.`
        },
        {
          cmd: "Remote Login و Screen Sharing",
          title: "ادخل على الماك من جهاز تاني (SSH والشاشة)",
          desc: R`Remote Login هو SSH server جاي مع الماك: لما تشغّله تقدر تدخل على ترمنال الماك من لابتوب ويندوز أو لينكس أو ماك تاني بـ [[ssh]]. و Screen Sharing بيوريك شاشة الماك نفسها وتتحكم فيها من جهاز تاني (بروتوكول VNC). الاتنين مقفولين افتراضيًا، والأسهل تشغّلهم من System Settings ثم General ثم Sharing.

من الترمنال: [[sudo systemsetup -getremotelogin]] بيطبع [[Remote Login: On]] أو [[Off]]، و [[sudo systemsetup -setremotelogin on]] بيشغّله. حسب [[man systemsetup]] التشغيل والقفل محتاجين Full Disk Access، يعني الترمنال نفسه لازم يكون في System Settings ثم Privacy & Security ثم Full Disk Access، ومن غيرها بيطلع [[Turning Remote Login on or off requires Full Disk Access privileges.]]. Full Disk Access إذن واسع، فلو مش محتاجه غير للحتة دي، شغّل Remote Login من الإعدادات أحسن. [[-f]] في سطر القفل بتلغي سؤال «متأكد؟».

في الإعدادات، جنب Remote Login زرار (i): هتلاقي أمر الاتصال مكتوب جاهز زي [[ssh sara@192.168.1.20]]، و Allow access for (خليها Only these users واختار اللي محتاجينها بس)، و [[Allow full disk access for remote users]] سيبها مقفولة إلا لو محتاجها.

الاتصال: ويندوز 10 و 11 فيه [[ssh]] جاهز في PowerShell، ولينكس والماك نفس الأمر: [[ssh sara@192.168.1.20]]. IP الماك من [[ipconfig getifaddr en0]] (درس «ipconfig getifaddr»)، أو اسمه من [[scutil --get LocalHostName]] وبعده [[.local]]، وده بيشتغل لو الجهاز التاني بيفهم Bonjour (ماك آه، ولينكس اللي عليه Avahi، وويندوز مش دايمًا). وللشاشة: من ماك تاني [[open vnc://192.168.1.20]] بيفتح برنامج Screen Sharing ويسألك على يوزر وباسورد الماك. من ويندوز أو لينكس محتاج VNC viewer (زي TigerVNC أو RealVNC Viewer)، وتشغّل في إعدادات Screen Sharing ثم (i) [[VNC viewers may control screen with password]] بباسورد مختلف عن باسورد الماك. البورت 22 لـ SSH و 5900 لـ VNC.

الأمان:
• متفتحش 22 ولا 5900 على النت من الراوتر (port forwarding). من برّه البيت استخدم VPN زي Tailscale أو WireGuard.
• ادخل بمفتاح مش باسورد: حط مفتاحك العام في [[~/.ssh/authorized_keys]] على الماك (درس «ssh-add»، ودرس «sshd_config» في تاب «VPS»). وبعد ما تتأكد إن الدخول بالمفتاح شغال، اقفل الباسورد بملف [[/etc/ssh/sshd_config.d/000-keys-only.conf]] فيه سطرين: [[PasswordAuthentication no]] و [[KbdInteractiveAuthentication no]]. سطر [[Include]] في [[/etc/ssh/sshd_config]] هو اللي بيقرا الفولدر ده، و [[sudo sshd -t]] بيفحص الإعدادات ومش بيطبع حاجة لو سليمة.
• VNC بباسورد لوحده مش متأمن كويس مع الـ viewers العادية، فمرّره جوه SSH: [[ssh -L 5901:localhost:5900 sara@192.168.1.20]] وافتح الـ viewer على [[localhost:5901]] (درس «ssh -L» في تاب «bash»).

خطر: Remote Login و Screen Sharing بيفتحوا باب على جهازك لأي حد على نفس الشبكة يعرف يوزر وباسورد. شغّلهم وقت ما تحتاجهم واقفلهم بعدها.`,
          example: R`sudo systemsetup -getremotelogin
sudo systemsetup -setremotelogin on
ipconfig getifaddr en0
scutil --get LocalHostName
ssh sara@192.168.1.20
open vnc://192.168.1.20
grep Include /etc/ssh/sshd_config
sudo nano /etc/ssh/sshd_config.d/000-keys-only.conf
sudo sshd -t
sudo systemsetup -setremotelogin -f off`,
          try: R`شغّل Remote Login (من الإعدادات، أو بالأمر بعد ما تدّي Terminal صلاحية Full Disk Access)، وادخل على الماك من جهاز تاني على نفس الواي فاي بـ ssh. وبعدين اقفله لو مش محتاجه.`,
          flag: "danger",
          deep: {
            why: R`ماك قديم في البيت بيتحول لسيرفر صغير (build أو ملفات) تدخل عليه من اللابتوب، أو تساعد حد في أهلك على جهازه من غير ما تروحله، أو تشغّل حاجة على ماكك وانت قاعد على جهاز الشغل.`,
            how: R`Remote Login بيشغّل OpenSSH ([[sshd]]) عن طريق launchd، وكل اتصال جديد بيقرا الإعدادات من الأول، فملف جديد في [[sshd_config.d]] بيسري على الاتصال الجاي من غير restart. [[/etc/ssh/sshd_config]] نفسه تحديثات macOS ممكن ترجّعه للأصل، عشان كده إعداداتك في ملف لوحدها، واسمه بيبدأ بـ 000 لأن sshd بياخد أول قيمة يلاقيها والملفات بتتقري بالترتيب الأبجدي.

لو [[-getremotelogin]] نفسه طلب Full Disk Access، اتأكد بطريقة تانية: [[nc -z localhost 22]] بيقول [[succeeded]] لو SSH شغال. Screen Sharing ماك لماك بيشفّر الاتصال لوحده، و Remote Management في نفس صفحة Sharing ده للي بيستخدموا Apple Remote Desktop.`,
            when: R`ماك شغال سيرفر في البيت، مساعدة عن بعد لحد على نفس الشبكة (أو عن طريق VPN)، أو نقل ملفات بـ [[scp]] بين أجهزتك.`,
            mistakes: R`تعمل port forwarding لـ 22 أو 5900 على الراوتر فبوتات النت تجرب باسوردات على جهازك طول اليوم. تسيب [[Allow full disk access for remote users]] شغالة من غير سبب. تقفل الدخول بالباسورد قبل ما تتأكد إن المفتاح شغال وانت داخل من بعيد، فتقفل على نفسك: سيب جلسة مفتوحة وجرّب من نافذة جديدة. تنسى إن الماك لما ينام SSH بيقع (درس «caffeinate» و «pmset»). وتنسى تدّي الترمنال Full Disk Access فتفتكر الأمر بايظ.`
          },
          teach: R`## الفكرة

الدرس ٣ أجزاء: شغّل SSH على الماك واعرف عنوانه، اتصل من جهاز تاني (ترمنال أو شاشة)، وأمّن SSH عشان يقبل مفاتيح بس. أوامر [[systemsetup]] و [[scutil]] و [[open vnc://]] ماك بس، والشرح من [[man systemsetup]] وصفحات دعم Apple (مفيش ماك هنا). لكن SSH نفسه هو OpenSSH، نفس اللي في لينكس، فجزء الأمان والاتصال جرّبته فعلًا: شغّلت [[sshd]] في container أوبونتو 24.04 جوه Docker واتصلت بيه من zsh.

---

## الجزء ١: شغّل واعرف العنوان

### [[sudo systemsetup -getremotelogin]]

- [[systemsetup]] أداة Apple لإعدادات النظام (الوقت، النوم، Remote Login...).
- [[-getremotelogin]] اسأل: SSH server شغال؟

~~~text شكل الناتج (من الـ docs)
Remote Login: Off
~~~

### [[sudo systemsetup -setremotelogin on]]

[[-set...]] غيّر. حسب [[man systemsetup]] محتاج إن Terminal ياخد **Full Disk Access**، وإلا هيقولك [[Turning Remote Login on or off requires Full Disk Access privileges.]] ومش هيغيّر حاجة.

### [[ipconfig getifaddr en0]] و [[scutil --get LocalHostName]]

الأول IP الماك (درس «ipconfig getifaddr»). والتاني:

- [[scutil]] أداة إعدادات النظام، و [[--get LocalHostName]] هات الاسم اللي الماك بيعلنه على الشبكة.
- بتكتب بعده [[.local]] وتتصل بالاسم بدل الـ IP، زي [[sara-mbp.local]] (درس «dns-sd و arp -a»).

---

## الجزء ٢: اتصل من جهاز تاني

### [[ssh sara@192.168.1.20]]

- [[ssh]] = Secure Shell: ترمنال على جهاز تاني، والاتصال كله متشفر.
- [[sara]] اليوزر **على الماك**، و [[@]] بتفصله عن العنوان.

نفس الأمر في PowerShell ولينكس والماك. أول اتصال بأي جهاز ssh بيسألك تثق في بصمته ولا لأ، فاكتب [[yes]]. في التجربة استخدمت [[-o StrictHostKeyChecking=accept-new]] عشان يقبل لوحده (مفيش حد يكتب)، واتصلت من الـ container بنفسه بمفتاح:

~~~zsh
ssh -o StrictHostKeyChecking=accept-new sara@localhost "echo hi from \$(whoami)"
~~~

~~~text الناتج (أوبونتو جوه Docker)
Warning: Permanently added 'localhost' (ED25519) to the list of known hosts.
hi from sara
~~~

- السطر الأول: البصمة اتحفظت في [[~/.ssh/known_hosts]]، والمرة الجاية مش هيسأل.
- الكلام بين علامات التنصيص بعد العنوان أمر **بيتنفّذ على الجهاز التاني** ويرجع ناتجه. من غيره بتاخد prompt وتخرج بـ [[exit]].
- [[\$]] عشان [[$(whoami)]] يتنفّذ هناك مش عندك.

### [[open vnc://192.168.1.20]]

[[open]] بيفتح الحاجة بالبرنامج المناسب ليها (درس «open»)، و [[vnc://]] نوع اللينك، فبيفتح برنامج Screen Sharing. ماك لماك بس؛ من ويندوز أو لينكس محتاج VNC viewer.

| الخدمة | البورت |
|---|---|
| SSH (Remote Login) | 22 |
| VNC (Screen Sharing) | 5900 |

---

## الجزء ٣: SSH بمفاتيح بس

### [[grep Include /etc/ssh/sshd_config]]

[[sshd_config]] ملف إعدادات الـ SSH **server** ([[d]] = daemon، برنامج شغال في الخلفية). بنتأكد إن فيه سطر بيقرا فولدر ملفات إضافية:

~~~text الناتج (أوبونتو جوه Docker)
Include /etc/ssh/sshd_config.d/*.conf
~~~

يعني أي ملف بينتهي بـ [[.conf]] في [[sshd_config.d]] بيتقري. والماك فيه نفس السطر (من الـ docs). ليه ملف لوحده؟ لأن تحديثات النظام ممكن ترجّع [[sshd_config]] الأصلي، وملفك يفضل.

### [[sudo nano /etc/ssh/sshd_config.d/000-keys-only.conf]]

الملف فيه سطرين:

~~~text 000-keys-only.conf
PasswordAuthentication no
KbdInteractiveAuthentication no
~~~

- [[PasswordAuthentication no]] ممنوع الدخول بالباسورد.
- [[KbdInteractiveAuthentication no]] ممنوع الطريقة التانية اللي ممكن تسأل باسورد (keyboard-interactive).
- الاسم بيبدأ بـ [[000]] لأن sshd بياخد **أول** قيمة يلاقيها، والملفات بتتقري بالترتيب الأبجدي، فملفك يتقري الأول.

### [[sudo sshd -t]]

[[-t]] = test: افحص الإعدادات ومتشغّلش حاجة. لو سليمة **مش بيطبع حاجة**. جرّبت الحالتين في الـ container:

~~~zsh
sshd -t; echo "exit=$?"
~~~

~~~text الناتج: ملف سليم
exit=0
~~~

وحطيت ملف تاني فيه قيمة غلط ([[PasswordAuthentication maybe]]):

~~~text الناتج: ملف غلط
/etc/ssh/sshd_config.d/001-bad.conf line 1: unsupported option "maybe".
exit=255
~~~

بيقولك الملف والسطر. وعشان تتأكد إن إعدادك اتطبق فعلًا، [[sshd -T]] (T كبيرة) بيطبع الإعدادات النهائية:

~~~text sshd -T | grep -i passwordauth (قبل وبعد الملف)
passwordauthentication yes
passwordauthentication no
~~~

> متقفلش الباسورد قبل ما تتأكد إن الدخول بالمفتاح شغال، وسيب جلسة مفتوحة وجرّب من نافذة جديدة.

### [[sudo systemsetup -setremotelogin -f off]]

اقفل Remote Login، و [[-f]] = force: متسألنيش «متأكد؟» (السؤال بيظهر لأن أي حد داخل بـ ssh دلوقتي هيقع).

---

## اتأكد إن البورت مفتوح: [[nc -z]]

[[nc]] (netcat) بيحاول يتصل ببورت، و [[-z]] اتصل وبس من غير ما تبعت داتا، و [[-v]] قول اللي حصل. جرّبته بعد ما شغّلت sshd:

~~~text الناتج (أوبونتو جوه Docker)
Connection to localhost (::1) 22 port [tcp/ssh] succeeded!
nc: connect to localhost (::1) port 5900 (tcp) failed: Connection refused
~~~

22 مفتوح، و 5900 مفيش حاجة عليه.

---

## ملخص

| الأمر | فين يتنفّذ | بيعمل |
|---|---|---|
| [[systemsetup -setremotelogin on]] | الماك | شغّل SSH |
| [[ipconfig getifaddr en0]] | الماك | العنوان |
| [[ssh sara@IP]] | الجهاز التاني | ادخل |
| [[open vnc://IP]] | ماك تاني | شاشة الماك |
| ملف [[000-keys-only.conf]] | الماك | مفاتيح بس |
| [[sshd -t]] | الماك | افحص قبل ما تعتمد |
| [[-setremotelogin -f off]] | الماك | اقفل |

## على الأنظمة التانية

| | الماك | لينكس | ويندوز |
|---|---|---|---|
| شغّل SSH server | [[systemsetup -setremotelogin on]] | [[sudo systemctl enable --now ssh]] | OpenSSH Server من Optional Features |
| شاشة من بعيد | Screen Sharing (VNC) | VNC أو RDP | Remote Desktop (RDP) |

---

## الخلاصة

~~~text
Remote Login = sshd        بورت 22، ويتشغّل من Sharing أو systemsetup (Full Disk Access)
ssh user@ip "cmd"          نفّذ أمر هناك، أو من غير أمر = prompt
sshd_config.d/000-*.conf   إعداداتك، والأول في الترتيب بيكسب
sshd -t                    مفيش ناتج = سليم
VNC 5900                   مرّره جوه ssh -L ومتفتحوش على النت
~~~`,
          lines: [
            R`Remote Login شغال ولا لأ.`,
            R`شغّله. محتاج إن Terminal ياخد Full Disk Access.`,
            R`IP الماك على الواي فاي، عشان تتصل بيه.`,
            R`اسم الماك على الشبكة، وتتصل بيه بـ [[.local]] بعده.`,
            R`من الجهاز التاني: ادخل على الماك باليوزر sara.`,
            R`من ماك تاني: افتح شاشة الماك ده بـ Screen Sharing.`,
            R`اتأكد إن sshd_config بيقرا فولدر [[sshd_config.d]].`,
            R`اعمل ملف يقفل الدخول بالباسورد (السطرين في الشرح فوق). بعد ما المفتاح يشتغل بس.`,
            R`افحص إعدادات sshd: مفيش ناتج يعني سليمة.`,
            R`اقفل Remote Login من غير سؤال ([[-f]]).`
          ],
          sol: R`ده ماك بس، مجربتوش هنا. المكتوب من [[man systemsetup]] وصفحات دعم Apple «Allow a remote computer to access your Mac» و «Turn screen sharing on or off». [[sudo systemsetup -getremotelogin]] بيطبع [[Remote Login: Off]]، وبعد التشغيل [[Remote Login: On]]. لو الترمنال معندوش Full Disk Access هتشوف رسالة إن Remote Login محتاج Full Disk Access ومش هيتغير حاجة.

من ويندوز (PowerShell) أو لينكس: [[ssh sara@192.168.1.20]] أول مرة بيسأل [[Are you sure you want to continue connecting (yes/no/[fingerprint])?]]، اكتب [[yes]]، وبعدها باسورد sara، وتلاقي prompt الماك زي [[sara@sara-mbp ~ %]]. [[exit]] بيرجّعك. لو قال [[Connection refused]] يبقى Remote Login مقفول، ولو [[Operation timed out]] يبقى الـ IP غلط أو الفايروول بيمنع (درس «socketfilterfw»).

ولما تقفله بـ [[-setremotelogin off]] من غير [[-f]]، هيسألك yes/no لأن الجلسات اللي داخلة بـ ssh هتقع.`,
          solCode: R`# على الماك
sudo systemsetup -setremotelogin on
sudo systemsetup -getremotelogin
ipconfig getifaddr en0
# من الجهاز التاني (PowerShell أو ترمنال لينكس)
ssh sara@192.168.1.20
exit
# على الماك لو خلصت
sudo systemsetup -setremotelogin -f off`
        },
        {
          cmd: "diskutil",
          title: "الديسكات والفلاشات: اعرض وافرمت واعمل bootable",
          desc: R`[[diskutil]] هو Disk Utility من الترمنال: بيعرض كل الديسكات المتوصلة، ويفرمت فلاشة، ويفصلها بأمان، ويفحص الديسك. أهم قاعدة: قبل أي مسح اعرف الـ identifier الصح ([[disk4]] مثلًا)، لأن رقم غلط معناه إنك تمسح ديسك تاني.

[[diskutil list]] بيطبع كل ديسك بعنوان زي [[/dev/disk0 (internal, physical):]]:
• [[internal]] جوه الجهاز و [[external]] متوصل من برّه (فلاشة أو هارد). [[physical]] ديسك حقيقي، و [[synthesized]] ديسك افتراضي APFS معمول جوه جزء من الديسك الحقيقي (هنا بتلاقي [[Macintosh HD]]).
• تحت كل ديسك أجزاؤه (partitions) في عمود IDENTIFIER زي [[disk4s1]]: [[s1]] يعني أول جزء في disk4.
• [[diskutil list external]] الخارجي بس، وده اللي تبدأ بيه قبل أي مسح.
[[diskutil info disk4]] تفاصيل ديسك واحد: الاسم والحجم و [[Protocol: USB]] و [[Device Location: External]]، فتتأكد إنه الفلاشة. و [[diskutil apfs list]] بيعرض الـ APFS containers والـ volumes اللي جواها، ومعاها سطر [[FileVault]] لكل volume.

[[diskutil eraseDisk ExFAT USB GPT disk4]] بيمسح الديسك كله ويعمله جزء واحد: [[ExFAT]] نوع الـ file system (بيتقري ويتكتب على ويندوز وماك ولينكس، ومفيهوش حد 4 جيجا للملف زي FAT32)، و [[USB]] الاسم اللي هيظهر، و [[GPT]] نوع جدول الأجزاء، وآخر حاجة الديسك نفسه. أنواع تانية: [[APFS]] لماك بس، و [[MS-DOS]] يعني FAT32 (لأجهزة قديمة وشاشات، والاسم ساعتها كابيتال لحد 11 حرف) ومعاه [[MBR]] بدل GPT. [[diskutil listFilesystems]] بيطبع كل الأسامي المسموحة.

[[diskutil unmountDisk disk4]] بيفصل كل أجزاء الديسك من غير ما يطلّعه، ودي لازمة قبل [[dd]]. [[diskutil eject disk4]] بيفصله عشان تشيله بأمان. [[diskutil verifyVolume /]] بيفحص الـ file system بتاع ديسك النظام وهو شغال (زي First Aid في Disk Utility)، و [[repairVolume]] بيصلّح ديسك خارجي.

فلاشة bootable:
• macOS: نزّل الـ installer (درس «softwareupdate»)، وبعدين [[createinstallmedia]] اللي جوه التطبيق نفسه بيمسح الفلاشة ويعملها installer. بيسأل على باسوردك وبعدين [[Y]] للتأكيد، و Apple بتقول 32 جيجا كفاية لأي نسخة. [[\ ]] قبل المسافة في المسار معناها إن المسافة جزء من الاسم.
• لينكس (ملف ISO): [[dd]] بينسخ الملف بايت بايت على الفلاشة. [[if=]] الملف اللي بيقرا منه، و [[of=]] اللي بيكتب فيه، و [[/dev/rdisk4]] (بـ r) نسخة raw من نفس الديسك أسرع بكتير من [[/dev/disk4]]، و [[bs=4m]] اكتب 4 ميجا في المرة، و [[status=progress]] اطبع التقدم كل ثانية. المسار بـ [[$HOME]] مش [[~]]، لأن zsh مش بيفك [[~]] بعد [[=]]. بعد ما يخلص الماك هيقولك إن الديسك مش مقروء، ده طبيعي: دوس Eject.

خطر: eraseDisk و dd مالهمش undo ومش بيسألوك «متأكد؟»، و [[dd]] على identifier غلط بيكتب فوق ديسك تاني من غير أي تحذير. اعمل [[diskutil list external]] قبلها على طول (الرقم بيتغير لما تشيل وتركّب)، وخلي الفلاشة هي الحاجة الوحيدة المتوصلة.`,
          example: R`# اعرف الديسكات
diskutil list
diskutil list external
diskutil info disk4
diskutil apfs list
diskutil verifyVolume /
# فرمت فلاشة (بيمسح كل اللي عليها)
diskutil eraseDisk ExFAT USB GPT disk4
diskutil eject disk4
# فلاشة لينكس من ملف ISO
diskutil unmountDisk disk4
sudo dd if=$HOME/Downloads/ubuntu-24.04.3-desktop-amd64.iso of=/dev/rdisk4 bs=4m status=progress
diskutil eject disk4
# فلاشة تسطيب macOS
sudo /Applications/Install\ macOS\ Tahoe.app/Contents/Resources/createinstallmedia --volume /Volumes/USB`,
          try: R`وصّل فلاشة مفيهاش حاجة مهمة. اعرف الـ identifier بتاعها من [[diskutil list external]] واتأكد منه بـ [[diskutil info]]، وبعدين فرمتها ExFAT باسم USB واعملها eject.`,
          flag: "danger",
          deep: {
            why: R`فلاشة جديدة جاية FAT32 ومش بتاخد ملف أكبر من 4 جيجا، أو عايز تسطّب لينكس على جهاز تاني، أو تعمل installer لماك بايظ. و Disk Utility بيخبّي حاجات (زي الفرق بين الديسك كله والـ volume) الترمنال بيوريهالك صريحة.`,
            how: R`APFS بيقسم الديسك لـ container، وجوه الـ container كذا volume بيشاركوا نفس المساحة: System (للقراية بس) و Data (ملفاتك) و Preboot و Recovery و VM. عشان كده [[diskutil list]] بيوريك disk0 حقيقي و disk3 synthesized. [[/dev/diskN]] بيعدّي على كاش النظام، و [[/dev/rdiskN]] بيكتب على الديسك على طول، وده اللي بيخلي dd أسرع. ولو dd شغال من غير status، Ctrl+T بتطبعلك وصل لفين (الماك بيبعتله إشارة SIGINFO). المقابل في لينكس [[lsblk]] و [[fdisk]] و [[mkfs]] (درس «fdisk و mkfs و dd» في تاب «bash»).`,
            when: R`فرمتة فلاشة أو هارد خارجي، فلاشة تسطيب لينكس أو macOS، أو فحص الديسك لما الماك يتصرف غريب.`,
            mistakes: R`تعتمد على إن الفلاشة disk4 زي المرة اللي فاتت: الأرقام بتتغير. تكتب [[disk4s1]] في eraseDisk بدل [[disk4]]. تنسخ [[disk0]] أو رقم من شرح على النت من غير ما تبص على جهازك. تختار APFS لفلاشة هتتقري على ويندوز. وتكتب [[if=~/Downloads/x.iso]] في zsh فيقولك [[No such file or directory]] لأن [[~]] بعد [[=]] مش بيتفك إلا لو [[setopt magic_equal_subst]].`
          },
          teach: R`## الفكرة

المثال ٤ مجموعات، ومكتوب فوق كل واحدة تعليق [[#]]: اعرف الديسكات (قراية بس)، فرمت فلاشة، اعمل فلاشة لينكس، اعمل فلاشة macOS. [[diskutil]] و [[createinstallmedia]] ماك بس، والشرح من [[man diskutil]] وصفحة Apple «How to create a bootable installer for macOS» (مفيش ماك هنا، والأرقام مثال). أما [[dd]] وفك المسارات في zsh فجرّبتهم فعلًا في zsh 5.9 على أوبونتو 24.04 جوه Docker، على ملفات مش ديسكات.

---

## المجموعة ١: اعرف الديسكات

### [[diskutil list]]

[[diskutil]] = disk utility، و [[list]] اطبع كل الديسكات وأجزاءها.

~~~text شكل الناتج (من الـ docs، مختصر والأرقام مثال)
/dev/disk0 (internal, physical):
   #:                       TYPE NAME                    SIZE       IDENTIFIER
   0:      GUID_partition_scheme                        *500.3 GB   disk0
   2:                 Apple_APFS Container disk3         494.4 GB   disk0s2

/dev/disk4 (external, physical):
   0:      GUID_partition_scheme                        *32.0 GB    disk4
   1:       Microsoft Basic Data USB                     32.0 GB    disk4s1
~~~

| الحتة | معناها |
|---|---|
| [[/dev/disk4]] | الديسك كملف في [[/dev]] (devices) |
| [[internal]] / [[external]] | جوه الجهاز / متوصل من برّه |
| [[physical]] / [[synthesized]] | ديسك حقيقي / افتراضي APFS جوه جزء من ديسك حقيقي |
| [[*32.0 GB]] | الـ [[*]] = حجم الديسك كله |
| [[disk4s1]] | الجزء (slice) رقم 1 من disk4 |

### [[diskutil list external]]

نفس الأمر بس للخارجي. **ابدأ بيه قبل أي مسح.**

### [[diskutil info disk4]]

تفاصيل ديسك واحد. اللي يهمك: [[Device Location: External]] و [[Protocol: USB]] والحجم. لو الـ ٣ مطابقين لفلاشتك، الرقم صح.

### [[diskutil apfs list]]

ديسكات الماك APFS: «container» كبير جواه كذا «volume» بيشاركوا المساحة (System و Data وغيرهم)، ولكل volume سطر [[FileVault]].

### [[diskutil verifyVolume /]]

[[verifyVolume]] افحص الـ file system، و [[/]] ديسك النظام. زي First Aid في Disk Utility، وبيشتغل والنظام شغال.

---

## المجموعة ٢: [[diskutil eraseDisk ExFAT USB GPT disk4]]

الترتيب ثابت: الأمر، النوع، الاسم، الجدول، الديسك.

| الحتة | معناها |
|---|---|
| [[eraseDisk]] | امسح الديسك **كله** واعمله جزء واحد |
| [[ExFAT]] | الـ file system: بيتقري ويتكتب على ويندوز وماك ولينكس، ومن غير حد 4 جيجا للملف |
| [[USB]] | الاسم اللي هيظهر في Finder وفي [[/Volumes/USB]] |
| [[GPT]] | GUID Partition Table: جدول الأجزاء الحديث ([[MBR]] للأجهزة القديمة) |
| [[disk4]] | الديسك، **مش** [[disk4s1]] |

بعدها [[diskutil eject disk4]]: افصل الديسك عشان تشيله بأمان.

---

## المجموعة ٣: فلاشة لينكس

### [[diskutil unmountDisk disk4]]

unmount = افصل الأجزاء عن النظام من غير ما تطلّع الديسك. لازمة عشان dd يكتب على الديسك ومحدش فاتحه.

### [[sudo dd if=$HOME/Downloads/ubuntu-24.04.3-desktop-amd64.iso of=/dev/rdisk4 bs=4m status=progress]]

[[dd]] بينسخ بايت بايت من مكان لمكان. خياراته بشكل [[اسم=قيمة]]:

| الحتة | معناها |
|---|---|
| [[if=]] | input file: بيقرا منين (ملف الـ ISO) |
| [[of=]] | output file: بيكتب فين (الفلاشة) |
| [[/dev/rdisk4]] | الـ [[r]] = raw: من غير كاش النظام، أسرع بكتير من [[/dev/disk4]] |
| [[bs=4m]] | block size: اقرا واكتب ٤ ميجا في المرة |
| [[status=progress]] | اطبع التقدم وهو شغال |

جرّبت [[dd]] على ملفات في الـ container (ملف 8 ميجا لملف تاني، مش ديسك):

~~~zsh
dd if=/tmp/a.img of=/tmp/b.img bs=4M status=progress
~~~

~~~text الناتج (أوبونتو جوه Docker)
2+0 records in
2+0 records out
8388608 bytes (8.4 MB, 8.0 MiB) copied, 0.0164575 s, 510 MB/s
~~~

[[2+0 records]]: قرا وكتب بلوكين كاملين (2 × 4 ميجا = 8)، و [[+0]] مفيش بلوك ناقص.

خد بالك: [[dd]] بتاع لينكس (GNU) بيكتب الحجم [[4M]] كابيتال، وبيرفض [[4m]]:

~~~text الناتج لو كتبت bs=4m على لينكس
dd: invalid number: '4m'
~~~

أما [[dd]] بتاع الماك (BSD) فبيقبل [[4m]] الصغيرة (من [[man dd]])، عشان كده المثال مكتوب كده.

### ليه [[$HOME]] مش [[~]]؟

zsh مش بيفك [[~]] لو جت بعد [[=]] في نص كلمة. جرّبت:

~~~zsh
print -r -- if=~/Downloads/x.iso
print -r -- if=$HOME/Downloads/x.iso
~~~

~~~text الناتج (zsh، اليوزر sara)
if=~/Downloads/x.iso
if=/home/sara/Downloads/x.iso
~~~

الأولى وصلت لـ dd بـ [[~]] حرفيًا، فـ dd هيدوّر على فولدر اسمه [[~]] ومش هيلاقيه. والتانية اتفكت. (لو شغّلت [[setopt magic_equal_subst]] الأولى كمان بتتفك، جرّبتها وطلعت [[if=/home/sara/Downloads/x.iso]].)

---

## المجموعة ٤: فلاشة macOS

~~~zsh
sudo /Applications/Install\ macOS\ Tahoe.app/Contents/Resources/createinstallmedia --volume /Volumes/USB
~~~

- المسار لبرنامج جوه تطبيق الـ installer نفسه ([[Contents/Resources]]).
- [[\ ]] (backslash ومسافة): المسافة جزء من الاسم، مش فاصل بين كلمتين. جرّبتها:

~~~zsh
print -l -- /Applications/Install\ macOS\ Tahoe.app x
~~~

~~~text الناتج
/Applications/Install macOS Tahoe.app
x
~~~

[[print -l]] بيطبع كل argument في سطر: المسار الطويل طلع argument **واحد**.

- [[--volume /Volumes/USB]] الفلاشة اللي هيمسحها (الاسم اللي اديتهولها في eraseDisk).

هيسألك باسوردك وبعدين [[Y]] للتأكيد.

---

## ملخص

| المجموعة | أهم أمر | خطر؟ |
|---|---|---|
| اعرف | [[diskutil list external]] و [[info]] | لأ |
| فرمت | [[eraseDisk ExFAT USB GPT diskN]] | بيمسح من غير سؤال |
| لينكس | [[unmountDisk]] ثم [[dd ... of=/dev/rdiskN]] | رقم غلط = ديسك تاني اتمسح |
| macOS | [[createinstallmedia --volume]] | بيسأل Y |

## على الأنظمة التانية

| | الماك | لينكس | ويندوز |
|---|---|---|---|
| اعرض الديسكات | [[diskutil list]] | [[lsblk]] | [[Get-Disk]] |
| فرمت | [[diskutil eraseDisk]] | [[mkfs.exfat]] | [[Format-Volume]] |
| فلاشة ISO | [[dd of=/dev/rdiskN]] | [[dd of=/dev/sdX]] | برنامج زي Rufus |

---

## الخلاصة

~~~text
diskutil list external + info   اعرف الرقم الصح قبل أي مسح (بيتغير كل مرة)
eraseDisk FS NAME TABLE diskN   الديسك كله (diskN مش diskNs1)
rdiskN                          raw: أسرع مع dd
bs=4m                           BSD على الماك، و 4M على لينكس
$HOME مش ~ بعد =                zsh مش بيفك ~ في نص الكلمة
~~~`,
          lines: [
            R`كل الديسكات وأجزاؤها. disk0 غالبًا الديسك الداخلي.`,
            R`الديسكات الخارجية بس: ابدأ بيها قبل أي مسح.`,
            R`تفاصيل disk4: اتأكد إنه USB و External وحجمه حجم الفلاشة.`,
            R`الـ APFS containers والـ volumes وحالة FileVault.`,
            R`افحص ديسك النظام وهو شغال (First Aid).`,
            R`امسح disk4 كله واعمله ExFAT باسم USB. مفيش «متأكد؟».`,
            R`افصل الفلاشة عشان تشيلها بأمان.`,
            R`افصل أجزاء disk4 من غير ما تطلّعه، عشان dd يكتب عليه.`,
            R`انسخ ISO لينكس على الفلاشة بايت بايت، والتقدم كل ثانية.`,
            R`اطلّعها بعد ما dd يخلص.`,
            R`اعمل فلاشة macOS Tahoe: باسوردك وبعدين Y عشان يمسح الفلاشة.`
          ],
          sol: R`ده ماك بس، مجربتوش هنا. المكتوب من [[man diskutil]] و [[man dd]] وصفحة Apple «How to create a bootable installer for macOS». [[diskutil list external]] بيطبع حاجة زي [[/dev/disk4 (external, physical):]] وتحتها سطر الديسك كله بالحجم [[*32.0 GB]] و [[disk4]]، وسطر الجزء [[disk4s1]]. الرقم عندك ممكن يبقى غير 4. [[diskutil info disk4 | grep -E 'Device Location|Protocol|Disk Size']] بيطبع [[Device Location: External]] و [[Protocol: USB]] والحجم. [[grep -E]] بيسيب السطور اللي فيها أي كلمة من اللي بينهم [[|]].

[[diskutil eraseDisk ExFAT USB GPT disk4]] بيطبع خطوات أولها [[Started erase on disk4]] وآخرها [[Finished erase on disk4]]، و [[ls /Volumes]] هيوريك [[USB]]. [[diskutil eject disk4]] بيطبع [[Disk disk4 ejected]].

لو قال إن فيه volume مش راضي يتفصل، يبقى فيه برنامج فاتح ملف عليها أو ترمنال واقف جواها: اعمل [[cd ~]] واقفل Finder على الفلاشة وجرّب تاني.`,
          solCode: R`diskutil list external
diskutil info disk4 | grep -E 'Device Location|Protocol|Disk Size'
diskutil eraseDisk ExFAT USB GPT disk4
ls /Volumes
diskutil eject disk4`
        },
        {
          cmd: "softwareupdate",
          title: "تحديثات macOS و Rosetta من الترمنال",
          desc: R`[[softwareupdate]] بيعمل اللي في System Settings ثم General ثم Software Update: يدوّر على تحديثات macOS و Safari و Command Line Tools، وينزّلها ويسطّبها. ومنه كمان تنزّل installer كامل لنسخة macOS معينة، وتسطّب Rosetta.

الأوامر:
• [[-l]] (list) التحديثات المتاحة. كل تحديث ليه سطر [[Label:]] وده الاسم اللي هتكتبه في التسطيب، وتحته سطر [[Title]] فيه الحجم، و [[Action: restart]] لو محتاج restart. [[*]] قبل Label يعني recommended. ده الأمر الوحيد اللي مش محتاج صلاحية أدمن.
• [[-i "Label"]] (install) نزّل وسطّب تحديث واحد باسمه، بين علامات تنصيص لأن فيه مسافات. [[-ia]] هي [[-i -a]]: سطّب كل المتاح (all). و [[--restart]] اعمل restart لوحدك لو التحديث محتاجه، من غيرها الأمر يخلص ويقولك تعمل restart.
• [[-d]] (download) نزّل بس، وتسطّب بعدين من الإعدادات أو بـ [[-i]].
• [[--history]] التحديثات اللي اتسطبت: الاسم والنسخة والتاريخ.
• [[--list-full-installers]] نسخ macOS الكاملة المتاحة لجهازك، و [[--fetch-full-installer --full-installer-version 15.7.1]] بينزّل [[Install macOS Sequoia.app]] في Applications (أكتر من 10 جيجا)، وبيه تعمل فلاشة تسطيب (درس «diskutil»). من غير [[--full-installer-version]] بينزّل أحدث نسخة.
• [[--install-rosetta --agree-to-license]] على Apple Silicon: Rosetta 2 بتشغّل برامج Intel (x86_64) على شريحة M، و [[--agree-to-license]] بتوافق على الترخيص من غير ما يسألك. على جهاز Intel ملوش لازمة.

على Apple Silicon تحديث macOS نفسه محتاج موافقة يوزر عنده secure token (درس «dscl و sysadminctl»)، فممكن يسألك على باسوردك حتى مع sudo. و Apple قالت إن Rosetta هتفضل متاحة بشكل عام لحد macOS 27، وبعدها هتبقى لحاجات محدودة زي الألعاب القديمة، فلو أداة عندك لسه Intel بس، دوّر على نسخة arm64.

خطر: [[--restart]] بيقفل البرامج ويعمل restart من غير ما يستناك، وأي شغل مش متحفظ ممكن يضيع. وأثناء تحديث النظام خلي اللابتوب على الشاحن.`,
          example: R`softwareupdate -l
softwareupdate --history
sudo softwareupdate -i "macOS Sequoia 15.7.1-24G231"
sudo softwareupdate -ia --restart
softwareupdate --list-full-installers
softwareupdate --fetch-full-installer --full-installer-version 15.7.1
softwareupdate --install-rosetta --agree-to-license`,
          try: R`اعرض التحديثات المتاحة وتاريخ التحديثات. ولو جهازك Apple Silicon، اعرف Rosetta متسطبة ولا لأ بـ [[arch -x86_64 /usr/bin/true]]، وسطّبها لو برنامج Intel محتاجها.`,
          flag: "danger",
          deep: {
            why: R`تحديث من سكربت لأكتر من ماك، أو على ماك داخل عليه بـ ssh من غير شاشة، أو تنزّل installer كامل لنسخة بعينها لأن مشروعك أو Xcode محتاجها. و [[--history]] بتقولك إمتى اتسطب آخر تحديث أمني.`,
            how: R`softwareupdate بيكلّم نفس خدمة التحديثات اللي الإعدادات بتستخدمها، فاللي بتنزّله من هنا بيظهر هناك والعكس. [[-r]] (recommended) بدل [[-a]] بيسطّب الـ recommended بس. [[--schedule]] بيقولك التحديث التلقائي في الخلفية شغال ولا لأ، و [[--background]] بيعمل check دلوقتي. وبعد [[xcode-select --install]]، تحديثات Command Line Tools بتظهر هنا باسم زي [[Command Line Tools for Xcode]] وبعده رقم النسخة.

[[arch -x86_64]] بيشغّل البرنامج اللي بعده كـ Intel. [[/usr/bin/true]] برنامج مش بيعمل حاجة غير إنه ينجح، فلو اشتغل يبقى Rosetta موجودة، ولو طلع [[Bad CPU type in executable]] يبقى مش متسطبة.`,
            when: R`قبل ما تبدأ شغل على ماك جديد، أو مرة في الأسبوع لو التحديث التلقائي مقفول، أو لما برنامج قديم يقولك محتاج Rosetta.`,
            mistakes: R`تكتب الـ Label غلط أو من غير علامات تنصيص فيقولك مش لاقيه: انسخه من [[-l]] بالحرف. تشغّل [[-ia --restart]] وعندك شغل مفتوح. تستغرب إنه بيسأل على باسورد مع sudo على Apple Silicon: ده تأكيد اليوزر صاحب الـ token. و [[--fetch-full-installer]] في بعض النسخ (اتبلّغ عنه في 15.4) كان بيطلع [[Install failed with error: Update not found]] لأي نسخة: نزّل من App Store أو من صفحة Apple «How to download and install macOS».`
          },
          teach: R`## الفكرة

نفس الأداة بخيارات مختلفة: اسأل (إيه المتاح؟ وإيه اللي اتسطب؟)، سطّب (واحد أو كله)، نزّل macOS كامل، وسطّب Rosetta. [[softwareupdate]] و [[arch -x86_64]] ماك بس، والشرح وشكل الناتج من [[man softwareupdate]] (مفيش ماك هنا، والأرقام مثال). حتة [[&&]] اللي في solCode جرّبتها فعلًا في zsh على أوبونتو 24.04 جوه Docker.

---

## ١. [[softwareupdate -l]]

[[-l]] = list: اعرض التحديثات المتاحة. ده الأمر الوحيد اللي مش محتاج أدمن.

~~~text شكل الناتج (من الـ docs، الأرقام مثال)
Software Update Tool

Finding available software
Software Update found the following new or updated software:
* Label: macOS Sequoia 15.7.1-24G231
	Title: macOS Sequoia 15.7.1, Version: 15.7.1, Size: 1843200KiB, Recommended: YES, Action: restart,
~~~

| الحتة | معناها |
|---|---|
| [[*]] | recommended |
| [[Label:]] | **الاسم اللي هتكتبه في التسطيب** بالحرف |
| [[Size]] | الحجم بالـ KiB (كيلوبايت = 1024 بايت) |
| [[Action: restart]] | هيحتاج restart |

ولو مفيش حاجة: [[No new software available.]]

## ٢. [[softwareupdate --history]]

اللي اتسطب قبل كده: جدول أعمدته [[Display Name]] و [[Version]] و [[Date]]. منه تعرف آخر تحديث أمني إمتى.

---

## ٣. [[sudo softwareupdate -i "macOS Sequoia 15.7.1-24G231"]]

- [[-i]] = install: نزّل وسطّب.
- الاسم هو الـ Label من [[-l]] **بالحرف**، وبين علامات تنصيص لأن فيه مسافات. من غيرها zsh هيقسمه ٣ كلمات.
- [[sudo]] لأنه بيغيّر النظام. وعلى Apple Silicon ممكن يسألك باسورد كمان (موافقة يوزر عنده secure token).

## ٤. [[sudo softwareupdate -ia --restart]]

- [[-ia]] = [[-i -a]]: سطّب **كل** المتاح (all).
- [[--restart]] اعمل restart لوحدك لو التحديث محتاجه. من غيرها الأمر يخلص ويقولك تعمل restart بنفسك.

> [[--restart]] مش بيستناك تحفظ شغلك.

---

## ٥. [[softwareupdate --list-full-installers]]

نسخ macOS **الكاملة** اللي جهازك يقدر يسطّبها، كل واحدة بنسختها وحجمها.

## ٦. [[softwareupdate --fetch-full-installer --full-installer-version 15.7.1]]

- [[--fetch-full-installer]] نزّل الـ installer كامل (تطبيق [[Install macOS Sequoia.app]] في Applications، أكتر من 10 جيجا).
- [[--full-installer-version 15.7.1]] نسخة معينة. من غيرها: أحدث نسخة.

ده اللي بتعمل بيه فلاشة تسطيب (درس «diskutil»).

---

## ٧. [[softwareupdate --install-rosetta --agree-to-license]]

- **Rosetta 2**: طبقة بتشغّل برامج Intel (x86_64) على شرايح Apple (M1 وما بعدها) بإنها تترجم تعليماتها.
- [[--install-rosetta]] سطّبها.
- [[--agree-to-license]] وافق على الترخيص من غير ما يسألك، مفيد في سكربت.

على جهاز Intel ملوش لازمة.

---

## solCode: Rosetta متسطبة ولا لأ؟

~~~zsh
arch -x86_64 /usr/bin/true && echo "rosetta ok"
~~~

### [[arch -x86_64 /usr/bin/true]]

- [[arch]] على الماك بيشغّل برنامج بمعمارية معينة، و [[-x86_64]] = كـ Intel.
- [[/usr/bin/true]] برنامج مش بيعمل حاجة غير إنه ينجح.

فلو Rosetta موجودة، true بيشتغل وينجح. لو مش موجودة، الماك بيطبع [[Bad CPU type in executable]] ويفشل (من الـ docs).

> [[arch]] في لينكس أمر تاني: بيطبع معمارية الجهاز بس ([[x86_64]])، ولو كتبت [[arch -x86_64]] هناك بيقولك [[arch: invalid option -- 'x']] (جرّبتها في الـ container).

### [[&& echo "rosetta ok"]]

[[&&]] = نفّذ اللي بعدي **بس لو اللي قبلي نجح**. جرّبتها بـ [[true]] (بينجح دايمًا) و [[false]] (بيفشل دايمًا):

~~~zsh
true && echo "rosetta ok"
false && echo "rosetta ok"; echo "exit=$?"
~~~

~~~text الناتج (zsh على أوبونتو)
rosetta ok
exit=1
~~~

مع [[false]] الـ echo متنفّذش خالص، و [[$?]] (exit code آخر أمر) طلع 1. يعني: «rosetta ok» بتظهر بس لو Rosetta شغالة.

---

## ملخص

| الأمر | بيعمل | أدمن؟ |
|---|---|---|
| [[-l]] | المتاح | لأ |
| [[--history]] | اللي اتسطب | لأ |
| [[-i "Label"]] | سطّب واحد | آه |
| [[-ia --restart]] | سطّب كله و restart | آه |
| [[--list-full-installers]] | نسخ macOS الكاملة | لأ |
| [[--fetch-full-installer]] | نزّل installer | (بيسأل) |
| [[--install-rosetta]] | Rosetta 2 | آه |

## على الأنظمة التانية

| | الماك | أوبونتو | ويندوز |
|---|---|---|---|
| المتاح | [[softwareupdate -l]] | [[apt list --upgradable]] | Windows Update (أو [[winget upgrade]] للبرامج) |
| سطّب كله | [[softwareupdate -ia]] | [[sudo apt upgrade]] | Windows Update |

---

## الخلاصة

~~~text
-l                 المتاح، والـ Label هو الاسم اللي هتنسخه بالحرف
-i "Label" / -ia   سطّب واحد / كله، و --restart مش بيستناك
--fetch-full-...   installer كامل لفلاشة أو نسخة معينة
--install-rosetta  برامج Intel على Apple Silicon
A && B             B بس لو A نجح
~~~`,
          lines: [
            R`التحديثات المتاحة: Label و Title لكل واحد.`,
            R`التحديثات اللي اتسطبت قبل كده وتواريخها.`,
            R`سطّب تحديث واحد. الاسم بالظبط زي سطر Label عندك (ده مثال).`,
            R`سطّب كل المتاح، واعمل restart لوحدك لو محتاج. احفظ شغلك الأول.`,
            R`نسخ macOS الكاملة المتاحة لجهازك.`,
            R`نزّل installer كامل لنسخة 15.7.1 في Applications.`,
            R`سطّب Rosetta 2 ووافق على الترخيص (Apple Silicon بس).`
          ],
          sol: R`ده ماك بس، مجربتوش هنا. المكتوب من [[man softwareupdate]]، ومن Apple Developer Forums (مشكلة fetch-full-installer في 15.4)، وتقارير إعلان Apple عن Rosetta. [[softwareupdate -l]] بيطبع [[Software Update Tool]] و [[Finding available software]]، وبعدها يا إما [[No new software available.]] يا إما لستة كل واحد فيها سطر [[* Label:]] وتحته [[Title:]] فيه [[Version]] و [[Size]] و [[Recommended: YES]]. [[--history]] بيطبع جدول أعمدته [[Display Name]] و [[Version]] و [[Date]].

على Apple Silicon من غير Rosetta، [[arch -x86_64 /usr/bin/true]] بيطبع error فيه [[Bad CPU type in executable]]. بعد [[softwareupdate --install-rosetta --agree-to-license]] (بيطبع إنك وافقت على الترخيص وبعدين [[Install of Rosetta 2 finished successfully]])، نفس الأمر مش بيطبع حاجة، و [[&& echo "rosetta ok"]] بيطبع [[rosetta ok]]: [[&&]] معناها نفّذ اللي بعدي لو اللي قبلي نجح.`,
          solCode: R`softwareupdate -l
softwareupdate --history
arch -x86_64 /usr/bin/true && echo "rosetta ok"
softwareupdate --install-rosetta --agree-to-license
arch -x86_64 /usr/bin/true && echo "rosetta ok"`
        },
        {
          cmd: "tmutil",
          title: "Time Machine من الترمنال (واستبعد node_modules)",
          desc: R`Time Machine هو الباك أب المبني في الماك: بيعمل نسخة من كل حاجة على هارد خارجي أو على الشبكة كل ساعة. [[tmutil]] بيتحكم فيه من الترمنال: تبدأ باك أب، وتعرف آخر باك أب، وتستبعد فولدرات زي [[node_modules]] منه.

الأوامر:
• [[tmutil status]] فيه باك أب شغال دلوقتي ولا لأ: [[Running = 1]] يعني شغال، ومعاه المرحلة والنسبة.
• [[tmutil startbackup --block]] ابدأ باك أب دلوقتي. [[--block]] بيخلي الأمر يستنى لحد ما الباك أب يخلص بدل ما يرجّعلك الـ prompt على طول، فينفع في سكربت قبل خطوة خطيرة.
• [[tmutil latestbackup]] مسار آخر باك أب كامل، و [[tmutil listbackups]] كل الباك أبات. [[man tmutil]] بيقول إن أوامر كتير منه محتاجة root و Full Disk Access، فلو طلع error صلاحيات ضيف Terminal في System Settings ثم Privacy & Security ثم Full Disk Access.
• [[tmutil addexclusion ~/projects/shop/node_modules]] متعملش باك أب للفولدر ده. ده استبعاد بيمشي مع الفولدر لو نقلته أو نسخته، ومش محتاج sudo. و [[tmutil isexcluded]] بيرد بسطر أوله [[Excluded]] أو [[Included]] بين أقواس مربعة، و [[removeexclusion]] بترجّعه للباك أب.

ليه node_modules: فولدر فيه عشرات آلاف الملفات الصغيرة بترجع بـ [[npm install]] في دقيقة، وبيبطّأ كل باك أب ويملا الهارد. نفس الكلام لـ [[.venv]] و [[target]] و [[build]] و Docker. والـ glob بتاع zsh بيستبعدهم كلهم مرة واحدة: [[~/projects/*/node_modules]]، و [[*]] معناها أي اسم فولدر.

local snapshots: لو Time Machine متظبط، الماك كمان بيعمل snapshot على الديسك الداخلي نفسه كل ساعة ويحتفظ بيها 24 ساعة، فتقدر ترجّع ملف حتى والهارد الخارجي مش متوصل. [[tmutil localsnapshot]] اعمل واحد دلوقتي (قبل تحديث أو تجربة خطيرة)، و [[tmutil listlocalsnapshots /]] اعرضهم ([[/]] يعني ديسك النظام)، و [[tmutil thinlocalsnapshots / 20000000000 4]] خلّي الماك يمسح snapshots لحد ما يفضّي حوالي 20 جيجا (الرقم بالبايت، و 4 أعلى درجة استعجال من 1 لـ 4). الماك بيمسحهم لوحده لما المساحة تقل، بس ده بيفيد لو برنامج بيقولك الديسك مليان.`,
          example: R`tmutil status
tmutil startbackup --block
tmutil latestbackup
tmutil listbackups
tmutil addexclusion ~/projects/shop/node_modules
tmutil addexclusion ~/projects/*/node_modules
tmutil isexcluded ~/projects/shop/node_modules
tmutil localsnapshot
tmutil listlocalsnapshots /
sudo tmutil thinlocalsnapshots / 20000000000 4`,
          try: R`استبعد كل فولدرات [[node_modules]] في مشاريعك من Time Machine واتأكد بـ [[isexcluded]]. ولو Time Machine متظبط عندك، اعمل local snapshot واعرضه.`,
          deep: {
            why: R`الهارد باظ أو اللابتوب اتسرق أو مسحت فولدر بالغلط: Time Machine هو اللي بيرجّعلك كل حاجة. ومن الترمنال بتعمل باك أب قبل حاجة خطيرة (تحديث، مسح يوزر، فرمتة)، وتشيل الحاجات اللي بتطوّل الباك أب من غير فايدة.`,
            how: R`الاستبعاد العادي (sticky) متسجل على الفولدر نفسه كـ extended attribute اسمه [[com.apple.metadata:com_apple_backup_excludeItem]]، عشان كده بيمشي معاه، وتشوفه بـ [[xattr -l]] (درس «xattr و quarantine»). [[-p]] استبعاد بالمسار و [[-v]] لديسك كامل، والاتنين محتاجين sudo. [[tmutil destinationinfo]] بيطبع الهارد المتظبط، و [[tmutil restore]] بيرجّع ملف من باك أب، و [[tmutil compare]] بيقارن الجهاز بآخر باك أب. و [[tmutil status]] مش مكتوب في كل نسخ man، بس موجود وبتستخدمه السكربتات كتير.`,
            when: R`أول ما تجيب هارد للباك أب، وأول ما تعمل مشروع جديد فيه node_modules أو [[.venv]]، وقبل أي أمر خطير في الدروس دي.`,
            mistakes: R`تفتكر local snapshots باك أب: هي على نفس الديسك، فلو الديسك باظ راحت معاه. تستبعد [[~/projects]] كله بدل node_modules بس فتخسر كودك. تشغّل listbackups وتلاقي error فتفتكر مفيش باك أب، والمشكلة Full Disk Access. تكتب [[~/projects/*/node_modules]] ومفيش ولا مشروع فيه node_modules فـ zsh يقول [[no matches found]]. وتعتمد على Time Machine لوحده لحاجة مهمة: خلّي نسخة برّه البيت كمان، وللكود Git remote.`
          },
          teach: R`## الفكرة

[[tmutil]] = Time Machine utility، وكل سطر في المثال subcommand بعده. بيتقسموا ٣: الباك أب نفسه (حالته، ابدأه، فين)، والاستبعاد (node_modules)، والـ local snapshots. [[tmutil]] ماك بس، والشرح وشكل الناتج من [[man tmutil]] وصفحات دعم Apple (مفيش ماك هنا). الـ glob بتاع zsh وحساب البايتات جرّبتهم فعلًا في zsh 5.9 على أوبونتو 24.04 جوه Docker.

---

## المجموعة ١: الباك أب

### [[tmutil status]]

فيه باك أب شغال دلوقتي؟ الناتج قايمة مفاتيح وقيم، والمهم فيها [[Running = 1;]] (شغال) أو [[Running = 0;]] (مفيش). ولو شغال هتلاقي المرحلة ([[BackupPhase]]) والنسبة.

### [[tmutil startbackup --block]]

- [[startbackup]] ابدأ باك أب دلوقتي، من غير ما تستنى الساعة.
- [[--block]] الأمر **يستنى** لحد ما الباك أب يخلص، وبعدين يرجّعلك الـ prompt. من غيرها بيبدأه في الخلفية ويرجع على طول.

ليه [[--block]] مفيدة؟ في سكربت:

~~~zsh
tmutil startbackup --block && echo "الباك أب خلص، كمّل"
~~~

[[&&]] = اللي بعدي يتنفّذ بس لو اللي قبلي نجح (درس «softwareupdate»).

### [[tmutil latestbackup]] و [[tmutil listbackups]]

مسار آخر باك أب، وكل الباك أبات (مسار لكل واحد، واسمه فيه التاريخ). لو طلع error صلاحيات، Terminal محتاج Full Disk Access.

---

## المجموعة ٢: الاستبعاد

### [[tmutil addexclusion ~/projects/shop/node_modules]]

[[addexclusion]] متعملش باك أب للحاجة دي. مش بيطبع حاجة، ومش محتاج sudo. والاستبعاد ده **بيتسجل على الفولدر نفسه** (كـ extended attribute، درس «xattr و quarantine»)، فلو نقلت الفولدر الاستبعاد بيمشي معاه.

### [[tmutil addexclusion ~/projects/*/node_modules]]

هنا zsh بيشتغل **قبل** tmutil: بيفك [[*]] لكل فولدر في [[~/projects]] جواه [[node_modules]]، ويدّي tmutil لستة مسارات. عملت فولدرات تجربة وشفت zsh بيفكها لإيه:

~~~zsh
mkdir -p projects/shop/node_modules projects/blog/node_modules projects/notes
print -l ~/projects/*/node_modules
~~~

~~~text الناتج (zsh على أوبونتو، اليوزر sara)
/home/sara/projects/blog/node_modules
/home/sara/projects/shop/node_modules
~~~

- [[mkdir -p]] اعمل الفولدرات واللي فوقها لو مش موجودة.
- [[print -l]] اطبع كل حاجة في سطر.
- [[notes]] ملوش node_modules، فـ zsh مطلعهوش. والنتايج مترتبة بالاسم (blog قبل shop).

ولو **مفيش ولا مشروع** فيه node_modules:

~~~text الناتج
zsh:1: no matches found: /home/sara/projects/*/node_modules
~~~

zsh بيوقف الأمر وtmutil مبيشتغلش أصلًا (درس «no matches found»).

### [[tmutil isexcluded ~/projects/shop/node_modules]]

اسأل: مستبعد؟ (من [[man tmutil]]):

~~~text شكل الناتج
[Excluded]    /Users/sara/projects/shop/node_modules
~~~

أو كلمة Included بين القوسين لو هيتعمله باك أب. و [[removeexclusion]] بترجّعه.

---

## المجموعة ٣: local snapshots

لما Time Machine يكون متظبط، الماك كمان بياخد «صورة» من ديسك النظام **على نفس الديسك** كل ساعة، ويحتفظ بيها حوالي 24 ساعة.

### [[tmutil localsnapshot]]

اعمل snapshot دلوقتي. شكل الناتج: [[Created local snapshot with date: 2026-10-02-101500]] (سنة-شهر-يوم-ساعة دقيقة ثانية).

### [[tmutil listlocalsnapshots /]]

[[/]] ديسك النظام. بيطبع أسامي زي [[com.apple.TimeMachine.2026-10-02-101500.local]].

### [[sudo tmutil thinlocalsnapshots / 20000000000 4]]

| الحتة | معناها |
|---|---|
| [[thinlocalsnapshots]] | «خسّس» الـ snapshots: امسح منها |
| [[/]] | على ديسك النظام |
| [[20000000000]] | لحد ما تفضّي المساحة دي **بالبايت** |
| [[4]] | الاستعجال من 1 لـ 4 (4 أعلى) |

الـ 20000000000 بايت دي كام جيجا؟ حسبتها في zsh:

~~~zsh
echo $(( 20000000000 / 1024.0**3 ))
~~~

~~~text الناتج
18.62645149230957
~~~

[[**]] أُس، فـ [[1024.0**3]] = عدد البايتات في الجيجا. يعني حوالي 18.6 GiB، أو 20 GB لو حسبت الجيجا ألف مليون زي شركات الديسكات.

---

## ملخص

| الأمر | بيعمل | sudo؟ |
|---|---|---|
| [[status]] | شغال دلوقتي؟ | لأ |
| [[startbackup --block]] | ابدأ واستنى | لأ |
| [[latestbackup]] / [[listbackups]] | فين الباك أبات | Full Disk Access |
| [[addexclusion]] / [[isexcluded]] | استبعد / اسأل | لأ |
| [[localsnapshot]] / [[listlocalsnapshots /]] | snapshot على نفس الديسك | لأ |
| [[thinlocalsnapshots / BYTES 4]] | فضّي مساحة | آه |

## على الأنظمة التانية

| | الماك | ويندوز | لينكس |
|---|---|---|---|
| الباك أب المبني | Time Machine ([[tmutil]]) | File History | مفيش واحد ثابت ([[rsync]] أو Timeshift أو Déjà Dup) |
| snapshots | local snapshots | Restore Points | Timeshift أو btrfs snapshots |

---

## الخلاصة

~~~text
startbackup --block    باك أب دلوقتي، والأمر بيستنى يخلص
addexclusion PATH      بيتسجل على الفولدر ويمشي معاه، ومن غير sudo
~/projects/*/node_modules   zsh بيفكها قبل tmutil، ولو مفيش = no matches found
local snapshots        على نفس الديسك: مش باك أب لو الديسك باظ
thinlocalsnapshots     الرقم بالبايت
~~~`,
          lines: [
            R`فيه باك أب شغال دلوقتي ولا لأ.`,
            R`ابدأ باك أب واستنى لحد ما يخلص.`,
            R`مسار آخر باك أب كامل.`,
            R`كل الباك أبات. لو error صلاحيات: Full Disk Access للترمنال.`,
            R`استبعد node_modules بتاع مشروع واحد.`,
            R`استبعد node_modules في كل مشاريعك مرة واحدة.`,
            R`اتأكد إنه مستبعد.`,
            R`اعمل local snapshot دلوقتي.`,
            R`اعرض الـ snapshots اللي على ديسك النظام.`,
            R`امسح snapshots لحد ما تفضّي حوالي 20 جيجا.`
          ],
          sol: R`ده ماك بس، مجربتوش هنا. المكتوب من [[man tmutil]] وصفحات دعم Apple عن Time Machine. [[tmutil addexclusion ~/projects/*/node_modules]] مش بيطبع حاجة، و [[tmutil isexcluded]] على أي واحد منهم بيطبع سطر فيه كلمة Excluded بين أقواس مربعة وبعدها المسار، زي المثال اللي في صفحة man. ولو مشروع معندوش node_modules، الـ glob بيتجاهله، ولو مفيش ولا واحد zsh بيقول [[no matches found]].

لو Time Machine متظبط: [[tmutil localsnapshot]] بيطبع [[Created local snapshot with date:]] وبعدها التاريخ بشكل [[2026-10-02-101500]] (سنة-شهر-يوم-ساعة دقيقة ثانية)، و [[tmutil listlocalsnapshots /]] بيطبع [[Snapshots for disk /:]] وتحتها أسامي زي [[com.apple.TimeMachine.2026-10-02-101500.local]]. ولو Time Machine مش متظبط خالص، الأوامر دي ممكن تفشل أو متطبعش snapshots.`,
          solCode: R`tmutil addexclusion ~/projects/*/node_modules
tmutil isexcluded ~/projects/*/node_modules
tmutil localsnapshot
tmutil listlocalsnapshots /`
        },
        {
          cmd: "system_profiler و ioreg",
          title: "البطارية والـ USB والهاردوير بالتفصيل",
          desc: R`[[system_profiler]] بيطبع نفس اللي في تطبيق System Information: كل حاجة عن الهاردوير والسوفتوير، مقسمة لأنواع (data types). درس «sw_vers» عرض نوع الجهاز والشريحة؛ هنا البطارية والـ USB وإزاي تاخد الناتج JSON لسكربت، ومعاهم [[ioreg]] و [[sysctl]] للتفاصيل الأدق.

system_profiler:
• [[-listDataTypes]] بيطبع أسامي كل الأنواع، وكلها بتبدأ بـ [[SP]] وتنتهي بـ [[DataType]].
• [[SPPowerDataType]] الطاقة والبطارية. تحت Health Information هتلاقي [[Cycle Count]] (عدد الدورات: كل ما تستهلك 100% من سعة البطارية، حتى لو على كذا مرة، تبقى دورة)، و [[Condition]] ([[Normal]]، أو [[Service Recommended]] يعني محتاجة تتغير)، و [[Maximum Capacity]] السعة دلوقتي كنسبة من وهي جديدة. [[grep -E]] بيطبع السطور اللي فيها أي كلمة من اللي بينهم [[|]].
• [[-detailLevel mini]] تقرير كامل من غير معلومات شخصية زي الرقم التسلسلي، و [[>]] بتحطه في ملف، وده اللي تبعته لحد بيساعدك.
• [[-json]] الناتج JSON بدل نص، وده اللي تستخدمه في سكربت. من macOS Sequoia (15) [[jq]] جاي مع الماك، و [[jq -r '.SPHardwareDataType[0].physical_memory']] بتطلع الرام بس: [[.SPHardwareDataType]] المفتاح، والـ 0 بين الأقواس المربعة يعني أول عنصر في اللستة، و [[-r]] اطبع النص من غير علامات تنصيص.
• [[SPUSBDataType]] كان بيعرض أجهزة الـ USB المتوصلة، وفي macOS Tahoe (26) اتشال، والجديد [[SPUSBHostDataType]] بيعرض الـ controllers بس. الأضمن [[ioreg -p IOUSB]] اللي بيطبع شجرة أجهزة الـ USB على أي نسخة.

ioreg بيعرض شجرة الأجهزة اللي الـ kernel شايفها (I/O Kit registry). [[-r -c AppleSmartBattery]] اعرض بس الحاجة اللي نوعها (class) البطارية وتفاصيلها، وفيها أرقام البطارية الخام زي [[CycleCount]]، وأسرع من system_profiler. و [[ioreg -l | grep -i cycle]] بيوصل لنفس الحاجة بس بيلف على الشجرة كلها. [[-p IOUSB]] بيعرض الشجرة من ناحية الـ USB بس.

sysctl بيقرا قيم من الـ kernel، و [[-n]] اطبع القيمة بس من غير الاسم: [[hw.model]] رقم الموديل زي [[Mac14,2]] (بيه تدوّر على مواصفات جهازك بالظبط)، و [[hw.memsize]] الرام بالبايت، و [[machdep.cpu.brand_string]] اسم المعالج زي [[Apple M2]] أو اسم Intel كامل. و [[sysctl.proc_translated]] بيطبع [[1]] لو الترمنال نفسه شغال بـ Rosetta و [[0]] لو native، وعلى Intel مش موجود أصلًا.`,
          example: R`system_profiler -listDataTypes
system_profiler SPPowerDataType | grep -E 'Cycle Count|Condition|Maximum Capacity'
system_profiler -detailLevel mini > ~/Desktop/mac-report.txt
system_profiler -json SPHardwareDataType | jq -r '.SPHardwareDataType[0].physical_memory'
ioreg -r -c AppleSmartBattery | grep -i cycle
ioreg -p IOUSB
sysctl -n hw.model hw.memsize
sysctl -n machdep.cpu.brand_string
sysctl -n sysctl.proc_translated`,
          try: R`اعرف عدد دورات البطارية وحالتها والسعة القصوى، وقارن [[CycleCount]] من ioreg باللي في system_profiler. ولو جهازك Apple Silicon، اتأكد إن الترمنال مش شغال بـ Rosetta.`,
          deep: {
            why: R`بتشتري ماك مستعمل: عدد الدورات والسعة القصوى بيقولولك حالة البطارية الحقيقية. أو بتكتب سكربت جرد لأجهزة الفريق، أو بتطلب مساعدة وعايز تبعت مواصفات جهازك من غير الرقم التسلسلي.`,
            how: R`system_profiler بطيء نسبيًا لأنه بيجمع من مصادر كتير، فحدد الـ data type دايمًا. وناتج [[-json]] شكله ثابت أكتر من النص اللي ممكن يتغير بين النسخ، فاستخدمه في السكربتات. ioreg بيقرا من الـ kernel مباشرة وأسرع، بس أسامي المفاتيح فيه داخلية ممكن تتغير. والبطاريات في لابتوبات Apple الحديثة معمولة تحتفظ بحوالي 80% من سعتها لحد 1000 دورة. المقابل في لينكس [[lsusb]] و [[lspci]] (درس «lsusb و lspci و lshw» في تاب «bash»).`,
            when: R`شرا أو بيع ماك، بطارية بتخلص بسرعة، جرد أجهزة، أو قبل ما تطلب مساعدة في منتدى.`,
            mistakes: R`تعتمد على [[SPUSBDataType]] في سكربت فيرجع فاضي على Tahoe. تعمل grep على الناتج النصي ولغة الجهاز مش إنجليزي فممكن الأسامي تبقى مترجمة، والـ JSON مفاتيحه ثابتة. تبعت تقرير كامل فيه الرقم التسلسلي لحد مش عارفه. وتحكم من رقم [[Maximum Capacity]] مرة واحدة: الرقم بيتحرك شوية بعد معايرة البطارية، فبص على اتجاهه مع الوقت. وعلى ماك ديسكتوب (Mac mini أو iMac) مفيش بطارية أصلًا، فـ grep مش هيطبع حاجة.`
          },
          teach: R`## الفكرة

٣ أدوات بتسأل الجهاز عن نفسه من ٣ مستويات: [[system_profiler]] تقرير مرتب (نفس تطبيق System Information)، و [[ioreg]] شجرة الأجهزة الخام اللي الـ kernel شايفها، و [[sysctl]] قيم مفردة من الـ kernel. التلاتة ماك بس بالشكل ده، فشرحهم وشكل الناتج من [[man system_profiler]] و [[man ioreg]] و [[man sysctl]] (مفيش ماك هنا، والأرقام مثال). الحتت العامة ([[grep -E]] و [[jq]] و [[sysctl -n]] بتاع لينكس) جرّبتها فعلًا في zsh على أوبونتو 24.04 جوه Docker.

---

## ١. [[system_profiler -listDataTypes]]

التقرير متقسم أنواع (data types)، وده بيطبع أساميها، كلها شكل [[SP...DataType]] (SP = System Profiler): [[SPHardwareDataType]] و [[SPPowerDataType]] و [[SPDisplaysDataType]] وغيرهم.

---

## ٢. [[system_profiler SPPowerDataType | grep -E 'Cycle Count|Condition|Maximum Capacity']]

نفكّه بالترتيب:

### [[system_profiler SPPowerDataType]]

تقرير الطاقة بس: الشاحن والبطارية وإعدادات النوم. طويل، والمهم منه ٣ سطور تحت Health Information.

### [[| grep -E '...']]

- [[|]] الناتج يدخل grep.
- [[-E]] = extended regex: بيخلي [[|]] **جوه النمط** معناها «أو».
- فالنمط: سطر فيه [[Cycle Count]] أو [[Condition]] أو [[Maximum Capacity]].

جرّبت نفس الـ grep على نص على شكل جزء البطارية في التقرير (فيه سطر زيادة عشان نشوفه بيتشال):

~~~zsh
printf "      Cycle Count: 187\n      Condition: Normal\n      Maximum Capacity: 89%%\n      Charging: No\n" | grep -E "Cycle Count|Condition|Maximum Capacity"
~~~

~~~text الناتج
      Cycle Count: 187
      Condition: Normal
      Maximum Capacity: 89%
~~~

[[Charging: No]] اتشال. ([[%%]] في printf عشان تطبع [[%]] واحدة.)

| السطر | معناه |
|---|---|
| [[Cycle Count]] | عدد الدورات: كل 100% استهلاك (حتى على كذا مرة) = دورة |
| [[Condition]] | [[Normal]] أو [[Service Recommended]] (محتاجة تتغير) |
| [[Maximum Capacity]] | سعتها دلوقتي كنسبة من وهي جديدة |

---

## ٣. [[system_profiler -detailLevel mini > ~/Desktop/mac-report.txt]]

- [[-detailLevel mini]] تقرير كامل **من غير** معلومات شخصية زي الرقم التسلسلي.
- [[>]] الناتج يروح ملف بدل الشاشة، و [[~/Desktop/mac-report.txt]] مكانه.

---

## ٤. [[system_profiler -json SPHardwareDataType | jq -r '.SPHardwareDataType[0].physical_memory']]

### [[-json]]

الناتج JSON بدل نص، وأسامي المفاتيح ثابتة، فده اللي تستخدمه في سكربت. شكله (من الـ docs ومن أمثلة منشورة، مختصر):

~~~text شكل الناتج
{
  "SPHardwareDataType" : [
    {
      "_name" : "hardware_overview",
      "chip_type" : "Apple M2",
      "machine_model" : "Mac14,2",
      "physical_memory" : "16 GB"
    }
  ]
}
~~~

### [[jq]]

أداة بتقرا JSON وتطلع منه اللي عايزه (جاية مع الماك من Sequoia 15). عملت ملف بنفس الشكل ده وجرّبت عليه:

~~~zsh
jq ".SPHardwareDataType[0].physical_memory" hw.json
jq -r ".SPHardwareDataType[0].physical_memory" hw.json
~~~

~~~text الناتج (أوبونتو)
"16 GB"
16 GB
~~~

| الحتة | معناها |
|---|---|
| [[.SPHardwareDataType]] | خش جوه المفتاح ده |
| [0] بعده | أول عنصر في اللستة (العد من 0) |
| [[.physical_memory]] | هات المفتاح ده منه |
| [[-r]] | raw: اطبع النص من غير علامات التنصيص |

الفرق بين السطرين هو [[-r]]: الأول فيه [[" "]]، والتاني نص جاهز تحطه في متغير.

---

## ٥. [[ioreg -r -c AppleSmartBattery | grep -i cycle]]

| الحتة | معناها |
|---|---|
| [[ioreg]] | I/O registry: شجرة كل الأجهزة اللي الـ kernel شايفها |
| [[-r]] | اعرض الحاجة اللي هتطابق وفروعها بس، مش الشجرة كلها |
| [[-c AppleSmartBattery]] | اللي نوعها (class) البطارية |
| [[grep -i cycle]] | السطور اللي فيها cycle، و [[-i]] من غير فرق بين كابيتال وسمول |

~~~text شكل الناتج (من الـ docs)
    "CycleCount" = 187
~~~

نفس رقم system_profiler بس أسرع، ومعاه سطور تانية فيها cycle (زي أقصى دورات البطارية معمولة لها).

## ٦. [[ioreg -p IOUSB]]

[[-p]] = plane: اعرض الشجرة من ناحية واحدة، و [[IOUSB]] ناحية الـ USB: كل جهاز USB متوصل وتحته اللي متوصل فيه.

---

## ٧ و ٨ و ٩. [[sysctl -n ...]]

[[sysctl]] بيقرا قيم من الـ kernel بالاسم، و [[-n]] اطبع القيمة بس من غير الاسم. [[sysctl]] موجود في لينكس بأسامي تانية، فجرّبت الفرق:

~~~zsh
sysctl kernel.ostype
sysctl -n kernel.ostype
sysctl -n kernel.ostype kernel.osrelease
~~~

~~~text الناتج (أوبونتو جوه Docker)
kernel.ostype = Linux
Linux
Linux
6.6.87.2-microsoft-standard-WSL2
~~~

من غير [[-n]] بيطبع [[الاسم = القيمة]]، ومعاها القيمة بس. واسمين ورا بعض = سطرين. والأسامي في المثال بتاعة الماك:

| الاسم | معناه | مثال |
|---|---|---|
| [[hw.model]] | رقم الموديل (تدوّر بيه على مواصفات جهازك) | [[Mac14,2]] |
| [[hw.memsize]] | الرام بالبايت | [[17179869184]] = 16 جيجا |
| [[machdep.cpu.brand_string]] | اسم المعالج | [[Apple M2]] |
| [[sysctl.proc_translated]] | الترمنال شغال بـ Rosetta؟ | [[0]] لأ، [[1]] آه |

[[17179869184]] جيجا كام؟ حسبتها في zsh: [[echo $((17179869184/1024**3))]] طبعت [[16]].

---

## ملخص

| الأداة | المستوى | استخدمها لـ |
|---|---|---|
| [[system_profiler TYPE]] | تقرير مرتب | البطارية، تقرير للمساعدة |
| [[system_profiler -json]] + [[jq]] | نفسه بـ JSON | سكربتات |
| [[ioreg]] | شجرة الـ kernel | أرقام خام بسرعة، USB |
| [[sysctl -n]] | قيمة واحدة | موديل، رام، معالج، Rosetta |

## على الأنظمة التانية

| | الماك | لينكس | ويندوز (PowerShell) |
|---|---|---|---|
| مواصفات الجهاز | [[system_profiler SPHardwareDataType]] | [[lshw -short]] | [[Get-ComputerInfo]] |
| أجهزة USB | [[ioreg -p IOUSB]] | [[lsusb]] | [[Get-PnpDevice -Class USB]] |
| البطارية | [[SPPowerDataType]] | [[upower -d]] | [[powercfg /batteryreport]] |

---

## الخلاصة

~~~text
system_profiler SPxxxDataType   حدد النوع دايمًا (من غيره بطيء)
-detailLevel mini               تقرير من غير الرقم التسلسلي
-json | jq -r '.X[0].key'       قيمة واحدة لسكربت، و -r من غير تنصيص
ioreg -r -c CLASS               الأرقام الخام أسرع
sysctl -n NAME                  القيمة بس من غير الاسم
~~~`,
          lines: [
            R`أسامي كل أنواع التقارير.`,
            R`حالة البطارية: الدورات والحالة والسعة القصوى.`,
            R`تقرير كامل من غير معلومات شخصية، في ملف على الـ Desktop.`,
            R`الرام بس، من ناتج JSON بـ jq.`,
            R`عدد الدورات من ioreg مباشرة (أسرع).`,
            R`شجرة أجهزة الـ USB المتوصلة.`,
            R`رقم الموديل والرام بالبايت، كل واحد في سطر.`,
            R`اسم المعالج.`,
            R`1 لو الترمنال شغال بـ Rosetta، و 0 لو native.`
          ],
          sol: R`ده ماك بس، مجربتوش هنا. المكتوب من [[man system_profiler]] و [[man ioreg]] و [[man sysctl]]، و Apple Community عن SPUSBDataType في Tahoe. على لابتوب، سطر grep بيطبع حاجة زي [[Cycle Count: 187]] و [[Condition: Normal]] و [[Maximum Capacity: 89%]]. و [[ioreg -r -c AppleSmartBattery | grep -i cycle]] بيطبع سطر فيه [["CycleCount" = 187]] (نفس الرقم)، ومعاه سطور تانية فيها كلمة cycle زي أقصى عدد دورات البطارية معمولة له.

[[sysctl -n sysctl.proc_translated]] بيطبع [[0]] لو الترمنال native. لو طبع [[1]]، اقفل Terminal، واعمل Get Info عليه في Applications ثم Utilities، وشيل علامة Open using Rosetta، وافتحه تاني. وعلى جهاز Intel الأمر بيطبع error إن الاسم مش موجود، وده طبيعي.`
        }
      ]
    }
]);
