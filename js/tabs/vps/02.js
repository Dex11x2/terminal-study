// تكملة تاب vps: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/vps/01.js (شرح حقول الدرس في أوله)
MORE("vps", [
    {
      t: "المهام المجدولة: cron",
      l: 3,
      n: "",
      items: [
        {
          cmd: "crontab -e",
          title: "اعرض وعدّل مهامك",
          desc: R`cron خدمة على السيرفر بتصحى كل دقيقة وتشغّل أي مهمة جه ميعادها. كل يوزر ليه جدول مهام خاص بيه اسمه crontab، والمهام بتشتغل بصلاحيات اليوزر ده، فمهمة محتاجة root مكانها [[sudo crontab -e]]، والعادية في جدولك.

[[crontab -e]] بيفتح جدولك في محرر (أول مرة هيسألك تختار، و nano الأسهل). كل سطر مهمة: 5 خانات للوقت وبعدها الأمر (الدرس الجاي بيشرح الخانات). لما تحفظ وتقفل بيطبع [[installing new crontab]]، ولو الصيغة غلط بيقولك ويسألك تعدّل. و [[crontab -l]] بيعرض الجدول من غير تعديل.

[[grep CRON /var/log/syslog]] بيدوّر في لوج النظام على سطور cron، فتعرف المهمة اتشغّلت إمتى، و [[| tail]] آخر 10 بس. ده بيقولك «اتشغّلت» مش «نجحت»؛ النجاح تعرفه من ناتج المهمة نفسها. وخد بالك: [[crontab -r]] (الـ r جنب الـ e في الكيبورد) بتمسح الجدول كله من غير ما تسأل.`,
          example: R`crontab -e
crontab -l
grep CRON /var/log/syslog | tail`,
          try: "ضيف مهمة بتكتب التاريخ في ملف كل دقيقة، استنى دقيقتين، واعرض الملف.",
          deep: {
            why: "حاجات لازم تحصل لوحدها في مواعيد: باك أب كل يوم، وتنضيف كل أسبوع، وفحص إن الموقع شغال كل ٥ دقايق. cron هو «منبّه» السيرفر.",
            how: R`cron خدمة شغالة على السيرفر طول الوقت، كل دقيقة بتصحى وتبص في جداول المهام، وتشغّل أي مهمة جه وقتها.

كل يوزر ليه جدول لوحده اسمه crontab. [[crontab -e]] بيفتحه في محرر، و [[crontab -l]] بيعرضه. والمهام بتشتغل بصلاحيات اليوزر صاحب الجدول. فلو المهمة محتاجة root، حطها في crontab بتاع root ([[sudo crontab -e]]).

ولما مهمة تشتغل، cron بيسجّل ده في لوج السيستم، فـ [[grep CRON /var/log/syslog]] بيوريك هل المهمة اتشغّلت فعلًا ولا لأ. بس ده بيقولك «اتشغّلت» مش «نجحت»، والنجاح تعرفه من لوج المهمة نفسها.`,
            when: "أي حاجة متكررة: باك أب، وتنضيف لوجات أو Docker، وفحص صحة الموقع.",
            mistakes: "تعديل الملف مباشرة بدل [[crontab -e]]. [[crontab -e]] بيتأكد إن الصيغة سليمة قبل ما يحفظ."
          },
          lines: ["افتح جدول مهامك تعدّله.", "اعرض المهام.", "اتأكد إن cron شغّل المهام فعلًا، وآخر ١٠ مرات."],
          sol: R`بعد دقيقتين [[cat ~/dates.txt]] فيه سطرين (أو أكتر)، كل واحد وقت بفرق دقيقة بالظبط وفي الثانية صفر تقريبًا:

[[Wed Sep 30 05:06:01 UTC 2026]] و [[Wed Sep 30 05:07:01 UTC 2026]]. جربتها بالظبط كده بسطر [[* * * * * date >> ~/dates.txt]]. و [[crontab -l]] بيوري السطر.

الأغلاط الشائعة: الملف مش موجود: خدمة cron مش شغالة ([[systemctl status cron]])، أو كتبت مسار نسبي، أو السطر الأخير في الـ crontab من غير سطر فاضي بعده (cron القديم بيتجاهله). و [[grep CRON /var/log/syslog]] بيوريك هل الأمر اتنفذ ([[CMD (date >> ...)]]). وافتكر إن [[~]] بيشتغل، بس الأحسن مسار كامل. وماتنساش تمسح السطر ده بعد التجربة.`,
          solCode: R`(crontab -l 2>/dev/null; echo '* * * * * date >> $HOME/dates.txt') | crontab -
crontab -l
cat ~/dates.txt`
        },
        {
          cmd: "crontab",
          title: "صيغة التوقيت",
          desc: R`كل سطر في الـ crontab مهمة: 5 خانات للوقت مفصولين بمسافة، وبعدهم الأمر. الخانات بالترتيب: الدقيقة (0-59)، والساعة (0-23)، واليوم في الشهر (1-31)، والشهر (1-12)، واليوم في الأسبوع (0-7، و 0 و 7 الاتنين الحد). [[*]] معناها «أي قيمة»، و [[*/5]] كل 5، و [[1-5]] من 1 لـ 5 (في خانة الأسبوع من الاتنين للجمعة)، و [[1,15]] القيمتين دول بس.

فـ [[0 3 * * *]] كل يوم 3:00 الفجر، و [[*/5 * * * *]] كل 5 دقايق، و [[0 4 * * 0]] كل حد 4:00 الفجر. والتوقيت ده بتوقيت السيرفر (درس timedatectl).

cron بيشغّل الأمر من غير ترمنال وبـ PATH صغير جدًا، فاكتب المسارات كاملة ([[/usr/bin/docker]] مش [[docker]]، و [[which docker]] بتقولك المسار). ووجّه الناتج لملف: [[>> file]] ضيف الناتج في آخر الملف، و [[2>&1]] ابعت الأخطاء لنفس المكان، وإلا مش هتعرف ليه المهمة فشلت. و [[||]] معناها «لو اللي قبلي فشل نفّذ اللي بعدي». وعلامة [[%]] ليها معنى خاص (سطر جديد) جوه crontab، فـ [[date +%F]] تتكتب [[date +\%F]].`,
          example: R`# ┌ minute (0-59)
# │ ┌ hour (0-23)
# │ │ ┌ day of month (1-31)
# │ │ │ ┌ month (1-12)
# │ │ │ │ ┌ day of week (0 = Sunday)
# * * * * * command
0 3 * * * /home/deploy/backup.sh /var/www/myapp >> /home/deploy/backup.log 2>&1
*/5 * * * * curl -fsS https://example.com/health > /dev/null || echo "down" >> /home/deploy/health.log
0 4 * * 0 /usr/bin/docker system prune -f`,
          try: "قبل ما تحط أي توقيت، اتأكد منه على crontab.guru.",
          flag: "script",
          deep: {
            why: "محتاج تقول لـ cron «امتى بالظبط». والصيغة مختصرة ومش واضحة من أول مرة، عشان كده لازم تفهمها كويس.",
            how: R`كل سطر مهمة: ٥ خانات للوقت، وبعدين الأمر.

الخانات بالترتيب: الدقيقة (0-59)، والساعة (0-23)، واليوم في الشهر (1-31)، والشهر (1-12)، ويوم الأسبوع (0-6، و 0 الأحد).

و [[*]] في أي خانة معناها «أي قيمة». فـ [[0 3 * * *]] معناها: دقيقة 0، ساعة 3، أي يوم، أي شهر، أي يوم في الأسبوع. يعني كل يوم الساعة ٣:٠٠ الفجر. و [[*/5 * * * *]]: كل دقيقة بتقبل القسمة على ٥، يعني كل ٥ دقايق. و [[0 4 * * 0]]: الساعة ٤ الفجر يوم الأحد بس.

وأهم ٣ حاجات بتخلي مهام cron تفشل من غير ما تعرف:

الـ PATH: cron بيشتغل ببيئة فقيرة جدًا، والـ PATH فيه فولدرات قليلة. أمر زي [[docker]] أو [[node]] ممكن ميتلاقاش. اكتب المسار الكامل ([[/usr/bin/docker]])، اعرفه بـ [[which]].

الناتج: مفيش ترمنال تطلع عليه الرسايل، فوجّه الناتج والأخطاء لملف بـ [[>> file 2>&1]]، وإلا مش هتعرف ليه فشلت.

الوقت: cron بيمشي على توقيت السيرفر (شوف [[timedatectl]]).`,
            when: "أي مهمة مجدولة. واستخدم موقع crontab.guru يترجملك أي توقيت لكلام عادي.",
            mistakes: "مسارات مش كاملة. ومفيش توجيه للوج. و [[%]] جوه الأمر: cron بيعتبرها «سطر جديد»، فـ [[date +%F]] لازم تتكتب بـ backslash قبل [[%]]، أو حطها جوه سكربت."
          },
          lines: [
            "كل يوم الساعة ٣:٠٠ الفجر: شغّل سكربت الباك أب على فولدر الموقع، وضيف الناتج والأخطاء للوج.",
            "كل ٥ دقايق: اطلب صفحة health ([[-f]] اعتبر رد 4xx أو 5xx فشل، و [[-sS]] اسكت إلا لو فيه error)، ورمي الصفحة في [[/dev/null]]، ولو فشلت ([[||]]) اكتب down في ملف.",
            "كل يوم أحد الساعة ٤ الفجر: نضّف Docker. المسار كامل عشان cron يلاقيه."
          ],
          sol: R`مثال: [[0 3 * * *]] crontab.guru بيقول [[At 03:00]]. و [[*/5 * * * *]] بيقول [[At every 5th minute]]. و [[0 4 * * 0]] بيقول [[At 04:00 on Sunday]]. لو الجملة اللي بيطلّعها هي اللي في دماغك، التوقيت صح.

وخلّي بالك إن التوقيت ده بتوقيت السيرفر: لو [[timedatectl]] بيقول [[Etc/UTC]]، الـ 3 الفجر UTC هي 5 أو 6 الصبح في مصر.

الأغلاط الشائعة: [[* 3 * * *]] بدل [[0 3 * * *]]: ده بيشتغل كل دقيقة من 3:00 لـ 3:59 (60 مرة). واليوم 0 و 7 الاتنين الحد. و [[%]] في الأمر ليها معنى خاص في crontab (سطر جديد)، فـ [[date +%F]] جوه crontab لازم تبقى [[date +\%F]].`
        },
        {
          cmd: "systemd timer",
          title: "بديل cron بلوج وبيعوّض اللي فاته",
          desc: R`timer في systemd بيشغّل service في مواعيد، زي سطر cron. بس الناتج بيروح لـ journalctl لوحده، و [[systemctl status]] بيقولك آخر مرة نجحت ولا فشلت، و [[Persistent=true]] بيشغّل المهمة اللي فاتت لو السيرفر كان مقفول وقتها.

ملفين بنفس الاسم في [[/etc/systemd/system/]]: [[backup.service]] فيه الأمر، و [[backup.timer]] فيه الميعاد. كل ملف مقسوم لأقسام اسمها بين أقواس مربعة. [[[Unit]]] فيه [[Description]]، الاسم اللي بيظهر في status واللوج. [[[Service]]] فيه [[Type=oneshot]] (أمر بيشتغل ويخلص)، و [[User]] اليوزر اللي هيشغّله، و [[ExecStart]] الأمر بمسار كامل. [[[Timer]]] فيه [[OnCalendar]] الميعاد بصيغة سنة-شهر-يوم ساعة:دقيقة:ثانية و [[*]] أي قيمة، و [[RandomizedDelaySec]] تأخير عشوائي صغير. و [[[Install]]] فيه [[WantedBy=timers.target]]، ودي اللي بتخلي [[enable]] يشغّل الـ timer مع السيرفر.`,
          example: R`# /etc/systemd/system/backup.service
[Unit]
Description=Nightly database backup

[Service]
Type=oneshot
User=deploy
ExecStart=/home/deploy/backup.sh

# /etc/systemd/system/backup.timer
[Unit]
Description=Run backup.service every night

[Timer]
OnCalendar=*-*-* 03:00:00
Persistent=true
RandomizedDelaySec=10min

[Install]
WantedBy=timers.target`,
          try: R`حوّل مهمة الباك أب اللي في crontab لـ timer: اكتب الملفين، واختبر الميعاد بـ [[systemd-analyze calendar]]، وشغّل الـ service مرة بإيدك قبل ما تفعّل الـ timer.`,
          flag: "script",
          deep: {
            why: R`أشهر مشكلة في cron: المهمة مشتغلتش أو فشلت ومحدش عرف، لأن الناتج راح في حتة محدش بيبص فيها، والـ PATH مختلف (شوف «cron مشتغلش» في تاب التشخيص). الـ timer بيحل الاتنين: اللوج في journalctl مع باقي الخدمات، والحالة الأخيرة ظاهرة في status.`,
            how: R`الـ service هنا [[Type=oneshot]]: بيشتغل، ويخلص، ويخرج، مش خدمة فاضلة شغالة. ومفيهاش [[Install]] لأن الـ timer هو اللي بيشغّلها. والـ timer بيشغّل الـ service اللي بنفس اسمه لوحده.

[[OnCalendar]] صيغته: [[يوم-في-الأسبوع سنة-شهر-يوم ساعة:دقيقة:ثانية]]، و [[*]] أي قيمة. [[*-*-* 03:00:00]] كل يوم ٣ الفجر، و [[Sun 04:00]] الأحد ٤ الفجر، و [[*:0/5]] كل ٥ دقايق، وفيه اختصارات زي [[daily]] و [[weekly]]. و [[systemd-analyze calendar "..."]] بيقولك الصيغة صح ولا لأ، والمرة الجاية إمتى بالظبط، قبل ما تحفظ.

[[Persistent=true]]: systemd بيحفظ آخر مرة المهمة اشتغلت. لو السيرفر كان مقفول الساعة ٣، أول ما يقوم بيشغّلها. cron مش بيعمل كده، المهمة بتضيع وخلاص.

[[RandomizedDelaySec=10min]] بيأخر التشغيل وقت عشوائي لحد ١٠ دقايق، عشان لو كذا مهمة أو كذا سيرفر على نفس الساعة ميضربوش الديسك أو الـ API في نفس الثانية.

والمهمة بتشتغل بالبيئة بتاعة systemd، فالمسارات كاملة برضه، و [[Environment]] أو [[EnvironmentFile]] للمتغيرات زي ملف الخدمة.`,
            when: R`مهام مهمة لازم تعرف إنها نجحت: باك أب، وتجديد، وتنضيف. cron لسه كويس للحاجات البسيطة، وعلى استضافة مشتركة مفيش غيره.`,
            mistakes: R`تعمل [[enable]] للـ service بدل الـ timer، فمفيش حاجة بتتجدول. تنسى [[daemon-reload]] بعد تعديل الملفات. تكتب [[OnCalendar=3:00]] وتفتكرها بتوقيتك وهي بتوقيت السيرفر ([[timedatectl]]). و [[Type=simple]] لسكربت: [[systemctl start]] بيرجع على طول قبل ما السكربت يخلص، فمتعرفش من الأمر نفسه نجح ولا لأ، وأي unit مستنية بعده بـ [[After]] بتبدأ بدري. [[oneshot]] بيستنى لحد ما يخلص.`
          },
          lines: [
            "قسم الوصف.",
            "اسم المهمة في status و journalctl.",
            "قسم التشغيل.",
            "بتشتغل وتخلص، مش خدمة فاضلة شغالة.",
            "كيوزر deploy مش root.",
            "السكربت نفسه بمسار كامل.",
            "ملف الـ timer: قسم الوصف.",
            "وصف الـ timer.",
            "قسم المواعيد.",
            "كل يوم الساعة ٣:٠٠ الفجر بتوقيت السيرفر.",
            "لو السيرفر كان مقفول وقتها، شغّلها أول ما يقوم.",
            "أخّرها وقت عشوائي لحد ١٠ دقايق.",
            "قسم التفعيل.",
            "خليه يقوم مع السيرفر (ده اللي enable بيستخدمه)."
          ],
          sol: R`[[systemd-analyze calendar "*-*-* 03:00:00"]] بيطبع [[Normalized form: *-*-* 03:00:00]] و [[Next elapse:]] بتاريخ بكرة الساعة ٣. ولو الصيغة غلط بيقول [[Failed to parse calendar specification]].

وآخر سطر في الحل: [[crontab -e]] وشيل سطر الباك أب القديم، عشان المهمة متشتغلش مرتين.

[[sudo systemctl start backup.service]] بيستنى لحد السكربت ما يخلص (لأنه oneshot)، و [[systemctl status backup.service]] بعدها بيقول [[inactive (dead)]] ومعاه [[status=0/SUCCESS]] وآخر سطور الناتج. ولو فشل: [[failed]] و [[status=1/FAILURE]].

[[systemd-analyze verify /etc/systemd/system/backup.*]] بيطلّع أي غلطة في الملفين، زي [[Command ... is not executable]] لو السكربت مش موجود أو ناقصه [[chmod +x]].`,
          solCode: R`sudo nano /etc/systemd/system/backup.service
sudo nano /etc/systemd/system/backup.timer
systemd-analyze calendar "*-*-* 03:00:00"
systemd-analyze verify /etc/systemd/system/backup.service /etc/systemd/system/backup.timer
sudo systemctl daemon-reload
sudo systemctl start backup.service
systemctl status backup.service
sudo systemctl enable --now backup.timer
crontab -e`
        },
        {
          cmd: "list-timers",
          title: "إمتى اشتغل وإمتى هيشتغل تاني",
          desc: R`[[list-timers]] بيعرض كل timer: الجاية إمتى، وآخر مرة إمتى، وبيشغّل أنهي service. واللوج كله في [[journalctl -u backup.service]]، فمش محتاج [[>> file 2>&1]] زي cron.`,
          example: R`sudo systemctl daemon-reload
sudo systemctl enable --now backup.timer
systemctl list-timers
systemctl list-timers --all
sudo systemctl start backup.service
journalctl -u backup.service --since today
systemctl status backup.service`,
          try: "فعّل الـ timer، واعرض list-timers، وشغّل الـ service بإيدك مرة، وشوف ناتج السكربت في journalctl.",
          deep: {
            why: "الفرق الحقيقي عن cron مش في الملفات، في إنك تقدر تسأل السيرفر «الباك أب اشتغل امبارح؟ ونجح؟» وتلاقي إجابة في ثانية.",
            how: R`[[enable --now backup.timer]]: [[enable]] عشان الـ timer يرجع بعد أي ريستارت، و [[--now]] يبدأ يعد من دلوقتي. الـ timer هو اللي بيتفعّل مش الـ service.

[[list-timers]] بيعرض الـ timers الشغالة: [[NEXT]] الجاية، و [[LEFT]] فاضل قد إيه، و [[LAST]] آخر مرة، و [[UNIT]] و [[ACTIVATES]]. و [[--all]] حتى الواقفة. هتلاقي فيه timers للسيستم نفسه زي [[apt-daily]] و [[logrotate]]، وده نفس اللي أوبونتو بيستخدمه بدل cron.

[[start backup.service]] بيشغّل المهمة دلوقتي من غير ما تستنى الميعاد، بنفس البيئة والـ user، وده أحسن اختبار. وأي حاجة السكربت طبعها (stdout و stderr) بتروح لـ journalctl تحت اسم الـ service.

ولو عايز تنبيه لما يفشل: [[OnFailure=notify@%n.service]] في [[Unit]] بتاع الـ service، وده service تاني بيبعت رسالة (زي سكربت Telegram في قسم المراقبة).`,
            when: "بعد ما تعمل أي timer، وكل ما تشك إن مهمة مجدولة مشتغلتش.",
            mistakes: R`تشيل السطر من crontab وتنسى تعمل [[enable]] للـ timer، فالمهمة تبطّل خالص من غير ما حد ياخد باله. أو العكس: تسيب الاتنين فالباك أب يشتغل مرتين. وتدوّر في [[/var/log/syslog]] زي cron، واللوج في [[journalctl -u]].`
          },
          lines: [
            "خلّي systemd يقرا الملفات الجديدة.",
            "فعّل الـ timer (مش الـ service) وابدأه.",
            "اعرض الـ timers: الجاية وآخر مرة.",
            "حتى اللي واقفة.",
            "شغّل المهمة دلوقتي بإيدك تختبرها.",
            "ناتج السكربت النهارده.",
            "نجحت ولا فشلت آخر مرة."
          ],
          sol: R`[[systemctl list-timers]] بيطلّع سطر فيه [[backup.timer]] و [[backup.service]]، و [[NEXT]] بكرة الساعة ٣ وشوية (بسبب RandomizedDelaySec)، و [[LAST]] فاضي أو [[-]] لو لسه مشتغلش من الـ timer.

بعد [[start backup.service]]، [[journalctl -u backup.service --since today]] بيعرض [[Starting backup.service - Nightly database backup...]] وناتج السكربت، وفي الآخر [[Finished backup.service]] أو [[Failed with result 'exit-code']].

لو الـ timer مش ظاهر في list-timers: نسيت enable، أو اسم الـ timer مش زي اسم الـ service.`
        }
      ]
    },
    {
      t: "باك أب قاعدة البيانات",
      l: 3,
      n: "",
      items: [
        {
          cmd: "pg_dump",
          title: "باك أب Postgres واستعادته",
          desc: R`[[pg_dump]] بيطلّع نسخة كاملة من قاعدة Postgres في ملف (الجداول والبيانات)، والقاعدة شغالة من غير ما توقف الموقع. [[-U postgres]] اليوزر اللي هيدخل بيه، و [[-d mydb]] اسم القاعدة، و [[-f mydb.dump]] اسم الملف اللي هيتكتب. [[-Fc]] (custom format) صيغة مضغوطة بترجعها بـ [[pg_restore]] بس، وبتسمحلك ترجّع جدول واحد لو عايز. من غيرها الناتج نص SQL بترجّعه بـ [[psql]].

[[pg_restore --clean]] بيمسح الجداول الموجودة الأول وبعدين يرجّعها من الملف (ضيف [[--if-exists]] عشان ميطلعش error لو جدول مش موجود). لو القاعدة جوه Docker: [[docker exec db pg_dump]] بيشغّل pg_dump جوه كونتينر اسمه db، والناتج بيخرج في الـ pipe لـ [[gzip]] يضغطه، و [[$(date +%F)]] بتحط تاريخ النهارده في اسم الملف. والرجوع بالعكس: [[gunzip -c]] يفك ويبعت، و [[-i]] في docker exec عشان الكونتينر يقرا اللي جايله.

مع Supabase بتدّي pg_dump الـ connection string من لوحة التحكم. ونسخة pg_dump عندك لازم تبقى نفس نسخة السيرفر أو أحدث، وإلا هيرفض. وباك أب عمرك ما جربت ترجّعه مش مضمون.`,
          example: R`pg_dump -U postgres -d mydb -Fc -f mydb.dump
pg_restore -U postgres -d mydb --clean mydb.dump
docker exec db pg_dump -U postgres mydb | gzip > mydb-$(date +%F).sql.gz
gunzip -c mydb-2026-09-25.sql.gz | docker exec -i db psql -U postgres mydb
pg_dump "postgresql://user:password@host:5432/postgres" -Fc -f supabase.dump`,
          try: "خد باك أب لقاعدة تجربة، امسح جدول، واستعيده.",
          deep: {
            why: "قاعدة البيانات هي أغلى حاجة في مشروعك. الكود على GitHub، إنما بيانات العملاء والطلبات موجودة هنا بس. من غير باك أب، أي غلطة أو اختراق أو ديسك باظ، وخلاص.",
            how: R`[[pg_dump]] بيقرا قاعدة البيانات كلها ويطلّع ملف فيه كل حاجة تعيد بناها: الجداول، والبيانات، والعلاقات. وبيعمل ده والقاعدة شغالة، من غير ما يوقف الموقع، وبيضمن إن النسخة متماسكة (صورة من لحظة واحدة).

وفيه صيغتين: العادية (نص SQL)، ملف فيه أوامر [[CREATE]] و [[INSERT]] بتقراه بعينك وترجّعه بـ [[psql]]. و [[-Fc]] (custom format) مضغوطة، وبترجّعها بـ [[pg_restore]]، وده بيسمحلك ترجّع جدول واحد بس لو محتاج. و [[--clean]] مع restore بيمسح الموجود الأول وبعدين يرجّع.

ولو Postgres جوه Docker: [[docker exec]] بيشغّل [[pg_dump]] جوه الكونتينر، والناتج بيخرج في الـ pipe لجهازك، و [[gzip]] يضغطه. والرجوع بالعكس: [[gunzip -c]] يفك ويبعت للكونتينر. و [[-i]] مهمة هنا عشان الكونتينر يقرا من المدخل.

ومع Supabase: بتاخد الـ connection string من لوحة التحكم وتدّيها لـ [[pg_dump]] مباشرة. ونسخة [[pg_dump]] عندك لازم تبقى نفس نسخة السيرفر أو أحدث، وإلا هيرفض.`,
            when: "باك أب يومي من cron. قبل أي تحديث كبير لقاعدة البيانات (migration). قبل ما تنقل لسيرفر جديد.",
            mistakes: "باك أب عمرك ما جرّبت ترجّعه. جرّب ترجّع على قاعدة تجربة كل فترة. والباسورد في الأمر نفسه بيتحفظ في الـ history، والأحسن تستخدم ملف [[~/.pgpass]]."
          },
          lines: [
            "باك أب لقاعدة mydb بالصيغة المضغوطة ([[-Fc]]) في ملف ([[-f]]).",
            "رجّعه، وامسح الموجود الأول ([[--clean]]).",
            "باك أب من كونتينر اسمه db، واضغطه، والاسم فيه تاريخ النهارده.",
            "رجّع باك أب مضغوط لقاعدة في كونتينر. [[-i]] عشان الكونتينر يقرا اللي جاي.",
            "باك أب من Supabase بالـ connection string."
          ],
          sol: R`[[pg_dump -Fc]] مابيطبعش حاجة وبيعمل ملف [[mydb.dump]] (binary، ماتفتحوش بـ cat). بعد [[DROP TABLE users]] و [[pg_restore --clean]] الجدول بيرجع ببياناته، و [[select * from users]] بيوري الصفوف. جربتها على Postgres محلي.

بس فيه تفصيلة هتقابلك: [[pg_restore -d mydb --clean mydb.dump]] بعد ما مسحت الجدول بيطبع [[error: could not execute query: ERROR: table "users" does not exist]] و [[Command was: DROP TABLE public.users;]] و [[warning: errors ignored on restore: 1]] ويخرج بـ 1، مع إن الاسترجاع نجح. ده لأن [[--clean]] بيحاول يمسح الجدول قبل ما يعمله وهو مش موجود أصلًا.

الحل: [[--clean --if-exists]]، وبيه نفس الأمر خلص من غير أي error و exit 0. الغلط الشائع التاني: الاسترجاع بـ psql لملف [[-Fc]] بيطلع [[invalid command]]؛ الـ custom format بيترجع بـ pg_restore بس.`,
          solCode: R`pg_dump -U postgres -d mydb -Fc -f mydb.dump
psql -U postgres -d mydb -c "DROP TABLE users"
pg_restore -U postgres -d mydb --clean --if-exists mydb.dump
psql -U postgres -d mydb -c "SELECT count(*) FROM users"`
        }
      ]
    },
    {
      t: "خدمة systemd لتطبيقك",
      l: 3,
      n: "البديل الرسمي لـ pm2 و nohup",
      items: [
        {
          cmd: "/etc/systemd/system/myapp.service",
          title: "ملف الخدمة",
          desc: R`ملف الـ service ملف إعدادات (مش أوامر بتتنفّذ) بيقول لـ systemd إزاي يشغّل تطبيقك ويراقبه، ومكانه [[/etc/systemd/system/]] واسمه هو اسم الخدمة. مقسوم 3 أقسام، كل قسم اسمه بين أقواس مربعة.

[[[Unit]]] وصف وترتيب: [[Description]] الاسم اللي بيظهر في status، و [[Wants]] و [[After]] مع [[network-online.target]] معناهم «اطلب إن الشبكة تبقى جاهزة، ومتشغّلنيش غير بعدها».

[[[Service]]] طريقة التشغيل: [[Type=simple]] البرنامج بيفضل شغال، و [[User]] يشتغل بأنهي يوزر (مش root)، و [[WorkingDirectory]] الفولدر اللي يبدأ منه، و [[ExecStart]] الأمر بمسار كامل (اعرفه بـ [[which node]]، لأنه بيختلف لو node متسطّب بـ nvm). [[Restart=always]] يرجّعه لو وقع، و [[RestartSec=5]] يستنى 5 ثواني الأول. [[Environment]] متغير واحد، و [[EnvironmentFile]] يقرا متغيرات من ملف زي [[.env]].

[[[Install]]] فيه [[WantedBy=multi-user.target]]، ومعناها «شغّلني لما السيرفر يقوم بشكل عادي»، ودي اللي بتخلي [[systemctl enable]] يشتغل.`,
          example: R`[Unit]
Description=My Node API
Wants=network-online.target
After=network-online.target

[Service]
Type=simple
User=deploy
WorkingDirectory=/var/www/myapp
ExecStart=/usr/bin/node server.js
Restart=always
RestartSec=5
Environment=NODE_ENV=production
EnvironmentFile=/var/www/myapp/.env

[Install]
WantedBy=multi-user.target`,
          try: "اعمل تطبيق Node صغير على بورت 3000 واكتبله الملف ده.",
          flag: "script",
          deep: {
            why: "عايز تطبيقك يبقى «خدمة» زي Nginx بالظبط: يقوم مع السيرفر، ويرجع لو وقع، ولوجاته مع لوجات السيستم. من غير pm2 ولا Docker.",
            how: R`ده الملف اللي systemd بيقراه عشان يعرف يدير تطبيقك. ٣ أقسام:

[[Unit]]: وصف، و [[Wants]] و [[After]] مع [[network-online.target]] معناهم «متشغّلنيش غير لما الشبكة يبقى ليها IP فعلًا» ([[network.target]] لوحده مش بيضمن ده)، عشان التطبيق محتاج يتصل بقاعدة البيانات.

[[Service]]: إزاي يشتغل. [[User=deploy]] يشتغل كيوزر عادي مش root، لأن لو التطبيق اتخترق، المهاجم مياخدش السيرفر كله. [[WorkingDirectory]] الفولدر اللي يبدأ منه. [[ExecStart]] الأمر اللي يشغّله، بمسار كامل. [[Restart=always]] لو وقع يرجّعه، و [[RestartSec=5]] بعد ٥ ثواني (عشان لو بيقع على طول ميفضلش يحاول ألف مرة في الثانية). و [[EnvironmentFile]] بيقرا متغيرات البيئة من .env.

[[Install]]: [[WantedBy=multi-user.target]] معناها «شغّلني لما السيرفر يوصل للوضع العادي بتاعه»، وده اللي بيخلي [[enable]] يشتغل.`,
            when: "تطبيق Node أو أي برنامج لازم يفضل شغال، ومش عايز Docker. ده الطريقة «الأصلية» في لينكس.",
            mistakes: "[[ExecStart]] من غير مسار كامل، أو مسار node غلط لو مسطّب بـ nvm (نفّذ [[which node]] كيوزر deploy وخد المسار). و [[User=root]] من غير سبب."
          },
          lines: [
            "قسم الوصف والترتيب.",
            "اسم الخدمة اللي هيظهر في status.",
            "اطلب إن الشبكة تبقى جاهزة فعلًا.",
            "ومتتشغّلش غير بعدها.",
            "قسم طريقة التشغيل.",
            "النوع العادي: البرنامج بيفضل شغال في المقدمة.",
            "شغّله كيوزر deploy مش root.",
            "ابدأ من فولدر المشروع.",
            "الأمر نفسه، بمسار node كامل.",
            "لو وقع، رجّعه دايمًا.",
            "استنى ٥ ثواني قبل ما ترجّعه.",
            "متغير بيئة ثابت.",
            "واقرا باقي المتغيرات من .env.",
            "قسم التشغيل التلقائي.",
            "شغّلها مع الوضع العادي للسيرفر (ده اللي enable بيستخدمه)."
          ],
          sol: R`التطبيق الصغير: [[server.js]] بيسمع على 3000 ويرد ok، في [[/var/www/myapp]] وملك deploy، ومعاه [[.env]] (حتى لو فاضي، لأن [[EnvironmentFile]] من غير [[-]] قدامه بيفشل لو الملف مش موجود).

قبل الـ start، [[sudo systemd-analyze verify /etc/systemd/system/myapp.service]] بيفحص الملف. جربته: لو [[ExecStart]] بيشاور على node مش موجود بيطبع [[Command /usr/bin/node is not executable: No such file or directory]]، ولو فيه مفتاح مكتوب غلط زي [[Restrat=]] بيطبع [[Unknown key name 'Restrat' in section 'Service', ignoring.]]. ومن غير مشاكل مابيطبعش حاجة.

الغلط الشائع: node متسطّب بـ nvm فمساره [[/home/deploy/.nvm/versions/node/v24.x/bin/node]] مش [[/usr/bin/node]]. [[which node]] كيوزر deploy بيقولك المسار الحقيقي، حطه في ExecStart.`,
          solCode: R`sudo mkdir -p /var/www/myapp && sudo chown deploy:deploy /var/www/myapp
echo 'require("http").createServer((q, r) => r.end("ok\n")).listen(3000)' > /var/www/myapp/server.js
touch /var/www/myapp/.env
sudo systemd-analyze verify /etc/systemd/system/myapp.service`
        },
        {
          cmd: "daemon-reload",
          title: "شغّل الخدمة",
          desc: R`systemd بيقرا ملفات الخدمات مرة ويحفظها في الذاكرة، فلو عملت ملف جديد أو عدّلت واحد هو مش هيشوفه لوحده. [[daemon-reload]] بتقوله «اقرا الملفات من جديد»، ولازمة بعد أي تعديل في ملف [[.service]].

[[enable]] بتخلي الخدمة تقوم مع كل ريستارت للسيرفر، و [[--now]] بتشغّلها كمان دلوقتي، فالاتنين مع بعض في أمر واحد. [[status]] بتطبع هي شغالة ولا لأ ([[active (running)]] أو [[failed]])، ومن إمتى، ورقم العملية، وآخر سطور من لوجها. و [[journalctl -u myapp -f]] بتتابع لوج الخدمة لايف: [[-u]] اسم الـ unit، و [[-f]] (follow) استنى السطور الجديدة. أي [[console.log]] في تطبيقك بيروح هنا.

لما تعدّل كود التطبيق نفسه مش ملف الخدمة، كفاية [[sudo systemctl restart myapp]].`,
          example: R`sudo nano /etc/systemd/system/myapp.service
sudo systemctl daemon-reload
sudo systemctl enable --now myapp
systemctl status myapp
journalctl -u myapp -f`,
          try: "اقتل عملية node بتاعة الخدمة بـ [[kill]]، استنى 5 ثواني، وشوف status. هتلاقيها قامت تاني.",
          deep: {
            why: "كتبت ملف الخدمة. دلوقتي محتاج تقول لـ systemd يقراه، ويشغّله، ويشغّله مع كل ريستارت.",
            how: R`systemd بيقرا ملفات الخدمات مرة واحدة ويحفظها في الذاكرة. فلو أضفت ملف أو عدّلته، هو مش هيعرف لوحده. [[daemon-reload]] بيقوله «اقرا الملفات من جديد». وده لازم بعد أي تعديل في ملف [[.service]].

وبعدين [[enable --now myapp]]: [[enable]] بيعمل اختصار بيخلي الخدمة تقوم مع السيرفر، و [[--now]] بيشغّلها كمان دلوقتي.

و [[status]] بيوريك: شغالة ولا لأ، ومن إمتى، ورقمها، وآخر كام سطر من لوجاتها. ولو فيه مشكلة، غالبًا السبب هيبان هنا.

و [[journalctl -u myapp -f]] بيتابع لوجات الخدمة لايف. أي [[console.log]] في تطبيقك بيروح هنا.`,
            when: "بعد ما تعمل أو تعدّل ملف خدمة. ولما تعدّل الكود: [[sudo systemctl restart myapp]].",
            mistakes: "تعدّل ملف الخدمة وتنسى [[daemon-reload]]، فالتعديل ميتطبقش وتستغرب."
          },
          lines: [
            "اكتب ملف الخدمة.",
            "خلّي systemd يقرا الملفات من جديد.",
            "شغّلها دلوقتي ومع كل ريستارت.",
            "حالتها وآخر لوجات.",
            "تابع لوجاتها لايف."
          ],
          sol: R`[[systemctl status myapp]] بيوري [[Active: active (running) since ...]] و [[Main PID: 1234 (node)]]. خد الرقم ده، و [[sudo kill 1234]]، واستنى 5 ثواني، و [[status]] تاني: [[Active: active (running) since]] بوقت جديد من ثواني، و [[Main PID]] رقم جديد.

و [[journalctl -u myapp -n 5]] بيوري اللي حصل: [[myapp.service: Main process exited, code=exited, status=143/n/a]] أو [[killed, status=15/TERM]]، وبعدها [[Scheduled restart job, restart counter is at 1.]] و [[Started myapp.service]]. ده [[Restart=always]] و [[RestartSec=5]].

ماعنديش systemd شغال هنا، فده الشكل المتوقع مش ناتج جربته. الغلط الشائع: الخدمة مش بترجع بعد [[systemctl stop myapp]]؛ ده مقصود، الـ restart للموت المفاجئ بس. ولو [[Active: failed]] و [[start request repeated too quickly]]، التطبيق بيقع أول ما يقوم؛ اقرا [[journalctl -u myapp -n 50]].`
        },
        {
          cmd: "journalctl",
          title: "دوّر في اللوجات صح",
          desc: R`systemd بيجمع لوجات كل الخدمات والنظام في مكان واحد، و [[journalctl]] بيقراه. اللوج ده ضخم، فالقوة كلها في الفلاتر، وتقدر تجمعهم في أمر واحد.

[[-u myapp]] لوج خدمة واحدة (u من unit). [[--since "1 hour ago"]] من وقت معين، وبيفهم كمان [["yesterday"]] و [["2026-09-25 14:00"]]، ومعاها [[--until]] لحد وقت. [[-p err]] (priority) الأخطاء وأخطر منها بس. [[-b]] من آخر مرة السيرفر اشتغل (boot)، و [[-b -1]] من المرة اللي قبلها. [[-f]] متابعة لايف، و [[-n 50]] آخر 50 سطر.

اللوجات بتاخد مساحة مع الوقت: [[--disk-usage]] بتقولك كام، و [[--vacuum-time=7d]] بتمسح أي حاجة أقدم من 7 أيام، ومحتاجة [[sudo]].`,
          example: R`journalctl -u myapp --since "1 hour ago"
journalctl -p err -b
journalctl --disk-usage
sudo journalctl --vacuum-time=7d`,
          try: "اعرض أخطاء السيرفر من آخر ريستارت.",
          deep: {
            why: "systemd بيجمّع لوجات كل الخدمات في مكان واحد. بس هي كتير جدًا، ومحتاج تلاقي اللي يهمك: خدمة معينة، في وقت معين، أخطاء بس.",
            how: R`[[journalctl]] بيقرا اللوج المركزي، والقوة كلها في الفلاتر، وتقدر تجمعهم:

[[-u myapp]] خدمة معينة (u من unit). [[--since "1 hour ago"]] من وقت معين، وبيفهم كلام زي [["yesterday"]] و [["2026-09-25 14:00"]]. [[-p err]] مستوى الخطورة: الأخطاء وأخطر منها بس. [[-b]] من آخر مرة السيرفر اشتغل (boot)، مفيد تعرف إيه اللي حصل بعد ريستارت. و [[-f]] متابعة لايف.

واللوجات دي بتاخد مساحة، و [[--disk-usage]] بيقولك كام. و [[--vacuum-time=7d]] بيمسح أي حاجة أقدم من أسبوع.`,
            when: "خدمة وقعت ومش عارف ليه. «إيه اللي حصل امبارح الساعة ٣؟». بعد ريستارت: فيه أخطاء؟",
            mistakes: "تقرا اللوج كله من غير فلاتر فتغرق. ابدأ دايمًا بـ [[-u]] و [[--since]]."
          },
          lines: [
            "لوجات myapp من ساعة لحد دلوقتي.",
            "الأخطاء بس ([[-p err]]) من آخر تشغيل للسيرفر ([[-b]]).",
            "اللوجات واكلة قد إيه من الديسك.",
            "امسح أي لوج أقدم من ٧ أيام."
          ],
          sol: R`[[journalctl -p err -b]] بيطبع الأخطاء بس (err وأخطر) من آخر boot، كل سطر بالتاريخ واسم الخدمة: [[Sep 30 05:01:12 server myapp[1234]: Error: connect ECONNREFUSED 127.0.0.1:5432]] مثلًا. لو السيرفر سليم ممكن تلاقي سطور قليلة من الـ kernel أو مفيش خالص ([[-- No entries --]]).

عشان تشوف من ريستارت اللي قبله: [[journalctl -p err -b -1]]. و [[journalctl --list-boots]] بيوري الـ boots المتسجلة.

ماعنديش systemd هنا فمجربتهاش. الغلط الشائع: [[-b -1]] يطلع [[Specifying boot ID or boot offset has no effect, no persistent journal was found]]: اللوجات مش بتتحفظ بعد reboot. اعمل [[sudo mkdir -p /var/log/journal]] وبعدين [[sudo systemctl restart systemd-journald]]. ولو مش شايف لوجات خدمات تانية كيوزر عادي، استخدم [[sudo]] أو ضيف نفسك لجروب [[adm]].`
        }
      ]
    },
    {
      t: "التشخيص والصيانة",
      l: 3,
      n: "",
      items: [
        {
          cmd: "ncdu",
          title: "مين واكل الديسك",
          desc: R`لما السيرفر يقول [[No space left on device]] محتاج تعرف بسرعة مين واكل الديسك. [[ncdu]] بيحسب حجم كل فولدر مرة واحدة، وبعدين يعرضهم مترتبين من الأكبر للأصغر، وجنب كل واحد شريط بنسبته.

بتتحرك بالأسهم، و Enter تدخل فولدر، والسهم الشمال ترجع، فتدخل على الأكبر ثم الأكبر جواه لحد ما توصل للمتهم. [[d]] بتمسح الحاجة اللي واقف عليها (بعد تأكيد)، و [[q]] للخروج. [[sudo]] عشان يقدر يقرا كل الفولدرات، و [[/]] معناها ابدأ من أول الديسك. ولو عايزه ميعدّيش على ديسكات تانية متركبة، ضيف [[-x]].

متمسحش بيه حاجات جوه [[/var/lib/docker]] أو [[/var/lib/postgresql]]: دي بيانات برامج، وتتمسح بأوامر البرنامج نفسه.`,
          example: R`sudo apt install -y ncdu
sudo ncdu /`,
          try: "لاقي أكبر 3 فولدرات على السيرفر.",
          deep: {
            why: "الديسك مليان، ومحتاج تلاقي بسرعة إيه اللي واكله. [[du]] بيشتغل بس محتاج تكرره في كل فولدر. [[ncdu]] بيخليك «تتمشى» في الديسك.",
            how: R`[[ncdu]] بيحسب حجم كل حاجة مرة واحدة في الأول (بياخد شوية على ديسك كبير)، وبعدين يعرضلك الفولدرات مترتبة من الأكبر، وجنب كل واحد شريط بيوضّح نسبته.

وتتحرك بالأسهم، و Enter تدخل فولدر، والسهم الشمال ترجع. فبتدخل على الأكبر، ثم الأكبر جواه، لحد ما توصل للملف أو الفولدر المتهم.

و [[d]] بتمسح، وبيسألك تأكيد. و [[q]] للخروج.

و [[sudo]] عشان يقدر يقرا كل الفولدرات.`,
            when: "«No space left on device»، أو الديسك قرّب يتملى.",
            mistakes: "تمسح حاجات جوه [[/var/lib/docker]] أو [[/var/lib/postgresql]] بـ [[d]] مباشرة. دي بيانات برامج، وامسحها بأوامر البرنامج نفسه ([[docker system prune]] مثلًا)، وإلا هتبوّظه."
          },
          lines: ["سطّبه.", "امشي في الديسك كله مترتب بالحجم. أسهم للتنقل، و q للخروج."],
          sol: R`[[sudo ncdu /]] بيعدّ الملفات شوية وبعدين يعرض قايمة مترتبة من الأكبر للأصغر، الحجم وشريط جنب كل فولدر. أكبر 3 على سيرفر ويب غالبًا: [[/var]] (جواه [[/var/lib/docker]] و [[/var/log]])، و [[/usr]]، و [[/home]] أو [[/snap]]. ادخل بـ Enter وارجع بـ [[←]] أو [[h]]، واخرج بـ [[q]].

من غير ncdu: [[sudo du -xh --max-depth=1 / | sort -h | tail -4]] بيطلّع نفس الفكرة كنص (السطر الأخير هو [[/]] نفسه).

الغلط الشائع: تمسح حاجة جوه [[/var/lib/docker]] بإيدك من ncdu (زرار [[d]])؛ ده بيبوظ Docker. استخدم [[docker system prune]]. ولو ncdu عدّى على [[/proc]] أو ديسكات تانية، شغّله بـ [[-x]] عشان يفضل على نفس الـ filesystem.`
        },
        {
          cmd: "dig / curl -v",
          title: "مشاكل الدومين والاتصال",
          desc: R`لما الموقع مش بيفتح، المشكلة ممكن تكون في الدومين أو الاتصال أو الشهادة أو التطبيق، والأداتين دول بيقولولك أنهي. [[dig]] بيسأل الـ DNS: [[dig +short example.com]] بيطبع الـ IP اللي الدومين بيشاور عليه من غير تفاصيل، ولو مش IP سيرفرك يبقى المشكلة في الدومين. و [[MX]] نوع سجل تاني: سيرفرات الإيميل.

[[curl -v]] (verbose) بيطبع كل خطوة: السطور اللي بتبدأ بـ [[*]] هي الاتصال والشهادة، و [[>]] الطلب اللي اتبعت، و [[<]] الرد. [[-I]] بيطلب الـ headers بس من غير الصفحة. في السطر الأخير: [[-o /dev/null]] ارمي الصفحة، و [[-s]] متطبعش شريط تقدم، و [[-w]] اطبع قيم معينة في الآخر: [[%{http_code}]] الـ status و [[%{time_total}]] الوقت الكلي بالثواني، و [[\n]] سطر جديد. فيطلعلك سطر واحد زي [[200 0.34s]].`,
          example: R`dig +short example.com
dig example.com MX +short
curl -vI https://example.com
curl -o /dev/null -s -w "%{http_code} %{time_total}s\n" https://example.com`,
          try: "قيس وقت الاستجابة لموقعك 3 مرات.",
          deep: {
            why: "الموقع مش بيفتح، والمشكلة ممكن تكون في ١٠ أماكن. الأداتين دول بيقسموا المشكلة: DNS ولا اتصال ولا شهادة ولا التطبيق نفسه.",
            how: R`[[dig +short]] بيجاوب أول سؤال: الدومين بيشاور على السيرفر الصح؟ لو لأ، المشكلة في الـ DNS، ومفيش داعي تدوّر في السيرفر.

[[curl -v]] (verbose) بيطبع كل خطوة في الاتصال، والسطور اللي بتبدأ بـ [[*]] هي اللي بتقولك إيه اللي بيحصل: الـ IP اللي اتصل بيه، وهل الاتصال نجح، وتفاصيل الشهادة (للدومين ده؟ لسه صالحة؟)، وبعدين [[>]] الطلب اللي اتبعت، و [[<]] الرد اللي جه. فبتعرف بالظبط وقف فين.

و [[-w]] بيطبع قيم معينة بعد ما يخلص: [[%{http_code}]] الـ status، و [[%{time_total}]] الوقت الكلي. ومع [[-o /dev/null -s]] (ارمي الصفحة واسكت)، بيطلعلك سطر واحد: «200 0.34s». مثالي للقياس أو للسكربتات.`,
            when: "أول خطوتين في تشخيص «الموقع مش بيفتح». وقياس سرعة الموقع من السيرفر نفسه ومن جهازك وتقارن.",
            mistakes: "إنك تبدأ تدوّر في كود التطبيق والمشكلة في الـ DNS أو الشهادة. امشي بالترتيب."
          },
          lines: [
            "الدومين بيشاور على أنهي IP.",
            "سيرفرات الإيميل بتاعته.",
            "كل خطوات الاتصال والشهادة والـ headers ([[-v]] مع [[-I]]).",
            "ارمي الصفحة ([[-o /dev/null]])، واسكت ([[-s]])، واطبع الـ status والوقت بس."
          ],
          sol: R`[[for i in 1 2 3; do curl -o /dev/null -s -w "%{http_code} %{time_total}s\n" https://example.com; done]] بيطبع ٣ سطور زي [[200 0.412s]] و [[200 0.188s]] و [[200 0.179s]]. الأول غالبًا أبطأ لأنه عمل DNS و TLS handshake من الصفر.

عشان تعرف الوقت راح فين: [[-w "dns %{time_namelookup} connect %{time_connect} tls %{time_appconnect} ttfb %{time_starttransfer} total %{time_total}\n"]]. لو [[ttfb]] كبير والباقي صغير، السيرفر أو التطبيق هو البطيء مش الشبكة.

الغلط الشائع: [[000]] بدل رقم: curl مقدرش يتصل خالص (DNS أو شهادة أو proxy)، شيل [[-s]] أو استخدم [[-sS]] عشان تشوف السبب. ده حصل معايا هنا فعلًا بسبب proxy بيرفض الاتصال، و [[-sS]] طلّع [[CONNECT tunnel failed, response 403]].`
        },
        {
          cmd: "watch",
          title: "كرر أمر كل كام ثانية",
          desc: R`[[watch]] بيشغّل أمر ويعرض ناتجه في الشاشة كلها، ويعيده كل كام ثانية ويحدّث الشاشة، لحد ما تدوس Ctrl+C. مفيد وانت مستني حاجة تتغير: كونتينر يقوم، أو ديسك يتفضّى، بدل ما تكتب نفس الأمر كل شوية.

[[-n 2]] كل ثانيتين (و 2 هو الافتراضي أصلًا)، و [[-n 5]] كل 5. في أول سطر بيكتب الأمر والوقت، و [[-d]] بيعلّم على اللي اتغير عن المرة اللي فاتت.

لو الأمر فيه pipe أو علامات خاصة، حطه كله بين علامات تنصيص زي [["df -h /"]] عشان watch ياخده كامل، وإلا الشيل هيطبّق الـ pipe على ناتج watch نفسه.`,
          example: R`watch -n 2 docker ps
watch -n 5 "df -h /"`,
          try: "شغّل watch على docker ps وانت بتعمل restart لكونتينر من نافذة تانية.",
          deep: {
            why: "بتستنى حاجة: كونتينر يقوم، أو ديسك يتفضّى، أو ملف يتعمل. بدل ما تكتب نفس الأمر كل ثانيتين، [[watch]] بيكرره لوحده.",
            how: R`[[watch]] بيشغّل الأمر، ويعرض ناتجه في الشاشة كلها، ويستنى، ويشغّله تاني ويحدّث الشاشة. و [[-n 2]] كل ثانيتين (الافتراضي ٢). وفي أول سطر بيكتب الأمر والوقت.

ولو الأمر فيه pipe أو علامات خاصة، حطه كله بين علامات تنصيص، عشان [[watch]] ياخده كامل. من غيرها الشيل هيفتكر الـ pipe بعد [[watch]] كله.

و [[-d]] بيعلّم على الحاجات اللي اتغيرت عن المرة اللي فاتت. و Ctrl+C للخروج.`,
            when: "بعد [[docker compose up]] تشوف الكونتينرات بتقوم. وانت بتمسح حاجات تتابع المساحة.",
            mistakes: "نسيان علامات التنصيص حوالين أمر فيه pipe."
          },
          lines: ["اعرض docker ps وحدّثه كل ثانيتين.", "مساحة الديسك كل ٥ ثواني. الأمر بين علامات تنصيص."],
          sol: R`[[watch -n 2 docker ps]] بيفتح شاشة بتتحدث كل ثانيتين، فوق [[Every 2.0s: docker ps]] والوقت. وانت بتعمل [[docker restart web]] من النافذة التانية، عمود STATUS بتاع web بيتغير لـ [[Up 1 second]] أو [[Up Less than a second]] (والأرقام بتبدأ تعدّ من الأول)، والباقيين زي ما هم.

ولو مع healthcheck هتشوف [[(health: starting)]] وبعدين [[(healthy)]]. ضيف [[-d]] عشان يعلّم على التغيير بلون. واخرج بـ [[Ctrl+C]].

الغلط الشائع: [[watch -n 5 df -h / | grep sda]] من غير تنصيص، فالـ grep بيتطبق على شاشة watch مش على الأمر. حط الأمر كله بين علامتين تنصيص: [[watch -n 5 "df -h / | grep sda"]].`
        },
        {
          cmd: "sha256sum",
          title: "اتأكد إن الملف سليم (hash)",
          desc: "الـ hash بصمة للملف: لو اتغير فيه حرف واحد البصمة كلها بتتغير. بتقارنها بالبصمة المنشورة في صفحة التحميل، أو تتأكد بيها إن الباك أب متبوّظش في النقل. [[-c]] بيقارن لوحده.",
          example: R`sha256sum backup.tar.gz
sha256sum backup.tar.gz > backup.sha256
sha256sum -c backup.sha256`,
          try: "اعمل بصمة لملف، عدّل فيه حرف، واعمل [[-c]] تاني.",
          deep: {
            why: "نقلت باك أب من السيرفر لجهازك، أو نزّلت برنامج. إزاي تتأكد إن الملف وصل سليم بالظبط، مش متبوّظ ولا حد عدّل فيه؟",
            how: R`[[sha256sum]] بيقرا الملف كله ويحسب منه «بصمة» (hash): رقم طويل بحروف وأرقام. وليه خاصيتين مهمين:

نفس الملف بيطلع دايمًا نفس البصمة، على أي جهاز.

لو بايت واحد بس اتغير في الملف، البصمة كلها بتتغير تمامًا، مش حرف أو اتنين. فمستحيل عمليًا تعدّل ملف وتخلي بصمته زي ما هي.

فلو حسبت البصمة على السيرفر، وبعدين على جهازك بعد النقل، والاتنين زي بعض، يبقى الملف وصل سليم 100٪.

و [[> backup.sha256]] بيحفظ البصمة في ملف جنب الباك أب. و [[-c]] بيقرا الملف ده ويحسب من جديد ويقارن، ويطبع [[OK]] أو [[FAILED]].

وده نفس اللي مواقع البرامج بتعمله: بتنشر البصمة جنب رابط التحميل.`,
            when: "بعد نقل باك أب مهم. قبل ما تسطّب برنامج نزّلته بإيدك. قبل ما ترجّع باك أب، تتأكد إنه سليم.",
            mistakes: "إنك تحسب البصمة بعد النقل بس، مش قبله كمان. لازم نسختين تقارنهم."
          },
          lines: ["احسب بصمة الملف.", "احفظ البصمة في ملف جنبه.", "بعدين: احسب تاني وقارن. هيطبع OK أو FAILED."],
          sol: R`[[sha256sum -c backup.sha256]] الأول بيطبع [[backup.tar.gz: OK]]. وبعد ما تعدّل حرف واحد في الملف بيطبع [[backup.tar.gz: FAILED]] و [[sha256sum: WARNING: 1 computed checksum did NOT match]] ويخرج بـ 1. جربتها بتغيير حرف واحد والبصمة اتغيرت كلها.

ده اللي يخليك تستخدمه في سكربت: [[sha256sum -c backup.sha256 || echo "الملف بايظ"]].

الغلط الشائع: [[No such file or directory]] و [[FAILED open or read]]: [[-c]] بيدوّر على الملف بالاسم اللي مكتوب جوه ملف الـ sha256، فلازم تشغّله من نفس الفولدر. ولو نقلت الملف لسيرفر تاني، انقل ملف الـ [[.sha256]] معاه.`
        },
        {
          cmd: "lsblk / mount",
          title: "ديسك إضافي أو ديسك كبّرته",
          desc: "لما تضيف volume من لوحة الاستضافة بيظهر كديسك فاضي (غالبًا [[sdb]] أو [[vdb]]، و [[lsblk -f]] بيوريك الأسامي). [[mkfs]] بيمسح الديسك كله، فاتأكد من الاسم مرتين. في fstab اكتب الـ UUID مش [[/dev/sdb]] لأن الأسامي ممكن تتغير، و [[nofail]] عشان السيرفر يقوم حتى لو الديسك مش موجود، و [[mount -a]] بيجرّب fstab قبل أي reboot. ولو كبّرت الديسك الأساسي من اللوحة: [[growpart]] يكبّر البارتيشن و [[resize2fs]] يكبّر الـ filesystem (صور كتير بتعملها لوحدها مع الـ reboot).",
          example: R`lsblk -f
df -hT
sudo mkfs.ext4 /dev/sdb
sudo mkdir -p /mnt/data
sudo mount /dev/sdb /mnt/data
sudo blkid /dev/sdb
echo 'UUID=PASTE-UUID /mnt/data ext4 defaults,nofail 0 2' | sudo tee -a /etc/fstab
sudo umount /mnt/data && sudo mount -a
sudo growpart /dev/sda 1 && sudo resize2fs /dev/sda1`,
          try: "ضيف volume صغير لسيرفر التجربة، اعمله mount على /mnt/data، واعمل reboot واتأكد بـ [[df -h]] إنه لسه متركّب.",
          flag: "danger",
          deep: {
            why: "السيرفر مساحته خلصت، أو عايز الداتا (قاعدة البيانات والباك أب) على ديسك منفصل تقدر تكبّره أو تنقله لسيرفر تاني.",
            how: R`في لينكس كل ديسك بيظهر كملف في [[/dev]]، ومفيش حاجة اسمها «D:». بتركّب (mount) الديسك على أي فولدر، ومن ساعتها أي حاجة تتكتب في الفولدر ده بتروح على الديسك ده.

الديسك الجديد فاضي خالص، فمحتاج [[mkfs]] يعمل عليه filesystem الأول، ودي بتحصل مرة واحدة بس. و [[mount]] بيركّبه للجلسة دي بس، و [[/etc/fstab]] هو اللي بيخليه يتركّب مع كل boot.

والتكبير: لما تكبّر الديسك من لوحة الاستضافة، المساحة الزيادة بتبقى موجودة بس مش مستخدمة. [[growpart]] بيمد البارتيشن عليها، و [[resize2fs]] بيخلي الـ filesystem يشوفها، والاتنين شغالين والسيرفر شغال.`,
            when: "الديسك قرّب يتملى. أو عايز تفصل الداتا عن النظام.",
            mistakes: "[[mkfs]] على الديسك الغلط، فتمسح النظام نفسه. بص على [[lsblk]] مرتين. وغلطة في fstab ممكن تمنع السيرفر يقوم، عشان كده [[nofail]] و [[mount -a]] قبل الـ reboot."
          },
          lines: [
            "كل الديسكات والبارتيشنات، ونوع الـ filesystem ([[-f]]) لو موجود.",
            "المساحة ونوع كل filesystem متركّب ([[-T]]).",
            "اعمل filesystem على الديسك الجديد. بيمسح أي حاجة عليه.",
            "اعمل الفولدر اللي هيتركّب عليه.",
            "ركّبه دلوقتي.",
            "اطبع الـ UUID بتاعه.",
            "ضيفه لـ fstab بالـ UUID عشان يتركّب مع كل boot، و [[nofail]] يمنع السيرفر يقف لو الديسك مش موجود.",
            "فك التركيب وجرّب fstab كله. لو فيه غلطة هتظهر هنا مش في الـ boot.",
            "بعد تكبير الديسك الأساسي من اللوحة: كبّر البارتيشن رقم 1، وبعدين الـ filesystem."
          ],
          sol: R`بعد الـ mount و reboot، [[df -h]] بيوري سطر زي [[/dev/sdb 9.8G 24K 9.3G 1% /mnt/data]]، و [[lsblk -f]] بيوري [[sdb ext4]] والـ UUID و [[/mnt/data]] في عمود MOUNTPOINTS.

الأهم قبل الـ reboot: [[sudo umount /mnt/data && sudo mount -a]] يخلص من غير أي رسالة، و [[findmnt /mnt/data]] يوريه متركّب. لو [[mount -a]] طبع error، صلّح [[/etc/fstab]] قبل الـ reboot.

ماعنديش ديسك إضافي هنا فمجربتهاش. الغلط الشائع: اسم الديسك مش [[sdb]] (على سيرفرات كتير [[vdb]] أو [[nvme1n1]])، فبص في [[lsblk]] الأول. والأخطر [[mkfs]] على الديسك الغلط بيمسح بياناته. ونسيان [[nofail]] بيخلّي السيرفر مايقومش لو الديسك اتشال.`
        },
        {
          cmd: "swap",
          title: "رام إضافية على الديسك",
          desc: "على السيرفرات الصغيرة الـ build ممكن يقع بـ out of memory، و swap بتحل ده. لاحظ [[sudo tee -a]]: [[sudo echo >> file]] مش هتشتغل، لأن [[>>]] بيتنفذ بصلاحياتك انت مش بصلاحيات sudo.",
          example: R`free -h
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
free -h`,
          try: "على سيرفر التجربة اعمل swap، واعمل reboot، واتأكد إنها لسه موجودة.",
          deep: {
            why: "السيرفرات الصغيرة (1GB رام) بتقع وقت الـ build أو تحت ضغط. البرنامج بيطلب رام مش موجودة، فلينكس بيقتله («Killed» أو out of memory). الـ swap رام «احتياطي» على الديسك.",
            how: R`الـ swap ملف على الديسك، لينكس بيستخدمه كأنه رام إضافية. لما الرام الحقيقية تتملى، بينقل حاجات مش مستخدمة دلوقتي من الرام للـ swap، ويفضّي مكان.

والديسك أبطأ من الرام بمراحل، فالـ swap مش بديل عن رام، هو شبكة أمان: بدل ما البرنامج يتقتل، بيبطأ شوية.

الخطوات: [[fallocate]] بيحجز ملف بحجم 2G. [[chmod 600]] لأن الملف ده ممكن يبقى فيه بيانات من الرام (باسوردات مثلًا)، فمحدش غير root يقراه. [[mkswap]] بيجهّزه كـ swap. [[swapon]] بيشغّله دلوقتي.

بس بعد الريستارت، هيتنسي. السطر في [[/etc/fstab]] (ملف بيقول للسيستم إيه اللي يتشغّل مع كل boot) بيخليه يشتغل دايمًا. ولاحظ [[tee -a]] بدل [[>>]] عشان الملف محتاج sudo.`,
            when: "على أي سيرفر رامه ٢ جيجا أو أقل. قبل ما يقع أول build.",
            mistakes: "إنك تعتمد على الـ swap بدل ما ترقّي الرام لو السيرفر محتاج فعلًا، فكل حاجة تبقى بطيئة. ونسيان سطر fstab. وغلطة في fstab ممكن تمنع السيرفر يقوم، فانسخ السطر بالظبط."
          },
          lines: [
            "شوف الرام والـ swap دلوقتي.",
            "احجز ملف ٢ جيجا للـ swap.",
            "خلّي root بس اللي يقراه.",
            "جهّزه كـ swap.",
            "شغّله دلوقتي.",
            "ضيف سطر في fstab عشان يشتغل بعد كل ريستارت.",
            "اتأكد إن الـ swap ظهر."
          ],
          sol: R`بعد الخطوات، [[free -h]] بيوري سطر [[Swap: 2.0Gi 0B 2.0Gi]] بدل [[Swap: 0B 0B 0B]]، و [[swapon --show]] بيوري [[/swapfile file 2G 0B -2]]. جربت نفس الخطوات بملف صغير 64 ميجا: [[mkswap]] طبع [[Setting up swapspace version 1, size = 64 MiB]] و [[free -h]] بقى فيه Swap، وبعدين شلته بـ [[swapoff]].

وبعد الـ reboot نفس السطر في [[free -h]] لسه موجود، بسبب السطر في [[/etc/fstab]].

الأغلاط الشائعة: [[swapon: /swapfile: insecure permissions 0644]]: نسيت [[chmod 600]]. و [[fallocate failed: Operation not supported]] على بعض الـ filesystems؛ استخدم [[dd if=/dev/zero of=/swapfile bs=1M count=2048]]. وماتضيفش السطر في fstab مرتين (لو كررت الأمر)، اتأكد بـ [[grep swap /etc/fstab]].`
        }
      ]
    },
    {
      t: "المراقبة والتنبيهات",
      l: 3,
      n: "تعرف إن الديسك قرّب يتملى قبل ما الموقع يقع، من سكربت Telegram صغير لحد Grafana",
      items: [
        {
          cmd: "تنبيه Telegram",
          title: "سكربت يبعتلك لما الديسك أو الرام يعدّوا حد",
          desc: R`أبسط مراقبة تنفع لـ VPS واحد: سكربت كل ٥ دقايق من cron، بيقرا نسبة الديسك والرام، ولو عدّوا الحد يبعت رسالة على Telegram. وبيبعت مرة واحدة لما المشكلة تبدأ، ومرة لما ترجع طبيعية، مش كل ٥ دقايق.

تعمل bot من [[@BotFather]] في Telegram وتاخد الـ token، وتبعتله أي رسالة، وبعدين [[curl https://api.telegram.org/botTOKEN/getUpdates]] يوريك [[chat.id]] بتاعك. الاتنين في ملف [[/etc/server-alert.env]] بصلاحية 600.`,
          example: R`#!/usr/bin/env bash
set -euo pipefail
source /etc/server-alert.env
HOST=$(hostname)
DISK=$(df --output=pcent / | tail -1 | tr -dc '0-9')
RAM=$(free | awk '/^Mem:/ {printf "%d", ($2 - $7) * 100 / $2}')
send() {
  curl -fsS -m 10 "https://api.telegram.org/bot$TG_TOKEN/sendMessage" \
    -d chat_id="$TG_CHAT" --data-urlencode text="$1" > /dev/null
}
check() {
  local name=$1 value=$2 limit=$3 state=/var/tmp/alert-$1
  if (( value >= limit )); then
    [[ -f $state ]] || { send "ALERT $HOST: $name $value% (limit $limit%)"; touch "$state"; }
  elif [[ -f $state ]]; then
    send "OK $HOST: $name back to $value%"; rm -f "$state"
  fi
}
check disk "$DISK" 85
check ram "$RAM" 90`,
          try: R`احفظ السكربت في [[/usr/local/bin/server-alert.sh]] واعمله [[chmod +x]]، وحط الـ token والـ chat id في الملف. شغّله مرة بحد ديسك أقل من النسبة الحالية (مثلًا 10) وتأكد إن الرسالة وصلت، وشغّله تاني وتأكد إنها موصلتش تاني. وبعدين رجّع الحد 85 وحطه في crontab كل ٥ دقايق.`,
          flag: "script",
          deep: {
            why: R`أشهر سببين لوقوع موقع على VPS: الديسك اتملى (لوجات، أو صور Docker، أو باك أب بيتراكم)، والرام خلصت والـ OOM killer قتل التطبيق. تاب التشخيص بيعلّمك تصلّحهم بعد ما يحصلوا («الديسك اتملى» و «الرام خلصت»). التنبيه على ٨٥٪ بيحوّلهم لصيانة عادية تعملها وانت مرتاح بدل ما العميل يكلّمك.`,
            how: R`[[df --output=pcent /]] بيطبع نسبة استخدام الـ root بس، و [[tr -dc '0-9']] بيشيل أي حاجة مش رقم (المسافات وعلامة ٪) فيفضل رقم تقارنه.

الرام: [[free]] سطر [[Mem:]] فيه total في العمود التاني و available في السابع. المهم available مش free: لينكس بيستخدم الرام الفاضية كـ cache، فـ free دايمًا قليل وده طبيعي. المستخدم فعلًا = total ناقص available.

[[send]] بتكلّم Bot API بـ [[sendMessage]]. و [[--data-urlencode]] عشان الرسالة فيها مسافات و [[%]]. و [[-m 10]] حد أقصى ١٠ ثواني عشان السكربت ميعلقش لو Telegram مش بيرد. و [[-f]] مع [[set -e]] معناها لو الإرسال فشل، السكربت يقف قبل ما يعمل ملف الحالة، فيحاول تاني بعد ٥ دقايق.

ملف الحالة في [[/var/tmp]] هو اللي بيمنع الإزعاج: أول مرة الرقم يعدّي الحد بيبعت ويعمل الملف. طول ما الملف موجود مش بيبعت تاني. ولما الرقم ينزل، يبعت OK ويمسح الملف. ده أهم جزء، من غيره هتوصلك رسالة كل ٥ دقايق لحد ما تعمل mute للبوت، وساعتها التنبيه مالوش لازمة.

وفي crontab: [[*/5 * * * * /usr/local/bin/server-alert.sh >> /var/log/server-alert.log 2>&1]]، أو timer (في قسم cron).`,
            when: "أول يوم على أي VPS فيه موقع حقيقي، حتى قبل أي حاجة أكبر. ولما السيرفرات تبقى أكتر من اتنين أو محتاج تاريخ ورسومات، انقل لـ Grafana أو Beszel.",
            mistakes: R`تحسب الرام من عمود free فتلاقيها ٩٥٪ طول الوقت وتفتكر فيه مشكلة. وتبعت كل ٥ دقايق من غير ملف حالة، فتتجاهل البوت بعد يوم. والـ token جوه السكربت نفسه، والسكربت في repo على GitHub. وسكربت المراقبة محتاج السيرفر يبقى شغال عشان يبعت، فلو السيرفر وقع خالص مش هتعرف منه: ده محتاج فحص من بره (الدرس الأخير في القسم).`
          },
          lines: [
            "اقف عند أي خطأ، أو متغير مش متعرّف، أو فشل في pipe.",
            "اقرا TG_TOKEN و TG_CHAT من ملف بره السكربت.",
            "اسم السيرفر عشان تعرف الرسالة جاية منين.",
            "نسبة استخدام الـ root كرقم بس.",
            "نسبة الرام المستخدمة فعلًا: (total - available) / total.",
            "فانكشن الإرسال:",
            "اطلب sendMessage من Telegram، بحد ١٠ ثواني.",
            "ابعت الـ chat id والرسالة (متشفّرة للـ URL)، واسكت عن الرد.",
            "آخر الفانكشن.",
            "فانكشن الفحص: الاسم والقيمة والحد.",
            "متغيرات محلية، وملف حالة لكل مقياس.",
            "لو القيمة وصلت الحد أو عدّته:",
            "لو مبعتناش قبل كده: ابعت واعمل ملف الحالة.",
            "ولو نزلت تحت الحد وكنا باعتين تنبيه:",
            "ابعت إنها رجعت، وامسح ملف الحالة.",
            "آخر الـ if.",
            "آخر الفانكشن.",
            "افحص الديسك على ٨٥٪.",
            "وافحص الرام على ٩٠٪."
          ],
          sol: R`بحد 10 للديسك: الرسالة بتوصل على Telegram زي [[ALERT vps1: disk 61% (limit 10%)]]، والملف [[/var/tmp/alert-disk]] اتعمل. التشغيل التاني مبيبعتش حاجة.

لما ترجّع الحد 85 وتشغّله: بتوصلك [[OK vps1: disk back to 61%]] والملف بيتمسح. ده معناه إن التنبيه ورجوعه شغالين.

لو [[curl: (22) The requested URL returned error: 400]]: [[chat_id]] غلط، و Telegram بيرد «chat not found» (لازم تكون بعت للبوت رسالة الأول). لو [[error: 401]]: الـ token غلط. ولو مفيش رسالة ومفيش خطأ: ملف الحالة [[/var/tmp/alert-disk]] موجود من تشغيل قبل كده، امسحه وجرّب تاني. ولو [[TG_TOKEN: unbound variable]]: الملف مش بيتقري أو الاسم فيه غلطة.

وفي crontab بعد كده، [[grep CRON /var/log/syslog]] بيأكد إنه بيشتغل كل ٥ دقايق، و [[/var/log/server-alert.log]] المفروض يفضل فاضي طول ما مفيش أخطاء.`,
          solCode: R`sudo tee /etc/server-alert.env > /dev/null <<'EOF'
TG_TOKEN=123456789:AA...your-bot-token
TG_CHAT=123456789
EOF
sudo chmod 600 /etc/server-alert.env
sudo nano /usr/local/bin/server-alert.sh
sudo chmod +x /usr/local/bin/server-alert.sh
sudo sed -i 's/check disk "$DISK" 85/check disk "$DISK" 10/' /usr/local/bin/server-alert.sh
sudo /usr/local/bin/server-alert.sh
sudo /usr/local/bin/server-alert.sh
sudo sed -i 's/check disk "$DISK" 10/check disk "$DISK" 85/' /usr/local/bin/server-alert.sh
sudo /usr/local/bin/server-alert.sh
sudo crontab -e
# */5 * * * * /usr/local/bin/server-alert.sh >> /var/log/server-alert.log 2>&1`
        },
        {
          cmd: "node_exporter و Grafana",
          title: "رسومات لكل حاجة على السيرفر",
          desc: R`الستاك المعروف: [[node_exporter]] بيطلّع أرقام السيرفر (CPU ورام وديسك وشبكة)، و [[cAdvisor]] أرقام كل container، و [[Prometheus]] بيجمعهم كل ٣٠ ثانية ويخزّنهم، و [[Grafana]] بيرسمهم ويبعت التنبيهات.

كلهم في compose واحد. و Grafana على [[127.0.0.1]] بس، وتفتحه من جهازك بنفق SSH: [[ssh -L 3000:localhost:3000 deploy@vps]] وبعدين [[http://localhost:3000]].`,
          example: R`services:
  prometheus:
    image: prom/prometheus:v3.13.4
    command: [--config.file=/etc/prometheus/prometheus.yml, --storage.tsdb.retention.time=15d]
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml:ro
      - prom-data:/prometheus
    restart: unless-stopped
  node-exporter:
    image: prom/node-exporter:v1.12.1
    command: [--path.rootfs=/host]
    pid: host
    volumes: ["/:/host:ro,rslave"]
    restart: unless-stopped
  cadvisor:
    image: ghcr.io/google/cadvisor:v0.60.6
    privileged: true
    devices: [/dev/kmsg]
    volumes: ["/:/rootfs:ro", "/var/run:/var/run:ro", "/sys:/sys:ro", "/var/lib/docker:/var/lib/docker:ro"]
    restart: unless-stopped
  grafana:
    image: grafana/grafana:13.2
    ports: ["127.0.0.1:3000:3000"]
    volumes: [grafana-data:/var/lib/grafana]
    restart: unless-stopped
volumes:
  prom-data:
  grafana-data:`,
          try: R`شغّل الستاك على سيرفر التجربة ومعاه [[prometheus.yml]] اللي في الحل. افتح Grafana بالنفق، وضيف data source نوعه Prometheus على [[http://prometheus:9090]]، واعمل Import لـ dashboard رقم 1860 (Node Exporter Full).`,
          flag: "script",
          deep: {
            why: R`السكربت بيقولك «الديسك ٨٦٪ دلوقتي». بس مش بيقولك الديسك بيزيد قد إيه في اليوم، ولا الرام بدأت تعلى من أنهي deploy، ولا أنهي container هو اللي واكلها. الرسومات والتاريخ بيجاوبوا على «من إمتى؟» و «مين؟»، ودول أول سؤالين في أي مشكلة.`,
            how: R`Prometheus بيشتغل بالـ pull: كل ٣٠ ثانية بيروح لكل target في [[prometheus.yml]] ويطلب [[/metrics]]، ويخزن الأرقام بتاريخها. [[retention.time=15d]] يمسح الأقدم من ١٥ يوم عشان ميملاش الديسك اللي بيراقبه.

node_exporter جوه container بيشوف ديسك الـ container مش السيرفر، عشان كده بنركّب [[/]] بتاع السيرفر على [[/host]] للقراية بس، و [[--path.rootfs=/host]] بيقوله اقرا من هناك. و [[pid: host]] عشان يشوف عمليات السيرفر. أرقام الشبكة هتبقى بتاعة الـ container، ولو محتاجها بجد: [[network_mode: host]] وتغيّر الـ target.

cAdvisor بيقرا Docker و cgroups، فمحتاج الفولدرات دي و [[privileged]]. وهو اللي بيقولك الرام والـ CPU لكل container بالاسم.

ولا خدمة فيهم فاتحة بورت للنت غير Grafana، وعلى localhost بس. Prometheus بيوصل للاتنين التانيين بالاسم على شبكة compose.

الـ dashboard 1860 جاهز ومعروف لـ node_exporter، وفيه dashboards جاهزة لـ cAdvisor برضه. متبدأش ترسم من الصفر.`,
            when: R`أكتر من سيرفر، أو عايز تاريخ وتقارن قبل وبعد deploy، أو شغال في فريق. ولو ده كتير على VPS صغير: Netdata سكربت تسطيب واحد وبيطلّع رسومات وتنبيهات جاهزة، و Beszel أخف بكتير (hub صغير و agent على كل سيرفر) وفيه تنبيهات ديسك ورام و containers. الستاك ده بياكل حوالي نص جيجا رام، فعلى VPS بجيجا واحد يبقى تقيل.`,
            mistakes: R`تفتح Grafana على [[3000:3000]] من غير 127.0.0.1، و Docker بيعدّي من ufw (شوف تاب Docker)، فلوحة فيها كل تفاصيل السيرفر بقت على النت بباسورد admin/admin الافتراضي. وتسيب Prometheus من غير retention فيملا الديسك. وتعمل node_exporter من غير [[--path.rootfs]]، فتراقب ديسك الـ container وتلاقيه دايمًا فاضي. وتحط الستاك على نفس السيرفر وتعتمد عليه لوحده: لو السيرفر وقع، المراقبة وقعت معاه.`
          },
          lines: [
            "الخدمات.",
            "Prometheus: بيجمع الأرقام ويخزنها.",
            "نسخة محددة.",
            "ملف الإعداد، واحفظ آخر ١٥ يوم بس.",
            "الفولدرات:",
            "ملف الإعداد من السيرفر، قراية بس.",
            "البيانات نفسها على volume.",
            "يقوم لوحده مع السيرفر.",
            "node_exporter: أرقام السيرفر نفسه.",
            "نسخة محددة.",
            "اقرا الديسك والـ proc من السيرفر المركّب على /host.",
            "شوف عمليات السيرفر مش الـ container بس.",
            "ركّب / بتاع السيرفر قراية بس.",
            "يقوم لوحده.",
            "cAdvisor: أرقام كل container.",
            "الصورة من ghcr.",
            "محتاج صلاحيات عشان يقرا cgroups.",
            "ولوج الكيرنل.",
            "الفولدرات اللي بيقرا منها Docker والـ containers.",
            "يقوم لوحده.",
            "Grafana: الرسومات والتنبيهات.",
            "نسخة 13.2.",
            "البورت على localhost بس، وتفتحه بنفق SSH.",
            "الإعدادات والـ dashboards على volume.",
            "يقوم لوحده.",
            "الـ volumes:",
            "بيانات Prometheus.",
            "بيانات Grafana."
          ],
          sol: R`[[docker compose ps]] بيوري الأربع خدمات Up. وفي Prometheus، [[docker compose exec prometheus wget -qO- localhost:9090/api/v1/targets]] (أو صفحة Status ثم Targets) بيوري الـ targets الاتنين [[up]].

في Grafana: أول دخول admin و admin، وبيطلب باسورد جديدة. بعد ما تضيف الـ data source، زرار «Save & test» بيقول إنه اتصل. وبعد Import لـ 1860 واختيار الـ data source: رسومات CPU و RAM و Disk بأرقام قريبة من [[free -h]] و [[df -h]] على السيرفر.

لو target واقف: [[context deadline exceeded]] أو [[no such host]] يعني اسم الخدمة في prometheus.yml مش زي compose. ولو الديسك في Grafana صغير ومش زي df: node_exporter من غير [[--path.rootfs]].`,
          solCode: R`# prometheus.yml جنب compose.yml
global:
  scrape_interval: 30s
scrape_configs:
  - job_name: node
    static_configs:
      - targets: ["node-exporter:9100"]
  - job_name: cadvisor
    static_configs:
      - targets: ["cadvisor:8080"]`
        },
        {
          cmd: "Grafana alert rules",
          title: "قاعدة تنبيه: query وحد ومدة",
          desc: R`قاعدة التنبيه في Grafana: query بـ PromQL، وحد (Threshold)، ومدة (Pending period) لازم الحالة تفضل فيها قبل ما يبعت. وبتروح لـ contact point نوعه Telegram (نفس الـ bot token والـ chat id).

المدة هي اللي بتفرق التنبيه المفيد من الإزعاج: CPU ١٠٠٪ لمدة ٣٠ ثانية طبيعي، ولمدة ١٠ دقايق مشكلة.`,
          example: R`# الديسك: Threshold IS ABOVE 85، و Pending period 10m
100 * (1 - node_filesystem_avail_bytes{mountpoint="/"} / node_filesystem_size_bytes{mountpoint="/"})
# الديسك هيخلص خلال ٢٤ ساعة بالمعدل ده: IS BELOW 0، و 30m
predict_linear(node_filesystem_avail_bytes{mountpoint="/"}[6h], 24 * 3600)
# الرام: IS ABOVE 90، و 10m
100 * (1 - node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes)
# container اتعمله restart في آخر ١٥ دقيقة: IS ABOVE 0
changes(container_start_time_seconds{name!=""}[15m])
# Prometheus مش قادر يوصل لـ target: IS BELOW 1، و 5m
up`,
          try: R`في Grafana اعمل contact point نوعه Telegram واضغط Test. وبعدين اعمل قاعدة الديسك بحد أقل من النسبة الحالية ومدة 1m، واستنى الرسالة، ورجّع الحد 85 واستنى رسالة resolved.`,
          deep: {
            why: "Grafana فيه كل الأرقام، بس محدش بيقعد يبص على dashboard طول اليوم. القاعدة هي اللي بتحوّل الرقم لرسالة، والصعب مش إنك تعملها، الصعب إنك تختار الحد والمدة صح فالرسالة تيجي لما يبقى فيه حاجة تتعمل بس.",
            how: R`من Alerting ثم Alert rules ثم New alert rule: بتكتب الـ query وتختار Prometheus، وبعدها Reduce (آخر قيمة) و Threshold (أكبر من 85 مثلًا). وبعدين folder و evaluation group بـ interval (كل قد إيه يتحسب، دقيقة كفاية)، و Pending period. وفي الآخر contact point أو notification policy.

الديسك: [[avail / size]] نسبة الفاضي، و [[1 -]] يقلبها للمستخدم. و [[mountpoint="/"]] عشان متحسبش tmpfs والـ overlay بتاعة Docker.

[[predict_linear]] أذكى من أي نسبة: بياخد آخر ٦ ساعات، ويرسم خط، ويقولك الفاضي هيبقى كام بعد ٢٤ ساعة. لو أقل من صفر يبقى الديسك هيتملى بكرة، حتى لو هو ٦٠٪ دلوقتي (لوج بيكبر بسرعة مثلًا). وسيرفر ثابت على ٨٨٪ من شهور مش هيصحّيك.

الرام: available زي السكربت، مش free.

[[changes(container_start_time_seconds)]] من cAdvisor: وقت بداية الـ container اتغير يعني اتعمله restart، والـ restart policy بتخبّي إن التطبيق بيقع كل شوية.

[[up]] رقم Prometheus بيحطه لكل target: 1 لو رد و 0 لو لأ. [[up == 0]] يعني المراقبة نفسها عمياء.

وفي notification policy: [[Group wait]] و [[Repeat interval]] (مثلًا ٤ ساعات) بيحددوا بيكرر التنبيه كل قد إيه لو لسه مصلحتوش، بدل كل دقيقة.`,
            when: "بعد ما الستاك يشتغل على طول. ابدأ بالخمسة دول بس، وزوّد لما تحصل مشكلة معرفتهاش من التنبيهات.",
            mistakes: R`Pending period صفر، فكل spike ثانيتين يبقى رسالة. و Repeat interval قصير، فنفس التنبيه كل ٥ دقايق طول الليل. وحد ٧٠٪ للديسك على سيرفر عادي بيبقى ٧٥٪، فيفضل firing طول الوقت ومحدش بيبص عليه. ونسيان [[mountpoint]]، فالقاعدة تعمل alert لكل tmpfs. وتنسى تختبر الـ contact point بـ Test، فأول مرة تعرف إنه مش شغال هي وقت المشكلة الحقيقية.`
          },
          lines: [
            "نسبة الديسك المستخدمة على / (١ ناقص نسبة الفاضي).",
            "الفاضي هيبقى كام بعد ٢٤ ساعة، حسب آخر ٦ ساعات.",
            "نسبة الرام المستخدمة فعلًا (available مش free).",
            "عدد مرات الـ restart لكل container ليه اسم في آخر ١٥ دقيقة.",
            "كل target: 1 لو Prometheus وصله، 0 لو لأ."
          ],
          sol: R`Test في الـ contact point بيبعت رسالة تجربة على Telegram على طول. لو موصلتش: الـ chat id أو الـ token غلط، و Grafana بيطلّع الخطأ تحت الزرار.

بعد ما تعمل القاعدة بحد واطي: حالتها في صفحة Alert rules بتبقى Normal، وبعدين Pending لمدة الـ pending period، وبعدين Firing، والرسالة بتوصل وفيها اسم القاعدة والقيمة.

ولما ترجّع الحد 85: بعد التقييم الجاي بترجع Normal، وبتوصلك رسالة فيها [[RESOLVED]].

لو فضلت Normal ومش بتتحرك: جرّب الـ query في Explore الأول، لو مفيش نتيجة يبقى الـ mountpoint عندك مختلف (شوف [[node_filesystem_size_bytes]] لوحده في Explore).`
        },
        {
          cmd: "أعراض مش أسباب",
          title: "نبّه على اللي اليوزر حاسس بيه",
          desc: R`العَرَض: «الموقع مش بيفتح» أو «بطيء» أو «الباك أب مشتغلش امبارح». السبب: «CPU عالي» أو «container عمل restart». التنبيه اللي يصحّيك لازم يبقى على عَرَض، والأسباب تبص عليها في الرسومات لما تحقق.

وأهم عَرَضين لـ VPS واحد محتاجين حد من بره السيرفر: فحص للموقع كل دقيقة، وإشارة «أنا خلصت» من كل مهمة مجدولة (dead man's switch)، لو موصلتش في ميعادها يجيلك تنبيه.`,
          example: R`# فحص من بره: Uptime Kuma على سيرفر تاني، أو خدمة زي UptimeRobot أو Better Stack
curl -fsS -m 10 -o /dev/null -w "%{http_code} %{time_total}s\n" https://example.com/health
# الباك أب يبعت ping بس لو نجح، والخدمة تنبّهك لو معداش في ميعاده:
0 3 * * * /home/deploy/backup.sh && curl -fsS -m 10 --retry 3 https://hc-ping.com/YOUR-UUID > /dev/null
# أو بدل السطر اللي فوق (مش معاه، وإلا الباك أب يشتغل مرتين): ابعت exit code السكربت، 0 نجاح وأي رقم تاني fail:
0 3 * * * /home/deploy/backup.sh; curl -fsS -m 10 --retry 3 https://hc-ping.com/YOUR-UUID/$? > /dev/null`,
          try: R`راجع كل تنبيه عندك واسأل: «لو الرسالة دي جت الساعة ٣ الفجر، هقوم أعمل حاجة؟» اللي إجابته لأ شيله أو حوّله لـ dashboard. وبعدين ضيف فحص من بره لـ [[/health]]، و ping بعد الباك أب على healthchecks.io (فيه خطة مجانية).`,
          deep: {
            why: R`الغلطة المعروفة: تعمل تنبيه لكل رقم، CPU و load و swap و كل container. أول أسبوع بتوصلك ٥٠ رسالة، ٤٨ منهم مالهمش لازمة، فتعمل mute. والأسبوع اللي بعده الموقع يقع فعلًا، والرسالة الصح موجودة وسط الـ ٥٠ ومحدش شافها. ده اسمه alert fatigue، وهو أخطر من إن مفيش تنبيهات، لأنك فاكر نفسك متغطي.`,
            how: R`قاعدة Google SRE المشهورة: نبّه على الأعراض اللي اليوزر حاسس بيها، مش على الأسباب. CPU ٩٥٪ والموقع بيرد في ٢٠٠ms؟ مفيش مشكلة، السيرفر بيشتغل. CPU ٣٠٪ والموقع بيرجّع 502؟ دي مشكلة، ومفيش قاعدة CPU كانت هتمسكها.

الاستثناء: أسباب هتبقى عَرَض قريب ومؤكد، زي الديسك هيتملى خلال ٢٤ ساعة. دي تستاهل تنبيه لأن فيه حاجة واضحة تتعمل قبل ما اليوزر يحس.

الفحص من بره: لو السيرفر نفسه وقع، أي حاجة شغالة عليه (سكربت أو Grafana) وقعت معاه ومش هتبعت. فحص من مكان تاني بيمسك الحالة دي، وبيقيس اللي اليوزر شايفه فعلًا: DNS وشهادة و Nginx والتطبيق مع بعض. [[/health]] الكويس بيلمس قاعدة البيانات، مش بيرجّع 200 وخلاص.

الـ dead man's switch: خدمة زي healthchecks.io بتديك رابط، ومهمتك بتطلبه لما تخلص بنجاح. انت بتقولها «المفروض يوصلك ping كل ٢٤ ساعة»، ولو موصلش (السكربت فشل، أو cron واقف، أو السيرفر مقفول) هي اللي تبعتلك. ده بيمسك كل أسباب «الباك أب مشتغلش» مرة واحدة، حتى اللي عمرك ما فكرت فيها. و [[&&]] معناها الـ ping مش هيتبعت لو السكربت رجع خطأ.

وكل تنبيه لازم يبقى: حاجة بتأثر على اليوزر أو هتأثر قريب، وليها خطوة واضحة تعملها، ومش بتتكرر من غير سبب. واللي مش كده مكانه dashboard.`,
            when: "أول ما تحط أي تنبيهات، وكل ما تلاقي نفسك بتتجاهل رسالة. وفي الانترفيو سؤال «إزاي بتراقب السيستم؟» الإجابة القوية بتبدأ من الأعراض (الـ uptime و الأخطاء و الوقت) مش من CPU.",
            mistakes: R`كل المراقبة على نفس السيرفر اللي بتراقبه. وتنبيه على CPU و load اللي بيطلعوا ويرجعوا لوحدهم. وفحص [[/health]] بيرجّع 200 حتى والقاعدة واقعة. و ping الباك أب في الأول بدل الآخر، أو بـ [[;]] بدل [[&&]] على الرابط العادي (من غير [[/$?]])، فبيتبعت نجاح حتى لو الباك أب فشل. وكل التنبيهات بنفس الأهمية: خلي الموقع واقع على قناة بصوت، والديسك ٨٥٪ على قناة تشوفها الصبح.`
          },
          lines: [
            "قيس الموقع زي اليوزر: الـ status والوقت، وافشل لو مردش في ١٠ ثواني.",
            "كل يوم ٣ الفجر: الباك أب، ولو نجح بس ابعت ping (بـ [[&&]]).",
            "أو بداله: ابعت exit code السكربت، فلو فشل يبقى fail صريح والتنبيه ييجي على طول من غير ما يستنى الميعاد."
          ],
          sol: R`مثال لقايمة بعد المراجعة على VPS فيه موقع واحد:

يصحّيك: الموقع مش بيرد أو بيرجّع 5xx لمدة دقيقتين (فحص من بره). الباك أب مبعتش ping في ميعاده. الديسك هيتملى خلال ٢٤ ساعة.

تشوفه الصبح: الديسك فوق ٨٥٪. الرام فوق ٩٠٪ لمدة ١٠ دقايق. container بيعمل restart. الشهادة فاضلها أقل من ١٤ يوم.

مكانه dashboard بس: CPU، و load، و swap، والشبكة.

على healthchecks.io: الـ check بيبقى «new» لحد أول ping، وبعد ما السكربت يخلص بـ exit 0 بيبقى «up» وجنبه وقت آخر ping. ولو شغّلت [[false && curl ...]] مفيش ping بيتبعت، وبعد الـ period والـ grace بيبقى «down» ويبعتلك. ولو قلت «كل حاجة تصحّيني»، ارجع للسؤال: هقوم أعمل إيه الساعة ٣ الفجر عشان CPU ٩٠٪؟`
        }
      ]
    },
    {
      t: "استضافة مشتركة (cPanel / Hostinger)",
      l: 3,
      n: "مفيش root ولا Docker: SSH و git و PHP و .htaccess، ولوحة التحكم للباقي",
      items: [
        {
          cmd: "ssh 'git pull'",
          title: "deploy بسطر واحد على استضافة مشتركة",
          desc: "على الاستضافة المشتركة مفيش Docker ولا CI، بس غالبًا فيه SSH و git. السيرفر نفسه عامل clone للريبو جوه فولدر الموقع، فالـ deploy كله [[git pull]] من جهازك عن طريق ssh، وبعدها تقارن آخر commit هناك باللي عندك. و [[~/.ssh/config]] بيحفظ البورت واليوزر والمفتاح في اسم قصير.",
          example: R`# ~/.ssh/config على جهازك
Host shared
    HostName 203.0.113.10
    Port 65002
    User deploy
    IdentityFile ~/.ssh/id_ed25519
ssh shared 'cd ~/domains/example.com/public_html && git pull -q origin main && git log --oneline -1'
git log --oneline -1`,
          try: "اعمل commit صغير (تعديل نص في الصفحة)، ادفعه، وشغّل سطر الـ ssh. الـ hash اللي راجع لازم يطابق [[git log --oneline -1]] عندك.",
          deep: {
            why: "رفع الملفات بالـ File Manager أو FTP بطيء، وسهل تنسى ملف، ومفيش رجوع. git على السيرفر بيخلي الـ deploy أمر واحد، وتعرف بالظبط أنهي نسخة شغالة، والرجوع [[git checkout]] لـ commit قديم.",
            how: R`أول مرة بس: فعّل SSH من لوحة الاستضافة (غالبًا على بورت غير 22 زي 65002)، وضيف المفتاح العام بتاعك فيها. على السيرفر اعمل مفتاح ([[ssh-keygen -t ed25519]]) وحطه في GitHub كـ Deploy Key للقراية بس، وبعدين [[git clone]] جوه [[public_html]] (لازم يكون فاضي).

[[Host shared]] في [[~/.ssh/config]]: بعدها [[ssh shared]] بدل [[ssh -p 65002 deploy@203.0.113.10]].

السطر نفسه: [[cd]] للفولدر، و [[git pull -q]] بهدوء، و [[git log --oneline -1]] يطبع آخر commit هناك. [[&&]] بيضمن إن لو الـ pull فشل مفيش حاجة بعده تتنفذ. والعلامات المفردة حوالين الأمر عشان يتنفذ كله على السيرفر مش عندك.

الملفات اللي مش في git (ملف الإعدادات، والصور اللي العملاء رفعوها، والفيديوهات) بتتظبط على السيرفر بإيدك مرة واحدة ومبتتلمسش من الـ pull. وقاعدة البيانات ليها باك أب منفصل من اللوحة.

بعد الـ pull: [[php -l]] على الملفات المهمة، و smoke test بـ curl (الدروس اللي بعده، وتاب التشخيص).`,
            when: "أي موقع PHP أو static على استضافة مشتركة فيها SSH.",
            mistakes: "في مشروع حقيقي الاتصال كان عن طريق سكربت Python وسيط شايل الباسورد بدل مفتاح SSH مباشر. وحد يعدّل ملف من File Manager على السيرفر فالـ pull يفشل بـ [[Your local changes would be overwritten]]؛ اعمل [[git status]] هناك، واعمل التعديل في الريبو مش على السيرفر. والأخطر: فولدر [[.git]] جوه [[public_html]] مكشوف للنت لو مش مقفول (درس .htaccess)."
          },
          lines: [
            "اسم مختصر للسيرفر.",
            "العنوان.",
            "بورت SSH بتاع الاستضافة.",
            "اليوزر.",
            "المفتاح.",
            "على السيرفر: ادخل الفولدر، اسحب آخر نسخة، واطبع آخر commit.",
            "آخر commit عندك: لازم يطابق."
          ],
          sol: R`سطر الـ ssh بيطبع (بسبب [[-q]]) سطر واحد بس من [[git log --oneline -1]] على السيرفر، زي [[a1b2c3d fix: header text]]. و [[git log --oneline -1]] عندك بيطبع نفس السطر بالظبط، نفس الـ hash ونفس الرسالة. ده دليل إن السيرفر عليه آخر نسخة.

وبعد ريفريش للموقع (Ctrl+F5) التعديل ظاهر.

الأغلاط الشائعة: الـ hash مختلف: نسيت [[git push]] قبل الـ ssh. و [[error: Your local changes to the following files would be overwritten by merge]]: حد عدّل ملف على السيرفر بإيده. و [[Host key verification failed]] أو [[Permission denied]]: البورت (Hostinger مثلًا [[65002]]) أو اليوزر في [[~/.ssh/config]] غلط.`
        },
        {
          cmd: "php -l",
          title: "فحص أخطاء syntax في PHP من غير تشغيل",
          desc: "[[php -l]] بيقرا الملف ويتأكد إن مفيهوش غلطة syntax من غير ما ينفذه. على الاستضافة المشتركة غلطة واحدة في ملف متضمّن في كل الصفحات معناها الموقع كله صفحة بيضا أو 500. شغّله قبل الـ push، وبعد الـ pull على السيرفر نفسه عشان نسخة PHP هناك.",
          example: R`php -l index.php
for f in index.php login.php contact.php; do php -l "$f" | tail -1; done
find . -name "*.php" -not -path "./vendor/*" -exec php -l {} \; | grep -v "No syntax errors"
ssh shared 'cd ~/domains/example.com/public_html && php -v | head -1 && php -l index.php'`,
          try: "امسح [[;]] من سطر في ملف PHP وشغّل [[php -l]] عليه: هيقولك رقم السطر. وبعدين قارن [[php -v]] عندك وعلى السيرفر.",
          deep: {
            why: "على الاستضافة المشتركة مفيش لوج قدامك وقت الـ deploy، وغالبًا [[display_errors]] مقفول. فالغلطة بتبان للزوار قبلك. [[php -l]] بيمسكها في ثانية.",
            how: R`[[-l]] يعني lint: PHP بيعمل parse للملف بس. لو سليم يطبع [[No syntax errors detected]]، ولو لأ يطبع الغلطة ورقم السطر ويرجّع exit code غير صفر.

اللوب بيفحص الملفات المهمة ويطبع السطر الأخير بس من كل نتيجة. و [[find ... -exec php -l {} \;]] بيفحص كل ملفات المشروع ما عدا [[vendor]]، و [[grep -v]] بيخفي السليم فمبيفضلش غير المشاكل.

حدوده: syntax بس. دالة مش موجودة، أو [[require]] لملف مش موجود، أو متغير غلط، مش هيشوفهم. دول بيبانوا وقت التشغيل (smoke test).

النسخة مهمة: كود بيستخدم ميزة من PHP 8.3 يعدّي عندك ويفشل على سيرفر 8.1. وعلى cPanel نسخة [[php]] في SSH ممكن تبقى غير النسخة اللي الموقع شغال بيها (MultiPHP)، فشوف نسخة الموقع من اللوحة، وشغّل النسخة دي بالمسار الكامل لو لازم.`,
            when: "قبل كل push، وبعد كل pull على السيرفر، وفي CI لو عندك.",
            mistakes: "تفتكر إن [[No syntax errors]] معناها إن الصفحة شغالة. وتفحص بنسخة PHP على جهازك وتنسى إن السيرفر أقدم."
          },
          lines: [
            "افحص ملف واحد.",
            "افحص الملفات المهمة واطبع النتيجة بس.",
            "كل ملفات المشروع ما عدا vendor، واعرض المشاكل بس.",
            "على السيرفر: نسخة PHP هناك، وافحص بيها."
          ],
          sol: R`بعد ما تمسح [[;]]: [[php -l index.php]] بيطبع [[PHP Parse error: syntax error, unexpected token "echo" in index.php on line 3]] و [[Errors parsing index.php]] ويخرج بـ 255. لاحظ إن رقم السطر هو السطر اللي بعد اللي فيه الغلطة، لأن PHP اكتشف المشكلة لما لقى [[echo]]. جربتها.

الملف السليم بيطبع [[No syntax errors detected in login.php]]. و [[php -v]] عندي كان [[PHP 8.4.19 (cli)]]؛ قارنه بالسيرفر، ولو السيرفر أقدم (زي 8.1) ممكن كود شغال عندك يقع هناك.

الغلط الشائع: تفتكر [[php -l]] بيلاقي كل الأخطاء؛ هو syntax بس. فانكشن مش موجودة أو متغير فاضي مش هيبانوا غير وقت التشغيل.`
        },
        {
          cmd: "config.sample.php",
          title: "ملف الإعدادات الحقيقي بره Git",
          desc: "الريبو فيه نسخة نموذج من ملف الإعدادات بقيم وهمية، والملف الحقيقي (باسورد قاعدة البيانات والمفاتيح) في [[.gitignore]]. على أي سيرفر جديد: [[cp]] من النموذج وتملى القيم هناك. كده الأسرار عمرها ما بتوصل GitHub.",
          example: R`grep -n "config.php" .gitignore
git ls-files | grep -E "config\.php$|\.env$"
cp config.sample.php config.php
nano config.php
chmod 600 config.php`,
          try: "في مشروع PHP عندك: اعمل config.sample.php بقيم زي YOUR_DB_PASSWORD، وحط config.php في .gitignore، واتأكد إن [[git ls-files]] مش بيطلّعه.",
          deep: {
            why: "مشاريع PHP القديمة بتكتب باسورد قاعدة البيانات في ملف [[config.php]] جوه الريبو. أول ما الريبو يبقى public، أو حد ياخد نسخة منه، الباسورد راح.",
            how: R`[[config.sample.php]]: نفس شكل الملف الحقيقي بالظبط، بس بقيم زي [[YOUR_DB_PASSWORD]]، ومتعمله commit. أي حد ياخد المشروع يعرف محتاج إيه.

[[.gitignore]] فيه [[config.php]]، فـ [[git add .]] مبيشوفهوش. و [[git ls-files | grep]] بيتأكد إنه مش متتبع أصلًا (لو ظهر، اتعمله commit قبل كده: [[git rm --cached]] وغيّر كل اللي فيه، تاب الأمن).

[[chmod 600]]: القراية لصاحب الملف بس. على أغلب الاستضافات PHP بيشتغل بيوزرك فده كفاية. لو الموقع طلع 500 بعدها، PHP شغال بيوزر تاني، جرّب 640.

الأحسن كمان: حط الملف فولدر فوق [[public_html]] واعمله [[require __DIR__ . '/../config.php']]. لو إعداد PHP باظ في يوم والسيرفر بعت ملفات [[.php]] كنص، الأسرار مش هتبان لأن الملف مش جوه فولدر الموقع أصلًا. ولو لازم يفضل جوه، اقفل الوصول ليه بـ .htaccess.`,
            when: "من أول يوم في أي مشروع فيه باسورد أو مفتاح، PHP أو غيره (نفس فكرة .env.example).",
            mistakes: "النموذج نفسه فيه القيم الحقيقية لأنه اتنسخ من الحقيقي. وإضافة [[config.php]] لـ [[.gitignore]] بعد ما اتعمله commit وتفتكر إن ده كفاية."
          },
          lines: [
            "الملف الحقيقي في .gitignore؟",
            "اتأكد إن Git مش متتبعه ولا .env.",
            "على السيرفر: انسخ النموذج.",
            "املى القيم الحقيقية.",
            "القراية لصاحبه بس."
          ],
          sol: R`[[grep -n "config.php" .gitignore]] بيطبع رقم السطر زي [[3:config.php]]. و [[git ls-files | grep -E "config\.php$|\.env$"]] المفروض مايطبعش ولا سطر. [[config.sample.php]] مش هيظهر لأن الـ regex بيدوّر على اسم آخره [[config.php]] بالظبط، وده آخره [[sample.php]].

لو ظهر [[config.php]]، يبقى اتعمله commit قبل ما تضيفه لـ .gitignore، و .gitignore مابيأثرش على ملف متتبع. الحل [[git rm --cached config.php]] وبعدين commit، وغيّر الباسوردات اللي كانت فيه لأنها لسه في التاريخ.

و [[ls -l config.php]] بعد [[chmod 600]] بيوري [[-rw-------]]. الغلط الشائع: تحط الباسورد الحقيقي في [[config.sample.php]] بالغلط.`
        },
        {
          cmd: ".htaccess",
          title: "تأمين موقع PHP على Apache من غير صلاحيات سيرفر",
          desc: "أغلب الاستضافات المشتركة Apache، و [[.htaccess]] هو المكان الوحيد اللي تتحكم فيه. الملف ده بيمنع تنفيذ PHP في فولدر الرفع، ويقفل ملفات الإعدادات و [[.git]] و [[.env]]، ويمنع عرض محتوى الفولدرات، ويوحّد الدومين، ويعمل روابط من غير .php بشرط إن الملف موجود.",
          example: R`RewriteEngine On
RewriteRule ^uploads/.*\.(php|phtml|phar|php[0-9])$ - [NC,F,L]
RewriteRule ^includes/.*\.php$ - [NC,F,L]
RewriteCond %{HTTP_HOST} ^www\.example\.com$ [NC]
RewriteRule ^(.*)$ https://example.com/$1 [R=301,L]
RedirectMatch 404 /\.(git|env)
<FilesMatch "^(\.env|composer\.(json|lock)|README\.md)$">
    Require all denied
</FilesMatch>
Options -Indexes
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME}.php -f
RewriteRule ^([^\.]+)$ $1.php [NC,L]
ErrorDocument 404 /404.php
<IfModule mod_headers.c>
    Header always set Strict-Transport-Security "max-age=31536000"
    Header always set X-Content-Type-Options "nosniff"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>`,
          try: "بعد أي تعديل: [[curl -sI https://example.com/nope | head -1]] لازم 404، و [[curl -sI https://example.com/login | head -1]] لازم 200. غلطة في الملف بتوقّع الموقع كله بـ 500.",
          flag: "script",
          deep: {
            why: "أشهر اختراق لمواقع PHP: حد يرفع ملف [[shell.php]] على إنه صورة ويفتحه من المتصفح فينفذ أوامر على السيرفر. وتاني أشهر واحد: [[.git]] مكشوف فأي حد ينزّل الكود كله بتاريخه. الملف ده بيقفل الاتنين من غير ما تحتاج root.",
            how: R`في أول قاعدتين: [[-]] يعني متغيّرش الرابط، [[F]] يرجع 403، [[NC]] من غير فرق بين الحروف الكبيرة والصغيرة، [[L]] آخر قاعدة. السطر الأول بيمنع أي ملف PHP بأي امتداد جوه [[uploads/]]، والتاني بيمنع فتح ملفات [[includes/]] (اللي فيها الإعدادات) مباشرة.

الـ www: [[RewriteCond]] شرط على الدومين، ولو تحقق [[R=301]] بيحوّل لنسخة واحدة (محركات البحث تشوف موقع واحد مش اتنين).

[[RedirectMatch 404]]: أي مسار فيه [[/.git]] أو [[/.env]] يرجع 404 كأنه مش موجود. و [[FilesMatch]] مع [[Require all denied]] بيقفل ملفات بالاسم.

[[Options -Indexes]]: فولدر من غير index ميعرضش قايمة ملفاته.

الروابط النضيفة: [[/login]] يفتح [[login.php]]. الشرطين قبلها أساسيين: الطلب مش فولدر ([[!-d]])، وفيه فعلًا ملف بالاسم ده + [[.php]] ([[-f]]). [[$1]] هو اللي اتطابق بين القوسين.

[[ErrorDocument 404]]: صفحة 404 بتاعتك، وبترجع كود 404 حقيقي.

[[Header always set]] جوه [[IfModule]]: headers الأمان، ولو [[mod_headers]] مش موجود الملف ميبوظش.`,
            when: "أي موقع PHP على Apache. وخصوصًا لو فيه رفع ملفات من المستخدمين.",
            mistakes: R`في مشروع حقيقي كان فيه [[RewriteRule ^([^\.]+)$ $1.php]] من غير شرط إن ملف [[.php]] موجود، فأي رابط غلط زي [[/nope]] بيتحول لـ [[nope.php]] اللي مش موجود، وممكن يلف في loop ويطلع 500 بدل 404. وكان فيه قاعدة بتحوّل أي فولدر لصفحة تانية بـ 302 والدومين مكتوب فيها ثابت. واختبر بـ curl بعد كل تعديل، وشوف [[error_log]] من لوحة الاستضافة لو طلع 500.`
          },
          lines: [
            "شغّل محرك الـ rewrite.",
            "أي ملف PHP جوه uploads: ممنوع (403).",
            "ملفات includes (الإعدادات) متتفتحش مباشرة.",
            "لو الدومين بالـ www...",
            "...حوّله لنسخة واحدة من غير www (301).",
            "أي مسار فيه .git أو .env يرجع 404.",
            "الملفات دي بالاسم...",
            "...ممنوعة.",
            "قفلة.",
            "الفولدر من غير index ميعرضش ملفاته.",
            "لو الطلب مش فولدر...",
            "...وفيه ملف بنفس الاسم + .php...",
            "...افتحه: /login يفتح login.php.",
            "صفحة 404 بكود 404 حقيقي.",
            "لو mod_headers موجود:",
            "المتصفح يستخدم https بس لمدة سنة.",
            "متخمّنش نوع الملف.",
            "ابعت الدومين بس للمواقع التانية مش الرابط كامل.",
            "قفلة."
          ],
          sol: R`بعد أي تعديل: [[curl -sI https://example.com/nope | head -1]] لازم [[HTTP/2 404]]، و [[curl -sI https://example.com/login | head -1]] لازم [[HTTP/2 200]] (الـ login من غير .php اشتغل بسبب آخر 3 سطور Rewrite). و [[/.env]] أو [[/.git/config]] بيرجعوا [[403]] أو [[404]].

لو أي واحد رجّع [[HTTP/2 500]] بعد تعديل: الملف فيه غلطة (غالبًا directive من موديول مش موجود أو قوس ناقص)، والموقع كله واقع. رجّع النسخة القديمة فورًا، و error log في cPanel بيقول السطر ([[Invalid command 'Header'...]] أو [[RewriteRule: bad flag delimiters]]).

ماعنديش Apache هنا فمجربتهاش. الغلط الشائع: [[/login]] بيرجع 404: الـ [[RewriteCond %{REQUEST_FILENAME}.php -f]] محتاج الملف [[login.php]] يبقى في نفس الفولدر، أو [[RewriteEngine On]] مش في الأول.`
        },
        {
          cmd: "curl -I .git/config",
          title: "اتأكد من بره إن الملفات الحساسة مقفولة",
          desc: "مش كفاية تكتب قواعد المنع، لازم تجرّبها من بره زي أي زائر. [[.git/config]] و [[.env]] وملف الإعدادات لازم يرجعوا 403 أو 404. لو واحد فيهم رجع 200، دي حالة طوارئ: الكود أو الأسرار متاحين لأي حد.",
          example: R`curl -sI https://example.com/.git/config | head -1
curl -sI https://example.com/.env | head -1
curl -sI https://example.com/includes/config.php | head -1
curl -sI https://example.com/uploads/ | head -1
curl -sI https://example.com | grep -iE "strict-transport|x-content-type"`,
          try: "شغّلهم على موقعك دلوقتي. وبعدين جرّب [[curl -s https://example.com/.git/HEAD]]: لو رجع [[ref: refs/heads/main]] يبقى .git مكشوف فعلًا.",
          deep: {
            why: "[[.git]] مكشوف معناه إن أدوات جاهزة تقدر تنزّل الريبو كله ملف ملف وتعيد بناءه، بكل التاريخ، بما فيه أي باسورد اتعمله commit في يوم. والبوتات بتدوّر على [[/.git/config]] و [[/.env]] على كل موقع في النت كل يوم.",
            how: R`[[-sI]]: هادي، و headers بس. [[head -1]]: سطر الـ status بس ([[HTTP/2 404]] مثلًا).

المتوقع: [[.git/config]] و [[.env]]: 403 أو 404. [[includes/config.php]]: 403 (لو مش مقفول ممكن يرجع 200 بصفحة فاضية، لأن PHP بينفذه ومبيطبعش حاجة. مش مكشوف بس الأحسن يبقى مقفول). [[uploads/]]: 403 (مفيش عرض ملفات).

السطر الأخير: headers الأمان موجودة فعلًا في الرد.

ولو لقيت حاجة مكشوفة: اقفلها الأول، وبعدين اعتبر كل الأسرار اللي كانت في الريبو أو [[.env]] اتسربت وغيّرها، لأنك مش عارف مين نزّلها قبل ما تاخد بالك.`,
            when: "بعد أول deploy، وبعد أي تعديل في .htaccess أو إعداد السيرفر، وضيفه في smoke test الـ deploy.",
            mistakes: "تجرّب من المتصفح وهو فاكر نسخة قديمة. وتجرّب على http بس وتنسى https (ممكن يبقوا virtual hosts مختلفين). وتقفل .git وتفتكر إن الموضوع خلص من غير ما تغيّر الأسرار."
          },
          lines: [
            "فولدر Git: لازم 403 أو 404.",
            "ملف الأسرار: نفس الكلام.",
            "ملف الإعدادات: 403.",
            "فولدر الرفع: مفيش قايمة ملفات.",
            "headers الأمان موجودة في الرد؟"
          ],
          sol: R`في الحالة الآمنة كل الأوامر الأربعة الأولى بترجع [[HTTP/2 403]] أو [[HTTP/2 404]]، والأخير بيطبع [[strict-transport-security: max-age=31536000]] و [[x-content-type-options: nosniff]].

و [[curl -s https://example.com/.git/HEAD]] المفروض يرجع صفحة 404 أو 403 (HTML)، مش [[ref: refs/heads/main]]. جربت سيرفر PHP من غير حماية وفولدر [[.git]] جواه: رجّع [[ref: refs/heads/main]] بالظبط، يعني أي حد يقدر ينزّل الكود كله بأدوات زي git-dumper.

لو ظهر مكشوف: اقفله فورًا ([[RedirectMatch 404 /\.(git|env)]] في .htaccess)، وغيّر كل الأسرار اللي كانت في الريبو. الغلط الشائع: [[/uploads/]] بيرجع 200 وقايمة ملفات: [[Options -Indexes]] مش شغال.`
        },
        {
          cmd: "cron PHP",
          title: "مهمة مجدولة PHP على الاستضافة",
          desc: "من لوحة الاستضافة (Cron Jobs) شغّل السكربت بـ PHP CLI بالمسار الكامل، مش عن طريق رابط. وجوه السكربت شرط [[php_sapi_name()]] بيمنع حد يشغّله من المتصفح. ولو الاستضافة مش بتدي غير cron بـ URL، المفتاح يبقى طويل وعشوائي وفي ملف الإعدادات بره git، مش مكتوب في السكربت.",
          example: R`0 8 * * * /usr/bin/php /home/deploy/domains/example.com/public_html/cron/reminders.php >> /home/deploy/cron.log 2>&1
<?php
// cron/reminders.php
require __DIR__ . '/../../config.php';
if (php_sapi_name() !== 'cli') {
    $key = (string)($_GET['key'] ?? '');
    if (CRON_KEY === '' || !hash_equals(CRON_KEY, $key)) { http_response_code(403); exit('forbidden'); }
}
date_default_timezone_set('Africa/Cairo');
echo "done " . date('Y-m-d H:i') . "\n";`,
          try: "افتح رابط السكربت من المتصفح من غير key: لازم forbidden. وشغّله من SSH بـ [[php cron/reminders.php]]: لازم يشتغل.",
          flag: "script",
          deep: {
            why: "مهام زي التذكيرات والتقارير لازم تشتغل لوحدها. لو السكربت جوه [[public_html]] ومن غير حماية، أي حد يعرف الرابط يشغّله ١٠٠ مرة ويبعت ١٠٠ إيميل لكل عميل.",
            how: R`سطر الـ cron: نفس صيغة crontab. المسار الكامل لـ PHP (اللوحة بتقولك هو إيه، وعلى cPanel ممكن يبقى زي [[/opt/alt/php82/usr/bin/php]] لنسخة معينة)، والمسار الكامل للسكربت، والناتج لملف لوج.

[[php_sapi_name()]]: بترجع [[cli]] لما السكربت شغال من الترمنال أو cron. من المتصفح بترجع حاجة تانية، فهنا بنطلب المفتاح.

[[hash_equals]]: مقارنة بتاخد نفس الوقت مهما كان الفرق، فمحدش يقدر يخمّن المفتاح حرف حرف من سرعة الرد. و [[CRON_KEY === '']] عشان لو المفتاح فاضي في الإعدادات ميبقاش الباب مفتوح.

[[config.php]] فوق [[public_html]] (مش جوه الموقع) وفيه [[CRON_KEY]]، تولّده بـ [[openssl rand -hex 32]].

لو مفيش غير cron بـ URL: [[curl -fsS "https://example.com/cron/reminders.php?key=..." > /dev/null]]. بس المفتاح في الرابط بيتسجل في access log، فالـ CLI أحسن دايمًا.

والمهمة لازم تتحمل إنها تشتغل مرتين: سجّل كل تذكير اتبعت في جدول، ومتبعتش اللي اتسجل.`,
            when: "أي مهمة متكررة على استضافة مشتركة: تذكيرات، وتقارير، وتنضيف جلسات قديمة.",
            mistakes: "في مشروع حقيقي المفتاح السري كان مكتوب جوه ملف الـ cron نفسه ومترفوع على git، يعني أي حد شاف الريبو يقدر يشغّل المهمة؛ الحل تنقله لملف الإعدادات بره git وتغيّره. و [[php]] من غير مسار كامل في cron ياخد نسخة PHP غير نسخة الموقع."
          },
          lines: [
            "كل يوم ٨ الصبح: شغّل السكربت بـ PHP CLI، والناتج للوج.",
            "بداية ملف PHP.",
            "الإعدادات من فولدر فوق الموقع (فيها CRON_KEY).",
            "لو مش شغال من cron أو الترمنال...",
            "...خد المفتاح من الرابط.",
            "مفتاح فاضي أو غلط: 403 واقف.",
            "قفلة.",
            "التوقيت.",
            "اطبع إنه خلص (بيتكتب في اللوج)."
          ],
          sol: R`من المتصفح من غير key: الصفحة بتطبع [[forbidden]] والـ status [[403]]. ومع [[?key=]] الصح بتشتغل. ومن SSH: [[php cron/reminders.php]] بيطبع [[done 2026-09-30 08:05]] بتوقيت القاهرة. جربت التلات حالات بسيرفر PHP محلي وطلعوا كده.

ده لأن [[php_sapi_name()]] بيرجع [[cli]] من الترمنال و cron، فالسكربت مش محتاج key، ومن الويب بيرجع حاجة تانية زي [[fpm-fcgi]] فبيطلب key.

الأغلاط الشائعة: [[Failed opening required '.../config.php']]: المسار [[/../../config.php]] معمول على إن config بره public_html بمستويين؛ عدّله حسب مكانه. و cron مابيشتغلش: [[/usr/bin/php]] على الاستضافة ممكن يبقى نسخة تانية (cPanel بيدّيك مسار زي [[/usr/local/bin/php]] أو [[ea-php82]]). اقرا [[cron.log]].`
        },
        {
          cmd: ".user.ini",
          title: "إعدادات PHP للجلسات من غير php.ini",
          desc: "على الاستضافة المشتركة مش بتعدّل [[php.ini]]، بس تقدر تحط [[.user.ini]] في فولدر الموقع. السطور دي بتأمّن كوكي الجلسة: JavaScript مش بيقراها، ومبتتبعتش غير على https، و SameSite ضد CSRF، والجلسات في فولدر بتاعك انت.",
          example: R`session.use_strict_mode = 1
session.cookie_httponly = 1
session.cookie_secure = 1
session.cookie_samesite = "Lax"
session.save_path = "/home/deploy/tmp/sessions"`,
          try: "اعمل الفولدر الأول ([[mkdir -p ~/tmp/sessions && chmod 700 ~/tmp/sessions]])، وبعد ٥ دقايق افتح DevTools وشوف كوكي PHPSESSID: HttpOnly و Secure عليهم علامة.",
          flag: "script",
          deep: {
            why: "كوكي الجلسة هو الدخول نفسه. لو JavaScript يقدر يقراها، أي ثغرة XSS بتسرقها. ولو بتتبعت على http، أي حد على نفس الواي فاي ياخدها. والإعدادات الافتراضية على كتير من الاستضافات مش مقفولة.",
            how: R`[[use_strict_mode]]: PHP ميقبلش session id هو اللي معملهوش (ضد session fixation). [[cookie_httponly]]: [[document.cookie]] مش شايفها. [[cookie_secure]]: https بس. [[cookie_samesite = "Lax"]]: الكوكي مبتتبعتش مع طلبات POST جاية من مواقع تانية.

[[save_path]]: الافتراضي فولدر [[/tmp]] مشترك، وتنضيف الجلسات فيه ماشي بإعدادات حد تاني. فولدر بتاعك بصلاحيات 700، ولازم يكون موجود وإلا الجلسات تفشل. ولو الفولدر ده مش بيتنضف لوحده، ضيف cron يمسح القديم.

[[.user.ini]] بيشتغل مع PHP-FPM و CGI (أغلب الاستضافات النهاردة). مع mod_php القديم مش بيتقري، وهناك بتكتب [[php_value]] في .htaccess. و PHP بيقراه كل ٥ دقايق ([[user_ini.cache_ttl]])، فالتغيير مش فوري. تتأكد بـ [[ini_get('session.cookie_secure')]] في صفحة تجربة، وامسحها بعدها.`,
            when: "أي موقع PHP فيه login على استضافة مشتركة.",
            mistakes: "في مشروع حقيقي مسار الجلسات كان مكتوب بـ [[session_save_path()]] وفيه اسم حساب الاستضافة، ومتكرر في عشرات الملفات؛ مكانه سطر واحد هنا. و [[cookie_secure]] وانت لسه بتجرّب على http فالدخول ميشتغلش. وتعدّل وتختبر فورًا وتفتكر إنه مشتغلش (استنى الـ cache)."
          },
          lines: [
            "متقبلش session id مش انت اللي عامله.",
            "JavaScript مش شايف الكوكي.",
            "https بس.",
            "متتبعتش مع POST من مواقع تانية.",
            "الجلسات في فولدر بتاعك (لازم يكون موجود)."
          ],
          sol: R`بعد حوالي ٥ دقايق (PHP بيقرا [[.user.ini]] كل [[user_ini.cache_ttl]] = 300 ثانية)، في DevTools › Application › Cookies، كوكي [[PHPSESSID]] عليه علامة في [[HttpOnly]] و [[Secure]]، و [[SameSite]] مكتوب [[Lax]].

للتأكد من غير DevTools: صفحة فيها [[<?php echo ini_get('session.cookie_httponly'), ini_get('session.save_path');]] بتطبع [[1]] والمسار بتاعك. و [[ls ~/tmp/sessions]] بعد ما تفتح الموقع بيوري ملفات [[sess_...]].

ماجربتهاش على استضافة هنا. الأغلاط الشائعة: مفيش أي تغيير بعد ساعة: الاستضافة شغالة بـ mod_php مش FPM/CGI، و [[.user.ini]] مابيتقريش أصلًا؛ جرّب [[php_value]] في .htaccess. و [[session_start(): open(...) failed: No such file]]: الفولدر مش موجود أو المسار فيه اسم يوزر غلط، والجلسات كلها بتقع.`
        }
      ]
    }
]);
