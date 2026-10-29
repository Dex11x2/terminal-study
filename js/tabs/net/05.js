// تكملة تاب net: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/net/01.js (شرح حقول الدرس في أوله)
MORE("net", [
    {
      t: "مشروع: شبكة حقيقية جوه Docker",
      l: 3,
      time: R`حوالي ٣ ساعات`,
      goal: [
        R`تبني شبكتين وراوتر بينهم على جهازك، وتشوف كل باكت بتعدّي فين.`,
        R`تعرف ليه الرد ممكن يرجع من طريق تاني، وإمتى ده بيكسر الاتصال.`,
        R`تعمل NAT و port forwarding بإيدك، وتعرف الثغرة اللي بتتفتح لو القاعدة غلط.`,
        R`تعيد مشكلة «المواقع الصغيرة بتفتح والكبيرة بتعلّق» وتصلّحها.`,
      ],
      use: {
        net: R`ده الراوتر اللي في بيتك، والـ firewall اللي في الشركة، والـ NAT اللي ورا كل VPN — بس قدامك، وتقدر تكسره وتعيده في ثانية.`,
        prog: R`[[ports: "8080:80"]] في Docker هي DNAT. والـ VPN اللي بيقطّع التحميلات الكبيرة هو MTU. هتفهم الحاجات دي من جوه.`,
        cs: R`التوجيه، و conntrack، و NAT، و PMTUD — أربع مفاهيم من كتب الشبكات، كل واحد ليه أمر وناتج تشوفه.`,
        work: R`أي سيرفر عليه Docker هو راوتر فيه iptables. ولما حاجة «مش بتوصل»، الأوامر اللي هنا هي اللي بتلاقي السبب.`,
      },
      lab: R`docker build -t nettools - <<'EOF'
FROM alpine:3.21
RUN apk add --no-cache iproute2 iptables tcpdump curl netcat-openbsd bind-tools iputils traceroute python3
EOF`,
      projects: [
        { t: R`فرع مكتب`, what: R`زوّد شبكة تالتة [[lan-c]] براوتر تاني، وخلي [[pc-a]] يوصل لها عن طريق الراوترين. واطبع [[traceroute]] — لازم تشوف خطوتين.` },
        { t: R`firewall بقواعد صريحة`, what: R`على الراوتر: [[FORWARD DROP]]، واسمح بـ HTTP بس من [[lan-a]] لـ [[lan-b]]، واسمح بالردود. وجرّب كل حاجة تانية تتمنع، واقرا النوع من الرسالة (درس «اقرا الفشل»).` },
        { t: R`VPN صغير`, what: R`ركّب WireGuard بين [[pc-a]] و [[web-b]] فوق المعمل ده (درس WireGuard في نفس التاب)، وشوف بـ [[tcpdump]] على الراوتر إن كل اللي بيعدّي UDP مشفّر. وبعدين صغّر MTU وشوف الـ black hole.` },
      ],
      n: R`كل الأوامر هنا اتشغّلت على Docker 29.6 (Docker Desktop على ويندوز، من Git Bash)، والناتج منسوخ — بما فيه المفاجآت. والأسماء متألفة: [[pc-a]] و [[router]] و [[web-b]]`,
      items: [
        {
          cmd: "شبكتين وراوتر في النص",
          title: "ابني الشبكة، وشوف الباكت بتعدّي فين",
          learn: R`تعمل شبكتين، وراوتر عليهم الاتنين، وتضيف طريق، وتتفرج على الباكت بـ tcpdump.`,
          out: R`معمل شبكة شغّال بتلات أجهزة، تكسره وتعيده بأمرين.`,
          use: {
            net: R`[[ip route]] و [[ip_forward]] و [[traceroute]] — الحاجات اللي بتخلي أي راوتر راوتر.`,
            prog: R`الكونتينر بتاعك بيوصل للداتابيز عن طريق نفس الآلية دي بالظبط. Docker بس بيعملها لوحده.`,
          },
          desc: R`المعمل كله تلات كونتينرات:

| الجهاز | الشبكة | العنوان |
|---|---|---|
| [[pc-a]] | [[lan-a]] | [[10.10.1.10]] |
| [[router]] | الاتنين | [[10.10.1.254]] و [[10.10.2.254]] |
| [[web-b]] | [[lan-b]] | [[10.10.2.20]] — وعليه سيرفر ويب |

**والراوتر مجرد كونتينر عليه شبكتين، و [[ip_forward=1]].** ده كل الفرق بين جهاز وراوتر: الكيرنل بيقبل يعدّي باكتات مش ليه.

**أول محاولة: [[--internal]] ومفيش طريق.**

[[ping: connect: Network unreachable]]

ودي رسالة جاية من [[pc-a]] **نفسه**، قبل ما أي باكت تخرج: جدول التوجيه بتاعه مفيهوش أي طريق لـ [[10.10.2.0/24]].

**ضفت الطريق** ([[ip route add 10.10.2.0/24 via 10.10.1.254]])، **ولسه مفيش ولا باكت وصلت** — حتى للراوتر. والسبب كان في Docker نفسه:

[[-A DOCKER-INTERNAL ! -d 10.10.1.0/24 -i br-39afa1bc7b6d -j DROP]]

شبكة [[--internal]] بترمي **أي** باكت داخلة الـ bridge ووجهتها بره الـ subnet، حتى لو رايحة لراوتر على نفس الشبكة. فالمعمل محتاج شبكات عادية.

**والنسخة الشغالة:** شبكات عادية، و [[enable_ip_masquerade=false]] (عشان Docker ميعملش NAT من عنده — درس ٤ بيوري ليه)، وكل جهاز الـ default بتاعه الراوتر:

[[traceroute]] من [[pc-a]]:

[[1  10.10.1.254  2.071 ms]]

[[2  10.10.2.20  1.166 ms]]

و [[tcpdump -i any]] على الراوتر بيوري الباكت داخلة من ناحية وطالعة من التانية:

[[eth0  In  IP 10.10.1.10 > 10.10.2.20: ICMP echo request]]

[[eth1  Out IP 10.10.1.10 > 10.10.2.20: ICMP echo request]]

[[eth1  In  IP 10.10.2.20 > 10.10.1.10: ICMP echo reply]]

[[eth0  Out IP 10.10.2.20 > 10.10.1.10: ICMP echo reply]]`,
          example: R`# up.sh — شبكتين وراوتر في النص
export MSYS_NO_PATHCONV=1      # Git Bash على ويندوز بس
docker network create --subnet 10.10.1.0/24 -o com.docker.network.bridge.enable_ip_masquerade=false lan-a
docker network create --subnet 10.10.2.0/24 -o com.docker.network.bridge.enable_ip_masquerade=false lan-b
docker run -d --name pc-a  --network lan-a --ip 10.10.1.10 --cap-add NET_ADMIN nettools sleep infinity
docker run -d --name web-b --network lan-b --ip 10.10.2.20 --cap-add NET_ADMIN nettools sh -c 'mkdir -p /srv && echo "hello from web-b" > /srv/index.html && cd /srv && exec python3 -m http.server 80'
docker run -d --name router --network lan-a --ip 10.10.1.254 --cap-add NET_ADMIN --sysctl net.ipv4.ip_forward=1 nettools sleep infinity
docker network connect --ip 10.10.2.254 lan-b router
docker exec pc-a  ip route replace default via 10.10.1.254
docker exec web-b ip route replace default via 10.10.2.254
docker exec pc-a traceroute -n -w 1 -q 1 10.10.2.20`,
          lines: [
            R`من غير السطر ده، Git Bash بيحوّل [[/srv]] لمسار ويندوز. على لينكس والماك مش محتاجه.`,
            R`الشبكة الأولى. و [[enable_ip_masquerade=false]] = Docker ميعملش NAT من عنده للباكتات اللي بتعدّي.`,
            R`الشبكة التانية.`,
            R`[[pc-a]] بعنوان ثابت. و [[--cap-add NET_ADMIN]] عشان يقدر يغيّر جدول التوجيه بتاعه.`,
            R`[[web-b]] وعليه سيرفر ويب صغير بـ Python.`,
            R`**الراوتر**: [[--sysctl net.ipv4.ip_forward=1]] هو اللي بيخليه يعدّي باكتات مش ليه.`,
            R`والراوتر على الشبكة التانية كمان. دلوقتي عنده كارتين.`,
            R`[[pc-a]]: أي حاجة مش في شبكتي، ابعتها للراوتر.`,
            R`[[web-b]]: نفس الكلام من ناحيته. **من غير السطر ده، الرد ممكن يرجع من طريق تاني** (الدرس الجاي).`,
            R`الطريق: خطوتين، الراوتر وبعدين السيرفر.`,
          ],
          try: R`بعد [[up.sh]]: شغّل [[docker exec -d router sh -c 'timeout 5 tcpdump -n -i any icmp -c 8 > /tmp/cap.txt']]، وبعدين [[docker exec pc-a ping -c 2 10.10.2.20]]، وبعدين [[docker exec router cat /tmp/cap.txt]]. لازم تشوف أربع سطور لكل ping. وبعدين اقفل [[ip_forward]] ([[docker exec router sysctl -w net.ipv4.ip_forward=0]]) وجرّب تاني.`,
          deep: {
            why: R`الشبكة الحقيقية مش بتوريك نفسها. المعمل ده بيخليك تشوف كل خطوة: الجدول بيقول إيه، والباكت راحت فين، ورجعت منين.`,
            how: R`**[[ip route]] بيقرا من الأخص للأعم:**

~~~text
10.10.1.0/24 dev eth0 proto kernel scope link src 10.10.1.10   <-- شبكتي: على طول
default via 10.10.1.254 dev eth0                               <-- أي حاجة تانية: الراوتر
~~~

و [[ip route get 10.10.2.20]] بيقولك الكيرنل هيعمل إيه بالظبط:

~~~text
10.10.2.20 via 10.10.1.254 dev eth0 src 10.10.1.10 uid 0
~~~

**«Network unreachable» مقابل الباقي:** الرسالة دي معناها إن الجدول **مفيهوش** أي سطر يطابق — ولا حتى default. فالباكت مخرجتش. وده أسرع تشخيص في الشبكات: لو شفتها، المشكلة في الجهاز اللي انت عليه، مش في الشبكة.

**[[--internal]] في Docker:** القواعد اللي بيضيفها:

~~~text
-A DOCKER-INTERNAL ! -s 10.10.1.0/24 -o br-39afa1bc7b6d -j DROP
-A DOCKER-INTERNAL ! -d 10.10.1.0/24 -i br-39afa1bc7b6d -j DROP
~~~

يعني الشبكة الداخلية مش «مفيش إنترنت» بس — دي «مفيش أي حاجة بره الـ subnet»، حتى لو انت عامل راوتر. وده مفيد للداتابيز، ومش مناسب لمعمل توجيه. (القواعد دي شفتها بـ [[docker run --rm --privileged --net=host nettools iptables -S]] — ده بيوريك iptables بتاع جهاز Docker نفسه.)

**و [[enable_ip_masquerade=false]] ليه؟** Docker افتراضيًا بيعمل NAT لأي باكت طالعة من الشبكة لبره. ومع الراوتر بتاعنا، ده بيترجم باكتات مش المفروض تتترجم، وبيكسر port forwarding (درس ٤). فالخيار ده بيخلي Docker يسيب التوجيه لينا.

**والأمر الأخطر للأمان:** [[--cap-add NET_ADMIN]] بيدّي الكونتينر صلاحية يغيّر شبكته. في المعمل تمام. في الإنتاج، متدّيهاش لأي كونتينر مش محتاجها.`,
            when: R`أي وقت عايز تفهم حاجة في الشبكات بعينك: توجيه، firewall، NAT، MTU، VPN.`,
            mistakes: R`[[--internal]] لمعمل توجيه. أو تنسى [[ip_forward]] على الراوتر. أو تضيف الطريق في ناحية واحدة. أو تنسى [[MSYS_NO_PATHCONV=1]] في Git Bash فـ [[/srv]] يبقى [[C:/Program Files/Git/srv]].`
          },
          teach: R`## المعمل

~~~text
  lan-a 10.10.1.0/24                 lan-b 10.10.2.0/24
 ┌──────────────┐   ┌──────────────┐   ┌──────────────┐
 │ pc-a         │   │ router       │   │ web-b        │
 │ 10.10.1.10   ├───┤ .1.254 .2.254├───┤ 10.10.2.20   │
 └──────────────┘   └──────────────┘   └──────────────┘
                     ip_forward=1        python http.server
~~~

**الراوتر مجرد كونتينر عليه شبكتين، و [[ip_forward=1]].** ده كل الفرق بين جهاز وراوتر.

---

## ١. الصورة

~~~bash
docker build -t nettools - <<'EOF'
FROM alpine:3.21
RUN apk add --no-cache iproute2 iptables tcpdump curl netcat-openbsd bind-tools iputils traceroute python3
EOF
~~~

---

## ٢. أول محاولة: [[--internal]] ومفيش طريق

~~~bash
docker network create --internal --subnet 10.10.1.0/24 lan-a
docker exec pc-a ping -c 2 -W 1 10.10.2.20
~~~

~~~text اتشغّل فعلًا · Docker 29.6
ping: connect: Network unreachable
~~~

**الرسالة جاية من [[pc-a]] نفسه.** الجدول مفيهوش طريق لـ [[10.10.2.0/24]]، فالباكت مخرجتش أصلًا.

~~~text ip route عند pc-a
10.10.1.0/24 dev eth0 proto kernel scope link src 10.10.1.10
~~~

---

## ٣. ضفت الطريق… ولسه مفيش حاجة

~~~bash
docker exec pc-a ip route add 10.10.2.0/24 via 10.10.1.254
~~~

~~~text اتشغّل فعلًا — tcpdump على الراوتر وقت الـ ping
0 packets captured
~~~

**ولا حتى وصلت الراوتر.** فبصيت على قواعد Docker نفسه:

~~~bash
docker run --rm --privileged --net=host nettools iptables -S DOCKER-INTERNAL
~~~

~~~text اتشغّل فعلًا
-A DOCKER-INTERNAL ! -s 10.10.1.0/24 -o br-39afa1bc7b6d -j DROP
-A DOCKER-INTERNAL ! -d 10.10.1.0/24 -i br-39afa1bc7b6d -j DROP
~~~

> شبكة [[--internal]] بترمي **أي** باكت داخلة ووجهتها بره الـ subnet. حتى لو رايحة لراوتر انت عامله.

---

## ٤. النسخة الشغالة

~~~bash up.sh
export MSYS_NO_PATHCONV=1      # Git Bash على ويندوز بس
docker network create --subnet 10.10.1.0/24 -o com.docker.network.bridge.enable_ip_masquerade=false lan-a
docker network create --subnet 10.10.2.0/24 -o com.docker.network.bridge.enable_ip_masquerade=false lan-b
docker run -d --name pc-a  --network lan-a --ip 10.10.1.10 --cap-add NET_ADMIN nettools sleep infinity
docker run -d --name web-b --network lan-b --ip 10.10.2.20 --cap-add NET_ADMIN nettools \
  sh -c 'mkdir -p /srv && echo "hello from web-b" > /srv/index.html && cd /srv && exec python3 -m http.server 80'
docker run -d --name router --network lan-a --ip 10.10.1.254 --cap-add NET_ADMIN \
  --sysctl net.ipv4.ip_forward=1 nettools sleep infinity
docker network connect --ip 10.10.2.254 lan-b router
docker exec pc-a  ip route replace default via 10.10.1.254
docker exec web-b ip route replace default via 10.10.2.254
~~~

~~~bash down.sh
docker rm -f pc-a web-b router
docker network rm lan-a lan-b
~~~

---

## ٥. شوف الطريق

~~~bash
docker exec pc-a traceroute -n -w 1 -q 1 10.10.2.20
~~~

~~~text اتشغّل فعلًا
 1  10.10.1.254  2.071 ms
 2  10.10.2.20  1.166 ms
~~~

---

## ٦. وشوف الباكت بعينك

~~~bash
docker exec -d router sh -c 'timeout 5 tcpdump -n -i any icmp -c 8 > /tmp/cap.txt'
docker exec pc-a ping -c 2 -W 1 10.10.2.20
docker exec router cat /tmp/cap.txt
~~~

~~~text اتشغّل فعلًا
eth0  In  IP 10.10.1.10 > 10.10.2.20: ICMP echo request, id 48438, seq 1
eth1  Out IP 10.10.1.10 > 10.10.2.20: ICMP echo request, id 48438, seq 1
eth1  In  IP 10.10.2.20 > 10.10.1.10: ICMP echo reply, id 48438, seq 1
eth0  Out IP 10.10.2.20 > 10.10.1.10: ICMP echo reply, id 48438, seq 1
~~~

**الطلب دخل من [[eth0]] وطلع من [[eth1]]، والرد العكس.** ده التوجيه.

---

## الخلاصة

- الراوتر = كارتين + [[ip_forward=1]].
- [[Network unreachable]] = الجدول نفسه مفيهوش طريق.
- [[--internal]] في Docker بترمي أي حاجة بره الـ subnet.
- [[tcpdump -i any]] على الراوتر بيوريك الاتجاهين.`,
          sol: R`المعمل والطريق والتقاط الباكتات اتشغّلوا على Docker 29.6.1، وقواعد [[DOCKER-INTERNAL]] اتقرت من جهاز Docker نفسه.`,
          solCode: R`# --internal ومفيش طريق
docker exec pc-a ping -c 2 -W 1 10.10.2.20
#   ping: connect: Network unreachable
# --internal والطريق موجود: 0 packets captured على الراوتر
#   -A DOCKER-INTERNAL ! -d 10.10.1.0/24 -i br-39afa1bc7b6d -j DROP

# شبكات عادية + masquerade=false + الطريقين:
docker exec pc-a traceroute -n -w 1 -q 1 10.10.2.20
#    1  10.10.1.254  2.071 ms
#    2  10.10.2.20  1.166 ms
# tcpdump -i any على الراوتر:
#   eth0  In  IP 10.10.1.10 > 10.10.2.20: ICMP echo request
#   eth1  Out IP 10.10.1.10 > 10.10.2.20: ICMP echo request
#   eth1  In  IP 10.10.2.20 > 10.10.1.10: ICMP echo reply
#   eth0  Out IP 10.10.2.20 > 10.10.1.10: ICMP echo reply`
        },

        {
          cmd: "الرد رجع من طريق تاني",
          title: "asymmetric routing: شغّال بالصدفة لحد ما تحط firewall",
          learn: R`تعرف إن الطلب والرد ممكن ياخدوا طريقين، وإزاي ده بيكسر أي firewall بيفتكر الاتصالات.`,
          out: R`تشوف [[UNREPLIED]] في conntrack وتعرف السبب في ثانية.`,
          use: {
            net: R`شبكة فيها مخرجين (خطين نت، أو VPN جنب الراوتر العادي) — الطلب بيخرج من واحد والرد بيرجع من التاني.`,
            work: R`«الـ ping شغال والموقع مش بيفتح»، أو «بيشتغل من غير firewall وبيقع لما نشغّله» — ده من أشهر أسبابهم.`,
            cs: R`firewall بيفتكر الاتصالات (stateful) محتاج يشوف الاتجاهين. لو شاف واحد بس، الاتصال بالنسبة له لسه ماتمّش.`,
          },
          desc: R`في المعمل، رجّعت [[web-b]] يستخدم الـ default بتاع Docker ([[10.10.2.1]]) بدل الراوتر. يعني:

- الطلب من [[pc-a]]: بيروح عن طريق الراوتر.
- الرد من [[web-b]]: بيرجع **عن طريق Docker**، من غير ما يعدّي على الراوتر.

**ومن غير firewall: شغّال.** [[code=200]]. و [[tcpdump]] على الراوتر شاف الطلب بس:

[[eth0  In  IP 10.10.1.10 > 10.10.2.20: ICMP echo request]]

[[eth1  Out IP 10.10.1.10 > 10.10.2.20: ICMP echo request]]

ومفيش ولا reply. **الراوتر مش عارف إن فيه رد.**

**وبعدين حطيت firewall عادي جدًا على الراوتر:**

[[FORWARD DROP]] + اسمح بالردود ([[ESTABLISHED,RELATED]]) + اسمح بالاتصالات الجديدة من [[eth0]] لـ [[eth1]] ([[--ctstate NEW]]).

**[[code=000]]** — بعد ٤ ثواني، [[curl exit 28]].

و conntrack على الراوتر بيقول ليه:

[[SYN_SENT src=10.10.1.10 dst=10.10.2.20 sport=40862 dport=80 [UNREPLIED]]]

الراوتر شاف الـ [[SYN]] وسجّله كاتصال جديد، ومشافش الـ [[SYN-ACK]] (رجع من طريق تاني). فلما [[pc-a]] بعت الـ [[ACK]] — الاتصال بالنسبة للراوتر لسه في [[SYN_SENT]]، والـ [[ACK]] ده مش [[NEW]] ومش [[ESTABLISHED]]، فاترمى.

**ومفاجأة:** نفس الوضع بقاعدة أوسع ([[-i eth0 -o eth1 -j ACCEPT]] من غير [[--ctstate NEW]]) **اشتغل** — لأنها بتقبل أي باكت من الناحية دي مهما كانت حالتها. فالـ asymmetric بيقع مع القواعد الدقيقة، ويعدّي مع الواسعة. وده اللي بيخليه مخادع: بيشتغل في التجربة، ويقع يوم ما حد يشدّ القواعد.

**الإصلاح:** يا إما الطريقين يعدّوا على نفس الراوتر ([[web-b]] الـ default بتاعه الراوتر)، يا إما NAT على الراوتر (الدرس الجاي) — فالرد بيبقى رايح للراوتر نفسه.`,
          example: R`# web-b يرجع من طريق تاني
docker exec web-b ip route replace default via 10.10.2.1
docker exec pc-a curl -s -m 3 -o /dev/null -w "no-fw code=%{http_code}\n" http://10.10.2.20/
# firewall عادي على الراوتر
docker exec router sh -c 'iptables -P FORWARD DROP; iptables -A FORWARD -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT; iptables -A FORWARD -i eth0 -o eth1 -m conntrack --ctstate NEW -j ACCEPT'
docker exec pc-a curl -s -m 3 -o /dev/null -w "stateful code=%{http_code}\n" http://10.10.2.20/
docker exec router sh -c 'grep UNREPLIED /proc/net/nf_conntrack'
#   no-fw code=200
#   stateful code=000
#   ... SYN_SENT src=10.10.1.10 dst=10.10.2.20 ... dport=80 [UNREPLIED] ...`,
          lines: [
            R`**الرد هيرجع عن طريق [[10.10.2.1]]** (Docker)، مش الراوتر.`,
            R`من غير firewall: [[200]]. شغّال بالصدفة.`,
            R`firewall stateful: ارمي كل حاجة، واسمح بالردود، واسمح بالجديد من ناحية واحدة.`,
            R`دلوقتي: [[000]].`,
            R`[[UNREPLIED]] = الراوتر شاف الطلب ومشافش الرد.`,
          ],
          try: R`بعد ما تشوف [[UNREPLIED]]: رجّع الطريق ([[docker exec web-b ip route replace default via 10.10.2.254]]) وجرّب تاني. وبعدين بدّل قاعدة [[--ctstate NEW]] بـ [[-i eth0 -o eth1 -j ACCEPT]] من غير شرط، ورجّع الطريق الغلط — هتلاقيه اشتغل. فكّر ليه.`,
          deep: {
            why: R`الـ firewall اللي بيفتكر الاتصالات بيبني قراره على إنه شاف الاتجاهين. والشبكة اللي فيها أكتر من طريق بتكسر الافتراض ده من غير ما حد يقصد.`,
            how: R`**الحالات اللي جرّبتها، بالترتيب:**

| الطريق | الـ firewall | النتيجة |
|---|---|---|
| الاتنين من الراوتر | stateful | [[200]] |
| الرد من Docker | مفيش | [[200]] (الراوتر شاف الطلب بس) |
| الرد من Docker | stateful بـ [[--ctstate NEW]] | **[[000]]** — [[SYN_SENT [UNREPLIED]]] |
| الرد من Docker | [[-i eth0 -o eth1 -j ACCEPT]] من غير حالة | [[200]] |
| الرد من Docker | stateful + MASQUERADE | [[200]] (الرد بقى للراوتر) |

**ليه الـ ACK اترمى؟** conntrack بيتابع TCP: [[SYN]] ← [[SYN_SENT]]، و [[SYN-ACK]] ← [[SYN_RECV]]، و [[ACK]] ← [[ESTABLISHED]]. لما الـ [[SYN-ACK]] ميعدّيش عليه، أول [[ACK]] من [[pc-a]] بيوصل والاتصال لسه [[SYN_SENT]]. القاعدة [[ESTABLISHED,RELATED]] مش بتطابقه، و [[NEW]] مش بتطابقه (مش [[SYN]]). فبيقع على الـ policy: [[DROP]].

**إزاي تقرا conntrack:**

~~~text
ipv4 2 tcp 6 116 SYN_SENT src=10.10.1.10 dst=10.10.2.20 sport=47266 dport=80 [UNREPLIED] src=10.10.2.20 dst=10.10.1.10 sport=80 dport=47266
                 ^^^^^^^^ الحالة  ^^^^^^^^^^^^ الاتجاه الأصلي                ^^^^^^^^^^^  ^^^^^^^^^^^^^^^^ الرد المتوقع
~~~

ولو شفت [[[UNREPLIED]]] على اتصالات كتير، اسأل: الرد بيرجع من فين؟

**على سيرفر حقيقي:** [[conntrack -L]] (من حزمة [[conntrack-tools]]) بيعمل نفس اللي عملناه بـ [[/proc/net/nf_conntrack]]. وعلى لينكس عادي ممكن [[/proc/net/nf_conntrack]] متبقاش موجودة إلا لو الموديول متحمّل.

**وفين بيحصل في الحقيقة؟**

| الموقف | |
|---|---|
| سيرفر بكارتين في شبكتين | الطلب على كارت والرد خارج من الكارت التاني حسب الـ default |
| خطين نت مع load balancing | كل باكت ممكن تخرج من خط |
| VPN على جهاز واحد في الشبكة | الجهاز ده بيرد من النفق، والباقي من الراوتر |
| Docker على سيرفر فيه firewall تاني | Docker بيعمل قواعده، والـ firewall التاني مش شايف كل حاجة |

**والحل في لينكس لو لازم طريقين:** policy routing — جدول توجيه لكل كارت ([[ip rule add from 10.10.2.20 table 100]]) عشان الرد يخرج من نفس الكارت اللي الطلب دخل منه. (من وثائق iproute2، مااتجرّبش هنا.)`,
            when: R`أي شبكة فيها أكتر من طريق، وأي firewall بيشتغل وبيقع حسب «مين بيكلّم مين».`,
            mistakes: R`تفتكر «الـ ping شغال» يبقى التوجيه صح. أو تحط الطريق في ناحية واحدة. أو تفتح القاعدة على الآخر عشان «تشتغل» من غير ما تفهم ليه كانت واقعة.`
          },
          teach: R`## الوضع

رجّعت [[web-b]] يستخدم الـ default بتاع Docker:

~~~bash
docker exec web-b ip route replace default via 10.10.2.1
~~~

~~~text
الطلب:  pc-a -> router -> web-b
الرد:   web-b -> Docker (10.10.2.1) -> pc-a        <-- مش عن طريق الراوتر
~~~

---

## ١. من غير firewall: شغّال

~~~text اتشغّل فعلًا · Docker 29.6
no-fw code=200
~~~

و [[tcpdump]] على الراوتر:

~~~text اتشغّل فعلًا
eth0  In  IP 10.10.1.10 > 10.10.2.20: ICMP echo request, id 48437, seq 1
eth1  Out IP 10.10.1.10 > 10.10.2.20: ICMP echo request, id 48437, seq 1
eth0  In  IP 10.10.1.10 > 10.10.2.20: ICMP echo request, id 48437, seq 2
eth1  Out IP 10.10.1.10 > 10.10.2.20: ICMP echo request, id 48437, seq 2
~~~

**مفيش ولا reply.** الراوتر مش عارف إن فيه رد.

---

## ٢. firewall عادي جدًا

~~~bash
docker exec router sh -c '
  iptables -P FORWARD DROP
  iptables -A FORWARD -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
  iptables -A FORWARD -i eth0 -o eth1 -m conntrack --ctstate NEW -j ACCEPT'
~~~

~~~text اتشغّل فعلًا
stateful code=000            (curl exit 28 بعد 3 ثواني)
~~~

~~~bash
docker exec router sh -c 'grep UNREPLIED /proc/net/nf_conntrack'
~~~

~~~text اتشغّل فعلًا
ipv4 2 tcp 6 116 SYN_SENT src=10.10.1.10 dst=10.10.2.20 sport=47266 dport=80 [UNREPLIED] ...
~~~

---

## ٣. ليه؟

~~~text
pc-a  --SYN-->      router  (سجّله: SYN_SENT)  --> web-b
pc-a  <--SYN-ACK--  Docker   <-- web-b          (الراوتر مشافهوش)
pc-a  --ACK-->      router  (لسه SYN_SENT: مش NEW ومش ESTABLISHED)  -> DROP
~~~

---

## ٤. ومفاجأة: قاعدة أوسع اشتغلت

~~~bash
iptables -A FORWARD -i eth0 -o eth1 -j ACCEPT      # من غير --ctstate
~~~

~~~text اتشغّل فعلًا
code=200
~~~

لأنها بتقبل أي باكت من الناحية دي مهما كانت حالتها.

> **وده اللي بيخليه مخادع:** بيشتغل في التجربة، ويقع يوم ما حد يشدّ القواعد.

---

## ٥. الإصلاح

| الحل | |
|---|---|
| الطريقين من نفس الراوتر | [[web-b]] الـ default بتاعه الراوتر |
| NAT على الراوتر | الرد بيبقى رايح للراوتر نفسه — الدرس الجاي |
| policy routing | الرد يخرج من نفس الكارت اللي الطلب دخل منه (من الوثائق) |

~~~text بعد ما رجّعت الطريق · اتشغّل فعلًا
hello from web-b
 [200]
~~~

---

## الخلاصة

- الطلب والرد ممكن ياخدوا طريقين.
- من غير firewall، محدش بياخد باله.
- stateful firewall → [[SYN_SENT [UNREPLIED]]] → [[DROP]].
- القواعد الواسعة بتخبّي المشكلة، مش بتحلها.`,
          sol: R`الخمس حالات اتشغّلت على المعمل (Docker 29.6.1)، و policy routing من وثائق iproute2.`,
          solCode: R`docker exec web-b ip route replace default via 10.10.2.1
docker exec pc-a curl -s -m 3 -o /dev/null -w "no-fw code=%{http_code}\n" http://10.10.2.20/
#   no-fw code=200
docker exec router sh -c 'iptables -P FORWARD DROP; iptables -A FORWARD -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT; iptables -A FORWARD -i eth0 -o eth1 -m conntrack --ctstate NEW -j ACCEPT'
docker exec pc-a curl -s -m 3 -o /dev/null -w "stateful code=%{http_code}\n" http://10.10.2.20/
#   stateful code=000
docker exec router sh -c 'grep UNREPLIED /proc/net/nf_conntrack'
#   ipv4 2 tcp 6 116 SYN_SENT src=10.10.1.10 dst=10.10.2.20 sport=47266 dport=80 [UNREPLIED] ...
docker exec web-b ip route replace default via 10.10.2.254
#   hello from web-b  [200]`
        },

        {
          cmd: "NAT بعينك",
          title: "السيرفر بقى شايف الراوتر مش الجهاز",
          learn: R`تعمل MASQUERADE على راوتر، وتشوف الترجمة في لوج السيرفر وفي conntrack.`,
          out: R`تعرف ليه السيرفر بتاعك بيشوف IP غلط للزوار، وإزاي الشبكة اللي ورا NAT مستخبية.`,
          use: {
            net: R`ده اللي بيعمله راوتر البيت لكل أجهزتك: كلهم بيطلعوا للنت بـ IP واحد.`,
            prog: R`لما تطبيقك ورا proxy أو NAT، [[req.ip]] بيبقى IP الـ proxy. وده سبب [[X-Forwarded-For]] و [[trust proxy]].`,
            work: R`«الـ rate limit بيقفل كل الناس مع بعض» — لأن كل الطلبات شكلها جاية من IP واحد.`,
          },
          desc: R`على الراوتر:

[[iptables -t nat -A POSTROUTING -o eth1 -j MASQUERADE]]

«أي باكت طالعة من [[eth1]]، غيّر المصدر بتاعها لعنواني على [[eth1]]».

**لوج السيرفر قبل وبعد:**

| | لوج [[web-b]] |
|---|---|
| من غير NAT | [[10.10.1.10 - - "GET / HTTP/1.1" 200]] |
| مع NAT | **[[10.10.2.254 - - "GET / HTTP/1.1" 200]]** |

**[[web-b]] مبقاش شايف [[pc-a]] خالص.** شايف الراوتر.

و conntrack بيوري الترجمة:

[[src=10.10.1.10 dst=10.10.2.20 sport=54932 dport=80 src=10.10.2.20 dst=10.10.2.254 sport=80 dport=54932 [ASSURED]]]

النص الأول: الاتصال الأصلي. والنص التاني: الرد المتوقع — رايح لـ **[[10.10.2.254]]**، مش لـ [[10.10.1.10]]. ولما الرد يوصل، الراوتر بيرجّعه لـ [[pc-a]] من الجدول ده.

**ومن ميزات NAT إنه صلّح مشكلة الدرس اللي فات:** [[web-b]] الـ default بتاعه Docker، والـ firewall stateful — وبرضه [[code=200]]. لأن الرد رايح لـ [[10.10.2.254]]، وده على نفس شبكة [[web-b]]، فبيروح للراوتر مباشرة من غير ما يحتاج أي طريق.

**والجانب التاني:** [[web-b]] مش قادر **يبدأ** اتصال لـ [[pc-a]]:

[[nc: connect to 10.10.1.10 port 22 (tcp) timed out]]

الـ firewall بيسمح بالردود بس من الناحية دي. وده بالظبط سبب إن أجهزة بيتك مستخبية من النت: محدش من بره يقدر يبدأ معاهم.`,
          example: R`docker exec router iptables -t nat -A POSTROUTING -o eth1 -j MASQUERADE
docker exec pc-a curl -s -o /dev/null http://10.10.2.20/
docker logs web-b 2>&1 | tail -1
docker exec router sh -c 'grep "dst=10.10.2.254" /proc/net/nf_conntrack | tail -1'
docker exec web-b nc -zv -w 2 10.10.1.10 22
#   10.10.2.254 - - [28/Oct/2026 23:53:32] "GET / HTTP/1.1" 200 -
#   ... src=10.10.1.10 dst=10.10.2.20 ... src=10.10.2.20 dst=10.10.2.254 ... [ASSURED]
#   nc: connect to 10.10.1.10 port 22 (tcp) timed out: Operation in progress`,
          lines: [
            R`**MASQUERADE**: اللي طالع من [[eth1]] ياخد عنوان الراوتر على [[eth1]] كمصدر.`,
            R`طلب من [[pc-a]].`,
            R`آخر سطر في لوج السيرفر: الزائر [[10.10.2.254]].`,
            R`الترجمة في conntrack: الرد متوقع رايح للراوتر.`,
            R`ومن الناحية التانية: [[web-b]] مايقدرش يبدأ اتصال لـ [[pc-a]].`,
          ],
          try: R`شغّل [[docker exec router sh -c 'tcpdump -n -i any tcp port 80 -c 4']] في نافذة، و [[curl]] من [[pc-a]] في نافذة تانية. هتشوف نفس الباكت مرتين: داخلة [[eth0]] من [[10.10.1.10]]، وطالعة [[eth1]] من [[10.10.2.254]].`,
          deep: {
            why: R`IPv4 مافيهوش عناوين تكفي لكل جهاز. فالشبكات الخاصة ([[10.]] و [[192.168.]]) بتطلع كلها من عنوان عام واحد، والراوتر بيفتكر مين بيكلّم مين.`,
            how: R`**SNAT و MASQUERADE و DNAT:**

| | بيغيّر | إمتى |
|---|---|---|
| [[SNAT --to-source X]] | المصدر لعنوان ثابت | عنوانك العام ثابت |
| [[MASQUERADE]] | المصدر لعنوان الكارت الحالي | العنوان بيتغيّر (DHCP، PPPoE) |
| [[DNAT --to-destination X]] | **الوجهة** | port forwarding — الدرس الجاي |

**والسلاسل:** SNAT/MASQUERADE في [[POSTROUTING]] (بعد ما الكيرنل قرر الباكت رايحة فين). و DNAT في [[PREROUTING]] (قبل القرار، عشان القرار يتاخد على الوجهة الجديدة).

**ليه السيرفر بتاعك بيشوف IP غلط؟** نفس الحكاية بس على مستوى HTTP: nginx أو load balancer قدام التطبيق بيفتح اتصال جديد، فالتطبيق بيشوف IP الـ proxy. والحل هناك مش iptables — الـ proxy بيحط IP الأصلي في [[X-Forwarded-For]]، والتطبيق بيثق فيه من الـ proxy بس:

~~~js
app.set('trust proxy', 'loopback');   // Express: صدّق X-Forwarded-For من nginx اللي على نفس الجهاز بس
~~~

**وNAT مش أمان؟** هو بيمنع الاتصالات الجديدة من بره كأثر جانبي (مفيش جدول يقول تروح فين). بس الحماية الحقيقية هي قاعدة الـ firewall اللي بتسمح بـ [[ESTABLISHED,RELATED]] بس. ولو حد شال القاعدة دي وسابها [[ACCEPT]]، أي حد على [[lan-b]] يعرف [[10.10.1.0/24]] ويعمل طريق ليها، يوصل.

**و IPv6؟** مفيهوش NAT عادة — كل جهاز بعنوان عام. فالحماية كلها بتبقى على الـ firewall. (درس IPv6 في نفس التاب.)`,
            when: R`أي شبكة خاصة طالعة لشبكة تانية، وأي وقت السيرفر بيشوف IP غير اللي متوقعه.`,
            mistakes: R`تفتكر NAT هو الأمان وتسيب [[FORWARD ACCEPT]]. أو MASQUERADE على الكارت الغلط. أو تثق في [[X-Forwarded-For]] من أي حد.`
          },
          teach: R`## سطر واحد على الراوتر

~~~bash
docker exec router iptables -t nat -A POSTROUTING -o eth1 -j MASQUERADE
~~~

«أي باكت طالعة من [[eth1]]، غيّر المصدر بتاعها لعنواني على [[eth1]]».

---

## ١. لوج السيرفر قبل وبعد

~~~text اتشغّل فعلًا · من غير NAT
10.10.1.10 - - [28/Oct/2026 23:48:07] "GET / HTTP/1.1" 200 -
~~~

~~~text اتشغّل فعلًا · مع NAT
10.10.2.254 - - [28/Oct/2026 23:53:32] "GET / HTTP/1.1" 200 -
~~~

**[[web-b]] مبقاش شايف [[pc-a]].** شايف الراوتر.

---

## ٢. الترجمة في conntrack

~~~bash
docker exec router sh -c 'grep "dst=10.10.2.254" /proc/net/nf_conntrack | tail -1'
~~~

~~~text اتشغّل فعلًا
src=10.10.1.10 dst=10.10.2.20 sport=54932 dport=80   src=10.10.2.20 dst=10.10.2.254 sport=80 dport=54932 [ASSURED]
└───────── الاتصال الأصلي ─────────┘   └────────── الرد المتوقع: للراوتر ──────────┘
~~~

---

## ٣. وصلّح مشكلة الدرس اللي فات

نفس الوضع: [[web-b]] الـ default بتاعه Docker، والـ firewall stateful:

~~~text اتشغّل فعلًا
بدون NAT:  code=000
مع NAT:    code=200
~~~

الرد رايح لـ [[10.10.2.254]] — على نفس شبكة [[web-b]] — فبيروح للراوتر مباشرة.

---

## ٤. والاتجاه التاني مقفول

~~~bash
docker exec web-b nc -zv -w 2 10.10.1.10 22
~~~

~~~text اتشغّل فعلًا
nc: connect to 10.10.1.10 port 22 (tcp) timed out: Operation in progress
~~~

> ده سبب إن أجهزة بيتك مستخبية من النت. **بس الحماية الحقيقية هي قاعدة [[ESTABLISHED,RELATED]]**، مش NAT نفسه.

---

## ٥. الأنواع التلاتة

| | بيغيّر | السلسلة |
|---|---|---|
| [[SNAT]] | المصدر لعنوان ثابت | [[POSTROUTING]] |
| [[MASQUERADE]] | المصدر لعنوان الكارت | [[POSTROUTING]] |
| [[DNAT]] | **الوجهة** | [[PREROUTING]] |

---

## ٦. ونفس الحكاية في تطبيقك

nginx قدام التطبيق = التطبيق شايف IP الـ nginx.

~~~js
app.set('trust proxy', 'loopback');   // صدّق X-Forwarded-For من nginx المحلي بس
~~~

---

## الخلاصة

- MASQUERADE = المصدر بقى الراوتر.
- conntrack بيفتكر مين بيكلّم مين.
- NAT بيحل الـ asymmetric لأن الرد رايح للراوتر.
- الحماية هي قاعدة الـ firewall، مش NAT.`,
          sol: R`اللوج والـ conntrack والاتجاه المقفول اتشغّلوا على المعمل (Docker 29.6.1).`,
          solCode: R`docker exec router iptables -t nat -A POSTROUTING -o eth1 -j MASQUERADE
docker exec pc-a curl -s -o /dev/null http://10.10.2.20/
docker logs web-b 2>&1 | tail -1
#   10.10.2.254 - - [28/Oct/2026 23:53:32] "GET / HTTP/1.1" 200 -    (كان 10.10.1.10)
docker exec router sh -c 'grep "dst=10.10.2.254" /proc/net/nf_conntrack | tail -1'
#   src=10.10.1.10 dst=10.10.2.20 sport=54932 dport=80 src=10.10.2.20 dst=10.10.2.254 sport=80 dport=54932 [ASSURED]
docker exec web-b nc -zv -w 2 10.10.1.10 22
#   nc: connect to 10.10.1.10 port 22 (tcp) timed out: Operation in progress`
        },

        {
          cmd: "port forwarding والثغرة اللي جنبه",
          title: "فتحت 8080، واتفتح البورت الأصلي معاه",
          learn: R`تعمل DNAT من بورت على الراوتر لجهاز جوه الشبكة، وتقفل الوصول المباشر.`,
          out: R`port forward بيفتح اللي انت قاصده بس.`,
          use: {
            prog: R`[[docker run -p 8080:80]] و [[ports: "8080:80"]] هم DNAT بالظبط. فهمك ده بيفسّر ليه البورتات المربوطة بتعدّي الـ firewall.`,
            net: R`port forwarding في راوتر البيت عشان سيرفر ألعاب أو كاميرا — نفس القاعدتين.`,
            work: R`قاعدة FORWARD مكتوبة على عنوان الجهاز بعد الترجمة بتفتح البورت الأصلي للكل، ومحدش بياخد باله لأن الـ port forward «شغّال».`,
          },
          desc: R`عايز [[web-b]] يوصل لسيرفر على [[pc-a]] (بورت [[8000]]) عن طريق بورت [[8080]] على الراوتر:

[[iptables -t nat -A PREROUTING -i eth1 -p tcp --dport 8080 -j DNAT --to-destination 10.10.1.10:8000]]

و قاعدة FORWARD تسمح بيه:

[[iptables -A FORWARD -i eth1 -o eth0 -p tcp -d 10.10.1.10 --dport 8000 -m conntrack --ctstate NEW -j ACCEPT]]

**[[curl http://10.10.2.254:8080/]]** ← [[hello from pc-a]]. شغّال.

**بس جرّب الوصول المباشر:**

[[nc -zv 10.10.1.10 8000]] ← **[[Connection to 10.10.1.10 8000 port [tcp/*] succeeded!]]**

**البورت الأصلي اتفتح كمان.** لأن قاعدة FORWARD بتشوف الباكت **بعد** DNAT ([[PREROUTING]] بيحصل الأول). فالقاعدة دي بتطابق أي باكت وجهتها [[10.10.1.10:8000]] — سواء جت من [[8080]] أو مباشرة.

**الإصلاح: اشترط إن الاتصال ده جاي من DNAT:**

[[-m conntrack --ctstate DNAT]] بدل [[--ctstate NEW]]

| | النتيجة |
|---|---|
| [[10.10.2.254:8080]] | [[hello from pc-a]] |
| [[10.10.1.10:8000]] مباشرة | **[[timed out]]** |

**ومفاجأة وأنا ببني ده:** في الأول، Docker كان بيعمل NAT من عنده للباكتات اللي بتعدّي الـ bridge. فـ [[pc-a]] كان شايف الطلب جاي من **[[10.10.1.1]]** (عنوان Docker)، والرد اتلخبط واترمى [[RST]]. وده سبب [[enable_ip_masquerade=false]] في [[up.sh]]: من غيره، Docker بيدخل في اللعبة.`,
          example: R`docker exec router iptables -t nat -A PREROUTING -i eth1 -p tcp --dport 8080 -j DNAT --to-destination 10.10.1.10:8000
# الغلط: القاعدة دي بتفتح 10.10.1.10:8000 للكل
docker exec router iptables -A FORWARD -i eth1 -o eth0 -p tcp -d 10.10.1.10 --dport 8000 -m conntrack --ctstate NEW -j ACCEPT
docker exec web-b nc -zv -w 2 10.10.1.10 8000
#   Connection to 10.10.1.10 8000 port [tcp/*] succeeded!      <-- مباشرة!
# الصح: اللي جاي من DNAT بس
docker exec router iptables -D FORWARD -i eth1 -o eth0 -p tcp -d 10.10.1.10 --dport 8000 -m conntrack --ctstate NEW -j ACCEPT
docker exec router iptables -A FORWARD -i eth1 -o eth0 -p tcp -d 10.10.1.10 --dport 8000 -m conntrack --ctstate DNAT -j ACCEPT
docker exec web-b curl -sS -m 3 http://10.10.2.254:8080/
docker exec web-b nc -zv -w 2 10.10.1.10 8000
#   hello from pc-a
#   nc: connect to 10.10.1.10 port 8000 (tcp) timed out: Operation in progress`,
          lines: [
            R`**DNAT**: اللي جاي على [[eth1:8080]] غيّر وجهته لـ [[10.10.1.10:8000]]. في [[PREROUTING]]، قبل قرار التوجيه.`,
            R`قاعدة FORWARD على العنوان **بعد** الترجمة — والمشكلة إنها مش بتفرّق جاية منين.`,
            R`الوصول المباشر: **نجح**.`,
            R`شيل القاعدة الواسعة.`,
            R`**[[--ctstate DNAT]]**: الاتصالات اللي conntrack عارف إنها اتعمل لها DNAT بس.`,
            R`عن طريق [[8080]]: شغّال.`,
            R`مباشرة: مقفول.`,
          ],
          try: R`بعد الإصلاح، اعمل بورت تاني: [[8081]] لـ [[pc-a:8000]] برضه. وجرّب إن الاتنين شغالين والمباشر مقفول. وبعدين شوف قواعد Docker نفسه ([[docker run --rm --privileged --net=host nettools iptables -t nat -S DOCKER]]) لكونتينر عليه [[-p]] — هتلاقي نفس الـ DNAT.`,
          deep: {
            why: R`DNAT بيغيّر الوجهة قبل الفلترة. فأي قاعدة فلترة بعدها شايفة الوجهة الجديدة بس، ومش عارفة الباكت كانت رايحة فين في الأول — إلا لو سألت conntrack.`,
            how: R`**ترتيب السلاسل لباكت معدّية على الراوتر:**

~~~text
PREROUTING (nat: DNAT)  ->  قرار التوجيه  ->  FORWARD (filter)  ->  POSTROUTING (nat: SNAT/MASQUERADE)
~~~

فـ FORWARD بيشوف [[10.10.1.10:8000]] في الحالتين — جاية من [[8080]] أو مباشرة. والفرق الوحيد إن conntrack فاكر إن الأولى اتعمل لها DNAT.

**[[--ctstate DNAT]]** بتطابق الاتصالات اللي الوجهة الأصلية فيها مختلفة عن الحالية. وفيه برضه [[--ctorigdstport 8080]] لو عايز تحدد البورت الأصلي بالظبط:

~~~bash
iptables -A FORWARD -i eth1 -o eth0 -p tcp -d 10.10.1.10 --dport 8000 \
  -m conntrack --ctstate DNAT --ctorigdstport 8080 -j ACCEPT
~~~

(الشكل ده من وثائق iptables-extensions، والشكل البسيط [[--ctstate DNAT]] هو اللي اتجرّب.)

**وده بالظبط اللي بيعمله Docker مع [[-p 8080:80]]:**

- DNAT في سلسلة [[DOCKER]] في جدول [[nat]].
- وقاعدة في [[DOCKER-FORWARD]]/[[DOCKER]] بتسمح بالاتصال للكونتينر.

وعشان كده البورتات اللي Docker بيربطها **بتعدّي** [[ufw]] على لينكس: [[ufw]] بيكتب قواعده في [[INPUT]]، والباكت دي بقت [[FORWARD]] بعد DNAT، فمش بتعدّي على [[INPUT]] أصلًا. (السلوك ده من وثائق Docker «Docker and ufw»، والسلاسل اللي فوق هي اللي بتفسّره.)

**والمصيدة اللي خلّتني أضيف [[enable_ip_masquerade=false]]:**

~~~text tcpdump على pc-a — قبل الخيار ده
IP 10.10.1.1.41768 > 10.10.1.10.8000: Flags [S]
IP 10.10.1.10.8000 > 10.10.1.1.41768: Flags [S.]
IP 10.10.1.1.41768 > 10.10.1.10.8000: Flags [R]
~~~

الطلب وصل من [[10.10.1.1]] (Docker) بدل [[10.10.2.20]]. يعني Docker عمل MASQUERADE تاني للباكت وهي معدّية على الـ bridge، و [[pc-a]] رد على Docker، و Docker مكانش عارف الاتصال ده فرمى [[RST]]. ده مش سلوك شبكة حقيقية — ده Docker بيعمل NAT من عنده. والخيار ده بيقفله لكل شبكة.`,
            when: R`أي port forward: على راوتر، أو firewall، أو جهاز Docker.`,
            mistakes: R`قاعدة FORWARD على العنوان بعد الترجمة من غير [[--ctstate DNAT]]. أو تختبر الـ forward بس ومتختبرش الوصول المباشر. أو تفتكر [[ufw]] بيحمي بورتات Docker.`
          },
          teach: R`## عايز [[web-b]] يوصل لـ [[pc-a:8000]] عن طريق [[router:8080]]

~~~text
web-b  -->  10.10.2.254:8080  ==DNAT==>  10.10.1.10:8000  (pc-a)
~~~

---

## ١. القاعدتين اللي الكل بيكتبهم

~~~bash
docker exec router iptables -t nat -A PREROUTING -i eth1 -p tcp --dport 8080 \
  -j DNAT --to-destination 10.10.1.10:8000
docker exec router iptables -A FORWARD -i eth1 -o eth0 -p tcp -d 10.10.1.10 --dport 8000 \
  -m conntrack --ctstate NEW -j ACCEPT
~~~

~~~text اتشغّل فعلًا · Docker 29.6
curl http://10.10.2.254:8080/   ->  hello from pc-a
~~~

**شغّال.** بس جرّب الوصول المباشر:

~~~text اتشغّل فعلًا
nc -zv 10.10.1.10 8000   ->  Connection to 10.10.1.10 8000 port [tcp/*] succeeded!
~~~

**البورت الأصلي اتفتح كمان.**

---

## ٢. ليه؟

~~~text
PREROUTING (DNAT)  ->  التوجيه  ->  FORWARD  ->  POSTROUTING
       ↑                                ↑
  الوجهة اتغيّرت هنا          FORWARD شايف 10.10.1.10:8000 في الحالتين
~~~

---

## ٣. الإصلاح

~~~bash
docker exec router iptables -A FORWARD -i eth1 -o eth0 -p tcp -d 10.10.1.10 --dport 8000 \
  -m conntrack --ctstate DNAT -j ACCEPT
~~~

~~~text اتشغّل فعلًا
via 8080:  hello from pc-a
direct:    nc: connect to 10.10.1.10 port 8000 (tcp) timed out: Operation in progress
~~~

> وفيه [[--ctorigdstport 8080]] لو عايز تحدد البورت الأصلي بالظبط (من وثائق iptables-extensions).

---

## ٤. وده بالظبط [[docker run -p 8080:80]]

| | |
|---|---|
| DNAT | سلسلة [[DOCKER]] في [[nat]] |
| السماح | قاعدة في [[FORWARD]] للكونتينر |

وعشان كده البورتات المربوطة **بتعدّي** [[ufw]] على لينكس: [[ufw]] في [[INPUT]]، والباكت دي بقت [[FORWARD]].

---

## ٥. ومفاجأة وأنا ببني ده

~~~text tcpdump على pc-a — قبل enable_ip_masquerade=false · اتشغّل فعلًا
IP 10.10.1.1.41768 > 10.10.1.10.8000: Flags [S]
IP 10.10.1.10.8000 > 10.10.1.1.41768: Flags [S.]
IP 10.10.1.1.41768 > 10.10.1.10.8000: Flags [R]
~~~

الطلب جه من **[[10.10.1.1]]** — Docker عمل NAT من عنده للباكت وهي معدّية الـ bridge. والرد اتلخبط واترمى [[RST]].

> ده سبب [[enable_ip_masquerade=false]] في [[up.sh]]. من غيره، Docker بيدخل في اللعبة.

---

## الخلاصة

- DNAT في [[PREROUTING]]، قبل الفلترة.
- FORWARD شايف الوجهة **الجديدة**.
- [[--ctstate NEW]] على العنوان الجديد = البورت الأصلي مفتوح.
- [[--ctstate DNAT]] = اللي جاي من الـ forward بس.
- اختبر الوصول المباشر، مش الـ forward بس.`,
          sol: R`الـ DNAT والثغرة والإصلاح، ومصيدة Docker NAT، اتشغّلوا على المعمل (Docker 29.6.1). [[--ctorigdstport]] وسلوك [[ufw]] من الوثائق.`,
          solCode: R`docker exec router iptables -t nat -A PREROUTING -i eth1 -p tcp --dport 8080 -j DNAT --to-destination 10.10.1.10:8000

# بـ --ctstate NEW:
#   curl 10.10.2.254:8080  ->  hello from pc-a
#   nc 10.10.1.10 8000     ->  Connection ... succeeded!       <-- الثغرة

# بـ --ctstate DNAT:
#   curl 10.10.2.254:8080  ->  hello from pc-a
#   nc 10.10.1.10 8000     ->  timed out: Operation in progress

# من غير enable_ip_masquerade=false (tcpdump على pc-a):
#   IP 10.10.1.1.41768 > 10.10.1.10.8000: Flags [S]
#   IP 10.10.1.10.8000 > 10.10.1.1.41768: Flags [S.]
#   IP 10.10.1.1.41768 > 10.10.1.10.8000: Flags [R]`
        },

        {
          cmd: "MTU والـ black hole",
          title: "الملف الصغير نزل، والكبير علّق",
          learn: R`تعرف PMTUD، وتعيد مشكلة الـ black hole، وتصلّحها بـ MSS clamping.`,
          out: R`لما تشوف «بيفتح نص الصفحة وبيعلّق»، تعرف تجرّب إيه.`,
          use: {
            net: R`أي نفق (VPN، أو PPPoE، أو GRE) بياكل من حجم الباكت. ولو ICMP ممنوع في السكة، الاتصالات الكبيرة بتموت.`,
            work: R`«الـ VPN شغّال، والمواقع بتفتح، بس التحميل بيقف» أو «SSH بيدخل وبيعلّق أول ما تكتب [[ls]] في فولدر كبير» — ده هو.`,
            cs: R`Path MTU Discovery: المرسل بيبعت باكتات كبيرة بـ «متقسمنيش» (DF)، واللي في السكة بيقوله «صغّر». ولو الرسالة دي اتمنعت، محدش بيعرف.`,
          },
          desc: R`على الراوتر: [[ip link set eth1 mtu 1400]]. يعني الناحية دي مبتعدّيش باكت أكبر من ١٤٠٠ بايت.

**ping بحجم ١٥٠٠ ومعاه «متقسمنيش»:**

[[ping -M do -s 1472 10.10.2.20]] ← [[From 10.10.1.254 icmp_seq=1 Frag needed and DF set (mtu = 1400)]]

الراوتر رد: «مقدرش، الحد ١٤٠٠». وده PMTUD شغّال صح.

**وتحميل ملف ٢ ميجا من [[pc-a]] لـ [[web-b]] (عن طريق port forward):** نزل في 5ms. و [[tcpdump]] على [[pc-a]] بيوري ليه:

[[IP 10.10.1.254 > 10.10.1.10: ICMP 10.10.2.20 unreachable - need to frag (mtu 1400)]]

و [[ip route get 10.10.2.20]] بعدها:

[[cache expires 594sec mtu 1400]]

[[pc-a]] اتعلّم الحد، وصغّر الباكتات لوحده. **ده الطبيعي.**

**دلوقتي اكسره:** الراوتر بيمنع رسالة «صغّر» دي:

[[iptables -A OUTPUT -p icmp --icmp-type fragmentation-needed -j DROP]]

| الملف | النتيجة |
|---|---|
| [[small.bin]] (٥٠٠ بايت) | [[code=200 size=500]] |
| [[big.bin]] (٢ ميجا) | **[[code=200 size=0 time=6.0]]** — [[curl exit 28]] |

**الـ headers وصلت ([[200]])، والبيانات ماوصلتش خالص.** لأن الـ headers صغيرة. والبيانات بتتبعت في باكتات ١٥٠٠ بايت، والراوتر بيرميها، ورسالة «صغّر» بتترمي هي كمان. فـ [[pc-a]] بيعيد إرسال نفس الحجم للأبد.

**الإصلاح: MSS clamping**

[[iptables -t mangle -A FORWARD -p tcp --tcp-flags SYN,RST SYN -j TCPMSS --clamp-mss-to-pmtu]]

← [[big.bin: code=200 size=2000000 time=0.005]]

الراوتر بيعدّل الـ MSS في أول باكت في الاتصال ([[SYN]])، فالطرفين بيتفقوا من الأول على حجم بيعدّي — من غير ما يحتاجوا رسالة ICMP خالص.

**ومصيدة في التجربة نفسها:** أول مرة، عملت ping الأول، فـ [[pc-a]] اتعلّم الحد ١٤٠٠ وخزّنه ١٠ دقايق. فلما منعت ICMP، التحميل **اشتغل** — مش لأن مفيش مشكلة، لأن [[pc-a]] كان عارف خلاص. ومقدرتش أمسح الكاش جوه الكونتينر ([[Read-only file system]])، فعدت المعمل من الأول.`,
          example: R`docker exec router ip link set eth1 mtu 1400
docker exec pc-a ping -c 1 -W 1 -M do -s 1472 10.10.2.20
#   From 10.10.1.254 icmp_seq=1 Frag needed and DF set (mtu = 1400)
# الـ black hole: الراوتر بيمنع رسالة «صغّر»
docker exec router iptables -A OUTPUT -p icmp --icmp-type fragmentation-needed -j DROP
docker exec web-b curl -s -m 6 -o /dev/null -w "small: size=%{size_download}\n" http://10.10.2.254:8080/small.bin
docker exec web-b curl -s -m 6 -o /dev/null -w "big: code=%{http_code} size=%{size_download}\n" http://10.10.2.254:8080/big.bin
#   small: size=500
#   big: code=200 size=0                    <-- الـ headers وصلت، والبيانات لأ
# الإصلاح
docker exec router iptables -t mangle -A FORWARD -p tcp --tcp-flags SYN,RST SYN -j TCPMSS --clamp-mss-to-pmtu
docker exec web-b curl -s -m 6 -o /dev/null -w "big: size=%{size_download}\n" http://10.10.2.254:8080/big.bin
#   big: size=2000000`,
          lines: [
            R`الناحية دي من الراوتر حدها ١٤٠٠ بايت.`,
            R`[[-M do]] = متقسمنيش (DF). و [[-s 1472]] + ٢٨ بايت headers = ١٥٠٠. **الراوتر بيرد بالحد.**`,
            R`**المنع**: رسالة «need to frag» اللي الراوتر بيبعتها بتترمي قبل ما تخرج.`,
            R`الملف الصغير: عدّى.`,
            R`الملف الكبير: الـ headers عدّت، والبيانات علّقت.`,
            R`**MSS clamping**: الراوتر بيصغّر الـ MSS في الـ [[SYN]] على حسب الـ MTU.`,
            R`دلوقتي الكبير نزل كله.`,
          ],
          try: R`على معمل جديد ([[down.sh]] و [[up.sh]] — **عشان الكاش**): جرّب التحميل الكبير مرة من غير منع (هيشتغل، وشوف [[ip route get 10.10.2.20]] على [[pc-a]])، ومرة بالمنع (هيعلّق)، ومرة بالمنع + MSS clamping. وفي كل مرة شغّل [[tcpdump -n -i eth0 'tcp[tcpflags] & tcp-syn != 0' -v]] على [[pc-a]] وشوف الـ [[mss]] في الـ SYN.`,
          deep: {
            why: R`كل نفق بيلف الباكت جوه باكت تانية، فالحجم المتاح بيقل. والإنترنت مبني على إن اللي في النص يقول «صغّر» بـ ICMP. ولما firewall «للأمان» يمنع كل ICMP، الآلية دي بتموت من غير ما حد يعرف.`,
            how: R`**الأرقام:**

| | بايت |
|---|---|
| MTU الإيثرنت | ١٥٠٠ |
| IP header | ٢٠ |
| TCP header | ٢٠ |
| **MSS** (أكبر بيانات في باكت TCP) | ١٥٠٠ − ٤٠ = **١٤٦٠** |
| ICMP header (للـ ping) | ٨ — فـ [[ping -s 1472]] + ٢٨ = ١٥٠٠ |

ومع MTU ١٤٠٠: MSS = ١٣٦٠.

**ليه الـ headers وصلت والبيانات لأ؟** رد HTTP بيبدأ بالـ headers (مئات البايتات — باكت صغيرة بتعدّي). وبعدها البيانات في باكتات MSS كاملة — ١٥٠٠ بايت — دي اللي بتترمي. فـ [[curl]] شاف [[200]] واستنى البيانات للأبد. وده بالظبط شكل المشكلة في الحقيقة: «الصفحة بتبدأ تحمّل وبتقف».

**التلات حلول:**

| الحل | |
|---|---|
| متمنعش ICMP type 3 code 4 | **الأصح.** امنع اللي انت عايزه، بس سيب «fragmentation needed» |
| MSS clamping على الراوتر/الـ VPN | بيحل TCP بس. UDP (و QUIC/HTTP3) مش هيستفيد |
| صغّر MTU على الجهاز نفسه | [[ip link set eth0 mtu 1400]] — بيحل كل حاجة، بس على الجهاز ده بس |

**وفي WireGuard:** الـ MTU الافتراضي ١٤٢٠ (١٥٠٠ − ٨٠ بايت للتغليف على IPv6). ولو الخط نفسه أقل من ١٥٠٠ (PPPoE = ١٤٩٢)، لازم تنزّله أكتر. (درس MTU في نفس التاب بيشرح الحسبة.)

**وإزاي تشخّصها في الحقيقة:**

~~~bash
# Linux:
ping -M do -s 1472 example.com      # صغّر لحد ما يعدّي
# Windows (PowerShell):
ping -f -l 1472 example.com
~~~

لو [[1472]] مبيعدّيش و [[1372]] بيعدّي، والرسالة [[Request timed out]] **مش** [[Frag needed]] — يبقى فيه حاجة في السكة بتمنع ICMP. وده الـ black hole.

**ومصيدة الكاش:** الكيرنل بيفتكر الـ MTU لكل وجهة ([[cache expires 594sec mtu 1400]]). فلو شخّصت مرة وبعدين غيّرت حاجة، النتيجة التانية ممكن تكون من الكاش. على جهاز عادي: [[ip route flush cache]]. وجوه كونتينر مش هينفع ([[Read-only file system]]) — اعمل الكونتينر من جديد.`,
            when: R`أي نفق، وأي «بيشتغل للحاجات الصغيرة بس»، وأي firewall بيمنع «كل ICMP».`,
            mistakes: R`تمنع كل ICMP «للأمان». أو تختبر بـ ping عادي (صغير، بيعدّي). أو تختبر بعد ما الكاش اتعلّم الحد. أو تفتكر MSS clamping بيحل UDP.`
          },
          teach: R`## الناحية دي من الراوتر حدها ١٤٠٠

~~~bash
docker exec router ip link set eth1 mtu 1400
~~~

---

## ١. PMTUD شغّال

~~~bash
docker exec pc-a ping -c 1 -W 1 -M do -s 1472 10.10.2.20
~~~

~~~text اتشغّل فعلًا · Docker 29.6
From 10.10.1.254 icmp_seq=1 Frag needed and DF set (mtu = 1400)
~~~

الراوتر قال: «الحد ١٤٠٠».

### وفي التحميل

~~~text tcpdump على pc-a وقت تحميل ٢ ميجا · اتشغّل فعلًا
IP 10.10.1.254 > 10.10.1.10: ICMP 10.10.2.20 unreachable - need to frag (mtu 1400), length 556
~~~

~~~text ip route get 10.10.2.20 · قبل وبعد
before:  cache
after:   cache expires 594sec mtu 1400
~~~

~~~text
big.bin: size=2000000 time=0.005664
~~~

**[[pc-a]] اتعلّم الحد، وصغّر لوحده.** ده الطبيعي.

---

## ٢. اكسره: امنع رسالة «صغّر»

~~~bash
docker exec router iptables -A OUTPUT -p icmp --icmp-type fragmentation-needed -j DROP
~~~

~~~text اتشغّل فعلًا (معمل جديد — عشان الكاش)
small.bin: code=200 size=500 time=0.001601
big.bin:   code=200 size=0   time=6.002483     curl exit=28
~~~

**الـ headers وصلت ([[200]])، والبيانات لأ.**

~~~text
headers  ~ مئات البايتات  ->  باكت صغيرة  ->  عدّت
بيانات   1460 بايت/باكت   ->  أكبر من 1400 ->  اترمت، ورسالة «صغّر» اترمت معاها
~~~

> وده شكل المشكلة في الحقيقة: «الصفحة بتبدأ تحمّل وبتقف».

---

## ٣. الإصلاح: MSS clamping

~~~bash
docker exec router iptables -t mangle -A FORWARD -p tcp --tcp-flags SYN,RST SYN \
  -j TCPMSS --clamp-mss-to-pmtu
~~~

~~~text اتشغّل فعلًا
big.bin: code=200 size=2000000 time=0.005145
~~~

الراوتر بيعدّل الـ MSS في الـ [[SYN]]، فالطرفين بيتفقوا من الأول على حجم بيعدّي.

---

## ٤. الأرقام

| | بايت |
|---|---|
| MTU | ١٥٠٠ |
| − IP − TCP | ٤٠ |
| **MSS** | **١٤٦٠** |
| مع MTU ١٤٠٠ | ١٣٦٠ |
| [[ping -s 1472]] + ٢٨ | ١٥٠٠ |

---

## ٥. التلات حلول

| | |
|---|---|
| **متمنعش ICMP type 3 code 4** | الأصح |
| MSS clamping | TCP بس — UDP و QUIC لأ |
| صغّر MTU على الجهاز | الجهاز ده بس |

---

## ٦. ومصيدة اتعلمتها هنا

أول مرة عملت ping **قبل** ما أمنع ICMP. [[pc-a]] اتعلّم الحد وخزّنه ١٠ دقايق. فلما منعت، التحميل **اشتغل**.

~~~text اتشغّل فعلًا
docker exec pc-a ip route flush cache
Cannot open "/proc/sys/net/ipv4/route/flush": Read-only file system
~~~

> فعدت المعمل من الأول. **أي تشخيص MTU، افتكر الكاش.**

---

## ٧. على جهازك

~~~bash
# Linux:
ping -M do -s 1472 example.com
# Windows (PowerShell):
ping -f -l 1472 example.com
~~~

[[Frag needed]] = PMTUD شغّال. و [[Request timed out]] على 1472 بس = **black hole**.

---

## الخلاصة

- كل نفق بياكل من الـ MTU.
- PMTUD معتمد على رسالة ICMP.
- منعها = الصغير يعدّي، والكبير يعلّق.
- MSS clamping بيحل TCP.
- متمنعش «fragmentation needed».`,
          sol: R`الـ ping و PMTUD والـ black hole والإصلاح ومصيدة الكاش اتشغّلوا على المعمل (Docker 29.6.1). أوامر ping على ويندوز وأرقام WireGuard من الوثائق.`,
          solCode: R`docker exec router ip link set eth1 mtu 1400
docker exec pc-a ping -c 1 -W 1 -M do -s 1472 10.10.2.20
#   From 10.10.1.254 icmp_seq=1 Frag needed and DF set (mtu = 1400)

# من غير منع: big.bin size=2000000 ، و pc-a استلم:
#   ICMP 10.10.2.20 unreachable - need to frag (mtu 1400)
#   ip route get: cache expires 594sec mtu 1400

# مع منع fragmentation-needed (معمل جديد):
#   small.bin: code=200 size=500
#   big.bin:   code=200 size=0  time=6.002483   (curl exit 28)

# + TCPMSS --clamp-mss-to-pmtu:
#   big.bin:   code=200 size=2000000 time=0.005145`
        }
      ]
    },

    {
      t: "توصل للإجابة بنفسك في الشبكات",
      l: 2,
      time: R`حوالي ساعة`,
      goal: [
        R`تقرا رسالة الفشل وتعرف منها حصل إيه في الشبكة، من غير تخمين.`,
        R`تفرّق بين «refused» و«timeout» و«unreachable»، وتعرف إن refused مش دايمًا «مفيش حاجة بتسمع».`,
        R`تختار الأداة الصح لكل سؤال، وتبدأ من الطبقة الصح.`,
      ],
      use: {
        net: R`أول دقيقة في أي «مش بيوصل» بتحدد هتقضي عشر دقايق ولا ساعة. والرسالة نفسها بتقولك نص الإجابة.`,
        prog: R`[[ECONNREFUSED]] و [[ETIMEDOUT]] و [[EHOSTUNREACH]] اللي بتشوفهم في Node و Python هما نفس الحاجات دي بالظبط.`,
        work: R`«مش شغال» مش معلومة. «Connection refused بعد 0ms» معلومة.`,
      },
      lab: R`# المعمل من القسم اللي فات: up.sh`,
      projects: [
        { t: R`جدول الفشل بتاعك`, what: R`على المعمل، اعمل الخمس حالات (شغّال، مفيش حاجة بتسمع، DROP، REJECT، host-unreachable)، وسجّل لكل واحدة: رسالة [[curl]]، ورسالة [[nc]]، والـ errno من Python، والوقت، وشكلها في [[tcpdump]]. ده جدول هترجع له.` },
        { t: R`سكربت تشخيص`, what: R`سكربت بياخد عنوان وبورت، ويعمل بالترتيب: [[ip route get]]، و [[getent hosts]] لو اسم، و [[nc -zv]]، و [[curl -v]]. ويطبع في الآخر: الطبقة اللي وقف عندها.` },
      ],
      n: R`الرسايل والأوقات هنا كلها من المعمل اللي فات، اتشغّلت فعلًا`,
      items: [
        {
          cmd: "اقرا الفشل: refused و timeout و unreachable",
          title: "الرسالة والوقت بيقولوا حصل إيه",
          learn: R`تعرف كل نوع فشل شكله إيه في الرسالة والوقت و tcpdump.`,
          out: R`من رسالة واحدة تعرف المشكلة في الجهاز ولا في السكة ولا في الطرف التاني.`,
          use: {
            net: R`[[RST]] جه بسرعة = حد رد (البرنامج أو firewall). مفيش رد خالص = حاجة بترمي في صمت. و ICMP = حد في السكة قال «مش هعدّي».`,
            prog: R`في Node: [[ECONNREFUSED]] و [[ETIMEDOUT]] و [[EHOSTUNREACH]]. في Python: [[ConnectionRefusedError]] و [[TimeoutError]] و [[OSError: [Errno 113]]]. نفس الكيرنل، نفس الأسباب.`,
          },
          desc: R`على المعمل، الراوتر عليه قواعد مختلفة لكل بورت، وجرّبت من [[pc-a]] بـ Python (عشان الـ errno يبان):

| البورت | اللي عملته | النتيجة | الوقت |
|---|---|---|---|
| 80 | سيرفر شغّال | اتوصل | 5ms |
| 81 | **مفيش حاجة بتسمع** | [[ConnectionRefusedError: [Errno 111] Connection refused]] | **0ms** |
| 82 | الراوتر [[DROP]] | [[TimeoutError: timed out]] | **5005ms** |
| 83 | الراوتر [[REJECT]] (الافتراضي) | **[[ConnectionRefusedError: [Errno 111]]]** | 0ms |
| 84 | [[REJECT --reject-with icmp-host-unreachable]] | [[OSError: [Errno 113] Host is unreachable]] | 0ms |
| 85 | [[REJECT --reject-with tcp-reset]] | [[ConnectionRefusedError: [Errno 111]]] | 0ms |

**تلات حاجات من الجدول ده:**

**١. الوقت بيفرّق.** refused في 0ms — حد رد فورًا. timeout بعد المهلة كلها — محدش رد خالص.

**٢. «Connection refused» مش دليل إن مفيش برنامج.** بورت 81 (فاضي) وبورت 83 (firewall) طلّعوا **نفس الرسالة بالظبط**. فلما تشوف refused، لسه لازم تتأكد إن البرنامج شغّال على الجهاز نفسه ([[ss -tlnp]]).

**٣. [[curl]] الحديث بيخبّي الفرق.** [[curl 8.14]] طلّع للأربع حالات (81 و 83 و 84 و 85) نفس الرسالة:

[[curl: (7) Failed to connect to 10.10.2.20 port 81 after 0 ms: Could not connect to server]]

بس [[nc]] بيفرّق:

[[nc: connect to 10.10.2.20 port 81 (tcp) failed: Connection refused]]

[[nc: connect to 10.10.2.20 port 82 (tcp) timed out: Operation in progress]]

[[nc: connect to 10.10.2.20 port 84 (tcp) failed: Host is unreachable]]

**و [[tcpdump]] بيوريك ليه:**

[[10.10.1.10.44250 > 10.10.2.20.81: Flags [S]]] ← [[10.10.2.20.81 > 10.10.1.10.44250: Flags [R.]]]

[[10.10.1.10.58624 > 10.10.2.20.82: Flags [S]]] ×٣ — ومفيش رد

الـ [[SYN]] على 82 اتبعت **تلات مرات**: الكيرنل بيعيد المحاولة لأنه مش عارف الباكت ضاعت ولا اتأخرت.`,
          example: R`# probe.py — بيجرّب كل بورت ويطبع الـ errno والوقت
import socket, sys, time
for target in sys.argv[1:]:
    host, port = target.rsplit(":", 1)
    t = time.monotonic()
    try:
        socket.create_connection((host, int(port)), timeout=5).close()
        r = "اتوصل"
    except Exception as e:
        r = f"{type(e).__name__}: {e}"
    print(f"{target:<18} {round((time.monotonic()-t)*1000):>5}ms  {r}")`,
          lines: [
            R`[[socket]] مباشرة، من غير مكتبة — عشان الـ errno يبان زي ما الكيرنل رجّعه.`,
            R`لكل عنوان:بورت.`,
            R`[[rsplit(":", 1)]] بيقسم من الآخر.`,
            R`بداية الوقت. [[monotonic]] مش بتتأثر بتغيير الساعة.`,
            R`محاولة.`,
            R`[[create_connection]] بيعمل TCP handshake بس، ومهلة ٥ ثواني.`,
            R`اتوصل.`,
            R`أي فشل.`,
            R`اسم الخطأ ورسالته — هنا الـ errno.`,
            R`العنوان، والوقت بالمللي، والنتيجة.`,
          ],
          try: R`[[docker exec -i pc-a sh -c 'cat > /probe.py' < probe.py]] وبعدين [[docker exec pc-a python3 /probe.py 10.10.2.20:80 10.10.2.20:81 10.10.2.20:82]]. وبعدين على جهازك انت: [[python probe.py localhost:1 example.com:81]] — وقارن.`,
          flag: "script",
          deep: {
            why: R`الكيرنل بيعرف بالظبط حصل إيه، وبيرجّعه كرقم. وكل أداة بتترجم الرقم ده لرسالة — بعضها بتفصّل، وبعضها بتجمّع.`,
            how: R`**الجدول اللي بتحفظه:**

| الرسالة | errno | حصل إيه | السبب الغالب |
|---|---|---|---|
| Connection refused | [[ECONNREFUSED]] 111 | [[RST]] رجع، أو ICMP port-unreachable | مفيش برنامج، **أو** firewall [[REJECT]] |
| timed out | [[ETIMEDOUT]] | مفيش أي رد | firewall [[DROP]]، أو الجهاز مش موجود، أو الرد بيرجع من طريق تاني |
| Host is unreachable | [[EHOSTUNREACH]] 113 | ICMP host-unreachable | راوتر في السكة رافض، أو ARP فشل على نفس الشبكة |
| Network is unreachable | [[ENETUNREACH]] 101 | **من جهازك**، مفيش طريق | جدول التوجيه عندك |
| Name or service not known / Could not resolve | — | DNS | الاسم أو الـ resolver |
| Connection reset by peer | [[ECONNRESET]] 104 | [[RST]] **بعد** ما الاتصال اتفتح | البرنامج وقع، أو proxy قطع |

(الأرقام دي من لينكس. ويندوز ليه أرقام تانية — [[WSAECONNREFUSED]] = 10061 مثلًا — بس نفس المعنى.)

**والوقت بيكمّل الصورة:**

| | |
|---|---|
| 0ms | حد رد — الطرف التاني أو firewall قريب |
| بالظبط المهلة | محدش رد — اتأكد من المهلة اللي انت حاططها |
| ٢١ ثانية تقريبًا على لينكس | المهلة الافتراضية للـ SYN (٦ إعادات) — لو مفيش timeout في الكود |

(رقم الـ ٢١ ثانية من [[tcp_syn_retries]] الافتراضي في لينكس، ومااتقاسش هنا.)

**إزاي تفرّق refused البرنامج من refused الـ firewall؟** من الجهاز نفسه:

~~~bash
docker exec web-b ss -tlnp
~~~

~~~text اتشغّل فعلًا
LISTEN 0  5   0.0.0.0:80   0.0.0.0:*   users:(("python3",pid=1,fd=3))
~~~

لو البورت مش في القايمة: البرنامج. لو في القايمة والـ refused لسه: فيه حاجة في السكة بترفض.

**وفي الكود:**

~~~js
// Node
try { await fetch(url); }
catch (e) { console.log(e.cause?.code); }   // ECONNREFUSED | ETIMEDOUT | EHOSTUNREACH | ENOTFOUND
~~~`,
            when: R`أول ما أي اتصال يفشل. قبل ما تغيّر أي حاجة.`,
            mistakes: R`«refused» = «البرنامج واقف» من غير ما تبص على [[ss]]. أو تعتمد على [[curl]] الحديث في التفرقة. أو متبصش على الوقت. أو timeout بـ ٢١ ثانية لأن الكود مفيهوش مهلة.`
          },
          teach: R`## تجربة واحدة، ست نتايج

الراوتر عليه قاعدة مختلفة لكل بورت:

~~~bash
docker exec router sh -c '
  iptables -A FORWARD -p tcp --dport 82 -j DROP
  iptables -A FORWARD -p tcp --dport 83 -j REJECT
  iptables -A FORWARD -p tcp --dport 84 -j REJECT --reject-with icmp-host-unreachable
  iptables -A FORWARD -p tcp --dport 85 -j REJECT --reject-with tcp-reset'
~~~

~~~bash
docker exec pc-a python3 /probe.py 10.10.2.20:80 10.10.2.20:81 10.10.2.20:82 10.10.2.20:83 10.10.2.20:84 10.10.2.20:85
~~~

~~~text اتشغّل فعلًا · Docker 29.6، Python 3.12
10.10.2.20:80          5ms  اتوصل
10.10.2.20:81          0ms  ConnectionRefusedError: [Errno 111] Connection refused
10.10.2.20:82       5005ms  TimeoutError: timed out
10.10.2.20:83          0ms  ConnectionRefusedError: [Errno 111] Connection refused
10.10.2.20:84          0ms  OSError: [Errno 113] Host is unreachable
10.10.2.20:85          0ms  ConnectionRefusedError: [Errno 111] Connection refused
~~~

---

## ١. الوقت بيفرّق

| | |
|---|---|
| **0ms** | حد رد فورًا |
| **5005ms** | محدش رد — المهلة خلصت |

---

## ٢. refused مش دليل

بورت **81** (مفيش حاجة بتسمع) وبورت **83** (firewall [[REJECT]]) — **نفس الرسالة بالظبط**.

~~~bash فالتأكيد من الجهاز نفسه
docker exec web-b ss -tlnp
~~~

~~~text اتشغّل فعلًا
LISTEN 0  5   0.0.0.0:80   0.0.0.0:*   users:(("python3",pid=1,fd=3))
~~~

81 مش في القايمة. 83 مش في القايمة برضه — بس لو كان فيها، الـ refused يبقى من حاجة في السكة.

---

## ٣. [[curl]] الحديث بيخبّي الفرق

~~~text curl 8.14 · اتشغّل فعلًا
81:  curl: (7) Failed to connect to 10.10.2.20 port 81 after 0 ms: Could not connect to server
83:  curl: (7) Failed to connect to 10.10.2.20 port 83 after 0 ms: Could not connect to server
84:  curl: (7) Failed to connect to 10.10.2.20 port 84 after 0 ms: Could not connect to server
82:  curl: (28) Connection timed out after 5002 milliseconds
~~~

~~~text nc · اتشغّل فعلًا
nc: connect to 10.10.2.20 port 81 (tcp) failed: Connection refused
nc: connect to 10.10.2.20 port 82 (tcp) timed out: Operation in progress
nc: connect to 10.10.2.20 port 84 (tcp) failed: Host is unreachable
~~~

**[[nc]] أو Python لما تحتاج التفصيل.**

---

## ٤. و tcpdump بيوريك ليه

~~~text اتشغّل فعلًا
IP 10.10.1.10.44250 > 10.10.2.20.81: Flags [S]
IP 10.10.2.20.81 > 10.10.1.10.44250: Flags [R.]          <-- refused: RST فورًا
IP 10.10.1.10.58624 > 10.10.2.20.82: Flags [S]
IP 10.10.1.10.58624 > 10.10.2.20.82: Flags [S]
IP 10.10.1.10.58624 > 10.10.2.20.82: Flags [S]           <-- DROP: الكيرنل بيعيد، ومفيش رد
~~~

---

## ٥. الجدول اللي بتحفظه

| الرسالة | errno | حصل إيه |
|---|---|---|
| Connection refused | 111 | [[RST]] — برنامج مش موجود **أو** [[REJECT]] |
| timed out | — | مفيش رد — [[DROP]]، أو مفيش جهاز، أو الرد بيرجع من طريق تاني |
| Host is unreachable | 113 | ICMP من راوتر في السكة |
| Network is unreachable | 101 | **جهازك** مفيهوش طريق |
| Could not resolve | — | DNS |
| Connection reset by peer | 104 | [[RST]] بعد ما الاتصال اتفتح |

> ويندوز ليه أرقام تانية ([[10061]] = refused) بنفس المعنى.

---

## ٦. وفي الكود

~~~js
try { await fetch(url); }
catch (e) { console.log(e.cause?.code); }   // ECONNREFUSED | ETIMEDOUT | EHOSTUNREACH | ENOTFOUND
~~~

---

## الخلاصة

- الوقت + الرسالة = نص التشخيص.
- refused = حد رد بـ RST. **مش** بالضرورة البرنامج.
- timeout = محدش رد.
- [[ss -tlnp]] على الجهاز نفسه بيقفل الشك.
- [[curl]] الحديث بيجمّع، و [[nc]] بيفصّل.`,
          sol: R`الست حالات اتشغّلت على المعمل بـ Python 3.12 و [[nc]] و [[curl]] 8.14 و [[tcpdump]]. أرقام ويندوز ومهلة الـ ٢١ ثانية من الوثائق.`,
          solCode: R`docker exec pc-a python3 /probe.py 10.10.2.20:80 10.10.2.20:81 10.10.2.20:82 10.10.2.20:83 10.10.2.20:84 10.10.2.20:85
#   10.10.2.20:80          5ms  اتوصل
#   10.10.2.20:81          0ms  ConnectionRefusedError: [Errno 111] Connection refused
#   10.10.2.20:82       5005ms  TimeoutError: timed out
#   10.10.2.20:83          0ms  ConnectionRefusedError: [Errno 111] Connection refused
#   10.10.2.20:84          0ms  OSError: [Errno 113] Host is unreachable
#   10.10.2.20:85          0ms  ConnectionRefusedError: [Errno 111] Connection refused

# tcpdump: 81 -> [S] ثم [R.]   |   82 -> [S] ×3 ومفيش رد`
        },

        {
          cmd: "السؤال ← الأداة",
          title: "كل سؤال ليه أداة، وكل أداة بتجاوب على حاجة واحدة",
          learn: R`تعرف أنهي أمر يجاوب أنهي سؤال، وتمشي من الأسفل للأعلى أو العكس بترتيب.`,
          out: R`تشخيص بخطوات ثابتة بدل ما تجرّب أوامر عشوائي.`,
          use: {
            net: R`كل أداة بتشوف طبقة واحدة. ولما تعرف أنهي أداة بتشوف إيه، بتعرف تسأل السؤال الصح.`,
            work: R`«اعمل ping» مش تشخيص. «[[ip route get]] بيقول هيطلع من الكارت الغلط» تشخيص.`,
          },
          desc: R`**سبع أسئلة، وسبع أدوات**، وكلهم اتشغّلوا على المعمل:

| السؤال | الأداة | الناتج الحقيقي |
|---|---|---|
| أنا مين على الشبكة؟ | [[ip -4 -br addr]] | [[eth0@if223  UP  10.10.1.254/24]] |
| الباكت هتطلع منين؟ | [[ip route get 10.10.2.20]] | [[10.10.2.20 via 10.10.1.254 dev eth0 src 10.10.1.10]] |
| الاسم بيتحل؟ | [[getent hosts router]] | [[10.10.1.254  router  router]] |
| فيه حاجة بتسمع؟ | [[ss -tlnp]] | [[LISTEN 0 5 0.0.0.0:80 ... users:(("python3",pid=1,fd=3))]] |
| البورت بيرد؟ | [[nc -zv host port]] | [[Connection refused]] أو [[timed out]] |
| الخدمة بترد صح؟ | [[curl -v]] | [[* Connected to 10.10.2.20 port 80]] و [[> GET / HTTP/1.1]] |
| الباكت عدّت فعلًا؟ | [[tcpdump -n -i any]] | [[eth0 In ... eth1 Out ...]] |

**وفيه سؤال تامن بيفوت الناس:** **الطريق فيه كام خطوة؟** — [[traceroute -n]].

**ومفاجأة من نفس المعمل:** [[getent hosts router]] من [[pc-a]] **رد**، و [[getent hosts web-b]] **مردش** ([[exit=2]]) — مع إن [[pc-a]] بيوصل لـ IP بتاع [[web-b]] عادي. لأن الـ DNS الداخلي بتاع Docker بيرد بأسماء الكونتينرات **اللي على نفس الشبكة بس**. الـ routing بيوصل، والأسماء لأ. فـ «بيوصل بالـ IP ومش بالاسم» = مشكلة DNS، مش شبكة.

**والترتيب:** من الأسهل للأعمق، والأهم إنك **تبدأ من الطلب الحقيقي** لو تقدر (درس «ping نجح ومفيش جهاز» في تاب cmd):

١. [[curl -v]] — الطلب الحقيقي. نجح؟ خلاص.

٢. فشل؟ اقرا الرسالة والوقت (الدرس اللي فات).

٣. DNS؟ [[getent hosts]] (بيستخدم نفس الـ resolver اللي برنامجك بيستخدمه) قبل [[dig]] (بيسأل DNS مباشرة).

٤. الطريق؟ [[ip route get]] و [[traceroute]].

٥. الطرف التاني؟ [[ss -tlnp]] عليه.

٦. لسه مش واضح؟ [[tcpdump]] على الناحيتين.`,
          example: R`docker exec router ip -4 -br addr
docker exec pc-a ip route get 10.10.2.20
docker exec pc-a getent hosts router
docker exec pc-a getent hosts web-b; echo "exit=$?"
docker exec web-b ss -tlnp
docker exec pc-a nc -zv -w 2 10.10.2.20 80
docker exec pc-a curl -sv -m 3 -o /dev/null http://10.10.2.20/
docker exec pc-a traceroute -n -w 1 -q 1 10.10.2.20`,
          lines: [
            R`**أنا مين؟** كل كارت وعنوانه في سطر.`,
            R`**هتطلع منين؟** الكيرنل بيقولك بالظبط: عن طريق مين، ومن أنهي كارت، وبأنهي مصدر.`,
            R`**الاسم؟** [[getent]] بيستخدم نفس طريقة البرامج (ملف hosts و DNS).`,
            R`و [[web-b]] على شبكة تانية: **مفيش**. و [[exit=2]] = ملقاش.`,
            R`**مين بيسمع؟** على الجهاز نفسه، ومعاه اسم البرنامج.`,
            R`**البورت بيرد؟** من غير ما تبعت أي بيانات.`,
            R`**الخدمة بترد صح؟** [[-v]] بيوريك الاتصال والطلب والرد.`,
            R`**كام خطوة؟**`,
          ],
          try: R`اكسر حاجة واحدة في المعمل من غير ما تبص (خلي حد يكسرها، أو اكتب أمر عشوائي من دول: اشيل الطريق، أو [[DROP]] على 80، أو اقفل السيرفر، أو اقفل [[ip_forward]]). وبعدين امشي على الستة خطوات بالترتيب ووقف عند أول واحدة بتقول حاجة غلط.`,
          deep: {
            why: R`كل أداة بتشوف طبقة واحدة. فلو استخدمت أداة غلط للسؤال، هتاخد إجابة صح على سؤال تاني. وده أكتر سبب للتشخيص اللي بيلف في دواير.`,
            how: R`**[[getent]] مقابل [[dig]]:**

| | بيسأل | بيقرا [[/etc/hosts]]؟ |
|---|---|---|
| [[getent hosts name]] | نفس طريقة البرامج ([[nsswitch]]) | **أيوه** |
| [[dig name]] | سيرفر DNS مباشرة | لأ |
| [[nslookup name]] | سيرفر DNS مباشرة | لأ |

فلو [[dig]] بيرد و البرنامج مش لاقي الاسم (أو العكس)، الفرق غالبًا في [[/etc/hosts]] أو في ترتيب [[nsswitch.conf]].

**[[ss]] مقابل [[netstat]]:** [[ss]] الأحدث على لينكس وأسرع. و [[netstat -ano]] على ويندوز. والاتنين بيجاوبوا «مين بيسمع على إيه». و [[0.0.0.0:80]] = كل الكروت، و [[127.0.0.1:80]] = الجهاز نفسه بس (درس «البورت المفتوح للدنيا» في تاب docker).

ولاحظ في ناتج [[ss]] على [[web-b]]: فيه سطر [[127.0.0.11:40489]] — ده الـ DNS الداخلي بتاع Docker، شغّال جوه كل كونتينر.

**[[curl -v]] بيقرا كده:**

~~~text
*   Trying 10.10.2.20:80...                  <-- بيحاول
* Connected to 10.10.2.20 (10.10.2.20) port 80   <-- TCP اتفتح
> GET / HTTP/1.1                              <-- اللي اتبعت
> Host: 10.10.2.20
< HTTP/1.0 200 OK                             <-- اللي رجع
~~~

[[*]] = curl بيحكي، و [[>]] = اللي اتبعت، و [[<]] = اللي رجع. ولو وقف عند [[Trying]]، المشكلة قبل TCP. ولو وقف بعد [[Connected]]، الخدمة نفسها.

**وعلى ويندوز:**

| السؤال | PowerShell |
|---|---|
| أنا مين؟ | [[Get-NetIPAddress -AddressFamily IPv4]] |
| هتطلع منين؟ | [[Find-NetRoute -RemoteIPAddress 10.10.2.20]] |
| الاسم؟ | [[Resolve-DnsName name]] |
| مين بيسمع؟ | [[Get-NetTCPConnection -State Listen]] |
| البورت؟ | [[Test-NetConnection host -Port 80]] |

(الأوامر دي موجودة في Windows PowerShell 5.1 و 7، ومااتشغّلتش على المعمل لأنه لينكس.)`,
            when: R`كل مرة حاجة «مش بتوصل». بالترتيب، من غير ما تقفز.`,
            mistakes: R`تبدأ بـ ping. أو تستخدم [[dig]] وتفتكر البرنامج شايف نفس الحاجة. أو [[ss]] على جهازك بدل الجهاز التاني. أو تقفز لـ [[tcpdump]] قبل ما تقرا الرسالة.`
          },
          teach: R`## سبع أسئلة، سبع أدوات

كلهم اتشغّلوا على المعمل.

---

## ١. أنا مين على الشبكة؟

~~~bash
docker exec router ip -4 -br addr
~~~

~~~text اتشغّل فعلًا · Docker 29.6
lo               UNKNOWN        127.0.0.1/8
eth0@if223       UP             10.10.1.254/24
eth1@if224       UP             10.10.2.254/24
~~~

---

## ٢. الباكت هتطلع منين؟

~~~bash
docker exec pc-a ip route get 10.10.2.20
~~~

~~~text اتشغّل فعلًا
10.10.2.20 via 10.10.1.254 dev eth0 src 10.10.1.10 uid 0
~~~

عن طريق مين، ومن أنهي كارت، وبأنهي مصدر. **الكيرنل نفسه بيقولك.**

---

## ٣. الاسم بيتحل؟

~~~bash
docker exec pc-a getent hosts router
docker exec pc-a getent hosts web-b; echo "exit=$?"
~~~

~~~text اتشغّل فعلًا
10.10.1.254       router  router
exit=2
~~~

**مفاجأة:** [[web-b]] مالوش اسم عند [[pc-a]] — مع إنه بيوصل لـ IP بتاعه عادي.

> الـ DNS بتاع Docker بيرد بأسماء الكونتينرات **على نفس الشبكة بس**. الـ routing بيوصل، والأسماء لأ.
> فـ «بيوصل بالـ IP ومش بالاسم» = **DNS**، مش شبكة.

---

## ٤. فيه حاجة بتسمع؟

~~~bash
docker exec web-b ss -tlnp
~~~

~~~text اتشغّل فعلًا
State  Recv-Q Send-Q Local Address:Port  Peer Address:Port Process
LISTEN 0      4096      127.0.0.11:40489      0.0.0.0:*
LISTEN 0      5            0.0.0.0:80         0.0.0.0:*    users:(("python3",pid=1,fd=3))
~~~

> [[127.0.0.11]] = الـ DNS الداخلي بتاع Docker، شغّال جوه كل كونتينر.

---

## ٥. الخدمة بترد صح؟

~~~bash
docker exec pc-a curl -sv -m 3 -o /dev/null http://10.10.2.20/
~~~

~~~text اتشغّل فعلًا
*   Trying 10.10.2.20:80...
* Connected to 10.10.2.20 (10.10.2.20) port 80
* using HTTP/1.x
> GET / HTTP/1.1
> Host: 10.10.2.20
> User-Agent: curl/8.14.1
> Accept: */*
~~~

| | |
|---|---|
| [[*]] | curl بيحكي |
| [[>]] | اللي اتبعت |
| [[<]] | اللي رجع |

وقف عند [[Trying]]؟ المشكلة قبل TCP. بعد [[Connected]]؟ الخدمة.

---

## ٦. الترتيب

~~~text
١. curl -v           الطلب الحقيقي — نجح؟ خلاص
٢. الرسالة والوقت    الدرس اللي فات
٣. getent hosts      DNS — بنفس طريقة البرامج
٤. ip route get      الطريق
   traceroute -n     كام خطوة
٥. ss -tlnp          على الطرف التاني
٦. tcpdump           على الناحيتين — آخر حاجة
~~~

---

## ٧. [[getent]] مقابل [[dig]]

| | بيسأل | [[/etc/hosts]]؟ |
|---|---|---|
| [[getent hosts]] | زي البرامج | **أيوه** |
| [[dig]] / [[nslookup]] | DNS مباشرة | لأ |

---

## ٨. وعلى ويندوز

| السؤال | PowerShell |
|---|---|
| أنا مين؟ | [[Get-NetIPAddress -AddressFamily IPv4]] |
| هتطلع منين؟ | [[Find-NetRoute -RemoteIPAddress X]] |
| الاسم؟ | [[Resolve-DnsName X]] |
| مين بيسمع؟ | [[Get-NetTCPConnection -State Listen]] |
| البورت؟ | [[Test-NetConnection X -Port 80]] |

> مااتشغّلتش على المعمل لأنه لينكس.

---

## الخلاصة

- كل أداة بتجاوب على طبقة واحدة.
- ابدأ بالطلب الحقيقي.
- [[ip route get]] بيقولك قرار الكيرنل.
- «IP شغال، الاسم لأ» = DNS.
- [[ss]] على الطرف **التاني**.
- [[tcpdump]] آخر حاجة.`,
          sol: R`الأدوات السبعة اتشغّلت على المعمل (Docker 29.6.1، Alpine 3.21). أوامر ويندوز من الوثائق.`,
          solCode: R`docker exec router ip -4 -br addr
#   eth0@if223  UP  10.10.1.254/24
#   eth1@if224  UP  10.10.2.254/24
docker exec pc-a ip route get 10.10.2.20
#   10.10.2.20 via 10.10.1.254 dev eth0 src 10.10.1.10 uid 0
docker exec pc-a getent hosts router
#   10.10.1.254  router  router
docker exec pc-a getent hosts web-b; echo "exit=$?"
#   exit=2                                     <-- شبكة تانية، مفيش اسم
docker exec web-b ss -tlnp
#   LISTEN 0 5 0.0.0.0:80 0.0.0.0:* users:(("python3",pid=1,fd=3))
docker exec pc-a curl -sv -m 3 -o /dev/null http://10.10.2.20/
#   * Connected to 10.10.2.20 (10.10.2.20) port 80
#   > GET / HTTP/1.1`
        }
      ]
    }
]);
