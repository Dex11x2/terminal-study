// تكملة تاب nginx: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/nginx/01.js (شرح حقول الدرس في أوله)
MORE("nginx", [
    {
      t: "أدوات الكونفيج: map و auth_request وصفحات الأخطاء",
      l: 2,
      n: "متغيرات محسوبة بدل if، وحماية مسارات بخدمة login بتاعتك، وصفحات خطأ بشكلك بدل صفحة Nginx",
      items: [
        {
          cmd: "map",
          title: "جدول بدل if: redirects ولوج وقرارات",
          desc: R`[[map]] بيعمل متغير جديد قيمته بتتحدد من متغير تاني بجدول. بيه تعمل جدول redirects (مئات الروابط القديمة)، ولوج للأخطاء بس، وتعرف البوتات، من غير سلسلة [[if]].`,
          example: R`map $uri $redirect_to {
    default            "";
    /old-about         /about;
    /blog/2023         /blog;
    ~^/p/(?<id>\d+)$   /products/$id;
}

map $status $loggable {
    ~^[23]   0;
    default  1;
}

map $http_user_agent $is_bot {
    default                  0;
    ~*(bot|crawler|spider)   1;
}

server {
    listen 80;
    access_log /var/log/nginx/errors-only.log combined if=$loggable;
    if ($redirect_to) {
        return 301 $redirect_to;
    }
    location / {
        add_header X-Bot $is_bot always;
        return 200 "ok\n";
    }
}`,
          flag: "script",
          try: R`اطلب [[/old-about]] و [[/p/42]] و [[/p/abc]] بـ [[curl -s -o /dev/null -w "%{http_code} %header{location}\n"]]. واطلب [[/]] بـ [[-A "Googlebot/2.1"]] وبص على [[X-Bot]]. وبعدين اطلب صفحة مش موجودة وبص على اللوج.`,
          deep: {
            why: R`نقلت الموقع لروابط جديدة وعندك ٣٠٠ رابط قديم في جوجل. ٣٠٠ [[location]] أو ٣٠٠ [[if]] صعب يتقروا وبطيئين. [[map]] جدول واحد، و Nginx بيدوّر فيه بسرعة (hash للقيم الثابتة).`,
            how: R`[[map $uri $redirect_to { ... }]]: «اعمل متغير [[$redirect_to]]، قيمته من [[$uri]] حسب الجدول». القيمة الثابتة بتتطابق بالظبط، واللي بتبدأ بـ [[~]] regex (و [[~*]] من غير فرق بين الحروف الكبيرة والصغيرة). و [[default]] لو مفيش تطابق.

[[(?<id>\d+)]] في الـ regex: «اقبض على أرقام وسمّيها id»، وبعدين [[$id]] في القيمة.

الـ map بيتكتب في http (بره server)، ومش بيتحسب غير لما حد يستخدم المتغير، فمالوش تمن لو مش مستخدم.

[[access_log ... if=$loggable]]: اكتب السطر بس لو المتغير مش 0 ومش فاضي.

[[if ($redirect_to)]]: لو المتغير مش فاضي. ده من الاستخدامات القليلة الآمنة لـ if: [[return]] جوه server. (الـ if جوه location مع أوامر تانية سلوكه غريب، والـ docs نفسها بتحذر منه.)`,
            when: R`جدول redirects بعد تغيير الروابط. لوج للأخطاء بس على موقع عليه ضغط. أي قرار حسب header (بوت، دولة، نسخة app). وجدول كبير؟ حطه في ملف لوحده و [[include]] جوه الـ map.`,
            mistakes: R`تكتب الـ map جوه server: [[nginx -t]] بيرفض. وتنسى إن الـ regex بيتجرب بالترتيب، فأول واحد يطابق هو اللي بيكسب. وتستخدم [[$request_uri]] في المفتاح وتستغرب إن [[/old-about?x=1]] مش بيتحوّل: [[$request_uri]] فيه الـ query string، و [[$uri]] من غيرها.`
          },
          teach: R`## الفكرة: متغير بيتحسب من جدول

اتجرب بـ nginx/1.31.6 في [[nginx:alpine]]، والملف كله في [[conf.d/default.conf]].

---

## ١. جدول الـ redirects

~~~text conf.d/default.conf
map $uri $redirect_to {
    default            "";
    /old-about         /about;
    /blog/2023         /blog;
    ~^/p/(?<id>\d+)$   /products/$id;
}
~~~

- [[map $uri $redirect_to]]: المدخل [[$uri]] (المسار من غير query string)، والناتج متغير جديد [[$redirect_to]].
- [[default "";]]: لو مفيش تطابق، فاضي.
- [[/old-about /about;]]: تطابق بالظبط.
- [[~^/p/(?<id>\d+)$ /products/$id;]]: الـ [[~]] معناها regex. [[^]] أول المسار و [[$]] آخره، و [[\d+]] رقم أو أكتر، و [[(?<id>...)]] اقبض عليه باسم [[id]].

واستخدامه في الـ server:

~~~text
if ($redirect_to) {
    return 301 $redirect_to;
}
~~~

لو المتغير مش فاضي، رد [[301]] (نقل دائم) على العنوان الجديد.

~~~text الناتج
/old-about -> 301 http://127.0.0.1/about
/blog/2023 -> 301 http://127.0.0.1/blog
/p/42 -> 301 http://127.0.0.1/products/42
/p/abc -> 200
/about -> 200
~~~

[[/p/abc]] مش أرقام فالـ regex ماطابقش، وراح لـ default. ولاحظ إن Nginx كمّل العنوان لوحده بالدومين ([[http://127.0.0.1/about]]).

---

## ٢. لوج للأخطاء بس

~~~text
map $status $loggable {
    ~^[23]   0;
    default  1;
}
~~~

[[$status]] كود الرد. السطر الأول regex معناه أي كود بيبدأ بـ 2 أو 3 (نجاح أو تحويل) قيمته 0. الباقي 1.

و [[access_log /var/log/nginx/errors-only.log combined if=$loggable;]]: [[combined]] شكل اللوج العادي، و [[if=]] اكتب بس لو القيمة مش 0. بعد كل الطلبات اللي فوق، وطلب لصفحة رجعت 404:

~~~text errors-only.log
127.0.0.1 - - [27/Oct/2026:18:51:57 +0000] "GET /missing HTTP/1.1" 404 153 "-" "curl/8.22.0"
~~~

سطر واحد بس. الـ 301 والـ 200 مااتكتبوش. على موقع بيستقبل ملايين الطلبات، اللوج بيبقى أصغر بكتير والأخطاء باينة.

---

## ٣. تعرف البوت

~~~text
map $http_user_agent $is_bot {
    default                  0;
    ~*(bot|crawler|spider)   1;
}
~~~

[[~*]] regex من غير فرق بين الكبير والصغير، و [[|]] يعني «أو». جوه [[location /]] حطيته في header عشان أشوفه:

~~~text الناتج
-A "Mozilla/5.0 (compatible; Googlebot/2.1)"   ->  X-Bot: 1
-A "Mozilla/5.0 Firefox/130"                   ->  X-Bot: 0
~~~

وتقدر تستخدم [[$is_bot]] في أي حتة: [[access_log ... if=]]، أو مفتاح rate limit، أو [[proxy_set_header]] للتطبيق.

---

## الخلاصة

| الحتة | معناها |
|---|---|
| [[map A B { }]] | متغير B من A بجدول، في http |
| قيمة عادية | تطابق بالظبط |
| [[~]] و [[~*]] | regex، بفرق وبدون فرق بين الكبير والصغير |
| [[(?<name>...)]] | اقبض على حتة واستخدمها [[$name]] |
| [[default]] | لو مفيش تطابق |
| [[access_log ... if=$var]] | لوج بشرط |`,
          lines: [
            "جدول redirects: المدخل المسار، والناتج $redirect_to.",
            "لو مفيش تطابق: فاضي.",
            "رابط قديم لرابط جديد.",
            "كمان واحد.",
            "regex: /p/ ورقم يتحوّل لـ /products/ ونفس الرقم.",
            "قفلة.",
            "متغير $loggable من كود الرد.",
            "2xx و 3xx = 0 (متتكتبش).",
            "الباقي = 1.",
            "قفلة.",
            "متغير $is_bot من الـ User-Agent.",
            "افتراضيًا 0.",
            "لو فيه bot أو crawler أو spider بأي حروف = 1.",
            "قفلة.",
            "بلوك الموقع.",
            "بيسمع على 80.",
            "لوج للطلبات اللي $loggable بتاعها مش 0 بس.",
            "لو فيه redirect في الجدول...",
            "رد 301 على العنوان الجديد.",
            "قفلة الـ if.",
            "باقي الموقع.",
            "header فيه 1 أو 0 (للتجربة).",
            "رد ثابت ok.",
            "قفلة الـ location.",
            "قفلة الـ server."
          ],
          sol: R`[[/old-about]] رجّع [[301]] و [[Location: http://127.0.0.1/about]]، و [[/p/42]] رجّع 301 لـ [[/products/42]]، و [[/p/abc]] رجّع 200 لأن الـ regex عايز أرقام. والـ Googlebot أخد [[X-Bot: 1]] و Firefox أخد 0. واللوج فيه سطر الـ 404 بس.

لو [[nginx -t]] قال [[map directive is not allowed here]]: انت كاتبه جوه server. انقله فوق، بره أي server.`
        },
        {
          cmd: "geo",
          title: "geo و map: بلد الزائر من الـ IP أو من الـ CDN، ومتصدّقش الهيدر غير من الـ CDN، وخلّي البلد في مفتاح الكاش",
          learn: R`تعمل متغير [[$visitor_country]] في nginx من [[geo]] (نطاقات IP) ومن [[CF-IPCountry]] بس لو الطلب جاي من الـ CDN، وتبعته للتطبيق بنفسك فوق أي قيمة الزائر كتبها، وتحطه في مفتاح الكاش.`,
          out: R`من الـ CDN: [[CF-IPCountry: SA]] ← [[SA]]، و IP في [[192.0.2.0/24]] ← [[AE]]. ومن زائر مباشر: نفس الهيدرات مبتغيّرش حاجة. و [[X-Cache]] مبيديش زائر نسخة بلد تانية.`,
          desc: R`[[geo]] بيعمل متغير قيمته بتتحدد من عنوان IP: [[geo $ip_country { 203.0.113.0/24 SA; }]]. أي طلب من النطاق ده [[$ip_country]] عنده [[SA]]. ولو اديته متغير قبل الاسم ([[geo $realip_remote_addr $from_cdn]]) بيقرا العنوان من المتغير ده بدل [[$remote_addr]].

ومع [[map]] (درس «map») تجمع أكتر من مصدر بالأولوية: هيدر الـ CDN الأول، وبعدين [[geo]]. والأهم: هيدر زي [[CF-IPCountry]] أي حد يقدر يكتبه، فبتصدّقه بس لو [[$realip_remote_addr]] (العنوان اللي كلّمك فعلًا) من نطاقات الـ CDN، وبتكتبه للتطبيق بنفسك بـ [[proxy_set_header]] فبيمسح أي قيمة جت من بره.

وأي صفحة بتختلف حسب البلد ومتكاشة في nginx: البلد لازم يبقى في [[proxy_cache_key]]، وإلا أول زائر بيقرر الصفحة للكل. الحالة الكاملة في درس «السعر حسب بلد الزائر» في تاب PHP.`,
          example: R`proxy_cache_path /var/cache/nginx/pages keys_zone=pages:1m max_size=10m inactive=10m;
geo $ip_country {
    default        "";
    203.0.113.0/24 SA;
    192.0.2.0/24   AE;
}
geo $realip_remote_addr $from_cdn {
    default     0;
    10.89.0.10  1;
}
map "$from_cdn:$http_cf_ipcountry" $cdn_country {
    "~^1:(?<c>[A-Z]{2})$"  $c;
    default                "";
}
map "$cdn_country:$ip_country" $visitor_country {
    "~^(?<c>[A-Z]{2}):"    $c;
    "~^:(?<g>[A-Z]{2})$"   $g;
    default                "";
}
server {
    listen 80;
    set_real_ip_from 10.89.0.10;
    real_ip_header X-Forwarded-For;
    real_ip_recursive on;
    location / {
        proxy_pass http://app:8000;
        proxy_set_header CF-IPCountry $visitor_country;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache pages;
        proxy_cache_key "$scheme$host$request_uri|$visitor_country|$cookie_region";
        add_header X-Visitor-Country "$visitor_country" always;
        add_header X-Cache $upstream_cache_status always;
    }
}`,
          lines: [
            R`مكان الكاش على الديسك ومنطقة في الذاكرة اسمها [[pages]] للمفاتيح (١ ميجا)، وأقصى حجم ١٠ ميجا، وأي نسخة متطلبتش ١٠ دقايق تتمسح. (شرح كامل في درس «proxy_cache».)`,
            R`متغير [[$ip_country]] قيمته من [[$remote_addr]] (بعد ما [[realip]] يصلّحه): جدول نطاقات.`,
            R`أي IP مش في الجدول: نص فاضي.`,
            R`النطاق [[203.0.113.0/24]] (من [[203.0.113.0]] لـ [[203.0.113.255]]) = السعودية. في الحقيقة الجدول ده بييجي من قاعدة GeoIP، هنا نطاقات التوثيق.`,
            R`والنطاق [[192.0.2.0/24]] (برضه من نطاقات التوثيق) = الإمارات. كل سطر نطاق وبعده القيمة وفي الآخر [[;]].`,
            R`نهاية الجدول.`,
            R`متغير تاني، بس من [[$realip_remote_addr]]: العنوان اللي فتح الاتصال فعلًا، قبل ما [[realip]] يغيّره. ده اللي بيقول «الطلب ده جاي من الـ CDN ولا لأ».`,
            R`أي عنوان: [[0]] (مش من الـ CDN).`,
            R`عنوان الـ CDN في المعمل = [[1]]. في الحقيقة: كل نطاقات Cloudflare (درس «IP الزائر ورا Cloudflare» بيجيبها).`,
            R`نهاية الجدول.`,
            R`[[map]] على نص مركّب من متغيرين بينهم [[:]]، زي [[1:SA]] أو [[0:SA]]. النتيجة في [[$cdn_country]].`,
            R`لو النص [[1:]] وبعده حرفين كبار بالظبط: خد الحرفين (الـ [[(?<c>...)]] اسمه named capture و [[$c]] قيمته). يعني الهيدر جاي من الـ CDN بس.`,
            R`أي حاجة تانية (زائر مباشر كتب الهيدر، أو قيمة غريبة): فاضي.`,
            R`نهاية الجدول.`,
            R`[[map]] تاني بيختار بالأولوية بين المصدرين.`,
            R`لو [[$cdn_country]] فيه حرفين: خده (الـ CDN الأول).`,
            R`لو فاضي و [[geo]] فيه حرفين: خد [[geo]].`,
            R`ولا ده ولا ده: فاضي، والتطبيق يكمّل بطرقه (lookup أو الافتراضي).`,
            R`نهاية الجدول.`,
            R`بلوك السيرفر: كل اللي جواه للموقع ده بس، والـ [[geo]] و [[map]] فوق برّه أي server (في [[http]]) عشان أي موقع يستخدمهم.`,
            R`بيسمع على بورت 80 (في المعمل من غير HTTPS عشان التجربة).`,
            R`العنوان الوحيد اللي nginx هيصدّق [[X-Forwarded-For]] منه. من أي حد تاني الهيدر بيتجاهل و [[$remote_addr]] بيفضل عنوانه الحقيقي.`,
            R`IP الزائر الحقيقي في الهيدر ده (مع Cloudflare الأدق [[CF-Connecting-IP]]).`,
            R`امشي في [[X-Forwarded-For]] من اليمين وشيل العناوين الموثوقة، وأول عنوان مش موثوق هو الزائر.`,
            R`[[location /]] بيطابق كل الطلبات اللي ملهاش location أدق.`,
            R`ابعت الطلب للتطبيق على [[app:8000]] (اسم الـ container في شبكة Docker).`,
            R`اكتب [[CF-IPCountry]] بنفسك بالقيمة اللي حسبناها. ده بيمسح أي [[CF-IPCountry]] الزائر بعته، ولو القيمة فاضية الهيدر مبيتبعتش خالص.`,
            R`و [[X-Real-IP]] = [[$remote_addr]] بعد [[realip]]: التطبيق ياخد IP الزائر من هنا، مش من أول [[X-Forwarded-For]].`,
            R`شغّل الكاش اللي اسمه [[pages]].`,
            R`المفتاح: الرابط **و** البلد **و** cookie المنطقة. كل بلد له نسخة، ومحدش ياخد نسخة غيره.`,
            R`للتشخيص: البلد اللي nginx حسبه (مبيظهرش لو فاضي).`,
            R`للتشخيص: [[HIT]] أو [[MISS]] أو [[BYPASS]].`,
            R`نهاية الـ location.`,
            R`نهاية السيرفر.`,
          ],
          try: R`في المعمل (درس «السعر حسب بلد الزائر» في تاب PHP: شبكة Docker [[10.89.0.0/24]]، والـ CDN [[10.89.0.10]]، وزائر مباشر [[10.89.0.20]]): حط الكونفيج ده وجرّب ٦ طلبات: [[CF-IPCountry: SA]] و [[CF-IPCountry: sa]] و [[X-Forwarded-For: 192.0.2.44]] من الـ CDN، ونفس أول وتالت واحد من الزائر المباشر. اقرا [[X-Visitor-Country]] في كل واحد.`,
          teach: R`## المعمل

[[nginx:alpine]] (nginx 1.31.6، فيه [[geo]] و [[map]] و [[realip]] من غير ما تضيف حاجة) قدام تطبيق PHP بيطبع البلد اللي وصله في هيدر [[X-Region]]. وطلبات curl من container بعنوان ثابت:

~~~bash
cdn()    { docker run --rm --network becase-geo --ip 10.89.0.10 nginx:alpine "$@"; }
direct() { docker run --rm --network becase-geo --ip 10.89.0.20 nginx:alpine "$@"; }
docker exec becase-nginx2 nginx -t
~~~

~~~text الناتج
nginx: configuration file /etc/nginx/nginx.conf test is successful
~~~

---

## ١. [[geo]]: من IP لقيمة

~~~text default.conf
geo $ip_country {
    default        "";
    203.0.113.0/24 SA;
    192.0.2.0/24   AE;
}
~~~

- [[geo]] بيقارن عنوان بنطاقات CIDR. [[/24]] معناها أول ٢٤ bit ثابتين، يعني آخر رقم من 0 لـ 255.
- لو العنوان في أكتر من نطاق، الأدق (الأطول) بيكسب.
- من غير متغير قبل الاسم، بيستخدم [[$remote_addr]]. ومع [[realip]] ده بقى IP الزائر الحقيقي.
- الفرق عن [[map]]: [[map]] بيقارن نصوص (أو regex)، و [[geo]] بيفهم نطاقات IP (IPv4 و IPv6).

في الإنتاج الجدول ده مش بإيدك: موديول [[geoip2]] (مش في الـ image الرسمية، محتاج build أو باكدج) بيقرا قاعدة MaxMind ويعمل [[$geoip2_country_code]]. ده من الوثائق، مش متجرّب هنا.

---

## ٢. صدّق الهيدر بس من الـ CDN

~~~text default.conf
geo $realip_remote_addr $from_cdn {
    default     0;
    10.89.0.10  1;
}
map "$from_cdn:$http_cf_ipcountry" $cdn_country {
    "~^1:(?<c>[A-Z]{2})$"  $c;
    default                "";
}
~~~

| الحتة | معناها |
|---|---|
| [[$realip_remote_addr]] | العنوان اللي فتح الاتصال فعلًا. [[realip]] بيغيّر [[$remote_addr]] للزائر، والمتغير ده بيفضل بالعنوان الأصلي |
| [[$http_cf_ipcountry]] | أي هيدر طلب بيبقى [[$http_]] + اسمه بحروف صغيرة و [[-]] بقت [[_]] |
| [[map "$a:$b"]] | [[map]] على نص مركّب من متغيرين، فتقدر تقرر على الاتنين مع بعض |
| [[~]] | الشرط regex (حساس لحالة الحروف). [[~*]] من غير فرق |
| [[(?<c>[A-Z]{2})]] | اسحب حرفين كبار في متغير اسمه [[$c]] |

---

## ٣. اجمع بالأولوية

~~~text default.conf
map "$cdn_country:$ip_country" $visitor_country {
    "~^(?<c>[A-Z]{2}):"    $c;
    "~^:(?<g>[A-Z]{2})$"   $g;
    default                "";
}
~~~

النص مثلًا [[SA:AE]] (الـ CDN قال SA و geo قال AE): الشرط الأول بيطابق، فـ [[SA]]. و [[:AE]]: الأول مش بيطابق (مفيش حرفين قبل [[:]]) والتاني بيطابق، فـ [[AE]]. و [[map]] بيجرّب الـ regex بالترتيب اللي مكتوبة بيه.

---

## ٤. الطلبات

~~~bash
U=http://10.89.0.101/pricing.php
h() { grep -iE "^x-(region|visitor|cache)|class=.price" | tr -d '\r' | tr '\n' ' '; echo; }
cdn curl -s -D - -H "CF-IPCountry: SA" $U | h
~~~

[[h]] دالة بتلم السطور المهمة من الرد في سطر واحد: [[tr -d '\r']] يشيل الـ CR اللي في آخر كل هيدر، و [[tr '\n' ' ']] يحط السطور جنب بعض.

| مين | الهيدر | الناتج |
|---|---|---|
| CDN | [[CF-IPCountry: SA]] | [[X-Region: sa (header)]] و [[X-Visitor-Country: SA]] و [[19 SAR]] |
| CDN | [[CF-IPCountry: sa]] (صغيرة) | [[eg (default)]]: الـ regex [[[A-Z]]] حساس للحالة، فالقيمة اتجاهلت |
| CDN | [[X-Forwarded-For: 192.0.2.44]] | [[AE]] من [[geo]] بعد ما [[realip]] خد الـ IP |
| CDN | [[X-Forwarded-For: 203.0.113.7, 192.0.2.44]] | [[AE]]: [[realip]] خد آخر عنوان مش موثوق من اليمين، مش الأول |
| مباشر | [[CF-IPCountry: SA]] | [[eg (default)]]: [[$from_cdn]] = 0 |
| مباشر | [[X-Forwarded-For: 203.0.113.7]] | [[eg (default)]]: [[realip]] مبيصدّقش غير [[10.89.0.10]] |

السطر الرابع مهم: Cloudflare (أو أي proxy) بيضيف عنوان الزائر **في آخر** [[X-Forwarded-For]]. أي حاجة قبله الزائر ممكن يكون كتبها بنفسه. فالقراية من اليمين.

وحالة الحروف الصغيرة: Cloudflare بيبعت حروف كبيرة، بس لو مصدر تاني ممكن يبعت صغيرة، خلّي الشرط [[~*^1:(?<c>[A-Za-z]{2})$]] وخلّي التطبيق يعمل [[strtolower]].

---

## ٥. الكاش

في [[location /]] الكاش شغّال، والكل طلع [[X-Cache: MISS]]. ليه؟ التطبيق بيبعت [[Cache-Control: private, no-store]] و [[Set-Cookie]]، و nginx افتراضيًا مبيكاشش رد فيه أي واحد منهم. ده الصح لصفحة بتختلف من زائر للتاني.

الخطر لما حد يضيف [[proxy_ignore_headers Cache-Control Set-Cookie Vary;]] عشان «يسرّع الموقع» والمفتاح هو الرابط بس:

~~~text ٣ زوار من ٣ بلاد، proxy_cache_key "$scheme$host$request_uri"
X-Cache: MISS <p class="price">19 SAR</p>
X-Cache: HIT <p class="price">19 SAR</p>
X-Cache: HIT <p class="price">19 SAR</p>
~~~

وبالمفتاح اللي فيه البلد والـ cookie:

~~~text proxy_cache_key "$scheme$host$request_uri|$visitor_country|$cookie_region"
X-Cache: MISS <p class="price">19 SAR</p>
X-Cache: MISS <p class="price">150 EGP</p>
X-Cache: MISS <p class="price">19 AED</p>
X-Cache: HIT <p class="price">19 SAR</p>
~~~

[[$cookie_region]]: قيمة cookie اسمها [[region]] (أي cookie بتبقى [[$cookie_]] + اسمها). من غيرها، الزائر اللي اختار «مصر» بالزرار وهو في السعودية ياخد نسخة السعودية.

---

## الخلاصة

| عايز | التوجيه |
|---|---|
| قيمة من نطاقات IP | [[geo $var { CIDR value; }]] |
| من عنوان غير [[$remote_addr]] | [[geo $realip_remote_addr $var]] |
| تصدّق هيدر من الـ CDN بس | [[map "$from_cdn:$http_x"]] |
| أولوية بين مصدرين | [[map "$a:$b"]] بـ regex بالترتيب |
| IP الزائر الحقيقي | [[set_real_ip_from]] و [[real_ip_header]] و [[real_ip_recursive on]] |
| التطبيق ميتخدعش | [[proxy_set_header]] للهيدر بالقيمة المحسوبة، و [[X-Real-IP $remote_addr]] |
| كاش آمن | البلد والـ cookie في [[proxy_cache_key]]، أو [[Cache-Control: private]] من التطبيق |`,
          deep: {
            why: R`الكشف في nginx أسرع من التطبيق (جدول في الذاكرة، مفيش طلب لخدمة بره) وبيتعمل في مكان واحد لكل التطبيقات اللي وراه. والأهم إن nginx هو الطرف الوحيد اللي عارف مين فتح الاتصال فعلًا، فهو اللي يقدر يقرر الهيدر ده يتصدّق ولا لأ. التطبيق اللي ورا proxy مبيشوفش غير اللي nginx قاله.`,
            how: R`[[geo]] بيبني شجرة نطاقات وقت قراية الكونفيج، وكل طلب بيدوّر فيها مرة. و [[map]] و [[geo]] الاتنين lazy: القيمة بتتحسب أول ما حاجة تستخدم المتغير في الطلب، مش مع كل طلب. و [[realip]] بيشتغل بدري في معالجة الطلب: لو [[$realip_remote_addr]] في [[set_real_ip_from]]، بيقرا [[real_ip_header]] ومع [[real_ip_recursive on]] بيمشي من آخر عنوان لأوله ويقف عند أول عنوان مش موثوق، ويحطه في [[$remote_addr]]. و [[proxy_set_header]] بيبني هيدرات الطلب للـ upstream من الأول، فأي هيدر بنفس الاسم من الزائر بيتشال، والقيمة الفاضية معناها «متبعتش الهيدر». و [[proxy_cache_key]] نص بيتعمله hash؛ أي متغير فيه بيقسم الكاش.`,
            when: R`سعر أو لغة أو محتوى حسب البلد، أو قفل صفحة لبلاد معينة ([[if ($visitor_country = "XX") { return 451; }]])، أو تحويل لأقرب سيرفر، أو لوج فيه البلد. وأي مرة فيه CDN أو load balancer قدام nginx وعايز IP الزائر.`,
            mistakes: R`[[set_real_ip_from 0.0.0.0/0]] أو تصدّق [[CF-IPCountry]] من أي حد. وتنسى [[real_ip_recursive on]] فتاخد عنوان غلط في سلسلة proxies. وتاخد أول IP في [[X-Forwarded-For]] في التطبيق. وتكتب [[map]] بـ [[~]] والقيم ممكن تيجي صغيرة. وتكاش صفحة بتختلف حسب البلد بمفتاح الرابط بس، أو تضيف [[proxy_ignore_headers Set-Cookie Cache-Control]] على كل الموقع. وتنسى تحدّث نطاقات الـ CDN. وتفتكر إن الهيدر الفاضي بيتبعت فاضي (مبيتبعتش).`
          },
          sol: R`[[nginx -t]]: [[test is successful]]. من الـ CDN: [[SA]] ← [[sa (header)]] و [[19 SAR]]، و [[sa]] صغيرة ← [[eg (default)]]، و [[192.0.2.44]] ← [[AE]]، والسلسلة [[203.0.113.7, 192.0.2.44]] ← [[AE]]. من الزائر المباشر: الاتنين [[eg (default)]] ومفيش [[X-Visitor-Country]]. وكل الطلبات [[X-Cache: MISS]] لأن التطبيق بيبعت [[private]] و [[Set-Cookie]].

اتجرّب على [[nginx:alpine]] (nginx 1.31.6) قدام [[php:8.4-cli]] على شبكة Docker. موديول [[geoip2]] من الوثائق.`,
          practice: [
            { lvl: 'سريع', t: R`من غير ما تبص: إيه الفرق بين [[$remote_addr]] و [[$realip_remote_addr]] بعد [[set_real_ip_from]]؟ وأنهي واحد [[geo]] بيستخدم من غير ما تقوله؟ وأنهي واحد تستخدمه عشان تعرف «ده الـ CDN»؟`, done: R`كتبت إن [[$remote_addr]] بقى الزائر و [[$realip_remote_addr]] فضل اللي فتح الاتصال، و [[geo]] الافتراضي [[$remote_addr]]، والـ CDN يتعرف بـ [[$realip_remote_addr]].` },
            { lvl: 'تطبيق', t: R`اقرا وتوقّع: الكونفيج اللي في الدرس، وطلب من الـ CDN فيه [[CF-IPCountry: AE]] و [[X-Forwarded-For: 203.0.113.7]]. توقّع [[$ip_country]] و [[$cdn_country]] و [[$visitor_country]]، وبعدين زوّد [[add_header]] لكل واحد وشغّل.`, done: R`توقعت [[SA]] و [[AE]] و [[AE]] (الـ CDN بيكسب)، والهيدرات طابقت، وكتبت جملة ليه الترتيب ده منطقي.` },
            { lvl: 'تطبيق', t: R`صلّح الكونفيج البايظ: [[set_real_ip_from 0.0.0.0/0; real_ip_header X-Forwarded-For;]] و [[proxy_set_header X-Country $http_cf_ipcountry;]] و [[proxy_cache_key $request_uri; proxy_ignore_headers Set-Cookie Cache-Control;]]. اكتب لكل سطر هجوم بأمر curl واحد بيثبت المشكلة، وبعدين الإصلاح.`, done: R`٣ أوامر curl من «زائر مباشر» كل واحد بيغيّر البلد أو بياخد نسخة بلد تانية، وبعد الإصلاح نفس الأوامر بترجّع الافتراضي أو نسخة صح.` },
            { lvl: 'تطبيق', t: R`ابني: صفحة [[/blocked]] بترجع [[451]] لأي زائر [[$visitor_country]] بتاعه في لستة ([[XX]] و [[YY]] في المعمل)، من غير [[if]] كتير: [[map]] واحد بيطلّع [[$blocked]] و [[if ($blocked)]] واحد. واختبرها من الـ CDN بـ ٣ بلاد.`, done: R`[[XX]] و [[YY]] بيرجعوا [[451]] والباقي [[200]]، وزائر مباشر بيكتب [[CF-IPCountry: SA]] مبيعدّيش من قفل لو IP بتاعه في نطاق [[XX]].` },
            { lvl: 'تحدي', t: R`دوّر بنفسك: من وثائق [[ngx_http_geo_module]]، اعرف إيه [[ranges]] و [[proxy]] و [[delete]] و [[include]] جوه [[geo]]، وحوّل جدول النطاقات لملف [[countries.conf]] بيتعمله [[include]]، فيه ١٠٠٠ سطر (اعمله بسكربت)، وقيس [[nginx -t]] قبل وبعد.`, done: R`شرحت كل كلمة من الـ ٤ في سطر من الوثائق، والكونفيج بالملف المنفصل بيعدّي [[nginx -t]] وبيدّي نفس النتايج، وكتبت وقت [[nginx -t]] بالرقم في الحالتين.` },
          ],
        },
        {
          cmd: "auth_request",
          title: "احمي مسار بخدمة الـ login بتاعتك",
          desc: R`[[auth_request]] بيخلي Nginx يسأل endpoint في تطبيقك «الطلب ده مسموح؟» قبل ما يعدّيه. 2xx يعدّي، 401 أو 403 يترفض. كده تحمي أي حاجة ورا Nginx (لوحة admin، أداة داخلية، ملفات) بنفس تسجيل الدخول بتاع موقعك، حتى لو الأداة نفسها مفيهاش login.`,
          example: R`server {
    listen 80;
    location /admin/ {
        auth_request     /_auth;
        auth_request_set $auth_user $upstream_http_x_user;
        proxy_set_header X-User $auth_user;
        proxy_pass http://app:3000/api/;
    }
    location = /_auth {
        internal;
        proxy_pass              http://app:3000/auth/check;
        proxy_pass_request_body off;
        proxy_set_header        Content-Length "";
        proxy_set_header        X-Original-URI $request_uri;
    }
    error_page 401 = @login;
    location @login {
        return 302 /login?next=$request_uri;
    }
}`,
          flag: "script",
          try: R`اطلب [[/admin/stats]] من غير cookie، وبـ [[-H "Cookie: sid=mona"]]، وبـ [[-H "Cookie: sid=ali"]] (الـ endpoint بتاع الفحص بيقبل ali بس). وجرب تبعت [[-H "X-User: boss"]] مع ali وشوف التطبيق شاف مين.`,
          deep: {
            why: R`عندك Grafana أو أداة داخلية أو ملفات تقارير، ومش عايز تعمل login تاني ليها، أو هي أصلًا مفيهاش. بدل basic auth بباسورد مشترك، Nginx يسأل تطبيقك اللي عارف مين داخل.`,
            how: R`لكل طلب على [[/admin/]]، Nginx بيعمل subrequest لـ [[/_auth]]، اللي بيروح لـ [[/auth/check]] في التطبيق بنفس الـ headers والـ cookies. التطبيق يرد 200 (مسموح) أو 401 (مش داخل) أو 403 (داخل بس مش مسموح له).

[[internal]]: الـ location ده مايتطلبش من بره، بس من جوه Nginx (يرد 404 لو حد طلبه).

[[proxy_pass_request_body off]] و [[Content-Length ""]]: الفحص مش محتاج الـ body، فمتبعتهوش (لو حد بيرفع ملف ١٠٠ ميجا، مايتبعتش مرتين).

[[auth_request_set $auth_user $upstream_http_x_user]]: خد header [[X-User]] من رد الفحص في متغير، وابعته للتطبيق بـ [[proxy_set_header]]. وده بيكتب فوق أي [[X-User]] بعته الزائر.

[[error_page 401 = @login]]: لو الفحص قال 401، رد بـ redirect لصفحة الدخول بدل صفحة 401.`,
            when: R`أدوات داخلية ورا Nginx، وملفات محمية (فواتير PDF)، وأي خدمة عايز تحطها ورا نفس الـ login.`,
            mistakes: R`تنسى [[internal]] فأي حد يطلب [[/_auth]] مباشرة. وتنسى إن الفحص بيتعمل مع **كل** طلب (صور وملفات JS كمان)، فلازم يبقى سريع (من Redis أو JWT مش من query تقيلة). وتسيب [[next]] من غير ما التطبيق يتأكد إنه مسار جوه موقعك (open redirect).`
          },
          teach: R`## الفكرة: Nginx يسأل تطبيقك قبل ما يعدّي الطلب

المعمل: nginx/1.31.6 والتطبيق فيه endpoint [[/auth/check]] بيرد **200** مع header [[X-User: ali]] لو الـ cookie [[sid=ali]]، و **401** لأي حد تاني. وباقي التطبيق بيرجّع JSON فيه [[xuser]] = الـ header [[X-User]] اللي وصله.

---

## ١. [[location /admin/]]

- [[auth_request /_auth;]]: قبل ما تعمل أي حاجة، اسأل [[/_auth]]. لو 2xx كمّل، لو 401 أو 403 ارفض بنفس الكود.
- [[auth_request_set $auth_user $upstream_http_x_user;]]: [[$upstream_http_x_user]] هو header [[X-User]] في رد الفحص ([[$upstream_http_]] + اسم الـ header). احفظه في [[$auth_user]].
- [[proxy_set_header X-User $auth_user;]]: ابعته للتطبيق.
- [[proxy_pass http://app:3000/api/;]]: [[/admin/stats]] يروح لـ [[/api/stats]].

## ٢. [[location = /_auth]]

- [[=]] تطابق بالظبط.
- [[internal;]]: من بره بيرد 404. جربت [[curl http://127.0.0.1/_auth]] وطلع [[404]].
- [[proxy_pass http://app:3000/auth/check;]]: الفحص نفسه في التطبيق.
- [[proxy_pass_request_body off;]] و [[proxy_set_header Content-Length "";]]: من غير body.
- [[proxy_set_header X-Original-URI $request_uri;]]: قول للفحص الزائر كان طالب إيه، لو الصلاحية بتفرق حسب المسار.

## ٣. [[error_page 401 = @login;]]

[[@login]] location ليه اسم بس مالوش مسار (named location). [[=]] قبله معناها «خلي الكود اللي يطلع من @login هو الرد»، يعني 302 مش 401. و [[return 302 /login?next=$request_uri;]] بيحوّل لصفحة الدخول ومعاه المكان اللي كان رايحه.

---

## ٤. التجربة

~~~text من غير cookie
HTTP/1.1 302 Moved Temporarily
Location: http://127.0.0.1/login?next=/admin/stats?wait=0
~~~

~~~text Cookie: sid=mona
302 http://127.0.0.1/login?next=/admin/stats?wait=0
~~~

~~~text Cookie: sid=ali
{"path":"/api/stats","user":"ali","xuser":"ali", ...}
~~~

ولوج التطبيق بيوريك إن الفحص اتعمل قبل كل طلب، والطلب الحقيقي وصل مرة واحدة بس (لـ ali):

~~~text docker logs app
18:53:08 GET /auth/check cookie=-
18:53:08 GET /auth/check cookie=sid=mona
18:53:08 GET /auth/check cookie=sid=ali
18:53:08 GET /api/stats?wait=0 cookie=sid=ali
~~~

### محاولة تزوير

بعت ali ومعاه [[-H "X-User: boss"]]:

~~~text الناتج
{"path":"/api/stats","user":"ali","xuser":"ali", ...}
~~~

التطبيق شاف [[ali]]: [[proxy_set_header]] كتب فوق اللي الزائر بعته. ده المهم: التطبيق اللي ورا يثق في [[X-User]] لأن Nginx هو اللي حاططه.

> لاحظ إن [[next]] فيه [[?wait=0]] من غير encoding. صفحة الدخول لازم تقرا [[next]] بحذر وتتأكد إنه مسار جوه موقعك (بيبدأ بـ / واحدة) قبل ما تحوّل عليه.

---

## الخلاصة

| الرد من الفحص | Nginx بيعمل إيه |
|---|---|
| 2xx | يعدّي الطلب، وتقدر تاخد headers منه بـ [[auth_request_set]] |
| 401 | يرفض بـ 401، أو اللي تحدده بـ [[error_page 401]] |
| 403 | يرفض بـ 403 |
| أي حاجة تانية | 500 |`,
          lines: [
            "بلوك الموقع.",
            "بيسمع على 80.",
            "المسار المحمي.",
            "قبل أي حاجة اسأل /_auth.",
            "خد header X-User من رد الفحص في $auth_user.",
            "وابعته للتطبيق (فوق أي X-User بعته الزائر).",
            "التطبيق المحمي.",
            "قفلة.",
            "الفحص: المسار ده بالظبط.",
            "من جوه Nginx بس، من بره 404.",
            "endpoint الفحص في تطبيقك.",
            "متبعتش الـ body للفحص.",
            "ومتبعتش طوله.",
            "قول للفحص الزائر كان طالب إيه.",
            "قفلة.",
            "لو الفحص قال 401، روح لـ @login وخد الكود بتاعه.",
            "location باسم بس.",
            "حوّل لصفحة الدخول ومعاه المكان اللي كان رايحه.",
            "قفلة.",
            "قفلة الـ server."
          ],
          sol: R`من غير cookie و بـ [[sid=mona]]: [[302]] لـ [[/login?next=/admin/stats?wait=0]]. بـ [[sid=ali]]: الرد من التطبيق و [[xuser: ali]]. ومع [[X-User: boss]] برضه [[xuser: ali]]، لأن [[proxy_set_header]] بيكتب فوقه. ولوج التطبيق فيه [[GET /auth/check]] قبل كل طلب.

لو كل الطلبات بترجع 500: الفحص بيرجّع كود مش 2xx ولا 401 ولا 403 (مثلًا 404 لأن المسار غلط). شوف error.log.`
        },
        {
          cmd: "error_page",
          title: "صفحة خطأ بشكلك بدل صفحة Nginx",
          desc: R`[[error_page]] بيبدّل صفحة الخطأ الافتراضية (اللي فيها رقم نسخة Nginx) بصفحة من عندك: HTML للموقع، و JSON للـ API. و [[proxy_intercept_errors on]] بيخليه يبدّل كمان أخطاء التطبيق نفسه (زي 404 منه)، مش بس أخطاء Nginx.`,
          example: R`server {
    listen 80;
    server_tokens off;
    error_page 404 /errors/404.html;
    error_page 502 503 504 /errors/50x.html;
    location ^~ /errors/ {
        internal;
        root /usr/share/nginx;
    }
    location / {
        proxy_pass http://app:3000;
        proxy_intercept_errors on;
    }
    location /api/ {
        proxy_pass http://app:3000;
        error_page 502 503 504 = @api_down;
    }
    location @api_down {
        default_type application/json;
        return 503 '{"error":"service_unavailable","retry_after":30}\n';
    }
}`,
          flag: "script",
          try: R`حط ملفين [[404.html]] و [[50x.html]] في [[/usr/share/nginx/errors/]]. اطلب صفحة التطبيق بيرجّع لها 404 من الموقع ومن الـ API. وبعدين وقّف التطبيق واطلب [[/]] و [[/api/orders]] بـ [[curl -si]].`,
          deep: {
            why: R`لما التطبيق يقع وقت الـ deploy، الزائر بيشوف صفحة بيضا مكتوب فيها [[502 Bad Gateway]] و [[nginx/1.31.6]]: شكلها وحش، وبتقول للمهاجم نسختك بالظبط. والـ frontend اللي مستني JSON بيقع لما ياخد HTML.`,
            how: R`[[error_page 502 503 504 /errors/50x.html]]: لو الرد واحد من دول، اعمل redirect داخلي (الزائر مش شايفه) لـ [[/errors/50x.html]]، والكود يفضل زي ما هو (502).

[[location ^~ /errors/ { internal; root /usr/share/nginx; }]]: [[^~]] لو المسار بيبدأ بـ /errors/ خده من غير ما تجرب الـ regex locations. [[internal]] من بره 404. [[root]] الملف [[/usr/share/nginx/errors/50x.html]].

[[proxy_intercept_errors on]]: من غيره، أي خطأ **جاي من التطبيق** (404 أو 500) بيعدّي زي ما هو، و [[error_page]] بيشتغل بس على أخطاء Nginx نفسه (502 لما التطبيق واقع). معاه، ردود التطبيق اللي كودها 300 وأكتر واللي ليها [[error_page]] بتتبدّل.

[[error_page 502 503 504 = @api_down]]: الـ [[=]] معناها الكود ياخده من [[@api_down]] (503). و [[default_type application/json]] نوع الرد.`,
            when: R`أي موقع في الإنتاج. صفحة الصيانة بالذات: بتتعرض لوحدها كل ما التطبيق يقع.`,
            mistakes: R`[[proxy_intercept_errors on]] على الـ API: الـ 404 بتاعة [[{"error":"user not found"}]] تتحوّل HTML والـ frontend مايعرفش السبب. خليه للموقع بس. وتحط صفحة الخطأ في مكان بيحتاج التطبيق (هيفشل هو كمان). وتنسى [[internal]] فتتفهرس في جوجل.`
          },
          teach: R`## الفكرة: الخطأ بيحصل، بس يبان بشكلك

المعمل: nginx/1.31.6، والتطبيق بيرجّع **404 JSON** لأي مسار آخره [[/missing]]، وفولدر [[errors]] فيه ملفين HTML اتربطوا جوه الـ container على [[/usr/share/nginx/errors]].

### الأول: صفحة Nginx الافتراضية

Nginx من غير أي [[error_page]] والتطبيق واقف:

~~~text curl -si http://127.0.0.1/
HTTP/1.1 502 Bad Gateway
Server: nginx/1.31.6
Content-Type: text/html

<html>
<head><title>502 Bad Gateway</title></head>
<body>
<center><h1>502 Bad Gateway</h1></center>
<hr><center>nginx/1.31.6</center>
</body>
</html>
~~~

رقم النسخة في الـ header وفي الصفحة.

---

## ١. [[server_tokens off;]]

يشيل رقم النسخة: [[Server: nginx]] بس.

## ٢. [[error_page 404 /errors/404.html;]] و [[error_page 502 503 504 /errors/50x.html;]]

لو الرد واحد من الأكواد دي، Nginx بيجيب الملف ده ويرجّعه **بنفس الكود**. ده redirect داخلي، الزائر مش بيشوف [[/errors/...]] في العنوان.

## ٣. [[location ^~ /errors/ { internal; root /usr/share/nginx; }]]

- [[^~]]: درس «location ^~» في التاب: الـ prefix ده يكسب من غير ما الـ regex يتجرب.
- [[internal;]]: [[curl http://127.0.0.1/errors/404.html]] رجّع **404**. الملف مايتطلبش مباشرة.
- [[root /usr/share/nginx;]]: المسار + الـ root = [[/usr/share/nginx/errors/404.html]].

## ٤. [[location /]] و [[proxy_intercept_errors on;]]

~~~text الناتج والتطبيق شغال
/shop/missing  ->  <h1>الصفحة دي مش موجودة</h1>  [404]
~~~

التطبيق رجّع 404 JSON، و Nginx بدّله بالصفحة بتاعتك لأن [[proxy_intercept_errors]] شغال.

## ٥. [[location /api/]] من غير intercept

~~~text الناتج والتطبيق شغال
/api/missing  ->  {"error":"not found"}  [404]
~~~

الـ 404 بتاع التطبيق عدّى زي ما هو. ده الصح للـ API: الـ frontend محتاج الرسالة.

## ٦. التطبيق واقف

~~~text curl -si http://127.0.0.1/
HTTP/1.1 502 Bad Gateway
Server: nginx
Content-Type: text/html
Content-Length: 64

<h1>بنعمل صيانة، راجعين كمان شوية</h1>
~~~

~~~text curl -si http://127.0.0.1/api/orders
HTTP/1.1 503 Service Temporarily Unavailable
Server: nginx
Content-Type: application/json
Content-Length: 49

{"error":"service_unavailable","retry_after":30}
~~~

- الموقع: صفحتك، والكود لسه **502**، و [[Server: nginx]] من غير رقم.
- الـ API: [[error_page 502 503 504 = @api_down]]، والـ [[=]] خلت الكود **503** (اللي في [[return]])، و JSON بـ [[Content-Type: application/json]] من [[default_type]].

> الـ error_page اللي جوه [[location /api/]] بيلغي اللي في الـ server للـ location ده. كل مستوى بيورث من اللي فوقه **بس لو** مفيهوش error_page خالص.

---

## الخلاصة

| الإعداد | بيعمل إيه |
|---|---|
| [[error_page 502 /x.html]] | صفحتك بنفس الكود |
| [[error_page 502 = @name]] | الرد والكود من الـ named location |
| [[proxy_intercept_errors on]] | يبدّل كمان أخطاء التطبيق نفسه (للموقع، مش للـ API) |
| [[internal]] | صفحات الخطأ ماتتطلبش مباشرة |
| [[server_tokens off]] | من غير رقم النسخة |`,
          lines: [
            "بلوك الموقع.",
            "بيسمع على 80.",
            "شيل رقم النسخة من header Server ومن صفحات الخطأ.",
            "أي 404 يرجّع صفحتك.",
            "502 و 503 و 504 يرجّعوا صفحة الصيانة بنفس الكود.",
            "صفحات الأخطاء.",
            "من جوه Nginx بس.",
            "الملفات في /usr/share/nginx/errors/.",
            "قفلة.",
            "الموقع.",
            "للتطبيق.",
            "بدّل كمان أخطاء التطبيق (زي 404 منه) بصفحاتك.",
            "قفلة.",
            "الـ API.",
            "للتطبيق (وأخطاؤه بتعدّي زي ما هي).",
            "لو التطبيق واقع، روح لـ @api_down وخد الكود منه.",
            "قفلة.",
            "رد الـ API وهو واقع.",
            "نوع الرد JSON.",
            "503 و JSON فيه امتى يحاول تاني.",
            "قفلة.",
            "قفلة الـ server."
          ],
          sol: R`والتطبيق شغال: [[/shop/missing]] رجّع صفحتك 404 (التطبيق رجّع JSON و Nginx بدّله)، و [[/api/missing]] رجّع JSON التطبيق زي ما هو. ولما وقفت التطبيق: [[/]] رجّع [[502]] وصفحة الصيانة و [[Server: nginx]] من غير رقم، و [[/api/orders]] رجّع [[503]] و [[{"error":"service_unavailable","retry_after":30}]] بـ [[Content-Type: application/json]].

لو لسه شايف صفحة Nginx البيضا: الملف مش في المكان اللي [[root]] بيشاور عليه، و error.log فيه [[open() "/usr/share/nginx/errors/50x.html" failed (2: No such file or directory)]].`
        }
      ]
    }
]);
