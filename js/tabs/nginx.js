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

TAB("nginx", {
  label: "nginx",
  prompt: "deploy@vps:~$ ",
  lab: R`sudo nginx -t
sudo nginx -T | grep -E "server_name|listen"
sudo systemctl reload nginx`,
  labText: "جرّب على سيرفر التجربة أو جوه WSL أو Docker (docker run -p 8080:80 nginx). كل ملف إعدادات: احفظه في sites-available، اربطه، nginx -t، وبعدين reload.",
  levels: {
    "1": ["البداية", "الملفات والهيكل، وموقع static، و SPA، و reverse proxy كامل، والأوامر"],
    "2": ["المتوسط", "ضغط وكاش وتحويلات وكذا موقع و location matching و rate limiting و headers وحدود"],
    "3": [
      "المتقدم",
      "WebSockets، والتبديل بدون downtime، وحماية staging، ولوجات JSON، و HTTP/3، والتشخيص، و Nginx جوه Docker والشهادات"
    ]
  },
  categories: [
    {
      t: "الهيكل والملفات",
      l: 1,
      n: "Nginx بيقرا ملف واحد بيسحب ملفات، وكل موقع server block",
      items: [
        {
          cmd: "الملفات",
          title: "nginx.conf و sites-enabled",
          desc: "[[/etc/nginx/nginx.conf]] الملف الرئيسي، وفي آخره [[include]] بيسحب [[conf.d/*.conf]] و [[sites-enabled/*]]. كل موقع ملف في sites-available واختصار في sites-enabled. و [[nginx -T]] بيطبع كل الإعدادات بعد الدمج.",
          example: R`sudo nginx -t
sudo nginx -T | grep -E "server_name|listen|root|proxy_pass"
ls -la /etc/nginx/sites-enabled/
grep include /etc/nginx/nginx.conf
sudo systemctl reload nginx
sudo tail -f /var/log/nginx/error.log`,
          try: "اقرا [[nginx.conf]] من أوله: worker_processes، و events، و http، ودوّر على سطور include في الآخر.",
          deep: {
            why: "قبل ما تعدّل أي حاجة لازم تعرف Nginx بيقرا منين. ملف واحد بيسحب ملفات، والـ include هو اللي بيربطهم.",
            how: R`[[nginx.conf]] فيه ٣ مستويات: الأعلى (main) فيه [[worker_processes]] (عدد العمليات، auto = عدد الأنوية) و [[error_log]]. [[events]] فيه [[worker_connections]] (اتصالات لكل عملية). و [[http]] فيه كل حاجة عن HTTP: اللوج، gzip، وفي آخره سطور [[include]] بتسحب [[conf.d/*.conf]] و [[sites-enabled/*]].

الترتيب مهم: الإعداد في [[http]] بينطبق على كل المواقع، وفي [[server]] على موقع، وفي [[location]] على مسار. والأضيق بيكسب.

[[sites-available]] فيه كل الملفات، و [[sites-enabled]] فيه symlinks للشغالة بس (تاب VPS). [[conf.d]] لإعدادات مش مرتبطة بموقع (upstream، rate limit zones، log formats).

[[nginx -t]] بيقرا كل حاجة ويقولك سليم ولا فيه غلطة وفي أنهي ملف وسطر. [[-T]] نفسه بس بيطبع الإعدادات كاملة بعد الدمج، وده أحسن طريقة تعرف إيه اللي فعلًا شغال (الـ grep بيطلّع المهم).

[[reload]] بيشغّل workers جداد بالإعدادات الجديدة والقدام بيخلصوا طلباتهم وبيقفلوا: صفر انقطاع.`,
            when: "قبل أي تعديل: [[-T]] تشوف الحالة. وبعده [[-t]] وبعدين reload.",
            mistakes: "تعدّل ملف في sites-available مش مربوط في sites-enabled. وإعداد في location بيلغي نفس الإعداد في server (زي add_header) من غير ما تعرف."
          },
          lines: [
            "الإعدادات سليمة؟",
            "الإعدادات النهائية بعد الدمج، مفلترة على المهم.",
            "المواقع الشغالة (symlinks).",
            "إيه اللي nginx.conf بيسحبه.",
            "طبّق من غير قطع.",
            "تابع الأخطاء."
          ]
        },
        {
          cmd: "موقع static",
          title: "HTML و CSS من فولدر",
          desc: "أبسط server block: بيسمع على 80، لدومين معين، وبيقدم ملفات من فولدر. [[try_files]] بيدوّر على الملف، وبعدين فولدر بنفس الاسم، وبعدين 404. ده كل اللي محتاجه لموقع HTML أو ناتج build.",
          example: R`server {
    listen 80;
    server_name example.com www.example.com;
    root /var/www/example.com/html;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}`,
          try: R`اعمل الفولدر وفيه index.html، وفعّل الملف، و [[curl -H "Host: example.com" http://127.0.0.1]].`,
          flag: "script",
          deep: {
            why: "موقع تعريفي، أو documentation، أو ناتج build لموقع static. مفيش تطبيق، Nginx بيقدم الملفات مباشرة، وده أسرع حاجة ممكنة.",
            how: R`[[listen 80]]: البورت. [[server_name]]: الدومينات اللي البلوك ده بيرد عليها (بيقارن بـ Host header). [[root]]: الفولدر اللي المسارات بتتحسب منه: طلب [[/about.html]] بيدوّر على [[/var/www/example.com/html/about.html]].

[[index]]: لما الطلب على فولدر ([[/]] أو [[/docs/]])، الملف اللي يتقدم.

[[try_files $uri $uri/ =404]]: جرّب بالترتيب: الملف بالمسار ده، وبعدين فولدر بالمسار ده (فيبقى index)، ولو مفيش 404. من غيرها Nginx بيتصرف افتراضيًا شبه كده بس try_files أوضح وبتمنع بعض السلوكيات الغريبة.

[[$uri]] متغير: المسار المطلوب بعد التنضيف (من غير query string).

الصلاحيات: Nginx بيشتغل كيوزر [[www-data]]، ولازم يقدر يقرا الملفات ويدخل كل فولدر في الطريق (x على الفولدرات). أشهر سبب 403.

و [[alias]] بديل root في location لما المسار في الـ URL مختلف عن الفولدر: [[location /assets/ { alias /var/www/static/; }]].`,
            when: "أي موقع من غير backend. و landing pages.",
            mistakes: "[[root]] جوه location بيتضاف عليه مسار الـ location (root /var/www + /static/ = /var/www/static/)، لو مش عايز كده استخدم alias. وصلاحيات الفولدر."
          },
          lines: [
            "بداية بلوك موقع.",
            "http.",
            "الدومينات اللي البلوك ده بيرد عليها.",
            "الفولدر اللي المسارات بتتحسب منه.",
            "الملف الافتراضي للفولدرات.",
            "لكل الطلبات.",
            "جرّب الملف، وبعدين فولدر، وإلا 404.",
            "قفلة.",
            "قفلة."
          ]
        },
        {
          cmd: "SPA",
          title: "React و Vue: كل المسارات لـ index.html",
          desc: "تطبيق React مبني فولدر فيه index.html و JS. المسارات زي [[/dashboard]] بيتعامل معاها JavaScript، مش ملفات. لو المستخدم عمل ريفريش عليها Nginx بيدوّر على ملف اسمه dashboard ويرجّع 404. الحل آخر خيار في try_files يبقى index.html.",
          example: R`server {
    listen 80;
    server_name app.example.com;
    root /var/www/app/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:3000;
    }
}`,
          try: "افتح [[app.example.com/dashboard]] مباشرة (مش من الصفحة الرئيسية) واتأكد إنه بيفتح بدل 404.",
          flag: "script",
          deep: {
            why: "React Router بيتعامل مع [[/dashboard]] في المتصفح. بس الريفريش أو اللينك المباشر بيطلبه من Nginx، اللي مش لاقي ملف بالاسم ده. 404 على كل صفحة غير الرئيسية أشهر مشكلة في نشر SPAs.",
            how: R`الحل في آخر عنصر في [[try_files]]: [[/index.html]] بدل [[=404]]. يعني: لو مفيش ملف ولا فولدر بالمسار، قدّم index.html. المتصفح بيحمّله، و JavaScript بيقرا الـ URL ويعرض الصفحة الصح.

بس ده لازم يبقى للمسارات اللي مش ملفات بس. ملف JS مش موجود المفروض يرجع 404 مش index.html (وإلا المتصفح يحاول ينفّذ HTML كـ JavaScript ويطلع «Unexpected token <»، نفس الـ error اللي في تاب المتصفح). عشان كده [[$uri]] الأول: الملفات الموجودة بتتقدم، والباقي index.html.

[[location /api/]] قبلها بيوجّه الـ API للتطبيق، فطلب [[/api/users]] مش بيوصل لـ try_files. الترتيب مش مهم هنا لأن [[/api/]] بادئة أطول من [[/]] (شرح location matching).

الفرق بين [[proxy_pass http://127.0.0.1:3000;]] و [[proxy_pass http://127.0.0.1:3000/;]] (بشرطة في الآخر): من غيرها المسار بيتبعت كامل [[/api/users]]، ومعاها بيتشال جزء الـ location ويبقى [[/users]]. اختار حسب التطبيق.

Next.js مش SPA بالمعنى ده (فيه سيرفر)، بتعمله proxy عادي. Vite و CRA و Vue CLI هم اللي محتاجين ده.`,
            when: "أي React أو Vue أو Angular مبني static.",
            mistakes: "[[try_files $uri /index.html]] من غير [[$uri/]] فمسار فولدر يرجع index الرئيسي. وكاش index.html طويل فالمستخدمين يفضلوا على نسخة قديمة بتشاور على JS اتمسح."
          },
          lines: [
            "بداية.",
            "http.",
            "الدومين.",
            "ناتج الـ build.",
            "الملف الافتراضي.",
            "كل الطلبات.",
            "الملف لو موجود، وإلا فولدر، وإلا index.html (وJavaScript يتصرف).",
            "قفلة.",
            "مسارات الـ API.",
            "للتطبيق.",
            "قفلة.",
            "قفلة."
          ]
        },
        {
          cmd: "reverse proxy بعمق",
          title: "upstream و keepalive و headers",
          desc: "الشكل الكامل للـ proxy: [[upstream]] بيسمّي الباك إند ويسمح بأكتر من سيرفر و keepalive. والـ headers بتوصّل للتطبيق IP الزائر الحقيقي والبروتوكول، وإلا كل الطلبات هتبان من 127.0.0.1.",
          example: R`upstream api {
    server 127.0.0.1:3000;
    keepalive 32;
}

server {
    listen 80;
    server_name api.example.com;

    location / {
        proxy_pass http://api;
        proxy_http_version 1.1;
        proxy_set_header Connection "";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}`,
          try: "في Express حط [[app.set('trust proxy', 1)]] وبعدين [[req.ip]] هيطلع IP الزائر بدل 127.0.0.1.",
          flag: "script",
          deep: {
            why: "الشكل البسيط في تاب VPS شغال. الشكل ده بيضيف أداء (keepalive)، وبيخلي التطبيق يعرف الزائر الحقيقي، وبيمهّد لأكتر من سيرفر.",
            how: R`[[upstream api]] بيعرّف مجموعة سيرفرات باسم. سطر [[server]] لكل واحد. لو أكتر من واحد، Nginx بيوزّع عليهم (round-robin افتراضيًا). [[keepalive 32]] بيحتفظ بـ ٣٢ اتصال مفتوح للتطبيق ويعيد استخدامهم بدل ما يفتح اتصال TCP لكل طلب: أسرع بوضوح تحت الضغط.

الـ keepalive محتاج [[proxy_http_version 1.1]] و [[proxy_set_header Connection ""]] (فاضي)، وإلا Nginx بيبعت Connection: close ويقفل كل مرة.

الـ headers: [[Host $host]] الدومين اللي الزائر كتبه (التطبيق محتاجه لروابط كاملة). [[X-Real-IP]] و [[X-Forwarded-For]] IP الزائر (من غيرهم req.ip دايمًا 127.0.0.1، فالـ rate limiting واللوج في التطبيق بيبقوا مالهمش معنى). [[X-Forwarded-Proto]] http ولا https (التطبيق محتاجه لـ secure cookies والتحويلات).

والتطبيق لازم يثق في الـ headers دي: Express [[trust proxy]]، Next.js بيقراها لوحده، Django [[SECURE_PROXY_SSL_HEADER]].

[[proxy_pass http://api]] بالاسم بدل العنوان.`,
            when: "كل تطبيق ورا Nginx. الـ keepalive لما يبقى فيه ضغط.",
            mistakes: R`trust proxy على Express من غير Nginx قدامه فأي حد يزوّر IP. ونسيان Connection "" فالـ keepalive مبيشتغلش.`
          },
          lines: [
            "مجموعة سيرفرات باسم api.",
            "التطبيق.",
            "احتفظ بـ ٣٢ اتصال مفتوح للتطبيق.",
            "قفلة.",
            "بداية الموقع.",
            "http.",
            "الدومين.",
            "كل الطلبات.",
            "للمجموعة بالاسم.",
            "لازمة للـ keepalive.",
            "Connection فاضي عشان الاتصال يفضل مفتوح.",
            "الدومين اللي الزائر كتبه.",
            "IP الزائر الحقيقي.",
            "نفسه بالشكل القياسي (بيتراكم لو فيه proxies).",
            "http ولا https.",
            "قفلة.",
            "قفلة."
          ]
        },
        {
          cmd: "الأوامر",
          title: "test و reload و signals",
          desc: "[[-t]] اختبار، و [[-T]] اختبار وطباعة كل الإعدادات، و [[reload]] قراية جديدة من غير قطع، و [[-s reopen]] بعد لف اللوجات. و [[-V]] بيوريك النسخة والـ modules المبنية (مهم لـ brotli و http3).",
          example: R`sudo nginx -t
sudo nginx -T > /tmp/nginx-full.conf
sudo systemctl reload nginx
sudo nginx -s reopen
nginx -V 2>&1 | tr ' ' '\n' | grep -E "version|with-http_v2|with-http_v3|brotli"
sudo tail -F /var/log/nginx/access.log`,
          try: "قارن [[reload]] بـ [[restart]] وانت عامل [[curl]] في لوب: reload مفيش أي طلب فاشل.",
          deep: {
            why: "٥ أوامر بتتعامل بيهم مع Nginx كل مرة، وواحد فيهم (reload) هو الفرق بين تحديث سلس وموقع بيقع ثانية.",
            how: R`[[nginx -t]]: يقرا الإعدادات كلها ويتأكد من الصيغة والملفات المشار إليها. مش بيغيّر حاجة. لو قال ok، الـ reload آمن.

[[nginx -T]]: نفسه وبيطبع الإعدادات النهائية بعد كل الـ includes. احفظه في ملف لما تشخّص أو تبعت لحد.

[[systemctl reload nginx]] أو [[nginx -s reload]]: workers جداد بالإعدادات الجديدة، والقدام بيخلصوا اللي في إيدهم. لو الإعدادات فيها غلطة، reload بيفشل والقديم يفضل شغال (عكس restart اللي ممكن يسيبك من غير Nginx).

[[nginx -s reopen]]: بعد لف اللوجات (logrotate بيعمله لوحده). Nginx بيفضل كاتب في الملف القديم لحد ما يتقاله يفتح الجديد.

[[nginx -V]]: النسخة وكل الـ modules والـ flags اللي اتبنى بيها. [[with-http_v2_module]] و [[http_v3]] و brotli لو موجودين. الناتج على stderr عشان كده [[2>&1]].

[[tail -F]] (كابيتال) بيتابع اللوج حتى بعد ما يتلف.`,
            when: "t قبل كل reload. T للتشخيص. V قبل ما تعتمد على module.",
            mistakes: "restart بدل reload. و -t بيستخدم صلاحيات اليوزر فممكن يقول ok وفيه ملف Nginx نفسه مش قادر يقراه (شهادة بصلاحيات غلط)."
          },
          lines: [
            "اختبر.",
            "الإعدادات الكاملة في ملف (للتشخيص).",
            "طبّق من غير قطع.",
            "افتح ملفات اللوج من جديد (بعد لفّها).",
            "النسخة والـ modules: HTTP/2 و 3 و brotli موجودين؟",
            "تابع اللوج حتى لو اتلف."
          ]
        }
      ]
    },
    {
      t: "الأداء والتنظيم",
      l: 2,
      n: "ضغط، وكاش، وتحويلات، وأكتر من موقع، وحدود",
      items: [
        {
          cmd: "gzip",
          title: "ضغط الردود",
          desc: "نص (HTML، CSS، JS، JSON) بيتضغط لربعه. Nginx بيضغط قبل الإرسال والمتصفح بيفك. [[gzip_types]] لازم تحدد الأنواع، لأن الافتراضي HTML بس. الصور والفيديو مضغوطة أصلًا ومش بتتحط.",
          example: R`gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_comp_level 5;
gzip_types text/plain text/css text/javascript application/javascript application/json application/xml image/svg+xml;`,
          try: R`في http block. بعدين [[curl -sI -H "Accept-Encoding: gzip" https://example.com/app.js | grep -i content-encoding]].`,
          flag: "script",
          deep: {
            why: "ملف JS ٥٠٠ كيلو بيوصل في ١٢٠ كيلو. على الموبايل ده فرق ثواني. وبيتعمل مرة واحدة في الإعدادات.",
            how: R`المتصفح بيبعت [[Accept-Encoding: gzip, br]] يقول إيه اللي بيفهمه. Nginx بيضغط الرد ويبعته مع [[Content-Encoding: gzip]]، والمتصفح بيفك.

[[gzip on]] بيشغّله بس لـ text/html. [[gzip_types]] بيضيف الأنواع التانية: CSS و JS و JSON و SVG. خطوط woff2 مضغوطة أصلًا زي الصور. الصور (png، jpg) والفيديو مضغوطين أصلًا وضغطهم تاني بيضيّع معالج من غير فايدة، فمش بيتحطوا.

[[gzip_min_length 1024]]: الملفات الأصغر من كيلو مش بتستاهل. [[gzip_comp_level 5]]: من ١ لـ ٩، بعد ٥ الفرق في الحجم صغير والمعالج بيزيد. [[gzip_vary on]]: بيضيف [[Vary: Accept-Encoding]] عشان الكاش (CDN) يحفظ نسختين.

Brotli أحسن بـ ١٥٪ تقريبًا، بس محتاج module مش مبني في Nginx أوبونتو. لو عندك Cloudflare قدام الموقع بيعمله لوحده.

الإعداد في [[http]] block ينطبق على كل المواقع.

للملفات الثابتة الكبيرة: [[gzip_static on]] بيقدم ملف [[.gz]] مضغوط مسبقًا لو موجود جنب الأصلي (الـ build بيقدر يعملهم)، من غير ضغط في كل طلب.`,
            when: "كل سيرفر، في http block، مرة واحدة.",
            mistakes: "gzip_types من غير application/javascript فالـ JS مش بيتضغط. وتضغط ملفات مضغوطة."
          },
          lines: [
            "شغّل الضغط.",
            "ضيف Vary للكاش.",
            "متضغطش الأصغر من كيلو.",
            "مستوى ٥: توازن بين الحجم والمعالج.",
            "الأنواع اللي تتضغط (الافتراضي HTML بس)."
          ]
        },
        {
          cmd: "كاش الملفات الثابتة",
          title: "expires و immutable",
          desc: "JS و CSS بأسامي فيها hash (app.a1b2c3.js) عمرها ما بتتغير: قول للمتصفح يحتفظ بيها سنة. HTML لأ، لأنه بيشاور على الأسامي الجديدة. الـ [[access_log off]] للملفات الثابتة بيوفر كتابة لوج لكل صورة.",
          example: R`location ~* \.(js|css|woff2|png|jpg|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
    access_log off;
}

location = /index.html {
    add_header Cache-Control "no-cache";
}`,
          try: R`[[curl -sI https://example.com/assets/app.js | grep -iE "cache-control|expires"]] لازم يطلع max-age=31536000.`,
          flag: "script",
          deep: {
            why: "المتصفح بيطلب نفس app.js في كل صفحة. لو قلتله «ده مش هيتغير سنة»، مش هيطلبه تاني. والزيارة التانية بتبقى لحظية.",
            how: R`[[location ~* \.(js|css|...)$]]: regex غير حساس للحروف على الامتداد. [[expires 1y]] بيضيف [[Expires]] و [[Cache-Control: max-age=31536000]]. [[immutable]] بيقول للمتصفح «متتحققش حتى مع ريفريش»، ودي المتصفحات الحديثة بتحترمها.

ده آمن بس لأن أدوات الـ build بتحط hash في الاسم: [[app.a1b2c3.js]]. تعديل في الكود = اسم جديد = ملف جديد. الاسم القديم فعلًا مش بيتغير أبدًا.

[[index.html]] العكس: هو اللي بيشاور على الأسامي الجديدة، فلازم المتصفح يسأل عنه كل مرة. [[no-cache]] مش معناها «متحفظش»، معناها «احفظ بس اتحقق قبل ما تستخدم» (Nginx بيرد 304 لو متغيرش، رخيص). [[no-store]] هي اللي بتمنع الحفظ تمامًا.

[[access_log off]] للملفات الثابتة: كل صفحة بتحمّل ٣٠ ملف، يعني ٣٠ سطر لوج مالهمش قيمة. اللوج يفضل للصفحات والـ API.

[[location = /index.html]] بـ [[=]] تطابق تام عشان يكسب على الباقي.

الـ headers دي بتشتغل مع CDN كمان: Cloudflare بيحترم Cache-Control.`,
            when: "كل موقع فيه build بـ hash في الأسامي. لو مفيش hash (ملفات بأسامي ثابتة)، expires قصيرة (ساعة) أو هتفضل على القديم.",
            mistakes: "expires 1y على ملفات من غير hash فالتحديث ميوصلش للناس. و add_header في location ده بيلغي security headers اللي في server (حل: include snippet في كل location، أو حطهم في http)."
          },
          lines: [
            "الملفات بالامتدادات دي (regex غير حساس للحروف).",
            "صالحة سنة.",
            "ومتتحققش حتى مع ريفريش.",
            "متسجلش كل صورة في اللوج.",
            "قفلة.",
            "index.html بالظبط.",
            "احفظه بس اسأل قبل ما تستخدمه (304 لو متغيرش).",
            "قفلة."
          ]
        },
        {
          cmd: "redirects",
          title: "http لـ https، و www، ومسارات قديمة",
          desc: "[[return 301]] أرخص من rewrite: بيرجّع التحويل من غير معالجة. server block منفصل لكل حالة: كل http يروح https، و www يروح من غير www (أو العكس، بس اختار واحد)، ومسار قديم لجديد.",
          example: R`server {
    listen 80;
    server_name example.com www.example.com;
    return 301 https://example.com$request_uri;
}

server {
    listen 443 ssl;
    server_name www.example.com;
    return 301 https://example.com$request_uri;
}

location = /old-page {
    return 301 /new-page;
}

location /blog/ {
    return 301 https://blog.example.com$request_uri;
}`,
          try: R`[[curl -sI http://www.example.com/x | grep -iE "^HTTP|location"]]: 301 و Location بالـ https من غير www ونفس المسار.`,
          flag: "script",
          deep: {
            why: "نفس الموقع على http و https و www ومن غير: ٤ عناوين لجوجل موقع واحد فيه محتوى مكرر، وللمستخدم كوكيز مختلفة. لازم عنوان واحد رسمي والباقي يحوّل ليه.",
            how: R`[[return 301 URL]]: رد فوري بتحويل دائم. أرخص من [[rewrite]] لأن مفيش regex ولا معالجة. [[$request_uri]] المسار الأصلي بالـ query string، عشان [[http://www.example.com/page?x=1]] يروح [[https://example.com/page?x=1]] مش الرئيسية.

البلوك الأول: أي http (للدومينين) يروح https. certbot بيعمل ده لوحده لما تختار redirect.

التاني: https بالـ www يروح من غير www. لازم يبقى بلوك منفصل بـ ssl (وشهادة بتغطي www، certbot بتاخد الاتنين).

301 دائم: المتصفح بيحفظه ومش بيسأل تاني، وجوجل بينقل الترتيب للجديد. 302 مؤقت: بيسأل كل مرة. 308 و 307 نفسهم بس بيحافظوا على POST كـ POST.

[[location = /old-page]] لمسار واحد. [[location /blog/]] مع [[$request_uri]] بينقل قسم كامل لدومين تاني.

وبعد التغيير: 301 بيتحفظ في المتصفح، فاختبر بـ curl أو نافذة خاصة.`,
            when: "كل موقع: عنوان واحد رسمي. وعند نقل صفحات أو أقسام.",
            mistakes: "301 على حاجة مؤقتة: المتصفح هيفضل يحوّل حتى بعد ما تشيله. و loop: www يحوّل لغير www واللي يحوّل لـ www."
          },
          lines: [
            "بلوك http.",
            "80.",
            "الدومينين.",
            "حوّل دائم لـ https من غير www بنفس المسار والـ query.",
            "قفلة.",
            "بلوك www على https.",
            "443.",
            "www بس.",
            "حوّل لغير www.",
            "قفلة.",
            "مسار واحد بالظبط.",
            "لمسار جديد.",
            "قفلة.",
            "قسم كامل.",
            "لدومين تاني بنفس المسار.",
            "قفلة."
          ]
        },
        {
          cmd: "كذا موقع",
          title: "server_name و default_server",
          desc: "Nginx بيختار server block بالدومين اللي في header الـ Host. سيرفر واحد يشيل ١٠ مواقع. [[default_server]] هو اللي بيستقبل أي دومين مش متعرّف (أو IP مباشرة)، والأصح يرجع 444 (يقفل الاتصال) بدل ما يعرض موقعك الأساسي.",
          example: R`server {
    listen 80 default_server;
    listen 443 ssl default_server;
    server_name _;
    ssl_reject_handshake on;
    return 444;
}

server {
    listen 443 ssl;
    server_name example.com;
    root /var/www/example.com;
}

server {
    listen 443 ssl;
    server_name shop.example.com;
    location / { proxy_pass http://127.0.0.1:4000; }
}`,
          try: "[[curl -sI http://203.0.113.10]] بالـ IP مباشرة: المفروض مفيش رد (444). وبالدومين بيفتح.",
          flag: "script",
          deep: {
            why: "سيرفر ٥ دولار يشيل موقعك ومدونتك و staging والـ API. Nginx بيفرّق بينهم بالدومين. والسؤال اللي بينساه الكل: مين بيرد لو حد كتب IP السيرفر مباشرة؟",
            how: R`الطلب بييجي فيه header [[Host: shop.example.com]]. Nginx بيبص في كل server block عنده [[listen]] على نفس البورت، ويطابق [[server_name]]: تطابق تام الأول، وبعدين wildcard ([[*.example.com]])، وبعدين regex. لو مفيش تطابق: [[default_server]]، ولو محددتش واحد، أول بلوك في الملفات (بالترتيب الأبجدي).

عشان كده بلوك default_server صريح: [[server_name _]] (اسم مش هيتطابق مع حاجة)، و [[return 444]]: كود خاص بـ Nginx بيقفل الاتصال من غير رد. فالبوتات اللي بتفحص بالـ IP بتلاقي حاجة صامتة، ومحدش يقدر يوصل موقعك بدومين تاني بيشاور على IP بتاعك.

[[ssl_reject_handshake on]] لـ 443: يرفض TLS من الأصل لو الدومين مش معروف، فمفيش داعي لشهادة لبلوك default.

كل موقع بعد كده بلوك بـ server_name بتاعه، static أو proxy لبورت مختلف.

وكل دومين محتاج شهادة: [[certbot --nginx -d shop.example.com]] بيضيف الـ ssl لبلوكه.`,
            when: "من تاني موقع على السيرفر. و default_server من أول موقع.",
            mistakes: "مفيش default_server فموقعك الأساسي بيرد على أي دومين، وحد يقدر يشاور دومين تاني على سيرفرك ويظهر موقعك تحته. ونسيان listen 443 في البلوك الجديد."
          },
          lines: [
            "بلوك الافتراضي.",
            "http افتراضي.",
            "https افتراضي.",
            "اسم مش هيتطابق مع حاجة.",
            "ارفض TLS لو الدومين مش معروف (مش محتاج شهادة).",
            "اقفل الاتصال من غير رد.",
            "قفلة.",
            "الموقع الأول.",
            "443.",
            "دومينه.",
            "static.",
            "قفلة.",
            "الموقع التاني.",
            "443.",
            "دومينه.",
            "proxy لبورت تاني.",
            "قفلة."
          ]
        },
        {
          cmd: "location matching",
          title: "الترتيب اللي Nginx بيقارن بيه",
          desc: "أكتر حاجة بتلخبط: أنهي location بياخد الطلب. الترتيب: [[=]] تطابق تام يكسب فورًا، وبعدين أطول بادئة مطابقة: لو عليها [[^~]] بتكسب فورًا وتمنع regex، وبعدين regex [[~]] (حساس للحروف) و [[~*]] بالترتيب في الملف، وآخر حاجة أطول بادئة عادية.",
          example: R`location = /health {
    return 200 "ok";
}

location ^~ /static/ {
    root /var/www;
}

location ~* \.(png|jpg)$ {
    expires 30d;
}

location /api/ {
    proxy_pass http://127.0.0.1:3000;
}

location / {
    try_files $uri $uri/ /index.html;
}`,
          try: "اطلب [[/static/logo.png]]: بياخده ^~ مش الـ regex بتاع الصور. غيّر [[^~]] لـ عادي وشوف الفرق.",
          flag: "script",
          deep: {
            why: "٥ locations في ملف واحد، وطلب واحد. أنهي واحد بياخده؟ الإجابة مش «الأول في الملف»، وفهمها بيحل نص مشاكل «الإعداد مش شغال».",
            how: R`Nginx بيقارن الطلب بكل الـ locations بالترتيب ده:

١. [[= /path]]: تطابق تام. لو اتطابق، خلاص فورًا. الأسرع، لـ /health و /favicon.ico و /index.html.

٢. بادئات عادية و [[^~]]: بيلاقي أطول بادئة تطابق. لو الأطول دي عليها [[^~]]، خلاص، مش هيبص على regex.

٣. regex [[~]] (حساس للحروف) و [[~*]] (مش حساس): بالترتيب في الملف، أول واحد يطابق يكسب.

٤. لو مفيش regex طابق: أطول بادئة عادية من الخطوة ٢.

في المثال: [[/static/logo.png]] بيطابق [[^~ /static/]] (بادئة) و [[~* \.(png|jpg)$]] (regex). من غير [[^~]] الـ regex كان هيكسب. مع [[^~]] البادئة بتكسب. عشان كده [[^~]] مفيدة للفولدرات اللي عايز تضمن إنها تتقدم من مكان معين.

[[/api/]] و [[/]] الاتنين بادئات عادية، والأطول ([[/api/]]) بيكسب لطلبات الـ API.

القاعدة العملية: [[=]] للمسارات الفردية، [[^~]] للفولدرات، regex للامتدادات، و [[/]] للباقي.`,
            when: "أي ملف فيه أكتر من location. ولما إعداد في location «مش بيتطبق».",
            mistakes: "regex للصور بيمسك ملفات من /api/ فيقدمها static. وتعتمد على ترتيب البادئات في الملف (مش مهم، الطول هو اللي بيفرق)."
          },
          lines: [
            "تطابق تام: بيكسب فورًا.",
            "رد مباشر.",
            "قفلة.",
            "بادئة بتمنع regex بعدها.",
            "من الفولدر ده.",
            "قفلة.",
            "regex على الامتداد (مش هياخد /static/ بسبب ^~).",
            "كاش.",
            "قفلة.",
            "بادئة عادية.",
            "للتطبيق.",
            "قفلة.",
            "الباقي (أقصر بادئة).",
            "SPA.",
            "قفلة."
          ]
        },
        {
          cmd: "location ^~ /downloads/",
          title: "ملفات للتحميل جنب SPA من غير ما ترجع index.html",
          desc: "عندك SPA وجنبها فولدر فيه ملفات للتحميل (APK، zip، json). لو ملف مش موجود، [[try_files]] بتاع الـ SPA بيرجّع index.html بـ 200، فالموبايل ينزّل صفحة HTML باسم app.apk. بلوك [[^~]] للفولدر ده بـ [[try_files $uri =404]] بيرجّع 404 حقيقي، و [[types]] بيدّي كل ملف الـ MIME الصح.",
          example: R`location ^~ /downloads/ {
    types { application/vnd.android.package-archive apk; application/zip zip; application/json json; }
    default_type application/octet-stream;
    add_header Cache-Control "no-cache, must-revalidate";
    try_files $uri =404;
}
location / { try_files $uri $uri/ /index.html; }`,
          try: "اطلب ملف مش موجود: [[curl -sI https://example.com/downloads/nope.apk | head -3]]. قبل البلوك هتشوف 200 و text/html، وبعده 404.",
          flag: "script",
          deep: {
            why: "الـ fallback بتاع الـ SPA ممتاز للصفحات، بس كارثة للملفات: أي ملف ناقص بيرجع «نجاح» ومحتواه HTML. المستخدم ينزّل ملف بايظ، وتطبيق الموبايل اللي بيشيك على نسخة جديدة من json يقرا HTML ويقع، وانت مش شايف أي 404 في اللوج.",
            how: R`[[^~]] معناها: لو البادئة دي هي الأطول، خلاص اختارها ومتجرّبش أي location بـ regex. ده مهم لأن غالبًا عندك بلوك زي [[location ~* \.(js|css|json)$]] للكاش، ومن غير [[^~]] ملف [[/downloads/version.json]] هيروح للبلوك ده بدل بلوك التحميل.

[[try_files $uri =404]]: الملف لو موجود يتقدّم، وإلا 404 على طول. مفيش رجوع لـ index.html.

[[types { ... }]] جوه location بيستبدل جدول الـ MIME كله للمسار ده (مش بيضيف عليه). فأي امتداد مش مكتوب بياخد [[default_type]]، و [[application/octet-stream]] معناها «ملف للتحميل». عشان كده اكتب كل الامتدادات اللي بتقدمها هنا. نوع الـ APK الصح [[application/vnd.android.package-archive]]، ومن غيره أندرويد ممكن يحفظه كملف مجهول ميتفتحش.

[[Cache-Control: no-cache]]: المتصفح يسأل السيرفر كل مرة (بـ ETag) قبل ما يستخدم النسخة المحفوظة، فلما ترفع APK جديد بنفس الاسم الكل ياخده.

ولو الفولدر راكب من الهوست في container ([[./downloads:/usr/share/nginx/html/downloads:ro]]) بترفع الملف الجديد من غير rebuild.`,
            when: "أي فولدر ملفات حقيقية جوه موقع SPA: تحميلات، وملفات نسخ للتطبيق، وصور مرفوعة.",
            mistakes: "في مشروع حقيقي فولدر تحميل الـ APK كان تحت نفس [[location /]] بتاع الـ SPA، فالملف الناقص بيرجع index.html بـ 200 بدل 404. ونسيان [[json]] في [[types]] فملف النسخة يتقدّم octet-stream والتطبيق يرفض يقراه. ونسيان [[^~]] فبلوك regex للكاش يخطف الملفات."
          },
          lines: [
            "كل اللي تحت /downloads/، و ^~ تمنع أي location بـ regex تخطفه.",
            "الأنواع هنا: apk بنوع أندرويد، و zip، و json.",
            "أي امتداد تاني: ملف للتحميل.",
            "المتصفح يسأل كل مرة لو فيه نسخة أحدث.",
            "الملف لو موجود، وإلا 404 حقيقي.",
            "قفلة.",
            "باقي الموقع SPA عادي."
          ]
        },
        {
          cmd: "rate limiting",
          title: "حد للطلبات من IP",
          desc: "[[limit_req_zone]] بيعرّف منطقة في الذاكرة بتعد الطلبات لكل IP بمعدل معين. [[limit_req]] بيطبّقها على location، و [[burst]] بيسمح بدفعة قصيرة فوق المعدل، و [[nodelay]] يعالجها فورًا بدل ما يأخّرها. على login وعلى الـ API عمومًا.",
          example: R`limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
limit_req_zone $binary_remote_addr zone=login:10m rate=5r/m;
limit_conn_zone $binary_remote_addr zone=perip:10m;

server {
    location /api/ {
        limit_req zone=api burst=20 nodelay;
        limit_conn perip 20;
        proxy_pass http://127.0.0.1:3000;
    }
    location /api/login {
        limit_req zone=login burst=3 nodelay;
        limit_req_status 429;
        proxy_pass http://127.0.0.1:3000;
    }
}`,
          try: R`الـ zones في http block. جرّب [[for i in $(seq 1 30); do curl -s -o /dev/null -w "%{http_code}\n" https://example.com/api/x; done]] وشوف 503 بتظهر (المسار ده من غير limit_req_status). وعلى /api/login هتلاقي 429.`,
          flag: "script",
          deep: {
            why: "بوت بيجرّب ١٠٠٠ باسورد في الدقيقة على /login، أو scraper بيسحب الـ API. الحد في Nginx بيوقفهم قبل ما يوصلوا للتطبيق أصلًا، وأرخص من الحد في الكود.",
            how: R`[[limit_req_zone]] في http: [[$binary_remote_addr]] المفتاح (IP الزائر بصيغة مضغوطة)، و [[zone=api:10m]] منطقة ذاكرة ١٠ ميجا (بتشيل حوالي ١٦٠ ألف IP)، و [[rate=10r/s]] المعدل.

[[limit_req zone=api burst=20 nodelay]] في location: المعدل ١٠ في الثانية، بس بيسمح بدفعة لحد ٢٠ فوقه (صفحة بتعمل ١٥ طلب API مع بعض عادي). [[nodelay]] بيعالج الدفعة فورًا بدل ما يأخّر الطلبات (من غيرها بيطابقهم على المعدل بتأخير). اللي فوق الـ burst بيتقفل بـ 503 (أو 429 مع limit_req_status).

[[login]] بمعدل ٥ في الدقيقة و burst 3 مع nodelay: ٤ محاولات ورا بعض، وبعدين محاولة كل ١٢ ثانية. كفاية لإنسان، مستحيل لـ brute force.

[[limit_conn]]: عدد الاتصالات المتزامنة من IP، مفيد ضد اللي بيفتح مئات الاتصالات ويسيبها.

الحدود بالـ IP بتضرب مستخدمين ورا NAT واحد (شركة). للـ API بحساب: الحد في التطبيق بالـ user id أدق.

اللوج: [[limiting requests, excess: ...]] في error.log بيوريك مين اتقفل.`,
            when: "login و password reset و register دايمًا. الـ API بمعدل واسع.",
            mistakes: "rate من غير burst فأي صفحة بتعمل كذا طلب تتقفل. وتنسى إن الـ IP ورا Cloudflare هو IP Cloudflare (محتاج real_ip module)."
          },
          lines: [
            "منطقة api: ١٠ طلبات في الثانية لكل IP، ١٠ ميجا ذاكرة (في http).",
            "منطقة login: ٥ في الدقيقة.",
            "منطقة للاتصالات المتزامنة.",
            "الموقع.",
            "الـ API.",
            "طبّق api مع دفعة ٢٠ فوق المعدل، فورًا.",
            "أقصى ٢٠ اتصال متزامن من IP.",
            "للتطبيق.",
            "قفلة.",
            "login.",
            "٥ في الدقيقة، ودفعة ٣ فوق الأولى (٤ ورا بعض).",
            "رد 429 بدل 503.",
            "للتطبيق.",
            "قفلة.",
            "قفلة."
          ]
        },
        {
          cmd: "security headers",
          title: "add_header و server_tokens",
          desc: "الـ headers اللي شرحناها في تاب الأمان، بتتحط هنا مرة واحدة لكل المواقع. و [[server_tokens off]] بيخبّي رقم نسخة Nginx من الردود وصفحات الخطأ. خد بالك: [[add_header]] في location بيلغي اللي في server، فحطهم في ملف include.",
          example: R`server_tokens off;
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "DENY" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
add_header Content-Security-Policy "default-src 'self'; img-src 'self' data: https:; script-src 'self'" always;`,
          try: "احفظه في [[/etc/nginx/snippets/security.conf]] و [[include snippets/security.conf;]] في كل server. وافحص على securityheaders.com.",
          flag: "script",
          deep: {
            why: "نفس الـ headers من تاب الأمان. مكانها الطبيعي هنا، مرة واحدة، لكل المواقع. وفيه فخ في Nginx بيخليها تختفي من غير ما تعرف.",
            how: R`[[server_tokens off]]: الرد بيقول [[Server: nginx]] بدل [[nginx/1.24.0]]، وصفحات الخطأ من غير نسخة. المهاجم مش بيعرف نسختك يدوّر على ثغراتها.

[[add_header]] بـ [[always]] في الآخر: من غيرها الـ header بيتضاف على الردود الناجحة بس (2xx و 3xx)، ومش على 404 و 500. [[always]] على كل الردود.

الفخ: [[add_header]] مش بيتورّث بشكل تراكمي. لو server فيه ٥ headers، و location فيه add_header واحد (زي Cache-Control للملفات الثابتة)، الـ location ده بيبعت الواحد بس والخمسة بيختفوا. الحل: الـ headers في ملف snippet، و [[include]] في كل location فيه add_header. أو تحطهم في http block وتتجنب add_header في locations.

CSP هنا مثال بسيط: [[default-src 'self']] كل حاجة من نفس الدومين، الصور من أي https، السكربتات من نفس الدومين بس. لو الموقع بيحمّل fonts أو analytics من بره، لازم تضيفهم، وإلا هيتمنعوا. ابدأ بـ [[Content-Security-Policy-Report-Only]] وراقب console المتصفح.

HSTS: بعد أول زيارة https، المتصفح مش هيجرّب http أبدًا لمدة سنة. متحطهاش قبل ما https يشتغل تمام على كل subdomain لو [[includeSubDomains]].`,
            when: "snippet واحد في كل سيرفر، من أول موقع. وافحص بعد كل تغيير.",
            mistakes: "add_header في location بيمسح الباقي وانت مش واخد بالك (securityheaders.com بيكشفها). و HSTS قبل ما https مستقر."
          },
          lines: [
            "اخفي نسخة Nginx.",
            "متخمّنش نوع الملف.",
            "ممنوع في iframe.",
            "الـ referrer للدومين بس بره الموقع.",
            "امنع الكاميرا والميكروفون والموقع.",
            "https دايمًا لسنة (بعد ما https يستقر).",
            "مصادر المحتوى المسموحة (عدّلها لمصادرك)."
          ]
        },
        {
          cmd: "حدود و timeouts",
          title: "client_max_body_size والمهل",
          desc: "رفع صورة ٥ ميجا بيطلع 413؟ الافتراضي ١ ميجا. والتطبيق بياخد وقت في تقرير كبير فيطلع 504؟ الافتراضي ٦٠ ثانية. الحدود دي في server أو location، وارفعها للمسارات اللي محتاجاها بس.",
          example: R`client_max_body_size 20m;
client_body_timeout 30s;
send_timeout 30s;

location /api/upload {
    client_max_body_size 200m;
    proxy_request_buffering off;
    proxy_pass http://127.0.0.1:3000;
}

location /api/reports {
    proxy_read_timeout 300s;
    proxy_pass http://127.0.0.1:3000;
}`,
          try: "ارفع ملف ٢ ميجا من غير الإعداد: 413 في المتصفح و«client intended to send too large body» في error.log.",
          flag: "script",
          deep: {
            why: "413 لما المستخدم يرفع صورة من الموبايل، و 504 على تقرير بياخد دقيقتين. الاتنين حدود افتراضية معقولة لموقع عادي، ومش معقولة للمسارات دي.",
            how: R`[[client_max_body_size]]: أقصى حجم للـ body (رفع ملفات، JSON كبير). الافتراضي 1m. لو اتعدّى: 413 و [[client intended to send too large body]] في error.log. في server كحد عام، وفي location الرفع حد أكبر. الرقم ده على Nginx بس، والتطبيق ليه حده (multer، body-parser).

[[proxy_request_buffering off]] للرفع: افتراضيًا Nginx بيستقبل الملف كله ويحفظه مؤقتًا وبعدين يبعته للتطبيق. off بيمرره وهو بيوصل: أسرع وأقل ديسك للملفات الكبيرة.

[[proxy_read_timeout]]: قد إيه Nginx يستنى رد التطبيق بين كل حتة والتانية. الافتراضي 60s، وبعدها 504. ارفعه للمسارات اللي فعلًا بطيئة (تقارير، تصدير)، بس مش عام: طلب معلّق عام بيحجز worker.

[[client_body_timeout]] و [[send_timeout]]: مهل مع الزائر، تمنع اتصالات بطيئة تحجز موارد (Slowloris).

وفيه [[proxy_connect_timeout]] (الاتصال بالتطبيق) و [[proxy_send_timeout]].

الأصح للعمليات الطويلة: background job، والطلب يرجع فورًا بـ job id.`,
            when: "أي رفع ملفات: حدد الحجم في Nginx والتطبيق. أي endpoint بطيء بطبيعته.",
            mistakes: "client_max_body_size 0 (بلا حد) عام. و proxy_read_timeout 600 في http block لكل الموقع."
          },
          lines: [
            "أقصى body ٢٠ ميجا عام.",
            "مهلة استقبال الـ body.",
            "مهلة الإرسال للزائر.",
            "مسار الرفع.",
            "٢٠٠ ميجا هنا بس.",
            "مرر الملف وهو بيوصل بدل ما تخزنه الأول.",
            "للتطبيق.",
            "قفلة.",
            "مسار بطيء بطبيعته.",
            "استنى ٥ دقايق قبل 504.",
            "للتطبيق.",
            "قفلة."
          ]
        },
        {
          cmd: "proxy_buffer_size",
          title: "502 بعد تسجيل الدخول بس",
          desc: "الموقع شغال، وأول ما تعمل login يطلع 502. التطبيق بيبعت كوكيز دخول كبيرة (JWT مقسوم على كذا كوكي زي Supabase)، و Nginx بيقرا headers الرد في buffer صغير (٤ أو ٨ كيلو). في error.log هتلاقي [[upstream sent too big header]]. تكبير الـ buffers بيحلها.",
          example: R`location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_buffer_size 128k;
    proxy_buffers 4 256k;
    proxy_busy_buffers_size 256k;
}`,
          try: "[[sudo grep -c 'too big header' /var/log/nginx/error.log]] قبل التعديل وبعده، وجرّب login من نافذة incognito.",
          flag: "script",
          deep: {
            why: "الـ 502 هنا مش معناه إن التطبيق واقع. التطبيق رد عادي، بس Nginx رفض الرد لأن الـ headers أكبر من المكان اللي حاجزه ليها. فلو دوّرت في لوجات التطبيق مش هتلاقي أي غلطة.",
            how: R`[[proxy_buffer_size]]: الـ buffer اللي Nginx بيقرا فيه أول جزء من الرد، يعني الـ status والـ headers كلها. الافتراضي صفحة ذاكرة واحدة (٤ أو ٨ كيلو). رد فيه كذا [[Set-Cookie]] كل واحد فيه JWT ممكن يعدّي ١٠ كيلو بسهولة، فـ Nginx يقفل ويرجع 502.

[[proxy_buffers 4 256k]]: عدد وحجم الـ buffers لجسم الرد. [[proxy_busy_buffers_size]]: الجزء اللي ممكن يكون بيتبعت للزائر وهو لسه بيتقري. وليه قاعدة: لازم يبقى أكبر من أو يساوي [[proxy_buffer_size]]، وأقل من مجموع [[proxy_buffers]] ناقص buffer واحد، وإلا [[nginx -t]] هيرفض.

الاتجاه التاني: لما المتصفح نفسه يبعت كوكيز كبيرة، Nginx بيرجع [[400 Request Header Or Cookie Too Large]]. ده حله [[large_client_header_buffers 4 32k;]] في server block.

الأرقام دي لكل اتصال، فمتحطهاش ضخمة في http كله من غير سبب. حطها في location التطبيق اللي عليه الـ auth.`,
            when: "تطبيقات فيها Supabase auth أو NextAuth أو أي كوكيز JWT كبيرة ورا Nginx. وأي 502 التطبيق مش شايفه في لوجاته.",
            mistakes: "في مشروع حقيقي (Next.js و Supabase ورا Nginx) كوكيز وتوكنات الـ auth الكبيرة كانت بتعمل 502 بعد الدخول، والحل كان السطور دي بالظبط. والغلطة الشائعة إنك تدوّر في التطبيق وتعيد تشغيله، والرسالة الحقيقية قاعدة في error.log بتاع Nginx."
          },
          lines: [
            "location التطبيق.",
            "للتطبيق.",
            "مكان headers الرد: ١٢٨ كيلو بدل ٤ أو ٨.",
            "٤ buffers لجسم الرد، كل واحد ٢٥٦ كيلو.",
            "الجزء اللي بيتبعت للزائر وهو لسه بيتقري.",
            "قفلة."
          ]
        }
      ]
    },
    {
      t: "متقدم",
      l: 3,
      n: "WebSockets، والتبديل بين نسختين، والحماية بباسورد، واللوجات، و HTTP/2 و 3",
      items: [
        {
          cmd: "WebSockets",
          title: "Socket.io و Next.js HMR",
          desc: "الـ WebSocket بيبدأ كطلب HTTP عادي وبعدين «يترقّى» لاتصال دائم. Nginx محتاج يمرر headers الترقية ويرفع timeout، وإلا الاتصال بيتقطع بعد ٦٠ ثانية. الـ [[map]] بيخلي نفس الـ location يخدم HTTP عادي و WebSocket.",
          example: R`map $http_upgrade $connection_upgrade {
    default upgrade;
    ''      close;
}

server {
    location /socket.io/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
        proxy_set_header Host $host;
        proxy_read_timeout 3600s;
    }
}`,
          try: R`الـ map في http block. اختبر بـ [[npx wscat -c "wss://example.com/socket.io/?EIO=4&transport=websocket"]].`,
          flag: "script",
          deep: {
            why: "Socket.io شغال على localhost وبيقع على السيرفر. أو Next.js dev ورا Nginx والـ HMR مش بيشتغل. WebSocket محتاج Nginx يفهم إن الاتصال ده مش HTTP عادي.",
            how: R`الـ WebSocket بيبدأ بطلب GET فيه [[Upgrade: websocket]] و [[Connection: Upgrade]]. لو السيرفر وافق (101 Switching Protocols)، الاتصال بيتحوّل لقناة دائمة في الاتجاهين.

Nginx افتراضيًا بيشيل الـ headers دي (hop-by-hop). [[proxy_set_header Upgrade $http_upgrade]] و [[Connection $connection_upgrade]] بيمرروهم. و [[proxy_http_version 1.1]] لازمة (الترقية مش موجودة في 1.0).

الـ [[map]]: بيحسب متغير [[$connection_upgrade]] من [[$http_upgrade]]: لو الطلب فيه Upgrade، القيمة upgrade. لو فاضي (طلب HTTP عادي)، القيمة close. فنفس الـ location بيخدم الاتنين صح. الـ map في http block.

[[proxy_read_timeout 3600s]]: WebSocket مفتوح من غير بيانات ممكن دقايق. الافتراضي 60s بيقطعه. ساعة، أو Socket.io بيبعت ping كل ٢٥ ثانية فالافتراضي ممكن يكفي، بس ارفعه.

لو الـ WebSocket على مسار خاص ([[/socket.io/]] أو [[/ws]])، location له بس. لو على كل الموقع (Next.js)، حط الإعدادات في [[location /]].

اختبار: [[wscat]] أو في DevTools تاب Network فلتر WS.`,
            when: "Socket.io، و Next.js dev ورا proxy، وأي real-time.",
            mistakes: "نسيان http_version 1.1. و timeout الافتراضي فالاتصال يقع كل دقيقة والعميل يعيد الاتصال باستمرار."
          },
          lines: [
            "متغير: لو الطلب فيه Upgrade...",
            "...قيمته upgrade...",
            "...وإلا close (طلب HTTP عادي).",
            "قفلة.",
            "الموقع.",
            "مسار Socket.io.",
            "للتطبيق.",
            "لازمة للترقية.",
            "مرر header الترقية.",
            "و Connection من الـ map.",
            "الدومين.",
            "متقطعش الاتصال الصامت قبل ساعة.",
            "قفلة.",
            "قفلة."
          ]
        },
        {
          cmd: "blue-green",
          title: "نسختين ورا Nginx وتبديل من غير downtime",
          desc: "النسخة الجديدة على بورت تاني (3001)، تتأكد إنها شغالة، وبعدين تغيّر upstream وتعمل reload: صفر طلبات فاشلة. ولو فيه مشكلة ترجع بنفس الطريقة. [[backup]] بيخلي سيرفر احتياطي يستقبل بس لو الأساسي وقع.",
          example: R`upstream app {
    server 127.0.0.1:3000 max_fails=3 fail_timeout=10s;
    server 127.0.0.1:3001 backup;
}

# deploy.sh (part)
docker compose up -d app_green
sleep 5 && curl -fsS http://127.0.0.1:3001/health
sudo sed -i 's/127.0.0.1:3000 max_fails/127.0.0.1:3001 max_fails/; s/127.0.0.1:3001 backup/127.0.0.1:3000 backup/' /etc/nginx/conf.d/upstream.conf
sudo nginx -t && sudo systemctl reload nginx`,
          try: R`شغّل [[while true; do curl -s -o /dev/null -w "%{http_code} " https://example.com; sleep 0.2; done]] وانت بتبدّل: كله 200.`,
          flag: "script",
          deep: {
            why: "[[docker compose up]] بيوقف القديم ويشغّل الجديد: ثواني الموقع فيها 502. لعميل بيدفع، أو API بتاعة موبايل، الثواني دي شكاوى. Blue-green بيخلي التبديل لحظي ومن غير أي طلب فاشل.",
            how: R`نسختين من التطبيق: blue على 3000 (الحالية) و green على 3001. الـ upstream بيشاور على blue، و green [[backup]] (بيستقبل بس لو blue وقع، وده bonus).

الـ deploy: شغّل النسخة الجديدة على green (compose بخدمتين، أو container باسم تاني). استنى تقوم و health check عليها مباشرة على 3001. لو نجحت: بدّل الأدوار في ملف upstream (الـ sed بيبدّل الرقمين)، و [[nginx -t]] و [[reload]]. من اللحظة دي الطلبات الجديدة على green، والقديمة بتخلص على blue. مفيش طلب ضاع.

لو حصلت مشكلة بعد التبديل: نفس الـ sed بالعكس و reload. rollback في ثانية.

[[max_fails=3 fail_timeout=10s]]: لو السيرفر فشل ٣ مرات في ١٠ ثواني، Nginx يعتبره واقع ١٠ ثواني ويروح للـ backup. حماية إضافية.

قاعدة البيانات مشتركة بين الاتنين، فالـ migration لازم تبقى متوافقة مع النسختين (قاعدة الخطوتين).

للنسخ الأبسط: [[docker compose up -d --no-deps --scale app=2 --no-recreate app]] و Nginx على الاتنين، بس التحكم أقل.`,
            when: "لما الـ downtime بيفرق: مواقع عليها دفع، و APIs.",
            mistakes: "تبدّل قبل الـ health check. و migration كاسرة والنسختين شغالين."
          },
          lines: [
            "المجموعة.",
            "blue: الحالي، ويتعتبر واقع بعد ٣ فشل في ١٠ ثواني.",
            "green: احتياطي بيستقبل بس لو blue وقع.",
            "قفلة.",
            "شغّل النسخة الجديدة على green.",
            "استنى واتأكد إنها بترد مباشرة.",
            "بدّل الأدوار في ملف upstream.",
            "اختبر وطبّق: التبديل لحظي."
          ]
        },
        {
          cmd: "basic auth",
          title: "staging بباسورد",
          desc: "موقع staging مش المفروض جوجل ولا العملاء يشوفوه. [[auth_basic]] بيطلب يوزر وباسورد من المتصفح قبل أي حاجة. الباسوردات في ملف بـ [[htpasswd]]. ومسار الـ webhook بيتستثنى عشان البوابة توصله.",
          example: R`sudo apt install -y apache2-utils
sudo htpasswd -c /etc/nginx/.htpasswd dev
server {
    server_name staging.example.com;
    auth_basic "Staging";
    auth_basic_user_file /etc/nginx/.htpasswd;
    location /webhooks/ {
        auth_basic off;
        proxy_pass http://127.0.0.1:3000;
    }
    location / { proxy_pass http://127.0.0.1:3000; }
}`,
          try: "افتح staging في المتصفح: نافذة يوزر وباسورد. و [[curl -u dev:pass https://staging.example.com]] من الترمنال.",
          flag: "script",
          deep: {
            why: "staging عليه بيانات تجريبية وميزات لسه، ولينكه ممكن يتشارك. جوجل بيفهرسه، والعميل يفتحه بالغلط ويفتكره الإنتاج. باسورد بسيط بيقفل ده كله.",
            how: R`[[htpasswd]] (من apache2-utils) بيعمل ملف فيه يوزر وباسورد مشفّر. [[-c]] بيعمل الملف (أول مرة بس، بعدها من غيرها يضيف يوزرز).

[[auth_basic "Staging"]]: بيشغّل الحماية، والنص بيظهر في نافذة المتصفح. [[auth_basic_user_file]] الملف. المتصفح بيطلب يوزر وباسورد وبيبعتهم في header [[Authorization: Basic base64]] مع كل طلب.

[[auth_basic off]] في location الـ webhooks: Paymob مش هتقدر تدخل باسورد. أي مسار بتوصله خدمة خارجية يتستثنى.

الباسورد بيتبعت base64 (مش تشفير)، فلازم https. على http أي حد على الشبكة يقراه.

من curl: [[-u user:pass]]. من الكود (اختبارات E2E): الـ URL بصيغة [[https://user:pass@staging.example.com]].

بدائل: Cloudflare Access (تسجيل دخول بجوجل، أقوى وأريح)، أو IP allowlist بـ [[allow IP; deny all;]] لو IP الفريق ثابت.`,
            when: "كل staging و preview. وأدوات داخلية (Metabase، Adminer) لو مش عليها auth بتاعها.",
            mistakes: "basic auth على http. وتنسى تستثني webhooks فبوابة الدفع تفشل على staging وتفتكر المشكلة في الكود."
          },
          lines: [
            "أداة htpasswd.",
            "اعمل الملف بيوزر dev (-c أول مرة بس).",
            "الموقع.",
            "staging.",
            "شغّل الحماية بالنص ده.",
            "ملف الباسوردات.",
            "الـ webhooks...",
            "...من غير باسورد (البوابة مش هتدخله).",
            "للتطبيق.",
            "قفلة.",
            "الباقي محمي.",
            "قفلة."
          ]
        },
        {
          cmd: "htpasswd -B و $remote_user",
          title: "يوزر لكل واحد في الفريق، والتطبيق يعرف مين دخل",
          desc: "بدل باسورد واحد للفريق كله، كل واحد ليه يوزر في نفس الملف، فتقدر تشيل واحد لوحده. [[-B]] بيخزن الباسورد bcrypt، و [[-i]] بياخده من stdin بدل سطر الأوامر. و [[$remote_user]] اسم اليوزر اللي دخل، تبعته للتطبيق في header عشان يفلتر البيانات عليه.",
          example: R`sudo htpasswd -B /etc/nginx/.htpasswd-dashboard sara
PASS="$(openssl rand -base64 12 | tr -d '/+=')"
printf '%s\n' "$PASS" | sudo htpasswd -iB /etc/nginx/.htpasswd-dashboard omar
echo "omar: $PASS"
location /dashboard/ {
    auth_basic "team";
    auth_basic_user_file /etc/nginx/.htpasswd-dashboard;
    proxy_pass http://127.0.0.1:8080;
    proxy_set_header X-Dash-User $remote_user;
}`,
          try: "ضيف يوزرين، وبعدين [[sudo htpasswd -D /etc/nginx/.htpasswd-dashboard omar]] وجرّب تدخل بيه: مرفوض فورًا من غير reload.",
          flag: "script",
          deep: {
            why: "باسورد مشترك معناه إن أول ما حد يسيب الشغل لازم تغيّره للكل. ولوحة داخلية غالبًا محتاجة تعرف مين اللي فاتح عشان تعرضله بياناته هو بس. يوزر لكل واحد بيحل الاتنين من غير ما تبني نظام login.",
            how: R`[[htpasswd -B file user]]: يسألك الباسورد مرتين ويضيف (أو يغيّر) اليوزر ده بس. [[-B]] يعني bcrypt، أقوى من الافتراضي (apr1 MD5). و [[-c]] بيعمل الملف من الأول، يعني لو استخدمتها تاني بتمسح كل اليوزرز التانيين.

ليه [[-i]] مش [[-b]]؟ [[htpasswd -bB file omar Secret123]] بيحط الباسورد في سطر الأوامر، وأي يوزر على السيرفر يشوفه في [[ps aux]] وقت التشغيل، وبيتسجل في [[~/.bash_history]]. [[-i]] بيقرا الباسورد من stdin، فمبيظهرش في أي حتة من دول.

[[openssl rand -base64 12]] بيولّد باسورد عشوائي، و [[tr -d]] بيشيل الرموز اللي بتلخبط لما حد يكتبها.

Nginx بيقرا ملف اليوزرز مع كل طلب، فإضافة أو مسح يوزر بيسري فورًا من غير reload.

[[$remote_user]]: بعد ما الدخول ينجح، فيه اسم اليوزر. [[proxy_set_header X-Dash-User $remote_user]] بيبعته للتطبيق، وبيكتب فوق أي header بنفس الاسم الزائر بعته بنفسه. بس ده آمن بشرط إن التطبيق بيسمع على 127.0.0.1 بس. لو بورت 8080 مفتوح للنت، أي حد يكلّمه مباشرة ويبعت [[X-Dash-User: admin]].`,
            when: "لوحات داخلية لفريق صغير (٥ لـ ٣٠ واحد) من غير نظام حسابات. لو أكتر أو محتاج صلاحيات، اعمل login حقيقي في التطبيق.",
            mistakes: R`في مشروع حقيقي سكربت توليد الباسوردات كان بيستخدم [[htpasswd -bB]] جوه لوب، فكل باسورد بيبان في [[ps]] لأي يوزر على السيرفر. وكان بيحط كود الموظف جوه استعلام SQL مباشرة من غير فحص (لو اتبعت كباراميتر فيه علامة ' يبقى SQL injection)، والحل فحص regex زي [[^[a-z0-9]+$]] قبل أي استخدام. وكان بيعمل [[nginx -t && reload]] من غير ما يطبع حاجة لو الاختبار فشل. وكمان: الباسوردات المطبوعة على الشاشة بتفضل في scrollback الترمنال، فابعتها لأصحابها وامسح الشاشة.`
          },
          lines: [
            "ضيف sara (هيسألك الباسورد مرتين)، bcrypt.",
            "ولّد باسورد عشوائي من غير رموز ملخبطة.",
            "ضيف omar والباسورد جاي من stdin (مش ظاهر في ps).",
            "اطبعه مرة واحدة عشان تبعته له.",
            "اللوحة.",
            "اطلب دخول.",
            "ملف اليوزرز.",
            "للتطبيق (على 127.0.0.1 بس).",
            "ابعت اسم اللي دخل للتطبيق.",
            "قفلة."
          ]
        },
        {
          cmd: "لوجات مخصصة",
          title: "log_format JSON والفلترة",
          desc: "اللوج الافتراضي نص صعب تحليله. [[log_format]] بصيغة JSON بيخلي [[jq]] يشتغل عليه مباشرة، وتضيف حقول زي وقت الرد ووقت التطبيق. و [[access_log off]] للـ health checks عشان ميتملاش بطلبات المراقبة.",
          example: R`log_format json escape=json '{"time":"$time_iso8601","ip":"$remote_addr","method":"$request_method","uri":"$request_uri","status":$status,"bytes":$body_bytes_sent,"rt":$request_time,"upstream":"$upstream_response_time","ua":"$http_user_agent"}';

server {
    access_log /var/log/nginx/example.json json;
    location = /health { access_log off; proxy_pass http://127.0.0.1:3000; }
}`,
          try: "[[tail -f /var/log/nginx/example.json | jq 'select(.status >= 500)']]: الأخطاء لايف بس. و [[jq -s 'sort_by(.rt) | reverse | .[0:5]']] أبطأ ٥ طلبات.",
          flag: "script",
          deep: {
            why: "اللوج الافتراضي بيقول مين طلب إيه ورجع إيه. مش بيقول قد إيه أخد، ولا التطبيق كان بطيء ولا Nginx. و awk على النص بيتكسر مع أي مسافة زيادة. JSON بيحل الاتنين.",
            how: R`[[log_format json escape=json '...']]: بيعرّف صيغة اسمها json. [[escape=json]] بيهرب علامات التنصيص في القيم (user agent فيه علامات). كل حقل متغير Nginx:

[[$time_iso8601]] الوقت بصيغة قياسية. [[$request_time]] الوقت الكلي من أول byte طلب لآخر byte رد. [[$upstream_response_time]] الوقت اللي التطبيق أخده. الفرق بينهم هو Nginx والشبكة مع الزائر. لو الاتنين كبار: التطبيق. لو request_time بس: الزائر بطيء أو الرد كبير.

[[$status]] و [[$body_bytes_sent]] أرقام من غير علامات تنصيص عشان jq يعاملهم كأرقام.

[[access_log /path json]]: استخدم الصيغة لموقع معين. وممكن تخلي الصيغة الافتراضية في http block.

[[access_log off]] على /health: المراقبة بتطلبه كل ١٠ ثواني، ٨٦٤٠ سطر يوميًا من غير قيمة.

بعدها jq: [[select(.status >= 500)]] الأخطاء، [[sort_by(.rt)]] الأبطأ، [[group_by(.uri)]] الأكتر طلبًا. وأدوات زي GoAccess بتعمل dashboard من اللوج.

logrotate بيلف الملف يوميًا لوحده (ملف في /etc/logrotate.d/nginx).`,
            when: "من أول موقع إنتاج. الحقلين بتوع الوقت هما اللي بيفرقوا في التشخيص.",
            mistakes: "escape=json ناقص فسطر فيه علامة تنصيص يكسر الـ JSON. و $upstream_response_time ممكن يبقى «-» للردود من الكاش، فـ jq يشتكي (عشان كده بين علامات تنصيص)."
          },
          lines: [
            "صيغة JSON: الوقت، والـ IP، والطلب، والـ status، والحجم، ووقت الرد الكلي، ووقت التطبيق، والمتصفح. escape=json يهرب علامات التنصيص.",
            "الموقع.",
            "استخدم الصيغة في ملف خاص.",
            "health من غير لوج.",
            "قفلة."
          ]
        },
        {
          cmd: "HTTP/2 و HTTP/3",
          title: "أسرع من غير تغيير في التطبيق",
          desc: "HTTP/2 بيبعت كذا ملف على اتصال واحد، مفعّل بكلمة. HTTP/3 (QUIC على UDP) أسرع على الموبايل والشبكات الضعيفة، ومحتاج Nginx 1.25+ وفتح UDP 443. والـ ssl settings من certbot كويسة، بس [[ssl_session_cache]] بيسرّع الاتصالات المتكررة.",
          example: R`server {
    listen 443 ssl;
    listen 443 quic reuseport;
    http2 on;
    http3 on;
    add_header Alt-Svc 'h3=":443"; ma=86400' always;

    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 1d;
}`,
          try: "[[sudo ufw allow 443/udp]] لـ HTTP/3. وفي DevTools عمود Protocol في Network: h2 أو h3.",
          flag: "script",
          deep: {
            why: "HTTP/1.1 بيفتح ٦ اتصالات ويطلب الملفات واحد واحد. HTTP/2 اتصال واحد بيبعت الكل مع بعض. HTTP/3 نفس الفكرة على UDP فبيتحمل الشبكات الضعيفة والتنقل بين واي فاي وداتا. الفرق محسوس على الموبايل، والتطبيق مش محتاج يتغير.",
            how: R`[[http2 on]] (الصيغة الجديدة، القديمة كانت listen 443 ssl http2): يشغّل HTTP/2 على كل الـ listens اللي ssl. المتصفح بيتفاوض عليه في TLS (ALPN) لوحده. محتاج https.

HTTP/3: [[listen 443 quic reuseport]] بيسمع على UDP 443 كمان. [[http3 on]]. و [[Alt-Svc]] header بيقول للمتصفح «فيه h3 على نفس البورت، جرّبه المرة الجاية». أول زيارة h2، والتانية h3. [[reuseport]] بيسمح لكل worker يسمع. ولازم [[ufw allow 443/udp]]، ونسخة Nginx 1.25+ (أوبونتو 24.04 فيها 1.24 بس، فمحتاج repo nginx.org الرسمي أو توزيعة أحدث زي Debian 13). [[nginx -V | grep http_v3]] يتأكد.

الـ ssl: certbot بيكتب المسارات والإعدادات. [[ssl_protocols TLSv1.2 TLSv1.3]]: الأقدم ضعيف. [[ssl_session_cache shared:SSL:10m]]: بيحفظ جلسات TLS (١٠ ميجا حوالي ٤٠ ألف جلسة) فالزائر الراجع بيتخطى نص المصافحة. [[ssl_session_timeout 1d]].

متحطش [[ssl_stapling on]] مع شهادات Let's Encrypt: وقفت OCSP خالص في 2025، فالإعداد ملوش لازمة وبيطلع تحذير «no OCSP responder URL» في nginx -t.

اختبار: DevTools ثم Network ثم عمود Protocol (كليك يمين على العناوين لو مش ظاهر): h2 أو h3. وSSL Labs بيقيّم الإعدادات.`,
            when: "http2 على كل سيرفر فورًا. http3 لو نسختك بتدعمه وجمهورك موبايل.",
            mistakes: "http3 من غير فتح UDP فالـ Alt-Svc بيوعد بحاجة مش موجودة والمتصفح يرجع h2 بعد محاولة فاشلة (أبطأ). والصيغة القديمة listen ... http2 في Nginx جديد بتطلع تحذير. والعكس: [[http2 on]] على 1.24 (أوبونتو 24.04) بيطلع unknown directive، فهناك استخدم listen 443 ssl http2. و [[reuseport]] يتكتب مرة واحدة بس لكل بورت على السيرفر كله، لو كررته في بلوك تاني -t بيرفض (duplicate listen options)."
          },
          lines: [
            "الموقع.",
            "https.",
            "و UDP 443 لـ HTTP/3.",
            "شغّل HTTP/2.",
            "شغّل HTTP/3.",
            "قول للمتصفح إن h3 متاح.",
            "الشهادة.",
            "المفتاح.",
            "TLS 1.2 و 1.3 بس.",
            "كاش الجلسات: الزائر الراجع أسرع.",
            "لمدة يوم.",
            "قفلة."
          ]
        },
        {
          cmd: "IP الزائر ورا Cloudflare",
          title: "set_real_ip_from و CF-Connecting-IP",
          desc: "لما Cloudflare قدام السيرفر، كل الطلبات بتوصل من IPs بتاعة Cloudflare: اللوج، و rate limiting، و fail2ban، و ufw deny كلهم بيشتغلوا على IP غلط. موديول [[realip]] بيخلي Nginx يصدّق header [[CF-Connecting-IP]] بس لو الطلب جاي فعلًا من رينجات Cloudflare، ويحط IP الزائر الحقيقي في [[$remote_addr]].",
          example: R`{ for f in ips-v4 ips-v6; do curl -s https://www.cloudflare.com/$f; echo; done; } | grep . | sed 's/.*/set_real_ip_from &;/' | sudo tee /etc/nginx/conf.d/cloudflare-realip.conf
echo 'real_ip_header CF-Connecting-IP;' | sudo tee -a /etc/nginx/conf.d/cloudflare-realip.conf
nginx -V 2>&1 | grep -o with-http_realip_module
sudo nginx -t && sudo systemctl reload nginx
sudo tail -5 /var/log/nginx/access.log | awk '{print $1}'`,
          try: "افتح الموقع من موبايلك على الداتا، وقارن أول عمود في access.log بـ IP اللي بيقوله ifconfig.me قبل الإعداد وبعده.",
          deep: {
            why: "من غير الإعداد ده، أول زائر يعمل ضغط فـ rate limiting بيقفل Cloudflare نفسها، يعني كل الزوار. و fail2ban ممكن يحظر Cloudflare فالموقع يقع للكل.",
            how: R`[[set_real_ip_from]]: الرينجات اللي بتثق فيها. Nginx مش هيقرا الـ header إلا لو الطلب جاي منها، فمحدش يقدر يزوّر IP بإنه يبعت الـ header بنفسه. القائمة الرسمية على cloudflare.com/ips، والأمر الأول بيولّد الملف منها (IPv4 و IPv6).

[[real_ip_header CF-Connecting-IP]]: الـ header اللي Cloudflare بتحط فيه IP الزائر. بعدها [[$remote_addr]] و [[$binary_remote_addr]] بيبقوا الزائر في كل حاجة: اللوج و limit_req و allow/deny.

الملف في conf.d فبيتطبق على http كله. والتطبيق بياخد الـ IP الصح من X-Real-IP لأنه مبني على $remote_addr.

لو بتستخدم Cloudflare Tunnel، الطلبات جاية من cloudflared على السيرفر نفسه: [[set_real_ip_from 127.0.0.1;]].`,
            when: "أول ما تحط Cloudflare بـ proxy (السحابة البرتقالي) قدام أي موقع.",
            mistakes: "[[set_real_ip_from 0.0.0.0/0]] أو [[real_ip_header X-Forwarded-For]] من غير رينجات: أي حد يزوّر IP ويعدّي الحظر. ونسيان تحديث القائمة لما Cloudflare تضيف رينج (cron شهري بنفس الأمر)."
          },
          lines: [
            "هات رينجات Cloudflare الرسمية (IPv4 و IPv6) وحوّل كل سطر لـ set_real_ip_from في ملف conf.d.",
            "خد IP الزائر من CF-Connecting-IP (بس من الرينجات دي).",
            "موديول realip مبني في نسختك؟",
            "اختبر وطبّق.",
            "آخر IPs في اللوج: المفروض زوار حقيقيين مش رينجات Cloudflare."
          ]
        },
        {
          cmd: "تشخيص Nginx",
          title: "كل error ورسالته في اللوج",
          desc: "كل status له سطر مميز في error.log: 403 غالبًا صلاحيات أو directory بدون index، و 404 المسار في root غلط، و 413 حجم الرفع، و 502 التطبيق مش بيرد، و 504 بطيء. و [[error_log debug]] مؤقتًا بيوريك كل قرار Nginx خده للطلب.",
          example: R`sudo tail -50 /var/log/nginx/error.log
sudo grep -c " 502 " /var/log/nginx/access.log
curl -sI -H "Host: example.com" http://127.0.0.1/ | head -1
sudo -u www-data ls -la /var/www/example.com/html/
sudo nginx -T | grep -B3 -A10 "server_name example.com"
sudo sed -i 's/error_log .*/error_log \/var\/log\/nginx\/error.log debug;/' /etc/nginx/nginx.conf && sudo nginx -s reload`,
          try: "403 على موقع static: الأمر الرابع بيجرّب القراية كيوزر Nginx (www-data). لو Permission denied، ده السبب.",
          deep: {
            why: "Nginx بيقول بالظبط ليه رفض أو فشل، في error.log. المشكلة إن الناس بتشوف الـ status في المتصفح وتخمّن بدل ما تقرا السطر.",
            how: R`الرسايل الشائعة في error.log وحلها:

[[open() failed (13: Permission denied)]]: 403، Nginx (www-data) مش قادر يقرا الملف أو يدخل فولدر في الطريق. الأمر الرابع بيجرّب كـ www-data بالظبط. الحل chmod على الفولدرات (755) والملفات (644)، أو chown.

[[directory index of ... is forbidden]]: 403، الطلب على فولدر ومفيش index.html فيه.

[[open() failed (2: No such file)]]: 404، الـ root غلط أو الملف مش هناك. [[nginx -T]] يوريك الـ root الفعلي للبلوك.

[[client intended to send too large body]]: 413.

[[connect() failed (111: Connection refused) while connecting to upstream]]: 502، التطبيق واقع أو بورت غلط.

[[upstream timed out]]: 504.

[[conflicting server name]] عند -t: نفس server_name في بلوكين.

[[curl -H "Host: example.com" http://127.0.0.1]]: بيختبر بلوك معين من على السيرفر متجاهلًا DNS.

[[error_log ... debug]] مؤقتًا: كل قرار (أنهي location اتاختار، وأنهي ملف اتجرّب). ضخم، شغّله دقيقة وارجّعه لـ warn.

و [[grep -c " 502 "]] يعدّ 502 في access.log: بتحصل كتير ولا مرة واحدة؟`,
            when: "أي status غير متوقع. أول حاجة error.log.",
            mistakes: "تعدّل صلاحيات لـ 777 عشان 403 يروح. وتسيب debug شغال فاللوج يملى الديسك في ساعات."
          },
          lines: [
            "آخر ٥٠ خطأ: الرسالة بتقول السبب.",
            "كام 502 في اللوج.",
            "اختبر بلوك معين من على السيرفر.",
            "جرّب القراية كيوزر Nginx: Permission denied = 403.",
            "الإعدادات الفعلية للبلوك ده.",
            "شغّل debug مؤقتًا (رجّعه warn بعدين)."
          ]
        }
      ]
    },
    {
      t: "Nginx جوه Docker والشهادات",
      l: 3,
      n: "شهادات بـ webroot، و DNS بتاع Docker، وتعديل config مشترك بين كذا مشروع من غير ما توقّع حد",
      items: [
        {
          cmd: "acme-challenge",
          title: "مسار تحقق Let's Encrypt يفضل شغال على بورت 80",
          desc: "لما certbot يشتغل بطريقة webroot، Let's Encrypt بتطلب ملف من [[/.well-known/acme-challenge/]] على بورت 80. البلوك ده بيقدّم المسار ده من فولدر ثابت، وكل الباقي يتحوّل لـ https. ولازم يفضل موجود بعد SSL كمان، لأن التجديد كل شهرين بيعدّي من نفس الطريق.",
          example: R`server {
    listen 80;
    server_name example.com www.example.com;
    location /.well-known/acme-challenge/ { root /var/www/certbot; }
    location / { return 301 https://example.com$request_uri; }
}`,
          try: "حط ملف تجربة: [[echo ok | sudo tee /var/www/certbot/.well-known/acme-challenge/test]] واطلب [[curl http://example.com/.well-known/acme-challenge/test]]: لازم يرد ok مش 301.",
          flag: "script",
          deep: {
            why: "Nginx جوه Docker معناه إن [[certbot --nginx]] مينفعش (certbot مش شايف ملفات Nginx ولا يقدر يعمله reload). webroot بيحل ده: certbot يكتب ملف التحدي في فولدر، و Nginx يقدمه، من غير ما حد يوقف الموقع.",
            how: R`certbot بيكتب ملف باسم عشوائي في [[/var/www/certbot/.well-known/acme-challenge/]]، و Let's Encrypt بتطلب [[http://example.com/.well-known/acme-challenge/NAME]]. لو رجع المحتوى الصح، يبقى انت مسيطر على الدومين.

في compose نفس الفولدر راكب في الاتنين: [[./certbot/www:/var/www/certbot]] في container الـ Nginx وفي container الـ certbot، و [[./certbot/conf:/etc/letsencrypt]] للشهادات (في Nginx بـ [[:ro]]).

مشكلة البيضة والفرخة: الإعداد الكامل فيه [[ssl_certificate]] بيشاور على ملف لسه مش موجود، فـ Nginx يرفض يقوم خالص ([[cannot load certificate]]). ولو Nginx مش قايم مفيش حد يرد على التحدي. الحل على مرحلتين: شغّل Nginx بإعداد HTTP بس (البلوك ده)، خد الشهادة، وبعدين حط الإعداد الكامل بالـ 443. الأمر نفسه في تاب VPS (certbot --webroot).

الترتيب جوه البلوك مش مهم: [[/.well-known/acme-challenge/]] بادئة أطول من [[/]] فبتكسب لوحدها.`,
            when: "أي Nginx جوه Docker، أو أي سيرفر عايز تجدد فيه الشهادة من غير ما توقف الموقع.",
            mistakes: "في مشروع حقيقي سكربت أول شهادة كان بيشغّل Nginx بالإعداد الكامل اللي بيشاور على شهادة لسه مش موجودة، فـ Nginx يقع ومحدش يرد على التحدي. ومسح بلوك الـ acme بعد ما SSL اشتغل «لأنه خلص»، فالتجديد يفشل بعد شهرين. وفولدر مختلف في الاتنين (certbot بيكتب في مكان و Nginx بيقرا من مكان تاني) فالتحدي يرجع 404."
          },
          lines: [
            "بلوك بورت 80.",
            "http.",
            "الدومين بالـ www ومن غيرها.",
            "ملفات التحدي من الفولدر المشترك مع certbot.",
            "أي حاجة تانية تروح https على دومين واحد.",
            "قفلة."
          ]
        },
        {
          cmd: "resolver 127.0.0.11",
          title: "اسم الـ container يتسأل عنه مع كل طلب",
          desc: "[[proxy_pass http://myapp-app:3000]] بيحوّل الاسم لـ IP مرة واحدة وقت ما Nginx يقوم. لو الـ container اتبنى من جديد وخد IP تاني، Nginx يفضل يكلم القديم ويرجع 502 لحد reload. [[resolver 127.0.0.11]] (الـ DNS بتاع Docker) مع العنوان في متغير بيخلي Nginx يسأل من جديد كل شوية.",
          example: R`resolver 127.0.0.11 valid=10s ipv6=off;
server {
    listen 80;
    server_name example.com;
    location / {
        set $app_upstream http://myapp-app:3000;
        proxy_pass $app_upstream;
    }
}`,
          try: "اعمل [[docker compose up -d --force-recreate app]] وانت عامل [[curl]] في لوب على الموقع: من غير الـ resolver هتشوف 502 لحد ما تعمل reload، ومعاه بيرجع لوحده في ثواني.",
          flag: "script",
          deep: {
            why: "على سيرفر فيه Nginx واحد مشترك قدام كذا مشروع، كل deploy لأي مشروع بيعيد إنشاء الـ container بتاعه. من غير الإعداد ده لازم تفتكر تعمل reload للـ Nginx المشترك بعد كل deploy، ولو container مشروع واحد واقع Nginx كله ميقومش.",
            how: R`اسم ثابت في [[proxy_pass]] بيتحل مرة واحدة وقت القراية. ده بيعمل مشكلتين: IP قديم بعد إعادة الإنشاء (502)، ولو الـ container مش شغال وقت ما Nginx يقوم أو يعمل reload، بيرفض الإعداد كله بـ [[host not found in upstream]]، فكل المواقع اللي على نفس الـ Nginx تقع.

لما العنوان يبقى متغير ([[set $app_upstream]])، Nginx مش بيحلّه وقت القراية. بيحلّه وقت الطلب عن طريق [[resolver]]. و [[127.0.0.11]] عنوان ثابت للـ DNS الداخلي بتاع Docker، موجود في أي network انت عاملها (زي network الـ compose)، مش في الـ bridge الافتراضي.

[[valid=10s]]: خزّن الإجابة ١٠ ثواني بس. [[ipv6=off]]: متسألش عن AAAA (الشبكة غالبًا IPv4 بس).

فرق مهم: مع المتغير، الـ URI بيتبعت زي ما هو ومفيش استبدال للبادئة، فلو كنت بتعتمد على [[proxy_pass http://app:3000/;]] (بشرطة في الآخر) عشان تشيل جزء من المسار، هتحتاج [[rewrite]] بدلها.

و [[upstream {}]] مبيعملش ده في النسخ القديمة. من Nginx 1.27.3 فيه [[server app:3000 resolve;]] جوه upstream، بس طريقة المتغير شغالة في أي نسخة.`,
            when: "Nginx جوه Docker بيعمل proxy لـ containers تانية بالاسم، خصوصًا لو مشترك بين كذا مشروع.",
            mistakes: "متغير في proxy_pass من غير سطر [[resolver]]: كل طلب يرجع 502 وفي اللوج [[no resolver defined]]. واستخدام [[resolver 8.8.8.8]]: ده DNS عام ميعرفش أسامي الـ containers. وتفتكر إن [[docker compose restart]] بيحافظ على الـ IP، هو غالبًا بيحافظ عليه، بس [[up -d]] بعد build بيعمل container جديد بـ IP جديد."
          },
          lines: [
            "اسأل DNS بتاع Docker، وخزّن الإجابة ١٠ ثواني.",
            "الموقع.",
            "http.",
            "الدومين.",
            "كل الطلبات.",
            "العنوان في متغير، فمبيتحلّش وقت القراية.",
            "Nginx يسأل عن الاسم وقت الطلب.",
            "قفلة.",
            "قفلة."
          ]
        },
        {
          cmd: "nginx -t في container مؤقت",
          title: "جرّب الإعداد الجديد بنفس النسخة قبل ما تلمس الحقيقي",
          desc: "على Nginx شغال جوه Docker، غلطة في الملف معناها إن الـ container يقع مع أول restart. قبل ما تكتب فوق الملف الحقيقي، شغّل container مؤقت من نفس الـ image وعلى نفس الشبكة، راكب فيه الملف الجديد، واعمل [[nginx -t]]. لو فشل، الملف الحقيقي متلمسش.",
          example: R`IMAGE="$(docker inspect nginx --format '{{.Config.Image}}')"
docker run --rm --network proxy-net \
  -v "$PWD/nginx.conf.new:/etc/nginx/nginx.conf:ro" \
  -v /srv/certbot/conf:/etc/letsencrypt:ro \
  "$IMAGE" nginx -t`,
          try: "اعمل نسخة من الإعداد، ضيف فيها غلطة (امسح ; من سطر)، وجرّبها بالأمر ده. الخطأ يطلع بالسطر، والموقع الحقيقي شغال عادي.",
          deep: {
            why: "[[docker exec nginx nginx -t]] بيختبر الملف اللي الـ container شايفه دلوقتي، يعني لازم تكون كتبت فوق الحقيقي الأول. لو فيه غلطة ونسيت ترجّع، أول restart للسيرفر ياخد كل المواقع معاه. الاختبار في container مؤقت بيفصل التجربة عن الإنتاج.",
            how: R`[[docker inspect ... '{{.Config.Image}}']]: اسم الـ image اللي الـ Nginx الحقيقي شغال بيها بالظبط. نفس النسخة مهم: [[http2 on]] مثلًا بيعدّي على 1.25 ويرفضه 1.24.

[[--network proxy-net]]: نفس الشبكة، لأن [[nginx -t]] بيحاول يحل أسامي الـ upstreams الثابتة. من غير الشبكة هيفشل بـ [[host not found]] والإعداد سليم.

[[-v .../letsencrypt:ro]]: [[nginx -t]] بيفتح ملفات الشهادات فعلًا، فلازم تبقى موجودة وإلا يفشل بـ [[cannot load certificate]].

[[--rm]]: الـ container بيتمسح لوحده بعد الاختبار.

لو عدّى، تكتب الملف الجديد مكان القديم وتعمل [[docker exec nginx nginx -s reload]]. الدرس اللي بعده بيجمع ده كله في سكربت.`,
            when: "قبل أي تعديل على Nginx مشترك جوه Docker، خصوصًا من سكربت deploy.",
            mistakes: "تختبر بـ [[nginx:latest]] بدل الـ image الشغالة فيعدّي عندك ويفشل في الحقيقي. وتنسى الشبكة أو الشهادات فتاخد فشل كاذب وتفتكر الإعداد بايظ."
          },
          lines: [
            "اسم الـ image اللي Nginx الحقيقي شغال بيها.",
            "container مؤقت على نفس الشبكة (بيتمسح بعد ما يخلص).",
            "راكب فيه الملف الجديد مكان nginx.conf.",
            "والشهادات عشان -t بيفتحها فعلًا.",
            "اختبر بس، من غير ما تشغّل حاجة."
          ]
        },
        {
          cmd: "بلوك managed",
          title: "تحط جزء مشروعك في config مشترك وتغيّره بأمان",
          desc: "سيرفر عليه Nginx واحد لكذا مشروع، وكل مشروع ليه جزء في نفس الملف. السكربت ده بيحط جزء مشروعك بين علامتين ([[# >>> myapp]] و [[# <<< myapp]])، فكل deploy يشيل القديم ويحط الجديد من غير ما يلمس الباقي. قبلها باك أب، واختبار في container مؤقت، وبعدها reload.",
          example: R`#!/bin/bash
set -euo pipefail
SNIPPET="$__{1:?usage: nginx-apply.sh snippet.conf}"
CONF=/srv/shared/nginx/nginx.conf
BEGIN="# >>> myapp (managed)"; END="# <<< myapp"
cp "$CONF" "$CONF.bak.$(date +%Y%m%d%H%M%S)"
TMP="$(mktemp)"; cp "$CONF" "$TMP"
start=$(grep -n -F "$BEGIN" "$TMP" | head -1 | cut -d: -f1 || true)
end=$(grep -n -F "$END" "$TMP" | tail -1 | cut -d: -f1 || true)
if [ -n "$start" ] && [ -n "$end" ]; then sed -i "$__{start},$__{end}d" "$TMP"
elif [ -n "$start$end" ]; then echo "one marker is missing, fix by hand"; exit 1; fi
last=$(grep -n '^}' "$TMP" | tail -1 | cut -d: -f1)
{ head -n $((last - 1)) "$TMP"; echo "$BEGIN"; cat "$SNIPPET"; echo "$END"; echo "}"; } > "$TMP.new"
IMAGE="$(docker inspect nginx --format '{{.Config.Image}}')"
docker run --rm --network proxy-net -v "$TMP.new:/etc/nginx/nginx.conf:ro" "$IMAGE" nginx -t \
  || { echo "test failed, $CONF unchanged"; exit 1; }
cat "$TMP.new" > "$CONF"
rm -f "$TMP" "$TMP.new"
docker exec nginx nginx -s reload`,
          try: "على سيرفر التجربة: شغّل السكربت مرتين ورا بعض بنفس الـ snippet، و [[grep -c '>>> myapp' nginx.conf]] لازم يفضل 1 مش 2.",
          flag: "script",
          deep: {
            why: "لما مشروعين بيشاركوا Nginx واحد، أي تعديل يدوي على الملف ممكن يبوّظ المشروع التاني. العلامات بتخلي كل مشروع يعرف حدوده بالظبط، والسكربت بيعمل التعديل بنفس الطريقة كل مرة.",
            how: R`الباك أب بتاريخ في الاسم، وكل الشغل على نسخة مؤقتة ([[mktemp]])، فالملف الحقيقي مبيتلمسش غير في آخر سطرين.

[[grep -n -F]]: رقم السطر اللي فيه العلامة ([[-F]] نص حرفي مش regex). لو العلامتين موجودين، [[sed -i "start,endd"]] بيمسح من الأولى للتانية. لو واحدة بس موجودة، حد عدّل بإيده، فالسكربت يقف بدل ما يضيف بلوك مكرر.

[[grep -n '^}' | tail -1]]: آخر قوس في أول السطر، وده بيفترض إنه قفلة [[http {}]]. [[head -n $((last - 1))]] كل اللي قبله، وبعدين العلامة والـ snippet والعلامة والقوس.

الاختبار في container مؤقت بنفس الـ image والشبكة (الدرس اللي قبله). لو فشل، [[exit 1]] والملف زي ما هو.

ليه [[cat "$TMP.new" > "$CONF"]] مش [[mv]]؟ الملف راكب في الـ container كـ bind mount لملف واحد، والـ mount مربوط بالـ inode (رقم الملف على الديسك). [[mv]] و [[sed -i]] بيعملوا ملف جديد بـ inode جديد، فالـ container يفضل شايف القديم، والـ reload يقرا الإعداد القديم وانت فاكر إنك طبّقت. [[cat >]] بيكتب جوه نفس الملف فالـ container يشوف التغيير.`,
            when: "أي config مشترك بين أكتر من مشروع، أو أي ملف بيعدّله سكربت deploy بدل إنسان.",
            mistakes: "في مشروع حقيقي السكربت كان بيفترض إن آخر [[}]] في الملف قفلة [[http {}]]، فلو فيه [[stream {}]] بعده البلوك يتحط في المكان الغلط. وكان لو علامة النهاية اتمسحت يدوي بيضيف بلوك مكرر (النسخة دي بتقف). وملفات [[.bak]] بتتراكم من غير تنضيف ([[find -name '*.bak.*' -mtime +30 -delete]]). والأهم: مشروع بيعدّل ملف يملكه مشروع تاني بيربطهم ببعض، فالأنضف [[include /etc/nginx/conf.d/*.conf]] وكل مشروع ملف لوحده."
          },
          lines: [
            "وقّف عند أي غلطة أو متغير مش معرّف.",
            "ملف الـ snippet من أول باراميتر، وإلا اطبع طريقة الاستخدام.",
            "الملف المشترك.",
            "علامتين البداية والنهاية.",
            "باك أب بالتاريخ.",
            "اشتغل على نسخة مؤقتة.",
            "رقم سطر علامة البداية (أو فاضي).",
            "رقم سطر علامة النهاية.",
            "لو الاتنين موجودين: امسح البلوك القديم.",
            "لو واحدة بس: حد عدّل بإيده، اقف.",
            "آخر قوس في أول السطر (قفلة http).",
            "اللي قبله، والبلوك الجديد بين العلامتين، والقوس.",
            "الـ image الشغالة.",
            "اختبر في container مؤقت...",
            "...ولو فشل اقف والملف الحقيقي زي ما هو.",
            "اكتب جوه نفس الملف (نفس الـ inode) عشان الـ container يشوفه.",
            "امسح الملفات المؤقتة.",
            "طبّق من غير قطع."
          ]
        },
        {
          cmd: "Caddy",
          title: "بديل بيطلع SSL ويجدده لوحده",
          desc: "Caddy سيرفر زي Nginx، بس بيطلع شهادة Let's Encrypt ويجددها لوحده لأي دومين تكتبه، من غير certbot ولا cron ولا مرحلتين. الإعداد أقصر بكتير. مناسب لمشروع جديد صغير، و Nginx أحسن لو عندك إعدادات معقدة أو شغال عليه أصلًا.",
          example: R`bot.example.com {
    handle /webhook/* {
        reverse_proxy app:8080
    }
    handle {
        respond "not found" 404
    }
}
admin.example.com {
    basic_auth {
        admin PASTE_HASH_HERE
    }
    reverse_proxy n8n:5678
}`,
          try: "على سيرفر التجربة بدومين فرعي: [[docker run -d -p 80:80 -p 443:443 -v caddy_data:/data -v $PWD/Caddyfile:/etc/caddy/Caddyfile caddy]] وافتح الدومين بـ https على طول.",
          flag: "script",
          deep: {
            why: "نص إعداد Nginx في مشروع صغير بيروح على SSL: بلوك acme، وشهادة على مرحلتين، وcontainer لـ certbot، وتجديد، وreload. Caddy بيعمل ده كله من اسم الدومين بس.",
            how: R`أي بلوك يبدأ باسم دومين، Caddy بيفهم إنه محتاج HTTPS: يطلب الشهادة، ويحوّل http لـ https، ويجدد قبل الانتهاء. الشرط زي certbot: الدومين بيشاور على السيرفر، وبورت 80 و 443 مفتوحين.

[[handle /webhook/*]]: المسار ده بس يروح للتطبيق. [[handle]] من غير مسار: أي حاجة تانية ترجع 404. كده البوت مكشوف منه الـ webhook بس، مش التطبيق كله.

[[basic_auth]]: زي auth_basic في Nginx. الـ hash بتطلعه بـ [[caddy hash-password]] (bcrypt). في النسخ القديمة اسمها [[basicauth]].

[[reverse_proxy n8n:5678]]: بالاسم جوه شبكة Docker، والـ headers زي X-Forwarded-For بتتبعت لوحدها.

وتقدر تكتب [[{$BOT_HOST}]] بدل الدومين، و Caddy ياخده من متغيرات البيئة.`,
            when: "مشروع جديد على سيرفر فاضي، أو أدوات داخلية (n8n، لوحات) محتاجة HTTPS بسرعة.",
            mistakes: "تنسى volume لـ [[/data]]: الشهادات بتضيع مع كل إعادة إنشاء، و Caddy يطلب جديدة كل مرة لحد ما يخبط في حد Let's Encrypt (٥ شهادات لنفس الدومينات في الأسبوع). وتشغّل Caddy و Nginx مع بعض على نفس السيرفر، والاتنين عايزين بورت 80 و 443."
          },
          lines: [
            "دومين البوت (Caddy يطلع شهادته لوحده).",
            "مسار الـ webhook بس...",
            "...يروح للتطبيق.",
            "قفلة.",
            "أي حاجة تانية...",
            "...404.",
            "قفلة.",
            "قفلة.",
            "دومين اللوحة.",
            "باسورد.",
            "يوزر admin والـ hash من caddy hash-password.",
            "قفلة.",
            "للوحة.",
            "قفلة."
          ]
        }
      ]
    }
  ]
});
