// تكملة تاب vps: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/vps/01.js (شرح حقول الدرس في أوله)
MORE("vps", [
    {
      t: "SSL بـ Certbot",
      l: 2,
      n: "HTTPS مجاني من Let's Encrypt",
      items: [
        {
          cmd: "certbot",
          title: "شهادة وتجديد أوتوماتيك",
          desc: "الدومين لازم يكون بيشاور على IP السيرفر الأول (اتأكد بـ [[dig]])، وبورت 80 مفتوح. certbot بيعدّل ملف Nginx لوحده ويضيف HTTPS، والتجديد بيحصل أوتوماتيك بـ timer.",
          example: R`dig +short example.com
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d example.com -d www.example.com
sudo certbot certificates
sudo certbot renew --dry-run
systemctl list-timers | grep certbot`,
          try: "لو عندك دومين، وجّه subdomain فاضي (زي test.) لسيرفر التجربة واعمله شهادة.",
          deep: {
            why: "من غير HTTPS المتصفح بيكتب «Not secure» جنب موقعك، وبيانات الزوار (باسوردات وفورمات) بتتبعت مكشوفة، وجوجل بيقلل ترتيبك. certbot بيجيبلك شهادة مجانية ويظبط كل حاجة.",
            how: R`HTTPS محتاج «شهادة»، ودي ملف بيثبت إن السيرفر ده فعلًا صاحب الدومين، وموقّعة من جهة المتصفحات بتثق فيها. Let's Encrypt جهة بتدّي الشهادات دي مجانًا، و certbot البرنامج اللي بيكلّمها.

عشان Let's Encrypt تتأكد إنك صاحب الدومين، بتعمل اختبار: بتطلب من السيرفر اللي الدومين بيشاور عليه يرد بكود معين على بورت 80. لو رد صح، يبقى انت مسيطر على الدومين. عشان كده لازم الـ DNS يكون بيشاور على السيرفر الأول، وبورت 80 مفتوح.

و [[--nginx]] بيخلي certbot يعمل الاختبار، وياخد الشهادة، ويعدّل ملف Nginx لوحده ويضيف HTTPS، ويحوّل http لـ https.

الشهادات صالحة ٩٠ يوم بس (عن قصد، عشان لو اتسرقت متعيشش كتير). و Let's Encrypt بتقلّل المدة تدريجيًا لحد ٤٥ يوم في ٢٠٢٨، فالتجديد الأوتوماتيك لازم يكون شغال. و certbot بيسطّب مهمة بتتشغّل مرتين في اليوم وتجدد أي شهادة فاضلها أقل من ٣٠ يوم. و [[renew --dry-run]] بيجرّب التجديد من غير ما يجدد فعلًا، عشان تتأكد إنه هيشتغل.`,
            when: "كل موقع على السيرفر، أول ما الدومين يشاور عليه.",
            mistakes: "تشغيل certbot قبل ما الـ DNS يتنشر، فيفشل. استنى لحد ما [[dig +short]] يطلّع IP سيرفرك. وقفل بورت 80 في الفايروول «عشان HTTPS بس»، فالتجديد يفشل بعد ٣ شهور والموقع يقع."
          },
          teach: R`## ٦ أوامر: اتأكد، سطّب، خد الشهادة، اعرضها، جرّب التجديد، اتأكد من الـ timer

### إزاي اتجرّب من غير دومين حقيقي

Let's Encrypt مش هتدّيني شهادة لـ [[example.com]]. فعملت محاكاة كاملة بنفس البرامج: **Pebble**، وده سيرفر شهادات للتجربة من Let's Encrypt نفسها بيتكلم نفس البروتوكول (ACME)، و DNS وهمي بيرد على أي دومين بـ IP السيرفر [[203.0.113.10]]. والسيرفر كونتينر [[ubuntu:24.04]] فيه Nginx وموقع [[myapp]] من درس Nginx، و certbot [[2.9.0]]. الفرق الوحيد عن الحقيقة إني ضفت [[--server https://pebble:14000/dir]] لأوامر certbot عشان تكلم Pebble بدل Let's Encrypt. كل الناتج تحت حقيقي من المحاكاة دي.

---

## ١. [[dig +short example.com]]

[[dig]] بيسأل الـ DNS: الدومين ده بيشاور على أنهي IP؟ و [[+short]] اطبع الإجابة بس من غير التفاصيل. في المحاكاة سألت الـ DNS الوهمي ([[@203.0.113.53 -p 8053]]):

~~~text الناتج
203.0.113.10
~~~

لازم يطلع IP سيرفرك. ليه؟ لأن Let's Encrypt هتروح للدومين ده وتطلب ملف معيّن على بورت 80، ولو الدومين بيشاور على مكان تاني، الاختبار هيفشل. ولو مطلعش حاجة خالص، يبقى الـ DNS لسه متنشرش: استنى.

---

## ٢. [[sudo apt install -y certbot python3-certbot-nginx]]

باكدجين: [[certbot]] نفسه، و [[python3-certbot-nginx]] الإضافة اللي بتخليه يقرا ويعدّل ملفات Nginx (certbot مكتوب بـ Python).

~~~text الناتج (مختصر)
0 upgraded, 16 newly installed, 0 to remove and 2 not upgraded.
Setting up certbot (2.9.0-1) ...
Setting up python3-certbot-nginx (2.9.0-1) ...
~~~

---

## ٣. [[sudo certbot --nginx -d example.com -d www.example.com]]

| الحتة | معناها |
|---|---|
| [[--nginx]] | استخدم إضافة Nginx: اعمل الاختبار من خلاله، وركّب الشهادة فيه |
| [[-d example.com]] | domain: الشهادة للدومين ده |
| [[-d www.example.com]] | وده كمان. شهادة واحدة للاتنين |

أول مرة بيسألك إيميل وموافقة على الشروط (في المحاكاة كتبتهم في الأمر: [[-m]] و [[--agree-tos]] و [[--no-eff-email]]):

~~~text الناتج
Account registered.
Requesting a certificate for example.com and www.example.com

Successfully received certificate.
Certificate is saved at: /etc/letsencrypt/live/example.com/fullchain.pem
Key is saved at:         /etc/letsencrypt/live/example.com/privkey.pem
This certificate expires on 2027-01-04.
These files will be updated when the certificate renews.
Certbot has set up a scheduled task to automatically renew this certificate in the background.

Deploying certificate
Successfully deployed certificate for example.com to /etc/nginx/sites-enabled/myapp
Successfully deployed certificate for www.example.com to /etc/nginx/sites-enabled/myapp
Congratulations! You have successfully enabled HTTPS on https://example.com and https://www.example.com
~~~

### إيه اللي حصل في النص؟

1. certbot حط في Nginx إعداد مؤقت بيرد على مسار [[/.well-known/acme-challenge/...]] بكود سري.
2. سيرفر الشهادات جاب الكود ده من [[http://example.com]]. نجح، يبقى انت مسيطر على الدومين.
3. اتبعتت الشهادة واتحفظت.

| الملف | فيه إيه |
|---|---|
| [[fullchain.pem]] | الشهادة + شهادة الجهة اللي وقّعتها. ده اللي بيتبعت للمتصفح |
| [[privkey.pem]] | المفتاح السري. محدش يشوفه غيرك |

و [[live/example.com/]] فيه لينكات بتتحدث لوحدها لآخر نسخة مع كل تجديد.

### ملف Nginx بعد certbot

certbot عدّل ملف [[myapp]] لوحده (السطور اللي عليها [[# managed by Certbot]]):

~~~text /etc/nginx/sites-available/myapp بعد certbot (مختصر)
server {
    server_name example.com www.example.com;
    location / { ... }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
}
server {
    if ($host = example.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot
    listen 80;
    server_name example.com www.example.com;
    return 404; # managed by Certbot
}
~~~

البلوك الأول بقى على 443 بالشهادة. والتاني الجديد على 80: أي حد يجي بـ http يتحوّل لـ https ([[301]] = تحويل دايم). جربت من اللابتوب:

~~~text curl -I -H "Host: example.com" http://203.0.113.10/about
HTTP/1.1 301 Moved Permanently
Location: https://example.com/about
~~~

و https وصل للتطبيق، والتطبيق شايف [[X-Forwarded-Proto: https]] بدل [[http]].

---

## ٤. [[sudo certbot certificates]]

~~~text الناتج
Found the following certs:
  Certificate Name: example.com
    Serial Number: 660db7c9692db204
    Key Type: ECDSA
    Domains: example.com www.example.com
    Expiry Date: 2027-01-04 12:09:07+00:00 (VALID: 89 days)
    Certificate Path: /etc/letsencrypt/live/example.com/fullchain.pem
    Private Key Path: /etc/letsencrypt/live/example.com/privkey.pem
~~~

أهم سطر [[Expiry Date]]: بتخلص إمتى، و [[VALID: 89 days]] فاضلها قد إيه. الشهادة مدتها ٩٠ يوم بس.

---

## ٥. [[sudo certbot renew --dry-run]]

[[renew]] جدّد أي شهادة فاضلها أقل من ٣٠ يوم. و [[--dry-run]] اعمل البروفة كلها (الاختبار وطلب الشهادة) على سيرفر تجربة، ومتحفظش حاجة:

~~~text الناتج
Processing /etc/letsencrypt/renewal/example.com.conf
Simulating renewal of an existing certificate for example.com and www.example.com
Congratulations, all simulated renewals succeeded:
  /etc/letsencrypt/live/example.com/fullchain.pem (success)
~~~

[[renewal/example.com.conf]] ملف certbot حافظ فيه كل اللي يلزم عشان يجدد لوحده بنفس الطريقة.

### لو بورت 80 مقفول

قفلت 80 في ufw وطلبت شهادة لـ [[test.example.com]]:

~~~text الناتج (من Pebble)
Certbot failed to authenticate some domains (authenticator: nginx). The Certificate Authority reported these problems:
  Domain: test.example.com
  Type:   connection
  Detail: Get "http://test.example.com:80/.well-known/acme-challenge/...": context deadline exceeded (Client.Timeout exceeded while awaiting headers)
~~~

سيرفر الشهادات مقدرش يوصل. مع Let's Encrypt الحقيقية الرسالة بتبقى [[Timeout during connect (likely firewall problem)]]. وده نفس اللي هيحصل للتجديد بعد شهرين لو قفلت 80، عشان كده سيبه مفتوح.

---

## ٦. [[systemctl list-timers | grep certbot]]

[[list-timers]] كل المنبهات بتاعة systemd، و [[grep certbot]] سيب بتاعه بس:

~~~text الناتج
Wed 2026-10-07 01:18:42 EEST  10h  -  -  certbot.timer  certbot.service
~~~

الميعاد الجاي، وفاضل قد إيه، وآخر مرة (لسه [[-]])، والـ timer، والخدمة اللي بيشغّلها. والـ timer مظبوط كده:

~~~text /usr/lib/systemd/system/certbot.timer (جزء)
OnCalendar=*-*-* 00,12:00:00
RandomizedDelaySec=43200
~~~

يعني مرتين في اليوم (الساعة ١٢ بالليل و ١٢ الضهر)، ومتأخر وقت عشوائي لحد ١٢ ساعة عشان كل السيرفرات متكلمش Let's Encrypt في نفس الثانية.

> في كونتينر Docker الـ timer مكانش شغال بعد التسطيب (الصورة بتمنع تشغيل الخدمات وقت التسطيب)، فشغّلته بـ [[systemctl start certbot.timer]]. على VPS بيشتغل لوحده، بس اتأكد بالأمر ده برضه.

---

## الخلاصة

| الخطوة | الأمر | لو تمام |
|---|---|---|
| ١ | [[dig +short example.com]] | IP سيرفرك |
| ٢ | [[apt install certbot python3-certbot-nginx]] | |
| ٣ | [[certbot --nginx -d ... -d ...]] | [[Congratulations!]] |
| ٤ | [[certbot certificates]] | [[VALID: 89 days]] |
| ٥ | [[certbot renew --dry-run]] | [[all simulated renewals succeeded]] |
| ٦ | [[systemctl list-timers | grep certbot]] | ميعاد قريب |`,
          lines: [
            "اتأكد الأول إن الدومين بيشاور على IP السيرفر ده.",
            "سطّب certbot والإضافة بتاعة Nginx.",
            "خد شهادة للدومين بالـ www ومن غيرها ([[-d]] لكل دومين)، وخلّيه يظبط Nginx لوحده.",
            "اعرض الشهادات اللي عندك وبتخلص إمتى.",
            "جرّب التجديد من غير ما تجدد فعلًا.",
            "اتأكد إن مهمة التجديد الأوتوماتيك موجودة."
          ],
          sol: R`[[sudo certbot --nginx -d test.example.com]] بيسأل إيميل والموافقة أول مرة، وفي الآخر [[Successfully received certificate.]] و [[Certificate is saved at: /etc/letsencrypt/live/test.example.com/fullchain.pem]] و [[Successfully deployed certificate for test.example.com to /etc/nginx/sites-enabled/...]].

[[sudo certbot certificates]] بيوري [[Expiry Date: ... (VALID: 89 days)]]، و [[certbot renew --dry-run]] بيخلص بـ [[Congratulations, all simulated renewals succeeded]]. وفي المتصفح القفل ظاهر.

ماعنديش دومين هنا، فجربتها على محاكاة: سيرفر الشهادات التجريبي Pebble (من Let's Encrypt) و DNS وهمي، وطلعت نفس الرسايل دي و [[VALID: 89 days]]. الغلط الشائع: [[Timeout during connect (likely firewall problem)]]: بورت 80 مقفول في ufw أو firewall المزود. و [[DNS problem: NXDOMAIN]]: الـ subdomain لسه مش متسجل أو [[dig +short test.example.com]] مش بيرجّع IP السيرفر. استنى الـ DNS قبل ما تكرر، عشان rate limit.`
        },
        {
          cmd: "certbot --webroot",
          title: "شهادة من container والموقع شغال",
          desc: "لما Nginx جوه Docker، [[certbot --nginx]] مينفعش. [[certonly --webroot]] بيكتب ملف التحدي في فولدر مشترك مع Nginx، فالموقع ميقفش ولا ثانية. قبلها اتأكد إن الدومين بيشاور على السيرفر ده، وجرّب بـ [[--dry-run]] الأول عشان المحاولات الفاشلة متتحسبش من حد Let's Encrypt.",
          example: R`curl -4 -s https://api.ipify.org; echo
getent ahostsv4 example.com | awk '{print $1; exit}'
mkdir -p certbot/www certbot/conf
docker compose up -d nginx
docker compose run --rm --entrypoint certbot certbot certonly --webroot -w /var/www/certbot \
  --email you@example.com --agree-tos --no-eff-email --dry-run \
  -d example.com -d www.example.com
ls certbot/conf/live/example.com/`,
          try: "على سيرفر التجربة بدومين فرعي: شغّل الأمر بـ [[--dry-run]]، ولما يقول successful شيلها وشغّله تاني، وبعدين [[ls]] يوريك fullchain.pem و privkey.pem.",
          deep: {
            why: "certbot العادي بيعدّل ملفات Nginx على الهوست ويعمله reload. لو Nginx جوه container، certbot مش شايفه. webroot بيفصل الاتنين: certbot يكتب ملف، و Nginx يقدمه، وكل واحد في container لوحده.",
            how: R`أول سطرين: IP السيرفر العام، و IP اللي الدومين بيشاور عليه. لازم يبقوا زي بعض. لو مختلفين، certbot هيفشل، وكل فشل بيتحسب (حد Let's Encrypt ٥ محاولات فاشلة في الساعة لنفس الدومين).

في [[docker-compose.yml]] service اسمها certbot من image [[certbot/certbot]]، راكب فيها [[./certbot/www:/var/www/certbot]] و [[./certbot/conf:/etc/letsencrypt]]، ونفس الفولدرين راكبين في Nginx. و Nginx لازم يكون شغال بإعداد HTTP فيه بلوك [[/.well-known/acme-challenge/]] (شرحه في تاب nginx).

[[compose run --rm certbot certonly]]: شغّل container مؤقت من الـ service دي بالأمر ده، وامسحه بعد ما يخلص. و [[--entrypoint certbot]] عشان لو الـ service عاملة entrypoint لوب التجديد (تحت)، الأمر ده يتنفذ فعلًا بدل ما اللوب يشتغل ويتجاهله. [[--webroot -w]]: اكتب ملف التحدي هنا. [[--agree-tos --no-eff-email]]: من غير أسئلة.

[[--dry-run]]: يجرّب كل حاجة على سيرفر الاختبار بتاع Let's Encrypt ومبيحفظش شهادة. لما ينجح، شيله وشغّل تاني.

بعد الشهادة: حط إعداد Nginx الكامل بالـ 443 و [[docker compose up -d]]. والتجديد: service الـ certbot تشتغل بـ [[entrypoint]] لوب فيه [[certbot renew]] كل ١٢ ساعة، و Nginx يعمل reload كل كام ساعة عشان يقرا الشهادة الجديدة.

و Let's Encrypt وقفت إيميلات التحذير قبل الانتهاء في 2025، فمحدش هيقولك لو التجديد فشل. راقب تاريخ الانتهاء بنفسك (تاب التشخيص، شهادة SSL).`,
            when: "أول شهادة لأي موقع Nginx بتاعه جوه Docker.",
            mistakes: "في مشروع حقيقي سكربت أول شهادة كان من غير [[set -e]]، وبيوقف Nginx بـ [[docker compose down nginx]] (ده بيمسح الـ container مش بيوقفه بس، الصح [[stop]])، ومفيش تجربة الأول فكل غلطة في الـ DNS بتتحسب من الحد. وسكربت تاني كان بيضيف www من غير ما يتأكد إن ليها DNS، فالطلب كله يفشل عشان دومين واحد."
          },
          teach: R`## الفكرة: certbot يكتب ملف، و Nginx يقدّمه

مع [[--webroot]]، certbot مش بيلمس Nginx خالص. بيكتب ملف التحدي في فولدر، و Nginx (اللي في container تاني) بيقدّم الفولدر ده على مسار [[/.well-known/acme-challenge/]]. الاتنين شايفين نفس الفولدر لأنه **volume مشترك**.

### إزاي اتجرّب

نفس محاكاة درس certbot: سيرفر الشهادات التجريبي **Pebble** (من Let's Encrypt) و DNS وهمي بيقول إن [[example.com]] و [[www]] على IP كونتينر الـ Nginx. والمشروع compose فيه خدمتين، والفرق الوحيد عن الحقيقة إني ضفت [[--server https://pebble:14000/dir]] لأمر certbot:

~~~text compose.yml (الجزء المهم)
services:
  nginx:
    image: nginx:alpine
    volumes:
      - ./nginx/default.conf:/etc/nginx/conf.d/default.conf:ro
      - ./certbot/www:/var/www/certbot:ro
      - ./certbot/conf:/etc/letsencrypt:ro
  certbot:
    image: certbot/certbot
    entrypoint: ["/bin/sh", "-c", "trap exit TERM; while :; do certbot renew; sleep 12h & wait $$$__{!}; done"]
    volumes:
      - ./certbot/www:/var/www/certbot
      - ./certbot/conf:/etc/letsencrypt
~~~

نفس الفولدرين ([[./certbot/www]] و [[./certbot/conf]]) راكبين في الاتنين. و [[:ro]] (read-only) في Nginx: يقرا بس. والـ [[entrypoint]] بتاع certbot لوب: جدّد، نام ١٢ ساعة، كرر.

~~~text nginx/default.conf
server {
    listen 80;
    server_name example.com www.example.com;
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }
    location / {
        return 200 "http ok\n";
    }
}
~~~

[[root /var/www/certbot]] معناها: طلب [[/.well-known/acme-challenge/abc]] رد عليه بالملف [[/var/www/certbot/.well-known/acme-challenge/abc]].

---

## ١. [[curl -4 -s https://api.ipify.org; echo]]

| الحتة | معناها |
|---|---|
| [[-4]] | استخدم IPv4 بس |
| [[-s]] | من غير شريط تحميل |
| [[api.ipify.org]] | موقع بيرد عليك بالـ IP العام اللي جيت منه |
| [[; echo]] | بعد ما يخلص اطبع سطر جديد |

الرد رقم بالشكل [[N.N.N.N]] **من غير** سطر جديد في آخره، فمن غير [[echo]] الـ prompt بتاعك بييجي لازق فيه. على VPS ده IP السيرفر. (جربته من كونتينر، وطبع IP البيت، فمش هكتبه هنا.)

---

## ٢. [[getent ahostsv4 example.com | awk '{print $1; exit}']]

[[getent]] بيسأل النظام عن اسم بنفس الطريقة اللي البرامج بتسأل بيها (الـ DNS وملف [[/etc/hosts]])، و [[ahostsv4]] عناوين IPv4:

~~~text getent ahostsv4 example.com
203.0.113.20    STREAM example.com
203.0.113.20    DGRAM
203.0.113.20    RAW
~~~

نفس العنوان ٣ مرات، لنوع اتصال مختلف كل مرة. و [[awk '{print $1; exit}']]: اطبع أول خانة من أول سطر واخرج:

~~~text الناتج
203.0.113.20
~~~

السطر ده لازم يساوي ناتج السطر ١. لو مختلفين، متكمّلش.

---

## ٣. [[mkdir -p certbot/www certbot/conf]]

[[mkdir]] اعمل فولدر، و [[-p]] (parents) اعمل الفولدرات اللي فوقه لو مش موجودة، ومتشتكيش لو موجود أصلًا. فولدرين: ملفات التحدي، والشهادات.

---

## ٤. [[docker compose up -d nginx]]

شغّل خدمة [[nginx]] بس، في الخلفية ([[-d]]):

~~~text الناتج
 Container vps01-webroot-nginx-1 Created
 Container vps01-webroot-nginx-1 Started
~~~

---

## ٥. الأمر الطويل (٣ سطور)

الـ [[\]] في آخر السطر معناها «الأمر مكمّل في السطر اللي تحت». نفكه:

| الحتة | معناها |
|---|---|
| [[docker compose run]] | اعمل container **جديد** من خدمة وشغّل فيه أمر |
| [[--rm]] | امسحه لما يخلص |
| [[--entrypoint certbot]] | شغّل certbot على طول، مش اللوب اللي في compose.yml |
| [[certbot]] (التاني) | اسم الخدمة في compose.yml |
| [[certonly]] | خد الشهادة بس، متعدّلش إعداد أي سيرفر |
| [[--webroot -w /var/www/certbot]] | اكتب ملف التحدي في الفولدر ده |
| [[--email you@example.com]] | إيميل الحساب |
| [[--agree-tos]] | موافق على الشروط (من غير سؤال) |
| [[--no-eff-email]] | متشتركش في نشرة EFF (من غير سؤال) |
| [[--dry-run]] | بروفة: على سيرفر تجربة، ومتحفظش شهادة |
| [[-d ... -d ...]] | الدومينات |

~~~text الناتج مع --dry-run
Saving debug log to /var/log/letsencrypt/letsencrypt.log
Account registered.
Simulating a certificate request for example.com and www.example.com
The dry run was successful.
~~~

وفي لوج Nginx شفت سيرفر الشهادات وهو بيجيب الملف:

~~~text docker compose logs nginx (سطر)
"GET /.well-known/acme-challenge/raASbmKopOVk... HTTP/1.1" 200 87 "-" "LetsEncrypt-Pebble-VA (linux; amd64)"
~~~

ولما نجح، شغّلته تاني **من غير** [[--dry-run]]:

~~~text الناتج
Requesting a certificate for example.com and www.example.com
Successfully received certificate.
Certificate is saved at: /etc/letsencrypt/live/example.com/fullchain.pem
Key is saved at:         /etc/letsencrypt/live/example.com/privkey.pem
This certificate expires on 2027-01-04.
~~~

المسار ده **جوه الـ container**. على السيرفر هو [[./certbot/conf/live/example.com/]] عشان الـ volume.

---

## ٦. [[ls certbot/conf/live/example.com/]]

~~~text الناتج
README  cert.pem  chain.pem  fullchain.pem  privkey.pem
~~~

| الملف | فيه |
|---|---|
| [[cert.pem]] | شهادتك لوحدها |
| [[chain.pem]] | شهادة الجهة الوسيطة اللي وقّعت |
| [[fullchain.pem]] | الاتنين مع بعض، وده اللي تحطه في [[ssl_certificate]] |
| [[privkey.pem]] | المفتاح السري، ده اللي في [[ssl_certificate_key]] |

---

## الخلاصة

| الخطوة | الهدف |
|---|---|
| ١ و ٢ | IP السيرفر = IP الدومين؟ لو لأ، وقّف |
| ٣ و ٤ | فولدرات مشتركة، و Nginx شغال على 80 بمسار التحدي |
| ٥ بـ [[--dry-run]] | بروفة ببلاش (مش بتتحسب من حدود Let's Encrypt) |
| ٥ من غيره | الشهادة الحقيقية |
| ٦ | الملفات موجودة؟ |

> بعدها ضيف بلوك 443 في Nginx بالمسارين [[/etc/letsencrypt/live/example.com/fullchain.pem]] و [[privkey.pem]]، و [[docker compose up -d]].`,
          lines: [
            "IP السيرفر العام (IPv4).",
            "IP اللي الدومين بيشاور عليه. لازم يبقى نفسه.",
            "فولدر التحدي وفولدر الشهادات (راكبين في Nginx و certbot).",
            "Nginx شغال بإعداد HTTP فيه مسار التحدي.",
            "certbot في container مؤقت (والـ entrypoint هو certbot نفسه مش لوب التجديد)، بطريقة webroot...",
            "...من غير أسئلة، وتجربة بس (--dry-run).",
            "الدومين بالـ www ومن غيرها.",
            "الشهادة اتحفظت هنا."
          ],
          sol: R`مع [[--dry-run]] الناتج بيخلص بـ [[The dry run was successful.]]، ومفيش شهادة اتحفظت. من غيره: [[Successfully received certificate.]] و [[Certificate is saved at: /etc/letsencrypt/live/example.com/fullchain.pem]] (المسار جوه الـ container)، و [[ls certbot/conf/live/example.com/]] بيوري [[README cert.pem chain.pem fullchain.pem privkey.pem]].

أول سطرين في المثال لازم يطلعوا نفس الـ IP: IP السيرفر من [[api.ipify.org]]، و IP الدومين من [[getent]]. لو مختلفين، مفيش داعي تكمّل.

جربتها على محاكاة (سيرفر الشهادات التجريبي Pebble و DNS وهمي و compose فيه nginx و certbot)، وطلع [[The dry run was successful.]] وبعدها الملفات الخمسة دي بالظبط. الغلط الشائع: [[Invalid response from http://example.com/.well-known/acme-challenge/...: 404]]: الـ webroot في certbot ([[-w /var/www/certbot]]) مش نفس الفولدر اللي nginx بيخدم منه المسار ده، أو الـ volume مش مشترك بين الاتنين. و [[ls]] يقول [[Permission denied]] لأن الملفات ملك root: استخدم [[sudo ls]].`
        },
        {
          cmd: "certbot --standalone",
          title: "شهادة لما Nginx جوه Docker ماسك بورت 80",
          desc: "[[--standalone]] بيشغّل سيرفر صغير بتاعه على بورت 80 للتحدي، فلازم Nginx يقف ثواني. الصح إنك تدّي certbot أوامر الإيقاف والتشغيل كـ [[--pre-hook]] و [[--post-hook]]، فيتحفظوا مع الشهادة ويتنفذوا لوحدهم في كل تجديد.",
          example: R`sudo certbot certonly --standalone --non-interactive --agree-tos \
  --email you@example.com -d example.com -d www.example.com \
  --pre-hook "cd /srv/myapp && docker compose stop frontend" \
  --post-hook "cd /srv/myapp && docker compose start frontend"
sudo grep -E "authenticator|hook" /etc/letsencrypt/renewal/example.com.conf
systemctl list-timers | grep certbot
sudo certbot renew --dry-run`,
          try: "بعد ما تاخد الشهادة، [[renew --dry-run]] لازم يقول success، وتلاحظ إن الموقع وقف ثواني ورجع (الـ hooks اشتغلت).",
          deep: {
            why: "أسهل من webroot لو مش عايز تلمس إعداد Nginx، بس فيه فخ: التجديد بعد شهرين هيحتاج بورت 80 فاضي تاني. لو محدش بيوقف Nginx وقتها، التجديد يفشل بصمت والموقع يقع يوم الانتهاء.",
            how: R`[[certonly]]: خد الشهادة بس ومتعدّلش أي إعداد. [[--standalone]]: certbot يرد على التحدي بنفسه على بورت 80. [[--non-interactive]]: من غير أسئلة، عشان يشتغل في سكربت.

[[--pre-hook]] بيتنفذ قبل ما يطلب الشهادة (يوقف container الـ Nginx)، و [[--post-hook]] بعدها (يشغّله تاني). ومش بيتنفذوا غير لو فيه شهادة فعلًا هتتطلب. الأهم: certbot بيحفظهم في [[/etc/letsencrypt/renewal/example.com.conf]]، فالـ timer اللي بيجدد مرتين في اليوم بيستخدمهم لوحده. الأمر التاني بيتأكد إنهم اتحفظوا.

container الـ Nginx يركّب [[/etc/letsencrypt:/etc/letsencrypt:ro]] ويقرا الشهادة من [[live/]] مباشرة، بدل ما تنسخ الملفات. ولما يقوم بعد الـ post-hook بيقرا الجديدة.

ولو عملت التجديد بـ cron بنفسك: ملف في [[/etc/cron.d/]] فيه عمود زيادة لاسم اليوزر، زي [[0 3 * * * root certbot renew -q]]، والملف لازم ملك root وصلاحياته 644 واسمه من غير نقط. و [[--deploy-hook]] (بيتنفذ بس لو الشهادة اتجددت فعلًا) هو المكان الصح لأي نسخ أو reload.`,
            when: "Nginx جوه Docker وعايز شهادة من غير ما تغيّر إعداده. لو ثواني توقف مش مقبولة، استخدم webroot.",
            mistakes: "في مشروع حقيقي cron التجديد كان بيشغّل [[certbot renew --quiet]] بطريقة standalone و Nginx لسه ماسك بورت 80، فالتجديد بيفشل بصمت (بسبب [[--quiet]]) والشهادة كانت هتخلص بعد ٩٠ يوم. وكان بينسخ الشهادات ويعمل restart لـ Nginx كل يوم حتى من غير تجديد، بدل [[--deploy-hook]]. وسكربت الإصلاح كان بيستخدم [[--force-renewal]] كل مرة، ده بيقرّبك من حد Let's Encrypt (٥ شهادات لنفس الدومينات في الأسبوع)."
          },
          teach: R`## certbot يمسك بورت 80 بنفسه، فلازم حد يفضّيه

مع [[--standalone]] مفيش Nginx في الصورة وقت التحدي: certbot بيشغّل سيرفر ويب صغير بتاعه على بورت 80 لثواني. المشكلة إن Nginx ماسك 80. فالحل: [[--pre-hook]] يوقف Nginx، و [[--post-hook]] يرجّعه، والاتنين بيتحفظوا للتجديد.

### إزاي اتجرّب

نفس محاكاة درس certbot: سيرفر الشهادات التجريبي **Pebble** و DNS وهمي، على كونتينر [[ubuntu:24.04]] فيه Nginx ماسك بورت 80 و certbot [[2.9.0]]. والسيرفر ده مفيهوش Docker، فالـ hooks عندي كانت [[systemctl stop nginx]] و [[systemctl start nginx]] بدل [[docker compose stop/start frontend]]. الفكرة واحدة بالظبط. وضفت [[--server https://pebble:14000/dir]] عشان يكلّم Pebble.

---

## ١. من غير hooks: ليه محتاجينهم؟

~~~text الناتج
Requesting a certificate for example.com and www.example.com
Could not bind TCP port 80 because it is already in use by another process on this system (such as a web server). Please stop the program in question and then try again.
~~~

[[bind]] يعني «امسك البورت ده». وبورت واحد مينفعش برنامجين يمسكوه.

---

## ٢. الأمر بالـ hooks (٤ سطور)

الـ [[\]] في آخر السطر معناها الأمر مكمّل تحت.

| الحتة | معناها |
|---|---|
| [[certonly]] | خد الشهادة بس، متعدّلش إعداد أي حاجة |
| [[--standalone]] | رد على التحدي بسيرفرك انت على بورت 80 |
| [[--non-interactive]] | متسألش أي سؤال (عشان يشتغل في سكربت). لو ناقصه معلومة يفشل بدل ما يستنى |
| [[--agree-tos]] و [[--email]] | الإجابات اللي كان هيسأل عليها |
| [[-d example.com -d www.example.com]] | الدومينات |
| [[--pre-hook "..."]] | أمر يتنفذ **قبل** التحدي |
| [[--post-hook "..."]] | أمر يتنفذ **بعده**، نجح أو فشل |

وجوه الـ hook في المثال: [[cd /srv/myapp && docker compose stop frontend]]. [[cd]] الأول عشان [[docker compose]] لازم يتشغّل من فولدر المشروع اللي فيه [[compose.yml]]، و [[stop]] (مش [[down]]) بيوقف الـ container من غير ما يمسحه. والـ hook كله بين [["..."]] عشان certbot ياخده كنص واحد.

~~~text الناتج
Requesting a certificate for example.com and www.example.com
Successfully received certificate.
Certificate is saved at: /etc/letsencrypt/live/example.com/fullchain.pem
Key is saved at:         /etc/letsencrypt/live/example.com/privkey.pem
This certificate expires on 2027-01-04.
These files will be updated when the certificate renews.
Certbot has set up a scheduled task to automatically renew this certificate in the background.
~~~

و Nginx رجع شغال لوحده بعدها ([[systemctl is-active nginx]] طبع [[active]]).

---

## ٣. [[sudo grep -E "authenticator|hook" /etc/letsencrypt/renewal/example.com.conf]]

certbot بيحفظ لكل شهادة ملف «إزاي أجددها». و [[grep -E "a|b"]] هات السطور اللي فيها أي واحدة منهم:

~~~text الناتج
pre_hook = systemctl stop nginx
post_hook = systemctl start nginx
authenticator = standalone
~~~

ده أهم سطر في الدرس: التجديد الأوتوماتيك بعد شهرين هيقرا الملف ده، فهيوقف Nginx ويرجّعه لوحده. ولو السطور دي مش موجودة، التجديد هيفشل بـ [[Could not bind TCP port 80]] من غير ما حد يعرف.

---

## ٤. [[systemctl list-timers | grep certbot]]

~~~text الناتج
Wed 2026-10-07 00:36:21 EEST  9h  -  -  certbot.timer  certbot.service
~~~

المنبّه موجود وهيشتغل بعد ٩ ساعات (مرتين في اليوم). وهو اللي هيقرا ملف الـ renewal.

---

## ٥. [[sudo certbot renew --dry-run]]

بروفة للتجديد كله، بالـ hooks:

~~~text الناتج
Processing /etc/letsencrypt/renewal/example.com.conf
Simulating renewal of an existing certificate for example.com and www.example.com
Congratulations, all simulated renewals succeeded:
  /etc/letsencrypt/live/example.com/fullchain.pem (success)
~~~

والـ hooks اشتغلت فعلًا، ده من [[/var/log/letsencrypt/letsencrypt.log]]:

~~~text الناتج
15:22:39,237:INFO:certbot.compat.misc:Running pre-hook command: systemctl stop nginx
15:22:41,582:INFO:certbot.compat.misc:Running post-hook command: systemctl start nginx
~~~

يعني الموقع وقف حوالي ثانيتين وربع. وكنت عامل curl من اللابتوب كل ربع ثانية في نفس الوقت:

~~~text الناتج (كل رقم طلب)
200 200 200 200 200 200 200 000 000 000 000 000 200 200 200 200 ...
~~~

[[000]] يعني مفيش رد خالص: ٥ طلبات فشلت ورجع.

> لما شغّلت [[renew]] من غير ترمنال (من سكربت)، certbot استنى وقت عشوائي لحد ١٠ دقايق قبل ما يبدأ ([[random delay of 352 seconds]] في اللوج)، عشان السيرفرات متضربش Let's Encrypt مع بعض. [[--no-random-sleep-on-renew]] بيلغي ده وانت بتجرّب.

---

## الخلاصة

~~~text
--standalone              certbot يمسك 80 بنفسه
--pre-hook  "وقّف nginx"   قبل
--post-hook "شغّل nginx"   بعد (حتى لو فشل)
renewal/DOMAIN.conf       لازم يبقى فيه pre_hook و post_hook
renew --dry-run           بروفة: success + الموقع يقف ثواني ويرجع
~~~`,
          lines: [
            "خد شهادة بسيرفر certbot نفسه، من غير أسئلة...",
            "...للدومين بالـ www ومن غيرها.",
            "قبل الطلب: وقّف container الـ Nginx عشان بورت 80 يفضى.",
            "بعده: شغّله تاني.",
            "اتأكد إن الطريقة والـ hooks اتحفظوا للتجديد.",
            "timer التجديد موجود؟",
            "جرّب التجديد كامل بالـ hooks."
          ],
          sol: R`[[sudo certbot renew --dry-run]] بيعمل (وبيكتب في اللوج، وعلى الشاشة لو شغّلته بـ [[-v]]) [[Running pre-hook command: cd /srv/myapp && docker compose stop frontend]]، وبعدين [[Simulating renewal of an existing certificate for example.com]]، وبعدين [[Running post-hook command: ...start frontend]]، وفي الآخر [[Congratulations, all simulated renewals succeeded]].

والموقع بيقف ثواني (لو عامل curl في لوب هتلاقي كام طلب فشلوا) ويرجع. و [[grep]] على ملف الـ renewal بيوري [[authenticator = standalone]] و [[pre_hook = ...]] و [[post_hook = ...]]، يعني التجديد الأوتوماتيك هيعمل نفس الحكاية.

جربتها على محاكاة (سيرفر الشهادات التجريبي Pebble، والـ hooks كانت [[systemctl stop/start nginx]] لأن السيرفر التجريبي مفيهوش Docker): الـ dry run نجح، وسطور [[Running pre-hook command]] و [[post-hook]] ظهرت في [[/var/log/letsencrypt/letsencrypt.log]] مش على الشاشة، والموقع وقف حوالي ثانيتين. الغلط الشائع: [[Could not bind TCP port 80 because it is already in use]]: الـ pre-hook مااشتغلش أو وقف service غلط. ولو الـ hooks ماتسجلتش في الملف (عملت الشهادة من غيرها)، ضيفهم في [[/etc/letsencrypt/renewal-hooks/pre/]] و [[post/]] كسكربتات.`
        }
      ]
    }
]);
