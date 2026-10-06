// تكملة تاب bash: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/bash/01.js (شرح حقول الدرس في أوله)
MORE("bash", [
    {
      t: "تحكّم في الشبكة",
      l: 3,
      n: "الواي فاي و IP ثابت، والـ DNS اللي جهازك بيستخدمه فعلًا، وتشغيل الكارت وإطفاؤه، وقراية الفايروول وكتابته",
      items: [
        {
          cmd: "nmcli",
          title: "الواي فاي و IP ثابت من الترمنال",
          desc: R`[[nmcli]] هو الترمنال بتاع NetworkManager، البرنامج اللي بيدير الشبكة في أوبونتو Desktop وفيدورا ومعظم توزيعات الـ desktop (وهو اللي ورا أيقونة الواي فاي فوق). أي حاجة بتعملها من الإعدادات بالماوس تقدر تعملها بيه: تشوف الشبكات حواليك، وتدخل واي فاي، وتحط IP ثابت، وترجع لـ DHCP.

مصطلحين: الـ device هو الكارت نفسه ([[wlp2s0]] واي فاي، و [[enp3s0]] أو [[eth0]] سلك)، والـ connection (أو profile) إعدادات محفوظة باسم: الواي فاي بيتسمّى باسم الشبكة، والسلك غالبًا [[Wired connection 1]]. والـ IP الثابت بيتحط على الـ connection مش على الـ device، فممكن يبقى عندك IP ثابت في شبكة البيت و DHCP في الشغل على نفس الكارت.

• [[nmcli device status]]: كل كارت، ونوعه، وحالته ([[connected]] أو [[disconnected]] أو [[unmanaged]] يعني NetworkManager مش ماسكه)، ومتوصل بأنهي connection.
• [[nmcli dev wifi list]]: الشبكات اللي حواليك: [[SSID]] الاسم، و [[CHAN]] القناة، و [[SIGNAL]] قوة الإشارة من 100، و [[BARS]] نفس الكلام كأعمدة، و [[SECURITY]] (WPA2 أو WPA3 أو [[--]] مفتوحة)، و [[*]] في أول السطر جنب اللي انت عليها. و [[--rescan yes]] يعمل scan جديد دلوقتي.
• [[nmcli --ask dev wifi connect "HomeWiFi"]]: يدخل الشبكة ويسألك الباسورد. [[--ask]] option عام لـ nmcli، فمكانه قبل [[dev]]. وفيه شكل تاني [[password "..."]] في آخر الأمر، بس كده الباسورد هيتسجّل في الـ history.
• [[nmcli con show]]: الـ connections المحفوظة، و [[--active]] اللي شغالة بس.

IP ثابت: [[nmcli con mod "Wired connection 1"]] (modify) وبعده الإعدادات:
• [[ipv4.method manual]] يعني من غير DHCP.
• [[ipv4.addresses 192.168.1.50/24]]: الـ [[/24]] معناها أول ٢٤ bit (أول ٣ أرقام) هما الشبكة، يعني الجهاز ده بيكلّم من 192.168.1.1 لـ 192.168.1.254 مباشرة، وده نفس الـ subnet mask القديم [[255.255.255.0]].
• [[ipv4.gateway 192.168.1.1]] الراوتر، و [[ipv4.dns "1.1.1.1 8.8.8.8"]] الـ DNS.
والإعدادات مبتتطبّقش غير لما تعمل [[nmcli con up "الاسم"]]، وبتتحفظ وتفضل بعد الريستارت. والرجوع: [[ipv4.method auto]] وتفضّي الباقي بـ [[""]]. واختار IP برّه مدى الـ DHCP بتاع الراوتر (من صفحة إعداداته) عشان جهاز تاني مياخدش نفس الرقم. وعلى Desktop وانت قاعد قدام الجهاز nmcli بيشتغل من غير sudo، أما بـ ssh فمحتاجه.

أوبونتو Server غالبًا مفيهوش NetworkManager: الشبكة مكتوبة YAML في [[/etc/netplan/*.yaml]]، و netplan بيحوّلها لإعدادات systemd-networkd. و [[sudo netplan try]] بيطبّق ويستناك ١٢٠ ثانية تدوس Enter، ولو اتقطعت ومعرفتش تأكّد بيرجّع القديم لوحده، وده بالظبط اللي محتاجه على سيرفر بعيد. و [[sudo netplan apply]] يطبّق على طول. و [[gateway4:]] اللي في شروحات قديمة بقت deprecated، والصح [[routes:]] زي الحل تحت. ومن أوبونتو 23.10 حتى NetworkManager على الـ desktop بيحفظ الـ connections كـ YAML في [[/etc/netplan/90-NM-*.yaml]] (جربتها: [[nmcli con mod]] عمل الملف ده). وعلى فيدورا وديبيان الملفات في [[/etc/NetworkManager/system-connections/]].`,
          example: R`nmcli device status
nmcli dev wifi list
nmcli --ask dev wifi connect "HomeWiFi"
nmcli con show
sudo nmcli con mod "Wired connection 1" ipv4.method manual ipv4.addresses 192.168.1.50/24 ipv4.gateway 192.168.1.1 ipv4.dns "1.1.1.1 8.8.8.8"
sudo nmcli con up "Wired connection 1"
ip -br a
sudo nmcli con mod "Wired connection 1" ipv4.method auto ipv4.addresses "" ipv4.gateway "" ipv4.dns ""
sudo nmcli con up "Wired connection 1"`,
          try: R`على جهازك (مش سيرفر بتدخله بـ ssh): اعرض الكروت والشبكات اللي حواليك. اعرف اسم الـ connection اللي انت عليه، وحط IP ثابت في نفس شبكتك (برّه مدى الـ DHCP)، واتأكد بـ [[ip -br a]] و [[ping 1.1.1.1]]، ورجّعه DHCP.`,
          mac: ["diff", R`مفيش nmcli على الماك: [[networksetup -listallhardwareports]] الكروت، و [[networksetup -setmanual "Wi-Fi" 192.168.1.50 255.255.255.0 192.168.1.1]] IP ثابت، و [[networksetup -setdhcp "Wi-Fi"]] رجوع، و [[networksetup -setdnsservers "Wi-Fi" 1.1.1.1]] الـ DNS، و [[networksetup -setairportnetwork en0 HomeWiFi]] يدخل واي فاي.`],
          deep: {
            why: R`سيرفر في البيت أو المكتب (Raspberry Pi، NAS، جهاز Home Assistant) لازم IP بتاعه ميتغيّرش عشان تعمله ssh أو port forwarding. وجهاز من غير واجهة أو بتدخله بـ ssh مفيهوش أيقونة واي فاي تدوس عليها. ولما الشبكة «مش شغالة»، [[nmcli device status]] أسرع تشخيص: الكارت شايف السلك؟ متوصل بأنهي profile؟`,
            how: R`NetworkManager خدمة شغالة طول الوقت، وهي اللي بتكلّم الـ kernel: تشغّل الكارت، وتطلب IP بـ DHCP أو تحط الثابت، وتضيف الـ route، وتقول لـ systemd-resolved على الـ DNS (الدرس الجاي). و nmcli بيكلّمها على D-Bus، فلو الخدمة مش شغالة nmcli مش هيعمل حاجة.

والـ profile ملف محفوظ، و [[con mod]] بيعدّل الملف بس، و [[con up]] بيطبّقه على الكارت. ولما الجهاز يقوم، NetworkManager بيدوّر على أنسب profile لكل كارت ويشغّله لوحده.

وعلى أوبونتو 24.04 بالتحديد، NetworkManager بيكتب الـ profile لـ netplan، و netplan بيولّد ملف [[.nmconnection]] في [[/run]] اللي NetworkManager بيقراه. ودي تفصيلة مهمة لو دوّرت على الملف ومش لاقيه في المكان القديم.`,
            when: R`IP ثابت لجهاز في البيت أو المعمل. تبديل واي فاي من ترمنال ssh على جهاز من غير شاشة (بحذر: لو الواي فاي هو اللي انت داخل منه، هتتقطع). سكربت بيجهّز laptop جديد. وتشخيص «النت مش شغال» قبل ما تدخل في [[ip]] و [[dig]].`,
            mistakes: R`IP ثابت جوه مدى الـ DHCP، فيوم ما الراوتر يدّيه لجهاز تاني يحصل تعارض والاتنين يقطعوا. ونسيان [[/24]]. ونسيان [[con up]] وتفتكر التغيير متطبقش. وتعديل الـ IP على جهاز داخله بـ ssh من غير ما تكون حافظ العنوان الجديد. وعلى سيرفر: [[netplan apply]] بدل [[netplan try]]، أو ملف YAML بمسافات غلط (لازم مسافات مش Tab).`
          },
          teach: R`## [[nmcli]] بيكلّم NetworkManager: يقرا حالة الكروت، ويعدّل الـ profiles، ويطبّقها

[[nmcli]] من NetworkManager command line. اتشغّل NetworkManager 1.46 جوه container أوبونتو 24.04 (مع D-Bus) على شبكة Docker [[192.168.77.0/24]]، فالأرقام عندي [[192.168.77.x]] بدل [[192.168.1.x]]. ومفيش واي فاي في container، فسطور الواي فاي من الـ man page.

---

## ١. [[nmcli device status]]

~~~text الناتج
DEVICE  TYPE      STATE                   CONNECTION
lo      loopback  connected (externally)  lo
eth0    ethernet  connected (externally)  eth0
~~~

| العمود | معناه |
|---|---|
| [[DEVICE]] | الكارت نفسه |
| [[TYPE]] | سلك ([[ethernet]]) ولا واي فاي ([[wifi]]) ولا loopback |
| [[STATE]] | [[connected]] متوصل، و [[disconnected]] لأ، و [[unmanaged]] NetworkManager سايبه |
| [[CONNECTION]] | اسم الـ profile اللي شغال عليه |

و [[(externally)]] يعني الكارت كان متظبط من حاجة تانية (هنا Docker) و NetworkManager بيتفرج عليه بس. وقبل ما أشغّله عليه، الحالة كانت [[unmanaged]]، لأن أوبونتو بيسيب كروت السلك لـ netplan إلا لو متظبط غير كده.

## ٢. [[nmcli dev wifi list]]

[[dev]] اختصار [[device]] (nmcli بيقبل أي بداية مميزة للكلمة). بيعرض الشبكات حواليك بأعمدة [[IN-USE]] (عليها [[*]] لو انت عليها) و [[SSID]] و [[CHAN]] و [[SIGNAL]] و [[BARS]] و [[SECURITY]] (من الـ man page). في الـ container مطلعش حاجة لأن مفيش كارت واي فاي.

## ٣. [[nmcli --ask dev wifi connect "HomeWiFi"]]

[[connect]] وبعده اسم الشبكة، و [[--ask]] يسألك الباسورد بدل ما تكتبه في الأمر. من غير كارت واي فاي:

~~~text الناتج
Error: No Wi-Fi device found.
~~~

## ٤. [[nmcli con show]]

[[con]] = [[connection]]: الـ profiles المحفوظة. بعد ما عملت profile اسمه [[Wired connection 1]]:

~~~text الناتج
NAME                UUID                                  TYPE      DEVICE
lo                  e839cc64-0051-4eb4-ab2e-731df17c17a6  loopback  lo
eth0                82312bcf-647c-45e0-950b-3c7500b1b035  ethernet  eth0
Wired connection 1  56a82edb-a7d8-46b8-ae0d-426b7e2ca374  ethernet  --
~~~

[[UUID]] رقم مميز للـ profile، و [[DEVICE]] [[--]] يعني مش شغال على كارت دلوقتي.

---

## ٥. الـ IP الثابت: [[nmcli con mod]]

~~~bash
sudo nmcli con mod "Wired connection 1" ipv4.method manual ipv4.addresses 192.168.77.50/24 ipv4.gateway 192.168.77.1 ipv4.dns "1.1.1.1 8.8.8.8"
~~~

[[mod]] = modify، وبعد اسم الـ profile أزواج «إعداد قيمة»:

| الإعداد | القيمة | معناها |
|---|---|---|
| [[ipv4.method]] | [[manual]] | من غير DHCP، انا هحدد |
| [[ipv4.addresses]] | [[192.168.77.50/24]] | العنوان، و [[/24]] حجم الشبكة |
| [[ipv4.gateway]] | [[192.168.77.1]] | الراوتر |
| [[ipv4.dns]] | [["1.1.1.1 8.8.8.8"]] | سيرفرات DNS، بين علامات تنصيص عشان فيها مسافة |

الأمر مطبعش حاجة، والكارت لسه زي ما هو: [[mod]] بيعدّل الـ profile المحفوظ بس.

## ٦. [[sudo nmcli con up "Wired connection 1"]]

~~~text الناتج
Connection successfully activated (D-Bus active path: /org/freedesktop/NetworkManager/ActiveConnection/3)
~~~

[[up]] طبّق الـ profile على الكارت. و [[D-Bus active path]] ده اسم داخلي، متشغلش بالك بيه.

## ٧. [[ip -br a]]

~~~text الناتج
lo               UNKNOWN        127.0.0.1/8 ::1/128
eth0@if80        UP             192.168.77.50/24
~~~

وكمان [[ip route]] بقى [[default via 192.168.77.1 dev eth0 proto static metric 100]]، و [[proto static]] يعني متحط يدوي مش من DHCP. و [[ping -c1 1.1.1.1]] رد. وتقدر تقرا القيم المحفوظة:

~~~text nmcli -g ipv4.method,ipv4.addresses,ipv4.gateway,ipv4.dns con show "Wired connection 1"
manual
192.168.77.50/24
192.168.77.1
1.1.1.1,8.8.8.8
~~~

[[-g]] (get-values) القيم بس من غير أسامي.

## ٨ و ٩. الرجوع لـ DHCP

~~~bash
sudo nmcli con mod "Wired connection 1" ipv4.method auto ipv4.addresses "" ipv4.gateway "" ipv4.dns ""
sudo nmcli con up "Wired connection 1"
~~~

[[auto]] = DHCP، و [[""]] قيمة فاضية تمسح اللي كان. وبعدها [[ipv4.method]] بقى [[auto]] و [[ipv4.addresses]] فاضي. والـ [[up]] على شبكة Docker (مفيهاش DHCP) فضل يستنى:

~~~text nmcli --wait 8 con up "Wired connection 1"
Error: Timeout expired (8 seconds)
~~~

~~~text nmcli device status
eth0    ethernet  connecting (getting IP configuration)  Wired connection 1
~~~

[[getting IP configuration]] يعني بيطلب IP من DHCP ومحدش رد. في البيت الراوتر بيرد في ثانية.

---

## الـ profile اتحفظ فين؟

على أوبونتو 24.04، [[con mod]] كتب ملف netplan:

~~~text /etc/netplan/90-NM-56a82edb-....yaml (أوله)
network:
  version: 2
  ethernets:
    NM-56a82edb-a7d8-46b8-ae0d-426b7e2ca374:
      renderer: NetworkManager
      match:
        name: "eth0"
      addresses:
      - "192.168.77.50/24"
      nameservers:
        addresses:
        - 1.1.1.1
        - 8.8.8.8
~~~

## netplan على أوبونتو Server (الحل)

الملف اللي في الحل: [[network:]] ثم [[version: 2]] ثم [[ethernets:]] ثم اسم الكارت، وتحته [[dhcp4: false]] و [[addresses]] و [[routes]] ([[to: default]] و [[via]] الراوتر) و [[nameservers]]. والمسافات لازم مسافات مش Tab. جربته بـ [[netplan generate]] وطلّع ملف systemd-networkd فيه:

~~~text 10-netplan-eth0.network
[Network]
Address=192.168.1.50/24
DNS=1.1.1.1
DNS=8.8.8.8

[Route]
Destination=0.0.0.0/0
Gateway=192.168.1.1
~~~

ولما جربت [[gateway4: 192.168.1.1]] بدل [[routes]]:

~~~text الناتج
** (generate:1575): WARNING **: 08:38:20.579: $__btgateway4$__bt has been deprecated, use default routes instead.
~~~

و [[chmod 600]] لأن netplan بيحذّر لو الملف يتقري من الكل. و [[sudo netplan try]] بيطبّق ويستنى تأكيد ١٢٠ ثانية، ومن غير تأكيد يرجّع القديم (من الـ man page، لأن ده محتاج systemd شغال).

| الأمر | بيعمل إيه |
|---|---|
| [[nmcli device status]] | الكروت وحالتها |
| [[nmcli dev wifi list]] | الشبكات حواليك |
| [[nmcli --ask dev wifi connect اسم]] | ادخل شبكة |
| [[nmcli con show]] | الـ profiles |
| [[nmcli con mod اسم إعداد قيمة]] | عدّل الـ profile |
| [[nmcli con up اسم]] | طبّقه |

## على الماك

مفيش nmcli: [[networksetup]] بيعمل نفس الحاجات ([[-setmanual]] و [[-setdhcp]] و [[-setdnsservers]])، والأوامر في ملاحظة الماك من الـ man page.

## الخلاصة

[[con mod]] يكتب، و [[con up]] يطبّق. والـ IP الثابت = [[manual]] + عنوان بـ [[/24]] + gateway + dns، والرجوع = [[auto]] وتفضّي الباقي.`,
          lines: [
            R`كل كارت وحالته والـ connection اللي عليه.`,
            R`شبكات الواي فاي اللي حواليك وقوة إشارتها.`,
            R`ادخل شبكة HomeWiFi، والباسورد هيتسأل ([[--ask]]) ومش هيتسجّل في الـ history.`,
            R`الـ connections المحفوظة.`,
            R`IP ثابت على connection السلك: من غير DHCP، والعنوان، والراوتر، والـ DNS.`,
            R`طبّق الإعدادات.`,
            R`اتأكد إن العنوان الجديد ظهر.`,
            R`رجّعه DHCP وفضّي الإعدادات اليدوية.`,
            R`طبّق تاني.`
          ],
          sol: R`ده ناتج حقيقي من NetworkManager 1.46 شغال جوه container أوبونتو 24.04 (مع D-Bus و udev) على شبكة Docker [[172.30.0.0/24]] بدل [[192.168.1.0/24]]. [[nmcli device status]] قبل وبعد:
[[DEVICE  TYPE      STATE                   CONNECTION]]
[[eth0    ethernet  connected (externally)  eth0]]
و [[con mod]] لـ [[172.30.0.50/24]] وبعدين [[con up]] طبع [[Connection successfully activated (D-Bus active path: /org/freedesktop/NetworkManager/ActiveConnection/3)]]، و [[ip -br a show eth0]] بقى [[172.30.0.50/24]]، و [[ip route]] بقى [[default via 172.30.0.1 dev eth0 proto static metric 100]]. و [[nmcli -g ipv4.method,ipv4.addresses con show "Wired connection 1"]] طبع [[manual]] و [[172.30.0.50/24]]، واتعمل ملف [[/etc/netplan/90-NM-2fa0a0de-....yaml]] فيه العنوان والـ DNS.

والرجوع لـ [[auto]] على شبكة مفيهاش DHCP (زي شبكة Docker) فضل [[connecting (getting IP configuration)]] و [[--wait 12]] خلص بـ [[Error: Timeout expired (12 seconds)]]؛ على شبكة بيت عادية بياخد IP في ثانية. والواي فاي مش موجود في container: [[nmcli dev wifi connect]] رد [[Error: No Wi-Fi device found.]]، فشكل [[wifi list]] و [[--ask]] من الـ man page بتاعة nmcli. ولو جهاز ظهر [[unmanaged]]: على أوبونتو Server ده متعمّد (netplan ماسكه).

وعلى أوبونتو Server نفس الـ IP الثابت بـ netplan (الملف ده عدّى [[netplan generate]] عندي):`,
          solCode: R`sudo tee /etc/netplan/50-static.yaml >/dev/null <<'EOF'
network:
  version: 2
  ethernets:
    eth0:
      dhcp4: false
      addresses: [192.168.1.50/24]
      routes:
        - to: default
          via: 192.168.1.1
      nameservers:
        addresses: [1.1.1.1, 8.8.8.8]
EOF
sudo chmod 600 /etc/netplan/50-static.yaml
sudo netplan try`
        },
        {
          cmd: "resolvectl",
          title: "الـ DNS اللي جهازك بيستخدمه فعلًا",
          desc: R`[[resolvectl]] بيكلّم systemd-resolved، الخدمة اللي بتحوّل الأسماء لـ IPs على أوبونتو وفيدورا وأغلب التوزيعات الحديثة. بيقولك انت بتسأل أنهي DNS على كل كارت، ويسأل عن اسم زي ما البرامج بتسأل، ويمسح الكاش، ويغيّر الـ DNS مؤقتًا.

ليه [[cat /etc/resolv.conf]] مش كفاية: على أوبونتو هتلاقي فيه [[nameserver 127.0.0.53]]، وده مش الـ DNS بتاعك، ده systemd-resolved نفسه سامع على الجهاز (اسمه stub). كل البرامج بتسأله، وهو بيسأل السيرفرات الحقيقية ويحفظ الردود. و [[/etc/resolv.conf]] هناك symlink لـ [[/run/systemd/resolve/stub-resolv.conf]]، والسيرفرات الحقيقية في [[resolvectl status]]. ومتعدّلش [[/etc/resolv.conf]] بإيدك: بيتكتب فوقه.

• [[resolvectl status]]: جزء [[Global]] وجزء لكل [[Link]] (كارت): [[Current DNS Server]] اللي بيسأله دلوقتي، و [[DNS Servers]] كلهم، و [[DNS Domain]] (في الـ VPN بيحدد أنهي أسماء تروح لـ DNS الشركة)، و [[resolv.conf mode: stub]]. و [[resolvectl dns]] الملخص بس.
• [[resolvectl query example.com]]: الـ IPs، ومن أنهي كارت، و [[Data from: network]] أو [[cache]]، والوقت. و [[-t MX]] نوع سجل تاني (سيرفرات الإيميل). وفرقه عن [[dig]] (درس dig): dig بيسأل سيرفر DNS مباشرة وبيتخطّى اللي النظام بيعمله، و resolvectl بيوريك اللي البرامج بتشوفه فعلًا.
• [[resolvectl flush-caches]]: يمسح الكاش، بعد ما تغيّر سجل DNS ومستعجل تشوف الجديد.
• [[resolvectl statistics]]: أرقام الكاش: [[Current Cache Size]] و [[Cache Hits]] و [[Cache Misses]].
• [[resolvectl dns eth0 9.9.9.9]]: يحط DNS للكارت ده لحد الريستارت أو لحد ما NetworkManager يعيد ضبطه. و [[resolvectl revert eth0]] يشيل كل إعدادات الكارت ده، حتى اللي NetworkManager حاطها، لحد ما الاتصال يقوم تاني.

ولتغيير دايم: [[ipv4.dns]] في nmcli (الدرس اللي فات)، أو [[nameservers]] في netplan، أو [[DNS=]] في [[/etc/systemd/resolved.conf]] للجهاز كله.

فروق التوزيعات: ديبيان مش بيستخدم systemd-resolved افتراضيًا، و [[/etc/resolv.conf]] هناك ملف حقيقي فيه السيرفرات. وعلى أوبونتو 24.04 الخدمة باكدج لوحدها اسمها [[systemd-resolved]]. والأمر القديم [[systemd-resolve --status]] اللي في شروحات كتير مش موجود في أوبونتو 22.04 ولا 24.04 (اتأكدت من الباكدجات)، استخدم resolvectl.`,
          example: R`cat /etc/resolv.conf
resolvectl status
resolvectl dns
resolvectl query example.com
resolvectl query -t MX gmail.com
resolvectl statistics
sudo resolvectl flush-caches
sudo resolvectl dns eth0 9.9.9.9
sudo resolvectl revert eth0`,
          try: R`اعرف جهازك بيسأل أنهي DNS على الواي فاي. اسأل عن [[example.com]] مرتين ورا بعض وقارن [[Data from]] والوقت. امسح الكاش واتأكد من [[resolvectl statistics]] إن [[Current Cache Size]] بقى صفر. (استبدل [[eth0]] باسم كارتك من [[ip -br a]].)`,
          mac: ["diff", R`مفيش resolvectl على الماك: [[scutil --dns]] بيعرض الـ DNS لكل كارت، و [[dscacheutil -q host -a name example.com]] بيسأل زي البرامج، والكاش: [[sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder]].`],
          deep: {
            why: R`«الموقع بيفتح من الموبايل ومش من اللابتوب»، «غيّرت الـ DNS ولسه الدومين بيروح للسيرفر القديم»، «شغّلت VPN وبطّلت أوصل للمواقع الداخلية». كل دول أسئلة: جهازي بيسأل مين؟ والرد جاي من كاش ولا لأ؟ resolvectl بيجاوبهم من غير تخمين.`,
            how: R`أي برنامج عايز يحوّل اسم لـ IP بيسأل مكتبة النظام، وهي بتشوف [[/etc/nsswitch.conf]]: [[/etc/hosts]] الأول، وبعدين (على أوبونتو) [[resolve]] أو [[dns]]، واللي بيروح لـ [[127.0.0.53]]. و systemd-resolved عنده لستة سيرفرات لكل كارت (NetworkManager أو netplan بيبعتهاله)، فبيسأل أنسب واحد، ويحفظ الرد مدة الـ TTL اللي في السجل.

عشان كده ممكن يبقى عندك DNS مختلف على الواي فاي وعلى الـ VPN في نفس الوقت، وكل اسم يروح للصح حسب [[DNS Domain]]. و [[flush-caches]] بيمسح الكاش ده بس؛ المتصفح عنده كاش لوحده.`,
            when: R`بعد ما تغيّر سجل DNS لدومينك: [[flush-caches]] وبعدين [[query]]. VPN وأسماء داخلية مش بتتحل: [[resolvectl status]] وبص على DNS Domain بتاع كارت الـ VPN. شبكة عامة الـ DNS بتاعها بطيء أو بيحجب: [[resolvectl dns wlan0 1.1.1.1]] مؤقتًا. وتأكيد إن [[/etc/hosts]] شغال: [[resolvectl query]] بيرد منه كمان.`,
            mistakes: R`تعدّل [[/etc/resolv.conf]] بإيدك وتلاقيه رجع. وتفتكر [[127.0.0.53]] هو الـ DNS بتاعك. و [[dig]] يرد صح والمتصفح لأ، فتفتكر الـ DNS سليم وهو الكاش أو hosts. و [[resolvectl revert]] على سيرفر بعيد بيعتمد على DNS، فيفقد الـ DNS لحد ما الشبكة تتعمل up.`
          },
          teach: R`## [[resolvectl]] بيوريك الـ DNS اللي جهازك بيسأله فعلًا، ويسأل بنفس طريقة البرامج

اتشغّل systemd-resolved (أوبونتو 24.04، systemd 255) جوه container، و NetworkManager حاطط [[1.1.1.1 8.8.8.8]] على eth0. الـ container فيه حاجة واحدة مختلفة عن جهازك: Docker ماسك [[/etc/resolv.conf]].

---

## ١. [[cat /etc/resolv.conf]]

على أوبونتو Desktop أو Server الملف ده لينك لـ [[/run/systemd/resolve/stub-resolv.conf]]، وده محتواه عندي (من غير التعليقات):

~~~text /run/systemd/resolve/stub-resolv.conf
nameserver 127.0.0.53
options edns0 trust-ad
search .
~~~

[[nameserver 127.0.0.53]] مش سيرفر DNS حقيقي: ده systemd-resolved نفسه سامع على الجهاز. كل البرامج بتسأله، وهو بيسأل السيرفرات الحقيقية. و [[edns0]] امتداد بيسمح بردود أكبر، و [[trust-ad]] يعني صدّق علامة «اتأكد بـ DNSSEC» لو جت. (في الـ container [[/etc/resolv.conf]] فيه [[nameserver 127.0.0.11]] بتاع Docker.)

## ٢. [[resolvectl status]]

~~~text الناتج
Global
         Protocols: -LLMNR -mDNS -DNSOverTLS DNSSEC=no/unsupported
  resolv.conf mode: foreign
Current DNS Server: 127.0.0.11
       DNS Servers: 127.0.0.11

Link 2 (eth0)
    Current Scopes: DNS
         Protocols: +DefaultRoute -LLMNR -mDNS -DNSOverTLS DNSSEC=no/unsupported
       DNS Servers: 1.1.1.1 8.8.8.8
~~~

| السطر | معناه |
|---|---|
| [[Global]] | إعدادات للجهاز كله |
| [[Link 2 (eth0)]] | إعدادات الكارت رقم 2 |
| [[Protocols]] | [[+]] شغال و [[-]] مقفول. [[LLMNR]] و [[mDNS]] طرق تانية لأسماء الشبكة المحلية، و [[DNSOverTLS]] DNS متشفّر |
| [[+DefaultRoute]] | أي اسم ملوش كارت مخصوص يتسأل هنا |
| [[resolv.conf mode]] | [[stub]] على جهاز عادي، و [[foreign]] هنا لأن Docker ماسك الملف |
| [[Current DNS Server]] | اللي بيسأله دلوقتي |
| [[DNS Servers]] | كل اللي ممكن يسألهم |

## ٣. [[resolvectl dns]]

الملخص:

~~~text الناتج
Global: 127.0.0.11
Link 2 (eth0): 1.1.1.1 8.8.8.8
~~~

## ٤. [[resolvectl query example.com]]

~~~text أول مرة
example.com: 104.20.23.154                                  -- link: eth0
             172.66.147.243                                 -- link: eth0
             2606:4700:10::ac42:93f3                        -- link: eth0
             2606:4700:10::6814:179a                        -- link: eth0

-- Information acquired via protocol DNS in 235.1ms.
-- Data is authenticated: no; Data was acquired via local or encrypted transport: no
-- Data from: network
~~~

~~~text تاني مرة على طول
-- Information acquired via protocol DNS in 2.0ms.
-- Data from: cache
~~~

| السطر | معناه |
|---|---|
| العناوين | ٢ IPv4 و ٢ IPv6، و [[link: eth0]] السؤال راح من أنهي كارت |
| [[in 235.1ms]] | الوقت |
| [[authenticated: no]] | مش متأكد بـ DNSSEC |
| [[Data from: network]] | سأل سيرفر فعلًا |
| [[Data from: cache]] | من الكاش، فـ 2ms بدل 235 |

## ٥. [[resolvectl query -t MX gmail.com]]

[[-t]] (type) نوع السجل:

~~~text الناتج
gmail.com IN MX 30 alt3.gmail-smtp-in.l.google.com          -- link: eth0
gmail.com IN MX 20 alt2.gmail-smtp-in.l.google.com          -- link: eth0
gmail.com IN MX 10 alt1.gmail-smtp-in.l.google.com          -- link: eth0
gmail.com IN MX 5 gmail-smtp-in.l.google.com                -- link: eth0
gmail.com IN MX 40 alt4.gmail-smtp-in.l.google.com          -- link: eth0
~~~

## ٦. [[resolvectl statistics]]

~~~text الناتج (الجزء المهم)
Transactions
                         Total Transactions: 10
Cache
                         Current Cache Size:  3
                                 Cache Hits:  2
                                 Cache Misses:  9
~~~

[[Cache Size]] كام إجابة محفوظة، و [[Hits]] كام مرة جاوب من الكاش، و [[Misses]] كام مرة اضطر يسأل بره.

## ٧. [[sudo resolvectl flush-caches]]

مبيطبعش حاجة. وبعده:

~~~text resolvectl statistics | grep "Cache Size"
                         Current Cache Size:  0
~~~

## ٨ و ٩. [[resolvectl dns eth0 9.9.9.9]] و [[resolvectl revert eth0]]

~~~text resolvectl dns بعد السطر ٨
Global: 127.0.0.11
Link 2 (eth0): 9.9.9.9
~~~

~~~text resolvectl dns بعد السطر ٩
Global: 127.0.0.11
Link 2 (eth0):
~~~

[[revert]] شال كل حاجة على eth0، حتى [[1.1.1.1 8.8.8.8]] اللي NetworkManager كان حاططهم. بيرجعوا لما الاتصال يقوم تاني ([[nmcli con up]]).

---

| الأمر | بيجاوب على |
|---|---|
| [[resolvectl status]] | بسأل مين على كل كارت؟ |
| [[resolvectl dns]] | نفسه باختصار |
| [[resolvectl query اسم]] | العنوان إيه، ومن الكاش ولا لأ؟ |
| [[resolvectl statistics]] | الكاش فيه كام؟ |
| [[resolvectl flush-caches]] | امسح الكاش |
| [[resolvectl dns كارت سيرفر]] | غيّر مؤقتًا |
| [[resolvectl revert كارت]] | شيل إعدادات الكارت |

وجربت إن الأمر القديم [[systemd-resolve]] مش موجود على 24.04 ([[which]] مرجّعش حاجة).

## على الماك

مفيش resolvectl. [[scutil --dns]] بيعرض السيرفرات لكل كارت، و [[dscacheutil -q host -a name example.com]] بيسأل زي البرامج (من دليل Apple).

## الخلاصة

[[127.0.0.53]] في resolv.conf هو الوسيط، والسيرفرات الحقيقية في [[resolvectl status]]. و [[Data from: cache]] بتقولك الرد قديم ولا جديد.`,
          lines: [
            R`على أوبونتو: [[127.0.0.53]] يعني systemd-resolved، مش الـ DNS الحقيقي.`,
            R`السيرفرات الحقيقية لكل كارت وإعداداتها.`,
            R`السيرفرات بس، سطر لكل كارت.`,
            R`اسأل زي البرامج: الـ IPs، ومن الشبكة ولا الكاش.`,
            R`سجلات MX (سيرفرات الإيميل) بدل A.`,
            R`أرقام الكاش: حجمه و hits و misses.`,
            R`امسح الكاش.`,
            R`DNS مؤقت لكارت eth0.`,
            R`شيل إعدادات eth0 اللي اتحطت يدوي.`
          ],
          sol: R`ناتج حقيقي من systemd-resolved شغال جوه container أوبونتو 24.04، والـ DNS الأساسي جاي من Docker ([[127.0.0.11]]) و NetworkManager حاطط [[1.1.1.1 8.8.8.8]] على eth0. [[resolvectl dns]] طبع:
[[Global: 127.0.0.11]]
[[Link 2 (eth0): 1.1.1.1 8.8.8.8]]
و [[resolvectl query example.com]] أول مرة: ٤ عناوين ([[104.20.23.154]] و [[172.66.147.243]] واتنين IPv6) كل واحد جنبه [[-- link: eth0]]، وتحتهم [[-- Information acquired via protocol DNS in 45.2ms.]] و [[-- Data from: network]]. وتاني مرة: [[in 1.0ms]] و [[Data from: cache]]. و [[-t MX gmail.com]] طبع [[gmail.com IN MX 5 gmail-smtp-in.l.google.com]] وأربعة تانيين.

[[resolvectl statistics]] طبع [[Current Cache Size: 3]] و [[Cache Hits: 2]] و [[Cache Misses: 9]]، وبعد [[flush-caches]] الحجم بقى [[0]]. و [[resolvectl dns eth0 9.9.9.9 149.112.112.112]] غيّر سطر eth0، و [[revert]] فضّاه خالص. وملف الـ stub ([[/run/systemd/resolve/stub-resolv.conf]]) فيه [[nameserver 127.0.0.53]] و [[options edns0 trust-ad]]. وفي الـ container [[resolv.conf mode]] طلع [[foreign]] لأن Docker ماسك [[/etc/resolv.conf]]؛ على أوبونتو Desktop بيبقى [[stub]].`
        },
        {
          cmd: "ip link و ip addr add",
          title: "شغّل وطفّي كارت وزوّد IP مؤقت",
          desc: R`[[ip link]] بيتحكم في الكارت نفسه (شغال ولا مطفي، والـ MTU، والعدّادات)، و [[ip addr]] في العناوين اللي عليه. درس «ip a / ip route» كان للقراية، وده للتغيير، وكل التغييرات دي مؤقتة: بتروح مع الريستارت أو لما NetworkManager أو netplan يعيد ضبط الكارت.

[[ip -br a]] (brief) سطر لكل كارت: الاسم، و [[UP]] أو [[DOWN]]، والعناوين. و [[ip -br link]] نفس الكلام بالـ MAC والـ flags: [[UP]] الكارت متشغّل، و [[LOWER_UP]] السلك متوصل فعلًا (أو الواي فاي مربوط). ولو [[UP]] من غير [[LOWER_UP]]، الكارت شغال بس مفيش كابل. و [[eth0@if76]] جوه Docker معناها إن الطرف التاني للكارت ده هو الكارت رقم 76 عند الـ host.

[[sudo ip link set dev eth0 down]] يطفي الكارت و [[up]] يشغّله. خطر: لو داخل بـ ssh على نفس الكارت، الاتصال هيتقطع ومش هتعرف تكتب [[up]]. وحاجة اكتشفتها وانا بجرّب: بعد down و up، الـ default route اتمسح ومرجعش لوحده ([[ip route]] بقى فيه سطر الشبكة المحلية بس)، فالجهاز بيكلّم اللي جنبه بس ومفيش نت، لحد ما NetworkManager يرجّعه أو تكتبه انت: [[sudo ip route add default via 192.168.1.1]]. فعلى سيرفر بعيد متطفيش الكارت اللي داخل منه؛ ولو محتاج تعيد ضبطه، [[sudo netplan apply]] أو [[sudo nmcli con up "الاسم"]].

[[sudo ip addr add 10.0.0.5/24 dev eth0]] يضيف عنوان تاني على نفس الكارت من غير ما يشيل الأول. و [[/24]] لازم: من غيره بيتحسب [[/32]] (عنوان لوحده من غير شبكة)، فالجهاز ميعرفش إن 10.0.0.x جنبه. و [[label eth0:lab]] اسم للعنوان (شكل قديم من أيام ifconfig). و [[ip addr del]] بنفس الكتابة بالظبط يشيله، ولو العنوان موجود قبل كده: [[Error: ipv4: Address already assigned.]] الاستخدام: توصل لجهاز إعداداته الافتراضية على شبكة تانية (راوتر أو كاميرا جديدة على [[192.168.0.1]] وانت على [[192.168.1.x]])، أو تجرّب سيرفر بيسمع على IP معين.

[[ip -s link show eth0]] (statistics): [[RX]] اللي استقبله و [[TX]] اللي بعته: bytes و packets، و [[errors]] و [[dropped]]. لو بيزيدوا باستمرار فيه مشكلة في السلك أو الكارت أو الـ driver. و [[-h]] (human) الأرقام بـ k و M. و [[ip link set eth0 mtu 1400]] يغيّر أكبر packet الكارت بيبعته (بيحتاجه أحيانًا مع VPN)، و [[ip -c]] بالألوان، و [[ip -j]] بـ JSON للسكربتات.

وعشان أي حاجة من دول تبقى دايمة: nmcli أو netplan (درس nmcli).`,
          example: R`ip -br a
ip -br link
sudo ip addr add 10.0.0.5/24 dev eth0
ip -br a show eth0
sudo ip addr del 10.0.0.5/24 dev eth0
ip -s -h link show eth0
# متعملش السطور دي على جهاز داخله بـ ssh على نفس الكارت
sudo ip link set dev eth0 down
sudo ip link set dev eth0 up
ip route`,
          try: R`على جهازك (استبدل eth0 باسم كارتك من [[ip -br a]]): زوّد عنوان [[10.0.0.5/24]] واتأكد إنه ظهر جنب الأصلي، وشيله. واقرا عدّادات الكارت مرتين بينهم [[curl]] لملف كبير وقارن RX.`,
          mac: ["diff", R`مفيش ip على الماك: [[sudo ifconfig en0 alias 10.0.0.5 255.255.255.0]] يضيف عنوان، و [[sudo ifconfig en0 -alias 10.0.0.5]] يشيله، و [[sudo ifconfig en0 down]] و [[up]]، والعدّادات [[netstat -ibn]].`],
          deep: {
            why: R`ساعات محتاج تغيير سريع للتجربة من غير ما تلمس الإعدادات المحفوظة: توصل لجهاز جديد على شبكة تانية، أو تعيد تشغيل كارت معلّق، أو تتأكد إن السلك نفسه فيه errors. و [[ip]] بيعمل ده فورًا، والريستارت بيرجّع كل حاجة زي ما كانت، وده أمان في التجارب.`,
            how: R`[[ip]] بيكلّم الـ kernel مباشرة (عن طريق netlink)، فالتغيير بيحصل لحظتها، بس مفيش حاجة بتتكتب على الديسك. وعشان كده NetworkManager أو systemd-networkd (اللي بيمسكوا الكارت) ممكن يرجّعوا إعداداتهم فوق تغييرك في أي لحظة (لما الـ DHCP يتجدّد مثلًا).

ولما الكارت يقع (down)، الـ kernel بيمسح كل الـ routes اللي بتعدّي عليه، ولما يقوم (up) بيرجّع بس الـ route للشبكة المحلية اللي محسوبة من العنوان، أما الـ default route فكان حد حطه (DHCP أو NetworkManager)، فلازم حد يحطه تاني.

والعنوان التاني على نفس الشبكة بيتعلّم [[secondary]]، ولو مسحت العنوان الأساسي الـ kernel ممكن يمسح الـ secondary معاه.`,
            when: R`جهاز جديد على شبكة تانية: [[ip addr add 192.168.0.50/24 dev eth0]] وتفتح صفحته وتغيّر إعداداته وتشيل العنوان. كارت معلّق: down و up (من console مش ssh). مشكلة سرعة أو انقطاع: [[ip -s link]] مرتين وتشوف errors بتزيد. واختبار تطبيق بيسمع على IP معين في جهاز عليه أكتر من عنوان.`,
            mistakes: R`[[ip link set eth0 down]] على السيرفر من ssh. والعنوان من غير [[/24]] فيبقى [[/32]] ومحدش يوصله. وإنك تعتمد على تغيير بـ [[ip]] وتنساه، وبعد الريستارت تستغرب. وإنك تمسح العنوان الأساسي بالغلط بدل التاني (اكتب العنوان كامل في [[del]]).`
          },
          teach: R`## [[ip link]] للكارت نفسه، و [[ip addr]] للعناوين اللي عليه، والتغيير فوري ومؤقت

اتشغّل على container أوبونتو 24.04 بـ [[--cap-add NET_ADMIN]] (صلاحية تعديل الشبكة جوه الـ container بس) على شبكة Docker [[192.168.77.0/24]]، وعنوان الجهاز [[192.168.77.5]]. جوه الـ container كنت root، فمن غير [[sudo]].

---

## ١. [[ip -br a]]

~~~text الناتج
lo               UNKNOWN        127.0.0.1/8 ::1/128
eth0@if50        UP             192.168.77.5/24
~~~

سطر لكل كارت: الاسم، والحالة، والعناوين.

## ٢. [[ip -br link]]

~~~text الناتج
lo               UNKNOWN        00:00:00:00:00:00 <LOOPBACK,UP,LOWER_UP>
eth0@if50        UP             46:29:0d:23:94:a7 <BROADCAST,MULTICAST,UP,LOWER_UP>
~~~

[[link]] = الكارت نفسه مش العناوين. العمود التالت الـ MAC، والأخير الـ flags:

| الـ flag | معناه |
|---|---|
| [[UP]] | الكارت متشغّل (انت أو النظام شغّلته) |
| [[LOWER_UP]] | فيه وصلة فعلًا: سلك متوصل أو واي فاي مربوط |
| [[BROADCAST]] و [[MULTICAST]] | الكارت بيدعم يبعت للكل أو لمجموعة |
| [[LOOPBACK]] | ده الـ loopback |

## ٣. [[sudo ip addr add 10.0.0.5/24 dev eth0]]

[[add]] ضيف، والعنوان بالـ [[/24]]، و [[dev eth0]] على أنهي كارت. مبيطبعش حاجة لو نجح.

## ٤. [[ip -br a show eth0]]

[[show eth0]] الكارت ده بس:

~~~text الناتج
eth0@if50        UP             192.168.77.5/24 10.0.0.5/24
~~~

العنوانين جنب بعض. ومن [[ip a show eth0]]:

~~~text الناتج (سطور inet)
    inet 192.168.77.5/24 brd 192.168.77.255 scope global eth0
    inet 10.0.0.5/24 scope global eth0
~~~

ولما زوّدت عنوان تاني **من نفس الشبكة** ([[192.168.77.25/24]]):

~~~text الناتج
    inet 192.168.77.25/24 scope global secondary eth0
~~~

[[secondary]] يعني تاني عنوان في نفس الشبكة. وإضافة عنوان موجود:

~~~text الناتج
Error: ipv4: Address already assigned.
~~~

### من غير [[/24]]

~~~text ip addr add 10.9.9.9 dev eth0 ثم ip a
    inet 10.9.9.9/32 scope global eth0
~~~

[[/32]] = العنوان ده لوحده، شبكة فيها جهاز واحد، فالجهاز ميعرفش إن [[10.9.9.x]] جنبه.

## ٥. [[sudo ip addr del 10.0.0.5/24 dev eth0]]

[[del]] بنفس الكتابة بالظبط. وبعدها [[ip -br a show eth0]] رجع [[192.168.77.5/24]] بس.

## ٦. [[ip -s -h link show eth0]]

[[-s]] (statistics) العدّادات، و [[-h]] (human) بـ k و M:

~~~text الناتج
    RX:  bytes packets errors dropped  missed   mcast
          158M    177k      0       0       0       0
    TX:  bytes packets errors dropped carrier collsns
         8.95M    140k      0       0       0       0
~~~

| العمود | معناه |
|---|---|
| [[RX]] | اللي استقبله الكارت، و [[TX]] اللي بعته |
| [[bytes]] و [[packets]] | الحجم والعدد من ساعة ما الكارت قام |
| [[errors]] | packets بايظة |
| [[dropped]] | اتعمل لها drop (مفيش مكان، أو نوع مش مدعوم) |
| [[missed]] و [[carrier]] و [[collsns]] | مشاكل على مستوى السلك نفسه |

158M استقبال مقابل 8.95M إرسال لأن الـ container ده حمّل باكدجات وملفات كتير. و errors صفر: تمام.

---

## ٧ و ٨. [[ip link set dev eth0 down]] ثم [[up]]

[[set]] غيّر، و [[down]] اطفي. بعدها:

~~~text ip -br link show eth0
eth0@if50        DOWN           46:29:0d:23:94:a7 <BROADCAST,MULTICAST>
~~~

~~~text ping -c1 192.168.77.10
ping: connect: Network is unreachable
~~~

و [[ip route]] مطبعش ولا سطر: الـ kernel مسح كل الـ routes اللي على الكارت.

وبعد [[up]]:

~~~text ip -br link show eth0
eth0@if50        UP             46:29:0d:23:94:a7 <BROADCAST,MULTICAST,UP,LOWER_UP>
~~~

## ٩. [[ip route]]

~~~text الناتج
192.168.77.0/24 dev eth0 proto kernel scope link src 192.168.77.5
~~~

سطر الشبكة المحلية رجع لوحده (الـ kernel بيحسبه من العنوان)، بس [[default via]] **مرجعش**، و [[ping 1.1.1.1]] قال [[Network is unreachable]]. رجّعته بإيدي:

~~~text ip route add default via 192.168.77.1 ثم ip route
default via 192.168.77.1 dev eth0
192.168.77.0/24 dev eth0 proto kernel scope link src 192.168.77.5
~~~

و [[ping 1.1.1.1]] رد. على جهاز عادي NetworkManager أو netplan بيرجّعه لوحده غالبًا.

| الأمر | بيعمل إيه |
|---|---|
| [[ip -br link]] | الكروت والـ MAC والـ flags |
| [[ip addr add IP/24 dev كارت]] | عنوان إضافي مؤقت |
| [[ip addr del IP/24 dev كارت]] | شيله |
| [[ip -s -h link show كارت]] | العدّادات |
| [[ip link set dev كارت down/up]] | اطفي وشغّل |
| [[ip route add default via راوتر]] | رجّع الطريق للنت |

## على الماك

مفيش [[ip]]: [[ifconfig en0 alias]] و [[-alias]] و [[down]] و [[up]]، والعدّادات [[netstat -ibn]] (من الـ man page، والأوامر في ملاحظة الماك).

## الخلاصة

كل ده بيتمسح مع الريستارت. و down/up بيمسح الـ default route، فمتعملهاش على الكارت اللي داخل منه بـ ssh.`,
          lines: [
            R`العناوين: سطر لكل كارت.`,
            R`الكروت: الحالة والـ MAC والـ flags.`,
            R`زوّد عنوان تاني (مؤقت) على eth0، والـ [[/24]] بتعرّفه الشبكة.`,
            R`اتأكد: العنوانين جنب بعض.`,
            R`شيل العنوان التاني بنفس الكتابة.`,
            R`عدّادات الكارت ([[-s]]) بأرقام مقروءة ([[-h]]): RX و TX و errors و dropped.`,
            R`اطفي الكارت.`,
            R`شغّله.`,
            R`بص على الـ routes: الـ default ممكن يكون اتمسح.`
          ],
          sol: R`ناتج حقيقي من container أوبونتو 24.04 بـ [[--cap-add NET_ADMIN]] على شبكة Docker. [[ip -br link]]: [[eth0@if76 UP da:58:98:f5:39:3f <BROADCAST,MULTICAST,UP,LOWER_UP>]]. بعد [[ip addr add 172.30.0.25/24 dev eth0]]، [[ip -br a show eth0]] بقى [[eth0@if76 UP 172.30.0.20/24 172.30.0.25/24]]، و [[ip a]] كتب جنب التاني [[scope global secondary eth0]]. وإضافة نفس العنوان تاني: [[Error: ipv4: Address already assigned.]].

[[ip -s -h link show eth0]]:
[[RX:  bytes packets errors dropped  missed   mcast]]
[[41.8M   29.7k      0       0       0       0]]
[[TX:  bytes packets errors dropped carrier collsns]]
[[1.37M   19.9k      0       0       0       0]]

وبعد [[down]]: [[eth0@if76 DOWN ... <BROADCAST,MULTICAST>]] و [[ping]] قال [[ping: connect: Network is unreachable]]. وبعد [[up]] الكارت رجع [[LOWER_UP]]، بس [[ip route]] كان فيه سطر واحد [[172.30.0.0/24 dev eth0 proto kernel scope link src 172.30.0.20]] من غير default، ورجع لما كتبت [[ip route add default via 172.30.0.1]].`
        },
        {
          cmd: "nft و iptables -L",
          title: "اقرا الفايروول وابني واحد بسيط",
          desc: R`الفايروول في لينكس جوه الـ kernel نفسه (اسمه netfilter)، و [[nft]] (nftables) هي الأداة الحالية اللي بتقراه وتكتبه، و [[iptables]] الأداة القديمة اللي لسه موجودة. و [[ufw]] (شوف درس «ufw» في تاب «VPS») و firewalld في فيدورا واجهات أسهل بتكتب نفس القواعد من تحت. الدرس ده عشان «تقرا» اللي موجود فعلًا، وتعمل فايروول صغير بإيدك لو محتاج.

القراية: [[sudo nft list ruleset]] بيطبع كل حاجة:
• [[table]] مجموعة قواعد ليها عيلة: [[ip]] لـ IPv4، و [[ip6]]، و [[inet]] للاتنين مع بعض.
• جوه الجدول [[chain]] وفيها [[hook]] بيقول إمتى تشتغل: [[input]] اللي داخل للجهاز، و [[output]] اللي خارج منه، و [[forward]] اللي معدّي (Docker والراوتر).
• [[policy drop]] يعني اللي ميطابقش أي قاعدة يترمي، و [[policy accept]] يعدّي.
• كل قاعدة شرط وبعده [[accept]] أو [[drop]]، و [[counter]] بيعد الـ packets اللي طابقتها.
و [[sudo nft list tables]] أسامي الجداول بس.

[[sudo iptables -L -n -v]]: [[-L]] (list) و [[-n]] أرقام من غير أسامي (أسرع) و [[-v]] العدّادات والكارت. على أوبونتو 22.04 و 24.04 وديبيان 11+ وفيدورا، [[iptables]] نفسه بقى [[iptables-nft]]: بيكتب في nftables بشكل iptables، و [[iptables -V]] بيقول [[(nf_tables)]]. عشان كده جداول ufw و Docker بتظهر في [[nft list ruleset]] مع سطر [[# Warning: table ip nat is managed by iptables-nft, do not touch!]] (يعني عدّلها بـ iptables مش nft). والعكس مش صحيح: قواعد اتكتبت بـ [[nft]] مباشرة مبتظهرش في [[iptables -L]] خالص، فـ [[iptables -L]] فاضي مش معناه مفيش فايروول (جربتها). ولو شفت [[# Warning: iptables-legacy tables present]]، فيه برنامج بيستخدم الطريقة القديمة، و [[sudo iptables-legacy -L]] يوريهم.

الفايروول الصغير اللي في المثال: جدول باسمنا [[myfw]] فيه chain على [[input]] بـ [[policy drop]]، و:
• [[ct state established,related accept]]: اقبل الردود على اتصالات الجهاز بدأها. من غيرها هتقطع النت عن نفسك ([[apt]] و [[curl]] مش هيوصلهم رد).
• [[ct state invalid drop]]: ارمي الـ packets اللي ملهاش معنى.
• [[iif "lo" accept]]: الجهاز يكلّم نفسه (127.0.0.1).
• [[icmp]] و [[ipv6-icmp]]: الـ ping، و IPv6 مبيشتغلش من غير icmpv6.
• [[tcp dport 22 accept]] الـ SSH، و [[{ 80, 443 }]] لستة بورتات.
وأول سطرين [[table inet myfw]] و [[delete table inet myfw]] بيمسحوا نسختنا القديمة بس، عشان تعيد التحميل كذا مرة من غير ما تلمس جداول Docker و ufw. أما [[flush ruleset]] اللي في [[/etc/nftables.conf]] الافتراضي فبيمسح كل حاجة، بما فيها قواعد Docker، فالـ containers تفقد النت لحد ما Docker يعمل ريستارت.

متقفلش على نفسك: [[sudo nft -c -f]] (check) يفحص الملف من غير ما يطبّقه. وقبل ما تطبّق على سيرفر بعيد، شغّل «زرار رجوع» في الخلفية: [[sudo sh -c 'sleep 120; nft delete table inet myfw' &]]، وطبّق، وجرّب تفتح ssh جديد من جهازك. لو نجح الغي الرجوع بـ [[kill %1]]، ولو اتقفلت برّه هيترجع لوحده بعد دقيقتين. وعشان يفضل بعد الريستارت: حط الملف في [[/etc/nftables.conf]] (أو [[include]] منه) و [[sudo systemctl enable nftables]]. ومتشغّلش ufw و nftables.conf بتاعك مع بعض على نفس الجهاز: اختار واحد.`,
          example: R`sudo nft list ruleset
sudo nft list tables
iptables -V
sudo iptables -L -n -v
# فايروول صغير: SSH و 80 و 443 بس
cat > myfw.nft <<'EOF'
table inet myfw
delete table inet myfw
table inet myfw {
  chain input {
    type filter hook input priority 0; policy drop;
    ct state established,related accept
    ct state invalid drop
    iif "lo" accept
    meta l4proto { icmp, ipv6-icmp } accept
    tcp dport 22 counter accept
    tcp dport { 80, 443 } counter accept
  }
}
EOF
sudo nft -c -f myfw.nft
sudo sh -c 'sleep 120; nft delete table inet myfw' &
sudo nft -f myfw.nft
sudo nft list table inet myfw
kill %1`,
          try: R`في VM أو container بـ [[--privileged]] (مش السيرفر الحقيقي ولا جهازك): اقرا الجداول الموجودة. اعمل الملف وطبّقه، وشغّل برنامج بيسمع على بورت مش في اللستة ([[nc -lk -p 8080]]) وجرّب توصله من جهاز تاني، وقارن بـ 22. واقرا الـ counters بعدها.`,
          flag: "script danger",
          mac: ["diff", R`الماك فايروول تاني اسمه pf: [[sudo pfctl -s rules]] القواعد و [[sudo pfctl -s info]] الحالة. وفايروول الإعدادات (Application Firewall): [[/usr/libexec/ApplicationFirewall/socketfilterfw --getglobalstate]].`],
          deep: {
            why: R`ufw كفاية في أغلب الوقت، بس هتقابل سيرفرات فيها قواعد من Docker و fail2ban و ufw و حاجات حد كتبها زمان، ومحتاج تعرف «إيه اللي بيرمي الـ packet بتاعتي؟». ده مش هيبان غير من [[nft list ruleset]]. وأحيانًا محتاج قاعدة ufw مبيعرفهاش، أو جهاز من غير ufw خالص.`,
            how: R`كل packet داخلة للجهاز بتعدّي على كل الـ chains اللي متعلّقة على hook [[input]]، بالترتيب حسب الـ [[priority]]، وجوه كل chain القواعد من فوق لتحت. أول قاعدة تقول accept أو drop بتحسم الـ chain دي. ولو packet اتعمل لها drop في أي chain، خلاص. عشان كده جدولنا وجدول ufw لو الاتنين شغالين، الـ packet لازم تعدّي من الاتنين.

و [[ct state]] بييجي من connection tracking: الـ kernel فاكر كل اتصال بدأ، فالرد عليه بيتعلّم [[established]]، وده اللي بيخلي [[policy drop]] على input متقطعش اتصالاتك الخارجة.

و [[nft -f]] بيطبّق الملف كله كعملية واحدة (atomic): يا كله يتطبّق يا ولا حاجة، فمفيش لحظة الفايروول فيها نصه متطبّق.`,
            when: R`تشخيص: البورت فاتح في البرنامج ([[ss -tlnp]]) بس مش واصل من بره: [[nft list ruleset]] وبص على الـ counters. جهاز من غير ufw (فيدورا أو ديبيان minimal) ومحتاج فايروول بسيط. ومراجعة إيه اللي Docker فاتحه فعلًا.`,
            mistakes: R`[[policy drop]] من غير [[established,related]]، فتقطع ردود كل حاجة. ومن غير قاعدة 22 على سيرفر بعيد، فتقفل على نفسك (ومن غير زرار الرجوع). و [[flush ruleset]] على جهاز عليه Docker. وإنك تتطمّن لأن [[iptables -L]] فاضي. وتعديل جداول ufw أو Docker بـ nft مباشرة: هيترجعوا لوحدهم أو يبوّظوا.`
          },
          teach: R`## [[nft]] بيقرا ويكتب قواعد الفايروول اللي جوه الـ kernel، و [[iptables]] الأداة القديمة لنفس الحاجة

اتشغّل كل المثال على container أوبونتو 24.04 بـ [[--cap-add NET_ADMIN]]، فالقواعد اتطبّقت على شبكة الـ container بس مش على جهازي. الـ container عنوانه [[192.168.77.5]] وعليه SSH على 22 وبرنامج ([[nc]]) على 8080، وفيه container تاني [[192.168.77.10]] بيجرّب يوصله. جوه الـ container كنت root.

---

## ١. [[sudo nft list ruleset]]

[[list ruleset]] اطبع كل الجداول والقواعد:

~~~text الناتج
# Warning: table ip nat is managed by iptables-nft, do not touch!
table ip nat {
	chain DOCKER_OUTPUT {
		ip daddr 127.0.0.11 tcp dport 53 counter packets 0 bytes 0 dnat to 127.0.0.11:37313
		ip daddr 127.0.0.11 udp dport 53 counter packets 93 bytes 5973 dnat to 127.0.0.11:45790
	}

	chain OUTPUT {
		type nat hook output priority dstnat; policy accept;
		ip daddr 127.0.0.11 counter packets 93 bytes 5973 jump DOCKER_OUTPUT
	}
	...
}
~~~

ده جدول Docker بيحوّل أسئلة الـ DNS لسيرفر Docker الداخلي. نقرا الكلمات:

| الكلمة | معناها |
|---|---|
| [[table ip nat]] | جدول اسمه nat، لـ IPv4 ([[ip]]) |
| [[chain]] | مجموعة قواعد |
| [[type nat hook output]] | الـ chain دي متعلّقة على الـ packets الخارجة |
| [[policy accept]] | اللي ميطابقش يعدّي |
| [[ip daddr 127.0.0.11 udp dport 53]] | شرط: رايح لـ [[127.0.0.11]] على UDP بورت 53 |
| [[counter packets 93 bytes 5973]] | طابقت ٩٣ مرة |
| [[dnat to]] و [[jump]] | الفعل: غيّر العنوان، أو روح لـ chain تانية |

والتحذير فوق: الجدول ده اتكتب بـ [[iptables]]، فمتعدّلوش بـ nft.

## ٢. [[sudo nft list tables]]

~~~text الناتج
table ip nat
~~~

## ٣. [[iptables -V]]

~~~text الناتج
iptables v1.8.10 (nf_tables)
~~~

[[(nf_tables)]] = الأمر اسمه iptables بس بيكتب في nftables من تحت.

## ٤. [[sudo iptables -L -n -v]]

[[-L]] list، و [[-n]] أرقام، و [[-v]] العدّادات:

~~~text الناتج
Chain INPUT (policy ACCEPT 0 packets, 0 bytes)
 pkts bytes target     prot opt in     out     source               destination

Chain FORWARD (policy ACCEPT 0 packets, 0 bytes)
...
Chain OUTPUT (policy ACCEPT 0 packets, 0 bytes)
...
~~~

فاضي، لأن [[-L]] من غير [[-t]] بيعرض جدول [[filter]] بس، وجدول Docker اسمه [[nat]].

---

## ٥ لـ ١٩. ملف الفايروول

[[cat > myfw.nft <<'EOF']] بيكتب السطور اللي بعده في الملف لحد سطر [[EOF]] (الـ heredoc). و [['EOF']] بين علامات تنصيص عشان الشيل ميغيّرش أي حاجة جوه. الملف نفسه:

### أول ٣ سطور: امسح نسختنا القديمة بس

~~~text
table inet myfw
delete table inet myfw
table inet myfw {
~~~

- [[table inet myfw]] من غير أقواس: اعمل الجدول لو مش موجود (ولو موجود متعملش حاجة).
- [[delete table inet myfw]]: امسحه. الاتنين مع بعض = «امسحه لو موجود» من غير error.
- [[table inet myfw {]]: اعمله من جديد. [[inet]] = IPv4 و IPv6 مع بعض.

### الـ chain

~~~text
  chain input {
    type filter hook input priority 0; policy drop;
~~~

| الحتة | معناها |
|---|---|
| [[chain input]] | اسمها input (أي اسم) |
| [[type filter]] | نوعها فلترة (قبول ورفض) |
| [[hook input]] | على الـ packets الداخلة للجهاز |
| [[priority 0]] | ترتيبها بين الـ chains التانية على نفس الـ hook |
| [[policy drop]] | اللي ميطابقش أي قاعدة يترمي |

### القواعد، من فوق لتحت، وأول واحدة تطابق تحسم

| القاعدة | معناها |
|---|---|
| [[ct state established,related accept]] | ردود على اتصالات الجهاز بدأها: اقبل. [[ct]] = connection tracking |
| [[ct state invalid drop]] | packets ملهاش اتصال معروف: ارمي |
| [[iif "lo" accept]] | جاية من الـ loopback ([[iif]] = input interface): اقبل |
| [[meta l4proto { icmp, ipv6-icmp } accept]] | الـ ping بنوعيه. [[{ }]] لستة |
| [[tcp dport 22 counter accept]] | رايح لبورت 22: عِد واقبل. [[dport]] = destination port |
| [[tcp dport { 80, 443 } counter accept]] | 80 أو 443 |

وبعدها [[}]] قفلة الـ chain، و [[}]] قفلة الجدول، و [[EOF]] آخر الملف.

---

## ٢٠. [[sudo nft -c -f myfw.nft]]

[[-f]] (file) اقرا من الملف، و [[-c]] (check) افحص بس. على الملف السليم مطبعش حاجة. وعلى ملف فيه غلط:

~~~text nft -c -f bad.nft
bad.nft:1:1-1: Error: syntax error, unexpected number
1.2
^
~~~

بيقولك الملف والسطر والعمود، ويشاور على الغلط.

## ٢١. [[sudo sh -c 'sleep 120; nft delete table inet myfw' &]]

زرار الرجوع: [[sh -c]] يشغّل الأمرين ورا بعض: استنى ١٢٠ ثانية، وبعدين امسح الجدول. و [[&]] في الآخر يخليه في الخلفية ويرجّعلك الترمنال، و [[jobs]] بيوريه:

~~~text jobs
[1]+  Running                 sh -c "sleep 4; nft delete table inet myfw" &
~~~

(جربت بـ ٤ ثواني بدل ١٢٠.) و [[1]] بين القوسين رقم الـ job، ودي اللي [[%1]] بتشاور عليها بعدين.

## ٢٢. [[sudo nft -f myfw.nft]]

طبّق. ومن الـ container التاني:

~~~text nc -zv -w 3 192.168.77.5 22 ثم 8080
Connection to 192.168.77.5 22 port [tcp/ssh] succeeded!
nc: connect to 192.168.77.5 port 8080 (tcp) timed out: Operation now in progress
~~~

22 عدّى. و 8080 [[timed out]] مش refused: [[drop]] بيرمي من غير رد، فاللي بيتصل مبيعرفش حاجة. وفي نفس الوقت [[curl https://example.com]] من الجهاز نفسه رجع [[200]]: الرد دخل بسبب [[established,related]].

## ٢٣. [[sudo nft list table inet myfw]]

~~~text الناتج
table inet myfw {
	chain input {
		type filter hook input priority filter; policy drop;
		ct state established,related accept
		ct state invalid drop
		iif "lo" accept
		meta l4proto { icmp, ipv6-icmp } accept
		tcp dport 22 counter packets 1 bytes 60 accept
		tcp dport { 80, 443 } counter packets 0 bytes 0 accept
	}
}
~~~

[[priority 0]] اتكتبت [[priority filter]] (ده اسم الصفر). و [[packets 1 bytes 60]] على 22: ده الـ SYN بتاع [[nc]] (الباقي عدّى من [[established]]). وفي نفس الوقت [[iptables -L INPUT]] كان لسه [[policy ACCEPT]] وفاضي: قواعد nft المباشرة مبتظهرش فيه.

## ٢٤. [[kill %1]]

الغي زرار الرجوع. جربت الحالتين:

- من غير [[kill]]: بعد ٤ ثواني [[nft list tables]] بقى فيه [[table ip nat]] بس، يعني الجدول اتمسح لوحده.
- مع [[kill %1]]: الجدول فضل. وجربتها كيوزر عادي بـ [[sudo]] كمان، واشتغلت.

| الخطوة | الأمر |
|---|---|
| تقرا | [[nft list ruleset]] |
| تكتب | ملف [[.nft]] |
| تفحص | [[nft -c -f]] |
| زرار رجوع | [[sh -c 'sleep 120; nft delete table ...' &]] |
| تطبّق | [[nft -f]] |
| تشوف العدّادات | [[nft list table inet myfw]] |
| تلغي الرجوع | [[kill %1]] |

## على الماك

فايروول تاني خالص اسمه pf: [[sudo pfctl -s rules]] للقواعد (من الـ man page).

## الخلاصة

القواعد من فوق لتحت، و [[policy drop]] محتاجة [[established,related]] و 22. وافحص بـ [[-c]] وشغّل زرار الرجوع قبل أي تطبيق على سيرفر بعيد.`,
          lines: [
            R`كل الجداول والقواعد على الجهاز.`,
            R`أسامي الجداول بس.`,
            R`نسخة iptables، و [[(nf_tables)]] يعني بيكتب في nftables.`,
            R`قواعد iptables بالأرقام والعدّادات (اللي اتكتبت بـ nft مباشرة مش هتظهر هنا).`,
            R`اكتب ملف القواعد (الـ heredoc لحد EOF).`,
            R`اعمل الجدول لو مش موجود...`,
            R`...وامسحه: كده النسخة القديمة بتاعتنا اتشالت من غير ما نلمس جداول تانية.`,
            R`جدول جديد اسمه myfw لـ IPv4 و IPv6 ([[inet]]).`,
            R`chain اسمها input...`,
            R`...متعلّقة على الـ packets الداخلة، واللي ميطابقش يترمي.`,
            R`اقبل الردود على اتصالات بدأناها.`,
            R`ارمي الـ packets الغلط.`,
            R`اقبل اللي من الجهاز لنفسه.`,
            R`اقبل الـ ping بنوعيه.`,
            R`اقبل SSH، وعد الـ packets.`,
            R`اقبل 80 و 443.`,
            R`نهاية الـ chain.`,
            R`نهاية الجدول.`,
            R`نهاية الملف.`,
            R`افحص الملف من غير ما تطبّقه ([[-c]]).`,
            R`زرار الرجوع: بعد دقيقتين امسح الجدول، في الخلفية ([[&]]).`,
            R`طبّق الملف (كله مرة واحدة).`,
            R`اعرض الجدول والـ counters.`,
            R`كله تمام وقدرت تدخل ssh جديد؟ الغي زرار الرجوع.`
          ],
          sol: R`ناتج حقيقي من container أوبونتو 24.04 بـ [[--privileged]] على شبكة Docker: [[iptables -V]] طبع [[iptables v1.8.10 (nf_tables)]]. و [[nft list ruleset]] قبل أي حاجة كان فيه جدول Docker للـ DNS الداخلي: [[table ip nat {]] وجواه [[chain DOCKER_OUTPUT]] و [[dnat to 127.0.0.11:54652]]، ومعاه [[# Warning: table ip nat is managed by iptables-nft, do not touch!]].

[[nft -c -f]] مطبعش حاجة (سليم). وبعد التطبيق، من container تاني على نفس الشبكة: [[nc -zv 172.30.0.30 22]] طبع [[Connection to 172.30.0.30 22 port [tcp/ssh] succeeded!]]، و 8080: [[nc: connect to 172.30.0.30 port 8080 (tcp) timed out: Operation now in progress]] (drop يعني مفيش رد خالص، مش رفض). والـ counter بقى [[tcp dport 22 counter packets 1 bytes 60 accept]]، و [[curl https://example.com]] من نفس الجهاز اشتغل بسبب [[established,related]]. وفي نفس الوقت [[iptables -L]] كان فاضي: [[Chain INPUT (policy ACCEPT 0 packets, 0 bytes)]].

وجربت زرار الرجوع: الجدول اتمسح لوحده بعد المدة، ومع [[kill %1]] فضل. ولما شغّلت ufw، [[nft list tables]] بقى فيه [[table ip filter]] و [[table ip6 filter]]، و [[iptables -L INPUT]] بقى [[policy DROP]] وفيه chains زي [[ufw-before-input]]، وقاعدة [[ufw allow 22/tcp]] ظهرت في [[chain ufw-user-input]] كـ [[tcp dport 22 counter packets 0 bytes 0 accept]].`
        }
      ]
    }
]);
