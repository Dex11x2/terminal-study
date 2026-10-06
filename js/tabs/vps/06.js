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
          teach: R`## الأول: cron هو منبّه السيرفر

cron برنامج شغال على السيرفر طول الوقت (خدمة اسمها [[cron]])، وكل دقيقة بيصحى يبص في جداول المهام ويشغّل اللي جه ميعاده. والجدول ده اسمه **crontab** (من cron table)، ولكل يوزر جدول لوحده. المثال ٣ أوامر: افتح جدولك، اعرضه، واتأكد إن المهام اشتغلت.

كل اللي تحت اتشغّل على أوبونتو 24.04 جوه Docker بـ systemd شغال (زي VPS بالظبط)، كيوزر اسمه [[deploy]].

---

## ١. [[crontab -e]]

[[-e]] من edit: افتح جدولي في محرر. أول مرة خالص على أوبونتو بيسألك تختار محرر من قايمة (nano و vim وغيرهم)، واختار nano لأنه الأسهل (الحفظ Ctrl+O والخروج Ctrl+X)، ولو حبيت تغيّر اختيارك بعدين: [[select-editor]].

ولو الجدول لسه مش موجود بيقولك كده الأول:

~~~text الناتج أول مرة
no crontab for deploy - using an empty one
~~~

يعني «مفيش جدول لـ deploy، هفتحلك واحد فاضي». والملف اللي بيتفتح مش فاضي خالص: فيه سطور كتير بتبدأ بـ [[#]]، ودي تعليقات (شرح) cron بيتجاهلها، وآخرها سطر بيفكّرك بالترتيب:

~~~text آخر سطر في الملف
# m h  dom mon dow   command
~~~

[[m]] الدقيقة، و [[h]] الساعة، و [[dom]] اليوم في الشهر (day of month)، و [[mon]] الشهر، و [[dow]] اليوم في الأسبوع (day of week)، وبعدهم الأمر. الدرس الجاي بيشرحهم واحدة واحدة. ضيف تحت السطر ده مهمتك، مثلًا:

~~~bash
* * * * * date >> $HOME/dates.txt
~~~

الخمس نجوم معناها «كل دقيقة»، و [[date]] بيطبع التاريخ والوقت، و [[>>]] بيضيف الناتج في آخر الملف (من غير ما يمسح اللي فيه)، و [[$HOME]] فولدر اليوزر ([[/home/deploy]]). احفظ واقفل:

~~~text الناتج بعد الحفظ
crontab: installing new crontab
~~~

### لو الصيغة غلط

[[crontab -e]] بيفحص الملف قبل ما يركّبه. جرّبت سطر الدقيقة فيه 61 (والدقيقة من 0 لـ 59):

~~~text الناتج
"/tmp/crontab.6CnsFu/crontab":24: bad minute
errors in crontab file, can't install.
Do you want to retry the same edit? (y/n)
~~~

[[24]] رقم السطر، و [[bad minute]] الخانة الغلط. [[y]] يرجّعك للمحرر تصلّح، و [[n]] يسيب الجدول القديم زي ما هو. وده السبب إنك متعدّلش ملف الجدول بإيدك: [[crontab -e]] هو اللي بيفحص.

> الجدول نفسه محفوظ في [[/var/spool/cron/crontabs/deploy]]، صاحبه deploy وصلاحيته [[-rw-------]] (هو بس يقراه). متلمسوش، اتعامل معاه بـ [[crontab]] بس.

---

## ٢. [[crontab -l]]

[[-l]] من list: اطبع الجدول من غير ما تفتح محرر. بيطبع الملف كله بالتعليقات، وفي الآخر سطرك:

~~~text الناتج (آخره)
# m h  dom mon dow   command
* * * * * date >> $HOME/dates.txt
~~~

ولو مفيش جدول: [[no crontab for deploy]] والـ exit code بتاعه 1 (يعني فشل)، ودي هتفرق في الحل تحت.

---

## ٣. [[grep CRON /var/log/syslog | tail]]

هنا ٣ حتت:

| الحتة | معناها |
|---|---|
| [[/var/log/syslog]] | لوج النظام العام. كل خدمة بتكتب فيه سطور (وده محتاج rsyslog، اللي متسطّب على أوبونتو سيرفر) |
| [[grep CRON]] | اطبع السطور اللي فيها كلمة CRON بس (الحروف الكبيرة مهمة) |
| [[tail]] | الخط العمودي قبله (pipe) بيبعتله ناتج grep، و tail بيطبع آخر ١٠ سطور بس |

بعد ٤ دقايق من السطر اللي ضفناه:

~~~text الناتج
2026-10-06T11:42:01.390500+00:00 vps1 CRON[11740]: (deploy) CMD (date >> $HOME/dates.txt)
2026-10-06T11:43:01.401097+00:00 vps1 CRON[11743]: (deploy) CMD (date >> $HOME/dates.txt)
2026-10-06T11:44:01.408893+00:00 vps1 CRON[11765]: (deploy) CMD (date >> $HOME/dates.txt)
2026-10-06T11:45:01.414620+00:00 vps1 CRON[11771]: (deploy) CMD (date >> $HOME/dates.txt)
~~~

نقرا السطر:

| الجزء | معناه |
|---|---|
| [[2026-10-06T11:42:01...+00:00]] | الوقت. [[T]] بتفصل التاريخ عن الساعة، و [[+00:00]] يعني UTC |
| [[vps1]] | اسم السيرفر |
| [[CRON[11740]]] | رقم العملية (PID) اللي cron عملها للمهمة دي |
| [[(deploy)]] | اتشغّلت بصلاحيات مين |
| [[CMD (...)]] | الأمر اللي اتشغّل بالظبط |

لاحظ الثواني: [[:01]] كل مرة. cron بيصحى أول كل دقيقة، فالمهمة بتبدأ في الثانية صفر وشوية.

> السطر ده معناه «اتشغّلت»، مش «نجحت». لو الأمر نفسه فشل، السطر هيظهر برضه. النجاح تعرفه من ناتج المهمة (الملف اللي كتبته أو اللوج بتاعها).

---

## ٤. الـ solCode: نفس الكلام من غير محرر

~~~bash
(crontab -l 2>/dev/null; echo '* * * * * date >> $HOME/dates.txt') | crontab -
~~~

نفكّه من جوه:

1. [[crontab -l 2>/dev/null]]: اطبع الجدول الحالي. و [[2>/dev/null]] يرمي رسايل الأخطاء ([[2]] هي قناة الأخطاء stderr، و [[/dev/null]] «سلة مهملات» بتبلع أي حاجة)، فلو مفيش جدول مش هتشوف [[no crontab for deploy]].
2. [[echo '...']]: اطبع السطر الجديد. العلامات المفردة [[' ']] بتمنع الشيل يحوّل [[$HOME]] دلوقتي، فبيتكتب في الجدول زي ما هو، و cron بيحوّله وقت التشغيل.
3. الأقواس [[( ; )]]: شغّل الأمرين ورا بعض، واعتبر ناتجهم الاتنين ناتج واحد.
4. [[| crontab -]]: الـ [[-]] معناها «اقرا الجدول الجديد من الـ pipe» بدل ملف. فالجدول بيتكتب من جديد = القديم + السطر الجديد.

جرّبته، وبعدين ضفت سطر تاني بنفس الطريقة:

~~~text crontab -l
* * * * * date >> $HOME/dates.txt
0 3 * * * /home/deploy/backup.sh
~~~

السطر القديم لسه موجود، لأن الأمر بيقرا القديم الأول. لو كتبت [[echo '...' | crontab -]] لوحده، الجدول القديم كله هيتمسح ويفضل سطر واحد.

وبعد دقيقتين:

~~~text cat ~/dates.txt
Tue Oct  6 11:42:01 UTC 2026
Tue Oct  6 11:43:01 UTC 2026
~~~

---

## ٥. خلي بالك من [[crontab -r]]

[[-r]] من remove: امسح الجدول كله، من غير أي سؤال. جربته:

~~~text crontab -r ثم crontab -l
no crontab for deploy
~~~

وحرف [[r]] جنب [[e]] في الكيبورد بالظبط، فغلطة صباع واحدة بتمسح كل مهامك. عشان كده خد نسخة قبل ما تعدّل: [[crontab -l > ~/crontab.bak]]، والرجوع [[crontab ~/crontab.bak]].

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[crontab -e]] | افتح جدولك، وبيفحصه قبل ما يحفظ |
| [[crontab -l]] | اعرضه |
| [[crontab -r]] | امسحه كله من غير سؤال (خطر) |
| [[sudo crontab -e]] | جدول root، للمهام اللي محتاجة صلاحياته |
| [[grep CRON /var/log/syslog]] | المهمة اتشغّلت إمتى (مش هل نجحت) |

وامسح سطر التجربة بعد ما تخلص، وإلا الملف هيكبر سطر كل دقيقة لحد ما تفتكره.`,
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

