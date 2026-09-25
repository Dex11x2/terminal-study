// كل درس هنا في مكان واحد:
//   cmd      اسم الأمر (ولازم يبقى فريد جوه التاب، لأن التقدم محفوظ بيه)
//   title    العنوان القصير، ودا اللي بيظهر كسؤال في «اختبرني»
//   desc     الشرح. الفقرات مفصولة بسطر فاضي، و [[كلام]] بيتعرض كـ code
//   example  المثال. كل سطر أمر، والسطور اللي بتبدأ بـ # تعليق
//   try      التجربة اللي تعملها بإيدك
//   flag     اختياري: "danger" أو "script" (من غير prompt) أو "keys" أو "term" أو "console"
//   mac      اختياري (bash بس): ["both"|"diff"|"linux", ملاحظة الماك]
//   deep     اختياري: why / how / when / mistakes
//   lines    اختياري: شرح لكل سطر في المثال بالترتيب، من غير السطور الفاضية والتعليقات
// ولو محتاج تكتب ${ جوه R`...` اكتبها $__{ والصفحة بترجّعها.

TAB("glossary", {
  label: "bash",
  prompt: "$ ",
  lab: R`echo "اكتب / ودوّر على أي مصطلح"`,
  labText: "ده مش للمذاكرة بالترتيب. لما تقابل كلمة مش فاهمها في أي تاب، دوّر عليها هنا (زرار / للبحث). كل مصطلح فيه الأمر اللي بيوريه، واسم التاب اللي فيه شرحه الكامل.",
  levels: {
    "1": ["المصطلحات", "كل مصطلح في سطرين، وأمر بيوريه، وفين شرحه الكامل في الصفحة"]
  },
  categories: [
    {
      t: "الشيل والعمليات",
      l: 1,
      items: [
        {
          cmd: "terminal / shell",
          title: "الشباك والمترجم",
          desc: "الترمنال الشباك اللي بتكتب فيه. الشيل (bash، zsh، PowerShell) البرنامج اللي بيقرا اللي كتبته ويشغّله. الترمنال بيعرض، والشيل بيفهم.",
          example: "echo $SHELL",
          try: "ابدأ من هنا"
        },
        {
          cmd: "prompt",
          title: "المؤشر",
          desc: "النص اللي قبل مكان الكتابة (زي [[deploy@vps:~$]]): بيقولك انت مين، على أنهي جهاز، وفي أنهي فولدر. الـ [[$]] يوزر عادي و [[#]] root.",
          example: "echo $PS1",
          try: "ابدأ من هنا"
        },
        {
          cmd: "PATH",
          title: "فين الأوامر",
          desc: "متغير فيه لستة فولدرات. لما تكتب [[node]]، الشيل بيدوّر عليه في الفولدرات دي بالترتيب. «command not found» يعني مش في أي منهم.",
          example: R`echo $PATH | tr ':' '\n'`,
          try: "bash المستوى ٢: [[which / type]]"
        },
        {
          cmd: "stdin / stdout / stderr",
          title: "القنوات التلاتة",
          desc: "كل برنامج ليه مدخل (0)، ومخرج عادي (1)، ومخرج أخطاء (2). الـ pipe بيوصّل 1 بمدخل اللي بعده، والأخطاء بتفضل على الشاشة إلا لو وجّهتها بـ [[2>]].",
          example: "ls /nope 2>/dev/null",
          try: "bash المستوى ٢: [[2>&1]]"
        },
        {
          cmd: "exit code",
          title: "رقم النجاح",
          desc: "كل أمر لما يخلص بيرجع رقم: 0 نجح، غير كده فشل. [[&&]] و [[if]] و CI كلهم بيقروا الرقم ده. [[$?]] آخر واحد.",
          example: "false; echo $?",
          try: "bash المستوى ٣: [[$?]]"
        },
        {
          cmd: "process / PID",
          title: "العملية ورقمها",
          desc: "أي برنامج شغال عملية، وليها رقم فريد (PID). بتوقفها بالرقم بـ [[kill]]، وبتشوفها في [[ps]] و [[htop]].",
          example: "pgrep -a node",
          try: "bash المستوى ٢: [[ps]]"
        },
        {
          cmd: "daemon / service",
          title: "خدمة في الخلفية",
          desc: "برنامج بيشتغل طول الوقت من غير ترمنال (Nginx، Postgres، sshd). الـ d في الآخر من daemon. systemd بيديرهم كخدمات.",
          example: "systemctl list-units --type=service --state=running | head",
          try: "bash المستوى ٢: [[systemctl]]"
        },
        {
          cmd: "signal",
          title: "إشارة",
          desc: "رسالة النظام بيبعتها لعملية: SIGTERM «اقفل بأدب»، SIGKILL «موت فورًا»، SIGHUP «الترمنال اتقفل». [[kill]] بيبعت إشارات، و Ctrl+C بيبعت SIGINT.",
          example: "kill -l | head -3",
          try: "bash المستوى ٢: [[kill]]"
        },
        {
          cmd: "environment variable",
          title: "متغير البيئة",
          desc: "قيمة باسم بتوصل للبرامج اللي بتشغّلها: PORT، DATABASE_URL، NODE_ENV. الكود بيقراها من [[process.env]]. بتتحط بـ [[export]] أو ملف .env.",
          example: "env | grep -i node",
          try: "bash المستوى ٢: [[export و env]]"
        },
        {
          cmd: "cron",
          title: "المنبّه",
          desc: "خدمة بتشغّل أوامر في مواعيد: كل يوم 3 الفجر، كل ٥ دقايق. الجدول في crontab بصيغة ٥ خانات.",
          example: "crontab -l",
          try: "VPS المستوى ٣: [[crontab]]"
        },
        {
          cmd: "symlink",
          title: "اختصار",
          desc: "ملف صغير بيشاور على ملف تاني. تفتحه فيتفتح الأصلي. Nginx بيستخدمه في sites-enabled، و nvm في مسار node.",
          example: "ls -l /etc/nginx/sites-enabled/",
          try: "bash المستوى ١: [[ln -s]]"
        },
        {
          cmd: "root / sudo",
          title: "المدير",
          desc: "root اليوزر اللي يقدر يعمل أي حاجة. sudo بيشغّل أمر واحد بصلاحياته. الشغل اليومي بيوزر عادي، و sudo عند الحاجة بس.",
          example: "sudo -v && echo ok",
          try: "bash المستوى ٢: [[sudo]]"
        },
        {
          cmd: "permissions",
          title: "الصلاحيات",
          desc: "لكل ملف: مين صاحبه، وأنهي جروب، ومين يقرا (r) ويكتب (w) ويشغّل (x). الأرقام 644 و 755 اختصارات. أشهر سبب Permission denied.",
          example: "ls -l /etc/passwd",
          try: "bash المستوى ٢: [[chmod]]"
        },
        {
          cmd: "swap",
          title: "رام احتياطي على الديسك",
          desc: "لما الرام تخلص، لينكس بينقل حاجات مش مستخدمة للـ swap على الديسك. أبطأ، بس بدل ما يقتل التطبيق.",
          example: "swapon --show",
          try: "VPS المستوى ٣: [[swap]]"
        },
        {
          cmd: "OOM killer",
          title: "قاتل الذاكرة",
          desc: "لما الرام والـ swap يخلصوا، الكيرنل بيقتل أكبر عملية عشان ينقذ النظام. التطبيق بيختفي من غير error. الدليل في [[dmesg]].",
          example: R`sudo dmesg -T | grep -i "out of memory" | tail -2`,
          try: "التشخيص: [[الرام خلصت]]"
        },
        {
          cmd: "load average",
          title: "متوسط الضغط",
          desc: "٣ أرقام في [[uptime]]: كام عملية بتشتغل أو مستنية المعالج في آخر ١ و ٥ و ١٥ دقيقة. قارنها بعدد الأنوية.",
          example: "uptime; nproc",
          try: "bash المستوى ٢: [[top / htop]]"
        }
      ]
    },
    {
      t: "الشبكة",
      l: 1,
      items: [
        {
          cmd: "IP address",
          title: "عنوان الجهاز",
          desc: "رقم بيحدد جهاز على الشبكة. الخاص (192.168.x، 10.x) جوه شبكتك بس. العام على النت. الـ VPS ليه عام، وجهازك في البيت وراه راوتر بعام واحد.",
          example: "curl -s ifconfig.me",
          try: "bash المستوى ٢: [[ip a / ip route]]"
        },
        {
          cmd: "port",
          title: "البورت",
          desc: "رقم من 1 لـ 65535 بيميّز خدمة على نفس الجهاز: 22 SSH، 80 HTTP، 443 HTTPS، 5432 Postgres. عملية واحدة بس تسمع على بورت.",
          example: "sudo ss -tlnp | head",
          try: "ابدأ من هنا"
        },
        {
          cmd: "localhost / loopback",
          title: "الجهاز نفسه",
          desc: "127.0.0.1 عنوان بيشاور على نفس الجهاز. خدمة بتسمع عليه بس مش بتتشاف من بره. جوه container، localhost هو الـ container نفسه.",
          example: "curl -sI http://127.0.0.1:3000 | head -1",
          try: "bash المستوى ٢: [[127.0.0.1 و 0.0.0.0]]"
        },
        {
          cmd: "0.0.0.0",
          title: "كل الكروت",
          desc: "لما خدمة تسمع عليه، بتقبل اتصالات من أي عنوان: الجهاز نفسه والشبكة والنت. الأصح لـ Nginx، والأخطر لقاعدة البيانات.",
          example: "sudo ss -tlnp | grep 0.0.0.0",
          try: "bash المستوى ٢: [[127.0.0.1 و 0.0.0.0]]"
        },
        {
          cmd: "NAT",
          title: "مشاركة عنوان",
          desc: "الراوتر بياخد عنوان عام واحد ويوزّعه على أجهزة البيت بعناوين خاصة. عشان كده جهازك مش بيتشاف من النت، ومحتاج tunnel للـ webhooks.",
          example: "ip route | grep default",
          try: "Node المستوى ٣: [[لوج الـ webhooks]]"
        },
        {
          cmd: "DNS",
          title: "دليل الأسامي",
          desc: "النظام اللي بيحوّل example.com لـ IP. سجلات: A للـ IP، MX للإيميل، TXT للتحقق، NS مين المسؤول.",
          example: "dig +short example.com",
          try: "bash المستوى ٣: [[dig]]"
        },
        {
          cmd: "TTL",
          title: "مدة الصلاحية",
          desc: "في DNS: قد إيه الإجابة تتحفظ في الكاش قبل ما تتسأل تاني. TTL ساعة يعني تغيير الـ IP بياخد لحد ساعة ينتشر. في الشبكة: عدد الراوترات اللي packet تقدر تعدّيها.",
          example: "dig example.com +noall +answer",
          try: "التشخيص: [[بيفتح عند ناس ومش عند ناس]]"
        },
        {
          cmd: "TCP / UDP",
          title: "نوعين اتصال",
          desc: "TCP بيتأكد إن كل حاجة وصلت بالترتيب (HTTP، SSH، قواعد البيانات). UDP بيبعت من غير تأكيد، أسرع (DNS، فيديو، HTTP/3).",
          example: "ss -tuln | head",
          try: "bash المستوى ٢: [[ss / lsof]]"
        },
        {
          cmd: "HTTP",
          title: "لغة الويب",
          desc: "طلب (method + مسار + headers + body) ورد (status + headers + body). الـ methods: GET يجيب، POST يعمل، PUT/PATCH يعدّل، DELETE يمسح.",
          example: "curl -sI https://example.com | head -5",
          try: "ابدأ من هنا"
        },
        {
          cmd: "status code",
          title: "رقم الرد",
          desc: "2xx نجح، 3xx تحويل، 4xx غلطك (401 مش داخل، 403 مش مسموح، 404 مش موجود)، 5xx غلط السيرفر (502 التطبيق واقع، 504 بطيء).",
          example: R`curl -s -o /dev/null -w "%{http_code}\n" https://example.com`,
          try: "المتصفح: [[Status codes]]"
        },
        {
          cmd: "header",
          title: "رأس الطلب",
          desc: "معلومات مع الطلب أو الرد بره البودي: Content-Type، Authorization، Set-Cookie، Cache-Control. نص مشاكل الـ API في الـ headers.",
          example: "curl -sI https://example.com",
          try: "المتصفح: [[Headers]]"
        },
        {
          cmd: "TLS / SSL / HTTPS",
          title: "التشفير",
          desc: "TLS البروتوكول اللي بيشفّر الاتصال (SSL اسمه القديم). HTTPS هو HTTP فوق TLS. محتاج شهادة من جهة موثوقة (Let's Encrypt).",
          example: R`echo | openssl s_client -connect example.com:443 2>/dev/null | grep -i "protocol"`,
          try: "VPS المستوى ٢: [[certbot]]"
        },
        {
          cmd: "certificate",
          title: "الشهادة",
          desc: "ملف بيثبت إن السيرفر ده فعلًا صاحب الدومين، موقّع من جهة المتصفحات بتثق فيها. بتخلص كل ٩٠ يوم مع Let's Encrypt.",
          example: R`sudo certbot certificates 2>/dev/null | grep -E "Domains|Expiry"`,
          try: "التشخيص: [[شهادة SSL]]"
        },
        {
          cmd: "reverse proxy",
          title: "الوسيط",
          desc: "سيرفر قدام تطبيقك بيستقبل الزوار ويوصّل الطلبات له: Nginx على 443 يوصّل لـ Node على 3000. بيتكفل بـ HTTPS والملفات الثابتة وكذا موقع.",
          example: "grep proxy_pass /etc/nginx/sites-enabled/*",
          try: "Nginx: [[reverse proxy بعمق]]"
        },
        {
          cmd: "upstream",
          title: "الباك إند",
          desc: "من وجهة نظر Nginx: التطبيق اللي وراه. «upstream timed out» يعني التطبيق مردّش. في Git: الـ remote اللي بتسحب منه.",
          example: "sudo grep upstream /var/log/nginx/error.log | tail -2",
          try: "Nginx: [[reverse proxy بعمق]]"
        },
        {
          cmd: "CDN",
          title: "نسخ قريبة",
          desc: "شبكة سيرفرات حوالين العالم بتحفظ نسخة من ملفاتك وتقدمها من أقرب نقطة للزائر. Cloudflare أشهرها ومجاني، وبيحمي من الهجمات.",
          example: R`curl -sI https://example.com | grep -i "cf-ray\|server"`,
          try: "التشخيص: [[بوت بيضرب الموقع]]"
        },
        {
          cmd: "cache",
          title: "الحفظ المؤقت",
          desc: "نسخة من حاجة عشان متتحسبش أو تتنزلش تاني: المتصفح بيحفظ JS، و DNS بيحفظ الإجابات، و Postgres بيحفظ صفحات في الرام. كل مشكلة «التغيير مش ظاهر» كاش.",
          example: "curl -sI https://example.com/app.js | grep -i cache-control",
          try: "Nginx: [[كاش الملفات الثابتة]]"
        },
        {
          cmd: "latency / TTFB",
          title: "التأخير",
          desc: "الوقت من الطلب لأول byte رد. بيجمع الشبكة ووقت السيرفر بيفكّر. أقل من 200ms كويس. الـ bandwidth حاجة تانية: كام بايت في الثانية.",
          example: R`curl -o /dev/null -s -w "%{time_starttransfer}\n" https://example.com`,
          try: "التشخيص: [[الموقع بطيء مش واقع]]"
        },
        {
          cmd: "firewall",
          title: "الحاجز",
          desc: "بيقرر أنهي بورتات مفتوحة من بره. ufw على السيرفر: 22 و 80 و 443 بس. و Docker بيعدّي منه، فالبورتات على 127.0.0.1.",
          example: "sudo ufw status",
          try: "VPS المستوى ٢: [[ufw]]"
        },
        {
          cmd: "tunnel",
          title: "الممر",
          desc: "اتصال جوه اتصال: SSH tunnel بيوصّل بورت على جهازك لخدمة على السيرفر بأمان. ngrok tunnel بيوصّل عنوان عام لجهازك.",
          example: "ssh -N -L 5433:127.0.0.1:5432 prod",
          try: "bash المستوى ٣: [[ssh -L]]"
        },
        {
          cmd: "webhook",
          title: "الاتصال العكسي",
          desc: "بدل ما تسأل الخدمة «حصل حاجة؟»، هي بتبعتلك POST لما يحصل: Paymob بعد الدفع، GitHub بعد push. محتاج URL عام وتحقق من التوقيع.",
          example: "grep webhooks /var/log/nginx/access.log | tail -3",
          try: "Node المستوى ٣: [[لوج الـ webhooks]]"
        },
        {
          cmd: "SSH key",
          title: "زوج المفاتيح",
          desc: "مفتاحين: خاص بيفضل على جهازك ومحدش يشوفه، وعام بتحطه على السيرفر أو GitHub. السيرفر بيتحداك بحاجة متتحلش إلا بالخاص، فبتدخل من غير باسورد. الخاص يتحمي بـ passphrase و [[chmod 600]].",
          example: "ssh-keygen -lf ~/.ssh/id_ed25519.pub",
          try: "VPS المستوى ٢: [[نقل مفتاح SSH]]"
        },
        {
          cmd: "CORS",
          title: "مين يكلّم الـ API من المتصفح",
          desc: "قاعدة في المتصفح: صفحة على دومين مش بتقدر تقرا رد API على دومين تاني إلا لو السيرفر رد بـ [[Access-Control-Allow-Origin]]. الحماية في المتصفح بس، فـ curl و Postman مش بيتأثروا، والحل في السيرفر مش في الفرونت.",
          example: R`curl -sI -H "Origin: https://app.example.com" https://api.example.com | grep -i access-control`,
          try: "المتصفح المستوى ٢: [[CORS]]"
        }
      ]
    },
    {
      t: "الكود والبيانات",
      l: 1,
      items: [
        {
          cmd: "package manager",
          title: "مدير الباكدجات",
          desc: "برنامج بيسطّب ويحدّث برامج ومكتبات من مستودع: apt للنظام، npm لـ Node، brew للماك، pip لـ Python.",
          example: "npm -v; apt --version | head -1",
          try: "Node المستوى ١"
        },
        {
          cmd: "dependency",
          title: "اعتمادية",
          desc: "مكتبة كودك محتاجها. dependencies للتشغيل، devDependencies للتطوير بس. والمكتبات ليها مكتبات (transitive).",
          example: "npm ls --depth=0",
          try: "Node المستوى ١: [[npm install]]"
        },
        {
          cmd: "semver",
          title: "ترقيم النسخ",
          desc: "major.minor.patch: الأول تغيير كاسر، التاني ميزة، التالت إصلاح. [[^]] بيسمح بـ minor و patch (لو النسخة 0.x بـ patch بس)، [[~]] بـ patch بس.",
          example: "npm view express version",
          try: "Node المستوى ١: [[^ و ~ في النسخ]]"
        },
        {
          cmd: "lock file",
          title: "ملف التثبيت",
          desc: "package-lock.json: النسخ اللي اتسطّبت بالظبط. بيضمن نفس node_modules على كل جهاز. [[npm ci]] بيقرا منه بس.",
          example: "head -20 package-lock.json",
          try: "Node المستوى ١: [[package-lock و npm ci]]"
        },
        {
          cmd: "image / container",
          title: "القالب والنسخة الشغالة",
          desc: "الـ image ملف ثابت فيه التطبيق وبيئته. الـ container نسخة شغالة منه. من image واحدة كذا container. الـ container بيتمسح والـ image بتفضل.",
          example: "docker images | head -3; docker ps",
          try: "Docker المستوى ١"
        },
        {
          cmd: "volume",
          title: "تخزين دائم",
          desc: "مساحة بره الـ container بتفضل لما يتمسح. قاعدة البيانات لازم volume. الـ bind mount فولدر من جهازك.",
          example: "docker volume ls",
          try: "Docker المستوى ٢: [[volumes]]"
        },
        {
          cmd: "registry",
          title: "مخزن الصور",
          desc: "سيرفر بيخزّن Docker images: Docker Hub، ghcr.io. بتبني وترفع (push)، والسيرفر ينزّل (pull).",
          example: "docker pull hello-world",
          try: "Docker المستوى ٢: [[build / tag / push]]"
        },
        {
          cmd: "CI / CD",
          title: "التكامل والتسليم المستمر",
          desc: "CI: الاختبارات بتشتغل أوتوماتيك مع كل push. CD: الـ deploy بيحصل أوتوماتيك لما تنجح. GitHub Actions بيعمل الاتنين.",
          example: "gh run list --limit 3",
          try: "GitHub Actions"
        },
        {
          cmd: "pipeline",
          title: "خط الإنتاج",
          desc: "سلسلة خطوات أوتوماتيك: lint، test، build، deploy. كل خطوة لازم تنجح عشان اللي بعدها تبدأ. في bash: الـ pipe بيوصّل أوامر.",
          example: "gh workflow list",
          try: "GitHub Actions المستوى ٢"
        },
        {
          cmd: "artifact",
          title: "ناتج",
          desc: "ملف طالع من خطوة build: فولدر dist، أو Docker image، أو تقرير. بيتحفظ عشان خطوة تانية تستخدمه.",
          example: "ls dist/ 2>/dev/null | head",
          try: "GitHub Actions المستوى ٢: [[cache و artifacts]]"
        },
        {
          cmd: "migration",
          title: "تغيير الـ schema بترتيب",
          desc: "ملف SQL مرقّم بيغيّر هيكل القاعدة (جدول جديد، عمود). بتتطبق بالترتيب وبتتسجّل، فكل بيئة توصل لنفس الهيكل.",
          example: "npx prisma migrate status",
          try: "PostgreSQL المستوى ٣: [[Prisma migrate]]"
        },
        {
          cmd: "ORM",
          title: "الوسيط مع القاعدة",
          desc: "مكتبة بتخليك تكتب [[prisma.user.findMany()]] بدل SQL. بتحمي من SQL injection، وبتدير الـ migrations. Prisma، TypeORM، Drizzle.",
          example: "npx prisma --version",
          try: "الأمان المستوى ٢: [[2. SQL Injection]]"
        },
        {
          cmd: "index",
          title: "فهرس الجدول",
          desc: "هيكل جانبي بيخلي البحث في عمود لحظي بدل قراية الجدول كله. كل foreign key وكل عمود في WHERE متكرر محتاج واحد.",
          example: R`psql -c "\di" 2>/dev/null | head`,
          try: "PostgreSQL المستوى ٢: [[الـ indexes]]"
        },
        {
          cmd: "connection pool",
          title: "مجمّع الاتصالات",
          desc: "بدل اتصال جديد لكل طلب (غالي)، عدد ثابت من الاتصالات المفتوحة بيتشاركوا. PgBouncer و Supabase pooler على 6543.",
          example: R`psql -c "SELECT count(*) FROM pg_stat_activity;" 2>/dev/null`,
          try: "PostgreSQL المستوى ٣: [[connection pooling]]"
        },
        {
          cmd: "transaction",
          title: "معاملة",
          desc: "مجموعة استعلامات إما تنجح كلها أو تترجع كلها. [[idle in transaction]] اتصال فتح واحدة ونسي يقفلها وماسك locks.",
          example: R`psql -c "SELECT state, count(*) FROM pg_stat_activity GROUP BY 1;" 2>/dev/null`,
          try: "PostgreSQL المستوى ٢: [[الجلسات والأقفال]]"
        },
        {
          cmd: "hash",
          title: "بصمة",
          desc: "رقم ثابت الطول بيتحسب من أي بيانات: نفس المدخل نفس الرقم، وأي تغيير يغيّره كله. للباسوردات (bcrypt)، وسلامة الملفات (sha256)، و commits Git.",
          example: "echo -n hello | sha256sum",
          try: "VPS المستوى ٣: [[sha256sum]]"
        },
        {
          cmd: "HMAC",
          title: "توقيع بمفتاح",
          desc: "hash محسوب بمفتاح سري. البوابة بتبعته مع الـ webhook، وانت بتحسبه بنفس المفتاح وتقارن. لو مطابق، الطلب منهم ومتغيرش.",
          example: "echo -n data | openssl dgst -sha256 -hmac secret",
          try: "Node المستوى ٣: [[التحقق من التوقيع]]"
        },
        {
          cmd: "JWT / token",
          title: "تذكرة الدخول",
          desc: "نص بيثبت إنك داخل: بيتبعت مع كل طلب في Authorization header. JWT فيه بيانات مقروءة (مش مشفّرة) وتوقيع، وبينتهي في وقت.",
          example: R`node -e "console.log(Buffer.from('eyJhbGciOiJIUzI1NiJ9','base64').toString())"`,
          try: "المتصفح: [[localStorage و JWT]]"
        },
        {
          cmd: "idempotency",
          title: "نفس النتيجة مهما تكرر",
          desc: "عملية لو اتنفذت مرتين بنفس المدخل نتيجتها زي مرة. لازمة للـ webhooks (بتتكرر) وسكربتات التجهيز ([[mkdir -p]]).",
          example: "mkdir -p /tmp/x && mkdir -p /tmp/x && echo ok",
          try: "Node المستوى ٣: [[إعادة الإرسال والتكرار]]"
        },
        {
          cmd: "rate limiting",
          title: "حد الطلبات",
          desc: "أقصى عدد طلبات من IP أو يوزر في فترة. بيمنع brute force والإغراق. 429 هو الرد لما يتعدّى.",
          example: "grep limit_req /etc/nginx/nginx.conf /etc/nginx/sites-enabled/* 2>/dev/null | head -3",
          try: "Nginx المستوى ٢: [[rate limiting]]"
        },
        {
          cmd: "rollback",
          title: "الرجوع",
          desc: "ترجّع النسخة اللي قبل الـ deploy لما الجديد يكسر. مع images بأرقام: تغيير tag و up. لازم يبقى مجرّب قبل ما تحتاجه.",
          example: "git log --oneline -3",
          try: "التشخيص: [[الـ deploy كسر الموقع]]"
        },
        {
          cmd: "staging",
          title: "بيئة التجربة",
          desc: "نسخة من الإنتاج للاختبار قبل الرفع: نفس الإعدادات ببيانات تجريبية ودومين تاني محمي بباسورد.",
          example: "curl -sI https://staging.example.com | head -1",
          try: "Nginx المستوى ٣: [[basic auth]]"
        },
        {
          cmd: "YAML",
          title: "إعدادات بالمسافات",
          desc: "صيغة إعدادات مبنية على المسافات: [[key: value]]، والقوايم بـ [[- ]]، والتداخل بمسافتين. GitHub Actions و docker compose كلهم YAML. tab بدل مسافات أو مسافة ناقصة بتكسر الملف كله.",
          example: "docker compose config -q && echo ok",
          try: "GitHub Actions المستوى ١: [[ci.yml]]"
        },
        {
          cmd: "regex",
          title: "نمط البحث",
          desc: "لغة صغيرة لوصف نص: [[^]] بداية السطر، [[$]] آخره، [[.]] أي حرف، [[*]] تكرار. grep و sed و Nginx location و JavaScript كلهم بيفهموها، بفروق صغيرة بينهم (زي -E في grep).",
          example: R`grep -E " 50[0-9] " /var/log/nginx/access.log | tail -3`,
          try: "bash المستوى ٢: [[grep]]"
        },
        {
          cmd: "XSS",
          title: "كود في صفحة غيرك",
          desc: "المهاجم يحط JavaScript في داتا (كومنت أو اسم) وموقعك يعرضها كـ HTML، فيتنفذ في متصفح كل زائر ويسرق الكوكي أو يعمل طلبات باسمه. الحل: اعرض كنص ([[textContent]])، و CSP.",
          example: "curl -sI https://example.com | grep -i content-security-policy",
          try: "الأمان المستوى ٢: [[3. XSS]]"
        },
        {
          cmd: "CRLF / LF",
          title: "نهاية السطر",
          desc: R`ويندوز بينهي السطر بحرفين [[\r\n]]، ولينكس بحرف واحد [[\n]]. سكربت bash اتكتب على ويندوز بيطلع «bad interpreter» أو [[$'\r']]. الحل [[.gitattributes]] أو [[dos2unix]].`,
          example: "file deploy.sh",
          try: "WSL المستوى ٢: [[Git و line endings]]"
        }
      ]
    }
  ]
});
