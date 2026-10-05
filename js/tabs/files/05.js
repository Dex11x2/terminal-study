// تكملة تاب files: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/files/01.js (شرح حقول الدرس في أوله)
MORE("files", [
    {
      t: "ملفات السيرفر وملفات التوثيق",
      l: 2,
      n: "اللي هتعدّله على أي VPS: إعدادات Nginx، وملف .service بتاع systemd، و crontab للمهام المتكررة. وملفات README و LICENSE و CHANGELOG اللي في أول أي repo",
      items: [
        {
          cmd: "nginx.conf",
          title: "ملف إعدادات Nginx بيتكتب إزاي، وبتتأكد إنه سليم قبل ما توقّع الموقع إزاي؟",
          desc: R`Nginx ليه صيغة إعدادات خاصة بيه (مش INI ولا YAML)، والملفات امتدادها [[.conf]]. التفاصيل في تاب Nginx.

فين الملفات:
• [[/etc/nginx/nginx.conf]]: الملف الرئيسي، وبيعمل [[include]] للباقي.
• [[/etc/nginx/conf.d/*.conf]]: ملف لكل موقع (في الـ Docker image وتوزيعات كتير).
• [[/etc/nginx/sites-available/]] و [[sites-enabled/]] (أوبونتو): بتكتب الملف في available وتعمل له link في enabled عشان يتفعّل.

الصيغة:
• directive: [[name value;]]، والـ [[;]] في الآخر إجبارية.
• block: [[name { ... }]]، وجواه directives أو blocks تانية. [[http]] فيه [[server]] (موقع)، و [[server]] فيه [[location]] (مسار).
• [[#]] تعليق.
• [[$uri]] و [[$host]] و [[$remote_addr]]: متغيرات جاهزة عن الطلب.
• [[location /api/]]: أي مسار بيبدأ بـ [[/api/]]. و [[location ~* \.(css|js)$]]: regex ([[~*]] يعني من غير ما يفرّق بين الحروف الكبيرة والصغيرة).

أهم directives:
• [[listen 80;]] و [[server_name gym.example.com;]]: البورت والدومين.
• [[root /var/www/gym/dist;]] و [[index index.html;]]: الملفات الثابتة.
• [[try_files $uri $uri/ /index.html;]]: لو الملف مش موجود رجّع [[index.html]] (لازم لتطبيقات React و Vue).
• [[proxy_pass http://127.0.0.1:3000;]]: ابعت الطلب لتطبيق شغال على بورت تاني (reverse proxy).
• [[client_max_body_size 10m;]]: أقصى حجم رفع (الافتراضي 1m، وده سبب [[413 Request Entity Too Large]]).

القاعدة الذهبية: قبل أي reload: [[sudo nginx -t]]. بيقرا كل الإعدادات ويقولك سليمة ولا لأ ورقم السطر الغلط. وبعدين [[sudo systemctl reload nginx]] (reload مش restart: الموقع ميقفش ثانية).`,
          example: R`# موقع الجيم: الواجهة ملفات ثابتة، والـ API على Node
server {
    listen 80;
    server_name gym.example.com;
    root /var/www/gym/dist;
    index index.html;
    client_max_body_size 10m;
    location / {
        try_files $uri $uri/ /index.html;
    }
    location /api/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
    location ~* \.(css|js|png|jpg|svg|woff2)$ {
        expires 30d;
    }
}`,
          flag: "script",
          try: R`احفظ المثال في [[gym.conf]] وافحصه بـ Nginx اللي في Docker: [[docker run --rm -v "$PWD/gym.conf":/etc/nginx/conf.d/default.conf:ro nginx:alpine nginx -t]]. بعدين شيل [[;]] من آخر سطر [[listen 80]] وافحص تاني واقرا الرسالة ورقم السطر. وجرّب كمان تشيل [[}]] من الآخر.`,
          deep: {
            why: R`Nginx بيقف قدام تطبيقك: بيستقبل كل الطلبات، ويبعت الملفات الثابتة بنفسه بسرعة، ويحوّل طلبات الـ API للتطبيق، ويتعامل مع HTTPS. وإعداداته بتتكتب مرة وتتعدّل نادرًا، فلازم تبقى فاهم كل سطر لأن غلطة فيها بتوقّع كل المواقع اللي على السيرفر.`,
            how: R`Nginx بيقرا [[nginx.conf]] ويتبع الـ includes، ويبني شجرة من الـ blocks. لكل طلب بيختار الـ [[server]] بالـ [[listen]] و [[server_name]]، وجواه بيختار [[location]] الأنسب للمسار (الـ regex والمطابقة الأطول ليهم قواعد أولوية). و [[nginx -t]] بيعمل نفس القراية من غير ما يشغّل حاجة.`,
            when: R`كل ما تنشر موقع على VPS، أو تضيف دومين، أو تغيّر حجم الرفع، أو تفعّل HTTPS (certbot بيعدّل نفس الملف ويضيف [[listen 443 ssl]]).`,
            mistakes: R`تنسى [[;]] فالرسالة تشاور على السطر اللي بعده ([[invalid parameter "server_name"]]). تعمل [[restart]] من غير [[nginx -t]] فالسيرفر ميقومش والمواقع كلها تقع. تكتب [[proxy_pass http://127.0.0.1:3000/;]] بـ [[/]] في الآخر وانت مش فاهم إنها بتشيل [[/api]] من المسار. وتعدّل في [[sites-available]] وتنسى الـ link في [[sites-enabled]].`
          },
          lines: [
            R`block لموقع واحد.`,
            R`استقبل على بورت 80 (HTTP)، و [[;]] في الآخر.`,
            R`للدومين ده.`,
            R`فولدر الملفات الثابتة (ناتج [[npm run build]]).`,
            R`الملف الافتراضي لأي فولدر.`,
            R`أقصى حجم للـ request: 10 ميجا.`,
            R`أي مسار.`,
            R`جرّب الملف، بعدين فولدر، وإلا رجّع [[index.html]].`,
            R`قفل.`,
            R`أي مسار بيبدأ بـ [[/api/]].`,
            R`ابعته للتطبيق اللي على بورت 3000.`,
            R`ابعت الدومين الأصلي للتطبيق.`,
            R`وابعت IP الزائر الحقيقي.`,
            R`قفل.`,
            R`regex: أي ملف بيخلص بالامتدادات دي.`,
            R`المتصفح يحفظه 30 يوم (cache).`,
            R`قفل.`,
            R`قفل الـ server.`
          ],
          sol: R`الملف السليم:
[[nginx: the configuration file /etc/nginx/nginx.conf syntax is ok]]
[[nginx: configuration file /etc/nginx/nginx.conf test is successful]]
(قبلهم سطور [[/docker-entrypoint.sh: ...]] من الـ image، تجاهلها.)

من غير [[;]] بعد [[listen 80]]:
[[nginx: [emerg] invalid parameter "server_name" in /etc/nginx/conf.d/default.conf:4]]
[[nginx: configuration file /etc/nginx/nginx.conf test failed]]
لاحظ إنه بيشاور على السطر ٤ ([[server_name]]) لأنه قرا [[listen 80 server_name gym.example.com]] كأمر واحد. ومن غير [[}]] الأخيرة بيقول [[nginx: [emerg] unexpected end of file, expecting "}" in /etc/nginx/conf.d/default.conf:19]].`
        },
        {
          cmd: ".service",
          title: "ملف systemd .service بيخلي التطبيق يشتغل لوحده ويقوم بعد الـ reboot إزاي؟",
          desc: R`على أي سيرفر لينكس حديث، systemd هو اللي بيشغّل الخدمات (Nginx و PostgreSQL و Docker). وتقدر تخلي تطبيقك خدمة زيهم بملف [[.service]] (اسمه unit file): يشتغل مع تشغيل السيرفر، ويقوم لوحده لو وقع، والـ logs بتاعته تتجمع في journald.

الصيغة شبه INI (درس [[.ini]]): أقسام و [[Key=Value]]:
• [[[Unit]]]: وصف وترتيب: [[Description=]] و [[After=network.target]] (ابدأ بعد الشبكة).
• [[[Service]]]: إزاي يشتغل:
  [[ExecStart=/usr/bin/node server.js]]: الأمر، والمسار لازم يبقى كامل (مفيش PATH بتاعك).
  [[WorkingDirectory=]] و [[User=]] (متشغّلش كـ root).
  [[EnvironmentFile=/srv/app/.env]] أو [[Environment=PORT=3000]].
  [[Restart=on-failure]] و [[RestartSec=5]]: لو وقع استنى ٥ ثواني وشغّله تاني.
  [[Type=simple]]: البرنامج بيفضل شغال في الـ foreground (ده العادي لـ Node و Python).
• [[[Install]]]: [[WantedBy=multi-user.target]] يعني «شغّله مع الـ boot العادي» لما تعمل enable.

مكانه: [[/etc/systemd/system/gym-api.service]]. والاسم من غير [[.service]] هو اللي بتستخدمه في الأوامر.

الأوامر بالترتيب بعد ما تكتب أو تعدّل الملف:
• [[sudo systemctl daemon-reload]]: خلّي systemd يقرا الملفات من تاني (لازم بعد أي تعديل).
• [[sudo systemctl enable --now gym-api]]: فعّله مع الـ boot وشغّله دلوقتي.
• [[systemctl status gym-api]]: شغال ولا لأ وآخر سطور الـ log.
• [[journalctl -u gym-api -f]]: الـ logs كاملة وهي بتتكتب.
• [[sudo systemctl restart gym-api]] بعد أي deploy.
و [[systemd-analyze verify file.service]] بيفحص الملف.

وأنواع units تانية بنفس الصيغة: [[.timer]] (بديل cron)، و [[.socket]]، و [[.mount]]. وبدايل لـ Node: PM2 (بيعمل [[ecosystem.config.js]])، أو Docker بـ [[restart: unless-stopped]].`,
          example: R`# /etc/systemd/system/gym-api.service
[Unit]
Description=Gym API (Node)
After=network.target

[Service]
Type=simple
User=deploy
WorkingDirectory=/srv/gym-api
EnvironmentFile=/srv/gym-api/.env
ExecStart=/usr/bin/node server.js
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target`,
          flag: "script",
          try: R`على جهاز لينكس فيه systemd (أوبونتو، مش WSL القديم ولا Docker): احفظ المثال في [[gym-api.service]] وافحصه [[systemd-analyze verify ./gym-api.service]] واقرا التحذيرات (غالبًا هيقولك إن [[/usr/bin/node]] مش موجود لو Node متسطّب بـ nvm: [[which node]] يقولك المسار الحقيقي). بعدين اعمل ملف فيه [[Restart=sometimes]] وافحصه. ولو عندك VPS، طبّقه على تطبيق حقيقي بالأوامر اللي في الشرح.`,
          deep: {
            why: R`لو شغّلت [[node server.js]] في ترمنال ssh، أول ما تقفل الـ ssh التطبيق يموت، ولو وقع أو السيرفر عمل reboot محدش هيشغّله. systemd بيحل التلاتة: بيشغّله في الخلفية، ويراقبه، ويقوّمه مع الـ boot.`,
            how: R`systemd بيقرا الـ unit files من [[/etc/systemd/system/]] و [[/lib/systemd/system/]]. [[enable]] بيعمل symlink في [[multi-user.target.wants/]] فالخدمة تتشغّل مع الـ target ده وقت الـ boot. ولما يشغّلها، بيمسك الـ process ويحط stdout و stderr في journald، ولو خرجت بكود غير صفر و [[Restart=on-failure]] بيستنى [[RestartSec]] ويشغّلها تاني.`,
            when: R`أي تطبيق (API أو bot أو worker) شغال مباشرة على VPS من غير Docker.`,
            mistakes: R`[[ExecStart=node server.js]] من غير المسار الكامل. Node متسطّب بـ nvm (في فولدر اليوزر) فالمسار [[/usr/bin/node]] مش موجود. تعدّل الملف وتنسى [[daemon-reload]] فالتعديل ميتطبقش. [[EnvironmentFile]] فيه [[export]] أو تنصيص غريب (systemd بيقرا [[KEY=value]] بس). وتشغّله كـ root.`
          },
          lines: [
            R`قسم الوصف والترتيب.`,
            R`وصف بيظهر في [[systemctl status]].`,
            R`ابدأ بعد ما الشبكة تقوم.`,
            R`قسم التشغيل.`,
            R`البرنامج بيفضل شغال في الـ foreground.`,
            R`اليوزر اللي هيشغّله (مش root).`,
            R`الفولدر اللي هيتشغّل منه.`,
            R`متغيرات البيئة من ملف.`,
            R`الأمر بمسار كامل.`,
            R`لو خرج بغلط شغّله تاني...`,
            R`...بعد ٥ ثواني.`,
            R`قسم التفعيل.`,
            R`[[enable]] يربطه بالـ boot العادي.`
          ],
          sol: R`[[systemd-analyze verify ./gym-api.service]] على جهاز Node فيه متسطّب بـ nvm:
[[gym-api.service: Command /usr/bin/node is not executable: No such file or directory]]
(ممكن تشوف كمان تحذيرات عن units تانية على جهازك، تجاهلها.) والحل تكتب المسار اللي [[which node]] بيطبعه، أو تسطّب Node من الـ package manager على السيرفر.

والملف اللي فيه [[Restart=sometimes]]:
[[bad.service:3: Failed to parse service restart specifier, ignoring: sometimes]]
لاحظ كلمة [[ignoring]]: systemd مش بيرفض الملف، بيتجاهل السطر ده بس ويكمّل، فالخدمة هتشتغل من غير restart وانت فاكر إنه موجود.`
        },
        {
          cmd: "crontab",
          title: "crontab بيتكتب إزاي، والنجوم الخمسة (* * * * *) معناها إيه؟",
          desc: R`cron هو منبّه لينكس: بيشغّل أوامر في أوقات ثابتة (backup كل يوم الساعة ٣، تنضيف كل ساعة، تقرير كل اتنين). والجدول بتاعه اسمه crontab: ملف نصي، كل سطر مهمة.

شكل السطر: ٥ خانات للوقت وبعدهم الأمر:
[[دقيقة ساعة يوم-في-الشهر شهر يوم-في-الأسبوع الأمر]]
• الدقيقة 0-59، والساعة 0-23، واليوم 1-31، والشهر 1-12، ويوم الأسبوع 0-7 (0 و 7 الحد، 1 الاتنين).
• [[*]]: أي قيمة.
• [[*/5]]: كل ٥ (في خانة الدقيقة: كل ٥ دقايق).
• [[1-5]]: من لـ (الاتنين للجمعة).
• [[1,15]]: القيم دي بس.
• اختصارات: [[@reboot]] (مرة مع تشغيل الجهاز)، و [[@daily]] و [[@hourly]] و [[@weekly]].
• [[#]] تعليق.
أمثلة: [[0 3 * * *]] كل يوم الساعة 3:00، و [[30 9 * * 1-5]] الساعة 9:30 أيام الشغل، و [[0 0 1 * *]] أول كل شهر.

بتعدّله إزاي: [[crontab -e]] (بيفتح المحرر على crontab بتاع اليوزر بتاعك)، و [[crontab -l]] (يعرضه). متعدّلش الملف في [[/var/spool/cron/]] بإيدك. وفيه كمان [[/etc/crontab]] و [[/etc/cron.d/]] للنظام، وفيهم خانة زيادة لاسم اليوزر قبل الأمر.

حاجات بتفاجئ الناس:
• الأمر بيتشغّل ببيئة فقيرة جدًا: PATH قصير، ومفيش [[.bashrc]]، ومفيش nvm. استخدم مسارات كاملة.
• مفيش ترمنال: الناتج بيروح mail (غالبًا مش متظبط فبيضيع). وجّهه لملف: [[>> /var/log/job.log 2>&1]].
• [[%]] ليها معنى خاص في crontab (سطر جديد)، فلازم تتكتب [[\%]] (زي [[date +\%F]]).
• الوقت بتوقيت السيرفر (غالبًا UTC مش القاهرة).
• آخر الملف لازم سطر جديد وإلا آخر مهمة ممكن متتشغّلش.

أداة مفيدة: crontab.guru بتكتبلك الجدول بالكلام. وبدايل: [[.timer]] في systemd، و [[schedule:]] في GitHub Actions بنفس الخمس خانات، و Vercel Cron.`,
          example: R`# m h dom mon dow command
*/5 * * * * curl -fsS https://gym.example.com/health > /dev/null
0 3 * * * /srv/gym-api/backup.sh >> /var/log/gym-backup.log 2>&1
30 9 * * 1-5 /usr/bin/node /srv/gym-api/send-reminders.js
@reboot /srv/gym-api/start.sh`,
          flag: "script",
          try: R`على لينكس أو الماك: [[crontab -l]] (غالبًا [[no crontab for you]]). بعدين [[crontab -e]] وضيف سطر تجربة: [[* * * * * date >> /tmp/cron-test.log]]، واحفظ واطلع، واستنى دقيقتين ونفّذ [[cat /tmp/cron-test.log]]. بعدين امسح السطر. واكتب جدول لـ «كل يوم جمعة الساعة 10 الصبح» واتأكد منه على crontab.guru.`,
          deep: {
            why: R`كل نظام فيه حاجات لازم تحصل لوحدها بانتظام: backup، وتنضيف logs، وتجديد شهادات، وإرسال تذكيرات. cron موجود على أي Unix من السبعينات، وأبسط طريقة لده من غير أي برنامج إضافي.`,
            how: R`الـ daemon اللي اسمه cron بيصحى كل دقيقة، ويقرا كل الـ crontabs، ولكل سطر بيقارن الدقيقة الحالية بالخمس خانات. لو طابقت بيشغّل الأمر بـ [[/bin/sh]] (مش bash) ببيئة صغيرة. و [[crontab -e]] بيفحص الصيغة لما تحفظ، ولو فيه غلط بيقولك [[errors in crontab file, can't install]].`,
            when: R`مهام متكررة على VPS: backup لقاعدة البيانات، وتنضيف، و health check، و [[certbot renew]].`,
            mistakes: R`سكربت شغال في الترمنال ومش شغال من cron: PATH أو nvm أو متغيرات البيئة. تنسى [[\%]] في [[date +%F]]. تنسى توجيه الناتج فمتعرفش إنه بيفشل. تكتب الوقت بتوقيت مصر والسيرفر UTC. وتكتب [[* 3 * * *]] وانت قصدك الساعة ٣ مرة واحدة: دي هتشتغل كل دقيقة من 3:00 لـ 3:59 (لازم [[0 3 * * *]]).`
          },
          lines: [
            R`كل ٥ دقايق: [[curl]] على الـ health، و [[-f]] يفشل لو الرد غلط، والناتج يترمي.`,
            R`كل يوم 3:00: backup، والناتج والأخطاء ([[2>&1]]) يتضافوا لملف log.`,
            R`9:30 من الاتنين للجمعة: سكربت Node بمسار كامل لـ node.`,
            R`مرة واحدة مع كل تشغيل للسيرفر.`
          ],
          sol: R`[[crontab -l]] أول مرة: [[no crontab for <اسمك>]].
بعد [[crontab -e]] والحفظ: [[crontab: installing new crontab]].
وبعد دقيقتين [[/tmp/cron-test.log]] فيه سطرين بالتاريخ والوقت، سطر كل دقيقة. (على الماك ممكن تحتاج تدّي Terminal صلاحية Full Disk Access.)

كل جمعة الساعة 10 الصبح: [[0 10 * * 5]]. و crontab.guru بيكتب: «At 10:00 on Friday».`
        },
        {
          cmd: "README و LICENSE و CHANGELOG",
          title: "إيه الملفات اللي في أول أي repo (README و LICENSE و CHANGELOG)، وكل واحد بيتكتب إزاي؟",
          desc: R`ملفات بالحروف الكبيرة في أول المشروع، عشان تظهر فوق في أي ليستة وأول حاجة يشوفها أي حد:

• [[README.md]]: أهم ملف في المشروع. GitHub بيعرضه تحت الملفات علطول. بيجاوب: المشروع ده إيه؟ بيتشغّل إزاي (الأوامر بالظبط)؟ محتاج إيه (Node كام، متغيرات بيئة إيه)؟ وأحيانًا صورة أو رابط للموقع. بيتكتب Markdown (درس [[.md]]). README كويس بيفرق جدًا في البورتفوليو بتاعك.
• [[LICENSE]] (من غير امتداد، أو [[LICENSE.md]] أو [[LICENSE.txt]]): الرخصة القانونية. من غير رخصة، الكود محمي بحقوق النشر افتراضيًا، يعني محدش يقدر يستخدمه قانونيًا حتى لو الـ repo public. أشهرها: MIT (اعمل أي حاجة، بس سيب اسمي)، و Apache-2.0 (زي MIT ومعاها حماية براءات اختراع)، و GPL-3.0 (لو استخدمته في برنامج لازم برنامجك يبقى مفتوح بنفس الرخصة). GitHub بيعرض اسم الرخصة على جنب، وبيديك قالب لما تعمل [[Add file]] باسم [[LICENSE]]. وفي [[package.json]] بيتكتب [["license": "MIT"]].
• [[CHANGELOG.md]]: سجل التغييرات لكل نسخة، للناس اللي بتستخدم مشروعك (مش [[git log]]). الشكل المشهور (Keep a Changelog): قسم لكل نسخة بالتاريخ، وتحته [[Added]] و [[Changed]] و [[Fixed]] و [[Removed]]، وفوق [[Unreleased]] للي لسه منزلش.
• وأخوات: [[CONTRIBUTING.md]] (إزاي تساهم)، و [[SECURITY.md]] (تبلّغ عن ثغرة إزاي)، و [[CODE_OF_CONDUCT.md]]، و [[.github/]] (فيه [[workflows/]] و [[ISSUE_TEMPLATE/]] و [[pull_request_template.md]] و [[CODEOWNERS]]).

GitHub بيدوّر على الملفات دي في أول الـ repo أو في [[.github/]] أو [[docs/]]، وبيعرضهم في أماكن خاصة.`,
          example: R`# Changelog
## [Unreleased]
### Added
- حجز المواعيد من الموبايل
## [1.4.0] - 2026-09-20
### Added
- دفع أونلاين بالكارت
### Fixed
- العربي في الفواتير كان بيظهر ؟؟؟
### Changed
- الحد الأدنى لـ Node بقى 20`,
          flag: "script",
          try: R`في أي مشروع ليك على GitHub: اكتب README فيه ٤ أقسام: المشروع ده إيه (سطرين)، والصور أو الرابط، و «التشغيل» بالأوامر بالظبط من [[git clone]] لحد [[npm run dev]]، و «متغيرات البيئة» (بالأسامي من [[.env.example]]). ضيف [[LICENSE]] من [[Add file]] واختار MIT. واعمل [[CHANGELOG.md]] زي المثال لآخر تغييرات عملتها. بعدين افتح الـ repo على GitHub وشوف كل ملف ظهر فين.`,
          deep: {
            why: R`الكود بيقول «إزاي»، بس مبيقولش «ليه» ولا «أشغّله إزاي» ولا «مسموحلي أستخدمه؟». الملفات دي بتجاوب الأسئلة دي قبل ما حد يسألك، وهي أول حاجة أي صاحب شغل أو مبرمج بيبص عليها في الـ repo بتاعك.`,
            how: R`GitHub بيدوّر على [[README]] بأي امتداد معروف ويعرضه، وبيقرا [[LICENSE]] ويقارنه بالرخص المعروفة (مكتبة اسمها licensee) فيكتب اسمها. أما [[CHANGELOG]] فهو اتفاق بشري، بس أدوات زي release-please و changesets بتكتبه لوحدها من الـ commits.`,
            when: R`README في كل repo من أول commit. و LICENSE في أي repo public. و CHANGELOG لما مشروعك يبقى ليه مستخدمين أو بتعمله releases.`,
            mistakes: R`README فيه بس [[# project-name]] اللي اتعمل لوحده. أوامر تشغيل ناقصة أو قديمة (جرّبها في فولدر نضيف). repo public من غير LICENSE وتفتكر إنه «مفتوح». و CHANGELOG فيه [[git log]] متلزق («fix» و «wip» و «asdf»).`
          },
          lines: [
            R`نقطة تحت [[### Added]]: ميزة جاية في النسخة الجاية.`,
            R`تحت نسخة 1.4.0 (العناوين اللي فوق بـ [[#]] بتعمل الأقسام).`,
            R`تحت [[### Fixed]]: bug اتصلح، مكتوب بلغة المستخدم.`,
            R`تحت [[### Changed]]: تغيير ممكن يأثر على اللي بيستخدم المشروع.`
          ],
          sol: R`على GitHub: الـ README بيظهر منسق تحت ليستة الملفات وكمان في تاب [[README]] فوقها. و LICENSE بيخلي اسم الرخصة يظهر في العمود اللي على اليمين ([[MIT license]]) وفي تاب جنب الـ README. و CHANGELOG.md بيتعرض منسق لما تفتحه: كل نسخة عنوان، وتحتها الأقسام والنقط.

اختبار الـ README الحقيقي: اعمل [[git clone]] للـ repo في فولدر جديد ونفّذ الأوامر اللي كاتبها بالظبط من غير ما تضيف ولا حاجة من دماغك. لو احتجت أي حاجة مش مكتوبة، ضيفها للـ README.`
        }
      ]
    },
    {
      t: "البرامج والمثبّتات",
      l: 3,
      n: "الملفات اللي بتتشغّل أو بتسطّب برامج على كل نظام: .exe و .msi و .dll، و .so و .dylib، و .app و .dmg، و .deb و .rpm و .AppImage، و .apk و .ipa، و .wasm. جواهم إيه، ومين يشغّلهم، وإزاي تتأكد إنهم سليمين",
      items: [
        {
          cmd: ".exe و .msi",
          title: "ملفات .exe و .msi إيه، وإزاي تتأكد إن البرنامج اللي نزّلته سليم؟",
          desc: R`على ويندوز:
• [[.exe]] (executable): برنامج جاهز يتشغّل، فيه كود المعالج مباشرة. الصيغة اسمها PE (Portable Executable)، وأول حرفين فيه دايمًا [[MZ]] (الـ bytes [[4D 5A]]، أول حروف اسم مهندس من أيام DOS). ممكن يبقى البرنامج نفسه، أو مثبّت (installer) بيحط البرنامج في [[C:\Program Files]].
• [[.msi]] (Microsoft Installer): مش برنامج، ده قاعدة بيانات بخطوات التسطيب، وبيشغّلها [[msiexec]] الموجود في ويندوز. ميزته إن الشركات تقدر تسطّبه على مئات الأجهزة من غير أسئلة: [[msiexec /i app.msi /quiet]]. وأخوه [[.msix]] (الصيغة الحديثة بتاعة Microsoft Store).
• [[.com]] و [[.scr]] (شاشة التوقف): برضه برامج بتتشغّل. و [[.scr]] مشهور في الفيروسات لأن الناس مش متوقعة إنه برنامج.

ويندوز بيقرر يشغّل ولا لأ بالامتداد: [[.exe]] و [[.com]] و [[.bat]] و [[.cmd]] و [[.ps1]] (بشروط) و [[.msi]] و [[.scr]] و [[.vbs]] و [[.js]] (Windows Script Host!) كلها ممكن تشغّل كود بدبل كليك.

الأمان قبل ما تشغّل حاجة نزلت من النت:
• نزّل من الموقع الرسمي بس، أو [[winget install]] (مدير حزم ويندوز).
• SmartScreen: الشباك الأزرق «Windows protected your PC» معناه إن البرنامج مش معروف أو مش موقع. متدوسش [[Run anyway]] غير لو متأكد من المصدر.
• التوقيع (code signing): كليك يمين ثم Properties ثم تاب Digital Signatures بيوريك مين الشركة. وفي PowerShell [[Get-AuthenticodeSignature setup.exe]].
• الـ checksum: المواقع الكويسة بتكتب SHA-256 للملف. احسبه وقارنه: [[Get-FileHash setup.exe]] على ويندوز، و [[sha256sum]] على لينكس، و [[shasum -a 256]] على الماك. لو حرف واحد مختلف، الملف اتغيّر (اتبوّظ في التنزيل أو حد عدّله).

على لينكس والماك [[.exe]] مبيشتغلش، إلا بـ Wine (طبقة بتترجم نداءات ويندوز). والبرامج هناك ملهاش امتداد أصلًا ([[/bin/ls]])، والتشغيل بيتحدد بصلاحية [[x]] مش بالاسم.`,
          example: R`file hostname.exe
xxd -l 16 hostname.exe
sha256sum hostname.exe
sha256sum -c SHA256SUMS
wine hostname.exe`,
          try: R`على ويندوز: افتح PowerShell في فولدر Downloads ونفّذ [[Get-FileHash <أي-برنامج-نزّلته>.exe]] وقارنه بالرقم اللي على موقعه لو موجود (مثلًا موقع Node.js بيحط [[SHASUMS256.txt]]). وكليك يمين على الملف ثم Properties ثم Digital Signatures. على لينكس: نفّذ [[file]] و [[xxd -l 16]] على أي [[.exe]] عندك (أو [[/bin/ls]] للمقارنة)، وجرّب [[sha256sum]] مرتين على نفس الملف وبعدين بعد ما تضيف byte ([[echo >> copy.exe]] على نسخة).`,
          deep: {
            why: R`أي برنامج بتشغّله بياخد نفس صلاحياتك: يقرا ملفاتك ويبعتها، ويشفّرها ويطلب فدية (ransomware). عشان كده أهم مهارة مش إنك تعرف تشغّل [[.exe]]، إنك تعرف إمتى متشغّلوش، وتتأكد من المصدر والتوقيع والـ hash.`,
            how: R`لما تدوس على [[.exe]]، ويندوز بيقرا الـ PE header (بعد [[MZ]] فيه مكان الـ header الحقيقي اللي بيقول نوع المعالج والأقسام والـ DLLs المطلوبة)، ويحمّل الـ DLLs، ويبدأ من نقطة البداية. والـ SHA-256 دالة بتطلّع رقم ثابت الطول من أي ملف: نفس الملف دايمًا نفس الرقم، وأي تغيير ولو bit واحد بيغيّر الرقم كله.`,
            when: R`كل ما تنزّل أداة تطوير أو برنامج (Node و Git و Python و Docker Desktop) أو تستلم ملف من حد. والـ checksum بالذات لما تنزّل ISO أو ملف كبير.`,
            mistakes: R`تنزّل البرنامج من موقع «download» وسيط بدل الموقع الرسمي. تتجاهل SmartScreen كل مرة لحد ما تتعود. تفتح مرفق [[.exe]] أو [[.scr]] أو [[.js]] جاي في إيميل أو جوه zip. وتقارن أول ٤ حروف بس من الـ hash.`
          },
          lines: [
            R`[[file]] بيقول إنه برنامج ويندوز 64-bit (PE32+) console.`,
            R`أول bytes: [[4d5a]] يعني [[MZ]]، بصمة أي برنامج ويندوز.`,
            R`بيحسب SHA-256 للملف: ٦٤ حرف hex.`,
            R`بيقارن الملفات بالأرقام المكتوبة في ملف [[SHA256SUMS]] (الشكل اللي المواقع بتنشره).`,
            R`على لينكس: Wine بيشغّل برنامج ويندوز.`
          ],
          sol: R`الناتج الحقيقي (على [[hostname.exe]] بتاع Wine):
[[hostname.exe: PE32+ executable (console) x86-64, for MS Windows, 16 sections]]
[[00000000: 4d5a 9000 0300 0000 0400 0000 ffff 0000  MZ..............]]
[[3d169e9c5a3f2593cfd5fa5a8c0cb397e5b952d55155019b17d812901c708d62  hostname.exe]]
[[hostname.exe: OK]]
و [[wine hostname.exe]] بيطبع اسم الجهاز.

و [[Get-FileHash]] في PowerShell بيطبع نفس الرقم بحروف كبيرة: [[Algorithm : SHA256]] و [[Hash : 3D169E9C...]]. ولما تضيف byte للنسخة، الـ hash بيتغير بالكامل، و [[sha256sum -c]] بيقول [[FAILED]] و [[WARNING: 1 computed checksum did NOT match]].

و [[file /bin/ls]] للمقارنة: [[ELF 64-bit LSB pie executable, x86-64]]، يعني برنامج لينكس بصيغة تانية خالص (ELF، بصمته [[7f 45 4c 46]]).`
        },
        {
          cmd: ".dll و .so و .dylib",
          title: "المكتبات المشتركة (.dll و .so و .dylib) إيه، وليه بيطلعلي VCRUNTIME140.dll was not found؟",
          desc: R`البرامج مش بتحط كل الكود جواها. حاجات كتير مشتركة (الطباعة على الشاشة، التشفير، الضغط، الرسم) بتبقى في مكتبات منفصلة، وكل البرامج بتستخدم نفس النسخة وقت التشغيل. اسمها shared libraries أو dynamic libraries:

• [[.dll]] (Dynamic-Link Library): ويندوز. نفس صيغة PE بتاعة [[.exe]] (بتبدأ بـ [[MZ]] برضه)، بس ملهاش نقطة بداية تتشغّل منها. في [[C:\Windows\System32]] أو جنب البرنامج. وفي .NET، الـ [[.dll]] فيها IL مش كود معالج، و [[dotnet app.dll]] بيشغّلها.
• [[.so]] (shared object): لينكس. صيغة ELF. الأسامي فيها أرقام النسخة: [[libc.so.6]] و [[libssl.so.3]]. في [[/usr/lib]] و [[/lib]].
• [[.dylib]] (dynamic library): الماك. صيغة Mach-O. وكمان [[.framework]] (فولدر فيه المكتبة وملفاتها).

وفيه static libraries بتتلزق جوه البرنامج وقت الـ build: [[.a]] (لينكس والماك) و [[.lib]] (ويندوز).

بتشوف البرنامج محتاج إيه إزاي:
• لينكس: [[ldd /bin/ls]].
• الماك: [[otool -L /bin/ls]].
• ويندوز: Dependencies (برنامج مجاني) أو [[dumpbin /dependents app.exe]] من Visual Studio.

وده سبب رسايل مشهورة:
• ويندوز: [[The code execution cannot proceed because VCRUNTIME140.dll was not found]]: البرنامج محتاج Microsoft Visual C++ Redistributable. نزّله من موقع Microsoft (مش من مواقع «dll download»، دي أشهر طريقة لتوزيع الفيروسات).
• لينكس: [[error while loading shared libraries: libssl.so.1.1: cannot open shared object file]]: المكتبة مش متسطّبة أو نسختها مختلفة. ده بيحصل كتير لما تنقل برنامج من توزيعة لتوزيعة، أو image Docker مبني على نسخة قديمة.
• وفي Node: مكتبات زي [[bcrypt]] و [[sharp]] فيها جزء native ([[.node]]، وهو [[.so]] أو [[.dll]] متسمّي كده)، فلو نسخت [[node_modules]] من ويندوز لـ لينكس بتقع ([[invalid ELF header]]).`,
          example: R`file -L /usr/lib/x86_64-linux-gnu/libc.so.6
ldd /bin/ls
file zlib1.dll
xxd -l 4 /bin/ls`,
          try: R`على لينكس: [[ldd $(which node)]] و [[ldd $(which python3)]] وشوف بيعتمدوا على إيه. على الماك: [[otool -L $(which python3)]]. على ويندوز: افتح [[C:\Windows\System32]] ورتّب بالنوع وشوف كام [[.dll]]. وفي أي مشروع Node فيه [[bcrypt]] أو [[sharp]]: [[find node_modules -name "*.node"]] و [[file]] عليهم.`,
          deep: {
            why: R`لو كل برنامج حط نسخة من كل مكتبة جواه، الهارد والرامات هيتملوا نسخ مكررة، وأي ثغرة في مكتبة تشفير هتحتاج تحديث كل برنامج لوحده. المكتبات المشتركة بتخلي التحديث في مكان واحد، بس التمن إن البرنامج بيعتمد على إن المكتبة موجودة بالنسخة الصح.`,
            how: R`لما البرنامج يبدأ، برنامج صغير اسمه dynamic loader (على لينكس [[/lib64/ld-linux-x86-64.so.2]]) بيقرا ليستة المكتبات المطلوبة من الـ header، ويدوّر عليها في مسارات معروفة، ويحمّلها في الذاكرة، ويربط كل نداء بمكانه. لو مكتبة ناقصة البرنامج مبيبدأش خالص. و [[ldd]] بيعرض نتيجة الخطوة دي من غير ما يشغّل.`,
            when: R`لما برنامج ميرضاش يفتح برسالة عن DLL أو .so، ولما تبني Docker image على Alpine (بيستخدم musl مش glibc، فبرامج كتير متبنية لـ glibc بتقع)، ولما تشتغل بمكتبات native في Node أو Python.`,
            mistakes: R`تنزّل DLL ناقصة من موقع عشوائي. تنسخ [[node_modules]] بين أنظمة بدل [[npm ci]] على كل نظام. تمسح [[.dll]] من System32 عشان «تنضّف». وتستخدم image Alpine لبرنامج متبني على glibc فيطلعلك [[not found]] مع إن الملف موجود.`
          },
          lines: [
            R`[[-L]] يتبع الـ symlink: مكتبة C الأساسية في لينكس، [[shared object]] بصيغة ELF.`,
            R`المكتبات اللي [[ls]] محتاجها، ومكان كل واحدة.`,
            R`DLL ويندوز: PE زي الـ exe، بس مكتوب [[(DLL)]].`,
            R`بصمة ELF: [[7f]] وبعدها [[ELF]].`
          ],
          sol: R`الناتج الحقيقي (أوبونتو):
[[/usr/lib/x86_64-linux-gnu/libc.so.6: ELF 64-bit LSB shared object, x86-64, version 1 (GNU/Linux), dynamically linked, ...]]
[[linux-vdso.so.1 (0x...)]]
[[libselinux.so.1 => /lib/x86_64-linux-gnu/libselinux.so.1 (0x...)]]
[[libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x...)]]
[[libpcre2-8.so.0 => /lib/x86_64-linux-gnu/libpcre2-8.so.0 (0x...)]]
[[/lib64/ld-linux-x86-64.so.2 (0x...)]]
[[zlib1.dll: PE32+ executable (DLL) (console) x86-64 (stripped to external PDB), for MS Windows, 12 sections]]
[[00000000: 7f45 4c46                                .ELF]]

([[zlib1.dll]] موجودة لو عندك Wine أو mingw، أي DLL هتطلع نفس الشكل.) و [[file]] على ملف [[.node]] في [[bcrypt]] بيقول [[ELF 64-bit LSB shared object]] على لينكس، و [[PE32+ executable (DLL)]] على ويندوز.`
        },
        {
          cmd: ".app و .dmg و .pkg",
          title: "على الماك: .app ده ملف ولا فولدر، و .dmg و .pkg بيسطّبوا إزاي؟",
          desc: R`على الماك:

• [[.app]]: البرنامج نفسه، بس هو في الحقيقة فولدر (اسمه bundle) و Finder بيعرضه كأنه ملف واحد. جواه:
  [[Contents/Info.plist]]: معلومات البرنامج (الاسم والنسخة والأيقونة والصلاحيات)، وهو XML (أو binary plist).
  [[Contents/MacOS/]]: البرنامج الحقيقي (Mach-O).
  [[Contents/Resources/]]: الأيقونات والصور والترجمات.
  [[Contents/Frameworks/]]: المكتبات.
  كليك يمين ثم [[Show Package Contents]] بيفتحه كفولدر. والتسطيب غالبًا مجرد إنك تسحبه لفولدر [[/Applications]].
• [[.dmg]] (disk image): زي فلاشة وهمية. بتدوس عليه دبل كليك فيظهر كـ disk في Finder، جواه غالبًا [[.app]] وسهم لـ Applications. بعد ما تسحب البرنامج اعمل Eject. من الترمنال: [[hdiutil attach app.dmg]].
• [[.pkg]]: مثبّت بخطوات (زي [[.msi]])، بيحط ملفات في أماكن مختلفة في النظام وممكن يشغّل سكربتات. من الترمنال: [[sudo installer -pkg app.pkg -target /]].
• [[.plist]]: ملفات إعدادات في الماك و iOS (Property List)، XML أو binary. [[plutil -p file.plist]] بيعرضها مقروءة.

الأمان (Gatekeeper):
• البرامج اللي نزلت من النت عليها علامة quarantine، والماك بيتأكد إنها موقّعة من مطوّر مسجل ومتراجعة من Apple (notarized).
• لو مش كده: [[“App” cannot be opened because the developer cannot be verified]] أو [[“App” is damaged and can’t be opened]].
• الحل الصح لو متأكد من المصدر: System Settings ثم Privacy & Security ثم [[Open Anyway]]. والحل اللي هتلاقيه في النت [[xattr -d com.apple.quarantine App.app]] بيشيل العلامة، وده بيقفل الحماية للبرنامج ده، فاعمله بس لبرنامج انت متأكد منه.

وأسهل طريقة للمبرمج: Homebrew ([[brew install --cask visual-studio-code]]) بينزّل ويسطّب ويحدّث.`,
          example: R`ls /Applications/Safari.app/Contents
plutil -p /Applications/Safari.app/Contents/Info.plist | head -5
file /Applications/Safari.app/Contents/MacOS/Safari
hdiutil attach ~/Downloads/app.dmg
xattr -l ~/Downloads/app.dmg`,
          try: R`على الماك: نفّذ أول ٣ أوامر على أي برنامج في [[/Applications]]. وفي Finder كليك يمين على أي [[.app]] ثم Show Package Contents. ولو عندك [[.dmg]] في Downloads، نفّذ [[xattr -l]] عليه وشوف [[com.apple.quarantine]]. (على ويندوز ولينكس: اقرا الدرس وخلاص، أو لو عندك مشروع iOS أو Flutter افتح [[ios/Runner/Info.plist]]، ده نفس صيغة Info.plist.)`,
          deep: {
            why: R`Apple عايزة البرنامج يبقى «حاجة واحدة» تسحبها وتمسحها، من غير ملفات متفرقة في النظام. الـ bundle بيحقق ده: كل حاجة البرنامج محتاجها في فولدر واحد شكله ملف. والـ [[.dmg]] طريقة توزيع بتحافظ على الـ bundle كامل بصلاحياته وتوقيعه.`,
            how: R`Finder بيعرف إن الفولدر bundle من امتداده ([[.app]]) ومن [[Info.plist]]. لما تشغّله، النظام بيقرا [[CFBundleExecutable]] من الـ plist ويشغّل الملف ده من [[Contents/MacOS/]]. والمتصفح لما ينزّل أي ملف بيحط عليه extended attribute اسمه [[com.apple.quarantine]]، و Gatekeeper بيشيك عليه أول مرة تفتحه.`,
            when: R`لما تسطّب أدوات على الماك، أو تشتغل iOS أو macOS (الـ [[Info.plist]] هتعدّله كتير: صلاحيات الكاميرا والموقع).`,
            mistakes: R`تشغّل البرنامج من جوه الـ [[.dmg]] مباشرة بدل ما تسحبه لـ Applications (بيشتغل بس مش هيتحدث، والـ dmg يفضل mounted). تشيل الـ quarantine عن أي حاجة من غير ما تفكر. وتنسى صلاحيات [[NSCameraUsageDescription]] وأخواتها في [[Info.plist]] فالتطبيق يقع أول ما يطلب الكاميرا.`
          },
          lines: [
            R`الـ [[.app]] فولدر: جواه [[Info.plist]] و [[MacOS]] و [[Resources]]...`,
            R`[[plutil -p]] بيعرض الـ plist مقروء.`,
            R`البرنامج الحقيقي: Mach-O.`,
            R`بيفتح الـ dmg كـ disk في [[/Volumes/]].`,
            R`بيعرض الـ extended attributes، ومنها علامة الـ quarantine.`
          ],
          sol: R`على ماك حديث:
[[ls]] بيطبع حاجات زي [[Info.plist]] و [[MacOS]] و [[Resources]] و [[_CodeSignature]] و [[version.plist]].
[[plutil -p]] بيطبع سطور زي [["CFBundleIdentifier" => "com.apple.Safari"]] و [["CFBundleExecutable" => "Safari"]].
[[file]] بيطبع [[Mach-O universal binary with 2 architectures: [x86_64:...] [arm64e:...]]] (برنامج واحد فيه نسختين: Intel و Apple Silicon).
[[hdiutil attach]] بيطبع سطور فيها [[/Volumes/App]].
[[xattr -l]] بيطبع [[com.apple.quarantine: 0083;...;Safari;...]] (مين نزّله وإمتى).

وتلاقي [[_CodeSignature/]]: التوقيع اللي Gatekeeper بيتأكد منه.`
        },
        {
          cmd: ".deb و .rpm و .AppImage",
          title: "على لينكس: الفرق بين .deb و .rpm و .AppImage و snap و flatpak إيه؟",
          desc: R`على لينكس أغلب البرامج بتتسطّب من مدير الحزم ([[apt]] أو [[dnf]]) اللي بينزّل من مستودعات التوزيعة. بس ساعات هتنزّل ملف بنفسك:

• [[.deb]]: حزمة Debian و Ubuntu و Mint. أرشيف فيه ملفات البرنامج بالمسارات اللي هتتحط فيها ([[./usr/bin/hello]]) وملف [[control]] (الاسم والنسخة والـ dependencies). بتتسطّب بـ [[sudo apt install ./file.deb]] (الـ [[./]] مهمة، وبتنزّل الـ dependencies)، أو [[sudo dpkg -i file.deb]] (مبيجيبش الـ dependencies).
• [[.rpm]]: نفس الفكرة لـ Fedora و RHEL و openSUSE: [[sudo dnf install ./file.rpm]].
• [[.AppImage]]: البرنامج كله بمكتباته في ملف واحد بيشتغل على أي توزيعة من غير تسطيب: [[chmod +x App.AppImage]] و [[./App.AppImage]]. محتاج FUSE (على Ubuntu 24.04: [[sudo apt install libfuse2t64]]).
• snap ([[snap install code --classic]]) و flatpak ([[flatpak install flathub ...]]): حزم بتيجي بمكتباتها ومعزولة عن النظام، من متاجر مركزية.
• [[.tar.gz]] فيه البرنامج جاهز (زي Node و Go الرسميين): بتفكه وتحط الفولدر في الـ PATH.
• [[.sh]] installer ([[curl ... | sh]]): سكربت بيسطّب. شائع (nvm و rustup و Docker) بس اقراه الأول لو المصدر مش معروف.

أوامر تفحص بيها [[.deb]] من غير ما تسطّبه:
• [[dpkg-deb -I file.deb]]: المعلومات والـ dependencies.
• [[dpkg-deb -c file.deb]]: الملفات اللي هتتحط فين.
• [[apt download hello]]: ينزّل الـ [[.deb]] من المستودع من غير تسطيب (تجربة آمنة).`,
          example: R`apt download hello
file hello_*.deb
dpkg-deb -I hello_*.deb
dpkg-deb -c hello_*.deb | head -5
sudo apt install ./hello_*.deb
hello`,
          try: R`على Ubuntu أو Debian (أو WSL): نفّذ أول ٤ أوامر في فولدر تجربة، واقرا الـ [[Depends:]] والمسارات. لو حابب تسطّب نفّذ الباقي وبعدين [[sudo apt remove hello]]. ولو عندك أي [[.AppImage]] جرّب تشغّله من غير [[chmod +x]] الأول.`,
          deep: {
            why: R`كل توزيعة لينكس ليها نسخ مكتبات مختلفة، فالحزمة لازم تتبني لكل توزيعة ومدير الحزم بيتأكد إن الـ dependencies موجودة. ده بيخلي النظام متناسق ويتحدث كله بأمر واحد ([[apt upgrade]])، بس صعب على المطورين. AppImage و snap و flatpak جم يحلوا ده بإن البرنامج ييجي بمكتباته.`,
            how: R`الـ [[.deb]] هو أرشيف [[ar]] جواه ٣ حاجات: [[debian-binary]] (النسخة)، و [[control.tar]] (المعلومات والسكربتات)، و [[data.tar]] (الملفات). [[dpkg]] بيفك [[data]] في [[/]] ويسجل كل ملف عشان يعرف يمسحه بعدين، و [[apt]] فوقه بيحل الـ dependencies.`,
            when: R`برامج مش في المستودعات: Chrome و VS Code و Discord بيدّوك [[.deb]] أو [[.rpm]]. و AppImage لبرامج عايز تجربها من غير ما تلمس النظام.`,
            mistakes: R`[[sudo apt install file.deb]] من غير [[./]] فـ apt يدوّر على حزمة بالاسم ده. [[dpkg -i]] وبعدين تستغرب إن البرنامج مش شغال (dependencies ناقصة، الحل [[sudo apt -f install]]). تنزّل [[.deb]] من موقع مش رسمي (بيتشغّل كـ root وقت التسطيب). وتنسى [[chmod +x]] للـ AppImage.`
          },
          lines: [
            R`ينزّل [[.deb]] بتاع برنامج hello من مستودع Ubuntu من غير تسطيب.`,
            R`[[file]] بيعرف إنه حزمة Debian.`,
            R`المعلومات: الاسم والنسخة والمعمارية والـ dependencies.`,
            R`أول ملفات هتتحط فين.`,
            R`يسطّب (والـ [[./]] بتقول إنه ملف مش اسم حزمة).`,
            R`يشغّل البرنامج.`
          ],
          sol: R`الناتج الحقيقي (Ubuntu 24.04):
[[Fetched 26.0 kB in 1s (45.6 kB/s)]]
[[hello_2.10-3build1_amd64.deb: Debian binary package (format 2.0), with control.tar.zst, data compression zst]]
و [[dpkg-deb -I]] فيه:
[[Package: hello]]
[[Version: 2.10-3build1]]
[[Architecture: amd64]]
[[Depends: libc6 (>= 2.38)]]
و [[dpkg-deb -c]]:
[[drwxr-xr-x root/root 0 ... ./usr/bin/]]
[[-rwxr-xr-x root/root 26856 ... ./usr/bin/hello]]
وبعد التسطيب [[hello]] بيطبع [[Hello, world!]].

والـ AppImage من غير [[chmod +x]]: [[Permission denied]].`
        },
        {
          cmd: ".apk و .aab و .ipa",
          title: "ملفات تطبيقات الموبايل .apk و .aab و .ipa جواها إيه؟",
          desc: R`• [[.apk]] (Android Package): التطبيق الجاهز للتسطيب على Android. هو zip فيه:
  [[AndroidManifest.xml]]: الـ manifest (درس AndroidManifest)، بس متحوّل لـ XML binary.
  [[classes.dex]] (و [[classes2.dex]]...): الكود (Kotlin و Java) متحوّل لـ bytecode بتاع Android (Dalvik).
  [[res/]] و [[resources.arsc]]: الصور والـ layouts والنصوص.
  [[lib/arm64-v8a/*.so]]: مكتبات native لكل معالج (Flutter و React Native فيهم دول).
  [[assets/]]: ملفات خام (Flutter بيحط فيها الـ Dart المتحوّل والخطوط).
  [[META-INF/]]: التوقيع.
  بيتسطّب بـ [[adb install app.apk]] أو بفتحه على الموبايل (لازم تسمح «Install unknown apps»).
• [[.aab]] (Android App Bundle): الصيغة اللي بترفعها على Google Play دلوقتي (إجباري للتطبيقات الجديدة). مش بيتسطّب مباشرة: Google Play بيعمل منه APKs صغيرة لكل جهاز (بس الصور والمكتبات اللي الجهاز ده محتاجها). [[./gradlew bundleRelease]] بيعمله، و [[./gradlew assembleRelease]] بيعمل APK.
• [[.ipa]] (iOS App Store Package): تطبيق iOS. zip جواه فولدر [[Payload/App.app]]. مبيتسطّبش على أي آيفون إلا لو موقّع بشهادة Apple ومسموح للجهاز ده (TestFlight أو App Store أو Ad Hoc).
• [[.xapk]] و [[.apks]]: صيغ غير رسمية لمواقع التحميل. ابعد عنها.

التوقيع: كل APK لازم يتوقّع بمفتاح (keystore، درس [[.jks]]). Android بيرفض تحديث تطبيق بتوقيع مختلف عن النسخة المتسطّبة. عشان كده لو ضيّعت الـ keystore مش هتعرف تحدّث تطبيقك (Play App Signing بيحل ده لو مفعّل).

وتسطيب APK من مصدر مش معروف هو أشهر طريقة لنشر برامج التجسس على Android.`,
          example: R`file app-release.apk
unzip -l app-release.apk | tail -1
unzip -l app-release.apk | grep -E "AndroidManifest|classes.*dex|resources.arsc"
unzip -p app-release.apk AndroidManifest.xml | xxd -l 8
adb install app-release.apk`,
          try: R`لو عندك مشروع Android أو Flutter أو React Native: اعمل build ([[flutter build apk]] أو [[./gradlew assembleRelease]]) ونفّذ المثال على الـ APK الناتج (في [[build/app/outputs/flutter-apk/]] أو [[app/build/outputs/apk/]]). لو مفيش: أي APK عندك يمشي، أو حط [[.apk]] في [[unzip -l]] بس. ولو موبايلك متوصل بـ USB debugging جرّب [[adb install]].`,
          deep: {
            why: R`الموبايل محتاج ملف واحد فيه كل حاجة: الكود والصور والصلاحيات والتوقيع، عشان يتسطّب ويتأكد إنه من نفس المطور في كل تحديث. والـ zip كان أسهل اختيار. و [[.aab]] جه عشان الـ APK الواحد كان فيه صور ومكتبات لكل الأجهزة فبيبقى كبير.`,
            how: R`وقت الـ build، Gradle بيحوّل الكود لـ [[.dex]]، و AAPT2 بيحوّل الـ resources والـ manifest لصيغة binary، وبيحطهم في zip ويوقّعه بالـ keystore. والموبايل وقت التسطيب بيتأكد من التوقيع، ويقرا الـ manifest عشان الصلاحيات، ويحوّل الـ dex لكود المعالج (ART).`,
            when: R`لما تنزّل تطبيقك للتجربة على موبايل، أو ترفعه على Play (aab)، أو تفحص حجم التطبيق (Android Studio فيه Build ثم Analyze APK).`,
            mistakes: R`ترفع [[.apk]] على Play بدل [[.aab]]. تضيّع الـ keystore أو باسورده. تبعت APK الـ debug للعميل (أبطأ ومتوقّع بمفتاح debug). وتسطّب APK من مواقع تحميل عشان «نسخة مدفوعة ببلاش».`
          },
          lines: [
            R`[[file]] بيعرف إنه APK.`,
            R`آخر سطر في ليستة الـ zip: الحجم الكلي وعدد الملفات.`,
            R`أهم ملفات جواه.`,
            R`الـ manifest جوه الـ APK binary: أول bytes مش [[<?xml]].`,
            R`يسطّبه على موبايل متوصل (USB debugging).`
          ],
          sol: R`على APK حقيقي لتطبيق React Native:
[[app-release.apk: Android package (APK), with gradle app-metadata.properties]]
[[ 15754197                     545 files]] (حوالي 15 ميجا و 545 ملف)
وفي الليستة: [[AndroidManifest.xml]] و [[classes.dex]] و [[classes2.dex]] و [[resources.arsc]]، وكمان فولدرات [[res/]] و [[lib/]] و [[assets/]] و [[META-INF/]].
[[00000000: 0300 0800 5033 0000                      ....P3..]]
يعني الـ manifest XML binary مش نص. (Android Studio و [[aapt2 dump xmltree]] بيرجّعوه مقروء.)
و [[adb install]] بيطبع [[Performing Streamed Install]] وبعدين [[Success]].`
        },
        {
          cmd: ".wasm",
          title: "ملف .wasm (WebAssembly) إيه، وبيتشغّل في المتصفح و Node إزاي؟",
          desc: R`[[.wasm]] (WebAssembly): صيغة binary لكود بيتشغّل في المتصفح (و Node و Deno) بسرعة قريبة من البرامج الـ native. مش بتكتبه بإيدك: بتكتب C أو C++ أو Rust أو Go وتعمله compile لـ [[.wasm]]، وبعدين JavaScript بيحمّله ويستخدم الدوال اللي فيه.

جواه إيه:
• أول ٤ bytes: [[00 61 73 6D]] يعني [[\0asm]]، وبعدها النسخة [[01 00 00 00]].
• أقسام (sections): أنواع الدوال، والدوال، والـ exports (اللي JS يقدر يناديه)، والكود.
• وله صيغة نصية للقراية اسمها WAT ([[.wat]]): [[(module (func (export "add") (param i32 i32) (result i32) local.get 0 local.get 1 i32.add))]].

هتقابله فين:
• مكتبات تقيلة شغالة في المتصفح: معالجة الصور والفيديو (ffmpeg.wasm)، وقواعد بيانات (SQLite و PGlite، والموقع ده نفسه بيستخدم PGlite لتمارين SQL!)، وضغط ملفات 3D (draco)، والخطوط (harfbuzz).
• Figma و Photoshop على الويب و Google Earth.
• أدوات JavaScript: esbuild و SWC ليهم نسخ wasm.
• بره المتصفح: Cloudflare Workers و WASI.

بيتحمّل إزاي:
• في المتصفح: [[WebAssembly.instantiateStreaming(fetch("add.wasm"))]]. والسيرفر لازم يبعته بـ [[Content-Type: application/wasm]] (درس MIME)، وإلا المتصفح بيرفض الـ streaming.
• في Node: [[WebAssembly.instantiate(await readFile("add.wasm"))]].
• وغالبًا المكتبة بتيجي بملف JS بيحمّل الـ wasm لوحده، وانت بتعمل [[import]] عادي.`,
          example: R`file add.wasm
xxd add.wasm
cat run-wasm.mjs
node run-wasm.mjs`,
          try: R`اعمل [[add.wasm]] بالـ bytes دي (ده module صغير فيه دالة [[add]]):
[[printf '\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x07\x01\x60\x02\x7f\x7f\x01\x7f\x03\x02\x01\x00\x07\x07\x01\x03\x61\x64\x64\x00\x00\x0a\x09\x01\x07\x00\x20\x00\x20\x01\x6a\x0b' > add.wasm]]
واعمل [[run-wasm.mjs]] فيه: [[import { readFile } from "node:fs/promises";]] و [[const { instance } = await WebAssembly.instantiate(await readFile("add.wasm"));]] و [[console.log(instance.exports.add(2, 3));]]. نفّذ المثال. ودوّر في [[node_modules]] عندك: [[find node_modules -name "*.wasm" | head]].`,
          deep: {
            why: R`JavaScript سريع بس مش كفاية لحاجات زي تعديل فيديو أو محرك ألعاب، والمتصفح مكنش بيشغّل غير JS. WebAssembly اتعمل (2017) كصيغة صغيرة وآمنة وسريعة، أي لغة تقدر تتحول لها، وكل المتصفحات بتشغّلها في نفس الـ sandbox بتاع JS.`,
            how: R`المتصفح بيعمل validate للـ binary (أنواع ثابتة ومفيش وصول للذاكرة بره المساحة المسموحة)، وبعدين يحوّله لكود المعالج بسرعة. الـ wasm ميقدرش يلمس الـ DOM ولا الشبكة لوحده: بيعمل كده بس من خلال دوال JS بتتديله (imports). عشان كده هو آمن زي JS.`,
            when: R`مش هتكتبه غالبًا، بس هتستخدم مكتبات فيها wasm، وهتحتاج تظبط السيرفر يبعته صح، وتعرف ليه حجم الـ bundle كبير.`,
            mistakes: R`السيرفر بيبعت الـ [[.wasm]] بـ [[application/octet-stream]] فيطلعلك [[Incorrect response MIME type. Expected 'application/wasm']]. Vite أو webpack مش بينسخ الـ [[.wasm]] للـ build. وتفتكر إن wasm هيسرّع أي كود: لو الشغل كله DOM، JS أحسن.`
          },
          lines: [
            R`[[file]] بيعرف الـ module والنسخة.`,
            R`أول ٤ bytes [[0061 736d]] يعني [[\0asm]]، وكلمة [[add]] باينة في الـ exports.`,
            R`كود JS بيقرا الملف ويعمله instantiate وينادي [[add]].`,
            R`النتيجة جاية من دالة WebAssembly.`
          ],
          sol: R`الناتج الحقيقي:
[[add.wasm: WebAssembly (wasm) binary module version 0x1 (MVP)]]
[[00000000: 0061 736d 0100 0000 0107 0160 027f 7f01  .asm.......$__bt....]]
[[00000010: 7f03 0201 0007 0701 0361 6464 0000 0a09  .........add....]]
[[00000020: 0107 0020 0020 016a 0b                   ... . .j.]]
[[5]]

الملف كله ٤١ byte: فيه دالة بتجمع رقمين ([[6a]] هي [[i32.add]]). وفي مشروع Next أو Vite كبير هتلاقي ملفات زي [[hb.wasm]] (خطوط) أو [[draco_decoder.wasm]] (3D).`
        }
      ]
    },
    {
      t: "الأرشيف والضغط",
      l: 3,
      n: "الفرق بين الأرشيف (يجمع ملفات كتير في ملف) والضغط (يصغّر الحجم)، و .zip و .tar.gz و .7z و .rar و .xz، وإزاي تعملهم وتفكهم من الترمنال على كل نظام",
      items: [
        {
          cmd: ".zip",
          title: "تعمل ملف .zip وتفكه وتشوف جواه إيه من الترمنال إزاي؟",
          desc: R`[[.zip]] أشهر صيغة على الإطلاق: بيجمع ملفات وفولدرات كتير في ملف واحد (أرشيف) ويضغط كل ملف لوحده. ويندوز والماك بيفتحوه من غير أي برنامج إضافي.

حاجات كتير هي zip من جوه بس بامتداد تاني: [[.jar]] و [[.war]] (Java)، و [[.apk]] و [[.aab]] و [[.ipa]] (موبايل)، و [[.docx]] و [[.xlsx]] و [[.pptx]] (Office، درس [[.docx]])، و [[.epub]]، و [[.whl]] (Python)، و [[.vsix]] (إضافات VS Code)، و [[.nupkg]]. كلهم بيبدأوا بـ [[PK]] (اسم مخترع الصيغة)، وتقدر تعمل لهم [[unzip -l]].

من الترمنال:
• [[zip -r project.zip project]]: [[-r]] عشان يدخل الفولدرات. و [[-x "pattern"]] تستثني. و [[-q]] من غير كلام.
• [[unzip -l file.zip]]: شوف جواه إيه من غير ما تفك (اعمل ده دايمًا الأول).
• [[unzip file.zip -d out/]]: فك في فولدر معيّن.
• [[zip -e secret.zip file]]: بباسورد. بس التشفير القديم بتاع zip ضعيف، استخدم [[7z]] بـ AES لو السرية مهمة.
• ويندوز PowerShell: [[Compress-Archive -Path project -DestinationPath project.zip]] و [[Expand-Archive project.zip -DestinationPath out]]. أو كليك يمين ثم [[Send to]] ثم [[Compressed (zipped) folder]].
• الماك: دبل كليك يفك، وكليك يمين ثم Compress يعمل zip. (والماك بيحط جوه الـ zip فولدر [[__MACOSX/]] و [[.DS_Store]] اللي بتظهر لما حد على ويندوز يفكه.)

حاجات لازم تعرفها:
• فك الأرشيف من غير ما تشوفه ممكن يرمي ١٠٠٠ ملف في الفولدر الحالي، أو يكتب فوق ملفاتك. عشان كده [[-l]] الأول و [[-d]] لفولدر جديد.
• zip مبيحافظش على صلاحيات لينكس دايمًا ([[x]] بتضيع ساعات). لو هتنقل لسيرفر لينكس، [[tar]] أحسن.
• الملفات المضغوطة أصلًا (صور JPG و فيديو و zip تاني) مبتصغرش تقريبًا.
• zip bomb: ملف zip صغير بيتفك لجيجات. والـ zip slip: ملف جوه الأرشيف اسمه [[../../.bashrc]] بيكتب بره الفولدر. لو بتفك ملفات جاية من يوزرز في الكود، استخدم مكتبة بتمنع ده.`,
          example: R`zip -r -q project.zip project -x "project/node_modules/*" "project/.env"
unzip -l project.zip
file project.zip
xxd -l 4 project.zip
unzip -q project.zip -d out
ls -A out/project`,
          try: R`اعمل فولدر [[project]] فيه [[src/app.js]] و [[README.md]] و [[.env]] و [[node_modules/x/big.bin]] ونفّذ المثال. شوف [[.env]] و [[node_modules]] راحوا فين. بعدين جرّب [[unzip -l]] على أي [[.jar]] أو [[.docx]] أو [[.vsix]] عندك. على ويندوز جرّب [[Compress-Archive]] و [[Expand-Archive]].`,
          deep: {
            why: R`نقل ١٠٠٠ ملف واحد واحد (إيميل، رفع، تنزيل) بطيء ومتعب، وفيه احتمال ملف يضيع. الأرشيف بيخليهم ملف واحد، والضغط بيصغّر الحجم. و zip بقى المعيار لأنه مدعوم في كل نظام من التسعينات، فالصيغ الجديدة (jar و docx و apk) بنوا عليه بدل ما يخترعوا حاجة.`,
            how: R`الـ zip بيضغط كل ملف لوحده (غالبًا بـ Deflate)، وفي آخر الملف فيه «فهرس» (central directory) فيه أسامي كل الملفات ومكانها. عشان كده [[unzip -l]] سريع (بيقرا الفهرس بس)، وتقدر تفك ملف واحد من غير الباقي. والملفات الصغيرة جدًا بيتخزنوا من غير ضغط ([[compression method=store]]) لأن الضغط هيكبّرها.`,
            when: R`تبعت ملفات لحد على ويندوز أو ماك، أو ترفع مشروع على منصة بتطلب zip (AWS Lambda وبعض الاستضافات)، أو تفحص jar أو docx أو apk من جوه.`,
            mistakes: R`تعمل zip للمشروع ومعاه [[node_modules]] (مئات الميجا) و [[.env]] (أسرار). تفك أرشيف في فولدرك الحالي فيتلخبط بملفاتك. تعتمد على باسورد zip العادي للسرية. وتعمل [[zip project.zip project]] من غير [[-r]] فيطلعلك zip فيه الفولدر فاضي.`
          },
          lines: [
            R`[[-r]] الفولدر بكل اللي جواه، و [[-x]] استثني المكتبات والأسرار.`,
            R`شوف جواه إيه من غير فك.`,
            R`[[file]] بيعرف إنه zip.`,
            R`البصمة: [[PK]] وبعدها [[03 04]].`,
            R`فك في فولدر [[out]].`,
            R`اتأكد: مفيش [[.env]] ولا [[node_modules]].`
          ],
          sol: R`الناتج الحقيقي:
[[Archive:  project.zip]]
[[        0  2026-10-01 17:03   project/]]
[[        0  2026-10-01 17:03   project/src/]]
[[       18  2026-10-01 17:03   project/src/app.js]]
[[        6  2026-10-01 17:03   project/README.md]]
[[       24                     4 files]]
[[project.zip: Zip archive data, at least v1.0 to extract, compression method=store]]
[[00000000: 504b 0304                                PK..]]
و [[ls -A out/project]] بيطبع [[README.md]] و [[src]] بس.

[[compression method=store]] لأن الملفات صغيرة جدًا فمش هتصغر. و [[unzip -l]] على [[.docx]] هيوريك [[word/document.xml]] و [[[Content_Types].xml]].`
        },
        {
          cmd: ".tar و .gz و .tgz",
          title: "إيه الفرق بين .tar و .gz و .tar.gz، وأمر tar بتفتكره إزاي؟",
          desc: R`على لينكس الأرشيف والضغط خطوتين منفصلين:

• [[.tar]] (tape archive): بيجمع ملفات وفولدرات في ملف واحد ومعاهم الصلاحيات والمالك والتواريخ والـ symlinks، من غير أي ضغط. حجمه تقريبًا مجموع الملفات.
• [[.gz]] (gzip): بيضغط ملف واحد بس. [[gzip file.txt]] بيعمل [[file.txt.gz]] ويمسح الأصلي (و [[-k]] يسيبه). و [[gunzip]] أو [[gzip -d]] العكس. و [[zcat]] و [[zgrep]] و [[zless]] بيقروه من غير فك (درس [[.log]]).
• [[.tar.gz]] أو [[.tgz]]: الاتنين مع بعض: tar يجمع، و gzip يضغط الناتج. ده الشكل المعتاد لأي حاجة على لينكس: كود المكتبات، و Node و Go الرسميين، والـ backups، وطبقات Docker images نفسها.
• وأخواته بضغط تاني: [[.tar.xz]] و [[.txz]] (xz، أصغر وأبطأ)، و [[.tar.bz2]] (bzip2، قديم)، و [[.tar.zst]] (zstd، سريع جدًا وضغطه كويس، والجديد في التوزيعات).

أمر [[tar]] بحروف:
• [[c]] create، و [[x]] extract، و [[t]] list.
• [[z]] gzip، و [[J]] xz، و [[j]] bzip2. (و tar الحديث بيعرف الضغط لوحده وهو بيفك، فـ [[tar -xf file.tar.xz]] شغالة.)
• [[f]] الملف، ولازم الاسم ييجي بعدها علطول.
• [[v]] verbose: اطبع كل ملف.
• [[-C dir]]: فك في الفولدر ده. و [[--exclude=pattern]].
طريقة تفتكره: [[tar -czf]] = Create Zipped File، و [[tar -xzf]] = eXtract Zipped File، و [[tar -tzf]] = Table (list).

على ويندوز ١٠ و ١١ فيه [[tar.exe]] جاهز في CMD و PowerShell بنفس الأوامر. و 7-Zip بيفتح الصيغ دي كلها.`,
          example: R`tar -czf project.tar.gz --exclude=node_modules --exclude=.env project
tar -tzf project.tar.gz
file project.tar.gz
mkdir -p out2 && tar -xzf project.tar.gz -C out2
gzip -k -9 text.txt
ls -l text.txt text.txt.gz`,
          try: R`على نفس فولدر [[project]] بتاع درس [[.zip]] نفّذ المثال وقارن حجم [[project.tar.gz]] بـ [[project.zip]]. اعمل ملف نصي كبير ([[seq 1 60000 > text.txt]]) واضغطه بـ gzip و xz ([[xz -k -9 text.txt]]) وقارن الأحجام. وبعدين اعمل [[tar -cf]] من غير [[z]] وشوف الحجم.`,
          deep: {
            why: R`فلسفة Unix: كل أداة تعمل حاجة واحدة كويس. tar اتعمل للشرايط (tapes) ويعرف يحفظ كل تفاصيل الملفات، و gzip بيعرف يضغط. ولما تفصلهم تقدر تغيّر الضغط (gz أو xz أو zstd) من غير ما تغيّر الأرشيف. وكمان ضغط الأرشيف كله مرة واحدة بيطلّع حجم أصغر من ضغط كل ملف لوحده زي zip، لأن الملفات المتشابهة بتضغط بعض.`,
            how: R`[[tar -czf]] بيكتب كل ملف (header فيه الاسم والصلاحيات، وبعده المحتوى) ورا بعض في stream، والـ stream ده بيعدّي على gzip قبل ما يتكتب. عشان كده مفيش فهرس: [[tar -t]] لازم يقرا الملف كله، ومينفعش تفك ملف من النص من غير ما تعدّي على اللي قبله. وبصمة gzip [[1f 8b]]، و xz [[fd 37 7a 58 5a 00]].`,
            when: R`backups على السيرفر، ونقل مشروع لسيرفر لينكس مع الصلاحيات، وتنزيل برامج لينكس، وأي حاجة هتتفك على لينكس.`,
            mistakes: R`[[tar -czf project project.tar.gz]] بالترتيب الغلط: بيعمل أرشيف اسمه [[project]]! الاسم لازم بعد [[f]]. تفك من غير [[-t]] الأول فالملفات تتفرد في الفولدر الحالي. تنسى [[-C]] فتفك في المكان الغلط. و [[gzip file]] بيمسح الأصلي من غير [[-k]].`
          },
          lines: [
            R`[[c]] اعمل، [[z]] gzip، [[f]] اسم الملف، واستثني المكتبات والأسرار.`,
            R`[[t]] اعرض اللي جواه.`,
            R`[[file]] بيقول gzip، والأرشيف tar جواه.`,
            R`[[x]] فك، و [[-C]] في فولدر [[out2]].`,
            R`gzip لملف واحد، و [[-k]] سيب الأصلي، و [[-9]] أقصى ضغط.`,
            R`قارن الحجم.`
          ],
          sol: R`الناتج الحقيقي:
[[project/]]
[[project/src/]]
[[project/src/app.js]]
[[project/README.md]]
[[project.tar.gz: gzip compressed data, from Unix, original size modulo 2^32 10240]]
(الـ 10240 حجم الـ tar قبل الضغط: tar بيكمّل لأقرب 10KB.)

ملف [[project.tar.gz]] طلع 229 byte و [[project.zip]] لنفس الملفات 668 byte.

وملف نصي 300000 byte (أرقام من [[seq]]):
[[text.txt.gz]] ← 84062، و [[text.txt.xz]] ← 66608، و [[text.txt.zst]] ([[zstd -19]]) ← 72044، و [[text.txt.bz2]] ← 112963.
ومن غير [[z]]، الـ [[.tar]] حجمه 10240 (أكبر من الملفات نفسها بسبب الـ headers والتكملة).`
        },
        {
          cmd: ".7z و .rar و .xz",
          title: "إمتى تستخدم .7z، وإيه حكاية .rar، وإزاي تفكهم على أي نظام؟",
          desc: R`• [[.7z]] (7-Zip): أرشيف وضغط مع بعض بضغط قوي (LZMA2)، غالبًا أصغر من zip بفرق كبير. وفيه تشفير AES-256 حقيقي بباسورد، ويقدر يخفي أسامي الملفات كمان ([[-mhe=on]]). البرنامج 7-Zip مجاني ومفتوح على ويندوز، وعلى لينكس [[7z]] (حزمة [[p7zip-full]] أو [[7zip]])، وعلى الماك [[brew install sevenzip]].
• [[.rar]]: صيغة WinRAR. مشهورة في الملفات اللي بتتنزل من النت. صيغة مغلقة: تقدر تفكها ببرامج كتير (7-Zip و [[unrar]] و The Unarchiver على الماك، وويندوز ١١ الجديد بيفتحها)، بس عشان تعمل [[.rar]] محتاج WinRAR. مفيش سبب تستخدمه في شغلك: استخدم zip أو 7z.
• [[.xz]]: ضغط ملف واحد زي gzip بس أصغر (نفس خوارزمية 7z). بتشوفه في [[.tar.xz]] (كود لينكس وتوزيعات كتير). [[xz -d]] أو [[unxz]] يفكه.
• [[.zst]] (zstd): الجديد: سريع جدًا في الضغط والفك، وبتستخدمه Facebook و Arch Linux و Docker والـ [[.deb]] الجديدة (درس [[.deb]]).
• [[.bz2]]: قديم وبطيء، هتقابله في ملفات قديمة.
• أرشيف متقسّم: [[.7z.001]] و [[.7z.002]] أو [[.part1.rar]]: ملف كبير متقطع حتت. لازم كل الحتت تبقى في نفس الفولدر، وتفك من أول حتة.

اختيار سريع:
• هتبعته لأي حد: [[.zip]].
• لسيرفر لينكس أو backup: [[.tar.gz]] أو [[.tar.zst]].
• أصغر حجم أو تشفير قوي: [[.7z]].
• [[.rar]]: فكه بس.`,
          example: R`7z a project.7z project/src project/README.md
7z l project.7z
7z a -pSecret123 -mhe=on secret.7z project/README.md
7z x project.7z -oout3
xz -k -9 text.txt
unrar x downloaded.rar`,
          try: R`سطّب 7-Zip (ويندوز من 7-zip.org، أو [[sudo apt install 7zip]]، أو Docker: [[docker run --rm -v "$PWD":/w -w /w alpine sh -c "apk add p7zip && 7z l project.7z"]]). نفّذ المثال وقارن حجم [[project.7z]] بـ zip و tar.gz. وجرّب [[7z l secret.7z]] من غير باسورد، وبعدين بـ [[-pSecret123]].`,
          deep: {
            why: R`كل صيغة اتعملت لهدف: zip للتوافق، و tar.gz للينكس، و 7z لأصغر حجم وتشفير حقيقي، و rar كانت أحسن ضغط في التسعينات وفضلت عايشة بالعادة. ومع إن الصيغ كتير، فيه أداة واحدة (7-Zip) بتفك تقريبًا كلهم.`,
            how: R`7z بيستخدم LZMA2: بيدوّر على التكرار في مساحة كبيرة جدًا من الداتا (dictionary بالميجات)، فالملفات المتشابهة بتضغط بعض. ده بيخليه أصغر بس أبطأ وبياكل رامات أكتر. والتشفير بـ [[-p]] بيحوّل الباسورد لمفتاح AES-256، و [[-mhe=on]] بيشفّر الفهرس كمان فمحدش يشوف حتى أسامي الملفات.`,
            when: R`backup لفولدر كبير، أو ترسل ملفات سرية (مع باسورد قوي تبعته في قناة تانية)، أو تفك أي حاجة نزلت من النت.`,
            mistakes: R`تبعت [[.7z]] أو [[.rar]] لعميل معندوش برنامج يفتحه. تبعت الباسورد في نفس الإيميل مع الملف. تفك أرشيف من النت فيه [[.exe]] وتشغّله (برامج كتير بتتوزع كده). وتنسى حتة من الأرشيف المتقسّم.`
          },
          lines: [
            R`[[a]] add: اعمل أرشيف 7z بالملفات دي.`,
            R`[[l]] list: اعرض اللي جواه.`,
            R`[[-p]] باسورد، و [[-mhe=on]] شفّر أسامي الملفات كمان.`,
            R`[[x]] فك بالمسارات، و [[-o]] الفولدر (من غير مسافة بعدها).`,
            R`xz لملف واحد: [[-k]] سيب الأصلي و [[-9]] أقصى ضغط.`,
            R`فك rar (محتاج [[unrar]] أو استخدم [[7z x]]).`
          ],
          sol: R`[[7z l project.7z]] بيعرض الملفين والفولدر وفي الآخر [[2 files, 1 folders]]، وحجم الأرشيف المضغوط 28 byte للداتا. و [[file project.7z]] بيقول [[7-zip archive data, version 0.4]]، والبصمة [[37 7a bc af 27 1c]] ([[7z]] وبعدها bytes ثابتة).

[[7z l secret.7z]] من غير باسورد بيفشل (بيطلب الباسورد، أو [[Errors: 1]] لو الباسورد غلط)، لأن حتى الأسامي متشفّرة. ومع [[-pSecret123]] بيعرض [[project/README.md]].

و [[xz -k -9]] على الملف النصي (300000 byte) طلّع 66608، أصغر من gzip (84062).`
        }
      ]
    },
    {
      t: "الصور والميديا والخطوط",
      l: 3,
      n: "تختار صيغة الصورة صح (png ولا jpg ولا webp ولا avif)، و favicon، و SVG اللي هو كود XML، والفيديو والصوت (الـ container غير الـ codec)، والخطوط ttf و woff2",
      items: [
        {
          cmd: ".png و .jpg",
          title: "إمتى PNG وإمتى JPG، وإيه المعلومات المخفية (EXIF) اللي جوه صور الموبايل؟",
          desc: R`الاتنين صور bitmap (raster): شبكة بكسلات، وكل بكسل لون. لو كبّرتهم أكتر من حجمهم الحقيقي بيبقوا مربعات (pixelated).

• [[.png]]: ضغط lossless (من غير ما يضيّع أي بكسل)، ويدعم الشفافية (alpha). ممتاز للـ screenshots واللوجوهات والأيقونات والرسومات اللي فيها ألوان قليلة ومساحات سادة ونص. وحش للصور الفوتوغرافية (بيطلع ضخم).
• [[.jpg]] أو [[.jpeg]] (نفس الحاجة، الـ [[.jpg]] من أيام الامتدادات ٣ حروف): ضغط lossy: بيرمي تفاصيل العين مش هتاخد بالها منها. ممتاز للصور الفوتوغرافية (أصغر ١٠ مرات من PNG)، وحش للنص واللوجوهات (بيعمل «غبار» حوالين الحواف)، ومفيهوش شفافية. والـ quality (من 1 لـ 100) بتتحكم في الحجم، و 75 لـ 85 كفاية غالبًا. وكل ما تفتحه وتحفظه تاني بيخسر جودة تاني.

البصمات: PNG بيبدأ بـ [[89 50 4E 47 0D 0A 1A 0A]]، و JPG بـ [[FF D8 FF]].

EXIF: صور الموبايل والكاميرا (JPG و HEIC) جواها metadata: نوع الموبايل، والتاريخ، والإعدادات، وأحيانًا مكان التصوير بالـ GPS. لو اليوزر رفع صورة على موقعك وانت عرضتها زي ما هي، أي حد ينزّلها يعرف بيته فين. الحل: امسح الـ metadata وقت الرفع (مكتبة sharp في Node بتعمل ده افتراضيًا لما تعيد حفظ الصورة، أو [[magick -strip]]، أو [[exiftool -all=]]). ووسائل التواصل الكبيرة بتمسحها لوحدها، بس مواقع كتير لأ. وكمان EXIF فيه [[Orientation]]: الموبايل بيحفظ الصورة «نايمة» ويكتب «لفّها»، وبرامج بتحترم ده وبرامج لأ.

وأخ: [[.heic]] و [[.heif]]: الصيغة الافتراضية على الآيفون (أصغر من JPG)، بس المتصفحات (غير Safari) وويندوز القديم مبيعرضوهاش، فحوّلها لـ JPG أو WebP قبل ما تعرضها على الويب.

قاعدة الويب: متحطش صورة 4000 بكسل في مكان عرضه 400. صغّر المقاس الأول (ده أكبر توفير)، وبعدين اختار الصيغة (الدرس الجاي: WebP و AVIF).`,
          example: R`file photo.png camera.jpg
xxd -l 8 camera.png
magick camera.png -quality 80 camera.jpg
ls -l camera.png camera.jpg
exiftool -GPSPosition -Model phone.jpg
magick phone.jpg -strip clean.jpg`,
          try: R`خد صورة بموبايلك (والـ location شغال) وانقلها للجهاز من غير WhatsApp (بيمسح الـ metadata): كابل أو Google Photos «download original». نفّذ [[exiftool phone.jpg]] (أو على ويندوز: كليك يمين ثم Properties ثم Details) وشوف فيه إيه. بعدين خد screenshot لصفحة واحفظها PNG وحوّلها JPG وقارن الحجم والشكل حوالين الحروف. (الأدوات: [[sudo apt install imagemagick libimage-exiftool-perl]]، أو [[brew install imagemagick exiftool]].)`,
          deep: {
            why: R`الصور أتقل حاجة في أغلب المواقع، وكل صورة أكبر من اللازم بتبطّأ الصفحة خصوصًا على موبايل وباقة. واختيار الصيغة الغلط ممكن يضاعف الحجم ١٠ مرات. والـ EXIF موضوع خصوصية حقيقي بقى بيتحاسب عليه في قوانين حماية البيانات.`,
            how: R`PNG بيمشي على البكسلات صف صف ويضغط التكرار بـ Deflate (نفس اللي في zip)، فالمساحات السادة بتتضغط جدًا والصور المليانة تفاصيل لأ. JPG بيقسم الصورة مربعات ٨×٨، ويحوّل كل مربع لترددات، ويرمي الترددات العالية (التفاصيل الدقيقة) على حسب الـ quality. عشان كده الحواف الحادة (نص) بتبوظ في JPG.`,
            when: R`PNG: لوجو وأيقونة وscreenshot وأي حاجة فيها نص أو محتاجة شفافية. JPG: صور فوتوغرافية لو مش هتستخدم WebP أو AVIF. ودايمًا امسح EXIF من صور اليوزرز.`,
            mistakes: R`صور فوتوغرافية PNG على الموقع (ميجات بدل كيلوبايتات). لوجو أو screenshot JPG (حواف مبهدلة). تحفظ JPG أكتر من مرة فتبوظ. تعرض صور اليوزرز بالـ GPS. وتغيّر امتداد [[.heic]] لـ [[.jpg]] وتفتكر إنه اتحوّل (درس «الامتداد»).`
          },
          lines: [
            R`النوع والمقاس من المحتوى.`,
            R`بصمة PNG: [[89]] و [[PNG]] و [[\r\n]] و [[1a]] و [[\n]].`,
            R`ImageMagick: حوّل لـ JPG بجودة 80.`,
            R`قارن الحجم.`,
            R`اقرا مكان التصوير ونوع الموبايل من الـ EXIF.`,
            R`[[-strip]] بيمسح كل الـ metadata.`
          ],
          sol: R`على صورة 1200×800 شبه صورة الكاميرا (تدرجات وتفاصيل):
[[camera.png]] ← 633504 byte، و [[camera.jpg]] (quality 80) ← 54876 byte. يعني PNG أكبر ١١ مرة.
لكن على رسمة 800×500 فيها خطوط ومساحات سادة: PNG ← 46444، و JPG ← 113121. يعني العكس!

[[00000000: 8950 4e47 0d0a 1a0a                      .PNG....]]

و [[exiftool]] على صورة موبايل:
[[GPSPosition                     : 30 deg 2' 39.84" N, 31 deg 14' 8.52" E]] (ده وسط القاهرة)
[[Model                           : SM-S918B]]
وعلى [[clean.jpg]] بعد [[-strip]]: مفيش ولا سطر.`
        },
        {
          cmd: ".webp و .avif و .gif و .ico",
          title: "WebP و AVIF أحسن من JPG ليه، وإيه دور .gif و favicon.ico النهارده؟",
          desc: R`صيغ الويب الحديثة:
• [[.webp]] (من Google): lossy أو lossless، وفيه شفافية وحركة. أصغر من JPG بحوالي ٢٥ لـ ٣٥٪ لنفس الجودة. مدعوم في كل المتصفحات الحالية. ده الاختيار الآمن الافتراضي للويب.
• [[.avif]] (مبني على AV1): غالبًا أصغر من WebP، خصوصًا في الجودة المنخفضة. مدعوم في كل المتصفحات الحديثة، بس الضغط أبطأ.
• [[.gif]]: قديم جدًا (1987)، ٢٥٦ لون بس، وبيستخدم للصور المتحركة. الـ GIF المتحرك غالبًا ضخم: فيديو [[.mp4]] أو [[.webm]] صامت بـ [[autoplay muted loop]] أصغر بـ ١٠ مرات.
• [[.ico]]: صيغة أيقونات ويندوز، فيها كذا مقاس جوه ملف واحد (16 و 32 و 48). لسه بتستخدم كـ [[favicon.ico]] لأن المتصفحات بتطلبها من [[/favicon.ico]] لوحدها لو ملقتش حاجة.

الـ favicon النهارده:
• [[<link rel="icon" href="/favicon.ico" sizes="32x32">]] للمتصفحات القديمة.
• [[<link rel="icon" href="/icon.svg" type="image/svg+xml">]]: SVG بيبقى حاد على أي شاشة.
• [[<link rel="apple-touch-icon" href="/apple-touch-icon.png">]] (180×180) للآيفون لما حد يضيف الموقع للشاشة الرئيسية.
• و [[manifest.webmanifest]] (JSON) فيه أيقونات 192 و 512 للـ PWA و Android.
وفي Next.js بتحط [[app/icon.png]] و [[app/favicon.ico]] والإطار بيعمل الـ tags لوحده.

تدّي المتصفح أكتر من صيغة، وهو ياخد أول واحدة بيفهمها:
[[<picture>]] وجواه [[<source srcset="a.avif" type="image/avif">]] و [[<source srcset="a.webp" type="image/webp">]] و [[<img src="a.jpg" alt="...">]].
والأسهل: أدوات زي [[next/image]] و Cloudinary و Cloudflare Images بيعملوا التحويل والمقاسات لوحدهم.`,
          example: R`cwebp -q 80 camera.png -o camera.webp
avifenc -q 60 camera.png camera.avif
ls -l camera.*
magick logo.png -define icon:auto-resize=16,32,48 favicon.ico
file camera.webp camera.avif favicon.ico`,
          try: R`على نفس [[camera.png]] أو أي صورة فوتوغرافية عندك، نفّذ المثال وقارن الأحجام الأربعة (png و jpg و webp و avif) وافتح الأربعة جنب بعض في المتصفح ([[file:///]] أو سيرفر محلي) ودوّر على فرق في الجودة. (الأدوات: [[sudo apt install webp libavif-bin imagemagick]]، أو Squoosh.app في المتصفح من غير تسطيب.) وافتح [[F12]] ثم Network على أي موقع كبير وفلتر بـ Img وشوف الصيغ.`,
          deep: {
            why: R`JPG و PNG من التسعينات، والشاشات والإنترنت اتغيروا. WebP و AVIF بيستخدموا تقنيات ضغط الفيديو الحديثة على الصور، فبيدّوا نفس الجودة بحجم أقل بكتير، وده بيفرق في سرعة الموقع وترتيبه في Google (Core Web Vitals).`,
            how: R`WebP (VP8) و AVIF (AV1) بيتوقعوا كل حتة في الصورة من الحتت اللي جنبها ويحفظوا الفرق بس، وبيقسموا الصورة بلوكات بمقاسات مختلفة على حسب التفاصيل. والبصمات: WebP بيبدأ بـ [[RIFF]] وبعدها [[WEBP]]، و AVIF فيه [[ftypavif]]، و GIF بـ [[GIF89a]]، و ICO بـ [[00 00 01 00]].`,
            when: R`WebP كافتراضي لكل صور الموقع، و AVIF لو الأداة بتاعتك بتعمله لوحدها. و ICO للـ favicon بس. و GIF لأ (حوّله فيديو).`,
            mistakes: R`ترفع GIF متحرك ٨ ميجا. تغيّر امتداد JPG لـ WebP وتفتكر إنه اتحوّل. تحط [[<img src="x.avif">]] من غير بديل لمتصفحات قديمة لو جمهورك فيه أجهزة قديمة. وتعمل favicon بـ PNG كبير 1000×1000 بدل المقاسات الصغيرة.`
          },
          lines: [
            R`[[cwebp]] بيحوّل لـ WebP بجودة 80.`,
            R`[[avifenc]] بيحوّل لـ AVIF.`,
            R`قارن الأحجام.`,
            R`ICO فيه ٣ مقاسات في ملف واحد.`,
            R`البصمات والمقاسات.`
          ],
          sol: R`على صورة 1200×800 (الأحجام بالـ byte):
[[camera.png]] 633504
[[camera.jpg]] 54876 (quality 80)
[[camera.avif]] 24524
[[camera.webp]] 23550
يعني WebP و AVIF أقل من نص JPG، وفي الصورة دي WebP كسب بفرق صغير (في صور تانية AVIF بيكسب).

و [[file]]:
[[camera.webp: RIFF (little-endian) data, Web/P image, VP8 encoding, 1200x800, ...]]
[[camera.avif: ISO Media, AVIF Image]]
[[favicon.ico: MS Windows icon resource - 3 icons, 16x16, 32 bits/pixel, 32x32, 32 bits/pixel]]`
        },
        {
          cmd: ".svg",
          title: "ليه SVG مش بيبوظ مهما كبّرته، وليه هو XML تقدر تفتحه في المحرر؟",
          desc: R`[[.svg]] (Scalable Vector Graphics) مش بكسلات: هو وصف للرسمة بالأشكال (دايرة هنا، خط من هنا لهنا، لون كذا)، والمتصفح بيرسمها بالمقاس المطلوب. عشان كده حاد على أي حجم وأي شاشة، وحجمه صغير جدًا للوجوهات والأيقونات. ومش مناسب للصور الفوتوغرافية.

والمفاجأة: SVG ملف XML نصي (درس [[.xml]]). تقدر تفتحه في VS Code وتعدّل اللون بإيدك.

الرموز:
• [[<svg xmlns="http://www.w3.org/2000/svg">]]: الـ root، والـ namespace لازم لما الملف يبقى لوحده (درس xmlns).
• [[viewBox="0 0 100 100"]]: نظام الإحداثيات: الرسمة مرسومة في مربع ١٠٠×١٠٠ وحدة، وبتتمط لأي مقاس. أهم attribute: من غيره الأيقونة مش هتكبر وتصغر صح.
• [[width]] و [[height]]: المقاس الافتراضي.
• الأشكال: [[<circle cx cy r>]] و [[<rect x y width height rx>]] و [[<line>]] و [[<polygon>]] و [[<path d="...">]] (أي شكل: [[M]] روح لـ، [[L]] خط لـ، [[v]] خط رأسي، [[C]] منحنى، [[Z]] اقفل).
• [[fill]] (لون الملي) و [[stroke]] (لون الخط) و [[stroke-width]]. و [[fill="currentColor"]] بياخد لون النص من الـ CSS، وده سر الأيقونات اللي بتغيّر لونها مع النص.
• [[<text>]] نص، و [[<title>]] وصف لقارئ الشاشة، و [[<g>]] مجموعة.

بتحطه في الصفحة إزاي:
• [[<img src="logo.svg" alt="...">]]: زي أي صورة (مفيش CSS من بره ولا scripts).
• inline: الكود نفسه جوه الـ HTML، فتقدر تغيّر ألوانه بـ CSS وتحرّكه. React و Vue بيستخدموا ده للأيقونات.
• [[background-image: url(icon.svg)]] في CSS.

الأمان: SVG ممكن يبقى جواه [[<script>]] و links. لو بتسمح لليوزرز يرفعوا SVG وبتعرضه من نفس الدومين، ده XSS. اعرضه بـ [[<img>]] بس، أو نضّفه (DOMPurify)، أو امنع SVG في الرفع.

والسيرفر لازم يبعته بـ [[Content-Type: image/svg+xml]] (درس MIME). ولتصغيره: SVGO ([[npx svgo logo.svg]]).`,
          example: R`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <title>لوجو الجيم</title>
  <circle cx="50" cy="50" r="45" fill="#e11d48"/>
  <rect x="25" y="45" width="50" height="10" rx="3" fill="white"/>
  <path d="M20 40 v20 M80 40 v20" stroke="white" stroke-width="8" stroke-linecap="round"/>
  <text x="50" y="85" font-size="12" text-anchor="middle" fill="white">GYM</text>
</svg>`,
          flag: "script",
          try: R`احفظ المثال في [[logo.svg]] وافتحه في المتصفح، وكبّر الصفحة ([[Ctrl +]]) لحد 500٪: الحواف فضلت حادة؟ غيّر [[#e11d48]] لـ [[#2563eb]] واحفظ واعمل refresh. شيل [[viewBox]] وحطه في [[<img src="logo.svg" width="300">]] وقارن. وبعدين [[npx svgo logo.svg -o logo.min.svg]] وافتح الناتج.`,
          deep: {
            why: R`اللوجو والأيقونات لازم يبانوا حادين على شاشة موبايل 3x وعلى بانر كبير. لو PNG هتحتاج كذا نسخة بمقاسات مختلفة، والـ SVG ملف واحد صغير لكل المقاسات، وكمان ممكن يتلوّن ويتحرّك بالـ CSS.`,
            how: R`المتصفح بيقرا الـ XML ويحوّل كل شكل لمسارات رياضية، وبعدين بيحسب البكسلات وقت العرض على حسب المقاس الحقيقي على الشاشة. الـ [[viewBox]] بيقول «الإحداثيات اللي في الملف من (0,0) لـ (100,100)»، والمتصفح بيضرب كل حاجة في النسبة بين ده والمقاس المعروض.`,
            when: R`اللوجو والأيقونات والرسومات البسيطة والـ illustrations والـ favicon الحديث. ومش للصور الفوتوغرافية ولا الرسومات المعقدة جدًا (الملف بيبقى ضخم).`,
            mistakes: R`تشيل [[viewBox]] فالأيقونة متتمطش. SVGO نسخة 3 بإعداداته الافتراضية كان بيشيل [[viewBox]] و [[<title>]] (نسخة 4 بقت تسيبهم)، فبص على الناتج قبل ما ترفعه. تنسى [[xmlns]] فالملف لوحده ميتعرضش. وتعرض SVG رفعه يوزر inline من غير تنضيف.`
          },
          lines: [
            R`الـ root: الـ namespace، ونظام إحداثيات ١٠٠×١٠٠، والمقاس الافتراضي.`,
            R`وصف لقارئ الشاشة.`,
            R`دايرة: المركز (50,50) ونص القطر 45، ومليانة أحمر. و [[/>]] لأنه XML.`,
            R`مستطيل بحواف مدورة ([[rx]]).`,
            R`[[d]]: [[M20 40]] روح للنقطة دي، و [[v20]] خط ٢٠ لتحت، وبعدين نفس الحكاية عند 80.`,
            R`نص في النص ([[text-anchor="middle"]]).`,
            R`قفل الـ root.`
          ],
          sol: R`الـ SVG بيفضل حاد مهما كبّرت، وتغيير اللون بيبان علطول. و [[file logo.svg]] بيقول [[SVG Scalable Vector Graphics image]]، وحجمه 422 byte بس (و PNG 512×512 من نفس اللوجو 15004 byte).

من غير [[viewBox]] و [[width="300"]] على الـ img، الرسمة بتفضل ١٠٠×١٠٠ في زاوية مساحة ٣٠٠ بدل ما تتمط.

و [[npx svgo]] (نسخة 4 الحالية) بيطبع [[0.412 KiB - 5.5% = 0.39 KiB]]، والناتج سطر واحد: [[white]] بقت [[#fff]]، و [[M20 40 v20 M80 40 v20]] بقت [[M20 40v20m60-20v20]]، والـ [[viewBox]] و [[<title>]] فضلوا. أما لو مشروعك على SVGO 3 ([[npx svgo@3]])، هيطبع [[0.412 KiB - 18.7% = 0.335 KiB]] لأنه شال [[viewBox]] و [[<title>]]، فالأيقونة مش هتتمط تاني.`
        },
        {
          cmd: ".mp4 و .webm و .mp3",
          title: "إيه الفرق بين الـ container (mp4 و webm) والـ codec (H.264 و VP9)، وليه الفيديو مش بيشتغل في المتصفح؟",
          desc: R`ملف الفيديو حاجتين:
• الـ container (الصندوق): الصيغة اللي في الامتداد: [[.mp4]] و [[.webm]] و [[.mkv]] و [[.mov]] و [[.avi]]. بيحط جواه مسار فيديو ومسار صوت وترجمة ومعلومات (المدة).
• الـ codec (طريقة الضغط) لكل مسار: فيديو [[H.264]] (أو AVC، الأشهر وكله بيشغّله) و [[H.265]] (أو HEVC، أصغر بس دعمه في المتصفحات ناقص) و [[VP9]] و [[AV1]]. وصوت [[AAC]] و [[Opus]] و [[MP3]].

عشان كده ممكن ملفين [[.mp4]] واحد يشتغل والتاني لأ: الامتداد واحد والـ codec جواه مختلف (فيديو آيفون HEVC مثلًا). ونفس الكلام لـ [[.mkv]]: صندوق المتصفحات مبتدعموش رسميًا.

للويب:
• [[.mp4]] فيه H.264 + AAC: بيشتغل في كل حتة. ده الافتراضي الآمن.
• [[.webm]] فيه VP9 أو AV1 + Opus: أصغر، ومدعوم في كل المتصفحات الحديثة.
• [[<video controls>]] وجواه [[<source src="a.webm" type="video/webm">]] و [[<source src="a.mp4" type="video/mp4">]]: المتصفح ياخد أول واحدة يقدر يشغّلها.
• [[-movflags +faststart]] وانت بتعمل mp4: بيحط الفهرس (moov) في أول الملف، فالفيديو يبدأ قبل ما يتنزّل كله.
• فيديو طويل: متحطوش ملف واحد على سيرفرك. استخدم HLS ([[.m3u8]] وقطع [[.ts]]) عن طريق خدمة (Mux و Cloudflare Stream و YouTube)، لأن فيها جودات متعددة على حسب سرعة النت.

الصوت: [[.mp3]] (قديم ومدعوم في كل حتة)، و [[.m4a]] (AAC في صندوق mp4)، و [[.ogg]] و [[.opus]] (Opus، أحسن جودة لنفس الحجم)، و [[.wav]] (من غير ضغط، ضخم)، و [[.flac]] (lossless).

الأداة اللي بتعمل كل ده: [[ffmpeg]] (و [[ffprobe]] يقولك الملف فيه إيه). أغلب برامج الفيديو والمواقع بتستخدمها من جوه.`,
          example: R`ffprobe -v error -show_entries format=format_name,duration:stream=codec_type,codec_name -of compact clip.mp4
ffmpeg -i clip.mp4 -c:v libvpx-vp9 -crf 35 -b:v 0 -c:a libopus clip.webm
ffmpeg -i clip.mp4 -vn -c:a libmp3lame -b:a 128k sound.mp3
ffmpeg -i input.mov -c:v libx264 -crf 23 -c:a aac -movflags +faststart web.mp4
file clip.mp4 clip.webm sound.mp3`,
          try: R`سطّب ffmpeg ([[sudo apt install ffmpeg]] أو [[brew install ffmpeg]] أو [[winget install ffmpeg]]). اعمل فيديو تجربة ٣ ثواني: [[ffmpeg -f lavfi -i testsrc=duration=3:size=640x360:rate=30 -f lavfi -i sine=frequency=440:duration=3 -c:v libx264 -pix_fmt yuv420p -c:a aac clip.mp4]]، ونفّذ المثال. وجرّب [[ffprobe]] على فيديو من موبايلك وشوف الـ codec. وغيّر امتداد [[clip.webm]] لـ [[fake.mp4]] ونفّذ [[file]] و [[ffprobe]] عليه.`,
          deep: {
            why: R`الفيديو الخام ضخم جدًا (دقيقة 1080p من غير ضغط حوالي ١٠ جيجا)، فالـ codecs بتضغطه مئات المرات. وكل شركة عملت codec وكل نظام دعم مجموعة، فبقى الامتداد مش كفاية تعرف الفيديو هيشتغل ولا لأ.`,
            how: R`الـ codec بيحفظ صورة كاملة كل شوية (keyframe)، وفي النص بيحفظ «اللي اتغير بس» من الصورة اللي قبلها. والـ container بيلف مسارات الفيديو والصوت مع بعض بتوقيتات عشان يفضلوا متزامنين. و [[ffprobe]] بيقرا الـ container ويقولك كل مسار فيه أنهي codec.`,
            when: R`فيديو على موقعك (hero video، شرح منتج)، أو صوت إشعارات، أو تحويل فيديوهات اليوزرز قبل عرضها.`,
            mistakes: R`ترفع فيديو آيفون HEVC [[.mov]] وتغيّر امتداده لـ [[.mp4]] وتستغرب إنه مش شغال في Chrome. فيديو من غير [[faststart]] فميبدأش غير لما يتنزّل كله. فيديو ٢٠٠ ميجا على صفحة الـ home. و [[autoplay]] من غير [[muted]] (المتصفحات بتمنعه).`
          },
          lines: [
            R`[[ffprobe]] بيقول الـ container والمدة وكل مسار بالـ codec بتاعه.`,
            R`حوّل لـ WebM: فيديو VP9 بجودة ثابتة ([[-crf]]) وصوت Opus.`,
            R`استخرج الصوت بس ([[-vn]] من غير فيديو) لـ MP3 بـ 128kbps.`,
            R`حوّل أي فيديو (زي mov من آيفون) لـ mp4 مناسب للويب.`,
            R`[[file]] بيعرف الـ container من البصمة.`
          ],
          sol: R`الناتج الحقيقي على فيديو التجربة:
[[stream|codec_name=h264|codec_type=video]]
[[stream|codec_name=aac|codec_type=audio]]
[[format|format_name=mov,mp4,m4a,3gp,3g2,mj2|duration=3.000000]]
والـ webm: [[codec_name=vp9]] و [[codec_name=opus]] و [[format_name=matroska,webm]].
[[clip.mp4:  ISO Media, MP4 Base Media v1 [ISO 14496-12:2003]]]
[[clip.webm: WebM]]
[[sound.mp3: Audio file with ID3 version 2.4.0, contains: MPEG ADTS, layer III, v1, 128 kbps, 44.1 kHz, Monaural]]

و [[fake.mp4]]: [[file]] بيقول [[WebM]]، و [[ffprobe]] بيقول [[format_name=matroska,webm]]. الامتداد اتغيّر والمحتوى لأ.`
        },
        {
          cmd: ".woff2 و .ttf و .otf",
          title: "ملفات الخطوط ttf و otf و woff2 إيه، وتحط خط عربي في موقعك إزاي؟",
          desc: R`الخط (font) ملف فيه شكل كل حرف (glyph) كمنحنيات، ومعلومات المسافات بين الحروف، وقواعد زي اتصال الحروف العربية (أول ووسط وآخر الكلمة).

• [[.ttf]] (TrueType) و [[.otf]] (OpenType): الصيغ اللي بتسطّبها على الجهاز. OpenType أحدث وفيه مميزات أكتر، وعمليًا الاتنين شغالين في كل حتة.
• [[.woff2]] (Web Open Font Format 2): نفس الخط مضغوط بـ Brotli للويب، أصغر بحوالي ٣٠ لـ ٦٠٪ من ttf. ده اللي تستخدمه في المواقع، وكل المتصفحات بتدعمه.
• [[.woff]]: النسخة الأولى (ضغط أضعف). مبقاش ليه لازمة.
• [[.eot]]: كان لـ Internet Explorer. انساه.
• Variable fonts: ملف واحد فيه كل الأوزان (من 100 لـ 900) بدل ملف لكل وزن.

في الموقع:
[[@font-face { font-family: "Cairo"; src: url("/fonts/cairo.woff2") format("woff2"); font-weight: 400; font-display: swap; }]]
وبعدين [[font-family: "Cairo", system-ui, sans-serif;]].
• [[font-display: swap]]: اعرض النص بخط النظام لحد ما الخط يتحمّل، بدل ما الصفحة تفضل فاضية.
• [[unicode-range]]: حمّل الملف ده بس لو الصفحة فيها حروف من المدى ده (Google Fonts بيقسم الخط ملف للعربي وملف للاتيني).
• أو أسهل: Google Fonts بلينك، أو [[next/font]] في Next.js (بينزّل الخط وقت الـ build ويخدمه من موقعك).

خطوط عربي مجانية كويسة: Cairo و Tajawal و IBM Plex Sans Arabic و Noto Sans Arabic و Almarai (كلهم على Google Fonts برخصة OFL).

الرخصة: الخط برنامج ليه رخصة. خط اشتريته للطباعة غالبًا مش مسموح تحطه على موقع. اتأكد إن الرخصة فيها web embedding.

تصغير الخط (subsetting): لو الموقع إنجليزي بس، شيل الحروف اللي مش محتاجها: [[pyftsubset]] من fonttools بيعمل كده.`,
          example: R`fc-list : family file | head -3
file DejaVuSans.ttf
fonttools ttLib.woff2 compress -o DejaVuSans.woff2 DejaVuSans.ttf
pyftsubset DejaVuSans.ttf --unicodes="U+0020-007E" --flavor=woff2 --output-file=latin.woff2
ls -l DejaVuSans.ttf DejaVuSans.woff2 latin.woff2`,
          try: R`نزّل خط Cairo من Google Fonts (بييجي ttf) وحوّله woff2 ([[pip install fonttools brotli]] وبعدين أمر المثال)، وحطه في صفحة HTML بـ [[@font-face]] وشوف الفرق في العربي. افتح [[F12]] ثم Network وفلتر بـ Font وشوف الملف اتحمّل وحجمه. وعلى لينكس [[fc-list :lang=ar family]] بيعرض الخطوط اللي فيها عربي على جهازك.`,
          deep: {
            why: R`شكل الخط جزء كبير من هوية الموقع، والعربي بالذات خطوط النظام الافتراضية فيه مش حلوة في كل الأجهزة. بس كل ملف خط بيتنزّل قبل ما النص يتعرض بشكله النهائي، فلازم يبقى صغير (woff2، و subset، ووزنين أو تلاتة بس).`,
            how: R`المتصفح بيقرا الـ CSS، ولما يلاقي نص محتاج الخط ده بيطلب ملف الـ woff2 ويفك ضغطه (Brotli) ويرسم الحروف منه. وفي العربي، محرك اسمه HarfBuzz بيستخدم جداول جوه الخط (GSUB) عشان يختار شكل الحرف على حسب مكانه ويوصّله باللي جنبه.`,
            when: R`أي موقع ليه هوية، خصوصًا عربي. ومش محتاج تحمّل خط لو [[system-ui]] كفاية (لوحات التحكم الداخلية مثلًا).`,
            mistakes: R`تحمّل ٨ أوزان من الخط وانت بتستخدم ٢. تستخدم ttf على الويب (أكبر). تنسى [[font-display: swap]] فالنص يختفي ثواني. تحط خط مش مرخّص للويب. وتعمل subset للاتيني بس وموقعك فيه عربي فالعربي يرجع لخط النظام.`
          },
          lines: [
            R`الخطوط المتسطّبة على الجهاز (لينكس) بأساميها ومكانها.`,
            R`[[file]] بيعرف إنه TrueType.`,
            R`fonttools بيحوّله woff2 (محتاج حزمة brotli).`,
            R`subset: الحروف الإنجليزية والأرقام والرموز بس ([[U+0020]] لـ [[U+007E]]).`,
            R`قارن الأحجام.`
          ],
          sol: R`الناتج الحقيقي على DejaVu Sans:
[[DejaVuSans.ttf: TrueType Font data, 20 tables, 1st "FFTM", 26 names, Macintosh]]
[[DejaVuSans.ttf]] ← 759720 byte
[[DejaVuSans.woff2]] ← 258720 byte (حوالي الثلث)
[[latin.woff2]] ← 13680 byte (أصغر ٥٥ مرة: الخط الأصلي فيه آلاف الحروف لغات كتير)
وبصمة woff2 هي [[wOF2]]، و ttf بيبدأ بـ [[00 01 00 00]].

[[pyftsubset]] ممكن يطبع تحذير زي [[WARNING: FFTM NOT subset; don't know how to subset; dropped]]: جدول معلومات مش مهم، عادي.`
        }
      ]
    },
    {
      t: "المستندات وقواعد البيانات",
      l: 3,
      n: "PDF جواه إيه ومعلوماته المخفية، وليه .docx و .xlsx هما zip فيه XML (وتقرا الداتا منهم بإيدك)، وقاعدة بيانات كاملة في ملف واحد: .db و .sqlite",
      items: [
        {
          cmd: ".pdf",
          title: "ملف PDF جواه إيه، وليه صعب تعدّله أو تطلّع منه نص عربي سليم؟",
          desc: R`PDF (Portable Document Format) معمول عشان المستند يتعرض بنفس الشكل بالظبط على أي جهاز وأي طابعة. هو مش «نص بتنسيق» زي Word: هو أوامر رسم: «حط الحرف ده في الإحداثيات دي بالخط ده». عشان كده:
• شكله ثابت في كل حتة (ودي ميزته الأساسية للفواتير والعقود والـ CV).
• تعديله صعب (البرامج بتحاول تخمّن الفقرات من مكان الحروف).
• استخراج النص منه ساعات بيطلع مكسّر، خصوصًا العربي: الحروف بتبقى مرسومة بأشكالها المتصلة، فالكلمات ممكن تطلع بترتيب مقلوب أو حروف متفصلة.

جواه إيه:
• بيبدأ بـ [[%PDF-1.7]] (النسخة)، وبيخلص بـ [[%%EOF]].
• objects مترقمة: صفحات، وخطوط (غالبًا مدموجة جواه)، وصور، و streams مضغوطة فيها أوامر الرسم.
• جدول في الآخر ([[xref]]) بيقول كل object فين.
• metadata: [[Author]] و [[Creator]] (البرنامج اللي عمله) و [[Producer]] وتاريخ الإنشاء. والـ [[Author]] غالبًا اسمك على الجهاز، فاتأكد منه قبل ما تبعت ملف لعميل.
• ممكن يكون فيه forms وتوقيعات رقمية وروابط و JavaScript ومرفقات، وعشان كده PDF من مصدر مش معروف ممكن يبقى خطر (القارئ اللي في المتصفح أأمن من البرامج القديمة).

أدوات (poppler-utils على لينكس: [[sudo apt install poppler-utils]]):
• [[pdfinfo file.pdf]]: الصفحات والمقاس والـ metadata.
• [[pdftotext file.pdf -]]: النص.
• [[pdftoppm -png file.pdf page]]: كل صفحة صورة.
• [[qpdf]]: يقسم ويدمج ويفك الحماية.
• تعمل PDF: من المتصفح (Print ثم Save as PDF)، أو [[soffice --headless --convert-to pdf file.docx]]، أو من الكود (Puppeteer أو Playwright بيحوّلوا صفحة HTML لـ PDF، ودي أحسن طريقة للفواتير بالعربي).`,
          example: R`file report.pdf
head -c 8 report.pdf
pdfinfo report.pdf
pdftotext report.pdf - | head -3
soffice --headless --convert-to pdf report.txt`,
          try: R`اعمل [[report.txt]] فيه سطرين عربي وحوّله PDF بـ LibreOffice (آخر أمر في المثال، أو من Word ثم Save as PDF). نفّذ باقي المثال عليه واقرا [[Creator]] و [[Producer]]. قارن النص اللي [[pdftotext]] طلّعه بالأصلي. وجرّب على أي فاتورة أو CV عندك [[pdfinfo]] وشوف [[Author]] مكتوب فيه إيه.`,
          deep: {
            why: R`قبل PDF، المستند كان بيتعرض مختلف على كل جهاز على حسب الخطوط والبرامج. Adobe عملته سنة 1993 كـ «ورقة رقمية»، وبقى معيار ISO، فبقى الصيغة الرسمية لأي حاجة لازم شكلها ميتغيرش.`,
            how: R`القارئ بيقرا [[xref]] من آخر الملف عشان يعرف أماكن الـ objects، وبعدين لكل صفحة بيفك الـ stream المضغوط ويمشي على أوامر زي «اختار الخط F1 بحجم 12، روح للنقطة (72, 700)، ارسم الـ glyphs دي». مفيش حاجة اسمها «فقرة» أو «سطر» في الملف، عشان كده [[pdftotext]] بيخمّن.`,
            when: R`فواتير وتقارير وعقود و CV بتتبعت. وفي الكود: توليد فواتير (HTML ثم PDF بـ Playwright)، وقراية PDFs اليوزرز (مكتبات زي pdf.js و pdfplumber، أو OCR لو PDF صور).`,
            mistakes: R`تبعت PDF فيه [[Author]] اسمك الحقيقي أو اسم الشركة القديمة. تعتمد على [[pdftotext]] في استخراج داتا عربي مهمة من غير مراجعة. تعمل «تشويش» على معلومة بمستطيل أسود فوقها والنص لسه تحته (redaction غلط، والنص بيتنسخ عادي). وتفتح مرفقات PDF من مصادر مش معروفة في برامج قديمة.`
          },
          lines: [
            R`[[file]] بيقول PDF ونسخته وعدد الصفحات.`,
            R`أول ٨ حروف: [[%PDF-1.7]].`,
            R`الـ metadata والمقاس وعدد الصفحات.`,
            R`[[-]] يعني اطبع النص على الشاشة بدل ملف.`,
            R`LibreOffice من غير واجهة يحوّل أي مستند لـ PDF.`
          ],
          sol: R`الناتج الحقيقي على PDF عمله LibreOffice من ملف نصي فيه «تقرير الحجوزات» و «عدد الأعضاء: 42»:
[[report.pdf:  PDF document, version 1.7, 1 page(s) (zip deflate encoded)]]
[[%PDF-1.7]]
و [[pdfinfo]] فيه:
[[Creator:         Writer]]
[[Producer:        LibreOffice 24.2]]
[[CreationDate:    Thu Oct  1 17:14:55 2026 EEST]]
[[Pages:           1]]
و [[pdftotext]] طلّع:
[[تقرير الحجوزات]]
[[عدد األعضاء: 42]] (لاحظ «األعضاء» بدل «الأعضاء»: الحرفين المتصلين «لأ» طلعوا «أل» بالترتيب المقلوب، وفيه كمان حروف اتجاه مخفية حوالين السطور).`
        },
        {
          cmd: ".docx و .xlsx",
          title: "ليه .docx و .xlsx في الحقيقة ملفات zip، وتقرا الداتا منهم من غير Office إزاي؟",
          desc: R`صيغ Office الحديثة (من 2007) اسمها Office Open XML: الملف zip فيه ملفات XML (درس [[.xml]]) وصور. الـ [[x]] في آخر الامتداد معناها XML:
• [[.docx]] (Word): النص في [[word/document.xml]]، والتنسيقات في [[word/styles.xml]]، والصور في [[word/media/]].
• [[.xlsx]] (Excel): كل شيت في [[xl/worksheets/sheet1.xml]]، والنصوص كلها مرة واحدة في [[xl/sharedStrings.xml]] (والخلية بتشاور على رقم النص)، والأرقام جوه الخلية نفسها.
• [[.pptx]] (PowerPoint): كل slide في [[ppt/slides/slide1.xml]].
• وفي الكل: [[[Content_Types].xml]] (نوع كل جزء)، و [[docProps/core.xml]] (المؤلف وآخر واحد عدّل والتواريخ)، و [[_rels/]] (العلاقات بين الأجزاء).

التاجات فيها namespaces (درس xmlns): في Word [[<w:p>]] فقرة، و [[<w:r>]] حتة نص بنفس التنسيق (run)، و [[<w:t>]] النص نفسه. وفي Excel [[<c r="B2" t="n"><v>12</v></c>]] خلية B2 رقم قيمتها 12، و [[t="s"]] يعني النص في sharedStrings.

والقديم: [[.doc]] و [[.xls]] و [[.ppt]] (قبل 2007) صيغ binary مقفولة، صعب تتقري من غير مكتبة.

[[.xlsm]] و [[.docm]]: نفس الصيغة بس فيها macros (كود VBA بيتشغّل)، وده أشهر طريقة لنشر الفيروسات في الشركات. Office بيقفل الـ macros في الملفات اللي نازلة من النت.

عمليًا في الكود متفكش الـ XML بإيدك، استخدم مكتبة: [[openpyxl]] و [[pandas.read_excel]] و [[python-docx]] في Python، و [[exceljs]] و [[SheetJS]] في JS، و Apache POI في Java. بس فهمك إنه zip و XML بيفيدك: تطلّع كل الصور من مستند ([[unzip -j file.docx "word/media/*"]])، أو تعرف ليه ملف بايظ، أو تمسح المؤلف من [[core.xml]].`,
          example: R`file report.docx visits.xlsx
unzip -l report.docx
unzip -p report.docx word/document.xml | grep -o '<w:t[^>]*>[^<]*</w:t>'
unzip -p visits.xlsx xl/sharedStrings.xml | grep -o '<t[^>]*>[^<]*</t>'
unzip -p report.docx docProps/core.xml`,
          try: R`اعمل مستند Word فيه سطرين ([[report.docx]]) وشيت Excel فيه عمودين وكام صف ([[visits.xlsx]]) (أو بـ LibreOffice: [[soffice --headless --convert-to docx report.txt]]). نفّذ المثال. غيّر امتداد نسخة من الـ docx لـ [[.zip]] وافتحها بدبل كليك. وفي ملف Word من الشغل شوف [[docProps/core.xml]] فيه اسم مين.`,
          deep: {
            why: R`صيغ Office القديمة كانت binary مقفولة ومحدش بره Microsoft يعرف يقراها كويس. تحت ضغط الحكومات والمعايير المفتوحة، Microsoft عملت صيغة مبنية على zip و XML (اتعملت معيار ISO)، فأي برنامج يقدر يقراها ويكتبها. و LibreOffice عنده نفس الفكرة: [[.odt]] و [[.ods]] (OpenDocument).`,
            how: R`Word وهو بيفتح الملف بيفك الـ zip في الذاكرة، ويقرا [[[Content_Types].xml]] و [[_rels/.rels]] عشان يعرف المستند الأساسي فين، وبعدين يقرا [[document.xml]] فقرة فقرة. وكل ما تغيّر التنسيق في نص الجملة، Word بيقسم النص [[<w:r>]] جديد، عشان كده النص ممكن يطلع متقطع في أكتر من [[<w:t>]].`,
            when: R`استيراد داتا من Excel العميل، أو توليد تقارير Excel أو Word من الكود، أو استخراج الصور من مستند، أو فحص ملف مشبوه.`,
            mistakes: R`تتعامل مع [[.xlsx]] كأنه CSV ([[cat]] أو [[split(",")]]). تبعت مستند فيه tracked changes أو تعليقات قديمة أو اسم المؤلف. تفتح [[.xlsm]] أو [[.docm]] من إيميل وتدوس «Enable Content». وتغيّر امتداد [[.csv]] لـ [[.xlsx]] وتفتكر إنه بقى Excel.`
          },
          lines: [
            R`[[file]] بيعرفهم Word و Excel (بيبص جوه الـ zip).`,
            R`جوه الـ docx: XML كله.`,
            R`[[-p]] اطبع ملف من جوه الـ zip، و [[grep -o]] يطلّع حتت النص بس.`,
            R`النصوص بتاعة Excel كلها في ملف واحد.`,
            R`المؤلف والتواريخ ([[dc:creator]] و [[cp:lastModifiedBy]]).`
          ],
          sol: R`الناتج الحقيقي (ملفات عملها LibreOffice):
[[report.docx: Microsoft Word 2007+]]
[[visits.xlsx: Microsoft Excel 2007+]]
[[unzip -l]] فيه [[_rels/.rels]] و [[docProps/core.xml]] و [[docProps/app.xml]] و [[word/document.xml]] و [[word/styles.xml]] و [[word/fontTable.xml]] و [[word/settings.xml]] و [[word/theme/theme1.xml]] و [[[Content_Types].xml]]: [[10 files]].
النص:
[[<w:t>تقرير الحجوزات</w:t>]]
[[<w:t>عدد الأعضاء</w:t>]]
[[<w:t xml:space="preserve">: </w:t>]]
[[<w:t>42</w:t>]]
(السطر التاني اتقسم ٣ حتت.) وفي Excel: [[name]] و [[visits]] و [[سارة]] و [[علي]]، والأرقام 12 و 7 في [[sheet1.xml]] نفسه: [[<c r="B2" s="0" t="n"><v>12</v></c>]].
و [[core.xml]] فيه [[<dc:creator>]] (فاضي هنا، وفي Word هتلاقي اسمك) و [[<dc:language>ar-EG</dc:language>]].`
        },
        {
          cmd: ".db و .sqlite",
          title: "قاعدة بيانات كاملة في ملف واحد (.db و .sqlite): تفتحها وتقراها إزاي، وإيه ملفات -wal و -shm؟",
          desc: R`SQLite قاعدة بيانات SQL كاملة (جداول وعلاقات و transactions) بس من غير سيرفر: القاعدة كلها ملف واحد على الهارد، والمكتبة جوه برنامجك بتقرا وتكتب فيه مباشرة. الامتدادات: [[.db]] و [[.sqlite]] و [[.sqlite3]] و [[.db3]] (كلها نفس الصيغة، والاسم اختياري تمامًا).

هي أكتر قاعدة بيانات مستخدمة في العالم: في كل موبايل Android و iPhone (كل تطبيق تقريبًا)، وفي Chrome و Firefox (التاريخ والكوكيز)، وفي VS Code، وفي تطبيقات Desktop كتير، وفي مشاريع صغيرة ومتوسطة على السيرفر، و Prisma و Django بيستخدموها للتجربة ([[dev.db]] و [[db.sqlite3]]).

الملف بيبدأ بـ [[SQLite format 3]] وبعدها byte صفر، فـ [[file]] بيعرفه علطول.

ملفات جنبه:
• [[gym.db-wal]] و [[gym.db-shm]]: لما القاعدة في وضع WAL (Write-Ahead Log)، الكتابات الجديدة بتروح الأول في [[-wal]] وبعدين تتدمج. لو نسخت [[gym.db]] لوحده والبرنامج شغال، ممكن تاخد نسخة ناقصة.
• [[gym.db-journal]]: في الوضع القديم، ملف مؤقت وقت الـ transaction.
عشان كده متنسخش ملف قاعدة شغالة بـ [[cp]]: استخدم [[.backup]] من الـ CLI، أو [[VACUUM INTO 'backup.db']].

بتفتحها إزاي:
• الـ CLI: [[sqlite3 gym.db]] (حزمة [[sqlite3]])، وجواه [[.tables]] و [[.schema]] و [[.dump]] و [[.quit]]. أو [[python3 -m sqlite3 gym.db "SELECT ..."]] (Python 3.12+ من غير تسطيب).
• برامج: DB Browser for SQLite، و DBeaver، وإضافات VS Code.
• من الكود: [[sqlite3]] في Python جاهز، و [[better-sqlite3]] و [[node:sqlite]] في Node.

متى تستخدمها ومتى لأ: ممتازة لتطبيق واحد بيكتب فيها (موبايل، desktop، موقع صغير). مش مناسبة لو سيرفرات كتير هتكتب في نفس الوقت (ده شغل PostgreSQL أو MySQL، اللي القاعدة فيها مش ملف بتتعامل معاه، فولدر كامل بيديره السيرفر).

وفي Git: الـ [[.db]] binary وبيتغير كله مع أي تعديل، فحطه في [[.gitignore]]، واعمل commit للـ migrations أو [[.dump]] بدله.`,
          example: R`file gym.db
xxd -l 16 gym.db
ls gym.db*
python3 -m sqlite3 gym.db "SELECT name, visits FROM members ORDER BY visits DESC"
sqlite3 gym.db .dump`,
          try: R`اعمل القاعدة بـ Python:
[[python3 -c 'import sqlite3; c = sqlite3.connect("gym.db"); c.execute("PRAGMA journal_mode=WAL"); c.execute("CREATE TABLE members (id INTEGER PRIMARY KEY, name TEXT NOT NULL, visits INTEGER DEFAULT 0)"); c.executemany("INSERT INTO members (name, visits) VALUES (?, ?)", [("سارة", 12), ("علي", 7)]); c.commit(); print(sorted(__import__("os").listdir(".")))']]
لاحظ الملفات وهي مفتوحة. بعدين نفّذ المثال (لو [[sqlite3]] مش متسطّب، الـ dump بـ Python: [[python3 -c 'import sqlite3; [print(l) for l in sqlite3.connect("gym.db").iterdump()]']]). وافتح الملف في DB Browser for SQLite.`,
          deep: {
            why: R`أغلب البرامج محتاجة تخزن داتا منظمة وتعمل عليها استعلامات، بس مش محتاجة سيرفر قاعدة بيانات بإعداداته وباسورداته. SQLite بيدّي SQL كامل في ملف، بمكتبة صغيرة، وموثوق جدًا (بيستخدم في الطيارات).`,
            how: R`الملف مقسوم صفحات (pages) بحجم ثابت (غالبًا 4096 byte)، والجداول والفهارس متخزنة كـ B-trees جوه الصفحات. وفي وضع WAL، الكتابة بتتضاف في آخر [[-wal]] (سريع ومش بيقفل القراية)، وكل فترة بيحصل checkpoint يدمجها في الملف الأصلي. ولما آخر اتصال يتقفل صح، [[-wal]] و [[-shm]] بيتمسحوا.`,
            when: R`تطبيقات الموبايل و Desktop، والمشاريع الصغيرة، والتجربة المحلية، والكاش، وأدوات command line. وكمان تحليل داتا: تحط CSV في SQLite وتعمل عليه SQL.`,
            mistakes: R`تعمل commit لـ [[dev.db]] فيه داتا حقيقية. تنسخ القاعدة بـ [[cp]] والبرنامج شغال وتنسى [[-wal]]. تستخدمها على سيرفرات كتير بتكتب في نفس الوقت أو على فولدر شبكة (NFS) فتتبوظ أو تطلّع [[database is locked]]. وتفتح [[.db]] في محرر نصوص وتحفظه.`
          },
          lines: [
            R`[[file]] بيعرفه SQLite ويقرا معلومات من الـ header.`,
            R`أول ١٦ byte: [[SQLite format 3]] وبعدها صفر.`,
            R`الملف وجنبه [[-wal]] و [[-shm]] لو القاعدة WAL ومفتوحة.`,
            R`استعلام من غير تسطيب أي حاجة (Python 3.12+).`,
            R`القاعدة كلها كأوامر SQL (backup نصي).`
          ],
          sol: R`الناتج الحقيقي:
[[gym.db: SQLite 3.x database, last written using SQLite version 3045001, writer version 2, read version 2, file counter 2, database pages 2, ...]]
[[00000000: 5351 4c69 7465 2066 6f72 6d61 7420 3300  SQLite format 3.]]
وأمر Python وهو شغال طبع [[['gym.db', 'gym.db-shm', 'gym.db-wal']]]، وبعد ما اتقفل [[ls gym.db*]] بيطبع [[gym.db]] بس.
[[('سارة', 12)]]
[[('علي', 7)]]
والـ dump:
[[BEGIN TRANSACTION;]]
[[CREATE TABLE members (id INTEGER PRIMARY KEY, name TEXT NOT NULL, visits INTEGER DEFAULT 0);]]
[[INSERT INTO "members" VALUES(1,'سارة',12);]]
[[INSERT INTO "members" VALUES(2,'علي',7);]]
[[COMMIT;]]`
        }
      ]
    }
]);
