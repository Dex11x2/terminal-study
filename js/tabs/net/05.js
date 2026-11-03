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
    }
]);
