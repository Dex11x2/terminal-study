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
    }
]);
