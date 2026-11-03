// تكملة تاب diag: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/diag/01.js (شرح حقول الدرس في أوله)
MORE("diag", [
    {
      t: "قضايا ويندوز والشبكة",
      l: 3,
      time: R`حوالي ٥ ساعات (كل قضية ساعة بالمعمل)`,
      goal: [
        R`تفرّق بين «اشتغلت مرة» و «شغّالة»: الكاش ممكن يخبّي ديدلوك، والفحص ممكن يختبر طريق غير اللي الترافيك ماشي فيه.`,
        R`تكتشف ديدلوك DNS (النفق محتاج يحل اسم السيرفر عن طريق النفق نفسه) وتصلّحه بترتيب الخطوات مش بملف hosts.`,
        R`تكتب فحص صحة بيختبر الطريق الحقيقي، ومبيقطعش اتصال البيانات بتعدّي فيه.`,
        R`تمنع بروسس ابن يفضل عايش بعد ما الأب يموت، و routes تفضل بعد restart، بـ ٣ طبقات (الابن يموت مع الأب، وتنظيف عند القفل، وملف تراجع).`,
        R`تمسك نسختين من نفس البرنامج شغّالين فوق بعض (بعد صحيان الجهاز) من اللوج وأحداث ويندوز، وتمنعها بـ mutex أو lock.`,
        R`تعرف ليه سقف ذاكرة أقل من الاستهلاك الحقيقي بيحوّل الرام لـ CPU، وتدوّر على مصدر الاستهلاك بدل السقف.`,
      ],
      use: {
        net: R`القضايا دي بتستخدم دروس [[routing]] و [[dns]] و [[tun]] من تاب net، ووحدة «حالات النفق على ويندوز» هناك (حلقة التضخيم، و SNI واسم الشهادة).`,
        work: R`أي برنامج بيغيّر حاجة في النظام (routes، أو جدار، أو خدمة) هيقابل نفس الأسئلة: ترتيب الخطوات، والتنظيف لو اتقفل غصب، ونسخة واحدة بس، وفحص صحة صادق.`,
        prog: R`الحلول هنا كود: ترتيب init، و Job Object أو pdeathsig، و trap، و mutex، وفحص بيقرا عدّادات. مش «إعادة تشغيل الجهاز».`,
      },
      lab: R`docker run -d --name diagcases --privileged ubuntu:24.04 sleep 7200
docker exec diagcases bash -c "apt-get update -qq && apt-get install -y -qq python3 curl iproute2 iptables dnsmasq-base dnsutils openssl procps >/dev/null"
docker exec -it diagcases bash`,
      projects: [
        { lvl: 'صغير', t: R`[[resolve-first.sh]]: حل الاسم قبل ما تلمس الجدول`, what: R`سكربت بياخد اسم سيرفر، ويحلّه (IPv4) **قبل** أي تغيير، ويرفض لو الحل فشل أو رجّع IP من [[10.255.0.0/24]] أو [[127.0.0.0/8]]، ويطبع الـ IP وسطر [[ip route add <ip>/32 via <gw>]] جاهز. من قضية «ديدلوك الـ DNS».`, done: R`على معمل الدرس بيطبع [[203.0.113.9]] والسطر صح قبل الـ routes، وبعد [[/1+/1]] والكاش فاضي بيرفض في أقل من ٥ ثواني برسالة واضحة (مش بيستنى ٢٠ ثانية)، واسم مش موجود كود خروج 2.` },
        { lvl: 'صغير', t: R`[[who-owns.ps1]]: البروسس ده ابن مين؟`, what: R`سكربت قراية بس بياخد اسم برنامج، ولكل نسخة شغّالة يطبع: الـ PID، والـ [[ParentProcessId]]، وهل الأب لسه عايش، و [[StartTime]]، و [[CommandLine]]. ويعلّم [[ORPHAN]] لو الأب مات. من قضية «عملية يتيمة و routes».`, done: R`مع معمل [[ping -t]] اللي في الدرس بيطلع [[ORPHAN]] بعد ما الأب يتقفل، ومن غيره بيطلع سطر سليم، واسم برنامج مش شغّال بيقول [[not running]] من غير خطأ أحمر.` },
        { lvl: 'متوسط', t: R`[[tunnel-check.sh]] بتقرير`, what: R`فحص النفق اللي في القضية، بس بيكتب كل جولة في لوج بالوقت، ويطلع في الآخر سطر [[tunnel checks: N, answered A, vouched by traffic V, failed F]]، ويقبل [[--expect]] و [[--if]] و [[--rounds]]، ونسخة PowerShell بتقرا [[Get-NetAdapterStatistics]].`, done: R`على المعمل: سليم = كله answered، ومع قفل سيرفر الفحص وتنزيل شغّال = vouched، ومع قطع النفق = ٣ failed وسطر [[reconnect]]، والأرقام في السطر الأخير بتطابق اللوج.` },
        { lvl: 'متوسط', t: R`[[single.ps1]]: نسخة واحدة لأي سكربت`, what: R`دالة [[Use-SingleInstance -Name <x> -DataDir <dir>]] بتعمل mutex اسمه مشتق من hash فولدر البيانات، وترجع false لو فيه نسخة تانية وتكتب رقمها في لوج، و [[Remove-SingleInstance]] في [[finally]]. من قضية «نسختين بعد الصحيان».`, done: R`تشغيل سكربتين بنفس الفولدر ورا بعض بـ ٥ ملي ثانية: واحد بس بيكمّل والتاني كود 3، وبفولدرين مختلفين الاتنين بيكمّلوا، ولو النسخة الأولى اتقفلت غصب (Stop-Process) التانية بتاخد الـ mutex (AbandonedMutex) من غير ما تعلّق.` },
        { lvl: 'كبير', t: R`[[netsession]]: جلسة شبكة بتنضّف وراها مهما حصل`, what: R`أداة (bash على لينكس بالـ namespaces، والتصميم مكتوب لويندوز) بتعمل: lock لنسخة واحدة، وحل اسم السيرفر الأول، وكل تغيير (route أو عنوان أو قاعدة جدار) يتكتب أمر تراجعه في ملف حالة **قبل** ما يتنفّذ، والابن بيموت مع الأب ([[setpriv --pdeathsig]])، و [[trap]] على EXIT و HUP و INT و TERM، وأمر [[cleanup]] بيقرا ملف الحالة ويتراجع بالعكس، وفحص صحة بيختبر الطريق الحقيقي. ولوج فيه رقم البروسس في كل سطر. بيجمع كل قضايا الوحدة.`, done: R`في المعمل: [[kill -9]] للأب ← الابن يموت والـ routes تختفي في أقل من ثانية. [[kill -HUP]] ← سطور [[undo:]] بالعكس. تشغيل نسختين ← التانية كود 3. تشغيل بعد قفل غصب ← بينضّف البقايا الأول. و [[ip route]] و [[ip netns list]] بعد كل سيناريو زي ما كانوا قبل.`, ext: R`زوّد على ويندوز: Job Object بـ [[JOB_OBJECT_LIMIT_KILL_ON_JOB_CLOSE]] و [[SetConsoleCtrlHandler]] (من الوثائق)، و routes بـ [[store=active]] بس، وتقرير تشخيص فيه سطر [[processes:]] بكل نسخة شغّالة.` },
        { lvl: 'كبير', t: R`[[mem-probe]]: الرام راحت فين؟`, what: R`أداة بتشغّل برنامج Go (أو بتتوصل ببرنامج شغّال فيه [[net/http/pprof]]) وتقيس كل ثانية: الـ heap الحي، وعدد مرات الـ GC، والـ CPU%، والشغل المنجز، مرة من غير سقف ومرة بـ [[GOMEMLIMIT]] بقيم مختلفة، وتطلع جدول بيوري النقطة اللي السقف بيبدأ يحوّل فيها الرام لـ CPU. من قضية «GOMEMLIMIT والـ CPU».`, done: R`على برنامج المعمل: الجدول بيوري إن أي سقف أقل من الـ live heap (400MB) بيضرب الـ GC في أكتر من ١٠٠ والشغل بيقع أكتر من ١٠ مرات، وسقف أعلى منه مبيغيّرش حاجة تقريبًا، والقياس بيتعاد بنفس النتيجة ±١٠٪.`, ext: R`زوّد profile للـ heap ([[go tool pprof -top]]) يطلع أكبر ٥ أماكن بتحجز، وجرّبه على برنامج فيه جدول كبير زي [[geoip.dat]] وشوف الفرق لما تحمّل الجزء اللي محتاجه بس.` },
        { lvl: 'فكرة', t: R`كتالوج «اشتغلت مرة»`, what: R`كل مرة حاجة تشتغل مرة وتقع بعدها (أو العكس)، اكتبها: الكاش اللي كان مخبّيها (DNS، أو build cache، أو session، أو browser cache)، وإزاي اتأكدت إنه الكاش (أمر يفضّيه)، وإزاي تعيد الحالة «من الصفر» في المعمل. انت اللي بتختار الشكل.`, done: R`فيه ٣ حالات على الأقل، كل واحدة فيها أمر بيفضّي الكاش وأمر بيثبت إن المشكلة رجعت بعده، وحد غيرك قدر يعيد واحدة منهم.`, ext: R`حوّلها لاختبار «cold start» بيتشغّل قبل أي release: كل الكاشات فاضية، وأول تشغيل لازم ينجح.` },
      ],
      n: R`خمس قضايا من أداة VPN على ويندوز، كل واحدة: العَرَض، والفحوصات بالترتيب وليه، والسبب بدليل، والحل، والبدايل اللي اترفضت، والتأكيد، والمنع. اتعادت في كونتينر [[--privileged]] بـ network namespaces، وأوامر ويندوز اللي بتقرا بس اتشغّلت فعلًا، واللي بتغيّر شبكة ويندوز مكتوبة من وثائق Microsoft ومتعلّمة كده`,
      items: [
        {
          cmd: "ديدلوك الـ DNS",
          title: R`النفق «متصل» وصفر بيانات: الـ proxy محتاج يحل اسم السيرفر، والـ DNS بقى رايح للنفق اللي لسه مقامش`,
          learn: R`تعرف ليه أول جلسة اشتغلت والباقي لأ (الاسم كان في الكاش)، وتثبت الديدلوك بـ [[ip route get]] لعنوان الـ DNS، وتصلّحه بإنك تحل الاسم **قبل** أي route وتدّي الـ proxy الـ IP، مع إبقاء اسم الـ SNI والشهادة.`,
          out: R`[[by IP, SNI+cert=vpn.example: 200]] حتى والكاش فاضي، و [[ip route get 203.0.113.9]] من الكارت الحقيقي.`,
          desc: R`أول جلسة بالأداة اشتغلت (9 Mbps). آخر ٣ جلسات: الـ routes اتركّبت (كل أمر رجّع [[-> 0]])، والأداة كتبت [[connected]]، وصفر بيانات.

الفحوصات بالترتيب: الـ routes سليمة؟ آه. الكروت؟ سليمة. IPv6؟ مش السبب. DNS: [[nslookup vpn.example]] والنفق شغّال مبيردش، و [[nslookup vpn.example 8.8.8.8]] نفس الحكاية، وبعد الفصل [[Resolve-DnsName vpn.example]] بيرد على طول.

التفسير: الـ proxy بيحتاج يحل [[vpn.example]] عشان يتصل بالسيرفر. بعد [[/1+/1]] أي سؤال DNS (لـ DNS المزوّد) بيروح **للنفق**، والنفق مستني الـ proxy يتصل، والـ proxy مستني الـ DNS. ديدلوك. وأول جلسة اشتغلت لأن الاسم كان في **DNS cache** فماحتاجش يسأل. (وجلسات تانية كانت مخبّية تحت حلقة الـ multicast في تاب net، ولما اتصلّحت ظهر ده.)

الحل: **حل الاسم قبل ما تغيّر أي route**، وركّب [[/32]] للـ IP ده من الكارت الحقيقي، وادّي الـ proxy الـ IP مباشرة (في الأداة: [[ServerAddressOverride]])، مع إبقاء الـ SNI واسم الشهادة [[vpn.example]]. الدرس العام: «اشتغلت مرة» ممكن يكون كاش.`,
          example: R`nslookup vpn.example
Resolve-DnsName vpn.example -Server 192.0.2.1 -QuickTimeout
ip route get 198.51.100.53
getent hosts vpn.example
IP=$(getent ahostsv4 vpn.example | awk 'NR==1{print $1}')
ip route add $IP/32 via 192.168.1.1 dev wifi0
curl -sS -m 8 --cacert ca.pem --resolve vpn.example:443:$IP https://vpn.example/ -o /dev/null -w "%{http_code}\n"`,
          lines: [
            R`على ويندوز: اسأل الـ DNS الافتراضي عن اسم السيرفر. والنفق شغّال بيعلّق ويقول [[DNS request timed out.]] و [[timeout was 2 seconds.]] (جرّبناها على DNS مش واصل: [[nslookup example.com 192.0.2.1]])، ومن غيره بيرد. (على اسم مش موجود أصلًا بيرد بسرعة: [[*** UnKnown can't find vpn.example: Non-existent domain]]، وده فرق مهم: «مش موجود» غير «مفيش رد».)`,
            R`على ويندوز: نفس السؤال لسيرفر DNS مش بيرد ([[192.0.2.1]] عنوان توثيق مفيش وراه حاجة)، و [[-QuickTimeout]] ميستناش كتير. ده شكل الرسالة لما الـ DNS مش واصل: [[This operation returned because the timeout period expired.]].`,
            R`في المعمل: سؤال DNS لـ [[198.51.100.53]] (DNS المزوّد) هيطلع منين؟ قبل النفق [[dev wifi0]]، وبعد [[/1+/1]] [[dev vpnlab0]]. ده الديدلوك في سطر.`,
            R`[[getent hosts]] بيحل الاسم بنفس طريقة البرامج (ملف hosts ثم DNS حسب [[nsswitch.conf]]). لو الاسم في الكاش المحلي بيرد فورًا حتى والـ DNS مقطوع.`,
            R`الحل الأول: احفظ الـ IP في متغير **قبل** أي route. [[ahostsv4]] IPv4 بس، و [[awk 'NR==1{print $1}']] أول عمود من أول سطر.`,
            R`ثبّت طريق السيرفر من الكارت الحقيقي بـ [[/32]]، فلما [[/1+/1]] تتركّب، الاتصال بالسيرفر نفسه ميدخلش النفق.`,
            R`اتصل بالـ IP واحتفظ بالاسم: [[--resolve vpn.example:443:$IP]] بيقول لـ curl «الاسم ده = الـ IP ده» من غير DNS، فالـ SNI والتحقق من الشهادة بيفضلوا [[vpn.example]]. ده نفس اللي [[ServerAddressOverride]] بيعمله في الأداة.`,
          ],
          try: R`ابني المعمل: namespace [[dl]] (الجهاز) و [[isp]] (المزوّد، عليه dnsmasq بيعرف [[vpn.example]] وسيرفر TLS على [[203.0.113.9:443]])، وكاش محلي dnsmasq على [[127.0.0.1]]. حل الاسم، وركّب [[/1+/1]] لكارت [[vpnlab0]] مفيش حد بيرد وراه، وحل تاني (هيرد من الكاش)، وبعدين اعمل restart للكاش وحل تالت مرة. وبعدين طبّق الحل بالترتيب الصح.`,
          teach: R`## العَرَض

- الجلسة الأولى بالأداة: اشتغلت، 9 Mbps.
- آخر ٣ جلسات: كل أوامر الـ routes رجّعت [[-> 0]] (نجحت)، والأداة كتبت [[connected]]، والكارت موجود، و **صفر بيانات**.
- ومحدش غيّر حاجة في الإعداد بين الأولى والباقي.

---

## الفحوصات بالترتيب، وليه

| الترتيب | السؤال | الأمر | النتيجة |
|---|---|---|---|
| ١ | الـ routes اتركّبت؟ | [[route print -4]] | [[0.0.0.0/1]] و [[128.0.0.0/1]] على [[vpnlab0]]، و [[/32]] للسيرفر... **لأ، مفيش [[/32]]** |
| ٢ | الكروت سليمة؟ | [[Get-NetAdapter]] و [[ipconfig]] | [[vpnlab0]] Up وعليه عنوان |
| ٣ | IPv6 بيلخبط؟ | [[curl -6]] | مفيش IPv6، مش السبب |
| ٤ | DNS؟ | [[nslookup vpn.example]] والنفق شغّال | بيعلّق |
| ٥ | DNS تاني؟ | [[nslookup vpn.example 8.8.8.8]] | بيعلّق برضه |
| ٦ | ومن غير النفق؟ | [[Resolve-DnsName vpn.example]] بعد الفصل | بيرد على طول |

ليه الترتيب ده؟ ١ و ٢ ثانية وبيغطّوا أشهر سبب. ٣ عشان IPv6 كان مشكلة في جلسة قبلها. ٤ و ٥ و ٦ مع بعض بيقولوا: الـ DNS شغّال، بس **مش من جوه النفق**. وغياب [[/32]] في ١ كان أول خيط: الأداة مكانتش لاقية IP تحطه.

---

## المعمل

كونتينر [[ubuntu:24.04]] بـ [[--privileged]] (dnsmasq 2.91 و curl 8.5.0 و OpenSSL 3.0.13):

~~~text
   dl (الجهاز)                          isp (المزوّد)
   127.0.0.1  كاش DNS (dnsmasq)         198.51.100.53  DNS المزوّد: vpn.example = 203.0.113.9
   wifi0 192.168.1.20 ─────────────── lan0 192.168.1.1
   vpnlab0 10.255.0.2 (برنامج بيقرا ومبيردش)   203.0.113.9:443  سيرفر TLS بشهادة vpn.example
~~~

~~~bash
ip netns add dl; ip netns add isp
C(){ ip netns exec dl "$@"; }; S(){ ip netns exec isp "$@"; }
ip link add wifi0 netns dl type veth peer name lan0 netns isp
C ip addr add 192.168.1.20/24 dev wifi0; S ip addr add 192.168.1.1/24 dev lan0
S ip addr add 198.51.100.53/32 dev lo
C ip route add default via 192.168.1.1
S dnsmasq --no-resolv --no-hosts --listen-address=198.51.100.53 --bind-interfaces --address=/vpn.example/203.0.113.9 --local-ttl=300
mkdir -p /etc/netns/dl; echo "nameserver 127.0.0.1" > /etc/netns/dl/resolv.conf
C dnsmasq --no-resolv --no-hosts --listen-address=127.0.0.1 --bind-interfaces --server=198.51.100.53 --cache-size=100
C ip tuntap add dev vpnlab0 mode tun; C ip addr add 10.255.0.2/24 dev vpnlab0; C ip link set vpnlab0 up
~~~

(وكمان [[ip link set ... up]] للكروت و [[lo]]، وبرنامج Python صغير بيفتح [[vpnlab0]] ويقرا ويرمي: يعني الكارت «متصل» بس مفيش حد بيوصّل للسيرفر.)

| الحتة | ليه |
|---|---|
| [[--address=/vpn.example/203.0.113.9]] | DNS المزوّد بيعرف اسم السيرفر |
| [[--local-ttl=300]] | الإجابة صالحة ٥ دقايق، فالكاش يحتفظ بيها |
| [[/etc/netns/dl/resolv.conf]] | [[ip netns exec dl]] بيعمل bind للملف ده مكان [[/etc/resolv.conf]]: الجهاز بيسأل الكاش المحلي (زي خدمة DNS Client في ويندوز) |
| [[--server=198.51.100.53]] | الكاش لما ميلاقيش، بيسأل المزوّد |

---

## ١. الجلسة الأولى، والتانية، و «الكاش راح»

~~~bash
C getent hosts vpn.example
C ip route add 0.0.0.0/1 via 10.255.0.1 dev vpnlab0
C ip route add 128.0.0.0/1 via 10.255.0.1 dev vpnlab0
C getent hosts vpn.example
kill $(cat /run/dns-cache.pid); cache_start
C getent hosts vpn.example; echo "getent exit=$? after ...s"
~~~

~~~text الناتج
== session 1: name not cached yet, resolve, then routes
203.0.113.9     vpn.example
== session 2: routes up, name still in cache
203.0.113.9     vpn.example
== cache gone (restart / TTL / reboot)
getent exit=2 after 20s
;; communications error to 198.51.100.53#53: timed out
;; no servers could be reached
198.51.100.53 via 10.255.0.1 dev vpnlab0 src 10.255.0.2 uid 0
    cache
~~~

- الجلسة الأولى: الاسم اتحل **قبل** الـ routes (أو كان في الكاش)، فاشتغلت.
- التانية: الـ routes راكبة، بس الاسم في الكاش: اشتغلت برضه. ده «اشتغلت مرة».
- بعد ما الكاش يروح (restart، أو الـ TTL خلص، أو الجهاز اتقفل): [[getent]] استنى ٢٠ ثانية وفشل ([[exit=2]] = مش لاقي)، و [[dig]] قال [[no servers could be reached]].
- السطر الأخير هو الدليل: سؤال DNS لـ [[198.51.100.53]] بيطلع **[[dev vpnlab0]]**. الـ DNS بقى محتاج النفق، والنفق محتاج الـ DNS.

وعلى ويندوز: [[ipconfig /displaydns]] بيعرض الكاش، بس على ويندوز ١١ الحديث من نافذة عادية رد [[The requested operation requires elevation.]] (محتاج أدمن). و [[Resolve-DnsName]] على DNS مش واصل:

~~~text Resolve-DnsName example.com -Server 192.0.2.1 -QuickTimeout
Resolve-DnsName: example.com : This operation returned because the timeout period expired.
~~~

وده مختلف عن اسم مش موجود:

~~~text Resolve-DnsName vpn.example / nslookup vpn.example
Resolve-DnsName: vpn.example : DNS name does not exist.
*** UnKnown can't find vpn.example: Non-existent domain
~~~

**timeout** = محدش رد (طريق مقطوع، زي الديدلوك). **does not exist** = رد وقال مفيش. لو بتشوف الأولى للسيرفر بتاعك والنفق شغّال، شك في الديدلوك على طول.

---

## ٢. الحل: حل الأول، وثبّت، وبعدين النفق

~~~bash
C ip route del 0.0.0.0/1; C ip route del 128.0.0.0/1
IP=$(C getent ahostsv4 vpn.example | awk 'NR==1{print $1}'); echo "resolved before routes: $IP"
C ip route add $IP/32 via 192.168.1.1 dev wifi0
C ip route add 0.0.0.0/1 via 10.255.0.1 dev vpnlab0; C ip route add 128.0.0.0/1 via 10.255.0.1 dev vpnlab0
C ip route get $IP
kill $(cat /run/dns-cache.pid)
C curl -sS -m 8 --cacert ca.pem --resolve vpn.example:443:$IP https://vpn.example/ -o /dev/null -w "by IP, SNI+cert=vpn.example: %{http_code}\n"
~~~

~~~text الناتج
resolved before routes: 203.0.113.9
203.0.113.9 via 192.168.1.1 dev wifi0 src 192.168.1.20 uid 0
by IP, SNI+cert=vpn.example: 200
~~~

حتى بعد ما قتلنا الكاش خالص، الاتصال نجح: مبقاش فيه سؤال DNS في الطريق.

### ليه نحتفظ بالاسم في الـ SNI والشهادة؟

~~~text C curl -sS -m 8 --cacert ca.pem https://203.0.113.9/
curl: (60) SSL: no alternative certificate subject name matches target host name '203.0.113.9'
~~~

لو بدّلت الاسم بالـ IP **في كل حتة**، التحقق من الشهادة بيفشل (الشهادة لـ [[vpn.example]] مش للـ IP). فالـ IP للاتصال بس، والاسم للـ SNI والتحقق (درس «SNI واسم الشهادة» في تاب net). في الأداة ده حقل [[ServerAddressOverride]]: العنوان اللي هيتصل بيه، والباقي زي ما هو.

### الترتيب في الأداة

1. حل [[vpn.example]] (DNS عادي، والنفق لسه مقامش).
2. لو فشل: وقّف، ومتلمسش الـ routes.
3. [[/32]] للـ IP من الكارت الحقيقي ([[route add]] بـ [[store=active]] على ويندوز: قضية «عملية يتيمة و routes»).
4. ابدأ الـ proxy بالـ IP ([[ServerAddressOverride]]) والـ SNI بالاسم.
5. وبعدين [[/1+/1]].

---

## ٣. البدايل اللي اترفضت

| البديل | ليه لأ |
|---|---|
| تحط [[vpn.example]] في ملف [[hosts]] | بيتنسى، ولما السيرفر يغيّر IP الأداة تتصل بعنوان قديم من غير ما تعرف، والملف ده محتاج أدمن ومشترك مع كل البرامج |
| route لـ DNS المزوّد من برّه النفق | كل أسئلة DNS بتاعة الجهاز تطلع برّه النفق = تسريب (درس [[leak_protection]]) |
| تكتب IP السيرفر ثابت في الإعداد | بيشتغل لحد ما السيرفر يتنقل. الحل الأول بيحل الاسم كل مرة قبل النفق |
| تزوّد timeout الـ DNS | الديدلوك مش بطء: مفيش رد هييجي مهما استنيت |
| «مسح الكاش» كعلاج | ده اللي **بيكشف** المشكلة، مش اللي بيعالجها |

---

## ٤. اتأكد، ومتتكررش

- **اختبار cold start:** فضّي الكاش ([[ipconfig /flushdns]] على ويندوز، بيغيّر حالة الكاش فشغّله بإيدك وانت فاهم، أو restart الكاش في المعمل) وبعدين وصّل. لازم يشتغل من أول مرة.
- **اختبار على الإعداد اللي الـ proxy بيبدأ بيه:** العنوان فيه IP مش اسم ([[grep -E '"address": "[0-9.]+"']])، والـ SNI فيه الاسم.
- **سطر في اللوج:** [[resolved vpn.example -> 203.0.113.9 before routes]]. لو مش موجود، الترتيب باظ.
- **الدرس العام:** أي «اشتغلت مرة وبعدين لأ» اسأل: إيه الكاش اللي كان مخبّيها؟ (DNS، و build cache، و session، و ARP).`,
          deep: {
            why: R`الـ VPN بيغيّر الطريق لكل حاجة، والـ DNS «حاجة». فلو الأداة محتاجة DNS عشان تقوم، وطريق الـ DNS بيعدّي منها، يبقى فيه حلقة اعتماد. وأي كاش (DNS Client في ويندوز، أو dnsmasq، أو الكاش جوه البرنامج نفسه) بيكسر الحلقة مؤقتًا، فبتظهر بعد ساعات أو بعد restart، وده اللي بيخليها صعبة: «كانت شغّالة».`,
            how: R`البرنامج بيحل الاسم بـ getaddrinfo، اللي بيسأل الـ resolver المحلي (DNS Client على ويندوز، أو [[127.0.0.53]] أو dnsmasq على لينكس)، واللي لو مالقاش في الكاش بيبعت UDP لـ DNS المزوّد. الباكت دي بتمشي على جدول التوجيه زي أي باكت: بعد [[/1+/1]] بتروح [[vpnlab0]]. والكارت متصل ببرنامج مستني يتصل بالسيرفر، فالباكت بتترمي. و [[getent]] بيحاول كذا مرة على كل nameserver (timeout × attempts) فطلعت ٢٠ ثانية. و [[--resolve host:port:ip]] في curl بيحط إجابة في كاش curl الداخلي، فمبيسألش DNS خالص بس بيستخدم الاسم في الـ SNI و Host والتحقق.`,
            when: R`أي أداة نفق أو VPN أو proxy بيركّب routes وبيتصل بسيرفر **باسم**. وأي «VPN متصل وصفر بيانات». وأي سيستم فيه خدمة محتاجة DNS عشان تقوم والـ DNS نفسه وراها (DNS على VM والـ VM محتاج DNS يقوم، أو service mesh). وأي «اشتغل أول مرة بس».`,
            mistakes: R`تفتكر إن «اشتغلت مرة» يعني الإعداد سليم. وتمسح الكاش وتعتبر ده الحل لأنه «أحيانًا بيصلّح» (هو بيأجّل). وتحط الاسم في hosts وتنسى. وتبدّل الاسم بالـ IP في كل حتة فالشهادة تفشل وتقفل التحقق. وتعمل route للـ DNS برّه النفق فتسرّب كل الأسامي. وتخلط [[timed out]] بـ [[does not exist]]. وفي المعمل: تسأل الـ DNS بـ [[dig]] بدل [[getent]] وتنسى إن [[dig]] مبيعدّيش على الكاش المحلي لو اديته سيرفر.`
          },
          sol: R`المعمل: قبل الـ routes [[getent hosts vpn.example]] = [[203.0.113.9]]. بعد [[/1+/1]] والاسم في الكاش: نفس الإجابة. بعد restart الكاش: [[getent exit=2 after 20s]]، و [[dig +time=2 +tries=1 @198.51.100.53]] طبع [[;; communications error to 198.51.100.53#53: timed out]] و [[;; no servers could be reached]]، و [[ip route get 198.51.100.53]] = [[via 10.255.0.1 dev vpnlab0]]، و [[curl https://vpn.example/]] = [[curl: (28) Resolving timed out after 8000 milliseconds]]. بعد الترتيب الصح: [[resolved before routes: 203.0.113.9]] و [[203.0.113.9 via 192.168.1.1 dev wifi0]] و [[by IP, SNI+cert=vpn.example: 200]] والكاش ميت، و [[curl https://203.0.113.9/]] = [[(60) SSL: no alternative certificate subject name matches target host name '203.0.113.9']].

ويندوز 11 (قراية بس): [[Resolve-DnsName vpn.example]] = [[DNS name does not exist.]]، و [[-Server 192.0.2.1 -QuickTimeout]] = [[This operation returned because the timeout period expired.]]، و [[nslookup]] = [[*** UnKnown can't find vpn.example: Non-existent domain]]، و [[ipconfig /displaydns]] = [[The requested operation requires elevation.]]. [[ServerAddressOverride]] حقل في الأداة الأصلية، و [[ipconfig /flushdns]] من وثائق Microsoft ومتشغّلش.`,
          practice: [
            { lvl: 'سريع', t: R`من غير ما تبص: إيه الفرق بين [[timed out]] و [[DNS name does not exist]]؟ ولو شفت الأولى لاسم السيرفر بتاعك والنفق شغّال، أول أمر تكتبه إيه؟`, done: R`الأولى محدش رد (طريق مقطوع)، والتانية رد وقال مفيش. وأول أمر [[ip route get <عنوان DNS>]] (أو [[Find-NetRoute -RemoteIPAddress]] على ويندوز) عشان تشوف سؤال الـ DNS طالع من أنهي كارت.` },
            { lvl: 'تطبيق', t: R`اقرا وتوقّع: في المعمل وانت جوه الديدلوك، توقّع ناتج: [[getent hosts vpn.example]] و [[getent hosts localhost]] و [[curl -sS -m 5 --resolve vpn.example:443:203.0.113.9 --cacert ca.pem https://vpn.example/ -o /dev/null -w '%{http_code}']] (من غير [[/32]]). وبعدين جرّب.`, done: R`الأول يعلّق ويفشل، والتاني يرد فورًا من [[/etc/hosts]] (مبيسألش DNS)، والتالت يفشل بـ timeout لأن من غير [[/32]] الاتصال بالسيرفر نفسه دخل النفق. والناتج طابق، وكاتب إن الـ [[/32]] جزء من الحل مش زيادة.` },
            { lvl: 'تطبيق', t: R`ابني [[resolve-first.sh]]: بياخد اسم وبوابة، ويحل الاسم بـ [[timeout 5 getent ahostsv4]]، ويرفض لو فاضي أو IP خاص، ويطبع أمر [[/32]] جاهز. جرّبه قبل الـ routes وبعدها (والكاش فاضي).`, done: R`قبل: بيطبع [[203.0.113.9]] والأمر. بعد: بيرفض في ٥ ثواني بالظبط برسالة فيها [[no answer in 5s: are the tunnel routes already up?]] وكود 1، ومش بيستنى ٢٠ ثانية.` },
            { lvl: 'تطبيق', t: R`صلّح الترتيب: سكربت تشغيل الأداة بيعمل: (١) [[ip route add 0.0.0.0/1 ...]] (٢) [[ip route add 128.0.0.0/1 ...]] (٣) [[proxy --server vpn.example]] (٤) [[ip route add $(dig +short vpn.example)/32 ...]]. اكتب ٣ مشاكل والنسخة الصح.`, done: R`المشاكل: الحل بعد النفق (ديدلوك)، والـ [[/32]] بعد ما الـ proxy حاول يتصل، و [[dig +short]] ممكن يرجّع أكتر من سطر أو CNAME. والنسخة: حل أول بـ [[getent ahostsv4]] وفحص، ثم [[/32]]، ثم الـ proxy بالـ IP والـ SNI بالاسم، ثم [[/1+/1]].` },
            { lvl: 'تحدي', t: R`محاكاة الـ TTL: شغّل كاش المعمل بـ [[--local-ttl=20]] على DNS المزوّد، ووصّل بالترتيب الغلط بعد ما تحل الاسم مرة. كل ٥ ثواني جرّب [[getent hosts vpn.example]] واكتب الوقت. إمتى بالظبط بيبدأ الفشل؟ وليه ده بيخلي المستخدم يقول «بيقع بعد شوية»؟`, done: R`الفشل بدأ بعد ~٢٠ ثانية من أول حل (مش من تركيب الـ routes)، وعندك جدول بالأوقات، وجملة: الكاش بيأجّل الديدلوك لحد ما الـ TTL يخلص.` },
            { lvl: 'تحدي', t: R`اشرحها: ارسم في ٦ سطور (text) حلقة الاعتماد: proxy ← DNS ← route ← نفق ← proxy، وبعدين ارسم الترتيب الصح اللي بيكسرها، وفين الكاش بيخبّيها.`, done: R`الرسمة فيها الأسهم الأربعة وعلامة إن السهم الأخير هو اللي بيقفل الحلقة، والترتيب الصح بيشيل السهم proxy ← DNS (الحل قبلها)، وزميل فهمها من غير شرح.` },
          ],
          ci: [
            { os: [R`ubuntu`], sh: R`bash`, run: R`cat > lab.sh <<'SH'
ip link add wifi0 type veth peer name isp0
ip addr add 192.168.1.20/24 dev wifi0 && ip link set wifi0 up && ip link set isp0 up
ip route add default via 192.168.1.1 dev wifi0
ip tuntap add dev vpnlab0 mode tun
ip addr add 10.255.0.2/24 dev vpnlab0 && ip link set vpnlab0 up
echo "dns before tunnel: $(ip route get 198.51.100.53 | grep -o 'dev [a-z0-9]*')"
ip route add 0.0.0.0/1 via 10.255.0.1 dev vpnlab0 onlink
ip route add 128.0.0.0/1 via 10.255.0.1 dev vpnlab0 onlink
echo "dns after tunnel:  $(ip route get 198.51.100.53 | grep -o 'dev [a-z0-9]*')"
ip route add 203.0.113.9/32 via 192.168.1.1 dev wifi0
echo "server pinned:     $(ip route get 203.0.113.9 | grep -o 'dev [a-z0-9]*')"
SH
sudo unshare -n bash lab.sh`, expect: [R`dns before tunnel: dev wifi0`, R`dns after tunnel:  dev vpnlab0`, R`server pinned:     dev wifi0`] },
            { os: [R`windows`], sh: R`pwsh`, run: R`try { Resolve-DnsName vpn.example -ErrorAction Stop } catch { $_.Exception.Message }
try { Resolve-DnsName example.com -Server 192.0.2.1 -QuickTimeout -ErrorAction Stop } catch { $_.Exception.Message }`, expect: [R`DNS name does not exist`, R`timeout period expired`] },
          ],
        },
        {
          cmd: "فحص النفق بيختبر الطريق الغلط",
          title: R`الأداة بتقول Tunnel check failed والترافيك ماشي: الفحص كان بيعدّي على بورت SOCKS مش على الكارت`,
          learn: R`تكتب فحص صحة بيختبر **نفس الطريق** اللي الترافيك ماشي فيه ويطبع IP الخروج، ومبيقطعش الاتصال لو البيانات الحقيقية بتعدّي (vouched by traffic)، ويطلع سطر إحصائيات في تقرير التشخيص.`,
          out: R`[[tunnel checks: 3, answered 0, vouched by traffic 3, failed 0]] والتنزيل شغّال، و [[3 real failures in a row -> reconnect]] لما النفق يقع فعلًا.`,
          desc: R`الأداة بتكتب [[Tunnel check failed]] كل شوية وبتعيد الاتصال، واللوج بيقول الترافيك ماشي [[tun-in >> proxy]] والمستخدم بيتصفح عادي. السبب: الفحص كان بيعدّي على بورت الـ SOCKS المحلي ([[127.0.0.1:10808]])، مش على الكارت. والبورت ده ممكن يكون مقفول أو مشغول أو متغيّر، والنفق نفسه سليم.

الحل جزئين: (١) الفحص يعدّي **من خلال النفق نفسه** (طلب عادي من غير proxy، فيمشي على الـ routes زي أي برنامج) ويطبع IP الخروج ويقارنه بالسيرفر. (٢) ٣ فحوص فاشلة ورا بعض ما تقطعش الاتصال لو **البيانات الفعلية بتعدّي** (عدّاد الكارت زاد): ده «vouched by traffic». وكل ده يتسجّل في تقرير التشخيص: [[tunnel checks: 112, answered 3, vouched by traffic 74, failed 35]] (رقم حقيقي من الحالة: الفحص كان بيفشل ٣٢ مرة من ٣٥ والنفق شغّال).

الأوامر اللي الفحص اتبنى عليها: [[curl -4 -s -m 10 https://api.ipify.org]] (IP الخروج)، و [[curl -6 -s -m 5 https://api6.ipify.org || echo none]] (لازم فاضي أو السيرفر)، و [[-w "connect %{time_connect}s tls %{time_appconnect}s total %{time_total}s"]] (فين الوقت). وده نفس درس «/health بيقول 200 والدخول بايظ»: الفحص لازم يختبر اللي المستخدم بيعمله.`,
          example: R`curl -sS -m 3 -x socks5h://127.0.0.1:10808 http://198.51.100.80/
curl -4 -s -m 10 http://198.51.100.80/
curl -6 -s -m 5 http://198.51.100.80/ || echo none
curl -s -o /dev/null -w "connect %{time_connect}s tls %{time_appconnect}s total %{time_total}s\n" https://example.org
cat /sys/class/net/vpnlab0/statistics/rx_bytes
ROUNDS=3 bash tunnel-check.sh`,
          lines: [
            R`الفحص القديم: من خلال بورت الـ SOCKS المحلي. لو البورت مقفول: [[curl: (7) Failed to connect to 127.0.0.1 port 10808 after 0 ms]] والنفق نفسه ممكن يكون شغّال. ده بيختبر «الـ SOCKS شغّال؟» مش «النفق شغّال؟».`,
            R`الفحص الصح: طلب عادي من غير [[-x]]، فبيمشي على جدول التوجيه زي المتصفح بالظبط ([[/1+/1]] ← الكارت ← السيرفر). [[-4]] IPv4 بس، والناتج IP الخروج (في الحقيقة [[https://api.ipify.org]]، وفي المعمل سيرفر «IP بتاعي» على [[198.51.100.80]]).`,
            R`نفس الفحص على IPv6. الصح: يطلع IP السيرفر أو [[none]] (مفيش IPv6 خالص). لو طلع IPv6 بتاع مزوّد النت، الترافيك ده برّه النفق: تسريب.`,
            R`فين الوقت؟ [[time_connect]] لحد ما TCP اتوصل، و [[time_appconnect]] لحد ما TLS خلص، و [[time_total]] الكل. لو connect كبير المشكلة في الطريق، ولو الفرق بعده كبير المشكلة في السيرفر.`,
            R`عدّاد البايتات اللي **دخلت** الجهاز من الكارت (ردود من السيرفر للبرامج). لو بيزيد، فيه بيانات حقيقية بتعدّي من النفق دلوقتي، مهما قال الفحص.`,
            R`سكربت الفحص الجديد ٣ جولات: لكل جولة IP الخروج، ولو فشل يبص على العدّاد، وفي الآخر سطر الإحصائيات.`,
          ],
          try: R`ابني معمل الـ namespaces (لابتوب بنفق [[vpnlab0]] لسيرفر «IP بتاعي»)، وشغّل الفحص القديم (SOCKS مقفول) والجديد. وبعدين اقفل سيرفر الفحص بـ iptables وشغّل تنزيل مستمر وشوف «vouched by traffic»، وبعدين اقطع النفق ([[ip link set srv0 down]]) وشوف ٣ فشل ورا بعض.`,
          teach: R`## العَرَض

- الأداة: [[Tunnel check failed]] كل كام دقيقة، وبعد ٣ مرات بتفصل وتوصل تاني.
- المستخدم: «النت بيقطع كل شوية».
- لوج الـ proxy في نفس الوقت: [[tun-in >> proxy]] سطور كتير. الترافيك ماشي.

يعني الفحص هو اللي بيقطع النت، مش النفق.

---

## الفحص كان بيختبر إيه؟

الفحص القديم: طلب عن طريق بورت الـ SOCKS المحلي اللي الأداة بتفتحه.

~~~text ip netns exec laptop curl -sS -m 3 -x socks5h://127.0.0.1:10808 http://198.51.100.80/
curl: (7) Failed to connect to 127.0.0.1 port 10808 after 0 ms: Couldn't connect to server
~~~

~~~text ip netns exec laptop curl -sS -m 3 http://198.51.100.80/
203.0.113.9
~~~

| الطريق | بيختبر إيه |
|---|---|
| [[-x socks5h://127.0.0.1:10808]] | inbound الـ SOCKS في الـ proxy: شغّال؟ على البورت ده؟ مش مشغول؟ |
| من غير [[-x]] | الـ routes ← الكارت ← الـ proxy ← السيرفر ← الإنترنت: **نفس طريق المتصفح** |

الـ SOCKS ممكن يقع أو يتقفل في الإعداد (أو البورت مشغول من برنامج تاني) والنفق سليم. والعكس: الـ SOCKS يرد والـ routes بايظة. **الفحص لازم يمشي على نفس طريق المستخدم.**

---

## المعمل

نفس معمل «هوت سبوت من النفق» في تاب net: namespace [[laptop]] فيه [[wifi0]] و [[vpnlab0]] (veth لـ [[inet]] اللي بيعمل نفسه السيرفر: أي حاجة جاية منه تبان [[203.0.113.9]])، و [[/1+/1]] على [[vpnlab0]]، وسيرفر «IP بتاعي» على [[198.51.100.80]]، وسيرفر ملفات على [[198.51.100.81:8000]] فيه ملف 5 MB.

~~~bash tunnel-check.sh
#!/usr/bin/env bash
# tunnel-check.sh: افحص الطريق اللي الترافيك ماشي فيه فعلًا، مش بورت جنبه
EXPECT=203.0.113.9 IF=vpnlab0 URL=http://198.51.100.80/
rx(){ cat /sys/class/net/$IF/statistics/rx_bytes; }
fails=0 checks=0 answered=0 vouched=0 failed=0
for i in $(seq 1 $__{ROUNDS:-5}); do
  before=$(rx); checks=$((checks+1))
  ip=$(curl -4 -s -m 3 "$URL")
  if [ "$ip" = "$EXPECT" ]; then answered=$((answered+1)); fails=0; echo "check $i: ok exit-ip=$ip"
  else
    sleep 1; moved=$(( $(rx) - before ))
    if [ "$moved" -gt 10000 ]; then vouched=$((vouched+1)); fails=0; echo "check $i: probe failed but $moved bytes came in on $IF -> vouched by traffic"
    else failed=$((failed+1)); fails=$((fails+1)); echo "check $i: FAILED (exit-ip='$ip', $moved bytes in)"; fi
  fi
  [ $fails -ge 3 ] && { echo "3 real failures in a row -> reconnect"; break; }
  sleep 1
done
echo "tunnel checks: $checks, answered $answered, vouched by traffic $vouched, failed $failed"
~~~

| الحتة | ليه |
|---|---|
| [[EXPECT=203.0.113.9]] | مش كفاية «رد». لازم الرد يقول إن الخروج من السيرفر، وإلا يبقى الطلب طلع من برّه النفق ونجح |
| [[rx()]] | عدّاد البايتات الداخلة من الكارت (على ويندوز [[ReceivedBytes]] من [[Get-NetAdapterStatistics]]) |
| [[before=$(rx)]] ... [[moved]] | البايتات اللي دخلت **أثناء** الفحص. أكتر من 10000 في ٤ ثواني = بيانات حقيقية بتعدّي |
| [[fails=0]] في الـ vouched | الفحص اللي اتبرّر بالترافيك بيصفّر عدّاد الفشل المتتالي |
| [[fails -ge 3]] | ٣ فشل **حقيقي** ورا بعض (مفيش رد ومفيش بيانات) هو بس اللي يستاهل إعادة اتصال |

---

## ٣ سيناريوهات

### (أ) كله سليم

~~~text ROUNDS=2 bash tunnel-check.sh
check 1: ok exit-ip=203.0.113.9
check 2: ok exit-ip=203.0.113.9
tunnel checks: 2, answered 2, vouched by traffic 0, failed 0
~~~

### (ب) سيرفر الفحص مش بيرد، والمستخدم بينزّل

~~~bash
ip netns exec inet tc qdisc add dev srv0 root tbf rate 4mbit burst 32kbit latency 400ms
ip netns exec inet iptables -A INPUT -p tcp --dport 80 -j DROP
ip netns exec laptop curl -s -o /dev/null http://198.51.100.81:8000/file.bin &
ROUNDS=3 ip netns exec laptop bash tunnel-check.sh
~~~

~~~text الناتج
check 1: probe failed but 2007179 bytes came in on vpnlab0 -> vouched by traffic
check 2: probe failed but 2006050 bytes came in on vpnlab0 -> vouched by traffic
check 3: probe failed but 212148 bytes came in on vpnlab0 -> vouched by traffic
tunnel checks: 3, answered 0, vouched by traffic 3, failed 0
~~~

[[tc ... tbf rate 4mbit]] بيبطّأ النفق عشان التنزيل ياخد وقت (من غيره الملف بيخلص في ثانية، وده حصل في أول تجربة: أول جولة vouched والباقي FAILED لأن التنزيل خلص). الفحص فشل ٣ مرات، والقديم كان هيقطع، والجديد شاف ٢ ميجا داخلين كل جولة فساب الاتصال.

### (ج) النفق وقع فعلًا

~~~text ip netns exec inet ip link set srv0 down
check 1: FAILED (exit-ip='', 0 bytes in)
check 2: FAILED (exit-ip='', 0 bytes in)
check 3: FAILED (exit-ip='', 0 bytes in)
3 real failures in a row -> reconnect
tunnel checks: 3, answered 0, vouched by traffic 0, failed 3
~~~

---

## سطر التقرير بيحكي القصة

في الحالة الحقيقية تقرير التشخيص بعد يوم:

~~~text
tunnel checks: 112, answered 3, vouched by traffic 74, failed 35
~~~

٣ بس ردّوا (سيرفر الفحص كان بيتحجب أو بطيء)، و ٧٤ اتبرّروا بالترافيك (كان هيبقوا ٧٤ إعادة اتصال على الفاضي بالطريقة القديمة، أو حوالي ٢٤ قطع بقاعدة الـ ٣)، و ٣٥ فشل حقيقي متفرقين. الرقم ده لوحده بيقولك «غيّر سيرفر الفحص».

---

## فين الوقت؟

~~~text curl -s -o /dev/null -w "connect %{time_connect}s total %{time_total}s\n" http://198.51.100.80/  (المعمل)
connect 0.000158s total 0.000572s
~~~

على HTTPS ضيف [[tls %{time_appconnect}s]]. [[connect]] كبير = الطريق (النفق أو الشبكة)، و [[tls - connect]] كبير = السيرفر بطيء في الـ handshake، و [[total - tls]] كبير = التطبيق نفسه بطيء.

و IPv6:

~~~text ip netns exec laptop curl -6 -s -m 3 http://198.51.100.80/ || echo "ipv6: none"
ipv6: none
~~~

---

## البدايل اللي اترفضت

| البديل | ليه لأ |
|---|---|
| تخلّي الفحص على SOCKS وتصلّح البورت | بيفضل بيختبر حاجة غير اللي المستخدم بيستخدمها |
| [[ping]] للسيرفر | ICMP غالبًا بيطلع برّه النفق (الـ [[/32]] للسيرفر!) وبيقولك السيرفر عايش، مش النفق |
| تزوّد عدد الفشل المسموح لـ ١٠ | الانقطاع الحقيقي هياخد ١٠ دقايق عشان يتكشف |
| تشيل الفحص خالص | النفق يقع والأداة تفضل تقول [[connected]] |
| الفحص يكتفي بأي رد | لو الـ routes وقعت والطلب طلع من الـ Wi-Fi، الفحص هينجح والمستخدم برّه النفق |

## اتأكد، ومتتكررش

- الفحص بيطبع IP الخروج ويقارنه، مش «نجح/فشل» بس.
- التقرير فيه سطر [[tunnel checks:]] بالأربع أرقام، وأي release جديد يتقارن بيه.
- عدد إعادات الاتصال في اليوم بيتسجّل. لو زاد من غير ما الـ [[failed]] الحقيقي يزيد، الفحص اتكسر تاني.`,
          deep: {
            why: R`الفحص بيقرر حاجة مكلفة (يقطع ويوصل)، فلازم يختبر نفس اللي المستخدم محتاجه. أي فحص على حاجة جنب الطريق (بورت، أو بروسس، أو endpoint [[/health]]) بيقول «الحاجة دي شغّالة» مش «المستخدم شغّال». والفحص الخارجي نفسه ممكن يفشل (السيرفر بتاعه بيتحجب، أو بطيء)، فالدليل الأقوى هو الترافيك الحقيقي: لو بايتات بتدخل، النفق عايش.`,
            how: R`طلب HTTP عادي من غير proxy بيعمل [[connect()]] لـ IP الوجهة، والكيرنل بيختار الكارت بجدول التوجيه، فبيدخل [[vpnlab0]] زي أي برنامج. عدّادات الكارت ([[rx_bytes]] على لينكس، و [[ReceivedBytes]] على ويندوز) بتزيد مع كل باكت داخلة من النفق للبرامج. وعلى TUN [[rx]] = اللي الـ proxy كتبه للكارت، يعني ردود السيرفر. و [[tc qdisc ... tbf]] (token bucket) بيحدد معدّل الإرسال على كارت، ومفيد في المعمل عشان تخلّي التنزيل ياخد وقت.`,
            when: R`أي watchdog أو health check بيقرر إعادة تشغيل أو قطع: VPN، و load balancer، و Kubernetes liveness probe، و systemd [[WatchdogSec]]. والسؤال دايمًا: الفحص بيمشي على نفس طريق المستخدم؟ وفيه دليل تاني (ترافيك، أو لوج) يبرّر فشل الفحص؟`,
            mistakes: R`تفحص بورت أو بروسس وتسمّيه «الخدمة شغّالة». وتقطع بعد فشل واحد. وتعتبر أي رد نجاح من غير ما تقارن IP الخروج. وتستخدم [[ping]] للسيرفر وهو طالع برّه النفق. وتقيس الترافيك على الكارت الغلط (الـ Wi-Fi بيزيد دايمًا لأن النفق نفسه بيعدّي منه). وتنسى IPv6. وفي المعمل: تجرّب تنزيل سريع فيخلص قبل الفحص وتفتكر الـ vouched مش شغّال.`
          },
          sol: R`المعمل: الفحص القديم [[curl: (7) Failed to connect to 127.0.0.1 port 10808 after 0 ms: Couldn't connect to server]] والطلب العادي [[203.0.113.9]]. (أ) [[tunnel checks: 2, answered 2, vouched by traffic 0, failed 0]]. (ب) مع [[tbf rate 4mbit]] و DROP على بورت 80 وتنزيل: [[vouched by traffic 3]] (٢٠٠٧١٧٩ و ٢٠٠٦٠٥٠ و ٢١٢١٤٨ بايت). من غير [[tc]] أول تجربة طلعت [[vouched by traffic 1, failed 2]] لأن التنزيل خلص. (ج) [[ip link set srv0 down]]: ٣ [[FAILED]] و [[3 real failures in a row -> reconnect]]. و [[connect 0.000158s total 0.000572s]] و [[ipv6: none]].

اتجرّب في [[ubuntu:24.04]] بـ [[--privileged]] و [[ip netns]]. رقم [[tunnel checks: 112, answered 3, vouched by traffic 74, failed 35]] من تقرير الحالة الأصلية، و [[api.ipify.org]] و [[api6.ipify.org]] مكان سيرفر «IP بتاعي» في الحقيقة.`,
          practice: [
            { lvl: 'سريع', t: R`من غير ما تبص: ليه [[curl -x socks5h://127.0.0.1:10808 ...]] فحص غلط للنفق؟ وليه [[ping 203.0.113.9]] فحص غلط كمان؟`, done: R`الأول بيختبر الـ SOCKS مش الـ routes والكارت، والتاني بيطلع برّه النفق من الـ [[/32]] بتاع السيرفر فبيقول السيرفر عايش مش النفق.` },
            { lvl: 'تطبيق', t: R`اقرا وتوقّع: لو الـ routes بتاعة النفق اتمسحت (مفيش [[/1+/1]]) والـ Wi-Fi شغّال، [[tunnel-check.sh]] هيطبع إيه؟ وفحص من غير [[EXPECT]] (أي رد = نجاح) هيطبع إيه؟ جرّب بـ [[ip route del]] في المعمل.`, done: R`الجديد: [[FAILED (exit-ip='198.51.100.7' ...)]] لأن الـ IP مش السيرفر، والقديم بدون EXPECT: [[ok]]. وكاتب إن ده تسريب الفحص الضعيف كان هيخبّيه.` },
            { lvl: 'تطبيق', t: R`ابني نسخة PowerShell من [[tunnel-check.sh]]: [[curl.exe -4 -s -m 3]] للـ IP، و [[(Get-NetAdapterStatistics -Name vpnlab0).ReceivedBytes]] قبل وبعد، ونفس القواعد ونفس سطر الإحصائيات.`, done: R`السكربت بيشتغل في pwsh 7 و 5.1، وعلى كارت مش موجود بيطبع رسالة واضحة بدل سيل أحمر، ونفس منطق الـ ٣ فشل، وجرّبته على كارت الـ Wi-Fi بـ [[EXPECT]] = الـ IP العام بتاعك فطلع [[answered]].` },
            { lvl: 'تطبيق', t: R`بيانات حقيقية: اعمل لوج فيه ٢٠٠ سطر من [[tunnel-check.sh]] (شغّله بـ [[ROUNDS=200]] وانت بتقفل سيرفر الفحص وتفتحه وتنزّل حاجات). لخّصه بـ [[awk]]: كام answered وكام vouched وكام failed، وأطول سلسلة failed ورا بعض.`, done: R`الملخص طلع نفس السطر الأخير بتاع السكربت، وأطول سلسلة failed رقم صحيح بيطابق اللي حصل (مثلًا ٣ وقت ما قطعت النفق).` },
            { lvl: 'تحدي', t: R`محاكاة: ضيف للفحص «سيرفرين احتياطي» (لو الأول مارد، جرّب التاني قبل ما تبص على العدّاد)، وخلّي كل سيرفر ليه عدّاد نجاح في التقرير. اقفل الأول وشوف التقرير بعد ٢٠ جولة.`, done: R`التقرير فيه سطر لكل سيرفر بعدد مرات الرد، والأول ٠ والتاني ٢٠، ومفيش ولا [[failed]] ولا vouched لأن التاني رد، والوقت الكلي للجولة مزادش عن ٧ ثواني.` },
            { lvl: 'تحدي', t: R`اكتب اختبار: [[test-verdict.sh]] بيختبر دالة القرار لوحدها (من غير شبكة) بجدول حالات: (IP صح، أي بايتات) و (IP غلط، ٥٠٠٠٠) و (فاضي، ٠) و (فاضي، ١٠٠٠٠) بالظبط على الحد. وصلّح الحد لو الحالة الأخيرة مش زي ما انت عايز.`, done: R`الاختبار بيطبع ٤ سطور [[PASS]]، والحالة اللي على الحد بالظبط متقررة صراحة في الكود (أكبر من ولا أكبر من أو يساوي) ومكتوب ليه.` },
          ],
          ci: [
            { os: [R`ubuntu`], sh: R`bash`, run: R`curl -sS -m 3 -x socks5h://127.0.0.1:10808 http://198.51.100.80/ 2>&1 | grep -o "(7) Failed to connect to 127.0.0.1 port 10808"
verdict(){ # $1 = exit-ip from probe, $2 = bytes that came in on the tunnel meanwhile
  if [ "$1" = 203.0.113.9 ]; then echo answered
  elif [ "$2" -gt 10000 ]; then echo "vouched by traffic"
  else echo failed; fi
}
verdict 203.0.113.9 0
verdict "" 2007179
verdict "" 70`, expect: [R`(7) Failed to connect to 127.0.0.1 port 10808`, R`answered`, R`vouched by traffic`, R`failed`] },
            { os: [R`windows`], sh: R`pwsh`, run: R`curl.exe -s -m 3 -x socks5h://127.0.0.1:10808 http://198.51.100.80/
"socks probe exit=$LASTEXITCODE"
(curl.exe -s -o NUL -w "connect %{time_connect}s total %{time_total}s" -m 3 http://127.0.0.1:1/) -replace '[0-9.]+s', 'Ns'`, expect: [R`socks probe exit=7`, R`connect Ns total Ns`] },
          ],
        },
        {
          cmd: "عملية يتيمة و routes",
          title: R`النت بطيء بعد ما قفلت نافذة الأدمن: الأب مات، والابن والـ routes فضلوا، والتشغيل التاني بيقول connected وهو فاشل`,
          learn: R`تلاقي بروسس ابن أبوه مات ([[ParentProcessId]] لرقم مش موجود، أو PPID 1 على لينكس)، و routes لكارت شغّال على الفاضي، و Persistent Routes بعد restart، وتحمي الجلسة بـ ٣ طبقات: الابن يموت مع الأب، وتنظيف عند القفل، وملف بأوامر التراجع.`,
          out: R`[[kill -9]] للأب ← الابن مات والكارت والـ routes اختفوا. قفل عادي ← سطور [[undo:]] بالعكس. و [[route print]] على ويندوز: [[Persistent Routes: None]].`,
          desc: R`شغّلت الأداة من نافذة PowerShell أدمن، وبعدين قفلت النافذة بالـ X (مش [[Ctrl+C]]). النت بقى بطيء، والأداة لما حاولت تشغّلها تاني رفضت برسالة مضللة.

اللي حصل: النافذة (الأب) ماتت فجأة، والبرنامج اللي هي شغّلته ([[xray.exe]]، الابن) **فضل شغّال** لوحده، والـ routes ([[/1+/1]]) فضلت راكبة على كارته. والتشغيل التاني فشل لأن الكارت والـ routes «already exists» والبورت مشغول، بس السكربت كمّل وكتب [[connected]].

الفحص: [[tasklist | findstr /i "xray vpnlab"]] (لسه شغّال؟)، و [[route print -4 | findstr "128.0.0.0 203.0.113.9"]] (الـ routes لسه موجودة؟)، و [[Get-CimInstance Win32_Process -Filter "Name='xray.exe'"]] بـ [[ParentProcessId]] (الأب لسه عايش؟). الحماية ٣ طبقات: **Job Object** بـ kill-on-close (موت الأب يقتل الابن، والكارت والـ routes بيختفوا معاه)، و**معالج قفل الكونسول** يشغّل التنظيف قبل الخروج، و**ملف حالة** بأوامر التراجع يتكتب أول ما الاتصال يبدأ وأمر [[cleanup]] يقراه. وفخ تاني: [[netsh interface ipv4 add route]] بيعمل route **دائم** افتراضيًا (Persistent Routes) فبعد restart النت يفضل رايح لكارت مش موجود؛ الحل [[store=active]].`,
          example: R`# Windows (PowerShell):
tasklist | findstr /i "xray vpnlab"
route print -4 | findstr "128.0.0.0 203.0.113.9 Persistent"
Get-CimInstance Win32_Process -Filter "Name='xray.exe'" | Select-Object ProcessId, ParentProcessId, CommandLine
Get-Process -Id 42116 -ErrorAction SilentlyContinue
netsh interface ipv4 delete route prefix=0.0.0.0/1 interface=vpnlab0 nexthop=10.255.0.1
# Linux (and WSL): المعمل
ps -o pid,ppid,stat,cmd -p $(pgrep -f miniproxy.py)
setpriv --pdeathsig KILL python3 miniproxy.py &
trap 'cleanup; exit' EXIT INT TERM HUP`,
          lines: [
            R`البرنامج لسه شغّال؟ [[tasklist]] كل البروسس، و [[findstr /i]] يطلّع اللي فيهم الاسم من غير ما يفرق capital و small. وعلى Git Bash بالذات الشكل ده أأمن من [[tasklist /FI ...]] (درس Git Bash والسويتشات في تاب bash).`,
            R`الـ routes لسه موجودة؟ والجزء الأخير من [[route print]] فيه قسم [[Persistent Routes:]]، لو فيه غير [[None]] يبقى routes هتفضل بعد الـ restart.`,
            R`الابن ده أبوه مين؟ [[Win32_Process]] فيه [[ParentProcessId]]. على ويندوز الرقم ده **مبيتغيّرش** لما الأب يموت، فبيشاور على رقم مش موجود.`,
            R`الأب ده عايش؟ [[Get-Process -Id]] برقم الأب، و [[-ErrorAction SilentlyContinue]] يرجّع ولا حاجة لو مش موجود بدل سطر أحمر. ولا حاجة = يتيم.`,
            R`أمر الطوارئ (من وثائق netsh، أدمن): يشيل نص الـ [[/1]] من كارت النفق. ونفس الأمر بـ [[prefix=128.0.0.0/1]] للنص التاني. ده بيرجّع النت لو الأداة مش موجودة تنضّف.`,
            R`في المعمل: [[ps -o pid,ppid,stat,cmd]] بيطبع الـ PPID. بعد موت الأب على لينكس بيبقى [[1]] (أو رقم subreaper زي systemd --user)، مش رقم الأب القديم.`,
            R`الطبقة ١ على لينكس: [[setpriv --pdeathsig KILL]] بيقول للكيرنل «لو الأب مات، ابعتلي SIGKILL». ده المقابل لـ Job Object بـ kill-on-close في ويندوز.`,
            R`الطبقة ٢: [[trap]] بيشغّل [[cleanup]] على خروج عادي ([[EXIT]]) وعلى [[Ctrl+C]] ([[INT]]) وعلى [[kill]] العادي ([[TERM]]) وعلى قفل الترمنال ([[HUP]]). [[kill -9]] مبيتمسكش، وعشان كده فيه طبقة ١ و ٣.`,
          ],
          try: R`في كونتينر [[--privileged]] اعمل namespace [[orph]]، وشغّل [[session-v1.sh]] (بيشغّل [[miniproxy.py]] ويركّب [[/1+/1]] ويستنى)، واقتله بـ [[kill -9]]. شوف [[ps]] و [[ip route]]، وشغّله تاني واقرا اللوج. وبعدين نفس الحكاية بـ [[session-v2.sh]] و [[kill -9]] ثم [[kill -HUP]]. وعلى ويندوز جرّب حالة الـ [[ping -t]] اليتيم اللي في الشرح.`,
          teach: R`## العَرَض

- الأداة اتشغّلت من نافذة PowerShell أدمن، وكانت شغّالة.
- النافذة اتقفلت بالـ X.
- بعدها: النت بطيء أو بيقف، والمواقع بتاخد وقت.
- تشغيل الأداة تاني: بيقول حاجة مالهاش علاقة، أو بيقول [[connected]] ومفيش حاجة شغّالة.

---

## المعمل: نفس الحكاية بالظبط

كونتينر [[ubuntu:24.04]] بـ [[--privileged]]، و namespace لوحده [[orph]] عشان مانلمسش شبكة الكونتينر. و [[miniproxy.py]] من درس «حلقة التضخيم» في تاب net بيفتح كارت [[vpnlab0]] (مش persistent: الكارت عايش طول ما البرنامج ماسكه).

~~~bash session-v1.sh
#!/usr/bin/env bash
# session-v1.sh: «نافذة الأدمن» زي ما كانت: بتشغّل البرنامج وتركّب الـ routes وتستنى
cd /root
python3 miniproxy.py > xray.log 2>&1 &
sleep 1
ip addr add 10.255.0.2/24 dev vpnlab0; ip link set vpnlab0 up
ip route add 0.0.0.0/1 via 10.255.0.1 dev vpnlab0 onlink
ip route add 128.0.0.0/1 via 10.255.0.1 dev vpnlab0 onlink
echo "connected: session pid $$, xray pid $!"
wait
~~~

~~~text قبل القفل، وبعد kill -9 للجلسة
before close:
    PID    PPID CMD
   4472    4470 bash /root/session-v1.sh
   4473    4472 python3 miniproxy.py
after closing the window (kill -9 session):
    PID    PPID STAT CMD
   4473       1 S    python3 miniproxy.py
0.0.0.0/1 via 10.255.0.1 dev vpnlab0 onlink
10.255.0.0/24 dev vpnlab0 proto kernel scope link src 10.255.0.2
128.0.0.0/1 via 10.255.0.1 dev vpnlab0 onlink
vpnlab0          UNKNOWN        <POINTOPOINT,MULTICAST,NOARP,UP,LOWER_UP>
~~~

- الجلسة ([[4472]]) ماتت، والـ proxy ([[4473]]) لسه عايش وأبوه بقى [[1]].
- الكارت والـ routes لسه موجودين: أي ترافيك بيروح لبرنامج **محدش بيتحكم فيه**.

[[kill -9]] هنا هو أقرب حاجة لقفل نافذة ويندوز بالـ X: الكونسول بيموت، والبرامج اللي اتشغّلت في الخلفية منه مش بتموت معاه.

### التشغيل التاني: «connected» وهو فاشل

~~~text bash session-v1.sh (والقديم لسه شغّال)
Error: ipv4: Address already assigned.
RTNETLINK answers: File exists
RTNETLINK answers: File exists
connected: session pid 4490, xray pid 4491
OSError: [Errno 16] Device or resource busy
~~~

الـ proxy الجديد ملقاش يفتح الكارت ([[Device or resource busy]]: القديم ماسكه)، والعنوان والـ routes [[already]]، والسكربت **كمّل وكتب [[connected]]**. ده بالظبط «الرسالة المضللة». السكربت مش بيبص على كود خروج أي أمر.

### لما اليتيم يموت

~~~text kill <xray pid>
no vpnlab0 routes
Device "vpnlab0" does not exist.
~~~

الكارت مش persistent، فلما البرنامج اللي ماسكه مات، الكيرنل شاله، وكل الـ routes اللي عليه اتشالت معاه. وده نفس سلوك wintun: الكارت بيعيش مع الـ handle. يعني **لو ضمنّا إن الابن يموت مع الأب، نص التنظيف بيحصل لوحده.**

---

## على ويندوز: يتيم حقيقي (من غير ما نلمس الشبكة)

~~~powershell
Set-Content "$env:TEMP\claude\wincase-orphan\parent.ps1" 'Start-Process ping.exe -ArgumentList "-t","127.0.0.1" -WindowStyle Hidden; Start-Sleep 120'
$parent = Start-Process pwsh -ArgumentList '-NoProfile','-File',"$env:TEMP\claude\wincase-orphan\parent.ps1" -WindowStyle Hidden -PassThru
$kid = Get-CimInstance Win32_Process -Filter "Name='PING.EXE' AND ParentProcessId=$($parent.Id)"
Stop-Process -Id $parent.Id -Force
Get-CimInstance Win32_Process -Filter "ProcessId=$($kid.ProcessId)" | Select-Object ProcessId, ParentProcessId, CommandLine
~~~

~~~text الناتج (ويندوز ١١، pwsh 7.6)
parent=42116 child=42168 child.ParentProcessId=42116
parent alive? False

ProcessId       : 42168
ParentProcessId : 42116
CommandLine     : "C:\WINDOWS\system32\PING.EXE" -t 127.0.0.1

"PING.EXE","42168","Console","4","5,500 K"
~~~

([[Stop-Process -Id 42168]] في الآخر عشان منسيبش [[ping]] شغّال.)

الفرق المهم عن لينكس: **[[ParentProcessId]] لسه [[42116]]** رغم إن [[42116]] مات. ويندوز مش بيعدّله. فعشان تعرف إنه يتيم: [[Get-Process -Id 42116]] لازم يرجّع ولا حاجة. وخلي بالك: ويندوز بيعيد استخدام الأرقام، فممكن بعد شوية رقم الأب يتدّى لبروسس تاني خالص؛ قارن [[StartTime]] بتاع «الأب» بـ [[StartTime]] بتاع الابن (الأب لازم يكون أقدم).

---

## الحماية: ٣ طبقات

~~~bash session-v2.sh
#!/usr/bin/env bash
# session-v2.sh: نفس الشغل بـ ٣ طبقات حماية
cd /root; STATE=/root/session.state
cleanup(){
  [ -f "$STATE" ] || return 0
  tac "$STATE" | while read -r cmd; do echo "undo: $cmd"; $cmd 2>/dev/null; done
  rm -f "$STATE"
}
trap 'cleanup; exit' EXIT INT TERM HUP          # (٢) أي قفل عادي يشغّل التنظيف
cleanup                                          # بقايا جلسة قديمة؟ نضّف الأول
setpriv --pdeathsig KILL python3 miniproxy.py > xray.log 2>&1 &   # (١) الابن يموت مع الأب
echo "kill $!" >> "$STATE"                       # (٣) أمر التراجع يتكتب قبل التغيير
sleep 1
ip addr add 10.255.0.2/24 dev vpnlab0; ip link set vpnlab0 up
for half in 0.0.0.0/1 128.0.0.0/1; do
  echo "ip route del $half dev vpnlab0" >> "$STATE"
  ip route add $half via 10.255.0.1 dev vpnlab0 onlink
done
echo "connected: session pid $$, xray pid $!"
wait
~~~

| الطبقة | على لينكس | على ويندوز (من الوثائق) | بتغطي إيه |
|---|---|---|---|
| ١ | [[setpriv --pdeathsig KILL]] | Job Object بـ [[JOB_OBJECT_LIMIT_KILL_ON_JOB_CLOSE]]، والابن جوّاه | موت الأب بأي طريقة (حتى [[kill -9]] أو الـ X) يقتل الابن |
| ٢ | [[trap ... EXIT INT TERM HUP]] | [[SetConsoleCtrlHandler]] (بيستلم [[CTRL_CLOSE_EVENT]] لما النافذة تتقفل، وعنده ثواني قليلة) | قفل عادي: يشيل الـ routes والقواعد بالترتيب |
| ٣ | ملف [[session.state]] و [[cleanup]] | نفس الفكرة: ملف JSON بأوامر التراجع، وأمر [[labvpn cleanup]] | أي حاجة فاتت الطبقتين (الجهاز اتقفل، أو الأداة اتقتلت من Task Manager) |

[[tac]] بيقرا الملف من الآخر للأول: التراجع **بالعكس** (آخر حاجة اتعملت أول حاجة تتشال).

### (أ) [[kill -9]] للجلسة

~~~text الناتج
connected: session pid 4514, xray pid 4515
kill 4515
ip route del 0.0.0.0/1 dev vpnlab0
ip route del 128.0.0.0/1 dev vpnlab0
    PID    PPID CMD
   4515       1 [python3] <defunct>
0
Device "vpnlab0" does not exist.
state file left: 3 lines
~~~

الـ [[trap]] ماشتغلش (مفيش حاجة بتمسك [[kill -9]])، بس الطبقة ١ اشتغلت: الـ proxy مات ([[<defunct>]] = خلص، ومستني حد يقرا كود خروجه؛ في الكونتينر PID 1 هو [[sleep]] فمبيقراش، وعلى جهاز عادي init بيشيله)، والكارت اختفى، و **صفر** routes. وملف الحالة فاضل فيه ٣ سطور.

### (ب) التشغيل اللي بعده بينضّف البقايا

~~~text الناتج
undo: ip route del 128.0.0.0/1 dev vpnlab0
undo: ip route del 0.0.0.0/1 dev vpnlab0
undo: kill 4515
connected: session pid 4534, xray pid 4540
~~~

### (ج) قفل عادي (SIGHUP، زي قفل الترمنال)

~~~text kill -HUP <session>
undo: ip route del 128.0.0.0/1 dev vpnlab0
undo: ip route del 0.0.0.0/1 dev vpnlab0
undo: kill 4540
no xray
no vpnlab0 routes
ls: cannot access '/root/session.state': No such file or directory
~~~

---

## الفخ التاني: route «دائم» بيعيش بعد restart

من وثائق [[netsh interface ipv4 add route]]: الـ parameter [[store]] قيمته الافتراضية [[persistent]]. يعني route الأداة بيتكتب في الريجستري ويرجع مع كل boot، والكارت مش موجود (لسه الأداة مااشتغلتش)، فالنت رايح لمكان مش موجود.

~~~text route print -4 (آخره، ويندوز ١١ سليم)
Persistent Routes:
  None
~~~

لو شفت تحت [[Persistent Routes:]] سطر فيه [[0.0.0.0]] بـ mask [[128.0.0.0]]، ده بقايا أداة. والصح في الأداة (من الوثائق، أدمن، ومتشغّلش هنا):

~~~powershell
netsh interface ipv4 add route prefix=0.0.0.0/1 interface=vpnlab0 nexthop=10.255.0.1 store=active
netsh interface ipv4 delete route prefix=0.0.0.0/1 interface=vpnlab0 nexthop=10.255.0.1
~~~

[[store=active]] = الـ route يعيش لحد الـ restart بس. والسطر التاني أمر الطوارئ لو فيه بقايا. (و [[New-NetRoute]] في PowerShell عنده [[-PolicyStore ActiveStore]] لنفس المعنى.) والأوامر دي ودرس [[netsh]] المتكرر بأمان في تاب cmd.

---

## البدايل اللي اترفضت

| البديل | ليه لأ |
|---|---|
| «متقفلش النافذة، اعمل Ctrl+C» | المستخدمين بيقفلوا بالـ X، والجهاز بيتقفل، والبرامج بتتقتل. لازم يشتغل في كل الحالات |
| سكربت تنظيف يمسح كل الـ [[/1]] routes | ممكن يمسح routes أداة تانية. ملف الحالة بيمسح اللي احنا عملناه بس |
| [[taskkill /IM xray.exe /F]] في أول التشغيل | بيقتل نسخ تانية مش بتاعتك (أداة تانية بتستخدم Xray) |
| تتجاهل [[already exists]] وتكمّل | ده اللي عمل الرسالة المضللة. لازم تعرف ليه موجود (بقايا ولا نسخة تانية شغّالة: قضية «نسختين بعد الصحيان») |

## اتأكد، ومتتكررش

- بعد أي جلسة (عادية أو مقتولة): [[tasklist | findstr xray]] فاضي، و [[route print]] مفيهوش [[128.0.0.0]]، و [[Persistent Routes: None]].
- اختبار في المعمل: [[kill -9]] للأب ← خلال ثانية مفيش ابن ولا routes. ده اختبار يتشغّل مع كل تعديل في كود التشغيل.
- كل أمر بيغيّر النظام: كود خروجه يتقري، وأمر تراجعه يتكتب **قبل** ما يتنفّذ.`,
          deep: {
            why: R`البرنامج اللي بيغيّر حالة النظام (routes، أو كارت، أو جدار) لازم يرجّعها، بس الخروج مش دايمًا بإيده: نافذة بتتقفل، و Task Manager، وانقطاع كهربا. فالتنظيف لازم يتصمم على كذا مستوى: الكيرنل نفسه يضمن الأساسي (موت الابن مع الأب، والكارت يختفي مع الـ handle)، والبرنامج ينضّف لو لحق، وملف يفتكر اللي اتعمل لو مالحقش.`,
            how: R`على لينكس، الابن اللي أبوه مات بيتبنّاه PID 1 أو أقرب subreaper، و [[PR_SET_PDEATHSIG]] (اللي [[setpriv --pdeathsig]] بيظبطه) بيخلي الكيرنل يبعت إشارة للابن لما الـ thread اللي عمله يموت. وكارت TUN مش persistent بيتشال لما آخر file descriptor عليه يتقفل، والـ routes اللي على كارت اتشال بتتشال معاه. على ويندوز، مفيش تبني: [[ParentProcessId]] بيفضل زي ما هو. والـ Job Object بيجمع بروسسات، ولو اتعمل بـ [[KILL_ON_JOB_CLOSE]] وآخر handle عليه اتقفل (الأب مات)، ويندوز بيقتل كل اللي جوّاه. و [[SetConsoleCtrlHandler]] بيستلم [[CTRL_CLOSE_EVENT]] لما النافذة تتقفل، وويندوز بيدّيه حوالي ٥ ثواني قبل ما يقتل البروسس. و [[trap ... HUP]] في bash بيمسك SIGHUP اللي بيتبعت لما الترمنال يتقفل.`,
            when: R`أي برنامج بيشغّل برنامج تاني وبيغيّر حاجة في النظام: أداة VPN، و dev server بيشغّل watcher، و سكربت نشر بيشغّل migration، و test runner بيشغّل قاعدة بيانات. وأي «بعد ما قفلت X حاجة فضلت شغّالة» أو «بعد restart النت/البورت/الملف لسه متأثر».`,
            mistakes: R`تعتمد على [[trap]] بس (مبيمسكش [[kill -9]] ولا الـ X في ويندوز). وتمسح «كل اللي شبه بتاعك» بدل اللي اتسجّل. وتكتب أمر التراجع **بعد** التنفيذ فلو البرنامج مات بينهم مش هتعرف. وتخزّن [[kill <pid>]] في ملف الحالة وتنفّذه بعد أيام: الرقم ممكن يكون اتدّى لبروسس تاني (خزّن معاه الاسم أو وقت البداية واتأكد قبل القتل). وتسيب [[netsh add route]] من غير [[store=active]]. وتفتكر إن [[ParentProcessId]] على ويندوز بيقولك الأب عايش.`
          },
          sol: R`المعمل ([[ubuntu:24.04]] بـ [[--privileged]] و namespace [[orph]]): v1 بعد [[kill -9]]: الـ proxy [[PPID 1]] والـ routes الاتنين موجودين، والتشغيل التاني: [[Error: ipv4: Address already assigned.]] و [[RTNETLINK answers: File exists]] مرتين و [[connected: ...]] و [[OSError: [Errno 16] Device or resource busy]]. بعد قتل اليتيم: [[no vpnlab0 routes]] و [[Device "vpnlab0" does not exist.]]. v2 بعد [[kill -9]]: [[<defunct>]] وصفر routes والكارت مش موجود وملف حالة ٣ سطور، والتشغيل اللي بعده [[undo:]] ٣ مرات بالعكس، و [[kill -HUP]]: [[undo:]] ٣ مرات و [[no xray]] و [[no vpnlab0 routes]] والملف اتمسح.

ويندوز 11: حالة [[ping -t]] اتجرّبت فعلًا ([[ParentProcessId : 42116]] والأب [[alive? False]]) واتقفل الـ ping بعدها، و [[route print -4]] طلع [[Persistent Routes: None]]. Job Object و [[SetConsoleCtrlHandler]] و [[store=persistent]] الافتراضي و [[netsh ... add/delete route]] و [[-PolicyStore ActiveStore]] من وثائق Microsoft ومتشغّلوش (بيغيّروا routes).`,
          practice: [
            { lvl: 'سريع', t: R`من غير ما تبص: الـ ٣ طبقات إيه، وكل واحدة بتغطي أنهي طريقة موت (Ctrl+C، والـ X، و Task Manager، وانقطاع الكهربا)؟`, done: R`جدول ٣×٤: الطبقة ١ (Job Object / pdeathsig) بتغطي الـ X و Task Manager و kill -9، والطبقة ٢ (trap / Ctrl handler) Ctrl+C والـ X، والطبقة ٣ (ملف الحالة) الكهربا وأي حاجة فاتت، وكلهم Ctrl+C.` },
            { lvl: 'تطبيق', t: R`على ويندوز: أعد تجربة [[ping -t]] اليتيم، واكتب سطر PowerShell واحد بيطبع كل [[PING.EXE]] أبوه مش عايش، وبعدين اقفله.`, done: R`السطر بيطبع [[ORPHAN 42168 (parent 42116 gone)]] أو شبهه، ومبيطبعش ولا حاجة لـ [[ping]] أبوه عايش، و [[tasklist | findstr /i ping]] فاضي في الآخر.` },
            { lvl: 'تطبيق', t: R`اقرا وتوقّع: في [[session-v2.sh]]، لو شلت [[setpriv --pdeathsig KILL]] بس، و [[kill -9]] للجلسة: الابن هيعيش؟ الـ routes؟ وإيه اللي هيحصل في التشغيل اللي بعده؟ جرّب.`, done: R`توقعت إن الابن يعيش والـ routes تفضل، والتشغيل اللي بعده [[cleanup]] بيقتله بـ [[kill <pid>]] من الملف والكارت يختفي فالـ routes تختفي، وده حصل. وكاتب إن الطبقة ٣ لحقت بس متأخر (لحد التشغيل الجاي النت كان رايح لبرنامج يتيم).` },
            { lvl: 'تطبيق', t: R`صلّح الكود: [[ip route add 0.0.0.0/1 dev vpnlab0 && echo "ip route del 0.0.0.0/1 dev vpnlab0" >> state]]. ليه الترتيب ده غلط؟ وفيه مشكلة تانية في سطر [[kill $!]] اللي في نفس الملف بعد أيام.`, done: R`أمر التراجع لازم يتكتب **قبل** التنفيذ (لو البرنامج مات بينهم الـ route يفضل من غير سجل)، والتراجع نفسه لازم يتحمل إن الحاجة مش موجودة ([[2>/dev/null]] أو فحص). و [[kill <pid>]] بعد أيام ممكن يقتل بروسس تاني أخد نفس الرقم، فبتخزّن معاه الاسم ([[/proc/<pid>/cmdline]]) وتتأكد قبل القتل.` },
            { lvl: 'تحدي', t: R`ابني [[cleanup]] أمتن: ملف الحالة JSON فيه لكل خطوة: الأمر، وأمر التراجع، و [[pid]] و [[starttime]] لو بروسس. و [[cleanup]] بيتراجع بالعكس، وبيتخطى البروسس اللي [[starttime]] بتاعه مختلف (اتعاد استخدام الرقم)، وبيكتب لكل خطوة [[undone]] أو [[skipped (why)]].`, done: R`في المعمل: بعد [[kill -9]] و [[cleanup]] كل الخطوات [[undone]]، ولو غيّرت الـ pid في الملف لرقم بروسس تاني شغّال بيطلع [[skipped (pid reused)]] ومبيقتلوش، وتشغيل [[cleanup]] مرتين ورا بعض التانية بتقول [[nothing to undo]].` },
            { lvl: 'تحدي', t: R`دوّر بنفسك: من وثائق Microsoft عن [[SetConsoleCtrlHandler]]، معالج [[CTRL_CLOSE_EVENT]] عنده قد إيه قبل ما ويندوز يقتل البروسس؟ وإيه اللي بيحصل لو البروسس مالوش نافذة كونسول أصلًا (اتشغّل بـ [[-WindowStyle Hidden]] أو كخدمة)؟`, done: R`كاتب المدة (حوالي ٥ ثواني) ومعاك الرابط، وكاتب إن البروسس من غير كونسول مش هيستلم الحدث ده، فالطبقة ١ (Job Object) هي اللي بتحميه، وده سبب إنها الأساس مش الطبقة ٢.` },
          ],
          ci: [
            { os: [R`ubuntu`], sh: R`bash`, run: R`cat > parent.sh <<'SH'
sleep 300 &
echo $! > child.pid
wait
SH
cat > parent2.sh <<'SH'
setpriv --pdeathsig KILL sleep 300 &
echo $! > child.pid
wait
SH
bash parent.sh & P=$!; sleep 1; C=$(cat child.pid)
kill -9 $P; sleep 0.5
[ "$(ps -o ppid= -p $C | tr -d ' ')" != "$P" ] && kill -0 $C 2>/dev/null && echo "orphan alive, new parent: not $P"
kill $C
bash parent2.sh & P=$!; sleep 1; C=$(cat child.pid)
kill -9 $P; sleep 0.5
case "$(ps -o stat= -p $C)" in ""|Z*) echo "child died with parent";; *) echo "child still alive";; esac`, expect: [R`orphan alive, new parent: not`, R`child died with parent`] },
            { os: [R`windows`], sh: R`pwsh`, run: R`Set-Content parent.ps1 'Start-Process ping.exe -ArgumentList "-t","127.0.0.1" -WindowStyle Hidden; Start-Sleep 120'
$parent = Start-Process pwsh -ArgumentList '-NoProfile', '-File', "$PWD\parent.ps1" -WindowStyle Hidden -PassThru
Start-Sleep 4
$kid = Get-CimInstance Win32_Process -Filter "Name='PING.EXE' AND ParentProcessId=$($parent.Id)"
Stop-Process -Id $parent.Id -Force; Start-Sleep 1
$k = Get-CimInstance Win32_Process -Filter "ProcessId=$($kid.ProcessId)"
if ($k.ParentProcessId -eq $parent.Id -and -not (Get-Process -Id $parent.Id -ErrorAction SilentlyContinue)) { 'orphan: ParentProcessId still points to a dead parent' }
Stop-Process -Id $kid.ProcessId
(route print -4 | Select-String 'Persistent Routes') -replace '\s+', ' '`, expect: [R`orphan: ParentProcessId still points to a dead parent`, R`Persistent Routes:`] },
          ],
        },
        {
          cmd: "نسختين بعد الصحيان",
          title: R`الاتصال بيقع كل شوية والنفق سليم: مهمة logon اشتغلت تاني بعد صحيان الجهاز، ونسختين بيكتبوا فوق بعض`,
          learn: R`تلاقي نسختين من نفس البرنامج من سطرين [[connected]] بفرق ملي ثواني ومن أحداث ويندوز (صحيان Modern Standby و Winlogon 7001 في نفس الثانية)، وتمنعها بـ mutex اسمه مشتق من فولدر البيانات، ورقم البروسس في كل سطر لوج.`,
          out: R`النسخة التانية بتطبع [[another instance owns Local\vpnlab-... -> exiting]] وكود 3، واللوج كل سطر فيه [[[gui 46764]]].`,
          desc: R`الاتصال بيقع كل شوية والنفق نفسه سليم. اللوج فيه سطرين [[connected]] **بفرق ٥ ملي ثانية**، وخطأ [[FwpmSubLayerAdd0: already exists]] (قاعدة جدار ويندوز اتعملت مرتين)، و [[No such host is known]] وقت تحديث عنوان السيرفر.

التضييق: [[Get-ScheduledTaskInfo]] بتاع مهمة التشغيل التلقائي قال [[LastRunTime]] 18:01 والجهاز مقلعش الساعة دي. [[Get-WinEvent]] على System log: الجهاز **خرج من Modern Standby** (Kernel-Power 507) و **Winlogon 7001** (logon) في نفس الثانية. و [[Get-Process]] بـ [[StartTime]]، وعدد النسخ من [[Win32_Process]]: نسختين.

السبب: مهمة Task Scheduler عندها [[LogonTrigger]] بتأخير ٢٠ ثانية، وويندوز بيرفع حدث logon لما الجهاز يصحى من Modern Standby (حتى من غير ما تكتب باسورد أحيانًا)، فاشتغلت نسخة أدمن تانية جنب نسخة الـ tray، والاتنين كتبوا قواعد جدار و routes فوق بعض.

الحل: **mutex** اسمه مشتق من فولدر البيانات (النسخة اللي تتأخر تقفل نفسها)، وطلب إظهار نافذة النسخة الشغّالة بدل نسخة جديدة ([[ChangeWindowMessageFilterEx]] عشان UIPI يسمح لنسخة مش أدمن تكلّم نسخة أدمن)، ورقم العملية في كل سطر لوج ([[[gui 8940]]]) وسطر [[processes:]] في تقرير التشخيص. البديل المرفوض: النسخة الجديدة تقتل القديمة (ممكن تكون متصلة وشغّالة).`,
          example: R`# Windows (PowerShell): قراية بس
Get-ScheduledTaskInfo -TaskPath '\' -TaskName LabVPN | Select-Object LastRunTime, LastTaskResult
Get-WinEvent -FilterHashtable @{LogName='System'; ProviderName='Microsoft-Windows-Kernel-Power'; Id=506, 507} -MaxEvents 4 | Select-Object TimeCreated, Id
Get-WinEvent -FilterHashtable @{LogName='System'; Id=7001} -MaxEvents 4 | Select-Object TimeCreated, ProviderName
Get-CimInstance Win32_Process -Filter "Name='labvpn.exe'" | Select-Object ProcessId, ParentProcessId, CreationDate, CommandLine
$m = [Threading.Mutex]::new($false, 'Local\vpnlab-15def59f1ad147c0'); $m.WaitOne(0)
# Linux (and WSL): نفس الفكرة
flock -n 9 || exit 3`,
          lines: [
            R`مهمة التشغيل التلقائي اشتغلت إمتى آخر مرة؟ [[-TaskPath '\']] فولدر المهام الرئيسي، و [[LastRunTime]] لو وقت مش وقت إقلاع الجهاز، يبقى حاجة تانية شغّلتها (هنا: logon بعد الصحيان). [[LastTaskResult]] 0 = خلصت من غير خطأ.`,
            R`أحداث النوم والصحيان: Kernel-Power [[506]] = «داخل Modern Standby» و [[507]] = «خارج». [[-MaxEvents 4]] آخر ٤ بس.`,
            R`أحداث الـ logon: Winlogon [[7001]] = «User Logon Notification». لو وقته بالثانية زي وقت [[507]]، يبقى الصحيان عمل logon، وأي مهمة بـ [[LogonTrigger]] هتشتغل.`,
            R`كام نسخة شغّالة دلوقتي، وكل واحدة ابن مين واتعملت إمتى؟ نسختين = المشكلة. و [[ParentProcessId]] بيفرّق نسخة الـ tray (أبوها explorer) عن نسخة المهمة (أبوها svchost بتاع Task Scheduler).`,
            R`الحل: mutex بالاسم. [[Local\]] = جوه جلسة اليوزر ده (ويندوز بيفصل بين الجلسات)، والباقي hash لفولدر البيانات. [[WaitOne(0)]] «خده لو فاضي من غير ما تستنى»: [[True]] انت الأولى، [[False]] فيه نسخة.`,
            R`نفس الفكرة في لينكس: [[flock -n]] على ملف lock مفتوح على file descriptor 9. [[-n]] = متستناش، لو مقفول اخرج.`,
          ],
          try: R`على ويندوز (من غير أدمن): شغّل [[app.ps1]] اللي في الشرح في الخلفية بفولدر بيانات، وبعد ثانيتين شغّله تاني بنفس الفولدر، وتالت مرة بفولدر تاني. واقرا أحداث 506 و 507 و 7001 على جهازك وقارن الأوقات. وفي كونتينر لينكس جرّب [[app.sh]] بدون lock وبيه بفرق ٥ ملي ثانية.`,
          teach: R`## العَرَض

- الاتصال بيقع كل شوية، والنفق نفسه (السيرفر والـ routes) سليم.
- اللوج فيه:

~~~text اللوج (من الحالة الأصلية)
18:01:23.412 connected
18:01:23.417 connected
... FwpmSubLayerAdd0: already exists
... No such host is known
~~~

سطرين [[connected]] بفرق **٥ ملي ثانية**: مفيش برنامج بيتصل مرتين في ٥ ملي ثانية. ده برنامجين. و [[FwpmSubLayerAdd0: already exists]] (WFP: طبقة قواعد جدار ويندوز) = حد عمل نفس القاعدة قبله. و [[No such host is known]] وقت ما نسخة بتحدّث عنوان السيرفر والتانية غيّرت الـ DNS.

---

## التضييق

### ١. اللوج: مين كتب السطر ده؟

اللوج مكانش فيه رقم البروسس، فمكانش ينفع تعرف. أول إصلاح (قبل أي تشخيص): كل سطر فيه [[[gui 8940]]] أو [[[task 9120]]]. بعدها اتأكد: رقمين مختلفين.

### ٢. حاجة شغّلت نسخة تانية إمتى؟

~~~text Get-ScheduledTaskInfo (مهمة الأداة، الحالة الأصلية)
LastRunTime : 18:01:03
~~~

والجهاز مقلعش 18:01. المهمة عندها [[LogonTrigger]] بتأخير [[PT20S]]: يعني logon حصل 18:00:43 تقريبًا. إزاي logon من غير ما حد يدخل؟

### ٣. أحداث ويندوز

على الجهاز ده (ويندوز ١١، قراية بس):

~~~text Get-WinEvent ... Kernel-Power Id=506,507
TimeCreated           Id Msg
-----------           -- ---
11/3/2026 9:15:16 AM 507 The system is exiting Modern Standby …
11/3/2026 9:15:14 AM 506 The system is entering Modern Standby …
~~~

~~~text Get-WinEvent ... Id=7001
TimeCreated          ProviderName                 Id Msg
-----------          ------------                 -- ---
11/3/2026 9:15:16 AM Microsoft-Windows-Winlogon 7001 User Logon Notification for Customer Experience Improvement Program
~~~

**نفس الثانية**: الجهاز خرج من Modern Standby (9:15:16) وويندوز سجّل logon (9:15:16). Modern Standby (S0 low power) مش shutdown، والبرامج كلها لسه شغّالة، فنسخة الـ tray لسه موجودة. والـ logon الجديد شغّل المهمة: **نسخة تانية**.

### ٤. كام نسخة؟

~~~powershell
Get-CimInstance Win32_Process -Filter "Name='labvpn.exe'" | Select-Object ProcessId, ParentProcessId, CreationDate
Get-Process labvpn | Select-Object Id, StartTime
~~~

نسختين: واحدة [[StartTime]] بتاعها من الصبح (الـ tray)، وواحدة من 18:01 (المهمة، أبوها svchost بتاع Task Scheduler، وشغّالة أدمن لأن المهمة [[RunLevel Highest]]).

---

## المعمل ١: سباق نسختين (لينكس)

~~~bash app.sh
#!/usr/bin/env bash
# app.sh: نسخة من الأداة. LOCK=1 = قفل نسخة واحدة
log(){ echo "$(date +%T.%3N) [$1 $$] $2"; }
if [ "$LOCK" = 1 ]; then
  exec 9>/run/vpnlab.lock
  flock -n 9 || { log "$2" "another instance holds /run/vpnlab.lock -> exiting"; exit 3; }
fi
log "$2" "connected"
ip route add 0.0.0.0/1 via 10.255.0.1 dev vpnlab0 onlink 2>&1 | sed "s/^/$(date +%T.%3N) [$2 $$] /"
sleep 2
~~~

~~~text من غير lock: O bash app.sh x tray & sleep 0.005; O bash app.sh x task
10:22:18.267 [tray 4568] connected
10:22:18.273 [task 4574] connected
10:22:18.274 [task 4574] RTNETLINK answers: File exists
~~~

~~~text بـ lock
10:22:20.285 [tray 4583] connected
10:22:20.290 [task 4589] another instance holds /run/vpnlab.lock -> exiting
exit=3
~~~

نفس شكل الحالة الحقيقية: سطرين [[connected]] بفرق ٦ ملي ثانية، والتانية بتلاقي حاجة [[File exists]] (هنا route، وهناك [[FwpmSubLayerAdd0: already exists]]).

| الحتة | معناها |
|---|---|
| [[exec 9>/run/vpnlab.lock]] | افتح الملف على file descriptor رقم 9 طول عمر السكربت |
| [[flock -n 9]] | خد قفل على الـ fd ده، و [[-n]] متستناش: لو حد ماسكه ارجع فشل على طول |
| [[exit 3]] | كود مميّز: «فيه نسخة تانية»، غير أي خطأ تاني |
| قفل بيتساب لوحده | لما البروسس يموت (حتى [[kill -9]]) الـ fd بيتقفل والقفل بيروح. مفيش ملف «قديم» يعلّقك |

---

## المعمل ٢: mutex على ويندوز (من غير أدمن)

~~~powershell app.ps1
param($DataDir)
$sha  = [Security.Cryptography.SHA256]::Create()
$hash = -join ($sha.ComputeHash([Text.Encoding]::UTF8.GetBytes($DataDir.ToLowerInvariant()))[0..7] | ForEach-Object { $_.ToString('x2') })
$name = "Local\vpnlab-$hash"
$m = [Threading.Mutex]::new($false, $name)
$got = try { $m.WaitOne(0) } catch [Threading.AbandonedMutexException] { $true }
$tag = "[gui $PID]"
if (-not $got) { "$(Get-Date -f HH:mm:ss.fff) $tag another instance owns $name -> exiting"; exit 3 }
"$(Get-Date -f HH:mm:ss.fff) $tag owns $name, connecting"
Start-Sleep 6
$m.ReleaseMutex(); "$(Get-Date -f HH:mm:ss.fff) $tag released"
~~~

~~~text الناتج (ويندوز ١١، pwsh 7.6): نسخة في الخلفية بـ C:\Lab\Data، وبعدها بثانيتين نسخة بنفس الفولدر، وبعدها نسخة بفولدر تاني
12:21:56.300 [gui 42612] another instance owns Local\vpnlab-15def59f1ad147c0 -> exiting
exit=3
12:21:56.706 [gui 46248] owns Local\vpnlab-a59a03e822d3422e, connecting
12:22:02.720 [gui 46248] released
exit=0
12:21:54.333 [gui 46764] owns Local\vpnlab-15def59f1ad147c0, connecting
12:22:00.349 [gui 46764] released
~~~

| الحتة | ليه |
|---|---|
| hash لفولدر البيانات | نسختين **بفولدرين مختلفين** (نسخة portable للتجربة مثلًا) مش بيمنعوا بعض، ونسختين بنفس البيانات بيمنعوا |
| [[ToLowerInvariant()]] | [[C:\Lab\Data]] و [[c:\lab\data]] نفس الفولدر في ويندوز، فلازم نفس الاسم |
| [[Local\]] | الـ mutex جوه جلسة اليوزر. [[Global\]] بيعدّي الجلسات (محتاج صلاحيات وغالبًا مش اللي انت عايزه) |
| [[AbandonedMutexException]] | لو النسخة اللي كانت ماسكاه ماتت من غير ما تسيبه **وانت كنت فاتحه ومستني**، [[WaitOne]] بيرمي [[The wait completed due to an abandoned mutex.]]، بس انت **خدته**. فبنعتبره نجاح. (ولو محدش كان فاتحه، الـ mutex بيختفي مع آخر handle والجديد بياخد [[True]] عادي: اتجرّبوا الاتنين) |
| [[$PID]] في كل سطر | عشان أي لوج بعد كده يقولك مين قال إيه |

### النسخة التانية تعمل إيه بدل ما تقفل وخلاص؟

تبعت للنسخة الشغّالة «اظهر» (رسالة لنافذتها)، عشان المستخدم اللي داس على الأيقونة يشوف حاجة. والمشكلة: نسخة المهمة أدمن ونسخة الـ tray مش أدمن (أو العكس)، و UIPI بيمنع برنامج مستوى أقل يبعت رسايل لنافذة مستوى أعلى. الحل (من الوثائق): النسخة الأعلى تنادي [[ChangeWindowMessageFilterEx]] على نافذتها بالرسالة دي بالذات عشان تسمح بيها.

---

## البدايل اللي اترفضت

| البديل | ليه لأ |
|---|---|
| النسخة الجديدة تقتل القديمة | القديمة ممكن تكون متصلة وشغّالة، والقتل بيسيب routes وقواعد (قضية «عملية يتيمة و routes») |
| تشيل [[LogonTrigger]] | التشغيل التلقائي بعد الإقلاع هو المطلوب أصلًا |
| [[tasklist]] في الأول «لو فيه نسخة اخرج» | سباق: النسختين بيبصّوا في نفس الملي ثانية ومحدش شايف التاني. الـ mutex ذرّي (atomic) |
| ملف [[app.pid]] | لو البرنامج مات غصب الملف بيفضل، والتشغيل الجاي يفتكر فيه نسخة. والـ mutex والـ flock بيتسابوا لوحدهم |
| تخلّي المهمة تشتغل مرة واحدة في اليوم | الصحيان ممكن يحصل ١٠ مرات في اليوم والمشكلة في أي واحدة |

## اتأكد، ومتتكررش

- اقفل غطا اللابتوب دقيقة وافتحه، وبعد ٣٠ ثانية: [[(Get-Process labvpn).Count]] = 1، واللوج فيه سطر [[another instance ... -> exiting]] من رقم تاني.
- تقرير التشخيص فيه سطر [[processes: labvpn 8940 (started 09:02, parent explorer)]] لكل نسخة.
- كل سطر لوج فيه [[[role PID]]] من أول يوم، مش بعد ما المشكلة تحصل.
- يربط بدرس Modern Standby في تاب cmd ([[powercfg /a]] بيقولك الجهاز بيدعم [[S0 Low Power Idle]]).`,
          deep: {
            why: R`أي برنامج بيغيّر حالة مشتركة (routes، أو جدار، أو ملف إعدادات) لازم يضمن إنه الوحيد. ومصادر التشغيل كتير: اختصار، و startup، و مهمة مجدولة، و «فتح ملف مربوط بالبرنامج»، والمستخدم بيدوس مرتين. والصحيان من Modern Standby بيضيف مصدر مش متوقع لأن الجهاز «مقفلش» من وجهة نظرك.`,
            how: R`الـ mutex الـ named في ويندوز object في الكيرنل باسم في namespace الجلسة ([[Local\]]) أو العام ([[Global\]])، وأول [[WaitOne]] بيمسكه بشكل ذرّي، وبيتساب لما الـ handle يتقفل (حتى لو البروسس مات، ووقتها التالي بياخد [[AbandonedMutexException]]). و [[flock]] في لينكس قفل على الـ open file description، وبيروح لما آخر fd عليه يتقفل. و Modern Standby (S0ix) الجهاز فيه شغّال بطاقة قليلة، والخروج منه بيعمل unlock/logon notification يسجّلها Winlogon (7001)، والمهام بـ [[LogonTrigger]] بتتعامل معاه كـ logon. و UIPI (User Interface Privilege Isolation) بيمنع رسايل النوافذ من integrity أقل لأعلى إلا اللي اتسمح بيها بـ [[ChangeWindowMessageFilterEx]].`,
            when: R`أي tray app، أو أداة بتغيّر الشبكة، أو agent، أو سكربت cron/timer ممكن يتداخل مع نفسه (لو التشغيل خد أطول من الفترة). وأي لوج فيه نفس الحدث مرتين بفرق ملي ثواني، أو [[already exists]] من أمر انت متأكد إنه بيتعمل مرة واحدة.`,
            mistakes: R`تفحص بـ [[tasklist]] وتفتكر إنه قفل. وتستخدم ملف pid من غير ما تتأكد إن البروسس اللي فيه لسه هو. وتعمل الـ mutex باسم ثابت فنسخة التجربة تمنع النسخة الأساسية. وتنسى [[ToLowerInvariant]] فـ [[C:\Lab]] و [[c:\lab]] يبقوا نسختين. وتعمل [[Global\]] من غير داعي. وتقتل النسخة القديمة. وتكتب لوج من غير رقم البروسس فمتعرفش إن فيه اتنين أصلًا. وتنسى [[ReleaseMutex]] في [[finally]] (مش كارثة لأنه بيتساب مع الموت، بس أي نسخة كانت مستنياه هتاخد [[AbandonedMutexException]] ولو مش ماسكاه بـ catch هتقع).`
          },
          sol: R`ويندوز 11 (من غير أدمن): [[app.ps1]] بـ [[C:\Lab\Data]] في الخلفية ([[46764]] أخد [[Local\vpnlab-15def59f1ad147c0]])، والتانية بنفس الفولدر [[42612 ... -> exiting]] و [[exit=3]]، والتالتة بـ [[C:\Lab\Other]] أخدت [[Local\vpnlab-a59a03e822d3422e]] و [[exit=0]]. أحداث 506 و 507 و 7001 اتقريت فعلًا (507 و 7001 في نفس الثانية 9:15:16). [[Get-ScheduledTaskInfo]] اتجرّب على مهمة ويندوز مدمجة (قراية بس). المعمل ([[ubuntu:24.04]]): من غير lock سطرين [[connected]] بفرق ٦ ملي ثانية و [[RTNETLINK answers: File exists]]، وبالـ lock [[another instance holds /run/vpnlab.lock -> exiting]] و [[exit=3]].

نصوص [[FwpmSubLayerAdd0: already exists]] و [[No such host is known]] ووقت 18:01 والتأخير ٢٠ ثانية من لوج الحالة الأصلية. [[ChangeWindowMessageFilterEx]] و UIPI و [[LogonTrigger]] من وثائق Microsoft.`,
          practice: [
            { lvl: 'سريع', t: R`من غير ما تبص: ليه سطرين [[connected]] بفرق ٥ ملي ثانية دليل على نسختين؟ وإيه الحدثين في System log اللي بيثبتوا إن الصحيان هو اللي شغّل النسخة التانية؟`, done: R`برنامج واحد مبيتصلش مرتين في ٥ ملي ثانية، والحدثين Kernel-Power [[507]] و Winlogon [[7001]] في نفس الثانية ومعاهم [[LastRunTime]] للمهمة بعدهم بـ ٢٠ ثانية.` },
            { lvl: 'تطبيق', t: R`دوّر بنفسك على جهازك (قراية بس): آخر ٥ مرات الجهاز صحي من Modern Standby، ولكل واحدة هل فيه 7001 في نفس الدقيقة. اعمل جدول بالأوقات.`, done: R`عندك جدول فيه ٥ صفوف (507 و 7001 جنب بعض)، أو كاتب إن جهازك مبيدعمش Modern Standby ومعاك سطر [[powercfg /a]] اللي بيقول كده.` },
            { lvl: 'تطبيق', t: R`اقرا وتوقّع: (أ) النسخة الأولى ماسكة الـ mutex واتقفلت بـ [[Stop-Process -Force]]، وبعدها نسخة جديدة عملت [[WaitOne(0)]]. (ب) نسخة تانية كانت **مستنية** بـ [[WaitOne(15000)]] من غير catch وقت ما الأولى اتقتلت. كل واحدة هتطبع إيه؟ جرّب الاتنين.`, done: R`(أ) [[True]] من غير أي خطأ: محدش كان فاتح الـ mutex غير الأولى، فلما ماتت الـ object نفسه اتشال، والجديدة عملت واحد جديد. (ب) [[MethodInvocationException: The wait completed due to an abandoned mutex.]]، ومع [[catch [Threading.AbandonedMutexException]]] بيتمسك ويعتبر نفسه خده. وكاتب إن Abandoned بيحصل بس لو حد تاني كان ماسك handle وقت الموت.` },
            { lvl: 'تطبيق', t: R`صلّح الكود: [[if (Get-Process labvpn -ErrorAction SilentlyContinue) { exit 3 }; Start-Connection]]. اكتب السيناريو اللي بيعدّي فيه نسختين، والنسخة الصح بالـ mutex.`, done: R`السيناريو: النسختين بيعملوا [[Get-Process]] في نفس الوقت والاتنين شايفين نفسهم بس (أو التانية شايفة الأولى وهي نفسها كمان [[labvpn]] فبتخرج حتى لو لوحدها!). والنسخة الصح بـ [[Threading.Mutex]] و [[WaitOne(0)]]، واتجرّبت بتشغيلين بفرق ثانية.` },
            { lvl: 'تحدي', t: R`ابني [[Use-SingleInstance]] كدالة: بترجع object فيه [[Owned]] و [[Name]]، وبتكتب في لوج مشترك [[instance PID started/blocked/released]]، و [[Remove-SingleInstance]] في [[finally]]. واختبرها بـ ٥ نسخ بتتشغّل مع بعض بـ [[Start-Process]].`, done: R`من الـ ٥ واحدة بس [[Owned=True]] والـ ٤ [[blocked]] في اللوج بأرقامهم، وبعد ما الأولى تخلص تشغيل جديد بياخده، ومفيش ولا [[AbandonedMutexException]] من غير catch.` },
            { lvl: 'تحدي', t: R`اشرحها: اكتب لزميل في ٥ سطور ليه «اقتل النسخة القديمة» حل وحش، مستخدم قضية «عملية يتيمة و routes».`, done: R`فيه: القديمة ممكن تكون متصلة (المستخدم بيقطع)، والقتل بيسيب routes وقواعد جدار ورا، والجديدة هتلاقي [[already exists]]، والصح النسخة الجديدة هي اللي تمشي وتطلب من القديمة تظهر.` },
          ],
          ci: [
            { os: [R`ubuntu`], sh: R`bash`, run: R`cat > app.sh <<'SH'
exec 9>"$PWD/app.lock"
flock -n 9 || { echo "[$1 $$] another instance holds the lock -> exiting"; exit 3; }
echo "[$1 $$] owns the lock"
sleep 2
SH
bash app.sh tray & sleep 0.3
bash app.sh task; echo "task exit=$?"
wait
bash app.sh later`, expect: [R`[tray`, R`owns the lock`, R`another instance holds the lock -> exiting`, R`task exit=3`, R`[later`] },
            { os: [R`windows`], sh: R`pwsh`, run: R`@'
param($DataDir)
$sha  = [Security.Cryptography.SHA256]::Create()
$hash = -join ($sha.ComputeHash([Text.Encoding]::UTF8.GetBytes($DataDir.ToLowerInvariant()))[0..7] | ForEach-Object { $_.ToString('x2') })
$m = [Threading.Mutex]::new($false, "Local\vpnlab-$hash")
$got = try { $m.WaitOne(0) } catch [Threading.AbandonedMutexException] { $true }
if (-not $got) { "blocked: another instance owns vpnlab-$hash"; exit 3 }
"owner: vpnlab-$hash"; Start-Sleep 5; $m.ReleaseMutex()
'@ | Set-Content app.ps1
$a = Start-Process pwsh -ArgumentList '-NoProfile', '-File', "$PWD\app.ps1", 'C:\Lab\Data' -WindowStyle Hidden -PassThru
Start-Sleep 2
pwsh -NoProfile -File .\app.ps1 'c:\lab\DATA'; "second exit=$LASTEXITCODE"
pwsh -NoProfile -File .\app.ps1 'C:\Lab\Other'; "other exit=$LASTEXITCODE"
$a.WaitForExit()`, expect: [R`blocked: another instance owns vpnlab-15def59f1ad147c0`, R`second exit=3`, R`owner: vpnlab-a59a03e822d3422e`, R`other exit=0`], timeout: 90 },
          ],
        },
        {
          cmd: "GOMEMLIMIT والـ CPU",
          title: R`رام الـ proxy 717 MB فحطّينا GOMEMLIMIT=256MiB: الـ CPU طلع 1250% والتنزيل 68 KB/s`,
          learn: R`تقيس CPU% ورام بروسس من غير Task Manager، وتفهم ليه سقف ذاكرة أقل من الـ live heap بيخلي الـ GC يشتغل طول الوقت، وتدوّر على **مصدر** الرام (هنا جدول بيتحمّل كله) بدل السقف.`,
          out: R`جدول من برنامج Go: من غير سقف [[gc_runs=104]] و [[8287 MB/s]]، وبسقف أقل من الـ heap [[gc_runs=15381]] و [[461 MB/s]]، وبعد ما الجدول صغر [[10117 MB/s]] من غير سقف خالص.`,
          desc: R`رام Xray كانت 717 MB، فحطّينا [[GOMEMLIMIT=256MiB]] عشان «نحدّها». النتيجة: CPU **1,252%** (يعني ١٢ core تقريبًا) والتنزيل نزل لـ 68 KB/s. السقف خلّى الـ garbage collector يشتغل طول الوقت: كل ما الـ heap يقرب من 256 يجمع، والـ heap الحي (البيانات اللي لسه مستخدمة) أصلًا أكبر من كده، فمفيش حاجة يرميها، فيرجع يجمع تاني.

القياس: [[$p = Get-Process xray; $a = $p.TotalProcessorTime.TotalSeconds; Start-Sleep 5; $p.Refresh(); (($p.TotalProcessorTime.TotalSeconds - $a) / 5) * 100]] = CPU% (١٠٠ = core واحد كامل)، و [[$p.WorkingSet64 / 1MB]] = الرام.

السبب الحقيقي للرام: قاعدة توجيه [[geoip:private]] كانت بتحمّل ملف [[geoip.dat]] كله (كل دول العالم) في الرام عشان تطلع منه كام شبكة خاصة. الحل: قايمة CIDR صريحة ([[10.0.0.0/8]] و [[172.16.0.0/12]] و [[192.168.0.0/16]] ...) بدل [[geoip:private]]. الدرس: سقف أقل من الاستهلاك الفعلي بيحوّل الرام لـ CPU، فعالج مصدر الاستهلاك مش السقف.`,
          example: R`# Windows (PowerShell):
$p = Get-Process xray; $a = $p.TotalProcessorTime.TotalSeconds; Start-Sleep 5; $p.Refresh()
"{0:N0}% CPU, {1:N0} MB" -f ((($p.TotalProcessorTime.TotalSeconds - $a) / 5) * 100), ($p.WorkingSet64 / 1MB)
# Linux (and WSL): المعمل
./gclab
GOMEMLIMIT=256MiB ./gclab
GOMEMLIMIT=256MiB TABLE_MB=20 ./gclab
GODEBUG=gctrace=1 GOMEMLIMIT=256MiB ./gclab 2>&1 | head -3`,
          lines: [
            R`[[TotalProcessorTime]] مجموع وقت المعالج اللي البروسس خده من أول ما بدأ (كل الـ cores مع بعض). نصوّره، ونستنى ٥ ثواني، و [[Refresh()]] يحدّث نفس الـ object بالقيم الجديدة.`,
            R`الفرق ÷ ٥ ثواني × ١٠٠ = CPU%. ١٠٠ = core واحد مشغول طول الوقت، و ١٢٥٠ = حوالي ١٢ core ونص. ([[Task Manager]] بيقسم على عدد الـ cores فبيطلع رقم أصغر.) و [[WorkingSet64]] الرام اللي البروسس ماسكها فعلًا بالبايت، و [[/ 1MB]] ميجا.`,
            R`في المعمل: البرنامج من غير سقف. بيمسك جدول 400 MB في الرام (زي [[geoip.dat]] كله) وبيعمل «شغل» ٥ ثواني (يحجز buffer مؤقت 32KB لكل باكت)، وبيطبع عدد مرات الـ GC والشغل المنجز.`,
            R`نفس البرنامج بسقف 256MiB، أقل من الجدول اللي لازم يفضل في الرام.`,
            R`نفس السقف، بس الجدول بقى 20 MB (اللي محتاجينه بس، زي قايمة CIDR بدل الملف كله).`,
            R`[[GODEBUG=gctrace=1]] بيخلي Go يطبع سطر على stderr مع كل GC: رقمه، والوقت، والـ heap قبل وبعد، والهدف. أول ٣ سطور كفاية تشوف قد إيه بيتكرر.`,
          ],
          try: R`في كونتينر [[golang:1.23-alpine]] ابني [[gclab]] اللي في الشرح، وشغّله ٤ مرات: من غير سقف، و [[GOMEMLIMIT=256MiB]]، و [[GOMEMLIMIT=512MiB]]، و [[TABLE_MB=20]] مع [[256MiB]]. حط [[gc_runs]] و [[cpu]] و [[throughput]] في جدول. وبعدين امسح الـ image.`,
          teach: R`## العَرَض

- رام Xray: **717 MB**. كتير لأداة proxy.
- «الحل»: [[GOMEMLIMIT=256MiB]] (متغير بيئة بيقول لـ Go: حاول متعدّيش الرقم ده).
- بعدها: CPU **1,252%** والتنزيل **68 KB/s** (قبلها كان ميجات).

السقف «نجح» في الرام وكسر كل حاجة تانية.

---

## القياس الأول، من غير Task Manager

~~~powershell
$p = Get-Process xray; $a = $p.TotalProcessorTime.TotalSeconds; Start-Sleep 5; $p.Refresh()
"{0:N0}% CPU, {1:N0} MB" -f ((($p.TotalProcessorTime.TotalSeconds - $a) / 5) * 100), ($p.WorkingSet64 / 1MB)
~~~

اتجرّب على بروسس pwsh مشغول بـ loop فاضي:

~~~text الناتج (ويندوز ١١)
cpu%=124
ws=112 MB
~~~

(١٢٤% = core وربع: الـ loop على core، و .NET نفسه شغّال على thread تاني.) وفي الحالة الحقيقية نفس السطر طلع **1,252%** بعد السقف.

| الرقم | إيه هو | مش إيه |
|---|---|---|
| [[TotalProcessorTime]] | وقت المعالج اللي اتصرف على البروسس، كل الـ threads وكل الـ cores | مش وقت ساعة |
| الفرق ÷ ثواني × ١٠٠ | ١٠٠ لكل core مشغول | مش نسبة من الجهاز كله (Task Manager بيقسم على عدد الـ cores) |
| [[WorkingSet64]] | الصفحات اللي في الرام دلوقتي | مش كل اللي البروسس حجزه (فيه حاجات في الـ page file) |

وعلى لينكس: [[ps -o %cpu,rss -p <pid>]] (متوسط من أول البروسس، مش لحظي)، أو فرق [[/proc/<pid>/stat]] (العمودين 14 و 15) زي ما عملنا في درس «حلقة التضخيم».

---

## المعمل: برنامج Go بجدول كبير

كونتينر [[golang:1.23-alpine]] (اتشال بعد التجربة) على جهاز فيه ١٦ core:

~~~go main.go
// gclab: برنامج بيمسك جدول كبير في الرام (زي geoip.dat كله) وبيعالج "باكتس" طول الوقت
package main

import (
	"fmt"
	"os"
	"runtime"
	"syscall"
	"time"
)

var table [][]byte // البيانات اللي فاضلة في الرام طول الوقت (live heap)
var sink []byte

func cpuSeconds() float64 {
	var ru syscall.Rusage
	syscall.Getrusage(syscall.RUSAGE_SELF, &ru)
	return float64(ru.Utime.Sec+ru.Stime.Sec) + float64(ru.Utime.Usec+ru.Stime.Usec)/1e6
}

func main() {
	mb := 400
	if os.Getenv("TABLE_MB") != "" {
		fmt.Sscan(os.Getenv("TABLE_MB"), &mb)
	}
	for i := 0; i < mb; i++ {
		b := make([]byte, 1<<20)
		b[0] = byte(i)
		table = append(table, b)
	}
	start, c0 := time.Now(), cpuSeconds()
	var m0 runtime.MemStats
	runtime.ReadMemStats(&m0)
	done := 0
	for time.Since(start) < 5*time.Second { // "ترافيك": كل باكت buffer مؤقت 32KB
		sink = make([]byte, 32<<10)
		sink[0] = table[done%len(table)][0]
		done++
	}
	var m runtime.MemStats
	runtime.ReadMemStats(&m)
	wall := time.Since(start).Seconds()
	fmt.Printf("table=%dMB GOMEMLIMIT=%s heap=%dMB gc_runs=%d cpu=%.0f%% throughput=%.0f MB/s\n",
		mb, os.Getenv("GOMEMLIMIT"), m.HeapAlloc>>20, m.NumGC-m0.NumGC,
		(cpuSeconds()-c0)/wall*100, float64(done)*32/1024/wall)
}
~~~

| الحتة | بتمثّل إيه |
|---|---|
| [[table]] | الـ live heap: بيانات لازم تفضل (جدول [[geoip.dat]]). الـ GC مش هيقدر يرميها مهما اشتغل |
| [[sink = make(...)]] | الترافيك: buffer مؤقت لكل باكت بيتساب على طول. ده الزبالة اللي الـ GC بيجمعها |
| [[m.NumGC - m0.NumGC]] | كام مرة الـ GC اشتغل في الخمس ثواني |
| [[Getrusage]] | وقت المعالج للبروسس كله (كل الـ threads، ومنهم الـ GC)، زي [[TotalProcessorTime]] |

~~~bash
docker run --rm -v "$PWD:/src" -w /src golang:1.23-alpine sh -c 'go mod init gclab >/dev/null 2>&1; go build -o gclab . && ./gclab && GOMEMLIMIT=256MiB ./gclab && GOMEMLIMIT=256MiB TABLE_MB=20 ./gclab && TABLE_MB=20 ./gclab'
docker rmi golang:1.23-alpine
~~~

~~~text الناتج
table=400MB GOMEMLIMIT= heap=532MB gc_runs=104 cpu=111% throughput=8287 MB/s
table=400MB GOMEMLIMIT=256MiB heap=400MB gc_runs=15381 cpu=187% throughput=461 MB/s
table=20MB GOMEMLIMIT=256MiB heap=40MB gc_runs=2459 cpu=124% throughput=10117 MB/s
table=20MB GOMEMLIMIT= heap=23MB gc_runs=2437 cpu=123% throughput=10020 MB/s
~~~

| الحالة | الـ GC | الشغل | الرام |
|---|---|---|---|
| جدول 400، من غير سقف | 104 مرة | 8287 MB/s | 532 MB |
| جدول 400، سقف 256 | **15,381 مرة** (×148) | **461 MB/s** (÷18) | 400 MB |
| جدول 20، سقف 256 | 2,459 | 10,117 MB/s | 40 MB |
| جدول 20، من غير سقف | 2,437 | 10,020 MB/s | 23 MB |

- السقف «وفّر» 132 MB بس (532 ← 400)، لأن الـ 400 دول لازم يفضلوا. ودفع تمنهم الشغل **÷18**.
- لما الجدول صغر، السقف بقى مالوش أثر (الـ heap أصلًا تحته)، والشغل أحسن من الأصل.
- الـ CPU في المعمل طلع 187% مش 1250% لأن البرنامج ده فيه thread شغل واحد، والـ GC في Go بياخد لحد ٥٠% تقريبًا من الـ CPU لما يكون محصور بالسقف. Xray فيه threads كتير بتعمل allocation، فكل الـ cores اتشغلت.

---

## ليه السقف عمل كده؟

[[GOMEMLIMIT]] مش «ممنوع تعدّي». ده «لما تقرب منه، اجمع زبالة أكتر». الـ GC بيشتغل لما الـ heap يوصل لهدف، والهدف عادةً ضعف الـ live heap ([[GOGC=100]]). مع السقف، الهدف بيبقى **السقف** لو أقل. فلو الـ live heap (400) أكبر من السقف (256)، الهدف اتعدّى من الأول، فالـ GC بيشتغل على طول، ويخلص من غير ما يلاقي حاجة كبيرة يرميها (الجدول لازم يفضل)، وأول buffer جديد يعدّي الهدف تاني. ده اسمه **GC death spiral**، و Go بيحد الـ GC بحوالي ٥٠% من الـ CPU عشان البرنامج ميقفش خالص، بس حتى كده الشغل بيقع.

---

## السبب الحقيقي للـ 717 MB

قاعدة في إعداد التوجيه:

~~~json
{ "type": "field", "outboundTag": "direct", "ip": ["geoip:private"] }
~~~

[[geoip:private]] معناها «الشبكات الخاصة من ملف [[geoip.dat]]». و Xray لما يشوف [[geoip:]] بيحمّل الملف (فيه كل دول العالم) ويطلع منه الجزء ده. والحل: القايمة نفسها صريحة:

~~~json
{ "type": "field", "outboundTag": "direct",
  "ip": ["10.0.0.0/8", "172.16.0.0/12", "192.168.0.0/16", "169.254.0.0/16", "fc00::/7"] }
~~~

(وخلي بالك: [[10.255.0.0/24]] بتاع الكارت و multicast لازم يتمسكوا قبلها بقاعدة [[block]]: درس «حلقة التضخيم» في تاب net. القضيتين حصلوا في نفس الأسبوع على نفس الأداة.)

---

## البدايل اللي اترفضت

| البديل | ليه لأ |
|---|---|
| [[GOMEMLIMIT]] أقل من الاستهلاك | ده اللي عمل المشكلة |
| [[GOMEMLIMIT]] أعلى من الـ live heap بهامش | مقبول كشبكة أمان، بس مبيصغّرش الـ 717 |
| [[GOGC=50]] | الـ GC أكتر والرام أقل شوية، والجدول لسه موجود |
| Job Object بسقف رام على ويندوز | البرنامج يقع لما يوصل للسقف بدل ما يبطّأ |
| Restart كل ساعة | بيخبّي المشكلة ويقطع المستخدمين |

## اتأكد، ومتتكررش

- بعد ما شلت [[geoip:private]]: [[WorkingSet64]] نزل لعشرات الميجات، والـ CPU في الراحة قريب من صفر، والتنزيل رجع.
- قيس الـ live heap الأول (في Go: [[runtime.ReadMemStats]] و [[HeapAlloc]] بعد GC، أو [[pprof]]) قبل ما تفكر في أي سقف.
- السقف لو موجود: فوق الـ live heap بهامش (مثلًا ×1.5)، ومعاه مراقبة لـ [[gc_runs]] أو CPU في الراحة.
- يربط بدرس [[GOMEMLIMIT]] في تاب go.`,
          deep: {
            why: R`السقف بيعالج الرقم اللي في Task Manager، مش السبب. ولو السبب بيانات لازم تفضل في الرام، السقف بيحوّل «رام كتير» لـ «CPU كتير وشغل قليل»، وده أسوأ بكتير للمستخدم. والسؤال الصح: الرام دي **فيها إيه**، ومحتاجينها كلها؟`,
            how: R`GC في Go concurrent: بيبدأ دورة لما الـ heap يوصل لهدف، والهدف = live heap × (1 + GOGC/100)، أو [[GOMEMLIMIT]] لو أقل. مع سقف تحت الـ live heap، كل allocation صغيرة بتعدّي الهدف فبتبدأ دورة. و Go بيحط حد (حوالي ٥٠% من وقت الـ CPU في نافذة زمنية) للـ GC تحت السقف عشان البرنامج ميتجمدش، والباقي بيتقسم على threads البرنامج اللي هي كمان بتساعد في الـ GC (mark assist) لما تعمل allocation، وده اللي بيبطّأ الشغل. و [[runtime.MemStats.NumGC]] عدّاد الدورات، و [[GODEBUG=gctrace=1]] سطر لكل دورة.`,
            when: R`أي برنامج Go (أو Java بـ [[-Xmx]]، أو Node بـ [[--max-old-space-size]]) الرام بتاعه كبيرة وحد عايز «يحدّها». وأي CPU عالي ظهر فجأة بعد تغيير إعدادات ذاكرة. وكل ما حد يقول «حط limit في الـ container» على برنامج مش عارف هو شايل إيه.`,
            mistakes: R`تحط السقف من غير ما تعرف الـ live heap. وتقيس CPU من Task Manager وتقارنه بأرقام [[TotalProcessorTime]] (واحد مقسوم على الـ cores والتاني لأ). وتفتكر [[GOMEMLIMIT]] حد صارم (مش بيمنع، بيجري ورا). وتنسى إن [[geoip:]] و [[geosite:]] بيحمّلوا ملفات كاملة. وتقيس الرام لحظة واحدة (الـ GC بيخليها تطلع وتنزل)، بدل متوسط أو بعد GC.`
          },
          sol: R`المعمل ([[golang:1.23-alpine]] على ١٦ core، واتشال بعدها): [[table=400MB GOMEMLIMIT= heap=532MB gc_runs=104 cpu=111% throughput=8287 MB/s]]، و [[GOMEMLIMIT=256MiB]]: [[gc_runs=15381 cpu=187% throughput=461 MB/s]]، و [[TABLE_MB=20]] بالسقف: [[gc_runs=2459 cpu=124% throughput=10117 MB/s]]، ومن غيره [[10020 MB/s]]. وفي نسخة الـ ci (جدول 300 MB وثانيتين): [[gc_runs=53]] من غير سقف و [[gc_runs=6715]] بسقف 200MiB والشغل من [[504607]] لـ [[27349]].

قياس [[TotalProcessorTime]] اتجرّب على ويندوز 11 على بروسس pwsh مشغول ([[cpu%=124]] و [[ws=112 MB]]). أرقام 717 MB و 1,252% و 68 KB/s من الحالة الأصلية، وسلوك [[geoip:private]] من وثائق Xray وسلوك [[GOMEMLIMIT]] من وثائق Go (A Guide to the Go Garbage Collector).`,
          practice: [
            { lvl: 'سريع', t: R`من غير ما تبص: [[GOMEMLIMIT]] بيعمل إيه بالظبط؟ وليه سقف تحت الـ live heap بيرفع الـ CPU؟ جملتين.`, done: R`بيخلّي الـ GC يجمع أكتر لما الـ heap يقرب منه (مش حد صارم)، وتحت الـ live heap الـ GC بيشتغل طول الوقت ومبيلاقيش حاجة يرميها فالـ CPU بيروح عليه.` },
            { lvl: 'تطبيق', t: R`قيس على جهازك: اختار بروسس شغّال (المتصفح مثلًا) واحسب CPU% بفرق [[TotalProcessorTime]] على ١٠ ثواني، وقارنه بعمود CPU في Task Manager في نفس الوقت. اشرح الفرق برقم.`, done: R`عندك الرقمين، والفرق قريب من عدد الـ cores (مثلًا ٢٤٠% عندك = ١٥% في Task Manager على ١٦ core)، وكاتب المعادلة.` },
            { lvl: 'تطبيق', t: R`اقرا وتوقّع: في [[gclab]] بجدول 400، توقّع [[gc_runs]] والشغل لـ [[GOMEMLIMIT]] = 384MiB و 512MiB و 1GiB. اكتب التوقع وبعدين شغّل وحط جدول.`, done: R`توقعت إن 384 لسه وحش (أقل من 400)، و 512 قريب من بدون سقف، و 1GiB زي بدون سقف، والجدول طابق تقريبًا، وكاتب النقطة اللي الأداء بيقع عندها.` },
            { lvl: 'تطبيق', t: R`صلّح الإعداد ده من غير ما تحمّل ملفات geo: [[{"outboundTag": "direct", "ip": ["geoip:private", "geoip:eg"]}]] و [[{"outboundTag": "block", "domain": ["geosite:category-ads"]}]]. إيه اللي ينفع يتكتب صريح وإيه اللي محتاج الملف فعلًا؟`, done: R`[[geoip:private]] اتبدّل بقايمة CIDR صريحة، و [[geoip:eg]] و [[geosite:category-ads]] كاتب إنهم محتاجين الملف فعلًا (لستة طويلة بتتحدّث)، فالقرار: محتاجهم؟ ولو آه يتقاس الرام بيهم ومن غيرهم.` },
            { lvl: 'تحدي', t: R`زوّد [[gclab]]: thread بيطبع كل ثانية [[heap]] و [[gc_runs]] في الثانية دي و [[cpu%]] لحظي، وشغّله بسقف 256 وارسم (بالنص) الأرقام ١٠ ثواني. فين الـ death spiral باين؟`, done: R`عندك ١٠ سطور، و [[gc_runs]] في الثانية بالآلاف مع السقف والعشرات من غيره، والـ heap واقف عند ~400 مع السقف، وكاتب إن ده الشكل اللي تدوّر عليه في أي برنامج.` },
            { lvl: 'تحدي', t: R`اكتب اختبار: [[mem_test.go]] بيتأكد إن البرنامج بتاعك (gclab بقايمة صغيرة) الـ live heap بتاعه بعد التحميل أقل من 50 MB ([[runtime.GC()]] ثم [[ReadMemStats]] ثم [[HeapAlloc]]). وخليه يفشل لو حد رجّع الجدول الكبير.`, done: R`[[go test]] بيعدّي بـ [[TABLE_MB=20]] ويفشل بـ [[TABLE_MB=400]] برسالة فيها الرقم، وبيخلص في أقل من ثانيتين.` },
          ],
          ci: [
            { os: [R`ubuntu`], sh: R`bash`, run: R`cat > main.go <<'GO'
package main

import (
	"fmt"
	"os"
	"runtime"
	"time"
)

var table [][]byte
var sink []byte

func main() {
	for i := 0; i < 300; i++ {
		table = append(table, make([]byte, 1<<20))
	}
	var m0, m runtime.MemStats
	runtime.ReadMemStats(&m0)
	start, done := time.Now(), 0
	for time.Since(start) < 2*time.Second {
		sink = make([]byte, 32<<10)
		done++
	}
	runtime.ReadMemStats(&m)
	fmt.Printf("limit=%s gc_runs=%d work=%d\n", os.Getenv("GOMEMLIMIT"), m.NumGC-m0.NumGC, done)
}
GO
go build -o gclab main.go
./gclab | tee a.txt
GOMEMLIMIT=200MiB ./gclab | tee b.txt
a=$(grep -o 'gc_runs=[0-9]*' a.txt | cut -d= -f2); b=$(grep -o 'gc_runs=[0-9]*' b.txt | cut -d= -f2)
wa=$(grep -o 'work=[0-9]*' a.txt | cut -d= -f2); wb=$(grep -o 'work=[0-9]*' b.txt | cut -d= -f2)
[ "$b" -gt $((a * 10)) ] && echo "limit below live heap: gc runs x10 or more"
[ "$wb" -lt "$wa" ] && echo "and less work done"`, expect: [R`limit=200MiB gc_runs=`, R`limit below live heap: gc runs x10 or more`, R`and less work done`], timeout: 180 },
            { os: [R`windows`], sh: R`pwsh`, run: R`$p = Start-Process pwsh -ArgumentList '-NoProfile', '-Command', '$e = (Get-Date).AddSeconds(5); while ((Get-Date) -lt $e) {}' -PassThru -WindowStyle Hidden
Start-Sleep 1
$a = $p.TotalProcessorTime.TotalSeconds; Start-Sleep 2; $p.Refresh()
$cpu = (($p.TotalProcessorTime.TotalSeconds - $a) / 2) * 100
if ($cpu -ge 50) { 'busy loop uses at least half a core' } else { "cpu=$cpu" }
'{0:N0} MB' -f ($p.WorkingSet64 / 1MB) -replace '^\d[\d,]*', 'N'
$p.WaitForExit()`, expect: [R`busy loop uses at least half a core`, R`N MB`] },
          ],
        },
      ],
    }
]);
