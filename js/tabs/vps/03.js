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
          lines: ["سطّب Docker.", "اسمح لـ deploy يستخدمه من غير sudo.", "اخرج، وادخل تاني عشان الجروب يتطبق."],
          sol: R`بعد [[exit]] والدخول تاني، [[docker run --rm hello-world]] من غير sudo بيطبع [[Hello from Docker!]] و [[This message shows that your installation appears to be working correctly.]].

و [[groups]] بيوري [[deploy sudo users docker]]، و [[docker compose version]] بيطبع نسخة Compose (بيتسطب مع السكربت الرسمي).

الغلط الشائع: [[permission denied while trying to connect to the Docker daemon socket]]: ماعملتش exit ودخلت تاني بعد الـ usermod. و [[Cannot connect to the Docker daemon ... Is the docker daemon running?]]: الخدمة واقفة، [[sudo systemctl enable --now docker]].`
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
          lines: [
            "سطّب certbot.",
            "خد الشهادة وظبط Nginx.",
            "الزق سكربت الباك أب.",
            "اديله صلاحية التشغيل.",
            "ضيفه في الجدول اليومي."
          ],
          sol: R`السطر في [[crontab -e]]: [[0 3 * * * /home/deploy/backup.sh >> /home/deploy/backup.log 2>&1]]، و [[crontab -l]] بيوريه. وقبل ما تعتمد عليه شغّل [[~/backup.sh]] بإيدك مرة واتأكد إن ملف الباك أب اتعمل.

بعد [[sudo reboot]] والانتظار دقيقة: [[https://example.com]] بيفتح بالقفل من غير ما تعمل حاجة، و [[curl -I https://example.com]] بيرجع [[HTTP/2 200]] أو [[HTTP/1.1 200]]، و [[http://]] بيعمل 301 لـ https. ده معناه إن Nginx و Docker (بـ [[restart: unless-stopped]]) قاموا لوحدهم.

الغلط الشائع: الموقع بيرجع 502 بعد الـ reboot: الـ containers مش عليها restart policy أو خدمة docker مش enabled. والباك أب مابيتعملش: السكربت من غير [[chmod +x]] أو فيه مسارات نسبية؛ اقرا [[backup.log]].`
        }
      ]
    }
]);