cron بيشغّل الأمر من غير ترمنال، وبـ sh مش bash، ومن غير ما يقرا [[~/.bashrc]] (فـ node المتسطّب بـ nvm مثلًا مش هيتلاقى)، فاكتب المسارات كاملة ([[/usr/bin/docker]] مش [[docker]]، و [[which docker]] بتقولك المسار). ووجّه الناتج لملف: [[>> file]] ضيف الناتج في آخر الملف، و [[2>&1]] ابعت الأخطاء لنفس المكان، وإلا مش هتعرف ليه المهمة فشلت. و [[||]] معناها «لو اللي قبلي فشل نفّذ اللي بعدي». وعلامة [[%]] ليها معنى خاص (سطر جديد) جوه crontab، فـ [[date +%F]] تتكتب [[date +\%F]].`,
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

الـ PATH: cron مش بيقرا [[~/.bashrc]]، فالـ PATH مفيهوش الفولدرات اللي انت ضفتها (زي [[~/.nvm]] و [[~/.local/bin]])، ومن غير [[/etc/environment]] (اللي أوبونتو بيقراه) بيبقى [[/usr/bin:/bin]] بس. أمر زي [[docker]] أو [[node]] ممكن ميتلاقاش. اكتب المسار الكامل ([[/usr/bin/docker]])، اعرفه بـ [[which]].

الناتج: مفيش ترمنال تطلع عليه الرسايل، فوجّه الناتج والأخطاء لملف بـ [[>> file 2>&1]]، وإلا مش هتعرف ليه فشلت.

الوقت: cron بيمشي على توقيت السيرفر (شوف [[timedatectl]]).`,
            when: "أي مهمة مجدولة. واستخدم موقع crontab.guru يترجملك أي توقيت لكلام عادي.",
            mistakes: "مسارات مش كاملة. ومفيش توجيه للوج. و [[%]] جوه الأمر: cron بيعتبرها «سطر جديد»، فـ [[date +%F]] لازم تتكتب بـ backslash قبل [[%]]، أو حطها جوه سكربت."
          },
          teach: R`## الأول: سطر الـ crontab = ميعاد + أمر

كل سطر في الجدول جملة واحدة: «في الميعاد ده، شغّل الأمر ده». أول ٥ حتت مفصولين بمسافة هما الميعاد، وكل اللي بعدهم هو الأمر. المثال فيه رسمة في التعليقات بتفكّرك بالترتيب، و ٣ مهام حقيقية. كل اللي تحت اتجرّب على أوبونتو 24.04 جوه Docker، كجدول اليوزر [[deploy]].

---

## ١. الرسمة اللي فوق (التعليقات)

السطور اللي بتبدأ بـ [[#]] تعليقات، cron بيتجاهلها. الرسمة بتقول إن الخانات بالترتيب ده:

| الخانة | المدى | ملاحظة |
|---|---|---|
| ١. minute | 0-59 | الدقيقة |
| ٢. hour | 0-23 | الساعة بنظام ٢٤ ساعة، فـ 15 يعني ٣ العصر |
| ٣. day of month | 1-31 | اليوم في الشهر |
| ٤. month | 1-12 | الشهر |
| ٥. day of week | 0-7 | 0 و 7 الاتنين الحد، 1 الاتنين، 6 السبت |

والرموز اللي ممكن تتكتب في أي خانة:

| الرمز | معناه | مثال في خانة الدقيقة |
|---|---|---|
| [[*]] | أي قيمة | كل دقيقة |
| [[*/5]] | كل ٥ (أي رقم يقبل القسمة على ٥) | 0 و 5 و 10 ... 55 |
| [[1-5]] | من لحد | الدقايق من 1 لـ 5 |
| [[1,15]] | القيم دي بس | دقيقة 1 ودقيقة 15 |

---

## ٢. السطر الأول: الباك أب

~~~bash
0 3 * * * /home/deploy/backup.sh /var/www/myapp >> /home/deploy/backup.log 2>&1
~~~

### الميعاد: [[0 3 * * *]]

دقيقة [[0]]، ساعة [[3]]، وأي يوم وأي شهر وأي يوم في الأسبوع. يعني كل يوم الساعة ٣:٠٠ الفجر بالظبط. وده بتوقيت السيرفر: لو [[timedatectl]] بيقول [[Etc/UTC]] (وده كان الحال في التجربة)، الـ ٣ الفجر UTC هي ٥ أو ٦ الصبح في مصر.

### الأمر

| الحتة | معناها |
|---|---|
| [[/home/deploy/backup.sh]] | السكربت، بمسار كامل |
| [[/var/www/myapp]] | argument للسكربت: يعمل باك أب لأنهي فولدر |
| [[>> /home/deploy/backup.log]] | ضيف الناتج العادي (stdout) في آخر اللوج |
| [[2>&1]] | وابعت الأخطاء (القناة 2، stderr) لنفس مكان القناة 1 |

ليه الترتيب [[>> file 2>&1]] مش العكس؟ لأن الشيل بيقرا من الشمال: الأول يوجّه 1 للملف، وبعدين يقول 2 تروح «مكان ما 1 رايح دلوقتي» = الملف. لو كتبت [[2>&1 >> file]]، 2 هتروح لمكان 1 القديم.

وليه التوجيه أصلًا؟ مفيش ترمنال قدام cron. الناتج اللي متوجهش بيحاول يبعته إيميل، ولو مفيش برنامج إيميل بيترمي. ده اللي ظهر في الـ syslog في التجربة:

~~~text الناتج
CRON[11864]: (CRON) info (No MTA installed, discarding output)
~~~

[[MTA]] اختصار Mail Transfer Agent (برنامج بيبعت إيميل)، و [[discarding output]] يعني «رميت الناتج». فلو المهمة فشلت مش هتعرف ليه.

---

## ٣. السطر التاني: فحص الموقع

~~~bash
*/5 * * * * curl -fsS https://example.com/health > /dev/null || echo "down" >> /home/deploy/health.log
~~~

الميعاد [[*/5 * * * *]]: كل ٥ دقايق. والأمر:

| الحتة | معناها |
|---|---|
| [[curl]] | اطلب الرابط |
| [[-f]] | fail: لو الرد 4xx أو 5xx اعتبره فشل (exit code غير صفر) |
| [[-s]] | silent: من غير شريط التقدم |
| [[-S]] | بس اطبع رسالة الخطأ لو حصل (مع [[-s]] بيبقوا «اسكت إلا في الخطأ») |
| [[> /dev/null]] | ارمي محتوى الصفحة، مش محتاجينه |
| [[echo "down" >> ...]] | اكتب down في لوج |

وبين curl و echo فيه [[||]] (خطين عموديين)، ومعناها «لو اللي قبلي فشل، نفّذ اللي بعدي». فـ down بيتكتب بس لما الموقع ميردش أو يرد بخطأ.

---

## ٤. السطر التالت: التنضيف

~~~bash
0 4 * * 0 /usr/bin/docker system prune -f
~~~

[[0 4 * * 0]]: دقيقة 0، ساعة 4، وآخر خانة (اليوم في الأسبوع) [[0]] = الحد. يعني كل حد ٤ الفجر. و [[-f]] هنا force: متسألش «Are you sure?»، لأن مفيش حد يرد على السؤال.

> [[docker system prune]] بيمسح الكونتينرات الواقفة والصور اللي مش مستخدمة على السيرفر كله. ده مكانه سيرفر انت متأكد مفيهوش حاجة واقفة ومحتاجها، مش جهازك.

---

## ٥. ليه المسار كامل؟ البيئة بتاعة cron

جرّبت مهمة بتطبع البيئة اللي cron بيشغّل بيها الأمر ([[env > /tmp/cronenv.txt]]):

~~~text الناتج
HOME=/home/deploy
LOGNAME=deploy
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin
LANG=C.UTF-8
SHELL=/bin/sh
PWD=/home/deploy
~~~

الملاحظات:

- [[SHELL=/bin/sh]]: الأمر بيتنفذ بـ sh مش bash، فحاجات bash الخاصة (زي الأقواس المربعة المزدوجة في [[if]]) ممكن تفشل جوه السطر. حطها في سكربت أوله [[#!/usr/bin/env bash]].
- [[PATH]]: على أوبونتو cron بياخده من [[/etc/environment]]، فالفولدرات العادية موجودة. لكن أي حاجة انت ضفتها في [[~/.bashrc]] **مش** موجودة: node المتسطّب بـ nvm في [[~/.nvm]]، و [[~/.local/bin]]. (cron نفسه من غير الملف ده بيدّي PATH أصغر: [[/usr/bin:/bin]] بس.)
- مفيش [[.bashrc]] بيتقري أصلًا، فأي متغير بتعمله [[export]] هناك مش موجود.

وأمر مش موجود في الـ PATH بيطلع كده (جربت [[docker ps]] على سيرفر مفيهوش Docker):

~~~text الناتج في اللوج
/bin/sh: 1: docker: not found
~~~

عشان كده اكتب المسار الكامل، وتعرفه بـ [[which docker]] أو [[which node]] (كنفس اليوزر صاحب الجدول).

---

## ٦. علامة [[%]] جوه السطر

جربت سطرين:

~~~bash
* * * * * date +%F >> /tmp/pct-raw.txt 2>&1
* * * * * date +\%F >> /tmp/pct-esc.txt 2>&1
~~~

والـ syslog قال:

~~~text الناتج
CRON[11867]: (deploy) CMD (date +)
CRON[11868]: (deploy) CMD (date +%F >> /tmp/pct-esc.txt 2>&1)
~~~

في السطر الأول cron قطع الأمر عند [[%]]: اللي اتنفذ [[date +]] بس، والباقي اتبعت كمدخل للأمر، والملف [[pct-raw.txt]] متعملش خالص. في التاني الـ [[\]] قبل [[%]] قالت لـ cron «دي علامة عادية»، والملف فيه [[2026-10-06]]. ([[%F]] في date معناها التاريخ بصيغة سنة-شهر-يوم.)

---

## الخلاصة

| التوقيت | معناه |
|---|---|
| [[* * * * *]] | كل دقيقة |
| [[*/5 * * * *]] | كل ٥ دقايق |
| [[0 3 * * *]] | كل يوم ٣:٠٠ |
| [[0 4 * * 0]] | كل حد ٤:٠٠ |
| [[0 9 * * 1-5]] | الساعة ٩ من الاتنين للجمعة |
| [[* 3 * * *]] | **غلط شائع**: كل دقيقة من ٣:٠٠ لـ ٣:٥٩ (٦٠ مرة) |

وأي سطر: مسار كامل للأمر، و [[>> log 2>&1]] في الآخر، و [[\%]] بدل [[%]]، والتوقيت بتوقيت السيرفر. واتأكد من أي ميعاد على crontab.guru قبل ما تحفظه.`,
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
          teach: R`## الأول: ملفين بدل سطر واحد

في cron المهمة سطر واحد فيه الميعاد والأمر. في systemd بيتقسموا ملفين بنفس الاسم:

| الملف | فيه إيه |
|---|---|
| [[backup.service]] | **إيه** اللي يتشغّل (الأمر، وبأنهي يوزر) |
| [[backup.timer]] | **إمتى** يتشغّل |

والـ timer بيشغّل الـ service اللي بنفس اسمه لوحده. الملفين مكانهم [[/etc/systemd/system/]] (ده فولدر الملفات اللي انت بتكتبها، وملفات البرامج المتسطّبة في [[/usr/lib/systemd/system/]]). كل اللي تحت اتجرّب على أوبونتو 24.04 جوه Docker بـ systemd شغال (systemd 255)، وسكربت تجربة [[backup.sh]] بيطبع سطرين ويستنى ثانيتين.

---

## ١. شكل الملف: أقسام ومفاتيح

ملفات systemd (اسمها **unit files**) مقسومة أقسام. اسم القسم بين أقواس مربعة زي [[[Unit]]]، وتحته سطور شكلها [[مفتاح=قيمة]] من غير مسافات حوالين [[=]]. والسطور الفاضية للقراية بس.

---

## ٢. [[backup.service]]

~~~bash
[Unit]
Description=Nightly database backup

[Service]
Type=oneshot
User=deploy
ExecStart=/home/deploy/backup.sh
~~~

| السطر | معناه |
|---|---|
| [[[Unit]]] | قسم الوصف، موجود في أي نوع unit |
| [[Description=...]] | الاسم اللي هيظهر في status واللوج |
| [[[Service]]] | قسم خاص بالـ services: إزاي يتشغّل |
| [[Type=oneshot]] | أمر بيشتغل ويخلص، مش برنامج فاضل شغال |
| [[User=deploy]] | شغّله بصلاحيات deploy مش root |
| [[ExecStart=...]] | الأمر نفسه، بمسار كامل لازم يبدأ بـ [[/]] |

ومفيش قسم [[[Install]]] هنا عن قصد: الـ service دي مش هتتفعّل لوحدها، الـ timer هو اللي بيشغّلها.

### ليه [[oneshot]]؟

مع [[oneshot]] أمر [[systemctl start]] بيستنى لحد السكربت ما يخلص. قست ده:

~~~text time systemctl start backup.service
real	0m2.061s
~~~

ثانيتين = مدة السكربت. ولو السكربت فشل، الأمر نفسه بيقول:

~~~text الناتج لما السكربت خرج بـ 1
Job for backup.service failed because the control process exited with error code.
See "systemctl status backup.service" and "journalctl -xeu backup.service" for details.
~~~

مع [[Type=simple]] الأمر كان هيرجع على طول ويقول تمام، حتى لو السكربت هيفشل بعد ثانية.

---

## ٣. [[backup.timer]]

~~~bash
[Unit]
Description=Run backup.service every night

[Timer]
OnCalendar=*-*-* 03:00:00
Persistent=true
RandomizedDelaySec=10min

[Install]
WantedBy=timers.target
~~~

### [[OnCalendar]]: الميعاد

الصيغة [[سنة-شهر-يوم ساعة:دقيقة:ثانية]]، و [[*]] أي قيمة. فـ [[*-*-* 03:00:00]] = أي سنة، أي شهر، أي يوم، الساعة ٣:٠٠:٠٠. وقبل ما تحفظ، اسأل systemd يفهمها إزاي:

~~~bash
systemd-analyze calendar "*-*-* 03:00:00"
~~~

~~~text الناتج
Normalized form: *-*-* 03:00:00
    Next elapse: Wed 2026-10-07 03:00:00 UTC
       From now: 15h left
~~~

| السطر | معناه |
|---|---|
| [[Normalized form]] | الصيغة الكاملة اللي systemd فهمها |
| [[Next elapse]] | المرة الجاية بالظبط، بتوقيت السيرفر (UTC هنا) |
| [[From now]] | فاضل قد إيه |

ولو جربت صيغ تانية في نفس الأمر:

~~~text الناتج (مختصر)
  Original form: 3:00
Normalized form: *-*-* 03:00:00

  Original form: Sun 04:00
Normalized form: Sun *-*-* 04:00:00

  Original form: *:0/5
Normalized form: *-*-* *:00/5:00

  Original form: daily
Normalized form: *-*-* 00:00:00
~~~

يعني [[3:00]] لوحدها صح ومعناها نفس الحاجة، و [[*:0/5]] كل ٥ دقايق (من دقيقة 0 وكل ٥)، و [[daily]] نص الليل. والصيغة الغلط:

~~~text systemd-analyze calendar "every day 3am"
Failed to parse calendar specification 'every day 3am': Invalid argument
~~~

### الباقي

| السطر | معناه |
|---|---|
| [[[Timer]]] | قسم خاص بالـ timers |
| [[Persistent=true]] | systemd بيفتكر آخر مرة اشتغلت. لو السيرفر كان مقفول الساعة ٣، أول ما يقوم بيشغّلها |
| [[RandomizedDelaySec=10min]] | أخّرها وقت عشوائي من 0 لـ ١٠ دقايق |
| [[[Install]]] | بيتقري لما تعمل [[enable]] |
| [[WantedBy=timers.target]] | اربط الـ timer بمجموعة الـ timers اللي بتبدأ مع السيرفر |

أثر [[RandomizedDelaySec]] باين في التجربة: بعد التفعيل [[list-timers]] قال إن المرة الجاية [[03:02:42]] مش [[03:00:00]] بالظبط.

---

## ٤. الـ solCode خطوة خطوة

### [[systemd-analyze verify]]

بيفحص الملفين من غير ما يشغّلهم. أول مرة نسيت [[chmod +x]] على السكربت:

~~~text الناتج
backup.service: Command /home/deploy/backup.sh is not executable: Permission denied
~~~

وبعد [[chmod +x /home/deploy/backup.sh]] نفس الأمر مطبعش حاجة وخرج بـ 0. السكوت هنا معناه سليم.

### [[sudo systemctl daemon-reload]]

systemd بيقرا الملفات مرة ويحفظها في الذاكرة، فالملفات الجديدة مش هيشوفها غير بعد الأمر ده.

### [[sudo systemctl start backup.service]] ثم [[status]]

شغّل المهمة دلوقتي بإيدك قبل ما تعتمد على الميعاد. وبعدها:

~~~text systemctl status backup.service
○ backup.service - Nightly database backup
     Loaded: loaded (/etc/systemd/system/backup.service; static)
     Active: inactive (dead) since Tue 2026-10-06 11:47:17 UTC; 33ms ago
TriggeredBy: ● backup.timer
    Process: 11992 ExecStart=/home/deploy/backup.sh (code=exited, status=0/SUCCESS)
   Main PID: 11992 (code=exited, status=0/SUCCESS)

Oct 06 11:47:15 vps1 backup.sh[11992]: backup started as deploy
Oct 06 11:47:17 vps1 backup.sh[11992]: backup done
Oct 06 11:47:17 vps1 systemd[1]: Finished backup.service - Nightly database backup.
~~~

| الجزء | معناه |
|---|---|
| [[○]] و [[inactive (dead)]] | مش شغالة دلوقتي، وده الطبيعي لـ oneshot خلص |
| [[static]] | مفيهاش [[[Install]]]، فمتتعملهاش enable (الـ timer بيشغّلها) |
| [[TriggeredBy: ● backup.timer]] | مين بيشغّلها |
| [[status=0/SUCCESS]] | خرجت بـ 0 = نجحت |
| [[started as deploy]] | ناتج السكربت، ومنه باين إن [[User=deploy]] اشتغل |

ولما خليت السكربت يخرج بـ 1:

~~~text الناتج
× backup.service - Nightly database backup
     Active: failed (Result: exit-code) since Tue 2026-10-06 11:47:15 UTC; 9ms ago
    Process: 11962 ExecStart=/home/deploy/backup.sh (code=exited, status=1/FAILURE)
~~~

[[×]] أحمر و [[failed]]، وده اللي cron مكانش هيقولهولك.

### [[sudo systemctl enable --now backup.timer]]

[[enable]] للـ **timer** (مش الـ service): يقوم مع السيرفر. و [[--now]]: وابدأه دلوقتي كمان.

~~~text الناتج
Created symlink /etc/systemd/system/timers.target.wants/backup.timer → /etc/systemd/system/backup.timer.
~~~

ده بالظبط معنى [[WantedBy=timers.target]]: enable عمل اختصار (symlink) للـ timer جوه فولدر [[timers.target.wants]].

### [[crontab -e]]

آخر خطوة: امسح سطر الباك أب القديم من cron، وإلا المهمة هتشتغل مرتين كل ليلة.

---

## الخلاصة

| cron | systemd timer |
|---|---|
| سطر واحد | ملفين: service و timer |
| الناتج لازم توجّهه بـ [[>> log 2>&1]] | الناتج في [[journalctl -u backup.service]] لوحده |
| مفيش حالة | [[status]] بيقول نجحت ولا فشلت آخر مرة |
| السيرفر مقفول وقت الميعاد = المهمة ضاعت | [[Persistent=true]] بيشغّلها أول ما يقوم |
| [[crontab.guru]] يتأكد من الميعاد | [[systemd-analyze calendar]] |

ومتنساش: [[daemon-reload]] بعد أي تعديل، و [[enable]] للـ timer مش للـ service.`,
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
          teach: R`## الأول: الدرس ده هو «اتأكد إنه شغال»

كتبت الملفين في الدرس اللي فات. دلوقتي ٧ أوامر: فعّل، واسأل إمتى، وجرّب بإيدك، واقرا الناتج. اتشغّلوا بالترتيب ده على أوبونتو 24.04 جوه Docker بـ systemd شغال، والـ [[backup.sh]] بتاع التجربة بيطبع [[backup started as deploy]] ويستنى ثانيتين ويطبع [[backup done]].

---

## ١. [[sudo systemctl daemon-reload]]

[[systemctl]] هو أمر التحكم في systemd (ctl من control). و [[daemon-reload]] بيقوله «اقرا ملفات الـ units من الديسك تاني». لازم بعد أي ملف جديد أو تعديل. مبيطبعش حاجة لو نجح.

---

## ٢. [[sudo systemctl enable --now backup.timer]]

~~~text الناتج
Created symlink /etc/systemd/system/timers.target.wants/backup.timer → /etc/systemd/system/backup.timer.
~~~

| الحتة | معناها |
|---|---|
| [[enable]] | اعمل الاختصار ده عشان الـ timer يقوم مع كل boot |
| [[--now]] | وابدأه دلوقتي كمان (من غيرها هيستنى أول ريستارت) |
| [[backup.timer]] | الـ timer مش الـ service |

---

## ٣. [[systemctl list-timers]]

مش محتاج sudo عشان تقرا بس. ده الناتج الحقيقي (السيرفر فيه timers أوبونتو نفسه):

~~~text الناتج
NEXT                           LEFT LAST                          PASSED UNIT                         ACTIVATES
Tue 2026-10-06 11:51:17 UTC 4min 2s -                                  - systemd-tmpfiles-clean.timer systemd-tmpfiles-clean.service
Tue 2026-10-06 12:09:00 UTC   21min Tue 2026-10-06 11:39:10 UTC 8min ago phpsessionclean.timer        phpsessionclean.service
Tue 2026-10-06 18:10:34 UTC      6h -                                  - apt-daily.timer              apt-daily.service
Wed 2026-10-07 00:00:00 UTC     12h -                                  - logrotate.timer              logrotate.service
Wed 2026-10-07 03:02:42 UTC     15h -                                  - backup.timer                 backup.service
Wed 2026-10-07 06:18:38 UTC     18h -                                  - apt-daily-upgrade.timer      apt-daily-upgrade.service
...
9 timers listed.
Pass --all to see loaded but inactive timers, too.
~~~

نقرا الأعمدة:

| العمود | معناه | في سطر backup |
|---|---|---|
| [[NEXT]] | المرة الجاية إمتى | بكرة [[03:02:42]] (الـ ٣ + تأخير عشوائي من [[RandomizedDelaySec]]) |
| [[LEFT]] | فاضل قد إيه | [[15h]] |
| [[LAST]] | آخر مرة الـ timer شغّلها | [[-]] لسه مشغّلهاش |
| [[PASSED]] | من قد إيه | [[-]] |
| [[UNIT]] | اسم الـ timer | [[backup.timer]] |
| [[ACTIVATES]] | بيشغّل أنهي service | [[backup.service]] |

لاحظ إن [[LAST]] فاضل [[-]] حتى بعد ما شغّلنا الـ service بإيدك: العمود ده بيعدّ المرات اللي الـ timer هو اللي شغّلها بس. وفي القايمة timers بتاعة أوبونتو نفسه: [[apt-daily]] (تحديث قايمة البرامج) و [[logrotate]] (قص اللوجات). يعني النظام نفسه بيستخدم timers مش cron.

---

## ٤. [[systemctl list-timers --all]]

[[--all]] بيضيف الـ timers المتسطّبة بس واقفة. في التجربة زاد سطر واحد:

~~~text السطر الزيادة
-                                 - -                                  - fstrim.timer                 fstrim.service

10 timers listed.
~~~

كله [[-]] لأنه مش متفعّل. لو الـ timer بتاعك ظاهر هنا بس ومش في الأمر من غير [[--all]]: نسيت [[enable --now]].

---

## ٥. [[sudo systemctl start backup.service]]

شغّل الـ **service** دلوقتي، بنفس اليوزر والبيئة اللي الـ timer هيستخدمهم الساعة ٣. ده أحسن اختبار: لو اشتغل هنا هيشتغل بالليل. الأمر بيستنى لحد ما يخلص (لأنه [[oneshot]])، ومبيطبعش حاجة لو نجح.

---

## ٦. [[journalctl -u backup.service --since today]]

| الحتة | معناها |
|---|---|
| [[journalctl]] | اقرا اللوج المركزي بتاع systemd (الـ journal) |
| [[-u backup.service]] | الـ unit دي بس |
| [[--since today]] | من نص الليل النهارده |

في التجربة شغّلتها ٣ مرات (نجاح، وفشل، ونجاح)، والناتج:

~~~text الناتج
Oct 06 11:47:04 vps1 systemd[1]: Starting backup.service - Nightly database backup...
Oct 06 11:47:04 vps1 backup.sh[11945]: backup started as deploy
Oct 06 11:47:06 vps1 backup.sh[11945]: backup done
Oct 06 11:47:06 vps1 systemd[1]: backup.service: Deactivated successfully.
Oct 06 11:47:06 vps1 systemd[1]: Finished backup.service - Nightly database backup.
Oct 06 11:47:13 vps1 systemd[1]: Starting backup.service - Nightly database backup...
Oct 06 11:47:13 vps1 backup.sh[11962]: backup started as deploy
Oct 06 11:47:15 vps1 backup.sh[11962]: backup failed
Oct 06 11:47:15 vps1 systemd[1]: backup.service: Main process exited, code=exited, status=1/FAILURE
Oct 06 11:47:15 vps1 systemd[1]: backup.service: Failed with result 'exit-code'.
Oct 06 11:47:15 vps1 systemd[1]: Failed to start backup.service - Nightly database backup.
...
~~~

كل سطر: الوقت، واسم السيرفر، ومين كتب السطر. [[systemd[1]]] يعني systemd نفسه (رقمه 1 لأنه أول برنامج بيشتغل)، و [[backup.sh[11945]]] يعني السكربت بتاعك ورقم العملية. فبتشوف ناتج السكربت (حتى رسايل الخطأ زي [[backup failed]]) ونتيجة systemd في نفس المكان، من غير ما تكتب [[>> log 2>&1]].

---

## ٧. [[systemctl status backup.service]]

آخر مرة نجحت ولا فشلت، في سطرين:

~~~text الناتج (أوله)
○ backup.service - Nightly database backup
     Loaded: loaded (/etc/systemd/system/backup.service; static)
     Active: inactive (dead) since Tue 2026-10-06 11:47:17 UTC; 33ms ago
TriggeredBy: ● backup.timer
    Process: 11992 ExecStart=/home/deploy/backup.sh (code=exited, status=0/SUCCESS)
~~~

[[status=0/SUCCESS]] = نجحت. ولو فشلت: [[Active: failed]] و [[status=1/FAILURE]]. وفيه كمان [[systemctl status backup.timer]] بيقولك الـ timer نفسه شغال:

~~~text الناتج
● backup.timer - Run backup.service every night
     Loaded: loaded (/etc/systemd/system/backup.timer; enabled; preset: enabled)
     Active: active (waiting) since Tue 2026-10-06 11:47:15 UTC; 2s ago
    Trigger: Wed 2026-10-07 03:00:32 UTC; 15h left
   Triggers: ● backup.service
~~~

[[enabled]] = هيقوم مع السيرفر، و [[active (waiting)]] = شغال ومستني الميعاد. (الـ [[Trigger]] هنا [[03:00:32]] مش زي [[list-timers]] لأن التأخير العشوائي اتحسب تاني بعد الـ enable.)

---

## الخلاصة

| السؤال | الأمر |
|---|---|
| الـ timer متفعّل؟ | [[systemctl status backup.timer]] (enabled و waiting) |
| هيشتغل إمتى؟ | [[systemctl list-timers]] عمود [[NEXT]] |
| اشتغل إمتى آخر مرة؟ | [[list-timers]] عمود [[LAST]] |
| نجح؟ | [[systemctl status backup.service]] و [[status=0/SUCCESS]] |
| طبع إيه؟ | [[journalctl -u backup.service --since today]] |
| جرّبه دلوقتي | [[sudo systemctl start backup.service]] |`,
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
          teach: R`## الأول: باك أب = ملف تقدر ترجّع منه القاعدة

[[pg_dump]] بيقرا قاعدة Postgres وهي شغالة ويكتب ملف فيه كل اللي يعيد بناها، و [[pg_restore]] أو [[psql]] بيرجّعوا منه. المثال ٥ سطور: باك أب واسترجاع عادي، ونفس الكلام لقاعدة جوه Docker، وباك أب بـ connection string (زي Supabase).

اتجرّب كله على كونتينر [[postgres:16-alpine]] اسمه [[db]] (Postgres 16.13)، فيه قاعدة [[mydb]] وجدول [[users]] فيه ٣ صفوف (Ali و Sara و Omar)، وسطري Docker اتشغّلوا من Git Bash على ويندوز.

---

## ١. [[pg_dump -U postgres -d mydb -Fc -f mydb.dump]]

| الحتة | معناها |
|---|---|
| [[pg_dump]] | برنامج الباك أب اللي جاي مع Postgres |
| [[-U postgres]] | ادخل باليوزر postgres (U من user) |
| [[-d mydb]] | القاعدة اللي هتتنسخ (d من database) |
| [[-Fc]] | الصيغة (F من format) [[c]] = custom: مضغوطة، وبترجع بـ pg_restore بس |
| [[-f mydb.dump]] | اكتب في الملف ده (f من file). من غيرها الناتج بيطلع على الشاشة |

الأمر مبيطبعش حاجة لو نجح:

~~~text ls -l mydb.dump
-rw-r--r--    1 root     root          2576 Oct  6 11:35 mydb.dump
~~~

أول ٥ حروف في الملف [[PGDMP]] (توقيع الصيغة)، والباقي binary فمتفتحهوش بـ cat. لو عايز تعرف جواه إيه: [[pg_restore -l mydb.dump]]، وده جزء من ناتجه:

~~~text الناتج (مختصر)
;     dbname: mydb
;     Compression: gzip
;     Format: CUSTOM
;     Dumped from database version: 16.13
;     Dumped by pg_dump version: 16.13
216; 1259 16390 TABLE public users postgres
215; 1259 16389 SEQUENCE public users_id_seq postgres
3411; 0 16390 TABLE DATA public users postgres
~~~

يعني الملف فيه الجدول ([[TABLE]])، والعدّاد اللي بيدّي الـ id ([[SEQUENCE]])، والبيانات ([[TABLE DATA]]) كل واحد لوحده. وده اللي بيخلي custom format يرجّعلك جدول واحد بس لو حبيت ([[pg_restore -t users]]).

---

## ٢. [[pg_restore -U postgres -d mydb --clean mydb.dump]]

[[pg_restore]] بيقرا ملف custom ويرجّعه في القاعدة اللي بعد [[-d]]. و [[--clean]]: امسح كل حاجة موجودة في الملف من القاعدة الأول، وبعدين اعملها من جديد.

جربت: مسحت الجدول بـ [[DROP TABLE users]] وبعدين السطر ده بالظبط:

~~~text الناتج
pg_restore: error: could not execute query: ERROR:  relation "public.users" does not exist
Command was: ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
...
pg_restore: error: could not execute query: ERROR:  table "users" does not exist
Command was: DROP TABLE public.users;
pg_restore: warning: errors ignored on restore: 4
~~~

وخرج بـ 1. بس [[SELECT count(*) FROM users]] بعدها طلّع [[3]]: الاسترجاع نجح! الأخطاء جاية من [[--clean]] نفسه: بيحاول يمسح الجدول والعدّاد والـ primary key وهما مش موجودين أصلًا، وده ٤ أخطاء. الحل تضيف [[--if-exists]] (امسح بس لو موجود):

~~~bash
pg_restore -U postgres -d mydb --clean --if-exists mydb.dump
~~~

نفس التجربة: ولا رسالة، و exit 0، والصفوف التلاتة رجعت. لاحظ إن exit 1 في سكربت باك أب معناه «فشل»، فمن غير [[--if-exists]] السكربت ممكن يفتكر إن الاسترجاع فشل وهو نجح.

---

## ٣. باك أب من كونتينر

~~~bash
docker exec db pg_dump -U postgres mydb | gzip > mydb-$(date +%F).sql.gz
~~~

ننفّذه من جوه لبرة:

| الخطوة | الحتة | بتعمل إيه |
|---|---|---|
| ١ | [[$(date +%F)]] | الشيل بينفّذ اللي جوه [[$( )]] الأول ويحط ناتجه مكانه. [[%F]] = سنة-شهر-يوم، فبيبقى [[2026-10-06]] |
| ٢ | [[docker exec db]] | شغّل اللي بعدي جوه الكونتينر اللي اسمه db |
| ٣ | [[pg_dump -U postgres mydb]] | الباك أب، من غير [[-Fc]] ومن غير [[-f]]: فالناتج نص SQL خارج على الشاشة (stdout) |
| ٤ | الـ pipe | الناتج بيعدّي من الكونتينر لجهازك |
| ٥ | [[gzip]] | يضغطه |
| ٦ | [[> mydb-2026-10-06.sql.gz]] | ويكتبه في ملف على جهازك (مش جوه الكونتينر) |

الملف طلع [[mydb-2026-10-06.sql.gz]] بحجم 784 byte. ولو فكّيته ([[gunzip -c]]) هتلاقي SQL عادي تقدر تقراه (من غير التعليقات):

~~~text الناتج (مختصر)
CREATE TABLE public.users (
    id integer NOT NULL,
    name text
);
CREATE SEQUENCE public.users_id_seq
...
COPY public.users (id, name) FROM stdin;
1	Ali
2	Sara
3	Omar
\.
SELECT pg_catalog.setval('public.users_id_seq', 3, true);
~~~

[[CREATE TABLE]] يعمل الجدول، و [[COPY ... FROM stdin]] بيحط الصفوف اللي تحته لحد [[\.]]، و [[setval]] بيرجّع العدّاد لـ 3 عشان أول صف جديد ياخد 4.

---

## ٤. الاسترجاع للكونتينر

~~~bash
gunzip -c mydb-2026-09-25.sql.gz | docker exec -i db psql -U postgres mydb
~~~

| الحتة | معناها |
|---|---|
| [[gunzip -c]] | فك الضغط واطبع على الشاشة بدل ما تكتب ملف ([[c]] من stdout) |
| [[docker exec -i]] | [[-i]] (interactive): خلّي الكونتينر يقرا اللي جايله من الـ pipe |
| [[psql -U postgres mydb]] | نفّذ الـ SQL اللي جاي على قاعدة mydb |

جربته على قاعدة فاضية جديدة ([[mydb2]]):

~~~text الناتج (آخره)
ALTER SEQUENCE
ALTER TABLE
COPY 3
 setval 
--------
      3
(1 row)

ALTER TABLE
~~~

[[COPY 3]] = ٣ صفوف رجعت. ونفس الأمر من غير [[-i]] مطبعش حاجة خالص ومرجّعش حاجة: psql مكانش شايف الـ pipe. ولو رجّعته على القاعدة القديمة اللي فيها الجدول أصلًا:

~~~text الناتج
ERROR:  relation "users" already exists
ERROR:  duplicate key value violates unique constraint "users_pkey"
~~~

الـ SQL العادي مفيهوش [[--clean]]: رجّعه على قاعدة فاضية، أو اعمل الباك أب من الأول بـ [[pg_dump --clean --if-exists]] عشان أوامر المسح تبقى جوه الملف.

---

## ٥. [[pg_dump "postgresql://user:password@host:5432/postgres" -Fc -f supabase.dump]]

بدل [[-U]] و [[-d]]، كل بيانات الاتصال في رابط واحد (connection string):

~~~text شكل الرابط
postgresql://  user  :  password  @  host  :  5432  /  postgres
  النوع      اليوزر     الباسورد     السيرفر    البورت    اسم القاعدة
~~~

جربته من سيرفر أوبونتو تاني على نفس الشبكة بـ [[postgresql://postgres:secret@db:5432/mydb]]: خلص من غير رسايل وعمل ملف 2600 byte. وبباسورد غلط:

~~~text الناتج
pg_dump: error: connection to server at "db" (172.18.0.3), port 5432 failed: FATAL:  password authentication failed for user "postgres"
~~~

مع Supabase بتاخد الرابط ده جاهز من لوحة التحكم. وخلي بالك: الباسورد مكتوب في الأمر، فبيتحفظ في [[~/.bash_history]]. الأحسن ملف [[~/.pgpass]] (صلاحيته 600)، وpg_dump بيقرا الباسورد منه لوحده.

> نسخة pg_dump لازم تبقى نفس نسخة السيرفر أو أحدث. أوبونتو 24.04 فيه pg_dump 16، فلو السيرفر 17 هيرفض (ده من دليل Postgres، مجربتهوش هنا لأن مفيش سيرفر 17).

---

## الخلاصة

| الصيغة | تعملها بـ | ترجّعها بـ | ميزتها |
|---|---|---|---|
| custom | [[pg_dump -Fc -f file.dump]] | [[pg_restore --clean --if-exists]] | مضغوطة، وترجّع جدول واحد |
| SQL عادي | [[pg_dump]] من غير [[-Fc]] | [[psql]] | نص تقراه بعينك، وتضغطه بـ gzip |

ورجّع أي باك أب على قاعدة تجربة كل فترة: الملف اللي عمرك ما رجّعته مش باك أب مضمون.`,
          lines: [
            "باك أب لقاعدة mydb بالصيغة المضغوطة ([[-Fc]]) في ملف ([[-f]]).",
            "رجّعه، وامسح الموجود الأول ([[--clean]]).",
            "باك أب من كونتينر اسمه db، واضغطه، والاسم فيه تاريخ النهارده.",
            "رجّع باك أب مضغوط لقاعدة في كونتينر. [[-i]] عشان الكونتينر يقرا اللي جاي.",
            "باك أب من Supabase بالـ connection string."
          ],
          sol: R`[[pg_dump -Fc]] مابيطبعش حاجة وبيعمل ملف [[mydb.dump]] (binary، ماتفتحوش بـ cat). بعد [[DROP TABLE users]] و [[pg_restore --clean]] الجدول بيرجع ببياناته، و [[select * from users]] بيوري الصفوف. جربتها على Postgres محلي.

بس فيه تفصيلة هتقابلك: [[pg_restore -d mydb --clean mydb.dump]] بعد ما مسحت الجدول بيطبع [[error: could not execute query: ERROR: table "users" does not exist]] و [[Command was: DROP TABLE public.users;]] و [[warning: errors ignored on restore: 1]] ويخرج بـ 1، مع إن الاسترجاع نجح. ده لأن [[--clean]] بيحاول يمسح الجدول قبل ما يعمله وهو مش موجود أصلًا.

الحل: [[--clean --if-exists]]، وبيه نفس الأمر خلص من غير أي error و exit 0. الغلط الشائع التاني: الاسترجاع بـ psql لملف [[-Fc]]: psql بيرفض ويقول [[The input is a PostgreSQL custom-format dump.]] و [[Use the pg_restore command-line client to restore this dump to a database.]]؛ الـ custom format بيترجع بـ pg_restore بس.`,
          solCode: R`pg_dump -U postgres -d mydb -Fc -f mydb.dump
psql -U postgres -d mydb -c "DROP TABLE users"
pg_restore -U postgres -d mydb --clean --if-exists mydb.dump
psql -U postgres -d mydb -c "SELECT count(*) FROM users"`
        }
      ]
    }
]);
