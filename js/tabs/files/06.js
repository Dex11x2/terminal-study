// تكملة تاب files: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/files/01.js (شرح حقول الدرس في أوله)
MORE("files", [
    {
      t: "المفاتيح والشهادات",
      l: 3,
      n: "أخطر ملفات هتتعامل معاها: .pem و .key و .crt بتوع HTTPS، ومفاتيح SSH (id_ed25519 و .pub)، و .p12 و .jks اللي بيوقّعوا تطبيقات Android. مين فيهم سر ومين عادي، وتعرف كل واحد جواه إيه",
      items: [
        {
          cmd: ".pem و .crt و .key",
          title: "إيه الفرق بين .pem و .crt و .key، وأنهي واحد فيهم سر؟",
          desc: R`HTTPS بيعتمد على زوج مفاتيح: مفتاح خاص (private key) سر عند السيرفر بس، وشهادة (certificate) فيها المفتاح العام + اسم الدومين + توقيع من جهة موثوقة (CA زي Let's Encrypt). المتصفح بيتأكد من الشهادة، والسيرفر بيثبت إنه صاحبها بالمفتاح الخاص.

الامتدادات مربكة لأن فيه فرق بين «الصيغة» و «المحتوى»:
الصيغة (encoding):
• PEM: نص Base64 بين سطرين [[-----BEGIN ...-----]] و [[-----END ...-----]]. تقدر تفتحه في محرر. ده الأشهر على لينكس و Nginx.
• DER: نفس المحتوى binary (بيبدأ بـ [[30 82]]). شائع على ويندوز و Java.
والمحتوى بيبان من السطر الأول في PEM:
• [[-----BEGIN CERTIFICATE-----]]: شهادة. عام، عادي تبعته لأي حد (المتصفح بيستلمه في كل زيارة).
• [[-----BEGIN PRIVATE KEY-----]] (أو [[RSA PRIVATE KEY]] أو [[EC PRIVATE KEY]]): مفتاح خاص. سر. لو اتسرّب أي حد يقدر يعمل نفسه موقعك.
• [[-----BEGIN CERTIFICATE REQUEST-----]] ([[.csr]]): طلب شهادة بتبعته للـ CA.
• [[-----BEGIN PUBLIC KEY-----]]: مفتاح عام، عادي.

والامتدادات مجرد عُرف:
• [[.key]]: غالبًا مفتاح خاص (PEM). سر.
• [[.crt]] و [[.cer]]: شهادة (PEM أو DER).
• [[.pem]]: أي حاجة بصيغة PEM، ممكن شهادة، أو مفتاح، أو الاتنين في ملف واحد. افتحه واقرا السطر الأول.
• [[fullchain.pem]] و [[privkey.pem]]: اللي certbot (Let's Encrypt) بيعمله في [[/etc/letsencrypt/live/domain/]]. الأول الشهادة وشهادات الـ CA الوسيطة (لـ [[ssl_certificate]] في Nginx)، والتاني المفتاح الخاص ([[ssl_certificate_key]]).
• [[.pem]] اللي AWS بتديهولك لما تعمل سيرفر EC2: ده مفتاح SSH خاص، مش شهادة (الدرس الجاي).

أدوات: [[openssl x509 -in cert.crt -noout -subject -issuer -dates]] بتقرا الشهادة (مين ولمين وإمتى تنتهي)، و [[openssl s_client -connect site:443]] بيجيب شهادة أي موقع.

القواعد: المفتاح الخاص صلاحياته [[600]]، ومكانه السيرفر بس، ومش في Git ولا Docker image ولا Slack أبدًا ([[*.key]] و [[*.pem]] في [[.gitignore]]).`,
          example: R`openssl req -x509 -newkey rsa:2048 -nodes -keyout server.key -out server.crt -days 365 -subj "/CN=gym.local"
head -1 server.key server.crt
openssl x509 -in server.crt -noout -subject -issuer -dates
openssl x509 -in server.crt -noout -pubkey | openssl sha256
openssl pkey -in server.key -pubout | openssl sha256
openssl s_client -connect github.com:443 -servername github.com </dev/null 2>/dev/null | openssl x509 -noout -subject -issuer -enddate`,
          try: R`نفّذ المثال (openssl موجود على لينكس والماك و Git Bash، وفي Git Bash اكتب [[-subj "//CN=gym.local"]] بشرطتين لأنه بيحوّل [[/CN=...]] لمسار ويندوز). اتأكد إن الـ hash في السطر ٤ و ٥ متطابق: ده معناه إن المفتاح ده بتاع الشهادة دي (لما Nginx يقول [[key values mismatch]] ده اللي بتشيكه). بعدين جرّب السطر الأخير على دومين موقعك أو أي موقع واعرف الشهادة هتنتهي إمتى. وحوّل الشهادة لـ DER: [[openssl x509 -in server.crt -outform der -out server.der]] وقارن [[file]] للاتنين.`,
          deep: {
            why: R`من غير شهادات، أي حد في نفس الشبكة (كافيه، شبكة شركة) يقدر يعمل نفسه البنك ويقرا كل حاجة. الشهادة بتربط الدومين بمفتاح عام، وتوقيع CA موثوق (متسجل في المتصفح أو النظام) بيضمن إن الربط ده صح. والمفتاح الخاص هو الدليل الوحيد إن السيرفر ده فعلًا صاحب الشهادة.`,
            how: R`وقت الـ TLS handshake السيرفر بيبعت شهادته (والوسيطة)، والمتصفح بيمشي على السلسلة لحد CA عنده في المخزن الموثوق (على لينكس [[/etc/ssl/certs]])، ويتأكد من الدومين والتاريخ. وبعدين السيرفر بيثبت إنه معاه المفتاح الخاص بإنه يوقّع حاجة بيه. والـ hash اللي في المثال بيقارن المفتاح العام اللي جوه الشهادة بالمفتاح العام المستخرج من المفتاح الخاص.`,
            when: R`إعداد HTTPS على VPS (certbot بيعمل كل ده لوحده)، و debug لأخطاء SSL ([[certificate has expired]] و [[unable to get local issuer certificate]])، وشهادات محلية للتطوير (mkcert).`,
            mistakes: R`تعمل commit لـ [[privkey.pem]] أو [[.key]]. تستخدم [[cert.pem]] بدل [[fullchain.pem]] في Nginx فالمتصفحات على الموبايل تقول الشهادة مش موثوقة (السلسلة ناقصة). تنسى التجديد (Let's Encrypt ٩٠ يوم، و certbot بيعمل timer لوحده، اتأكد إنه شغال). وتبعت ملف [[.pem]] لحد وانت مش عارف هو شهادة ولا مفتاح.`
          },
          teach: R`## الفكرة في سطرين

المثال بيعمل **زوج** على جهازك: مفتاح خاص ([[server.key]]) وشهادة ([[server.crt]])، وبعدين يقرا الشهادة، ويتأكد إن المفتاح ده بتاع الشهادة دي بالظبط، وفي الآخر يجيب شهادة موقع حقيقي (GitHub) ويقراها. كل الأوامر من أداة واحدة اسمها [[openssl]]، وكل أمر فيها شكله [[openssl <أمر فرعي> <خيارات>]].

الأوامر اتشغّلت على أوبونتو 24.04 (جوه Docker، OpenSSL 3.0.13)، وعلى ويندوز بـ [[openssl]] اللي جاي مع Git (OpenSSL 3.5.8) من PowerShell 7 و Git Bash. اشتغل في فولدر تجربة، والمفتاح ده للتجربة بس.

---

## ١. نعمل مفتاح وشهادة في أمر واحد

~~~bash
openssl req -x509 -newkey rsa:2048 -nodes -keyout server.key -out server.crt -days 365 -subj "/CN=gym.local"
~~~

نفكّه حتة حتة:

| الحتة | معناها |
|---|---|
| [[req]] | الأمر الفرعي بتاع «طلب شهادة» (CSR = Certificate Signing Request) |
| [[-x509]] | متعملش طلب، اعمل **شهادة** جاهزة على طول. X.509 اسم المعيار اللي كل شهادات HTTPS ماشية عليه |
| [[-newkey rsa:2048]] | اعمل مفتاح جديد نوعه RSA وطوله 2048 bit |
| [[-nodes]] | no DES: متشفّرش المفتاح بباسورد (عشان التجربة ميسألش) |
| [[-keyout server.key]] | احفظ المفتاح الخاص هنا |
| [[-out server.crt]] | واحفظ الشهادة هنا |
| [[-days 365]] | الشهادة صالحة سنة من النهارده |
| [[-subj "/CN=gym.local"]] | بيانات صاحب الشهادة من غير ما يسألك. CN = Common Name، يعني اسم الدومين |

الشهادة دي **self-signed**: انت اللي عملتها وانت اللي مضيتها، مفيش CA. عشان كده تنفع للتجربة بس، والمتصفح هيحذّر منها.

الناتج سطرين نقط و [[+]] (ده openssl بيدوّر على أرقام أولية للمفتاح، عادي) وبيعمل الملفين.

> على Git Bash في ويندوز: الـ [[/CN=gym.local]] بيبوظ، لأن Git Bash بيفتكر أي حاجة بتبدأ بـ [[/]] مسار ويحوّلها، فبيطلع غلط فيه [[C:/Program Files/Git/CN=gym.local]]. اكتبها [[-subj "//CN=gym.local"]] (شرطتين) وهتشتغل. في PowerShell و CMD مفيش المشكلة دي.

---

## ٢. أول سطر في كل ملف: [[head -1 server.key server.crt]]

[[head]] بيطبع أول سطور من ملف، و [[-1]] يعني سطر واحد بس. ولما تديله أكتر من ملف بيكتب اسم كل ملف فوق سطره:

~~~text الناتج
==> server.key <==
-----BEGIN PRIVATE KEY-----

==> server.crt <==
-----BEGIN CERTIFICATE-----
~~~

ده الفرق بين الملفين كله: الاتنين **PEM** (نص)، والسطر الأول بيقولك اللي جوه إيه. [[PRIVATE KEY]] يعني سر، و [[CERTIFICATE]] يعني عام. والامتداد ([[.key]] و [[.crt]]) احنا اللي اخترناه بس.

وعلى PowerShell مفيش [[head]]، فاستخدم [[Get-Content server.key, server.crt -TotalCount 1]]، وبيطبع نفس السطرين من غير الأسامي.

### PEM من جوه

~~~text أول bytes في server.crt (xxd)
00000000: 2d2d 2d2d 2d42 4547 494e 2043 4552 5449  -----BEGIN CERTI
00000010: 4649 4341 5445 2d2d 2d2d 2d0a 4d49 4944  FICATE-----.MIID
~~~

حروف عادية: السطر الأول، وبعده نص Base64 مقسوم سطور كل واحد ٦٤ حرف. والـ Base64 ده هو نفس الـ bytes بتاعة **DER** متحوّلة لحروف. لو حوّلتها:

~~~bash
openssl x509 -in server.crt -outform der -out server.der
xxd -l 4 server.der
file server.crt server.der
~~~

~~~text الناتج
00000000: 3082 0309                                0...
server.crt: PEM certificate
server.der: Certificate, Version=3
~~~

[[-outform der]] يعني اكتب الناتج binary. [[30 82]] هي أول bytes في أي DER: [[30]] معناها «SEQUENCE» في ASN.1 (اللغة اللي الشهادة متوصوفة بيها)، و [[82]] معناها «الطول جاي في ٢ bytes»، و [[0309]] الطول نفسه. الملف الـ DER طلع 781 byte والـ PEM طلع 1115، لأن Base64 بيكبّر الحجم حوالي الثلث.

---

## ٣. نقرا الشهادة: [[openssl x509 -in server.crt -noout -subject -issuer -dates]]

| الحتة | معناها |
|---|---|
| [[x509]] | الأمر الفرعي بتاع الشهادات |
| [[-in server.crt]] | الملف اللي هيقراه |
| [[-noout]] | متطبعش الشهادة نفسها (الـ Base64) تاني |
| [[-subject]] | الشهادة دي لمين |
| [[-issuer]] | مين مضيها |
| [[-dates]] | صالحة من إمتى لإمتى |

~~~text الناتج (أوبونتو)
subject=CN = gym.local
issuer=CN = gym.local
notBefore=Oct  7 11:59:37 2026 GMT
notAfter=Oct  7 11:59:37 2027 GMT
~~~

[[subject]] و [[issuer]] نفس الاسم، وده تعريف self-signed. في شهادة حقيقية الـ [[issuer]] بيبقى اسم CA. و [[notAfter]] هو اللي بتبص عليه لما موقع يقول [[certificate has expired]].

> OpenSSL 3.5 (اللي مع Git على ويندوز) بيطبعها من غير مسافات: [[subject=CN=gym.local]]. نفس المعنى.

ولو عايز تشوف **كل** حاجة جوه الشهادة، شيل الخيارات دي واكتب [[-text]]:

~~~bash
openssl x509 -in server.crt -noout -text
~~~

~~~text أول الناتج
Certificate:
    Data:
        Version: 3 (0x2)
        Serial Number:
            2b:e6:95:61:05:a5:6d:61:87:88:da:73:90:23:10:7f:c3:01:30:39
        Signature Algorithm: sha256WithRSAEncryption
        Issuer: CN = gym.local
        Validity
            Not Before: Oct  7 11:59:37 2026 GMT
            Not After : Oct  7 11:59:37 2027 GMT
        Subject: CN = gym.local
        Subject Public Key Info:
            Public Key Algorithm: rsaEncryption
                Public-Key: (2048 bit)
                Modulus:
                    00:cb:3d:df:91:cf:4d:21:59:05:a8:83:50:35:79:
                    ...
~~~

يعني الشهادة فيها: رقم مسلسل، والخوارزمية اللي اتمضت بيها، ومين مضى، والتواريخ، ولمين، و**المفتاح العام** ([[Modulus]] ده المفتاح RSA نفسه)، وفي آخرها التوقيع. مفيهاش المفتاح الخاص خالص.

---

## ٤ و ٥. المفتاح ده بتاع الشهادة دي؟

~~~bash
openssl x509 -in server.crt -noout -pubkey | openssl sha256
openssl pkey -in server.key -pubout | openssl sha256
~~~

### السطر الأول

- [[-pubkey]]: طلّع المفتاح العام اللي جوه الشهادة (بيطلع PEM بيبدأ بـ [[-----BEGIN PUBLIC KEY-----]]).
- [[|]]: الـ pipe، ناتج الأمر الشمال يدخل للأمر اليمين.
- [[openssl sha256]]: يحسب hash (بصمة SHA-256) للي داخله. الـ hash رقم ثابت الطول، ولو اتغير حرف واحد في الدخل بيتغير كله.

### السطر التاني

- [[pkey]]: الأمر الفرعي بتاع المفاتيح.
- [[-in server.key]]: المفتاح الخاص.
- [[-pubout]]: طلّع منه المفتاح العام. ده ممكن لأن المفتاح الخاص فيه كل المعلومات، والعكس مستحيل.

~~~text الناتج
SHA2-256(stdin)= 884722af8a7c603c47a42df67702a1b210a398ca4532a1057ca17f4674d029de
SHA2-256(stdin)= 884722af8a7c603c47a42df67702a1b210a398ca4532a1057ca17f4674d029de
~~~

[[stdin]] يعني «الدخل جه من الـ pipe مش من ملف». الرقمين **متطابقين** = المفتاح العام اللي في الشهادة هو نفسه اللي طالع من المفتاح الخاص، يعني الاتنين زوج. لو مختلفين، Nginx هيرفض يشتغل ويقول [[key values mismatch]]. الأرقام هتختلف عندك لأن مفتاحك جديد، المهم يكونوا زي بعض.

---

## ٦. شهادة موقع حقيقي

~~~bash
openssl s_client -connect github.com:443 -servername github.com </dev/null 2>/dev/null | openssl x509 -noout -subject -issuer -enddate
~~~

من جوه لبرة:

| الحتة | معناها |
|---|---|
| [[s_client]] | يعمل اتصال TLS زي المتصفح، ويطبع الشهادة اللي السيرفر بعتها |
| [[-connect github.com:443]] | على الدومين ده والبورت 443 (بورت HTTPS) |
| [[-servername github.com]] | يبعت اسم الدومين (SNI)، عشان السيرفر اللي شايل مواقع كتير يعرف يرجّع أنهي شهادة |
| [[</dev/null]] | دخل فاضي، فـ [[s_client]] يقفل على طول بدل ما يستناك تكتب |
| [[2>/dev/null]] | ارمي رسايل الـ stderr (تفاصيل الاتصال) |
| [[openssl x509 ...]] بعد الـ pipe | [[x509]] بياخد أول شهادة PEM من الناتج ويقراها |
| [[-enddate]] | تاريخ الانتهاء بس |

~~~text الناتج (أكتوبر 2026)
subject=CN = github.com
issuer=C = GB, O = Sectigo Limited, CN = Sectigo Public Server Authentication CA DV E36
notAfter=Nov 29 23:59:59 2026 GMT
~~~

هنا الـ [[issuer]] مختلف عن الـ [[subject]]: الشهادة ممضية من CA اسمها Sectigo. و [[C]] = Country و [[O]] = Organization. والتاريخ هيختلف وقت ما تجرّب، لأن المواقع بتجدد شهاداتها.

### على ويندوز PowerShell

[[</dev/null]] مش موجود في PowerShell، فبنبعت دخل فاضي بالـ pipe بداله:

~~~powershell
"" | openssl s_client -connect github.com:443 -servername github.com 2>$null | openssl x509 -noout -subject -enddate
~~~

~~~text الناتج (PowerShell 7 و Windows PowerShell 5.1)
subject=CN=github.com
notAfter=Nov 29 23:59:59 2026 GMT
~~~

[[2>$null]] هي نسخة PowerShell من [[2>/dev/null]].

---

## الصلاحيات

~~~text ls -l على أوبونتو
-rw-r--r-- 1 root root 1115 Oct  7 11:59 server.crt
-rw------- 1 root root 1704 Oct  7 11:59 server.key
~~~

openssl عمل المفتاح [[-rw-------]] (يعني 600: صاحبه بس يقرا ويكتب) لوحده، والشهادة [[-rw-r--r--]] عادي لأي حد يقراها. على ويندوز الصلاحيات دي مبتظهرش بنفس الشكل (Git Bash بيعرض الاتنين [[-rw-r--r--]])، فخلي بالك انت فين بتحط المفتاح.

> ملاحظة غريبة: [[file server.key]] على أوبونتو قال [[OpenSSH private key (no password)]]، وده غلط: الملف مفتاح PKCS#8 بتاع openssl مش مفتاح SSH. [[file]] بيخمّن من أول سطر، فاعتمد على السطر الأول بعينك.

---

## الخلاصة

| الأمر | بيجاوب على |
|---|---|
| [[openssl req -x509 -newkey ...]] | اعمل مفتاح وشهادة self-signed للتجربة |
| [[head -1]] | الملف ده جواه إيه (شهادة ولا مفتاح) |
| [[openssl x509 -noout -subject -issuer -dates]] | لمين، ومين مضى، وتنتهي إمتى |
| [[-pubkey]] و [[pkey -pubout]] + [[sha256]] | المفتاح والشهادة زوج ولا لأ |
| [[openssl s_client]] وبعده [[openssl x509]] | شهادة أي موقع على النت |

~~~text
PEM          نص Base64 بين BEGIN و END. تفتحه في محرر
DER          نفس المحتوى binary، بيبدأ بـ 30 82
.crt/.cer    شهادة: عام
.key         مفتاح خاص: سر، صلاحياته 600، وبره Git
.pem         أي حاجة PEM: اقرا السطر الأول
~~~`,
          lines: [
            R`بيعمل مفتاح خاص RSA وشهادة self-signed للتجربة ([[-nodes]] من غير باسورد على المفتاح).`,
            R`أول سطر في كل ملف بيقولك هو إيه.`,
            R`مين صاحب الشهادة، ومين مضيها، وصالحة من إمتى لإمتى.`,
            R`hash للمفتاح العام اللي جوه الشهادة.`,
            R`hash للمفتاح العام المستخرج من المفتاح الخاص: لازم يطابق اللي فوقه.`,
            R`يجيب شهادة GitHub الحقيقية ويقرا منها.`
          ],
          sol: R`الناتج الحقيقي:
[[==> server.key <==]] [[-----BEGIN PRIVATE KEY-----]]
[[==> server.crt <==]] [[-----BEGIN CERTIFICATE-----]]
[[subject=CN = gym.local]]
[[issuer=CN = gym.local]] (نفس الاسم: self-signed، عشان كده المتصفح هيحذّر منها)
[[notBefore=Oct  1 14:16:50 2026 GMT]] و [[notAfter=Oct  1 14:16:50 2027 GMT]]
السطرين ٤ و ٥ بنفس الـ hash بالظبط، زي [[SHA2-256(stdin)= ed34a991...]].
و GitHub:
[[subject=CN = github.com]]
[[issuer=C = GB, O = Sectigo Limited, CN = Sectigo Public Server Authentication CA DV E36]]
[[notAfter=Nov 29 23:59:59 2026 GMT]] (التاريخ هيختلف وقت ما تجرب)

و [[ls -l]] بيوضح إن [[server.key]] اتعمل بصلاحيات [[-rw-------]] لوحده. و [[file server.der]] بيقول [[Certificate, Version=3]]، وأوله [[30 82]].`
        },
        {
          cmd: "id_ed25519 و .pub",
          title: "مفاتيح SSH: إيه الفرق بين id_ed25519 و id_ed25519.pub، وأنهي واحد بتديه لـ GitHub؟",
          desc: R`لما تعمل مفتاح SSH بـ [[ssh-keygen -t ed25519]]، بيتعمل ملفين في [[~/.ssh/]]:
• [[id_ed25519]] (من غير امتداد): المفتاح الخاص. سر. ده اللي بيثبت إنك انت. عمره ما يتبعت لحد ولا يترفع في أي مكان، ولا حتى لـ GitHub.
• [[id_ed25519.pub]]: المفتاح العام (public). سطر واحد بيبدأ بـ [[ssh-ed25519]]. ده اللي بتحطه في GitHub (Settings ثم SSH keys) أو على السيرفر في [[~/.ssh/authorized_keys]]. عادي أي حد يشوفه.
قاعدة سهلة: اللي بـ [[.pub]] للناس، واللي من غير امتداد ليك انت بس.

أشكال قديمة: [[id_rsa]] و [[id_rsa.pub]] (RSA، شغال بس ed25519 أحدث وأقصر وأأمن)، و [[id_ecdsa]].

ملفات تانية في [[~/.ssh/]]:
• [[authorized_keys]]: على السيرفر: المفاتيح العامة المسموح لها تدخل، سطر لكل مفتاح.
• [[known_hosts]]: على جهازك: بصمات السيرفرات اللي دخلتها قبل كده. لو بصمة سيرفر اتغيرت، SSH بيوقف ويحذرك ([[REMOTE HOST IDENTIFICATION HAS CHANGED]]) لأن ممكن حد بيعمل نفسه السيرفر.
• [[config]]: اختصارات للسيرفرات (تاب ssh config).

جوه المفتاح الخاص:
• [[-----BEGIN OPENSSH PRIVATE KEY-----]]: الصيغة الحديثة. والقديمة [[-----BEGIN RSA PRIVATE KEY-----]].
• ممكن يكون متشفّر بـ passphrase (بتتسأل عليها وانت بتعمله). يُفضّل، ومعاها [[ssh-agent]] عشان متكتبهاش كل مرة.
• [[.ppk]]: صيغة PuTTY على ويندوز. PuTTYgen بيحوّل بينها وبين OpenSSH.
• [[.pem]] اللي AWS بتديهولك: مفتاح SSH خاص بصيغة PEM، بتستخدمه بـ [[ssh -i key.pem]].

الصلاحيات: SSH بيرفض يستخدم مفتاح خاص أي حد غيرك يقدر يقراه. لازم [[chmod 600 ~/.ssh/id_ed25519]] و [[chmod 700 ~/.ssh]]. وعلى ويندوز لو نسخت المفتاح من مكان تاني، ظبط الصلاحيات من Properties ثم Security (أو [[icacls]]).

لو مفتاحك الخاص اتسرّب (اترفع على GitHub، أو اتبعت): امسح الـ [[.pub]] بتاعه من GitHub ومن كل [[authorized_keys]] فورًا، واعمل مفتاح جديد.`,
          example: R`ssh-keygen -t ed25519 -C "sara@laptop" -f ./id_ed25519
ls -l id_ed25519 id_ed25519.pub
head -1 id_ed25519
cat id_ed25519.pub
ssh-keygen -lf id_ed25519.pub
chmod 644 id_ed25519 && ssh-keygen -y -f id_ed25519`,
          try: R`في فولدر تجربة (مش [[~/.ssh]] عشان متلمسش مفاتيحك الحقيقية) نفّذ المثال، ودوس Enter مرتين لما يسأل على الـ passphrase (أو اكتب واحدة وشوف إيه اللي اتغير). اقرا رسالة آخر أمر، وبعدين [[chmod 600 id_ed25519]] وجرّب تاني. وبص على مفتاحك الحقيقي: [[ls -l ~/.ssh]] وصلاحياته.`,
          deep: {
            why: R`الباسورد بيتبعت للسيرفر وممكن يتخمن أو يتسرّب. مفاتيح SSH بتخليك تثبت إنك صاحب المفتاح الخاص من غير ما تبعته خالص: السيرفر عنده الـ [[.pub]] بس، ويقدر يتأكد منك بيه، ومحدش يقدر يعمل المفتاح الخاص من العام.`,
            how: R`وانت بتدخل، السيرفر بيدوّر على مفتاحك العام في [[authorized_keys]]، ويطلب منك توقّع رسالة عشوائية بالمفتاح الخاص، ويتحقق من التوقيع بالعام. المفتاح الخاص مبيخرجش من جهازك. و [[ssh-keygen -y]] بيطلّع الـ [[.pub]] من المفتاح الخاص (لأن الخاص فيه كل المعلومات)، والعكس مستحيل.`,
            when: R`[[git push]] على GitHub من غير باسورد، والدخول على أي VPS، والـ deploy من GitHub Actions (المفتاح الخاص يبقى secret هناك).`,
            mistakes: R`تحط الـ [[id_ed25519]] (الخاص) في GitHub بدل الـ [[.pub]]: GitHub بيرفض لأن الشكل غلط، بس لو لزقته في issue أو chat يبقى اتسرّب. صلاحيات واسعة ([[UNPROTECTED PRIVATE KEY FILE]]). تعمل commit لفولدر [[.ssh]] أو لـ [[key.pem]] بتاع AWS. وتنسخ نفس المفتاح الخاص على كل أجهزتك وسيرفراتك بدل مفتاح لكل جهاز.`
          },
          teach: R`## الفكرة في سطرين

المثال بيعمل مفتاح SSH جديد **في الفولدر الحالي** (مش في [[~/.ssh]]، عشان متلمسش مفاتيحك الحقيقية)، وبعدين يبص على الملفين: صلاحياتهم، وأول سطر، والبصمة. وفي الآخر بيوريك SSH بيعمل إيه لو صلاحيات المفتاح الخاص واسعة.

الأوامر اتشغّلت على أوبونتو 24.04 (جوه Docker)، وعلى ويندوز من PowerShell 7 بـ [[ssh-keygen]] بتاع Git وبتاع ويندوز نفسه ([[C:\Windows\System32\OpenSSH]]).

---

## ١. نعمل المفتاح: [[ssh-keygen -t ed25519 -C "sara@laptop" -f ./id_ed25519]]

| الحتة | معناها |
|---|---|
| [[ssh-keygen]] | أداة SSH اللي بتعمل المفاتيح وتقراها |
| [[-t ed25519]] | type: نوع المفتاح. Ed25519 خوارزمية حديثة، مفتاحها قصير وسريع |
| [[-C "sara@laptop"]] | comment: تعليق بيتكتب في آخر الـ [[.pub]] عشان تعرف المفتاح ده بتاع أنهي جهاز |
| [[-f ./id_ed25519]] | file: اسم الملف. [[./]] يعني «الفولدر الحالي» |

الأمر بيسألك على passphrase مرتين (Enter من غير كتابة = من غير باسورد):

~~~text الناتج (أوبونتو)
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in ./id_ed25519
Your public key has been saved in ./id_ed25519.pub
The key fingerprint is:
SHA256:TtVhWx9sIJvnXBdo21CsTJRFe1O8dsTq02YHjLDEV1M sara@laptop
The key's randomart image is:
+--[ED25519 256]--+
|         . .++&XE|
|          +o=X *O|
...
+----[SHA256]-----+
~~~

- [[identification]] هو المفتاح الخاص، و [[public key]] العام.
- [[fingerprint]] بصمة المفتاح (شرحها في الخطوة ٥).
- [[randomart]] رسمة من البصمة، معمولة عشان العين تفرّق بين مفتاحين بسرعة. ملهاش استخدام غير كده.

الـ passphrase بتشفّر المفتاح الخاص **جوه الملف**، فلو حد سرق الملف ميقدرش يستخدمه من غيرها. للتجربة سيبها فاضية، لمفتاحك الحقيقي يُفضّل تحطها.

> عشان تعمله من غير أسئلة (في سكربت): زوّد [[-N ""]] (passphrase فاضية) و [[-q]] (quiet). كده جرّبناه على ويندوز.

---

## ٢. الملفين وصلاحياتهم: [[ls -l id_ed25519 id_ed25519.pub]]

[[ls -l]] بيعرض الملفات بالتفاصيل (long):

~~~text الناتج (أوبونتو)
-rw------- 1 root root 399 Oct  7 12:01 id_ed25519
-rw-r--r-- 1 root root  93 Oct  7 12:01 id_ed25519.pub
~~~

نقرا أول عمود:

| الجزء | id_ed25519 | id_ed25519.pub |
|---|---|---|
| أول حرف | [[-]] ملف عادي | [[-]] ملف عادي |
| صاحب الملف | [[rw-]] يقرا ويكتب | [[rw-]] يقرا ويكتب |
| الجروب | [[---]] ولا حاجة | [[r--]] يقرا |
| أي حد تاني | [[---]] ولا حاجة | [[r--]] يقرا |
| بالأرقام | 600 | 644 |

[[ssh-keygen]] عمل الخاص 600 لوحده. والأرقام التانية: 1 عدد الـ links، و [[root root]] صاحب الملف والجروب (جوه Docker انت root)، و 399 و 93 الحجم بالـ byte.

على ويندوز:

~~~powershell
Get-ChildItem id_ed25519*
~~~

~~~text الناتج (PowerShell 7)
Mode   Length Name
----   ------ ----
-a---     399 id_ed25519
-a---      93 id_ed25519.pub
~~~

نفس الأحجام، بس ويندوز مبيعرضش rwx: الصلاحيات هناك ACL بتشوفها من Properties ثم Security أو [[icacls id_ed25519]].

---

## ٣. أول سطر في الخاص: [[head -1 id_ed25519]]

~~~text الناتج
-----BEGIN OPENSSH PRIVATE KEY-----
~~~

PEM زي درس [[.pem]] بالظبط، بس المحتوى بصيغة OpenSSH الحديثة. لو شفت [[-----BEGIN RSA PRIVATE KEY-----]] يبقى مفتاح RSA بالصيغة القديمة. على PowerShell: [[Get-Content id_ed25519 -TotalCount 1]].

---

## ٤. العام كله: [[cat id_ed25519.pub]]

[[cat]] بيطبع الملف كله، وهو سطر واحد:

~~~text الناتج
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIDCp36T5HZnGE2GcERcPayjJFs2zkIZH6SzWzZHyvOoY sara@laptop
~~~

٣ حتت بينهم مسافة:

| الحتة | إيه هي |
|---|---|
| [[ssh-ed25519]] | نوع المفتاح |
| [[AAAAC3Nza...]] | المفتاح نفسه بالـ Base64 |
| [[sara@laptop]] | التعليق اللي كتبناه بـ [[-C]] |

ليه كل مفاتيح Ed25519 بتبدأ بـ [[AAAAC3NzaC1lZDI1NTE5]]؟ لأن الـ Base64 ده لو فكّيته هتلاقي أوله اسم النوع مكتوب تاني:

~~~text أول الـ bytes بعد فك الـ Base64 (xxd)
00000000: 0000 000b 7373 682d 6564 3235 3531 3900  ....ssh-ed25519.
00000010: 0000 2030 a9df a4f9 1d99 c613 619c 1117  .. 0........a...
~~~

[[0000000b]] = 11 (طول الاسم)، وبعده [[ssh-ed25519]] (11 حرف)، وبعده [[00000020]] = 32 وبعدها الـ 32 byte بتوع المفتاح (256 bit). ده السطر اللي بتلزقه في GitHub أو في [[authorized_keys]].

---

## ٥. البصمة: [[ssh-keygen -lf id_ed25519.pub]]

- [[-l]]: list، اطبع البصمة.
- [[-f]]: من الملف ده.

~~~text الناتج
256 SHA256:TtVhWx9sIJvnXBdo21CsTJRFe1O8dsTq02YHjLDEV1M sara@laptop (ED25519)
~~~

| الحتة | معناها |
|---|---|
| [[256]] | طول المفتاح بالـ bit |
| [[SHA256:...]] | hash SHA-256 للمفتاح العام، مكتوب Base64 |
| [[sara@laptop]] | التعليق |
| [[(ED25519)]] | النوع |

البصمة دي اللي GitHub بيعرضها جنب كل مفتاح في Settings، فتقدر تعرف أنهي مفتاح هو أنهي ملف عندك من غير ما تقارن السطر الطويل كله. وعلى ويندوز طلعت بنفس الشكل بالظبط من الأداتين.

---

## ٦. صلاحيات واسعة: [[chmod 644 id_ed25519 && ssh-keygen -y -f id_ed25519]]

نفك السطر:

- [[chmod 644 id_ed25519]]: بنوسّع صلاحيات **الخاص** عن قصد، يعني أي حد على الجهاز يقدر يقراه.
- [[&&]]: نفّذ اللي بعدي لو اللي قبلي نجح.
- [[ssh-keygen -y -f id_ed25519]]: [[-y]] يعني «اقرا المفتاح الخاص وطلّع منه العام».

~~~text الناتج
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@         WARNING: UNPROTECTED PRIVATE KEY FILE!          @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
Permissions 0644 for 'id_ed25519' are too open.
It is required that your private key files are NOT accessible by others.
This private key will be ignored.
Load key "id_ed25519": bad permissions
~~~

SSH **رفض** يقرا المفتاح، والـ exit code طلع 255 (فشل). نفس الرسالة دي هتطلعلك وانت بتعمل [[ssh -i key.pem]] لو المفتاح صلاحياته واسعة. الحل:

~~~bash
chmod 600 id_ed25519
ssh-keygen -y -f id_ed25519
~~~

~~~text الناتج
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIDCp36T5HZnGE2GcERcPayjJFs2zkIZH6SzWzZHyvOoY sara@laptop
~~~

نفس سطر الـ [[.pub]] بالظبط. يعني لو ضاع ملف الـ [[.pub]]، تقدر ترجعه من الخاص. والعكس مستحيل.

---

## ٧. [[file]] بيعرف الاتنين

~~~text file id_ed25519 id_ed25519.pub
id_ed25519:     OpenSSH private key
id_ed25519.pub: OpenSSH ED25519 public key
~~~

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[ssh-keygen -t ed25519 -C ... -f ...]] | يعمل زوج مفاتيح |
| [[ls -l]] | الخاص 600 والعام 644 |
| [[head -1]] على الخاص | [[BEGIN OPENSSH PRIVATE KEY]] |
| [[cat]] على العام | سطر: النوع، المفتاح، التعليق |
| [[ssh-keygen -lf]] | البصمة اللي GitHub بيعرضها |
| [[ssh-keygen -y -f]] | يطلّع العام من الخاص (ويرفض لو الصلاحيات واسعة) |

~~~text
id_ed25519       الخاص: ليك انت بس، 600، عمره ما يتبعت
id_ed25519.pub   العام: لـ GitHub و authorized_keys، عادي الكل يشوفه
~~~`,
          lines: [
            R`مفتاح ed25519، و [[-C]] تعليق بيتكتب في آخر الـ [[.pub]] (عادة اسمك أو الجهاز)، و [[-f]] اسم الملف.`,
            R`الخاص [[-rw-------]] والعام [[-rw-r--r--]].`,
            R`أول سطر في الخاص.`,
            R`العام: سطر واحد: النوع ثم المفتاح ثم التعليق.`,
            R`البصمة (fingerprint): اللي GitHub بيعرضها جنب المفتاح.`,
            R`صلاحيات واسعة على الخاص: SSH بيرفض يستخدمه.`
          ],
          sol: R`الناتج الحقيقي:
[[-rw------- 1 you you 399 ... id_ed25519]]
[[-rw-r--r-- 1 you you  93 ... id_ed25519.pub]]
[[-----BEGIN OPENSSH PRIVATE KEY-----]]
[[ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIC3w...TwAl sara@laptop]] (المفتاح نفسه هيختلف عندك)
[[256 SHA256:y4XAcLGOHN2iUAGbG5P5+JAE7t0kTarjwjONfgOhLPo sara@laptop (ED25519)]]
وآخر أمر:
[[@         WARNING: UNPROTECTED PRIVATE KEY FILE!          @]]
[[Permissions 0644 for 'id_ed25519' are too open.]]
[[It is required that your private key files are NOT accessible by others.]]
[[This private key will be ignored.]]
وبعد [[chmod 600]] بيطبع الـ [[.pub]] عادي. و [[file]] بيقول [[OpenSSH private key]] للخاص و [[OpenSSH ED25519 public key]] للعام.`
        },
        {
          cmd: ".p12 و .jks",
          title: "ملفات .p12 و .pfx و .jks و keystore إيه، وليه لازم تحافظ عليها؟",
          desc: R`ساعات المفتاح الخاص والشهادة (وشهادات الـ CA) بيتحطوا مع بعض في ملف واحد binary محمي بباسورد. اسمه keystore:

• [[.p12]] و [[.pfx]] (PKCS#12): الصيغة القياسية. ويندوز و .NET و macOS Keychain و Java بيستخدموها. على ويندوز دبل كليك عليه بيفتح معالج تسطيب الشهادة. وهتقابله في: شهادات توقيع تطبيقات iOS (بتطلّعه من Keychain)، وشهادات HTTPS على IIS و Azure، وشهادات العملاء للبنوك والحكومة.
• [[.jks]] (Java KeyStore): صيغة Java القديمة. ومن Java 9 الافتراضي بقى PKCS#12 حتى لو الملف اسمه [[.jks]] (الامتداد بيكدب تاني!).
• [[.keystore]] و [[upload-keystore.jks]]: في Android، ده المفتاح اللي بيوقّع التطبيق (درس [[.apk]]). بيتعمل بـ [[keytool -genkeypair]]، ومعلوماته (الباسورد والـ alias) بتتحط في ملف [[key.properties]] أو [[keystore.properties]] (Flutter و React Native) اللي هو كمان سر.
• [[.mobileprovision]]: في iOS، ملف بيربط شهادة التوقيع بالتطبيق والأجهزة المسموح لها.

ليه مهمين جدًا:
• في Android: لو ضيّعت الـ keystore أو باسورده، مش هتعرف تنزّل تحديث لنفس التطبيق على Google Play (إلا لو مفعّل Play App Signing، ساعتها اللي ضاع هو upload key وتقدر تطلب تغييره). اعمله backup في مكان آمن (password manager).
• لو اتسرّب، أي حد يقدر يوقّع تطبيقات أو يعمل نفسه موقعك.
• الباسورد بيحمي الملف، بس باسورد زي [[changeit]] أو [[123456]] (الأشهر في الأمثلة) ملوش لازمة.

أدوات:
• [[openssl pkcs12 -export -inkey key -in crt -out file.p12]]: تعمل p12 من PEM. و [[openssl pkcs12 -in file.p12 -nodes]]: العكس.
• [[keytool -list -v -keystore file.jks]]: تشوف اللي جواه (بيجي مع JDK).
• في CI (GitHub Actions): الـ keystore بيتحول Base64 ويتحط secret، وفي الـ workflow بيترجع ملف ([[base64 -d]]).

و [[*.jks]] و [[*.keystore]] و [[*.p12]] و [[key.properties]] كلهم في [[.gitignore]].`,
          example: R`openssl pkcs12 -export -inkey server.key -in server.crt -out server.p12 -passout pass:changeit -name gym
file server.p12
openssl pkcs12 -in server.p12 -passin pass:wrong -nokeys
keytool -genkeypair -alias upload -keyalg RSA -keysize 2048 -validity 10000 -keystore upload-keystore.jks -storepass changeit -dname "CN=Gym, O=Gym, C=EG"
keytool -list -keystore upload-keystore.jks -storepass changeit
base64 -w0 upload-keystore.jks | head -c 40`,
          try: R`بالمفتاح والشهادة من درس [[.pem]]، نفّذ المثال ([[keytool]] بييجي مع أي JDK، أو Docker: [[docker run --rm -v "$PWD":/w -w /w eclipse-temurin:21-jdk keytool ...]]). اقرا [[Keystore type]] في ناتج [[keytool -list]]: هو JKS ولا حاجة تانية؟ ولو عندك مشروع Android أو Flutter دوّر على الـ keystore وعلى [[key.properties]] واتأكد إنهم في [[.gitignore]].`,
          deep: {
            why: R`في عالم Windows و Java، البرامج بتحتاج المفتاح والشهادة والسلسلة كلهم مع بعض، ومن الأسهل نقلهم في ملف واحد محمي بدل ٣ ملفات PEM مكشوفة. والتوقيع في Android و iOS بيضمن إن التحديث جاي من نفس المطور الأصلي.`,
            how: R`PKCS#12 حاوية binary (ASN.1، بتبدأ بـ [[30 82]] زي DER) فيها «أكياس» (bags): كيس للمفتاح الخاص متشفّر بالباسورد، وكيس للشهادات، وفي الآخر MAC بيتحسب بالباسورد عشان يتأكد إن الملف متعدّلش. عشان كده الباسورد الغلط بيطلّع [[Mac verify error]] قبل أي حاجة.`,
            when: R`توقيع تطبيقات Android و iOS، وشهادات HTTPS على ويندوز و Azure و Java servers، والـ client certificates.`,
            mistakes: R`تعمل commit لـ [[upload-keystore.jks]] أو [[key.properties]]. تضيّع الـ keystore وتكتشف وقت أول تحديث. تستخدم [[changeit]] في الحقيقي. وتحط الـ keystore في الـ repo «مؤقتًا» عشان CI يشتغل بدل ما تحطه secret.`
          },
          teach: R`## الفكرة في سطرين

المثال بياخد المفتاح والشهادة بتوع درس [[.pem]] ويحطهم في ملف [[.p12]] واحد محمي بباسورد، ويوريك إن الباسورد الغلط بيتقفل في وشه. وبعدين يعمل keystore توقيع زي اللي Android بيطلبه بأداة Java اسمها [[keytool]]، ويقرا اللي جواه، ويحوّله نص Base64 عشان يتحط secret في CI.

الأوامر اتشغّلت على أوبونتو 24.04 (جوه Docker، OpenSSL 3.0.13 و OpenJDK 21)، وجزء القراية على ويندوز بـ [[certutil]] و PowerShell. اشتغل في فولدر تجربة، والباسورد [[changeit]] للتجربة بس.

---

## ١. نعمل [[.p12]] من PEM

~~~bash
openssl pkcs12 -export -inkey server.key -in server.crt -out server.p12 -passout pass:changeit -name gym
~~~

| الحتة | معناها |
|---|---|
| [[pkcs12]] | الأمر الفرعي بتاع صيغة PKCS#12 (اسم المعيار رقم 12 من سلسلة PKCS = Public-Key Cryptography Standards) |
| [[-export]] | اعمل ملف p12 جديد (من غيرها بيقرا p12 موجود) |
| [[-inkey server.key]] | المفتاح الخاص اللي هيدخل |
| [[-in server.crt]] | الشهادة اللي هتدخل معاه |
| [[-out server.p12]] | الملف الناتج |
| [[-passout pass:changeit]] | باسورد الملف الناتج. [[pass:]] يعني الباسورد مكتوب هنا على طول من غير ما يسألك |
| [[-name gym]] | اسم للـ entry جوه الملف (اسمه friendly name أو alias) |

مبيطبعش حاجة لو نجح. وزي ما هتشوف تحت، الملف اتعمل بصلاحيات [[-rw-------]] (2570 byte).

> [[pass:changeit]] على سطر الأوامر بيتسجل في الـ history. في الحقيقي استخدم [[-passout env:P12_PASS]] (من متغير بيئة) أو سيبه يسألك.

---

## ٢. [[file server.p12]]

~~~text الناتج
server.p12: data
~~~

[[data]] يعني «bytes ومعرفتش هي إيه». ليه؟ نبص على أوله:

~~~text xxd -l 4 server.p12
00000000: 3082 0a06                                0...
~~~

[[30 82]] زي DER بالظبط: الملف ASN.1 binary، بس مفيش فيه بصمة خاصة بيه تفرّقه عن أي DER تاني، فـ [[file]] بيستسلم.

---

## ٣. باسورد غلط

~~~bash
openssl pkcs12 -in server.p12 -passin pass:wrong -nokeys
~~~

- [[-in server.p12]]: اقرا الملف ده (من غير [[-export]] يبقى قراية).
- [[-passin pass:wrong]]: باسورد الدخل، وغلط عن قصد.
- [[-nokeys]]: طلّع الشهادات بس من غير المفتاح الخاص.

~~~text الناتج
Mac verify error: invalid password?
~~~

والـ exit code طلع 1. [[MAC]] هنا مش Mac الجهاز: ده Message Authentication Code، رقم في آخر الملف محسوب من الباسورد ومن كل محتوى الملف. openssl بيحسبه تاني بالباسورد اللي انت كتبته، ولو مطلعش زيه يبقى الباسورد غلط (أو الملف اتعدّل).

### بالباسورد الصح

~~~bash
openssl pkcs12 -in server.p12 -passin pass:changeit -nokeys
~~~

~~~text أول الناتج
Bag Attributes
    friendlyName: gym
    localKeyID: F9 60 1C B0 CE F2 E6 AC 84 00 B5 2B BB 70 21 CC 17 A5 27 72
subject=CN = gym.local
issuer=CN = gym.local
-----BEGIN CERTIFICATE-----
...
~~~

[[Bag Attributes]] بيانات الكيس (bag) اللي فيه الشهادة: [[friendlyName]] هو الـ [[-name gym]] بتاعنا، و [[localKeyID]] رقم بيربط الشهادة بالمفتاح بتاعها جوه نفس الملف. وبعدها الشهادة نفسها PEM. ولو عايز تشوف الملف متقسّم إزاي من غير ما تطلّع حاجة:

~~~bash
openssl pkcs12 -in server.p12 -passin pass:changeit -info -noout
~~~

~~~text الناتج
MAC: sha256, Iteration 2048
MAC length: 32, salt length: 8
PKCS7 Encrypted data: PBES2, PBKDF2, AES-256-CBC, Iteration 2048, PRF hmacWithSHA256
Certificate bag
PKCS7 Data
Shrouded Keybag: PBES2, PBKDF2, AES-256-CBC, Iteration 2048, PRF hmacWithSHA256
~~~

يعني: [[Certificate bag]] كيس الشهادة، و [[Shrouded Keybag]] كيس المفتاح الخاص «المتغطي» يعني متشفّر بـ AES-256 بمفتاح طالع من الباسورد (PBKDF2 بيلف على الباسورد 2048 مرة عشان التخمين يبقى أبطأ). وفوق الكل الـ MAC.

### نفس الكلام على ويندوز

ويندوز بيقرا p12 من غير openssl، بـ [[certutil]] (قراية بس، من غير ما يسطّب حاجة):

~~~cmd
certutil -p changeit -dump server.p12
~~~

~~~text جزء من الناتج (ويندوز 11)
Serial Number: 2be6956105a56d618788da739023107fc3013039
Issuer: CN=gym.local
 NotBefore: 10/7/2026 2:59 PM
 NotAfter: 10/7/2027 2:59 PM
Subject: CN=gym.local
Signature matches Public Key
Root Certificate: Subject matches Issuer
Cert Hash(sha1): f9601cb0cef2e6ac8400b52bbb7021cc17a52772
...
CertUtil: -dump command completed successfully.
~~~

[[-p]] الباسورد و [[-dump]] اعرض المحتوى. لاحظ إن [[Cert Hash(sha1)]] هو نفس رقم [[localKeyID]] اللي openssl طلّعه: openssl بيستخدم بصمة SHA-1 للشهادة كـ ID. ولو الباسورد غلط:

~~~text الناتج
CertUtil: -dump command FAILED: 0x80070056 (WIN32: 86 ERROR_INVALID_PASSWORD)
~~~

> متعملش دبل كليك على الـ p12 ولا [[certutil -importpfx]] للتجربة: دول بيسطّبوا الشهادة في مخزن ويندوز.

---

## ٤. keystore للتوقيع بـ [[keytool]]

~~~bash
keytool -genkeypair -alias upload -keyalg RSA -keysize 2048 -validity 10000 -keystore upload-keystore.jks -storepass changeit -dname "CN=Gym, O=Gym, C=EG"
~~~

[[keytool]] بييجي مع أي JDK (Java Development Kit). نفك الخيارات:

| الحتة | معناها |
|---|---|
| [[-genkeypair]] | اعمل زوج مفاتيح (خاص وعام) وشهادة self-signed ليهم |
| [[-alias upload]] | اسم الـ entry. Flutter و Android بيسموه [[upload]] عشان ده «مفتاح الرفع» لـ Google Play |
| [[-keyalg RSA]] | نوع المفتاح |
| [[-keysize 2048]] | طوله بالـ bit |
| [[-validity 10000]] | صالح 10000 يوم (حوالي 27 سنة). وثائق Android بتقول المفتاح لازم يفضل صالح ٢٥ سنة على الأقل، فبنحط رقم كبير |
| [[-keystore upload-keystore.jks]] | الملف اللي هيتحفظ فيه |
| [[-storepass changeit]] | باسورد الملف |
| [[-dname "CN=Gym, O=Gym, C=EG"]] | Distinguished Name: بيانات صاحب الشهادة: الاسم والمنظمة والدولة |

~~~text الناتج
Generating 2,048 bit RSA key pair and self-signed certificate (SHA384withRSA) with a validity of 10,000 days
	for: CN=Gym, O=Gym, C=EG
~~~

[[SHA384withRSA]] هي الطريقة اللي الشهادة اتمضت بيها.

---

## ٥. نقرا الـ keystore: [[keytool -list]]

~~~bash
keytool -list -keystore upload-keystore.jks -storepass changeit
~~~

~~~text الناتج
Keystore type: PKCS12
Keystore provider: SUN

Your keystore contains 1 entry

upload, Oct 7, 2026, PrivateKeyEntry,
Certificate fingerprint (SHA-256): FD:92:65:EB:B8:B1:F0:EA:48:7B:79:5D:24:7D:3B:2C:04:B6:48:AB:4B:96:7A:88:48:49:44:FE:77:59:61:54
~~~

| السطر | معناه |
|---|---|
| [[Keystore type: PKCS12]] | الملف اسمه [[.jks]] بس نوعه الحقيقي PKCS#12، نفس [[server.p12]]. ده الافتراضي من Java 9 |
| [[Keystore provider: SUN]] | الجزء من Java اللي قرا الملف |
| [[upload]] | الـ alias |
| [[PrivateKeyEntry]] | الـ entry فيه مفتاح خاص (مش شهادة لوحدها) |
| [[Certificate fingerprint (SHA-256)]] | بصمة الشهادة. دي اللي Google Play و Firebase بيطلبوها منك (SHA-256 و SHA-1) |

والدليل إنه PKCS#12 من أوله:

~~~text xxd -l 4 upload-keystore.jks
00000000: 3082 0a24                                0..$
~~~

نفس [[30 82]] بتاعة [[server.p12]]، و [[file]] قال عليه [[data]] برضه. ملف JKS القديم الحقيقي كان بيبدأ بـ [[FE ED FE ED]].

---

## ٦. Base64 عشان CI: [[base64 -w0 upload-keystore.jks | head -c 40]]

- [[base64]]: يحوّل أي bytes لحروف عادية (A-Z و a-z و 0-9 و [[+]] و [[/]])، عشان تقدر تلزقها في خانة نص زي GitHub secret.
- [[-w0]]: wrap 0، يعني متكسرش الناتج سطور (من غيرها بيكسر كل 76 حرف).
- [[| head -c 40]]: اطبع أول 40 حرف بس (عشان العرض، في الحقيقي بتاخده كله).

~~~text الناتج
MIIKJAIBAzCCCc4GCSqGSIb3DQEHAaCCCb8Eggm7
~~~

[[MII]] في الأول هي [[30 82]] بالـ Base64، فأي مفتاح أو شهادة أو keystore بالـ Base64 هيبدأ تقريبًا كده. وفي الـ workflow بترجّعه ملف بـ [[base64 -d]] (decode)، وجرّبنا إن الملف الراجع زي الأصلي بالظبط بـ [[cmp]].

على ويندوز مفيش [[base64]] في PowerShell، فبنستخدم .NET:

~~~powershell
[Convert]::ToBase64String([IO.File]::ReadAllBytes("$PWD\upload-keystore.jks"))
~~~

[[ReadAllBytes]] بيقرا الملف bytes، و [[ToBase64String]] يحوّلها. [[$PWD]] الفولدر الحالي (لازم مسار كامل لأن .NET مش شايف الفولدر اللي PowerShell واقف فيه). طلّع نفس الـ 40 حرف في PowerShell 7 و 5.1.

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[openssl pkcs12 -export ...]] | مفتاح + شهادة PEM ← ملف p12 بباسورد |
| [[openssl pkcs12 -in ... -nokeys]] | يقرا الشهادات من p12 (والباسورد الغلط = [[Mac verify error]]) |
| [[certutil -p ... -dump]] | نفس القراية على ويندوز |
| [[keytool -genkeypair ...]] | keystore توقيع Android |
| [[keytool -list]] | اللي جواه ونوعه الحقيقي |
| [[base64 -w0]] | يحوّله نص لـ GitHub secret |

~~~text
.p12 / .pfx        PKCS#12: مفتاح + شهادات في ملف واحد بباسورد
.jks / .keystore   Java، ومن Java 9 هو كمان PKCS#12 جوه
الاتنين            سر، backup في مكان آمن، وبره Git
~~~`,
          lines: [
            R`بيجمع المفتاح والشهادة في [[.p12]] واحد محمي بباسورد.`,
            R`[[file]] مبيعرفوش: binary من غير بصمة واضحة.`,
            R`باسورد غلط: بيرفض.`,
            R`بيعمل keystore للتوقيع (زي اللي Flutter و Android بيطلبوه) فيه مفتاح RSA صالح ١٠٠٠٠ يوم.`,
            R`يعرض اللي جواه ونوعه الحقيقي.`,
            R`يحوّله نص Base64 عشان يتحط في GitHub secret.`
          ],
          sol: R`الناتج الحقيقي:
[[server.p12: data]]
[[Mac verify error: invalid password?]]
[[Generating 2,048 bit RSA key pair and self-signed certificate (SHA384withRSA) with a validity of 10,000 days]]
[[	for: CN=Gym, O=Gym, C=EG]]
و [[keytool -list]]:
[[Keystore type: PKCS12]]
[[Your keystore contains 1 entry]]
[[upload, Oct 1, 2026, PrivateKeyEntry,]]
[[Certificate fingerprint (SHA-256): A0:0B:03:E4:...]]
يعني الملف اسمه [[.jks]] بس نوعه الحقيقي PKCS#12 (و [[xxd -l 4]] بيطبع [[3082 0a24]]).
وآخر أمر بيطبع أول ٤٠ حرف من نص Base64 (بيبدأ بـ [[MII]]، وده شكل أي ASN.1 بالـ Base64).`
        }
      ]
    },
    {
      t: "MIME و magic bytes: الملف بيقول على نفسه إيه",
      l: 3,
      n: "الويب مش بيعرف الامتداد: بيعرف Content-Type. والملف نفسه فيه بصمة في أوله بتقول هو إيه. وده بيوصّلنا لأهم درس أمان في التاب: الامتداد ممكن يكدب",
      items: [
        {
          cmd: "MIME type",
          title: "يعني إيه MIME type و Content-Type، وليه السيرفر لازم يبعته صح؟",
          desc: R`MIME type (أو media type) اسم معياري لنوع الملف، شكله [[type/subtype]]:
• [[text/html]] و [[text/css]] و [[text/javascript]] و [[text/plain]] و [[text/csv]].
• [[application/json]] و [[application/xml]] و [[application/pdf]] و [[application/zip]] و [[application/wasm]].
• [[image/png]] و [[image/jpeg]] و [[image/webp]] و [[image/avif]] و [[image/svg+xml]] و [[image/x-icon]].
• [[video/mp4]] و [[video/webm]] و [[audio/mpeg]] و [[font/woff2]].
• [[application/octet-stream]]: «bytes ومعرفش هي إيه». المتصفح بينزّلها كملف بدل ما يعرضها.
• [[multipart/form-data]]: فورم فيها ملفات مرفوعة.
• [[+]] يعني «مبني على»: [[image/svg+xml]] صورة بصيغة XML، و [[application/ld+json]].
• وممكن بعده [[; charset=utf-8]] للنصوص.

فين بتشوفه:
• في HTTP: كل رد من السيرفر فيه header [[Content-Type]] بيقول للمتصفح يعامل الـ bytes إزاي. المتصفح مبيبصش على الامتداد في الرابط خالص: نفس الرابط [[/api/users]] من غير امتداد بيرجع [[application/json]].
• في الطلب: لما تبعت JSON لـ API لازم [[Content-Type: application/json]]، وإلا Express مثلًا ([[express.json()]]) يتجاهل الـ body فيطلع [[req.body]] فاضي.
• [[Accept]] header: العميل بيقول بيقبل أنهي أنواع.
• في الإيميل (هو أصلًا اتعمل للإيميل، MIME = Multipurpose Internet Mail Extensions) و [[<input type="file" accept="image/*">]] و [[<source type="video/webm">]].

مين بيحدده؟ السيرفر، غالبًا من الامتداد: Nginx عنده ملف [[/etc/nginx/mime.types]]، و Express و [[python -m http.server]] عندهم جداول. ولو الامتداد مش في الجدول، Nginx بيبعت [[default_type]] (غالبًا [[application/octet-stream]]).

مشاكل مشهورة بسبب Content-Type غلط:
• [[Failed to load module script: Expected a JavaScript module script but the server responded with a MIME type of "text/html"]]: الملف مش موجود، والسيرفر (SPA بـ [[try_files ... /index.html]]) رجّع [[index.html]] بدله. أو [[.mjs]] مش متعرّف في Nginx.
• [[Refused to apply style ... because its MIME type ('text/html') is not a supported stylesheet MIME type]]: نفس الحكاية مع CSS.
• [[.wasm]] لازم [[application/wasm]]، و SVG لازم [[image/svg+xml]] وإلا مش هيتعرض كصورة.
• [[X-Content-Type-Options: nosniff]]: header بيقول للمتصفح «صدّق الـ Content-Type ومتخمّنش من المحتوى». مهم للأمان (عشان ملف رفعه يوزر ميتنفّذش كـ script).`,
          example: R`curl -sI http://localhost:8000/app.js | grep -i content-type
curl -sI http://localhost:8000/missing.js | grep -i -E "^HTTP|content-type"
curl -sI https://github.com | grep -i -E "content-type|nosniff"
file --mime-type -b logo.svg camera.webp add.wasm
python3 -c "import mimetypes; print(mimetypes.guess_type('a.webp'))"
grep -E ' (js|mjs|wasm|svg)[ ;]' /etc/nginx/mime.types`,
          try: R`في فولدر فيه ملفات من الدروس اللي فاتت (html و js و json و svg و webp و wasm)، شغّل [[python3 -m http.server 8000]]، ومن ترمنال تاني اعمل [[curl -sI]] لكل ملف وقارن الـ Content-Type. وفي المتصفح افتح [[F12]] ثم Network وافتح أي موقع، ودوس على أي طلب وشوف [[Content-Type]] في Response Headers. وبعدين حل التمرين.`,
          deep: {
            why: R`الرابط ممكن ميكونش فيه امتداد خالص ([[/api/users]] أو [[/image?id=5]])، وممكن يكون فيه امتداد كداب. فالويب اتفق إن السيرفر يقول صراحة «اللي بعتهولك ده نوعه كذا» في header، والمتصفح يتصرف على حسبه: يعرضه، أو ينفّذه، أو ينزّله.`,
            how: R`Nginx وهو بيبعت ملف ثابت بياخد الامتداد ويدوّر عليه في جدول [[types]] (اللي جاي من [[mime.types]])، ويحط النتيجة في [[Content-Type]]. وفي الـ API انت (أو الإطار) اللي بتحدده: [[res.json()]] في Express بيحط [[application/json; charset=utf-8]] لوحده. والمتصفح زمان كان بيعمل «sniffing» يخمّن من المحتوى، وده كان بيعمل ثغرات، فدلوقتي مع [[nosniff]] بيلتزم بالـ header.`,
            when: R`لما ملف مش بيظهر أو script مش بيشتغل وفي الـ Console رسالة MIME، ولما تكتب API (ابعت النوع الصح، واقبل الطلبات بالنوع الصح)، ولما تظبط Nginx أو S3 أو CDN.`,
            mistakes: R`تبعت JSON من [[fetch]] من غير [[headers: { "Content-Type": "application/json" }]] فالسيرفر يشوف body فاضي. ترفع ملفات على S3 من غير Content-Type فتتنزّل بدل ما تتعرض. تثق في الـ Content-Type اللي العميل باعته مع ملف مرفوع (العميل يقدر يكتب أي حاجة، درس «الامتداد بيكدب»). وتنسى [[.mjs]] أو [[.wasm]] في إعدادات السيرفر.`
          },
          teach: R`## الفكرة في سطرين

المثال بيسأل نفس السؤال من ٤ أماكن: «الملف ده نوعه إيه؟». مرة من **السيرفر** (الـ header اللي بيبعته)، ومرة من **المحتوى** ([[file]])، ومرة من **جدول الامتدادات** بتاع Python، ومرة من جدول Nginx. وهتشوف إنهم مش دايمًا بيتفقوا.

الأوامر اتشغّلت على أوبونتو 24.04 (جوه Docker، Python 3.12.3 و file 5.45) في فولدر فيه [[app.js]] و [[logo.svg]] و [[camera.webp]] و [[add.wasm]]، وجدول Nginx من الـ image الرسمية [[nginx:alpine]] (nginx 1.31.6). وقبل أول سطر لازم سيرفر شغال في ترمنال تاني:

~~~bash
python3 -m http.server 8000
~~~

ده سيرفر ملفات بسيط جاي مع Python: بيعرض الفولدر الحالي على [[http://localhost:8000]].

---

## ١. السيرفر بيقول إيه: [[curl -sI http://localhost:8000/app.js | grep -i content-type]]

| الحتة | معناها |
|---|---|
| [[curl]] | أداة بتعمل طلب HTTP من الترمنال |
| [[-s]] | silent: من غير شريط التحميل |
| [[-I]] | اطلب الـ headers بس (طلب HEAD)، من غير محتوى الملف |
| [[| grep -i content-type]] | من كل الـ headers هات السطر اللي فيه content-type، و [[-i]] يعني متفرّقش بين الحروف الكبيرة والصغيرة |

الرد كامل من غير [[grep]] شكله كده:

~~~text curl -sI http://localhost:8000/app.js
HTTP/1.0 200 OK
Server: SimpleHTTP/0.6 Python/3.12.3
Date: Wed, 07 Oct 2026 12:08:13 GMT
Content-type: text/javascript
Content-Length: 19
Last-Modified: Wed, 07 Oct 2026 12:08:12 GMT
~~~

وبعد [[grep]]:

~~~text الناتج
Content-type: text/javascript
~~~

[[text/javascript]] شكله [[type/subtype]]: النوع الكبير [[text]] (نص)، والنوع الصغير [[javascript]]. والسيرفر طلّعه من الامتداد [[.js]]. اسم الـ header مكتوب [[Content-type]] بحرف صغير، وده عادي: أسامي الـ headers في HTTP مش حساسة لحالة الحروف، وعشان كده احتجنا [[-i]].

---

## ٢. ملف مش موجود

~~~bash
curl -sI http://localhost:8000/missing.js | grep -i -E "^HTTP|content-type"
~~~

[[-E]] يعني regex موسّع، فـ [[|]] جوه التنصيص معناها «أو»: هات السطر اللي بيبدأ بـ [[HTTP]] ([[^]] = أول السطر) أو اللي فيه content-type.

~~~text الناتج
HTTP/1.0 404 File not found
Content-Type: text/html;charset=utf-8
~~~

الملف مش موجود، فالسيرفر رجّع **صفحة HTML** فيها رسالة الغلط، ونوعها [[text/html]]. تخيل إن الصفحة دي فيها [[<script type="module" src="missing.js">]]: المتصفح هيستلم HTML بدل JavaScript ويقولك [[Expected a JavaScript module script but the server responded with a MIME type of "text/html"]]. يعني الغلط ده معناه غالبًا «المسار غلط»، مش «النوع غلط».

---

## ٣. موقع حقيقي

~~~bash
curl -sI https://github.com | grep -i -E "content-type|nosniff"
~~~

~~~text الناتج
content-type: text/html; charset=utf-8
x-content-type-options: nosniff
~~~

- [[; charset=utf-8]]: معلومة زيادة بعد النوع: الحروف مكتوبة بـ UTF-8.
- [[x-content-type-options: nosniff]]: GitHub بيقول للمتصفح «صدّق الـ content-type ومتخمّنش من المحتوى». [[sniff]] يعني «يشم»، يعني يخمّن.

على ويندوز في PowerShell، [[curl.exe]] موجود جاهز، و [[Select-String]] بدل [[grep]]:

~~~powershell
curl.exe -sI https://github.com | Select-String -Pattern "content-type|nosniff"
~~~

~~~text الناتج (PowerShell 7)
Content-Type: text/html; charset=utf-8
X-Content-Type-Options: nosniff
~~~

نفس المعلومة، و GitHub رجّع الأسامي بحروف كبيرة المرة دي (curl بتاع ويندوز اتكلم HTTP/1.1، و HTTP/2 بيبعتها بحروف صغيرة دايمًا). [[Select-String]] مش حساس للحروف من الأول. واكتب [[curl.exe]] مش [[curl]]: في Windows PowerShell 5.1 كلمة [[curl]] لوحدها اسم تاني لـ [[Invoke-WebRequest]].

---

## ٤. المحتوى بيقول إيه: [[file --mime-type -b logo.svg camera.webp add.wasm]]

- [[--mime-type]]: اطبع الـ MIME type بدل الوصف الطويل.
- [[-b]]: brief: من غير اسم الملف في الأول.

~~~text الناتج
image/svg+xml
image/webp
application/wasm
~~~

[[file]] مبيبصش على الامتداد خالص، بيقرا أول bytes في الملف (الدرس الجاي). [[+xml]] في [[image/svg+xml]] معناها «صورة مكتوبة بصيغة XML». و [[add.wasm]] هنا 8 bytes بس ([[\0asm]] ورقم النسخة)، وده كفاية إن [[file]] يعرفه.

---

## ٥. جدول Python: [[python3 -c "import mimetypes; print(mimetypes.guess_type('a.webp'))"]]

- [[-c]]: نفّذ الكود ده على طول من غير ملف.
- [[mimetypes]]: مكتبة جاية مع Python فيها جدول امتداد ← نوع. دي اللي [[http.server]] بيستخدمها.
- [[guess_type('a.webp')]]: «خمّن» من الاسم بس. الملف مش لازم يكون موجود أصلًا.

~~~text الناتج
('image/webp', None)
~~~

بيرجع حاجتين: النوع، والـ encoding (لو الاسم [[a.webp.gz]] كان هيقول [[gzip]] هنا). [[None]] يعني مفيش. وجرّبنا [[app.js]] و [[a.mjs]] الاتنين طلعوا [[text/javascript]]، على أوبونتو وعلى ويندوز (Python 3.14).

---

## ٦. جدول Nginx

~~~bash
grep -E ' (js|mjs|wasm|svg)[ ;]' /etc/nginx/mime.types
~~~

الـ regex: مسافة، وبعدها واحد من الأربع امتدادات ([[(js|mjs|wasm|svg)]])، وبعده مسافة أو [[;]] ([[[ ;]]] يعني «حرف من دول»). ليه مش [[;]] بس؟ لأن سطر SVG مكتوب فيه امتدادين [[svg svgz;]]، فـ [[svg]] بعدها مسافة مش [[;]].

~~~text الناتج (nginx:alpine)
    application/javascript                           js;
    image/svg+xml                                    svg svgz;
    application/wasm                                 wasm;
~~~

كل سطر: النوع، وبعده الامتدادات اللي ليه. ولاحظ اللي **مش موجود**: [[mjs]]. يعني Nginx بالجدول ده هيبعت ملف [[.mjs]] بـ [[default_type]] (غالبًا [[application/octet-stream]])، والمتصفح هيرفض يشغّله كـ module. وكمان Nginx لسه بيقول [[application/javascript]] لـ [[.js]] و Python بيقول [[text/javascript]]، والاتنين المتصفح بيقبلهم (المعيار الحالي [[text/javascript]]).

---

## مين قال إيه

| المصدر | بيعتمد على | app.js | logo.svg |
|---|---|---|---|
| [[http.server]] (header) | الامتداد (جدول Python) | [[text/javascript]] | [[image/svg+xml]] |
| [[file --mime-type]] | المحتوى | [[text/plain]] (مفيش بصمة لـ JS) | [[image/svg+xml]] |
| [[mimetypes.guess_type]] | الاسم بس | [[text/javascript]] | [[image/svg+xml]] |
| Nginx [[mime.types]] | الامتداد (جدول Nginx) | [[application/javascript]] | [[image/svg+xml]] |

والمتصفح بيصدّق **الـ header** بس.

---

## عن التمرين

التمرين بيطلب منك تعمل جدول زي جدول Nginx بنفسك. فكّر في ٣ حاجات قبل ما تكتب: الامتداد هو اللي **بعد آخر نقطة** (مش أول نقطة، عشان [[app.min.js]])، والحروف الكبيرة ([[.JPEG]])، والأسامي اللي ملهاش امتداد أو بتبدأ بنقطة ([[Makefile]] و [[.env]]). والنصوص بس هي اللي ليها charset.

---

## الخلاصة

~~~text
MIME type        type/subtype، زي text/html و image/png
Content-Type     الـ header اللي فيه الـ MIME type، والمتصفح بيصدّقه هو بس
octet-stream     «bytes ومعرفش هي إيه»: المتصفح بينزّلها
nosniff          متخمّنش من المحتوى
404 بـ text/html  سبب أشهر غلط MIME مع scripts
~~~`,
          lines: [
            R`الـ header اللي python http.server بعته للـ JS.`,
            R`ملف مش موجود: 404 والنوع HTML (صفحة الغلط)، وده اللي بيعمل غلط «MIME type text/html» لو كان script.`,
            R`موقع حقيقي: النوع ومعاه [[nosniff]].`,
            R`[[file]] بيطلّع MIME من المحتوى (مش من السيرفر).`,
            R`جدول Python من الامتداد.`,
            R`جدول Nginx: لاحظ مين موجود ومين لأ.`
          ],
          sol: R`الناتج الحقيقي ([[python3 -m http.server]] في Python 3.12):
[[Content-type: text/javascript]]
[[HTTP/1.0 404 File not found]] و [[Content-Type: text/html;charset=utf-8]]
[[content-type: text/html; charset=utf-8]] و [[x-content-type-options: nosniff]]
[[image/svg+xml]] و [[image/webp]] و [[application/wasm]]
[[('image/webp', None)]]
وفي Nginx (الـ image الرسمية):
[[application/javascript js;]] و [[image/svg+xml svg svgz;]] و [[application/wasm wasm;]]، ومفيش [[mjs]]! يعني ملف [[.mjs]] على Nginx بالإعدادات دي بيتبعت [[application/octet-stream]] والمتصفح يرفض يشغّله كـ module. الحل: ضيف [[types { application/javascript mjs; }]] أو سمّيه [[.js]].

وفي Python الجدول فيه [[.json]] ← [[application/json]] و [[.svg]] ← [[image/svg+xml]] و [[.wasm]] ← [[application/wasm]] كلهم.`,
          check: {
            lang: "js",
            starter: R`// contentTypeFor: رجّع الـ Content-Type المناسب لاسم الملف
// html و css و js و mjs و json و svg و png و jpg و jpeg و webp و wasm و woff2 و pdf
// النصوص (html و css و js و mjs و json) يتضاف لها "; charset=utf-8"
// أي امتداد مش معروف (أو من غير امتداد) ← "application/octet-stream"
function contentTypeFor(name) {
  const ext = name.split(".")[1];
  if (ext === "html") return "text/html";
  return "application/octet-stream";
}`,
            tests: R`test("index.html", () => expect(contentTypeFor("index.html")).toBe("text/html; charset=utf-8"));
test("app.min.js و app.mjs (آخر امتداد بس)", () => expect([contentTypeFor("app.min.js"), contentTypeFor("app.mjs")]).toEqual(["text/javascript; charset=utf-8", "text/javascript; charset=utf-8"]));
test("data.json و style.css", () => expect([contentTypeFor("data.json"), contentTypeFor("style.css")]).toEqual(["application/json; charset=utf-8", "text/css; charset=utf-8"]));
test("الصور من غير charset", () => expect(["logo.svg", "a.png", "b.jpg", "c.JPEG", "d.webp"].map(contentTypeFor)).toEqual(["image/svg+xml", "image/png", "image/jpeg", "image/jpeg", "image/webp"]));
test("wasm و woff2 و pdf", () => expect(["add.wasm", "cairo.woff2", "report.pdf"].map(contentTypeFor)).toEqual(["application/wasm", "font/woff2", "application/pdf"]));
test("مش معروف أو من غير امتداد أو dotfile", () => expect(["backup.tar.zst", "Makefile", ".env"].map(contentTypeFor)).toEqual(["application/octet-stream", "application/octet-stream", "application/octet-stream"]));`,
            solution: R`function contentTypeFor(name) {
  const types = {
    html: "text/html", css: "text/css", js: "text/javascript", mjs: "text/javascript", json: "application/json",
    svg: "image/svg+xml", png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", webp: "image/webp",
    wasm: "application/wasm", woff2: "font/woff2", pdf: "application/pdf"
  };
  const dot = name.lastIndexOf(".");
  if (dot <= 0) return "application/octet-stream";
  const type = types[name.slice(dot + 1).toLowerCase()];
  if (!type) return "application/octet-stream";
  return ["html", "css", "js", "mjs", "json"].includes(name.slice(dot + 1).toLowerCase()) ? type + "; charset=utf-8" : type;
}`
          }
        },
        {
          cmd: "magic bytes",
          title: "إيه الـ magic bytes، وإزاي تعرف نوع أي ملف من أول كام byte فيه؟",
          desc: R`أغلب صيغ الملفات الـ binary بتبدأ بـ bytes ثابتة اسمها magic bytes أو file signature، زي البصمة. البرامج بتشيك عليها قبل ما تقرا الملف، و [[file]] شغله كله إنه يقارنها بقاعدة بيانات فيها آلاف البصمات.

أشهر البصمات (بالـ hex، وبين قوسين اللي بيبان كحروف):
• PNG: [[89 50 4E 47 0D 0A 1A 0A]] ([[.PNG....]])
• JPEG: [[FF D8 FF]]
• GIF: [[47 49 46 38]] ([[GIF8]])
• WebP: [[52 49 46 46]] ([[RIFF]]) وبعد ٤ bytes [[57 45 42 50]] ([[WEBP]])
• PDF: [[25 50 44 46]] ([[%PDF]])
• ZIP (و docx و xlsx و jar و apk): [[50 4B 03 04]] ([[PK..]])
• gzip: [[1F 8B]]، و 7z: [[37 7A BC AF 27 1C]]، و xz: [[FD 37 7A 58 5A 00]]
• برامج ويندوز ([[.exe]] و [[.dll]]): [[4D 5A]] ([[MZ]])
• برامج لينكس (ELF): [[7F 45 4C 46]] ([[.ELF]])
• Java class: [[CA FE BA BE]]
• WebAssembly: [[00 61 73 6D]] ([[.asm]])
• SQLite: [[53 51 4C 69 74 65 20 66 6F 72 6D 61 74 20 33 00]] ([[SQLite format 3.]])
• UTF-8 BOM: [[EF BB BF]] (درس UTF-8)
• الملفات النصية (JSON و CSV و الكود) ملهاش بصمة: [[file]] بيخمّن من المحتوى ([[{]] في الأول؟ [[<?xml]]؟ [[#!]]؟).

بتقراها إزاي:
• [[xxd -l 16 file]] أو [[head -c 16 file | xxd]] (لينكس والماك و Git Bash).
• [[Format-Hex file | Select-Object -First 1]] في PowerShell.
• [[file file]] و [[file --mime-type -b file]].
• في الكود: اقرا أول bytes كـ [[Uint8Array]] (في المتصفح [[await file.slice(0, 16).arrayBuffer()]]، وفي Node [[fs.readFileSync]] أو مكتبة [[file-type]]) وقارن.

ليه مهم: عشان تعرف الملف بجد إيه مهما كان اسمه، ودي الطريقة الصح تتأكد بيها من ملفات اليوزرز المرفوعة (الدرس الجاي).`,
          example: R`xxd -l 8 camera.png
xxd -l 4 camera.jpg
xxd -l 12 camera.webp
xxd -l 4 project.zip
xxd -l 4 gym.db
file --mime-type -b camera.png project.zip gym.db report.docx`,
          try: R`اجمع الملفات اللي عملتها في التاب (png و jpg و webp و zip و pdf و wasm و db و docx و exe) في فولدر ونفّذ [[xxd -l 16]] على كل واحد، واكتب البصمات بإيدك في جدول. بعدين اعمل ملف نصي وسمّيه [[fake.png]] وجرّب [[file]]. وحل التمرين: دالة بتطلّع النوع من الـ bytes.`,
          deep: {
            why: R`الاسم بيتغير بسهولة، بس محتوى الملف لازم يمشي على قواعد الصيغة عشان البرنامج يقدر يقراه. فأحسن طريقة تعرف الملف إيه هي إنك تقرا أوله. وكمان البصمات بتحمي من فتح ملف بالبرنامج الغلط (PNG فيه [[\r\n]] و [[\n]] في البصمة عن قصد: لو حد نقله كنص وغيّر نهايات السطور، البصمة هتبوظ وتعرف إن الملف اتبوظ).`,
            how: R`[[file]] بيقرا قاعدة البيانات بتاعته ([[/usr/share/misc/magic]] وأخواتها)، وكل قاعدة فيها «في المكان ده، لو الـ bytes كذا، يبقى النوع كذا»، وبعضها بيقرا أعمق (المقاس في PNG، أو هل الـ zip ده جواه [[word/]] يبقى docx). ولو مفيش بصمة بيجرّب: هل كل الـ bytes حروف UTF-8؟ يبقى text، وبعدين يدوّر على علامات (HTML، shebang، JSON...).`,
            when: R`لما ملف ميتفتحش أو مش عارف هو إيه، ولما تكتب كود بيقبل رفع ملفات، ولما تستعيد ملفات من هارد بايظ (أدوات الاستعادة بتدوّر على البصمات).`,
            mistakes: R`تتأكد من نوع الملف المرفوع بالامتداد أو بـ [[file.type]] اللي المتصفح باعته (الاتنين من العميل ويتزوروا). تقرا البصمة من غير ما تتأكد إن الملف طوله كفاية. وتنسى إن docx و xlsx و jar و apk كلهم بيبدأوا بـ [[PK]] زي zip، فالبصمة لوحدها بتقول «zip» بس.`
          },
          teach: R`## الفكرة في سطرين

المثال بيقرا **أول كام byte** من كل ملف ويطبعهم بالـ hex، فتشوف البصمة بعينك. وفي الآخر [[file]] بيعمل نفس المقارنة لوحده ويطلّع الـ MIME type.

الأوامر اتشغّلت على أوبونتو 24.04 (جوه Docker، file 5.45) على ملفات اتعملت للتجربة: صورة 640x480 بـ ImageMagick حفظناها PNG و JPG و WebP، وفولدر صغير اتضغط zip، وقاعدة SQLite فيها جدول واحد، و docx صغير. وجزء ويندوز اتشغّل في PowerShell 7 و 5.1.

---

## الأداة: [[xxd]]

[[xxd]] بيحوّل أي ملف لـ **hex dump**: كل byte بيتكتب رقمين hex (من [[00]] لـ [[ff]]). و [[-l 8]] يعني length: اقرا أول 8 bytes بس. الناتج كل سطر فيه ٣ أعمدة:

~~~text مثال
00000000: 8950 4e47 0d0a 1a0a                      .PNG....
~~~

- **offset**: مكان أول byte في السطر من أول الملف (بالـ hex). هنا [[00000000]] = من الأول خالص.
- **الـ hex**: [[89]] byte، و [[50]] byte، وهكذا. [[xxd]] بيحطهم اتنين اتنين عشان القراية بس.
- **الحروف**: لو الـ byte حرف ASCII يتطبع بيتكتب، ولو لأ بتتكتب [[.]] نقطة.

---

## ١. PNG: [[xxd -l 8 camera.png]]

~~~text الناتج
00000000: 8950 4e47 0d0a 1a0a                      .PNG....
~~~

| byte | معناه |
|---|---|
| [[89]] | رقم برة ASCII عن قصد، عشان أي برنامج يفتكره نص يعرف إنه مش نص |
| [[50 4e 47]] | [[PNG]] كحروف |
| [[0d 0a]] | [[\r\n]]: نهاية سطر ويندوز |
| [[1a]] | Ctrl+Z: «نهاية الملف» في DOS القديم |
| [[0a]] | [[\n]]: نهاية سطر لينكس |

نهايات السطور جوه البصمة معمولة عشان لو حد نقل الملف كنص وبرنامج «صلّح» نهايات السطور، البصمة تبوظ وتعرف إن الملف اتبوظ.

---

## ٢. JPEG: [[xxd -l 4 camera.jpg]]

~~~text الناتج
00000000: ffd8 ffe0                                ....
~~~

[[ff d8]] معناها «بداية صورة» (SOI = Start Of Image)، و [[ff]] بعدها أول marker. البصمة [[ff d8 ff]] بس، والـ byte الرابع بيختلف: [[e0]] هنا معناها JFIF، وممكن تلاقي [[e1]] (صورة موبايل فيها EXIF). عشان كده البصمة ٣ bytes مش ٤. ومفيش ولا حرف بيتطبع، فالعمود اليمين كله نقط.

---

## ٣. WebP: [[xxd -l 12 camera.webp]]

~~~text الناتج
00000000: 5249 4646 b408 0000 5745 4250            RIFF....WEBP
~~~

هنا البصمة على **حتتين**:

| الـ offset | الـ bytes | معناها |
|---|---|---|
| 0 لـ 3 | [[52 49 46 46]] | [[RIFF]]: حاوية عامة (WAV و AVI بيستخدموها كمان) |
| 4 لـ 7 | [[b4 08 00 00]] | حجم الملف ناقص 8، مكتوب little-endian (بالمقلوب): [[0x000008b4]] = 2228، والملف فعلًا 2236 byte |
| 8 لـ 11 | [[57 45 42 50]] | [[WEBP]]: نوع اللي جوه الحاوية |

يعني [[RIFF]] لوحدها مش كفاية (ممكن تبقى WAV)، لازم تبص على offset 8 كمان. والـ 4 bytes اللي في النص هتختلف من ملف لملف لأنها الحجم.

---

## ٤. ZIP: [[xxd -l 4 project.zip]]

~~~text الناتج
00000000: 504b 0304                                PK..
~~~

[[PK]] أول حرفين من اسم Phil Katz اللي عمل الصيغة، و [[03 04]] معناها «local file header» (أول ملف جوه الأرشيف). نفس البصمة دي في docx و xlsx و jar و apk لأنهم كلهم zip من جوه.

---

## ٥. SQLite: [[xxd -l 4 gym.db]]

~~~text الناتج
00000000: 5351 4c69                                SQLi
~~~

البصمة الكاملة 16 byte، شوفها بـ [[xxd -l 16]]:

~~~text xxd -l 16 gym.db
00000000: 5351 4c69 7465 2066 6f72 6d61 7420 3300  SQLite format 3.
~~~

جملة إنجليزي عادية، وفي آخرها [[00]] (byte صفر، بيتكتب [[.]]).

---

## ٦. [[file]] بيعمل كل ده لوحده

~~~bash
file --mime-type -b camera.png project.zip gym.db report.docx
~~~

~~~text الناتج
image/png
application/zip
application/vnd.sqlite3
application/vnd.openxmlformats-officedocument.wordprocessingml.document
~~~

[[--mime-type]] اطبع النوع بس، و [[-b]] من غير اسم الملف. اللي يستاهل تبص عليه آخر سطر: [[report.docx]] بيبدأ بـ [[PK]] زي [[project.zip]] بالظبط، بس [[file]] **دخل جوه الـ zip** ولقى ملف [[word/document.xml]] و [[[Content_Types].xml]]، فعرف إنه Word. [[vnd]] يعني vendor: نوع خاص بشركة (هنا معايير Office).

ومن غير [[--mime-type]] بيديك وصف أطول، وبيقرا تفاصيل من جوه الملف:

~~~text file camera.png gym.db report.docx
camera.png:  PNG image data, 640 x 480, 16-bit/color RGB, non-interlaced
gym.db:      SQLite 3.x database, last written using SQLite version 3045001, file counter 1, database pages 2, ...
report.docx: Microsoft Word 2007+
~~~

### ملف نصي باسم صورة

~~~bash
printf "hello\n" > fake.png
file fake.png
~~~

~~~text الناتج
fake.png: ASCII text
~~~

الاسم بيقول صورة، والمحتوى بيقول نص. [[file]] صدّق المحتوى.

---

## على ويندوز: [[Format-Hex]]

مفيش [[xxd]] ولا [[file]] في PowerShell (موجودين في Git Bash). البديل [[Format-Hex]]:

~~~powershell
Format-Hex camera.png | Select-Object -First 1
~~~

~~~text الناتج (PowerShell 7)
          Offset Bytes                                           Ascii
                 00 01 02 03 04 05 06 07 08 09 0A 0B 0C 0D 0E 0F
          ------ -----------------------------------------------  -----
0000000000000000 89 50 4E 47 0D 0A 1A 0A 00 00 00 0D 49 48 44 52 �PNG����   �IHDR
~~~

نفس الأعمدة التلاتة، والـ hex بحروف كبيرة. [[Format-Hex]] بيطبع الملف كله، و [[Select-Object -First 1]] بياخد أول «كتلة» (أول 16 byte). وفي PowerShell 7 تقدر تقول [[Format-Hex gym.db -Count 16]] على طول، بس [[-Count]] مش موجودة في Windows PowerShell 5.1، فهناك استخدم [[Select-Object -First 1]].

---

## البصمات في جدول

| الصيغة | البصمة | offset | كحروف |
|---|---|---|---|
| PNG | [[89 50 4E 47 0D 0A 1A 0A]] | 0 | [[.PNG....]] |
| JPEG | [[FF D8 FF]] | 0 | (مفيش حروف) |
| WebP | [[52 49 46 46]] و [[57 45 42 50]] | 0 و 8 | [[RIFF]] و [[WEBP]] |
| ZIP و docx و apk | [[50 4B 03 04]] | 0 | [[PK..]] |
| SQLite | [[53 51 4C 69 74 65 ...]] | 0 | [[SQLite format 3]] |

---

## عن التمرين

الدالة بتاخد array أرقام، وكل رقم byte زي اللي شفناه في [[xxd]] ([[0x89]] هي [[89]]). فكّر في ٣ حاجات: البصمة لازم **كلها** تطابق مش أول byte بس، و WebP محتاج تشيك في مكانين (0 و 8)، والملف ممكن يكون أقصر من البصمة فمتقراش برة الـ array.

---

## الخلاصة

~~~text
magic bytes     أول bytes ثابتة في كل صيغة binary
xxd -l N        اقرا أول N byte بالـ hex (Format-Hex على ويندوز)
file            بيقارن بآلاف البصمات، وبيدخل جوه zip يفرّق docx
النصوص           ملهاش بصمة: file بيخمّن من المحتوى
الاسم            ممكن يكدب، البصمة صعب
~~~`,
          lines: [
            R`PNG: [[8950 4e47 0d0a 1a0a]].`,
            R`JPEG: [[ffd8 ff]].`,
            R`WebP: [[RIFF]] وبعد ٤ bytes (الحجم) [[WEBP]].`,
            R`ZIP: [[PK]] و [[03 04]].`,
            R`SQLite: [[SQLite]] كنص.`,
            R`النوع من المحتوى، و [[file]] بيبص جوه الـ zip فيفرّق docx.`
          ],
          sol: R`الناتج الحقيقي:
[[00000000: 8950 4e47 0d0a 1a0a                      .PNG....]]
[[00000000: ffd8 ffe0                                ....]]
[[00000000: 5249 4646 f65b 0000 5745 4250            RIFF.[..WEBP]]
[[00000000: 504b 0304                                PK..]]
[[00000000: 5351 4c69                                SQLi]]
[[image/png]] و [[application/zip]] و [[application/vnd.sqlite3]] و [[application/vnd.openxmlformats-officedocument.wordprocessingml.document]]
(آخر واحد هو الـ MIME الرسمي لـ docx.)

و [[fake.png]] النصي: [[file]] بيقول [[ASCII text]] أو [[Unicode text, UTF-8 text]] مهما كان اسمه.`,
          check: {
            lang: "js",
            starter: R`// detectType: خد أول bytes من الملف (array أرقام أو Uint8Array) ورجّع النوع الحقيقي:
// "png" و "jpg" و "gif" و "pdf" و "zip" و "exe" و "elf" و "wasm" و "webp"، وأي حاجة تانية "unknown"
function detectType(bytes) {
  if (bytes[0] === 0x89) return "png";
  return "unknown";
}`,
            tests: R`const hex = (s) => s.split(" ").map((h) => parseInt(h, 16));
test("png (البصمة كاملة مش أول byte بس)", () => expect([detectType(hex("89 50 4E 47 0D 0A 1A 0A 00")), detectType(hex("89 00 00 00 00 00 00 00"))]).toEqual(["png", "unknown"]));
test("jpg و gif و pdf", () => expect([detectType(hex("FF D8 FF E0")), detectType(hex("47 49 46 38 39 61")), detectType(hex("25 50 44 46 2D 31 2E 37"))]).toEqual(["jpg", "gif", "pdf"]));
test("zip و exe و elf و wasm", () => expect([detectType(hex("50 4B 03 04 14")), detectType(hex("4D 5A 90 00")), detectType(hex("7F 45 4C 46 02")), detectType(hex("00 61 73 6D 01 00 00 00"))]).toEqual(["zip", "exe", "elf", "wasm"]));
test("webp: RIFF ومعاها WEBP في مكان 8", () => expect([detectType(hex("52 49 46 46 F6 5B 00 00 57 45 42 50")), detectType(hex("52 49 46 46 F6 5B 00 00 57 41 56 45"))]).toEqual(["webp", "unknown"]));
test("نص عادي ← unknown", () => expect(detectType(Array.from("<?php echo 1;", (c) => c.charCodeAt(0)))).toBe("unknown"));
test("ملف أقصر من البصمة ← unknown", () => expect([detectType([0x89, 0x50]), detectType([])]).toEqual(["unknown", "unknown"]));
test("بيشتغل مع Uint8Array", () => expect(detectType(new Uint8Array(hex("FF D8 FF DB")))).toBe("jpg"));`,
            solution: R`function detectType(bytes) {
  const sigs = [
    ["png", 0, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]],
    ["jpg", 0, [0xff, 0xd8, 0xff]],
    ["gif", 0, [0x47, 0x49, 0x46, 0x38]],
    ["pdf", 0, [0x25, 0x50, 0x44, 0x46]],
    ["zip", 0, [0x50, 0x4b, 0x03, 0x04]],
    ["exe", 0, [0x4d, 0x5a]],
    ["elf", 0, [0x7f, 0x45, 0x4c, 0x46]],
    ["wasm", 0, [0x00, 0x61, 0x73, 0x6d]]
  ];
  const at = (offset, sig) => bytes.length >= offset + sig.length && sig.every((b, i) => bytes[offset + i] === b);
  for (const [name, offset, sig] of sigs) if (at(offset, sig)) return name;
  if (at(0, [0x52, 0x49, 0x46, 0x46]) && at(8, [0x57, 0x45, 0x42, 0x50])) return "webp";
  return "unknown";
}`
          }
        },
        {
          cmd: "الامتداد بيكدب",
          title: "إزاي invoice.pdf.exe والامتدادات المخفية بتخدع الناس، وتتأكد من الملفات المرفوعة على موقعك إزاي؟",
          desc: R`كل اللي فات في التاب بيوصل لقاعدة أمان واحدة: اسم الملف وامتداده معلومة من اللي عمل الملف، وممكن تبقى كدب. الطرق المشهورة:

• امتداد مزدوج: [[invoice.pdf.exe]]. لو ويندوز مخبي الامتدادات (الافتراضي!) هيظهر [[invoice.pdf]]، ومع أيقونة PDF متزوّرة جوه البرنامج، الناس بتدوس. الحل الأول: اعرض الامتدادات (درس «إظهار الامتدادات»).
• حرف RTLO: حرف Unicode مخفي ([[U+202E]] Right-to-Left Override) بيقلب اتجاه اللي بعده في العرض. الاسم الحقيقي [[invoice]] وبعده الحرف ده وبعده [[fdp.exe]] بيظهر في مدير الملفات وكأنه بيخلص بـ [[.pdf]] بالمقلوب. والامتداد الحقيقي [[.exe]]. أدوات زي [[ls | cat -A]] بتكشف الحرف.
• امتدادات منفّذة مش متوقعة: [[.scr]] و [[.com]] و [[.js]] و [[.vbs]] و [[.hta]] و [[.lnk]] (اختصار بيشغّل أمر) و [[.iso]] و [[.img]] (بيتعمل لهم mount بدبل كليك وجواهم برامج). و [[.docm]] و [[.xlsm]] بالـ macros.
• داخل أرشيف: zip فيه [[.exe]] أو [[.lnk]]، وأحيانًا بباسورد عشان برامج الحماية متفتحوش.

ولو انت اللي عامل الموقع وبتسمح برفع ملفات (صور، CV، مستندات)، المهاجم هيعمل العكس: يرفع script باسم صورة. القواعد:
• متثقش في الاسم، ولا في [[Content-Type]] اللي العميل باعته، ولا في [[accept]] اللي في الـ HTML. كلهم من العميل.
• اتأكد من المحتوى (magic bytes، أو الأحسن: افتح الصورة بمكتبة صور فعلًا وأعد حفظها، زي sharp، ده بيمسح كمان أي حاجة متخبية والـ EXIF).
• ليستة سماح (allowlist) بالأنواع المقبولة، مش ليستة منع.
• اعمل للملف اسم جديد من عندك ([[crypto.randomUUID() + ".webp"]])، ومتستخدمش اسم العميل في المسار (path traversal: [[../../etc/passwd]]).
• خزّنه بره الفولدر اللي السيرفر بينفّذ منه (عشان [[photo.php]] ميتشغّلش)، أو على S3 أو أي object storage.
• ابعته بـ Content-Type انت محدده و [[X-Content-Type-Options: nosniff]]، ولو مستند خلّيه [[Content-Disposition: attachment]].
• حدّد الحجم الأقصى.
• SVG و HTML المرفوعين ممكن يبقى فيهم scripts (درس [[.svg]])، فإما تمنعهم أو تعرضهم من دومين تاني.`,
          example: R`cp hostname.exe invoice.pdf.exe
cp hostname.exe "$(printf 'invoice\u202Efdp.exe')"
printf '<?php system($_GET["c"]); ?>' > photo.jpg
ls
ls | cat -A
file *`,
          try: R`في فولدر تجربة نفّذ المثال (أي ملف binary ينفع بدل [[hostname.exe]]، مثلًا [[cp /bin/ls]]). بص على ناتج [[ls]] العادي، وبعدين [[cat -A]]. افتح الفولدر في مدير الملفات وشوف الاسم التاني ظاهر إزاي. لو على ويندوز وعندك الامتدادات مخفية، اعمل ملف [[test.pdf.txt]] وشوف هيظهر إزاي، وبعدين اعرض الامتدادات.`,
          deep: {
            why: R`الناس (وبرامج كتير) بتحكم على الملف من اسمه، والاسم أسهل حاجة تتزور. وأغلب الهجمات على الأفراد بتبدأ بمرفق في إيميل أو رسالة، وأغلب الهجمات على المواقع اللي فيها رفع ملفات بتبدأ بملف «صورة» هو في الحقيقة كود.`,
            how: R`ويندوز بيقرر يعمل إيه بالملف من آخر امتداد بس، فـ [[.pdf.exe]] بيتشغّل كبرنامج. وحرف RTLO بيأثر على العرض بس: نظام الملفات شايف الحروف بترتيبها الحقيقي ([[invoice]] ثم الحرف ثم [[fdp.exe]])، فالامتداد الحقيقي [[.exe]]. وعلى السيرفر، لو الملف المرفوع اتحط في فولدر Apache أو Nginx بيشغّل PHP، طلب [[/uploads/photo.php]] هينفّذه.`,
            when: R`كل ما تستلم مرفق، وكل ما تكتب endpoint بيقبل ملفات، وكل ما تراجع كود حد بيعمل كده.`,
            mistakes: R`تتأكد من الصورة بـ [[if (name.endsWith(".jpg"))]] بس. تحفظ الملف باسم العميل في [[public/uploads/]]. تثق في [[file.mimetype]] في multer (ده Content-Type من العميل). وتفتح [[.zip]] جايلك وتدوس على اللي جواه من غير ما تبص على امتداده.`
          },
          teach: R`## الفكرة في سطرين

الدرس ده عن **الدفاع**: إزاي الاسم بيخدع العين، وإزاي تكشفه. المثال بيعمل ٣ ملفات «متنكّرة» عشان تشوف الحيلة بنفسك في فولدر تجربة، وبعدين بيكشفهم بتلات أدوات: [[ls]] (العين)، و [[cat -A]] (الـ bytes)، و [[file]] (المحتوى الحقيقي). الخلاصة: متحكمش على ملف من اسمه.

الأوامر اتشغّلت على أوبونتو 24.04 (جوه Docker)، و [[hostname.exe]] نسخة من برنامج ويندوز عادي (أي ملف binary ينفع). الملفات دي ملهاش ضرر: محدش هيشغّلها، إحنا بنتفرّج على أساميها بس.

---

## الحيل التلاتة اللي المثال بيوريهالك

| السطر | بيوضّح خطر إيه |
|---|---|
| [[cp hostname.exe invoice.pdf.exe]] | **امتداد مزدوج**: الاسم فيه [[.pdf]] في النص، بس الامتداد الحقيقي (اللي بعد آخر نقطة) [[.exe]]. لو ويندوز مخبي الامتدادات (الافتراضي)، بيشيل [[.exe]] فتشوف [[invoice.pdf]] |
| [[cp hostname.exe "$(printf 'invoice\u202efdp.exe')"]] | **حرف RTLO**: حرف Unicode مخفي ([[U+202E]] = Right-to-Left Override) بيقلب اتجاه عرض اللي بعده، فالاسم يظهر وكأنه بيخلص بـ [[.pdf]] بالمقلوب. [[printf]] هنا بيكتب الحرف المخفي ده عشان نشوف تأثيره |
| [[printf '<?php ... ?>' > photo.jpg]] | **محتوى مش زي الاسم**: ملف اسمه صورة ومحتواه كود. ده شكل الخطر لو موقعك بيقبل رفع ملفات |

كل دول نفس الفكرة: اسم الملف معلومة من اللي عمل الملف، فممكن تبقى كدب. دلوقتي نكشفهم.

---

## كشف ١: [[ls]] العادي مش كفاية

~~~bash
ls
~~~

~~~text الناتج
hostname.exe
invoice.pdf.exe
invoice\u202efdp.exe
photo.jpg
~~~

الاسم اللي فيه RTLO بيظهر مقلوب في مدير الملفات وفي ترمنالات كتير (ساعات [[invoiceexe.pdf]])، فالعين بتتخدع. محتاجين نشوف الـ bytes الحقيقية.

---

## كشف ٢: [[cat -A]] بيكشف الحرف المخفي

[[ls | cat -A]]: ناتج [[ls]] بيدخل لـ [[cat -A]]، و [[-A]] معناها اطبع كل حرف «غير مرئي» في شكل ظاهر، وحطّ [[$]] في آخر كل سطر.

~~~bash
ls | cat -A
~~~

~~~text الناتج
hostname.exe$
invoice.pdf.exe$
invoiceM-bM-^@M-.fdp.exe$
photo.jpg$
~~~

شوف السطر التالت: [[M-bM-^@M-.]] دي الطريقة اللي [[cat -A]] بيكتب بيها الـ ٣ bytes بتوع الحرف المخفي ([[e2 80 ae]] = ترميز UTF-8 للحرف [[U+202E]]). يعني الحرف بان. و [[ls -b]] بيعمل نفس الحاجة بشكل تاني: بيطبع [[invoice\342\200\256fdp.exe]] (نفس الـ bytes بالنظام الثماني).

وفي أي لغة تقدر تشوف الاسم الحقيقي بـ [[repr]]: في Python [[os.listdir(".")]] بيطبع [['invoice\u202efdp.exe']]، فالحرف واضح كـ [[\u202e]].

---

## كشف ٣: [[file]] بيقول الحقيقة من المحتوى

~~~bash
file *
~~~

[[*]] يعني «كل الملفات في الفولدر».

~~~text الناتج
hostname.exe:               PE32+ executable (console) x86-64, for MS Windows, 7 sections
invoice.pdf.exe:            PE32+ executable (console) x86-64, for MS Windows, 7 sections
invoice<U+202E>fdp.exe:     PE32+ executable (console) x86-64, for MS Windows, 7 sections
photo.jpg:                  PHP script, ASCII text, with no line terminators
~~~

(كتبنا الحرف المخفي هنا [[<U+202E>]] عشان ميقلبش الصفحة.) [[file]] بيقرا الـ magic bytes (الدرس اللي فات) مش الاسم: فقال إن اللي أساميهم «PDF» دول **برامج** ([[PE32+ executable]] شكل برامج ويندوز)، وإن [[photo.jpg]] **كود PHP** مش صورة. ده المصدر الوحيد اللي مبيتخدعش.

---

## لو انت صاحب الموقع وبتقبل رفع ملفات

المهاجم هيعمل العكس: يرفع script باسم صورة (زي [[photo.jpg]] فوق). القواعد:

- **متثقش في اللي جاي من العميل**: لا الاسم، ولا الـ [[Content-Type]] اللي بعته، ولا [[accept]] اللي في الـ HTML. كلهم العميل يقدر يكتب فيهم أي حاجة.
- **اتأكد من المحتوى**: اقرا الـ magic bytes، أو الأحسن افتح الصورة بمكتبة صور وأعد حفظها (زي sharp)، ده بيمسح أي حاجة متخبية والـ EXIF كمان.
- **ليستة سماح (allowlist)** بالأنواع المقبولة، مش ليستة منع.
- **اعمل للملف اسم جديد من عندك** ([[crypto.randomUUID() + ".webp"]])، ومتستخدمش اسم العميل في المسار (عشان حيلة [[../../etc/passwd]]).
- **خزّنه بره الفولدر اللي السيرفر بينفّذ منه** (أو على S3)، عشان ملف اسمه [[.php]] ميتشغّلش.
- ابعته بـ [[Content-Type]] انت محدده و [[X-Content-Type-Options: nosniff]]، وحدّد حجم أقصى.
- SVG و HTML المرفوعين ممكن فيهم scripts، فإما تمنعهم أو تعرضهم من دومين تاني.

---

## أول خطوة على جهازك: اعرض الامتدادات

أغلب خدعة الامتداد المزدوج بتشتغل لأن ويندوز بيخبي الامتداد. في File Explorer فعّل **View ثم File name extensions**. ساعتها [[invoice.pdf.exe]] هيظهر بامتداده الحقيقي.

---

## الخلاصة

~~~text
الاسم            معلومة من اللي عمل الملف، ممكن تكدب
امتداد مزدوج       invoice.pdf.exe: الامتداد الحقيقي بعد آخر نقطة
حرف RTLO          U+202E بيقلب العرض: اكشفه بـ cat -A أو ls -b
محتوى ≠ اسم        كود باسم صورة: file بيكشفه
~~~

| تكشف بإيه | الأداة |
|---|---|
| حرف مخفي في الاسم | [[cat -A]] أو [[ls -b]] أو [[repr]] |
| النوع الحقيقي | [[file]] (magic bytes) |
| رفع آمن | allowlist + فحص المحتوى + اسم من عندك + تخزين بره مسار التنفيذ |`,
          lines: [
            R`برنامج باسم شكله PDF.`,
            R`نفس البرنامج، والاسم فيه حرف [[U+202E]] مخفي قبل [[fdp]].`,
            R`كود PHP في ملف اسمه صورة (لو اترفع على سيرفر بيشغّل PHP، ده باب خلفي).`,
            R`[[ls]] العادي: التاني بيظهر [[invoiceexe.pdf]] في أغلب الترمنالات.`,
            R`[[cat -A]] بيكشف الحرف المخفي كـ bytes.`,
            R`[[file]] بيقول الحقيقة لكل واحد.`
          ],
          sol: R`الناتج الحقيقي ([[cat -A]] و [[file]]):
[[invoiceM-bM-^@M-.fdp.exe$]] (الـ [[M-bM-^@M-.]] هي bytes الحرف [[e2 80 ae]])
[[invoice.pdf.exe$]]
[[invoice<U+202E>fdp.exe: PE32+ executable (console) x86-64, for MS Windows, 16 sections]] (كتبنا الحرف المخفي هنا كـ [[<U+202E>]] عشان ميقلبش الصفحة)
[[invoice.pdf.exe: PE32+ executable (console) x86-64, for MS Windows, 16 sections]]
[[photo.jpg:       PHP script, ASCII text, with no line terminators]]
وفي مدير الملفات (وفي [[ls]] في ترمنالات كتير) الاسم التاني بيظهر [[invoiceexe.pdf]].

وفي Python: [[repr]] للاسم بيطبع [['invoice\u202efdp.exe']] فالحرف بيبان.`
        }
      ]
    },
    {
      t: "التحويل بين الصيغ والتحقق منها",
      l: 3,
      n: "تحوّل JSON لـ YAML والعكس، و CSV لـ JSON، وتقرا XML من الكود، وتتأكد إن الملف مش بس سليم في الكتابة، لأ كمان شكله صح (JSON Schema و XSD و yamllint)، وفي الآخر: تختار صيغة إيه لمشروعك",
      items: [
        {
          cmd: "JSON و YAML",
          title: "تحوّل JSON لـ YAML والعكس إزاي (python و yq)، وإيه اللي بيضيع في التحويل؟",
          desc: R`JSON و YAML بيوصفوا نفس الحاجة (objects و lists ونصوص وأرقام و booleans و null)، فالتحويل بينهم سهل. هتحتاجه لما تلاقي مثال في الوثائق بصيغة وانت محتاج التانية، أو تحوّل [[compose.yaml]] أو Kubernetes manifest لـ JSON عشان تعالجه بكود.

الأدوات:
• Python (موجود في كل حتة، ومحتاج [[pyyaml]]):
  JSON لـ YAML: [[yaml.safe_dump(json.load(f), allow_unicode=True, sort_keys=False)]]
  YAML لـ JSON: [[json.dumps(yaml.safe_load(f), ensure_ascii=False, indent=2)]]
  ([[allow_unicode]] و [[ensure_ascii=False]] عشان العربي ميتحولش لـ [[س]]، و [[sort_keys=False]] عشان الترتيب ميتغيرش.)
• [[yq]] (نسخة mikefarah، ملف واحد: [[brew install yq]] أو [[snap install yq]] أو [[docker run mikefarah/yq]]): زي [[jq]] بالظبط بس بيفهم YAML و JSON و TOML و XML.
  [[yq -o=json app.yaml]]: YAML لـ JSON.
  [[yq -o=yaml user.json]]: JSON لـ YAML.
  [[yq '.app.port' app.yaml]]: تطلّع قيمة.
  [[yq -i '.app.port = 8080' app.yaml]]: تعدّل الملف نفسه (مفيد في CI و deploy scripts).
• أونلاين: مواقع تحويل كتير، بس متلزقش فيها ملفات فيها أسرار.

إيه اللي بيضيع أو بيتغير:
• التعليقات: JSON مفيهوش، فتعليقات YAML بتضيع. و [[yaml.safe_dump]] كمان مبيحفظش التعليقات لما تقرا وتكتب YAML (استخدم [[ruamel.yaml]] أو [[yq]] اللي بيحاول يحافظ عليها).
• الـ anchors ([[&]] و [[*]]): بتتفك وتبقى نسخ مكررة.
• الأنواع اللي YAML خمّنها غلط (درس «مشكلة النرويج»): [[1.10]] بقت [[1.1]] قبل ما توصل JSON أصلًا.
• التواريخ: PyYAML بيقرا [[2026-10-01]] تاريخ، و [[json.dumps]] بيقع ([[Object of type date is not JSON serializable]]) إلا لو [[default=str]].
• في الاتجاه التاني الأمور أسلم: JSON سليم = YAML سليم، والقيم اللي ممكن تتلخبط (زي [["11511"]]) بيتحطلها تنصيص لوحدها.`,
          example: R`python3 -c 'import json, yaml; print(yaml.safe_dump(json.load(open("user.json")), allow_unicode=True, sort_keys=False), end="")' > user.yaml
head -4 user.yaml
python3 -c 'import json, yaml; print(json.dumps(yaml.safe_load(open("app.yaml")), ensure_ascii=False, indent=2))'
yq -o=json '.app' app.yaml
yq '.app.port' app.yaml
yq -o=yaml '.address' user.json`,
          try: R`على [[user.json]] (درس [[.json]]) و [[app.yaml]] (درس [[.yaml]]) نفّذ المثال (لو [[yq]] مش متسطّب: [[docker run --rm -v "$PWD":/w -w /w mikefarah/yq -o=json '.app' app.yaml]]). بص على [[zip]] في [[user.yaml]]: اتكتب إزاي؟ وبعدين حوّل [[norway.yaml]] (درس «مشكلة النرويج») لـ JSON بـ Python وشوف [[NO]] وصلت إيه.`,
          deep: {
            why: R`كل أداة اختارت صيغة: Kubernetes و Compose و GitHub Actions بـ YAML، والـ APIs و package.json بـ JSON. والكود بتاعك غالبًا بيفهم JSON أسهل. فالتحويل مهارة يومية، والمهم تعرف إيه اللي ممكن يتغير وانت مش واخد بالك.`,
            how: R`أي تحويل بيمر بنفس الخطوتين: parse للصيغة الأولى لقيم في الذاكرة (dict و list و str و int)، وبعدين dump للقيم دي بالصيغة التانية. عشان كده أي حاجة مش «قيمة» (تعليق، anchor، تنسيق، ترتيب أحيانًا) مبتعديش، وأي تخمين حصل في الـ parse بيفضل.`,
            when: R`تحوّل مثال من الوثائق، أو تعدّل قيمة في YAML من سكربت deploy ([[yq -i]])، أو تقرا إعدادات YAML في كود Node أو Python.`,
            mistakes: R`تحوّل ملف YAML عليه تعليقات مهمة وترجّعه فتضيع كلها. تنسى [[allow_unicode]] فالعربي يبقى [["سا..."]] في YAML. تستخدم [[yaml.load]] بدل [[yaml.safe_load]] على ملف جاي من بره (ممكن ينفذ كود). وتخلط بين [[yq]] بتاع mikefarah و [[yq]] بتاع Python (اسمهم واحد والأوامر مختلفة).`
          },
          teach: R`## الفكرة في سطرين

المثال بياخد [[user.json]] (درس [[.json]]) ويحوّله YAML، وبياخد [[app.yaml]] (درس [[.yaml]]) ويحوّله JSON، مرة بـ Python ومرة بأداة اسمها [[yq]]. كل تحويل بيمر بخطوتين ثابتتين: **parse** (اقرا الصيغة الأولى لقيم في الذاكرة) و **dump** (اكتب القيم دي بالصيغة التانية).

الأوامر اتشغّلت على ويندوز في PowerShell 7 بـ Python 3.14 (مكتبة PyYAML 6.0.3) و [[yq]] نسخة mikefarah v4.54.1 (نزّلناها ملف واحد في فولدر التجربة). نفس الكود بيشتغل على لينكس والماك بالظبط.

---

## ١. JSON لـ YAML بـ Python

~~~bash
python3 -c 'import json, yaml; print(yaml.safe_dump(json.load(open("user.json")), allow_unicode=True, sort_keys=False), end="")' > user.yaml
~~~

- [[-c]]: نفّذ الكود ده على طول.
- [[import json, yaml]]: المكتبتين. [[json]] جاي مع Python، و [[yaml]] (PyYAML) محتاج [[pip install pyyaml]].
- [[json.load(open("user.json"))]]: **parse**. [[open(...)]] بيفتح الملف، و [[json.load]] بيقراه لقيم Python: [[dict]] و [[list]] و [[str]] و [[int]] و [[bool]] و [[None]].
- [[yaml.safe_dump(...)]]: **dump**. بياخد القيم ويكتبها YAML. [[safe]] يعني يكتب الأنواع العادية بس (مش أي object غريب).
- [[allow_unicode=True]]: اكتب العربي زي ما هو، من غير كده بيطلع [[سا...]].
- [[sort_keys=False]]: سيب ترتيب المفاتيح زي الأصل (الافتراضي بيرتّبهم أبجدي).
- [[end=""]]: [[print]] بيزوّد سطر فاضي في الآخر، ده بيلغيه.
- [[> user.yaml]]: احفظ الناتج في الملف ده بدل ما يتطبع.

> لو نسيت [[allow_unicode=True]]، العربي بيطلع escapes: [[name: "سارة أحمد"]]. شغّال، بس مش مقروء.

---

## ٢. نبص على الناتج: [[head -4 user.yaml]]

[[head -4]] أول ٤ سطور. الملف كله طلع كده:

~~~yaml user.yaml
id: 42
name: سارة أحمد
email: sara@example.com
active: true
balance: 1250.5
manager: null
roles:
- admin
- editor
address:
  city: القاهرة
  zip: '11511'
orders:
- id: 1
  total: 300
- id: 2
  total: 950.75
~~~

لاحظ تلات حاجات:
- الترتيب زي JSON بالظبط (بفضل [[sort_keys=False]]).
- العربي سليم (بفضل [[allow_unicode]]).
- [[zip: '11511']] **اتحطلها تنصيص لوحدها**: PyYAML عرف إنها لو كتبها من غير quotes هتتقري رقم (11511)، وهي أصلًا نص في الـ JSON، فحماها بالـ quotes. ده YAML بيحميك من «مشكلة النرويج» في الاتجاه ده.

على ويندوز في PowerShell [[head]] مش موجود، استخدم [[Get-Content user.yaml -TotalCount 4]] أو [[Get-Content user.yaml]] للكل.

---

## ٣. YAML لـ JSON بـ Python

~~~bash
python3 -c 'import json, yaml; print(json.dumps(yaml.safe_load(open("app.yaml")), ensure_ascii=False, indent=2))'
~~~

نفس الخطوتين بالعكس:
- [[yaml.safe_load(...)]]: parse للـ YAML. [[safe]] مهمة هنا: [[yaml.load]] العادي ممكن ينفّذ كود لو الملف جاي من مصدر مش موثوق.
- [[json.dumps(...)]]: dump لـ JSON نص. [[dumps]] بـ s يعني «to string» (مش ملف).
- [[ensure_ascii=False]]: نفس فكرة [[allow_unicode]]، خلّي العربي عربي.
- [[indent=2]]: نسّق بـ مسافتين لكل مستوى.

~~~text أول الناتج
{
  "app": {
    "name": "gym-portal",
    "port": 3000,
    "debug": false,
    "version": "1.10"
  },
  ...
~~~

[[app.port]] طلع رقم [[3000]] و [[app.debug]] طلع [[false]]، لأن YAML عرف أنواعهم. و [[version]] فضل نص [["1.10"]] لأنه كان متنصص في الـ YAML الأصلي (من غير التنصيص كان YAML هيقراه [[1.1]]).

---

## ٤، ٥، ٦. نفس الحاجة بـ [[yq]]

[[yq]] (نسخة mikefarah) أداة ملف واحد زي [[jq]] بالظبط، بس بتفهم YAML و JSON و TOML و XML. الفكرة: بتديه الملف وتعبير بيختار جزء منه.

### [[yq -o=json '.app' app.yaml]]

- [[-o=json]]: output format = JSON (الافتراضي YAML).
- [['.app']]: التعبير: «هات المفتاح [[app]]». النقطة في الأول معناها «من جذر الملف».

~~~text الناتج
{
  "name": "gym-portal",
  "port": 3000,
  "debug": false,
  "version": "1.10"
}
~~~

### [[yq '.app.port' app.yaml]]

[[.app.port]] يعني ادخل [[app]] وبعدها [[port]]. من غير [[-o]] بيطبع القيمة زي ما هي:

~~~text الناتج
3000
~~~

### [[yq -o=yaml '.address' user.json]]

هنا الدخل JSON (من الامتداد عرف)، والخرج YAML:

~~~text الناتج
city: القاهرة
zip: "11511"
~~~

برضه [[yq]] حطّ تنصيص على [[zip]] لوحده عشان يحميها من التحويل لرقم. ولو عايز تعدّل الملف نفسه (مش بس تقرا) فيه [[yq -i '.app.port = 8080' app.yaml]]: [[-i]] = in place، مفيد في سكربتات الـ deploy.

> على ويندوز نزّلنا [[yq.exe]]. على لينكس والماك: [[brew install yq]] أو [[snap install yq]]. وفيه [[yq]] تاني بتاع Python بأوامر مختلفة خالص، فخلي بالك مين اللي متسطّب.

---

## اللي بيضيع في التحويل: «مشكلة النرويج»

التحويل مش دايمًا بريء. جرّب تقرا [[norway.yaml]] (درس «مشكلة النرويج») بـ PyYAML اللي بيمشي على YAML 1.1:

~~~bash
python3 -c 'import json, yaml; d=yaml.safe_load(open("norway.yaml")); print(json.dumps(d, default=str, ensure_ascii=False))'
~~~

~~~text الناتج
{"countries": ["EG", "SA", false], "answer": true, "switch": true, "version": 1.1, "ports": 1342, "zip": 668, "time": 750, "empty": null, "tilde": null, "date": "2026-10-01", "safe": "NO"}
~~~

شوف اللي اتخرب **قبل** ما يوصل JSON أصلًا:

| في الـ YAML | وصل إيه | ليه |
|---|---|---|
| [[NO]] (كود النرويج) | [[false]] | YAML 1.1 بيعتبر [[no]] قيمة boolean |
| [[yes]] | [[true]] | نفس الكلام |
| [[on]] | [[true]] | نفس الكلام |
| [[version: 1.10]] | [[1.1]] | اتقري رقم عشري، فالصفر ضاع |
| [[22:22]] | [[1342]] | اتقري وقت بالستين (sexagesimal): 22×60+22 |
| [[01234]] | [[668]] | اتقري رقم ثماني (octal) |
| [["NO"]] | [["NO"]] | ده فضل سليم لأنه كان متنصص |

و [[default=str]] في [[json.dumps]] ضرورية هنا: من غيرها PyYAML بيقرا [[2026-10-01]] كـ **تاريخ** (object [[date]])، و [[json.dumps]] بيقع:

~~~text من غير default=str
TypeError: Object of type date is not JSON serializable
~~~

[[default=str]] معناها «أي حاجة متعرفش تكتبها، حوّلها نص».

---

## ليه ده بيحصل

أي تحويل بيمر بالـ parse والـ dump، فأي حاجة **مش قيمة** مبتعديش:

- **التعليقات**: JSON مفيهوش تعليقات أصلًا، فتعليقات الـ YAML بتضيع. (و [[yq]] بيحاول يحافظ عليها، و [[ruamel.yaml]] في Python كمان.)
- **الـ anchors** ([[&]] و [[*]] في YAML): بتتفك وتبقى نسخ مكررة.
- **أي تخمين غلط حصل في الـ parse** (زي النرويج) بيفضل غلط في الناتج.

---

## الخلاصة

| التحويل | الأمر |
|---|---|
| JSON ← YAML | [[yaml.safe_dump(json.load(f), allow_unicode=True, sort_keys=False)]] أو [[yq -o=yaml f.json]] |
| YAML ← JSON | [[json.dumps(yaml.safe_load(f), ensure_ascii=False, indent=2)]] أو [[yq -o=json f.yaml]] |

~~~text خلي بالك من
allow_unicode / ensure_ascii   عشان العربي
sort_keys=False                عشان الترتيب
safe_load مش load              للملفات اللي من بره
التعليقات والـ anchors          بتضيع
مشكلة النرويج                   بتحصل في الـ parse قبل التحويل
~~~`,
          lines: [
            R`JSON لـ YAML بـ Python، والعربي سليم والترتيب زي ما هو.`,
            R`أول سطور الـ YAML الناتج.`,
            R`YAML لـ JSON منسق.`,
            R`[[yq]]: جزء من الملف كـ JSON.`,
            R`قيمة واحدة.`,
            R`جزء من JSON كـ YAML.`
          ],
          sol: R`الناتج الحقيقي:
[[id: 42]]
[[name: سارة أحمد]]
[[email: sara@example.com]]
[[active: true]]
وفي [[user.yaml]] الرقم البريدي اتكتب [[zip: '11511']] بتنصيص لوحده، عشان ميتقريش رقم.
والـ YAML لـ JSON بيطلّع [["app": {"name": "gym-portal", "port": 3000, "debug": false, "version": "1.10"}]] (منسق).
[[yq -o=json '.app']] ← نفس الـ object بتاع [[app]].
[[yq '.app.port']] ← [[3000]]
[[yq -o=yaml '.address']] ← [[city: القاهرة]] و [[zip: "11511"]]

و [[norway.yaml]]: [[NO]] بتوصل JSON [[false]]، و [[22:22]] بتوصل [[1342]]، والتاريخ بيوقّع [[json.dumps]] إلا مع [[default=str]].`
        },
        {
          cmd: "CSV إلى JSON",
          title: "تحوّل CSV لـ JSON والعكس إزاي، ومن غير ما الـ BOM والتنصيص يبوّظوا الداتا؟",
          desc: R`CSV جدول مسطح (صفوف بنفس الأعمدة) و JSON بيقبل أي شكل. التحويل الطبيعي: كل صف يبقى object، والمفاتيح من الـ header: [[[{"id": "1", "name": "سارة"}, ...]]]. ده اللي هتحتاجه لما عميل يبعتلك Excel وانت عايز تعمله import في قاعدة البيانات أو API.

الأدوات:
• Python: [[csv.DictReader]] بيعمل كل صف dict بالمفاتيح من أول سطر، وبيفهم التنصيص و [[""]] صح (درس [[.csv]]). وبعدين [[json.dumps]].
• [[jq]] للعكس (JSON لـ CSV): [[jq -r '.[] | [.id, .name] | @csv' file.json]]. الـ [[@csv]] بيعمل التنصيص صح لوحده.
• Miller ([[mlr --icsv --ojson cat file.csv]]): أداة مخصوص للتحويل بين CSV و TSV و JSON.
• في JS: [[papaparse]] أو [[csv-parse]] (متكتبش parser بنفسك في production).
• Excel نفسه أو Google Sheets: File ثم Download ثم CSV.

مشاكل لازم تاخد بالك منها:
• الـ BOM: ملف Excel محفوظ «CSV UTF-8» بيبدأ بـ BOM، فأول مفتاح بيبقى [["﻿id"]] مش [["id"]] وكل [[row["id"]]] يرجع فاضي. الحل في Python: [[encoding="utf-8-sig"]].
• الأنواع: CSV مفيهوش أنواع، فكل القيم بتطلع نصوص ([["1"]] مش [[1]]). حوّل الأعمدة اللي محتاجها بنفسك، ومتحوّلش التليفونات والأكواد لأرقام (الصفر هيضيع).
• القيم الفاضية: [[""]] ولا [[null]]؟ قرر وكون ثابت.
• الفاصل: ملفات Excel من بلاد بتستخدم الفاصلة في الكسور بتطلع بـ [[;]]. و [[csv.Sniffer]] في Python بيخمّن.
• الترميز: ملف قديم Windows-1256 لازم يتحوّل الأول ([[iconv]]، درس UTF-8).
• الحجم: ملف بملايين الصفوف متحمّلوش كله في الذاكرة: اقراه صف صف (DictReader بيعمل كده) واكتب JSON Lines (درس [[.jsonl]]).`,
          example: R`python3 -c 'import csv, json; print(json.dumps(list(csv.DictReader(open("excel.csv", encoding="utf-8-sig"))), ensure_ascii=False, indent=2))' > customers.json
head -8 customers.json
python3 -c 'import csv; print(list(csv.DictReader(open("excel.csv", encoding="utf-8")))[0].keys())'
jq 'map(select(.city == "الجيزة")) | length' customers.json
jq -r '.[] | [.id, .name, .city] | @csv' customers.json`,
          try: R`استخدم [[customers.csv]] و [[excel.csv]] (النسخة اللي بالـ BOM) من درس [[.csv]] ونفّذ المثال. قارن السطر التالت بـ [[utf-8]] و [[utf-8-sig]]. بعدين عدّل الكود يحوّل [[id]] لرقم ويسيب [[phone]] نص. وآخر حاجة حل التمرين: parser كامل يحوّل نص CSV لـ array من objects.`,
          deep: {
            why: R`الداتا في الشركات عايشة في Excel، والبرامج عايزة JSON. التحويل ده بيحصل كل يوم، وأغلب الـ bugs فيه مش في الكود نفسه، في التفاصيل: BOM، وتنصيص، وأصفار بتضيع، وفواصل مختلفة.`,
            how: R`[[DictReader]] بيقرا أول صف كأسامي، وبعدين لكل صف بيعمل [[zip]] بين الأسامي والقيم. لو الصف فيه قيم أكتر أو أقل بيحط [[None]] أو مفتاح [[None]]. و [[@csv]] في jq بيحط كل قيمة نصية بين [["]] ويضاعف أي [["]] جواها، والأرقام من غير تنصيص.`,
            when: R`import من Excel أو Google Sheets لقاعدة البيانات، و export لتقارير، و seed داتا للتجربة.`,
            mistakes: R`تنسى [[utf-8-sig]] فأول عمود يختفي من غير أي error. تحوّل كل الأعمدة لأرقام فـ [["01012345678"]] تبقى [[1012345678]]. تقسم بـ [[split(",")]]. وتفتح الـ CSV الناتج في Excel من غير BOM فالعربي يبوظ (درس [[.csv]]).`
          },
          teach: R`## الفكرة في سطرين

المثال بياخد [[excel.csv]] (نسخة فيها BOM من درس [[.csv]]) ويحوّله JSON: كل صف بيبقى object، والمفاتيح من أول سطر (الـ header). وبعدين يوريك إزاي الـ BOM بيخرب أول عمود لو متعاملتش معاه، ويرجّع من JSON لـ CSV بـ [[jq]].

الأوامر اتشغّلت على أوبونتو 24.04 (جوه Docker، Python 3.12 و jq 1.7)، وجزء منها على ويندوز بـ Python 3.14 و PowerShell. اشتغل في فولدر فيه [[excel.csv]].

---

## ١. CSV لـ JSON: السطر الأساسي

~~~bash
python3 -c 'import csv, json; print(json.dumps(list(csv.DictReader(open("excel.csv", encoding="utf-8-sig"))), ensure_ascii=False, indent=2))' > customers.json
~~~

نفكّه من جوه لبرة:

### [[open("excel.csv", encoding="utf-8-sig")]]

يفتح الملف. [[encoding="utf-8-sig"]] هي السر: يعني «UTF-8 ومعاها signature»، فلو الملف بادئ بـ BOM بيشيله. (BOM = Byte Order Mark، تلات bytes [[EF BB BF]] بيحطها Excel في أول الملف. درس UTF-8.)

### [[csv.DictReader(...)]]

[[DictReader]] بيقرا CSV ويعمل كل صف [[dict]] (object) بالمفاتيح من أول سطر. وبيفهم التنصيص والفواصل جوه الـ quotes صح (مش بيقسم بـ [[split(",")]]). Dict = dictionary = الـ object في Python.

### [[list(...)]]

[[DictReader]] بيطلّع صف ورا صف. [[list]] بيجمعهم كلهم في قايمة.

### [[json.dumps(..., ensure_ascii=False, indent=2)]]

يحوّلهم JSON نص: [[ensure_ascii=False]] للعربي، و [[indent=2]] للتنسيق. و [[> customers.json]] يحفظ.

~~~text head -8 customers.json
[
  {
    "id": "1",
    "name": "سارة أحمد",
    "city": "القاهرة",
    "phone": "01012345678",
    "notes": "عميلة جديدة"
  },
~~~

لاحظ: كل القيم **نصوص** (بين quotes)، حتى [[id]] و [[phone]]. ليه؟ لأن CSV مفيهوش أنواع أصلًا، كل حاجة فيه نص. لو عايز [[id]] رقم، حوّله بنفسك بـ [[int(row["id"])]]. ومتحوّلش [[phone]] لرقم أبدًا: [["01012345678"]] هتبقى [[1012345678]] والصفر الأول يضيع.

---

## ٢. ليه [[utf-8-sig]] مهمة: نشوف الفرق

~~~bash
python3 -c 'import csv; print(list(csv.DictReader(open("excel.csv", encoding="utf-8")))[0].keys())'
~~~

هنا قرينا بـ [[utf-8]] العادية (من غير [[-sig]]):

~~~text الناتج
dict_keys(['﻿id', 'name', 'city', 'phone', 'notes'])
~~~

اسم أول مفتاح بقى [['﻿id']] مش [['id']]: الـ BOM ([[﻿]]) اتعجن في أول المفتاح! يعني [[row["id"]]] هيرجع [[None]] لأن المفتاح الحقيقي اسمه [[﻿id]]، والعمود كأنه اختفى من غير أي error. بـ [[utf-8-sig]] المفتاح بيطلع [['id']] نضيف.

على ويندوز PowerShell فيه [[Import-Csv]] جاهز بيعمل نفس الحاجة ويتعامل مع الـ BOM لوحده:

~~~powershell
Import-Csv excel.csv | ConvertTo-Json
~~~

جرّبناه في PowerShell 7 و 5.1، وطلّع نفس الصفوف صح، والعربي سليم، وأول مفتاح [[id]] نضيف.

---

## ٣. فلترة على الـ JSON بـ [[jq]]

~~~bash
jq 'map(select(.city == "الجيزة")) | length' customers.json
~~~

- [[jq]]: أداة معالجة JSON من الترمنال.
- [[map(...)]]: اعمل العملية دي على كل عنصر في الـ array.
- [[select(.city == "الجيزة")]]: سيب الصفوف اللي مدينتها الجيزة بس.
- [[| length]]: وبعدين عدّهم.

~~~text الناتج
1
~~~

يعني عميل واحد في الجيزة (Ali, Jr.).

---

## ٤. العكس: JSON لـ CSV بـ [[jq]]

~~~bash
jq -r '.[] | [.id, .name, .city] | @csv' customers.json
~~~

- [[-r]]: raw، اطبع النص من غير quotes حوالين السطر كله.
- [[.[]]]: فك الـ array لعناصر، واحد ورا التاني.
- [[[.id, .name, .city]]]: من كل عنصر اعمل array صغير بالتلات قيم دول.
- [[@csv]]: حوّل الـ array لسطر CSV، والتنصيص بيتعمل لوحده صح.

~~~text الناتج
"1","سارة أحمد","القاهرة"
"2","Ali, Jr.","الجيزة"
"3","منى","الإسكندرية"
~~~

شوف [[Ali, Jr.]]: فيه فاصلة جواه، و [[@csv]] حطّه بين quotes لوحده فالفاصلة دي مبقتش فاصل أعمدة. ده اللي بيفرّق أداة صح عن [[split(",")]] اليدوي.

---

## عن التمرين

التمرين بيطلب منك تكتب الـ parser بنفسك (في JS). ده أصعب مما يبدو، فكّر في:
- **الفاصلة جوه التنصيص**: [["Ali, Jr."]] قيمة واحدة مش اتنين.
- **التنصيص المضاعف** [[""]] جوه الـ quotes معناه علامة تنصيص واحدة في القيمة.
- **الـ BOM** في أول أول الملف لازم يتشال من اسم أول مفتاح.
- **نهايات سطور ويندوز** [[\r\n]].
- **السطر الفاضي في الآخر** يتجاهل.

في الشغل الحقيقي استخدم مكتبة جاهزة ([[papaparse]] أو [[csv-parse]])، بس التمرين ده عشان تفهم إيه اللي بيحصل جواها.

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[csv.DictReader(open(f, encoding="utf-8-sig"))]] | كل صف object، والـ BOM يتشال |
| [[json.dumps(list(...), ensure_ascii=False)]] | يطلّعهم JSON |
| [[Import-Csv]] | نفس الحاجة على ويندوز |
| [[jq 'map(select(...))']] | فلترة على الـ JSON |
| [[jq -r '.[] | [...] | @csv']] | يرجّع CSV بتنصيص صح |

~~~text خلي بالك من
utf-8-sig       عشان الـ BOM ميخربش أول عمود
كله نص           CSV مفيهوش أنواع، حوّل اللي محتاجه بنفسك
التليفونات        سيبها نص، الصفر بيضيع لو بقت رقم
@csv / مكتبة      متقسمش بـ split(",")
~~~`,
          lines: [
            R`CSV لـ JSON: كل صف object، و [[utf-8-sig]] بيشيل الـ BOM.`,
            R`أول object.`,
            R`من غير [[-sig]]: اسم أول عمود فيه BOM.`,
            R`فلترة على الـ JSON بـ jq: كام عميل في الجيزة.`,
            R`العكس: JSON لـ CSV، و [[@csv]] بيعمل التنصيص صح.`
          ],
          sol: R`الناتج الحقيقي:
[[[]]
[[  {]]
[[    "id": "1",]]
[[    "name": "سارة أحمد",]]
[[    "city": "القاهرة",]]
[[    "phone": "01012345678",]]
[[    "notes": "عميلة جديدة"]]
[[dict_keys(['﻿id', 'name', 'city', 'phone', 'notes'])]] (شايف الـ [[﻿]]؟)
[[1]]
[["1","سارة أحمد","القاهرة"]]
[["2","Ali, Jr.","الجيزة"]]
[["3","منى","الإسكندرية"]]
لاحظ إن [[Ali, Jr.]] اتنصّصت صح، وإن [[id]] نص لأن CSV مفيهوش أرقام.`,
          check: {
            lang: "js",
            starter: R`// csvToObjects: حوّل نص CSV كامل لـ array من objects (المفاتيح من أول سطر)
// لازم: التنصيص و "" ، والـ BOM في أول الملف، ونهايات سطور \r\n، وتجاهل السطر الفاضي في الآخر
// كل القيم تفضل نصوص
function csvToObjects(text) {
  const [header, ...rows] = text.split("\n");
  const keys = header.split(",");
  return rows.map((row) => Object.fromEntries(row.split(",").map((v, i) => [keys[i], v])));
}`,
            tests: R`test("ملف بسيط", () => expect(csvToObjects("id,name\n1,سارة\n2,علي")).toEqual([{ id: "1", name: "سارة" }, { id: "2", name: "علي" }]));
test("السطر الفاضي في الآخر يتجاهل", () => expect(csvToObjects("id,name\n1,سارة\n").length).toBe(1));
test("فاصلة و \"\" جوه التنصيص", () => expect(csvToObjects('id,name,notes\n2,"Ali, Jr.","قال ""شكرًا"""')).toEqual([{ id: "2", name: "Ali, Jr.", notes: 'قال "شكرًا"' }]));
test("BOM في أول الملف ميدخلش في اسم أول مفتاح", () => expect(Object.keys(csvToObjects("﻿id,name\n1,x")[0])).toEqual(["id", "name"]));
test("نهايات سطور ويندوز", () => expect(csvToObjects("id,city\r\n1,القاهرة\r\n")).toEqual([{ id: "1", city: "القاهرة" }]));
test("قيم فاضية تفضل \"\"", () => expect(csvToObjects("a,b,c\n1,,\n")).toEqual([{ a: "1", b: "", c: "" }]));`,
            solution: R`function csvToObjects(text) {
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1);
  const parseLine = (line) => {
    const out = [];
    let cur = "", q = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (q) {
        if (ch === '"' && line[i + 1] === '"') { cur += '"'; i++; }
        else if (ch === '"') q = false;
        else cur += ch;
      } else if (ch === '"') q = true;
      else if (ch === ",") { out.push(cur); cur = ""; }
      else cur += ch;
    }
    out.push(cur);
    return out;
  };
  const lines = text.split(/\r?\n/).filter((l) => l !== "");
  const keys = parseLine(lines[0]);
  return lines.slice(1).map((l) => {
    const vals = parseLine(l);
    return Object.fromEntries(keys.map((k, i) => [k, vals[i] ?? ""]));
  });
}`
          }
        },
        {
          cmd: "قراءة XML",
          title: "تقرا XML وتطلّع منه داتا من الكود إزاي (Python و PowerShell و XPath و JS)؟",
          desc: R`لما تستلم XML (فاتورة من نظام قديم، RSS، sitemap، [[pom.xml]]، رد SOAP) وعايز تطلّع منه داتا، متستخدمش regex ولا [[split]]. استخدم parser بيبني الشجرة.

Python ([[xml.etree.ElementTree]]، جاي مع Python):
• [[root = ET.parse("order.xml").getroot()]]: الـ root.
• [[root.get("id")]]: attribute (بيرجع نص دايمًا، حوّله بـ [[int()]]).
• [[root.findtext("customer/name")]]: نص element بمسار.
• [[root.find("x")]] أول واحد، و [[root.findall("items/item")]] الكل، و [[root.iter("item")]] في أي عمق.
• مع namespaces: [[root.find("a:title", {"a": "http://..."})]] (درس xmlns).
• للملفات اللي جاية من بره (يوزرز، النت): [[defusedxml]] بدل ET، عشان هجمات زي XXE و «billion laughs».

PowerShell (ويندوز، وكمان pwsh على لينكس والماك): [[[xml]]] بيحوّل النص لـ object وتمشي فيه بالنقط:
• [[[xml]$o = Get-Content order.xml -Raw -Encoding utf8]]
• [[$o.order.customer.name]] و [[$o.order.id]] (الـ attribute والـ element بنفس الطريقة).
• [[$o.order.items.item]] ليستة لو متكرر.
• [[$o.order.total.InnerText]] لو العنصر عليه attributes ونص مع بعض.

XPath من الترمنال: [[xmllint --xpath 'string(/order/customer/name)' order.xml]]، و [[//item/@sku]] كل الـ sku، و [[sum(//item/@price)]] و [[count(//item)]].

JavaScript:
• المتصفح: [[new DOMParser().parseFromString(text, "application/xml")]] وبعدين [[querySelector]] زي HTML.
• Node: مفيش parser جاهز، استخدم [[fast-xml-parser]] (بيحوّله object على طول) أو [[xml2js]].

وفي الآخر غالبًا بتحوّل اللي طلّعته لـ JSON عشان باقي الكود.`,
          example: R`python3 -c 'import xml.etree.ElementTree as ET; r = ET.parse("order.xml").getroot(); print(r.get("id"), r.findtext("customer/name"), [i.get("sku") for i in r.iter("item")])'
pwsh -c '[xml]$o = Get-Content order.xml -Raw -Encoding utf8; $o.order.customer.name; $o.order.total.currency'
xmllint --xpath 'count(//item)' order.xml
xmllint --xpath 'sum(//item/@price)' order.xml`,
          try: R`على [[order.xml]] من درس [[.xml]] نفّذ المثال (PowerShell على ويندوز اكتب [[powershell]] أو [[pwsh]]). بعدين اكتب سكربت Python بيحوّل الطلب كله لـ JSON: [[{"id": 1024, "customer": "...", "items": [{"sku": ..., "qty": ..., "price": ...}], "total": 620}]] (الأرقام أرقام مش نصوص). وفي المتصفح جرّب [[new DOMParser().parseFromString("<a><b>hi</b></a>", "application/xml").querySelector("b").textContent]] في الـ Console.`,
          deep: {
            why: R`XML ليه قواعد كتير (entities و CDATA و namespaces و comments)، و regex مبيفهمش أي حاجة فيهم فبيكسر أول ما الملف يتغير شوية. الـ parser بيتعامل مع كل ده ويديك شجرة نضيفة.`,
            how: R`ET بيقرا الملف كله ويبني شجرة من objects ([[Element]])، كل واحد فيه [[tag]] و [[attrib]] و [[text]] و children. و [[find]] بيقبل مسارات بسيطة (subset من XPath). و PowerShell بيستخدم [[System.Xml.XmlDocument]] بتاع .NET ويعرض العناصر كخصائص، عشان كده [[$o.order.customer.name]] شغالة.`,
            when: R`استيراد داتا من أنظمة قديمة، وقراية RSS و sitemaps، وتعديل [[pom.xml]] أو [[.csproj]] أو [[AndroidManifest.xml]] من سكربت (رفع رقم النسخة في CI مثلًا).`,
            mistakes: R`regex على XML. تنسى إن [[get()]] و [[findtext()]] بيرجعوا نص فتجمع [["2" + "1"]]. تنسى الـ namespace فكل [[find]] يرجع [[None]]. وتقرا XML من يوزرز بـ ET العادي (XXE).`
          },
          teach: R`## الفكرة في سطرين

المثال بياخد [[order.xml]] (درس [[.xml]]) ويطلّع منه داتا بأربع طرق: Python ([[ElementTree]])، و PowerShell ([[[xml]]])، و XPath من الترمنال ([[xmllint]]). الفكرة الواحدة في كلهم: الـ parser بيبني **شجرة** من الملف، وانت بتمشي في الشجرة بمسار بدل ما تدوّر في النص بـ regex.

الـ XML ده:

~~~xml order.xml
<order id="1024" status="paid">
  <customer>
    <name>سارة أحمد</name>
    <email>sara@example.com</email>
  </customer>
  <items>
    <item sku="TSH-01" qty="2" price="250"/>
    <item sku="MUG-07" qty="1" price="120"/>
  </items>
  <total currency="EGP">620</total>
</order>
~~~

فيه نوعين معلومات: **element** (تاج زي [[<name>سارة أحمد</name>]])، و **attribute** (جوه فتحة التاج زي [[id="1024"]] و [[sku="TSH-01"]]). الفرق ده مهم عشان كل أداة بتوصلهم بطريقة مختلفة.

الأوامر اتشغّلت على ويندوز بـ Python 3.14 و PowerShell 7. جزء الـ XPath اتأكدنا منه بمحرك libxml2 (نفس محرك [[xmllint]]) على نفس الملف.

---

## ١. Python: [[ElementTree]]

~~~bash
python3 -c 'import xml.etree.ElementTree as ET; r = ET.parse("order.xml").getroot(); print(r.get("id"), r.findtext("customer/name"), [i.get("sku") for i in r.iter("item")])'
~~~

- [[import xml.etree.ElementTree as ET]]: المكتبة (جاية مع Python)، وسمّيناها [[ET]] اختصار.
- [[ET.parse("order.xml")]]: اقرا الملف وابني الشجرة.
- [[.getroot()]]: هات العنصر الجذر ([[<order>]]). سمّيناه [[r]].
- [[r.get("id")]]: هات **attribute** اسمه [[id]] من [[<order>]]. بيرجع نص دايمًا.
- [[r.findtext("customer/name")]]: هات **نص element** بمسار: ادخل [[customer]] وبعدها [[name]]، وهات النص اللي جواها.
- [[[i.get("sku") for i in r.iter("item")]]]: [[r.iter("item")]] بيلف على **كل** عنصر [[<item>]] في أي عمق، وبنجمع الـ [[sku]] بتاع كل واحد في list.

~~~text الناتج
1024 سارة أحمد ['TSH-01', 'MUG-07']
~~~

> [[get]] للـ attributes و [[findtext]] للنصوص، والاتنين بيرجعوا **نص**. فلو جمعت [[r.get("qty")]] مع رقم، لازم [[int(...)]] الأول، وإلا [["2" + "1"]] تبقى [["21"]].

فيه كمان [[r.find("x")]] (أول عنصر بالاسم ده) و [[r.findall("items/item")]] (كل العناصر في المسار ده).

---

## ٢. PowerShell: [[[xml]]]

~~~powershell
[xml]$o = Get-Content order.xml -Raw -Encoding utf8
$o.order.customer.name
$o.order.total.currency
~~~

- [[Get-Content order.xml -Raw -Encoding utf8]]: اقرا الملف كله نص واحد ([[-Raw]]) بترميز UTF-8.
- [[[xml]$o = ...]]: [[[xml]]] بتقول لـ PowerShell «حوّل النص ده لشجرة XML». بعدها [[$o]] بقى object تمشي فيه بالنقط.
- [[$o.order.customer.name]]: ادخل [[order]] ثم [[customer]] ثم [[name]]. لاحظ إن الـ element والـ attribute بنفس الطريقة بالنقطة.
- [[$o.order.total.currency]]: [[currency]] هنا **attribute** على [[<total>]]، وبرضه بالنقطة.

~~~text الناتج
سارة أحمد
EGP
~~~

ولو العنصر متكرر (زي [[item]])، بترجع ليستة تلف عليها:

~~~powershell
$o.order.items.item | ForEach-Object { "{0} x{1} = {2}" -f $_.sku, $_.qty, ([int]$_.qty * [int]$_.price) }
~~~

- [[$o.order.items.item]]: ليستة الـ [[<item>]].
- [[ForEach-Object { ... }]]: نفّذ ده لكل عنصر، و [[$_]] هو العنصر الحالي.
- [["{0} x{1} = {2}" -f ...]]: [[-f]] بيحط القيم مكان [[{0}]] و [[{1}]] و [[{2}]].
- [[[int]$_.qty * [int]$_.price]]: حوّل النص لرقم الأول (زي [[int()]] في Python) وبعدين اضرب.

~~~text الناتج
TSH-01 x2 = 500
MUG-07 x1 = 120
~~~

> لو العنصر عليه attributes **ونص مع بعض**، [[$o.order.total]] هترجع الـ object مش النص؛ استخدم [[$o.order.total.InnerText]] عشان النص (هنا [[620]]).

---

## ٣. XPath من الترمنال: [[xmllint]]

XPath لغة اختيار من XML، زي المسارات بس أقوى.

~~~bash
xmllint --xpath 'count(//item)' order.xml
~~~

- [[--xpath 'تعبير']]: نفّذ تعبير XPath.
- [[//item]]: كل عنصر [[<item>]] في أي مكان في الملف ([[//]] يعني «في أي عمق»).
- [[count(...)]]: عدّهم.

~~~text الناتج
2
~~~

~~~bash
xmllint --xpath 'sum(//item/@price)' order.xml
~~~

- [[//item/@price]]: الـ attribute [[price]] بتاع كل [[<item>]] ([[@]] معناها attribute).
- [[sum(...)]]: اجمعهم.

~~~text الناتج
370
~~~

انتبه: [[370]] هي مجموع **سعر الوحدة** (250 + 120)، مش إجمالي الفاتورة (620 اللي في [[<total>]]). XPath جمع الـ attributes زي ما طلبنا بالظبط. وفيه كمان [[//item/@sku]] (كل الـ sku) و [[string(/order/customer/name)]] (نص بمسار من الجذر).

> [[xmllint]] بييجي مع الماك، وعلى أوبونتو من حزمة [[libxml2-utils]]، وعلى ويندوز مش موجود جاهز (استخدم Python أو PowerShell، أو Git Bash لو فيه). اللي في الدرس ده اتأكدنا منه بنفس محرك libxml2.

---

## ٤. وفي الآخر: حوّله JSON

غالبًا بتطلّع من XML عشان تكمّل بالـ JSON. سكربت Python:

~~~bash
python3 -c 'import xml.etree.ElementTree as ET, json; r=ET.parse("order.xml").getroot(); o={"id":int(r.get("id")),"customer":r.findtext("customer/name"),"items":[{"sku":i.get("sku"),"qty":int(i.get("qty")),"price":int(i.get("price"))} for i in r.iter("item")],"total":float(r.findtext("total"))}; print(json.dumps(o, ensure_ascii=False))'
~~~

لاحظ [[int(...)]] و [[float(...)]] عشان الأرقام تبقى أرقام مش نصوص:

~~~text الناتج
{"id": 1024, "customer": "سارة أحمد", "items": [{"sku": "TSH-01", "qty": 2, "price": 250}, {"sku": "MUG-07", "qty": 1, "price": 120}], "total": 620.0}
~~~

---

## ليه parser مش regex

XML فيه قواعد كتير: [[&amp;]] بدل [[&]] (entities)، و CDATA لنص فيه رموز، و namespaces، وتعليقات. الـ regex مبيفهمش أي حاجة فيهم، فبيكسر أول ما الملف يتغير شوية. الـ parser بيفهمهم كلهم ويديك شجرة نضيفة.

ولو الـ XML جاي من **بره** (يوزر، النت): استخدم [[defusedxml]] في Python بدل [[ET]]، عشان هجمات زي XXE و «billion laughs» اللي بتستغل الـ entities.

---

## الخلاصة

| عايز | Python | PowerShell | XPath |
|---|---|---|---|
| attribute | [[r.get("id")]] | [[$o.order.id]] | [[//order/@id]] |
| نص element | [[r.findtext("a/b")]] | [[$o.a.b]] | [[string(/a/b)]] |
| كل العناصر | [[r.iter("item")]] | [[$o...item]] (ليستة) | [[//item]] |
| عدّهم | [[len(r.findall(...))]] | [[.Count]] | [[count(//item)]] |

~~~text خلي بالك من
get/findtext بيرجعوا نص   حوّل بـ int()/float() قبل الحساب
XXE                       للملفات من بره: defusedxml
مفيش regex على XML
~~~`,
          lines: [
            R`Python: attribute ونص بمسار وكل الـ sku.`,
            R`PowerShell: [[[xml]]] بيحوّل الملف object وتمشي فيه بالنقط.`,
            R`XPath: عدد العناصر.`,
            R`XPath: مجموع attribute في كل العناصر (سعر الوحدة مش الإجمالي).`
          ],
          sol: R`الناتج الحقيقي:
[[1024 سارة أحمد ['TSH-01', 'MUG-07']]]
[[سارة أحمد]]
[[EGP]]
[[2]]
[[370]]

وسكربت التحويل لـ JSON بيطلّع:
[[{"id": 1024, "customer": "سارة أحمد", "items": [{"sku": "TSH-01", "qty": 2, "price": 250}, {"sku": "MUG-07", "qty": 1, "price": 120}], "total": 620.0}]]
وفي PowerShell كمان: [[$o.order.items.item | ForEach-Object { "{0} x{1} = {2}" -f $_.sku, $_.qty, ([int]$_.qty * [int]$_.price) }]] بيطبع [[TSH-01 x2 = 500]] و [[MUG-07 x1 = 120]].`
        },
        {
          cmd: "JSON Schema",
          title: "تتأكد إن JSON مش بس سليم، لأ كمان شكله صح (المفاتيح والأنواع) إزاي؟",
          desc: R`[[jq empty]] بيقولك الـ JSON مكتوب صح (syntax). بس مش بيقولك إن [["id"]] رقم، ولا إن [["email"]] موجود، ولا إن [["roles"]] قيمها من ليستة معيّنة. ده شغل JSON Schema: ملف JSON بيوصف شكل JSON تاني، وأداة بتقارن.

أهم الكلمات في الـ schema:
• [["$schema"]]: نسخة المعيار (2020-12 هي الأحدث).
• [["type"]]: [["object"]] و [["array"]] و [["string"]] و [["number"]] و [["integer"]] و [["boolean"]] و [["null"]].
• [["properties"]]: لكل مفتاح الـ schema بتاعه.
• [["required"]]: المفاتيح الإجبارية.
• [["additionalProperties": false]]: ممنوع مفاتيح مش مذكورة (بيمسك الأخطاء الإملائية في أسامي المفاتيح).
• قيود: [["minimum"]] و [["maximum"]] للأرقام، و [["minLength"]] و [["pattern"]] (regex) و [["format": "email"]] للنصوص، و [["enum"]] ليستة قيم مسموحة، و [["items"]] شكل كل عنصر في array.

فين بتستخدمه:
• VS Code: لو أول مفتاح في الـ JSON [["$schema": "..."]]، أو الملف اسمه معروف ([[package.json]] و [[tsconfig.json]] و [[compose.yaml]] و GitHub workflows)، المحرر بيجيب الـ schema من SchemaStore ويكمّلك المفاتيح ويعلّم على الغلط. ده اللي بيخليك تشوف خط أحمر لو كتبت [["scripts": 5]] في package.json.
• الـ APIs: تتأكد من الـ body اللي جايلك ([[ajv]] في Node، و Fastify بيستخدمه جوه). و OpenAPI بيوصف الـ API كله بـ JSON Schema.
• ملفات إعدادات أداتك.
• في TypeScript: [[zod]] بيعمل نفس الفكرة بكود، وممكن يطلّع JSON Schema.

الأدوات: [[ajv-cli]] ([[npx ajv-cli validate]]) و [[check-jsonschema]] (Python) و [[jsonschema]] (مكتبة Python).`,
          example: R`{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "User",
  "type": "object",
  "required": ["id", "name", "email"],
  "properties": {
    "id": { "type": "integer", "minimum": 1 },
    "name": { "type": "string", "minLength": 2 },
    "email": { "type": "string", "format": "email" },
    "active": { "type": "boolean" },
    "roles": { "type": "array", "items": { "enum": ["admin", "editor", "member"] } }
  },
  "additionalProperties": true
}`,
          flag: "script",
          try: R`احفظ المثال في [[user.schema.json]]، واعمل [[bad-user.json]] فيه [[{"id": "42", "name": "S", "roles": ["owner"]}]]. اتحقق من الاتنين ([[user.json]] من درس [[.json]] والبايظ):
[[npx -p ajv-cli@5 -p ajv-formats@3 ajv validate --spec=draft2020 -c ajv-formats -s user.schema.json -d user.json]]
وللبايظ ضيف [[--all-errors --errors=text]]. وبعدين في VS Code ضيف [["$schema": "./user.schema.json"]] كأول مفتاح في [[bad-user.json]] وشوف الخطوط الحمرا.`,
          deep: {
            why: R`أغلب الأخطاء الحقيقية مش syntax: مفتاح ناقص، أو رقم جه string، أو قيمة مش مسموحة. من غير schema بتكتشفها لما البرنامج يقع في production. الـ schema بيحوّل «الشكل المتوقع» لملف يتفحص أوتوماتيك ويتوثق.`,
            how: R`الـ validator بيمشي على الداتا والـ schema مع بعض: لكل قيمة بيشيك على الـ [[type]] والقيود، ويدخل جوه الـ [[properties]] والـ [[items]]، ويجمع كل مخالفة بمسارها ([[data/roles/0]]). و [[format]] (زي email) مش بيتشيك افتراضيًا في ajv غير لو ضفت [[ajv-formats]].`,
            when: R`تتأكد من body الـ API، وملفات إعدادات معقدة، وداتا جاية من مصدر خارجي، وكمان عشان المحرر يكمّلك وانت بتكتب.`,
            mistakes: R`تفتكر إن [[jq empty]] كفاية. تنسى [["required"]] فالـ schema يعدّي object فاضي. تحط [["additionalProperties": false]] على API عام فأي حقل جديد من العميل يتعمله reject (قرر حسب الحالة). وتكتب [[format]] وتفتكر إنه بيتفحص من غير ajv-formats.`
          },
          teach: R`## الفكرة في سطرين

[[jq empty]] بيقولك الـ JSON **مكتوب** صح (أقواس وفواصل مظبوطة). بس مش بيقولك إن [[id]] رقم ولا إن [[email]] موجود. الـ schema ده ملف JSON بيوصف **شكل** JSON تاني (المفاتيح وأنواعها والإجباري منها)، وأداة بتقارن الاتنين وتقولك المخالفات.

المثال نفسه هو ملف الـ schema. هنفكّه مفتاح مفتاح، وبعدين نشغّله على [[user.json]] السليم وعلى ملف بايظ.

التشغيل اتعمل على ويندوز بـ Node، بأداة [[ajv]] عن طريق [[npx]] (مفيش تسطيب دايم).

---

## الـ schema سطر سطر

~~~json user.schema.json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "User",
  "type": "object",
  "required": ["id", "name", "email"],
  "properties": {
    "id": { "type": "integer", "minimum": 1 },
    "name": { "type": "string", "minLength": 2 },
    "email": { "type": "string", "format": "email" },
    "active": { "type": "boolean" },
    "roles": { "type": "array", "items": { "enum": ["admin", "editor", "member"] } }
  },
  "additionalProperties": true
}
~~~

| المفتاح | معناه |
|---|---|
| [["$schema"]] | نسخة معيار JSON Schema اللي بنكتب بيها. [[2020-12]] هي الأحدث |
| [["title"]] | اسم للتوثيق بس، مبيأثرش على الفحص |
| [["type": "object"]] | الداتا لازم تبقى object (مش array ولا رقم) |
| [["required"]] | المفاتيح اللي **لازم** تكون موجودة: [[id]] و [[name]] و [[email]] |
| [["properties"]] | لكل مفتاح، الوصف بتاعه (تحت) |
| [["additionalProperties": true]] | مسموح مفاتيح زيادة مش مذكورة (زي [[address]] و [[orders]] في [[user.json]]). لو حطيتها [[false]] أي مفتاح زيادة بيبقى غلط |

وجوه [[properties]]:

| المفتاح | القيد |
|---|---|
| [["id": { "type": "integer", "minimum": 1 }]] | رقم صحيح وأكبر من أو يساوي 1. [["42"]] كنص **مش** هيعدّي |
| [["name": { "type": "string", "minLength": 2 }]] | نص حرفين على الأقل |
| [["email": { "type": "string", "format": "email" }]] | نص بصيغة إيميل. [[format]] محتاج إضافة ([[ajv-formats]]) عشان يتفحص فعلًا |
| [["active": { "type": "boolean" }]] | [[true]] أو [[false]] |
| [["roles": { "type": "array", "items": { "enum": [...] } }]] | array، وكل عنصر فيها لازم يكون واحد من التلاتة دول بس ([[enum]] = قايمة قيم مسموحة) |

---

## نفحص الملف السليم

~~~bash
npx -p ajv-cli@5 -p ajv-formats@3 ajv validate --spec=draft2020 -c ajv-formats -s user.schema.json -d user.json
~~~

نفك الأمر:

| الحتة | معناها |
|---|---|
| [[npx]] | يشغّل أداة من npm من غير تسطيب دايم |
| [[-p ajv-cli@5 -p ajv-formats@3]] | نزّل الحزمتين دول مؤقتًا: الأداة، وإضافة الـ [[format]] |
| [[ajv validate]] | الأمر: افحص |
| [[--spec=draft2020]] | استخدم معيار 2020-12 (زي ما في [[$schema]]) |
| [[-c ajv-formats]] | فعّل إضافة الـ formats (عشان [[email]] يتفحص) |
| [[-s user.schema.json]] | ملف الـ schema |
| [[-d user.json]] | ملف الداتا اللي هنفحصه |

~~~text الناتج
user.json valid
~~~

[[user.json]] فيه مفاتيح زيادة ([[balance]] و [[address]] و [[orders]])، بس عدّى لأن [[additionalProperties: true]].

> أول مرة [[npx]] بيطبع تحذيرات [[npm warn deprecated]] من مكتبات قديمة جوه [[ajv-cli]]، عادي ومش بيأثر.

---

## نفحص ملف بايظ

~~~bash
echo '{"id": "42", "name": "S", "roles": ["owner"]}' > bad-user.json
npx -p ajv-cli@5 -p ajv-formats@3 ajv validate --spec=draft2020 -c ajv-formats -s user.schema.json -d bad-user.json --all-errors --errors=text
~~~

- [[--all-errors]]: اطبع **كل** المخالفات مش أول واحدة بس.
- [[--errors=text]]: اطبعهم نص عادي مقروء.

الملف ده فيه ٤ أغلاط: [[id]] نص مش رقم، [[name]] حرف واحد، [[email]] ناقص خالص، و [[roles]] فيها قيمة مش في الـ enum.

~~~text الناتج
bad-user.json invalid
data must have required property 'email', data/id must be integer, data/name must NOT have fewer than 2 characters, data/roles/0 must be equal to one of the allowed values
~~~

كل غلط ومعاه مساره: [[data/id]] يعني المفتاح [[id]]، و [[data/roles/0]] يعني أول عنصر في [[roles]]. و [[jq empty bad-user.json]] كان هيقول إن الملف **سليم** تمامًا، لأنه مكتوب صح نحويًا. ده الفرق بين «مكتوب صح» و «شكله صح».

---

## فين بتلاقيه شغّال لوحده

- **VS Code**: لو أول مفتاح في الملف [["$schema": "./user.schema.json"]]، أو الملف اسمه معروف ([[package.json]] و [[tsconfig.json]] و GitHub workflows)، المحرر بيجيب الـ schema ويكمّلك المفاتيح ويحط خط أحمر تحت الغلط وانت بتكتب.
- **الـ APIs**: تفحص الـ body الجاي ([[ajv]] في Node، و Fastify بيستخدمه جوه)، و OpenAPI بيوصف الـ API كله بـ JSON Schema.
- **TypeScript**: [[zod]] بيعمل نفس الفكرة بكود وممكن يطلّع JSON Schema.

---

## الخلاصة

~~~text
jq empty          مكتوب صح (نحو) بس
JSON Schema       شكله صح: المفاتيح وأنواعها والإجباري والقيود
required          المفاتيح اللي لازم تكون موجودة
type/minimum/...  القيود على كل قيمة
enum              قيم مسموحة معدودة
format (email)    محتاج ajv-formats عشان يتفحص فعلًا
additionalProperties  false يمنع المفاتيح الزيادة
~~~

ومتخلّيش [[jq empty]] يخدعك: الفحص الحقيقي بيمسك المفتاح الناقص والرقم اللي جه نص **قبل** ما البرنامج يقع في production.`,
          lines: [
            R`[[{]]`,
            R`نسخة المعيار.`,
            R`اسم للتوثيق.`,
            R`الـ JSON لازم يبقى object.`,
            R`المفاتيح الإجبارية.`,
            R`وصف كل مفتاح.`,
            R`[[integer]] وأكبر من صفر: [["42"]] كنص مش هيعدّي.`,
            R`نص حرفين على الأقل.`,
            R`نص بصيغة إيميل (محتاج ajv-formats).`,
            R`boolean.`,
            R`array كل عنصر فيها من التلاتة دول بس.`,
            R`قفل [[properties]].`,
            R`مسموح مفاتيح زيادة (زي [[address]] و [[orders]]).`,
            R`قفل.`
          ],
          sol: R`الناتج الحقيقي:
[[user.json valid]]
[[bad-user.json invalid]]
[[data must have required property 'email', data/id must be integer, data/name must NOT have fewer than 2 characters, data/roles/0 must be equal to one of the allowed values]]
يعني ٤ أخطاء مرة واحدة، و [[jq empty bad-user.json]] كان هيقول إن الملف سليم!

(أول مرة [[npx]] بيطبع تحذيرات [[npm warn deprecated]] من مكتبات قديمة جوه ajv-cli، عادي.)`
        },
        {
          cmd: "xmllint و yamllint",
          title: "تفحص ملفات XML و YAML قبل ما توقّع بيها حاجة (xmllint و XSD و yamllint)؟",
          desc: R`زي [[jq empty]] للـ JSON، فيه أدوات للصيغ التانية، ومستويين فحص: «مكتوب صح» و «شكله صح».

XML ([[xmllint]] من [[libxml2-utils]] على أوبونتو، وجاي مع الماك):
• [[xmllint --noout file.xml]]: well-formed؟ (التاجات مقفولة، root واحد، entities صح). بيسكت لو تمام.
• [[xmllint --format file.xml]]: يرتّب الملف بمسافات (pretty print).
• [[xmllint --noout --schema order.xsd order.xml]]: valid حسب XSD؟ الـ XSD (XML Schema) هو JSON Schema بتاع XML: بيحدد العناصر وترتيبها والـ attributes وأنواعها ([[xs:positiveInteger]] و [[xs:decimal]]). وأنظمة كتير (البنوك، الفواتير الإلكترونية، SOAP) بتديك XSD وتطلب ملفك يعدّي عليه.
• [[xmllint --xpath]]: تطلّع قيم (الدرس اللي فات).

YAML ([[yamllint]]، من [[pip install yamllint]] أو [[sudo apt install yamllint]]):
• [[yamllint file.yaml]]: بيمسك أخطاء الـ syntax، وكمان حاجات الـ parser بيعدّيها ساكت:
  مفاتيح متكررة ([[key-duplicates]]): PyYAML و [[JSON.parse]] بياخدوا آخر قيمة من غير ما يقولوا!
  [[truthy]]: [[yes]] و [[no]] و [[on]] (مشكلة النرويج).
  مسافات في آخر السطر، و indentation مش ثابت، وسطور طويلة.
• الإعدادات في ملف [[.yamllint]] (YAML برضه): [[extends: default]] وبعدين تعدّل أو تقفل قواعد.
• [[-f parsable]]: شكل ناتج سطر واحد لكل مشكلة (للـ CI والمحررات).

وأدوات خاصة لكل نوع ملف بتفهم معناه مش شكله بس: [[docker compose config]] (Compose)، و [[actionlint]] (GitHub Actions)، و [[kubeconform]] (Kubernetes)، و [[nginx -t]]، و [[systemd-analyze verify]]، و [[tsc --showConfig]].

وأحسن مكان لكل ده: خطوة في CI أو pre-commit hook، عشان محدش يعمل merge لملف بايظ.`,
          example: R`xmllint --noout order.xml
xmllint --noout --schema order.xsd order.xml
xmllint --noout --schema order.xsd order-bad.xml
xmllint --format tiny.xml
yamllint compose.yaml
docker compose -f compose.yaml config`,
          try: R`الأدوات في Docker لو مش متسطّبة: [[docker run --rm -v "$PWD":/w -w /w alpine sh -c "apk add libxml2-utils yamllint && xmllint --noout order.xml && yamllint compose.yaml"]]. اعمل [[order-bad.xml]] من [[order.xml]] وغيّر [[qty="2"]] لـ [[qty="two"]]، واعمل [[compose.yaml]] فيه [[restart: no]] ومفتاح [[DEBUG]] مكرر تحت [[environment]] وسطر في آخره مسافات، ونفّذ المثال. (الـ [[order.xsd]] الكامل في الحل.)`,
          deep: {
            why: R`الـ parsers متساهلة في حاجات وصارمة في حاجات: XML بيقع من أول غلط بس مش بيتأكد من المعنى، و YAML بيعدّي مفاتيح مكررة وقيم متخمنة غلط من غير أي كلمة. الـ linters والـ schemas بيمسكوا النوعين قبل ما الملف يوصل لسيرفر.`,
            how: R`[[xmllint]] بيستخدم libxml2: أول خطوة parse (well-formed)، ولو فيه [[--schema]] بيمشي على الشجرة ويقارن كل element و attribute بالتعريف في الـ XSD. و [[yamllint]] بيقرا الملف token token (مش بس الناتج النهائي)، عشان كده يقدر يشوف مفتاح مكرر أو مسافة زيادة رغم إن الـ parser كان هيتجاهلهم.`,
            when: R`في CI لأي repo فيه YAML كتير (Compose و Actions و Kubernetes)، وقبل ما تبعت XML لنظام بيطلب XSD، ولما ملف «شكله سليم» بس البرنامج بيتصرف غريب.`,
            mistakes: R`تفتكر إن «الـ parser قراه» معناها «الملف صح» (المفتاح المكرر بيضيع ساكت). تعمل [[xmllint --format file.xml > file.xml]] فتفضّي الملف (اكتب في ملف تاني). وتشغّل yamllint بالإعدادات الافتراضية على مشروع قديم فيطلعلك مئات التحذيرات وتقفله: ابدأ بـ [[.yamllint]] معقول.`
          },
          teach: R`## الفكرة في سطرين

زي [[jq empty]] للـ JSON، فيه أدوات لـ XML و YAML، ومستويين فحص: «مكتوب صح» (well-formed) و «شكله صح» (valid حسب schema). المثال بيفحص [[order.xml]] على الاتنين بـ [[xmllint]]، وبيفحص [[compose.yaml]] بايظ بـ [[yamllint]]، وبيوريك إن الـ parser العادي بيعدّي أغلاط الـ linters بتمسكها.

التشغيل: [[xmllint]] (libxml2 2.9.14) و [[yamllint]] 1.33 على أوبونتو 24.04 (جوه Docker)، و [[docker compose config]] من Docker على ويندوز، و PyYAML.

---

## المستويين

| المستوى | يعني | الأداة |
|---|---|---|
| well-formed | التاجات مقفولة، root واحد، الرموز صح | [[xmllint --noout]] |
| valid | شكله مطابق لـ schema (العناصر وأنواعها) | [[xmllint --schema]] + XSD |

---

## ١. well-formed؟ [[xmllint --noout order.xml]]

- [[--noout]]: متطبعش الملف، بس قوللي لو فيه غلط.

مبيطبعش حاجة لو الملف تمام. السكوت ده معناه «مظبوط». لو كان فيه تاج مش مقفول، كان هيقولك في أنهي سطر.

---

## ٢. valid حسب XSD؟ [[xmllint --noout --schema order.xsd order.xml]]

الـ **XSD** (XML Schema Definition) هو JSON Schema بتاع XML: ملف بيحدد العناصر وترتيبها، والـ attributes، وأنواعها. وأنظمة كتير (البنوك، الفواتير الإلكترونية، SOAP) بتديك XSD وتطلب ملفك يعدّي عليه.

- [[--schema order.xsd]]: افحص الملف حسب الـ XSD ده.

~~~text الناتج
order.xml validates
~~~

الـ XSD اللي استخدمناه (الكامل في الحل) بيقول مثلًا إن [[qty]] لازم [[xs:positiveInteger]] (رقم صحيح موجب)، و [[price]] لازم [[xs:decimal]].

### ملف بايظ

عملنا [[order-bad.xml]] من [[order.xml]] وغيّرنا [[qty="2"]] لـ [[qty="two"]]:

~~~bash
xmllint --noout --schema order.xsd order-bad.xml
~~~

~~~text الناتج
order-bad.xml:9: element item: Schemas validity error : Element 'item', attribute 'qty': 'two' is not a valid value of the atomic type 'xs:positiveInteger'.
order-bad.xml fails to validate
~~~

قال بالظبط: في السطر 9، الـ attribute [[qty]] قيمته [[two]]، ودي مش رقم صحيح موجب. ده فحص المعنى، مش الشكل بس.

---

## ٣. ترتيب الملف: [[xmllint --format tiny.xml]]

[[--format]] بيرتّب XML مكتوب وحش (pretty print). [[tiny.xml]] محتواه سطر واحد [[<a><b>1</b><c/></a>]]:

~~~text الناتج
<?xml version="1.0"?>
<a>
  <b>1</b>
  <c/>
</a>
~~~

> متعملش [[xmllint --format file.xml > file.xml]] عشان تظبط نفس الملف: الـ [[>]] بيفضّي الملف **قبل** ما [[xmllint]] يقراه، فتخسره. اكتب في ملف تاني.

---

## ٤. فحص YAML: [[yamllint compose.yaml]]

عملنا [[compose.yaml]] فيه ٣ أغلاط مقصودة: [[restart: no]] (قيمة متلخبطة)، ومفتاح [[DEBUG]] مكرر تحت [[environment]]، وسطر في آخره مسافات زيادة.

~~~bash
yamllint compose.yaml
~~~

~~~text الناتج (مع .yamllint بيقفل document-start)
compose.yaml
  6:14      warning  truthy value should be one of [false, true]  (truthy)
  8:17      error    trailing spaces  (trailing-spaces)
  9:7       error    duplication of key "DEBUG" in mapping  (key-duplicates)
~~~

نقرا كل سطر: المكان (سطر:عمود)، النوع (warning/error)، الشرح، واسم القاعدة بين قوسين:

| الغلط | معناه |
|---|---|
| [[truthy]] (6:14) | [[no]] قيمة بتتلخبط (مشكلة النرويج). yamllint عايزها [[false]] أو [[true]] صريحة |
| [[trailing-spaces]] (8:17) | مسافات في آخر السطر، بتعمل مشاكل في git diff وأحيانًا في الـ parse |
| [[key-duplicates]] (9:7) | المفتاح [[DEBUG]] اتكرر. ودي أخطر وحدة (تحت) |

الإعدادات في ملف [[.yamllint]] (YAML برضه): [[extends: default]] وبعدين تعدّل أو تقفل قواعد (قفلنا [[document-start]] عشان ميشتكيش من غياب [[---]] في أول الملف).

---

## ٥. ليه الـ linter مهم: المفتاح المكرر

~~~bash
python3 -c 'import yaml; print(yaml.safe_load(open("compose.yaml"))["services"]["web"]["environment"])'
~~~

~~~text الناتج
{'DEBUG': False}
~~~

PyYAML قرا الملف **عادي من غير أي شكوى**، وأخد آخر قيمة لـ [[DEBUG]] ([[false]]) ورمى الأولى في صمت! نفس الكلام في [[JSON.parse]]. يعني لو كتبت مفتاح مرتين بالغلط، البرنامج هيشتغل بقيمة مش اللي انت شايفها فوق. [[yamllint]] هو اللي مسك ده، مش الـ parser.

و [[docker compose]] نفسه كمان صارم: [[docker compose -f compose.yaml config]] على نفس الملف بيرفض ويقول [[mapping key "DEBUG" already defined at line 8]]. يعني كل أداة ليها صرامتها.

---

## أدوات تانية بتفهم المعنى

كل نوع ملف ليه أداة بتفهم **معناه** مش شكله بس:

~~~text
docker compose config     Compose
actionlint                GitHub Actions
kubeconform               Kubernetes
nginx -t                  إعدادات Nginx
tsc --showConfig          tsconfig.json
~~~

وأحسن مكان لكل ده: خطوة في CI أو pre-commit hook، عشان محدش يعمل merge لملف بايظ.

---

## الخلاصة

| الأمر | بيفحص إيه |
|---|---|
| [[xmllint --noout]] | XML مكتوب صح (well-formed) |
| [[xmllint --noout --schema x.xsd]] | XML شكله صح حسب XSD |
| [[xmllint --format]] | يرتّب XML |
| [[yamllint]] | YAML: truthy، مسافات، **مفاتيح مكررة** |

~~~text الفكرة
الـ parser قراه ≠ الملف صح
المفتاح المكرر بيضيع في صمت
الـ linter بيمسك اللي الـ parser بيعدّيه
حطّه في CI
~~~`,
          lines: [
            R`well-formed؟ مبيطبعش حاجة لو تمام.`,
            R`valid حسب الـ XSD.`,
            R`ملف فيه [[qty="two"]]: بيقول فين وليه.`,
            R`يرتّب XML مكتوب في سطر واحد.`,
            R`يفحص YAML بقواعد [[.yamllint]] لو موجود.`,
            R`Compose نفسه بيرفض المفتاح المكرر.`
          ],
          sol: R`الناتج الحقيقي:
(السطر الأول مبيطبعش حاجة)
[[order.xml validates]]
[[order-bad.xml:9: element item: Schemas validity error : Element 'item', attribute 'qty': 'two' is not a valid value of the atomic type 'xs:positiveInteger'.]]
[[order-bad.xml fails to validate]]
و [[tiny.xml]] ([[<a><b>1</b><c/></a>]]) بقى:
[[<?xml version="1.0"?>]] ثم [[<a>]] ثم [[  <b>1</b>]] ثم [[  <c/>]] ثم [[</a>]]
و yamllint (مع [[.yamllint]] بيقفل document-start):
[[6:14 warning truthy value should be one of [false, true] (truthy)]]
[[8:17 error trailing spaces (trailing-spaces)]]
[[9:7 error duplication of key "DEBUG" in mapping (key-duplicates)]]
و Compose: [[mapping key "DEBUG" already defined at line 8]]. أما PyYAML فقرا الملف عادي وطلّع [[{'DEBUG': False}]] بس!

والـ [[order.xsd]] اللي استخدمناه:`,
          solCode: R`<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">
  <xs:element name="order">
    <xs:complexType>
      <xs:sequence>
        <xs:element name="customer">
          <xs:complexType>
            <xs:sequence>
              <xs:element name="name" type="xs:string"/>
              <xs:element name="email" type="xs:string"/>
            </xs:sequence>
          </xs:complexType>
        </xs:element>
        <xs:element name="items">
          <xs:complexType>
            <xs:sequence>
              <xs:element name="item" maxOccurs="unbounded">
                <xs:complexType>
                  <xs:attribute name="sku" type="xs:string" use="required"/>
                  <xs:attribute name="qty" type="xs:positiveInteger" use="required"/>
                  <xs:attribute name="price" type="xs:decimal" use="required"/>
                </xs:complexType>
              </xs:element>
            </xs:sequence>
          </xs:complexType>
        </xs:element>
        <xs:element name="note" type="xs:string" minOccurs="0"/>
        <xs:element name="total">
          <xs:complexType>
            <xs:simpleContent>
              <xs:extension base="xs:decimal">
                <xs:attribute name="currency" type="xs:string"/>
              </xs:extension>
            </xs:simpleContent>
          </xs:complexType>
        </xs:element>
      </xs:sequence>
      <xs:attribute name="id" type="xs:positiveInteger" use="required"/>
      <xs:attribute name="status" type="xs:string"/>
    </xs:complexType>
  </xs:element>
</xs:schema>`
        },
        {
          cmd: "JSON ولا YAML ولا TOML",
          title: "JSON ولا YAML ولا TOML ولا XML ولا INI: تختار صيغة إيه لملفك؟",
          desc: R`نفس الداتا ممكن تتكتب بأي صيغة من دول (المثال تحت: نفس الإعدادات بالخمسة، والسطور اللي بتبدأ بـ [[#]] في المثال عناوين بس عشان تفرّق بينهم). الفرق في مين هيقرا ومين هيكتب:

• JSON: لما برنامج بيكلّم برنامج (APIs، تخزين، رسايل). كل لغة بتقراه، وقواعده صارمة وبسيطة فمفيش مفاجآت. عيوبه للإنسان: مفيش تعليقات، والتنصيص والـ trailing comma بيوقعوك. (و JSONC لملفات الإعدادات اللي أداتها بتقبله.)
• YAML: ملفات إعدادات كبيرة ومتداخلة الإنسان بيكتبها: CI و Compose و Kubernetes. مقروء جدًا وفيه تعليقات و anchors و نصوص طويلة. عيوبه: المسافات حساسة، ومشكلة النرويج، ومواصفات ضخمة. لو اختارته: نصّص أي قيمة مش واضحة، واستخدم yamllint.
• TOML: ملف إعدادات لمشروع أو أداة، مش متداخل أوي: [[pyproject.toml]] و [[Cargo.toml]]. واضح، وأنواعه صريحة، ومفيش تخمين ولا مسافات حساسة. عيبه: التداخل العميق بيبقى مزعج ([[[a.b.c]]]).
• XML: لما النظام أو المعيار بيطلبه (Android و Maven و .NET و SVG و Office و SOAP والفواتير الإلكترونية). قوي (namespaces و XSD و attributes) بس طويل. متختاروش لحاجة جديدة غير لو مضطر.
• INI و [[.env]]: أبسط إعدادات: مفاتيح وقيم (و INI أقسام). مفيش أنواع ولا lists ولا تداخل. ممتاز لأسرار البيئة ([[.env]]) والإعدادات الصغيرة.
• CSV: جداول بس.

أسئلة تحسم بيها:
• برنامج هيقراه بس؟ JSON.
• إنسان هيعدّله بإيده كتير ومحتاج تعليقات؟ YAML (لو متداخل) أو TOML (لو مسطح شوية).
• الأداة أو اللغة ليها عُرف؟ امشي على العُرف (Python ← pyproject.toml، و Node ← package.json، و Compose ← YAML) حتى لو مش عاجبك.
• أسرار ومتغيرات بيئة؟ [[.env]].
• جداول هتتفتح في Excel؟ CSV.

ومتخترعش صيغة جديدة لمشروعك: أي واحدة من دول ليها parsers و linters و دعم في المحررات.`,
          example: R`# JSON
{"name": "gym-api", "port": 3000, "tags": ["web", "api"], "db": {"host": "localhost"}}
# XML
<app name="gym-api" port="3000"><tag>web</tag><tag>api</tag><db host="localhost"/></app>
# YAML
name: gym-api
port: 3000
tags: [web, api]
db:
  host: localhost
# TOML
name = "gym-api"
port = 3000
tags = ["web", "api"]
[db]
host = "localhost"
# INI (من غير أنواع ولا lists)
[app]
name = gym-api
port = 3000
[db]
host = localhost`,
          flag: "script",
          try: R`حط كل جزء في ملف لوحده ([[config.json]] و [[config.xml]] و [[config.yaml]] و [[config.toml]] و [[config.ini]]) واقرا كل واحد بـ Python وحوّله لـ JSON ([[json.load]] و [[yaml.safe_load]] و [[tomllib.load]] و [[configparser]] و [[ET.parse]])، وقارن النواتج: مين طلّع [[port]] رقم ومين نص؟ ومين معرفش يعمل [[tags]] كـ list؟ وبعدين اختار صيغة لملف إعدادات أداة صغيرة عندك واكتب ليه.`,
          deep: {
            why: R`مفيش صيغة «أحسن» في المطلق. كل واحدة اتعملت لمشكلة: XML للمستندات والمعايير، و JSON لتبادل الداتا، و YAML للإعدادات المقروءة، و TOML للإعدادات الواضحة، و INI لأبسط حالة. اختيار الصيغة الغلط بيعمل مشاكل بتفضل معاك طول عمر المشروع.`,
            how: R`كل الصيغ دي في الآخر بتتقري لنفس الحاجات: objects و lists وقيم. الفرق في: هل الأنواع صريحة (JSON و TOML) ولا متخمنة (YAML) ولا مش موجودة (INI و CSV و XML من غير schema)؟ وهل فيه تعليقات؟ وهل الهيكل بالأقواس ولا بالمسافات ولا بالأقسام؟`,
            when: R`كل ما تعمل ملف إعدادات جديد، أو تصمم API، أو تختار هتصدّر الداتا بإيه.`,
            mistakes: R`YAML لداتا بين برامج (بطيء ومفاجآته كتير). JSON لإعدادات الناس بتعدّلها ومحتاجة تشرح كل قيمة. صيغة مختلفة عن عُرف الأداة («أنا عملت compose بـ JSON»: شغال بس محدش هيفهمه). وتحوّل بين صيغ من غير ما تفكر إيه اللي هيضيع (درس «JSON و YAML»).`
          },
          teach: R`## الفكرة في سطرين

المثال بيكتب **نفس الإعدادات** بخمس صيغ مختلفة، عشان تشوف الفرق بعينك. مفيش صيغة «أحسن»: كل واحدة اتعملت لحالة. والسؤال الحقيقي مش «أنهي أقوى»، لأ «مين هيقرا الملف ومين هيكتبه؟».

السطور اللي بتبدأ بـ [[#]] في المثال **عناوين** عشان تفرّق بين الأجزاء، مش جزء من الملفات. في الآخر لما نقرا كل صيغة بـ Python ونحوّلها لنفس الشكل، هنكتشف فرق مهم: مين بيطلّع الأرقام أرقام ومين نصوص.

التشغيل على أوبونتو 24.04 (جوه Docker، Python 3.12). كل الصيغ اتقرت بمكتبات جاية مع Python ([[json]] و [[yaml]] و [[tomllib]] و [[configparser]] و [[xml]]).

---

## نفس الداتا بالخمسة

الإعدادات: اسم [[gym-api]]، بورت رقم [[3000]]، قايمة [[tags]] فيها [[web]] و [[api]]، و [[db]] جواها [[host]].

### JSON

~~~json
{"name": "gym-api", "port": 3000, "tags": ["web", "api"], "db": {"host": "localhost"}}
~~~

سطر واحد، كل نص بين [["]]، والأنواع واضحة ([[3000]] من غير quotes = رقم). ده شكل **برنامج بيكلّم برنامج**.

### XML

~~~xml
<app name="gym-api" port="3000"><tag>web</tag><tag>api</tag><db host="localhost"/></app>
~~~

attributes ([[name="gym-api"]]) و elements ([[<tag>web</tag>]])، والـ list بتكرار التاج ([[<tag>]] مرتين). وكل القيم **نصوص** (حتى [[port="3000"]])، فمعناها محتاج XSD يحدده.

### YAML

~~~yaml
name: gym-api
port: 3000
tags: [web, api]
db:
  host: localhost
~~~

من غير تنصيص، والهيكل بالمسافات، و [[port: 3000]] اتخمّن رقم. مقروء للإنسان.

### TOML

~~~toml
name = "gym-api"
port = 3000
tags = ["web", "api"]
[db]
host = "localhost"
~~~

النص لازم متنصص، والرقم صريح، و [[[db]]] قسم (table) بدل المسافات. واضح ومفيش تخمين.

### INI

~~~ini
[app]
name = gym-api
port = 3000
[db]
host = localhost
~~~

أبسط حاجة: أقسام ومفاتيح وقيم. مفيش أنواع ولا lists ولا تداخل عميق. (و [[.env]] زيه من غير الأقسام.)

---

## نقرا الخمسة بـ Python ونقارن

~~~bash
python3 -c 'import json; print(json.dumps(json.load(open("config.json"))))'
python3 -c 'import json, yaml; print(json.dumps(yaml.safe_load(open("config.yaml"))))'
python3 -c 'import json, tomllib; print(json.dumps(tomllib.load(open("config.toml", "rb"))))'
~~~

التلاتة دول طلّعوا **نفس الحاجة بالظبط**:

~~~text الناتج (JSON و YAML و TOML)
{"name": "gym-api", "port": 3000, "tags": ["web", "api"], "db": {"host": "localhost"}}
~~~

- [[json.load]] و [[yaml.safe_load]] و [[tomllib.load]] كلهم بيقروا لنفس الـ dict.
- [[tomllib]] (جاي مع Python من نسخة 3.11) بيفتح الملف [["rb"]] (read binary)، ده شرط عنده.
- التلاتة فهموا [[port]] رقم و [[tags]] list و [[db]] object متداخل.

### INI مختلف

~~~bash
python3 -c 'import configparser; c = configparser.ConfigParser(); c.read("config.ini"); print({s: dict(c[s]) for s in c.sections()})'
~~~

~~~text الناتج
{'app': {'name': 'gym-api', 'port': '3000'}, 'db': {'host': 'localhost'}}
~~~

شوف الفرق: [[port]] طلع [['3000']] **نص** مش رقم (INI مفيهوش أنواع)، ومفيش [[tags]] خالص (INI مفيهوش lists). لو عايز رقم لازم [[int(c["app"]["port"])]] بنفسك.

### XML كمان مختلف

~~~bash
python3 -c 'import xml.etree.ElementTree as ET; r = ET.parse("config.xml").getroot(); print("port attr=", repr(r.get("port")), "tags=", [t.text for t in r.findall("tag")], "host=", r.find("db").get("host"))'
~~~

~~~text الناتج
port attr= '3000' tags= ['web', 'api'] host= localhost
~~~

[[port]] نص [['3000']] برضه، والـ [[tags]] محتاجة [[findall("tag")]] عشان متكررة، و [[host]] attribute على [[db]]. يعني XML كمان أنواعه نصوص لحد ما schema يقول غير كده.

---

## مقارنة سريعة

| الصيغة | الأنواع | تعليقات؟ | امتى تختارها |
|---|---|---|---|
| JSON | صريحة | لأ | برنامج بيكلّم برنامج: APIs، تخزين |
| YAML | متخمنة | أيوة | إعدادات كبيرة متداخلة الإنسان بيكتبها: CI، Compose، Kubernetes |
| TOML | صريحة | أيوة | إعداد مشروع مش عميق أوي: pyproject.toml، Cargo.toml |
| XML | نصوص (محتاج XSD) | أيوة | لما المعيار بيطلبه: Android، Maven، SOAP، فواتير |
| INI / .env | مفيش | أحيانًا | أبسط إعداد، وأسرار البيئة |

---

## أسئلة تحسم بيها

- برنامج هيقراه بس؟ **JSON**.
- إنسان هيعدّله بإيده كتير ومحتاج تعليقات؟ **YAML** (لو متداخل) أو **TOML** (لو مسطح شوية).
- الأداة أو اللغة ليها عُرف؟ امشي عليه (Python ← [[pyproject.toml]]، Node ← [[package.json]]، Compose ← YAML) حتى لو مش عاجبك.
- أسرار ومتغيرات بيئة؟ **.env**.
- جداول هتتفتح في Excel؟ **CSV**.

ومتخترعش صيغة جديدة لمشروعك: أي واحدة من دول ليها parsers و linters و دعم في المحررات.

---

## الخلاصة

~~~text
JSON        أنواع صريحة، مفيش تعليقات: بين البرامج
YAML        مقروء وفيه تعليقات، بس مسافات ومفاجآت: إعدادات الناس
TOML        واضح وصريح: إعداد مشروع مسطح
XML         قوي بس طويل: لما المعيار يطلبه
INI/.env    أبسط حاجة: مفاتيح وقيم
~~~

والقاعدة: لو هتقراه بكود ومحتاج أنواع، خُد JSON أو TOML أو YAML. INI و XML بتطلّع نصوص، فلازم تحوّل الأنواع بنفسك.`,
          lines: [
            R`JSON: سطر واحد، كل نص متنصص، والأنواع واضحة.`,
            R`XML: attributes و elements، وكل القيم نصوص (ومعناها محتاج schema)، والـ list بتكرار التاج.`,
            R`YAML: من غير تنصيص.`,
            R`رقم (اتخمّن).`,
            R`list بين [[[ ]]].`,
            R`object متداخل بالمسافات.`,
            R`جوه [[db]].`,
            R`TOML: النص لازم متنصص.`,
            R`رقم صريح.`,
            R`array.`,
            R`table بدل المسافات.`,
            R`جوه [[db]].`,
            R`INI: قسم، لأن مفيش مفاتيح بره الأقسام في أغلب البرامج.`,
            R`كل حاجة نص.`,
            R`حتى ده نص [["3000"]].`,
            R`قسم تاني (ومفيش طريقة رسمية للـ tags).`,
            R`جوه [[db]].`
          ],
          sol: R`النواتج بـ Python:
JSON و YAML و TOML: [[{"name": "gym-api", "port": 3000, "tags": ["web", "api"], "db": {"host": "localhost"}}]] (التلاتة متطابقين بالظبط).
INI: [[{'app': {'name': 'gym-api', 'port': '3000'}, 'db': {'host': 'localhost'}}]]: [[port]] نص، ومفيش [[tags]].
XML: كل حاجة نصوص ([[port]] = [['3000']])، والـ tags محتاجة [[findall("tag")]]، و [[host]] attribute على [[db]].

يعني لو هتقرا الملف بكود ومحتاج أنواع: JSON أو TOML أو YAML (مع التنصيص). ولو INI أو XML: لازم تحوّل الأنواع بنفسك.`
        }
      ]
    }
]);
