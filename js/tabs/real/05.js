// تكملة تاب real: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/real/01.js (شرح حقول الدرس في أوله)
MORE("real", [
    {
      t: "SSL و Nginx",
      l: 2,
      n: "أول شهادة وتجديدها صح، و nginx.conf للإنتاج، وتعديل config مشترك بأمان، وباسورد لكل موظف",
      items: [
        {
          cmd: "init-ssl.sh",
          title: "أول شهادة SSL لـ Nginx جوه Docker",
          desc: R`مشكلة البيضة والفرخة: Nginx مش هيقوم بإعدادات بتشاور على شهادة لسه مش موجودة، و certbot محتاج Nginx شغال عشان Let's Encrypt تتأكد إن الدومين بتاعك.

الحل بمرحلتين: تتأكد إن DNS بيشاور على السيرفر، تشغّل Nginx بإعداد HTTP بس فيه مسار التحدي، تاخد الشهادة بـ webroot، وبعدين ترجّع الإعداد الكامل.`,
          example: R`#!/usr/bin/env bash
# أول مرة جرّب:  DRY=1 ./scripts/init-ssl.sh    ولو عدّى شغّله من غير DRY
set -euo pipefail
cd "$(dirname "$0")/.."
DOMAIN=example.com
EMAIL=you@example.com

IP=$(curl -4 -s --max-time 10 https://api.ipify.org) || { echo "can't get server IP" >&2; exit 1; }
for d in "$DOMAIN" "www.$DOMAIN"; do
  got=$(getent ahostsv4 "$d" | awk '{print $1; exit}' || true)
  [ "$got" = "$IP" ] || { echo "$d -> $__{got:-nothing}, server is $IP: fix DNS first" >&2; exit 1; }
done

mkdir -p certbot/www certbot/conf
cp nginx/nginx.conf nginx/nginx.conf.full
trap 'cp nginx/nginx.conf.full nginx/nginx.conf' EXIT
cp nginx/nginx-http-only.conf nginx/nginx.conf
docker compose up -d nginx && docker compose restart nginx

docker compose run --rm --entrypoint certbot certbot certonly $__{DRY:+--dry-run} \
  --webroot -w /var/www/certbot --email "$EMAIL" --agree-tos --no-eff-email \
  --keep-until-expiring -d "$DOMAIN" -d "www.$DOMAIN"

docker compose run --rm --entrypoint test certbot -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" \
  || { echo "no certificate yet (dry run?), nginx stays on HTTP" >&2; exit 1; }
cp nginx/nginx.conf.full nginx/nginx.conf
docker compose restart nginx
curl -fsSI "https://$DOMAIN" | head -1`,
          try: "على سيرفر تجربة ودومين تجربة (أو subdomain): شغّله بـ [[DRY=1]] الأول. لو عدّى، شغّله من غير DRY وافتح الموقع بـ https. وجرّب كمان تشغّله على دومين مش بيشاور على السيرفر: لازم يقف عند فحص DNS من غير ما يكلّم Let's Encrypt.",
          flag: "script",
          deep: {
            why: "أول شهادة هي أكتر خطوة الناس بتقف فيها في نشر Docker. ولو جرّبت غلط كذا مرة، Let's Encrypt بتوقفك (حد ٥ محاولات فاشلة في الساعة، و ٥ شهادات مكررة في الأسبوع). الترتيب ده بيخلي أول محاولة حقيقية تنجح.",
            how: R`فحص DNS الأول: [[getent ahostsv4]] بيجيب IPv4 اللي الدومين بيشاور عليه، ولو مش IP السيرفر نقف فورًا بدل ما نصرف محاولة على Let's Encrypt.

[[nginx-http-only.conf]] ملف صغير فيه server على بورت 80 بس، جواه [[location /.well-known/acme-challenge/ { root /var/www/certbot; }]] وأي حاجة تانية ترجع رسالة بسيطة. مفيهوش أي ssl_certificate، فـ Nginx يقوم.

webroot: certbot بيكتب ملف تحدي في [[certbot/www]]، و Nginx بيقدّمه من نفس الفولدر (متركّب في الاتنين)، و Let's Encrypt بتطلبه من برّه. لو وصلها يبقى الدومين بتاعك. ومحتاجش توقّف Nginx، عكس [[--standalone]].

[[--entrypoint certbot]] مهمة: لو خدمة certbot في compose ليها entrypoint بلوب التجديد (زي درس compose)، [[run]] من غيرها هيشغّل اللوب مش certonly.

[[$__{DRY:+--dry-run}]] معناها: لو المتغير DRY موجود حط [[--dry-run]]، وإلا ولا حاجة. الـ dry-run بيكلّم سيرفر التجربة بتاع Let's Encrypt (حدوده أوسع بكتير) ومش بيحفظ شهادة.

[[--keep-until-expiring]] لو الشهادة موجودة وصالحة ميطلبش جديدة، فتشغيل السكربت مرتين مش بيصرف من الحد.

الـ [[trap]] بيرجّع nginx.conf الكامل لما السكربت يخلص بأي شكل، عشان الملف اللي في git ميفضلش متغيّر. و [[cp]] مش [[mv]] عشان الملف يفضل نفس الـ inode، والـ bind mount جوه الـ container يشوف التغيير.

فحص الشهادة بيتعمل جوه container (بـ [[test -f]]) لأن فولدر live بتاع certbot ملك root، ويوزر deploy مش هيقدر يشوفه من برّه.`,
            when: "مرة واحدة لكل دومين جديد، بعد ما DNS يتظبط. بعد كده التجديد بيبقى لوحده (الدرس اللي بعده).",
            mistakes: R`في مشروع حقيقي كان السكربت من غير [[set -e]]، وبيشغّل Nginx بالإعداد الكامل اللي بيشاور على شهادة لسه مش موجودة فـ Nginx يقع، وبيوقف الخدمة بـ [[docker compose down nginx]] (والصح stop)، والمتغيرات من غير علامات تنصيص، ومن غير أي تجربة staging أو dry-run الأول.

وفي مشروع تاني كان بيستخدم [[--register-unsafely-without-email]]. الإيميل مهم لحسابك عند Let's Encrypt، بس خد بالك إنهم بطّلوا يبعتوا إيميلات «شهادتك قربت تخلص» من 2025، فالمراقبة لازم تبقى عندك.

وفي مشروع تالت كانت الشهادة بتطلع بـ [[--standalone]] (certbot يسمع على بورت 80 بنفسه)، فلازم توقف Nginx وقتها، والتجديد بعدين بيورث نفس الطريقة، وده اللي وقّع التجديد (الدرس اللي بعده).`
          },
          teach: R`## الفكرة: ٤ مراحل، وكل مرحلة بتمنع غلطة

1. اتأكد إن الدومين بيشاور على السيرفر ده (من غيره Let's Encrypt هترفض وتحسبها محاولة فاشلة).
2. شغّل Nginx بإعداد HTTP بس، مفيهوش شهادة، فيقوم.
3. خلي certbot ياخد الشهادة بطريقة webroot و Nginx شغال.
4. رجّع الإعداد الكامل بالـ SSL.

اللي اتجرّب: فحص DNS والـ IP في أوبونتو 24.04 جوه Docker، وإعداد HTTP-only ومسار التحدي في [[nginx:alpine]]، وأوامر certbot ([[--help]] و [[test -f]]) في image [[certbot/certbot]] (نسخة 5.8.0)، والـ [[trap]] والـ inode في bash. إصدار شهادة حقيقية محتاج دومين عام بيشاور على سيرفر عام، فده (ورسايل certbot وقتها) من docs بتاعة certbot و Let's Encrypt.

---

## ١. الإعداد

~~~bash
#!/usr/bin/env bash
# أول مرة جرّب:  DRY=1 ./scripts/init-ssl.sh    ولو عدّى شغّله من غير DRY
set -euo pipefail
cd "$(dirname "$0")/.."
DOMAIN=example.com
EMAIL=you@example.com
~~~

- [[set -euo pipefail]]: أي فشل يوقف، ومتغير مش متعرّف خطأ، والـ pipe يفشل لو أي حتة فيه فشلت.
- [[cd "$(dirname "$0")/.."]]: السكربت في [[scripts/]]، فـ [[dirname "$0"]] = [[scripts]]، و [[/..]] = الفولدر اللي فوقه، يعني فولدر المشروع اللي فيه [[compose.yml]].
- [[EMAIL]]: إيميل حسابك عند Let's Encrypt.

---

## ٢. IP السيرفر

~~~bash
IP=$(curl -4 -s --max-time 10 https://api.ipify.org) || { echo "can't get server IP" >&2; exit 1; }
~~~

[[api.ipify.org]] موقع بيرد بالـ IP اللي الطلب جاي منه، يعني IP السيرفر العام زي ما الإنترنت شايفه. [[-4]] اسأل بـ IPv4 بس، و [[-s]] من غير progress، و [[--max-time 10]] متستناش أكتر من ١٠ ثواني. ولو فشل: رسالة واضحة على stderr ([[>&2]]) وخروج.

جربته من container وطلّع IP من ١٢ حرف (مش هكتبه هنا، ده IP بيتي العام). على السيرفر الحقيقي هيطلع زي [[203.0.113.10]].

---

## ٣. الدومين بيشاور فين؟

~~~bash
for d in "$DOMAIN" "www.$DOMAIN"; do
  got=$(getent ahostsv4 "$d" | awk '{print $1; exit}' || true)
  [ "$got" = "$IP" ] || { echo "$d -> $__{got:-nothing}, server is $IP: fix DNS first" >&2; exit 1; }
done
~~~

### [[getent ahostsv4]]

[[getent]] بيسأل النظام نفس الطريقة اللي البرامج بتسأل بيها (DNS و [[/etc/hosts]])، و [[ahostsv4]] = عناوين IPv4. على [[example.com]] الحقيقي:

~~~text الناتج
172.66.147.243  STREAM example.com
172.66.147.243  DGRAM  
172.66.147.243  RAW    
104.20.23.154   STREAM 
~~~

كل IP بيتكرر ٣ مرات (لكل نوع socket)، ودومين ممكن يبقى ليه أكتر من IP.

### [[awk '{print $1; exit}']]

[[awk]] بيقسم كل سطر لأعمدة: [[$1]] أول عمود. [[print $1; exit]] = اطبع أول عمود من **أول سطر** واقف. الناتج: [[172.66.147.243]].

### [[|| true]]: ليه لازم

دومين مش موجود: [[getent]] بيرجع [[2]]. ومع [[pipefail]] الـ pipe كله فاشل، ومع [[set -e]] السكربت بيقف **ساكت**. جربتها من غير [[|| true]]: خرج بـ 2 ومن غير أي رسالة. ومعاها، [[got]] بيبقى فاضي والسطر اللي بعده يطبع رسالة مفهومة.

### المقارنة

[[$__{got:-nothing}]]: لو [[got]] فاضي اكتب [[nothing]]. جربت بدومين مش موجود و [[IP=203.0.113.10]]:

~~~text الناتج
nothing.invalid -> nothing, server is 203.0.113.10: fix DNS first
~~~

اللوب بيعدّي على [[example.com]] و [[www.example.com]]، لأن الشهادة هتبقى للاتنين، والاتنين لازم يشاوروا على السيرفر.

---

## ٤. Nginx بإعداد HTTP بس

~~~bash
mkdir -p certbot/www certbot/conf
cp nginx/nginx.conf nginx/nginx.conf.full
trap 'cp nginx/nginx.conf.full nginx/nginx.conf' EXIT
cp nginx/nginx-http-only.conf nginx/nginx.conf
docker compose up -d nginx && docker compose restart nginx
~~~

### الفولدرين

[[certbot/www]] = الـ webroot (ملفات التحدي)، و [[certbot/conf]] = [[/etc/letsencrypt]] (الحساب والشهادات). الاتنين متركّبين في compose: [[www]] في Nginx و certbot، و [[conf]] في الاتنين برضه.

### ليه Nginx مش هيقوم بالإعداد الكامل؟

جربت [[nginx -t]] على إعداد فيه [[ssl_certificate]] لملف مش موجود:

~~~text الناتج
nginx: [emerg] cannot load certificate "/etc/letsencrypt/live/example.com/fullchain.pem": BIO_new_file() failed (SSL: error:80000002:system library::No such file or directory...)
~~~

ده «البيضة والفرخة»: Nginx محتاج الشهادة عشان يقوم، و certbot محتاج Nginx عشان ياخدها.

### [[trap '...' EXIT]]

[[trap]] بيسجّل أمر يتنفّذ لما الـ shell يخرج **بأي شكل**: نجاح، أو [[exit 1]]، أو [[set -e]] وقّفه. فبعد ما نحفظ نسخة [[.full]]، أيًا كان اللي يحصل الملف الكامل هيرجع. جربت: حطيت [[http]] في الملف، وفشل أمر، والـ trap رجّع [[full]].

### [[cp]] مش [[mv]]

جربت على ملف وبصيت على رقم الـ inode (رقم الملف على الديسك) بـ [[ls -i]]:

~~~text الناتج
159430 a.conf      الأصلي
159430 a.conf      بعد cp ملف تاني فوقه: نفس الرقم
460239 a.conf      بعد mv ملف تاني مكانه: رقم جديد
~~~

compose بيركّب [[nginx.conf]] كملف واحد (bind mount)، والـ container ماسك الـ inode. [[cp]] بيكتب جوه نفس الملف فالـ container يشوف الجديد، و [[mv]] بيحط ملف تاني والـ container يفضل شايف القديم.

### [[nginx-http-only.conf]]

الملف ده مش في المثال، شكله تقريبًا:

~~~text nginx-http-only.conf (جوه http {})
server {
  listen 80;
  server_name example.com www.example.com;
  location /.well-known/acme-challenge/ { root /var/www/certbot; }
  location / { return 200 "ssl setup in progress\n"; }
}
~~~

جربته في [[nginx:alpine]]: [[nginx -t]] قال [[test is successful]]، وملف تحدي حطيته في [[/var/www/certbot/.well-known/acme-challenge/abc]] اتقدّم:

~~~text الناتج
$ curl -s -H "Host: example.com" localhost/.well-known/acme-challenge/abc
token-abc
$ curl -s localhost/
ssl setup in progress
~~~

[[root /var/www/certbot]] معناها: المسار المطلوب بيتلزق بعد الفولدر ده، فـ [[/.well-known/acme-challenge/abc]] = [[/var/www/certbot/.well-known/acme-challenge/abc]].

### [[up -d nginx && restart nginx]]

[[up -d]] بيشغّل Nginx لو مش شغال. ولو كان شغال من قبل، مش هيقرا الإعداد الجديد، فـ [[restart]] بيضمن إنه قراه.

---

## ٥. اطلب الشهادة

~~~bash
docker compose run --rm --entrypoint certbot certbot certonly $__{DRY:+--dry-run} \
  --webroot -w /var/www/certbot --email "$EMAIL" --agree-tos --no-eff-email \
  --keep-until-expiring -d "$DOMAIN" -d "www.$DOMAIN"
~~~

الـ [[\]] في آخر السطر معناها «الأمر مكمّل في السطر اللي بعده».

### [[docker compose run --rm --entrypoint certbot certbot]]

| الجزء | معناه |
|---|---|
| [[run]] | شغّل container واحد مؤقت من خدمة في compose، بنفس الـ volumes |
| [[--rm]] | امسحه لما يخلص |
| [[--entrypoint certbot]] | البرنامج اللي يتشغّل. مهمة لو الخدمة ليها entrypoint تاني (لوب تجديد مثلًا) |
| [[certbot]] (التانية) | اسم الخدمة في compose |
| [[certonly]] | هات شهادة بس، متعدّلش إعدادات Nginx |

### [[$__{DRY:+--dry-run}]]

عكس [[:-]]: [[:+]] معناها «لو المتغير موجود ومش فاضي، حط الكلام ده، وإلا ولا حاجة». جربت:

~~~text الناتج
DRY=1    →  certonly --dry-run --webroot
من غيره  →  certonly --webroot
~~~

ومن غير علامات تنصيص عن قصد، عشان لما تبقى فاضية تختفي خالص. و [[set -u]] مش بيزعّق هنا حتى لو [[DRY]] مش متعرّف، لأن [[:+]] بتتعامل مع ده.

### باقي الـ flags (من [[certbot --help]])

| الـ flag | معناه |
|---|---|
| [[--dry-run]] | تجربة على سيرفر الـ staging بتاع Let's Encrypt، من غير ما تحفظ شهادة |
| [[--webroot -w /var/www/certbot]] | حط ملف التحدي في الفولدر ده (اللي Nginx بيقدّم منه) |
| [[--email]] | إيميل الحساب |
| [[--agree-tos]] | وافق على الشروط من غير ما تسأل (السكربت مفيهوش حد يرد) |
| [[--no-eff-email]] | متشاركش الإيميل مع EFF (من غيرها بيسأل) |
| [[--keep-until-expiring]] | لو فيه شهادة صالحة لنفس الدومينات، متطلبش جديدة |
| [[-d]] | دومين. مرتين = شهادة واحدة للاتنين |

### اللي بيحصل في webroot (من الـ docs)

certbot بيطلب من Let's Encrypt، فهي بتدّيله كلمة عشوائية. هو بيكتبها في ملف جوه [[/var/www/certbot/.well-known/acme-challenge/]]. Let's Encrypt بتطلب [[http://example.com/.well-known/acme-challenge/<الاسم>]] من برّه، و Nginx بيقدّمه (زي [[token-abc]] فوق). لو وصلها صح، يبقى انت ماسك الدومين، فتدّيله الشهادة. والرسالة لما تنجح [[Successfully received certificate.]]، وفي الـ dry run [[The dry run was successful.]].

---

## ٦. اتأكد إن الشهادة اتحفظت

~~~bash
docker compose run --rm --entrypoint test certbot -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" \
  || { echo "no certificate yet (dry run?), nginx stays on HTTP" >&2; exit 1; }
~~~

نفس فكرة [[run]]، بس البرنامج [[test]] مش certbot: [[test -f FILE]] نجاح لو الملف موجود. ليه جوه container؟ لأن [[certbot/conf]] اللي على السيرفر ملفاته ملك root، ويوزر [[deploy]] مش هيشوفها. جربت على image certbot من غير شهادة:

~~~text الناتج
$ docker run --rm --entrypoint test certbot/certbot -f /etc/letsencrypt/live/example.com/fullchain.pem
$ echo $?
1
~~~

فـ [[||]] بيطبع الرسالة ويخرج. وده اللي بيحصل في [[DRY=1]] دايمًا (الـ dry run مش بيحفظ شهادة)، والـ [[trap]] بيرجّع الإعداد الكامل للملف، بس Nginx فاضل شغال بالـ HTTP-only لحد التشغيل الجاي.

---

## ٧. الإعداد الكامل

~~~bash
cp nginx/nginx.conf.full nginx/nginx.conf
docker compose restart nginx
curl -fsSI "https://$DOMAIN" | head -1
~~~

رجّع الملف (برضه [[cp]] عشان الـ inode)، و [[restart]] عشان Nginx يقراه بالشهادة. وفي الآخر [[curl -I]] (HEAD: الهيدرز بس) على https، و [[head -1]] أول سطر، المفروض [[HTTP/2 200]]. لو الشهادة غلط، [[-f]] و curl نفسه هيفشلوا.

---

## ملخص

| # | الخطوة | بتمنع إيه |
|---|---|---|
| ١ | IP السيرفر + [[getent]] للدومينين | محاولة فاشلة على Let's Encrypt بسبب DNS |
| ٢ | [[trap]] + إعداد HTTP-only | Nginx ميقومش من غير شهادة، والملف يفضل متغيّر |
| ٣ | [[certonly --webroot]] (و [[DRY]]) | توقيف Nginx، أو صرف الحد في تجارب |
| ٤ | [[test -f]] جوه container | تحويل Nginx لـ SSL من غير شهادة |
| ٥ | الإعداد الكامل + [[curl]] | تقول «تمام» من غير ما https يرد فعلًا |

## الخلاصة

- جرّب بـ [[DRY=1]] الأول دايمًا: الـ staging حدوده أوسع.
- [[|| true]] بعد [[getent]] عشان الفشل يطلع برسالة مش سكوت.
- [[cp]] فوق ملف متركّب، مش [[mv]].`,
          lines: [
            "أي فشل يوقف السكربت.",
            "اشتغل من فولدر المشروع.",
            "الدومين.",
            "الإيميل لحساب Let's Encrypt.",
            "IP السيرفر العام، ولو فشل اقف برسالة.",
            "لف على الدومين و www...",
            "...هات الـ IPv4 اللي بيشاور عليه ([[|| true]]: لو الدومين مش متسجّل getent بيفشل، ومع pipefail و [[set -e]] السكربت كان هيقع ساكت من غير رسالة).",
            "...لو مش IP السيرفر اقف قبل ما تكلّم Let's Encrypt.",
            "نهاية اللوب.",
            "الفولدرات اللي هتتركّب في Nginx و certbot.",
            "احفظ نسخة من الإعداد الكامل.",
            "أيًا كان اللي يحصل، رجّع الإعداد الكامل في الآخر.",
            "حط إعداد HTTP بس (نفس الـ inode).",
            "شغّل Nginx، واعمله restart عشان يقرا الإعداد الجديد.",
            "اطلب الشهادة بـ certbot (أو dry-run لو DRY موجود)...",
            "...بطريقة webroot، والإيميل، والموافقة على الشروط...",
            "...ومتطلبش جديدة لو فيه صالحة، للدومين و www.",
            "اتأكد إن الشهادة اتحفظت (من جوه container لأن الفولدر ملك root)...",
            "...ولو مش موجودة اقف.",
            "رجّع الإعداد الكامل بالـ SSL.",
            "restart لـ Nginx عشان يقراه.",
            "اتأكد إن https بيرد."
          ],
          sol: R`بـ [[DRY=1]] والـ DNS صح، certbot بيقول [[The dry run was successful.]]، وبعدين فحص [[fullchain.pem]] بيفشل (لأن dry run مابيحفظش شهادة)، فالسكربت بيطبع [[no certificate yet (dry run?), nginx stays on HTTP]] ويخرج بـ 1، و [[trap]] بيرجّع [[nginx.conf]] الكامل. ده متوقع. من غير DRY بتشوف [[Successfully received certificate.]] وفي الآخر [[HTTP/2 200]] من الـ curl.

على دومين مش بيشاور على السيرفر، بيقف قبل أي حاجة: [[test.example.com -> 198.51.100.4, server is 203.0.113.10: fix DNS first]] أو [[-> nothing]] لو مفيش record أصلًا. جربت منطق الفحص ده وطلّع نفس الرسالة. الفايدة إنك متكلّمش Let's Encrypt وانت عارف إنه هيفشل، لأنه بيحظرك مؤقتًا بعد محاولات فاشلة كتير (rate limit).

لو certbot قال [[Timeout during connect]] أو [[Invalid response ... 404]]، يبقى بورت 80 مقفول أو [[/.well-known/acme-challenge/]] مش بيروح لـ [[/var/www/certbot]]. (ده محتاج سيرفر ودومين حقيقي، فجربت جزء فحص DNS بس.)`
        },
        {
          cmd: "renew-ssl.sh",
          title: "تجديد الشهادة اللي مبيفشلش في صمت",
          desc: "Let's Encrypt بتدّي شهادة ٩٠ يوم، والتجديد لازم يبقى أوتوماتيك. السكربت ده بيشتغل من cron كل يوم: يجدد لو لازم، ولو اتجددت فعلًا يعمل reload لـ Nginx، وبعدين يسأل الموقع نفسه «الشهادة اللي بتقدّمها فاضلها كام يوم؟» ويصرّخ لو أقل من ١٤.",
          example: R`#!/usr/bin/env bash
# /etc/cron.d/myapp-ssl  (كل يوم الساعة 3:17):
# 17 3 * * * deploy /opt/myapp/scripts/renew-ssl.sh >> /home/deploy/ssl-renew.log 2>&1
set -euo pipefail
cd "$(dirname "$0")/.."
DOMAIN=example.com
echo "== $(date '+%F %T')"

docker compose run --rm --entrypoint certbot certbot renew \
  --deploy-hook 'touch /etc/letsencrypt/.renewed'

if docker compose run --rm --entrypoint sh certbot -c 'test -f /etc/letsencrypt/.renewed && rm /etc/letsencrypt/.renewed'; then
  docker compose exec -T nginx nginx -t
  docker compose exec -T nginx nginx -s reload
  echo "renewed, nginx reloaded"
fi

END=$(echo | openssl s_client -connect "$DOMAIN:443" -servername "$DOMAIN" 2>/dev/null | openssl x509 -noout -enddate | cut -d= -f2) || true
[ -n "$END" ] || { echo "ALERT: $DOMAIN unreachable or no certificate served" >&2; exit 1; }
DAYS=$(( ( $(date -d "$END" +%s) - $(date +%s) ) / 86400 ))
echo "served certificate: $DAYS days left"
[ "$DAYS" -ge 14 ] || { echo "ALERT: $DOMAIN expires in $DAYS days" >&2; exit 1; }`,
          try: "على سيرفر التجربة جرّب [[docker compose run --rm --entrypoint certbot certbot renew --dry-run]] الأول: لازم يقول Congratulations. بعدين شغّل السكربت بإيدك واقرا عدد الأيام، وحطه في cron واتأكد بعد يوم إن اللوج فيه سطر جديد.",
          flag: "script",
          deep: {
            why: "الشهادة بتخلص بعد ٩٠ يوم. لو التجديد بيفشل ومحدش شايف، هتعرف لما الموقع يطلع «Not Secure» للعملاء. وحتى لو التجديد نجح، Nginx لازم يعمل reload وإلا هيفضل يقدّم الشهادة القديمة من الذاكرة لحد ما تخلص.",
            how: R`[[certbot renew]] بيعدّي على كل شهادة، وبيجدد بس اللي فاضلها أقل من ٣٠ يوم. وبيستخدم نفس الطريقة اللي الشهادة طلعت بيها أول مرة (محفوظة في [[/etc/letsencrypt/renewal/example.com.conf]]): لو طلعت بـ webroot يجدد بـ webroot، ولو بـ standalone يحاول يسمع على 80 بنفسه.

[[--deploy-hook]] أمر بيتنفذ بس لما شهادة تتجدد فعلًا. بس هو بيتنفذ جوه container بتاع certbot، ومن هناك مش هيقدر يكلّم Nginx. فبنخليه يعمل ملف علامة [[.renewed]]، وبرّه نشوف: لو الملف موجود، امسحه واعمل reload.

[[nginx -t]] قبل الـ reload: لو الإعدادات فيها غلطة، [[set -e]] يوقف قبل ما نلمس Nginx الشغال. و [[-T]] في [[exec]] عشان cron مفيهوش terminal.

الفحص الأخير أهم سطر: [[openssl s_client]] بيتصل بالموقع زي أي متصفح، ويجيب الشهادة اللي Nginx «بيقدّمها فعلًا»، مش اللي على الديسك. فلو التجديد حصل والـ reload محصلش، أو التجديد نفسه فاشل من شهور، الرقم هيقل وهيطلع ALERT. و [[exit 1]] بيخلي cron (أو أي مراقبة) يعرف.

ولو certbot متسطب على السيرفر نفسه و Nginx في container، والشهادة طلعت standalone، التجديد لازم يوقف Nginx ويشغّله: [[certbot renew --pre-hook "docker compose -f /opt/myapp/compose.yml stop nginx" --post-hook "docker compose -f /opt/myapp/compose.yml start nginx"]]. بس الأحسن تحوّلها لـ webroot.

اختار طريقة واحدة: يا السكربت ده في cron، يا لوب التجديد جوه compose (الدرس الجاي). الـ cron أحسن لأن ليه لوج وتنبيه.`,
            when: "مع أي شهادة Let's Encrypt على Docker. حطه في cron مرة أو مرتين في اليوم؛ certbot مش هيعمل حاجة لو مفيش تجديد مطلوب.",
            mistakes: R`في مشروع حقيقي الشهادة طلعت بـ [[certbot certonly --standalone]]، والـ cron كان [[certbot renew --quiet]] كل يوم. الـ renew بيحاول يسمع على بورت 80 و Nginx ماسكه، فبيفشل. و [[--quiet]] بيخبّي الفشل، والـ cron مش متوجّه لأي لوج، فمحدش عرف لحد ما الشهادة خلصت فعلًا بعد ٩٠ يوم. والنسخ لفولدر ssl والـ restart كانوا بيحصلوا كل يوم حتى من غير تجديد، ومكانهم الصح [[--deploy-hook]].

وفي مشروع تاني كان certbot بيجدد كل ١٢ ساعة جوه compose وده شغال، بس Nginx عمره ما عمل reload، فكان بيقدّم الشهادة القديمة لحد ما حد يعمل restart بالصدفة.`
          },
          teach: R`## الفكرة: جدد، اعمل reload لو لزم، واسأل الموقع نفسه

السكربت ٣ أجزاء: [[certbot renew]] بيجدد لو الشهادة قربت تخلص، ولو جددها فعلًا Nginx يعمل reload، وفي الآخر بنتصل بالموقع زي أي متصفح ونقرا تاريخ انتهاء الشهادة **اللي بيقدّمها** دلوقتي. لو فاضلها أقل من ١٤ يوم، السكربت يفشل.

اللي اتجرّب: [[certbot renew]] ومنطق ملف العلامة في image [[certbot/certbot]] (نسخة 5.8.0، من غير شهادات حقيقية)، والجزء الأخير كامل في أوبونتو 24.04 جوه Docker ضد [[nginx:alpine]] اسمه على الشبكة [[example.com]] وبيقدّم شهادة self-signed عملتها بـ openssl. التجديد الحقيقي محتاج شهادة Let's Encrypt حقيقية، فرسايله من docs بتاعة certbot.

---

## ١. سطر الـ cron (تعليق في أول الملف)

~~~text /etc/cron.d/myapp-ssl
17 3 * * * deploy /opt/myapp/scripts/renew-ssl.sh >> /home/deploy/ssl-renew.log 2>&1
~~~

| الجزء | معناه |
|---|---|
| [[17 3 * * *]] | الدقيقة ١٧، الساعة ٣، كل يوم في الشهر، كل شهر، كل يوم في الأسبوع. يعني ٣:١٧ الفجر كل يوم |
| [[deploy]] | اليوزر اللي هيشغّله. الخانة دي موجودة في ملفات [[/etc/cron.d]] بس، مش في [[crontab -e]] |
| [[>> file]] | ضيف الناتج لآخر ملف اللوج |
| [[2>&1]] | والأخطاء (stderr) كمان في نفس الملف |

ليه ٣:١٧ مش ٣:٠٠؟ ناس كتير بتحط الساعة بالظبط، فاختيار دقيقة عشوائية بيبعد عن الزحمة على سيرفرات Let's Encrypt.

---

## ٢. الإعداد

~~~bash
set -euo pipefail
cd "$(dirname "$0")/.."
DOMAIN=example.com
echo "== $(date '+%F %T')"
~~~

- [[set -euo pipefail]]: أي فشل يوقف، ومتغير مش متعرّف خطأ، والـ pipe يفشل لو أي حتة فيه فشلت.
- [[cd "$(dirname "$0")/.."]]: السكربت في [[scripts/]]، فبنطلع فولدر واحد لفولدر المشروع اللي فيه [[compose.yml]]. ومهم مع cron بالذات لأنه بيبدأ في الـ home.
- [[echo "== ..."]]: سطر فاصل بالتاريخ والوقت في اللوج، فكل يوم يبان لوحده: [[== 2026-10-07 03:17:00]].

---

## ٣. التجديد

~~~bash
docker compose run --rm --entrypoint certbot certbot renew \
  --deploy-hook 'touch /etc/letsencrypt/.renewed'
~~~

- [[docker compose run --rm --entrypoint certbot certbot]]: container مؤقت من خدمة [[certbot]] بنفس الـ volumes، والبرنامج certbot نفسه (مش أي entrypoint تاني الخدمة ليها)، ويتمسح لما يخلص.
- [[renew]]: لف على كل الشهادات في [[/etc/letsencrypt/renewal/]] وجدد اللي فاضلها أقل من ٣٠ يوم، بنفس الطريقة اللي طلعت بيها (webroot مثلًا).
- [[--deploy-hook CMD]]: أمر بيتنفّذ مرة لكل شهادة **اتجددت فعلًا**. لو مفيش تجديد، مش بيتنفّذ.

من غير شهادات خالص، [[certbot renew]] طلّع:

~~~text الناتج
No renewals were attempted.
No hooks were run.
~~~

وخرج بـ 0. وعلى شهادة لسه جديدة، certbot بيقول [[Certificate not yet due for renewal]] (من الـ docs).

### ليه ملف علامة ومش reload مباشرة؟

الـ hook بيتنفّذ **جوه container الـ certbot**، ومن هناك مفيش Docker ولا Nginx. فبنخليه يعمل حاجة واحدة يقدر عليها: ملف فاضي [[.renewed]] في [[/etc/letsencrypt]] (فولدر متركّب على الديسك، فبيفضل بعد ما الـ container يتمسح). وبرّه نشوفه.

> [[--dry-run]] مع [[renew]] مش بيشغّل الـ deploy hooks، إلا لو ضفت [[--run-deploy-hooks]] (مكتوب في [[certbot --help renew]]).

---

## ٤. لو اتجددت: reload

~~~bash
if docker compose run --rm --entrypoint sh certbot -c 'test -f /etc/letsencrypt/.renewed && rm /etc/letsencrypt/.renewed'; then
  docker compose exec -T nginx nginx -t
  docker compose exec -T nginx nginx -s reload
  echo "renewed, nginx reloaded"
fi
~~~

### الشرط

container مؤقت تاني، بس البرنامج [[sh -c '...']] (shell بينفّذ النص ده):

- [[test -f .renewed]]: الملف موجود؟
- [[&& rm .renewed]]: لو آه امسحه، عشان بكرة ميعملش reload تاني من غير سبب.

نجاح الاتنين = [[if]] ينفّذ [[then]]. لو مفيش ملف، [[test]] بيفشل والـ [[if]] بيعدّي (وفشل جوه شرط [[if]] مش بيوقف السكربت مع [[set -e]]). جربت المنطق ده في image certbot:

~~~text الناتج
no marker -> no reload           من غير الملف
marker found -> reload           بعد touch .renewed
~~~

### [[nginx -t]] ثم [[nginx -s reload]]

- [[docker compose exec -T nginx CMD]]: نفّذ أمر جوه container الـ nginx الشغال. [[-T]] من غير terminal، لازم في cron لأن مفيش terminal.
- [[nginx -t]]: اختبر الإعدادات. لو فيها غلطة، [[set -e]] يوقف قبل الـ reload.
- [[nginx -s reload]]: [[-s]] = signal. قول لـ Nginx يقرا الإعدادات والشهادات من جديد، من غير ما يقطع الاتصالات الشغالة.

### ليه الـ reload لازم؟ جربتها

Nginx بيقرا الشهادة من الديسك **مرة واحدة** لما يقوم أو يعمل reload. بدّلت ملف الشهادة على الديسك بشهادة ٩٠ يوم، والموقع كان بيقدّم شهادة ١٠ أيام:

~~~text الناتج
== قبل الـ reload
served certificate: 9 days left
ALERT: example.com expires in 9 days
== بعد nginx -s reload
served certificate: 89 days left
~~~

يعني الملف الجديد على الديسك ومش بيتقدّم لحد الـ reload.

---

## ٥. الشهادة اللي بتتقدّم فعلًا

~~~bash
END=$(echo | openssl s_client -connect "$DOMAIN:443" -servername "$DOMAIN" 2>/dev/null | openssl x509 -noout -enddate | cut -d= -f2) || true
~~~

من الشمال لليمين:

| الحتة | بتعمل إيه |
|---|---|
| [[echo |]] | ابعت سطر فاضي، فـ s_client يخلص ويقفل بدل ما يستنى كلام منك |
| [[openssl s_client -connect example.com:443]] | اتصل بالموقع على 443 واعمل TLS handshake زي أي متصفح، واطبع الشهادة |
| [[-servername example.com]] | SNI: قول للسيرفر انت عايز أنهي دومين (سيرفر واحد ممكن يبقى عليه كذا شهادة) |
| [[2>/dev/null]] | ارمي رسايل الاتصال |
| [[openssl x509 -noout -enddate]] | اقرا الشهادة من الـ pipe، ومتطبعهاش ([[-noout]])، اطبع تاريخ انتهائها بس |
| [[cut -d= -f2]] | قسّم على [[=]] وخد الجزء التاني |
| [[|| true]] | لو أي حاجة فشلت، متخلّيش [[set -e]] يوقف ساكت |

خطوة بخطوة على السيرفر التجريبي:

~~~text الناتج
$ ... | openssl x509 -noout -enddate
notAfter=Oct 17 15:42:20 2026 GMT
~~~

وبعد [[cut]]: [[Oct 17 15:42:20 2026 GMT]].

### الموقع مش بيرد

~~~bash
[ -n "$END" ] || { echo "ALERT: $DOMAIN unreachable or no certificate served" >&2; exit 1; }
~~~

[[-n]] = النص مش فاضي. جربت على سيرفر مفيهوش 443:

~~~text الناتج
Could not read certificate from <stdin>
Unable to load certificate
ALERT: srv unreachable or no certificate served
~~~

السطرين الأولانيين من [[openssl x509]] لما ملقاش شهادة، والتالت رسالتنا، و exit [[1]].

---

## ٦. كام يوم فاضل

~~~bash
DAYS=$(( ( $(date -d "$END" +%s) - $(date +%s) ) / 86400 ))
echo "served certificate: $DAYS days left"
[ "$DAYS" -ge 14 ] || { echo "ALERT: $DOMAIN expires in $DAYS days" >&2; exit 1; }
~~~

- [[date -d "Oct 17 15:42:20 2026 GMT" +%s]]: حوّل التاريخ ده لعدد الثواني من ١ يناير ١٩٧٠ (Unix time). و [[date +%s]] نفس الكلام للحظة دي.
- [[$(( ... ))]]: حساب أرقام صحيحة في bash. الفرق بالثواني، و [[/ 86400]] (ثواني اليوم = ٢٤ × ٦٠ × ٦٠) بيحوّله أيام.
- [[-ge 14]]: greater or equal، أكبر من أو يساوي ١٤.

الشهادة التجريبية اتعملت بـ [[-days 10]] قبلها بدقيقة، والناتج:

~~~text الناتج
served certificate: 9 days left
ALERT: example.com expires in 9 days
~~~

ليه ٩ مش ١٠؟ لأن القسمة في bash بتشيل الكسر: فاضل ٩ أيام و ٢٣ ساعة وشوية، فيطلع ٩. و ١٤ يوم حد مريح: certbot بيبدأ يجدد عند ٣٠، فلو وصلنا ١٤ يبقى التجديد بيفشل من أكتر من أسبوعين.

> [[date -d]] بتاع لينكس (GNU). على الماك [[date]] مختلف ومفيهوش [[-d]]، بس السكربت ده معمول للسيرفر.

---

## ملخص

| # | الخطوة | لو حصل |
|---|---|---|
| ١ | [[certbot renew --deploy-hook]] | اتجددت: ملف [[.renewed]] |
| ٢ | فيه [[.renewed]]؟ | [[nginx -t]] ثم [[reload]] |
| ٣ | [[s_client]] + [[x509 -enddate]] | مفيش رد: ALERT و exit 1 |
| ٤ | الأيام أقل من ١٤ | ALERT و exit 1 |

## الخلاصة

- التجديد على الديسك ≠ الشهادة اللي بتتقدّم: من غير reload، Nginx بيفضل على القديمة.
- الفحص الأخير بيسأل الموقع نفسه، فبيمسك أي سبب: تجديد فاشل، reload محصلش، أو Nginx واقع.
- [[exit 1]] + اللوج = حد يقدر يعرف. [[--quiet]] من غير لوج = محدش هيعرف.`,
          lines: [
            "أي فشل يوقف السكربت.",
            "اشتغل من فولدر المشروع.",
            "الدومين اللي هنفحصه.",
            "سطر بالتاريخ في اللوج.",
            "جدد أي شهادة فاضلها أقل من ٣٠ يوم...",
            "...ولو اتجددت فعلًا اعمل ملف علامة.",
            "لو ملف العلامة موجود (امسحه)...",
            "...افحص إعدادات Nginx.",
            "...واعمل reload عشان يقرا الشهادة الجديدة.",
            "...وقول.",
            "نهاية الـ if.",
            "تاريخ انتهاء الشهادة اللي الموقع بيقدّمها فعلًا. و || true عشان لو الموقع مش بيرد، set -e ميقفلش السكربت ساكت.",
            "لو مفيش تاريخ (الموقع واقع أو مفيش شهادة)، ده في حد ذاته تنبيه: اطبعه واخرج بفشل.",
            "كام يوم فاضل.",
            "اطبعه في اللوج.",
            "لو أقل من ١٤ يوم، اطبع تنبيه واخرج بفشل."
          ],
          sol: R`[[certbot renew --dry-run]] لازم يخلص بـ [[Congratulations, all simulated renewals succeeded]]. لو قال [[failed]] المشكلة غالبًا بورت 80 أو مسار الـ webroot.

تشغيل السكربت بإيدك والشهادة لسه جديدة بيطبع [[== 2026-09-30 03:17:00]]، وبعدها certbot بيقول [[Certificate not yet due for renewal]] (فمفيش reload)، وفي الآخر [[served certificate: 85 days left]]. جربت حساب الأيام على شهادة سيرفر عام وطلع [[21]] يوم، والحساب بيقرا الشهادة اللي بتتقدّم فعلًا، مش الملف اللي على الديسك. وده بيمسك حالة إن certbot جدّد بس Nginx ماعملش reload.

بعد يوم في cron، [[tail /home/deploy/ssl-renew.log]] لازم يكون فيه سطر [[==]] بتاريخ النهارده. لو فاضي، cron ماشتغلش (راجع [[/etc/cron.d]]: لازم فيه اسم اليوزر، والملف ينتهي بسطر فاضي). ولو فيه [[ALERT: ... unreachable]] يبقى السيرفر مش بيرد على 443 من جوه نفسه.`
        },
        {
          cmd: "nginx.conf (Next.js)",
          title: "إعدادات Nginx للإنتاج قدام Next.js في Docker",
          desc: "ملف nginx.conf كامل لموقع Next.js في compose: يرفض أي دومين غريب، يحوّل HTTP و www لدومين واحد بـ https، TLS و HSTS، و gzip، و rate limit، و buffers كبيرة للكوكيز، وكاش سنة لملفات [[/_next/static]].",
          example: R`events { worker_connections 1024; }
http {
  include /etc/nginx/mime.types; client_max_body_size 20M;
  gzip on; gzip_proxied any; gzip_types text/css application/javascript application/json image/svg+xml;
  limit_req_zone $binary_remote_addr zone=perip:10m rate=10r/s;
  ssl_certificate     /etc/letsencrypt/live/example.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

  server { listen 80 default_server; return 444; }
  server { listen 443 ssl default_server; ssl_reject_handshake on; }
  server {
    listen 80; server_name example.com www.example.com;
    location /.well-known/acme-challenge/ { root /var/www/certbot; }
    location / { return 301 https://example.com$request_uri; }
  }
  server { listen 443 ssl; http2 on; server_name www.example.com; return 301 https://example.com$request_uri; }
  server {
    listen 443 ssl; http2 on; server_name example.com;
    add_header Strict-Transport-Security "max-age=63072000" always;
    add_header X-Content-Type-Options "nosniff" always;
    location / {
      proxy_pass http://app:3000;
      proxy_set_header Host $host;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto $scheme;
      proxy_buffer_size 128k; proxy_buffers 4 256k; proxy_busy_buffers_size 256k;
      limit_req zone=perip burst=20 nodelay;
    }
    location /_next/static/ { proxy_pass http://app:3000; add_header Cache-Control "public, max-age=31536000, immutable"; }
  }
}`,
          try: R`بعد ما تحطه: [[docker compose exec nginx nginx -t]]، وبعدين [[curl -I http://example.com]] (لازم 301)، و [[curl -I https://www.example.com]] (لازم 301 لـ example.com)، و [[curl -I -H "Host: other.test" http://203.0.113.10]] (لازم الاتصال يتقفل من غير رد).`,
          flag: "script",
          deep: {
            why: "Next.js لوحده مش مفروض يواجه الإنترنت: Nginx قدامه بيعمل TLS، ويضغط، ويحدد عدد الطلبات، ويرفض الدومينات الغريبة، وبيقدّم الملفات الثابتة بكاش طويل.",
            how: R`الـ default servers: أي طلب بـ Host مش واحد من دوميناتك (أو بالـ IP مباشرة) بيقع في الـ server اللي عليه [[default_server]]. على 80 بيرجع [[444]] (Nginx يقفل الاتصال من غير رد). وعلى 443 [[ssl_reject_handshake on]] بيرفض الـ TLS من الأول، فمش هيدّي شهادتك لدومين غريب. ده بيحميك لو حد وجّه دومينه على الـ IP بتاعك عشان يعمل نسخة من موقعك.

الشهادة متعرّفة مرة واحدة في [[http]]، وكل server على 443 بيورثها.

التحويلات: HTTP كله لـ https، و www على https لـ الدومين من غير www، فيبقى فيه عنوان واحد (canonical) وده أحسن لجوجل. ومسار [[acme-challenge]] على 80 مستثنى عشان تجديد الشهادة يشتغل.

[[http2 on;]] هي الطريقة الجديدة (من nginx 1.25.1) بدل [[listen 443 ssl http2]]. و [[ssl_protocols]] مش مكتوبة لأن الافتراضي في النسخ الجديدة TLSv1.2 و TLSv1.3.

[[X-Forwarded-Proto]] بيقول لـ Next.js إن الطلب الأصلي كان https، وإلا الـ redirects والكوكيز الـ secure ممكن تتلخبط. والـ buffers الكبيرة عشان مكتبات الـ auth بتحط كوكيز كبيرة، ومن غيرها بيطلع [[502 upstream sent too big header]].

[[limit_req_zone]] بيعمل عدّاد لكل IP بـ ١٠ طلبات في الثانية، و [[burst=20 nodelay]] بيسمح بدفعة ٢٠ فوقهم من غير تأخير (صفحة واحدة بتطلب ملفات كتير).

فخ مشهور: [[add_header]] بيتورث من الـ server للـ location بس لو الـ location مفيهوش ولا add_header. في [[/_next/static/]] فيه Cache-Control، فالـ HSTS مش هيتبعت على الملفات دي. مش مشكلة هنا، بس افتكرها لو ضيفت هيدرز أمان مهمة.

و [[proxy_pass http://app:3000]]: [[app]] اسم الخدمة في compose. Nginx بيحوّل الاسم لـ IP وقت ما يقوم، فلو app مش موجود ساعتها Nginx هيقع بـ host not found.`,
            when: "أي تطبيق Node (Next.js أو Express) في compose وراه Nginx container ماسك 80 و 443.",
            mistakes: "في مشروع حقيقي كان مفيش default_server، فالدومين اللي عمل نسخة من الموقع اتقفل بالاسم بس (server مخصوص ليه)، ومتحط عليه شهادة الموقع الأصلي، فالمتصفح بيطلع تحذير بدل ما الاتصال يترفض. وكان فيه [[X-XSS-Protection]] وده قديم والمتصفحات بطّلت تستخدمه، ومفيش Content-Security-Policy. وكان مكتوب [[listen 443 ssl http2]] اللي بيطلع warning في النسخ الجديدة."
          },
          teach: R`## الفكرة: ٥ servers، كل واحد ليه شغلانة

ملف Nginx بيتقري كـ «بلوكات» جوه بعض: [[events {}]] و [[http {}]]، وجوه [[http]] كذا [[server {}]]، وجوه الـ server [[location {}]]. كل سطر جوه بلوك اسمه **directive**: اسم وقيمة وفي الآخر [[;]]. لما طلب يوصل، Nginx بيختار server حسب **البورت** والـ **Host** (اسم الدومين اللي في الطلب)، وجوه الـ server بيختار location حسب المسار.

| الـ server | البورت | الدومين | بيعمل إيه |
|---|---|---|---|
| ١ | 80 | أي دومين غريب | يقفل الاتصال |
| ٢ | 443 | أي دومين غريب | يرفض الـ TLS |
| ٣ | 80 | الدومين و www | تحدي certbot، والباقي يتحوّل https |
| ٤ | 443 | www | يتحوّل للدومين من غير www |
| ٥ | 443 | الدومين | الموقع نفسه، رايح لـ Next.js |

اتجرّب كامل: الملف ده بالظبط في [[nginx:alpine]] (nginx 1.31.6) بشهادة self-signed للدومينين، و «app» container تاني اسمه على الشبكة [[app]] بيسمع على 3000، و [[curl]] من container أوبونتو 24.04 على نفس شبكة Docker الخاصة. [[--resolve]] بيخلّي curl يودّي [[example.com]] على IP الـ container، و [[-k]] بيقبل الشهادة الـ self-signed.

---

## ١. [[events]] والإعدادات العامة

~~~nginx
events { worker_connections 1024; }
http {
  include /etc/nginx/mime.types; client_max_body_size 20M;
~~~

- [[events]]: إعدادات الاتصالات. [[worker_connections 1024]]: كل worker process يمسك لحد ١٠٢٤ اتصال في نفس الوقت. البلوك ده لازم يبقى موجود حتى لو فاضي.
- [[http {]]: كل حاجة تخص HTTP جوه هنا.
- [[include /etc/nginx/mime.types]]: حط محتوى الملف ده هنا. فيه جدول الامتدادات وأنواعها ([[.css]] = [[text/css]])، عشان Nginx يبعت [[Content-Type]] صح.
- [[client_max_body_size 20M]]: أقصى حجم لجسم الطلب (رفع صورة مثلًا). الافتراضي 1M، وأكبر منه بيرجع [[413 Request Entity Too Large]].

---

## ٢. الضغط و rate limit

~~~nginx
  gzip on; gzip_proxied any; gzip_types text/css application/javascript application/json image/svg+xml;
  limit_req_zone $binary_remote_addr zone=perip:10m rate=10r/s;
~~~

### gzip

- [[gzip on]]: اضغط الردود لو المتصفح قال إنه بيفهم gzip (هيدر [[Accept-Encoding: gzip]]).
- [[gzip_proxied any]]: اضغط حتى الطلبات اللي جاية عن طريق proxy (CDN مثلًا). الافتراضي [[off]].
- [[gzip_types]]: الأنواع اللي تتضغط. [[text/html]] بيتضغط دايمًا من غير ما تكتبه. الصور (png و jpg) مضغوطة أصلًا فمش موجودة.

جربت طلب بـ [[Accept-Encoding: gzip]] والرد فيه:

~~~text الناتج
content-type: text/html
content-encoding: gzip
~~~

وملف JS حجمه ٣ bytes ماتضغطش، لأن [[gzip_min_length]] الافتراضي ٢٠ byte (ضغط ملف صغير بيكبّره).

### [[limit_req_zone]]

- [[$binary_remote_addr]]: الـ IP بتاع الزائر بشكل مضغوط (٤ bytes لـ IPv4)، ده المفتاح: عدّاد لكل IP.
- [[zone=perip:10m]]: اسم المساحة [[perip]] وحجمها ١٠ ميجا في الـ RAM. الـ docs بتقول الميجا بتشيل حوالي ١٦ ألف IP.
- [[rate=10r/s]]: ١٠ طلبات في الثانية لكل IP.

السطر ده بيعرّف العدّاد بس. التطبيق تحت في [[limit_req]].

---

## ٣. الشهادة مرة واحدة

~~~nginx
  ssl_certificate     /etc/letsencrypt/live/example.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
~~~

- [[fullchain.pem]]: شهادتك + الشهادات الوسيطة (اللي بتربطها بجهة موثوقة). لازم fullchain مش [[cert.pem]] لوحدها، وإلا موبايلات كتير هتقول الشهادة مش موثوقة.
- [[privkey.pem]]: المفتاح الخاص.

متحطوطة في [[http]] فكل server على 443 بيورثها، فمش محتاج تكررها ٣ مرات.

---

## ٤. الـ default servers: الدومينات الغريبة

~~~nginx
  server { listen 80 default_server; return 444; }
  server { listen 443 ssl default_server; ssl_reject_handshake on; }
~~~

لما طلب يوصل على بورت، Nginx بيدوّر على server الـ [[server_name]] بتاعه زي الـ Host. لو مفيش، بيروح للـ server اللي عليه [[default_server]]. وده بيحصل لما حد يطلب السيرفر بالـ IP، أو يوجّه دومين تاني على الـ IP بتاعك.

- [[return 444]]: كود خاص بـ Nginx (مش HTTP حقيقي): اقفل الاتصال من غير ما ترد بحاجة.
- [[listen 443 ssl]]: [[ssl]] = البورت ده TLS.
- [[ssl_reject_handshake on]]: ارفض الـ TLS handshake نفسه، فالزائر الغريب مش هيشوف شهادتك ولا اسم دومينك.

جربت:

~~~text الناتج
$ curl -sSI -H 'Host: other.test' http://172.18.0.5/
curl: (52) Empty reply from server
$ curl -sSI https://other.test/
curl: (35) OpenSSL/3.0.13: error:0A000458:SSL routines::tlsv1 unrecognized name
~~~

[[(52)]] = الاتصال اتقفل من غير رد (ده [[444]])، و [[(35)]] = الـ TLS فشل، و [[unrecognized name]] يعني السيرفر قال «مش عارف الاسم ده». ونفس [[(35)]] لما طلبت بالـ IP مباشرة على https.

---

## ٥. server الـ HTTP

~~~nginx
  server {
    listen 80; server_name example.com www.example.com;
    location /.well-known/acme-challenge/ { root /var/www/certbot; }
    location / { return 301 https://example.com$request_uri; }
  }
~~~

- [[server_name example.com www.example.com]]: الـ server ده للاسمين دول بس.
- [[location /.well-known/acme-challenge/]]: أي مسار بيبدأ بكده، قدّمه من [[/var/www/certbot]] (فولدر certbot). ده لازم يفضل HTTP عشان التجديد. جربت: الملف رجع [[tok]].
- [[location /]]: كل حاجة تانية. لما مسارين يطابقوا، Nginx بياخد **الأطول** ([[/.well-known/...]] أطول من [[/]]).
- [[return 301 URL]]: تحويل دايم. [[$request_uri]] متغير فيه المسار والـ query كما هم، فـ [[/x?a=1]] بيتحوّل [[https://example.com/x?a=1]].

~~~text الناتج
$ curl -sI http://example.com/x
HTTP/1.1 301 Moved Permanently
Location: https://example.com/x
~~~

---

## ٦. www على https

~~~nginx
  server { listen 443 ssl; http2 on; server_name www.example.com; return 301 https://example.com$request_uri; }
~~~

- [[http2 on;]]: شغّل HTTP/2 على الـ server ده (الطريقة الجديدة من nginx 1.25.1، بدل [[listen 443 ssl http2]]).
- الباقي: حوّل لنفس المسار على الدومين من غير www.

~~~text الناتج
$ curl -sI https://www.example.com/
HTTP/2 301 
location: https://example.com/
~~~

[[HTTP/2]] في أول سطر = [[http2 on]] شغال. والهيدرز في HTTP/2 بتتكتب small دايمًا.

---

## ٧. الـ server الأساسي

~~~nginx
  server {
    listen 443 ssl; http2 on; server_name example.com;
    add_header Strict-Transport-Security "max-age=63072000" always;
    add_header X-Content-Type-Options "nosniff" always;
~~~

- [[add_header NAME VALUE]]: ضيف هيدر للرد. و [[always]]: حتى في ردود الأخطاء (404 و 500)، من غيرها بيتضاف للردود الناجحة بس.
- [[Strict-Transport-Security]] (HSTS): «يا متصفح، الموقع ده https بس لمدة [[63072000]] ثانية» (= ٧٣٠ يوم = سنتين). بعد أول زيارة، المتصفح بيحوّل لـ https لوحده من غير ما يكلّم HTTP خالص.
- [[X-Content-Type-Options: nosniff]]: متخمّنش نوع الملف، صدّق الـ [[Content-Type]]. بيمنع ملف نصي يتنفّذ كـ JavaScript.

~~~text الناتج
$ curl -sI https://example.com/
HTTP/2 200 
server: nginx/1.31.6
strict-transport-security: max-age=63072000
x-content-type-options: nosniff
~~~

### [[location /]]: الـ proxy

~~~nginx
    location / {
      proxy_pass http://app:3000;
      proxy_set_header Host $host;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto $scheme;
      proxy_buffer_size 128k; proxy_buffers 4 256k; proxy_busy_buffers_size 256k;
      limit_req zone=perip burst=20 nodelay;
    }
~~~

| الـ directive | معناه |
|---|---|
| [[proxy_pass http://app:3000]] | ابعت الطلب لـ Next.js. [[app]] اسم الخدمة في compose، و Docker بيحوّله IP |
| [[Host $host]] | ابعت الدومين الأصلي ([[example.com]]) بدل [[app:3000]] |
| [[X-Forwarded-For]] | IP الزائر الحقيقي. [[$proxy_add_x_forwarded_for]] = القيمة اللي جت + IP الزائر |
| [[X-Forwarded-Proto $scheme]] | [[$scheme]] = [[https]]، فـ Next.js يعرف إن الطلب الأصلي كان آمن |
| [[proxy_buffer_size 128k]] | مساحة لهيدرز رد التطبيق. الكوكيز الكبيرة (مكتبات auth) بتعدّي الافتراضي 4k أو 8k فيطلع [[502]] |
| [[proxy_buffers 4 256k]] | ٤ مساحات × ٢٥٦k لجسم الرد |
| [[proxy_busy_buffers_size 256k]] | الجزء اللي ممكن يتبعت للزائر وباقي الرد لسه جاي. لازم يبقى ≥ [[proxy_buffer_size]] |
| [[limit_req zone=perip burst=20 nodelay]] | طبّق العدّاد: ١٠ في الثانية + دفعة ٢٠ زيادة تتخدم على طول، وأكتر من كده [[503]] |

### الـ rate limit في الحقيقة

بعت ٤٠ طلب ورا بعض بأسرع ما يمكن من نفس الـ IP:

~~~text الناتج
     27 200
     13 503
~~~

أول طلب + ٢٠ (الـ burst) + حوالي ٦ اتفتحلهم مكان لأن العدّاد بيفضى بمعدّل ١٠ في الثانية والطلبات خدت جزء من ثانية. الباقي [[503 Service Unavailable]] (الكود الافتراضي لـ [[limit_req]]).

### [[location /_next/static/]]: كاش سنة

~~~nginx
    location /_next/static/ { proxy_pass http://app:3000; add_header Cache-Control "public, max-age=31536000, immutable"; }
~~~

ملفات Next.js في المسار ده أساميها فيها hash بيتغير مع كل build، فالملف بنفس الاسم مش هيتغير أبدًا. [[max-age=31536000]] = سنة بالثواني، و [[immutable]] = متسألش السيرفر تاني حتى لو المستخدم عمل refresh، و [[public]] = أي كاش في النص (CDN) يقدر يحفظه.

~~~text الناتج
$ curl -sI https://example.com/_next/static/a1b2.js
HTTP/2 200 
cache-control: public, max-age=31536000, immutable
~~~

ولاحظ: مفيش [[strict-transport-security]] هنا. ده فخ [[add_header]]: الـ location اللي فيه أي [[add_header]] مش بيورث ولا واحد من بتوع الـ server. لو عايزهم، كررهم جوه الـ location.

---

## ملخص الطلبات

| الطلب | النتيجة |
|---|---|
| [[http://example.com/x]] | [[301]] لـ [[https://example.com/x]] |
| [[http://example.com/.well-known/acme-challenge/t1]] | الملف من فولدر certbot |
| [[https://www.example.com/]] | [[301]] لـ [[https://example.com/]] |
| [[https://example.com/]] | [[200]] من Next.js + HSTS + nosniff + gzip |
| [[/_next/static/...]] | [[200]] + كاش سنة (من غير HSTS) |
| Host غريب على 80 | الاتصال يتقفل ([[curl: (52)]]) |
| Host غريب أو IP على 443 | الـ TLS يترفض ([[curl: (35)]]) |
| أكتر من ١٠ في الثانية + ٢٠ | [[503]] |

## الخلاصة

- [[default_server]] بيمسك أي حاجة مش دوميناتك، فمحدش يعرض موقعك على دومينه.
- [[nginx -t]] قبل أي reload. جربته على الملف ده وطلّع [[syntax is ok]] و [[test is successful]].
- [[add_header]] في location بيلغي وراثة كل الـ add_header اللي فوقه.`,
          lines: [
            "عدد الاتصالات لكل worker.",
            "بداية إعدادات HTTP.",
            "أنواع الملفات، وأقصى حجم رفع ٢٠ ميجا.",
            "gzip للنصوص و JSON و SVG، حتى للطلبات اللي جاية من proxy.",
            "عدّاد طلبات لكل IP: ١٠ في الثانية.",
            "الشهادة، لكل server على 443.",
            "المفتاح الخاص.",
            "أي دومين غريب على 80: اقفل الاتصال من غير رد.",
            "أي دومين غريب على 443: ارفض الـ TLS من الأول.",
            "server لـ HTTP:",
            "على 80 للدومين و www.",
            "ملفات تحدي Let's Encrypt من فولدر certbot.",
            "أي حاجة تانية: حوّل لـ https على الدومين الأساسي.",
            "نهاية الـ server.",
            "www على https: حوّل للدومين من غير www.",
            "الـ server الأساسي:",
            "على 443 بـ HTTP/2 للدومين الأساسي.",
            "HSTS: المتصفح يستخدم https بس لمدة سنتين.",
            "متخمّنش نوع الملف.",
            "كل الطلبات:",
            "ابعتها لـ Next.js (اسم الخدمة في compose).",
            "ابعت الدومين الأصلي.",
            "و IP الزائر.",
            "و إن الطلب كان https.",
            "buffers كبيرة للهيدرز والكوكيز الكبيرة.",
            "طبّق الـ rate limit مع دفعة ٢٠.",
            "نهاية الـ location.",
            "ملفات Next.js الثابتة (أساميها فيها hash): كاش سنة.",
            "نهاية الـ server.",
            "نهاية http."
          ],
          sol: R`جربت الملف ده في nginx:alpine بشهادة self-signed و app بيسمع على 3000:

[[nginx -t]] طلّع [[syntax is ok]] و [[test is successful]].
[[curl -I -H "Host: example.com" http://.../x]] طلّع [[HTTP/1.1 301 Moved Permanently]] و [[Location: https://example.com/x]].
[[https://www.example.com]] طلّع [[HTTP/2 301]] و [[location: https://example.com/]].
[[-H "Host: other.test"]] على http طلّع [[curl: (52) Empty reply from server]]، ده الـ [[return 444]]: Nginx بيقفل الاتصال من غير رد. وعلى https [[ssl_reject_handshake]] بيرفض قبل الشهادة ([[tlsv1 unrecognized name]]).
و [[https://example.com]] طلّع [[HTTP/2 200]] ومعاه [[strict-transport-security]] و [[x-content-type-options: nosniff]].

لو [[nginx -t]] قال [[cannot load certificate]] يبقى لسه مفيش شهادة (شوف init-ssl.sh). ولو قال [[host not found in upstream "app"]] يبقى الـ service مش اسمه [[app]] أو مش على نفس الـ network.`
        },
        {
          cmd: "nginx-apply.sh",
          title: "تركيب بلوك في config مشترك من غير ما توقّع Nginx",
          desc: "لما كذا مشروع على سيرفر واحد بيشاركوا Nginx container واحد وملف nginx.conf واحد، كل مشروع يحط البلوك بتاعه بين علامتين. السكربت ده: باك أب، يشيل البلوك القديم ويحط الجديد في نسخة مؤقتة، يختبرها في container مؤقت بنفس الـ image والشبكة، ولو نجح بس يكتبها في الملف الحقيقي ويعمل reload.",
          example: R`#!/usr/bin/env bash
# deploy/nginx-apply.sh deploy/nginx/myapp-ssl.conf
set -euo pipefail
SNIPPET="$__{1:?usage: nginx-apply.sh <snippet.conf>}"
CONF=/home/deploy/shared/nginx/nginx.conf
CTR=shared-nginx
NET=shared_proxy
BEGIN="# >>> myapp (managed)"; END="# <<< myapp"

b=$(grep -cF "$BEGIN" "$CONF" || true); e=$(grep -cF "$END" "$CONF" || true)
[ "$b" = "$e" ] && [ "$b" -le 1 ] || { echo "markers broken in $CONF, fix by hand" >&2; exit 1; }
cp "$CONF" "$CONF.bak.$(date +%Y%m%d%H%M%S)"
ls -1t "$CONF".bak.* | tail -n +6 | xargs -r rm --
TMP=$(mktemp); trap 'rm -f "$TMP" "$TMP.new"' EXIT
sed "/$BEGIN/,/$END/d" "$CONF" > "$TMP"
last=$(grep -n '^}' "$TMP" | tail -1 | cut -d: -f1)
{ head -n $((last - 1)) "$TMP"; echo "    $BEGIN"; cat "$SNIPPET"; echo "    $END"; tail -n +"$last" "$TMP"; } > "$TMP.new"

IMAGE=$(docker inspect -f '{{.Config.Image}}' "$CTR")
docker run --rm --network "$NET" -v "$TMP.new:/etc/nginx/nginx.conf:ro" \
  -v /home/deploy/certbot/conf:/etc/letsencrypt:ro "$IMAGE" nginx -t \
  || { echo "nginx -t failed, $CONF not touched" >&2; exit 1; }

cat "$TMP.new" > "$CONF"
if [ "$(stat -c %i "$CONF")" = "$(docker exec "$CTR" stat -c %i /etc/nginx/nginx.conf)" ]; then
  docker exec "$CTR" nginx -s reload
else
  docker restart "$CTR" >/dev/null
fi`,
          try: "على سيرفر التجربة: شغّل nginx container بملف متركّب، وجرّب السكربت ببلوك سليم، وبعدين ببلوك فيه غلطة (امسح ; من سطر): لازم يقول failed والملف الحقيقي ميتغيّرش والموقع يفضل شغال. وبعدين افتح الملف بـ vim واحفظه، وشغّل السكربت تاني وشوف إنه عمل restart بدل reload.",
          flag: "script",
          deep: {
            why: "لو عدّلت nginx.conf مشترك بإيدك وغلطت، كل المواقع اللي على السيرفر بتقع مع أول restart. السكربت ده بيضمن إن الملف الحقيقي ميتغيّرش إلا بإعدادات اتختبرت، وإن التطبيق بتاعك يلمس البلوك بتاعه بس.",
            how: R`العلامتين [[# >>> myapp]] و [[# <<< myapp]] بيحددوا البلوك بتاعك. [[sed "/BEGIN/,/END/d"]] بيمسح كل السطور من العلامة الأولى للتانية، فالتشغيل مرتين مش بيكرر البلوك. وقبلها بنعد العلامات: لو واحدة موجودة والتانية لأ (حد مسحها بإيده)، الـ sed هيمسح لآخر الملف، فبنقف.

البلوك الجديد بيتحط قبل آخر [[}]] في الملف (قفلة [[http {}]]): [[head]] لحد قبلها، وبعدين البلوك بالعلامات، وبعدين [[tail -n +"$last"]] من القفلة للآخر.

الاختبار: [[docker run --rm]] بنفس الـ image بتاعة Nginx الشغال (نفس النسخة ونفس الـ modules)، والملف الجديد متركّب مكان nginx.conf، والشهادات متركّبة، وعلى نفس الشبكة. الشبكة مهمة لأن [[nginx -t]] بيحاول يحوّل أسامي الـ upstream زي [[app:3000]] لـ IP، ومن غير الشبكة هيفشل بـ host not found حتى لو الإعدادات سليمة.

الكتابة بـ [[cat new > CONF]] مش [[mv]] ولا [[cp]] لملف جديد: [[>]] بيكتب جوه نفس الملف (نفس الـ inode). الـ bind mount في Docker مربوط بالـ inode مش بالاسم، فلو الملف اتبدّل بملف جديد، الـ container هيفضل شايف القديم. عشان كده بنقارن رقم الـ inode برّه وجوه: لو زي بعض [[reload]] (من غير downtime)، ولو مختلفين (حد فتح الملف بـ vim أو [[sed -i]] قبل كده وبدّله) لازم [[restart]] عشان الـ container يتركّب من جديد.

والـ [[.bak]] بيتعمل كل مرة، و [[tail -n +6]] بيسيب آخر ٥ بس.`,
            when: "Nginx واحد مشترك بين كذا مشروع، وكل مشروع محتاج يضيف أو يغيّر البلوك بتاعه من سكربت النشر.",
            mistakes: R`في مشروع حقيقي كان السكربت بيفترض إن آخر [[}]] في الملف هو قفلة http، فلو فيه [[stream {}]] بعده البلوك كان هيتحط غلط (هنا [[nginx -t]] هيمسكها ويرفض). ولو حد مسح علامة النهاية بإيده، كان بيضيف بلوك مكرر، ودلوقتي بيقف. والـ [[.bak]] كانت بتتراكم من غير تنضيف.

والأحسن على المدى الطويل: Nginx المشترك يعمل [[include /etc/nginx/conf.d/*.conf;]] وكل مشروع يحط ملف لوحده، بدل ما كل مشروع يعدّل ملف مشروع تاني.`
          },
          teach: R`## الفكرة: عدّل نسخة، اختبرها، وبعدين بس الملف الحقيقي

السكربت بياخد ملف فيه البلوك بتاع مشروعك (server واحد أو أكتر)، ويحطه في [[nginx.conf]] المشترك بين علامتين. بس مش بيلمس الملف الحقيقي إلا بعد ما النسخة الجديدة تعدّي [[nginx -t]] في container منفصل. وفي الآخر بيختار بين [[reload]] و [[restart]] حسب رقم الـ inode.

جربته كامل على أوبونتو 24.04 جوه Docker (container فيه Docker تاني عامل نفسه السيرفر): شبكة [[shared_proxy]]، و container اسمه [[shared-nginx]] من [[nginx:alpine]] ومتركّب فيه [[/home/deploy/shared/nginx/nginx.conf]]، فيه موقع تاني [[other.test]]، و container [[myapp]] على نفس الشبكة.

---

## ١. المدخلات والثوابت

~~~bash
#!/usr/bin/env bash
# deploy/nginx-apply.sh deploy/nginx/myapp-ssl.conf
set -euo pipefail
SNIPPET="$__{1:?usage: nginx-apply.sh <snippet.conf>}"
CONF=/home/deploy/shared/nginx/nginx.conf
CTR=shared-nginx
NET=shared_proxy
BEGIN="# >>> myapp (managed)"; END="# <<< myapp"
~~~

### [[$__{1:?message}]]

[[$1]] أول argument. و [[:?]] معناها: «لو مش موجود أو فاضي، اطبع الرسالة دي على stderr واخرج بفشل». من غير argument:

~~~text الناتج
./deploy/nginx-apply.sh: line 4: 1: usage: nginx-apply.sh <snippet.conf>
~~~

exit [[1]]. bash بيكتب اسم السكربت ورقم السطر واسم المتغير ([[1]]) قبل رسالتك.

### الباقي

| المتغير | معناه |
|---|---|
| [[CONF]] | ملف Nginx المشترك على السيرفر (متركّب في الـ container) |
| [[CTR]] | اسم container الـ Nginx |
| [[NET]] | شبكة Docker اللي Nginx والتطبيقات عليها |
| [[BEGIN]] و [[END]] | العلامتين اللي بيحددوا البلوك بتاعنا. تعليقات Nginx بتبدأ بـ [[#]]، فـ Nginx بيتجاهلهم |

---

## ٢. العلامات سليمة؟

~~~bash
b=$(grep -cF "$BEGIN" "$CONF" || true); e=$(grep -cF "$END" "$CONF" || true)
[ "$b" = "$e" ] && [ "$b" -le 1 ] || { echo "markers broken in $CONF, fix by hand" >&2; exit 1; }
~~~

- [[grep -c]]: اطبع **عدد** السطور المطابقة بدل السطور نفسها. و [[-F]] (fixed): دوّر على النص حرفيًا، مش كـ regex ([[(]] و [[>]] ملهمش معنى خاص).
- [[|| true]]: [[grep]] بيرجع 1 لو ملقاش حاجة (والعدد [[0]])، وده مش خطأ هنا، فـ [[|| true]] بيمنع [[set -e]] يوقف. العدد بيتطبع برضه.
- الشرط: العددين زي بعض، وأقل من أو يساوي ١ ([[-le]] = less or equal). يعني يا البلوك مش موجود خالص (0 و 0)، يا موجود مرة كاملة (1 و 1).

ليه؟ لو حد مسح سطر النهاية بإيده، الـ [[sed]] تحت هيمسح من علامة البداية **لآخر الملف**. جربت أمسح [[# <<< myapp]]:

~~~text الناتج
markers broken in /home/deploy/shared/nginx/nginx.conf, fix by hand
~~~

exit [[1]] والملف ماتلمسش.

---

## ٣. باك أب، وسيب آخر ٥

~~~bash
cp "$CONF" "$CONF.bak.$(date +%Y%m%d%H%M%S)"
ls -1t "$CONF".bak.* | tail -n +6 | xargs -r rm --
~~~

- نسخة باسم فيه التاريخ والوقت: [[nginx.conf.bak.20261007154719]].
- [[ls -1t]]: سطر لكل ملف، الأحدث الأول. [[tail -n +6]]: من السادس للآخر. [[xargs -r rm --]]: امسحهم، و [[-r]] متشغّلش [[rm]] لو مفيش، و [[--]] معناها «اللي بعدي أسامي ملفات مش options» (احتياط لو اسم بدأ بـ [[-]]).

بعد ٨ تشغيلات، الفولدر فيه ٦ ملفات: [[nginx.conf]] + آخر ٥ باك أب.

---

## ٤. ابني النسخة الجديدة في ملف مؤقت

~~~bash
TMP=$(mktemp); trap 'rm -f "$TMP" "$TMP.new"' EXIT
sed "/$BEGIN/,/$END/d" "$CONF" > "$TMP"
last=$(grep -n '^}' "$TMP" | tail -1 | cut -d: -f1)
{ head -n $((last - 1)) "$TMP"; echo "    $BEGIN"; cat "$SNIPPET"; echo "    $END"; tail -n +"$last" "$TMP"; } > "$TMP.new"
~~~

### [[mktemp]] و [[trap]]

[[mktemp]] بيعمل ملف فاضي باسم عشوائي في [[/tmp]] ويطبع اسمه. و [[trap '...' EXIT]]: امسح الملفين المؤقتين لما السكربت يخرج بأي شكل.

### [[sed "/BEGIN/,/END/d"]]

[[/A/,/B/]] في sed = **مدى**: من أول سطر فيه A لحد أول سطر بعده فيه B. و [[d]] = امسح. يعني: انسخ الملف من غير البلوك القديم (لو موجود). ده اللي بيخلّي التشغيل مرتين ميكررش البلوك.

### آخر [[}]]

- [[grep -n '^}']]: السطور اللي **بتبدأ** بـ [[}]] ([[^]] = أول السطر)، و [[-n]] بيحط رقم السطر قدامها: [[5:}]].
- [[tail -1]]: آخر واحد. و [[cut -d: -f1]]: قسّم على [[:]] وخد الرقم.

ده رقم سطر قفلة [[http {]] (لو مفيش بلوك تاني زي [[stream {}]] بعدها).

### التجميع

[[{ ...; ...; } > file]]: كل ناتج الأوامر اللي جوه يروح لملف واحد، بالترتيب:

1. [[head -n $((last - 1))]]: كل السطور قبل القفلة. [[$((...))]] = حساب.
2. علامة البداية بـ ٤ مسافات.
3. [[cat "$SNIPPET"]]: البلوك بتاعك.
4. علامة النهاية.
5. [[tail -n +"$last"]]: من سطر القفلة لآخر الملف.

ملف التجربة بعد التطبيق:

~~~text nginx.conf
events {}
http {
    server { listen 80 default_server; return 444; }
    server { listen 80; server_name other.test; return 200 "other site\n"; }
    # >>> myapp (managed)
    server {
        listen 80;
        server_name myapp.test;
        location / { proxy_pass http://myapp:80; }
    }
    # <<< myapp
}
~~~

---

## ٥. اختبر في container منفصل

~~~bash
IMAGE=$(docker inspect -f '{{.Config.Image}}' "$CTR")
docker run --rm --network "$NET" -v "$TMP.new:/etc/nginx/nginx.conf:ro" \
  -v /home/deploy/certbot/conf:/etc/letsencrypt:ro "$IMAGE" nginx -t \
  || { echo "nginx -t failed, $CONF not touched" >&2; exit 1; }
~~~

- [[docker inspect -f '{{.Config.Image}}']]: اسم الـ image اللي الـ Nginx الشغال معمول منها ([[nginx:alpine]])، عشان نختبر بنفس النسخة بالظبط. [[-f]] قالب Go بيطلّع خانة واحدة.
- [[docker run --rm]]: container مؤقت يتمسح بعد ما يخلص.
- [[--network "$NET"]]: على نفس الشبكة، عشان [[nginx -t]] بيحوّل أسامي الـ upstream ([[myapp]]) لـ IP.
- [[-v "$TMP.new:/etc/nginx/nginx.conf:ro"]]: ركّب الملف الجديد مكان الإعدادات، [[ro]] = read only.
- [[-v .../certbot/conf:/etc/letsencrypt:ro]]: الشهادات، لأن [[nginx -t]] بيفتح ملفات [[ssl_certificate]].
- [[nginx -t]]: اختبر بس متشغّلش.

جربت من غير [[--network]]، والإعدادات سليمة:

~~~text الناتج
nginx: [emerg] host not found in upstream "myapp" in /etc/nginx/nginx.conf:9
nginx: configuration file /etc/nginx/nginx.conf test failed
~~~

ومع الشبكة وبلوك سليم: [[syntax is ok]] و [[test is successful]] (وقبلهم رسايل [[/docker-entrypoint.sh]] العادية بتاعة الـ image).

وببلوك ناقصه [[;]]:

~~~text الناتج
nginx: [emerg] unexpected "}" in /etc/nginx/nginx.conf:9
nginx: configuration file /etc/nginx/nginx.conf test failed
nginx -t failed, /home/deploy/shared/nginx/nginx.conf not touched
~~~

الـ [[md5sum]] بتاع الملف الحقيقي فضل زي ما هو، والموقع فضل بيرد [[200]].

---

## ٦. اكتب، و reload أو restart

~~~bash
cat "$TMP.new" > "$CONF"
if [ "$(stat -c %i "$CONF")" = "$(docker exec "$CTR" stat -c %i /etc/nginx/nginx.conf)" ]; then
  docker exec "$CTR" nginx -s reload
else
  docker restart "$CTR" >/dev/null
fi
~~~

### [[cat new > CONF]]

[[>]] بيفضّي الملف الموجود ويكتب جواه، فالملف يفضل **نفس الملف** (نفس رقم الـ inode). [[mv]] أو [[cp]] لملف جديد كانوا هيعملوا ملف تاني برقم تاني.

### المقارنة

[[stat -c %i]]: اطبع رقم الـ inode بس ([[%i]]). مرة على السيرفر، ومرة جوه الـ container ([[docker exec]]). الـ bind mount لملف واحد مربوط بالـ inode اللي كان موجود وقت تشغيل الـ container.

| الحالة | السيرفر | الـ container | السكربت عمل |
|---|---|---|---|
| عادي | [[460640]] | [[460640]] | [[nginx -s reload]] |
| بعد [[mv]] ملف مكانه (زي ما vim ساعات بيعمل) | [[517459]] | [[460640]] | [[docker restart]] |

في الحالة التانية الـ container كان لسه شايف الملف القديم، فـ reload كان هيقرا النسخة القديمة من غير ما يقول. [[docker restart]] بيركّب الملف من جديد، و [[StartedAt]] اتغيّر:

~~~text الناتج
2026-10-07T15:47:11.371087091Z -> 2026-10-07T15:47:38.23432744Z
~~~

وبعدها الرقمين بقوا [[517459]] الاتنين.

### النتيجة

بعد التطبيق، [[curl -H "Host: myapp.test" localhost:8080]] رجّع صفحة [[myapp]]، والموقع التاني [[other.test]] فضل شغال. والتشغيل التاني بنفس البلوك ما غيّرش الـ [[md5sum]] (البلوك اتشال واتحط تاني زي ما هو)، والعلامة موجودة مرة واحدة.

---

## ملخص الخطوات

| # | الخطوة | لو فشلت |
|---|---|---|
| ١ | [[$__{1:?}]]: فيه ملف بلوك؟ | رسالة استخدام |
| ٢ | عدّ العلامات | [[markers broken]]، والملف زي ما هو |
| ٣ | باك أب + سيب ٥ | |
| ٤ | [[sed]] يشيل القديم، و [[head]]/[[cat]]/[[tail]] يحطوا الجديد في ملف مؤقت | |
| ٥ | [[nginx -t]] في container مؤقت على نفس الشبكة | [[not touched]] |
| ٦ | [[cat > CONF]] ثم reload أو restart حسب الـ inode | |

## الخلاصة

- الملف الحقيقي بيتغيّر بس بعد ما النسخة الجديدة تعدّي [[nginx -t]].
- [[>]] بيحافظ على الـ inode، و [[mv]] بيغيّره، والـ bind mount بيفضل على القديم.
- العلامات + [[sed '/A/,/B/d']] = تشغيل مرتين يدّي نفس النتيجة.`,
          lines: [
            "أي فشل يوقف السكربت.",
            "ملف البلوك من أول argument، ولو مش موجود اطبع طريقة الاستخدام واقف.",
            "ملف Nginx المشترك على السيرفر.",
            "اسم الـ container بتاع Nginx.",
            "الشبكة اللي Nginx والتطبيقات عليها.",
            "علامة البداية والنهاية للبلوك بتاعنا.",
            "عدّ كل علامة موجودة كام مرة.",
            "لو العدد مش متساوي أو أكتر من واحد، اقف.",
            "باك أب بالتاريخ.",
            "سيب آخر ٥ باك أب بس.",
            "ملف مؤقت، ويتمسح في الآخر مهما حصل.",
            "انسخ الملف من غير البلوك القديم.",
            "رقم سطر آخر [[}]] في الملف.",
            "اللي قبلها، والبلوك الجديد بين العلامات، وبعدين القفلة وما بعدها، في ملف جديد.",
            "اسم الـ image بتاعة Nginx الشغال.",
            "اختبر الملف الجديد في container مؤقت على نفس الشبكة...",
            "...ومعاه الشهادات...",
            "...ولو فشل اقف والملف الحقيقي زي ما هو.",
            "اكتب الجديد جوه نفس الملف (نفس الـ inode).",
            "لو الـ container شايف نفس الملف...",
            "...reload من غير downtime.",
            "وإلا...",
            "...restart عشان يتركّب الملف من جديد.",
            "نهاية الـ if."
          ],
          sol: R`جربته على nginx container بملف متركّب:

ببلوك سليم: [[nginx -t]] عدّى، والملف الحقيقي بقى فيه البلوك بين [[# >>> myapp (managed)]] و [[# <<< myapp]] قبل آخر [[}]]، واتعمل [[nginx -s reload]]، والـ server الجديد رد. وتشغيله تاني مابيكرّرش البلوك، بيستبدله.
ببلوك ناقصه [[;]]: طلّع [[nginx: configuration file /etc/nginx/nginx.conf test failed]] و [[nginx -t failed, ... not touched]]، والـ md5 بتاع الملف ماتغيّرش والموقع فضل شغال. ده لأن الفحص بيحصل على نسخة مؤقتة في container منفصل.
بعد ما الملف اتحفظ بطريقة بتغيّر الـ inode (زي vim أو [[cp x; mv x nginx.conf]])، رقم الـ inode على الجهاز بقى مختلف عن اللي جوه الـ container، فالسكربت عمل [[docker restart]] بدل reload ([[StartedAt]] اتغيّر).

السبب: bind mount لملف واحد بيمسك الـ inode القديم، فـ reload كان هيقرا النسخة القديمة من غير ما يقولك. ولو [[markers broken]] ظهر، يبقى حد مسح سطر من العلامتين بإيده.`
        },
        {
          cmd: "dashboard_users.sh",
          title: "يوزر وباسورد لكل موظف على لوحة ورا Nginx",
          desc: "لوحة داخلية ورا Nginx basic auth، بس بدل باسورد واحد للكل، كل موظف ليه يوزر (الكود بتاعه) وباسورد عشوائي. السكربت بيجيب الموظفين النشطين من Postgres، يولّد باسوردات، يضيفهم لملف htpasswd، ويطبع جدول مرة واحدة تديه للموظفين.",
          example: R`#!/usr/bin/env bash
# sudo bash deploy/nginx/dashboard_users.sh           كل الموظفين النشطين
# sudo bash deploy/nginx/dashboard_users.sh ali sara  باسورد جديد لناس معينين
set -euo pipefail
AUTH=/etc/nginx/.htpasswd-dashboard
cd "$(dirname "$0")/../.."
q() { docker compose exec -T postgres psql -U app -d appdb -tAc "$1"; }
[ -f "$AUTH" ] || { echo "first time: htpasswd -cB $AUTH admin" >&2; exit 1; }

if [ $# -gt 0 ]; then CODES="$*"
else CODES=$(q "SELECT lower(code) FROM staff WHERE is_active AND code IS NOT NULL ORDER BY code"); fi

printf '%-8s %-20s %s\n' code name password
for code in $CODES; do
  [[ "$code" =~ ^[a-z0-9]+$ ]] || { echo "skip bad code: $code" >&2; continue; }
  name=$(q "SELECT display_name FROM staff WHERE lower(code) = '$code' AND is_active")
  [ -n "$name" ] || { echo "$code not active, skipped" >&2; continue; }
  pass=$(openssl rand -base64 12 | tr -d '/+=' | cut -c1-10)
  printf '%s\n' "$pass" | htpasswd -iB "$AUTH" "$code" 2>/dev/null
  printf '%-8s %-20s %s\n' "$code" "$name" "$pass"
done
nginx -t -q && systemctl reload nginx || echo "nginx -t failed, not reloaded" >&2`,
          try: "على سيرفر التجربة: [[sudo apt install apache2-utils]]، واعمل الملف بـ [[htpasswd -cB]]، وجرّب السكربت بكودين مكتوبين بإيدك. بعدين جرّب كود فيه علامة تنصيص (زي [[a'b]]): لازم يتعدّى بـ skip. وافتح اللوحة بيوزر منهم.",
          flag: "script",
          deep: {
            why: "باسورد واحد متشارك معناه إنك مش هتعرف مين عمل إيه، ولو موظف ساب لازم تغيّر الباسورد للكل. يوزر لكل واحد بيحل الاتنين، و Nginx بيبعت اسم اليوزر للتطبيق.",
            how: R`[[q]] دالة صغيرة بتشغّل SQL جوه container بتاع Postgres: [[-t]] من غير عناوين أعمدة، و [[-A]] من غير محاذاة، فالناتج قيم خام تنفع في لوب. و [[-T]] في [[exec]] عشان السكربت مش terminal.

[[$#]] عدد الـ arguments: لو كتبت أكواد، بيجدد ليهم بس، وإلا بيجيب كل النشطين.

الـ regex [[^[a-z0-9]+$]] بيقبل حروف صغيرة وأرقام بس، وده اللي بيخلي حط [[$code]] جوه SQL آمن: أي علامة تنصيص أو مسافة بتترفض قبل ما توصل للاستعلام.

[[openssl rand -base64 12]] بيطلع ١٦ حرف عشوائي، و [[tr -d '/+=']] بيشيل الرموز اللي بتلخبط لما حد ينقلها، و [[cut -c1-10]] بياخد ١٠.

[[htpasswd -iB]]: [[-i]] ياخد الباسورد من stdin بدل سطر الأوامر، و [[-B]] يشفّره بـ bcrypt. الباسورد في سطر الأوامر ([[-b]]) بيبان لأي يوزر على السيرفر في [[ps]] طول ما الأمر شغال.

[[printf '%-8s']] بيطبع النص في عمود عرضه ٨ على الشمال، فالجدول يطلع مترتب.

وفي Nginx: [[auth_basic "Dashboard"; auth_basic_user_file /etc/nginx/.htpasswd-dashboard;]] جوه location اللوحة، و [[proxy_set_header X-Remote-User $remote_user;]] عشان التطبيق يعرف مين. ولما موظف يمشي: [[htpasswd -D /etc/nginx/.htpasswd-dashboard ali]].`,
            when: "لوحة داخلية أو أداة admin لفريق صغير، ومش عايز تبني نظام تسجيل دخول كامل.",
            mistakes: "في مشروع حقيقي كان السكربت بيحط [[$code]] جوه SQL مباشرة من غير أي فحص، فلو اتبعت كـ argument وفيه علامة تنصيص يبقى SQL injection. وكان بيستخدم [[htpasswd -bB]] فالباسورد بيبان في [[ps]]. ولو [[nginx -t]] فشل مكانش بيطبع أي حاجة، فتفتكر إن كله تمام. وخد بالك إن الباسوردات بتتطبع على الشاشة وبتفضل في الـ scrollback، فبعد ما توزّعها اعمل [[clear]]."
          },
          teach: R`## الفكرة: من قاعدة البيانات لملف htpasswd

Nginx عنده حماية بسيطة اسمها **basic auth**: المتصفح بيطلب يوزر وباسورد، و Nginx بيقارنهم بملف [[htpasswd]] (سطر لكل يوزر: الاسم والباسورد متشفّر). السكربت بيملا الملف ده: يجيب أكواد الموظفين النشطين من Postgres، يعمل لكل واحد باسورد عشوائي، يحطه في الملف، ويطبع جدول تديه للموظفين.

جربته على أوبونتو 24.04 جوه Docker (container فيه Docker تاني): مشروع compose فيه خدمة [[postgres]] ([[postgres:16-alpine]]) وجدول [[staff]] فيه ٥ صفوف، و Nginx متسطب على «السيرفر» نفسه. الفرق الوحيد: مفيش systemd جوه container، فآخر سطر اتشغّل بـ [[nginx -s reload]] بدل [[systemctl reload nginx]] (نفس النتيجة).

---

## ١. الإعداد

~~~bash
set -euo pipefail
AUTH=/etc/nginx/.htpasswd-dashboard
cd "$(dirname "$0")/../.."
~~~

- [[set -euo pipefail]]: أي فشل يوقف، ومتغير مش متعرّف خطأ، والـ pipe يفشل لو أي حتة فيه فشلت.
- [[AUTH]]: ملف اليوزرز. بيبدأ بنقطة فمخفي، وفي [[/etc/nginx]] فمش جوه أي فولدر بيتقدّم للناس.
- [[cd "$(dirname "$0")/../.."]]: السكربت في [[deploy/nginx/]]، فـ [[../..]] بيطلع فولدرين لفولدر المشروع اللي فيه [[compose.yml]]، عشان [[docker compose]] يلاقي الخدمة.

والتعليقات في أول الملف بتقول يتشغّل بـ [[sudo]]: لأن الكتابة في [[/etc/nginx]] وعمل reload محتاجين root.

---

## ٢. دالة [[q]]: SQL في سطر

~~~bash
q() { docker compose exec -T postgres psql -U app -d appdb -tAc "$1"; }
~~~

| الجزء | معناه |
|---|---|
| [[docker compose exec -T postgres]] | نفّذ أمر جوه container خدمة [[postgres]]. [[-T]] من غير terminal (السكربت مش تفاعلي) |
| [[psql -U app -d appdb]] | عميل Postgres، باليوزر [[app]] وقاعدة [[appdb]] |
| [[-t]] | tuples only: من غير عناوين الأعمدة ولا سطر [[(2 rows)]] |
| [[-A]] | unaligned: من غير مسافات المحاذاة و [[|]] |
| [[-c "$1"]] | نفّذ الاستعلام ده واخرج |

الفرق في الناتج، نفس الجدول:

~~~text من غير -tA
 code | display_name 
------+--------------
 ALI  | Ali Hassan
 sara | Sara Adel
(2 rows)
~~~

~~~text مع -tA (قيمة في كل سطر)
ali
a1
sara
~~~

الشكل التاني ينفع على طول في [[for]].

---

## ٣. الملف موجود؟

~~~bash
[ -f "$AUTH" ] || { echo "first time: htpasswd -cB $AUTH admin" >&2; exit 1; }
~~~

لو الملف مش موجود، السكربت مش بيعمله لوحده، بيقولك تعمله بإيدك:

~~~text الناتج
first time: htpasswd -cB /etc/nginx/.htpasswd-dashboard admin
~~~

exit [[1]]. و [[htpasswd -cB]]: [[-c]] = create (اعمل الملف، **وامسحه لو موجود**)، و [[-B]] = bcrypt. عشان كده [[-c]] مش في السكربت: تشغيله غلط مرة كان هيمسح كل اليوزرز. أول مرة:

~~~text الناتج
Adding password for user admin
~~~

---

## ٤. مين نعمله باسورد؟

~~~bash
if [ $# -gt 0 ]; then CODES="$*"
else CODES=$(q "SELECT lower(code) FROM staff WHERE is_active AND code IS NOT NULL ORDER BY code"); fi
~~~

- [[$#]]: عدد الـ arguments. [[-gt 0]] = greater than 0.
- لو كتبت أكواد ([[sudo bash ... ali sara]]): [[$*]] كلهم في نص واحد بمسافات.
- لو لأ: كل الموظفين النشطين ([[is_active]] صح) اللي ليهم كود، بحروف صغيرة ([[lower]]).

---

## ٥. اللوب

~~~bash
printf '%-8s %-20s %s\n' code name password
for code in $CODES; do
~~~

[[printf FORMAT values]]: اطبع القيم حسب الشكل. [[%s]] = نص، و [[%-8s]] = نص في عمود عرضه ٨، و [[-]] = على الشمال (والباقي مسافات). [[\n]] = سطر جديد. فالعناوين والصفوف بتطلع تحت بعض بالظبط.

[[for code in $CODES]] من غير علامات تنصيص عن قصد: الأكواد بتتقسم على المسافات والسطور الجديدة، فكل كود لفّة.

### الفحص الأمني

~~~bash
  [[ "$code" =~ ^[a-z0-9]+$ ]] || { echo "skip bad code: $code" >&2; continue; }
~~~

- [[[[ ... ]]]]: الاختبار المتطور في bash، وفيه [[=~]] = طابق regex.
- [[^[a-z0-9]+$]]: من أول النص ([[^]]) لآخره ([[$]])، حرف أو أكتر ([[+]]) من a لـ z أو 0 لـ 9.
- [[continue]]: سيب الكود ده وروح للي بعده.

ليه مهم؟ لأن [[$code]] هيتحط **جوه** نص الـ SQL تحت. كود فيه [[']] كان هيقفل النص ويكمّل SQL من عنده (SQL injection). بالـ regex ده مفيش غير حروف وأرقام توصل للاستعلام.

### الاسم، والموظف نشط؟

~~~bash
  name=$(q "SELECT display_name FROM staff WHERE lower(code) = '$code' AND is_active")
  [ -n "$name" ] || { echo "$code not active, skipped" >&2; continue; }
~~~

لو الموظف مش نشط أو الكود مش موجود، الاستعلام بيرجع ولا حاجة، و [[-n]] (النص مش فاضي) بيفشل، فنعدّيه.

### باسورد عشوائي

~~~bash
  pass=$(openssl rand -base64 12 | tr -d '/+=' | cut -c1-10)
~~~

- [[openssl rand 12]]: ١٢ byte عشوائي. و [[-base64]]: اكتبهم حروف، فكل ٣ bytes = ٤ حروف، يعني ١٦ حرف: [[ls+XTZnLvEEkuYO+]].
- [[tr -d '/+=']]: امسح الـ [[/]] و [[+]] و [[=]]، دول بيتلخبطوا لما حد يكتبهم أو ينقلهم.
- [[cut -c1-10]]: خد أول ١٠ حروف: [[pnGNA2TaBp]].

### احفظه

~~~bash
  printf '%s\n' "$pass" | htpasswd -iB "$AUTH" "$code" 2>/dev/null
  printf '%-8s %-20s %s\n' "$code" "$name" "$pass"
done
~~~

- [[htpasswd -i]]: اقرا الباسورد من stdin (من الـ pipe). البديل [[-b]] بياخده في سطر الأوامر، وده بيبان لأي يوزر على السيرفر في [[ps]] طول ما الأمر شغال.
- [[-B]]: bcrypt. ومن غير [[-c]]: لو اليوزر موجود يتحدّث، ولو لأ يتضاف.
- [[2>/dev/null]]: ارمي رسالة [[Adding password for user...]] عشان الجدول يفضل نضيف.
- آخر سطر: صف في الجدول.

---

## ٦. reload

~~~bash
nginx -t -q && systemctl reload nginx || echo "nginx -t failed, not reloaded" >&2
~~~

[[nginx -t -q]]: اختبر الإعدادات، و [[-q]] = quiet (من غير رسايل لو سليمة). لو نجح، reload. لو فشل، اطبع. وشكل [[a && b || c]] مش بيوقف السكربت مع [[set -e]].

جربت ملف إعدادات بايظ جنب الإعدادات:

~~~text الناتج
nginx: [emerg] unknown directive "broken" in /etc/nginx/sites-enabled/bad:1
nginx: configuration file /etc/nginx/nginx.conf test failed
nginx -t failed, not reloaded
~~~

وخد بالك: Nginx بيقرا ملف الـ htpasswd مع كل طلب، فالباسوردات الجديدة بتشتغل حتى من غير reload. الـ reload هنا احتياط، والأهم إن [[nginx -t]] بيقولك لو فيه حاجة بايظة.

---

## التشغيل

كل النشطين (الجدول فيه [[ALI]] نشط، و [[sara]] و [[a1]] نشطين، و [[omar]] مش نشط، وواحد من غير كود):

~~~text الناتج
code     name                 password
ali      Ali Hassan           y43sNlLHwJ
a1       Mona Ali             qwFLGAhKhU
sara     Sara Adel            0EpCDkgSaX
~~~

[[ALI]] اتكتب [[ali]] بسبب [[lower]]. والترتيب بالكود الأصلي ([[ORDER BY code]])، والحروف الكبيرة بتيجي الأول.

بأكواد بإيدك فيها أكواد غلط:

~~~bash
sudo bash deploy/nginx/dashboard_users.sh sara "a'b" omar Ali "x;rm"
~~~

~~~text الناتج
code     name                 password
skip bad code: a'b
sara     Sara Adel            S5ExDjNWf2
omar not active, skipped
skip bad code: Ali
skip bad code: x;rm
~~~

الأكواد بالإيد مش بتتحوّل small، فـ [[Ali]] اترفض. والملف بقى فيه سطور زي:

~~~text .htpasswd-dashboard (أول ٣٠ حرف)
admin:$2y$05$P/Mtq7E7VoX3dVQkz
sara:$2y$05$IOZxUK6oMJNRK4QRAi
~~~

[[$2y$]] = bcrypt، و [[05]] = الـ cost (عدد جولات التشفير، كل زيادة ١ بتضاعف الوقت). والتحقق:

~~~text الناتج
$ htpasswd -vb /etc/nginx/.htpasswd-dashboard sara <الباسورد>
Password for user sara correct.
$ htpasswd -vb /etc/nginx/.htpasswd-dashboard sara wrong
password verification failed
~~~

---

## في Nginx

~~~nginx
location / {
  auth_basic "Dashboard";
  auth_basic_user_file /etc/nginx/.htpasswd-dashboard;
}
~~~

[[auth_basic "Dashboard"]] بيشغّل الحماية، والنص هو الـ realm اللي بيظهر في الهيدر. جربت:

~~~text الناتج
من غير يوزر:        401   WWW-Authenticate: Basic realm="Dashboard"
sara بالباسورد:     200
sara بباسورد غلط:   401
بعد htpasswd -D:    401
~~~

[[htpasswd -D FILE user]] (D = delete) بيمسح اليوزر، والدخول اترفض على طول من غير reload.

> فخ لقيته في التجربة: لو الـ location فيه [[return 200 ...]]، الحماية مش بتشتغل وأي حد بياخد 200. [[return]] بيتنفّذ في مرحلة قبل مرحلة [[auth_basic]]. خليها على ملفات أو [[proxy_pass]].

---

## ملخص

| # | الخطوة | الأمر |
|---|---|---|
| ١ | الملف موجود؟ | [[[ -f "$AUTH" ]]] |
| ٢ | مين؟ | arguments أو [[SELECT ... is_active]] |
| ٣ | الكود سليم؟ | regex [[^[a-z0-9]+$]] |
| ٤ | نشط؟ | [[SELECT display_name]] |
| ٥ | باسورد | [[openssl rand]] ← [[tr]] ← [[cut]] |
| ٦ | احفظ | [[htpasswd -iB]] من stdin |
| ٧ | reload | [[nginx -t -q && reload]] |

## الخلاصة

- أي قيمة هتدخل جوه SQL كنص لازم تتفحص الأول، والـ regex الضيق أبسط فحص.
- الباسورد يدخل [[htpasswd]] من stdin ([[-i]])، مش سطر الأوامر ([[-b]]).
- [[-c]] بيمسح الملف، فبيتعمل مرة واحدة بإيدك.`,
          lines: [
            "أي فشل يوقف السكربت (مع استثناءات [[||]] المقصودة).",
            "ملف اليوزرز والباسوردات بتاع Nginx.",
            "روح لفولدر المشروع (فين ما كان السكربت).",
            "دالة بتشغّل SQL في Postgres وترجع النتيجة خام.",
            "لو الملف مش موجود، قول تعمله إزاي واقف.",
            "لو كتبت أكواد، استخدمها...",
            "...وإلا هات أكواد كل الموظفين النشطين.",
            "عنوان الجدول.",
            "لف على الأكواد:",
            "لو الكود فيه أي حاجة غير حروف صغيرة وأرقام، عدّيه.",
            "هات اسم الموظف لو نشط.",
            "لو مش نشط، عدّيه.",
            "باسورد عشوائي ١٠ حروف من غير رموز.",
            "ضيفه أو حدّثه في الملف، والباسورد من stdin مش من سطر الأوامر.",
            "اطبع صف في الجدول.",
            "نهاية اللوب.",
            "لو إعدادات Nginx سليمة اعمل reload، وإلا قول."
          ],
          sol: R`بكودين بإيدك ([[ali sara]]) الناتج جدول:

[[code     name                 password]]
[[ali      Ali Hassan           OJWX0aIkY5]]

الباسورد ١٠ حروف من غير [[/+=]]. وجوه [[.htpasswd-dashboard]] بيتضاف سطر زي [[ali:$2y$05$...]] (bcrypt). جربت [[htpasswd -iB]] والتحقق بـ [[htpasswd -vb]] قال [[Password for user ali correct.]]. الجدول ده بيظهر مرة واحدة بس، ابعته لكل موظف من طريق آمن.

كود زي [[a'b]] بيتطبع على stderr [[skip bad code: a'b]] ومايتبعتش لـ psql خالص، لأن الـ regex [[^[a-z0-9]+$]] بيقفل الـ SQL injection في الاستعلام اللي فيه [[$code]]. جربت الـ regex: [[a'b]] و [[x;rm]] اتعدّوا، وكمان [[Ali]] بحرف كبير اتعدّى، فاكتب الأكواد small. ولو الكود مش موجود أو مش active: [[ali not active, skipped]].

وافتح اللوحة: المتصفح بيطلب يوزر وباسورد، ولو غلط [[401]]. (جربت السكربت كله على Postgres 16 في compose و Nginx على السيرفر، بس بـ [[nginx -s reload]] بدل [[systemctl reload nginx]] لأن التجربة كانت جوه container من غير systemd.)`
        }
      ]
    }
]);
