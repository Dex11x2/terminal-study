// تكملة تاب vps: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/vps/01.js (شرح حقول الدرس في أوله)
MORE("vps", [
  {
    t: "AppArmor و SELinux: حماية فوق الصلاحيات",
    l: 3,
    n: "ليه Nginx بيقول Permission denied والـ chmod مظبوط؟ طبقة حماية في الكيرنل بتحدد كل برنامج يلمس إيه، حتى لو شغال root",
    items: [
      {
        cmd: "MAC: AppArmor و SELinux",
        title: "MAC: يعني إيه، وسيرفرك عليه أنهي واحد",
        desc: R`صلاحيات لينكس العادية (chmod و chown) اسمها DAC: صاحب الملف بيقرر مين يقراه. MAC (Mandatory Access Control) طبقة تانية في الكيرنل فوقها: قواعد مكتوبة لكل برنامج «Nginx يقرا [[/var/www]] بس ويكلّم بورت 80»، ومحدش يقدر يتخطاها ولا حتى root. أوبونتو و Debian بيستخدموا **AppArmor**، و RHEL و Rocky و AlmaLinux و Fedora بيستخدموا **SELinux**.

العملية بتعدّي لو الاتنين وافقوا: DAC الأول، وبعدين MAC. فلو [[ls -l]] مظبوط والبرنامج لسه بياخد [[Permission denied]]، بص على MAC.`,
        example: R`# Ubuntu / Debian بـ AppArmor
sudo aa-status
aa-enabled
# RHEL / Rocky / AlmaLinux / Fedora بـ SELinux
getenforce
sestatus
# Docker شغال بأنهي حماية
docker info --format '{{json .SecurityOptions}}'`,
        try: "على سيرفرك شغّل الأمر بتاع توزيعتك وشوف هو enforcing ولا لأ، وكام profile شغال. وشغّل docker info وشوف apparmor أو selinux موجودين في القايمة.",
        deep: {
          why: R`لو تطبيقك (أو Nginx) اتخترق، المهاجم بياخد صلاحيات اليوزر اللي التطبيق شغال بيه، ولو شغال root بياخد السيرفر كله. MAC بيحصر الضرر: حتى لو نفّذ كود جوه Nginx، مش هيقدر يقرا [[/etc/shadow]] ولا يكتب في [[/usr/bin]] ولا يفتح اتصال لبورت غريب، لأن الـ profile بتاع Nginx مش بيسمح.`,
          how: R`الاتنين LSM (Linux Security Module): الكيرنل بيسألهم قبل كل عملية (فتح ملف، اتصال، تشغيل برنامج). الفرق في طريقة التعرّف:

AppArmor بيشتغل **بالمسار**: profile لكل برنامج باسم ملفه ([[/usr/sbin/nginx]])، فيه قايمة مسارات وصلاحيات ([[/var/www/** r]]). سهل يتقري ويتكتب، والبرامج اللي ملهاش profile شغالة unconfined (من غير قيود).

SELinux بيشتغل **بالـ labels**: كل ملف وكل process وكل بورت عليه label (context) زي [[httpd_sys_content_t]]، والسياسة بتقول «process من نوع [[httpd_t]] يقرا ملفات من نوع [[httpd_sys_content_t]]». المسار نفسه مش مهم، المهم الـ label اللي على الملف. وفي الوضع [[targeted]] (الافتراضي) الخدمات المعروفة بس محبوسة.

والاتنين ليهم وضعين: enforce (امنع وسجّل) و complain/permissive (اسمح بس سجّل)، وده اللي بتستخدمه عشان تعرف البرنامج محتاج إيه.`,
          when: "أول ما تستلم سيرفر: اعرف عليه أنهي واحد وهو شغال ولا لأ. ولما تلاقي Permission denied غريب والصلاحيات العادية مظبوطة.",
          mistakes: R`أول حل الناس بتعمله: [[setenforce 0]] أو [[systemctl disable apparmor]] «عشان المشكلة تتحل». ده بيشيل طبقة الحماية كلها عن السيرفر بسبب ملف واحد label بتاعه غلط. صلّح السبب (الدرسين الجايين). وتفتكر إن Docker Desktop زي السيرفر: الكيرنل بتاعه مش مشغّل AppArmor ولا SELinux، فالـ security options بتتقبل وتتجاهل من غير ما تقولك.`
        },
        teach: R`## الأول: طبقتين، والاتنين لازم يوافقوا

~~~text مين بيقرر
nginx عايز يقرا /srv/site/index.html
  1. DAC   (chmod / chown)    هل اليوزر www-data ليه r على الملف؟
  2. MAC   (AppArmor/SELinux) هل الـ profile/السياسة بتسمح لـ nginx بالملف ده؟
  الاتنين قالوا آه  →  يقرا.  واحد قال لأ  →  Permission denied
~~~

الأوامر في المثال اتجرّبت جوه Docker Desktop (كيرنل WSL2 [[6.18]]): كونتينر [[ubuntu:24.04]] فيه [[apparmor]] [[4.0.1]]، وكونتينر [[almalinux:10]] (AlmaLinux [[10.2]]) فيه أدوات SELinux. الكيرنل ده مش مشغّل AppArmor ولا SELinux، فالنواتج هنا بتقول «مقفول»، وده نفسه درس: لازم تتأكد قبل ما تفترض إنك محمي. والنواتج على سيرفر شغال عليه الحماية مكتوبة تحت من دليل أوبونتو و RHEL.

---

## ١. AppArmor: [[sudo aa-status]] و [[aa-enabled]]

[[aa-status]] (من باكدج [[apparmor]]) بيعرض حالة AppArmor والـ profiles اللي متحمّلة. محتاج sudo عشان يقرا تفاصيل الـ profiles. في المعمل:

~~~text الناتج (Docker Desktop)
apparmor module is loaded.
apparmor filesystem is not mounted.
~~~

~~~text aa-enabled
No - disabled at boot.
~~~

يعني الكود موجود في الكيرنل بس مش شغال. وعلى VPS أوبونتو 24.04 عادي، دليل أوبونتو بيوري شكل زي ده (الأرقام بتختلف):

~~~text الناتج على أوبونتو server (من الدليل، مختصر)
apparmor module is loaded.
NN profiles are loaded.
NN profiles are in enforce mode.
   /usr/bin/man
   /usr/sbin/chronyd
   ...
N profiles are in complain mode.
N processes have profiles defined.
N processes are in enforce mode.
~~~

| الجزء | معناه |
|---|---|
| [[profiles are loaded]] | كام profile اتحمّل في الكيرنل (من [[/etc/apparmor.d/]]) |
| [[enforce mode]] | بيمنع ويسجّل |
| [[complain mode]] | بيسجّل بس من غير منع |
| [[processes have profiles defined]] | برامج شغالة دلوقتي ومحبوسة |

و [[aa-enabled]] بيرد [[Yes]] أو لأ، ومفيد في سكربت.

---

## ٢. SELinux: [[getenforce]] و [[sestatus]]

[[getenforce]] كلمة واحدة: [[Enforcing]] أو [[Permissive]] أو [[Disabled]]. في المعمل:

~~~text الناتج (Docker Desktop)
Disabled
~~~

~~~text sestatus
SELinux status:                 disabled
~~~

مع إن ملف الإعداد بتاع AlmaLinux بيقول:

~~~text /etc/selinux/config (من غير التعليقات)
SELINUX=enforcing
SELINUXTYPE=targeted
~~~

الملف بيقول «شغّله»، بس الكيرنل اللي تحت مش بيشغّله. على VPS بـ RHEL أو Rocky أو AlmaLinux، [[sestatus]] بيطبع (من دليل RHEL):

~~~text الناتج على RHEL (من الدليل، مختصر)
SELinux status:                 enabled
Loaded policy name:             targeted
Current mode:                   enforcing
Mode from config file:          enforcing
~~~

| الوضع | بيعمل إيه |
|---|---|
| [[Enforcing]] | بيمنع ويسجّل (ده اللي عايزه) |
| [[Permissive]] | بيسجّل بس. [[sudo setenforce 0]] بيحوّله لحد الريستارت، للتشخيص بس |
| [[Disabled]] | مقفول خالص. ورجوعه بيحتاج relabel لكل الديسك |

---

## ٣. Docker: [[docker info --format '{{json .SecurityOptions}}']]

[[--format]] بياخد template (لغة Go)، و [[{{json .SecurityOptions}}]] يعني «اطبع خانة SecurityOptions كـ JSON».

~~~text الناتج (Docker Desktop 29.6.1)
["name=seccomp,profile=builtin","name=cgroupns"]
~~~

مفيش [[apparmor]] ولا [[selinux]]: الكونتينرات هنا محمية بـ seccomp (فلتر للـ system calls) بس. وعلى VPS أوبونتو عليه Docker هتلاقي [[name=apparmor]] في القايمة، وعلى RHEL مع [[--selinux-enabled]] هتلاقي [[name=selinux]] (من دليل Docker).

---

## AppArmor ولا SELinux؟

| | AppArmor | SELinux |
|---|---|---|
| التوزيعات | أوبونتو و Debian و SUSE | RHEL و Rocky و AlmaLinux و Fedora |
| بيعرف الملف بـ | المسار | الـ label اللي على الملف |
| الإعداد | ملف نصي لكل برنامج في [[/etc/apparmor.d/]] | سياسة جاهزة + labels + booleans |
| الحالة | [[aa-status]] | [[getenforce]] / [[sestatus]] |
| الوضع الهادي | complain | permissive |
| اللوج | [[apparmor="DENIED"]] في [[journalctl -k]] | [[type=AVC]] في [[/var/log/audit/audit.log]] |

---

## الخلاصة

~~~text
DAC = chmod/chown         MAC = قواعد لكل برنامج في الكيرنل، فوق DAC
أوبونتو → AppArmor         RHEL وأخواتها → SELinux
aa-status / getenforce    هو شغال فعلًا؟ (متفترضش)
enforce / complain         امنع / سجّل بس
setenforce 0               للتشخيص دقايق، مش حل
~~~`,
        lines: [
          "أوبونتو: حالة AppArmor وكل الـ profiles ووضع كل واحد.",
          "أوبونتو: AppArmor شغال؟ [[Yes]] أو السبب لو لأ.",
          "RHEL وأخواتها: وضع SELinux في كلمة ([[Enforcing]] أو [[Permissive]] أو [[Disabled]]).",
          "RHEL: تفاصيل أكتر: السياسة والوضع الحالي ووضع ملف الإعداد.",
          "Docker: الحمايات اللي بيشغّل بيها الكونتينرات ([[apparmor]] أو [[selinux]] و [[seccomp]])."
        ],
        sol: R`في المعمل (Docker Desktop، كيرنل WSL2): [[aa-status]] طبع [[apparmor module is loaded.]] و [[apparmor filesystem is not mounted.]]، و [[aa-enabled]] طبع [[No - disabled at boot.]]، و [[getenforce]] طبع [[Disabled]] رغم إن [[/etc/selinux/config]] فيه [[SELINUX=enforcing]]، و [[docker info]] طبع [[["name=seccomp,profile=builtin","name=cgroupns"]]] من غير apparmor.

على VPS أوبونتو هتلاقي [[aa-enabled]] بيقول [[Yes]] وعشرات الـ profiles في enforce، وعلى AlmaLinux أو Rocky هتلاقي [[getenforce]] بيقول [[Enforcing]] (من دليل أوبونتو و RHEL).`
      },
      {
        cmd: "aa-complain / aa-enforce",
        title: "AppArmor profile: اكتبه، جرّبه في complain، وبعدين enforce",
        desc: R`الـ profile ملف في [[/etc/apparmor.d/]] بيقول البرنامج ده يقرا ويكتب إيه ويستخدم أنهي شبكة. بتبدأه في وضع **complain** (يسجّل بس)، تشغّل التطبيق عادي وتشوف اللوج، تزوّد اللي ناقص (بإيدك أو بـ [[aa-logprof]])، وبعدين [[aa-enforce]]. و [[apparmor_parser]] بيترجم الملف ويحمّله في الكيرنل.`,
        example: R`sudo apt install -y apparmor-utils
sudo apparmor_parser -Q -K -T /etc/apparmor.d/opt.myapp.bin.server
sudo aa-complain /etc/apparmor.d/opt.myapp.bin.server
sudo journalctl -k | grep 'apparmor="ALLOWED"'
sudo aa-logprof
sudo aa-enforce /etc/apparmor.d/opt.myapp.bin.server`,
        try: "اكتب profile لسكربت صغير، اعمل له syntax check بـ [[apparmor_parser -Q]]، وبعدين شيل فاصلة من آخر سطر وشوف رسالة الخطأ. ولو عندك VPS أوبونتو: حمّله في complain وشوف اللوج وبعدين enforce.",
        deep: {
          why: R`الـ profiles الجاهزة بتغطي برامج النظام وشوية خدمات، لكن تطبيقك (Node أو Python أو binary بتاع Go) شغال unconfined. profile بسيط ليه بيحدد الفولدرات اللي يلمسها، فلو حد استغل ثغرة فيه مش هيوصل لـ [[/etc/shadow]] أو مفاتيح SSH.`,
          how: R`الـ profile ليه اسم ومسار البرنامج اللي بيتربط بيه. أي process بيشتغل من المسار ده بيدخل الـ profile. جواه قواعد: مسار + صلاحيات ([[r]] قراية، [[w]] كتابة، [[m]] تحميل في الذاكرة لمكتبات، [[ix]] تشغيل برنامج تاني جوه نفس الـ profile)، و [[network]]، و [[capability]] (صلاحيات root متقسمة زي [[net_bind_service]] للبورتات تحت 1024)، و [[deny]] للمنع الصريح (بيغلب أي allow). و [[include <abstractions/base>]] بيجيب قواعد جاهزة لأي برنامج (مكتبات C والـ locale).

[[aa-complain]] و [[aa-enforce]] بيعدّلوا [[flags=(complain)]] في الملف ويعيدوا تحميله. وفي complain كل حاجة كانت هتتمنع بتعدّي وبتتسجّل [[apparmor="ALLOWED"]]، وفي enforce بتتمنع وتتسجّل [[apparmor="DENIED"]]. و [[aa-logprof]] بيقرا السطور دي ويسألك لكل واحدة: أسمح؟ أمنع؟ بمسار عام ولا محدد؟ ويكتب الإجابات في الـ profile.`,
          when: "لتطبيق شغال على السيرفر مباشرة (مش في Docker) وبيستقبل طلبات من النت. ولما برنامج بيقع بـ Permission denied على أوبونتو والصلاحيات العادية مظبوطة: [[journalctl -k | grep DENIED]].",
          mistakes: R`تحط profile على enforce من أول يوم من غير complain، فالتطبيق يقع في أول عملية مش متوقعة (كتابة في [[/tmp]] مثلًا). تنسى الفاصلة في آخر كل قاعدة: [[missing an end of line character?]]. تعدّل الملف وتنسى [[apparmor_parser -r]] أو [[systemctl reload apparmor]] فالقديم يفضل شغال. وتعدّل profile جاهز من التوزيعة مكانه: التحديث يكتب فوقه، استخدم [[/etc/apparmor.d/local/<اسم>]] اللي الـ profiles الجاهزة بتعمله include.`
        },
        teach: R`## الأول: الـ profile ملف نصي

اتجرّب على كونتينر [[ubuntu:24.04]] فيه [[apparmor]] و [[apparmor-utils]] نسخة [[4.0.1]]. الكيرنل بتاع Docker Desktop مش مشغّل AppArmor، فاللي اتعمل فعلًا: كتابة الـ profile، و [[apparmor_parser]] بيترجمه ويكشف الغلطات من غير ما يحمّله، و [[aa-complain]] و [[aa-enforce]] بيعدّلوا الملف. التحميل في الكيرنل واللوج و [[aa-logprof]] من دليل أوبونتو.

---

## ١. الـ profile

تطبيق في [[/opt/myapp/bin/server]] بيقرا ملفاته من [[/opt/myapp]] ويكتب بياناته في [[/var/lib/myapp]] ولوجه في [[/var/log/myapp]]. اسم الملف هو المسار بنقط بدل [[/]]:

~~~text /etc/apparmor.d/opt.myapp.bin.server
abi <abi/4.0>,
include <tunables/global>

profile myapp /opt/myapp/bin/server flags=(complain) {
  include <abstractions/base>
  include <abstractions/nameservice>

  /opt/myapp/** r,
  /opt/myapp/bin/server ix,
  /var/lib/myapp/** rw,
  /var/log/myapp/*.log w,
  network inet stream,
  deny /etc/shadow r,
}
~~~

| السطر | معناه |
|---|---|
| [[abi <abi/4.0>,]] | الملف مكتوب بصيغة AppArmor 4 |
| [[include <tunables/global>]] | متغيرات جاهزة زي [[@{HOME}]] |
| [[profile myapp /opt/myapp/bin/server]] | اسمه [[myapp]]، وبيتطبق على أي حاجة بتشتغل من المسار ده |
| [[flags=(complain)]] | ابدأ في complain |
| [[abstractions/base]] | اللي أي برنامج محتاجه (مكتبات C و [[/dev/null]] ...) |
| [[abstractions/nameservice]] | DNS و [[/etc/hosts]] و [[/etc/passwd]] |
| [[/opt/myapp/** r,]] | اقرا أي حاجة تحت [[/opt/myapp]]. [[**]] = أي عمق، [[*]] = جوه فولدر واحد |
| [[/opt/myapp/bin/server ix,]] | يشغّل نفسه (x) جوه نفس الـ profile (i = inherit) |
| [[/var/lib/myapp/** rw,]] | قراية وكتابة في البيانات |
| [[/var/log/myapp/*.log w,]] | يكتب ملفات اللوج بس |
| [[network inet stream,]] | TCP على IPv4 (stream = TCP) |
| [[deny /etc/shadow r,]] | منع صريح، ومش بيتسجّل كل مرة |

وكل قاعدة لازم تخلص بـ [[,]].

---

## ٢. [[sudo apparmor_parser -Q -K -T <file>]]: syntax check

| الخيار | معناه |
|---|---|
| [[-Q]] | ترجم بس، متحمّلش في الكيرنل (skip kernel load) |
| [[-K]] | متكتبش في الـ cache |
| [[-T]] | متقراش من الـ cache |

~~~text الناتج (الملف سليم)
Cache read/write disabled: interface file missing. (Kernel needs AppArmor 2.4 compatibility patch.)
~~~

و [[echo $?]] بعدها [[0]]. السطر ده تحذير بس عشان الكيرنل مش مشغّل AppArmor. وشلت الفاصلة من آخر [[/var/lib/myapp/** rw,]]:

~~~text الناتج
AppArmor parser error for /etc/apparmor.d/opt.myapp.bin.server in profile /etc/apparmor.d/opt.myapp.bin.server at line 11: missing an end of line character? (entry: /var/lib/myapp/**)
~~~

و [[$?]] = [[1]]. على VPS بتحمّل الـ profile (أو تعيد تحميله بعد تعديل) بـ [[sudo apparmor_parser -r <file>]] (r = replace). في المعمل ده وقع بـ [[unable to find a suitable fs in /proc/mounts]].

---

## ٣. [[aa-complain]] و [[aa-enforce]]

بياخدوا مسار الـ profile (أو مسار البرنامج نفسه). في المعمل [[aa-enforce]] طبع [[Setting /etc/apparmor.d/opt.myapp.bin.server to enforce mode.]] وشال [[flags=(complain)]] من الملف، و [[aa-complain]] رجّعها، وبعدين الاتنين وقعوا عند التحميل في الكيرنل لنفس السبب.

~~~text grep "profile myapp" قبل وبعد
profile myapp /opt/myapp/bin/server {                     بعد aa-enforce
profile myapp /opt/myapp/bin/server flags=(complain) {    بعد aa-complain
~~~

و [[aa-complain myapp]] (بالاسم) مااشتغلش: [[Can't find myapp in the system path list]]: الأمر عايز مسار ملف أو برنامج.

---

## ٤. [[journalctl -k | grep 'apparmor="ALLOWED"']]: التطبيق محتاج إيه

[[-k]] رسايل الكيرنل بس. في complain، كل حاجة مش في الـ profile بتطلع سطر زي ده (الشكل من دليل أوبونتو):

~~~text مثال سطر
audit: type=1400 audit(...): apparmor="ALLOWED" operation="open" profile="myapp" name="/etc/ssl/openssl.cnf" pid=1234 comm="server" requested_mask="r" denied_mask="r" fsuid=1001 ouid=0
~~~

| الحتة | معناها |
|---|---|
| [[apparmor="ALLOWED"]] | كان هيتمنع لو enforce. في enforce بتبقى [[DENIED]] |
| [[operation="open"]] | فتح ملف |
| [[profile="myapp"]] | مين |
| [[name=...]] | الملف |
| [[requested_mask="r"]] | كان عايز يقرا |

يعني لازم تزوّد [[/etc/ssl/openssl.cnf r,]] (أو [[include <abstractions/openssl>]]).

---

## ٥. [[sudo aa-logprof]] ثم [[aa-enforce]]

[[aa-logprof]] بيقرا السطور دي ويعرض كل واحدة ويسألك: [[(A)llow]] و [[(D)eny]] و [[(G)lob]] (عمّم المسار بـ [[*]]) و [[(S)ave]] في الآخر. شغّل التطبيق في complain يوم أو اتنين بكل الحالات (رفع ملف، إيميل، باك أب)، وبعدين [[aa-logprof]]، وبعدين [[aa-enforce]]، وراقب [[DENIED]].

---

## الخلاصة

~~~text
/etc/apparmor.d/<path.with.dots>      الـ profile
مسار + r/w/m/ix + ,                    القاعدة
apparmor_parser -Q -K -T               syntax check
apparmor_parser -r                     حمّل / أعد التحميل
aa-complain → شغّل → aa-logprof → aa-enforce   الترتيب
journalctl -k | grep apparmor=         ALLOWED في complain، DENIED في enforce
~~~`,
        lines: [
          "سطّب أدوات [[aa-complain]] و [[aa-enforce]] و [[aa-logprof]].",
          "ترجم الـ profile واكشف أي غلطة من غير ما تحمّله في الكيرنل.",
          "حط الـ profile في complain: يسجّل بس، ميمنعش.",
          "شوف العمليات اللي كانت هتتمنع (سطور [[ALLOWED]] من الكيرنل).",
          "حوّل السطور دي لقواعد في الـ profile بأسئلة تفاعلية.",
          "شغّل المنع الحقيقي."
        ],
        sol: R`في المعمل ([[apparmor 4.0.1]] على [[ubuntu:24.04]]): [[apparmor_parser -Q -K -T]] رجّع [[0]] للملف السليم، ولما شلت فاصلة طبع [[AppArmor parser error ... at line 11: missing an end of line character? (entry: /var/lib/myapp/**)]] ورجّع [[1]]. [[aa-enforce]] طبع [[Setting /etc/apparmor.d/opt.myapp.bin.server to enforce mode.]] وشال [[flags=(complain)]]، و [[aa-complain]] رجّعها، والتحميل في الكيرنل وقع لأن Docker Desktop مش مشغّل AppArmor.

على VPS أوبونتو (من الدليل): بعد [[aa-enforce]]، [[aa-status]] بيعرض [[myapp]] تحت [[profiles are in enforce mode]]، وأي عملية برّه الـ profile بتطلع [[apparmor="DENIED"]] في [[journalctl -k]] والتطبيق ياخد [[Permission denied]].`
      },
      {
        cmd: "docker --security-opt apparmor",
        title: "AppArmor للكونتينرات: docker-default و profile خاص",
        desc: R`على أوبونتو، Docker بيحط كل كونتينر في profile اسمه [[docker-default]] لوحده: بيمنع الكونتينر يكتب في [[/proc]] و [[/sys]] الحساسة ويعمل [[mount]]. ولو عايز تقفل أكتر (مثلًا Nginx ميكتبش في فولدر الموقع)، اكتب profile وحمّله بـ [[apparmor_parser]] وشغّل الكونتينر بـ [[--security-opt apparmor=<اسم>]].

على Docker Desktop (ويندوز والماك) AppArmor مقفول في الكيرنل، والخيار ده بيتقبل ومبيعملش حاجة.`,
        example: R`docker info --format '{{json .SecurityOptions}}'
sudo apparmor_parser -r -W /etc/apparmor.d/containers-docker-nginx
docker run -d --name web --security-opt apparmor=docker-nginx -p 8080:80 nginx:alpine
docker inspect --format '{{.AppArmorProfile}}' web
docker exec web sh -c 'echo hacked > /usr/share/nginx/html/index.html'`,
        try: "على VPS أوبونتو عليه Docker: شغّل كونتينر عادي واعرف الـ profile بتاعه بـ docker inspect. وبعدين حمّل profile الـ nginx ده وشغّل بيه كونتينر وجرّب تكتب في فولدر الموقع.",
        deep: {
          why: R`الكونتينر مش sandbox كامل: بيشارك الكيرنل مع السيرفر. لو حد كسر تطبيق جوه كونتينر وفيه ثغرة في الكيرنل أو إعداد غلط ([[--privileged]] أو docker.sock متركّب)، ممكن يطلع للسيرفر. [[docker-default]] بيقفل أشهر الطرق دي، والـ profile الخاص بيقلل اللي الكونتينر يقدر يعمله لو اتخترق: Nginx اتخترق؟ ميقدرش يغيّر صفحات الموقع.`,
          how: R`Docker لما يلاقي AppArmor شغال في الكيرنل بيولّد [[docker-default]] من template جوه Docker نفسه ويحمّله، ويحطه على كل كونتينر مش محدد غيره. و [[--security-opt apparmor=X]] بيقول «استخدم الـ profile اللي اسمه X» (لازم يكون متحمّل في الكيرنل قبلها)، و [[apparmor=unconfined]] بيشيل الحماية (متعملهاش).

والـ profile بتاع كونتينر مش بيتربط بمسار برنامج: [[profile docker-nginx flags=(attach_disconnected,mediate_deleted)]] من غير مسار، و Docker هو اللي بيحط الكونتينر فيه. [[attach_disconnected]] و [[mediate_deleted]] لازمين عشان مسارات الكونتينر مش بتتشاف من السيرفر بنفس الشكل.

وفي compose: [[security_opt: ["apparmor=docker-nginx"]]].`,
          when: "كونتينر بيستقبل طلبات من النت مباشرة (Nginx أو Caddy أو تطبيقك) على سيرفر أوبونتو. والأهم من الـ profile الخاص: متشغّلش [[--privileged]] ولا [[apparmor=unconfined]] من غير سبب حقيقي.",
          mistakes: R`تجرّب على Docker Desktop وتفتكر إن الحماية شغالة لأن [[docker run]] مطلعش error: في المعمل [[--security-opt apparmor=my-nginx-profile]] (اسم مش موجود أصلًا) اشتغل عادي. اتأكد بـ [[docker info]] و [[docker inspect]]. تشغّل الكونتينر قبل ما تحمّل الـ profile على VPS: Docker بيرفض بـ error إن الـ profile مش موجود. وتحط [[deny]] على مسار Nginx محتاجه (زي [[/var/cache/nginx]]) فالكونتينر يقع: جرّبه وبص على [[docker logs]] و [[journalctl -k]].`
        },
        teach: R`## الأول: إيه اللي اتجرّب وإيه اللي من الدليل

اتجرّب على Docker Desktop [[29.6.1]] (كيرنل WSL2، AppArmor مقفول): [[docker info]] و [[docker inspect]] و [[docker run --security-opt]] و [[docker exec]]، والـ profile اتعمل له syntax check بـ [[apparmor_parser -Q]] في كونتينر أوبونتو. تحميله ومنع الكتابة فعلًا من دليل Docker عن AppArmor ودليل أوبونتو.

---

## ١. [[docker info --format '{{json .SecurityOptions}}']]

~~~text الناتج على Docker Desktop
["name=seccomp,profile=builtin","name=cgroupns"]
~~~

على VPS أوبونتو هتلاقي كمان [[name=apparmor]]. لو مش موجودة، كل اللي تحت مش هيعمل حاجة.

---

## ٢. الـ profile و [[apparmor_parser -r -W]]

~~~text /etc/apparmor.d/containers-docker-nginx
include <tunables/global>

profile docker-nginx flags=(attach_disconnected,mediate_deleted) {
  include <abstractions/base>

  network inet tcp,
  network inet6 tcp,
  file,

  deny /etc/shadow r,
  deny /root/** rwlx,
  deny /usr/share/nginx/html/** w,
  deny mount,

  capability chown,
  capability dac_override,
  capability setuid,
  capability setgid,
  capability net_bind_service,
}
~~~

| القاعدة | ليه |
|---|---|
| [[network inet tcp,]] و [[inet6]] | Nginx محتاج TCP بس |
| [[file,]] | اسمح بالملفات عمومًا (جوه الكونتينر)... |
| [[deny ... w,]] | ...إلا الكتابة في فولدر الموقع، وده الهدف |
| [[deny mount,]] | ممنوع يعمل mount |
| [[capability ...]] | صلاحيات root اللي Nginx محتاجها وبس: يغيّر صاحب ملفات، ويبدّل لليوزر [[nginx]]، ويفتح بورت 80 ([[net_bind_service]]) |

اتعمل له [[apparmor_parser -Q -K -T]] ورجّع [[0]] (سليم). وعلى VPS:

| الخيار | معناه |
|---|---|
| [[-r]] | حمّل أو استبدل لو موجود |
| [[-W]] | اكتب النسخة المترجمة في الـ cache، عشان تتحمّل أسرع بعد الريستارت |

في المعمل [[-r]] وقع بـ [[unable to find a suitable fs in /proc/mounts]]: مفيش AppArmor في الكيرنل.

---

## ٣. [[docker run ... --security-opt apparmor=docker-nginx]]

اتشغّل (باسم [[b2c-ngx]] ومن غير [[-p]]) واشتغل عادي. وبعدين:

~~~text docker inspect --format '{{.AppArmorProfile}}|{{.HostConfig.SecurityOpt}}'
|[apparmor=docker-nginx]
~~~

قبل [[|]]: الـ profile اللي اتطبّق فعلًا = **فاضي**. بعدها: اللي انت طلبته. Docker Desktop سجّل الطلب ومطبّقهوش. وعلى VPS أوبونتو (من الدليل) [[{{.AppArmorProfile}}]] بيطبع [[docker-default]] لأي كونتينر عادي، و [[docker-nginx]] للكونتينر ده.

> كمان جرّبت [[--security-opt apparmor=my-nginx-profile]] على Docker Desktop (اسم مش موجود) واشتغل من غير أي رسالة. على أوبونتو نفس الأمر بيقع بـ error إن الـ profile مش موجود.

---

## ٤. [[docker exec web sh -c 'echo hacked > ...']]: الاختبار

على Docker Desktop:

~~~text cat /usr/share/nginx/html/index.html بعدها
hacked
~~~

الكتابة عدّت لأن مفيش AppArmor. على VPS أوبونتو والـ profile متحمّل، نفس الأمر بيرجع [[Permission denied]] من [[sh]]، وبيطلع سطر [[apparmor="DENIED"]] و [[profile="docker-nginx"]] في [[journalctl -k]] (من الدليل). يعني حتى لو حد نفّذ أوامر جوه Nginx، ميقدرش يغيّر الموقع.

---

## الخلاصة

~~~text
docker info ... SecurityOptions     apparmor موجودة؟ (على Docker Desktop: لأ)
docker-default                      بيتحط لوحده على كل كونتينر في أوبونتو
apparmor_parser -r -W <file>        حمّل profile خاص
--security-opt apparmor=<name>      استخدمه (compose: security_opt)
docker inspect {{.AppArmorProfile}} اللي اتطبّق فعلًا، مش اللي طلبته
apparmor=unconfined / --privileged  متعملهمش
~~~`,
        lines: [
          "الحمايات اللي Docker شغال بيها. لازم تلاقي [[name=apparmor]].",
          "حمّل الـ profile في الكيرنل ([[-r]] استبدل لو موجود، و [[-W]] اكتب الـ cache).",
          "شغّل Nginx جوه الـ profile ده بدل [[docker-default]].",
          "الـ profile اللي اتطبّق فعلًا على الكونتينر.",
          "جرّب تكتب في فولدر الموقع: لازم [[Permission denied]] لو الحماية شغالة."
        ],
        sol: R`على Docker Desktop: [[docker info]] رجّع [[["name=seccomp,profile=builtin","name=cgroupns"]]]، والكونتينر اشتغل بـ [[--security-opt apparmor=docker-nginx]]، و [[docker inspect]] رجّع [[AppArmorProfile]] فاضي و [[SecurityOpt]] = [[[apparmor=docker-nginx]]]، والكتابة نجحت ([[hacked]]): الحماية مش شغالة هنا.

على VPS أوبونتو (من دليل Docker و أوبونتو): [[docker inspect]] بيرجّع [[docker-nginx]]، والكتابة بترجع [[Permission denied]]، وكونتينر عادي بيرجّع [[docker-default]].`
      },
      {
        cmd: "ls -Z / restorecon",
        title: "SELinux labels: ليه الملف ده ممنوع، وإزاي ترجّع الـ label الصح",
        desc: R`في SELinux كل ملف عليه label (context) زي [[httpd_sys_content_t]]، و Nginx (اللي شغال كـ [[httpd_t]]) مسموحله يقرا labels معينة بس. [[ls -Z]] بيوريك الـ label، و [[matchpathcon]] بيقولك المفروض يبقى إيه. [[restorecon]] بيرجّع الـ label الصح حسب قواعد السياسة، و [[semanage fcontext -a]] بيضيف قاعدة لفولدر جديد عشان [[restorecon]] يعرفه.

[[chcon]] بيغيّر الـ label بإيده، بس أول relabel للسيستم بيرجّعه، فاستخدمه للتجربة بس.`,
        example: R`getenforce
ls -Z /srv/site/index.html
matchpathcon /var/www/html/index.html /srv/site/index.html
sudo chcon -t httpd_sys_content_t /srv/site/index.html
sudo semanage fcontext -a -t httpd_sys_content_t "/srv/site(/.*)?"
sudo restorecon -Rv /srv/site`,
        try: "على AlmaLinux أو Rocky (أو كونتينر almalinux:10 بأدوات SELinux) قارن label فولدر [[/var/www/html]] بفولدر جديد في [[/srv]] بـ [[matchpathcon]]، وضيف قاعدة للفولدر الجديد واتأكد إن [[matchpathcon]] بقى يقول [[httpd_sys_content_t]].",
        deep: {
          why: R`أشهر مشكلة على RHEL وأخواتها: تحط الموقع في [[/srv/site]] أو [[/home/deploy/site]]، والصلاحيات [[755]] و [[644]] مظبوطة، و Nginx يرجّع 403 و [[Permission denied]] في اللوج. السبب إن الملفات عليها label [[var_t]] أو [[user_home_t]] مش [[httpd_sys_content_t]]. والحل الغلط اللي الناس بتعمله: [[setenforce 0]].`,
          how: R`الـ context ٤ حتت مفصولين بـ [[:]]: [[user:role:type:level]]، زي [[system_u:object_r:httpd_sys_content_t:s0]]. في الوضع [[targeted]] المهم هو التالت: الـ **type**. والسياسة بتقول process من type [[httpd_t]] يقرا ملفات type [[httpd_sys_content_t]] ويكتب في [[httpd_sys_rw_content_t]] ويكتب لوج في [[httpd_log_t]].

الملف الجديد بياخد label الفولدر اللي اتعمل فيه. فـ [[cp]] لـ [[/var/www/html]] بياخد الصح، لكن [[mv]] من [[/home]] بيفضل شايل [[user_home_t]] (mv مش بيغيّر الـ label). والسياسة فيها قايمة regex بالمسارات والـ labels المفروضة ([[semanage fcontext -l]])، و [[restorecon]] بيطبّقها. و [[semanage fcontext -a]] بيضيف قاعدة بتاعتك في نفس القايمة، فتفضل بعد أي relabel.

وفي Docker على RHEL: [[-v /srv/data:/data:Z]] بيخلي Docker يحط label مناسب على الفولدر عشان الكونتينر يقراه.`,
          when: "كل ما تحط ملفات خدمة (موقع، رفع ملفات، لوج) في مسار مش الافتراضي على سيرفر عليه SELinux.",
          mistakes: R`[[chcon]] وتمشي: يشتغل النهارده ويقع بعد أول [[restorecon]] أو relabel. [[semanage fcontext]] من غير [[restorecon]] بعدها: القاعدة اتضافت بس الملفات الموجودة لسه بالـ label القديم. الـ regex من غير [[(/.*)?]] فبيطبق على الفولدر بس مش اللي جواه. و [[mv]] من الـ home بدل [[cp]] (أو [[mv]] وبعدها [[restorecon]]).`
        },
        teach: R`## الأول: الـ label هو المهم، مش المسار

اتجرّب على كونتينر [[almalinux:10]] (AlmaLinux [[10.2]]) فيه [[selinux-policy-targeted]] [[42.1.18]] و [[policycoreutils]] [[3.10]]. الكيرنل بتاع Docker Desktop مش مشغّل SELinux، فالأوامر اللي بتقرا السياسة ([[matchpathcon]] و [[semanage]]) اشتغلت بجد على سياسة AlmaLinux الحقيقية، واللي بتقرا أو تغيّر labels على الملفات نفسها طلعت «SELinux مقفول». ناتجها على سيرفر حقيقي من دليل RHEL.

---

## ١. [[getenforce]]

على سيرفر RHEL هيبقى [[Enforcing]]. في المعمل [[Disabled]] (شوف درس «MAC»).

---

## ٢. [[ls -Z]]: الـ label اللي على الملف

[[-Z]] زوّد عمود الـ context. في المعمل:

~~~text الناتج (SELinux مقفول)
? /srv/site/index.html
~~~

[[?]] يعني مفيش label، لأن الكيرنل مش مشغّل SELinux. على سيرفر شغال عليه (من الدليل):

~~~text الناتج على RHEL
unconfined_u:object_r:var_t:s0 /srv/site/index.html
~~~

| الحتة | معناها |
|---|---|
| [[unconfined_u]] | SELinux user (مش يوزر لينكس) |
| [[object_r]] | الـ role. الملفات دايمًا [[object_r]] |
| [[var_t]] | **الـ type، وده اللي بيفرق** |
| [[s0]] | المستوى (MLS). في targeted دايمًا [[s0]] |

و [[ps -eZ]] بيعرض الـ context بتاع الـ processes، و Nginx هتلاقيه [[system_u:system_r:httpd_t:s0]].

---

## ٣. [[matchpathcon]]: المفروض يبقى إيه؟

بيسأل قواعد السياسة: الملف ده في المسار ده المفروض label بتاعه إيه؟

~~~text الناتج (اشتغل بجد)
/var/www/html/index.html	system_u:object_r:httpd_sys_content_t:s0
/srv/site/index.html	system_u:object_r:var_t:s0
~~~

هنا المشكلة كلها: نفس الملف في [[/var/www/html]] المفروض [[httpd_sys_content_t]] (Nginx يقراه)، وفي [[/srv/site]] المفروض [[var_t]] (Nginx ميقراهوش). وده من القواعد:

~~~text semanage fcontext -l | grep '^/srv' (أول سطور)
/srv                                     all files   system_u:object_r:var_t:s0
/srv/([^/]*/)?www(/.*)?                  all files   system_u:object_r:httpd_sys_content_t:s0
/srv/.*                                  all files   system_u:object_r:var_t:s0
~~~

يعني لو سمّيت الفولدر [[/srv/www]] كان هياخد label الويب لوحده. و [[/srv/site]] بيقع تحت [[/srv/.*]] = [[var_t]].

---

## ٤. [[sudo chcon -t httpd_sys_content_t <file>]]: الحل المؤقت

[[chcon]] (change context) و [[-t]] غيّر الـ type بس. على RHEL بيشتغل فورًا، وبعدها Nginx يقرا. لكن:

- مش متسجّل في القواعد، فأول [[restorecon]] أو relabel للسيستم بيرجّعه [[var_t]].
- في المعمل وقع: [[chcon: can't apply partial context to unlabeled file '/srv/site/index.html']]، لأن الملف أصلًا مالوش label (SELinux مقفول).

استخدمه تجربة سريعة: «لو غيّرت الـ label المشكلة تتحل؟»، وبعدين الحل الدائم.

---

## ٥. [[sudo semanage fcontext -a -t httpd_sys_content_t "/srv/site(/.*)?"]]: الحل الدائم

| الحتة | معناها |
|---|---|
| [[semanage fcontext]] | إدارة قواعد labels الملفات (من باكدج [[policycoreutils-python-utils]]) |
| [[-a]] | add: ضيف قاعدة |
| [[-t httpd_sys_content_t]] | الـ type المطلوب |
| [[(/.*)?]] | regex: الفولدر نفسه، **وكل اللي جواه** |

بعدها:

~~~text semanage fcontext -l -C
SELinux fcontext                                   type               Context

/srv/site(/.*)?                                    all files          system_u:object_r:httpd_sys_content_t:s0
~~~

[[-C]] = القواعد اللي انت ضفتها بس (customizations). و [[matchpathcon /srv/site/index.html]] بقى يطبع [[httpd_sys_content_t]]. ولفولدر Nginx يكتب فيه (رفع ملفات) استخدم [[httpd_sys_rw_content_t]].

---

## ٦. [[sudo restorecon -Rv /srv/site]]: طبّق

| الخيار | معناه |
|---|---|
| [[-R]] | لكل اللي جوه الفولدر |
| [[-v]] | اطبع كل ملف اتغيّر |

في المعمل مطبعش حاجة (مفيش labels). على RHEL (من الدليل) بيطبع لكل ملف سطر زي:

~~~text الناتج على RHEL
Relabeled /srv/site/index.html from unconfined_u:object_r:var_t:s0 to unconfined_u:object_r:httpd_sys_content_t:s0
~~~

---

## الخلاصة

~~~text
ls -Z / ps -eZ                     الـ label على الملف / الـ process
user:role:TYPE:level                الـ type هو المهم
matchpathcon                        المفروض يبقى إيه حسب القواعد
chcon -t                            تجربة سريعة، بتضيع مع relabel
semanage fcontext -a -t T "dir(/.*)?"  قاعدة دائمة
restorecon -Rv dir                  طبّق القواعد على الملفات
mv بيحتفظ بالـ label، cp بياخد label الفولدر
~~~`,
        lines: [
          "SELinux شغال؟ لازم [[Enforcing]] عشان المشكلة دي تظهر.",
          "الـ label اللي على الملف دلوقتي (عمود الـ context).",
          "قواعد السياسة بتقول الملفين دول المفروض label بتاعهم إيه.",
          "حل مؤقت: غيّر الـ type بإيدك (بيضيع مع أول relabel).",
          "حل دائم: ضيف قاعدة إن الفولدر وكل اللي جواه [[httpd_sys_content_t]].",
          "طبّق القواعد على الملفات الموجودة واطبع اللي اتغيّر."
        ],
        sol: R`على [[almalinux:10]] جوه Docker Desktop: [[getenforce]] = [[Disabled]]، و [[ls -Z]] = [[?]]، و [[matchpathcon]] طبع [[httpd_sys_content_t]] لـ [[/var/www/html/index.html]] و [[var_t]] لـ [[/srv/site/index.html]]. [[chcon]] وقع بـ [[can't apply partial context to unlabeled file]]. [[semanage fcontext -a]] نجح، و [[semanage fcontext -l -C]] عرض القاعدة، و [[matchpathcon]] بعدها بقى [[httpd_sys_content_t]].

على RHEL أو Rocky شغال عليه SELinux (من الدليل): [[ls -Z]] قبل = [[var_t]]، و [[restorecon -Rv]] بيطبع [[Relabeled ... from ...var_t... to ...httpd_sys_content_t...]]، وبعدها Nginx بيقرا الملف.`
      },
      {
        cmd: "audit2why",
        title: "«Permission denied والـ chmod مظبوط»: اقرا رفض SELinux وصلّحه صح",
        desc: R`لما SELinux يمنع حاجة بيكتب سطر [[type=AVC]] في [[/var/log/audit/audit.log]]. [[ausearch -m AVC -ts recent]] بيجيب الأسطر دي، و [[audit2why]] بيترجمها: السبب label غلط؟ ولا boolean مقفول؟ وأحيانًا بيقولك الأمر بالظبط، زي [[setsebool -P httpd_can_network_connect 1]] عشان Nginx يقدر يكلّم تطبيقك على بورت 3000.

الـ booleans مفاتيح جاهزة في السياسة لحالات مشهورة. [[audit2allow]] (يعمل module يسمح بأي حاجة) آخر حل مش أول حل.`,
        example: R`sudo ausearch -m AVC -ts recent
sudo ausearch -m AVC -ts recent | audit2why
getsebool httpd_can_network_connect
sudo setsebool -P httpd_can_network_connect 1
sudo semanage boolean -l | grep httpd_can_network`,
        try: "خد سطري الـ AVC اللي في الشرح، حطهم في ملف، وشغّل [[audit2why -i]] عليهم على AlmaLinux أو Rocky (أو كونتينر almalinux:10 بأدوات SELinux مع [[-p]] لملف السياسة)، وقارن الاتنين: أنهي بيقولك boolean وأنهي بيقولك allow rule؟ وإيه الحل الصح لكل واحد؟",
        deep: {
          why: R`بدل ما تخمّن أو تقفل SELinux، اللوج بيقولك بالظبط: مين ([[comm="nginx"]] و [[scontext=...httpd_t]])، عمل إيه ([[{ read }]] أو [[{ name_connect }]])، على إيه ([[tcontext=...var_t]] أو [[dest=3000]]). ومن غير كده هتفضل ساعات تعدّل chmod و chown على ملفات صلاحياتها مظبوطة أصلًا.`,
          how: R`SELinux بيسجّل كل رفض في الـ audit log (من خدمة [[auditd]]). [[ausearch]] بيفلتره: [[-m AVC]] نوع الرسالة (Access Vector Cache، يعني قرار سماح أو منع)، و [[-ts recent]] آخر ١٠ دقايق ([[today]] و [[boot]] كمان). و [[audit2why]] بيقارن كل سطر بالسياسة المتحمّلة: لو فيه boolean لو اتفتح يسمح بالعملية دي بيقولك اسمه، ولو مفيش بيقولك [[Missing type enforcement (TE) allow rule]].

والسطر التاني ده محتاج تفكير: معناه إن السياسة مفيهاش قاعدة بتسمح لـ [[httpd_t]] يقرا [[var_t]]. [[audit2allow]] هيعملك القاعدة دي، بس ده معناه «Nginx يقرا أي ملف [[var_t]] في السيرفر كله»، والحل الصح إن ملفات الموقع تاخد label الويب (الدرس اللي فات). القاعدة: [[tcontext]] غلط = صلّح الـ label، boolean = افتحه، غير كده = فكّر قبل [[audit2allow]].

و [[setsebool -P]] الـ [[-P]] (persistent) بيكتبه في السياسة فيفضل بعد الريستارت، ومن غيرها بيرجع.`,
          when: "أي Permission denied أو 403 أو 502 على RHEL وأخواتها والصلاحيات العادية مظبوطة. أشهر الحالات: Nginx reverse proxy لتطبيق على بورت (boolean)، موقع في مسار جديد (label)، تطبيق بيكلّم قاعدة بيانات على سيرفر تاني ([[httpd_can_network_connect_db]])، و Nginx بيقرا من [[/home]] ([[httpd_read_user_content]] أو انقل الملفات).",
          mistakes: R`[[setenforce 0]] و «اشتغل خلاص» وتنسى ترجّعه، أو تقفله في [[/etc/selinux/config]]. [[setsebool]] من غير [[-P]]: يرجع بعد الريستارت. [[audit2allow -M x && semodule -i x.pp]] على أي رفض من غير ما تفهمه. وتدوّر في [[audit.log]] ومتلاقيش حاجة لأن الرفض [[dontaudit]] (رفض متوقع مش بيتسجّل): [[semodule -DB]] بيظهره مؤقتًا، و [[semodule -B]] بيرجّعه.`
        },
        teach: R`## الأول: القصة

سيرفر AlmaLinux، Nginx متسطّب من dnf، والموقع في [[/srv/site]]، والصلاحيات [[755]] و [[644]] ومالكها صح. وفيه [[location /api]] بيعمل [[proxy_pass http://127.0.0.1:3000]] لتطبيق Node. المتصفح بيجيب:

- الصفحة الرئيسية: **403 Forbidden**، وفي [[/var/log/nginx/error.log]] [[open() "/srv/site/index.html" failed (13: Permission denied)]].
- [[/api]]: **502 Bad Gateway**، وفي اللوج [[connect() to 127.0.0.1:3000 failed (13: Permission denied) while connecting to upstream]].

[[13]] هو [[EACCES]]، نفس رقم chmod الغلط. بس chmod مظبوط.

الكيرنل بتاع Docker Desktop مش مشغّل SELinux، فمفيش رفض حقيقي يتسجّل. فكتبت سطري AVC بنفس الشكل اللي في دليل RHEL للحالتين دول، وشغّلت [[ausearch]] و [[audit2why]] و [[audit2allow]] عليهم بجد في [[almalinux:10]] على سياسة [[targeted]] الحقيقية ([[selinux-policy-targeted 42.1.18]]، و [[audit 4.0.3]]). [[getsebool]] و [[setsebool]] محتاجين SELinux شغال، فناتجهم من الدليل.

---

## ١. [[sudo ausearch -m AVC -ts recent]]

على السيرفر بيقرا [[/var/log/audit/audit.log]]. في المعمل [[ausearch -if avc.log -m AVC]] (if = input file):

~~~text الناتج
----
time->Wed Oct 28 09:33:20 2026
type=AVC msg=audit(1793180000.123:412): avc:  denied  { read } for  pid=2741 comm="nginx" name="index.html" dev="vda1" ino=1311 scontext=system_u:system_r:httpd_t:s0 tcontext=unconfined_u:object_r:var_t:s0 tclass=file permissive=0
----
time->Wed Oct 28 09:34:10 2026
type=AVC msg=audit(1793180050.456:418): avc:  denied  { name_connect } for  pid=2741 comm="nginx" dest=3000 scontext=system_u:system_r:httpd_t:s0 tcontext=system_u:object_r:ntop_port_t:s0 tclass=tcp_socket permissive=0
~~~

### نقرا السطر الأول

| الحتة | معناها |
|---|---|
| [[avc: denied]] | SELinux منع |
| [[{ read }]] | العملية: قراية |
| [[comm="nginx"]] | البرنامج |
| [[name="index.html"]] | الملف |
| [[scontext=...httpd_t...]] | source: الـ process من type [[httpd_t]] |
| [[tcontext=...var_t...]] | target: الملف label بتاعه [[var_t]] ← **هنا المشكلة** |
| [[tclass=file]] | نوع الهدف: ملف |
| [[permissive=0]] | enforcing، فاتمنع فعلًا (1 = اتسجّل بس) |

### والتاني

[[{ name_connect }]] يعني يفتح اتصال TCP، و [[dest=3000]] البورت، و [[tcontext=...ntop_port_t]]: البورت 3000 في السياسة اسمه [[ntop_port_t]] (بورت برنامج ntop)، و [[httpd_t]] مش مسموحله يتصل بيه.

~~~text seinfo --portcon=3000
   portcon tcp 3000-3001 system_u:object_r:ntop_port_t:s0
~~~

---

## ٢. [[ausearch ... | audit2why]]

~~~text الناتج (اشتغل بجد على سياسة AlmaLinux 10)
type=AVC msg=audit(1793180000.123:412): avc:  denied  { read } for  pid=2741 comm="nginx" name="index.html" ... tcontext=unconfined_u:object_r:var_t:s0 tclass=file permissive=0

	Was caused by:
		Missing type enforcement (TE) allow rule.

		You can use audit2allow to generate a loadable module to allow this access.

type=AVC msg=audit(1793180050.456:418): avc:  denied  { name_connect } for  pid=2741 comm="nginx" dest=3000 ... tcontext=system_u:object_r:ntop_port_t:s0 tclass=tcp_socket permissive=0

	Was caused by:
	The boolean httpd_can_network_connect was set incorrectly.
	Description:
	Allow httpd to can network connect

	Allow access by executing:
	# setsebool -P httpd_can_network_connect 1
~~~

(في المعمل [[audit2why]] خد [[-p /etc/selinux/targeted/policy/policy.35]] عشان يقرا السياسة من الملف بدل الكيرنل.)

| الرفض | audit2why قال | الحل الصح |
|---|---|---|
| قراية [[index.html]] | Missing TE allow rule، استخدم audit2allow | **لأ**. [[tcontext]] هو [[var_t]]: الـ label غلط. [[semanage fcontext]] + [[restorecon]] (الدرس اللي فات) |
| اتصال بـ 3000 | boolean [[httpd_can_network_connect]] | [[setsebool -P httpd_can_network_connect 1]] |

### ليه مش [[audit2allow]] للأول؟

~~~text audit2allow (نفس السطرين)
#============= httpd_t ==============

#!!!! This avc can be allowed using the boolean 'httpd_can_network_connect'
allow httpd_t ntop_port_t:tcp_socket name_connect;
allow httpd_t var_t:file read;
~~~

[[allow httpd_t var_t:file read;]] = Nginx يقرا **أي** ملف [[var_t]] على السيرفر (وده تحت [[/var]] كتير). ده بيوسّع الصلاحيات بدل ما يصلّح label ملف واحد.

---

## ٣. الـ booleans

~~~text semanage boolean -l | grep httpd_can_network (اشتغل بجد)
SELinux boolean                State  Default Description
httpd_can_network_connect      (off  ,  off)  Allow httpd to can network connect
httpd_can_network_connect_db   (off  ,  off)  Allow httpd to can network connect db
~~~

| العمود | معناه |
|---|---|
| [[State]] | دلوقتي |
| [[Default]] | المحفوظ في السياسة (بعد الريستارت) |

والقاعدة اللي الـ boolean بيفتحها، من السياسة نفسها:

~~~text sesearch -A -s httpd_t -t unreserved_port_t -c tcp_socket -p name_connect
allow httpd_t port_type:tcp_socket name_connect; [ httpd_can_network_connect ]:True
~~~

يعني لما الـ boolean يبقى True، [[httpd_t]] يتصل بأي بورت ([[port_type]]).

### [[getsebool]] و [[setsebool -P]]

في المعمل [[getsebool httpd_can_network_connect]] طبع [[getsebool:  SELinux is disabled]]. على RHEL (من الدليل):

~~~text قبل وبعد setsebool -P httpd_can_network_connect 1
httpd_can_network_connect --> off
httpd_can_network_connect --> on
~~~

و [[-P]] بيكتبه في السياسة (بياخد ثواني)، فـ [[Default]] في [[semanage boolean -l]] يبقى [[on]] كمان. وبعدها [[/api]] يشتغل.

> بديل أضيق من الـ boolean: خلّي البورت ده نوع بورت ويب: [[semanage port -a -t http_port_t -p tcp 3000]]. بس 3000 متعرّف أصلًا كـ [[ntop_port_t]]، فلازم [[-m]] (modify) بدل [[-a]]. والـ boolean هو الطريقة اللي دليل RHEL بيوصّي بيها لـ reverse proxy.

---

## الترتيب لما تشوف Permission denied على RHEL

1. [[ls -l]]: الصلاحيات العادية مظبوطة؟
2. [[getenforce]]: Enforcing؟
3. [[ausearch -m AVC -ts recent]]: فيه رفض في نفس الوقت؟
4. [[| audit2why]]: label ولا boolean؟
5. label: [[semanage fcontext]] + [[restorecon]]. boolean: [[setsebool -P]].
6. [[audit2allow]] بس لو فهمت القاعدة ومفيش غيرها.

---

## الخلاصة

~~~text
13: Permission denied + chmod مظبوط   غالبًا SELinux
ausearch -m AVC -ts recent             الرفض بالتفصيل
scontext / tcontext / { perm }         مين، على إيه، عايز يعمل إيه
audit2why                              boolean؟ ولا allow rule؟
tcontext غلط                           restorecon، مش audit2allow
setsebool -P                           -P عشان يفضل بعد الريستارت
setenforce 0                           تشخيص دقيقة، مش حل
~~~`,
        lines: [
          "رسايل رفض SELinux (AVC) في آخر ١٠ دقايق من الـ audit log.",
          "نفس الرسايل مترجمة: السبب إيه والحل المقترح.",
          "الـ boolean ده مفتوح ولا مقفول دلوقتي.",
          "افتحه ([[1]]) وثبّته بعد الريستارت ([[-P]]): Nginx يقدر يتصل ببورتات تانية.",
          "الـ booleans دي: حالتها دلوقتي والمحفوظة ووصفها."
        ],
        sol: R`في [[almalinux:10]] على سطري الـ AVC: [[audit2why]] قال للأول [[Missing type enforcement (TE) allow rule.]]، وللتاني [[The boolean httpd_can_network_connect was set incorrectly.]] ومعاه [[# setsebool -P httpd_can_network_connect 1]]. و [[semanage boolean -l]] عرض [[httpd_can_network_connect (off , off)]]، و [[audit2allow]] اقترح [[allow httpd_t var_t:file read;]] (وده الحل الغلط للأول).

الحل الصح: الأول label ([[semanage fcontext -a -t httpd_sys_content_t "/srv/site(/.*)?"]] و [[restorecon -Rv /srv/site]])، والتاني [[setsebool -P httpd_can_network_connect 1]]. [[getsebool]] في المعمل قال [[SELinux is disabled]]، وعلى RHEL بيقول [[off]] قبل و [[on]] بعد (من الدليل).`
      }
    ]
  }
]);
