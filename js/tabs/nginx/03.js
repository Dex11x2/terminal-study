// تكملة تاب nginx: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/nginx/01.js (شرح حقول الدرس في أوله)
MORE("nginx", [
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
          teach: R`## الفكرة: طلب HTTP بيطلب «يترقّى»

الـ WebSocket مش بروتوكول بيبدأ لوحده. المتصفح بيبعت طلب [[GET]] عادي جدًا، بس فيه اتنين headers زيادة بيقولوا للسيرفر «حوّل الاتصال ده لقناة مفتوحة في الاتجاهين». السيرفر لو وافق بيرد [[101 Switching Protocols]]، ومن اللحظة دي نفس الاتصال (TCP) بيفضل مفتوح وأي طرف يبعت في أي وقت.

المشكلة إن Nginx في النص، وافتراضيًا بيشيل الـ headers دي ومش بيعدّيها للتطبيق. الإعداد ده كله وظيفته يعدّيها، ويسيب الاتصال مفتوح.

### إزاي اتجرّب

Nginx رسمي ([[nginx:alpine]]، نسخة 1.31) جوه Docker، والإعداد في [[conf.d/default.conf]]، وورا منه تطبيق [[traefik/whoami]] (تطبيق صغير بيطبع الـ headers اللي وصلته، وعنده مسار [[/echo]] بيرد WebSocket). الاتنين على شبكة Docker واحدة، فبدل [[127.0.0.1:3000]] كتبت اسم الـ container. والطلبات بـ [[curl]] من جوه الـ container.

---

## ١. الـ [[map]]: متغير بيتحسب من متغير

~~~text nginx.conf (جوه http)
map $http_upgrade $connection_upgrade {
    default upgrade;
    ''      close;
}
~~~

### [[$http_upgrade]]

أي header في الطلب Nginx بيحطه في متغير اسمه [[$http_]] + اسم الـ header بحروف صغيرة والشرطة [[-]] بتبقى [[_]]. يعني header [[Upgrade: websocket]] قيمته في [[$http_upgrade]] = [[websocket]]. ولو الطلب مفيهوش الـ header ده، المتغير فاضي.

### [[map]] بيعمل إيه

[[map A B { ... }]] معناها: «اعمل متغير جديد اسمه B، قيمته بتتحدد من قيمة A». جوه الأقواس جدول: قيمة A على الشمال، وقيمة B على اليمين:

| [[$http_upgrade]] | [[$connection_upgrade]] | يعني |
|---|---|---|
| [['']] (فاضي) | [[close]] | طلب HTTP عادي |
| أي حاجة تانية ([[default]]) | [[upgrade]] | طلب عايز يترقّى |

[[default]] معناها «أي قيمة مش مكتوبة في الجدول». و [['']] هي النص الفاضي. وكل سطر بيخلص بـ [[;]] زي أي directive في Nginx.

> الـ [[map]] لازم تتكتب في [[http {}]] مش جوه [[server]]. ملفات [[conf.d/*.conf]] بتتقرا جوه [[http]] أصلًا، فحطها في أول الملف فوق الـ server.

ليه محتاجينها؟ عشان نفس الـ location يخدم الاتنين صح: الطلب العادي ياخد [[Connection: close]]، وطلب الـ WebSocket ياخد [[Connection: upgrade]]. جربت ده بمسار بيعرض الـ headers اللي وصلت التطبيق:

~~~text طلب عادي من غير Upgrade
GET / HTTP/1.1
Host: 127.0.0.1
Connection: close
~~~

~~~text طلب فيه Upgrade: foo
GET / HTTP/1.1
Host: 127.0.0.1
Connection: upgrade
Upgrade: foo
~~~

---

## ٢. الـ location

~~~text nginx.conf
server {
    location /socket.io/ {
        proxy_pass http://127.0.0.1:3000;
~~~

[[location /socket.io/]]: أي طلب بيبدأ بالمسار ده (ده المسار اللي Socket.io بيستخدمه افتراضيًا). و [[proxy_pass]] ابعته للتطبيق على بورت 3000.

### [[proxy_http_version 1.1;]]

Nginx افتراضيًا بيكلّم التطبيق بـ HTTP/1.0، والترقية ([[Upgrade]]) مش موجودة في 1.0 أصلًا. السطر ده بيخليه يكلّمه بـ 1.1.

### [[proxy_set_header Upgrade $http_upgrade;]]

[[proxy_set_header]] معناها «ابعت للتطبيق header بالاسم ده والقيمة دي». هنا بنرجّع header [[Upgrade]] اللي الزائر بعته زي ما هو. ليه لازم نرجّعه بإيدينا؟ لأن [[Upgrade]] و [[Connection]] نوعهم **hop-by-hop**: يعني بيخصّوا الاتصال الواحد (المتصفح مع Nginx) بس، فـ Nginx مش بيعدّيهم للاتصال التاني (Nginx مع التطبيق) إلا لو قلتله.

### [[proxy_set_header Connection $connection_upgrade;]]

و [[Connection]] قيمته من الـ [[map]] اللي فوق: [[upgrade]] أو [[close]].

### [[proxy_set_header Host $host;]]

اسم الدومين اللي الزائر طلبه، عشان التطبيق يعرفه (من غيره هيوصله [[127.0.0.1:3000]]).

### النتيجة

طلب WebSocket على المسار ده (curl بالـ headers اللي المتصفح بيبعتها):

~~~bash
curl -si -H "Connection: Upgrade" -H "Upgrade: websocket" \
  -H "Sec-WebSocket-Version: 13" -H "Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==" \
  http://127.0.0.1/socket.io/
~~~

~~~text الناتج
HTTP/1.1 101 Switching Protocols
Server: nginx/1.31.6
Connection: upgrade
Upgrade: websocket
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
~~~

[[101]] يعني الترقية نجحت. و [[Sec-WebSocket-Key]] رقم عشوائي المتصفح بيبعته، والسيرفر بيرد بـ [[Sec-WebSocket-Accept]] محسوب منه، عشان يثبت إنه فاهم WebSocket فعلًا.

ونفس الطلب على location فيه [[proxy_pass]] بس من غير السطور التلاتة:

~~~text الناتج
HTTP/1.1 400 Bad Request
~~~

التطبيق ماشافش [[Upgrade]]، فرفض.

---

## ٣. [[proxy_read_timeout 3600s;]]

Nginx بيقفل الاتصال بالتطبيق لو فضل ساكت (مفيش ولا byte جاي منه) أكتر من [[proxy_read_timeout]]، والافتراضي [[60s]]. ده مناسب لطلب HTTP، لكن WebSocket ممكن يفضل ساكت دقايق مستني رسالة. [[3600s]] = ساعة.

جربت نفس الإعداد بـ [[proxy_read_timeout 3s]] عشان أشوف الأثر: الاتصال فتح بـ 101، ومفيش رسايل، فاتقفل بعد [[3.00s]] بالظبط. يعني بالافتراضي الاتصال بيقع كل ٦٠ ثانية، والعميل يعيد الاتصال.

> Socket.io بيبعت ping كل ٢٥ ثانية ([[pingInterval: 25000]])، فالاتصال عمره ما بيسكت ٦٠ ثانية، بس WebSocket تاني من غير ping هيقع. ارفعه وخلاص.

---

## ٤. اختبار من برة: [[wscat]]

~~~bash
npx wscat -c "wss://example.com/socket.io/?EIO=4&transport=websocket"
~~~

| الحتة | معناها |
|---|---|
| [[npx wscat]] | شغّل أداة [[wscat]] من npm من غير ما تسطّبها |
| [[-c]] | connect: افتح اتصال للعنوان ده |
| [[wss://]] | WebSocket على TLS (زي https). و [[ws://]] من غير تشفير |
| [[EIO=4]] | نسخة بروتوكول Engine.IO اللي تحت Socket.io |
| [[transport=websocket]] | ادخل WebSocket على طول من غير polling الأول |

وفي المتصفح: DevTools ثم Network ثم فلتر [[WS]]، وهتلاقي الطلب بـ status [[101]].

---

## الخلاصة

| السطر | ليه |
|---|---|
| [[map $http_upgrade $connection_upgrade]] | نفس الـ location يخدم HTTP عادي و WebSocket |
| [[proxy_http_version 1.1]] | الترقية مش موجودة في 1.0 |
| [[Upgrade]] و [[Connection]] | hop-by-hop، فلازم ترجّعهم بإيدك |
| [[proxy_read_timeout 3600s]] | الافتراضي ٦٠ ثانية بيقطع الاتصال الساكت |

400 أو 426 = الـ headers مش واصلة. اتصال بيقع كل دقيقة بالظبط = الـ timeout.`,
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
          ],
          sol: R`[[npx wscat -c "wss://example.com/socket.io/?EIO=4&transport=websocket"]] المفروض يطبع [[Connected (press CTRL+C to quit)]] وبعدها رسالة من Socket.io بتبدأ بـ [[0]] زي [[< 0{"sid":"...","upgrades":[],"pingInterval":25000,...}]]. ولو كتبت [[40]] بيرد [[40{"sid":...}]] (اتصال بالـ namespace الرئيسي)، وكل شوية هتلاقي [[< 2]] (ping).

جربت نفس الإعداد بسيرفر [[ws]] عادي ورا Nginx: مع الـ headers الاتصال فتح ورد عليا، ومن غيرهم السيرفر رد [[426]] لأن [[Upgrade]] ماوصلوش.

الأغلاط الشائعة: [[error: Unexpected server response: 400]] أو [[426]] أو [[502]]: [[Upgrade]] و [[Connection]] مش متبعتين، أو نسيت [[proxy_http_version 1.1]]. والاتصال بيفتح ويقفل بعد ٦٠ ثانية بالظبط: [[proxy_read_timeout]] لسه الافتراضي.`
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
          teach: R`## الفكرة: نسختين شغالين، و Nginx بيختار

بدل ما توقف النسخة القديمة وتشغّل الجديدة (وبينهم ثواني الموقع فيها 502)، بتشغّل الجديدة **جنب** القديمة على بورت تاني، تتأكد إنها شغالة، وبعدين تقول لـ Nginx «من دلوقتي ابعت للجديدة». الاسمين blue و green مجرد أسامي للنسختين: blue الحالية و green الجديدة، والمرة الجاية بيتبدلوا.

المثال جزئين: ملف [[upstream]] بتاع Nginx، وكام سطر من سكربت الـ deploy.

### إزاي اتجرّب

Nginx رسمي ([[nginx:alpine]]) جوه Docker، والملف ده في [[conf.d/upstream.conf]]. والنسختين container من [[traefik/whoami]] (تطبيق بيرد باسمه) واحد على 3000 اسمه blue والتاني على 3001 اسمه green، شغالين على نفس الـ network namespace بتاع Nginx عشان [[127.0.0.1:3000]] يبقى صح زي السيرفر الحقيقي. والـ reload بـ [[nginx -s reload]] بدل [[systemctl]] لأن مفيش systemd جوه الـ container.

---

## ١. الـ [[upstream]]

~~~text upstream.conf
upstream app {
    server 127.0.0.1:3000 max_fails=3 fail_timeout=10s;
    server 127.0.0.1:3001 backup;
}
~~~

[[upstream app { }]]: مجموعة سيرفرات ليها اسم [[app]]. وفي بلوك الموقع بتكتب [[proxy_pass http://app;]] بدل عنوان واحد، و Nginx يختار من المجموعة. (الـ server بتاع الموقع عندي كان [[location / { proxy_pass http://app; }]].)

### السطر الأول: blue

| الحتة | معناها |
|---|---|
| [[server 127.0.0.1:3000]] | النسخة الحالية |
| [[max_fails=3]] | لو فشل ٣ مرات... |
| [[fail_timeout=10s]] | ...جوه ١٠ ثواني، اعتبره واقع لمدة ١٠ ثواني ومتبعتلوش |

«فشل» هنا يعني Nginx ماقدرش يتصل بيه أو ماردش (مش إن التطبيق رجّع 500).

### السطر التاني: [[backup]]

السيرفر ده مبيستقبلش أي طلب طول ما الأساسي شغال. بيشتغل بس لو كل السيرفرات العادية اعتُبرت واقعة. يعني green واقف على الدكة.

---

## ٢. [[docker compose up -d app_green]]

شغّل خدمة اسمها [[app_green]] من ملف compose بتاعك (النسخة الجديدة، معمولة على بورت 3001) في الخلفية ([[-d]] = detached). blue لسه شغال ومحدش لمسه، فالزوار مش حاسين بحاجة.

---

## ٣. [[sleep 5 && curl -fsS http://127.0.0.1:3001/health]]

| الحتة | معناها |
|---|---|
| [[sleep 5]] | استنى ٥ ثواني التطبيق يقوم |
| [[&&]] | نفّذ اللي بعده بس لو اللي قبله نجح |
| [[curl]] | اطلب الصفحة |
| [[-f]] | fail: لو الرد 400 أو أكتر، اعتبره فشل (exit code مش صفر) |
| [[-s]] | silent: من غير شريط التقدم |
| [[-S]] | بس لو فيه خطأ اطبعه (مع [[-s]] من غيرها الخطأ بيستخبى) |
| [[/health]] | مسار في تطبيقك بيرد 200 لو كله تمام |

الطلب **مباشر على 3001**، مش من خلال Nginx، عشان تختبر النسخة الجديدة هي بالذات. جربته قبل ما green يقوم:

~~~text الناتج
curl: (7) Failed to connect to 127.0.0.1:3001 after 0 ms: Could not connect to server
exit=7
~~~

[[7]] كود curl لـ «مقدرتش أتصل». وبعد ما قام: مفيش ناتج خالص و [[exit=0]] (الـ health بتاع whoami بيرد 200 من غير محتوى). في سكربت فيه [[set -e]]، الـ exit code اللي مش صفر بيوقف السكربت هنا قبل ما يبدّل.

---

## ٤. الـ [[sed]] اللي بيبدّل الأدوار

~~~bash
sudo sed -i 's/127.0.0.1:3000 max_fails/127.0.0.1:3001 max_fails/; s/127.0.0.1:3001 backup/127.0.0.1:3000 backup/' /etc/nginx/conf.d/upstream.conf
~~~

### [[sed -i]]

[[sed]] (stream editor) بيعدّل نص سطر سطر. [[-i]] (in-place) يعني اكتب التعديل في نفس الملف بدل ما تطبعه على الشاشة. و [[sudo]] لأن ملفات [[/etc/nginx]] ملك root.

### [[s/قديم/جديد/]]

[[s]] = substitute: دوّر على النص الأول وحط مكانه التاني. والسكربت فيه أمرين مفصولين بـ [[;]]:

| الأمر | قبل | بعد |
|---|---|---|
| الأول | [[127.0.0.1:3000 max_fails]] | [[127.0.0.1:3001 max_fails]] |
| التاني | [[127.0.0.1:3001 backup]] | [[127.0.0.1:3000 backup]] |

ليه النص فيه [[max_fails]] و [[backup]] مش الرقم بس؟ عشان كل أمر يمسك سطر واحد بالظبط. لو كتبت [[s/3000/3001/]] بس، والأمر التاني [[s/3001/3000/]]، التاني هيرجّع اللي الأول لسه مغيّره. (والنقطة في [[127.0.0.1]] معناها «أي حرف» في sed، بس هنا مش فارقة.)

بعد التبديل:

~~~text grep server upstream.conf
    server 127.0.0.1:3001 max_fails=3 fail_timeout=10s;
    server 127.0.0.1:3000 backup;
~~~

green بقى الأساسي، و blue بقى الاحتياطي.

---

## ٥. [[sudo nginx -t && sudo systemctl reload nginx]]

[[nginx -t]] بيختبر الإعداد كله من غير ما يطبقه، و [[&&]] بيمنع الـ reload لو الاختبار فشل:

~~~text الناتج
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
~~~

و [[reload]] مش restart: Nginx بيشغّل workers جديدة بالإعداد الجديد، والقديمة بتكمّل الطلبات اللي في إيدها وبعدين تقفل. فمفيش طلب بيتقطع.

### الإثبات

شغّلت لوب بيعمل ٦٠ طلب ورا بعض على Nginx (كل ٥٠ مللي ثانية) وفي النص عملت الـ sed والـ reload:

~~~text الناتج (عدد كل status)
     60 200
~~~

صفر 502. وبعدها الرد بقى [[Name: green]] بدل [[Name: blue]].

### والـ [[backup]] بيشتغل فعلًا

بعد التبديل وقّفت green (اللي بقى الأساسي) من غير ما ألمس Nginx. الـ ٥ طلبات اللي بعدها كلهم [[200]] و [[Name: blue]]، و [[error.log]] فيه:

~~~text error.log
connect() failed (111: Connection refused) while connecting to upstream, ... upstream: "http://127.0.0.1:3001/"
upstream server temporarily disabled while connecting to upstream, ... upstream: "http://127.0.0.1:3001/"
~~~

[[111: Connection refused]]: محدش بيسمع على البورت. و [[temporarily disabled]]: ده [[fail_timeout]] بيشتغل، و Nginx راح للـ backup.

---

## ٦. الـ rollback

نفس الـ sed بالعكس (بدّل 3000 و 3001 في الأمرين)، و [[nginx -t]] و reload. ثانية واحدة، طالما blue لسه شغال (متوقفوش غير لما تتأكد إن green تمام).

---

## الخلاصة

| الخطوة | الأمر | لو فشلت |
|---|---|---|
| شغّل الجديدة جنب القديمة | [[compose up -d app_green]] | الزوار لسه على blue |
| اتأكد إنها بترد | [[curl -fsS .../health]] | السكربت يقف قبل التبديل |
| بدّل الأدوار | [[sed -i 's/.../; s/.../']] | [[grep]] بعدها يتأكد |
| طبّق | [[nginx -t && reload]] | الإعداد القديم فاضل شغال |

[[sed]] لو مالقاش النص (مسافة زيادة مثلًا) مش بيقول حاجة ومش بيغيّر حاجة، فاتأكد بـ [[grep]]. وقاعدة البيانات مشتركة بين النسختين، فالـ migration لازم تشتغل مع الاتنين.`,
          lines: [
            "المجموعة.",
            "blue: الحالي، ويتعتبر واقع بعد ٣ فشل في ١٠ ثواني.",
            "green: احتياطي بيستقبل بس لو blue وقع.",
            "قفلة.",
            "شغّل النسخة الجديدة على green.",
            "استنى واتأكد إنها بترد مباشرة.",
            "بدّل الأدوار في ملف upstream.",
            "اختبر وطبّق: التبديل لحظي."
          ],
          sol: R`اللوب المفروض يطبع [[200 200 200 ...]] طول وقت التبديل من غير ولا [[502]]. ده لأن [[sleep 5 && curl -fsS .../health]] اتأكد إن النسخة الجديدة شغالة قبل ما تبدّل، و [[reload]] مش بيقطع الطلبات الشغالة.

وبعد التبديل [[grep server /etc/nginx/conf.d/upstream.conf]] بيوري [[127.0.0.1:3001 max_fails=3 fail_timeout=10s]] و [[127.0.0.1:3000 backup]]: القديمة بقت احتياطي، وتقدر ترجعلها بنفس الـ sed بالعكس.

لو ظهرت 502: غالبًا النسخة الجديدة لسه بتقوم والـ health كان بيرد قبل ما كل حاجة تجهز، أو وقّفت القديمة قبل الـ reload. والغلط الشائع: الـ sed مش لاقي النص بالظبط (مسافة زيادة مثلًا) فمابيغيّرش حاجة ومابيطلعش error؛ اتأكد بـ [[grep]] بعده.`
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
          teach: R`## الفكرة: Nginx بيسأل عن باسورد قبل أي حاجة

سطرين بس في الـ server ([[auth_basic]] و [[auth_basic_user_file]]) بيخلّوا أي طلب من غير يوزر وباسورد صح يترد بـ 401، والمتصفح يفتح نافذة تسجيل دخول. والباسوردات في ملف بتعمله بأداة [[htpasswd]]. والمثال جزئين: أمرين في الترمنال، وبلوك Nginx.

### إزاي اتجرّب

كونتينر [[ubuntu:24.04]] فيه [[nginx]] (1.24 من apt) و [[apache2-utils]]، والإعداد في [[sites-enabled]]، وورا منه تطبيق [[traefik/whoami]] على بورت 3000 (بيطبع الـ headers اللي وصلته). والطلبات بـ curl من جوه الكونتينر بـ [[-H "Host: staging.example.com"]] عشان أكلّم البلوك ده من غير DNS.

---

## ١. [[sudo apt install -y apache2-utils]]

[[htpasswd]] مش جاية مع Nginx. هي أداة من مشروع Apache، وموجودة في باكدج اسمها [[apache2-utils]] (أدوات صغيرة بس، مش سيرفر Apache نفسه). و [[-y]] يعني «أيوه» على سؤال التأكيد.

---

## ٢. [[sudo htpasswd -c /etc/nginx/.htpasswd dev]]

| الحتة | معناها |
|---|---|
| [[htpasswd]] | ضيف أو غيّر يوزر في ملف باسوردات |
| [[-c]] | create: اعمل الملف من الأول |
| [[/etc/nginx/.htpasswd]] | مكان الملف. النقطة في أول الاسم بتخليه ملف مخفي |
| [[dev]] | اسم اليوزر |

الأمر بيسألك الباسورد مرتين (مش بيظهر وانت بتكتبه):

~~~text الناتج
New password:
Re-type new password:
Adding password for user dev
~~~

والملف بقى فيه سطر واحد، اليوزر و [[:]] والباسورد بعد ما اتعمله hash:

~~~text cat /etc/nginx/.htpasswd
dev:$apr1$JsZGhVao$jR9BJGYtvkasagMduZuOS.
~~~

[[$apr1$]] اسم الطريقة (نسخة Apache من MD5)، والحتة اللي بعدها لحد [[$]] هي الـ salt (حروف عشوائية بتخلي نفس الباسورد يطلع hash مختلف كل مرة)، والباقي الـ hash. يعني الباسورد نفسه مش مكتوب في الملف.

> [[-c]] أول مرة بس. جربتها على ملف فيه [[dev]] وضفت [[sara]] بـ [[-c]]: الملف بقى فيه [[sara]] لوحدها و [[dev]] اتمسح. لليوزر التاني اكتب الأمر من غير [[-c]].

---

## ٣. البلوك

~~~text nginx.conf
server {
    server_name staging.example.com;
    auth_basic "Staging";
    auth_basic_user_file /etc/nginx/.htpasswd;
~~~

### [[auth_basic "Staging";]]

يشغّل الحماية. والنص بين علامتي التنصيص اسمه **realm**، وبيرجع للمتصفح في header اسمه [[WWW-Authenticate]]. ولأنه مكتوب على مستوى الـ [[server]] (بره أي location)، كل الـ locations اللي جوه بتورثه.

### [[auth_basic_user_file /etc/nginx/.htpasswd;]]

الملف اللي يقارن بيه.

### طلب من غير باسورد

~~~text الناتج
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Basic realm="Staging"
~~~

[[401]] = «لازم تعرّف نفسك». والـ header ده هو اللي بيخلي المتصفح يفتح نافذة اليوزر والباسورد. ولو داس Cancel بيشوف صفحة عنوانها [[401 Authorization Required]].

### طلب بـ [[curl -u dev:pass]]

[[-u]] (user) بيبعت اليوزر والباسورد. شوف curl بعت إيه بالظبط ([[-v]] بيطبع الطلب، والسطور اللي بتبدأ بـ [[>]] هي اللي اتبعتت):

~~~text الناتج
> Authorization: Basic ZGV2OnBhc3M=
~~~

[[ZGV2OnBhc3M=]] ده [[dev:pass]] متحوّل base64، ودي مش تشفير. أي حد يفكه في ثانية:

~~~bash
echo -n ZGV2OnBhc3M= | base64 -d
~~~

~~~text الناتج
dev:pass
~~~

عشان كده basic auth لازم يبقى على https بس.

| الطلب | الرد |
|---|---|
| من غير [[-u]] | [[401]] |
| [[-u dev:pass]] | [[200]] |
| [[-u dev:wrong]] | [[401]]، و [[error.log]]: [[user "dev": password mismatch]] |

---

## ٤. استثناء الـ webhooks

~~~text nginx.conf
    location /webhooks/ {
        auth_basic off;
        proxy_pass http://127.0.0.1:3000;
    }
    location / { proxy_pass http://127.0.0.1:3000; }
}
~~~

[[auth_basic off;]] جوه location بيلغي اللي ورثه من الـ server، للمسار ده بس. ليه؟ بوابة الدفع (Paymob مثلًا) بتبعت طلب لـ [[/webhooks/...]] ومعهاش باسورد. جربت [[/webhooks/paymob]] من غير [[-u]]: [[200]]. والتطبيق لازم يتأكد من الـ webhook بطريقته (توقيع HMAC من البوابة).

و [[location /]] كل الباقي، بالحماية.

> ملحوظة شفتها في التجربة: Nginx بيعدّي header [[Authorization: Basic ZGV2OnBhc3M=]] للتطبيق زي ما هو، فالتطبيق شايف الباسورد. لو مش عايز ده ضيف [[proxy_set_header Authorization "";]].

---

## ٥. لما الملف نفسه فيه مشكلة

| المشكلة | الرد | error.log |
|---|---|---|
| Nginx ([[www-data]]) مش قادر يقرا الملف | [[500]] | [[open() "/etc/nginx/.htpasswd" failed (13: Permission denied)]] |
| الملف مش موجود | [[403]] | [[open() "/etc/nginx/.htpasswd" failed (2: No such file or directory)]] |

الأولى جربتها بـ [[chmod 600]] (root بس يقرا)، والتانية بإني نقلت الملف. الحل: [[ls -l]] على الملف، المفروض [[-rw-r--r--]].

---

## الخلاصة

- [[htpasswd -c]] أول يوزر بس، وبعدين من غير [[-c]].
- [[auth_basic]] على الـ server كله، و [[auth_basic off]] للمسارات اللي بتوصلها خدمات خارجية.
- الباسورد بيتبعت base64 مع كل طلب: https إجباري.`,
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
          ],
          sol: R`المتصفح بيفتح نافذة فيها [[Staging]] بتطلب username و password. و Cancel بيطلّع [[401 Authorization Required]].

من الترمنال: [[curl -u dev:pass https://staging.example.com]] بيرجع الصفحة عادي. ومن غير [[-u]] أو بباسورد غلط: [[401]] ومعاه header [[WWW-Authenticate: Basic realm="Staging"]]. و [[/webhooks/]] بيرد من غير باسورد لأن [[auth_basic off]]. جربت التلات حالات.

الغلط الشائع: [[500 Internal Server Error]] و [[error.log]] فيه [[open() "/etc/nginx/.htpasswd" failed (13: Permission denied)]]: [[www-data]] مش قادر يقرا الملف. ولو الملف مش موجود أصلًا الرد [[403]] واللوج فيه [[(2: No such file or directory)]] (جربت الحالتين على Nginx 1.24 و 1.31). ولو الباسورد صح وبيرفض، اتأكد إنك استخدمت [[-c]] مرة واحدة بس (المرة التانية بتمسح اليوزرز القدام).`
        },
        {
          cmd: "htpasswd -B و $remote_user",
          title: "يوزر لكل واحد في الفريق، والتطبيق يعرف مين دخل",
          desc: "بدل باسورد واحد للفريق كله، كل واحد ليه يوزر في نفس الملف، فتقدر تشيل واحد لوحده. [[-B]] بيخزن الباسورد bcrypt، و [[-i]] بياخده من stdin بدل سطر الأوامر. و [[$remote_user]] اسم اليوزر اللي دخل، تبعته للتطبيق في header عشان يفلتر البيانات عليه.",
          example: R`sudo htpasswd -cB /etc/nginx/.htpasswd-dashboard sara
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
          teach: R`## الفكرة: ملف واحد، يوزر لكل واحد

نفس [[auth_basic]] من الدرس اللي فات، بس الملف فيه سطر لكل واحد في الفريق. فتقدر تشيل واحد من غير ما تغيّر باسورد الباقيين، و Nginx يقول للتطبيق مين اللي دخل. المثال: ٤ أوامر بتعمل الملف، وبعدين الـ location.

### إزاي اتجرّب

كونتينر [[ubuntu:24.04]] فيه [[nginx]] 1.24 و [[apache2-utils]] و [[openssl]]، وتطبيق [[traefik/whoami]] على بورت 8080 مكان اللوحة (بيطبع الـ headers اللي وصلته، فأشوف [[X-Dash-User]] وصل ولا لأ). والأوامر من غير [[sudo]] لأني root جوه الكونتينر.

---

## ١. [[sudo htpasswd -cB /etc/nginx/.htpasswd-dashboard sara]]

| الحتة | معناها |
|---|---|
| [[-c]] | اعمل الملف من الأول (بيمسح أي ملف موجود بنفس الاسم) |
| [[-B]] | خزّن الباسورد بـ bcrypt |
| [[.htpasswd-dashboard]] | ملف خاص باللوحة، منفصل عن ملف الـ staging |
| [[sara]] | اسم اليوزر |

الحرفين [[-cB]] هما [[-c -B]] لازقين في بعض. والأمر بيسأل الباسورد مرتين:

~~~text الناتج
New password:
Re-type new password:
Adding password for user sara
~~~

### ليه [[-B]]؟

الافتراضي [[apr1]] (مبني على MD5)، وده سريع جدًا، يعني اللي يسرق الملف يقدر يجرّب ملايين الباسوردات في الثانية. bcrypt مصمم يبقى بطيء عن قصد. شكل السطر في الملف:

~~~text cat .htpasswd-dashboard
sara:$2y$05$cIWyRdFZqxuAe0sK.b8gvuTJlpeTGX6XtvXNYzNs.qaTCVxStahVq
~~~

[[$2y$]] = bcrypt، و [[05]] الـ cost (كل زيادة ١ بتضاعف الوقت؛ [[-C 10]] مثلًا لو عايز أبطأ). والباقي الـ salt والـ hash.

---

## ٢. [[PASS="$(openssl rand -base64 12 | tr -d '/+=')"]]

من جوه لبرة:

### [[openssl rand -base64 12]]

هات ١٢ byte عشوائيين واكتبهم base64 (حروف وأرقام و [[+]] و [[/]]). كل ٣ bytes بيبقوا ٤ حروف، فـ ١٢ byte = ١٦ حرف:

~~~text الناتج
N642qZU5SK+f8M5x
~~~

### [[| tr -d '/+=']]

[[|]] (pipe) بيدّي الناتج للأمر اللي بعده. و [[tr -d]] (translate, delete) بيمسح أي حرف من الحروف دي: [[/]] و [[+]] و [[=]]. ليه؟ دول بيلخبطوا لما حد يكتب الباسورد أو يحطه في URL. فالناتج ممكن يطلع ١٥ حرف بدل ١٦ لو كان فيه رمز.

### [[PASS="$(...)"]]

[[$(...)]] نفّذ الأمر اللي جوه وحط ناتجه هنا. و [[PASS=]] خزّنه في متغير اسمه [[PASS]] (من غير مسافات حوالين [[=]]). وعلامات التنصيص عشان أي ناتج يتعامل كنص واحد.

---

## ٣. [[printf '%s\n' "$PASS" | sudo htpasswd -iB /etc/nginx/.htpasswd-dashboard omar]]

### [[printf '%s\n' "$PASS"]]

اطبع قيمة المتغير ([[%s]] = مكان النص) وبعدها سطر جديد ([[\n]]). أضمن من [[echo]] لأنه مش بيفسّر أي حاجة جوه النص.

### [[htpasswd -iB]]

[[-i]] (stdin): خد الباسورد من الـ pipe بدل ما تسأل. ومفيش [[-c]] لأن الملف موجود. الناتج:

~~~text الناتج
Adding password for user omar
~~~

### ليه مش [[-b]]؟

[[htpasswd -bB file omar Secret123]] بيحط الباسورد **في سطر الأوامر نفسه**. وسطر الأوامر بتاع أي برنامج شغال يقدر أي يوزر على السيرفر يشوفه بـ [[ps aux]]، وكمان بيتحفظ في [[~/.bash_history]]. مع [[-i]] الباسورد بيعدّي في الـ pipe، ومش بيظهر في الاتنين.

> أول يوزر في ملف لسه مش موجود لازم [[-c]]. جربت [[htpasswd -B]] من غيرها: [[htpasswd: cannot modify file /etc/nginx/.htpasswd-dashboard; use '-c' to create it]].

---

## ٤. [[echo "omar: $PASS"]]

اطبع الباسورد مرة واحدة عشان تبعته لعمر. بعدها مش هتقدر ترجعه من الملف (الملف فيه hash بس).

---

## ٥. الـ location

~~~text nginx.conf
location /dashboard/ {
    auth_basic "team";
    auth_basic_user_file /etc/nginx/.htpasswd-dashboard;
    proxy_pass http://127.0.0.1:8080;
    proxy_set_header X-Dash-User $remote_user;
}
~~~

السطرين الأولانيين زي الدرس اللي فات، بس على [[/dashboard/]] بس. و [[proxy_pass]] للوحة على 8080.

### [[$remote_user]]

متغير Nginx فيه اسم اليوزر اللي الباسورد بتاعه اتقبل. و [[proxy_set_header X-Dash-User $remote_user;]] بيبعته للتطبيق في header اسمه [[X-Dash-User]] (اسم من اختيارنا؛ [[X-]] عادة قديمة للـ headers الخاصة). اللي وصل التطبيق:

~~~text curl -u omar:... | grep X-Dash
X-Dash-User: omar
~~~

### الزائر يقدر يزوّره؟

جربت أدخل كـ [[sara]] وأبعت بنفسي [[-H "X-Dash-User: admin"]]. التطبيق شاف:

~~~text الناتج
X-Dash-User: sara
~~~

[[proxy_set_header]] بيكتب فوق الـ header اللي جاي من برة. بس ده بيحمي بشرط إن الطريق الوحيد للتطبيق هو Nginx: لو بورت 8080 مفتوح للنت، أي حد يكلّمه مباشرة ويبعت اللي هو عايزه. خلّي التطبيق يسمع على [[127.0.0.1]] بس.

---

## ٦. مسح يوزر: [[htpasswd -D]]

~~~bash
sudo htpasswd -D /etc/nginx/.htpasswd-dashboard omar
~~~

~~~text الناتج
Deleting password for user omar
~~~

[[-D]] (delete). وبعدها على طول، من غير reload، نفس الطلب بباسورد عمر رجع [[401]] و [[error.log]] فيه:

~~~text error.log
user "omar" was not found in "/etc/nginx/.htpasswd-dashboard"
~~~

ليه من غير reload؟ لأن Nginx بيفتح الملف ويقراه مع كل طلب، مش وقت ما يقوم بس.

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[htpasswd -cB file sara]] | أول يوزر، والملف جديد |
| [[openssl rand]] ثم [[tr -d]] | باسورد عشوائي من غير رموز ملخبطة |
| [[printf]] ثم [[htpasswd -iB file omar]] | يوزر جديد والباسورد مش ظاهر في [[ps]] |
| [[htpasswd -D file omar]] | شيله، ويسري فورًا |
| [[proxy_set_header X-Dash-User $remote_user]] | التطبيق يعرف مين دخل |

