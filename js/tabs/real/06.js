// تكملة تاب real: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/real/01.js (شرح حقول الدرس في أوله)
MORE("real", [
    {
      t: "Docker للإنتاج",
      l: 2,
      n: "compose كامل بـ Nginx و certbot، و Dockerfile لـ Next.js و Vite، ونمط dev و prod، و Mongo",
      items: [
        {
          cmd: "compose.yml (app + nginx + certbot)",
          title: "الموقع كله في ملف واحد: التطبيق و Nginx والتجديد",
          desc: "ملف compose بيشغّل موقع كامل: التطبيق جوه الشبكة الداخلية بس، و Nginx هو الوحيد اللي ماسك 80 و 443، و certbot بيجدد كل ١٢ ساعة في فولدرات مشتركة مع Nginx، و Nginx بيعمل reload كل ٦ ساعات عشان ياخد الشهادة الجديدة.",
          example: R`services:
  app:
    build:
      context: .
      args:
        NEXT_PUBLIC_API_URL: $__{NEXT_PUBLIC_API_URL}
    env_file: .env
    environment:
      NODE_ENV: production
    expose: ["3000"]
    healthcheck:
      test: ["CMD", "node", "-e", "fetch('http://127.0.0.1:3000/api/health').then(r=>process.exit(r.ok?0:1),()=>process.exit(1))"]
      interval: 30s
    restart: unless-stopped

  nginx:
    image: nginx:1.27-alpine
    ports: ["80:80", "443:443"]
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./certbot/www:/var/www/certbot:ro
      - ./certbot/conf:/etc/letsencrypt:ro
    command: /bin/sh -c 'while :; do sleep 6h; nginx -s reload; done & exec nginx -g "daemon off;"'
    depends_on: [app]
    restart: unless-stopped

  certbot:
    image: certbot/certbot
    volumes:
      - ./certbot/www:/var/www/certbot
      - ./certbot/conf:/etc/letsencrypt
    entrypoint: /bin/sh -c 'trap exit TERM; while :; do certbot renew; sleep 12h & wait $$!; done'
    restart: unless-stopped`,
          try: "على سيرفر التجربة بعد أول شهادة: [[docker compose up -d]]، وبعدين [[ss -tlnp]]: لازم تلاقي 80 و 443 بس، ومفيش 3000. وجرّب [[docker compose exec certbot certbot renew --dry-run]].",
          flag: "script",
          deep: {
            why: "ملف واحد تعمل بيه [[up -d]] فيقوم الموقع كله بالـ SSL والتجديد، وتقدر تنقله لسيرفر تاني كما هو.",
            how: R`[[expose]] مش [[ports]]: [[expose]] بيفتح البورت للخدمات التانية في نفس الشبكة بس (Nginx يوصله بـ [[app:3000]])، ومحدش من برّه السيرفر يقدر. لو كتبت [[ports: ["3000:3000"]]] التطبيق هيبقى مكشوف للعالم من غير Nginx، يعني من غير SSL ومن غير rate limit، و ufw مش هيمنعه لأن Docker بيعدّي منه.

[[args]] وقت البناء للحاجات العامة بس ([[NEXT_PUBLIC_*]] اللي Next.js بيحطها في الجافاسكربت اللي بيروح للمتصفح أصلًا). أي سر (مفتاح قاعدة بيانات أو دفع) يتقري وقت التشغيل من [[env_file]]، لأن الـ build args بتتحفظ في طبقات الـ image.

[[healthcheck]] بـ node نفسه ([[fetch]] موجود من Node 18)، عشان صور كتير مفيهاش curl ولا wget. وده اللي بيخلي [[docker compose up --wait]] في سكربتات النشر يعرف إن التطبيق قام فعلًا.

Nginx: الشهادات والـ webroot متركّبين [[:ro]] (قراية بس)، و certbot متركّبين عنده كتابة. الـ [[command]] بيشغّل لوب في الخلفية بيعمل [[nginx -s reload]] كل ٦ ساعات، و [[exec nginx]] بيخلي nginx هو البروسيس الأساسي. ده اللي بيخلي الشهادة الجديدة تتقري.

certbot: [[certbot renew]] كل ١٢ ساعة (مش هيعمل حاجة إلا لو فاضل أقل من ٣٠ يوم). [[sleep 12h & wait $$!]] بدل [[sleep 12h]] عادي عشان الـ [[trap]] يشتغل ويقفل فورًا مع [[docker compose stop]]. و [[$$]] في compose معناها [[$]] حرفيًا (وإلا compose هيحاول يفكها كمتغير).

ولو عايز لوج وتنبيه، استبدل اللوبين دول بسكربت التجديد في cron (الدرس «تجديد الشهادة»).`,
            when: "موقع Node أو Next.js على VPS لوحده، ومفيش Nginx تاني على السيرفر.",
            mistakes: R`في مشروع حقيقي كان certbot بيجدد كل ١٢ ساعة، بس Nginx عمره ما عمل reload، فبيفضل شغال بالشهادة القديمة من الذاكرة لحد ما حد يعمل restart، والشهادة خلصت فعلًا. وكان التطبيق عليه [[ports: "5000:3000"]] فمكشوف للعالم متخطّي Nginx والـ rate limit والـ SSL. و [[NODE_ENV=development]] في الإنتاج. وأسرار السيرفر (مفتاح الإدارة لقاعدة البيانات، و secret الدفع) كانت متبعتة كـ build args، فمحفوظة جوه الـ image لأي حد يوصلها.`
          },
          teach: R`## الأول: ٣ خدمات وكل واحدة ليها شغلانة

الملف ده بيوصف ٣ containers: [[app]] (موقعك)، و [[nginx]] (الباب الوحيد اللي على الإنترنت)، و [[certbot]] (اللي بيجدد شهادة SSL). هنقرا كل خدمة سطر سطر، وبعدين نشوف الـ ٣ مع بعض شغالين.

جربت الملف ده على Docker Desktop (ويندوز) في مشروع اسمه [[teach-real03-l1]]، بتلات تغييرات صغيرة عشان مفيش دومين ولا Next.js: [[app]] سيرفر Node صغير فيه [[/api/health]]، و nginx من [[nginx:alpine]] الموجودة عندي بدل [[1.27-alpine]]، وبورته [[127.0.0.1:8380:80]] بدل 80 و 443. الباقي زي المثال بالظبط.

---

## ١. خدمة [[app]]

### [[build:]] و [[context: .]]

[[build]] معناها «الـ image دي اتبنيها انت من Dockerfile»، مش «نزّلها جاهزة». و [[context: .]] الفولدر اللي هيتبعت لـ Docker وقت البناء ([[.]] = الفولدر اللي فيه الملف). Docker بيدوّر فيه على ملف اسمه [[Dockerfile]].

### [[args:]] و [[$__{NEXT_PUBLIC_API_URL}]]

[[args]] متغيرات **وقت البناء** بس (بتوصل للـ Dockerfile عند [[ARG]]). والقيمة [[$__{NEXT_PUBLIC_API_URL}]] مش مكتوبة في الملف: compose بيدوّر عليها في متغيرات الترمنال، وبعدين في ملف اسمه [[.env]] جنب الـ compose. الـ [[.env]] عندي كان فيه:

~~~text .env
NEXT_PUBLIC_API_URL=https://example.com/api
SECRET_KEY=s3cr3t
~~~

و [[docker compose config]] (بيطبع الملف بعد ما يفك كل المتغيرات) أكّد إن القيمة وصلت:

~~~text docker compose config (جزء)
    build:
      args:
        NEXT_PUBLIC_API_URL: https://example.com/api
~~~

ليه العام بس هنا؟ لأن أي build arg بيتحفظ في تاريخ الـ image. بعد البناء [[docker history]] طلّع ده:

~~~text docker history teach-real03-l1-app
ENV NEXT_PUBLIC_API_URL=https://example.com/api
ARG NEXT_PUBLIC_API_URL=https://example.com/api
~~~

أي حد معاه الـ image يقرا القيمة. للـ URL العام ده عادي (هو أصلًا في الجافاسكربت اللي بتروح للمتصفح)، لكن لو كان سر كان هيبان بنفس الشكل.

### [[env_file: .env]] و [[environment:]]

[[env_file]] بيحط كل سطر في [[.env]] كمتغير **وقت التشغيل** جوه الـ container (ومش بيدخل الـ image). و [[environment]] متغيرات مكتوبة في الملف نفسه، هنا [[NODE_ENV: production]] اللي بيقول للمكتبات «شغّل وضع الإنتاج». الـ config طلّع الاتنين مدموجين:

~~~text docker compose config (جزء)
    environment:
      NEXT_PUBLIC_API_URL: https://example.com/api
      NODE_ENV: production
      SECRET_KEY: s3cr3t
~~~

والتطبيق شاف السر فعلًا من غير ما يتحط في الـ image: رد [[secret=set]].

### [[expose: ["3000"]]]

ده أهم سطر في الخدمة. [[expose]] بيقول «البورت 3000 مفتوح للـ containers التانية على نفس الشبكة»، **مش** لجهازك ولا للإنترنت. compose بيعمل شبكة للمشروع ([[teach-real03-l1_default]])، وكل خدمة ليها اسم جواها، فـ nginx يوصل بـ [[http://app:3000]].

جربت الاتنين:

~~~bash
docker exec teach-real03-l1-nginx-1 wget -qO- http://app:3000/api/health
curl -s -m 2 localhost:3000/ || echo "port 3000: no answer (exit $?)"
docker port teach-real03-l1-app-1
~~~

~~~text الناتج
ok
port 3000: no answer (exit 7)
~~~

من جوه الشبكة رد [[ok]]. من الجهاز نفسه [[curl]] فشل بـ exit 7 (يعني «مقدرتش أتصل»)، و [[docker port]] مطبعش ولا سطر: مفيش ولا بورت من [[app]] طالع برّه. ولو كان مكتوب [[ports: ["3000:3000"]]] كان هيرد من أي مكان، و Docker بيفتح البورت بقواعد iptables بتاعته فـ ufw مش بيمنعه.

### [[healthcheck:]]

~~~text
test: ["CMD", "node", "-e", "fetch('http://127.0.0.1:3000/api/health').then(r=>process.exit(r.ok?0:1),()=>process.exit(1))"]
~~~

اقراه حتة حتة:

| الحتة | معناها |
|---|---|
| [[CMD]] | شغّل الأمر ده مباشرة من غير shell |
| [[node -e "..."]] | [[-e]] اختصار eval: نفّذ الكود ده كـ JavaScript |
| [[fetch('http://127.0.0.1:3000/api/health')]] | اطلب صفحة الصحة من جوه الـ container نفسه |
| [[.then(r => ..., () => ...)]] | الدالة الأولى لو الطلب وصل رد، والتانية لو فشل خالص (السيرفر مش شغال) |
| [[process.exit(r.ok ? 0 : 1)]] | [[r.ok]] صح لو الكود 200 لحد 299. [[? :]] يعني «لو كذا يبقى 0 وإلا 1» |
| [[process.exit(1)]] | الاتصال نفسه فشل: 1 |

Docker مش بيفهم غير الـ exit code: 0 = healthy، غيره = فشل. جربت الأمر بإيدي:

~~~text الناتج
health exit 0       (على 3000 والسيرفر شغال)
bad port exit 1     (على 3999 مفيش حاجة)
~~~

ليه node مش [[curl]]؟ [[node:22-slim]] مفيهاش curl ولا wget خالص (جربت [[command -v]] وطلع [[no-curl]] و [[no-wget]])، و [[node:22-alpine]] فيها wget بس من busybox. لكن node نفسه أكيد موجود، و [[fetch]] جواه من Node 18.

[[interval: 30s]]: كل ٣٠ ثانية. أول فحص بيحصل بعد ٣٠ ثانية من التشغيل، فلحد ساعتها الحالة [[health: starting]]:

~~~text docker compose ps
app      Up 4 seconds (health: starting)
app      Up 35 seconds (healthy)
~~~

### [[restart: unless-stopped]]

لو البروسيس وقع أو السيرفر عمل reboot، Docker يشغّله تاني. إلا لو انت وقفته بإيدك ([[docker compose stop]]).

---

## ٢. خدمة [[nginx]]

### [[image: nginx:1.27-alpine]] و [[ports: ["80:80", "443:443"]]]

image جاهزة برقم نسخة ثابت (عشان تحديث مفاجئ ميغيّرش سلوك السيرفر). و [[ports]] هنا عكس [[expose]]: [[80:80]] يعني «بورت 80 على السيرفر يروح لـ 80 جوه الـ container». nginx هو الخدمة الوحيدة اللي ليها [[ports]]، فهو الباب الوحيد. عندي [[docker compose ps]] طلّع:

~~~text الناتج
teach-real03-l1-app-1     3000/tcp
teach-real03-l1-nginx-1   127.0.0.1:8380->80/tcp
~~~

[[3000/tcp]] من غير سهم = موجود في الـ image بس مش متوصّل بالجهاز. و [[->]] = متوصّل. و [[curl localhost:8380/]] رد من التطبيق عن طريق nginx:

~~~text الناتج
hello from app, api=https://example.com/api secret=set
~~~

### [[volumes:]] و [[:ro]]

كل سطر [[فولدر_على_السيرفر:فولدر_جوه_الcontainer]]:

| السطر | ليه |
|---|---|
| [[./nginx/nginx.conf:/etc/nginx/nginx.conf:ro]] | إعداداتك مكان الإعداد الافتراضي |
| [[./certbot/www:/var/www/certbot:ro]] | فولدر التحدي: Let's Encrypt بيطلب ملف من [[/.well-known/acme-challenge/]] و nginx بيقدّمه من هنا |
| [[./certbot/conf:/etc/letsencrypt:ro]] | الشهادات نفسها اللي nginx بيقراها |

[[:ro]] اختصار read-only. nginx محتاج يقرا بس، فلو حد اخترقه ميقدرش يغيّر الشهادات. جربت:

~~~text الناتج
nginx:   touch: /etc/letsencrypt/x: Read-only file system   (exit 1)
certbot: touch /etc/letsencrypt/x                           (exit 0)
~~~

نفس الفولدر، بس certbot متركّبله من غير [[:ro]] لأنه هو اللي بيكتب الشهادة.

### [[command:]]: الـ reload كل ٦ ساعات

~~~text
/bin/sh -c 'while :; do sleep 6h; nginx -s reload; done & exec nginx -g "daemon off;"'
~~~

نفكّه بالترتيب:

1. [[/bin/sh -c '...']]: شغّل الكلام ده كسكربت shell.
2. [[while :; do ... done]]: لوب ملوش نهاية. [[:]] أمر بيرجع 0 دايمًا (يعني «true»).
3. جوه اللوب [[sleep 6h]] (استنى ٦ ساعات) وبعدين [[nginx -s reload]]: [[-s]] اختصار signal، يعني ابعت لـ nginx الشغال إشارة «اقرا الإعدادات والشهادات تاني» من غير ما تقطع الزوار.
4. [[&]] بعد [[done]]: شغّل اللوب كله **في الخلفية** وكمّل.
5. [[exec nginx -g "daemon off;"]]: [[exec]] بيخلي nginx ياخد مكان الـ shell نفسه، فيبقى البروسيس رقم 1 في الـ container. و [[-g "daemon off;"]] بيقوله «متروحش للخلفية»، لأن لو البروسيس رقم 1 خلص، الـ container بيقف.

[[ps]] جوه الـ container أكّد الشكل ده:

~~~text docker exec teach-real03-l1-nginx-1 ps
PID   USER     COMMAND
    1 root     nginx: master process nginx -g daemon off;
    6 root     /bin/sh -c while :; do sleep 6h; nginx -s reload; done & exec nginx -g "daemon off;"
    7 root     sleep 6h
    8 nginx    nginx: worker process
~~~

PID 1 هو nginx (بسبب [[exec]])، و PID 6 هو اللوب اللي في الخلفية، وتحته [[sleep 6h]] مستني. ولما شغّلت [[nginx -s reload]] بإيدي طلع [[signal process started]] و exit 0. من غير اللوب ده، certbot يجدد الشهادة على الديسك و nginx يفضل شايل القديمة في الذاكرة لحد ما تخلص.

### [[depends_on: [app]]]

compose يشغّل [[app]] الأول. ده ترتيب **بدء** بس (الـ config بيكتبه [[condition: service_started]])، مش استنى لحد ما يبقى healthy.

---

## ٣. خدمة [[certbot]]

### [[image: certbot/certbot]] والـ volumes

الـ image الرسمية، ونفس الفولدرين بصلاحية كتابة.

### [[entrypoint:]]: التجديد كل ١٢ ساعة

~~~text
/bin/sh -c 'trap exit TERM; while :; do certbot renew; sleep 12h & wait $$!; done'
~~~

[[entrypoint]] بيستبدل أمر البداية بتاع الـ image. نفكّه:

1. [[trap exit TERM]]: [[trap]] بيقول للـ shell «لما توصلك إشارة TERM نفّذ [[exit]]». TERM هي الإشارة اللي [[docker stop]] بيبعتها.
2. [[certbot renew]]: بيبص على كل شهادة في [[/etc/letsencrypt]] ويجدد اللي قربت تخلص بس (افتراضيًا فاضل ٣٠ يوم أو أقل). من غير شهادات طبع:

~~~text docker compose logs certbot
No renewals were attempted.
~~~

3. [[sleep 12h & wait $$!]]: شغّل [[sleep]] في الخلفية، و [[$!]] رقم آخر بروسيس اتشغّل في الخلفية، و [[wait]] بيستناه.
4. [[$$]]: compose نفسه بيفك أي [[$]] كمتغير، فعشان توصل [[$]] حرفيًا للـ shell بتكتبها مرتين. وجوه الـ container وصلت صح:

~~~text docker exec teach-real03-l1-certbot-1 ps
PID   USER     COMMAND
    1 root     /bin/sh -c trap exit TERM; while :; do certbot renew; sleep 12h & wait $!; done
    8 root     sleep 12h
~~~

### ليه [[sleep & wait]] مش [[sleep]] وبس؟

الـ shell مش بينفّذ الـ trap وهو مستني أمر عادي في المقدمة؛ بيستنى الأمر يخلص الأول. لكن [[wait]] بيتقطع فورًا لما إشارة توصل. وكمان الـ shell هنا هو PID 1، و Linux مش بيطبّق على PID 1 الرد الافتراضي على TERM (اللي هو «اقفل»)، فمن غير trap مش هيقفل خالص. جربت ٣ أشكال وقست وقت [[docker stop]]:

| الشكل | وقت [[docker stop]] | exit |
|---|---|---|
| [[trap exit TERM]] + [[sleep 12h & wait $!]] | ٠.٤٥ ثانية | 143 |
| من غير trap: [[while :; do sleep 12h; done]] | ١٠.٥ ثانية | 137 |
| trap + [[sleep 12h]] من غير wait | ١٠.٥ ثانية | 137 |

الـ ١٠ ثواني دي مهلة [[docker stop]]: بعدها بيبعت KILL ويقتله غصب. 137 = 128 + 9 (KILL)، و 143 = 128 + 15 (TERM): يعني الأولى قفلت بنفسها بهدوء، والتانيتين اتقتلوا.

### [[docker compose exec certbot certbot renew --dry-run]]

[[--dry-run]] بيجرّب التجديد على سيرفر الاختبار بتاع Let's Encrypt من غير ما يغيّر حاجة. من غير شهادات طلع [[No simulated renewals were attempted.]]، ومع شهادة حقيقية المفروض يخلص بـ [[Congratulations, all simulated renewals succeeded]] (ده من الـ docs، لأنه محتاج دومين).

---

## الخلاصة

| الخدمة | بتعمل إيه | السطر المهم |
|---|---|---|
| [[app]] | موقعك | [[expose]] مش [[ports]]: محدش يوصله غير nginx |
| [[app]] | الأسرار | وقت التشغيل من [[env_file]]، والعام بس في [[args]] |
| [[app]] | «جاهز» | healthcheck بـ [[node -e fetch]] |
| [[nginx]] | الباب الوحيد | [[ports: 80 و 443]]، والشهادات [[:ro]] |
| [[nginx]] | ياخد الشهادة الجديدة | لوب [[nginx -s reload]] كل ٦ ساعات و [[exec nginx]] كـ PID 1 |
| [[certbot]] | يجدد | [[certbot renew]] كل ١٢ ساعة، و [[$$!]] = [[$!]] |
| [[certbot]] | يقفل بسرعة | [[trap exit TERM]] مع [[sleep & wait]] |`,
          lines: [
            "الخدمات.",
            "التطبيق:",
            "يتبني...",
            "...من الفولدر الحالي...",
            "...ومعاه متغيرات وقت البناء:",
            "الـ URL العام بس (بيتقري من .env اللي جنب الملف).",
            "باقي المتغيرات (والأسرار) وقت التشغيل.",
            "ومتغيرات ثابتة:",
            "وضع الإنتاج.",
            "البورت مفتوح للشبكة الداخلية بس، مش للعالم.",
            "فحص الصحة:",
            "node يطلب [[/api/health]] ويخرج 0 لو نجح و 1 لو لأ.",
            "كل ٣٠ ثانية.",
            "يقوم لوحده لو وقع أو السيرفر عمل reboot، إلا لو وقّفته بإيدك.",
            "Nginx:",
            "نسخة محددة من الـ image.",
            "الوحيد اللي ماسك 80 و 443 على السيرفر.",
            "ملفات متركّبة:",
            "الإعدادات، قراية بس.",
            "فولدر تحدي Let's Encrypt.",
            "الشهادات.",
            "لوب في الخلفية بيعمل reload كل ٦ ساعات، و nginx نفسه هو البروسيس الأساسي.",
            "يتعمل بعد التطبيق (عشان اسم app يبقى موجود).",
            "يقوم لوحده.",
            "certbot:",
            "الـ image الرسمية.",
            "نفس الفولدرات، بصلاحية كتابة:",
            "فولدر التحدي.",
            "الشهادات.",
            "لوب: جدد، واستنى ١٢ ساعة، ويقفل فورًا مع stop.",
            "يقوم لوحده."
          ],
          sol: R`بعد [[docker compose up -d]]، [[sudo ss -tlnp]] لازم يوريك [[0.0.0.0:80]] و [[0.0.0.0:443]] بس (البرنامج [[docker-proxy]]). مفيش 3000، لأن [[app]] عليه [[expose]] مش [[ports]]: البورت متاح لـ nginx جوه شبكة compose بس. لو لقيت 3000 يبقى فيه [[ports]] قديم.

[[docker compose ps]] المفروض يوريك [[app]] بحالة [[(healthy)]] بعد أول ٣٠ ثانية. و [[docker compose exec certbot certbot renew --dry-run]] لازم يخلص بـ [[Congratulations, all simulated renewals succeeded]].

الفكرة في اللوبات: certbot بيحاول يجدّد كل ١٢ ساعة (مش بيعمل حاجة غير لو فاضل أقل من ٣٠ يوم)، و nginx بيعمل reload كل ٦ ساعات عشان ياخد أي شهادة جديدة. ولو [[exec]] قال [[service "certbot" is not running]]، اتأكد إن الـ entrypoint مكتوب صح: [[$$!]] في compose بتبقى [[$!]]. (شغّلت الـ ٣ خدمات على Docker Desktop: [[app]] من غير بورت برّه، و [[$!]] وصل صح للـ shell، و [[docker stop]] على certbot خلص في نص ثانية. إصدار شهادة حقيقية و [[Congratulations]] محتاجين دومين، فدول من الـ docs.)`
        },
        {
          cmd: "Dockerfile (Next.js)",
          title: "image صغيرة لـ Next.js بـ 3 مراحل ويوزر عادي",
          desc: R`Dockerfile بـ 3 مراحل: واحدة تسطّب المكتبات، وواحدة تبني، والأخيرة فيها [[server.js]] والمكتبات اللي بيستخدمها فعلًا بس (وضع standalone). النتيجة image أصغر بكتير، وبتشتغل بيوزر عادي مش root.

ومعاها .dockerignore، لأن غلطة فيه ممكن تشيل ملفات من الـ build من غير ما تحس.`,
          example: R`# next.config.ts لازم فيه:  output: "standalone"
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL NEXT_TELEMETRY_DISABLED=1
RUN npm run build && test -f .next/standalone/server.js

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]

# ---- .dockerignore ----
node_modules
.next
.env*
screenshots/`,
          try: "ابنيه: [[docker build -t myapp .]] وشوف الحجم بـ [[docker images myapp]]. وبعدين [[docker run --rm myapp ls public]]: لازم تلاقي كل صورك. وجرّب [[docker run --rm myapp whoami]]: لازم nextjs مش root.",
          flag: "script",
          deep: {
            why: "image فيها node_modules كامل وكود المصدر بتبقى أكبر بكتير، وبتشتغل root. في مشروع Next.js صغير جربته، مرحلة البناء (كل node_modules والكود) كانت 811MB، والـ image النهائية بالـ standalone 304MB منهم 238MB هي node:22-alpine نفسها، وفيها بس اللي بيشتغل. ولو حد اخترق التطبيق مش هيبقى root جوه الـ container.",
            how: R`المرحلة الأولى [[deps]]: بتنسخ package.json والـ lockfile بس، وبعدين [[npm ci]]. طول ما الملفين دول متغيروش، Docker بياخد الطبقة دي من الكاش، فالبناء بيبقى سريع لما تغيّر الكود بس. و [[npm ci]] بيلتزم بالـ lockfile بالظبط، عكس [[npm install]] اللي ممكن يحدّثه.

المرحلة التانية [[builder]]: بتاخد node_modules من الأولى وتنسخ الكود وتبني. [[ARG]] ثم [[ENV]] للمتغيرات العامة بس: Next.js بيحط قيم [[NEXT_PUBLIC_*]] جوه الجافاسكربت وقت البناء، فلازم تبقى موجودة هنا، ومش هتنفع لو اتحطت وقت التشغيل. و [[test -f]] بيتأكد إن standalone اتعمل (لو نسيت [[output: "standalone"]] البناء هيفشل هنا بدل ما يفشل بعدين).

المرحلة الأخيرة [[runner]]: بتبدأ من image نضيفة، وتنسخ ٣ حاجات بس: [[public]]، و [[.next/standalone]] (فيها server.js و node_modules المتصغّرة)، و [[.next/static]] (standalone مش بينسخها لوحده). [[--chown]] في الـ COPY نفسه بدل [[RUN chown -R]] اللي بيعمل طبقة تانية بنفس الحجم.

[[HOSTNAME=0.0.0.0]] عشان السيرفر يسمع على كل الواجهات جوه الـ container، وإلا Nginx مش هيوصله.

.dockerignore: node_modules و .next عشان ميتنسخوش من جهازك (ويتلخبطوا مع اللي اتبنى جوه)، و [[.env*]] عشان الأسرار متدخلش الـ image أبدًا. وخد بالك إن الـ patterns فيه مش زي .gitignore: [[*.png]] بتطابق صور الجذر بس، لكن [[**/*.png]] بتطابق كل الصور في كل الفولدرات.`,
            when: "أي مشروع Next.js هتنشره بـ Docker. والـ healthcheck حطه في compose (الدرس اللي قبله).",
            mistakes: R`في مشروع حقيقي كان الـ .dockerignore فيه [[**/*.png]] عشان يشيل الـ screenshots اللي في المشروع، فصور public (اللوجو والأيقونات) اختفت من الـ build. محليًا كل حاجة شغالة، وجوه الـ container الصور بـ 404. خلي الاستبعاد لفولدر محدد.

وفي مشروع تاني كان مفتاح الإدارة لقاعدة البيانات و secret الدفع متبعتين كـ [[ARG]] و [[ENV]] في مرحلة البناء، فمحفوظين في طبقات الـ image وبيبانوا في [[docker history]]. الصح: العام بس وقت البناء، والأسرار وقت التشغيل (أو [[RUN --mount=type=secret]] لو البناء نفسه محتاجها). وكان [[npm install --legacy-peer-deps]] بيخبّي تعارضات النسخ، و [[chown -R]] بيعمل طبقة كبيرة زيادة، ومكتبات بناء تقيلة (vips-dev) في مرحلة التشغيل. وكان الـ entrypoint بيشغّل migration على قاعدة الإنتاج مع كل تشغيل container، بتوكن إدارة كامل، وكان فيه ملفين entrypoint واحد بيشاور على .js والتاني على .mjs.`
          },
          teach: R`## الأول: ٣ مراحل، والأخيرة بس هي اللي بتتشحن

Dockerfile فيه أكتر من [[FROM]] اسمه multi-stage: كل [[FROM]] بيبدأ مرحلة جديدة من الصفر، والمرحلة تقدر تاخد ملفات من اللي قبلها بـ [[COPY --from]]. الـ image اللي بتطلع في الآخر هي **آخر مرحلة بس**، والباقي بيترمي.

جربته بالظبط على Docker Desktop (ويندوز) على مشروع Next.js 16.4 صغير: صفحة واحدة فيها [[<img src="/logo.png">]] و [[public/logo.png]]، وفولدر [[screenshots/]] فيه صورة، و [[.env.local]] فيه سر. والأمر:

~~~bash
docker build -t teach-real03-next --build-arg NEXT_PUBLIC_API_URL=https://example.com/api .
~~~

[[-t]] اختصار tag (اسم الـ image)، و [[--build-arg]] بيبعت قيمة للـ [[ARG]] اللي جوه، و [[.]] الفولدر اللي هيتبعت.

---

## ٠. السطر الأول: [[output: "standalone"]]

السطر ده تعليق ([[#]])، بس هو شرط. لما [[next.config.ts]] يبقى فيه:

~~~text next.config.ts
const nextConfig = { output: "standalone" };
export default nextConfig;
~~~

[[next build]] بيعمل فولدر زيادة [[.next/standalone]] فيه [[server.js]] صغير والمكتبات اللي السيرفر بيستخدمها فعلًا بس. ده اللي هنشحنه.

---

## ١. مرحلة [[deps]]: المكتبات

~~~text
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
~~~

| السطر | معناه |
|---|---|
| [[FROM node:22-alpine AS deps]] | ابدأ من Node 22 على Alpine (لينكس صغير)، وسمّي المرحلة [[deps]] عشان نشاور عليها بعدين |
| [[WORKDIR /app]] | اعمل [[/app]] لو مش موجود، وكل الأوامر بعده تشتغل منه |
| [[COPY package.json package-lock.json ./]] | انسخ ملفين بس من جهازك لـ [[/app]] |
| [[RUN npm ci --no-audit --no-fund]] | سطّب المكتبات |

ليه الملفين بس ومش الكود كله؟ Docker بيحفظ ناتج كل سطر كطبقة (layer)، ولو المدخلات بتاعة السطر ماتغيرتش بياخد الطبقة من الكاش. فلو غيّرت صفحة بس، الـ [[npm ci]] (الأبطأ) ميتعادش.

[[npm ci]] (ci = clean install) بيسطّب **بالظبط** النسخ اللي في [[package-lock.json]]، ولو الـ lock مش متوافق مع [[package.json]] بيفشل بدل ما يعدّله. و [[--no-audit --no-fund]] بيشيلوا رسايل الأمان والتبرعات (أسرع وأنضف). الناتج:

~~~text الناتج
Step 4/21 : RUN npm ci --no-audit --no-fund
added 24 packages in 28s
~~~

---

## ٢. مرحلة [[builder]]: البناء

~~~text
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL NEXT_TELEMETRY_DISABLED=1
RUN npm run build && test -f .next/standalone/server.js
~~~

### [[COPY --from=deps /app/node_modules ./node_modules]]

[[--from=deps]] يعني «انسخ من المرحلة اللي اسمها deps مش من جهازك».

### [[COPY . .]] و [[.dockerignore]]

انسخ كل الفولدر... **إلا** اللي في [[.dockerignore]]:

~~~text .dockerignore
node_modules
.next
.env*
screenshots/
~~~

- [[node_modules]] و [[.next]]: نسختك المحلية (ممكن تكون ويندوز) متدخلش فوق اللي اتعمل جوه لينكس.
- [[.env*]]: [[*]] يعني «أي حاجة»، فـ [[.env]] و [[.env.local]] و [[.env.production]] كلهم برّه.
- [[screenshots/]]: الفولدر ده بس.

أول سطر في البناء بيبيّن إن الاستبعاد شغال:

~~~text الناتج
Sending build context to Docker daemon  43.01kB
~~~

43KB بس، مع إن المشروع على جهازي فيه صور وملفات تانية.

**فخ الـ patterns:** جربت أغيّر [[screenshots/]] لـ [[**/*.png]] وبنيت تاني: [[ls -la public]] جوه الـ image طلع فاضي، واللوجو اختفى. [[**]] معناها «أي عدد من الفولدرات»، فبتطابق [[public/logo.png]] كمان. وبـ [[*.png]] (من غير [[**/]]) اللوجو فضل موجود، لأنها بتطابق صور الجذر بس. فاستبعد فولدر باسمه.

### [[ARG]] ثم [[ENV]]

[[ARG NEXT_PUBLIC_API_URL]] بيستقبل قيمة [[--build-arg]]، وبيوصل لأوامر [[RUN]] اللي بعده في نفس المرحلة. و [[ENV NAME=$NAME]] بيحطه في بيئة المرحلة صراحة، فأي أمر أو أداة تقراه من [[process.env]]. (وده معناه إنه بيتسجّل في الـ image، فللقيم العامة بس.) Next.js بيكتب أي [[NEXT_PUBLIC_*]] جوه الجافاسكربت وقت البناء، فلازم يكون موجود **هنا**. و [[NEXT_TELEMETRY_DISABLED=1]] بيقفل إحصائيات الاستخدام اللي Next بيبعتها.

### [[RUN npm run build && test -f .next/standalone/server.js]]

[[&&]] يعني «لو اللي قبلي نجح، شغّلني». و [[test -f]] بيرجع 0 لو الملف موجود و 1 لو لأ. الناتج:

~~~text الناتج
▲ Next.js 16.4.0 (Turbopack)
✓ Running next.config.ts took 64ms
✓ Compiled successfully in 3.2s
✓ Generating static pages using 4 workers (3/3) in 856ms
Route (app)
┌ ○ /
└ ○ /_not-found
~~~

وجربت أشيل [[output: "standalone"]]: [[next build]] نفسه نجح، بس البناء وقف هنا:

~~~text الناتج
The command '/bin/sh -c npm run build && test -f .next/standalone/server.js' returned a non-zero code: 1
~~~

من غير [[test -f]] كان هيكمل ويقع في المرحلة الجاية برسالة أصعب.

---

## ٣. مرحلة [[runner]]: اللي هيتشحن

~~~text
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
~~~

[[FROM]] جديد = image نضيفة من غير node_modules الكبيرة ولا الكود. و [[ENV]]: وضع الإنتاج، و [[PORT]] اللي [[server.js]] بيسمع عليه، و [[HOSTNAME=0.0.0.0]] يعني اسمع على كل الواجهات (لو [[localhost]] بس، محدش من برّه الـ container يوصله). لوج التشغيل أكّد:

~~~text docker logs
▲ Next.js 16.4.0
- Local:         http://localhost:3000
- Network:       http://0.0.0.0:3000
✓ Ready in 0ms
~~~

[[addgroup --system --gid 1001 nodejs]] بيعمل جروب نظام رقمه 1001، و [[adduser --system --uid 1001 nextjs]] يوزر نظام (من غير باسورد ولا login). الرقم ثابت عشان ملكية الملفات تبقى متوقعة.

### الـ ٣ COPY

~~~text
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
~~~

[[--chown=nextjs:nodejs]] بيخلي الملفات ملك اليوزر الجديد وهي بتتنسخ (من غير طبقة [[chown -R]] زيادة). والتلاتة:

| المنسوخ | ليه |
|---|---|
| [[public]] | الصور والأيقونات، standalone مش بياخدها |
| [[.next/standalone]] → [[./]] | [[server.js]] و [[package.json]] و node_modules متصغّرة |
| [[.next/static]] | ملفات الـ JS والـ CSS بالـ hash، standalone مش بياخدها برضه |

شكل [[/app]] النهائي:

~~~text docker run --rm teach-real03-next ls -la /app
drwxr-xr-x    1 nextjs   nodejs        4096 .next
drwxr-xr-x   14 nextjs   nodejs        4096 node_modules
-rw-r--r--    1 nextjs   nodejs         198 package.json
drwxr-xr-x    2 nextjs   nodejs        4096 public
-rw-r--r--    1 nextjs   nodejs        7620 server.js
~~~

node_modules هنا [[46.9M]]، وفي مرحلة builder كانت [[348.1M]]: standalone بيتتبع الـ imports وبينسخ اللي بيتستخدم بس.

### [[USER nextjs]] و [[EXPOSE 3000]] و [[CMD]]

[[USER]]: كل اللي بعده (والتطبيق نفسه) بيشتغل بـ nextjs مش root. [[EXPOSE]] توثيق بس، مش بيفتح بورت. و [[CMD ["node", "server.js"]]] الأمر اللي بيشتغل مع [[docker run]].

~~~text الناتج
$ docker run --rm teach-real03-next whoami
nextjs
$ docker exec ... id
uid=1001(nextjs) gid=65533(nogroup) groups=65533(nogroup)
~~~

(الجروب الأساسي طلع [[nogroup]] لأن [[adduser]] بتاع Alpine من غير [[-G nodejs]] مش بيحطه في الجروب. مش مشكلة هنا: الملفات ملك [[nextjs]] نفسه.)

---

## ٤. اتأكد بنفسك

~~~text docker images (العمود DISK USAGE)
teach-real03-next           304MB   ← الـ image النهائية
teach-real03-next-builder   811MB   ← مرحلة البناء (وسمتها عشان أقيسها)
node:22-alpine              238MB   ← الأساس لوحده
~~~

يعني الـ image النهائية هي Node نفسها + حوالي 66MB. و [[docker history]] بيوريك الطبقات: أكبرهم [[50.1MB]] هي [[COPY]] الـ standalone.

شغّلتها وطلبت الصفحات:

~~~text الناتج
logo 200
static 200 application/javascript; charset=UTF-8
Cache-Control: public, max-age=31536000, immutable
~~~

اللوجو من [[public]]، وملف JS من [[/_next/static/]] بكاش سنة. ولو نسيت سطر [[.next/static]] الصفحة هتفتح بس من غير JS ولا CSS (404).

---

## الخلاصة

| المرحلة | فيها | بتتشحن؟ |
|---|---|---|
| [[deps]] | [[npm ci]] من الـ lock (متكاشة طول ما الـ lock ثابت) | لأ |
| [[builder]] | الكود + [[NEXT_PUBLIC_*]] + [[next build]] + [[test -f]] | لأ |
| [[runner]] | [[public]] + standalone + [[static]] بيوزر عادي | أيوه |

والـ [[.dockerignore]]: فولدرات بأساميها، مش [[**/*.png]]، و [[.env*]] دايمًا برّه.`,
          lines: [
            "مرحلة المكتبات، من node على alpine.",
            "فولدر الشغل.",
            "انسخ ملفات المكتبات بس (عشان الكاش).",
            "سطّب بالظبط زي الـ lockfile.",
            "مرحلة البناء.",
            "فولدر الشغل.",
            "خد node_modules من المرحلة اللي قبلها.",
            "انسخ الكود كله.",
            "متغير بيتبعت وقت البناء ([[--build-arg]]).",
            "حطه في البيئة عشان Next.js يقراه، واقفل إرسال الإحصائيات.",
            "ابني، واتأكد إن server.js بتاع standalone اتعمل.",
            "مرحلة التشغيل، من image نضيفة.",
            "فولدر الشغل.",
            "وضع الإنتاج، والبورت، واسمع على كل الواجهات.",
            "اعمل جروب ويوزر عاديين.",
            "انسخ public بملكية اليوزر.",
            "انسخ السيرفر المتصغّر.",
            "انسخ الملفات الثابتة (standalone مش بينسخها لوحده).",
            "اشتغل باليوزر العادي من هنا ورايح.",
            "توثيق إن التطبيق على 3000.",
            "شغّل السيرفر.",
            ".dockerignore: متنسخش node_modules بتاعة جهازك.",
            "ولا البناء القديم.",
            "ولا أي ملف أسرار.",
            "ولا فولدر الـ screenshots بس (مش كل الصور)."
          ],
          sol: R`[[docker build -t myapp .]] بيعدّي بـ ٣ مراحل، و [[docker images myapp]] بيوريك حجم قريب من حجم node:22-alpine نفسها: في مشروع صغير جربته طلع 304MB في عمود DISK USAGE، منهم 238MB الـ base image، و COPY الـ standalone حوالي 50MB. لو طلعت أكتر من جيجا، غالبًا [[.dockerignore]] مش شغال و [[node_modules]] أو [[.next]] اتنسخوا، أو [[output: "standalone"]] مش في [[next.config.ts]] (ساعتها البناء بيقف عند [[test -f .next/standalone/server.js]]).

[[docker run --rm myapp ls public]] لازم يطبع صورك ([[logo.png]] وغيرها). لو فاضي أو [[No such file]]، يبقى فولدر [[public]] مش موجود في المشروع (اعمله حتى لو فاضي، وإلا الـ COPY بيفشل).

[[docker run --rm myapp whoami]] لازم يطبع [[nextjs]]. لو طبع [[root]] يبقى سطر [[USER nextjs]] اتشال. ولو التطبيق قام وبيرجّع 404 على الصور والـ CSS، يبقى نسيت تنسخ [[.next/static]]. (جربته على مشروع Next.js 16 صغير فيه [[public/logo.png]]: [[ls public]] طبع [[logo.png]]، و [[whoami]] طبع [[nextjs]].)`
        },
        {
          cmd: "Dockerfile (Vite + nginx)",
          title: "موقع Vite و Nginx في image واحدة، و /api للباك إند",
          desc: "الفرونت يتبني بـ Node، والناتج يتحط في image بتاعة Nginx صغيرة. و Nginx نفسه بيحوّل أي طلب لـ [[/api/]] للباك إند، فالفرونت والـ API على نفس الدومين ومفيش CORS. ومعاه إعدادات كاش بحيث محدش يعلق على نسخة قديمة بعد النشر.",
          example: R`# ---- Dockerfile ----
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN VITE_API_BASE_URL= npm run build
FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
# ---- nginx.conf ----
map $http_upgrade $conn { default upgrade; '' close; }
server {
  listen 80;
  root /usr/share/nginx/html;
  client_max_body_size 100M;
  location = /index.html { add_header Cache-Control "no-cache"; }
  location /assets/ { add_header Cache-Control "public, max-age=31536000, immutable"; try_files $uri =404; }
  location / { try_files $uri $uri/ /index.html; }
  location /api/ {
    proxy_pass http://backend:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection $conn;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_read_timeout 600s;
  }
}`,
          try: "ابنيه وشغّله جنب الباك إند في compose. افتح صفحة داخلية مباشرة (زي [[/settings]]) واعمل refresh: لازم تفتح مش 404. وبعدين [[curl -I localhost/index.html]] و [[curl -I localhost/assets/<اسم ملف>]] وقارن Cache-Control.",
          flag: "script",
          deep: {
            why: "SPA محتاجة ٣ حاجات من السيرفر: أي مسار يرجّع index.html، والملفات الثابتة بكاش طويل من غير ما index.html يتكاش، والـ API على نفس الدومين. الملفين دول بيعملوا التلاتة.",
            how: R`الـ Dockerfile مرحلتين: Node يبني، وبعدين [[nginx:alpine]] ياخد [[dist]] بس. Node مش موجود في الـ image النهائية خالص. ومش محتاج [[CMD]]، الـ image بتاعة nginx فيها واحد جاهز.

[[VITE_API_BASE_URL=]] (فاضي) قبل [[npm run build]] بيخلي الفرونت يطلب [[/api/...]] بروابط نسبية على نفس الدومين، و Nginx هو اللي يوصلها للباك إند. فنفس الـ image تشتغل على أي دومين.

الكاش: Vite بيحط hash في أسامي الملفات جوه [[/assets/]]، فأي تغيير = اسم جديد، فينفع تتكاش سنة. أما [[index.html]] (اللي بيشاور على الأسامي دي) [[no-cache]]، يعني المتصفح لازم يسأل كل مرة. كده بعد النشر الناس بتشوف الجديد فورًا.

[[try_files $uri $uri/ /index.html]]: لو فيه ملف بالاسم ده قدّمه، وإلا رجّع index.html والـ router بتاع React يتصرف. والـ fallback ده بيروح لـ [[location = /index.html]] فبياخد no-cache برضه.

[[proxy_pass http://backend:3000]] من غير [[/]] في الآخر: المسار بيتبعت زي ما هو، فـ [[/api/users]] توصل للباك إند [[/api/users]]. و [[backend]] اسم الخدمة في compose.

الـ [[map]] في الأول: لو الطلب فيه Upgrade (WebSocket) يبعت [[Connection: upgrade]]، ولو لأ يبعت [[close]]. ده أصح من كتابة [[upgrade]] ثابتة لكل الطلبات. والـ [[map]] لازم تبقى في [[http]]، والملف ده بيتضمَّن جوه http فينفع.

و [[client_max_body_size]] و [[proxy_read_timeout]] كبار عشان رفع الملفات الكبيرة.`,
            when: "أي فرونت React أو Vue أو Vite في compose جنب باك إند.",
            mistakes: R`في مشروع حقيقي كانت إعدادات Nginx مكتوبة بـ [[RUN echo '...']] جوه الـ Dockerfile، فالهروب من علامات التنصيص صعب ومش مقروء، وفي نفس الوقت compose كان بيركّب nginx.conf من ملف تاني فوقه. والاتنين كانوا بيسمعوا على بورتات مختلفة (8000 و 80)، فخدمة الـ staging كانت شغالة بإعدادات غير الإنتاج ومحدش واخد باله. و [[Connection "upgrade"]] كانت ثابتة لكل الطلبات بدل map، وتحويل www كان بـ [[if]] بدل server منفصل.`
          },
          teach: R`## الأول: ملفين

المثال ملفين: [[Dockerfile]] بيبني الفرونت ويحطه في nginx، و [[nginx.conf]] بيقول لـ nginx يقدّم الملفات إزاي ويوصل [[/api/]] للباك إند. هنقرا الاتنين سطر سطر.

جربتهم على Docker Desktop (ويندوز) بمشروع Vite 8 صغير: صفحة بتعمل [[fetch]] لـ [[/api/users]]، وباك إند Node صغير اسمه [[backend]] على 3000 بيرد بالمسار والـ headers اللي وصلته. الاتنين في compose واحد، و nginx على [[127.0.0.1:8382]]. (بنيت على [[nginx:alpine]] الموجودة عندي بدل [[1.27-alpine]].)

---

## ١. الـ Dockerfile

### مرحلة البناء

~~~text
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN VITE_API_BASE_URL= npm run build
~~~

- [[AS build]]: اسم المرحلة.
- [[package*.json]]: [[*]] يعني «أي حاجة»، فبيطابق [[package.json]] و [[package-lock.json]] مع بعض. نسخهم لوحدهم الأول عشان [[npm ci]] يتاخد من الكاش لما تغيّر الكود بس.
- [[npm ci]]: يسطّب بالظبط اللي في الـ lock. طلع [[added 15 packages ... in 8s]].
- [[COPY . .]]: باقي المشروع (و [[.dockerignore]] فيه [[node_modules]] و [[dist]]).

### [[RUN VITE_API_BASE_URL= npm run build]]

الشكل [[NAME=value command]] في shell معناه «شغّل الأمر ده والمتغير ده موجود ليه هو بس». وهنا القيمة **فاضية** عن قصد. Vite بيستبدل أي [[import.meta.env.VITE_*]] في الكود بقيمته وقت البناء. الكود عندي:

~~~text src/main.js
const base = import.meta.env.VITE_API_BASE_URL ?? "";
fetch(base + "/api/users")
~~~

ولما بصّيت في الملف اللي اتبنى جوه الـ image:

~~~text grep "fetch(" /usr/share/nginx/html/assets/*.js
fetch($__bt/api/users$__bt)
~~~

القيمة الفاضية اتحطت، و Vite جمعها مع [[/api/users]] فبقت رابط نسبي. يعني المتصفح هيطلب [[/api/users]] من **نفس الدومين** اللي فتح منه الصفحة، فنفس الـ image تشتغل على أي دومين، ومفيش CORS.

وناتج البناء:

~~~text الناتج
vite v8.3.3 building client environment for production...
dist/index.html                0.13 kB │ gzip: 0.13 kB
dist/assets/index-B-Ru5zPu.js  0.80 kB │ gzip: 0.46 kB
✓ built in 69ms
~~~

لاحظ [[B-Ru5zPu]] في اسم الملف: ده hash من محتواه. أي تغيير في الكود = اسم جديد. هنحتاج المعلومة دي في الكاش.

### المرحلة النهائية

~~~text
FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
~~~

[[FROM]] تاني = image جديدة فيها nginx بس. [[COPY --from=build]] بياخد [[dist]] من مرحلة البناء ويحطه في فولدر nginx الافتراضي. والسطر الأخير بيحط إعداداتك مكان [[default.conf]] الأصلي. مفيش [[CMD]] لأن image nginx فيها واحد جاهز. والنتيجة 93.6MB، تقريبًا نفس حجم nginx:alpine لوحدها: Node و node_modules مش موجودين خالص.

---

## ٢. [[nginx.conf]]

### [[map $http_upgrade $conn { default upgrade; '' close; }]]

[[map]] بيعمل متغير جديد من متغير موجود، زي جدول:

| [[$http_upgrade]] (header اسمه Upgrade في الطلب) | [[$conn]] |
|---|---|
| فاضي ([['']]، يعني مفيش header) | [[close]] |
| أي قيمة تانية ([[websocket]] مثلًا) | [[upgrade]] |

nginx بيحوّل أي header في الطلب لمتغير: [[$http_]] + اسمه بحروف صغيرة. هنستخدم [[$conn]] تحت.

### [[server { listen 80; root ...; client_max_body_size 100M; }]]

- [[listen 80]]: HTTP عادي. الـ SSL بيبقى في nginx تاني قدّام (على السيرفر أو nginx-proxy).
- [[root /usr/share/nginx/html]]: الملفات بتتدوّر هنا، فطلب [[/assets/x.js]] = ملف [[/usr/share/nginx/html/assets/x.js]].
- [[client_max_body_size 100M]]: أكبر طلب مسموح (الافتراضي 1MB بس). جربت طلب بيقول إن حجمه 200MB: nginx رد [[413]] (Request Entity Too Large) من غير ما يوصل للباك إند.

### الـ ٣ locations بتاعة الملفات

[[location]] بيقول «الطلبات اللي مسارها كذا اعمل فيها كذا». و nginx بيختار الأدق: [[=]] تطابق بالظبط ليه الأولوية، وبعدين أطول بادئة.

| الـ location | بيمسك | بيعمل |
|---|---|---|
| [[= /index.html]] | الصفحة الرئيسية بالظبط | [[Cache-Control: no-cache]]: المتصفح يسأل السيرفر كل مرة |
| [[/assets/]] | ملفات Vite بالـ hash | كاش سنة ([[31536000]] ثانية = ٣٦٥ يوم)، و [[immutable]] = متسألش تاني خالص |
| [[/]] | أي حاجة تانية | [[try_files $uri $uri/ /index.html]] |

[[try_files]] بيجرّب بالترتيب: الملف بالاسم ده ([[$uri]] = المسار المطلوب)، وبعدين فولدر بالاسم ده ([[$uri/]])، ولو مفيش يرجّع [[/index.html]]. وجوه [[/assets/]] آخر حاجة [[=404]] بدل index.html.

ده اللي طلع لما طلبت كل مسار بـ [[curl -I]] ([[-I]] يعني هات الـ headers بس):

~~~text الناتج
== /settings
HTTP/1.1 200 OK
Content-Type: text/html
Cache-Control: no-cache
== /index.html
HTTP/1.1 200 OK
Content-Type: text/html
Cache-Control: no-cache
== /assets/index-B-Ru5zPu.js
HTTP/1.1 200 OK
Content-Type: application/javascript
Cache-Control: public, max-age=31536000, immutable
== /assets/nope.js
HTTP/1.1 404 Not Found
~~~

اقراهم:

1. [[/settings]] مفيش ملف بالاسم ده، فـ [[try_files]] رجّع [[index.html]] بـ 200، والـ router بتاع الفرونت هو اللي يعرض صفحة الإعدادات. ده اللي بيخلي الـ refresh على صفحة داخلية يشتغل بدل 404. وخد بالك إنه خد [[no-cache]] كمان: الـ fallback لـ [[/index.html]] بيعمل بحث جديد عن location فبيقع في [[= /index.html]].
2. ملف الـ JS بكاش سنة. آمن لأن أي نسخة جديدة اسمها مختلف، و [[index.html]] (اللي مش متكاش) هو اللي بيشاور على الاسم الجديد.
3. ملف assets مش موجود رجّع 404 حقيقية، مش [[index.html]]. لو رجّع HTML المتصفح كان هيحاول يشغّله كـ JavaScript ويطلع خطأ غريب.

### [[location /api/]]: الـ proxy

| السطر | معناه |
|---|---|
| [[proxy_pass http://backend:3000;]] | ابعت الطلب لخدمة [[backend]] في compose على 3000. من غير [[/]] في الآخر = المسار يتبعت زي ما هو |
| [[proxy_http_version 1.1;]] | nginx بيكلّم الباك إند بـ HTTP/1.0 افتراضيًا، و WebSocket محتاج 1.1 |
| [[proxy_set_header Upgrade $http_upgrade;]] | ابعت header الـ Upgrade زي ما جه |
| [[proxy_set_header Connection $conn;]] | و Connection من الـ map: [[upgrade]] أو [[close]] |
| [[proxy_set_header Host $host;]] | الدومين الأصلي اللي الزائر طلبه |
| [[X-Forwarded-For $proxy_add_x_forwarded_for]] | IP الزائر (مضاف لأي IPs قبله)، لأن الباك إند هيشوف IP بتاع nginx بس |
| [[X-Forwarded-Proto $scheme]] | [[http]] ولا [[https]] |
| [[proxy_read_timeout 600s;]] | استنى رد الباك إند لحد ١٠ دقايق (الافتراضي 60 ثانية) |

الباك إند عندي بيرد باللي وصله، فشفت الكلام ده بعيني:

~~~text curl localhost:8382/api/users
{"path":"/api/users","host":"localhost","connection":"close","upgrade":null,"xff":"172.18.0.1","proto":"http"}
~~~

~~~text curl -H 'Upgrade: websocket' -H 'Connection: Upgrade' localhost:8382/api/ws
{"path":"/api/ws","host":"localhost","connection":"upgrade","upgrade":"websocket","xff":"172.18.0.1","proto":"http"}
~~~

- [[path]] وصل [[/api/users]] كامل (عشان [[proxy_pass]] من غير [[/]]).
- [[connection]] اتغيّر حسب الطلب: [[close]] للعادي و [[upgrade]] للـ WebSocket. ده شغل الـ [[map]].
- [[host]] = [[localhost]] من غير البورت، لأن [[$host]] هو اسم الدومين بس.
- [[xff]] = IP جهازي زي ما Docker شايفه.

وطلب [[/api]] من غير [[/]] رجع [[301]] لـ [[/api/]]: nginx بيعمل كده لوحده لما location بتاع proxy آخره [[/]].

---

## ٣. فخ: [[host not found in upstream]]

شغّلت الـ image لوحدها من غير compose:

~~~text الناتج
nginx: [emerg] host not found in upstream "backend" in /etc/nginx/conf.d/default.conf:10
~~~

nginx بيدوّر على اسم [[backend]] **وهو بيقوم**، ولو مش لاقيه بيرفض يقوم خالص. فلازم يشتغل على نفس شبكة خدمة اسمها [[backend]].

---

## الخلاصة

| الحاجة | فين |
|---|---|
| Node في الـ image النهائية؟ | لأ: مرحلة [[build]] بس، والنهائية nginx + [[dist]] |
| الـ API بروابط نسبية | [[VITE_API_BASE_URL=]] فاضي وقت البناء |
| refresh على [[/settings]] | [[try_files $uri $uri/ /index.html]] |
| مفيش حد يعلق على نسخة قديمة | [[index.html]] بـ [[no-cache]]، و [[/assets/]] بكاش سنة لأن الأسامي بالـ hash |
| [[/api/]] للباك إند بنفس المسار | [[proxy_pass http://backend:3000]] من غير [[/]] |
| WebSocket | [[proxy_http_version 1.1]] + [[map]] للـ Connection |`,
          lines: [
            "مرحلة البناء من Node.",
            "فولدر الشغل.",
            "ملفات المكتبات الأول (عشان الكاش).",
            "سطّب بالظبط زي الـ lockfile.",
            "انسخ الكود.",
            "ابني، والـ API بروابط نسبية.",
            "المرحلة النهائية: Nginx بس.",
            "انسخ ناتج البناء لفولدر Nginx.",
            "وإعدادات الموقع.",
            "لو الطلب WebSocket ابعت upgrade، وإلا close.",
            "الموقع:",
            "على 80 (الـ SSL قدامه، مش جواه).",
            "فولدر الملفات.",
            "رفع لحد ١٠٠ ميجا.",
            "index.html: المتصفح يسأل كل مرة.",
            "ملفات assets (أساميها فيها hash): كاش سنة، ولو مش موجودة 404.",
            "أي مسار تاني: الملف لو موجود، وإلا index.html.",
            "طلبات الـ API:",
            "ابعتها للباك إند بنفس المسار.",
            "HTTP/1.1 (لازم للـ WebSocket).",
            "ابعت Upgrade لو موجود.",
            "و Connection حسب الـ map.",
            "الدومين الأصلي.",
            "IP الزائر.",
            "و http ولا https.",
            "استنى الرد لحد ١٠ دقايق (رفع أو عمليات طويلة).",
            "نهاية الـ location.",
            "نهاية الـ server."
          ],
          sol: R`جربت ملف الـ [[nginx.conf]] ده على nginx:alpine جنب backend بيسمع على 3000:

[[curl -I /settings]] رجّع [[200]] و [[Content-Type: text/html]]، ده [[index.html]] بسبب [[try_files ... /index.html]]، فالـ refresh على صفحة داخلية بيشتغل.
[[curl -I /index.html]] رجّع [[Cache-Control: no-cache]]، و [[/settings]] كمان بياخد [[no-cache]] لأنه بيتحوّل داخليًا لـ [[/index.html]].
[[curl -I /assets/index-abc123.js]] رجّع [[Cache-Control: public, max-age=31536000, immutable]].
[[/assets/nope.js]] رجّع [[404]] مش [[index.html]]، وده الصح عشان المتصفح مايحاولش يشغّل HTML كـ JavaScript.
[[/api/users]] وصل للـ backend بنفس المسار.

فخ جربته: لو الـ image اشتغلت من غير service اسمه [[backend]] على نفس الشبكة، nginx مابيقومش خالص: [[host not found in upstream "backend"]]. فلازم تشغّلها في compose مع الباك إند.`
        },
        {
          cmd: "compose dev / prod",
          title: "نفس المشروع بملفين: hot reload محلي، و nginx-proxy في الإنتاج",
          desc: "ملف للتطوير بيركّب الكود من جهازك جوه الـ containers، فأي تعديل يبان فورًا بـ nodemon و Vite. وملف للإنتاج بيبني images نهائية، ومن غير ولا بورت مفتوح، وبيسيب nginx-proxy يوزّع الدومين ويطلّع SSL لوحده من متغيرين.",
          example: R`# ---- compose.dev.yml:  docker compose -f compose.dev.yml up --build ----
services:
  backend:
    build: { context: ./backend, dockerfile: Dockerfile.dev }
    ports: ["127.0.0.1:3000:3000"]
    env_file: ./backend/.env
    volumes: ["./backend/src:/app/src"]
    command: sh -c "npx prisma migrate deploy && npx nodemon src/server.js"
  frontend:
    build: { context: ./frontend, dockerfile: Dockerfile.dev }
    ports: ["127.0.0.1:5173:5173"]
    volumes: ["./frontend/src:/app/src"]
# ---- compose.yml (الإنتاج):  docker compose up -d --build ----
services:
  backend:
    build: ./backend
    env_file: ./backend/.env
    command: sh -c "npx prisma migrate deploy && node src/server.js"
    restart: unless-stopped
  frontend:
    build: ./frontend
    environment:
      VIRTUAL_HOST: example.com,www.example.com
      LETSENCRYPT_HOST: example.com,www.example.com
    networks: [default, proxy]
    restart: unless-stopped
networks:
  proxy: { external: true, name: nginx-proxy }`,
          try: "شغّل ملف الـ dev وعدّل سطر في backend/src: لازم nodemon يعيد التشغيل لوحده في اللوج. وبعدين على سيرفر التجربة (وعليه nginx-proxy و acme-companion) شغّل ملف الإنتاج بدومين تجربة، واتأكد بـ [[ss -tlnp]] إن مفيش بورتات للمشروع.",
          flag: "script",
          deep: {
            why: "التطوير محتاج سرعة (تعديل يبان فورًا وبورتات مفتوحة تجرّب عليها)، والإنتاج محتاج أمان (مفيش بورتات، و images ثابتة). ملف واحد للاتنين بيطلع يا بطيء في التطوير يا مكشوف في الإنتاج.",
            how: R`في الـ dev: [[volumes: ["./backend/src:/app/src"]]] بيركّب فولدر الكود من جهازك مكان الكود اللي جوه الـ image، فـ nodemon يشوف أي تعديل ويعيد التشغيل. البورتات على [[127.0.0.1]] عشان متبقاش مفتوحة على شبكة الواي فاي. و Vite لازم يشتغل بـ [[--host 0.0.0.0]] في Dockerfile.dev وإلا مش هتوصله من برّه الـ container. وعلى ويندوز، مراقبة الملفات من bind mount ساعات مبتشتغلش، فشغّل polling في إعدادات Vite ([[server.watch.usePolling]]).

[[prisma migrate deploy]] قبل تشغيل السيرفر في الاتنين: بيطبّق الـ migrations اللي في git وبس، ومش بيعمل أي تغيير من دماغه.

في الإنتاج: مفيش [[ports]] خالص. nginx-proxy (stack منفصل بيشتغل مرة واحدة على السيرفر) بيراقب Docker، وأي container عليه [[VIRTUAL_HOST]] وعلى نفس الشبكة بيعمله server block لوحده. و acme-companion بيشوف [[LETSENCRYPT_HOST]] ويطلّع الشهادة ويجددها. ولو التطبيق مش على بورت 80 ضيف [[VIRTUAL_PORT]].

الـ frontend على شبكتين: [[default]] عشان يوصل للـ backend (الـ Nginx اللي جواه بيعمل proxy لـ /api)، و [[proxy]] عشان nginx-proxy يوصله. والـ backend على default بس، فمحدش من برّه يوصله. و [[external: true]] معناها الشبكة موجودة قبل كده (اتعملت مع nginx-proxy) ومش هتتمسح مع [[down]].`,
            when: "مشروع فرونت وباك إند بتطوّره بـ Docker على جهازك وبتنشره على VPS فيه كذا موقع.",
            mistakes: R`في مشروع حقيقي كان ملف الإنتاج فاتح Postgres على 5433 و Redis على 6379 على السيرفر. Docker بيعدّي من ufw، فالاتنين كانوا مكشوفين للإنترنت، و Redis من غير باسورد. والباسورد بتاع قاعدة البيانات ضعيف ومكتوب في الـ compose نفسه، و [[DATABASE_URL]] متبعت كـ build ARG فمحفوظ في الـ image.

والأخطر: [[prisma db push --accept-data-loss]] مع كل تشغيل في الإنتاج بدل [[migrate deploy]]. ده بيخلّي الجداول زي الـ schema بالعافية، وممكن يمسح أعمدة بالداتا اللي فيها.

وكان .env متمرّر بـ env_file، وكمان متركّب جوه /app، وكمان متكرر في environment، وبلوك environment ضخم متكرر بين الملفين، فأي تعديل لازم يتعمل في ٣ أماكن.`
          },
          teach: R`## الأول: ملفين لنفس المشروع

المشروع فيه فولدرين ([[backend/]] و [[frontend/]])، والمثال ملفين compose: [[compose.dev.yml]] على جهازك، و [[compose.yml]] على السيرفر. نفس الخدمتين، بس كل ملف بيشغّلهم بشكل مختلف. هنقرا كل ملف سطر سطر، وبعدين جدول بالفرق.

جربت الاتنين على Docker Desktop (ويندوز): باك إند Node صغير بيرد بـ [[{"msg":"v1"}]]، وفرونت Vite 8 (نفس image الـ Vite و Nginx من الدرس اللي فات). وخطوة [[prisma migrate deploy]] بدّلتها بـ [[echo]] في التجربة (Prisma ليه دروسه)، والباقي زي المثال.

---

## ١. [[compose.dev.yml]]: التطوير

التعليق في أول سطر هو أمر التشغيل:

~~~bash
docker compose -f compose.dev.yml up --build
~~~

[[-f]] اختصار file: «استخدم الملف ده» (من غيره compose بيدوّر على [[compose.yml]]). و [[--build]] يبني الـ images قبل التشغيل.

### [[build: { context: ./backend, dockerfile: Dockerfile.dev }]]

الأقواس [[{ }]] في YAML طريقة كتابة في سطر واحد لنفس الحاجة اللي بتتكتب في كذا سطر. [[context]] الفولدر اللي هيتبعت للبناء، و [[dockerfile]] اسم ملف تاني غير [[Dockerfile]] الافتراضي. [[Dockerfile.dev]] بيسطّب المكتبات (ومنها nodemon) بس ومش بيبني نسخة إنتاج.

### [[ports: ["127.0.0.1:3000:3000"]]]

[[IP:بورت_جهازك:بورت_الcontainer]]. الـ [[127.0.0.1]] في الأول معناها «على جهازك بس». من غيرها البورت بيتفتح على كل الواجهات، وأي حد على نفس الواي فاي يوصله. [[docker compose ps]] أكّد:

~~~text الناتج
backend    127.0.0.1:3000->3000/tcp
frontend   127.0.0.1:5173->5173/tcp
~~~

### [[env_file: ./backend/.env]]

كل سطر في الملف يبقى متغير بيئة جوه الـ container وقت التشغيل.

### [[volumes: ["./backend/src:/app/src"]]]: سر الـ hot reload

ده bind mount: فولدر [[backend/src]] اللي على جهازك بيتحط **مكان** [[/app/src]] اللي جوه الـ container. يعني الـ container مش شايف نسخة، شايف ملفاتك نفسها. عدّلت [[v1]] لـ [[v2]] على ويندوز، وجوه الـ container على طول:

~~~text docker exec ... head -1 /app/src/server.js
const msg = "v2";
~~~

### [[command: sh -c "npx prisma migrate deploy && npx nodemon src/server.js"]]

[[command]] بيستبدل [[CMD]] بتاع الـ image. [[sh -c "..."]] عشان [[&&]] (لو الأول نجح شغّل التاني) شغل shell. [[npx]] بيشغّل أداة من [[node_modules]] بتاعة المشروع. و [[nodemon]] بيشغّل [[node src/server.js]] ويراقب الملفات، ولو اتغيرت يعيد التشغيل:

~~~text docker compose logs backend
[nodemon] 3.1.14
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting $__btnode src/server.js$__bt
backend up: v1
~~~

### المفاجأة على ويندوز

الملف اتغيّر جوه الـ container، بس nodemon **ماحسّش**: اللوج فضل [[v1]] و [[curl localhost:3000]] رجّع [[{"msg":"v1"}]]. السبب: nodemon (و Vite) بيستنوا إشعار من لينكس إن «ملف اتغير»، والإشعار ده مش بيعدّي من فولدر ويندوز لجوه الـ container. الحل polling: يبص على الملفات كل شوية بنفسه. غيّرت الأمر لـ [[npx nodemon -L src/server.js]] ([[-L]] اختصار legacy watch = polling):

~~~text الناتج بعد تعديل v2 → v3
[nodemon] restarting due to changes...
[nodemon] starting $__btnode src/server.js$__bt
backend up: v3
~~~

ونفس الحكاية مع Vite: من غير polling [[curl localhost:5173/src/main.js]] فضل يرجّع الكود القديم. ومع ملف [[vite.config.js]] فيه [[server: { watch: { usePolling: true } }]] التعديل ظهر واللوج قال [[[vite] (client) page reload src/main.js]].

(لو المشروع جوه WSL، يعني فولدر لينكس، الإشعارات بتشتغل عادي ومش محتاج polling.)

### الـ [[frontend]] في الـ dev

نفس الفكرة: [[Dockerfile.dev]] بيشغّل [[vite --host 0.0.0.0]]، و [[--host 0.0.0.0]] لازم لأن Vite افتراضيًا بيسمع على localhost **جوه الـ container**، فمحدش من برّه يوصله. لوج Vite بيوريك الاتنين:

~~~text الناتج
VITE v8.3.3  ready in 380 ms
➜  Local:   http://localhost:5173/
➜  Network: http://172.19.0.3:5173/
~~~

---

## ٢. [[compose.yml]]: الإنتاج

~~~bash
docker compose up -d --build
~~~

[[-d]] في الخلفية.

### الـ [[backend]]

- [[build: ./backend]]: الشكل المختصر، يعني [[context: ./backend]] و [[Dockerfile]] العادي (نسخة إنتاج، الكود جواه).
- مفيش [[volumes]]: الكود جوه الـ image، ومحدش يعدّله على السيرفر.
- [[command]] بـ [[node]] عادي مش nodemon.
- **مفيش [[ports]] خالص**: [[docker compose ps]] طلّع [[backend []]] (فاضي). محدش يوصله غير الخدمات اللي معاه على الشبكة.
- [[restart: unless-stopped]]: يقوم بعد أي وقعة أو reboot.

### الـ [[frontend]] و nginx-proxy

nginx-proxy مشروع compose منفصل بيتعمل **مرة واحدة** على السيرفر، وهو اللي ماسك 80 و 443 لكل المواقع. بيقرا Docker، وأي container عليه متغير [[VIRTUAL_HOST]] بيعمله إعدادات nginx لوحده:

| السطر | معناه |
|---|---|
| [[VIRTUAL_HOST: example.com,www.example.com]] | الطلبات اللي لدومين من دول تروح للـ container ده |
| [[LETSENCRYPT_HOST: ...]] | acme-companion (بيشتغل جنب nginx-proxy) يطلّع شهادة للدومينات دي ويجددها |
| [[networks: [default, proxy]]] | على شبكتين: [[default]] عشان يوصل لـ [[backend]]، و [[proxy]] عشان nginx-proxy يوصله |

جربت nginx-proxy حقيقي (على [[127.0.0.1:8384]] وباسم شبكة [[teach-real03-nginx-proxy]] بدل [[nginx-proxy]] عشان أعرف أمسح اللي عملته)، وبعت طلبات بـ header [[Host]] بدل دومين حقيقي:

~~~text الناتج
== example.com      200
== www.example.com  200
== other.com        503
{"msg":"v3","path":"/api/users"}     ← Host: example.com و /api/users
~~~

الدومينين بتوع [[VIRTUAL_HOST]] وصلوا للفرونت، وأي دومين تاني رجع 503 (nginx-proxy مش لاقي container ليه). وآخر سطر: الطلب عدّى nginx-proxy ← nginx اللي جوه الفرونت ← [[backend]] على الشبكة الداخلية. ودي الإعدادات اللي nginx-proxy كتبها لوحده:

~~~text /etc/nginx/conf.d/default.conf (جزء)
upstream example.com {
    # Container: teach-real03-l4p-frontend-1
    #         teach-real03-l4p_default (unreachable)
    #         teach-real03-nginx-proxy (reachable)
    #     default port: 80
~~~

شاف الـ container على الشبكتين، ووصله من شبكة [[proxy]] على بورت 80 (البورت الوحيد اللي الـ image بتعلنه). لو التطبيق على بورت تاني، ضيف [[VIRTUAL_PORT]].

### [[networks: proxy: { external: true, name: nginx-proxy }]]

[[proxy]] الاسم جوه الملف، و [[name: nginx-proxy]] الاسم الحقيقي في Docker. و [[external: true]] معناها «الشبكة دي موجودة قبل كده، متعملهاش ومتمسحهاش». جربت [[up]] قبل ما أعمل الشبكة:

~~~text الناتج
network teach-real03-nginx-proxy declared as external, but could not be found
~~~

يعني nginx-proxy لازم يتسطّب الأول. و [[docker compose down]] مسح شبكة المشروع بس ([[teach-real03-l4p_default]])، والخارجية فضلت.

---

## ٣. الفرق في جدول

| | [[compose.dev.yml]] | [[compose.yml]] |
|---|---|---|
| الـ Dockerfile | [[Dockerfile.dev]] | [[Dockerfile]] |
| الكود | bind mount من جهازك | جوه الـ image |
| السيرفر | nodemon و Vite dev | node عادي و nginx |
| البورتات | على [[127.0.0.1]] | مفيش، nginx-proxy بس |
| الدومين و SSL | مفيش | [[VIRTUAL_HOST]] و [[LETSENCRYPT_HOST]] |
| [[restart]] | مفيش | [[unless-stopped]] |

---

## الخلاصة

- الـ dev: bind mount + nodemon/Vite = hot reload، وعلى فولدر ويندوز لازم polling ([[nodemon -L]] و [[usePolling]]).
- البورتات في الـ dev على [[127.0.0.1]] دايمًا.
- الإنتاج: مفيش [[ports]] للمشروع، و nginx-proxy بيلاقي الـ container من [[VIRTUAL_HOST]] لو على شبكته.
- [[external: true]]: الشبكة لازم تبقى موجودة، و compose مش هيمسحها.`,
          lines: [
            "خدمات التطوير:",
            "الباك إند:",
            "يتبني بـ Dockerfile التطوير.",
            "البورت على جهازك بس.",
            "المتغيرات من ملف.",
            "ركّب فولدر الكود من جهازك (hot reload).",
            "طبّق الـ migrations وشغّل بـ nodemon.",
            "الفرونت:",
            "Dockerfile التطوير (Vite dev server).",
            "بورت Vite على جهازك بس.",
            "ركّب فولدر الكود.",
            "خدمات الإنتاج:",
            "الباك إند:",
            "يتبني بالـ Dockerfile العادي.",
            "المتغيرات وقت التشغيل.",
            "طبّق الـ migrations وشغّل بـ node عادي.",
            "يقوم لوحده.",
            "الفرونت (image الـ Vite و Nginx):",
            "يتبني.",
            "متغيرات لـ nginx-proxy:",
            "الدومينات اللي توصل للـ container ده.",
            "والدومينات اللي تطلعلها شهادة.",
            "على الشبكة الداخلية وشبكة nginx-proxy.",
            "يقوم لوحده.",
            "الشبكات:",
            "شبكة nginx-proxy الموجودة قبل كده."
          ],
          sol: R`ملف الـ dev: لما تعدّل سطر في [[backend/src]]، لوج الباك إند ([[docker compose -f compose.dev.yml logs -f backend]]) بيطبع [[[nodemon] restarting due to changes...]] وبعدها [[[nodemon] starting node src/server.js]]. لو مابيحصلش على ويندوز أو ماك، غالبًا الـ file events مش بتوصل عبر bind mount، استخدم [[nodemon -L]] (polling).

ملف الإنتاج: [[sudo ss -tlnp]] مش هيوريك أي بورت للمشروع، مفيش 3000 ولا 80 تبعه. اللي سامع على 80 و 443 هو container [[nginx-proxy]] بس. nginx-proxy بيكتشف [[frontend]] لوحده من [[VIRTUAL_HOST]] لأنه على شبكة [[nginx-proxy]]، و acme-companion بيطلب الشهادة من [[LETSENCRYPT_HOST]].

لو الدومين رجّع [[503]] من nginx-proxy، يبقى الـ frontend مش على شبكة [[proxy]] أو [[VIRTUAL_HOST]] مكتوب غلط. ولو [[docker compose up]] قال [[network nginx-proxy declared as external, but could not be found]] يبقى nginx-proxy مش متسطب. (جربت الملفين على Docker Desktop: الـ dev على فولدر ويندوز ماشافش التعديل غير بـ [[nodemon -L]] و [[usePolling]]، والإنتاج مع nginx-proxy حقيقي وطلبات بـ [[Host: example.com]]. جزء الشهادة بتاع acme-companion محتاج دومين حقيقي، فده من الـ docs.)`
        },
        {
          cmd: "compose.yml (Mongo)",
          title: "Mongo بباسورد و healthcheck، والباك إند مستنيه",
          desc: "Stack إنتاج لتطبيق MERN: Mongo بتسجيل دخول و volume خارجي محمي من المسح، والباك إند مش بيقوم غير لما Mongo يبقى healthy، والفرونت (Nginx) بيقدّم الواجهة. وكل البورتات على [[127.0.0.1]]، و Nginx اللي على السيرفر (بالـ SSL) هو اللي بيوصلها.",
          example: R`services:
  mongo:
    image: mongo:7
    environment:
      MONGO_INITDB_ROOT_USERNAME: $__{MONGO_ROOT_USER}
      MONGO_INITDB_ROOT_PASSWORD: $__{MONGO_ROOT_PASSWORD:?set it in .env}
    volumes: ["mongodb_data:/data/db"]
    healthcheck:
      test: ["CMD", "mongosh", "--quiet", "--eval", "db.adminCommand('ping').ok"]
      interval: 30s
      retries: 5
      start_period: 40s
    restart: unless-stopped
  backend:
    build: { context: ., dockerfile: Dockerfile.backend }
    depends_on:
      mongo: { condition: service_healthy }
    ports: ["127.0.0.1:5000:5000"]
    environment:
      NODE_ENV: production
      MONGODB_URI: $__{MONGODB_URI}
      JWT_SECRET: $__{JWT_SECRET:?set it in .env}
      JWT_EXPIRE: $__{JWT_EXPIRE:-7d}
    restart: unless-stopped
  frontend:
    build: { context: ., dockerfile: Dockerfile.frontend }
    depends_on: [backend]
    ports: ["127.0.0.1:8080:80"]
    restart: unless-stopped
volumes:
  mongodb_data:
    external: true`,
          try: "على سيرفر التجربة: [[docker volume create mongodb_data]]، و .env فيه الباسورد و [[MONGODB_URI=mongodb://root:secret@mongo:27017/myapp?authSource=admin]]، وبعدين [[docker compose up -d]] وتابع [[docker compose ps]]: الباك إند مش هيقوم غير لما mongo يبقى healthy. وجرّب تشيل JWT_SECRET من .env: compose لازم يرفض يقوم.",
          flag: "script",
          deep: {
            why: "أكتر مشكلتين في Mongo على Docker: قاعدة بيانات مفتوحة للإنترنت من غير باسورد (بتتسرق في ساعات)، وباك إند بيقوم قبل Mongo فيقع أول ما السيرفر يعمل reboot. الملف ده بيحل الاتنين.",
            how: R`[[MONGO_INITDB_ROOT_USERNAME]] و [[PASSWORD]]: أول مرة الـ volume يبقى فاضي، الـ image بتعمل يوزر root بيهم وبتشغّل Mongo بتسجيل دخول إجباري. بعد كده تغييرهم في .env مش بيغيّر الباسورد (الداتا موجودة)؛ لازم تغيّره من جوه mongosh.

[[$__{VAR:?رسالة}]]: لو المتغير مش موجود أو فاضي، compose يرفض يقوم ويطبع الرسالة، بدل ما يشغّل Mongo بباسورد فاضي أو الباك إند بـ JWT secret فاضي. و [[$__{JWT_EXPIRE:-7d}]] قيمة افتراضية لو مش موجود.

الـ healthcheck: أمر [[ping]] مش محتاج تسجيل دخول، فمش لازم تحط الباسورد في الأمر. و [[start_period]] بيدّي Mongo ٤٠ ثانية يقوم فيهم قبل ما الفشل يتحسب.

[[depends_on]] بـ [[condition: service_healthy]] بيخلي compose يستنى الـ healthcheck ينجح قبل ما يشغّل الباك إند. [[depends_on]] العادي بيستنى الـ container يبدأ بس، مش إن Mongo جاهز يستقبل.

[[external: true]] للـ volume: compose مش بيعمله ومش بيمسحه، حتى مع [[docker compose down -v]]. فالداتا محمية من أمر غلط.

الـ URI جوه compose بيستخدم اسم الخدمة [[mongo]] مش localhost، ولازم [[?authSource=admin]] لأن يوزر root متعرّف في قاعدة admin.

والبورتات كلها على [[127.0.0.1]]، ومفيش بورت لـ Mongo خالص؛ لو محتاج توصله من جهازك استخدم SSH tunnel: [[ssh -L 27017:localhost:27017]] مع بورت مؤقت، أو [[docker compose exec mongo mongosh]].`,
            when: "أي تطبيق Node و Mongo على VPS واحد.",
            mistakes: "في مشروع حقيقي كان الباك إند ناشر [[5000:5000]] على كل الواجهات. Docker بيعدّي من ufw، فالـ API كان مكشوف للعالم مباشرة من غير Nginx ولا SSL. وكان [[JWT_EXPIRE]] الافتراضي [[3650d]]، يعني توكن عايش ١٠ سنين: لو اتسرق مفيش حاجة توقفه. والباسورد كان مكتوب في سطر الـ healthcheck، فبيبان لأي حد يعمل [[docker inspect]]. و [[restart: always]] على الكل، والأوضح [[unless-stopped]] عشان لو وقّفت خدمة بإيدك متقومش لوحدها بعد reboot."
          },
          teach: R`## الأول: ٣ خدمات، وترتيب تشغيل

الملف بيشغّل [[mongo]] (قاعدة البيانات)، و [[backend]] (الـ API)، و [[frontend]] (nginx فيه الواجهة). المهم فيه ٣ حاجات: باسورد إجباري، وباك إند مستني Mongo يبقى جاهز فعلًا، وداتا في volume محدش يقدر يمسحه بالغلط.

جربته على Docker Desktop (ويندوز) بـ [[mongo:7]]. ومكان الباك إند حطيت container من نفس image Mongo بيعمل [[mongosh "$MONGODB_URI"]] (يعني بيتصل بنفس الرابط اللي الباك إند هيتصل بيه)، والفرونت [[nginx:alpine]]. والـ volume سمّيته [[teach-real03-mongodb_data]] بدل [[mongodb_data]]. والـ [[.env]]:

~~~text .env
MONGO_ROOT_USER=root
MONGO_ROOT_PASSWORD=secret
MONGODB_URI=mongodb://root:secret@mongo:27017/myapp?authSource=admin
JWT_SECRET=dev-only-secret
~~~

---

## ١. خدمة [[mongo]]

### [[image: mongo:7]] و [[environment]]

| السطر | معناه |
|---|---|
| [[MONGO_INITDB_ROOT_USERNAME: $__{MONGO_ROOT_USER}]] | اسم يوزر الأدمن، من [[.env]] |
| [[MONGO_INITDB_ROOT_PASSWORD: $__{MONGO_ROOT_PASSWORD:?set it in .env}]] | الباسورد، وإجباري |

[[INITDB]] في الاسم معناها «وقت أول إنشاء». الـ image لما تلاقي فولدر الداتا فاضي بتعمل اليوزر ده وتشغّل Mongo بتسجيل دخول إجباري. ولو الداتا موجودة بتتجاهل المتغيرين. جربت أغيّر الباسورد في [[.env]] لـ [[newpass]] وأشغّل تاني على نفس الـ volume:

~~~text الناتج
mongosh "mongodb://root:newpass@..."   →  MongoServerError: Authentication failed.
mongosh "mongodb://root:secret@..."    →  { ok: 1 }
~~~

الباسورد القديم هو اللي شغال. لتغييره لازم أمر من جوه mongosh، مش [[.env]].

### [[$__{VAR}]] و [[$__{VAR:?رسالة}]] و [[$__{VAR:-قيمة}]]

compose بيفك المتغيرات دي من [[.env]] (أو الترمنال) قبل ما يعمل أي حاجة:

| الشكل | لو المتغير موجود | لو مش موجود أو فاضي |
|---|---|---|
| [[$__{VAR}]] | قيمته | فاضي (وتحذير) |
| [[$__{VAR:?msg}]] | قيمته | **يرفض يقوم** ويطبع [[msg]] |
| [[$__{VAR:-7d}]] | قيمته | [[7d]] |

جربت أشيل [[JWT_SECRET]] من [[.env]]، وبعدين أسيبه [[JWT_SECRET=]] فاضي. في الحالتين:

~~~text docker compose config
error while interpolating services.backend.environment.JWT_SECRET: required variable JWT_SECRET is missing a value: set it in .env
~~~

وexit 1، ومفيش ولا container اتعمل. ([[docker compose config]] بيطبع الملف بعد فك المتغيرات، فده أسرع طريقة تتأكد بيها.)

### [[volumes: ["mongodb_data:/data/db"]]]

[[/data/db]] الفولدر اللي Mongo بيكتب فيه جوه الـ container، و [[mongodb_data]] volume باسم. الداتا بتعيش فيه حتى لو الـ container اتمسح.

### [[healthcheck]]

~~~text
test: ["CMD", "mongosh", "--quiet", "--eval", "db.adminCommand('ping').ok"]
~~~

[[mongosh]] الـ shell بتاع Mongo (موجود جوه الـ image)، و [[--quiet]] من غير رسايل ترحيب، و [[--eval]] نفّذ الكود ده واخرج. [[db.adminCommand('ping')]] بيسأل السيرفر «انت صاحي؟» و [[.ok]] بيطلع [[1]].

ليه مفيش باسورد في الأمر؟ لأن [[ping]] من الأوامر القليلة اللي مش محتاجة تسجيل دخول. جربت الاتنين من جوه:

~~~text الناتج
mongosh --quiet --eval "db.adminCommand('ping').ok"           →  1   (exit 0)
mongosh --quiet --eval "db.getSiblingDB('admin').getUsers()"  →  MongoServerError: Command usersInfo requires authentication
~~~

فالفحص شغال، والباسورد مش مكتوب في الـ compose فمش هيبان في [[docker inspect]].

| السطر | معناه |
|---|---|
| [[interval: 30s]] | افحص كل ٣٠ ثانية |
| [[retries: 5]] | ٥ فشل ورا بعض = [[unhealthy]] |
| [[start_period: 40s]] | أول ٤٠ ثانية الفشل مش بيتحسب (Mongo لسه بيقوم) |

---

## ٢. خدمة [[backend]]

### [[depends_on: mongo: { condition: service_healthy }]]

[[depends_on]] لوحده (زي [[depends_on: [backend]]] في الفرونت) معناه «شغّل الـ container ده الأول»، حتى لو البرنامج اللي جواه لسه بيقوم. أما [[condition: service_healthy]] فمعناه «استنى الـ healthcheck ينجح». الناتج بتاع [[up -d]] بيبيّن الفرق:

~~~text docker compose up -d
 Container teach-real03-l5-mongo-1 Started
 Container teach-real03-l5-mongo-1 Waiting
 Container teach-real03-l5-mongo-1 Healthy
 Container teach-real03-l5-backend-1 Starting
 Container teach-real03-l5-backend-1 Started
 Container teach-real03-l5-frontend-1 Starting
~~~

[[Waiting]] ثم [[Healthy]]، وبعدها بس الباك إند. وعندي [[Healthy]] جه بعد حوالي ٦ ثواني مش ٤٠: Docker (من نسخة 25) بيفحص كل ٥ ثواني جوه الـ start_period، وأول نجاح بيعلن healthy على طول. ده سجل الفحوصات من [[docker inspect]]:

~~~text State.Health.Log
{"Start":"...16:08:06","ExitCode":0,"Output":"1\n"}
{"Start":"...16:08:37","ExitCode":0,"Output":"1\n"}
{"Start":"...16:09:08","ExitCode":0,"Output":"1\n"}
~~~

بعد أول نجاح، كل ٣٠ ثانية بالظبط ([[interval]]).

### [[ports: ["127.0.0.1:5000:5000"]]]

على السيرفر نفسه بس. nginx اللي على السيرفر (بالـ SSL) بيوصل لـ [[127.0.0.1:5000]]، والإنترنت لأ.

### [[environment]]

- [[MONGODB_URI]]: الرابط من [[.env]]. اقراه: [[mongodb://]] النوع، [[root:secret]] اليوزر والباسورد، [[@mongo:27017]] اسم **الخدمة** في compose والبورت، [[/myapp]] القاعدة، [[?authSource=admin]] اليوزر متعرّف في قاعدة [[admin]].
- [[JWT_SECRET]]: إجباري بـ [[:?]].
- [[JWT_EXPIRE]]: لو مش موجود [[7d]]. الباك إند عندي طبع [[JWT_EXPIRE=7d]] لأن [[.env]] مفيهوش.

الـ container اتصل فعلًا بالرابط ده ورجع [[{ ok: 1 }]]. وجربت ٣ أخطاء مشهورة:

~~~text الناتج
من غير ?authSource=admin       →  MongoServerError: Authentication failed.
باسورد غلط                    →  MongoServerError: Authentication failed.
localhost بدل mongo            →  MongoNetworkError: connect ECONNREFUSED 127.0.0.1:27017
~~~

أول اتنين نفس الرسالة، فلو شفتها اتأكد من الاتنين. والتالت: [[localhost]] جوه الباك إند معناها الباك إند نفسه، مش Mongo.

---

## ٣. [[frontend]] و [[volumes]] في الآخر

الفرونت nginx على [[127.0.0.1:8080]] (عندي 8385)، بعد الباك إند.

~~~text
volumes:
  mongodb_data:
    external: true
~~~

[[external: true]]: compose مش هيعمل الـ volume ومش هيمسحه. قبل ما أعمله:

~~~text docker compose up -d
external volume "teach-real03-mongodb_data" not found
~~~

فعملته بـ [[docker volume create]]. وبعد الشغل [[docker compose down -v]] ([[-v]] = امسح الـ volumes كمان) مسح الـ containers والشبكة، و [[docker volume ls]] لسه فيه الـ volume. أمر غلط مش هيمسح الداتا.

---

## ٤. البورتات في الآخر

~~~text docker compose ps
backend    127.0.0.1:5000->5000/tcp
frontend   127.0.0.1:8385->80/tcp
mongo      27017/tcp
~~~

Mongo من غير سهم: مش طالع على السيرفر خالص، والباك إند بيوصله على الشبكة الداخلية.

---

## الخلاصة

| الحاجة | السطر |
|---|---|
| الباسورد إجباري | [[$__{VAR:?msg}]]، و [[compose config]] يتأكد |
| الباسورد بيتحط مرة واحدة | [[MONGO_INITDB_*]] أول تشغيل بس |
| الباك إند يستنى Mongo جاهز | [[condition: service_healthy]] + healthcheck بـ [[ping]] من غير باسورد |
| الرابط | اسم الخدمة [[mongo]] و [[?authSource=admin]] |
| الداتا محمية | volume [[external: true]]، و [[down -v]] مش بيمسحه |
| مفيش حاجة مكشوفة | البورتات على [[127.0.0.1]]، و Mongo من غير [[ports]] |`,
          lines: [
            "الخدمات.",
            "قاعدة البيانات:",
            "Mongo نسخة 7.",
            "متغيرات أول تشغيل:",
            "اسم يوزر root (من .env).",
            "الباسورد، ولو مش موجود compose يرفض يقوم.",
            "الداتا في volume باسم ثابت.",
            "فحص الصحة:",
            "ping من جوه الـ container (من غير باسورد).",
            "كل ٣٠ ثانية.",
            "٥ مرات فشل ورا بعض = unhealthy.",
            "سيبه ٤٠ ثانية يقوم الأول.",
            "يقوم لوحده.",
            "الباك إند:",
            "يتبني من Dockerfile.backend.",
            "يستنى...",
            "...لحد ما Mongo يبقى healthy.",
            "البورت على السيرفر نفسه بس.",
            "المتغيرات:",
            "وضع الإنتاج.",
            "رابط Mongo (من .env).",
            "سر التوكن، ولو مش موجود compose يرفض يقوم.",
            "مدة التوكن، والافتراضي ٧ أيام.",
            "يقوم لوحده.",
            "الفرونت (Nginx):",
            "يتبني من Dockerfile.frontend.",
            "بعد الباك إند.",
            "على السيرفر نفسه بس، و Nginx اللي برّه يوصله.",
            "يقوم لوحده.",
            "الـ volumes:",
            "volume الداتا...",
            "...موجود قبل كده، و compose مش بيعمله ولا بيمسحه."
          ],
          sol: R`[[docker compose up -d]] بيطبع [[mongo-1 Waiting]] وبعدين [[mongo-1 Healthy]]، وبعدها بس [[backend-1 Starting]]. ده شغل [[condition: service_healthy]]: الباك إند مش بيتشغّل قبل ما الـ healthcheck ينجح. عندي mongo بقى [[(healthy)]] بعد حوالي ٦ ثواني مش ٤٠، لأن Docker (من نسخة 25) بيجرّب الفحص كل ٥ ثواني جوه الـ [[start_period]] ([[start_interval]] الافتراضي)، وأول نجاح بيعلن healthy على طول. الـ ٤٠ ثانية حد أقصى للفشل اللي مش بيتحسب، مش وقت انتظار.

لما شلت [[JWT_SECRET]] من [[.env]] وجربت [[docker compose config]]، compose رفض قبل ما يعمل أي حاجة:

[[error while interpolating services.backend.environment.JWT_SECRET: required variable JWT_SECRET is missing a value: set it in .env]]

وده بالظبط فايدة [[:?]]: السيرفر مايقومش بسر فاضي. وبعد ما رجّعته [[config]] عدّى، و [[JWT_EXPIRE]] خد [[7d]] الافتراضي من [[:-7d]].

لو [[up]] قال [[external volume "mongodb_data" not found]] يبقى نسيت [[docker volume create mongodb_data]]. ولو الباك إند قام وبيقول [[Authentication failed]]، الباسورد في [[MONGODB_URI]] مختلف عن [[MONGO_ROOT_PASSWORD]]، أو ناقص [[?authSource=admin]].`
        }
      ]
    }
]);
