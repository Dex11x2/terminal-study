// كل درس هنا في مكان واحد:
//   cmd      اسم الأمر (ولازم يبقى فريد جوه التاب، لأن التقدم محفوظ بيه)
//   title    العنوان القصير، ودا اللي بيظهر كسؤال في «اختبرني»
//   desc     الشرح. الفقرات مفصولة بسطر فاضي، و [[كلام]] بيتعرض كـ code
//   example  المثال. كل سطر أمر، والسطور اللي بتبدأ بـ # تعليق
//   try      التجربة اللي تعملها بإيدك
//   flag     اختياري: "danger" أو "script" (من غير prompt) أو "keys" أو "term" أو "console"
//   mac      اختياري (bash بس): ["both"|"diff"|"linux", ملاحظة الماك]
//   deep     اختياري: why / how / when / mistakes
//   teach    اختياري: «الشرح خطوة بخطوة»: markdown صغير (## و ### و ~~~lang عنوان ... ~~~ و جداول | و - و 1. و > و ---). القواعد في README
//   lines    اختياري: شرح لكل سطر في المثال بالترتيب، من غير السطور الفاضية والتعليقات
//   sol      اختياري: حل التجربة والناتج المتوقع (بيظهر مقفول تحت «جرّب»)
//   solCode  اختياري: كود الحل، بيتعرض كـ مثال تحت الـ sol
//   check    اختياري: تمرين بيتصحح لوحده في الصفحة
//            JS:  { lang: "js", starter, tests: R`test("..", () => expect(x).toBe(y))`, solution }
//            SQL: { lang: "sql", setup: R`CREATE TABLE ...; INSERT ...`, starter, expect: [[...صفوف]] أو expectSql: R`استعلام مرجعي`, solution, ordered }
//            solution حل مرجعي مش بيظهر، و npm run check بيتأكد إنه بيعدّي الاختبارات. المتاح في tests: test و expect(x).toBe/toEqual/toThrow/toBeTruthy/toBeFalsy
// ولو محتاج تكتب ${ جوه R`...` اكتبها $__{ والصفحة بترجّعها.

