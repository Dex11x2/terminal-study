// تكملة تاب nginx: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/nginx/01.js (شرح حقول الدرس في أوله)
MORE("nginx", [
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
          teach: R`## الفكرة: مسار واحد بيفضل على http، والباقي يتحوّل

Let's Encrypt عشان تتأكد إن الدومين بتاعك، بتطلب ملف من [[http://example.com/.well-known/acme-challenge/NAME]] على بورت 80 (http، مش https). البلوك ده بيعمل حاجتين: المسار ده يتقدّم من فولدر على الديسك، وأي حاجة تانية تتحوّل لـ https.

### إزاي اتجرّب

[[nginx:alpine]] جوه Docker، والبلوك ده في [[conf.d]] زي ما هو، وملف تجربة في الفولدر، والطلبات بـ curl من جوه الكونتينر بـ [[-H "Host: ..."]]. وبلوك تاني فيه الغلطة الشائعة عشان أقارن.

---

## ١. [[listen 80;]]

اسمع على http العادي. Let's Encrypt (طريقة HTTP-01) بتطلب على بورت 80 بس، ومينفعش تغيّره.

## ٢. [[server_name example.com www.example.com;]]

البلوك ده للاسمين. ولو هتطلب شهادة فيها الاتنين، Let's Encrypt هتطلب ملف تحدي من كل اسم لوحده، فالاتنين لازم يوصلوا هنا.

## ٣. [[location /.well-known/acme-challenge/ { root /var/www/certbot; }]]

### الـ location

أي طلب بيبدأ بـ [[/.well-known/acme-challenge/]]. و [[.well-known]] فولدر متفق عليه عالميًا (معيار RFC 8615) للملفات اللي خدمات خارجية بتدوّر عليها.

### [[root /var/www/certbot;]]

[[root]] بيلزق **المسار كله** بعد الفولدر ده:

~~~text إزاي الطلب بيتحوّل لملف
الطلب:  /.well-known/acme-challenge/test
الملف:  /var/www/certbot + /.well-known/acme-challenge/test
      = /var/www/certbot/.well-known/acme-challenge/test
~~~

يعني certbot لازم يكتب الملفات في [[/var/www/certbot/.well-known/acme-challenge/]]، وده اللي بيعمله لما تديله [[--webroot -w /var/www/certbot]].

### التجربة

~~~bash
echo ok | sudo tee /var/www/certbot/.well-known/acme-challenge/test
curl -si -H "Host: example.com" http://127.0.0.1/.well-known/acme-challenge/test
~~~

~~~text الناتج (أول وآخر سطر)
HTTP/1.1 200 OK
ok
~~~

[[200]] والمحتوى زي ما هو. ولو الملف مش موجود: [[404]] واللوج فيه [[open() "/var/www/certbot/.well-known/acme-challenge/missing" failed (2: No such file or directory)]]، فاللوج بيقولك بالظبط Nginx دوّر فين.

## ٤. [[location / { return 301 https://example.com$request_uri; }]]

أي مسار تاني:

| الحتة | معناها |
|---|---|
| [[return 301]] | رد على طول بتحويل دائم (المتصفح وجوجل يفتكروه) |
| [[https://example.com]] | على https وعلى الدومين من غير www |
| [[$request_uri]] | المسار الأصلي ومعاه الـ query زي ما هو |

~~~text curl -si -H "Host: www.example.com" "http://127.0.0.1/about?x=1"
HTTP/1.1 301 Moved Permanently
Location: https://example.com/about?x=1
~~~

[[www]] اتشالت، و [[/about?x=1]] فضل.

### مين بيكسب؟

الطلب [[/.well-known/acme-challenge/test]] بيبدأ بـ [[/]] وبـ [[/.well-known/acme-challenge/]] الاتنين. Nginx بيختار **أطول** prefix، فالترتيب في الملف مش مهم.

---

## الغلطة الشائعة: [[return]] بره الـ location

~~~text nginx.conf (غلط)
server {
    listen 80;
    server_name bad.example.com;
    return 301 https://example.com$request_uri;
    location /.well-known/acme-challenge/ { root /var/www/certbot; }
}
~~~

[[return]] على مستوى الـ server بيتنفذ **قبل** ما Nginx يختار location أصلًا:

~~~text الناتج
HTTP/1.1 301 Moved Permanently
Location: https://example.com/.well-known/acme-challenge/test
~~~

حتى ملف التحدي اتحوّل، فـ Let's Encrypt هتروح https (ولسه مفيش شهادة) والتحقق يفشل.

---

## الخلاصة

| السطر | ليه |
|---|---|
| [[listen 80]] | التحقق على http بس |
| [[location /.well-known/acme-challenge/]] + [[root]] | ملف certbot يتقدّم، والمسار كله بيتلزق بعد الـ root |
| [[location / { return 301 ... }]] | الباقي يروح https، بس جوه location |

والبلوك ده يفضل موجود بعد ما SSL يشتغل، لأن التجديد كل شهرين بيعدّي من نفس الطريق.`,
          lines: [
            "بلوك بورت 80.",
            "http.",
            "الدومين بالـ www ومن غيرها.",
            "ملفات التحدي من الفولدر المشترك مع certbot.",
            "أي حاجة تانية تروح https على دومين واحد.",
            "قفلة."
          ],
          sol: R`[[curl http://example.com/.well-known/acme-challenge/test]] بيطبع [[ok]]، والـ status [[200]] مش 301. جربتها: المسار ده رجّع [[ok]]، وأي مسار تاني على نفس الـ server رجّع [[301]] و [[Location: https://...]].

ده معناه إن [[location /.well-known/acme-challenge/]] أطول prefix فبيكسب قبل [[location /]]، و [[root /var/www/certbot]] بيضيف المسار كله على الـ root، فالملف لازم يبقى في [[/var/www/certbot/.well-known/acme-challenge/test]].

الأغلاط الشائعة: [[301]]: فيه [[return 301]] على مستوى الـ server (بره أي location)، وده بيتنفذ قبل الـ locations. و [[404]]: استخدمت [[alias]] بمسار غلط أو الملف في [[/var/www/certbot/test]]. ولو نفس الأمر من بره السيرفر مش شغال ومن جوه شغال، البورت 80 مقفول في الـ firewall.`
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
          teach: R`## الفكرة: امتى Nginx بيسأل «الاسم ده IP كام؟»

جوه شبكة Docker كل container ليه اسم، والاسم بيتحوّل لـ IP عن طريق DNS داخلي بتاع Docker. السؤال: Nginx بيسأل امتى؟ لو الاسم مكتوب ثابت في [[proxy_pass]]، بيسأل **مرة واحدة** وقت ما يقرا الإعداد. لو الاسم في متغير، بيسأل **وقت الطلب**، وده محتاج سطر [[resolver]] يقوله يسأل مين.

### إزاي اتجرّب

شبكة Docker خاصة، وعليها تطبيق [[traefik/whoami]] باسم [[ngx02-rapp]] (مكان [[myapp-app:3000]])، و ٣ كونتينرات [[nginx:alpine]] جنب بعض: واحد بالإعداد ده (resolver ومتغير)، وواحد بالاسم ثابت في [[proxy_pass]]، وواحد بالمتغير من غير [[resolver]].

---

## ١. [[resolver 127.0.0.11 valid=10s ipv6=off;]]

| الحتة | معناها |
|---|---|
| [[resolver]] | سيرفر DNS اللي Nginx يسأله وقت الطلب |
| [[127.0.0.11]] | الـ DNS الداخلي بتاع Docker، عنوان ثابت جوه أي container على شبكة انت عاملها |
| [[valid=10s]] | خزّن الإجابة ١٠ ثواني بس، وبعدين اسأل تاني |
| [[ipv6=off]] | متسألش عن عناوين IPv6 (شبكات Docker غالبًا IPv4 بس) |

منين جه [[127.0.0.11]]؟ Docker بيحطه في [[/etc/resolv.conf]] بتاع أي container على شبكة متعرّفة:

~~~text cat /etc/resolv.conf | grep nameserver
nameserver 127.0.0.11
~~~

بس Nginx مش بيقرا [[resolv.conf]] لوحده، فلازم تكتبه. والسطر ده بره الـ [[server]] (في [[http]])، فبيتطبق على كل المواقع.

---

## ٢. البلوك

~~~text nginx.conf
server {
    listen 80;
    server_name example.com;
    location / {
        set $app_upstream http://myapp-app:3000;
        proxy_pass $app_upstream;
    }
}
~~~

### [[set $app_upstream http://myapp-app:3000;]]

[[set]] بيعمل متغير ويحط فيه قيمة. الاسم [[$app_upstream]] من اختيارنا. والقيمة العنوان كامل بالـ [[http://]].

### [[proxy_pass $app_upstream;]]

لما [[proxy_pass]] ياخد متغير، Nginx مايقدرش يحلّه وقت القراية (القيمة ممكن تتغير مع كل طلب)، فبيأجّله لوقت الطلب ويسأل الـ [[resolver]].

---

## ٣. التجربة: الـ container اتعمل من جديد بـ IP تاني

في الأول التطبيق كان على [[172.19.0.3]]، والتلاتة:

~~~text الناتج
dyn 200
st 200
nores 502
~~~

[[nores]] (متغير من غير resolver) فشل من أول طلب، واللوج قال:

~~~text docker logs
no resolver defined to resolve ngx02-rapp
~~~

بعدين مسحت التطبيق، وخليت container تاني ياخد IP القديم، وعملت التطبيق من جديد (زي [[up -d]] بعد build)، فاخد [[172.19.0.7]]. ١٦ ثانية من الطلبات:

~~~text الناتج
dyn 200  st 502   t=2s
dyn 200  st 502   t=4s
...
dyn 200  st 502   t=16s
~~~

الثابت لسه بيكلّم العنوان القديم:

~~~text docker logs
connect() failed (111: Connection refused) while connecting to upstream, ... upstream: "http://172.19.0.3:80/"
~~~

ومش هيصحى غير بـ [[nginx -s reload]] (بعده رجع 200). أما الـ resolver فرجع 200 لوحده (لو الإجابة القديمة لسه في الـ ١٠ ثواني بتوع [[valid]]، كان هيفضل 502 لحد ما تخلص).

### ولو التطبيق مش شغال خالص؟

وقّفت التطبيق وعملت [[nginx -t]] على الاتنين:

~~~text الثابت
nginx: [emerg] host not found in upstream "ngx02-rapp" in /etc/nginx/conf.d/default.conf:5
nginx: configuration file /etc/nginx/nginx.conf test failed
~~~

~~~text بالمتغير
nginx: configuration file /etc/nginx/nginx.conf test is successful
~~~

ده الفرق الأكبر على Nginx مشترك: مع الاسم الثابت، مشروع واحد واقع يمنع الـ reload (أو التشغيل) لكل المواقع. مع المتغير، الموقع ده بس بيرجع 502 واللوج يقول [[ngx02-rapp could not be resolved (3: Host not found)]]، والباقي شغال.

---

## ٤. فرق لازم تاخد بالك منه

مع المتغير، Nginx بيبعت المسار زي ما هو. يعني لو كنت كاتب [[proxy_pass http://app:3000/;]] (بشرطة في الآخر) عشان يشيل بادئة الـ location، الحركة دي مش هتشتغل مع المتغير، ومحتاج [[rewrite]].

---

## الخلاصة

| الإعداد | الاسم بيتحل امتى | container اتعمل من جديد | container واقع وقت reload |
|---|---|---|---|
| [[proxy_pass http://app:3000]] | مرة وقت القراية | 502 لحد reload | [[host not found]] والإعداد كله يترفض |
| متغير من غير [[resolver]] | مش بيتحل | 502 دايمًا | — |
| [[resolver 127.0.0.11]] + متغير | مع الطلبات (كل [[valid]]) | يرجع لوحده | الموقع ده بس 502 |

[[127.0.0.11]] جوه شبكات Docker بس، مش لـ Nginx مسطّب على السيرفر.`,
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
          ],
          sol: R`من غير الـ resolver: بعد [[--force-recreate]] الـ container بياخد IP جديد، و Nginx لسه ماسك القديم، فاللوب بيطبع [[502]] على طول، و [[docker logs nginx]] فيه [[connect() failed (111: Connection refused) while connecting to upstream ... upstream: "http://172.20.0.2:80/"]]. بعد [[nginx -s reload]] بيرجع 200.

مع الـ resolver والمتغير: فيه 502 لثواني قليلة (لحد ما الـ container الجديد يقوم ويخلص [[valid=10s]])، وبعدين 200 لوحده من غير reload. جربت الاتنين جنب بعض: القديم فضل 502 لحد الـ reload، والجديد رجع لوحده.

الغلط الشائع: تحط [[resolver]] وتسيب [[proxy_pass http://myapp-app:3000;]] مباشرة من غير متغير؛ كده Nginx بيحل الاسم مرة واحدة وقت التشغيل بس والـ resolver مالوش أثر. و [[127.0.0.11]] بيشتغل جوه شبكات Docker اللي انت عاملها بس، مش على Nginx مسطّب على السيرفر.`
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
          teach: R`## الفكرة: نسخة طبق الأصل من Nginx، بس للاختبار

[[nginx -t]] بيختبر الإعداد. المشكلة إن [[docker exec nginx nginx -t]] بيختبر الملف اللي الـ container الحقيقي شايفه **دلوقتي**، يعني لازم تكون كتبت فوق الملف الحقيقي الأول. الأمر ده بيشغّل container تاني مؤقت: نفس الـ image، ونفس الشبكة، ونفس الشهادات، بس راكب فيه الملف **الجديد**. يختبر ويتمسح، والحقيقي محدش لمسه.

### إزاي اتجرّب

Nginx «حقيقي» ([[nginx:alpine]]) شغال باسم [[ngx02-shared]] على شبكة Docker، والـ [[nginx.conf]] بتاعه فيه بلوك https بشهادة self-signed في مسار [[/etc/letsencrypt/live/example.com/]]، و [[proxy_pass http://ngx02-app:80]] لتطبيق على نفس الشبكة. وفي الأوامر الاسم [[ngx02-shared]] مكان [[nginx]]، وشبكتي مكان [[proxy-net]]، وفولدرات التجربة مكان [[/srv/...]].

---

## ١. [[IMAGE="$(docker inspect nginx --format '{{.Config.Image}}')"]]

### [[docker inspect nginx]]

بيطبع كل حاجة عن الـ container اللي اسمه [[nginx]] كـ JSON طويل جدًا.

### [[--format '{{.Config.Image}}']]

بدل الـ JSON كله، هات خانة واحدة. [[{{ }}]] صيغة قوالب Go (اللغة اللي Docker مكتوب بيها)، و [[.Config.Image]] يعني «جوه [[Config]] هات [[Image]]»: اسم الـ image اللي الـ container اتعمل منها.

### [[IMAGE="$(...)"]]

[[$(...)]] نفّذ وحط الناتج هنا، و [[IMAGE=]] خزّنه في متغير:

~~~text echo "$IMAGE"
nginx:alpine
~~~

ليه مش تكتب [[nginx:alpine]] بإيدك؟ عشان تختبر بنفس النسخة بالظبط. [[http2 on]] مثلًا بيعدّي على 1.25 ويترفض على 1.24، فاختبار بنسخة تانية ممكن يعدّي والحقيقي يقع.

---

## ٢. [[docker run --rm --network proxy-net \]]

| الحتة | معناها |
|---|---|
| [[docker run]] | اعمل container جديد وشغّله |
| [[--rm]] | امسحه لوحده أول ما يخلص |
| [[--network proxy-net]] | حطه على نفس شبكة Docker بتاعة Nginx الحقيقي |
| [[\]] في آخر السطر | الأمر لسه مكمّل في السطر اللي بعده |

ليه الشبكة؟ [[nginx -t]] بيحاول يحوّل أسامي الـ upstreams الثابتة لـ IP. جربت من غير [[--network]]:

~~~text الناتج
nginx: [emerg] host not found in upstream "ngx02-app" in /etc/nginx/nginx.conf:10
nginx: configuration file /etc/nginx/nginx.conf test failed
~~~

والإعداد سليم أصلًا. ده فشل كاذب.

---

## ٣. [[-v "$PWD/nginx.conf.new:/etc/nginx/nginx.conf:ro" \]]

[[-v host:container]] اركب ملف من السيرفر جوه الـ container.

| الحتة | معناها |
|---|---|
| [[$PWD]] | الفولدر اللي انت فيه دلوقتي (Docker محتاج مسار كامل) |
| [[nginx.conf.new]] | الملف الجديد اللي عايز تجربه |
| [[/etc/nginx/nginx.conf]] | يظهر جوه الـ container مكان الإعداد الأساسي |
| [[:ro]] | read-only: الـ container يقرا بس |

## ٤. [[-v /srv/certbot/conf:/etc/letsencrypt:ro \]]

[[nginx -t]] مش بيقرا الإعداد بس، ده بيفتح ملفات الشهادات فعلًا. جربت من غير السطر ده:

~~~text الناتج
nginx: [emerg] cannot load certificate "/etc/letsencrypt/live/example.com/fullchain.pem": BIO_new_file() failed (... No such file or directory ...)
nginx: configuration file /etc/nginx/nginx.conf test failed
~~~

فشل كاذب تاني.

## ٥. [["$IMAGE" nginx -t]]

الـ image من المتغير، وبعدها الأمر اللي يتنفذ **بدل** تشغيل Nginx العادي: [[nginx -t]]. يختبر ويخرج، و [[--rm]] يمسح الـ container.

---

## التجربة

### ملف سليم

~~~text الناتج
/docker-entrypoint.sh: Configuration complete; ready for start up
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
exit=0
~~~

السطور اللي بتبدأ بـ [[/docker-entrypoint.sh]] (حوالي ٩ سطور) بيطبعها سكربت البداية بتاع image [[nginx]] الرسمية قبل أي أمر بيبدأ بـ [[nginx]]. عادي، ركّز على آخر سطرين.

### ملف فيه غلطة

شلت [[;]] من آخر سطر [[gzip_comp_level 5;]]:

~~~text الناتج
nginx: [emerg] directive "gzip_comp_level" is not terminated by ";" in /etc/nginx/nginx.conf:5
nginx: configuration file /etc/nginx/nginx.conf test failed
exit=1
~~~

اسم الـ directive، والملف، ورقم السطر ([[:5]]). و [[exit=1]] يعني فشل، فسكربت يقدر يوقف عليه.

وفي نفس اللحظة الحقيقي:

~~~text curl على Nginx الحقيقي
200
~~~

ماحصلّوش حاجة. و [[docker ps -a]] مفيهوش غير الحقيقي: المؤقت اتمسح.

---

## بعد ما يعدّي

اكتب الملف الجديد مكان القديم، وبعدين [[docker exec nginx nginx -s reload]]. الدرس اللي بعده بيعمل ده كله في سكربت.

---

## الخلاصة

| الحتة | من غيرها |
|---|---|
| نفس الـ image ([[docker inspect]]) | يعدّي عندك ويقع في الحقيقي |
| [[--network]] | [[host not found in upstream]] كاذب |
| mount الشهادات | [[cannot load certificate]] كاذب |
| [[--rm]] | containers ميتة بتتراكم |

لو الخطأ عن upstream أو شهادة، اتأكد من بيئة الاختبار قبل ما تشك في ملفك.`,
          lines: [
            "اسم الـ image اللي Nginx الحقيقي شغال بيها.",
            "container مؤقت على نفس الشبكة (بيتمسح بعد ما يخلص).",
            "راكب فيه الملف الجديد مكان nginx.conf.",
            "والشهادات عشان -t بيفتحها فعلًا.",
            "اختبر بس، من غير ما تشغّل حاجة."
          ],
          sol: R`الأمر بيطبع الخطأ باسم الملف ورقم السطر، زي:

[[nginx: [emerg] invalid number of arguments in "gzip_comp_level" directive in /etc/nginx/nginx.conf:13]] وبعدها [[nginx: configuration file /etc/nginx/nginx.conf test failed]] والـ exit code 1. (جربت نفس الغلطة: شلت [[;]] من آخر سطر gzip_comp_level.) وأحيانًا حسب مكان الـ [[;]] الرسالة بتبقى [[unexpected "}"]] أو [[directive ... is not terminated by ";"]] والسطر اللي بعده.

وفي نفس الوقت [[curl]] على الموقع الحقيقي بيرجع 200 عادي، لأن الـ container المؤقت ماعملش أي حاجة غير الاختبار واتمسح.

الغلط الشائع: [[host not found in upstream "myapp:3000"]]: الـ container المؤقت مش على نفس شبكة Docker ([[--network]] ناقص أو اسمها غلط). أو [[cannot load certificate]]: نسيت mount بتاع الشهادات. دول مش أخطاء في ملفك، دول ناقص في بيئة الاختبار.`
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
docker run --rm --network proxy-net -v "$TMP.new:/etc/nginx/nginx.conf:ro" -v /srv/certbot/conf:/etc/letsencrypt:ro "$IMAGE" nginx -t \
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

الاختبار في container مؤقت بنفس الـ image والشبكة والشهادات (الدرس اللي قبله). لو فشل، [[exit 1]] والملف زي ما هو.

ليه [[cat "$TMP.new" > "$CONF"]] مش [[mv]]؟ الملف راكب في الـ container كـ bind mount لملف واحد، والـ mount مربوط بالـ inode (رقم الملف على الديسك). [[mv]] و [[sed -i]] بيعملوا ملف جديد بـ inode جديد، فالـ container يفضل شايف القديم، والـ reload يقرا الإعداد القديم وانت فاكر إنك طبّقت. [[cat >]] بيكتب جوه نفس الملف فالـ container يشوف التغيير.`,
            when: "أي config مشترك بين أكتر من مشروع، أو أي ملف بيعدّله سكربت deploy بدل إنسان.",
            mistakes: "في مشروع حقيقي السكربت كان بيفترض إن آخر [[}]] في الملف قفلة [[http {}]]، فلو فيه [[stream {}]] بعده البلوك يتحط في المكان الغلط. وكان لو علامة النهاية اتمسحت يدوي بيضيف بلوك مكرر (النسخة دي بتقف). وملفات [[.bak]] بتتراكم من غير تنضيف ([[find -name '*.bak.*' -mtime +30 -delete]]). والأهم: مشروع بيعدّل ملف يملكه مشروع تاني بيربطهم ببعض، فالأنضف [[include /etc/nginx/conf.d/*.conf]] وكل مشروع ملف لوحده."
          },
          teach: R`## الفكرة: علامتين بيحددوا حتة مشروعك

ملف [[nginx.conf]] واحد عليه كذا مشروع. السكربت ده بيحط جزء مشروعك بين سطرين تعليق ([[# >>> myapp (managed)]] و [[# <<< myapp]]). كل مرة يتشغّل: يشيل اللي بين العلامتين، ويحط النسخة الجديدة من الـ snippet، ويختبر في container مؤقت (الدرس اللي فات)، ولو عدّى يكتب ويعمل reload. لو أي حاجة فشلت، الملف الحقيقي زي ما هو.

### إزاي اتجرّب

Git Bash على ويندوز، و Nginx «حقيقي» ([[nginx:alpine]]) باسم [[ngx02-shared]] راكب فيه [[nginx.conf]] كملف واحد (bind mount). نسخة من السكربت فيها الفرق ده بس: [[CONF]] ومسار الشهادات في فولدر التجربة، واسم الـ container [[ngx02-shared]] مكان [[nginx]]، وشبكتي مكان [[proxy-net]]. والـ snippet كان:

~~~text snippet.conf
    server {
        listen 80;
        server_name myapp.example.com;
        location / { return 200 "myapp v1\n"; }
    }
~~~

---

## ١. البداية

~~~bash
#!/bin/bash
set -euo pipefail
~~~

[[#!/bin/bash]] (shebang): شغّل الملف ده بـ bash. و [[set -euo pipefail]] ٣ إعدادات أمان:

| الحرف | معناه |
|---|---|
| [[-e]] | لو أي أمر فشل، اقف |
| [[-u]] | لو استخدمت متغير مش متعرّف، اقف (بدل ما يبقى فاضي بهدوء) |
| [[-o pipefail]] | الـ pipe يعتبر فاشل لو أي أمر فيه فشل، مش آخر واحد بس |

## ٢. [[SNIPPET="$__{1:?usage: nginx-apply.sh snippet.conf}"]]

[[$1]] أول باراميتر بعد اسم السكربت. و [[$__{1:?message}]] معناها: لو [[$1]] مش موجود أو فاضي، اطبع الرسالة واقف. فـ [[bash nginx-apply.sh]] من غير ملف بيقف على طول بطريقة الاستخدام.

## ٣. المتغيرات

~~~bash
CONF=/srv/shared/nginx/nginx.conf
BEGIN="# >>> myapp (managed)"; END="# <<< myapp"
~~~

الملف المشترك، والعلامتين. [[;]] بتفصل أمرين في سطر واحد. وغيّر [[myapp]] باسم مشروعك، عشان كل مشروع ليه علاماته.

## ٤. [[cp "$CONF" "$CONF.bak.$(date +%Y%m%d%H%M%S)"]]

نسخة احتياطية والتاريخ والوقت في اسمها. [[date +%Y%m%d%H%M%S]] = سنة شهر يوم ساعة دقيقة ثانية لازقين:

~~~text ls
nginx.conf.bak.20261006155727
nginx.conf.bak.20261006155730
~~~

(كل تشغيلة بتعمل واحدة، فبتتراكم.)

## ٥. [[TMP="$(mktemp)"; cp "$CONF" "$TMP"]]

[[mktemp]] بيعمل ملف فاضي باسم عشوائي في الفولدر المؤقت ([[/tmp/tmp.Ojdd3NeW4P]] مثلًا) ويطبع اسمه. ونسخنا الملف فيه. **كل التعديل من هنا هيبقى على النسخة دي**.

---

## ٦. لاقي العلامتين

~~~bash
start=$(grep -n -F "$BEGIN" "$TMP" | head -1 | cut -d: -f1 || true)
end=$(grep -n -F "$END" "$TMP" | tail -1 | cut -d: -f1 || true)
~~~

من جوه لبرة:

| الحتة | بتعمل إيه |
|---|---|
| [[grep -n]] | اطبع السطور اللي فيها النص، وقبل كل واحد رقمه: [[18:# >>> myapp (managed)]] |
| [[-F]] | النص حرفي مش regex (عشان [[(]] و [[>]] مايتفهموش رموز) |
| [[head -1]] / [[tail -1]] | أول ظهور للبداية، وآخر ظهور للنهاية |
| [[cut -d: -f1]] | قسّم السطر عند [[:]] وخد أول حتة: رقم السطر |


و [[|| true]] في الآخر: لو [[grep]] مالقاش (exit 1)، متخليش [[set -e]] يوقف السكربت. أول مرة مفيش علامات، فالاتنين فاضيين.

## ٧. امسح البلوك القديم

~~~bash
if [ -n "$start" ] && [ -n "$end" ]; then sed -i "$__{start},$__{end}d" "$TMP"
elif [ -n "$start$end" ]; then echo "one marker is missing, fix by hand"; exit 1; fi
~~~

[[-n]] يعني «مش فاضي». لو الاتنين موجودين: [[sed -i "18,24d"]] امسح السطور من 18 لـ 24 ([[d]] = delete). والأقواس في [[$__{start}]] عشان bash يعرف إن اسم المتغير خلص قبل [[d]] (من غيرها كان هيدوّر على متغير اسمه [[endd]]).

[[elif [ -n "$start$end" ]]]: لو لزقناهم وطلعوا مش فاضيين، يبقى واحد بس موجود: حد عدّل بإيده. جربتها بإني مسحت سطر النهاية:

~~~text الناتج
one marker is missing, fix by hand
exit=1
~~~

بيقف بدل ما يضيف بلوك تاني.

## ٨. حط البلوك الجديد قبل آخر قوس

~~~bash
last=$(grep -n '^}' "$TMP" | tail -1 | cut -d: -f1)
{ head -n $((last - 1)) "$TMP"; echo "$BEGIN"; cat "$SNIPPET"; echo "$END"; echo "}"; } > "$TMP.new"
~~~

[[^}]]: سطر بيبدأ بـ [[}]] ([[^]] = أول السطر). آخر واحد فيهم هو قفلة [[http {}]] (افتراض: لو فيه [[stream {}]] بعده، البلوك هيروح المكان الغلط).

و [[{ ...; } > "$TMP.new"]] كل اللي جوه الأقواس يتكتب في ملف جديد، بالترتيب:

| الأمر | بيكتب |
|---|---|
| [[head -n $((last - 1))]] | كل السطور قبل القوس ([[$((...))]] حساب في bash) |
| [[echo "$BEGIN"]] | علامة البداية |
| [[cat "$SNIPPET"]] | الـ snippet |
| [[echo "$END"]] | علامة النهاية |
| [[echo "}"]] | القوس تاني |

آخر الملف بعد التشغيل:

~~~text tail -9 nginx.conf
    }
# >>> myapp (managed)
    server {
        listen 80;
        server_name myapp.example.com;
        location / { return 200 "myapp v1\n"; }
    }
# <<< myapp
}
~~~

---

## ٩. الاختبار

~~~bash
IMAGE="$(docker inspect nginx --format '{{.Config.Image}}')"
docker run --rm --network proxy-net -v "$TMP.new:/etc/nginx/nginx.conf:ro" -v /srv/certbot/conf:/etc/letsencrypt:ro "$IMAGE" nginx -t \
  || { echo "test failed, $CONF unchanged"; exit 1; }
~~~

نفس أمر الدرس اللي فات، على [[$TMP.new]]. و [[||]] = «لو اللي قبلي فشل، نفّذني». جربت snippet فيه [[retrun]] بدل [[return]]:

~~~text الناتج
nginx: [emerg] unknown directive "retrun" in /etc/nginx/nginx.conf:20
nginx: configuration file /etc/nginx/nginx.conf test failed
test failed, /srv/shared/nginx/nginx.conf unchanged
~~~

و [[cmp]] بين الملف قبل وبعد: متطابقين. والموقع لسه بيرد [[myapp v1]].

> الـ [[exit 1]] هنا (وفي حالة العلامة الناقصة) بيخرج قبل سطر [[rm]]، فملفات [[tmp.*]] بتفضل في [[/tmp]]. لقيت ٣ بعد التجربتين. مش مشكلة كبيرة، و [[trap 'rm -f "$TMP" "$TMP.new"' EXIT]] بعد [[mktemp]] يحلها.

## ١٠. [[cat "$TMP.new" > "$CONF"]]: ليه مش [[mv]]؟

الـ [[nginx.conf]] راكب في الـ container كملف واحد، والـ mount ده على لينكس مربوط بالـ **inode** (رقم الملف على الديسك، مش اسمه). جربت ده في كونتينر لينكس بـ [[mount --bind]] لملف (نفس اللي Docker بيعمله):

~~~text الناتج
311583 host.conf
311583 inside.conf
after mv: host=v2 inside=v1
after cat>: host=v3 inside=v3
after sed -i: host=v4 inside=v3
~~~

| الطريقة | الـ inode | الـ container شايف |
|---|---|---|
| [[mv new.conf host.conf]] | ملف جديد برقم جديد | **القديم** |
| [[sed -i]] | برضه ملف جديد | **القديم** |
| [[cat new > host.conf]] | نفس الملف، محتوى جديد | الجديد |

يعني مع [[mv]] الـ reload هيقرا الإعداد القديم وانت فاكر إنك طبّقت. (على Docker Desktop على ويندوز الـ mount بيمشي بالاسم، فـ [[mv]] ظهر عادي في التجربة؛ بس السيرفر الحقيقي لينكس.)

## ١١. النهاية

~~~bash
rm -f "$TMP" "$TMP.new"
docker exec nginx nginx -s reload
~~~

امسح الملفات المؤقتة ([[-f]]: متشتكيش لو مش موجودة)، و reload جوه الـ container الحقيقي.

---

## التجربة: مرتين ورا بعض

~~~text الناتج
nginx: configuration file /etc/nginx/nginx.conf test is successful
run 1 exit=0  count=1
nginx: configuration file /etc/nginx/nginx.conf test is successful
run 2 exit=0  count=1
~~~

[[count]] هو [[grep -c '>>> myapp' nginx.conf]]: فضل 1، لأن التشغيلة التانية مسحت البلوك قبل ما تحطه. والموقع رد [[myapp v1]].

---

## الخلاصة

| المرحلة | الحماية |
|---|---|
| باك أب بالتاريخ | ترجع لأي نسخة |
| الشغل على [[mktemp]] | الحقيقي مبيتلمسش لحد الآخر |
| العلامتين | التشغيل كذا مرة مش بيكرر البلوك، وعلامة ناقصة توقف السكربت |
| [[nginx -t]] في container مؤقت | غلطة في الـ snippet متوصلش للحقيقي |
| [[cat >]] مش [[mv]] | الـ container يشوف التعديل |`,
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
            "اختبر في container مؤقت، ومعاه الشهادات عشان [[-t]] بيفتحها...",
            "...ولو فشل اقف والملف الحقيقي زي ما هو.",
            "اكتب جوه نفس الملف (نفس الـ inode) عشان الـ container يشوفه.",
            "امسح الملفات المؤقتة.",
            "طبّق من غير قطع."
          ],
          sol: R`المرتين بيطبعوا إن [[nginx -t]] نجح ([[test is successful]])، و [[grep -c '>>> myapp' nginx.conf]] بيطبع [[1]] بعد الأولى وبعد التانية. ده لأن السكربت بيمسح البلوك القديم من [[BEGIN]] لـ [[END]] قبل ما يحط الجديد. جربته مرتين على نسخة تجربة وفضل 1، والملف فيه البلوك مرة واحدة قبل آخر [[}]].

وكمان هتلاقي ملفين باك أب [[nginx.conf.bak.*]]. ولو جرّبت snippet فيه غلطة، [[nginx -t]] بيفشل والسكربت بيطبع [[test failed, ... unchanged]] والملف الأصلي زي ما هو (جربتها برضه).

الغلط الشائع: العدد يطلع 2 لو حد عدّل الملف بإيده ومسح سطر [[# <<< myapp]]؛ ساعتها السكربت بيقف بـ [[one marker is missing]] بدل ما يبوّظ. وخلّي بالك إن السكربت بيفترض إن آخر [[}]] في أول السطر هو قفلة http.`
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
          teach: R`## الفكرة: اسم الدومين = HTTPS

في Caddy، أي بلوك بيبدأ باسم دومين معناه: «اطلب شهادة للاسم ده، وجددها، وحوّل http لـ https». مفيش certbot ولا بلوك acme ولا [[ssl_certificate]]. الملف ده ([[Caddyfile]]) فيه موقعين: بوت مكشوف منه مسار الـ webhook بس، ولوحة عليها باسورد.

### إزاي اتجرّب

[[caddy:2.8]] جوه Docker على شبكة Docker، و [[traefik/whoami]] مرتين مكان [[app:8080]] و [[n8n:5678]] (كل واحد بيرد باسمه)، والطلبات بـ curl من كونتينر تاني على نفس الشبكة. ومفيش دومين حقيقي، فضفت في أول الملف [[{ local_certs }]]: Caddy يطلّع الشهادات من CA داخلي عنده بدل Let's Encrypt، وكل الباقي زي ما هو. و [[caddy validate]] على الملف الأصلي من غير الإضافة دي قال [[Valid configuration]]. الشهادة الحقيقية من Let's Encrypt ماجربتهاش (محتاجة دومين بيشاور على السيرفر)، والكلام عنها من الـ docs.

---

## ١. [[bot.example.com { ... }]]

اسم الدومين وبعده [[{]]: كل اللي جوه الأقواس للدومين ده. وده كفاية Caddy يبدأ يطلب شهادة. في اللوج:

~~~text docker logs (مختصر)
"msg":"enabling automatic TLS certificate management"
"msg":"obtaining certificate"
"msg":"certificate obtained successfully"
~~~

(مرتين، مرة لكل دومين.)

## ٢. [[handle /webhook/* { reverse_proxy app:8080 }]]

| الحتة | معناها |
|---|---|
| [[handle]] | مجموعة أوامر لطلبات معينة |
| [[/webhook/*]] | الـ matcher: أي مسار بيبدأ بـ [[/webhook/]]، و [[*]] = أي حاجة بعدها |
| [[reverse_proxy app:8080]] | ابعت الطلب للـ container اللي اسمه [[app]] على 8080 |

~~~text curl -sk https://bot.example.com/webhook/x
Name: bot
~~~

([[-k]] لأن الشهادة من CA داخلي مش موثوق. مع Let's Encrypt مش هتحتاجها.)

## ٣. [[handle { respond "not found" 404 }]]

[[handle]] من غير matcher: أي طلب ماخدهوش [[handle]] تاني. و [[handle]] واحد بس بيشتغل لكل طلب، والأدق (اللي ليه مسار) بيكسب. [[respond "not found" 404]]: رد بالنص ده والـ status ده.

~~~text curl -sk -w " %{http_code}" https://bot.example.com/other
not found 404
~~~

كده التطبيق كله مستخبي، والـ webhook بس اللي بيوصله.

### والـ http؟

~~~text curl -s -w "%{http_code} -> %{redirect_url}" http://bot.example.com/webhook/x
308 -> https://bot.example.com/webhook/x
~~~

Caddy حوّل لوحده. [[308]] زي [[301]] (دائم) بس بيضمن إن المتصفح يعيد الطلب بنفس الـ method (POST يفضل POST).

---

## ٤. [[admin.example.com { ... }]]

### [[basic_auth { admin PASTE_HASH_HERE }]]

نفس فكرة [[auth_basic]] في Nginx. جوه الأقواس سطر لكل يوزر: الاسم، وبعده hash الباسورد (مش الباسورد نفسه). الـ hash بيطلع من Caddy نفسه:

~~~bash
docker run --rm caddy:2.8 caddy hash-password --plaintext 's3cret'
~~~

~~~text الناتج
$2a$14$gPwG8h4yMhmoZqszxgy8zeM9dI9OWx8NsrECz9k1hIKpwTuVg9UTW
~~~

[[$2a$]] = bcrypt، و [[14]] الـ cost (أبطأ وأقوى من [[05]] بتاع [[htpasswd -B]]). والسطر ده بيتلزق مكان [[PASTE_HASH_HERE]]. ومن غير [[--plaintext]] الأمر بيسألك الباسورد مرتين (أحسن، عشان مايتسجلش في الـ history).

> الاسم [[basic_auth]] من Caddy 2.8. النسخ الأقدم اسمها [[basicauth]] (من غير شرطة).

### [[reverse_proxy n8n:5678]]

بعد الباسورد، كل حاجة للوحة. ومن غير [[handle]] هنا، لأن الدومين كله رايح مكان واحد.

| الطلب | الرد |
|---|---|
| من غير باسورد | [[401]] و [[www-authenticate: Basic realm="restricted"]] |
| [[-u admin:s3cret]] | [[Name: n8n]] |

واللي وصل n8n من headers:

~~~text الناتج
X-Forwarded-For: 172.19.0.7
X-Forwarded-Host: admin.example.com
X-Forwarded-Proto: https
~~~

Caddy بيبعتهم لوحده. في Nginx كنت هتكتب [[proxy_set_header]] لكل واحد.

---

## ٥. التشغيل (من الـ [[try]])

~~~bash
docker run -d -p 80:80 -p 443:443 -v caddy_data:/data -v $PWD/Caddyfile:/etc/caddy/Caddyfile caddy
~~~

| الحتة | ليه |
|---|---|
| [[-p 80:80 -p 443:443]] | Let's Encrypt بتتحقق على 80، والموقع على 443 |
| [[-v caddy_data:/data]] | الشهادات والمفاتيح بتتحفظ هنا. من غيره كل إعادة إنشاء = شهادة جديدة، لحد ما تخبط حد Let's Encrypt |
| [[-v $PWD/Caddyfile:/etc/caddy/Caddyfile]] | ملفك مكان الإعداد الافتراضي |

و [[app]] و [[n8n]] لازم يبقوا على نفس شبكة Docker بتاعة Caddy (في compose: نفس الملف أو [[networks]] مشتركة)، وإلا [[502]].

---

## الخلاصة

| Nginx | Caddy |
|---|---|
| بلوك acme + certbot + [[ssl_certificate]] + تجديد | اسم الدومين بس |
| [[return 301 https://...]] | لوحده ([[308]]) |
| [[location]] | [[handle]] + matcher |
| [[auth_basic]] + ملف [[htpasswd]] | [[basic_auth]] + [[caddy hash-password]] |
| [[proxy_pass]] + [[proxy_set_header]] | [[reverse_proxy]] |

ومتشغّلش Caddy و Nginx على نفس السيرفر: الاتنين عايزين 80 و 443.`,
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
          ],
          sol: R`بعد [[docker run -d -p 80:80 -p 443:443 ... caddy]]، [[docker logs]] بتاعه بيوري إنه بيطلب الشهادة: سطور فيها [[obtaining certificate]] وبعدين [[certificate obtained successfully]] للدومين. وفتح [[https://bot.example.com/webhook/x]] بيروح للتطبيق، وأي مسار تاني بيرجع [[not found]] بـ 404، و [[http://]] بيتحول [[https://]] لوحده.

ماجربتهاش هنا (محتاجة دومين بيشاور على السيرفر). والتطبيق [[app:8080]] لازم يبقى على نفس شبكة Docker بتاعة Caddy، وإلا هتاخد [[502]] واللوج يقول [[dial tcp: lookup app]].

الأغلاط الشائعة: الشهادة مش بتطلع: DNS لسه مش بيشاور على السيرفر، أو 80 و 443 مقفولين، أو فيه Nginx تاني ماسك البورتات ([[address already in use]]). ونسيان [[-v caddy_data:/data]] بيخلّي Caddy يطلب شهادة جديدة مع كل تشغيل، فتخبط rate limit بتاع Let's Encrypt.`
        }
      ]
    }
]);
