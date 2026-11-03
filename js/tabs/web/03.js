// تكملة تاب web: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/web/01.js (شرح حقول الدرس في أوله)
MORE("web", [
    {
      t: "افهم الرد",
      l: 2,
      n: "",
      projects: [
        { lvl: 'صغير', t: R`مترجم الـ status codes`, what: R`CLI [[why 502]] بيطبع معنى الرقم، والغلط عند مين، وأول ٣ حاجات تبص عليها، من جدول JSON انت كاتبه. من درس «Status codes».`, done: R`بيرد على كل رقم في جدول الدرس، ورقم مش موجود ([[299]]) بيقول «مش معروف» ويطبع العيلة ([[2xx]]).` },
        { lvl: 'صغير', t: R`بطاقة headers لأي رابط`, what: R`سكربت بيعمل [[curl -sI]] ويطلّع جدول منسّق: [[Content-Type]] و [[Cache-Control]] و [[Content-Encoding]] و [[Vary]] والـ protocol والـ security headers، ويعلّم على الناقص. من دروس «Headers» و «HTTP/2 و HTTP/3».`, done: R`على ٣ مواقع بيطلّع ٣ جداول، وموقع من غير [[Cache-Control]] على CSS متعلّم عليه، والسكربت شغال في bash و PowerShell (بـ [[curl.exe]]).` },
        { lvl: 'متوسط', t: R`[[getJSON]] اللي مبيكدبش`, what: R`مكتبة صغيرة فوق [[fetch]]: timeout، و retry على [[502]]/[[503]]/[[504]] بس (مش [[4xx]])، و [[Retry-After]]، وفحص [[content-type]] (مفيش [[Unexpected token '<']] تاني)، و [[204]] بيرجّع [[null]]، ورسالة خطأ فيها الـ status وأول ٨٠ حرف. ومعاها اختبارات بسيرفر Node وهمي. من دروس «Unexpected token '<'» و «Status codes».`, done: R`الاختبارات بتغطي: JSON سليم، و HTML بـ [[200]]، و [[404]]، و [[503]] مرتين وبعدين نجاح، و timeout، و [[204]]، وكلهم بيعدّوا بـ [[node --test]].` },
        { lvl: 'متوسط', t: R`فاحص mixed content بعد النشر`, what: R`سكربت بياخد لستة صفحات https، ويدوّر في الـ HTML والـ CSS والـ JS المتحمّل على أي [[http://]]، ويفرّق بين لينك عادي ([[<a>]]) وطلب حقيقي (صورة، سكربت، fetch). من درس «Mixed content و HTTPS».`, done: R`على صفحة فيها صورة وسكربت [[http://]] بيطلّعهم الاتنين ونوعهم، ولينك [[<a href="http://...">]] بيتكتب «لينك، مش mixed content»، والسكربت بيخرج [[1]] لو فيه حاجة.` },
        { lvl: 'كبير', t: R`proxy تشخيص محلي`, what: R`proxy صغير بـ Node بتحطه بين الـ frontend والـ API وانت بتطوّر: بيسجّل كل طلب ورد (method و status و وقت و حجم)، ويقدر يحقن تأخير أو [[500]] أو CORS ناقص بقواعد في ملف، ويطلّع لوج JSONL. من الوحدة كلها.`, done: R`الـ frontend بيشتغل من خلاله عادي، وقاعدة [[/api/orders -> 503 x2]] بتخلّي أول طلبين يرجعوا [[503]] والتالت ينجح، وقاعدة CORS ناقص بتطلّع رسالة CORS حقيقية في Console، والـ proxy بيكمّل لو الـ API وقع ويرجّع [[502]].`, ext: R`زوّد واجهة ويب بتعرض الطلبات لايف، و record/replay لردود API عشان تشتغل offline.` },
        { lvl: 'فكرة', t: R`كتيّب «الرد ده معناه إيه» لفريقك`, what: R`موقع صغير (static) فيه كل status و header مهم بمثال حقيقي من مشاريعكم (بأسامي متغيّرة)، و curl يجرّبه، وأشهر غلطة. انت بتختار التقسيم.`, done: R`٢٠ صفحة على الأقل، وفيه بحث، وكل مثال curl اتشغّل والناتج متحط، وزميل لقى إجابة سؤاله فيه.`, ext: R`زوّد «شخّص الرد ده»: تلصق رد curl كامل والصفحة تقول المشكلة المحتملة.` },
      ],
      items: [
        {
          cmd: "Status codes",
          title: "الرقم بيقولك الغلط عند مين",
          desc: "أول رقم بيقولك كل حاجة: 2 نجح، 3 تحويل لمكان تاني، 4 الغلط في الطلب نفسه (عندك انت أو عند الـ frontend)، 5 الغلط في السيرفر. أكتر اتنين هتقابلهم على سيرفرك: 502 معناه Nginx شغال بس التطبيق اللي وراه واقع (بص على لوج التطبيق)، و 500 معناه التطبيق شغال بس الكود ضرب error.",
          example: R`200 OK                  Worked
201 Created             POST created something
204 No Content          Worked, empty body
301 / 308               Moved permanently (see Location header)
302 / 307               Temporary redirect
304 Not Modified        Browser cache is still valid
400 Bad Request         Wrong body or params
401 Unauthorized        Not logged in, token missing or expired
403 Forbidden           Logged in, but not allowed
404 Not Found           Wrong URL or route
405 Method Not Allowed  e.g. GET where POST is expected
409 Conflict            Duplicate (email already exists)
422 Unprocessable       Validation failed
429 Too Many Requests   Rate limited, slow down
500 Internal Error      Bug in server code: check app logs
502 Bad Gateway         Nginx is up, the app behind it is down
503 Unavailable         Overloaded or in maintenance
504 Gateway Timeout     App took too long to answer Nginx`,
          lines: [
            R`[[200 OK]] الطلب نجح والـ body فيه الرد. ده اللي هتشوفه في معظم سطور Network.`,
            R`[[201 Created]] نجح وعمل حاجة جديدة (يوزر أو أوردر)، وغالبًا الرد فيه الـ [[id]] الجديد وheader [[Location]] برابطها.`,
            R`[[204 No Content]] نجح بس مفيش body خالص. شائع في DELETE، ولو الـ frontend عمل [[r.json()]] عليه هيضرب [[Unexpected end of JSON input]].`,
            R`[[301]] و [[308]] الرابط اتنقل للأبد ومكانه الجديد في [[Location]]. المتصفح بيفتكر التحويل ده (كاش)، و [[308]] بيحافظ على POST كـ POST.`,
            R`[[302]] و [[307]] تحويل مؤقت (زي بعد login). [[307]] بيحافظ على الـ method، و [[302]] المتصفحات بتحوّل POST فيه لـ GET.`,
            R`[[304 Not Modified]] المتصفح سأل «النسخة اللي عندي لسه صالحة؟» بـ [[If-None-Match]] والسيرفر قال آه، فمفيش body اتنقل.`,
            R`[[400 Bad Request]] الطلب نفسه مكسور: JSON مش صالح، أو حقل ناقص، أو نوع غلط. بص في Payload وقارنه باللي الـ API مستنيه.`,
            R`[[401 Unauthorized]] السيرفر مش عارف انت مين: مفيش توكن أو كوكي، أو منتهي. الحل login تاني، مش صلاحيات.`,
            R`[[403 Forbidden]] السيرفر عارف انت مين بس مش مسموحلك (مش أدمن مثلًا). login تاني مش هيحلها. ونفس الرقم بيطلع لو CSRF token غلط.`,
            R`[[404 Not Found]] الرابط أو الـ route مش موجود: غلطة في الـ URL، أو [[/api]] ناقصة، أو الـ base URL غلط في الإنتاج.`,
            R`[[405 Method Not Allowed]] الـ route موجود بس مش بالـ method دي (GET على حاجة مستنية POST). الرد غالبًا فيه header [[Allow]] بالمسموح.`,
            R`[[409 Conflict]] الطلب سليم بس بيتعارض مع الموجود: إيميل متسجّل قبل كده، أو نسخة اتعدّلت من حد تاني.`,
            R`[[422 Unprocessable]] الشكل سليم بس القيم مش مقبولة (validation). FastAPI و Laravel بيرجّعوه وجواه لستة بالحقول الغلط.`,
            R`[[429 Too Many Requests]] بعت طلبات كتير في وقت قصير (rate limit). بص على header [[Retry-After]] واستنى، وشوف لو الكود بيعيد الطلب في loop.`,
            R`[[500 Internal Server Error]] الكود اللي على السيرفر ضرب exception. المتصفح مش هيقولك ليه: السبب في لوج التطبيق.`,
            R`[[502 Bad Gateway]] Nginx (أو اللي قدام التطبيق) شغال، بس التطبيق اللي وراه واقف أو البورت غلط. بص هل البروسيس شغال.`,
            R`[[503 Service Unavailable]] السيرفر قال «مش دلوقتي»: صيانة، أو ضغط، أو لسه بيقوم. ممكن معاه [[Retry-After]] برضه.`,
            R`[[504 Gateway Timeout]] التطبيق شغال بس اتأخر أكتر من المهلة بتاعة Nginx (الافتراضي ٦٠ ثانية): استعلام بطيء أو API خارجي مبيردش.`,
          ],
          try: "في Network لاقي طلب 304 وطلب 404 على أي موقع، واعرف كل واحد جه ليه.",
          flag: "script",
          deep: {
            why: "أول رقم في كل رد HTTP بيقولك على مستوى عالي إيه اللي حصل، والرقم ده وحده بيوريك المشكلة عند مين.",
            how: R`الأرقام مقسّمة: ٢ نجح، ٣ تحويل، ٤ الغلط في الطلب (من عندك)، ٥ الغلط في السيرفر.

200 OK نجح. 201 Created نجح وعمل resource جديد. 204 No Content نجح مفيش رد (شائع في DELETE). 304 Not Modified: المتصفح استخدم الكاش. 400 Bad Request: الطلب غلط أو validation. 401 Unauthorized: التوكن مش موجود أو منتهي. 403 Forbidden: معاك توكن بس مش مسموحلك. 404 Not Found. 409 Conflict: تعارض (إيميل موجود). 422 Unprocessable: validation فشل. 429 Too Many Requests. 500 Internal Server Error: كود السيرفر وقع. 502 Bad Gateway: Nginx شغال والتطبيق وراه واقع. 504 Gateway Timeout: التطبيق استغرق وقت أكتر مما يجب.`,
            when: "كل ما تشوف API call في Network: الرقم أول حاجة.",
            mistakes: "بتبعت 500 لأي error. استخدم الرقم الصح: 400 للـ validation، و401 لو مش logged in."
          },
          teach: R`## الأول: الرقم الأولاني بيقسّم الذنب

الـ status code ٣ أرقام في أول سطر من الرد، والرقم الأولاني لوحده بيقولك المشكلة فين:

| أول رقم | المعنى | الغلط عند مين |
|---|---|---|
| 2 | نجح | محدش |
| 3 | روح مكان تاني أو استخدم الكاش | محدش، بس تابع [[Location]] |
| 4 | الطلب نفسه غلط | الـ client (انت أو الـ frontend) |
| 5 | السيرفر فشل | الـ backend أو اللي قدامه |

المثال جدول مرجع مش أوامر، فهنجرّب منه أشهر الحالات بإيدينا على سيرفر Express محلي بـ [[curl.exe]] على ويندوز.

---

## ١. 304: الكاش لسه صالح

~~~powershell
curl.exe -sI http://127.0.0.1:8791/assets/app.css
curl.exe -sI http://127.0.0.1:8791/assets/app.css -H 'If-None-Match: "v1"'
~~~

~~~text الناتج (مختصر)
HTTP/1.1 200 OK
ETag: "v1"
Cache-Control: no-cache

HTTP/1.1 304 Not Modified
~~~

- [[-s]] من غير شريط تحميل، و [[-I]] اطلب الـ headers بس.
- [[ETag]] «بصمة» النسخة. المتصفح بيحفظها ويبعتها تاني في [[If-None-Match]].
- السيرفر لقى البصمة زي ما هي، فرد [[304]] من غير body: «استخدم اللي عندك».

> معلومة اتأكدت منها: JavaScript مش بيشوف الـ 304. عملت [[(await fetch("/assets/app.css")).status]] في Console ورجع [[200]]، مع إن لوج السيرفر كاتب [[304]]. المتصفح بيكمّل الرد من الكاش ويدّيك 200. الـ 304 بتشوفه في Network بس.

## ٢. 201 و 401 و 404

~~~text من نفس السيرفر
POST /api/users           201 Created         (اتعمل user جديد)
POST /api/login (غلط)     401 Unauthorized    {"error":"Invalid email or password"}
GET  /api/nope            404 Not Found       صفحة HTML فيها Cannot GET /api/nope
GET  /api/login           404 Not Found       (الـ route ده POST بس)
~~~

السطر الأخير مهم: الجدول بيقول [[405 Method Not Allowed]] لما تبعت GET لمكان مستني POST، وده الصح حسب HTTP. لكن Express **افتراضيًا** بيرد [[404]] في الحالة دي لأنه مش لاقي route بالـ method ده. فلو شفت 404 على URL انت متأكد إنه موجود، اتأكد من الـ method.

---

## ٣. الـ 5xx على سيرفرك

| الكود | اللي حصل فعلًا | تبص فين |
|---|---|---|
| 500 | التطبيق شغال والكود رمى exception | لوج التطبيق |
| 502 | Nginx شغال ومش لاقي التطبيق اللي وراه | هل التطبيق واقع؟ البورت صح؟ |
| 503 | السيرفر رافض مؤقتًا (زحمة أو صيانة) | الـ load أو وضع الصيانة |
| 504 | التطبيق رد بس بعد ما Nginx زهق | query بطيء أو timeout قصير |

## الخلاصة

- 2 تمام، 3 روح أو استخدم الكاش، 4 غلطك، 5 غلط السيرفر.
- 304 بيتشاف في Network بس، و [[fetch]] بيدّيك 200.
- Express بيرد 404 مش 405 لو الـ method غلط.`,
          sol: R`الـ 304: اعمل ريفريش عادي (من غير Disable cache) على موقع زرته قبل كده. هتلاقي ملفات status بتاعها [[304]]: المتصفح بعت [[If-None-Match]] أو [[If-Modified-Since]] والسيرفر قال «النسخة اللي عندك لسه صح» فمبعتش body. جربتها على سيرفر محلي: أول طلب [[HTTP/1.1 200 OK]] ومعاه [[ETag: "v1"]]، والتاني بـ [[If-None-Match: "v1"]] رجع [[HTTP/1.1 304 Not Modified]].

الـ 404: غالبًا [[favicon.ico]] أو صورة أو source map ([[.map]]) مش موجودة، أو URL غلط في الكود. دوس عليه وبص على Initiator عشان تعرف مين طلبه.

لو لقيت الملفات مكتوب عندها [[(memory cache)]] مش 304، ده معناه إن المتصفح ما سألش السيرفر خالص (الكاش لسه صالح بـ Cache-Control)، وده أسرع من 304.`,
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** غطّي عمود الشرح في المثال واكتب معنى [[201]] و [[204]] و [[304]] و [[401]] و [[403]] و [[409]] و [[422]] و [[502]] و [[504]] من دماغك، والغلط عند مين في كل واحد.`, done: R`٩ سطور، وكل واحد فيه «عند مين» (الـ client ولا التطبيق ولا اللي قدامه)، وصحّحتهم من الجدول ومفيش أكتر من غلطة.` },
            { lvl: 'تطبيق', t: R`**ابني:** سيرفر Node (من غير مكتبات، [[node:http]]) فيه route لكل رقم من دول: [[/ok]] و [[/created]] و [[/empty]] و [[/moved]] و [[/nope]] و [[/boom]]، وجرّبهم بـ [[curl.exe -s -o NUL -w "%{http_code}\n"]] (أو [[-o /dev/null]] في bash).`, done: R`كل route بيطبع رقمه ([[200]] و [[201]] و [[204]] و [[301]] و [[404]] و [[500]])، و [[/moved]] فيه [[Location]] و [[curl -L]] بيوصل للمكان الجديد.` },
            { lvl: 'تطبيق', t: R`**اقرا وتوقّع:** [[await (await fetch("/empty", { method: "DELETE" })).json()]] على route بيرجّع [[204]]. هيطبع إيه؟ شغّله وصلّح الكود بحيث ميقعش.`, done: R`طلع [[SyntaxError: Failed to execute 'json' on 'Response': Unexpected end of JSON input]] (اتجرّب في Chrome 156)، والتصليح: [[if (res.status === 204) return null]] قبل [[.json()]].` },
            { lvl: 'تحدي', t: R`**قارن:** فورم بيبعت [[POST]] لـ route بيرد [[302]] لـ [[/landed]]، وroute تاني بيرد [[307]]. من Console ابعت [[fetch(url, { method: "POST", body: "x" })]] لكل واحد، وبص في لوج السيرفر: الطلب التاني وصل بأنهي method؟`, done: R`لوج السيرفر فيه [[POST /r302]] وبعده [[GET /landed]]، و [[POST /r307]] وبعده [[POST /landed]] (اتجرّب). وكاتب إمتى تستخدم [[303]] (بعد فورم) وإمتى [[307]]/[[308]] (API عايز يحافظ على البودي).` },
            { lvl: 'تحدي', t: R`**بيانات حقيقية:** خد access log (من nginx أو اعمله بـ Node) فيه ٢٠٠ سطر، وبـ [[awk '{print $9}' access.log | sort | uniq -c | sort -rn]] (أو [[Group-Object]] في PowerShell) طلّع عدد كل status، وقول أنهي رقم محتاج تحقيق.`, done: R`عندك جدول الأرقام وعددها، وأي [[5xx]] أو [[429]] متعلّم عليه ومعاه أكتر URL ظهر بيه.` },
          ],
        },
        {
          cmd: "Headers",
          title: "البيانات اللي حوالين الرد",
          desc: "في الطلب: [[Authorization]] (التوكن)، و [[Content-Type]] (نوع البيانات اللي بتبعتها)، و [[Cookie]]، و [[Origin]] (الموقع اللي بيطلب). في الرد: [[Content-Type]] نوع الرد، و [[Cache-Control]] الكاش يفضل قد إيه، و [[Set-Cookie]] السيرفر بيحفظ كوكي، و [[Location]] مكان التحويل مع 301 و 302، و [[Access-Control-Allow-Origin]] مين مسموحله (CORS).",
          example: R`curl -sI https://example.com
curl -sI https://example.com | grep -iE "content-type|cache-control|location|server"`,
          try: "قارن headers ملف صورة وملف HTML في موقعك: مين ليه Cache-Control أطول؟",
          flag: "term",
          deep: {
            why: "فيه معلومات مهمة «خلف الكواليس» مش في الصفحة: تاريخ انتهاء الكاش، وتعليمات للمتصفح. بتقرا headers عشان تشوف حاجة اتضبطت صح ولا لأ.",
            how: R`في الطلب: [[Authorization]] التوكن، و [[Content-Type]] نوع البيانات، و [[Cookie]] كوكياتك، و [[Origin]] الدومين.

في الرد: [[Content-Type]] نوع الرد، لو مش application/json والكود بيعمل response.json() هيفشل. [[Cache-Control]] بيقول للمتصفح يحفظ الملف قد إيه. [[Set-Cookie]] السيرفر بيحفظ كوكي. [[Location]] مع 301 أو 302 الـ URL الجديد.

[[curl -sI]] بيجيب headers بس من غير الـ body، سريع ومفيد.`,
            when: "تتأكد إن Cache-Control مظبوط. لما Set-Cookie مش شغال. لما CORS بيطلع error.",
            mistakes: "تتجاهل headers وتفضل تدوّر في الكود. ٥٠٪ من مشاكل الـ API مشكلة headers."
          },
          teach: R`## الأول: الـ headers سطور قبل الـ body

أي رد HTTP شكله: سطر الـ status، وبعده headers (كل سطر [[اسم: قيمة]])، وبعدين سطر فاضي، وبعدين الـ body. المثال بيجيب الـ headers بس من [[example.com]]. اتشغّل في [[docker run --rm ubuntu:24.04]] بعد [[apt-get install curl]].

---

## ١. [[curl -sI https://example.com]]

- [[curl]]: برنامج بيبعت طلبات HTTP من الترمنال.
- [[-s]] (silent): من غير شريط التحميل والأرقام.
- [[-I]] (حرف i كبير): ابعت طلب [[HEAD]]، يعني «هات الـ headers من غير الـ body».

~~~text الناتج (لينكس، Ubuntu 24.04)
HTTP/2 200
date: Tue, 06 Oct 2026 17:43:46 GMT
content-type: text/html; charset=utf-8
server: cloudflare
last-modified: Sun, 04 Oct 2026 20:44:03 GMT
allow: GET, HEAD
accept-ranges: bytes
age: 7904
cf-cache-status: HIT
alt-svc: h3=":443"; ma=86400
~~~

(شلت سطر [[cf-ray]] لأنه رقم تتبع ملوش لازمة هنا.)

| السطر | معناه |
|---|---|
| [[HTTP/2 200]] | البروتوكول HTTP/2 والـ status 200 |
| [[content-type]] | الرد HTML بترميز utf-8 |
| [[server: cloudflare]] | الرد جاي من Cloudflare (CDN قدام الموقع) |
| [[last-modified]] | آخر مرة الملف اتغير |
| [[age: 7904]] | النسخة دي قاعدة في كاش الـ CDN بقالها ٧٩٠٤ ثانية (ساعتين وشوية) |
| [[cf-cache-status: HIT]] | Cloudflare رد من الكاش بتاعه من غير ما يسأل السيرفر الأصلي |

لاحظ إن الأسامي هنا small letters: في HTTP/2 الأسامي لازم تبقى small، وفي HTTP/1.1 ممكن تشوفها [[Content-Type]]. الاتنين نفس الحاجة، والـ headers مش case-sensitive.

---

## ٢. السطر التاني: فلتر على أهم ٤

~~~bash
curl -sI https://example.com | grep -iE "content-type|cache-control|location|server"
~~~

- [[|]] (pipe): ابعت ناتج curl لـ grep بدل الشاشة.
- [[grep]]: يسيب السطور اللي فيها الكلام ده بس. [[-i]] من غير فرق بين capital و small، و [[-E]] عشان [[|]] جوه النص تبقى «أو».

~~~text الناتج
content-type: text/html; charset=utf-8
server: cloudflare
~~~

اتنين بس من الأربعة! يعني example.com مش باعت [[cache-control]] خالص (المتصفح هيخمّن من [[last-modified]])، ومفيش [[location]] لأن الرد 200 مش تحويل.

---

## ٣. التجربة: صورة ضد HTML

على سيرفر محلي فيه صورة و HTML (من PowerShell بـ [[curl.exe]]، و [[Select-String]] هو grep بتاع PowerShell):

~~~powershell
curl.exe -sI http://127.0.0.1:8791/logo.png | Select-String -Pattern "cache-control"
curl.exe -sI http://127.0.0.1:8791/ | Select-String -Pattern "cache-control"
~~~

~~~text الناتج
Cache-Control: public, max-age=31536000, immutable
Cache-Control: no-cache
~~~

- [[max-age=31536000]]: ٣١٥٣٦٠٠٠ ثانية = ٣٦٥ يوم. [[public]] أي كاش (حتى CDN) يحفظها، و [[immutable]] «متسألش عليها تاني».
- [[no-cache]] مش معناها «متخزّنش»، معناها «خزّن بس اسأل السيرفر قبل ما تستخدمها كل مرة».

| أمر | على ويندوز |
|---|---|
| [[curl -sI URL]] | [[curl.exe -sI URL]] (في PowerShell 5.1 كلمة [[curl]] لوحدها اسم مستعار لـ Invoke-WebRequest، فاكتب [[curl.exe]]) |
| [[grep -iE "a|b"]] | [[Select-String -Pattern "a|b"]] (case-insensitive افتراضيًا) |

## الخلاصة

- [[curl -sI]] = الـ headers بس، أسرع طريقة تشوف الرد من غير متصفح.
- [[content-type]] نوع الرد، و [[cache-control]] الكاش، و [[location]] مع التحويل، و [[server]] مين رد.
- [[no-cache]] = اسأل كل مرة، مش «متخزّنش» (دي [[no-store]]).`,
          lines: [
            "هات الـ headers بس ([[-I]] طلب HEAD) من غير شريط تحميل ([[-s]]).",
            "وفلتر على أهم ٤: نوع المحتوى، والكاش، والتحويل، والسيرفر."
          ],
          sol: R`[[curl -sI https://yoursite.com/logo.png]] و [[curl -sI https://yoursite.com/]] وقارن سطر [[cache-control]]. المتوقع في موقع مظبوط: الصورة (وخصوصًا الملفات اللي في اسمها hash زي [[/assets/app.3f9a1c.js]]) عليها حاجة زي [[cache-control: public, max-age=31536000, immutable]] (سنة)، والـ HTML عليه [[no-cache]] أو [[max-age=0, must-revalidate]] أو مفيش خالص.

السبب: الـ HTML لازم المتصفح يسأل عليه كل مرة عشان يعرف أسماء الملفات الجديدة، إنما الصورة أو الـ bundle اللي اسمه بيتغير مع كل تعديل ينفع يتكاش للأبد.

لو لقيت العكس (HTML عليه max-age طويل)، ده سبب «رفعت تعديل ومحدش شايفه». ولو الاتنين مفيهمش cache-control خالص، المتصفح بيخمّن بنفسه (heuristic caching) من [[last-modified]].`,
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** من غير ما تبص: اكتب ٤ headers في الطلب و ٥ في الرد من الدرس، وجنب كل واحد شغلته في نص سطر.`, done: R`٩ headers صح، ومنهم [[Content-Type]] (موجود في الاتنين) وعارف الفرق بين معناه في الطلب وفي الرد.` },
            { lvl: 'تطبيق', t: R`**قارن:** [[curl -sI]] على صفحة HTML، وصورة، وملف CSS، وملف JSON من نفس الموقع (موقعك أو سيرفر محلي). اعمل جدول بـ [[Content-Type]] و [[Cache-Control]] و [[Content-Length]] لكل واحد.`, done: R`الجدول ٤ صفوف، و [[Cache-Control]] بتاع الـ HTML أقصر (أو [[no-cache]]) من الصورة والـ CSS، ولو مش كده كتبت إن ده مشكلة وليه.` },
            { lvl: 'تطبيق', t: R`**دوّر بنفسك:** في Network على موقعك، لاقي ردود فيها [[Set-Cookie]] و [[Vary]] و [[ETag]] و [[Content-Encoding]]. اكتب معنى كل واحد من MDN بجملة.`, done: R`٤ جمل، و [[Content-Encoding]] طلع [[gzip]] أو [[br]] أو [[zstd]] على ملف نصي، وعرفت إن [[Vary: Accept-Encoding]] بيقول للكاش يخزّن نسخة لكل ضغط.` },
            { lvl: 'تطبيق', t: R`**ابني:** سيرفر Node بيرجّع نفس الملف بـ [[Content-Type: text/plain]] مرة و [[text/html]] مرة و [[application/octet-stream]] مرة. افتح كل واحد في المتصفح.`, done: R`كاتب: [[text/plain]] بيبان كنص بالـ tags، و [[text/html]] بيترسم، و [[octet-stream]] بينزل كملف. يعني الـ header هو اللي بيقرر، مش امتداد الملف.` },
            { lvl: 'تحدي', t: R`**اشرحها:** ليه [[Content-Type: text/html]] على endpoint المفروض يرجّع JSON بيعمل [[Unexpected token '<']]؟ وليه [[nosniff]] (درس «Security headers و SSL») بيرفض سكربت جاي بـ [[text/plain]]؟ اكتب ٤ سطور.`, done: R`السطور فيها: الكود بيعمل [[JSON.parse]] على HTML، و [[X-Content-Type-Options: nosniff]] بيخلّي المتصفح يصدّق الـ header ومايخمّنش، فسكربت بنوع غلط ميتنفّذش.` },
          ],
        },
        {
          cmd: "Unexpected token '<'",
          title: "ليه JSON.parse ضرب",
          desc: "أشهر error في الـ frontend: الكود مستني JSON، والسيرفر رجّع صفحة HTML، اللي بتبدأ بـ [[<]]. غالبًا صفحة 404، أو صفحة error بتاعة Nginx، أو صفحة login. افتح الطلب في Network وبص على الـ Status والـ Response، وقارن [[Content-Type]] في الرد بـ [[application/json]].",
          example: R`const res = await fetch("/api/users")
res.status
res.headers.get("content-type")
await res.text()`,
          try: "اعمل fetch لـ route مش موجود في الـ API بتاعك وشوف الـ text اللي راجع.",
          deep: {
            why: "الـ frontend بيعمل response.json() وبيطلع error. ده معناه الرد مش JSON.",
            how: R`الرسالة الكاملة: [[SyntaxError: Unexpected token '<']] لأن الكود استلم HTML (بيبدأ بـ [[<]]) وحاول يـparse-ه كـ JSON.

السبب الأشهر: الـ API endpoint مش موجود (404 بيرجع صفحة HTML)، أو السيرفر وقع (502 بيرجع صفحة error من Nginx)، أو في development الـ proxy مش مظبوط.

الحل: في Network، دوس على الطلب وافتح Response. لو شايف HTML، هتلاقي فيه الـ status الحقيقي.

في الكود: قبل [[response.json()]]، بص على [[response.status]] و [[response.headers.get("content-type")]].`,
            when: "أي مرة بيطلع error فيه [[<]] أو [[Unexpected token]]. وعند تغيير environments.",
            mistakes: "تدوّر في كود الـ JSON parsing. المشكلة مش في الـ parsing، المشكلة إن اللي واصلك مش JSON أصلًا."
          },
          teach: R`## الأول: الرسالة دي معناها «اللي وصلك مش JSON»

[[res.json()]] بيحاول يقرا الرد كـ JSON. لو الرد صفحة HTML، أول حرف فيها [[<]] (من [[<!DOCTYPE html>]])، وده مش مسموح في أول JSON، فيرمي [[SyntaxError: Unexpected token '<']]. المثال بيقرا الرد بالراحة خطوة خطوة بدل [[.json()]]. كله اتشغّل في Console في Chrome على سيرفر Express محلي مفيهوش route اسمه [[/api/nope]].

---

## ١. [[const res = await fetch("/api/nope")]]

- [[fetch(url)]]: بيبعت GET للـ URL ده. الـ URL بيبدأ بـ [[/]] فبيروح لنفس الموقع.
- [[await]]: استنى لحد ما الرد يوصل. Console بيسمح بـ [[await]] على طول من غير [[async]] function.
- [[const res =]]: احفظ الرد (object من نوع [[Response]]) في متغير.

ومفيش [[.json()]] لسه، عمدًا.

~~~text الناتج
undefined
Failed to load resource: the server responded with a status of 404 (Not Found)
~~~

[[undefined]] لأن تعريف متغير مش بيرجّع قيمة. والسطر الأحمر من المتصفح: الـ fetch **مش** بيرمي error على 404، الطلب نجح من ناحية الشبكة والرد كان 404.

## ٢. [[res.status]]

~~~text الناتج
404
~~~

أول دليل: الـ endpoint مش موجود.

## ٣. [[res.headers.get("content-type")]]

[[res.headers]] كل headers الرد، و [[.get(...)]] بيجيب واحد بالاسم (الاسم مش case-sensitive).

~~~text الناتج
"text/html; charset=utf-8"
~~~

تاني دليل: الرد HTML مش [[application/json]].

## ٤. [[await res.text()]]

[[.text()]] بيقرا الـ body كنص زي ما هو، من غير ما يحاول يفسّره، ومحتاج [[await]] لأن الـ body بيتقري بعد الـ headers.

~~~text الناتج
"<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Error</title>
</head>
<body>
<pre>Cannot GET /api/nope</pre>
</body>
</html>"
~~~

دي صفحة الـ 404 الافتراضية بتاعة Express. أول حرف [[<]].

---

## ٥. والـ error نفسه

لو عملت اللي الكود الغلط بيعمله:

~~~javascript Console
await fetch("/api/nope").then(r => r.json())
~~~

~~~text الناتج
Uncaught SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON
~~~

Chrome بيوريك أول ١٠ حروف من الرد ([[<!DOCTYPE ]]): ده أسرع تلميح إن اللي جالك HTML.

وللمقارنة، endpoint موجود:

~~~text الناتج من /api/me
res.status                          200
res.headers.get("content-type")     "application/json; charset=utf-8"
await res.json()                    {id: 42, name: "Ali", role: "user"}
~~~

| السطر | بيسأل عن إيه | لو الرد HTML |
|---|---|---|
| [[fetch(...)]] من غير [[.json()]] | هات الرد بس | |
| [[res.status]] | الرقم | 404 أو 502 أو 200 (fallback) |
| [[content-type]] | النوع | [[text/html]] |
| [[res.text()]] | المحتوى نفسه | صفحة HTML |

## الخلاصة

- [[Unexpected token '<']] = الرد HTML. المشكلة في الـ URL أو السيرفر، مش في الـ parsing.
- [[fetch]] مش بيرمي error على 404 أو 500، لازم تبص على [[res.status]] أو [[res.ok]] بنفسك.
- لو status 200 والـ text هو [[index.html]] بتاعك، الطلب راح للـ frontend مش للـ API.`,
          lines: [
            "اطلب الـ API، ومتعملش .json() لسه.",
            "الـ status: 404 أو 502 هيقولك السبب.",
            "نوع الرد: لو text/html يبقى صفحة مش JSON.",
            "اقرا الرد كنص وشوف فيه إيه فعلًا."
          ],
          sol: R`جربتها على سيرفر محلي بـ [[fetch("/api/nope")]]:

[[res.status]] رجع [[404]]، و [[res.headers.get("content-type")]] رجع [[text/html]]، و [[await res.text()]] رجع [[<!DOCTYPE html><html><body><pre>Cannot GET /api/nope</pre></body></html>]] وده الشكل الافتراضي بتاع Express. ولو عملت [[res.json()]] بدل text، Chrome بيقول بالظبط: [[Unexpected token '<', "<!DOCTYPE "... is not valid JSON]].

يعني الـ [[<]] ده أول حرف في صفحة HTML. في مشروع Vite أو Next.js ممكن تلاقي status [[200]] والـ text هو [[index.html]] بتاع الـ frontend نفسه (fallback الـ SPA): ده معناه إن الطلب ما وصلش للـ API أصلًا (proxy أو base URL غلط).`,
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** اكتب ٣ أسباب بتخلّي السيرفر يرجّع HTML لطلب API، وأول ٣ حاجات تبص عليها في Network.`, done: R`الأسباب فيها (404 أو صفحة الـ SPA fallback، وصفحة login، وصفحة error من nginx)، والحاجات: Status و [[Content-Type]] و Response.` },
            { lvl: 'تطبيق', t: R`**صلّح:** دالة [[getJSON(url)]] بتعمل [[fetch]] و [[.json()]] على طول. خليها تتأكد من [[res.ok]] و [[content-type]]، ولو الرد مش JSON ترمي error فيه الـ status وأول ٨٠ حرف من الرد.`, done: R`على route مش موجود بترمي حاجة زي [[HTTP 404 text/html: <!DOCTYPE html>...]] بدل [[Unexpected token '<']]، وعلى route سليم بترجّع الـ object.` },
            { lvl: 'تحدي', t: R`**محاكاة (SPA fallback):** سيرفر static بيرجّع [[index.html]] لأي URL مش موجود (زي إعداد Vercel أو nginx [[try_files ... /index.html]]). اطلب [[/api/users]] قبل ما الـ API يتشغّل: الـ Status كام؟`, done: R`الـ Status [[200]] والـ Content-Type [[text/html]] (مش 404!)، و [[.json()]] ضرب [[Unexpected token '<']]. وكاتب ليه [[res.ok]] لوحده مكانش هيمسكها، والفحص على [[content-type]] هو اللي مسكها.` },
          ],
        },
        {
          cmd: "CORS",
          title: "لما الـ frontend مش قادر يكلّم الـ API",
          desc: "الـ error الأحمر اللي فيه «blocked by CORS policy» معناه إن المتصفح منع صفحتك من قراية رد جاي من دومين تاني، لأن السيرفر ماقالش إنه موافق. الحل دايمًا على السيرفر مش في الـ frontend: السيرفر لازم يرجّع [[Access-Control-Allow-Origin]] بدومينك. في طلبات POST بـ JSON المتصفح بيبعت طلب [[OPTIONS]] الأول (اسمه preflight)، هتلاقيه في Network. واستخدام [[*]] مع الكوكيز مش هيشتغل، لازم تكتب الدومين نفسه.",
          example: R`// Express (npm i cors)
const cors = require("cors");
app.use(cors({
  origin: ["https://example.com", "http://localhost:5173"],
  credentials: true
}));`,
          try: "من Console على أي موقع اعمل fetch لـ API بتاعك، وشوف الـ CORS error، وبعدين ضيف الدومين ده في الإعدادات وجرّب تاني.",
          flag: "script",
          deep: {
            why: "الـ frontend بيستدعي API على دومين تاني وبيطلع error أحمر في Console. المتصفح منع قراية الرد.",
            how: R`CORS (Cross-Origin Resource Sharing) قاعدة أمان. لو صفحة على app.com بتطلب من api.example.com، المتصفح بيقرا رد الـ API ويبص على header اسمه [[Access-Control-Allow-Origin]]. لو مش موجود، المتصفح بيمنع الكود من قراية الرد.

النقطة: الطلب بيوصل السيرفر والسيرفر بيرد. بس المتصفح بيخبّي الرد. CORS مش موجود في curl أو Postman.

الحل دايمًا على السيرفر: لازم يرجع [[Access-Control-Allow-Origin]] بالدومين المسموح. لو فيه credentials (cookies أو Authorization)، لازم يبقى الدومين محدد (مش [[*]]) ومعاه [[Access-Control-Allow-Credentials: true]].

طلبات POST بـ JSON بتبعت المتصفح قبلها طلب OPTIONS (preflight) يسأل السيرفر هل مسموح. لو الـ API مش بيرد على OPTIONS، الطلب الأصلي مش هيتبعت.`,
            when: "كل ما تبدأ تشتغل من frontend مع backend على origins مختلفة.",
            mistakes: "تحاول تحل CORS من الـ frontend. و[[*]] مع credentials مش بيشتغل."
          },
          teach: R`## الأول: مين بيمنع مين

CORS (Cross-Origin Resource Sharing) قاعدة **في المتصفح**. الـ origin = البروتوكول + الدومين + البورت، فـ [[http://localhost:8791]] و [[http://localhost:8792]] اتنين origin مختلفين. لو صفحة على واحد عملت [[fetch]] للتاني، المتصفح بيبعت الطلب، بس مش بيدّي الرد لـ JavaScript غير لو الرد فيه [[Access-Control-Allow-Origin]] بيسمح للـ origin بتاع الصفحة.

جربت كل ده بسيرفرين Express على جهازي: الموقع على 8791 والـ API على 8792، والـ API فيه route [[/x]] من غير cors، و [[/y]] عليه نفس إعدادات المثال بالظبط.

---

## ١. من غير cors

من Console في صفحة [[http://localhost:8791]]:

~~~javascript Console
await fetch("http://localhost:8792/x").then(r => r.json())
~~~

~~~text الناتج في Console
Access to fetch at 'http://localhost:8792/x' from origin 'http://localhost:8791' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
Failed to load resource: net::ERR_FAILED
Uncaught TypeError: Failed to fetch
~~~

الكود نفسه شايف [[TypeError: Failed to fetch]] بس، والسبب الحقيقي في السطر الأحمر الأولاني. وبـ curl (اللي مش متصفح فمفيهوش CORS) نفس الطلب رجع عادي:

~~~text curl -si http://localhost:8792/x -H "Origin: http://localhost:8791"
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{"msg":"hello from 8792"}
~~~

يعني السيرفر رد 200 فعلًا، والمتصفح هو اللي خبّى الرد عشان مفيش [[Access-Control-Allow-Origin]].

---

## ٢. المثال سطر سطر

### [[const cors = require("cors");]]

يجيب مكتبة [[cors]] (اتسطبت بـ [[npm i cors]]). هي middleware: فانكشن Express بيشغّلها قبل الـ route، وبتحط headers الـ CORS في الرد.

### [[app.use(cors({ ... }));]]

[[app.use]] = شغّل الـ middleware ده على كل الطلبات. و [[cors({...})]] بيعمل middleware بالإعدادات اللي بين القوسين.

### [[origin: ["https://example.com", "http://localhost:5173"],]]

قايمة الـ origins المسموحلها. المكتبة بتبص على header [[Origin]] اللي المتصفح باعته، ولو في القايمة بترجّعه زي ما هو في [[Access-Control-Allow-Origin]]. [[5173]] البورت الافتراضي لـ Vite في التطوير.

### [[credentials: true]]

بيضيف [[Access-Control-Allow-Credentials: true]]، يعني «مسموح الطلب ييجي بكوكيز». ومن ناحية الـ frontend لازم كمان [[fetch(url, { credentials: "include" })]] عشان الكوكيز تتبعت أصلًا.

### السطر الأخير [[}));]]

قفلة الـ object والـ [[cors(]] والـ [[app.use(]].

---

## ٣. بعد الإعدادات

في تجربتي حطيت [[http://localhost:8791]] في القايمة بدل 5173. نفس الـ fetch من الصفحة:

~~~text الناتج
await fetch("http://localhost:8792/y").then(r => r.json())
{msg: 'hello with cors'}
~~~

والـ headers اللي رجعت (بـ curl):

~~~text curl -si http://localhost:8792/y -H "Origin: http://localhost:8791"
HTTP/1.1 200 OK
Access-Control-Allow-Origin: http://localhost:8791
Vary: Origin
Access-Control-Allow-Credentials: true
~~~

[[Vary: Origin]] بيقول لأي كاش «الرد ده بيختلف حسب الـ Origin»، عشان ميدّيش رد origin لـ origin تاني.

ولو origin مش في القايمة ([[https://evil.example]]) نفس الرد بيرجع **من غير** سطر [[Access-Control-Allow-Origin]]، فالمتصفح هيمنعه.

> خد بالك: [[127.0.0.1]] و [[localhost]] origins مختلفين. لما فتحت الصفحة على [[http://127.0.0.1:8791]] والقايمة فيها [[http://localhost:8791]]، الطلب اتمنع.

---

## ٤. الـ preflight (طلب OPTIONS)

[[POST]] بـ [[Content-Type: application/json]] مش «طلب بسيط»، فالمتصفح بيسأل الأول بطلب [[OPTIONS]]. ده نفس السؤال بـ curl:

~~~bash
curl -si -X OPTIONS http://localhost:8792/y -H "Origin: http://localhost:8791" -H "Access-Control-Request-Method: POST" -H "Access-Control-Request-Headers: content-type"
~~~

~~~text الناتج
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: http://localhost:8791
Access-Control-Allow-Credentials: true
Access-Control-Allow-Methods: GET,HEAD,PUT,PATCH,POST,DELETE
Access-Control-Allow-Headers: content-type
~~~

مكتبة cors ردت على الـ OPTIONS لوحدها بـ 204 والـ methods والـ headers المسموحة، وبعدها الـ POST الحقيقي من الصفحة رجع [[{got: {a: 1}}]].

## الخلاصة

- CORS في المتصفح بس. curl و Postman مش بيتأثروا.
- الحل في السيرفر: [[Access-Control-Allow-Origin]] بالـ origin بالظبط (بروتوكول ودومين وبورت).
- مع الكوكيز: origin محدد مش [[*]]، و [[credentials: true]] في السيرفر، و [[credentials: "include"]] في الـ fetch.`,
          lines: [
            "استورد مكتبة cors في Express.",
            "فعّلها على كل الـ routes بإعدادات.",
            "الدومينات المسموحلها تقرا الرد (الإنتاج والتطوير). مش [[*]].",
            "اسمح بالكوكيز والـ Authorization header.",
            "قفلة."
          ],
          sol: R`من Console على موقع تاني (origin مختلف) الـ fetch هيفشل بـ [[TypeError: Failed to fetch]]، والسبب الحقيقي مكتوب في سطر أحمر منفصل. جربتها من [[http://localhost:8791]] على API على [[localhost:8792]] وطلع:

[[Access to fetch at 'http://localhost:8792/x' from origin 'http://localhost:8791' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.]]

في Network الطلب نفسه ممكن يكون وصل للسيرفر ورجع 200، المتصفح هو اللي منع الـ JavaScript يقرا الرد. بعد ما تضيف origin الموقع ده في [[origin: [...]]] وتعمل restart للـ API، نفس الـ fetch هيرجع البيانات، وفي Response Headers هتلاقي [[access-control-allow-origin]] بقيمة الـ origin. لو لسه واقف: اتأكد إنك كاتب الـ origin بالظبط (بروتوكول ودومين وبورت، ومن غير / في الآخر).`,
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** اكتب في ٣ سطور: مين اللي بيمنع (المتصفح ولا السيرفر)، وليه [[curl]] بيشتغل عادي، وإيه الـ header اللي لازم يرجع.`, done: R`السطور فيها: المتصفح بيمنع **قراية** الرد مش بعته، و [[curl]] مش متصفح فمفيش same-origin policy، والـ header [[Access-Control-Allow-Origin]] بالـ origin بتاعك.` },
            { lvl: 'تطبيق', t: R`**ابني:** سيرفرين Node على بورتين ([[5173]] للصفحة و [[3000]] للـ API). من الصفحة اعمل [[fetch]] للـ API واقرا رسالة CORS بالنص، وبعدين زوّد الـ header يدوي ([[res.setHeader]]) من غير مكتبة.`, done: R`قبل: رسالة فيها [[has been blocked by CORS policy]] و [[Failed to fetch]]، وبعد: الرد وصل. وفي Network الطلب كان واصل للسيرفر في الحالتين (لوج السيرفر فيه سطرين).` },
            { lvl: 'تطبيق', t: R`**preflight:** نفس المعمل، ابعت [[POST]] بـ [[Content-Type: application/json]]. لاقي طلب [[OPTIONS]] في Network (فلتر All مش Fetch/XHR بس)، وبص على الـ headers اللي المتصفح سأل عليها.`, done: R`فيه [[OPTIONS]] قبل الـ [[POST]] وفيه [[Access-Control-Request-Method: POST]] و [[Access-Control-Request-Headers: content-type]]، ولما السيرفر مردّش على [[OPTIONS]] صح، الـ POST نفسه مااتبعتش.` },
            { lvl: 'تحدي', t: R`**صلّح:** السيرفر بيرجّع [[Access-Control-Allow-Origin: *]] والصفحة بتبعت [[credentials: "include"]] عشان الكوكي. اقرا الرسالة وصلّح الإعداد.`, done: R`الرسالة بتقول إن [[*]] مينفعش مع credentials، والتصليح: الـ origin بالاسم، و [[Access-Control-Allow-Credentials: true]]، و [[Vary: Origin]]. والكوكي نفسها محتاجة [[SameSite=None; Secure]] لو الموقعين cross-site (درس «CSRF و SameSite»).` },
            { lvl: 'تحدي', t: R`**اشرحها (أمان):** واحد اقترح «نرجّع [[Access-Control-Allow-Origin]] بنفس قيمة [[Origin]] اللي جاية في الطلب، أي origin». ليه ده خطر مع الكوكيز؟ ٣ سطور.`, done: R`كاتب إن أي موقع هيقدر يقرا ردود الـ API بكوكي اليوزر (يسرق بياناته)، وإن الصح لستة origins مسموحة بس. وده بيفرق عن CSRF: هنا الهجوم **بيقرا** مش بس بيبعت.` },
          ],
        },
        {
          cmd: "Mixed content و HTTPS",
          title: "الصفحة HTTPS وطلب واحد http: الصور بتتحوّل لوحدها، والسكربت والـ fetch بيتمنعوا",
          desc: R`لما الصفحة نفسها جاية بـ [[https://]] وجواها أي طلب لـ [[http://]]، ده اسمه **mixed content**. Chrome مش بيعامل الكل زي بعض: الصور والصوت والفيديو بيحاول **يحوّلها لوحده** لـ https (warning أصفر: [[This request was automatically upgraded to HTTPS]])، ولو السيرفر ده مش بيتكلم https الصورة بتقع بـ [[net::ERR_SSL_PROTOCOL_ERROR]]. أما السكربت و [[fetch]] والـ CSS والـ iframe فبيتمنعوا على طول (error أحمر: [[This request has been blocked; the content must be served over HTTPS.]]) وفي Network الطلب سببه [[mixed-content]].

والفخ اللي بيخلّيها تعدّي من التجربة المحلية: [[http://localhost]] و [[http://127.0.0.1]] **مش** بيتحسبوا mixed content حتى من صفحة https، فكله شغّال عندك ويقع بعد النشر. الحل: كل الروابط [[https://]] أو نسبية ([[/api/...]])، و [[Content-Security-Policy: upgrade-insecure-requests]] كشبكة أمان. والقضية كاملة من الإنتاج (CORS وبعدها mixed content بعد تركيب الشهادة) في درس «CORS و mixed content» في تاب التشخيص، والدرس ده بيشرح اللي DevTools بيوريه.`,
          example: R`fetch("http://cdn.test:8081/api").catch(e => console.log(e.message))
[...document.querySelectorAll("[src^='http:'], [href^='http:']")].map(e => e.tagName + " " + (e.src || e.href))
performance.getEntriesByType("resource").filter(e => e.name.startsWith("http:")).map(e => e.name)
curl -s https://example.com | grep -oE "(src|href)=\"http://[^\"]+" | sort -u
Content-Security-Policy: upgrade-insecure-requests`,
          lines: [
            R`من Console في صفحة https: اطلب API على [[http://]]. هيطبع [[Failed to fetch]]، وقبلها في Console سطر أحمر بيبدأ بـ [[Mixed Content:]] وفيه رابط الصفحة والطلب الممنوع.`,
            R`دوّر في الـ DOM على أي عنصر [[src]] أو [[href]] بتاعه بيبدأ بـ [[http:]] (صور، سكربتات، CSS، iframes، لينكات). [[^=]] في الـ selector معناها «بيبدأ بـ». اللينكات العادية ([[<a>]]) مش mixed content، بس أي تانية لازم تتصلّح.`,
            R`اللي اتطلب فعلًا (حتى اللي جه من CSS أو JavaScript ومش ظاهر في الـ HTML): كل resource رابطه بيبدأ بـ [[http:]]. الطلبات اللي اتمنعت خالص مش بتظهر هنا، فدي في Console و Network.`,
            R`من بره من غير متصفح: نزّل الـ HTML بـ [[curl]] وطلّع كل [[src="http://...]] و [[href="http://...]] متكرر مرة واحدة ([[sort -u]]). مفيد في سكربت فحص بعد النشر.`,
            R`header بيرجع مع الصفحة (من السيرفر أو nginx) بيقول للمتصفح «أي [[http://]] في الصفحة دي حوّله [[https://]] قبل ما تطلبه». بيصلّح الروابط اللي نسيتها، بس لو السيرفر التاني مش بيدعم https الطلب هيقع برضه.`,
          ],
          try: R`ابني معمل الدرس: سيرفر https بشهادة محلية على [[shop.test]] (اسم وهمي بـ [[--host-resolver-rules]] أو ملف [[hosts]])، وسيرفر http على [[cdn.test]]. حط في الصفحة صورة وسكربت و [[fetch]] من [[http://cdn.test]]، واقرا Console و Network. وبعدين بدّل [[cdn.test]] بـ [[127.0.0.1]] وشوف الرسايل اختفت ليه، وبعدين جرّب [[upgrade-insecure-requests]].`,
          deep: {
            why: R`HTTPS بيضمن إن محدش في النص (واي فاي عام، ISP، proxy) يقرا أو يغيّر الصفحة. سكربت واحد على http يبوّظ الضمان ده كله: أي حد في النص يقدر يغيّر السكربت ده ويعمل اللي هو عايزه في الصفحة. عشان كده المتصفح بيمنع «الحاجات النشيطة» (اللي بتقدر تغيّر الصفحة) نهائي، ويحاول ينقذ «الحاجات السلبية» (صور وميديا) بالتحويل لـ https.`,
            how: R`لكل طلب، Chrome بيقارن الـ scheme بتاع الطلب بالصفحة. لو الصفحة [[https]] والطلب [[http]] لـ host مش «potentially trustworthy» (يعني مش [[localhost]] ولا [[127.0.0.1]] ولا [[::1]] ولا [[file:]])، ده mixed content. الصور و [[<video>]] و [[<audio>]] (blockable = لأ، optionally-blockable) Chrome بيحوّلهم لـ [[https://]] بنفس الـ host والبورت (من Chrome 81، حسب مدونة Chromium «No more mixed messages»)، فلو البورت ده بيتكلم http بس، الـ TLS handshake بيفشل ([[ERR_SSL_PROTOCOL_ERROR]] في المعمل). أي حاجة تانية بتتمنع قبل ما تتبعت أصلًا: الطلب مبيوصلش السيرفر (لوج السيرفر في المعمل كان فاضي)، و [[fetch]] بيرمي [[TypeError: Failed to fetch]]. و [[upgrade-insecure-requests]] بيعمل التحويل ده لكل الطلبات قبل فحص mixed content، فالسكربت والـ fetch بيتطلبوا https.`,
            when: R`بعد ما تركّب شهادة لموقع كان http (أكتر وقت بيظهر فيه)، وبعد نقل الصور أو الـ API لدومين تاني، ولما CMS أو قاعدة بيانات فيها روابط قديمة [[http://]] محفوظة في المحتوى. وكل ما تشوف قفل المتصفح فيه علامة تحذير.`,
            mistakes: R`تجرّب محلي على [[http://localhost]] وتقول «شغال» (مفيش mixed content أصلًا محلي، ولا حتى من صفحة https محلية لـ [[http://127.0.0.1]]: اتجرّب). تكتب [[API_URL=http://...]] في متغير البيئة بتاع الإنتاج. تعتمد على [[upgrade-insecure-requests]] لوحده والسيرفر التاني مش بيدعم https. تستخدم روابط [[//cdn...]] (protocol-relative) وتفتكرها حل دايم: بتشتغل بس الأوضح [[https://]] صريحة. أو تحاول تحلها من الـ frontend بـ proxy عجيب بدل ما تصلّح الرابط.`
          },
          teach: R`## الأول: إيه اللي بيتحسب mixed content

الصفحة جاية بـ [[https://]]. أي طلب منها لـ [[http://]] لسيرفر مش جهازك = mixed content. والمتصفح بيقسمه نوعين:

| النوع | أمثلة | Chrome بيعمل إيه | اللون في Console |
|---|---|---|---|
| سلبي (optionally-blockable) | [[<img>]] و [[<video>]] و [[<audio>]] | بيحوّله لوحده لـ [[https://]] | warning أصفر |
| نشيط (blockable) | [[<script>]] و [[fetch]] و XHR و CSS و [[<iframe>]] و الخطوط | بيمنعه قبل ما يتبعت | error أحمر |

---

## المعمل

كله اتجرّب في Chrome 156 (headless) على ويندوز 11:

- [[https://shop.test:8448]]: سيرفر Node بـ [[node:https]] وشهادة self-signed اتعملت بـ [[openssl req -x509]] للأسامي [[shop.test]] و [[cdn.test]].
- [[http://cdn.test:8081]]: سيرفر Node عادي (http بس) بيرجّع صورة وسكربت و API.
- الأسامي الوهمية كلها بتروح لجهازي بالـ flag ده (بدل ما تعدّل [[hosts]]): [[--host-resolver-rules="MAP *.test 127.0.0.1"]].

ليه مش [[http://127.0.0.1]] على طول؟ هتعرف في القسم ٣.

~~~html الصفحة
<img id="i" src="http://cdn.test:8081/logo.jpg">
<script src="http://cdn.test:8081/w.js"></script>
<script>
  fetch("http://cdn.test:8081/api")
    .then(r => console.log("fetch ok", r.status))
    .catch(e => console.log("fetch failed:", e.message));
</script>
~~~

---

## ١. اللي ظهر في Console

~~~text Console (بالترتيب)
[warning] Mixed Content: The page at 'https://shop.test:8448/plain' was loaded over HTTPS, but requested an insecure element 'http://cdn.test:8081/logo.jpg'. This request was automatically upgraded to HTTPS, For more information see https://blog.chromium.org/2019/10/no-more-mixed-messages-about-https.html
[error] Mixed Content: The page at 'https://shop.test:8448/plain' was loaded over HTTPS, but requested an insecure script 'http://cdn.test:8081/w.js'. This request has been blocked; the content must be served over HTTPS.
[error] Mixed Content: The page at 'https://shop.test:8448/plain' was loaded over HTTPS, but requested an insecure resource 'http://cdn.test:8081/api'. This request has been blocked; the content must be served over HTTPS.
[error] Failed to load resource: net::ERR_SSL_PROTOCOL_ERROR
fetch failed: Failed to fetch
~~~

اقراها كده:

- **الصورة:** warning بس، و [[automatically upgraded to HTTPS]]. المتصفح طلب [[https://cdn.test:8081/logo.jpg]] بدلها. بس البورت ده بيتكلم http، فالـ TLS فشل: [[ERR_SSL_PROTOCOL_ERROR]]، والصورة مكسورة. يعني «اتحوّلت لوحدها» مش معناها «اشتغلت».
- **السكربت:** [[insecure script]] و [[has been blocked]]: مااتطلبش خالص.
- **الـ fetch:** [[insecure resource]] و [[blocked]]، والكود شاف [[Failed to fetch]] بس (نفس رسالة «مفيش نت» و CORS، عشان كده Console هو اللي بيقولك السبب الحقيقي).

ولوج سيرفر [[cdn.test]] كان **فاضي**: ولا طلب وصله. المنع بيحصل جوه المتصفح.

---

## ٢. في Network

| الطلب | اللي بيبان |
|---|---|
| [[w.js]] و [[api]] | أحمر، وسبب الفشل [[mixed-content]] (في الـ Status column بيتكتب blocked) |
| [[logo.jpg]] | الرابط نفسه بقى [[https://cdn.test:8081/logo.jpg]] وفشل بـ [[ERR_SSL_PROTOCOL_ERROR]] |

ولو عايز تشوف القفل نفسه: Command Menu ثم Show Security (اسمه «Privacy and security» في النسخ الجديدة، من Chrome docs). التاب ده بيقول لو الصفحة فيها mixed content، وبيوريك الشهادة.

---

## ٣. الفخ: محلي مفيش mixed content

نفس الصفحة الـ https، بس الـ API على [[http://127.0.0.1:8082]] و [[http://localhost:8082]]:

~~~text الناتج
https://127.0.0.1:8450/ -> http://127.0.0.1:8082/api : ok 200
https://127.0.0.1:8450/ -> http://localhost:8082/api : ok 200
https://shop.test:8450/ -> http://127.0.0.1:8082/api : ok 200
https://shop.test:8450/ -> http://localhost:8082/api : ok 200
~~~

ولا رسالة واحدة. [[localhost]] و [[127.0.0.1]] المتصفح بيعتبرهم «potentially trustworthy» (محدش في النص بينهم وبينك)، فمش بيتحسبوا mixed content. يعني موقعك هيشتغل تمام وانت بتجرّب، ويقع أول ما الـ API يبقى [[http://api.yourshop.example]] على الإنتاج. عشان كده المعمل محتاج أسامي وهمية زي [[cdn.test]].

> Chrome الجديد عنده كمان «Local Network Access»: موقع على النت بيطلب [[localhost]] أو IP جوه شبكتك ممكن يطلب إذن من اليوزر (من Chrome docs). ده موضوع تاني غير mixed content.

---

## ٤. التصليح

**الأول والأهم:** الرابط نفسه [[https://]]، أو نسبي ([[/api/stock]]) لو نفس الدومين. ولو جاي من متغير بيئة ([[VITE_API_URL]] أو [[NEXT_PUBLIC_API_URL]])، صلّح قيمته في الإنتاج وابني تاني (القيمة دي بتتحط جوه الـ bundle وقت الـ build).

**شبكة أمان:** header مع الصفحة:

~~~text
Content-Security-Policy: upgrade-insecure-requests
~~~

نفس الصفحة بالـ header ده (والـ CDN التاني بيدعم https):

~~~text الناتج
fetch ok 200
لوج السيرفر: HTTPS /logo.jpg | HTTPS /w.js | HTTPS /api
~~~

ولا رسالة Mixed Content، والتلات طلبات وصلوا كـ https. بس ده بيشتغل **بس** لو السيرفر التاني بيرد https فعلًا. وفي nginx:

~~~nginx
add_header Content-Security-Policy "upgrade-insecure-requests" always;
~~~

**لاقي الباقي:** سطور المثال ٢ و ٣ و ٤ (الـ DOM، واللي اتحمّل، و [[curl | grep]] من بره)، وقسم Best Practices في Lighthouse بيقول كمان لو فيه طلبات مش HTTPS.

## الخلاصة

- صور وميديا: بتتحوّل لـ https لوحدها (warning)، وتقع لو السيرفر مش بيدعم.
- سكربت و fetch و CSS و iframe: بيتمنعوا (error)، ومبيوصلوش السيرفر.
- محلي ([[localhost]] و [[127.0.0.1]]) مفيش mixed content، فجرّب بأسامي وهمية.
- الحل الرابط [[https://]] أو نسبي، و [[upgrade-insecure-requests]] شبكة أمان.`,
          sol: R`على [[cdn.test]] (اسم مش جهازك بالنسبة للمتصفح): warning للصورة إنها اتحوّلت لـ https وبعدها [[ERR_SSL_PROTOCOL_ERROR]] لأن البورت http بس، و error أحمر للسكربت و [[fetch]] ([[This request has been blocked; the content must be served over HTTPS.]])، و [[fetch failed: Failed to fetch]]، ولوج [[cdn.test]] فاضي.

لما بدّلت بـ [[127.0.0.1]] أو [[localhost]]: الكل اشتغل ومفيش ولا رسالة، لأنهم «potentially trustworthy». وده بالظبط ليه المشكلة مش بتبان وانت بتجرّب.

بـ [[Content-Security-Policy: upgrade-insecure-requests]] وسيرفر بيدعم https على نفس الرابط: [[fetch ok 200]] والتلاتة وصلوا HTTPS. ولو السيرفر التاني http بس، الحل الوحيد إنه يدعم https أو تجيب الملفات من سيرفرك.`,
          flag: "script",
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** صنّف دول: [[<img>]]، و [[<script>]]، و [[fetch]]، و [[<link rel="stylesheet">]]، و [[<video>]]، و [[<iframe>]]، و [[@font-face]]: بيتحوّل لوحده ولا بيتمنع؟`, done: R`الصورة والفيديو بيتحوّلوا، والباقي بيتمنع، وصحّحت من الجدول ومفيش غلطة.` },
            { lvl: 'تطبيق', t: R`**ابني المعمل:** سيرفر https على اسم وهمي وسيرفر http على اسم تاني، وصفحة فيها صورة وسكربت و [[fetch]] من الـ http. اقرا Console وانسخ الـ ٣ رسايل.`, done: R`عندك warning واحد ([[automatically upgraded]]) و ٢ error ([[has been blocked]])، ولوج سيرفر الـ http فاضي.` },
            { lvl: 'تطبيق', t: R`**دوّر بنفسك:** على موقعك (أو موقع قديم اتنقل لـ https) شغّل سطور المثال ٢ و ٣ في Console، والسطر ٤ من الترمنال. لاقي كل رابط [[http://]].`, done: R`لستة بكل رابط [[http://]] ومكانه (HTML ولا CSS ولا JS)، أو «مفيش» في التلات طرق.` },
            { lvl: 'تحدي', t: R`**صلّح:** تطبيق React بيكلّم [[import.meta.env.VITE_API_URL]] والقيمة في [[.env.production]] [[http://api.shop.example]]. اكتب خطوات التصليح بالترتيب، وإزاي تتأكد من غير ما تفتح المتصفح.`, done: R`الخطوات: صلّح القيمة لـ [[https://]]، و build تاني (القيمة جوه الـ bundle)، وانشر، و [[curl -s https://shop.example/assets/index-*.js | grep -o "http://api[^\"]*"]] (أو [[grep -r "http://api" dist/]] قبل النشر) فاضي.` },
          ],
        },
        {
          cmd: "HTTP/2 و HTTP/3",
          title: "عمود Protocol في Network: نفس ٦٠ صورة في ١٣٧٢ms على HTTP/1.1 و ٢٧٠ms على HTTP/2",
          desc: R`كليك يمين على رأس الجدول في Network وعلّم **Protocol**: هتلاقي [[http/1.1]] أو [[h2]] أو [[h3]] جنب كل طلب. الفرق مش اسم وبس: HTTP/1.1 بيبعت طلب واحد في المرة على كل اتصال، والمتصفح بيفتح **٦ اتصالات بالكتير** لكل سيرفر، فالطلب السابع بيستنى (Queueing أو Stalled في Timing). HTTP/2 بيبعت كل الطلبات **مع بعض على اتصال واحد** (multiplexing) وبيضغط الـ headers. في المعمل: صفحة فيها ٦٠ صورة صغيرة و latency 100ms، اتحمّلت في **١٣٧٢ms** على HTTP/1.1 و **٢٧٠ms** على HTTP/2، وأطول طلب استنى **١١٢٣ms** قبل ما يتبعت أصلًا على HTTP/1.1 مقابل **١٨ms**.

HTTP/2 في المتصفحات بيشتغل على HTTPS بس، وبيتفعّل من السيرفر (في nginx سطر [[http2 on;]]، درس «HTTP/2 و HTTP/3» في تاب Nginx). و HTTP/3 نفس الفكرة بس على QUIC فوق UDP بدل TCP، فخسارة packet واحدة مش بتوقّف كل الطلبات، والسيرفر بيعلن عنه بـ header [[alt-svc: h3=":443"]] فالمتصفح يجرّبه من الزيارة اللي بعدها.`,
          example: R`curl -sI --http1.1 https://example.com | head -1
curl -sI --http2 https://example.com | head -3
curl -s -o /dev/null -w "%{http_version}\n" https://example.com
curl -sI https://example.com | grep -i "^alt-svc"
performance.getEntriesByType("resource").map(e => e.nextHopProtocol)
new Set(performance.getEntriesByType("resource").map(e => e.name.split("/")[2] + " " + e.nextHopProtocol))`,
          lines: [
            R`اطلب الـ headers بس ([[-I]]) وأجبر HTTP/1.1. أول سطر هيبقى [[HTTP/1.1 200 OK]] (فيه كلمة OK).`,
            R`نفس الطلب بـ HTTP/2. أول سطر [[HTTP/2 200]] من غير OK (HTTP/2 شال الـ reason phrase)، والـ headers تحته كلها small letters ([[content-type]] مش [[Content-Type]]). لو curl بتاعك قال [[the installed libcurl version does not support this]]، النسخة دي مش متبنية بـ nghttp2 (curl بتاع ويندوز و Git Bash كده)، جرّب من WSL أو Docker.`,
            R`[[%{http_version}]] بيطبع النسخة اللي اتفق عليها curl والسيرفر فعلًا: [[1.1]] أو [[2]] أو [[3]]. أسرع فحص في سكربت بعد ما تفعّل HTTP/2 على السيرفر.`,
            R`هل السيرفر بيعلن عن HTTP/3؟ [[alt-svc]] لو فيه [[h3=":443"]] يبقى آه، والمتصفح هيجرّب QUIC من الطلب اللي بعده. [[^]] عشان يمسك اسم الـ header في أول السطر بس.`,
            R`من Console: لكل ملف اتحمّل، البروتوكول اللي اتحمّل بيه ([[http/1.1]] أو [[h2]] أو [[h3]]). نفس عمود Protocol بس كـ array تقدر تعدّه أو تفلتره.`,
            R`نفس الكلام بس متجمّع: كل سيرفر (الـ host من الرابط) وبروتوكوله، من غير تكرار ([[Set]]). هتلاقي مثلًا موقعك [[h2]] و CDN الصور [[h3]] وسكربت قديم من سيرفر تالت [[http/1.1]].`,
          ],
          try: R`ابني معمل الدرس: سيرفر [[node:https]] (HTTP/1.1) وسيرفر [[node:http2]] بـ [[allowHTTP1: true]] بنفس الشهادة المحلية، والاتنين بيرجّعوا صفحة فيها ٦٠ صورة. افتح الاتنين في Chrome و Network مفتوح بـ throttling (custom profile فيه latency 100ms)، وعلّم عمود Protocol، وقارن Load وشكل الـ Waterfall.`,
          deep: {
            why: R`أغلب وقت تحميل الصفحة مش في حجم الملفات، في **الانتظار**: كل طلب على HTTP/1.1 لازم يستنى اللي قبله على نفس الاتصال يخلص، و ٦ اتصالات بس. عشان كده زمان الناس كانت بتعمل sprites وبتدمج كل الـ JS في ملف وبتقسم الصور على دومينات كتير (domain sharding). HTTP/2 بيلغي السبب، والحيل دي بقت ضارة (sharding بيفتح اتصالات زيادة ويضيّع الـ multiplexing).`,
            how: R`HTTP/1.1 نص: الطلب سطور والرد سطور، وعلى الاتصال الواحد طلب ورا طلب (head-of-line blocking على مستوى HTTP). HTTP/2 بيحوّل نفس الطلبات لـ frames binary، وكل طلب «stream» برقم، والـ frames بتاعة streams مختلفة بتتخلط على نفس اتصال TCP، فالـ ٦٠ صورة بيتبعتوا مع بعض. والـ headers بتتضغط بـ HPACK (header اتبعت قبل كده بيتبعت كرقم). المتصفحات بتتفق على HTTP/2 جوه الـ TLS handshake (ALPN بيقول [[h2]])، فمفيش HTTP/2 من غير HTTPS في المتصفح. بس TCP نفسه لسه فيه head-of-line: لو packet ضاعت، كل الـ streams بتستنى. HTTP/3 بيستخدم QUIC على UDP: كل stream لوحده في النقل، والـ handshake أسرع (TLS 1.3 جوه QUIC)، وبيكمّل لو الـ IP اتغيّر (واي فاي لـ 4G). المتصفح بيعرف إن السيرفر بيدعمه من [[alt-svc]] أو من DNS (سجل HTTPS)، وأول زيارة غالبًا بتبقى [[h2]].`,
            when: R`أي موقع عليه HTTPS لازم يبقى HTTP/2 على الأقل (nginx و Caddy و Cloudflare و Vercel بيدعموه). افحص البروتوكول لما الصفحة فيها ملفات كتير صغيرة والـ Waterfall شكله سلّم، ولما SSE أو تابات كتير بتعلّق (درس «WebSocket و SSE في Network»)، وبعد أي تغيير في nginx أو الـ CDN.`,
            mistakes: R`تفعّل HTTP/2 في nginx وتنسى إن الموقع لسه بيتجاب من [[http://]] (مفيش h2 من غير TLS في المتصفح). تختبر بـ curl مش مبني بـ nghttp2 وتفتكر السيرفر مش بيدعم. تفضل تعمل domain sharding أو تدمج كل حاجة في ملف ضخم «عشان الطلبات» على HTTP/2. تقيس من غير latency (على جهازك الفرق شبه صفر لأن الـ latency صفر). تفتكر إن HTTP/3 هيظهر من أول زيارة. أو تفتح بورت 443 TCP بس في الـ firewall وتعلن [[h3]] (QUIC محتاج 443 UDP).`
          },
          teach: R`## الأول: عمود Protocol

Network مش بيعرض البروتوكول من الأول. كليك يمين على أي عنوان عمود (Name أو Status) وعلّم **Protocol**. القيم اللي هتشوفها:

| القيمة | معناها |
|---|---|
| [[http/1.1]] | HTTP/1.1: طلب في المرة على كل اتصال، و ٦ اتصالات لكل سيرفر |
| [[h2]] | HTTP/2: كل الطلبات مع بعض على اتصال واحد |
| [[h3]] | HTTP/3: زي h2 بس على QUIC (UDP) |
| [[data]] أو [[blob]] | مش طلب شبكة أصلًا (صورة [[data:]] جوه الـ CSS مثلًا) |

---

## المعمل: نفس الصفحة على البروتوكولين

اتجرّب في Chrome 156 (headless) و Node 24، والأرقام من الصفحة نفسها ([[performance]]) و DevTools Protocol:

~~~javascript h2-lab.mjs
import http2 from "node:http2";
import https from "node:https";
import fs from "node:fs";

const opts = { key: fs.readFileSync("key.pem"), cert: fs.readFileSync("cert.pem") };
const img = fs.readFileSync("card.jpg");
function handler(req, res) {
  if (req.url === "/") {
    res.writeHead(200, { "content-type": "text/html" });
    return res.end("<h1>menu</h1>" + Array.from({ length: 60 }, (_, i) => '<img src="/i/' + i + '.jpg" width="40" height="30">').join(""));
  }
  res.writeHead(200, { "content-type": "image/jpeg", "cache-control": "no-store" });
  res.end(img);
}
https.createServer(opts, handler).listen(8445, "127.0.0.1");                        // HTTP/1.1 بس
http2.createSecureServer({ ...opts, allowHTTP1: true }, handler).listen(8446, "127.0.0.1"); // HTTP/2
~~~

- نفس [[handler]] للاتنين: الفرق الوحيد البروتوكول.
- [[allowHTTP1: true]]: لو client مش بيعرف HTTP/2 (curl قديم مثلًا) يكلّمه HTTP/1.1 بدل ما يقفل.
- الشهادة [[cert.pem]] self-signed للاسم [[shop.test]] (المتصفح بـ [[--host-resolver-rules]] بيوديه لجهازي). HTTP/2 في المتصفح محتاج HTTPS، فمفيش طريقة نجرّبه على [[http://]].

وقبل التحميل: [[Network.emulateNetworkConditions]] بـ latency **100ms** (زي تبطيء من DevTools). من غير latency الفرق بيبقى صغير جدًا، لأن السيرفر جنبك.

---

## ١. الأرقام

~~~text ٣ مرات لكل واحد
HTTP/1.1  load ms: 1372, 1361, 1398 | nextHopProtocol ["http/1.1"] | longest wait before request sent 1123 ms
HTTP/2    load ms:  270,  272,  267 | nextHopProtocol ["h2"]       | longest wait before request sent   18 ms
~~~

- [[load ms]]: من أول الطلب لحد حدث [[load]] (كل الصور خلصت). **٥ أضعاف تقريبًا** بنفس الملفات ونفس السيرفر.
- [[nextHopProtocol]]: نفس عمود Protocol، من [[performance.getEntriesByType("resource")]].
- [[longest wait before request sent]]: أكبر قيمة لـ [[requestStart - startTime]]، يعني الطلب استنى قد إيه **قبل ما يتبعت**. على HTTP/1.1 آخر الصور استنت أكتر من ثانية في الطابور.

### الشكل في Waterfall

- **HTTP/1.1:** درجات سلّم. أول ٦ صور مع بعض، وبعدين ٦، وبعدين ٦... ولو دوست على صورة من الآخر، Timing فيه **Queueing** أو **Stalled** كبير.
- **HTTP/2:** عمود واحد تقريبًا. الـ ٦٠ بدأوا مع بعض.

---

## ٢. curl: أول سطر بيتغيّر

~~~text curl 8.14 (Alpine في Docker) على نفس السيرفر
$ curl -skI --http1.1 https://host.docker.internal:8449/
HTTP/1.1 200 OK
Content-Type: text/html
X-Shop: sonbola

$ curl -skI --http2 https://host.docker.internal:8449/
HTTP/2 200
content-type: text/html
x-shop: sonbola

$ curl -sk -o /dev/null -w '%{http_version}\n' https://host.docker.internal:8449/
2
~~~

- HTTP/2 مالوش كلمة [[OK]]، والـ headers small letters (البروتوكول بيلزم ده).
- [[-k]] هنا بس عشان الشهادة self-signed في المعمل. على موقع حقيقي متكتبهاش.

وعلى ويندوز:

~~~text curl بتاع ويندوز (8.22) و Git Bash (8.23)
curl: option --http2: the installed libcurl version does not support this
~~~

يعني الـ curl ده مش مبني بـ nghttp2، فمش هيقولك الحقيقة عن HTTP/2. استخدم WSL أو Docker أو المتصفح.

---

## ٣. وفخ SSE كمان

نفس السيرفرين، وفتحت ٨ [[EventSource]] من Console (درس «WebSocket و SSE في Network»):

~~~text الناتج
HTTP/1.1  SSE opened 6 of 8
HTTP/2    SSE opened 8 of 8
~~~

الحد بتاع ٦ اتصالات بيوقّف أي حاجة مفتوحة طول الوقت. HTTP/2 مالوش الحد ده بنفس الشكل (السيرفر بيقول كام stream مسموح، عادة ١٠٠ أو أكتر).

---

## ٤. HTTP/3 (من الـ docs، مااتجرّبش هنا)

مفيش سيرفر QUIC في Node من غير مكتبات، فده من MDN و Chrome docs و RFC 9114:

- السيرفر (nginx 1.25+ بـ [[listen 443 quic;]] أو Caddy أو Cloudflare) بيرجّع [[alt-svc: h3=":443"; ma=86400]] مع رد HTTP/2.
- المتصفح بيفتكر ده، ومن الطلب اللي بعده بيجرّب QUIC على UDP 443. لو نجح، عمود Protocol يقول [[h3]].
- لو UDP 443 مقفول في الـ firewall، المتصفح بيرجع لـ h2 لوحده (مفيش ضرر، بس مفيش فايدة).
- الفايدة الأكبر على نت فيه فقد packets (موبايل، واي فاي زحمة)، مش على كابل.

إعداد nginx للاتنين في درس «HTTP/2 و HTTP/3» في تاب Nginx، والفرق النظري في درس «multiplexing و QUIC» في تاب الانترفيو.

## الخلاصة

- علّم عمود Protocol في Network، أو [[nextHopProtocol]] من Console، أو [[curl -w "%{http_version}"]].
- HTTP/1.1: ٦ اتصالات، والباقي يستنى (Waterfall سلّم). HTTP/2: كله مع بعض على اتصال واحد.
- في المعمل: ٦٠ صورة و latency 100ms = ١٣٧٢ms مقابل ٢٧٠ms.
- HTTP/2 في المتصفح محتاج HTTPS، و HTTP/3 بيتعلن بـ [[alt-svc]] ومحتاج UDP 443.`,
          sol: R`على سيرفر [[node:https]] عمود Protocol كله [[http/1.1]]، و Load حوالي ١٫٤ ثانية (latency 100ms)، والـ Waterfall درجات: كل ٦ صور مع بعض، والصور الأخيرة في Timing عندها Stalled أو Queueing قريب من ثانية.

على سيرفر [[node:http2]] عمود Protocol كله [[h2]]، و Load حوالي ٠٫٣ ثانية، والـ ٦٠ صورة بادئين في نفس اللحظة تقريبًا. في المعمل بتاعنا: ١٣٧٢ و ١٣٦١ و ١٣٩٨ms مقابل ٢٧٠ و ٢٧٢ و ٢٦٧ms.

ومن غير throttling الفرق بيقل جدًا (السيرفر على نفس الجهاز، فكل round trip تقريبًا صفر)، وده بالظبط ليه لازم تقيس بـ latency.`,
          flag: "script",
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** علّم عمود Protocol في Network على ٣ مواقع مختلفة، واكتب البروتوكول بتاع الصفحة نفسها وبتاع أي ملف من دومين تاني.`, done: R`جدول ٣ صفوف فيه [[h2]] أو [[h3]] أو [[http/1.1]]، وعلى الأقل موقع واحد فيه بروتوكولين مختلفين لسيرفرين مختلفين.` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** ابني معمل الدرس، وقيس Load على البروتوكولين مرة من غير throttling ومرة بـ latency 100ms ومرة 300ms.`, done: R`جدول ٦ أرقام، والفرق بين البروتوكولين بيكبر مع الـ latency (عندنا عند 100ms: حوالي ١٣٧٠ مقابل ٢٧٠ms)، وكاتب ليه من غير latency الفرق صغير.` },
            { lvl: 'تطبيق', t: R`**ابني:** سكربت bash بياخد لستة دومينات ويطبع لكل واحد [[%{http_version}]] وفيه [[alt-svc]] بـ [[h3]] ولا لأ. شغّله من WSL أو Docker لو curl بتاعك مش بيدعم HTTP/2.`, done: R`السكربت بيطبع سطر لكل دومين ([[example.com 2 h3=yes]] مثلًا)، ودومين غلط بيطبع [[000]] أو رسالة مفهومة ومبيوقفش الباقي.` },
            { lvl: 'تحدي', t: R`**اشرحها:** زميلك عامل ٤ subdomains للصور ([[img1]] لـ [[img4]]) «عشان المتصفح يحمّل أسرع». الموقع دلوقتي على HTTP/2. اكتبله ٤ سطور: ليه ده كان صح زمان، وليه بقى بيبطّأ دلوقتي.`, done: R`السطور فيها: حد الـ ٦ اتصالات في HTTP/1.1 كان بيتضرب في ٤، وعلى HTTP/2 كل subdomain = اتصال و TLS handshake و DNS زيادة، والـ multiplexing بيشتغل على اتصال واحد، فالأحسن دومين واحد.` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`node`, run: R`import http2 from "node:http2";
let sessions = 0;
const srv = http2.createServer();
srv.on("session", () => sessions++);
srv.on("stream", (stream, headers) => {
  stream.respond({ ":status": 200, "content-type": "text/plain", "X-Shop": "sonbola" });
  stream.end("item " + headers[":path"]);
});
srv.listen(0, "127.0.0.1", async () => {
  const client = http2.connect("http://127.0.0.1:" + srv.address().port);
  const one = path => new Promise(res => {
    const req = client.request({ ":path": path });
    let body = "", head;
    req.on("response", h => head = h);
    req.on("data", d => body += d);
    req.on("end", () => res([head[":status"], Object.keys(head).filter(k => !k.startsWith(":") && k !== "date").join(","), body]));
  });
  const all = await Promise.all(Array.from({ length: 20 }, (_, i) => one("/i/" + i)));
  console.log("first:", JSON.stringify(all[0]));
  console.log("responses:", all.length, "on sessions:", sessions);
  client.close(); srv.close();
});`, expect: [R`first: [200,"content-type,x-shop","item /i/0"]`, R`responses: 20 on sessions: 1`] },
          ],
        }
      ]
    }
]);
