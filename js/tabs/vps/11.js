// تكملة تاب vps: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/vps/01.js (شرح حقول الدرس في أوله)
MORE("vps", [
    {
      t: "التحدي الكبير: سيرفر من الصفر",
      l: 3,
      n: "اعملهم بالترتيب على VPS فاضي أو multipass، كل خطوة مبنية على اللي قبلها. الهدف توصل إنك تعمل الثمانية من غير ما تبص",
      items: [
        {
          cmd: "خطوة 1",
          title: "ادخل وحدّث",
          desc: R`أول ما تستلم VPS جديد، شركة الاستضافة بتديك IP وباسورد أو مفتاح لليوزر root، وده اليوزر الوحيد الموجود، فكل الأوامر هنا من غير [[sudo]]. [[ssh root@203.0.113.10]] بيدخلك على السيرفر (الـ IP ده مثال، حط بتاعك).

[[apt update && apt upgrade -y]] بيحدّث الكتالوج، ولو نجح ([[&&]]) يحدّث كل البرامج من غير ما يسأل ([[-y]])، لأن نسخة النظام اللي على السيرفر ممكن تكون قديمة شهور وناقصها تحديثات أمان. و [[timedatectl set-timezone]] بيظبط المنطقة الزمنية قبل ما أي لوج أو cron يتسجّل.

لو ظهرت شاشة بتسألك عن ملف إعدادات أثناء التحديث، اختار «keep the local version» غالبًا. ولو بعدها [[/var/run/reboot-required]] موجود، اعمل [[reboot]] قبل ما تكمّل.`,
          example: R`ssh root@203.0.113.10
apt update && apt upgrade -y
timedatectl set-timezone Africa/Cairo`,
          try: "بعدها اكتب مواصفات السيرفر من [[hostnamectl]] و [[free -h]].",
          deep: {
            why: "أي سيرفر جديد بييجي بنسخة النظام اللي كانت ساعة ما اتعمل الـ image، وممكن تكون عدى عليها شهور من تحديثات الأمان.",
            how: R`بتدخل كـ root أول مرة لأن ده اليوزر الوحيد الموجود، فمش محتاج sudo. [[apt update && apt upgrade -y]] بيجيب الكتالوج ويحدّث كل حاجة. و [[&&]] عشان التحديث ميبدأش لو جلب الكتالوج فشل. وبعدين المنطقة الزمنية قبل أي حاجة تتسجّل في اللوجات.

لو ظهرتلك شاشة زرقا بتسألك عن ملف إعدادات أثناء التحديث، اختار «keep the local version» غالبًا.`,
            when: "أول ٥ دقايق مع أي سيرفر.",
            mistakes: "إنك تأجّل التحديث لبعدين، وتبدأ تسطّب وتظبط على نظام قديم."
          },
          teach: R`الخطوة دي ٣ أوامر: تدخل على السيرفر، تحدّث كل البرامج اللي عليه، وتظبط الساعة على توقيت مصر. مفيش VPS حقيقي هنا، فالأوامر اتجرّبت على [[ubuntu:24.04]] جوه Docker (container فيه systemd عشان [[timedatectl]] يشتغل)، والنواتج اللي تحت منه.

---

## ١. [[ssh root@203.0.113.10]]

~~~bash
ssh root@203.0.113.10
~~~

- [[ssh]] (Secure Shell) البرنامج اللي بيفتحلك ترمنال على جهاز تاني عبر النت، والكلام بينكم متشفّر.
- [[root]] اسم اليوزر اللي داخل بيه. ده المدير الكامل في لينكس، وهو اليوزر الوحيد اللي شركة الاستضافة عاملاه.
- [[@]] بتفصل اليوزر عن عنوان الجهاز.
- [[203.0.113.10]] الـ IP بتاع السيرفر. الرقم ده بالذات من نطاق محجوز للأمثلة في الكتب (مش سيرفر حقيقي)، فحط مكانه الـ IP اللي في إيميل شركة الاستضافة.

أول مرة بيسألك [[Are you sure you want to continue connecting (yes/no/[fingerprint])?]]: ده SSH بيقولك «مقابلتش السيرفر ده قبل كده»، اكتب [[yes]] وهو يحفظ بصمته في [[~/.ssh/known_hosts]] على جهازك. بعدها الـ prompt بيبقى [[root@اسم-السيرفر:~#]]، وعلامة [[#]] في الآخر معناها إنك root (اليوزر العادي بيبقى [[$]]).

وبما إنك root، كل الأوامر الجاية من غير [[sudo]]: [[sudo]] معناها «نفّذ كـ root»، وانت أصلًا root.

---

## ٢. [[apt update && apt upgrade -y]]

ده سطر فيه أمرين متوصلين بـ [[&&]].

### الأمر الأول: [[apt update]]

[[apt]] مدير البرامج في أوبونتو. [[update]] **مش بيحدّث أي برنامج**: بيجيب بس الكتالوج، يعني القايمة الجديدة بالبرامج ونسخها من سيرفرات أوبونتو. على container جديد طلع:

~~~text الناتج (مختصر)
Get:1 http://archive.ubuntu.com/ubuntu noble InRelease [256 kB]
...
Fetched 33.2 MB in 17s (1993 kB/s)
3 packages can be upgraded. Run 'apt list --upgradable' to see them.
~~~

[[noble]] ده اسم الشهرة لأوبونتو 24.04. والسطر الأخير بيقولك فيه ٣ برامج عندك نسخة أقدم منها.

### الرابط: [[&&]]

[[&&]] معناها «لو اللي قبلي نجح، نفّذ اللي بعدي». لو [[apt update]] فشل (النت فاصل مثلًا)، [[apt upgrade]] مش هيشتغل على كتالوج قديم.

### الأمر التاني: [[apt upgrade -y]]

[[upgrade]] هو اللي بيحدّث فعلًا: بيقارن اللي عندك بالكتالوج وينزّل الأحدث. وعادة بيسألك [[Do you want to continue?]] ويستنى Y أو n، و [[-y]] (yes) بتجاوب «أيوه» لوحدها:

~~~text الناتج (مختصر)
The following packages will be upgraded:
  libaudit-common libaudit1 libssl3t64
3 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.
~~~

| الرقم | معناه |
|---|---|
| [[3 upgraded]] | ٣ برامج اتحدّثت |
| [[0 newly installed]] | مفيش برامج جديدة اتسطّبت عشان التحديث |
| [[0 to remove]] | مفيش حاجة اتشالت |
| [[0 not upgraded]] | مفيش حاجة اتأجلت |

على VPS حقيقي الرقم بيبقى أكبر بكتير (عشرات البرامج) لو الـ image قديمة. ولاحظ [[libssl3t64]]: دي مكتبة التشفير اللي SSH و HTTPS معتمدين عليها، وده بالظبط نوع التحديث اللي مينفعش يتأجل.

### بعد التحديث: محتاج reboot؟

لو التحديث لمس الـ kernel أو مكتبة أساسية، أوبونتو بيعمل ملف اسمه [[/var/run/reboot-required]]. فاسأل:

~~~bash
ls /var/run/reboot-required
~~~

~~~text الناتج هنا
ls: cannot access '/var/run/reboot-required': No such file or directory
~~~

الملف مش موجود، فمفيش reboot. لو موجود، اعمل [[reboot]] واستنى دقيقة وادخل تاني بـ ssh.

---

## ٣. [[timedatectl set-timezone Africa/Cairo]]

- [[timedatectl]] = time + date + ctl (control): الأداة اللي بتتحكم في الساعة والتاريخ على أي لينكس فيه systemd.
- [[set-timezone]] غيّر المنطقة الزمنية.
- [[Africa/Cairo]] اسم المنطقة بالشكل الرسمي «قارة/مدينة».

قبل وبعد على نفس الـ container:

~~~bash
timedatectl set-timezone Etc/UTC; date
timedatectl set-timezone Africa/Cairo; date
~~~

~~~text الناتج
Tue Oct  6 11:37:35 UTC 2026
Tue Oct  6 14:37:35 EEST 2026
~~~

نفس اللحظة، بس الساعة اتحركت ٣ ساعات. [[EEST]] (Eastern European Summer Time) هو توقيت مصر الصيفي (+3)، وفي الشتا بيبقى [[EET]] (+2). السيرفرات بتيجي على [[UTC]] (التوقيت العالمي)، ولو سبته كده كل لوج هيقولك «الساعة 11» والحاجة حصلت 2 الضهر بتوقيتك، وكل [[cron]] هيشتغل في ميعاد غير اللي في دماغك.

ولو مش عارف الاسم بالظبط، دوّر عليه:

~~~bash
timedatectl list-timezones | grep -i cairo
~~~

~~~text الناتج
Africa/Cairo
~~~

ولو كتبت الاسم غلط، زي [[Cairo]] لوحدها:

~~~text الناتج
Failed to set time zone: Invalid or not installed time zone 'Cairo'
~~~

وللتأكد، [[timedatectl]] من غير حاجة:

~~~text الناتج
               Local time: Tue 2026-10-06 14:37:39 EEST
           Universal time: Tue 2026-10-06 11:37:39 UTC
                 RTC time: n/a
                Time zone: Africa/Cairo (EEST, +0300)
System clock synchronized: yes
~~~

[[Local time]] بتوقيتك، و [[Universal time]] بتوقيت العالم، و [[+0300]] الفرق بينهم. و [[System clock synchronized: yes]] معناها إن الساعة مظبوطة من النت (NTP). [[RTC time: n/a]] لأن الـ container ملوش ساعة hardware؛ على VPS حقيقي غالبًا هتلاقي وقت فيها.

---

## التمرين: اكتب مواصفات السيرفر

~~~bash
hostnamectl
free -h
nproc
df -h /
~~~

على الـ container ده (نواتج لابتوب، مش VPS، فالأرقام أكبر من VPS عادي):

~~~text hostnamectl (مختصر)
 Static hostname: vps
Operating System: Ubuntu 24.04.5 LTS
          Kernel: Linux 6.6.87.2-microsoft-standard-WSL2
    Architecture: x86-64
~~~

~~~text free -h
               total        used        free      shared  buff/cache   available
Mem:            15Gi       1.2Gi        12Gi        50Mi       1.7Gi        14Gi
Swap:          4.0Gi          0B       4.0Gi
~~~

~~~text nproc و df -h /
16
Filesystem      Size  Used Avail Use% Mounted on
overlay        1007G   15G  941G   2% /
~~~

- [[hostnamectl]] اسم الجهاز ونسخة النظام والـ kernel. على VPS هتلاقي [[Virtualization: kvm]] مثلًا بدل [[wsl]].
- [[free -h]] الرام، و [[-h]] (human-readable) بتكتب الأرقام بـ [[Gi]] و [[Mi]] بدل bytes. بص على [[total]] (الرام كلها) و [[available]] (اللي البرامج تقدر تاخده فعلًا).
- [[nproc]] (number of processing units) عدد الأنوية.
- [[df -h /]] (disk free) مساحة الديسك الرئيسي [[/]].

على VPS صغير هتلاقي حاجة زي «2GB رام، 1 core، 25GB». ولو [[total]] تحت 1GB، اعمل swap قبل أي build.

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[ssh root@IP]] | يدخلك على السيرفر كمدير |
| [[apt update]] | يجيب الكتالوج بس، مش بيحدّث |
| [[&&]] | اللي بعدها يشتغل بس لو اللي قبلها نجح |
| [[apt upgrade -y]] | يحدّث كل البرامج من غير ما يسأل |
| [[timedatectl set-timezone Africa/Cairo]] | الساعة واللوجات و cron بتوقيت مصر |

- [[update]] من غير [[upgrade]] ملوش أي أثر على البرامج.
- المنطقة الزمنية اسمها [[Africa/Cairo]] بالكامل، و [[EEST]] صيفي و [[EET]] شتوي.
- لو [[/var/run/reboot-required]] موجود، reboot قبل ما تكمّل.`,
          lines: ["ادخل كـ root.", "حدّث الكتالوج، ولو نجح حدّث كل البرامج.", "اضبط التوقيت."],
          sol: R`[[hostnamectl]] بيطلّع [[Operating System: Ubuntu 24.04.x LTS]] و [[Kernel]] و [[Architecture: x86-64]]، و [[free -h]] بيطلّع الرام في [[Mem: total]]. اكتبهم في ملف ملاحظاتك: النظام، والرام، وعدد الأنوية من [[nproc]]، والمساحة من [[df -h /]]. مثال: «Ubuntu 24.04، 2GB رام، 1 core، 25GB».

و [[apt upgrade]] المفروض يخلص بـ [[X upgraded ...]]، و [[date]] بعد set-timezone بيقول [[EEST]] أو [[EET]].

الغلط الشائع: الرام 1GB أو أقل: هتحتاج swap (درس swap) قبل ما تعمل أي build على السيرفر. ولو [[ls /var/run/reboot-required]] موجود بعد الـ upgrade، اعمل [[reboot]] دلوقتي قبل ما تكمّل.`
        },
        {
          cmd: "خطوة 2",
          title: "يوزر deploy بـ sudo",
          desc: R`الشغل اليومي بـ root خطر: أي غلطة في أمر بتلمس النظام كله. فهنا بتعمل يوزر عادي اسمه deploy وتدّيله صلاحية sudo، ولسه انت root في نفس النافذة.

[[adduser deploy]] بيعمل اليوزر وفولدره ويسألك باسورد ليه (هتحتاجه مع sudo). [[usermod -aG sudo deploy]] بيضيفه لجروب sudo: [[-G]] الجروب، و [[-a]] (append) يعني «ضيف من غير ما تشيله من جروباته التانية». و [[rsync]] بينسخ فولدر [[.ssh]] بتاع root (اللي فيه مفتاحك) لـ deploy، و [[--chown=deploy:deploy]] يخليه صاحبه عشان SSH يقبل المفتاح.

الاختبار جزء من الخطوة: من نافذة جديدة [[ssh deploy@IP]] وبعدين [[sudo whoami]] لازم تطبع root. متكمّلش غير لما ده ينجح.`,
          example: R`adduser deploy
usermod -aG sudo deploy
rsync --archive --chown=deploy:deploy ~/.ssh /home/deploy`,
          try: "من نافذة جديدة: [[ssh deploy@IP]] ثم [[sudo whoami]].",
          deep: {
            why: "عشان تبطّل تستخدم root في الشغل اليومي، وتقدر تقفله في الخطوة الجاية.",
            how: R`نفس اللي في قسم اليوزرز: [[adduser]] يعمل اليوزر، و [[usermod -aG sudo]] يديله sudo، و [[rsync]] ينسخ مفاتيحك له بالصلاحيات الصح.

والاختبار هو أهم جزء في الخطوة: من نافذة جديدة على جهازك، [[ssh deploy@IP]]، وبعدين [[sudo whoami]]. لو طبعت root، الخطوة نجحت. لو مدخلتش، متكمّلش، وصلّح الأول.`,
            when: "بعد خطوة ١ على طول.",
            mistakes: "تكمّل للخطوة ٣ من غير ما تجرّب الدخول باليوزر الجديد."
          },
          teach: R`الخطوة دي بتعمل يوزر عادي اسمه [[deploy]]، تديله حق [[sudo]]، وتنسخله مفتاح SSH بتاعك عشان يدخل بيه. لسه انت root في نفس النافذة، فمفيش [[sudo]] قدام الأوامر. كل اللي تحت اتجرّب على container [[ubuntu:24.04]] فيه systemd و [[openssh-server]]، والمفتاح فيه متعمل كأنه مفتاح لابتوبك.

---

## ١. [[adduser deploy]]

~~~bash
adduser deploy
~~~

[[adduser]] أمر أوبونتو «الودود» لعمل يوزر: بيعمله، ويعمله جروب بنفس الاسم، وفولدر في [[/home]]، ويسألك الباسورد. الناتج الحقيقي (الأسئلة اتجاوبت بـ Enter):

~~~text الناتج
info: Adding user $__btdeploy' ...
info: Selecting UID/GID from range 1000 to 59999 ...
info: Adding new group $__btdeploy' (1001) ...
info: Adding new user $__btdeploy' (1001) with group $__btdeploy (1001)' ...
info: Creating home directory $__bt/home/deploy' ...
info: Copying files from $__bt/etc/skel' ...
New password:
Retype new password:
passwd: password updated successfully
Changing the user information for deploy
Enter the new value, or press ENTER for the default
	Full Name []:
	...
Is the information correct? [Y/n]
info: Adding user $__btdeploy' to group $__btusers' ...
~~~

نقراه سطر سطر:

| السطر | معناه |
|---|---|
| [[UID/GID ... 1000 to 59999]] | اليوزرز العاديين بياخدوا أرقام من 1000. تحت كده لحسابات النظام |
| [[new group deploy (1001)]] | جروب باسم اليوزر. هنا 1001 لأن image أوبونتو فيها يوزر [[ubuntu]] واخد 1000 (وده بيحصل على VPS كتير كمان) |
| [[Creating home directory /home/deploy]] | فولدره الشخصي |
| [[Copying files from /etc/skel]] | [[skel]] = skeleton: ملفات البداية ([[.bashrc]] وغيره) اللي كل يوزر جديد بياخدها |
| [[New password]] | باسورد deploy. **احفظه**: مش هتدخل بيه SSH، بس [[sudo]] هيسألك عليه |
| [[Full Name]] وأخواتها | معلومات اختيارية، Enter على كلهم |

---

## ٢. [[usermod -aG sudo deploy]]

~~~bash
usermod -aG sudo deploy
~~~

- [[usermod]] = user modify: عدّل يوزر موجود.
- [[-G sudo]] الجروبات الإضافية اللي اليوزر يبقى فيها. جروب [[sudo]] في أوبونتو معناه «أي حد فيه يقدر يستخدم أمر sudo».
- [[-a]] (append) ضيف على جروباته الحالية.
- [[deploy]] اليوزر.

الأمر مش بيطبع حاجة لو نجح. نشوف الفرق بـ [[id deploy]] قبل وبعد:

~~~text قبل
uid=1001(deploy) gid=1001(deploy) groups=1001(deploy),100(users)
~~~

~~~text بعد
uid=1001(deploy) gid=1001(deploy) groups=1001(deploy),27(sudo),100(users)
~~~

[[uid]] رقم اليوزر، و [[gid]] جروبه الأساسي، و [[groups]] كل جروباته. ظهر [[27(sudo)]].

### ليه [[-a]] مهمة؟

جرّبنا على يوزر تجريبي اسمه demo كان في [[sudo]] و [[users]]، وكتبنا [[usermod -G users demo]] من غير [[-a]]:

~~~text قبل وبعد
groups=1002(demo),27(sudo),100(users)
groups=1002(demo),100(users)
~~~

[[-G]] لوحدها **بتستبدل** القايمة كلها، فـ sudo اتشال. ولو ده حصل لليوزر الوحيد اللي معاه sudo بعد ما قفلت root، اتقفل عليك.

---

## ٣. [[rsync --archive --chown=deploy:deploy ~/.ssh /home/deploy]]

شركة الاستضافة حطت مفتاحك العام في [[/root/.ssh/authorized_keys]]، والملف ده هو اللي بيخلي SSH يدخلك من غير باسورد. عايزين نفس الملف عند deploy.

~~~text /root/.ssh قبل النسخ
-rw------- 1 root root   88 Oct  6 14:36 authorized_keys
~~~

| الحتة | معناها |
|---|---|
| [[rsync]] | أداة نسخ (remote sync)، بتنسخ محلي أو بين جهازين |
| [[--archive]] | انسخ الفولدر بكل اللي جواه، وحافظ على الصلاحيات والتواريخ |
| [[--chown=deploy:deploy]] | change owner: خلّي صاحب النسخة اليوزر deploy والجروب deploy (الشكل [[user:group]]) |
| [[~/.ssh]] | المصدر. [[~]] هي فولدر اليوزر الحالي، وانت root فهي [[/root]]. ومن غير [[/]] في الآخر، فبينسخ الفولدر نفسه مش محتوياته بس |
| [[/home/deploy]] | المكان. فالنتيجة [[/home/deploy/.ssh]] |

~~~text ls -la /home/deploy/.ssh بعد النسخ
drwx------ 2 deploy deploy 4096 Oct  6 14:36 .
drwxr-x--- 3 deploy deploy 4096 Oct  6 14:36 ..
-rw------- 1 deploy deploy   88 Oct  6 14:36 authorized_keys
~~~

- [[deploy deploy]]: الصاحب اتغيّر. لو فضل [[root]]، SSH هيرفض المفتاح لأنه بيتأكد إن الملف ملك صاحب الحساب.
- [[drwx------]] للفولدر = [[700]]: صاحبه بس يقرا ويكتب ويدخل.
- [[-rw-------]] للملف = [[600]]: صاحبه بس يقرا ويكتب. لو أي حد تاني يقدر يكتب فيه، SSH بيتجاهله لأسباب أمان.

[[--archive]] هي اللي حافظت على الـ 700 و الـ 600 دول. ولو استخدمت [[cp -r]] من غير ما تظبط الصاحب، النسخة هتبقى ملك root.

---

## ٤. الاختبار: من نافذة جديدة

على جهازك (مش نافذة السيرفر):

~~~bash
ssh deploy@IP
sudo whoami
~~~

اللي حصل في التجربة:

~~~text الناتج
deploy
[sudo] password for deploy:
root
~~~

1. [[ssh deploy@IP]] دخل بالمفتاح من غير ما يسأل باسورد. الـ prompt بقى [[deploy@vps:~$]]، و [[$]] معناها يوزر عادي.
2. [[whoami]] (who am I) طبع [[deploy]].
3. [[sudo whoami]] سأل **باسورد deploy** (مش باسورد root)، وبعدين نفّذ [[whoami]] كـ root فطبع [[root]]. يعني الـ sudo شغال.

سيب نافذة root القديمة مفتوحة لحد ما الاتنين ينجحوا.

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[adduser deploy]] | يوزر جديد بفولدر وباسورد |
| [[usermod -aG sudo deploy]] | يضيفه لجروب sudo من غير ما يشيله من جروباته التانية |
| [[rsync --archive --chown=deploy:deploy ~/.ssh /home/deploy]] | ينسخ مفتاحك له وهو صاحبه، بصلاحيات 700 و 600 |
| [[ssh deploy@IP]] ثم [[sudo whoami]] | الاختبار: لازم يطبع root |

- [[-G]] من غير [[-a]] بتمسح باقي الجروبات.
- باسورد deploy للـ sudo بس، الدخول بالمفتاح.
- متكمّلش الخطوة ٣ قبل ما الاختبار ينجح.`,
          lines: ["اعمل اليوزر.", "اديله sudo.", "انسخله مفاتيحك."],
          sol: R`[[ssh deploy@IP]] من نافذة جديدة بيدخل من غير باسورد (بالمفتاح)، والـ prompt [[deploy@server:~$]]. و [[sudo whoami]] بيسأل باسورد deploy مرة وبعدين يطبع [[root]].

سيب نافذة root القديمة مفتوحة لحد ما الاتنين دول ينجحوا، عشان لو فيه غلطة تصلّحها.

الغلط الشائع: [[Permission denied (publickey)]]: الـ rsync ماتعملش أو صلاحيات [[.ssh]] غلط ([[700]] للفولدر و [[600]] للملف). و [[deploy is not in the sudoers file]]: الـ usermod مااتعملش أو كتبت [[-G]] من غير [[-a]].`
        },
        {
          cmd: "خطوة 3",
          title: "اقفل root والباسورد",
          desc: R`دلوقتي تقفل الدخول بـ root وبالباسورد، فالبوتات اللي بتجرّب باسوردات متلاقيش باب. ده بيتعمل من نافذة deploy (عشان تتأكد إن sudo شغال)، وسيب نافذة root مفتوحة لحد ما تتأكد إن كله تمام.

في [[/etc/ssh/sshd_config]] خلّي [[PermitRootLogin no]] و [[PasswordAuthentication no]]، واتأكد إن السطرين مش بادئين بـ [[#]] (السطر اللي بيبدأ بيها متعطل). [[sshd -t]] بيختبر الملف ولو سليم مش بيطبع حاجة، و [[&&]] بتخلي الـ restart يحصل بس لو الاختبار نجح، لأن ملف فيه غلطة ممكن يمنع SSH يقوم خالص.

الـ restart مش بيقطع النوافذ المفتوحة، فلو حاجة باظت لسه عندك نافذة جوه تصلّح منها. جرّب [[ssh root@IP]] من نافذة جديدة: المفروض يترفض.`,
          example: R`sudo nano /etc/ssh/sshd_config
sudo sshd -t && sudo systemctl restart ssh`,
          try: "اتأكد إن [[ssh root@IP]] بقى مرفوض.",
          deep: {
            why: "دي الخطوة اللي بتقفل الباب في وش كل البوتات اللي بتجرّب باسوردات على root.",
            how: R`بتعدّل [[PermitRootLogin no]] و [[PasswordAuthentication no]] (شرحناهم في قسم تأمين SSH). و [[sshd -t && restart]]: الاختبار الأول، والريستارت بس لو الاختبار نجح.

ليه من نافذة deploy؟ عشان تبقى متأكد إن الـ sudo شغال. وليه نافذة root تفضل مفتوحة؟ لأن الـ restart مش بيقفل الاتصالات المفتوحة. فلو حصلت مشكلة ومحدش يقدر يدخل، لسه عندك نافذة جوه تصلّح منها.`,
            when: "بعد ما خطوة ٢ نجحت واتجرّبت.",
            mistakes: "تقفل النافذة التانية قبل ما تجرّب دخول جديد."
          },
          teach: R`الخطوة دي بتعدّل سطرين في إعدادات SSH: ممنوع الدخول بـ root، وممنوع الدخول بالباسورد. وبعدين تختبر الملف قبل ما تطبّقه. اتجرّبت على container [[ubuntu:24.04]] فيه systemd و [[openssh-server]]، والدخول اتجرّب بـ ssh من جوه الـ container على [[127.0.0.1]].

---

## ١. [[sudo nano /etc/ssh/sshd_config]]

- [[sudo]] لأن الملف ملك root، وانت دلوقتي deploy.
- [[nano]] محرر نصوص بسيط في الترمنال.
- [[/etc/ssh/sshd_config]] ملف إعدادات سيرفر SSH. [[/etc]] فولدر الإعدادات في لينكس، و [[sshd]] = SSH daemon: البرنامج اللي شغال على السيرفر ومستني الاتصالات (الـ [[d]] في الآخر يعني daemon، برنامج شغال في الخلفية).

جوه الملف، السطرين دول بالشكل ده في أوبونتو 24.04:

~~~text قبل
42:#PermitRootLogin prohibit-password
66:#PasswordAuthentication yes
~~~

الـ [[#]] في الأول معناها إن السطر **تعليق**، يعني متعطل، والقيمة المكتوبة هي الافتراضي بس للعلم. شيل الـ [[#]] وغيّر القيمة:

~~~text بعد
42:PermitRootLogin no
66:PasswordAuthentication no
~~~

| الإعداد | الافتراضي | بعد التعديل |
|---|---|---|
| [[PermitRootLogin]] | [[prohibit-password]]: root يدخل بمفتاح بس | [[no]]: root ميدخلش خالص |
| [[PasswordAuthentication]] | [[yes]]: أي يوزر يدخل بالباسورد | [[no]]: المفاتيح بس |

في nano: [[Ctrl+W]] للبحث عن الكلمة، وبعد التعديل [[Ctrl+O]] ثم Enter للحفظ، و [[Ctrl+X]] للخروج.

### إزاي تشوف القيم اللي SSH شايفها فعلًا

[[sshd -T]] (حرف T كابيتال) بيطبع الإعدادات النهائية بعد ما يقرا الملف وأي ملفات تانية. قبل التعديل:

~~~bash
sudo sshd -T | grep -Ei "^(permitrootlogin|passwordauthentication) "
~~~

~~~text الناتج قبل
permitrootlogin without-password
passwordauthentication yes
~~~

[[without-password]] اسم قديم لنفس [[prohibit-password]]. و [[grep -Ei]]: [[-E]] بتسمح بـ [[|]] (يعني «أو»)، و [[-i]] تتجاهل الكابيتال والسمول، و [[^]] أول السطر.

> مهم: أول الملف فيه [[Include /etc/ssh/sshd_config.d/*.conf]]، يعني أي ملف [[.conf]] في الفولدر ده بيتقري **قبل** باقي الملف، وفي SSH أول قيمة تتقري هي اللي بتكسب. بعض شركات الاستضافة بتحط ملف هناك فيه [[PasswordAuthentication yes]]. عشان كده [[sshd -T]] هو الحكم، مش اللي انت شايفه في الملف. (في الـ container ده الفولدر كان فاضي.)

---

## ٢. [[sudo sshd -t && sudo systemctl restart ssh]]

نفكّها بالترتيب:

### [[sudo sshd -t]]

[[-t]] (test، سمول) معناها «اقرا الإعدادات واتأكد إنها سليمة، ومتشغّلش حاجة». لو سليمة **مش بيطبع حاجة**. ولو فيه غلطة، جرّبنا نكتب [[PermitRootLogn]] (ناقصة i):

~~~text الناتج مع الغلطة
/etc/ssh/sshd_config: line 132: Bad configuration option: PermitRootLogn
/etc/ssh/sshd_config: terminating, 1 bad configuration options
~~~

بيقولك رقم السطر والكلمة الغلط، ورجع exit code [[255]] (يعني فشل؛ النجاح [[0]]).

### [[&&]]

الـ restart يحصل بس لو الاختبار رجع 0. ليه ده مهم؟ لأن لو SSH عمل restart بملف بايظ، مش هيقوم، ومحدش هيعرف يدخل السيرفر تاني.

### [[sudo systemctl restart ssh]]

[[systemctl]] (system control) بيتحكم في الخدمات. [[restart]] وقّف وشغّل تاني بالإعدادات الجديدة. و [[ssh]] اسم الخدمة في أوبونتو (في توزيعات تانية اسمها [[sshd]]).

اتشغّل كـ deploy في التجربة:

~~~text الناتج
rc=0
active
~~~

[[rc=0]] الأمرين نجحوا، و [[systemctl is-active ssh]] قال [[active]].

والمهم: الـ restart **مش بيقطع الاتصالات المفتوحة**. كل نافذة SSH مفتوحة ليها process لوحدها، والـ restart بيأثر على الدخول الجديد بس. عشان كده نافذة root القديمة هي طوق النجاة.

---

## ٣. الاختبار من نافذة جديدة

نفس المفتاح، تلات محاولات:

~~~bash
ssh root@IP
ssh deploy@IP
ssh -o PubkeyAuthentication=no deploy@IP
~~~

~~~text الناتج
root@127.0.0.1: Permission denied (publickey).
deploy
deploy@127.0.0.1: Permission denied (publickey).
~~~

| المحاولة | النتيجة | معناها |
|---|---|---|
| root بالمفتاح | مرفوض | قبل التعديل نفس الأمر كان بيطبع [[root]]. دلوقتي [[PermitRootLogin no]] شغال |
| deploy بالمفتاح | دخل | الدخول العادي سليم |
| deploy من غير مفتاح | مرفوض من غير ما يسأل باسورد | [[-o PubkeyAuthentication=no]] بتمنع ssh يستخدم المفتاح، فلو الباسورد مسموح كان هيسأل عليه. [[(publickey)]] معناها «الطريقة الوحيدة المسموحة هي المفتاح» |

والتأكيد الأخير:

~~~text sudo sshd -T | grep ... بعد
permitrootlogin no
passwordauthentication no
~~~

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[sudo nano /etc/ssh/sshd_config]] | تعدّل [[PermitRootLogin no]] و [[PasswordAuthentication no]] وتشيل [[#]] |
| [[sudo sshd -t]] | يختبر الملف، ساكت لو سليم |
| [[&&]] | الـ restart بس لو الاختبار نجح |
| [[sudo systemctl restart ssh]] | يطبّق، ومش بيقطع النوافذ المفتوحة |
| [[sudo sshd -T]] | القيم الفعلية بعد كل الملفات |

- [[-t]] سمول = اختبار، [[-T]] كابيتال = اطبع الإعدادات.
- السطر اللي بيبدأ بـ [[#]] ملوش أي تأثير.
- ماتقفلش نافذة root لحد ما [[ssh deploy@IP]] ينجح من نافذة جديدة.`,
          lines: ["عدّل PermitRootLogin و PasswordAuthentication لـ no.", "اختبر، ولو سليم اعمل ريستارت لـ SSH."],
          sol: R`من نافذة جديدة: [[ssh root@IP]] بيطلع [[root@IP: Permission denied (publickey).]]. و [[ssh deploy@IP]] لسه بيدخل عادي.

وتتأكد من الإعداد نفسه: [[sudo sshd -T | grep -Ei "permitrootlogin|passwordauthentication"]] بيطبع [[permitrootlogin no]] و [[passwordauthentication no]]. ولو عايز تتأكد إن الباسورد مقفول: [[ssh -o PubkeyAuthentication=no deploy@IP]] بيطلع [[Permission denied (publickey)]] من غير ما يسأل باسورد.

الغلط الشائع: root لسه بيدخل: نسيت [[systemctl restart ssh]]، أو ملف في [[/etc/ssh/sshd_config.d/]] بيعكس الإعداد. وماتقفلش نافذة root القديمة قبل ما تتأكد إن deploy بيدخل.`
        },
        {
          cmd: "خطوة 4",
          title: "الفايروول والحماية",
          desc: R`الفايروول بيقفل كل البورتات وانت بتفتح بس اللي محتاجه: SSH عشان تدخل، و 80 و 443 للموقع (http و https). الترتيب هنا هو كل حاجة: [[allow OpenSSH]] الأول وبعدين [[enable]]. لو عكست، الفايروول هيقفل SSH واتصالك نفسه، وساعتها مفيش رجوع غير من console شركة الاستضافة.

[[OpenSSH]] اسم جاهز لبورت 22، و [[80,443/tcp]] بورتين في قاعدة واحدة. [[enable]] هيحذرك إن الاتصال ممكن يتقطع، وانت فاتح SSH فاكتب y. بعدها [[fail2ban]] بيحظر أي IP بيجرّب يدخل كتير، و [[unattended-upgrades]] بيسطّب تحديثات الأمان لوحده كل يوم، والاتنين شغالين بإعداداتهم الافتراضية أول ما يتسطبوا.`,
          example: R`sudo ufw allow OpenSSH
sudo ufw allow 80,443/tcp
sudo ufw enable
sudo apt install -y fail2ban unattended-upgrades`,
          try: "[[sudo ufw status]] المفروض يوريك القواعد اللي فتحتها.",
          deep: {
            why: "الفايروول بيقفل كل حاجة غير اللي محتاجها. و fail2ban بيحظر اللي بيحاول. و unattended-upgrades بيقفل الثغرات الجديدة لوحده.",
            how: R`الترتيب مهم: [[allow OpenSSH]] قبل [[enable]]، وإلا الفايروول هيقطع اتصالك. وبعدين 80 و 443 للموقع.

و fail2ban و unattended-upgrades بيشتغلوا بإعداداتهم الافتراضية على أوبونتو أول ما يتسطبوا، وده كفاية كبداية. ولو عايز تتأكد إن unattended-upgrades مفعّل، [[sudo dpkg-reconfigure -plow unattended-upgrades]].`,
            when: "بعد ما SSH اتأمّن.",
            mistakes: "[[enable]] قبل [[allow OpenSSH]]."
          },
          teach: R`الخطوة دي ٤ أوامر: تفتح بورت SSH، تفتح بورتات الموقع، تشغّل الفايروول، وتسطّب حارسين بيشتغلوا لوحدهم. اتجرّبت على container [[ubuntu:24.04]] فيه systemd ومشغّل [[--privileged]] (عشان الفايروول محتاج يلمس قواعد الشبكة)، والـ [[ufw enable]] اتجرّب من جوه جلسة SSH حقيقية عشان يظهر سؤاله.

---

## الفكرة في سطر

[[ufw]] = Uncomplicated Firewall، واجهة سهلة فوق فايروول لينكس. أول ما يشتغل بيقفل **كل** الاتصالات الجاية من برة، ويسيب بس البورتات اللي فتحتها. البورت رقم الباب اللي البرنامج مستني عليه: SSH على 22، و HTTP على 80، و HTTPS على 443.

قبل أي حاجة:

~~~text sudo ufw status
Status: inactive
~~~

---

## ١. [[sudo ufw allow OpenSSH]]

- [[allow]] اسمح بالاتصال الجاي.
- [[OpenSSH]] مش رقم بورت، ده **اسم profile** جاهز اتسطّب مع SSH. شوف إيه اللي جواه:

~~~bash
sudo ufw app list
sudo ufw app info OpenSSH
~~~

~~~text الناتج
Available applications:
  OpenSSH
Profile: OpenSSH
Title: Secure shell server, an rshd replacement
...
Port:
  22/tcp
~~~

يعني [[allow OpenSSH]] هي نفسها [[allow 22/tcp]]. و [[tcp]] نوع الاتصال اللي SSH والمواقع بيستخدموه.

~~~text الناتج
Rules updated
Rules updated (v6)
~~~

سطرين لأن القاعدة اتضافت مرتين: لعناوين IPv4 (زي [[203.0.113.10]]) و IPv6 (العناوين الطويلة الجديدة). و «updated» مش «applied» لأن الفايروول لسه مقفول، القاعدة اتحفظت وهتتطبّق لما يشتغل.

---

## ٢. [[sudo ufw allow 80,443/tcp]]

بورتين في قاعدة واحدة: الفاصلة بينهم معناها «الاتنين». ولما تكتب أكتر من بورت لازم تحدد [[/tcp]] أو [[/udp]]. 80 للمواقع بـ http، و 443 لـ https (هتحتاجه في خطوة 8).

---

## ٣. [[sudo ufw enable]]

شغّل الفايروول دلوقتي، وكمان مع كل boot. ولأنك داخل بـ SSH، بيحذرك:

~~~text الناتج
Command may disrupt existing ssh connections. Proceed with operation (y|n)? y
Firewall is active and enabled on system startup
~~~

ممكن يقطع اتصالك لو SSH مش مسموح. انت سمحت بيه في ١، فاكتب [[y]]. الاتصال فضل شغال في التجربة.

### نقرا الجدول

~~~text sudo ufw status
Status: active

To                         Action      From
--                         ------      ----
OpenSSH                    ALLOW       Anywhere
80,443/tcp                 ALLOW       Anywhere
OpenSSH (v6)               ALLOW       Anywhere (v6)
80,443/tcp (v6)            ALLOW       Anywhere (v6)
~~~

| العمود | معناه |
|---|---|
| [[To]] | البورت على السيرفر |
| [[Action]] | [[ALLOW]] مسموح |
| [[From]] | منين: [[Anywhere]] أي IP في الدنيا |

ولو عايز تشوف القواعد الافتراضية، [[sudo ufw status verbose]]:

~~~text الناتج (أوله)
Status: active
Logging: on (low)
Default: deny (incoming), allow (outgoing), deny (routed)
~~~

[[deny (incoming)]] أي حاجة جاية ومش في الجدول تترفض. [[allow (outgoing)]] السيرفر يقدر يكلّم النت عادي (عشان apt و curl). [[deny (routed)]] مش بيعدّي اتصالات بين شبكات.

> لو عكست الترتيب و [[enable]] جه قبل [[allow OpenSSH]]، الفايروول هيقفل بورت 22 والاتصال هيقع. ساعتها مفيش طريق غير الـ console اللي في لوحة شركة الاستضافة.

---

## ٤. [[sudo apt install -y fail2ban unattended-upgrades]]

برنامجين في أمر واحد، و [[-y]] من غير سؤال. هنا اتسطّب 13 package (البرنامجين ومكتباتهم):

~~~text الناتج (مختصر)
0 upgraded, 13 newly installed, 0 to remove and 0 not upgraded.
~~~

### [[fail2ban]]

بيقرا لوجات SSH، ولو IP غلط في الدخول كذا مرة ورا بعض، بيحظره فترة. التجميعة دي في fail2ban اسمها **jail** (سجن)، وأوبونتو بيشغّل jail لـ SSH لوحده:

~~~bash
sudo fail2ban-client status
sudo fail2ban-client status sshd
~~~

~~~text الناتج
Status
|- Number of jail:	1
$__bt- Jail list:	sshd
Status for the jail: sshd
|- Filter
|  |- Currently failed:	0
|  |- Total failed:	0
|  $__bt- Journal matches:	_SYSTEMD_UNIT=sshd.service + _COMM=sshd
$__bt- Actions
   |- Currently banned:	0
   |- Total banned:	0
   $__bt- Banned IP list:
~~~

[[Currently failed]] محاولات غلط دلوقتي، و [[Currently banned]] عدد المحظورين. على VPS حقيقي مفتوح للنت هتلاقي الأرقام دي بتزيد في ساعات، من بوتات بتجرّب.

### [[unattended-upgrades]]

بيسطّب تحديثات الأمان لوحده كل يوم. الإعداد اللي بيشغّله:

~~~text cat /etc/apt/apt.conf.d/20auto-upgrades
APT::Periodic::Update-Package-Lists "1";
APT::Periodic::Unattended-Upgrade "1";
~~~

[[1]] يعني كل يوم: الأول يجيب الكتالوج، والتاني يسطّب التحديثات. الأمان بس افتراضيًا، فمش هيكسر تطبيقك بتحديث كبير.

> في الـ container الخدمتين متسطّبوش شغالين، لأن image أوبونتو الخاصة بـ Docker فيها ملف [[/usr/sbin/policy-rc.d]] بيمنع أي خدمة تقوم وقت التسطيب، فشغّلناهم بـ [[systemctl start]]. على VPS حقيقي بيقوموا لوحدهم. اتأكد بـ [[systemctl is-active fail2ban]]، لازم يقول [[active]].

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[ufw allow OpenSSH]] | يفتح 22/tcp (الـ profile اسمه OpenSSH) |
| [[ufw allow 80,443/tcp]] | يفتح http و https |
| [[ufw enable]] | يشغّل الفايروول دلوقتي ومع كل boot، وكل اللي مش مسموح يترفض |
| [[apt install -y fail2ban unattended-upgrades]] | حظر تلقائي لمحاولات الدخول، وتحديثات أمان يومية |

- الترتيب: allow SSH الأول، enable بعده.
- [[ufw status]] لازم يقول [[active]] وفيه 4 سطور بالظبط.
- Docker بيفتح البورتات بتاعته من غير ما يعدّي على ufw، وده سبب [[127.0.0.1:3000:3000]] في خطوة 6.`,
          lines: ["اسمح بـ SSH الأول.", "اسمح بالمواقع.", "شغّل الفايروول.", "سطّب الحظر التلقائي والتحديثات التلقائية."],
          sol: R`[[sudo ufw status]] بيطبع [[Status: active]] وتحته جدول [[To Action From]] فيه [[OpenSSH ALLOW Anywhere]] و [[80,443/tcp ALLOW Anywhere]]، ونفسهم [[(v6)]]. مفيش أي بورت تاني.

و [[sudo systemctl status fail2ban]] بيقول [[active (running)]]، و [[sudo fail2ban-client status]] بيوري [[Jail list: sshd]].

الغلط الشائع: [[Status: inactive]]: نسيت [[ufw enable]] (بيسألك [[Proceed with operation (y|n)?]]). ولو الـ SSH اتقطع بعد enable، نسيت [[allow OpenSSH]] أو SSH على بورت غير 22؛ ادخل من console المزود و [[ufw allow البورت/tcp]].`
        },
        {
          cmd: "خطوة 5",
          title: "Docker",
          desc: R`Docker هيشغّل تطبيقك وقاعدة بياناتك بنفس الشكل اللي على جهازك. [[curl -fsSL https://get.docker.com | sh]] بينزّل سكربت التسطيب الرسمي من Docker ويشغّله بـ [[sh]]، وده بيسطّب Docker و Compose. فلاجات curl: [[-f]] افشل لو السيرفر رد بـ error، و [[-sS]] اسكت إلا الأخطاء، و [[-L]] اتبع التحويلات. لو حابب تشوف السكربت قبل ما يشتغل، نزّله في ملف واقراه الأول.

[[usermod -aG docker deploy]] بيضيف deploy لجروب docker عشان يستخدمه من غير sudo. خد بالك إن الجروب ده عمليًا بيدّي صلاحيات root، فمتضيفش له غير اليوزر اللي بيدير السيرفر. والجروبات الجديدة مش بتتطبق على الجلسة المفتوحة، عشان كده [[exit]] جزء من الخطوة: اخرج وادخل تاني، وبعدين [[docker run --rm hello-world]].`,
          example: R`curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker deploy
exit`,
          try: "ادخل تاني وشغّل [[docker run --rm hello-world]] من غير sudo.",
          deep: {
            why: "Docker هيشغّل تطبيقك وقاعدة بياناتك بنفس الإعدادات اللي عندك على جهازك.",
            how: R`السكربت الرسمي بيسطّب كل حاجة. وإضافة deploy لجروب docker عشان يستخدمه من غير sudo.

و [[exit]] في الآخر مش غلطة، هي جزء من الخطوة: الجروبات الجديدة مش بتتطبق على الجلسة المفتوحة. لازم تخرج وتدخل تاني، وبعدين [[docker run --rm hello-world]] يتأكد إن كله تمام.`,
            when: "بعد الحماية الأساسية.",
            mistakes: "تجرّب Docker قبل ما تخرج وتدخل، فيقولك permission denied."
          },
          teach: R`الخطوة دي بتسطّب Docker بسكربت Docker الرسمي، وبتسمح لـ deploy يستخدمه من غير sudo، وبعدين تخرج عشان التغيير يتطبّق. اتجرّبت على container [[ubuntu:24.04]] فيه systemd ومشغّل [[--privileged]] (يعني Docker جوه Docker)، والدخول كـ deploy كان بـ ssh حقيقي.

---

## ١. [[curl -fsSL https://get.docker.com | sh]]

سطر فيه أمرين متوصلين بـ [[|]] (pipe): ناتج الأول بيدخل للتاني.

### الأمر الأول: [[curl -fsSL https://get.docker.com]]

[[curl]] بيجيب محتوى رابط ويطبعه. الرابط ده بيرجع **سكربت shell** (حوالي 800 سطر). الفلاجات متجمعة، ونفكّها:

| الفلاج | معناه |
|---|---|
| [[-f]] | fail: لو السيرفر رد بخطأ (زي 404)، افشل ومتطبعش صفحة الخطأ (عشان [[sh]] ميشغّلش صفحة HTML) |
| [[-s]] | silent: من غير شريط التحميل |
| [[-S]] | show-error: بس لو حصل خطأ اطبعه (عكس [[-s]] في حالة الخطأ بس) |
| [[-L]] | location: لو الرابط بيحوّل لرابط تاني، روح وراه |

### [[| sh]]

[[sh]] هو الـ shell. بياخد السكربت من الـ pipe وينفّذه سطر سطر. ولأنك root، السكربت بيعمل كل حاجة من غير sudo.

### السكربت عمل إيه؟

أول الناتج بيوريك هو بينفّذ إيه بالظبط (كل سطر بادئ بـ [[+]]):

~~~text الناتج (مختصر)
# Executing docker install script, commit: 2b32480025b223ebfddae9a3a8bef09027680f53
+ sh -c apt-get -qq update >/dev/null
+ sh -c DEBIAN_FRONTEND=noninteractive apt-get -y -qq install ca-certificates curl >/dev/null
+ sh -c curl -fsSL "https://download.docker.com/linux/ubuntu/gpg" -o /etc/apt/keyrings/docker.asc
+ sh -c echo "deb [arch=amd64 signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu noble stable" > /etc/apt/sources.list.d/docker.list
+ sh -c apt-get -qq update >/dev/null
+ sh -c DEBIAN_FRONTEND=noninteractive apt-get -y -qq install docker-ce docker-ce-cli containerd.io docker-compose-plugin docker-ce-rootless-extras docker-buildx-plugin docker-model-plugin >/dev/null
+ sh -c systemctl enable --now docker.service 2>/dev/null
INFO: Docker daemon enabled and started
~~~

يعني بالترتيب:

1. حدّث كتالوج apt.
2. نزّل **مفتاح** Docker ([[docker.asc]]) عشان apt يتأكد إن البرامج جاية من Docker فعلًا.
3. ضيف مخزن Docker لـ apt ([[docker.list]]). [[noble]] أوبونتو 24.04، و [[stable]] النسخ الثابتة.
4. سطّب [[docker-ce]] (المحرك نفسه، ce = Community Edition) و [[docker-compose-plugin]] (أمر [[docker compose]]) وباقي الأدوات.
5. [[systemctl enable --now docker]]: شغّل Docker دلوقتي، ومع كل boot.

وفي الآخر بيطبع نسخة Docker ([[Version: 29.8.2]] في التجربة دي، نسختك هتبقى الأحدث وقتها) وتحذير مهم:

~~~text الناتج (آخره)
WARNING: Access to the remote API on a privileged Docker daemon is equivalent
         to root access on the host.
~~~

ده بيوصلنا للأمر الجاي.

> عايز تقرا السكربت قبل ما يشتغل؟ نزّله في ملف: [[curl -fsSL https://get.docker.com -o get-docker.sh]]، و [[less get-docker.sh]]، وبعدين [[sh get-docker.sh]]. [[-o]] (output) احفظ في ملف بدل ما تطبع.

---

## ٢. [[sudo usermod -aG docker deploy]]

نفس أمر خطوة 2 بالظبط، بس الجروب [[docker]]. ليه الجروب ده؟ بص على الـ socket اللي Docker بيسمع عليه:

~~~text ls -l /var/run/docker.sock
srw-rw---- 1 root docker 0 Oct  6 14:44 /var/run/docker.sock
~~~

- [[s]] في الأول: ده **socket**، يعني باب تكلّم منه برنامج شغال (مش ملف عادي).
- [[rw-rw----]]: صاحبه (root) والجروب ([[docker]]) يقروا ويكتبوا، والباقي ولا حاجة.

فأي حد في جروب docker يقدر يكلّم Docker. وبما إن Docker يقدر يشغّل container شايل أي فولدر من السيرفر، ده عمليًا صلاحية root. عشان كده deploy بس.

---

## ٣. [[exit]]: ليه لازم؟

جروبات اليوزر بتتحدد **لحظة الدخول**، والجلسة المفتوحة بتفضل بالقايمة القديمة. جرّبناها في جلسة SSH واحدة كـ deploy:

~~~bash
sudo usermod -aG docker deploy
id -nG deploy
id -nG
docker ps
~~~

~~~text الناتج
deploy sudo users docker
deploy sudo users
permission denied while trying to connect to the docker API at unix:///var/run/docker.sock
~~~

- [[id -nG deploy]] (من الملفات): deploy في docker.
- [[id -nG]] (الجلسة الحالية): لسه مش فيه. [[-n]] أسامي بدل أرقام، و [[-G]] كل الجروبات.
- فـ [[docker ps]] اترفض.

[[exit]] وادخل تاني بـ [[ssh deploy@IP]]:

~~~text الناتج في الجلسة الجديدة
deploy sudo users docker
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
~~~

الجروب ظهر، و [[docker ps]] رجع جدول فاضي (مفيش containers شغالة)، يعني اشتغل.

---

## ٤. التمرين: [[docker run --rm hello-world]]

- [[run]] اعمل container من image وشغّله.
- [[--rm]] امسح الـ container لما يخلص.
- [[hello-world]] image صغيرة من Docker بتطبع رسالة وتخرج.

~~~text الناتج (مختصر)
Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
...
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.
~~~

أول سطر: الـ image مش موجودة، فنزّلها من Docker Hub. [[latest]] اسم النسخة لما متحددش. وبعدين الرسالة: كل حاجة شغالة.

و [[docker compose version]]:

~~~text الناتج
Docker Compose version v5.6.0
~~~

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[curl -fsSL https://get.docker.com | sh]] | ينزّل سكربت Docker الرسمي ويشغّله: مخزن apt + تسطيب + تشغيل مع الـ boot |
| [[sudo usermod -aG docker deploy]] | يسمح لـ deploy يستخدم Docker من غير sudo |
| [[exit]] ثم ssh تاني | الجروب الجديد يتطبّق |
| [[docker run --rm hello-world]] | الاختبار |

- جروب docker = صلاحية root، متضيفش له غير اللي بيدير السيرفر.
- [[permission denied ... docker.sock]] بعد الـ usermod معناها إنك لسه في الجلسة القديمة.
- [[Cannot connect to the Docker daemon ... Is the docker daemon running?]] (جرّبناها بوقف الخدمة) معناها إن Docker واقف: [[sudo systemctl enable --now docker]].`,
          lines: ["سطّب Docker.", "اسمح لـ deploy يستخدمه من غير sudo.", "اخرج، وادخل تاني عشان الجروب يتطبق."],
          sol: R`بعد [[exit]] والدخول تاني، [[docker run --rm hello-world]] من غير sudo بيطبع [[Hello from Docker!]] و [[This message shows that your installation appears to be working correctly.]].

و [[groups]] بيوري [[deploy sudo users docker]]، و [[docker compose version]] بيطبع نسخة Compose (بيتسطب مع السكربت الرسمي).

الغلط الشائع: [[permission denied while trying to connect to the docker API at unix:///var/run/docker.sock]] (النسخ الأقدم بتقول [[... the Docker daemon socket ...]]): ماعملتش exit ودخلت تاني بعد الـ usermod. و [[Cannot connect to the Docker daemon ... Is the docker daemon running?]]: الخدمة واقفة، [[sudo systemctl enable --now docker]].`
        },
        {
          cmd: "خطوة 6",
          title: "شغّل التطبيق",
          desc: "استخدم أي repo عندك فيه docker-compose.yml، والبورت فيه مكتوب [[127.0.0.1:3000:3000]]، وكل خدمة فيها [[restart: unless-stopped]]، وإلا مش هتقوم لوحدها بعد الـ reboot في خطوة 8.",
          example: R`sudo mkdir -p /var/www/myapp
sudo chown deploy:deploy /var/www/myapp
git clone https://github.com/USER/REPO.git /var/www/myapp
cd /var/www/myapp
docker compose up -d --build
curl -I http://127.0.0.1:3000`,
          try: "لازم الـ curl يرجع 200 قبل ما تكمّل.",
          deep: {
            why: "دلوقتي التطبيق نفسه: تنزّل الكود وتشغّله.",
            how: R`[[/var/www]] المكان المتعارف عليه لملفات المواقع. وبما إنه ملك root، بتعمل الفولدر بـ sudo، وبعدين [[chown]] تديه لـ deploy عشان يقدر يشتغل فيه من غير sudo.

و [[git clone]] بعدها مباشرة في الفولدر. لو الـ repo خاص، هتحتاج deploy key (في تاب Git). وبعدين [[docker compose up -d --build]].

والبورت في compose لازم [[127.0.0.1:3000:3000]]، عشان التطبيق ميبقاش مكشوف للنت مباشرة من غير Nginx (وفاكر إن Docker بيعدّي من ufw).

و [[curl -I http://127.0.0.1:3000]] بيتأكد من جوه السيرفر إن التطبيق شغال ورد. لو مردّش، [[docker compose logs]] وصلّح قبل ما تكمّل. مفيش فايدة تظبط Nginx لتطبيق مش شغال.`,
            when: "بعد Docker.",
            mistakes: "كتابة البورت [[3000:3000]] من غير 127.0.0.1. وتكمّل للخطوة ٧ والـ curl فاشل."
          },
          teach: R`الخطوة دي بتعمل فولدر للمشروع، تنزّل فيه الكود من git، وتشغّله بـ Docker Compose، وتتأكد إنه بيرد. اتجرّبت كـ deploy (داخل بـ ssh) على container [[ubuntu:24.04]] فيه Docker. ومفيش repo على GitHub هنا، فعملنا repo صغير على نفس الجهاز فيه تطبيق Node بيرد [[Hello from myapp]]، وكلّوناه من مساره بدل رابط GitHub. باقي الأوامر زي ما هي.

---

## ١. [[sudo mkdir -p /var/www/myapp]]

[[/var/www]] المكان المتعارف عليه لملفات المواقع في لينكس. على أوبونتو جديد **مش موجود أصلًا** (Nginx هو اللي بيعمله لما يتسطّب)، ولو جرّبت من غير [[sudo]] ومن غير [[-p]]:

~~~text mkdir /var/www/myapp
mkdir: cannot create directory ‘/var/www/myapp’: No such file or directory
~~~

- [[mkdir]] = make directory.
- [[-p]] (parents) اعمل أي فولدر ناقص في الطريق ([[/var/www]] ثم [[myapp]])، ومتشتكيش لو موجود.
- [[sudo]] لأن [[/var]] ملك root.

~~~text ls -ld /var/www/myapp
drwxr-xr-x 2 root root 4096 Oct  6 14:46 /var/www/myapp
~~~

[[ls -ld]]: [[-l]] تفاصيل، و [[-d]] الفولدر نفسه مش اللي جواه. الصاحب [[root root]]، يعني deploy ميقدرش يكتب فيه.

---

## ٢. [[sudo chown deploy:deploy /var/www/myapp]]

[[chown]] = change owner. الشكل [[user:group]]، يعني الصاحب deploy والجروب deploy.

~~~text ls -ld /var/www/myapp بعدها
drwxr-xr-x 2 deploy deploy 4096 Oct  6 14:46 /var/www/myapp
~~~

من هنا ورايح كل الشغل جوه الفولدر ده من غير sudo، وكل الملفات اللي git و Docker هيعملوها هتبقى ملك deploy.

---

## ٣. [[git clone https://github.com/USER/REPO.git /var/www/myapp]]

- [[git clone]] انسخ repo بكل تاريخه.
- [[https://github.com/USER/REPO.git]] رابط الـ repo. [[USER]] و [[REPO]] أماكن تحط فيها اسمك واسم المشروع.
- [[/var/www/myapp]] المكان. لو اديته مكان، git بيحط الملفات فيه مباشرة بدل ما يعمل فولدر باسم الـ repo. والفولدر لازم يكون فاضي، وهو فاضي.

لو كتبت الرابط زي ما هو من غير ما تغيّره (أو الـ repo خاص)، GitHub بيطلب يوزر وباسورد، ومن غير ترمنال تفاعلي:

~~~text الناتج
Cloning into '/tmp/x'...
fatal: could not read Username for 'https://github.com': No such device or address
~~~

ده معناه «الـ repo مش متاح من غير تسجيل دخول». الحل لـ repo خاص: deploy key (في تاب Git).

مع الـ repo التجريبي:

~~~text الناتج
Cloning into '/var/www/myapp'...
done.
~~~

---

## ٤. [[cd /var/www/myapp]]

[[cd]] = change directory. ادخل الفولدر، لأن [[docker compose]] بيدوّر على [[docker-compose.yml]] في الفولدر اللي انت فيه.

~~~text ls -a
.
..
.git
Dockerfile
docker-compose.yml
server.js
~~~

[[.git]] فيه تاريخ الـ repo، و [[Dockerfile]] وصفة بناء الـ image، و [[docker-compose.yml]] بيقول تتشغّل إزاي. الملف ده هو اللي في التجربة:

~~~text docker-compose.yml
services:
  web:
    build: .
    ports:
      - "127.0.0.1:3000:3000"
    restart: unless-stopped
~~~

| السطر | معناه |
|---|---|
| [[web:]] | اسم الخدمة |
| [[build: .]] | ابني الـ image من الـ Dockerfile اللي في الفولدر ده ([[.]] = هنا) |
| [[127.0.0.1:3000:3000]] | بورت 3000 على السيرفر، بس على [[127.0.0.1]] (السيرفر نفسه)، يوصّل لبورت 3000 جوه الـ container |
| [[restart: unless-stopped]] | لو وقع أو السيرفر عمل reboot، يقوم تاني، إلا لو انت اللي وقّفته |

### ليه [[127.0.0.1]] مش مجرد [[3000:3000]]؟

لأن Docker بيفتح البورتات بقواعد خاصة بيه **قبل** ufw. جرّبناها: الفايروول مفتوح فيه 22 و 80 و 443 بس، وشغّلنا نسخة تانية من التطبيق على [[-p 3001:3000]] (من غير 127.0.0.1)، ومن جهاز تاني على نفس الشبكة:

~~~text الناتج (ملخص التجربتين)
curl http://172.17.0.3:3001   →   Hello from myapp
curl http://172.17.0.3:3000   →   timeout (exit 28)
~~~

بورت 3001 مش في ufw خالص ورد على أي حد، و 3000 (اللي على 127.0.0.1) مردّش من برة. على VPS حقيقي ده معناه إن تطبيقك يبقى مكشوف للنت كله من غير Nginx ومن غير HTTPS.

---

## ٥. [[docker compose up -d --build]]

- [[up]] اعمل كل حاجة في الملف وشغّلها.
- [[-d]] (detached) في الخلفية، وارجعلي الترمنال.
- [[--build]] ابني الـ image من جديد قبل التشغيل (مهم بعد كل [[git pull]]، وإلا هيشغّل النسخة القديمة).

~~~text الناتج (آخره)
 Image myapp-web Built
 Network myapp_default Created
 Container myapp-web-1 Created
 Container myapp-web-1 Started
~~~

الأسامي متعملة من اسم الفولدر ([[myapp]]) واسم الخدمة ([[web]]): الـ image [[myapp-web]]، وشبكة [[myapp_default]] للخدمات تكلّم بعض، والـ container [[myapp-web-1]] (الـ 1 رقم النسخة).

---

## ٦. [[curl -I http://127.0.0.1:3000]]

[[-I]] (حرف i كابيتال، head) هات الـ headers بس من غير محتوى الصفحة. وبنكلّم [[127.0.0.1]] لأن ده الوحيد اللي التطبيق سامع عليه:

~~~text الناتج
HTTP/1.1 200 OK
Content-Type: text/plain
Date: Tue, 06 Oct 2026 11:47:03 GMT
Connection: keep-alive
Keep-Alive: timeout=5
~~~

[[200 OK]] يعني التطبيق رد صح. و [[curl -s http://127.0.0.1:3000]] من غير [[-I]] بيجيب المحتوى: [[Hello from myapp]]. و [[docker compose ps]]:

~~~text الناتج
NAME          IMAGE       COMMAND                  SERVICE   CREATED         STATUS         PORTS
myapp-web-1   myapp-web   "docker-entrypoint.s…"   web       4 seconds ago   Up 2 seconds   127.0.0.1:3000->3000/tcp
~~~

[[Up]] شغال، و [[PORTS]] بيأكد إنه على 127.0.0.1 بس.

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[sudo mkdir -p /var/www/myapp]] | يعمل الفولدر و [[/var/www]] لو مش موجود |
| [[sudo chown deploy:deploy /var/www/myapp]] | يديه لـ deploy |
| [[git clone ... /var/www/myapp]] | ينزّل الكود جواه |
| [[cd /var/www/myapp]] | عشان compose يلاقي ملفه |
| [[docker compose up -d --build]] | يبني ويشغّل في الخلفية |
| [[curl -I http://127.0.0.1:3000]] | لازم [[200]] قبل Nginx |

- البورت في compose [[127.0.0.1:3000:3000]]، لأن Docker بيعدّي من ufw.
- [[restart: unless-stopped]] على كل خدمة، وإلا خطوة 8 هتفشل.
- لو الـ curl مش 200: [[docker compose logs --tail 50]].`,
          lines: [
            "اعمل فولدر المشروع.",
            "خلّي deploy صاحبه.",
            "نزّل الكود جواه.",
            "ادخل الفولدر.",
            "ابني وشغّل.",
            "اتأكد إن التطبيق بيرد من جوه السيرفر."
          ],
          sol: R`[[curl -I http://127.0.0.1:3000]] المفروض أول سطر [[HTTP/1.1 200 OK]] وبعده headers التطبيق (زي [[X-Powered-By: Express]] أو [[Content-Type]]). و [[docker compose ps]] بيوري كل الخدمات [[Up]] (و [[healthy]] لو فيه healthcheck).

لو مش 200، ماتكمّلش على Nginx: المشكلة في التطبيق، ومش هتتحل بالدومين.

الأغلاط الشائعة: [[Connection refused]]: التطبيق لسه بيقوم أو وقع؛ [[docker compose logs --tail 50]]. و [[Empty reply from server]] أو [[Connection reset]]: التطبيق سامع على 127.0.0.1 جوه الـ container بدل 0.0.0.0. و [[404]] على [[/]]: التطبيق API مفيهوش route للـ root، جرّب [[/health]]. و [[git clone]] يطلب باسورد لـ repo خاص: استخدم deploy key أو token.`
        },
        {
          cmd: "خطوة 7",
          title: "Nginx والدومين",
          desc: R`دلوقتي التطبيق شغال على [[127.0.0.1:3000]] جوه السيرفر بس، و Nginx هو اللي هيستقبل الزوار على بورت 80 ويوصّلهم له (reverse proxy). الأوامر كلها اتشرحت في قسم Nginx: [[apt install]] تسطيب، وملف الموقع في [[sites-available]] (استخدم الملف اللي في القسم ده وغيّر الدومين)، و [[ln -s]] يعمل اختصار له في [[sites-enabled]] فيتفعّل، و [[rm]] يشيل الموقع الافتراضي عشان صفحة Welcome to nginx متظهرش بدل موقعك.

[[nginx -t]] بيختبر الإعدادات، و [[&&]] بتعمل [[reload]] بس لو الاختبار نجح، و reload بيطبّق من غير ما يقطع الزوار. [[dig +short]] في الآخر بيتأكد إن الدومين بيشاور على IP السيرفر ده؛ لو لأ، حط سجل A في لوحة تحكم الدومين واستنى، لأن الخطوة الجاية (SSL) مش هتنجح من غيره.`,
          example: R`sudo apt install -y nginx
sudo nano /etc/nginx/sites-available/myapp
sudo ln -s /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
dig +short example.com`,
          try: "افتح الدومين من المتصفح بـ http.",
          deep: {
            why: "التطبيق شغال جوه السيرفر، دلوقتي محتاج Nginx يوصّل الزوار له من الدومين.",
            how: R`كل الأوامر اتشرحت في قسم Nginx: تسطيب، وملف الموقع، واختصار في sites-enabled، وتشيل default، واختبار وreload.

و [[dig +short example.com]] في الآخر مهمة للخطوة الجاية: لو مطلّعش IP السيرفر ده، الـ DNS لسه مش جاهز. وقتها روح لوحة تحكم الدومين وحط سجل [[A]] بـ IP السيرفر، واستنى.

والاختبار: افتح [[http://example.com]] (http مش https لسه) من المتصفح.`,
            when: "بعد ما التطبيق اشتغل من جوه السيرفر.",
            mistakes: "تنسى تشيل default، فالدومين يفتح صفحة Nginx الترحيبية بدل موقعك."
          },
          teach: R`الخطوة دي بتسطّب Nginx، تكتبله ملف موقعك، تفعّله، تشيل الموقع التجريبي، تختبر وتطبّق، وفي الآخر تتأكد إن الدومين بيشاور على السيرفر. اتجرّبت كـ deploy على container [[ubuntu:24.04]] فيه التطبيق من خطوة 6 شغال على [[127.0.0.1:3000]]. ومفيش دومين حقيقي، فاستخدمنا [[example.com]] وبعتنا اسمه في الطلب بـ [[curl -H "Host: ..."]] (هنشرحها).

---

## ١. [[sudo apt install -y nginx]]

~~~text الناتج (مختصر)
0 upgraded, 8 newly installed, 0 to remove and 0 not upgraded.
~~~

Nginx بيشتغل لوحده أول ما يتسطّب ([[systemctl is-active nginx]] قال [[active]])، وبيجي بموقع تجريبي:

~~~text ls -l /etc/nginx/sites-enabled/
lrwxrwxrwx 1 root root 34 Oct  6 14:51 default -> /etc/nginx/sites-available/default
~~~

و [[curl -s http://127.0.0.1]] بيرجع صفحة عنوانها [[Welcome to nginx!]].

---

## ٢. [[sudo nano /etc/nginx/sites-available/myapp]]

Nginx بيقسم المواقع على فولدرين:

| الفولدر | فيه إيه |
|---|---|
| [[sites-available]] | كل ملفات المواقع، شغالة أو لأ. ده المكان اللي بتكتب فيه |
| [[sites-enabled]] | اختصارات للمواقع الشغالة بس. Nginx بيقرا ده |

ملف [[myapp]] ده هو الملف اللي في قسم Nginx (درس [[/etc/nginx/sites-available/myapp]]، وفيه شرح كل سطر)، بالدومين بتاعك مكان [[example.com]]. أهم سطرين فيه:

~~~text من الملف
    server_name example.com www.example.com;
        proxy_pass http://127.0.0.1:3000;
~~~

[[server_name]]: الموقع ده للطلبات اللي جاية على الدومين ده. و [[proxy_pass]]: وصّلها للتطبيق على 3000.

---

## ٣. [[sudo ln -s /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled/]]

- [[ln]] = link، و [[-s]] = symbolic: اختصار بيشاور على الملف الأصلي (زي Shortcut في ويندوز).
- الأول الملف الأصلي، وبعده المكان اللي الاختصار يتعمل فيه. ومع [[/]] في الآخر، الاختصار بياخد نفس الاسم.

~~~text ls -l /etc/nginx/sites-enabled/
lrwxrwxrwx 1 root root 34 Oct  6 14:51 default -> /etc/nginx/sites-available/default
lrwxrwxrwx 1 root root 32 Oct  6 14:51 myapp -> /etc/nginx/sites-available/myapp
~~~

[[l]] في أول السطر = link، والسهم [[->]] بيوريك بيشاور على إيه. ميزة الاختصار: بتعدّل في [[sites-available]] بس، ولو عايز توقف الموقع تمسح الاختصار والملف يفضل.

ولو عملته مرتين:

~~~text الناتج
ln: failed to create symbolic link '/etc/nginx/sites-enabled/myapp': File exists
~~~

يعني موجود أصلًا، مفيش مشكلة.

---

## ٤. [[sudo rm /etc/nginx/sites-enabled/default]]

[[rm]] = remove. بنمسح **الاختصار** بس، والأصل في [[sites-available/default]] باقي. ليه؟ موقع default معمول إنه يرد على أي طلب ملوش موقع، ولحد ما نطبّق التعديل، Nginx لسه بيرد بـ [[Welcome to nginx!]].

~~~text ls -l /etc/nginx/sites-enabled/ بعدها
lrwxrwxrwx 1 root root 32 Oct  6 14:51 myapp -> /etc/nginx/sites-available/myapp
~~~

---

## ٥. [[sudo nginx -t && sudo systemctl reload nginx]]

### [[sudo nginx -t]]

[[-t]] (test): اقرا كل الإعدادات واتأكد إنها سليمة، ومتغيّرش حاجة.

~~~text الناتج
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
~~~

بيقول [[nginx.conf]] مش [[myapp]] لأن [[nginx.conf]] هو الملف الرئيسي، وهو اللي بيقرا كل اللي في [[sites-enabled]].

### [[&&]] ثم [[sudo systemctl reload nginx]]

[[reload]] بيقرا الإعدادات الجديدة **من غير ما يقفل** الاتصالات المفتوحة، عكس [[restart]]. و [[&&]] عشان ملف بايظ ميوصلش لـ Nginx أصلًا.

> الـ reload بياخد جزء من الثانية لحد ما يطبّق. في التجربة، [[curl]] اتبعت في نفس اللحظة لسه رجع الصفحة القديمة، وبعدها بثانية رجع الجديدة.

### الاختبار من جوه السيرفر

~~~bash
curl -s -H "Host: example.com" http://127.0.0.1
curl -sI -H "Host: example.com" http://127.0.0.1
~~~

[[-H]] (header) بيضيف سطر للطلب. المتصفح لما تفتح [[http://example.com]] بيبعت [[Host: example.com]]، وده اللي Nginx بيقارنه بـ [[server_name]]. فإحنا بنقلّد المتصفح من غير DNS:

~~~text الناتج
Hello from myapp
HTTP/1.1 200 OK
Server: nginx/1.24.0 (Ubuntu)
~~~

الطلب دخل Nginx على 80 ([[Server: nginx/1.24.0]])، وراح للتطبيق ورجع رده.

ولو التطبيق واقف ([[docker compose stop]] في التجربة):

~~~text الناتج
HTTP/1.1 502 Bad Gateway
~~~

[[502]] معناها «Nginx شغال، بس اللي وراه مردّش». ولما رجعنا التطبيق ([[docker compose start]]) رجع [[200 OK]].

---

## ٦. [[dig +short example.com]]

[[dig]] بيسأل الـ DNS: الدومين ده على أنهي IP؟ (في package اسمها [[dnsutils]]، لو مش موجود: [[sudo apt install dnsutils]].) و [[+short]] بيطبع الجواب بس.

~~~text الناتج (أول جزئين من كل IP)
172.66.xxx.xxx
104.20.xxx.xxx
~~~

[[example.com]] الحقيقي عنده IP اتنين. من غير [[+short]]:

~~~text dig example.com (جزء الجواب)
;; ANSWER SECTION:
example.com.		298	IN	A	172.66.xxx.xxx
example.com.		298	IN	A	104.20.xxx.xxx
~~~

| العمود | معناه |
|---|---|
| [[example.com.]] | الدومين (النقطة في الآخر طبيعية) |
| [[298]] | TTL بالثواني: الجواب ده هيتحفظ قد إيه قبل ما يتسأل تاني. عشان كده تغيير الـ DNS بياخد وقت |
| [[IN]] | Internet |
| [[A]] | نوع السجل: دومين ← IPv4 |
| آخر عمود | الـ IP |

على دومينك لازم يطلع **IP السيرفر بتاعك بس**. ولو مطلّعش ولا سطر (جرّبناه على دومين مش موجود: مطبعش حاجة، ومن غير رسالة خطأ)، يبقى مفيش سجل A لسه.

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[sudo apt install -y nginx]] | Nginx شغال بموقع تجريبي |
| [[sudo nano /etc/nginx/sites-available/myapp]] | ملف موقعك: [[server_name]] و [[proxy_pass]] |
| [[sudo ln -s ... /etc/nginx/sites-enabled/]] | تفعيله باختصار |
| [[sudo rm /etc/nginx/sites-enabled/default]] | يشيل اختصار Welcome to nginx |
| [[sudo nginx -t && sudo systemctl reload nginx]] | اختبار، وبعدين تطبيق من غير قطع |
| [[dig +short example.com]] | لازم يطلع IP السيرفر قبل خطوة SSL |

- [[curl -H "Host: example.com" http://127.0.0.1]] بيختبر الموقع قبل ما الـ DNS يجهز.
- [[502 Bad Gateway]] = التطبيق اللي ورا Nginx واقف.
- [[Welcome to nginx!]] بعد التعديل = default لسه موجود أو نسيت reload.`,
          lines: [
            "سطّب Nginx.",
            "اكتب ملف الموقع.",
            "فعّله.",
            "شيل الموقع التجريبي.",
            "اختبر وطبّق.",
            "اتأكد إن الدومين بيشاور على السيرفر."
          ],
          sol: R`[[dig +short example.com]] لازم يطبع IP السيرفر بالظبط. وفتح [[http://example.com]] من المتصفح بيوري التطبيق (مكتوب جنبه «Not secure» لأنه http، وده طبيعي لحد الخطوة الجاية).

وقبلها [[sudo nginx -t]] بيقول [[syntax is ok]] و [[test is successful]]، و [[curl -H "Host: example.com" http://127.0.0.1]] على السيرفر بيرجع رد التطبيق.

الأغلاط الشائعة: [[dig]] مابيطبعش حاجة أو IP قديم: الـ DNS لسه ماتنشرش (استنى) أو الـ A record غلط. و [[502 Bad Gateway]]: التطبيق مش على 3000 أو واقف. وصفحة [[Welcome to nginx]]: الـ default لسه متفعّل أو [[server_name]] غلط. والصفحة مش بتفتح خالص: بورت 80 مقفول في ufw.`
        },
        {
          cmd: "خطوة 8",
          title: "SSL وباك أب أوتوماتيك",
          desc: R`آخر خطوتين: HTTPS، وباك أب بيحصل لوحده. [[certbot]] بياخد شهادة SSL مجانية من Let's Encrypt، و [[--nginx]] معناها عدّل إعدادات Nginx لوحدك، و [[-d]] قبل كل دومين عايز الشهادة تغطيه. محتاج الـ DNS يكون جاهز من الخطوة اللي فاتت، وبيجدد الشهادة لوحده بعد كده.

الباك أب: [[backup.sh]] من تاب bash (قسم «سكربت محترم») تلزقه في [[~/backup.sh]]، و [[chmod +x]] تدّيه صلاحية التشغيل، وبعدين [[crontab -e]] وسطر زي [[0 3 * * * /home/deploy/backup.sh /var/www/myapp >> /home/deploy/backup.log 2>&1]]: الخانات الخمسة معناها كل يوم 3:00 الفجر، والمسارات كاملة، والناتج والأخطاء في ملف لوج.

والاختبار الأخير: [[sudo reboot]]، ولو الموقع رجع لوحده بـ https، يبقى كل حاجة اتعملت صح.`,
          example: R`sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d example.com -d www.example.com
nano ~/backup.sh
chmod +x ~/backup.sh
crontab -e`,
          try: "ضيف سطر باك أب يومي الساعة 3 الفجر، واعمل reboot، واتأكد إن الموقع رجع لوحده بـ HTTPS.",
          deep: {
            why: "آخر خطوتين عشان السيرفر يبقى جاهز للإنتاج: HTTPS، وباك أب بيحصل لوحده.",
            how: R`certbot بياخد الشهادة ويعدّل Nginx لوحده، بس محتاج الـ DNS جاهز من الخطوة اللي فاتت.

وبعدين [[backup.sh]] من تاب bash: تلزقه في ملف، و [[chmod +x]] تخليه ينفع يتشغّل، وتحطه في [[crontab -e]] بسطر زي [[0 3 * * * /home/deploy/backup.sh /var/www/myapp >> /home/deploy/backup.log 2>&1]].

والاختبار الأخير والأهم: [[sudo reboot]]. استنى دقيقة، وافتح الموقع بـ https. لو فتح لوحده، يبقى كل حاجة معمولة صح (Docker و Nginx بيقوموا لوحدهم، والشهادة سليمة). لو مفتحش، اعرف مين مقامش بـ [[systemctl --failed]] و [[docker ps -a]].`,
            when: "آخر حاجة.",
            mistakes: "إنك متجرّبش الـ reboot، وتكتشف المشاكل يوم ما السيرفر يعمل ريستارت لوحده."
          },
          teach: R`الخطوة دي جزئين: شهادة HTTPS من Let's Encrypt بـ certbot، وسكربت باك أب يشتغل لوحده كل يوم بـ cron. وفي الآخر reboot يختبر كل اللي عملته. اتجرّبت كـ deploy على container [[ubuntu:24.04]] فيه systemd و Docker و Nginx من الخطوات اللي فاتت. الشهادة نفسها **ماتجرّبتش** لأن مفيش دومين حقيقي بيشاور على الـ container، فناتج [[certbot --nginx]] تحت من docs certbot. والـ reboot اتعمل بـ restart للـ container كله.

---

## ١. [[sudo apt install -y certbot python3-certbot-nginx]]

برنامجين:

- [[certbot]] البرنامج اللي بيطلب الشهادة من Let's Encrypt (جهة بتدّي شهادات SSL ببلاش، صالحة 90 يوم).
- [[python3-certbot-nginx]] إضافة (plugin) بتخلّي certbot يفهم ملفات Nginx ويعدّلها. certbot مكتوب بـ Python، عشان كده الاسم بيبدأ بـ [[python3-]].

~~~text الناتج
0 upgraded, 17 newly installed, 0 to remove and 0 not upgraded.
~~~

~~~text certbot --version
certbot 2.9.0
~~~

ومعاه اتسطّب timer بيجدد الشهادات لوحده:

~~~text systemctl list-timers --all | grep certbot
Wed 2026-10-07 11:29:25 EEST    20h -    -    certbot.timer    certbot.service
~~~

أول عمود: الميعاد الجاي اللي هيشتغل فيه. بيشتغل مرتين في اليوم، وبيجدد أي شهادة فاضلها أقل من 30 يوم. عشان كده مش محتاج تعمل حاجة كل 3 شهور.

---

## ٢. [[sudo certbot --nginx -d example.com -d www.example.com]]

| الحتة | معناها |
|---|---|
| [[--nginx]] | استخدم إضافة Nginx: اثبت ملكية الدومين عن طريق Nginx، وبعدين عدّل ملف الموقع لوحدك |
| [[-d example.com]] | domain: دومين تغطيه الشهادة |
| [[-d www.example.com]] | دومين تاني في نفس الشهادة. [[www]] ده دومين منفصل في نظر الشهادة، فلازم يتكتب |

أول مرة بيسألك إيميل (للتحذيرات لو الشهادة قربت تخلص) والموافقة على الشروط. وبعدين Let's Encrypt بيبعت طلب لـ [[http://example.com/.well-known/acme-challenge/...]]: لو وصل للسيرفر بتاعك، يبقى انت صاحب الدومين. عشان كده محتاج الـ DNS من خطوة 7 وبورت 80 مفتوح في ufw.

الناتج لما ينجح (من docs certbot، مختصر):

~~~text الناتج
Successfully received certificate.
Certificate is saved at: /etc/letsencrypt/live/example.com/fullchain.pem
Key is saved at:         /etc/letsencrypt/live/example.com/privkey.pem
...
Deploying certificate
Successfully deployed certificate for example.com to /etc/nginx/sites-enabled/myapp
Successfully deployed certificate for www.example.com to /etc/nginx/sites-enabled/myapp
Congratulations! You have successfully enabled HTTPS on https://example.com and https://www.example.com
~~~

- [[fullchain.pem]] الشهادة اللي بتتبعت للمتصفح، و [[privkey.pem]] المفتاح السري (ميطلعش من السيرفر).
- [[deployed certificate ... to /etc/nginx/sites-enabled/myapp]]: certbot ضاف لملفك [[listen 443 ssl]] ومسارات الشهادة، وتحويل من http لـ https.

> لو الـ DNS مش جاهز هيفشل في التحقق. اتأكد بـ [[dig +short example.com]] الأول.

---

## ٣. [[nano ~/backup.sh]]

مفيش [[sudo]]: الملف في فولدر deploy. والزق فيه سكربت [[backup.sh]] من تاب bash (درس «باك أب بيمسح القديم لوحده»)، اللي بياخد فولدر ويعمله ملف [[tar.gz]] في [[~/backups]] ويمسح اللي أقدم من 7 أيام.

بعد الحفظ:

~~~text ls -l ~/backup.sh
-rw-r--r-- 1 deploy deploy 330 Oct  6 14:53 /home/deploy/backup.sh
~~~

لو جرّبت تشغّله دلوقتي:

~~~text ~/backup.sh /var/www/myapp
bash: line 3: /home/deploy/backup.sh: Permission denied
~~~

exit code [[126]] يعني «الملف موجود بس مش قابل للتشغيل». بص على الصلاحيات: [[rw-]] من غير [[x]].

---

## ٤. [[chmod +x ~/backup.sh]]

[[chmod]] = change mode (غيّر الصلاحيات). [[+x]] ضيف صلاحية التشغيل (execute) للكل.

~~~text ls -l ~/backup.sh بعدها
-rwxr-xr-x 1 deploy deploy 330 Oct  6 14:53 /home/deploy/backup.sh
~~~

ظهر [[x]] في التلات مجموعات. شغّله بإيدك مرة قبل ما تحطه في cron. من غير فولدر:

~~~text ~/backup.sh
/home/deploy/backup.sh: line 4: 1: Usage: backup.sh $__lt folder>
~~~

السكربت محتاج الفولدر اللي هياخدله باك أب. ومعاه:

~~~text ~/backup.sh /var/www/myapp
Saved /home/deploy/backups/myapp-2026-10-06_14-53.tar.gz
~~~

~~~text ls -l ~/backups
-rw-rw-r-- 1 deploy deploy 12135 Oct  6 14:53 myapp-2026-10-06_14-53.tar.gz
~~~

---

## ٥. [[crontab -e]]

[[cron]] الخدمة اللي بتشغّل أوامر في مواعيد. [[crontab]] (cron table) جدول المواعيد بتاع اليوزر، و [[-e]] (edit) افتحه في محرر. أول مرة بيسألك تختار محرر (اختار nano). وقبلها الجدول فاضي:

~~~text crontab -l
no crontab for deploy
~~~

زوّد السطر ده في الآخر واحفظ:

~~~bash
0 3 * * * /home/deploy/backup.sh /var/www/myapp >> /home/deploy/backup.log 2>&1
~~~

نفكّه:

| الحتة | معناها |
|---|---|
| [[0]] | الدقيقة: 0 |
| [[3]] | الساعة: 3 الفجر (بتوقيت السيرفر، وده سبب [[Africa/Cairo]] في خطوة 1) |
| [[* * *]] | يوم الشهر، والشهر، ويوم الأسبوع: أي يوم |
| [[/home/deploy/backup.sh]] | المسار كامل، لأن cron مش بيبدأ من فولدرك ومش بيعرف [[~]] زي الترمنال |
| [[/var/www/myapp]] | الفولدر اللي السكربت هياخدله باك أب. من غيره السكربت هيقف بـ Usage |
| [[>> /home/deploy/backup.log]] | ضيف الناتج في آخر ملف لوج ([[>>]] بيضيف، [[>]] بيمسح ويكتب) |
| [[2>&1]] | الأخطاء ([[2]]) تروح لنفس مكان الناتج العادي ([[1]])، فتلاقيها في اللوج |

~~~text crontab -l بعدها
0 3 * * * /home/deploy/backup.sh /var/www/myapp >> /home/deploy/backup.log 2>&1
~~~

---

## ٦. الاختبار الأخير: reboot

~~~bash
sudo reboot
~~~

في التجربة عملنا restart للـ container، وبعد 12 ثانية:

~~~text الناتج
systemctl is-system-running      → running
systemctl --failed               → (فاضي)
nginx docker cron ssh fail2ban   → active
ufw status                       → Status: active
docker ps                        → myapp-web-1 Up 11 seconds 127.0.0.1:3000->3000/tcp
curl -sI -H "Host: example.com" http://127.0.0.1  → HTTP/1.1 200 OK
crontab -u deploy -l             → 0 3 * * * /home/deploy/backup.sh ...
~~~

كل حاجة رجعت لوحدها. والدليل على أهمية [[restart: unless-stopped]]: شغّلنا container تاني من غير restart policy قبل الـ reboot:

~~~text docker ps -a بعد الـ reboot
norestart  Exited (255) 11 seconds ago
myapp-web-1  Up 10 seconds
~~~

اللي من غير policy فضل واقف، وده بالظبط اللي بيعمل [[502 Bad Gateway]] الصبح بعد ما شركة الاستضافة تعمل reboot.

على VPS حقيقي، زوّد: [[curl -I https://example.com]] لازم يرجع [[200]]، و [[curl -I http://example.com]] يرجع [[301]] لـ https.

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[apt install -y certbot python3-certbot-nginx]] | certbot وإضافة Nginx، وتجديد تلقائي بـ [[certbot.timer]] |
| [[certbot --nginx -d example.com -d www.example.com]] | الشهادة وتعديل Nginx لـ https |
| [[nano ~/backup.sh]] | سكربت الباك أب |
| [[chmod +x ~/backup.sh]] | من غيرها: [[Permission denied]] |
| [[crontab -e]] | السطر اليومي الساعة 3 |
| [[sudo reboot]] | الاختبار: كله يرجع لوحده |

- في cron المسارات كاملة، والفولدر بعد اسم السكربت، و [[2>&1]] عشان الأخطاء تتسجّل.
- شغّل السكربت بإيدك مرة قبل ما تعتمد على cron.
- لو حاجة مقامتش بعد الـ reboot: [[systemctl --failed]] و [[docker ps -a]].`,
          lines: [
            "سطّب certbot.",
            "خد الشهادة وظبط Nginx.",
            "الزق سكربت الباك أب.",
            "اديله صلاحية التشغيل.",
            "ضيفه في الجدول اليومي."
          ],
          sol: R`السطر في [[crontab -e]]: [[0 3 * * * /home/deploy/backup.sh /var/www/myapp >> /home/deploy/backup.log 2>&1]]، و [[crontab -l]] بيوريه. وقبل ما تعتمد عليه شغّل [[~/backup.sh /var/www/myapp]] بإيدك مرة (من غير الفولدر السكربت بيقف بـ [[Usage: backup.sh <folder>]]) واتأكد إن ملف الباك أب اتعمل.

بعد [[sudo reboot]] والانتظار دقيقة: [[https://example.com]] بيفتح بالقفل من غير ما تعمل حاجة، و [[curl -I https://example.com]] بيرجع [[HTTP/2 200]] أو [[HTTP/1.1 200]]، و [[http://]] بيعمل 301 لـ https. ده معناه إن Nginx و Docker (بـ [[restart: unless-stopped]]) قاموا لوحدهم.

الغلط الشائع: الموقع بيرجع 502 بعد الـ reboot: الـ containers مش عليها restart policy أو خدمة docker مش enabled. والباك أب مابيتعملش: السكربت من غير [[chmod +x]] أو فيه مسارات نسبية؛ اقرا [[backup.log]].`
        }
      ]
    }
]);
