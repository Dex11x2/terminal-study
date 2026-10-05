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
//   sol      اختياري: حل التجربة والناتج المتوقع (بيظهر مقفول تحت «جرّب»)
//   solCode  اختياري: كود الحل، بيتعرض كـ مثال تحت الـ sol
//   check    اختياري: تمرين بيتصحح لوحده في الصفحة
//            JS:  { lang: "js", starter, tests: R`test("..", () => expect(x).toBe(y))`, solution }
//            SQL: { lang: "sql", setup: R`CREATE TABLE ...; INSERT ...`, starter, expect: [[...صفوف]] أو expectSql: R`استعلام مرجعي`, solution, ordered }
//            solution حل مرجعي مش بيظهر، و npm run check بيتأكد إنه بيعدّي الاختبارات. المتاح في tests: test و expect(x).toBe/toEqual/toThrow/toBeTruthy/toBeFalsy
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
          ],
          sol: R`على أوبونتو [[/etc/nginx/nginx.conf]] بيبدأ بـ [[user www-data;]] و [[worker_processes auto;]] (worker لكل core)، وبعدين [[include /etc/nginx/modules-enabled/*.conf;]]، وبعدين بلوك [[events { worker_connections 768; }]]، وبعدين [[http {]] الكبير فيه [[sendfile]] و [[include /etc/nginx/mime.types;]] وإعدادات اللوج و gzip.

وفي آخر بلوك http هتلاقي السطرين المهمين: [[include /etc/nginx/conf.d/*.conf;]] و [[include /etc/nginx/sites-enabled/*;]]. يعني أي ملف في الفولدرين دول بيتحط كأنه مكتوب جوه http، وده مكان مواقعك. و [[ls -la /etc/nginx/sites-enabled/]] بيوري links زي [[default -> /etc/nginx/sites-available/default]].

الغلط الشائع: تكتب [[server {}]] في nginx.conf بره بلوك http فيطلع [["server" directive is not allowed here]]. أو تعدّل ملف في sites-available وتنسى الـ link في sites-enabled، فمايتقريش. [[sudo nginx -T]] بيوريك الإعداد النهائي كله متجمع.`
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
          ],
          sol: R`[[curl -H "Host: example.com" http://127.0.0.1]] بيرجّع محتوى [[index.html]] بتاعك (جربتها ورجّع [[<h1>example</h1>]]). الـ [[Host]] header هو اللي بيخلّي Nginx يختار الـ server block ده من غير ما يبقى عندك دومين حقيقي.

الترتيب: [[sudo ln -s /etc/nginx/sites-available/example.com /etc/nginx/sites-enabled/]] وبعدين [[sudo nginx -t]] ([[syntax is ok]] و [[test is successful]]) وبعدين [[sudo systemctl reload nginx]].

لو رجّع صفحة [[Welcome to nginx!]] يبقى الـ default هو اللي رد: الملف مش متفعّل أو [[server_name]] مكتوب غلط. ولو 403 أو 404 وفي [[error.log]] تلاقي [[(13: Permission denied)]]، يبقى يوزر Nginx ([[www-data]]) مش قادر يوصل للفولدر: كل فولدر في المسار محتاج [[x]] للآخرين (درس تشخيص Nginx).`,
          solCode: R`sudo mkdir -p /var/www/example.com/html
echo '<h1>example</h1>' | sudo tee /var/www/example.com/html/index.html
sudo ln -s /etc/nginx/sites-available/example.com /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
curl -H "Host: example.com" http://127.0.0.1`
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
          ],
          sol: R`[[app.example.com/dashboard]] مباشرة بيفتح التطبيق بدل 404، و [[curl -s -o /dev/null -w "%{http_code}" -H "Host: app.example.com" http://127.0.0.1/dashboard]] بيطبع [[200]] والمحتوى هو [[index.html]]. الـ router في React هو اللي بيقرا [[/dashboard]] ويعرض الصفحة.

ده شغل [[try_files $uri $uri/ /index.html]]: مفيش ملف اسمه dashboard، فـ Nginx بيرجع index.html. ومن غير السطر ده بيرجع [[404 Not Found]] من Nginx نفسه.

الغلط الشائع: [[/api/users]] كمان بيرجع HTML بدل JSON، يعني بلوك [[/api/]] مش شغال أو مكتوب بعد حاجة بتاخده. أو ملف JS مش موجود بيرجع HTML بـ 200، فالمتصفح يطلع [[Unexpected token '<']]. عشان كده ملفات [[/assets/]] الأحسن ترجع 404 حقيقي.`
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
          ],
          sol: R`من غير [[trust proxy]]: [[req.ip]] بيطلع [[127.0.0.1]] (أو [[::ffff:127.0.0.1]]) لكل الزوار، لأن اللي بيكلّم Express فعلًا هو Nginx. ومعاه: [[req.ip]] بيطلع IP الزائر الحقيقي من [[X-Forwarded-For]]، و [[req.protocol]] بيطلع [[https]] لو [[X-Forwarded-Proto]] بيقول كده.

جربتها بسيرفرين Express ورا Nginx: الطلب من [[127.0.0.2]] ظهر [[127.0.0.1]] في اللي من غير trust proxy، و [[127.0.0.2]] في اللي معاه.

الغلط الشائع: [[app.set('trust proxy', true)]] بدل 1، فأي زائر يقدر يبعت [[X-Forwarded-For]] مزوّر ويغيّر IP بتاعه (ويعدّي rate limit). والرقم 1 معناه «ثق في proxy واحد قدامي». ولو نسيت [[proxy_set_header Host $host]] التطبيق هيشوف Host بـ [[127.0.0.1:3000]] (جربتها) والروابط اللي بيولّدها تبوظ.`,
          solCode: R`const express = require("express");
const app = express();
app.set("trust proxy", 1);
app.get("/ip", (req, res) => res.json({ ip: req.ip, protocol: req.protocol }));
app.listen(3000);`
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
          ],
          sol: R`مع [[reload]] وسط لوب curl: كل الطلبات بترجع [[200]]. جربتها بـ 60 طلب وكلهم 200. ده لأن reload بيشغّل workers جديدة بالإعداد الجديد، والقديمة بتكمل الطلبات اللي معاها وبعدين تقفل.

مع [[restart]] (أو stop وبعدين start) هتلاقي شوية طلبات فاشلة: curl بيطبع [[000]] ([[Connection refused]]). عندي 17 من 60 فشلوا في الثانية اللي Nginx كان واقف فيها.

الغلط الشائع: [[reload]] بإعداد فيه غلطة: الـ reload بيفشل و Nginx يفضل شغال بالقديم، فتفتكر التعديل اتطبق وهو لأ. عشان كده دايمًا [[nginx -t && systemctl reload nginx]]. و [[restart]] بإعداد غلط أخطر: Nginx مايقومش خالص.`,
          solCode: R`while true; do curl -s -o /dev/null -w "%{http_code} " http://127.0.0.1/; sleep 0.1; done
# في ترمنال تاني:
sudo nginx -t && sudo systemctl reload nginx
sudo systemctl restart nginx`
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
          ],
          sol: R`الأمر المفروض يطبع [[content-encoding: gzip]] (بحروف صغيرة لو الموقع HTTP/2). ومعاه في الـ headers [[Vary: Accept-Encoding]] بسبب [[gzip_vary on]]. جربتها على ملف JS خمسة كيلو وطلع [[Content-Encoding: gzip]].

لو مطلعش حاجة، شوف ٣ أسباب: الملف أصغر من [[gzip_min_length]] (1024 بايت) فمش بيتضغط، أو نوعه مش في [[gzip_types]] (شوف [[content-type]] في نفس الرد)، أو الطلب ماكانش فيه [[Accept-Encoding: gzip]].

والغلط الشائع: الموقع ورا Cloudflare، فالرد اللي شايفه ضغطه Cloudflare بـ [[br]] أو [[zstd]] مش Nginx. واختبر على [[127.0.0.1]] على السيرفر نفسه عشان تتأكد من إعدادك انت.`
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
          ],
          sol: R`[[curl -sI .../assets/app.js | grep -iE "cache-control|expires"]] بيطبع تلات سطور: [[Expires:]] بتاريخ بعد سنة، و [[Cache-Control: max-age=31536000]] (من [[expires 1y]])، و [[Cache-Control: public, immutable]] (من [[add_header]]). جربتها وطلعت بالظبط كده.

و [[index.html]] المفروض يطلع [[Cache-Control: no-cache]]، عشان المتصفح يسأل كل مرة ويشوف أسماء الملفات الجديدة بعد كل build.

الغلط الشائع: مفيش [[Cache-Control]] خالص على JS لأن بلوك [[location /]] فيه [[add_header]] تاني، أو الطلب اتخدم من location تاني. وماتحطش [[immutable]] على ملفات أساميها ثابتة من غير hash (زي [[logo.png]])، لأن التحديث مش هيوصل للزوار لمدة سنة.`
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
          ],
          sol: R`الأمر بيطبع سطرين: [[HTTP/1.1 301 Moved Permanently]] و [[Location: https://example.com/x]]. يعني بروتوكول https، ومن غير www، ونفس المسار [[/x]]. جربتها بـ Host [[www.old.example.com]] وطلعت كده بالظبط.

لو جرّبت [[?a=1]] في الآخر، [[$request_uri]] بينقله برضه: [[Location: https://example.com/x?a=1]].

الأغلاط الشائعة: [[Location: https://example.com/]] من غير المسار: كاتب الرابط من غير [[$request_uri]]. و [[ERR_TOO_MANY_REDIRECTS]] في المتصفح: الموقع ورا Cloudflare بـ Flexible SSL فبيكلّم السيرفر http، و السيرفر يحوّله https تاني. خلّيه Full (strict). وخلّي بالك إن المتصفح بيحفظ الـ 301، فاختبر بـ curl مش بالمتصفح.`
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
          ],
          sol: R`[[curl -sI http://203.0.113.10]] بالـ IP بيطبع [[curl: (52) Empty reply from server]] ومفيش أي header. ده [[return 444]]: Nginx قفل الاتصال من غير رد. جربتها ورجع exit code 52.

وبالدومين ([[curl -sI https://example.com]] أو [[-H "Host: example.com"]]) بيرد عادي [[200]]. وعلى https بالـ IP، [[ssl_reject_handshake on]] بيخلّي curl يطلع [[SSL_ERROR_SYSCALL]] أو [[unrecognized name]] بدل ما يسرّب الشهادة وأسماء دوميناتك.

الغلط الشائع: [[nginx -t]] يطلع [[a duplicate default server for 0.0.0.0:80]]: ملف [[default]] بتاع أوبونتو لسه متفعّل وفيه default_server. امسح الـ link بتاعه. ولو الدومين نفسه بقى بيرجع 444، يبقى [[server_name]] بتاعه غلط فاتلقفه الـ default.`
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
          ],
          sol: R`[[curl -sI .../static/logo.png]] بيتخدم من [[location ^~ /static/]]: الـ headers مفيهاش [[Expires]] بتاعة الصور. عشان أشوفها بعيني حطيت [[add_header X-Loc prefix]] في بلوك static و [[X-Loc regex]] في بلوك الصور: مع [[^~]] طلع [[X-Loc: prefix]].

لما شلت [[^~]] وخليتها [[location /static/]] عادي، نفس الطلب طلع [[X-Loc: regex]]، وظهر [[Expires]] بتاع ٣٠ يوم. ده لأن Nginx بيلاقي أطول prefix، وبعدين يجرّب الـ regex بالترتيب، وأول regex يطابق بيكسب. [[^~]] بتقوله «لو الـ prefix ده هو الأطول، ماتجرّبش regex».

و [[/health]] بيرجع [[ok]] على طول من [[location =]]، وده أول حاجة بتتقارن. الغلط الشائع: تفتكر الترتيب في الملف هو اللي بيحدد؛ الترتيب مهم بين الـ regex بس.`
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
          ],
          sol: R`قبل البلوك: [[curl -sI .../downloads/nope.apk | head -3]] بيطبع [[HTTP/1.1 200 OK]] و [[Content-Type: text/html]]: الـ SPA رجّعت index.html مكان ملف مش موجود، والموبايل هينزّل صفحة HTML باسم apk.

بعد البلوك: [[HTTP/1.1 404 Not Found]]. وملف موجود فعلًا بيرجع [[200]] و [[Content-Type: application/vnd.android.package-archive]] و [[Cache-Control: no-cache, must-revalidate]]. جربت الحالتين.

الغلط الشائع: تكتب البلوك من غير [[^~]]، فبلوك regex تاني (زي بتاع الكاش لـ [[\.(js|css|...)$]]) ياخد ملفات [[.json]] اللي جوه downloads. أو تكتب [[types { ... }]] وتنسى إنها بتلغي الـ mime types الافتراضية جوه البلوك ده بس، فحط كل الأنواع اللي هتحتاجها.`
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
          ],
          sol: R`على [[/api/x]]، الـ 30 طلب بسرعة بيطلعوا 200 في الأول وبعدين [[503]]. عندي: 23 طلب 200 و 7 طلبات 503 (الـ burst 20 زائد اللي بيتسمح بيه بمعدل 10r/s في الوقت ده). و [[error.log]] فيه [[limiting requests, excess: 20.360 by zone "api"]].

على [[/api/login]]: أول 4 طلبات 200 (واحد عادي + burst 3) وبعدها [[429]] على طول: [[200 200 200 200 429 429 429 429]]، لأن المعدل 5 في الدقيقة و [[limit_req_status 429]].

الغلط الشائع: كل الطلبات 200. غالبًا الموقع ورا Cloudflare و [[$binary_remote_addr]] هو IP بتاع Cloudflare مش الزائر، أو الـ location اللي بتطلبه مش اللي فيه limit_req. والعكس: كل الزوار بيتحجبوا مع بعض لنفس السبب، لأنهم كلهم جايين من كام IP بتوع Cloudflare (درس IP الزائر ورا Cloudflare).`
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
          ],
          sol: R`[[curl -sI https://example.com]] بيوري الـ headers كلها: [[X-Content-Type-Options: nosniff]] و [[X-Frame-Options: DENY]] و [[Referrer-Policy]] و [[Permissions-Policy]] و [[Strict-Transport-Security]] و [[Content-Security-Policy]]. و [[Server: nginx]] من غير رقم النسخة بسبب [[server_tokens off]]. وبسبب [[always]] بيظهروا حتى على 404.

securityheaders.com بيدّي غالبًا [[A]] أو [[A+]]. ولو الموقع فيه سكربتات خارجية (Google Analytics مثلًا) هتلاقيها بتتمنع، وفي Console [[Refused to load the script ... Content Security Policy]]: ضيف الدومين ده في [[script-src]].

الغلط الشائع: الـ headers ظاهرة على الصفحة الرئيسية ومش ظاهرة على مسار زي [[/assets/]]. ده لأن الـ location ده فيه [[add_header]] خاص بيه (زي Cache-Control)، وأي [[add_header]] في location بيلغي كل اللي ورثه من server. حط [[include snippets/security.conf;]] جوه الـ location ده كمان.`
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
          ],
          sol: R`من غير الإعداد (الافتراضي 1m) رفع ملف ٢ ميجا بيرجع [[413 Request Entity Too Large]]، والرد جاي من Nginx مش من التطبيق. و [[error.log]] فيه:

[[client intended to send too large body: 2000000 bytes]]. جربتها بـ curl [[--data-binary]] وطلعت كده بالظبط.

بعد [[client_max_body_size 20m]] و reload، نفس الملف بيعدّي للتطبيق. الغلط الشائع: تحط الإعداد في [[server]] بس، وبلوك [[location /api/upload]] فيه قيمة أصغر فهي اللي بتكسب. وفي المتصفح الـ 413 أحيانًا بيظهر كـ CORS error، لأن رد Nginx مافيهوش headers الـ CORS بتاعة التطبيق؛ افتح Network وشوف الـ status الحقيقي.`
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

