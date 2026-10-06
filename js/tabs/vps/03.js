// تكملة تاب vps: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/vps/01.js (شرح حقول الدرس في أوله)
MORE("vps", [
    {
      t: "الفايروول والحماية",
      l: 2,
      n: "",
      items: [
        {
          cmd: "ufw",
          title: "افتح البورتات اللي محتاجها بس",
          desc: "اسمح لـ SSH قبل [[enable]] وإلا هتقفل على نفسك. وخد بالك: أي بورت بتفتحه Docker بـ [[-p]] بيعدّي من ufw كأنه مش موجود، عشان كده قاعدة البيانات في compose اكتبها [[127.0.0.1:5432:5432]] مش [[5432:5432]].",
          example: R`sudo ufw allow OpenSSH
sudo ufw allow 80,443/tcp
sudo ufw enable
sudo ufw status numbered
sudo ufw delete 3`,
          try: "فعّل ufw على سيرفر التجربة، وجرب من جهازك [[curl http://IP:3000]] قبل وبعد.",
          flag: "danger",
          deep: {
            why: "السيرفر ممكن يكون عليه برامج كتير بتسمع على بورتات. الفايروول بيقفل كل البورتات، وانت تفتح بس اللي الناس محتاجاه: SSH والموقع.",
            how: R`ufw (من uncomplicated firewall) واجهة سهلة لفايروول لينكس. وبيشتغل بقاعدة بسيطة: الافتراضي «امنع كل اللي جاي من بره»، وانت بتضيف استثناءات.

[[allow OpenSSH]] بيفتح بورت 22. و OpenSSH ده اسم «profile» جاهز بدل ما تكتب الرقم. و [[80,443/tcp]] بيفتح المواقع (http و https).

[[enable]] بيشغّل الفايروول، ومن اللحظة دي أي بورت مش مفتوح بيتقفل. عشان كده لازم تفتح SSH الأول، وإلا اتصالك الحالي نفسه ممكن يتقطع.

[[status numbered]] بيوريك القواعد بأرقام، و [[delete رقم]] بيمسح قاعدة.

والفخ الكبير مع Docker: Docker بيعدّل قواعد الفايروول بنفسه، في مكان قبل ufw. فأي كونتينر بتعمله [[-p 5432:5432]] بيبقى مفتوح للنت حتى لو ufw قافل البورت ده. الحل إنك تكتب [[127.0.0.1:5432:5432]]، فيبقى مفتوح جوه السيرفر بس.`,
            when: "على كل سيرفر، بعد ما تجهّز SSH.",
            mistakes: "[[enable]] قبل [[allow OpenSSH]]. وإنك تفتكر إن ufw بيحمي بورتات Docker، وهو مش بيحميها."
          },
          teach: R`## افتح اللي محتاجه، وبعدين شغّل، وبعدين راجع

[[ufw]] اختصار Uncomplicated FireWall: واجهة سهلة لفايروول لينكس. القاعدة الافتراضية: امنع أي حاجة جاية من برّه، واسمح بأي حاجة خارجة. وانت بتضيف استثناءات. اتجرّب على كونتينر [[ubuntu:24.04]] شغال كسيرفر على [[203.0.113.10]]، وفيه تطبيق تجربة سامع على بورت 3000، ولابتوب في كونتينر تاني بيجرّب يوصل.

### قبل أي حاجة

~~~text sudo ufw status
Status: inactive
~~~

ومن اللابتوب، التطبيق على 3000 بيرد عادي:

~~~text curl -s -o /dev/null -w "%{http_code}" http://203.0.113.10:3000
200
~~~

([[-w "%{http_code}"]] يعني اطبع رقم رد السيرفر بس، و 200 يعني تمام.)

---

## ١. [[sudo ufw allow OpenSSH]]

[[allow]] اسمح، و [[OpenSSH]] اسم **profile**: ملف جاهز فيه البورتات بتاعة برنامج. البرامج بتحط الـ profiles بتاعتها وهي بتتسطب، وتشوفهم بـ:

~~~text sudo ufw app list
Available applications:
  Nginx Full
  Nginx HTTP
  Nginx HTTPS
  OpenSSH
~~~

[[OpenSSH]] = بورت 22/tcp. والناتج:

~~~text الناتج
Rules updated
Rules updated (v6)
~~~

سطرين لأن ufw بيعمل القاعدة مرتين: مرة لـ IPv4 ومرة لـ IPv6 (v6).

---

## ٢. [[sudo ufw allow 80,443/tcp]]

بورتين مفصولين بفاصلة: 80 لـ http و 443 لـ https، و [[/tcp]] البروتوكول (المواقع على TCP). نفس الناتج: [[Rules updated]] مرتين.

---

## ٣. [[sudo ufw enable]]

لو انت داخل بـ ssh، ufw بيسألك الأول:

~~~text الناتج (جربته وانا داخل بـ deploy من اللابتوب وجاوبت n)
Command may disrupt existing ssh connections. Proceed with operation (y|n)? n
Aborted
~~~

بيحذرك لأنه مش عارف إنك فتحت 22. ولما جاوبت [[y]]:

~~~text الناتج
Firewall is active and enabled on system startup
~~~

يعني شغال دلوقتي، وهيشتغل لوحده مع كل ريستارت.

### النتيجة من اللابتوب

~~~text curl -m 5 http://203.0.113.10:3000
curl: (28) Connection timed out after 5002 milliseconds
~~~

[[-m 5]] أقصى مدة ٥ ثواني. البورت 3000 مقفول: الفايروول بيرمي الطلب ومش بيرد خالص، فـ curl بيفضل مستني لحد الوقت ما يخلص. و ssh على 22 لسه شغال لأننا فتحناه.

---

## ٤. [[sudo ufw status numbered]]

[[status]] اعرض القواعد، و [[numbered]] بأرقام:

~~~text الناتج
Status: active

     To                         Action      From
     --                         ------      ----
[ 1] OpenSSH                    ALLOW IN    Anywhere
[ 2] 80,443/tcp                 ALLOW IN    Anywhere
[ 3] OpenSSH (v6)               ALLOW IN    Anywhere (v6)
[ 4] 80,443/tcp (v6)            ALLOW IN    Anywhere (v6)
~~~

| العمود | معناه |
|---|---|
| [[To]] | البورت أو الـ profile على السيرفر |
| [[Action]] | [[ALLOW IN]]: اسمح بالداخل |
| [[From]] | منين. [[Anywhere]] يعني أي IP |

و [[sudo ufw status verbose]] بيوريك القاعدة الافتراضية كمان:

~~~text الناتج (أوله)
Default: deny (incoming), allow (outgoing), deny (routed)
~~~

---

## ٥. [[sudo ufw delete 3]]

بيمسح القاعدة رقم ٣، وبيسأل الأول:

~~~text الناتج
Deleting:
 allow OpenSSH
Proceed with operation (y|n)? y
Rule deleted (v6)
~~~

خد بالك: رقم ٣ هنا كان **SSH على IPv6**، مش حاجة زيادة. وبعد المسح الأرقام بتتزق (اللي كان ٤ بقى ٣). عشان كده اعرض [[status numbered]] قبل كل [[delete]]، وامسح واحدة بس كل مرة. وتقدر تمسح بالاسم بدل الرقم: [[sudo ufw delete allow 80,443/tcp]] (بيمسح v4 و v6 مع بعض).

---

## فخ Docker

Docker بيكتب قواعد الفايروول بتاعته في مكان بيتقرا **قبل** ufw. فكونتينر منشور بـ [[-p 5432:5432]] بيبقى مفتوح للنت حتى لو ufw مقفول. الحل تنشره على [[127.0.0.1:5432:5432]] فيبقى جوه السيرفر بس. (ده من docs.docker.com، ومجرّبتهوش هنا لأن السيرفر التجريبي مفيهوش Docker.)

---

## الخلاصة

~~~text
sudo ufw allow OpenSSH          افتح ssh الأول دايمًا
sudo ufw allow 80,443/tcp       افتح المواقع
sudo ufw enable                 شغّل (اقفل الباقي كله)
sudo ufw status numbered        القواعد بأرقامها
sudo ufw delete رقم             امسح قاعدة (بعد ما تشوف الأرقام)
~~~`,
          lines: [
            "اسمح بـ SSH (بورت 22) قبل أي حاجة.",
            "اسمح ببورتات المواقع 80 و 443.",
            "شغّل الفايروول. هيحذرك إنه ممكن يقطع SSH، وانت فاتحه فتمام.",
            "اعرض القواعد وقدام كل واحدة رقم.",
            "امسح القاعدة رقم ٣."
          ],
          sol: R`[[sudo ufw status numbered]] بعد enable بيطبع [[Status: active]] وقايمة مرقمة: [[[ 1] OpenSSH ALLOW IN Anywhere]]، و [[[ 2] 80,443/tcp ALLOW IN Anywhere]]، ونفسهم [[(v6)]].

من جهازك: قبل enable، [[curl http://IP:3000]] بيرد (لو التطبيق سامع على 0.0.0.0). بعد enable بيعلّق ويخلص بـ [[Connection timed out]]، لأن 3000 مش مفتوح. ودي النتيجة الصح: التطبيق يتوصل له من Nginx بس.

الغلط الشائع: تعمل [[ufw enable]] قبل [[allow OpenSSH]] فتقفل على نفسك (هو بيحذرك [[Command may disrupt existing ssh connections]]). والتاني: 3000 لسه مفتوح من بره مع إن ufw مقفول، لأن Docker بيفتح البورتات المنشورة من ورا ufw؛ انشرها على [[127.0.0.1:3000:3000]]. وخد بالك إن رقم ٣ في [[status numbered]] بعد enable على طول هو [[OpenSSH (v6)]]، فـ [[delete 3]] من المثال بيمسح SSH على IPv6. جربت الخطوات دي كلها (enable والـ timeout و delete) على كونتينر أوبونتو شغال كسيرفر.`
        },
        {
          cmd: "fail2ban",
          title: "احظر محاولات الاختراق",
          desc: R`أول ما سيرفر يبقى على النت، بوتات بتبدأ تجرّب تدخل عليه SSH بآلاف الباسوردات. fail2ban بيقرا لوجات الدخول باستمرار، ولو IP فشل كذا مرة في وقت قصير، بيضيف قاعدة في الفايروول تحظره فترة. كل نوع حماية اسمه jail (سجن)، والـ jail بتاع SSH اسمه [[sshd]]، وعلى أوبونتو بيتفعّل لوحده أول ما تسطّب.

[[enable --now]] بتشغّل الخدمة دلوقتي وتخليها تقوم مع كل ريستارت. [[fail2ban-client status sshd]] بتطبع عدد المحاولات الفاشلة والـ IPs المحظورة دلوقتي. و [[set sshd unbanip]] وبعدها IP بتفك الحظر عنه.

لو حظرت نفسك بالغلط وانت بتجرّب، ssh هيقولك [[Connection refused]] أو هيفضل مستني من غير رد (حسب إعداد الحظر)، كأن السيرفر واقع: ادخل من console شركة الاستضافة أو من نت تاني وفك الحظر.`,
          example: R`sudo apt install -y fail2ban
sudo systemctl enable --now fail2ban
sudo fail2ban-client status sshd
sudo fail2ban-client set sshd unbanip 198.51.100.7`,
          try: "شوف كام IP اتحظر على سيرفر حقيقي بعد يوم، هتتفاجئ بالعدد.",
          deep: {
            why: "حتى مع قفل الباسورد، البوتات بتفضل تجرّب آلاف المرات، وده بيملى اللوجات وبياكل موارد. fail2ban بيحظر أي IP بيحاول كتير.",
            how: R`fail2ban بيقرا اللوجات باستمرار (هنا لوجات SSH)، ويدوّر على محاولات دخول فاشلة. لو IP معين فشل عدد مرات معين في وقت قصير، fail2ban بيضيف قاعدة في الفايروول تمنع الـ IP ده تمامًا لفترة.

كل نوع حماية اسمه «jail» (سجن)، و [[sshd]] هو الـ jail بتاع SSH. على أوبونتو بيشتغل أول ما تسطبه. و [[fail2ban-client status sshd]] بيوريك كام IP محظور دلوقتي، وكام محاولة فاشلة.

و [[unbanip]] بيفك الحظر عن IP، مفيد لو انت اللي اتحظرت عشان غلطت في حاجة كذا مرة.`,
            when: "على كل سيرفر عليه SSH مفتوح للنت، يعني كل السيرفرات تقريبًا.",
            mistakes: "إنك تحظر نفسك وانت بتجرّب، ومتعرفش ليه السيرفر مش بيرد. لو حصل، ادخل من console الاستضافة، أو من نت تاني، واعمل unban."
          },
          teach: R`## سطّب، شغّل، راقب، فك الحظر

اتجرّب على كونتينر [[ubuntu:24.04]] فيه systemd شغال كسيرفر على [[203.0.113.10]]، و fail2ban نسخته [[1.0.2]]. وعشان أشوف الحظر بعيني، عملت دور البوت من كونتينر اللابتوب ([[203.0.113.50]]): حاولت أدخل بيوزرز مش موجودة كذا مرة ورا بعض.

---

## ١. [[sudo apt install -y fail2ban]]

تسطيب عادي. والباكدج بتيجي بملف إعداد جاهز لأوبونتو بيشغّل حماية SSH لوحدها:

~~~text /etc/fail2ban/jail.d/defaults-debian.conf
[DEFAULT]
banaction = nftables
banaction_allports = nftables[type=allports]
backend = systemd

[sshd]
enabled = true
~~~

| السطر | معناه |
|---|---|
| [[[DEFAULT]]] | إعدادات لكل الـ jails |
| [[banaction = nftables]] | الحظر بيتعمل بقاعدة في فايروول لينكس (nftables) |
| [[backend = systemd]] | اقرا اللوجات من journal بتاع systemd |
| [[[sshd]]] و [[enabled = true]] | jail الـ SSH شغال |

**jail** (سجن) يعني: لوج تراقبه + شكل السطر اللي يعتبر «محاولة فاشلة» + هتعمل إيه لما العدد يزيد.

---

## ٢. [[sudo systemctl enable --now fail2ban]]

| الحتة | معناها |
|---|---|
| [[systemctl]] | مدير الخدمات |
| [[enable]] | شغّلها مع كل ريستارت للسيرفر |
| [[--now]] | وشغّلها دلوقتي كمان (من غيرها [[enable]] بيستنى أول ريستارت) |

~~~text الناتج
Synchronizing state of fail2ban.service with SysV service script with /usr/lib/systemd/systemd-sysv-install.
Executing: /usr/lib/systemd/systemd-sysv-install enable fail2ban
Created symlink /etc/systemd/system/multi-user.target.wants/fail2ban.service → /usr/lib/systemd/system/fail2ban.service.
~~~

أول سطرين للتوافق مع نظام قديم، سيبهم. المهم الأخير: [[enable]] بيعمل لينك في [[multi-user.target.wants]]، يعني «لما السيرفر يقوم، شغّل دي معاه». وعلى أوبونتو غالبًا هتلاقيها شغالة أصلًا بعد التسطيب.

---

## ٣. [[sudo fail2ban-client status sshd]]

[[fail2ban-client]] الأداة اللي بتكلّم fail2ban وهو شغال، و [[status sshd]] حالة الـ jail ده. ده الناتج بعد ٦ محاولات من اللابتوب:

~~~text الناتج
Status for the jail: sshd
|- Filter
|  |- Currently failed:	1
|  |- Total failed:	7
|  $__bt- Journal matches:	_SYSTEMD_UNIT=sshd.service + _COMM=sshd
$__bt- Actions
   |- Currently banned:	1
   |- Total banned:	1
   $__bt- Banned IP list:	203.0.113.50
~~~

| السطر | معناه |
|---|---|
| [[Currently failed]] | IPs ليها محاولات فاشلة لسه بتتعد دلوقتي |
| [[Total failed]] | كل المحاولات الفاشلة من ساعة ما fail2ban اشتغل |
| [[Journal matches]] | بيقرا أنهي لوجات |
| [[Currently banned]] | محظورين دلوقتي |
| [[Total banned]] | اتحظروا كام مرة من الأول |
| [[Banned IP list]] | مين |

### الحظر حصل إمتى بالظبط؟

~~~text sudo fail2ban-client get sshd maxretry / findtime / bantime
5
600
600
~~~

يعني: **٥** محاولات فاشلة في خلال **٦٠٠ ثانية** (١٠ دقايق) = حظر **٦٠٠ ثانية**. ده اللوج بتاعه:

~~~text tail /var/log/fail2ban.log
fail2ban.filter   [73]: INFO    [sshd] Found 203.0.113.50 - 2026-10-06 14:56:14
fail2ban.filter   [73]: INFO    [sshd] Found 203.0.113.50 - 2026-10-06 14:56:14
fail2ban.actions  [73]: NOTICE  [sshd] Ban 203.0.113.50
~~~

ومن ناحية اللابتوب، المحاولات اتحولت من «باسورد غلط» لـ «السيرفر مش بيقبلني خالص»:

~~~text الناتج على اللابتوب
admin@203.0.113.10: Permission denied (publickey).
oracle@203.0.113.10: Permission denied (publickey).
Connection closed by 203.0.113.10 port 22
ssh: connect to host 203.0.113.10 port 22: Connection refused
~~~

والقاعدة اللي اتعملت في الفايروول ([[sudo nft list ruleset]]):

~~~text الناتج (الجزء المهم)
tcp dport 22 ip saddr @addr-set-sshd reject with icmp port-unreachable
~~~

يعني: أي حاجة رايحة لبورت 22 وجاية من IP في لستة الحظر، ارفضها.

---

## ٤. [[sudo fail2ban-client set sshd unbanip 198.51.100.7]]

[[set sshd]] عدّل في الـ jail ده، و [[unbanip]] فك الحظر عن IP. الناتج رقم: كام IP اتفك عنه.

~~~text الناتج
1          لما فكيت 203.0.113.50 (كان محظور)
0          لما جربت 198.51.100.7 (مكانش محظور أصلًا)
~~~

وبعدها اللابتوب دخل عادي. ولو كتبت اسم jail غلط:

~~~text الناتج
Sorry but the jail 'nojail' does not exist
~~~

> لو حظرت نفسك على سيرفر حقيقي، مش هتعرف تدخل بـ ssh تفك الحظر. ادخل من console شركة الاستضافة، أو من نت تاني (موبايل)، أو استنى الـ bantime يخلص.

---

## الخلاصة

~~~text
sudo apt install -y fail2ban                    سطّب (jail الـ sshd شغال لوحده على أوبونتو)
sudo systemctl enable --now fail2ban            شغّله دلوقتي ومع كل ريستارت
sudo fail2ban-client status sshd                مين محظور وكام محاولة
sudo fail2ban-client set sshd unbanip IP        فك الحظر
~~~`,
          lines: [
            "سطّبه.",
            "شغّله دلوقتي ومع كل ريستارت ([[enable --now]]).",
            "اعرض حالة حماية SSH: كام محاولة فاشلة وكام IP محظور.",
            "فك الحظر عن IP معين."
          ],
          sol: R`[[sudo fail2ban-client status sshd]] بيطبع شجرة زي:

[[Status for the jail: sshd]]، وتحتها [[Currently failed: 3]] و [[Total failed: 412]]، وتحت Actions [[Currently banned: 7]] و [[Total banned: 58]] و [[Banned IP list:]] وبعدها الـ IPs. على سيرفر عليه IP عام، يوم واحد كفاية تلاقي عشرات أو مئات المحاولات، لأن بوتات بتلف على كل IP وتجرب باسوردات.

الأرقام دي مثال لسيرفر عام. في محاكاة على كونتينرين (سيرفر ولابتوب) ٦ محاولات بيوزرز غلط عملوا [[Total failed: 7]] و [[Banned IP list: 203.0.113.50]]، و [[unbanip]] طبع [[1]] ورجّع الدخول. الغلط الشائع: [[Sorry but the jail 'sshd' does not exist]]: الـ jail مش متفعّل؛ اعمل [[/etc/fail2ban/jail.local]] فيه [[[sshd]]] و [[enabled = true]]. ولو [[Total failed: 0]] على طول، غالبًا fail2ban مش لاقي اللوج (على 24.04 الباكدج بتحط [[backend = systemd]] في [[jail.d/defaults-debian.conf]]؛ اتأكد إنك مغيرتهوش في [[jail.local]]).`
        },
        {
          cmd: "unattended-upgrades",
          title: "تحديثات الأمان لوحدها",
          desc: R`ثغرات أمنية بتتكتشف كل يوم وتحديثات بتنزل تقفلها، ومش هتفتكر تحدّث السيرفر كل يوم. [[unattended-upgrades]] أداة بتشتغل لوحدها مرة في اليوم: تعمل apt update وتسطّب تحديثات الأمان بس، مش كل التحديثات، لأن التحديثات الكبيرة ممكن تغيّر سلوك برامج وتكسر موقعك.

غالبًا متسطبة أصلًا على أوبونتو، و [[apt install]] بيتأكد. [[dpkg-reconfigure]] بيعيد أسئلة الإعداد بتاعة الباكدج، وهنا سؤال واحد: تفعّل التحديث الأوتوماتيك؟ اختار Yes. و [[-plow]] معناها اعرض الأسئلة من أول مستوى low، يعني متخبّيش ولا سؤال. واللوج في [[/var/log/unattended-upgrades/]] بيقولك اتحدّث إيه وإمتى.

افتراضيًا هي مش بتعمل reboot لوحدها، فتحديثات الكيرنل بتفضل مستنية: بص على [[/var/run/reboot-required]] كل فترة.`,
          example: R`sudo apt install -y unattended-upgrades
sudo dpkg-reconfigure -plow unattended-upgrades
cat /var/log/unattended-upgrades/unattended-upgrades.log`,
          try: "فعّله واعرض اللوج بعد يوم.",
          deep: {
            why: "ثغرات أمنية بتتكتشف كل يوم، وتحديثات بتنزل تقفلها. مش هتفتكر تحدّث السيرفر كل يوم، فخليه يحدّث نفسه.",
            how: R`الأداة دي بتشتغل كل يوم أوتوماتيك، وتعمل [[apt update]]، وبعدين تسطّب تحديثات الأمان بس، مش كل التحديثات. ليه الأمان بس؟ لأن التحديثات الكبيرة ممكن تغيّر حاجات وتكسر موقعك، إنما تحديثات الأمان معمولة عشان تبقى صغيرة ومش بتغيّر سلوك البرامج.

[[dpkg-reconfigure]] بيسألك سؤال واحد «تفعّل التحديثات الأوتوماتيك؟». و [[-plow]] معناها اسألني الأسئلة المهمة بس.

واللوج بيوريك إيه اللي اتحدّث وإمتى، مفيد لو حاجة اتغيرت فجأة وعايز تعرف ليه.`,
            when: "على كل سيرفر، من أول يوم.",
            mistakes: "إنك تعتمد عليه بس وتنسى إن تحديثات الكيرنل محتاجة reboot عشان تتطبق. بص على [[/var/run/reboot-required]] كل فترة."
          },
          teach: R`## سطّب، فعّل، واقرا اللي عمله

اتجرّب على كونتينر [[ubuntu:24.04]] فيه systemd شغال كسيرفر. والسطر التالت محتاج يكون الأداة اشتغلت مرة على الأقل، فشغّلتها بإيدي بـ [[sudo unattended-upgrade -v]] بدل ما أستنى يوم.

---

## ١. [[sudo apt install -y unattended-upgrades]]

على أغلب سيرفرات أوبونتو متسطبة أصلًا، والأمر هيقولك [[unattended-upgrades is already the newest version]]. الاسم معناه «تحديثات من غير حد قاعد جنبها».

---

## ٢. [[sudo dpkg-reconfigure -plow unattended-upgrades]]

| الحتة | معناها |
|---|---|
| [[dpkg]] | الأداة اللي تحت apt، اللي بتسطّب ملفات الباكدج فعلًا |
| [[reconfigure]] | اسألني أسئلة الإعداد بتاعة الباكدج دي تاني |
| [[-p low]] (مكتوبة لازقة [[-plow]]) | priority: اعرض الأسئلة من مستوى low وفوق، يعني كلها |
| [[unattended-upgrades]] | الباكدج |

السؤال (في الكونتينر طلع نص؛ على سيرفر بيطلع شاشة زرقا بنفس الكلام):

~~~text الناتج
Configuring unattended-upgrades
-------------------------------
Applying updates on a frequent basis is an important part of keeping systems
secure. By default, updates need to be applied manually using package
management tools. Alternatively, you can choose to have this system
automatically download and install important updates.
Automatically download and install stable updates? [yes/no] yes
~~~

اخترت yes. والإجابة بتتكتب في ملف صغير:

~~~text /etc/apt/apt.conf.d/20auto-upgrades
APT::Periodic::Update-Package-Lists "1";
APT::Periodic::Unattended-Upgrade "1";
~~~

| السطر | معناه |
|---|---|
| [[Update-Package-Lists "1"]] | اعمل [[apt update]] كل يوم واحد |
| [[Unattended-Upgrade "1"]] | وشغّل التحديث الأوتوماتيك كل يوم واحد |

ولو اخترت no، الرقمين بيبقوا [[0]].

### مين بيشغّلها كل يوم؟

اتنين timers من systemd (منبّهات بتشغّل خدمة في ميعاد):

~~~text systemctl list-timers | grep apt
Tue 2026-10-06 20:41:31 EEST 5h 41min ... apt-daily.timer          apt-daily.service
Wed 2026-10-07 06:32:26 EEST      15h ... apt-daily-upgrade.timer  apt-daily-upgrade.service
~~~

[[apt-daily]] بينزّل الكتالوج، و [[apt-daily-upgrade]] بيسطّب. والعمود الأول الميعاد الجاي، والتاني فاضل قد إيه. والمواعيد فيها عشوائية عن قصد، عشان ملايين السيرفرات متضربش المستودعات في نفس الثانية.

---

## ٣. [[cat /var/log/unattended-upgrades/unattended-upgrades.log]]

~~~text الناتج
2026-10-06 14:59:50,056 INFO Starting unattended upgrades script
2026-10-06 14:59:50,057 INFO Allowed origins are: o=Ubuntu,a=noble, o=Ubuntu,a=noble-security, o=UbuntuESMApps,a=noble-apps-security, o=UbuntuESM,a=noble-infra-security
2026-10-06 14:59:50,057 INFO Initial blacklist:
2026-10-06 14:59:50,057 INFO Initial whitelist (not strict):
2026-10-06 14:59:51,753 INFO No packages found that can be upgraded unattended and no pending auto-removals
~~~

| السطر | معناه |
|---|---|
| [[Allowed origins]] | المستودعات المسموح يحدّث منها. لاحظ [[noble-security]] موجود و [[noble-updates]] **مش** موجود |
| [[blacklist]] | باكدجات ممنوع يلمسها (فاضية) |
| [[whitelist]] | لو مليتها، يحدّث دول بس (فاضية) |
| [[No packages found...]] | مفيش حاجة تتحدّث |

### ليه «مفيش حاجة» مع إن فيه تحديثات؟

نفس الوقت، [[apt list --upgradable]] كان بيقول:

~~~text الناتج
libaudit-common/noble-updates 1:3.1.2-2.1ubuntu0.1 all [upgradable from: ...]
libaudit1/noble-updates 1:3.1.2-2.1ubuntu0.1 amd64 [upgradable from: ...]
~~~

التحديثين جايين من [[noble-updates]]، مش من [[noble-security]]. والأداة بتاخد الأمان بس، فسابتهم. هتسطّبهم انت بـ [[apt upgrade]] لما تقرر. ولو كان فيه تحديث أمان، كنت هتلاقي سطر [[Packages that will be upgraded:]] وبعده أساميهم.

---

## الخلاصة

~~~text
sudo apt install -y unattended-upgrades             (غالبًا موجودة)
sudo dpkg-reconfigure -plow unattended-upgrades     اختار yes
cat /etc/apt/apt.conf.d/20auto-upgrades             الرقمين "1" = شغالة
systemctl list-timers | grep apt                    هتشتغل إمتى
cat /var/log/unattended-upgrades/...log             عملت إيه
~~~

> مش بتعمل reboot لوحدها. تحديث كيرنل هيفضل مستني [[/var/run/reboot-required]] (درس reboot).`,
          lines: [
            "سطّبه (غالبًا موجود أصلًا).",
            "فعّله. هيسألك سؤال واحد، اختار Yes.",
            "اعرض سجل التحديثات اللي اتعملت لوحدها."
          ],
          sol: R`[[sudo dpkg-reconfigure -plow unattended-upgrades]] بيسأل [[Automatically download and install stable updates?]] اختار Yes. وبعدها [[cat /etc/apt/apt.conf.d/20auto-upgrades]] بيوري [[APT::Periodic::Update-Package-Lists "1";]] و [[APT::Periodic::Unattended-Upgrade "1";]].

بعد يوم، [[cat /var/log/unattended-upgrades/unattended-upgrades.log]] فيه سطور زي [[INFO Starting unattended upgrades script]] و [[INFO Allowed origins are: ...]] و [[INFO Packages that will be upgraded: ...]] أو [[INFO No packages found that can be upgraded unattended]].

الغلط الشائع: اللوج فاضي أو مش موجود: الـ timers ([[apt-daily.timer]] و [[apt-daily-upgrade.timer]]) لسه مااشتغلوش؛ [[systemctl list-timers | grep apt]] يوريك الميعاد الجاي. وللتجربة الفورية: [[sudo unattended-upgrade --dry-run --debug]]. جربت الخطوات على كونتينر أوبونتو 24.04 فيه systemd: الملف طلع بالرقمين [[1]]، والتشغيل اليدوي بـ [[sudo unattended-upgrade -v]] كتب في اللوج [[No packages found that can be upgraded unattended]] لأن التحديثات المتاحة كانت من [[noble-updates]] مش [[noble-security]].`
        }
      ]
    },
    {
      t: "Nginx",
      l: 2,
      n: "بيوصّل الدومين بالتطبيق اللي شغال على بورت داخلي",
      items: [
        {
          cmd: "/etc/nginx/sites-available/myapp",
          title: "ملف موقع بيحوّل لتطبيق Node",
          desc: "ده ملف إعدادات Nginx مش أوامر bash. أي طلب على الدومين بيتبعت لتطبيقك على بورت 3000، والهيدرز دي بتخلي التطبيق يعرف IP الزائر الحقيقي، وبتشغّل WebSockets.",
          example: R`server {
    listen 80;
    server_name example.com www.example.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}`,
          try: "اكتب الملف ده على سيرفر التجربة بدومين وهمي، وكمّل في الأمر اللي بعده.",
          flag: "script",
          deep: {
            why: "تطبيق Node بتاعك شغال على بورت 3000 جوه السيرفر، والزوار بيفتحوا [[example.com]] على بورت 80 أو 443. Nginx بيقف في النص: يستقبل الزوار، ويوصّل طلباتهم للتطبيق، ويرجّع الرد. ده اسمه reverse proxy.",
            how: R`ليه منخليش Node يسمع على 80 مباشرة؟ لأن Nginx أحسن بكتير في الحاجات دي: HTTPS، وملفات ثابتة زي الصور، وتحمّل آلاف الزوار في نفس الوقت، وتشغيل كذا موقع على نفس السيرفر.

والملف بيتقسم «بلوكات» بين أقواس [[{ }]]. [[server]] بيوصف موقع واحد: بيسمع على أنهي بورت ([[listen]])، ولأنهي دومين ([[server_name]]). Nginx بيقرا الدومين اللي الزائر كتبه، ويختار البلوك اللي فيه نفس الاسم، وعشان كده تقدر تحط ١٠ مواقع على نفس السيرفر.

و [[location /]] بيقول «أي طلب يبدأ بـ /» (يعني كل الطلبات). وجواه [[proxy_pass]] بيقول ابعته للتطبيق على 127.0.0.1:3000.

و [[proxy_set_header]] مهمة لأن من غيرها، التطبيق هيفتكر إن كل الطلبات جاية من Nginx نفسه (من 127.0.0.1)، ومش هيعرف IP الزائر الحقيقي ولا إنه جه بـ HTTPS.

وكل سطر لازم يخلص بـ [[;]]، ونسيانها أشهر غلطة.`,
            when: "لكل موقع أو تطبيق على السيرفر، ملف لوحده في sites-available.",
            mistakes: "نسيان [[;]]، و [[nginx -t]] هيقولك رقم السطر. وإن التطبيق يكون بيسمع على بورت غير اللي في [[proxy_pass]]، فيطلع 502."
          },
          teach: R`## ملف إعدادات، مش أوامر

ده محتوى ملف [[/etc/nginx/sites-available/myapp]]، بتكتبه بـ [[sudo nano]] (التفعيل في الدرس الجاي). الفكرة: Nginx واقف على بورت 80 قدام الدنيا، وأي طلب لـ [[example.com]] بيوصّله لتطبيقك اللي شغال جوه السيرفر على بورت 3000، ويرجّع رده للزائر. ده اسمه **reverse proxy**.

عشان أشوف كل سطر بيعمل إيه، جربت الملف ده بالظبط على كونتينر [[ubuntu:24.04]] فيه Nginx [[1.24.0]]، ومكان تطبيق Node حطيت تطبيق صغير على 3000 بيرد بالـ headers اللي وصلته. والطلبات جاية من كونتينر لابتوب على [[203.0.113.50]].

---

## الشكل العام: بلوكات وسطور

~~~text
server {            بلوك: بيفتح بـ { وبيقفل بـ }
    listen 80;      directive: اسم وبعده قيمة، وآخره ;
    location / {    بلوك جوه بلوك
        ...
    }
}
~~~

كل سطر إعداد اسمه **directive**، ولازم يخلص بـ [[;]]. والمسافات في أول السطر للقراية بس، Nginx مش بيهتم بيها.

---

## ١. [[server {]]

بلوك بيوصف موقع واحد. تقدر تحط بلوكات كتير لمواقع كتير على نفس السيرفر.

## ٢. [[listen 80;]]

اسمع على بورت 80، بورت http. (443 لـ https، و certbot هيضيفه بعدين.)

## ٣. [[server_name example.com www.example.com;]]

البلوك ده لأنهي دومينات. المتصفح بيبعت اسم الدومين اللي الزائر كتبه في header اسمه [[Host]]، و Nginx بيقارنه بالـ [[server_name]] في كل البلوكات ويختار اللي يطابق. جربت الاتنين:

~~~text curl -H "Host: www.example.com" http://203.0.113.10/
app on :3000 got: GET /
client (socket): 127.0.0.1
Host: www.example.com
~~~

[[-H]] في curl بيحط header بإيدك، فبنعمل كأن الزائر كتب الدومين ده من غير ما يكون فيه DNS.

## ٤. [[location / {]]

[[location]] بيختار حسب **المسار** (اللي بعد الدومين). و [[/]] يطابق أي مسار، لأن كل المسارات بتبدأ بـ [[/]]. فالبلوك ده بيمسك كل الطلبات.

## ٥. [[proxy_pass http://127.0.0.1:3000;]]

ابعت الطلب لـ [[127.0.0.1]] (الجهاز نفسه، localhost) على بورت 3000. والمسار بيتبعت زي ما هو:

~~~text curl -H "Host: example.com" http://203.0.113.10/about
app on :3000 got: GET /about
~~~

## ٦. [[proxy_http_version 1.1;]]

Nginx بيكلّم التطبيق بـ HTTP/1.0 افتراضيًا. و WebSockets (اتصال مفتوح على طول للشات والإشعارات اللايف) محتاجة 1.1.

---

## ٧. الـ headers: [[proxy_set_header]]

[[proxy_set_header اسم قيمة;]] معناها «وانت باعت الطلب للتطبيق، حط الـ header ده بالقيمة دي». والقيم اللي بتبدأ بـ [[$]] **متغيرات** Nginx بيملاها لكل طلب.

### من غير ولا سطر منهم

شيلت كل سطور [[proxy_set_header]] وجربت من اللابتوب:

~~~text الناتج
app on :3000 got: GET /
client (socket): 127.0.0.1
Host: 127.0.0.1:3000
X-Real-IP: None
X-Forwarded-For: None
X-Forwarded-Proto: None
Connection: close
~~~

التطبيق مش عارف الدومين ([[Host]] بقى عنوان التطبيق نفسه)، ولا مين الزائر: الاتصال جاله من Nginx، فالـ IP الوحيد اللي يعرفه [[127.0.0.1]].

### بالسطور كلها

~~~text الناتج
app on :3000 got: GET /about
client (socket): 127.0.0.1
Host: example.com
X-Real-IP: 203.0.113.50
X-Forwarded-For: 203.0.113.50
X-Forwarded-Proto: http
Connection: upgrade
~~~

| السطر | المتغير | قيمته هنا | فايدته |
|---|---|---|---|
| [[Upgrade $http_upgrade]] | الـ header [[Upgrade]] اللي جه من المتصفح | فاضي، أو [[websocket]] | يوصّل طلب التحويل لـ WebSocket |
| [[Connection "upgrade"]] | قيمة ثابتة | [[upgrade]] | يقول للتطبيق الاتصال بيتحوّل |
| [[Host $host]] | الدومين اللي الزائر كتبه | [[example.com]] | التطبيق يعرف هو أنهي موقع |
| [[X-Real-IP $remote_addr]] | IP اللي فتح الاتصال مع Nginx | [[203.0.113.50]] | IP الزائر الحقيقي |
| [[X-Forwarded-For $proxy_add_x_forwarded_for]] | اللستة اللي جت + IP الزائر | [[203.0.113.50]] | نفس الفكرة بالشكل المتعارف عليه لو فيه أكتر من proxy |
| [[X-Forwarded-Proto $scheme]] | [[http]] أو [[https]] | [[http]] | التطبيق يعرف الزائر جه بأنهي واحد |

و [[$http_]] قبل أي اسم معناها «الـ header اللي جه من المتصفح بالاسم ده». جربت أبعت طلب WebSocket:

~~~text curl -H "Upgrade: websocket" -H "Connection: Upgrade" ...
app on :3000 got: GET /ws
Upgrade: websocket
Connection: upgrade
~~~

لاحظ إن [[client (socket)]] فضل [[127.0.0.1]] في الحالتين: ده طبيعي، التطبيق بيقرا IP الزائر من الـ header. في Express مثلًا بتكتب [[app.set('trust proxy', 1)]] عشان [[req.ip]] ياخده من هناك.

---

## ٨. [[}]] و [[}]]

الأولى تقفل [[location]]، والتانية تقفل [[server]]. وكل [[{]] لازم ليها [[}]].

---

## الخلاصة

~~~text
server_name   أنهي دومين؟
listen        أنهي بورت؟
location /    أنهي مسار؟ (/ = كله)
proxy_pass    ابعته فين؟
proxy_set_header  عرّف التطبيق مين الزائر وجه إزاي
;             في آخر كل directive
~~~`,
          lines: [
            "بداية بلوك موقع واحد.",
            "اسمع على بورت 80 (http). certbot هيضيف 443 بعدين لوحده.",
            "البلوك ده للدومين ده بالـ www ومن غيرها. ولاحظ الـ [[;]] في آخر كل سطر.",
            "أي طلب مساره بيبدأ بـ / (يعني كل الطلبات).",
            "ابعته لتطبيقك اللي على بورت 3000 جوه السيرفر نفسه.",
            "استخدم HTTP نسخة 1.1، ودي لازمة للـ WebSockets.",
            "لو المتصفح طالب يحوّل الاتصال لـ WebSocket، وصّل الطلب ده للتطبيق.",
            "نفس الحاجة: قول للتطبيق إن الاتصال بيتحوّل.",
            "ابعت للتطبيق الدومين اللي الزائر كتبه.",
            "ابعت IP الزائر الحقيقي. من غيره التطبيق هيشوف كل الزوار جايين من 127.0.0.1.",
            "نفس الفكرة، بالشكل المتعارف عليه لو فيه كذا proxy في الطريق.",
            "قول للتطبيق الزائر جه بـ http ولا https.",
            "قفلة بلوك location.",
            "قفلة بلوك server."
          ],
          sol: R`المطلوب هنا الملف نفسه في [[/etc/nginx/sites-available/myapp]]، ومفيش ناتج لسه. [[cat /etc/nginx/sites-available/myapp]] المفروض يوريه بنفس الشكل، والأقواس [[{ }]] متقفلة، وكل سطر جوه بينتهي بـ [[;]].

الدومين الوهمي كفاية، لأنك هتختبر بـ [[curl -H "Host: example.com" http://127.0.0.1]] في الدرس الجاي. وطبيعي لو التطبيق على 3000 مش شغال لسه، الرد يبقى 502.

الغلط الشائع: تكتب الملف في [[sites-enabled]] مباشرة أو بامتداد غلط، أو تنسى [[;]] في آخر سطر، ودي هتبان في [[nginx -t]] الجاي. ولو فتحته بـ nano من غير sudo هيقولك [[Permission denied]] وقت الحفظ.`
        },
        {
          cmd: "تفعيل الموقع",
          title: "sites-enabled و nginx -t",
          desc: "Nginx بيقرا اللي في sites-enabled بس، فبتعمل لينك. [[nginx -t]] قبل أي reload دايمًا، ولو فيه غلط هيقولك السطر. [[reload]] بيطبّق من غير ما يقطع الزوار، عكس [[restart]].",
          example: R`sudo nano /etc/nginx/sites-available/myapp
sudo ln -s /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
curl -H "Host: example.com" http://127.0.0.1`,
          try: "اعمل غلطة متعمدة في الملف (امسح ;) وشوف [[nginx -t]] هيقول إيه.",
          deep: {
            why: "كتبت ملف الموقع، بس Nginx لسه مش بيقراه. محتاج تفعّله، وتتأكد إنه سليم، وتخلي Nginx يطبّقه من غير ما يوقع المواقع التانية.",
            how: R`Nginx على أوبونتو بيستخدم فولدرين: [[sites-available]] فيه كل ملفات المواقع، و [[sites-enabled]] فيه اختصارات (symlinks) للمواقع الشغالة بس. و Nginx بيقرا [[sites-enabled]] بس.

الفكرة الحلوة إنك توقف موقع بمسح الاختصار، والملف الأصلي فاضل. وترجّعه بعمل الاختصار تاني.

و [[default]] ده موقع تجريبي بيجي مع Nginx، والأحسن تشيله عشان ميمسكش الطلبات بدل موقعك.

[[nginx -t]] بيقرا كل الإعدادات ويقولك فيه غلطة ولا لأ، من غير ما يطبّق حاجة. وده أهم أمر هنا: لو فيه غلطة وعملت reload، Nginx هيرفض يطبّق، ولو عملت restart ممكن ميقومش خالص وكل مواقعك تقع.

و [[reload]] بيخلي Nginx يقرا الإعدادات الجديدة من غير ما يقطع الزوار اللي بيحمّلوا دلوقتي.

وآخر أمر بيجرّب الموقع من جوه السيرفر قبل ما الـ DNS يبقى جاهز: [[-H "Host: example.com"]] بيقول لـ Nginx «اعتبر إن الزائر كتب الدومين ده».`,
            when: "كل ما تضيف موقع أو تعدّل إعدادات.",
            mistakes: "reload أو restart من غير [[nginx -t]]. ونسيان الاختصار، فتفضل تعدّل الملف وتستغرب إن مفيش حاجة بتتغير."
          },
          teach: R`## اكتب، فعّل، شيل الافتراضي، اختبر وطبّق، جرّب

اتجرّب كله على كونتينر [[ubuntu:24.04]] فيه systemd و Nginx [[1.24.0]]، والملف [[myapp]] هو بتاع الدرس اللي فات، وفيه تطبيق تجربة شغال على 3000.

---

## ١. [[sudo nano /etc/nginx/sites-available/myapp]]

بتكتب ملف الموقع (الدرس اللي فات). [[sites-available]] يعني «المواقع المتاحة»: كل ملفات المواقع عندك، شغالة أو لأ.

---

## ٢. [[sudo ln -s /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled/]]

### ليه [[sites-enabled]]؟

Nginx مش بيقرا [[sites-available]] خالص. ملفه الأساسي فيه:

~~~text grep -n include /etc/nginx/nginx.conf (جزء)
59:	include /etc/nginx/conf.d/*.conf;
60:	include /etc/nginx/sites-enabled/*;
~~~

يعني بيقرا أي حاجة في [[sites-enabled]] بس. فبنعمل هناك **اختصار** للملف.

### نفك الأمر

| الحتة | معناها |
|---|---|
| [[ln]] | link: اعمل لينك |
| [[-s]] | symbolic: لينك «اختصار» بيشاور على مكان الملف (زي shortcut في ويندوز) |
| المسار الأول | الملف الحقيقي |
| المسار التاني | فين تحط الاختصار. بما إنه فولدر وآخره [[/]]، الاختصار بياخد نفس الاسم [[myapp]] |

~~~text ls -l /etc/nginx/sites-enabled/
lrwxrwxrwx 1 root root 34 Oct  6 14:36 default -> /etc/nginx/sites-available/default
lrwxrwxrwx 1 root root 32 Oct  6 15:03 myapp -> /etc/nginx/sites-available/myapp
~~~

الـ [[l]] في أول الصلاحيات معناها link، و [[->]] بيوريك بيشاور على إيه. يعني تعديل الملف الأصلي هو نفسه تعديل اللي Nginx بيقراه.

---

## ٣. [[sudo rm /etc/nginx/sites-enabled/default]]

[[rm]] بيمسح، بس هنا بيمسح **الاختصار** بس. الأصلي لسه موجود:

~~~text ls -l /etc/nginx/sites-available/
-rw-r--r-- 1 root root 2412 Dec  1  2023 default
-rw-r--r-- 1 root root  471 Oct  6 15:03 myapp
~~~

ليه نشيله؟ [[default]] موقع تجريبي معمول [[default_server]]: بيمسك أي طلب الدومين بتاعه مش مكتوب في أي [[server_name]]، زي حد فاتح [[http://IP]] على طول، فيشوف صفحة [[Welcome to nginx!]]. بعد ما شيلته، بلوك [[myapp]] بقى الوحيد، فبقى هو اللي بيرد على الطلبات دي كمان.

---

## ٤. [[sudo nginx -t && sudo systemctl reload nginx]]

### [[nginx -t]]

[[-t]] من test: اقرا كل الإعدادات (nginx.conf وكل اللي بيعمله include) واتأكد إنها سليمة، ومتطبّقش حاجة:

~~~text الناتج لو سليم
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
~~~

مسحت [[;]] من آخر سطر [[proxy_pass]] عمدًا:

~~~text الناتج
2026/10/06 15:04:55 [emerg] 3107#3107: invalid number of arguments in "proxy_pass" directive in /etc/nginx/sites-enabled/myapp:7
nginx: configuration file /etc/nginx/nginx.conf test failed
~~~

[[emerg]] (emergency) أخطر مستوى غلط. ورقم السطر 7 مش 6، لأن من غير [[;]] Nginx كمّل يقرا السطر اللي بعده كأنه جزء من [[proxy_pass]]، فلقاه كلام كتير. ولما مسحتها من آخر directive قبل [[}]]:

~~~text الناتج
[emerg] 3111#3111: unexpected "}" in /etc/nginx/sites-enabled/myapp:14
~~~

### [[&&]]

«شغّل اللي بعدي **لو** اللي قبلي نجح». فلو [[nginx -t]] فشل، الـ reload مش بيتنفذ أصلًا، والموقع يفضل شغال بالإعداد القديم السليم.

### [[systemctl reload nginx]]

| | reload | restart |
|---|---|---|
| الإعدادات الجديدة | بتتقرا | بتتقرا |
| الزوار اللي بيحمّلوا دلوقتي | بيكمّلوا عادي | الاتصال بيتقطع |
| لو الإعداد بايظ | بيرفض ويفضل على القديم | Nginx ممكن ميقومش خالص |

> الـ reload بياخد لحظة: Nginx بيشغّل عمال جداد بالإعداد الجديد ويسيب القدام يخلّصوا. أول curl بعده على طول رجّعلي الصفحة القديمة، وبعد ثانية رجّع التطبيق.

---

## ٥. [[curl -H "Host: example.com" http://127.0.0.1]]

بتطلب من السيرفر نفسه ([[127.0.0.1]])، و [[-H "Host: example.com"]] بيعمل كأن الزائر كتب الدومين، فـ Nginx بيختار بلوك [[myapp]]. ده بيشتغل قبل ما الـ DNS يجهز:

~~~text الناتج
app on :3000 got: GET /
client (socket): 127.0.0.1
Host: example.com
...
~~~

رد التطبيق. ولو التطبيق واقف هتلاقي [[502 Bad Gateway]] (درس اللوجات الجاي).

---

## الخلاصة

| الخطوة | الأمر | لو نجح |
|---|---|---|
| ١ | اكتب الملف في [[sites-available]] | |
| ٢ | [[ln -s]] لـ [[sites-enabled]] | [[ls -l]] يوري [[->]] |
| ٣ | [[rm]] اختصار [[default]] | |
| ٤ | [[nginx -t && systemctl reload nginx]] | [[test is successful]] |
| ٥ | [[curl -H "Host: ..." http://127.0.0.1]] | رد تطبيقك |

> توقيف موقع = امسح اختصاره و reload. والملف نفسه بيفضل في [[sites-available]].`,
          lines: [
            "اكتب ملف الموقع.",
            "فعّله: اعمل اختصار له في sites-enabled.",
            "شيل الموقع التجريبي اللي جاي مع Nginx (بتشيل الاختصار بس).",
            "اختبر الإعدادات، ولو سليمة طبّقها من غير ما تقطع الزوار.",
            "جرّب من السيرفر نفسه كأن الزائر كتب example.com."
          ],
          sol: R`لو مسحت [[;]] من آخر [[proxy_pass http://127.0.0.1:3000]]، [[sudo nginx -t]] بيطبع:

[[[emerg] ...: invalid number of arguments in "proxy_pass" directive in /etc/nginx/sites-enabled/myapp:7]] (قبلها التاريخ ورقم العملية) و [[nginx: configuration file /etc/nginx/nginx.conf test failed]]. ده لأن السطر اللي بعده اتضم له كـ arguments، فالرقم بيشاور على السطر 7 اللي فيه أول [[;]] بعد الغلطة، مش سطر 6 اللي فيه [[proxy_pass]]. ولو مسحتها من آخر سطر قبل [[}]]، الرسالة بتبقى [[unexpected "}"]] برقم السطر. جربت الحالتين.

و [[&&]] منعت الـ reload، فالموقع شغال بالإعداد القديم. بعد ما تصلّح: [[syntax is ok]] و [[test is successful]]، و [[curl -H "Host: example.com" http://127.0.0.1]] بيرجع رد التطبيق (أو [[502 Bad Gateway]] لو التطبيق مش شغال). الغلط الشائع: رقم السطر بيشاور على ملف [[sites-enabled]] وانت بتعدّل في [[sites-available]]؛ ده نفس الملف لأنه link.`
        },
        {
          cmd: "لوجات Nginx",
          title: "مين زار وإيه اللي وقع",
          desc: R`Nginx بيكتب ملفين لوج في [[/var/log/nginx]]: [[access.log]] فيه سطر لكل طلب (IP الزائر، والوقت، والصفحة، والـ status code، والحجم، والمتصفح)، و [[error.log]] فيه المشاكل: التطبيق مش بيرد، أو ملف مش موجود، أو صلاحيات.

[[tail -f]] بيعرض آخر الملف ويفضل يطبع أي سطر جديد لايف (Ctrl+C للخروج)، و [[-n 50]] آخر 50 سطر. أمر الـ awk بيقسم كل سطر على المسافات وياخد الخانة التاسعة ([[$9]])، ودي الـ status code في الصيغة الافتراضية، و [[sort | uniq -c | sort -rn]] بيعد كل رقم اتكرر كام مرة ويرتبهم من الأكتر. و [[grep " 500 "]] بيجيب الطلبات اللي رجعت 500 بس. الملفات ملك root، فمحتاج [[sudo]].

لما الموقع يطلع [[502 Bad Gateway]] ابدأ بـ [[error.log]]: غالبًا هتلاقي [[Connection refused]]، يعني Nginx شغال بس تطبيقك واقف أو على بورت تاني.`,
          example: R`sudo tail -f /var/log/nginx/access.log
sudo tail -n 50 /var/log/nginx/error.log
sudo awk '{print $9}' /var/log/nginx/access.log | sort | uniq -c | sort -rn
sudo grep " 500 " /var/log/nginx/access.log | tail`,
          try: "اقفل تطبيقك، افتح الموقع، وشوف الـ 502 في error.log.",
          deep: {
            why: "لما الموقع يطلع error، أو عايز تعرف مين بيزور، أو إيه الصفحات اللي فيها مشاكل، اللوجات هي المصدر.",
            how: R`Nginx بيكتب لوجين:

[[access.log]] سطر لكل طلب: IP الزائر، والوقت، والطلب نفسه (GET /about)، والـ status code، والحجم، والمتصفح. والعمود التاسع (لما تقسم السطر بالمسافات) هو الـ status، عشان كده [[awk '{print $9}']] بيطلعه، والباقي [[sort | uniq -c | sort -rn]] بيعد كل status ويرتبهم. فتشوف مثلًا إن فيه ٣٠٠ طلب 404، وده معناه لينكات مكسورة.

[[error.log]] فيه المشاكل: التطبيق مش بيرد، وملف مش لاقيه، وصلاحيات. ولما الزائر يشوف 502، هتلاقي هنا سطر زي «connect() failed (111: Connection refused) while connecting to upstream»، ومعناه إن Nginx حاول يكلّم تطبيقك ومحدش رد، يعني التطبيق واقع أو على بورت تاني.

والملفات دي ملك root، فمحتاج sudo.`,
            when: "كل ما الموقع يطلع error: [[error.log]] الأول. ولما تحب تعرف عدد الزيارات أو الصفحات المكسورة: [[access.log]].",
            mistakes: "إنك تدوّر في لوج Nginx على error في كود تطبيقك. Nginx بيقولك بس إن التطبيق مردّش أو رد بـ 500. تفاصيل الـ error نفسها في لوج التطبيق ([[pm2 logs]] أو [[docker logs]])."
          },
          teach: R`## ملفين، و ٤ طرق تقراهم

Nginx بيكتب في [[/var/log/nginx/]]: [[access.log]] (كل طلب) و [[error.log]] (كل مشكلة). اتجرّب على كونتينر [[ubuntu:24.04]] فيه Nginx والموقع [[myapp]] من الدرسين اللي فاتوا. بعتّ من كونتينر اللابتوب ٧ طلبات والتطبيق شغال (منهم صفحة مش موجودة وصفحة بتوقع التطبيق)، وبعدين وقّفت التطبيق وبعتّ طلبين كمان.

### ليه [[sudo]]؟

~~~text ls -l /var/log/nginx/
-rw-r----- 1 www-data adm 862 Oct  6 15:06 access.log
-rw-r----- 1 www-data adm 494 Oct  6 15:06 error.log
~~~

صاحبها [[www-data]] (اليوزر اللي Nginx شغال بيه)، وجروب [[adm]] يقرا، والباقي ولا حاجة ([[---]]). فيوزر deploy من غير sudo:

~~~text الناتج
tail: cannot open '/var/log/nginx/access.log' for reading: Permission denied
~~~

---

## ١. [[sudo tail -f /var/log/nginx/access.log]]

[[tail]] بيطبع آخر الملف (آخر ١٠ سطور افتراضيًا)، و [[-f]] من follow: متخرجش، واطبع أي سطر جديد أول ما يتكتب. فاتح الأمر ده وبتفتح الموقع من المتصفح، هتشوف كل طلب بيظهر لايف. Ctrl+C للخروج.

### نقرا سطر واحد

~~~text سطر من access.log
203.0.113.50 - - [06/Oct/2026:15:06:08 +0300] "GET /missing HTTP/1.1" 404 188 "-" "Mozilla/5.0 demo"
~~~

لو قسمت السطر على المسافات، كل حتة ليها رقم ([[$1]] أول حتة، [[$2]] التانية...):

| الرقم | القيمة | معناها |
|---|---|---|
| [[$1]] | [[203.0.113.50]] | IP الزائر |
| [[$2]] و [[$3]] | [[-]] [[-]] | خانات قديمة (اسم اليوزر لو فيه تسجيل دخول HTTP) |
| [[$4]] و [[$5]] | [[06/Oct/2026:15:06:08]] و [[+0300]] بين [[[ ]]] | الوقت، وفرق المنطقة الزمنية |
| [[$6]] [[$7]] [[$8]] | [["GET]] [[/missing]] [[HTTP/1.1"]] | الطلب: النوع والمسار والبروتوكول |
| [[$9]] | [[404]] | **الـ status code** |
| [[$10]] | [[188]] | حجم الرد بالبايت |
| [[$11]] | [["-"]] | الـ referer: الزائر جه من أنهي صفحة |
| الباقي | [["Mozilla/5.0 demo"]] | المتصفح (User-Agent) |

---

## ٢. [[sudo tail -n 50 /var/log/nginx/error.log]]

[[-n 50]] آخر ٥٠ سطر بدل ١٠، ومن غير [[-f]] فبيطبع ويخرج. بعد ما وقّفت التطبيق:

~~~text الناتج
2026/10/06 15:06:15 [error] 3183#3183: *35 connect() failed (111: Connection refused) while connecting to upstream, client: 203.0.113.50, server: example.com, request: "GET / HTTP/1.1", upstream: "http://127.0.0.1:3000/", host: "example.com"
~~~

| الحتة | معناها |
|---|---|
| [[[error]]] | مستوى المشكلة |
| [[3183#3183]] | رقم عملية Nginx اللي حصل فيها |
| [[*35]] | رقم الاتصال |
| [[connect() failed (111: Connection refused)]] | حاول يفتح اتصال ومحدش رد. 111 رقم الغلط ده في لينكس |
| [[upstream]] | اللي ورا Nginx، يعني تطبيقك ([[http://127.0.0.1:3000/]]) |
| [[client]] و [[server]] و [[request]] | مين طلب، وأنهي موقع، وطلب إيه |

والزائر شاف:

~~~text الناتج على اللابتوب
<html>
<head><title>502 Bad Gateway</title></head>
~~~

502 يعني «Nginx شغال، بس اللي وراه مردّش». يبقى روح شوف تطبيقك.

---

## ٣. [[sudo awk '{print $9}' /var/log/nginx/access.log | sort | uniq -c | sort -rn]]

خط إنتاج من ٤ مراحل، كل [[|]] بيبعت ناتج اللي قبله للي بعده:

| المرحلة | بتعمل إيه | الناتج بعدها |
|---|---|---|
| [[awk '{print $9}' ...]] | من كل سطر اطبع الخانة التاسعة بس | عمود أرقام: 200 200 200 404 500 ... |
| [[sort]] | رتّبهم، فالمتشابه يبقى جنب بعض | 200 200 200 200 404 404 500 502 502 |
| [[uniq -c]] | اختصر كل مجموعة متشابهة لسطر واحد، و [[-c]] (count) اكتب العدد قدامه | 4 200 / 2 404 / ... |
| [[sort -rn]] | رتّب تاني: [[-n]] كأرقام، و [[-r]] من الكبير للصغير | |

~~~text الناتج
      4 200
      2 502
      2 404
      1 500
~~~

٤ طلبات نجحت، و ٢ لصفحة مش موجودة، و ١ التطبيق وقع فيه، و ٢ والتطبيق واقف. والـ [[sort]] الأولى لازمة لأن [[uniq]] بيدمج المتكرر **ورا بعض** بس.

و [['...']] (single quotes) حوالين كود awk عشان الشيل ميلمسش [[$9]] ويفتكره متغير بتاعه.

---

## ٤. [[sudo grep " 500 " /var/log/nginx/access.log | tail]]

[[grep]] هات السطور اللي فيها [[" 500 "]]، بمسافة قبل وبعد عشان ميجيبش [[1500]] أو حجم رد [[5004]]. و [[tail]] من غير رقم: آخر ١٠.

~~~text الناتج
203.0.113.50 - - [06/Oct/2026:15:06:08 +0300] "GET /boom HTTP/1.1" 500 185 "-" "Mozilla/5.0 demo"
~~~

دلوقتي عرفت الصفحة اللي بتوقع ([[/boom]]) والوقت بالظبط، فتروح لوج التطبيق في نفس الدقيقة تلاقي الـ error نفسه.

---

## الخلاصة

| عايز | الأمر |
|---|---|
| أتفرج لايف | [[sudo tail -f .../access.log]] |
| ليه الموقع بيطلع 502 | [[sudo tail -n 50 .../error.log]] |
| كام طلب من كل status | [[awk '{print $9}' | sort | uniq -c | sort -rn]] |
| الطلبات اللي فشلت 500 | [[grep " 500 " | tail]] |

> 502 = التطبيق مردّش (اقرا error.log). 500 = التطبيق رد بس وقع جوه (اقرا لوج التطبيق).`,
          lines: [
            "تابع كل زيارة لايف.",
            "آخر ٥٠ مشكلة.",
            "طلّع عمود الـ status من كل سطر، وعدّ كل رقم اتكرر كام مرة، ورتّبهم من الأكتر.",
            "هات الطلبات اللي رجعت 500 بس، وآخر ١٠ منهم. المسافات حوالين 500 عشان ميجيبش أرقام زي 1500."
          ],
          sol: R`بعد ما توقّف التطبيق وتفتح الموقع: المتصفح بيوري [[502 Bad Gateway]]، و [[sudo tail -n 5 /var/log/nginx/error.log]] فيه:

[[connect() failed (111: Connection refused) while connecting to upstream, client: ..., server: example.com, request: "GET / HTTP/1.1", upstream: "http://127.0.0.1:3000/"]]. يعني Nginx شغال، بس مفيش حد سامع على 3000. و [[access.log]] فيه نفس الطلب بـ 502، وأمر الـ awk بيعدّها ([[1 502]]). جربتها بالظبط.

الغلط الشائع: تدوّر في [[access.log]] بس وتلاقي 502 من غير سبب؛ السبب دايمًا في [[error.log]]. ولو الرسالة [[upstream timed out (110)]] يبقى التطبيق شغال بس بطيء أو مهنّج، وده غير الـ refused.`
        }
      ]
    }
]);
