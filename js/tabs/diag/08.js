// تكملة تاب diag: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/diag/01.js (شرح حقول الدرس في أوله)
MORE("diag", [
    {
      t: "قضايا الخدمات والدخول",
      l: 3,
      time: R`حوالي ٦ ساعات (كل قضية ساعة تقريبًا بالمعمل)`,
      goal: [
        R`تشخّص خدمة systemd واقعة بعد reboot بالترتيب: امتى عمل reboot، ومين اللي مقامش، وليه ([[Result]] و [[NRestarts]] و [[status=217/USER]])، ومن غير ما تغيّر حاجة وانت بتدوّر.`,
        R`تفهم ليه يوزر اتمسح من أسبوعين يوقّع خدمة النهارده بس، وترجّعها بطريقتين (يوزر بنفس الـ UID، أو pm2 تحت يوزر موجود) وانت عارف إمتى تختار أنهي واحدة.`,
        R`تشغّل TypeScript تحت pm2 من غير ما يقع ويقوم كل ثانية، وتعرف ليه [[TS_NODE_PROJECT]] هو الحل وليه [[--transpile-only]] خطر مع TypeORM.`,
        R`تمشي في «الفورم مش بيسجّل» من الفرونت للباك للداتابيز للإيميل، من الترمنال بس، على جهازك وعلى الموقع المرفوع.`,
        R`تغيّر إعداد في داتابيز جوه compose من غير ما تخمّن اسم اليوزر، وتفرّق بين قيمة في الداتابيز بتظهر فورًا وقيمة في الكود محتاجة نشر.`,
        R`تنشر على سيرفر مفيهوش نشر تلقائي وتثبت بالأرقام إن التعديل وصل، ومن غير ما الموقع يقع وقت الـ build.`,
        R`تدخل السيرفر من كونسول الاستضافة لما SSH يقفل في وشك، وتشيل أي باسورد متخزّن نصّي وتحوّل لمفتاح.`,
      ],
      use: {
        net: R`HTTP codes (000 و 502 و 403 و 404) هي اللغة اللي بتعرف منها الطلب وقف فين، و SSH هو الباب لكل حاجة على السيرفر.`,
        work: R`دي حاجات حصلت فعلًا على سيرفرات ومشاريع حقيقية واتعادت في معمل بأسامي مخترعة. لما تحصلك هتكون عارف أول ٣ أوامر تكتبهم، وأول حاجة متعملهاش.`,
        prog: R`نص القضايا هنا مشاكل كود ونشر مش سيرفر: [[NODE_ENV]] غلط، و tsconfig مش متقري، وعنوان API محفور في الـ bundle، ورقم متكرر في ٤ أشكال في الكود.`,
      },
      lab: R`# معمل systemd (Ubuntu 24.04 + Node + pm2 + nginx) جوه Docker:
docker build -t svccase-lab:1 .
docker run -d --name svccase --hostname vps1 --privileged --cgroupns=host -v /sys/fs/cgroup:/sys/fs/cgroup:rw --tmpfs /run --tmpfs /run/lock svccase-lab:1
docker exec -it svccase bash`,
      projects: [
        { lvl: 'صغير', t: R`[[orphan-units.sh]]: خدمات يوزرها مش موجود`, what: R`سكربت بيلف على كل الـ units في [[/etc/systemd/system]] (و [[systemctl show -p User --value]] لكل خدمة)، ولكل واحدة فيها [[User=]] بيعمل [[getent passwd]] ويطبع [[ORPHAN <unit> <user>]] لو اليوزر مش موجود. وكمان بيطبع الفولدرات اللي في [[/home]] و [[/srv]] و [[/opt]] وصاحبها رقم من غير اسم. من درس «خدمة واقعة من أسبوعين».`, done: R`في معمل الدرس بعد [[userdel -f deployer]] بيطبع [[ORPHAN pm2-deployer.service deployer]] و [[/home/deployer 1001]]، وبعد [[useradd -u 1001]] مبيطبعش حاجة وكود الخروج 0، ولو فيه orphan كود الخروج 1، ومبيغيّرش أي ملف.` },
        { lvl: 'صغير', t: R`[[env-get]]: اقرا قيمة من .env صح`, what: R`أداة صغيرة (bash function أو سكربت Node) بتاخد ملف [[.env]] واسم متغير وترجّع القيمة: بتتجاهل المسافات حوالين [[=]]، والعلامات [[" "]] و [[' ']] حوالين القيمة، والتعليقات، و [[export ]] في أول السطر، وبتطلّع خطأ واضح لو المتغير متكرر مرتين بقيمتين. من دروس «ts-node تحت pm2 بيقع كل ثانية» و «غيّر إعداد في الداتابيز من السيرفر».`, done: R`على ملف تجربة فيه [[NODE_ENV   = production1]] و [[POSTGRES_USER = "shopadmin"]] و [[export PORT=3000]] و [[# DB_PASS=old]] بترجّع [[production1]] و [[shopadmin]] و [[3000]]، ومبترجّعش القيمة المتعلّق عليها، ولو متغير متكرر بتخرج بكود 2 ورسالة فيها رقمين السطرين.` },
        { lvl: 'متوسط', t: R`[[signup-doctor.sh]]: ليه التسجيل مش شغّال؟`, what: R`سكربت بيتشغّل في فولدر مشروع (فرونت + باك) ويطبع تقرير: الفرونت بيكلّم أنهي عنوان (من الكود ومن [[.env]] ومن الـ fallback)، والباك بيسمع على أنهي بورت (من الكود ومن [[env.example]])، ومين فعلًا بيسمع، وطلب تجربة على [[/auth/register]] بإيميل [[example.invalid]] وكوده، والداتابيز متسطّبة وشغّالة ولا لأ، ومتغيرات SMTP ناقصة ولا لأ. ويشتغل على Git Bash وعلى Linux. من درس «بسجّل في الداشبورد ومش بيسجّل».`, done: R`على معمل الدرس بيطبع ٣ مشاكل بالترتيب: [[port mismatch: frontend 8000, backend env 3000]] و [[db: not installed]] و [[smtp: SMTP_HOST empty]]، وبعد ما تصلّحهم واحدة واحدة كل سطر بيقلب [[OK]]، والسكربت مبيبعتش أي طلب لعنوان مش localhost إلا لو اديته [[--remote]].` },
        { lvl: 'متوسط', t: R`[[verify-live.sh]]: التعديل وصل ولا لأ؟`, what: R`بياخد دومين ولستة صفحات ونص قديم ونص جديد (أو regex لرقم بكل أشكاله)، ولكل صفحة بيطلب بـ [[?nocache=]] عشوائي ويعدّ القديم والجديد، ويطبع جدول وحكم: [[DONE]] لو القديم صفر في كل الصفحات، و [[PARTIAL]] لو فيه صفحات لسه فيها القديم (ويقول أنهي). وكمان بيعمل نفس الفحص على الكود المحلي بـ [[grep -rn]]. من درسي «غيّرت الرقم ولسه القديم ظاهر» و «مفيش نشر تلقائي».`, done: R`على معمل الدرس قبل النشر بيطبع [[PARTIAL]] و [[/about/ old=2 new=0]]، وبعد النشر [[DONE]]، ولو صفحة رجّعت 403 أو 5xx بيعيدها مرة بعد ثانيتين قبل ما يحكم، ومبيعتبرش الرقم التجريبي [[201000000000]] قديم ولا جديد.` },
        { lvl: 'كبير', t: R`[[restore-service]]: رجّع خدمة واقعة بعد reboot بخطة مكتوبة`, what: R`أداة بتتشغّل على السيرفر (قراية بس في الأول): بتلاقي الخدمات الـ failed، ولكل واحدة بتجمع [[Result]] و [[NRestarts]] و [[ExecMainStatus]] و [[User=]] وآخر ٥ سطور لوج، وبتعرف السبب من قايمة معروفة (217/USER، و 203/EXEC، و EADDRINUSE، و TS1240، و ECONNREFUSED). ولو السبب يوزر ممسوح: بتقرا الـ UID القديم من [[/etc/passwd-]] أو من صاحب الملفات، وبتقرا [[dump.pm2]] لو موجود، وتطبع خطة الحل الأول والتاني بالأوامر. مبتنفذش حاجة غير بـ [[--apply 1]] أو [[--apply 2]]، وبعد التنفيذ بتعمل [[reset-failed]] و start وفحص [[/health]] و endpoint حقيقي. كل خطوة في لوج بالوقت.`, done: R`في معمل الدرس: من غير [[--apply]] بتطبع [[cause: user deployer missing (uid 1001)]] والخطتين ومبتغيّرش ولا ملف ([[sha256sum /etc/passwd]] قبل وبعد نفس الرقم). وبـ [[--apply 1]] الخدمة [[active]] و [[NRestarts=0]] والدخول 200، وتشغيلها تاني بتقول [[nothing to do]]. وبعد [[docker restart]] للمعمل الخدمة بترجع لوحدها.`, ext: R`زوّد [[--dry-run]] بيطبع الأوامر بالظبط، وتقرير markdown للـ postmortem فيه الخط الزمني من [[last -x]] و [[journalctl -t userdel]]، وتنبيه لو [[systemctl --failed]] مش فاضي بعد أي reboot (systemd timer كل ٥ دقايق).` },
        { lvl: 'كبير', t: R`[[deploy-check]]: نشر يدوي من غير ما الموقع يقع`, what: R`أداة للمشاريع اللي مفيهاش نشر تلقائي: (١) تتأكد إن جهازك مش ورا [[origin/main]] ومفيش تعديلات مش متسجّلة. (٢) تطبع لو فيه workflow نشر أو webhook ([[gh api .../hooks]]) عشان متنشرش مرتين. (٣) على السيرفر بأمر ssh واحد: [[git pull --ff-only]] وفحص syntax للملفات اللي اتغيّرت بس ([[php -l]] أو [[node --check]])، ولو Docker: [[docker compose build]] الأول وبعدين [[up -d]]. (٤) فحص بعد النشر: كل الصفحات المهمة 200، وملفات الصيانة 403، وصفحة مش موجودة 404، مع إعادة مرة للـ 403 المنفرد. (٥) لو أي خطوة فشلت ترجع للـ commit اللي قبله.`, done: R`على معمل الدرس: نشر سليم بيخلص بـ [[deployed <hash>]] ومفيش ولا طلب رجّع 000 وقت الـ build (سكربت مراقبة كل نص ثانية شغّال جنبها)، ونشر فيه ملف PHP بايظ بيترفض قبل ما يوصل للزوار والـ commit على السيرفر هو القديم، و 403 واحد وسط ٦٠ طلب سريع بيتعاد ومبيفشّلش النشر.`, ext: R`زوّد ملف لوج على السيرفر بمين نشر إيه وإمتى، و [[--rollback]] يرجع لآخر نسخة سليمة، وإشعار في قناة الفريق، وفحص إن متغيرات الـ build ([[NEXT_PUBLIC_*]]) كلها موجودة في [[.env]] قبل ما يبدأ.` },
        { lvl: 'فكرة', t: R`runbook «الحاجة واقعة بعد reboot» لسيرفرك`, what: R`اكتب runbook لسيرفر بتاعك (أو للمعمل): كل خدمة شغّالة عليه، بتقوم إزاي بعد reboot (systemd و pm2 و Docker)، وبيوزر مين، وفين اللوج بتاعها، وإزاي تعرف إنها شغّالة بجد (endpoint حقيقي مش [[/health]] بس). وجنبه سكربت بيعمل reboot في وقت هادي ويتأكد إن كل حاجة رجعت. انت اللي بتقرر الشكل.`, done: R`زميل قدر يعمل reboot للمعمل ويرجّع كل حاجة من الـ runbook لوحده في أقل من ١٥ دقيقة، والـ runbook بيذكر صاحب كل خدمة واللي يحصل لو اليوزر ده اتمسح.`, ext: R`حوّله لـ «تمرين حريق» شهري: سكربت بيكسر حاجة عشوائي (يمسح يوزر، أو يغيّر [[NODE_ENV]]، أو يقفل الداتابيز)، وانت تشخّص بالـ runbook وتقيس خدت قد إيه، وتحسّنه كل مرة.` },
      ],
      n: R`قضايا حقيقية اتعادت في معمل بأسامي مخترعة: خدمة واقعة لأن يوزرها اتمسح، و ts-node بيقع تحت pm2، وفورم تسجيل مش بيسجّل، وإعداد في داتابيز جوه compose، ورقم اتغيّر نصّه بس، ونشر يدوي من غير نشر تلقائي، وكونسول الاستضافة. كل قضية: العَرَض، والفحوصات بالترتيب وليه، والسبب، والحل، والبدايل اللي اترفضت، والتأكيد، والوقاية`,
      items: [
        {
          cmd: "خدمة واقعة من أسبوعين",
          title: "السيرفر عمل reboot والـ API بقى 502: الخدمة واقعة لأن اليوزر بتاعها اتمسح من أسبوعين",
          learn: R`تعرف امتى السيرفر عمل reboot، وأنهي خدمة مقامتش وليه، من غير ما تغيّر حاجة، وترجّعها بيوزر بنفس الـ UID بعد ما تقرا [[dump.pm2]].`,
          out: R`[[systemctl show pm2-deployer -p Result -p NRestarts]] بيقول [[Result=success]] و [[NRestarts=0]]، والدخول 200، وبعد reboot تاني بترجع لوحدها.`,
          desc: R`السيرفر عمل reboot (صيانة من الاستضافة)، والموقع بقى يرجّع [[502 Bad Gateway]]. nginx شغّال، والـ API (Node تحت pm2) مقامش. السبب: خدمة [[pm2-deployer.service]] مكتوب فيها [[User=deployer]]، واليوزر ده اتمسح من أسبوعين. البرامج كانت شغّالة في الرامات بالرقم 1001 ومحدش حس، ولما السيرفر قام، systemd ملقاش يوزر بالاسم ده فالخدمة فشلت بـ [[status=217/USER]].

الحل الأول: يوزر جديد بنفس الرقم ([[useradd -u 1001]]) و [[reset-failed]] و start، بعد ما تقرا [[dump.pm2]] عشان تعرف الخدمة كانت بتشغّل إيه بالظبط. والحل التاني (من غير ما ترجّع اليوزر) في الدرس اللي بعده.`,
          example: R`ssh -o BatchMode=yes webadmin@198.51.100.20 'hostname; uptime -s; sudo -n true && echo SUDO_OK'
last -x reboot shutdown | head -5
systemctl list-units 'pm2*' --all --no-legend
systemctl show pm2-deployer -p Result -p NRestarts -p User
sudo journalctl -u pm2-deployer --since "-1h" --no-pager | grep -m1 credentials
id deployer; getent passwd 1001 || echo "no name for uid 1001"
ls -la --time-style=long-iso /etc/passwd /home/
grep deployer /etc/passwd- ; sudo journalctl -t userdel --no-pager
sudo grep -E '"(name|pm_exec_path|exec_interpreter|pm_cwd|TS_NODE_PROJECT)"' /home/deployer/.pm2/dump.pm2
sudo useradd -u 1001 -M -d /home/deployer -s /usr/sbin/nologin deployer
sudo systemctl reset-failed pm2-deployer && sudo systemctl start pm2-deployer
curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1/health`,
          lines: [
            R`من جهازك: ادخل وشغّل أوامر قراية بس. [[-o BatchMode=yes]] بيخلّي ssh يفشل فورًا بدل ما يقف يسألك باسورد (مهم في السكربتات). [[uptime -s]] امتى السيستم قام. و [[sudo -n true]] بيجرّب sudo من غير ما يسأل: لو محتاج باسورد بيطبع [[sudo: a password is required]] بدل ما يعلّق.`,
            R`الخط الزمني: [[last -x]] بيقرا [[/var/log/wtmp]] ويطبع كل reboot و shutdown بالوقت. [[-x]] عشان يطبع سطور النظام (reboot و shutdown) مش دخول اليوزرز بس.`,
            R`مين مقامش؟ [[list-units 'pm2*']] بالنمط بدل [[grep -i pm2]] (اللي بيمسك [[TPM2]] كمان)، و [[--all]] عشان يطبع الواقف والفاشل مش الشغّال بس.`,
            R`ليه فشلت؟ [[systemctl show]] بيطبع خصايص الخدمة كـ [[اسم=قيمة]]: [[Result]] نوع الفشل، و [[NRestarts]] حاول يقوم كام مرة، و [[User]] بيشتغل بمين.`,
            R`السطر اللي فيه السبب: [[-u]] لوج الخدمة دي بس، و [[--since "-1h"]] آخر ساعة، و [[grep -m1 credentials]] أول سطر فيه [[Failed to determine user credentials]]. [[sudo]] عشان اليوزر العادي مش بيشوف لوج النظام.`,
            R`اليوزر موجود؟ [[id deployer]] بيقول [[no such user]]. و [[getent passwd 1001]] بيدوّر بالرقم: لو مفيش سطر، كود الخروج 2، فـ [[||]] بيطبع الرسالة.`,
            R`[[--time-style=long-iso]] بيطبع التاريخ كامل بالسنة. [[/etc/passwd]] بيتعدّل مع أي إضافة أو مسح يوزر، و [[/home]] بيوري الفولدر وصاحبه رقم مش اسم.`,
            R`امتى ومين: [[/etc/passwd-]] نسخة قبل آخر تعديل (فيها سطر اليوزر الممسوح ورقمه)، و [[journalctl -t userdel]] سطور برنامج [[userdel]] نفسه بالوقت.`,
            R`قبل أي حل: [[dump.pm2]] هو اللي [[pm2 resurrect]] بيشغّله. [[grep -E]] بيطلّع اسم التطبيق، والملف اللي بيتشغّل، والـ interpreter، والفولدر، والمتغيرات المهمة.`,
            R`الحل الأول: [[-u 1001]] نفس الرقم القديم، و [[-M]] متعملش home (موجود)، و [[-d]] مسار الـ home، و [[-s /usr/sbin/nologin]] حساب خدمة محدش يدخل بيه.`,
            R`[[reset-failed]] بيمسح حالة [[failed]] وعدّاد المحاولات، وبعدين [[start]]. [[&&]] عشان الـ start ميتنفذش لو الأول فشل.`,
            R`التأكيد: [[-o /dev/null]] يرمي الـ body، و [[-w "%{http_code}"]] يطبع الكود بس: 200 بدل 502.`,
          ],
          try: R`ابني المعمل اللي في الشرح (Ubuntu 24.04 بـ systemd و pm2 و nginx جوه Docker)، واعمل [[userdel -f deployer]] والتطبيق شغّال، واتأكد إن الموقع لسه 200، وبعدين [[docker restart svccase]] وامشي على الترتيب لحد ما ترجّعها بالحل الأول، واعمل restart تاني تتأكد إنها بترجع لوحدها.`,
          teach: R`## العَرَض

السيرفر عمل reboot في الليل (صيانة من شركة الاستضافة). الصبح:

~~~text curl -s -w "\n  HTTP %{http_code}\n" localhost/health
<html>
<head><title>502 Bad Gateway</title></head>
<body>
<center><h1>502 Bad Gateway</h1></center>
<hr><center>nginx/1.24.0 (Ubuntu)</center>
</body>
</html>

  HTTP 502
~~~

502 من nginx معناه «nginx شغّال، والتطبيق اللي وراه مش بيرد» (درس «502 Bad Gateway» في نفس التاب). يبقى السؤال: التطبيق مقامش ليه؟ والإجابة طلعت حاجة حصلت **من أسبوعين**.

---

## المعمل

Ubuntu 24.04 بـ systemd جوه Docker، وفيه Node و pm2 5 و nginx:

~~~text Dockerfile
FROM ubuntu:24.04
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y --no-install-recommends systemd systemd-sysv nginx nodejs npm curl ca-certificates iproute2 sudo procps less && npm i -g pm2@5 && apt-get clean && rm -rf /var/lib/apt/lists/*
CMD ["/sbin/init"]
~~~

~~~bash
docker build -t svccase-lab:1 .
docker run -d --name svccase --hostname vps1 --privileged --cgroupns=host -v /sys/fs/cgroup:/sys/fs/cgroup:rw --tmpfs /run --tmpfs /run/lock svccase-lab:1
~~~

- [[--privileged]] و [[--cgroupns=host]] و [[-v /sys/fs/cgroup]]: systemd محتاج يتحكم في الـ cgroups عشان يشغّل خدمات، فبنديله صلاحيات أكتر من container عادي (للمعمل بس).
- [[--tmpfs /run]]: systemd بيكتب حالته هناك، ولازم يبقى فاضي كل ما يقوم.
- [[docker restart svccase]] = reboot: systemd بيقوم من الأول، وكل البرامج بتموت.

جوه المعمل، زي السيرفر الحقيقي:

1. يوزر [[deployer]] رقمه 1001، والتطبيق في [[/home/deployer/api]] (Express و TypeORM و TypeScript).
2. [[deployer]] شغّل التطبيق بـ pm2 وعمل [[pm2 save]]، والأدمن عمل [[pm2 startup systemd -u deployer --hp /home/deployer]]، فاتعملت خدمة [[pm2-deployer.service]] بتعمل [[pm2 resurrect]] بعد كل reboot.
3. nginx على بورت 80 بيوصّل لـ [[127.0.0.1:3000]].

جرّبنا reboot والكل سليم: رجع 200. وبعدين، «من أسبوعين»، حد نضّف اليوزرز:

~~~text userdel deployer
userdel: user deployer is currently used by process 112
~~~

[[userdel]] رفض (كود الخروج 8) لأن فيه بروسس شغّال بالـ UID ده. حماية كويسة، **بس بتتعدّى** بـ [[-f]]:

~~~text userdel -f deployer
userdel: user deployer is currently used by process 112
~~~

نفس الرسالة، بس كود الخروج 0 واليوزر اتمسح فعلًا. و [[curl]] بعدها: **200**. محدش حس بحاجة. (في المعمل الأسبوعين بقوا دقيقة، والفكرة واحدة.)

---

## ٠. ادخل وانت مش بتغيّر حاجة

أول قاعدة في أي عطل على سيرفر شغّال: **اقرا الأول**. ولو بتشغّل أوامر من سكربت أو من أداة، متخليش الأمر يقف مستني باسورد:

~~~bash
ssh -o BatchMode=yes webadmin@198.51.100.20 'hostname; uptime -s; sudo -n true && echo SUDO_OK || echo SUDO_NEEDS_PASSWORD'
~~~

~~~text من غير مفتاح
webadmin@127.0.0.1: Permission denied (publickey,password).
~~~

~~~text بالمفتاح، و sudo محتاج باسورد
vps1
 09:38:29 up  2:10,  0 user,  load average: 0.53, 0.72, 0.47
sudo: a password is required
SUDO_NEEDS_PASSWORD
~~~

- [[-o BatchMode=yes]]: ssh ميسألش عن باسورد ولا عن تأكيد بصمة السيرفر. لو المفتاح مش شغّال، بيفشل فورًا بكود 255 بدل ما يفضل مستني. (اتشرح كمان في تاب sshc.)
- [[sudo -n true]]: [[-n]] = non-interactive. [[true]] أمر مبيعملش حاجة، فده سؤال بس: «أقدر أستخدم sudo من غير باسورد؟». الإجابة بتحدد هتشغّل الأوامر التقيلة إزاي (هتدخل بنفسك وتكتب الباسورد، ولا السكربت يكمّل).
- أغلب أوامر القراية ([[systemctl status]] و [[systemctl show]] و [[id]] و [[ls]] و [[last]]) مش محتاجة sudo. اللي محتاج: [[journalctl]] لخدمات النظام (من غير sudo بيقول [[Hint: You are currently not seeing messages from other users and the system.]])، وقراية ملفات يوزر تاني.

---

## ١. امتى السيرفر عمل reboot؟

~~~text last -x reboot shutdown | head -5
reboot   system boot  6.18.33.2-micros Tue Nov  3 09:36   still running
reboot   system boot  6.18.33.2-micros Tue Nov  3 09:35   still running
reboot   system boot  6.18.33.2-micros Tue Nov  3 09:30   still running
~~~

- [[last]] بيقرا [[/var/log/wtmp]]: كل دخول وخروج وكل reboot. [[-x]] بيضيف سطور [[shutdown]] وتغيير الـ runlevel.
- آخر سطر فوق = آخر reboot. على سيرفر حقيقي هتلاقي سطر [[shutdown]] قبل كل reboot عادي، وسطر reboot قبله [[crash]] لو السيرفر وقع من غير ما يقفل صح. في المعمل [[docker restart]] مش بيكتب سطر shutdown، فكل الـ boots القديمة باينة [[still running]].
- [[uptime -s]] و [[who -b]] نفس المعلومة («قام امتى»). على VPS الاتنين بيتفقوا مع [[last]]. في المعمل [[uptime -s]] بيقول وقت قيام كيرنل الجهاز اللي شايل Docker، لأن الـ container مالوش كيرنل لوحده.

الخلاصة: السيرفر قام **09:36**. أي حاجة مكانتش متسجّلة إنها تقوم بعد reboot، أو اتسجّلت وفشلت، هي المشتبه فيها.

---

## ٢. مين اللي مقامش؟

~~~text systemctl --failed --no-pager
  UNIT                 LOAD   ACTIVE SUB    DESCRIPTION
● pm2-deployer.service loaded failed failed PM2 process manager
~~~

ولو عايز تشوف خدمات pm2 كلها (شغّالة ولا لأ)، **متعملش** [[grep -i pm2]]:

~~~text systemctl list-units --type=service --all --no-pager | grep -i pm2
● pm2-deployer.service                     loaded    failed   failed  PM2 process manager
  systemd-pcrmachine.service               loaded    inactive dead    TPM2 PCR Machine ID Measurement
  systemd-pcrphase-initrd.service          loaded    inactive dead    TPM2 PCR Barrier (initrd)
~~~

[[TPM2]] فيها [[pm2]]! النمط بتاع systemctl نفسه أدق:

~~~text systemctl list-units 'pm2*' --all --no-legend
● pm2-deployer.service loaded failed failed PM2 process manager
~~~

العلامات حوالين [[pm2*]] عشان الـ shell ميحاولش يفسّر [[*]] كأسماء ملفات.

---

## ٣. فشلت إزاي؟

~~~text systemctl status pm2-deployer --no-pager
× pm2-deployer.service - PM2 process manager
     Loaded: loaded (/etc/systemd/system/pm2-deployer.service; enabled; preset: enabled)
     Active: failed (Result: exit-code) since Tue 2026-11-03 09:36:26 UTC; 23s ago
    Process: 112 ExecStart=/usr/local/lib/node_modules/pm2/bin/pm2 resurrect (code=exited, status=217/USER)

Nov 03 09:36:26 vps1 systemd[1]: pm2-deployer.service: Scheduled restart job, restart counter is at 5.
Nov 03 09:36:26 vps1 systemd[1]: pm2-deployer.service: Start request repeated too quickly.
Nov 03 09:36:26 vps1 systemd[1]: pm2-deployer.service: Failed with result 'exit-code'.
~~~

~~~text systemctl show pm2-deployer -p Result -p NRestarts -p User
Result=exit-code
NRestarts=5
User=deployer
~~~

- [[enabled]]: الخدمة متسجّلة إنها تقوم بعد reboot. يعني [[pm2 startup]] كان معمول صح. المشكلة مش «نسينا enable» (اللي هي قضية «بعد reboot حاجات مقامتش» في نفس التاب).
- [[status=217/USER]]: كود خاص بـ systemd (مش من البرنامج): البرنامج **متشغّلش أصلًا**، لأن systemd فشل في خطوة «غيّر لليوزر ده». أكواد 200 و 203 و 217 وغيرهم كلهم «systemd فشل قبل ما يشغّل البرنامج» (من وثائق [[systemd.exec]]).
- [[NRestarts=5]] و [[Start request repeated too quickly]]: الخدمة فيها [[Restart=on-failure]]، فحاول ٥ مرات في ثواني، وبعدين وقف (الحد الافتراضي ٥ محاولات في ١٠ ثواني).
- [[Result=exit-code]]: فشل بكود خروج، مش timeout ولا signal.

---

## ٤. بيشتغل بمين؟ والسطر اللي فيه السبب

~~~text systemctl cat pm2-deployer | grep -E '^(User|ExecStart|PIDFile|Environment=PM2)'
User=deployer
Environment=PM2_HOME=/home/deployer/.pm2
PIDFile=/home/deployer/.pm2/pm2.pid
ExecStart=/usr/local/lib/node_modules/pm2/bin/pm2 resurrect
~~~

[[systemctl cat]] بيطبع ملف الخدمة زي ما systemd شايفه (ومعاه أي ملفات override). و [[systemctl show -p User]] بيطبع نفس القيمة من غير ما تقرا الملف.

~~~text sudo journalctl -u pm2-deployer --since "-1h" --no-pager | grep -m1 credentials
Nov 03 09:36:24 vps1 (pm2)[67]: pm2-deployer.service: Failed to determine user credentials: No such process
~~~

[[Failed to determine user credentials]] = systemd سأل «مين [[deployer]]؟ رقمه كام؟» وملقاش. و [[No such process]] هنا رسالة الخطأ العامة (ESRCH) اللي مكتبة النظام رجّعتها، مش معناها إن فيه بروسس ناقص.

---

## ٥. اليوزر فين؟

~~~text id deployer; getent passwd 1001 || echo "no name for uid 1001"
id: 'deployer': no such user
no name for uid 1001
~~~

~~~text ls -la /home/deployer
drwxr-x--- 5 1001 1001 4096 Nov  3 09:32 .
drwxr-xr-x 1 root root 4096 Nov  3 09:30 ..
drwxrwxr-x 5 1001 1001 4096 Nov  3 09:36 .pm2
drwxr-xr-x 4 1001 1001 4096 Nov  3 09:34 api
~~~

- [[getent passwd 1001]]: بيدوّر في كل مصادر اليوزرز (مش [[/etc/passwd]] بس، كمان LDAP لو موجود). مفيش نتيجة = كود خروج 2.
- الملفات صاحبها **رقم من غير اسم**. الديسك مبيخزّنش أسماء، بيخزّن أرقام (UID و GID)، و [[ls]] بيترجم الرقم لاسم من [[/etc/passwd]]. اليوزر اتمسح فالترجمة فشلت، والملفات زي ما هي.
- تدوّر على كل الملفات اللي ملهاش صاحب: [[sudo find / -xdev -nouser -not -path "/proc/*"]]. بس خلي بالك: في المعمل طلّع كمان ملفات في [[/usr/local/lib/node_modules/pm2]]، لأن npm بيفك الحزم بأرقام أصحابها الأصليين. يعني [[-nouser]] مش دايمًا «حد اتمسح».

---

## ٦. اتمسح امتى؟

~~~text ls -la --time-style=long-iso /etc/passwd /home/
-rw-r--r-- 1 root root    961 2026-11-03 09:36 /etc/passwd

/home/:
drwxr-x--- 5   1001   1001 4096 2026-11-03 09:32 deployer
drwxr-x--- 2 ubuntu ubuntu 4096 2026-10-24 14:12 ubuntu
~~~

~~~text grep deployer /etc/passwd- ; sudo journalctl -t userdel --no-pager
/etc/passwd-:deployer:x:1001:1001::/home/deployer:/bin/bash
Nov 03 09:36:00 vps1 userdel[168]: delete user 'deployer'
Nov 03 09:36:00 vps1 userdel[168]: removed group 'deployer' owned by 'deployer'
Nov 03 09:36:00 vps1 userdel[168]: removed shadow group 'deployer' owned by 'deployer'
~~~

- وقت تعديل [[/etc/passwd]] هو وقت **آخر** تغيير في أي يوزر، مش شرط المسح. دليل ضعيف لوحده.
- [[/etc/passwd-]] (بشرطة في الآخر): أدوات [[useradd]] و [[userdel]] بتسيب نسخة قبل آخر تعديل. فيها السطر القديم كامل: الاسم، والـ UID (1001)، والـ GID، والـ home، والـ shell. ده اللي هتحتاجه في الحل.
- [[journalctl -t userdel]]: [[-t]] = اسم البرنامج اللي كتب السطر. ده الدليل الأقوى بالوقت بالثانية، **لو** اللوج لسه موجود (journald بيمسح القديم حسب المساحة، وعلى Ubuntu كمان [[/var/log/auth.log]] لو rsyslog متسطّب).
- [[last]] بيقولك مين كان داخل السيرفر في الوقت ده.

---

## ٧. ليه وقعت بعد أسبوعين مش ساعتها؟

~~~text ps -eo user,pid,lstart,cmd | grep -E "PM2|index.ts" (بعد المسح وقبل الـ reboot)
1001         112 Tue Nov  3 09:35:35 2026 PM2 v5.4.3: God Daemon (/home/deployer/.pm2)
1001         127 Tue Nov  3 09:35:35 2026 node /home/deployer/api/src/index.ts
~~~

البروسس الشغّال معاه **رقم** (1001) من ساعة ما بدأ. الكيرنل مبيسألش عن الاسم تاني، فمسح الاسم من [[/etc/passwd]] مأثّرش عليه. عمود [[USER]] بقى رقم بس. الحاجة الوحيدة اللي بتسأل «مين deployer؟» هي **systemd وهو بيبدأ الخدمة**، ودي بتحصل في الـ reboot الجاي، اللي جه بعد أسبوعين.

| الوقت | اللي حصل | الموقع |
|---|---|---|
| من أسبوعين | [[userdel -f deployer]] | شغّال (البروسس في الرامات بالرقم) |
| أسبوعين | ولا حاجة | شغّال، والمراقبة خضرا |
| الليلة | reboot صيانة | البروسس مات |
| بعد ثواني | systemd يبدأ [[pm2-deployer]] ← [[217/USER]] × ٥ | 502 |

الفكرة دي أعم من اليوزرز: **أي تغيير بيأثر على «إزاي الحاجة بتقوم» مبيبانش غير في أول قيام**. ملف unit اتعدّل من غير [[daemon-reload]]، أو مكتبة اتمسحت والبرنامج محمّلها في الرامات، أو شهادة اتجددت ومتعملهاش reload. عشان كده بنعمل reboot تجريبي بعد أي تغيير كبير.

---

## ٨. قبل أي حل: اقرا [[dump.pm2]]

[[pm2 resurrect]] (اللي الخدمة بتشغّله) بيقرا [[~/.pm2/dump.pm2]] ويشغّل اللي فيه بالظبط. ده أصدق وصف لـ «التطبيق كان شغّال إزاي»، أصدق من الـ README ومن ذاكرتك:

~~~text sudo grep -E '"(name|pm_exec_path|exec_interpreter|pm_cwd|TS_NODE_PROJECT)"' /home/deployer/.pm2/dump.pm2
      "TS_NODE_PROJECT": "/home/deployer/api/tsconfig.json",
    "exec_interpreter": "./node_modules/.bin/ts-node",
    "name": "api",
    "pm_exec_path": "/home/deployer/api/src/index.ts",
    "pm_cwd": "/home/deployer/api",
~~~

- التطبيق مكانش شغّال من [[dist/index.js]] بـ node. كان شغّال من [[src/index.ts]] بـ **ts-node**.
- ومعاه متغير [[TS_NODE_PROJECT]] بيقول لـ ts-node فين [[tsconfig.json]]. (الملف JSON، و [[grep]] كفاية هنا. ولو عايز كل حاجة: [[node -e]] بـ [[JSON.parse]]، أو [[jq]] لو متسطّب.)

لو اخترت تشغّل التطبيق بإيدك بطريقة تانية، هتقع في فخاخ الدرس الجاي كلها. لو رجّعت اليوزر، [[resurrect]] هيشغّل نفس الكلام ده.

---

## ٩. الحل الأول: يوزر بنفس الرقم

~~~bash
getent group 1001 || echo "gid 1001 is free"
sudo useradd -u 1001 -M -d /home/deployer -s /usr/sbin/nologin deployer
id deployer
~~~

~~~text الناتج
gid 1001 is free
uid=1001(deployer) gid=1001(deployer) groups=1001(deployer)
~~~

- [[-u 1001]]: **لازم نفس الرقم**. لو عملت يوزر بالاسم بس، هياخد أول رقم فاضي (مثلًا 1003)، والملفات لسه بتاعة 1001، فالتطبيق مش هيعرف يكتب في [[.pm2]] ولا في اللوجات.
- الجروب: [[useradd]] على Ubuntu بيعمل جروب بنفس الاسم، ولو الرقم 1001 فاضي كجروب بياخده. عشان كده بصّينا الأول بـ [[getent group 1001]]. لو كان محجوز لجروب تاني، استخدم [[-g]] برقم الجروب القديم من [[/etc/group-]].
- [[-M]]: متعملش home ولا تنسخ ملفات [[/etc/skel]]. الفولدر موجود بملفاته.
- [[-s /usr/sbin/nologin]]: حساب خدمة. [[su - deployer]] هيقول [[This account is currently not available.]]. systemd مش محتاج shell عشان يشغّل الخدمة بيه. ولو محتاج تشغّل أمر بيه: [[sudo -u deployer PM2_HOME=/home/deployer/.pm2 pm2 list]].

~~~text ls -la /home | grep deployer
drwxr-x--- 5 deployer deployer 4096 Nov  3 09:32 deployer
~~~

الأسماء رجعت لوحدها، من غير ولا [[chown]]، لأن الأرقام زي ما هي.

~~~bash
sudo systemctl reset-failed pm2-deployer
sudo systemctl start pm2-deployer
systemctl show pm2-deployer -p Result -p NRestarts -p MainPID
~~~

~~~text الناتج
MainPID=242
Result=success
NRestarts=0
~~~

- [[reset-failed]]: بيمسح حالة [[failed]] وعدّاد [[NRestarts]] وعدّاد «حاولت كتير». من غيره، [[start]] بعد فشل كتير ممكن يرجّع [[start-limit-hit]]، والأرقام هتفضل بتاعة الفشل القديم فمش هتعرف الجديد نجح ولا لأ.
- و [[start]] من غيره لما اليوزر لسه ممسوح بيطلّع:

~~~text sudo systemctl start pm2-deployer (قبل الحل)
Job for pm2-deployer.service failed because the control process exited with error code.
See "systemctl status pm2-deployer.service" and "journalctl -xeu pm2-deployer.service" for details.
~~~

---

## التأكيد

~~~text
{"status":"ok","db":true}  HTTP 200
{"session":"<hidden>"}  HTTP 200
~~~

[[/health]] **ودخول حقيقي** (درس «/health بيقول 200 والدخول بايظ» في تاب diag بيشرح ليه [[/health]] لوحده مش كفاية). وبعدين **reboot تاني** ([[docker restart svccase]] في المعمل): الخدمة [[active]] لوحدها والدخول 200. ده الدليل الوحيد إن المشكلة اتحلّت مش اتلفّت.

---

## الحل التاني (من غير ما ترجّع اليوزر)

لو اليوزر اتمسح عن قصد (موظف مشي، أو تنضيف)، مش هترجّعه. الحل: [[systemctl disable --now]] للخدمة القديمة، و [[chown -R]] للفولدر ليوزر موجود، و [[pm2 start]] و [[pm2 save]] و [[pm2 startup]] بيوزر ده. ودي فيها ٣ فخاخ وقعت كلها في الحالة الحقيقية، وكل واحد ليه شرحه في الدرس الجاي «ts-node تحت pm2 بيقع كل ثانية».

| | الحل الأول: يوزر بنفس الـ UID | الحل التاني: pm2 تحت يوزر موجود |
|---|---|---|
| الوقت | دقيقتين | ربع ساعة وأكتر |
| بيغيّر طريقة التشغيل؟ | لأ، [[resurrect]] بيشغّل نفس [[dump.pm2]] | أيوه، انت اللي بتكتب أمر التشغيل من جديد |
| إمتى | محتاج الموقع يرجع حالًا، أو مش عارف ليه اليوزر اتمسح | اليوزر اتمسح عن قصد ومش هيرجع |
| المخاطرة | حساب رجع من غير ما حد يقرر | أي فرق في المتغيرات أو الـ interpreter بيكسر التطبيق |

الصح غالبًا: **الأول دلوقتي** عشان الموقع يرجع، و **التاني بعدين** بهدوء ومع اختبار، لو فعلًا اليوزر مش لازم يرجع.

---

## البدايل اللي اترفضت

| البديل | ليه لأ |
|---|---|
| تغيّر [[User=root]] في الخدمة | التطبيق هيشتغل بصلاحيات كاملة على السيرفر، و [[PM2_HOME]] و [[PIDFile]] لسه بيشاوروا على [[/home/deployer]]، فـ root هيعمل ملفات جوه فولدر يوزر تاني |
| [[useradd deployer]] من غير [[-u]] | رقم جديد، والملفات بتاعة الرقم القديم، فـ [[EACCES: permission denied]] على [[.pm2]] واللوجات |
| [[chmod -R 777 /home/deployer]] | أي يوزر على السيرفر يقرا [[.env]] والأسرار ويعدّل الكود |
| [[pm2 start]] بإيدك وانت root وخلاص | هيرجع يقع في الـ reboot الجاي، والتطبيق شغّال كـ root، و [[dump.pm2]] اتجاهل |
| reboot تاني «يمكن يقوم» | نفس السبب، نفس النتيجة، وبتضيّع الأدلة اللي في [[journalctl]] بتاع الـ boot ده |

---

## متتكررش

- **قبل ما تمسح يوزر:** [[ps -u deployer]] (بيشغّل حاجة دلوقتي؟)، و [[sudo grep -rl "User=deployer" /etc/systemd/system]] (خدمة بتشتغل بيه؟)، و [[sudo crontab -l -u deployer]]، و [[sudo find / -xdev -user deployer -not -path "/proc/*" | head]]. لو أي واحد فيهم طلّع حاجة، انقلها الأول.
- **متستخدمش [[userdel -f]]** إلا لو عارف بالظبط ليه الحماية بتمنعك. الرسالة [[currently used by process]] كانت التحذير اللي اتجاهل.
- **حسابات الخدمات بأسماء واضحة وموثّقة** ([[svc-shop-api]] مثلًا) ومن غير shell، فمحدش يفتكرها حساب موظف ويمسحها.
- **مراقبة على [[systemctl --failed]]** بعد كل boot (systemd timer أو أداة المراقبة)، و **reboot تجريبي** في وقت هادي بعد أي تغيير في اليوزرز أو الخدمات.
- **اكتب [[dump.pm2]] في الريبو** (أو الأحسن: ecosystem file متسجّل في git) عشان طريقة التشغيل متبقاش موجودة في مكان واحد على السيرفر بس.

---

## الخلاصة

| الخطوة | الأمر | لقينا |
|---|---|---|
| ٠ | [[ssh -o BatchMode=yes]] و [[sudo -n true]] | دخلنا قراية بس، و sudo محتاج باسورد ولا لأ |
| ١ | [[last -x reboot shutdown]] | السيرفر قام 09:36 |
| ٢ | [[systemctl list-units 'pm2*' --all]] | [[pm2-deployer]] = failed |
| ٣ | [[systemctl show -p Result -p NRestarts]] | [[exit-code]] و ٥ محاولات و [[217/USER]] |
| ٤ | [[systemctl cat]] و [[journalctl -u]] | [[User=deployer]] و [[Failed to determine user credentials]] |
| ٥ | [[id]] و [[getent passwd 1001]] و [[ls -la]] | مفيش يوزر، والملفات بتاعة 1001 |
| ٦ | [[/etc/passwd-]] و [[journalctl -t userdel]] | اتمسح امتى، ورقمه كان 1001 |
| ٧ | [[dump.pm2]] | كان شغّال بـ ts-node و [[TS_NODE_PROJECT]] |
| حل | [[useradd -u 1001 -M]] و [[reset-failed]] و [[start]] | [[Result=success]] و [[NRestarts=0]] والدخول 200 |
| تأكيد | reboot تاني | رجعت لوحدها |`,
          deep: {
            why: R`مسح يوزر بيبان عملية تنضيف بسيطة، بس فيه حاجات كتير مربوطة بيه بالاسم (خدمات systemd و cron و sudoers) وحاجات مربوطة بيه بالرقم (الملفات والبروسسات الشغّالة). اللي بالرقم بيكمّل عادي، واللي بالاسم بيفشل أول ما حد يسأل عن الاسم. وأول مرة systemd بيسأل هي وهو بيبدأ الخدمة، يعني في الـ reboot الجاي، بعد أيام أو أسابيع. فمحدش بيربط السبب بالنتيجة، والتشخيص بيبدأ من «الكود باظ» بدل «حد غيّر حاجة على السيرفر».`,
            how: R`systemd قبل ما يشغّل [[ExecStart]] بيعمل fork، وفي البروسس الجديد بيعمل [[getpwnam("deployer")]] عشان يجيب الـ UID والـ GID والـ home، وبعدين [[setgid]] و [[setuid]]. لو [[getpwnam]] مرجّعش حاجة، بيكتب [[Failed to determine user credentials]] ويخرج بكود 217 (من وثائق [[systemd.exec]]: «217 USER: Failed to determine user credentials»)، والبرنامج نفسه عمره ما اتشغّل. و [[Restart=on-failure]] بيعيد المحاولة، و [[StartLimitBurst=5]] في [[StartLimitIntervalSec=10s]] (الافتراضي) بيوقفه بعد ٥. أما الكيرنل فبيعرف البروسس بالأرقام بس: [[/proc/<PID>/status]] فيه [[Uid:]] بأرقام، و [[ps]] بيترجم الرقم لاسم وقت العرض. و [[userdel]] بيشيل السطر من [[/etc/passwd]] و [[/etc/shadow]] و [[/etc/group]]، ويسيب نسخة في الملفات اللي آخرها [[-]]، ومن غير [[-r]] مبيلمسش الـ home ولا الملفات.`,
            when: R`أي خدمة واقعة بعد reboot وهي [[enabled]] (لو مش enabled دي قضية «بعد reboot حاجات مقامتش»). وأي [[status=217/USER]] أو [[203/EXEC]] أو [[200/CHDIR]] في [[systemctl status]]: كلهم «systemd فشل قبل ما يشغّل البرنامج»، والسبب في الإعدادات (يوزر، أو مسار البرنامج، أو الفولدر) مش في الكود. وقبل ما تمسح أي يوزر من سيرفر إنتاج.`,
            mistakes: R`تدوّر في كود التطبيق ولوجاته وهو عمره ما اتشغّل (اللوج بتاعه فاضي من ساعة الـ reboot). و [[grep -i pm2]] يطلّع خدمات TPM2 فتتلخبط. وتعمل [[useradd deployer]] من غير [[-u]] فالملفات متبقاش بتاعته. وتغيّر [[User=root]] عشان «يشتغل وخلاص». وتشغّل التطبيق بإيدك بطريقة غير اللي في [[dump.pm2]]. وتنسى [[reset-failed]] فتقرا [[NRestarts=5]] القديمة وتفتكر الحل فشل. ومتعملش reboot تجريبي بعد الحل.`
          },
          sol: R`قبل الحل: [[systemctl show pm2-deployer -p Result -p NRestarts -p User]] بيطبع [[Result=exit-code]] و [[NRestarts=5]] و [[User=deployer]]، و [[journalctl]] فيه [[Failed to determine user credentials: No such process]] و [[status=217/USER]]، و [[id deployer]] بيقول [[id: 'deployer': no such user]]، و [[getent passwd 1001]] كود خروجه 2، و [[ls -la /home]] بيوري [[1001 1001]]، و [[/etc/passwd-]] فيه [[deployer:x:1001:1001::/home/deployer:/bin/bash]]، و [[curl]] بيرجّع 502.

بعد [[useradd -u 1001 -M -d /home/deployer -s /usr/sbin/nologin deployer]] و [[reset-failed]] و [[start]]: [[Result=success]] و [[NRestarts=0]]، و [[/health]] و [[/login]] 200، وبعد [[docker restart svccase]] الخدمة [[active]] لوحدها.

اتجرّب على Ubuntu 24.04 بـ systemd 255 جوه Docker Desktop، مع Node 18.19 (من apt) و pm2 5.4.3 و nginx 1.24 و OpenSSH 9.6. أكواد خروج systemd (217 USER) و [[StartLimitBurst]] الافتراضي من وثائق [[systemd.exec]] و [[systemd.unit]].`,
          practice: [
            { lvl: 'سريع', t: R`من غير ما تبص: لو [[systemctl status]] قال [[status=217/USER]]، التطبيق نفسه اتشغّل ولا لأ؟ وليه اللوج بتاع التطبيق ([[pm2 logs]]) مش هيفيدك هنا؟ واكتب ٣ أوامر بالترتيب تثبت بيهم السبب.`, done: R`كتبت إن البرنامج متشغّلش أصلًا لأن systemd فشل قبل [[ExecStart]]، فلوج التطبيق فاضي من ساعة الـ boot، والأوامر: [[systemctl cat]] (أو [[show -p User]]) و [[id <user>]] و [[journalctl -u ... | grep credentials]].` },
            { lvl: 'تطبيق', t: R`اقرا وتوقّع: يوزر [[deployer]] اتمسح بـ [[userdel -f]] والتطبيق شغّال. توقّع ناتج كل واحد من دول قبل ما تشغّله في المعمل: [[curl localhost/health]]، و [[ps -eo user,cmd | grep index.ts]]، و [[ls -la /home]]، و [[sudo -u deployer true]]. وبعدين [[docker restart]] وتوقّع [[curl]] تاني.`, done: R`كتبت التوقعات الخمسة قبل التشغيل، و ٤ منهم على الأقل طلعوا صح: 200، والعمود [[USER]] = [[1001]]، و [[1001 1001]] في [[ls]]، و [[sudo: unknown user deployer]]، و 502 بعد الـ restart. واللي غلطت فيه كتبت ليه.` },
            { lvl: 'تطبيق', t: R`صلّح الكود البايظ: الأدمن اللي قبلك كتب الحل ده وبعد reboot الخدمة اشتغلت بس اللوجات فاضية والتطبيق بيقع بـ [[EACCES]]:
[[sudo useradd -m deployer && sudo systemctl restart pm2-deployer]]
لاقي الغلطتين وصلّحهم، وجرّب الحل الغلط في المعمل الأول تشوف الخطأ بعينك.`, done: R`شفت في المعمل إن [[id deployer]] طلّع رقم غير 1001 و [[ls -la /home/deployer]] الملفات لسه [[1001]]، وصلّحت لـ [[userdel deployer]] ثم [[useradd -u 1001 -M -d /home/deployer -s /usr/sbin/nologin deployer]] و [[reset-failed]] قبل [[start]]، والخدمة [[Result=success]] والدخول 200.` },
            { lvl: 'تطبيق', t: R`بيانات حقيقية: طلّع من [[dump.pm2]] في المعمل (أو من ملف تجربة فيه تطبيقين) جدول فيه لكل تطبيق: الاسم، والملف، والـ interpreter، والفولدر، و [[NODE_ENV]] و [[TS_NODE_PROJECT]] لو موجودين. مرة بـ [[grep -E]] ومرة بـ [[node -e]] و [[JSON.parse]]، وقارن.`, done: R`الطريقتين طلّعوا نفس القيم، وكتبت ليه [[grep]] بيتلخبط لما يبقى فيه تطبيقين (السطور مش مربوطة ببعض) وليه [[JSON.parse]] بيطلّع كل تطبيق في سطر واحد صح.` },
            { lvl: 'تحدي', t: R`ابني [[before-userdel.sh <user>]]: بيرفض يكمّل ويطبع السبب لو اليوزر عنده بروسس شغّال، أو خدمة systemd فيها [[User=<user>]]، أو cron، أو ملفات برا الـ home بتاعه. ولو كله فاضي بيطبع [[safe to delete]] (ومبيمسحش هو).`, done: R`في المعمل على [[deployer]] وهو شغّال بيطبع ٣ أسباب على الأقل (البروسس، و [[pm2-deployer.service]]، والملفات في [[/home/deployer/api]] لو نقلتها برّه) وكود 1، وعلى يوزر تجربة جديد فاضي بيطبع [[safe to delete]] وكود 0.` },
            { lvl: 'تحدي', t: R`اشرحها: اكتب postmortem من غير لوم في ١٥ سطر للحالة دي: الخط الزمني بالوقت (من [[journalctl -t userdel]] و [[last -x]] في المعمل)، والسبب، والحل، وليه محدش حس أسبوعين، و ٣ خطوات منع. واقراه لزميل ميعرفش الحالة.`, done: R`الخط الزمني فيه ٤ أوقات على الأقل من سطور لوج حقيقية من المعمل، والزميل قدر يقول بكلامه ليه الموقع فضل شغّال بعد المسح (البروسس بالرقم) وليه وقع بعد الـ reboot (systemd بيسأل بالاسم).` },
          ],
          ci: [
            { os: [R`ubuntu`], sh: R`bash`, run: R`id nosuchuser-svccase 2>&1
getent passwd 59999; echo "getent exit=$?"
mkdir -p /tmp/svccase-ci && touch /tmp/svccase-ci/f && sudo chown 59999:59999 /tmp/svccase-ci/f
ls -ln /tmp/svccase-ci/f | awk '{print "owner=" $3}'
stat -c "%u %U" /tmp/svccase-ci/f
sudo rm -rf /tmp/svccase-ci`, expect: [R`no such user`, R`getent exit=2`, R`owner=59999`, R`59999 UNKNOWN`] },
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`node`, run: R`const dump = JSON.stringify([
  { name: "api", pm_exec_path: "/home/deployer/api/src/index.ts", exec_interpreter: "./node_modules/.bin/ts-node", pm_cwd: "/home/deployer/api", env: { TS_NODE_PROJECT: "/home/deployer/api/tsconfig.json" } },
  { name: "worker", pm_exec_path: "/home/deployer/api/dist/worker.js", exec_interpreter: "node", pm_cwd: "/home/deployer/api", env: {} },
]);
for (const p of JSON.parse(dump)) console.log([p.name, p.pm_exec_path, p.exec_interpreter, p.env.TS_NODE_PROJECT || "-"].join(" | "));`, expect: [R`api | /home/deployer/api/src/index.ts | ./node_modules/.bin/ts-node | /home/deployer/api/tsconfig.json`, R`worker | /home/deployer/api/dist/worker.js | node | -`] },
          ],
        },
        {
          cmd: "ts-node تحت pm2 بيقع كل ثانية",
          title: "رجّعت الخدمة بـ pm2 تحت يوزر تاني: الدخول بايظ، وبعدين بتقع وتقوم كل ثانية بـ error TS1240",
          learn: R`تنقل تطبيق من خدمة يوزرها اتمسح لـ pm2 تحت يوزر موجود من غير ما تقع في ٣ فخاخ: [[.env]] بمسافات، و ts-node مش لاقي [[tsconfig.json]]، ولوجات قديمة بتكدب عليك. وتجرّب الدخول من غير ما باسورد يتسجّل في اللوج.`,
          out: R`[[pm2 list]] فيه [[↺ 0]] والـ uptime بيزيد، والدخول 200، وبعد reboot التطبيق راجع لوحده تحت [[pm2-webadmin.service]].`,
          desc: R`ده الحل التاني للقضية اللي فاتت («خدمة واقعة من أسبوعين»): اليوزر [[deployer]] اتمسح عن قصد ومش هيرجع، فالتطبيق هيشتغل تحت [[webadmin]] (يوزر موجود). الخطوات بسيطة: [[systemctl disable --now]] للخدمة القديمة، و [[chown -R]]، و [[pm2 start]] و [[pm2 save]] و [[pm2 startup]]. بس في الطريق ٣ فخاخ حصلت فعلًا:

١. [[grep "^NODE_ENV=" .env]] مالقاش حاجة، لأن السطر مكتوب [[NODE_ENV   = production1]] بمسافات.
٢. التطبيق من [[dist/]] قام و [[/health]] قال 200 والدخول 500 (لأن [[NODE_ENV]] = [[production1]]). ولما شغّلناه «زي ما كان» بـ ts-node، بقى يقع ويقوم كل ثانية بمئات [[error TS1240]]، لأن ts-node تحت pm2 ملقاش [[tsconfig.json]]. الحل [[TS_NODE_PROJECT]]، مش [[--transpile-only]].
٣. [[pm2 logs]] بيعرض سطور من تشغيلة قديمة، و [[pm2 flush]] بعد [[pm2 delete]] مبيمسحهاش.

وكمان: كل تجربة دخول بتتسجّل في اللوج بالباسورد، فبنجرّب بإيميل وهمي وباسورد غلط.`,
          example: R`sudo systemctl disable --now pm2-deployer
sudo chown -R webadmin:webadmin /home/deployer
grep -nE '^\s*NODE_ENV\s*=' /home/deployer/api/.env
cd /home/deployer/api && pm2 start dist/index.js --name api
pm2 delete api && pm2 start src/index.ts --interpreter ./node_modules/.bin/ts-node --name api
pm2 list
grep -oE "error TS[0-9]+" ~/.pm2/logs/api-error.log | sort | uniq -c
pm2 flush api && pm2 delete api
TS_NODE_PROJECT=$PWD/tsconfig.json pm2 start src/index.ts --interpreter ./node_modules/.bin/ts-node --name api
pm2 env 0 | grep TS_NODE_PROJECT
curl -s -X POST localhost/login -H 'Content-Type: application/json' -d '{"email":"nobody-test@example.invalid","password":"wrong-on-purpose"}' -w '  HTTP %{http_code}\n'
pm2 save && pm2 startup`,
          lines: [
            R`[[disable]] بيشيل الخدمة القديمة من «اللي يقوم بعد reboot»، و [[--now]] بيوقفها كمان دلوقتي. من غيرها، لو حد رجّع اليوزر بعدين، هيبقى فيه pm2 اتنين بيتخانقوا على بورت 3000.`,
            R`[[chown -R]] بيغيّر صاحب الفولدر وكل اللي جواه ([[-R]] = recursive) لـ [[webadmin]]. قبله [[cd]] نفسه بيفشل بـ [[Permission denied]] لأن [[/home/deployer]] صلاحياته [[drwxr-x---]] لصاحبه بس.`,
            R`فخ الـ [[.env]]: [[^\s*]] مسافات اختيارية في أول السطر، و [[\s*=]] مسافات قبل [[=]]. [[grep "^NODE_ENV="]] العادي مالقاش السطر خالص لأن فيه مسافات. [[-n]] رقم السطر.`,
            R`تشغيل من الكود المبني بـ node. التطبيق قام، و [[/health]] قال 200، والدخول 500 بـ [[No metadata for "User"]]، لأن [[NODE_ENV]] = [[production1]] (القضية كلها في درس «/health بيقول 200 والدخول بايظ»).`,
            R`«شغّله زي ما كان» من [[dump.pm2]]: [[--interpreter]] بيقول لـ pm2 يشغّل الملف بـ ts-node بدل node، و [[--name]] الاسم. هنا بيبدأ يقع ويقوم.`,
            R`عمود [[↺]] = عدد مرات الـ restart. لو بيزيد كل كام ثانية و [[uptime]] دايمًا [[0s]] أو [[1s]]، يبقى crash loop.`,
            R`[[grep -o]] بيطبع الحتة اللي ماتشت بس ([[error TS1240]] مثلًا)، و [[sort]] و [[uniq -c]] بيعدّوا كل نوع. مئات السطور بقت ٣ أنواع.`,
            R`[[flush]] قبل [[delete]]: [[pm2 flush api]] بيفضّي ملفات لوج التطبيق ده بس طول ما هو موجود في اللستة. بعد [[delete]] بيقول [[Logs flushed]] ومبيلمسش حاجة.`,
            R`الحل: [[TS_NODE_PROJECT]] متغير بيقول لـ ts-node «الـ tsconfig ده بالظبط». [[$PWD]] = الفولدر الحالي، فالمسار كامل. والمتغير بيتحفظ مع التطبيق في [[dump.pm2]].`,
            R`[[pm2 env 0]] بيطبع المتغيرات اللي التطبيق رقم 0 شغّال بيها فعلًا (مش اللي في الـ shell بتاعك)، و [[grep]] يطلّع اللي يهمك.`,
            R`تجربة الدخول من غير أسرار: إيميل بنطاق [[example.invalid]] (محجوز ومش ممكن يبقى حقيقي) وباسورد غلط. لو رجع 401 [[bad credentials]] يبقى الدخول شغّال للآخر (الجدول والـ query)، ومفيش باسورد حقيقي اتسجّل.`,
            R`[[pm2 save]] بيكتب اللستة الحالية في [[~/.pm2/dump.pm2]]، و [[pm2 startup]] بيطبع سطر [[sudo env PATH=...]] جاهز تنسخه وتشغّله عشان يعمل [[pm2-webadmin.service]].`,
          ],
          try: R`كمّل على معمل القضية اللي فاتت بعد ما الخدمة تقع: امشي على الحل التاني خطوة خطوة، واكتب في كل خطوة كود [[/login]] بباسورد غلط، وعمود [[↺]] في [[pm2 list]]. وبعدين [[docker restart svccase]] واتأكد إن الدخول 200 والبروسس بيوزر [[webadmin]].`,
          teach: R`## فين احنا

القضية اللي فاتت: [[pm2-deployer.service]] واقعة بـ [[status=217/USER]] لأن [[deployer]] اتمسح. المرة دي القرار إن اليوزر **مش هيرجع**، والتطبيق هيشتغل تحت [[webadmin]]، اليوزر اللي الأدمن بيدخل بيه وعنده sudo.

---

## ١. وقّف القديمة نهائي

~~~text sudo systemctl disable --now pm2-deployer
Removed "/etc/systemd/system/multi-user.target.wants/pm2-deployer.service".
~~~

- [[disable]]: بيمسح الـ symlink اللي في [[multi-user.target.wants]]، يعني «متقومش بعد reboot». الملف نفسه لسه موجود.
- [[--now]]: كمان [[stop]] دلوقتي.
- ليه مهم؟ لو سبتها enabled وحد بعدين رجّع [[deployer]] (أو عمل يوزر جديد بنفس الاسم)، بعد الـ reboot هيبقى فيه pm2 اتنين: واحد تحت [[deployer]] وواحد تحت [[webadmin]]، والاتنين بيشغّلوا نفس التطبيق على بورت 3000. التاني هيقع بـ [[EADDRINUSE]] ويفضل يحاول.
- تتأكد: [[systemctl is-enabled pm2-webadmin pm2-deployer]] بعد ما تخلّص لازم يقول [[enabled]] ثم [[disabled]].

---

## ٢. الصلاحيات: [[chown -R]]

قبل:

~~~text cd /home/deployer/api
-bash: line 1: cd: /home/deployer/api: Permission denied
~~~

[[/home/deployer]] صلاحياته [[drwxr-x---]] وصاحبه 1001: صاحبه بس (وجروبه) يقدر يدخل. [[webadmin]] مش واحد منهم.

~~~text sudo chown -R webadmin:webadmin /home/deployer ; ls -la /home | grep deployer
drwxr-x--- 5 webadmin webadmin 4096 Nov  3 09:32 deployer
~~~

- [[webadmin:webadmin]] = اليوزر والجروب. و [[-R]] على كل الملفات جوه.
- الأنضف على المدى الطويل: انقل التطبيق برّه [[/home]] خالص (مثلًا [[/srv/shop-api]]) وخلّي صاحبه حساب خدمة مخصوص. فولدر يوزر ممسوح بيشتغل فيه يوزر تاني دي حاجة مؤقتة.

---

## ٣. فخ [[.env]] بمسافات

عايز تعرف التطبيق بيقرا [[NODE_ENV]] بكام:

~~~text grep "^NODE_ENV=" .env ; echo "exit=$?"
exit=1
~~~

مفيش؟! بص على الملف بـ [[cat -A]] (بيوري المسافات و [[$]] في آخر كل سطر):

~~~text cat -A .env | head -3
PORT=3000$
NODE_ENV   = production1$
SYNCHRONIZE=1$
~~~

السطر موجود بمسافات حوالين [[=]]. مكتبة [[dotenv]] بتقبل ده عادي وبتقرا القيمة [[production1]]، بس [[grep "^NODE_ENV="]] بيدوّر على [[NODE_ENV=]] لازقين في بعض. الصح:

~~~text grep -nE '^\s*NODE_ENV\s*=' .env
2:NODE_ENV   = production1
~~~

- [[-E]] regex موسّع، و [[\s*]] صفر أو أكتر من المسافات.
- ولو عايز القيمة بس من غير مسافات: [[sed -nE 's/^\s*NODE_ENV\s*=\s*//p' .env]].
- نفس الفخ بيقابلك في [[cut -d= -f2]]: هيرجّع [[ production1]] بمسافة في الأول. (ودرس «غيّر إعداد في الداتابيز من السيرفر» فيه نسخة تانية من الفخ بعلامات [[" "]].)

[[production1]] دي غلطة لوحدها، والدرس اللي بيشرحها كاملة «/health بيقول 200 والدخول بايظ» في نفس التاب. هنا هتشوف بس إزاي ظهرت.

---

## ٤. تشغيل من [[dist/]]: [[/health]] 200 والدخول 500

أول حاجة الأدمن عملها: شغّل الكود المبني بـ node، لأنه «كده المفروض في الإنتاج»:

~~~bash
cd /home/deployer/api && pm2 start dist/index.js --name api
curl -s -w "  HTTP %{http_code}\n" localhost/health
curl -s -X POST localhost/login -H "Content-Type: application/json" -d '{"email":"nobody-test@example.invalid","password":"wrong-on-purpose"}' -w "  HTTP %{http_code}\n"
~~~

~~~text الناتج
{"status":"ok","db":true}  HTTP 200
{"error":"internal"}  HTTP 500
~~~

~~~text pm2 logs api --lines 6 --nostream
/home/webadmin/.pm2/logs/api-out.log last 6 lines:
0|api      | db ready, entities: (none)
0|api      | api listening on 3000 NODE_ENV=production1
0|api      | POST /login {"email":"nobody-test@example.invalid","password":"wrong-on-purpose"}

/home/webadmin/.pm2/logs/api-error.log last 6 lines:
0|api      | 2026-11-03T09:39:48.078Z POST /login EntityMetadataNotFoundError: No metadata for "User" was found.
~~~

ده بالظبط سيناريو درس «/health بيقول 200 والدخول بايظ»: الكود بيختار [[entity/*.js]] لو [[NODE_ENV === "production"]] بس، والقيمة [[production1]]، فدوّر على [[.ts]] جوه [[dist/]] وملقاش. التفاصيل والـ [[/ready]] هناك.

### بص على السطر التالت: الباسورد في اللوج!

التطبيق بيكتب الـ body بتاع كل طلب دخول. يعني أي حد بيجرّب بحسابه الحقيقي وانت بتصلّح، الباسورد بتاعه بقى في [[~/.pm2/logs/api-out.log]] نص عادي. ولما تيجي تبعت اللوج لحد يساعدك، بتبعته معاه.

~~~text grep -c '"password"' ~/.pm2/logs/api-out.log
2
~~~

عشان كده:

- **جرّب بإيميل وهمي وباسورد غلط:** [[nobody-test@example.invalid]] ([[.invalid]] نطاق محجوز في RFC 2606، عمره ما هيبقى إيميل حقيقي) وباسورد غلط. لو رجع **401** [[bad credentials]] يبقى الدخول شغّال للآخر: الـ route والجدول والـ query. ده دليل كافي من غير أي سر.
- ولو محتاج دخول ناجح (200)، استخدم حساب تجربة، واخفي التوكن من الناتج قبل ما تلزقه في أي حتة:

~~~text curl ... -d '{"email":"demo@shop.example","password":"demo123"}' | sed -E 's/"session":"[^"]*"/"session":"<hidden>"/g'
{"session":"<hidden>"}  HTTP 200
~~~

- لو باسورد حقيقي اتكتب فعلًا: [[pm2 flush api]] (يمسح اللوج)، وصاحب الحساب يغيّر الباسورد. والحل الحقيقي في الكود: متسجّلش الـ body بتاع [[/login]] أبدًا.

---

## ٥. «شغّله زي ما كان»: crash loop

[[dump.pm2]] (من القضية اللي فاتت) قال التطبيق كان شغّال من [[src/index.ts]] بـ ts-node. فالأدمن عمل كده:

~~~bash
pm2 delete api && pm2 start src/index.ts --interpreter ./node_modules/.bin/ts-node --name api
~~~

~~~text pm2 list (بعد ٤ ثواني، وبعد ١٠)
│ 0  │ api    │ default     │ 1.0.0   │ fork    │ 300      │ 0s     │ 1    │ online    │ 0%       │ 167.3mb  │ webadmin │ disabled │
│ 0  │ api    │ default     │ 1.0.0   │ fork    │ 334      │ 0s     │ 3    │ online    │ 0%       │ 95.9mb   │ webadmin │ disabled │
~~~

- [[status]] = [[online]]! pm2 بيقول online في اللحظة اللي بين كل وقعة والتانية. **متصدّقش [[online]] لوحده.**
- عمود [[↺]] بيزيد (1 ثم 3)، و [[uptime]] = [[0s]] و [[pid]] بيتغيّر: البروسس بيقع وpm2 بيقوّمه تاني. ده crash loop.

~~~text grep -oE "error TS[0-9]+" ~/.pm2/logs/api-error.log | sort | uniq -c
      3 error TS1238
      9 error TS1240
      9 error TS2564
~~~

~~~text أول خطأ
src/entity/User.ts(5,4): error TS1240: Unable to resolve signature of property decorator when called as an expression.
  Argument of type 'undefined' is not assignable to parameter of type 'Object'.
~~~

- [[TS1240]] و [[TS1238]]: الـ decorators ([[@Column()]] و [[@Entity()]]) متكتبة بالطريقة القديمة بتاعة TypeORM، و TypeScript 5 بيفهمها بالطريقة الجديدة (decorators القياسية) **إلا لو** [[experimentalDecorators: true]].
- [[TS2564]]: [[strict]] شغّال، فبيطلب قيمة أولية لكل property.
- والاتنين مضبوطين صح في [[tsconfig.json]] بتاع المشروع ([[experimentalDecorators]] و [[strict: false]]). يعني ts-node **مقراش الملف ده**.

---

## ٦. ليه ts-node مش لاقي [[tsconfig.json]]؟

الـ stack trace بيقول الحكاية:

~~~text من api-error.log
    at Object.<anonymous> (/usr/local/lib/node_modules/pm2/lib/ProcessContainerFork.js:33:23)
~~~

pm2 مبيشغّلش [[ts-node src/index.ts]] مباشرة. بيشغّل [[ts-node]] على ملف تبعه هو ([[ProcessContainerFork.js]]) وده اللي بيحمّل [[src/index.ts]]. و ts-node بيدوّر على [[tsconfig.json]] **من فولدر الملف اللي اتشغّل** لفوق، يعني من [[/usr/local/lib/node_modules/pm2/lib]] لحد [[/]]. مفيش، فبيستخدم إعداداته الافتراضية:

~~~text ./node_modules/.bin/ts-node --showConfig --dir /usr/local/lib/node_modules/pm2/lib (جزء)
  "compilerOptions": {
    "module": "node16",
    "target": "es2021",
    "strict": true,
~~~

مفيش [[experimentalDecorators]]، و [[strict: true]]. نفس الأخطاء بالظبط بتطلع لو شغّلت [[ts-node --skipProject src/entity/User.ts]] (يعني «من غير أي tsconfig»).

طب ليه كان شغّال قبل كده؟ [[dump.pm2]] القديم كان فيه [[TS_NODE_PROJECT]] في الـ env. الأدمن الأولاني كان حاطه وهو بيشغّل، و [[pm2 save]] حفظه. وده سبب تاني تقرا [[dump.pm2]] كله، مش السطر بتاع الملف بس.

---

## ٧. فخ اللوج القديم

لما بصّينا على [[pm2 logs api]] بعد ما شغّلناه بـ ts-node، أول السطور كانت:

~~~text
0|api      | db ready, entities: (none)
0|api      | api listening on 3000 NODE_ENV=production1
~~~

ده من التشغيلة اللي فاتت (من [[dist/]])! pm2 بيكتب اللوج في ملف باسم التطبيق ([[api-out.log]] و [[api-error.log]])، و [[pm2 delete]] بيشيل التطبيق من اللستة **ومبيمسحش الملفات**. التطبيق الجديد بنفس الاسم بيكمّل في نفس الملف.

ومش كده وبس، [[pm2 flush]] بعد [[delete]] مبيعملش حاجة للتطبيق ده. جربناها بتطبيق تجربة اسمه [[demo]] بيكتب سطر خطأ واحد، و [[api]] شغّال جنبه:

~~~text pm2 delete demo ; pm2 flush ; ls -la ~/.pm2/logs/ | grep demo
[PM2] Flushing /home/webadmin/.pm2/pm2.log
[PM2] Flushing:
[PM2] /home/webadmin/.pm2/logs/api-out.log
[PM2] /home/webadmin/.pm2/logs/api-error.log
[PM2] Logs flushed
-rw-r--r-- 1 webadmin webadmin   18 10:01:41 demo-error.log
~~~

- [[pm2 flush]] من غير اسم فضّى لوج كل التطبيقات **اللي لسه في اللستة** ([[api]]، واللي يمكن كنت محتاج لوجه!) ولوج pm2 نفسه، وساب [[demo-error.log]] بالـ 18 بايت بتوعه.
- و [[pm2 flush demo]] بعد الـ delete بيطبع [[Logs flushed]] وكود خروج 0، من غير ولا مسار ملف. يعني ملمسش حاجة، بس الرسالة بتقول إنه نجح.
- في الحالة الحقيقية ده اللي حصل: [[api-error.log]] فضل فيه 6005 بايت من الـ TS1240 القديمة بعد [[delete]] و [[flush]].

الصح:

~~~text pm2 flush api (والتطبيق لسه موجود)
[PM2] Flushing:
[PM2] /home/webadmin/.pm2/logs/api-out.log
[PM2] /home/webadmin/.pm2/logs/api-error.log
[PM2] Logs flushed
~~~

لما يطبع المسارات، يبقى فضّاهم فعلًا. فالترتيب: [[pm2 flush api && pm2 delete api]]. ولو التطبيق اتمسح خلاص: امسح الملفات بإيدك ([[rm ~/.pm2/logs/api-*.log]]) أو بص على وقت كل سطر.

---

## ٨. الحل: [[TS_NODE_PROJECT]]

~~~bash
TS_NODE_PROJECT=$PWD/tsconfig.json pm2 start src/index.ts --interpreter ./node_modules/.bin/ts-node --name api
~~~

~~~text بعد ١٤ ثانية
│ 0  │ api    │ default     │ 1.0.0   │ fork    │ 567      │ 14s    │ 0    │ online    │ 0%       │ 285.1mb  │ webadmin │ disabled │
~~~

~~~text pm2 logs api ; pm2 env 0 | grep TS_NODE_PROJECT
0|api      | db ready, entities: User
0|api      | api listening on 3000 NODE_ENV=production1
TS_NODE_PROJECT: /home/deployer/api/tsconfig.json
~~~

- [[VAR=value command]] في نفس السطر: المتغير بيتبعت للأمر ده بس، ومبيفضلش في الـ shell بتاعك. و pm2 بياخد متغيرات البيئة وقت [[pm2 start]] ويحفظها مع التطبيق.
- [[$PWD]]: لازم مسار **كامل**. لو كتبت [[TS_NODE_PROJECT=tsconfig.json]] بس، هيتفهم نسبة لفولدر تاني.
- [[↺ 0]] و [[uptime 14s]] بيزيد، و [[entities: User]]، والدخول بباسورد غلط بقى 401 والحساب التجربة 200.
- البديل: ecosystem file فيه [[env: { TS_NODE_PROJECT: "..." }]]، وده الأحسن لأنه متسجّل في git.

### ليه مش [[--transpile-only]]؟

أول حاجة هتلاقيها على النت: «استخدم [[--transpile-only]]» (أو [[TS_NODE_TRANSPILE_ONLY=true]]): ts-node يحوّل كل ملف لوحده من غير ما يعمل type check، فأخطاء الأنواع تختفي. بس TypeORM معتمد على الأنواع نفسها وقت التشغيل: [[emitDecoratorMetadata]] بيكتب نوع كل column (Number و String) جوه الكود، و TypeORM بيبني الجداول منها. ومن غير type check، أي نوع جاي من ملف تاني بيبقى [[Object]].

جربناها على entity فيها [[@Column() total: Cents]] و [[Cents]] = [[number]] من ملف تاني:

~~~text
== full type-check:
design:type of total = Number
column type: [Function: Number]
== --transpile-only:
design:type of total = Object
DataTypeNotSupportedError: Data type "Object" in "Order.total" is not supported by "sqljs" database.
~~~

- هنا وقع وقت القيام، وده **أحسن** حالة.
- التطبيق ده شغّال بـ [[SYNCHRONIZE=1]] (شوف [[.env]] فوق): TypeORM بيقارن الـ entities بالجداول كل ما يقوم ويعدّلها عشان تطابق. أي نوع اتغيّر في الـ metadata ممكن يتحوّل لـ [[ALTER TABLE]] على داتا الإنتاج. فبلاش تغيّر طريقة الـ compile على سيرفر شغّال بـ synchronize.
- و [[--transpile-only]] كمان بيخبّي أخطاء أنواع حقيقية كانت هتمسكها.

---

## ٩. يقوم بعد reboot

~~~text pm2 save
[PM2] Successfully saved in /home/webadmin/.pm2/dump.pm2
~~~

~~~text pm2 startup (وانت webadmin مش root)
[PM2] To setup the Startup Script, copy/paste the following command:
sudo env PATH=$PATH:/usr/bin /usr/local/lib/node_modules/pm2/bin/pm2 startup systemd -u webadmin --hp /home/webadmin
~~~

pm2 مش بيعمل الخدمة لوحده لأنه محتاج root. بيطبع الأمر جاهز: [[-u webadmin]] اليوزر اللي الخدمة هتشتغل بيه، و [[--hp]] الـ home بتاعه (فيه [[.pm2]]). انسخه وشغّله:

~~~text
Created symlink /etc/systemd/system/multi-user.target.wants/pm2-webadmin.service → /etc/systemd/system/pm2-webadmin.service.
[PM2] [v] Command successfully executed.
~~~

وبعد reboot ([[docker restart svccase]]):

~~~text
active
after reboot: login HTTP 200
webadmin PM2 v5.4.3: God Daemon (/home/webadmin/.pm2)
webadmin node /home/deployer/api/src/index.ts
~~~

> **ترتيب [[save]] مهم:** [[pm2 save]] بيحفظ اللي شغّال **دلوقتي**. لو عملته والتطبيق في crash loop، الـ reboot الجاي هيرجّع الـ crash loop. احفظ بعد ما تتأكد إن [[↺]] ثابت والدخول شغّال.

---

## ١٠. فخ: [[pm2 list]] بيوزر تاني

وانت بتشخّص، طبيعي تكتب [[sudo pm2 list]] أو [[pm2 list]] وانت root:

~~~text pm2 list (وانت root)
[PM2] Spawning PM2 daemon with pm2_home=/root/.pm2
[PM2] PM2 Successfully daemonized
┌────┬───────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id │ name      │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
└────┴───────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘
~~~

- كل يوزر ليه pm2 لوحده في [[~/.pm2]]. root ملوش تطبيقات، فاللستة فاضية (مش «التطبيق وقع»).
- والأسوأ: [[Spawning PM2 daemon]]. الأمر **شغّل** daemon جديد تحت root. دلوقتي فيه اتنين:

~~~text ps -eo user,cmd | grep "God Daemon"
webadmin PM2 v5.4.3: God Daemon (/home/webadmin/.pm2)
root     PM2 v5.4.3: God Daemon (/root/.pm2)
~~~

- اقفله: [[pm2 kill]] بنفس اليوزر اللي فتحه ([[PM2 Daemon Stopped]]). والصح من الأول: [[sudo -u webadmin PM2_HOME=/home/webadmin/.pm2 pm2 list]]، أو ادخل بـ [[webadmin]] نفسه.

---

## اللي فاضل (ومش جزء من إنقاذ الموقع)

التطبيق رجع **زي ما كان**: ts-node و [[NODE_ENV=production1]]. ده كان القرار الصح وقت العطل (أقل تغيير). بعدها، بهدوء وفي وقت مخطط: صلّح [[NODE_ENV=production]]، وشغّل [[dist/index.js]] بـ node (أسرع في القيام وأقل رامات: 285 ميجا بـ ts-node في المعمل)، وانقل التطبيق لـ [[/srv]] بحساب خدمة، وسجّل ecosystem file في git.

---

## البدايل اللي اترفضت

| البديل | ليه لأ |
|---|---|
| [[--transpile-only]] عشان الأخطاء تختفي | الـ metadata بتتغيّر ([[Number]] بقت [[Object]]) و TypeORM بـ [[SYNCHRONIZE=1]] بيبني الجداول منها |
| تضيف [[experimentalDecorators]] في الكود أو تعدّل tsconfig | الـ tsconfig سليم أصلًا، المشكلة إنه مش بيتقري. تعديل الكود على السيرفر وقت عطل بيعمل فرق بين السيرفر والريبو |
| تفضل على [[dist/]] وتغيّر الشرط لـ [[startsWith("prod")]] | تغيير كود وقت عطل، وبيخبّي الغلطة بدل ما يصلّحها |
| [[pm2 start]] وانت root | التطبيق كله بصلاحيات root، وفي [[/root/.pm2]] اللي محدش هيدوّر فيه |
| تجرّب الدخول بحسابك الحقيقي | الباسورد يتسجّل نص عادي في [[api-out.log]] |
| [[pm2 save]] قبل ما تتأكد | الـ reboot الجاي يرجّع الحالة الغلط |

---

## التأكيد

- [[pm2 list]]: [[↺ 0]] و [[uptime]] بيزيد بعد دقيقة.
- [[curl]] بإيميل وهمي = 401، وبحساب التجربة = 200.
- [[systemctl is-enabled pm2-webadmin pm2-deployer]] = [[enabled]] و [[disabled]].
- reboot تجريبي: الدخول 200 والبروسس تحت [[webadmin]].

## متتكررش

- طريقة التشغيل في ecosystem file متسجّل في git، فيه [[interpreter]] و [[env]] كاملة.
- التطبيق يسجّل [[NODE_ENV]] واسم الـ tsconfig وهو بيقوم، ويرفض يقوم بـ entities فاضية (درس «/health بيقول 200 والدخول بايظ»).
- متسجّلش أي body فيه [[password]]. واعمل redaction في اللوجر نفسه.
- الإنتاج يشتغل بـ [[dist/]] و node، مش ts-node.

---

## الخلاصة

| الخطوة | الأمر | لقينا |
|---|---|---|
| ١ | [[systemctl disable --now pm2-deployer]] | القديمة مش هتقوم تاني |
| ٢ | [[chown -R webadmin:webadmin]] | [[cd]] بقى يشتغل |
| ٣ | [[grep -nE '^\s*NODE_ENV\s*=']] | [[NODE_ENV   = production1]] |
| ٤ | [[pm2 start dist/index.js]] | [[/health]] 200 والدخول 500 |
| ٥ | [[pm2 start src/index.ts --interpreter ts-node]] | crash loop و [[TS1240]] |
| ٦ | [[--showConfig --dir pm2/lib]] | ts-node مش لاقي tsconfig |
| ٧ | [[pm2 flush api]] قبل [[delete]] | لوج نضيف |
| حل | [[TS_NODE_PROJECT=$PWD/tsconfig.json]] | [[↺ 0]] والدخول 200 |
| ٩ | [[pm2 save]] و [[pm2 startup]] | بيرجع بعد reboot |`,
          deep: {
            why: R`أي نقل لتطبيق من «طريقة تشغيل» لطريقة تانية (يوزر تاني، أو مدير بروسس تاني، أو node بدل ts-node) بيغيّر حاجات مش ظاهرة: متغيرات البيئة، والفولدر الحالي، والملفات اللي البرنامج بيدوّر عليها بالنسبة لمكانه. والتطبيق ممكن يقوم ويرد على [[/health]] وهو ناقص حاجة، أو يقع ويقوم بسرعة لدرجة إن [[status]] يبان [[online]]. والفخاخ دي بتحصل وانت مستعجل ترجّع الموقع، فبتصلّح غلطة بغلطة.`,
            how: R`pm2 في fork mode بيعمل spawn للـ interpreter ومعاه ملف [[ProcessContainerFork.js]] بتاعه، والملف ده بيعمل [[require]] لسكربتك. ts-node 10 (في الوضع الافتراضي script mode) بيحدد مكان البحث عن [[tsconfig.json]] من مكان أول سكربت اتشغّل، فبيبدأ من فولدر pm2. [[TS_NODE_PROJECT]] بيتخطى البحث. و [[emitDecoratorMetadata]] بيكتب [[Reflect.metadata("design:type", Number)]] جنب كل decorator، ومع [[isolatedModules]] (اللي [[--transpile-only]] بيعمله فعليًا) الـ compiler مش شايف الملفات التانية، فأي نوع مستورد بيبقى [[Object]]. و pm2 بيحفظ اللوج في [[~/.pm2/logs/<name>-out.log]] و [[-error.log]]، و [[flush]] بيلف على التطبيقات اللي في اللستة بس. و [[dotenv]] بيقبل [[KEY = value]] بمسافات، بس أدوات السطر ([[grep]] و [[cut]] و [[source]] في bash) مش زيه: [[source .env]] نفسه هيفشل بـ [[NODE_ENV: command not found]].`,
            when: R`أي وقت بتنقل تطبيق لـ pm2 بيوزر تاني أو سيرفر تاني، أو بتشغّل TypeScript تحت pm2، أو [[pm2 list]] فيه [[↺]] بيزيد. وأي وقت بتقرا [[pm2 logs]] بعد [[delete]] و [[start]] بنفس الاسم. وأي وقت بتجرّب دخول على سيرفر إنتاج.`,
            mistakes: R`تصدّق [[online]] في [[pm2 list]] وتنسى عمود [[↺]]. وتقرا سطور لوج من تشغيلة قديمة وتفتكرها الحالية. و [[pm2 flush]] بعد [[delete]] وتفتكر اللوج اتمسح. و [[--transpile-only]] عشان الأخطاء تختفي. و [[TS_NODE_PROJECT=tsconfig.json]] من غير مسار كامل. و [[pm2 save]] وهو في crash loop. و [[sudo pm2 list]] فتشغّل daemon تحت root. وتجرّب بحسابك الحقيقي والباسورد يتسجّل. و [[grep "^KEY="]] على [[.env]] فيه مسافات وتقول «المتغير مش موجود».`
          },
          sol: R`[[grep "^NODE_ENV=" .env]] كود خروجه 1، و [[grep -nE '^\s*NODE_ENV\s*=' .env]] بيطبع [[2:NODE_ENV   = production1]]. من [[dist/]]: [[/health]] 200 و [[/login]] 500 و [[No metadata for "User" was found.]]. بـ ts-node من غير [[TS_NODE_PROJECT]]: [[↺]] من 1 لـ 3 في ٦ ثواني، و [[3 error TS1238]] و [[9 error TS1240]] و [[9 error TS2564]]. بـ [[TS_NODE_PROJECT]]: [[↺ 0]] و [[entities: User]] والدخول بإيميل وهمي 401 [[bad credentials]] وبحساب التجربة 200. [[pm2 flush]] بعد [[delete]] ساب [[api-error.log]] بـ 6005 بايت. و [[--transpile-only]]: [[design:type]] بقى [[Object]] بدل [[Number]] و [[DataTypeNotSupportedError]]. وبعد [[pm2 startup]] و reboot: الدخول 200 تحت [[webadmin]].

اتجرّب على Ubuntu 24.04 جوه Docker بـ systemd، مع Node 18.19 و pm2 5.4.3 و ts-node 10.9.2 و TypeScript 5.4 و TypeORM 0.3.31 و sql.js و dotenv 16. ملحوظة: مع TypeScript 5.9 و ts-node 10.9.2 من غير tsconfig الخطأ اللي بيظهر الأول [[SyntaxError: Cannot use import statement outside a module]] بدل [[TS1240]]، والسبب واحد (tsconfig مش متقري) والحل واحد.`,
          practice: [
            { lvl: 'سريع', t: R`من غير ما تبص: [[pm2 list]] بيقول [[online]] و [[↺ 47]] و [[uptime 0s]]. التطبيق شغّال ولا لأ؟ وإيه أول أمرين تكتبهم؟`, done: R`كتبت إنه crash loop (بيقع ويقوم) وإن [[online]] لحظة بين وقعتين، والأمرين: [[pm2 logs <name> --lines 30 --nostream]] (أو [[grep -oE ... | sort | uniq -c]] على ملف الـ error) و [[pm2 describe <name>]] أو [[pm2 env <id>]] عشان تشوف بيشتغل بإيه.` },
            { lvl: 'تطبيق', t: R`اقرا وتوقّع: ملف [[.env]] فيه السطور دي:
[[PORT=3000]]
[[ NODE_ENV = production]]
[[export DB_HOST=db]]
[[# NODE_ENV=development]]
توقّع ناتج كل واحد: [[grep "^NODE_ENV=" .env]]، و [[grep -c NODE_ENV .env]]، و [[grep -nE '^\s*NODE_ENV\s*=' .env]]، و [[grep -E '^PORT=' .env | cut -d= -f2]]. وبعدين شغّلهم.`, done: R`التوقعات الأربعة طلعت صح: ولا سطر، و 2 (لأن السطر المتعلّق عليه كمان فيه NODE_ENV)، و [[2: NODE_ENV = production]]، و [[3000]]، وكتبت ليه [[grep -c]] لوحده بيضلّل.` },
            { lvl: 'تطبيق', t: R`صلّح الأمر البايظ: الأمر ده بيوقّع التطبيق تحت pm2 بـ TS1240 على سيرفر ومش على جهازك:
[[pm2 start src/index.ts --interpreter ./node_modules/.bin/ts-node --name api]]
صلّحه بطريقتين: سطر واحد بـ [[TS_NODE_PROJECT]]، و [[ecosystem.config.js]] فيه [[script]] و [[interpreter]] و [[env]]. وجرّب الاتنين في المعمل.`, done: R`الطريقتين بيدّوا [[↺ 0]] بعد دقيقة و [[entities: User]] في اللوج، و [[pm2 env 0]] فيه [[TS_NODE_PROJECT]] بمسار كامل، والـ ecosystem file فيه المسار كامل مش [[./tsconfig.json]]، وكتبت ليه.` },
            { lvl: 'تطبيق', t: R`قارن وقيس: شغّل نفس التطبيق مرة بـ ts-node (بـ [[TS_NODE_PROJECT]]) ومرة من [[dist/index.js]] بـ node و [[NODE_ENV=production]]. قيس لكل واحدة: الوقت من [[pm2 start]] لحد ما [[/health]] يرد 200، وعمود [[mem]] في [[pm2 list]] بعد دقيقة.`, done: R`عندك جدول برقمين لكل طريقة (ثواني وميجا)، و ts-node أبطأ في القيام وأكتر رامات (في المعمل حوالي 285 ميجا)، وكتبت جملة: ليه الإنتاج يشتغل من [[dist/]].` },
            { lvl: 'تحدي', t: R`دوّر بنفسك: من وثائق ts-node ([[ts-node --help]] وصفحة الـ configuration) اعرف الفرق بين [[--cwd-mode]] و [[--script-mode]] و [[--project]] و [[--dir]]، وإيه فيهم ممكن يحل المشكلة من غير [[TS_NODE_PROJECT]]. جرّب اللي تلاقيه تحت pm2 في المعمل.`, done: R`كتبت لكل خيار جملة، وجرّبت واحد على الأقل غير [[TS_NODE_PROJECT]] (مثلًا [[TS_NODE_CWD_MODE=true]] أو [[--interpreter-args "--project /home/deployer/api/tsconfig.json"]]) وكتبت اشتغل ولا لأ تحت pm2 ونسخة pm2 و ts-node.` },
            { lvl: 'تحدي', t: R`ابني حاجة: middleware صغير لـ Express بيسجّل كل طلب (method و path و status و الوقت) ومعاه الـ body، بس بيستبدل أي حقل اسمه [[password]] أو [[token]] أو [[session]] أو [[secret]] (في أي مستوى جوه الـ JSON) بـ [[<hidden>]]. واكتب اختبار ليه.`, done: R`بعد ما تحطه في تطبيق المعمل وتعمل دخول، [[grep -c '"password":"[^<]' ~/.pm2/logs/api-out.log]] = 0، والاختبار بيغطي حقل جوه object جوه array، والطلب نفسه لسه بيوصل بالباسورد الحقيقي للـ route.` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`], sh: R`bash`, run: R`d=$(mktemp -d); cd "$d"
printf 'PORT=3000\nNODE_ENV   = production1\n# NODE_ENV=development\n' > .env
grep "^NODE_ENV=" .env; echo "plain grep exit=$?"
grep -nE '^ *NODE_ENV *=' .env
sed -nE 's/^ *NODE_ENV *= *//p' .env
cd /; rm -rf "$d"`, expect: [R`plain grep exit=1`, R`2:NODE_ENV   = production1`, R`production1`] },
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`node`, run: R`const log = [
  "0|api | src/entity/User.ts(3,2): error TS1238: Unable to resolve signature of class decorator",
  "0|api | src/entity/User.ts(5,4): error TS1240: Unable to resolve signature of property decorator",
  "0|api | src/entity/User.ts(6,3): error TS2564: Property 'id' has no initializer",
  "0|api | src/entity/User.ts(8,4): error TS1240: Unable to resolve signature of property decorator",
  "0|api | src/entity/User.ts(11,4): error TS1240: Unable to resolve signature of property decorator",
].join("\n");
const counts = {};
for (const m of log.matchAll(/error TS\d+/g)) counts[m[0]] = (counts[m[0]] || 0) + 1;
for (const k of Object.keys(counts).sort()) console.log(String(counts[k]).padStart(7), k);
const redact = (s) => s.replace(/"(password|session|token)":"[^"]*"/g, '"$1":"<hidden>"');
console.log(redact('POST /login {"email":"a@example.invalid","password":"wrong-on-purpose"}'));`, expect: [R`      3 error TS1240`, R`      1 error TS1238`, R`"password":"<hidden>"`] },
          ],
        },
        {
          cmd: "بسجّل في الداشبورد ومش بيسجّل",
          title: "«بسجّل في الداشبورد ومش بيسجّل»: تتبّع الطلب من الفرونت للباك للداتابيز للإيميل من الترمنال",
          learn: R`تعرف الفرونت بيبعت لأنهي عنوان (من الكود ومن الـ bundle المرفوع)، ومين بيسمع على البورت ده، وتجرّب الـ endpoint بنفسك وتفهم [[HTTP 000]] و exit 7 و 500 و 502، وتلاقي اللي ناقص (داتابيز أو SMTP) قبل ما تفتح كود.`,
          out: R`جدول فيه كل طبقة (الفرونت، والبورت، والباك، والداتابيز، والإيميل) وحالتها بدليل من أمر، والسبب الأول اللي لازم يتصلّح.`,
          desc: R`صاحب المشروع بيقول «بدخل بيانات التسجيل في الداشبورد ومفيش حاجة بتحصل». ده وصف لعَرَض، مش لسبب، والسبب ممكن يبقى في أي طبقة: الفرونت بيبعت لعنوان غلط، أو مفيش باك شغّال أصلًا، أو الباك على بورت غير اللي الفرونت مستنيه، أو الداتابيز مش متسطّبة، أو التسجيل محتاج إيميل تفعيل و SMTP مش متظبط.

بنمشي بالترتيب من برّه لجوه، وكل خطوة بأمر بيقفل احتمال: [[grep]] على كود الفرونت (العنوان والـ fallback)، و [[netstat]] (مين بيسمع)، و [[curl]] على الـ endpoint بنفسك ([[HTTP 000]] و exit code 7 = «مفيش حد بيسمع»)، و [[sc query]] و [[where]] (الداتابيز)، و [[grep]] على متغيرات SMTP. وللموقع المرفوع: تنزّل الـ HTML وتطلّع اسم الـ bundle، وتطلّع منه عنوان الـ API اللي اتحفر جواه وقت الـ build، وتجرّب كذا endpoint في loop: لو كلهم 502 حتى [[/health]]، يبقى nginx شغّال والباك واقع، مش مشكلة في الفورم.`,
          example: R`# على جهازك (Git Bash) في فولدر المشروع:
grep -rn "REACT_APP_API_URL\|baseURL" frontend/src
grep -n "PORT" backend/env.example backend/src/server.js
netstat -ano | grep -E ":(3000|8000|3306)\s.*LISTEN"
curl -s -m 5 -X POST http://localhost:8000/api/auth/login -H "Content-Type: application/json" -d '{"email":"nobody-test@example.invalid","password":"wrong"}' -w "\nHTTP %{http_code}\n"; echo "exit=$?"
sc query MySQL80; where mysql
grep -rhoE "process\.env\.SMTP[A-Z_]*" backend/src | sort -u
# الموقع المرفوع:
curl -s -L https://dash.shop.example/ | grep -oE 'src="[^"]+\.js"'
curl -s -o main.js https://dash.shop.example/static/js/main.3f9a1c2e.js
grep -oE 'https?://[a-zA-Z0-9.-]+(:[0-9]+)?/api' main.js | sort | uniq -c
for p in /health /api/auth/login /api/auth/register; do printf "%-20s " "$p"; curl -s -m 10 -o /dev/null -w "%{http_code}\n" "https://api.shop.example$p"; done`,
          lines: [
            R`الفرونت بيكلّم مين؟ [[-r]] كل الفولدر، و [[-n]] رقم السطر، و [[\|]] «أو» في grep العادي. بيطلّع سطر [[baseURL]] ومعاه القيمة الاحتياطية (الـ fallback) بعد [[||]] اللي بتتستخدم لو المتغير مش متحدد.`,
            R`الباك بيسمع على كام؟ نفس الاسم في ملفين: [[env.example]] (اللي الناس بتنسخه [[.env]]) والكود نفسه ([[process.env.PORT || 8000]]). لو مختلفين، ده فخ.`,
            R`مين بيسمع فعلًا على الجهاز؟ [[netstat -ano]] كل الاتصالات بالأرقام ومعاها رقم البروسس (PID)، و [[grep -E]] البورتات التلاتة في حالة [[LISTENING]]. ولا سطر = مفيش ولا واحد شغّال.`,
            R`جرّب الطلب بنفسك زي الفرونت: [[-m 5]] أقصى ٥ ثواني، و [[-X POST]] و [[-H]] و [[-d]] نفس اللي الفورم بيبعته (بإيميل وهمي)، و [[-w]] يطبع الكود. [[HTTP 000]] مع [[exit=7]] = curl موصلش أصلًا.`,
            R`الداتابيز متسطّبة؟ [[sc query]] بيسأل ويندوز عن خدمة باسمها، و [[where]] بيدوّر على البرنامج في الـ PATH. الاتنين بيقولوا «مش موجود» بنص واضح.`,
            R`الإيميل: [[-h]] من غير اسم الملف، و [[-o]] الحتة اللي ماتشت بس، و [[sort -u]] من غير تكرار. لستة كل متغيرات SMTP اللي الكود محتاجها.`,
            R`الموقع المرفوع: [[-L]] يمشي ورا أي redirect، و [[grep -oE]] يطلّع كل [[src="....js"]] من الـ HTML: اسم الـ bundle اللي المتصفح بيحمّله.`,
            R`[[-o main.js]] ينزّل الـ bundle في ملف بدل ما يطبعه.`,
            R`العنوان المحفور وقت الـ build: كل [[http://]] أو [[https://]] بعدها اسم (وبورت اختياري [[(:[0-9]+)?]]) وبعدها [[/api]]، و [[uniq -c]] يعدّ كل واحد.`,
            R`loop على كذا endpoint: [[printf "%-20s "]] يطبع الاسم بعرض ثابت، و [[-o /dev/null -w "%{http_code}"]] الكود بس. لو كلهم 502، المشكلة في الباك كله مش في endpoint.`,
          ],
          try: R`ابني المعمل اللي في الشرح (فولدر [[frontend]] فيه [[client.js]] و [[backend]] فيه [[env.example]] و [[server.js]]) وشغّل الباك بـ [[PORT=3000]] زي ما [[env.example]] بيقول. امشي على الخطوات واكتب في كل خطوة الأمر والناتج والطبقة اللي اتقفلت. وبعدين شغّله على 8000 وشوف إيه اللي اتغيّر.`,
          teach: R`## العَرَض

«بدخل بياناتي في صفحة التسجيل في الداشبورد، وبدوس تسجيل، ومفيش حاجة بتحصل». مفيش رسالة خطأ، ومفيش إيميل تفعيل.

ده كلام اليوزر، وهو صح من ناحيته. بس «مفيش حاجة بتحصل» ممكن تبقى أي حاجة من دول:

~~~text الطلب بيمشي كده
المتصفح (الفورم) ──> عنوان الـ API ──> بورت ──> الباك ──> الداتابيز
                                                      └──> SMTP (إيميل التفعيل)
~~~

كل سهم ممكن يكون مقطوع. الطريقة: من الشمال لليمين، وكل خطوة بأمر.

---

## المعمل

مشروع فيه فولدرين، زي ما كان في الحالة الحقيقية (الأسامي مخترعة):

~~~text frontend/src/api/client.js
import axios from "axios";
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8000/api",
});
export default api;
~~~

~~~text backend/env.example
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
~~~

~~~text backend/src/server.js
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log("API on " + PORT));
~~~

الأوامر اتجرّبت على Windows 11 من Git Bash و PowerShell 7، والجزء بتاع الموقع المرفوع على nginx في Docker.

---

## ١. الفرونت بيبعت لمين؟

~~~text grep -rn "REACT_APP_API_URL\|baseURL" frontend/src
frontend/src/api/client.js:3:  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8000/api",
~~~

- [[process.env.REACT_APP_API_URL]]: في Create React App، أي متغير يبدأ بـ [[REACT_APP_]] بيتحط في الكود **وقت الـ build** (أو وقت [[npm start]]). مش بيتقري وقت ما الصفحة تفتح.
- [[|| "http://localhost:8000/api"]]: لو المتغير مش متحدد (مفيش [[.env]] في الفرونت)، الفرونت بيكلّم **8000**. ده الـ fallback، وغالبًا هو اللي شغّال لأن محدش عمل [[.env]] للفرونت.
- عندك [[.env]] في الفرونت؟ [[ls -a frontend]] و [[cat frontend/.env 2>/dev/null]].

النتيجة: الفرونت مستني الباك على [[localhost:8000]].

> و CRA نفسه (الفرونت وهو بيشتغل بـ [[npm start]]) بيقعد على **3000**. افتكر الرقم ده.

---

## ٢. الباك بيسمع على كام؟

~~~text grep -n "PORT" backend/env.example backend/src/server.js
backend/env.example:1:PORT=3000
backend/env.example:3:DB_PORT=3306
backend/env.example:7:SMTP_PORT=587
backend/src/server.js:3:const PORT = process.env.PORT || 8000;
~~~

هنا الفخ:

- الكود لوحده (من غير [[.env]]): **8000**. مطابق للفرونت.
- بس أي حد بيعمل [[cp env.example .env]] (الخطوة العادية في أي README) هيشغّل الباك على **3000**.
- و 3000 أصلًا بورت CRA. فلو الاتنين شغّالين: واحد فيهم هيقع بـ [[EADDRINUSE]]، أو CRA يعرض عليك يشتغل على بورت تاني (من وثائق Create React App).

| مين | البورت | منين |
|---|---|---|
| الفرونت مستني الباك على | 8000 | الـ fallback في [[client.js]] |
| الباك من غير [[.env]] | 8000 | [[process.env.PORT || 8000]] |
| الباك بعد [[cp env.example .env]] | 3000 | [[PORT=3000]] |
| CRA نفسه | 3000 | الافتراضي بتاعه |

---

## ٣. فيه حد بيسمع أصلًا؟

~~~text netstat -ano | grep -E ":(3000|8000|3306)\s.*LISTEN"
(ولا سطر)
~~~

- [[-a]] كل الاتصالات والبورتات اللي بتسمع، و [[-n]] أرقام من غير ما يحوّلها لأسماء (أسرع)، و [[-o]] رقم البروسس (PID) في آخر عمود.
- [[:(3000|8000|3306)\s]]: البورت متبوع بمسافة (عشان [[:30001]] ميتحسبش).
- ولا سطر = لا فرونت ولا باك ولا MySQL شغّالين.

ولما شغّلنا الباك بـ [[.env]] المنسوخ:

~~~text
  TCP    0.0.0.0:3000           0.0.0.0:0              LISTENING       46324
  TCP    [::]:3000              [::]:0                 LISTENING       46324
~~~

بيسمع على 3000 (IPv4 و IPv6). والـ PID عشان تعرف مين: [[tasklist //FI "PID eq 46324"]] من Git Bash (الـ [[//]] عشان Git Bash ميحوّلش [[/FI]] لمسار).

---

## ٤. جرّب الطلب بنفسك

متعتمدش على المتصفح. ابعت نفس الطلب بـ curl:

~~~bash
curl -s -m 5 -X POST http://localhost:8000/api/auth/login -H "Content-Type: application/json" -d '{"email":"nobody-test@example.invalid","password":"wrong"}' -w "\nHTTP %{http_code}\n"; echo "exit=$?"
~~~

~~~text والباك على 3000
HTTP 000
exit=7
~~~

- [[HTTP 000]]: مفيش رد HTTP خالص. curl مقدرش يكلّم حد.
- [[exit=7]]: كود curl لـ «Failed to connect to host» (مفيش حد بيسمع على البورت ده، أو فايروول رافض). كود 28 = timeout، و 6 = مش عارف يحوّل الاسم لـ IP. (من [[man curl]] قسم EXIT CODES.)
- [[-m 5]]: من غيره، لو فيه فايروول بيرمي الطلبات، curl هيفضل مستني دقيقتين.
- إيميل [[example.invalid]] وباسورد غلط: مش عايز تعمل حساب حقيقي ولا تبعت باسورد حقيقي وانت بتجرّب.

ولو جرّبت البورت التاني (3000) على [[/api/auth/register]]:

~~~text
{"message":"Internal server error"}
HTTP 500
~~~

دلوقتي فيه رد! بس 500. و لوج الباك:

~~~text
API on 3000
POST /api/auth/register connect ECONNREFUSED 127.0.0.1:3306
~~~

| اللي رجع | معناه | الطبقة اللي فيها المشكلة |
|---|---|---|
| [[HTTP 000]] و exit 7 | مفيش حد بيسمع | بورت غلط، أو الباك مش شغّال |
| [[HTTP 000]] و exit 28 | محدش رد في الوقت | فايروول بيرمي، أو السيرفر معلّق |
| 404 | فيه سيرفر، والمسار مش موجود | [[/api]] زيادة أو ناقصة في العنوان |
| 500 | الباك وصله الطلب وفشل | الداتابيز أو كود الباك (اقرا لوجه) |
| 502 | nginx شغّال والباك اللي وراه لأ | الباك واقع (الموقع المرفوع) |
| 401 أو 400 | كله شغّال، والبيانات غلط | مفيش مشكلة في السيرفر |

---

## ٥. الداتابيز موجودة؟

[[ECONNREFUSED 127.0.0.1:3306]] = مفيش MySQL بيسمع. متسطّب أصلًا؟

~~~text sc query MySQL80
[SC] EnumQueryServicesStatus:OpenService FAILED 1060:

The specified service does not exist as an installed service.
~~~

~~~text where mysql
INFO: Could not find files for the given pattern(s).
~~~

- [[sc query <name>]]: بيسأل مدير الخدمات في ويندوز. [[MySQL80]] الاسم الافتراضي اللي MySQL 8 installer بيعمله. [[FAILED 1060]] = الخدمة مش موجودة خالص (مش «واقفة»). لو متسطّبة وواقفة هتلاقي سطر [[STATE              : 1  STOPPED]] (اتجرّب على خدمة واقفة تانية).
- [[where mysql]]: برنامج [[where.exe]] بتاع ويندوز بيدوّر في الـ PATH. ولا نتيجة = مفيش [[mysql]] client كمان.
- يعني **مفيش MySQL على الجهاز**. ده مش باج: المشروع محتاج داتابيز والمطوّر معندوش. الحل: تسطّبها، أو تشغّلها في Docker ([[docker run -d --name mysql -e MYSQL_ROOT_PASSWORD=... -p 3306:3306 mysql:8]])، وتحط البيانات في [[backend/.env]].

---

## ٦. التسجيل محتاج إيميل

حتى لو الداتابيز اشتغلت، صفحة التسجيل بتبعت **كود تفعيل** بالإيميل. الكود محتاج إيه؟

~~~text grep -rhoE "process\.env\.SMTP[A-Z_]*" backend/src | sort -u
process.env.SMTP_FROM
process.env.SMTP_HOST
process.env.SMTP_PASS
process.env.SMTP_PORT
process.env.SMTP_USER
~~~

- ٥ متغيرات. و [[env.example]] فيه ٤ بس ([[SMTP_FROM]] مش موجود فيه). يعني حتى لو حد ملا [[env.example]] كله، فيه متغير ناقص.
- و [[SMTP_HOST=]] فاضي. فالـ register هيعمل اليوزر في الداتابيز ويفشل وهو بيبعت الإيميل (أو يبان إنه نجح والإيميل مبيوصلش، حسب الكود).
- للتطوير: سيرفر SMTP وهمي بيمسك الإيميلات ويعرضها (مثلًا Mailpit في Docker)، أو الكود يطبع كود التفعيل في اللوج لما [[NODE_ENV=development]].

---

## ٧. نفس الكلام على PowerShell

~~~powershell
Get-ChildItem -Recurse frontend\src -File | Select-String -Pattern 'REACT_APP_API_URL|baseURL'
netstat -ano | Select-String ':(3000|8000|3306)\s.*LISTEN'
'{"email":"nobody-test@example.invalid","password":"wrong"}' | Set-Content -NoNewline login.json
curl.exe -s -m 5 -X POST http://localhost:8000/api/auth/login -H "Content-Type: application/json" -d "@login.json" -w "$__btnHTTP %{http_code}$__btn"; "exit=$LASTEXITCODE"
Get-Service MySQL80
Get-Command mysql -ErrorAction SilentlyContinue
~~~

~~~text الناتج (الباك مش شغّال على 8000)
client.js:3: baseURL: process.env.REACT_APP_API_URL || "http://localhost:8000/api",

HTTP 000
exit=7
Get-Service: Cannot find any service with service name 'MySQL80'.
~~~

- [[Select-String]] مبيدخلش فولدرات لوحده، فبنديله الملفات من [[Get-ChildItem -Recurse -File]].
- [[curl.exe]] مش [[curl]]: في Windows PowerShell 5.1، [[curl]] اسم تاني لـ [[Invoke-WebRequest]]. و [[.exe]] بيضمن إنه curl الحقيقي في الاتنين.
- الـ JSON في ملف و [[-d "@login.json"]]: علامات التنصيص جوه JSON في PowerShell بتتعامل بشكل مختلف بين 5.1 و 7، والملف بيخلّي الأمر يشتغل في الاتنين (اتجرّب: السيرفر استلم الـ body كامل من الاتنين).
- [[$LASTEXITCODE]]: كود خروج آخر برنامج خارجي (زي [[$?]] في bash). و [[Get-Command]] مبيطبعش حاجة لو مش لاقي (عشان [[SilentlyContinue]]).
- و [[Get-NetTCPConnection -State Listen]] بديل لـ netstat في PowerShell (درس في تاب net)، بس على الجهاز اللي اتجرّب عليه ده [[netstat]] كان أثبت.

---

## ٨. الموقع المرفوع: الفرونت بيكلّم مين؟

على جهازك الفرونت بيقرا [[.env]] وانت بتشغّله. على الموقع المرفوع، العنوان **اتحفر جوه ملف JavaScript وقت الـ build**، ومش هيتغيّر غير بـ build جديد. فتقرا الملف نفسه:

~~~text curl -s -L https://dash.shop.example/ | grep -oE 'src="[^"]+\.js"'
src="/static/js/main.3f9a1c2e.js"
~~~

- [[-L]]: لو الصفحة بتعمل redirect (من [[http]] لـ [[https]] مثلًا) curl يمشي وراه.
- [[main.3f9a1c2e.js]]: CRA بيحط hash في الاسم، فكل build ليه اسم جديد. عشان كده بنطلّعه من الـ HTML مش بنخمّنه.

~~~bash
curl -s -o main.js https://dash.shop.example/static/js/main.3f9a1c2e.js
grep -oE 'https?://[a-zA-Z0-9.-]+(:[0-9]+)?/api' main.js | sort | uniq -c
~~~

~~~text الناتج
      1 http://localhost:8000/api
      3 https://api.shop.example/api
~~~

- العنوان الحقيقي اللي الموقع بيكلّمه: [[https://api.shop.example/api]].
- وفيه كمان [[http://localhost:8000/api]] محفور! ده الـ fallback، اتحط في الكود لأن الـ bundler مش عارف المتغير هيبقى موجود ولا لأ. لو لقيت **ده بس** (من غير عنوان حقيقي)، يبقى الـ build اتعمل من غير [[REACT_APP_API_URL]]، والموقع بيحاول يكلّم جهاز الزائر نفسه.
- **فخ في الـ regex:** [[https?://[a-zA-Z0-9.-]+/api]] من غير [[(:[0-9]+)?]] كان طلّع سطر [[api.shop.example]] بس، وفوّت [[localhost:8000]] لأن [[:]] مش في الحروف المسموحة. اتجرّبت الاتنين: النسخة القصيرة طلّعت سطر واحد بدل اتنين.

---

## ٩. الـ API نفسه حي؟

~~~bash
for p in /health /api/auth/login /api/auth/register /api/products; do printf "%-22s " "$p"; curl -s -m 10 -o /dev/null -w "%{http_code}\n" "https://api.shop.example$p"; done
~~~

~~~text الناتج
/health                502
/api/auth/login        502
/api/auth/register     502
/api/products          502
~~~

كلهم 502، **حتى [[/health]]** اللي مبيلمسش داتابيز ولا فورم. يعني:

- nginx شغّال (هو اللي بيرد بـ 502).
- مفيش ولا route في الباك بيرد. يعني الباك نفسه واقع، أو nginx بيشاور على بورت غلط.
- **مش** مشكلة في فورم التسجيل ولا في الـ validation. متفتحش كود الفرونت.

ولوج nginx بيأكد:

~~~text
[error] 23#23: *3 connect() failed (111: Connection refused) while connecting to upstream, client: 172.17.0.1, server: shop.example, request: "GET /health HTTP/1.1", upstream: "http://127.0.0.1:5000/health"
~~~

[[Connection refused]] على [[127.0.0.1:5000]]: مفيش حد بيسمع على البورت اللي nginx بيبعتله. من هنا القضية بقت قضية «502 Bad Gateway» (في نفس التاب) أو «خدمة واقعة من أسبوعين» (في الوحدة دي).

> لو جربت endpoint واحد بس ([[/api/auth/register]]) ورجع 502، ممكن تفتكر المشكلة في الـ register. الـ loop على ٤ endpoints منهم [[/health]] هو اللي بيقول «الباك كله» في سطر واحد.

---

## السبب والحل (على جهاز المطوّر)

ترتيب الأسباب زي ما ظهرت، وكل واحد كان كفاية يوقف التسجيل:

1. **مفيش باك شغّال على البورت اللي الفرونت مستنيه** (8000 في الفرونت، و 3000 في [[env.example]]). الحل: [[PORT=8000]] في [[backend/.env]]، أو [[REACT_APP_API_URL=http://localhost:3000/api]] في [[frontend/.env]] **وإعادة تشغيل** [[npm start]] (المتغير بيتقري وقت التشغيل بس). والأحسن: صلّح [[env.example]] نفسه لـ 8000 عشان الفخ ميتكررش.
2. **مفيش MySQL.** سطّبه أو شغّله في Docker، وحط [[DB_*]] في [[.env]].
3. **مفيش SMTP.** سيرفر وهمي للتطوير، وزوّد [[SMTP_FROM]] في [[env.example]].

وعلى الموقع المرفوع: الباك واقع (كله 502)، والحل في السيرفر مش في الكود.

## البدايل اللي اترفضت

| البديل | ليه لأ |
|---|---|
| تفتح DevTools وتدوّر في كود الفورم الأول | الفورم سليم، والطلب بيفشل قبل ما يوصل لأي باك. الترمنال بيقفل الطبقات أسرع |
| تغيّر العنوان في [[client.js]] لـ 3000 بإيدك | بيتعدّى المشكلة على جهازك بس، و CRA على 3000 أصلًا فهيتخانقوا |
| تسجّل حساب حقيقي عشان تجرّب | إيميل حقيقي يستلم كود تفعيل، وحساب زيادة في الداتابيز، وباسورد في اللوج |
| تعيد build الفرونت المرفوع | الـ bundle بيكلّم العنوان الصح أصلًا. المشكلة إن الباك واقع |

## التأكيد

- [[netstat]] فيه [[:8000 ... LISTENING]] (وبعد تشغيل MySQL: [[:3306]]).
- [[curl]] على [[/api/auth/login]] بالإيميل الوهمي = 401 أو 400 (مش 000 ولا 500).
- التسجيل بإيميل تجربة: الإيميل ظاهر في SMTP الوهمي.
- الموقع المرفوع: الـ loop كله مش 502، و [[/health]] 200.

## متتكررش

- [[env.example]] يطابق الكود ويطابق الفرونت، وفيه **كل** المتغيرات ([[grep -rhoE "process\.env\.[A-Z_]+"]] على الكود وقارنه بالملف).
- الباك يطبع وهو بيقوم: البورت، و «db connected»، و «smtp configured: yes/no».
- [[docker compose]] للمشروع كله (فرونت وباك و MySQL و Mailpit) فأي حد يشغّله بأمر واحد.
- الـ build بتاع الفرونت يفشل لو [[REACT_APP_API_URL]] مش متحدد، بدل ما يحفر [[localhost]].

---

## الخلاصة

| الخطوة | الأمر | لقينا |
|---|---|---|
| ١ | [[grep -rn baseURL]] | الفرونت مستني 8000 (fallback) |
| ٢ | [[grep -n PORT]] | [[env.example]] بيقول 3000 |
| ٣ | [[netstat -ano | grep LISTEN]] | ولا حاجة بتسمع |
| ٤ | [[curl -m 5 -w "%{http_code}"]] | [[HTTP 000]] و exit 7 |
| ٥ | [[sc query MySQL80]] و [[where mysql]] | MySQL مش متسطّب |
| ٦ | [[grep -rhoE SMTP]] | ٥ متغيرات، واحد مش في [[env.example]] |
| ٨ | [[curl -L | grep -oE src]] ثم [[grep -oE https?://...]] | العنوان المحفور في الـ bundle |
| ٩ | loop بـ [[-w "%{http_code}"]] | كله 502 = الباك واقع |`,
          deep: {
            why: R`«مش شغّال» من اليوزر بيبقى عن آخر طبقة شافها (الزرار)، والسبب غالبًا في طبقة تانية خالص. لو بدأت من الكود اللي انت عارفه (الفورم)، هتقضي ساعة في حاجة سليمة. الترتيب من برّه لجوه، وكل خطوة بأمر بيطلّع نعم أو لأ، بيوصلك للطبقة المقطوعة في دقايق، وبيطلّع كل الأسباب مش أول واحد بس (هنا كانوا ٣ ورا بعض).`,
            how: R`الـ bundlers (CRA و Vite و Next) بيستبدلوا [[process.env.REACT_APP_X]] (أو [[import.meta.env.VITE_X]] أو [[NEXT_PUBLIC_X]]) بالقيمة النصية وقت الـ build، فالملف النهائي فيه العنوان كنص عادي تقدر تدوّر عليه بـ grep. والـ fallback بعد [[||]] بيتحط هو كمان. و curl بيرجّع [[%{http_code}]] = 000 لما مفيش رد HTTP، وكود خروج ٧ لما الـ TCP connect اترفض (RST)، و ٢٨ لما محدش رد خالص (الـ packets بتتشال). و nginx بيرد 502 لما الـ upstream رفض الاتصال، و 504 لما مردّش في الوقت.`,
            when: R`أي «الفورم مش بيبعت» أو «مفيش حاجة بتحصل» أو «شغّال عندي ومش عند التاني»، وأول ما تستلم مشروع جديد ومش عارف أجزاؤه بتكلّم بعض إزاي. وعلى الموقع المرفوع لما مش متأكد الـ build الحالي بيكلّم أنهي API.`,
            mistakes: R`تبدأ من كود الفورم. وتعدّل [[.env]] الفرونت وتنسى تعيد [[npm start]] (أو تعيد build). وتصدّق [[env.example]] إنه بيوصف الكود. وتجرّب بحساب حقيقي. و regex للعنوان من غير البورت فيفوّتك [[localhost:8000]]. وتجرّب endpoint واحد يرجّع 502 وتفتكره هو المشكلة. وتقرا [[HTTP 000]] كأنه كود من السيرفر وهو معناه «مفيش سيرفر رد».`
          },
          sol: R`[[grep]] على الفرونت طلّع [[baseURL: process.env.REACT_APP_API_URL || "http://localhost:8000/api"]]، و [[env.example]] فيه [[PORT=3000]] والكود [[process.env.PORT || 8000]]. [[netstat]] من غير ولا سطر (كود 1). [[curl]] على 8000: [[HTTP 000]] و [[exit=7]]. والباك على 3000: [[{"message":"Internal server error"}]] و 500، ولوجه [[connect ECONNREFUSED 127.0.0.1:3306]]. [[sc query MySQL80]]: [[FAILED 1060]] و [[The specified service does not exist as an installed service.]]، و [[where mysql]]: [[INFO: Could not find files for the given pattern(s).]]. SMTP: ٥ متغيرات. الموقع المرفوع: [[src="/static/js/main.3f9a1c2e.js"]] و [[1 http://localhost:8000/api]] و [[3 https://api.shop.example/api]]، والأربع endpoints 502، ولوج nginx [[connect() failed (111: Connection refused)]].

اتجرّب على Windows 11 بـ Git Bash (curl 8.x و netstat الويندوز) و PowerShell 7 و Windows PowerShell 5.1 (لـ [[curl.exe -d "@login.json"]])، والباك سيرفر Node صغير بيحاول يوصل لـ 3306. الموقع المرفوع كان nginx:alpine في Docker على [[http://localhost:8088]] بـ HTML و bundle تجربة، والأوامر هنا مكتوبة بالدومينات المخترعة. ملحوظة: الـ sandbox بتاع الأداة اللي اتجرّب بيها كان بيخبّي البورتات من netstat، فاتعاد من غيره.`,
          practice: [
            { lvl: 'سريع', t: R`من غير ما تبص: اكتب معنى كل واحد في سطر: [[HTTP 000]] مع exit 7، و [[HTTP 000]] مع exit 28، و 404، و 500، و 502، و 401. ولكل واحد الطبقة اللي هتدوّر فيها بعده.`, done: R`الستة صح زي الجدول في الشرح، ولكل واحد طبقة: بورت أو باك مش شغّال، وفايروول أو سيرفر معلّق، ومسار غلط، ولوج الباك، والباك ورا nginx، وبيانات الطلب.` },
            { lvl: 'تطبيق', t: R`اقرا وتوقّع: فرونت فيه [[baseURL: import.meta.env.VITE_API || "/api"]] و [[vite.config.js]] فيه [[server: { proxy: { "/api": "http://localhost:5000" } }]]، والباك [[.env]] فيه [[PORT=5001]]. وانت فاتح الفرونت على [[localhost:5173]] ودوست تسجيل. الطلب هيروح فين بالظبط؟ وهيرجع إيه؟ وبعدين ابنيها وجرّب.`, done: R`توقعت إن الطلب يروح لـ [[localhost:5173/api/...]] و Vite يبعته لـ 5000 ومفيش حد هناك، فالمتصفح ياخد 500 أو 502 من Vite (ولوج Vite فيه [[ECONNREFUSED]])، والتجربة أكدت، وصلّحتها بتغيير واحد بس وكتبت ليه اخترته.` },
            { lvl: 'تطبيق', t: R`بيانات حقيقية: نزّل الـ bundle بتاع أي موقع React أو Vite انت عامله (أو ابني واحد بـ [[npm run build]] مرة بـ [[VITE_API]] ومرة من غيره) وطلّع منه كل العناوين بـ [[grep -oE 'https?://[a-zA-Z0-9.-]+(:[0-9]+)?(/[a-zA-Z0-9_/-]*)?']] و [[sort | uniq -c | sort -rn | head]]. صنّفهم: API بتاعك، ومكتبات، وتتبع.`, done: R`عندك لستة متصنّفة، والفرق بين الـ build بالمتغير ومن غيره ظاهر في سطر واحد على الأقل (العنوان الحقيقي مقابل الـ fallback)، وكتبت الأمر اللي بيقولك ده في ثانية.` },
            { lvl: 'تطبيق', t: R`صلّح الكود البايظ: الـ loop ده بيطبع [[200]] لكل الـ endpoints حتى وهو واقع على موقع شغّال ورا Cloudflare أو nginx بيرجّع صفحة خطأ مخصوصة:
[[for p in /health /api/x; do curl -s -o /dev/null -w "%{http_code}\n" "https://site$p"; done]]
والموقع بيعمل redirect من [[/api/x]] لصفحة login. صلّحه بحيث يطبع الكود الحقيقي، والـ redirect لو حصل، وأول ٦٠ حرف من الـ body.`, done: R`الـ loop الجديد بيستخدم [[-w "%{http_code} %{redirect_url}"]] (ومن غير [[-L]] عشان ميمشيش ورا الـ redirect)، وبيطبع جزء من الـ body بـ [[head -c 60]]، وجرّبته على nginx في Docker بـ [[return 302]] على مسار وطلّع [[302 http://...]] بدل 200.` },
            { lvl: 'تحدي', t: R`ابني [[ports-map.sh]]: في فولدر مشروع فيه فرونت وباك، بيطلّع كل بورت مكتوب في الكود ([[localhost:NNNN]] و [[PORT || NNNN]] و [[listen(NNNN)]]) وفي [[.env]] و [[env.example]] و [[docker-compose.yml]]، ويطبع جدول: البورت، ومين بيذكره، ومين بيسمع عليه دلوقتي (netstat على ويندوز، [[ss -ltnp]] على لينكس)، وتحذير لو نفس الخدمة ليها رقمين.`, done: R`على معمل الدرس بيطبع [[8000: client.js (fallback), server.js (default)]] و [[3000: env.example]] وتحذير [[backend: 8000 in code vs 3000 in env.example]]، وبيشتغل من Git Bash ومن لينكس (في [[docker run --rm ubuntu:24.04]]) من غير تعديل.` },
            { lvl: 'تحدي', t: R`اشرحها: اكتب رد لصاحب المشروع (اللي مش مبرمج) في ٨ سطور: إيه اللي كان بايظ (الـ ٣ أسباب) بلغة يفهمها، وإيه اللي اتعمل، وإيه اللي محتاجه منه (بيانات SMTP مثلًا)، ومن غير ولا كلمة إنجليزي مالهاش شرح.`, done: R`الرد فيه الـ ٣ أسباب بالترتيب، وطلب واحد واضح منه، ومفيش كلمة زي ECONNREFUSED أو fallback من غير جملة بتشرحها، وزميل مش مبرمج قراه وقال فهم.` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`node`, run: R`import net from "node:net";
import { spawnSync } from "node:child_process";
const srv = net.createServer();
await new Promise((ok) => srv.listen(0, "127.0.0.1", ok));
const port = srv.address().port;
await new Promise((ok) => srv.close(ok));
const r = spawnSync("curl", ["-s", "-m", "5", "-o", process.platform === "win32" ? "NUL" : "/dev/null", "-w", "HTTP %{http_code}", "http://127.0.0.1:" + port + "/api/auth/login"], { encoding: "utf8" });
console.log(r.stdout.trim(), "exit=" + r.status);
const bundle = 'var e={baseURL:"https://api.shop.example/api"};fetch("https://api.shop.example/api/auth/login");var r="http://localhost:8000/api";';
const wide = bundle.match(/https?:\/\/[a-zA-Z0-9.-]+(:[0-9]+)?\/api/g);
const narrow = bundle.match(/https?:\/\/[a-zA-Z0-9.-]+\/api/g);
console.log("wide:", [...new Set(wide)].join(" "), "| narrow:", [...new Set(narrow)].join(" "));`, expect: [R`HTTP 000 exit=7`, R`wide: https://api.shop.example/api http://localhost:8000/api | narrow: https://api.shop.example/api`] },
          ],
        },
        {
          cmd: "غيّر إعداد في الداتابيز من السيرفر",
          title: "غيّر إعداد محفوظ في Postgres جوه compose: role \"assistant\" does not exist لأنك خمّنت اسم اليوزر",
          learn: R`تشغّل [[psql]] جوه container بتاع compose من غير ما تخمّن اسم اليوزر ولا الداتابيز (تقراهم من [[.env]] أو من الـ container نفسه)، وتغيّر قيمة بـ upsert بيتكرر بأمان، وتتأكد إنها اتغيّرت.`,
          out: R`[[INSERT 0 1]] ثم [[SELECT]] بيرجّع القيمة الجديدة، ومفيش صف زيادة باسم غلط.`,
          desc: R`محتاج تغيّر حد يومي ([[daily_cap]]) محفوظ في جدول [[settings]] على سيرفر الإنتاج. كتبت الأمر من الذاكرة: [[docker compose exec postgres psql -U assistant -d appdb -c "INSERT ... ON CONFLICT ..."]]، ورجع [[FATAL:  role "assistant" does not exist]]. اسم اليوزر مش اللي افتكرته.

الحل مش تجربة أسامي. اليوزر الحقيقي مكتوب في [[.env]] اللي compose بيشغّل بيه Postgres ([[POSTGRES_USER]])، وموجود جوه الـ container نفسه كمتغير بيئة. تقراه من هناك (من غير ما تطبع الباسورد)، وتشغّل الأمر بـ [[-T]] (عشان يشتغل من سكربت أو من ssh)، و upsert بـ [[ON CONFLICT ... DO UPDATE]] بيشتغل سواء الصف موجود ولا لأ. وفي الآخر [[SELECT]] تتأكد.

وخلي بالك: الإعداد في الداتابيز بيتغيّر من غير نشر ولا restart **لو** التطبيق بيقراه في أول كل دورة، والدورة الشغّالة دلوقتي هتكمّل بالقديم. ورفع حد ٣ أضعاف مرة واحدة من غير ما تعرف ليه كان محدود ده خطر لوحده.`,
          example: R`docker compose exec postgres psql -U assistant -d appdb -c "SELECT 1"
grep -E 'POSTGRES_(USER|DB|PASSWORD)' .env | sed 's/PASSWORD=.*/PASSWORD=***/'
docker compose exec -T postgres sh -c 'echo "$POSTGRES_USER $POSTGRES_DB"'
PGU=$(sed -nE 's/^\s*POSTGRES_USER\s*=\s*"?([^"]*)"?\s*$/\1/p' .env)
docker compose exec -T postgres psql -U "$PGU" -d appdb -c "SELECT key, value FROM settings WHERE key='daily_cap';"
docker compose exec -T postgres psql -U "$PGU" -d appdb -c "INSERT INTO settings (key,value) VALUES ('daily_cap','250') ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value RETURNING key, value;"`,
          lines: [
            R`الأمر المخمّن: [[exec]] بيشغّل أمر جوه container شغّال، و [[postgres]] اسم الخدمة في compose (مش اسم الـ container)، و [[-U]] اليوزر و [[-d]] الداتابيز. هنا طلع [[role "assistant" does not exist]].`,
            R`اقرا الإعدادات من غير ما تكشف السر: [[grep -E]] السطور التلاتة، و [[sed]] يستبدل أي حاجة بعد [[PASSWORD=]] بنجوم قبل ما تطلع على الشاشة.`,
            R`أو من الـ container نفسه: القيمة اللي Postgres قام بيها فعلًا. العلامات المفردة عشان [[$POSTGRES_USER]] يتفك **جوه** الـ container مش في الـ shell بتاعك.`,
            R`خزّن اليوزر في متغير: [[sed -n]] ميطبعش غير اللي بتطلبه، و [[s/.../\1/p]] يطلّع القيمة بس، ويتجاهل المسافات حوالين [[=]] وعلامات [[" "]] لو موجودة.`,
            R`اقرا القيمة الحالية قبل ما تغيّر: [[-T]] من غير terminal (للسكربتات و ssh)، و [[-c]] أمر SQL واحد. احفظ الرقم القديم في ملاحظاتك عشان ترجع له.`,
            R`الـ upsert: [[ON CONFLICT (key)]] لو المفتاح موجود، و [[DO UPDATE SET value = EXCLUDED.value]] حط القيمة اللي كنت هتعملها insert، و [[RETURNING]] يطبع الصف بعد التغيير في نفس الأمر.`,
          ],
          try: R`ابني compose فيه [[postgres:16-alpine]] و [[.env]] بـ [[POSTGRES_USER=shopadmin]]، واعمل جدول [[settings]]. جرّب الأمر باليوزر الغلط وشوف الخطأ، وبعدين اقرا اليوزر بالطريقتين، وغيّر [[daily_cap]] من 150 لـ 250 بالـ upsert، وشغّل نفس الأمر مرتين وتأكد إن عدد الصفوف متغيّرش.`,
          teach: R`## العَرَض

على سيرفر الإنتاج، Postgres شغّال بـ compose، والتطبيق بيقرا الحد اليومي من جدول [[settings]]. عايز ترفعه. كتبت من الذاكرة:

~~~bash
docker compose exec postgres psql -U assistant -d appdb -c "INSERT INTO settings (key,value) VALUES ('daily_cap','500') ON CONFLICT (key) DO UPDATE SET value='500';"
~~~

~~~text الناتج
psql: error: connection to server on socket "/var/run/postgresql/.s.PGSQL.5432" failed: FATAL:  role "assistant" does not exist
~~~

---

## المعمل

~~~text compose.yml
name: svccase-pg
services:
  postgres:
    image: postgres:16-alpine
    env_file: .env
~~~

~~~text .env
POSTGRES_USER=shopadmin
POSTGRES_PASSWORD=lab-only-not-secret
POSTGRES_DB=appdb
~~~

- [[env_file: .env]]: compose بيبعت المتغيرات دي للـ container وهو بيبدأ. صورة Postgres الرسمية بتعمل اليوزر والداتابيز منها **أول مرة بس** (لما فولدر الداتا فاضي).
- وجدول [[settings]] فيه [[key]] (primary key) و [[value]]، والقيمة الحالية [[daily_cap = 150]].

---

## ١. اقرا الخطأ

[[FATAL:  role "assistant" does not exist]]:

- [[role]] في Postgres = يوزر (أو جروب). مفيش يوزر بالاسم ده.
- [[on socket "/var/run/postgresql/.s.PGSQL.5432"]]: [[psql]] جوه الـ container بيتصل بـ Postgres عن طريق ملف socket مش عن طريق الشبكة. يعني الاتصال نفسه شغّال، والمشكلة في **الاسم** بس.
- أخطاء قريبة هتقابلها بنفس الطريقة:

~~~text -d shop بدل appdb
psql: error: connection to server on socket "/var/run/postgresql/.s.PGSQL.5432" failed: FATAL:  database "shop" does not exist
~~~

متجرّبش أسامي ([[postgres]] و [[admin]] و [[app]]...). الاسم مكتوب في مكانين.

---

## ٢. اقرا اليوزر من [[.env]] (من غير ما تطبع الباسورد)

~~~text grep -E 'POSTGRES_(USER|DB|PASSWORD)' .env | sed 's/PASSWORD=.*/PASSWORD=***/'
POSTGRES_USER=shopadmin
POSTGRES_PASSWORD=***
POSTGRES_DB=appdb
~~~

- [[POSTGRES_(USER|DB|PASSWORD)]]: الـ [[( | )]] في [[grep -E]] = واحد من دول.
- [[sed 's/PASSWORD=.*/PASSWORD=***/']]: أي حاجة بعد [[PASSWORD=]] تبقى نجوم. الشاشة ممكن تتصوّر أو تتلزق في شات أو تتسجّل في تاريخ الترمنال. **السر ميظهرش أبدًا**، حتى وانت بتشخّص.

---

## ٣. أو من الـ container نفسه (الأصدق)

~~~text docker compose exec -T postgres sh -c 'echo "$POSTGRES_USER $POSTGRES_DB"'
shopadmin appdb
~~~

- العلامات المفردة [[' ']] حوالين الأمر: الـ shell بتاعك مبيفكّش [[$POSTGRES_USER]]، فبيوصل زي ما هو لـ [[sh]] **جوه** الـ container، وهناك بيتفك. لو كتبته بعلامات مزدوجة، هيتفك عندك (فاضي) قبل ما يتبعت.
- ليه الأصدق؟ [[.env]] ممكن يكون اتعدّل **بعد** ما الـ container قام. الـ container شايل القيم اللي قام بيها. (نفس فكرة [[/proc/1/environ]] في درس «/health بيقول 200 والدخول بايظ».)
- وتقدر تتأكد من جوه Postgres نفسه:

~~~text psql -U shopadmin -d appdb -c "SELECT current_user, current_database();" ثم \du
 current_user | current_database
--------------+------------------
 shopadmin    | appdb

                             List of roles
 Role name |                         Attributes
-----------+------------------------------------------------------------
 shopadmin | Superuser, Create role, Create DB, Replication, Bypass RLS
~~~

[[\du]] بيطبع كل الـ roles. هنا واحد بس، وهو superuser.

---

## ٤. خزّنه في متغير صح

الطريقة السريعة: [[PGU=$(grep -E '^POSTGRES_USER=' .env | cut -d= -f2)]]. بتشتغل على ملف زي اللي فوق. بس جرّبها على [[.env]] مكتوب كده (شكل شائع جدًا):

~~~text .env.quoted
POSTGRES_USER = "shopadmin"
~~~

~~~text
(سطر فاضي)
~~~

[[grep '^POSTGRES_USER=']] ملقاش حاجة بسبب المسافة (نفس فخ درس «ts-node تحت pm2 بيقع كل ثانية»)، و [[cut]] طلّع فاضي، وكود الخروج **0** (لأن [[cut]] آخر أمر ونجح). لو اتبعت فاضي لـ [[psql -U ""]] هيستخدم اليوزر الافتراضي ويديك خطأ تاني يلخبطك. ولو المسافة مش موجودة والعلامات موجودة، القيمة هتبقى بالعلامات:

~~~text psql -U '"shopadmin"' -d appdb
psql: error: connection to server on socket "/var/run/postgresql/.s.PGSQL.5432" failed: FATAL:  role ""shopadmin"" does not exist
~~~

[[""shopadmin""]] بعلامتين: Postgres بيدوّر على يوزر اسمه فيه علامات تنصيص. النسخة اللي بتستحمل الاتنين:

~~~bash
PGU=$(sed -nE 's/^\s*POSTGRES_USER\s*=\s*"?([^"]*)"?\s*$/\1/p' .env)
~~~

~~~text على الملفين
shopadmin
shopadmin
~~~

- [[sed -n]]: متطبعش أي سطر لوحدك. و [[p]] في الآخر: اطبع السطر اللي اتعمل فيه استبدال بس.
- [[^\s*POSTGRES_USER\s*=\s*]]: الاسم بمسافات اختيارية حواليه.
- [["?([^"]*)"?]]: علامة اختيارية، وبعدين **أي حاجة مش علامة** (دي اللي جوه القوسين [[( )]] واللي [[\1]] بيرجّعها)، وبعدين علامة اختيارية.
- لو المتغير مش موجود خالص، [[PGU]] هيبقى فاضي. في سكربت: [[: "$__{PGU:?POSTGRES_USER not found in .env}"]] بيوقف السكربت برسالة بدل ما يكمّل.

---

## ٥. اقرا القيمة الحالية، وغيّرها

~~~text docker compose exec -T postgres psql -U "$PGU" -d appdb -c "SELECT key, value FROM settings WHERE key='daily_cap';"
    key    | value
-----------+-------
 daily_cap | 150
(1 row)
~~~

اكتب الـ 150 في ملاحظاتك: ده الـ rollback.

~~~text upsert بـ RETURNING
    key    | value
-----------+-------
 daily_cap | 250
(1 row)

INSERT 0 1
~~~

- [[INSERT ... ON CONFLICT (key) DO UPDATE]]: لو مفيش صف بالمفتاح ده يعمل insert، ولو فيه يعدّله. أمر واحد بيشتغل في الحالتين، وتشغيله مرتين نفس النتيجة (idempotent).
- [[EXCLUDED.value]]: القيمة اللي كنت بتحاول تعملها insert. أحسن من إنك تكتب [[value='250']] مرتين في نفس الأمر وتغيّر واحدة وتنسى التانية.
- [[INSERT 0 1]]: [[0]] رقم قديم ملوش لازمة (OID)، و [[1]] عدد الصفوف اللي اتأثرت. بيقول 1 حتى لو اللي حصل update.
- [[RETURNING key, value]]: الصف بعد التغيير، في نفس الأمر.

### ليه [[-T]]؟

[[-T]] = متعملش terminal (TTY) للأمر. من غيره، compose بيحاول يعمل TTY لما يقدر. في سكربت أو [[ssh host '...']] أو مع [[< file.sql]]، ده بيلخبط الدخل والخرج أو بيفشل. نفس الفكرة مع [[docker exec]] اللي فيه [[-t]] صريح:

~~~text echo "SELECT 1;" | docker exec -it svccase-pg-postgres-1 psql -U shopadmin -d appdb -tA
cannot attach stdin to a TTY-enabled container because stdin is not a terminal
~~~

في المعمل [[docker compose exec]] من غير [[-T]] اشتغل من غير terminal (compose v2 بيكتشف ده)، بس [[-T]] بيخلّي السلوك ثابت في أي مكان. اكتبه في أي أمر مش تفاعلي.

---

## فخ: غلطة في اسم المفتاح

~~~text UPDATE settings SET value='600' WHERE key='daly_cap2';
UPDATE 0
~~~

[[UPDATE 0]]: مفيش صف اتعدّل، **ومفيش خطأ**. لو مبصّتش على الرقم، هتفتكر إنه اتغيّر. والـ upsert أسوأ هنا:

~~~text upsert بمفتاح غلط ثم SELECT كله
INSERT 0 1
    key    | value
-----------+-------
 daily_cap | 250
 daly_cap  | 300
(2 rows)
~~~

عمل **صف جديد** باسم غلط، والتطبيق مش هيقراه أبدًا. عشان كده: [[SELECT]] قبل وبعد، وعد الصفوف ([[SELECT count(*) FROM settings]]) لازم ميتغيّرش لو بتعدّل قيمة موجودة.

---

## امتى القيمة الجديدة بتشتغل؟

ده سؤال عن التطبيق مش عن Postgres:

- لو التطبيق بيقرا [[settings]] في أول كل دورة (كل ساعة مثلًا): الدورة الجاية بالقيمة الجديدة، والشغّالة دلوقتي بالقديمة. من غير restart ولا نشر.
- لو بيقراها مرة واحدة وهو بيقوم ويخزّنها: محتاج restart.
- لو فيه cache (Redis مثلًا) قدام الجدول: محتاج تمسح المفتاح ده من الكاش أو تستنى انتهاء صلاحيته.

اعرف من الكود ([[grep -rn "daily_cap" src]]) قبل ما تقول «اتغيّر».

### والحد نفسه

الحد ده موجود لسبب: حد إرسال من مزوّد الإيميل، أو تكلفة API، أو حماية من سبام. رفعه من 150 لـ 500 مرة واحدة (٣ أضعاف) من غير ما تعرف السبب ممكن يوقف حساب الإيميل كله أو يعمل فاتورة. الصح: اسأل ليه 150، وارفعه على مراحل (250، وبعدين 400) وراقب الأخطاء والـ bounces بين كل مرحلة.

---

## البدايل اللي اترفضت

| البديل | ليه لأ |
|---|---|
| تجرّب أسامي يوزرز لحد ما واحد يمشي | تخمين، وممكن تدخل بيوزر بصلاحيات غير المقصودة |
| [[-U postgres]] «اليوزر الافتراضي» | الصورة الرسمية بتعمل اليوزر من [[POSTGRES_USER]]، و [[postgres]] مش موجود لو اتغيّر |
| [[cat .env]] عشان تشوف اليوزر | الباسورد يطلع على الشاشة |
| [[UPDATE]] بدل upsert | لو الصف مش موجود: [[UPDATE 0]] ومحدش يلاحظ |
| تعدّل من أداة GUI بتفتح بورت 5432 للنت | بتفتح الداتابيز لبرّه عشان تغيّر رقم |
| ترفع الحد للرقم النهائي مرة واحدة | مش عارف ليه كان محدود |

## التأكيد

- [[SELECT key, value FROM settings WHERE key='daily_cap';]] = 250.
- [[SELECT count(*) FROM settings;]] نفس الرقم قبل وبعد.
- لوج التطبيق في الدورة الجاية بيطبع الحد الجديد (لو بيطبعه).

## متتكررش

- سكربت صغير على السيرفر ([[set-setting.sh daily_cap 250]]) بيقرا اليوزر من الـ container، ويطبع القديم، ويعمل upsert على مفاتيح معروفة بس، ويرفض أي مفتاح مش في لستة.
- التطبيق يسجّل القيم اللي قراها من [[settings]] في أول كل دورة.
- القيود ([[CHECK (key IN (...))]] أو جدول مفاتيح مسموحة) تمنع صف باسم غلط.

---

## الخلاصة

| الخطوة | الأمر | لقينا |
|---|---|---|
| ١ | [[psql -U assistant]] | [[role "assistant" does not exist]] |
| ٢ | [[grep POSTGRES_ .env]] و [[sed PASSWORD=***]] | [[shopadmin]] و [[appdb]] من غير ما السر يظهر |
| ٣ | [[exec -T postgres sh -c 'echo $POSTGRES_USER']] | نفس القيم اللي الـ container قام بيها |
| ٤ | [[sed -nE ... \1/p]] | اليوزر حتى لو فيه مسافات وعلامات |
| ٥ | [[SELECT]] ثم upsert بـ [[EXCLUDED]] و [[RETURNING]] | 150 بقت 250 |
| تأكيد | [[SELECT]] و [[count(*)]] | مفيش صف زيادة |`,
          deep: {
            why: R`الأوامر اللي بتكتبها على سيرفر إنتاج من الذاكرة بتبقى غلط في التفاصيل (اسم يوزر، اسم داتابيز، اسم مفتاح)، والغلط في التفاصيل ده إما بيفشل بصوت عالي (role مش موجود) وده كويس، أو بينجح وهو غلط (صف جديد باسم غلط، [[UPDATE 0]]) وده الخطر. فبدل ما تخمّن، اقرا القيمة من المصدر اللي الحاجة شغّالة بيه فعلًا، واطبع قبل وبعد.`,
            how: R`صورة [[postgres]] الرسمية بتشغّل [[initdb]] أول مرة بس (لما [[/var/lib/postgresql/data]] فاضي) وبتعمل [[POSTGRES_USER]] superuser و [[POSTGRES_DB]]. بعد كده تغيير [[.env]] مبيغيّرش اليوزر الموجود. و [[docker compose exec]] بيدوّر على container الخدمة ويشغّل الأمر جواه بنفس متغيرات البيئة. و [[psql]] جوه الـ container بيتصل بالـ Unix socket ومحتاجش باسورد (الصورة بتسمح بـ [[trust]] على الـ socket المحلي). و [[INSERT ... ON CONFLICT]] (من Postgres 9.5) بيعمل insert أو update في عملية واحدة atomic على الـ unique index، و [[EXCLUDED]] جدول وهمي فيه الصف اللي اتمنع.`,
            when: R`أي تغيير إعداد أو feature flag أو حد محفوظ في الداتابيز على سيرفر شغّال، وأي [[psql]] أو [[mysql]] أو [[mongosh]] جوه container، وأي سكربت أو ssh one-liner بيشغّل أمر جوه container.`,
            mistakes: R`تخمّن اسم اليوزر. و [[cat .env]] فالباسورد يظهر. و [[cut -d= -f2]] على سطر فيه مسافات أو علامات. وعلامات مزدوجة حوالين [[$POSTGRES_USER]] فيتفك عندك فاضي. وتنسى [[-T]] في سكربت. و [[UPDATE]] بمفتاح غلط و [[UPDATE 0]] محدش يقراه. و upsert بمفتاح غلط يعمل صف جديد. وتقول «اتغيّر» من غير ما تعرف التطبيق بيقراه إمتى. وترفع الحد مرة واحدة.`
          },
          sol: R`[[psql -U assistant]]: [[FATAL:  role "assistant" does not exist]]. [[grep ... | sed]]: [[POSTGRES_USER=shopadmin]] و [[POSTGRES_PASSWORD=***]] و [[POSTGRES_DB=appdb]]. من الـ container: [[shopadmin appdb]]. [[sed -nE]] طلّع [[shopadmin]] من الملفين (العادي واللي فيه [[POSTGRES_USER = "shopadmin"]])، و [[grep | cut]] على الملف التاني طلّع سطر فاضي بكود 0. [[SELECT]] قبل: 150، والـ upsert بـ [[RETURNING]]: [[daily_cap | 250]] و [[INSERT 0 1]]. [[UPDATE]] بمفتاح غلط: [[UPDATE 0]]، و upsert بمفتاح غلط عمل صف [[daly_cap]]. و [[docker exec -it]] من غير terminal: [[cannot attach stdin to a TTY-enabled container because stdin is not a terminal]].

اتجرّب بـ [[postgres:16-alpine]] في Docker Compose v2 (Docker Desktop على ويندوز، الأوامر من Git Bash).`,
          practice: [
            { lvl: 'سريع', t: R`من غير ما تبص: إيه الفرق بين [[docker compose exec postgres ...]] و [[docker exec <container> ...]]؟ وليه [[-T]]؟ وليه العلامات المفردة في [[sh -c 'echo "$POSTGRES_USER"']]؟`, done: R`كتبت إن compose بياخد اسم الخدمة ويلاقي الـ container، و [[docker exec]] محتاج اسم الـ container الكامل، و [[-T]] من غير terminal للسكربتات و ssh، والعلامات المفردة عشان المتغير يتفك جوه الـ container مش عندك.` },
            { lvl: 'تطبيق', t: R`اقرا وتوقّع: [[.env]] فيه [[POSTGRES_USER=shopadmin]]، بس الـ container قام من شهر لما كان [[POSTGRES_USER=shop]]، ومن ساعتها محدش عمل [[down -v]]. توقّع: [[grep POSTGRES_USER .env]]، و [[docker compose exec -T postgres sh -c 'echo $POSTGRES_USER']]، و [[psql -U shopadmin]]. وبعدين اعملها في المعمل (غيّر [[.env]] بعد ما الـ container يقوم).`, done: R`توقعت إن [[.env]] بيقول [[shopadmin]] والـ container بيقول [[shop]] (لحد ما يتعمله recreate)، وإن [[psql -U shopadmin]] يفشل بـ [[role "shopadmin" does not exist]] لأن initdb اشتغل بالاسم القديم، والتجربة أكدت، وكتبت إيه اللي يحصل بعد [[docker compose up -d]] (recreate بالمتغير الجديد بس الداتا القديمة فيها [[shop]]).` },
            { lvl: 'تطبيق', t: R`صلّح السكربت البايظ: السكربت ده بيغيّر إعداد، بس مرة غيّر مفتاح غلط ومحدش عرف، ومرة طبع الباسورد:
[[cat .env; U=$(grep USER .env | cut -d= -f2); docker compose exec postgres psql -U $U -d appdb -c "UPDATE settings SET value='$2' WHERE key='$1'"]]
لاقي ٥ مشاكل على الأقل وصلّحها.`, done: R`لقيت: [[cat .env]] بيطبع السر، و [[grep USER]] بيمسك أي سطر فيه USER، و [[cut]] مبيستحملش مسافات وعلامات، ومن غير [[-T]]، و [[$U]] من غير علامات، و [[UPDATE]] مبيقولش لو صفر (ومفيش SELECT قبل وبعد)، والقيم داخلة جوه SQL من غير حماية. والنسخة المصلّحة بتطبع القديم والجديد وبترفض مفتاح مش موجود بكود 1.` },
            { lvl: 'تطبيق', t: R`محاكاة: اعمل جدول [[settings]] وسكربت Node أو Python صغير «worker» بيقرا [[daily_cap]] في أول كل دورة (كل ١٠ ثواني) ويطبعه، ودورة بتاخد ١٥ ثانية. غيّر القيمة في نص دورة. سجّل بالوقت امتى القيمة الجديدة اتطبّقت.`, done: R`اللوج بيوري الدورة اللي كانت شغّالة كمّلت بالقيمة القديمة، واللي بعدها بالجديدة، من غير restart، وكتبت إزاي كان هيختلف لو الـ worker بيقرا القيمة مرة واحدة وهو بيقوم.` },
            { lvl: 'تحدي', t: R`ابني [[set-setting.sh <key> <value>]] على السيرفر: بيقرا اليوزر والداتابيز من الـ container، ويرفض أي مفتاح مش في لستة مسموحة جوه السكربت، ويطبع القيمة القديمة، ويعمل upsert بـ [[RETURNING]]، ويعد الصفوف قبل وبعد ويرفض لو اتغيّر العدد، ويكتب سطر في [[/var/log/settings-changes.log]] فيه الوقت واليوزر والقديم والجديد. والقيم تتبعت لـ psql بـ [[-v]] ومش جوه نص الـ SQL.`, done: R`في المعمل: [[set-setting.sh daily_cap 250]] بيطبع [[150 -> 250]] وسطر في اللوج، و [[set-setting.sh daly_cap 300]] بيرفض بكود 2 من غير ما يلمس الداتابيز، وقيمة فيها [[' ; DROP TABLE settings; --]] بتتخزّن كنص زي ما هي والجدول سليم.` },
            { lvl: 'سريع', t: R`دوّر بنفسك: من [[docker compose exec --help]] ومن وثائق صورة postgres، اعرف: الـ TTY افتراضي ولا لأ في [[compose exec]]؟ وإيه [[--user]] و [[--workdir]] و [[--env]]؟ وإمتى بيتعمل اليوزر من [[POSTGRES_USER]]؟`, done: R`كتبت جملة لكل واحد، منهم إن [[compose exec]] بيعمل TTY افتراضيًا (و [[-T]] يقفله)، وإن اليوزر بيتعمل أول مرة بس لما فولدر الداتا فاضي، وجرّبت [[--user postgres]] في المعمل.` },
          ],
          ci: [
            { os: [R`ubuntu`], sh: R`bash`, run: R`d=$(mktemp -d); cd "$d"
printf 'POSTGRES_USER=shopadmin\nPOSTGRES_PASSWORD=lab-only-not-secret\nPOSTGRES_DB=appdb\n' > .env
printf 'POSTGRES_USER = "shopadmin"\n' > .env.quoted
grep -E 'POSTGRES_(USER|DB|PASSWORD)' .env | sed 's/PASSWORD=.*/PASSWORD=***/'
echo "naive=[$(grep -E '^POSTGRES_USER=' .env.quoted | cut -d= -f2)]"
for f in .env .env.quoted; do echo "robust=[$(sed -nE 's/^\s*POSTGRES_USER\s*=\s*"?([^"]*)"?\s*$/\1/p' "$f")]"; done
cd /; rm -rf "$d"`, expect: [R`POSTGRES_PASSWORD=***`, R`naive=[]`, R`robust=[shopadmin]`] },
          ],
        },
        {
          cmd: "غيّرت الرقم ولسه القديم ظاهر",
          title: "رقم التواصل اتغيّر من الداشبورد، وصفحات لسه بتعرض القديم: قيمة في الداتابيز ولا قيمة في الكود؟",
          learn: R`تثبت على الموقع الحي أنهي صفحات لسه فيها القيمة القديمة وبأنهي شكل، وتلاقي كل نسخها في الكود (كل الصيغ)، وتغيّرها من غير ما تلمس رقم تاني بغرض تاني، وتتأكد بالأرقام بعد النشر.`,
          out: R`loop على الصفحات بيطبع الرقم الجديد بس في كل صفحة، و [[grep]] على الكود فاضي من القديم، و [[git diff --stat]] عدد سطوره منطقي.`,
          desc: R`صاحب الموقع غيّر رقم التواصل من الداشبورد (الرقم محفوظ في جدول إعدادات). في نص الصفحة الرئيسية الرقم الجديد ظهر فورًا من غير نشر. بس في الفوتر وفي صفحة «من نحن» وفي بيانات Google (JSON-LD) لسه القديم، لأن الكود فيه **نسخ احتياطية** (fallback) مكتوبة بإيدها، وبصيغ مختلفة: [[+20 100 000 0001]] و [[+201000000001]] و [[0100 000 0001]] و [[wa.me/201000000001]]. ودي محتاجة تعديل كود ونشر.

بدل ما تقول «اتغيّر»: loop على الصفحات بـ [[curl]] يعدّ القديم والجديد في كل صفحة، و [[grep -rnoE]] بـ regex يمسك كل الصيغ في الكود، و [[sed -i]] لكل صيغة لوحدها في الملفات اللي فيها بس، و [[git diff --stat]]، و [[grep]] تاني يطلع فاضي، وبعد النشر نفس الـ loop. والفخاخ: رقم **تاني لغرض تاني** (محفظة دفع) لازم ميتغيّرش، ورقم تجريبي في زرار واتساب معناه إن الزرار مش بيوصّل لحد أصلًا، وملفات ملاحظات قديمة مش شغلتك.`,
          example: R`for p in / /contact/ /about/; do printf '%-10s' "$p"; curl -s "https://shop.example$p?nocache=$RANDOM" | grep -oE '(\+?20|0)1[0-9]{2} ?[0-9]{3} ?[0-9]{4}|\+?20 1[0-9]{2} [0-9]{3} [0-9]{4}' | tr -d ' +' | sed -E 's/^0/20/' | sort | uniq -c | tr '\n' ' '; echo; done
grep -rnoE "(\+?20|0)[ ]?1[0-9]{2}[ ]?[0-9]{3}[ ]?[0-9]{4}" app components lib docs | sort
sed -i 's/+20 100 000 0001/+20 100 000 0002/g' lib/site.js
sed -i 's/+201000000001/+201000000002/g' app/layout.js components/Footer.js
sed -i 's/0100 000 0001/0100 000 0002/g' components/Footer.js
git diff --stat
grep -rnoE "(\+?20|0)[ ]?1[0-9]{2}[ ]?[0-9]{3}[ ]?[0-9]{4}" app components lib | sort`,
          lines: [
            R`الموقع الحي: لكل صفحة، [[?nocache=$RANDOM]] رقم عشوائي يخلّي الكاش يعتبره طلب جديد، و [[grep -oE]] يطلّع كل رقم بأي صيغة، و [[tr -d ' +']] يشيل المسافات والـ [[+]]، و [[sed 's/^0/20/']] يحوّل [[0100...]] لـ [[20100...]]، فكل الصيغ تتعدّ كرقم واحد.`,
            R`فين في الكود؟ [[-r]] كل الفولدرات، و [[-n]] رقم السطر، و [[-o]] الرقم بس مش السطر كله، و [[[ ]?]] مسافة اختيارية بين المجموعات. [[sort]] عشان الملفات تبقى جنب بعض.`,
            R`صيغة واحدة في الملف اللي فيه هي بس. [[-i]] تعديل في نفس الملف، و [[g]] كل مرة في السطر. الـ [[+]] في sed العادي حرف عادي مش «واحد أو أكتر».`,
            R`الصيغة اللي من غير مسافات، في الملفين اللي فيهم هي (JSON-LD والفوتر).`,
            R`الصيغة المحلية (بصفر في الأول) في الفوتر بس.`,
            R`كام ملف وكام سطر اتغيّروا؟ لو الرقم أكبر من اللي متوقعه (ملف كله اتغيّر مثلًا) يبقى فيه حاجة غلط زي نهايات أسطر اتغيّرت.`,
            R`نفس البحث تاني: لازم ميطلعش القديم، والأرقام اللي فاضلة (الدفع والتجريبي) تكون اللي انت قررت تسيبها عن قصد.`,
          ],
          try: R`ابني المعمل اللي في الشرح (ريبو فيه [[lib/site.js]] و [[app/layout.js]] و [[components/Footer.js]] و [[components/WhatsAppButton.js]] و [[docs/notes.md]]، وموقع ثابت على nginx فيه ٣ صفحات)، وامشي على الخطوات، وفي الآخر اكتب جدول: كل رقم لقيته، وفين، وغرضه، واتغيّر ولا لأ وليه.`,
          teach: R`## العَرَض

«غيّرت رقم التليفون من لوحة التحكم، والرقم الجديد ظاهر في الصفحة الرئيسية، بس عميل قال إن الرقم اللي تحت في الموقع لسه القديم».

الرقم موجود في **مكانين** من نوعين مختلفين:

| فين | بيتغيّر إزاي | امتى يظهر |
|---|---|---|
| جدول الإعدادات في الداتابيز (الداشبورد بيكتب فيه) | من الداشبورد | فورًا، لأن الصفحة بتقراه مع كل طلب (أو بعد ما الكاش يخلص) |
| الكود: fallback، و JSON-LD، والفوتر، وزرار واتساب | تعديل كود ونشر | بعد النشر بس |

---

## المعمل

ريبو صغير زي اللي كان في الحالة الحقيقية (الأرقام مخترعة بشكل واضح):

~~~text lib/site.js
// fallback لو جدول الإعدادات فاضي
export const DEFAULT_PHONE = "+20 100 000 0001";
export const PAYMENT_PHONE = "+20 100 000 0009"; // رقم محفظة الدفع، مش للتواصل
~~~

~~~text app/layout.js
const jsonLd = { "@type": "Store", "telephone": "+201000000001" };
~~~

~~~text components/Footer.js
export const footer = "<a href=\"tel:+201000000001\">0100 000 0001</a>";
~~~

~~~text components/WhatsAppButton.js
export const href = "https://wa.me/201000000000"; // TODO رقم تجريبي
~~~

~~~text docs/notes.md
رقم التواصل القديم: +20 100 000 0001
~~~

وموقع ثابت على [[nginx:alpine]] في Docker بيمثّل الموقع الحي: نص الصفحة الرئيسية فيه الرقم الجديد (جاي من الداتابيز)، والفوتر و JSON-LD لسه القديم.

---

## ١. اثبت على الموقع الحي الأول

~~~bash
for p in / /contact/ /about/; do printf '%-10s' "$p"; curl -s "https://shop.example$p?nocache=$RANDOM" | grep -oE '(\+?20|0)1[0-9]{2} ?[0-9]{3} ?[0-9]{4}|\+?20 1[0-9]{2} [0-9]{3} [0-9]{4}' | tr -d ' +' | sed -E 's/^0/20/' | sort | uniq -c | tr '\n' ' '; echo; done
~~~

~~~text الناتج
/               1 201000000000       1 201000000001       2 201000000002
/contact/       2 201000000001       1 201000000002
/about/         2 201000000001
~~~

نفك الأمر:

- [[?nocache=$RANDOM]]: [[$RANDOM]] رقم عشوائي من bash كل مرة. لو فيه CDN أو كاش قدام الموقع، الـ URL المختلف بيخلّيه يجيب نسخة جديدة. (بيتخطى الكاش اللي بيعتمد على الـ URL، مش كل أنواع الكاش.)
- الـ regex ليه جزئين بـ [[|]]: [[(\+?20|0)1[0-9]{2} ?[0-9]{3} ?[0-9]{4}]] بيمسك [[+201000000001]] و [[0100 000 0001]] و [[201000000001]] (اللي في [[wa.me/]])، و [[\+?20 1[0-9]{2} [0-9]{3} [0-9]{4}]] بيمسك [[+20 100 000 0001]] بمسافة بعد الـ 20.
- [[tr -d ' +']]: يشيل كل مسافة وكل [[+]]. و [[sed -E 's/^0/20/']]: الرقم المحلي بيبدأ بصفر، فنحطله كود البلد. دلوقتي كل الصيغ بقت شكل واحد وتتعدّ مع بعض.
- [[tr '\n' ' ']]: يحط ناتج كل صفحة في سطر واحد.

اللي بيقوله الناتج:

- [[201000000002]] (الجديد) في الرئيسية و contact: ده اللي جاي من الداتابيز. التغيير وصل هنا.
- [[201000000001]] (القديم) في **كل** الصفحات: مرتين في contact و about (الفوتر بصيغتين)، ومرة في الرئيسية (JSON-LD اللي مبيظهرش للزائر بس Google بيقراه).
- [[201000000000]]: رقم تجريبي في زرار واتساب. **مش** القديم ولا الجديد. ده زرار مبيوصّلش لحد من الأول! بلّغ صاحب الموقع.

---

## ٢. كل النسخ في الكود

~~~text grep -rnoE "(\+?20|0)[ ]?1[0-9]{2}[ ]?[0-9]{3}[ ]?[0-9]{4}" app components lib docs | sort
app/layout.js:1:+201000000001
components/Footer.js:1:+201000000001
components/Footer.js:1:0100 000 0001
components/WhatsAppButton.js:1:201000000000
docs/notes.md:1:+20 100 000 0001
lib/site.js:2:+20 100 000 0001
lib/site.js:3:+20 100 000 0009
~~~

- [[-o]] مع [[-n]]: لكل رقم سطر، فيه الملف ورقم السطر والرقم نفسه. السطر الواحد ممكن يطلع مرتين (الفوتر فيه صيغتين).
- اقرا كل سطر وقرر:

| الرقم | الملف | قرار |
|---|---|---|
| [[+20 100 000 0001]] | [[lib/site.js]] (fallback) | يتغيّر |
| [[+201000000001]] | [[app/layout.js]] و [[components/Footer.js]] | يتغيّر |
| [[0100 000 0001]] | [[components/Footer.js]] | يتغيّر |
| [[+20 100 000 0009]] | [[lib/site.js]] ([[PAYMENT_PHONE]]) | **ميتغيّرش**: رقم تاني لغرض تاني (محفظة الدفع) |
| [[201000000000]] | [[WhatsAppButton.js]] | **ميتغيّرش بـ sed**: placeholder، اسأل صاحب الموقع يحط إيه |
| [[+20 100 000 0001]] | [[docs/notes.md]] | **سيبه**: ملاحظات قديمة مش بتظهر في الموقع (وفي الحالة الحقيقية كان فيه كمان فولدر بتاع شخص تاني) |

ليه مكتبناش [[sed -i 's/0001/0002/g']] على كل الملفات وخلاص؟ لأن [[0001]] ممكن تبقى في أي حاجة تانية (سعر، أو ID، أو تاريخ)، ولأن الـ regex نفسه بيمسك رقم الدفع. التعديل الأعمى بيغيّر أرقام مش بتاعتك.

---

## ٣. التغيير: صيغة صيغة، في الملفات اللي فيها بس

~~~bash
sed -i 's/+20 100 000 0001/+20 100 000 0002/g' lib/site.js
sed -i 's/+201000000001/+201000000002/g' app/layout.js components/Footer.js
sed -i 's/0100 000 0001/0100 000 0002/g' components/Footer.js
~~~

- كل صيغة بأمر لوحدها، والملفات مكتوبة بالاسم من ناتج الـ grep. لو صيغة ملقتهاش في ملف، الأمر مش هيلمسه.
- في sed العادي (BRE) الـ [[+]] حرف عادي، فـ [[+20]] بيتطابق حرفيًا. في [[sed -E]] كان لازم [[\+]].
- على ماك: [[sed -i '' 's/.../.../g' file]] (الـ [[-i]] في BSD sed محتاج امتداد للنسخة الاحتياطية، والفاضي معناه «من غير نسخة»). ده من وثائق BSD sed، والمعمل كان GNU sed.

---

## ٤. راجع قبل ما تعمل commit

~~~text git diff --stat
 app/layout.js        | 2 +-
 components/Footer.js | 2 +-
 lib/site.js          | 2 +-
 3 files changed, 3 insertions(+), 3 deletions(-)
~~~

- ٣ ملفات، وسطر واحد في كل واحد. ده المتوقع (الفوتر فيه صيغتين في نفس السطر).
- لو شفت [[| 120 +++---]] في ملف فيه رقم واحد، يبقى حاجة تانية اتغيّرت (غالبًا نهايات الأسطر CRLF و LF، وده ليه قضية في تاب git).

وشوف التغيير نفسه كلمة كلمة:

~~~text git diff --word-diff=plain lib/site.js (آخر سطرين)
export const DEFAULT_PHONE = "+20 100 000 [-0001";-]{+0002";+}
export const PAYMENT_PHONE = "+20 100 000 0009"; // رقم محفظة الدفع، مش للتواصل
~~~

[[--word-diff=plain]]: بدل سطر قديم وسطر جديد، بيحط [[[-القديم-]]] و [[{+الجديد+}]] جوه السطر. ورقم الدفع زي ما هو.

---

## ٥. الكود نضيف من القديم؟

~~~text grep -rnoE "..." app components lib | sort
app/layout.js:1:+201000000002
components/Footer.js:1:+201000000002
components/Footer.js:1:0100 000 0002
components/WhatsAppButton.js:1:201000000000
lib/site.js:2:+20 100 000 0002
lib/site.js:3:+20 100 000 0009
~~~

مفيش [[0001]]. واللي فاضل غيره: الدفع والتجريبي، والاتنين قرار مكتوب.

---

## ٦. بعد النشر: نفس الـ loop

بعد ما تعمل commit وتنشر (الدرس الجاي «مفيش نشر تلقائي» بيشرح إزاي تتأكد إن النشر حصل فعلًا)، شغّل نفس الـ loop. المطلوب: [[201000000002]] بس في كل صفحة (و [[201000000000]] لحد ما صاحب الموقع يرد).

ولو صفحة لسه فيها القديم بعد النشر:

- كاش: [[curl -sI URL | grep -iE "cache|age|x-cache"]] (بيقولك الرد جاي من كاش وعمره كام ثانية).
- ملف تاني فيه الرقم برّه الفولدرات اللي دوّرت فيها ([[public/]] أو [[templates/]] أو صورة فيها الرقم!). وسّع الـ grep.
- النشر منزّلش الكود الجديد (الدرس الجاي).

---

## البدايل اللي اترفضت

| البديل | ليه لأ |
|---|---|
| تقول لصاحب الموقع «اتغيّر» لأنك شفته في الرئيسية | الرئيسية جاية من الداتابيز، والفوتر و JSON-LD من الكود |
| [[sed -i]] بالـ regex الواسع على كل الملفات | بيغيّر رقم الدفع والرقم التجريبي وملاحظات حد تاني |
| تمسح الـ fallback من الكود خالص | لو جدول الإعدادات فضي (migration أو داتابيز جديدة)، الموقع هيعرض رقم فاضي |
| تحط الرقم الجديد في الزرار التجريبي من نفسك | مش عارف الزرار ده المفروض يوصّل لأنهي رقم (ممكن خدمة عملاء تانية) |

## متتكررش

- **مصدر واحد للرقم:** الكود يقرا من الإعدادات في كل مكان (الفوتر و JSON-LD والزرار)، والـ fallback ثابت واحد في ملف واحد.
- **بصيغة واحدة:** خزّن الرقم بصيغة دولية من غير مسافات ([[+201000000002]])، واعمل function بتطلّع منه الصيغ اللي محتاجها (للعرض، و [[tel:]]، و [[wa.me]]).
- **اختبار** بيدوّر في الـ build على أي رقم مش هو المصدر.

---

## الخلاصة

| الخطوة | الأمر | لقينا |
|---|---|---|
| ١ | loop بـ [[curl]] و [[grep -oE]] و [[uniq -c]] | الجديد في النص، والقديم في الفوتر و JSON-LD، وزرار برقم تجريبي |
| ٢ | [[grep -rnoE]] | ٤ صيغ للقديم، ورقم دفع، ورقم تجريبي، وملف ملاحظات |
| ٣ | [[sed -i]] لكل صيغة | الملفات اللي فيها بس |
| ٤ | [[git diff --stat]] و [[--word-diff]] | ٣ ملفات × سطر |
| ٥ | [[grep -rnoE]] تاني | مفيش قديم |
| ٦ | نفس الـ loop بعد النشر | الجديد بس |`,
          deep: {
            why: R`«غيّرت» و «اتغيّر» حاجتين مختلفين. اللي غيّر بيبص على المكان اللي غيّر فيه، والزائر بيشوف كل الأماكن. والقيمة الواحدة (رقم، أو إيميل، أو سعر، أو اسم شركة) بتتنسخ في الكود بأشكال كتير مع الوقت: fallback، وبيانات SEO، وزرار، وقالب إيميل. فالتأكيد الحقيقي إنك تسأل الموقع الحي نفسه وتعدّ، والتغيير الآمن إنك تعرف كل نسخة وغرضها قبل ما تلمسها.`,
            how: R`الصفحات اللي بتتعمل على السيرفر (SSR أو PHP) بتقرا الإعدادات من الداتابيز مع كل طلب، فتغيير الجدول بيظهر في الطلب الجاي (إلا لو فيه cache للصفحة أو للإعدادات). أما النصوص المكتوبة في الكود فبتتحط في الصفحة وقت الـ build أو وقت التشغيل من ملفات الكود، ومش هتتغيّر غير بنشر. و [[grep -o]] بيطبع كل تطابق في سطر لوحده، فالسطر اللي فيه رقمين بيطلع مرتين. و [[uniq -c]] بيعدّ السطور المتكررة **ورا بعض**، عشان كده [[sort]] قبله.`,
            when: R`أي تغيير في بيانات تواصل أو أسعار أو اسم أو عنوان على موقع شغّال، وأي «غيّرته ومش ظاهر» أو «ظاهر في حتة ومش في التانية». وقبل ما تقول لعميل «خلاص».`,
            mistakes: R`تبص على الصفحة اللي غيّرت فيها بس. وتدوّر بصيغة واحدة للرقم. و [[sed]] واسع يغيّر رقم الدفع. وتنسى JSON-LD لأنه مش ظاهر للزائر. وتتجاهل رقم تجريبي في زرار. وتعدّل ملفات ملاحظات أو فولدر حد تاني. ومتراجعش [[git diff --stat]]. وتتأكد من الموقع من غير [[?nocache=]] فتشوف نسخة متكيّشة. و [[uniq -c]] من غير [[sort]].`
          },
          sol: R`قبل التعديل الـ loop طلّع: [[/  1 201000000000  1 201000000001  2 201000000002]] و [[/contact/  2 201000000001  1 201000000002]] و [[/about/  2 201000000001]]. و [[grep -rnoE]] طلّع ٧ سطور (منهم [[+20 100 000 0009]] للدفع و [[201000000000]] التجريبي و [[docs/notes.md]]). بعد الـ ٣ أوامر [[sed]]: [[git diff --stat]] = [[3 files changed, 3 insertions(+), 3 deletions(-)]]، و [[grep]] مفيهوش [[0001]] في [[app]] و [[components]] و [[lib]].

اتجرّب في Git Bash على ويندوز (GNU sed 4.9 و git 2.5x، والريبو بـ [[core.autocrlf false]])، والموقع الحي كان [[nginx:alpine]] في Docker على [[http://127.0.0.1:8090]] بـ ٣ صفحات ثابتة بتمثّل النتيجة (نص من الداتابيز وفوتر من الكود). الـ [[sed -i '']] بتاع ماك من وثائق BSD sed.`,
          practice: [
            { lvl: 'سريع', t: R`من غير ما تبص: ليه الرقم الجديد ظهر في نص الصفحة فورًا وفي الفوتر لأ؟ وليه [[uniq -c]] محتاج [[sort]] قبله؟ وإيه اللي [[?nocache=$RANDOM]] بيتخطاه وإيه اللي مبيتخطاهوش؟`, done: R`كتبت إن النص من الداتابيز مع كل طلب والفوتر نص في الكود محتاج نشر، وإن [[uniq]] بيدمج المتكرر ورا بعض بس، وإن [[nocache]] بيتخطى الكاش اللي مفتاحه الـ URL، ومش بيتخطى كاش الإعدادات جوه التطبيق ولا كاش بيتجاهل الـ query string.` },
            { lvl: 'تطبيق', t: R`اكتب regex: ريبو فيه الإيميل القديم بالأشكال دي: [[info@old-shop.example]] و [[INFO@Old-Shop.example]] و [[mailto:info@old-shop.example]] و [[info [at] old-shop.example]]. اكتب [[grep -rnoiE]] واحد يمسكهم كلهم ومايمسكش [[billing@old-shop.example]]. وجرّبه على ملفات تعملها.`, done: R`الـ grep بيطلّع الـ ٤ ومش بيطلّع billing، واستخدمت [[-i]] للحروف الكبيرة، وكتبت ليه [[ [at] ]] محتاج حالة لوحدها.` },
            { lvl: 'تطبيق', t: R`صلّح الكود البايظ: الأمر ده اتكتب عشان يغيّر الرقم، وبعده الدفع بقى بيروح للرقم الجديد:
[[grep -rlE "100 ?000 ?000[0-9]" . | xargs sed -i -E 's/(100 ?000 ?000)[0-9]/\12/g']]
لاقي كل اللي غلط فيه (٣ حاجات على الأقل) وجرّب نسخته الغلط على نسخة من ريبو المعمل وشوف [[git diff]].`, done: R`شفت في [[git diff]] إن [[PAYMENT_PHONE]] والتجريبي و [[docs/notes.md]] اتغيّروا، وكتبت: الـ regex واسع، و [[.]] بتشمل [[docs]] و [[.git]] نفسه، و [[xargs]] بيتكسر لو اسم ملف فيه مسافة، و [[\12]] معناه «المجموعة ١ وبعدها 2» (اتأكد بتجربة)، وكتبت النسخة الصح (صيغة صيغة بالملف).` },
            { lvl: 'تطبيق', t: R`بيانات حقيقية: اختار موقع انت عامله (أو المعمل)، ونزّل ١٠ صفحات منه بـ curl، وطلّع كل أرقام التليفونات والإيميلات وروابط [[wa.me]] و [[tel:]] و [[mailto:]] بـ [[grep -oE]]، واعمل جدول: القيمة، وعدد الصفحات اللي فيها، ونوعها.`, done: R`عندك جدول فيه كل القيم، وكل قيمة ظاهرة في عدد صفحات، ولقيت حاجة واحدة على الأقل مكنتش عارف إنها موجودة (رقم قديم، أو رابط تجريبي، أو إيميل شخصي).` },
            { lvl: 'تحدي', t: R`ابني [[verify-live.sh]] (المشروع المتوسط في الوحدة دي، نسخة صغيرة): بياخد دومين ولستة صفحات و regex للقديم و regex للجديد، ويطبع جدول لكل صفحة [[old=N new=M]]، وحكم [[DONE]] أو [[PARTIAL]]، ويعيد الصفحة مرة لو رجعت 403 أو 5xx.`, done: R`على معمل الدرس قبل النشر [[PARTIAL]] ومعاه [[/about/ old=2 new=0]]، وبعد ما تغيّر ملفات الـ HTML في المعمل [[DONE]]، وصفحة بترجّع 500 بتتعاد وبتتكتب [[ERROR]] مش [[DONE]].` },
            { lvl: 'تحدي', t: R`refactor: حوّل كود المعمل بحيث الرقم موجود في مكان واحد ([[lib/contact.js]] فيه [[PHONE_E164 = "+201000000002"]])، و functions بتطلّع: صيغة العرض [[+20 100 000 0002]]، و [[tel:+201000000002]]، و [[https://wa.me/201000000002]]. واكتب اختبار بيفشل لو أي ملف في [[app]] و [[components]] فيه رقم مكتوب بإيده.`, done: R`[[grep -rnoE]] على [[app]] و [[components]] فاضي من أي رقم، والصيغ التلاتة طالعة صح من الـ functions، والاختبار بيفشل لو حطيت رقم في الفوتر بإيدك وبينجح لما تشيله.` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`], sh: R`bash`, run: R`page='<p>+20 100 000 0002</p><a href="tel:+201000000001">0100 000 0001</a><a href="https://wa.me/201000000000">wa</a>'
echo "$page" | grep -oE '(\+?20|0)1[0-9]{2} ?[0-9]{3} ?[0-9]{4}|\+?20 1[0-9]{2} [0-9]{3} [0-9]{4}' | tr -d ' +' | sed -E 's/^0/20/' | sort | uniq -c | awk '{print $2 "=" $1}' | tr '\n' ' '; echo`, expect: [R`201000000000=1`, R`201000000001=2`, R`201000000002=1`] },
            { os: [R`windows`], sh: R`pwsh`, run: R`$page = '<p>+20 100 000 0002</p><a href="tel:+201000000001">0100 000 0001</a><a href="https://wa.me/201000000000">wa</a>'
[regex]::Matches($page, '(\+?20|0)1[0-9]{2} ?[0-9]{3} ?[0-9]{4}|\+?20 1[0-9]{2} [0-9]{3} [0-9]{4}') |
  ForEach-Object { ($_.Value -replace '[ +]', '') -replace '^0', '20' } |
  Group-Object | Sort-Object Name | ForEach-Object { "$($_.Name)=$($_.Count)" }`, expect: [R`201000000000=1`, R`201000000001=2`, R`201000000002=1`] },
          ],
        },
        {
          cmd: "مفيش نشر تلقائي",
          title: "«ارفعه وشوفه في البرودكشن»: تتأكد إنه مفيش نشر تلقائي، وتنشر بإيدك، وتثبت إن التعديل وصل من غير ما الموقع يقع",
          learn: R`تعرف من الترمنال إن الـ push مش هينشر لوحده (workflows و webhooks)، وتثبت إن الصفحة الجديدة مش على الموقع، وتنشر بـ [[git pull]] وفحص syntax، وتتحقق بـ loop، وتفهم 403 المنفرد، وتعيد بناء Docker من غير ما الموقع يقع.`,
          out: R`[[live /new-page: 200]] بعد ما كانت 404، وكل الصفحات المهمة 200، وملفات الصيانة 403، ومفيش ولا طلب 000 وقت إعادة البناء.`,
          desc: R`«خلّص التعديل وارفعه وشوفه على الموقع». عملت [[git push]]، وفتحت الصفحة: 404. الريبو ده **مفيهوش نشر تلقائي**: لا GitHub Actions بتنشر، ولا webhook بيبلّغ السيرفر. الـ push بيحط الكود على GitHub بس. فالترتيب: (١) تتأكد إن الـ push حصل فعلًا ([[git status -sb]] و [[git log]])، (٢) تتأكد إنه مفيش نشر تلقائي ([[ls .github/workflows]] و [[gh api .../hooks]]) عشان متنشرش مرتين أو تستنى حاجة مش هتيجي، (٣) تثبت إن الموقع لسه قديم ([[curl -w "%{http_code}"]] بـ [[?nocache=$RANDOM]])، (٤) تنشر ([[ssh]] و [[git pull]] و [[php -l]])، (٥) تتحقق بـ loop على الصفحات وملفات الصيانة.

وفخين: 403 واحد وسط ٦٠ طلب سريع غالبًا حماية الاستضافة من الطلبات الكتير مش عطل (اتأكد بإعادة). ولو المشروع Docker: [[docker compose down && docker compose build --no-cache && docker compose up -d]] بيوقّع الموقع طول البناء (في المعمل ٢٣ ثانية)، و [[build]] الأول وبعدين [[up -d]] بيقلّلها لأقل من ثانية. والتحذير [[variable is not set. Defaulting to a blank string.]] معناه متغير ناقص في [[.env]] لازم يتصلّح قبل البناء.`,
          example: R`git fetch origin && git status -sb | head -1
git log --format='%h %an %s' -3
ls .github/workflows
gh api repos/acme-co/shop-site/hooks --jq '.[] | {url: .config.url, events: .events, active: .active}'
curl -s -m 15 -o /dev/null -w "live /new-page: %{http_code}\n" "https://shop.example/new-page?nocache=$RANDOM"
ssh -p 65002 u123@198.51.100.30 'cd ~/domains/shop.example/public_html && git pull origin main && php -l index.php && php -l new-page.php'
for u in / /contact/ /new-page /nope-404; do curl -s -o /dev/null -w "$u %{http_code} %{time_total}s\n" "https://shop.example$u"; done
for f in /scripts/admin/migrate-2026-09.php /assets/php/lib.php; do curl -s -o /dev/null -w "$f %{http_code}\n" "https://shop.example$f"; done
docker compose build && docker compose up -d`,
          lines: [
            R`[[git fetch]] يجيب آخر حالة من GitHub من غير ما يغيّر ملفاتك، و [[git status -sb]] سطر واحد: [[[ahead 1]]] = عندك commit مش مرفوع، ومن غيرها = جهازك و GitHub زي بعض.`,
            R`آخر ٣ commits بـ [[%h]] (الـ hash القصير) و [[%an]] (اسم اللي عمله) و [[%s]] (العنوان). تتأكد إن الـ commit بتاعك هو اللي فوق.`,
            R`فيه GitHub Actions؟ [[.github/workflows]] فيه ملفات YAML. لو الفولدر مش موجود: مفيش CI ولا نشر من GitHub.`,
            R`فيه webhook بيبلّغ السيرفر مع كل push؟ [[gh api]] بيكلّم GitHub API، و [[--jq]] يطلّع العنوان والأحداث وشغّال ولا لأ. ولا سطر = مفيش.`,
            R`الصفحة على الموقع الحي: [[-m 15]] أقصى ١٥ ثانية، و [[-w]] يطبع الكود بس، و [[?nocache=$RANDOM]] يتخطى الكاش. 404 = لسه مش منشورة.`,
            R`النشر: [[-p 65002]] بورت SSH بتاع الاستضافة المشتركة، و [[git pull]] يجيب الجديد، و [[php -l]] يفحص الـ syntax لكل ملف من غير ما يشغّله. [[&&]] بيوقف عند أول فشل.`,
            R`فحص بعد النشر: [[%{time_total}]] الوقت بالثواني، و [[$u]] جوه [[-w]] اسم الصفحة جنب الكود. صفحة مش موجودة لازم ترجّع 404 (مش 200 ولا 500).`,
            R`ملفات الصيانة والمكتبات لازم ترجّع 403 للزوار. لو 200، أي حد يقدر يشغّل سكربت الـ migration من المتصفح.`,
            R`Docker: [[build]] الأول والموقع القديم لسه شغّال، وبعدين [[up -d]] يبدّل الـ container في ثانية. مش [[down]] الأول.`,
          ],
          try: R`ابني المعمل اللي في الشرح: bare repo يمثّل GitHub، و clone اسمه [[laptop]]، و clone اسمه [[public_html]] يمثّل السيرفر، و nginx في Docker بيعرض فولدر الموقع. اعمل صفحة جديدة، و push، واتأكد إنها 404، وانشر بـ [[git pull]]، واتأكد إنها 200. وبعدين جرّب ٦٠ طلب بالتوازي وشوف الـ 403.`,
          teach: R`## العَرَض

«ارفع التعديل وشوفه على الموقع». الصفحة الجديدة [[/new-page]] اتعملت، و [[git push]] نجح. فتحت الموقع: **404**. استنيت دقيقتين: لسه 404.

السؤال مش «ليه الموقع بايظ»، السؤال: **مين المفروض ينشر؟**

---

## ١. الـ push حصل فعلًا؟

~~~text git fetch origin && git status -sb | head -1 (قبل الـ push)
## main...origin/main [ahead 1]
~~~

~~~text بعد الـ push
## main...origin/main
~~~

- [[git fetch]]: يحدّث معلومات [[origin/main]] من GitHub. من غيره، [[status]] بيقارن بآخر حالة اتجابت (ممكن تكون قديمة).
- [[-sb]]: [[-s]] مختصر، و [[-b]] سطر الفرع. [[[ahead 1]]] = commit عندك مش على GitHub. [[[behind 2]]] = حد رفع حاجات مش عندك (درس «نسخة قديمة كسرت الإنتاج»).

~~~text git log --format='%h %an %s' -3
056c3b4 dev add about page
5dc1b3e dev add new page
858a24b dev site
~~~

---

## ٢. فيه نشر تلقائي؟

~~~text ls .github/workflows
ls: cannot access '.github/workflows': No such file or directory
~~~

مفيش GitHub Actions خالص. (لو فيه، افتح كل ملف ودوّر على [[on: push]] وخطوة فيها [[ssh]] أو [[deploy]]. وفي ريبو تاني الأمر رجّع [[check.yml]] و [[lessons.yml]]: دول فحوصات مش نشر، والفرق بيبان من جواهم.)

~~~bash
gh api repos/acme-co/shop-site/hooks --jq '.[] | {url: .config.url, events: .events, active: .active}'
~~~

~~~text الناتج
(ولا سطر)
~~~

- [[repos/<owner>/<repo>/hooks]]: لستة الـ webhooks (عنوان بيستقبل رسالة من GitHub مع كل push، وبعض السيرفرات بتعمل [[git pull]] لما الرسالة توصل). محتاج صلاحية admin على الريبو.
- [[--jq]]: فلتر jq جوه gh نفسه. [[.[]]] كل عنصر، و [[{...}]] object بالحقول دي بس.
- ولا سطر = مفيش webhooks. للتأكد: [[--jq 'length']] بيطبع [[0]].

والنتيجة: **محدش هينشر غيرك**. الـ push حط الكود على GitHub بس. (ولو كان فيه نشر تلقائي، كان الصح إنك تستناه وتتأكد منه، مش تنشر بإيدك فوقه.)

---

## ٣. اثبت إن الموقع لسه قديم

~~~text curl -s -m 15 -o /dev/null -w "live /new-page: %{http_code}\n" "https://shop.example/new-page?nocache=$RANDOM"
live /new-page: 404
~~~

ده الرقم اللي هتقارن بيه بعد النشر.

---

## ٤. النشر

الموقع على استضافة مشتركة فيها SSH و git (الإعداد كله في درس «ssh 'git pull'» في تاب vps):

~~~bash
ssh -p 65002 u123@198.51.100.30 'cd ~/domains/shop.example/public_html && git pull origin main && php -l index.php && php -l new-page.php'
~~~

~~~text الناتج
From github.com:acme-co/shop-site
 * branch            main       -> FETCH_HEAD
   858a24b..5dc1b3e  main       -> origin/main
Updating 858a24b..5dc1b3e
Fast-forward
 new-page.php | 1 +
 1 file changed, 1 insertion(+)
 create mode 100644 new-page.php
No syntax errors detected in index.php
No syntax errors detected in new-page.php
~~~

- [[858a24b..5dc1b3e]]: السيرفر كان على [[858a24b]] وبقى على [[5dc1b3e]]. لازم الأخير يطابق اللي في [[git log]] عندك.
- [[Fast-forward]]: السيرفر مكانش فيه أي commit مش على GitHub، فـ git حرّك المؤشر لقدام بس. لو قال [[Merge made by]] أو وقف بـ conflict، يبقى حد عدّل على السيرفر مباشرة (وقّف واقرا قبل ما تكمّل).
- [[new-page.php | 1 +]] و [[create mode 100644]]: ملف جديد بسطر واحد، وصلاحياته عادية.
- [[php -l]]: lint، بيقرا الملف ويتأكد إن مفيش syntax error من غير ما يشغّله. لو فيه:

~~~text php -l broken.php
Parse error: syntax error, unexpected end of file, expecting "," or ";" in broken.php on line 2
Errors parsing broken.php
~~~

كود الخروج 255، و [[&&]] بيوقف. بس الملف **اتنزّل خلاص** بالـ pull، فالأحسن تعمل [[php -l]] محلي قبل الـ push (أو في CI). الـ lint على السيرفر آخر خط دفاع مش أول واحد.

(اتجرّب في المعمل: [[git pull]] بين فولدرين محليين، و [[php -l]] بـ [[php:8.3-cli-alpine]] في Docker.)

---

## ٥. اتحقق بعد النشر

~~~bash
for u in / /contact/ /new-page /nope-404; do curl -s -o /dev/null -w "$u %{http_code} %{time_total}s\n" "https://shop.example$u"; done
~~~

~~~text الناتج
/ 200 0.004819s
/contact/ 200 0.007027s
/new-page 200 0.004486s
/nope-404 404 0.002925s
~~~

- [[/new-page]] بقت **200**. ده الدليل.
- [[/nope-404]] صفحة مش موجودة عن قصد: لازم 404. لو رجعت 200، يبقى الموقع بيرجّع الرئيسية لأي رابط (وده بيلخبط Google وبيخبّي الروابط المكسورة). ولو 500، يبقى صفحة الخطأ نفسها بايظة.
- [[/contact]] من غير [[/]] في الآخر رجعت **301** في المعمل (nginx بيحوّل للفولدر). عشان كده كتبنا [[/contact/]].

### فخ Git Bash: [[-w "/ ..."]]

على ويندوز من Git Bash، نفس الـ loop طلّع:

~~~text
C:/Program Files/Git/ 200 0.005194s
~~~

Git Bash بيحوّل أي argument بيبدأ بـ [[/]] لمسار ويندوز، وده بيحصل للنص [[/ %{http_code}]] كمان. الحل: [[MSYS_NO_PATHCONV=1]] قبل الأمر (أو [[export MSYS_NO_PATHCONV=1]] للجلسة)، أو متبدأش النص بـ [[/]].

### ملفات الصيانة مقفولة؟

~~~text
/scripts/admin/migrate-2026-09.php 403
/assets/php/lib.php 403
~~~

سكربت الـ migration ومكتبات PHP لازم محدش يفتحهم من المتصفح. 403 = مقفولين (بـ [[deny all]] في nginx أو [[Require all denied]] في [[.htaccess]]). لو 200، أي زائر يقدر يشغّل الـ migration.

---

## ٦. فخ: 403 وسط الطلبات

وانت بتختبر بسرعة (loop كبير أو بالتوازي)، ممكن تلاقي:

~~~text seq 60 | xargs -P 20 -I{} curl -s -o /dev/null -w "%{http_code}\n" "https://shop.example/?i={}" | sort | uniq -c
     52 200
      8 403
~~~

~~~text بعد ثانيتين: curl -s -o /dev/null -w "retry: %{http_code}\n" https://shop.example/
retry: 200
~~~

- [[xargs -P 20]]: ٢٠ طلب في نفس الوقت. و [[-I{}]] يحط الرقم مكان [[{}]].
- الـ 403 اختفت لوحدها: **حماية من الطلبات الكتير** (rate limit)، مش عطل في النشر. في المعمل كانت [[limit_req]] في nginx بـ [[limit_req_status 403]]، ولوجه بيقول [[limiting requests, excess: 10.340 by zone "perip"]]. وفي الحالة الحقيقية كانت حماية شركة الاستضافة: 403 واحدة وسط ٦٠ طلب.
- القاعدة: 403 **منفردة** وسط 200 = اعيد الطلب بعد ثواني. 403 **ثابتة** على صفحة معيّنة = صلاحيات أو قاعدة حماية بجد.

---

## ٧. ولو المشروع Docker: متوقّعش الموقع وانت بتبني

الأمر اللي بيتكتب كتير:

~~~bash
docker compose down && docker compose build --no-cache && docker compose up -d
~~~

قسنا: سكربت بيسأل الموقع كل نص ثانية وقت الأمر، والـ build فيه خطوة بتاخد ٢٠ ثانية:

~~~text الطريقة دي: down ثم build ثم up
000 count: 39  200 count: 60
11:44:33 000
11:44:56 000
~~~

**٢٣ ثانية** الموقع واقع (39 طلب رجع 000). لأن [[down]] شال الـ container الأول، والبناء خد وقته، والموقع مش موجود طول الوقت ده.

~~~text build الأول ثم up -d
build took 22s
 Container svccase-build-web-1 Starting
 Container svccase-build-web-1 Started
000 count: 1  200 count: 84
~~~

طلب واحد بس فشل (أقل من ثانية): الـ container القديم فضل شغّال طول البناء، و [[up -d]] بدّله بالجديد في اللحظة الأخيرة.

- [[--no-cache]]: بيبني كل خطوة من الصفر. مفيد لو فيه شك إن الكاش قديم (حزمة اتحدثت بنفس الاسم مثلًا)، بس بيطوّل البناء. ومش هو اللي بيوقّع الموقع، [[down]] هو اللي بيوقّعه.
- وعشان صفر توقف خالص: اتنين replicas ورا proxy، أو blue-green (خارج الدرس ده).

### التحذير اللي بيتطنّش

~~~text docker compose build
time="2026-11-03T11:43:57+02:00" level=warning msg="The \"SMTP_HOST\" variable is not set. Defaulting to a blank string."
~~~

- compose بيقرا [[$__{SMTP_HOST}]] من [[compose.yml]] ومش لاقيه في [[.env]] ولا في الـ shell، فبيحط **نص فاضي** ويكمّل. التطبيق هيقوم والإيميلات مش هتتبعت.
- اتعامل معاه **قبل** البناء: زوّد المتغير في [[.env]] (قارن بـ [[.env.example]])، أو اكتب [[$__{SMTP_HOST:?SMTP_HOST is required}]] في compose عشان يرفض يكمّل.

### متغيرات وقت البناء

~~~text compose.yml (جزء)
    build:
      args:
        NEXT_PUBLIC_API_URL: $__{NEXT_PUBLIC_API_URL}
~~~

غيّرنا [[NEXT_PUBLIC_API_URL]] في [[.env]] وعملنا [[docker compose up -d]] من غير build:

~~~text
 Container svccase-build-web-1 Running
api=https://api.shop.example runtime=
~~~

لسه القديم! القيمة اتحفرت في الـ image وقت البناء ([[ARG]])، و [[up -d]] مبيعيدش البناء. بعد [[docker compose up -d --build]]:

~~~text
api=https://api-v2.shop.example runtime=
~~~

أي [[NEXT_PUBLIC_*]] (أو [[VITE_*]] أو [[REACT_APP_*]]) بيتغيّر = **build جديد** (درس «إعدادات وقت الـ build ووقت التشغيل» في تاب docker).

---

## البدايل اللي اترفضت

| البديل | ليه لأ |
|---|---|
| تستنى «يمكن بياخد وقت» | مفيش حاجة هتنشر، والفحص بياخد ٣ أوامر |
| ترفع الملف بـ FTP أو File Manager | السيرفر يبعد عن git، والـ pull الجاي يتعارض (درس «ssh 'git pull'») |
| [[git pull]] من غير [[php -l]] | syntax error يوقّع الصفحة لكل الزوار |
| تعتبر أي 403 عطل وتعيد النشر | rate limit بيروح لوحده، والإعادة بتزوّد الطلبات |
| [[down && build --no-cache && up]] | الموقع واقع طول البناء (٢٣ ثانية في المعمل، ودقايق في مشروع حقيقي) |
| تطنّش [[variable is not set]] | التطبيق يقوم بقيمة فاضية ويفشل بعدين في حتة تانية |

## متتكررش

- اكتب في الـ README بتاع الريبو: «النشر يدوي: ...» بالأوامر بالظبط، فمحدش يفتكر إن الـ push بينشر.
- سكربت [[deploy.sh]] بيعمل الخطوات ٣ لـ ٥ بالترتيب ويفشل لو أي واحدة فشلت (المشروع الكبير «deploy-check» في الوحدة دي).
- [[php -l]] (أو [[node --check]]) في pre-commit أو CI، قبل ما الكود يوصل للسيرفر.
- في compose: [[$__{VAR:?message}]] لكل متغير لازم.

---

## الخلاصة

| الخطوة | الأمر | لقينا |
|---|---|---|
| ١ | [[git fetch && git status -sb]] | الـ push حصل |
| ٢ | [[ls .github/workflows]] و [[gh api .../hooks]] | مفيش نشر تلقائي |
| ٣ | [[curl -w "%{http_code}" ?nocache=]] | 404 قبل النشر |
| ٤ | [[ssh 'git pull && php -l']] | Fast-forward و No syntax errors |
| ٥ | loop على الصفحات وملفات الصيانة | 200 و 404 و 403 في أماكنهم |
| ٦ | إعادة الطلب | 403 المنفرد = rate limit |
| ٧ | [[build]] ثم [[up -d]] | طلب واحد فشل بدل ٣٩ |`,
          deep: {
            why: R`«عملت push» و «اتنشر» حاجتين مختلفين، والفرق بينهم بيتنسي لما نفس الشخص شغّال على ريبوهات فيها نشر تلقائي وريبوهات من غيره. ولو مسألتش «مين بينشر؟» ممكن تستنى حاجة مش هتيجي، أو تنشر بإيدك فوق نشر تلقائي شغّال فتعمل نسختين. والتأكيد بالأرقام من الموقع الحي (كود الرد، والصفحة الجديدة، والـ 404، والـ 403) هو الحاجة الوحيدة اللي بتقول «وصل».`,
            how: R`GitHub بيبعت أحداث الـ push لطريقتين: workflows في [[.github/workflows]] بتشتغل على runners بتوع GitHub، و webhooks بتبعت POST لعنوان انت محدده. لو الاتنين مش موجودين، مفيش حاجة بتحصل غير إن الكود اتخزّن. و [[git pull]] = [[fetch]] + [[merge]]، ولما السيرفر مفيهوش commits خاصة بيه بيبقى fast-forward. و nginx [[limit_req]] بيعدّ الطلبات لكل IP في الثانية، وبيرفض الزيادة عن [[burst]] بالكود اللي في [[limit_req_status]] (الافتراضي 503، وكتير من الاستضافات بتستخدم 403 أو 429). و [[docker compose up -d]] بيقارن الـ config والـ image بالـ container الشغّال، ولو اختلفوا بيعمل recreate (وقف القديم وتشغيل الجديد)، والوقت ده هو كل الـ downtime لو البناء خلص قبلها.`,
            when: R`أي مشروع جديد عليك قبل أول نشر (اعرف مين بينشر)، وأي «رفعته ومش ظاهر»، وبعد أي نشر يدوي. والجزء بتاع Docker في أي إعادة بناء على سيرفر عليه زوار.`,
            mistakes: R`تفتكر الـ push نشر. وتتأكد من غير [[?nocache=]] فتشوف كاش. وتنشر من غير [[php -l]]. وتقرا [[Merge made by]] على السيرفر وتكمّل عادي. وتعتبر 403 منفرد عطل. ومتختبرش صفحة 404 ولا ملفات الصيانة. و [[down]] قبل [[build]]. وتطنّش [[variable is not set]]. وتغيّر [[NEXT_PUBLIC_*]] و [[up -d]] من غير [[--build]]. وفي Git Bash [[-w "/ ..."]] يتحوّل لمسار ويندوز.`
          },
          sol: R`[[git status -sb]]: [[## main...origin/main [ahead 1]]] قبل الـ push ومن غيرها بعده. [[ls .github/workflows]]: [[No such file or directory]]. [[gh api .../hooks --jq 'length']]: [[0]]. [[live /new-page: 404]] قبل و [[200]] بعد. [[git pull]]: [[Fast-forward]] و [[new-page.php | 1 +]]. [[php -l]]: [[No syntax errors detected]]، والملف البايظ [[Parse error: syntax error, unexpected end of file]] وكود 255. الـ loop: 200 و 200 و 200 و 404، وملفات الصيانة 403. ٦٠ طلب بالتوازي: [[52 200]] و [[8 403]] والإعادة 200. Docker: [[down && build --no-cache && up]] = 39 طلب 000 (حوالي ٢٣ ثانية)، و [[build]] ثم [[up -d]] = طلب واحد.

اتجرّب على ويندوز من Git Bash: bare repo و clones محلية بدل GitHub والسيرفر، و nginx:alpine في Docker بـ [[limit_req]] بدل حماية الاستضافة، و [[php:8.3-cli-alpine]] لـ [[php -l]]، و [[gh api]] على ريبو حقيقي من غير webhooks (قراية بس)، و compose بـ [[node:22-slim]] لاختبار التوقف. الـ [[ssh -p 65002]] للاستضافة المشتركة من درس vps/10 ومتجرّبش هنا.`,
          practice: [
            { lvl: 'سريع', t: R`من غير ما تبص: اكتب ٣ أوامر بالترتيب تعرف بيهم إن الريبو ده هينشر لوحده بعد الـ push ولا لأ. ولو لقيت ملف في [[.github/workflows]]، إزاي تعرف هو نشر ولا فحص بس؟`, done: R`الأوامر: [[ls .github/workflows]] و [[gh api repos/<o>/<r>/hooks --jq length]] و سؤال صاحب السيرفر أو [[crontab -l]] هناك (pull كل شوية)، وللملف: [[grep -nE "on:|ssh|deploy|rsync|scp" .github/workflows/*.yml]].` },
            { lvl: 'تطبيق', t: R`اقرا وتوقّع: بعد [[git pull]] على السيرفر الناتج كان [[Merge made by the 'ort' strategy.]] و [[2 files changed]]. ده معناه إيه؟ وإيه اللي هتعمله قبل ما تكمّل؟ وبعدين اعملها في المعمل: عدّل ملف في [[public_html]] واعمل commit هناك، وبعدين push من [[laptop]] و pull على السيرفر.`, done: R`كتبت إن السيرفر كان فيه commit مش على GitHub (حد عدّل هناك)، وإن الصح [[git log --oneline origin/main..HEAD]] على السيرفر تشوفه، وفي المعمل طلع نفس الرسالة، وكتبت إزاي تمنعه ([[git pull --ff-only]] بيرفض بدل ما يعمل merge).` },
            { lvl: 'تطبيق', t: R`صلّح السكربت البايظ: سكربت نشر بيقول «تمام» حتى لو الـ pull فشل:
[[ssh host "cd site; git pull; php -l index.php"; echo "deployed!"]]
صلّحه بحيث يوقف عند أول فشل، ويطبع الـ commit اللي على السيرفر، ويفحص كل ملفات PHP اللي اتغيّرت في الـ pull بس، ويرجع بكود غير صفر لو أي حاجة فشلت.`, done: R`النسخة الجديدة فيها [[&&]] أو [[set -e]] جوه الأمر، و [[git pull --ff-only]]، و [[git diff --name-only HEAD@{1} HEAD -- '*.php']] مع loop على [[php -l]]، و [[git log -1 --format=%h]]، وجرّبتها في المعمل على ملف بايظ وطلع كود غير صفر ومطبعش deployed.` },
            { lvl: 'تطبيق', t: R`قارن وقيس: في المعمل (compose بخطوة [[sleep 20]])، شغّل سكربت المراقبة كل نص ثانية وجرّب ٣ طرق: [[down && build && up -d]]، و [[build && up -d]]، و [[up -d --build]]. سجّل عدد الـ 000 لكل واحدة.`, done: R`عندك ٣ أرقام: الأولى عشرات (حوالي ٤٠)، والتانية والتالتة طلب أو اتنين، وكتبت ليه [[up -d --build]] زي التانية (بيبني الأول وبعدين يبدّل).` },
            { lvl: 'تحدي', t: R`ابني [[post-deploy-check.sh <base-url>]]: بيقرا لستة من ملف [[checks.txt]] (كل سطر: مسار وكود متوقع، زي [[/new-page 200]] و [[/nope-404 404]] و [[/scripts/admin/x.php 403]])، ويطلب كل واحد، ولو الكود 403 أو 429 أو 5xx وده مش المتوقع يعيده مرة بعد ٣ ثواني، ويطبع جدول ويخرج بكود غير صفر لو أي سطر مش مطابق. ويشتغل من Git Bash من غير مشكلة المسارات.`, done: R`على معمل الدرس كله [[OK]] وكود 0، ولو غيّرت [[deny all]] لملف الـ migration بيطبع [[FAIL /scripts/admin/migrate-2026-09.php expected 403 got 200]] وكود 1، و 403 من الـ rate limit بيعدّي بعد الإعادة، ومن Git Bash مفيش [[C:/Program Files/Git]] في الناتج.` },
            { lvl: 'سريع', t: R`دوّر بنفسك: من وثائق nginx ([[limit_req]] و [[limit_req_zone]] و [[limit_req_status]]) اعرف: [[burst]] و [[nodelay]] بيعملوا إيه؟ والكود الافتراضي للرفض كام؟ وإزاي تستثني IP المراقبة بتاعتك من الحد؟`, done: R`كتبت جملة لكل واحد، والكود الافتراضي 503، والاستثناء بـ [[geo]] أو [[map]] بيحط مفتاح فاضي للـ IP ده (الطلبات بمفتاح فاضي مبتتعدّش).` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`bash`, run: R`d=$(mktemp -d); cd "$d"
git init -q --bare origin.git
git clone -q origin.git laptop 2>/dev/null; cd laptop
git config user.name dev; git config user.email dev@example.invalid; git config core.autocrlf false
git checkout -q -b main
echo home > index.html; git add .; git commit -qm site; git push -q -u origin main
cd ..; git clone -q -b main origin.git public_html
cd laptop; echo new > new-page.html; git add .; git commit -qm "add new page"
git fetch -q origin; git status -sb | head -1
git push -q origin main; git status -sb | head -1
cd ../public_html; git pull -q origin main; ls new-page.html && echo deployed
test -d ../laptop/.github/workflows || echo "no workflows"
cd /; rm -rf "$d"`, expect: [R`## main...origin/main [ahead 1]`, R`new-page.html`, R`deployed`, R`no workflows`] },
          ],
        },
        {
          cmd: "كونسول الاستضافة بيقول login:",
          title: "SSH مش داخل، وفتحت الكونسول من موقع الاستضافة وكتبت فيه ssh فرفض: الكونسول هو شاشة السيرفر نفسه",
          learn: R`تعرف إمتى تستخدم كونسول الاستضافة وإمتى SSH، وتدخل منه صح ([[login:]] اسم يوزر بس)، وتعرف من أول سطر خطأ في ssh السبب فين، وتدوّر على أي باسورد متخزّن نصّي ([[sshpass]]) وتحوّل لمفتاح.`,
          out: R`دخلت من الكونسول وصلّحت اللي كان مانع SSH، وبقيت تدخل بمفتاح بـ [[-o BatchMode=yes]]، و [[grep -rn sshpass]] مبيلاقيش حاجة.`,
          desc: R`SSH مش راضي يدخل (فايروول اتقفل غلط، أو المفتاح اتغيّر)، فدخلت لوحة شركة الاستضافة وفتحت «Console» (أو VNC أو Serial Console). ظهرت شاشة سودا فيها [[vps1 login:]]، فكتبت [[ssh webadmin@198.51.100.20]] وبعدين أي باسورد، فرجع [[Login incorrect]].

الكونسول ده **مش ترمنال على جهازك**. ده شاشة وكيبورد متوصّلين بالسيرفر نفسه، كأنك قاعد قدامه. [[login:]] بيسأل عن **اسم يوزر بس** (اللي كتبته كله اتفهم اسم يوزر غريب)، وبعدين [[Password:]] (ومبيظهرش وانت بتكتب). ولو الدخول عندك بالمفتاح بس ومفيش باسورد لليوزر، الكونسول مش هيدخلك بيه. الكونسول مفيد لما SSH نفسه واقع، والطبيعي إنك تفضل تدخل بـ SSH من ترمنال جهازك.

وأمان: لو الباسورد اتكتب في شات، أو متخزّن نصّي (مثلًا [[sshpass -p '...']] جوه ملف إعدادات أداة)، يتغيّر، والدخول يتحوّل لمفتاح.`,
          example: R`ssh -o BatchMode=yes -o ConnectTimeout=5 webadmin@198.51.100.20 hostname; echo "exit=$?"
grep -rn "sshpass" ~/.config ~/.bash_history 2>/dev/null
ssh-keygen -t ed25519 -f ~/.ssh/shop_ed25519 -C "laptop->shop"
ssh-copy-id -i ~/.ssh/shop_ed25519.pub webadmin@198.51.100.20
ssh -i ~/.ssh/shop_ed25519 -o BatchMode=yes webadmin@198.51.100.20 hostname
sudo sshd -T | grep -iE '^(passwordauthentication|pubkeyauthentication|permitrootlogin)'`,
          lines: [
            R`اعرف SSH واقف فين قبل ما تفتح الكونسول: [[BatchMode=yes]] ميسألش باسورد، و [[ConnectTimeout=5]] ميستناش أكتر من ٥ ثواني. الرسالة بتفرّق: [[timed out]] (فايروول أو السيرفر مش شغّال) و [[refused]] (مفيش sshd) و [[Permission denied]] (المفتاح).`,
            R`فيه باسورد متخزّن نصّي؟ [[-r]] كل الملفات تحت [[~/.config]] (إعدادات الأدوات) وتاريخ الأوامر، و [[-n]] رقم السطر، و [[2>/dev/null]] يخبّي «مش لاقي الملف».`,
            R`مفتاح جديد: [[-t ed25519]] النوع (صغير وسريع وآمن)، و [[-f]] اسم الملف عشان ميكتبش فوق مفتاحك الأساسي، و [[-C]] تعليق يقولك المفتاح ده لإيه لما تشوفه في [[authorized_keys]].`,
            R`انسخ النص العام ([[.pub]]) للسيرفر: [[ssh-copy-id]] بيدخل مرة بالباسورد ويحط المفتاح في [[~/.ssh/authorized_keys]] بالصلاحيات الصح.`,
            R`جرّب المفتاح وبس: [[-i]] المفتاح ده، و [[BatchMode=yes]] يفشل لو المفتاح مش شغّال بدل ما يرجع يسألك باسورد (فتعرف إن المفتاح هو اللي دخّلك).`,
            R`على السيرفر: [[sshd -T]] بيطبع الإعدادات اللي sshd شغّال بيها فعلًا (بعد كل الملفات والـ includes)، و [[grep -iE]] التلاتة المهمين. بعد ما المفتاح يشتغل: [[passwordauthentication no]].`,
          ],
          try: R`في معمل systemd اللي في الوحدة دي: سطّب [[openssh-server]] واعمل يوزر بباسورد، وجرّب [[login]] (اللي هو نفس اللي الكونسول بيشغّله) مرة بكتابة [[ssh ...]] ومرة باسم اليوزر بس. وبعدين اعمل مفتاح و [[ssh-copy-id]] واتأكد إن [[BatchMode=yes]] بيدخل.`,
          teach: R`## العَرَض

SSH مش داخل:

~~~text ssh -o BatchMode=yes -o ConnectTimeout=5 webadmin@198.51.100.20 hostname; echo "exit=$?"
ssh: connect to host 198.51.100.20 port 22: Connection timed out
exit=255
~~~

فتحت لوحة شركة الاستضافة ودوست «Console». ظهرت شاشة سودا فيها:

~~~text
vps1 login:
~~~

كتبت اللي متعوّد عليه:

~~~text
vps1 login: ssh webadmin@198.51.100.20
Password:

Login incorrect
vps1 login:
~~~

(اتعاد في المعمل ببرنامج [[login]] نفسه، اللي هو نفس اللي بيشتغل على الكونسول.)

---

## الكونسول ده إيه؟

| | ترمنال جهازك + ssh | كونسول الاستضافة |
|---|---|---|
| بيشتغل فين | على جهازك، و ssh بيوصّلك بالسيرفر عبر الشبكة | على السيرفر نفسه، كأنها شاشته وكيبورده |
| محتاج شبكة توصل لبورت 22؟ | أيوه | لأ (بيمشي من خلال لوحة الاستضافة) |
| بيسأل عن إيه | مفتاحك (أو باسورد لو مسموح) | [[login:]] اسم يوزر، وبعدين [[Password:]] |
| ينفع تكتب فيه [[ssh]]؟ | أيوه | بعد ما تدخل بس، وملوش لازمة: انت أصلًا على السيرفر |
| نسخ ولزق | عادي | غالبًا مش شغّال أو بيلخبط الحروف (كيبورد افتراضي) |

الكونسول بيشغّل برنامج [[getty]] على الشاشة، وده بيطبع [[<hostname> login:]] ويستنى اسم. أي حاجة تكتبها قبل Enter هي **الاسم**. فـ [[ssh webadmin@198.51.100.20]] اتفهم كيوزر اسمه كده، ومفيش يوزر بالاسم ده، فـ [[Login incorrect]] (ومبيقولش «اليوزر غلط» عشان محدش يعرف الأسامي الموجودة من الرسالة).

---

## الدخول الصح

~~~text
vps1 login: webadmin
Password:
Welcome to Ubuntu 24.04.5 LTS (GNU/Linux 6.18.33.2-microsoft-standard-WSL2 x86_64)
...
webadmin@vps1:~$ whoami; hostname
webadmin
vps1
~~~

- اسم اليوزر **بس**. من غير [[@]] ومن غير IP.
- الباسورد **مبيظهرش** وانت بتكتبه، ولا حتى نجوم. ده طبيعي. اكتبه ودوس Enter.
- خلي بالك من لغة الكيبورد: لو الكيبورد عربي، الحروف هتتكتب غلط ومش هتشوفها.

### ولو بتدخل بمفتاح بس؟

لو اليوزر عمره ما كان ليه باسورد (اتعمل بـ [[adduser --disabled-password]] أو [[passwd -l]])، الكونسول **مش هيدخلك بيه**. الكونسول بيسأل باسورد مش مفتاح. الحلول (من وثائق شركات الاستضافة، ومش متجرّبة هنا لأنها محتاجة لوحة حقيقية):

- يوزر root بباسورد تديه للوحة: كتير من اللوحات فيها «Reset root password» بيحط باسورد جديد وتدخل بيه من الكونسول.
- «Rescue mode»: السيرفر يقوم من نظام تاني وتعدّل الديسك بتاعك.
- وبعد ما تصلّح، **ارجع لـ SSH** واقفل الباسورد تاني.

---

## إمتى الكونسول وإمتى SSH؟

الكونسول للطوارئ: لما SSH نفسه مش داخل. ورسالة ssh بتقولك السبب:

| رسالة ssh | معناها | الكونسول هيفيد؟ |
|---|---|---|
| [[Connection timed out]] | مفيش رد: فايروول (ufw أو فايروول الاستضافة) أو السيرفر واقف | أيوه: ادخل منه وشوف [[ufw status]] و [[systemctl status ssh]] |
| [[Connection refused]] | السيرفر رد بس مفيش حد بيسمع على البورت (sshd واقف، أو بورت تاني) | أيوه: [[systemctl start ssh]] أو صلّح البورت |
| [[Permission denied (publickey)]] | sshd شغّال ورفض مفتاحك | ساعات: لو مفتاحك اتشال من [[authorized_keys]]. جرّب الأول [[ssh -v]] من جهازك |
| [[Host key verification failed]] | بصمة السيرفر اتغيّرت | لأ: المشكلة عندك في [[known_hosts]] (درس «known_hosts» في تاب sshc) |

~~~text Connection refused (المعمل، بورت مفيش عليه sshd)
ssh: connect to host 127.0.0.1 port 2222: Connection refused
exit=255
~~~

---

## أمان: الباسورد اللي اتكتب في حتة

في الحالة الحقيقية، الباسورد كان مكتوب في شات، وكمان متخزّن نصّي في ملف إعدادات أداة بتشغّل أوامر ssh: سطر زي [[sshpass -p '...' ssh ...]]. دوّر:

~~~text grep -rn "sshpass" ~/.config ~/.bash_history 2>/dev/null
/root/.config/deploytool/settings.json:3:    "Bash(sshpass -p 'Lab-only-pass1' ssh webadmin@198.51.100.20 *)"
~~~

### [[sshpass]] إيه؟ وليه أسوأ من المفتاح؟

[[sshpass -p 'pass' ssh user@host]] بيكتب الباسورد لـ ssh بدالك. ده مريح، وده المشكلة:

- **الباسورد نص في ملف** (إعدادات، أو سكربت، أو [[~/.bash_history]]). أي حد أو أي أداة بتقرا الملف معاه الباسورد، والملف بيتنسخ ويترفع ويتبعت.
- **بيبان في لستة البروسسات:** [[sshpass]] نفسه بيخبّي الباسورد من سطر أوامره، بس الأمر اللي شغّله لأ:

~~~text ps -eo args | grep "[s]shpass" (والأمر شغّال)
sh -c ... (sshpass -p "Lab-only-pass1" ssh -o StrictHostKeyChecking=accept-new webadmin@127.0.0.1 "sleep 3; hostname" &) ...
sshpass -p xxxxxxxxxxxxxx ssh -o StrictHostKeyChecking=accept-new webadmin@127.0.0.1 sleep 3; hostname
~~~

السطر التاني: [[sshpass]] غطّى الباسورد بـ [[x]]. السطر الأول: الـ shell اللي شغّله لسه شايله كامل، وأي يوزر على الجهاز يقدر يشوفه بـ [[ps]].
- **السيرفر لازم يقبل باسوردات** ([[PasswordAuthentication yes]])، يعني مفتوح لتخمين الباسورد من النت كله.
- المفتاح: الجزء السري عمره ما بيخرج من جهازك، وتقدر تشيله من السيرفر لوحده من غير ما تغيّر حاجة تانية، وكل جهاز ليه مفتاح.

---

## التحويل لمفتاح

~~~bash
ssh-keygen -t ed25519 -f ~/.ssh/shop_ed25519 -C "laptop->shop"
ssh-copy-id -i ~/.ssh/shop_ed25519.pub webadmin@198.51.100.20
ssh -i ~/.ssh/shop_ed25519 -o BatchMode=yes webadmin@198.51.100.20 hostname
~~~

~~~text الناتج (في المعمل)
Now try logging into the machine, with:   "ssh 'webadmin@127.0.0.1'"
and check to make sure that only the key(s) you wanted were added.

vps1
~~~

- [[-f ~/.ssh/shop_ed25519]]: اسم مخصوص للسيرفر ده. والملفين: [[shop_ed25519]] (السري، صلاحياته [[-rw-------]]) و [[shop_ed25519.pub]] (العام، اللي بيتنسخ).
- [[ssh-copy-id]] بيدخل **آخر مرة** بالباسورد ويضيف المفتاح العام. على ويندوز مش موجود، والبديل في درس «نقل مفتاح SSH» في تاب vps.
- [[BatchMode=yes]] ورجع [[vps1]]: المفتاح هو اللي دخّل (لو كان رجع للباسورد، كان فشل).

وبعد ما تتأكد إن المفتاح شغّال **من ترمنال تاني** (متقفلش الجلسة اللي انت فيها):

~~~text sudo sshd -T | grep -iE '^(passwordauthentication|pubkeyauthentication|permitrootlogin)'
permitrootlogin without-password
pubkeyauthentication yes
passwordauthentication yes
~~~

- [[sshd -T]]: الإعدادات الفعلية بعد قراية [[sshd_config]] وكل ملفات [[sshd_config.d]]. أصدق من إنك تقرا الملف بعينك.
- [[passwordauthentication yes]]: لسه بيقبل باسوردات. اقفلها ([[PasswordAuthentication no]] في [[/etc/ssh/sshd_config.d/]]، و [[sshd -t]] للفحص، و [[systemctl reload ssh]]). التفاصيل في درس «sshd_config» في تاب vps.
- وغيّر الباسورد اللي اتكشف ([[passwd]])، وامسح السطر من ملف الإعدادات ومن [[~/.bash_history]]، وأي توكن أو مفتاح كان في نفس الملف اعتبره مكشوف.

---

## البدايل اللي اترفضت

| البديل | ليه لأ |
|---|---|
| تكتب [[ssh ...]] في [[login:]] تاني بشكل مختلف | الكونسول مش ترمنال جهازك، انت أصلًا على السيرفر |
| تفضل تشتغل من الكونسول | من غير نسخ ولزق، وبطيء، وبيقفل لوحده. صلّح SSH وارجعله |
| [[sshpass]] في سكربت عشان «أسرع» | الباسورد في ملف وفي [[ps]]، والسيرفر لازم يقبل باسوردات |
| تقفل [[PasswordAuthentication]] قبل ما تجرّب المفتاح | ممكن تقفل الباب على نفسك (وترجع للكونسول تاني) |
| تخلّي نفس الباسورد بعد ما اتكتب في شات | أي حد شاف الشات أو اللوج معاه دخول |

## متتكررش

- الدخول بالمفاتيح بس، ومفتاح لكل جهاز، و [[~/.ssh/config]] بيحفظ الاسم والبورت والمفتاح (تاب sshc).
- الأدوات اللي بتشغّل ssh تستخدم المفتاح (و [[BatchMode=yes]]) مش [[sshpass]].
- اعرف قبل الطوارئ: فين الكونسول في لوحة الاستضافة، وفيه يوزر يقدر يدخل منه بباسورد قوي ومتخزّن في password manager.
- قبل أي تعديل في الفايروول أو sshd: سيب جلسة SSH مفتوحة، وجرّب من ترمنال تاني قبل ما تقفلها.

---

## الخلاصة

| الموقف | اعمل |
|---|---|
| [[ssh]] بيقول [[timed out]] أو [[refused]] | كونسول الاستضافة |
| [[login:]] | اسم اليوزر بس، وبعدين الباسورد (مش هيظهر) |
| [[Permission denied (publickey)]] | [[ssh -v]] من جهازك الأول |
| باسورد في ملف أو شات | [[grep -rn sshpass]]، وغيّره، وحوّل لمفتاح |
| المفتاح شغّال بـ [[BatchMode=yes]] | اقفل [[PasswordAuthentication]] |`,
          deep: {
            why: R`أغلب الناس بتتعامل مع السيرفر من ترمنال جهازها بس، فأول ما يشوفوا شاشة سودا فيها prompt بيكتبوا اللي متعوّدين عليه. والكونسول نفسه موجود لسبب واحد: لما الطريق العادي (الشبكة و SSH) مقفول. ولو مفهمتش الفرق، هتضيّع وقت الطوارئ في [[Login incorrect]]. وفي نفس اللحظة دي بالذات الناس بتلزق باسوردات في شاتات وملفات عشان «يخلّصوا»، وده بيفضل بعد ما الأزمة تخلص.`,
            how: R`الكونسول في لوحات الاستضافة بيوصّل بشاشة السيرفر الافتراضية (VNC أو serial) من خلال الـ hypervisor، فمش محتاج الشبكة بتاعة السيرفر ولا sshd. على الشاشة دي systemd بيشغّل [[getty@tty1]] (أو [[serial-getty@ttyS0]])، وده بيطبع [[login:]] ويسلّم الاسم لبرنامج [[login]]، اللي بيتحقق من الباسورد عن طريق PAM و [[/etc/shadow]]. المفاتيح مالهاش دور هنا. و SSH بيتفاوض على مفتاح أو باسورد حسب [[sshd_config]]، و [[sshd -T]] بيطبع النتيجة النهائية بعد الـ includes. و [[sshpass]] بيفتح pseudo-terminal ويكتب فيه الباسورد لما ssh يسأل، فلازم السيرفر يسأل باسورد أصلًا.`,
            when: R`SSH بيرجّع [[timed out]] أو [[refused]] بعد تغيير في الفايروول أو sshd أو reboot، أو السيرفر مش بيقوم كويس (fsck أو مشكلة في الديسك بتظهر على الشاشة بس). وقبل كده، وانت بتجهّز سيرفر: اعرف مكان الكونسول وجرّبه مرة. والجزء بتاع [[sshpass]] أي وقت تلاقي باسورد في ملف أو سكربت أو شات.`,
            mistakes: R`تكتب [[ssh user@host]] أو [[user@host]] في [[login:]]. وتفتكر إن الباسورد مش بيتكتب عشان مفيش نجوم. وتدخل بكيبورد عربي. وتحاول الدخول بيوزر ملوش باسورد. وتفضل تشتغل من الكونسول بدل ما تصلّح SSH. وتستخدم [[sshpass]] في أدوات. وتقفل [[PasswordAuthentication]] قبل ما تجرّب المفتاح من ترمنال تاني. ومتغيّرش باسورد اتكتب في شات.`
          },
          sol: R`[[login]] بعد كتابة [[ssh webadmin@198.51.100.20]] وأي باسورد: [[Password:]] ثم [[Login incorrect]] ثم [[vps1 login:]] تاني. وباسم [[webadmin]] والباسورد الصح: رسالة [[Welcome to Ubuntu 24.04.5 LTS]] و [[webadmin@vps1:~$]]. ssh لعنوان مش بيرد: [[Connection timed out]] و [[exit=255]]، ولبورت مفيش عليه sshd: [[Connection refused]]. [[grep -rn sshpass]] لقى السطر في ملف الإعدادات. [[ps]] وقت [[sshpass]] شغّال بيوري الباسورد في سطر الـ shell الأب و [[xxxxxxxxxxxxxx]] في سطر sshpass. [[ssh-copy-id]] ثم [[ssh -i ... -o BatchMode=yes]] رجّع [[vps1]]. [[sshd -T]]: [[passwordauthentication yes]].

اتجرّب في معمل Ubuntu 24.04 بـ systemd في Docker (OpenSSH 9.6 و sshpass 1.09)، والكونسول اتعاد بتشغيل برنامج [[login]] جوه [[script]] (نفس اللي getty بيسلّمله الاسم). كونسول لوحة الاستضافة نفسه، و Reset root password، و Rescue mode من وثائق شركات الاستضافة ومتجرّبوش هنا. [[timed out]] اتجرّب من Git Bash على ويندوز لعنوان من نطاق التوثيق.`,
          practice: [
            { lvl: 'سريع', t: R`من غير ما تبص: على [[login:]] في الكونسول، تكتب إيه بالظبط؟ وليه الباسورد مش بيظهر؟ ولو انت داخل بمفتاح بس، الكونسول هيدخلك؟`, done: R`كتبت: اسم اليوزر بس، والباسورد مبيظهرش ولا نجوم وده طبيعي، والمفتاح ملوش دور في الكونسول فمحتاج يوزر بباسورد أو reset من اللوحة.` },
            { lvl: 'تطبيق', t: R`اقرا وتوقّع: لكل رسالة من دول، قول السبب الأقرب وأول أمر تكتبه، وهل هتفتح الكونسول: [[Connection timed out]]، و [[Connection refused]]، و [[Permission denied (publickey)]]، و [[Host key verification failed]]، و [[Could not resolve hostname]]. وبعدين اعمل ٣ منهم في المعمل (بورت غلط، ومفتاح غلط، وعنوان مش موجود).`, done: R`الجدول فيه الخمسة بأسباب صح، و ٣ منهم اتعملوا في المعمل والرسالة طلعت زي ما توقعت، وكتبت إن [[Could not resolve hostname]] مشكلة DNS أو اسم غلط عندك ومش محتاجة كونسول.` },
            { lvl: 'تطبيق', t: R`محاكاة: في المعمل، اقفل SSH على نفسك عن قصد ([[systemctl stop ssh]] أو [[ufw deny 22]] لو متسطّب)، واتأكد إن ssh من برّه بيفشل، وادخل من «الكونسول» ([[docker exec -it svccase login]]) باسم اليوزر والباسورد، ورجّع SSH، واتأكد إن [[ssh -o BatchMode=yes]] بيدخل تاني.`, done: R`عندك ٤ سطور ناتج حقيقية: فشل ssh برسالته، ودخول [[login]] الناجح، والأمر اللي رجّع SSH، و [[hostname]] من ssh بعدها.` },
            { lvl: 'تطبيق', t: R`بيانات حقيقية: دوّر على جهازك (أو في المعمل) على أي باسورد أو توكن متخزّن نصّي: [[grep -rnE "sshpass|password=|PASS=|token" ~/.config ~/.bash_history ~/.ssh/config 2>/dev/null]]، واكتب لكل نتيجة: إيه، وفين، وهتعمل فيه إيه (من غير ما تطبع السر نفسه في تقريرك).`, done: R`عندك لستة (ولو فاضية كتبت الأمر والناتج)، وكل سطر فيها مكانه وقرار (يتغيّر، أو يتنقل لـ password manager أو متغير بيئة، أو مفتاح بدل باسورد)، والتقرير نفسه مفيهوش ولا سر.` },
            { lvl: 'تحدي', t: R`ابني [[harden-ssh-check.sh]] بيشتغل على السيرفر (قراية بس): بيطبع من [[sshd -T]] قيم [[passwordauthentication]] و [[permitrootlogin]] و [[pubkeyauthentication]] و [[port]]، وعدد المفاتيح في [[authorized_keys]] لكل يوزر وتعليق كل مفتاح ([[-C]])، والـ users اللي ليهم باسورد ([[passwd -S]])، ويطبع [[WARN]] لكل حاجة مش آمنة.`, done: R`على المعمل قبل التأمين بيطبع [[WARN passwordauthentication yes]] و [[webadmin: 2 keys (laptop->shop, root@vps1)]]، وبعد [[PasswordAuthentication no]] و reload بيطبع [[OK]]، ومبيغيّرش ولا ملف.` },
            { lvl: 'تحدي', t: R`اشرحها: اكتب لصاحب السيرفر (مش مبرمج) رسالة في ٦ سطور: إيه الكونسول وإمتى يستخدمه، وليه الباسورد اللي اتبعت في الشات لازم يتغيّر النهارده، وإيه اللي هتعمله عشان الدخول يبقى بمفتاح.`, done: R`الرسالة فيها خطوة واحدة مطلوبة منه بوضوح، ومفيش فيها الباسورد القديم ولا الجديد، وزميل مش مبرمج قراها وقال فهم الفرق بين الكونسول و SSH.` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`bash`, run: R`ssh -o BatchMode=yes -o ConnectTimeout=3 -p 1 nobody@127.0.0.1 true 2>&1; echo "exit=$?"
d=$(mktemp -d)
mkdir -p "$d/.config/deploytool"
printf '{ "allow": ["Bash(sshpass -p %s ssh webadmin@198.51.100.20 *)"] }\n' "'not-a-real-pass'" > "$d/.config/deploytool/settings.json"
grep -rn "sshpass" "$d/.config" | sed -E "s/-p '[^']*'/-p '***'/" | sed "s#$d#~#"
ssh-keygen -q -t ed25519 -N "" -C "laptop->shop" -f "$d/shop_ed25519"
cut -d' ' -f1,3 "$d/shop_ed25519.pub"
rm -rf "$d"`, expect: [R`Connection refused`, R`exit=255`, R`sshpass -p '***' ssh webadmin@198.51.100.20`, R`ssh-ed25519 laptop->shop`] },
          ],
        },
      ],
    }
]);
