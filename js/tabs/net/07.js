// تكملة تاب net: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/net/01.js (شرح حقول الدرس في أوله)
MORE("net", [
    {
      t: "حالات النفق على ويندوز: تشخيص من الشغل الحقيقي",
      l: 3,
      time: R`حوالي ٦ ساعات (كل حالة ساعة بالمعمل)`,
      goal: [
        R`تقيس قبل ما تغيّر: معدّل الباكتس على الكارت، وعدد الـ sockets لكل بروسس، وسطر اللوج اللي بيقول الباكت راحت فين، وبعدين تحكم.`,
        R`تكتشف حلقة توجيه بتخلّي الكارت يبعت ١٢٠ ألف باكت في الثانية والتنزيل الحقيقي ١٠٠ KB/s، وتصلّحها بقاعدة block مش بسقف رام.`,
        R`تثبت بتجربة A/B بـ curl إن اسم الموقع بيتحل عند السيرفر ولا عندك، وتختار الصح.`,
        R`تفهم ليه الموبايل اللي على هوت سبوت اللابتوب مش بيعدّي من النفق، وإيه اللي بيتشارك فعلًا.`,
        R`تشارك النفق بـ proxy على الشبكة المحلية من غير ما تفتح جهازك لأي حد، ومن غير ما الـ proxy يوصل لـ localhost.`,
        R`تفرّق بين الـ SNI واسم الشهادة، وتعرف ليه عميل بيتصل وعميل تاني لأ، من غير ما تقفل التحقق.`,
      ],
      use: {
        net: R`كل حالة هنا بتستخدم حاجة من المستوى التالت: [[tun]] و [[routing]] و [[socks_proxy]] و [[tls_sni]] و [[nat]]، بس وهي واقعة فعلًا ومحتاجة تتشخّص.`,
        work: R`أي أداة VPN أو proxy أو agent بيركّب routes على جهاز هتقابل واحدة من دول. والطريقة واحدة: قيس، وضيّق، واثبت السبب بأمر، وبعدين غيّر حاجة واحدة.`,
        prog: R`في كل حالة الحل كان في الكود أو الإعداد (قاعدة توجيه، أو ترتيب خطوات، أو سؤال «إعادة الاتصال؟») مش في الويندوز نفسه.`,
      },
      lab: R`docker run -d --name netcases --privileged ubuntu:24.04 sleep 7200
docker exec netcases bash -c "apt-get update -qq && apt-get install -y -qq python3 curl iproute2 iptables openssl procps >/dev/null"
docker exec -it netcases bash`,
      projects: [
        { lvl: 'صغير', t: R`[[pps.ps1]]: الكارت بيبعت قد إيه؟`, what: R`سكربت بياخد اسم كارت وعدد ثواني، ويقرا [[Get-NetAdapterStatistics]] قبل وبعد، ويطبع باكتس/ثانية خارجة وداخلة و KB/s، ويكتب [[AMPLIFICATION?]] لو الخارج أكتر من الداخل ١٠٠ مرة والـ KB/s الداخلة قليلة. ونسخة bash بتقرا [[ip -s link]]. من درس «حلقة التضخيم».`, done: R`على كارت ساكت بيطبع أرقام قريبة من صفر ومن غير تحذير، وعلى معمل الحلقة بيطبع أكتر من ١٠٠ ألف خارجة و 0 داخلة ومعاها [[AMPLIFICATION?]]، واسم كارت غلط بيطلع رسالة واضحة وكود خروج 2.` },
        { lvl: 'صغير', t: R`[[ab.sh]]: الاسم بيتحل فين؟`, what: R`سكربت المقارنة اللي في درس «الاسم بيتحل فين» بلستة مواقع من ملف، وعدد جولات من parameter، وبيطلع جدول CSV: الموقع، والوضع ([[socks5h]] ولا [[socks5]])، ونجح كام من كام، ومتوسط الوقت.`, done: R`على المعمل الجدول بيطلع ٥/١٢ للـ [[socks5h]] و ١٢/١٢ للـ [[socks5]]، والـ CSV بيفتح في Excel صح، ولو الـ proxy مش شغّال بيقول كده في سطر واحد بدل ٣٦ فشل.` },
        { lvl: 'متوسط', t: R`[[route-lint]]: قواعد التوجيه فيها حلقة؟`, what: R`أداة بتقرا ملف قواعد (JSON) فيه [[direct]] و [[proxy]] و [[block]] بالترتيب، وجدول توجيه الجهاز ([[ip route]] أو [[Get-NetRoute]] متصدّر JSON)، ولكل شبكة في قاعدة [[direct]] بتسأل: الطريق ليها بيخرج من الكارت الحقيقي ولا بيرجع للنفق؟ وتطبع كل قاعدة هتعمل حلقة. من درس «حلقة التضخيم».`, done: R`على قواعد المعمل الأصلية بتطلع ٣ مشاكل ([[224.0.0.0/4]] و [[10.255.0.0/24]] و [[255.255.255.255]])، وبعد الإصلاح صفر، و [[192.168.1.0/24]] مبتطلعش مشكلة لأن طريقها من الكارت الحقيقي.` },
        { lvl: 'متوسط', t: R`[[share-check.ps1]]: مين يقدر يوصل للـ proxy المشترك؟`, what: R`سكربت قراية بس: البورتات اللي فاتحة على [[0.0.0.0]] ومين صاحبها، والـ profile بتاع الشبكة (Public/Private)، وقواعد الجدار اللي على البورتات دي و [[RemoteAddress]] بتاعها، وعنوان الجهاز اللي يتكتب في الموبايل. من درس «مشاركة النفق على الـ LAN».`, done: R`بيطبع جدول واحد، وبيعلّم [[OPEN TO ANY]] لو فيه قاعدة allow من غير [[LocalSubnet]]، و [[NOT LISTENING]] لو الإعداد متفعّل والبورت مش فاتح، ومبيغيّرش أي حاجة على الجهاز.` },
        { lvl: 'كبير', t: R`[[tunnel-doctor]]: تقرير تشخيص كامل للنفق`, what: R`أداة (PowerShell على ويندوز و bash على لينكس) بتجمع في تقرير واحد: الـ routes ([[/1]] و [[/32]] للسيرفر)، ومعدّل الباكتس على الكارت ٣ ثواني، وأكبر ٣ بروسس في UDP sockets، و IP الخروج على IPv4 و IPv6، ووقت الـ connect والـ TLS، والبورتات المشتركة وقواعد الجدار، وآخر ٢٠ سطر [[direct]] من اللوج. كل فحص ليه حكم ([[OK]] و [[WARN]] و [[FAIL]]) وسبب، والتقرير يتحفظ JSON ونص. بيجمع كل دروس الوحدة.`, done: R`على المعمل وهو سليم كله [[OK]]. ومع حلقة الـ multicast فحص المعدّل [[FAIL]] وبيشاور على سطر [[224.0.0.251]] في اللوج. ومع proxy مشترك من غير جدار فحص المشاركة [[WARN]]. وتشغيله مرتين ورا بعض بيطلع نفس النتيجة ومبيسيبش ملفات مؤقتة.`, ext: R`زوّد وضع [[--watch]] يعيد القياس كل دقيقة ويكتب سطر بس لما حكم يتغيّر، وقارن تقريرين ([[--diff old.json new.json]]) عشان تشوف تعديل القواعد عمل إيه بالأرقام.` },
        { lvl: 'كبير', t: R`معمل «اكسرها وصلّحها» للنفق`, what: R`سكربت واحد بيبني معمل الـ namespaces اللي في الوحدة (لابتوب وموبايل وإنترنت وسيرفر) ومعاه ٦ أعطال تختار منها برقم: حلقة multicast، وDNS عند السيرفر ضعيف، وهوت سبوت مربوط بكارت قديم، وإعداد مشاركة اتفعّل والاتصال شغّال، وكارت TAP بدل TUN، و SNI غير اسم الشهادة. وكل عطل ليه أمر [[check]] بيقول اتصلّح ولا لأ، وأمر [[reset]].`, done: R`كل عطل من الـ ٦ بيظهر بنفس العرض اللي في الدرس بتاعه، و [[check]] بيفشل قبل الإصلاح وينجح بعده، و [[reset]] بيرجّع المعمل نضيف ([[ip netns list]] فاضي بعد [[destroy]]).`, ext: R`خلّي العطل يتختار عشوائي وصاحبك يشخّصه بالوقت، وسجّل الوقت اللي خده كل مرة.` },
        { lvl: 'فكرة', t: R`سجل قرارات أداة الـ VPN بتاعتك`, what: R`لو بتبني أو بتظبط أداة نفق (أو أي برنامج بيغيّر شبكة الجهاز)، اكتب لكل تعديل في القواعد أو ترتيب الخطوات: القياس قبله (رقم)، والسبب اللي اكتشفته بأمر، والتعديل، والقياس بعده، والبدايل اللي رفضتها. انت اللي بتقرر الشكل.`, done: R`فيه ٣ قرارات على الأقل، كل واحد فيه رقمين حقيقيين (قبل وبعد) من أمر مكتوب، وزميل قدر يعيد قياس واحد منهم ويطلع نفس الرقم تقريبًا.`, ext: R`حوّل القياسات لاختبارات بتتشغّل قبل أي release: لو الـ packets/s وانت ساكت عدّت رقم معين، الـ release يقف.` },
      ],
      n: R`ست حالات حقيقية من أداة VPN على ويندوز، كل واحدة اتعادت في معمل لينكس (كونتينر [[--privileged]] و network namespaces) والأرقام اللي في الشرح طالعة منه. الأوامر اللي بتغيّر شبكة ويندوز (routes، وهوت سبوت، وجدار حماية) مكتوبة من وثائق Microsoft ومتعلّمة كده، والباقي اتشغّل فعلًا`,
      items: [
        {
          cmd: "حلقة التضخيم",
          title: R`النت بطيء والـ proxy على 400% CPU: باكت multicast بترجع للكارت وتتبعت تاني للأبد`,
          learn: R`تقيس معدّل الباكتس على الكارت وتعرف إن الرقم ده تضخيم مش ترافيك، وتلاقي البروسس والوجهة من الـ sockets واللوج، وتثبت الحلقة بـ [[ip route get]]، وتصلّحها بقاعدة block أول القواعد.`,
          out: R`نفس القياس بعد الإصلاح: الكارت ساكت (0 باكت/ثانية في المعمل)، والـ CPU صفر، ومفيش UDP sockets زيادة.`,
          desc: R`أداة VPN شغّالة، والـ routes سليمة، والنت بطيء جدًا أو بيقف. وفي Task Manager: الـ proxy (Xray) على 400% CPU وبعدها 1.2 GB رام، و 15 ألف UDP socket. القياس على الكارت قال **حوالي ١٢٠ ألف باكت/ثانية خارجة وباكت واحدة راجعة**، والتنزيل الفعلي 100 KB/s. ده مش ترافيك، ده **تضخيم**.

السبب: قاعدة توجيه بتبعت الوجهات «الخاصة» (multicast زي [[224.0.0.251]]، و subnet الكارت نفسه [[10.255.0.0/24]]) لـ [[direct]]. والـ [[direct]] معناه «اطلع من غير proxy على طول»، بس الويندوز لما يسأل جدول التوجيه «[[224.0.0.251]] أطلّعها منين؟» الإجابة: **من كارت النفق نفسه**. فالباكت ترجع للكارت، والـ proxy يقراها، ويبعتها [[direct]] تاني... للأبد. وكل لفّة بتفتح socket جديد.

الحل: أول قاعدة في الترتيب **block** لأي وجهة طريقها بيرجع للنفق ([[10.255.0.0/24]] و [[224.0.0.0/4]] و [[255.255.255.255]] و [[fe80::/10]] و [[ff00::/8]])، والشبكة المحلية [[192.168.x]] تفضل [[direct]] لأنها بتخرج من الكارت الحقيقي فعلًا. في المعمل: من ١١٨ ألف باكت/ثانية لصفر.`,
          example: R`# Windows (PowerShell):
route print -4 | findstr "128.0.0.0 203.0.113.9"
$a = Get-NetAdapterStatistics -Name vpnlab0; Start-Sleep 3; $b = Get-NetAdapterStatistics -Name vpnlab0
"{0:N0} out/s  {1:N0} in/s" -f (($b.SentUnicastPackets - $a.SentUnicastPackets) / 3), (($b.ReceivedUnicastPackets - $a.ReceivedUnicastPackets) / 3)
Get-NetUDPEndpoint | Group-Object OwningProcess | Sort-Object Count -Descending | Select-Object -First 3 Count, Name
Get-CimInstance Win32_Process -Filter "ProcessId=4242" | Select-Object Name, CommandLine
Select-String -Path .\proxy.log -Pattern '-> direct' | Select-Object -Last 5
# Linux (and WSL):
ip route get 224.0.0.251`,
          lines: [
            R`السؤال الأول: الـ routes سليمة؟ [[route print -4]] بيطبع جدول IPv4، و [[findstr]] بيطلّع السطور اللي فيها [[128.0.0.0]] (نص الـ [[/1+/1]]) أو IP السيرفر ([[/32]] اللي بيمنع النفق يلف على نفسه). لو الاتنين موجودين، الـ routes مش هي المشكلة.`,
            R`صورتين من عدّادات الكارت بينهم ٣ ثواني. [[Get-NetAdapterStatistics]] بيرجّع object فيه عدّادات تراكمية من أول ما الكارت اشتغل (باكتس وبايتس، خارج وداخل)، فالفرق بين صورتين هو اللي حصل في الـ ٣ ثواني.`,
            R`الفرق ÷ ٣ = في الثانية. [[-f]] بيحط الأرقام في القالب، و [[{0:N0}]] رقم بفواصل الآلاف ومن غير كسور ([[120,000]] بدل [[120000.333]]). [[Sent]] = اللي الويندوز بعته **للكارت** (يعني للبرنامج اللي ماسكه).`,
            R`مين فاتح UDP sockets كتير؟ [[Get-NetUDPEndpoint]] كل socket UDP على الجهاز، و [[Group-Object OwningProcess]] يجمعهم برقم البروسس، و [[Sort-Object Count -Descending]] الأكتر الأول.`,
            R`رقم البروسس ده مين؟ [[Win32_Process]] فيه [[CommandLine]] كامل (البرنامج والـ config اللي شغّال بيه)، وده مش موجود في [[Get-Process]] العادي.`,
            R`الـ proxy بيكتب لكل اتصال سطر زي [[accepted udp:224.0.0.251:5353 [tun-in -> direct]]]. [[Select-String -Pattern]] يطلّع سطور [[direct]]، و [[-Last 5]] آخر ٥. هنا بتشوف **الوجهة** اللي بتلف.`,
            R`على لينكس (المعمل): [[ip route get]] بيسأل الكيرنل «لو هبعت لـ العنوان ده، هتطلّعه منين؟». الإجابة [[dev vpnlab0]] = الـ [[direct]] لـ multicast راجع للنفق. ده دليل الحلقة في سطر.`,
          ],
          try: R`ابني المعمل اللي في الشرح (كارت [[vpnlab0]] و [[miniproxy.py]])، وابعت باكت mDNS واحدة، وقيس [[tx_packets]] في ٣ ثواني. وبعدين شغّل الـ proxy بـ [[BLOCK="10.255.0.0/24,224.0.0.0/4,255.255.255.255/32"]] وابعت نفس الباكت وقيس تاني.`,
          teach: R`## العَرَض

أداة VPN على ويندوز: كارت [[wintun]] اسمه [[vpnlab0]]، وجوه البرنامج proxy (Xray) بيقرا الباكتس من الكارت ويطبّق قواعد توجيه ([[direct]] و [[proxy]] و [[block]]). بعد تعديل في القواعد:

- النت بطيء جدًا، وأحيانًا يقف خالص.
- Task Manager: الـ proxy على **400% CPU**، وبعد شوية **1.2 GB** رام.
- ومفيش أي حاجة غريبة في الـ routes.

اتجرّبت ٣ تعديلات قبل ما حد يقيس: سقف رام، وتفعيل IPv6 على الكارت، وإعادة تشغيل. ولا واحد نفع، والتاني زوّد المشكلة. **التلاتة كانوا بيعالجوا عَرَض.** الدرس ده هو الترتيب اللي وصل للسبب.

---

## المعمل

مش هنلمس شبكة ويندوز. هنعيد نفس الحلقة في كونتينر لينكس [[--privileged]] (Ubuntu 24.04 و Python 3.12): كارت TUN بنفس الاسم، وبرنامج صغير بيعمل اللي الـ proxy بيعمله بالظبط: يقرا الباكت من الكارت، ويقرر حسب القاعدة، ولو [[direct]] يبعتها بـ socket عادي.

~~~python miniproxy.py
#!/usr/bin/env python3
# miniproxy.py: بيقرا الباكتس من كارت TUN ويطبّق قواعد توجيه زي أي proxy
import os, fcntl, struct, socket, ipaddress
TUNSETIFF, IFF_TUN, IFF_NO_PI = 0x400454ca, 0x0001, 0x1000
fd = os.open("/dev/net/tun", os.O_RDWR)
fcntl.ioctl(fd, TUNSETIFF, struct.pack("16sH", b"vpnlab0", IFF_TUN | IFF_NO_PI))
def nets(s): return [ipaddress.ip_network(x) for x in s.split(",") if x]
BLOCK  = nets(os.environ.get("BLOCK", ""))
DIRECT = nets(os.environ.get("DIRECT", "10.255.0.0/24,224.0.0.0/4,192.168.0.0/16"))
flows, logged = {}, set()
log = open("proxy.log", "a", buffering=1)
while True:
    pkt = os.read(fd, 65535)
    if pkt[0] >> 4 != 4 or pkt[9] != 17: continue      # IPv4 + UDP بس
    ihl = (pkt[0] & 15) * 4
    src, dst = socket.inet_ntoa(pkt[12:16]), socket.inet_ntoa(pkt[16:20])
    sport, dport = struct.unpack("!HH", pkt[ihl:ihl+4])
    d = ipaddress.ip_address(dst)
    out = "block" if any(d in n for n in BLOCK) else "direct" if any(d in n for n in DIRECT) else "proxy"
    if (dst, dport, out) not in logged:
        logged.add((dst, dport, out)); log.write(f"accepted udp:{dst}:{dport} [tun-in -> {out}]\n")
    if out != "direct": continue
    key = (src, sport, dst, dport)                    # كل flow جديد = socket جديد
    if key not in flows:
        flows[key] = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try: flows[key].sendto(pkt[ihl+8:], (dst, dport))
    except OSError: pass
~~~

| الحتة | بتعمل إيه |
|---|---|
| [[TUNSETIFF]] | بيربط الـ file descriptor بكارت اسمه [[vpnlab0]]: أي باكت الكيرنل يبعتها للكارت، البرنامج يقراها بـ [[os.read]] |
| [[IFF_NO_PI]] | الباكت توصل IP خام من غير ٤ بايت معلومات زيادة قبلها |
| [[pkt[9] != 17]] | البايت رقم ٩ في هيدر IPv4 هو البروتوكول، و 17 = UDP |
| [[DIRECT]] | القاعدة الغلط: الوجهات «الخاصة» تخرج من غير proxy، وده منطقي على الورق |
| [[flows]] | زي الـ proxy الحقيقي: كل (مصدر، بورت، وجهة) جديد بياخد socket خاص بيه عشان الرد يرجع لصاحبه |
| [[sendto]] | الـ [[direct]]: اطلب من الكيرنل يبعت الـ payload للوجهة. **الكيرنل** هو اللي هيختار الكارت من جدول التوجيه |

~~~bash
ip tuntap add dev vpnlab0 mode tun
ip addr add 10.255.0.2/24 dev vpnlab0 && ip link set vpnlab0 up
GW=$(ip route show default | awk '{print $3}')
ip route add 203.0.113.9/32 via $GW dev eth0
ip route add 0.0.0.0/1 via 10.255.0.1 dev vpnlab0
ip route add 128.0.0.0/1 via 10.255.0.1 dev vpnlab0
ip route add 224.0.0.0/4 dev vpnlab0
ip route replace 192.168.1.0/24 via $GW dev eth0
python3 miniproxy.py &
~~~

نفس شكل ويندوز: [[/1+/1]] للنفق، و [[/32]] للسيرفر من الكارت الحقيقي، و multicast على الكارت (ويندوز بيحط [[224.0.0.0/4]] على **كل** كارت، وأقل metric بيكسب، وكارت النفق metric بتاعه صغير)، و [[192.168.1.0/24]] الشبكة المحلية من الكارت الحقيقي.

وبعدين أي برنامج على الجهاز يبعت باكت mDNS واحدة (ويندوز بيبعت دول لوحده كل شوية، ومعاهم SSDP على [[239.255.255.250:1900]] و NetBIOS على [[:137]]):

~~~bash
python3 -c 'import socket; s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM); s.sendto(b"q", ("224.0.0.251", 5353))'
~~~

---

## ١. الـ routes سليمة؟ (الأرخص الأول)

ليه ده الأول؟ لأن أغلب مشاكل «VPN شغّال والنت بطيء» سببها route ناقص أو زيادة، والفحص ثانية واحدة.

~~~text ip route (المعمل)
0.0.0.0/1 via 10.255.0.1 dev vpnlab0
default via 172.17.0.1 dev eth0
10.255.0.0/24 dev vpnlab0 proto kernel scope link src 10.255.0.2
128.0.0.0/1 via 10.255.0.1 dev vpnlab0
172.17.0.0/16 dev eth0 proto kernel scope link src 172.17.0.3
203.0.113.9 via 172.17.0.1 dev eth0
224.0.0.0/4 dev vpnlab0 scope link
~~~

النصين موجودين، والسيرفر بـ [[/32]] من [[eth0]]. **الـ routes سليمة.** يعني المشكلة مش «الترافيك رايح فين»، المشكلة «الترافيك ده إيه».

---

## ٢. عدّاد الكارت: ترافيك ولا تضخيم؟

~~~bash
stat(){ cat /sys/class/net/vpnlab0/statistics/$1; }
a=$(stat tx_packets); b=$(stat rx_packets); sleep 3
echo "tx/s $(( ($(stat tx_packets) - a) / 3 )) rx/s $(( ($(stat rx_packets) - b) / 3 ))"
~~~

~~~text الناتج
== before seed
tx/s 0 rx/s 0
== after one mDNS packet
tx/s 118093 rx/s 0
~~~

| العدّاد | معناه على كارت TUN |
|---|---|
| [[tx_packets]] | الباكتس اللي الكيرنل **بعتها للكارت**، يعني اتسلّمت للبرنامج ([[SentUnicastPackets]] في ويندوز) |
| [[rx_packets]] | الباكتس اللي البرنامج **كتبها في الكارت**، يعني ردود راجعة للتطبيقات |

باكت **واحدة** عملت ١١٨ ألف باكت/ثانية، ومفيش ولا باكت راجعة. وفي الحالة الحقيقية على ويندوز الرقم كان حوالي **١٢٠ ألف خارجة وواحدة راجعة**، والتنزيل الحقيقي 100 KB/s. لو ده كان ترافيك حقيقي، كان هيبقى فيه ردود. **خارج كتير جدًا وداخل صفر = حاجة بتلف.**

---

## ٣. مين فاتح الـ sockets؟

~~~text على ويندوز (الحالة الحقيقية)
Get-NetUDPEndpoint | Group-Object OwningProcess | Sort-Object Count -Descending | Select-Object -First 3 Count, Name

Count Name
----- ----
15210 4242
   12 1880
    5 2136
~~~

~~~text على لينكس (المعمل): ss -uanp | grep -c "pid=$P,"
t=2s udp=10343 cpu,rss=67.9 15844
before: tx/s 114198 rx/s 0 cpu%=100 udp=28232 rssKB=23168
~~~

بروسس واحد ماسك عشرات الآلاف من UDP sockets، والباقي بالعشرات. وفي ويندوز [[Get-CimInstance Win32_Process -Filter "ProcessId=4242"]] بيقول إنه الـ proxy ومعاه مسار الـ config. ليه sockets كتير كده؟ كل لفّة الباكت بتخرج من socket جديد ببورت مصدر جديد، فلما ترجع، الـ proxy شايفها **flow جديد** فيفتح socket جديد. والـ sockets دي هي اللي أكلت الرام (1.2 GB في الحالة الحقيقية).

---

## ٤. اللوج: الوجهة إيه؟

~~~text sort proxy.log
accepted udp:10.255.0.7:137 [tun-in -> direct]
accepted udp:224.0.0.251:5353 [tun-in -> direct]
accepted udp:239.255.255.250:1900 [tun-in -> direct]
~~~

التلاتة multicast أو جوه subnet الكارت نفسه. ونفس الأسطر بالظبط كانت في لوج الحالة الحقيقية: [[224.0.0.251:5353]] (mDNS)، و [[10.255.0.255:137]] (broadcast الكارت، NetBIOS)، و [[239.255.255.250:1900]] (SSDP).

---

## ٥. الدليل: [[ip route get]]

~~~text ip route get <dst>
multicast 224.0.0.251 dev vpnlab0 src 10.255.0.2
multicast 239.255.255.250 dev vpnlab0 src 10.255.0.2
10.255.0.7 dev vpnlab0 src 10.255.0.2
192.168.1.50 via 172.17.0.1 dev eth0 src 172.17.0.3
8.8.8.8 via 10.255.0.1 dev vpnlab0 src 10.255.0.2
203.0.113.9 via 172.17.0.1 dev eth0 src 172.17.0.3
~~~

[[direct]] معناه «اطلب من النظام يبعتها». والنظام بيبعت [[224.0.0.251]] و [[10.255.0.7]] **لـ [[vpnlab0]]**. يعني:

~~~text
تطبيق ─► 224.0.0.251 ─► vpnlab0 ─► proxy: «خاصة؟ direct» ─► sendto
                          ▲                                    │
                          └──── النظام: «224/4؟ من vpnlab0» ◄──┘
~~~

أما [[192.168.1.50]] (الطابعة اللي في البيت مثلًا) فبتخرج من [[eth0]]، فـ [[direct]] ليها صح. القاعدة كانت صح للـ LAN وغلط للـ multicast وللـ subnet بتاع الكارت.

وعلى ويندوز؟ [[Find-NetRoute -RemoteIPAddress 224.0.0.251]] بيرد [[Find-NetRoute: The requested object could not be found.]] (مش بيجاوب لـ multicast)، فالسؤال يتسأل للجدول مباشرة:

~~~powershell
Get-NetRoute -DestinationPrefix 224.0.0.0/4 | Select-Object InterfaceAlias, RouteMetric, @{n='IfMetric'; e={ (Get-NetIPInterface -InterfaceIndex $_.ifIndex -AddressFamily IPv4).InterfaceMetric }} | Sort-Object { $_.RouteMetric + $_.IfMetric }
~~~

~~~text الناتج على ويندوز ١١ (من غير VPN، كروت تانية اتشالت)
InterfaceAlias                     RouteMetric IfMetric
--------------                     ----------- --------
Ethernet                                   256 5
Local Area Connection* 2                   256 25
Wi-Fi                                      256 40
Bluetooth Network Connection               256 65
Loopback Pseudo-Interface 1                256 75
vEthernet (WSL (Hyper-V firewall))         256 5000
~~~

[[224.0.0.0/4]] موجودة على **كل** كارت، والكسبان أقل مجموع ([[RouteMetric]] + [[InterfaceMetric]]). الـ Wi-Fi هنا [[40]]، فأي كارت نفق الأداة بتدّيله metric أقل (أدوات كتير بتحط [[5]] أو [[1]] عشان DNS بتاعه يتفضّل) هيبقى هو اللي بيطلّع الـ multicast. وده اللي عمل الحلقة في الحالة الحقيقية.

---

## ٦. الحل: [[block]] أول القواعد

~~~bash
BLOCK="10.255.0.0/24,224.0.0.0/4,255.255.255.255/32" python3 miniproxy.py &
~~~

~~~text نفس القياس بعد الإصلاح
=== after
tx/s 0 rx/s 0 cpu%=0 udp=0 rssKB=11360
accepted udp:10.255.0.7:137 [tun-in -> block]
accepted udp:224.0.0.251:5353 [tun-in -> block]
accepted udp:239.255.255.250:1900 [tun-in -> block]
~~~

وفي القواعد الحقيقية (شكل Xray، أول قاعدة في [[routing.rules]]):

~~~json
{ "type": "field", "outboundTag": "block",
  "ip": ["10.255.0.0/24", "224.0.0.0/4", "255.255.255.255/32", "fe80::/10", "ff00::/8"] },
{ "type": "field", "outboundTag": "direct", "ip": ["192.168.0.0/16"] }
~~~

| الوجهة | ليه block |
|---|---|
| [[10.255.0.0/24]] | subnet الكارت نفسه، وفيه الـ broadcast [[10.255.0.255]]: طريقه **دايمًا** من النفق |
| [[224.0.0.0/4]] | IPv4 multicast (mDNS و SSDP و LLMNR): متعمل للشبكة المحلية، وملوش معنى يعدّي نفق |
| [[255.255.255.255]] | broadcast عام، نفس الفكرة |
| [[fe80::/10]] و [[ff00::/8]] | link-local و multicast في IPv6: نفس الحلقة لو الكارت عليه IPv6 |

بعد الإصلاح في الحالة الحقيقية: **8 باكت/ثانية، CPU 5%، رام 56 MB، 59 UDP socket**.

---

## ٧. البدايل اللي اترفضت

| البديل | ليه لأ |
|---|---|
| سقف رام للـ proxy ([[GOMEMLIMIT]]) | الحلقة فضلت شغّالة، والـ GC بقى شغّال طول الوقت فالـ CPU طلع أكتر (قضية «GOMEMLIMIT والـ CPU» في تاب diag) |
| تفعيل IPv6 على الكارت | زوّد المشكلة: [[ff02::fb]] (mDNS على IPv6) دخلت نفس الحلقة |
| إعادة تشغيل الاتصال | الحلقة بترجع مع أول باكت mDNS، يعني بعد ثواني |
| شيل [[224.0.0.0/4]] من جدول التوجيه | ويندوز بيرجّعها، ولو اتشالت multicast على الشبكة المحلية يبوظ (طابعات، Chromecast) |
| [[direct]] يتربط بالكارت الحقيقي بالاسم | بيحل جزء، بس [[10.255.0.255]] و multicast مالهمش معنى برّه أصلًا. الـ block أوضح وأرخص |

---

## ٨. اتأكد

1. نفس قياس العدّاد: الخارج قريب من الداخل، والأرقام صغيرة وانت ساكت.
2. [[Get-NetUDPEndpoint | Group-Object OwningProcess]]: الـ proxy بالعشرات مش الآلاف.
3. اللوج: الوجهات دي بقت [[-> block]].
4. الخروج نفسه لسه من النفق: [[curl -4 -s https://api.ipify.org]] بيطبع IP السيرفر.

---

## ٩. متتكررش

- **اختبار للقواعد:** قبل أي release، سكربت بيقرا القواعد ويفشل لو أي شبكة طريقها بيرجع للنفق موجودة في قاعدة [[direct]] (مشروع [[route-lint]] في الوحدة دي).
- **قياس ثابت:** كل مرة تغيّر قواعد التوجيه، [[packets/s]] وانت ساكت قبل وبعد. رقم بالآلاف وانت مش بتعمل حاجة = حلقة.
- **قاعدة عامة:** متغيّرش حاجة قبل ما تقيس. التلات تعديلات الأولانيين كانوا تخمين، والقياس وصّل للسبب في ٤ أوامر.

---

## الخلاصة

| السؤال | الأمر | الإجابة في المعمل |
|---|---|---|
| الـ routes سليمة؟ | [[route print]] / [[ip route]] | آه |
| ترافيك ولا تضخيم؟ | فرق العدّاد ÷ ثواني | ١١٨ ألف خارجة، صفر داخلة |
| مين؟ | [[Get-NetUDPEndpoint]] / [[ss -uanp]] | بروسس واحد، آلاف sockets |
| لفين؟ | اللوج [[-> direct]] | [[224.0.0.251]] و [[10.255.0.7]] |
| ليه بتلف؟ | [[ip route get]] | [[dev vpnlab0]] |
| الحل | block أول قاعدة | صفر باكت، صفر CPU |`,
          deep: {
            why: R`القاعدة «الوجهات الخاصة direct» منطقية لأي proxy من غير TUN: البرنامج بيطلب من النظام، والنظام بيطلّعها من الكارت الحقيقي. لكن لما الـ proxy نفسه **هو** الكارت اللي النظام بيفضّله، [[direct]] بيرجع للـ proxy. ومفيش TTL ينقذك: الباكت مش بتعدّي راوتر، بتتولد من جديد من socket كل مرة. فباكت واحدة بتعيش للأبد، وكل لفّة بتاكل CPU وتفتح socket.`,
            how: R`النظام بيختار الكارت لكل باكت خارجة بـ longest prefix match في جدول التوجيه (درس [[routing]]). [[224.0.0.0/4]] موجودة على كل كارت في ويندوز، والـ metric الأقل بيكسب، وكارت النفق عادةً metric بتاعه صغير. و subnet الكارت ([[10.255.0.0/24]]) route متصل ([[on-link]]) بيتعمل لوحده مع العنوان. والـ proxy بيعمل UDP flow لكل (مصدر، بورت مصدر، وجهة)، فبورت المصدر الجديد في كل لفّة بيعمل flow جديد. عشان كده الـ sockets والرام بيكبروا مع الوقت والـ CPU بيتشبّع. [[ip route get]] بيعمل نفس القرار اللي الكيرنل هيعمله ويطبعه من غير ما يبعت حاجة.`,
            when: R`أي مرة VPN أو proxy بـ TUN بيبقى بطيء والـ routes سليمة، أو بروسس بيفتح آلاف UDP sockets، أو CPU عالي والترافيك الحقيقي قليل. وكل مرة تعدّل قواعد توجيه فيها [[direct]] لشبكات «خاصة». ونفس الفكرة في أي برنامج بيبعت باكت لعنوان طريقه بيرجّعها له (proxy محلي بيوجّه لنفسه، أو DNS forwarder بيسأل نفسه).`,
            mistakes: R`تحط سقف رام أو CPU وتفتكر إنك صلّحت. وتعيد التشغيل وتقول «اتصلحت» لحد ما الحلقة ترجع بعد دقيقة. وتشيل الـ multicast route فتبوّظ الطابعة والـ Chromecast. وتحط الشبكة المحلية [[192.168.x]] في الـ block فتقطع جهازك عن الراوتر والطابعة (هي بتخرج من الكارت الحقيقي، مكانها [[direct]]). وتقرا [[Sent]] على كارت TUN على إنه «رفع»: ده اللي اتسلّم للبرنامج. وفي المعمل: لو عملت namespace بـ [[unshare -n]] وقريت [[/sys/class/net]]، هتلاقي عدّادات الـ namespace القديم (الـ sysfs ماتعملهوش mount من جديد)، فاستخدم [[ip -s link show vpnlab0]] اللي بيسأل الـ namespace الحالي.`
          },
          sol: R`قبل الإصلاح: الـ routes سليمة ([[0.0.0.0/1]] و [[128.0.0.0/1]] على [[vpnlab0]] و [[203.0.113.9]] من [[eth0]])، وبعد باكت mDNS واحدة: [[tx/s 118093 rx/s 0]]، و ١٠٣٤٣ UDP socket بعد ثانيتين و ٢٨٢٣٢ بعد ٨ ثواني مع ٣ وجهات، والـ CPU 100% من core، واللوج فيه [[224.0.0.251:5353]] و [[239.255.255.250:1900]] و [[10.255.0.7:137]] كلهم [[-> direct]]. و [[ip route get 224.0.0.251]] = [[dev vpnlab0]]، و [[ip route get 192.168.1.50]] = [[dev eth0]].

بعد [[BLOCK]]: [[tx/s 0 rx/s 0 cpu%=0 udp=0]]، واللوج كله [[-> block]]، و [[192.168.1.50]] مظهرش في اللوج أصلًا لأنه مادخلش النفق.

اتجرّب في كونتينر [[ubuntu:24.04]] بـ [[--privileged]] (Python 3.12.3 و iproute2 6.1). أوامر ويندوز ([[route print]] و [[Get-NetAdapterStatistics]] و [[Get-NetUDPEndpoint]] و [[Win32_Process]]) اتشغّلت قراية بس على ويندوز 11 على كارت حقيقي، وأرقام ١٢٠ ألف و 15 ألف socket و 8 باكت/ثانية بعد الإصلاح من الحالة الأصلية. قاعدة Xray مكتوبة من وثائق Xray (routing rules).`,
          practice: [
            { lvl: 'سريع', t: R`من غير ما تبص: اكتب الـ ٤ أسئلة بالترتيب اللي تسألها لما VPN يبقى بطيء والـ proxy على CPU عالي، وجنب كل سؤال الأمر على ويندوز والأمر على لينكس.`, done: R`الأسئلة: الـ routes سليمة؟ ترافيك ولا تضخيم (فرق العدّاد ÷ ثواني)؟ مين فاتح الـ sockets؟ الوجهة إيه وطريقها منين ([[ip route get]] على لينكس، و [[Get-NetRoute -DestinationPrefix 224.0.0.0/4]] مترتبة بالـ metric على ويندوز)؟ وكل أمر مكتوب صح ومتشغّل مرة.` },
            { lvl: 'تطبيق', t: R`اقرا وتوقّع: في المعمل قبل الإصلاح، توقّع ناتج [[ip route get]] لـ ٥ عناوين: [[224.0.0.251]] و [[10.255.0.255]] و [[192.168.1.50]] و [[1.1.1.1]] و [[203.0.113.9]]. اكتب جنب كل واحد: لو قاعدة [[direct]] بعتته، هيلف ولا لأ؟ وبعدين شغّل.`, done: R`توقعت [[vpnlab0]] للأول والتاني والرابع، و [[eth0]] للتالت والخامس، وإن اللي هيلف من [[direct]] هما أول اتنين بس (الرابع مش في [[direct]] أصلًا، بيروح [[proxy]])، والناتج طابق.` },
            { lvl: 'تطبيق', t: R`قارن وقيس: شغّل [[miniproxy.py]] من غير block وابعت باكت mDNS، وسجّل كل ثانيتين لمدة ١٠ ثواني: [[tx/s]] وعدد الـ UDP sockets والـ RSS. وبعدين نفس الحكاية بالـ block. حط الأرقام في جدول.`, done: R`الجدول فيه ١٠ صفوف، وقبل الإصلاح الـ sockets بتزيد (عشرات الآلاف) والـ [[tx/s]] أكتر من ٥٠ ألف، وبعده كله صفر، وكاتب جملة: «الرام بتكبر من الـ sockets، مش من الباكتس».` },
            { lvl: 'تطبيق', t: R`صلّح القاعدة دي: [[{"outboundTag": "direct", "ip": ["geoip:private"]}]] على أداة TUN كارتها [[10.255.0.2/24]]. اكتب القاعدة (أو القاعدتين) اللي مكانها، ومتنساش IPv6، ومتقطعش الشبكة المحلية.`, done: R`أول قاعدة [[block]] فيها [[10.255.0.0/24]] و [[224.0.0.0/4]] و [[255.255.255.255/32]] و [[fe80::/10]] و [[ff00::/8]]، وبعدها [[direct]] لـ [[192.168.0.0/16]] و [[10.0.0.0/8]] و [[172.16.0.0/12]] (ماعدا subnet الكارت اللي اتمسك قبلها)، وتقدر تشرح ليه الترتيب مهم (أول قاعدة تطابق بتكسب).` },
            { lvl: 'تحدي', t: R`ابني [[loop-guard.sh]]: بياخد اسم كارت وحد أقصى (مثلًا ٥٠٠٠)، ويقيس [[tx_packets]] و [[rx_packets]] كل ثانية بـ [[ip -s link]]، ولو الخارج عدّى الحد ٣ ثواني ورا بعض والداخل أقل من ١٪ منه، يطبع تحذير فيه أكتر بروسس فاتح UDP sockets ([[ss -uanp]]) وآخر ٥ وجهات [[direct]] من اللوج.`, done: R`على المعمل من غير block بيطبع التحذير في أقل من ٥ ثواني ومعاه [[python3]] و [[224.0.0.251:5353]]، ومع الـ block بيفضل ساكت دقيقة كاملة، واسم كارت غلط بيطلع رسالة وكود 2.` },
            { lvl: 'تحدي', t: R`اشرحها: اكتب لزميل في ٥ سطور بالظبط ليه سقف الرام ماكانش حل، مستخدم الأرقام الحقيقية (١٢٠ ألف باكت/ثانية، 15 ألف socket، 1.2 GB، وبعد الإصلاح 8 باكت/ثانية و 56 MB).`, done: R`الشرح فيه: الرام بتكبر من الـ sockets اللي بتتفتح كل لفّة، والسقف بيخنق النتيجة ومبيوقفش الحلقة، فالـ CPU بيزيد (GC)، والحل في القاعدة. وزميل قراه وقدر يقول السبب الحقيقي من غير ما يسألك.` },
          ],
          ci: [
            { os: [R`ubuntu`], sh: R`bash`, run: R`cat > mp.py <<'PY'
import os, fcntl, struct, socket, ipaddress
fd = os.open("/dev/net/tun", os.O_RDWR)
fcntl.ioctl(fd, 0x400454ca, struct.pack("16sH", b"vpnlab0", 0x1001))
BLOCK = [ipaddress.ip_network(x) for x in os.environ.get("BLOCK", "").split(",") if x]
DIRECT = [ipaddress.ip_network(x) for x in ("10.255.0.0/24", "224.0.0.0/4")]
flows, log = {}, open("proxy.log", "a", buffering=1)
while True:
    p = os.read(fd, 65535)
    if p[0] >> 4 != 4 or p[9] != 17: continue
    h = (p[0] & 15) * 4; dst = socket.inet_ntoa(p[16:20]); sport, dport = struct.unpack("!HH", p[h:h+4])
    d = ipaddress.ip_address(dst)
    out = "block" if any(d in n for n in BLOCK) else "direct" if any(d in n for n in DIRECT) else "proxy"
    log.write(f"accepted udp:{dst}:{dport} [tun-in -> {out}]\n")
    if out != "direct": continue
    k = (sport, dst, dport)
    if k not in flows: flows[k] = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try: flows[k].sendto(p[h+8:], (dst, dport))
    except OSError: pass
PY
cat > lab.sh <<'SH'
ip tuntap add dev vpnlab0 mode tun
ip addr add 10.255.0.2/24 dev vpnlab0 && ip link set vpnlab0 up
ip route add 224.0.0.0/4 dev vpnlab0
ip route get 224.0.0.251 | grep -o 'dev vpnlab0'
tx(){ ip -s link show vpnlab0 | awk '/TX:/{getline; print $2}'; }
rate(){
  BLOCK="$1" python3 mp.py & P=$!; sleep 1
  python3 -c 'import socket; socket.socket(socket.AF_INET, socket.SOCK_DGRAM).sendto(b"q", ("224.0.0.251", 5353))'
  sleep 1; a=$(tx); sleep 2; b=$(tx); kill $P; wait $P 2>/dev/null
  echo $(( (b - a) / 2 ))
}
r1=$(rate ""); r2=$(rate "224.0.0.0/4,10.255.0.0/24")
[ "$r1" -gt 5000 ] && echo "loop before fix: yes"
[ "$r2" -lt 10 ] && echo "after block rule: quiet"
sort -u proxy.log
SH
sudo unshare -n bash lab.sh`, expect: [R`dev vpnlab0`, R`loop before fix: yes`, R`after block rule: quiet`, R`accepted udp:224.0.0.251:5353 [tun-in -> direct]`, R`accepted udp:224.0.0.251:5353 [tun-in -> block]`] },
            { os: [R`windows`], sh: R`pwsh`, run: R`$a = [pscustomobject]@{ SentUnicastPackets = 1000; ReceivedUnicastPackets = 40 }
$b = [pscustomobject]@{ SentUnicastPackets = 361000; ReceivedUnicastPackets = 43 }
"{0:N0} out/s  {1:N0} in/s" -f (($b.SentUnicastPackets - $a.SentUnicastPackets) / 3), (($b.ReceivedUnicastPackets - $a.ReceivedUnicastPackets) / 3)
(Get-Command Get-NetAdapterStatistics).Source
(Get-Command Get-NetUDPEndpoint).Source
'accepted udp:224.0.0.251:5353 [tun-in -> direct]', 'accepted tcp:1.1.1.1:443 [tun-in -> proxy]' | Select-String -Pattern '-> direct' | ForEach-Object Line`, expect: [R`120,000 out/s  1 in/s`, R`NetAdapter`, R`NetTCPIP`, R`accepted udp:224.0.0.251:5353 [tun-in -> direct]`] },
          ],
        },
        {
          cmd: "الاسم بيتحل فين",
          title: R`نفس السيرفر: أداة بتفتح ٥ مواقع من ١٢ وأداة تانية بتفتحهم كلهم: تجربة A/B بـ socks5h و socks5`,
          learn: R`تثبت بتجربة من غير أدمن إن الاسم بيتحل عند السيرفر (DNS بتاعه ضعيف) ولا عندك، وتقرا [[curl -v]] اللي بيقول [[remotely resolved]] أو [[locally resolved]]، وتعرف الحل الصح ومخاطره.`,
          out: R`سكربت مقارنة بيطلع جدول: [[socks5h: ok=15 fail=21 (من 36)]] و [[socks5: ok=36 fail=0 (من 36)]].`,
          desc: R`أداتين على **نفس السيرفر**: واحدة بتفتح ٥ مواقع بس من ١٢، والتانية بتفتحهم كلهم. الفرضية: الأداة الأولى بتقرا اسم الموقع من الاتصال (sniffing) وبتبعت **الاسم** للسيرفر، والسيرفر هو اللي بيحلّه بالـ DNS بتاعه (وهو ضعيف أو ناقص)، بدل ما يستلم **IP** جاهز.

بدل التخمين، تجربة A/B بـ [[curl]] من غير أدمن، على الـ SOCKS بتاع الأداة: [[socks5h://]] (الـ [[h]] = hostname: الاسم يروح للسيرفر يحلّه) قصاد [[socks5://]] (curl يحل الاسم عندك ويبعت IP). نفس المواقع ٣ مرات في [[for]]، ونعد نجاح وفشل ووقت. في المعمل: [[socks5h]] ٥/١٢ و [[socks5]] ١٢/١٢، بالظبط زي الحالة الحقيقية.

الحل: الأداة تستخدم الاسم **للتوجيه بس** (في Xray: [[sniffing]] بـ [[routeOnly: true]]) والاتصال يتم بالـ IP اللي اتحل عندك (من DNS بيعدّي النفق، عشان متسرّبش الأسامي). بعد الإصلاح: ٨/٨.`,
          example: R`curl -x socks5h://127.0.0.1:10808 -s -o /dev/null -m 15 -w "%{http_code} %{time_total}\n" http://site09.lab:8080/
curl -x socks5://127.0.0.1:10808 -s -o /dev/null -m 15 -w "%{http_code} %{time_total}\n" http://site09.lab:8080/
curl -v -x socks5h://127.0.0.1:10808 -s -o /dev/null http://site03.lab:8080/ 2>&1 | grep -i "socks5 connect"
for u in $(seq -f "site%02g.lab" 1 12); do curl -x socks5h://127.0.0.1:10808 -s -o /dev/null -m 15 -w "$u %{http_code}\n" "http://$u:8080/"; done
# Windows (PowerShell):
foreach ($m in 'socks5h', 'socks5') { $ok = 0; foreach ($i in 1..12) { $u = 'site{0:d2}.lab' -f $i; if ((curl.exe -x "$($m)://127.0.0.1:10808" -s -o NUL -m 15 -w '%{http_code}' "http://$($u):8080/") -eq '200') { $ok++ } }; "$m ok=$ok/12" }`,
          lines: [
            R`(A): [[-x socks5h://]] الـ proxy، والـ [[h]] معناها «ابعت اسم الموقع للـ proxy وهو يحلّه». [[-s]] ساكت، و [[-o /dev/null]] ارمي الصفحة، و [[-m 15]] أقصى ١٥ ثانية، و [[-w]] اطبع كود HTTP والوقت الكلي بعد ما تخلص.`,
            R`(B): نفس الأمر بالظبط بـ [[socks5://]] من غير [[h]]: curl يحل الاسم بالـ DNS بتاع جهازك، ويبعت للـ proxy **IP**. الفرق بين السطرين حرف واحد، وده كل التجربة.`,
            R`[[-v]] بيطبع تفاصيل الاتصال على stderr، و [[2>&1]] يجمعه مع الناتج عشان [[grep]] يشوفه. السطر اللي بيبدأ بـ [[SOCKS5 connect to]] بيقول بالحرف [[remotely resolved]] أو [[locally resolved]].`,
            R`نفس (A) على ١٢ موقع: [[seq -f "site%02g.lab" 1 12]] بيطلع [[site01.lab]] لحد [[site12.lab]]، و [[-w "$u %{http_code}\n"]] يطبع اسم الموقع جنب الكود.`,
            R`نفس المقارنة في PowerShell: [[curl.exe]] (مش [[curl]] اللي في 5.1 اسم مستعار لـ [[Invoke-WebRequest]])، و [[-o NUL]] بدل [[/dev/null]]، و [[$($m)://]] لأن [["$m://"]] بيفشل بـ [[Variable reference is not valid. ':' was not followed by a valid variable name character.]] (PowerShell بيقرا [[$m:]] على إنه بداية اسم متغير بـ scope زي [[$env:]])، و [[{0:d2}]] رقم بخانتين.`,
          ],
          try: R`ابني المعمل: ١٢ اسم في [[/etc/hosts]] بتاع الكونتينر (جهازك)، وملف [[server-hosts]] فيه ٥ منهم بس (DNS السيرفر)، و [[minisocks.py]] على [[127.0.0.1:10808]]، و [[python3 -m http.server 8080]]. شغّل [[ab.sh]] وقارن الرقمين، وبعدين ضيف اسم [[site09.lab]] لـ [[server-hosts]] وشغّل تاني.`,
          teach: R`## العَرَض

نفس السيرفر، ونفس الشبكة، ونفس الجهاز:

- الأداة بتاعتنا: ٥ مواقع من ١٢ بتفتح، والباقي بيفشل أو بيعلّق.
- أداة تانية على نفس السيرفر: الـ ١٢ بيفتحوا.

الفرضية: الأداة بتاعتنا بتقرا اسم الموقع من أول الاتصال (sniffing: الـ SNI في HTTPS أو الـ Host في HTTP) وبتبعت **الاسم** للسيرفر. والسيرفر بيحل الأسامي بالـ DNS بتاعه، وده DNS ضعيف أو مقفول على أسامي كتير. الأداة التانية بتبعت **IP**.

الفرضية دي تتجرّب **من غير أدمن ومن غير ما نغيّر حاجة**: الأداة فاتحة SOCKS على [[127.0.0.1:10808]]، و curl يقدر يكلّمه بالطريقتين.

---

## socks5 و socks5h: حرف واحد

| الـ URL | مين بيحل الاسم | السيرفر بيستلم إيه |
|---|---|---|
| [[socks5h://127.0.0.1:10808]] | **الـ proxy** (والـ proxy بيبعته للسيرفر) | اسم: [[site09.lab]] |
| [[socks5://127.0.0.1:10808]] | **جهازك** (DNS الجهاز) | IP: [[127.0.1.9]] |
| [[--socks5-hostname 127.0.0.1:10808]] | زي [[socks5h]] | اسم |

وفي بروتوكول SOCKS5 نفسه الفرق في بايت واحد في الطلب: [[ATYP=1]] (IPv4 جاهز) أو [[ATYP=3]] (اسم بطوله).

---

## المعمل

كونتينر [[ubuntu:24.04]] (Python 3.12.3 و curl 8.5.0):

~~~bash
for i in $(seq -w 1 12); do echo "127.0.1.$((10#$i)) site$i.lab" >> /etc/hosts; done
grep -E "site0[1-5]\.lab" /etc/hosts > server-hosts
mkdir -p www && echo ok > www/index.html
(cd www && python3 -m http.server 8080 --bind 0.0.0.0 >/dev/null 2>&1 &)
python3 minisocks.py > socks.log 2>&1 &
~~~

- [[/etc/hosts]] بتاع الكونتينر = DNS **جهازك**: بيعرف الـ ١٢.
- [[server-hosts]] = DNS **السيرفر**: بيعرف ٥ بس.
- كل الأسامي على [[127.0.1.x]] (كل [[127.0.0.0/8]] loopback في لينكس)، وسيرفر ويب واحد على [[0.0.0.0:8080]] بيرد عليهم كلهم.

~~~python minisocks.py
#!/usr/bin/env python3
# minisocks.py: SOCKS5 صغير. لو جاله اسم بيحلّه من جدوله هو (DNS السيرفر)، مش من جدول العميل
import socket, struct, threading
TABLE = dict(l.split()[::-1] for l in open("server-hosts") if l.strip())   # name -> ip
def pipe(a, b):
    try:
        while (d := a.recv(65536)): b.sendall(d)
    except OSError: pass
    finally: a.close(); b.close()
def handle(c):
    c.recv(262); c.sendall(b"\x05\x00")                 # مفيش auth
    ver, cmd, _, atyp = c.recv(4)
    if atyp == 1: host = socket.inet_ntoa(c.recv(4))     # IP جاهز من العميل
    else:                                                # اسم: السيرفر هو اللي يحل
        name = c.recv(c.recv(1)[0]).decode(); host = TABLE.get(name)
        print(f"resolve {name} -> {host}", flush=True)
    port = struct.unpack("!H", c.recv(2))[0]
    if host is None: c.sendall(b"\x05\x04\x00\x01" + bytes(6)); c.close(); return
    u = socket.create_connection((host, port), timeout=5)
    c.sendall(b"\x05\x00\x00\x01" + bytes(6))
    threading.Thread(target=pipe, args=(u, c), daemon=True).start(); pipe(c, u)
s = socket.socket(); s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
s.bind(("127.0.0.1", 10808)); s.listen(64)
while True: threading.Thread(target=handle, args=(s.accept()[0],), daemon=True).start()
~~~

| الحتة | بتعمل إيه |
|---|---|
| [[b"\x05\x00"]] | رد الـ handshake: نسخة 5، ومن غير يوزر وباسورد |
| [[atyp == 1]] | العميل بعت IPv4 (أربع بايتات) |
| [[else]] | العميل بعت اسم: بايت فيه الطول وبعده الاسم، والـ proxy يحلّه من **جدوله** |
| [[b"\x05\x04..."]] | رد فشل: [[0x04]] = Host unreachable، وده الرقم اللي curl هيطبعه بين قوسين |

---

## ١. التجربة على موقع واحد

~~~text الناتج
$ curl -x socks5h://127.0.0.1:10808 -s -o /dev/null -m 15 -w "%{http_code} %{time_total}\n" http://site03.lab:8080/
200 0.050898
$ curl -x socks5h://127.0.0.1:10808 -s -o /dev/null -m 15 -w "%{http_code} %{time_total}\n" http://site09.lab:8080/
000 0.000501
$ echo $?
97
$ curl -x socks5h://127.0.0.1:10808 -sS -o /dev/null -m 15 http://site09.lab:8080/
curl: (97) Can't complete SOCKS5 connection to site09.lab. (4)
$ curl -x socks5://127.0.0.1:10808 -s -o /dev/null -m 15 -w "%{http_code} %{time_total}\n" http://site09.lab:8080/
200 0.046287
~~~

- [[000]] = curl ماوصلش لحد ما ياخد رد HTTP أصلًا.
- [[(97)]] كود خروج curl لمشاكل الـ proxy، و [[(4)]] في الآخر هو الرد اللي الـ SOCKS بعته: Host unreachable.
- [[-sS]]: [[-s]] بيسكّت كل حاجة، و [[-S]] بيرجّع رسالة الخطأ بس. مفيدة في السكربتات.

ولوج الـ proxy:

~~~text socks.log
resolve site03.lab -> 127.0.1.3
resolve site09.lab -> None
resolve site09.lab -> None
~~~

والطلب بـ [[socks5://]] مالوش سطر [[resolve]]: الـ proxy استلم IP.

---

## ٢. [[curl -v]] بيقولها بالحرف

~~~text curl -v ... 2>&1 | grep -i socks5
* SOCKS5 connect to site03.lab:8080 (remotely resolved)
* SOCKS5 request granted.
* SOCKS5 connect to 127.0.1.3:8080 (locally resolved)
* SOCKS5 request granted.
~~~

---

## ٣. سكربت المقارنة: ١٢ موقع × ٣ مرات × طريقتين

~~~bash ab.sh
#!/usr/bin/env bash
# ab.sh: نفس المواقع مرتين: الاسم يتحل عند السيرفر (socks5h) ولا عندك (socks5)
P=127.0.0.1:10808
for mode in socks5h socks5; do
  ok=0; fail=0
  for round in 1 2 3; do
    for u in $(seq -f "site%02g.lab" 1 12); do
      r=$(curl -x "$mode://$P" -s -o /dev/null -m 15 -w "%{http_code} %{time_total}" "http://$u:8080/")
      case $r in 200*) ok=$((ok+1));; *) fail=$((fail+1)); [ $round = 1 ] && echo "  $mode FAIL $u ($r)";; esac
    done
  done
  echo "$mode: ok=$ok fail=$fail (من $((ok+fail)))"
done
~~~

~~~text bash ab.sh
  socks5h FAIL site06.lab (000 0.000616)
  socks5h FAIL site07.lab (000 0.000545)
  socks5h FAIL site08.lab (000 0.000499)
  socks5h FAIL site09.lab (000 0.000512)
  socks5h FAIL site10.lab (000 0.000492)
  socks5h FAIL site11.lab (000 0.000535)
  socks5h FAIL site12.lab (000 0.000508)
socks5h: ok=15 fail=21 (من 36)
socks5: ok=36 fail=0 (من 36)
~~~

ليه ٣ جولات؟ عشان تفرّق بين «فشل ثابت» (الاسم مش موجود عند السيرفر) و «فشل عشوائي» (شبكة مهزوزة). هنا نفس الـ ٧ فشلوا في الـ ٣ جولات = ثابت. ولو الفشل كان بيتنقل من موقع لموقع، السبب حاجة تانية (الشبكة أو السيرفر تقيل).

وفي الحالة الحقيقية (HTTPS ومواقع حقيقية): **٥/١٢** بالاسم و **١٢/١٢** بالـ IP، وأوقات الفاشلين كانت ١٥ ثانية (الـ timeout) مش صفر، لأن DNS السيرفر كان بيعلّق بدل ما يرفض.

---

## ٤. السبب والحل

السبب: الأداة كانت بتعمل sniffing وبتبعت الاسم المقروء للسيرفر يحلّه (في Xray: [[sniffing]] من غير [[routeOnly]]، فالـ outbound بيستخدم الاسم بدل الـ IP اللي جه من الكارت).

الحل في إعداد Xray (من الوثائق):

~~~json
"sniffing": { "enabled": true, "destOverride": ["http", "tls"], "routeOnly": true }
~~~

| الإعداد | معناه |
|---|---|
| [[enabled: true]] | اقرا اسم الموقع من أول الاتصال |
| [[destOverride]] | من أنهي بروتوكولات (الـ Host في HTTP والـ SNI في TLS) |
| [[routeOnly: true]] | استخدم الاسم **في قرار التوجيه بس** (قواعد بالدومين)، والاتصال نفسه يفضل بالـ IP الأصلي |

بعد التعديل: **٨/٨** على المواقع اللي كانت بتفشل.

> **انتبه للتسريب:** لو الاسم بيتحل عندك، لازم الـ DNS بتاع جهازك يعدّي النفق نفسه، وإلا مزوّد النت شايف كل الأسامي اللي بتزورها (درس [[leak_protection]] و [[dns]]). [[socks5h]] بيخبّي الأسامي عن الشبكة المحلية بطبيعته، و [[socks5]] لأ. فالحل الكامل: اسم يتحل عندك **عن طريق النفق**، و IP يروح للسيرفر.

---

## ٥. البدايل اللي اترفضت

| البديل | ليه لأ |
|---|---|
| تغيّر DNS السيرفر | ممكن يكون صح على المدى البعيد، بس مش دايمًا السيرفر بتاعك، وحتى لو بتاعك الأداة لازم تشتغل مع أي سيرفر |
| تحط الأسامي في [[hosts]] على السيرفر | بتتنسى، والـ IPs بتتغيّر (CDN)، ومش هتعرف الـ ٧ الفاشلين غير بعد ما يشتكي حد |
| تقفل الـ sniffing خالص | القواعد اللي بالدومين (موقع معين direct) تبوظ |
| تزوّد الـ timeout | الفشل كان «الاسم مش معروف»، مش بطء. الانتظار أطول مش هيخليه معروف |

---

## ٦. متتكررش

- **[[ab.sh]] قبل وبعد أي تغيير** في إعداد الـ sniffing أو الـ DNS أو السيرفر، والنتيجة تتسجل.
- **لستة مواقع ثابتة** للاختبار (فيها مواقع بـ CDN ومواقع محلية)، مش «جرّبت جوجل واشتغل».
- **اقرا [[curl -v]]** لما حاجة تفشل من proxy: [[remotely resolved]] ولا [[locally resolved]] بيقصّر نص التشخيص.`,
          deep: {
            why: R`الـ proxy بيوصل للموقع من السيرفر، فلو السيرفر هو اللي بيحل الاسم، أي ضعف في DNS السيرفر (resolver بطيء، أو قايمة ناقصة، أو DNS بيحجب) بيظهر عندك كـ «مواقع معينة مبتفتحش». ومن برّه الشكل واحد: «الأداة دي بايظة والتانية شغّالة». تجربة A/B بتفصل المتغيّر الوحيد (مين بيحل الاسم) وتثبّت الباقي (نفس السيرفر، ونفس المواقع، ونفس الوقت).`,
            how: R`في SOCKS5 العميل بيبعت طلب [[CONNECT]] فيه نوع العنوان: [[0x01]] IPv4، [[0x03]] اسم، [[0x04]] IPv6. مع [[socks5h]] curl بيبعت [[0x03]] والاسم، ومع [[socks5]] بيحل الاسم الأول (getaddrinfo بالـ DNS بتاع الجهاز) ويبعت [[0x01]]. الـ proxy المحلي في الأداة بيعمل نفس الحكاية مع السيرفر البعيد: يا يبعته اسم يا IP. والـ sniffing بيقرا الاسم من أول بايتات الاتصال (Host في HTTP أو SNI في TLS ClientHello) لأن الكارت بيدّي الـ proxy IP بس. و [[routeOnly]] بيقول: الاسم ده للقرار، مش للاتصال.`,
            when: R`أي «موقع بيفتح من أداة ومن أداة لأ على نفس السيرفر»، أو مواقع معينة بس بتفشل من VPN، أو فرق بين المتصفح (بيستخدم socks5h في إعدادات Firefox لو علّمت «Proxy DNS») والترمنال. ونفس التجربة تنفع لـ HTTP proxy: [[curl -x http://...]] بيبعت الاسم دايمًا في [[CONNECT host:443]].`,
            mistakes: R`تجرّب موقع واحد وتحكم. أو تجرّب مرة واحدة فتخلط الفشل الثابت بالعشوائي. أو تكتب [[curl]] في Windows PowerShell 5.1 فيشتغل [[Invoke-WebRequest]] وتطلع رسالة ملهاش علاقة (استخدم [[curl.exe]]). أو تكتب [[-o /dev/null]] لـ [[curl.exe]] على ويندوز فيفشل بـ [[curl: (23) client returned ERROR on write of 92 bytes]] (مفيش [[/dev/null]] في ويندوز، اكتب [[NUL]]). أو تصلّح بـ [[socks5]] وتنسى إن الأسامي بقت بتتحل بالـ DNS بتاع مزوّد النت (تسريب). أو تفتكر [[000]] معناه السيرفر رجّع صفر: معناه مفيش رد HTTP خالص.`
          },
          sol: R`[[ab.sh]] في المعمل: [[socks5h: ok=15 fail=21 (من 36)]] (الـ ٧ من [[site06]] لـ [[site12]] فشلوا في كل جولة بـ [[000]])، و [[socks5: ok=36 fail=0 (من 36)]]. و [[curl -sS]] على [[site09.lab]] بـ [[socks5h]]: [[curl: (97) Can't complete SOCKS5 connection to site09.lab. (4)]] وكود الخروج 97. و [[curl -v]] كتب [[(remotely resolved)]] مع [[socks5h]] و [[(locally resolved)]] مع [[socks5]] ومعاه الـ IP [[127.0.1.3]].

بعد ما تضيف [[127.0.1.9 site09.lab]] لـ [[server-hosts]] وتعيد تشغيل [[minisocks.py]]: [[socks5h: ok=18]].

اتجرّب في [[ubuntu:24.04]] (Python 3.12.3 و curl 8.5.0). إعداد [[routeOnly]] من وثائق Xray (sniffing)، وأرقام ٥/١٢ و ١٢/١٢ و ٨/٨ من الحالة الأصلية. سطر PowerShell مكتوب بنفس flags الـ [[curl.exe]] اللي اتجرّبت، و [[$($m)://]] اتجرّب في pwsh 7.`,
          practice: [
            { lvl: 'سريع', t: R`من غير ما تبص: إيه الفرق بين [[socks5://]] و [[socks5h://]] و [[--socks5-hostname]]؟ ومين فيهم بيخبّي أسامي المواقع عن مزوّد النت لو DNS جهازك مش بيعدّي النفق؟`, done: R`[[socks5]] الاسم يتحل عندك، و [[socks5h]] و [[--socks5-hostname]] الاسم يروح للـ proxy. واللي بيخبّي الأسامي هو [[socks5h]] (لأن جهازك مبيسألش DNS أصلًا).` },
            { lvl: 'تطبيق', t: R`اقرا وتوقّع: [[server-hosts]] فيه [[site01]] لحد [[site05]]. توقّع ناتج [[curl -v -x socks5h://... http://site02.lab:8080/]] و [[curl -v -x socks5://... http://site11.lab:8080/]] و [[curl -sS -x socks5h://... http://site11.lab:8080/]]: السطر بتاع [[SOCKS5 connect]] والكود. وبعدين شغّل.`, done: R`التلاتة طلعوا زي توقعك: [[site02.lab:8080 (remotely resolved)]] وكود 200، و [[127.0.1.11:8080 (locally resolved)]] وكود 200، و [[(97) Can't complete SOCKS5 connection to site11.lab. (4)]].` },
            { lvl: 'تطبيق', t: R`بيانات حقيقية: عدّل [[ab.sh]] يكتب CSV ([[mode,site,round,code,time]]) بدل ما يطبع، وبعدين لخّص الـ CSV بـ [[awk]]: لكل mode عدد النجاح ومتوسط الوقت للناجحين بس.`, done: R`الـ CSV فيه ٧٢ سطر + الهيدر، والملخص سطرين: [[socks5h 15]] و [[socks5 36]] ومعاهم متوسط وقت بالملي ثانية، والفاشلين مش داخلين في المتوسط.` },
            { lvl: 'تطبيق', t: R`صلّح الكود: السطر ده في سكربت PowerShell بيطبع [[ok=0/12]] دايمًا: [[if ((curl -x "$m://127.0.0.1:10808" -s -o /dev/null -w '%{http_code}' "http://$u:8080/") -eq 200) { $ok++ }]]. لاقي ٣ مشاكل.`, done: R`لقيت: [[curl]] في 5.1 هو [[Invoke-WebRequest]] (اكتب [[curl.exe]])، و [["$m://..."]] بيقف قبل ما يشتغل بـ [[Variable reference is not valid. ':' was not followed by a valid variable name character.]] (اكتب [[$($m)://]])، و [[/dev/null]] مش موجود في ويندوز وبيطلّع [[curl: (23)]] (اكتب [[NUL]])، و [[$u:8080]] نفس مشكلة [[$m:]]. والنسخة المصلّحة بتطبع ١٢/١٢ مع [[socks5]].` },
            { lvl: 'تحدي', t: R`محاكاة: خلّي [[minisocks.py]] يتأخر ٣ ثواني قبل ما يرفض اسم مش معروف (زي DNS بيعلّق)، وشغّل [[ab.sh]] بـ [[-m 2]] ومرة بـ [[-m 15]]. إيه اللي اتغيّر في الكود والوقت؟ وليه ده بيخلّي الأداة «تعلّق» مش «تفشل»؟`, done: R`بـ [[-m 2]] الفاشلين كود [[000]] ووقت حوالي ٢ ثانية وكود خروج 28، وبـ [[-m 15]] وقت حوالي ٣ ثواني و 97. وكاتب جملة: الفشل البطيء أسوأ للمستخدم من الفشل السريع لأنه بيحجز الاتصال.` },
            { lvl: 'تحدي', t: R`دوّر بنفسك: من وثائق Xray (أو [[xray help]]) اعرف إيه اللي بيعمله [[domainStrategy]] في الـ outbound [[freedom]] (القيم [[AsIs]] و [[UseIP]] و [[UseIPv4]])، وإيه علاقته بنفس المشكلة دي على ناحية السيرفر.`, done: R`كاتب في ٣ سطور: [[AsIs]] السيرفر يسيب الاسم للنظام يحلّه، و [[UseIP]] يحلّه بالـ DNS المضبوط في Xray نفسه، وإن ده مكان تاني ممكن DNS السيرفر يبقى ضعيف فيه، ومعاك رابط الصفحة اللي قريت منها.` },
          ],
          ci: [
            { os: [R`ubuntu`], sh: R`bash`, run: R`cat > socks.py <<'PY'
import socket, struct, threading
TABLE = dict(l.split()[::-1] for l in open("server-hosts") if l.strip())
def pipe(a, b):
    try:
        while (d := a.recv(65536)): b.sendall(d)
    except OSError: pass
    finally: a.close(); b.close()
def handle(c):
    c.recv(262); c.sendall(b"\x05\x00"); _, _, _, atyp = c.recv(4)
    host = socket.inet_ntoa(c.recv(4)) if atyp == 1 else TABLE.get(c.recv(c.recv(1)[0]).decode())
    port = struct.unpack("!H", c.recv(2))[0]
    if host is None: c.sendall(b"\x05\x04\x00\x01" + bytes(6)); c.close(); return
    u = socket.create_connection((host, port), timeout=5); c.sendall(b"\x05\x00\x00\x01" + bytes(6))
    threading.Thread(target=pipe, args=(u, c), daemon=True).start(); pipe(c, u)
s = socket.socket(); s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
s.bind(("127.0.0.1", 10808)); s.listen(16)
while True: threading.Thread(target=handle, args=(s.accept()[0],), daemon=True).start()
PY
mkdir -p www && echo ok > www/index.html
printf '127.0.0.1 site01.lab\n127.0.0.1 site02.lab\n' > server-hosts
python3 -m http.server 18080 --bind 127.0.0.1 --directory www >/dev/null 2>&1 & W=$!
python3 socks.py >/dev/null 2>&1 & S=$!
sleep 1
for m in socks5h socks5; do
  ok=0
  for i in 1 2 3 4; do
    u=site0$i.lab
    c=$(curl -x "$m://127.0.0.1:10808" -s -o /dev/null -m 5 -w '%{http_code}' --resolve "$u:18080:127.0.0.1" "http://$u:18080/")
    [ "$c" = 200 ] && ok=$((ok+1))
  done
  echo "$m ok=$ok/4"
done
curl -v -x socks5h://127.0.0.1:10808 -s -o /dev/null http://site01.lab:18080/ 2>&1 | grep -o 'remotely resolved'
curl -sS -x socks5h://127.0.0.1:10808 -o /dev/null http://site03.lab:18080/ 2>&1 | grep -o '(97).*'
kill $S $W`, expect: [R`socks5h ok=2/4`, R`socks5 ok=4/4`, R`SOCKS5 connection to site03.lab. (4)`] },
            { os: [R`windows`], sh: R`pwsh`, run: R`$m = 'socks5h'; $u = 'site01.lab'
"$($m)://127.0.0.1:1 -> http://$($u):8080/"
curl.exe -x "$($m)://127.0.0.1:1" -s -o NUL -m 5 "http://$($u):8080/"
"curl exit=$LASTEXITCODE"
'site{0:d2}.lab' -f 7`, expect: [R`socks5h://127.0.0.1:1 -> http://site01.lab:8080/`, R`curl exit=7`, R`site07.lab`] },
          ],
        },
        {
          cmd: "هوت سبوت من النفق",
          title: R`الموبايل على هوت سبوت اللابتوب وطالع من برّه النفق: ويندوز بيشارك كارت مش «النت»`,
          learn: R`تعرف إن مشاركة الإنترنت (ICS والهوت سبوت) مربوطة بكارت واحد، وتفحص مين المتشارك ومين متوصل من غير ما تغيّر حاجة، وتعرف ليه لازم الهوت سبوت يتعمل من كارت النفق **بعد** ما يستقر ويتعمل تاني بعد أي إعادة اتصال.`,
          out: R`الموبايل بيطبع IP السيرفر ([[203.0.113.9]] في المعمل) مش IP المزوّد، ولو النفق اتعاد الموبايل يقف (مش يطلع من برّه) لحد ما المشاركة تتعاد.`,
          desc: R`عايز الموبايل يعدّي من نفق اللابتوب من غير ما تظبط proxy عليه. شغّلت Mobile Hotspot العادي (من الـ Wi-Fi)، والموبايل فتح موقع «IP بتاعي»: **IPv4 بتاع المزوّد** (برّه النفق) و **IPv6 بتاع شركة السيرفر**. خليط.

السبب: ويندوز مش بيشارك «النت»، بيشارك **كارت**. الهوت سبوت العادي بيشارك كارت الـ Wi-Fi، فترافيك الموبايل بيتعمله NAT على الـ Wi-Fi ويخرج منه مباشرة، والـ routes بتاعة النفق ([[/1+/1]]) بتاعة **اللابتوب** مش الترافيك اللي متشارك. وصفحة Settings بتعرض الكروت الحقيقية بس، والقائمة «Share my internet connection from» بتبقى رمادية طول ما الهوت سبوت شغّال (لازم Off الأول).

الحل: الهوت سبوت يتشغّل من الـ API ([[NetworkOperatorTetheringManager.CreateFromConnectionProfile]]) بالـ profile بتاع **كارت النفق**. والترتيب مهم: بعد ما النفق يتوصل ويستقر، ويتعاد بعد أي إعادة اتصال (الكارت بيتعمل من جديد والمشاركة بتفضل مربوطة بالقديم). عَرَض أندرويد وقت التبديل: [[Connected without internet]] وبعدها يفصل لوحده، اختار Keep.`,
          example: R`# Windows (PowerShell): فحص قراية بس
Get-NetAdapter -Physical | Select-Object Name, InterfaceDescription, Status
Get-Service SharedAccess, icssvc | Select-Object Name, Status, StartType
Get-NetIPInterface -AddressFamily IPv4 | Select-Object InterfaceAlias, Forwarding, InterfaceMetric
Get-NetNeighbor -AddressFamily IPv4 -InterfaceAlias 'Local Area Connection* 2' -State Reachable, Stale
Get-WinEvent -FilterHashtable @{LogName='System'; StartTime=(Get-Date).AddMinutes(-40)} | Where-Object ProviderName -match 'SharedAccess|icssvc|WLAN'
powershell -NoProfile -File .\tether-state.ps1
# Linux (and WSL): نفس الفكرة في المعمل
ip netns exec laptop ip route show table 100`,
          lines: [
            R`الكروت الحقيقية بس ([[-Physical]]): دي اللي صفحة Settings بتعرضها في «Share from». كارت النفق (wintun) مش هيظهر هنا، وده أول دليل إن الصفحة مش هتقدر تشاركه.`,
            R`الخدمتين ورا المشاركة: [[SharedAccess]] (ICS: الـ NAT والـ DHCP على [[192.168.137.1]])، و [[icssvc]] (Mobile Hotspot). [[Status]] بيقول شغّالة ولا لأ، و [[StartType]] بتقوم لوحدها ولا يدوي.`,
            R`[[Forwarding]] لكل كارت: الكارت اللي بيعدّي ترافيك أجهزة تانية بيبقى [[Enabled]]. و [[InterfaceMetric]] الرقم الأقل بيكسب في الـ routes المتساوية.`,
            R`مين متوصل بالهوت سبوت؟ [[Get-NetNeighbor]] جدول ARP: أي جهاز عدّى منه ترافيك بيظهر بـ IP و MAC. [[Local Area Connection* 2]] اسم شائع لكارت الهوت سبوت الوهمي (عندك ممكن رقم تاني، شوفه من [[Get-NetAdapter]]).`,
            R`آخر ٤٠ دقيقة من System log، و [[Where-Object ProviderName -match]] يطلّع أحداث المشاركة والهوت سبوت والـ WLAN بس: إمتى اتشغّل، واتقفل، وفشل ليه.`,
            R`سكربت قراية بس في Windows PowerShell 5.1 (الـ WinRT متاح فيه، ومش متاح في pwsh 7) بيقرا حالة الهوت سبوت وعدد الأجهزة المتوصلة ([[TetheringOperationalState]] و [[ClientCount]]). الكود في الشرح.`,
            R`في المعمل: جدول التوجيه اللي الترافيك المتشارك بيمشي عليه. لو مكتوب فيه [[dev wifi0]] الموبايل برّه النفق، ولو [[dev vpnlab0]] جوّاه، ولو فاضي يبقى الكارت اللي كان مربوط بيه اتشال.`,
          ],
          try: R`ابني معمل الـ namespaces اللي في الشرح (لابتوب بكارتين، وموبايل، وإنترنت فيه سيرفر «IP بتاعي»)، وشغّل الخطوات ١ لـ ٩ وقارن الـ IP اللي الموبايل بيشوفه في كل خطوة. وبعدين على ويندوز شغّل أوامر الفحص (قراية بس) واعرف حالة الهوت سبوت عندك.`,
          teach: R`## العَرَض

- اللابتوب عليه نفق شغّال (كارت [[vpnlab0]]، والـ IP الخارجي بتاعه = السيرفر).
- Mobile Hotspot من Settings، والموبايل اتوصل.
- الموبايل على موقع «IP بتاعي»: **IPv4 = المزوّد** (برّه النفق)، و **IPv6 = شركة السيرفر**.

ليه خليط؟ IPv4 من الـ NAT بتاع الهوت سبوت على الـ Wi-Fi، و IPv6 كان بيتوزّع للموبايل بطريقة تانية ومشي على طريق تاني. المهم: الموبايل **مش** جوه النفق.

---

## الفكرة: المشاركة مربوطة بكارت

| اللي انت فاكره | اللي بيحصل |
|---|---|
| «شارك النت بتاع اللابتوب» | شارك **كارت معيّن**: NAT على الكارت ده بالظبط |
| الـ routes بتاعة النفق هتمسك ترافيك الموبايل | الـ routes دي لترافيك اللابتوب. ترافيك المشاركة بيتبعت على الكارت المتشارك |
| Settings هتعرض كارت النفق | بتعرض الكروت الحقيقية (Wi-Fi و Ethernet) بس |
| غيّر الكارت والهوت سبوت شغّال | القائمة رمادية. لازم Off الأول |

---

## المعمل: ٣ namespaces في كونتينر [[--privileged]]

~~~text
          phone (192.168.137.2)
             │ wlan0
             │ hot0 192.168.137.1      ← الهوت سبوت (نفس subnet ويندوز ICS)
          laptop ──wifi0 192.168.1.20──── isp0 ─┐
             └────vpnlab0 10.255.0.2──── srv0 ──┤  inet: سيرفر «IP بتاعي» على 198.51.100.80
                                                 │  اللي جاي من isp0 يبان 198.51.100.7 (المزوّد)
                                                 └─ اللي جاي من srv0 يبان 203.0.113.9 (السيرفر)
~~~

~~~bash
for n in phone laptop inet; do ip netns add $n; done
L(){ ip netns exec laptop "$@"; }; I(){ ip netns exec inet "$@"; }; P(){ ip netns exec phone "$@"; }
ip link add wifi0 netns laptop type veth peer name isp0 netns inet
ip link add hot0 netns laptop type veth peer name wlan0 netns phone
L ip addr add 192.168.1.20/24 dev wifi0;  I ip addr add 192.168.1.1/24 dev isp0
L ip addr add 192.168.137.1/24 dev hot0;  P ip addr add 192.168.137.2/24 dev wlan0
I ip addr add 198.51.100.80/32 dev lo
I iptables -t nat -A INPUT -i srv0 -j SNAT --to-source 203.0.113.9
I iptables -t nat -A INPUT -i isp0 -j SNAT --to-source 198.51.100.7
L ip route add default via 192.168.1.1 dev wifi0
P ip route add default via 192.168.137.1
L sysctl -qw net.ipv4.ip_forward=1
~~~

(كمان [[ip link set ... up]] لكل كارت، و routes رجوع في [[inet]] لـ [[203.0.113.9]] و [[198.51.100.7]]، وسيرفر بايثون صغير على [[198.51.100.80:80]] بيرد بـ [[client_address]]. والنفق دالة [[tunnel_up]] بتعمل [[vpnlab0]] وتضيف [[/1+/1]].)

| الحتة | ليه |
|---|---|
| [[ip netns add]] | كل namespace جهاز لوحده: كروته وجدول توجيهه وجداره |
| [[veth ... peer]] | سلك بطرفين: طرف في namespace وطرف في التاني |
| [[SNAT]] في [[INPUT]] | عشان سيرفر «IP بتاعي» يشوف عنوان «عام» مختلف حسب الطريق اللي الباكت جت منه، زي الإنترنت الحقيقي |
| [[ip_forward=1]] | اللابتوب يعدّي ترافيك الموبايل (في ويندوز ده [[Forwarding Enabled]] على الكارت) |

---

## الخطوات والنتايج

~~~text الناتج
1) laptop, no tunnel:     198.51.100.7
2) laptop, tunnel up:     203.0.113.9
3) phone, no sharing:     curl: (28) Connection timed out after 3002 milliseconds
4) phone, sharing wifi0:  198.51.100.7
5) phone, sharing vpnlab0: 203.0.113.9
6) laptop after reconnect: 203.0.113.9
   table 100 now: []
7) phone after reconnect:  curl: (7) Failed to connect to 198.51.100.80 port 80 after 0 ms: Couldn't connect to server
8) phone after re-share:   203.0.113.9
9) phone by name:          curl: (28) Resolving timed out after 3001 milliseconds
~~~

### خطوة ٤: المشاركة العادية = الـ Wi-Fi

~~~bash
L ip rule add iif hot0 table 100 pref 100
L ip rule add iif hot0 unreachable pref 101
L ip route add default via 192.168.1.1 dev wifi0 table 100
L iptables -t nat -A POSTROUTING -s 192.168.137.0/24 -o wifi0 -j MASQUERADE
~~~

- [[ip rule add iif hot0 table 100]]: الباكتس اللي **داخلة من الهوت سبوت** تستخدم جدول توجيه لوحدها (100)، مش الجدول الرئيسي اللي فيه [[/1+/1]]. ده بالظبط اللي ICS بيعمله: ترافيك المشاركة ليه طريقه.
- [[unreachable pref 101]]: لو جدول 100 فاضي، **ارفض**، متقعش على الجدول الرئيسي. من غيرها، في لينكس الترافيك كان هيكمّل من النفق بالصدفة ويخبّي المشكلة.
- [[MASQUERADE -o wifi0]]: NAT على الـ Wi-Fi: الموبايل يبان بعنوان اللابتوب على الـ Wi-Fi.

النتيجة [[198.51.100.7]]: الموبايل برّه النفق، وده بالظبط العَرَض اللي حصل.

### خطوة ٥: مشاركة كارت النفق

~~~bash
L ip route replace default via 10.255.0.1 dev vpnlab0 table 100
L iptables -t nat -A POSTROUTING -s 192.168.137.0/24 -o vpnlab0 -j MASQUERADE
~~~

الموبايل بقى [[203.0.113.9]]. ده المقابل لتشغيل الهوت سبوت **من profile كارت النفق**.

### خطوة ٦ و ٧: إعادة اتصال

إعادة الاتصال بتشيل الكارت وتعمله من جديد ([[ip link del vpnlab0]] ثم [[tunnel_up]]). اللابتوب رجع على طول ([[203.0.113.9]])، بس:

- جدول 100 بقى **فاضي**: الـ route كان مربوط بالكارت القديم، واتشال معاه.
- الموبايل: [[Failed to connect]]. والـ [[unreachable]] منعته يطلع من الـ Wi-Fi بدل النفق، وده أحسن بكتير من إنه يرجع يطلع برّه من غير ما حد ياخد باله.

وفي ويندوز نفس الحكاية بشكل تاني: المشاركة متسجلة بالـ GUID بتاع الكارت، والكارت الجديد GUID مختلف، فالهوت سبوت بيفضل «شغّال» ومربوط بحاجة مش موجودة. عشان كده **الهوت سبوت يتعاد بعد كل إعادة اتصال**.

### خطوة ٩: الاسم مش بيتحل

الموبايل وصل للـ IP بس الاسم لأ. في ويندوز ICS بيدّي الموبايل DNS = [[192.168.137.1]] وبيعمل له forward، ولو ده مش شغّال بتشوف «متصل من غير إنترنت». **اعزل الـ DNS:** افتح [[http://1.1.1.1]] (من غير اسم) من متصفح الموبايل. لو فتح والأسامي لأ، المشكلة DNS مش توجيه.

---

## على ويندوز: افحص من غير ما تغيّر

~~~text Get-Service SharedAccess, icssvc | Select-Object Name, Status, StartType
Name          Status StartType
----          ------ ---------
icssvc       Stopped    Manual
SharedAccess Running    Manual
~~~

~~~text Get-NetIPInterface -AddressFamily IPv4 | Select-Object InterfaceAlias, Forwarding, InterfaceMetric
InterfaceAlias                     Forwarding InterfaceMetric
--------------                     ---------- ---------------
Ethernet 2                           Disabled
Local Area Connection* 2             Disabled 25
Bluetooth Network Connection         Disabled 65
~~~

وحالة الهوت سبوت نفسها من الـ WinRT API (قراية بس، في Windows PowerShell 5.1):

~~~powershell tether-state.ps1
[void][Windows.Networking.Connectivity.NetworkInformation, Windows.Networking.Connectivity, ContentType=WindowsRuntime]
[void][Windows.Networking.NetworkOperators.NetworkOperatorTetheringManager, Windows.Networking.NetworkOperators, ContentType=WindowsRuntime]
$p  = [Windows.Networking.Connectivity.NetworkInformation]::GetInternetConnectionProfile()
$tm = [Windows.Networking.NetworkOperators.NetworkOperatorTetheringManager]::CreateFromConnectionProfile($p)
"shared profile: " + $p.ProfileName
"state=" + $tm.TetheringOperationalState + " clients=" + $tm.ClientCount + " max=" + $tm.MaxClientCount
~~~

~~~text powershell -NoProfile -File .\tether-state.ps1
shared profile: HomeWiFi
state=Off clients=0 max=8
~~~

وفي pwsh 7 نفس السطر الأول بيفشل:

~~~text pwsh
InvalidOperation: Unable to find type [Windows.Networking.Connectivity.NetworkInformation,Windows.Networking.Connectivity, ContentType=WindowsRuntime].
~~~

لأن pwsh 7 (مبني على .NET الحديث) شال دعم الـ WinRT المباشر. استخدم [[powershell]] (5.1) للسكربت ده.

> وفيه طريقة COM قديمة للـ ICS: [[New-Object -ComObject HNetCfg.HNetShare]] و [[EnumEveryConnection]] و [[INetSharingConfigurationForINetConnection(...).SharingEnabled]]. في تجربتنا من نافذة عادية (مش أدمن) رجّعت **ولا كارت** ([[count=0]])، فمحتاجة أدمن عشان تقول حاجة.

### التشغيل من كارت النفق (من وثائق Microsoft، متشغّلش هنا)

~~~powershell
$p  = [Windows.Networking.Connectivity.NetworkInformation]::GetConnectionProfiles() | Where-Object ProfileName -eq 'vpnlab0'
$tm = [Windows.Networking.NetworkOperators.NetworkOperatorTetheringManager]::CreateFromConnectionProfile($p)
$op = $tm.StartTetheringAsync()
~~~

[[CreateFromConnectionProfile]] بياخد الـ profile اللي هيتشارك، وهنا profile كارت النفق بدل الـ Wi-Fi. و [[StartTetheringAsync]] بيرجّع عملية async (في 5.1 محتاج helper يستنى نتيجتها). ده **بيغيّر حالة الجهاز**: اتعلّم من الوثائق، وجرّبه على جهازك بإيدك وانت فاهم إن الهوت سبوت هيتقفل ويتفتح.

---

## الترتيب الصح

1. النفق يتوصل، وتستنى لحد ما يستقر (الـ IP الخارجي = السيرفر).
2. الهوت سبوت يتشغّل من profile كارت النفق.
3. على الموبايل: أندرويد ممكن يقول [[Connected without internet]] لحظة التبديل ويفصل لوحده: اختار **Keep** (أو «Stay connected»).
4. أي إعادة اتصال للنفق ← وقّف الهوت سبوت وشغّله تاني بنفس الطريقة.

## اتأكد

- الموبايل على موقع «IP بتاعي» = IP السيرفر، و IPv6 = السيرفر أو مفيش (مش المزوّد).
- [[Get-NetNeighbor]] على كارت الهوت سبوت فيه عنوان الموبايل.
- [[http://1.1.1.1]] بيفتح، واسم موقع بيفتح.

> المعمل الحقيقي على ويندوز محتاج كارت Wi-Fi بيدعم Mobile Hotspot. [[netsh wlan show drivers]] (قراية بس) على الجهاز ده طبع [[Hosted network supported  : No]] و [[Wireless Display Supported: Yes]]، والـ API رجّع [[max=8]]. السطر الأول بتاع [[netsh wlan hostednetwork]] القديم، والـ Mobile Hotspot الحديث مبني على Wi-Fi Direct، فـ [[No]] هنا مش حكم. الحكم من [[MaxClientCount]] في [[tether-state.ps1]] أو من زرار Mobile Hotspot في Settings.`,
          deep: {
            why: R`الـ NAT لازم يعرف هيكتب عنوان مصدر إيه، فلازم يتربط بكارت خارج معيّن. وويندوز بيربط المشاركة بالكارت اللي اخترته (أو اللي الهوت سبوت بيعتبره «النت»)، مش بجدول التوجيه. فـ routes النفق ([[/1+/1]]) بتلمس ترافيك اللابتوب نفسه، والترافيك المتشارك بيتعمله NAT ويخرج من الكارت المتشارك قبل ما الجدول ده يفرق.`,
            how: R`ICS بيشغّل على كارت الأجهزة الداخلية DHCP (رينج [[192.168.137.0/24]] والجهاز [[192.168.137.1]])، و DNS proxy، و NAT على الكارت العام. و Mobile Hotspot ([[icssvc]]) بيعمل كارت Wi-Fi وهمي (عادةً [[Local Area Connection* N]]) ويستخدم ICS من تحت. والـ API [[NetworkOperatorTetheringManager]] بياخد [[ConnectionProfile]] للكارت اللي هيتشارك. ولما كارت النفق يتشال ويتعمل (wintun بيعمل كارت جديد مع كل اتصال)، الـ profile القديم بيختفي والمشاركة بتفضل مربوطة بيه. وفي لينكس المقابل: [[ip rule iif]] بجدول توجيه لوحده، و [[MASQUERADE -o]] على الكارت المختار.`,
            when: R`لما عايز تدخّل جهاز مالوش أداة VPN (موبايل، أو TV، أو كونسول ألعاب) على نفق اللابتوب. ولما ترافيك الأجهزة المتشاركة طالع من مكان غير المتوقع. ونفس الفكرة لما تشارك نفق من Raspberry Pi أو راوتر لينكس.`,
            mistakes: R`تفتكر إن الهوت سبوت هيورث النفق لوحده. وتغيّر «Share from» والهوت سبوت شغّال فتلاقيها رمادية وتفتكر إنها مش مدعومة. وتشغّل الهوت سبوت قبل ما النفق يستقر. وتنسى تعيده بعد إعادة الاتصال فالموبايل يبان «متوصل» ومفيش نت (أو أسوأ: يطلع برّه النفق). وتحكم من IPv4 بس وتنسى IPv6 بيمشي على طريق تاني. وتعتبر «Connected without internet» على أندرويد يعني الإعداد فاشل، وهو غالبًا لحظة تبديل. وتشغّل سكربت الـ WinRT في pwsh 7 فيفشل وتفتكر الـ API مش موجود.`
          },
          sol: R`المعمل (كونتينر [[ubuntu:24.04]] بـ [[--privileged]] و [[ip netns]]): اللابتوب [[198.51.100.7]] من غير نفق و [[203.0.113.9]] بيه. الموبايل من غير مشاركة [[curl: (28) Connection timed out]]، ومشاركة [[wifi0]]: [[198.51.100.7]] (برّه النفق)، ومشاركة [[vpnlab0]]: [[203.0.113.9]]. بعد إعادة اتصال: [[table 100 now: []]] والموبايل [[curl: (7) Failed to connect to 198.51.100.80 port 80 after 0 ms]]، وبعد إعادة المشاركة رجع [[203.0.113.9]]. وبالاسم: [[curl: (28) Resolving timed out]].

على ويندوز 11 (قراية بس): [[SharedAccess Running]] و [[icssvc Stopped]]، والـ WinRT في 5.1 طبع [[state=Off clients=0 max=8]]، و pwsh 7 طلّع [[Unable to find type]]، و COM [[HNetCfg.HNetShare]] من غير أدمن رجّع [[count=0]]. أسماء الشبكات اتغيّرت لأسماء مخترعة. تشغيل الهوت سبوت ([[StartTetheringAsync]] بـ profile كارت النفق) من وثائق Microsoft (Windows.Networking.NetworkOperators) ومتشغّلش، وعَرَض أندرويد والـ IPv4/IPv6 الخليط من الحالة الأصلية.`,
          practice: [
            { lvl: 'سريع', t: R`من غير ما تبص: ليه الموبايل على هوت سبوت عادي طلع بـ IP المزوّد رغم إن اللابتوب جوه النفق؟ جملتين.`, done: R`كاتب إن المشاركة (NAT) مربوطة بكارت الـ Wi-Fi، وإن routes النفق بتاعة ترافيك اللابتوب بس، فترافيك الموبايل خرج من الـ Wi-Fi.` },
            { lvl: 'تطبيق', t: R`دوّر بنفسك على جهازك (قراية بس): اعرف اسم كارت الهوت سبوت الوهمي من [[Get-NetAdapter]]، وحالة [[icssvc]]، وهل كارت الـ Wi-Fi بيدعم الهوت سبوت من [[netsh wlan show drivers]]، والـ profile اللي هيتشارك من [[tether-state.ps1]].`, done: R`عندك ٤ إجابات مكتوبة جنب الأمر اللي جابها، ومفيش ولا أمر غيّر حاجة (مفيش [[Start]] ولا [[set]] ولا [[add]]).` },
            { lvl: 'تطبيق', t: R`اقرا وتوقّع: في المعمل، لو شلت سطر [[ip rule add iif hot0 unreachable pref 101]] وعملت إعادة اتصال، الموبايل هيطبع إيه؟ وده أحسن ولا أسوأ؟ وبعدين جرّب.`, done: R`توقعت إنه هيكمّل يطبع [[203.0.113.9]] لأن الطلب وقع على الجدول الرئيسي وطلع من النفق بالصدفة، وجربت وطلع كده، وكاتب ليه ده أسوأ: لو النفق نفسه وقع، نفس السقوط هيوديه على الـ Wi-Fi من غير ما حد يحس.` },
            { lvl: 'تطبيق', t: R`صلّح الترتيب: سكربت تشغيل بيعمل: (١) يشغّل الهوت سبوت (٢) يوصّل النفق (٣) يستنى ٥ ثواني. اكتب الترتيب الصح ومعاه فحص بيتأكد إن النفق استقر قبل المشاركة، وإيه اللي يحصل بعد كل إعادة اتصال.`, done: R`الترتيب: وصّل النفق، واستنى لحد ما [[curl -4 -s -m 5 https://api.ipify.org]] يرجّع IP السيرفر (مش وقت ثابت)، وبعدين شغّل الهوت سبوت من profile كارت النفق، ومع كل [[reconnected]] وقّفه وشغّله تاني. ومعاك في المعمل نفس الخطوات بـ [[table 100]].` },
            { lvl: 'تحدي', t: R`ابني [[share-watch.sh]] للمعمل: كل ثانيتين يتأكد إن جدول 100 فيه [[dev vpnlab0]] وإن الـ ifindex بتاع [[vpnlab0]] هو نفسه اللي اتسجّل وقت المشاركة، ولو اتغيّر (إعادة اتصال) يعيد المشاركة ويكتب سطر في لوج بالوقت.`, done: R`بعد [[ip link del vpnlab0]] و [[tunnel_up]] السكربت كتب [[re-shared vpnlab0 (ifindex 5 -> 7)]] في أقل من ٣ ثواني، والموبايل رجع [[203.0.113.9]] من غير ما تلمس حاجة، وتشغيل السكربت مرتين مبيضيفش route مكرر.` },
            { lvl: 'تحدي', t: R`اشرحها لزميل في ٤ سطور: ليه «Connected without internet» على أندرويد لحظة التبديل مش معناها إن الإعداد فاشل، وإزاي تفصل بين مشكلة DNS ومشكلة توجيه من الموبايل نفسه.`, done: R`الشرح فيه: أندرويد بيختبر النت بطلب لسيرفر معين، والطلب بيفشل لحظة تبديل الكارت فيعلّم «من غير إنترنت»، و Keep بيسيبه متوصل، و [[http://1.1.1.1]] من غير اسم بيفصل DNS عن التوجيه.` },
          ],
          ci: [
            { os: [R`windows`], sh: R`powershell`, run: R`[void][Windows.Networking.Connectivity.NetworkInformation, Windows.Networking.Connectivity, ContentType=WindowsRuntime]
[void][Windows.Networking.NetworkOperators.NetworkOperatorTetheringManager, Windows.Networking.NetworkOperators, ContentType=WindowsRuntime]
'winrt types loaded in ' + $PSVersionTable.PSEdition
(Get-Service SharedAccess).Name
(Get-Command Get-NetNeighbor).Source`, expect: [R`winrt types loaded in Desktop`, R`SharedAccess`, R`NetTCPIP`] },
            { os: [R`windows`], sh: R`pwsh`, run: R`try { [void][Windows.Networking.Connectivity.NetworkInformation, Windows.Networking.Connectivity, ContentType=WindowsRuntime]; 'loaded' } catch { $_.Exception.Message }`, expect: [R`Unable to find type`] },
          ],
        },
        {
          cmd: "مشاركة النفق على الـ LAN",
          title: R`فعّلت «شارك على الشبكة المحلية» والموبايل مش بيفتح: البورت مقفول، وبعدها اتفتح لأي حد`,
          learn: R`تعرف ليه إعداد اتفعّل والبورت لسه مقفول (الإعداد بيتقري وقت الاتصال)، وتفتح الـ proxy للشبكة المحلية بس بقاعدة جدار [[LocalSubnet]]، وتمنع الـ proxy المشترك من الوصول لـ [[127.0.0.1]] وأجهزة الشبكة.`,
          out: R`البورت فاتح على [[0.0.0.0]]، والموبايل اللي على نفس الشبكة بيعدّي، وجهاز من شبكة تانية [[timed out]]، وطلب لـ [[127.0.0.1]] من خلال الـ proxy مرفوض [[(2)]].`,
          desc: R`الأداة بتفتح HTTP proxy على [[10809]] و SOCKS5 على [[10810]] على [[0.0.0.0]] لما تفعّل «Share on LAN»، عشان الموبايل يستخدمها من إعدادات الـ Wi-Fi. فعّلتها والموبايل مش بيفتح حاجة.

التسلسل: (١) حد فاتح البورت؟ [[Get-NetTCPConnection -State Listen -LocalPort 10809,10810]] رجّع **ولا حاجة**. (٢) العنوان اللي يتكتب في الموبايل إيه؟ (٣) الجدار؟ [[Get-NetConnectionProfile]] قال **Public** (بيقفل inbound). السبب الحقيقي كان (١): الإعداد اتفعّل **والاتصال شغّال من قبله**، والـ listener بيتفتح مع أول اتصال بعد التغيير (وقت تعديل [[settings.json]] أحدث من وقت بداية الاتصال). الحل في الأداة: سؤال «إعادة الاتصال الآن؟» عند أي إعداد محتاج reconnect.

وبعد ما البورت اتفتح ظهرت المشكلة الأخطر: أي حد يقدر يوصله، ومن خلاله يوصل لخدمات على **اللابتوب نفسه** ([[127.0.0.1]]). التأمين: قاعدة جدار [[-RemoteAddress LocalSubnet]] على المنفذين بس، تتضاف مع بداية الجلسة وتتشال مع الفصل، وقاعدة في الـ proxy بتمنع الوصول لـ [[127.0.0.0/8]] والشبكة المحلية.`,
          example: R`# Windows (PowerShell): قراية بس
Get-NetTCPConnection -State Listen -LocalPort 10809, 10810
netstat -ano | Select-String ':10809\s'
Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.InterfaceAlias -notmatch 'Loopback|vpnlab0' -and $_.IPAddress -notlike '169.254*' } | Select-Object InterfaceAlias, IPAddress
Get-NetConnectionProfile | Select-Object InterfaceAlias, NetworkCategory
Get-NetFirewallRule -DisplayName 'LabShare'
netsh advfirewall show currentprofile
# Linux (and WSL): المعمل
ss -ltnH 'sport = :10810'
date -r settings.json +%T; ps -o lstart= -p $(pgrep -f labtool.py)`,
          lines: [
            R`حد فاتح البورتين؟ [[-State Listen]] السوكتات اللي مستنية اتصال، و [[-LocalPort]] البورتات دي. لو مفيش، PowerShell بيطلع خطأ [[No matching MSFT_NetTCPConnection objects found]] بدل ما يطبع فاضي.`,
            R`نفس السؤال من غير CIM: [[netstat -ano]] كل السوكتات ومعاها رقم البروسس، و [[Select-String ':10809\s']] السطر اللي البورت المحلي فيه 10809 بالظبط ([[\s]] مسافة بعده عشان [[108090]] ميطابقش).`,
            R`العنوان اللي يتكتب في الموبايل: عناوين IPv4، من غير loopback وكارت النفق، ومن غير [[169.254.x]] (عنوان بيتدّي لما DHCP يفشل). اللي فاضل غالبًا [[192.168.1.x]] على الـ Wi-Fi.`,
            R`نوع الشبكة: [[Public]] الجدار بيقفل أي inbound مالوش قاعدة، و [[Private]] نفس الكلام بس فيه قواعد افتراضية أكتر مفتوحة (مشاركة الملفات مثلًا). قاعدة البورت لازم تبقى على الـ profile الصح.`,
            R`فيه قاعدة جدار باسم الأداة؟ لو مفيش: [[No MSFT_NetFirewallRule objects found with property 'DisplayName' equal to 'LabShare']].`,
            R`الـ profile الحالي في الجدار وسياسته: [[BlockInbound,AllowOutbound]] = الداخل مقفول إلا اللي ليه قاعدة.`,
            R`في المعمل: [[ss -ltnH]] بيطبع اللي فاتح بورت TCP من غير هيدر، والفلتر [[sport = :10810]] على البورت ده. العنوان اللي قبل البورت بيقول [[127.0.0.1]] (الجهاز بس) ولا [[0.0.0.0]] (كل الكروت).`,
            R`الدليل على السبب: [[date -r]] وقت آخر تعديل للإعدادات، و [[ps -o lstart=]] وقت بداية البروسس. لو الإعدادات أحدث، البرنامج لسه شغّال بالإعدادات القديمة.`,
          ],
          try: R`ابني المعمل اللي في الشرح ([[labtool.py]] في namespace اسمه [[lap]] والموبايل في [[ph]] والضيف في [[guest]])، وغيّر [[share_lan]] والأداة شغّالة، وشوف [[ss -ltn]]. وبعدين اعمل «إعادة اتصال» وجرّب من الموبايل لـ [[127.0.0.1:8080]] عن طريق الـ proxy، وبعدين أمّنها بالجدار والـ deny.`,
          teach: R`## العَرَض

- الأداة فيها خيار «Share on LAN»: بتفتح HTTP على [[10809]] و SOCKS5 على [[10810]] على [[0.0.0.0]].
- فعّلته. على الموبايل: Wi-Fi ← تعديل الشبكة ← Proxy يدوي ← عنوان اللابتوب وبورت [[10809]].
- الموبايل: ولا موقع بيفتح.

---

## التسلسل: من الأقرب للأبعد

### (١) حد فاتح البورت أصلًا؟

ده الأول لأنه الأرخص، ولو البورت مش فاتح يبقى ملوش لازمة نتكلم عن جدار ولا عنوان.

~~~text Get-NetTCPConnection -State Listen -LocalPort 10809, 10810 (ويندوز ١١)
Get-NetTCPConnection: No matching MSFT_NetTCPConnection objects found by CIM query for instances of the ROOT/StandardCimv2/MSFT_NetTCPConnection class on the  CIM server: SELECT * FROM MSFT_NetTCPConnection  WHERE ((LocalPort = 10809) OR (LocalPort = 10810)) AND ((State = 2)). Verify query parameters and retry.
~~~

الرسالة طويلة بس معناها كلمة: **مفيش**. و [[State = 2]] هو Listen جوه CIM. و [[netstat -ano | Select-String ':10809\s']] رجّع صفر سطور.

### (٢) العنوان اللي في الموبايل صح؟

~~~powershell
Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.InterfaceAlias -notmatch 'Loopback|vpnlab0' -and $_.IPAddress -notlike '169.254*' } | Select-Object InterfaceAlias, IPAddress
~~~

العنوان اللي على الـ Wi-Fi ([[192.168.1.20]] في المعمل). مش عنوان كارت النفق ([[10.255.0.2]])، ولا [[127.0.0.1]] (ده الموبايل نفسه من ناحيته).

### (٣) الجدار؟

~~~text netsh advfirewall show currentprofile
Public Profile Settings:
----------------------------------------------------------------------
State                                 ON
Firewall Policy                       BlockInbound,AllowOutbound
~~~

~~~text Get-NetFirewallRule -DisplayName 'LabShare'
Get-NetFirewallRule: No MSFT_NetFirewallRule objects found with property 'DisplayName' equal to 'LabShare'.  Verify the value of the property and retry.
~~~

الشبكة Public والداخل مقفول ومفيش قاعدة. ده هيبقى مشكلة **بعد** ما البورت يتفتح. بس (١) لسه مقفول، فنرجع له.

---

## المعمل: ليه البورت مقفول والإعداد متفعّل؟

كونتينر [[--privileged]] و ٣ namespaces: [[lap]] (اللابتوب [[192.168.1.20]])، و [[ph]] (الموبايل [[192.168.1.30]] على نفس الشبكة)، و [[guest]] ([[10.20.0.5]]، جهاز من شبكة تانية بتعدّي من اللابتوب). وعلى اللابتوب خدمة على [[127.0.0.1:8080]] (لوحة إدارة، مش المفروض حد يشوفها).

~~~python labtool.py (المهم منه)
cfg = json.load(open("settings.json"))
listen = "0.0.0.0" if cfg.get("share_lan") else "127.0.0.1"
DENY = [ipaddress.ip_network(n) for n in cfg.get("deny", [])]
print(time.strftime("%H:%M:%S"), f"connected; socks on {listen}:10810 deny={cfg.get('deny', [])}", flush=True)
...
    if any(ipaddress.ip_address(host) in n for n in DENY):
        c.sendall(b"\x05\x02\x00\x01" + bytes(6)); c.close(); return     # 2 = not allowed by ruleset
...
s.bind((listen, 10810)); s.listen(64)
~~~

الإعدادات بتتقري **مرة واحدة** وقت الاتصال، زي الأداة الحقيقية.

~~~text الناتج
--- setting changed while connected
listeners: [127.0.0.1:10810]
settings mtime: 10:16:22  tool started: 10:16:18
phone: curl: (7) Failed to connect to 192.168.1.20 port 10810 after 0 ms: Couldn't connect to server
~~~

الأداة بدأت 10:16:18 والإعداد اتغيّر 10:16:22. **الإعداد أحدث من الاتصال** = الأداة لسه شغّالة بالقديم. و [[after 0 ms]] معناها الجهاز رد فورًا «مفيش حد هنا» (RST)، مش جدار (الجدار بيسكت فبيبقى timeout).

---

## بعد إعادة الاتصال: اتفتح... لكل حاجة

~~~text الناتج
--- after reconnect
listeners: [0.0.0.0:10810]
phone -> laptop's 127.0.0.1:8080:  router admin panel
guest (10.20.0.5) -> proxy:        router admin panel
~~~

اتنين مشاكل في سطرين:

1. **الموبايل وصل لـ [[127.0.0.1:8080]] على اللابتوب.** الـ proxy شغّال على اللابتوب، فـ [[127.0.0.1]] من ناحيته هو اللابتوب. أي خدمة انت فاكرها «محلية بس» (لوحة إدارة، أو قاعدة بيانات، أو dev server) بقت مكشوفة لأي حد بيستخدم الـ proxy.
2. **جهاز من شبكة تانية** وصل. [[0.0.0.0]] معناها كل الكروت، مش «الشبكة المحلية».

---

## التأمين ١: جدار بيسمح لنفس الشبكة بس

في المعمل بـ iptables:

~~~bash
iptables -A INPUT -p tcp -m multiport --dports 10809,10810 -s 192.168.1.0/24 -i lan0 -j ACCEPT
iptables -A INPUT -p tcp -m multiport --dports 10809,10810 -j DROP
~~~

~~~text الناتج
guest after firewall:              curl: (28) Connection timed out after 3002 milliseconds
~~~

[[timed out]] مش [[refused]]: الجدار بيرمي الباكت ومبيردش، فالعميل بيستنى.

وفي ويندوز نفس القاعدة (من وثائق [[New-NetFirewallRule]]، بتغيّر الجدار فمتشغّلتش هنا):

~~~powershell
New-NetFirewallRule -DisplayName 'LabShare' -Direction Inbound -Protocol TCP -LocalPort 10809, 10810 -RemoteAddress LocalSubnet -Action Allow -Profile Private, Public
Remove-NetFirewallRule -DisplayName 'LabShare'
~~~

| الحتة | معناها |
|---|---|
| [[-LocalPort 10809, 10810]] | البورتين دول بس، مش البرنامج كله |
| [[-RemoteAddress LocalSubnet]] | كلمة محجوزة: «أي عنوان في الـ subnet بتاع الكارت اللي الباكت داخلة منه». بتتحسب لوحدها لو الشبكة اتغيّرت |
| [[-Profile Private, Public]] | الشبكات بتاعة البيت غالبًا متعلّمة Public، فلو القاعدة على Private بس مش هتشتغل |
| [[Remove-NetFirewallRule]] | تتشال مع الفصل. قاعدة مفتوحة والأداة مقفولة = بورت مكشوف لو برنامج تاني فتحه |

والأداة بتضيف القاعدة **بعد** ما الجلسة تبدأ والبورت يتفتح، وتشيلها مع الفصل.

## التأمين ٢: الـ proxy المشترك ميوصلش للجهاز ولا للـ LAN

~~~text settings.json + إعادة اتصال
{"share_lan": true, "deny": ["127.0.0.0/8", "192.168.1.0/24", "10.20.0.0/24"]}

phone -> 127.0.0.1 after deny:     curl: (97) Can't complete SOCKS5 connection to 127.0.0.1. (2)
denied 192.168.1.30 -> 127.0.0.1:8080
~~~

[[(2)]] = «not allowed by ruleset» في SOCKS5. وفي Xray نفس الفكرة: قاعدة block للـ inbound المشترك ([[inboundTag]]) على [[127.0.0.0/8]] و [[::1/128]] والشبكات المحلية.

---

## على الموبايل

Wi-Fi ← اضغط مطوّل على الشبكة ← تعديل ← خيارات متقدمة ← Proxy: يدوي، Host = عنوان اللابتوب، Port = [[10809]].

**ولازم ترجّعه None بعد التجربة.** الإعداد ده بتاع الشبكة دي على الموبايل، فلما اللابتوب يتقفل، الموبايل يفضل يبعت كل حاجة لعنوان مفيش حد عليه: «النت وقف» من غير سبب واضح.

---

## البدايل اللي اترفضت

| البديل | ليه لأ |
|---|---|
| تقفل الجدار خالص | كل البرامج اللي على الجهاز بقت مكشوفة، مش البورتين بس |
| قاعدة allow للبرنامج كله ([[-Program]]) | أي بورت البرنامج يفتحه بعدين هيبقى مفتوح |
| [[-RemoteAddress Any]] | لو اللابتوب على شبكة كافيه، أي حد عليها يستخدم نفقك |
| تغيّر الشبكة لـ Private وخلاص | بيفتح مشاركة الملفات وحاجات تانية مالهاش علاقة |
| «الأداة تقرا الإعدادات كل ثانية» | ممكن، بس فتح وقفل listener في نص جلسة شغّالة بيقطع اتصالات قائمة. السؤال «إعادة الاتصال الآن؟» أوضح |

## اتأكد

- [[Get-NetTCPConnection -State Listen -LocalPort 10809,10810]] فيها السطرين على [[0.0.0.0]].
- من الموبايل: موقع بيفتح، و «IP بتاعي» = السيرفر.
- من جهاز على شبكة تانية (أو [[guest]] في المعمل): timeout.
- من خلال الـ proxy لـ [[127.0.0.1]]: مرفوض.
- بعد الفصل: [[Get-NetFirewallRule -DisplayName LabShare]] مش موجودة.`,
          deep: {
            why: R`أغلب البرامج بتقرا إعداداتها مرة وقت ما تبدأ أو وقت الاتصال، فأي إعداد بيغيّر «حاجة اتفتحت» (بورت، أو كارت، أو route) محتاج إعادة. والـ proxy المشترك خطير لأنه بيعمل الاتصال **من جهازك**: كل حاجة جهازك يقدر يوصلها (localhost، والطابعة، والراوتر، والـ NAS) بقت متاحة لأي حد يقدر يوصل للبورت.`,
            how: R`[[0.0.0.0]] في [[bind]] معناها «اسمع على كل العناوين اللي على الجهاز»، و [[127.0.0.1]] «الـ loopback بس». الجدار في ويندوز (WFP) بيفحص الداخل حسب الـ profile بتاع الكارت (Domain و Private و Public)، و [[LocalSubnet]] بيتحسب ديناميكي من عناوين الكروت. و SOCKS5 بيرد بكود في البايت التاني: [[0x00]] نجح، و [[0x02]] ممنوع بالقواعد، و [[0x04]] مش قادر يوصل للجهاز. و curl بيطبع الكود ده بين قوسين في خطأ [[97]]. والفرق بين [[refused]] و [[timed out]]: الأول الجهاز رد بـ RST (مفيش حد على البورت)، والتاني محدش رد (جدار بيرمي أو الجهاز مش موجود) — درس «اقرا الفشل» في نفس التاب.`,
            when: R`أي مرة تفتح خدمة من جهازك للشبكة المحلية: proxy، أو dev server ([[--host 0.0.0.0]] في Vite أو Next)، أو قاعدة بيانات، أو مشاركة ملفات. ونفس سؤال «الإعداد اتقري إمتى؟» لما تغيّر حاجة في برنامج شغّال ومش شايف أثرها.`,
            mistakes: R`تفتح الجدار للبرنامج كله أو تقفله. وتنسى إن [[127.0.0.1]] من ناحية الـ proxy هو جهازك. وتكتب في الموبايل عنوان كارت النفق أو [[127.0.0.1]]. وتسيب الـ proxy متظبط على الموبايل فالنت يقف بعدين. وتفتكر [[refused]] جدار، وهو غالبًا «مفيش listener». وتحط القاعدة على profile Private والشبكة Public. وتسيب القاعدة بعد ما الأداة تتقفل.`
          },
          sol: R`المعمل: بعد تغيير الإعداد والأداة شغّالة: [[listeners: [127.0.0.1:10810]]]، و [[settings mtime: 10:16:22  tool started: 10:16:18]]، والموبايل [[curl: (7) Failed to connect to 192.168.1.20 port 10810 after 0 ms: Couldn't connect to server]]. بعد إعادة الاتصال: [[0.0.0.0:10810]]، والموبايل والضيف الاتنين وصلوا لـ [[router admin panel]] على [[127.0.0.1:8080]]. بعد قاعدتين iptables: الضيف [[curl: (28) Connection timed out after 3002 milliseconds]]، وعدّاد قاعدة الـ DROP زاد. بعد الـ deny: [[curl: (97) Can't complete SOCKS5 connection to 127.0.0.1. (2)]] ولوج الأداة [[denied 192.168.1.30 -> 127.0.0.1:8080]].

على ويندوز 11 (قراية بس): [[Get-NetTCPConnection]] و [[Get-NetFirewallRule]] طلّعوا رسايل [[No matching ... objects found]] بالنص اللي في الشرح، و [[netsh advfirewall firewall show rule name=LabShare]] طلّع [[No rules match the specified criteria.]]، و [[show currentprofile]] طلّع [[BlockInbound,AllowOutbound]]. [[New-NetFirewallRule]] و [[Remove-NetFirewallRule]] من وثائق Microsoft (NetSecurity) ومتشغّلوش لأنهم بيغيّروا الجدار.`,
          practice: [
            { lvl: 'سريع', t: R`من غير ما تبص: إيه الفرق في المعنى بين [[curl: (7) ... after 0 ms: Couldn't connect]] و [[curl: (28) Connection timed out]] لما بتجرّب بورت على جهاز تاني؟ وكل واحد بيشاورك على إيه؟`, done: R`الأول: الجهاز رد فورًا إن مفيش حد على البورت (افحص الـ listener)، والتاني: محدش رد (جدار بيرمي، أو عنوان غلط، أو الجهاز مش موجود).` },
            { lvl: 'تطبيق', t: R`على جهازك (قراية بس): اكتب سكربت ٥ سطور بيطبع: البورتات اللي فاتحة على [[0.0.0.0]] أو [[::]] ومين صاحبها ([[Get-NetTCPConnection -State Listen]] و [[Get-Process -Id]])، ونوع الشبكة لكل كارت.`, done: R`السكربت بيطبع جدول فيه [[LocalAddress]] و [[LocalPort]] و [[ProcessName]] للي على [[0.0.0.0]] بس، وسطر لكل كارت بالـ [[NetworkCategory]]، وعرفت منه على الأقل خدمة واحدة كنت فاكرها محلية.` },
            { lvl: 'تطبيق', t: R`اقرا وتوقّع: في المعمل بعد قاعدتين الجدار ومن غير deny، توقّع: الموبايل لـ [[127.0.0.1:8080]] عن طريق الـ proxy، والضيف لنفس الحاجة، والموبايل لـ [[192.168.1.20:8080]] مباشرة من غير proxy. وبعدين جرّب.`, done: R`توقعت: الموبايل يوصل (الجدار سمح ليه والـ proxy مش مانع)، والضيف timeout، والمباشر [[refused]] لأن الخدمة على [[127.0.0.1]] بس. والنتيجة طابقت، وكاتب إن الجدار لوحده مش كفاية.` },
            { lvl: 'تطبيق', t: R`صلّح الأمر ده اللي بيتشغّل مع بداية كل جلسة: [[New-NetFirewallRule -DisplayName LabShare -Direction Inbound -Program "C:\Lab\labvpn.exe" -Action Allow]]. اكتب ٣ مشاكل والنسخة الصح، وأمر التراجع.`, done: R`المشاكل: بيفتح أي بورت البرنامج يفتحه، ومن أي عنوان (مفيش [[-RemoteAddress]])، ومفيش [[-Profile]] واضح، وكل جلسة بتضيف قاعدة جديدة بنفس الاسم (مفيش تشيك قبلها). والنسخة فيها [[-Protocol TCP -LocalPort 10809,10810 -RemoteAddress LocalSubnet]] وقبلها [[Get-NetFirewallRule -DisplayName LabShare -ErrorAction SilentlyContinue]]، والتراجع [[Remove-NetFirewallRule -DisplayName LabShare]].` },
            { lvl: 'تحدي', t: R`ابني في [[labtool.py]] كشف «الإعداد اتغيّر»: thread بيبص على [[mtime]] بتاع [[settings.json]] كل ثانيتين، ولو اتغيّر بعد بداية الاتصال يطبع [[settings changed at HH:MM:SS: reconnect to apply (share_lan false -> true)]] من غير ما يقفل الاتصالات القائمة.`, done: R`بعد تعديل الملف السطر بيظهر في أقل من ٣ ثواني ومعاه الإعداد اللي اتغيّر بالظبط، واتصال [[curl]] شغّال وقت التعديل كمّل لآخره، وتعديل مالوش أثر (مسافة زيادة) مبيطبعش حاجة لأنك بتقارن المحتوى مش الوقت بس.` },
            { lvl: 'تحدي', t: R`دوّر بنفسك: في وثائق [[New-NetFirewallRule]]، إيه القيم المحجوزة التانية لـ [[-RemoteAddress]] غير [[LocalSubnet]]؟ ومين فيهم ينفع للحالة دي لو الموبايل على شبكة ضيوف (Guest Wi-Fi) معزولة؟`, done: R`كاتب القيم ([[LocalSubnet]] و [[DNS]] و [[DHCP]] و [[WINS]] و [[DefaultGateway]] و [[Internet]] و [[Intranet]] و [[IntranetRemoteAccess]] و [[PlayToDevice]]) ومعاك الرابط، وكاتب إن شبكة الضيوف المعزولة مش هتسمح للموبايل يكلّم اللابتوب أصلًا مهما كانت القاعدة.` },
          ],
          ci: [
            { os: [R`windows`], sh: R`pwsh`, run: R`$l = Get-NetTCPConnection -State Listen -LocalPort 10809, 10810 -ErrorAction SilentlyContinue
if (-not $l) { 'nothing listening on 10809/10810' }
if (-not (Get-NetFirewallRule -DisplayName 'LabShare' -ErrorAction SilentlyContinue)) { 'no LabShare rule' }
(netsh advfirewall firewall show rule name=LabShare) -join ' '
@('  TCP    0.0.0.0:10809    0.0.0.0:0    LISTENING    4242', '  TCP    0.0.0.0:108090   0.0.0.0:0    LISTENING    1') | Select-String ':10809\s' | Measure-Object | ForEach-Object { "matches=$($_.Count)" }`, expect: [R`nothing listening on 10809/10810`, R`no LabShare rule`, R`No rules match the specified criteria.`, R`matches=1`] },
            { os: [R`ubuntu`], sh: R`bash`, run: R`python3 -c 'import socket; s = socket.socket(); s.bind(("127.0.0.1", 10810)); s.listen(); import time; time.sleep(4)' & sleep 1
ss -ltnH 'sport = :10810' | awk '{print "listening on", $4}'
curl -sS -m 2 -x socks5h://127.0.0.2:10810 http://example.invalid/ >/dev/null 2>&1 || echo "not reachable on 127.0.0.2"
wait`, expect: [R`listening on 127.0.0.1:10810`, R`not reachable on 127.0.0.2`] },
          ],
        },
        {
          cmd: "أيقونة الشبكة بتكدب",
          title: R`أيقونة الـ taskbar بقت شاشة سلكية بعد الـ VPN، وفي أداة تانية فضلت Wi-Fi: الأيقونة شكل مش دليل`,
          learn: R`تعرف إن الأيقونة بتتحدد من نوع الكارت اللي عليه الـ default route (TAP بيبان Ethernet، و wintun بيبان Unknown)، وإن ويندوز بيقرر «فيه إنترنت؟» لكل كارت لوحده، وتتأكد من الـ VPN بأوامر مش بالأيقونة.`,
          out: R`جدول فيه الكارت ونوعه ([[MediaType]]) والـ routes ([[0.0.0.0/0]] ولا [[0.0.0.0/1]]) والـ connectivity لكل profile، وتعرف منه الأيقونة هتبقى إيه قبل ما تبص عليها.`,
          desc: R`أداة VPN بكارت **TAP**: أيقونة الشبكة في الـ taskbar بقت **شاشة وكابل** (Ethernet) رغم إنك على Wi-Fi. وأداة بكارت **wintun**: الأيقونة فضلت Wi-Fi. الاتنين شغّالين.

السبب: TAP كارت layer 2 بيعمل نفسه كارت Ethernet حقيقي (ويندوز بيشوفه [[802.3]])، والأداة اللي معاه بتحط default [[0.0.0.0/0]] عليه، فويندوز بيعتبره الكارت الأساسي ويرسم أيقونته. و wintun كارت layer 3 (بيبان [[Unknown]] أو من غير media type عادي)، والأداة بتستخدم [[/1+/1]] بدل ما تلمس الـ default، فالـ default الأصلي (Wi-Fi) فضل موجود وأيقونته فضلت.

والمفهوم الأهم: ويندوز (NCSI) بيقرر «فيه إنترنت؟» **لكل كارت لوحده**. فممكن Store أو Teams يقولوا «أوفلاين» والمواقع شغّالة. الأيقونة شكل، مش دليل على VPN. الدليل: الـ IP الخارجي.`,
          example: R`# Windows (PowerShell): قراية بس
Get-NetConnectionProfile | Select-Object InterfaceAlias, Name, IPv4Connectivity, NetworkCategory
Get-NetAdapter | Where-Object Status -eq Up | Select-Object Name, InterfaceDescription, MediaType, ifIndex
Get-NetRoute -DestinationPrefix '0.0.0.0/1', '0.0.0.0/0' -ErrorAction SilentlyContinue | Select-Object DestinationPrefix, InterfaceAlias, NextHop, RouteMetric
curl.exe -4 -s -m 10 https://api.ipify.org
# Linux (and WSL): الفرق بين TUN و TAP في المعمل
ip -d link show vpnlab0 | grep -o 'tun type [a-z]*'
ip link show taplab0 | grep link/`,
          lines: [
            R`ويندوز بيشوف إيه لكل شبكة: [[IPv4Connectivity]] ([[Internet]] أو [[LocalNetwork]] أو [[NoTraffic]]) ده حكم NCSI لكل كارت لوحده، و [[NetworkCategory]] Public/Private.`,
            R`الكروت الشغّالة ونوعها: [[MediaType]] [[802.3]] = Ethernet (وده اللي كارت TAP بيعمل نفسه)، و [[Native 802.11]] = Wi-Fi. والأيقونة بتتبع نوع الكارت اللي ويندوز شايفه الأساسي.`,
            R`مين ماسك الـ default؟ [[0.0.0.0/0]] الـ default العادي، و [[0.0.0.0/1]] نص الـ VPN. [[-ErrorAction SilentlyContinue]] عشان لو مفيش [[/1]] ميطلعش خطأ أحمر. لو الـ VPN عامل [[/0]] على كارته بـ metric أقل، هو اللي هيبان أساسي.`,
            R`الدليل الحقيقي: الـ IP اللي العالم شايفه. [[-4]] IPv4 بس، و [[-m 10]] أقصى ١٠ ثواني. لو طلع IP السيرفر، الترافيك من النفق مهما كانت الأيقونة.`,
            R`في المعمل: [[ip -d link]] (تفاصيل) بيكتب [[tun type tun]] أو [[tun type tap]].`,
            R`كارت TAP عنده [[link/ether]] و MAC زي أي كارت Ethernet، وكارت TUN [[link/none]]: مفيش layer 2 أصلًا.`,
          ],
          try: R`على جهازك شغّل أول ٣ أوامر (قراية بس) واكتب: الأيقونة المفروض تبقى إيه، وبعدين بص عليها. ولو عندك VPN شغّله وكرّر. وفي كونتينر [[--privileged]] اعمل كارت tun وكارت tap وقارن [[ip link show]].`,
          teach: R`## العَرَض

| الأداة | نوع الكارت | الأيقونة بعد الاتصال |
|---|---|---|
| (أ) OpenVPN قديم بكارت TAP | TAP-Windows | شاشة وكابل (Ethernet) |
| (ب) أداة بـ wintun | Wintun | Wi-Fi زي ما هي |

الاتنين بيعدّوا الترافيك من النفق. الفرق شكل بس، بس بيخلي ناس تفتكر «(ب) مش شغّال» أو «(أ) غيّر الشبكة».

---

## TUN و TAP في سطرين (درس [[tun]])

~~~text ip link show (المعمل، كونتينر --privileged)
3: vpnlab0: <NO-CARRIER,POINTOPOINT,MULTICAST,NOARP,UP> mtu 1500 qdisc pfifo_fast state DOWN mode DEFAULT group default qlen 500
    link/none
4: taplab0: <BROADCAST,MULTICAST> mtu 1500 qdisc noop state DOWN mode DEFAULT group default qlen 1000
    link/ether 92:d6:1d:e9:7b:58 brd ff:ff:ff:ff:ff:ff
~~~

~~~bash
ip tuntap add dev taplab0 mode tap
ip -d link show vpnlab0 | grep -o 'tun type [a-z]*'
ip -d link show taplab0 | grep -o 'tun type [a-z]*'
ip tuntap del dev taplab0 mode tap
~~~

~~~text الناتج
tun type tun
tun type tap
~~~

- **TAP**: [[link/ether]] و MAC و [[BROADCAST]]. كارت Ethernet كامل في نظر النظام، فويندوز بيعرضه [[802.3]] وأيقونته شاشة وكابل.
- **TUN**: [[link/none]] و [[POINTOPOINT]] و [[NOARP]]. مفيش layer 2. ويندوز بيعرض wintun بنوع مش Ethernet ومش Wi-Fi.

---

## ويندوز بيختار الأيقونة إزاي؟

مش بيقرا إعداد في الأداة. بيبص على **الكارت اللي بيعتبره الأساسي للإنترنت**، وده عمليًا الكارت اللي عليه الـ default route الكسبان، ومعاه حكم NCSI ([[IPv4Connectivity = Internet]]).

~~~text Get-NetRoute -DestinationPrefix '0.0.0.0/1','0.0.0.0/0' (ويندوز ١١ من غير VPN)
DestinationPrefix InterfaceAlias NextHop     RouteMetric
----------------- -------------- -------     -----------
0.0.0.0/0         Wi-Fi          192.168.1.1           0
~~~

~~~text Get-NetRoute -DestinationPrefix '0.0.0.0/1' (من غير VPN)
Get-NetRoute: No MSFT_NetRoute objects found with property 'DestinationPrefix' equal to '0.0.0.0/1'.  Verify the value of the property and retry.
~~~

| الأداة | الـ routes | ويندوز بيقول |
|---|---|---|
| TAP + [[0.0.0.0/0]] على كارتها بـ metric أقل | default جديد على كارت [[802.3]] | الأساسي Ethernet ← أيقونة سلكية |
| wintun + [[0.0.0.0/1]] و [[128.0.0.0/1]] | الـ default الأصلي فاضل على الـ Wi-Fi، والـ [[/1]] بيكسب في التوجيه بس (longest prefix) | الأساسي لسه Wi-Fi ← الأيقونة زي ما هي |

الحيلة دي ([[/1+/1]]) اتشرحت في درس [[routing]]: بتمسك كل الترافيك من غير ما تمسح الـ default، فلو الأداة وقعت الـ default الأصلي لسه موجود.

---

## NCSI: «فيه إنترنت؟» لكل كارت لوحده

~~~text Get-NetConnectionProfile | Select-Object InterfaceAlias, Name, IPv4Connectivity, NetworkCategory
InterfaceAlias Name      IPv4Connectivity NetworkCategory
-------------- ----      ---------------- ---------------
Wi-Fi          HomeWiFi          Internet          Public
~~~

ويندوز بيعمل اختبار صغير (طلب HTTP لسيرفر معروف عند Microsoft وسؤال DNS) **على كل كارت**، ويحط النتيجة في [[IPv4Connectivity]]. ولما VPN يتوصل:

- ممكن كارت النفق يطلع [[LocalNetwork]] أو [[NoTraffic]] (الاختبار ماعدّاش منه بالشكل اللي ويندوز مستنيه).
- البرامج اللي بتسأل ويندوز «فيه نت؟» قبل ما تجرّب (Store، وبعض نسخ Teams و OneDrive) تقول «أوفلاين».
- والمتصفح شغّال عادي، لأنه بيجرّب على طول.

يعني «أيقونة فيها علامة» أو «Teams بيقول مفيش نت» مش دليل إن النفق واقع، و «أيقونة نضيفة» مش دليل إنه شغّال.

---

## الدليل الحقيقي

~~~powershell
curl.exe -4 -s -m 10 https://api.ipify.org
curl.exe -6 -s -m 5 https://api6.ipify.org
~~~

الأول لازم يطبع IP السيرفر. والتاني لازم يطبع IPv6 السيرفر أو **ولا حاجة** (مفيش IPv6 خالص)، مش IPv6 بتاع مزوّد النت (ده تسريب: درس [[leak_protection]] و [[ipv6]]).

## لو عايز تعدّل الأيقونة؟

متعدّلهاش. اللي يهم المستخدم سطر في الأداة نفسها: «متصل، الـ IP الخارجي 203.0.113.9». ولو برامج بتقول أوفلاين غلط، ده سلوك NCSI (فيه إعدادات Group Policy ليه في وثائق Microsoft، بس اللعب فيها بيأثر على الجهاز كله، فمش بنلمسها).`,
          deep: {
            why: R`ويندوز محتاج يعرض حالة واحدة في الـ taskbar رغم إن فيه كروت كتير. فبيختار الكارت اللي شايفه الأساسي للإنترنت ويرسم نوعه. والـ VPN اللي بيحط default [[/0]] على كارت شكله Ethernet بيبقى هو الأساسي. والـ [[/1+/1]] اتعملت أصلًا عشان متلمسش الـ default (لو الأداة ماتت، الـ default الأصلي لسه موجود)، وده بيسيب الأيقونة زي ما هي كأثر جانبي.`,
            how: R`TAP-Windows درايفر NDIS بيعلن نفسه miniport من نوع 802.3، فـ [[MediaType]] بيبقى [[802.3]] والأيقونة سلكية. و wintun درايفر layer 3 بيعلن نوع مختلف. و NCSI (Network Connectivity Status Indicator) بيعمل probe لكل كارت (HTTP لملف معروف و DNS لاسم معروف) ويحط [[IPv4Connectivity]] و [[IPv6Connectivity]] لكل profile. والبرامج بتسأل [[INetworkListManager]] أو [[NetworkInformation.GetInternetConnectionProfile()]] فبتاخد حكم NCSI مش نتيجة اتصال حقيقي.`,
            when: R`لما حد يقول «الـ VPN مش شغّال الأيقونة زي ما هي» أو «الـ VPN غيّر شبكتي لسلكي»، أو برنامج بيقول أوفلاين والمتصفح شغّال. وكل مرة بتكتب أداة بتعرض حالة اتصال: اعرض نتيجة اختبار حقيقي مش أيقونة النظام.`,
            mistakes: R`تحكم على الـ VPN من الأيقونة. وتحاول «تصلّح» الأيقونة بإنك تحط [[/0]] على كارت النفق فتخسر ميزة الـ [[/1+/1]] (لو الأداة وقعت النت يقف كله لحد ما الـ route يتمسح). وتصدّق Teams لما يقول أوفلاين وتفصل الـ VPN. وتختبر IPv4 بس فتفوّتك تسريب IPv6.`
          },
          sol: R`المعمل (كونتينر [[ubuntu:24.04]] بـ [[--privileged]]): [[vpnlab0]] طلع [[link/none]] و [[POINTOPOINT,MULTICAST,NOARP]] و [[tun type tun]]، و [[taplab0]] طلع [[link/ether]] و MAC و [[BROADCAST,MULTICAST]] و [[tun type tap]].

على ويندوز 11 (قراية بس): [[Get-NetRoute]] لـ [[0.0.0.0/0]] طلع الـ Wi-Fi بـ [[NextHop 192.168.1.1]]، و [[0.0.0.0/1]] طلّع [[No MSFT_NetRoute objects found]] (مفيش VPN)، و [[Get-NetAdapter]] بيكتب [[Native 802.11]] للـ Wi-Fi و [[802.3]] لكارت Hyper-V الوهمي، و [[Get-NetConnectionProfile]] [[IPv4Connectivity Internet]]. اسم الشبكة اتغيّر لاسم مخترع. سلوك أيقونة TAP و wintun من الحالة الأصلية، و NCSI من وثائق Microsoft.`,
          practice: [
            { lvl: 'سريع', t: R`من غير ما تبص: ليه أداة TAP بتخلّي الأيقونة سلكية وأداة wintun لأ؟ اكتب السببين (نوع الكارت، والـ route).`, done: R`TAP بيبان [[802.3]] Ethernet والأداة بتحط [[0.0.0.0/0]] عليه فبيبقى الأساسي، و wintun مش Ethernet والأداة بتستخدم [[/1+/1]] فالـ default الأصلي على الـ Wi-Fi فاضل.` },
            { lvl: 'تطبيق', t: R`اقرا وتوقّع: جهاز فيه الـ routes دي: [[0.0.0.0/0 Wi-Fi metric 25]] و [[0.0.0.0/1 vpnlab0 metric 5]] و [[128.0.0.0/1 vpnlab0 metric 5]]. الباكت لـ [[8.8.8.8]] هتخرج منين؟ ولـ [[203.0.113.9]] لو فيه [[203.0.113.9/32 Wi-Fi]]؟ والأيقونة؟`, done: R`[[8.8.8.8]] من [[vpnlab0]] (الـ [[/1]] أطول من [[/0]] والـ metric مالوش دعوة)، و [[203.0.113.9]] من الـ Wi-Fi ([[/32]] الأطول)، والأيقونة Wi-Fi لأن الـ default [[/0]] على الـ Wi-Fi.` },
            { lvl: 'تطبيق', t: R`ابني سطر واحد في PowerShell بيطبع حكم واحد: [[VPN: yes (exit 203.0.113.9 via vpnlab0)]] أو [[VPN: no]]، من [[curl.exe -4 -s https://api.ipify.org]] و [[Find-NetRoute -RemoteIPAddress 1.1.1.1]] (اسم الكارت اللي هيخرج منه).`, done: R`السطر بيشتغل من غير VPN ويطبع [[VPN: no]] واسم كارت الـ Wi-Fi، ومش بيعتمد على [[Get-NetConnectionProfile]] ولا على الأيقونة، و [[Find-NetRoute]] بيرجّع object واحد للـ route ومعاه [[InterfaceAlias]].` },
            { lvl: 'تحدي', t: R`دوّر بنفسك: في وثائق Microsoft عن NCSI، إيه الـ URL اللي ويندوز بيطلبه عشان يحكم «فيه إنترنت»، وإيه اللي بيتوقّع يلاقيه؟ وليه ده ممكن يفشل من نفق والمتصفح شغّال؟`, done: R`كاتب الـ URL (ملف [[connecttest.txt]] على دومين [[msftconnecttest.com]]) والنص المتوقّع، والسبب (الـ probe بيتبعت على كارت معين أو الـ DNS بتاعه بيرد غلط من النفق)، ومعاك رابط الصفحة.` },
            { lvl: 'تحدي', t: R`اشرحها في ٣ سطور لحد قالك «الـ VPN مش شغّال، الأيقونة زي ما هي»: إزاي يتأكد بنفسه في ١٠ ثواني.`, done: R`فيه: الأيقونة بتتبع الكارت الأساسي مش النفق، و [[curl.exe -4 -s https://api.ipify.org]] لازم يطلع IP السيرفر، و [[curl.exe -6]] لازم يطلع السيرفر أو ولا حاجة.` },
          ],
          ci: [
            { os: [R`windows`], sh: R`pwsh`, run: R`$half = Get-NetRoute -DestinationPrefix '0.0.0.0/1' -ErrorAction SilentlyContinue
if (-not $half) { 'no /1 routes: no full-tunnel VPN here' }
try { Get-NetRoute -DestinationPrefix '0.0.0.0/1' -ErrorAction Stop } catch { $_.Exception.Message.Split('.')[0] }
(Get-Command Get-NetConnectionProfile).Source`, expect: [R`no /1 routes: no full-tunnel VPN here`, R`No MSFT_NetRoute objects found with property 'DestinationPrefix' equal to '0`, R`NetConnection`] },
          ],
        },
        {
          cmd: "SNI واسم الشهادة",
          title: R`عميل بيتصل وعميل تاني بيفشل على نفس السيرفر: الـ SNI اسم، واسم الشهادة اسم تاني`,
          learn: R`تفرّق بين الاسم اللي العميل بيبعته في الـ SNI والاسم اللي بيتحقق منه في الشهادة، وتشوف الاتنين بـ [[openssl s_client]] و [[-verify_hostname]]، وتعرف ليه قفل التحقق ([[allowInsecure]]) غلط، وتتأكد من ملف الإعداد قبل التشغيل.`,
          out: R`[[Verify return code: 0 (ok)]] لما التحقق على اسم الشهادة الصح، و [[62 (hostname mismatch)]] لما على اسم تاني، والإعداد بيعدّي [[xray run -test]].`,
          desc: R`عميلين على نفس السيرفر ونفس الإعداد (ظاهريًا): واحد بيتصل، والتاني بيفشل في الـ TLS handshake. الإعداد فيه [[serverName]] (الـ SNI) باسم، والشهادة على السيرفر لاسم تاني. العميل الأول عنده خيار يتحقق من الشهادة **باسم تاني غير الـ SNI** (في Xray: [[verifyPeerCertByName]])، والتاني بيتحقق **قصاد الـ SNI نفسه** فبيلاقي الاسم مش في الشهادة ويرفض.

الحل الغلط: [[allowInsecure: true]] (اقفل التحقق). البيانات جوه (VMess مثلًا) تفضل مشفّرة، بس طبقة TLS اللي برّه بقت تقبل أي شهادة، يعني أي حد في النص يقدر يعمل نفسه السيرفر. والطريف إن Xray الجديد شاله أصلًا ورسالته بتقولك استخدم إيه بداله. الحل الأنضف: تعدّي الإعداد الكامل للعميل التاني **كملف JSON** فيه اسم التحقق، بدل رابط مختصر بيضيّع الحقل ده. وتتأكد من الملف بـ [[xray run -test -config]] قبل ما تشغّله.

وأمان: الملف فيه UUID (ده الباسورد)، فمتحطوش على Desktop لو Desktop متزامن مع OneDrive. [[[Environment]::GetFolderPath('Desktop')]] بيوريك المسار الحقيقي.`,
          example: R`openssl s_client -connect 203.0.113.9:443 -servername other.example </dev/null 2>/dev/null | openssl x509 -noout -subject -ext subjectAltName
openssl s_client -connect 203.0.113.9:443 -servername other.example -CAfile ca.pem -verify_hostname other.example </dev/null 2>&1 | grep "Verify return code"
openssl s_client -connect 203.0.113.9:443 -servername other.example -CAfile ca.pem -verify_hostname cdn.example </dev/null 2>&1 | grep "Verify return code"
curl -sS --cacert ca.pem --resolve other.example:443:203.0.113.9 https://other.example/ -o /dev/null
xray run -test -config cfg.json
# Windows (PowerShell):
[Environment]::GetFolderPath('Desktop')`,
          lines: [
            R`السيرفر بيقدّم أنهي شهادة؟ [[s_client]] عميل TLS للتجربة، و [[-servername]] الـ SNI اللي هيتبعت، و [[</dev/null]] يقفل بعد الـ handshake على طول. والناتج يتبعت لـ [[openssl x509]] يطبع [[subject]] و [[subjectAltName]] (الأسامي اللي الشهادة صالحة ليها فعلًا).`,
            R`نفس الـ SNI، والتحقق **على نفس الاسم** ([[-verify_hostname other.example]]) ومعاه الـ CA اللي يثق فيها ([[-CAfile]]). ده اللي العميل التاني بيعمله، والنتيجة [[62 (hostname mismatch)]].`,
            R`نفس الـ SNI بالظبط، بس التحقق على **اسم الشهادة** ([[cdn.example]]). ده اللي العميل الأول بيعمله بـ [[verifyPeerCertByName]]، والنتيجة [[0 (ok)]].`,
            R`curl بيعمل SNI والتحقق بنفس الاسم دايمًا (اسم الـ URL)، و [[--resolve]] يوديه للـ IP من غير DNS. بيفشل بـ [[(60) SSL: no alternative certificate subject name matches target host name]].`,
            R`[[-test]] بيقرا الملف ويبني الإعداد ويطبع [[Configuration OK.]] أو الخطأ، من غير ما يفتح ولا اتصال.`,
            R`المسار الحقيقي لـ Desktop: لو بيبدأ بـ [[OneDrive]] يبقى أي ملف عليه بيتنسخ للسحابة.`,
          ],
          try: R`في كونتينر Ubuntu: اعمل CA وشهادة لـ [[cdn.example]] بالأوامر اللي في الشرح، وشغّل [[openssl s_server]] على [[4433]]، وجرّب [[s_client]] بـ SNI [[other.example]] مرة بـ [[-verify_hostname other.example]] ومرة بـ [[cdn.example]] ومرة من غير [[-CAfile]]. اكتب كود الـ Verify في كل مرة ومعناه.`,
          teach: R`## العَرَض

- السيرفر [[203.0.113.9:443]]، والشهادة اللي عليه لاسم [[cdn.example]].
- الإعداد على الموبايل والكمبيوتر: [[serverName: "other.example"]].
- العميل (أ) بيتصل. العميل (ب) بيفشل في الـ handshake، والسيرفر شغّال.

الفرق: (أ) فيه حقل بيقول «اتحقق من الشهادة باسم [[cdn.example]]»، و (ب) مالوش الحقل ده (أو الرابط اللي اتنقل بيه ضيّعه)، فبيتحقق قصاد الـ SNI.

---

## اسمين في كل اتصال TLS

| الاسم | بيتبعت فين | بيستخدمه مين |
|---|---|---|
| **SNI** | في الـ ClientHello، **مكشوف** (درس [[tls_sni]]) | السيرفر: يختار أنهي شهادة يقدّمها لو عنده كذا موقع |
| **اسم التحقق** | مش بيتبعت. جوه العميل بس | العميل: يتأكد إن الشهادة اللي جت فيها الاسم ده في [[subjectAltName]] |

في المتصفح و curl الاتنين **نفس الاسم** (اسم الـ URL). في أدوات زي Xray ممكن يتفصلوا. لو اتفصلوا والعميل التاني مش عارف، بيتحقق بالاسم الغلط.

---

## المعمل: CA وشهادة و [[s_server]]

كونتينر [[ubuntu:24.04]] و OpenSSL 3.0.13:

~~~bash
openssl req -x509 -newkey rsa:2048 -nodes -keyout ca.key -out ca.pem -days 30 -subj "/CN=Lab Root CA"
openssl req -newkey rsa:2048 -nodes -keyout srv.key -out srv.csr -subj "/CN=cdn.example"
printf "subjectAltName=DNS:cdn.example\n" > ext.cnf
openssl x509 -req -in srv.csr -CA ca.pem -CAkey ca.key -CAcreateserial -out srv.pem -days 30 -extfile ext.cnf
openssl s_server -accept 4433 -cert srv.pem -key srv.key -www -quiet &
~~~

| السطر | بيعمل إيه |
|---|---|
| [[req -x509 ... -subj "/CN=Lab Root CA"]] | CA بتاعتك: مفتاح وشهادة موقّعة من نفسها، دي اللي العميل «يثق» فيها |
| [[req -newkey ... -subj "/CN=cdn.example"]] | مفتاح السيرفر وطلب شهادة (CSR) باسم [[cdn.example]] |
| [[subjectAltName=DNS:cdn.example]] | الأسامي اللي الشهادة صالحة ليها. العملاء الحديثين بيبصوا هنا مش في [[CN]] |
| [[x509 -req ... -CA ca.pem]] | الـ CA توقّع الطلب فتطلع [[srv.pem]] |
| [[s_server -accept 4433 -www]] | سيرفر TLS للتجربة على 4433، بيرد بصفحة حالة |

(في الأوامر تحت [[127.0.0.1:4433]] مكان [[203.0.113.9:443]].)

---

## ١. السيرفر بيقدّم إيه؟

~~~text openssl s_client -connect 127.0.0.1:4433 -servername other.example </dev/null 2>/dev/null | openssl x509 -noout -subject -ext subjectAltName
subject=CN = cdn.example
X509v3 Subject Alternative Name:
    DNS:cdn.example
~~~

الـ SNI كان [[other.example]] والسيرفر قدّم شهادة [[cdn.example]] (عنده شهادة واحدة، فبيقدّمها لأي SNI).

## ٢. التحقق على الـ SNI = العميل (ب)

~~~text -verify_hostname other.example
verify error:num=62:hostname mismatch
Verify return code: 62 (hostname mismatch)
~~~

## ٣. التحقق على اسم الشهادة = العميل (أ)

~~~text -verify_hostname cdn.example
Verify return code: 0 (ok)
~~~

نفس الاتصال بالظبط، ونفس الـ SNI. الفرق الوحيد الاسم اللي بنقارن بيه.

## ٤. ومن غير CA؟

~~~text openssl s_client -connect 127.0.0.1:4433 -servername cdn.example
Verify return code: 21 (unable to verify the first certificate)
~~~

الاسم صح، بس العميل مش واثق في الـ CA. ده تالت سبب للفشل، ولازم تفرّق بينه وبين [[62]].

## ٥. curl: الاسمين واحد دايمًا

~~~text الناتج
$ curl -sS --cacert ca.pem --resolve other.example:4433:127.0.0.1 https://other.example:4433/ -o /dev/null
curl: (60) SSL: no alternative certificate subject name matches target host name 'other.example'
$ curl -sS --cacert ca.pem --resolve cdn.example:4433:127.0.0.1 https://cdn.example:4433/ -o /dev/null -w "%{http_code}\n"
200
$ curl -sS -k --resolve other.example:4433:127.0.0.1 https://other.example:4433/ -o /dev/null -w "%{http_code} (insecure)\n"
200 (insecure)
~~~

[[-k]] (insecure) نجح. وده بالظبط [[allowInsecure]]: «نجح» لأنه بطّل يسأل.

---

## ليه [[allowInsecure]] غلط

البروتوكول اللي جوه (VMess مثلًا) بيفضل مشفّر بالـ UUID، صح. بس:

- طبقة TLS اللي برّه بقت تقبل **أي** شهادة، فأي حد في النص (واي فاي عام، أو جهاز في الشبكة) يقدر يقف مكان السيرفر ويستقبل الاتصال.
- الحماية اللي فاضلة كلها على البروتوكول الداخلي، وده مش اللي اتصمم يحميك من الوسيط.
- وبيبقى عادة: «مش شغّال؟ insecure». وبعد شوية مبقاش فيه تحقق في أي حتة.

والطريف إن Xray الحديث شاله خالص. جرّبناه:

~~~text xray run -test -config cfg.json (Xray 26.10.31، فيه "allowInsecure": true)
Failed to start: main: failed to load config files: [/cfg/cfg.json] > infra/conf: failed to build outbound config with tag  > infra/conf: failed to build stream settings for outbound detour > infra/conf: Failed to build TLS config. > common/errors: The feature "allowInsecure" has been removed and migrated to "pinnedPeerCertSha256"(pcs) and "verifyPeerCertByName"(vcn). Please update your config(s) according to release note and documentation.
~~~

يعني البدايل الرسمية: [[verifyPeerCertByName]] (اتحقق باسم معيّن) أو [[pinnedPeerCertSha256]] (اتحقق بالبصمة بتاعة شهادة بعينها).

---

## الحل: ملف الإعداد الكامل، ومتأكد منه

الروابط المختصرة ([[vmess://]] و [[vless://]]) فيها حقول محدودة، والحقل اللي بيفصل اسم التحقق عن الـ SNI ممكن يضيع فيها. فبتدّي العميل التاني **ملف JSON كامل**:

~~~json cfg.json
{
  "inbounds": [{ "port": 10808, "listen": "127.0.0.1", "protocol": "socks", "settings": { "udp": true } }],
  "outbounds": [{
    "protocol": "vmess",
    "settings": { "vnext": [{ "address": "203.0.113.9", "port": 443,
      "users": [{ "id": "00000000-0000-4000-8000-000000000000" }] }] },
    "streamSettings": { "network": "tcp", "security": "tls",
      "tlsSettings": { "serverName": "other.example", "verifyPeerCertByName": "cdn.example" } }
  }]
}
~~~

واتأكد منه قبل ما تشغّله:

~~~text xray run -test -config cfg.json
Configuration OK.
~~~

وغلطة كانت حصلت فعلًا: [[port]] اتكتب نص:

~~~text "port": "443"
Failed to start: main: failed to load config files: [/cfg/cfg.json] > infra/conf: failed to build outbound config with tag  > infra/conf: failed to load outbound detour config for protocol vmess > json: cannot unmarshal string into Go struct field VMessOutboundConfig.vnext.0.port of type uint16
~~~

اقرا الرسالة من الآخر: [[cannot unmarshal string]] (لقى نص)، [[vnext.0.port]] (المكان بالظبط: أول عنصر في [[vnext]]، حقل [[port]])، [[of type uint16]] (كان مستني رقم).

> **فخ [[-test]]:** بيتأكد من الأنواع مش من أسماء الحقول. كتبنا [[verifyPeerCertByNmae]] (حرفين متبدلين) وطلع [[Configuration OK.]]، لأن الحقل اللي اسمه غلط بيتجاهل. فبعد [[-test]] اعمل اتصال حقيقي، واعمل [[grep]] على اسم الحقل في الملف قصاد الوثائق.

---

## الأمان: الملف فيه سرّ

[[users[0].id]] (الـ UUID) هو الباسورد. أي حد معاه الملف يقدر يستخدم السيرفر.

~~~text [Environment]::GetFolderPath('Desktop') (ويندوز ١١)
C:\Users\you\OneDrive\Desktop
~~~

لو المسار فيه [[OneDrive]]، الـ Desktop **متزامن مع السحابة**: الملف اتنسخ برّه الجهاز أول ما حطيته. حطه في فولدر مش متزامن (مثلًا [[$env:LOCALAPPDATA\LabVPN]])، وابعته للجهاز التاني بطريقة مشفّرة مش شات عام. ولو اتسرّب: غيّر الـ UUID على السيرفر.

---

## البدايل اللي اترفضت

| البديل | ليه لأ |
|---|---|
| [[allowInsecure: true]] | بيقفل التحقق خالص، وشيل من Xray الحديث أصلًا |
| تخلي SNI = اسم الشهادة | الحل الأبسط لو ينفع، بس لو السيرفر عليه كذا اسم والإعداد متعمل كده لسبب، تغييره بيكسر العميل الأول |
| تنقل الإعداد كرابط مختصر | الحقل اللي بيفصل الاسمين بيضيع |
| شهادة لكل الأسامي | صح على السيرفر لو بتاعك، بس ده تغيير على السيرفر مش على العميل |`,
          deep: {
            why: R`الـ SNI موجود عشان سيرفر واحد يقدّم شهادات لكذا موقع، والتحقق موجود عشان تتأكد إنك بتكلّم صاحب الاسم. الاتنين بيتقابلوا في المتصفح لأن الاسم واحد. لما أداة تفصلهم، أي عميل مش فاهم الفصل هيرجع للسلوك الطبيعي (يتحقق بالـ SNI) ويفشل، والفشل ده **صح**: هو بالظبط اللي يحميك لو حد في النص.`,
            how: R`العميل بيبعت ClientHello فيه [[server_name]] (الـ SNI) مكشوف. السيرفر بيختار شهادة ويبعتها مع السلسلة. العميل بيتحقق: (١) السلسلة توصل لـ CA هو واثق فيها ([[21]] لو لأ)، (٢) الاسم اللي العميل مستنيه موجود في [[subjectAltName]] ([[62]] لو لأ)، (٣) الشهادة في مدتها. [[-verify_hostname]] في openssl بيحدد الاسم في (٢) بشكل مستقل عن [[-servername]]. و Go (اللي Xray مكتوب بيه) بيعمل نفس الحكاية بـ [[tls.Config.ServerName]] للاتنين، و Xray بيضيف حقل يغيّر اسم (٢) بس. و [[json.Unmarshal]] في Go بيتجاهل الحقول اللي مش معروفة، فـ [[-test]] مبيمسكش اسم حقل غلط.`,
            when: R`لما عميل بيتصل وعميل تاني لأ على نفس السيرفر، أو [[hostname mismatch]] بعد ما نقلت إعداد من جهاز لجهاز، أو قبل ما تشارك إعداد مع حد. ونفس الفحص ([[s_client]] و [[x509 -ext subjectAltName]]) لما موقع بيقول «شهادة غلط» بعد ما نقلته لسيرفر جديد (درس «شهادة SSL» في تاب diag).`,
            mistakes: R`تقفل التحقق عشان «يشتغل». وتقرا [[CN]] بس وتنسى [[subjectAltName]]. وتخلط [[21]] (مش واثق في الـ CA) بـ [[62]] (الاسم غلط). وتصدّق [[Configuration OK.]] وانت كاتب اسم حقل غلط. وتكتب [[port]] نص. وتحط الملف على Desktop متزامن، أو تبعته في شات. وتنسى تغيّر الـ UUID بعد ما الملف يتسرّب.`
          },
          sol: R`المعمل (كونتينر [[ubuntu:24.04]] و OpenSSL 3.0.13 و curl 8.5.0): الشهادة [[subject=CN = cdn.example]] و [[DNS:cdn.example]]. [[-verify_hostname other.example]]: [[verify error:num=62:hostname mismatch]] و [[Verify return code: 62 (hostname mismatch)]]. [[-verify_hostname cdn.example]]: [[Verify return code: 0 (ok)]]. من غير [[-CAfile]]: [[21 (unable to verify the first certificate)]]. curl: [[(60) SSL: no alternative certificate subject name matches target host name 'other.example']]، و [[200]] مع [[cdn.example]]، و [[200 (insecure)]] مع [[-k]].

Xray 26.10.31 (image [[teddysun/xray]] اتشالت بعد التجربة): [[port]] نص طلّع [[cannot unmarshal string into Go struct field VMessOutboundConfig.vnext.0.port of type uint16]]، و [[verifyPeerCertByName]] طلّع [[Configuration OK.]]، و [[allowInsecure]] طلّع [[The feature "allowInsecure" has been removed]]، والحقل المكتوب غلط [[verifyPeerCertByNmae]] طلّع [[Configuration OK.]] برضه. مسار Desktop على ويندوز اتعرض بيوزر مخترع.`,
          practice: [
            { lvl: 'سريع', t: R`من غير ما تبص: الفرق بين [[Verify return code: 21]] و [[62]]؟ وكل واحد بيتصلّح فين (العميل ولا السيرفر)؟`, done: R`[[21]] العميل مش واثق في الـ CA (ضيف الـ CA للعميل أو السيرفر يبعت السلسلة كاملة)، و [[62]] الاسم اللي بتتحقق بيه مش في الشهادة (اتحقق بالاسم الصح أو السيرفر يجيب شهادة فيها الاسم).` },
            { lvl: 'تطبيق', t: R`اقرا وتوقّع: شهادة [[subjectAltName=DNS:cdn.example,DNS:*.cdn.example]]. توقّع كود Verify لـ [[-verify_hostname]] بـ: [[cdn.example]] و [[img.cdn.example]] و [[a.b.cdn.example]] و [[other.example]]. وبعدين اعمل الشهادة وجرّب.`, done: R`توقعت [[0]] و [[0]] و [[62]] (الـ wildcard بيغطي مستوى واحد بس) و [[62]]، والنتيجة طابقت.` },
            { lvl: 'تطبيق', t: R`صلّح الملف ده لحد ما [[xray run -test]] يقول OK ويكون آمن: فيه [["port": "443"]] و [["allowInsecure": true]] و [["verifyPeerCertByNmae": "cdn.example"]]. واكتب إزاي اتأكدت إن الحقل التالت اتقري فعلًا.`, done: R`[[port]] رقم، و [[allowInsecure]] اتشال، والاسم [[verifyPeerCertByName]] مكتوب صح، و [[-test]] قال OK، واتأكدت بـ [[grep -c verifyPeerCertByName cfg.json]] قصاد الوثائق وبإن الاتصال الحقيقي نجح وقت ما الاسم صح وفشل لما غيّرته لاسم غلط.` },
            { lvl: 'تطبيق', t: R`بيانات حقيقية: اعمل ٣ شهادات في المعمل (لـ [[cdn.example]] و [[api.example]] و [[old.example]] واحدة منهم منتهية بـ [[-days 0]] أو تاريخ قديم)، واكتب سكربت بياخد [[host:port sni name]] ويطبع سطر: الـ subject، والـ SANs، وكود الـ Verify ومعناه بكلمتين، وفاضل كام يوم.`, done: R`السكربت طلّع ٣ سطور صح، والمنتهية كودها [[10 (certificate has expired)]]، والاسم الغلط [[62]]، وبيشتغل على أي سيرفر TLS (جرّبته على [[example.com:443]] كمان).` },
            { lvl: 'تحدي', t: R`دوّر بنفسك: في وثائق Xray، [[pinnedPeerCertSha256]] بياخد إيه بالظبط؟ وطلّع القيمة دي لشهادة المعمل بـ [[openssl x509 -fingerprint -sha256]]. وإمتى تختاره بدل [[verifyPeerCertByName]]؟`, done: R`عندك البصمة من [[openssl]] بالشكل اللي Xray مستنيه (hex)، وكاتب إن الـ pinning بيثق في شهادة واحدة بعينها (لازم يتغيّر مع كل تجديد)، والتحقق بالاسم بيثق في أي شهادة سليمة من CA موثوقة للاسم ده.` },
            { lvl: 'تحدي', t: R`اشرحها لزميل في ٤ سطور: ليه [[curl -k]] «حل» المشكلة في المعمل، وليه ده نفس [[allowInsecure]]، وإيه اللي بيضيع بالظبط.`, done: R`فيه: [[-k]] بيبطّل يسأل عن الاسم والـ CA، فأي سيرفر في النص بيتقبل، والتشفير لوحده من غير تحقق مبيقولكش انت بتكلّم مين.` },
          ],
          ci: [
            { os: [R`ubuntu`], sh: R`bash`, run: R`openssl req -x509 -newkey rsa:2048 -nodes -keyout ca.key -out ca.pem -days 30 -subj "/CN=Lab Root CA" 2>/dev/null
openssl req -newkey rsa:2048 -nodes -keyout srv.key -out srv.csr -subj "/CN=cdn.example" 2>/dev/null
printf "subjectAltName=DNS:cdn.example\n" > ext.cnf
openssl x509 -req -in srv.csr -CA ca.pem -CAkey ca.key -CAcreateserial -out srv.pem -days 30 -extfile ext.cnf 2>/dev/null
openssl s_server -accept 14433 -cert srv.pem -key srv.key -www -quiet >/dev/null 2>&1 & S=$!
sleep 1
openssl s_client -connect 127.0.0.1:14433 -servername other.example -CAfile ca.pem -verify_hostname other.example </dev/null 2>&1 | grep "Verify return code"
openssl s_client -connect 127.0.0.1:14433 -servername other.example -CAfile ca.pem -verify_hostname cdn.example </dev/null 2>&1 | grep "Verify return code"
curl -sS --cacert ca.pem --resolve other.example:14433:127.0.0.1 https://other.example:14433/ -o /dev/null 2>&1 | head -1
kill $S`, expect: [R`Verify return code: 62 (hostname mismatch)`, R`Verify return code: 0 (ok)`, R`no alternative certificate subject name matches target host`] },
            { os: [R`windows`], sh: R`pwsh`, run: R`$d = [Environment]::GetFolderPath('Desktop')
if ($d -like '*OneDrive*') { 'desktop is synced to OneDrive' } else { 'desktop is local' }
[Environment]::GetFolderPath('LocalApplicationData') -like '*AppData\Local'`, expect: [R`desktop is`, R`True`] },
          ],
        },
      ],
    }
]);
