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
          try: R`نفّذ المثال (openssl موجود على لينكس والماك و Git Bash). اتأكد إن الـ hash في السطر ٤ و ٥ متطابق: ده معناه إن المفتاح ده بتاع الشهادة دي (لما Nginx يقول [[key values mismatch]] ده اللي بتشيكه). بعدين جرّب السطر الأخير على دومين موقعك أو أي موقع واعرف الشهادة هتنتهي إمتى. وحوّل الشهادة لـ DER: [[openssl x509 -in server.crt -outform der -out server.der]] وقارن [[file]] للاتنين.`,
          deep: {
            why: R`من غير شهادات، أي حد في نفس الشبكة (كافيه، شبكة شركة) يقدر يعمل نفسه البنك ويقرا كل حاجة. الشهادة بتربط الدومين بمفتاح عام، وتوقيع CA موثوق (متسجل في المتصفح أو النظام) بيضمن إن الربط ده صح. والمفتاح الخاص هو الدليل الوحيد إن السيرفر ده فعلًا صاحب الشهادة.`,
            how: R`وقت الـ TLS handshake السيرفر بيبعت شهادته (والوسيطة)، والمتصفح بيمشي على السلسلة لحد CA عنده في المخزن الموثوق (على لينكس [[/etc/ssl/certs]])، ويتأكد من الدومين والتاريخ. وبعدين السيرفر بيثبت إنه معاه المفتاح الخاص بإنه يوقّع حاجة بيه. والـ hash اللي في المثال بيقارن المفتاح العام اللي جوه الشهادة بالمفتاح العام المستخرج من المفتاح الخاص.`,
            when: R`إعداد HTTPS على VPS (certbot بيعمل كل ده لوحده)، و debug لأخطاء SSL ([[certificate has expired]] و [[unable to get local issuer certificate]])، وشهادات محلية للتطوير (mkcert).`,
            mistakes: R`تعمل commit لـ [[privkey.pem]] أو [[.key]]. تستخدم [[cert.pem]] بدل [[fullchain.pem]] في Nginx فالمتصفحات على الموبايل تقول الشهادة مش موثوقة (السلسلة ناقصة). تنسى التجديد (Let's Encrypt ٩٠ يوم، و certbot بيعمل timer لوحده، اتأكد إنه شغال). وتبعت ملف [[.pem]] لحد وانت مش عارف هو شهادة ولا مفتاح.`
          },
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
grep -E ' (js|mjs|wasm|svg);' /etc/nginx/mime.types`,
          try: R`في فولدر فيه ملفات من الدروس اللي فاتت (html و js و json و svg و webp و wasm)، شغّل [[python3 -m http.server 8000]]، ومن ترمنال تاني اعمل [[curl -sI]] لكل ملف وقارن الـ Content-Type. وفي المتصفح افتح [[F12]] ثم Network وافتح أي موقع، ودوس على أي طلب وشوف [[Content-Type]] في Response Headers. وبعدين حل التمرين.`,
          deep: {
            why: R`الرابط ممكن ميكونش فيه امتداد خالص ([[/api/users]] أو [[/image?id=5]])، وممكن يكون فيه امتداد كداب. فالويب اتفق إن السيرفر يقول صراحة «اللي بعتهولك ده نوعه كذا» في header، والمتصفح يتصرف على حسبه: يعرضه، أو ينفّذه، أو ينزّله.`,
            how: R`Nginx وهو بيبعت ملف ثابت بياخد الامتداد ويدوّر عليه في جدول [[types]] (اللي جاي من [[mime.types]])، ويحط النتيجة في [[Content-Type]]. وفي الـ API انت (أو الإطار) اللي بتحدده: [[res.json()]] في Express بيحط [[application/json; charset=utf-8]] لوحده. والمتصفح زمان كان بيعمل «sniffing» يخمّن من المحتوى، وده كان بيعمل ثغرات، فدلوقتي مع [[nosniff]] بيلتزم بالـ header.`,
            when: R`لما ملف مش بيظهر أو script مش بيشتغل وفي الـ Console رسالة MIME، ولما تكتب API (ابعت النوع الصح، واقبل الطلبات بالنوع الصح)، ولما تظبط Nginx أو S3 أو CDN.`,
            mistakes: R`تبعت JSON من [[fetch]] من غير [[headers: { "Content-Type": "application/json" }]] فالسيرفر يشوف body فاضي. ترفع ملفات على S3 من غير Content-Type فتتنزّل بدل ما تتعرض. تثق في الـ Content-Type اللي العميل باعته مع ملف مرفوع (العميل يقدر يكتب أي حاجة، درس «الامتداد بيكدب»). وتنسى [[.mjs]] أو [[.wasm]] في إعدادات السيرفر.`
          },
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
