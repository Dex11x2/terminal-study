// تكملة تاب net: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/net/01.js (شرح حقول الدرس في أوله)
MORE("net", [
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
