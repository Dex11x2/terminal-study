// تكملة تاب web: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/web/01.js (شرح حقول الدرس في أوله)
MORE("web", [
    {
      t: "افهم الرد",
      l: 2,
      n: "",
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

لو لقيت الملفات مكتوب عندها [[(memory cache)]] مش 304، ده معناه إن المتصفح ما سألش السيرفر خالص (الكاش لسه صالح بـ Cache-Control)، وده أسرع من 304.`
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

لو لقيت العكس (HTML عليه max-age طويل)، ده سبب «رفعت تعديل ومحدش شايفه». ولو الاتنين مفيهمش cache-control خالص، المتصفح بيخمّن بنفسه (heuristic caching) من [[last-modified]].`
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

يعني الـ [[<]] ده أول حرف في صفحة HTML. في مشروع Vite أو Next.js ممكن تلاقي status [[200]] والـ text هو [[index.html]] بتاع الـ frontend نفسه (fallback الـ SPA): ده معناه إن الطلب ما وصلش للـ API أصلًا (proxy أو base URL غلط).`
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

في Network الطلب نفسه ممكن يكون وصل للسيرفر ورجع 200، المتصفح هو اللي منع الـ JavaScript يقرا الرد. بعد ما تضيف origin الموقع ده في [[origin: [...]]] وتعمل restart للـ API، نفس الـ fetch هيرجع البيانات، وفي Response Headers هتلاقي [[access-control-allow-origin]] بقيمة الـ origin. لو لسه واقف: اتأكد إنك كاتب الـ origin بالظبط (بروتوكول ودومين وبورت، ومن غير / في الآخر).`
        }
      ]
    },
    {
      t: "Application: الكوكيز والتخزين",
      l: 2,
      n: "",
      items: [
        {
          cmd: "Cookies",
          title: "مين حافظ إيه",
          desc: "Application ثم Cookies بيوريك كل كوكي بخصايصه. [[HttpOnly]] معناها JavaScript مش قادر يقراها، وده اللي لازم يبقى في كوكي الـ session عشان لو حصل XSS التوكن ميتسرقش. [[Secure]] تتبعت على HTTPS بس. و [[SameSite]] بتحمي من CSRF. دبل كليك على أي قيمة تعدّلها، و Delete تمسحها، ودي أسرع طريقة تختبر «لو الـ session خلصت هيحصل إيه».",
          example: R`Application > Storage > Cookies > your domain
Columns to check: HttpOnly, Secure, SameSite, Expires`,
          try: "بص على كوكيز موقعك بعد login: هل كوكي الـ session عليها HttpOnly و Secure؟",
          flag: "keys",
          deep: {
            why: "Session منتهية ومش عارف ليه، أو كوكي مش بتتخزن، أو عايز تختبر السلوك من غير session.",
            how: R`Application tab ثم Cookies تحت Storage. كل كوكي بيعرض: الاسم والقيمة، والدومين، والـ Expires، والـ HttpOnly والـ Secure والـ SameSite.

[[HttpOnly]]: JavaScript مش قادر يقرا الكوكي دي. مهم لكوكيات الـ session لأنه يمنع XSS من سرقتها.

[[Secure]]: الكوكي بتتبعت على HTTPS بس.

[[SameSite]]: بيتحكم في إمتى الكوكي بتتبعت مع cross-site requests. Strict لنفس الـ site بس. Lax في navigations. None في كل الحالات (محتاج Secure).

تقدر تدبل كليك وتغيّر قيمة أو تمسح بـ Delete. مفيد تختبر «إيه اللي هيحصل لو الـ session خلصت».`,
            when: "Session بتنتهي قبل المفروض. تختبر صفحة المستخدم غير الـ logged in.",
            mistakes: "SameSite=None من غير Secure. وكوكيات session من غير HttpOnly."
          },
          teach: R`## الأول: الكوكي بيحطها السيرفر بـ Set-Cookie

السيرفر بيبعت header اسمه [[Set-Cookie]]، والمتصفح بيحفظ الكوكي ويبعتها تاني مع كل طلب لنفس الموقع في header اسمه [[Cookie]]. تاب Application ثم Cookies بيعرض المحفوظ بأعمدة لكل خاصية (الأعمدة من Chrome DevTools docs). جربت كوكيتين على سيرفر محلي.

---

## ١. السيرفر بعت إيه

~~~powershell
curl.exe -si http://127.0.0.1:8791/shop | Select-String -Pattern "set-cookie"
~~~

~~~text الناتج
Set-Cookie: session=s3cr3t; Path=/; HttpOnly; SameSite=Lax
Set-Cookie: theme=dark; Path=/; SameSite=Lax
~~~

| الحتة | معناها |
|---|---|
| [[session=s3cr3t]] | الاسم والقيمة |
| [[Path=/]] | تتبعت مع كل المسارات في الموقع |
| [[HttpOnly]] | JavaScript مش قادر يقراها |
| [[SameSite=Lax]] | متتبعتش مع طلبات جاية من مواقع تانية، غير لما المستخدم يدوس لينك ويفتح الموقع |
| [[Secure]] | (مش موجودة هنا لأنه http محلي) تتبعت على HTTPS بس |
| [[Expires]] أو [[Max-Age]] | (مش موجودين) فالكوكي «Session»: تتمسح لما المتصفح يقفل |

---

## ٢. اختبار HttpOnly في Console

~~~javascript Console
document.cookie
~~~

~~~text الناتج
"theme=dark"
~~~

[[document.cookie]] بيرجّع الكوكيز اللي JavaScript مسموحله يشوفها، كنص واحد [[اسم=قيمة; اسم=قيمة]]. كوكي الـ [[session]] مش ظاهرة لأنها [[HttpOnly]]، مع إنها موجودة في المتصفح وبتتبعت مع الطلبات (شفتها من بروتوكول DevTools: [[theme, session(HttpOnly)]]). ودي بالظبط الحماية: لو حد قدر يحقن JavaScript في صفحتك (XSS)، مش هيعرف يقرا الـ session.

---

## ٣. اللي في الأعمدة

| العمود | تبص على إيه في كوكي الـ session |
|---|---|
| HttpOnly | ✓ |
| Secure | ✓ في الإنتاج (HTTPS) |
| SameSite | Lax أو Strict |
| Expires / Max-Age | تاريخ معقول أو Session |

ودبل كليك على القيمة يعدّلها، و Delete يمسحها. امسح كوكي الـ session وريفريش، وشوف الموقع بيرجّعك لصفحة الـ login صح ولا بيكسر.

## الخلاصة

- [[Set-Cookie]] من السيرفر، و [[Cookie]] من المتصفح في كل طلب.
- [[document.cookie]] مش بيوريك الـ HttpOnly، وده المطلوب لكوكي الـ session.
- SameSite=None لازم معاها Secure.`,
          sol: R`اللي المفروض تشوفه في صف كوكي الـ session: علامة ✓ في عمود HttpOnly، و ✓ في Secure، و SameSite [[Lax]] أو [[Strict]]، و Expires إما تاريخ معقول أو [[Session]] (تتمسح لما تقفل المتصفح).

اختبار سريع: اكتب [[document.cookie]] في Console. لو كوكي الـ session ظاهرة في الناتج، يبقى مفيهاش HttpOnly وأي XSS يقدر يسرقها، ودي أول حاجة تصلّحها. لو مش ظاهرة يبقى تمام.

لو Secure مش متعلم عليها والموقع على HTTPS، الكوكي ممكن تتبعت على http لو حد فتح اللينك من غير s. وعلى localhost طبيعي تلاقيها من غير Secure في التطوير.`
        },
        {
          cmd: "localStorage و JWT",
          title: "التخزين في المتصفح",
          desc: "localStorage بيفضل موجود بعد ما تقفل المتصفح، و sessionStorage بيروح مع قفل التاب. أي JavaScript في الصفحة يقدر يقراهم، فمتحطش فيهم توكن حساس لو تقدر تستخدم كوكي HttpOnly. والـ JWT تلات حتت بينهم نقط، والنص اللي في النص base64 تقدر تفكّه وتقراه. يعني الـ JWT مش مشفّر، فمتحطش فيه أي سر.",
          example: R`localStorage
localStorage.getItem("token")
JSON.parse(atob(localStorage.getItem("token").split(".")[1].replace(/-/g, "+").replace(/_/g, "/")))
localStorage.clear()`,
          try: "لو موقعك بيحفظ JWT، فكّه واعرف فيه إيه وبيخلص إمتى (exp).",
          deep: {
            why: "التطبيق بيحفظ التوكن في localStorage وعايز تشوفه أو تفكّه. أو تتأكد إنه مش بيحفظ حاجات حساسة.",
            how: R`Application tab ثم Storage ثم Local Storage. بتشوف كل key/value. بتقدر تعدّل أو تمسح.

الـ JWT مش مشفّر، هو encoded بـ base64url (بـ [[-]] و [[_]] بدل [[+]] و [[/]]، وعشان كده بنبدّلهم قبل atob). اللي بين أول نقطة وتانية نقطة هو الـ payload. [[atob()]] في Console بيفكّه. أو موقع jwt.io.

لأن أي JavaScript يقدر يقرا الـ localStorage، الـ JWT المخزّن هناك هدف لـ XSS. الأأمن إنه يتخزّن في HttpOnly cookie.`,
            when: "تتأكد من محتوى الـ JWT: صلاحيات اليوزر، وإمتى التوكن بينتهي (حقل exp). تختبر سلوك التطبيق لما التوكن منتهي.",
            mistakes: "تتوقع إن الـ JWT مشفّر. أي حد ممكن يفكّه. متحطش معلومات سرية جواه."
          },
          teach: R`## الأول: localStorage قاموس نصوص للموقع

[[localStorage]] مكان تخزين لكل origin، فيه مفاتيح وقيم **نصوص بس**، وبيفضل بعد قفل المتصفح. و [[sessionStorage]] نفس الشكل بس بيروح مع قفل التاب. والاتنين أي JavaScript في الصفحة يقراهم. المثال بيقرا توكن JWT محفوظ ويفكّه. كله اتشغّل في Console في Chrome، بعد ما حطيت token تجربة بـ [[localStorage.setItem("token", "...")]].

---

## ١. [[localStorage]]

~~~text الناتج
Storage {token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0Mi...', theme: 'dark', length: 2}
~~~

كل المفاتيح وقيمها، و [[length]] عددهم. نفس اللي في Application ثم Local Storage.

## ٢. [[localStorage.getItem("token")]]

بيرجّع قيمة مفتاح واحد كنص:

~~~text الناتج
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0MiIsIm5hbWUiOiJBbGkiLCJyb2xlIjoidXNlciIsImlhdCI6MTc5MTMwODU1NCwiZXhwIjoxNzkxMzA5NDU0fQ.c2lnbmF0dXJl"
~~~

الـ JWT تلات حتت بينهم نقط: **header** و **payload** و **signature** (التوقيع اللي السيرفر بيتأكد بيه إن محدش عدّل).

---

## ٣. السطر الطويل من جوه لبرة

~~~javascript Console
JSON.parse(atob(localStorage.getItem("token").split(".")[1].replace(/-/g, "+").replace(/_/g, "/")))
~~~

### الخطوة ١: [[.split(".")]]

بيقسم النص عند كل نقطة ويرجّع array من ٣ حتت:

~~~text الناتج
["eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9", "eyJzdWIiOiI0MiIsIm5hbWUi...ODU1NCwiZXhwIjoxNzkxMzA5NDU0fQ", "c2lnbmF0dXJl"]
~~~

### الخطوة ٢: الرقم 1 بين القوسين المربعين

الترقيم بيبدأ من صفر، فـ ١ هي الحتة التانية: الـ payload.

### الخطوة ٣: الـ replace مرتين

- [[/-/g]] regex معناه «كل [[-]]» ([[g]] = global، كل المرات مش أول مرة بس)، ويتبدل بـ [[+]].
- [[/_/g]] كل [[_]] يتبدل بـ [[/]].

ليه؟ الـ JWT مكتوب بـ **base64url**: نسخة من base64 بتستخدم [[-]] و [[_]] بدل [[+]] و [[/]] عشان تنفع في URL. و [[atob]] بيفهم base64 العادي بس، فبنرجّع الحرفين.

### الخطوة ٤: [[atob(...)]]

اسمها من «ASCII to binary»: بتفك base64 لنص. مثال صغير:

~~~text atob("eyJzdWIiOiI0MiJ9")
"{"sub":"42"}"
~~~

### الخطوة ٥: [[JSON.parse(...)]]

بيحوّل نص JSON لـ object:

~~~text الناتج
{sub: '42', name: 'Ali', role: 'user', iat: 1791308554, exp: 1791309454}
~~~

| المفتاح | معناه |
|---|---|
| [[sub]] | subject: اليوزر صاحب التوكن |
| [[iat]] | issued at: اتعمل إمتى، بالثواني من ١ يناير ١٩٧٠ |
| [[exp]] | expires: بيخلص إمتى، بنفس الوحدة |

[[exp - iat]] = ٩٠٠ ثانية، يعني عمره ربع ساعة. وكل ده اتقرا **من غير أي مفتاح سري**: الـ JWT مش مشفّر.

---

## ٤. الـ solCode: إمتى بيخلص

~~~javascript Console
const p = JSON.parse(atob(localStorage.getItem("token").split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
console.log(p, new Date(p.exp * 1000).toISOString(), Math.round((p.exp * 1000 - Date.now()) / 60000) + " min left");
~~~

~~~text الناتج
{sub: '42', name: 'Ali', role: 'user', iat: 1791308554, exp: 1791309454} '2026-10-06T17:57:34.000Z' '15 min left'
~~~

- [[p.exp * 1000]]: JavaScript بيعدّ بالـ ms مش الثواني، فبنضرب في ١٠٠٠.
- [[new Date(...).toISOString()]]: التاريخ بصيغة عالمية بتوقيت UTC (الـ [[Z]] في الآخر).
- [[Date.now()]]: دلوقتي بالـ ms. الفرق ÷ ٦٠٠٠٠ = دقايق.

---

## ٥. الأخطاء اللي هتقابلك (جربتها)

~~~text الناتج
localStorage.getItem("tokn").split(".")
Uncaught TypeError: Cannot read properties of null (reading 'split')

atob("ab-c")
Uncaught InvalidCharacterError: Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.
~~~

- [[getItem]] بيرجّع [[null]] لو المفتاح مش موجود (هنا الاسم غلط).
- [[atob]] بيرفض [[-]] و [[_]]، وعشان كده الـ replace.

## ٦. [[localStorage.clear()]]

بيمسح كل مفاتيح الموقع ده، وبعدها [[localStorage.length]] رجع [[0]]. زي logout يدوي لو التطبيق شايل التوكن هنا.

## الخلاصة

- localStorage نصوص بس، ويتقري من أي JavaScript في الصفحة.
- JWT = header.payload.signature، والـ payload base64url تفكّه بـ [[atob]] بعد تبديل [[-]] و [[_]].
- [[exp]] بالثواني، اضربه في ١٠٠٠ قبل [[new Date]].`,
          lines: [
            "كل اللي متخزن (اكتبها في Console).",
            "قيمة التوكن.",
            "فك الـ JWT: خد الجزء اللي في النص (بعد أول نقطة)، فك الـ base64 بـ atob، وحوّله object. هتلاقي فيه اليوزر و exp.",
            "امسح كل حاجة (زي logout يدوي)."
          ],
          sol: R`السطر التالت بيرجع object. جربته على token فيه payload زي ده:

[[{"sub":"42","role":"user","iat":1790000000,"exp":1790000900}]]

[[exp]] بالثواني من ١٩٧٠، فعشان تقراه: [[new Date(1790000900 * 1000)]] = [[2026-09-21T14:28:20.000Z]]. و [[exp - iat]] = ٩٠٠ ثانية، يعني الـ token عمره ربع ساعة. الكود تحت بيطبعلك فاضل قد إيه.

لو طلع [[Cannot read properties of null (reading 'split')]] يبقى مفيش key اسمه [[token]]، اكتب [[localStorage]] وشوف الاسم الحقيقي. ولو طلع [[InvalidCharacterError]] يبقى القيمة مش JWT أو محفوظة بعلامات تنصيص (اعمل [[JSON.parse]] الأول). وافتكر: أي حد معاه الـ token يقدر يقراه كده، فمفيش أسرار في الـ payload.`,
          solCode: R`const p = JSON.parse(atob(localStorage.getItem("token").split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
console.log(p, new Date(p.exp * 1000).toISOString(), Math.round((p.exp * 1000 - Date.now()) / 60000) + " min left");`
        },
        {
          cmd: "Clear site data",
          title: "ابدأ على نضافة",
          desc: "Application ثم Storage ثم Clear site data بيمسح الكوكيز والتخزين والكاش للموقع ده بس، كأنك أول مرة تفتحه. ولو الموقع PWA وبيعرض نسخة قديمة مهما تعمل، ادخل Service workers واعمل Unregister.",
          example: R`Application > Storage > Clear site data
Application > Service workers > Unregister
Or: open the site in an Incognito window`,
          try: "امسح بيانات موقعك وافتحه كزائر جديد.",
          flag: "keys",
          deep: {
            why: "التطبيق بيعرض حاجة قديمة من الكاش، أو عايز تبدأ من أول كأنك زائر جديد.",
            how: R`Application ثم Storage ثم «Clear site data» بيمسح Cookies، وlocalStorage، وsessionStorage، والـ cache. بيخلي الموقع كأنك أول مرة تفتحه.

Service Workers مشكلة شائعة: ممكن يعرض نسخة قديمة حتى بعد Hard Reload. Application ثم Service workers ثم Unregister بيشيله.

أسرع طريقة: افتح الموقع في نافذة Incognito.`,
            when: "لما الـ caching بيسبب مشاكل في التطوير. لما تختبر first-time user experience.",
            mistakes: "تعمل Hard Reload وتفتكر إنه بيمسح localStorage والـ cookies. هو بس بيتخطى الـ HTTP cache للتحميل ده، ومش بيلمس الكوكيز ولا التخزين."
          },
          teach: R`## الأول: إيه اللي بيتمسح فعلًا

الزرار في Application ثم Storage بيمسح كل حاجة الموقع ده حافظها عندك: الكوكيز (حتى الـ HttpOnly)، و localStorage، و sessionStorage، و IndexedDB، والكاش، والـ service workers. أماكن الأزرار من Chrome DevTools docs. والتأثير جربته بأمر بروتوكول DevTools اللي بيعمل نفس الحاجة ([[Storage.clearDataForOrigin]]).

---

## ١. قبل وبعد

قبل المسح:

~~~javascript Console
localStorage.setItem("token", "abc"); sessionStorage.setItem("step", "2"); [document.cookie, localStorage.length, sessionStorage.length]
~~~

~~~text الناتج
["theme=dark", 1, 1]
كوكيز المتصفح كلها: theme, session(HttpOnly)
~~~

بعد Clear site data:

~~~javascript Console
[document.cookie, localStorage.length, sessionStorage.length]
~~~

~~~text الناتج
["", 0, 0]
كوكيز المتصفح كلها: none
~~~

السطر بيرجّع array فيه ٣ أسئلة مرة واحدة: الكوكيز اللي JavaScript شايفها، وعدد مفاتيح localStorage، وعدد مفاتيح sessionStorage. كله بقى فاضي، وكوكي الـ session الـ HttpOnly اتمسحت كمان، فلو كنت logged in هتلاقي نفسك خرجت.

---

## ٢. سطور المثال

| السطر | بيعمل إيه |
|---|---|
| [[Application > Storage > Clear site data]] | يمسح كل حاجة للـ origin ده بس (مش باقي المواقع) |
| [[Application > Service workers > Unregister]] | يشيل الـ service worker اللي ممكن يكون بيرجّع نسخة قديمة من الكاش بتاعه |
| [[Or: open the site in an Incognito window]] | نافذة جديدة ببيانات فاضية، ومش بتلمس بيانات نافذتك العادية |

## ٣. الفرق عن Hard Reload

| | Hard Reload | Clear site data |
|---|---|---|
| HTTP cache | بيتخطاه للتحميل ده | بيمسحه |
| الكوكيز | سليمة | بتتمسح |
| localStorage | سليم | بيتمسح |
| service worker | فاضل | بيتشال |

## الخلاصة

- Clear site data = الموقع كأنك أول مرة تزوره، وبيخرّجك من الحساب.
- Hard Reload مش بيلمس الكوكيز ولا التخزين.
- Incognito أسرع لو عايز تجرّب كزائر جديد من غير ما تمسح حاجة.`,
          sol: R`بعد Clear site data وريفريش: هتلاقي نفسك عملت logout، وأي banner بتاع cookies أو onboarding هيظهر تاني، وفي Network كل الملفات جاية [[200]] بحجمها الكامل (مفيش memory cache ولا 304). Application ثم Cookies و Local storage هيبقوا فاضيين لحد ما الموقع يكتب فيهم تاني.

لو لسه شايف نفسك logged in، غالبًا الـ session محفوظة على دومين تاني (زي [[auth.yoursite.com]] أو [[.yoursite.com]]) مش الدومين اللي مسحته. ونافذة Incognito بتديك نفس النتيجة من غير ما تمسح بيانات نافذتك العادية.`
        },
        {
          cmd: "سيرفر محلي بدل file://",
          title: "الصفحة بتفتح بالدبل كليك بس الـ service worker والـ fetch لأ",
          desc: R`لما تفتح index.html بدبل كليك، العنوان بيبدأ بـ [[file://]]، والمتصفح بيمنع حاجات كتير هناك: service worker، و [[fetch]] لملف JSON جنبها، و [[<script type="module">]]. شغّل سيرفر static صغير في الفولدر وافتح [[http://localhost]]: [[localhost]] المتصفح بيعامله كأنه آمن زي https.`,
          example: R`cd files
python -m http.server 8791 --bind 127.0.0.1
npx serve . -l tcp://127.0.0.1:8791`,
          try: "افتح مشروع PWA بدبل كليك وشوف الأخطاء في Console، وبعدين من [[http://localhost:8791]] وادخل Application ثم Service workers: هتلاقيه activated.",
          flag: "term",
          deep: {
            why: "الكود سليم بس «مش شغال»، والأخطاء في Console شكلها CORS أو «Failed to register a ServiceWorker». بتضيع وقت في الكود والمشكلة إن الصفحة مش جاية من سيرفر.",
            how: R`[[file://]] ملوش origin حقيقي (المتصفح بيعتبره [[null]])، فـ [[fetch('data.json')]] بيتمنع بـ CORS، والـ modules مبتتحمّلش. والـ service worker محتاج «secure context»: https، أو [[localhost]] و [[127.0.0.1]] بالاستثناء.

[[python -m http.server 8791]]: سيرفر static للفولدر الحالي على بورت 8791، جاي مع Python من غير تسطيب. [[--bind 127.0.0.1]] مهمة: من غيرها بيسمع على كل الشبكات، وأي حد على نفس الواي فاي يقدر يفتح ملفاتك. على ويندوز لو [[python]] مش شغال جرّب [[py]].

[[npx serve . -l tcp://127.0.0.1:8791]]: نفس الفكرة من Node. بيضيف ميزات زي إن [[/about]] يفتح [[about.html]]. ولو كتبت البورت بس ([[-l 8791]]) بيسمع على كل الشبكات زي python من غير [[--bind]]، فاكتب [[tcp://127.0.0.1:]] قبل البورت.

بعد ما تعدّل في [[sw.js]]، المتصفح ممكن يفضل على الـ worker القديم. في Application ثم Service workers فعّل Update on reload وانت بتطوّر. وخلي بالك: لو الـ worker بيستخدم cache-first لكل حاجة، أي تعديل مش هيوصل للزوار غير لما تغيّر اسم الكاش.`,
            when: "أي صفحة فيها service worker أو PWA أو fetch لملفات محلية أو ES modules.",
            mistakes: "في مشروع حقيقي sw.js كان cache-first لكل الملفات، فتعديلات index.html مبتوصلش للزوار غير بتغيير اسم الكاش، والأيقونات اللي في الـ manifest مكنتش موجودة فالـ Console مليان 404. وسيرفر التجربة من غير [[--bind 127.0.0.1]] على شبكة عامة."
          },
          teach: R`## الأول: [[file://]] مش origin حقيقي

لما تفتح [[index.html]] بدبل كليك، العنوان بيبقى [[file:///C:/...]]، والمتصفح بيعتبر الـ origin بتاع الصفحة [[null]]. وحاجات كتير ممنوعة على origin [[null]]. الحل: سيرفر صغير على جهازك يقدّم الملفات على [[http://127.0.0.1]].

---

## ١. التجربة: نفس الملفات بطريقتين

فولدر فيه [[index.html]] و [[app.js]] (بيعمل [[fetch("data.json")]] ويسجّل [[sw.js]]) و [[data.json]] و [[sw.js]].

### بالدبل كليك (file://) في Chrome

مع [[<script type="module">]]:

~~~text الناتج في Console
Access to script at 'file:///C:/Users/ali/site/files/app.js' from origin 'null' has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: chrome, chrome-experimental-site-token-provider, chrome-extension, chrome-untrusted, data, http, https, isolated-app.
~~~

الملف نفسه مش اتحمّل. ولما خليته script عادي (من غير module):

~~~text الناتج في Console
sw failed: Failed to register a ServiceWorker: The URL protocol of the current origin ('null') is not supported.
Access to fetch at 'file:///C:/Users/ali/site/files/data.json' from origin 'null' has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: ...
fetch failed: Failed to fetch
~~~

التلاتة اتمنعوا: الـ module، والـ fetch، والـ service worker.

---

## ٢. [[cd files]]

ادخل الفولدر اللي فيه [[index.html]]. السيرفر بيقدّم الفولدر **اللي انت فيه**.

## ٣. [[python -m http.server 8791 --bind 127.0.0.1]]

| الحتة | معناها |
|---|---|
| [[python]] | (على ويندوز ممكن [[py]]، وعلى لينكس والماك [[python3]]) |
| [[-m http.server]] | شغّل الموديول [[http.server]] اللي جاي مع Python كبرنامج |
| [[8791]] | البورت |
| [[--bind 127.0.0.1]] | اسمع على جهازك بس |

~~~text الناتج (Python 3.14 على ويندوز)
Serving HTTP on 127.0.0.1 port 8791 (http://127.0.0.1:8791/) ...
127.0.0.1 - - [06/Oct/2026 20:50:45] "GET / HTTP/1.1" 200 -
127.0.0.1 - - [06/Oct/2026 20:50:45] "GET /app.js HTTP/1.1" 200 -
127.0.0.1 - - [06/Oct/2026 20:50:45] "GET /data.json HTTP/1.1" 200 -
127.0.0.1 - - [06/Oct/2026 20:50:45] code 404, message File not found
127.0.0.1 - - [06/Oct/2026 20:50:45] "GET /sw.js HTTP/1.1" 200 -
127.0.0.1 - - [06/Oct/2026 20:50:45] "GET /favicon.ico HTTP/1.1" 404 -
~~~

كل سطر طلب: مين طلب، وإمتى، والـ method والمسار، والـ status. و [[/]] بيرجّع [[index.html]] لوحده. وسطر [[code 404, message File not found]] بتاع طلب الـ favicon (المتصفح بيطلب أيقونة لوحده ومفيش واحدة في الفولدر)، بس اتطبع قبل سطر الطلب بتاعه لأن الطلبات كانت شغالة في نفس الوقت، وده طبيعي. وفي Console نفس الصفحة اشتغلت:

~~~text الناتج في Console
data: {"items":3}
sw registered, scope: http://127.0.0.1:8791/
~~~

ليه ده مسموح؟ لأن [[http://127.0.0.1]] و [[http://localhost]] المتصفح بيعاملهم «secure context» زي https. جربت [[isSecureContext]] على الصفحة ورجع [[true]].

[[Ctrl+C]] في الترمنال يقفل السيرفر.

## ٤. [[npx serve . -l tcp://127.0.0.1:8791]]

- [[npx]]: شغّل باكدج npm من غير ما تسطّبها (بينزّلها مؤقتًا أول مرة).
- [[serve]]: سيرفر static من Vercel.
- [[.]]: الفولدر الحالي.
- [[-l]] (listen): يسمع فين. [[tcp://127.0.0.1:8791]] = على جهازك بس، بورت 8791.

~~~text الناتج
 INFO  Accepting connections at http://127.0.0.1:8791
~~~

> اتأكدت إن [[npx serve . -l 8791]] (بالبورت بس) بيسمع على كل الشبكات: [[Get-NetTCPConnection]] وراني [[LocalAddress ::]] (يعني كل العناوين)، وده نفس خطر python من غير [[--bind]]. عشان كده المثال بقى بـ [[tcp://127.0.0.1:8791]]، وده خلّاه [[127.0.0.1]] بس.

وميزة زيادة: [[serve]] بيشيل [[.html]] من الروابط. طلبت [[/classic.html]] رجّع [[301]] لـ [[/classic]]، و [[/classic]] رجّع الصفحة [[200]].

| | python http.server | npx serve |
|---|---|---|
| محتاج | Python | Node |
| يقفل على جهازك | [[--bind 127.0.0.1]] | [[-l tcp://127.0.0.1:PORT]] |
| [[/about]] يفتح [[about.html]] | لأ | أيوه |

## الخلاصة

- [[file://]] = origin [[null]]: مفيش modules ولا fetch لملفات جنبك ولا service worker.
- سيرفر static على [[127.0.0.1]] بيحل التلاتة، لأن localhost secure context.
- دايمًا قفل السيرفر على [[127.0.0.1]]، مش على كل الشبكة.`,
          lines: [
            "ادخل فولدر الموقع.",
            "سيرفر static على بورت 8791، لجهازك بس.",
            "أو نفس الحاجة بـ Node من غير Python، ومقفول على جهازك برضه."
          ],
          sol: R`بالدبل كليك (file://) جربتها في Chromium وطلع في Console:

[[Failed to register a ServiceWorker: The URL protocol of the current origin ('null') is not supported.]]
و [[Access to fetch at 'file:///.../data.json' from origin 'null' has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: ...]] (ولو الـ script نفسه [[type="module"]] بيتمنع بنفس الرسالة قبل ما يشتغل أصلًا)

من [[http://localhost:8791]] نفس الصفحة اشتغلت: الـ fetch رجع الـ JSON، و [[navigator.serviceWorker.register]] نجح، وفي Application ثم Service workers الحالة [[activated and is running]].

السبب: الـ service worker لازم secure context (HTTPS أو localhost)، و file:// الـ origin بتاعه [[null]]. لو السيرفر ما اشتغلش وطلع [[Address already in use]] غيّر البورت. ولو قالك [[python: command not found]] اكتب [[python3]].`
        }
      ]
    }
]);
