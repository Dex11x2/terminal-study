// تكملة تاب glossary: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/glossary/01.js (شرح حقول الدرس في أوله)
MORE("glossary", [
    {
      t: "الشبكة",
      l: 1,
      items: [
        {
          cmd: "IP address",
          title: "عنوان الجهاز",
          desc: "رقم بيحدد جهاز على الشبكة. الخاص (192.168.x، 10.x) جوه شبكتك بس. العام على النت. الـ VPS ليه عام، وجهازك في البيت وراه راوتر بعام واحد.",
          teach: R`## نوعين عناوين

| النوع | شكله | بيتشاف من فين |
|---|---|---|
| خاص (private) | [[192.168.x.x]] و [[10.x.x.x]] و [[172.16]] لحد [[172.31]] | جوه نفس الشبكة بس |
| عام (public) | أي حاجة تانية تقريبًا | من النت كله |

جهازك في البيت واخد عنوان خاص من الراوتر، والراوتر هو اللي معاه العام. والـ VPS معاه عام مباشرة.

## المثال: [[curl -s ifconfig.me]]

- [[curl]] بيطلب صفحة ويطبعها، و [[-s]] (silent) من غير شريط التقدم.
- [[ifconfig.me]] موقع بيرد بالعنوان اللي الطلب جه منه، يعني عنوانك العام.

~~~text الناتج (العنوان متغيّر للخصوصية)
203.0.113.25
~~~

وفي نفس الوقت [[hostname -I]] جوه container طلع [[172.17.0.3]]: عنوان خاص من شبكة Docker.

> الخلاصة: العام هو اللي النت يشوفه، والخاص للشبكة اللي انت فيها بس.`,
          example: "curl -s ifconfig.me",
          try: "bash المستوى ٢: [[ip a / ip route]]"
        },
        {
          cmd: "port",
          title: "البورت",
          desc: "رقم من 1 لـ 65535 بيميّز خدمة على نفس الجهاز: 22 SSH، 80 HTTP، 443 HTTPS، 5432 Postgres. عملية واحدة بس تسمع على بورت.",
          teach: R`## الفكرة

الـ IP بيوصل الطلب للجهاز، والبورت بيوصله للبرنامج الصح جوه الجهاز. زي عنوان العمارة ورقم الشقة.

| البورت | الخدمة |
|---|---|
| 22 | SSH |
| 80 | HTTP |
| 443 | HTTPS |
| 5432 | PostgreSQL |
| 3000 | تطبيق Node وقت التطوير (عادة مش قاعدة) |

## المثال: [[sudo ss -tlnp | head]]

- [[ss]] (socket statistics) بيعرض الاتصالات.
- [[-t]] TCP، و [[-l]] اللي بيسمع (listening)، و [[-n]] أرقام مش أسامي، و [[-p]] اسم العملية (محتاج sudo عشان يشوف عمليات اليوزرز التانيين).

~~~text الناتج في ubuntu:24.04 وفيه nginx شغال
State  Recv-Q Send-Q Local Address:Port Peer Address:PortProcess
LISTEN 0      511          0.0.0.0:80        0.0.0.0:*    users:(("nginx",pid=3395,fd=6))
LISTEN 0      511          0.0.0.0:8080      0.0.0.0:*    users:(("nginx",pid=3395,fd=5))
LISTEN 0      511             [::]:80           [::]:*    users:(("nginx",pid=3395,fd=7))
~~~

[[Local Address:Port]] هو المهم: nginx سامع على 80 و 8080، والسطر التالت نفس البورت 80 على IPv6.

> الخلاصة: «address already in use» يعني عملية تانية ماسكة البورت، و [[ss -tlnp]] بيقولك مين.`,
          example: "sudo ss -tlnp | head",
          try: "ابدأ من هنا"
        },
        {
          cmd: "localhost / loopback",
          title: "الجهاز نفسه",
          desc: "127.0.0.1 عنوان بيشاور على نفس الجهاز. خدمة بتسمع عليه بس مش بتتشاف من بره. جوه container، localhost هو الـ container نفسه.",
          teach: R`## الفكرة

[[127.0.0.1]] (واسمه [[localhost]]) عنوان بيرجع لنفس الجهاز من غير ما يطلع على أي شبكة. خدمة سامعة عليه بس محدش من بره يقدر يوصلها، وده كويس لقاعدة البيانات.

## المثال

~~~bash
curl -sI http://127.0.0.1:3000 | head -1
~~~

- [[-I]] اطلب الـ headers بس، و [[-s]] من غير شريط تقدم.
- [[:3000]] البورت.
- [[head -1]] أول سطر: سطر الحالة.

جرّبناه في ubuntu:24.04 على nginx بيعمل proxy لـ 3000 ومفيش حاجة على 3000:

~~~text الناتج
HTTP/1.1 502 Bad Gateway
~~~

ولو التطبيق شغال هيطلع [[HTTP/1.1 200 OK]].

> الخلاصة: جوه container، [[localhost]] هو الـ container نفسه مش جهازك، فـ container مش هيوصل لقاعدة على جهازك بـ localhost.`,
          example: "curl -sI http://127.0.0.1:3000 | head -1",
          try: "bash المستوى ٢: [[127.0.0.1 و 0.0.0.0]]"
        },
        {
          cmd: "0.0.0.0",
          title: "كل الكروت",
          desc: "لما خدمة تسمع عليه، بتقبل اتصالات من أي عنوان: الجهاز نفسه والشبكة والنت. الأصح لـ Nginx، والأخطر لقاعدة البيانات.",
          teach: R`## الفكرة

لما خدمة «تسمع» لازم تقول على أنهي عنوان:

| بتسمع على | مين يقدر يوصلها |
|---|---|
| [[127.0.0.1]] | الجهاز نفسه بس |
| [[0.0.0.0]] | أي حد يوصل لأي كارت شبكة في الجهاز |

[[0.0.0.0]] مش عنوان تبعتله، معناها «كل العناوين اللي عندي».

## المثال: [[sudo ss -tlnp | grep 0.0.0.0]]

نفس [[ss -tlnp]] بتاع البورتات، و [[grep]] بيسيب السطور المفتوحة لكل الناس بس:

~~~text الناتج في ubuntu:24.04
LISTEN 0      511          0.0.0.0:80        0.0.0.0:*    users:(("nginx",pid=3395,fd=6))
LISTEN 0      511          0.0.0.0:8080      0.0.0.0:*    users:(("nginx",pid=3395,fd=5))
~~~

nginx على [[0.0.0.0:80]] صح، لأنه المفروض يستقبل الزوار. لكن لو شفت [[0.0.0.0:5432]] يبقى Postgres مفتوح للنت.

> الخلاصة: اللي المفروض يتشاف من بره بس هو اللي يسمع على 0.0.0.0.`,
          example: "sudo ss -tlnp | grep 0.0.0.0",
          try: "bash المستوى ٢: [[127.0.0.1 و 0.0.0.0]]"
        },
        {
          cmd: "NAT",
          title: "مشاركة عنوان",
          desc: "الراوتر بياخد عنوان عام واحد ويوزّعه على أجهزة البيت بعناوين خاصة. عشان كده جهازك مش بيتشاف من النت، ومحتاج tunnel للـ webhooks.",
          teach: R`## الفكرة

NAT = Network Address Translation. البيت كله واخد عنوان عام واحد. لما موبايلك يطلب صفحة، الراوتر بيبدّل عنوانه الخاص بالعام ويفتكر مين طلب، ولما الرد يرجع يوصله للجهاز الصح.

~~~text
موبايلك 192.168.1.5  ─┐
لابتوبك 192.168.1.7  ─┼─  الراوتر (عام واحد)  ─  النت
~~~

النتيجة: الطلبات الطالعة شغالة، لكن محدش من النت يقدر يبدأ اتصال بجهازك، لأن الراوتر ميعرفش يوديه لمين. عشان كده الـ webhook محتاج tunnel وانت بتطوّر.

## المثال: [[ip route | grep default]]

[[ip route]] جدول المسارات، و [[default]] هو «أي حاجة مش عارفها ابعتها هنا»، يعني الراوتر:

~~~text الناتج جوه container في ubuntu:24.04
default via 172.17.0.1 dev eth0
~~~

[[172.17.0.1]] هنا هو Docker نفسه، وهو كمان بيعمل NAT للـ containers. وفي البيت هتلاقي حاجة زي [[192.168.1.1]].

> الخلاصة: ورا NAT تقدر تطلب، بس محدش يقدر يطلبك.`,
          example: "ip route | grep default",
          try: "Node المستوى ٣: [[لوج الـ webhooks]]"
        },
        {
          cmd: "DNS",
          title: "دليل الأسامي",
          desc: "النظام اللي بيحوّل example.com لـ IP. سجلات: A للـ IP، MX للإيميل، TXT للتحقق، NS مين المسؤول.",
          teach: R`## الفكرة

الأجهزة بتتكلم بالأرقام (IP)، والناس بتفتكر أسامي. DNS بيحوّل الاسم لرقم، وبيتسأل قبل أي طلب.

| السجل | فيه إيه |
|---|---|
| [[A]] | IPv4 (و [[AAAA]] لـ IPv6) |
| [[CNAME]] | الاسم ده اسم تاني لدومين تاني |
| [[MX]] | سيرفر الإيميل |
| [[TXT]] | نص للتحقق (Google، SPF) |
| [[NS]] | مين المسؤول عن الدومين |

## المثال: [[dig +short example.com]]

[[dig]] بيسأل DNS، و [[+short]] بيطبع الإجابة بس:

~~~text الناتج في ubuntu:24.04 (بعد تسطيب bind9-dnsutils)
104.20.23.154
172.66.147.243
~~~

اتنين IP لأن الدومين ليه أكتر من سجل A، والمتصفح بيختار واحد.

> الخلاصة: الدومين مش بيفتح؟ اسأل [[dig]] الأول: لو مفيش IP يبقى المشكلة في DNS مش في السيرفر.`,
          example: "dig +short example.com",
          try: "bash المستوى ٣: [[dig]]"
        },
        {
          cmd: "TTL",
          title: "مدة الصلاحية",
          desc: "في DNS: قد إيه الإجابة تتحفظ في الكاش قبل ما تتسأل تاني. TTL ساعة يعني تغيير الـ IP بياخد لحد ساعة ينتشر. في الشبكة: عدد الراوترات اللي packet تقدر تعدّيها.",
          teach: R`## في DNS

كل إجابة DNS معاها رقم بالثواني: «احفظني المدة دي». أي سيرفر DNS في النص بيحفظها ومش بيسأل تاني لحد ما تخلص.

## المثال: [[dig example.com +noall +answer]]

- [[+noall]] امسح كل أقسام الرد، و [[+answer]] رجّع قسم الإجابة بس.

~~~text الناتج في ubuntu:24.04
example.com.		300	IN	A	104.20.23.154
example.com.		300	IN	A	172.66.147.243
~~~

| العمود | معناه |
|---|---|
| [[example.com.]] | الاسم (النقطة في الآخر هي جذر DNS) |
| [[300]] | الـ TTL: ٣٠٠ ثانية = ٥ دقايق |
| [[IN]] | Internet |
| [[A]] | نوع السجل |

فلو غيّرت الـ IP، ناس هتفضل تروح للقديم لحد ٥ دقايق. نصيحة: قلّل الـ TTL قبل ما تنقل السيرفر بيوم.

وفي الشبكة TTL حاجة تانية: عدد الراوترات اللي الـ packet تعدّيها قبل ما تتمسح، عشان متلفّش للأبد.

> الخلاصة: TTL كبير = DNS أسرع وتغيير أبطأ.`,
          example: "dig example.com +noall +answer",
          try: "التشخيص: [[بيفتح عند ناس ومش عند ناس]]"
        },
        {
          cmd: "TCP / UDP",
          title: "نوعين اتصال",
          desc: "TCP بيتأكد إن كل حاجة وصلت بالترتيب (HTTP، SSH، قواعد البيانات). UDP بيبعت من غير تأكيد، أسرع (DNS، فيديو، HTTP/3).",
          teach: R`## الفرق

| | TCP | UDP |
|---|---|---|
| قبل البعت | بيعمل اتصال الأول (handshake) | بيبعت على طول |
| لو حاجة ضاعت | بيبعتها تاني | ضاعت |
| الترتيب | مضمون | مش مضمون |
| بيستخدمه | HTTP/1 و 2، SSH، Postgres | DNS، مكالمات فيديو، ألعاب، HTTP/3 (QUIC) |

## المثال: [[ss -tuln | head]]

- [[-t]] TCP و [[-u]] UDP، و [[-l]] اللي بيسمع، و [[-n]] أرقام.

~~~text الناتج في ubuntu:24.04 وفيه nginx
Netid State  Recv-Q Send-Q Local Address:Port Peer Address:PortProcess
tcp   LISTEN 0      511          0.0.0.0:80        0.0.0.0:*
tcp   LISTEN 0      511          0.0.0.0:8080      0.0.0.0:*
tcp   LISTEN 0      511             [::]:80           [::]:*
~~~

عمود [[Netid]] بيقولك النوع. الـ container ده مفيهوش خدمة UDP، وعلى جهاز عادي هتلاقي سطور [[udp UNCONN]] (UDP ملوش حالة LISTEN لأنه مش بيعمل اتصالات).

> الخلاصة: TCP لما كل byte لازم يوصل، UDP لما السرعة أهم من حتة ضاعت.`,
          example: "ss -tuln | head",
          try: "bash المستوى ٢: [[ss / lsof]]"
        },
        {
          cmd: "HTTP",
          title: "لغة الويب",
          desc: "طلب (method + مسار + headers + body) ورد (status + headers + body). الـ methods: GET يجيب، POST يعمل، PUT/PATCH يعدّل، DELETE يمسح.",
          teach: R`## الطلب والرد

~~~text طلب
GET /about HTTP/1.1          ← method + مسار + نسخة
Host: example.com            ← headers
~~~

~~~text رد
HTTP/1.1 200 OK              ← نسخة + status
Content-Type: text/html      ← headers
                             ← سطر فاضي
<html>...                    ← body
~~~

## المثال: [[curl -sI https://example.com | head -5]]

[[-I]] بيبعت HEAD: نفس GET بس الرد من غير body، و [[head -5]] أول ٥ سطور:

~~~text الناتج (Git Bash على ويندوز)
HTTP/1.1 200 OK
Date: Wed, 07 Oct 2026 12:56:23 GMT
Content-Type: text/html; charset=utf-8
Connection: keep-alive
Server: cloudflare
~~~

أول سطر نسخة البروتوكول ورقم الحالة، والباقي headers.

> الخلاصة: كل حاجة في الويب طلب ورد، والفرق بين الطلبات في الـ method والمسار والـ headers والـ body.`,
          example: "curl -sI https://example.com | head -5",
          try: "ابدأ من هنا"
        },
        {
          cmd: "status code",
          title: "رقم الرد",
          desc: "2xx نجح، 3xx تحويل، 4xx غلطك (401 مش داخل، 403 مش مسموح، 404 مش موجود)، 5xx غلط السيرفر (502 التطبيق واقع، 504 بطيء).",
          teach: R`## أول رقم بيقول كل حاجة

| يبدأ بـ | معناه | أشهرهم |
|---|---|---|
| 2 | نجح | 200 OK، 201 اتعمل، 204 مفيش body |
| 3 | روح مكان تاني | 301 دايم، 302 مؤقت، 304 عندك نسخة |
| 4 | غلط في الطلب | 400، 401 مش داخل، 403 ممنوع، 404، 429 كتير |
| 5 | غلط في السيرفر | 500، 502 التطبيق ورا الـ proxy مش بيرد، 504 اتأخر |

## المثال

~~~bash
curl -s -o /dev/null -w "%{http_code}\n" https://example.com
~~~

- [[-o /dev/null]] ارمي الـ body.
- [[-w]] (write-out) اطبع بعد ما تخلص، و [[%{http_code}]] متغير جوه curl فيه رقم الحالة، و [[\n]] سطر جديد.

~~~text الناتج (Git Bash على ويندوز)
200
~~~

ونفس الأمر على [[https://example.com/nope]] طلّع [[404]].

> الخلاصة: 4xx دوّر في الطلب بتاعك، 5xx دوّر في السيرفر ولوجاته.`,
          example: R`curl -s -o /dev/null -w "%{http_code}\n" https://example.com`,
          try: "المتصفح: [[Status codes]]"
        },
        {
          cmd: "header",
          title: "رأس الطلب",
          desc: "معلومات مع الطلب أو الرد بره البودي: Content-Type، Authorization، Set-Cookie، Cache-Control. نص مشاكل الـ API في الـ headers.",
          teach: R`## الفكرة

سطور [[Name: value]] بتتبعت مع الطلب أو الرد، قبل الـ body. فيها كل حاجة عن الرسالة غير المحتوى نفسه.

| header | بيقول إيه |
|---|---|
| [[Content-Type]] | نوع الـ body (HTML، JSON) |
| [[Authorization]] | انت مين (token) |
| [[Set-Cookie]] / [[Cookie]] | السيرفر بيحفظ كوكي / المتصفح بيرجّعها |
| [[Cache-Control]] | يتحفظ قد إيه |

## المثال: [[curl -sI https://example.com]]

~~~text الناتج (Git Bash على ويندوز)
HTTP/1.1 200 OK
Date: Wed, 07 Oct 2026 12:56:25 GMT
Content-Type: text/html; charset=utf-8
Connection: keep-alive
Server: cloudflare
last-modified: Fri, 02 Oct 2026 16:11:02 GMT
allow: GET, HEAD
Accept-Ranges: bytes
Age: 7646
cf-cache-status: HIT
CF-RAY: a46d10d7ee7f121c-MRS
alt-svc: h3=":443"; ma=86400
~~~

منها تعرف: الموقع ورا Cloudflare ([[Server]] و [[CF-RAY]])، والصفحة جاية من الكاش ([[cf-cache-status: HIT]]) وعمرها هناك [[7646]] ثانية ([[Age]]). وأسامي الـ headers مش حساسة للحروف الكبيرة والصغيرة.

> الخلاصة: الـ API رجّع حاجة غريبة؟ بص على الـ headers قبل الـ body.`,
          example: "curl -sI https://example.com",
          try: "المتصفح: [[Headers]]"
        },
        {
          cmd: "TLS / SSL / HTTPS",
          title: "التشفير",
          desc: "TLS البروتوكول اللي بيشفّر الاتصال (SSL اسمه القديم). HTTPS هو HTTP فوق TLS. محتاج شهادة من جهة موثوقة (Let's Encrypt).",
          teach: R`## التلات أسامي

| الاسم | هو إيه |
|---|---|
| SSL | الاسم القديم، ونسخه كلها مقفولة النهارده |
| TLS | البروتوكول اللي بيشفّر فعلًا (1.2 و 1.3 المستخدمين) |
| HTTPS | HTTP عادي ماشي جوه TLS، على بورت 443 |

الناس لسه بتقول «شهادة SSL» وهي تقصد TLS.

## المثال

~~~bash
echo | openssl s_client -connect example.com:443 2>/dev/null | grep -i "protocol"
~~~

- [[openssl s_client]] بيعمل اتصال TLS زي المتصفح ويطبع تفاصيله.
- [[-connect example.com:443]] على أنهي سيرفر وبورت.
- [[echo |]] بيبعتله دخل فاضي فيقفل على طول بدل ما يستنى.
- [[2>/dev/null]] يخفي الرسايل الجانبية، و [[grep -i "protocol"]] يسيب سطر النسخة.

~~~text الناتج (Git Bash على ويندوز)
Protocol: TLSv1.3
~~~

> الخلاصة: HTTPS = HTTP + TLS، والقفل في المتصفح معناه إن الاتصال متشفّر والشهادة سليمة.`,
          example: R`echo | openssl s_client -connect example.com:443 2>/dev/null | grep -i "protocol"`,
          try: "VPS المستوى ٢: [[certbot]]"
        },
        {
          cmd: "certificate",
          title: "الشهادة",
          desc: "ملف بيثبت إن السيرفر ده فعلًا صاحب الدومين، موقّع من جهة المتصفحات بتثق فيها. بتخلص كل ٩٠ يوم مع Let's Encrypt.",
          teach: R`## الشهادة فيها إيه

ملف فيه: الدومين ([[subject]])، ومين اللي وقّع ([[issuer]])، وتاريخ الانتهاء، والمفتاح العام بتاع السيرفر. المتصفح عنده لستة جهات بيثق فيها، ولو التوقيع من واحدة منهم والدومين مطابق والتاريخ ساري، القفل بيظهر.

جرّبنا نقرا شهادة example.com:

~~~bash
echo | openssl s_client -connect example.com:443 -servername example.com 2>/dev/null | openssl x509 -noout -subject -issuer -enddate
~~~

~~~text الناتج (Git Bash على ويندوز)
subject=CN=example.com
issuer=C=US, O=SSL Corporation, CN=Cloudflare TLS Issuing ECC CA 3
notAfter=Dec 25 22:56:35 2026 GMT
~~~

## المثال: [[sudo certbot certificates]]

على سيرفرك، certbot بيعرض الشهادات اللي عملها، و [[grep -E "Domains|Expiry"]] بيسيب سطر الدومينات وسطر الانتهاء. جرّبناه في image [[certbot/certbot]] فاضية:

~~~text الناتج
No certificates found.
~~~

وعلى سيرفر فيه شهادات هتلاقي [[Domains:]] و [[Expiry Date:]] لكل واحدة (من الـ docs). شهادات Let's Encrypt بتخلص كل ٩٠ يوم و certbot بيجددها لوحده، وهما أعلنوا إن المدة هتقل على مراحل في السنين الجاية، فالتجديد الأوتوماتيك لازم.

> الخلاصة: الشهادة بتثبت هوية السيرفر، و [[notAfter]] / [[Expiry]] أهم سطر فيها.`,
          example: R`sudo certbot certificates 2>/dev/null | grep -E "Domains|Expiry"`,
          try: "التشخيص: [[شهادة SSL]]"
        },
        {
          cmd: "reverse proxy",
          title: "الوسيط",
          desc: "سيرفر قدام تطبيقك بيستقبل الزوار ويوصّل الطلبات له: Nginx على 443 يوصّل لـ Node على 3000. بيتكفل بـ HTTPS والملفات الثابتة وكذا موقع.",
          teach: R`## الفكرة

~~~text
الزائر ─ 443 ─> Nginx ─ 3000 ─> Node
~~~

الزائر بيكلّم Nginx بس، ومبيعرفش إن فيه Node وراه. Nginx بياخد الـ HTTPS، ويخدم الملفات الثابتة لوحده، ويوصّل الباقي للتطبيق. وتقدر تحط كذا موقع على نفس السيرفر، كل دومين لتطبيق.

## المثال: [[grep proxy_pass /etc/nginx/sites-enabled/*]]

[[proxy_pass]] هو السطر اللي بيقول «وصّل الطلب لـ...»، و [[*]] كل الملفات في الفولدر. جرّبناه على إعداد بسيط في ubuntu:24.04:

~~~text الناتج
/etc/nginx/sites-enabled/app:server { listen 8080; location / { proxy_pass http://127.0.0.1:3000; } }
~~~

[[grep]] بيكتب اسم الملف قبل السطر لما يدوّر في أكتر من ملف، فتعرف أنهي موقع بيوصّل لأنهي بورت.

> الخلاصة: التطبيق على 127.0.0.1 وبورت داخلي، و Nginx بس هو اللي على 80 و 443.`,
          example: "grep proxy_pass /etc/nginx/sites-enabled/*",
          try: "Nginx: [[reverse proxy بعمق]]"
        },
        {
          cmd: "upstream",
          title: "الباك إند",
          desc: "من وجهة نظر Nginx: التطبيق اللي وراه. «upstream timed out» يعني التطبيق مردّش. في Git: الـ remote اللي بتسحب منه.",
          teach: R`## في Nginx

الـ upstream هو اللي Nginx بيوصّل له الطلب: تطبيقك. ولما التطبيق مش شغال أو بطيء، Nginx بيرجّع 502 أو 504 ويكتب السبب في لوج الأخطاء.

## المثال

~~~bash
sudo grep upstream /var/log/nginx/error.log | tail -2
~~~

جرّبناه في ubuntu:24.04: nginx بيوصّل لـ 3000 ومفيش حاجة شغالة عليه:

~~~text الناتج (السطر مقصوص)
2026/10/07 12:56:10 [error] 3396#3396: *1 connect() failed (111: Connection refused) while connecting to upstream, client: 127.0.0.1, ... upstream: "http://127.0.0.1:3000/", host: "127.0.0.1:8080"
~~~

| الرسالة | معناها |
|---|---|
| [[Connection refused ... connecting to upstream]] | التطبيق مش شغال أو على بورت تاني (502) |
| [[upstream timed out]] | التطبيق شغال بس مردّش في الوقت (504) |

وفي Git الكلمة ليها معنى تاني: الـ branch على الـ remote اللي [[git pull]] بيسحب منه.

> الخلاصة: 502 من Nginx معناها غالبًا إن الـ upstream (تطبيقك) واقع، مش Nginx.`,
          example: "sudo grep upstream /var/log/nginx/error.log | tail -2",
          try: "Nginx: [[reverse proxy بعمق]]"
        },
        {
          cmd: "CDN",
          title: "نسخ قريبة",
          desc: "شبكة سيرفرات حوالين العالم بتحفظ نسخة من ملفاتك وتقدمها من أقرب نقطة للزائر. Cloudflare أشهرها ومجاني، وبيحمي من الهجمات.",
          teach: R`## الفكرة

CDN = Content Delivery Network. سيرفرات في بلاد كتير بتحفظ نسخة من ملفاتك. الزائر في القاهرة بياخدها من أقرب سيرفر بدل ما الطلب يسافر لسيرفرك في أوروبا. ولأن الزوار بيكلّموا الـ CDN مش سيرفرك، بيصد هجمات كتير قبل ما توصلك.

## المثال

~~~bash
curl -sI https://example.com | grep -i "cf-ray\|server"
~~~

- [[grep -i]] من غير حساسية للحروف، و [[\|]] يعني «أو» في grep العادي.

~~~text الناتج (Git Bash على ويندوز)
Server: cloudflare
CF-RAY: a46d10f37923fb98-MRS
~~~

[[CF-RAY]] رقم الطلب عند Cloudflare، والـ 3 حروف في آخره اسم المكان اللي رد ([[MRS]] = مارسيليا، أقرب نقطة وقتها).

> الخلاصة: لو الـ headers فيها [[cf-ray]] يبقى الموقع ورا Cloudflare، والكاش بتاعه ممكن يكون سبب إن تعديلك مش ظاهر.`,
          example: R`curl -sI https://example.com | grep -i "cf-ray\|server"`,
          try: "التشخيص: [[بوت بيضرب الموقع]]"
        },
        {
          cmd: "cache",
          title: "الحفظ المؤقت",
          desc: "نسخة من حاجة عشان متتحسبش أو تتنزلش تاني: المتصفح بيحفظ JS، و DNS بيحفظ الإجابات، و Postgres بيحفظ صفحات في الرام. كل مشكلة «التغيير مش ظاهر» كاش.",
          teach: R`## الفكرة

بدل ما تحسب أو تنزّل نفس الحاجة كل مرة، تحفظ نسخة وتستخدمها لحد ما تقدم. وفيه كاش في كل طبقة: المتصفح، والـ CDN، و DNS، والقاعدة نفسها.

## المثال

~~~bash
curl -sI https://example.com/app.js | grep -i cache-control
~~~

[[Cache-Control]] هو الـ header اللي السيرفر بيقول فيه للمتصفح يحفظ قد إيه. [[example.com/app.js]] مش موجود فعلًا (رجّع 404)، فجرّبنا على ملف حقيقي على cdnjs:

~~~text الناتج (Git Bash على ويندوز)
Cache-Control: no-transform, public, s-maxage=30672000, max-age=30672000, immutable
~~~

| الحتة | معناها |
|---|---|
| [[public]] | أي كاش في السكة يقدر يحفظه |
| [[max-age=30672000]] | المتصفح يحفظه ٣٠٦٧٢٠٠٠ ثانية (حوالي سنة) |
| [[s-maxage]] | نفس الكلام للكاش المشترك (CDN) |
| [[immutable]] | الملف ده عمره ما هيتغير، متسألش تاني |

وعشان كده الملفات دي اسمها فيه رقم النسخة: تغيير = اسم جديد.

> الخلاصة: «التعديل مش ظاهر» = كاش في مكان ما. جرّب Ctrl+Shift+R، وبعدين شوف الـ CDN.`,
          example: "curl -sI https://example.com/app.js | grep -i cache-control",
          try: "Nginx: [[كاش الملفات الثابتة]]"
        },
        {
          cmd: "latency / TTFB",
          title: "التأخير",
          desc: "الوقت من الطلب لأول byte رد. بيجمع الشبكة ووقت السيرفر بيفكّر. أقل من 200ms كويس. الـ bandwidth حاجة تانية: كام بايت في الثانية.",
          teach: R`## الفكرة

TTFB = Time To First Byte: من لحظة ما بعت الطلب لحد ما أول byte من الرد وصل. بيجمع DNS والاتصال و TLS ووقت السيرفر وهو بيحضّر الرد.

و latency غير bandwidth: الأولى «الرد بياخد قد إيه يبدأ»، والتانية «كام byte في الثانية بعد ما يبدأ».

## المثال

~~~bash
curl -o /dev/null -s -w "%{time_starttransfer}\n" https://example.com
~~~

- [[-o /dev/null]] ارمي الصفحة، و [[-s]] من غير شريط.
- [[%{time_starttransfer}]] الثواني لحد أول byte، وده الـ TTFB.

~~~text الناتج (Git Bash على ويندوز)
0.431396
~~~

يعني ٤٣١ ملي ثانية، وده بيشمل أول اتصال و TLS. ولو عايز تشوف السيرفر بياخد قد إيه لوحده قارنه بـ [[%{time_appconnect}]] (لحد ما TLS خلص).

> الخلاصة: TTFB عالي والشبكة كويسة = السيرفر أو القاعدة بطيئة.`,
          example: R`curl -o /dev/null -s -w "%{time_starttransfer}\n" https://example.com`,
          try: "التشخيص: [[الموقع بطيء مش واقع]]"
        },
        {
          cmd: "firewall",
          title: "الحاجز",
          desc: "بيقرر أنهي بورتات مفتوحة من بره. ufw على السيرفر: 22 و 80 و 443 بس. و Docker بيعدّي منه، فالبورتات على 127.0.0.1.",
          teach: R`## الفكرة

جدار بيقرر أنهي اتصالات داخلة للسيرفر مسموحة. على VPS الطبيعي: 22 (SSH) و 80 و 443 بس مفتوحين، وأي بورت تاني مقفول من بره حتى لو فيه خدمة سامعة عليه.

## المثال: [[sudo ufw status]]

[[ufw]] (Uncomplicated Firewall) واجهة سهلة لجدار لينكس، و [[status]] بيعرض القواعد. محتاج VPS حقيقي وصلاحيات root، فالشكل من الـ docs:

~~~text شكل الناتج على VPS
Status: active

To                         Action      From
--                         ------      ----
OpenSSH                    ALLOW       Anywhere
80/tcp                     ALLOW       Anywhere
443/tcp                    ALLOW       Anywhere
~~~

ولو مش متفعّل بيطبع [[Status: inactive]].

> **فخ مهم:** [[docker run -p 5432:5432]] بيكتب قواعد الجدار بنفسه وبيعدّي ufw، فالبورت يبقى مفتوح للنت. اكتب [[-p 127.0.0.1:5432:5432]].

> الخلاصة: افتح الأقل، و Docker بيفتح بنفسه فخليه على 127.0.0.1.`,
          example: "sudo ufw status",
          try: "VPS المستوى ٢: [[ufw]]"
        },
        {
          cmd: "tunnel",
          title: "الممر",
          desc: "اتصال جوه اتصال: SSH tunnel بيوصّل بورت على جهازك لخدمة على السيرفر بأمان. ngrok tunnel بيوصّل عنوان عام لجهازك.",
          teach: R`## الفكرة

اتصال بتعدّي جواه اتصال تاني. أشهر نوعين:

- **SSH tunnel:** تفتح بورت على جهازك، وأي حاجة تدخله بتمشي متشفّرة جوه SSH وتطلع على السيرفر. كده توصل لقاعدة سامعة على 127.0.0.1 هناك من غير ما تفتحها للنت.
- **ngrok / cloudflared:** العكس: عنوان عام على النت بيوصّل لبورت على جهازك، عشان webhook يوصلك وانت ورا NAT.

## المثال: [[ssh -N -L 5433:127.0.0.1:5432 prod]]

| الحتة | معناها |
|---|---|
| [[-L]] | Local forward: افتح بورت على جهازي |
| [[5433]] | البورت على جهازي |
| [[127.0.0.1:5432]] | يوصّل لفين، **من وجهة نظر السيرفر** |
| [[prod]] | اسم السيرفر من [[~/.ssh/config]] |
| [[-N]] | متفتحش شيل، الـ tunnel بس |

وبعدها [[psql -h 127.0.0.1 -p 5433]] على جهازك بيكلّم Postgres اللي على السيرفر. محتاج سيرفر حقيقي، فده من الـ docs وتفاصيله في درس [[ssh -L]].

> الخلاصة: [[-L جهازي:هناك]]، والـ tunnel شغال طول ما الأمر شغال.`,
          example: "ssh -N -L 5433:127.0.0.1:5432 prod",
          try: "bash المستوى ٣: [[ssh -L]]"
        },
        {
          cmd: "webhook",
          title: "الاتصال العكسي",
          desc: "بدل ما تسأل الخدمة «حصل حاجة؟»، هي بتبعتلك POST لما يحصل: Paymob بعد الدفع، GitHub بعد push. محتاج URL عام وتحقق من التوقيع.",
          teach: R`## الفكرة

| الطريقة | مين بيبدأ |
|---|---|
| polling | انت كل شوية: «حصل حاجة؟» |
| webhook | الخدمة لما يحصل: [[POST]] على URL انت مديهولها |

فمحتاج: URL عام الخدمة توصله، و route في تطبيقك يستقبل، وتتأكد من التوقيع (HMAC) إن الطلب منهم فعلًا، وترد بسرعة بـ 2xx وإلا هيعيدوا الإرسال.

## المثال

~~~bash
grep webhooks /var/log/nginx/access.log | tail -3
~~~

لوج Nginx فيه سطر لكل طلب، و [[grep webhooks]] بيسيب طلبات المسار ده. جرّبنا [[POST]] على [[/webhooks/paymob]] في ubuntu:24.04 والتطبيق مش شغال:

~~~text الناتج
127.0.0.1 - - [07/Oct/2026:12:56:10 +0000] "POST /webhooks/paymob HTTP/1.1" 502 166 "-" "curl/8.5.0"
~~~

الطلب وصل لـ Nginx بس الرد [[502]]، يعني الخدمة هتعتبره فشل وتعيد. ولو مفيش سطور خالص، الطلب موصلش للسيرفر أصلًا (URL غلط أو جدار).

> الخلاصة: أول سؤال في أي مشكلة webhook: الطلب وصل اللوج ولا لأ، وبكام رد؟`,
          example: "grep webhooks /var/log/nginx/access.log | tail -3",
          try: "Node المستوى ٣: [[لوج الـ webhooks]]"
        },
        {
          cmd: "SSH key",
          title: "زوج المفاتيح",
          desc: "مفتاحين: خاص بيفضل على جهازك ومحدش يشوفه، وعام بتحطه على السيرفر أو GitHub. السيرفر بيتحداك بحاجة متتحلش إلا بالخاص، فبتدخل من غير باسورد. الخاص يتحمي بـ passphrase و [[chmod 600]].",
          teach: R`## الفكرة

مفتاحين متولدين مع بعض:

| الملف | مين يشوفه |
|---|---|
| [[~/.ssh/id_ed25519]] | انت بس. ده الخاص |
| [[~/.ssh/id_ed25519.pub]] | أي حد. بتحطه في [[authorized_keys]] على السيرفر أو في GitHub |

السيرفر بيبعت تحدّي، وجهازك بيوقّعه بالخاص، والسيرفر يتأكد بالعام. الخاص عمره ما بيتبعت.

## المثال: [[ssh-keygen -lf ~/.ssh/id_ed25519.pub]]

- [[-l]] اطبع البصمة (fingerprint)، و [[-f]] من الملف ده.

جرّبنا على مفتاح لسه معمول (ssh-keygen على ويندوز):

~~~text الناتج
256 SHA256:9N+KnHfZUMWoTaoKNZn7I0NUPNhXC/6MTlBXE1X4L7c ali@ALI-PC (ED25519)
~~~

[[256]] حجم المفتاح بالبت، وبعده البصمة، والتعليق، والنوع. GitHub بيعرض نفس البصمة جنب كل مفتاح، فتعرف أنهي مفتاح هو أنهي.

> الخلاصة: الـ [[.pub]] تديه لأي حد، والتاني لو اتسرب امسحه من كل حتة فورًا.`,
          example: "ssh-keygen -lf ~/.ssh/id_ed25519.pub",
          try: "VPS المستوى ٢: [[نقل مفتاح SSH]]"
        },
        {
          cmd: "CORS",
          title: "مين يكلّم الـ API من المتصفح",
          desc: "قاعدة في المتصفح: صفحة على دومين مش بتقدر تقرا رد API على دومين تاني إلا لو السيرفر رد بـ [[Access-Control-Allow-Origin]]. الحماية في المتصفح بس، فـ curl و Postman مش بيتأثروا، والحل في السيرفر مش في الفرونت.",
          teach: R`## الفكرة

المتصفح بيمنع JavaScript في صفحة على دومين إنها تقرا رد من دومين تاني، إلا لو السيرفر التاني قال «مسموح» بـ header:

~~~text
Access-Control-Allow-Origin: https://app.example.com
~~~

المتصفح هو اللي بيطبّق القاعدة، فـ curl و Postman بيقروا الرد عادي. عشان كده «شغال في Postman ومش شغال في المتصفح» = CORS، والحل يتكتب في السيرفر.

## المثال

~~~bash
curl -sI -H "Origin: https://app.example.com" https://api.example.com | grep -i access-control
~~~

- [[-H "Origin: ..."]] بنعمل نفسنا المتصفح ونقول الطلب جاي من أنهي صفحة.
- [[grep -i access-control]] نشوف السيرفر رد بإيه.

[[api.example.com]] مش موجود فعلًا، فجرّبنا على [[https://api.github.com]]:

~~~text الناتج (Git Bash على ويندوز، أول سطر مقصوص)
Access-Control-Expose-Headers: ETag, Link, Location, Retry-After, ...
Access-Control-Allow-Origin: *
~~~

[[*]] يعني أي موقع يقدر يقرا (من غير كوكيز). ولو مفيش سطر [[Allow-Origin]] خالص، المتصفح هيمنع الصفحة.

> الخلاصة: error الـ CORS في الكونسول يتحل في السيرفر، مش بإضافة header في الفرونت.`,
          example: R`curl -sI -H "Origin: https://app.example.com" https://api.example.com | grep -i access-control`,
          try: "المتصفح المستوى ٢: [[CORS]]"
        }
      ]
    }
]);
