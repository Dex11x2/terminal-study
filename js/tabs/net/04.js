// تكملة تاب net: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/net/01.js (شرح حقول الدرس في أوله)
MORE("net", [
  {
    t: R`IPv6`,
    l: 2,
    n: R`العناوين الطويلة، الـ link-local، الـ SLAAC، وإزاي IPv4 و IPv6 بيعيشوا مع بعض`,
    items: [
      {
        cmd: "ipv6",
        title: R`عناوين IPv6: الشكل والاختصار والأنواع (link-local و ULA و global)`,
        desc: R`عنوان IPv6 = 128 بِت مكتوبة 8 مجموعات hex بينهم [[:]]، زي [[fd00:0077:0000:0000:0000:0000:0000:0002]]، وبيتختصر لـ [[fd00:77::2]]: الأصفار اللي على الشمال في كل مجموعة بتتشال، وأطول سلسلة مجموعات صفر بتبقى [[::]] مرة واحدة بس.

كل كارت عليه IPv6 بياخد عنوان [[fe80::...]] (link-local) لوحده، ينفع جوه الوصلة دي بس. والشبكات الخاصة بتستخدم [[fc00::/7]] (عمليًا [[fd..]]، ULA)، والعام على الإنترنت من [[2000::/3]]. والشبكة العادية [[/64]]: أول 64 بِت للشبكة وآخر 64 للجهاز.`,
        example: R`# Linux (and WSL):
ip -6 addr show eth0
ping -c 1 fe80::e4a2:b0ff:fed5:2995%eth0
python3 -c "import ipaddress as i; a=i.ip_address('fd00:77::2'); print(a.exploded, a.is_private, a.is_link_local)"
# Windows (PowerShell):
Get-NetIPAddress -AddressFamily IPv6 | Format-Table IPAddress, InterfaceAlias, PrefixOrigin, SuffixOrigin`,
        try: R`على ويندوز شغّل سطر [[Get-NetIPAddress -AddressFamily IPv6]]. صنّف كل عنوان: [[fe80]] (link-local)، [[fd]] (ULA)، [[2xxx]] أو [[3xxx]] (عام)، [[::1]] (loopback). عندك عنوان عام؟ لو لأ، يبقى المزوّد مش مدّيك IPv6 على الإنترنت.`,
        deep: {
          why: R`عناوين IPv4 خلصت من سنين، والإنترنت بيتحول لـ IPv6 (الموبايلات وكتير من المزوّدين شغالين عليه). ولو مش فاهمه، هتقع في مشاكل حقيقية: تسريب IPv6 جنب VPN بيحمل IPv4 بس (درس حماية التسريب)، أو سيرفر سامع على IPv4 بس والعميل بيحاول IPv6، أو قاعدة firewall ناسية IPv6 خالص.`,
          how: R`الـ 128 بِت بتتقسم: أول 64 = prefix الشبكة (المزوّد أو الراوتر بيدّيه)، وآخر 64 = interface ID (الجهاز بيعمله لنفسه). أنواع العناوين بتتعرف من أولها: [[::1]] loopback، و [[fe80::/10]] link-local (كل كارت لازم يبقى عنده واحد، والراوترات مابتعدّيهوش)، و [[fc00::/7]] ULA (زي 192.168 في IPv4)، و [[2000::/3]] global unicast، و [[ff00::/8]] multicast (مفيش broadcast في IPv6). عشان الـ link-local بيتكرر على كل كارت، لازم تقول أنهي كارت بـ [[%eth0]] (scope/zone ID)، وعلى ويندوز رقم الكارت زي [[%13]].`,
          when: R`وانت بتقرا [[ip addr]] أو [[ipconfig]] وتلاقي عناوين طويلة، وانت بتكتب قاعدة firewall أو [[AllowedIPs]] (لازم IPv6 كمان)، وانت بتختبر تسريب IPv6، ولما تعمل سيرفر لازم يسمع على [[::]] عشان يقبل IPv6.`,
          mistakes: R`- تستخدم [[::]] مرتين في نفس العنوان: ممنوع، لأن مايبقاش معروف كل واحدة كام صفر.
- تعمل ping لـ [[fe80::...]] من غير [[%eth0]]: لينكس طلّعلي تحذير [[IPv6 link-local address on ICMP datagram socket may require ifname or scope-id]] والـ ping ماردّش.
- تفتكر [[fd..]] عنوان عام: ده خاص زي 192.168، ومش هيوصلك للإنترنت.
- تكتب عنوان IPv6 في URL من غير أقواس: الصح [[http://[fd00:77::2]:8000/]].`
        },
        teach: R`## الفكرة: نفس الفكرة بتاعة IPv4، بس 128 بِت

نفس معمل Docker، بس الشبكة اتعملت ومعاها IPv6:

~~~bash
docker network create --subnet 10.77.0.0/24 --ipv6 --subnet fd00:77::/64 lab-net
~~~

[[--ipv6 --subnet fd00:77::/64]]: Docker بيدّي كل container عنوان ULA من المدى ده.

---

## 1) [[ip -6 addr show eth0]]

~~~text الناتج على container (c)
2: eth0@if91: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 ...
    inet6 fd00:77::4/64 scope global nodad
       valid_lft forever preferred_lft forever
    inet6 fe80::dcc4:b7ff:fecd:d20e/64 scope link tentative
       valid_lft forever preferred_lft forever
~~~

| الحتة | معناها |
|---|---|
| [[fd00:77::4/64]] | عنوان ULA (خاص) من Docker. [[::]] بدل 4 مجموعات صفر |
| [[scope global]] | ينفع يتوجّه بره الكارت (مش معناها «عام على الإنترنت») |
| [[nodad]] | Docker قال للكيرنل ماتعملش Duplicate Address Detection |
| [[fe80::dcc4:b7ff:fecd:d20e/64]] | الـ link-local، الكارت عمله لنفسه |
| [[scope link]] | صالح على الوصلة دي بس |
| [[tentative]] | لسه بيتأكد إن محدش تاني واخده (DAD)، وبعد ثانية بيختفي |

### الـ link-local جاي منين؟

الـ MAC بتاع الكارت [[de:c4:b7:cd:d2:0e]]. الكيرنل:

1. قسمه نصين وحط [[ff:fe]] في النص: [[de:c4:b7]] + [[ff:fe]] + [[cd:d2:0e]].
2. قلب البِت السابع في أول بايت: [[de]] = [[11011110]] ← [[11011100]] = [[dc]].
3. النتيجة [[dcc4:b7ff:fecd:d20e]] بعد [[fe80::]].

ده اسمه EUI-64. (ويندوز بيستخدم رقم عشوائي بدل الـ MAC عشان الخصوصية، شوف تحت.)

---

## 2) [[ping -c 1 fe80::e4a2:b0ff:fed5:2995%eth0]]

ده الـ link-local بتاع [[a]]. الـ [[%eth0]] بيقول «على أنهي كارت»، لأن كل كارت عنده [[fe80::/64]] بتاعه:

~~~text
PING fe80::e4a2:b0ff:fed5:2995%eth0 (fe80::e4a2:b0ff:fed5:2995%eth0) 56 data bytes
64 bytes from fe80::e4a2:b0ff:fed5:2995%eth0: icmp_seq=1 ttl=64 time=0.320 ms
~~~

ومن غير [[%eth0]]:

~~~text
ping: Warning: IPv6 link-local address on ICMP datagram socket may require ifname or scope-id => use: address%<ifname|scope-id>
~~~

---

## 3) الشكل الكامل بـ Python

~~~text python3 -c "... ip_address('fd00:77::2') ... exploded, is_private, is_link_local"
fd00:0077:0000:0000:0000:0000:0000:0002 True False
~~~

[[exploded]] = الشكل الكامل: 8 مجموعات × 4 hex = 32 حرف = 128 بِت. ونفس السطر على [[fe80::e4a2:b0ff:fed5:2995]] رجّع [[is_link_local True]].

---

## 4) على ويندوز

~~~text Get-NetIPAddress -AddressFamily IPv6 | Format-Table IPAddress, InterfaceAlias, PrefixOrigin, SuffixOrigin (جزء، ويندوز 11)
IPAddress                                InterfaceAlias  PrefixOrigin        SuffixOrigin
---------                                --------------  ------------        ------------
fe80::84e:34ec:cd48:1b6e%13              Wi-Fi           WellKnown           Link
fdxx:xxxx:xxxx:e500:acc5:2bf2:dc9e:23aa  Wi-Fi           RouterAdvertisement Random
fdxx:xxxx:xxxx:e500:11eb:20a6:8aba:3c1   Wi-Fi           RouterAdvertisement Link
fd00:255::2                              netpilot0       Manual              Manual
::1                                      Loopback ...    WellKnown           WellKnown
~~~

- [[%13]]: رقم كارت الـ Wi-Fi (الـ zone ID بتاع ويندوز بدل [[%eth0]]).
- [[PrefixOrigin RouterAdvertisement]]: الـ prefix جه من الراوتر (SLAAC، الدرس الجاي). [[SuffixOrigin Random]] = عنوان مؤقت عشوائي للخصوصية، و [[Link]] = العنوان الثابت.
- كل العناوين [[fe80]] أو [[fd]]: مفيش ولا عنوان من [[2000::/3]]، يعني الراوتر عامل IPv6 جوه البيت بس، ومفيش IPv6 على الإنترنت.

## الخلاصة

| يبدأ بـ | النوع | زي إيه في IPv4 |
|---|---|---|
| [[::1]] | loopback | 127.0.0.1 |
| [[fe80:]] | link-local (لازم [[%كارت]]) | 169.254.x.x |
| [[fd..]] | ULA خاص | 10.x و 192.168.x |
| [[2...]] / [[3...]] | عام | أي عنوان عام |
| [[ff..]] | multicast | (مفيش broadcast في IPv6) |`,
        lines: [
          R`بيعرض عناوين IPv6 على الكارت: الـ ULA من Docker والـ link-local اللي الكارت عمله لنفسه.`,
          R`بيكلّم الـ link-local بتاع container تاني، و [[%eth0]] بيحدد الكارت لأن [[fe80::]] موجود على كل كارت.`,
          R`Python: بيطبع العنوان بشكله الكامل ([[exploded]]) وهو خاص ولا link-local.`,
          R`ويندوز: كل عناوين IPv6 ومعاها مصدر الـ prefix ومصدر النص التاني (Router Advertisement، عشوائي، ثابت، يدوي).`
        ],
        sol: R`اتشغّل على ويندوز 11: الـ Wi-Fi عليه [[fe80::...%13]] (link-local) وعنوانين [[fd..]] (ULA) جايين من [[RouterAdvertisement]] (واحد [[Random]] مؤقت وواحد [[Link]] ثابت)، و [[netpilot0]] عليه [[fd00:255::2]] [[Manual]]، و [[::1]] على الـ loopback.

مفيش ولا عنوان بيبدأ بـ 2 أو 3، فمفيش IPv6 عام. ده بيفسّر ليه [[curl.exe -6 https://api6.ipify.org]] في درس حماية التسريب رجع فاضي.`
      },
      {
        cmd: "slaac",
        title: R`SLAAC والـ dual stack: الجهاز بيعمل عنوانه من إعلان الراوتر، و IPv4 و IPv6 مع بعض`,
        desc: R`في IPv6 الجهاز ممكن يعمل عنوانه لوحده من غير DHCP: الراوتر بيبعت كل شوية Router Advertisement (RA) فيه الـ prefix (زي [[fd00:77:0:1::/64]])، والجهاز بيكمّل الـ 64 بِت التانيين بنفسه. ده اسمه SLAAC (Stateless Address Autoconfiguration).

وأغلب الشبكات دلوقتي dual stack: الجهاز عنده IPv4 و IPv6 في نفس الوقت، ولما الاسم يرجع بالنوعين (A و AAAA) نظام التشغيل بيرتّب العناوين ويجرّب الأفضل الأول.`,
        example: R`# Linux (and WSL):
# على الراوتر التجريبي (a):
radvd -c
radvd -n -m stderr
# على الجهاز (c):
sudo tcpdump -n -v -i eth0 "icmp6 and (ip6[40] == 134 or ip6[40] == 133)" -c 2
ip -6 addr show eth0
getent ahosts a.lab
curl -4 -s -o /dev/null -w "%{remote_ip}\n" http://a.lab:8000/
curl -6 -s -o /dev/null -w "%{remote_ip}\n" http://a.lab:8000/
# Windows (PowerShell):
Get-NetIPv6Protocol | Format-List RandomizeIdentifiers, UseTemporaryAddresses
Get-NetPrefixPolicy | Format-Table Prefix, Precedence, Label`,
        try: R`على ويندوز شغّل [[Get-NetPrefixPolicy]]. لو اسم رجع بعنوان IPv4 وعنوان ULA ([[fd..]])، مين هيتجرّب الأول؟ (قارن الـ Precedence بتاع [[::ffff:0:0/96]] بتاع [[fc00::/7]]). وبعدين قارن باللي لينكس عمله في المعمل.`,
        deep: {
          why: R`لو انت شغّال على سيرفر أو VPN أو firewall، لازم تعرف إن الأجهزة بتاخد عناوين IPv6 لوحدها من غير ما حد يكتبها، وإن البرامج بتفضّل IPv6 في حالات كتير. ده بالظبط سبب تسريب IPv6 جنب VPN بيحمل IPv4 بس، وسبب «الموقع بطيء أول ما يفتح» لما IPv6 مكسور والجهاز بيجرّبه الأول ويستنى.`,
          how: R`الراوتر بيبعت RA (رسالة ICMPv6 نوع 134) لـ [[ff02::1]] (كل الأجهزة) كل فترة، والجهاز الجديد ممكن يستعجله بـ Router Solicitation (نوع 133). جوه الـ RA فيه prefix information بعلامتين: [[onlink]] (العناوين دي جيرانك) و [[auto]] (اعمل عنوان منه). الجهاز بيحط الـ interface ID (EUI-64 من الـ MAC، أو رقم عشوائي ثابت أو مؤقت للخصوصية)، ويعمل DAD يتأكد إن محدش تاني واخده، ويضيف default route لعنوان الـ link-local بتاع الراوتر. وبعدين لما برنامج يطلب اسم، [[getaddrinfo]] بترجّع العناوين مترتبة بقواعد RFC 6724 (precedence و labels)، والبرنامج يجرّبهم بالترتيب أو بـ Happy Eyeballs (يبدأ الاتنين ويمسك الأسرع).`,
          when: R`وانت بتشخّص «الجهاز عنده IPv6 منين؟»، وانت بتختبر تسريب IPv6، وانت بتظبط سيرفر لازم يسمع على [[::]] عشان عملاء IPv6، ووانت بتفهم ليه [[curl]] قال [[Trying [fd00:77::2]...]] قبل IPv4.`,
          mistakes: R`- تفتكر إن قفل DHCPv6 معناه مفيش IPv6: SLAAC شغّال من غير DHCP خالص.
- تحط جدار نار لـ IPv4 بس: الجهاز عنده IPv6 والترافيك يعدّي منه.
- تسيب السيرفر سامع على [[0.0.0.0]] بس: عملاء IPv6 يتصلوا ومايلاقوش حد. [[--bind ::]] في المعمل خلّى Python يسمع على الاتنين.
- تفتكر كل الأنظمة بترتّب نفس الترتيب: في المعمل لينكس جرّب الـ ULA قبل IPv4، وجدول ويندوز بيدّي IPv4 أولوية أعلى من الـ ULA.`
        },
        teach: R`## الفكرة: الراوتر بيقول الـ prefix، والجهاز يكمّل الباقي

نفس المعمل بتاع IPv6: container [[a]] هيعمل راوتر تجريبي بـ [[radvd]]، و container [[c]] هو الجهاز. عشان [[c]] يقبل الـ RA اتعمل كده:

~~~bash
docker run -d --name lab-c --network name=lab-net,ip=10.77.0.30,driver-opt=com.docker.network.endpoint.sysctls=net.ipv6.conf.IFNAME.accept_ra=2 --cap-add NET_ADMIN --cap-add NET_RAW ubuntu:24.04 sleep infinity
~~~

[[accept_ra=2]] = اقبل Router Advertisements (Docker بيقفلها افتراضيًا). ودي إعدادات جوه الـ container بس.

---

## 1) الراوتر: [[radvd]]

ملف [[/etc/radvd.conf]] على [[a]]:

~~~text
interface eth0 {
    AdvSendAdvert on;
    MinRtrAdvInterval 3;
    MaxRtrAdvInterval 10;
    prefix fd00:77:0:1::/64 {
        AdvOnLink on;
        AdvAutonomous on;
    };
};
~~~

- [[AdvSendAdvert on]]: ابعت RA. و [[Min/MaxRtrAdvInterval]]: كل 3 لـ 10 ثواني (عشان المعمل يبقى سريع؛ الافتراضي دقايق).
- [[AdvOnLink]]: الـ prefix ده على نفس الوصلة. [[AdvAutonomous]]: الأجهزة تعمل عناوين منه (ده الـ A في SLAAC).

[[radvd -c]] بيراجع الملف بس ([[config file, /etc/radvd.conf, syntax ok]])، و [[radvd -n -m stderr]] بيشغّله في المقدمة ويكتب على الشاشة:

~~~text radvd 2.19
radvd (63): version 2.19 started
radvd (63): IPv6 forwarding setting is: 0, should be 1 or 2
radvd (63): IPv6 forwarding seems to be disabled, but continuing anyway
~~~

التحذير معناه إن الـ container مش راوتر حقيقي (مش بيمرّر IPv6)، بس كفاية للمعمل.

---

## 2) الـ RA على السلك (من [[c]])

[[ip6[40] == 134]]: البايت رقم 40 في الـ packet (أول بايت بعد هيدر IPv6 اللي حجمه 40) = نوع رسالة ICMPv6، و 134 = Router Advertisement و 133 = Router Solicitation.

~~~text tcpdump -v
fe80::e4a2:b0ff:fed5:2995 > ff02::1: [icmp6 sum ok] ICMP6, router advertisement, length 56
	hop limit 64, Flags [none], pref medium, router lifetime 30s, reachable time 0ms, retrans timer 0ms
	  prefix info option (3), length 32 (4): fd00:77:0:1::/64, Flags [onlink, auto], valid time 86400s, pref. time 14400s
	  source link-address option (1), length 8 (1): e6:a2:b0:d5:29:95
~~~

- من الـ link-local بتاع [[a]] لـ [[ff02::1]] (كل الأجهزة على الوصلة).
- [[router lifetime 30s]]: «اعتبرني راوتر default لمدة 30 ثانية» (و radvd بيجدد قبلها).
- [[onlink]] و [[auto]] في الـ Flags: العلامتين اللي فوق. [[valid time 86400s]] = يوم، [[pref. time 14400s]] = 4 ساعات.

---

## 3) العنوان اتعمل لوحده

~~~text ip -6 addr show eth0 على c
    inet6 fd00:77:0:1:dcc4:b7ff:fecd:d20e/64 scope global dynamic mngtmpaddr
       valid_lft 86397sec preferred_lft 14397sec
    inet6 fd00:77::4/64 scope global nodad
    inet6 fe80::dcc4:b7ff:fecd:d20e/64 scope link
~~~

- الـ prefix [[fd00:77:0:1]] من الـ RA، والباقي [[dcc4:b7ff:fecd:d20e]] نفس الـ EUI-64 اللي في الـ link-local (من الـ MAC).
- [[dynamic]]: ليه عمر ([[valid_lft]]) وبيتجدد مع كل RA.
- و [[ip -6 route]] بقى فيه [[default via fe80::e4a2:b0ff:fed5:2995 dev eth0 proto ra]]: الراوتر اتضاف كـ default من الـ RA ([[proto ra]]).

على ويندوز [[Get-NetIPv6Protocol]] بيقول ليه ماتشوفش الـ MAC في العنوان:

~~~text
RandomizeIdentifiers  : Enabled
UseTemporaryAddresses : Enabled
~~~

ويندوز بيعمل الـ 64 بِت التانيين عشوائي (ثابت للشبكة دي) وكمان عنوان مؤقت بيتغيّر (ده [[SuffixOrigin Random]] في الدرس اللي فات)، عشان المواقع ماتتابعكش بالـ MAC.

---

## 4) dual stack: مين يتجرّب الأول؟

على [[a]] شغّلت [[python3 -m http.server 8000 --bind ::]] (يسمع على IPv4 و IPv6 مع بعض)، وعلى [[c]] حطيت في [[/etc/hosts]] اسم [[a.lab]] بعنوانين: [[10.77.0.10]] و [[fd00:77::2]].

~~~text getent ahosts a.lab
fd00:77::2      STREAM a.lab
fd00:77::2      DGRAM
fd00:77::2      RAW
10.77.0.10      STREAM
~~~

[[getent ahosts]] بيوريك الترتيب اللي البرامج هتاخده من [[getaddrinfo]]: الـ IPv6 الأول. و [[curl -v http://a.lab:8000/]] قال [[Trying [fd00:77::2]:8000...]] و [[Connected to a.lab (fd00:77::2)]]. ومع [[-4]] و [[-6]]:

~~~text
10.77.0.10
fd00:77::2
~~~

[[%{remote_ip}]] في [[-w]] = العنوان اللي curl اتصل بيه فعلًا. ولوج السيرفر كتب الطلب الـ IPv4 كده: [[::ffff:10.77.0.30]]: ده IPv4-mapped address، السوكيت الواحد بتاع IPv6 بيشيل عملاء IPv4 كمان.

### ويندوز بيرتّب إزاي؟

~~~text Get-NetPrefixPolicy (ويندوز 11)
Prefix        Precedence Label
------        ---------- -----
fc00::/7               3    13
::ffff:0:0/96         35     4
::/0                  40     1
::1/128               50     0
~~~

الأعلى Precedence يتجرّب الأول: IPv6 عام ([[::/0]] = 40) قبل IPv4 ([[::ffff:0:0/96]] = 35)، بس الـ ULA ([[fc00::/7]] = 3) **بعد** IPv4. ده جدول RFC 6724. لينكس في المعمل جرّب الـ ULA الأول لأن glibc من غير [[/etc/gai.conf]] بيستخدم الجدول الأقدم (RFC 3484) اللي مافيهوش سطر لـ [[fc00::/7]].

## الخلاصة

- RA (ICMPv6 134) فيه الـ prefix، والجهاز يكمّل الـ 64 بِت بنفسه (EUI-64 أو عشوائي).
- الراوتر بيتضاف default route من الـ RA ([[proto ra]]).
- في dual stack الترتيب بقواعد RFC 6724: IPv6 العام قبل IPv4، والـ ULA بيختلف من نظام للتاني.`,
        lines: [
          R`على الراوتر التجريبي: بيراجع ملف الإعدادات من غير تشغيل.`,
          R`بيشغّل radvd في المقدمة ([[-n]]) ويكتب اللوج على الشاشة ([[-m stderr]])، فيبدأ يبعت RA.`,
          R`على الجهاز: بيلتقط Router Advertisement (134) و Router Solicitation (133) ويفك محتواهم ([[-v]])، ويقف بعد 2.`,
          R`بيعرض العنوان اللي اتعمل من الـ prefix اللي في الـ RA ([[dynamic]]).`,
          R`بيعرض العناوين اللي الاسم [[a.lab]] بيرجع بيها بنفس ترتيب [[getaddrinfo]] (اللي البرامج بتجرّبه).`,
          R`بيجبر curl على IPv4 ([[-4]]) ويطبع العنوان اللي اتصل بيه.`,
          R`بيجبره على IPv6 ([[-6]]).`,
          R`ويندوز: العنوان بيتعمل عشوائي، وفيه عناوين مؤقتة للخصوصية؟`,
          R`ويندوز: جدول RFC 6724 اللي بيرتّب بيه العناوين (الأعلى Precedence الأول).`
        ],
        sol: R`من [[Get-NetPrefixPolicy]] على ويندوز 11: [[::ffff:0:0/96]] (IPv4) الـ Precedence بتاعه 35، و [[fc00::/7]] (ULA) 3. يعني ويندوز هيجرّب IPv4 الأول، والـ ULA بعده.

في المعمل لينكس عمل العكس: [[getent ahosts a.lab]] حط [[fd00:77::2]] الأول، و [[curl]] اتصل بيه. السبب إن glibc من غير [[/etc/gai.conf]] بيستخدم الجدول الأقدم اللي مافيهوش سطر للـ ULA، فبيعامله زي IPv6 عام.`
      }
    ]
  },
  {
    t: R`التقاط الترافيك وقراءته`,
    l: 2,
    n: R`tcpdump و tshark على ترافيكك إنت أو containers المعمل: تحفظ، وتقرا، وتطلّع اللي محتاجه`,
    items: [
      {
        cmd: "pcap",
        title: R`احفظ الترافيك في ملف واقراه سطر سطر (tcpdump -w و -r والفلاتر)`,
        desc: R`[[tcpdump -w ملف.pcap]] بيحفظ الـ packets زي ما هي في ملف بدل ما يطبعها، و [[tcpdump -r]] بيقراه بعدين بأي فلتر. كده تلتقط مرة واحدة (على سيرفر أو container) وتحلّل براحتك، أو تفتح الملف في Wireshark.

الدرس ده عن **قراية** السطور: الـ flags ([[S]] و [[S.]] و [[.]] و [[P.]] و [[F.]])، والـ seq والـ ack، والـ length، وفلاتر BPF. وأساسيات tcpdump نفسه في درس «tcpdump» في تاب bash. الالتقاط دايمًا على جهازك أو containers المعمل بتاعتك بس.`,
        example: R`# Linux (and WSL):
sudo tcpdump -i eth0 -w web.pcap "tcp port 8000"
curl -s -o /dev/null http://10.77.0.10:8000/
tcpdump -r web.pcap -n
tcpdump -r web.pcap -n -A "tcp[tcpflags] & tcp-push != 0"
# Windows (PowerShell كأدمن):
pktmon start --capture --pkt-size 0 --file-name web.etl
pktmon stop
pktmon etl2pcap web.etl --out web.pcapng`,
        try: R`في المعمل (أو على سيرفر بتاعك) التقط طلب HTTP واحد في ملف، وبعدين اقراه بـ [[tcpdump -r]] وحدد: سطور الـ 3-way handshake، وسطر الطلب، وسطر الرد، وسطور الإغلاق. كام packet الاتصال كله أخد؟`,
        deep: {
          why: R`الطباعة على الشاشة بتعدّي بسرعة وبتضيع، والتحليل الحقيقي محتاج ترجع للـ packet نفسه وتقارنه باللي قبله. الملف بيخلّيك تلتقط على سيرفر من غير واجهة وتحلّل على جهازك، وتبعته لزميل، أو تفتحه في Wireshark. وقراية الـ flags والـ seq/ack هي اللي بتقولك «الاتصال اتفتح؟ الطلب اتبعت؟ مين قفل؟» من غير تخمين.`,
          how: R`[[-w]] بيكتب الـ packets بصيغة pcap (هيدر للملف وبعدين كل packet بوقته وطوله). [[-r]] بيقرا الملف بدل الكارت، وأي فلتر بتكتبه بيتطبّق وقت القراية. الفلاتر بلغة BPF (Berkeley Packet Filter) اللي الكيرنل بيفهمها: [[host]] و [[port]] و [[tcp]] و [[and]]/[[or]]/[[not]]، وكمان تقدر تبص على بايت معيّن: [[tcp[tcpflags] & tcp-push != 0]] = «الـ PSH flag شغّال» (يعني فيه داتا). و [[-A]] بيطبع الـ payload كـ ASCII، فتقرا الـ HTTP لو مش مشفّر.`,
          when: R`لما تحتاج دليل: الطلب وصل السيرفر ولا لأ، مين بيقفل الاتصال، الرد اتأخر فين. ولما تحلّل بروتوكول بتكتبه (WebSocket، gRPC) على المعمل. وعلى ويندوز في أداة مدمجة اسمها [[pktmon]] بتحتاج أدمن (أو Wireshark/Npcap لو متسطّب).`,
          mistakes: R`- تقرا ملف بفلتر وتستغرب إن الـ seq بقت أرقام كبيرة: tcpdump بيحسب الـ seq النسبية من أول packet في الاتصال، ولو الفلتر شال الـ SYN بيرجع للأرقام الحقيقية.
- تلتقط من غير فلتر على سيرفر عليه زيارات: الملف يكبر بسرعة. استخدم فلتر و [[-c]] أو [[-C]].
- تتوقع تقرا HTTPS بـ [[-A]]: هتشوف بايتات مشفّرة. اللي تقدر تقراه من HTTPS هو الـ SNI (الدرس الجاي).
- تلتقط ترافيك ناس تانية: ممنوع. جهازك أو المعمل بتاعك بس.`
        },
        teach: R`## الفكرة: التقط مرة، واقرا براحتك

نفس معمل Docker: container [[a]] ([[10.77.0.10]]) شغّال عليه [[python3 -m http.server 8000]]، و [[c]] ([[10.77.0.30]]) هيطلب منه.

---

## 1) [[tcpdump -i eth0 -w web.pcap "tcp port 8000"]] على [[a]]

- [[-w web.pcap]]: اكتب في الملف ده (مش على الشاشة).
- [[tcp port 8000]]: TCP رايح أو جاي من بورت 8000.

~~~text
tcpdump: listening on eth0, link-type EN10MB (Ethernet), snapshot length 262144 bytes
12 packets captured
~~~

وبعدين من [[c]]: [[curl -s -o /dev/null http://10.77.0.10:8000/]]. طلب واحد = 12 packet.

---

## 2) [[tcpdump -r web.pcap -n]]

~~~text الناتج (شلت الـ options من آخر كل سطر)
16:52:50.979444 IP 10.77.0.30.47882 > 10.77.0.10.8000: Flags [S], seq 4111752213, win 64240, ... length 0
16:52:50.979462 IP 10.77.0.10.8000 > 10.77.0.30.47882: Flags [S.], seq 1780217276, ack 4111752214, win 65160, ... length 0
16:52:50.979484 IP 10.77.0.30.47882 > 10.77.0.10.8000: Flags [.], ack 1, win 63, ... length 0
16:52:50.979562 IP 10.77.0.30.47882 > 10.77.0.10.8000: Flags [P.], seq 1:79, ack 1, win 63, ... length 78
16:52:50.979567 IP 10.77.0.10.8000 > 10.77.0.30.47882: Flags [.], ack 79, win 64, ... length 0
16:52:50.980526 IP 10.77.0.10.8000 > 10.77.0.30.47882: Flags [P.], seq 1:156, ack 79, win 64, ... length 155
16:52:50.980574 IP 10.77.0.30.47882 > 10.77.0.10.8000: Flags [.], ack 156, win 63, ... length 0
16:52:50.980595 IP 10.77.0.10.8000 > 10.77.0.30.47882: Flags [P.], seq 156:591, ack 79, win 64, ... length 435
16:52:50.980621 IP 10.77.0.30.47882 > 10.77.0.10.8000: Flags [.], ack 591, win 63, ... length 0
16:52:50.980648 IP 10.77.0.10.8000 > 10.77.0.30.47882: Flags [F.], seq 591, ack 79, win 64, ... length 0
16:52:50.980685 IP 10.77.0.30.47882 > 10.77.0.10.8000: Flags [F.], seq 79, ack 592, win 63, ... length 0
16:52:50.980693 IP 10.77.0.10.8000 > 10.77.0.30.47882: Flags [.], ack 80, win 64, ... length 0
~~~

### الـ flags

| الرمز | الـ flag | معناه |
|---|---|---|
| [[S]] | SYN | عايز أفتح |
| [[S.]] | SYN + ACK | موافق، والنقطة = ACK |
| [[.]] | ACK بس | استلمت |
| [[P.]] | PSH + ACK | فيه داتا، سلّمها للبرنامج على طول |
| [[F.]] | FIN + ACK | خلّصت كلام |

### الاتصال على 4 مراحل

1. **السطور 1-3**: الـ 3-way handshake ([[S]] ← [[S.]] ← [[.]]). بعد كده الـ seq بقت نسبية: [[ack 1]] مش الرقم الكبير.
2. **السطر 4**: الطلب، 78 بايت ([[seq 1:79]] = من البايت 1 لحد قبل 79).
3. **السطور 6 و 8**: الرد على دفعتين: 155 بايت (الهيدرز) و 435 (الـ HTML). كل واحدة جه بعدها [[ack]] من العميل.
4. **السطور 10-12**: الإغلاق. السيرفر قفل الأول ([[F.]]) لأن [[http.server]] بيتكلم HTTP/1.0 وبيقفل بعد كل رد.

[[ack 592]] في السطر 11 = 591 بايت داتا + 1 للـ FIN (الـ FIN بياخد رقم تسلسلي واحد زي الـ SYN).

---

## 3) [[tcpdump -r web.pcap -n -A "tcp[tcpflags] & tcp-push != 0"]]

- [[tcp[tcpflags] & tcp-push]]: بايت الـ flags في هيدر TCP، وناخد منه علامة الـ PSH بس. و [[!= 0]]: العلامة شغّالة، يعني الـ packets اللي فيها داتا بس.
- [[-A]]: اطبع الداتا كنص ASCII.

~~~text
16:52:50.979562 IP 10.77.0.30.47882 > 10.77.0.10.8000: Flags [P.], seq 4111752214:4111752292, ack 1780217277, ... length 78
E....P@.@..d...
GET / HTTP/1.1
Host: 10.77.0.10:8000
User-Agent: curl/8.5.0
Accept: */*
~~~

- الطلب كله ظاهر لأنه HTTP عادي.
- الحروف الغريبة في الأول = هيدرز IP و TCP كبايتات.
- الـ seq رجعت أرقام حقيقية ([[4111752214]]): الفلتر شال الـ SYN، فـ tcpdump مالقاش بداية الاتصال يحسب منها.

---

## 4) على ويندوز: [[pktmon]] (من الـ docs)

ويندوز 10 و 11 فيهم [[pktmon]] مدمج، بس محتاج PowerShell كأدمن، فماتشغّلش هنا. حسب docs مايكروسوفت: [[pktmon start --capture --pkt-size 0 --file-name web.etl]] بيبدأ ([[--pkt-size 0]] = الـ packet كاملة)، و [[pktmon stop]] بيوقف، و [[pktmon etl2pcap web.etl --out web.pcapng]] بيحوّل لملف يفتحه Wireshark أو tshark. اللي اتجرّب هنا [[pktmon help]] بس، وطلّع [[Advanced packet capture and event collection.]].

## الخلاصة

| عايز | الأمر |
|---|---|
| احفظ | [[tcpdump -i eth0 -w f.pcap "فلتر"]] |
| اقرا | [[tcpdump -r f.pcap -n]] |
| الداتا كنص | [[-A]] (أو [[-X]] hex و ASCII) |
| packets فيها داتا بس | [[tcp[tcpflags] & tcp-push != 0]] |
| SYN بس (اتصالات جديدة) | [[tcp[tcpflags] & tcp-syn != 0]] |`,
        lines: [
          R`على السيرفر: بيلتقط TCP على بورت 8000 ويكتبه في [[web.pcap]] ([[-w]]) بدل الشاشة.`,
          R`من العميل: طلب HTTP واحد عشان يتلقط.`,
          R`بيقرا الملف ([[-r]]) ويطبع سطر لكل packet بالأرقام ([[-n]]).`,
          R`نفس الملف بفلتر «فيه داتا» (PSH)، و [[-A]] بيطبع الداتا كنص فتشوف الطلب والرد.`,
          R`ويندوز (أدمن، من الـ docs): بيبدأ التقاط بالأداة المدمجة [[pktmon]] بالـ packet كاملة ([[--pkt-size 0]]) في ملف [[.etl]].`,
          R`بيوقف الالتقاط.`,
          R`بيحوّل ملف الـ [[.etl]] لـ [[.pcapng]] يتفتح في Wireshark أو tshark.`
        ],
        sol: R`في المعمل (container أوبونتو 24.04، tcpdump 4.99.4): الاتصال كله 12 packet:

| السطور | المرحلة |
|---|---|
| 1-3 | handshake: [[S]] ثم [[S.]] ثم [[.]] |
| 4 | الطلب ([[P.]]، 78 بايت) |
| 5 | ACK من السيرفر |
| 6-9 | الرد على دفعتين (155 و 435 بايت) وكل واحدة ليها ACK |
| 10-12 | الإغلاق: [[F.]] من السيرفر، [[F.]] من العميل، ACK أخير |

سطور [[pktmon]] من docs مايكروسوفت (محتاجة أدمن فماتجرّبتش هنا).`
      },
      {
        cmd: "tshark",
        title: R`tshark: فلاتر Wireshark من التيرمنال (HTTP و الـ SNI والمحادثات)`,
        desc: R`[[tshark]] هو Wireshark من غير واجهة: بيقرا نفس الملفات وبيفهم مئات البروتوكولات ويطلّع منها حقول بالاسم. الفرق المهم عن tcpdump: فلاتر الالتقاط (BPF، بتختار إيه يتسجّل) غير فلاتر العرض ([[-Y]]، بتفهم البروتوكول: [[http.request]] و [[tls.handshake.type == 1]] و [[dns]]).

بيه تطلّع من ملف كل الطلبات، أو كل أسماء المواقع (الـ SNI) اللي اتفتحت على HTTPS، أو ملخص المحادثات. ده بالظبط اللي «الشبكة بتشوفه» من غير فك تشفير (درس تصنيف الترافيك).`,
        example: R`# Linux (and WSL):
tshark -r web.pcap
tshark -r web.pcap -Y http.request -T fields -e ip.src -e http.request.method -e http.request.uri -e http.user_agent
tshark -r web.pcap -q -z conv,tcp
sudo tcpdump -i eth0 -w tls.pcap "tcp port 443"
tshark -r tls.pcap -Y "tls.handshake.type == 1" -T fields -e ip.dst -e tls.handshake.extensions_server_name -e tls.handshake.extensions_alpn_str
tshark -r tls.pcap -Y tls`,
        try: R`التقط في المعمل (أو على جهازك وانت فاتح موقعين) ترافيك [[tcp port 443]]، وطلّع بسطر الـ SNI كل أسماء المواقع اللي اتفتحت. بعدين اسأل نفسك: إيه اللي ظاهر من غير فك تشفير، وإيه اللي بقى [[Application Data]]؟`,
        deep: {
          why: R`الـ pcap فيه آلاف السطور، والسؤال عادة محدد: «إيه الطلبات اللي فشلت؟»، «مين كلّم مين قد إيه؟»، «أنهي مواقع اتفتحت؟». tshark بيجاوب بسطر واحد بدل ما تقلّب في Wireshark، وينفع في سكريبت أو على سيرفر. وتطليع الـ SNI بنفسك بيثبت عمليًا اللي اتقال في دروس TLS: الاسم بيعدّي صريح.`,
          how: R`[[-r]] بيقرا ملف. [[-Y]] display filter بأسماء حقول Wireshark ([[http.request]]، [[tls.handshake.type == 1]] = ClientHello). [[-T fields -e حقل]] بيطبع الحقول اللي اخترتها بس، مفصولة بـ tab. [[-q -z conv,tcp]] بيسكت الطباعة العادية ويطلّع إحصائية المحادثات (كل اتصال وعدد الـ frames والبايتات في كل اتجاه). أسماء الحقول بتلاقيها في Wireshark (كليك يمين على حقل ← Copy ← Field Name) أو [[tshark -G fields]].`,
          when: R`في تحليل ملف التقطته على سيرفر، وفي سكريبت يراقب حاجة معيّنة (كل الـ DNS queries، كل الـ 5xx)، ولما تحب تتأكد إيه اللي برنامجك أو تطبيقك بيبعته على الشبكة. Wireshark نفسه (الواجهة) أريح للاستكشاف، و tshark للأسئلة المحددة والأتمتة. على ويندوز tshark بييجي مع تسطيب Wireshark ([[C:\Program Files\Wireshark\tshark.exe]]، من الـ docs).`,
          mistakes: R`- تحط فلتر عرض في [[tcpdump]] أو فلتر BPF في [[-Y]]: لغتين مختلفتين. [[tcp port 443]] للالتقاط، و [[tcp.port == 443]] للعرض.
- تشغّل tshark أو Wireshark كـ root على كل حاجة: حتى tshark بيحذّر [[Running as user "root" and group "root". This could be dangerous.]] لأن الـ dissectors كود كبير بيقرا داتا مش موثوقة. الأحسن تلتقط بـ tcpdump وتحلّل كمستخدم عادي.
- تتوقع تشوف الشهادة في TLS 1.3: بقت متشفّرة وبتظهر [[Application Data]].`
        },
        teach: R`## الفكرة: نفس الملف، بس بأسئلة بالاسم

نفس ملف [[web.pcap]] من الدرس اللي فات (tshark 4.2.2 في container أوبونتو 24.04، وبيطبع تحذير الـ root في الأول في كل مرة؛ شلته من الناتج).

---

## 1) [[tshark -r web.pcap]]

~~~text الناتج (أول 8 سطور)
    1   0.000000   10.77.0.30 → 10.77.0.10   TCP 74 47882 → 8000 [SYN] Seq=0 Win=64240 Len=0 MSS=1460 ...
    2   0.000018   10.77.0.10 → 10.77.0.30   TCP 74 8000 → 47882 [SYN, ACK] Seq=0 Ack=1 Win=65160 Len=0 MSS=1460 ...
    3   0.000040   10.77.0.30 → 10.77.0.10   TCP 66 47882 → 8000 [ACK] Seq=1 Ack=1 Win=64512 Len=0 ...
    4   0.000118   10.77.0.30 → 10.77.0.10   HTTP 144 GET / HTTP/1.1
    5   0.000123   10.77.0.10 → 10.77.0.30   TCP 66 8000 → 47882 [ACK] Seq=1 Ack=79 Win=65536 Len=0 ...
    6   0.001082   10.77.0.10 → 10.77.0.30   TCP 221 HTTP/1.0 200 OK  [TCP segment of a reassembled PDU]
    7   0.001130   10.77.0.30 → 10.77.0.10   TCP 66 47882 → 8000 [ACK] Seq=79 Ack=156 Win=64512 Len=0 ...
    8   0.001151   10.77.0.10 → 10.77.0.30   HTTP 501 HTTP/1.0 200 OK  (text/html)
~~~

الفرق عن tcpdump:

| | tcpdump | tshark |
|---|---|---|
| الوقت | ساعة | ثواني من أول packet |
| الحجم | طول الداتا ([[length 78]]) | طول الـ frame كله (144 = 78 + 14 + 20 + 32) |
| البروتوكول | TCP | فهم إنه [[HTTP]] وكتب الطلب |
| [[Win]] | الرقم الخام (63) | بعد الـ window scale (63 × 1024 = 64512) |

و [[TCP segment of a reassembled PDU]] = «الرد جه على أكتر من packet، وأنا جمّعتهم» (السطر 8 فيه الرد كامل).

---

## 2) الطلبات بس، بالحقول اللي عايزها

~~~bash
tshark -r web.pcap -Y http.request -T fields -e ip.src -e http.request.method -e http.request.uri -e http.user_agent
~~~

- [[-Y http.request]]: اعرض الـ packets اللي فيها طلب HTTP بس.
- [[-T fields]]: اطبع حقول مش ملخص، و [[-e]] قبل كل حقل.

~~~text
10.77.0.30	GET	/	curl/8.5.0
~~~

---

## 3) ملخص المحادثات: [[-q -z conv,tcp]]

~~~text
TCP Conversations
                                                           |       <-      | |       ->      | |     Total     |
                                                           | Frames  Bytes | | Frames  Bytes | | Frames  Bytes |
10.77.0.30:47882           <-> 10.77.0.10:8000                  6 994 bytes       6 482 bytes      12 1476 bytes
~~~

اتصال واحد: 6 frames راجعين من السيرفر (994 بايت فيهم الـ HTML) و 6 رايحين (482).

---

## 4) الـ SNI من HTTPS حقيقي

التقطت على container [[b]] وهو بيعمل [[curl https://example.com]]، وبعدين:

~~~bash
tshark -r tls.pcap -Y "tls.handshake.type == 1" -T fields -e ip.dst -e tls.handshake.extensions_server_name -e tls.handshake.extensions_alpn_str
~~~

[[tls.handshake.type == 1]] = ClientHello (أول رسالة في TLS).

~~~text
104.20.23.154	example.com	h2,http/1.1
~~~

الوجهة، واسم الموقع، والبروتوكولات اللي العميل عارضها: كلهم ظاهرين من غير أي مفتاح.

~~~text tshark -r tls.pcap -Y tls (أول السطور)
    4   0.003447  10.77.0.130 → 104.20.23.154 TLSv1 583 Client Hello (SNI=example.com)
    6   8.667055 104.20.23.154 → 10.77.0.130  TLSv1.3 1486 Server Hello, Change Cipher Spec
   10   8.667168 104.20.23.154 → 10.77.0.130  TLSv1.3 1217 Application Data
   12   8.671247  10.77.0.130 → 104.20.23.154 TLSv1.3 146 Change Cipher Spec, Application Data
~~~

- [[Client Hello (SNI=example.com)]]: صريح. ([[10.77.0.130]] ده عنوان [[b]] اللي خده من DHCP في درس DHCP.)
- بعد [[Server Hello]] كل حاجة [[Application Data]]، حتى الشهادة: TLS 1.3 بيشفّرها.
- ([[TLSv1]] على الـ Client Hello مش غلط: الـ record بيتكتب بنسخة قديمة عشان التوافق، والنسخة الحقيقية جوه امتداد [[supported_versions]].)

## الخلاصة

| عايز | الأمر |
|---|---|
| ملخص كل packet | [[tshark -r f.pcap]] |
| حقول بالاسم | [[-Y فلتر -T fields -e حقل -e حقل]] |
| المحادثات | [[-q -z conv,tcp]] |
| أسماء مواقع HTTPS | [[-Y "tls.handshake.type == 1" -T fields -e tls.handshake.extensions_server_name]] |`,
        lines: [
          R`بيقرا الملف ويطبع سطر لكل packet بعد ما يفهم البروتوكول (HTTP هنا).`,
          R`فلتر عرض ([[-Y]]) على طلبات HTTP، ويطبع 4 حقول بس ([[-T fields -e]]): المصدر والـ method والمسار والـ User-Agent.`,
          R`إحصائية ([[-z conv,tcp]]) لكل اتصال TCP: عدد الـ frames والبايتات في كل اتجاه، و [[-q]] بيسكت السطور العادية.`,
          R`بيلتقط ترافيك HTTPS (بورت 443) في ملف عشان نطلّع منه الـ SNI.`,
          R`بيطلّع من كل ClientHello: الوجهة واسم الموقع (SNI) والـ ALPN، وكلهم صريحين.`,
          R`بيعرض رسايل TLS: الـ Client Hello و Server Hello ظاهرين، والباقي [[Application Data]] مشفّر.`
        ],
        sol: R`في المعمل (tshark 4.2.2) سطر الـ SNI طلّع [[104.20.23.154	example.com	h2,http/1.1]].

- ظاهر: الـ IP الوجهة، والبورت، واسم الموقع، والـ ALPN، وأحجام الـ packets وتوقيتها.
- مشفّر ([[Application Data]]): الشهادة (في TLS 1.3)، والطلب والمسار والهيدرز والرد.`
      }
    ]
  },
  {
    t: R`WireGuard و MTU`,
    l: 3,
    n: R`VPN حقيقي بين اتنين containers: المفاتيح، و AllowedIPs، والنفق الكامل، والـ MTU بالأرقام`,
    items: [
      {
        cmd: "wireguard",
        title: R`WireGuard بين اتنين containers: المفاتيح و wg-quick والتأكد إن النفق شغّال`,
        desc: R`WireGuard بروتوكول VPN بسيط جوه كيرنل لينكس: كل طرف عنده مفتاح خاص ومفتاح عام (Curve25519)، وكل طرف بيعرف المفتاح العام بتاع التاني، والترافيك بيتغلّف في UDP (افتراضيًا بورت [[51820]]). مفيش شهادات ولا يوزر وباسورد: المفتاح هو الهوية.

في الدرس ده بنعمل نفق بين container [[a]] (السيرفر، [[10.99.0.1]]) و [[b]] (العميل، [[10.99.0.2]])، ونتأكد بـ [[wg show]] و [[ping]] و [[tcpdump]] إن الترافيك فعلًا ماشي متغلّف.`,
        example: R`# Linux (and WSL):
umask 077
wg genkey | tee privatekey | wg pubkey > publickey
sudo wg-quick up wg0
sudo wg show
ping -c 2 10.99.0.1
sudo tcpdump -n -i eth0 "udp port 51820"
sudo tcpdump -n -i wg0
sudo wg-quick down wg0`,
        try: R`اعمل المعمل اللي في الشرح، ولما النفق يقوم شغّل [[ping]] من [[b]] وانت بتلتقط على [[eth0]] و [[wg0]] في نفس الوقت على [[a]]. قارن: إيه اللي ظاهر على كل كارت؟ وليه الـ UDP طوله [[128]] والـ ping نفسه [[84]]؟`,
        deep: {
          why: R`عشان تفهم أي VPN، أحسن طريقة إنك تبني واحد وتبص عليه من جوه. WireGuard صغير كفاية إنك تفهم كل سطر في الإعداد، وهو اللي ورا خدمات كتير ([[wintun]] اللي NetPilot بيستخدمه أصلًا اتعمل لـ WireGuard). ولما تشوف الـ ping على [[wg0]] كـ ICMP عادي وعلى [[eth0]] كـ UDP مشفّر، فكرة «باكت جوه باكت» من درس التغليف بتبقى حاجة شفتها بعينك.`,
          how: R`[[wg genkey]] بيعمل مفتاح خاص عشوائي (32 بايت مكتوبين base64 = 44 حرف + سطر جديد = 45 بايت)، و [[wg pubkey]] بيحسب منه العام. [[wg-quick up wg0]] بيقرا [[/etc/wireguard/wg0.conf]] ويعمل: كارت من نوع [[wireguard]]، ويحمّل المفاتيح والـ peers بـ [[wg setconf]]، ويحط العنوان، ويرفع الكارت بـ MTU [[1420]]، ويضيف routes للـ AllowedIPs. أول ما packet يدخل [[wg0]]، الكيرنل يدوّر على الـ peer اللي الـ AllowedIPs بتاعته فيها الوجهة، ويعمل handshake (لو مفيش) ويشفّر بـ ChaCha20-Poly1305 ويبعت UDP للـ Endpoint. الـ endpoint بيتحدّث تلقائي لآخر عنوان جه منه packet سليم (roaming).`,
          when: R`لما تعمل VPN بين سيرفرات (site-to-site)، أو توصل لابتوبك بشبكة البيت أو بسيرفر، أو تعمل معمل تفهم فيه VPN. على ويندوز وماك فيه تطبيق WireGuard الرسمي بنفس صيغة الـ config (من الـ docs، ماتجرّبش هنا). وعلى لينكس الكيرنل فيه WireGuard من نسخة 5.6.`,
          mistakes: R`- تحط المفتاح **الخاص** بتاع الطرف التاني في [[PublicKey]]، أو تبعت مفتاحك الخاص لحد: الخاص مايخرجش من الجهاز أبدًا.
- تنسى [[umask 077]] أو [[chmod 600]] فملف المفتاح يبقى مقروء لأي يوزر. [[wg-quick]] بيحذّر لو الـ config مقروء للكل.
- تفتكر النفق واقع لأن [[latest handshake]] مش ظاهر: WireGuard ساكت، مابيعملش handshake غير لما فيه ترافيك (أو [[PersistentKeepalive]]).
- تفتح [[51820]] TCP في الـ firewall: WireGuard UDP بس.`
        },
        teach: R`## الفكرة: مفتاحين لكل طرف، و UDP بينهم

نفس شبكة Docker ([[10.77.0.0/24]]): [[a]] = [[10.77.0.10]] و [[b]] = [[10.77.0.20]]، والـ containers فيها [[wireguard-tools]] (wireguard-tools v1.0.20210914). WireGuard نفسه جوه كيرنل Docker Desktop (اتجرّب [[ip link add ... type wireguard]] واشتغل). محتاجين [[--cap-add NET_ADMIN]].

---

## 1) المفاتيح (على كل طرف)

~~~bash
umask 077
wg genkey | tee privatekey | wg pubkey > publickey
~~~

- [[umask 077]]: أي ملف يتعمل بعد كده يبقى للمالك بس ([[-rw-------]]).
- [[wg genkey]]: مفتاح خاص عشوائي.
- [[| tee privatekey]]: اكتبه في ملف **و** عدّيه للي بعده.
- [[| wg pubkey > publickey]]: احسب المفتاح العام منه واكتبه.

~~~text ls -l privatekey publickey
-rw------- 1 root root 45 Oct 27 17:05 privatekey
-rw------- 1 root root 45 Oct 27 17:05 publickey
~~~

45 بايت = 44 حرف base64 (32 بايت مفتاح) + سطر جديد. كل طرف بيدّي التاني **العام بس**.

---

## 2) ملفات الإعداد

~~~text /etc/wireguard/wg0.conf على a (السيرفر)
[Interface]
Address = 10.99.0.1/24
ListenPort = 51820
PrivateKey = <المفتاح الخاص بتاع a>

[Peer]
PublicKey = <المفتاح العام بتاع b>
AllowedIPs = 10.99.0.2/32
~~~

~~~text /etc/wireguard/wg0.conf على b (العميل)
[Interface]
Address = 10.99.0.2/24
PrivateKey = <المفتاح الخاص بتاع b>

[Peer]
PublicKey = <المفتاح العام بتاع a>
Endpoint = 10.77.0.10:51820
AllowedIPs = 10.99.0.0/24
PersistentKeepalive = 25
~~~

| السطر | معناه |
|---|---|
| [[Address]] | عنوان الطرف ده **جوه** النفق (شبكة جديدة [[10.99.0.0/24]]) |
| [[ListenPort]] | السيرفر سامع على UDP 51820. العميل من غيره بياخد بورت عشوائي |
| [[Endpoint]] | فين ألاقي الطرف التاني **بره** النفق |
| [[AllowedIPs]] | العناوين اللي تخص الـ peer ده (الدرس الجاي كله عنها) |
| [[PersistentKeepalive = 25]] | ابعت packet فاضي كل 25 ثانية عشان الـ NAT مايقفلش الطريق |

و [[chmod 600 /etc/wireguard/wg0.conf]] عشان فيه مفتاح خاص.

---

## 3) [[wg-quick up wg0]]

~~~text على a
[#] ip link add wg0 type wireguard
[#] wg setconf wg0 /dev/fd/63
[#] ip -4 address add 10.99.0.1/24 dev wg0
[#] ip link set mtu 1420 up dev wg0
~~~

[[wg-quick]] مجرد سكريبت بيطبع كل أمر قبل ما ينفّذه (السطر اللي يبدأ بـ [[#]] بين أقواس مربعة): كارت جديد، المفاتيح والـ peers، العنوان، والـ MTU [[1420]] (درس MTU).

---

## 4) [[wg show]] (على a، المفاتيح متقصّرة)

~~~text
interface: wg0
  public key: 2KuVZ9…
  private key: (hidden)
  listening port: 51820

peer: p30ap5…
  endpoint: 10.77.0.130:40173
  allowed ips: 10.99.0.2/32
  latest handshake: 19 seconds ago
  transfer: 180 B received, 92 B sent
~~~

- [[latest handshake]]: ده الدليل إن الطرفين اتعرّفوا على بعض بالمفاتيح.
- [[endpoint 10.77.0.130:40173]]: السيرفر **اتعلّم** عنوان العميل من أول packet (السيرفر ماكانش عنده Endpoint). (.130 ده العنوان التاني بتاع [[b]] من درس DHCP، وهو اللي الـ packets خرجت منه. لو العميل غيّر عنوانه، السيرفر بيحدّث الـ endpoint لوحده مع أول packet سليم.)
- [[transfer]]: بايتات النفق.

---

## 5) [[ping -c 2 10.99.0.1]] من b، والالتقاط على a

~~~text tcpdump -n -i wg0 (جوه النفق)
IP 10.99.0.2 > 10.99.0.1: ICMP echo request, id 30789, seq 1, length 64
IP 10.99.0.1 > 10.99.0.2: ICMP echo reply, id 30789, seq 1, length 64
~~~

~~~text tcpdump -n -i eth0 "udp port 51820" (بره النفق)
IP 10.77.0.130.40173 > 10.77.0.10.51820: UDP, length 128
IP 10.77.0.10.51820 > 10.77.0.130.40173: UDP, length 128
~~~

- على [[wg0]]: ping عادي بعناوين النفق. و [[link-type RAW (Raw IP)]] في أول سطر الالتقاط: مفيش Ethernet ولا MAC (زي كارت الـ TUN).
- على [[eth0]]: UDP بس، والـ ICMP مش باين خالص.

ليه 128؟ الـ ping packet = 84 بايت (64 + 8 ICMP + 20 IP). WireGuard بيكمّله لمضاعف 16 (= 96)، ويزوّد 16 بايت tag للتشفير (= 112)، و 16 بايت هيدر بتاعه (النوع والـ receiver index والـ counter) = **128**.

[[wg-quick down wg0]] بيمسح الكارت وكل اللي اتعمل (طبع [[ip link delete dev wg0]]).

## الخلاصة

- مفتاح خاص (مايخرجش) وعام (للطرف التاني)، و [[umask 077]].
- [[wg-quick]] = سكريبت فوق [[ip]] و [[wg]].
- اتأكد بـ [[latest handshake]] و [[transfer]]، وبالالتقاط: ICMP على [[wg0]] و UDP بس على [[eth0]].`,
        lines: [
          R`أي ملف يتعمل بعد كده يبقى مقروء للمالك بس (عشان المفتاح الخاص).`,
          R`بيعمل مفتاح خاص ويحفظه، ويحسب منه المفتاح العام ويحفظه في ملف تاني.`,
          R`بيقرا [[/etc/wireguard/wg0.conf]] ويعمل الكارت والعنوان والـ routes ويرفعه.`,
          R`بيعرض حالة النفق: المفاتيح العامة، والـ endpoint، و [[latest handshake]]، والبايتات.`,
          R`من العميل: ping لعنوان السيرفر **جوه** النفق.`,
          R`على السيرفر: اللي ظاهر على الكارت الحقيقي، UDP على 51820 بس.`,
          R`على السيرفر: اللي جوه النفق، الـ ICMP العادي بعناوين [[10.99.0.x]].`,
          R`بيقفل النفق ويمسح الكارت والـ routes اللي اتعملت.`
        ],
        sol: R`اتشغّل بين اتنين containers أوبونتو 24.04 على Docker Desktop: [[wg show]] على [[a]] وريني [[latest handshake: 19 seconds ago]]، والـ ping عدّى (0% loss)، والالتقاط وريني ICMP على [[wg0]] و [[UDP, length 128]] على [[eth0]].

حساب الـ 128: ping = 84 بايت (64 + 8 + 20)، يتكمّل لـ 96 (مضاعف 16)، + 16 tag للتشفير = 112، + 16 هيدر WireGuard = 128. وبره كمان UDP (8) و IP (20)، فاللي على السلك 156 بايت عشان 84 بايت.`
      },
      {
        cmd: "allowed_ips",
        title: R`AllowedIPs: جدول توجيه وفلتر في نفس الوقت، والنفق الكامل 0.0.0.0/0`,
        desc: R`[[AllowedIPs]] في WireGuard ليها شغلانتين: وأنت **باعت**، هي جدول التوجيه («الوجهة دي أبعتها لأنهي peer»). ووأنت **مستقبِل**، هي فلتر («الـ packet ده جاي من الـ peer ده، هل عنوان المصدر من حقه؟»). ده اسمه cryptokey routing.

ولما العميل يحط [[AllowedIPs = 0.0.0.0/0]] كل ترافيكه يدخل النفق (full tunnel). [[wg-quick]] بيعملها بـ policy routing و fwmark، مش بخدعة الـ [[/1]] بتاعة NetPilot، والسيرفر لازم يعمل NAT عشان الترافيك يطلع للإنترنت.`,
        example: R`# Linux (and WSL):
sudo wg show wg0 allowed-ips
sudo wg set wg0 peer <PUBKEY_B> allowed-ips 10.99.0.3/32
ping -c 2 -W 2 10.99.0.1
ip rule
ip route show table 51820
ip route get 1.1.1.1
sudo iptables -t nat -A POSTROUTING -s 10.99.0.0/24 -o eth0 -j MASQUERADE`,
        try: R`في المعمل غيّر AllowedIPs بتاعة [[b]] على السيرفر لعنوان غلط، وجرّب الـ ping. هل الـ handshake وقع؟ ([[wg show]]). وبعدين رجّعها، وجرّب [[ping 10.99.0.7]] (عنوان جوه [[10.99.0.0/24]] بس مش لحد): مين رد عليك وقال إيه؟`,
        deep: {
          why: R`AllowedIPs هي أهم سطر في أي إعداد WireGuard وأكتر حاجة بتتكتب غلط: لو ضيّقة الترافيك مش هيدخل النفق أو هيترمي من غير أي رسالة، ولو واسعة ممكن peer يدّعي عناوين مش بتاعته. وفهم النفق الكامل بيوضّح الفرق بين طرق الـ VPNs في الالتقاط (policy routing هنا، و [[/1]] في NetPilot)، وبيوريك تسريب IPv6 بعينك.`,
          how: R`الكيرنل بيحط كل AllowedIPs لكل الـ peers في شجرة longest-prefix. **وهو باعت**: الوجهة تتطابق بأطول prefix، والـ peer صاحبه هو اللي الـ packet يتشفّر له؛ لو مفيش peer، WireGuard يرجّع ICMP [[host unreachable]]. **وهو مستقبِل**: بعد فك التشفير، لو عنوان المصدر مش في AllowedIPs بتاعة الـ peer ده، الـ packet يترمي بصمت. في النفق الكامل [[wg-quick]] بيعمل: [[wg set wg0 fwmark 51820]] (packets النفق نفسه المشفّرة بتتعلّم بالرقم ده)، و route [[0.0.0.0/0 dev wg0]] في table 51820، و [[ip rule]] «أي حاجة مش متعلّمة روح table 51820»، وقاعدة [[suppress_prefixlength 0]] اللي بتخلّي الـ routes الأخص في main (زي الشبكة المحلية) تكسب. فالـ packets المشفّرة تخرج من [[eth0]] (مافيش loop)، وكل الباقي يدخل [[wg0]].`,
          when: R`كل ما تكتب config: على السيرفر AllowedIPs لكل عميل = عنوانه في النفق بس ([[/32]]). وعلى العميل: الشبكات اللي عايز توصلها (split tunnel) أو [[0.0.0.0/0, ::/0]] (full tunnel). ولما ping جوه النفق مايردّش والـ handshake سليم، أول حاجة تبص عليها AllowedIPs على الطرفين.`,
          mistakes: R`- تحط نفس العنوان في AllowedIPs لاتنين peers: الأحدث بياخده من الأول من غير خطأ.
- تكتب [[0.0.0.0/0]] بس وتنسى [[::/0]]: الـ IPv6 بيخرج بره النفق (اتشاف في المعمل).
- تنسى NAT و [[ip_forward]] على السيرفر في النفق الكامل: النفق شغّال والـ handshake سليم بس مفيش إنترنت.
- تشخّص «الـ handshake شغّال يبقى كله تمام»: الـ handshake ممكن ينجح والـ packets تترمي بسبب AllowedIPs (ده اللي حصل في التجربة).`
        },
        teach: R`## الفكرة: AllowedIPs = «العناوين اللي تخص الـ peer ده»

نفس نفق الدرس اللي فات. على [[a]]: AllowedIPs بتاعة [[b]] = [[10.99.0.2/32]]. على [[b]]: AllowedIPs بتاعة [[a]] = [[10.99.0.0/24]].

---

## 1) الاتجاه المستقبِل: فلتر

[[wg show wg0 allowed-ips]] على [[a]] (المفتاح متقصّر):

~~~text
p30ap5…	10.99.0.2/32
~~~

غيّرتها لعنوان غلط:

~~~bash
wg set wg0 peer <PUBKEY_B> allowed-ips 10.99.0.3/32
~~~

- [[wg set]]: تغيير مباشر في الكارت (من غير ما تلمس ملف الـ config).
- [[<PUBKEY_B>]]: المفتاح العام بتاع [[b]] (الـ peer اتعرف بمفتاحه).

ومن [[b]]: [[ping -c 2 -W 2 10.99.0.1]]:

~~~text
2 packets transmitted, 0 received, 100% packet loss, time 1006ms
~~~

الـ packets وصلت [[a]] واتفك تشفيرها، بس المصدر [[10.99.0.2]] مش من حق الـ peer ده (مسموحله [[.3]] بس)، فاترمت بصمت. لما رجّعتها [[10.99.0.2/32]]: [[1 received, 0% packet loss]].

---

## 2) الاتجاه الباعت: جدول توجيه

من [[b]]: [[ping -c1 -W2 10.99.0.7]]، والتقاط على [[wg0]] بتاع [[b]]:

~~~text
IP 10.99.0.2 > 10.99.0.7: ICMP echo request, id 30795, seq 1, length 64
IP 10.99.0.1 > 10.99.0.2: ICMP host 10.99.0.7 unreachable, length 92
~~~

- [[b]] بعت لـ [[a]] لأن [[10.99.0.7]] جوه AllowedIPs بتاعة [[a]] ([[10.99.0.0/24]]).
- [[a]] (اللي فيه [[ip_forward = 1]] جوه الـ container) حاول يوصّلها، وWireGuard عنده مالقاش peer للعنوان ده، فرجّع [[host unreachable]].

---

## 3) النفق الكامل: [[AllowedIPs = 0.0.0.0/0]] على b

~~~text wg-quick up wg0 (السطور الجديدة)
[#] wg set wg0 fwmark 51820
[#] ip -4 rule add not fwmark 51820 table 51820
[#] ip -4 rule add table main suppress_prefixlength 0
[#] ip -4 route add 0.0.0.0/0 dev wg0 table 51820
[#] sysctl -q net.ipv4.conf.all.src_valid_mark=1
sysctl: setting key "net.ipv4.conf.all.src_valid_mark", ignoring: Read-only file system
[#] iptables-restore -n
~~~

(الـ sysctl فشل لأن [[/proc/sys]] read-only في الـ containers، فحطيت القيمة دي بـ [[--sysctl net.ipv4.conf.all.src_valid_mark=1]] وقت [[docker run]].)

~~~text ip rule
0:	from all lookup local
32764:	from all lookup main suppress_prefixlength 0
32765:	not from all fwmark 0xca6c lookup 51820
32766:	from all lookup main
32767:	from all lookup default
~~~

الكيرنل بيمشي على القواعد بالترتيب (الرقم الأصغر الأول):

| القاعدة | معناها |
|---|---|
| [[32764]] | دوّر في main، بس **تجاهل** أي route طوله 0 (الـ default). فالشبكة المحلية [[10.77.0.0/24]] تفضل مباشرة |
| [[32765]] | أي packet **مش** متعلّم بـ [[0xca6c]] (= 51820 بالـ hex) يروح table 51820 |
| table 51820 | فيها سطر واحد: [[default dev wg0]] |

~~~text
$ ip route get 1.1.1.1
1.1.1.1 dev wg0 table 51820 src 10.99.0.2 uid 0
$ ip route get 10.77.0.10 mark 51820
10.77.0.10 dev eth0 src 10.77.0.20 mark 0xca6c uid 0
~~~

ترافيكك العادي ← [[wg0]]. والـ packets المشفّرة نفسها (WireGuard بيعلّمها بالـ fwmark) ← [[eth0]] للسيرفر، فمافيش loop. نفس المشكلة اللي NetPilot بيحلّها بمسار [[/32]] للسيرفر + [[0.0.0.0/1]] و [[128.0.0.0/1]] (درس جدول التوجيه)، بس بطريقة تانية.

---

## 4) السيرفر لازم يعمل NAT

[[curl -4 https://example.com]] من [[b]] فضل لحد الـ timeout: [[a]] بيستلم الترافيك ومش بيعرف يطلّعه. على [[a]]:

~~~bash
iptables -t nat -A POSTROUTING -s 10.99.0.0/24 -o eth0 -j MASQUERADE
~~~

- [[-t nat -A POSTROUTING]]: قاعدة NAT بعد قرار التوجيه.
- [[-s 10.99.0.0/24 -o eth0]]: اللي جاي من النفق وخارج من [[eth0]].
- [[-j MASQUERADE]]: غيّر المصدر لعنوان [[eth0]] بتاع السيرفر (درس NAT).

بعدها: [[IPv4: 200 from 10.99.0.2 in 16.690228s]]. (16 ثانية لأن الجهاز اللي عليه Docker كان نفسه على VPN.)

---

## 5) تسريب IPv6 بعينك

[[curl https://example.com]] من غير [[-4]] فضل يستنى: الاسم رجع عناوين IPv6 الأول، و [[ip -6 route get 2606:4700:10::6814:179a]] قال [[via fd00:77::1 dev eth0]]. الـ IPv6 مش في AllowedIPs ([[0.0.0.0/0]] IPv4 بس)، فبيخرج من [[eth0]] **بره** النفق. الحل: [[AllowedIPs = 0.0.0.0/0, ::/0]] (أو حجب IPv6 زي NetPilot).

## الخلاصة

- باعت: AllowedIPs = أنهي peer ياخد الوجهة دي. مستقبِل: هل المصدر من حق الـ peer ده.
- عنوان غلط = packets بتترمي بصمت والـ handshake سليم.
- النفق الكامل في [[wg-quick]] = fwmark + table 51820 + [[suppress_prefixlength 0]]، والسيرفر محتاج NAT، وماتنساش [[::/0]].`,
        lines: [
          R`بيعرض AllowedIPs لكل peer على الكارت.`,
          R`بيغيّر AllowedIPs بتاعة peer معيّن (بالمفتاح العام بتاعه) مباشرة على الكارت، هنا لعنوان غلط عشان التجربة.`,
          R`من العميل: ping للسيرفر جوه النفق؛ مع العنوان الغلط بيفشل 100% من غير أي رسالة خطأ.`,
          R`بيعرض قواعد الـ policy routing اللي [[wg-quick]] حطها للنفق الكامل.`,
          R`بيعرض جدول التوجيه رقم 51820 (فيه [[default dev wg0]] بس).`,
          R`بيسأل الكيرنل الـ packet العادي لـ [[1.1.1.1]] هيخرج منين ([[wg0]]).`,
          R`على السيرفر: NAT لكل اللي جاي من النفق وخارج للإنترنت، عشان النفق الكامل يشتغل.`
        ],
        sol: R`في المعمل: بعد [[allowed-ips 10.99.0.3/32]]، الـ ping قال [[100% packet loss]]، و [[wg show]] كان لسه فيه [[latest handshake]] حديث: التشفير شغّال والفلتر هو اللي بيرمي.

و [[ping 10.99.0.7]] رجع [[From 10.99.0.1 icmp_seq=1 Destination Host Unreachable]]: السيرفر حاول يوصّلها وWireGuard عنده مالقاش peer للعنوان، فرد بـ ICMP host unreachable.`
      },
      {
        cmd: "mtu",
        title: R`MTU والتجزئة بالأرقام: ليه WireGuard بيستخدم 1420`,
        desc: R`الـ MTU (Maximum Transmission Unit) = أكبر packet يعدّي على الكارت. Ethernet عادة [[1500]]. النفق بيضيف هيدرز حوالين كل packet، فالـ MTU جوه النفق لازم يبقى أصغر: WireGuard بيحط [[1420]] لأن الغلاف ممكن يوصل 80 بايت.

لو packet أكبر من الـ MTU: يا إما يتقسم (fragmentation)، يا إما لو عليه علم DF (Don't Fragment) يترفض. ودرس التغليف شرح الفكرة؛ هنا بنقيسها على نفق WireGuard حقيقي، ونشوف الـ MSS اللي TCP بيتفق عليه، و MSS clamping.`,
        example: R`# Linux (and WSL):
ip link show wg0
ping -M do -s 1392 -c 1 10.99.0.1
ping -M do -s 1393 -c 1 10.99.0.1
ping -s 2000 -c 1 10.99.0.1
sudo tcpdump -n -v -i wg0 "icmp or (tcp[tcpflags] & tcp-syn != 0)"
sudo iptables -t mangle -A FORWARD -o wg0 -p tcp --tcp-flags SYN,RST SYN -j TCPMSS --clamp-mss-to-pmtu
# Windows (PowerShell):
netsh interface ipv4 show subinterfaces`,
        try: R`احسب: لو النفق شغّال فوق IPv6 بدل IPv4، الغلاف بقى قد إيه؟ وليه 1420 بالظبط هو الرقم اللي يمشي في الحالتين على Ethernet 1500؟ وعلى ويندوز شغّل [[netsh interface ipv4 show subinterfaces]] وشوف الـ MTU لكل كارت.`,
        deep: {
          why: R`مشاكل الـ MTU من أصعب المشاكل في الشبكات لأنها بتظهر كأعراض غريبة: الـ ping شغّال، والمواقع الصغيرة بتفتح، بس الصفحات الكبيرة أو رفع الملفات بيعلّق. ده لأن الـ packets الصغيرة بتعدّي والكبيرة بتترمي. أي حد بيبني أو بيشغّل VPN لازم يعرف يحسب الـ MTU ويقيسه.`,
          how: R`غلاف WireGuard = هيدر IP الخارجي (20 لـ IPv4 أو 40 لـ IPv6) + UDP (8) + هيدر WireGuard (16) + tag التشفير (16) = 60 أو 80 بايت. 1500 − 80 = 1420، فالرقم ده بيمشي حتى لو الطرف التاني IPv6. جوه النفق لو packet أكبر من 1420: لو عليه DF، الكيرنل بيرفضه محليًا ([[message too long]]) أو الراوتر بيرجّع ICMP «fragmentation needed» (ده PMTUD)؛ لو مفيش DF، بيتقسم fragments كل واحدة بنفس الـ ID و [[offset]]، وعلامة [[+]] (More Fragments) على كل واحدة ماعدا الأخيرة. TCP بيتجنب ده من الأول: كل طرف بيعلن MSS = MTU − 40 (هيدر IP 20 + TCP 20)، و MSS clamping على الراوتر بيعدّل الرقم ده في الـ SYN وهو معدّي.`,
          when: R`لما تبني VPN أو نفق (WireGuard، GRE، VXLAN، Docker overlay)، لما مواقع معيّنة تعلّق ورا VPN، لما الـ PPPoE بتاع المزوّد يخلّي الـ MTU 1492، ولما شبكة بتحجب ICMP فالـ PMTUD مابيشتغلش (black hole). وقبل ما تقيس على جهازك وانت على VPN، افتكر درس التغليف: كارت الـ TUN بتاع NetPilot رد على ping كبير محليًا، فالقياس لازم يبقى على نفق انت متحكم في طرفيه زي المعمل ده.`,
          mistakes: R`- تقيس بـ [[ping]] من غير [[-M do]] (أو [[-f]] على ويندوز): الـ packet بيتقسم وينجح، فتفتكر المسار مستحمل.
- تنسى إن [[-s]] هو حجم الداتا بس: الـ packet = [[-s]] + 8 ICMP + 20 IP.
- ترفع الـ MTU جوه النفق لـ 1500 «عشان السرعة»: كل packet كبير هيتقسم بره أو يترمي.
- تحجب كل ICMP في الـ firewall: رسايل «fragmentation needed» بتتحجب والـ PMTUD يقع. لو مضطر، اعمل MSS clamping.`
        },
        teach: R`## الفكرة: الغلاف بياكل من الـ 1500

نفس نفق WireGuard بين [[a]] ([[10.99.0.1]]) و [[b]] ([[10.99.0.2]]).

---

## 1) [[ip link show wg0]]

~~~text على b
3: wg0: <POINTOPOINT,NOARP,UP,LOWER_UP> mtu 1420 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000
~~~

[[mtu 1420]] حطّه [[wg-quick]] لوحده. ليه 1420؟

| جزء الغلاف | فوق IPv4 | فوق IPv6 |
|---|---|---|
| هيدر IP الخارجي | 20 | 40 |
| UDP | 8 | 8 |
| هيدر WireGuard | 16 | 16 |
| tag التشفير (Poly1305) | 16 | 16 |
| **المجموع** | **60** | **80** |

1500 − 80 = **1420**: الرقم الأكبر اللي يمشي في الحالتين.

---

## 2) DF ping: الحد بالظبط

~~~text
$ ping -M do -s 1392 -c 1 10.99.0.1
PING 10.99.0.1 (10.99.0.1) 1392(1420) bytes of data.
1400 bytes from 10.99.0.1: icmp_seq=1 ttl=64 time=0.384 ms

$ ping -M do -s 1393 -c 1 10.99.0.1
PING 10.99.0.1 (10.99.0.1) 1393(1421) bytes of data.
ping: local error: message too long, mtu=1420
~~~

- [[-M do]]: حط علم DF (ماتقسّمش).
- [[1392(1420)]]: 1392 داتا + 8 ICMP + 20 IP = 1420 بالظبط، عدّى.
- 1393 = 1421، الكيرنل رفضه قبل ما يخرج ([[local error]]) لأنه عارف الـ MTU.

---

## 3) من غير DF: التجزئة

[[ping -s 2000 -c 1 10.99.0.1]] نجح ([[2008 bytes from 10.99.0.1]])، بس شوف اتبعت إزاي (التقاط [[-v]] على [[wg0]] بتاع [[a]]):

~~~text
IP (tos 0x0, ttl 64, id 8898, offset 0, flags [+], proto ICMP (1), length 1420)
    10.99.0.2 > 10.99.0.1: ICMP echo request, id 30798, seq 1, length 1400
IP (tos 0x0, ttl 64, id 8898, offset 1400, flags [none], proto ICMP (1), length 628)
    10.99.0.2 > 10.99.0.1: ip-proto-1
~~~

- الـ packet (2028 بايت) اتقسم لاتنين: 1420 و 628.
- نفس [[id 8898]]: ده اللي بيخلّي المستقبِل يعرف إنهم حتت من نفس الـ packet.
- [[offset 0]] وعلامة [[+]] في الـ flags: أول حتة، وفيه حتت تانية جاية. [[offset 1400]] و [[none]]: الحتة الأخيرة تبدأ من البايت 1400 من الداتا.
- 1400 + 608 (628 − 20 هيدر) = 2008 = الـ ICMP كله.
- الحتة التانية مكتوب عليها [[ip-proto-1]] بس: هيدر الـ ICMP في الحتة الأولى، فـ tcpdump مش عارف يفكها.

وعلى [[eth0]] (بره النفق) كل حتة اتغلّفت لوحدها:

~~~text
IP 10.77.0.130.40173 > 10.77.0.10.51820: UDP, length 1452
IP 10.77.0.130.40173 > 10.77.0.10.51820: UDP, length 672
~~~

1420 + 32 = 1452، و 628 (يتكمّل لـ 640) + 32 = 672. و 1452 + 8 + 20 = 1480 ≤ 1500، فالغلاف نفسه ماتقسمش.

---

## 4) TCP بيتفادى ده بالـ MSS

نفس الالتقاط، وقت [[curl http://10.99.0.1:8000/]]:

~~~text
10.99.0.2.44588 > 10.99.0.1.8000: Flags [S], ... options [mss 1380,sackOK,TS val 309105265 ecr 0,nop,wscale 10], length 0
10.99.0.1.8000 > 10.99.0.2.44588: Flags [S.], ... options [mss 1380,sackOK,TS val 1888065511 ecr 309105265,nop,wscale 10], length 0
~~~

[[mss 1380]] = 1420 − 20 (IP) − 20 (TCP). كل طرف بيقول «ماتبعتليش segment أكبر من 1380 بايت داتا»، فـ TCP مابيعملش packets تتقسم أصلًا. (قارن بـ [[mss 1460]] في درس الالتقاط على [[eth0]] = 1500 − 40.)

لو العملاء ورا السيرفر (راوتر VPN) ومش عارفين إن فيه نفق، السيرفر يعدّل الـ MSS في الـ SYN وهو معدّي:

~~~bash
iptables -t mangle -A FORWARD -o wg0 -p tcp --tcp-flags SYN,RST SYN -j TCPMSS --clamp-mss-to-pmtu
~~~

| الحتة | معناها |
|---|---|
| [[-t mangle -A FORWARD]] | جدول تعديل الـ packets، على اللي **معدّي** من خلال الجهاز |
| [[-o wg0 -p tcp]] | خارج على النفق، TCP |
| [[--tcp-flags SYN,RST SYN]] | من الـ flags دي، SYN بس اللي شغّال (أول packet في الاتصال) |
| [[-j TCPMSS --clamp-mss-to-pmtu]] | غيّر الـ MSS لـ (MTU الكارت الخارج − 40) |

اتحطت في container [[a]] و [[iptables -t mangle -S FORWARD]] وراها (iptables v1.8.10).

---

## 5) على ويندوز

~~~text netsh interface ipv4 show subinterfaces (جزء، ويندوز 11)
       MTU  MediaSenseState      Bytes In     Bytes Out  Interface
----------  ---------------  ------------  ------------  -------------
      1500                1   13653282620     399207124  Wi-Fi
     65535                1    6518320587     190018043  netpilot0
~~~

الـ Wi-Fi 1500، وكارت الـ TUN بتاع NetPilot ويندوز شايفه 65535: الـ netstack اللي جوه Xray هو اللي بيتعامل مع الأحجام (درس كارت الـ TUN).

## الخلاصة

- MTU النفق = MTU الكارت − الغلاف. WireGuard: 1500 − 80 = 1420.
- [[ping -M do -s N]]: الـ packet = N + 28. أكبر N عدّى = MTU − 28.
- من غير DF بيتقسم (نفس الـ id، و [[offset]]، و [[+]]).
- TCP بيعلن MSS = MTU − 40، و [[TCPMSS --clamp-mss-to-pmtu]] بيصلّحه للي ورا الراوتر.`,
        lines: [
          R`بيعرض الـ MTU بتاع كارت النفق ([[1420]]).`,
          R`ping بعلم DF ([[-M do]]) وداتا 1392: الـ packet = 1420 بالظبط، يعدّي.`,
          R`بايت واحد زيادة (1421): الكيرنل بيرفضه محليًا بـ [[message too long, mtu=1420]].`,
          R`من غير DF وداتا 2000: الـ packet بيتقسم لحتتين وينجح.`,
          R`بيلتقط الـ ICMP والـ SYN على كارت النفق و [[-v]] بيطبع الـ id والـ offset والـ flags والـ MSS.`,
          R`MSS clamping: أي SYN معدّي وخارج على [[wg0]] الـ MSS بتاعه يتظبط على الـ MTU.`,
          R`ويندوز: الـ MTU لكل كارت (قراءة بس).`
        ],
        sol: R`فوق IPv6 الغلاف = 40 + 8 + 16 + 16 = 80 بايت، وفوق IPv4 = 60. على Ethernet 1500: 1500 − 80 = 1420 بيمشي في الحالتين، وده سبب إن [[wg-quick]] بيختاره.

وعلى ويندوز 11 [[netsh interface ipv4 show subinterfaces]] وريني الـ Wi-Fi 1500، والـ loopback [[4294967295]] (يعني مالوش حد عملي)، و [[netpilot0]] 65535.`
      }
    ]
  }
]);