[[proxy_buffers 4 256k]]: عدد وحجم الـ buffers لجسم الرد. [[proxy_busy_buffers_size]]: الجزء اللي ممكن يكون بيتبعت للزائر وهو لسه بيتقري. وليه قاعدة: لازم يبقى أكبر من أو يساوي [[proxy_buffer_size]] وحجم buffer واحد من [[proxy_buffers]]، وأقل من مجموع [[proxy_buffers]] ناقص buffer واحد، وإلا [[nginx -t]] هيرفض.

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
          ],
          sol: R`قبل التعديل: الـ login (أو أي رد فيه cookies كبيرة) بيرجع [[502 Bad Gateway]]، و [[grep -c 'too big header']] بيطلع رقم أكبر من صفر، والسطر نفسه: [[upstream sent too big header while reading response header from upstream]]. جربتها بـ backend بيبعت [[Set-Cookie]] 6 كيلو وطلع 502 بالظبط.

بعد الإعداد و reload: نفس الطلب [[200]]، والعدّاد في اللوج مابيزيدش (الرقم القديم بيفضل زي ما هو، فقارن قبل وبعد التجربة مش صفر).

ليه incognito: عشان تبدأ من غير cookies قديمة وتشوف أول login. الغلط الشائع: تكبّر [[large_client_header_buffers]] بدل [[proxy_buffer_size]]، ودي للطلب الجاي من المتصفح مش للرد الجاي من التطبيق. ولو الـ cookie نفسها بتكبر كل مرة (session فيها داتا كتير) صلّح التطبيق كمان.`
        }
      ]
    }
  ]
});
