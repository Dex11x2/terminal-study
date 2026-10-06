// تكملة تاب sec: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/sec/01.js (شرح حقول الدرس في أوله)
MORE("sec", [
    {
      t: "أدوات الفحص",
      l: 3,
      n: "أدوات مشروعة تشغّلها على مشاريعك انت لتكتشف الثغرات قبل غيرك",
      items: [
        {
          cmd: "فحص الـ headers",
          title: "أول وأسرع فحص",
          desc: "الأمر بيطبع headers الحماية الموجودة. لتقرير بدرجة: securityheaders.com. الناقص منهم تضيفه في Nginx بـ [[add_header]] أو بـ helmet في Express. أهمهم HSTS (يجبر HTTPS) و CSP (يحدد السكربتات المسموحة، وده أقوى حماية ضد XSS).",
          example: R`curl -sI https://example.com | grep -iE "strict-transport|content-security|x-frame|x-content-type|referrer-policy|permissions-policy"`,
          try: "افحص موقعك على securityheaders.com واستهدف درجة A.",
          flag: "term",
          deep: {
            why: "أسرع فحص تعمله من غير أي أداة: هل سيرفري بيبعت الـ security headers المهمة؟",
            how: R`الأمر بياخد ثانية ويوريك كل header مهم موجود. اللي مش موجود يبقى ناقص.

أهمهم: [[Strict-Transport-Security]] بيجبر HTTPS. [[Content-Security-Policy]] بيمنع XSS. [[X-Frame-Options: DENY]] بيمنع clickjacking. [[X-Content-Type-Options: nosniff]] بيمنع MIME confusion.

لو عايز درجة شاملة: securityheaders.com. تضيف headers ناقصة في Nginx بـ [[add_header]] في الـ server block.`,
            when: "بعد كل deploy. واجعله جزء من checklist الرفع.",
            mistakes: "CSP بتحتاج تعرف كل مصدر بيحمّل منه. ابدأ بـ [[Content-Security-Policy-Report-Only]]."
          },
          teach: R`## الفكرة: هات الـ headers بس، وصفّي الستة المهمين

الأمر سطر واحد بس فيه حتتين: [[curl]] بيطلب الصفحة ويرجّع الـ headers بس، و [[grep]] بيسيب من كل الـ headers دي الستة بتوع الأمان. اللي يطلع موجود، واللي مطلعش ناقص.

عشان نجرّب من غير ما نلمس موقع حد، عملنا lab على الجهاز: سيرفرين nginx في Docker، الأول [[sec02-web-plain]] بالإعداد الافتراضي، والتاني [[sec02-web-hard]] فيه الـ headers وشهادة self-signed. والأوامر اتشغّلت من container تالت ubuntu:24.04 (curl 8.5.0) على نفس شبكة Docker، يعني [[example.com]] في المثال بقت اسم الـ container.

---

## ١. [[curl -sI]]

| الحتة | معناها |
|---|---|
| [[curl]] | اختصار Client URL: برنامج بيبعت طلب HTTP ويطبع الرد |
| [[-s]] | silent: من غير شريط التقدم (ومن غير رسايل الأخطاء كمان) |
| [[-I]] | طلب [[HEAD]]: هات الـ headers بس من غير الصفحة نفسها |

جرّبناه لوحده على السيرفر الافتراضي:

~~~bash
curl -sI http://sec02-web-plain/
~~~

~~~text الناتج
HTTP/1.1 200 OK
Server: nginx/1.31.6
Date: Tue, 06 Oct 2026 16:32:18 GMT
Content-Type: text/html
Content-Length: 896
Last-Modified: Tue, 15 Sep 2026 14:18:52 GMT
Connection: keep-alive
ETag: "6aa953cc-380"
Accept-Ranges: bytes
~~~

أول سطر الـ status ([[200 OK]] يعني الطلب نجح)، وكل سطر بعده header: اسم، وبعده [[:]]، وبعده القيمة. لاحظ حاجتين: مفيش ولا header أمان، و [[Server: nginx/1.31.6]] بيقول للمهاجم النسخة بالظبط، فيدوّر على ثغراتها.

## ٢. [[|]]: الـ pipe

بياخد ناتج [[curl]] ويدخّله لـ [[grep]] بدل ما يتطبع.

## ٣. [[grep -iE "strict-transport|content-security|..."]]

| الحتة | معناها |
|---|---|
| [[grep]] | بيطبع السطور اللي فيها النمط بس |
| [[-i]] | ignore case: الكابيتال والسمول واحد. أسامي الـ headers مش case-sensitive، و HTTP/2 بيبعتها كلها small |
| [[-E]] | extended regex: فيه الخط الرأسي جوه النمط معناه «أو» |
| [[strict-transport]] | جزء من الاسم كفاية: بيطابق [[Strict-Transport-Security]] |

على السيرفر الافتراضي:

~~~text الناتج
(ولا سطر)
exit=1
~~~

[[grep]] مطبعش حاجة ورجع exit code 1، يعني «ملقيتش». الستة ناقصين، وده اللي securityheaders.com بيدّيله F.

وعلى السيرفر المتظبط ([[https]] المرة دي):

~~~text الناتج
Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: default-src 'self'; frame-ancestors 'none'
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
~~~

---

## ٤. الستة دول بيعملوا إيه؟

| الـ header | القيمة في الـ lab | بيقول للمتصفح |
|---|---|---|
| [[Strict-Transport-Security]] (HSTS) | [[max-age=31536000]] = سنة بالثواني | افتح الموقع ده بـ HTTPS بس، سنة كاملة، حتى لو اليوزر كتب http |
| [[Content-Security-Policy]] (CSP) | [[default-src 'self']] | حمّل سكربتات وصور وستايل من نفس الموقع بس، فسكربت XSS من برّه ميشتغلش |
| [[X-Frame-Options]] | [[DENY]] | متعرضش الصفحة جوه [[iframe]] عند حد تاني (clickjacking) |
| [[X-Content-Type-Options]] | [[nosniff]] | صدّق الـ [[Content-Type]] ومتخمّنش نوع الملف |
| [[Referrer-Policy]] | [[strict-origin-when-cross-origin]] | لما يوزر يدوس لينك لموقع تاني، ابعتله الدومين بس مش الرابط كامل |
| [[Permissions-Policy]] | [[camera=()]] | الكاميرا والمايك والموقع مقفولين على الصفحة (الأقواس الفاضية = ولا حد) |

و [[includeSubDomains]] معناها الـ HSTS على كل الـ subdomains كمان. و [[frame-ancestors 'none']] جوه الـ CSP هي البديل الحديث لـ [[X-Frame-Options]].

## ٥. ليه الـ lab احتاج [[-k]]؟

الشهادة في الـ lab self-signed (احنا اللي عاملينها مش جهة موثوقة)، فـ curl رفض:

~~~text الناتج (curl -sSI https://sec02-web-hard/)
curl: (60) SSL certificate problem: self-signed certificate
~~~

[[-S]] بيرجّع رسايل الأخطاء اللي [[-s]] خباها، و [[-k]] (insecure) بيقول «كمّل من غير ما تتأكد من الشهادة». ده للـ lab بس: موقعك الحقيقي بشهادة Let's Encrypt مش محتاجه، ولو احتاجه يبقى عندك مشكلة شهادة.

---

## ٦. على ويندوز

في PowerShell 7 ([[pwsh]]) اكتب [[curl.exe]] صريح، وبدل [[grep]] استخدم [[Select-String]] (مش case-sensitive من الأول، و [[|]] في النمط برضه «أو»):

~~~powershell
curl.exe -skI https://127.0.0.1:18443/ | Select-String -Pattern "strict-transport|content-security|x-frame|x-content-type|referrer-policy|permissions-policy"
~~~

طلع نفس الستة سطور (curl 8.22 اللي جاي مع ويندوز). وليه [[curl.exe]] مش [[curl]]؟ في Windows PowerShell 5.1، [[curl]] اسم مستعار (alias) لـ [[Invoke-WebRequest]]، أمر تاني خالص فلاجاته مختلفة:

~~~text الناتج (powershell: (Get-Command curl).CommandType و Definition)
Alias
Invoke-WebRequest
~~~

---

## ٧. الإصلاح في nginx

إعداد [[sec02-web-hard]] جوه [[server { listen 443 ssl; ... }]]:

~~~text
server_tokens off;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
add_header X-Content-Type-Options "nosniff" always;
~~~

- [[add_header اسم "قيمة"]] بيضيف الـ header لكل رد.
- [[always]]: من غيرها nginx بيضيفه على الردود الناجحة والتحويلات بس، مش على [[404]] أو [[500]]. جرّبنا [[/nope]]: رجعت [[HTTP/1.1 404 Not Found]] ومعاها [[X-Frame-Options: DENY]].
- [[server_tokens off]]: الـ [[Server]] بقى [[nginx]] من غير نسخة. بس احنا حطيناه في block الـ 443 بس، فبورت 80 لسه بيقول [[Server: nginx/1.31.6]]. حطه في [[http { }]] عشان يبقى على الكل.

وفي Express: [[app.use(helmet())]] بيحط أغلبهم مرة واحدة.

## الخلاصة

| الخطوة | الأمر |
|---|---|
| هات الـ headers | [[curl -sI URL]] |
| صفّي الستة | [[grep -iE]] بالأسامي (أو [[Select-String]] في PowerShell) |
| مفيش ناتج | كلهم ناقصين |
| اللي ناقص | [[add_header ... always;]] في nginx أو [[helmet]] |

الأمر ده بيقولك «موجود ولا لأ» بس، مش إن القيمة صح: CSP فيها [[unsafe-inline]] موجودة بس ضعيفة. وللتقييم الكامل securityheaders.com، بس هو بيوصل للمواقع اللي على الإنترنت بس.`,
          lines: ["الـ headers بس، وفلتر على headers الأمان الستة. اللي ناقص ضيفه في Nginx أو helmet."],
          sol: R`securityheaders.com بيديك درجة من A+ لـ F ولستة بالـ headers الموجودة (أخضر) والناقصة (أحمر). موقع من غير أي إعداد بياخد غالبًا F أو D. عشان توصل A، لازم يبقى موجود: [[Strict-Transport-Security]]، [[Content-Security-Policy]]، [[X-Frame-Options]] (أو [[frame-ancestors]] في الـ CSP)، [[X-Content-Type-Options: nosniff]]، [[Referrer-Policy]]، و [[Permissions-Policy]].

في Express [[helmet()]] بيحط معظمهم مرة واحدة، والناقص غالبًا [[Permissions-Policy]] تضيفه بنفسك. في Nginx بـ [[add_header ... always;]]. خد بالك: الـ CSP اللي helmet بيحطها ممكن تكسر سكريبتات خارجية أو inline، فافتح الـ Console بعد ما تفعّلها. والموقع لازم يكون على الإنترنت عشان الأداة توصله، ومش هتقدر تفحص localhost.`
        },
        {
          cmd: "SSL Labs",
          title: "فحص الـ HTTPS",
          desc: "ssllabs.com/ssltest بيدّي درجة لإعدادات الـ SSL بتاعتك، ويقولك لو بتدعم بروتوكولات قديمة ضعيفة. استهدف A. certbot بيظبط أغلب ده لوحده، بس الفحص بيطمّنك.",
          example: R`# تاريخ انتهاء الشهادة من الترمنال
echo | openssl s_client -connect example.com:443 -servername example.com 2>/dev/null | openssl x509 -noout -dates`,
          try: "افحص موقعك على SSL Labs واعرف درجتك.",
          flag: "term",
          deep: {
            why: "HTTPS مش كل حاجة. إعدادات الـ TLS نفسها ممكن تكون ضعيفة.",
            how: R`SSL Labs بيجرّب كل cipher suites وprotocols وcertificate chain، وبيدّيك درجة من A+ لـ F.

أشهر المشاكل: دعم TLS 1.0 أو 1.1 (قديمين). شهادة منتهية. Cipher suites ضعيفة.

certbot مع Nginx بيحط إعدادات معقولة، بس ممكن تحتاج تظبط [[ssl_protocols]] في Nginx.`,
            when: "بعد تجهيز HTTPS لأول مرة. وكل ٣ شهور تتأكد إن certbot جدّد.",
            mistakes: "تكتفي بـ certbot وتفتكر كل حاجة تمام. إعدادات TLS الافتراضية في Nginx القديمة ممكن ضعيفة."
          },
          teach: R`## الفكرة: اتصل زي المتصفح، وخد الشهادة، واقرا تاريخها

SSL Labs موقع بيفحص من برّه وبيدّي درجة، ومش هيوصل لسيرفر على جهازك. اللي في المثال هو الجزء اللي تقدر تعمله من الترمنال: تعرف الشهادة هتخلص إمتى. الأمر pipe من 3 حتت، وهنفكه بالترتيب.

اتجرّب على الـ lab: nginx في Docker اسمه [[sec02-web-hard]] بشهادة self-signed احنا عاملينها، ومعاه [[ssl_protocols TLSv1.2 TLSv1.3;]]. والأوامر من container ubuntu:24.04 (OpenSSL 3.0.13)، فـ [[example.com]] في المثال بقت [[sec02-web-hard]].

---

## ١. [[openssl s_client -connect example.com:443 -servername example.com]]

| الحتة | معناها |
|---|---|
| [[openssl]] | أداة التشفير اللي معظم السيرفرات بتستخدمها |
| [[s_client]] | «اعمل client لـ SSL/TLS»: اتصل وكلّم السيرفر زي المتصفح بالظبط |
| [[-connect host:443]] | على أنهي سيرفر وأنهي بورت (443 = HTTPS) |
| [[-servername]] | SNI (Server Name Indication): اسم الموقع اللي عايزه. سيرفر واحد عليه مواقع كتير بيختار الشهادة على حسب الاسم ده، ومن غيره ممكن ياخدك لشهادة موقع تاني |

لوحده بيطبع كتير. أوله:

~~~text الناتج (أول جزء)
CONNECTED(00000003)
---
Certificate chain
 0 s:CN = localhost
   i:CN = localhost
   a:PKEY: rsaEncryption, 2048 (bit); sigalg: RSA-SHA256
   v:NotBefore: Oct  6 13:49:09 2026 GMT; NotAfter: Jan  4 13:49:09 2027 GMT
---
Server certificate
-----BEGIN CERTIFICATE-----
MIIDLzCCAhegAwIBAgIUchp3tBaN1xA8vhjpt0LW467rsjUwDQYJKoZIhvcNAQEL
...
~~~

- [[s:]] subject: الشهادة لمين. [[i:]] issuer: مين اللي مضاها. هنا الاتنين [[localhost]]، يعني الشهادة ماضية نفسها (self-signed). في شهادة Let's Encrypt حقيقية هتلاقي الـ issuer [[O = Let's Encrypt]] واسم الـ intermediate بتاعهم.
- [[CN]] = Common Name، اسم الموقع.
- الكتلة اللي بين [[BEGIN CERTIFICATE]] و [[END CERTIFICATE]] هي الشهادة نفسها بصيغة PEM (base64).

## ٢. [[echo |]] في الأول

[[s_client]] بعد ما يتصل بيستنى انت تكتب طلب، فالأمر مش هيخلص لوحده. [[echo]] بيبعتله سطر فاضي، فيقفل الاتصال ويخرج.

## ٣. [[2>/dev/null]]

[[2>]] بيحوّل الـ stderr (الرسايل الجانبية زي [[depth=0 CN = localhost]] و [[verify error]]) لـ [[/dev/null]]، المكان اللي أي حاجة بتتكتب فيه بتختفي. فاللي يعدّي في الـ pipe هو الـ stdout بس، وفيه الشهادة.

## ٤. [[| openssl x509 -noout -dates]]

| الحتة | معناها |
|---|---|
| [[x509]] | الأداة اللي بتقرا الشهادات (X.509 اسم المعيار) |
| (من غير [[-in]]) | بيقرا من الـ pipe، وبيدوّر لوحده على كتلة [[BEGIN CERTIFICATE]] |
| [[-noout]] | متطبعش الشهادة نفسها تاني |
| [[-dates]] | اطبع تاريخ البداية والنهاية بس |

## الأمر كله

~~~bash
echo | openssl s_client -connect sec02-web-hard:443 -servername localhost 2>/dev/null | openssl x509 -noout -dates
~~~

~~~text الناتج
notBefore=Oct  6 13:49:09 2026 GMT
notAfter=Jan  4 13:49:09 2027 GMT
~~~

[[notBefore]] من إمتى صالحة، و [[notAfter]] لإمتى. الفرق هنا 90 يوم، نفس مدة شهادات Let's Encrypt، وعشان كده certbot لازم يجدد لوحده. و [[GMT]] توقيت جرينتش (مصر +2 أو +3).

---

## ٥. حاجات زيادة بنفس الطريقة

### مين صاحب الشهادة ولأنهي أسامي

~~~bash
... | openssl x509 -noout -subject -issuer -enddate -ext subjectAltName
~~~

~~~text الناتج
subject=CN = localhost
issuer=CN = localhost
notAfter=Jan  4 13:49:09 2027 GMT
X509v3 Subject Alternative Name:
    DNS:localhost, DNS:sec02-web-hard
~~~

الـ SAN (Subject Alternative Name) هي لستة الأسامي اللي الشهادة صالحة ليها، والمتصفحات بتبص عليها هي مش على الـ CN. لو دومينك مش فيها = خطأ في المتصفح.

### هتخلص خلال 30 يوم؟

[[-checkend 2592000]] (30 يوم بالثواني): بيطبع [[Certificate will not expire]] ويرجع 0، ولو هتخلص يرجع 1. ده اللي تحطه في سكربت مراقبة.

### البروتوكولات القديمة مقفولة؟

ده أهم حاجة SSL Labs بيفحصها. جرّبنا نطلب TLS 1.1 بالعافية ([[-tls1_1]]، و [[@SECLEVEL=0]] عشان OpenSSL 3 نفسه بيرفض 1.1 من عنده):

~~~text الناتج
...:tlsv1 alert protocol version:...SSL alert number 70
~~~

السيرفر رفض (alert 70 = protocol version) بفضل [[ssl_protocols TLSv1.2 TLSv1.3;]]. ومن غير [[-tls1_1]]:

~~~text الناتج (grep على New و Verify)
New, TLSv1.3, Cipher is TLS_AES_256_GCM_SHA384
Verify return code: 18 (self-signed certificate)
~~~

[[TLSv1.3]] هو الأحدث، و [[TLS_AES_256_GCM_SHA384]] الـ cipher اللي اتفقوا عليه. و [[Verify return code: 18]] معناه الشهادة مش من جهة موثوقة. على موقع حقيقي لازم تبقى [[0 (ok)]]، وده اللي SSL Labs بيدّيله [[T]] لو مش كده. ولستة كاملة بالـ ciphers من الترمنال: [[nmap -p 443 --script ssl-enum-ciphers host]].

---

## ٦. على ويندوز

[[openssl]] جاي مع Git for Windows (اتجرّب OpenSSL 3.5.8)، فنفس الأمر بالظبط شغال في Git Bash، وطلع نفس التاريخين على [[127.0.0.1:18443]]. في PowerShell مفيش [[/dev/null]]، فشغّله من Git Bash.

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [[echo]] | يقفل الاتصال بعد ما يخلص |
| [[openssl s_client -connect ... -servername ...]] | اتصل TLS بالاسم الصح |
| [[2>/dev/null]] | اخفي الرسايل الجانبية |
| [[openssl x509 -noout -dates]] | اقرا تواريخ الشهادة |

الأمر بيقولك الشهادة سليمة لإمتى، و SSL Labs بيقولك الإعداد كله (بروتوكولات، ciphers، سلسلة الشهادة) قوي ولا لأ. الاتنين مع بعض.`,
          lines: ["نفس أمر bash: اتصل HTTPS، خد الشهادة، واطبع تاريخ بدايتها ونهايتها."],
          sol: R`SSL Labs بياخد دقيقة أو اتنين وبيطلع درجة من A+ لـ F. سيرفر متظبط بـ Let's Encrypt و certbot و Nginx حديث بياخد A عادة، وعشان A+ محتاج [[Strict-Transport-Security]] بـ [[max-age]] طويل (6 شهور أو أكتر). التقرير فيه أربع أجزاء: الشهادة، دعم البروتوكولات، تبادل المفاتيح، والـ ciphers.

الأسباب المعتادة لدرجة أقل: TLS 1.0 أو 1.1 لسه مفعّلين (حدّد [[ssl_protocols TLSv1.2 TLSv1.3;]])، سلسلة الشهادة ناقصة (استخدم [[fullchain.pem]] مش [[cert.pem]])، أو ciphers قديمة. لو الدرجة T يبقى الشهادة مش موثوقة (self-signed أو الدومين مش مطابق)، و F يبقى فيه ثغرة معروفة.`
        },
        {
          cmd: "OWASP ZAP",
          title: "سكانر ثغرات مجاني",
          desc: "أشهر سكانر مجاني (بديل Burp Suite المدفوع). الـ Automated Scan بيزحف على موقعك ويجرّب ثغرات شائعة ويطلعلك تقرير. شغّله على مواقعك بس. ابدأ بالـ Passive scan (بيراقب من غير ما يهاجم) قبل الـ Active. متشغّلش Active scan على موقع إنتاج فيه مستخدمين، لأنه بيبعت طلبات كتير وممكن يعمل بيانات وهمية.",
          example: R`docker run -t ghcr.io/zaproxy/zaproxy:stable \
  zap-baseline.py -t https://your-own-site.com`,
          try: "شغّل ZAP baseline على موقع تجربة بتاعك (مش إنتاج) واقرا التقرير.",
          flag: "term",
          deep: {
            why: "بعد ما تأمّن الكود، محتاج تختبر من بره: ZAP بيجرّب هجمات معروفة ويقولك إيه اللي نجح.",
            how: R`ZAP أداة مجانية من OWASP. بتشغّله وتوجّهه لموقعك، وهو بيزحف ويجرّب ثغرات شائعة. بعدين تقرير مع الأولويات.

Passive Scan بيراقب فقط (بدون هجوم)، مناسب على الإنتاج. Active Scan بيبعت طلبات فعلية، لازم على بيئة تجربة بس. الـ Docker command baseline scan بيعمل passive فقط.`,
            when: "قبل كل إطلاق كبير، على بيئة staging. مش على الإنتاج.",
            mistakes: "تشغّله على الإنتاج بـ Active Scan. ممكن يكتب داتا وهمية ويبعت طلبات كتير."
          },
          teach: R`## الفكرة: ZAP جاهز في container، وانت بتديله الرابط بس

مش محتاج تسطّب ZAP: الأمر بيشغّل image رسمية فيها ZAP وسكربت اسمه [[zap-baseline.py]] بيزحف على الموقع ويراقب الردود ويطبع تقرير. هنفك السطرين، وبعدين نقرا الناتج.

اتجرّب على الـ lab: سيرفرين nginx في Docker، [[sec02-web-plain]] بالإعداد الافتراضي و [[sec02-web-hard]] فيه headers الأمان (درس «فحص الـ headers»)، وكان ZAP على نفس شبكة Docker. الـ image حجمها حوالي 3.7GB، والفحص خد بين دقيقتين و 6 دقايق.

---

## ١. [[docker run -t ghcr.io/zaproxy/zaproxy:stable \]]

| الحتة | معناها |
|---|---|
| [[docker run]] | شغّل container من image |
| [[-t]] | ادّيله terminal (TTY)، عشان الناتج يتطبع ملوّن وسطر بسطر |
| [[ghcr.io/zaproxy/zaproxy]] | الـ image الرسمية، على GitHub Container Registry ([[ghcr.io]]) |
| [[:stable]] | آخر نسخة مستقرة (فيه كمان [[weekly]]) |
| [[\]] في آخر السطر | الأمر مكمّل في السطر اللي بعده |

## ٢. [[zap-baseline.py -t https://your-own-site.com]]

ده الأمر اللي بيتنفّذ **جوه** الـ container بدل الأمر الافتراضي بتاعه.

- [[zap-baseline.py]]: سكربت الفحص الـ passive: spider بيلف على اللينكات (دقيقة افتراضيًا)، وكل رد بيتفحص من غير ما يبعت أي هجوم.
- [[-t]] هنا **target**: الرابط اللي هيتفحص. خد بالك إنه مش نفس [[-t]] بتاع docker: اللي قبل اسم الـ image لـ docker، واللي بعده للسكربت.

جرّبناه:

~~~bash
docker run --rm --network sec02-net -t ghcr.io/zaproxy/zaproxy:stable zap-baseline.py -t http://sec02-web-plain/
~~~

[[--rm]] امسح الـ container لما يخلص، و [[--network sec02-net]] حطه على شبكة الـ lab عشان يوصل للسيرفر بالاسم (على موقعك الحقيقي مش محتاجهم).

---

## ٣. قراية الناتج

~~~text الناتج (مختصر)
Using the Automation Framework
Total of 4 URLs
PASS: Vulnerable JS Library (Powered by Retire.js) [10003]
PASS: Cookie No HttpOnly Flag [10010]
...
WARN-NEW: Missing Anti-clickjacking Header [10020] x 1
	http://sec02-web-plain/ (200 OK)
WARN-NEW: X-Content-Type-Options Header Missing [10021] x 1
	http://sec02-web-plain/ (200 OK)
WARN-NEW: Server Leaks Version Information via "Server" HTTP Response Header Field [10036] x 3
WARN-NEW: Content Security Policy (CSP) Header Not Set [10038] x 3
WARN-NEW: Permissions Policy Header Not Set [10063] x 3
...
FAIL-NEW: 0	FAIL-INPROG: 0	WARN-NEW: 8	WARN-INPROG: 0	INFO: 0	IGNORE: 0	PASS: 59
~~~

| الجزء | معناه |
|---|---|
| [[Total of 4 URLs]] | الـ spider لقى 4 روابط (الصفحة و [[robots.txt]] و [[sitemap.xml]] اللي بيجرّبهم دايمًا) |
| [[PASS]] | القاعدة اتفحصت ومفيش مشكلة |
| [[WARN-NEW]] | مشكلة جديدة، وتحتها الروابط اللي ظهرت فيها |
| [[FAIL-NEW]] | مشكلة متصنّفة إنها لازم توقف الـ build (افتراضيًا ولا قاعدة FAIL، كله WARN لحد ما تغيّر الإعداد) |
| [[[10020]]] | رقم القاعدة في ZAP، بتدوّر بيه على شرحها |
| [[x 3]] | ظهرت في 3 روابط |
| [[INPROG]] و [[IGNORE]] | قواعد انت معلّمها «شغالين عليها» أو «تجاهلها» في ملف إعداد |

الـ 8 WARN على السيرفر الافتراضي هم تقريبًا نفس الـ headers الناقصة في درس «فحص الـ headers»، زائد [[Server]] بيفشي النسخة، وإن الصفحة ممكن تتخزن في cache، و [[Cross-Origin-Embedder-Policy]].

وعلى السيرفر المتظبط ([[https://sec02-web-hard/]]):

~~~text الناتج
WARN-NEW: Re-examine Cache-control Directives [10015] x 1
WARN-NEW: Storable and Cacheable Content [10049] x 2
WARN-NEW: CSP: Failure to Define Directive with No Fallback [10055] x 3
WARN-NEW: Cross-Origin-Embedder-Policy Header Missing or Invalid [90004] x 3
FAIL-NEW: 0	FAIL-INPROG: 0	WARN-NEW: 4	WARN-INPROG: 0	INFO: 0	IGNORE: 0	PASS: 63
~~~

نزلت من 8 لـ 4. واللي فاضل تفاصيل: الـ CSP بتاعتنا [[default-src 'self']] بس، وفيه directives زي [[form-action]] مش بترجع لـ [[default-src]]، فـ ZAP بيقولك حددها صريح.

## ٤. الـ exit code

الأمر رجع **2** في المرتين. 0 = مفيش حاجة، 1 = فيه FAIL، 2 = فيه WARN بس، 3 = الأداة نفسها فشلت. يعني 2 مش معناه إن ZAP وقع. وده مهم في CI: لو حطيته في GitHub Actions الـ step هيبقى أحمر على أي WARN.

## ٥. تقرير HTML

~~~bash
docker run --rm -v "$(pwd):/zap/wrk" -t ghcr.io/zaproxy/zaproxy:stable zap-baseline.py -t http://sec02-web-plain/ -r report.html
~~~

[[-v "$(pwd):/zap/wrk"]] بيوصّل الفولدر الحالي على جهازك بفولدر [[/zap/wrk]] جوه الـ container، وده الفولدر اللي ZAP بيكتب فيه. و [[-r report.html]] اسم التقرير. طلع عندنا [[report.html]] (62KB، عنوانه [[ZAP Scanning Report]]) فيه كل تحذير وشرحه وإزاي تصلحه. على لينكس ممكن تحتاج الفولدر يبقى قابل للكتابة ليوزر الـ container ([[chmod 777]] على فولدر التقرير بس).

في PowerShell بدل [[$(pwd)]] اكتب [[$__{PWD}]]: جرّبنا [[docker run --rm -v $__{PWD}:/w alpine ls /w]] وطلّع ملفات الفولدر.

---

## ٦. passive و active

| | baseline (المثال) | full scan ([[zap-full-scan.py]]) |
|---|---|---|
| بيعمل إيه | بيبص على الردود العادية | بيبعت هجمات فعلية (SQL injection، XSS...) |
| على الإنتاج | آمن نسبيًا (طلبات قليلة) | لأ: بيملى forms ويعمل داتا ويبعت آلاف الطلبات |
| بيلاقي | headers وكوكيز وإعدادات | ثغرات في الكود نفسه |

## الخلاصة

| الحتة | معناها |
|---|---|
| [[docker run -t ...zaproxy:stable]] | ZAP من غير تسطيب |
| [[zap-baseline.py -t URL]] | فحص passive للرابط ده |
| [[-r report.html]] + [[-v]] | تقرير HTML على جهازك |
| exit 2 | فيه WARN، مش فشل |

وعلى مواقعك انت بس، والـ full scan على staging مش الإنتاج.`,
          lines: [
            "شغّل ZAP من Docker (الشرطة المايلة في الآخر: الأمر مكمّل في السطر اللي بعده).",
            "فحص baseline (passive، مش بيهاجم) على موقعك انت."
          ],
          sol: R`الـ baseline بيزحف على الموقع دقيقة تقريبًا ويفحص بشكل passive بس (مش بيهاجم)، وفي الآخر بيطبع سطر لكل قاعدة: [[PASS]]، [[WARN-NEW]]، أو [[FAIL-NEW]]، وملخص زي [[FAIL-NEW: 0 FAIL-INPROG: 0 WARN-NEW: 8 WARN-INPROG: 0 INFO: 0 IGNORE: 0 PASS: 59]]. الـ WARN المعتادة على موقع جديد: CSP مش موجودة، X-Content-Type-Options ناقص، الكوكي من غير SameSite أو HttpOnly، و Server بيفشي النسخة.

لو عايز تقرير تقراه براحتك، ضيف [[-v $(pwd):/zap/wrk -r report.html]] فيتحفظ [[report.html]] عندك. خد بالك: الـ exit code بيبقى 2 لو فيه WARN، وده عادي، مش معناه إن الأداة فشلت. ومتشغّلوش على سيرفر مش بتاعك، ولا الـ full scan على الإنتاج لأنه بيبعت طلبات كتير ممكن تغيّر داتا.`
        },
        {
          cmd: "nmap",
          title: "إيه المفتوح على سيرفرك",
          desc: "بيوريك البورتات المفتوحة زي ما العالم شايفها. المفروض تلاقي 22 و 80 و 443 بس. لو لقيت بورت قاعدة بيانات (5432 أو 27017) مفتوح للعالم، دي مشكلة كبيرة: اقفله في الفايروول وخلّي التطبيق يوصله على 127.0.0.1. على سيرفراتك انت بس.",
          example: R`nmap -sV 203.0.113.10
nmap -p- 203.0.113.10`,
          try: "اعمل scan لسيرفرك، واتأكد إن مفيش بورت قاعدة بيانات مفتوح.",
          flag: "term",
          deep: {
            why: "بعد كل تغيير في الفايروول أو Docker، تتأكد إن مفيش بورت مفتوح بالغلط. شرحناه في bash المستوى ٣.",
            how: R`[[-sV]] بيحاول يعرف البرنامج ونسخته على كل بورت، وده بيوريك الـ attack surface من وجهة نظر المهاجم.

على سيرفراتك انت بس، ومن جهازك مش من السيرفر، عشان تشوف الصورة الحقيقية من بره.`,
            when: "بعد أي تغيير في ufw أو إضافة خدمة جديدة.",
            mistakes: "تشغيله على أي حاجة مش ملكك."
          },
          teach: R`## الفكرة: خبّط على كل باب، وشوف مين بيرد

nmap بيبعت طلب اتصال لكل بورت على IP ويشوف الرد. سطرين المثال: الأول بيفحص البورتات المشهورة ويحاول يعرف البرنامج ونسخته، والتاني بيفحص كل البورتات من غير ما يعرف البرامج. و [[203.0.113.10]] عنوان «للأمثلة» محجوز (مش سيرفر حد)، حط مكانه IP سيرفرك.

اتجرّب على «سيرفر» lab: container [[docker:dind]] شغال جواه compose فيه nginx منشور على 80، و API (nginx تاني) على 5000، و Redis على 6379. والفحص من container ubuntu:24.04 فيه nmap 7.94، على نفس شبكة Docker، يعني مكان الـ IP اسم الـ container [[sec02-dind]]. متشغّلش nmap غير على سيرفرات انت صاحبها.

---

## ١. [[nmap -sV 203.0.113.10]]

| الحتة | معناها |
|---|---|
| [[nmap]] | Network Mapper |
| [[-sV]] | Service Version: بعد ما يلاقي بورت مفتوح، يكلّمه ويحاول يعرف البرنامج ونسخته |
| (من غير [[-p]]) | أشهر 1000 بورت بس، مش كله |

~~~text الناتج
Nmap scan report for sec02-dind (172.19.0.6)
Host is up (0.000020s latency).
Not shown: 998 closed tcp ports (reset)
PORT     STATE SERVICE VERSION
80/tcp   open  http    nginx 1.31.6
5000/tcp open  http    nginx 1.31.6
~~~

اقرا الناتج:

- [[Host is up]]: الجهاز رد، والرقم بين القوسين وقت الرد.
- [[998 closed tcp ports (reset)]]: الـ 998 التانيين ردّوا «مفيش حد هنا» (packet اسمها RST، اختصار reset).
- [[VERSION]]: [[nginx 1.31.6]] عرفها من الـ header [[Server]]. على البورت 5000 عرف إنه HTTP مش مجرد رقم.

**بس فيه مشكلة:** Redis على 6379 مش ظاهر! لأن 6379 مش من أشهر 1000 بورت في لستة nmap.

## ٢. [[nmap -p- 203.0.113.10]]

[[-p-]] = كل البورتات من 1 لـ 65535 (الـ [[-]] لوحدها معناها «من الأول للآخر»).

~~~text الناتج
Not shown: 65531 closed tcp ports (reset)
PORT     STATE SERVICE
80/tcp   open  http
2375/tcp open  docker
5000/tcp open  upnp
6379/tcp open  redis
~~~

65535 - 65531 = 4 مفتوحين، منهم اتنين الفحص الأول مشافهمش. وخلص في ثانيتين لأنه على نفس الجهاز. على سيرفر على النت ممكن ياخد دقايق. و SERVICE هنا من غير [[-sV]] مجرد تخمين من الرقم ([[upnp]] على 5000 غلط، ده الـ API).

## ٣. الاتنين مع بعض على البورتات الغريبة

~~~bash
nmap -sV -Pn -p 6379,2375 sec02-dind
~~~

~~~text الناتج
2375/tcp open  docker  Docker 29.8.2 (API 1.56)
6379/tcp open  redis   Redis key-value store 7.4.11
~~~

[[-p 6379,2375]] بورتات محددة بفاصلة، و [[-Pn]] متعملش ping الأول (سيرفرات كتير بتقفل الـ ping فـ nmap يفتكرها مقفولة). والنتيجة كارثتين: Redis 7.4.11 مفتوح لأي حد، و **Docker API** مفتوح من غير TLS، وده معناه إن أي حد يقدر يشغّل container بصلاحيات root على السيرفر. (في الـ lab ده بورت الـ dind نفسه، وعلى سيرفر حقيقي ممنوع يبان أبدًا.)

---

## ٤. الحالات التلاتة

| STATE | معناه | السبب المعتاد |
|---|---|---|
| [[open]] | فيه برنامج بيسمع وقبل الاتصال | خدمة شغالة ومنشورة |
| [[closed]] | الجهاز رد «مفيش حد هنا» | مفيش برنامج على البورت، ومفيش فايروول بيمنع |
| [[filtered]] | مفيش رد خالص | فايروول بيرمي الطلب |

جرّبنا [[filtered]] بقاعدة DROP في iptables على 5432 جوه «السيرفر»:

~~~text الناتج
5432/tcp filtered postgresql
~~~

على VPS متظبط بـ ufw، أغلب البورتات هتطلع [[filtered]] مش [[closed]]، وده أحسن: المهاجم مش عارف فيه حاجة ولا لأ.

## ٥. ليه من جهازك مش من السيرفر؟

لو شغّلته على السيرفر على [[localhost]]، هتشوف كل اللي بيسمع على [[127.0.0.1]] كمان، وده مش اللي الناس شايفاه. الصورة الحقيقية من بره. وعلى السيرفر نفسه استخدم [[ss -tlnp]] (درس «ss -tlnp بعد compose»).

## ٦. على ويندوز

nmap مش جاي مع ويندوز (اتأكدنا: [[Get-Command nmap]] مطلعش حاجة). فيه installer رسمي من nmap.org بنفس الأوامر بالظبط، أو شغّله من container لينكس زي ما عملنا. ولو عايز تجرب بورت واحد من غير nmap: [[Test-NetConnection IP -Port 6379]] في PowerShell، وعمود [[TcpTestSucceeded]] يقولك [[True]] أو [[False]].

## الخلاصة

| الأمر | بيعمل إيه | خد بالك |
|---|---|---|
| [[nmap -sV IP]] | أشهر 1000 بورت + البرنامج والنسخة | ممكن يفوّت 6379 و 27017 وأي بورت غريب |
| [[nmap -p- IP]] | كل الـ 65535 | أبطأ، ومن غير نسخ |
| [[nmap -sV -Pn -p X,Y IP]] | تفاصيل البورتات اللي لقيتها | — |

على سيرفر سليم: [[22]] و [[80]] و [[443]] open، والباقي filtered.`,
          lines: ["افحص البورتات المشهورة واعرف البرنامج ونسخته على كل واحد.", "افحص كل الـ 65535 بورت."],
          sol: R`على سيرفر متظبط، [[nmap -Pn -p- your-server-ip]] (أو البورتات المشهورة بس من غير [[-p-]]) لازم يطلع [[22/tcp open ssh]] و [[80/tcp open http]] و [[443/tcp open https]] بس، والباقي [[filtered]] (الفايروول بيرمي الطلب) أو [[closed]]. أي [[5432]] أو [[3306]] أو [[6379]] أو [[27017]] حالته [[open]] معناه إن قاعدة البيانات مكشوفة للإنترنت.

شغّله من جهازك مش من السيرفر نفسه: من جوه السيرفر كل حاجة هتبان مفتوحة لأنك بتكلم localhost. ولو قاعدة البيانات في Docker وطالعة open رغم إن ufw مفعّل، ده مش خطأ في ufw، Docker بيعدّي عليه: شوف درس «ss -tlnp بعد compose» في نفس التاب.`
        },
        {
          cmd: "السكانرات في CI",
          title: "افحص مع كل push",
          desc: "تحط الفحص في الـ pipeline فيتشغّل لوحده. [[npm audit]] يفشل الـ build لو فيه ثغرة عالية، [[gitleaks]] يفشّل الـ build لو فيه سر (ولمنعه قبل الـ commit حطه pre-commit hook)، و [[Semgrep]] بيفحص الكود نفسه على أنماط خطيرة. Trivy بيفحص Docker images.",
          example: R`# في GitHub Actions
npm audit --audit-level=high
docker run -v $(pwd):/src semgrep/semgrep semgrep --config auto
trivy image myapp:latest`,
          try: "ضيف [[npm audit --audit-level=high]] كخطوة في GitHub Actions لمشروع عندك.",
          flag: "term",
          deep: {
            why: "الأمان مش بتعمله مرة وتنسى. لما تضيفه في الـ pipeline، كل push بيتفحص أوتوماتيك.",
            how: R`[[npm audit --audit-level=high]] يفشل الـ build لو ثغرة high أو critical. فمحدش يرفع كود بمكتبات خطيرة.

Semgrep بيحلل الكود نفسه ويدوّر على patterns خطيرة. [[--config auto]] بيختار rules حسب اللغة.

Trivy بيفحص Docker images. كل package في الـ image بيقارنها بـ CVE database.`,
            when: "في GitHub Actions. خليهم يشتغلوا على كل PR.",
            mistakes: "تحط السكانرات وتـignore كل الـ warnings. خصص وقت أسبوعي لمراجعة الـ findings."
          },
          teach: R`## الفكرة: 3 سكانرات، كل واحد بيبص على حاجة

| الأداة | بتفحص إيه | السؤال |
|---|---|---|
| [[npm audit]] | المكتبات في [[package-lock.json]] | فيه مكتبة عندي ليها ثغرة معروفة؟ |
| Semgrep | الكود اللي انت كاتبه | فيه نمط خطير زي [[eval]] على input؟ |
| Trivy | الـ Docker image كلها | فيه package في النظام جوه الـ image ليه CVE؟ |

والنقطة اللي بتفرق في CI: الأداة لازم **تفشل** (exit code مش صفر) لما تلاقي حاجة، وإلا الـ job هيبقى أخضر والمشكلة موجودة. هنشوف إن اتنين من التلاتة مش بيفشلوا لوحدهم.

اتجرّب كله في containers: مشروع تجربة في node:22-slim (npm 10.9.9)، و semgrep/semgrep (1.178.0)، و aquasec/trivy (0.75.0).

---

## ١. [[npm audit --audit-level=high]]

[[npm audit]] بيقارن كل مكتبة ونسختها في الـ lock file بقاعدة ثغرات GitHub. عملنا مشروع فيه [[lodash@4.17.20]] (عادية) و [[minimist@1.2.5]] (devDependency، يعني للتطوير بس):

~~~text الناتج (npm audit)
lodash  <=4.17.23
Severity: high
Command Injection in lodash - https://github.com/advisories/GHSA-35jh-r3h4-6jhm
...
fix available via $__btnpm audit fix$__bt
node_modules/lodash

minimist  1.0.0 - 1.2.5
Severity: critical
Prototype Pollution in minimist - https://github.com/advisories/GHSA-xvch-5gv4-984h
...
2 vulnerabilities (1 high, 1 critical)
~~~

- [[lodash <=4.17.23]]: النسخ المصابة. وتحتها لينك لكل ثغرة ([[GHSA-...]] = GitHub Security Advisory).
- [[Severity]]: الخطورة، من الأقل: low، moderate، high، critical.
- [[fix available]]: فيه نسخة مصلّحة.

و [[--audit-level=high]] بيحدد **إمتى يفشل**: لو فيه high أو أعلى، exit code 1. الأمر بيطبع كل حاجة في الحالتين، الفرق في الـ exit code بس:

| الأمر | exit |
|---|---|
| [[npm audit --audit-level=high]] | 1 |
| [[npm audit --audit-level=high --omit=dev]] | 1 (lodash لوحدها high) |
| [[npm audit --audit-level=critical --omit=dev]] | 0 (طبع [[1 high severity vulnerability]] وعدّى) |

[[--omit=dev]] شال [[minimist]] من الحساب لأنها devDependency مش هتروح الإنتاج.

## ٢. [[docker run -v $(pwd):/src semgrep/semgrep semgrep --config auto]]

| الحتة | معناها |
|---|---|
| [[-v $(pwd):/src]] | وصّل الفولدر الحالي بـ [[/src]] جوه الـ container (ده الفولدر اللي semgrep بيفحصه افتراضيًا) |
| [[semgrep/semgrep]] | الـ image الرسمية |
| [[semgrep --config auto]] | افحص، و [[auto]] يعني «نزّل القواعد المناسبة للغات اللي في المشروع» من الـ registry بتاعهم (محتاج نت) |

فحصنا ملف [[app.js]] فيه route بيعمل [[exec("ls " + req.query.dir)]] وتاني بيعمل [[eval(req.query.expr)]]:

~~~text الناتج (مختصر)
  Scanning 2 files tracked by git with 1074 Code rules:
...
┌─────────────────┐
│ 5 Code Findings │
└─────────────────┘
   ❯❯❱ javascript.lang.security.detect-child-process.detect-child-process
          Detected calls to child_process from a function argument $__btreq$__bt. This could lead to a command
          injection if the input is user controllable.
            6┆ exec("ls " + req.query.dir, (err, out) => res.send(out));
    ❯❱ javascript.browser.security.eval-detected.eval-detected
           10┆ res.send(String(eval(req.query.expr)));
...
 • Findings: 5 (5 blocking)
 • Rules run: 200
~~~

كل finding: اسم القاعدة (اللغة.الفئة.اسمها)، وشرح، والسطر برقمه. والأسهم [[❯❯❱]] و [[❯❱]] بتوري الخطورة (أكتر أسهم = أخطر). ولقى كمان إن مفيش CSRF middleware، وإن [[res.send]] بيبعت input اليوزر (XSS).

**بس:** الأمر رجع **exit 0** رغم الـ 5 findings! semgrep بيفشل بس لو زوّدت [[--error]]: جرّبناه ورجع 1. فالسطر في CI لازم يبقى [[semgrep --config auto --error]].

## ٣. [[trivy image myapp:latest]]

[[trivy image]] بيفتح الـ image، ويعرف النظام اللي جواها، ويعد كل package ونسختها، ويقارنها بقاعدة CVEs (CVE = Common Vulnerabilities and Exposures، رقم عالمي لكل ثغرة). أول مرة بينزّل القاعدة (119MB عندنا، حوالي دقيقة).

شغّلناه من container ([[-v /var/run/docker.sock:/var/run/docker.sock]] عشان يشوف الـ images اللي على الجهاز) على image alpine صغيرة:

~~~text الناتج
│ sec02-test-img (alpine 3.24.2) │ alpine │        0        │    -    │
~~~

0 ثغرات. وعلى [[ubuntu:22.04]]:

~~~text الناتج
Total: 31 (UNKNOWN: 0, LOW: 21, MEDIUM: 9, HIGH: 1, CRITICAL: 0)

│ Library │ Vulnerability  │ Severity │ Status │ Installed Version │   Fixed Version   │
│ libssl3 │ CVE-2026-84782 │ HIGH     │ fixed  │ 3.0.2-0ubuntu1.29 │ 3.0.2-0ubuntu1.30 │
~~~

اقرا الجدول: [[Library]] الـ package، و [[Installed Version]] اللي عندك، و [[Fixed Version]] أول نسخة متصلّحة. و [[Status: fixed]] يعني فيه تحديث موجود، فالحل تبني الـ image تاني على base أحدث. و [[affected]] من غير Fixed Version يعني لسه مفيش تصليح.

وهنا كمان: الأمر رجع **0** رغم الـ 31. عشان يفشل:

~~~bash
trivy image --severity HIGH,CRITICAL --exit-code 1 ubuntu:22.04
~~~

[[--severity]] اعرض دول بس، و [[--exit-code 1]] ارجع 1 لو لقيت حاجة. رجع 1 والجدول فيه [[libssl3]] بس. وزوّدنا [[--quiet]] عشان شريط تحميل القاعدة ميملاش اللوج.

---

## ٤. الحل: workflow في GitHub Actions

| السطر | معناه |
|---|---|
| [[name: security]] | اسم الـ workflow في تاب Actions |
| [[on: [push, pull_request]]] | يشتغل مع كل push وكل PR |
| [[jobs: audit:]] | job اسمه audit |
| [[runs-on: ubuntu-latest]] | على جهاز لينكس من GitHub |
| [[uses: actions/checkout@v7]] | نزّل الكود |
| [[uses: actions/setup-node@v7]] + [[node-version: 22]] و [[cache: npm]] | سطّب Node 22، وخزّن مكتبات npm بين الـ runs |
| [[run: npm ci]] | سطّب المكتبات من الـ lock file بالظبط |
| [[run: npm audit --audit-level=high --omit=dev]] | السطر اللي بيفشّل الـ job |

اتأكدنا إن الملف سليم بـ actionlint (أداة بتراجع ملفات GitHub Actions): مطبعش أي خطأ ورجع 0. والـ [[@v7]] آخر نسخة رئيسية من الاتنين وقت الكتابة. وعشان تضيف semgrep و trivy في نفس الـ workflow، زوّد steps بـ [[--error]] و [[--exit-code 1]].

## ٥. على ويندوز

[[npm audit]] نفس الكلام في PowerShell، و [[$LASTEXITCODE]] بيوريك الـ exit code بعده. و semgrep و trivy من Docker بنفس الطريقة، بس [[$(pwd)]] تبقى [[$__{PWD}]] في PowerShell.

## الخلاصة

| الأداة | بيفشل لوحده؟ | السطر في CI |
|---|---|---|
| npm audit | أيوه، حسب [[--audit-level]] | [[npm audit --audit-level=high --omit=dev]] |
| Semgrep | لأ | [[semgrep --config auto --error]] |
| Trivy | لأ | [[trivy image --severity HIGH,CRITICAL --exit-code 1 IMAGE]] |`,
          lines: [
            "فشّل الـ build لو فيه ثغرة high أو critical.",
            "Semgrep بيفحص الكود نفسه على أنماط خطيرة، والقواعد بتتختار حسب اللغة.",
            "Trivy بيفحص الـ Docker image: كل package في النظام جواها."
          ],
          sol: R`الخطوة: [[- run: npm audit --audit-level=high]] بعد [[npm ci]] في الـ workflow. لو فيه ثغرة high أو critical الأمر بيرجع exit code 1 والـ job يبقى أحمر ❌، ولو الموجود moderate أو low بس بيعدّي ✅ مع إنه بيطبعهم في اللوج.

الغلطة الشائعة إن الـ CI يفضل أحمر بسبب ثغرة في devDependency ملهاش علاقة بالإنتاج، فالفريق يبطّل يبص عليه. الحل: [[npm audit --audit-level=high --omit=dev]] يفحص مكتبات الإنتاج بس. وخليه جزء من الـ PR مش خطوة لوحدها بعد الـ merge، عشان الثغرة توقف الـ PR قبل ما تدخل.`,
          solCode: R`name: security
on: [push, pull_request]
jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm audit --audit-level=high --omit=dev`
        }
      ]
    }
]);
