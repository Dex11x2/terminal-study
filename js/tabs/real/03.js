// تكملة تاب real: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/real/01.js (شرح حقول الدرس في أوله)
MORE("real", [
    {
      t: "تجهيز السيرفر",
      l: 2,
      n: "من سيرفر فاضي لسيرفر جاهز، وفحص قبل أول نشر، وخريطة لسيرفر قديم",
      items: [
        {
          cmd: "setup-vps.sh",
          title: "تجهيز VPS جديد لـ Docker من الصفر",
          desc: R`سكربت بتشغّله مرة على سيرفر Ubuntu لسه واخده: يحدّث النظام، ويسطّب Docker و compose و git و ufw و fail2ban، ويعمل يوزر للتطبيق بمفاتيح SSH بتاعتك، ويقفل الفايروول على 22 و 80 و 443.

وممكن تشغّله تاني من غير ما يبوّظ حاجة: كل خطوة بتتأكد الأول هي اتعملت ولا لأ.`,
          example: R`#!/usr/bin/env bash
# sudo bash setup-vps.sh deploy
set -euo pipefail
[ "$EUID" -eq 0 ] || { echo "run it with sudo" >&2; exit 1; }
APP_USER="$__{1:-deploy}"
KEYS="$(getent passwd "$__{SUDO_USER:-root}" | cut -d: -f6)/.ssh/authorized_keys"

apt-get update && apt-get upgrade -y
apt-get install -y ca-certificates curl git ufw fail2ban

if ! command -v docker >/dev/null; then
  curl -fsSL https://get.docker.com -o /tmp/get-docker.sh
  sh /tmp/get-docker.sh
  rm /tmp/get-docker.sh
fi
docker --version; docker compose version

if ! id "$APP_USER" >/dev/null 2>&1; then
  adduser --disabled-password --gecos "" "$APP_USER"
  install -d -m 700 -o "$APP_USER" -g "$APP_USER" "/home/$APP_USER/.ssh"
  install -m 600 -o "$APP_USER" -g "$APP_USER" "$KEYS" "/home/$APP_USER/.ssh/authorized_keys"
fi
usermod -aG docker "$APP_USER"

ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

echo "now, from a NEW terminal: ssh $APP_USER@203.0.113.10 docker ps"`,
          try: "على سيرفر تجربة جديد (أو VM بـ multipass) شغّله مرتين ورا بعض: التانية لازم تعدّي من غير أخطاء ومن غير ما تعمل حاجة جديدة. وبعدين من ترمنال تاني ادخل بـ [[ssh deploy@203.0.113.10]] وجرّب [[docker ps]] من غير sudo.",
          flag: "script",
          deep: {
            why: "كل سيرفر جديد محتاج نفس الـ ١٠ خطوات. لو عملتها بإيدك كل مرة هتنسى واحدة (غالبًا الفايروول)، ولو في سكربت هتبقى نفس الحاجة على كل سيرفر.",
            how: R`[[set -euo pipefail]] في الأول بيخلي أي أمر يفشل يوقف السكربت، بدل ما يكمل على سيرفر نص متجهّز.

كل خطوة «idempotent»، يعني تشغيلها مرتين زي مرة: Docker بيتسطب بس لو [[command -v docker]] ملقاهوش، واليوزر بيتعمل بس لو [[id]] ملقاهوش، و [[usermod -aG]] و [[ufw allow]] مش بيضرّوا لو اتكرروا.

سكربت get.docker.com بيتنزّل في ملف الأول بدل [[curl | sh]]، عشان لو عايز تقراه قبل ما تشغّله تقدر، ولو التنزيل وقف في النص ميتنفذش نص سكربت.

اليوزر الجديد بيتعمل من غير باسورد ([[--disabled-password]])، والدخول بالمفاتيح اللي انت داخل بيها دلوقتي: [[SUDO_USER]] هو اسم اليوزر اللي كتب sudo، و [[getent passwd]] بيجيب فولدر الـ home بتاعه. و [[install]] بيعمل الفولدر والملف بالمالك والصلاحيات الصح في خطوة واحدة (700 للفولدر و 600 للملف، وإلا SSH هيرفض المفاتيح).

خد بالك: جروب docker معناه صلاحيات root فعليًا (أي حد فيه يقدر يركّب / جوه container). فاليوزر ده للتطبيق بس، ومش محتاج sudo.

وخد بالك كمان: Docker بيكتب قواعد iptables بتاعته، فأي بورت بتنشره بـ [[-p 5432:5432]] بيبقى مفتوح للعالم حتى لو ufw قافله. عشان كده في الـ compose اربط على [[127.0.0.1]].`,
            when: "أول ما تاخد VPS جديد، قبل أي clone أو deploy. وبعد ما يخلص، اقفل الدخول بالباسورد من sshd_config بعد ما تتأكد إن الدخول بالمفتاح شغال.",
            mistakes: R`في مشروع حقيقي كان السكربت بيشتغل كله بـ root ومفيهوش يوزر للتطبيق خالص، و [[usermod -aG docker "$USER"]] وهو root كانت بتضيف root نفسه للجروب (ملهاش أي لازمة). وكان بيسطّب apt-transport-https و docker-compose-plugin على الفاضي (get.docker.com بيسطّب compose أصلًا). وكان الـ IP والدومين مكتوبين جوه السكربت، فمينفعش يتستخدم على سيرفر تاني.

وغلطة شائعة: تقفل الدخول بالباسورد وتقفل الترمنال قبل ما تجرّب الدخول بالمفتاح من ترمنال جديد، فتقفل الباب على نفسك.`
          },
          teach: R`## الأول: السكربت ده ٥ أجزاء

1. **حراسة**: لازم root، وجهّز المتغيرات.
2. **الباكدجات**: تحديث وأدوات أساسية.
3. **Docker**: لو مش متسطّب.
4. **يوزر التطبيق**: بمفاتيح SSH بتاعتك.
5. **الفايروول**: 22 و 80 و 443 بس.

جربته مرتين ورا بعض في container [[ubuntu:24.04]] جديد (بـ [[--cap-add NET_ADMIN]] عشان ufw يقدر يكتب قواعد جوه شبكة الـ container بس، مش الجهاز)، وحطيت مفتاح وهمي في [[/root/.ssh/authorized_keys]] زي سيرفر لسه واخده. وسطّبت [[openssh-server]] الأول لأن أي VPS بييجي بيه (هتعرف ليه تحت). الحاجة الوحيدة اللي مش هتشتغل في container هي تشغيل خدمة Docker نفسها (مفيش systemd)، فاللي عنها تحت من التوثيق.

---

## ١. الحراسة والمتغيرات

### [[#!/usr/bin/env bash]] و [[# sudo bash setup-vps.sh deploy]]

السطر الأول: شغّل بـ bash. التاني تعليق بيقولك إزاي تشغّله: بـ sudo، وأول argument اسم اليوزر.

### [[set -euo pipefail]]

أي أمر يفشل يوقف السكربت ([[-e]])، والمتغير غير المعرّف خطأ ([[-u]])، وفشل أي جزء في pipe يتحسب ([[pipefail]]). على سيرفر، ده الفرق بين «وقف عند الغلطة» و «كمّل وساب سيرفر نص متجهّز».

### [[[ "$EUID" -eq 0 ] || { echo "run it with sudo" >&2; exit 1; }]]

- [[$EUID]] (Effective User ID) رقم اليوزر اللي الصلاحيات بتتحسب بيه دلوقتي. root رقمه [[0]]، وتحت sudo بيبقى [[0]] برضه.
- [[-eq]] = يساوي (للأرقام).
- [[>&2]] اطبع الرسالة على stderr (مكان الأخطاء) مش stdout.

جربته بيوزر عادي من غير sudo:

~~~text الناتج
run it with sudo
exit=1
~~~

### [[APP_USER="$__{1:-deploy}"]]

- [[$1]] أول argument بعد اسم السكربت.
- [[$__{1:-deploy}]] «قيمة [[$1]]، ولو فاضي أو مش موجود استخدم [[deploy]]». ومن غير الشكل ده، [[set -u]] كان هيوقف السكربت لو مكتبتش argument.

### [[KEYS="$(getent passwd "$__{SUDO_USER:-root}" | cut -d: -f6)/.ssh/authorized_keys"]]

من جوه لبرة:

1. [[$SUDO_USER]]: لما تكتب [[sudo]]، النظام بيحط فيه اسمك الحقيقي (اللي كتب sudo). و [[:-root]] لو انت داخل root مباشرة.
2. [[getent passwd ali]] بيجيب سطر اليوزر من قاعدة اليوزرات:

~~~text الناتج
ali:x:1001:1001::/home/ali:/bin/sh
~~~

الخانات مفصولة بـ [[:]]: الاسم، الباسورد ([[x]] = في ملف تاني)، UID، GID، وصف، **الـ home**، الـ shell.

3. [[cut -d: -f6]] قطّع بالـ [[:]] ([[-d]] = delimiter) وهات الخانة السادسة ([[-f6]] = field):

~~~text الناتج
/home/ali
~~~

4. وبعدها [[/.ssh/authorized_keys]]. النتيجة: ملف المفاتيح اللي انت داخل بيها دلوقتي، وده اللي هننسخه لليوزر الجديد.

ليه مش [[~]]؟ لأن تحت sudo الـ [[~]] ممكن تبقى [[/root]].

---

## ٢. الباكدجات

### [[apt-get update && apt-get upgrade -y]]

- [[apt-get update]]: حدّث **قايمة** الباكدجات المتاحة (مش بيسطّب حاجة).
- [[apt-get upgrade -y]]: سطّب التحديثات، و [[-y]] = وافق على كل الأسئلة.

~~~text الناتج (أول مرة)
2 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.
~~~

### [[apt-get install -y ca-certificates curl git ufw fail2ban]]

| الباكدج | ليه |
|---|---|
| [[ca-certificates]] | شهادات عشان curl يثق في مواقع https |
| [[curl]] | ينزّل سكربت Docker |
| [[git]] | يعمل clone للمشروع |
| [[ufw]] | Uncomplicated Firewall: واجهة سهلة لقواعد الفايروول |
| [[fail2ban]] | يقرا لوجات SSH ويحظر الـ IP اللي بيجرّب باسوردات غلط كتير |

~~~text الناتج (أول مرة)
0 upgraded, 40 newly installed, 0 to remove and 0 not upgraded.
After this operation, 91.3 MB of additional disk space will be used.
~~~

وتاني مرة:

~~~text الناتج
ufw is already the newest version (0.36.2-6).
fail2ban is already the newest version (1.0.2-3ubuntu0.1).
0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.
~~~

---

## ٣. Docker

### [[if ! command -v docker >/dev/null; then ... fi]]

[[command -v docker]] بينجح لو docker موجود، و [[!]] بتعكس. يعني «لو Docker **مش** موجود». التشغيل التاني بيلاقيه فبيعدّي الجزء ده كله.

### التلات سطور جوه

~~~bash
curl -fsSL https://get.docker.com -o /tmp/get-docker.sh
sh /tmp/get-docker.sh
rm /tmp/get-docker.sh
~~~

- [[curl -fsSL]]: [[-f]] افشل لو السيرفر رجّع خطأ (بدل ما يحفظ صفحة الخطأ)، [[-s]] من غير progress، [[-S]] بس اطبع الأخطاء، [[-L]] امشي ورا الـ redirect.
- [[-o /tmp/get-docker.sh]] احفظ في ملف. ممكن تفتحه وتقراه قبل ما تشغّله.
- [[sh /tmp/get-docker.sh]] شغّله: بيضيف مستودع Docker الرسمي ويسطّب:

~~~text الناتج (مختصر)
# Executing docker install script, commit: 2b32480025b...
+ sh -c curl -fsSL "https://download.docker.com/linux/ubuntu/gpg" -o /etc/apt/keyrings/docker.asc
+ sh -c echo "deb [arch=amd64 signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu noble stable" > /etc/apt/sources.list.d/docker.list
+ sh -c apt-get -y -qq install docker-ce docker-ce-cli containerd.io docker-compose-plugin docker-ce-rootless-extras docker-buildx-plugin docker-model-plugin
Using systemd to manage Docker service
+ sh -c systemctl enable --now docker.service
~~~

لاحظ إنه بيسطّب [[docker-compose-plugin]] لوحده، فمش محتاج تسطّبه انت. و [[noble]] اسم Ubuntu 24.04. وفي الـ container ظهر [[WARNING: unable to enable the docker service]] لأن مفيش systemd، وظهر [[WSL DETECTED]] مع انتظار ٢٠ ثانية لأن Docker Desktop شغال على WSL. على VPS حقيقي الاتنين مش هيظهروا والخدمة بتقوم (من التوثيق).

- [[rm]] امسح السكربت بعد ما خلص.

### [[docker --version; docker compose version]]

~~~text الناتج
Docker version 29.8.2, build 7fc2dff
Docker Compose version v5.6.0
~~~

مفصولين بـ [[;]] مش [[&&]] عشان [[set -e]] يشتغل على الاتنين: لو أي واحد فشل السكربت يقف.

---

## ٤. يوزر التطبيق

### [[if ! id "$APP_USER" >/dev/null 2>&1; then]]

[[id deploy]] بيطبع أرقام اليوزر لو موجود ويفشل لو لأ. [[2>&1]] ابعت الأخطاء لنفس مكان المخرجات (اللي هو [[/dev/null]]).

### [[adduser --disabled-password --gecos "" "$APP_USER"]]

- [[--disabled-password]]: من غير باسورد. محدش يدخل بيه بباسورد، بالمفاتيح بس.
- [[--gecos ""]]: خانة الوصف (الاسم الكامل والتليفون...) فاضية، فمش هيسألك أسئلة.

~~~text الناتج
info: Adding user $__btdeploy' ...
info: Adding new group $__btdeploy' (1001) ...
info: Adding new user $__btdeploy' (1001) with group $__btdeploy (1001)' ...
info: Creating home directory $__bt/home/deploy' ...
info: Adding user $__btdeploy' to group $__btusers' ...
~~~

### [[install -d -m 700 -o "$APP_USER" -g "$APP_USER" "/home/$APP_USER/.ssh"]]

[[install]] بينسخ ملفات أو يعمل فولدرات **وبيحط المالك والصلاحيات في نفس الخطوة**:

| الحتة | معناها |
|---|---|
| [[-d]] | اعمل فولدر |
| [[-m 700]] | الصلاحيات: المالك بس يقرا ويكتب ويدخل |
| [[-o]] / [[-g]] | المالك (owner) والجروب |

### [[install -m 600 -o "$APP_USER" -g "$APP_USER" "$KEYS" "/home/$APP_USER/.ssh/authorized_keys"]]

انسخ ملف المفاتيح بصلاحية [[600]] (المالك بس يقرا ويكتب). SSH بيرفض المفاتيح لو الملف أو الفولدر مفتوح لحد تاني. النتيجة:

~~~text stat
700 deploy:deploy /home/deploy/.ssh
600 deploy:deploy /home/deploy/.ssh/authorized_keys
~~~

### [[usermod -aG docker "$APP_USER"]]

[[-G docker]] الجروب، و [[-a]] (append) **ضيف** عليه من غير ما تشيله من جروباته التانية. من غير [[-a]] كان هيشيله من كل الجروبات التانية.

~~~text id deploy
uid=1001(deploy) gid=1001(deploy) groups=1001(deploy),100(users),995(docker)
~~~

> جروب docker = صلاحيات root فعليًا، فاليوزر ده للتطبيق بس.

---

## ٥. الفايروول

### [[ufw allow OpenSSH]]

[[OpenSSH]] هنا اسم **profile** جاي مع باكدج [[openssh-server]]:

~~~text /etc/ufw/applications.d/openssh-server
[OpenSSH]
title=Secure shell server, an rshd replacement
ports=22/tcp
~~~

في أول تجربة في container مفيهوش openssh-server، السكربت وقف هنا:

~~~text الناتج
ERROR: Could not find a profile matching 'OpenSSH'
~~~

على أي VPS الباكدج موجود (انت داخل بـ SSH أصلًا). والسطر ده **قبل** [[enable]]، وإلا هتقفل الباب على نفسك.

### [[ufw allow 80/tcp]] و [[ufw allow 443/tcp]]

HTTP و HTTPS. [[/tcp]] بروتوكول TCP بس.

~~~text الناتج أول مرة
Rules updated
Rules updated (v6)
~~~

كل قاعدة بتتعمل لـ IPv4 و IPv6 ([[v6]]).

### [[ufw --force enable]]

فعّل. [[--force]] من غير سؤال «ممكن يقطع SSH، متأكد؟».

~~~text الناتج
Firewall is active and enabled on system startup
~~~

~~~text ufw status verbose
Status: active
Default: deny (incoming), allow (outgoing), deny (routed)

To                         Action      From
22/tcp (OpenSSH)           ALLOW IN    Anywhere
80/tcp                     ALLOW IN    Anywhere
443/tcp                    ALLOW IN    Anywhere
~~~

[[deny (incoming)]]: أي حاجة داخلة مرفوضة إلا الـ ٣ دول.

### [[echo "now, from a NEW terminal: ssh $APP_USER@203.0.113.10 docker ps"]]

تفكير: جرّب الدخول من ترمنال **جديد** قبل ما تقفل الحالي. ([[203.0.113.10]] IP للأمثلة بس، حط IP سيرفرك.)

---

## ٦. التشغيل التاني: idempotent

~~~text الناتج
0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.
Docker version 29.8.2, build 7fc2dff
Docker Compose version v5.6.0
Skipping adding existing rule
Skipping adding existing rule (v6)
...
Firewall is active and enabled on system startup
now, from a NEW terminal: ssh deploy@203.0.113.10 docker ps
exit=0
~~~

مفيش تسطيب Docker تاني، ولا [[adduser]]، و ufw قال [[Skipping]]. والأول خد حوالي دقيقة ونص.

---

## الخلاصة

| الجزء | الأمر | التكرار آمن عشان |
|---|---|---|
| root؟ | [[[ "$EUID" -eq 0 ]]] | — |
| الباكدجات | [[apt-get install -y]] | apt بيقول already newest |
| Docker | [[get.docker.com]] | [[if ! command -v docker]] |
| اليوزر | [[adduser]] + [[install]] | [[if ! id]] |
| الجروب | [[usermod -aG docker]] | إضافة لجروب موجود فيه = ولا حاجة |
| الفايروول | [[ufw allow]] ثم [[enable]] | ufw بيعدّي القاعدة الموجودة |

وبعده: جرّب SSH باليوزر الجديد من ترمنال تاني، وبعدين بس اقفل الدخول بالباسورد.`,
          lines: [
            "أي أمر يفشل يوقف السكربت، وأي متغير مش متعرّف يبقى غلطة، وفشل أي جزء في pipe يتحسب.",
            "لو مش root (الـ [[EUID]] مش 0) اطبع رسالة واخرج.",
            "اسم يوزر التطبيق من أول argument، ولو مفيش يبقى deploy.",
            "مكان مفاتيح SSH بتاعة اليوزر اللي كتب sudo (أو root)، عشان ننسخها لليوزر الجديد.",
            "حدّث لستة الباكدجات وسطّب التحديثات.",
            "الأدوات الأساسية: شهادات و curl و git والفايروول و fail2ban.",
            "لو Docker مش متسطب...",
            "...نزّل سكربت التسطيب الرسمي في ملف.",
            "...شغّله.",
            "...وامسحه.",
            "نهاية الـ if.",
            "اتأكد إن Docker و compose شغالين (لو لأ، [[set -e]] هيوقف هنا). مفصولين بـ [[;]] مش [[&&]]، لأن فشل أول أمر في [[&&]] مش بيوقف [[set -e]].",
            "لو اليوزر مش موجود...",
            R`...اعمله من غير باسورد ومن غير أسئلة ([[--gecos ""]]).`,
            "...اعمل فولدر .ssh بتاعه بصلاحيات 700 وملكه.",
            "...وانسخ المفاتيح بصلاحيات 600.",
            "نهاية الـ if.",
            "ضيفه لجروب docker عشان يشغّل docker من غير sudo.",
            "اسمح بـ SSH قبل ما تفعّل الفايروول (وإلا هتقفل على نفسك).",
            "اسمح بـ HTTP.",
            "اسمح بـ HTTPS.",
            "فعّل الفايروول من غير ما يسألك.",
            "افكرك تجرّب الدخول باليوزر الجديد من ترمنال تاني."
          ],
          sol: R`أول تشغيل بياخد دقايق (apt upgrade و Docker) وفي الآخر بيطبع نسخة Docker و [[Docker Compose version v2...]] و [[Firewall is active and enabled on system startup]] و [[now, from a NEW terminal: ssh deploy@... docker ps]].

التشغيل التاني لازم يعدّي من غير أخطاء: [[command -v docker]] بيلاقي Docker فمش بيسطّبه تاني، و [[id deploy]] بيلاقي اليوزر فمش بيعمله، و [[ufw allow]] بيقول [[Skipping adding existing rule]]. ده معنى idempotent: تشغّله مرة ولا عشرة والنتيجة واحدة. لو [[adduser]] فشل في التانية يبقى نسيت الشرط.

من ترمنال جديد، [[ssh deploy@IP]] ثم [[docker ps]] لازم يرجّع جدول فاضي ([[CONTAINER ID   IMAGE ...]]) من غير sudo. لو طلع [[permission denied while trying to connect to the Docker daemon socket]] يبقى انت لسه في session قديمة قبل [[usermod -aG docker]]، اخرج وادخل تاني. ومتقفلش ترمنال الـ root قبل ما تتأكد إن SSH بيوزر deploy شغال. (جربته مرتين في container [[ubuntu:24.04]] فيه openssh-server: التسطيب والـ ufw والتشغيل التاني طلعوا زي الكلام ده بالظبط، Docker 29.8.2 و Compose v5.6.0. تشغيل خدمة Docker نفسها والدخول بـ SSH من ترمنال تاني من التوثيق، لأن الـ container مفيهوش systemd.)`
        },
        {
          cmd: "preflight.sh",
          title: "فحص السيرفر قبل أول نشر، ويصلّح لو طلبت",
          desc: R`سكربت بيقرا بس ومش بيغيّر حاجة: يشوف الأنوية والمساحة والـ swap و Docker، والبورتات اللي مفروض تبقى مقفولة، والدخول بالباسورد، وإن الدومين بيشاور على السيرفر ده. وفي الآخر يطبع ملخص ويرجع exit code.

ولو شغّلته بـ [[--fix]] بيصلّح اللي ينفع يتصلّح لوحده (هنا الـ swap).`,
          example: R`#!/usr/bin/env bash
# ./preflight.sh              فحص بس، مش بيغيّر حاجة
# sudo ./preflight.sh --fix   فحص + تصليح اللي ينفع يتصلّح
set -uo pipefail
FIX=0; [ "$__{1:-}" = "--fix" ] && FIX=1
PASS=0; WARN=0; FAIL=0
ok()   { echo "  ok    $*"; PASS=$((PASS+1)); }
warn() { echo "  warn  $*"; WARN=$((WARN+1)); }
bad()  { echo "  FAIL  $*"; FAIL=$((FAIL+1)); }

CORES=$(nproc)
DISK_GB=$(df -BG --output=avail / | tail -1 | tr -dc '0-9')
[ "$CORES" -ge 2 ] && ok "$CORES cores" || bad "$CORES cores (need 2)"
[ "$DISK_GB" -ge 20 ] && ok "$DISK_GB GB free" || bad "$DISK_GB GB free (need 20)"

SWAP_MB=$(free -m | awk '/^Swap:/{print $2}')
if [ "$SWAP_MB" -ge 2048 ]; then ok "swap $SWAP_MB MB"
elif [ "$FIX" -eq 1 ]; then
  if fallocate -l 4G /swapfile && chmod 600 /swapfile && mkswap -q /swapfile && swapon /swapfile; then
    grep -q '^/swapfile' /etc/fstab || echo '/swapfile none swap sw 0 0' >> /etc/fstab
    ok "swap 4G created"
  else bad "swap not created (see the error above)"; fi
else warn "no swap (run again with --fix)"; fi

command -v docker >/dev/null && ok "docker installed" || bad "docker missing"
for p in 5432 6379 27017; do
  ss -ltnH "sport = :$p" | awk '{print $4}' | grep -qE '^(0\.0\.0\.0|\[::\]|\*):' && bad "port $p open to the world" || ok "port $p private"
done
sshd -T 2>/dev/null | grep -qx 'passwordauthentication no' && ok "SSH keys only" || warn "SSH password login is on"

IP=$(curl -4 -s --max-time 5 https://api.ipify.org || true)
HOST=$(grep -E '^APP_HOST=' .env 2>/dev/null | cut -d= -f2 || true)
DNS=$(getent ahostsv4 "$HOST" | awk '{print $1; exit}')
[ -n "$IP" ] && [ "$DNS" = "$IP" ] && ok "$HOST -> $DNS" || bad "APP_HOST '$HOST' -> $__{DNS:-nothing}, server is $__{IP:-unknown}"

echo "pass $PASS · warn $WARN · fail $FAIL"
[ "$FAIL" -eq 0 ]`,
          try: "شغّله من غير [[--fix]] على سيرفر التجربة واقرا النتيجة. وبعدين شغّل [[docker run -d -p 6379:6379 redis]] وأعد الفحص: لازم يطلع FAIL على 6379. امسح الـ container وأعد تاني.",
          flag: "script",
          deep: {
            why: "أغلب مشاكل أول نشر مش في الكود: سيرفر رام قليلة من غير swap فالـ build يموت، أو الدومين لسه مش بيشاور على السيرفر فـ certbot يفشل، أو قاعدة البيانات مفتوحة للإنترنت. الفحص ده بيمسكهم في ثانيتين قبل ما تضيّع ساعة.",
            how: R`السكربت مفيهوش [[set -e]] عن قصد: الفحص المفروض يكمل للآخر ويوريك كل المشاكل مرة واحدة، مش يقف عند أول واحدة. وفيه [[set -u]] عشان متغير مكتوب غلط يبان.

الـ ٣ دوال [[ok]] و [[warn]] و [[bad]] بيطبعوا ويعدّوا. والشكل [[شرط && ok || bad]] معناه «لو الشرط نجح قول ok، وإلا قول FAIL». وده آمن هنا لأن ok نفسها عمرها ما بتفشل.

البورتات: [[ss -ltnH]] بيعرض اللي بيسمع على TCP من غير عناوين أعمدة، والفلتر [[sport = :5432]] بيجيب البورت ده بس. لو العنوان [[0.0.0.0]] أو [[[::]]] يبقى مفتوح على كل الواجهات، ولو [[127.0.0.1]] يبقى جوه السيرفر بس. والـ grep لازم يبص على عمود العنوان المحلي بس ([[awk '{print $4}']])، لأن عمود الـ peer بتاع أي socket سامع بيبقى [[0.0.0.0:*]].

SSH: [[sshd -T]] بيطبع الإعدادات «النهائية» اللي sshd شغال بيها فعلًا، بعد ما يقرا sshd_config وكل الملفات في sshd_config.d. ده أهم من grep على الملف، لأن صور Ubuntu على السحابة غالبًا فيها ملف في sshd_config.d بيرجّع الباسورد تاني. ومحتاج root، فمن غير sudo هيطلع warn.

DNS: [[getent ahostsv4]] بيجيب IPv4 بس، فالمقارنة مع IP السيرفر من ipify (اللي برضه IPv4 بـ [[-4]]) بتبقى عادلة.

وآخر سطر [[[ "$FAIL" -eq 0 ]]] هو الـ exit code بتاع السكربت كله، فتقدر تكتب [[./preflight.sh && ./deploy.sh deploy]].`,
            when: "قبل أول نشر على سيرفر جديد، وبعد أي تغيير كبير (نقل دومين، أو إضافة خدمة). وممكن يبقى أول خطوة في deploy.sh.",
            mistakes: "في مشروع حقيقي كان الفحص بيقارن ناتج [[getent hosts]] (اللي ممكن يرجع IPv6) بـ IPv4 من ipify، فيطلع «الدومين مش بيشاور هنا» وهو بيشاور. ولو ipify كان واقع، الـ IP بيبقى فاضي وكل الدومينات تفشل برسالة ملهاش معنى، فهنا بيطبع «server is unknown». وكان بيعمل grep على sshd_config بس، فيقول «keys only» والسيرفر فعليًا قابل باسورد من ملف في sshd_config.d. وكمان بيفترض Ubuntu و root من غير ما يقول. ولما جربت نسخة الدرس نفسها لقيت غلطتين اتصلحوا: الـ grep على سطر [[ss]] كله كان بيلاقي [[0.0.0.0]] في عمود الـ peer ([[0.0.0.0:*]])، فأي بورت سامع حتى على 127.0.0.1 كان بيطلع FAIL؛ و [[--fix]] كان بيطبع [[ok swap 4G created]] ويكتب في fstab حتى لو [[swapon]] فشل، لأن السكربت من غير [[set -e]] والسطور اللي بعد الـ && كانت بتتنفذ عادي."
          },
          teach: R`## الأول: شكل السكربت

٣ دوال صغيرة بتطبع وتعدّ ([[ok]] و [[warn]] و [[bad]])، وبعدهم فحوصات ورا بعض، كل فحص سطر أو اتنين، وفي الآخر ملخص و exit code. ومفيش [[set -e]] **عن قصد**: الفحص لازم يكمل للآخر ويوريك كل المشاكل.

جربته في container [[ubuntu:24.04]] (بعد ما سطّبت [[iproute2]] و [[procps]] و [[curl]] و [[openssh-server]])، وفتحت بورتات بـ [[nc]] عشان أشوف الفحص بيمسكها. والتجربة طلّعت غلطتين في نسخة الدرس واتصلحوا (تحت في البورتات والـ swap). والـ container شايف موارد الـ VM بتاعة Docker Desktop، فالأرقام كبيرة.

~~~text الناتج (أول تشغيل، الـ IP العام متغطي)
  ok    16 cores
  ok    926 GB free
  ok    swap 4096 MB
  FAIL  docker missing
  ok    port 5432 private
  ok    port 6379 private
  ok    port 27017 private
  warn  SSH password login is on
  FAIL  APP_HOST 'example.com' -> 172.66.147.243, server is 198.51.100.23
pass 6 · warn 1 · fail 2
exit=1
~~~

---

## ١. البداية

### [[set -uo pipefail]]

[[-u]] متغير مش معرّف = خطأ، و [[pipefail]]. **من غير [[-e]]**: لو فحص فشل، كمّل.

### [[FIX=0; [ "$__{1:-}" = "--fix" ] && FIX=1]]

- [[$__{1:-}]] أول argument، ولو مش موجود نص فاضي (من غيرها [[set -u]] كان هيوقف السكربت لو شغّلته من غير arguments).
- [[=]] جوه [[[ ]]] مقارنة نصوص.
- [[&& FIX=1]] لو الشرط صح، خلي FIX واحد.

### [[PASS=0; WARN=0; FAIL=0]]

٣ عدّادات. [[;]] بتفصل أوامر في نفس السطر.

### الـ ٣ دوال

~~~bash
ok()   { echo "  ok    $*"; PASS=$((PASS+1)); }
warn() { echo "  warn  $*"; WARN=$((WARN+1)); }
bad()  { echo "  FAIL  $*"; FAIL=$((FAIL+1)); }
~~~

- [[ok() { ...; }]] تعريف دالة اسمها [[ok]].
- [[$*]] كل الـ arguments اللي اتبعتت للدالة كنص واحد. فـ [[ok "16 cores"]] بتطبع [[ok    16 cores]] (بمسافتين قبلها).
- [[$((PASS+1))]] حساب أرقام في bash. [[$(( ))]] للحساب، و [[$( )]] لتشغيل أمر، متتلخبطش.

---

## ٢. الأنوية والمساحة

### [[CORES=$(nproc)]]

[[nproc]] عدد المعالجات المنطقية: [[16]].

### [[DISK_GB=$(df -BG --output=avail / | tail -1 | tr -dc '0-9')]]

من الشمال لليمين في الـ pipe:

~~~text df -BG --output=avail /
Avail
 926G
~~~

- [[-BG]] الوحدة جيجا (Block size = G)، و [[--output=avail]] عمود الفاضي بس، و [[/]] الديسك اللي عليه النظام.
- [[tail -1]] آخر سطر: [[ 926G]].
- [[tr -dc '0-9']]: [[tr]] بيبدّل حروف، [[-d]] امسح، [[-c]] عكس المجموعة. يعني «امسح أي حاجة **مش** رقم». النتيجة [[926]].

### [[[ "$CORES" -ge 2 ] && ok "..." || bad "..."]]

[[-ge]] أكبر من أو يساوي. والشكل [[شرط && ok || bad]]: لو الشرط صح [[ok]]، وإلا [[bad]]. آمن هنا لأن [[ok]] نفسها عمرها ما بتفشل (لو فشلت كانت [[bad]] هتتنفذ كمان).

نفس الكلام للديسك: أقل من 20 جيجا فاضية = FAIL.

---

## ٣. الـ swap

### [[SWAP_MB=$(free -m | awk '/^Swap:/{print $2}')]]

~~~text free -m
               total        used        free      shared  buff/cache   available
Mem:           15698         947       13112          18        1897       14750
Swap:           4096           0        4096
~~~

[[-m]] بالميجا. و [[awk '/^Swap:/{print $2}']]: في السطر اللي بيبدأ بـ [[Swap:]] اطبع العمود التاني (الإجمالي) = [[4096]].

### الـ if

~~~bash
if [ "$SWAP_MB" -ge 2048 ]; then ok "swap $SWAP_MB MB"
elif [ "$FIX" -eq 1 ]; then
  if fallocate -l 4G /swapfile && chmod 600 /swapfile && mkswap -q /swapfile && swapon /swapfile; then
    grep -q '^/swapfile' /etc/fstab || echo '/swapfile none swap sw 0 0' >> /etc/fstab
    ok "swap 4G created"
  else bad "swap not created (see the error above)"; fi
else warn "no swap (run again with --fix)"; fi
~~~

| الأمر | بيعمل إيه |
|---|---|
| [[fallocate -l 4G /swapfile]] | احجز ملف 4 جيجا على الديسك |
| [[chmod 600 /swapfile]] | root بس يقرا ويكتب (فيه محتوى الـ RAM) |
| [[mkswap -q /swapfile]] | جهّزه كـ swap، و [[-q]] من غير كلام |
| [[swapon /swapfile]] | شغّله دلوقتي |
| [[grep -q '^/swapfile' /etc/fstab ||]] | لو مش مكتوب في fstab... |
| [[echo '/swapfile none swap sw 0 0' >> /etc/fstab]] | ...ضيفه، عشان يشتغل بعد الـ reboot |

[[/etc/fstab]] ملف بيقول للنظام يركّب إيه وقت الإقلاع. والسطر معناه: الملف ده، ملوش مكان تركيب ([[none]])، نوعه swap، بالإعدادات العادية ([[sw]])، ومن غير backup ولا فحص ([[0 0]]).

**الغلطة اللي اتصلحت:** النسخة القديمة كانت سلسلة [[&&]] لوحدها وبعدها [[ok]]. ولأن السكربت من غير [[set -e]]، لو [[swapon]] فشل السلسلة بتقف، بس السطرين اللي بعدها بيتنفذوا عادي. جربتها في الـ container (اللي مينفعش يعمل swapon) بعد ما خليت [[free]] يقول إن مفيش swap، وبملف 16M بدل 4G عشان مملاش الديسك:

~~~text النسخة القديمة
swapon: /swapfile: swapon failed: Operation not permitted
  ok    swap 4G created
/swapfile none swap sw 0 0          ← اتكتب في fstab كمان
~~~

~~~text النسخة المصلّحة
swapon: /swapfile: swapon failed: Operation not permitted
  FAIL  swap not created (see the error above)
fstab untouched
~~~

دلوقتي السلسلة كلها جوه [[if]]: fstab و [[ok]] بس لو كله نجح. وعلى VPS حقيقي بـ sudo الـ swapon بينجح (من التوثيق).

---

## ٤. Docker

[[command -v docker >/dev/null && ok "docker installed" || bad "docker missing"]]: في الـ container مفيش Docker، فطلع [[FAIL  docker missing]].

---

## ٥. البورتات المكشوفة

~~~bash
for p in 5432 6379 27017; do
  ss -ltnH "sport = :$p" | awk '{print $4}' | grep -qE '^(0\.0\.0\.0|\[::\]|\*):' && bad "port $p open to the world" || ok "port $p private"
done
~~~

### [[for p in 5432 6379 27017; do ... done]]

لف على بورتات Postgres و Redis و Mongo، وكل مرة الرقم في [[$p]].

### [[ss -ltnH "sport = :$p"]]

[[ss]] (socket statistics): [[-l]] السامعين بس، [[-t]] TCP، [[-n]] أرقام مش أسامي، [[-H]] من غير سطر العناوين. و [[sport = :6379]] فلتر: البورت المحلي (source port) ده بس.

فتحت [[nc -lk 0.0.0.0 6379]] و [[nc -lk 127.0.0.1 5432]]:

~~~text الناتج
LISTEN 0      1      0.0.0.0:6379 0.0.0.0:*
LISTEN 0      1      127.0.0.1:5432 0.0.0.0:*
~~~

الأعمدة: الحالة، الطابور، الحد، **العنوان المحلي**، والطرف التاني (peer).

### الغلطة اللي اتصلحت

النسخة القديمة كانت بتعمل grep على السطر كله. بص على آخر عمود: [[0.0.0.0:*]] موجود في **أي** socket سامع، فـ 5432 اللي على 127.0.0.1 طلع:

~~~text النسخة القديمة
  FAIL  port 5432 open to the world
  FAIL  port 6379 open to the world
~~~

عشان كده [[awk '{print $4}']] بياخد العمود الرابع (العنوان المحلي) بس، و [[grep -qE '^(0\.0\.0\.0|\[::\]|\*):']]: [[-q]] من غير طباعة، [[-E]] regex موسّع، [[^]] من أول النص، و [[\.]] نقطة حقيقية، والتلات بدايات «كل الواجهات» في IPv4 و IPv6 و [[*]].

~~~text النسخة المصلّحة
  ok    port 5432 private
  FAIL  port 6379 open to the world
  ok    port 27017 private
~~~

---

## ٦. SSH: [[sshd -T 2>/dev/null | grep -qx 'passwordauthentication no']]

- [[sshd -T]] (test mode) بيطبع الإعدادات **النهائية** بعد ما يقرا [[sshd_config]] وكل ملفات [[sshd_config.d]]. محتاج root ومفاتيح السيرفر.
- [[grep -qx]]: [[-x]] السطر كله لازم يطابق بالظبط.

~~~text sshd -T | grep passwordauthentication
passwordauthentication yes
~~~

فطلع [[warn  SSH password login is on]]. وبعد ما حطيت [[PasswordAuthentication no]] في ملف في [[/etc/ssh/sshd_config.d/]]:

~~~text الناتج
  ok    SSH keys only
~~~

---

## ٧. الدومين بيشاور على السيرفر ده؟

### [[IP=$(curl -4 -s --max-time 5 https://api.ipify.org || true)]]

- [[api.ipify.org]] موقع بيرد بالـ IP العام اللي الطلب جاي منه.
- [[-4]] IPv4 بس، [[-s]] من غير progress، [[--max-time 5]] متستناش أكتر من ٥ ثواني.
- [[|| true]] لو فشل، متعتبرهوش فشل (يبقى [[IP]] فاضي).

### [[HOST=$(grep -E '^APP_HOST=' .env 2>/dev/null | cut -d= -f2 || true)]]

السطر اللي بيبدأ بـ [[APP_HOST=]] من [[.env]]، وبعدين [[cut -d= -f2]] اللي بعد الـ [[=]]: [[example.com]].

### [[DNS=$(getent ahostsv4 "$HOST" | awk '{print $1; exit}')]]

~~~text getent ahostsv4 example.com
172.66.147.243  STREAM example.com
172.66.147.243  DGRAM
172.66.147.243  RAW
~~~

[[ahostsv4]] عناوين IPv4 بس (عشان نقارن بـ IPv4 من ipify). و [[awk '{print $1; exit}']] أول عمود من أول سطر واخرج.

### المقارنة

[[[ -n "$IP" ] && [ "$DNS" = "$IP" ] && ok ... || bad ...]]: لو IP مش فاضي والاتنين متساويين، تمام. وإلا FAIL برسالة فيها القيمتين، و [[$__{DNS:-nothing}]] تطبع [[nothing]] لو فاضي. هنا [[example.com]] مش بيشاور على الـ container ده، فـ FAIL، وده المطلوب.

---

## ٨. الآخر

### [[echo "pass $PASS · warn $WARN · fail $FAIL"]]

الملخص: [[pass 6 · warn 1 · fail 2]].

### [[[ "$FAIL" -eq 0 ]]]

آخر أمر في السكربت هو الـ exit code بتاعه. فيه FAIL = [[exit=1]]، فتقدر تكتب [[./preflight.sh && ./deploy.sh]] والنشر ميحصلش لو الفحص فشل.

---

## الخلاصة

| الفحص | الأداة | النتيجة |
|---|---|---|
| أنوية / مساحة | [[nproc]] و [[df -BG --output=avail]] | FAIL لو أقل من 2 / 20 |
| swap | [[free -m]] + [[--fix]] | warn، أو يعمله ويطلع FAIL لو فشل |
| بورتات القواعد | [[ss -ltnH]] + عمود العنوان المحلي | FAIL لو [[0.0.0.0]] أو [[[::]]] |
| SSH | [[sshd -T]] | warn لو الباسورد شغال |
| DNS | [[ipify]] و [[getent ahostsv4]] | FAIL لو مش متطابقين |
| النتيجة | [[[ "$FAIL" -eq 0 ]]] | exit code |`,
          lines: [
            "من غير [[-e]] عن قصد (الفحص يكمل للآخر)، بس المتغيرات غير المعرّفة غلطة.",
            "لو أول argument هو [[--fix]] فعّل وضع التصليح.",
            "عدّادات النتايج.",
            "دالة للنجاح: تطبع وتزوّد العدّاد.",
            "دالة للتحذير.",
            "دالة للفشل.",
            "عدد الأنوية.",
            "المساحة الفاضية على / بالجيجا، رقم بس ([[tr -dc]] يشيل أي حاجة مش رقم).",
            "أقل من نواتين يبقى فشل.",
            "أقل من 20 جيجا فاضية يبقى فشل.",
            "حجم الـ swap بالميجا من سطر Swap في [[free]].",
            "لو 2 جيجا أو أكتر: تمام.",
            "وإلا لو وضع التصليح شغال...",
            "...اعمل ملف swap بـ 4 جيجا، واقفل صلاحياته، وجهّزه، وشغّله.",
            "...وضيفه لـ fstab عشان يفضل بعد الـ reboot (لو مش موجود أصلًا).",
            "...وقول إنه اتعمل.",
            "...ولو أي خطوة فشلت (زي swapon من غير صلاحية)، FAIL ومتلمسش fstab.",
            "وإلا نبّه بس.",
            "Docker متسطب؟",
            "لف على بورتات Postgres و Redis و Mongo...",
            "...خد عمود العنوان المحلي بس ([[awk '{print $4}']])، ولو بيبدأ بـ 0.0.0.0 أو [::] أو * يبقى مكشوف للعالم، وإلا تمام.",
            "نهاية اللوب.",
            "الإعدادات الفعلية لـ sshd: هل الدخول بالباسورد مقفول؟",
            "IP السيرفر العام (IPv4)، ولو فشل يبقى فاضي من غير ما يوقع.",
            "الدومين من .env.",
            "الدومين بيشاور على أنهي IPv4.",
            "لو الاتنين متطابقين تمام، وإلا فشل برسالة فيها القيمتين.",
            "الملخص.",
            "الـ exit code: 0 لو مفيش ولا فشل."
          ],
          sol: R`شغّلته على بيئة التجربة هنا وطلع شكل الناتج ده (الأرقام هتختلف عندك):

[[ok    4 cores]]
[[FAIL  12 GB free (need 20)]]
[[warn  no swap (run again with --fix)]]
[[ok    port 6379 private]]
[[warn  SSH password login is on]]
[[pass 4 · warn 2 · fail 3]] والـ exit code [[1]].

بعد [[docker run -d -p 6379:6379 redis]] (جربتها بـ container تاني على نفس البورت) الفحص طلع [[FAIL  port 6379 open to the world]]، لأن Docker نشر البورت على [[0.0.0.0]]. بعد ما تمسح الـ container يرجع [[ok]]. والدرس هنا إن [[ufw]] مش بيحميك من ده، Docker بيتخطاه.

سطر [[APP_HOST]] بيقع لو [[.env]] مش جنب السكربت أو الدومين لسه مش بيشاور على السيرفر، وده مقصود: متنشرش قبل ما DNS يبقى صح. و [[--fix]] محتاج sudo لأنه بيعمل swap في [[/etc/fstab]].`
        },
        {
          cmd: "server-map.sh",
          title: "خريطة لسيرفر مش فاكر عليه إيه",
          desc: "سيرفر ورثته أو مدخلتهوش من سنة، وعايز تعرف: الكود فين؟ إيه اللي شغال؟ مين بيسمع على أنهي بورت؟ و Nginx موجّه لفين؟ السكربت ده بيجاوب في شاشة واحدة، ومش بيغيّر أي حاجة.",
          example: R`#!/usr/bin/env bash
# sudo bash server-map.sh 2>/dev/null | less
echo "== ports =="
ss -tlnp
echo "== docker =="
docker ps --format 'table {{.Names}}\t{{.Image}}\t{{.Ports}}\t{{.Status}}'
docker compose ls
echo "== processes =="
pgrep -af 'node|python|php-fpm'
pm2 list || echo "no pm2 for this user"
systemctl list-units --type=service --state=running --no-pager
echo "== nginx =="
ls -l /etc/nginx/sites-enabled/ /etc/nginx/conf.d/
nginx -T | grep -E '^\s*(server_name|root|proxy_pass)' | sort -u
echo "== code =="
find /opt /var/www /srv /home -maxdepth 4 -not -path '*/node_modules/*' \( -name package.json -o -name 'docker-compose*.yml' -o -name compose.yml -o -name .git \)
echo "== cron =="
ls /etc/cron.d/ /var/spool/cron/crontabs/
echo "== disk =="
df -h /
du -sh /var/lib/docker /var/log`,
          try: "شغّله على سيرفر التجربة وحاول من الناتج بس ترسم: الدومين ده بيروح لـ Nginx، اللي بيعمل proxy لأنهي بورت، اللي تبع أنهي container أو بروسيس، اللي الكود بتاعه في أنهي فولدر.",
          flag: "script",
          deep: {
            why: "قبل ما تلمس سيرفر مش فاكره لازم تعرف الصورة كاملة، وإلا هتعمل deploy في فولدر غلط أو توقف خدمة حد تاني بيستخدمها.",
            how: R`ابدأ من البورتات: [[ss -tlnp]] بيقولك مين بيسمع على إيه واسم البروسيس (محتاج root عشان يطلع الاسم). ده أصدق مصدر، لأن أي حاجة شغالة فعلًا لازم تسمع على بورت.

[[docker compose ls]] بيطلع كل مشاريع compose الشغالة ومكان ملف الـ compose بتاع كل واحد. ده غالبًا أسرع طريق لـ «الكود فين».

[[pgrep -af]] بيدوّر على البروسيسات بالاسم ويطبع الأمر كامل، بدل [[ps aux | grep node | grep -v grep]]. و pm2 كل يوزر ليه قايمة لوحده، فلو شغّلت السكربت بـ sudo هتشوف قايمة root بس؛ جرّب [[sudo -u deploy pm2 list]].

[[nginx -T]] بيطبع الإعدادات كلها مجمّعة (كل الملفات المتضمَّنة)، والـ grep بيطلّع أسماء الدومينات والفولدرات والـ proxy_pass، فتعرف كل دومين رايح فين.

و [[find]] بـ [[-maxdepth 4]] وبيستبعد node_modules، ويدوّر على package.json وملفات compose وفولدرات .git في الأماكن المعتادة.

والآخر: الـ cron (مهام مجدولة ممكن تكون ناسيها) والمساحة، لأن سيرفر قديم غالبًا مليان لوجات أو images قديمة.`,
            when: "أول مرة تدخل سيرفر عميل، أو سيرفر بتاعك من زمان، أو قبل ما تنقل المشروع لسيرفر جديد.",
            mistakes: "في مشروع حقيقي كان السكربت بيدوّر على package.json من غير ما يستبعد node_modules، فبيطلع آلاف النتايج لولا [[head]]، وكان بيستخدم [[grep node | grep -v grep]]. والأهم إنه كان بيبص على pm2 و node بس، ومش بيبص على docker ولا البورتات ولا إعدادات nginx، فالصورة كانت ناقصة لأن المشروع فعليًا كان شغال في Docker."
          },
          teach: R`## الأول: ٧ أسئلة، كل واحد تحت عنوان

السكربت كله أوامر قراية بس، مفيش ولا أمر بيغيّر حاجة. كل جزء بيبدأ بـ [[echo "== ... =="]] عشان الناتج الطويل يبقى متقسّم: البورتات، و Docker، والبروسيسات، و Nginx، والكود، والـ cron، والمساحة.

جربته في container [[ubuntu:24.04]] عملت فيه «سيرفر قديم» صغير: Nginx فيه موقعين (واحد proxy لـ 3000 وواحد static)، وبرنامج Python سامع على [[127.0.0.1:3000]]، ومشروع في [[/opt/myapp]] فيه [[compose.yml]] و [[.git]] و [[node_modules]]، ومهمة cron. Docker و pm2 و systemd مش موجودين في الـ container، فهتشوف شكل الناتج لما أداة مش موجودة.

### إزاي بيتشغّل: [[sudo bash server-map.sh 2>/dev/null | less]]

- [[sudo]] عشان [[ss -p]] و [[nginx -T]] وقراية [[/var/spool/cron]] محتاجين root.
- [[2>/dev/null]] ارمي رسايل الأخطاء (زي [[docker: command not found]] لو مش متسطّب) عشان الناتج يبقى نضيف.
- [[| less]] اعرضه صفحة صفحة (مسافة = الصفحة الجاية، [[q]] = خروج، [[/]] = بحث).

---

## ١. [[ss -tlnp]]: مين سامع على إيه

[[-t]] TCP، [[-l]] السامعين بس، [[-n]] أرقام، [[-p]] (process) اسم البرنامج ورقمه.

~~~text الناتج
State  Recv-Q Send-Q Local Address:Port Peer Address:Port Process
LISTEN 0      5          127.0.0.1:3000      0.0.0.0:*    users:(("python3",pid=3120,fd=3))
LISTEN 0      511          0.0.0.0:80        0.0.0.0:*    users:(("nginx",pid=3112,fd=5))
LISTEN 0      511             [::]:80           [::]:*    users:(("nginx",pid=3112,fd=6))
~~~

اقرا [[Local Address:Port]] و [[Process]]:

- [[127.0.0.1:3000]] برنامج [[python3]]: جوه السيرفر بس، محدش من بره يوصله مباشرة.
- [[0.0.0.0:80]] و [[[::]:80]] Nginx على كل الواجهات (IPv4 و IPv6): ده الباب للإنترنت.
- [[pid=3120]] رقم البروسيس، هتلاقيه تاني في [[pgrep]].

ده أصدق مصدر في السكربت: أي حاجة شغالة فعلًا وبتخدم لازم تسمع على بورت. ولو البرنامج [[docker-proxy]] يبقى بورت container.

---

## ٢. Docker

### [[docker ps --format 'table {{.Names}}\t{{.Image}}\t{{.Ports}}\t{{.Status}}']]

[[--format]] بيختار الأعمدة: [[table]] اعرضها جدول بعناوين، و [[{{.Names}}]] إلخ أسماء الخانات (Go template)، و [[\t]] tab بينهم. أهم عمود هنا [[Ports]] زي [[0.0.0.0:3000->3000/tcp]]، عشان تربطه بـ [[ss]].

### [[docker compose ls]]

كل مشاريع compose الشغالة، وعمود [[CONFIG FILES]] فيه مسار ملف الـ compose. يعني «الكود فين» في سطر واحد (شفنا شكله في درس «compose: نسخة تانية»).

في الـ container مفيش Docker:

~~~text الناتج (من غير 2>/dev/null)
/s/server-map.sh: line 6: docker: command not found
/s/server-map.sh: line 7: docker: command not found
~~~

والسكربت **كمّل** عادي لأنه مفيهوش [[set -e]]، وده المطلوب في سكربت استكشاف.

---

## ٣. البروسيسات

### [[pgrep -af 'node|python|php-fpm']]

[[pgrep]] بيدوّر على البروسيسات بالاسم. [[-f]] دوّر في الأمر الكامل مش الاسم بس، و [[-a]] اطبع الأمر الكامل. والنمط regex: [[|]] = «أو».

~~~text الناتج
3120 python3 -m http.server 3000 --bind 127.0.0.1
~~~

نفس الـ [[pid=3120]] اللي في [[ss]]. وبديل نضيف لـ [[ps aux | grep node | grep -v grep]].

### [[pm2 list || echo "no pm2 for this user"]]

قايمة pm2 (مدير بروسيسات Node). ولو مش موجود أو فشل، اطبع رسالة:

~~~text الناتج
pm2: command not found
no pm2 for this user
~~~

خد بالك: كل يوزر ليه pm2 بتاعه. تحت sudo بتشوف قايمة root بس؛ جرّب [[sudo -u deploy pm2 list]].

### [[systemctl list-units --type=service --state=running --no-pager]]

كل الخدمات الشغالة في systemd. [[--no-pager]] اطبع على طول من غير ما تفتح less جوه less. في الـ container مفيش systemd:

~~~text الناتج
System has not been booted with systemd as init system (PID 1). Can't operate.
~~~

على سيرفر حقيقي هتلاقي [[nginx.service]] و [[docker.service]] و [[ssh.service]] وأي خدمة اتعملت بإيد (من التوثيق).

---

## ٤. Nginx

### [[ls -l /etc/nginx/sites-enabled/ /etc/nginx/conf.d/]]

الفولدرين اللي Nginx بيقرا منهم إعدادات المواقع:

~~~text الناتج
/etc/nginx/conf.d/:
total 0

/etc/nginx/sites-enabled/:
lrwxrwxrwx 1 root root 34 ... default -> /etc/nginx/sites-available/default
lrwxrwxrwx 1 root root 32 ... myapp -> /etc/nginx/sites-available/myapp
~~~

الـ [[l]] في أول [[lrwxrwxrwx]] و [[->]] يعني symlink: الملف الحقيقي في [[sites-available]]، والـ link في [[sites-enabled]] هو اللي «بيفعّله».

### [[nginx -T | grep -E '^\s*(server_name|root|proxy_pass)' | sort -u]]

1. [[nginx -T]] بيفحص الإعدادات ويطبعها **كلها مجمّعة** (كل الملفات اللي [[include]] بيجيبها).
2. [[grep -E '^\s*(server_name|root|proxy_pass)']]: السطور اللي بعد المسافات اللي في أولها ([[^\s*]]) بتبدأ بواحدة من التلات كلمات.
3. [[sort -u]] رتّب وشيل المكرر.

~~~text الناتج
	root /var/www/html;
	server_name _;
        proxy_pass http://127.0.0.1:3000;
    root /var/www/docs;
    server_name docs.example.com;
    server_name example.com www.example.com;
~~~

- [[server_name example.com]] + [[proxy_pass http://127.0.0.1:3000]]: الدومين ده بيتحوّل للبرنامج اللي على 3000 (الـ python اللي شفناه).
- [[server_name docs.example.com]] + [[root /var/www/docs]]: موقع static من الفولدر ده.
- [[server_name _]] و [[/var/www/html]]: الموقع الافتراضي بتاع Nginx.

حاجتين خد بالك منهم: [[sort -u]] بيفك الربط بين كل [[server_name]] والـ [[proxy_pass]] بتاعه (عشان كده لو محتاج تتأكد افتح [[nginx -T | less]] ودوّر)، و [[^\s*]] معناها إن [[proxy_pass]] لازم يبقى أول السطر. أول مرة كتبت الإعداد [[location / { proxy_pass ...; }]] في سطر واحد والـ proxy_pass مظهرش خالص.

ورسالة [[nginx: configuration file ... test is successful]] بتطلع على stderr، فـ [[2>/dev/null]] بيخفيها.

---

## ٥. الكود فين

~~~bash
find /opt /var/www /srv /home -maxdepth 4 -not -path '*/node_modules/*' \( -name package.json -o -name 'docker-compose*.yml' -o -name compose.yml -o -name .git \)
~~~

| الحتة | معناها |
|---|---|
| [[/opt /var/www /srv /home]] | الأماكن المعتادة للمشاريع |
| [[-maxdepth 4]] | متنزلش أكتر من ٤ فولدرات جوه (أسرع، ومش هيلف الديسك كله) |
| [[-not -path '*/node_modules/*']] | تجاهل أي حاجة جوه node_modules |
| [[\( ... \)]] | قوسين للتجميع، و [[\]] عشان الـ shell ميفهمهمش هو |
| [[-name package.json -o ...]] | الاسم ده **أو** ([[-o]] = or) ده... |

~~~text الناتج
/opt/myapp/compose.yml
/opt/myapp/package.json
/opt/myapp/.git
~~~

كان فيه [[/opt/myapp/node_modules/x/package.json]] كمان، ومظهرش بسبب [[-not -path]]. على مشروع حقيقي ده الفرق بين ٣ سطور و ٣٠٠٠.

---

## ٦. الـ cron: [[ls /etc/cron.d/ /var/spool/cron/crontabs/]]

- [[/etc/cron.d/]] مهام النظام، كل ملف فيه مهمة أو أكتر.
- [[/var/spool/cron/crontabs/]] ملف لكل يوزر عمل [[crontab -e]] (محتاج root عشان تشوفه).

~~~text الناتج
/etc/cron.d/:
e2scrub_all
myapp-backup

/var/spool/cron/crontabs/:
~~~

[[myapp-backup]] المهمة اللي حطيتها: [[0 3 * * * root /opt/myapp/backup.sh]] (كل يوم الساعة ٣ الفجر). و [[e2scrub_all]] جاية مع النظام.

---

## ٧. المساحة

### [[df -h /]]

~~~text الناتج
Filesystem      Size  Used Avail Use% Mounted on
overlay        1007G   29G  928G   3% /
~~~

(الـ container بيشوف ديسك الـ VM بتاعة Docker Desktop.)

### [[du -sh /var/lib/docker /var/log]]

[[du]] (disk usage) حجم الفولدرات. [[-s]] رقم واحد للفولدر كله، و [[-h]] بالـ K و M و G.

~~~text الناتج
du: cannot access '/var/lib/docker': No such file or directory
368K	/var/log
~~~

على سيرفر قديم [[/var/lib/docker]] (images و volumes قديمة) و [[/var/log]] غالبًا أكبر حاجتين.

---

## الخلاصة: إزاي تجمّع الخريطة

| السؤال | من فين |
|---|---|
| الدومين رايح فين؟ | [[nginx -T]]: [[server_name]] ثم [[proxy_pass]] أو [[root]] |
| البورت ده مين؟ | [[ss -tlnp]]: [[docker-proxy]] = container، غير كده بروسيس |
| أنهي container؟ | [[docker ps]] بنفس البورت |
| الكود فين؟ | [[docker compose ls]] أو [[pgrep -af]] أو [[find]] |
| إيه اللي بيشتغل لوحده؟ | [[systemctl]] و الـ cron |
| المساحة | [[df]] و [[du]] |

في التجربة دي الخريطة طلعت: [[example.com → nginx → 127.0.0.1:3000 → python3 (pid 3120) → /opt/myapp]]، و [[docs.example.com → /var/www/docs]].`,
          lines: [
            "عنوان.",
            "كل البورتات اللي بيسمع عليها حاجة، واسم البروسيس.",
            "عنوان.",
            "الـ containers الشغالة في جدول: الاسم والـ image والبورتات والحالة.",
            "مشاريع compose الشغالة ومكان ملف كل واحد.",
            "عنوان.",
            "بروسيسات node و python و php بالأمر الكامل.",
            "قايمة pm2 (لليوزر الحالي بس).",
            "كل الخدمات الشغالة في systemd.",
            "عنوان.",
            "ملفات المواقع المفعّلة.",
            "الإعدادات المجمّعة، ومنها أسماء الدومينات والفولدرات والـ proxy_pass بس، من غير تكرار.",
            "عنوان.",
            "فين package.json وملفات compose وفولدرات git، من غير node_modules.",
            "عنوان.",
            "المهام المجدولة للنظام ولكل يوزر.",
            "عنوان.",
            "المساحة على /.",
            "حجم Docker واللوجات، أكبر اتنين بياكلوا المساحة عادة."
          ],
          sol: R`الإجابة النموذجية سطر لكل موقع، بالشكل ده:

[[example.com → nginx (server_name example.com) → proxy_pass http://127.0.0.1:3000 → container myapp-web-1 (0.0.0.0:3000->3000) → كوده في /opt/myapp (فيه compose.yml و .git)]]

بتجمّعها كده: من [[nginx -T]] خد الـ [[server_name]] و [[proxy_pass]] اللي تحته. البورت ده دوّر عليه في [[ss -tlnp]]: لو البرنامج [[docker-proxy]] يبقى container، وهتلاقيه في [[docker ps]] بنفس البورت. ولو [[node]] أو [[python]] يبقى process عادي، و [[pgrep -af]] بيوريك الأمر الكامل ومساره. ولو فيه [[root]] بدل [[proxy_pass]] يبقى موقع static من الفولدر ده. وبعدين [[find]] بيوريك فين الكود و compose.

لو بورت ظاهر في [[ss]] ومش لاقي ليه دومين في Nginx، يا إما حاجة قديمة منسية يا إما خدمة مكشوفة للنت من غير قصد (خصوصًا لو [[0.0.0.0]]). دوّنها في الخريطة. واقرا [[cron]] عشان متتفاجئش بباك أب أو سكربت بيشتغل بالليل.`
        }
      ]
    }
]);
