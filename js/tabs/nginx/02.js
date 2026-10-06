// تكملة تاب nginx: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/nginx/01.js (شرح حقول الدرس في أوله)
MORE("nginx", [
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
          teach: R`## الفكرة: Nginx يضغط، والمتصفح يفك

الـ ٥ سطور دول بيتحطوا مرة واحدة جوه [[http { }]]، فبيشتغلوا لكل المواقع. على أوبونتو مكانهم المريح ملف في [[/etc/nginx/conf.d/]] (أي [[.conf]] هناك بيتسحب جوه http). جربتهم في كونتينر [[nginx:alpine]] حاطط فيه الملف ده في [[conf.d/gzip.conf]]، وموقع بيقدّم ملفات من فولدر:

~~~text conf.d/gzip.conf
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_comp_level 5;
gzip_types text/plain text/css text/javascript application/javascript application/json application/xml image/svg+xml;
~~~

---

## الأول: إزاي المتصفح والسيرفر بيتفقوا

١. المتصفح بيبعت مع كل طلب: [[Accept-Encoding: gzip, deflate, br]]، يعني «أنا أعرف أفك دول».
٢. Nginx لو هيضغط، بيبعت الرد مضغوط ومعاه [[Content-Encoding: gzip]].
٣. المتصفح بيشوف الـ header ده ويفك قبل ما يستخدم الملف.

ولو الطلب مفيهوش [[Accept-Encoding]]، Nginx بيبعت الملف عادي. عشان كده في التجارب كلها بنبعته بإيدينا بـ [[curl -H "Accept-Encoding: gzip"]].

---

## ١. [[gzip on;]]

شغّل الضغط. لوحده بيضغط نوع واحد بس: [[text/html]].

## ٢. [[gzip_vary on;]]

بيضيف للرد [[Vary: Accept-Encoding]]، يعني «الرد ده بيختلف حسب Accept-Encoding». أي كاش في النص (CDN أو proxy) بيفهم منه إنه يحفظ نسختين: مضغوطة للي بيفهم، وعادية للي مش بيفهم.

## ٣. [[gzip_min_length 1024;]]

متضغطش أي رد أصغر من 1024 byte (كيلو). الضغط له تكلفة ثابتة صغيرة، وعلى ملف صغير النتيجة ممكن تطلع أكبر من الأصل.

## ٤. [[gzip_comp_level 5;]]

قوة الضغط من 1 (أسرع) لـ 9 (أصغر). جربت الـ ٣ على ملف JS حقيقي حجمه 48067 byte:

| المستوى | الحجم بعد الضغط |
|---|---|
| 1 | 19407 |
| 5 | 16963 |
| 9 | 16824 |

من 1 لـ 5 وفرنا 2400 byte تقريبًا، ومن 5 لـ 9 أقل من 150. والمعالج بيشتغل أكتر كل ما تطلع. عشان كده 5 نقطة توازن.

## ٥. [[gzip_types ...;]]

الأنواع اللي تتضغط **غير** text/html (اللي متضاف لوحده). الأسامي دي **MIME types**: الطريقة اللي HTTP بيقول بيها نوع الملف، وبتيجي في header [[Content-Type]]. Nginx بيعرف نوع كل ملف من امتداده (جدول [[mime.types]]).

| النوع | الملفات |
|---|---|
| [[text/plain]] | [[.txt]] |
| [[text/css]] | [[.css]] |
| [[text/javascript]] و [[application/javascript]] | [[.js]] (الاسمين، لأن السيرفرات المختلفة بتستخدم ده أو ده) |
| [[application/json]] | [[.json]] وردود الـ API |
| [[application/xml]] | [[.xml]] (sitemap مثلًا) |
| [[image/svg+xml]] | [[.svg]]: صورة بس نص من جوه، فبتتضغط كويس |

وماحطيناش [[image/png]] ولا [[image/jpeg]]: مضغوطين أصلًا.

---

## النتيجة: كل ملف اتعمل فيه إيه

[[curl -s -o /dev/null -w "size=%{size_download}"]] بيطبع عدد الـ bytes اللي اتنزلت فعلًا ([[-o /dev/null]] بيرمي المحتوى نفسه)، و [[curl -sI]] بيجيب الـ headers بس:

| الملف | الأصلي | اللي اتنزل | الـ headers |
|---|---|---|---|
| [[app.js]] | 10580 | 1462 | [[Content-Encoding: gzip]] و [[Vary: Accept-Encoding]] |
| [[data.json]] | 5381 | 951 | [[Content-Encoding: gzip]] |
| [[small.js]] | 15 | 15 | مفيش ضغط: أصغر من 1024 |
| [[photo.png]] | 5000 | 5000 | مفيش ضغط: مش في gzip_types |
| [[app.js]] من غير Accept-Encoding | 10580 | 10580 | مفيش ضغط |

([[app.js]] هنا ملف متكرر كتير، عشان كده اتضغط لسُبعه. الملف الحقيقي فوق اتضغط لتلته تقريبًا، وده الطبيعي في JS.)

### لو نسيت gzip_types

شلت السطر وعملت reload: [[app.js]] رجع [[Content-Length: 10580]] من غير [[Content-Encoding]]. الـ JS والـ CSS مش بيتضغطوا خالص، والصفحة الرئيسية (HTML) بس هي اللي بتتضغط، فممكن متاخدش بالك.

---

## الخلاصة

| السطر | ليه |
|---|---|
| [[gzip on]] | شغّل (HTML بس) |
| [[gzip_vary on]] | الكاش يحفظ نسخة لكل نوع |
| [[gzip_min_length 1024]] | سيب الصغير |
| [[gzip_comp_level 5]] | معظم المكسب بأقل معالج |
| [[gzip_types ...]] | ضيف CSS و JS و JSON و SVG |`,
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
          teach: R`## الفكرة: ملفات بتتحفظ سنة، وملف واحد بيتسأل عليه كل مرة

البلوكين دول بيتحطوا جوه [[server { }]] بتاع موقعك. جربتهم في كونتينر [[nginx:alpine]] في موقع فيه [[index.html]] و [[assets/app.a1b2c3.js]] وصورة اسمها [[Logo.PNG]] (بحروف كبيرة عن قصد)، وكل الطلبات بـ [[curl -sI]] (الـ headers بس).

~~~text جوه server { }
location ~* \.(js|css|woff2|png|jpg|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
    access_log off;
}

location = /index.html {
    add_header Cache-Control "no-cache";
}
~~~

---

## ١. [[location ~* \.(js|css|woff2|png|jpg|svg)$]]

ده location بـ **regex** (نمط بيوصف شكل نص). نفكّه:

| الحتة | معناها |
|---|---|
| [[~*]] | اللي بعدي regex، و [[*]] يعني مش فارق كبير وصغير |
| [[\.]] | نقطة فعلًا. النقطة لوحدها في regex معناها «أي حرف»، فالـ [[\]] بتخليها نقطة عادية |
| [[(js|css|...)]] | واحدة من دول. [[|]] معناها «أو» |
| [[$]] | وده آخر المسار |

يعني: «أي مسار آخره [[.js]] أو [[.css]] أو ... ». وبسبب [[*]] الصورة [[Logo.PNG]] اتمسكت هي كمان (جربتها). لو كتبت [[~]] من غير نجمة، [[.PNG]] كانت هتفلت.

## ٢. [[expires 1y;]]

قول للمتصفح «الملف ده صالح سنة» ([[1y]] = سنة، وفيه [[30d]] و [[12h]]). Nginx بيترجمها لـ headerين:

~~~text curl -sI http://127.0.0.1/assets/app.a1b2c3.js
HTTP/1.1 200 OK
Last-Modified: Tue, 06 Oct 2026 12:48:01 GMT
ETag: "6ac4ee01-2"
Expires: Wed, 06 Oct 2027 12:48:02 GMT
Cache-Control: max-age=31536000
Cache-Control: public, immutable
~~~

- [[Expires]]: تاريخ الانتهاء (الطلب كان 6 أكتوبر 2026، فالانتهاء 6 أكتوبر 2027). ده الـ header القديم.
- [[Cache-Control: max-age=31536000]]: نفس المعنى بالثواني (365 × 24 × 60 × 60 = 31536000). ده اللي المتصفحات الحديثة بتقراه.

## ٣. [[add_header Cache-Control "public, immutable";]]

[[add_header]] بيضيف header للرد. والقيمة فيها كلمتين:

- [[public]]: أي كاش يحفظه، حتى CDN في النص (مش المتصفح بس).
- [[immutable]]: «الملف ده عمره ما هيتغير»، فالمتصفح حتى لو عملت ريفريش مش بيسأل عليه.

وده آمن بس لأن اسم الملف فيه hash ([[a1b2c3]]) أداة الـ build بتغيّره كل ما المحتوى يتغير.

## ٤. [[access_log off;]]

متكتبش سطر في access.log للطلبات دي. اتأكدت: طلبت الـ JS و index.html، واللوج طلع فيه سطر index.html بس.

---

## ٥. [[location = /index.html]] و [[no-cache]]

[[=]] تطابق تام: المسار ده بالظبط. و [[no-cache]] اسمها مضلل: معناها **«احفظه بس اسألني قبل ما تستخدمه»**، مش «متحفظوش».

~~~text curl -sI http://127.0.0.1/index.html
HTTP/1.1 200 OK
Last-Modified: Tue, 06 Oct 2026 12:48:01 GMT
ETag: "6ac4ee01-d"
Cache-Control: no-cache
~~~

### «اسألني» بتحصل إزاي؟

[[ETag]] بصمة للملف. المتصفح بيحفظها، والمرة الجاية بيبعتها في [[If-None-Match]]. جربتها بإيدي:

~~~bash
curl -sI -H 'If-None-Match: "6ac4ee01-d"' http://127.0.0.1/index.html
~~~

~~~text الناتج
HTTP/1.1 304 Not Modified
~~~

[[304]] = «النسخة اللي عندك لسه هي هي، استخدمها». رد فاضي، رخيص جدًا. ولو عملت build جديد والملف اتغير، البصمة بتتغير والمتصفح بياخد الجديد.

### وطلب [[/]] نفسه؟

[[curl -sI http://127.0.0.1/]] طلع برضه [[Cache-Control: no-cache]]. ليه؟ لأن [[index]] بيحوّل [[/]] جوه Nginx لـ [[/index.html]]، والطلب ده بيدوّر على location من جديد فبيقع في [[location = /index.html]].

---

## الخلاصة

| الملف | الـ header | المتصفح بيعمل إيه |
|---|---|---|
| JS و CSS والصور (بـ hash) | [[max-age=31536000]] و [[immutable]] | ميسألش سنة |
| [[index.html]] | [[no-cache]] | يسأل كل مرة، وغالبًا ياخد [[304]] |
| ممنوع الحفظ خالص | [[no-store]] | (للصفحات الحساسة، مش هنا) |`,
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
          teach: R`## الفكرة: ٤ عناوين، وواحد بس رسمي

[[http://example.com]] و [[http://www.example.com]] و [[https://www.example.com]] و [[https://example.com]]: نفس الموقع بـ ٤ عناوين. المثال بيخلّي الأخير هو الرسمي، والتلاتة التانيين يحوّلوا ليه، وبعدين بيوري تحويل صفحة قديمة وقسم كامل.

### إزاي اتجرّب

كونتينر [[nginx:alpine]]، وشهادة self-signed (عملتها بـ openssl للدومينين، عشان بلوكات [[443 ssl]] لازم يبقى ليها شهادة). البلوكين التالت والرابع ([[location]]) حطيتهم جوه [[server]] بتاع [[https://example.com]]، لأن location لازم يكون جوه server. وكل الطلبات بـ:

~~~bash
curl -skI --resolve example.com:443:127.0.0.1 https://example.com/old-page
~~~

| الحتة | معناها |
|---|---|
| [[-s]] | من غير شريط التحميل |
| [[-k]] | اقبل الشهادة حتى لو self-signed (للتجربة بس) |
| [[-I]] | هات الـ headers بس |
| [[--resolve example.com:443:127.0.0.1]] | اعتبر example.com على بورت 443 هو 127.0.0.1، من غير DNS |

ولـ http كفاية [[-H "Host: ..."]] زي الدروس اللي فاتت. بس https محتاج [[--resolve]]، لأن اسم الدومين لازم يتبعت جوه الـ TLS نفسه (SNI) مش في header بس.

---

## البلوك الأول: كل http يروح https

~~~text
server {
    listen 80;
    server_name example.com www.example.com;
    return 301 https://example.com$request_uri;
}
~~~

### [[return 301 URL;]]

[[return]] بيرد فورًا، من غير ما يدوّر على ملفات ولا يكلّم تطبيق. و [[301]] = «Moved Permanently»: اتنقل على طول. وبيحط العنوان الجديد في header اسمه [[Location]]، والمتصفح بيروحله لوحده.

### [[$request_uri]]

متغير فيه المسار + الـ query string زي ما الزائر كتبهم بالظبط ([[/page?x=1]]). ومن غيره كل التحويلات هتروح الصفحة الرئيسية.

~~~text Host: example.com و http://127.0.0.1/page?x=1
HTTP/1.1 301 Moved Permanently
Location: https://example.com/page?x=1
~~~

~~~text Host: www.example.com و http://127.0.0.1/x
HTTP/1.1 301 Moved Permanently
Location: https://example.com/x
~~~

---

## البلوك التاني: https بالـ www يروح من غير www

~~~text
server {
    listen 443 ssl;
    server_name www.example.com;
    return 301 https://example.com$request_uri;
}
~~~

[[listen 443 ssl]]: بورت HTTPS، و [[ssl]] معناها الاتصال مشفّر. في الحقيقة هتحتاج سطرين [[ssl_certificate]] و [[ssl_certificate_key]] (certbot بيضيفهم)، وأنا ضفتهم في التجربة بالشهادة الـ self-signed.

~~~text https://www.example.com/x?a=1
HTTP/1.1 301 Moved Permanently
Location: https://example.com/x?a=1
~~~

ومتابعة التحويلات لآخرها بـ [[curl -L]] من [[http://www.example.com/index.html]] وصلت [[https://example.com/index.html]] بعد تحويل **واحد** بس، لأن البلوك الأول بيبعت http على طول للعنوان النهائي (مش https بالـ www الأول).

---

## البلوك التالت: صفحة واحدة اتنقلت

~~~text
location = /old-page {
    return 301 /new-page;
}
~~~

[[=]] يعني المسار ده بالظبط. والعنوان هنا من غير دومين، و Nginx بيكمّله بنفس الدومين والبروتوكول:

~~~text https://example.com/old-page
HTTP/1.1 301 Moved Permanently
Location: https://example.com/new-page
~~~

وعشان [[=]] بالظبط: [[/old-page/]] (بشرطة في الآخر) ماتحوّلش وطلع [[404]].

---

## البلوك الرابع: قسم كامل لدومين تاني

~~~text
location /blog/ {
    return 301 https://blog.example.com$request_uri;
}
~~~

من غير [[=]]: أي مسار أوله [[/blog/]]. و [[$request_uri]] بينقل المسار كامل:

~~~text https://example.com/blog/post-1?ref=tw
HTTP/1.1 301 Moved Permanently
Location: https://blog.example.com/blog/post-1?ref=tw
~~~

خد بالك إن [[/blog/]] فضلت في المسار الجديد. لو المدونة الجديدة مسارتها من غير [[/blog/]]، محتاج rewrite أو تخلي المدونة نفسها تقبل [[/blog/]].

---

## الخلاصة: أكواد التحويل

| الكود | معناه | المتصفح |
|---|---|---|
| [[301]] | اتنقل للأبد | بيحفظه، وجوجل بينقل الترتيب |
| [[302]] | مؤقت | بيسأل كل مرة |
| [[308]] | زي 301 | بس POST بيفضل POST |
| [[307]] | زي 302 | بس POST بيفضل POST |

ولأن المتصفح بيحفظ الـ 301، اختبر بـ curl أو نافذة خاصة، مش في نفس المتصفح بعد كل تعديل.`,
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
          teach: R`## الفكرة: Nginx بيختار البلوك من اسم الدومين

سيرفر واحد، و IP واحد، و ٣ server blocks. لما الطلب يوصل، Nginx بيبص على البورت، وبعدين على الدومين اللي الزائر طلبه، ويختار البلوك. المثال فيه بلوك «مش معروف» بيقفل الباب، وموقعين.

### إزاي اتجرّب

كونتينر [[nginx:alpine]]، وشهادة self-signed لبلوكات 443 (في الحقيقة certbot بيضيف سطري [[ssl_certificate]] لكل موقع). موقع [[shop]] بيعمل proxy لكونتينر التطبيق [[ngx01-be:3000]] بدل [[127.0.0.1:4000]]. والطلبات بـ curl من جوه الكونتينر، و [[--resolve]] لـ https (درس redirects).

---

## البلوك الأول: الباب المقفول

~~~text
server {
    listen 80 default_server;
    listen 443 ssl default_server;
    server_name _;
    ssl_reject_handshake on;
    return 444;
}
~~~

### [[listen 80 default_server;]] و [[listen 443 ssl default_server;]]

[[default_server]] = «لو مفيش بلوك اسمه مطابق على البورت ده، أنا اللي أرد». واحد بس مسموح لكل بورت. جربت أضيف بلوك تاني فيه [[default_server]] على 80:

~~~text nginx -t
[emerg] a duplicate default server for 0.0.0.0:80 in /etc/nginx/sites-enabled/dup:1
~~~

وده بالظبط اللي بيحصل لو ملف [[default]] بتاع أوبونتو لسه متفعّل.

### [[server_name _;]]

[[_]] مجرد اسم مستحيل يبقى دومين حقيقي، فالبلوك ده عمره ما هيتختار بالاسم. بيتختار بس بسبب [[default_server]].

### [[ssl_reject_handshake on;]]

في HTTPS، اسم الدومين بيتبعت في أول رسالة TLS (اسمها SNI). السطر ده بيقول: لو الاسم مش معروف، ارفض الـ TLS من الأول. فالبلوك ده مش محتاج شهادة خالص، ومحدش يعرف دوميناتك من شهادتها.

### [[return 444;]]

444 مش كود HTTP حقيقي. ده رقم خاص بـ Nginx معناه «اقفل الاتصال وماتردّش بأي حاجة».

---

## البلوكين التانيين: المواقع

~~~text
server {
    listen 443 ssl;
    server_name example.com;
    root /var/www/example.com;
}

server {
    listen 443 ssl;
    server_name shop.example.com;
    location / { proxy_pass http://127.0.0.1:4000; }
}
~~~

نفس البورت (443)، والفرق [[server_name]]: الأول موقع static، والتاني proxy لتطبيق على بورت تاني. والـ location مكتوب في سطر واحد: Nginx مش فارق معاه السطور، الـ [[;]] والأقواس هما اللي بيقسموا.

---

## النتيجة: كل طلب راح فين

| الطلب | النتيجة | ليه |
|---|---|---|
| [[http://127.0.0.1]] (بالـ IP) | [[curl: (52) Empty reply from server]] | مفيش اسم، فالـ default رد بـ 444 |
| http بـ Host example.com | نفس الـ 52 | مفيش بلوك لـ example.com على 80 أصلًا، فالـ default خده |
| [[https://127.0.0.1]] | [[curl: (35) ... tlsv1 unrecognized name]] | [[ssl_reject_handshake]] رفض الـ TLS |
| [[https://evil.test]] على نفس الـ IP | نفس الـ 35 | دومين حد تاني شاوره على سيرفرك: مش هيظهر موقعك |
| [[https://example.com]] | [[HTTP/1.1 200 OK]] | البلوك التاني |
| [[https://shop.example.com/cart]] | رد التطبيق: [[{"url":"/cart",...}]] | البلوك التالت |

[[(52)]] و [[(35)]] أرقام أخطاء curl نفسه (exit code)، مش أكواد HTTP: 52 = الاتصال اتقفل من غير رد، و 35 = الـ TLS فشل.

سطر «http بـ Host example.com» مهم: الموقع على 443 بس، فأي حد يكتب [[http://example.com]] هياخد قفلة. على سيرفر حقيقي لازم بلوك 80 بيحوّل لـ https (درس redirects).

---

## الخلاصة: Nginx بيختار إزاي

1. البلوكات اللي [[listen]] بتاعها على نفس البورت بس.
2. منهم: اللي [[server_name]] بتاعه يطابق الدومين بالظبط.
3. وإلا wildcard زي [[*.example.com]]، وبعدين regex.
4. وإلا الـ [[default_server]] (ولو مفيش، أول بلوك اتقرا).`,
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
          teach: R`## الفكرة: كل طلب بياخده location واحد بس

جوه server واحد ممكن يبقى عندك ١٠ locations، والطلب الواحد بيروح لواحد منهم بس. الدرس ده عن القاعدة اللي Nginx بيختار بيها، وهي **مش** «الأول في الملف».

### إزاي اتجرّب

حطيت الـ ٥ بلوكات جوه server في كونتينر [[nginx:alpine]]، و [[/api/]] بيروح لكونتينر التطبيق. وعشان أشوف بعيني مين أخد الطلب، ضفت في كل بلوك سطر علامة:

~~~text العلامة (مش جزء من الدرس)
add_header X-Loc "prefix ^~ /static/";
~~~

وكل بلوك بعلامته. فالرد بيقولي في header [[X-Loc]] مين اللي رد.

---

## الأنواع الأربعة

| الشكل | اسمه | بيطابق |
|---|---|---|
| [[location = /health]] | exact | المسار ده بالظبط وبس |
| [[location ^~ /static/]] | prefix بأولوية | أي مسار **أوله** [[/static/]]، ولو كسب يمنع الـ regex |
| [[location ~* \.(png|jpg)$]] | regex | أي مسار يطابق النمط ([[~]] حساس للحروف، [[~*]] لأ) |
| [[location /api/]] و [[location /]] | prefix عادي | أي مسار أوله كده |

## الترتيب اللي Nginx بيمشي بيه

1. فيه [[=]] مطابق؟ خلاص، هو.
2. دوّر على **أطول** prefix مطابق (عادي أو [[^~]]). لو الأطول ده عليه [[^~]]، خلاص، هو.
3. جرّب الـ regex **بالترتيب في الملف**. أول واحد يطابق يكسب.
4. مفيش regex طابق؟ أطول prefix من خطوة ٢.

---

## البلوكات واحد واحد

### [[location = /health { return 200 "ok"; }]]

بيرد [[ok]] فورًا من غير ملفات ولا تطبيق. مكان مثالي لفحص «السيرفر صاحي؟». ولاحظت إن نوع الرد طلع [[Content-Type: application/octet-stream]] (النوع الافتراضي)، فالمتصفح ممكن ينزّله كملف بدل ما يعرضه. curl و أدوات المراقبة مش فارق معاهم، ولو عايزه نص اكتب [[default_type text/plain;]] جوه البلوك.

### [[location ^~ /static/ { root /www; }]]

[[root]] جوه location: المسار كله بيتلزق في الآخر، فـ [[/static/logo.png]] = [[/www/static/logo.png]]. (المثال الأصلي [[/var/www]]، ونفس الفكرة.)

### [[location ~* \.(png|jpg)$ { expires 30d; }]]

أي مسار آخره [[.png]] أو [[.jpg]] (بأي حروف)، وبيتحفظ في المتصفح ٣٠ يوم ([[30d]]).

### [[location /api/]] و [[location /]]

[[/api/]] للتطبيق، و [[/]] لكل حاجة تانية (SPA). [[/]] أقصر prefix ممكن، فبياخد بس اللي محدش تاني أخده.

---

## النتيجة: ٧ طلبات

| الطلب | مين أخده | ليه |
|---|---|---|
| [[/health]] | [[=]] | تطابق تام، الخطوة ١ |
| [[/health/x]] | [[/]] (رجع index.html) | [[=]] بالظبط بس، و [[/health/x]] مش بالظبط |
| [[/static/logo.png]] | [[^~ /static/]] | أطول prefix وعليه [[^~]]، فالـ regex اتلغى |
| [[/img/cat.jpg]] | regex الصور، ومعاه [[Expires]] | الـ prefix الوحيد [[/]]، والـ regex طابق |
| [[/api/users]] | [[/api/]] (رد التطبيق) | [[/api/]] أطول من [[/]]، ومفيش regex طابق |
| [[/api/logo.png]] | **regex الصور** ورجع [[404]] | الـ regex بيكسب على prefix عادي |
| [[/dashboard]] | [[/]] | محدش غيره |

### بعد ما شلت [[^~]]

غيّرت [[location ^~ /static/]] لـ [[location /static/]] وعملت reload. [[/static/logo.png]] طلع:

~~~text الناتج
X-Loc: regex png|jpg
Expires: ...
~~~

الـ prefix لسه الأطول، بس من غير [[^~]] Nginx كمّل للخطوة ٣ والـ regex كسب.

### سطر [[/api/logo.png]]: الفخ الحقيقي

طلب رايح للـ API، بس آخره [[.png]]، فالـ regex خطفه ودوّر على ملف [[/www/api/logo.png]] ومالقاهوش. التطبيق ماشافش الطلب أصلًا. الحل: [[location ^~ /api/]]، فيبقى زي [[/static/]].

---

## الخلاصة

| عايز | استخدم |
|---|---|
| مسار واحد بالظبط ([[/health]] و [[/favicon.ico]]) | [[=]] |
| فولدر لازم يتخدم من مكانه مهما كان الامتداد | [[^~]] |
| امتدادات معينة في كل الموقع | [[~*]] |
| الباقي | [[/]] |

والترتيب في الملف بيفرق **بين الـ regex بس**. الـ prefixes بيكسب الأطول مهما كان مكانه.`,
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
          teach: R`## الفكرة: فولدر جوه SPA بيتعامل كملفات حقيقية

الـ SPA بترجّع index.html لأي حاجة مش موجودة (درس SPA). ده كويس للصفحات، وغلط لفولدر تحميلات. البلوك ده بيعزل [[/downloads/]] بقواعده هو.

### إزاي اتجرّب

كونتينر [[nginx:alpine]]، فيه server بـ ٣ locations: بلوك كاش regex لـ [[.js]] و [[.css]] و [[.json]] (زي اللي في أي موقع حقيقي)، وبلوك المثال، و [[location /]] بتاع الـ SPA. وفي [[/downloads/]] ٣ ملفات: [[app.apk]] و [[version.json]] و [[notes.pdf]]. وجربت ٣ نسخ: من غير البلوك، وبالبلوك من غير [[^~]]، وبالبلوك كامل.

~~~text جوه server { }
location ^~ /downloads/ {
    types { application/vnd.android.package-archive apk; application/zip zip; application/json json; }
    default_type application/octet-stream;
    add_header Cache-Control "no-cache, must-revalidate";
    try_files $uri =404;
}
location / { try_files $uri $uri/ /index.html; }
~~~

---

## ١. [[location ^~ /downloads/]]

أي مسار أوله [[/downloads/]]. و [[^~]]: «لو أنا أطول prefix، متجرّبش أي regex» (درس location matching). ليه مهمة هنا؟ من غيرها، [[version.json]] طابق بلوك الكاش:

~~~text /downloads/version.json من غير ^~
HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: max-age=31536000
X-Loc: regex cache
~~~

يعني اتحفظ في المتصفح **سنة**. ترفع نسخة جديدة من التطبيق، والموبايلات مش هتشوفها.

## ٢. [[types { ... }]]

جدول «امتداد ← نوع» للبلوك ده بس. كل سطر جواه: النوع وبعده الامتدادات، و [[;]] في الآخر.

| النوع | الامتداد |
|---|---|
| [[application/vnd.android.package-archive]] | [[apk]]: أندرويد بيعرف إنه تطبيق يتسطّب |
| [[application/zip]] | [[zip]] |
| [[application/json]] | [[json]] |

الأهم: [[types]] جوه location **بيستبدل** الجدول الأصلي ([[mime.types]]) مش بيضيف عليه. اتأكدت بـ [[notes.pdf]]:

| | [[notes.pdf]] |
|---|---|
| من غير البلوك | [[Content-Type: application/pdf]] (من الجدول الأصلي) |
| جوه البلوك | [[Content-Type: application/octet-stream]] (الـ pdf مش في الجدول الجديد) |

## ٣. [[default_type application/octet-stream;]]

النوع لأي امتداد مش في الجدول. [[octet-stream]] = «bytes وخلاص»، والمتصفح بيعتبره ملف للتحميل. وده اللي حصل للـ pdf فوق.

## ٤. [[add_header Cache-Control "no-cache, must-revalidate";]]

[[no-cache]]: احفظ بس اسأل السيرفر قبل كل استخدام (درس كاش الملفات الثابتة). [[must-revalidate]]: ولو مقدرتش تسأل (السيرفر واقع)، متستخدمش النسخة القديمة. فأول ما ترفع APK جديد بنفس الاسم، الكل ياخده.

## ٥. [[try_files $uri =404;]]

الملف لو موجود، وإلا [[404]]. مفيش [[/index.html]] في الآخر، وده كل الفرق.

## ٦. [[location / { try_files $uri $uri/ /index.html; }]]

باقي الموقع SPA عادي، في سطر واحد.

---

## النتيجة

| الطلب | من غير البلوك | بالبلوك كامل |
|---|---|---|
| [[app.apk]] | [[200]] و [[application/octet-stream]] | [[200]] و [[application/vnd.android.package-archive]] |
| [[nope.apk]] (مش موجود) | [[200]] و [[text/html]] (index.html!) | [[404 Not Found]] |
| [[version.json]] | [[max-age=31536000]] (من بلوك الكاش) | [[no-cache, must-revalidate]] |

سطر [[nope.apk]] هو المشكلة كلها: من غير البلوك الموبايل هينزّل صفحة HTML باسم [[nope.apk]] ويقول «الملف بايظ»، واللوج مفيهوش أي 404 يلفت نظرك.

---

## الخلاصة

| السطر | بيحل |
|---|---|
| [[^~]] | بلوك regex تاني يخطف ملفات الفولدر |
| [[types]] و [[default_type]] | كل ملف بنوعه الصح (واكتب كل الأنواع، الجدول بيتستبدل) |
| [[no-cache, must-revalidate]] | النسخة الجديدة توصل فورًا |
| [[try_files $uri =404]] | ملف ناقص يبقى 404 حقيقي مش index.html |`,
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
          teach: R`## الفكرة: عدّاد لكل IP، و Nginx يقفل اللي يزوّدها

المثال جزئين: ٣ سطور بتعرّف «عدّادات» (zones) جوه [[http]]، وبعدين locations بتستخدمها. جربته في كونتينر [[nginx:alpine]]: السطور التلاتة وبلوك server في ملف واحد في [[conf.d/]] (اللي بيتسحب جوه http)، و [[proxy_pass]] لكونتينر التطبيق [[ngx01-be:3000]].

~~~text conf.d/site.conf
limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
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
}
~~~

---

## ١. [[limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;]]

| الحتة | معناها |
|---|---|
| [[limit_req_zone]] | اعمل عدّاد طلبات |
| [[$binary_remote_addr]] | العدّ بيبقى لكل IP لوحده. [[binary]] = الـ IP متخزن كـ bytes (4 لـ IPv4) بدل نص، فبياخد مساحة أقل |
| [[zone=api:10m]] | اسم العدّاد [[api]]، وحجزله ١٠ ميجا في الذاكرة (حوالي ١٦٠ ألف IP) |
| [[rate=10r/s]] | المسموح ١٠ طلبات في الثانية ([[r/s]] = requests per second) |

والسطر التاني نفس الكلام، اسمه [[login]] ومعدّله [[5r/m]] = ٥ في **الدقيقة**، يعني طلب كل ١٢ ثانية.

## ٢. [[limit_conn_zone $binary_remote_addr zone=perip:10m;]]

نوع تاني: مش بيعد طلبات في الثانية، بيعد **اتصالات مفتوحة في نفس اللحظة** من كل IP.

---

## ٣. جوه [[location /api/]]

### [[limit_req zone=api burst=20 nodelay;]]

- [[zone=api]]: استخدم عدّاد api.
- [[burst=20]]: اسمح بـ ٢٠ طلب زيادة عن المعدل كدفعة (صفحة بتفتح وبتعمل ١٥ طلب مرة واحدة عادي).
- [[nodelay]]: الدفعة دي تتخدم فورًا.

بعت ٣٠ طلب ورا بعض بأسرع ما curl يقدر:

~~~text الناتج
200 200 200 200 200 200 200 200 200 200 200 200 200 200 200 200 200 200 200 200 200 200 503 503 503 503 503 503 503 503
~~~

٢٢ نجحوا: واحد عادي + الـ burst (٢٠) + واحد كمان اتسمح بيه لأن الوقت عدى شوية والعدّاد نزل. والباقي [[503]]، وده الكود الافتراضي للرفض. والرفض فوري (كل واحد خد ربع ملّي ثانية)، فالتطبيق ماشافهمش أصلًا. وفي error.log:

~~~text error.log
[error] limiting requests, excess: 20.790 by zone "api", client: 127.0.0.1, ... request: "GET /api/x HTTP/1.1"
~~~

[[excess: 20.790]] = قد إيه الـ IP ده عدّى المعدل، والـ burst كان ٢٠، فاترفض.

### من غير [[nodelay]]؟

شلتها وجربت ٦ طلبات ورا بعض، وطبعت وقت كل واحد بـ [[%{time_total}]]:

~~~text الناتج
200 0.001061
200 0.096475
200 0.094364
200 0.096374
...
~~~

كلهم نجحوا، بس كل واحد بعد الأول استنى حوالي 0.1 ثانية: Nginx بيأخّرهم عشان يمشّيهم بالمعدل بالظبط (١٠ في الثانية = واحد كل 0.1). [[nodelay]] بيلغي التأخير ده.

### [[limit_conn perip 20;]]

أقصى ٢٠ اتصال مفتوح من نفس الـ IP في نفس الوقت. ضد اللي بيفتح مئات الاتصالات ويسيبها معلّقة.

---

## ٤. جوه [[location /api/login]]

[[/api/login]] أطول من [[/api/]]، فطلبات الـ login بتروح هنا (وعدّاد api مش بيتطبق عليها، لأن كل طلب بياخده location واحد).

- [[limit_req zone=login burst=3 nodelay;]]: المعدل ٥ في الدقيقة، ودفعة ٣.
- [[limit_req_status 429;]]: رد بـ [[429 Too Many Requests]] بدل 503. ده الكود الصح لـ «انت بتطلب كتير»، و 503 معناها «السيرفر نفسه مش متاح».

~~~text ٨ طلبات ورا بعض
200 200 200 200 429 429 429 429
~~~

٤ نجحوا (واحد + burst 3) والباقي 429. ولما استنيت ١٣ ثانية، الطلب الجاي نجح: العدّاد بيفضى بمعدل واحد كل ١٢ ثانية.

---

## الخلاصة

| الإعداد | المعنى |
|---|---|
| [[rate=10r/s]] | المعدل الطبيعي |
| [[burst=20]] | دفعة مسموحة فوق المعدل |
| [[nodelay]] | الدفعة فورًا بدل ما تتأخر |
| اللي فوق الـ burst | [[503]]، أو أي كود تختاره بـ [[limit_req_status]] |
| [[limit_conn]] | اتصالات متزامنة، مش طلبات في الثانية |`,
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
          teach: R`## الفكرة: سطور بتقول للمتصفح «احميني»

كل [[add_header]] هنا بيحط header في الرد، والمتصفح بيقراه ويقفل باب هجوم معين. Nginx نفسه مش بيحمي حاجة؛ هو بس بيوصّل التعليمات للمتصفح.

### إزاي اتجرّب

كونتينر [[nginx:alpine]]: الـ ٦ سطور بتوع [[add_header]] في ملف snippet، و [[server_tokens off]] و [[include]] للملف ده جوه server. وطلبت بـ [[curl -sI]] صفحة موجودة، وصفحة مش موجودة، وملف من location فيه [[add_header]] خاص بيه.

~~~text snippets/security.conf
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "DENY" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
add_header Content-Security-Policy "default-src 'self'; img-src 'self' data: https:; script-src 'self'" always;
~~~

---

## ١. [[server_tokens off;]]

على أوبونتو من غيره:

~~~text الناتج
Server: nginx/1.24.0 (Ubuntu)
<hr><center>nginx/1.24.0 (Ubuntu)</center>     (في صفحة الـ 404)
~~~

ومعاه: [[Server: nginx]] بس، من غير رقم. اللي بيدوّر على سيرفرات بنسخة فيها ثغرة معروفة مش هيعرف نسختك من أول طلب.

## ٢. الشكل العام: [[add_header NAME "VALUE" always;]]

اسم الـ header، وقيمته بين علامتين تنصيص (لأن فيها مسافات و [[;]])، و [[always]].

### [[always]] بتعمل إيه؟

من غيرها، Nginx بيضيف الـ header على الردود الناجحة بس (200 و 301 و 304 وأمثالهم). جربت أشيلها: صفحة [[/]] طلع فيها الـ headers، وصفحة [[/nope]] (404) طلعت من غيرهم خالص. ومعاها بيظهروا على كل رد، حتى صفحات الخطأ.

---

## ٣. الـ headers الستة

| الـ header | القيمة | بيمنع إيه |
|---|---|---|
| [[X-Content-Type-Options]] | [[nosniff]] | المتصفح يخمّن نوع ملف غير اللي السيرفر قاله (ملف «صورة» يتنفذ كسكربت) |
| [[X-Frame-Options]] | [[DENY]] | موقع تاني يحط موقعك جوه [[iframe]] ويخدع الناس يدوسوا على زرار (clickjacking) |
| [[Referrer-Policy]] | [[strict-origin-when-cross-origin]] | لما الزائر يروح موقع تاني، يتبعتله الدومين بس، مش المسار الكامل اللي ممكن يكون فيه بيانات |
| [[Permissions-Policy]] | [[camera=()]] ... | أي سكربت في الصفحة يطلب الكاميرا أو الميكروفون أو الموقع. [[()]] فاضية = محدش مسموحله |
| [[Strict-Transport-Security]] | [[max-age=31536000; includeSubDomains]] | المتصفح يفتح موقعك بـ http تاني لمدة سنة (HSTS)، ومعاه كل الـ subdomains |
| [[Content-Security-Policy]] | تحت | تحميل سكربتات أو محتوى من أماكن مش مسموحة |

### الـ CSP حتة حتة

[[default-src 'self'; img-src 'self' data: https:; script-src 'self']]: ٣ قواعد مفصولة بـ [[;]]:

| القاعدة | معناها |
|---|---|
| [[default-src 'self']] | أي نوع مش مذكور: من نفس الدومين بس |
| [[img-src 'self' data: https:]] | الصور: من الدومين، أو مكتوبة جوه الصفحة ([[data:]])، أو من أي موقع https |
| [[script-src 'self']] | السكربتات: من الدومين بس، فأي [[<script>]] حد زرعه من موقع تاني مش هيشتغل |

[['self']] بين علامتين صغار لأنها كلمة محجوزة، مش اسم دومين.

### الناتج

~~~text curl -sI http://127.0.0.1/nope
HTTP/1.1 404 Not Found
Server: nginx
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: default-src 'self'; img-src 'self' data: https:; script-src 'self'
~~~

حتى على 404، بسبب [[always]].

---

## ٤. الفخ: [[add_header]] في location

ضفت location فيه سطر واحد:

~~~text
location /assets/ {
    add_header Cache-Control "public";
}
~~~

~~~text curl -sI http://127.0.0.1/assets/app.a1b2c3.js
HTTP/1.1 200 OK
Server: nginx
Cache-Control: public
~~~

الستة **اختفوا**. القاعدة: لو location فيه أي [[add_header]]، مش بيورث ولا واحد من اللي فوقه. والحل اللي جربته: [[include]] للـ snippet جوه الـ location كمان، فطلع [[Cache-Control]] والستة مع بعض.

---

## الخلاصة

| الخطوة | ليه |
|---|---|
| الـ headers في snippet واحد | تكتبهم مرة |
| [[include]] في كل server | كل المواقع |
| و [[include]] في كل location فيه [[add_header]] | وإلا بيختفوا |
| [[always]] | يظهروا على صفحات الخطأ كمان |
| [[server_tokens off]] | من غير رقم النسخة |`,
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
          teach: R`## الفكرة: حدود عامة صغيرة، واستثناءات للمسارات اللي محتاجاها

٣ سطور عامة في server، وبعدين مسارين كل واحد بيكسر حد واحد بس. جربتهم في كونتينر [[nginx:alpine]] قدام تطبيق Node صغير ([[ngx01-be]]) بيرد بعدد الـ bytes اللي وصلته، وفيه مسار بيستنى ٣ ثواني قبل ما يرد. والملفات اللي برفعها عملتها بـ [[head -c 2000000 /dev/zero > /tmp/2m]] (ملف ٢ مليون byte كله أصفار).

~~~text جوه server { }
client_max_body_size 20m;
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
}
~~~

---

## ١. [[client_max_body_size 20m;]]

أقصى حجم لـ **body** الطلب (الملف المرفوع، أو JSON مبعوت في POST). [[m]] = ميجا، والافتراضي [[1m]]. رفعت بـ [[curl --data-binary @/tmp/2m]] ([[--data-binary]] = ابعت الملف ده كـ body زي ما هو، و [[@]] معناها «من ملف»):

| الحد | الملف | النتيجة |
|---|---|---|
| الافتراضي (1m) | 2MB | [[413 Request Entity Too Large]]، والتطبيق ماشافش حاجة |
| [[20m]] | 2MB | التطبيق رد [[bodyBytes: 2000000]] |
| [[20m]] | 30MB | [[413]] |

وفي error.log:

~~~text error.log
[error] client intended to send too large body: 2000000 bytes, client: 127.0.0.1, ... request: "POST /default/x HTTP/1.1"
~~~

## ٢. [[client_body_timeout 30s;]] و [[send_timeout 30s;]]

مهل مع **الزائر** نفسه:

- [[client_body_timeout]]: لو الزائر بيبعت الـ body وسكت ٣٠ ثانية بين حتة والتانية، اقفل (الافتراضي 60s).
- [[send_timeout]]: لو بنبعتله الرد وهو مش بيستلم ٣٠ ثانية، اقفل.

دول ضد هجوم اسمه Slowloris: حد يفتح اتصالات كتير ويبعت ببطء شديد عشان يحجز السيرفر. (المهلتين دول ماجربتهمش بهجوم، الأرقام والمعنى من توثيق Nginx.)

---

## ٣. [[location /api/upload]]

### [[client_max_body_size 200m;]]

جوه location بيكسب على اللي في server. رفعت ٣٠ ميجا على [[/api/upload]] ووصلوا ([[bodyBytes: 30000000]])، ونفس الملف على أي مسار تاني رجع 413.

### [[proxy_request_buffering off;]]

افتراضيًا Nginx بيستلم الـ body **كله** الأول، ولو كبير بيكتبه في ملف مؤقت على الديسك، وبعدين يبعته للتطبيق. ده ظهر في اللوج مع ملف الـ ٢ ميجا على مسار عادي:

~~~text error.log
[warn] a client request body is buffered to a temporary file /var/cache/nginx/client_temp/0000000001
~~~

مع [[off]] بيعدّي الـ body للتطبيق وهو بيوصل، ورفع الـ ٣٠ ميجا على [[/api/upload]] مكتبش أي ملف مؤقت. ده أوفر في الديسك، والتطبيق يبدأ يشتغل بدري.

---

## ٤. [[location /api/reports]] و [[proxy_read_timeout 300s;]]

قد إيه Nginx يستنى رد من التطبيق (بين كل حتة والتانية من الرد). الافتراضي 60s، ولو عدّاها: [[504 Gateway Time-out]]. جربت على المسار البطيء (٣ ثواني):

| [[proxy_read_timeout]] | النتيجة |
|---|---|
| [[1s]] | [[504 Gateway Time-out]] بعد 1.0 ثانية بالظبط |
| [[300s]] | [[200]] و [[slow done]] بعد 3.0 ثانية |

~~~text error.log مع 1s
[error] upstream timed out (110: Operation timed out) while reading response header from upstream
~~~

---

## الخلاصة

| الكود | السبب | الإعداد |
|---|---|---|
| [[413]] | الـ body أكبر من المسموح | [[client_max_body_size]] |
| [[504]] | التطبيق اتأخر في الرد | [[proxy_read_timeout]] |
| (اتصال اتقفل) | الزائر بطيء جدًا | [[client_body_timeout]] و [[send_timeout]] |

وكل الحدود الكبيرة جوه location المسار اللي محتاجها بس.`,
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
          teach: R`## الفكرة: الـ headers بتاعة الرد مش لاقية مكان

لما التطبيق يرد، Nginx بيقرا أول جزء من الرد (سطر الـ status وكل الـ headers) في مساحة ذاكرة محجوزة اسمها **buffer**. لو الـ headers أكبر من المساحة دي، Nginx بيرمي الرد ويرجّع للزائر [[502 Bad Gateway]]، مع إن التطبيق رد عادي.

### إزاي اتجرّب

كونتينر [[nginx:alpine]] قدام تطبيق Node صغير، فيه مسار [[/bigcookie]] بيرد بـ [[Set-Cookie]] مرتين، كل كوكي ٣٠٠٠ حرف (زي كوكيز Supabase اللي فيها JWT متقسم). عملت موقعين: واحد بـ [[proxy_pass]] لوحده، وواحد بالمثال:

~~~text جوه server { }
location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_buffer_size 128k;
    proxy_buffers 4 256k;
    proxy_busy_buffers_size 256k;
}
~~~

(في التجربة [[proxy_pass http://ngx01-be:3000]]، كونتينر التطبيق.)

---

## ١. من غير الإعداد: 502

~~~bash
curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1/bigcookie
~~~

~~~text الناتج
502
~~~

وفي error.log:

~~~text error.log
[error] upstream sent too big header while reading response header from upstream, ... request: "GET /bigcookie HTTP/1.1"
~~~

**upstream** = التطبيق اللي ورا Nginx. يعني «التطبيق بعت headers أكبر من اللي أقدر أقراه».

### الحجم الافتراضي كام؟

[[proxy_buffer_size]] افتراضيًا = صفحة ذاكرة واحدة. [[getconf PAGESIZE]] في الكونتينر طبع [[4096]]، يعني ٤ كيلو. وحجم الـ headers في الرد ده (اتقاس تحت) ٦١٩٣ byte. ٦ كيلو مش هيدخلوا في ٤.

---

## ٢. السطور واحد واحد

### [[proxy_buffer_size 128k;]]

الـ buffer اللي بيتقري فيه أول الرد: الـ status والـ headers. ١٢٨ كيلو بدل ٤، فأي headers معقولة هتدخل.

### [[proxy_buffers 4 256k;]]

عدد وحجم الـ buffers لـ **باقي** الرد (الـ body): ٤ قطع، كل واحدة ٢٥٦ كيلو. Nginx بيملاهم من التطبيق ويفضّيهم للزائر.

### [[proxy_busy_buffers_size 256k;]]

أقصى حجم من الـ buffers ممكن يكون «مشغول» بيتبعت للزائر وهو لسه بيقرا الباقي من التطبيق. وليه شرط: لازم يبقى أقل من مجموع [[proxy_buffers]] ناقص buffer واحد. جربت أكتب [[proxy_buffer_size 128k]] لوحده من غير السطرين التانيين (فـ [[proxy_buffers]] فضلت على الافتراضي الصغير):

~~~text nginx -t
[emerg] "proxy_busy_buffers_size" must be less than the size of all "proxy_buffers" minus one buffer
~~~

عشان كده السطور التلاتة بييجوا مع بعض. في المثال: المجموع 4 × 256k = 1024k، ناقص buffer واحد = 768k، و 256k أقل منها. تمام.

---

## ٣. بعد الإعداد: 200

~~~bash
curl -s -o /dev/null -D /tmp/h -w "%{http_code} header_bytes=%{size_header}\n" http://127.0.0.1:81/bigcookie
~~~

| الحتة | معناها |
|---|---|
| [[-D /tmp/h]] | احفظ الـ headers في ملف |
| [[%{size_header}]] | حجم الـ headers بالـ byte |

~~~text الناتج
200 header_bytes=6193
~~~

والملف [[/tmp/h]] فيه [[Set-Cookie]] مرتين، يعني الكوكيز وصلت للزائر كاملة.

---

## الخلاصة

| | من غير | مع |
|---|---|---|
| مكان الـ headers | 4k | 128k |
| رد headers بتاعه 6193 byte | [[502]] و [[too big header]] في اللوج | [[200]] |
| فين تحطهم | | location التطبيق اللي فيه الـ login، مش http كله |

والاتجاه العكسي (المتصفح هو اللي باعت كوكيز كبيرة) بيطلع [[400 Request Header Or Cookie Too Large]]، وحله [[large_client_header_buffers]]، مش السطور دي.`,
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
]);