TAB("interview", {
  label: "الانترفيو",
  prompt: "$ ",
  lab: R`node
> [5, 3, 8].sort((a, b) => a - b)`,
  labText: "كل درس هنا سؤال انترفيو: اقرا السؤال، وجاوب بصوت عالي قبل ما تكشف، وبعدين قارن. «اختبرني» هنا أهم أداة. أسئلة كل تقنية موجودة كمان في آخر تابها.",
  levels: {"1":["الأساسيات","HTTP و REST و الويب والشبكات والـ Git اللي بيتسألوا فيهم دايمًا"],"2":["CS","big-O و data structures و algorithms بالـ JavaScript"],"3":["الانترفيو كله","system design، والأسئلة السلوكية، وإزاي تحكي عن مشاريعك، والـ take-home"]},
  categories: [
    {
      t: "رحلة الطلب",
      l: 1,
      n: "السؤال اللي بيفتح بيه نص الانترفيوهات، والبروتوكولات اللي تحته. في كل درس: الإجابة القصيرة الأول، والتفاصيل لو طلبها",
      items: [
        {
          cmd: "DNS → TCP → TLS → HTTP → render",
          title: "بيحصل إيه لما تكتب عنوان موقع في المتصفح وتدوس Enter؟ (What happens when you type a URL?)",
          desc: R`المتصفح بيحوّل اسم الدومين لـ IP عن طريق DNS، ويفتح اتصال TCP مع السيرفر على بورت 443، ويعمل TLS handshake عشان الاتصال يبقى مشفّر، ويبعت طلب HTTP GET. السيرفر يرد بـ HTML، والمتصفح يقراه ويبني الـ DOM، ويحمّل الـ CSS والـ JS والصور، ويحسب مكان كل حاجة (layout) ويرسم الصفحة.

ولو عندي وقت أزوّد: فيه كاش في كل خطوة (الـ DNS متكاش في المتصفح والـ OS، والملفات في الـ HTTP cache)، وغالبًا فيه CDN أو reverse proxy زي Nginx قبل التطبيق نفسه، والتطبيق ممكن يكلّم داتابيز قبل ما يرد. وبعدين أسأل: «تحب أعمّق في أنهي جزء؟»`,
          example: R`nslookup example.com
curl -sv https://example.com -o /dev/null
curl -s -o /dev/null -w "dns=%{time_namelookup} tcp=%{time_connect} tls=%{time_appconnect} ttfb=%{time_starttransfer}\n" https://example.com`,
          try: "شغّل أمر curl التالت على موقعين مختلفين وقارن الأرقام: أنهي مرحلة بتاخد أطول؟ وبعدين افتح Network في المتصفح، ودوس على أي طلب وافتح Timing: نفس المراحل بالظبط.",
          deep: {
            why: "مش بيختبر إنك حافظ خطوات. بيختبر إنك فاهم الويب من أوله لآخره ومش حافظ framework بس. ومفيش إجابة «كاملة»: الإنترفيوير بيشوف انت هتعمّق لوحدك في أنهي حتة، وده بيبيّن خلفيتك.",
            how: R`١. الـ URL: المتصفح بيفصل الـ protocol والدومين والـ path. لو الدومين في قايمة HSTS بيروح HTTPS على طول من غير ما يجرب HTTP.

٢. DNS: بيدوّر على الـ IP في كاش المتصفح، وبعدين كاش الـ OS، وبعدين بيسأل الـ resolver (بتاع مزود النت أو 1.1.1.1). الـ resolver لو مش عارف بيسأل root servers، وبعدين سيرفرات الـ TLD (.com)، وبعدين الـ authoritative server بتاع الدومين. الرد بييجي معاه TTL، وده بيحدد هيتكاش قد إيه.

٣. TCP: three-way handshake: [[SYN]] ثم [[SYN-ACK]] ثم [[ACK]]. رحلة رايح جاي كاملة قبل أي بيانات.

٤. TLS: المتصفح يبعت ClientHello، والسيرفر يرد بالـ certificate، والمتصفح يتأكد منها ويتفقوا على مفتاح. في TLS 1.3 ده بياخد رحلة واحدة.

٥. HTTP: الطلب فيه method و path و headers (منهم الكوكيز). بيعدّي على load balancer أو Nginx، ويوصل للتطبيق، اللي ممكن يقرا من الداتابيز أو Redis، ويرجّع status و headers و body.

٦. الـ rendering: الـ HTML بيتحوّل DOM، والـ CSS بيتحوّل CSSOM، والاتنين بيعملوا render tree. بعدين layout (مكان وحجم كل عنصر)، ثم paint، ثم composite. والـ script العادي بيوقف قراية الـ HTML لحد ما يتحمّل ويتنفّذ، عشان كده [[defer]] و [[async]].`,
            when: "Follow-ups متوقعة: «الموقع بطيء، هتعرف منين المشكلة في أنهي مرحلة؟» (Network Timing، و TTFB). «الـ DNS بيتكاش فين؟». «إيه الفرق بين defer و async؟». «الـ CDN بيدخل فين في الصورة؟». «إيه اللي بيتغير مع HTTP/2 و HTTP/3؟».",
            mistakes: R`إنك تقول «بيروح للسيرفر ويجيب الصفحة» وتقف: كده مقلتش حاجة. أو العكس: تغرق عشر دقايق في الـ DNS وتنسى الـ rendering. ابدأ بالخريطة كلها في ست خطوات، وبعدين عمّق. وغلطة شائعة: إن الـ DNS «بيجيب الموقع»، هو بيرجّع IP بس. وإن الـ TLS بيحصل قبل الـ TCP: الـ TLS شغال فوق الـ TCP.`
          },
          teach: R`## الفكرة في جملة

الإجابة النموذجية ست خطوات ورا بعض: **DNS** يجيب الـ IP، و **TCP** يفتح اتصال، و **TLS** يشفّره، و **HTTP** يبعت الطلب ويجيب الرد، والمتصفح **يرسم** الصفحة. الأوامر التلاتة في المثال بتخليك تشوف أول أربع خطوات بعينك بدل ما تحفظها. كل الناتج تحت من تشغيل حقيقي في [[docker run --rm ubuntu:24.04]] (لينكس) بعد ما سطّبنا [[curl]] و [[dnsutils]].

---

## ١. الـ DNS: [[nslookup example.com]]

[[nslookup]] (name server lookup) بيسأل سيرفر DNS: «الاسم ده الـ IP بتاعه إيه؟».

~~~bash
nslookup example.com
~~~

~~~text الناتج
Server:		192.168.65.7
Address:	192.168.65.7#53

Non-authoritative answer:
Name:	example.com
Address: 104.20.23.154
Name:	example.com
Address: 172.66.147.243
~~~

اقرا السطور كده:

| السطر | معناه |
|---|---|
| [[Server: 192.168.65.7]] | الـ resolver اللي سألناه (هنا الـ DNS اللي Docker بيدّيه للكونتينر). على جهازك هيبقى الراوتر أو [[1.1.1.1]] |
| [[#53]] | بورت 53، بورت الـ DNS |
| [[Non-authoritative answer]] | الإجابة جاية من resolver عنده نسخة متكاشة، مش من السيرفر صاحب الدومين نفسه |
| سطرين [[Address]] | الدومين ليه أكتر من IP، والمتصفح يختار واحد |

والكاش ده له عمر اسمه TTL (Time To Live). [[dig +noall +answer example.com]] بيوريه، ولما شغلناه مرتين ورا بعض:

~~~text الناتج
example.com.		294	IN	A	104.20.23.154
example.com.		293	IN	A	104.20.23.154
~~~

الرقم [[294]] ثواني فاضلة قبل ما الإجابة دي تبقى قديمة، ونزل لـ [[293]] في التشغيل التاني: يعني الـ resolver بيرد من الكاش وبيعد تنازلي. و [[A]] معناها record فيه IPv4.

> الـ DNS بيرجّع **رقم** بس. مبيجيبش الصفحة ولا بيعرف حاجة عنها.

---

## ٢. الـ TCP والـ TLS والـ HTTP: [[curl -sv https://example.com -o /dev/null]]

### الفلاجز

| الجزء | معناه |
|---|---|
| [[curl]] | برنامج بيبعت طلبات HTTP من الترمنال |
| [[-s]] | silent: من غير شريط التقدم |
| [[-v]] | verbose: اطبع كل اللي بيحصل في الاتصال (على stderr) |
| [[-o /dev/null]] | خزّن الـ body في [[/dev/null]]، وده «سلة مهملات» لينكس، لأننا عايزين التفاصيل مش الـ HTML |

الناتج طويل، فهنقراه حتة حتة بالترتيب اللي حصل بيه.

### أ. الـ IP والـ TCP

~~~text الناتج
* Host example.com:443 was resolved.
* IPv4: 104.20.23.154, 172.66.147.243
*   Trying 104.20.23.154:443...
* Connected to example.com (104.20.23.154) port 443
~~~

curl عمل DNS (نفس الـ IPs اللي فوق)، وجرّب أول IP على بورت [[443]] (بورت HTTPS). سطر [[Connected]] معناه إن الـ three-way handshake خلص: [[SYN]] ثم [[SYN-ACK]] ثم [[ACK]]. لسه مفيش ولا byte من الطلب اتبعت.

### ب. الـ TLS handshake

~~~text الناتج
* ALPN: curl offers h2,http/1.1
* TLSv1.3 (OUT), TLS handshake, Client hello (1):
* TLSv1.3 (IN), TLS handshake, Server hello (2):
* TLSv1.3 (IN), TLS handshake, Certificate (11):
* TLSv1.3 (IN), TLS handshake, CERT verify (15):
* TLSv1.3 (IN), TLS handshake, Finished (20):
* TLSv1.3 (OUT), TLS handshake, Finished (20):
* SSL connection using TLSv1.3 / TLS_AES_256_GCM_SHA384 / X25519 / id-ecPublicKey
* ALPN: server accepted h2
~~~

- [[OUT]] رسالة طالعة من curl، و [[IN]] جاية من السيرفر.
- [[Client hello]]: «أنا بتكلم TLS 1.3، ودي الـ ciphers اللي أعرفها». و [[ALPN]] (Application-Layer Protocol Negotiation) جواها: «أعرف HTTP/2 و HTTP/1.1».
- [[Server hello]] و [[Certificate]]: السيرفر اختار، وبعت شهادته.
- [[CERT verify]]: توقيع بيثبت إن السيرفر معاه الـ private key بتاع الشهادة.
- [[Finished]] من الناحيتين: الاتصال بقى مشفّر.
- [[ALPN: server accepted h2]]: اتفقوا على HTTP/2.

وبعدها curl بيتأكد من الشهادة:

~~~text الناتج
*  subject: CN=example.com
*  expire date: Dec 25 22:56:35 2026 GMT
*  issuer: C=US; O=SSL Corporation; CN=Cloudflare TLS Issuing ECC CA 3
*  SSL certificate verify ok.
~~~

[[subject]] الشهادة لمين، و [[issuer]] مين وقّعها، و [[verify ok]] يعني السلسلة وصلت لـ root موثوق في [[/etc/ssl/certs]]. ودي تفاصيل الدرس الجاي.

### ج. الطلب والرد

~~~text الناتج
> GET / HTTP/2
> Host: example.com
> User-Agent: curl/8.5.0
> Accept: */*
>
< HTTP/2 200
< content-type: text/html; charset=utf-8
< server: cloudflare
< age: 1901
< cf-cache-status: HIT
< alt-svc: h3=":443"; ma=86400
~~~

- [[>]] سطور curl بعتها (الطلب): الـ method [[GET]] والـ path [[/]] و headers.
- [[<]] سطور الرد: [[200]] نجح، والـ headers.
- [[server: cloudflare]] و [[cf-cache-status: HIT]] و [[age: 1901]]: الرد ده مجاش من السيرفر الأصلي أصلًا، جه من كاش الـ CDN، وعمره ١٩٠١ ثانية. ده الـ «CDN قبل التطبيق» اللي بتقوله في الإجابة.
- [[alt-svc: h3=...]]: السيرفر بيقول «أنا بدعم HTTP/3 كمان».

---

## ٣. قياس كل مرحلة: [[curl -w]]

~~~bash
curl -s -o /dev/null -w "dns=%{time_namelookup} tcp=%{time_connect} tls=%{time_appconnect} ttfb=%{time_starttransfer}\n" https://example.com
~~~

[[-w]] (write-out) بيطبع بعد ما الطلب يخلص نص انت بتكتبه، وفيه متغيرات بين [[%{ }]]:

| المتغير | بيقيس لحد إمتى |
|---|---|
| [[time_namelookup]] | الـ DNS خلص |
| [[time_connect]] | الـ TCP handshake خلص |
| [[time_appconnect]] | الـ TLS handshake خلص |
| [[time_starttransfer]] | أول byte من الرد وصل (TTFB = Time To First Byte) |

و [[\n]] سطر جديد في الآخر. شغلناه:

~~~text الناتج
dns=0.003566 tcp=0.043726 tls=0.096713 ttfb=0.152695
~~~

الأرقام بالثانية و **تراكمية** من أول الطلب. فمدة كل مرحلة = الرقم ناقص اللي قبله:

| المرحلة | الحساب | المدة |
|---|---|---|
| DNS | 0.0036 | ٣.٦ms (متكاش) |
| TCP | 0.0437 − 0.0036 | ٤٠ms (رحلة رايح جاي واحدة) |
| TLS | 0.0967 − 0.0437 | ٥٣ms |
| السيرفر لحد أول byte | 0.1527 − 0.0967 | ٥٦ms |

ونفس الأمر على [[www.wikipedia.org]] طلّع [[dns=0.119536]]: ١٢٠ms للـ DNS لوحده، لأن الاسم ده مكانش متكاش. التشغيل التاني لنفس الموقع بيبقى أسرع في الـ DNS.

---

## ٤. اللي الأوامر مش بتوريه: الـ rendering

curl بيقف عند الرد. المتصفح بيكمّل:

1. يقرا الـ HTML ويبني الـ DOM (شجرة العناصر).
2. يلاقي [[<link>]] و [[<script>]] و [[<img>]] فيطلبهم (كل واحد رحلة زي اللي فوق، بس غالبًا على نفس الاتصال).
3. الـ CSS يبقى CSSOM، والاتنين يعملوا render tree.
4. layout (مكان وحجم كل عنصر) ثم paint ثم composite.

و [[<script>]] العادي بيوقف قراية الـ HTML لحد ما يتحمّل ويتنفّذ، فـ [[defer]] (حمّل بالتوازي ونفّذ بعد الـ HTML) و [[async]] (حمّل بالتوازي ونفّذ أول ما يوصل).

---

## الخلاصة

| الخطوة | بتعمل إيه | شفتها فين |
|---|---|---|
| DNS | اسم ← IP، ومتكاش بـ TTL | [[nslookup]] و [[dns=]] |
| TCP | handshake على 443 | [[Connected to ... port 443]] و [[tcp=]] |
| TLS | شهادة + مفتاح مشترك | [[Client hello]] ... [[Finished]] و [[tls=]] |
| HTTP | طلب ورد | سطور [[>]] و [[<]] و [[ttfb=]] |
| render | DOM ثم layout ثم paint | DevTools، مش curl |

> قول الخريطة كلها في نص دقيقة، وبعدين اسأل «تحب أعمّق في أنهي جزء؟». وافتكر إن أرقام [[curl -w]] تراكمية، وإن TLS شغال **فوق** TCP مش قبله.`,
          lines: [
            "اسأل الـ DNS عن الـ IP بتاع الدومين.",
            "اطبع تفاصيل الاتصال كله: الـ TCP والـ TLS والـ headers، ورمي الـ body.",
            "قيس كل مرحلة بالثانية: الـ DNS، والـ TCP، والـ TLS، وأول byte من الرد (TTFB). الأرقام تراكمية."
          ],
          sol: R`المهم تعرف إن الأرقام اللي [[curl -w]] بيطبعها تراكمية من أول الطلب، مش مدة كل مرحلة لوحدها. يعني لو طلع [[dns=0.004 tcp=0.030 tls=0.075 ttfb=0.160]]، الـ TCP أخد ٢٦ms (0.030 − 0.004)، والـ TLS أخد ٤٥ms، والسيرفر فكّر ورد في ٨٥ms. أغلب الناس بيقروها غلط ويفتكروا إن الـ TLS أخد ٧٥.

اللي هتلاحظه غالبًا: الـ DNS صغير جدًا (ممكن قريب من الصفر لو متكاش)، والـ TCP والـ TLS بيكبروا كل ما السيرفر يبعد عنك جغرافيًا لأنهم round trips، والـ ttfb بيكبر لو الصفحة ديناميك والسيرفر بيكلم داتابيز. موقع ورا CDN هيبان فيه tcp صغير لأنك بتكلم أقرب نقطة ليك. ولو [[tls=0]] يبقى الموقع HTTP مش HTTPS.

وفي تبويب Timing في المتصفح هتلاقي نفس الأسامي: DNS Lookup و Initial connection و SSL و Waiting for server response (ده الـ TTFB) و Content Download. ولو الطلب مفيهوش DNS ولا connection خالص، ده معناه إن المتصفح استخدم اتصال مفتوح قبل كده (keep-alive)، ودي نقطة حلوة تقولها في الانترفيو.`
        },
        {
          cmd: "reliable ولا fast",
          title: "إيه الفرق بين TCP و UDP؟ وإمتى تختار كل واحد؟ (TCP vs UDP)",
          desc: R`TCP بيفتح اتصال الأول (handshake)، وبيضمن إن البيانات توصل كاملة وبالترتيب، وبيعيد إرسال اللي ضاع، وبيظبط السرعة على قد الشبكة. UDP بيبعت packets على طول من غير اتصال ومن غير ضمانات، فأسرع وأخف بس ممكن حاجة تضيع أو توصل متلخبطة.

عشان كده الويب والـ APIs والداتابيز والإيميل على TCP لأن ولا byte ينفع يضيع. والمكالمات والـ streaming المباشر والألعاب والـ DNS على UDP، لأن packet متأخرة ملهاش لازمة أصلًا، والأحسن تكمّل. و HTTP/3 مبني على QUIC اللي شغال فوق UDP وبيعمل الموثوقية بنفسه.`,
          example: R`// احفظه udp-tcp.mjs وشغّله: node udp-tcp.mjs (مفيش حد سامع على 9999)
import dgram from "node:dgram";
import net from "node:net";
const u = dgram.createSocket("udp4");
u.send("ping", 9999, "127.0.0.1", err => { console.log("UDP sent, err =", err); u.close(); });
net.connect(9999, "127.0.0.1").on("error", e => console.log("TCP:", e.code));
// UDP sent, err = null
// TCP: ECONNREFUSED`,
          try: "شغّل السكربت: UDP «نجح» رغم إن مفيش حد بيسمع، و TCP فشل. بعدين شغّل [[nc -lu 9999]] في ترمنال تاني (لينكس أو WSL) وشوف الـ ping وصل.",
          flag: "script",
          deep: {
            why: "بيختبر إنك فاهم إن كل بروتوكول فيه trade-off: الضمانات ليها تمن في السرعة. وبيفتح كلام عن الـ realtime و HTTP/3.",
            how: R`TCP بيدّي كل byte رقم تسلسلي. المستقبل بيرد بـ ACK، ولو الـ ACK مجاش في وقته المرسل بيعيد. وفيه flow control (المستقبل بيقول يقدر ياخد قد إيه) و congestion control (المرسل بيبطّأ لو الشبكة زحمة). والنتيجة stream مرتب من غير فقد، بس لو packet واحدة ضاعت كل اللي بعدها بيستنى (head-of-line blocking).

UDP مجرد رسالة عليها عنوان وبورت. مفيش handshake ولا ترتيب ولا إعادة. التطبيق هو اللي يقرر يعمل إيه لو حاجة ضاعت. عشان كده الـ DNS (سؤال وجواب صغيرين) والمكالمات بيستخدموه.

QUIC (اللي HTTP/3 عليه) بيبني فوق UDP ترتيب وإعادة لكل stream لوحده، وبيدمج الـ TLS في الـ handshake، فالـ packet اللي ضاعت بتعطّل stream واحد بس مش الاتصال كله.`,
            when: "Follow-ups: «ليه الـ DNS بيستخدم UDP؟». «ليه HTTP/3 نقل لـ UDP لو هو مش موثوق؟». «يعني إيه three-way handshake؟». «WebSocket على أنهي فيهم؟» (TCP).",
            mistakes: R`إن UDP «بيضيّع البيانات»: هو مش بيضمن، بس في شبكة كويسة أغلبها بيوصل. وإن TCP «أبطأ دايمًا»: الفرق في الـ handshake وفي الانتظار وقت الفقد. وإن HTTP/3 «مش موثوق» عشان على UDP: QUIC نفسه بيعمل الموثوقية.`
          },
          teach: R`## الفكرة في جملة

السكربت بيبعت لنفس البورت (9999) ومفيش أي برنامج سامع عليه، مرة بـ UDP ومرة بـ TCP. الـ UDP بيقول «تمام» لأنه مبيسألش حد، والـ TCP بيفشل فورًا لأنه لازم يعمل handshake الأول. الفرق ده هو الإجابة كلها. شغلناه بـ Node 24 على ويندوز، وجزء [[nc]] في [[docker run --rm ubuntu:24.04]].

---

## ١. الاستيراد

~~~js
import dgram from "node:dgram";
import net from "node:net";
~~~

- [[import ... from]]: هات موديول. والملف لازم امتداده [[.mjs]] عشان Node يفهم [[import]] (ES modules).
- [[node:]]: البادئة دي معناها «موديول جاي مع Node نفسه» مش من npm.
- [[dgram]] اختصار datagram: رسالة مستقلة عليها عنوان، وده بالظبط UDP.
- [[net]]: موديول TCP (اتصالات stream).

---

## ٢. الـ UDP

~~~js
const u = dgram.createSocket("udp4");
u.send("ping", 9999, "127.0.0.1", err => { console.log("UDP sent, err =", err); u.close(); });
~~~

- [[createSocket("udp4")]]: socket (نقطة إرسال واستقبال) نوعه UDP على IPv4. ولو [[udp6]] يبقى IPv6.
- [[u.send(msg, port, host, callback)]]: ابعت النص [[ping]] لبورت 9999 على [[127.0.0.1]] (الـ loopback، يعني الجهاز نفسه).
- [[err => { ... }]]: arrow function بتتنادى لما الإرسال يخلص. [[err]] فيها الخطأ لو حصل، أو [[null]] لو مفيش.
- [[u.close()]]: اقفل الـ socket عشان البرنامج يخلص.

مفيش أي خطوة فيها «اتأكد إن فيه حد سامع». الـ packet اتحطت على الشبكة وخلاص.

---

## ٣. الـ TCP

~~~js
net.connect(9999, "127.0.0.1").on("error", e => console.log("TCP:", e.code));
~~~

- [[net.connect(port, host)]]: ابدأ اتصال TCP، يعني ابعت [[SYN]].
- [[.on("error", ...)]]: لو حصل خطأ، نادي الدالة دي. من غيرها Node كان هيوقع بـ unhandled error.
- [[e.code]]: كود الخطأ كنص قصير.

النظام شاف [[SYN]] على بورت مفيش حد بيسمع عليه، فرد بـ [[RST]] (reset، يعني «اقفل، مفيش حد هنا»)، و Node حوّله لـ [[ECONNREFUSED]] (Error CONNection REFUSED).

---

## ٤. التشغيل

~~~powershell
node udp-tcp.mjs
~~~

~~~text الناتج (Node 24 على ويندوز)
UDP sent, err = null
TCP: ECONNREFUSED
~~~

| | UDP | TCP |
|---|---|---|
| قبل الإرسال | مفيش handshake | [[SYN]] / [[SYN-ACK]] / [[ACK]] |
| مفيش حد سامع | عدّى من غير ما يعرف | عرف فورًا ([[RST]]) |
| الضمانات | ولا حاجة | ترتيب، وإعادة إرسال، وflow control |

---

## ٥. لما يبقى فيه حد سامع: [[nc -lu 9999]]

[[nc]] (netcat) أداة بتفتح أو تسمع على بورت. [[-l]] listen، و [[-u]] UDP. جربناها في لينكس: سمعنا في الخلفية وبعتنا [[ping]] بـ UDP:

~~~bash
nc -lu 9999 > /tmp/got &
echo -n ping | nc -u -w1 127.0.0.1 9999
cat /tmp/got
nc -z -v 127.0.0.1 9999
~~~

~~~text الناتج (ubuntu:24.04)
ping
nc: connect to 127.0.0.1 port 9999 (tcp) failed: Connection refused
~~~

- [[echo -n ping]]: اطبع [[ping]] من غير سطر جديد، و [[|]] بيبعتها لـ nc.
- [[-w1]]: استنى ثانية واحدة وبعدين اقفل.
- [[-z -v]]: جرّب تفتح اتصال TCP بس (zero I/O) واطبع النتيجة.

الـ [[ping]] وصلت، بس TCP على نفس الرقم لسه مرفوض: **بورت 9999 UDP وبورت 9999 TCP حاجتين منفصلين**.

---

## الخلاصة

- TCP: اتصال الأول، وبعدين stream مرتب ومضمون. التمن رحلة handshake وانتظار لو packet ضاعت.
- UDP: رسالة وخلاص. أسرع وأخف، والتطبيق يقرر يعمل إيه لو حاجة ضاعت.
- اختيار البروتوكول = «الـ packet المتأخرة ليها لازمة؟» لو أيوه (ملف، API، داتابيز) يبقى TCP. لو لأ (صوت، لعبة، DNS) يبقى UDP. و QUIC بيبني الموثوقية بنفسه فوق UDP.`,
          lines: [
            "موديول UDP في Node.",
            "موديول TCP في Node.",
            "اعمل socket UDP (IPv4).",
            "ابعت «ping» على بورت 9999. مفيش اتصال، فمفيش error حتى لو محدش بيسمع.",
            "حاول تفتح اتصال TCP على نفس البورت: الـ handshake بيفشل بـ ECONNREFUSED."
          ],
          sol: R`أول تشغيل بيطبع بالظبط: [[UDP sent, err = null]] و [[TCP: ECONNREFUSED]]. الـ UDP «نجح» لأن كل اللي عمله إنه رمى الباكت على الشبكة ومش مستني رد، فمعندوش طريقة يعرف إن مفيش حد سامع. أما TCP فبيعمل handshake الأول، والنظام رد بـ RST فعرف على طول.

ولما تشغّل [[nc -lu 9999]] في ترمنال تاني وتعيد السكربت، هتلاقي [[ping]] ظهرت عند nc (من غير سطر جديد، فالـ prompt ممكن يلزق فيها). بس الـ TCP هيفضل ECONNREFUSED، لأن nc بـ [[-u]] سامع على UDP بس، وبورت 9999 TCP وبورت 9999 UDP حاجتين منفصلين. ولو الـ nc عندك النسخة القديمة (traditional) ومش بيسمع، جرّب [[nc -lup 9999]].

الإجابة اللي بتطلع من التجربة دي في الانترفيو: «UDP مبيضمنش إن الداتا وصلت ولا بترتيبها، والتطبيق هو اللي يقرر يعمل إيه لو ضاعت. عشان كده بيتستخدم في الحاجات اللي الباكت القديم فيها ملوش لازمة: مكالمات، ألعاب، DNS، و QUIC اللي بيبني الـ reliability بنفسه فوقه».`
        },
        {
          cmd: "certificate + key exchange",
          title: "الـ HTTPS بيحمي الاتصال إزاي؟ وإيه اللي بيحصل في الـ handshake؟ (How does HTTPS work?)",
          desc: R`HTTPS هو HTTP ماشي جوه TLS. في الـ handshake السيرفر بيبعت الـ certificate بتاعته، والمتصفح بيتأكد إنها موقّعة من جهة موثوقة (CA)، وإنها لنفس الدومين، ومش منتهية. بعدين الطرفين بيتفقوا على مفتاح سري مؤقت، وكل البيانات بعد كده بتتشفر بيه بتشفير symmetric سريع. والنتيجة تلات حاجات: محدش يقرا (تشفير)، ومحدش يعدّل (integrity)، وانت بتكلّم السيرفر الصح (authentication).

والنقطة اللي بتفرّق: التشفير بالـ public/private key بيستخدم في الـ handshake بس (توقيع وتبادل مفاتيح)، لأنه تقيل. البيانات نفسها بتتشفر بـ AES أو ChaCha20.`,
          example: R`curl -svI https://example.com 2>&1 | grep -E "SSL connection|subject|issuer|expire"
openssl s_client -connect example.com:443 -servername example.com -brief </dev/null`,
          try: "شغّل الأمرين على موقعك: نسخة TLS كام؟ ومين الـ issuer؟ والشهادة بتخلص إمتى؟ بعدين دوس على القفل في المتصفح واعرض الـ certificate chain.",
          deep: {
            why: "أي تطبيق فيه login أو دفع لازم HTTPS، والسؤال بيشوف فاهم ليه ولا شايفه «قفل أخضر» وخلاص. والـ follow-ups بتروح للشهادات وانتهائها، ودي مشكلة إنتاج حقيقية.",
            how: R`سلسلة الثقة: شهادة موقعك (leaf) موقّعة من intermediate CA، والـ intermediate موقّعة من root CA متسطّبة جاهزة في نظام التشغيل أو المتصفح. المتصفح بيمشي السلسلة لحد root يعرفه. لو السيرفر مبيبعتش الـ intermediate، بعض الأجهزة هتقول الشهادة مش موثوقة.

تبادل المفاتيح في TLS 1.3 بـ (EC)DHE: كل طرف بيعمل مفتاح مؤقت، ومن الاتنين بيطلع سر مشترك من غير ما يتبعت على الشبكة. والسيرفر بيوقّع على الـ handshake بالـ private key بتاعه عشان يثبت إنه صاحب الشهادة. وده بيدّي forward secrecy: لو الـ private key اتسرق بعدين، الجلسات القديمة المتسجلة متتفكش.

و TLS 1.3 بيخلّص الـ handshake في رحلة واحدة (1-RTT) بدل اتنين في 1.2. والـ SNI (اسم الدومين في ClientHello) هو اللي بيخلي سيرفر واحد يخدم شهادات لكذا دومين. وعمليًا الـ TLS بيتقفل غالبًا عند Nginx أو الـ load balancer، والتطبيق وراه بيكلّمه HTTP عادي.`,
            when: "Follow-ups: «يعني إيه certificate chain؟». «الشهادة خلصت، إيه اللي هيحصل وتمنعه إزاي؟» (تجديد تلقائي ومراقبة). «HSTS بيعمل إيه؟». «الـ TLS termination عندك بيحصل فين؟». «إيه هو forward secrecy؟».",
            mistakes: R`إن السيرفر بيشفّر كل البيانات بالـ public key: لأ، ده في الـ handshake بس. وإن القفل معناه الموقع آمن: معناه الاتصال مشفّر، وموقع phishing ممكن يبقى عنده شهادة سليمة. وإنك تقول SSL كأنه المستخدم: SSL اتشال من زمان، والمستخدم TLS 1.2 و 1.3.`
          },
          teach: R`## الفكرة في جملة

الأمرين في المثال بيفتحوا اتصال HTTPS ويطبعوا نتيجة الـ handshake بس: نسخة TLS كام، والتشفير إيه، والشهادة لمين ومين وقّعها. ومن الناتج ده نطلّع الإجابة: الشهادة بتثبت **الهوية**، والـ key exchange بيطلّع **مفتاح الجلسة**، والبيانات بتتشفر بـ symmetric. كل الناتج تحت من [[docker run --rm ubuntu:24.04]] بعد تسطيب [[curl]] و [[openssl]].

---

## ١. الأمر الأول: curl ومعاه فلتر

~~~bash
curl -svI https://example.com 2>&1 | grep -E "SSL connection|subject|issuer|expire"
~~~

هنفكّه من الشمال لليمين:

| الجزء | معناه |
|---|---|
| [[-s]] | من غير شريط تقدم |
| [[-v]] | اطبع تفاصيل الاتصال، ومنها الـ TLS |
| [[-I]] | ابعت [[HEAD]] بدل [[GET]]: الـ headers بس من غير body |
| [[2>&1]] | curl بيكتب تفاصيل [[-v]] على stderr (رقم 2)، وده بيوجّهه لـ stdout (رقم 1) عشان الـ pipe يشوفه |
| [[|]] | الـ pipe: ابعت الناتج للأمر اللي بعده |
| [[grep -E "a|b"]] | سيب السطور اللي فيها أي كلمة من دول. [[-E]] عشان [[|]] تبقى «أو» |

~~~text الناتج
* SSL connection using TLSv1.3 / TLS_AES_256_GCM_SHA384 / X25519 / id-ecPublicKey
*  subject: CN=example.com
*  expire date: Dec 25 22:56:35 2026 GMT
*  subjectAltName: host "example.com" matched cert's "example.com"
*  issuer: C=US; O=SSL Corporation; CN=Cloudflare TLS Issuing ECC CA 3
~~~

### أول سطر: ٤ حاجات مفصولة بـ [[/]]

| الجزء | معناه |
|---|---|
| [[TLSv1.3]] | نسخة البروتوكول. كلمة SSL في أول السطر اسم قديم فاضل في curl، البروتوكول نفسه TLS |
| [[TLS_AES_256_GCM_SHA384]] | التشفير **symmetric** للبيانات: AES بمفتاح ٢٥٦ bit في وضع GCM (بيشفّر وبيتأكد إن محدش عدّل)، و SHA384 للـ hashing جوه الـ handshake |
| [[X25519]] | الـ key exchange: نوع من ECDHE (Elliptic Curve Diffie-Hellman Ephemeral). كل طرف بيعمل مفتاح مؤقت، ومنهم يطلع سر مشترك من غير ما يتبعت |
| [[id-ecPublicKey]] | نوع مفتاح الشهادة: EC (elliptic curve)، ودي اللي السيرفر بيوقّع بيها |

### باقي السطور

- [[subject: CN=example.com]]: الشهادة لمين. CN = Common Name.
- [[subjectAltName ... matched]]: الدومين اللي طلبناه موجود في الشهادة. لو مش موجود curl يرفض.
- [[expire date]]: آخر يوم صالحة فيه.
- [[issuer]]: مين وقّعها. هنا CA اسمها Cloudflare TLS Issuing ECC CA 3. C = Country، و O = Organization.

---

## ٢. الأمر التاني: openssl s_client

~~~bash
openssl s_client -connect example.com:443 -servername example.com -brief </dev/null
~~~

| الجزء | معناه |
|---|---|
| [[s_client]] | أمر في openssl بيعمل دور «عميل TLS» عادي |
| [[-connect host:port]] | افتح TCP على البورت ده |
| [[-servername]] | ابعت الـ SNI (Server Name Indication): اسم الدومين جوه ClientHello، عشان سيرفر واحد عليه دومينات كتير يعرف يبعت أنهي شهادة |
| [[-brief]] | اطبع ملخص بس |
| [[</dev/null]] | ادّيله input فاضي، فيقفل بعد الـ handshake بدل ما يستنى تكتب |

~~~text الناتج
CONNECTION ESTABLISHED
Protocol version: TLSv1.3
Ciphersuite: TLS_AES_256_GCM_SHA384
Peer certificate: CN = example.com
Hash used: SHA256
Signature type: ECDSA
Verification: OK
Server Temp Key: X25519, 253 bits
DONE
~~~

- [[Signature type: ECDSA]]: السيرفر وقّع على الـ handshake بالـ private key بتاع الشهادة. ده اللي بيثبت إنه صاحبها فعلًا، مش حد ناسخ الشهادة (الشهادة نفسها عامة وأي حد يقدر ياخدها).
- [[Verification: OK]]: السلسلة اتحققت لحد root موثوق.
- [[Server Temp Key: X25519]]: كلمة **Temp** مهمة: المفتاح ده مؤقت للجلسة دي بس. ده معنى forward secrecy: لو الـ private key بتاع الشهادة اتسرق بعد سنة، الجلسات القديمة مش هتتفك، لأن مفتاحها مكانش مشتق منه.

---

## ٣. سلسلة الثقة بعينك

ضفنا [[-showcerts]] وفلترنا سطور [[s:]] (subject) و [[i:]] (issuer):

~~~text الناتج
 0 s:CN = example.com
   i:... CN = Cloudflare TLS Issuing ECC CA 3
 1 s:... CN = Cloudflare TLS Issuing ECC CA 3
   i:... CN = SSL.com TLS Transit ECC CA R2
 2 s:... CN = SSL.com TLS Transit ECC CA R2
   i:... CN = SSL.com TLS ECC Root CA 2022
~~~

اقرا كل سطرين مع بعض: شهادة 0 (الموقع، الـ leaf) موقّعة من 1، و 1 موقّعة من 2، و 2 موقّعة من root موجودة جوه نظامك في [[/etc/ssl/certs]]. المتصفح بيمشي السلسلة دي لحد ما يوصل لـ root يعرفه. السيرفر هو اللي بيبعت الـ intermediates، ولو نسيهم بعض الأجهزة ترفض.

---

## ٤. لما الشهادة تبقى بايظة

جربنا موقع شهادته منتهية عمدًا (من badssl.com، معمول للاختبار):

~~~text الناتج
$ curl -sSI https://expired.badssl.com
curl: (60) SSL certificate problem: certificate has expired

$ openssl s_client -connect expired.badssl.com:443 -servername expired.badssl.com -brief </dev/null
verify error:num=10:certificate has expired
notAfter=Apr 12 23:59:59 2015 GMT
~~~

curl رفض يكمّل وخرج بكود [[60]]. وده اللي بيحصل للمتصفح واليوزرز لو الشهادة خلصت ومحدش جدّدها: صفحة تحذير حمرا. عشان كده التجديد يبقى أوتوماتيك (certbot أو الـ CDN) ومعاه مراقبة.

---

## الخلاصة

| الحاجة | بيحصل فين | بيدّي إيه |
|---|---|---|
| الشهادة + سلسلة الـ CA | الـ handshake | authentication: انت بتكلم صاحب الدومين |
| توقيع ECDSA أو RSA | الـ handshake | السيرفر معاه الـ private key فعلًا |
| X25519 (ECDHE) | الـ handshake | مفتاح جلسة مؤقت + forward secrecy |
| AES-GCM أو ChaCha20 | كل البيانات بعد كده | تشفير + integrity |

> الـ public/private key بيشتغلوا في الـ handshake بس. البيانات نفسها بتتشفر symmetric لأنه أسرع بمراحل. والقفل معناه «الاتصال مشفّر مع صاحب الدومين»، مش «الموقع أمين».`,
          lines: [
            "اعمل طلب HEAD واطبع تفاصيل الـ TLS بس: النسخة، وصاحب الشهادة، ومين أصدرها، وبتخلص إمتى.",
            "اتصل بـ openssl مباشرة واطبع ملخص: نسخة الـ TLS، والـ cipher، وهل الشهادة اتحققت."
          ],
          sol: R`الأمر الأول هيطلع سطور شبه دي: [[SSL connection using TLSv1.3 / TLS_AES_256_GCM_SHA384 / X25519 / RSASSA-PSS]]، وبعدها [[subject: CN=example.com]] و [[issuer: ...]] و [[expire date: ...]]. والتاني بيطبع [[Protocol version: TLSv1.3]] و [[Ciphersuite]] و [[Verification: OK]] و [[Server Temp Key: X25519]]. أغلب المواقع النهارده TLS 1.3، و [[X25519]] ده الـ key exchange (ECDHE) اللي بيطلع منه مفتاح الجلسة، والشهادة بتثبت بس إن السيرفر هو صاحب الدومين.

الـ issuer غالبًا Let's Encrypt (أسماء زي R10 أو E5) أو Google Trust Services أو Cloudflare، والشهادات دي عمرها قصير (حوالي ٩٠ يوم وبيقل مع الوقت)، فلو لقيت تاريخ الانتهاء قريب فده طبيعي طالما فيه تجديد أوتوماتيك. وفي المتصفح الـ chain بتبقى ٣ مستويات: شهادة الموقع، ثم intermediate، ثم root موجودة جوه نظامك.

النتيجة اللي لازم تاخد بالك منها: لو الـ issuer اسم شركتك أو برنامج antivirus أو proxy، يبقى فيه حد في النص بيفك التشفير ويعيده (TLS interception) والـ root بتاعه متسطب على جهازك. ولو ظهر [[Verification error]] أو [[certificate has expired]]، يبقى الشهادة خلصت أو الـ intermediate مش متبعت من السيرفر.`
        },
        {
          cmd: "multiplexing و QUIC",
          title: "إيه اللي اتغير من HTTP/1.1 لـ HTTP/2 لـ HTTP/3؟",
          desc: R`HTTP/1.1 نص، والاتصال بيخدم طلب واحد في المرة، فالمتصفح بيفتح لحد ٦ اتصالات للدومين. HTTP/2 بقى binary وبيعمل multiplexing: طلبات كتير على اتصال TCP واحد في نفس الوقت، ومعاه ضغط للـ headers. و HTTP/3 ساب TCP واشتغل على QUIC فوق UDP، فالـ packet اللي ضاعت مبتوقفش باقي الطلبات، والـ handshake أسرع لأن TLS 1.3 جزء منه.

والنتيجة العملية: حيل زمان زي إنك تقسّم الملفات على دومينات كتير (domain sharding) بقت بتضر مع HTTP/2. والـ API بتاعك مش محتاج يتغير: نفس الـ methods والـ headers والـ status codes في التلاتة.`,
          example: R`curl -sI --http1.1 https://example.com | head -1
curl -sI --http2 https://example.com | head -1
curl -s -o /dev/null -w "%{http_version}\n" https://www.google.com`,
          try: "افتح Network في المتصفح، ودوس right click على عناوين الأعمدة وفعّل Protocol: هتلاقي h2 و h3 جنب بعض. أي مواقع لسه http/1.1؟",
          deep: {
            why: "بيبيّن إنك فاهم ليه الأداء اتحسن مع الوقت، وإن مشاكل زي head-of-line blocking بتتحل على مستويات مختلفة.",
            how: R`في HTTP/1.1 لو طلب بطيء، اللي بعده على نفس الاتصال بيستنى (head-of-line blocking على مستوى HTTP). الحل كان اتصالات كتير، وكل اتصال ليه handshake.

HTTP/2 بيقسّم كل طلب ورد لـ frames صغيرة ليها stream id، وبيخلطهم على اتصال واحد، وبيضغط الـ headers المتكررة (HPACK). بس لسه على TCP: لو packet ضاعت، TCP بيوقف كل الـ streams لحد ما ترجع (head-of-line blocking على مستوى TCP). والـ server push اللي كان فيه اتشال عمليًا من المتصفحات.

HTTP/3 على QUIC: كل stream مستقل، فالفقد بيأثر على stream واحد. والاتصال ليه connection id مش مربوط بالـ IP، فلو اتنقلت من Wi-Fi لـ 4G الاتصال بيكمّل. والمتصفح بيعرف إن السيرفر بيدعم HTTP/3 من header اسمه [[Alt-Svc]] أو من DNS.`,
            when: "Follow-ups: «يعني إيه head-of-line blocking؟». «ليه HTTP/3 على UDP؟». «محتاج تغيّر كود الـ API عشان HTTP/2؟» (لأ، ده شغل السيرفر أو Nginx أو الـ CDN).",
            mistakes: R`إن HTTP/2 «أسرع في كل حاجة» من غير ما تعرف ليه. وإن HTTP/3 مش موثوق عشان UDP. وإنك محتاج تغيّر الـ API. و [[--http3]] في curl مش شغال في كل النسخ، فمتقلقش لو الأمر فشل عندك.`
          },
          teach: R`## الفكرة في جملة

التلات أوامر بيطلبوا نفس الصفحة ويطبعوا **نسخة HTTP** اللي اتفق عليها curl مع السيرفر. الهدف تشوف إن نفس الـ API بيتقدم على نسخ مختلفة من غير ما يتغير، وإن الفرق كله في **إزاي الطلبات بتمشي على الاتصال**. الناتج من [[docker run --rm ubuntu:24.04]] و curl 8.5.0.

---

## ١. [[curl -sI --http1.1 https://example.com | head -1]]

| الجزء | معناه |
|---|---|
| [[-s]] | من غير شريط تقدم |
| [[-I]] | طلب [[HEAD]]: الـ headers بس |
| [[--http1.1]] | اتكلم HTTP/1.1 بس |
| [[| head -1]] | خد أول سطر من الرد بس، وهو status line |

~~~text الناتج
HTTP/1.1 200 OK
~~~

السطر فيه ٣ حاجات: النسخة، والـ status code، والـ reason phrase ([[OK]]). في HTTP/1.1 الرد ده **نص** عادي تقدر تقراه بعينك على الشبكة.

---

## ٢. نفس الطلب بـ [[--http2]]

~~~text الناتج
HTTP/2 200
~~~

كلمة [[OK]] اختفت: HTTP/2 شال الـ reason phrase خالص، والـ status بقى رقم بس. ده لأن HTTP/2 **binary**: الطلب والرد بيتقسموا frames، وكل frame عليها رقم stream. curl هو اللي بيعرضهم لك كنص.

الاتفاق على النسخة بيحصل جوه الـ TLS handshake بحاجة اسمها ALPN. ضفنا [[-v]] وفلترنا:

~~~text الناتج مع --http1.1
* ALPN: curl offers http/1.1
* ALPN: server accepted http/1.1
> GET / HTTP/1.1
~~~

~~~text الناتج مع --http2
* ALPN: curl offers h2,http/1.1
* ALPN: server accepted h2
> GET / HTTP/2
~~~

[[h2]] هو اسم HTTP/2 في الـ ALPN. curl بيعرض، والسيرفر بيختار. يعني مفيش رحلة زيادة عشان يتفقوا على النسخة.

---

## ٣. [[curl -s -o /dev/null -w "%{http_version}\n" https://www.google.com]]

- [[-o /dev/null]]: ارمي الـ body.
- [[-w "%{http_version}\n"]]: بعد ما تخلص اطبع النسخة اللي اتستخدمت فعلًا، وبعدها سطر جديد.

~~~text الناتج
2
~~~

ليه مش 3 رغم إن جوجل بيدعم HTTP/3؟ لأن الـ curl ده مش مبني بدعم HTTP/3 أصلًا:

~~~text الناتج
$ curl -sI --http3 https://www.google.com
curl: option --http3: the installed libcurl version doesn't support this
~~~

والسيرفر بيعلن إنه بيدعمه في header:

~~~text الناتج
$ curl -sI https://www.google.com | grep -i alt-svc
alt-svc: h3=":443"; ma=2592000,h3-29=":443"; ma=2592000
~~~

[[alt-svc]] (Alternative Service) معناه «فيه طريقة تانية تكلمني بيها»: [[h3]] على بورت 443 (UDP المرة دي)، و [[ma]] (max-age) بالثواني، يعني افتكر المعلومة دي ٣٠ يوم. المتصفح أول طلب بيروح h2 على TCP، يشوف الـ header ده، واللي بعده يجرب h3.

---

## ٤. الفرق بين النسخ التلاتة

### HTTP/1.1: طلب واحد في المرة على الاتصال

~~~text على اتصال واحد
طلب 1 ─────رد 1──── طلب 2 ─────رد 2──── طلب 3 ...
~~~

لو رد 1 بطيء، طلب 2 بيستنى (head-of-line blocking على مستوى HTTP). الحل كان إن المتصفح يفتح لحد ٦ اتصالات للدومين، وكل اتصال ليه TCP و TLS handshake.

### HTTP/2: multiplexing على اتصال واحد

الطلبات بتتقطّع frames وتتخلط على نفس الاتصال، وكل frame عارفة رقم الـ stream بتاعها، فالردود بتيجي متداخلة. والـ headers المتكررة بتتضغط (HPACK). بس كله فوق TCP واحد: لو packet واحدة ضاعت، TCP بيوقّف **كل** اللي بعدها لحد ما ترجع، حتى لو تبع streams تانية.

### HTTP/3: QUIC فوق UDP

QUIC بيعمل الترتيب والإعادة **لكل stream لوحده**، فالـ packet الضايعة بتأخر stream واحد بس. والـ TLS 1.3 جزء من الـ handshake بتاعه، فالاتصال بيتفتح أسرع. والاتصال ليه connection id، فلو اتنقلت من Wi-Fi لـ 4G بيكمّل.

---

## الخلاصة

| | HTTP/1.1 | HTTP/2 | HTTP/3 |
|---|---|---|---|
| الشكل | نص | binary frames | binary frames |
| فوق إيه | TCP | TCP | QUIC فوق UDP |
| طلبات متوازية | اتصالات كتير (حوالي ٦) | streams على اتصال واحد | streams مستقلة |
| head-of-line blocking | على مستوى HTTP و TCP | على مستوى TCP بس | اتشال |
| الاسم في ALPN | [[http/1.1]] | [[h2]] | [[h3]] (بيتعرف من [[alt-svc]]) |

> الـ methods والـ headers والـ status codes هي هي في التلاتة. الـ API بتاعك مش محتاج يتغير: التحويل شغل Nginx أو الـ CDN.`,
          lines: [
            "اطلب بـ HTTP/1.1 واطبع أول سطر من الرد (النسخة والـ status).",
            "نفس الطلب بـ HTTP/2.",
            "اطبع النسخة اللي curl واتفق عليها فعلًا مع السيرفر."
          ],
          sol: R`أوامر curl هتطلع [[HTTP/1.1 200 OK]] ثم [[HTTP/2 200]] (في HTTP/2 مفيش كلمة OK، الـ reason phrase اتشالت)، والتالت هيطبع [[2]] مش 3. ده مش معناه إن جوجل مبيدعمش HTTP/3: curl مبيجربش h3 إلا لو قلتله [[--http3]] (ولو متبني بدعمه)، أما المتصفح فبيعرف إن الموقع بيدعم h3 من header اسمه [[alt-svc]] في أول رد، وبعدين بيحوّل.

في عمود Protocol هتلاقي [[h3]] على جوجل ويوتيوب وأغلب اللي ورا Cloudflare، و [[h2]] على مواقع كتير، وساعات أول طلب h2 واللي بعده h3 (بسبب alt-svc اللي فوق). اللي لسه [[http/1.1]] غالبًا: الـ dev server بتاعك على localhost (المتصفحات مبتعملش h2 من غير TLS)، وسيرفرات قديمة، وبعض الـ APIs والـ analytics.

النقطة اللي تقولها: HTTP/2 حل head-of-line blocking على مستوى HTTP بالـ multiplexing على اتصال واحد، بس لسه موجود على مستوى TCP (باكت ضايعة بتوقف كل الـ streams). HTTP/3 نقل على QUIC فوق UDP عشان كل stream يبقى مستقل، والـ handshake بقى أقصر.`
        }
      ]
    }
  ]
});
