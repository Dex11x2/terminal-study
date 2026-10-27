// ملف إضافي لتاب sshc: الحقول نفس شكلها في 01.js.

MORE("sshc", [
  {
    t: "SOCKS والشهادات وتأمين السيرفر",
    l: 1,
    n: "بروكسي من غير VPN، وشهادات بدل نسخ المفاتيح، ومفاتيح ليها حدود، و Match، وفحص السيرفر",
    items: [
      {
        cmd: "ssh -D",
        title: "SOCKS proxy: شوف الشبكة الداخلية من جهازك",
        desc: R`[[ssh -D 1080]] بيفتح على جهازك SOCKS proxy على البورت 1080، وأي برنامج يكلّمه بيطلع للنت **من ناحية السيرفر**. فتفتح لوحة تحكم داخلية أو API مش مكشوف للنت من متصفحك، من غير VPN ومن غير ما تعمل [[-L]] لكل خدمة.

اتجرّب على ٣ containers [[ubuntu:24.04]] و nginx: جهاز ([[laptop]])، وسيرفر ([[b2a-srv]]) عليه OpenSSH 9.6، وموقع داخلي ([[b2a-web]]) السيرفر بس اللي يوصله.`,
        example: R`ssh -f -N -D 1080 deploy@b2a-srv
ss -tlnp | grep 1080
curl -s --socks5-hostname 127.0.0.1:1080 http://b2a-web/ | grep -o "<title>.*</title>"
curl -sS -m 5 --socks5 127.0.0.1:1080 http://b2a-web/
# in ~/.ssh/config:
Host lab-socks
    HostName b2a-srv
    User deploy
    DynamicForward 1080`,
        try: "افتح [[ssh -D 1080]] لسيرفرك، وفي Firefox: Settings ثم Network Settings ثم Manual proxy ثم SOCKS Host [[127.0.0.1]] بورت [[1080]] و SOCKS v5، وفعّل «Proxy DNS when using SOCKS v5». افتح موقع يعرض الـ IP بتاعك وقارنه من غير البروكسي.",
        flag: "script",
        deep: {
          why: "عندك Grafana و RabbitMQ admin و Kibana على الشبكة الداخلية للسيرفر، ومش مكشوفين للنت (وده الصح). [[-L]] محتاج سطر لكل خدمة وبورت. [[-D]] بروكسي واحد وكل حاجة وراه بتتفتح بأساميها الداخلية.",
          how: R`[[-D 1080]] (D = dynamic): ssh بيسمع على [[127.0.0.1:1080]] على جهازك ويتكلم بروتوكول SOCKS. البرنامج بيقول للبروكسي «وصّلني بـ [[b2a-web:80]]»، و ssh يبعت الطلب ده جوه الاتصال المشفّر، والسيرفر هو اللي يفتح الاتصال الحقيقي. فالموقع الداخلي شايف الطلب جاي من السيرفر.

[[-f]] اشتغل في الخلفية بعد الدخول، و [[-N]] متشغّلش أمر (tunnel بس).

DNS: [[--socks5-hostname]] (أو [[socks5h://]]) بيبعت **الاسم** للبروكسي فالسيرفر هو اللي يحلّه، وده اللي محتاجه للأسامي الداخلية. [[--socks5]] بيحل الاسم على جهازك الأول، فالاسم الداخلي بيفشل. نفس الفكرة في Firefox: «Proxy DNS when using SOCKS v5».

في config: [[DynamicForward 1080]] = [[-D 1080]]. والبروكسي بيسمع على localhost بس افتراضيًا؛ [[-D 0.0.0.0:1080]] بيخلي أي حد على شبكتك يستخدمه، فمتعملهاش.

السيرفر لازم يسمح: لو [[AllowTcpForwarding no]] في sshd_config، الاتصال بيقوم بس كل طلب بيترفض بـ [[administratively prohibited]].`,
          when: "لوحات إدارة داخلية، و APIs داخلية للتجربة، وتشوف موقع زي ما بيظهر من بلد السيرفر. شرح SOCKS نفسه في درس [[socks_proxy]] في تاب الشبكات بعمق.",
          mistakes: R`[[--socks5]] بدل [[--socks5-hostname]] مع اسم داخلي: [[Could not resolve host]]. و [[-D 0.0.0.0:1080]] فتبقى بروكسي مفتوح للشبكة. وتفتكره VPN: البرامج اللي مش متظبطة على البروكسي بتطلع عادي من جهازك.`
        },
        teach: R`## الفكرة: بروكسي على جهازك، والطلب بيطلع من السيرفر

~~~text المعمل
laptop  ──ssh (مشفّر)──►  b2a-srv  ──HTTP──►  b2a-web
(البروكسي على 1080)       (بيفتح الاتصال)      (داخلي: السيرفر بس يوصله)
~~~

الـ [[laptop]] على شبكة مع السيرفر بس. الـ [[b2a-web]] على شبكة تانية مع السيرفر بس. من الـ laptop مباشرة:

~~~text الناتج
curl: (6) Could not resolve host: b2a-web
~~~

---

## ١. [[ssh -f -N -D 1080 deploy@b2a-srv]]

| الحتة | معناها |
|---|---|
| [[-D 1080]] | D = dynamic: افتح SOCKS proxy على البورت 1080 عندي |
| [[-N]] | متشغّلش أمر على السيرفر، الاتصال للـ tunnel بس |
| [[-f]] | بعد ما تدخل، روح للخلفية ورجّعلي الترمنال |
| [[deploy@b2a-srv]] | اليوزر والسيرفر |

الأمر بيرجع على طول من غير ناتج.

---

## ٢. [[ss -tlnp | grep 1080]]: البروكسي سامع؟

[[ss]] بيعرض الاتصالات: [[-t]] TCP، و [[-l]] اللي سامعة (listening)، و [[-n]] أرقام مش أسامي، و [[-p]] اسم البرنامج. و [[grep 1080]] يفلتر:

~~~text الناتج
LISTEN 0      128        127.0.0.1:1080       0.0.0.0:*    users:(("ssh",pid=48,fd=5))
LISTEN 0      128            [::1]:1080          [::]:*    users:(("ssh",pid=48,fd=4))
~~~

- [[127.0.0.1:1080]] و [[[::1]:1080]]: على localhost بس (IPv4 و IPv6)، يعني جهازك بس اللي يستخدمه.
- [[ssh]] و [[pid=48]]: البرنامج اللي فاتحه. ده الرقم اللي هتقفله بيه بعدين: [[kill 48]].

---

## ٣. [[curl --socks5-hostname]]: الطلب عبر البروكسي

~~~bash
curl -s --socks5-hostname 127.0.0.1:1080 http://b2a-web/ | grep -o "<title>.*</title>"
~~~

- [[--socks5-hostname 127.0.0.1:1080]]: ابعت الطلب للبروكسي، **وابعت الاسم زي ما هو** (السيرفر يحلّه).
- [[-s]] من غير شريط التقدم.
- [[grep -o "<title>.*</title>"]]: [[-o]] يطبع الجزء المطابق بس، و [[.*]] أي حاجة.

~~~text الناتج
<title>Welcome to nginx!</title>
~~~

والموقع الداخلي شاف الطلب جاي من IP السيرفر على الشبكة الداخلية، مش من الـ laptop:

~~~text لوج nginx في b2a-web
172.25.0.2 - - [..] "GET / HTTP/1.1" 200 896 "-" "curl/8.5.0" "-"
~~~

[[172.25.0.2]] هو [[b2a-srv]] على الشبكة الداخلية.

---

## ٤. [[--socks5]] من غير hostname

~~~bash
curl -sS -m 5 --socks5 127.0.0.1:1080 http://b2a-web/
~~~

~~~text الناتج
curl: (97) Could not resolve host: b2a-web
~~~

[[--socks5]] بيحل الاسم **على جهازك** الأول، وجهازك ميعرفش [[b2a-web]]. الفرق:

| الخيار | مين بيحل الاسم | للأسامي الداخلية |
|---|---|---|
| [[--socks5]] | جهازك | ✗ |
| [[--socks5-hostname]] أو [[socks5h://]] | السيرفر | ✓ |

[[-sS]]: ساكت بس اطبع الأخطاء. [[-m 5]]: استنى ٥ ثواني بالكتير.

---

## ٥. في الـ config

~~~text
Host lab-socks
    HostName b2a-srv
    User deploy
    DynamicForward 1080
~~~

[[DynamicForward 1080]] = [[-D 1080]]. [[ssh -G lab-socks]] أكد:

~~~text الناتج
user deploy
hostname b2a-srv
dynamicforward 1080
~~~

فـ [[ssh -f -N lab-socks]] بيفتح نفس البروكسي.

---

## ٦. لو السيرفر قافل الـ forwarding

لما حطينا [[AllowTcpForwarding no]] في sshd_config (درس [[sshd Match و ssh-audit]])، الاتصال قام، بس الطلب اترفض:

~~~text الناتج
curl: (97) connection to proxy closed
channel 2: open failed: administratively prohibited: open failed
~~~

السطر التاني من لوج ssh على الجهاز ([[-E /tmp/d.log]] بيكتب اللوج في ملف). [[administratively prohibited]] = السيرفر رافض بإعداده.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| بروكسي | [[ssh -f -N -D 1080 server]] |
| الأسامي الداخلية تتحل | [[--socks5-hostname]] أو [[socks5h://]] أو «Proxy DNS» في Firefox |
| دايمًا | [[DynamicForward 1080]] في الـ config |
| تقفله | [[kill PID]] بالرقم اللي ظهر في [[ss -tlnp]] |`,
        lines: [
          R`افتح SOCKS proxy على 1080 في الخلفية من غير أمر.`,
          R`اتأكد إنه سامع على localhost.`,
          R`اطلب الموقع الداخلي عبر البروكسي، والسيرفر يحل الاسم.`,
          R`نفس الطلب بس جهازك يحل الاسم: بيفشل.`,
          R`Host اسمه [[lab-socks]].`,
          R`السيرفر.`,
          R`اليوزر.`,
          R`= [[-D 1080]].`
        ],
        sol: R`في المعمل: [[ss -tlnp]] وراني [[127.0.0.1:1080]] و [[[::1]:1080]] لـ [[ssh]]، و [[--socks5-hostname]] جاب [[<title>Welcome to nginx!</title>]] من [[b2a-web]] اللي الجهاز مايشوفوش، و [[--socks5]] قال [[curl: (97) Could not resolve host: b2a-web]].

في Firefox نفس الحكاية: من غير «Proxy DNS when using SOCKS v5» الأسامي الداخلية مش هتفتح، والمواقع العامة هتظهر بـ IP السيرفر.`
      },
      {
        cmd: "شهادات المستخدمين",
        title: "SSH certificates: مفتاح موقّع بصلاحية ٨ ساعات",
        desc: R`بدل ما تنسخ المفتاح العام بتاع كل واحد في [[authorized_keys]] على كل سيرفر، بتعمل CA (مفتاح توقيع) مرة، والسيرفرات بتثق فيه بسطر [[TrustedUserCAKeys]]. وكل ما حد محتاج يدخل، الـ CA بيوقّع مفتاحه بشهادة ليها اسم يوزر ومدة صلاحية.

اتجرّب بـ OpenSSH 9.6 في containers [[ubuntu:24.04]]: شهادة لـ [[deploy]] بـ [[-V +8h]] دخلت، وبيوزر تاني اترفضت، والمنتهية اترفضت.`,
        example: R`ssh-keygen -t ed25519 -f user_ca -C "user-ca"
ssh-keygen -s user_ca -I ali@laptop -n deploy -V +8h ~/.ssh/id_ed25519.pub
ssh-keygen -Lf ~/.ssh/id_ed25519-cert.pub
# on the server:
echo "TrustedUserCAKeys /etc/ssh/user_ca.pub" | sudo tee /etc/ssh/sshd_config.d/10-ca.conf
sudo sshd -t && sudo systemctl reload ssh
ssh deploy@b2a-srv`,
        try: "في containers تجربة: اعمل CA ووقّع مفتاحك بـ [[-V +5m]]، وادخل، واستنى ٦ دقايق وجرّب تاني. وبعدين وقّع بـ [[-n admin]] وجرّب تدخل بـ deploy.",
        flag: "script",
        deep: {
          why: "فريق ١٠ أشخاص و ٢٠ سيرفر = ٢٠٠ سطر authorized_keys. حد ساب الشركة؟ لازم تلف على الـ ٢٠ تمسح سطره، ولو نسيت واحد فاضل يدخل للأبد. بالشهادات: السيرفر بيثق في الـ CA بس، والشهادة بتنتهي لوحدها بعد ساعات.",
          how: R`الـ CA مجرد مفتاح ssh عادي ([[user_ca]]) بتحفظه في مكان آمن. [[ssh-keygen -s user_ca]] (s = sign) بيوقّع المفتاح العام بتاعك ويطلّع ملف [[id_ed25519-cert.pub]] جنبه. ssh بيلاقيه لوحده ويبعته مع المفتاح.

جوه الشهادة: [[-I]] (key ID) اسم بيظهر في لوج السيرفر عشان تعرف مين دخل، و [[-n]] (principals) اليوزرز المسموح يدخل بيهم (مفصولين بفاصلة)، و [[-V]] الصلاحية ([[+8h]] من دلوقتي لـ ٨ ساعات، أو [[-2h:-1h]] من لـ). و [[-O]] بيزوّد قيود زي [[source-address=10.0.0.0/8]] أو [[no-port-forwarding]].

السيرفر: [[TrustedUserCAKeys]] بيشاور على المفتاح **العام** بتاع الـ CA. أي شهادة موقّعة منه، وصالحة دلوقتي، وفيها اسم اليوزر اللي بتدخل بيه في الـ principals = دخول، من غير authorized_keys. ولو حد اتسرّبت شهادته قبل ما تنتهي: [[RevokedKeys]] في sshd_config بملف فيه المفاتيح الملغية.

الـ CA بيتحفظ بعيد عن السيرفرات (Vault أو Teleport أو step-ca بيعملوا ده أوتوماتيك مع تسجيل دخول الشركة)، لأن اللي معاه الـ CA يدخل أي سيرفر.`,
          when: "أكتر من ٣ أشخاص أو ١٠ سيرفرات. وأي مكان محتاج تسحب الوصول بسرعة أو تدّي وصول مؤقت (contractor، أو on-call لليلة).",
          mistakes: R`تحط مفتاح الـ CA **الخاص** على السيرفر بدل العام. وتنسى [[-n]]: الشهادة بتطلع [[Principals: (none)]]، و sshd 9.6 رفضها في المعمل بـ [[Certificate lacks principal list]] (أدوات تانية أو [[AuthorizedPrincipalsFile]] ممكن تتعامل معاها بشكل مختلف، فاكتب [[-n]] دايمًا). وتعمل شهادات بصلاحية سنين فترجع لنفس مشكلة المفاتيح الدايمة.`
        },
        teach: R`## الفكرة: السيرفر بيثق في «ختم»، مش في كل مفتاح لوحده

| | authorized_keys | الشهادات |
|---|---|---|
| السيرفر بيعرف | مفتاح كل واحد | مفتاح الـ CA بس |
| موظف جديد | تنسخ مفتاحه على كل سيرفر | توقّع مفتاحه مرة |
| حد مشي | تمسحه من كل سيرفر | شهادته بتنتهي لوحدها |
| مين دخل؟ | بصمة مفتاح | اسم واضح في اللوج ([[-I]]) |

---

## ١. الـ CA: مفتاح عادي

~~~bash
ssh-keygen -t ed25519 -f user_ca -C "user-ca"
~~~

بيطلّع ملفين: [[user_ca]] (الخاص، **ده الكنز**) و [[user_ca.pub]] (العام، ده اللي بيروح السيرفرات). [[-C]] تعليق بس. (في المعمل زودنا [[-N ""]] عشان من غير passphrase؛ في الحقيقة الـ CA ليه passphrase قوي.)

---

## ٢. التوقيع

~~~bash
ssh-keygen -s user_ca -I ali@laptop -n deploy -V +8h ~/.ssh/id_ed25519.pub
~~~

| الحتة | معناها |
|---|---|
| [[-s user_ca]] | وقّع بالـ CA ده (s = sign) |
| [[-I ali@laptop]] | key ID: الاسم اللي هيظهر في لوج السيرفر |
| [[-n deploy]] | principals: اليوزرز المسموح يدخل بيهم |
| [[-V +8h]] | صالحة من دلوقتي لـ ٨ ساعات |
| [[~/.ssh/id_ed25519.pub]] | المفتاح العام اللي بنوقّعه |

~~~text الناتج
Signed user key /root/.ssh/id_ed25519-cert.pub: id "ali@laptop" serial 0 for deploy valid from 2026-10-27T22:38:00 to 2026-10-28T06:39:13
~~~

الشهادة اتحطت جنب المفتاح باسم [[-cert.pub]]، و ssh بيدوّر عليها هناك لوحده. والـ [[valid from]] قبل دلوقتي بدقيقة تقريبًا عشان لو ساعة السيرفر متأخرة شوية.

---

## ٣. [[ssh-keygen -Lf]]: إيه اللي جوه الشهادة؟

[[-L]] اعرض الشهادة، و [[-f]] الملف:

~~~text الناتج
        Type: ssh-ed25519-cert-v01@openssh.com user certificate
        Signing CA: ED25519 SHA256:bkq7p66SZrh2YCa/Mjq40hll79mDUaBUQdc8I978HGk (using ssh-ed25519)
        Key ID: "ali@laptop"
        Serial: 0
        Valid: from 2026-10-27T22:38:00 to 2026-10-28T06:39:13
        Principals:
                deploy
        Critical Options: (none)
        Extensions:
                permit-X11-forwarding
                permit-agent-forwarding
                permit-port-forwarding
                permit-pty
                permit-user-rc
~~~

- [[user certificate]]: شهادة يوزر (فيه نوع تاني للسيرفرات، الدرس الجاي).
- [[Signing CA]]: بصمة الـ CA اللي وقّع.
- [[Serial]]: رقم تقدر تلغي بيه شهادة بعينها ([[-z]] وقت التوقيع بيحدده).
- [[Critical Options]]: قيود بـ [[-O]] (زي [[source-address]]). هنا مفيش.
- [[Extensions]]: المسموح، وده الافتراضي. [[-O no-port-forwarding]] مثلًا بيشيل واحدة.

---

## ٤. السيرفر

~~~bash
echo "TrustedUserCAKeys /etc/ssh/user_ca.pub" | sudo tee /etc/ssh/sshd_config.d/10-ca.conf
sudo sshd -t && sudo systemctl reload ssh
~~~

- [[TrustedUserCAKeys]]: «أي شهادة موقّعة من المفتاح ده مقبولة». الملف ده نسخة من [[user_ca.pub]] (العام).
- [[tee]] عشان الكتابة محتاجة sudo. وملف في [[sshd_config.d]] (أوبونتو بيقراهم في أول الإعدادات).
- [[sshd -t]]: افحص الإعدادات، و [[&&]]: لو سليمة اعمل reload. (في المعمل مفيش systemd، فعملنا [[kill -HUP]] لـ sshd بالـ PID بتاعه، وده نفس اللي reload بيعمله.)

وشلنا [[authorized_keys]] بتاع deploy خالص، ودخلنا:

~~~text الناتج
logged in as deploy with cert
~~~

ولوج السيرفر:

~~~text الناتج
Accepted publickey for deploy from 172.24.0.3 port 56758 ssh2: ED25519-CERT SHA256:MR5pl2Yy/hYwFuo4OLCFLJIsRKxESyR2CjSqg34sJe4 ID ali@laptop (serial 0) CA ED25519 SHA256:bkq7p66SZrh2YCa/Mjq40hll79mDUaBUQdc8I978HGk
~~~

[[ED25519-CERT]] و [[ID ali@laptop]]: دخل بشهادة، وعارفين مين.

---

## ٥. إمتى بيرفض؟

| التجربة | لوج السيرفر |
|---|---|
| [[ssh admin@b2a-srv]] بشهادة principal بتاعها [[deploy]] | [[Certificate invalid: name is not a listed principal]] |
| شهادة اتوقّعت بـ [[-V -2h:-1h]] (خلصت من ساعة) | [[Certificate invalid: expired]] |

وفي الحالتين الجهاز بيشوف بس [[Permission denied (publickey,password)]]، فالسبب الحقيقي دايمًا في لوج السيرفر.

---

## الخلاصة

1. [[ssh-keygen -s CA -I اسم -n يوزرز -V مدة key.pub]] بيطلّع [[key-cert.pub]].
2. السيرفر: [[TrustedUserCAKeys ca.pub]].
3. مفيش authorized_keys، والصلاحية بتنتهي لوحدها.

> الـ CA الخاص هو مفتاح كل السيرفرات. مكانه بره السيرفرات، وبـ passphrase، والأحسن في أداة زي Vault أو step-ca.`,
        lines: [
          R`اعمل مفتاح الـ CA.`,
          R`وقّع مفتاحك: اسم في اللوج، يوزر [[deploy]]، ٨ ساعات.`,
          R`اعرض اللي جوه الشهادة.`,
          R`السيرفر يثق في المفتاح العام بتاع الـ CA.`,
          R`افحص الإعدادات واعمل reload.`,
          R`ادخل: ssh بيبعت الشهادة لوحده.`
        ],
        sol: R`في المعمل (OpenSSH 9.6): شهادة [[-V +5m]] دخلت، وبعد المدة لوج السيرفر قال [[Certificate invalid: expired]] والجهاز شاف [[Permission denied (publickey,password)]].

وشهادة [[-n admin]] لما تدخل بـ [[deploy]] (أو العكس): [[Certificate invalid: name is not a listed principal]]. الـ principal لازم يطابق اليوزر اللي بتدخل بيه بالظبط.`
      },
      {
        cmd: "شهادات السيرفر",
        title: "@cert-authority: مفيش «Are you sure» تاني",
        desc: R`نفس فكرة شهادات اليوزرز بالعكس: الـ CA بيوقّع مفتاح **السيرفر** ([[ssh-keygen -h]])، والسيرفر بيقدّم الشهادة ([[HostCertificate]])، وجهازك بيثق في الـ CA بسطر [[@cert-authority]] واحد في [[known_hosts]]. فأي سيرفر جديد (أو اتعمل من جديد) بيتعرف من أول مرة من غير سؤال ومن غير تحذير البصمة.

اتجرّب بـ OpenSSH 9.6 في containers: [[StrictHostKeyChecking yes]] ودخل من غير ما known_hosts فيه بصمة السيرفر.`,
        example: R`ssh-keygen -t ed25519 -f host_ca -C host-ca
ssh-keygen -s host_ca -I srv-host -h -n b2a-srv,srv.lab -V +52w ssh_host_ed25519_key.pub
# on the server, /etc/ssh/sshd_config.d/20-hostcert.conf:
HostCertificate /etc/ssh/ssh_host_ed25519_key-cert.pub
# on your machine, ~/.ssh/known_hosts:
@cert-authority b2a-srv,*.lab ssh-ed25519 AAAAC3Nza...host-ca-public-key
ssh -o StrictHostKeyChecking=yes deploy@b2a-srv`,
        try: "في المعمل: امسح known_hosts، وحط سطر [[@cert-authority]] بس، وادخل بـ [[-v]] ودوّر على [[Server host certificate]]. بعدين ادخل بالـ IP بدل الاسم وشوف إيه اللي بيحصل.",
        flag: "script",
        deep: {
          why: "كل مرة سيرفر يتعمل من جديد (autoscaling، أو rebuild) بيطلع بمفتاح host جديد، والناس بتتعود تكتب yes أو تعمل [[StrictHostKeyChecking no]]، وده بالظبط اللي بيفتح الباب لهجوم في النص. شهادة الـ host بتخلي التحقق أوتوماتيك وصح.",
          how: R`[[-h]] بيقول لـ ssh-keygen إن دي شهادة host مش user. [[-n]] هنا أسامي السيرفر (الـ hostnames أو الـ IPs) اللي الشهادة صالحة ليها، وجهازك بيقارنها باللي انت كتبته في الأمر. [[-V +52w]] سنة (السيرفرات بتاخد مدة أطول من اليوزرز، وتتجدد بأداة).

السيرفر: [[HostCertificate]] في sshd_config بيشاور على [[...-cert.pub]] جنب مفتاح الـ host. وده بيتضاف للمفتاح العادي، مش بداله.

جهازك: سطر في [[known_hosts]] بيبدأ بـ [[@cert-authority]]، وبعده الأسامي (فيها [[*]] مسموح)، وبعدها المفتاح العام بتاع الـ CA. أي سيرفر اسمه مطابق للنمط ومعاه شهادة من الـ CA ده بيتقبل.

مهم: النمط في [[known_hosts]] والأسامي في [[-n]] الاتنين لازم يطابقوا اللي بتكتبه. لو دخلت بالـ IP ومش في الاتنين، ssh بيرجع للطريقة العادية (بصمة السيرفر نفسه).

ولإلغاء شهادة سيرفر: سطر [[@revoked]] في known_hosts.`,
          when: "أي fleet سيرفرات بتتغير، أو أي فريق فيه ناس كتير بتدخل نفس السيرفرات. وفي CI بدل ssh-keyscan.",
          mistakes: R`تكتب في [[-n]] اسم مختلف عن اللي الناس بتكتبه ([[srv]] والناس بتكتب [[srv.lab]]). وتنسى إن [[@cert-authority]] لازم يكون في أول السطر بالظبط. وتفتكر إن الـ host CA ينفع هو نفسه الـ user CA: افصلهم، لأن تسريب واحد ميوقعش التاني.`
        },
        teach: R`## الفكرة: بدل ما تحفظ بصمة كل سيرفر، احفظ بصمة الـ CA

درس [[known_hosts]] شرح التحذير الكبير لما بصمة سيرفر تتغير. الشهادات بتحل ده من الأساس: جهازك مش محتاج يعرف بصمة كل سيرفر، محتاج يعرف الـ CA بس.

---

## ١. توقيع مفتاح السيرفر

~~~bash
ssh-keygen -t ed25519 -f host_ca -C host-ca
ssh-keygen -s host_ca -I srv-host -h -n b2a-srv,srv.lab -V +52w ssh_host_ed25519_key.pub
~~~

- الأول: CA تاني خاص بالسيرفرات (منفصل عن بتاع اليوزرز).
- [[ssh_host_ed25519_key.pub]]: المفتاح العام بتاع السيرفر، موجود في [[/etc/ssh/]] من أول ما اتسطّب.
- [[-h]]: شهادة **host**.
- [[-n b2a-srv,srv.lab]]: الأسامي اللي الشهادة صالحة ليها.
- [[-V +52w]]: ٥٢ أسبوع.

~~~text الناتج
Signed host key /ca/srv_host-cert.pub: id "srv-host" serial 0 for b2a-srv,srv.lab valid from 2026-10-27T22:38:00 to 2027-10-26T22:39:35
~~~

---

## ٢. السيرفر بيقدّم الشهادة

~~~text /etc/ssh/sshd_config.d/20-hostcert.conf
HostCertificate /etc/ssh/ssh_host_ed25519_key-cert.pub
~~~

حطينا الشهادة في المسار ده، و [[sshd -t]]، و reload.

---

## ٣. جهازك يثق في الـ CA

~~~text ~/.ssh/known_hosts
@cert-authority b2a-srv,*.lab ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAICtA...
~~~

| الحتة | معناها |
|---|---|
| [[@cert-authority]] | السطر ده CA، مش سيرفر |
| [[b2a-srv,*.lab]] | يطبّق على الأسامي دي ([[*]] أي حاجة) |
| [[ssh-ed25519 AAAA...]] | محتوى [[host_ca.pub]] |

ومسحنا أي بصمة قديمة للسيرفر، فده السطر الوحيد في الملف.

---

## ٤. الدخول

~~~bash
ssh -v -o StrictHostKeyChecking=yes deploy@b2a-srv "echo ok, no prompt"
~~~

[[StrictHostKeyChecking=yes]]: ارفض أي سيرفر مش معروف، من غير سؤال. و [[-v]] لوج تفصيلي:

~~~text الناتج (السطور المهمة)
debug1: Server host certificate: ssh-ed25519-cert-v01@openssh.com SHA256:DJGy1tvq/X33A2E8tnsmTEJWQBx0XWPuUbO/9RBg3Ag, serial 0 ID "srv-host" CA ssh-ed25519 SHA256:5jN8ME6COB/rMFOA8TACMY1TGjk2gTIcl/gt3jpK9Vc valid from 2026-10-27T22:38:00 to 2027-10-26T22:39:35
debug1: Host 'b2a-srv' is known and matches the ED25519-CERT host certificate.
ok, no prompt
~~~

- السيرفر قدّم شهادة [[ID "srv-host"]] موقّعة من الـ CA.
- [[is known and matches the ED25519-CERT host certificate]]: اتقبل بالشهادة، مع إن بصمته نفسها مش في known_hosts.
- ولا سؤال، ولا تحذير.

---

## ٥. بالـ IP

~~~bash
ssh -o StrictHostKeyChecking=yes deploy@172.24.0.2 true
~~~

~~~text الناتج
No ED25519 host key is known for 172.24.0.2 and you have requested strict checking.
Host key verification failed.
~~~

[[172.24.0.2]] مش في نمط [[@cert-authority]] ولا في [[-n]]، فـ ssh رجع للطريقة العادية ومش لاقي بصمة. لو الناس بتدخل بالـ IP، حطه في الاتنين.

---

## الخلاصة

| فين | إيه |
|---|---|
| الـ CA | [[ssh-keygen -s host_ca -h -n أسامي -V مدة key.pub]] |
| السيرفر | [[HostCertificate ...-cert.pub]] |
| جهازك | [[@cert-authority أنماط مفتاح_CA]] في known_hosts |

> الاسم اللي بتكتبه في [[ssh]] لازم يطابق نمط [[@cert-authority]] **و** principals الشهادة.`,
        lines: [
          R`اعمل CA للسيرفرات.`,
          R`وقّع مفتاح السيرفر كشهادة host بأساميه، لسنة.`,
          R`السيرفر يقدّم الشهادة.`,
          R`جهازك يثق في الـ CA للأسامي دي (المفتاح مختصر هنا).`,
          R`ادخل من غير ما بصمة السيرفر تكون معروفة.`
        ],
        sol: R`بـ [[-v]] ظهر [[debug1: Server host certificate: ssh-ed25519-cert-v01@openssh.com ... ID "srv-host"]] و [[Host 'b2a-srv' is known and matches the ED25519-CERT host certificate.]] من غير أي سؤال.

وبالـ IP: [[No ED25519 host key is known for 172.24.0.2 and you have requested strict checking.]] لأن الـ IP مش في النمط ولا في principals الشهادة.`
      },
      {
        cmd: "authorized_keys options",
        title: "مفتاح يعمل حاجة واحدة بس",
        desc: R`كل سطر في [[authorized_keys]] ممكن يبدأ بقيود قبل المفتاح: [[restrict]] يقفل كل حاجة (tunnels و agent و terminal)، و [[command="..."]] يشغّل أمر ثابت مهما الطرف التاني طلب، و [[from="..."]] يقبل المفتاح من IPs معينة بس، و [[permitopen="host:port"]] يسمح بـ tunnel لمكان واحد.

اتجرّب بـ OpenSSH 9.6 في containers: مفتاح backup طلب [[rm -rf]] فاتنفّذ الـ backup بداله، ومفتاح tunnel فتح البورت 80 بس.`,
        example: R`# ~/.ssh/authorized_keys on the server (one line per key):
restrict,command="/usr/local/bin/backup-only",from="172.24.0.0/16" ssh-ed25519 AAAA... backup@laptop
restrict,port-forwarding,permitopen="b2a-web:80",command="echo tunnel-only key" ssh-ed25519 AAAA... tunnel@laptop
# from the laptop:
ssh -i ~/.ssh/backup_key deploy@b2a-srv "rm -rf /home/deploy"
ssh -i ~/.ssh/tunnel_key -f -N -L 8080:b2a-web:80 deploy@b2a-srv`,
        try: "في المعمل: اعمل مفتاح بـ [[command=\"date\"]] و [[restrict]] واطلب بيه [[ssh ... whoami]]. بعدين غيّر [[from]] لشبكة غلط وشوف لوج السيرفر بيقول إيه.",
        flag: "script",
        deep: {
          why: "سكربت backup على جهاز تاني محتاج يدخل السيرفر بمفتاح من غير passphrase. لو المفتاح ده اتسرق، اللي معاه بقى عنده shell كامل. القيود بتخلي المفتاح ينفع للحاجة اللي اتعمل عشانها بس.",
          how: R`القيود بتتكتب في أول السطر، مفصولة بفاصلة، من غير مسافات، وبعدها مسافة والمفتاح.

[[restrict]]: يقفل port forwarding و agent forwarding و X11 و الـ terminal (PTY) و [[~/.ssh/rc]]. وبعده تفتح اللي محتاجه بس: [[port-forwarding]] أو [[pty]].

[[command="..."]]: الأمر ده بيتنفّذ بدل أي حاجة طلبها الطرف التاني. اللي طلبه بيوصل في متغير [[SSH_ORIGINAL_COMMAND]]، فالسكربت يقدر يقراه ويقرر (rsync أو borg بيستخدموا ده). ومن غيره، حتى مع [[restrict]]، المفتاح يقدر يشغّل أي أمر من غير terminal.

[[from="172.24.0.0/16"]]: IP أو شبكة أو أسامي بـ [[*]]، ومن مكان تاني المفتاح بيترفض حتى لو صح.

[[permitopen="host:port"]]: مع [[port-forwarding]]، [[-L]] مسموح للمكان ده بس. وفيه [[permitlisten]] لـ [[-R]]، و [[expiry-time="YYYYMMDD"]] للمفتاح المؤقت، و [[environment]].

ده كله في [[man authorized_keys]] (قسم AUTHORIZED_KEYS FILE FORMAT في [[man sshd]]).`,
          when: "أي مفتاح بيستخدمه سكربت أو سيرفر تاني: backup، و deploy من CI، و tunnel لقاعدة البيانات، و git على سيرفر. مفتاحك الشخصي مش محتاج.",
          mistakes: R`[[restrict,port-forwarding]] من غير [[command]] وتفتكره tunnel بس: في تجربتنا [[ssh ... whoami]] رجّع [[deploy]] عادي. ومسافة بعد الفاصلة فالسطر كله يبوظ. و [[command]] لسكربت بيشغّل [[$SSH_ORIGINAL_COMMAND]] من غير ما يتأكد منه.`
        },
        teach: R`## الفكرة: المفتاح مش «مفتاح الشقة كلها»

السطر العادي في authorized_keys:

~~~text
ssh-ed25519 AAAA... backup@laptop
~~~

= أي حد معاه المفتاح الخاص ده ياخد shell كامل. لما تزوّد قيود **قبله**، بتحدد هو يقدر يعمل إيه.

---

## ١. مفتاح الـ backup

~~~text
restrict,command="/usr/local/bin/backup-only",from="172.24.0.0/16" ssh-ed25519 AAAA... backup@laptop
~~~

| القيد | معناه |
|---|---|
| [[restrict]] | اقفل كل حاجة: tunnels و agent و X11 و terminal |
| [[command="/usr/local/bin/backup-only"]] | مهما طلب، شغّل ده بس |
| [[from="172.24.0.0/16"]] | من الشبكة دي بس ([[/16]] = أول رقمين ثابتين) |

والسكربت على السيرفر:

~~~bash
#!/bin/sh
echo "backup-only: you asked for: $__{SSH_ORIGINAL_COMMAND:-<nothing>}"
echo "running the backup instead"
~~~

[[SSH_ORIGINAL_COMMAND]] فيه الأمر اللي الطرف التاني طلبه. و [[:-<nothing>]] معناها «لو فاضي اكتب <nothing>».

### التجربة

~~~bash
ssh -i ~/.ssh/backup_key deploy@b2a-srv "rm -rf /home/deploy"
~~~

~~~text الناتج
backup-only: you asked for: rm -rf /home/deploy
running the backup instead
~~~

الـ [[rm]] **متنفّذش**. وصل كنص بس، والسكربت قرر يعمل الـ backup.

وطلب terminal بـ [[-tt]]:

~~~text الناتج
PTY allocation request failed on channel 0
~~~

[[restrict]] قافل الـ PTY.

### [[from]] غلط

غيّرنا [[from]] لـ [[10.0.0.0/8]] (والجهاز على [[172.24.0.3]]):

~~~text لوج السيرفر
/home/deploy/.ssh/authorized_keys:1: Authentication tried for deploy with correct key but not from a permitted host (host=172.24.0.3, ip=172.24.0.3, required=10.0.0.0/8).
~~~

المفتاح صح، بس من المكان الغلط، فاترفض. حتى لو اتسرق، ميشتغلش من بره.

---

## ٢. مفتاح الـ tunnel

~~~text
restrict,port-forwarding,permitopen="b2a-web:80",command="echo tunnel-only key" ssh-ed25519 AAAA... tunnel@laptop
~~~

- [[restrict]] قفل كل حاجة، و [[port-forwarding]] رجّع الـ tunnels بس.
- [[permitopen="b2a-web:80"]]: [[-L]] لمكان واحد بس.
- [[command="echo tunnel-only key"]]: عشان لو حد طلب أمر.

~~~bash
ssh -i ~/.ssh/tunnel_key -f -N -L 8080:b2a-web:80 -L 8443:b2a-web:443 deploy@b2a-srv
curl -s localhost:8080 | grep -o "<title>.*</title>"
curl -s -m 5 localhost:8443
~~~

~~~text الناتج
<title>Welcome to nginx!</title>
channel 4: open failed: administratively prohibited: open failed
~~~

البورت 80 اشتغل، والـ 443 اترفض. ولوج السيرفر:

~~~text لوج السيرفر
Received request from 172.24.0.3 port 41974 to connect to host b2a-web port 443, but the request was denied.
~~~

### من غير [[command]]

في الأول كتبنا السطر من غير [[command=...]]، وجرّبنا:

~~~bash
ssh -i ~/.ssh/tunnel_key deploy@b2a-srv whoami
~~~

~~~text الناتج
deploy
~~~

[[restrict]] قفل الـ terminal، بس **مقفلش تنفيذ الأوامر**. بعد ما زوّدنا [[command]]:

~~~text الناتج
tunnel-only key
~~~

و [[-N]] لسه شغال لأنه مش بيطلب أمر أصلًا.

---

## الخلاصة

| عايز | القيود |
|---|---|
| مفتاح سكربت لأمر واحد | [[restrict,command="..."]] |
| من مكان معين بس | [[from="IP أو شبكة"]] |
| tunnel لمكان واحد | [[restrict,port-forwarding,permitopen="host:port",command="..."]] |
| مفتاح مؤقت | [[expiry-time="20261231"]] |

> القيود من غير مسافات بينها. وأي مفتاح بيستخدمه سكربت لازم يبقى عليه [[restrict]] و [[command]].`,
        lines: [
          R`مفتاح backup: مقفول، وأمر ثابت، ومن الشبكة دي بس.`,
          R`مفتاح tunnel: مقفول إلا الـ tunnel لـ [[b2a-web:80]]، وأي أمر يطبع جملة.`,
          R`اطلب [[rm -rf]] بمفتاح الـ backup: بيشغّل الـ backup بداله.`,
          R`افتح tunnel بمفتاح الـ tunnel.`
        ],
        sol: R`مع [[command="date"]] و [[restrict]]، [[ssh ... whoami]] بيطبع التاريخ مش [[deploy]]: الأمر الثابت بيكسب دايمًا (زي ما حصل في المعمل مع [[backup-only]]).

ومع [[from]] على شبكة غلط، الجهاز بيشوف [[Permission denied (publickey,password)]]، ولوج السيرفر بيقول [[Authentication tried for deploy with correct key but not from a permitted host (host=172.24.0.3, ip=172.24.0.3, required=10.0.0.0/8).]]`
      },
      {
        cmd: "Match و Include",
        title: "إعدادات بشرط، وملف config مقسوم",
        desc: R`[[Include]] بيقرا ملفات تانية جوه الـ config (ملف لكل شغل أو عميل). و [[Match]] بلوك بيطبق بشرط أوسع من [[Host]]: [[originalhost]] (الاسم اللي كتبته)، و [[exec]] (أمر لو نجح الشرط يتحقق)، و [[user]] و [[localnetwork]] وغيرهم.

المثال: بره المكتب ادخل عبر jump host، وفي المكتب ادخل مباشرة. اتجرّب بـ [[ssh -G]] في OpenSSH 9.6.`,
        example: R`# ~/.ssh/config
Include ~/.ssh/config.d/*.conf

Match originalhost *.lab !exec "test -f /tmp/office"
    ProxyJump jump.example.com

Host *.lab
    User deploy
# ~/.ssh/config.d/lab.conf
Host srv.lab
    HostName b2a-srv`,
        try: "اعمل الملفين، وشغّل [[ssh -G srv.lab | grep -E \"^(hostname|user|proxyjump) \"]] مرة من غير [[/tmp/office]] ومرة بعد [[touch /tmp/office]]. بعدين غيّر [[originalhost]] لـ [[host]] وشوف الفرق.",
        flag: "script",
        deep: {
          why: "الـ config بيكبر: سيرفرات شغل وعملاء ومشاريع شخصية في ملف واحد ٣٠٠ سطر. وفيه إعدادات بتتغير حسب انت فين: في المكتب السيرفرات على الشبكة، وبره لازم bastion.",
          how: R`[[Include]] بياخد مسار أو نمط ([[*.conf]])، والملفات بتتقري مكانه بالترتيب الأبجدي. مكانه بيفرق: لو جوه بلوك [[Host]] أو [[Match]] بيطبق بس جوه البلوك ده، فالأفضل في أول الملف.

[[Match]] بياخد شروط، وكلهم لازم يتحققوا: [[originalhost]] الاسم زي ما كتبته في الأمر، و [[host]] الاسم **بعد** [[HostName]] (لو اتغير)، و [[user]] اليوزر، و [[localuser]] اليوزر على جهازك، و [[exec "أمر"]] بيشغّل الأمر ولو رجع 0 الشرط يتحقق، و [[localnetwork]] (OpenSSH 9.4+) شبكة جهازك، و [[all]] و [[final]]. و [[!]] قبل أي شرط بتعكسه.

القاعدة القديمة لسه شغالة: لكل إعداد، أول قيمة تتقري هي اللي بتكسب، والـ Match بيتقيّم في مكانه من الملف بالقيم اللي اتقرت لحد هناك.

[[ssh -G]] بيطبع الإعدادات النهائية من غير اتصال، فده طريقتك تتأكد إن الـ Match اشتغل.`,
          when: "Include لما الملف يكبر أو لما أداة بتولّد config (زي Terraform أو أداة الشركة). Match exec لما الطريق للسيرفر بيتغير حسب الشبكة أو الـ VPN.",
          mistakes: R`[[Match host]] بدل [[originalhost]] لما الاسم بيتغير بـ HostName. و [[Match user root]] قبل ما [[User]] يتحدد فيطبق على الكل. و [[exec]] بأمر بطيء (ping على سيرفر واقع) فكل ssh يستنى. و [[Include]] جوه بلوك [[Host]] بالغلط.`
        },
        teach: R`## الفكرة: الـ config بقى «برنامج» صغير

[[Host]] بيقارن الاسم بس. [[Match]] بيقارن أي حاجة: الاسم، اليوزر، ونتيجة أمر. و [[Include]] بيقسم الملف.

---

## ١. [[Include]]

~~~text ~/.ssh/config
Include ~/.ssh/config.d/*.conf
~~~

~~~text ~/.ssh/config.d/lab.conf
Host srv.lab
    HostName b2a-srv
~~~

- أي ملف [[.conf]] في الفولدر بيتقري مكان السطر ده، بالترتيب الأبجدي.
- في أول الملف عشان يبقى «عام». لو حطيته تحت [[Host x]] بيطبق على [[x]] بس.

---

## ٢. [[Match originalhost *.lab !exec "test -f /tmp/office"]]

نقراه حتة حتة:

| الحتة | معناها |
|---|---|
| [[Match]] | البلوك ده بشروط |
| [[originalhost *.lab]] | الاسم اللي كتبته في الأمر بينتهي بـ [[.lab]] |
| [[exec "test -f /tmp/office"]] | شغّل الأمر ده؛ لو رجع 0 الشرط اتحقق |
| [[!]] قبل [[exec]] | اعكس: الشرط اتحقق لو الأمر **فشل** |

[[test -f /tmp/office]] بيرجع 0 لو الملف موجود. في الحقيقة هتحط بداله أمر بيعرف انت على شبكة المكتب ولا لأ. فالمعنى: «لو سيرفر [[.lab]] **وانت مش في المكتب**، ادخل عبر [[jump.example.com]]».

---

## ٣. التجربة بـ [[ssh -G]]

[[-G]] بيطبع الإعدادات النهائية من غير ما يتصل:

~~~bash
ssh -G srv.lab | grep -E "^(hostname|user|proxyjump) "
~~~

### بره المكتب

~~~text الناتج
user deploy
hostname b2a-srv
proxyjump jump.example.com
~~~

- [[hostname b2a-srv]]: من الملف اللي اتعمله Include.
- [[user deploy]]: من [[Host *.lab]].
- [[proxyjump]]: الـ Match اشتغل.

### بعد [[touch /tmp/office]]

~~~text الناتج
user deploy
hostname b2a-srv
~~~

الـ [[proxyjump]] اختفى، والدخول اشتغل مباشرة:

~~~text الناتج
connected as deploy
~~~

---

## ٤. فخ [[host]] و [[originalhost]]

في الأول كتبنا [[Match host *.lab]]، والـ proxyjump **مظهرش أبدًا**، حتى بره المكتب. ليه؟ [[host]] بيتقارن بالاسم **بعد** [[HostName]]، يعني [[b2a-srv]]، وده مش [[*.lab]]. [[originalhost]] بيقارن [[srv.lab]] اللي كتبته.

---

## ٥. فخ الترتيب مع [[Match user]]

جرّبنا ملفين بنفس السطور بترتيب مختلف، والأمر [[ssh -F الملف -G srv.lab]] ([[-F]] = استخدم الملف ده بدل الـ config):

~~~text الملف الأول: Host قبل Match
Host *.lab
    User deploy
Match user root
    IdentityFile ~/.ssh/admin_key
~~~

~~~text الناتج
user deploy
identityfile ~/.ssh/id_rsa
...
~~~

~~~text الملف التاني: Match قبل Host
Match user root
    IdentityFile ~/.ssh/admin_key
Host *.lab
    User deploy
~~~

~~~text الناتج
user deploy
identityfile ~/.ssh/admin_key
~~~

في التاني، وقت ما ssh وصل لـ [[Match user root]]، الـ [[User]] لسه متحددش، فاتقارن باليوزر المحلي ([[root]] في الـ container) واتطبق، مع إن الاتصال النهائي بـ [[deploy]]. الـ Match بيشوف القيم اللي اتقرت **لحد مكانه** بس.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| تقسم الملف | [[Include ~/.ssh/config.d/*.conf]] في الأول |
| بالاسم اللي كتبته | [[Match originalhost]] |
| بشرط أمر | [[Match exec "..."]] (و [[!exec]] للعكس) |
| تتأكد | [[ssh -G اسم]] |

> اكتب الـ Match بعد الإعدادات اللي بيعتمد عليها، وجرّب بـ [[ssh -G]] قبل ما تعتمد عليه.`,
        lines: [
          R`اقرا كل ملفات [[.conf]] في الفولدر هنا.`,
          R`لو الاسم اللي كتبته [[*.lab]] و [[/tmp/office]] مش موجود...`,
          R`...ادخل عبر jump host.`,
          R`أي سيرفر [[.lab]]...`,
          R`...باليوزر [[deploy]].`,
          R`في ملف تاني: الاسم المختصر...`,
          R`...واسمه الحقيقي.`
        ],
        sol: R`من غير [[/tmp/office]]: [[user deploy]] و [[hostname b2a-srv]] و [[proxyjump jump.example.com]]. بعد [[touch /tmp/office]]: الـ proxyjump اختفى.

ولو كتبت [[Match host *.lab]]: الـ proxyjump مش هيظهر في الحالتين، لأن [[host]] بيتقارن بـ [[b2a-srv]] (بعد HostName)، مش [[srv.lab]].`
      },
      {
        cmd: "sshd Match و ssh-audit",
        title: "قواعد السيرفر لكل يوزر، وفحص الخوارزميات",
        desc: R`بعد الأساسيات (root والباسورد في درس [[sshd_config]] في تاب VPS)، فيه ٣ حاجات: [[AllowUsers]] يحدد مين يدخل أصلًا، و [[Match]] في sshd_config يدّي يوزر أو شبكة إعدادات مختلفة، و [[sshd -T -C]] يوريك الإعدادات النهائية لاتصال معين قبل ما تجرّب. وبعدين [[ssh-audit]] يفحص الخوارزميات من بره.

اتجرّب على OpenSSH 9.6 في [[ubuntu:24.04]]، و ssh-audit 3.9.0 من container تاني.`,
        example: R`# /etc/ssh/sshd_config.d/30-harden.conf
PasswordAuthentication no
PermitRootLogin no
AllowUsers deploy admin
MaxAuthTries 3
AllowTcpForwarding no
X11Forwarding no
KexAlgorithms sntrup761x25519-sha512@openssh.com,curve25519-sha256,curve25519-sha256@libssh.org
MACs hmac-sha2-512-etm@openssh.com,hmac-sha2-256-etm@openssh.com,umac-128-etm@openssh.com
HostKeyAlgorithms ssh-ed25519,ssh-ed25519-cert-v01@openssh.com,rsa-sha2-512,rsa-sha2-256
Match User admin Address 172.24.0.0/16
    AllowTcpForwarding yes
# then:
sudo sshd -t
sudo sshd -T -C user=deploy,host=laptop,addr=172.24.0.3 | grep allowtcpforwarding
pip install ssh-audit && ssh-audit b2a-srv`,
        try: "على سيرفر تجربة أو container: شغّل [[ssh-audit]] قبل أي تعديل وعد الـ [[fail]]. حط الملف، و [[sshd -t]]، و reload، وسيب جلسة ssh مفتوحة وجرّب من جلسة جديدة، وبعدين ssh-audit تاني.",
        flag: "script",
        deep: {
          why: "السيرفر عليه ٥ يوزرز بس اتنين بس المفروض يدخلوا. واحد محتاج tunnels والباقي لأ. وإعدادات التشفير الافتراضية فيها خوارزميات قديمة عشان تشتغل مع عملاء قديمة. ده كله بيتظبط في ملف واحد وبيتفحص قبل ما تقفل على نفسك.",
          how: R`[[AllowUsers deploy admin]]: أي يوزر تاني مرفوض حتى بمفتاح صح ([[AllowGroups]] نفس الفكرة بالجروبات). [[MaxAuthTries 3]]: ٣ محاولات لكل اتصال. [[AllowTcpForwarding no]]: مفيش [[-L]] و [[-D]] و [[-R]]. [[X11Forwarding no]].

[[Match User admin Address 172.24.0.0/16]]: السطور اللي تحته بتطبق بس لما **الشرطين** يتحققوا (يوزر admin ومن الشبكة دي). وبيفضل شغال لحد [[Match]] تاني أو آخر الملف، عشان كده في الآخر. وفيه [[Group]] و [[Host]] و [[LocalPort]].

الخوارزميات: [[KexAlgorithms]] (تبادل المفاتيح)، و [[MACs]] (التحقق من الرسايل)، و [[HostKeyAlgorithms]] (نوع مفتاح السيرفر). القيم دي طلعت من توصيات ssh-audit لـ OpenSSH 9.6، مع ترك curve25519 عشان التوافق.

[[sshd -t]]: يفحص الصياغة. [[sshd -T]]: يطبع الإعدادات النهائية بعد كل الملفات. [[-C user=...,host=...,addr=...]]: يحسبها لاتصال افتراضي، فتشوف الـ Match اشتغل.

ssh-audit (أداة Python): بيتصل بالسيرفر، ويقرا الخوارزميات اللي بيعرضها، ويقيّم كل واحدة ([[info]] و [[warn]] و [[fail]]) ويطلّع توصيات ([[rec]]). وكمان بيجرّب rate limiting ([[--skip-rate-test]] يقفله). fail2ban (حظر الـ IPs اللي بتجرّب باسوردات) في درس [[fail2ban]] في تاب VPS.`,
          when: "أي سيرفر على النت، بعد ما تقفل root والباسورد. و ssh-audit بعد أي تحديث كبير لـ OpenSSH.",
          mistakes: R`[[AllowUsers]] من غير يوزرك فتقفل على نفسك (سيب جلسة مفتوحة دايمًا). و [[Match]] في نص الملف فكل اللي بعده يبقى جواه. وتشيل كل الخوارزميات اللي عليها warn فعملاء قديمة (أو أدوات CI) متعرفش تتصل.`
        },
        teach: R`## الفكرة: ٣ أدوات

| الأداة | بتجاوب على |
|---|---|
| [[AllowUsers]] و [[Match]] | مين يدخل، وكل واحد مسموحله بإيه |
| [[sshd -T -C]] | الإعدادات النهائية لاتصال معين، قبل ما تجرّب |
| [[ssh-audit]] | التشفير بتاع السيرفر كويس ولا قديم |

---

## ١. الملف

في [[/etc/ssh/sshd_config.d/30-harden.conf]]. أوبونتو 24.04 بيقرا الفولدر ده في **أول** [[sshd_config]]:

~~~text الناتج من grep على sshd_config
12:Include /etc/ssh/sshd_config.d/*.conf
99:X11Forwarding yes
~~~

ولأن أول قيمة بتكسب، [[X11Forwarding no]] في ملفنا غلبت [[yes]] اللي في سطر 99.

### الأساسيات

| السطر | معناه |
|---|---|
| [[PasswordAuthentication no]] و [[PermitRootLogin no]] | درس [[sshd_config]] في تاب VPS |
| [[AllowUsers deploy admin]] | دول بس، وأي يوزر تاني مرفوض |
| [[MaxAuthTries 3]] | ٣ محاولات لكل اتصال |
| [[AllowTcpForwarding no]] | مفيش tunnels |
| [[X11Forwarding no]] | مفيش برامج رسومية |

### الخوارزميات

~~~text
KexAlgorithms sntrup761x25519-sha512@openssh.com,curve25519-sha256,curve25519-sha256@libssh.org
MACs hmac-sha2-512-etm@openssh.com,hmac-sha2-256-etm@openssh.com,umac-128-etm@openssh.com
HostKeyAlgorithms ssh-ed25519,ssh-ed25519-cert-v01@openssh.com,rsa-sha2-512,rsa-sha2-256
~~~

- [[KexAlgorithms]]: إزاي الطرفين بيتفقوا على مفتاح الجلسة. [[sntrup761x25519]] خليط بين خوارزمية مقاومة للكمبيوتر الكمي و X25519.
- [[MACs]]: التحقق إن الرسايل متغيرتش. [[-etm]] = encrypt-then-MAC، الأأمن.
- [[HostKeyAlgorithms]]: نوع مفتاح السيرفر. شلنا [[ecdsa-sha2-nistp256]].

### الـ Match

~~~text
Match User admin Address 172.24.0.0/16
    AllowTcpForwarding yes
~~~

[[admin]] **ومن** الشبكة دي: مسموحله tunnels. في آخر الملف لأن الـ Match بيفضل مفتوح لحد آخره.

---

## ٢. [[sshd -t]] و [[sshd -T -C]]

~~~bash
sudo sshd -t
~~~

من غير ناتج = الملف سليم. وبعدين:

~~~bash
sudo sshd -T -C user=deploy,host=laptop,addr=172.24.0.3 | grep -E "^(allowtcpforwarding|passwordauthentication|permitrootlogin|maxauthtries|x11forwarding|allowusers) "
~~~

[[-T]]: اطبع الإعدادات النهائية. [[-C]]: احسبها لاتصال بالمواصفات دي:

~~~text الناتج
maxauthtries 3
permitrootlogin no
passwordauthentication no
x11forwarding no
allowtcpforwarding no
allowusers deploy
allowusers admin
~~~

ونفس الأمر لـ [[admin]]:

| [[-C]] | [[allowtcpforwarding]] |
|---|---|
| [[user=deploy,addr=172.24.0.3]] | [[no]] |
| [[user=admin,addr=172.24.0.3]] | [[yes]] |
| [[user=admin,addr=10.9.9.9]] | [[no]] (الشبكة مش مطابقة) |

اتأكدت من الـ Match من غير ولا اتصال.

### وفي الحقيقة

[[deploy]] جرّب [[ssh -D]]: الاتصال قام، و tunnel اترفض بـ [[administratively prohibited]]، ولوج السيرفر:

~~~text الناتج
refused local port forward: originator 127.0.0.1 port 47014, target b2a-web port 80
~~~

ودخول بباسورد: [[deploy@b2a-srv: Permission denied (publickey).]] (كلمة password اختفت من القايمة).

---

## ٣. [[ssh-audit]]

اتسطّب بـ [[pip install ssh-audit]] (3.9.0) في container [[python:3.13-slim]] على نفس الشبكة:

~~~bash
ssh-audit b2a-srv
~~~

قبل الملف (إعدادات أوبونتو الافتراضية)، أمثلة من الناتج:

~~~text الناتج (مختصر)
(gen) banner: SSH-2.0-OpenSSH_9.6p1 Ubuntu-3ubuntu13.20
(kex) ecdh-sha2-nistp256                    -- [fail] using elliptic curves that are suspected as being backdoored by the U.S. National Security Agency
(key) ecdsa-sha2-nistp256                   -- [fail] using elliptic curves that are suspected as being backdoored by the U.S. National Security Agency
(mac) hmac-sha1                             -- [fail] using broken SHA-1 hash algorithm
(mac) umac-64-etm@openssh.com               -- [warn] using small 64-bit tag size
(rec) -ecdh-sha2-nistp256                   -- kex algorithm to remove
(rec) -hmac-sha1                            -- mac algorithm to remove
~~~

- كل سطر: النوع بين قوسين، والخوارزمية، والتقييم.
- [[(rec)]] توصية: [[-]] شيلها.
- إجمالي: ٦ سطور [[fail]] و ١٨ [[warn]].

وكمان سطر عن الـ rate:

~~~text الناتج
(nfo) Potentially insufficient connection throttling detected, resulting in possible vulnerability to the DHEat DoS attack (CVE-2002-20001).  38 connections were created in 0.204 seconds, ...
~~~

ده معناه السيرفر بيقبل اتصالات كتير بسرعة. الحل الأشمل [[PerSourceMaxStartups]] أو fail2ban.

بعد الملف ([[--skip-rate-test]] عشان نركّز على الخوارزميات):

~~~text الناتج (مختصر)
(kex) sntrup761x25519-sha512@openssh.com  -- [info] available since OpenSSH 8.5
(kex) curve25519-sha256                   -- [warn] does not provide protection against post-quantum attacks
(mac) hmac-sha2-512-etm@openssh.com       -- [info] available since OpenSSH 6.2
(rec) -curve25519-sha256                  -- kex algorithm to remove
~~~

صفر [[fail]] و ٢ [[warn]]: الاتنين curve25519، وسبناهم عن قصد عشان العملاء اللي مش بتدعم sntrup761. ودخول [[deploy]] لسه شغال.

---

## الخلاصة

1. [[AllowUsers]] + الأساسيات في ملف في [[sshd_config.d]].
2. [[Match]] في آخر الملف، وتتأكد منه بـ [[sshd -T -C]].
3. [[sshd -t]] قبل أي reload، وجلسة مفتوحة وانت بتجرّب.
4. [[ssh-audit]] قبل وبعد.`,
        lines: [
          R`مفيش باسوردات.`,
          R`مفيش root.`,
          R`دول بس اللي يدخلوا.`,
          R`٣ محاولات لكل اتصال.`,
          R`مفيش tunnels.`,
          R`مفيش X11.`,
          R`خوارزميات تبادل المفاتيح.`,
          R`خوارزميات التحقق من الرسايل.`,
          R`أنواع مفتاح السيرفر.`,
          R`للـ admin من الشبكة دي بس...`,
          R`...tunnels مسموحة.`,
          R`افحص الصياغة.`,
          R`الإعدادات النهائية لاتصال deploy من الـ IP ده.`,
          R`سطّب ssh-audit وافحص السيرفر.`
        ],
        sol: R`في المعمل: ssh-audit 3.9.0 على أوبونتو 24.04 الافتراضي طلّع ٦ سطور [[fail]] (ecdh-sha2-nistp و ecdsa-sha2-nistp256 و hmac-sha1) و ١٨ [[warn]]. بعد الملف: صفر [[fail]] و ٢ [[warn]] (curve25519)، والدخول بالمفتاح شغال.

و [[sshd -T -C user=admin,host=laptop,addr=172.24.0.3]] طلّع [[allowtcpforwarding yes]]، ولـ deploy [[no]].`
      },
      {
        cmd: "مفاتيح FIDO2",
        title: "مفتاح ssh جوه YubiKey",
        desc: R`[[ssh-keygen -t ed25519-sk]] بيعمل مفتاح الجزء الخاص منه جوه مفتاح أمان (YubiKey أو أي FIDO2)، وملف [[id_ed25519_sk]] على جهازك مجرد «مقبض» مش نافع لوحده. كل دخول محتاج تلمس المفتاح، فلو حد سرق الملفات من جهازك ميقدرش يدخل.

اتجرّب في container [[ubuntu:24.04]] (OpenSSH 9.6) من غير مفتاح أمان، فطلع [[Key enrollment failed: device not found]]. الباقي من الـ docs ([[man ssh-keygen]] و OpenSSH 8.2 release notes).`,
        example: R`ssh -Q key | grep sk
ssh-keygen -t ed25519-sk -C ali@laptop
ssh-keygen -t ed25519-sk -O resident -O verify-required -C ali@laptop
ssh-keygen -K`,
        try: "لو معاك YubiKey: اعمل مفتاح [[ed25519-sk]]، وحط الـ [[.pub]] على سيرفر تجربة، وادخل. هيطلب منك تلمس المفتاح. وانقل ملف [[id_ed25519_sk]] لجهاز من غير المفتاح وجرّب.",
        deep: {
          why: "المفتاح العادي ملف على جهازك. malware أو backup متسرّب أو لابتوب اتسرق = حد معاه المفتاح للأبد (حتى لو عليه passphrase، ممكن يتكسر). مع FIDO2 الجزء الخاص عمره ما بيخرج من الجهاز الصغير، وكل استخدام محتاج لمسة.",
          how: R`[[-sk]] = security key. النوعين: [[ed25519-sk]] و [[ecdsa-sk]] (الأخير للمفاتيح القديمة اللي مش بتدعم ed25519). [[ssh -Q key]] بيعرض الأنواع اللي نسختك بتدعمها، وظهر فيها [[sk-ssh-ed25519@openssh.com]] (موجود من OpenSSH 8.2).

وقت الإنشاء ssh-keygen بيكلّم المفتاح عبر USB (أو NFC)، والمفتاح بيعمل زوج مفاتيح جواه ويرجّع «key handle». الملف [[id_ed25519_sk]] فيه الـ handle ده، مش المفتاح الخاص. و [[.pub]] عادي بتحطه في authorized_keys.

[[-O resident]]: المفتاح يتخزن على الـ YubiKey نفسه، فـ [[ssh-keygen -K]] على أي جهاز جديد بيطلّع الملفات منه. [[-O verify-required]]: لازم PIN كمان مع اللمسة. وعلى السيرفر [[PubkeyAuthOptions verify-required]] يفرض ده.

السيرفر لازم OpenSSH 8.2 أو أحدث. وعلى ويندوز، OpenSSH اللي مع ويندوز (اتشغّل هنا [[OpenSSH_for_Windows_9.5p2]]) بيكلّم المفتاح عبر Windows Hello (من الـ docs). وعلى الماك، ssh اللي مع النظام ممكن ميدعمش sk، والحل OpenSSH من Homebrew (من الـ docs).`,
          when: "مفاتيح الدخول للإنتاج وحسابات GitHub المهمة. ومع ssh certificates: الـ CA يوقّع مفتاح sk فيبقى عندك الاتنين.",
          mistakes: R`مفتاح أمان واحد بس: لو ضاع مقفول بره كل حاجة. اعمل مفتاحين وحط الاتنين في authorized_keys. وتنسى إن [[ForwardAgent]] مع sk لسه بيطلب لمسة على جهازك، فسكربتات كتير بتعلّق مستنية. وسيرفر قديم (أقل من 8.2) فالمفتاح ميتقبلش.`
        },
        teach: R`## الفكرة: المفتاح الخاص في جهاز صغير مبيطلّعهوش

| | مفتاح عادي | مفتاح [[-sk]] |
|---|---|---|
| الجزء الخاص | ملف على الديسك | جوه الـ YubiKey |
| لو الملفات اتسرقت | الحرامي يدخل | مينفعش من غير المفتاح الصغير |
| كل دخول | ولا حاجة (أو passphrase مرة في الـ agent) | لمسة على المفتاح |

---

## ١. نسختك بتدعمه؟

~~~bash
ssh -Q key | grep sk
~~~

[[-Q key]] اعرض أنواع المفاتيح المدعومة:

~~~text الناتج (OpenSSH 9.6 على أوبونتو 24.04)
sk-ssh-ed25519@openssh.com
sk-ssh-ed25519-cert-v01@openssh.com
sk-ecdsa-sha2-nistp256@openssh.com
sk-ecdsa-sha2-nistp256-cert-v01@openssh.com
~~~

النوعين، ومعاهم نسخ الشهادات ([[-cert-v01]])، يعني ينفع تدمجه مع درس [[شهادات المستخدمين]].

---

## ٢. [[ssh-keygen -t ed25519-sk]]

~~~bash
ssh-keygen -t ed25519-sk -C ali@laptop
~~~

من غير مفتاح أمان متوصّل (الـ container مفيهوش USB):

~~~text الناتج
Generating public/private ed25519-sk key pair.
You may need to touch your authenticator to authorize key generation.
Key enrollment failed: device not found
~~~

- [[touch your authenticator]]: لو متوصّل، المفتاح بينوّر ومستني لمسة.
- [[device not found]]: مفيش. ده اللي هيظهر لو نسيت توصّله.

ومع مفتاح متوصّل (من الـ docs): بعد اللمسة بيطلع [[id_ed25519_sk]] و [[id_ed25519_sk.pub]]. والـ [[.pub]] بيبدأ بـ [[sk-ssh-ed25519@openssh.com]] وبتحطه في [[authorized_keys]] زي أي مفتاح.

---

## ٣. الخيارات بـ [[-O]]

~~~bash
ssh-keygen -t ed25519-sk -O resident -O verify-required -C ali@laptop
ssh-keygen -K
~~~

| الخيار | معناه |
|---|---|
| [[-O resident]] | خزّن المفتاح على الـ YubiKey نفسه |
| [[-O verify-required]] | PIN مع كل لمسة |
| [[ssh-keygen -K]] | على جهاز جديد: طلّع ملفات المفاتيح الـ resident من الـ YubiKey |

من غير [[resident]] لازم تنقل ملف [[id_ed25519_sk]] للجهاز الجديد (لوحده مش نافع، بس محتاجه مع المفتاح).

---

## ٤. على كل نظام (من الـ docs)

| النظام | ملاحظة |
|---|---|
| لينكس | OpenSSH 8.2+ و [[libfido2]] (أوبونتو 24.04 جاهز) |
| ويندوز | ssh اللي مع ويندوز ([[OpenSSH_for_Windows_9.5p2]] على جهاز التجربة) بيستخدم Windows Hello |
| ماك | ssh بتاع النظام ممكن ميدعمش sk؛ [[brew install openssh]] |
| السيرفر | OpenSSH 8.2+، و [[PubkeyAuthOptions verify-required]] لو عايز تفرض الـ PIN |

---

## الخلاصة

- [[ssh-keygen -t ed25519-sk]] والجزء الخاص بيفضل في الـ YubiKey.
- [[-O resident]] عشان تاخده معاك، و [[-O verify-required]] للـ PIN.
- اعمل مفتاحين أمان، والاتنين في authorized_keys.`,
        lines: [
          R`الأنواع المدعومة اللي فيها sk.`,
          R`مفتاح ed25519 جوه مفتاح الأمان.`,
          R`نفس الحكاية بس متخزن على الـ YubiKey و بـ PIN.`,
          R`على جهاز جديد: هات المفاتيح من الـ YubiKey.`
        ],
        sol: R`المتوقع حسب الـ docs: ssh-keygen يطلب لمسة (و PIN لو [[verify-required]])، وبعدين كل [[ssh]] للسيرفر يطلب لمسة تاني. وملف [[id_ed25519_sk]] على جهاز تاني من غير الـ YubiKey مش بيدخل.

ولو مش معاك مفتاح: [[Key enrollment failed: device not found]]، زي ما طلع في الـ container هنا.`
      }
    ]
  },
]);
