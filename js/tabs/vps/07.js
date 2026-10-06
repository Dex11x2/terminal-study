// تكملة تاب vps: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/vps/01.js (شرح حقول الدرس في أوله)
MORE("vps", [
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
          teach: R`## الأول: ده ملف إعدادات مش أوامر

المثال مش أوامر تكتبها في الترمنال. ده محتوى ملف اسمه [[/etc/systemd/system/myapp.service]]، بيقول لـ systemd (البرنامج اللي بيقوم أول حاجة في لينكس وبيدير كل الخدمات) ٣ حاجات: تطبيقك إيه، يتشغّل إزاي، ويقوم إمتى. واسم الملف من غير [[.service]] هو اسم الخدمة: [[myapp]].

اتجرّب على أوبونتو 24.04 جوه Docker بـ systemd شغال، و node من apt ([[v18.19.1]] في [[/usr/bin/node]])، وتطبيق صغير بيرد [[ok]] على بورت 3000 وبيطبع سطر أول ما يقوم.

---

## ١. [[[Unit]]]: وصف وترتيب

~~~bash
[Unit]
Description=My Node API
Wants=network-online.target
After=network-online.target
~~~

| السطر | معناه |
|---|---|
| [[[Unit]]] | اسم القسم بين أقواس مربعة. القسم ده موجود في أي unit |
| [[Description=My Node API]] | الاسم اللي هيظهر في status واللوج |
| [[Wants=network-online.target]] | «لما تشغّلني، شغّل كمان الحاجة اللي بتستنى الشبكة» |
| [[After=network-online.target]] | «ومتبدأنيش غير بعد ما تخلص» |

[[.target]] في systemd «نقطة» أو مجموعة، و [[network-online.target]] معناها «الشبكة قامت وليها IP». [[Wants]] لوحدها بتطلب بس من غير ترتيب، و [[After]] لوحدها بتستنى بس لو حد طلبها، فالاتنين مع بعض.

---

## ٢. [[[Service]]]: يتشغّل إزاي

~~~bash
[Service]
Type=simple
User=deploy
WorkingDirectory=/var/www/myapp
ExecStart=/usr/bin/node server.js
Restart=always
RestartSec=5
Environment=NODE_ENV=production
EnvironmentFile=/var/www/myapp/.env
~~~

| السطر | معناه |
|---|---|
| [[Type=simple]] | البرنامج بيفضل شغال، وsystemd يعتبره «قام» أول ما يبدأ |
| [[User=deploy]] | بصلاحيات deploy. لو التطبيق اتخترق، المهاجم مش root |
| [[WorkingDirectory]] | الفولدر اللي البرنامج يبدأ منه، فـ [[server.js]] من غير مسار بيتلاقى هنا |
| [[ExecStart]] | الأمر نفسه، وأوله لازم مسار كامل ([[/usr/bin/node]]) |
| [[Restart=always]] | لو البرنامج خرج لأي سبب، رجّعه |
| [[RestartSec=5]] | استنى ٥ ثواني قبل ما ترجّعه |
| [[Environment=NODE_ENV=production]] | متغير بيئة واحد. أول [[=]] تبع المفتاح، والتاني جوه القيمة |
| [[EnvironmentFile]] | اقرا متغيرات كتير من ملف، كل سطر [[اسم=قيمة]] |

المسار الكامل لـ node تعرفه بـ [[which node]] كيوزر deploy. في التجربة كان [[/usr/bin/node]]، بس لو متسطّب بـ nvm هيبقى حاجة زي [[/home/deploy/.nvm/versions/node/v24.x/bin/node]].

---

## ٣. [[[Install]]]: يقوم إمتى

~~~bash
[Install]
WantedBy=multi-user.target
~~~

[[multi-user.target]] هي حالة السيرفر العادية بعد الـ boot (كل الخدمات قامت، من غير واجهة رسومية). و [[WantedBy]] معناها: لما تعمل [[enable]]، اربط الخدمة بالحالة دي. وده اللي حصل في التجربة:

~~~text sudo systemctl enable --now myapp
Created symlink /etc/systemd/system/multi-user.target.wants/myapp.service → /etc/systemd/system/myapp.service.
~~~

يعني enable مجرد اختصار جوه فولدر [[multi-user.target.wants]]. من غير قسم [[[Install]]]، الـ enable مش هيعرف يعمل حاجة.

---

## ٤. اختبره قبل ما تشغّله: الـ solCode

~~~bash
sudo mkdir -p /var/www/myapp && sudo chown deploy:deploy /var/www/myapp
echo 'require("http").createServer((q, r) => r.end("ok\n")).listen(3000)' > /var/www/myapp/server.js
touch /var/www/myapp/.env
sudo systemd-analyze verify /etc/systemd/system/myapp.service
~~~

| السطر | بيعمل إيه |
|---|---|
| [[mkdir -p]] | اعمل الفولدر (و [[-p]]: والفولدرات اللي قبله لو مش موجودة، ومتعترضش لو موجود) |
| [[chown deploy:deploy]] | خلّي صاحبه deploy (يوزر:جروب)، عشان الخدمة بتشتغل بيه |
| [[echo '...' > server.js]] | سطر JavaScript: سيرفر HTTP بيرد ok على أي طلب، على بورت 3000 |
| [[touch .env]] | اعمل ملف فاضي. [[EnvironmentFile]] من غير [[-]] قبل المسار بيفشل لو الملف مش موجود |
| [[systemd-analyze verify]] | افحص ملف الخدمة من غير ما تشغّله |

الملف السليم: [[verify]] مطبعش حاجة وخرج بـ 0. وبعدين بوّظت نسخة عن قصد ([[Restrat]] بدل [[Restart]]، و node في مسار مش موجود):

~~~text الناتج
/tmp/bad.service:11: Unknown key name 'Restrat' in section 'Service', ignoring.
bad.service: Command /usr/local/bin/node is not executable: No such file or directory
~~~

لاحظ [[ignoring]]: المفتاح الغلط مش بيوقّف الخدمة، بيتجاهله وخلاص، فالخدمة هتقوم من غير Restart ومش هتعرف غير لما تقع. عشان كده [[verify]] قبل أي تشغيل.

ولو [[.env]] مش موجود والـ [[EnvironmentFile]] من غير [[-]]، جربت:

~~~text الناتج
Job for myapp.service failed because of unavailable resources or another system error.
~~~

وفي اللوج: [[Failed to load environment files: No such file or directory]]. لو الملف اختياري اكتبها [[EnvironmentFile=-/var/www/myapp/.env]] (الشرطة قبل المسار = «لو مش موجود عدّي»).

---

## ٥. اشتغل؟

بعد [[daemon-reload]] و [[enable --now]] (الدرس الجاي):

~~~text systemctl status myapp
● myapp.service - My Node API
     Loaded: loaded (/etc/systemd/system/myapp.service; enabled; preset: enabled)
     Active: active (running) since Tue 2026-10-06 11:54:28 UTC; 1s ago
   Main PID: 12245 (node)
...
Oct 06 11:54:28 vps1 node[12245]: listening on 3000, NODE_ENV=production, DB_URL set: true
~~~

السطر الأخير طبعه التطبيق نفسه: [[NODE_ENV=production]] جه من [[Environment]]، و [[DB_URL]] جه من [[.env]] (كان فيه سطر [[DB_URL=...]]). و [[curl localhost:3000]] رجّع [[ok]].

---

## الخلاصة

| القسم | السؤال اللي بيجاوبه | أهم سطر |
|---|---|---|
| [[[Unit]]] | إيه ده، ويستنى مين؟ | [[After=network-online.target]] |
| [[[Service]]] | يتشغّل إزاي وبمين؟ | [[ExecStart]] بمسار كامل، و [[User]]، و [[Restart=always]] |
| [[[Install]]] | يقوم مع السيرفر؟ | [[WantedBy=multi-user.target]] |

ودايمًا: [[systemd-analyze verify]] قبل التشغيل، لأن الغلطة في اسم مفتاح بتتجاهل بسكوت.`,
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
          teach: R`## الأول: ٥ أوامر، من الملف للخدمة الشغالة

المثال هو الخطوات بالترتيب: اكتب الملف، خلّي systemd يقراه، شغّله وفعّله، اتأكد، وتابع اللوج. كلهم اتجرّبوا على أوبونتو 24.04 جوه Docker بـ systemd شغال، بملف [[myapp.service]] بتاع الدرس اللي فات.

---

## ١. [[sudo nano /etc/systemd/system/myapp.service]]

[[nano]] محرر نصوص في الترمنال، و [[sudo]] لأن [[/etc]] محتاج root عشان تكتب فيه. الحفظ Ctrl+O ثم Enter، والخروج Ctrl+X.

---

## ٢. [[sudo systemctl daemon-reload]]

systemd شايل نسخة من ملفات الخدمات في الذاكرة. لو عدّلت ملف ومعملتش reload، هو لسه شغال بالنسخة القديمة، و [[status]] بيحذرك. جربت: غيّرت [[RestartSec]] في الملف ومعملتش reload:

~~~text systemctl status myapp
Warning: The unit file, source configuration file or drop-ins of myapp.service changed on disk. Run 'systemctl daemon-reload' to reload units.
~~~

يعني «الملف اتغير على الديسك، اعمل daemon-reload». بعد الأمر التحذير بيختفي. والأمر مبيطبعش حاجة لو نجح.

> [[daemon-reload]] بيقرا الملفات بس، مش بيعمل restart للخدمة. لو الخدمة شغالة وعدّلت ملفها: [[daemon-reload]] وبعدين [[restart]].

---

## ٣. [[sudo systemctl enable --now myapp]]

| الحتة | معناها |
|---|---|
| [[enable]] | قوم مع كل boot (بيعمل اختصار في [[multi-user.target.wants]]) |
| [[--now]] | وشغّلها دلوقتي كمان، بدل ما تكتب [[start]] لوحده |
| [[myapp]] | اسم الخدمة. [[.service]] في الآخر اختيارية |

~~~text الناتج
Created symlink /etc/systemd/system/multi-user.target.wants/myapp.service → /etc/systemd/system/myapp.service.
~~~

---

## ٤. [[systemctl status myapp]]

مش محتاج sudo عشان تقرا. ده الناتج بعد ثانية:

~~~text الناتج
● myapp.service - My Node API
     Loaded: loaded (/etc/systemd/system/myapp.service; enabled; preset: enabled)
     Active: active (running) since Tue 2026-10-06 11:54:28 UTC; 1s ago
   Main PID: 12245 (node)
      Tasks: 10 (limit: 18825)
     Memory: 14.8M (peak: 15.0M)
        CPU: 109ms
     CGroup: /docker/996f73b3ce6d.../system.slice/myapp.service
             └─12245 /usr/bin/node server.js

Oct 06 11:54:28 vps1 systemd[1]: Started myapp.service - My Node API.
Oct 06 11:54:28 vps1 node[12245]: listening on 3000, NODE_ENV=production, DB_URL set: true
~~~

| السطر | معناه |
|---|---|
| [[●]] | دايرة خضرا = شغالة. [[○]] واقفة، و [[×]] فشلت |
| [[Loaded: ... enabled]] | الملف اتقري، والخدمة هتقوم مع الـ boot |
| [[preset: enabled]] | الإعداد الافتراضي للتوزيعة، مش مهم هنا |
| [[Active: active (running) since ...]] | شغالة من الوقت ده |
| [[Main PID: 12245 (node)]] | رقم العملية الأساسية واسم البرنامج |
| [[Tasks]] و [[Memory]] و [[CPU]] | عدد الـ threads، والرام اللي بتاكلها، ووقت المعالج اللي استهلكته لحد دلوقتي |
| [[CGroup]] | كل العمليات اللي تبع الخدمة (systemd بيتابعهم كلهم) |
| آخر سطور | آخر لوجات الخدمة، ومنها سطر التطبيق نفسه |

(سطر [[CGroup]] أوله [[/docker/...]] لأن التجربة جوه Docker، على VPS حقيقي بيبدأ بـ [[/system.slice/]] على طول.)

---

## ٥. [[journalctl -u myapp -f]]

[[-u myapp]] لوجات الخدمة دي بس، و [[-f]] (follow) استنى واطبع أي سطر جديد لحد ما تدوس Ctrl+C. أي [[console.log]] أو [[console.error]] في تطبيقك بيروح هنا.

---

## ٦. التجربة: اقتلها وشوفها بترجع

خدت الـ PID من status وقتلته:

~~~bash
sudo kill 12245
~~~

[[kill]] من غير رقم إشارة بيبعت SIGTERM («اقفل لو سمحت»). بعد ثانية:

~~~text systemctl status myapp (بعد ثانية)
     Active: activating (auto-restart) since Tue 2026-10-06 11:54:39 UTC; 997ms ago
~~~

[[activating (auto-restart)]] = مستنية الـ ٥ ثواني بتوع [[RestartSec]]. وبعد ٥ ثواني:

~~~text systemctl status myapp (بعد ٦ ثواني)
     Active: active (running) since Tue 2026-10-06 11:54:44 UTC; 905ms ago
   Main PID: 12316 (node)
~~~

PID جديد ووقت بداية جديد. واللوج بيحكي الحكاية:

~~~text journalctl -u myapp -n 5
Oct 06 11:54:39 vps1 systemd[1]: myapp.service: Deactivated successfully.
Oct 06 11:54:44 vps1 systemd[1]: myapp.service: Scheduled restart job, restart counter is at 1.
Oct 06 11:54:44 vps1 systemd[1]: Started myapp.service - My Node API.
Oct 06 11:54:44 vps1 node[12316]: listening on 3000, NODE_ENV=production, DB_URL set: true
~~~

لاحظ الفرق بين [[11:54:39]] و [[11:54:44]]: ٥ ثواني بالظبط. و [[-n 5]] معناها آخر ٥ سطور.

### بس [[stop]] غير [[kill]]

[[sudo systemctl stop myapp]] وبعده ٦ ثواني: [[systemctl is-active myapp]] طبع [[inactive]]. الـ Restart بيشتغل لما البرنامج يخرج لوحده، مش لما انت توقفه بـ systemctl.

### ولو التطبيق بيقع أول ما يقوم

خليت [[server.js]] فيه [[throw new Error("boom")]]:

~~~text الناتج
     Active: activating (auto-restart) (Result: exit-code) since Tue 2026-10-06 11:55:10 UTC; 1s ago
    Process: 12383 ExecStart=/usr/bin/node server.js (code=exited, status=1/FAILURE)
~~~

والخدمة بتفضل تحاول كل ٥ ثواني ([[restart counter is at 2]] ثم 3 ...). السبب الحقيقي مش في status، في اللوج: [[journalctl -u myapp -n 50]] طلّع [[Error: boom]] ورقم السطر في [[server.js]].

---

## الخلاصة

| عملت إيه | الأمر |
|---|---|
| ملف خدمة جديد أو عدّلته | [[sudo systemctl daemon-reload]] |
| أول مرة | [[sudo systemctl enable --now myapp]] |
| عدّلت كود التطبيق | [[sudo systemctl restart myapp]] |
| عدّلت ملف الخدمة والخدمة شغالة | [[daemon-reload]] ثم [[restart]] |
| عايز تعرف حالتها | [[systemctl status myapp]] |
| عايز تعرف ليه وقعت | [[journalctl -u myapp -n 50]] |`,
          lines: [
            "اكتب ملف الخدمة.",
            "خلّي systemd يقرا الملفات من جديد.",
            "شغّلها دلوقتي ومع كل ريستارت.",
            "حالتها وآخر لوجات.",
            "تابع لوجاتها لايف."
          ],
          sol: R`[[systemctl status myapp]] بيوري [[Active: active (running) since ...]] و [[Main PID: 1234 (node)]]. خد الرقم ده، و [[sudo kill 1234]]، واستنى 5 ثواني، و [[status]] تاني: [[Active: active (running) since]] بوقت جديد من ثواني، و [[Main PID]] رقم جديد.

و [[journalctl -u myapp -n 5]] بيوري اللي حصل: [[myapp.service: Deactivated successfully.]] (الـ kill العادي بيبعت SIGTERM، و node بيقفل بيه بهدوء)، وبعد ٥ ثواني بالظبط [[Scheduled restart job, restart counter is at 1.]] و [[Started myapp.service - My Node API.]]. ده [[Restart=always]] و [[RestartSec=5]].

جربتها على أوبونتو 24.04 جوه Docker بـ systemd شغال. الغلط الشائع: الخدمة مش بترجع بعد [[systemctl stop myapp]]؛ ده مقصود، الـ restart للموت المفاجئ بس. ولو [[Active: activating (auto-restart) (Result: exit-code)]] و [[restart counter]] بيزيد كل ٥ ثواني، التطبيق بيقع أول ما يقوم؛ اقرا [[journalctl -u myapp -n 50]] وهتلاقي الـ error بتاع node نفسه.`
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
          teach: R`## الأول: لوج واحد كبير، وانت بتفلتر

systemd بيجمع لوجات كل الخدمات والـ kernel في مكان واحد اسمه **journal**، و [[journalctl]] بيقراه (ctl من control). من غير فلاتر بيطبع آلاف السطور، فكل سطر في المثال فلتر. اتجرّب على أوبونتو 24.04 جوه Docker بـ systemd شغال، بعد تجارب الخدمة [[myapp]] والـ timer [[backup]] في الدروس اللي فاتت.

---

## ١. [[journalctl -u myapp --since "1 hour ago"]]

| الحتة | معناها |
|---|---|
| [[-u myapp]] | الـ unit دي بس (u من unit) |
| [[--since "1 hour ago"]] | من ساعة لحد دلوقتي. علامات التنصيص لأن فيه مسافات |

~~~text الناتج (أوله)
Oct 06 11:54:28 vps1 systemd[1]: Started myapp.service - My Node API.
Oct 06 11:54:28 vps1 node[12245]: listening on 3000, NODE_ENV=production, DB_URL set: true
Oct 06 11:54:39 vps1 systemd[1]: myapp.service: Deactivated successfully.
Oct 06 11:54:44 vps1 systemd[1]: myapp.service: Scheduled restart job, restart counter is at 1.
Oct 06 11:54:44 vps1 systemd[1]: Started myapp.service - My Node API.
~~~

كل سطر: الوقت، واسم السيرفر، ومين كتبه ورقم عمليته بين أقواس، والرسالة. [[systemd[1]]] سطور systemd عن الخدمة، و [[node[12245]]] اللي التطبيق طبعه.

و [[--since]] بيفهم أشكال كتير، ومعاه [[--until]] لحد وقت:

| الشكل | معناه |
|---|---|
| [["1 hour ago"]] و [["30 min ago"]] | من فترة لحد دلوقتي |
| [[today]] و [[yesterday]] | من نص ليل النهارده أو امبارح |
| [["2026-10-06 11:54"]] | من وقت محدد |

جربت [[--since "2026-10-06 11:54" --until "2026-10-06 11:55"]] وطلّع السطور اللي في الدقيقة دي بس.

---

## ٢. [[journalctl -p err -b]]

| الحتة | معناها |
|---|---|
| [[-p err]] | priority: مستوى [[err]] وأخطر منه بس |
| [[-b]] | من آخر boot بس (آخر مرة السيرفر قام) |

مستويات الخطورة من الأخطر:

| الرقم | الاسم |
|---|---|
| 0 | [[emerg]] |
| 1 | [[alert]] |
| 2 | [[crit]] |
| 3 | [[err]] |
| 4 | [[warning]] |
| 5 | [[notice]] |
| 6 | [[info]] |
| 7 | [[debug]] |

فـ [[-p err]] = من 0 لـ 3. وده جزء من الناتج في التجربة:

~~~text الناتج (مختصر)
Oct 06 11:47:15 vps1 systemd[1]: Failed to start backup.service - Nightly database backup.
Oct 06 11:54:51 vps1 systemd[1]: myapp.service: Failed to load environment files: No such file or directory
Oct 06 11:54:51 vps1 systemd[1]: Failed to start myapp.service - My Node API.
~~~

الأخطاء دي هي اللي عملتها بإيدي في الدروس اللي فاتت (سكربت باك أب خرج بـ 1، وملف [[.env]] مش موجود). وكان فوقهم سطور من [[kernel]] كمان، لأن الـ kernel بيكتب في نفس الـ journal. وعلى VPS سليم ممكن تلاقي سطور قليلة أو [[-- No entries --]].

### [[-b -1]]: الـ boot اللي قبله

[[-b -1]] معناها «الـ boot اللي قبل الأخير»، مفيد بعد ريستارت مفاجئ: إيه اللي حصل قبل ما يقع؟ في التجربة السيرفر مقامش غير مرة واحدة:

~~~text journalctl --list-boots
IDX BOOT ID                          FIRST ENTRY                 LAST ENTRY
  0 68477dee593648be868a85f1442c68fc Tue 2026-10-06 08:36:18 UTC Tue 2026-10-06 11:55:12 UTC
~~~

[[IDX]] رقم الـ boot: [[0]] الحالي و [[-1]] اللي قبله. فـ [[-b -1]] طلّع:

~~~text الناتج
No journal boot entry found from the specified boot offset (-1).
~~~

وعلى سيرفر الـ journal بتاعه مش بيتحفظ على الديسك أصلًا، الرسالة بتبقى غير كده (في الحل تحت)، والحل فولدر [[/var/log/journal]].

---

## ٣. [[journalctl --disk-usage]]

~~~text الناتج
Archived and active journals take up 24.0M in the file system.
~~~

[[active]] الملف اللي بيتكتب فيه دلوقتي، و [[archived]] الملفات القديمة اللي اتقفلت. 24 ميجا على سيرفر لسه جديد، وعلى سيرفر شغال من شهور ممكن تبقى جيجات.

---

## ٤. [[sudo journalctl --vacuum-time=7d]]

[[vacuum]] يعني «نضّف»، و [[--vacuum-time=7d]]: امسح الملفات المؤرشفة اللي كل اللي فيها أقدم من ٧ أيام ([[d]] = days). و [[sudo]] لأنه بيمسح من [[/var/log]].

~~~text الناتج
Vacuuming done, freed 0B of archived journals from /var/log/journal.
Vacuuming done, freed 0B of archived journals from /run/log/journal.
Vacuuming done, freed 0B of archived journals from /var/log/journal/9152e6aeb61a442792ef04afbcd79a32.
~~~

[[freed 0B]] لأن السيرفر جديد ومفيش حاجة أقدم من أسبوع. ولاحظ إنه بيمسح المؤرشف بس، مش الملف اللي شغال. وفيه كمان [[--vacuum-size=500M]]: سيب آخر 500 ميجا بس.

---

## ٥. ليه أحيانًا مش شايف حاجة؟

كيوزر عادي (deploy) جربت [[journalctl -u myapp -n 2]]:

~~~text الناتج
Hint: You are currently not seeing messages from other users and the system.
      Users in groups 'adm', 'systemd-journal' can see all messages.
      Pass -q to turn off this notice.
~~~

يعني اليوزر العادي بيشوف رسايله هو بس (السطور اللي طبعها التطبيق ظهرت لأن الخدمة شغالة بيوزر deploy نفسه، لكن سطور systemd عنها مظهرتش). الحل [[sudo journalctl ...]]، أو تضيف اليوزر لجروب [[adm]].

---

## الخلاصة

| عايز | الفلتر |
|---|---|
| خدمة واحدة | [[-u myapp]] |
| من وقت | [[--since "1 hour ago"]] و [[--until]] |
| الأخطاء بس | [[-p err]] |
| من آخر تشغيل للسيرفر | [[-b]]، واللي قبله [[-b -1]] |
| آخر كام سطر | [[-n 50]] |
| متابعة لايف | [[-f]] |
| المساحة | [[--disk-usage]] و [[sudo journalctl --vacuum-time=7d]] |

والفلاتر بتتجمع: [[journalctl -u myapp -p err --since yesterday]] = أخطاء myapp من امبارح لحد دلوقتي.`,
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
    }
]);
