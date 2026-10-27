// تكملة تاب vps: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/vps/01.js (شرح حقول الدرس في أوله)
MORE("vps", [
  {
    t: "اللوجات وحدود النظام",
    l: 3,
    n: "السيرفر شغال من شهور: اللوجات مالية الديسك؟ والتطبيق بيقع بـ Too many open files؟ إعدادات الكيرنل اللي بتتعدّل وتفضل بعد الريستارت",
    items: [
      {
        cmd: "logrotate",
        title: "logrotate: لوجات تطبيقك متملاش الديسك",
        desc: R`logrotate بيلف على ملفات اللوج كل يوم (أو أسبوع): يقفل الملف الحالي ويسمّيه [[app.log.1]]، ويضغط القديم [[.gz]]، ويمسح اللي أقدم من عدد معين. ملفات Nginx و apt متظبطة لوحدها في [[/etc/logrotate.d/]]، لكن لوجات تطبيقك اللي في فولدره لازم تعمل لها ملف هناك بنفسك.

[[logrotate -d]] بيقولك هيعمل إيه من غير ما يعمل، و [[-f]] بيجبره يلف دلوقتي عشان تجرّب.`,
        example: R`sudo nano /etc/logrotate.d/myapp
sudo logrotate -d /etc/logrotate.d/myapp
sudo logrotate -fv /etc/logrotate.d/myapp
ls -la /var/www/myapp/logs
cat /var/lib/logrotate/status
systemctl list-timers logrotate.timer`,
        try: "اعمل ملف لوج كبير شوية (٢٠٠٠ سطر) واكتب له ملف logrotate، وجرّب [[-d]] الأول وبعدين [[-f]] مرتين، وبص على الأحجام والأسامي بعد كل مرة.",
        deep: {
          why: R`أشهر سبب لـ «السيرفر وقف فجأة» بعد شهور: الديسك اتملى من لوج تطبيق بيكبر من غير ما حد يمسحه. ولما الديسك يتملى قاعدة البيانات بتقف، والتطبيق ميعرفش يكتب، وحتى SSH ممكن يتعب. logrotate بيمنع ده من الأول.`,
          how: R`على أوبونتو 24.04، [[logrotate.timer]] (systemd timer) بيشغّل [[logrotate /etc/logrotate.conf]] مرة في اليوم، والملف ده بيعمل [[include /etc/logrotate.d]]. لكل ملف لوج، logrotate بيقارن بآخر مرة لفّه (مكتوبة في [[/var/lib/logrotate/status]]) وبالشروط ([[daily]] و [[maxsize]])، ولو لازم يلف بيعمل rename لكل نسخة قديمة رقم لقدام ويمسح اللي عدّت [[rotate]].

والمشكلة: التطبيق فاتح الملف وبيكتب فيه. لو logrotate عمل rename، التطبيق بيكمّل يكتب في الملف القديم ([[app.log.1]]). فيه حلّين: [[copytruncate]] (انسخ الملف وفضّي الأصلي، والتطبيق يكمّل في نفس الملف من غير ما يحس، بس ممكن تضيع سطور في اللحظة بين النسخ والتفضية)، أو [[create]] + [[postrotate]] بأمر يخلي التطبيق يفتح الملف من جديد (Nginx بيعمل كده بإشارة USR1). لتطبيق Node أو Python بيكتب بنفسه، [[copytruncate]] هو الأسهل.`,
          when: "أي تطبيق بيكتب لوج في ملف بنفسه (مش في journal). لو التطبيق شغال كـ systemd service وبيطبع على stdout، اللوج في journald، وده ليه إعداد تاني (الدرس الجاي).",
          mistakes: R`ملف في [[/etc/logrotate.d/]] صلاحياته مش root أو قابل للكتابة من حد تاني: logrotate بيتجاهله وبيطبع [[error: Ignoring ... because of bad file mode]] أو [[insecure permissions]]. فولدر اللوج مملوك ليوزر التطبيق: logrotate بيرفض يشتغل فيه من غير [[su deploy deploy]]. ونسيان [[missingok]] فيطلع error لو الملف مش موجود. ونسيان [[copytruncate]] (أو postrotate) فالتطبيق يفضل يكتب في [[app.log.1]] للأبد والملف الجديد فاضي.`
        },
        teach: R`## الأول: ملف إعداد + أمرين تجربة

اتجرّب على كونتينر [[ubuntu:24.04]] فيه logrotate [[3.21.0]]، وملف [[/var/www/myapp/logs/app.log]] فيه ٢٠٠٠ سطر (حوالي ٣٦ KB).

---

## ١. [[sudo nano /etc/logrotate.d/myapp]]: الإعداد

~~~text /etc/logrotate.d/myapp
/var/www/myapp/logs/*.log {
    daily
    rotate 14
    maxsize 100M
    compress
    delaycompress
    missingok
    notifempty
    copytruncate
    su root root
}
~~~

| السطر | معناه |
|---|---|
| [[/var/www/myapp/logs/*.log]] | أنهي ملفات. [[*]] تمسك كل ملفات [[.log]] في الفولدر |
| [[daily]] | لف مرة في اليوم ([[weekly]] و [[monthly]] موجودين) |
| [[rotate 14]] | خلّي آخر ١٤ نسخة وامسح الأقدم. يعني أسبوعين |
| [[maxsize 100M]] | لو الملف عدّى ١٠٠ ميجا لفّه حتى لو لسه اليوم مخلصش (لما logrotate يتشغّل) |
| [[compress]] | اضغط النسخ القديمة بـ gzip |
| [[delaycompress]] | بس سيب أحدث نسخة ([[.1]]) من غير ضغط لحد اللفة الجاية |
| [[missingok]] | لو مفيش ملف، متطلعش error |
| [[notifempty]] | لو الملف فاضي، متلفّوش |
| [[copytruncate]] | انسخ وفضّي الأصلي، عشان التطبيق يكمّل يكتب في نفس الملف |
| [[su root root]] | اشتغل بيوزر وجروب دول. لو الفولدر مملوك لـ deploy اكتب [[su deploy deploy]] |

الإعدادات العامة في [[/etc/logrotate.conf]]، وعلى أوبونتو 24.04 بعد شيل التعليقات:

~~~text /etc/logrotate.conf
weekly
su root adm
rotate 4
create
include /etc/logrotate.d
~~~

يعني أي ملف في [[logrotate.d]] مكتبش [[daily]] أو [[rotate]] بياخد [[weekly]] و [[rotate 4]] من هنا.

---

## ٢. [[sudo logrotate -d /etc/logrotate.d/myapp]]: هتعمل إيه؟

[[-d]] (debug) بيقرا الإعداد ويقول هيعمل إيه، **من غير ما يلمس حاجة**:

~~~text الناتج (المهم)
warning: logrotate in debug mode does nothing except printing debug messages!  Consider using verbose mode (-v) instead if this is not what you want.

reading config file /etc/logrotate.d/myapp
Reading state from file: /var/lib/logrotate/status
state file /var/lib/logrotate/status does not exist

rotating pattern: /var/www/myapp/logs/*.log  after 1 days (14 rotations)
empty log files are not rotated, log files >= 104857600 are rotated earlier, old logs are removed
considering log /var/www/myapp/logs/app.log
Creating new state
  Now: 2026-10-27 19:12
  Last rotated at 2026-10-27 19:00
  log does not need rotating (log has already been rotated)
~~~

لاحظ آخر سطر: أول مرة logrotate يشوف ملف بيسجّله كأنه «اتلف النهارده» ومش بيلفّه. أول لفة حقيقية بكرة. ولو فيه غلطة في الملف (قوس ناقص أو كلمة غلط) هتظهر هنا.

---

## ٣. [[sudo logrotate -fv /etc/logrotate.d/myapp]]: لف دلوقتي

[[-f]] (force) لف حتى لو مش وقته، و [[-v]] (verbose) احكيلي بتعمل إيه:

~~~text الناتج (آخر الكلام)
rotating pattern: /var/www/myapp/logs/*.log  forced from command line (14 rotations)
considering log /var/www/myapp/logs/app.log
  log needs rotating
rotating log /var/www/myapp/logs/app.log, log->rotateCount is 14
renaming /var/www/myapp/logs/app.log.14.gz to /var/www/myapp/logs/app.log.15.gz (rotatecount 14, logstart 1, i 14),
old log /var/www/myapp/logs/app.log.14.gz does not exist
...
renaming /var/www/myapp/logs/app.log.1.gz to /var/www/myapp/logs/app.log.2.gz (rotatecount 14, logstart 1, i 1),
old log /var/www/myapp/logs/app.log.1.gz does not exist
log /var/www/myapp/logs/app.log.15.gz doesn't exist -- won't try to dispose of it
copying /var/www/myapp/logs/app.log to /var/www/myapp/logs/app.log.1
truncating /var/www/myapp/logs/app.log
~~~

بيبدأ من الآخر: [[.14.gz]] يبقى [[.15]]، وبعدين [[.13]] يبقى [[.14]]، لحد [[.1]]. وأي حاجة بقت [[.15]] (أكبر من [[rotate 14]]) بتتمسح. وبعدين [[copying]] و [[truncating]]: ده [[copytruncate]].

---

## ٤. [[ls -la /var/www/myapp/logs]]: النتيجة

بعد أول [[-f]]:

~~~text الناتج
-rw-r--r-- 1 root root     0 Oct 27 19:12 app.log
-rw-r--r-- 1 root root 36893 Oct 27 19:12 app.log.1
~~~

[[app.log]] فضي (٠ بايت) والتطبيق يكمّل فيه، و [[app.log.1]] من غير ضغط بسبب [[delaycompress]]. كتبت سطر جديد وعملت [[-f]] تاني:

~~~text الناتج
-rw-r--r-- 1 root root    0 Oct 27 19:12 app.log
-rw-r--r-- 1 root root    5 Oct 27 19:12 app.log.1
-rw-r--r-- 1 root root 4757 Oct 27 19:12 app.log.2.gz
~~~

النسخة القديمة اتضغطت من [[36893]] لـ [[4757]] بايت (حوالي ٨ مرات أصغر، اللوجات نص متكرر فبتضغط كويس). وتقراها من غير فك بـ [[zcat app.log.2.gz]] أو [[zgrep error app.log.2.gz]].

---

## ٥. [[cat /var/lib/logrotate/status]]: فاكر إيه

~~~text الناتج (آخر سطر)
"/var/www/myapp/logs/app.log" 2026-10-27-19:12:39
~~~

آخر مرة لف كل ملف. لو مسحت السطر ده، logrotate يعامل الملف كأنه جديد.

---

## ٦. [[systemctl list-timers logrotate.timer]]: مين بيشغّله؟

على VPS أوبونتو 24.04 الـ timer ده موجود ومفعّل من التسطيب، وبيشغّل [[logrotate.service]] مرة في اليوم (شوف درس «list-timers»). الكونتينر اللي اتجرّب عليه مكانش فيه systemd، فالجزء ده من دليل أوبونتو.

---

## الخلاصة

~~~text
/etc/logrotate.d/myapp    ملف لكل تطبيق، صلاحياته root و 644
daily + rotate 14         كل يوم، وخلّي ١٤ نسخة
maxsize                   لف بدري لو الملف كبر
compress + delaycompress  اضغط القديم، وسيب .1 مفتوح
copytruncate              للتطبيق اللي فاتح الملف ومش بيعرف يفتحه تاني
logrotate -d              جرّب الإعداد من غير تنفيذ
logrotate -fv             لف دلوقتي واحكيلي
~~~`,
        lines: [
          "اكتب ملف الإعداد لتطبيقك (المحتوى في الشرح).",
          "اقرا الإعداد وقول هتعمل إيه من غير ما تعمل حاجة ([[-d]] = debug).",
          "لف دلوقتي حتى لو مش وقته ([[-f]]) واحكي كل خطوة ([[-v]]).",
          "شوف الملفات: [[app.log]] فاضي و [[app.log.1]] فيه القديم.",
          "آخر مرة logrotate لف كل ملف.",
          "الـ timer اللي بيشغّل logrotate كل يوم على أوبونتو."
        ],
        sol: R`على [[ubuntu:24.04]] و logrotate [[3.21.0]]: [[-d]] قال [[log does not need rotating (log has already been rotated)]] لأنها أول مرة. أول [[-fv]] عمل [[copying ... to app.log.1]] و [[truncating app.log]]، فبقى [[app.log]] بـ [[0]] بايت و [[app.log.1]] بـ [[36893]]. تاني [[-f]]: [[app.log.1]] (السطر الجديد) و [[app.log.2.gz]] بـ [[4757]] بايت.

لو ظهر [[error: skipping "..." because parent directory has insecure permissions]]: الفولدر قابل للكتابة من غير root، زوّد [[su <user> <group>]] بصاحب الفولدر.`
      },
      {
        cmd: "journald.conf",
        title: "journald: حد أقصى لحجم لوجات systemd",
        desc: R`لوجات الخدمات اللي شغالة بـ systemd (اللي بتقراها بـ [[journalctl]]) مش بتتلف بـ logrotate، journald بيديرها بنفسه. افتراضيًا ممكن ياخد لحد ١٠٪ من الديسك (وأقصى ٤ جيجا). [[journalctl --disk-usage]] بيقولك واخد قد إيه، وملف في [[/etc/systemd/journald.conf.d/]] بيحط حد، و [[--vacuum-time]] بيمسح القديم دلوقتي.`,
        example: R`journalctl --disk-usage
sudo mkdir -p /etc/systemd/journald.conf.d
printf '[Journal]\nSystemMaxUse=500M\nMaxRetentionSec=1month\n' | sudo tee /etc/systemd/journald.conf.d/size.conf
sudo systemctl restart systemd-journald
journalctl -u systemd-journald -n 3 --no-pager -o cat
sudo journalctl --vacuum-time=2weeks`,
        try: "شوف journal واخد قد إيه على سيرفرك، وحط له حد ٥٠٠ ميجا، واتأكد من السطر اللي journald بيطبعه بعد الريستارت إنه شاف الحد الجديد.",
        deep: {
          why: R`على VPS ديسكه ٢٠ أو ٢٥ جيجا، ١٠٪ يعني ٢ جيجا لوجات، وتطبيق بيطبع كتير على stdout بيوصلها بسرعة. وحد واضح أحسن من إنك تكتشف إن [[/var/log/journal]] واكل الديسك يوم ما الديسك يتملى.`,
          how: R`journald بيقرا [[/etc/systemd/journald.conf]] وبعده أي ملف [[.conf]] في [[journald.conf.d/]] (والملف الأخير بيغلب). [[SystemMaxUse]] أقصى حجم لكل اللوجات المحفوظة على الديسك في [[/var/log/journal]]، ولما يوصله بيمسح أقدم ملفات. [[MaxRetentionSec]] أقصى عمر للوج. والإعدادات بتتقري لما journald يعمل restart.

و [[--vacuum-size]] و [[--vacuum-time]] بيمسحوا **دلوقتي** من الملفات المقفولة (archived) بس، مش الملف اللي journald بيكتب فيه حاليًا، فساعات بيقول [[freed 0B]] لو مفيش ملفات قديمة كفاية.`,
          when: "مع أول إعداد للسيرفر، ولما [[df -h]] أو [[ncdu]] يوريك إن [[/var/log/journal]] كبير.",
          mistakes: R`تعدّل [[journald.conf]] الأصلي بدل ملف في [[journald.conf.d]]: تحديث systemd ممكن يسألك أو يكتب فوقه. تنسى الـ restart فالحد الجديد ميتطبقش. وتمسح ملفات [[/var/log/journal]] بـ [[rm]] بإيدك بدل [[--vacuum]]: journald بيبقى فاتحها وممكن يتلخبط.`
        },
        teach: R`## الأول: journald بيدير لوجاته بنفسه

اتجرّب على أوبونتو 24.04 جوه Docker بـ systemd [[255]] شغال (كونتينر [[--privileged]]، زي باقي دروس systemd في التاب).

---

## ١. [[journalctl --disk-usage]]

~~~text الناتج
Archived and active journals take up 16.0M in the file system.
~~~

[[Archived]] الملفات القديمة اللي اتقفلت، و [[active]] اللي بيتكتب فيه دلوقتي. على VPS بقاله شهور هتلاقي رقم أكبر بكتير.

---

## ٢. ملف الإعداد

~~~bash
sudo mkdir -p /etc/systemd/journald.conf.d
printf '[Journal]\nSystemMaxUse=500M\nMaxRetentionSec=1month\n' | sudo tee /etc/systemd/journald.conf.d/size.conf
~~~

| الحتة | معناها |
|---|---|
| [[mkdir -p]] | اعمل الفولدر لو مش موجود (ومتطلعش error لو موجود) |
| [[printf '...\n...']] | اطبع النص، و [[\n]] سطر جديد. أسهل من [[echo]] في نص فيه كذا سطر |
| [[sudo tee file]] | اكتب اللي جاي في ملف بصلاحية root (عشان [[sudo printf > file]] مش بيشتغل، زي ما اتشرح في درس «swap») |

الملف اللي اتكتب:

~~~text /etc/systemd/journald.conf.d/size.conf
[Journal]
SystemMaxUse=500M
MaxRetentionSec=1month
~~~

| السطر | معناه |
|---|---|
| [[[Journal]]] | اسم القسم، لازم يبقى موجود |
| [[SystemMaxUse=500M]] | كل اللوجات على الديسك متعدّيش ٥٠٠ ميجا |
| [[MaxRetentionSec=1month]] | ومفيش لوج أقدم من شهر |

---

## ٣. [[sudo systemctl restart systemd-journald]] والتأكد

~~~text journalctl -u systemd-journald -n 3 --no-pager -o cat
Collecting audit messages is disabled.
Journal started
System Journal (/var/log/journal/f692...0e20) is 16.0M, max 500.0M, 483.9M free.
~~~

| الخيار | معناه |
|---|---|
| [[-u systemd-journald]] | لوج journald نفسه |
| [[-n 3]] | آخر ٣ سطور |
| [[--no-pager]] | اطبع على طول من غير less |
| [[-o cat]] | الرسالة بس من غير وقت واسم |

آخر سطر هو الدليل: [[max 500.0M]]. (الرقم الطويل في المسار هو machine-id بتاع الجهاز، اختصرته.)

وللتأكد من الإعداد النهائي بعد دمج كل الملفات: [[systemd-analyze cat-config systemd/journald.conf]].

---

## ٤. [[sudo journalctl --vacuum-time=2weeks]]: امسح دلوقتي

~~~text الناتج
Vacuuming done, freed 0B of archived journals from /var/log/journal/f692...0e20.
~~~

[[0B]] هنا لأن الكونتينر جديد ومفيش ملفات قديمة. على سيرفر قديم هتلاقي ميجات. و [[--vacuum-size=200M]] بيمسح لحد ما الحجم يبقى ٢٠٠ ميجا.

---

## الخلاصة

~~~text
journalctl --disk-usage                 واخد قد إيه
journald.conf.d/size.conf               SystemMaxUse و MaxRetentionSec
systemctl restart systemd-journald      عشان يتطبق
--vacuum-time / --vacuum-size           امسح القديم دلوقتي
logrotate للملفات، journald للـ stdout   كل واحد ليه أداته
~~~`,
        lines: [
          "journal واخد قد إيه من الديسك دلوقتي.",
          "اعمل فولدر الإعدادات الإضافية لـ journald.",
          "اكتب ملف فيه حد ٥٠٠ ميجا وأقصى عمر شهر ([[tee]] عشان الكتابة محتاجة root).",
          "أعد تشغيل journald عشان يقرا الإعداد.",
          "آخر ٣ رسايل من journald نفسه: فيها الحد الجديد ([[max 500.0M]]).",
          "امسح اللوجات المقفولة اللي أقدم من أسبوعين دلوقتي."
        ],
        sol: R`على أوبونتو 24.04 بـ systemd 255 جوه Docker: [[--disk-usage]] طبع [[Archived and active journals take up 16.0M in the file system.]]، وبعد الملف والـ restart، journald طبع [[System Journal (...) is 16.0M, max 500.0M, 483.9M free.]]. و [[--vacuum-time=2weeks]] طبع [[Vacuuming done, freed 0B]] لأن مفيش لوجات قديمة في كونتينر جديد.`
      },
      {
        cmd: "sysctl",
        title: "sysctl: إعدادات الكيرنل اللي بتفضل بعد الريستارت",
        desc: R`[[sysctl]] بيقرا ويغيّر إعدادات الكيرنل وهو شغال: [[sysctl vm.swappiness]] تقرا، و [[sysctl -w]] تغيّر لحد الريستارت بس. عشان التغيير يفضل، اكتبه في ملف في [[/etc/sysctl.d/]] وشغّل [[sysctl --system]] اللي بيقرا كل الملفات دي بالترتيب.`,
        example: R`sysctl vm.swappiness vm.overcommit_memory net.core.somaxconn
sudo sysctl -w vm.swappiness=10
echo 'vm.swappiness = 10' | sudo tee /etc/sysctl.d/99-myapp.conf
sudo sysctl --system
sysctl -n vm.swappiness`,
        try: "اقرا القيم الحالية على سيرفرك، واكتب ملف [[99-myapp.conf]] فيه [[vm.swappiness = 10]]، وطبّقه، واعمل reboot واتأكد إن القيمة لسه 10.",
        deep: {
          why: R`شوية إعدادات افتراضية معمولة لجهاز عام مش لسيرفر صغير: [[vm.swappiness=60]] بيخلي لينكس يحرّك حاجات للـ swap بدري، فالتطبيق يبطأ رغم إن فيه رام. و Redis بيطبع تحذير لو [[vm.overcommit_memory]] مش 1. والمهم إن التعديل يفضل بعد الريستارت، وإلا هتكتشف بعد أول تحديث كيرنل إن كله رجع زي ما كان.`,
          how: R`كل إعداد هو ملف في [[/proc/sys/]]: [[vm.swappiness]] هو [[/proc/sys/vm/swappiness]] (النقط بقت [[/]]). [[sysctl -w]] بيكتب في الملف ده، والكيرنل بيستخدم القيمة على طول، بس [[/proc]] في الرام، فبيضيع مع الريستارت.

ومع كل boot، [[systemd-sysctl.service]] بيقرا [[/usr/lib/sysctl.d/]] و [[/etc/sysctl.d/]] بترتيب أسامي الملفات وبعدهم [[/etc/sysctl.conf]]، واللي بعده بيغلب. عشان كده ملفك بيبدأ بـ [[99-]]: يتقري في الآخر من [[sysctl.d]] ويغلب قيم التوزيعة. و [[sysctl --system]] بيعمل نفس القراية دلوقتي.

وفيه إعدادات [[net.*]] كتير خاصة بكل network namespace (كل كونتينر Docker ليه نسخته)، و [[vm.*]] و [[kernel.*]] للماكينة كلها.`,
          when: "لما تطبيق أو قاعدة بيانات بتطلب قيمة معينة في الـ docs بتاعتها (Redis و Elasticsearch و PostgreSQL)، أو لما swap بيتستخدم والرام فاضية. متغيّرش حاجة عشان «مقال قال كده» من غير ما تعرف بتعمل إيه.",
          mistakes: R`[[sysctl -w]] بس من غير ملف: بيرجع بعد الريستارت. اسم إعداد غلط بحرف: [[sysctl: cannot stat /proc/sys/vm/swapiness: No such file or directory]]. ملف من غير [[.conf]] في الآخر: مش بيتقري. وتجرّبه جوه كونتينر Docker عادي: [[Read-only file system]]، لأن [[/proc/sys]] للقراية بس جوه الكونتينر.`
        },
        teach: R`## الأول: اقرا، غيّر مؤقت، ثبّت

اتجرّب على كونتينرات [[ubuntu:24.04]] على Docker Desktop. قراية القيم و [[sysctl --system]] على كونتينر عادي، والكتابة على إعداد [[net.*]] في كونتينر [[--privileged]] (ليه network namespace خاص بيه فمش بيأثر على حاجة تانية). كتابة [[vm.swappiness]] نفسها **مااتعملتش** هنا، لأنه إعداد للماكينة كلها (ماكينة Docker Desktop)، فناتج سطري الكتابة من دليل [[sysctl(8)]] بنفس الشكل.

---

## ١. [[sysctl vm.swappiness vm.overcommit_memory net.core.somaxconn]]: اقرا

~~~text الناتج
vm.swappiness = 60
vm.overcommit_memory = 1
net.core.somaxconn = 4096
~~~

| الإعداد | معناه |
|---|---|
| [[vm.swappiness]] | من 0 لـ 200: قد إيه الكيرنل يفضّل يحرّك صفحات للـ swap بدل ما يمسح cache. الافتراضي 60. على سيرفر عليه swap للطوارئ (درس «swap») الناس بتحط 10 |
| [[vm.overcommit_memory]] | 0 (الافتراضي في لينكس): الكيرنل يخمّن هل الطلب معقول. 1: وافق دايمًا. Redis بيطلب 1. (ماكينة Docker Desktop هنا عليها 1 أصلًا) |
| [[net.core.somaxconn]] | أقصى طابور اتصالات مستنية [[accept]]. من كيرنل 5.4 الافتراضي 4096 (كان 128)، فغالبًا مش محتاج تلمسه |

[[sysctl -n]] بيطبع القيمة بس من غير الاسم، مفيد في سكربت.

---

## ٢. [[sudo sysctl -w vm.swappiness=10]]: غيّر دلوقتي

[[-w]] (write). الناتج (من الدليل) سطر بالقيمة الجديدة:

~~~text الناتج
vm.swappiness = 10
~~~

نفس الشغلانة اتجرّبت على إعداد شبكة جوه كونتينر [[--privileged]]:

~~~text sysctl -w net.ipv4.ip_local_port_range="10240 65535"
net.ipv4.ip_local_port_range = 10240 65535
~~~

وكونتينر تاني بعدها لسه شايف [[32768	60999]]: الإعداد ده خاص بالـ namespace. وغلطة حرف في الاسم:

~~~text sysctl -w vm.swapiness=10
sysctl: cannot stat /proc/sys/vm/swapiness: No such file or directory
~~~

ده بيوريك إن كل إعداد هو ملف في [[/proc/sys]].

---

## ٣. [[echo '...' | sudo tee /etc/sysctl.d/99-myapp.conf]]: ثبّت

~~~text /etc/sysctl.d/99-myapp.conf
vm.swappiness = 10
~~~

ممكن تحط كذا سطر، و [[#]] للتعليق (اكتب جنب كل إعداد ليه حطيته). والاسم لازم يخلص بـ [[.conf]].

---

## ٤. [[sudo sysctl --system]]: اقرا كل الملفات بالترتيب

ده الناتج على كونتينر أوبونتو عادي (فيه ملف [[99-myapp.conf]] تجربة):

~~~text الناتج (أوله)
* Applying /etc/sysctl.d/10-bufferbloat.conf ...
* Applying /etc/sysctl.d/10-console-messages.conf ...
* Applying /etc/sysctl.d/10-ipv6-privacy.conf ...
* Applying /etc/sysctl.d/10-kernel-hardening.conf ...
* Applying /etc/sysctl.d/10-magic-sysrq.conf ...
* Applying /etc/sysctl.d/10-map-count.conf ...
* Applying /etc/sysctl.d/10-network-security.conf ...
* Applying /etc/sysctl.d/10-ptrace.conf ...
* Applying /etc/sysctl.d/10-zeropage.conf ...
* Applying /etc/sysctl.d/99-myapp.conf ...
* Applying /usr/lib/sysctl.d/99-protect-links.conf ...
* Applying /etc/sysctl.conf ...
sysctl: setting key "kernel.printk", ignoring: Read-only file system
~~~

| تلاحظ إيه | ليه |
|---|---|
| ملفات [[10-...]] | إعدادات أوبونتو نفسها (أمان وشبكة) |
| [[99-myapp.conf]] بعدهم | الترتيب أبجدي، فرقم أكبر = يتقري بعدين = يغلب |
| [[/etc/sysctl.conf]] في الآخر | الملف القديم لسه بيتقري، وبيغلب الكل |
| [[Read-only file system]] | ده عشان كونتينر عادي. على VPS هتلاقي سطر [[key = value]] لكل إعداد |

---

## ٥. [[sysctl -n vm.swappiness]]: اتأكد

على VPS بعد الخطوات دي (وبعد reboot كمان) المفروض يطبع [[10]]. ده أهم اختبار: التغيير لازم يعيش بعد الريستارت.

---

## الخلاصة

~~~text
sysctl name                  اقرا (والاسم = مسار في /proc/sys)
sysctl -w name=value         غيّر لحد الريستارت
/etc/sysctl.d/99-x.conf      ثبّت (لازم .conf)
sysctl --system              طبّق كل الملفات دلوقتي بالترتيب
net.* لكل namespace          vm.* و kernel.* للماكينة كلها
~~~`,
        lines: [
          "اقرا ٣ إعدادات مرة واحدة.",
          "غيّر الـ swappiness لـ 10 دلوقتي (بيرجع بعد الريستارت).",
          "اكتب القيمة في ملف عشان تفضل بعد الريستارت.",
          "اقرا كل ملفات sysctl بالترتيب وطبّقها.",
          "اطبع القيمة بس واتأكد إنها 10."
        ],
        sol: R`القراية على كونتينر أوبونتو: [[vm.swappiness = 60]] و [[net.core.somaxconn = 4096]]. [[sysctl --system]] طبع [[* Applying]] لكل ملف بالترتيب، و [[99-myapp.conf]] جه بعد ملفات [[10-...]] وقبل [[/etc/sysctl.conf]]. والكتابة جوه كونتينر عادي رجّعت [[Read-only file system]]، وجوه كونتينر [[--privileged]] على إعداد [[net.ipv4.ip_local_port_range]] اشتغلت وفضلت جوه الكونتينر ده بس. على VPS حقيقي [[sysctl -n vm.swappiness]] بعد الملف والريستارت بيطبع [[10]] (الجزء ده من دليل sysctl، مااتعملش هنا لأنه بيغيّر ماكينة Docker Desktop كلها).`
      },
      {
        cmd: "LimitNOFILE",
        title: "Too many open files: حد الملفات المفتوحة لخدمتك",
        desc: R`كل process ليه حد لعدد الملفات اللي يفتحها مرة واحدة، وكل اتصال شبكة بيتعد ملف. الحد الافتراضي لخدمات systemd [[1024]] (soft)، وسيرفر عليه آلاف الاتصالات بيقع بـ [[EMFILE: too many open files]] أو [[Errno 24]]. الحل [[LimitNOFILE=65535]] في الـ service نفسها، مش [[/etc/security/limits.conf]] (ده لجلسات الدخول بس).`,
        example: R`ulimit -n
ulimit -Hn
sudo systemctl edit myapp
sudo systemctl restart myapp
systemctl show myapp -p LimitNOFILE -p LimitNOFILESoft
grep "open files" /proc/$(systemctl show -p MainPID --value myapp)/limits`,
        try: "اعرف حد الملفات بتاع خدمة شغالة عندك من [[/proc/<PID>/limits]]، وزوّده بـ drop-in، واعمل restart واتأكد من الرقم الجديد.",
        deep: {
          why: R`الخطأ ده بيظهر تحت الضغط بس: في التجربة كله تمام، وأول يوم فيه زيارات كتير التطبيق يقع أو يرفض اتصالات. ومعظم الناس بيعدّلوا [[limits.conf]] ويعملوا restart ويستغربوا إن مفيش حاجة اتغيّرت، لأن systemd مش بيقراه.`,
          how: R`كل حد ليه رقمين: soft (اللي شغال فعلًا، والبرنامج يقدر يرفعه بنفسه لحد الـ hard) و hard (السقف، وبس root يرفعه). [[ulimit -n]] الـ soft بتاع الشيل بتاعك، و [[-Hn]] الـ hard.

الخدمات اللي systemd بيشغّلها بتاخد الحد من الـ unit: [[LimitNOFILE=65535]] بتحط الاتنين 65535، و [[LimitNOFILE=4096:65535]] soft:hard. لو مش مكتوب بتاخد الافتراضي: soft [[1024]] و hard [[524288]] في الغالب (systemd 240+، وفي المعمل كان الـ hard [[1048576]] لأنه بيورث سقف الكونتينر). و [[/etc/security/limits.conf]] بيتطبق عن طريق PAM لما يوزر يعمل login (ssh أو su)، فبيأثر على الشيل مش على الخدمات.

و [[systemctl edit myapp]] بيعمل ملف drop-in في [[/etc/systemd/system/myapp.service.d/override.conf]] بيتضاف فوق الـ unit الأصلي من غير ما تعدّله، وبيعمل daemon-reload لوحده لما تحفظ.`,
          when: "أي خدمة بتمسك اتصالات كتير: Nginx (مع [[worker_rlimit_nofile]] في nginx.conf)، أو تطبيق Node فيه WebSockets، أو قاعدة بيانات. ولما تشوف [[EMFILE]] أو [[Too many open files]] في اللوج.",
          mistakes: R`تعدّل [[limits.conf]] للخدمة (مش بيتقري). تعدّل الـ unit وتنسى restart (الـ process الشغال بياخد الحد وقت ما قام بس). تحط رقم ضخم جدًا من غير سبب. وتفتكر إن الحد هو المشكلة وهو في الحقيقة leak: التطبيق فاتح ملفات أو اتصالات ومش بيقفلها، فعدد [[ls /proc/<PID>/fd | wc -l]] بيزيد طول الوقت. ساعتها رفع الحد بيأجّل الوقعة بس.`
        },
        teach: R`## الأول: الحد ده إيه ويتشاف فين

اتجرّب على أوبونتو 24.04 جوه Docker بـ systemd [[255]]، بخدمة تجربة [[fdtest.service]] بتشغّل [[sleep infinity]] (اسمها في المثال [[myapp]]).

---

## ١. [[ulimit -n]] و [[ulimit -Hn]]: الحد بتاع الشيل

~~~text الناتج كيوزر deploy (بعد su -)
1024
1048576
~~~

| الأمر | معناه |
|---|---|
| [[ulimit]] | أمر في bash بيعرض أو يغيّر حدود الـ process ده واللي بيطلع منه |
| [[-n]] | عدد الملفات المفتوحة (number of open files)، الـ soft |
| [[-Hn]] | نفسه بس الـ hard |

### الحد ده بيعمل إيه لما يخلص

في شيل حطيت له [[ulimit -n 20]] وفتحت ١٠٠ ملف بـ Python:

~~~text الناتج
OSError: [Errno 24] Too many open files: '/etc/hostname'
~~~

[[Errno 24]] اسمه [[EMFILE]]. Node بيطبعه [[EMFILE: too many open files]]، و Nginx [[(24: Too many open files)]] في الـ error log. وكل socket (اتصال) بيتعد ملف.

---

## ٢. حد الخدمة: من [[/proc]]

قبل أي تعديل:

~~~text grep "open files" /proc/2511/limits
Max open files            1024                 1048576              files
~~~

العمود الأول soft والتاني hard. وبـ systemctl:

~~~text systemctl show fdtest -p LimitNOFILE -p LimitNOFILESoft
LimitNOFILE=1048576
LimitNOFILESoft=1024
~~~

[[$(systemctl show -p MainPID --value myapp)]] في المثال بيجيب رقم الـ process الرئيسي ([[2511]] هنا)، و [[$( )]] بيحط ناتج الأمر جوه الأمر اللي برّه.

---

## ٣. [[sudo systemctl edit myapp]]: drop-in

بيفتح editor على ملف فاضي. اكتب:

~~~text اللي بتكتبه
[Service]
LimitNOFILE=65535
~~~

واحفظ. systemd بيحطه في [[/etc/systemd/system/myapp.service.d/override.conf]] ويعمل daemon-reload. (في المعمل كتبت الملف بإيدي في [[fdtest.service.d/limits.conf]] وعملت [[daemon-reload]]، نفس النتيجة من غير editor.) وتشوف الاتنين مع بعض بـ [[systemctl cat]]:

~~~text systemctl cat fdtest
# /etc/systemd/system/fdtest.service
[Unit]
Description=fd limit test

[Service]
ExecStart=/usr/bin/sleep infinity

# /etc/systemd/system/fdtest.service.d/limits.conf
[Service]
LimitNOFILE=65535
~~~

---

## ٤. restart والتأكد

~~~bash
sudo systemctl restart myapp
~~~

الـ process القديم أخد حده وقت ما قام، فلازم restart. بعدها:

~~~text systemctl show ... -p LimitNOFILE -p LimitNOFILESoft
LimitNOFILE=65535
LimitNOFILESoft=65535
~~~

~~~text grep "open files" /proc/<PID>/limits
Max open files            65535                65535                files
~~~

و [[prlimit --pid <PID> --nofile]] بيطبع نفس الرقمين بشكل تاني.

---

## ٥. فين بيتغيّر إيه

| عايز تغيّر لـ | فين |
|---|---|
| خدمة systemd (تطبيقك، Nginx، Postgres) | [[LimitNOFILE]] في الـ unit أو drop-in |
| شيلك وأي حاجة بتشغّلها منه بإيدك | [[ulimit -n]] (لحد الـ hard) |
| يوزر بيعمل login بـ ssh | [[/etc/security/limits.conf]] |
| كونتينر Docker | [[--ulimit nofile=65535:65535]] أو [[ulimits:]] في compose |

وبرضه Nginx ليه حد جوه إعداده: [[worker_connections]] (على أوبونتو [[768]]) و [[worker_rlimit_nofile]]، فلو رفعت حد الخدمة ارفع دول كمان.

---

## الخلاصة

~~~text
ulimit -n / -Hn                          حد الشيل soft / hard
/proc/<PID>/limits                       حد الـ process الحقيقي
systemctl edit myapp → LimitNOFILE=65535 للخدمة (مش limits.conf)
restart                                  الـ process بياخد الحد وقت ما يقوم
ls /proc/<PID>/fd | wc -l                مفتوح كام دلوقتي (لو بيزيد على طول: leak)
~~~`,
        lines: [
          "الحد الـ soft لعدد الملفات المفتوحة في الشيل بتاعك.",
          "الحد الـ hard (السقف).",
          "افتح drop-in للخدمة واكتب فيه [[[Service]]] و [[LimitNOFILE=65535]].",
          "أعد تشغيل الخدمة عشان الـ process الجديد ياخد الحد.",
          "الحد زي ما systemd شايفه: hard و soft.",
          "الحد الحقيقي للـ process الشغال من [[/proc/<PID>/limits]]."
        ],
        sol: R`في المعمل: قبل التعديل [[Max open files 1024 1048576]] و [[LimitNOFILESoft=1024]]. بعد drop-in فيه [[LimitNOFILE=65535]] و restart: [[Max open files 65535 65535]]، و [[systemctl show]] طبع [[LimitNOFILE=65535]] و [[LimitNOFILESoft=65535]]. و Python في شيل بـ [[ulimit -n 20]] وقع بـ [[OSError: [Errno 24] Too many open files]].`
      }
    ]
  }
]);