[[-c]] مرة واحدة بس في عمر الملف، و [[-b]] لأ.`,
          lines: [
            "اعمل الملف وضيف sara (هيسألك الباسورد مرتين)، bcrypt. [[-c]] أول مرة بس، لأنها بتمسح أي ملف موجود.",
            "ولّد باسورد عشوائي من غير رموز ملخبطة.",
            "ضيف omar والباسورد جاي من stdin (مش ظاهر في ps).",
            "اطبعه مرة واحدة عشان تبعته له.",
            "اللوحة.",
            "اطلب دخول.",
            "ملف اليوزرز.",
            "للتطبيق (على 127.0.0.1 بس).",
            "ابعت اسم اللي دخل للتطبيق.",
            "قفلة."
          ],
          sol: R`بعد إضافة sara و omar: [[curl -u omar:PASS .../dashboard/]] بيعدّي، والتطبيق بيستلم [[X-Dash-User: omar]]. جربتها: الـ backend شاف [[user: "omar"]] ومع sara شاف [[sara]].

بعد [[sudo htpasswd -D /etc/nginx/.htpasswd-dashboard omar]] (بيطبع [[Deleting password for user omar]])، نفس الطلب بيرجع [[401]] على طول من غير reload، و [[error.log]] فيه [[user "omar" was not found in "/etc/nginx/.htpasswd-dashboard"]]. ده لأن Nginx بيقرا الملف مع كل طلب.

