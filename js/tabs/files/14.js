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
          teach: R`## الملف ده بيقول لـ Nginx إيه؟

المثال ملف إعدادات لموقع واحد: الواجهة (React أو Vue بعد [[npm run build]]) ملفات ثابتة في فولدر، والـ API تطبيق Node شغال على بورت 3000. Nginx واقف قدام الاتنين: أي طلب بيوصله، يقرر يرد بملف من الفولدر ولا يبعته لـ Node.

هنمشي على الملف سطر سطر، وبعدين نشغّله بجد في Docker ونبعتله طلبات ونشوف رده.

---

## ١. الصيغة: حاجتين بس

أي سطر في ملف Nginx واحد من اتنين:

| النوع | شكله | مثال |
|---|---|---|
| directive (أمر) | اسم، وبعده قيمة أو أكتر، و [[;]] في الآخر | [[listen 80;]] |
| block (صندوق) | اسم، وبعده [[{]]، وجواه أوامر، و [[}]] تقفله | [[server { ... }]] |

والـ [[#]] أول السطر تعليق، Nginx بيتجاهله. والمسافات في أول السطر (الـ indentation) للقراية بس، Nginx مبيهتمش بيها. اللي بيهمه [[;]] و [[{ }]].

---

## ٢. [[server { ... }]]: موقع واحد

~~~text
server {
    ...
}
~~~

الـ [[server]] block يعني «موقع». ممكن يبقى عندك كذا [[server]] على نفس السيرفر (دومين لكل موقع)، و Nginx بيختار واحد منهم لكل طلب.

### [[listen 80;]]

البورت اللي الموقع ده بيستقبل عليه. ٨٠ هو بورت HTTP العادي (من غير [[s]])، يعني لما حد يكتب [[http://gym.example.com]] المتصفح بيروح للبورت ده من غير ما تكتبه. و HTTPS بورته ٤٤٣ (certbot بيضيف [[listen 443 ssl;]] لوحده).

### [[server_name gym.example.com;]]

الدومين. المتصفح بيبعت مع كل طلب header اسمه [[Host]] فيه الدومين اللي اليوزر كتبه، و Nginx بيقارنه بـ [[server_name]] عشان يعرف أنهي [[server]] يرد.

### [[root /var/www/gym/dist;]] و [[index index.html;]]

- [[root]]: الفولدر اللي فيه ملفات الموقع. طلب [[/assets/app.css]] هيدوّر على [[/var/www/gym/dist/assets/app.css]] (يعني الـ root + المسار).
- [[index]]: لو الطلب لفولدر (زي [[/]]) رجّع الملف ده جواه.

### [[client_max_body_size 10m;]]

أقصى حجم للـ body بتاع الطلب (الداتا اللي اليوزر بيبعتها، زي صورة بيرفعها). [[m]] يعني ميجابايت. الافتراضي [[1m]]، فلو حد رفع صورة ٣ ميجا من غير السطر ده، Nginx هيرد [[413 Request Entity Too Large]] قبل ما الطلب يوصل لتطبيقك أصلًا.

---

## ٣. [[location /]] و [[try_files]]: الواجهة

~~~text
location / {
    try_files $uri $uri/ /index.html;
}
~~~

[[location]] block جوه الـ [[server]]: «الطلبات اللي مسارها كذا، اعمل فيها كذا». و [[/]] هنا معناها «أي مسار بيبدأ بـ [[/]]»، يعني كل حاجة، فده الـ location اللي بيمسك أي طلب ملوش location أدق.

[[try_files]] بيجرّب بالترتيب، وأول واحد ينفع يرجّعه:

1. [[$uri]]: المسار المطلوب نفسه كملف. [[$uri]] متغير جاهز في Nginx فيه مسار الطلب (من غير [[?query]]). طلب [[/assets/app.css]] يبقى الملف [[dist/assets/app.css]].
2. [[$uri/]]: لو مش ملف، جرّبه كفولدر (وساعتها [[index]] بيشتغل).
3. [[/index.html]]: لو مفيش لا ده ولا ده، رجّع [[index.html]].

ليه الخطوة التالتة مهمة؟ في تطبيق React أو Vue، صفحة زي [[/members/5]] مش ملف حقيقي على الديسك، دي صفحة الـ router بتاع JavaScript بيرسمها. لو Nginx دوّر على ملف اسمه [[members/5]] ومالقاهوش هيرد 404. فبنقوله: «أي حاجة مش لاقيها، ادّي [[index.html]]، والـ JavaScript هيتصرف».

---

## ٤. [[location /api/]] و [[proxy_pass]]: الـ API

~~~text
location /api/ {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}
~~~

- [[location /api/]]: أي مسار بيبدأ بـ [[/api/]]. ولأنه أطول من [[/]]، Nginx بيختاره هو لطلب زي [[/api/members]] (القاعدة: أطول prefix بيطابق هو اللي بيكسب).
- [[proxy_pass http://127.0.0.1:3000;]]: متردّش انت، ابعت الطلب لتطبيق تاني ورجّع رده. ده اسمه **reverse proxy**. و [[127.0.0.1]] يعني نفس الجهاز (localhost)، و [[3000]] البورت اللي Node سامع عليه. ولاحظ إن مفيش [[/]] بعد [[3000]]: كده المسار بيروح زي ما هو ([[/api/members]] تفضل [[/api/members]]). لو كتبت [[3000/]] Nginx هيشيل [[/api/]] ويبعت [[/members]].
- [[proxy_set_header Host $host;]]: Nginx وهو بيبعت الطلب لـ Node بيعمل طلب جديد، فلازم يقوله الدومين الأصلي. [[$host]] متغير فيه الدومين اللي اليوزر طلبه.
- [[proxy_set_header X-Real-IP $remote_addr;]]: من وجهة نظر Node، كل الطلبات جاية من [[127.0.0.1]] (من Nginx). فبنبعت IP الزائر الحقيقي ([[$remote_addr]]) في header اسمه [[X-Real-IP]] عشان التطبيق يعرفه (للـ logs أو الـ rate limit).

---

## ٥. [[location ~* \.(css|js|png|jpg|svg|woff2)$]]: الكاش

~~~text
location ~* \.(css|js|png|jpg|svg|woff2)$ {
    expires 30d;
}
~~~

ده location بـ **regex** (نمط بحث). نفكه حتة حتة:

- [[~*]]: اللي بعدي regex، ومتفرّقش بين [[CSS]] و [[css]] ([[~]] لوحدها بتفرّق).
- [[\.]]: نقطة حقيقية. النقطة لوحدها في regex معناها «أي حرف»، فالـ [[\]] بتخليها نقطة عادية.
- [[(css|js|png|jpg|svg|woff2)]]: واحدة من دول. الخط الرأسي [[|]] معناه «أو».
- [[$]]: آخر المسار. يعني الامتداد لازم يبقى في الآخر، فـ [[/app.css]] تطابق و [[/app.css.bak]] لأ.

و [[expires 30d;]] بيضيف headers للرد بتقول للمتصفح «احفظ الملف ده عندك ٣٠ يوم ([[d]] = days) ومتطلبوش تاني». ولاحظ إن الـ location ده مفيهوش [[root]]، فبياخده من الـ [[server]] اللي فوقه (الـ blocks الداخلية بتورث الإعدادات).

---

## ٦. نفحصه: [[nginx -t]]

[[-t]] يعني test: اقرا الإعدادات كلها واتأكد إنها سليمة، ومتشغّلش حاجة. جربناه على Docker Desktop بالـ image [[nginx:alpine]] (nginx 1.31.6)، بعد ما حفظنا المثال في [[gym.conf]]:

~~~bash
docker run --rm -v "$PWD/gym.conf":/etc/nginx/conf.d/default.conf:ro nginx:alpine nginx -t
~~~

- [[-v ملف:مسار:ro]]: حط ملفنا جوه الـ container مكان الإعدادات الافتراضية، و [[ro]] يعني read-only.
- [[nginx -t]]: الأمر اللي هيتنفذ جوه بدل تشغيل السيرفر.

~~~text الناتج (من غير سطور docker-entrypoint)
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
~~~

لاحظ إنه بيقول [[nginx.conf]] مش [[default.conf]]: هو بيبدأ من الملف الرئيسي، واللي فيه [[include /etc/nginx/conf.d/*.conf;]] بيجيب ملفنا.

### لو شلنا [[;]] من [[listen 80]]

~~~text الناتج
nginx: [emerg] invalid parameter "server_name" in /etc/nginx/conf.d/default.conf:4
nginx: configuration file /etc/nginx/nginx.conf test failed
~~~

[[emerg]] يعني emergency (غلطة تمنع التشغيل). وبيشاور على السطر ٤ مش ٣! لأنه من غير [[;]] قرا [[listen 80 server_name gym.example.com;]] كأمر واحد، ووقع لما وصل لكلمة [[server_name]]. فالقاعدة: لو الغلط في سطر شكله سليم، بص على السطر اللي قبله.

### لو شلنا [[}]] الأخيرة

~~~text الناتج
nginx: [emerg] unexpected end of file, expecting "}" in /etc/nginx/conf.d/default.conf:19
~~~

---

## ٧. نشغّله ونبعتله طلبات

شغّلنا نفس الـ container، وعملنا جواه [[index.html]] و [[assets/app.css]]، وبعتنا طلبات بـ [[curl]] ومعاها [[-H "Host: gym.example.com"]] (بنقلّد المتصفح اللي بيبعت الدومين). ده ملخص الردود الحقيقية:

| الطلب | الرد | ليه |
|---|---|---|
| [[/]] | [[200 OK]] و [[index.html]] | [[$uri/]] فولدر، و [[index]] رجّع [[index.html]] |
| [[/members/5]] | [[200 OK]] و [[<h1>Gym</h1>]] | مفيش ملف بالاسم ده، فـ [[try_files]] رجّع [[index.html]] |
| [[/assets/app.css]] | [[200 OK]] ومعاه [[Cache-Control: max-age=2592000]] | الـ regex طابق، و ٢٥٩٢٠٠٠ ثانية = ٣٠ يوم |
| [[/api/members]] | [[502 Bad Gateway]] | مفيش تطبيق على 3000 في التجربة |

وفي الـ error log بتاع طلب الـ API:

~~~text
connect() failed (111: Connection refused) while connecting to upstream, ...
upstream: "http://127.0.0.1:3000/api/members", host: "gym.example.com"
~~~

[[upstream]] هو التطبيق اللي ورا Nginx. والسطر ده بيأكد حاجتين: المسار راح زي ما هو ([[/api/members]]) لأن [[proxy_pass]] من غير [[/]] في الآخر، و [[502]] معناه «Nginx شغال بس اللي وراه مش بيرد»، وده أول حاجة تشك فيها لما تشوف 502 على موقعك: تطبيق Node واقع.

---

## الخلاصة

| السطر | بيعمل إيه |
|---|---|
| [[listen]] و [[server_name]] | البورت والدومين: أنهي [[server]] يرد |
| [[root]] و [[index]] | فولدر الملفات والملف الافتراضي |
| [[client_max_body_size]] | أقصى حجم رفع، وإلا 413 |
| [[try_files ... /index.html]] | أي صفحة مش ملف تروح لـ [[index.html]] (تطبيقات SPA) |
| [[proxy_pass]] و [[proxy_set_header]] | ابعت [[/api/]] لـ Node ومعاه الدومين و IP الزائر |
| [[location ~*]] و [[expires]] | regex على الامتداد، وكاش ٣٠ يوم |

وقبل أي [[reload]] على سيرفر حقيقي: [[sudo nginx -t]] الأول، ولو قال [[failed]] متكمّلش.`,
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
  [[ExecStart=/usr/bin/node server.js]]: الأمر، واكتب المسار كامل: systemd بيدوّر على الاسم في PATH ثابت بتاعه ([[/usr/local/bin]] و [[/usr/bin]] وأخواتهم) مش في الـ PATH بتاعك.
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
            mistakes: R`[[ExecStart=node server.js]] من غير المسار الكامل و Node متسطّب بـ nvm (في فولدر اليوزر): systemd مش بيشوف الـ PATH بتاعك فبيقول [[Command node is not executable]]. أو تكتب [[/usr/bin/node]] والمسار الحقيقي حاجة تانية. تعدّل الملف وتنسى [[daemon-reload]] فالتعديل ميتطبقش. [[EnvironmentFile]] فيه [[export]] أو تنصيص غريب (systemd بيقرا [[KEY=value]] بس). وتشغّله كـ root.`
          },
          teach: R`## الملف ده بيقول لـ systemd إيه؟

المثال «بطاقة تعريف» لتطبيق Node اسمه [[gym-api]]: شغّله إمتى، بأنهي يوزر، من أنهي فولدر، بأنهي أمر، ولو وقع تعمل إيه. systemd (البرنامج اللي بيشغّل كل الخدمات على لينكس) بيقرا البطاقة دي وينفذها.

الملف ٣ أقسام، كل قسم اسمه بين [[[ ]]]، وتحته سطور [[Key=Value]] (مفتاح، و [[=]]، والقيمة من غير مسافات حوالين [[=]]). نفس شكل ملفات [[.ini]]. والسطر اللي بيبدأ بـ [[#]] تعليق: هنا بيقول الملف ده مكانه فين.

---

## ١. [[[Unit]]]: الملف ده عن إيه

~~~text
[Unit]
Description=Gym API (Node)
After=network.target
~~~

- [[Unit]]: أي حاجة systemd بيديرها اسمها unit (خدمة، timer، mount...). القسم ده فيه الكلام العام عن أي unit.
- [[Description=]]: وصف بيظهر في [[systemctl status]] وفي الـ logs، بدل الاسم بس.
- [[After=network.target]]: **الترتيب** وقت الـ boot: متبدأش غير بعد ما الـ unit اللي اسمها [[network.target]] تخلص. [[target]] يعني «مرحلة» في التشغيل، و [[network.target]] مرحلة «الشبكة اتظبطت». تطبيق API محتاج شبكة، فبيستناها.

> [[After]] ترتيب بس، مش «لازم». لو عايز تقول «من غير الحاجة دي متشتغلش» دي [[Requires=]] أو [[Wants=]].

---

## ٢. [[[Service]]]: يشتغل إزاي

| السطر | معناه |
|---|---|
| [[Type=simple]] | البرنامج بيفضل شغال قدام (foreground) لحد ما يقفل. ده شكل [[node server.js]] العادي، و systemd بيعتبره «اشتغل» أول ما يبدأه |
| [[User=deploy]] | شغّله بصلاحيات اليوزر [[deploy]] مش root. لو فيه ثغرة في تطبيقك، المهاجم ياخد صلاحيات [[deploy]] بس |
| [[WorkingDirectory=/srv/gym-api]] | الفولدر اللي هيتشغّل منه، يعني اللي [[server.js]] و [[./uploads]] هيتحسبوا منه |
| [[EnvironmentFile=/srv/gym-api/.env]] | اقرا متغيرات البيئة من الملف ده (سطور [[KEY=value]])، فـ [[process.env.DATABASE_URL]] يلاقي قيمته |
| [[ExecStart=/usr/bin/node server.js]] | الأمر نفسه. [[Exec]] = execute |
| [[Restart=on-failure]] | لو البرنامج خرج بغلط (exit code غير صفر أو اتقتل بـ signal) شغّله تاني |
| [[RestartSec=5]] | استنى ٥ ثواني قبل ما تعيد التشغيل، عشان لو بيقع على طول ميعملش loop بسرعة |

### ليه المسار الكامل في [[ExecStart]]؟

systemd مش بيقرا الـ [[.bashrc]] بتاعك ولا يعرف الـ PATH بتاعك. لو كتبت اسم بس ([[node]]) بيدوّر في PATH ثابت بتاعه. جربنا في Docker (أوبونتو 24.04، systemd 255) بأمر [[systemd-path search-binaries-default]] اللي بيطبع الـ PATH ده:

~~~text الناتج
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin
~~~

فلو Node متسطّب بـ nvm في [[~/.nvm/versions/node/...]] مش هيلاقيه، حتى لو [[which node]] في الترمنال بتاعك بيلاقيه. الحل: [[which node]] واكتب المسار اللي طلع.

---

## ٣. [[[Install]]]: يشتغل مع الـ boot

~~~text
[Install]
WantedBy=multi-user.target
~~~

القسم ده مبيعملش حاجة لوحده: بيستخدمه أمر [[systemctl enable]] بس. [[multi-user.target]] هي مرحلة «السيرفر قام وجاهز» (من غير واجهة رسومية). [[WantedBy=]] معناها «لما المرحلة دي تشتغل، شغّلني معاها». و [[enable]] بيعمل ده بإنه يحط symlink للملف في فولدر [[multi-user.target.wants/]].

---

## ٤. نفحص الملف: [[systemd-analyze verify]]

[[verify]] بيقرا الملف ويقولك على الغلطات من غير ما يشغّل حاجة. جربناه في container أوبونتو 24.04 (سطّبنا فيه حزمة [[systemd]] بس، والـ container مش بيشغّل systemd بجد، فالتجربة دي للفحص بس):

~~~bash
systemd-analyze verify ./gym-api.service
~~~

لما [[/usr/bin/node]] مكانش موجود:

~~~text الناتج
gym-api.service: Command /usr/bin/node is not executable: No such file or directory
~~~

ولما عملنا ملف وهمي في [[/usr/bin/node]] واليوزر [[deploy]] والفولدر: ولا كلمة، و exit code صفر. السكوت هنا معناه سليم.

وبعدين غيّرنا [[Restart=on-failure]] لـ [[Restart=sometimes]] (قيمة مش موجودة):

~~~text الناتج
/tmp/bad.service:12: Failed to parse service restart specifier, ignoring: sometimes
~~~

[[:12]] رقم السطر، و [[ignoring]] أخطر كلمة: systemd مش بيرفض الملف، بيتجاهل السطر ويكمّل، و exit code طلع صفر برضه. يعني الخدمة هتشتغل من غير restart وانت مش واخد بالك. اقرا ناتج [[verify]] حتى لو الأمر «نجح».

وجربنا كمان [[ExecStart=node server.js]] (من غير مسار) و Node في فولدر nvm وموجود في الـ PATH بتاع الترمنال:

~~~text الناتج
rel.service: Command node is not executable: No such file or directory
~~~

---

## ٥. الأوامر بعد ما تكتب الملف

دول محتاجين سيرفر شغال بـ systemd فعلًا (VPS أو جهاز أوبونتو)، فالكلام هنا من الـ docs بتاعة systemd مش من تجربة:

~~~bash
sudo systemctl daemon-reload
sudo systemctl enable --now gym-api
systemctl status gym-api
journalctl -u gym-api -f
~~~

| الأمر | بيعمل إيه |
|---|---|
| [[daemon-reload]] | systemd يقرا الـ unit files من تاني. لازم بعد أي تعديل، وإلا بيفضل شغال بالنسخة القديمة |
| [[enable --now gym-api]] | [[enable]] يربطه بالـ boot، و [[--now]] يشغّله دلوقتي كمان. والاسم من غير [[.service]] |
| [[status]] | شغال ([[active (running)]]) ولا لأ، والـ PID، وآخر سطور الـ log |
| [[journalctl -u gym-api -f]] | الـ logs. [[-u]] = unit، و [[-f]] = follow: كمّل اطبع وهي بتتكتب (زي [[tail -f]]) |

---

## الخلاصة

- القسم [[[Unit]]] وصف وترتيب، و [[[Service]]] إزاي يشتغل، و [[[Install]]] يشتغل مع الـ boot.
- [[ExecStart]] بمسار كامل من [[which node]].
- [[Restart=on-failure]] و [[RestartSec]] هما اللي بيقوّموه لو وقع.
- بعد أي تعديل: [[daemon-reload]]، وافحص بـ [[systemd-analyze verify]] واقرا كل سطر حتى لو مفيش error.`,
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
          teach: R`## كل سطر = «إمتى» + «إيه»

الـ crontab ملف نصي، وكل سطر فيه مهمة: أول ٥ خانات مفصولين بمسافة هما **الميعاد**، وكل اللي بعدهم هو **الأمر** اللي هيتنفذ. والـ cron daemon (برنامج شغال في الخلفية على طول) بيصحى كل دقيقة ويسأل نفسه لكل سطر: «الدقيقة دي بتطابق الخمس خانات؟» لو آه بينفذ الأمر.

---

## ١. السطر الأول: التعليق اللي بيفكّرك بالترتيب

~~~text
# m h dom mon dow command
~~~

[[#]] تعليق، و cron بيتجاهله. بس الاختصارات دي هي ترتيب الخانات اللي لازم تحفظه:

| الخانة | الاختصار | المدى |
|---|---|---|
| ١ | [[m]] = minute (الدقيقة) | 0 لـ 59 |
| ٢ | [[h]] = hour (الساعة، بنظام ٢٤) | 0 لـ 23 |
| ٣ | [[dom]] = day of month (اليوم في الشهر) | 1 لـ 31 |
| ٤ | [[mon]] = month (الشهر) | 1 لـ 12 |
| ٥ | [[dow]] = day of week (اليوم في الأسبوع) | 0 لـ 7، و 0 و 7 الاتنين يعني الحد، و 1 الاتنين |

والرموز اللي بتتكتب في أي خانة:

| الرمز | معناه | مثال في خانة الدقيقة |
|---|---|---|
| [[*]] | أي قيمة | كل دقيقة |
| [[*/5]] | كل ٥ (الـ [[/]] معناها «خطوة») | 0 و 5 و 10 ... 55 |
| [[1-5]] | من لـ | الدقايق 1 و 2 و 3 و 4 و 5 |
| [[1,15]] | القيم دي بس | الدقيقة 1 والدقيقة 15 |

---

## ٢. [[*/5 * * * * curl -fsS https://gym.example.com/health > /dev/null]]

**الميعاد:** [[*/5]] في الدقايق، والباقي [[*]]: كل ٥ دقايق، طول اليوم، كل يوم.

**الأمر:**
- [[curl]]: يبعت طلب HTTP للرابط.
- [[-f]] (fail): لو السيرفر رد بغلط (زي 500) اخرج بكود فشل بدل ما تطبع صفحة الغلط وتعتبره نجاح.
- [[-s]] (silent): من غير شريط التقدم.
- [[-S]] (show error): مع [[-s]]، لو فيه غلط اطبعه برضه. فـ [[-fsS]] = «اسكت لو تمام، واتكلم لو فيه مشكلة».
- [[> /dev/null]]: ارمي الناتج العادي. [[/dev/null]] ملف خاص في لينكس أي حاجة تتكتب فيه بتختفي.

الفكرة: health check. الناتج العادي بيترمي، والأخطاء بس هي اللي بتطلع.

---

## ٣. [[0 3 * * * /srv/gym-api/backup.sh >> /var/log/gym-backup.log 2>&1]]

**الميعاد:** الدقيقة [[0]]، الساعة [[3]]، وأي يوم: كل يوم الساعة ٣:٠٠ بالظبط. (لو كتبت [[* 3 * * *]] هيشتغل كل دقيقة من ٣:٠٠ لـ ٣:٥٩، يعني ٦٠ مرة.)

**الأمر:**
- [[/srv/gym-api/backup.sh]]: سكربت بمسار كامل.
- [[>>]]: ضيف الناتج في آخر الملف (و [[>]] واحدة كانت هتمسح القديم كل مرة).
- [[2>&1]]: [[2]] هو stderr (رسايل الغلط)، و [[1]] هو stdout (الناتج العادي)، و [[&1]] معناها «نفس مكان 1». يعني ابعت الأخطاء لنفس ملف الـ log. من غيرها، رسايل الغلط بتروح mail وغالبًا بتضيع.

---

## ٤. [[30 9 * * 1-5 /usr/bin/node /srv/gym-api/send-reminders.js]]

**الميعاد:** الدقيقة 30، الساعة 9، ويوم الأسبوع [[1-5]] (الاتنين لحد الجمعة): ٩:٣٠ الصبح أيام الشغل.

**الأمر:** [[/usr/bin/node]] بمسار كامل، مش [[node]] بس. ليه؟ شوف الخطوة ٦.

---

## ٥. [[@reboot /srv/gym-api/start.sh]]

بدل الخمس خانات، اختصار: [[@reboot]] = مرة واحدة لما الـ cron يقوم مع تشغيل الجهاز. وفيه كمان [[@hourly]] (= [[0 * * * *]]) و [[@daily]] (= [[0 0 * * *]]) و [[@weekly]].

---

## ٦. جربناه بجد

كل ده اتشغّل في [[docker run --rm ubuntu:24.04]] بعد [[apt-get install cron]].

### [[crontab -l]] و [[crontab ملف]]

~~~bash
crontab -l
crontab crontab.txt
crontab -l
~~~

~~~text الناتج
no crontab for root
~~~

[[-l]] = list. أول مرة مفيش crontab (اليوزر هنا root لأننا في container). و [[crontab crontab.txt]] بيركّب الملف ده كـ crontab بتاعك (ده نفس اللي [[crontab -e]] بيعمله لما تحفظ وتقفل المحرر)، وبعدها [[-l]] طبع السطور الخمسة زي ما هي.

### crontab بيرفض الغلط

~~~text الناتج (سطر فيه ٤ خانات بس: * 3 * * /bin/true)
"/tmp/bad":0: bad day-of-week
errors in crontab file, can't install.
~~~

قرا [[/bin/true]] كأنه الخانة الخامسة (يوم الأسبوع)، فرفض. وسطر فيه [[60]] في الدقايق:

~~~text الناتج
"/tmp/bad2":0: bad minute
errors in crontab file, can't install.
~~~

### المهام اشتغلت فعلًا

حطينا [[* * * * * date >> /tmp/cron-test.log]] وشغّلنا [[cron]] واستنينا دقيقتين:

~~~text الناتج
Wed Oct  7 11:54:01 UTC 2026
Wed Oct  7 11:55:01 UTC 2026
~~~

سطر كل دقيقة، في الثانية 01 تقريبًا. ولاحظ [[UTC]]: الوقت بتوقيت السيرفر مش القاهرة.

### البيئة الفقيرة

سطر بيطبع متغيرات البيئة اللي cron بيشغّل بيها الأوامر:

~~~text الناتج
env PATH=/usr/bin:/bin SHELL=/bin/sh HOME=/root
~~~

الـ PATH فيه فولدرين بس، والـ shell هو [[/bin/sh]] مش bash. يعني [[node]] المتسطّب بـ nvm أو في [[/usr/local/bin]] مش هيتلاقي، وعشان كده المسارات الكاملة في المثال.

### الـ [[%]]

جربنا سطرين:

~~~text
* * * * * date +%F > /tmp/pct.log 2>&1
* * * * * date +\%F > /tmp/pct2.log
~~~

التاني كتب [[2026-10-07]]. الأول **مكتبش الملف خالص**: في crontab الـ [[%]] معناها «سطر جديد، واللي بعدي يروح للأمر كـ input»، فالأمر اللي اتنفذ كان [[date +]] بس، والتوجيه للملف ضاع. عشان كده [[\%]].

---

## الخلاصة

| الميعاد | معناه |
|---|---|
| [[*/5 * * * *]] | كل ٥ دقايق |
| [[0 3 * * *]] | كل يوم ٣:٠٠ |
| [[30 9 * * 1-5]] | ٩:٣٠ أيام الشغل |
| [[@reboot]] | مرة مع تشغيل الجهاز |

وأربع قواعد: مسارات كاملة، و [[>> log 2>&1]] عشان تشوف الأخطاء، و [[\%]] بدل [[%]]، والوقت UTC.`,
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
          teach: R`## المثال: CHANGELOG مكتوب Markdown

المثال ملف [[CHANGELOG.md]] بالشكل المشهور اسمه Keep a Changelog: كل نسخة نزلت ليها عنوان، وتحتها التغييرات متقسمة أنواع. هو Markdown عادي (درس [[.md]])، فـ GitHub بيعرضه بعناوين ونقط. هنفكه سطر سطر، وبعدين نشوف README و LICENSE بيتكتبوا إزاي.

---

## ١. العناوين: [[#]] و [[##]] و [[###]]

في Markdown عدد الـ [[#]] أول السطر هو مستوى العنوان:

~~~text
# Changelog              ← عنوان كبير للملف كله (مرة واحدة)
## [Unreleased]          ← عنوان نسخة
### Added                ← نوع التغيير جوه النسخة
~~~

فالملف شجرة: الملف، جواه نسخ، وجوه كل نسخة أنواع، وجوه كل نوع نقط.

---

## ٢. [[## [Unreleased]]]

قسم فوق خالص للتغييرات اللي اتعملت ولسه منزلتش في نسخة. كل ما تعمل حاجة تضيفها هنا. ولما تنزّل نسخة جديدة، بتغيّر العنوان ده لرقم النسخة والتاريخ، وتعمل [[## [Unreleased]]] فاضي جديد فوقه.

والأقواس المربعة [[[ ]]] جزء من الشكل المتفق عليه: في الآخر الملف ممكن يبقى فيه روابط بنفس الاسم ([[[1.4.0]: https://...]]) تخلي العنوان لينك لمقارنة الكود على GitHub.

### [[- حجز المواعيد من الموبايل]]

[[-]] ومسافة أول السطر = نقطة في ليستة. والنقطة مكتوبة بلغة المستخدم («إيه اللي اتغير بالنسبة لك») مش لغة الكود («refactor BookingService»).

---

## ٣. [[## [1.4.0] - 2026-09-20]]

- [[1.4.0]]: رقم النسخة بنظام SemVer (Semantic Versioning): [[MAJOR.MINOR.PATCH]].

| الرقم | بيزيد لما | مثال |
|---|---|---|
| MAJOR (الأول) | تغيير بيكسر حاجة عند اللي بيستخدمك | 1.4.0 ← 2.0.0 |
| MINOR (التاني) | ميزة جديدة من غير ما تكسر حاجة | 1.3.0 ← 1.4.0 |
| PATCH (التالت) | إصلاح bug بس | 1.4.0 ← 1.4.1 |

- [[2026-09-20]]: التاريخ بصيغة ISO (سنة-شهر-يوم)، عشان ميبقاش فيه لخبطة بين 09/10 و 10/09.

---

## ٤. الأنواع: [[Added]] و [[Fixed]] و [[Changed]]

| العنوان | بيتكتب تحته |
|---|---|
| [[Added]] | ميزة جديدة («دفع أونلاين بالكارت») |
| [[Changed]] | حاجة موجودة اتغيّر سلوكها («الحد الأدنى لـ Node بقى 20») |
| [[Deprecated]] | حاجة لسه شغالة بس هتتشال قريب |
| [[Removed]] | حاجة اتشالت |
| [[Fixed]] | bug اتصلح («العربي في الفواتير كان بيظهر ؟؟؟») |
| [[Security]] | ثغرة اتقفلت |

لاحظ إن «الحد الأدنى لـ Node بقى 20» تحت [[Changed]]: ده تغيير ممكن يكسر حاجة عند حد شغال على Node 18، فالمفروض كمان يخلي النسخة MAJOR. CHANGELOG الكويس بيخلي اللي بيحدّث يعرف يقرا قسم [[Changed]] و [[Removed]] ويعرف هيتعب ولا لأ.

---

## ٥. README: بيتكتب إزاي

مفيش شكل إجباري، بس README كويس بيجاوب ٤ أسئلة بالترتيب:

| القسم | فيه إيه |
|---|---|
| العنوان وسطرين | المشروع ده إيه وبيحل إيه |
| صورة أو رابط | screenshot أو الموقع الشغال |
| التشغيل | الأوامر بالظبط: [[git clone]] و [[npm install]] و [[cp .env.example .env]] و [[npm run dev]]، في صندوق كود |
| الإعدادات | كل متغير بيئة محتاجه، ومعناه |

والاختبار: اعمل clone في فولدر نضيف ونفّذ الأوامر حرفيًا. أي خطوة احتجتها ومش مكتوبة، ضيفها.

---

## ٦. LICENSE

ملف نص فيه الرخصة كاملة، بالحرف زي ما هي (متعدّلش فيها غير السنة والاسم). مثلًا أول MIT:

~~~text
MIT License

Copyright (c) 2026 Ali

Permission is hereby granted, free of charge, to any person obtaining a copy ...
~~~

GitHub بيقارن النص ده بالرخص المعروفة ويكتب اسمها على جنب ([[MIT license]])، ولو عدّلت في النص ممكن ميعرفوش (الكلام ده من docs بتاعة GitHub). ومن غير LICENSE خالص، الكود بتاعك «كل الحقوق محفوظة» حتى لو الـ repo public.

---

## الخلاصة

| الملف | لمين | أهم حاجة فيه |
|---|---|---|
| [[README.md]] | أي حد فتح الـ repo | يشغّل المشروع من غير ما يسألك |
| [[LICENSE]] | أي حد عايز يستخدم الكود | نص الرخصة كامل من غير تعديل |
| [[CHANGELOG.md]] | اللي بيستخدم مشروعك ويحدّثه | نسخة بتاريخ، وتحتها Added و Changed و Fixed |`,
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
    }
]);