الغلط الشائع: أول أمر [[htpasswd -B]] على ملف لسه مش موجود بيطلع [[cannot modify file ...; use '-c' to create it]]. أول يوزر بس بـ [[-cB]]، والباقي من غير [[-c]]. والمتصفح بيفضل حافظ omar لحد ما تقفله، فاختبر بـ curl أو incognito.`,
          solCode: R`sudo htpasswd -cB /etc/nginx/.htpasswd-dashboard sara
PASS="$(openssl rand -base64 12 | tr -d '/+=')"
printf '%s\n' "$PASS" | sudo htpasswd -iB /etc/nginx/.htpasswd-dashboard omar
curl -s -o /dev/null -w "%{http_code}\n" -u "omar:$PASS" https://example.com/dashboard/
sudo htpasswd -D /etc/nginx/.htpasswd-dashboard omar
curl -s -o /dev/null -w "%{http_code}\n" -u "omar:$PASS" https://example.com/dashboard/`
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
            mistakes: "escape=json ناقص فسطر فيه علامة تنصيص يكسر الـ JSON. و $upstream_response_time مالوش قيمة رقمية للردود اللي ماعدّتش على التطبيق (من الكاش أو return): بيبقى نص فاضي مع escape=json و «-» من غيره، فلو من غير علامات تنصيص الـ JSON يبوظ (عشان كده بين علامات تنصيص)."
          },
          teach: R`## الفكرة: كل طلب سطر JSON

بدل سطر اللوج العادي (نص بمسافات)، بنقول لـ Nginx يكتب كل طلب كـ object JSON في سطر لوحده، فيه الحقول اللي احنا عايزينها. وبعدها أداة [[jq]] تفلتر وترتب كأنها قاعدة بيانات صغيرة.

### إزاي اتجرّب

كونتينر [[ubuntu:24.04]] فيه [[nginx]] 1.24 و [[jq]]، والـ [[log_format]] في ملف لوحده في [[conf.d]] (اللي بيتقرا جوه [[http {}]])، والموقع في [[sites-enabled]] ورا تطبيق [[traefik/whoami]] على 3000. وضفت [[location /api/]] بيشاور على بورت مفيش عليه حاجة عشان أطلّع 502 حقيقي.

---

## ١. [[log_format]]: تعريف الصيغة

~~~text nginx.conf (جوه http)
log_format json escape=json '{"time":"$time_iso8601","ip":"$remote_addr","method":"$request_method","uri":"$request_uri","status":$status,"bytes":$body_bytes_sent,"rt":$request_time,"upstream":"$upstream_response_time","ua":"$http_user_agent"}';
~~~

| الحتة | معناها |
|---|---|
| [[log_format]] | عرّف صيغة لوج جديدة |
| [[json]] | اسمها (أي اسم؛ هنستخدمه في [[access_log]]) |
| [[escape=json]] | هرّب القيم بطريقة JSON |
| [[' ... ']] | القالب نفسه: نص، و Nginx بيحط قيمة كل متغير مكانه |

لازم تبقى في [[http {}]] مش جوه [[server]]، لأن أي server ممكن يستخدمها.

### الحقول

| الحقل | المتغير | قيمته |
|---|---|---|
| [[time]] | [[$time_iso8601]] | الوقت بصيغة ISO 8601 زي [[2026-10-06T12:46:03+00:00]] |
| [[ip]] | [[$remote_addr]] | IP الزائر |
| [[method]] | [[$request_method]] | [[GET]] أو [[POST]]... |
| [[uri]] | [[$request_uri]] | المسار ومعاه الـ query ([[/products?id=7]]) |
| [[status]] | [[$status]] | كود الرد |
| [[bytes]] | [[$body_bytes_sent]] | حجم الـ body اللي اتبعت (من غير الـ headers) |
| [[rt]] | [[$request_time]] | الوقت الكلي بالثواني، بدقة مللي ثانية |
| [[upstream]] | [[$upstream_response_time]] | الوقت اللي التطبيق أخده يرد |
| [[ua]] | [[$http_user_agent]] | المتصفح أو الأداة |

### ليه [[status]] و [[bytes]] و [[rt]] من غير علامات تنصيص؟

في JSON [[200]] رقم و [["200"]] نص. jq بيقارن الأرقام بالأرقام، فـ [[.status >= 500]] بتشتغل بس لو القيمة رقم.

### وليه [[upstream]] بين علامات تنصيص؟

لأنه مش رقم دايمًا. جربت location بيرد بـ [[return]] (مفيش تطبيق):

~~~text الناتج
"upstream":""
~~~

نص فاضي. ومن غير [[escape=json]] بيكتب [[-]]. لو كان من غير علامات تنصيص، السطر ده يبقى JSON بايظ. وكمان لو Nginx جرّب أكتر من سيرفر في upstream بيكتب أكتر من رقم مفصولين بفاصلة.

### [[escape=json]] بيفرق في إيه؟

الـ user agent ممكن يبقى فيه علامة تنصيص [["]]. جربت نفس الطلب بـ [[-A 'Mozilla "q"']] على صيغتين:

~~~text مع escape=json
"ua":"Mozilla \"q\""
~~~

~~~text من غيره
"ua":"Mozilla \x22q\x22"
~~~

[[\"]] هي الطريقة الصح في JSON. و [[\x22]] طريقة Nginx الافتراضية، و jq بيرفضها:

~~~text الناتج
jq: parse error: Invalid escape at line 1, column 157
~~~

### [[$request_time]] و [[$upstream_response_time]] مع بعض

| الحالة | المعنى |
|---|---|
| الاتنين كبار | التطبيق هو البطيء |
| [[rt]] كبير و [[upstream]] صغير | الزائر نفسه بطيء (نت ضعيف) أو الرد كبير |
| الاتنين صغيرين | كله تمام |

---

## ٢. [[access_log /var/log/nginx/example.json json;]]

جوه الـ server: اكتب لوج الموقع ده في الملف ده بصيغة [[json]] اللي عرّفناها. وده بيلغي اللوج الافتراضي ([[access.log]]) للموقع ده، فطلباته مش هتتكتب في الاتنين.

---

## ٣. [[location = /health { access_log off; ... }]]

[[=]] يعني المسار ده بالظبط. و [[access_log off]] متكتبش الطلبات دي خالص. أداة المراقبة بتطلب [[/health]] كل ١٠ ثواني مثلًا، يعني ٨٦٤٠ سطر في اليوم مالهمش أي قيمة. والـ [[proxy_pass]] لازم يتكتب تاني جوه الـ location ده لأنه location منفصل.

### اللي اتكتب

عملت ٥ طلبات: [[/]]، و [[/products?id=7]] بـ user agent فيه علامات تنصيص، و [[/health]] مرتين، و [[/api/x]] (الـ 502):

~~~text cat /var/log/nginx/example.json
{"time":"2026-10-06T12:46:03+00:00","ip":"127.0.0.1","method":"GET","uri":"/","status":200,"bytes":198,"rt":0.001,"upstream":"0.001","ua":"curl/8.5.0"}
{"time":"2026-10-06T12:46:03+00:00","ip":"127.0.0.1","method":"GET","uri":"/products?id=7","status":200,"bytes":223,"rt":0.000,"upstream":"0.001","ua":"Mozilla \"quoted\" agent"}
{"time":"2026-10-06T12:46:03+00:00","ip":"127.0.0.1","method":"GET","uri":"/api/x","status":502,"bytes":166,"rt":0.000,"upstream":"0.000","ua":"curl/8.5.0"}
~~~

٣ سطور بس: الـ health مش موجود.

---

## ٤. الفلترة بـ [[jq]]

### [[tail -f ... | jq 'select(.status >= 500)']]

[[tail -f]] (follow) بيفضل فاتح الملف ويطبع أي سطر جديد. و [[jq]] بياخد كل سطر كـ object، و [[select(...)]] بيعدّي اللي الشرط بتاعه صح بس. [[.status]] يعني حقل [[status]] في الـ object:

~~~text jq -c 'select(.status >= 500)' example.json
{"time":"2026-10-06T12:46:03+00:00","ip":"127.0.0.1","method":"GET","uri":"/api/x","status":502,...}
~~~

([[-c]] = compact: كل object في سطر. من غيرها jq بيفرده على كذا سطر.)

### [[jq -s 'sort_by(.rt) | reverse | .[0:5]']]

| الحتة | معناها |
|---|---|
| [[-s]] | slurp: اقرا الملف كله وحطه في array واحدة |
| [[sort_by(.rt)]] | رتّب بالـ [[rt]] من الصغير للكبير |
| [[reverse]] | اقلب: الأكبر الأول |
| [[.[0:5]]] | أول ٥ عناصر (من 0 لحد قبل 5) |

والـ [[|]] جوه jq بيوصّل الخطوات ببعض زي الـ pipe في bash. الناتج array فيها أبطأ ٥ طلبات.

---

## الخلاصة

- [[log_format]] في [[http]]، و [[access_log path name]] في الـ server.
- [[escape=json]] دايمًا، والأرقام من غير تنصيص، و [[upstream]] بتنصيص.
- [[rt]] مع [[upstream]] بيقولولك مين البطيء.
- [[access_log off]] للمسارات اللي بتتطلب أوتوماتيك.`,
          lines: [
            "صيغة JSON: الوقت، والـ IP، والطلب، والـ status، والحجم، ووقت الرد الكلي، ووقت التطبيق، والمتصفح. escape=json يهرب علامات التنصيص.",
            "الموقع.",
            "استخدم الصيغة في ملف خاص.",
            "health من غير لوج.",
            "قفلة."
          ],
          sol: R`[[tail -f ... | jq 'select(.status >= 500)']] بيفضل ساكت لحد ما يحصل خطأ، وبعدين يطبع object زي [[{"time":"2026-09-30T04:58:29+00:00","ip":"...","uri":"/api/x","status":503,"rt":0.000,...}]]. جربتها على لوج فيه طلبات اتعملها rate limit وطلّع الـ 503 بس.

و [[jq -s 'sort_by(.rt) | reverse | .[0:5]']] بيطبع array فيها أبطأ ٥ طلبات بالـ [[rt]] بتاعها (بالثواني)، وده أسرع طريقة تلاقي الـ endpoint البطيء.

الأغلاط الشائعة: jq يطلع [[parse error]]: فيه سطور قديمة بصيغة اللوج العادي في نفس الملف، أو [[escape=json]] ناقص فـ user agent فيه علامة [["]] بوّظ السطر. و [[.status >= 500]] مابيطلعش حاجة لو status مكتوب بين علامات تنصيص في log_format فبقى نص؛ سيبه من غير تنصيص زي المثال.`
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
          teach: R`## الفكرة: نفس الموقع، بروتوكول أحدث

التطبيق مش بيتغيّر خالص. الكلام كله بين المتصفح و Nginx: HTTP/2 بيبعت كل ملفات الصفحة على اتصال واحد مع بعض، و HTTP/3 نفس الفكرة بس على UDP بدل TCP. والبلوك ده بيشغّل الاتنين، ومعاهم إعدادات TLS.

### إزاي اتجرّب

- [[nginx:alpine]] (نسخة 1.31.6، مبنية بـ [[--with-http_v3_module]]) جوه Docker، بشهادة self-signed عملتها بـ [[openssl]] وحطيتها في نفس المسارات [[/etc/letsencrypt/live/example.com/]] عشان البلوك يفضل زي ما هو. وزوّدت [[location / { return 200 "hello\n"; }]] عشان يرد.
- و [[nginx]] 1.24 بتاع [[ubuntu:24.04]] (من apt) عشان أشوف الفرق في النسخ.
- الطلبات بـ [[curl -k]] ([[-k]] = اقبل الشهادة self-signed). و curl اللي عندي مش مبني بـ HTTP/3، فـ h3 نفسه ماجربتوش بعميل؛ اتأكدت بس إن Nginx بيسمع على UDP وبيبعت [[Alt-Svc]].

---

## ١. [[listen 443 ssl;]]

اسمع على بورت 443 (TCP)، والاتصال عليه TLS ([[ssl]]). ده https العادي.

## ٢. [[listen 443 quic reuseport;]]

| الحتة | معناها |
|---|---|
| [[443]] | نفس الرقم، بس المرة دي UDP |
| [[quic]] | البروتوكول اللي HTTP/3 شغال فوقه (على UDP، والتشفير جواه) |
| [[reuseport]] | كل worker في Nginx يفتح socket لوحده على نفس البورت |

ليه [[reuseport]] مع QUIC؟ عشان كل الـ packets بتاعة اتصال واحد توصل لنفس الـ worker. وده اللي شفته في الكونتينر:

~~~text netstat -lnu | grep 443
udp   0   0 0.0.0.0:443   0.0.0.0:*
udp   0   0 0.0.0.0:443   0.0.0.0:*
... (16 سطر)
~~~

١٦ سطر = ١٦ worker (على عدد الـ CPUs). و [[reuseport]] يتكتب **مرة واحدة** لكل بورت على السيرفر كله. جربت بلوكين الاتنين فيهم [[listen 443 quic reuseport]]:

~~~text الناتج
nginx: [emerg] duplicate listen options for 0.0.0.0:443 in /etc/nginx/conf.d/default.conf:18
nginx: configuration file /etc/nginx/nginx.conf test failed
~~~

في البلوك التاني اكتب [[listen 443 quic;]] من غير [[reuseport]].

## ٣. [[http2 on;]] و [[http3 on;]]

[[http2 on]] يشغّل HTTP/2 على اتصالات [[ssl]]. المتصفح و Nginx بيتفقوا عليه لوحدهم وقت مصافحة TLS (عن طريق حاجة اسمها ALPN: المتصفح بيقول «أنا بفهم h2 و http/1.1» والسيرفر يختار). و [[http3 on]] يشغّل HTTP/3 على الـ [[quic]].

~~~bash
curl -skI https://127.0.0.1/
~~~

([[-s]] صامت، [[-k]] اقبل الشهادة، [[-I]] الـ headers بس.)

~~~text الناتج
HTTP/2 200
server: nginx/1.31.6
content-length: 6
alt-svc: h3=":443"; ma=86400
~~~

[[HTTP/2 200]]: curl اتفق مع Nginx على h2 لوحده. والـ headers بحروف صغيرة لأن HTTP/2 بيفرض كده.

### النسخة بتفرق

[[http2 on]] اتضافت في Nginx 1.25.1. جربت نفس البلوك على 1.24 بتاع أوبونتو 24.04:

~~~text الناتج
[emerg] unknown directive "http2" in /etc/nginx/sites-enabled/h2:3
nginx: configuration file /etc/nginx/nginx.conf test failed
~~~

هناك الصيغة القديمة [[listen 443 ssl http2;]] (من غير سطر [[http2 on]])، واشتغلت ([[HTTP/2 200]]). والعكس: الصيغة القديمة على 1.31 بتعدّي بتحذير:

~~~text الناتج
nginx: [warn] the "listen ... http2" directive is deprecated, use the "http2" directive instead
~~~

وعشان تعرف نسختك فيها HTTP/3 ولا لأ: [[nginx -V 2>&1 | grep -o with-http_v3_module]]. لو مطلعش حاجة، مفيش.

## ٤. [[add_header Alt-Svc 'h3=":443"; ma=86400' always;]]

المتصفح مش بيعرف لوحده إن فيه HTTP/3. أول زيارة بتبقى h2، والـ header ده بيقوله:

| الحتة | معناها |
|---|---|
| [[Alt-Svc]] | Alternative Service: «فيه طريقة تانية توصلني بيها» |
| [[h3=":443"]] | HTTP/3 على بورت 443 على نفس الدومين |
| [[ma=86400]] | max-age: افتكر ده ٨٦٤٠٠ ثانية (يوم) |
| [[always]] | ابعته مع كل رد، حتى الأخطاء (من غيرها [[add_header]] بيتبعت مع 200 و 3xx بس) |

العلامات: الـ header كله بين [[' ']] عشان جواه [["]] و [[;]]، و [[;]] اللي جوه التنصيص جزء من القيمة مش آخر السطر.

---

## ٥. الشهادة

~~~text nginx.conf
ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
~~~

[[fullchain.pem]] شهادتك ومعاها الشهادات الوسيطة (السلسلة كلها، عشان المتصفح يوصل لجهة يثق فيها). و [[privkey.pem]] المفتاح السري. المسارين دول اللي certbot بيعملهم.

## ٦. [[ssl_protocols TLSv1.2 TLSv1.3;]]

اقبل النسختين دول بس. 1.0 و 1.1 قدام وفيهم ثغرات، والمتصفحات الحديثة شالتهم.

## ٧. [[ssl_session_cache shared:SSL:10m;]] و [[ssl_session_timeout 1d;]]

مصافحة TLS أول مرة فيها حسابات تقيلة ورحلات رايحة جاية. الكاش ده بيحفظ «الجلسة»، فالزائر الراجع بيكمّل عليها من غير مصافحة كاملة.

| الحتة | معناها |
|---|---|
| [[shared]] | كاش مشترك بين كل الـ workers |
| [[SSL]] | اسمه (أي اسم) |
| [[10m]] | ١٠ ميجا، والـ docs بتقول الميجا حوالي ٤٠٠٠ جلسة، يعني حوالي ٤٠ ألف |
| [[1d]] | الجلسة تفضل صالحة يوم |

جربته بـ [[openssl s_client]] على TLS 1.2 مع [[-reconnect]] (اتصل، واقفل، واتصل ٥ مرات تاني بنفس الجلسة) و [[-no_ticket]] (عشان يعتمد على كاش السيرفر بس):

~~~text الناتج
      1 New, TLSv1.2, Cipher is ECDHE-RSA-AES256-GCM-SHA384
      5 Reused, TLSv1.2, Cipher is ECDHE-RSA-AES256-GCM-SHA384
~~~

أول اتصال [[New]] (مصافحة كاملة)، والخمسة بعده [[Reused]].

---

## ٨. فتح UDP: [[sudo ufw allow 443/udp]]

HTTP/3 على UDP، و [[ufw]] غالبًا فاتح [[443/tcp]] بس. الأمر ده بيضيف قاعدة لـ IPv4 وقاعدة لـ IPv6 ([[Rule added]] و [[Rule added (v6)]]). ماشغلتوش هنا (بيغيّر الـ firewall)، والناتج من الـ docs. ولو مزود السيرفر عنده firewall في لوحة التحكم، افتح UDP 443 هناك كمان.

---

## الخلاصة

| السطر | لازم |
|---|---|
| [[http2 on]] | Nginx 1.25.1+، وإلا [[listen 443 ssl http2]] |
| [[listen 443 quic reuseport]] + [[http3 on]] | نسخة فيها [[http_v3_module]]، و [[reuseport]] مرة واحدة للبورت |
| [[Alt-Svc]] | من غيره المتصفح مش هيجرب h3 |
| UDP 443 مفتوح | وإلا [[Alt-Svc]] بيوعد بحاجة مش موجودة |
| [[ssl_session_cache]] | الزائر الراجع يتخطى المصافحة الكاملة |`,
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
          ],
          sol: R`[[sudo ufw allow 443/udp]] بيطبع [[Rule added]] و [[Rule added (v6)]]. وفي DevTools عمود Protocol: أول تحميل [[h2]]، وبعد ريفريش (بعد ما المتصفح شاف [[Alt-Svc]]) الطلبات بتبقى [[h3]]. و [[curl -sI https://example.com]] بيطبع [[HTTP/2 200]] (جربت ده).

لو h3 ماظهرش خالص: [[nginx -V 2>&1 | grep -o with-http_v3_module]] مابيطلّعش حاجة يبقى نسختك مش بتدعمه، أو UDP 443 مقفول في firewall بتاع مزود السيرفر كمان مش ufw بس.

الغلط الشائع: [[nginx -t]] يطلع [[unknown directive "http2"]]. ده حصل معايا على Nginx 1.24 بتاع أوبونتو 24.04: [[http2 on]] محتاج 1.25.1 أو أحدث. على 1.24 استخدم الصيغة القديمة [[listen 443 ssl http2;]] وشيل سطور quic و http3، أو سطّب Nginx من repo nginx.org.`
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
          teach: R`## الفكرة: صدّق الـ header بس من Cloudflare

لما Cloudflare قدام السيرفر، الزائر بيكلّم Cloudflare، و Cloudflare هي اللي بتكلّم Nginx. فـ Nginx شايف IP بتاع Cloudflare. بس Cloudflare بتكتب IP الزائر الحقيقي في header اسمه [[CF-Connecting-IP]]. موديول [[realip]] بيقول لـ Nginx: «لو الطلب جاي من الرينجات دي، خد IP الزائر من الـ header ده وحطه في [[$remote_addr]]». والمثال ٥ أوامر: اتنين بيعملوا ملف الإعداد، وتلاتة بيتأكدوا.

### إزاي اتجرّب

كونتينر [[ubuntu:24.04]] فيه [[nginx]] 1.24 من apt، والأوامر من غير [[sudo]] لأني root جواه. ومفيش Cloudflare حقيقية قدامه، فالتجربة كانت بإني ضفت مؤقتًا [[set_real_ip_from 127.0.0.1;]] وبعت الـ header بنفسي بـ curl.

---

## ١. الأمر الطويل: من جوه لبرة

~~~bash
{ for f in ips-v4 ips-v6; do curl -s https://www.cloudflare.com/$f; echo; done; } | grep . | sed 's/.*/set_real_ip_from &;/' | sudo tee /etc/nginx/conf.d/cloudflare-realip.conf
~~~

### الخطوة ١: [[for f in ips-v4 ips-v6; do ...; done]]

لوب بيلف مرتين: مرة [[f]] قيمتها [[ips-v4]] ومرة [[ips-v6]]. و [[$f]] جوه اللوب بيتبدّل بالقيمة.

### الخطوة ٢: [[curl -s https://www.cloudflare.com/$f]]

دي القوايم الرسمية: كل رينج في سطر. [[-s]] من غير شريط التقدم.

~~~text curl -s https://www.cloudflare.com/ips-v4 (أول ٣ سطور)
173.245.48.0/20
103.21.244.0/22
103.22.200.0/22
~~~

[[/20]] ده الـ CIDR: أول ٢٠ bit من العنوان ثابتين والباقي متغير، يعني الرينج ده فيه ٢^١٢ = ٤٠٩٦ عنوان.

### الخطوة ٣: [[echo]]

آخر سطر في الملف ده **مالوش** سطر جديد في آخره (شفته بـ [[od -c]]: آخر حروف [[0 / 2 2]] من غير [[\n]]). من غير [[echo]]، آخر رينج IPv4 يلزق في أول رينج IPv6 في سطر واحد.

### الخطوة ٤: [[{ ...; }]]

الأقواس دي بتجمّع الأوامر اللي جواها، فناتجهم كلهم يدخل الـ pipe كأنه أمر واحد. لازم مسافة بعد [[{]] و [[;]] قبل [[}]].

### الخطوة ٥: [[| grep .]]

[[.]] في grep معناها «أي حرف». يعني عدّي أي سطر فيه حرف واحد على الأقل، وشيل السطور الفاضية (اللي ممكن [[echo]] يعملها).

### الخطوة ٦: [[| sed 's/.*/set_real_ip_from &;/']]

[[s/قديم/جديد/]] استبدال. [[.*]] = السطر كله. و [[&]] في الجزء الجديد = «اللي اتمسك». فكل سطر بيتلف:

~~~text قبل وبعد
173.245.48.0/20   →   set_real_ip_from 173.245.48.0/20;
~~~

### الخطوة ٧: [[| sudo tee /etc/nginx/conf.d/cloudflare-realip.conf]]

[[tee]] بيكتب اللي داخله في ملف وكمان يطبعه على الشاشة. ليه مش [[sudo ... > file]]؟ لأن [[>]] بيعمله الـ shell بتاعك انت (مش root) قبل ما [[sudo]] يشتغل، فيفشل بـ Permission denied. [[sudo tee]] هو اللي بيفتح الملف كـ root.

### الناتج

~~~text cloudflare-realip.conf
set_real_ip_from 173.245.48.0/20;
set_real_ip_from 103.21.244.0/22;
...
set_real_ip_from 2a06:98c0::/29;
set_real_ip_from 2c0f:f248::/32;
~~~

٢٢ سطر وقت التجربة: ١٥ IPv4 و ٧ IPv6 (العدد بيتغير لما Cloudflare تضيف رينجات).

---

## ٢. [[echo 'real_ip_header CF-Connecting-IP;' | sudo tee -a ...]]

نفس فكرة [[tee]]، بس [[-a]] (append) يعني ضيف في آخر الملف متمسحوش. و [[real_ip_header]] بيحدد الـ header اللي فيه IP الزائر.

الملف ده في [[conf.d]]، فبيتقرا جوه [[http {}]] وبيتطبق على كل المواقع.

---

## ٣. [[nginx -V 2>&1 | grep -o with-http_realip_module]]

[[nginx -V]] (V كبيرة) بيطبع النسخة وإزاي اتبنت، ومنها الموديولات. بس بيطبع على **stderr** مش stdout، والـ pipe بياخد stdout بس. [[2>&1]] = «ابعت stderr (رقم 2) لنفس مكان stdout (رقم 1)». و [[grep -o]] اطبع الكلمة اللي اتمسكت بس مش السطر كله (السطر طويل جدًا):

~~~text الناتج
with-http_realip_module
~~~

لو مطلعش حاجة، النسخة دي مفيهاش الموديول و [[nginx -t]] هيقول [[unknown directive "set_real_ip_from"]].

## ٤. [[sudo nginx -t && sudo systemctl reload nginx]]

اختبر، ولو عدّى طبّق من غير ما تقطع حد:

~~~text الناتج
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
~~~

---

## ٥. [[sudo tail -5 /var/log/nginx/access.log | awk '{print $1}']]

[[tail -5]] آخر ٥ سطور. وأول خانة في سطر اللوج الافتراضي هي [[$remote_addr]]، و [[awk '{print $1}']] بيطبعها بس. قبل الإعداد هتلاقي IPs بتاعة Cloudflare، وبعده IPs الزوار.

### التجربة

مع [[set_real_ip_from 127.0.0.1;]] مؤقتًا، طلب من 127.0.0.1 فيه [[CF-Connecting-IP: 41.33.10.20]]. اللوج سجّل:

~~~text الناتج
41.33.10.20
~~~

مش [[127.0.0.1]]. وبعدين نفس الحركة من كونتينر تاني (IP مش في القايمة) بـ [[CF-Connecting-IP: 1.2.3.4]]. اللوج سجّل:

~~~text الناتج
172.17.0.2
~~~

IP الكونتينر الحقيقي، والـ header اتجاهل. ده بالظبط اللي بيمنع أي حد يكلّم السيرفر مباشرة ويزوّر IP.

> ملحوظة: الـ header نفسه بيوصل التطبيق زي ما هو، فالتطبيق يقرا الـ IP من [[X-Real-IP]] اللي بتبعته انت بـ [[$remote_addr]]، مش من [[CF-Connecting-IP]] مباشرة.

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| الأمر الطويل | يحوّل قوايم Cloudflare لسطور [[set_real_ip_from]] |
| [[real_ip_header CF-Connecting-IP]] | الـ header اللي فيه IP الزائر |
| [[nginx -V]] و [[grep]] | الموديول موجود؟ |
| [[nginx -t && reload]] | طبّق بأمان |
| [[tail]] و [[awk]] | اتأكد من اللوج |

بعد كده [[$remote_addr]] هو الزائر في كل حاجة: اللوج، و [[limit_req]]، و [[allow]]/[[deny]]. وكرر الأمر الأول كل شهر (cron) عشان الرينجات الجديدة.`,
          lines: [
            "هات رينجات Cloudflare الرسمية (IPv4 و IPv6) وحوّل كل سطر لـ set_real_ip_from في ملف conf.d.",
            "خد IP الزائر من CF-Connecting-IP (بس من الرينجات دي).",
            "موديول realip مبني في نسختك؟",
            "اختبر وطبّق.",
            "آخر IPs في اللوج: المفروض زوار حقيقيين مش رينجات Cloudflare."
          ],
          sol: R`قبل الإعداد: أول عمود في [[access.log]] بيبقى IP من رينجات Cloudflare (زي [[172.68.x.x]] أو [[162.158.x.x]] أو IPv6 بيبدأ بـ [[2a06:98c0]])، ومش هو اللي ifconfig.me بيقوله على موبايلك.

بعد الإعداد و reload: العمود ده بقى هو نفسه IP موبايلك. جربت الفكرة محليًا: [[set_real_ip_from 127.0.0.1]] و [[CF-Connecting-IP: 41.33.10.20]]، فاللوج سجّل [[41.33.10.20]] بدل 127.0.0.1.

الغلط الشائع: [[nginx -V | grep realip]] مابيطلّعش حاجة (نسخة من غير الموديول)، فـ [[nginx -t]] يقول [[unknown directive "set_real_ip_from"]]. أو ملف الـ IPs فاضي لأن curl فشل؛ افتحه وبص. وعلى الداتا في الموبايل ممكن تلاقي IP شركة الاتصالات مش IP ثابت، وده طبيعي.`
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
          teach: R`## الفكرة: الـ status بيقولك «فيه مشكلة»، و error.log بيقولك «فين»

المتصفح بيوريك 403 أو 502 وخلاص. Nginx نفسه كاتب السبب بالظبط في سطر في [[error.log]]. الأوامر الست دي هي الطريق: اقرا اللوج، عِد، جرّب بنفسك، اختبر الصلاحيات، شوف الإعداد الفعلي، ولو لسه مش فاهم شغّل debug.

### إزاي اتجرّب

كونتينر [[ubuntu:24.04]] فيه [[nginx]] 1.24 و [[sudo]] من apt، وموقع [[example.com]] بالبلوك ده:

~~~text sites-enabled/example
server {
    listen 80;
    server_name example.com;
    root /var/www/example.com/html;
    location /api/ { proxy_pass http://127.0.0.1:3999; }
}
~~~

وعملت المشاكل بإيدي: فولدر [[example.com]] بـ [[chmod 700]] (root بس يدخله)، و [[/api/]] بيشاور على بورت مفيش عليه حاجة، وفولدر [[docs]] من غير index، وطلب رفع ٢ ميجا.

---

## ١. [[sudo tail -50 /var/log/nginx/error.log]]

[[tail -50]] آخر ٥٠ سطر، و [[sudo]] لأن اللوجات ملك root و [[adm]]. ده اللي طلع بعد ٤ طلبات:

~~~text error.log
2026/10/06 12:50:26 [error] 3212#3212: *50 "/var/www/example.com/html/index.html" is forbidden (13: Permission denied), client: 127.0.0.1, server: example.com, request: "GET / HTTP/1.1", host: "example.com"
2026/10/06 12:50:26 [error] 3214#3214: *51 connect() failed (111: Connection refused) while connecting to upstream, client: 127.0.0.1, server: example.com, request: "GET /api/x HTTP/1.1", upstream: "http://127.0.0.1:3999/api/x", host: "example.com"
~~~

### قراية السطر

| الحتة | معناها |
|---|---|
| [[2026/10/06 12:50:26]] | الوقت |
| [[[error]]] | المستوى ([[warn]] و [[error]] و [[crit]] و [[emerg]]...) |
| [[3212#3212]] | رقم الـ process والـ thread بتاع الـ worker |
| [[*50]] | رقم الاتصال: كل سطور نفس الطلب ليها نفس الرقم |
| الرسالة | **ده السبب** |
| [[client]] و [[server]] و [[request]] و [[host]] | مين طلب، وأنهي بلوك، وإيه بالظبط |
| [[upstream]] | (في الـ proxy) العنوان اللي Nginx حاول يكلّمه |

### الرسايل اللي طلعت في التجربة

| الـ status | الرسالة | السبب |
|---|---|---|
| 403 | [[is forbidden (13: Permission denied)]] أو [[open() ... failed (13: Permission denied)]] | Nginx ([[www-data]]) مش قادر يدخل فولدر أو يقرا الملف |
| 403 | [[directory index of ".../docs/" is forbidden]] | الطلب على فولدر ومفيش فيه [[index.html]] |
| 404 | [[open() ".../nope.html" failed (2: No such file or directory)]] | الملف مش موجود في الـ [[root]] ده |
| 413 | [[client intended to send too large body: 2000000 bytes]] | الرفع أكبر من [[client_max_body_size]] (الافتراضي 1m) |
| 502 | [[connect() failed (111: Connection refused) while connecting to upstream]] | التطبيق واقع أو البورت غلط |
| 504 | [[upstream timed out]] | التطبيق بطيء (من الـ docs، ماطلّعتهاش هنا) |

> حاجة شفتها: وفولدر [[example.com]] مقفول، حتى [[/nope.html]] (مش موجود) رجّع **403** مش 404، لأن Nginx مقدرش يدخل الفولدر أصلًا عشان يعرف الملف موجود ولا لأ. فالصلاحيات الأول.

الأرقام [[13]] و [[2]] و [[111]] أكواد أخطاء من نظام التشغيل (errno): 13 = Permission denied، و 2 = No such file، و 111 = Connection refused.

---

## ٢. [[sudo grep -c " 502 " /var/log/nginx/access.log]]

[[grep -c]] (count): بدل ما يطبع السطور، يطبع عددهم. والمسافات حوالين [[502]] مهمة: في الـ access.log الـ status مكتوب بين مسافتين، فالمسافات بتمنع إن [[502]] جوه رقم تاني (حجم رد [[15020]] مثلًا) يتعد.

~~~text الناتج
2
~~~

٢ (طلبين [[/api/x]] و [[/api/y]]). الرقم ده بيفرق: مرة واحدة يبقى التطبيق كان بيعمل restart، مية مرة يبقى واقع.

---

## ٣. [[curl -sI -H "Host: example.com" http://127.0.0.1/ | head -1]]

| الحتة | معناها |
|---|---|
| [[-s]] | صامت |
| [[-I]] | اطلب الـ headers بس (طلب HEAD) |
| [[-H "Host: example.com"]] | قول لـ Nginx إنك طالب [[example.com]] |
| [[http://127.0.0.1/]] | بس كلّم السيرفر ده نفسه |
| [[head -1]] | أول سطر بس (سطر الـ status) |

كده بتختبر البلوك ده بالظبط من على السيرفر، من غير DNS ولا Cloudflare ولا كاش المتصفح. Nginx بيختار البلوك من الـ [[Host]]:

~~~text الناتج
HTTP/1.1 403 Forbidden
~~~

---

## ٤. [[sudo -u www-data ls -la /var/www/example.com/html/]]

[[sudo -u www-data]] نفّذ الأمر **كيوزر [[www-data]]**، وده اليوزر اللي workers بتوع Nginx شغالين بيه على أوبونتو. يعني بتشوف الفولدر بعينين Nginx:

~~~text الناتج
ls: cannot access '/var/www/example.com/html/': Permission denied
~~~

دي نفس المشكلة اللي في اللوج. والأداة اللي بتقولك أنهي فولدر في الطريق هو المقفول:

~~~text namei -l /var/www/example.com/html/index.html
drwxr-xr-x root root /
drwxr-xr-x root root var
drwxr-xr-x root root www
drwx------ root root example.com
drwxr-xr-x root root html
-rw-r--r-- root root index.html
~~~

[[drwx------]]: أول حرف [[d]] فولدر، وبعدها ٣ مجموعات: صاحبه ([[rwx]])، والجروب ([[---]])، والباقيين ([[---]]). [[www-data]] من «الباقيين»، ومعهوش [[x]]، و [[x]] على الفولدر معناها «تقدر تعدّي منه». الحل [[chmod o+x]] على الفولدر ده (مش [[777]]). بعدها:

~~~text الناتج
drwxr-xr-x 3 root root 4096 Oct  6 12:50 .
drwx-----x 3 root root 4096 Oct  6 12:50 ..
-rw-r--r-- 1 root root    3 Oct  6 12:50 index.html
~~~

و [[/]] رجع 200.

---

## ٥. [[sudo nginx -T | grep -B3 -A10 "server_name example.com"]]

[[nginx -T]] (T كبيرة): اختبر **واطبع الإعداد كله** بعد ما يجمّع كل ملفات [[include]]. ده الإعداد اللي Nginx فعلًا شايفه، مش اللي انت فاكره. و [[grep -B3 -A10]] اطبع السطر اللي فيه الكلمة و ٣ سطور قبله (Before) و ١٠ بعده (After)، يعني البلوك كله تقريبًا.

~~~text الناتج (جزء)
# configuration file /etc/nginx/sites-enabled/example:
server {
    listen 80;
    server_name example.com;
    root /var/www/example.com/html;
    location /api/ { proxy_pass http://127.0.0.1:3999; }
}
~~~

كل ملف بيبدأ بسطر [[# configuration file ...]]، فتعرف البلوك جاي منين. وفي التجربة طلع كمان نفس الكلمة في ملف [[default]] بس جوه تعليق ([[#	server_name example.com;]])، فاتأكد إن اللي بتقراه مش متعلّق.

---

## ٦. [[sed]] بيشغّل debug

~~~bash
sudo sed -i 's/error_log .*/error_log \/var\/log\/nginx\/error.log debug;/' /etc/nginx/nginx.conf && sudo nginx -s reload
~~~

[[s/error_log .*/.../]]: أي سطر فيه [[error_log ]] وبعده أي حاجة يتبدّل بـ [[error_log /var/log/nginx/error.log debug;]]. و [[\/]] يعني [[/]] عادية جوه النص (من غير [[\]] كانت هتتفهم نهاية الجزء). و [[nginx -s reload]] ([[-s]] = signal) زي [[systemctl reload]].

~~~text grep -n error_log nginx.conf
قبل:  4:error_log /var/log/nginx/error.log;
بعد:  4:error_log /var/log/nginx/error.log debug;
~~~

طلب واحد على [[/nope.html]] كتب **١٠٨ سطر**، منهم:

~~~text error.log
[debug] *61 test location: "/api/"
[debug] *61 using configuration ""
[debug] *61 http filename: "/var/www/example.com/html/nope.html"
[debug] *61 http finalize request: 404, "/nope.html?" a:1, c:1
~~~

يعني: جرّب location [[/api/]] ومنفعش، فاستخدم إعداد الـ server نفسه ([[""]])، ودوّر على الملف ده، وخلّص بـ 404. ده بيحل مشاكل «أنهي location اتاختار».

> مستوى [[debug]] بيشتغل بس لو Nginx مبني بـ [[--with-debug]] (بتاع أوبونتو مبني بيه). ورجّعه زي ما كان بعد دقيقة: ١٠٨ سطر للطلب الواحد بيملوا الديسك.

---

## الخلاصة

| الخطوة | الأمر |
|---|---|
| السبب | [[tail -50 error.log]] |
| بيتكرر قد إيه | [[grep -c " 502 " access.log]] |
| جرّب البلوك من السيرفر | [[curl -sI -H "Host: ..." http://127.0.0.1/]] |
| صلاحيات | [[sudo -u www-data ls]] و [[namei -l]] |
| الإعداد الفعلي | [[nginx -T]] |
| كل قرار | [[error_log ... debug]] مؤقتًا |`,
          lines: [
            "آخر ٥٠ خطأ: الرسالة بتقول السبب.",
            "كام 502 في اللوج.",
            "اختبر بلوك معين من على السيرفر.",
            "جرّب القراية كيوزر Nginx: Permission denied = 403.",
            "الإعدادات الفعلية للبلوك ده.",
            "شغّل debug مؤقتًا (رجّعه warn بعدين)."
          ],
          sol: R`لو المشكلة صلاحيات، [[sudo -u www-data ls -la /var/www/example.com/html/]] بيطبع [[ls: cannot access '/var/www/example.com/html/': Permission denied]] (أو [[cannot open directory]]). و [[error.log]] فيه سطر زي [[open() "/var/www/example.com/html/index.html" failed (13: Permission denied)]] أو [[stat() ... failed (13: Permission denied)]]. جربتها بموقع في فولدر مقفول وطلعت نفس الرسالة بالظبط.

الحل: كل فولدر في المسار محتاج [[x]] للآخرين، والملفات [[r]]: [[sudo chmod o+x /var /var/www /var/www/example.com]] و [[sudo chmod -R o+rX /var/www/example.com/html]]. وأداة [[namei -l /var/www/example.com/html/index.html]] بتوري صلاحيات كل فولدر في المسار.

لو [[ls]] اشتغل عادي والمشكلة لسه 403: غالبًا مفيش [[index.html]] ومفيش [[autoindex]]، واللوج بيقول [[directory index of ... is forbidden]]. والغلط الشائع: [[chmod 777]] على كل حاجة؛ مش محتاج، و [[o+rX]] كفاية.`
        }
      ]
    }
]);
